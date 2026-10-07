/* Behavioral regressions. Run with: node --test tests/*.test.cjs */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

function element(id = '') {
  const classes = new Set();
  return {
    id, dataset: {}, style: {}, attributes: {}, innerHTML: '', textContent: '',
    value: '', disabled: false, children: [],
    classList: {
      add: (...names) => names.forEach(name => classes.add(name)),
      remove: (...names) => names.forEach(name => classes.delete(name)),
      contains: name => classes.has(name),
      toggle(name, force) {
        const selected = force === undefined ? !classes.has(name) : Boolean(force);
        if (selected) classes.add(name); else classes.delete(name);
        return selected;
      }
    },
    setAttribute(name, value) { this.attributes[name] = String(value); },
    removeAttribute(name) { delete this.attributes[name]; },
    addEventListener() {}, focus() {}, remove() {},
    appendChild(child) { this.children.push(child); },
    querySelector(selector) { return this.children.find(child => child.tagName === selector) || null; },
    querySelectorAll() { return []; }
  };
}

function harness(modules = []) {
  const nodes = new Map();
  const storage = new Map();
  const attempts = { correct: [], wrong: 0, review: [] };
  const document = {
    documentElement: element(), body: element(), addEventListener() {},
    getElementById: id => nodes.get(id) || null,
    createElement: tagName => Object.assign(element(), { tagName }),
    querySelector: () => null,
    querySelectorAll(selector) {
      const review = selector.match(/^#(rv-\d+)-options \.option-btn$/);
      return review ? [...nodes.values()].filter(node => node.id.startsWith(`${review[1]}-opt-`)) : [];
    }
  };
  const sandbox = {
    document, console, MATH_MODULES: modules, scrollTo() {},
    requestAnimationFrame: () => 0,
    setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    localStorage: {
      getItem: key => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key)
    },
    GameState: {
      init() {}, showXPGain() {},
      recordCorrectAnswer(...args) { attempts.correct.push(args); return { xpGained: 20 }; },
      recordWrongAnswer() { attempts.wrong++; },
      getTopicMastery: () => ({ score: 0 }), getState: () => ({}),
      getStreakDays: () => 0, getStreak: () => 0, getAccuracy: () => 0,
      isDailyChallengeComplete: () => false,
      getLevel: () => 1, getLevelTitle: () => 'Learner', getXP: () => 0,
      getXPForNextLevel: () => 100, getXPProgress: () => 0, getAchievements: () => ({})
    },
    ReviewEngine: { recordAttempt: attempt => attempts.review.push(attempt) },
    MathEngine: { renderAllMath() {} }
  };
  sandbox.window = sandbox;
  const context = vm.createContext(sandbox);
  function load(file, exportName) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
    return exportName ? vm.runInContext(exportName, context) : null;
  }
  const problemEngine = load('js/problem_engine.js', 'ProblemEngine');
  function mount(...ids) {
    ids.forEach(id => nodes.set(id, element(id)));
    return nodes.get(ids[0]);
  }
  function engine() {
    mount('content-inner');
    // The real schedule engine supplies the dashboard getters during init.
    load('js/review_engine.js');
    const result = load('js/engine.js', 'MathEngine');
    result.init();
    return result;
  }
  return { problemEngine, context, nodes, attempts, mount, load, engine };
}

function moduleWith(topic) {
  return [{ id: 'test-module', order: 1, title: 'Test Module', topics: [{ id: 'topic', title: 'Topic', ...topic }] }];
}

test('numeric entry accepts zero and equivalent complete numeric forms', () => {
  const { problemEngine: p } = harness();
  for (const [answer, accept] of [
    ['0', 0], ['-0', [0]], ['0/9', 0], ['-1/4', -0.25], ['25/100', 0.25],
    ['2/8', ['1/4']], ['25 / 100', 0.25], ['0.2500', ['1/4']], ['+0.25', 0.25], ['2.5e-1', 0.25],
    ['1,200', 1200], ['1.2e3', 1200], ['$0.25$', 0.25], ['(0.25)', 0.25],
    ['\\frac{25}{100}', 0.25], ['\\dfrac{1}{4}', 0.25], ['−0.25', -0.25]
  ]) assert.equal(p.checkAnswer(answer, accept), true, `${answer} should equal ${accept}`);
});

