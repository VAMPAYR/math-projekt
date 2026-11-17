/* Validate the numeric transfer problems and explanatory feedback. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
function load() {
  const sandbox = { window: {} };
  const context = vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(root, 'js/modules/m_landau_advanced_fields.js'), 'utf8'), context);
  vm.runInContext(fs.readFileSync(path.join(root, 'js/problem_engine.js'), 'utf8'), context);
  return {
    module: sandbox.window.MATH_MODULES[0],
    checkAnswer: vm.runInContext('ProblemEngine.checkAnswer', context)
  };
}

test('advanced-field numeric answers match independent calculations and reject a different value', () => {
  const { module, checkAnswer } = load();
  // Isotropic detector fraction; one-dimensional inverse operator at the source;
  // diagonal dielectric response; resonant Lorentz susceptibility; toy running coupling.
  const expected = {
    'advanced-scattering-cross-sections': 12 / 4,
    'advanced-propagators-and-cutoffs': 1 / (2 * 4),
    'advanced-anisotropic-dielectrics': 2 * 1,
    'advanced-dispersion-lorentz': 13 / (1 * 3),
    'advanced-running-couplings': (1 / 10) / (1 - 2 / 10)
  };
  for (const [id, correct] of Object.entries(expected)) {
    const topic = module.topics.find(item => item.id === id);
    assert.ok(topic, 'Missing topic ' + id);
    const question = topic.freeResponse[0];
    assert.equal(checkAnswer(String(correct), question.accept), true, 'Valid answer rejected for ' + id);
    assert.equal(checkAnswer(String(correct + 1), question.accept), false, 'Wrong answer accepted for ' + id);
  }
});

test('each advanced-field topic provides worked reasoning and specific choice feedback', () => {
  const { module } = load();
  assert.equal(module.topics.length, 5);
  for (const topic of module.topics) {
    assert.ok(topic.examples.length >= 2, topic.id + ' requires contrasting worked examples');
    assert.ok(topic.foundationRefs.length > 0, topic.id + ' requires linked prerequisites');
    for (const exercise of topic.exercises) {
      assert.ok(exercise.hint && exercise.correctExplanation);
      assert.ok(Number.isInteger(exercise.correctIndex));
      assert.ok(exercise.correctIndex >= 0 && exercise.correctIndex < exercise.options.length);
      exercise.options.forEach((_, index) => {
        if (index !== exercise.correctIndex) assert.ok(exercise.wrongExplanations[index], topic.id + ': missing feedback for option ' + index);
      });
    }
  }
});
