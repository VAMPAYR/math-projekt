/* Progress isolation and one-time reward regressions. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const KEY = 'math_hero_game_state';
const modules = [
  { id: 'a', topics: [{ id: 'shared' }, { id: 'unique' }] },
  { id: 'b', topics: [{ id: 'shared' }] }
];
const plain = value => JSON.parse(JSON.stringify(value));

function harness(saved, blocked = false) {
  let now = Date.UTC(2026, 9, 7, 12);
  const storage = new Map();
  if (saved !== undefined) storage.set(KEY, JSON.stringify(saved));
  class TestDate extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  const element = () => ({ classList: { add() {}, remove() {} }, appendChild() {}, remove() {} });
  const context = vm.createContext({
    Date: TestDate, MATH_MODULES: modules,
    document: { getElementById: () => null, createElement: element, body: element() },
    requestAnimationFrame() {}, setTimeout() {},
    localStorage: {
      getItem(key) { if (blocked) throw new Error('Storage blocked'); return storage.get(key) ?? null; },
      setItem(key, value) { if (blocked) throw new Error('Storage blocked'); storage.set(key, String(value)); }
    }
  });
  context.window = context;
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/game_state.js'), 'utf8'), context);
  const game = vm.runInContext('GameState', context);
  game.init();
  return { game, storage, advance: milliseconds => { now += milliseconds; } };
}

test('daily challenge rewards once per date across repeated calls and reloads', () => {
  const { game, advance } = harness();
  assert.deepEqual(plain(game.recordDailyChallenge()), { completed: true, xpGained: 100, date: '2026-10-07' });
  assert.deepEqual(plain(game.recordDailyChallenge()), { completed: false, xpGained: 0, date: '2026-10-07' });
  game.load();
  assert.equal(game.recordDailyChallenge().completed, false);
  assert.equal(game.getXP(), 100);
  assert.equal(game.getState().modeStats.practice.xpEarned, 100);
  advance(86400000);
  assert.equal(game.recordDailyChallenge().completed, true);
  assert.equal(game.getXP(), 200);
  assert.deepEqual(Object.keys(game.getState().dailyChallengeCompleted), ['2026-10-07', '2026-10-08']);
});

test('existing daily completion data is preserved and cannot award a second bonus', () => {
  const history = { '2026-10-06': true, '2026-10-07': { completedAt: 99 } };
  const { game } = harness({ xp: 75, dailyChallengeCompleted: history });
  assert.equal(game.recordDailyChallenge().completed, false);
  assert.equal(game.getXP(), 75);
  assert.deepEqual(plain(game.getState().dailyChallengeCompleted), history);
});

test('duplicate topic IDs have independent module mastery and moduleless calls cannot choose one', () => {
  const { game } = harness();
  game.recordCorrectAnswer('hard', 'mcq', 'shared', 'a');
  game.recordCorrectAnswer('medium', 'mcq', 'shared', 'b');
  game.recordCorrectAnswer('easy', 'mcq', 'shared');
  assert.equal(game.getTopicMastery('shared', 'a').score, 10);
  assert.equal(game.getTopicMastery('shared', 'b').score, 6);
  assert.equal(game.getTopicMastery('shared').score, 0);
  assert.equal(game.getTopicMastery('shared', 'missing').score, 0);
  game.recordCorrectAnswer('easy', 'mcq', 'unique');
  assert.equal(game.getTopicMastery('unique').score, 3, 'unique topic keeps the old API working');
  game.load();
  assert.equal(game.getTopicMastery('shared', 'a').problemsSolved, 1);
  assert.equal(game.getTopicMastery('shared', 'b').problemsSolved, 1);
  assert.equal(game.getState().totalProblemsCorrect, 4);
});

test('legacy mastery migrates unique or explicit identity and archives ambiguity', () => {
  const old = {
    topicMastery: {
      unique: { score: 42, problemsSolved: 7, history: ['saved'] },
      shared: { score: 70, problemsSolved: 19, history: ['ambiguous'] },
      'b::shared': { score: 15, problemsSolved: 3 },
      removed: { score: 30, problemsSolved: 5 }
    }
  };
  const { game, storage } = harness(old);
  const migrated = game.getState();
  assert.equal(migrated.masterySchemaVersion, 2);
  assert.equal(game.getTopicMastery('unique', 'a').score, 42);
  assert.deepEqual(plain(game.getTopicMastery('unique').history), ['saved']);
  assert.equal(game.getTopicMastery('shared', 'b').score, 15);
  assert.equal(game.getTopicMastery('shared', 'a').score, 0);
  assert.deepEqual(plain(migrated.legacyTopicMastery.shared), old.topicMastery.shared);
  assert.deepEqual(plain(migrated.legacyTopicMastery.removed), old.topicMastery.removed);
  const before = storage.get(KEY);
  game.load();
  assert.equal(storage.get(KEY), before, 'migration does not duplicate archive records on reload');
});

test('scoped records win over conflicting legacy histories without merging them', () => {
  const { game } = harness({ topicMastery: {
    unique: { score: 90, problemsSolved: 100 },
    'a::unique': { score: 6, problemsSolved: 1 },
    shared: { moduleId: 'b', score: 9, problemsSolved: 3 }
  } });
  assert.equal(game.getTopicMastery('unique', 'a').score, 6);
  assert.equal(game.getState().legacyTopicMastery.unique.problemsSolved, 100);
  assert.equal(game.getTopicMastery('shared', 'b').score, 9, 'explicit legacy identity is preserved');
});

test('whole-state export/import preserves scoped and archived histories and snapshots cannot mutate live state', () => {
  const first = harness({ topicMastery: { shared: { score: 81, problemsSolved: 27 } } });
  first.game.recordCorrectAnswer('medium', 'mcq', 'shared', 'a');
  const exported = plain(first.game.getState());
  const second = harness(exported);
  assert.deepEqual(plain(second.game.getState()), exported);
  const snapshot = second.game.getState();
  snapshot.topicMastery['a::shared'].score = 100;
  snapshot.modeStats.practice.xpEarned = 999;
  snapshot.legacyTopicMastery.shared.score = 0;
  const masterySnapshot = second.game.getTopicMastery('shared', 'a');
  masterySnapshot.score = 0;
  assert.equal(second.game.getTopicMastery('shared', 'a').score, 6);
  assert.equal(second.game.getState().legacyTopicMastery.shared.score, 81);
  assert.notEqual(second.game.getState().modeStats.practice.xpEarned, 999);
});

test('partial or malformed imported state uses independent safe defaults', () => {
  const { game, storage } = harness({
    xp: '200', level: null, achievements: [], dailyChallengeCompleted: null,
    modeStats: { practice: null, challenge: { completed: 'bad', xpEarned: -7 } },
    topicMastery: { 'a::shared': { score: 'bad', problemsSolved: null }, unique: null }
  });
  assert.equal(game.getXP(), 0);
  assert.equal(game.getLevel(), 1);
  assert.doesNotThrow(() => game.recordChallengeComplete());
  assert.doesNotThrow(() => game.recordCorrectAnswer('medium', 'mcq', 'shared', 'a'));
  assert.equal(game.getTopicMastery('shared', 'a').score, 6);
  storage.set(KEY, 'null');
  game.load();
  assert.equal(game.getState().modeStats.challenge.completed, 0);
  assert.equal(Object.keys(game.getState().achievements).length, 0);
  assert.equal(Object.keys(game.getState().topicMastery).length, 0);
  game.recordChallengeComplete();
  storage.set(KEY, '{');
  game.load();
  assert.equal(game.getState().modeStats.challenge.completed, 0, 'corrupt saves do not reuse mutated default buckets');
});

test('blocked browser storage does not prevent state use or reuse mutated defaults', () => {
  const { game } = harness(undefined, true);
  assert.doesNotThrow(() => game.recordDailyChallenge());
  assert.equal(game.recordDailyChallenge().completed, false);
  assert.doesNotThrow(() => game.recordCorrectAnswer('easy', 'mcq', 'unique', 'a'));
  game.load();
  assert.equal(game.getXP(), 0);
  assert.equal(game.getTopicMastery('unique', 'a').score, 0);
  assert.equal(Object.keys(game.getState().dailyChallengeCompleted).length, 0);
});
