const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function curriculum() {
  const context = vm.createContext({ window: {} });
  for (const file of ['js/modules/m3_intermediate_algebra.js', 'js/problem_engine.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  }
  return { module: context.window.MATH_MODULES[0], checker: vm.runInContext('ProblemEngine', context) };
}

test('rational equation accepts the sum of its two real solutions, not the former invalid key', () => {
  const { module, checker } = curriculum();
  const topic = module.topics.find(item => item.id === 'quadratic-equations');
  const problem = topic.freeResponse.find(item => item.question.includes('sum of its real solutions'));
  assert.ok(problem, 'the solved rational equation must remain available');
  const roots = [2 - Math.sqrt(6), 2 + Math.sqrt(6)];
  for (const x of roots) {
    assert.notEqual(x, 0);
    assert.notEqual(x, -1);
    assert.ok(Math.abs(2 / x + 3 / (x + 1) - 1) < 1e-12);
  }
  assert.ok(Math.abs(roots[0] + roots[1] - 4) < 1e-12);
  assert.equal(checker.checkAnswer('4', problem.accept), true);
  assert.equal(checker.checkAnswer('2, -1', problem.accept), false);
  assert.match(problem.explanation, /x=0.*x=-1/);
  assert.match(problem.explanation, /sqrt6/);
});

test('square roots and zero exponents state when an inverse operation is valid', () => {
  const { module } = curriculum();
  const topic = module.topics.find(item => item.id === 'polynomials-exponents');
  const root = topic.mathGrammar.find(item => item.question.includes('square root'));
  const zeroPower = topic.mathGrammar.find(item => item.question.includes('x^0'));
  assert.match(root.answer, /\|x\|/);
  assert.match(root.answer, /nonnegative/);
  assert.match(zeroPower.answer, /nonzero/);
  assert.equal(Math.sqrt((-3) ** 2), 3);
  assert.ok((0.5 ** 2) < 0.5);
});
