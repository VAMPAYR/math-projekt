/* ============================================================
   SPEED DRILL: Timed rapid-fire problem solving
   Procedurally generated problems with countdown timer
   ============================================================ */
const SpeedDrill = (() => {
  let timerInterval = null;
  let drillState = null;

  /* ---- Problem Generators by Category ---- */
  const GENERATORS = {

    /* --- Arithmetic --- */
    addition: {
      name: 'Addition',
      generate(difficulty) {
        const max = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 100 : 1000;
        const a = Math.floor(Math.random() * max) + 1;
        const b = Math.floor(Math.random() * max) + 1;
        return { question: `$${a} + ${b} = $?`, answer: a + b, display: `${a + b}` };
      }
    },
    subtraction: {
      name: 'Subtraction',
      generate(difficulty) {
        const max = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 100 : 1000;
        const a = Math.floor(Math.random() * max) + 1;
        const b = Math.floor(Math.random() * a) + 1;
        return { question: `$${a} - ${b} = $?`, answer: a - b, display: `${a - b}` };
      }
    },
    multiplication: {
      name: 'Multiplication',
      generate(difficulty) {
        const max = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 25 : 50;
        const a = Math.floor(Math.random() * max) + 2;
        const b = Math.floor(Math.random() * max) + 2;
        return { question: `$${a} \\times ${b} = $?`, answer: a * b, display: `${a * b}` };
      }
    },
    division: {
      name: 'Division',
      generate(difficulty) {
        const max = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 20 : 30;
        const b = Math.floor(Math.random() * max) + 2;
        const answer = Math.floor(Math.random() * max) + 1;
        const a = b * answer;
        return { question: `$${a} \\div ${b} = $?`, answer: answer, display: `${answer}` };
      }
    },

    /* --- Algebra --- */
    linearSolve: {
      name: 'Solve Linear Equations',
      generate(difficulty) {
        const a = Math.floor(Math.random() * 9) + 2;
        const x = Math.floor(Math.random() * 20) - 10;
        const b = a * x;
        if (difficulty === 'easy') {
          return { question: `Solve: $${a}x = ${b}$. $x =$?`, answer: x, display: `${x}` };
        }
        const c = Math.floor(Math.random() * 20) - 10;
        const rhs = a * x + c;
        return { question: `Solve: $${a}x + ${c} = ${rhs}$. $x =$?`, answer: x, display: `${x}` };
      }
    },

    /* --- Exponents --- */
    exponents: {
      name: 'Exponents',
      generate(difficulty) {
        if (difficulty === 'easy') {
          const base = Math.floor(Math.random() * 10) + 2;
          const exp = Math.floor(Math.random() * 3) + 2;
          return { question: `$${base}^${exp} = $?`, answer: Math.pow(base, exp), display: `${Math.pow(base, exp)}` };
        }
        const base = Math.floor(Math.random() * 5) + 2;
        const exp = Math.floor(Math.random() * 4) + 2;
        return { question: `$${base}^${exp} = $?`, answer: Math.pow(base, exp), display: `${Math.pow(base, exp)}` };
      }
    },

    /* --- Factoring --- */
    factoring: {
      name: 'Factor Quadratics',
      generate(difficulty) {
        const r1 = Math.floor(Math.random() * 9) - 4;
        const r2 = Math.floor(Math.random() * 9) - 4;
        const b = -(r1 + r2);
        const c = r1 * r2;
        const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        const sorted = [r1, r2].sort((a, b) => a - b);
        // Accept format: (x-r1)(x-r2) or (x+a)(x+b)
        return {
          question: `Factor: $x^2 ${bStr}x ${cStr}$`,
          answer: `(x${r1 >= 0 ? '-' : '+'}${Math.abs(r1)})(x${r2 >= 0 ? '-' : '+'}${Math.abs(r2)})`,
          display: `$(x - ${r1})(x - ${r2})$`,
          checkFn: (input) => {
            const cleaned = input.replace(/\s+/g, '').toLowerCase();
            // Check both orderings
            const opt1 = `(x${r1>=0?'-':'+'}${Math.abs(r1)})(x${r2>=0?'-':'+'}${Math.abs(r2)})`.replace(/\s/g,'');
            const opt2 = `(x${r2>=0?'-':'+'}${Math.abs(r2)})(x${r1>=0?'-':'+'}${Math.abs(r1)})`.replace(/\s/g,'');
            return cleaned === opt1 || cleaned === opt2;
          }
        };
      }
    },

    /* --- Derivatives --- */
    derivatives: {
      name: 'Quick Derivatives',
      generate(difficulty) {
        const n = Math.floor(Math.random() * 8) + 2;
        const coeff = Math.floor(Math.random() * 5) + 1;
        const newCoeff = coeff * n;
        const newExp = n - 1;
        return {
          question: `$\\frac{d}{dx}[${coeff}x^${n}] = $?`,
          answer: `${newCoeff}x^${newExp}`,
          display: `$${newCoeff}x^{${newExp}}$`,
          checkFn: (input) => {
            const cleaned = input.replace(/\s+/g, '').toLowerCase();
            return cleaned === `${newCoeff}x^${newExp}`
              || cleaned === `${newCoeff}x^{${newExp}}`
              || cleaned === `${newCoeff}*x^${newExp}`;
          }
        };
      }
    },

    /* --- Integrals --- */
    integrals: {
      name: 'Quick Integrals',
      generate(difficulty) {
        const n = Math.floor(Math.random() * 6) + 1;
        const coeff = Math.floor(Math.random() * 4) + 1;
        const newExp = n + 1;
        const newCoeff = coeff / newExp;
        const isClean = coeff % newExp === 0;
        const display = isClean
          ? `$${coeff/newExp}x^{${newExp}} + C$`
          : `$\\frac{${coeff}}{${newExp}}x^{${newExp}} + C$`;
        return {
          question: `$\\int ${coeff}x^{${n}}\\,dx = $?`,
          answer: isClean ? `${coeff/newExp}x^${newExp}+c` : `${coeff}/${newExp}x^${newExp}+c`,
          display: display,
          checkFn: (input) => {
            const cleaned = input.replace(/\s+/g, '').toLowerCase();
            if (isClean) {
              const expected = `${coeff/newExp}x^${newExp}+c`;
              return cleaned === expected || cleaned === expected.replace('+c', '+C');
            }
            return cleaned.includes(`${coeff}/${newExp}`) && cleaned.includes(`x^${newExp}`) && cleaned.toLowerCase().includes('c');
          }
        };
      }
    },

    /* --- Unit Circle --- */
    unitCircle: {
      name: 'Unit Circle Values',
      generate(difficulty) {
        const values = [
          { angle: '0', sin: '0', cos: '1' },
          { angle: '\\frac{\\pi}{6}', sin: '\\frac{1}{2}', cos: '\\frac{\\sqrt{3}}{2}', sinNum: 0.5, cosNum: 0.866 },
          { angle: '\\frac{\\pi}{4}', sin: '\\frac{\\sqrt{2}}{2}', cos: '\\frac{\\sqrt{2}}{2}', sinNum: 0.707, cosNum: 0.707 },
          { angle: '\\frac{\\pi}{3}', sin: '\\frac{\\sqrt{3}}{2}', cos: '\\frac{1}{2}', sinNum: 0.866, cosNum: 0.5 },
          { angle: '\\frac{\\pi}{2}', sin: '1', cos: '0' },
          { angle: '\\pi', sin: '0', cos: '-1' },
        ];
        const v = values[Math.floor(Math.random() * values.length)];
        const askSin = Math.random() > 0.5;
        const fn = askSin ? 'sin' : 'cos';
        const ans = askSin ? v.sin : v.cos;
        return {
          question: `$\\${fn}(${v.angle}) = $?`,
          answer: ans,
          display: `$${ans}$`,
          checkFn: (input) => {
            const cleaned = input.replace(/\s+/g, '').toLowerCase();
            const expected = ans.replace(/\\/g, '').replace(/\s/g, '').toLowerCase();
            // Check common formats
            if (cleaned === expected) return true;
            if (cleaned === '0' && ans === '0') return true;
            if (cleaned === '1' && ans === '1') return true;
            if (cleaned === '-1' && ans === '-1') return true;
            if (cleaned === '1/2' && ans === '\\frac{1}{2}') return true;
            if (cleaned === 'sqrt(2)/2' && ans === '\\frac{\\sqrt{2}}{2}') return true;
            if (cleaned === 'sqrt(3)/2' && ans === '\\frac{\\sqrt{3}}{2}') return true;
            const num = parseFloat(cleaned);
            if (!isNaN(num)) {
              const expected = askSin ? (v.sinNum ?? parseFloat(v.sin)) : (v.cosNum ?? parseFloat(v.cos));
              return Math.abs(num - expected) < 0.01;
            }
            return false;
          }
        };
      }
    },

    /* --- Logarithms --- */
    logarithms: {
      name: 'Logarithms',
      generate(difficulty) {
        const bases = [2, 3, 5, 10];
        const base = bases[Math.floor(Math.random() * bases.length)];
        const exp = Math.floor(Math.random() * 5) + 1;
        const val = Math.pow(base, exp);
        return {
          question: `$\\log_{${base}}(${val}) = $?`,
          answer: exp,
          display: `${exp}`
        };
      }
    },
  };

  /* ---- Drill Categories ---- */
  const DRILL_CATEGORIES = {
    arithmetic: {
      name: '🔢 Arithmetic',
      desc: 'Addition, subtraction, multiplication, division',
      generators: ['addition', 'subtraction', 'multiplication', 'division']
    },
    algebra: {
      name: '📐 Algebra',
      desc: 'Solve equations, factor quadratics, exponents',
      generators: ['linearSolve', 'exponents', 'factoring']
    },
    calculus: {
      name: '📊 Calculus',
      desc: 'Quick derivatives and integrals',
      generators: ['derivatives', 'integrals']
    },
    trig: {
      name: '🔵 Trigonometry',
      desc: 'Unit circle values and identities',
      generators: ['unitCircle']
    },
    mixed: {
      name: '🎲 Mixed Bag',
      desc: 'Random problems from all categories',
      generators: ['addition', 'multiplication', 'linearSolve', 'exponents', 'derivatives', 'unitCircle', 'logarithms']
    }
  };

  /* ============================================================
     DRILL UI
     ============================================================ */
  function renderDrillSelector() {
    let html = `
      <div class="drill-selector">
        <div class="drill-header">
          <h2>⚡ Speed Drill</h2>
          <p>Race against the clock. How fast can you solve?</p>
        </div>
        <div class="drill-options">
          <div class="drill-setting">
            <label>Category:</label>
            <div class="drill-categories" id="drill-categories">
    `;

    for (const [catId, cat] of Object.entries(DRILL_CATEGORIES)) {
      html += `
        <button class="drill-cat-btn ${catId === 'arithmetic' ? 'active' : ''}"
                data-cat="${catId}" onclick="SpeedDrill.selectCategory('${catId}', this)">
          <span class="cat-icon">${cat.name.split(' ')[0]}</span>
          <span class="cat-name">${cat.name.split(' ').slice(1).join(' ')}</span>
          <span class="cat-desc">${cat.desc}</span>
        </button>
      `;
    }

    html += `
            </div>
          </div>
          <div class="drill-setting">
            <label>Difficulty:</label>
            <div class="drill-diff-btns">
              <button class="drill-diff-btn active" data-diff="easy" onclick="SpeedDrill.selectDifficulty('easy', this)">Easy</button>
              <button class="drill-diff-btn" data-diff="medium" onclick="SpeedDrill.selectDifficulty('medium', this)">Medium</button>
              <button class="drill-diff-btn" data-diff="hard" onclick="SpeedDrill.selectDifficulty('hard', this)">Hard</button>
            </div>
          </div>
          <div class="drill-setting">
            <label>Duration:</label>
            <div class="drill-diff-btns">
              <button class="drill-diff-btn" data-time="30" onclick="SpeedDrill.selectTime(30, this)">30s</button>
              <button class="drill-diff-btn active" data-time="60" onclick="SpeedDrill.selectTime(60, this)">60s</button>
              <button class="drill-diff-btn" data-time="120" onclick="SpeedDrill.selectTime(120, this)">2min</button>
              <button class="drill-diff-btn" data-time="300" onclick="SpeedDrill.selectTime(300, this)">5min</button>
            </div>
          </div>
        </div>
        <button class="drill-start-btn" onclick="SpeedDrill.startDrill()">
          🚀 Start Drill
        </button>
        <div class="drill-best-stats" id="drill-best-stats"></div>
      </div>
    `;
    return html;
  }

  let selectedCategory = 'arithmetic';
  let selectedDifficulty = 'easy';
  let selectedTime = 60;

  function selectCategory(cat, btn) {
    selectedCategory = cat;
    document.querySelectorAll('.drill-cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function selectDifficulty(diff, btn) {
    selectedDifficulty = diff;
    btn.parentElement.querySelectorAll('.drill-diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function selectTime(time, btn) {
    selectedTime = time;
    btn.parentElement.querySelectorAll('.drill-diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  /* ============================================================
     DRILL EXECUTION
     ============================================================ */
  function startDrill() {
    const cat = DRILL_CATEGORIES[selectedCategory];
    if (!cat) return;

    drillState = {
      category: selectedCategory,
      difficulty: selectedDifficulty,
      timeLimit: selectedTime,
      timeRemaining: selectedTime,
      correct: 0,
      attempted: 0,
      currentProblem: null,
      generators: cat.generators,
      active: true,
      startTime: Date.now()
    };

    renderDrillUI();
    nextProblem();
    startTimer();
  }

  function renderDrillUI() {
    const content = document.getElementById('content-inner');
    content.innerHTML = `
      <div class="drill-active">
        <div class="drill-top-bar">
          <div class="drill-timer" id="drill-timer">
            <span class="timer-icon">⏱</span>
            <span class="timer-value" id="drill-timer-value">${drillState.timeRemaining}s</span>
          </div>
          <div class="drill-score" id="drill-score">
            <span class="score-correct">✓ 0</span>
            <span class="score-separator">/</span>
            <span class="score-total">0</span>
          </div>
          <div class="drill-streak" id="drill-streak"></div>
          <button class="drill-quit-btn" onclick="SpeedDrill.endDrill()">✕ End</button>
        </div>
        <div class="drill-problem-area" id="drill-problem-area">
          <div class="drill-question" id="drill-question"></div>
          <div class="drill-input-area">
            <input type="text" class="drill-input" id="drill-input" autocomplete="off"
                   onkeydown="if(event.key==='Enter')SpeedDrill.submitDrillAnswer()" />
            <button class="drill-submit" onclick="SpeedDrill.submitDrillAnswer()">→</button>
          </div>
          <div class="drill-feedback" id="drill-feedback"></div>
        </div>
        <div class="drill-progress-bar">
          <div class="drill-progress-fill" id="drill-progress-fill" style="width: 100%"></div>
        </div>
      </div>
    `;
  }

  function nextProblem() {
    if (!drillState || !drillState.active) return;

    const genKey = drillState.generators[Math.floor(Math.random() * drillState.generators.length)];
    const generator = GENERATORS[genKey];
    if (!generator) return;

    drillState.currentProblem = generator.generate(drillState.difficulty);
    const questionEl = document.getElementById('drill-question');
    if (questionEl) {
      questionEl.innerHTML = drillState.currentProblem.question;
      setTimeout(() => MathEngine.renderAllMath(), 30);
    }

    const input = document.getElementById('drill-input');
    if (input) {
      input.value = '';
      input.focus();
      input.classList.remove('correct', 'incorrect');
    }
    document.getElementById('drill-feedback').innerHTML = '';
  }

  function submitDrillAnswer() {
    if (!drillState || !drillState.active || !drillState.currentProblem) return;

    const input = document.getElementById('drill-input');
    const userAnswer = input.value.trim();
    if (!userAnswer) return;

    drillState.attempted++;
    const prob = drillState.currentProblem;
    let isCorrect = false;

    if (prob.checkFn) {
      isCorrect = prob.checkFn(userAnswer);
    } else {
      const num = parseFloat(userAnswer);
      if (!isNaN(num) && typeof prob.answer === 'number') {
        isCorrect = Math.abs(num - prob.answer) < 0.01;
      } else {
        isCorrect = userAnswer.replace(/\s/g, '').toLowerCase() === String(prob.answer).replace(/\s/g, '').toLowerCase();
      }
    }

    const feedback = document.getElementById('drill-feedback');

    if (isCorrect) {
      drillState.correct++;
      input.classList.add('correct');
      feedback.innerHTML = `<span class="drill-correct-flash">✓</span>`;
      GameState.recordCorrectAnswer(drillState.difficulty, 'drill', null);
    } else {
      input.classList.add('incorrect');
      feedback.innerHTML = `<span class="drill-wrong-flash">✗ ${prob.display || prob.answer}</span>`;
      GameState.recordWrongAnswer();
    }

    // Update score
    document.getElementById('drill-score').innerHTML = `
      <span class="score-correct">✓ ${drillState.correct}</span>
      <span class="score-separator">/</span>
      <span class="score-total">${drillState.attempted}</span>
    `;

    // Update streak display
    const streak = GameState.getStreak();
    const streakEl = document.getElementById('drill-streak');
    if (streakEl && streak >= 3) {
      streakEl.innerHTML = `${GameState.getStreakEmoji()} ${streak}`;
    }

    setTimeout(() => {
      if (drillState && drillState.active) {
        nextProblem();
      }
    }, isCorrect ? 200 : 800);

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!drillState || !drillState.active) {
        clearInterval(timerInterval);
        return;
      }

      drillState.timeRemaining--;
      const timerVal = document.getElementById('drill-timer-value');
      if (timerVal) timerVal.textContent = `${drillState.timeRemaining}s`;

      // Update progress bar
      const fill = document.getElementById('drill-progress-fill');
      if (fill) {
        fill.style.width = `${(drillState.timeRemaining / drillState.timeLimit) * 100}%`;
        if (drillState.timeRemaining <= 10) fill.classList.add('urgent');
      }

      if (drillState.timeRemaining <= 0) {
        endDrill();
      }
    }, 1000);
  }

  function endDrill() {
    if (!drillState) return;
    drillState.active = false;
    if (timerInterval) clearInterval(timerInterval);

    const elapsed = Math.round((Date.now() - drillState.startTime) / 1000);
    const result = GameState.recordDrillComplete(drillState.correct, drillState.attempted, elapsed);
    const accuracy = drillState.attempted > 0 ? Math.round((drillState.correct / drillState.attempted) * 100) : 0;

    const content = document.getElementById('content-inner');
    content.innerHTML = `
      <div class="drill-results">
        <h2>⚡ Drill Complete!</h2>
        <div class="drill-result-cards">
          <div class="result-card">
            <div class="result-value">${drillState.correct}</div>
            <div class="result-label">Correct</div>
          </div>
          <div class="result-card">
            <div class="result-value">${drillState.attempted}</div>
            <div class="result-label">Attempted</div>
          </div>
          <div class="result-card">
            <div class="result-value">${accuracy}%</div>
            <div class="result-label">Accuracy</div>
          </div>
          <div class="result-card">
            <div class="result-value">${result.wpm}</div>
            <div class="result-label">Problems/min</div>
          </div>
        </div>
        <div class="drill-xp-earned">+${result.xp} XP earned!</div>
        <div class="drill-result-actions">
          <button class="drill-retry-btn" onclick="SpeedDrill.startDrill()">🔄 Try Again</button>
          <button class="drill-home-btn" onclick="MathEngine.goHome()">🏠 Home</button>
          <button class="drill-new-btn" onclick="MathEngine.showDrillSelector()">⚡ New Drill</button>
        </div>
      </div>
    `;
  }

  return {
    renderDrillSelector,
    selectCategory,
    selectDifficulty,
    selectTime,
    startDrill,
    submitDrillAnswer,
    endDrill,
    GENERATORS,
    DRILL_CATEGORIES
  };
})();