test('numeric entry rejects malformed, undefined, and incomplete values', () => {
  const { problemEngine: p } = harness();
  for (const answer of ['12junk', 'x=12', '1+2', '1,2', '1 2', '1. 2', '12.0.0', '12/1junk',
    '12/0', '0/0', '12/1/1', '/12', '12/', '12%', '12°', 'NaN', 'Infinity',
    '1e999', '', ' ', null, undefined]) {
    assert.equal(p.checkAnswer(answer, 12), false, `${answer} must not be read as 12`);
  }
  assert.equal(p.checkAnswer('0', NaN), false);
  assert.equal(p.checkAnswer('0', Infinity), false);
  assert.equal(p.checkAnswer('0', null), false);
});

test('exact answers stay exact unless the problem states a numeric tolerance', () => {
  const { problemEngine: p } = harness();
  assert.equal(p.checkAnswer('0.2495', 0.25), false);
  assert.equal(p.checkAnswer('0.2505', 0.25), false);
  assert.equal(p.checkAnswer('0.00000000001', 0), false);
  assert.equal(p.checkAnswer('0.2495', 0.25, undefined, 0.0005), true);
  assert.equal(p.checkAnswer('0.2494', 0.25, undefined, 0.0005), false);
  assert.equal(p.checkAnswer('0.2495', 0.25, undefined, -1), false);
  assert.equal(p.checkAnswer('0.2495', 0.25, undefined, Infinity), false);
  // Listed approximations in existing lessons retain their stated values.
  assert.equal(p.checkAnswer('0.8660', ['sqrt(3)/2', '0.866']), true);
  assert.equal(p.checkAnswer('0.8665', ['sqrt(3)/2', '0.866']), false);
  assert.equal(p.checkAnswer('7.070', ['7.07', '5√2']), true);
  assert.equal(p.checkAnswer('2/6', ['1/3', '0.333']), true);
});

test('symbolic and regular-expression accepted forms keep working across retries', () => {
  const { problemEngine: p, context } = harness();
  assert.equal(p.checkAnswer('2 x', ['2x']), true);
  assert.equal(p.checkAnswer('x * y', ['xy']), true);
  assert.equal(p.checkAnswer('(x-1)(x+1)', ['(x-1)(x+1)']), true);
  assert.equal(p.checkAnswer('sqrt(3)/2', ['sqrt(3)/2']), true);
  const pattern = vm.runInContext('/^yes$/g', context);
  assert.equal(p.checkAnswer('yes', pattern), true);
  assert.equal(p.checkAnswer('yes', pattern), true);
  assert.equal(p.checkAnswer('no', pattern), false);
});

test('QC keeps the A/B/equal/undetermined mapping and scores each card once', () => {
  for (let index = 0; index < 4; index++) {
    const h = harness(moduleWith({ quantComparison: [{ quantityA: '$x$', quantityB: '$y$', correctIndex: index, explanation: 'Compare every allowed value.' }] }));
    const id = 'qc-topic-0';
    h.mount(id, `${id}-correct`, `${id}-incorrect`, `${id}-incorrect-text`, ...[0, 1, 2, 3].map(i => `${id}-opt-${i}`));
    const html = h.problemEngine.renderQuantComparison(h.context.MATH_MODULES[0].topics[0].quantComparison, 'test-module', 'topic');
    for (const label of ['Quantity A is greater.', 'Quantity B is greater.', 'The two quantities are equal.', 'The relationship cannot be determined']) assert.ok(html.includes(label));
    h.problemEngine.selectQC(id, index, 0, 'topic');
    assert.ok(h.nodes.get(`${id}-correct`).classList.contains('show'));
    assert.ok(h.nodes.get(`${id}-opt-${index}`).classList.contains('correct'));
    assert.equal(h.attempts.correct.length, 1);
    assert.equal(h.attempts.review[0].correct, true);
    h.problemEngine.selectQC(id, index, 0, 'topic');
    assert.equal(h.attempts.correct.length, 1);
  }
});

test('wrong QC choice identifies the actual answer and explains the selected error', () => {
  const h = harness(moduleWith({ quantComparison: [{ correctIndex: 3, explanation: 'Two permitted values give different relationships.', wrongExplanations: { 0: 'One example does not prove a general ordering.' } }] }));
  const id = 'qc-topic-0';
  h.mount(id, `${id}-correct`, `${id}-incorrect`, `${id}-incorrect-text`, ...[0, 1, 2, 3].map(i => `${id}-opt-${i}`));
  h.problemEngine.selectQC(id, 0, 0, 'topic');
  assert.ok(h.nodes.get(`${id}-incorrect`).classList.contains('show'));
  assert.match(h.nodes.get(`${id}-incorrect-text`).innerHTML, /Answer: D/);
  assert.match(h.nodes.get(`${id}-incorrect-text`).innerHTML, /One example does not prove/);
  assert.equal(h.attempts.wrong, 1);
  assert.equal(h.attempts.correct.length, 0);
});

