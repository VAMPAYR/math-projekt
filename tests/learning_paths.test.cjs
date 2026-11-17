const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

function loadPaths() {
  const context = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(root, 'js/learning_paths.js'), 'utf8'), context);
  return context.window.MathLearningPaths;
}
function loadCurriculum() {
  const context = vm.createContext({ window: {} });
  const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const match of index.matchAll(/<script\b[^>]*\bsrc=["'](js\/modules\/[^?"']+)/gi)) {
    vm.runInContext(fs.readFileSync(path.join(root, match[1]), 'utf8'), context, { filename: match[1] });
  }
  return context.window.MATH_MODULES;
}

test('every curated pathway and relationship resolves to a registered lesson', () => {
  const paths = loadPaths(), modules = loadCurriculum();
  for (const stage of paths.stages) {
    assert.ok(stage.title && stage.description);
    for (const ref of stage.items) assert.ok(paths.resolve(modules, ref), `Missing pathway target ${ref[0]}:${ref[1]}`);
  }
  for (const [source, target, explanation] of paths.edges) {
    assert.ok(paths.resolve(modules, source), `Missing source ${source.join(':')}`);
    assert.ok(paths.resolve(modules, target), `Missing target ${target.join(':')}`);
    assert.ok(explanation.trim(), 'Each connection should explain the relationship');
  }
  assert.equal(paths.availableStages(modules).length, 5);
});

test('connections carry the module scope and work in both directions', () => {
  const paths = loadPaths();
  const modules = [
    { id: 'foundations', title: 'Foundations', topics: [{ id: 'basic-arithmetic', title: 'Arithmetic' }] },
    { id: 'beginning-algebra', title: 'Algebra', topics: [{ id: 'linear-equations-one-var', title: 'Equations' }] },
    { id: 'unrelated', title: 'Other', topics: [{ id: 'basic-arithmetic', title: 'Different arithmetic' }] }
  ];
  const forward = paths.connections(modules, 'foundations', 'basic-arithmetic');
  const backward = paths.connections(modules, 'beginning-algebra', 'linear-equations-one-var');
  assert.equal(forward[0].moduleId, 'beginning-algebra');
  assert.equal(forward[0].topicId, 'linear-equations-one-var');
  assert.equal(forward[0].direction, 'Apply this idea');
  assert.equal(backward[0].moduleId, 'foundations');
  assert.equal(backward[0].direction, 'Build on this idea');
  assert.equal(paths.connections(modules, 'unrelated', 'basic-arithmetic').length, 0);
});

test('unavailable topics are omitted, and module-only references select the first real topic', () => {
  const paths = loadPaths();
  const modules = [{ id: 'landau-mechanics', title: 'Mechanics', topics: [{ id: 'motion', title: 'Motion' }] }];
  assert.equal(paths.resolve(modules, ['landau-mechanics', null]).topicId, 'motion');
  assert.equal(paths.resolve(modules, ['landau-mechanics', 'missing']), null);
  assert.equal(paths.availableStages(modules).length, 1);
  assert.equal(paths.connections(modules, 'landau-mechanics', 'motion').length, 0);
});

test('home and learning path expose keyboard-operable lesson links with honest scope', () => {
  const paths = loadPaths();
  const elements = new Map();
  const makeElement = () => ({
    innerHTML: '', textContent: '', style: {}, dataset: {}, appendChild() {}, addEventListener() {},
    classList: { add() {}, remove() {}, toggle() {} }
  });
  function element(id) {
    if (!elements.has(id)) elements.set(id, makeElement());
    return elements.get(id);
  }
  const modules = [
    { id: 'foundations', title: 'Foundations', order: 1, topics: [{ id: 'basic-arithmetic', title: 'Arithmetic' }] },
    { id: 'beginning-algebra', title: 'Algebra', order: 2, topics: [{ id: 'linear-equations-one-var', title: 'Equations' }] }
  ];
  const GameState = {
    getState: () => ({ achievements: {} }), getStreakDays: () => 0, getAccuracy: () => 0,
    isDailyChallengeComplete: () => false, getLevel: () => 1, getLevelTitle: () => 'Novice',
    getXP: () => 0, getXPForNextLevel: () => 100, getXPProgress: () => 0,
    getAchievements: () => ({}), getTopicMastery: () => ({ score: 0 })
  };
  const context = vm.createContext({
    window: { MATH_MODULES: modules, MathLearningPaths: paths }, GameState,
    document: { getElementById: element, createElement: makeElement, querySelectorAll: () => [], addEventListener() {} },
    localStorage: { getItem: () => null, setItem() {} }, setTimeout() {}
  });
  const source = fs.readFileSync(path.join(root, 'js/engine.js'), 'utf8').replace(
    /    init,\r?\n    navigateTo,/, '    __test: { collectModules, renderWelcome, renderLearningConnections },\n    init,\n    navigateTo,'
  );
  vm.runInContext(source, context);
  const engine = vm.runInContext('MathEngine', context);
  engine.__test.collectModules();
  engine.__test.renderWelcome();
  assert.match(element('content-inner').innerHTML, /<button type="button"[^>]*onclick="MathEngine\.showLearningPath\(\)"/);
  engine.showLearningPath();
  const html = element('content-inner').innerHTML;
  assert.match(html, /does not certify examination readiness/);
  assert.match(html, /<button type="button"[^>]*onclick="MathEngine\.navigateTo\('foundations','basic-arithmetic'\)"/);
  assert.match(html, /Landau Institute/);
  const connections = engine.__test.renderLearningConnections('foundations', 'basic-arithmetic');
  assert.match(connections, /MathEngine\.navigateTo\('beginning-algebra','linear-equations-one-var'\)/);
  assert.match(connections, /Inverse operations/);
});
