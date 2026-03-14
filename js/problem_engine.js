/* ============================================================
   PROBLEM ENGINE: Interactive Problem Types
   Free-response, Step-builder, Matching, Fill-blanks, Multi-part
   ============================================================ */
const ProblemEngine = (() => {

  /* ============================================================
     FREE-RESPONSE PROBLEMS
     User types their answer, checked against accepted values
     ============================================================ */
  function renderFreeResponse(problems, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label practice">Free Response</div>
        <h3>✏️ Solve It Yourself</h3>
        <p class="phase-subtitle">Type your answer. No multiple choice crutch.</p>
        <div class="phase-content">
    `;

    problems.forEach((prob, idx) => {
      const frId = `fr-${topicId}-${idx}`;
      const diffClass = prob.difficulty || 'medium';
      html += `
        <div class="exercise-card free-response-card" id="${frId}">
          <div class="exercise-header">
            <span class="exercise-badge ${diffClass}">${diffClass}</span>
            <span class="exercise-number">Problem ${idx + 1}</span>
          </div>
          <div class="exercise-question">${prob.question}</div>
          ${prob.setup ? `<div class="problem-setup">${prob.setup}</div>` : ''}
          <div class="free-response-input-area">
            <div class="fr-input-group">
              <label class="fr-label">Your Answer:</label>
              <input type="text" class="fr-input" id="${frId}-input"
                     placeholder="${prob.placeholder || 'Type your answer...'}"
                     autocomplete="off"
                     onkeydown="if(event.key==='Enter')ProblemEngine.checkFreeResponse('${frId}',${idx},'${topicId}','${moduleId}')" />
              <button class="fr-submit-btn" onclick="ProblemEngine.checkFreeResponse('${frId}',${idx},'${topicId}','${moduleId}')">
                Check →
              </button>
            </div>
            ${prob.inputHelp ? `<div class="fr-input-help">${prob.inputHelp}</div>` : ''}
          </div>
          ${prob.hint ? `
            <button class="hint-btn" onclick="ProblemEngine.showFRHint('${frId}')">💡 Need a hint?</button>
            <div class="hint-content" id="${frId}-hint">${prob.hint}</div>
          ` : ''}
          <div class="exercise-feedback correct-feedback" id="${frId}-correct">
            <h4>✓ Correct!</h4>
            <p>${prob.explanation || 'Well done!'}</p>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${frId}-incorrect">
            <h4>✗ Not quite</h4>
            <p id="${frId}-incorrect-text">Try again or reveal the solution.</p>
            <button class="reveal-btn" onclick="ProblemEngine.revealFRAnswer('${frId}',${idx},'${topicId}')">Show Solution</button>
          </div>
          <div class="exercise-feedback solution-feedback" id="${frId}-solution" style="display:none">
            <h4>📖 Solution</h4>
            <div id="${frId}-solution-text"></div>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  function checkFreeResponse(frId, probIdx, topicId, moduleId) {
    const input = document.getElementById(`${frId}-input`);
    if (!input) return;
    const userAnswer = input.value.trim();
    if (!userAnswer) return;

    const prob = findFreeResponseProblem(topicId, probIdx);
    if (!prob) return;

    const isCorrect = checkAnswer(userAnswer, prob.accept, prob.type);

    if (isCorrect) {
      input.classList.add('correct');
      input.disabled = true;
      document.getElementById(`${frId}-correct`).classList.add('show');
      document.getElementById(`${frId}-incorrect`).classList.remove('show');
      const result = GameState.recordCorrectAnswer(prob.difficulty, 'freeResponse', topicId);
      GameState.showXPGain(result.xpGained);
    } else {
      input.classList.add('incorrect');
      document.getElementById(`${frId}-incorrect`).classList.add('show');
      document.getElementById(`${frId}-incorrect-text`).innerHTML =
        prob.wrongHint || 'Check your work and try again.';
      GameState.recordWrongAnswer();
      // Allow retry
      setTimeout(() => {
        input.classList.remove('incorrect');
        input.value = '';
        input.focus();
      }, 2000);
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  function checkAnswer(userAnswer, accept, type) {
    if (!accept) return false;
    const cleaned = userAnswer.replace(/\s+/g, '').toLowerCase();

    // Accept can be: string, number, array of acceptable answers, or regex
    if (Array.isArray(accept)) {
      return accept.some(a => matchSingle(cleaned, a, type));
    }
    return matchSingle(cleaned, accept, type);
  }

  function matchSingle(cleaned, accepted, type) {
    if (typeof accepted === 'number') {
      const num = parseFloat(cleaned.replace(/[^0-9.\-\/]/g, ''));
      if (isNaN(num)) return false;
      // Handle fractions
      if (cleaned.includes('/')) {
        const parts = cleaned.split('/');
        if (parts.length === 2) {
          const frac = parseFloat(parts[0]) / parseFloat(parts[1]);
          if (Math.abs(frac - accepted) < 0.001) return true;
        }
      }
      return Math.abs(num - accepted) < 0.001;
    }
    if (accepted instanceof RegExp) {
      return accepted.test(cleaned);
    }
    const acceptStr = String(accepted).replace(/\s+/g, '').toLowerCase();
    return cleaned === acceptStr
      || cleaned.replace(/[()]/g, '') === acceptStr.replace(/[()]/g, '')
      || cleaned.replace(/\*/g, '') === acceptStr.replace(/\*/g, '');
  }

  function findFreeResponseProblem(topicId, probIdx) {
    if (!window.MATH_MODULES) return null;
    for (const mod of window.MATH_MODULES) {
      const topic = mod.topics.find(t => t.id === topicId);
      if (topic && topic.freeResponse && topic.freeResponse[probIdx]) {
        return topic.freeResponse[probIdx];
      }
    }
    return null;
  }

  function revealFRAnswer(frId, probIdx, topicId) {
    const prob = findFreeResponseProblem(topicId, probIdx);
    if (!prob) return;
    const solEl = document.getElementById(`${frId}-solution`);
    const solText = document.getElementById(`${frId}-solution-text`);
    if (solEl && solText) {
      solText.innerHTML = prob.solution || `The answer is: $${prob.accept}$`;
      solEl.style.display = 'block';
      solEl.classList.add('show');
      setTimeout(() => MathEngine.renderAllMath(), 50);
    }
  }

  function showFRHint(frId) {
    const hint = document.getElementById(`${frId}-hint`);
    if (hint) {
      hint.classList.toggle('show');
      setTimeout(() => MathEngine.renderAllMath(), 50);
    }
  }

  /* ============================================================
     STEP-BY-STEP BUILDER
     User constructs solution by selecting correct steps in order
     ============================================================ */
  function renderStepBuilder(problems, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label challenge">Step Builder</div>
        <h3>🔨 Build the Solution</h3>
        <p class="phase-subtitle">Select the correct steps in the right order to solve the problem.</p>
        <div class="phase-content">
    `;

    problems.forEach((prob, idx) => {
      const sbId = `sb-${topicId}-${idx}`;
      html += `
        <div class="exercise-card step-builder-card" id="${sbId}">
          <div class="exercise-header">
            <span class="exercise-badge ${prob.difficulty || 'medium'}">${prob.difficulty || 'medium'}</span>
            <span class="exercise-number">Construction ${idx + 1}</span>
          </div>
          <div class="exercise-question">${prob.question}</div>
          <div class="step-builder-workspace">
            <div class="sb-selected-steps" id="${sbId}-selected">
              <p class="sb-placeholder">Click steps below in the correct order</p>
            </div>
            <div class="sb-divider">↓ Available Steps ↓</div>
            <div class="sb-available-steps" id="${sbId}-available">
      `;

      // Shuffle the steps for display
      const shuffled = prob.steps.map((s, i) => ({ ...s, originalIndex: i }));
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      shuffled.forEach((step) => {
        html += `
          <button class="sb-step-btn" data-step-idx="${step.originalIndex}"
                  onclick="ProblemEngine.selectStep('${sbId}', this, ${step.originalIndex}, ${prob.steps.length}, '${topicId}', ${idx})">
            ${step.content}
          </button>
        `;
      });

      html += `
            </div>
          </div>
          <button class="sb-reset-btn" onclick="ProblemEngine.resetStepBuilder('${sbId}', '${topicId}', ${idx})">
            🔄 Reset
          </button>
          <div class="exercise-feedback correct-feedback" id="${sbId}-correct">
            <h4>✓ Perfect Construction!</h4>
            <p>${prob.explanation || 'You built the solution correctly.'}</p>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${sbId}-incorrect">
            <h4>✗ Wrong step</h4>
            <p id="${sbId}-incorrect-text">That step does not belong here. Try again.</p>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  const stepBuilderState = {};

  function selectStep(sbId, btn, stepIdx, totalSteps, topicId, probIdx) {
    if (!stepBuilderState[sbId]) stepBuilderState[sbId] = { selected: [], expectedNext: 0 };
    const sbs = stepBuilderState[sbId];

    if (stepIdx === sbs.expectedNext) {
      // Correct step
      sbs.selected.push(stepIdx);
      sbs.expectedNext++;
      btn.classList.add('used');
      btn.disabled = true;

      // Move to selected area
      const selectedArea = document.getElementById(`${sbId}-selected`);
      const placeholder = selectedArea.querySelector('.sb-placeholder');
      if (placeholder) placeholder.remove();

      const stepEl = document.createElement('div');
      stepEl.className = 'sb-placed-step';
      stepEl.innerHTML = `<span class="sb-step-num">${sbs.selected.length}</span> ${btn.innerHTML}`;
      selectedArea.appendChild(stepEl);

      document.getElementById(`${sbId}-incorrect`).classList.remove('show');

      // Check if complete
      if (sbs.selected.length === totalSteps) {
        document.getElementById(`${sbId}-correct`).classList.add('show');
        const result = GameState.recordCorrectAnswer('medium', 'stepByStep', topicId);
        GameState.showXPGain(result.xpGained);
      }
    } else {
      // Wrong step
      btn.classList.add('wrong-step');
      document.getElementById(`${sbId}-incorrect`).classList.add('show');
      GameState.recordWrongAnswer();
      setTimeout(() => btn.classList.remove('wrong-step'), 800);
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  function resetStepBuilder(sbId, topicId, probIdx) {
    stepBuilderState[sbId] = { selected: [], expectedNext: 0 };
    const selectedArea = document.getElementById(`${sbId}-selected`);
    if (selectedArea) {
      selectedArea.innerHTML = '<p class="sb-placeholder">Click steps below in the correct order</p>';
    }
    const availArea = document.getElementById(`${sbId}-available`);
    if (availArea) {
      availArea.querySelectorAll('.sb-step-btn').forEach(btn => {
        btn.classList.remove('used', 'wrong-step');
        btn.disabled = false;
      });
    }
    document.getElementById(`${sbId}-correct`)?.classList.remove('show');
    document.getElementById(`${sbId}-incorrect`)?.classList.remove('show');
  }

  /* ============================================================
     MATCHING PROBLEMS
     Drag or click to match pairs
     ============================================================ */
  function renderMatching(problems, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label practice">Matching</div>
        <h3>🔗 Match the Pairs</h3>
        <p class="phase-subtitle">Click a term, then click its match.</p>
        <div class="phase-content">
    `;

    problems.forEach((prob, idx) => {
      const mId = `match-${topicId}-${idx}`;
      const shuffledRight = [...prob.pairs.map((p, i) => ({ ...p, idx: i }))];
      for (let i = shuffledRight.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledRight[i], shuffledRight[j]] = [shuffledRight[j], shuffledRight[i]];
      }

      html += `
        <div class="exercise-card matching-card" id="${mId}">
          <div class="exercise-header">
            <span class="exercise-badge ${prob.difficulty || 'medium'}">${prob.difficulty || 'medium'}</span>
            <span class="exercise-number">Match Set ${idx + 1}</span>
          </div>
          ${prob.instruction ? `<div class="exercise-question">${prob.instruction}</div>` : ''}
          <div class="matching-grid">
            <div class="matching-column matching-left">
      `;

      prob.pairs.forEach((pair, pIdx) => {
        html += `
          <button class="match-item match-left-item" data-match-id="${mId}" data-pair-idx="${pIdx}" data-side="left"
                  onclick="ProblemEngine.matchSelect(this, '${mId}', ${prob.pairs.length}, '${topicId}')">
            ${pair.left}
          </button>
        `;
      });

      html += '</div><div class="matching-column matching-right">';

      shuffledRight.forEach((pair) => {
        html += `
          <button class="match-item match-right-item" data-match-id="${mId}" data-pair-idx="${pair.idx}" data-side="right"
                  onclick="ProblemEngine.matchSelect(this, '${mId}', ${prob.pairs.length}, '${topicId}')">
            ${pair.right}
          </button>
        `;
      });

      html += `
            </div>
          </div>
          <div class="match-score" id="${mId}-score">0 / ${prob.pairs.length} matched</div>
          <div class="exercise-feedback correct-feedback" id="${mId}-correct">
            <h4>✓ All Matched!</h4>
            <p>${prob.explanation || 'Great pattern recognition!'}</p>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  const matchState = {};

  function matchSelect(btn, mId, totalPairs, topicId) {
    if (!matchState[mId]) matchState[mId] = { selected: null, matched: 0 };
    const ms = matchState[mId];

    if (btn.classList.contains('matched')) return;

    const side = btn.dataset.side;
    const pairIdx = parseInt(btn.dataset.pairIdx);

    if (!ms.selected) {
      // First selection
      ms.selected = { btn, side, pairIdx };
      btn.classList.add('match-selected');
    } else {
      // Second selection
      if (ms.selected.side === side) {
        // Same side, switch selection
        ms.selected.btn.classList.remove('match-selected');
        ms.selected = { btn, side, pairIdx };
        btn.classList.add('match-selected');
      } else {
        // Different side, check match
        const firstIdx = ms.selected.pairIdx;
        const secondIdx = pairIdx;

        if (firstIdx === secondIdx) {
          // Correct match!
          ms.selected.btn.classList.remove('match-selected');
          ms.selected.btn.classList.add('matched');
          btn.classList.add('matched');
          ms.matched++;
          ms.selected = null;

          document.getElementById(`${mId}-score`).textContent = `${ms.matched} / ${totalPairs} matched`;

          if (ms.matched === totalPairs) {
            document.getElementById(`${mId}-correct`).classList.add('show');
            const result = GameState.recordCorrectAnswer('medium', 'matching', topicId);
            GameState.showXPGain(result.xpGained);
          }
        } else {
          // Wrong match
          ms.selected.btn.classList.remove('match-selected');
          ms.selected.btn.classList.add('match-wrong');
          btn.classList.add('match-wrong');
          setTimeout(() => {
            ms.selected?.btn?.classList.remove('match-wrong');
            btn.classList.remove('match-wrong');
            ms.selected = null;
          }, 600);
          ms.selected = null;
        }
      }
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  /* ============================================================
     FILL-IN-THE-BLANK
     Math expressions with blanks to fill
     ============================================================ */
  function renderFillBlanks(problems, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label practice">Fill the Gaps</div>
        <h3>📝 Complete the Expression</h3>
        <p class="phase-subtitle">Fill in the missing parts of each mathematical expression.</p>
        <div class="phase-content">
    `;

    problems.forEach((prob, idx) => {
      const fbId = `fb-${topicId}-${idx}`;
      const diffClass = prob.difficulty || 'medium';

      // Replace {{n}} placeholders with input fields
      let displayHtml = prob.expression;
      prob.blanks.forEach((blank, bIdx) => {
        displayHtml = displayHtml.replace(
          `{{${bIdx}}}`,
          `<input type="text" class="fb-input" id="${fbId}-blank-${bIdx}"
                  placeholder="?" size="${blank.size || 4}"
                  data-fb-id="${fbId}" data-blank-idx="${bIdx}" />`
        );
      });

      html += `
        <div class="exercise-card fill-blank-card" id="${fbId}">
          <div class="exercise-header">
            <span class="exercise-badge ${diffClass}">${diffClass}</span>
            <span class="exercise-number">Fill ${idx + 1}</span>
          </div>
          ${prob.context ? `<div class="exercise-question">${prob.context}</div>` : ''}
          <div class="fb-expression">${displayHtml}</div>
          <button class="fr-submit-btn" onclick="ProblemEngine.checkFillBlanks('${fbId}',${idx},'${topicId}','${moduleId}')">
            Check All →
          </button>
          ${prob.hint ? `
            <button class="hint-btn" onclick="ProblemEngine.showFRHint('${fbId}')">💡 Hint</button>
            <div class="hint-content" id="${fbId}-hint">${prob.hint}</div>
          ` : ''}
          <div class="exercise-feedback correct-feedback" id="${fbId}-correct">
            <h4>✓ All correct!</h4>
            <p>${prob.explanation || 'Perfect!'}</p>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${fbId}-incorrect">
            <h4>✗ Some blanks are wrong</h4>
            <p id="${fbId}-incorrect-text">Incorrect fields are highlighted. Fix them and recheck.</p>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  function checkFillBlanks(fbId, probIdx, topicId, moduleId) {
    const prob = findFillBlankProblem(topicId, probIdx);
    if (!prob) return;

    let allCorrect = true;
    prob.blanks.forEach((blank, bIdx) => {
      const input = document.getElementById(`${fbId}-blank-${bIdx}`);
      if (!input) return;
      const userVal = input.value.trim();
      const correct = checkAnswer(userVal, blank.accept, blank.type);
      if (correct) {
        input.classList.add('correct');
        input.classList.remove('incorrect');
      } else {
        input.classList.add('incorrect');
        input.classList.remove('correct');
        allCorrect = false;
      }
    });

    if (allCorrect) {
      document.getElementById(`${fbId}-correct`).classList.add('show');
      document.getElementById(`${fbId}-incorrect`).classList.remove('show');
      const result = GameState.recordCorrectAnswer(prob.difficulty, 'freeResponse', topicId);
      GameState.showXPGain(result.xpGained);
    } else {
      document.getElementById(`${fbId}-incorrect`).classList.add('show');
      document.getElementById(`${fbId}-correct`).classList.remove('show');
      GameState.recordWrongAnswer();
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  function findFillBlankProblem(topicId, probIdx) {
    if (!window.MATH_MODULES) return null;
    for (const mod of window.MATH_MODULES) {
      const topic = mod.topics.find(t => t.id === topicId);
      if (topic && topic.fillBlanks && topic.fillBlanks[probIdx]) {
        return topic.fillBlanks[probIdx];
      }
    }
    return null;
  }

  /* ============================================================
     MULTI-PART PROBLEMS
     Progressive problems where each part builds on the previous
     ============================================================ */
  function renderMultiPart(problems, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label challenge">Multi-Part Challenge</div>
        <h3>🏗️ Multi-Part Problems</h3>
        <p class="phase-subtitle">Each part builds on the previous. Complete them in order.</p>
        <div class="phase-content">
    `;

    problems.forEach((prob, idx) => {
      const mpId = `mp-${topicId}-${idx}`;
      html += `
        <div class="exercise-card multi-part-card" id="${mpId}">
          <div class="exercise-header">
            <span class="exercise-badge ${prob.difficulty || 'hard'}">${prob.difficulty || 'hard'}</span>
            <span class="exercise-number">Challenge ${idx + 1}</span>
          </div>
          <div class="exercise-question">${prob.question}</div>
          <div class="mp-parts">
      `;

      prob.parts.forEach((part, pIdx) => {
        const partId = `${mpId}-part-${pIdx}`;
        html += `
          <div class="mp-part ${pIdx === 0 ? 'active' : 'locked'}" id="${partId}" data-part-idx="${pIdx}">
            <div class="mp-part-header">
              <span class="mp-part-letter">${String.fromCharCode(97 + pIdx)})</span>
              <span class="mp-part-question">${part.question}</span>
            </div>
            <div class="mp-part-input">
              <input type="text" class="fr-input" id="${partId}-input"
                     placeholder="${part.placeholder || 'Your answer...'}"
                     ${pIdx > 0 ? 'disabled' : ''}
                     onkeydown="if(event.key==='Enter')ProblemEngine.checkMultiPart('${mpId}',${idx},${pIdx},'${topicId}')" />
              <button class="fr-submit-btn" onclick="ProblemEngine.checkMultiPart('${mpId}',${idx},${pIdx},'${topicId}')"
                      ${pIdx > 0 ? 'disabled' : ''}>Check</button>
            </div>
            <div class="mp-part-feedback" id="${partId}-feedback"></div>
          </div>
        `;
      });

      html += `
          </div>
          <div class="exercise-feedback correct-feedback" id="${mpId}-complete">
            <h4>🏆 Challenge Complete!</h4>
            <p>${prob.completionMessage || 'Excellent work on this multi-part problem!'}</p>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  function checkMultiPart(mpId, probIdx, partIdx, topicId) {
    const prob = findMultiPartProblem(topicId, probIdx);
    if (!prob || !prob.parts[partIdx]) return;

    const part = prob.parts[partIdx];
    const input = document.getElementById(`${mpId}-part-${partIdx}-input`);
    if (!input) return;

    const userAnswer = input.value.trim();
    const isCorrect = checkAnswer(userAnswer, part.accept, part.type);
    const feedback = document.getElementById(`${mpId}-part-${partIdx}-feedback`);

    if (isCorrect) {
      input.classList.add('correct');
      input.disabled = true;
      if (feedback) {
        feedback.innerHTML = `<span class="mp-correct">✓ ${part.explanation || 'Correct!'}</span>`;
        feedback.classList.add('show');
      }

      // Unlock next part
      const nextPart = document.getElementById(`${mpId}-part-${partIdx + 1}`);
      if (nextPart) {
        nextPart.classList.remove('locked');
        nextPart.classList.add('active');
        const nextInput = nextPart.querySelector('input');
        const nextBtn = nextPart.querySelector('button');
        if (nextInput) { nextInput.disabled = false; nextInput.focus(); }
        if (nextBtn) nextBtn.disabled = false;
      } else {
        // All parts complete
        document.getElementById(`${mpId}-complete`).classList.add('show');
        const result = GameState.recordCorrectAnswer('hard', 'challenge', topicId);
        GameState.showXPGain(result.xpGained);
      }
    } else {
      input.classList.add('incorrect');
      if (feedback) {
        feedback.innerHTML = `<span class="mp-incorrect">✗ ${part.wrongHint || 'Not quite. Try again.'}</span>`;
        feedback.classList.add('show');
      }
      GameState.recordWrongAnswer();
      setTimeout(() => {
        input.classList.remove('incorrect');
        input.value = '';
        input.focus();
      }, 1500);
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  function findMultiPartProblem(topicId, probIdx) {
    if (!window.MATH_MODULES) return null;
    for (const mod of window.MATH_MODULES) {
      const topic = mod.topics.find(t => t.id === topicId);
      if (topic && topic.multiPart && topic.multiPart[probIdx]) {
        return topic.multiPart[probIdx];
      }
    }
    return null;
  }

  /* ============================================================
     PUBLIC API
     ============================================================ */
  return {
    renderFreeResponse,
    renderStepBuilder,
    renderMatching,
    renderFillBlanks,
    renderMultiPart,
    checkFreeResponse,
    checkFillBlanks,
    checkMultiPart,
    revealFRAnswer,
    showFRHint,
    selectStep,
    resetStepBuilder,
    matchSelect,
    checkAnswer
  };
})();