test('multi-select requires every correct choice and no extras', () => {
  for (const [selected, expected] of [[[1, 3], true], [[1], false], [[1, 2, 3], false], [[0], false]]) {
    const h = harness(moduleWith({ multiSelect: [{ question: 'Choose both fractions.', options: ['-1', '1/2', '1', '3/4'], correctIndices: [1, 3], explanation: 'Exactly the values between zero and one work.' }] }));
    const id = 'ms-topic-0';
    h.mount(id, `${id}-correct`, `${id}-incorrect`, `${id}-incorrect-text`, ...[0, 1, 2, 3].map(i => `${id}-opt-${i}`));
    selected.forEach(i => h.problemEngine.toggleMSOption(id, i));
    selected.forEach(i => assert.equal(h.nodes.get(`${id}-opt-${i}`).attributes['aria-pressed'], 'true'));
    h.problemEngine.checkMultiSelect(id, 0, 'topic');
    assert.equal(h.nodes.get(`${id}-correct`).classList.contains('show'), expected);
    assert.equal(h.attempts.correct.length, expected ? 1 : 0);
    assert.equal(h.attempts.wrong, expected ? 0 : 1);
    if (!expected) assert.match(h.nodes.get(`${id}-incorrect-text`).innerHTML, /Correct choices: B, D/);
    h.problemEngine.checkMultiSelect(id, 0, 'topic');
    assert.equal(h.attempts.correct.length + h.attempts.wrong, 1, 'repeated submission must not score again');
  }
});

test('empty multi-select leaves the problem open; selecting and clearing updates its accessible state', () => {
  const h = harness(moduleWith({ multiSelect: [{ options: ['A', 'B'], correctIndices: [0] }] }));
  const id = 'ms-topic-0';
  h.mount(id, `${id}-opt-0`, `${id}-opt-1`);
  h.problemEngine.toggleMSOption(id, 0);
  h.problemEngine.toggleMSOption(id, 0);
  assert.equal(h.nodes.get(`${id}-opt-0`).attributes['aria-pressed'], 'false');
  h.problemEngine.checkMultiSelect(id, 0, 'topic');
  assert.notEqual(h.nodes.get(id).dataset.answered, 'true');
  assert.equal(h.attempts.correct.length + h.attempts.wrong, 0);
});

test('free response applies its problem tolerance and prevents duplicate credit', () => {
  const h = harness(moduleWith({ freeResponse: [{ question: 'Approximate the value.', accept: [0.25], tolerance: 0.001, difficulty: 'medium' }] }));
  const id = 'fr-topic-0';
  h.mount(id, `${id}-input`, `${id}-correct`, `${id}-incorrect`, `${id}-incorrect-text`);
  h.nodes.get(`${id}-input`).value = '0.2495';
  h.nodes.get(`${id}-input`).classList.add('incorrect');
  h.problemEngine.checkFreeResponse(id, 0, 'topic', 'test-module');
  assert.equal(h.nodes.get(`${id}-input`).disabled, true);
  assert.equal(h.nodes.get(`${id}-input`).classList.contains('incorrect'), false);
  assert.equal(h.attempts.correct.length, 1);
  h.problemEngine.checkFreeResponse(id, 0, 'topic', 'test-module');
  assert.equal(h.attempts.correct.length, 1);
  assert.equal(h.attempts.review.length, 1);
});

test('fill blanks awards credit once and cannot pass with missing answer inputs', () => {
  const h = harness(moduleWith({ fillBlanks: [{ blanks: [{ accept: 0 }, { accept: 0.25, tolerance: 0.001 }] }] }));
  const id = 'fb-topic-0';
  h.mount(id, `${id}-correct`, `${id}-incorrect`, `${id}-blank-0`);
  h.nodes.get(`${id}-blank-0`).value = '0';
  h.problemEngine.checkFillBlanks(id, 0, 'topic', 'test-module');
  assert.equal(h.attempts.correct.length, 0);
  h.mount(`${id}-blank-1`).value = '0.2495';
  h.problemEngine.checkFillBlanks(id, 0, 'topic', 'test-module');
  h.problemEngine.checkFillBlanks(id, 0, 'topic', 'test-module');
  assert.equal(h.attempts.correct.length, 1);
});

