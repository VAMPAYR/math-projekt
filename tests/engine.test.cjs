const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

function loadEngine(overrides = {}) {
  const elements = new Map();
  const makeElement = () => {
    const classes = new Set();
    return {
      innerHTML: '', textContent: '', value: '3', disabled: false, dataset: {}, children: [],
      style: { setProperty() {} }, setAttribute() {}, addEventListener() {}, remove() {},
      appendChild(child) { this.children.push(child); }, querySelector() { return null; }, querySelectorAll() { return []; },
      classList: { add: name => classes.add(name), remove: name => classes.delete(name), contains: name => classes.has(name), toggle() {} }
    };
  };
  const element = id => {
    if (!elements.has(id)) elements.set(id, makeElement());
    return elements.get(id);
  };
  const figures = { redraws: 0, disposals: 0 };
  const context = vm.createContext({
    document: {
      documentElement: { dataset: { theme: 'dark' }, style: {} },
      getElementById: element, createElement: makeElement, querySelectorAll: () => [], addEventListener() {}
    },
    localStorage: { setItem() {} },
    window: {},
    Viz: { redrawAll() { figures.redraws++; }, destroyAll() { figures.disposals++; } },
    setTimeout() {},
    katex: { renderToString: text => text },
    ...overrides
  });
  // Expose private setup/render seams only in this VM copy. Production keeps
  // its public API unchanged while the tests exercise the actual handlers.
  const source = fs.readFileSync(path.join(__dirname, '../js/engine.js'), 'utf8').replace(
    /    init,\r?\n    navigateTo,/,
    '    __test: { collectModules, renderSidebar, renderFoundationRefs, applyProgressImport, setCurrent(moduleId, topicId) { currentModule = moduleId; currentTopic = topicId; } },\n    init,\n    navigateTo,'
  );
  vm.runInContext(source, context);
  return { engine: vm.runInContext('MathEngine', context), element, figures, context, makeElement };
}

test('REGRESSION: triangle coordinates measure the slider angles, including obtuse triangles', () => {
  const { engine, element } = loadEngine();
  const angle = (vertex, a, b) => {
    const u = a.map((v, i) => v - vertex[i]);
    const v = b.map((n, i) => n - vertex[i]);
    return Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)) * 180 / Math.PI;
  };
  for (const value of [25, 60, 90, 115]) {
    engine.updateIntuitionLab('test', 'geometry', value);
    const svg = element('test-visual').innerHTML;
    const points = svg.match(/<polygon points="([^"]+)"/)[1].split(' ').map(p => p.split(',').map(Number));
    assert.ok(Math.abs(angle(points[0], points[1], points[2]) - value) < 1e-8);
    assert.ok(Math.abs(angle(points[1], points[0], points[2]) - 50) < 1e-8);
    points.forEach(([x, y]) => assert.ok(x >= 0 && x <= 560 && y >= 0 && y <= 310));
    assert.equal((svg.match(/<path/g) || []).length, 3, 'Each angle needs its own interior arc');
  }
});

test('REGRESSION: fixed set sizes prevent an impossible overlap', () => {
  const { engine, element } = loadEngine();
  engine.updateIntuitionLab('sets', 'logic-set', 8);
  const readout = element('sets-readout').innerHTML;
  assert.match(readout, /2 \+ 6 \+ 0 = 8/);
  assert.doesNotMatch(element('sets-visual').innerHTML, />-\d+</);
});

test('REGRESSION: expected success bars retain fractional expectations', () => {
  const { engine, element } = loadEngine();
  engine.updateIntuitionLab('probability', 'probability', 0.35);
  assert.match(element('probability-readout').innerHTML, /3\.5/);
  const greenBars = [...element('probability-visual').innerHTML.matchAll(/height="([^"]+)" fill="var\(--accent-green\)"/g)];
  assert.equal(greenBars.length, 10);
  greenBars.forEach(match => assert.ok(Math.abs(Number(match[1]) - 32.2) < 1e-10));
});

test('REGRESSION: theme toggling repaints figures without discarding learner input', () => {
  const { engine, element, figures } = loadEngine();
  element('answer-input').value = '1/4';
  element('content-inner').innerHTML = 'Existing lesson and feedback';
  engine.toggleTheme();
  assert.equal(element('answer-input').value, '1/4');
  assert.equal(element('content-inner').innerHTML, 'Existing lesson and feedback');
  assert.equal(figures.redraws, 1);
  assert.equal(figures.disposals, 0);
});

