const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('kinetic practice keys agree with independently calculated energies, transport and occupations', () => {
  const context = vm.createContext({ window: {} });
  const source = fs.readFileSync(path.join(__dirname, '../js/modules/m_landau_advanced_kinetics.js'), 'utf8');
  vm.runInContext(source, context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/problem_engine.js'), 'utf8'), context);
  const module = context.window.MATH_MODULES.find(item => item.id === 'landau-advanced-kinetics');
  const checker = vm.runInContext('ProblemEngine', context);
  const expected = {
    'collision-invariants': 2 * 0.5 * 1 * 3 ** 2,
    'h-theorem-equilibrium': 3 * 6 / 2,
    'relaxation-and-transport': 9 * 2,
    'fluctuation-response': 3 * 4,
    'quantum-occupations': 1 / (3 + 1)
  };
  for (const [topicId, value] of Object.entries(expected)) {
    const question = module.topics.find(topic => topic.id === topicId)?.freeResponse[0];
    assert.ok(question, `missing numeric practice for ${topicId}`);
    assert.equal(checker.checkAnswer(String(value), question.accept), true, `${topicId} should accept its independently derived answer`);
    assert.equal(checker.checkAnswer(String(value + 1), question.accept), false, `${topicId} should reject a different value`);
  }
});