test('multipart cannot score an empty or locked part and scores completion once', () => {
  const h = harness(moduleWith({ multiPart: [{ parts: [{ question: 'Enter zero.', accept: 0 }] }] }));
  const id = 'mp-topic-0';
  h.mount(id, `${id}-complete`, `${id}-part-0-input`, `${id}-part-0-feedback`);
  const input = h.nodes.get(`${id}-part-0-input`);
  h.problemEngine.checkMultiPart(id, 0, 0, 'topic');
  assert.equal(h.attempts.wrong, 0);
  input.value = '0'; input.disabled = true;
  h.problemEngine.checkMultiPart(id, 0, 0, 'topic');
  assert.equal(h.attempts.correct.length, 0);
  input.disabled = false;
  h.problemEngine.checkMultiPart(id, 0, 0, 'topic');
  h.problemEngine.checkMultiPart(id, 0, 0, 'topic');
  assert.equal(h.attempts.correct.length, 1);
});

test('nested structured content is retained even when a nested problem omits optional difficulty', () => {
  const { problemEngine: p } = harness();
  const steps = [{ question: 'Outer construction.', steps: [{ content: 'First outer step.' }, { question: 'Inner construction.', steps: [{ content: 'Inner step.' }] }] }];
  const parts = [{ question: 'Outer challenge.', parts: [{ question: 'Outer part.', accept: 1 }, { question: 'Inner challenge.', parts: [{ question: 'Inner part.', accept: 2 }] }] }];
  const stepHtml = p.renderStepBuilder(steps, 'test-module', 'topic');
  const partHtml = p.renderMultiPart(parts, 'test-module', 'topic');
  assert.equal(steps.length, 2); assert.equal(parts.length, 2);
  assert.ok(stepHtml.includes('Inner construction.')); assert.ok(partHtml.includes('Inner challenge.'));
  assert.equal(stepHtml.includes('undefined'), false); assert.equal(partHtml.includes('undefined'), false);
  p.renderStepBuilder(steps, 'test-module', 'topic');
  p.renderMultiPart(parts, 'test-module', 'topic');
  assert.equal(steps.length, 2); assert.equal(parts.length, 2);
});

