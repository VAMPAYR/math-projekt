/* Regression coverage for the figure rendering audit (October 2026).
   Run with: node --test tests/visualizations.test.cjs */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function fixture() {
  const containers = new Map();
  const root = { dataset: { theme: 'light' } };
  class Canvas {
    constructor() {
      this.style = {};
      this.attributes = new Map();
      this.listeners = new Map();
      this.isConnected = true;
      this.rect = { left: 10, top: 20, width: 300, height: 200 };
      this.captured = new Set();
      this.ctx = makeContext();
    }
    getContext() { return this.ctx; }
    getBoundingClientRect() { return this.rect; }
    setAttribute(name, value) { this.attributes.set(name, String(value)); }
    removeAttribute(name) { this.attributes.delete(name); }
    getAttribute(name) { return this.attributes.get(name); }
    addEventListener(name, handler) {
      if (!this.listeners.has(name)) this.listeners.set(name, new Set());
      this.listeners.get(name).add(handler);
    }
    removeEventListener(name, handler) { this.listeners.get(name)?.delete(handler); }
    setPointerCapture(id) { this.captured.add(id); }
    hasPointerCapture(id) { return this.captured.has(id); }
    releasePointerCapture(id) { this.captured.delete(id); }
    dispatch(name, event) {
      for (const handler of this.listeners.get(name) || []) handler({ preventDefault() {}, ...event });
    }
  }
  function makeContext() {
    const ctx = { commands: [], paths: [], path: [], globalAlpha: 1, stack: [] };
    for (const name of ['fillRect', 'strokeRect', 'rect', 'arc', 'setTransform']) {
      ctx[name] = (...args) => {
        assert.ok(args.every(arg => typeof arg !== 'number' || Number.isFinite(arg)), `${name} received nonfinite coordinates`);
        ctx.commands.push({ name, args, color: ctx.fillStyle, alpha: ctx.globalAlpha });
      };
    }
    ctx.beginPath = () => { ctx.path = []; };
    ctx.moveTo = (x, y) => { assert.ok(Number.isFinite(x) && Number.isFinite(y)); ctx.path.push({ move: true, x, y }); };
    ctx.lineTo = (x, y) => { assert.ok(Number.isFinite(x) && Number.isFinite(y)); ctx.path.push({ move: false, x, y }); };
    ctx.stroke = () => { ctx.paths.push({ color: ctx.strokeStyle, points: [...ctx.path] }); };
    ctx.fill = () => { ctx.commands.push({ name: 'fill', color: ctx.fillStyle, alpha: ctx.globalAlpha }); };
    ctx.fillText = (text, x, y, maxWidth) => {
      assert.ok(Number.isFinite(x) && Number.isFinite(y));
      if (maxWidth !== undefined) assert.ok(maxWidth > 0);
      ctx.commands.push({ name: 'fillText', text, x, y, color: ctx.fillStyle, align: ctx.textAlign });
    };
    ctx.measureText = text => ({ width: String(text).length * 7 });
    ctx.save = () => { ctx.stack.push({ globalAlpha: ctx.globalAlpha }); };
    ctx.restore = () => { Object.assign(ctx, ctx.stack.pop()); };
    ctx.clip = ctx.closePath = ctx.setLineDash = () => {};
    return ctx;
  }
  const context = vm.createContext({
    window: { devicePixelRatio: 2 },
    document: {
      documentElement: root,
      getElementById: id => containers.get(id),
      createElement: () => new Canvas()
    },
    getComputedStyle: () => ({ getPropertyValue: name => name === '--accent-blue' ? (root.dataset.theme === 'dark' ? '#5b8def' : '#2563eb') : '' })
  });
  const source = fs.readFileSync(path.join(__dirname, '../js/visualizations.js'), 'utf8');
  vm.runInContext(`${source}\nglobalThis.viz = Viz;`, context);
  return {
    viz: context.viz,
    root,
    add: id => {
      const container = { canvas: null, querySelector() { return this.canvas; }, appendChild(canvas) { this.canvas = canvas; } };
      containers.set(id, container);
      return container;
    }
  };
}

