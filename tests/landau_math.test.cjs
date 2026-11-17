/* Preserve the mathematical bridge and its answerable worked practice. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadBridge() {
  const context = vm.createContext({ window: {} });
  const file = path.join(__dirname, '../js/modules/m_landau_math.js');
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  return context.window.MATH_MODULES.find(module => module.id === 'landau-math');
}

test('mathematical bridge retains the connected preparation subjects and reasoned practice', () => {
  const module = loadBridge();
  assert.ok(module);
  const expected = [
    'complex-phase', 'eigenmodes', 'vector-integral-theorems', 'tensor-basics',
    'differential-equations', 'fourier-analysis', 'pde-green-functions', 'variational-calculus'
  ];
  assert.deepEqual(Array.from(module.topics, topic => topic.id).sort(), expected.sort());
  for (const topic of module.topics) {
    assert.ok(topic.foundationRefs?.length, topic.id + ' must connect to prior lessons');
    assert.ok(topic.examples?.length >= 2, topic.id + ' needs at least two worked examples');
    assert.ok(topic.exercises?.length && topic.freeResponse?.length, topic.id + ' needs answerable practice');
    for (const example of topic.examples) {
      assert.ok(example.problem && example.steps?.length >= 2, topic.id + ' needs an explained method');
      for (const step of example.steps) assert.ok(step.title && step.content, topic.id + ' has an empty step');
    }
    for (const exercise of topic.exercises) {
      assert.ok(exercise.hint && exercise.correctExplanation);
      assert.ok(Number.isInteger(exercise.correctIndex));
      assert.ok(exercise.correctIndex >= 0 && exercise.correctIndex < exercise.options.length);
      exercise.options.forEach((_, index) => {
        if (index !== exercise.correctIndex) assert.ok(exercise.wrongExplanations?.[index]);
      });
    }
    for (const item of topic.freeResponse) assert.ok(item.accept?.length && item.hint && item.explanation);
  }
});

test('complex plane diagram uses one scale for real and imaginary components', () => {
  const html = loadBridge().topics.find(topic => topic.id === 'complex-phase').concept;
  const vector = html.match(/<line x1="100" y1="180" x2="175" y2="80"/);
  assert.ok(vector, 'The vector for 3 + 4i must reach the plotted point');
  assert.equal((175 - 100) / 3, (180 - 80) / 4, 'Axes must use equal unit scales');
  assert.match(html, /<title[^>]*>[\s\S]*?<\/title>/);
  assert.match(html, /<desc[^>]*>[\s\S]*?<\/desc>/);
});
