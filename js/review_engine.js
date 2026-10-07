/* ============================================================
   REVIEW ENGINE: retrieval practice + spaced repetition.

   The learning-science thesis (Huberman, "Optimal Protocols for
   Studying & Learning"): you do not study to "learn," you study to
   OFFSET FORGETTING, and the best tool for that is TESTING yourself,
   soon after first exposure, then again at expanding intervals.

   This module tracks each practice item's retrieval strength and
   when it is next due, surfaces due items for review across topics,
   prioritizes items you got wrong (errors drive plasticity), and
   schedules the first review across one night's sleep (first-night
   effect). It is a state layer: the Review session, the post-exposure
   self-test, and the dashboard all read from it.
   ============================================================ */
const ReviewEngine = (() => {
  const STORAGE_KEY = 'math_hero_srs';
  const SCHEMA_VERSION = 2;
  const DAY = 86400000;
  const LAPSE_DELAY = 10 * 60 * 1000;          // re-surface a missed item ~10 min later
  // Interval ladder by strength. Test soon, then space out.
  const INTERVALS = [0, 1 * DAY, 3 * DAY, 7 * DAY, 16 * DAY, 35 * DAY, 75 * DAY];
  const MAX_STRENGTH = INTERVALS.length - 1;
  // Which topic fields can be re-presented in a Review session.
  const RENDERABLE = { exercises: 'mcq', quantComparison: 'qc', freeResponse: 'free' };

  let store = { schemaVersion: SCHEMA_VERSION, items: {}, legacyItems: {} };

  // Topic IDs are only unique within a module. An older record without a
  // module can be assigned only when that topic occurs in one live module.
  function scopedModuleId(topicId, moduleId) {
    if (typeof moduleId === 'string' && moduleId) return moduleId;
    const matches = (window.MATH_MODULES || []).filter(mod =>
      (mod.topics || []).some(topic => topic.id === topicId));
    return matches.length === 1 ? matches[0].id : null;
  }

  function itemKey(moduleId, topicId, field, index) {
    return `${moduleId}::${topicId}::${field}::${index}`;
  }

  // Coerce every persisted/imported item to a safe shape so a truncated
  // write, an older schema, or foreign import data cannot crash later reads.
  function normalizeItems() {
    const isMap = value => value && typeof value === 'object' && !Array.isArray(value);
    const candidates = [store.items, store.legacyItems].flatMap((items, source) =>
      isMap(items) ? Object.entries(items).map(([key, item]) => ({ key, item, source })) : []);
    const items = {}, legacyItems = {};
    const now = Date.now();
    // Preserve a current scoped schedule when an import also contains an old
    // key for that item. Their histories cannot be safely combined.
    candidates.sort((a, b) => {
      const canonical = entry => !!(entry.item && entry.item.moduleId &&
        entry.key === itemKey(entry.item.moduleId, entry.item.topicId, entry.item.field, entry.item.index));
      return Number(canonical(b)) - Number(canonical(a)) || a.source - b.source;
    });
    for (const { key, item } of candidates) {
      if (!isMap(item)) continue;
      const it = { ...item };
      const parts = key.split('::');
      if (!it.topicId && (parts.length === 3 || parts.length === 4)) it.topicId = parts[parts.length - 3];
      if (!it.field && (parts.length === 3 || parts.length === 4)) it.field = parts[parts.length - 2];
      if (it.index == null && (parts.length === 3 || parts.length === 4)) it.index = Number(parts[parts.length - 1]);
      if (!it.moduleId && parts.length === 4) it.moduleId = parts[0];
      if (typeof it.topicId !== 'string' || !it.topicId || typeof it.field !== 'string' ||
          !Number.isInteger(it.index) || it.index < 0) continue;
      if (!Array.isArray(it.history)) it.history = [];
      it.history = it.history.filter(h => isMap(h) && Number.isFinite(h.t) && (h.c === 0 || h.c === 1)).slice(-20);
      it.strength = Number.isFinite(it.strength) ? Math.max(0, Math.min(MAX_STRENGTH, Math.floor(it.strength))) : 0;
      it.lapses = Number.isFinite(it.lapses) ? Math.max(0, Math.floor(it.lapses)) : 0;
      it.reps = Number.isFinite(it.reps) ? Math.max(0, Math.floor(it.reps)) : 0;
      if (!Number.isFinite(it.due)) it.due = now;
      if (!Number.isFinite(it.firstSeen)) it.firstSeen = now;
      const moduleId = scopedModuleId(it.topicId, it.moduleId);
      const targetKey = moduleId && itemKey(moduleId, it.topicId, it.field, it.index);
      if (targetKey && !Object.prototype.hasOwnProperty.call(items, targetKey)) {
        it.moduleId = moduleId;
        items[targetKey] = it;
      } else {
        // Keep ambiguous or conflicting legacy data in exports, but do not
        // present its answers or combine its repetitions with another item.
        let archiveKey = key, suffix = 1;
        while (Object.prototype.hasOwnProperty.call(legacyItems, archiveKey)) archiveKey = `${key}#${suffix++}`;
        legacyItems[archiveKey] = it;
      }
    }
    store = { schemaVersion: SCHEMA_VERSION, items, legacyItems };
  }

  function load() {
    store = { schemaVersion: SCHEMA_VERSION, items: {}, legacyItems: {} };
    let loaded = false;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && parsed.items && typeof parsed.items === 'object') { store = parsed; loaded = true; }
      }
    } catch (e) { /* silent */ }
    if (!store.items) store.items = {};
    normalizeItems();
    if (loaded) save();
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) { /* silent */ }
  }

  function init() { load(); }

  /* The first review deliberately crosses one night of sleep, when the
     first-night effect does most of the consolidation. */
  function nextMorning(ts) {
    const d = new Date(ts);
    d.setDate(d.getDate() + 1);
    d.setHours(8, 0, 0, 0);
    return d.getTime();
  }

  /* Single funnel: every checker reports its outcome here. */
  function recordAttempt(a) {
    if (!a || typeof a.topicId !== 'string' || !a.topicId || typeof a.field !== 'string' ||
        !Number.isInteger(a.index) || a.index < 0) return;
    const moduleId = scopedModuleId(a.topicId, a.moduleId);
    if (!moduleId) return;
    const key = itemKey(moduleId, a.topicId, a.field, a.index);
    const now = Date.now();
    let it = store.items[key];
    if (!it) {
      it = {
        topicId: a.topicId, moduleId, field: a.field, index: a.index,
        strength: 0, due: now, last: 0, reps: 0, lapses: 0,
        firstSeen: now, lastCorrect: null, history: []
      };
      store.items[key] = it;
    }
    it.reps++;
    it.last = now;
    it.lastCorrect = !!a.correct;
    const rec = { t: now, c: a.correct ? 1 : 0 };
    if (typeof a.conf === 'number') rec.conf = a.conf;
    it.history.push(rec);
    if (it.history.length > 20) it.history = it.history.slice(-20);

    if (a.correct) {
      it.strength = Math.min(MAX_STRENGTH, it.strength + 1);
      // First step (strength 0 or 1): schedule across one night. Beyond that,
      // ride the interval ladder.
      it.due = it.strength <= 1 ? nextMorning(now) : now + INTERVALS[it.strength];
    } else {
      // Errors drop strength and re-surface soon: getting it wrong then seeing
      // the answer is exactly when the nervous system is cued to change.
      it.lapses++;
      it.strength = Math.max(0, it.strength - 2);
      it.due = now + LAPSE_DELAY;
    }
    save();
  }

  function priority(it) {
    return (it.lapses * 10) + (it.lastCorrect === false ? 5 : 0) - it.strength;
  }

  /* Interleave so consecutive review items come from different topics
     (Protocol 8: interleaving forces the learner to discriminate). */
  function interleave(items) {
    const out = [];
    const pool = items.slice();
    let lastTopic = null;
    while (pool.length) {
      let idx = pool.findIndex(it => `${it.moduleId}::${it.topicId}` !== lastTopic);
      if (idx === -1) idx = 0;
      const picked = pool.splice(idx, 1)[0];
      out.push(picked);
      lastTopic = `${picked.moduleId}::${picked.topicId}`;
    }
    return out;
  }

  function getDueItems(limit) {
    const now = Date.now();
    let due = Object.values(store.items).filter(it => it.due <= now && RENDERABLE[it.field] && resolveItem(it));
    due.sort((a, b) => priority(b) - priority(a) || a.due - b.due);
    due = interleave(due);
    return limit ? due.slice(0, limit) : due;
  }

  function getDueCount() {
    const now = Date.now();
    return Object.values(store.items).filter(it => it.due <= now && RENDERABLE[it.field] && resolveItem(it)).length;
  }

  function getDueCountForTopic(topicId, moduleId) {
    const now = Date.now();
    return Object.values(store.items).filter(it => it.topicId === topicId && (!moduleId || it.moduleId === moduleId) &&
      it.due <= now && RENDERABLE[it.field] && resolveItem(it)).length;
  }

  /* Resolve a stored item back to its live problem object. */
  function resolveItem(it) {
    if (!it || !window.MATH_MODULES) return null;
    const moduleId = scopedModuleId(it.topicId, it.moduleId);
    const mod = window.MATH_MODULES.find(candidate => candidate.id === moduleId);
    const topic = mod && (mod.topics || []).find(t => t.id === it.topicId);
    if (!topic || !Array.isArray(topic[it.field]) || !topic[it.field][it.index]) return null;
    return { problem: topic[it.field][it.index], moduleId: mod.id, topicTitle: topic.title };
  }

  /* Ordered, interleaved queue of due items resolved to live problems. */
  function buildReviewQueue(n) {
    const dueItems = getDueItems();
    const q = [];
    for (const it of dueItems) {
      if (!RENDERABLE[it.field]) continue;
      const r = resolveItem(it);
      if (!r) continue;
      q.push({
        item: it, problem: r.problem, topicId: it.topicId, moduleId: r.moduleId,
        field: it.field, index: it.index, topicTitle: r.topicTitle, kind: RENDERABLE[it.field]
      });
      if (q.length >= (n || 15)) break;
    }
    return q;
  }

  function getRetentionStats() {
    const items = Object.values(store.items);
    return {
      tracked: items.length,
      due: getDueCount(),
      retained: items.filter(it => it.strength >= 3).length,
      lapsing: items.filter(it => it.lapses > 0 && it.strength < 2).length
    };
  }

  /* Items met today that were scheduled for tomorrow morning. */
  function getFirstNightCount() {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const now = Date.now();
    return Object.values(store.items).filter(it => it.firstSeen >= start.getTime() && it.due > now).length;
  }

  /* Average gap between predicted confidence and actual correctness across
     recent attempts that carried a confidence rating (fluency-illusion gauge).
     Positive means overconfident. */
  function getCalibrationGap() {
    let n = 0, sum = 0;
    Object.values(store.items).forEach(it => {
      (it.history || []).forEach(h => {
        if (typeof h.conf === 'number') { n++; sum += (h.conf / 3) - h.c; }
      });
    });
    return n ? { gap: sum / n, samples: n } : { gap: null, samples: 0 };
  }

  /* ---- Progress export/import wiring ---- */
  function exportData() { return store; }
  function importData(data) {
    if (data && data.items && typeof data.items === 'object') {
      store = { schemaVersion: SCHEMA_VERSION, items: { ...store.items, ...data.items },
        legacyItems: { ...store.legacyItems, ...(data.legacyItems || {}) } };
      normalizeItems();
      save();
    }
  }

  return {
    init, load, save, recordAttempt,
    getDueItems, getDueCount, getDueCountForTopic, buildReviewQueue,
    getRetentionStats, getFirstNightCount, getCalibrationGap,
    resolveItem, exportData, importData, RENDERABLE
  };
})();
window.ReviewEngine = ReviewEngine;