test('answer lookups and solutions use the requested module when topic IDs repeat', () => {
  function duplicateModules(field, first, second) {
    return [
      { id: 'earlier', topics: [{ id: 'same-topic', [field]: [first] }] },
      { id: 'later', topics: [{ id: 'same-topic', [field]: [second] }] }
    ];
  }
  {
    const h = harness(duplicateModules('freeResponse', { accept: 1, solution: 'Earlier answer.' }, { accept: 2, solution: 'Later answer.' }));
    const id = 'fr-same-topic-0';
    h.mount(id, `${id}-input`, `${id}-correct`, `${id}-incorrect`, `${id}-incorrect-text`, `${id}-solution`, `${id}-solution-text`);
    h.nodes.get(`${id}-input`).value = '2';
    h.problemEngine.checkFreeResponse(id, 0, 'same-topic', 'later');
    assert.equal(h.attempts.correct.length, 1);
    assert.equal(h.attempts.correct[0][3], 'later');
    h.problemEngine.revealFRAnswer(id, 0, 'same-topic', 'later');
    assert.equal(h.nodes.get(`${id}-solution-text`).innerHTML, 'Later answer.');
    assert.equal(h.attempts.review[0].moduleId, 'later');
  }
  {
    const h = harness(duplicateModules('fillBlanks', { blanks: [{ accept: 1 }] }, { blanks: [{ accept: 2 }] }));
    const id = 'fb-same-topic-0';
    h.mount(id, `${id}-blank-0`, `${id}-correct`, `${id}-incorrect`);
    h.nodes.get(`${id}-blank-0`).value = '2';
    h.problemEngine.checkFillBlanks(id, 0, 'same-topic', 'later');
    assert.equal(h.attempts.correct.length, 1);
    assert.equal(h.attempts.correct[0][3], 'later');
  }
  {
    const h = harness(duplicateModules('multiPart', { parts: [{ accept: 1 }] }, { parts: [{ accept: 2 }] }));
    const id = 'mp-same-topic-0';
    h.mount(id, `${id}-part-0-input`, `${id}-part-0-feedback`, `${id}-complete`);
    h.nodes.get(`${id}-part-0-input`).value = '2';
    h.problemEngine.checkMultiPart(id, 0, 0, 'same-topic', 'later');
    assert.equal(h.attempts.correct.length, 1);
    assert.equal(h.attempts.correct[0][3], 'later');
  }
  for (const [field, method, id] of [['quantComparison', 'selectQC', 'qc'], ['strategySelect', 'selectStrategy', 'ss']]) {
    const h = harness(duplicateModules(field, { options: ['A', 'B'], correctIndex: 0 }, { options: ['A', 'B'], correctIndex: 1 }));
    const cardId = `${id}-same-topic-0`;
    h.mount(cardId, `${cardId}-correct`, `${cardId}-incorrect`, `${cardId}-incorrect-text`, ...[0, 1, 2, 3].map(i => `${cardId}-opt-${i}`));
    h.problemEngine[method](cardId, 1, 0, 'same-topic', 'later');
    assert.equal(h.attempts.correct.length, 1);
    assert.equal(h.attempts.correct[0][3], 'later');
    if (field === 'quantComparison') assert.equal(h.attempts.review[0].moduleId, 'later');
  }
  {
    const h = harness(duplicateModules('multiSelect', { options: ['A', 'B'], correctIndices: [0] }, { options: ['A', 'B'], correctIndices: [1] }));
    const id = 'ms-same-topic-0';
    h.mount(id, `${id}-opt-0`, `${id}-opt-1`, `${id}-correct`, `${id}-incorrect`, `${id}-incorrect-text`);
    h.problemEngine.toggleMSOption(id, 1);
    h.problemEngine.checkMultiSelect(id, 0, 'same-topic', 'later');
    assert.equal(h.attempts.correct.length, 1);
    assert.equal(h.attempts.correct[0][3], 'later');
  }
  {
    const h = harness(duplicateModules('fadedExamples', { steps: [{ prompt: 'Number?', accept: 1 }] }, { steps: [{ prompt: 'Number?', accept: 2 }] }));
    const id = 'fe-same-topic-0';
    h.mount(id, `${id}-blank-0`, `${id}-blank-0-result`, `${id}-correct`, `${id}-incorrect`, `${id}-incorrect-text`);
    h.nodes.get(`${id}-blank-0`).value = '2';
    h.problemEngine.checkFaded(id, 0, 'same-topic', 'later');
    assert.equal(h.attempts.correct.length, 1);
    assert.equal(h.attempts.correct[0][3], 'later');
  }
});

test('step-builder and matching preserve render-time credit scope across repeated topic IDs', () => {
  const modules = ['earlier', 'later'].map(id => ({ id, topics: [{
    id: 'same-topic',
    stepBuilder: [{ question: `${id} construction.`, steps: [{ content: 'First step.' }] }],
    matching: [{ pairs: [{ left: 'Input', right: 'Output' }] }]
  }] }));
  const h = harness(modules);
  const stepId = 'sb-same-topic-0';
  h.mount(`${stepId}-selected`, `${stepId}-available`, `${stepId}-correct`, `${stepId}-incorrect`);
  const matchId = 'match-same-topic-0';
  h.mount(`${matchId}-score`, `${matchId}-correct`);
  for (const moduleId of ['later', 'earlier']) {
    const topic = modules.find(module => module.id === moduleId).topics[0];
    const otherModule = moduleId === 'later' ? 'earlier' : 'later';
    h.problemEngine.renderStepBuilder(topic.stepBuilder, moduleId, 'same-topic');
    h.problemEngine.resetStepBuilder(stepId, 'same-topic', 0, otherModule);
    const button = element();
    // A stale event from another module must not change the current construction.
    h.problemEngine.selectStep(stepId, button, 0, 1, 'same-topic', 0, otherModule);
    assert.equal(button.disabled, false);
    // Old callers still use the unambiguous scope retained by the renderer.
    h.problemEngine.selectStep(stepId, button, 0, 1, 'same-topic', 0);
    assert.equal(h.attempts.correct.at(-1)[3], moduleId);
    h.problemEngine.resetStepBuilder(stepId, 'same-topic', 0);
    h.problemEngine.selectStep(stepId, element(), 0, 1, 'same-topic', 0, moduleId);
    assert.equal(h.attempts.correct.at(-1)[3], moduleId);

    h.problemEngine.renderMatching(topic.matching, moduleId, 'same-topic');
    const left = element(); left.dataset = { side: 'left', pairIdx: '0' };
    const right = element(); right.dataset = { side: 'right', pairIdx: '0' };
    h.problemEngine.matchSelect(left, matchId, 1, 'same-topic', otherModule);
    assert.equal(left.classList.contains('match-selected'), false);
    h.problemEngine.matchSelect(left, matchId, 1, 'same-topic');
    h.problemEngine.matchSelect(right, matchId, 1, 'same-topic');
    assert.equal(h.attempts.correct.at(-1)[3], moduleId);
  }
  assert.deepEqual(h.attempts.correct.map(attempt => attempt[3]), ['later', 'later', 'later', 'earlier', 'earlier', 'earlier']);
});

