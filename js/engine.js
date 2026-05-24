/* ============================================================
   MATH ZERO-TO-HERO: Core Engine (v2)
   Rendering, navigation, exercises, game modes, progress tracking
   ============================================================ */

const MathEngine = (() => {
  /* ---- State ---- */
  let currentModule = null;
  let currentTopic = null;
  let currentMode = 'learn'; // learn | practice | challenge | drill
  let modules = [];
  let progress = {};
  const backgroundTabState = {};

  /* ---- Constants ---- */
  const STORAGE_KEY = 'math_hero_progress';
  const GAME_STATE_STORAGE_KEY = 'math_hero_game_state';
  const STREAK_STORAGE_KEY = 'math_hero_streak';
  const THEME_STORAGE_KEY = 'math_projekt_theme';
  const EXPORT_SCHEMA_VERSION = 1;

  /* ============================================================
     INITIALIZATION
     ============================================================ */
  function init() {
    initTheme();
    loadProgress();
    collectModules();
    GameState.init();
    renderSidebar();
    renderWelcome();
    setupGlobalListeners();
    updateProgressBar();
  }

  function getStoredTheme() {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) { /* silent */ }
    return 'light';
  }

  function applyTheme(theme) {
    const selectedTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = selectedTheme;
    document.documentElement.style.colorScheme = selectedTheme;
    const toggle = document.getElementById('theme-toggle-btn');
    if (toggle) {
      const nextTheme = selectedTheme === 'dark' ? 'light' : 'dark';
      toggle.textContent = selectedTheme === 'dark' ? 'Light' : 'Dark';
      toggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
      toggle.title = `Switch to ${nextTheme} mode`;
      toggle.setAttribute('aria-pressed', selectedTheme === 'dark' ? 'true' : 'false');
    }
  }

  function initTheme() {
    applyTheme(getStoredTheme());
  }

  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (e) { /* silent */ }
    applyTheme(nextTheme);
  }

  function collectModules() {
    modules = [];
    if (typeof window.MATH_MODULES !== 'undefined') {
      window.MATH_MODULES.forEach(m => modules.push(m));
    }
    modules.sort((a, b) => a.order - b.order);
  }

  /* ============================================================
     PROGRESS TRACKING
     ============================================================ */
  function loadProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      progress = data ? JSON.parse(data) : {};
    } catch (e) {
      progress = {};
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) { /* silent */ }
  }

  function markTopicComplete(moduleId, topicId) {
    const key = `${moduleId}::${topicId}`;
    progress[key] = { completed: true, timestamp: Date.now() };
    saveProgress();
    updateProgressBar();
    renderSidebar();
    showToast('Topic completed');
  }

  function isTopicComplete(moduleId, topicId) {
    return !!progress[`${moduleId}::${topicId}`]?.completed;
  }

  function getCompletionStats() {
    let total = 0;
    let done = 0;
    modules.forEach(m => {
      m.topics.forEach(t => {
        total++;
        if (isTopicComplete(m.id, t.id)) done++;
      });
    });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  function updateProgressBar() {
    const stats = getCompletionStats();
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');
    const count = document.getElementById('progress-count');
    if (fill) fill.style.width = stats.pct + '%';
    if (text) text.textContent = stats.pct + '%';
    if (count) count.textContent = `${stats.done} / ${stats.total} topics`;
  }

  function readStoredJson(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function isPlainObject(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
  }

  function validateTopicProgress(value) {
    if (!isPlainObject(value)) return false;
    return Object.entries(value).every(([key, entry]) => {
      return typeof key === 'string'
        && key.includes('::')
        && isPlainObject(entry)
        && (!Object.prototype.hasOwnProperty.call(entry, 'completed') || typeof entry.completed === 'boolean');
    });
  }

  function validateGameState(value) {
    if (!isPlainObject(value)) return false;
    const numberFields = [
      'xp',
      'level',
      'totalProblemsCorrect',
      'totalProblemsAttempted',
      'totalTimeSpent',
      'streakDays',
      'currentSessionCorrect',
      'currentSessionAttempted',
      'currentStreak',
      'bestStreak'
    ];
    const objectFields = ['achievements', 'dailyChallengeCompleted', 'modeStats', 'topicMastery'];
    const expectedFields = [...numberFields, ...objectFields, 'lastActiveDate'];
    if (!expectedFields.some(field => Object.prototype.hasOwnProperty.call(value, field))) return false;
    if (value.lastActiveDate !== null
      && Object.prototype.hasOwnProperty.call(value, 'lastActiveDate')
      && typeof value.lastActiveDate !== 'string') return false;
    if (numberFields.some(field => Object.prototype.hasOwnProperty.call(value, field)
      && (!Number.isFinite(value[field]) || value[field] < 0))) return false;
    if (objectFields.some(field => Object.prototype.hasOwnProperty.call(value, field)
      && !isPlainObject(value[field]))) return false;
    return true;
  }

  function validateStoredStreak(value) {
    if (value === null || value === undefined) return true;
    if (Number.isFinite(value) && value >= 0) return true;
    if (!isPlainObject(value)) return false;
    return Object.entries(value).every(([key, entry]) => {
      return typeof key === 'string'
        && (entry === null
          || typeof entry === 'string'
          || typeof entry === 'boolean'
          || Number.isFinite(entry));
    });
  }

  function buildProgressExport() {
    return {
      app: 'Math Projekt',
      schemaVersion: EXPORT_SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      storage: {
        [STORAGE_KEY]: progress,
        [GAME_STATE_STORAGE_KEY]: GameState.getState(),
        [STREAK_STORAGE_KEY]: readStoredJson(STREAK_STORAGE_KEY, null)
      }
    };
  }

  function showProgressTools() {
    closeProgressTools();
    const stats = getCompletionStats();
    const state = GameState.getState();
    const overlay = document.createElement('div');
    overlay.className = 'progress-tools-overlay';
    overlay.id = 'progress-tools-overlay';
    overlay.innerHTML = `
      <div class="progress-tools-dialog" role="dialog" aria-modal="true" aria-labelledby="progress-tools-title">
        <div class="progress-tools-header">
          <div>
            <div class="phase-label practice">Progress</div>
            <h2 id="progress-tools-title">Save or Restore Progress</h2>
          </div>
          <button class="progress-tools-close" type="button" onclick="MathEngine.closeProgressTools()" aria-label="Close progress tools">Close</button>
        </div>
        <p class="progress-tools-copy">Progress stays in this browser by default. Export creates a JSON file that can be imported on another browser or device.</p>
        <div class="progress-tools-stats">
          <div><strong>${stats.done}</strong><span>Completed topics</span></div>
          <div><strong>${state.totalProblemsCorrect || 0}</strong><span>Solved problems</span></div>
          <div><strong>${state.level || 1}</strong><span>Level</span></div>
        </div>
        <div class="progress-tools-actions">
          <button class="mark-complete-btn" type="button" onclick="MathEngine.exportProgressFile()">Export Progress</button>
          <button class="nav-btn primary" type="button" onclick="MathEngine.openImportProgressDialog()">Import Progress</button>
          <input id="progress-import-input" class="progress-import-input" type="file" accept="application/json,.json"
            onchange="MathEngine.importProgressFile(this.files[0]); this.value = ''">
        </div>
        <div class="progress-tools-note">Import replaces the saved topic completion and game progress in this browser.</div>
      </div>
    `;
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeProgressTools();
    });
    document.body.appendChild(overlay);
  }

  function closeProgressTools() {
    document.getElementById('progress-tools-overlay')?.remove();
  }

  function exportProgressFile() {
    const payload = JSON.stringify(buildProgressExport(), null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `math-projekt-progress-${date}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast('Progress exported');
  }

  function openImportProgressDialog() {
    document.getElementById('progress-import-input')?.click();
  }

  function importProgressFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(String(reader.result || ''));
        applyProgressImport(payload);
      } catch (e) {
        showToast('Import failed. Select a valid Math Projekt progress file.');
      }
    };
    reader.onerror = () => showToast('Import failed. The file could not be read.');
    reader.readAsText(file);
  }

  function applyProgressImport(payload) {
    if (!isPlainObject(payload)) {
      showToast('Import failed. The file is not a valid progress export.');
      return;
    }

    const storage = isPlainObject(payload.storage) ? payload.storage : payload;
    const importedProgress = storage[STORAGE_KEY] || payload.progress;
    const importedGameState = storage[GAME_STATE_STORAGE_KEY] || payload.gameState;
    const importedStreak = storage[STREAK_STORAGE_KEY];

    if (!importedProgress && !importedGameState) {
      showToast('Import failed. No progress data was found.');
      return;
    }
    if (importedProgress && !validateTopicProgress(importedProgress)) {
      showToast('Import failed. Topic progress has an invalid format.');
      return;
    }
    if (importedGameState && !validateGameState(importedGameState)) {
      showToast('Import failed. Game progress has an invalid format.');
      return;
    }
    if (!validateStoredStreak(importedStreak)) {
      showToast('Import failed. Streak progress has an invalid format.');
      return;
    }

    try {
      if (importedProgress) {
        progress = importedProgress;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      }
      if (importedGameState) {
        localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(importedGameState));
        GameState.load();
      }
      if (importedStreak !== undefined) {
        if (importedStreak === null) localStorage.removeItem(STREAK_STORAGE_KEY);
        else localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(importedStreak));
      }
      closeProgressTools();
      updateProgressBar();
      renderSidebar();
      if (currentModule && currentTopic) renderTopic(currentModule, currentTopic);
      else renderWelcome();
      showToast('Progress imported');
    } catch (e) {
      showToast('Import failed. Browser storage is unavailable.');
    }
  }

  /* ============================================================
     SIDEBAR NAVIGATION
     ============================================================ */
  function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;
    nav.innerHTML = '';

    modules.forEach((mod, idx) => {
      const isExpanded = currentModule === mod.id;
      const div = document.createElement('div');
      div.className = `nav-module${isExpanded ? ' expanded' : ''}`;
      div.dataset.moduleId = mod.id;

      const header = document.createElement('div');
      header.className = 'nav-module-header';
      header.innerHTML = `
        <span class="module-number">M${idx + 1}</span>
        <span class="module-title">${mod.title}</span>
        <span class="module-chevron" aria-hidden="true"></span>
      `;
      header.addEventListener('click', () => {
        div.classList.toggle('expanded');
      });
      div.appendChild(header);

      const topicList = document.createElement('div');
      topicList.className = 'nav-topics';
      mod.topics.forEach(topic => {
        const isActive = currentModule === mod.id && currentTopic === topic.id;
        const completed = isTopicComplete(mod.id, topic.id);
        const mastery = GameState.getTopicMastery(topic.id);
        const topicEl = document.createElement('div');
        topicEl.className = `nav-topic${isActive ? ' active' : ''}`;
        topicEl.innerHTML = `
          <span class="topic-status${completed ? ' completed' : ''}">${completed ? '' : mastery.score > 0 ? Math.round(mastery.score) + '%' : ''}</span>
          <span>${topic.title}</span>
        `;
        topicEl.addEventListener('click', () => {
          navigateTo(mod.id, topic.id);
          closeMobileSidebar();
        });
        topicList.appendChild(topicEl);
      });
      div.appendChild(topicList);
      nav.appendChild(div);
    });
  }

  /* ============================================================
     NAVIGATION
     ============================================================ */
  function navigateTo(moduleId, topicId) {
    currentModule = moduleId;
    currentTopic = topicId;
    currentMode = 'learn';
    renderSidebar();
    renderTopic(moduleId, topicId);
    window.scrollTo(0, 0);
    const contentArea = document.querySelector('.content-area');
    if (contentArea) contentArea.scrollTop = 0;
  }

  function getAdjacentTopics() {
    const flat = [];
    modules.forEach(m => {
      m.topics.forEach(t => {
        flat.push({ moduleId: m.id, topicId: t.id, moduleTitle: m.title, topicTitle: t.title });
      });
    });
    const idx = flat.findIndex(f => f.moduleId === currentModule && f.topicId === currentTopic);
    return {
      prev: idx > 0 ? flat[idx - 1] : null,
      next: idx < flat.length - 1 ? flat[idx + 1] : null
    };
  }

  function goHome() {
    currentModule = null;
    currentTopic = null;
    renderSidebar();
    renderWelcome();
  }

  /* ============================================================
     WELCOME / DASHBOARD
     ============================================================ */
  function renderWelcome() {
    const content = document.getElementById('content-inner');
    const breadcrumbs = document.getElementById('breadcrumbs');
    if (breadcrumbs) breadcrumbs.innerHTML = '<span class="current">Home</span>';

    const gs = GameState.getState();
    const streak = GameState.getStreakDays();
    const accuracy = GameState.getAccuracy();
    const dailyDone = GameState.isDailyChallengeComplete();

    let html = `
      <div class="welcome-screen">
        <h2>Mathematics</h2>
        <p class="tagline">From counting to calculus. Every concept explained from first principles.</p>

        <!-- Getting Started Guide -->
        <div class="welcome-guide">
          <div class="guide-header" onclick="this.parentElement.classList.toggle('expanded')">
            <h3>How to Use This Platform</h3>
            <span class="guide-toggle" aria-hidden="true"></span>
          </div>
          <div class="guide-body">
            <div class="guide-section">
              <h4>What is mathematics?</h4>
              <p>Mathematics is the study of patterns, quantities, and structures. It begins with counting objects (1, 2, 3...) and builds upward: addition combines groups, multiplication repeats addition, algebra uses letters as placeholders for unknown numbers, and calculus measures change. Every topic on this platform grows from these foundations. If you can count to ten, you have everything you need to start.</p>
            </div>
            <div class="guide-section">
              <h4>Mathematics is a language</h4>
              <p>Mathematics has grammar, vocabulary, and syntax, like any formal language. The symbol $+$ tells the reader to combine. The symbol $=$ states equality between two expressions. A variable like $x$ represents a number that has not been identified yet. An equation is a sentence. A proof is a justified argument.</p>
              <p>This platform treats mathematics as a language. Each Math Grammar block explains what a symbol means, why an operation exists, and when the operation applies. The goal is comprehension rather than memorization. Strong grammar lets learners build solutions to unfamiliar problems.</p>
            </div>
            <div class="guide-section">
              <h4>Why study mathematics?</h4>
              <p>Mathematics trains a specific kind of thinking: identify the relevant quantities, remove irrelevant detail, define relationships, and reason precisely from those definitions. This skill transfers to engineering, medicine, finance, law, software, and research. The content matters because it builds a disciplined method for solving unfamiliar problems.</p>
            </div>
            <div class="guide-section">
              <h4>You need zero prior knowledge</h4>
              <p>Module 1 starts with the meaning of number and addition. Terms are defined before they carry technical weight. Formulas include reasoning, not only procedure. When a topic uses a concept from an earlier module, the topic recaps the needed definition at the top.</p>
            </div>
            <div class="guide-section">
              <h4>How each topic is organized</h4>
              <ul>
                <li><strong>Purpose</strong>: The problem the concept solves and the reason it belongs in the curriculum.</li>
                <li><strong>Core Concept</strong>: The main idea, explained through definitions, diagrams, and worked reasoning.</li>
                <li><strong>Definition</strong>: The precise, formal statement. This is the reference you return to after understanding the concept.</li>
                <li><strong>Examples</strong>: Worked problems showing every step, with explanations for each decision.</li>
                <li><strong>Practice</strong>: Problems for you to solve, with hints and immediate feedback.</li>
                <li><strong>Strategy</strong>: If you get stuck, this section walks you through how to think about the problem.</li>
              </ul>
            </div>
            <div class="guide-section">
              <h4>Recommended path</h4>
              <p>Start at Module 1 and work through in order. Each module builds on the one before it. The modules are:</p>
              <ol>
                <li><strong>Foundations</strong>: Numbers, arithmetic, sets, logic, proof</li>
                <li><strong>Beginning Algebra</strong>: Variables, equations, inequalities</li>
                <li><strong>Geometry</strong>: Points, lines, angles, triangles, circles</li>
                <li><strong>Intermediate Algebra</strong>: Polynomials, factoring, rational expressions</li>
                <li><strong>Advanced Algebra</strong>: Quadratics, exponentials, logarithms</li>
                <li><strong>Precalculus</strong>: Functions, graphs, transformations</li>
                <li><strong>Trigonometry</strong>: Angles, unit circle, identities</li>
                <li><strong>Calculus 1A-1B</strong>: Limits, derivatives, applications</li>
                <li><strong>Calculus 2A-2B</strong>: Integration, series, sequences</li>
                <li><strong>Calculus 3A-3B</strong>: Vectors, multivariable functions, multiple integrals</li>
                <li><strong>Probability &amp; Statistics</strong> : Counting, distributions, data analysis</li>
              </ol>
              <h4 style="margin-top: 1rem; color: var(--accent);">Planned Subjects</h4>
              <p>Future modules may include:</p>
              <ul>
                <li><strong>Linear Algebra</strong>: vectors, matrices, eigenvalues, transformations</li>
                <li><strong>Differential Equations</strong>: ODEs, systems, phase portraits</li>
                <li><strong>Discrete Mathematics</strong>: logic, proofs, graph theory, combinatorics</li>
                <li><strong>Number Theory</strong>: primes, modular arithmetic, cryptography</li>
                <li><strong>Real Analysis</strong>: rigorous limits, continuity, measure theory</li>
              </ul>
              <p>Each topic has a Mark Complete button for progress tracking. Use the Progress tools to export or import saved progress.</p>
            </div>
            <div class="guide-section">
              <h4>Symbols you will see</h4>
              <ul>
                <li><strong>= </strong> means "equals" (the left side has the same value as the right)</li>
                <li><strong>+ &minus; &times; &divide;</strong> are addition, subtraction, multiplication, division</li>
                <li><strong>x, y, n</strong> are letters representing unknown numbers (variables)</li>
                <li><strong>f(x)</strong> means "a function called f, applied to input x" (explained fully in Precalculus)</li>
                <li>Anything else is defined the first time it appears</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="xp-bar-section">
          <div class="xp-bar-header">
            <div class="xp-level-info">
              <div class="xp-level-badge">${GameState.getLevel()}</div>
              <div class="xp-level-text">
                <h3>${GameState.getLevelTitle()}</h3>
                <span>${GameState.getXP().toLocaleString()} XP</span>
              </div>
            </div>
            <div class="xp-next">${GameState.getXPForNextLevel().toLocaleString()} XP to next level</div>
          </div>
          <div class="xp-bar-container-lg">
            <div class="xp-bar-fill-lg" style="width: ${GameState.getXPProgress()}%"></div>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-dashboard">
          <div class="stat-card">

            <div class="stat-value">${streak}</div>
            <div class="stat-label">Day Streak</div>
          </div>
          <div class="stat-card">

            <div class="stat-value">${gs.totalProblemsCorrect}</div>
            <div class="stat-label">Solved</div>
          </div>
          <div class="stat-card">

            <div class="stat-value">${accuracy}%</div>
            <div class="stat-label">Accuracy</div>
          </div>
          <div class="stat-card">

            <div class="stat-value">${gs.bestStreak}</div>
            <div class="stat-label">Best Streak</div>
          </div>
          <div class="stat-card">

            <div class="stat-value">${gs.modeStats?.challenge?.completed || 0}</div>
            <div class="stat-label">Challenges</div>
          </div>
          <div class="stat-card">

            <div class="stat-value">${gs.modeStats?.speedDrill?.bestWpm || 0}</div>
            <div class="stat-label">Best Speed</div>
          </div>
        </div>

        <!-- Game Actions -->
        <div class="game-actions">
          <div class="game-action-btn" onclick="MathEngine.showDrillSelector()">

            <div class="action-title">Speed Drill</div>
            <div class="action-desc">Race against the clock with rapid-fire problems</div>
          </div>
          <div class="game-action-btn" onclick="MathEngine.showDailyChallenge()">

            <div class="action-title">${dailyDone ? 'Daily Complete' : 'Daily Challenge'}</div>
            <div class="action-desc">${dailyDone ? 'Come back tomorrow' : 'A fresh challenge every day'}</div>
          </div>
          <div class="game-action-btn" onclick="MathEngine.showAchievements()">

            <div class="action-title">Achievements</div>
            <div class="action-desc">${Object.keys(gs.achievements || {}).length} / ${Object.keys(GameState.getAchievements()).length} unlocked</div>
          </div>
          <div class="game-action-btn" onclick="MathEngine.showProgressTools()">

            <div class="action-title">Progress Tools</div>
            <div class="action-desc">Export or import saved topic and practice progress</div>
          </div>
          <div class="game-action-btn" onclick="MathEngine.showMiniGames()">

            <div class="action-title">Mini Games</div>
            <div class="action-desc">Equation Balance, Pattern Finder, Expression Builder</div>
          </div>
        </div>

        <!-- Module Cards -->
        <h3 style="text-align: left; margin-bottom: 16px; font-size: 20px;">Modules</h3>
        <div class="module-cards">
    `;

    modules.forEach(mod => {
      const stats = getModuleStats(mod.id);
      html += `
        <div class="module-card" onclick="MathEngine.navigateTo('${mod.id}', '${mod.topics[0]?.id || ''}')">
          <div class="card-number">Module ${modules.indexOf(mod) + 1}</div>
          <h3>${mod.title}</h3>
          <p>${mod.description}</p>
          <div class="card-topics">${mod.topics.length} topics &middot; ${stats.done}/${stats.total} completed</div>
        </div>
      `;
    });

    html += `</div>

        <!-- Planned Subjects -->
        <div class="coming-soon-section">
          <h3>Planned Subjects</h3>
          <p>The following subjects are candidates for later modules:</p>
          <div class="coming-soon-grid">
            <div class="coming-soon-card">

              <h4>Linear Algebra</h4>
              <p>Vectors, matrices, eigenvalues, linear transformations, and systems of equations in higher dimensions.</p>
            </div>
            <div class="coming-soon-card">

              <h4>Differential Equations</h4>
              <p>Ordinary and partial differential equations. Modeling growth, decay, oscillation, and diffusion.</p>
            </div>
            <div class="coming-soon-card">

              <h4>Number Theory</h4>
              <p>Prime numbers, divisibility, modular arithmetic, and cryptography foundations.</p>
            </div>
            <div class="coming-soon-card">

              <h4>Discrete Mathematics</h4>
              <p>Logic, sets, graph theory, combinatorics, and the mathematics behind computer science.</p>
            </div>
            <div class="coming-soon-card">

              <h4>Abstract Algebra</h4>
              <p>Groups, rings, and fields. These structures explain symmetry, operations, and equation behavior.</p>
            </div>
            <div class="coming-soon-card">

              <h4>Real Analysis</h4>
              <p>Rigorous foundations of calculus. Sequences, series, continuity, and measure theory.</p>
            </div>
          </div>
        </div>

    </div>`;
    content.innerHTML = html;
  }

  function getModuleStats(moduleId) {
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return { total: 0, done: 0 };
    let total = 0, done = 0;
    mod.topics.forEach(t => {
      total++;
      if (isTopicComplete(moduleId, t.id)) done++;
    });
    return { total, done };
  }

  /* ============================================================
     DRILL SELECTOR SCREEN
     ============================================================ */
  function showDrillSelector() {
    currentModule = null;
    currentTopic = null;
    renderSidebar();
    const content = document.getElementById('content-inner');
    const breadcrumbs = document.getElementById('breadcrumbs');
    if (breadcrumbs) breadcrumbs.innerHTML = '<span style="cursor:pointer" onclick="MathEngine.goHome()">Home</span><span class="separator">&rsaquo;</span><span class="current">Speed Drill</span>';
    content.innerHTML = SpeedDrill.renderDrillSelector();
    setTimeout(renderAllMath, 100);
  }

  /* ============================================================
     DAILY CHALLENGE
     ============================================================ */
  function showDailyChallenge() {
    if (GameState.isDailyChallengeComplete()) {
      GameState.showGameToast('Daily challenge already completed. Come back tomorrow.', '');
      return;
    }

    currentModule = null;
    currentTopic = null;
    renderSidebar();
    const content = document.getElementById('content-inner');
    const breadcrumbs = document.getElementById('breadcrumbs');
    if (breadcrumbs) breadcrumbs.innerHTML = '<span style="cursor:pointer" onclick="MathEngine.goHome()">Home</span><span class="separator">&rsaquo;</span><span class="current">Daily Challenge</span>';

    // Generate a daily challenge based on the date
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const allTopics = [];
    modules.forEach(m => m.topics.forEach(t => allTopics.push({ mod: m, topic: t })));

    if (allTopics.length === 0) {
      content.innerHTML = '<p>No topics available yet.</p>';
      return;
    }

    // Pick 5 problems from random topics
    const problems = [];
    for (let i = 0; i < 5; i++) {
      const topicData = allTopics[(seed + i * 37) % allTopics.length];
      const topic = topicData.topic;
      if (topic.exercises && topic.exercises.length > 0) {
        const ex = topic.exercises[(seed + i * 13) % topic.exercises.length];
        problems.push({ ...ex, topicTitle: topic.title, topicId: topic.id });
      } else if (topic.freeResponse && topic.freeResponse.length > 0) {
        const fr = topic.freeResponse[(seed + i * 13) % topic.freeResponse.length];
        problems.push({ ...fr, type: 'free', topicTitle: topic.title, topicId: topic.id });
      }
    }

    let html = `
      <div class="drill-selector" style="max-width: 800px;">
        <div class="drill-header">
          <h2>Daily Challenge</h2>
          <p>5 problems from across the curriculum. Complete them all for bonus XP.</p>
        </div>
        <div class="daily-problems" id="daily-problems">
    `;

    const dcId = 'dc';
    let correctCount = 0;

    problems.forEach((prob, idx) => {
      const exId = `${dcId}-${idx}`;
      html += `
        <div class="exercise-card" id="${exId}" style="text-align:left;">
          <div class="exercise-header">
            <span class="exercise-badge ${prob.difficulty || 'medium'}">${prob.difficulty || 'medium'}</span>
            <span class="exercise-number">${prob.topicTitle}</span>
          </div>
          <div class="exercise-question">${prob.question}</div>
      `;

      if (prob.type === 'free') {
        html += `
          <div class="free-response-input-area">
            <div class="fr-input-group">
              <input type="text" class="fr-input" id="${exId}-input" placeholder="Your answer..."
                     onkeydown="if(event.key==='Enter')MathEngine.checkDailyProblem('${exId}',${idx})" />
              <button class="fr-submit-btn" onclick="MathEngine.checkDailyProblem('${exId}',${idx})">Check</button>
            </div>
          </div>
        `;
      } else if (prob.options) {
        html += `<div class="exercise-options" id="${exId}-options">`;
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        prob.options.forEach((opt, oIdx) => {
          html += `
            <button class="option-btn" data-exercise="${exId}" data-index="${oIdx}" data-correct="${oIdx === prob.correctIndex}"
                    onclick="MathEngine.checkAnswer(this, ${oIdx}, ${prob.correctIndex}, '${exId}')">
              <span class="option-letter">${letters[oIdx]}</span>
              <span>${opt}</span>
            </button>
          `;
        });
        html += '</div>';
      }

      html += `
          <div class="exercise-feedback correct-feedback" id="${exId}-correct">
            <h4>Correct</h4>
            <p>${prob.correctExplanation || prob.explanation || 'Correct.'}</p>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${exId}-incorrect">
            <h4>Not quite</h4>
            <p id="${exId}-incorrect-text"></p>
          </div>
        </div>
      `;
    });

    html += `
        </div>
        <div class="exercise-feedback correct-feedback" id="${dcId}-complete" style="margin-top:24px;">
          <h4>Daily Challenge Complete</h4>
          <p>+100 XP earned. Come back tomorrow for another challenge.</p>
        </div>
      </div>
    `;

    content.innerHTML = html;

    // Store problems for checking
    window._dailyProblems = problems;
    window._dailyCorrect = 0;
    window._dailyTotal = problems.length;

    setTimeout(renderAllMath, 100);
  }

  function checkDailyProblem(exId, idx) {
    const prob = window._dailyProblems?.[idx];
    if (!prob) return;

    if (prob.type === 'free') {
      const input = document.getElementById(`${exId}-input`);
      if (!input) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;
      const isCorrect = ProblemEngine.checkAnswer(userAnswer, prob.accept, prob.type);
      if (isCorrect) {
        input.classList.add('correct');
        input.disabled = true;
        document.getElementById(`${exId}-correct`).classList.add('show');
        window._dailyCorrect++;
        GameState.recordCorrectAnswer(prob.difficulty, 'freeResponse', prob.topicId);
      } else {
        input.classList.add('incorrect');
        document.getElementById(`${exId}-incorrect`).classList.add('show');
        document.getElementById(`${exId}-incorrect-text`).innerHTML = prob.wrongHint || 'Try again.';
        GameState.recordWrongAnswer();
        setTimeout(() => { input.classList.remove('incorrect'); input.value = ''; }, 1500);
      }
    }

    // Check if all daily problems are complete
    if (window._dailyCorrect >= window._dailyTotal) {
      document.getElementById('dc-complete').classList.add('show');
      GameState.recordDailyChallenge();
    }

    setTimeout(renderAllMath, 50);
  }

  /* ============================================================
     ACHIEVEMENTS SCREEN
     ============================================================ */
  function showAchievements() {
    currentModule = null;
    currentTopic = null;
    renderSidebar();
    const content = document.getElementById('content-inner');
    const breadcrumbs = document.getElementById('breadcrumbs');
    if (breadcrumbs) breadcrumbs.innerHTML = '<span style="cursor:pointer" onclick="MathEngine.goHome()">Home</span><span class="separator">&rsaquo;</span><span class="current">Achievements</span>';

    const all = GameState.getAchievements();
    const unlocked = GameState.getUnlockedAchievements();

    let html = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: 32px; font-weight: 800; margin-bottom: 8px;">Achievements</h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">${Object.keys(unlocked).length} / ${Object.keys(all).length} unlocked</p>
        <div class="achievement-grid">
    `;

    for (const [id, ach] of Object.entries(all)) {
      const isUnlocked = !!unlocked[id];
      html += `
        <div class="achievement-card ${isUnlocked ? 'unlocked' : ''}">
          <div class="ach-status">${isUnlocked ? 'Unlocked' : 'Locked'}</div>
          <div class="ach-title">${ach.title}</div>
          <div class="ach-desc">${ach.desc}</div>
        </div>
      `;
    }

    html += '</div></div>';
    content.innerHTML = html;
  }

  /* ============================================================
     TOPIC RENDERING (Learn Mode)
     ============================================================ */
  function renderTopic(moduleId, topicId) {
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return;
    const topic = mod.topics.find(t => t.id === topicId);
    if (!topic) return;

    /* Breadcrumbs */
    const breadcrumbs = document.getElementById('breadcrumbs');
    if (breadcrumbs) {
      breadcrumbs.innerHTML = `
        <span style="cursor:pointer" onclick="MathEngine.goHome()">Home</span>
        <span class="separator">&rsaquo;</span>
        <span>${mod.title}</span>
        <span class="separator">&rsaquo;</span>
        <span class="current">${topic.title}</span>
      `;
    }

    const content = document.getElementById('content-inner');
    let html = '';

    /* Header */
    html += `
      <div class="topic-header">
        <div class="topic-module-label">Module ${mod.order}: ${mod.title}</div>
        <h2 class="topic-title">${topic.title}</h2>
        ${topic.description ? `<p class="topic-description">${topic.description}</p>` : ''}
      </div>
    `;

    /* Mode Selector */
    const hasFreeResponse = topic.freeResponse && topic.freeResponse.length > 0;
    const hasStepBuilder = topic.stepBuilder && topic.stepBuilder.length > 0;
    const hasMatching = topic.matching && topic.matching.length > 0;
    const hasFillBlanks = topic.fillBlanks && topic.fillBlanks.length > 0;
    const hasMultiPart = topic.multiPart && topic.multiPart.length > 0;
    const hasChallenges = topic.challenges && topic.challenges.length > 0;
    const hasExercises = topic.exercises && topic.exercises.length > 0;
    const hasFlashCards = topic.flashCards && topic.flashCards.length > 0;
    const hasInteractive = hasFreeResponse || hasStepBuilder || hasMatching || hasFillBlanks || hasMultiPart;
    const selfStudyGuide = getSelfStudyGuide(topic, mod);
    const universityWalkthrough = getUniversityWalkthrough(topic, mod);

    html += `<div class="mode-selector">
      <button class="mode-btn active" onclick="MathEngine.switchMode('learn', '${moduleId}', '${topicId}')">Learn</button>
      ${hasFlashCards ? `<button class="mode-btn" onclick="MathEngine.switchMode('flashcards', '${moduleId}', '${topicId}')">Flash Cards</button>` : ''}
      ${hasExercises || hasInteractive ? `<button class="mode-btn" onclick="MathEngine.switchMode('practice', '${moduleId}', '${topicId}')">Practice</button>` : ''}
      ${hasChallenges || hasMultiPart ? `<button class="mode-btn" onclick="MathEngine.switchMode('challenge', '${moduleId}', '${topicId}')">Challenge</button>` : ''}
    </div>`;

    html += renderLessonPath(topic, mod, {
      hasFlashCards,
      hasExercises,
      hasInteractive,
      hasChallenges,
      hasMultiPart,
      hasSelfStudyGuide: !!selfStudyGuide,
      hasUniversityWalkthrough: !!universityWalkthrough
    });

    /* Visualizations */
    if (topic.visualizations) {
      topic.visualizations.forEach((viz, i) => {
        html += `<div class="viz-container" id="viz-${topicId}-${i}"></div>`;
        if (viz.controls) {
          html += `<div class="viz-controls" id="viz-controls-${topicId}-${i}">${viz.controls}</div>`;
        }
      });
    }

    /* Prerequisites Recap */
    if (topic.prereqRecap) html += renderPrereqRecap(topic.prereqRecap);

    /* Learning Content Phases */
    if (topic.hook) html += renderPhase('hook', 'Start Here', 'Puzzle', topic.hook);
    if (topic.whyExists) html += renderPhase('why-exists', 'Purpose', 'Motivation', topic.whyExists);
    if (topic.concept) html += renderPhase('concept', 'Core Concept', 'Concept', topic.concept);
    if (topic.definition) html += renderPhase('definition', 'Definition', 'Definition', topic.definition);
    html += renderIntuitionLab(topic, mod);

    if (universityWalkthrough) html += renderUniversityWalkthrough(universityWalkthrough);

    if (topic.examples) html += renderExamples(topic.examples);

    /* Background: Etymology, History, "Why does this exist?" */
    if (topic.background) html += renderBackground(topic);

    if (selfStudyGuide) html += renderSelfStudyGuide(selfStudyGuide);

    /* Math Grammar: "Why do we use this operation?" */
    if (topic.mathGrammar && topic.mathGrammar.length) {
      html += `<div class="math-grammar-section">
        <div class="phase-label concept">Math Grammar</div>
        <h3>Reading and Writing Math</h3>
        <p class="math-grammar-intro">Mathematics has rules (grammar) just like any language. Below is how to read, write, and reason about the symbols and operations in this topic.</p>
        <div class="math-grammar-grid">`;
      topic.mathGrammar.forEach(g => {
        html += `<div class="math-grammar-card">
          <div class="mg-question">${g.question}</div>
          <div class="mg-answer">${g.answer}</div>
        </div>`;
      });
      html += `</div></div>`;
    }

    /* Formal Definitions */
    if (topic.formalDefinitions && topic.formalDefinitions.length) {
      html += `<div class="formal-defs-section" id="lesson-formal-definitions">
        <div class="phase-label definition">Formal Definitions</div>
        <h3>Key Definitions and Theorems</h3>
        <div class="formal-defs-grid">`;
      topic.formalDefinitions.forEach(d => {
        html += `<div class="formal-def-card">
          <div class="formal-def-term">${d.term}</div>
          ${d.symbol ? `<div class="formal-def-symbol">${d.symbol}</div>` : ''}
          <div class="formal-def-body">${d.definition}</div>
        </div>`;
      });
      html += `</div></div>`;
    }

    /* Interactive Graph Explorer */
    if (topic.graphExplorer && topic.graphExplorer.length) {
      html += renderGraphExplorer(topic.graphExplorer, 'Explore: ' + topic.title);
    }

    /* Interactive Problem Types */
    let practiceHtml = '';
    if (topic.exercises) practiceHtml += renderExercises(topic.exercises, moduleId, topicId);
    if (topic.freeResponse) practiceHtml += ProblemEngine.renderFreeResponse(topic.freeResponse, moduleId, topicId);
    if (topic.stepBuilder) practiceHtml += ProblemEngine.renderStepBuilder(topic.stepBuilder, moduleId, topicId);
    if (topic.matching) practiceHtml += ProblemEngine.renderMatching(topic.matching, moduleId, topicId);
    if (topic.fillBlanks) practiceHtml += ProblemEngine.renderFillBlanks(topic.fillBlanks, moduleId, topicId);
    if (topic.multiPart) practiceHtml += ProblemEngine.renderMultiPart(topic.multiPart, moduleId, topicId);
    if (practiceHtml) html += `<div id="lesson-practice">${practiceHtml}</div>`;

    /* Stuck Guide */
    if (topic.stuckGuide) html += renderPhase('stuck', 'Strategy', 'Guide', topic.stuckGuide);

    html += renderTopicReview(topic, mod, {
      hasExercises,
      hasInteractive,
      hasChallenges,
      hasMultiPart
    });

    /* Navigation footer */
    const adj = getAdjacentTopics();
    const completed = isTopicComplete(moduleId, topicId);
    html += `
      <div class="topic-nav-footer">
        <button class="nav-btn${adj.prev ? '' : ' disabled'}" ${adj.prev ? `onclick="MathEngine.navigateTo('${adj.prev.moduleId}','${adj.prev.topicId}')"` : ''}>
          &larr; ${adj.prev ? adj.prev.topicTitle : 'Start'}
        </button>
        <button class="mark-complete-btn${completed ? ' completed' : ''}" onclick="MathEngine.markTopicComplete('${moduleId}','${topicId}')">
          ${completed ? 'Completed' : 'Mark Complete'}
        </button>
        <button class="nav-btn primary${adj.next ? '' : ' disabled'}" ${adj.next ? `onclick="MathEngine.navigateTo('${adj.next.moduleId}','${adj.next.topicId}')"` : ''}>
          ${adj.next ? adj.next.topicTitle : 'Finished'}
        </button>
      </div>
    `;

    content.innerHTML = html;
    resetMathFlags();
    renderAllMath();
    initializeIntuitionLabs();

    if (topic.visualizations) {
      setTimeout(() => {
        topic.visualizations.forEach((viz, i) => {
          if (viz.render) viz.render(`viz-${topicId}-${i}`);
        });
      }, 100);
    }
  }

  /* ---- Mode Switcher ---- */
  function switchMode(mode, moduleId, topicId) {
    currentMode = mode;
    if (mode === 'learn') {
      renderTopic(moduleId, topicId);
    } else if (mode === 'flashcards') {
      renderFlashCards(moduleId, topicId);
    } else if (mode === 'practice') {
      renderPracticeMode(moduleId, topicId);
    } else if (mode === 'challenge') {
      renderChallengeMode(moduleId, topicId);
    }

    // Update active button
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.mode-btn').forEach(btn => {
      if (btn.textContent.toLowerCase().includes(mode)) btn.classList.add('active');
    });
  }

  function renderLessonPath(topic, mod, flags) {
    const items = [];
    const firstConceptTarget = topic.hook ? 'lesson-hook' : topic.whyExists ? 'lesson-why-exists' : topic.concept ? 'lesson-concept' : null;
    if (firstConceptTarget) items.push({ label: 'Intuition', target: firstConceptTarget });
    if (topic.definition || topic.formalDefinitions?.length) items.push({ label: 'Rule', target: topic.definition ? 'lesson-definition' : 'lesson-formal-definitions' });
    if (getIntuitionLabType(topic, mod)) items.push({ label: 'Model', target: 'lesson-model' });
    if (flags.hasUniversityWalkthrough) items.push({ label: 'Reasoning', target: 'lesson-reasoning' });
    if (topic.examples?.length) items.push({ label: 'Example', target: 'lesson-examples' });
    if (flags.hasSelfStudyGuide) items.push({ label: 'Method', target: 'lesson-method' });
    if (flags.hasExercises || flags.hasInteractive || flags.hasChallenges || flags.hasMultiPart) items.push({ label: 'Practice', target: 'lesson-practice' });
    items.push({ label: 'Review', target: 'lesson-review' });

    return `
      <nav class="lesson-path" aria-label="Lesson path">
        <div class="lesson-path-label">Lesson Path</div>
        <div class="lesson-path-items">
          ${items.map((item, index) => `
            <button type="button" class="lesson-path-item" onclick="MathEngine.scrollToLessonSection('${item.target}')">
              <span>${index + 1}</span>${item.label}
            </button>
          `).join('')}
        </div>
      </nav>
    `;
  }

  function scrollToLessonSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function getIntuitionLabType(topic, mod) {
    const id = `${mod.id} ${topic.id} ${topic.title}`.toLowerCase();
    if (id.includes('probability') || id.includes('random') || id.includes('counting')) return 'probability';
    if (id.includes('trig') || id.includes('circle') || id.includes('radian')) return 'unit-circle';
    if (id.includes('derivative') || id.includes('limit') || id.includes('tangent')) return 'derivative';
    if (id.includes('integral') || id.includes('area') || id.includes('volume') || id.includes('series')) return 'area';
    if (id.includes('function') || id.includes('graph') || id.includes('quadratic') || id.includes('polynomial') || id.includes('exponential') || id.includes('logarithm')) return 'function-transform';
    if (id.includes('equation') || id.includes('inequalit') || id.includes('system') || id.includes('algebra') || id.includes('expression')) return 'balance';
    if (id.includes('geometry') || id.includes('triangle') || id.includes('angle') || id.includes('line') || id.includes('vector')) return 'geometry';
    if (id.includes('set') || id.includes('logic') || id.includes('proof')) return 'logic-set';
    return null;
  }

  function getIntuitionLabCopy(type) {
    const copy = {
      'function-transform': {
        title: 'Move the Graph and Watch the Rule Change',
        prompt: 'Adjust the control. The blue curve is the base graph. The green curve shows how a parameter changes shape or position.',
        label: 'Transformation amount'
      },
      'unit-circle': {
        title: 'Read Sine and Cosine as Coordinates',
        prompt: 'Move the angle around the circle. Cosine is horizontal position. Sine is vertical position.',
        label: 'Angle'
      },
      derivative: {
        title: 'Shrink the Secant Toward the Tangent',
        prompt: 'Reduce the horizontal gap. The secant line approaches the tangent line, which is the derivative at the point.',
        label: 'Gap size'
      },
      area: {
        title: 'Approximate Accumulation with Thin Pieces',
        prompt: 'Increase the number of pieces. The rectangular estimate approaches the curved area.',
        label: 'Pieces'
      },
      probability: {
        title: 'Connect Probability to Long-Run Frequency',
        prompt: 'Change the chance of success. The expected count moves with the probability.',
        label: 'Success probability'
      },
      balance: {
        title: 'Keep Both Sides Balanced',
        prompt: 'Change the candidate value. The equation is solved when both sides give the same number.',
        label: 'Candidate value'
      },
      geometry: {
        title: 'Measure the Shape, Then State the Rule',
        prompt: 'Change one measurement. The diagram updates while the invariant remains visible.',
        label: 'Measurement'
      },
      'logic-set': {
        title: 'Track Membership and Overlap',
        prompt: 'Change the overlap. The shaded count shows why set and logic rules depend on precise categories.',
        label: 'Overlap'
      }
    };
    return copy[type] || null;
  }

  function renderIntuitionLab(topic, mod) {
    const type = getIntuitionLabType(topic, mod);
    const copy = getIntuitionLabCopy(type);
    if (!copy) return '';
    const labId = `lab-${topic.id}`.replace(/[^a-zA-Z0-9_-]/g, '-');
    const sliderConfig = getLabSliderConfig(type);
    const midValue = Number(((sliderConfig.min + sliderConfig.max) / 2).toFixed(2));

    return `
      <div class="phase-section intuition-lab-section" id="lesson-model" data-lab-id="${labId}" data-lab-type="${type}">
        <div class="phase-label model">Model</div>
        <h3>${copy.title}</h3>
        <p class="topic-description">${copy.prompt}</p>
        <div class="intuition-lab">
          <div class="intuition-lab-visual" id="${labId}-visual" aria-live="polite"></div>
          <div class="intuition-lab-controls">
            <label class="intuition-slider-label" for="${labId}-slider">
              <span class="intuition-control-head">
                <span>${copy.label}</span>
                <output class="intuition-lab-value" id="${labId}-value" for="${labId}-slider">${formatLabValue(type, sliderConfig.value)}</output>
              </span>
              <span class="intuition-number-bar">
                <input id="${labId}-slider" type="range" min="${sliderConfig.min}" max="${sliderConfig.max}" step="${sliderConfig.step}" value="${sliderConfig.value}"
                  oninput="MathEngine.updateIntuitionLab('${labId}', '${type}', Number(this.value))">
                <span class="intuition-number-scale" aria-hidden="true">
                  <span>${formatLabBound(type, sliderConfig.min)}</span>
                  <span>${formatLabBound(type, midValue)}</span>
                  <span>${formatLabBound(type, sliderConfig.max)}</span>
                </span>
              </span>
            </label>
            <div class="intuition-lab-readout" id="${labId}-readout"></div>
          </div>
        </div>
      </div>
    `;
  }

  function getLabSliderConfig(type) {
    const configs = {
      'function-transform': { min: -4, max: 4, step: 1, value: 1 },
      'unit-circle': { min: 0, max: 360, step: 5, value: 45 },
      derivative: { min: 0.2, max: 3, step: 0.1, value: 2 },
      area: { min: 4, max: 32, step: 1, value: 8 },
      probability: { min: 0.1, max: 0.9, step: 0.05, value: 0.5 },
      balance: { min: -2, max: 8, step: 0.5, value: 2 },
      geometry: { min: 25, max: 115, step: 5, value: 60 },
      'logic-set': { min: 0, max: 8, step: 1, value: 3 }
    };
    return configs[type] || { min: 0, max: 10, step: 1, value: 5 };
  }

  function formatLabValue(type, value) {
    if (type === 'unit-circle' || type === 'geometry') return `${Math.round(value)} deg`;
    if (type === 'probability') return value.toFixed(2);
    if (type === 'derivative') return `h = ${value.toFixed(1)}`;
    if (type === 'area') return `${Math.round(value)} pieces`;
    if (type === 'balance') return `x = ${value.toFixed(1)}`;
    if (type === 'logic-set') return `${Math.round(value)} shared`;
    return value > 0 ? `+${value}` : String(value);
  }

  function formatLabBound(type, value) {
    if (type === 'unit-circle' || type === 'geometry') return `${Math.round(value)} deg`;
    if (type === 'probability') return value.toFixed(1);
    if (type === 'derivative') return value.toFixed(1);
    if (type === 'area' || type === 'logic-set') return String(Math.round(value));
    return String(value);
  }

  function initializeIntuitionLabs() {
    document.querySelectorAll('.intuition-lab-section').forEach(section => {
      const labId = section.dataset.labId;
      const type = section.dataset.labType;
      const slider = document.getElementById(`${labId}-slider`);
      if (labId && type && slider) updateIntuitionLab(labId, type, Number(slider.value));
    });
  }

  function updateIntuitionLab(labId, type, value) {
    const visual = document.getElementById(`${labId}-visual`);
    const readout = document.getElementById(`${labId}-readout`);
    if (!visual || !readout) return;
    const slider = document.getElementById(`${labId}-slider`);
    const valueOutput = document.getElementById(`${labId}-value`);

    const renderers = {
      'function-transform': renderFunctionTransformLab,
      'unit-circle': renderUnitCircleLab,
      derivative: renderDerivativeLab,
      area: renderAreaLab,
      probability: renderProbabilityLab,
      balance: renderBalanceLab,
      geometry: renderGeometryLab,
      'logic-set': renderLogicSetLab
    };
    const result = renderers[type] ? renderers[type](value) : null;
    if (!result) return;
    const sliderConfig = getLabSliderConfig(type);
    const progress = ((value - sliderConfig.min) / (sliderConfig.max - sliderConfig.min)) * 100;
    if (slider) slider.style.setProperty('--range-progress', `${Math.max(0, Math.min(100, progress))}%`);
    if (valueOutput) valueOutput.textContent = formatLabValue(type, value);
    visual.innerHTML = result.svg;
    readout.innerHTML = result.readout;
    resetMathFlags();
    renderAllMath();
  }

  function plotPath(fn, xMin, xMax, yMin, yMax, width, height, pad) {
    let d = '';
    let started = false;
    for (let i = 0; i <= 120; i++) {
      const x = xMin + (i / 120) * (xMax - xMin);
      const y = fn(x);
      if (!Number.isFinite(y)) {
        started = false;
        continue;
      }
      const sx = pad + ((x - xMin) / (xMax - xMin)) * (width - 2 * pad);
      const sy = pad + ((yMax - y) / (yMax - yMin)) * (height - 2 * pad);
      d += `${started ? 'L' : 'M'} ${sx.toFixed(1)} ${sy.toFixed(1)} `;
      started = true;
    }
    return d.trim();
  }

  function renderFunctionTransformLab(value) {
    const width = 620;
    const height = 320;
    const pad = 42;
    const base = plotPath(x => 0.35 * x * x - 1.2, -5, 5, -4, 7, width, height, pad);
    const moved = plotPath(x => 0.35 * (x - value) * (x - value) - 1.2 + value * 0.35, -5, 5, -4, 7, width, height, pad);
    const xAxis = pad + (7 / 11) * (height - 2 * pad);
    const yAxis = pad + ((0 + 5) / 10) * (width - 2 * pad);
    return {
      svg: `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Function transformation graph">
        <rect width="${width}" height="${height}" rx="8" fill="#111827"/>
        <line x1="${pad}" y1="${xAxis}" x2="${width - pad}" y2="${xAxis}" stroke="#64748b"/>
        <line x1="${yAxis}" y1="${pad}" x2="${yAxis}" y2="${height - pad}" stroke="#64748b"/>
        <path d="${base}" fill="none" stroke="#3b82f6" stroke-width="3"/>
        <path d="${moved}" fill="none" stroke="#10b981" stroke-width="3"/>
        <text x="48" y="30" fill="#cbd5e1" font-size="13">Base: f(x)</text>
        <text x="190" y="30" fill="#cbd5e1" font-size="13">Changed: f(x - ${value}) ${value >= 0 ? '+' : '-'} ${Math.abs(value * 0.35).toFixed(1)}</text>
        <text x="48" y="286" fill="#94a3b8" font-size="12">Inside input changes move the graph horizontally.</text>
        <text x="48" y="304" fill="#94a3b8" font-size="12">Outside output changes move it vertically.</text>
      </svg>`,
      readout: `Parameter value: <strong>${value}</strong>. The green graph shifts because the input and output rules changed.`
    };
  }

  function renderUnitCircleLab(value) {
    const angle = value * Math.PI / 180;
    const cx = 160, cy = 160, r = 105;
    const px = cx + r * Math.cos(angle);
    const py = cy - r * Math.sin(angle);
    const sin = Math.sin(angle).toFixed(2);
    const cos = Math.cos(angle).toFixed(2);
    return {
      svg: `<svg viewBox="0 0 520 320" role="img" aria-label="Unit circle with moving angle">
        <rect width="520" height="320" rx="8" fill="#111827"/>
        <line x1="40" y1="${cy}" x2="280" y2="${cy}" stroke="#64748b"/>
        <line x1="${cx}" y1="40" x2="${cx}" y2="280" stroke="#64748b"/>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
        <line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="#10b981" stroke-width="3"/>
        <line x1="${px}" y1="${py}" x2="${px}" y2="${cy}" stroke="#ef4444" stroke-dasharray="5 5"/>
        <line x1="${cx}" y1="${cy}" x2="${px}" y2="${cy}" stroke="#f59e0b" stroke-dasharray="5 5"/>
        <circle cx="${px}" cy="${py}" r="6" fill="#10b981"/>
        <text x="320" y="88" fill="#e2e8f0" font-size="15">Angle: ${value} degrees</text>
        <text x="320" y="126" fill="#f59e0b" font-size="15">cos(theta) = ${cos}</text>
        <text x="320" y="164" fill="#ef4444" font-size="15">sin(theta) = ${sin}</text>
        <text x="320" y="216" fill="#94a3b8" font-size="12">The point is (cos theta, sin theta).</text>
      </svg>`,
      readout: `$\\theta = ${value}^\\circ$. The point is approximately $(${cos}, ${sin})$.`
    };
  }

  function renderDerivativeLab(value) {
    const width = 620;
    const height = 320;
    const pad = 42;
    const f = x => 0.5 * x * x;
    const path = plotPath(f, -3, 4, -1, 8, width, height, pad);
    const toX = x => pad + ((x + 3) / 7) * (width - 2 * pad);
    const toY = y => pad + ((8 - y) / 9) * (height - 2 * pad);
    const a = 1;
    const b = a + value;
    const slope = (f(b) - f(a)) / (b - a);
    const lineY1 = f(a) + slope * (-3 - a);
    const lineY2 = f(a) + slope * (4 - a);
    return {
      svg: `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Secant line approaching tangent line">
        <rect width="${width}" height="${height}" rx="8" fill="#111827"/>
        <line x1="${pad}" y1="${toY(0)}" x2="${width - pad}" y2="${toY(0)}" stroke="#64748b"/>
        <line x1="${toX(0)}" y1="${pad}" x2="${toX(0)}" y2="${height - pad}" stroke="#64748b"/>
        <path d="${path}" fill="none" stroke="#3b82f6" stroke-width="3"/>
        <line x1="${toX(-3)}" y1="${toY(lineY1)}" x2="${toX(4)}" y2="${toY(lineY2)}" stroke="#10b981" stroke-width="2.5"/>
        <circle cx="${toX(a)}" cy="${toY(f(a))}" r="5" fill="#f59e0b"/>
        <circle cx="${toX(b)}" cy="${toY(f(b))}" r="5" fill="#10b981"/>
        <text x="48" y="30" fill="#cbd5e1" font-size="13">f(x) = x^2 / 2</text>
        <text x="48" y="292" fill="#94a3b8" font-size="12">As the gap shrinks, the average rate of change becomes instantaneous rate of change.</text>
      </svg>`,
      readout: `Gap $h = ${value.toFixed(1)}$. Secant slope $\\approx ${slope.toFixed(2)}$.`
    };
  }

  function renderAreaLab(value) {
    const n = Math.round(value);
    const width = 620;
    const height = 320;
    const pad = 42;
    const f = x => 0.25 + 0.7 * x * x;
    const toX = x => pad + (x / 3) * (width - 2 * pad);
    const toY = y => pad + ((7 - y) / 7) * (height - 2 * pad);
    const path = plotPath(f, 0, 3, 0, 7, width, height, pad);
    let rects = '';
    let estimate = 0;
    const dx = 3 / n;
    for (let i = 0; i < n; i++) {
      const x = i * dx;
      const h = f(x + dx);
      estimate += h * dx;
      rects += `<rect x="${toX(x)}" y="${toY(h)}" width="${Math.max(1, toX(x + dx) - toX(x) - 1)}" height="${toY(0) - toY(h)}" fill="rgba(16,185,129,0.28)" stroke="#10b981" stroke-width="0.5"/>`;
    }
    return {
      svg: `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Area approximation using rectangles">
        <rect width="${width}" height="${height}" rx="8" fill="#111827"/>
        <line x1="${pad}" y1="${toY(0)}" x2="${width - pad}" y2="${toY(0)}" stroke="#64748b"/>
        <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" stroke="#64748b"/>
        ${rects}
        <path d="${path}" fill="none" stroke="#3b82f6" stroke-width="3"/>
        <text x="48" y="30" fill="#cbd5e1" font-size="13">Accumulation</text>
        <text x="48" y="286" fill="#94a3b8" font-size="12">More pieces improve the estimate.</text>
        <text x="48" y="304" fill="#94a3b8" font-size="12">Each rectangle covers less changing height.</text>
      </svg>`,
      readout: `${n} pieces. Estimated area $\\approx ${estimate.toFixed(2)}$.`
    };
  }

  function renderProbabilityLab(value) {
    const p = value;
    const expected = 10 * p;
    let bars = '';
    for (let i = 0; i < 10; i++) {
      const filled = i < Math.round(expected);
      bars += `<rect x="${55 + i * 42}" y="${filled ? 100 : 145}" width="28" height="${filled ? 92 : 47}" rx="4" fill="${filled ? '#10b981' : '#334155'}"/>`;
    }
    return {
      svg: `<svg viewBox="0 0 520 260" role="img" aria-label="Probability expected count model">
        <rect width="520" height="260" rx="8" fill="#111827"/>
        <line x1="40" y1="192" x2="480" y2="192" stroke="#64748b"/>
        ${bars}
        <text x="50" y="42" fill="#e2e8f0" font-size="14">Ten repeated trials</text>
        <text x="50" y="66" fill="#94a3b8" font-size="12">Expected successes = trials times probability</text>
        <text x="50" y="230" fill="#10b981" font-size="13">E[X] = 10 * ${p.toFixed(2)} = ${expected.toFixed(1)}</text>
      </svg>`,
      readout: `Success probability $p = ${p.toFixed(2)}$. Expected successes in 10 trials: ${expected.toFixed(1)}.`
    };
  }

  function renderBalanceLab(value) {
    const x = value;
    const left = 2 * x + 3;
    const right = 11;
    const diff = left - right;
    const tilt = Math.max(-12, Math.min(12, diff * 2));
    return {
      svg: `<svg viewBox="0 0 560 280" role="img" aria-label="Equation balance model">
        <rect width="560" height="280" rx="8" fill="#111827"/>
        <line x1="280" y1="70" x2="280" y2="220" stroke="#94a3b8" stroke-width="5"/>
        <line x1="120" y1="${145 + tilt}" x2="440" y2="${145 - tilt}" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <rect x="72" y="${158 + tilt}" width="120" height="44" rx="6" fill="#1e293b" stroke="#10b981"/>
        <rect x="368" y="${158 - tilt}" width="120" height="44" rx="6" fill="#1e293b" stroke="#f59e0b"/>
        <text x="132" y="${185 + tilt}" fill="#e2e8f0" font-size="16" text-anchor="middle">2x + 3 = ${left.toFixed(1)}</text>
        <text x="428" y="${185 - tilt}" fill="#e2e8f0" font-size="16" text-anchor="middle">11</text>
        <text x="42" y="36" fill="#94a3b8" font-size="13">Both sides balance</text>
        <text x="42" y="54" fill="#94a3b8" font-size="13">when the values match.</text>
      </svg>`,
      readout: `Candidate $x = ${x.toFixed(1)}$. Left side $= ${left.toFixed(1)}$, right side $= 11$. Difference $= ${diff.toFixed(1)}$.`
    };
  }

  function renderGeometryLab(value) {
    const a = value;
    const b = 50;
    const c = 180 - a - b;
    return {
      svg: `<svg viewBox="0 0 560 300" role="img" aria-label="Triangle angle sum model">
        <rect width="560" height="300" rx="8" fill="#111827"/>
        <polygon points="120,235 440,235 ${170 + a * 1.6},65" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" stroke-width="3"/>
        <circle cx="120" cy="235" r="28" fill="none" stroke="#10b981" stroke-width="2"/>
        <circle cx="440" cy="235" r="28" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="${170 + a * 1.6}" cy="65" r="28" fill="none" stroke="#ef4444" stroke-width="2"/>
        <text x="118" y="218" fill="#10b981" font-size="14" text-anchor="middle">${a} deg</text>
        <text x="438" y="218" fill="#f59e0b" font-size="14" text-anchor="middle">${b} deg</text>
        <text x="${170 + a * 1.6 + 42}" y="70" fill="#ef4444" font-size="14">${c} deg</text>
      </svg>`,
      readout: `Angles: ${a} degrees, ${b} degrees, ${c} degrees. Sum $= 180^\\circ$.`
    };
  }

  function renderLogicSetLab(value) {
    const overlap = Math.round(value);
    const onlyA = 8 - overlap;
    const onlyB = 6 - Math.min(overlap, 6);
    const union = onlyA + onlyB + overlap;
    return {
      svg: `<svg viewBox="0 0 560 280" role="img" aria-label="Venn diagram overlap model">
        <rect width="560" height="280" rx="8" fill="#111827"/>
        <circle cx="235" cy="140" r="92" fill="rgba(59,130,246,0.22)" stroke="#3b82f6" stroke-width="3"/>
        <circle cx="325" cy="140" r="92" fill="rgba(16,185,129,0.22)" stroke="#10b981" stroke-width="3"/>
        <text x="190" y="142" fill="#e2e8f0" font-size="16" text-anchor="middle">${onlyA}</text>
        <text x="280" y="142" fill="#e2e8f0" font-size="16" text-anchor="middle">${overlap}</text>
        <text x="370" y="142" fill="#e2e8f0" font-size="16" text-anchor="middle">${onlyB}</text>
        <text x="190" y="238" fill="#93c5fd" font-size="13" text-anchor="middle">A only</text>
        <text x="280" y="238" fill="#cbd5e1" font-size="13" text-anchor="middle">A and B</text>
        <text x="370" y="238" fill="#86efac" font-size="13" text-anchor="middle">B only</text>
      </svg>`,
      readout: `Union count $= ${onlyA} + ${overlap} + ${onlyB} = ${union}$. Overlap must be counted once.`
    };
  }

  function renderTopicReview(topic, mod, flags) {
    const practiceCount = (topic.exercises?.length || 0)
      + (topic.freeResponse?.length || 0)
      + (topic.stepBuilder?.length || 0)
      + (topic.matching?.length || 0)
      + (topic.fillBlanks?.length || 0)
      + (topic.multiPart?.length || 0);
    const checks = [
      'State the main definition without looking back.',
      'Explain why the central formula or rule works.',
      topic.examples?.length ? 'Rework one example with the solution hidden.' : 'Create one small example and solve it.',
      practiceCount ? `Solve at least ${Math.min(3, practiceCount)} practice item${Math.min(3, practiceCount) === 1 ? '' : 's'} before marking complete.` : 'Use the concept in a self-generated problem.',
      'Name one common error and how to avoid it.'
    ];

    return `
      <div class="phase-section topic-review-section" id="lesson-review">
        <div class="phase-label review">Review</div>
        <h3>Before Marking Complete</h3>
        <p class="topic-description">Completion should mean that the concept can be used without copying the worked example.</p>
        <ul class="topic-review-list">
          ${checks.map(check => `<li>${check}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  function renderBackground(topic) {
    const background = topic.background;
    const tabs = Array.isArray(background.tabs) ? background.tabs : null;

    if (!tabs || !tabs.length) {
      return `<div class="background-section">
        <div class="phase-label hook">Background</div>
        <h3>${background.title || 'Background'}</h3>
        <div class="phase-content">${background.content || ''}</div>
      </div>`;
    }

    const activeIndex = backgroundTabState[topic.id] || 0;
    let html = `<div class="background-section" data-background-topic="${topic.id}">
      <div class="phase-label hook">Background</div>
      <h3>${background.title || 'Background'}</h3>
      <div class="background-tab-list" role="tablist" aria-label="${background.title || 'Background'}">`;

    tabs.forEach((tab, index) => {
      const active = index === activeIndex;
      const tabTitle = tab.title || tab.label || `Background ${index + 1}`;
      html += `<button class="background-tab-btn${active ? ' active' : ''}" role="tab"
        aria-selected="${active ? 'true' : 'false'}"
        onclick="MathEngine.switchBackgroundTab('${topic.id}', ${index})">${tabTitle}</button>`;
    });

    html += `</div><div class="background-tab-panels">`;

    tabs.forEach((tab, index) => {
      html += `<div class="background-tab-panel${index === activeIndex ? ' active' : ''}" role="tabpanel">
        ${tab.content || ''}
      </div>`;
    });

    html += `</div></div>`;
    return html;
  }

  function getSelfStudyGuide(topic, mod) {
    const guides = window.MATH_SELF_STUDY_GUIDES || {};
    return topic.selfStudyGuide || guides[`${mod.id}:${topic.id}`] || guides[topic.id] || null;
  }

  function getUniversityWalkthrough(topic, mod) {
    const guides = window.MATH_UNIVERSITY_WALKTHROUGHS || {};
    return topic.universityWalkthrough || guides[`${mod.id}:${topic.id}`] || guides[topic.id] || null;
  }

  function renderUniversityWalkthrough(walkthrough) {
    const sections = Array.isArray(walkthrough.sections) ? walkthrough.sections : [];
    if (!sections.length) return '';

    return `
      <div class="university-section" id="lesson-reasoning">
        <div class="phase-label model">Reasoning</div>
        <h3>${walkthrough.title || 'Full Reasoning Walkthrough'}</h3>
        ${walkthrough.intro ? `<p class="topic-description">${walkthrough.intro}</p>` : ''}
        <div class="university-walkthrough">
          ${sections.map((section, index) => `
            <article class="university-card">
              <div class="university-card-number">${index + 1}</div>
              <div>
                <h4>${section.title}</h4>
                <div class="university-card-body">${section.content || ''}</div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderSelfStudyGuide(guide) {
    const cards = Array.isArray(guide.cards) ? guide.cards : [];
    if (!cards.length) return '';

    return `
      <div class="self-study-section" id="lesson-method">
        <div class="phase-label model">Method</div>
        <h3>${guide.title || 'Self-Sufficient Study Notes'}</h3>
        ${guide.intro ? `<p class="topic-description">${guide.intro}</p>` : ''}
        <div class="self-study-grid">
          ${cards.map(card => `
            <article class="self-study-card">
              <h4>${card.title}</h4>
              <div class="self-study-content">${card.content || ''}</div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function switchBackgroundTab(topicId, index) {
    backgroundTabState[topicId] = index;
    const section = document.querySelector(`.background-section[data-background-topic="${topicId}"]`);
    if (!section) return;

    section.querySelectorAll('.background-tab-btn').forEach((btn, i) => {
      const active = i === index;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    section.querySelectorAll('.background-tab-panel').forEach((panel, i) => {
      panel.classList.toggle('active', i === index);
      delete panel.dataset.mathRendered;
    });

    renderAllMath();
  }

  function renderPracticeMode(moduleId, topicId) {
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return;
    const topic = mod.topics.find(t => t.id === topicId);
    if (!topic) return;

    const content = document.getElementById('content-inner');
    let html = `
      <div class="topic-header">
        <div class="topic-module-label">Module ${mod.order}: ${mod.title}</div>
        <h2 class="topic-title">Practice: ${topic.title}</h2>
        <p class="topic-description">Focus on solving problems. All interactive exercises for this topic.</p>
      </div>
      <div class="mode-selector">
        <button class="mode-btn" onclick="MathEngine.switchMode('learn', '${moduleId}', '${topicId}')">Learn</button>
        <button class="mode-btn active" onclick="MathEngine.switchMode('practice', '${moduleId}', '${topicId}')">Practice</button>
        ${(topic.challenges || topic.multiPart) ? `<button class="mode-btn" onclick="MathEngine.switchMode('challenge', '${moduleId}', '${topicId}')">Challenge</button>` : ''}
      </div>
    `;

    if (topic.exercises) html += renderExercises(topic.exercises, moduleId, topicId);
    if (topic.freeResponse) html += ProblemEngine.renderFreeResponse(topic.freeResponse, moduleId, topicId);
    if (topic.matching) html += ProblemEngine.renderMatching(topic.matching, moduleId, topicId);
    if (topic.fillBlanks) html += ProblemEngine.renderFillBlanks(topic.fillBlanks, moduleId, topicId);

    content.innerHTML = html;
    renderAllMath();
  }

  function renderChallengeMode(moduleId, topicId) {
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return;
    const topic = mod.topics.find(t => t.id === topicId);
    if (!topic) return;

    const content = document.getElementById('content-inner');
    let html = `
      <div class="topic-header">
        <div class="topic-module-label">Module ${mod.order}: ${mod.title}</div>
        <h2 class="topic-title">Challenge: ${topic.title}</h2>
        <p class="topic-description">Multi-step problems that test deep understanding.</p>
      </div>
      <div class="mode-selector">
        <button class="mode-btn" onclick="MathEngine.switchMode('learn', '${moduleId}', '${topicId}')">Learn</button>
        <button class="mode-btn" onclick="MathEngine.switchMode('practice', '${moduleId}', '${topicId}')">Practice</button>
        <button class="mode-btn active" onclick="MathEngine.switchMode('challenge', '${moduleId}', '${topicId}')">Challenge</button>
      </div>
    `;

    if (topic.stepBuilder) html += ProblemEngine.renderStepBuilder(topic.stepBuilder, moduleId, topicId);
    if (topic.multiPart) html += ProblemEngine.renderMultiPart(topic.multiPart, moduleId, topicId);

    content.innerHTML = html;
    renderAllMath();
  }

  /* ---- Flash Cards ---- */
  function renderFlashCards(moduleId, topicId) {
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return;
    const topic = mod.topics.find(t => t.id === topicId);
    if (!topic || !topic.flashCards) return;

    const cards = topic.flashCards;
    const content = document.getElementById('content-inner');
    const hasExercises = topic.exercises && topic.exercises.length > 0;
    const hasChallenges = topic.challenges || topic.multiPart;

    let html = `
      <div class="topic-header">
        <div class="topic-module-label">Module ${modules.indexOf(mod) + 1}: ${mod.title}</div>
        <h2 class="topic-title">Flash Cards: ${topic.title}</h2>
        <p class="topic-description">Click a card to flip it. Try to explain the concept in your own words before revealing the answer.</p>
      </div>
      <div class="mode-selector">
        <button class="mode-btn" onclick="MathEngine.switchMode('learn', '${moduleId}', '${topicId}')">Learn</button>
        <button class="mode-btn active" onclick="MathEngine.switchMode('flashcards', '${moduleId}', '${topicId}')">Flash Cards</button>
        ${hasExercises ? `<button class="mode-btn" onclick="MathEngine.switchMode('practice', '${moduleId}', '${topicId}')">Practice</button>` : ''}
        ${hasChallenges ? `<button class="mode-btn" onclick="MathEngine.switchMode('challenge', '${moduleId}', '${topicId}')">Challenge</button>` : ''}
      </div>
      <div class="fc-progress">
        <span id="fc-score">0</span> / ${cards.length} reviewed
        <div class="fc-progress-bar"><div class="fc-progress-fill" id="fc-fill" style="width:0%"></div></div>
      </div>
      <div class="fc-grid">
    `;

    cards.forEach((card, i) => {
      const typeLabel = card.type === 'why' ? 'WHY' : card.type === 'how' ? 'HOW' : card.type === 'define' ? 'DEFINE' : 'CONCEPT';
      html += `
        <div class="fc-card" id="fc-${i}" onclick="MathEngine.flipCard(${i})">
          <div class="fc-inner">
            <div class="fc-front">
              <span class="fc-type">${typeLabel}</span>
              <p class="fc-question">${card.front}</p>
              <span class="fc-hint">Think about it, then click to reveal</span>
            </div>
            <div class="fc-back">
              <div class="fc-answer">${card.back}</div>
              <div class="fc-actions">
                <button class="fc-btn fc-again" onclick="event.stopPropagation(); MathEngine.rateCard(${i}, false)">Review Again</button>
                <button class="fc-btn fc-got" onclick="event.stopPropagation(); MathEngine.rateCard(${i}, true)">Got It </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    html += '</div>';
    content.innerHTML = html;
    renderAllMath();
  }

  let fcReviewed = new Set();
  function flipCard(index) {
    const card = document.getElementById('fc-' + index);
    if (card) card.classList.toggle('flipped');
  }
  function rateCard(index, gotIt) {
    const card = document.getElementById('fc-' + index);
    if (!card) return;
    if (gotIt) {
      card.classList.add('fc-done');
      card.classList.remove('flipped');
    } else {
      card.classList.remove('flipped');
      card.classList.add('fc-shake');
      setTimeout(() => card.classList.remove('fc-shake'), 500);
    }
    fcReviewed.add(index);
    const score = document.getElementById('fc-score');
    const fill = document.getElementById('fc-fill');
    if (score) score.textContent = fcReviewed.size;
    const total = document.querySelectorAll('.fc-card').length;
    if (fill) fill.style.width = (fcReviewed.size / total * 100) + '%';
  }

  /* ---- Phase Renderer ---- */
  function renderPhase(type, title, label, content) {
    let bodyHtml = '';
    if (typeof content === 'string') {
      bodyHtml = content;
    } else if (typeof content === 'object' && content.html) {
      bodyHtml = content.html;
    }
    return `
      <div class="phase-section" id="lesson-${type}">
        <div class="phase-label ${type}">${label}</div>
        <h3>${title}</h3>
        <div class="phase-content">${bodyHtml}</div>
      </div>
    `;
  }

  /* ---- Prerequisites Recap Renderer ---- */
  function renderPrereqRecap(prereqs) {
    let html = `
      <div class="prereq-recap">
        <div class="prereq-header" onclick="this.parentElement.classList.toggle('collapsed')">
          <span class="prereq-icon"></span>
          <span>Key Definitions Used in This Topic</span>
          <span class="prereq-note">(click any to expand)</span>
          <span class="prereq-toggle" aria-hidden="true"></span>
        </div>
        <div class="prereq-list">
    `;
    prereqs.forEach(p => {
      html += `
        <details class="prereq-item">
          <summary class="prereq-term"><strong>${p.term}</strong></summary>
          <div class="prereq-definition">${p.definition}</div>
        </details>
      `;
    });
    html += '</div></div>';
    return html;
  }

  /* ---- Why-Box Renderer ---- */
  function toggleWhyBox(el) {
    el.parentElement.classList.toggle('open');
    setTimeout(renderAllMath, 50);
  }

  /* ---- Examples Renderer ---- */
  function renderExamples(examples) {
    let html = `
      <div class="phase-section" id="lesson-examples">
        <div class="phase-label example">Worked Examples</div>
        <h3>Step-by-Step Examples</h3>
        <div class="phase-content">
    `;

    examples.forEach((ex, exIdx) => {
      html += `<div class="callout callout-key"><h4>Example ${exIdx + 1}: ${ex.title}</h4><p>${ex.problem}</p></div>`;
      html += '<div class="steps-container">';
      ex.steps.forEach((step, sIdx) => {
        html += `
          <div class="step" data-step="${exIdx}-${sIdx}">
            <div class="step-header" onclick="MathEngine.toggleStep(this)">
              <span class="step-number">${sIdx + 1}</span>
              <span class="step-title">${step.title}</span>
              <span class="step-toggle" aria-hidden="true"></span>
            </div>
            <div class="step-body">
              <div class="step-content">
                ${step.content}
                ${step.why ? `<div class="step-why">Reason: ${step.why}</div>` : ''}
              </div>
            </div>
          </div>
        `;
      });
      html += '</div>';
      html += `<button class="reveal-all-btn" onclick="MathEngine.revealAllSteps(this)">Reveal All Steps</button>`;
    });

    html += '</div></div>';
    return html;
  }

  /* ---- Exercises Renderer (MCQ) ---- */
  function renderExercises(exercises, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label practice">Interactive Practice</div>
        <h3>Practice Problems</h3>
        <div class="phase-content">
    `;

    exercises.forEach((ex, idx) => {
      const exId = `ex-${topicId}-${idx}`;
      const diffClass = ex.difficulty || 'medium';
      html += `
        <div class="exercise-card" id="${exId}">
          <div class="exercise-header">
            <span class="exercise-badge ${diffClass}">${diffClass}</span>
            <span class="exercise-number">Problem ${idx + 1}</span>
          </div>
          <div class="exercise-question">${ex.question}</div>
          <div class="exercise-options" id="${exId}-options">
      `;

      const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
      ex.options.forEach((opt, oIdx) => {
        html += `
          <button class="option-btn" data-exercise="${exId}" data-index="${oIdx}" data-correct="${oIdx === ex.correctIndex}" onclick="MathEngine.checkAnswer(this, ${oIdx}, ${ex.correctIndex}, '${exId}')">
            <span class="option-letter">${letters[oIdx]}</span>
            <span>${opt}</span>
          </button>
        `;
      });

      html += '</div>';

      if (ex.hint) {
        html += `
          <button class="hint-btn" onclick="MathEngine.showHint('${exId}')">Need a hint?</button>
          <div class="hint-content" id="${exId}-hint">
            <div class="hint-label">Hint</div>
            ${ex.hint}
          </div>
        `;
      }

      /* Full Solution button - always present, reveals detailed steps */
      const solutionHtml = buildSolutionHtml(ex);
      html += `
          <button class="hint-btn solution-btn" onclick="MathEngine.showSolution('${exId}')" style="margin-top:6px;">Show Full Solution</button>
          <div class="hint-content solution-content" id="${exId}-solution">
            <div class="hint-label" style="background:var(--primary);color:#fff;">Full Solution</div>
            ${solutionHtml}
          </div>
      `;

      html += `
          <div class="exercise-feedback correct-feedback" id="${exId}-correct">
            <h4>Correct</h4>
            <div>${buildCorrectFeedbackHtml(ex)}</div>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${exId}-incorrect">
            <h4>Not quite</h4>
            <p id="${exId}-incorrect-text"></p>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  /* ---- Build step-by-step solution HTML from exercise data ---- */
  function getExerciseSolutionSteps(ex) {
    if (Array.isArray(ex.solution)) return ex.solution;
    if (ex.solution && Array.isArray(ex.solution.steps)) return ex.solution.steps;
    return [];
  }

  function buildCorrectFeedbackHtml(ex) {
    if (ex.correctExplanation) return ex.correctExplanation;
    if (ex.explanation) return ex.explanation;

    const steps = getExerciseSolutionSteps(ex);
    if (steps.length) {
      return `<ol class="solution-steps">${steps.map(step => `<li>${step}</li>`).join('')}</ol>`;
    }

    return 'The selected answer satisfies the stated condition.';
  }

  function buildSolutionHtml(ex) {
    let h = '';
    const solutionSteps = getExerciseSolutionSteps(ex);
    if (solutionSteps.length > 0) {
      /* Structured steps provided */
      solutionSteps.forEach((step, i) => {
        h += `<div class="solution-step"><strong>Step ${i+1}:</strong> ${step}</div>`;
      });
    } else if (ex.correctExplanation) {
      /* Fallback: use the full explanation */
      h += `<div class="solution-step">${ex.correctExplanation}</div>`;
    }
    if (ex.options && ex.correctIndex !== undefined) {
      h += `<div class="solution-step" style="margin-top:8px;"><strong>Answer:</strong> ${ex.options[ex.correctIndex]}</div>`;
    }
    return h;
  }

  /* ---- Show Solution Toggle ---- */
  function showSolution(exId) {
    const el = document.getElementById(`${exId}-solution`);
    if (el) {
      el.classList.toggle('show');
      setTimeout(renderAllMath, 50);
    }
  }

  /* ============================================================
     EXERCISE INTERACTIONS
     ============================================================ */
  function checkAnswer(btn, selectedIdx, correctIdx, exId) {
    const optionsContainer = document.getElementById(`${exId}-options`);
    const buttons = optionsContainer.querySelectorAll('.option-btn');

    if (btn.classList.contains('disabled')) return;
    buttons.forEach(b => b.classList.add('disabled'));

    // Determine difficulty from the exercise badge
    const card = document.getElementById(exId);
    const badge = card?.querySelector('.exercise-badge');
    const difficulty = badge?.textContent?.trim() || 'medium';

    // Extract topicId from exId
    const parts = exId.split('-');
    const topicId = parts.slice(1, -1).join('-');

    if (selectedIdx === correctIdx) {
      btn.classList.add('correct');
      document.getElementById(`${exId}-correct`).classList.add('show');
      const result = GameState.recordCorrectAnswer(difficulty, 'mcq', topicId);
      GameState.showXPGain(result.xpGained);
    } else {
      btn.classList.add('incorrect');
      buttons[correctIdx].classList.add('correct');
      const exercise = findExerciseData(exId);
      const incorrectText = document.getElementById(`${exId}-incorrect-text`);
      if (exercise && exercise.wrongExplanations && exercise.wrongExplanations[selectedIdx]) {
        incorrectText.innerHTML = exercise.wrongExplanations[selectedIdx];
      } else if (exercise && exercise.incorrectExplanation) {
        incorrectText.innerHTML = exercise.incorrectExplanation;
      } else {
        incorrectText.innerHTML = 'Review the worked examples above and try to identify where your reasoning diverged.';
      }
      document.getElementById(`${exId}-incorrect`).classList.add('show');
      GameState.recordWrongAnswer();
    }

    setTimeout(renderAllMath, 50);
  }

  function findExerciseData(exId) {
    const parts = exId.split('-');
    const idx = parseInt(parts[parts.length - 1]);
    const topicId = parts.slice(1, -1).join('-');
    for (const mod of modules) {
      const topic = mod.topics.find(t => t.id === topicId);
      if (topic && topic.exercises && topic.exercises[idx]) {
        return topic.exercises[idx];
      }
    }
    return null;
  }

  function showHint(exId) {
    const hint = document.getElementById(`${exId}-hint`);
    if (hint) {
      hint.classList.toggle('show');
      setTimeout(renderAllMath, 50);
    }
  }

  /* ============================================================
     STEP-BY-STEP INTERACTIONS
     ============================================================ */
  function toggleStep(headerEl) {
    const step = headerEl.parentElement;
    step.classList.toggle('revealed');
    setTimeout(renderAllMath, 50);
  }

  function revealAllSteps(btn) {
    const container = btn.previousElementSibling;
    if (container) {
      container.querySelectorAll('.step').forEach(s => s.classList.add('revealed'));
      setTimeout(renderAllMath, 50);
    }
  }

  /* ============================================================
     INTERACTIVE GRAPH EXPLORER (Desmos)
     ============================================================ */
  function renderGraphExplorer(expressions, title) {
    const containerId = 'desmos-' + Math.random().toString(36).substr(2, 8);
    let html = `
      <div class="graph-explorer">
        <div class="graph-explorer-header">
          <h4>${title || 'Interactive Graph Explorer'}</h4>
          <p class="graph-explorer-hint">Type equations below or modify the preloaded ones. Watch the graph update in real time.</p>
        </div>
        <div class="graph-explorer-container" id="${containerId}" style="width:100%;height:400px;border-radius:8px;overflow:hidden;"></div>
      </div>
    `;

    setTimeout(() => {
      const el = document.getElementById(containerId);
      if (el && typeof Desmos !== 'undefined') {
        const calc = Desmos.GraphingCalculator(el, {
          expressions: true,
          settingsMenu: false,
          zoomButtons: true,
          expressionsTopbar: false,
          border: false,
          keypad: false,
          fontSize: 14
        });
        if (expressions && expressions.length) {
          expressions.forEach((expr, i) => {
            calc.setExpression({
              id: 'expr' + i,
              latex: expr.latex,
              color: expr.color || Desmos.Colors[Object.keys(Desmos.Colors)[i % 6]]
            });
          });
        }
      }
    }, 100);

    return html;
  }

  /* ============================================================
     KATEX MATH RENDERING
     ============================================================ */
  function normalizeTexForKatex(tex) {
    return tex
      .replace(/&amp;lt;/g, '\\lt ')
      .replace(/&amp;gt;/g, '\\gt ')
      .replace(/&lt;/g, '\\lt ')
      .replace(/&gt;/g, '\\gt ');
  }

  function renderAllMath() {
    /* Guard: if KaTeX not loaded yet, retry */
    if (typeof katex === 'undefined') {
      setTimeout(renderAllMath, 200);
      return;
    }
    /* Universal selector: catch every container that could hold $...$ math */
    document.querySelectorAll('.math-block, .phase-content, .step-content, .step-why, .exercise-question, .option-btn, .exercise-feedback, .hint-content, .callout, .prereq-term, .prereq-definition, .why-box-body, .topic-description, .free-response-card, .problem-setup, .fb-expression, .matching-grid, .mp-part-question, .mp-part-feedback, .drill-question, .sb-step-btn, .sb-placed-step, .drill-results, .match-item, .fc-back, .fc-front, .flash-card, .concept-text, .why-content, .definition-text, .example-text, #content-inner p, #content-inner li, #content-inner td, #content-inner h3, #content-inner h4, .solution-steps li, .solution-steps p, .formal-def-body, .formal-def-symbol, .mg-answer, .mg-question, .background-section p, .background-tab-panel, .balance-visual, .game-steps li, .game-prompt, .pattern-rule, .game-hint, .coming-soon-card p, .intuition-lab-readout, .topic-review-section').forEach(el => {
      if (el.dataset.mathRendered === 'true') return;
      let html = el.innerHTML;
      if (!html.includes('$')) return; /* skip elements without math */
      html = html.replace(/\$\s*\?\s*\$/g, '?');

      html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, tex) => {
        try {
          return katex.renderToString(normalizeTexForKatex(tex).trim(), { displayMode: true, throwOnError: false });
        } catch (e) {
          return match;
        }
      });

      html = html.replace(/\$([^\$]+?)\$/g, (match, tex) => {
        try {
          return katex.renderToString(normalizeTexForKatex(tex).trim(), { displayMode: false, throwOnError: false });
        } catch (e) {
          return match;
        }
      });

      el.innerHTML = html;
      el.dataset.mathRendered = 'true';
    });
  }

  function resetMathFlags() {
    document.querySelectorAll('[data-math-rendered]').forEach(el => {
      delete el.dataset.mathRendered;
    });
  }

  /* ============================================================
     TOAST NOTIFICATIONS
     ============================================================ */
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ============================================================
     GLOBAL LISTENERS
     ============================================================ */
  function setupGlobalListeners() {
    const hamburger = document.getElementById('hamburger-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (hamburger) {
      hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
      });
    }
    if (overlay) {
      overlay.addEventListener('click', () => {
        closeMobileSidebar();
      });
    }

    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) homeBtn.addEventListener('click', goHome);

    const themeToggle = document.getElementById('theme-toggle-btn');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  }

  function closeMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  }



  /* ---- Mini Games Page ---- */
  function showMiniGames() {
    const content = document.getElementById('content-inner');
    const breadcrumbs = document.getElementById('breadcrumbs');
    if (breadcrumbs) {
      breadcrumbs.innerHTML = `
        <span style="cursor:pointer" onclick="MathEngine.goHome()">Home</span>
        <span class="separator">&rsaquo;</span>
        <span class="current">Mini Games</span>
      `;
    }
    content.innerHTML = MiniGames.renderGameSection();
    renderAllMath();
  }

  /* ============================================================
     PUBLIC API
     ============================================================ */
  return {
    init,
    navigateTo,
    goHome,
    toggleStep,
    revealAllSteps,
    checkAnswer,
    showHint,
    markTopicComplete,
    showToast,
    renderAllMath,
    toggleWhyBox,
    showDrillSelector,
    showDailyChallenge,
    showAchievements,
    switchMode,
    checkDailyProblem,
    showSolution,
    flipCard,
    rateCard,
    renderGraphExplorer,
    switchBackgroundTab,
    showMiniGames,
    showProgressTools,
    closeProgressTools,
    exportProgressFile,
    openImportProgressDialog,
    importProgressFile,
    scrollToLessonSection,
    updateIntuitionLab,
    toggleTheme
  };
})();

/* Initialize on DOM ready */
document.addEventListener('DOMContentLoaded', () => {
  MathEngine.init();
});
