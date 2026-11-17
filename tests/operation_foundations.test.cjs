const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('fraction division offers exactly one mathematically correct choice', () => {
  // REGRESSION: the previous choice list contained both 5/4 and 15/12,
  // so a mathematically correct answer was graded as incorrect.
  const context = vm.createContext({ window: {} });
  const file = path.join(__dirname, '../js/modules/m1_foundations.js');
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  const topic = context.window.MATH_MODULES.find(module => module.id === 'foundations')
    .topics.find(item => item.id === 'basic-arithmetic');
  const exercise = topic.exercises.find(item => item.question.includes('\\frac{5}{6}')
    && item.question.includes('\\frac{2}{3}'));
  assert.ok(exercise, 'fraction division exercise must remain available');
  const values = Array.from(exercise.options, option => {
    const fraction = option.match(/\\frac\{(\d+)\}\{(\d+)\}/);
    assert.ok(fraction, `expected a fraction option: ${option}`);
    return Number(fraction[1]) / Number(fraction[2]);
  });
  const expected = (5 / 6) / (2 / 3);
  const correct = values.map((value, index) => Math.abs(value - expected) < 1e-12 ? index : -1)
    .filter(index => index >= 0);
  assert.deepEqual(correct, [exercise.correctIndex]);
});

test('fraction multiplication offers exactly one mathematically correct choice', () => {
  // REGRESSION: both 6/20 and 3/10 were offered without a simplification
  // requirement, so the original card marked a correct choice wrong.
  const context = vm.createContext({ window: {} });
  const file = path.join(__dirname, '../js/modules/m1_foundations.js');
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  const topic = context.window.MATH_MODULES.find(module => module.id === 'foundations')
    .topics.find(item => item.id === 'basic-arithmetic');
  const exercise = topic.exercises.find(item => item.question.includes('\\frac{3}{4}')
    && item.question.includes('\\frac{2}{5}'));
  assert.ok(exercise, 'fraction multiplication exercise must remain available');
  const values = Array.from(exercise.options, option => {
    const fraction = option.match(/\\frac\{(\d+)\}\{(\d+)\}/);
    assert.ok(fraction, `expected a fraction option: ${option}`);
    return Number(fraction[1]) / Number(fraction[2]);
  });
  const expected = (3 / 4) * (2 / 5);
  const correct = values.map((value, index) => Math.abs(value - expected) < 1e-12 ? index : -1)
    .filter(index => index >= 0);
  assert.deepEqual(correct, [exercise.correctIndex]);
});
