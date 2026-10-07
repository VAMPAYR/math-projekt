/* Run with: node --test tests/algebra_figures.test.cjs */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/modules/m3_algebra_advanced.js'), 'utf8'), context);
const topics = context.window.MATH_MODULES[0].topics;
const figures = id => topics.find(topic => topic.id === id).concept.html.match(/<svg\b[\s\S]*?<\/svg>/g);
const quadratic = figures('quadratic-equations')[0];
const inverse = figures('exponents-logarithms')[0];
const tag = (svg, name, value) => svg.match(new RegExp(`<[^>]+\\b${name}="${value}"[^>]*>`))[0];
const number = (element, attribute) => Number(element.match(new RegExp(`\\b${attribute}="([^"]+)"`))[1]);
const coordinates = element => element.match(/\bd="([^"]+)"/)[1].match(/-?\d+(?:\.\d+)?/g).map(Number);
const points = element => {
  const nums = coordinates(element);
  return Array.from({ length: nums.length / 2 }, (_, i) => ({ x: nums[2 * i], y: nums[2 * i + 1] }));
};
const near = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) < tolerance,
  `${actual} differs from ${expected} by at least ${tolerance}`);

test('parabola passes through both marked roots and has its extremum at the vertex', () => {
  // Evaluate the rendered Bézier, independently of the formula used to build it.
  const curve = tag(quadratic, 'data-curve', 'parabola');
  assert.match(curve, /d="M [^Q]+ Q [^Q]+"/);
  const [start, control, end] = points(curve);
  near(control.x, (start.x + end.x) / 2);
  const evaluate = x => {
    const t = (x - start.x) / (end.x - start.x);
    return (1 - t) ** 2 * start.y + 2 * (1 - t) * t * control.y + t ** 2 * end.y;
  };
  const vertex = tag(quadratic, 'data-point', 'vertex');
  const h = number(vertex, 'cx');
  const k = number(vertex, 'cy');
  near(evaluate(h), k);
  near(evaluate(h - 30), evaluate(h + 30));
  assert.ok(evaluate(h - 30) > k, 'the vertex must be the highest screen point');
  const roots = [...quadratic.matchAll(/<circle\b[^>]*data-point="root"[^>]*>/g)].map(match => match[0]);
  assert.equal(roots.length, 2);
  near(number(roots[0], 'cx') + number(roots[1], 'cx'), 2 * h);
  for (const root of roots) {
    const x = number(root, 'cx');
    const y = number(root, 'cy');
    near(evaluate(x), y);
    assert.ok((evaluate(x - 2) - y) * (evaluate(x + 2) - y) < 0,
      'a marked simple root must cross the axis, rather than end above it');
  }
});

test('exponential and logarithm samples satisfy their equations and reflect across y = x', () => {
  const xAxis = tag(inverse, 'data-axis', 'x');
  const yAxis = tag(inverse, 'data-axis', 'y');
  const origin = { x: number(yAxis, 'x1'), y: number(xAxis, 'y1') };
  const expIntercept = tag(inverse, 'data-point', 'exponential-intercept');
  const logIntercept = tag(inverse, 'data-point', 'logarithm-intercept');
  const unitX = number(logIntercept, 'cx') - origin.x;
  const unitY = origin.y - number(expIntercept, 'cy');
  assert.ok(unitX > 0 && unitY > 0);
  near(unitX, unitY, 1e-9);
  near(number(expIntercept, 'cx'), origin.x);
  near(number(logIntercept, 'cy'), origin.y);
  const diagonal = tag(inverse, 'data-axis', 'reflection');
  const x1 = number(diagonal, 'x1');
  const y1 = number(diagonal, 'y1');
  const x2 = number(diagonal, 'x2');
  const y2 = number(diagonal, 'y2');
  assert.ok(x2 > x1 && y2 < y1, 'positive mathematical slope runs upward in SVG');
  near(x2 - x1, y1 - y2);
  near(x1 + y1, origin.x + origin.y);
  const exponential = points(tag(inverse, 'data-curve', 'exponential'));
  const logarithm = points(tag(inverse, 'data-curve', 'logarithm'));
  assert.ok(exponential.length > 100 && logarithm.length > 100);
  for (const point of exponential) {
    const x = (point.x - origin.x) / unitX;
    const y = (origin.y - point.y) / unitY;
    near(y, 2 ** x, 0.00015);
  }
  for (const point of logarithm) {
    const x = (point.x - origin.x) / unitX;
    const y = (origin.y - point.y) / unitY;
    assert.ok(x > 0, 'the logarithm has no nonpositive inputs');
    near(y, Math.log2(x), 0.00015);
    const reflected = {
      x: origin.x + origin.y - point.y,
      y: origin.x + origin.y - point.x
    };
    assert.ok(exponential.some(p => Math.hypot(p.x - reflected.x, p.y - reflected.y) < 0.002),
      'every visible logarithm sample must reflect to an exponential sample');
  }
  assert.ok(exponential.some(p => p.x < origin.x), 'show negative exponential inputs');
  assert.ok(logarithm.some(p => p.y > origin.y), 'show negative logarithm outputs');
});

test('algebra figures describe their geometry and use theme colors', () => {
  for (const svg of [quadratic, inverse]) {
    assert.match(svg, /role="img"/);
    const ids = svg.match(/aria-labelledby="([^"]+)"/)[1].split(' ');
    for (const id of ids) assert.ok(svg.includes(`id="${id}"`));
    assert.match(svg, /<title\b[^>]*>[^<]+<\/title>/);
    assert.match(svg, /<desc\b[^>]*>[^<]+<\/desc>/);
    for (const match of svg.matchAll(/(?:fill|stroke)="([^"]+)"/g)) {
      assert.ok(match[1] === 'none' || /^var\(--/.test(match[1]), `fixed color ${match[1]}`);
    }
    assert.doesNotMatch(svg, /\btransform=/, 'coordinates must represent the declared curves directly');
  }
});
