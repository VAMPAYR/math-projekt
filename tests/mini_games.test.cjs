/* Completion guards and shared numeric grading in mini-games. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function harness() {
  const nodes = new Map();
  const attempts = { correct: 0, wrong: 0 };
  const context = vm.createContext({
    document: { getElementById: id => nodes.get(id) || null }, setTimeout() {},
    GameState: {
      recordCorrectAnswer() { attempts.correct++; return { xpGained: 15 }; },
      recordWrongAnswer() { attempts.wrong++; }, showXPGain() {}
    }
  });
  context.window = context;
  for (const file of ['problem_engine.js', 'mini_games.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../js', file), 'utf8'), context);
  }
  const games = vm.runInContext('MiniGames', context);
  function mount(id, dataset = {}) {
    const button = { disabled: false };
    const card = { dataset, querySelectorAll: () => [button] };
    const input = { value: '', disabled: false };
    const feedback = { innerHTML: '', className: '' };
    const steps = { style: { display: 'none' } };
    nodes.set(id, card);
    nodes.set(`${id}-input`, input);
    nodes.set(`${id}-feedback`, feedback);
    nodes.set(`${id}-steps`, steps);
    nodes.set(`${id}-hint`, steps);
    return { card, input, feedback, button, steps };
  }
  return { games, attempts, mount };
}

for (const [label, method, answer] of [['balance', 'checkBalance', 4], ['pattern', 'checkPattern', 10]]) {
  test(`${label} accepts only a complete exact numeric answer and awards a solved card once`, () => {
    const { games, attempts, mount } = harness();
    const elements = mount(label, { rule: 'Add 2 each time.' });
    const check = () => games[method](label, answer);
    check();
    assert.equal(attempts.wrong, 0, 'empty input is not an attempted answer');
    elements.input.value = `${answer}garbage`;
    check(); check();
    assert.equal(attempts.correct, 0, 'a correct numeric prefix cannot earn credit');
    assert.equal(attempts.wrong, 1, 'repeated Enter/click on the same answer is one attempt');
    elements.input.value = String(answer - 0.0001);
    check();
    assert.equal(attempts.correct, 0, 'nearby decimals cannot pass an exact integer problem');
    elements.input.value = `${answer}e0`;
    check();
    assert.equal(attempts.correct, 1);
    assert.equal(elements.card.dataset.solved, 'true');
    assert.equal(elements.input.disabled, true);
    assert.equal(elements.button.disabled, true);
    const feedback = elements.feedback.innerHTML;
    elements.input.value = '999';
    check();
    assert.equal(attempts.correct, 1);
    assert.equal(attempts.wrong, 2, 'solved card cannot record another wrong attempt');
    assert.equal(elements.feedback.innerHTML, feedback, 'completion feedback is stable');
    assert.doesNotThrow(() => games[method]('removed-card', answer));
  });
}

test('expression completion disables its controls and cannot earn duplicate credit', () => {
  const { games, attempts, mount } = harness();
  const elements = mount('expression', { answer: 'x+5' });
  elements.input.value = '5+x';
  games.checkExpression('expression');
  games.checkExpression('expression');
  assert.equal(attempts.correct, 1);
  assert.equal(elements.input.disabled, true);
  assert.equal(elements.button.disabled, true);
});
