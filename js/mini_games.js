/* ============================================================
   MINI-GAMES: Interactive learning activities
   Equation Balance, Expression Builder, Number Properties
   ============================================================ */
const MiniGames = (() => {

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
        <div class="game-title">⚖️ Equation Balance</div>
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
    const input = document.getElementById(gameId + '-input');
    const feedback = document.getElementById(gameId + '-feedback');
    const steps = document.getElementById(gameId + '-steps');
    const val = parseFloat(input.value);

    if (Math.abs(val - answer) < 0.01) {
      feedback.innerHTML = '<span class="game-correct">✓ Correct! The equation is balanced.</span>';
      feedback.className = 'game-feedback correct';
      steps.style.display = 'block';
      if (typeof GameState !== 'undefined') GameState.recordCorrectAnswer('medium', 'game', null);
    } else {
      feedback.innerHTML = '<span class="game-wrong">✗ Not balanced. Try again. Think: what operation undoes what is done to the variable?</span>';
      feedback.className = 'game-feedback wrong';
      if (typeof GameState !== 'undefined') GameState.recordWrongAnswer();
    }
    if (typeof MathEngine !== 'undefined') setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  /* ---- "What Comes Next?" Pattern Game ---- */
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

    return `
      <div class="mini-game pattern-game" id="${gameId}">
        <div class="game-title">🔢 What Comes Next?</div>
        <div class="game-description">Find the pattern and predict the next number.</div>
        <div class="pattern-sequence">
          ${pat.seq.map(n => '<span class="pattern-num">' + n + '</span>').join('<span class="pattern-arrow">→</span>')}
          <span class="pattern-arrow">→</span>
          <span class="pattern-num mystery">?</span>
        </div>
        <div class="game-input-area">
          <label>Next number:</label>
          <input type="number" class="game-input" id="${gameId}-input"
                 onkeydown="if(event.key==='Enter')MiniGames.checkPattern('${gameId}',${pat.next},'${pat.rule.replace(/'/g, "\\'")}')" />
          <button class="game-submit" onclick="MiniGames.checkPattern('${gameId}',${pat.next},'${pat.rule.replace(/'/g, "\\'")}')">Check</button>
        </div>
        <div class="game-feedback" id="${gameId}-feedback"></div>
      </div>
    `;
  }

  function checkPattern(gameId, answer, rule) {
    const input = document.getElementById(gameId + '-input');
    const feedback = document.getElementById(gameId + '-feedback');
    const val = parseFloat(input.value);

    if (Math.abs(val - answer) < 0.01) {
      feedback.innerHTML = `<span class="game-correct">✓ Correct!</span><div class="pattern-rule"><strong>Rule:</strong> ${rule}</div>`;
      feedback.className = 'game-feedback correct';
      if (typeof GameState !== 'undefined') GameState.recordCorrectAnswer('medium', 'game', null);
    } else {
      feedback.innerHTML = '<span class="game-wrong">✗ Look at how each number relates to the one before it. Is it adding? Multiplying? Something else?</span>';
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
      { prompt: 'Write an expression for "the area of a rectangle with length $l$ and width $w$"', answer: 'l*w', display: '$l \\times w$', hint: 'Area = length × width.' },
    ];

    const ch = challenges[Math.floor(Math.random() * challenges.length)];
    const gameId = 'expr-' + Date.now();

    return `
      <div class="mini-game expression-builder" id="${gameId}">
        <div class="game-title">✏️ Build the Expression</div>
        <div class="game-description">Translate English into math notation.</div>
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

  function checkExpression(gameId) {
    const hint = document.getElementById(gameId + '-hint');
    const feedback = document.getElementById(gameId + '-feedback');
    feedback.innerHTML = '<span class="game-correct">Great attempt! Check the answer below.</span>';
    hint.style.display = 'block';
    if (typeof MathEngine !== 'undefined') setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  /* ---- Render All Games for a Section ---- */
  function renderGameSection() {
    return `
      <div class="games-section">
        <div class="phase-label hook">Interactive Games</div>
        <h3>🎮 Practice Through Play</h3>
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
