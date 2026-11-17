const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function load() {
  const context = vm.createContext({ window: {} });
  for (const name of ['m_mathematical_meaning.js']) {
    const file = path.join(__dirname, '../js/modules', name);
    vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  }
  const engine = path.join(__dirname, '../js/problem_engine.js');
  vm.runInContext(fs.readFileSync(engine, 'utf8'), context, { filename: engine });
  return { module: context.window.MATH_MODULES[0], checker: vm.runInContext('ProblemEngine.checkAnswer', context) };
}

test('each meaning lesson supplies worked comparisons and usable written practice', () => {
  const { module, checker } = load();
  assert.equal(module.id, 'mathematical-meaning');
  assert.equal(module.topics.length, 6);
  for (const topic of module.topics) {
    assert.ok(topic.foundationRefs.length >= 2, topic.id);
    assert.ok(topic.examples.length >= 2, topic.id);
    assert.ok(topic.exercises.length >= 2, topic.id);
    for (const example of topic.examples) {
      assert.ok(example.problem && example.steps.length >= 2, topic.id);
      assert.ok(example.steps.every(step => step.content), topic.id);
    }
    for (const problem of topic.exercises) {
      assert.ok(problem.hint && problem.correctExplanation, topic.id);
      assert.ok(Number.isInteger(problem.correctIndex) && problem.correctIndex >= 0 && problem.correctIndex < problem.options.length, topic.id);
      problem.options.forEach((option, i) => {
        assert.ok(option, topic.id);
        if (i !== problem.correctIndex) assert.ok(problem.wrongExplanations[i], topic.id);
      });
    }
    for (const problem of topic.freeResponse) {
      assert.ok(checker(String(problem.accept[0]), problem.accept, 'numeric'), topic.id);
      assert.ok(problem.hint && problem.explanation, topic.id);
    }
  }
});

test('quotient, percentage baseline and average-rate answers agree with independent calculations', () => {
  const { module } = load();
  const topic = id => module.topics.find(item => item.id === id);
  const selected = (id, i) => {
    const q = topic(id).exercises[i];
    return q.options[q.correctIndex];
  };
  assert.equal(selected('operations-and-quantities', 0), '20 ÷ 4');
  assert.equal(20 / 4, 5);
  assert.equal(selected('rates-ratios-and-scaling', 1), '$96$');
  assert.equal(100 * 1.2 * 0.8, 96);
  assert.equal(topic('models-evidence-and-limits').freeResponse[0].accept[0], (4 - 1) / (2 - 1));
});

test('math examples and choices retain TeX commands instead of control characters', () => {
  const { module } = load();
  assert.match(module.topics[0].examples[0].steps[1].content, /\\text\{/);
  assert.match(module.topics[1].examples[1].problem, /\\sqrt\{/);
  assert.match(module.topics[2].exercises[0].options[1], /\\sqrt\{/);
  assert.match(module.topics[5].examples[0].steps[1].content, /s'\(t\)/);
  assert.doesNotMatch(JSON.stringify(module), /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/);
});