test('unrendered moduleless step and matching calls cannot credit an ambiguous topic', () => {
  const h = harness(['earlier', 'later'].map(id => ({ id, topics: [{ id: 'same-topic' }] })));
  h.mount('sb-same-topic-0-selected', 'sb-same-topic-0-correct', 'sb-same-topic-0-incorrect', 'match-same-topic-0-score', 'match-same-topic-0-correct');
  const step = element();
  h.problemEngine.selectStep('sb-same-topic-0', step, 0, 1, 'same-topic', 0);
  assert.equal(step.disabled, false);
  const left = element(); left.dataset = { side: 'left', pairIdx: '0' };
  const right = element(); right.dataset = { side: 'right', pairIdx: '0' };
  h.problemEngine.matchSelect(left, 'match-same-topic-0', 1, 'same-topic');
  h.problemEngine.matchSelect(right, 'match-same-topic-0', 1, 'same-topic');
  assert.equal(left.classList.contains('matched'), false);
  assert.equal(h.attempts.correct.length, 0);
});

test('practice credit keeps duplicate-topic mastery separate in the real game state', () => {
  const modules = ['earlier', 'later'].map(id => ({ id, topics: [{
    id: 'same-topic', freeResponse: [{ accept: 2, difficulty: 'medium' }]
  }] }));
  const h = harness(modules);
  const gameState = h.load('js/game_state.js', 'GameState');
  gameState.init();
  gameState.showXPGain = () => {};
  const id = 'fr-same-topic-0';
  for (const moduleId of ['earlier', 'later', 'later']) {
    h.mount(id, `${id}-input`, `${id}-correct`, `${id}-incorrect`, `${id}-incorrect-text`);
    h.nodes.get(`${id}-input`).value = '2';
    h.problemEngine.checkFreeResponse(id, 0, 'same-topic', moduleId);
  }
  assert.equal(gameState.getTopicMastery('same-topic', 'earlier').problemsSolved, 1);
  assert.equal(gameState.getTopicMastery('same-topic', 'later').problemsSolved, 2);
  assert.equal(gameState.getTopicMastery('same-topic', 'earlier').score, 6);
  assert.equal(gameState.getTopicMastery('same-topic', 'later').score, 12);
  assert.equal(gameState.getTopicMastery('same-topic').problemsSolved, 0, 'ambiguous moduleless mastery must not select another module');
});

test('rendered problem handlers carry the module scope through the learner action', () => {
  const { problemEngine: p } = harness();
  const cases = [
    ['renderStepBuilder', { question: 'Build.', steps: [{ content: 'First step.' }] }, 'selectStep'],
    ['renderMatching', { pairs: [{ left: 'Input', right: 'Output' }] }, 'matchSelect'],
    ['renderFreeResponse', { question: 'Enter 2.', accept: 2 }, 'revealFRAnswer'],
    ['renderMultiPart', { question: 'Solve.', parts: [{ question: 'Enter 2.', accept: 2 }] }, 'checkMultiPart'],
    ['renderQuantComparison', { quantityA: '1', quantityB: '2', correctIndex: 1 }, 'selectQC'],
    ['renderMultiSelect', { question: 'Select.', options: ['2'], correctIndices: [0] }, 'checkMultiSelect'],
    ['renderFadedExamples', { problem: 'Complete.', steps: [{ prompt: 'Enter 2.', accept: 2 }] }, 'checkFaded'],
    ['renderStrategySelect', { scenario: 'Pick.', options: ['A', 'B'], correctIndex: 1 }, 'selectStrategy']
  ];
  for (const [render, problem, handler] of cases) {
    const html = p[render]([problem], 'later', 'same-topic');
    const action = html.match(new RegExp(`ProblemEngine\\.${handler}\\([^\"]+`));
    assert.ok(action, `${render} must expose ${handler}`);
    assert.ok(action[0].includes("'later'"), `${handler} must use the module currently being rendered`);
  }
});

