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

  /* ---- Constants ---- */
  const STORAGE_KEY = 'math_hero_progress';

  /* ============================================================
     INITIALIZATION
     ============================================================ */
  function init() {
    loadProgress();
    collectModules();
    GameState.init();
    renderSidebar();
    renderWelcome();
    setupGlobalListeners();
    updateProgressBar();
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
    showToast('Topic completed!');
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
        <span class="module-chevron">▶</span>
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
          <span class="topic-status${completed ? ' completed' : ''}">${completed ? '✓' : mastery.score > 0 ? Math.round(mastery.score) + '%' : ''}</span>
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
            <h3>How to Use This Site</h3>
            <span class="guide-toggle">▼</span>
          </div>
          <div class="guide-body">
            <div class="guide-section">
              <h4>What is mathematics?</h4>
              <p>Mathematics is the study of patterns, quantities, and structures. It begins with counting objects (1, 2, 3...) and builds upward: addition combines groups, multiplication repeats addition, algebra uses letters as placeholders for unknown numbers, and calculus measures change. Every topic on this site grows from these foundations. If you can count to ten, you have everything you need to start.</p>
            </div>
            <div class="guide-section">
              <h4>You need zero prior knowledge</h4>
              <p>Module 1 starts with what a number IS and what addition MEANS. Every term is defined before it appears. Every formula explains WHY it works, not just how to use it. If a topic uses a concept from an earlier module, it recaps that concept at the top. You will never encounter an unexplained symbol or assumed knowledge.</p>
            </div>
            <div class="guide-section">
              <h4>How each topic is organized</h4>
              <ul>
                <li><strong>Why</strong> — The reason this concept was invented. What problem it solves. Why humans needed it.</li>
                <li><strong>Core Concept</strong> — The main idea, explained step by step with diagrams. Every formula includes a derivation or proof showing where it comes from.</li>
                <li><strong>Definition</strong> — The precise, formal statement. This is the reference you return to after understanding the concept.</li>
                <li><strong>Examples</strong> — Worked problems showing every step, with explanations for each decision.</li>
                <li><strong>Practice</strong> — Problems for you to solve, with hints and immediate feedback.</li>
                <li><strong>Strategy</strong> — If you get stuck, this section walks you through how to think about the problem.</li>
              </ul>
            </div>
            <div class="guide-section">
              <h4>Recommended path</h4>
              <p>Start at Module 1 and work through in order. Each module builds on the one before it. The modules are:</p>
              <ol>
                <li><strong>Foundations</strong> — Numbers, arithmetic, sets, logic, proof</li>
                <li><strong>Beginning Algebra</strong> — Variables, equations, inequalities</li>
                <li><strong>Geometry</strong> — Points, lines, angles, triangles, circles</li>
                <li><strong>Intermediate Algebra</strong> — Polynomials, factoring, rational expressions</li>
                <li><strong>Advanced Algebra</strong> — Quadratics, exponentials, logarithms</li>
                <li><strong>Precalculus</strong> — Functions, graphs, transformations</li>
                <li><strong>Trigonometry</strong> — Angles, unit circle, identities</li>
                <li><strong>Calculus 1A-1B</strong> — Limits, derivatives, applications</li>
                <li><strong>Calculus 2A-2B</strong> — Integration, series, sequences</li>
                <li><strong>Calculus 3A-3B</strong> — Vectors, multivariable functions, multiple integrals</li>
                <li><strong>Probability &amp; Statistics</strong> — Counting, distributions, data analysis</li>
              </ol>
              <p>If you already know some math, click any module to jump in. Each topic has a "Mark Complete" button so you can track your progress.</p>
            </div>
            <div class="guide-section">
              <h4>Symbols you will see</h4>
              <ul>
                <li><strong>= </strong> means "equals" (the left side has the same value as the right)</li>
                <li><strong>+ − × ÷</strong> are addition, subtraction, multiplication, division</li>
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
            <div class="stat-icon">🔥</div>
            <div class="stat-value">${streak}</div>
            <div class="stat-label">Day Streak</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✓</div>
            <div class="stat-value">${gs.totalProblemsCorrect}</div>
            <div class="stat-label">Solved</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-value">${accuracy}%</div>
            <div class="stat-label">Accuracy</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-value">${gs.bestStreak}</div>
            <div class="stat-label">Best Streak</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🧩</div>
            <div class="stat-value">${gs.modeStats?.challenge?.completed || 0}</div>
            <div class="stat-label">Challenges</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-value">${gs.modeStats?.speedDrill?.bestWpm || 0}</div>
            <div class="stat-label">Best Speed</div>
          </div>
        </div>

        <!-- Game Actions -->
        <div class="game-actions">
          <div class="game-action-btn" onclick="MathEngine.showDrillSelector()">
            <div class="action-icon">⚡</div>
            <div class="action-title">Speed Drill</div>
            <div class="action-desc">Race against the clock with rapid-fire problems</div>
          </div>
          <div class="game-action-btn" onclick="MathEngine.showDailyChallenge()">
            <div class="action-icon">📅</div>
            <div class="action-title">${dailyDone ? '✓ Daily Complete' : 'Daily Challenge'}</div>
            <div class="action-desc">${dailyDone ? 'Come back tomorrow!' : 'A fresh challenge every day'}</div>
          </div>
          <div class="game-action-btn" onclick="MathEngine.showAchievements()">
            <div class="action-icon">🏆</div>
            <div class="action-title">Achievements</div>
            <div class="action-desc">${Object.keys(gs.achievements || {}).length} / ${Object.keys(GameState.getAchievements()).length} unlocked</div>
          </div>
          <div class="game-action-btn" onclick="MathEngine.showMiniGames()">
            <div class="action-icon">🎮</div>
            <div class="action-title">Mini Games</div>
            <div class="action-desc">Equation Balance, Pattern Finder, Expression Builder</div>
          </div>
        </div>

        <!-- Module Cards -->
        <h3 style="text-align: left; margin-bottom: 16px; font-size: 20px;">📚 Modules</h3>
        <div class="module-cards">
    `;

    modules.forEach(mod => {
      const stats = getModuleStats(mod.id);
      html += `
        <div class="module-card" onclick="MathEngine.navigateTo('${mod.id}', '${mod.topics[0]?.id || ''}')">
          <div class="card-number">Module ${modules.indexOf(mod) + 1}</div>
          <h3>${mod.title}</h3>
          <p>${mod.description}</p>
          <div class="card-topics">${mod.topics.length} topics · ${stats.done}/${stats.total} completed</div>
        </div>
      `;
    });

    html += `</div>

        <!-- Coming Soon -->
        <div class="coming-soon-section">
          <h3>📋 Coming Soon</h3>
          <p>This platform is actively expanding. The following subjects are in development:</p>
          <div class="coming-soon-grid">
            <div class="coming-soon-card">
              <div class="cs-icon">📐</div>
              <h4>Linear Algebra</h4>
              <p>Vectors, matrices, eigenvalues, linear transformations, and systems of equations in higher dimensions.</p>
            </div>
            <div class="coming-soon-card">
              <div class="cs-icon">🔄</div>
              <h4>Differential Equations</h4>
              <p>Ordinary and partial differential equations. Modeling growth, decay, oscillation, and diffusion.</p>
            </div>
            <div class="coming-soon-card">
              <div class="cs-icon">🔢</div>
              <h4>Number Theory</h4>
              <p>Prime numbers, divisibility, modular arithmetic, and cryptography foundations.</p>
            </div>
            <div class="coming-soon-card">
              <div class="cs-icon">🧮</div>
              <h4>Discrete Mathematics</h4>
              <p>Logic, sets, graph theory, combinatorics, and the mathematics behind computer science.</p>
            </div>
            <div class="coming-soon-card">
              <div class="cs-icon">🔗</div>
              <h4>Abstract Algebra</h4>
              <p>Groups, rings, fields. The deep structure underlying all algebraic systems.</p>
            </div>
            <div class="coming-soon-card">
              <div class="cs-icon">📊</div>
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
    if (breadcrumbs) breadcrumbs.innerHTML = '<span style="cursor:pointer" onclick="MathEngine.goHome()">Home</span><span class="separator">›</span><span class="current">Speed Drill</span>';
    content.innerHTML = SpeedDrill.renderDrillSelector();
    setTimeout(renderAllMath, 100);
  }

  /* ============================================================
     DAILY CHALLENGE
     ============================================================ */
  function showDailyChallenge() {
    if (GameState.isDailyChallengeComplete()) {
      GameState.showGameToast('📅 Daily challenge already completed! Come back tomorrow.', '');
      return;
    }

    currentModule = null;
    currentTopic = null;
    renderSidebar();
    const content = document.getElementById('content-inner');
    const breadcrumbs = document.getElementById('breadcrumbs');
    if (breadcrumbs) breadcrumbs.innerHTML = '<span style="cursor:pointer" onclick="MathEngine.goHome()">Home</span><span class="separator">›</span><span class="current">Daily Challenge</span>';

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
          <h2>📅 Daily Challenge</h2>
          <p>5 problems from across the curriculum. Complete them all for bonus XP!</p>
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
              <button class="fr-submit-btn" onclick="MathEngine.checkDailyProblem('${exId}',${idx})">Check →</button>
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
            <h4>✓ Correct!</h4>
            <p>${prob.correctExplanation || prob.explanation || 'Well done!'}</p>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${exId}-incorrect">
            <h4>✗ Not quite</h4>
            <p id="${exId}-incorrect-text"></p>
          </div>
        </div>
      `;
    });

    html += `
        </div>
        <div class="exercise-feedback correct-feedback" id="${dcId}-complete" style="margin-top:24px;">
          <h4>🏆 Daily Challenge Complete!</h4>
          <p>+100 XP earned! Come back tomorrow for another challenge.</p>
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
    if (breadcrumbs) breadcrumbs.innerHTML = '<span style="cursor:pointer" onclick="MathEngine.goHome()">Home</span><span class="separator">›</span><span class="current">Achievements</span>';

    const all = GameState.getAchievements();
    const unlocked = GameState.getUnlockedAchievements();

    let html = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: 32px; font-weight: 800; margin-bottom: 8px;">🏆 Achievements</h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">${Object.keys(unlocked).length} / ${Object.keys(all).length} unlocked</p>
        <div class="achievement-grid">
    `;

    for (const [id, ach] of Object.entries(all)) {
      const isUnlocked = !!unlocked[id];
      html += `
        <div class="achievement-card ${isUnlocked ? 'unlocked' : ''}">
          <div class="ach-icon">${isUnlocked ? ach.icon : '🔒'}</div>
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
        <span class="separator">›</span>
        <span>${mod.title}</span>
        <span class="separator">›</span>
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

    html += `<div class="mode-selector">
      <button class="mode-btn active" onclick="MathEngine.switchMode('learn', '${moduleId}', '${topicId}')">📖 Learn</button>
      ${hasFlashCards ? `<button class="mode-btn" onclick="MathEngine.switchMode('flashcards', '${moduleId}', '${topicId}')">🃏 Flash Cards</button>` : ''}
      ${hasExercises || hasInteractive ? `<button class="mode-btn" onclick="MathEngine.switchMode('practice', '${moduleId}', '${topicId}')">🎯 Practice</button>` : ''}
      ${hasChallenges || hasMultiPart ? `<button class="mode-btn" onclick="MathEngine.switchMode('challenge', '${moduleId}', '${topicId}')">🧩 Challenge</button>` : ''}
    </div>`;

    /* Prerequisites Recap */
    if (topic.prereqRecap) html += renderPrereqRecap(topic.prereqRecap);

    /* Learning Content Phases */
    if (topic.hook) html += renderPhase('hook', 'Start Here', 'Puzzle', topic.hook);
    if (topic.whyExists) html += renderPhase('why-exists', 'Why', 'Motivation', topic.whyExists);
    if (topic.concept) html += renderPhase('concept', 'Core Concept', 'Concept', topic.concept);
    if (topic.definition) html += renderPhase('definition', 'Definition', 'Definition', topic.definition);
    if (topic.examples) html += renderExamples(topic.examples);

    /* Background: Etymology, History, "Why does this exist?" */
    if (topic.background) {
      html += `<div class="background-section">
        <div class="phase-label hook">Background</div>
        <h3>${topic.background.title || 'Background'}</h3>
        <div class="phase-content">${topic.background.content}</div>
      </div>`;
    }

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
      html += `<div class="formal-defs-section">
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
    if (topic.exercises) html += renderExercises(topic.exercises, moduleId, topicId);
    if (topic.freeResponse) html += ProblemEngine.renderFreeResponse(topic.freeResponse, moduleId, topicId);
    if (topic.stepBuilder) html += ProblemEngine.renderStepBuilder(topic.stepBuilder, moduleId, topicId);
    if (topic.matching) html += ProblemEngine.renderMatching(topic.matching, moduleId, topicId);
    if (topic.fillBlanks) html += ProblemEngine.renderFillBlanks(topic.fillBlanks, moduleId, topicId);
    if (topic.multiPart) html += ProblemEngine.renderMultiPart(topic.multiPart, moduleId, topicId);

    /* Stuck Guide */
    if (topic.stuckGuide) html += renderPhase('stuck', 'Strategy', 'Guide', topic.stuckGuide);

    /* Visualizations */
    if (topic.visualizations) {
      topic.visualizations.forEach((viz, i) => {
        html += `<div class="viz-container" id="viz-${topicId}-${i}"></div>`;
        if (viz.controls) {
          html += `<div class="viz-controls" id="viz-controls-${topicId}-${i}">${viz.controls}</div>`;
        }
      });
    }

    /* Navigation footer */
    const adj = getAdjacentTopics();
    const completed = isTopicComplete(moduleId, topicId);
    html += `
      <div class="topic-nav-footer">
        <button class="nav-btn${adj.prev ? '' : ' disabled'}" ${adj.prev ? `onclick="MathEngine.navigateTo('${adj.prev.moduleId}','${adj.prev.topicId}')"` : ''}>
          ← ${adj.prev ? adj.prev.topicTitle : 'Start'}
        </button>
        <button class="mark-complete-btn${completed ? ' completed' : ''}" onclick="MathEngine.markTopicComplete('${moduleId}','${topicId}')">
          ${completed ? '✓ Completed' : '☐ Mark Complete'}
        </button>
        <button class="nav-btn primary${adj.next ? '' : ' disabled'}" ${adj.next ? `onclick="MathEngine.navigateTo('${adj.next.moduleId}','${adj.next.topicId}')"` : ''}>
          ${adj.next ? adj.next.topicTitle : 'Finished!'} →
        </button>
      </div>
    `;

    content.innerHTML = html;
    resetMathFlags();
    renderAllMath();

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

  function renderPracticeMode(moduleId, topicId) {
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return;
    const topic = mod.topics.find(t => t.id === topicId);
    if (!topic) return;

    const content = document.getElementById('content-inner');
    let html = `
      <div class="topic-header">
        <div class="topic-module-label">Module ${mod.order}: ${mod.title}</div>
        <h2 class="topic-title">🎯 Practice: ${topic.title}</h2>
        <p class="topic-description">Focus on solving problems. All interactive exercises for this topic.</p>
      </div>
      <div class="mode-selector">
        <button class="mode-btn" onclick="MathEngine.switchMode('learn', '${moduleId}', '${topicId}')">📖 Learn</button>
        <button class="mode-btn active" onclick="MathEngine.switchMode('practice', '${moduleId}', '${topicId}')">🎯 Practice</button>
        ${(topic.challenges || topic.multiPart) ? `<button class="mode-btn" onclick="MathEngine.switchMode('challenge', '${moduleId}', '${topicId}')">🧩 Challenge</button>` : ''}
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
        <h2 class="topic-title">🧩 Challenge: ${topic.title}</h2>
        <p class="topic-description">Multi-step problems that test deep understanding.</p>
      </div>
      <div class="mode-selector">
        <button class="mode-btn" onclick="MathEngine.switchMode('learn', '${moduleId}', '${topicId}')">📖 Learn</button>
        <button class="mode-btn" onclick="MathEngine.switchMode('practice', '${moduleId}', '${topicId}')">🎯 Practice</button>
        <button class="mode-btn active" onclick="MathEngine.switchMode('challenge', '${moduleId}', '${topicId}')">🧩 Challenge</button>
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
        <button class="mode-btn" onclick="MathEngine.switchMode('learn', '${moduleId}', '${topicId}')">📖 Learn</button>
        <button class="mode-btn active" onclick="MathEngine.switchMode('flashcards', '${moduleId}', '${topicId}')">🃏 Flash Cards</button>
        ${hasExercises ? `<button class="mode-btn" onclick="MathEngine.switchMode('practice', '${moduleId}', '${topicId}')">🎯 Practice</button>` : ''}
        ${hasChallenges ? `<button class="mode-btn" onclick="MathEngine.switchMode('challenge', '${moduleId}', '${topicId}')">🧩 Challenge</button>` : ''}
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
                <button class="fc-btn fc-got" onclick="event.stopPropagation(); MathEngine.rateCard(${i}, true)">Got It ✓</button>
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
      <div class="phase-section">
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
          <span class="prereq-icon">📋</span>
          <span>Key Definitions Used in This Topic</span>
          <span class="prereq-note">(click any to expand)</span>
          <span class="prereq-toggle">▼</span>
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
      <div class="phase-section">
        <div class="phase-label example">Worked Examples</div>
        <h3>📝 Step-by-Step Examples</h3>
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
              <span class="step-toggle">▼</span>
            </div>
            <div class="step-body">
              <div class="step-content">
                ${step.content}
                ${step.why ? `<div class="step-why">Why? ${step.why}</div>` : ''}
              </div>
            </div>
          </div>
        `;
      });
      html += '</div>';
      html += `<button class="reveal-all-btn" onclick="MathEngine.revealAllSteps(this)">👁 Reveal All Steps</button>`;
    });

    html += '</div></div>';
    return html;
  }

  /* ---- Exercises Renderer (MCQ) ---- */
  function renderExercises(exercises, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label practice">Interactive Practice</div>
        <h3>🎯 Practice Problems</h3>
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
          <button class="hint-btn" onclick="MathEngine.showHint('${exId}')">💡 Need a hint?</button>
          <div class="hint-content" id="${exId}-hint">
            <div class="hint-label">Hint</div>
            ${ex.hint}
          </div>
        `;
      }

      /* Full Solution button - always present, reveals detailed steps */
      const solutionHtml = buildSolutionHtml(ex);
      html += `
          <button class="hint-btn solution-btn" onclick="MathEngine.showSolution('${exId}')" style="margin-top:6px;">📋 Show Full Solution</button>
          <div class="hint-content solution-content" id="${exId}-solution">
            <div class="hint-label" style="background:var(--primary);color:#fff;">Full Solution</div>
            ${solutionHtml}
          </div>
      `;

      html += `
          <div class="exercise-feedback correct-feedback" id="${exId}-correct">
            <h4>✓ Correct!</h4>
            <div>${ex.correctExplanation || 'Well done!'}</div>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${exId}-incorrect">
            <h4>✗ Not quite</h4>
            <p id="${exId}-incorrect-text"></p>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  /* ---- Build step-by-step solution HTML from exercise data ---- */
  function buildSolutionHtml(ex) {
    let h = '';
    if (ex.solution && ex.solution.length > 0) {
      /* Structured steps provided */
      ex.solution.forEach((step, i) => {
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
          <h4>📊 ${title || 'Interactive Graph Explorer'}</h4>
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
  function renderAllMath() {
    /* Guard: if KaTeX not loaded yet, retry */
    if (typeof katex === 'undefined') {
      setTimeout(renderAllMath, 200);
      return;
    }
    /* Universal selector: catch every container that could hold $...$ math */
    document.querySelectorAll('.math-block, .phase-content, .step-content, .step-why, .exercise-question, .option-btn, .exercise-feedback, .hint-content, .callout, .prereq-definition, .why-box-body, .topic-description, .free-response-card, .problem-setup, .fb-expression, .matching-grid, .mp-part-question, .mp-part-feedback, .drill-question, .sb-step-btn, .sb-placed-step, .drill-results, .match-item, .fc-back, .fc-front, .flash-card, .concept-text, .why-content, .definition-text, .example-text, #content-inner p, #content-inner li, #content-inner td, #content-inner h3, #content-inner h4, .solution-steps li, .solution-steps p, .formal-def-body, .formal-def-symbol, .mg-answer, .mg-question, .background-section p, .balance-visual, .game-steps li, .game-prompt, .pattern-rule, .game-hint, .coming-soon-card p').forEach(el => {
      if (el.dataset.mathRendered === 'true') return;
      let html = el.innerHTML;
      if (!html.includes('$')) return; /* skip elements without math */

      html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, tex) => {
        try {
          return katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false });
        } catch (e) {
          return match;
        }
      });

      html = html.replace(/\$([^\$]+?)\$/g, (match, tex) => {
        try {
          return katex.renderToString(tex.trim(), { displayMode: false, throwOnError: false });
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
    toast.innerHTML = `<span class="toast-icon">🏆</span> ${message}`;
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
        <span class="separator">›</span>
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
    showMiniGames
  };
})();

/* Initialize on DOM ready */
document.addEventListener('DOMContentLoaded', () => {
  MathEngine.init();
});
