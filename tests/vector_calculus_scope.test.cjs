// Regression checks for theorem statements and orientation in lesson practice.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function questions() {
  const sandbox = vm.createContext({ window: {} });
  const modulePath = path.join(__dirname, '../js/modules/m8_calculus3.js');
  vm.runInContext(fs.readFileSync(modulePath, 'utf8'), sandbox, { filename: modulePath });
  return sandbox.window.MATH_MODULES.flatMap(module =>
    module.topics.flatMap(topic => topic.freeResponse || []));
}

test('Stokes practice uses normal flux of curl and consistent boundary orientation', () => {
  const item = questions().find(q => q.question.includes('Stokes theorem relates a surface integral'));
  assert.ok(item);
  assert.match(item.explanation, /\\cdot d\\vec\{S\}/);
  assert.match(item.explanation, /boundary direction.*surface normal/);
  // On the unit disk, F=(-y/2,x/2,0) has curl=(0,0,1).
  // Its flux through the upward normal and its CCW circulation both equal pi.
  const area = Math.PI;
  const circulation = 2 * Math.PI * 0.5;
  assert.ok(Math.abs(circulation - area) < 1e-12);
});

test('Green area question specifies orientation and explains reversal', () => {
  const item = questions().find(q => q.question.includes('its enclosed area is'));
  assert.ok(item);
  assert.match(item.question, /counterclockwise/);
  assert.match(item.explanation, /negates the integral/);
  // A circle's signed area is positive counterclockwise and negative clockwise.
  for (const direction of [1, -1]) {
    const signedArea = direction * Math.PI;
    assert.equal(Math.sign(signedArea), direction);
    assert.equal(Math.abs(signedArea), Math.PI);
  }
});

test('topological scope is stated for global potentials and Helmholtz decomposition', () => {
  const items = questions();
  const curlFree = items.find(q => q.question.includes('curl throughout its domain'));
  assert.deepEqual(Array.from(curlFree.accept), ['irrotational']);
  assert.match(curlFree.explanation, /hole/);
  const helmholtz = items.filter(q => q.question.includes('Helmholtz decomposition'));
  assert.ok(helmholtz.length >= 2);
  for (const item of helmholtz) {
    assert.match(item.question, /decay at infinity/);
    assert.match(item.explanation, /boundary conditions/);
  }
  const poincare = items.find(q => q.question.includes('closed $1$-form'));
  assert.ok(poincare);
  assert.match(poincare.explanation, /Higher-degree closed forms need additional/);
});