test('wide diagrams retain readable mobile dimensions and keyboard scrolling', () => {
  const { engine, context } = loadEngine();
  const mockFigure = width => {
    const classes = new Set();
    const attributes = {};
    const styles = {};
    const container = { classList: { add: name => classes.add(name) }, setAttribute: (name, value) => { attributes[name] = value; } };
    const svg = {
      viewBox: { baseVal: { width } }, classList: { add: name => classes.add(name) },
      style: { setProperty: (name, value) => { styles[name] = value; } },
      closest: () => container, getAttribute: () => 'Labeled figure'
    };
    return { svg, container, classes, attributes, styles };
  };
  const wide = mockFigure(700);
  const compact = mockFigure(360);
  context.document.querySelectorAll = selector => selector === '.math-diagram svg' ? [wide.svg, compact.svg] : [];
  engine.renderAllMath();
  assert.equal(wide.styles['--diagram-min-width'], '520px');
  assert.ok(wide.classes.has('diagram-scroll'));
  assert.equal(wide.container.tabIndex, 0);
  assert.match(wide.attributes['aria-label'], /Scroll horizontally/);
  assert.equal(compact.classes.size, 0);
});

test('REGRESSION: the graph transformation label matches the displayed curve', () => {
  const { engine, element } = loadEngine();
  engine.updateIntuitionLab('function', 'function-transform', -3);
  assert.match(element('function-visual').innerHTML, /f\(x \+ 3\) - 1\.05/);
  assert.doesNotMatch(element('function-visual').innerHTML, /NaN|Infinity/);
});

function scoringEngine(kind = 'free', dailyResult = { completed: true, xpGained: 100 }) {
  const calls = { correct: [], wrong: 0, daily: 0, mastery: [], scheduled: [] };
  const timers = [];
  const problem = kind === 'free'
    ? { question: 'What is 1 + 2?', accept: [3], difficulty: 'easy' }
    : { question: 'What is 1 + 2?', options: ['2', '3'], correctIndex: 1, difficulty: 'easy' };
  const modules = ['first', 'second'].map((id, index) => ({
    id, title: id, order: index, topics: [{ id: 'same-topic', title: id + ' topic', [kind === 'free' ? 'freeResponse' : 'exercises']: [problem] }]
  }));
  const game = {
    isDailyChallengeComplete: () => false,
    recordCorrectAnswer(...args) { calls.correct.push(args); return { xpGained: 20 }; },
    recordWrongAnswer() { calls.wrong++; },
    recordDailyChallenge() { calls.daily++; return dailyResult; },
    showXPGain() {}, showGameToast() {},
    getTopicMastery(...args) { calls.mastery.push(args); return { score: 25 }; }
  };
  const review = { recordAttempt: details => calls.scheduled.push(details) };
  const fixture = loadEngine({
    window: { MATH_MODULES: modules, ReviewEngine: review }, GameState: game, ReviewEngine: review,
    ProblemEngine: { checkAnswer: (value, accepted) => accepted.some(answer => String(answer) === value) },
    setTimeout: (callback, delay) => { timers.push({ callback, delay }); }
  });
  fixture.engine.__test.collectModules();
  return { ...fixture, calls, timers, modules, game };
}

test('REGRESSION: daily free-response cards and completion award credit once, with their module identity', () => {
  const { engine, element, context, makeElement, calls } = scoringEngine();
  engine.showDailyChallenge();
  const daily = context.window._dailyProblems;
  daily.forEach((problem, index) => {
    const submit = makeElement();
    element(problem.cardId).querySelectorAll = () => [submit];
    element(problem.cardId + '-input').value = '3';
    engine.checkDailyProblem(problem.cardId, index);
    engine.checkDailyProblem(problem.cardId, index);
    assert.equal(submit.disabled, true);
    assert.equal(element(problem.cardId).dataset.solved, 'true');
    assert.equal(element(problem.cardId + '-input').disabled, true);
  });
  assert.equal(calls.correct.length, 5);
  assert.equal(calls.daily, 1);
  assert.equal(context.window._dailyCorrect, 5);
  daily.forEach((problem, index) => assert.deepEqual(calls.correct[index], ['easy', 'freeResponse', 'same-topic', problem.moduleId]));
  assert.match(element('dc-complete-text').textContent, /\+100 XP earned/);
});

test('REGRESSION: daily empty, out-of-range, and detached-card actions do not score', () => {
  const { engine, element, context, calls } = scoringEngine();
  engine.showDailyChallenge();
  const oldProblem = context.window._dailyProblems[0];
  element(oldProblem.cardId + '-input').value = '  ';
  engine.checkDailyProblem(oldProblem.cardId, 0);
  engine.checkDailyProblem(oldProblem.cardId, -1);
  engine.checkDailyProblem(oldProblem.cardId, 100);
  engine.checkDailyProblem(oldProblem.cardId, '0');
  engine.showDailyChallenge();
  element(oldProblem.cardId + '-input').value = '3';
  engine.checkDailyProblem(oldProblem.cardId, 0);
  assert.equal(calls.correct.length, 0);
  assert.equal(calls.wrong, 0);
  assert.equal(calls.daily, 0);
});