test('REGRESSION: responsive canvases retain their aspect ratio and map scaled touch positions', () => {
  // Fixed pixel canvases cropped on phones; raw CSS pointer offsets selected the wrong angle.
  const f = fixture();
  const container = f.add('circle');
  const control = f.viz.unitCircle('circle');
  const canvas = container.canvas;
  assert.equal(canvas.width, 1000);
  assert.equal(canvas.height, 1000);
  assert.equal(canvas.style.height, 'auto');
  assert.equal(canvas.style.maxWidth, '100%');
  assert.equal(canvas.style.aspectRatio, '500 / 500');
  canvas.rect = { left: 10, top: 20, width: 250, height: 250 };
  canvas.dispatch('pointerdown', { button: 0, pointerId: 1, clientX: 135, clientY: 45 });
  assert.ok(Math.abs(control.getAngle() - Math.PI / 2) < 1e-10);
  canvas.dispatch('pointerup', { pointerId: 1 });
  canvas.dispatch('keydown', { key: 'ArrowLeft' });
  assert.ok(Math.abs(control.getAngle() * 180 / Math.PI - 89) < 1e-8);
  assert.equal(canvas.getAttribute('role'), 'slider');
});

test('REGRESSION: redraw and canvas reuse preserve state without accumulating handlers', () => {
  // Each repeated render formerly added another mouse handler; theme changes reset figure state.
  const f = fixture();
  const container = f.add('circle');
  const first = f.viz.unitCircle('circle');
  first.setAngle(Math.PI);
  f.root.dataset.theme = 'dark';
  f.viz.redrawAll();
  assert.equal(first.getAngle(), Math.PI);
  assert.equal(container.canvas.ctx.commands.filter(c => c.name === 'fillRect').at(-1).color, '#1a2035');
  f.viz.unitCircle('circle');
  assert.equal(container.canvas.listeners.get('pointermove').size, 1);
  assert.equal(container.canvas.listeners.get('keydown').size, 1);
  f.viz.destroyAll();
  assert.equal(container.canvas.listeners.get('pointermove').size, 0);
  assert.equal(container.canvas.listeners.get('keydown').size, 0);
  assert.equal(container.canvas.getAttribute('role'), 'img');
  assert.equal(container.canvas.getAttribute('aria-valuenow'), undefined);
  assert.equal(container.canvas.getAttribute('aria-valuetext'), undefined);
  assert.equal(container.canvas.style.touchAction, '');
});

test('REGRESSION: tangent coordinates use the scaled plot and undefined derivatives stay renderable', () => {
  // CSS-scaled canvases formerly interpreted a center pointer as a left-side x value.
  const f = fixture();
  const container = f.add('derivative');
  f.viz.derivativeVisualizer('derivative', x => x * x, x => 2 * x);
  container.canvas.dispatch('pointermove', { clientX: 167.5, clientY: 100 });
  assert.ok(Math.abs(Number(container.canvas.getAttribute('aria-valuenow'))) < 1e-10);
  f.viz.derivativeVisualizer('derivative', () => { throw new Error('outside domain'); }, () => NaN);
  assert.ok(container.canvas.ctx.commands.some(c => c.text === "f'(x) = undefined"));
});

test('REGRESSION: graph paths do not connect across tangent or reciprocal asymptotes', () => {
  // Finite samples on either side of a pole formerly created a false vertical curve segment.
  for (const fn of [Math.tan, x => 1 / (x - 0.013)]) {
    const f = fixture();
    const container = f.add('graph');
    f.viz.plotFunction('graph', fn, { xMin: -4, xMax: 4, yMin: -4, yMax: 4 });
    const curve = container.canvas.ctx.paths.find(p => p.color === '#2563eb' && p.points.length > 10);
    assert.ok(curve);
    assert.ok(curve.points.filter(p => p.move).length > 1);
    for (let i = 1; i < curve.points.length; i++) {
      if (!curve.points[i].move) assert.ok(Math.abs(curve.points[i].y - curve.points[i - 1].y) <= 342);
    }
  }
});

test('REGRESSION: small jumps and scaled poles stay separated while steep lines remain visible', () => {
  // A one-viewport jump threshold missed finite jumps and narrow reciprocal branches.
  const pole = 0.013;
  for (const fn of [x => x < pole ? 0 : 1, x => 0.001 / (x - pole)]) {
    const f = fixture();
    const container = f.add('graph');
    f.viz.plotFunction('graph', fn, { xMin: -4, xMax: 4, yMin: -4, yMax: 4 });
    const curve = container.canvas.ctx.paths.find(p => p.color === '#2563eb' && p.points.length > 10);
    assert.ok(curve);
    const poleX = 50 + (pole + 4) / 8 * 530;
    for (let i = 1; i < curve.points.length; i++) {
      if (!curve.points[i].move) {
        assert.ok(!(curve.points[i - 1].x < poleX && curve.points[i].x > poleX), 'curve bridged a discontinuity');
      }
    }
  }
  const f = fixture();
  const container = f.add('steep');
  f.viz.plotFunction('steep', x => 1e6 * (x - pole), { xMin: -4, xMax: 4, yMin: -4, yMax: 4 });
  const curve = container.canvas.ctx.paths.find(p => p.color === '#2563eb' && p.points.length >= 2);
  assert.ok(curve, 'a steep continuous line disappeared');
  assert.ok(curve.points.some(p => !p.move && p.y <= 18.01));
  assert.ok(curve.points.some(p => p.move && p.y >= 359.99));
});

