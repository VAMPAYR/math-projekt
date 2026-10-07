/* ============================================================
   MINI-GAMES: Interactive learning activities
   Equation Balance, Expression Builder, Number Properties
   ============================================================ */
const MiniGames = (() => {

  function finishCard(card, input) {
    card.dataset.solved = 'true';
    input.disabled = true;
    card.querySelectorAll('.game-submit').forEach(button => { button.disabled = true; });
  }

  function numericAttempt(card, input, answer) {
    if (card.dataset.solved === 'true') return null;
    const value = String(input.value).trim();
    if (!value || card.dataset.lastAttempt === value) return null;
    // Enter followed by a click is one attempt; changing the value permits a retry.
    card.dataset.lastAttempt = value;
    return typeof ProblemEngine !== 'undefined' && ProblemEngine.checkAnswer(value, answer);
  }

  /* ---- Equation Balance Game ----
     User must balance an equation by dragging/typing the missing value */
  function equationBalance() {
    const problems = [
      { left: '3x + 2', right: '14', variable: 'x', answer: 4, steps: ['Subtract 2 from both sides: $3x = 12$', 'Divide both sides by 3: $x = 4$'] },
      { left: '2x - 5', right: '9', variable: 'x', answer: 7, steps: ['Add 5 to both sides: $2x = 14$', 'Divide both sides by 2: $x = 7$'] },
      { left: '5x + 10', right: '35', variable: 'x', answer: 5, steps: ['Subtract 10 from both sides: $5x = 25$', 'Divide both sides by 5: $x = 5$'] },
      { left: '4x - 3', right: '13', variable: 'x', answer: 4, steps: ['Add 3 to both sides: $4x = 16$', 'Divide both sides by 4: $x = 4$'] },
      { left: '7x + 1', right: '22', variable: 'x', answer: 3, steps: ['Subtract 1 from both sides: $7x = 21$', 'Divide both sides by 7: $x = 3$'] },
      { left: '6x - 8', right: '10', variable: 'x', answer: 3, steps: ['Add 8 to both sides: $6x = 18$', 'Divide both sides by 6: $x = 3$'] },
      { left: '10x + 5', right: '55', variable: 'x', answer: 5, steps: ['Subtract 5 from both sides: $10x = 50$', 'Divide both sides by 10: $x = 5$'] },
      { left: '8x - 12', right: '20', variable: 'x', answer: 4, steps: ['Add 12 to both sides: $8x = 32$', 'Divide both sides by 8: $x = 4$'] },
    ];

    const prob = problems[Math.floor(Math.random() * problems.length)];
    const gameId = 'eqbal-' + Date.now();

    return `
      <div class="mini-game equation-balance" id="${gameId}">
        <div class="game-title">Equation Balance</div>
        <div class="game-description">Find the value that balances the equation. Show your reasoning.</div>
        <div class="balance-visual">
          <div class="balance-side left">$${prob.left}$</div>
          <div class="balance-equals">=</div>
          <div class="balance-side right">$${prob.right}$</div>
        </div>
        <div class="game-input-area">
          <label>$${prob.variable} = $</label>
          <input type="number" class="game-input" id="${gameId}-input"
                 onkeydown="if(event.key==='Enter')MiniGames.checkBalance('${gameId}',${prob.answer})" />
          <button class="game-submit" onclick="MiniGames.checkBalance('${gameId}',${prob.answer})">Check</button>
        </div>
        <div class="game-feedback" id="${gameId}-feedback"></div>
        <div class="game-steps" id="${gameId}-steps" style="display:none">
          <strong>Step-by-step solution:</strong>
          <ol>${prob.steps.map(s => '<li>' + s + '</li>').join('')}</ol>
        </div>
      </div>
    `;
  }

  function checkBalance(gameId, answer) {
    const card = document.getElementById(gameId);
    const input = document.getElementById(gameId + '-input');
    const feedback = document.getElementById(gameId + '-feedback');
    const steps = document.getElementById(gameId + '-steps');
    if (!card || !input || !feedback || !steps) return;
    const correct = numericAttempt(card, input, answer);
    if (correct === null) return;

    if (correct) {
      finishCard(card, input);
      feedback.innerHTML = '<span class="game-correct">Correct. The equation is balanced.</span>';
      feedback.className = 'game-feedback correct';
      steps.style.display = 'block';
      if (typeof GameState !== 'undefined') GameState.recordCorrectAnswer('medium', 'game', null);
    } else {
      feedback.innerHTML = '<span class="game-wrong">Not balanced. Try again. Think: what operation undoes what is done to the variable?</span>';
      feedback.className = 'game-feedback wrong';
      if (typeof GameState !== 'undefined') GameState.recordWrongAnswer();
    }
    if (typeof MathEngine !== 'undefined') setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  /* ---- Pattern Finder Game ---- */
  function patternGame() {
    const patterns = [
      { seq: [2, 4, 6, 8], next: 10, rule: 'Add 2 each time (arithmetic sequence, common difference = 2)' },
      { seq: [1, 3, 9, 27], next: 81, rule: 'Multiply by 3 each time (geometric sequence, common ratio = 3)' },
      { seq: [1, 1, 2, 3, 5], next: 8, rule: 'Each number is the sum of the two before it (Fibonacci sequence)' },
      { seq: [1, 4, 9, 16], next: 25, rule: 'Perfect squares: $1^2, 2^2, 3^2, 4^2, 5^2$' },
      { seq: [2, 6, 12, 20], next: 30, rule: '$n(n+1)$: $1\\times2, 2\\times3, 3\\times4, 4\\times5, 5\\times6$' },
      { seq: [3, 6, 12, 24], next: 48, rule: 'Multiply by 2 each time (geometric, ratio = 2), starting at 3' },
      { seq: [1, 8, 27, 64], next: 125, rule: 'Perfect cubes: $1^3, 2^3, 3^3, 4^3, 5^3$' },
      { seq: [0, 1, 3, 6, 10], next: 15, rule: 'Triangular numbers: $\\frac{n(n+1)}{2}$ for $n = 0, 1, 2, 3, 4, 5$' },
    ];

    const pat = patterns[Math.floor(Math.random() * patterns.length)];
    const gameId = 'pat-' + Date.now();

    // Store the rule (which contains LaTeX backslashes) in a data attribute
    // instead of an inline onclick string, so backslashes are not eaten as
    // JS escape sequences. The handler reads it back from the DOM.
    const ruleAttr = pat.rule.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    return `
      <div class="mini-game pattern-game" id="${gameId}" data-rule="${ruleAttr}">
        <div class="game-title">Pattern Finder</div>
        <div class="game-description">Find the pattern and predict the next number.</div>
        <div class="pattern-sequence">
          ${pat.seq.map(n => '<span class="pattern-num">' + n + '</span>').join('<span class="pattern-arrow">&rarr;</span>')}
          <span class="pattern-arrow">&rarr;</span>
          <span class="pattern-num mystery">?</span>
        </div>
        <div class="game-input-area">
          <label>Next number:</label>
          <input type="number" class="game-input" id="${gameId}-input"
                 onkeydown="if(event.key==='Enter')MiniGames.checkPattern('${gameId}',${pat.next})" />
          <button class="game-submit" onclick="MiniGames.checkPattern('${gameId}',${pat.next})">Check</button>
        </div>
        <div class="game-feedback" id="${gameId}-feedback"></div>
      </div>
    `;
  }

  function checkPattern(gameId, answer) {
    const card = document.getElementById(gameId);
    const input = document.getElementById(gameId + '-input');
    const feedback = document.getElementById(gameId + '-feedback');
    if (!card || !input || !feedback) return;
    const rule = card.dataset.rule || '';
    const correct = numericAttempt(card, input, answer);
    if (correct === null) return;

    if (correct) {
      finishCard(card, input);
      feedback.innerHTML = `<span class="game-correct">Correct.</span><div class="pattern-rule"><strong>Rule:</strong> ${rule}</div>`;
      feedback.className = 'game-feedback correct';
      if (typeof GameState !== 'undefined') GameState.recordCorrectAnswer('medium', 'game', null);
    } else {
      feedback.innerHTML = '<span class="game-wrong">Compare consecutive terms and test addition, multiplication, or a second-level pattern.</span>';
      feedback.className = 'game-feedback wrong';
      if (typeof GameState !== 'undefined') GameState.recordWrongAnswer();
    }
    if (typeof MathEngine !== 'undefined') setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  /* ---- "Build the Expression" Game ---- */
  function expressionBuilder() {
    const challenges = [
      { prompt: 'Write an expression for "5 more than a number x"', answer: 'x+5', display: '$x + 5$', hint: '"More than" means addition.' },
      { prompt: 'Write an expression for "triple a number n"', answer: '3n', display: '$3n$', hint: '"Triple" means multiply by 3.' },
      { prompt: 'Write an expression for "a number squared, minus 4"', answer: 'x^2-4', display: '$x^2 - 4$', hint: '"Squared" means raised to the power of 2.' },
      { prompt: 'Write an expression for "half of a number y"', answer: 'y/2', display: '$\\frac{y}{2}$', hint: '"Half" means divide by 2.' },
      { prompt: 'Write an expression for "the sum of two consecutive integers"', answer: 'n+(n+1)', display: '$n + (n+1) = 2n + 1$', hint: 'Consecutive integers: $n$ and $n+1$.' },
      { prompt: 'Write an expression for "the area of a rectangle with length $l$ and width $w$"', answer: 'l*w', display: '$l \\times w$', hint: 'Area equals length times width.' },
    ];

    const ch = challenges[Math.floor(Math.random() * challenges.length)];
    const gameId = 'expr-' + Date.now();

    return `
      <div class="mini-game expression-builder" id="${gameId}" data-answer="${ch.answer}">
        <div class="game-title">Build the Expression</div>
        <div class="game-description">Translate English into math notation. Any algebraically equivalent form counts.</div>
        <div class="game-prompt">${ch.prompt}</div>
        <div class="game-input-area">
          <input type="text" class="game-input" id="${gameId}-input" placeholder="Type your expression..."
                 onkeydown="if(event.key==='Enter')MiniGames.checkExpression('${gameId}')" />
          <button class="game-submit" onclick="MiniGames.checkExpression('${gameId}')">Check</button>
        </div>
        <div class="game-feedback" id="${gameId}-feedback"></div>
        <div class="game-hint" id="${gameId}-hint" style="display:none">
          <strong>Hint:</strong> ${ch.hint}<br>
          <strong>Answer:</strong> ${ch.display}
        </div>
      </div>
    `;
  }

  /* Normalize an expression string to something safely evaluable:
     whitelist characters, expand ^ and implicit multiplication. */
  function normalizeExpression(raw) {
    let s = String(raw).replace(/\s+/g, '').toLowerCase();
    if (!s || !/^[a-z0-9+\-*/^().]+$/.test(s)) return null;
    s = s.replace(/\^/g, '**');
    s = s.replace(/(\d)([a-z(])/g, '$1*$2');     /* 3n -> 3*n, 2( -> 2*( */
    s = s.replace(/([a-z)])(\()/g, '$1*(');      /* n( -> n*(, )( -> )*( */
    s = s.replace(/(\))([a-z0-9])/g, ')*$2');    /* )n -> )*n */
    /* lw -> l*w; run twice so lwh also splits fully */
    s = s.replace(/([a-z])([a-z])/g, '$1*$2');
    s = s.replace(/([a-z])([a-z])/g, '$1*$2');
    return s;
  }

  function extractVariables(normalized) {
    return [...new Set((normalized.match(/[a-z]/g) || []))].sort();
  }

  function evaluateExpression(normalized, varNames, values) {
    try {
      /* Input is whitelisted to single-letter identifiers and arithmetic,
         so no free identifiers beyond the declared parameters exist. */
      const fn = new Function(...varNames, `"use strict"; return (${normalized});`);
      const result = fn(...values);
      return (typeof result === 'number' && isFinite(result)) ? result : null;
    } catch (e) {
      return null;
    }
  }

  /* Two expressions are treated as equivalent when they agree on
     several sample points: the standard trick for checking algebraic
     identities without a symbolic engine. */
  function expressionsMatch(userNorm, answerNorm) {
    const answerVars = extractVariables(answerNorm);
    let userVars = extractVariables(userNorm);

    /* Allow a different letter when the answer uses a single variable */
    let mappedUser = userNorm;
    if (answerVars.length === 1 && userVars.length === 1 && userVars[0] !== answerVars[0]) {
      mappedUser = userNorm.split(userVars[0]).join(answerVars[0]);
      userVars = answerVars;
    }
    if (userVars.join(',') !== answerVars.join(',')) return false;

    const samples = [[2.3, 3.7, 5.1], [7.9, 1.3, 2.9], [0.6, 8.2, 4.4]];
    for (const sample of samples) {
      const values = answerVars.map((_, i) => sample[i % sample.length]);
      const a = evaluateExpression(answerNorm, answerVars, values);
      const u = evaluateExpression(mappedUser, answerVars, values);
      if (a === null || u === null) return false;
      if (Math.abs(a - u) > 1e-9 * Math.max(1, Math.abs(a))) return false;
    }
    return true;
  }

  function checkExpression(gameId) {
    const card = document.getElementById(gameId);
    const input = document.getElementById(gameId + '-input');
    const hint = document.getElementById(gameId + '-hint');
    const feedback = document.getElementById(gameId + '-feedback');
    if (!card || !input || !feedback) return;
    if (card.dataset.solved === 'true') return;

    const userNorm = normalizeExpression(input.value);
    const answerNorm = normalizeExpression(card.dataset.answer);
    if (!userNorm) {
      feedback.innerHTML = '<span class="game-wrong">Use numbers, letters, and the symbols + - * / ^ ( ) only.</span>';
      feedback.className = 'game-feedback wrong';
      return;
    }

    if (answerNorm && expressionsMatch(userNorm, answerNorm)) {
      finishCard(card, input);
      feedback.innerHTML = '<span class="game-correct">Correct. Your expression is equivalent to the target.</span>';
      feedback.className = 'game-feedback correct';
      hint.style.display = 'block';
      if (typeof GameState !== 'undefined') {
        const result = GameState.recordCorrectAnswer('medium', 'game', null);
        GameState.showXPGain(result.xpGained);
      }
    } else {
      const attempts = (parseInt(card.dataset.attempts || '0', 10) + 1);
      card.dataset.attempts = String(attempts);
      if (typeof GameState !== 'undefined') GameState.recordWrongAnswer();
      if (attempts >= 2) {
        feedback.innerHTML = '<span class="game-wrong">Not equivalent. The answer is revealed below; try rebuilding it from the wording.</span>';
        hint.style.display = 'block';
      } else {
        feedback.innerHTML = '<span class="game-wrong">Not equivalent to the target expression. Reread the wording and try once more.</span>';
      }
      feedback.className = 'game-feedback wrong';
    }
    if (typeof MathEngine !== 'undefined') setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  /* ---- Render All Games for a Section ---- */
  function renderGameSection() {
    return `
      <div class="games-section">
        <div class="phase-label hook">Interactive Games</div>
        <h3>Practice Through Play</h3>
        <p class="game-section-desc">Reinforce concepts through interactive challenges. Each game explains the reasoning behind every answer.</p>
        ${equationBalance()}
        ${patternGame()}
        ${expressionBuilder()}
      </div>
    `;
  }

  return {
    equationBalance,
    checkBalance,
    patternGame,
    checkPattern,
    expressionBuilder,
    checkExpression,
    renderGameSection
  };
})();
