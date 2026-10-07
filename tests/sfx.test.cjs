/* Sound controls remain available when localStorage cannot be used. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function harness({ blockedRead = false, blockedWrite = false, saved = null } = {}) {
  const listeners = {};
  const button = { attributes: {}, setAttribute(key, value) { this.attributes[key] = value; } };
  const storage = new Map(saved === null ? [] : [['math_hero_sound_muted', saved]]);
  const context = vm.createContext({
    document: {
      getElementById: () => button,
      addEventListener(type, listener) { listeners[type] = listener; }
    },
    localStorage: {
      getItem(key) { if (blockedRead) throw new Error('Blocked'); return storage.get(key) || null; },
      setItem(key, value) { if (blockedWrite) throw new Error('Blocked'); storage.set(key, value); }
    }
  });
  context.window = context;
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/sfx.js'), 'utf8'), context);
  listeners.DOMContentLoaded();
  return { sfx: context.SFX, button, storage };
}

test('blocked reads and writes cannot abort SFX initialization or mute controls', () => {
  const { sfx, button } = harness({ blockedRead: true, blockedWrite: true });
  assert.equal(sfx.isMuted(), false);
  assert.doesNotThrow(() => sfx.setMuted(true));
  assert.equal(sfx.isMuted(), true);
  assert.equal(button.textContent, 'Sound Off');
  assert.equal(button.attributes['aria-pressed'], 'false');
  assert.doesNotThrow(() => sfx.toggle());
  assert.equal(sfx.isMuted(), false);
  assert.equal(button.textContent, 'Sound On');
  assert.equal(button.attributes['aria-pressed'], 'true');
  for (const name of ['correct', 'incorrect', 'streak', 'levelUp', 'achievement', 'drillEnd']) {
    assert.doesNotThrow(() => sfx[name](), name);
  }
});

test('stored mute preference loads and persists when storage is available', () => {
  const { sfx, button, storage } = harness({ saved: 'true' });
  assert.equal(sfx.isMuted(), true);
  assert.equal(button.textContent, 'Sound Off');
  sfx.toggle();
  assert.equal(storage.get('math_hero_sound_muted'), 'false');
});
