/* Scheduler and saved-progress regressions. Run: node --test tests/review_engine.test.cjs */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const STORAGE_KEY = 'math_hero_srs';
const DAY = 86400000;

function harness(modules, saved) {
  let now = Date.UTC(2026, 9, 6, 12);
  const storage = new Map();
  if (saved) storage.set(STORAGE_KEY, JSON.stringify(saved));
  class TestDate extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  const sandbox = {
    Date: TestDate, MATH_MODULES: modules,
    localStorage: {
      getItem: key => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, String(value))
    }
  };
  sandbox.window = sandbox;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/review_engine.js'), 'utf8'), sandbox);
  sandbox.ReviewEngine.init();
  return { review: sandbox.ReviewEngine, storage, advance: milliseconds => { now += milliseconds; } };
}

function duplicateModules() {
  return ['calculus-a', 'calculus-b'].map((id, index) => ({
    id, topics: [{
      id: 'limits-continuity', title: `Limits ${index + 1}`,
      exercises: [{ question: `MCQ ${id}`, correctIndex: index }, { question: `Second MCQ ${id}` }],
      quantComparison: [{ quantityA: id, correctIndex: index }],
      freeResponse: [{ question: `Free ${id}`, accept: index + 1 }]
    }]
  }));
}

function legacyItem(overrides = {}) {
  return {
    topicId: 'limits-continuity', moduleId: null, field: 'exercises', index: 0,
    strength: 3, due: 0, firstSeen: 1, last: 2, reps: 7, lapses: 1,
    lastCorrect: true, history: [{ t: 2, c: 1 }], ...overrides
  };
}

test('same topic, field, and index retain independent module schedules and live answers', () => {
  const modules = duplicateModules();
  const h = harness(modules);
  for (const field of ['exercises', 'quantComparison', 'freeResponse']) {
    h.review.recordAttempt({ moduleId: 'calculus-a', topicId: 'limits-continuity', field, index: 0, correct: true });
    h.review.recordAttempt({ moduleId: 'calculus-a', topicId: 'limits-continuity', field, index: 0, correct: true });
    h.review.recordAttempt({ moduleId: 'calculus-b', topicId: 'limits-continuity', field, index: 0, correct: false });
  }
  const saved = h.review.exportData();
  assert.equal(Object.keys(saved.items).length, 6);
  for (const field of ['exercises', 'quantComparison', 'freeResponse']) {
    const a = saved.items[`calculus-a::limits-continuity::${field}::0`];
    const b = saved.items[`calculus-b::limits-continuity::${field}::0`];
    assert.equal(a.reps, 2); assert.equal(a.strength, 2); assert.equal(a.lapses, 0);
    assert.equal(b.reps, 1); assert.equal(b.strength, 0); assert.equal(b.lapses, 1);
  }
  h.advance(40 * DAY);
  assert.equal(h.review.getDueCount(), 6);
  assert.equal(h.review.getDueCountForTopic('limits-continuity'), 6);
  assert.equal(h.review.getDueCountForTopic('limits-continuity', 'calculus-a'), 3);
  assert.equal(h.review.getDueCountForTopic('limits-continuity', 'calculus-b'), 3);
  for (const queued of h.review.buildReviewQueue(10)) {
    const module = modules.find(mod => mod.id === queued.moduleId);
    assert.equal(queued.problem, module.topics[0][queued.field][queued.index]);
    assert.equal(queued.topicTitle, module.topics[0].title);
  }
  h.review.load();
  assert.equal(h.review.buildReviewQueue(10).length, 6, 'independent schedules survive reload');
});

test('resolver rejects an absent module or item and never falls through to another module', () => {
  const modules = duplicateModules();
  modules[0].topics[0].freeResponse = [];
  const { review } = harness(modules);
  assert.equal(review.resolveItem(legacyItem({ moduleId: 'removed-module' })), null);
  assert.equal(review.resolveItem(legacyItem({ moduleId: 'calculus-a', field: 'freeResponse' })), null);
  assert.equal(review.resolveItem(legacyItem()), null, 'a duplicate topic without a module is ambiguous');
  assert.equal(review.resolveItem(legacyItem({ moduleId: 'calculus-b', field: 'freeResponse' })).problem,
    modules[1].topics[0].freeResponse[0]);
  assert.equal(review.resolveItem(null), null);
});

test('v1 migration preserves explicit modules and uniquely identified topics, and archives ambiguity', () => {
  const modules = duplicateModules();
  modules[0].topics.push({ id: 'unique-topic', title: 'Unique', exercises: [{ question: 'Only one module.' }] });
  const old = { schemaVersion: 1, items: {
    'limits-continuity::exercises::0': legacyItem({ moduleId: 'calculus-b' }),
    'limits-continuity::freeResponse::0': legacyItem({ field: 'freeResponse' }),
    'unique-topic::exercises::0': legacyItem({ topicId: 'unique-topic' }),
    'limits-continuity::quantComparison::0': legacyItem({ moduleId: 'removed-module', field: 'quantComparison' })
  } };
  const { review, storage } = harness(modules, old);
  const migrated = review.exportData();
  assert.equal(migrated.schemaVersion, 2);
  assert.equal(migrated.items['calculus-b::limits-continuity::exercises::0'].reps, 7);
  assert.equal(migrated.items['calculus-a::unique-topic::exercises::0'].moduleId, 'calculus-a');
  assert.equal(migrated.legacyItems['limits-continuity::freeResponse::0'].reps, 7);
  assert.equal(migrated.legacyItems['limits-continuity::freeResponse::0'].moduleId, null);
  assert.equal(review.getDueCount(), 2, 'badges count only reviewable items');
  assert.equal(review.getRetentionStats().due, 2);
  assert.equal(review.buildReviewQueue(10).length, 2);
  assert.equal(JSON.parse(storage.get(STORAGE_KEY)).schemaVersion, 2);
  const beforeReload = JSON.stringify(migrated);
  review.load();
  assert.equal(JSON.stringify(review.exportData()), beforeReload, 'migration is stable across reloads');
});

