const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function load() {
  const context = vm.createContext({ window: {} });
  for (const file of ['js/modules/m5_calculus1.js', 'js/problem_engine.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  }
  return { module: context.window.MATH_MODULES[0], checker: vm.runInContext('ProblemEngine', context) };
}

test('quotient-rule answer accepts the derivative and rejects its negative', () => {
  const { module, checker } = load();
  const topic = module.topics.find(t => t.id === 'derivatives');
  const problem = topic.freeResponse.find(p => p.question.startsWith('Quotient rule:'));
  assert.ok(problem);
  assert.equal(checker.checkAnswer("(gf'-fg')/g^2", problem.accept, 'freeResponse'), true);
  assert.equal(checker.checkAnswer("(fg'-gf')/g^2", problem.accept, 'freeResponse'), false);
  // f=x and g=x+1 give derivative 1/(x+1)^2, not its negative.
  const x = 2;
  assert.ok(((x + 1) - x) / (x + 1) ** 2 > 0);
});

test('closed-box exercise selects the actual surface-area minimizer', () => {
  const { module } = load();
  const topic = module.topics.find(t => t.id === 'derivative-applications');
  const problem = topic.exercises.find(p => p.question.includes('closed box'));
  assert.ok(problem);
  assert.equal(problem.correctIndex, 3);
  const candidates = [2, 4, 8, Math.cbrt(32)];
  const surface = x => 2 * x ** 2 + 128 / x;
  assert.ok(candidates.every((x, i) => i === problem.correctIndex || surface(candidates[problem.correctIndex]) < surface(x)));
  for (const index of [0, 1, 2]) assert.ok(problem.wrongExplanations[index]);
});
