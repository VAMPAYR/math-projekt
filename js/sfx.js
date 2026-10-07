/* ============================================================
   SFX: Synthesized sound effects via the Web Audio API.
   No audio files needed: every sound is generated in code,
   so the app stays dependency-free and works offline.
   ============================================================ */
const SFX = (() => {
  const STORAGE_KEY = 'math_hero_sound_muted';
  let ctx = null;
  let muted = false;
  try {
    muted = localStorage.getItem(STORAGE_KEY) === 'true';
  } catch (e) { /* Sound remains available when browser storage is blocked. */ }

  /* Browsers require a user gesture before audio can start.
     The context is created lazily on the first sound request,
     which always follows a click or keypress in this app. */
  function getContext() {
    if (muted) return null;
    if (!window.AudioContext && !window.webkitAudioContext) return null;
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }

  /* Play one tone. type: oscillator wave shape. */
  function tone(freq, startDelay, duration, { type = 'sine', peak = 0.18, endFreq = null } = {}) {
    const ac = getContext();
    if (!ac) return;
    const t0 = ac.currentTime + startDelay;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, t0 + duration);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }

  /* ---- Public sounds ---- */

  /* Correct answer: short ascending major third. */
  function correct() {
    tone(660, 0, 0.12, { type: 'sine', peak: 0.15 });
    tone(880, 0.09, 0.16, { type: 'sine', peak: 0.15 });
  }

  /* Wrong answer: soft low tone, deliberately gentle. */
  function incorrect() {
    tone(220, 0, 0.18, { type: 'triangle', peak: 0.1, endFreq: 180 });
  }

  /* Streak milestone: quick rising triad. */
  function streak() {
    tone(523.25, 0, 0.1, { peak: 0.13 });
    tone(659.25, 0.08, 0.1, { peak: 0.13 });
    tone(783.99, 0.16, 0.18, { peak: 0.13 });
  }

  /* Level up: bright four-note arpeggio. */
  function levelUp() {
    tone(523.25, 0, 0.12, { peak: 0.15 });
    tone(659.25, 0.1, 0.12, { peak: 0.15 });
    tone(783.99, 0.2, 0.12, { peak: 0.15 });
    tone(1046.5, 0.3, 0.26, { peak: 0.16 });
  }

  /* Achievement unlocked: two-note sparkle. */
  function achievement() {
    tone(1174.66, 0, 0.1, { peak: 0.12 });
    tone(1567.98, 0.09, 0.22, { peak: 0.12 });
  }

  /* Drill finished: settling two-note close. */
  function drillEnd() {
    tone(783.99, 0, 0.14, { peak: 0.14 });
    tone(523.25, 0.12, 0.3, { peak: 0.14 });
  }

  /* ---- Mute control ---- */
  function isMuted() {
    return muted;
  }

  function setMuted(value) {
    muted = !!value;
    try {
      localStorage.setItem(STORAGE_KEY, String(muted));
    } catch (e) { /* The control still changes sound for this session. */ }
    updateButton();
  }

  function toggle() {
    setMuted(!muted);
    if (!muted) correct(); /* audible confirmation */
  }

  function updateButton() {
    const btn = document.getElementById('sound-toggle-btn');
    if (!btn) return;
    btn.textContent = muted ? 'Sound Off' : 'Sound On';
    btn.setAttribute('aria-pressed', muted ? 'false' : 'true');
    btn.title = muted ? 'Turn sound effects on' : 'Turn sound effects off';
  }

  document.addEventListener('DOMContentLoaded', updateButton);

  return { correct, incorrect, streak, levelUp, achievement, drillEnd, toggle, isMuted, setMuted };
})();
window.SFX = SFX;