test('legacy schedules cannot overwrite or merge history into a current scoped schedule', () => {
  const modules = [duplicateModules()[0]];
  const oldRecord = legacyItem({ reps: 99 });
  const currentRecord = legacyItem({ moduleId: 'calculus-a', reps: 2, strength: 1, history: [{ t: 1, c: 0 }] });
  const { review } = harness(modules, { schemaVersion: 2, items: {
    // Put the legacy key first to verify that object order cannot select it.
    'limits-continuity::exercises::0': oldRecord,
    'calculus-a::limits-continuity::exercises::0': currentRecord
  } });
  assert.equal(review.exportData().items['calculus-a::limits-continuity::exercises::0'].reps, 2);
  assert.equal(review.exportData().items['calculus-a::limits-continuity::exercises::0'].history.length, 1);
  assert.equal(review.exportData().legacyItems['limits-continuity::exercises::0'].reps, 99);
  review.importData({ schemaVersion: 1, items: { 'limits-continuity::exercises::0': legacyItem({ reps: 100 }) } });
  assert.equal(review.exportData().items['calculus-a::limits-continuity::exercises::0'].reps, 2);
  assert.equal(review.getDueCount(), 1, 'a preserved legacy conflict must not produce a second card');
  review.load();
  assert.equal(review.exportData().items['calculus-a::limits-continuity::exercises::0'].reps, 2);
  assert.equal(review.getDueCount(), 1);
});

test('new scoped attempts do not adopt ambiguous history, and exports preserve that history', () => {
  const modules = duplicateModules();
  const h = harness(modules, { schemaVersion: 1, items: {
    'limits-continuity::exercises::0': legacyItem({ reps: 99 })
  } });
  h.review.recordAttempt({ moduleId: 'calculus-b', topicId: 'limits-continuity', field: 'exercises', index: 0, correct: false });
  assert.equal(h.review.exportData().items['calculus-b::limits-continuity::exercises::0'].reps, 1);
  assert.equal(h.review.exportData().legacyItems['limits-continuity::exercises::0'].reps, 99);
  const destination = harness(modules);
  destination.review.importData(JSON.parse(JSON.stringify(h.review.exportData())));
  destination.advance(11 * 60 * 1000);
  assert.equal(destination.review.getDueCount(), 1);
  assert.equal(destination.review.buildReviewQueue(10)[0].moduleId, 'calculus-b');
  assert.equal(destination.review.exportData().legacyItems['limits-continuity::exercises::0'].reps, 99);
});

test('moduleless callers work only for unique topics, and interleaving distinguishes modules', () => {
  const single = harness([duplicateModules()[0]]);
  single.review.recordAttempt({ topicId: 'limits-continuity', field: 'exercises', index: 0, correct: false });
  single.advance(11 * 60 * 1000);
  assert.equal(single.review.buildReviewQueue()[0].moduleId, 'calculus-a');
  const duplicate = harness(duplicateModules());
  duplicate.review.recordAttempt({ topicId: 'limits-continuity', field: 'exercises', index: 0, correct: false });
  assert.equal(Object.keys(duplicate.review.exportData().items).length, 0, 'ambiguous attempts cannot choose the first module');
  for (const [moduleId, index] of [['calculus-a', 0], ['calculus-a', 1], ['calculus-b', 0]]) {
    duplicate.review.recordAttempt({ moduleId, topicId: 'limits-continuity', field: 'exercises', index, correct: false });
  }
  duplicate.advance(11 * 60 * 1000);
  assert.deepEqual(Array.from(duplicate.review.buildReviewQueue(), card => card.moduleId), ['calculus-a', 'calculus-b', 'calculus-a']);
});

test('malformed saved histories and item indexes cannot crash review or create phantom due cards', () => {
  const modules = duplicateModules();
  const { review } = harness(modules, { schemaVersion: 1, items: {
    'limits-continuity::exercises::0': legacyItem({ moduleId: 'calculus-a', history: [null, 'bad', { t: 1, c: 1 }], strength: -2, reps: NaN }),
    'limits-continuity::exercises::1': legacyItem({ moduleId: 'calculus-a', index: -1 }),
    'limits-continuity::exercises::8': legacyItem({ moduleId: 'calculus-a', index: 8 }),
    broken: null
  } });
  assert.doesNotThrow(() => review.getCalibrationGap());
  assert.doesNotThrow(() => review.recordAttempt({ moduleId: 'calculus-a', topicId: 'limits-continuity', field: 'exercises', index: 0, correct: true }));
  assert.equal(review.exportData().items['calculus-a::limits-continuity::exercises::0'].history.length, 2);
  assert.equal(review.getDueCount(), 0, 'the remaining due index does not exist in the live topic');
  assert.equal(review.buildReviewQueue().length, 0);
});