test('REGRESSION: daily wrong-answer delays lock submission and cannot mutate a replacement view', () => {
  const { engine, element, context, timers, calls } = scoringEngine();
  engine.showDailyChallenge();
  const problem = context.window._dailyProblems[0];
  element(problem.cardId + '-input').value = '2';
  engine.checkDailyProblem(problem.cardId, 0);
  engine.checkDailyProblem(problem.cardId, 0);
  assert.equal(calls.wrong, 1);
  engine.showDailyChallenge();
  const replacement = context.window._dailyProblems[0];
  element(replacement.cardId + '-input').value = 'new answer';
  timers.filter(timer => timer.delay === 1500).forEach(timer => timer.callback());
  assert.equal(element(replacement.cardId + '-input').value, 'new answer');
  assert.equal(element(problem.cardId + '-input').disabled, true);
});

test('REGRESSION: completion text reflects an already-claimed reward', () => {
  const { engine, element, context, calls } = scoringEngine('free', { completed: false, xpGained: 0 });
  engine.showDailyChallenge();
  context.window._dailyProblems.forEach((problem, index) => {
    element(problem.cardId + '-input').value = '3';
    engine.checkDailyProblem(problem.cardId, index);
  });
  assert.equal(calls.daily, 1);
  assert.match(element('dc-complete-text').textContent, /already been earned/);
  assert.doesNotMatch(element('dc-complete-text').textContent, /\+100/);
});

test('REGRESSION: daily multiple-choice scoring uses problem scope, permits a retry, and rejects detached buttons', () => {
  const { engine, element, context, makeElement, calls } = scoringEngine('mcq');
  engine.showDailyChallenge();
  const problem = context.window._dailyProblems[0];
  const buttons = [makeElement(), makeElement()];
  element(problem.cardId + '-options').querySelectorAll = () => buttons;
  engine.checkAnswer(makeElement(), 1, 1, problem.cardId);
  engine.checkAnswer(buttons[0], 0, 1, problem.cardId);
  assert.equal(calls.wrong, 1);
  assert.equal(buttons[1].disabled, false);
  engine.checkAnswer(buttons[1], 1, 1, problem.cardId);
  engine.checkAnswer(buttons[1], 1, 1, problem.cardId);
  assert.deepEqual(calls.correct, [['easy', 'mcq', 'same-topic', problem.moduleId]]);
  assert.equal(context.window._dailyCorrect, 1);
  assert.equal(calls.daily, 0);
});

test('REGRESSION: sidebar, foundation links, review, and standard MCQ preserve duplicate-topic module scope', () => {
  const { engine, element, context, makeElement, calls } = scoringEngine('mcq');
  engine.__test.renderSidebar();
  assert.deepEqual(calls.mastery, [['same-topic', 'first'], ['same-topic', 'second']]);
  calls.mastery.length = 0;
  engine.__test.renderFoundationRefs([{ moduleId: 'second', topicId: 'same-topic' }]);
  assert.deepEqual(calls.mastery, [['same-topic', 'second']]);

  context.window._reviewQueue = [{ kind: 'free', topicId: 'same-topic', moduleId: 'second', field: 'freeResponse', index: 0, problem: { accept: [3] } }];
  context.window._reviewDone = context.window._reviewCorrect = 0;
  element('rv-0-input').value = '3';
  engine.reviewAnswerFree(0);
  engine.reviewAnswerFree(0);

  engine.__test.setCurrent('second', 'same-topic');
  const exId = 'ex-same-topic-0';
  element(exId).dataset.moduleId = 'second';
  const buttons = [makeElement(), makeElement()];
  element(exId + '-options').querySelectorAll = () => buttons;
  engine.checkAnswer(buttons[1], 1, 1, exId);
  engine.checkAnswer(buttons[1], 1, 1, exId);
  assert.deepEqual(calls.correct, [['medium', 'freeResponse', 'same-topic', 'second'], ['easy', 'mcq', 'same-topic', 'second']]);
  assert.equal(calls.scheduled.length, 2);
  calls.scheduled.forEach(details => assert.equal(details.moduleId, 'second'));
});

test('progress import preserves mastery schema and legacy archive for GameState.load migration', () => {
  const { engine, element, context, game } = scoringEngine();
  const stored = new Map();
  let imported;
  context.localStorage = { setItem: (key, value) => stored.set(key, value), getItem: key => stored.get(key) || null };
  Object.assign(game, {
    load() { imported = JSON.parse(stored.get('math_hero_game_state')); }, getState: () => imported,
    getStreakDays: () => 0, getAccuracy: () => 0, getLevel: () => 1, getLevelTitle: () => 'Learner',
    getXP: () => 0, getXPForNextLevel: () => 100, getXPProgress: () => 0, getAchievements: () => ({})
  });
  context.window.ReviewEngine = null;
  const state = {
    xp: 10, masterySchemaVersion: 2,
    topicMastery: { 'second::same-topic': { moduleId: 'second', topicId: 'same-topic', score: 25, problemsSolved: 2 } },
    legacyTopicMastery: { 'same-topic': { score: 60, problemsSolved: 9 } }
  };
  engine.__test.applyProgressImport({ storage: { math_hero_game_state: state } });
  assert.deepEqual(imported, state);
  assert.equal(element('toast').innerHTML, 'Progress imported');
});
