const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadModule(file) {
  const context = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/modules', file), 'utf8'), context);
  return context.window.MATH_MODULES[0];
}
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
}
test('REGRESSION: real-number markers use the integer ticks common scale and correct ordering', () => {
  const module = loadModule('m1_foundations.js');
  const html = module.topics.map(t => t.concept?.html || t.concept || '').find(html => html.includes('data-figure="real-number-line"'));
  const svg = html.match(/<svg data-figure="real-number-line"[\s\S]*?<\/svg>/)[0];
  const circles = [...svg.matchAll(/<circle[^>]*>/g)].map(match => attributes(match[0]));
  for (const [color, value] of [['#3b82f6', 0.5], ['#f59e0b', Math.PI / 4], ['#10b981', Math.SQRT2]]) {
    const marker = circles.find(circle => circle.fill === color);
    assert.ok(Math.abs((Number(marker.cx) - 230) / 50 - value) < 1e-12);
    assert.equal(Number(marker.cy), 90);
  }
  const positions = ['#3b82f6', '#f59e0b', '#10b981'].map(color => Number(circles.find(circle => circle.fill === color).cx));
  assert.ok(230 < positions[0] && positions[0] < positions[1] && positions[1] < 280 && 280 < positions[2] && positions[2] < 330);
});

test('REGRESSION: the function point and output guide lie on the actual quadratic curve', () => {
  const topic = loadModule('m4_precalculus.js').topics.find(t => t.id === 'functions-domain-range');
  const svg = topic.concept.html.match(/<svg data-figure="function-mapping"[\s\S]*?<\/svg>/)[0];
  const point = attributes(svg.match(/<circle[^>]*>/)[0]);
  const curve = attributes(svg.match(/<path[^>]*>/)[0]).d.match(/M\s+([\d.]+)\s+([\d.]+)\s+Q\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/).slice(1).map(Number);
  const t = (Number(point.cx) - curve[0]) / (curve[4] - curve[0]);
  const y = (1 - t) ** 2 * curve[1] + 2 * (1 - t) * t * curve[3] + t ** 2 * curve[5];
  assert.ok(Math.abs(Number(point.cy) - y) < 1e-10);
  const guide = [...svg.matchAll(/<line[^>]*>/g)].map(match => attributes(match[0])).find(line => line.stroke === '#ef4444');
  assert.equal(Number(guide.y1), Number(point.cy));
  assert.equal(Number(guide.y2), Number(point.cy));
  assert.equal(Number(guide.x2), Number(point.cx));
});