test('REGRESSION: zero and signed bar charts never divide by zero or invert bars', () => {
  // All-zero bars produced NaN heights; negative data used an invalid positive-only scale.
  for (const values of [[0, 0], [-3, 2], [-3, -1]]) {
    const f = fixture();
    const container = f.add('bars');
    f.viz.barChart('bars', values.map((value, i) => ({ label: String(i), value })));
    const bars = container.canvas.ctx.commands.filter(c => c.name === 'rect');
    assert.equal(bars.length, values.length);
    assert.ok(bars.every(c => c.args[2] > 0 && c.args[3] >= 0));
  }
});

test('REGRESSION: Riemann controls reject invalid counts and retain the signed sum', () => {
  // Zero/NaN counts formerly yielded undefined geometry, and a signed integral was labeled area.
  const f = fixture();
  const container = f.add('integral');
  const control = f.viz.integralVisualizer('integral', () => -2, { a: 0, b: 4 });
  control.setN(0);
  control.setN(NaN);
  assert.equal(control.getN(), 10);
  control.setN('20');
  assert.equal(control.getN(), 20);
  assert.ok(container.canvas.ctx.commands.some(c => c.text === 'Left sum ≈ -8.0000'));
  const undefinedControl = f.viz.integralVisualizer('integral', () => Infinity);
  assert.equal(undefinedControl.getN(), 10);
  assert.ok(container.canvas.ctx.commands.some(c => c.text === 'Left sum ≈ undefined'));
});

test('REGRESSION: theme redraw repaints static charts and RGB segment colors retain transparency', () => {
  // Appending hexadecimal alpha to arbitrary CSS colors invalidated RGB fills.
  const f = fixture();
  const container = f.add('tape');
  f.viz.tapeDiagram('tape', [{ label: 'part', value: 5, color: 'rgb(12, 34, 56)' }]);
  assert.ok(container.canvas.ctx.commands.some(c => c.name === 'fillRect' && c.color === 'rgb(12, 34, 56)' && c.alpha === 0.4));
  f.root.dataset.theme = 'dark';
  f.viz.redrawAll();
  assert.ok(container.canvas.ctx.commands.some(c => c.name === 'fillRect' && c.color === '#1a2035'));
});

test('REGRESSION: invalid graph ranges and distribution inputs stop before drawing', () => {
  // Reversed/zero ranges caused invalid scales and could stall tick loops.
  const f = fixture();
  const container = f.add('graph');
  f.viz.plotFunction('graph', x => x, { xMin: 1, xMax: 1 });
  f.viz.numberLine('graph', [], { min: 5, max: 2 });
  f.viz.normalCurve('graph', { sd: 0 });
  assert.equal(container.canvas, null);
});

test('REGRESSION: axes finish when a tick step is smaller than floating-point spacing', () => {
  // At large coordinates, x += step can leave x unchanged and freeze the old tick loop.
  const f = fixture();
  const container = f.add('large');
  f.viz.plotFunction('large', () => 0, { xMin: 1e20, xMax: 1e20 + 16384 });
  assert.ok(container.canvas);
  assert.ok(container.canvas.ctx.commands.length < 1000);
  f.viz.normalCurve('large', { shadeFromSd: 1e300, shadeToSd: 2e300 });
});

test('REGRESSION: quantitative bars expose their units, scale, and exact values', () => {
  // A chart used in GRE data questions lacked a named vertical scale.
  const f = fixture();
  const container = f.add('sales');
  f.viz.barChart('sales', [{ label: 'Jan', value: 40 }, { label: 'Feb', value: 55 }], { yLabel: 'Sales (thousands of dollars)' });
  const text = container.canvas.ctx.commands.filter(c => c.name === 'fillText');
  assert.ok(text.some(c => c.text === 'Sales (thousands of dollars)'));
  assert.ok(text.some(c => c.text === '0' && c.align === 'right'));
  assert.ok(text.some(c => c.text === '50' && c.align === 'right'));
  assert.ok(text.some(c => c.text === '40' && c.align === 'center'));
  assert.ok(text.some(c => c.text === '55' && c.align === 'center'));
});