test('GRE-only activities retain a Practice tab in Learn and Flash Cards', () => {
  for (const activity of [
    { quantComparison: [{ quantityA: '1', quantityB: '2', correctIndex: 1 }] },
    { multiSelect: [{ question: 'Select.', options: ['1'], correctIndices: [0] }] },
    { freeResponse: [{ question: 'Enter 1.', accept: 1 }] }
  ]) {
    const h = harness(moduleWith({ ...activity, flashCards: [{ front: 'Explain.', back: 'Reason.' }] }));
    const engine = h.engine();
    engine.navigateTo('test-module', 'topic');
    assert.match(h.nodes.get('content-inner').innerHTML, /switchMode\('practice'/);
    assert.match(h.nodes.get('content-inner').innerHTML, /Solve at least 1 practice item/);
    engine.switchMode('flashcards', 'test-module', 'topic');
    assert.match(h.nodes.get('content-inner').innerHTML, /switchMode\('practice'/);
    engine.switchMode('practice', 'test-module', 'topic');
    assert.match(h.nodes.get('content-inner').innerHTML, /exercise-card/);
  }
});

test('review uses the same exact numeric matcher and respects explicit tolerance', () => {
  for (const [answer, tolerance, expected] of [['25/100', undefined, true], ['0.2495', undefined, false], ['0.2495', 0.001, true]]) {
    const h = harness();
    const engine = h.engine();
    h.context._reviewQueue = [{ problem: { accept: [0.25], tolerance }, kind: 'free', field: 'freeResponse', topicId: 'topic', moduleId: 'test-module', index: 0 }];
    h.context._reviewDone = 0; h.context._reviewCorrect = 0;
    h.mount('rv-0-input', 'rv-0-correct', 'rv-0-correct-text', 'rv-0-incorrect', 'rv-0-incorrect-text');
    h.nodes.get('rv-0-input').value = answer;
    engine.reviewAnswerFree(0);
    assert.equal(h.context._reviewCorrect, expected ? 1 : 0);
    assert.equal(h.nodes.get('rv-0-input').disabled, true);
    engine.reviewAnswerFree(0);
    assert.equal(h.attempts.correct.length + h.attempts.wrong, 1);
  }
});

test('GRE speed drill rejects numeric prefixes, accepts equivalent values, and scores once per problem', () => {
  for (const [answer, expected] of [['1junk', false], ['1/4', false], ['1.0001', false], ['2/2', true]]) {
    const h = harness();
    const speed = h.load('js/speed_drill.js', 'SpeedDrill');
    // Deterministic generator, while exercising the public drill submission.
    speed.GENERATORS.addition.generate = () => ({ question: 'One?', answer: 1 });
    speed.DRILL_CATEGORIES.arithmetic.generators = ['addition'];
    h.mount('content-inner', 'drill-question', 'drill-input', 'drill-feedback', 'drill-score', 'drill-streak');
    speed.startDrill();
    h.nodes.get('drill-input').value = answer;
    speed.submitDrillAnswer();
    speed.submitDrillAnswer();
    assert.equal(h.attempts.correct.length, expected ? 1 : 0);
    assert.equal(h.attempts.wrong, expected ? 0 : 1);
  }
});

test('unit-circle drill accepts stated approximations without accepting numeric garbage', () => {
  const h = harness();
  const speed = h.load('js/speed_drill.js', 'SpeedDrill');
  vm.runInContext('Math.random = () => 0.2', h.context); // cos(pi/6)
  const problem = speed.GENERATORS.unitCircle.generate('medium');
  assert.match(problem.question, /cos/);
  assert.equal(problem.checkFn('sqrt(3)/2'), true);
  assert.equal(problem.checkFn('0.866'), true);
  assert.equal(problem.checkFn('0.8660'), true);
  assert.equal(problem.checkFn('0.866junk'), false);
  assert.equal(problem.checkFn('0.87'), false);
});
