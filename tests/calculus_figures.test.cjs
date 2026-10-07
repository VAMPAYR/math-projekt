/* Numeric checks for calculus SVGs. Run: node --test tests/calculus_figures.test.cjs */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function figure(file, topicId) {
  const context = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/modules', file), 'utf8'), context);
  const topic = context.window.MATH_MODULES[0].topics.find(t => t.id === topicId);
  assert.ok(topic, `missing topic ${topicId}`);
  const svg = topic.concept.html.match(/<svg\b[\s\S]*?<\/svg>/)?.[0];
  assert.ok(svg, `${topicId} must include its concept figure`);
  return svg;
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
}

function elements(svg, name) {
  return [...svg.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(m => attributes(m[0]));
}

function marked(svg, name, tag) {
  const result = elements(svg, tag).find(e => e['data-figure'] === name);
  assert.ok(result, `missing ${name} ${tag}`);
  return result;
}

function close(actual, expected, message, tolerance = 1e-7) {
  assert.ok(Number.isFinite(actual), `${message}: nonfinite coordinate`);
  assert.ok(Math.abs(actual - expected) <= tolerance,
    `${message}: expected ${expected}, received ${actual}`);
}

// Parse the rendered path, independently of the lesson's coordinate helpers.
function parsePath(d) {
  const tokens = d.match(/[MLQZ]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/gi);
  const result = { quadratics: [], lines: [], closed: false };
  let current, i = 0;
  const nextPoint = () => [Number(tokens[i++]), Number(tokens[i++])];
  while (i < tokens.length) {
    const command = tokens[i++];
    if (command === 'M') current = result.start = nextPoint();
    else if (command === 'Q') {
      const control = nextPoint(), end = nextPoint();
      result.quadratics.push([current, control, end]);
      current = end;
    } else if (command === 'L') {
      const end = nextPoint();
      result.lines.push([current, end]);
      current = end;
    } else if (command === 'Z') result.closed = true;
    else assert.fail(`unsupported path command: ${command}`);
  }
  return result;
}

// Solve the quadratic x-coordinate analytically. Production uses subdivision
// and binary search, so these checks do not merely repeat its implementation.
function curveY(segments, x) {
  const [p0, p1, p2] = segments.find(s => x >= s[0][0] - 1e-7 && x <= s[2][0] + 1e-7)
    || assert.fail(`x=${x} is outside the curve`);
  const a = p0[0] - 2 * p1[0] + p2[0];
  const b = 2 * (p1[0] - p0[0]), c = p0[0] - x;
  const roots = Math.abs(a) < 1e-12 ? [-c / b]
    : [(-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a),
      (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)];
  const t = roots.find(root => root >= -1e-7 && root <= 1 + 1e-7);
  assert.ok(Number.isFinite(t), `no curve point for x=${x}`);
  return p0[1] + 2 * (p1[1] - p0[1]) * t + (p0[1] - 2 * p1[1] + p2[1]) * t * t;
}

function checkSecant(svg, curve, start, end) {
  const line = marked(svg, 'secant', 'line');
  close(Number(start.cy), curveY(curve, Number(start.cx)), 'first secant point is on the curve');
  close(Number(end.cy), curveY(curve, Number(end.cx)), 'second secant point is on the curve');
  close(Number(line.x1), Number(start.cx), 'secant starts at first point x');
  close(Number(line.y1), Number(start.cy), 'secant starts at first point y');
  close(Number(line.x2), Number(end.cx), 'secant ends at second point x');
  close(Number(line.y2), Number(end.cy), 'secant ends at second point y');
  const run = marked(svg, 'run', 'line'), rise = marked(svg, 'rise', 'line');
  close(Number(run.y1), Number(start.cy), 'run is at the first point height');
  close(Number(run.y2), Number(start.cy), 'run is horizontal');
  close(Number(run.x1), Number(start.cx), 'run starts at a');
  close(Number(run.x2), Number(end.cx), 'run ends at b');
  close(Number(rise.x1), Number(end.cx), 'rise is at b');
  close(Number(rise.x2), Number(end.cx), 'rise is vertical');
  close(Number(rise.y1), Number(start.cy), 'rise starts at f(a)');
  close(Number(rise.y2), Number(end.cy), 'rise ends at f(b)');
  close((Number(rise.y2) - Number(rise.y1)) / (Number(run.x2) - Number(run.x1)),
    (Number(line.y2) - Number(line.y1)) / (Number(line.x2) - Number(line.x1)),
    'the labeled rise/run gives the displayed secant slope');
}

test('derivative tangent passes through its point and matches the curve from both sides', () => {
  const svg = figure('m5_calculus1.js', 'derivatives');
  const curve = parsePath(marked(svg, 'curve', 'path').d).quadratics;
  const point = marked(svg, 'tangent-point', 'circle');
  const tangent = marked(svg, 'tangent', 'line');
  const x = Number(point.cx), y = Number(point.cy);
  const slope = (Number(tangent.y2) - Number(tangent.y1)) / (Number(tangent.x2) - Number(tangent.x1));
  close(y, curveY(curve, x), 'highlighted point is on the curve');
  close(Number(tangent.y1) + slope * (x - Number(tangent.x1)), y, 'tangent passes through the point');
  const h = 1e-4;
  close(slope, (y - curveY(curve, x - h)) / h, 'tangent agrees with the left derivative', 2e-5);
  close(slope, (curveY(curve, x + h) - y) / h, 'tangent agrees with the right derivative', 2e-5);
  checkSecant(svg, curve, marked(svg, 'nearby-point', 'circle'), point);
});

test('average rate figure joins actual curve points and its slope triangle agrees', () => {
  const svg = figure('m6_calculus1.js', 'limits-continuity');
  const curve = parsePath(marked(svg, 'curve', 'path').d).quadratics;
  checkSecant(svg, curve, marked(svg, 'secant-start', 'circle'), marked(svg, 'secant-end', 'circle'));
});

test('integral shading, vertical bounds, and slices all follow the displayed curve', () => {
  const svg = figure('m6_calculus2.js', 'integration-fundamentals');
  const curve = parsePath(marked(svg, 'curve', 'path').d).quadratics;
  const area = parsePath(marked(svg, 'area', 'path').d);
  const axisY = Number(marked(svg, 'axis', 'line').y1);
  const a = marked(svg, 'boundary-a', 'line'), b = marked(svg, 'boundary-b', 'line');
  const start = Number(a.x1), end = Number(b.x1);
  assert.ok(end > start);
  for (const boundary of [a, b]) {
    close(Number(boundary.x1), Number(boundary.x2), 'integration boundary is vertical');
    close(Number(boundary.y1), curveY(curve, Number(boundary.x1)), 'boundary touches the curve');
    close(Number(boundary.y2), axisY, 'boundary reaches the x-axis');
  }
  close(area.start[0], start, 'shading starts at a');
  assert.ok(area.closed, 'shaded area must close');
  for (const x of [...Array.from({ length: 33 }, (_, i) => start + (end - start) * i / 32), 200]) {
    close(curveY(area.quadratics, x), curveY(curve, x), `shading matches curve at x=${x}`);
    assert.ok(curveY(curve, x) < axisY, 'positive-area illustration stays above the axis');
  }
  assert.deepEqual(area.lines.at(-1)[1], [start, axisY]);
  assert.deepEqual(area.lines[0][1], [end, axisY]);
  const slices = elements(svg, 'line').filter(e => e['data-figure'] === 'slice');
  assert.ok(slices.length >= 5, 'show the accumulation across the interval');
  for (const slice of slices) {
    assert.ok(Number(slice.x1) >= start && Number(slice.x1) <= end);
    close(Number(slice.x1), Number(slice.x2), 'slice is vertical');
    close(Number(slice.y1), curveY(curve, Number(slice.x1)), 'slice touches the curve');
    close(Number(slice.y2), axisY, 'slice reaches the x-axis');
  }
});

test('repaired figures have accessible descriptions and use the active theme palette', () => {
  for (const [file, topic] of [['m5_calculus1.js', 'derivatives'],
    ['m6_calculus1.js', 'limits-continuity'], ['m6_calculus2.js', 'integration-fundamentals']]) {
    const svg = figure(file, topic);
    const root = attributes(svg.match(/<svg\b[^>]*>/)[0]);
    assert.equal(root.role, 'img');
    assert.ok(root['aria-label'].length > 20);
    assert.match(svg, /<title>[^<]+<\/title>/);
    assert.match(svg, /<desc>[^<]+<\/desc>/);
    for (const element of [...elements(svg, 'text'), ...elements(svg, 'path'), ...elements(svg, 'line')]) {
      for (const color of [element.fill, element.stroke].filter(Boolean)) {
        assert.ok(color === 'none' || color.startsWith('var(--'), `fixed color ${color} in ${file}`);
      }
    }
  }
});