test('REGRESSION: a short titled bar chart reserves positive space and readable ticks', () => {
  // The axis-title padding formerly exceeded height:100 and inverted its plot.
  const f = fixture();
  const container = f.add('short');
  f.viz.barChart('short', [{ label: 'A', value: 40 }, { label: 'B', value: 55 }], { title: 'Sales', height: 100 });
  const commands = container.canvas.ctx.commands;
  const bars = commands.filter(c => c.name === 'rect');
  assert.ok(bars.every(c => c.args[3] > 0));
  assert.ok(commands.filter(c => c.name === 'fillText').every(c => c.y > 0 && c.y <= 180));
  const tickLabels = commands.filter(c => c.name === 'fillText' && c.align === 'right').sort((a, b) => a.y - b.y);
  for (let i = 1; i < tickLabels.length; i++) assert.ok(tickLabels[i].y - tickLabels[i - 1].y >= 20);
});

test('REGRESSION: normal-band percentages match the plotted density at the stated precision', () => {
  // The 2–3 SD band used 2%, and values derived from rounded empirical-rule totals are misleading.
  const f = fixture();
  const container = f.add('normal');
  f.viz.normalCurve('normal');
  const texts = container.canvas.ctx.commands.filter(c => c.name === 'fillText');
  const labels = texts.filter(c => /^≈[\d.]+%$/.test(c.text)).sort((a, b) => a.x - b.x);
  assert.equal(labels.length, 6);
  const normalDensity = x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
  function percentage(from, to) {
    const n = 1000, dx = (to - from) / n;
    let sum = (normalDensity(from) + normalDensity(to)) / 2;
    for (let i = 1; i < n; i++) sum += normalDensity(from + i * dx);
    return sum * dx * 100;
  }
  for (let i = 0; i < labels.length; i++) {
    const displayed = Number(labels[i].text.slice(1, -1));
    assert.ok(Math.abs(displayed - percentage(i - 3, i - 2)) < 0.051);
  }
  assert.ok(texts.some(c => c.text === 'Each tail beyond 3 SD: ≈0.13%'));
});

test('REGRESSION: static area models use a square and system markers lie on both lines', () => {
  // The x² patch was 120×80; the red solution point missed both drawn lines.
  const context = vm.createContext({ window: { MATH_MODULES: [] } });
  for (const filename of ['m2_algebra_core.js', 'm3_intermediate_algebra.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/modules', filename), 'utf8'), context);
  }
  const modules = context.window.MATH_MODULES;
  const factorHtml = modules.find(m => m.id === 'intermediate-algebra').topics.find(t => t.id === 'factoring').concept.html;
  const square = factorHtml.match(/<rect x="40" y="40" width="([\d.]+)" height="([\d.]+)"/);
  assert.ok(square);
  assert.equal(Number(square[1]), Number(square[2]));
  const systemHtml = modules.find(m => m.id === 'beginning-algebra').topics.find(t => t.id === 'systems-linear').concept.html;
  const point = systemHtml.match(/<circle cx="([\d.]+)" cy="([\d.]+)" r="6"/);
  assert.ok(point);
  const x = Number(point[1]), y = Number(point[2]);
  assert.ok(Math.abs(y - (285 - 0.75 * x)) < 0.001);
  assert.ok(Math.abs(y - (20 + 2 * x / 3)) < 0.001);
});

test('REGRESSION: the highlighted normal region follows the same Gaussian curve', () => {
  // A rectangular 68% highlight extended above the drawn curve and misrepresented probability area.
  const context = vm.createContext({ window: { MATH_MODULES: [] } });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/modules/m9_probability.js'), 'utf8'), context);
  const html = context.window.MATH_MODULES[0].topics.find(t => t.id === 'random-variables').concept.html;
  const shade = html.match(/<path d="(M 160 180 L [^"]+)" fill="rgba\(16,185,129,0.15\)"/);
  assert.ok(shade);
  const coordinates = [...shade[1].matchAll(/(?:M|L) ([\d.]+) ([\d.]+)/g)].map(m => [Number(m[1]), Number(m[2])]);
  for (const [x, y] of coordinates.slice(1, -1)) {
    const z = (x - 220) / 60;
    assert.ok(Math.abs(y - (180 - 150 * Math.exp(-z * z / 2))) < 0.011);
  }
});
