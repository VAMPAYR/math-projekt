const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function load() {
  const context = vm.createContext({ window: {} });
  const file = path.join(__dirname, '../js/modules/m_landau_advanced_quantum.js');
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  return context.window.MATH_MODULES[0];
}

test('REGRESSION: quantum choice labels retain LaTeX commands after JavaScript loading', () => {
  // Ordinary JS strings previously dropped backslashes, turning λ and π into letters.
  const topics = load().topics;
  const perturbation = topics.find(topic => topic.id === 'nondegenerate-perturbation');
  const scattering = topics.find(topic => topic.id === 'scattering-cross-sections');
  const meanField = topics.find(topic => topic.id === 'mean-field-criticality');
  assert.equal(perturbation.exercises[0].options[1], String.raw`$3\lambda$`);
  assert.equal(scattering.exercises[0].options[2], String.raw`$12\pi$`);
  assert.equal(meanField.exercises[0].options[1], String.raw`$m=\pm\sqrt{a(T_c-T)/b}$`);
});

test('advanced quantum problems have complete, answerable choice sets', () => {
  const topics = load().topics;
  assert.equal(topics.length, 7);
  for (const topic of topics) {
    assert.ok(topic.examples.length >= 2, topic.id);
    assert.ok(topic.exercises.length >= 2, topic.id);
    assert.ok(topic.freeResponse.length >= 1, topic.id);
    for (const item of topic.exercises) {
      assert.ok(item.question && item.hint && item.correctExplanation, topic.id);
      assert.ok(item.options.every(option => typeof option === 'string' && option.length > 0), topic.id);
      assert.ok(Number.isInteger(item.correctIndex) && item.correctIndex >= 0 && item.correctIndex < item.options.length, topic.id);
      for (let i = 0; i < item.options.length; i++) {
        if (i !== item.correctIndex) assert.ok(item.wrongExplanations[i], `${topic.id} option ${i}`);
      }
    }
  }
});
