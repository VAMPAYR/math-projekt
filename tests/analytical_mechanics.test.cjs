const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function topics() {
  const context = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/modules/m_landau_analytical_mechanics.js'), 'utf8'), context);
  return context.window.MATH_MODULES[0].topics;
}

test('analytical-mechanics numeric practice agrees with independent physical calculations', () => {
  const byId = new Map(topics().map(topic => [topic.id, topic]));
  const expected = new Map([
    ['constraints-rolling', 0.75 * 4 * 2 ** 2],
    ['euler-rigid-body', (4 - 2) * 3 / 2],
    ['canonical-transformations', 1],
    ['hamilton-jacobi-actions', 12 / 4],
    ['central-force-scattering', 2 / (2 * 1 * 1)]
  ]);
  for (const [id, answer] of expected) {
    assert.equal(byId.get(id).freeResponse[0].accept[0], answer, id);
  }
});

test('the nonlinear canonical map is invertible on q > 0 and has unit Jacobian', () => {
  for (const [q, p] of [[0.5, -3], [2, 5], [4, 0]]) {
    const Q = q * q / 2, P = p / q;
    assert.ok(Math.abs(Math.sqrt(2 * Q) - q) < 1e-12);
    assert.ok(Math.abs(P * Math.sqrt(2 * Q) - p) < 1e-12);
    const qStep = 1e-5, pStep = 1e-5;
    const qDerivative = ((q + qStep) ** 2 / 2 - (q - qStep) ** 2 / 2) / (2 * qStep);
    const pDerivative = ((p + pStep) / q - (p - pStep) / q) / (2 * pStep);
    assert.ok(Math.abs(qDerivative * pDerivative - 1) < 1e-9);
  }
});
