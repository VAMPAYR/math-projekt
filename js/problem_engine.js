/* ============================================================
   PROBLEM ENGINE: Interactive Problem Types
   Free-response, Step-builder, Matching, Fill-blanks, Multi-part
   ============================================================ */
const ProblemEngine = (() => {

  function normalizeNestedProblems(problems, childKey) {
    if (!Array.isArray(problems)) return [];

    const normalized = [];
    problems.forEach((problem) => {
      if (!problem || !Array.isArray(problem[childKey])) {
        normalized.push(problem);
        return;
      }

      const current = { ...problem, [childKey]: [] };
      const nested = [];

      problem[childKey].forEach((entry) => {
        const isNestedProblem = entry
          && entry.question
          && Array.isArray(entry[childKey]);

        if (isNestedProblem) {
          nested.push(...normalizeNestedProblems([entry], childKey));
        } else if (entry) {
          current[childKey].push(entry);
        }
      });

      normalized.push(current, ...nested);
    });

    problems.splice(0, problems.length, ...normalized);
    return problems;
  }

  /* ============================================================
     FREE-RESPONSE PROBLEMS
     User types their answer, checked against accepted values
     ============================================================ */
  function renderFreeResponse(problems, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label practice">Free Response</div>
        <h3>Solve It Yourself</h3>
        <p class="phase-subtitle">Type an answer without answer choices.</p>
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
              <button class="fr-submit-btn" onclick="ProblemEngine.checkFreeResponse('${frId}',${idx},'${topicId}','${moduleId}')">Check</button>
            </div>
            ${prob.inputHelp ? `<div class="fr-input-help">${prob.inputHelp}</div>` : ''}
          </div>
          ${prob.hint ? `
            <button class="hint-btn" onclick="ProblemEngine.showFRHint('${frId}')">Need a hint?</button>
            <div class="hint-content" id="${frId}-hint">${prob.hint}</div>
          ` : ''}
          <div class="exercise-feedback correct-feedback" id="${frId}-correct">
            <h4>Correct</h4>
            <p>${prob.explanation || 'Correct.'}</p>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${frId}-incorrect">
            <h4>Not quite</h4>
            <p id="${frId}-incorrect-text">Try again or reveal the solution.</p>
            <button class="reveal-btn" onclick="ProblemEngine.revealFRAnswer('${frId}',${idx},'${topicId}','${moduleId}')">Show Solution</button>
          </div>
          <div class="exercise-feedback solution-feedback" id="${frId}-solution" style="display:none">
            <h4>Solution</h4>
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
    if (!input || input.disabled) return;
    const userAnswer = input.value.trim();
    if (!userAnswer) return;

    const prob = findFreeResponseProblem(topicId, probIdx, moduleId);
    if (!prob) return;
    moduleId = findTopicModule(topicId, moduleId)?.id;

    const isCorrect = checkAnswer(userAnswer, prob.accept, prob.type, prob.tolerance);
    if (window.ReviewEngine) ReviewEngine.recordAttempt({ topicId, moduleId, field: 'freeResponse', index: probIdx, correct: isCorrect });

    if (isCorrect) {
      input.classList.add('correct');
      input.classList.remove('incorrect');
      input.disabled = true;
      document.getElementById(`${frId}-correct`).classList.add('show');
      document.getElementById(`${frId}-incorrect`).classList.remove('show');
      const result = GameState.recordCorrectAnswer(prob.difficulty, 'freeResponse', topicId, moduleId);
      GameState.showXPGain(result.xpGained);
    } else {
      input.classList.add('incorrect');
      document.getElementById(`${frId}-incorrect`).classList.add('show');
      document.getElementById(`${frId}-incorrect-text`).innerHTML =
        prob.wrongHint || 'Check your work and try again.';
      GameState.recordWrongAnswer();
      // Allow retry
      setTimeout(() => {
        if (input.disabled) return;
        input.classList.remove('incorrect');
        input.value = '';
        input.focus();
      }, 2000);
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  function checkAnswer(userAnswer, accept, type, tolerance = 0) {
    if (accept === undefined || accept === null || userAnswer === undefined || userAnswer === null) return false;
    const cleaned = String(userAnswer).replace(/\s+/g, '').toLowerCase();
    if (!cleaned) return false;

    // Accept can be: string, number, array of acceptable answers, or regex
    if (Array.isArray(accept)) {
      return accept.some(a => matchSingle(cleaned, a, type, tolerance, userAnswer));
    }
    return matchSingle(cleaned, accept, type, tolerance, userAnswer);
  }

  function parseNumericAnswer(value) {
    // Space around a slash is harmless; space within a numeral is not.
    if (/[\d.]\s+[\d.]/.test(String(value))) return null;
    let text = String(value).trim().replace(/\s+/g, '').toLowerCase().replace(/\u2212/g, '-');
    // Accept the notation used in the lessons without evaluating expressions.
    if (text.startsWith('$') && text.endsWith('$')) text = text.slice(1, -1);
    if (text.startsWith('\\(') && text.endsWith('\\)')) text = text.slice(2, -2);
    const latexFraction = text.match(/^([+-]?)\\(?:d?frac)\{([^{}]+)\}\{([^{}]+)\}$/);
    if (latexFraction) text = `${latexFraction[1]}${latexFraction[2]}/${latexFraction[3]}`;
    if (text.startsWith('(') && text.endsWith(')') && !text.slice(1, -1).includes('(')) text = text.slice(1, -1);

    const numericToken = /^[+-]?(?:(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/;
    const parts = text.split('/');
    if (parts.length > 2 || !parts.every(part => numericToken.test(part))) return null;
    const values = parts.map(part => Number(part.replace(/,/g, '')));
    if (!values.every(Number.isFinite) || values[1] === 0) return null;
    const result = parts.length === 2 ? values[0] / values[1] : values[0];
    return Number.isFinite(result) ? result : null;
  }

  function matchSingle(cleaned, accepted, type, tolerance, rawAnswer) {
    if (accepted instanceof RegExp) {
      // A global expression should not alternate outcomes across retries.
      accepted.lastIndex = 0;
      return accepted.test(cleaned);
    }
    const acceptedNumber = typeof accepted === 'number' ? accepted : parseNumericAnswer(accepted);
    if (acceptedNumber !== null && Number.isFinite(acceptedNumber)) {
      const number = parseNumericAnswer(rawAnswer);
      if (number === null) return false;
      const allowedError = Number.isFinite(tolerance) && tolerance >= 0 ? tolerance : 0;
      const roundoff = Number.EPSILON * 4 * Math.max(Math.abs(number), Math.abs(acceptedNumber));
      return Math.abs(number - acceptedNumber) <= allowedError + roundoff;
    }
    if (typeof accepted === 'number') return false;
    const acceptStr = String(accepted).replace(/\s+/g, '').toLowerCase();
    return cleaned === acceptStr
      || cleaned.replace(/[()]/g, '') === acceptStr.replace(/[()]/g, '')
      || cleaned.replace(/\*/g, '') === acceptStr.replace(/\*/g, '');
  }

  function findFreeResponseProblem(topicId, probIdx, moduleId) {
    return findTopicProblem(topicId, 'freeResponse', probIdx, moduleId);
  }

  function revealFRAnswer(frId, probIdx, topicId, moduleId) {
    const prob = findFreeResponseProblem(topicId, probIdx, moduleId);
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
    problems = normalizeNestedProblems(problems, 'steps');
    let html = `
      <div class="phase-section">
        <div class="phase-label challenge">Step Builder</div>
        <h3>Build the Solution</h3>
        <p class="phase-subtitle">Select the correct steps in the right order to solve the problem.</p>
        <div class="phase-content">
    `;

    problems.forEach((prob, idx) => {
      const sbId = `sb-${topicId}-${idx}`;
      // Reset state: the DOM is rebuilt on every render with the same id,
      // so stale expectedNext would otherwise reject the correct first step.
      stepBuilderState[sbId] = { selected: [], expectedNext: 0, topicId, moduleId };
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
            <div class="sb-divider">Available Steps</div>
            <div class="sb-available-steps" id="${sbId}-available">
      `;

      const steps = (prob.steps || []).filter(step => step && step.content);

      // Shuffle the steps for display
      const shuffled = steps.map((s, i) => ({ ...s, originalIndex: i }));
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      shuffled.forEach((step) => {
        html += `
          <button class="sb-step-btn" data-step-idx="${step.originalIndex}"
                  onclick="ProblemEngine.selectStep('${sbId}', this, ${step.originalIndex}, ${steps.length}, '${topicId}', ${idx}, '${moduleId}')">
            ${step.content}
          </button>
        `;
      });

      html += `
            </div>
          </div>
          <button class="sb-reset-btn" onclick="ProblemEngine.resetStepBuilder('${sbId}', '${topicId}', ${idx}, '${moduleId}')">
            Reset
          </button>
          <div class="exercise-feedback correct-feedback" id="${sbId}-correct">
            <h4>Correct Construction</h4>
            <p>${prob.explanation || 'You built the solution correctly.'}</p>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${sbId}-incorrect">
            <h4>Wrong step</h4>
            <p id="${sbId}-incorrect-text">That step does not belong here. Try again.</p>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  const stepBuilderState = {};

  function selectStep(sbId, btn, stepIdx, totalSteps, topicId, probIdx, moduleId) {
    const previous = stepBuilderState[sbId];
    const mod = findTopicModule(topicId, moduleId || previous?.moduleId);
    if (!mod || (previous?.moduleId && previous.moduleId !== mod.id) || (previous?.topicId && previous.topicId !== topicId)) return;
    moduleId = mod.id;
    if (!previous) stepBuilderState[sbId] = { selected: [], expectedNext: 0, topicId, moduleId };
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
        const result = GameState.recordCorrectAnswer('medium', 'stepByStep', topicId, moduleId);
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

  function resetStepBuilder(sbId, topicId, probIdx, moduleId) {
    const previous = stepBuilderState[sbId];
    const mod = findTopicModule(topicId, moduleId || previous?.moduleId);
    if (!mod || (previous?.moduleId && previous.moduleId !== mod.id) || (previous?.topicId && previous.topicId !== topicId)) return;
    stepBuilderState[sbId] = { selected: [], expectedNext: 0, topicId, moduleId: mod.id };
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
        <h3>Match the Pairs</h3>
        <p class="phase-subtitle">Click a term, then click its match.</p>
        <div class="phase-content">
    `;

    problems.forEach((prob, idx) => {
      const mId = `match-${topicId}-${idx}`;
      // Reset state on every render so a re-opened topic can be matched again.
      matchState[mId] = { selected: null, matched: 0, topicId, moduleId };
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
        const leftLabel = pair.left ?? pair.term ?? pair.prompt ?? '';
        html += `
          <button class="match-item match-left-item" data-match-id="${mId}" data-pair-idx="${pIdx}" data-side="left"
                  onclick="ProblemEngine.matchSelect(this, '${mId}', ${prob.pairs.length}, '${topicId}', '${moduleId}')">
            ${leftLabel}
          </button>
        `;
      });

      html += '</div><div class="matching-column matching-right">';

      shuffledRight.forEach((pair) => {
        const rightLabel = pair.right ?? pair.definition ?? pair.answer ?? '';
        html += `
          <button class="match-item match-right-item" data-match-id="${mId}" data-pair-idx="${pair.idx}" data-side="right"
                  onclick="ProblemEngine.matchSelect(this, '${mId}', ${prob.pairs.length}, '${topicId}', '${moduleId}')">
            ${rightLabel}
          </button>
        `;
      });

      html += `
            </div>
          </div>
          <div class="match-score" id="${mId}-score">0 / ${prob.pairs.length} matched</div>
          <div class="exercise-feedback correct-feedback" id="${mId}-correct">
            <h4>All Matched</h4>
            <p>${prob.explanation || 'All pairs matched.'}</p>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  const matchState = {};

  function matchSelect(btn, mId, totalPairs, topicId, moduleId) {
    const previous = matchState[mId];
    const mod = findTopicModule(topicId, moduleId || previous?.moduleId);
    if (!mod || (previous?.moduleId && previous.moduleId !== mod.id) || (previous?.topicId && previous.topicId !== topicId)) return;
    moduleId = mod.id;
    if (!previous) matchState[mId] = { selected: null, matched: 0, topicId, moduleId };
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
            const result = GameState.recordCorrectAnswer('medium', 'matching', topicId, moduleId);
            GameState.showXPGain(result.xpGained);
          }
        } else {
          // Wrong match. Capture the first button before clearing selection,
          // otherwise the deferred cleanup cannot find it and its red stays.
          const firstBtn = ms.selected.btn;
          firstBtn.classList.remove('match-selected');
          firstBtn.classList.add('match-wrong');
          btn.classList.add('match-wrong');
          ms.selected = null;
          setTimeout(() => {
            firstBtn.classList.remove('match-wrong');
            btn.classList.remove('match-wrong');
          }, 600);
        }
      }
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  /* ============================================================
     FILL-IN-THE-BLANK
     Math expressions with blanks to fill
     ============================================================ */
  function renderBlankLabel(index, inMath) {
    const label = `Blank ${index + 1}`;
    return inMath
      ? `\\boxed{\\text{${label}}}`
      : `<span class="fb-blank-token">${label}</span>`;
  }

  function renderFillBlankExpression(expression) {
    let html = '';
    let index = 0;

    while (index < expression.length) {
      const start = expression.indexOf('$', index);
      if (start < 0) {
        html += replaceBlankMarkers(expression.slice(index), false);
        break;
      }

      html += replaceBlankMarkers(expression.slice(index, start), false);
      const isDisplay = expression[start + 1] === '$';
      const delimiter = isDisplay ? '$$' : '$';
      const contentStart = start + delimiter.length;
      const end = expression.indexOf(delimiter, contentStart);

      if (end < 0) {
        html += replaceBlankMarkers(expression.slice(start), false);
        break;
      }

      const tex = replaceBlankMarkers(expression.slice(contentStart, end), true);
      html += `${delimiter}${tex}${delimiter}`;
      index = end + delimiter.length;
    }

    return html;
  }

  function replaceBlankMarkers(text, inMath) {
    return text.replace(/\{\{(\d+)\}\}/g, (_, rawIndex) => renderBlankLabel(Number(rawIndex), inMath));
  }

  function renderFillBlanks(problems, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label practice">Fill the Gaps</div>
        <h3>Complete the Expression</h3>
        <p class="phase-subtitle">Fill in the missing parts of each mathematical expression.</p>
        <div class="phase-content">
    `;

    problems.forEach((prob, idx) => {
      const fbId = `fb-${topicId}-${idx}`;
      const diffClass = prob.difficulty || 'medium';

      const displayHtml = renderFillBlankExpression(prob.expression);
      const inputsHtml = prob.blanks.map((blank, bIdx) => `
        <label class="fb-input-group" for="${fbId}-blank-${bIdx}">
          <span>Blank ${bIdx + 1}</span>
          <input type="text" class="fb-input" id="${fbId}-blank-${bIdx}"
                  placeholder="?" size="${blank.size || 4}"
                  data-fb-id="${fbId}" data-blank-idx="${bIdx}" />
        </label>
      `).join('');

      html += `
        <div class="exercise-card fill-blank-card" id="${fbId}">
          <div class="exercise-header">
            <span class="exercise-badge ${diffClass}">${diffClass}</span>
            <span class="exercise-number">Fill ${idx + 1}</span>
          </div>
          ${prob.context ? `<div class="exercise-question">${prob.context}</div>` : ''}
          <div class="fb-expression">${displayHtml}</div>
          <div class="fb-input-list">${inputsHtml}</div>
          <button class="fr-submit-btn" onclick="ProblemEngine.checkFillBlanks('${fbId}',${idx},'${topicId}','${moduleId}')">Check</button>
          ${prob.hint ? `
            <button class="hint-btn" onclick="ProblemEngine.showFRHint('${fbId}')">Hint</button>
            <div class="hint-content" id="${fbId}-hint">${prob.hint}</div>
          ` : ''}
          <div class="exercise-feedback correct-feedback" id="${fbId}-correct">
            <h4>All correct</h4>
            <p>${prob.explanation || 'All blanks are correct.'}</p>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${fbId}-incorrect">
            <h4>Some blanks are wrong</h4>
            <p id="${fbId}-incorrect-text">Incorrect fields are highlighted. Fix them and recheck.</p>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  function checkFillBlanks(fbId, probIdx, topicId, moduleId) {
    const prob = findFillBlankProblem(topicId, probIdx, moduleId);
    if (!prob) return;
    moduleId = findTopicModule(topicId, moduleId)?.id;
    const card = document.getElementById(fbId);
    if (!card || card.dataset.solved === 'true') return;

    let allCorrect = true;
    prob.blanks.forEach((blank, bIdx) => {
      const input = document.getElementById(`${fbId}-blank-${bIdx}`);
      if (!input) { allCorrect = false; return; }
      const userVal = input.value.trim();
      const correct = checkAnswer(userVal, blank.accept, blank.type, blank.tolerance);
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
      card.dataset.solved = 'true';
      document.getElementById(`${fbId}-correct`).classList.add('show');
      document.getElementById(`${fbId}-incorrect`).classList.remove('show');
      const result = GameState.recordCorrectAnswer(prob.difficulty, 'freeResponse', topicId, moduleId);
      GameState.showXPGain(result.xpGained);
    } else {
      document.getElementById(`${fbId}-incorrect`).classList.add('show');
      document.getElementById(`${fbId}-correct`).classList.remove('show');
      GameState.recordWrongAnswer();
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  function findFillBlankProblem(topicId, probIdx, moduleId) {
    return findTopicProblem(topicId, 'fillBlanks', probIdx, moduleId);
  }

  /* ============================================================
     MULTI-PART PROBLEMS
     Progressive problems where each part builds on the previous
     ============================================================ */
  function renderMultiPart(problems, moduleId, topicId) {
    problems = normalizeNestedProblems(problems, 'parts');
    let html = `
      <div class="phase-section">
        <div class="phase-label challenge">Multi-Part Challenge</div>
        <h3>Multi-Part Problems</h3>
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
                     onkeydown="if(event.key==='Enter')ProblemEngine.checkMultiPart('${mpId}',${idx},${pIdx},'${topicId}','${moduleId}')" />
              <button class="fr-submit-btn" onclick="ProblemEngine.checkMultiPart('${mpId}',${idx},${pIdx},'${topicId}','${moduleId}')"
                      ${pIdx > 0 ? 'disabled' : ''}>Check</button>
            </div>
            <div class="mp-part-feedback" id="${partId}-feedback"></div>
          </div>
        `;
      });

      html += `
          </div>
          <div class="exercise-feedback correct-feedback" id="${mpId}-complete">
            <h4>Challenge Complete</h4>
            <p>${prob.completionMessage || 'Problem complete.'}</p>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  function checkMultiPart(mpId, probIdx, partIdx, topicId, moduleId) {
    const prob = findMultiPartProblem(topicId, probIdx, moduleId);
    if (!prob || !prob.parts[partIdx]) return;
    moduleId = findTopicModule(topicId, moduleId)?.id;

    const part = prob.parts[partIdx];
    const input = document.getElementById(`${mpId}-part-${partIdx}-input`);
    if (!input || input.disabled) return;

    const userAnswer = input.value.trim();
    if (!userAnswer) return;
    const isCorrect = checkAnswer(userAnswer, part.accept, part.type, part.tolerance);
    const feedback = document.getElementById(`${mpId}-part-${partIdx}-feedback`);

    if (isCorrect) {
      input.classList.add('correct');
      input.disabled = true;
      if (feedback) {
        feedback.innerHTML = `<span class="mp-correct">${part.explanation || 'Correct'}</span>`;
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
        const result = GameState.recordCorrectAnswer('hard', 'challenge', topicId, moduleId);
        GameState.showXPGain(result.xpGained);
      }
    } else {
      input.classList.add('incorrect');
      if (feedback) {
        feedback.innerHTML = `<span class="mp-incorrect">${part.wrongHint || 'Not quite. Try again.'}</span>`;
        feedback.classList.add('show');
      }
      GameState.recordWrongAnswer();
      setTimeout(() => {
        if (input.disabled) return;
        input.classList.remove('incorrect');
        input.value = '';
        input.focus();
      }, 1500);
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  function findMultiPartProblem(topicId, probIdx, moduleId) {
    return findTopicProblem(topicId, 'multiPart', probIdx, moduleId);
  }

  /* ============================================================
     GENERIC PROBLEM LOOKUP
     ============================================================ */
  function findTopicModule(topicId, moduleId) {
    const matches = (window.MATH_MODULES || []).filter(mod =>
      (!moduleId || mod.id === moduleId) && (mod.topics || []).some(topic => topic.id === topicId));
    // Old callers may omit the module only when the topic is unambiguous.
    return matches.length === 1 ? matches[0] : null;
  }

  function findTopicProblem(topicId, key, probIdx, moduleId) {
    const mod = findTopicModule(topicId, moduleId);
    const topic = mod?.topics.find(t => t.id === topicId);
    return topic?.[key]?.[probIdx] || null;
  }

  /* ============================================================
     QUANTITATIVE COMPARISON (GRE format)
     Two quantities, four fixed answer choices
     ============================================================ */
  const QC_CHOICES = [
    'Quantity A is greater.',
    'Quantity B is greater.',
    'The two quantities are equal.',
    'The relationship cannot be determined from the information given.'
  ];

  function renderQuantComparison(problems, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label practice">Quantitative Comparison</div>
        <h3>Compare the Quantities</h3>
        <p class="phase-subtitle">Decide which quantity is greater, whether they are equal, or whether the answer depends on unstated values. Same four choices every time.</p>
        <div class="phase-content">
    `;

    problems.forEach((prob, idx) => {
      const qcId = `qc-${topicId}-${idx}`;
      const diffClass = prob.difficulty || 'medium';
      html += `
        <div class="exercise-card qc-card" id="${qcId}">
          <div class="exercise-header">
            <span class="exercise-badge ${diffClass}">${diffClass}</span>
            <span class="exercise-number">Comparison ${idx + 1}</span>
          </div>
          ${prob.setup ? `<div class="qc-given">${prob.setup}</div>` : ''}
          <div class="qc-table">
            <div class="qc-quantity">
              <div class="qc-quantity-label">Quantity A</div>
              <div class="qc-quantity-value">${prob.quantityA}</div>
            </div>
            <div class="qc-quantity">
              <div class="qc-quantity-label">Quantity B</div>
              <div class="qc-quantity-value">${prob.quantityB}</div>
            </div>
          </div>
          <div class="exercise-options qc-options">
            ${QC_CHOICES.map((choice, i) => `
              <button class="option-btn" id="${qcId}-opt-${i}"
                      onclick="ProblemEngine.selectQC('${qcId}',${i},${idx},'${topicId}','${moduleId}')">
                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                <span>${choice}</span>
              </button>
            `).join('')}
          </div>
          ${prob.hint ? `
            <button class="hint-btn" onclick="ProblemEngine.togglePEHint('${qcId}')">Need a hint?</button>
            <div class="hint-content" id="${qcId}-hint">${prob.hint}</div>
          ` : ''}
          <div class="exercise-feedback correct-feedback" id="${qcId}-correct">
            <h4>Correct</h4>
            <div>${prob.explanation || 'Correct.'}</div>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${qcId}-incorrect">
            <h4>Not quite</h4>
            <div id="${qcId}-incorrect-text"></div>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  function selectQC(qcId, selectedIdx, probIdx, topicId, moduleId) {
    const prob = findTopicProblem(topicId, 'quantComparison', probIdx, moduleId);
    if (!prob) return;
    moduleId = findTopicModule(topicId, moduleId)?.id;
    const card = document.getElementById(qcId);
    if (!card || card.dataset.answered === 'true') return;
    card.dataset.answered = 'true';

    const correctIdx = prob.correctIndex;
    if (window.ReviewEngine) ReviewEngine.recordAttempt({ topicId, moduleId, field: 'quantComparison', index: probIdx, correct: selectedIdx === correctIdx });
    for (let i = 0; i < QC_CHOICES.length; i++) {
      const btn = document.getElementById(`${qcId}-opt-${i}`);
      if (!btn) continue;
      btn.classList.add('disabled');
      if (i === correctIdx) btn.classList.add('correct');
      else if (i === selectedIdx) btn.classList.add('incorrect');
    }

    if (selectedIdx === correctIdx) {
      document.getElementById(`${qcId}-correct`).classList.add('show');
      const result = GameState.recordCorrectAnswer(prob.difficulty, 'quantComparison', topicId, moduleId);
      GameState.showXPGain(result.xpGained);
    } else {
      const fb = document.getElementById(`${qcId}-incorrect`);
      const fbText = document.getElementById(`${qcId}-incorrect-text`);
      const perChoice = prob.wrongExplanations && prob.wrongExplanations[selectedIdx];
      fbText.innerHTML = `${perChoice ? `<p>${perChoice}</p>` : ''}
        <p><strong>Answer: ${String.fromCharCode(65 + correctIdx)}.</strong> ${prob.explanation || ''}</p>`;
      fb.classList.add('show');
      GameState.recordWrongAnswer();
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  /* ============================================================
     MULTI-SELECT (GRE "select all that apply" format)
     One or more options are correct; no partial credit
     ============================================================ */
  function renderMultiSelect(problems, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label practice">Multi-Select</div>
        <h3>Select All That Apply</h3>
        <p class="phase-subtitle">One or more choices are correct. You must pick every correct choice and nothing else, exactly as on the GRE.</p>
        <div class="phase-content">
    `;

    problems.forEach((prob, idx) => {
      const msId = `ms-${topicId}-${idx}`;
      const diffClass = prob.difficulty || 'medium';
      html += `
        <div class="exercise-card ms-card" id="${msId}">
          <div class="exercise-header">
            <span class="exercise-badge ${diffClass}">${diffClass}</span>
            <span class="exercise-number">Problem ${idx + 1}</span>
          </div>
          <div class="exercise-question">${prob.question}</div>
          <div class="exercise-options ms-options">
            ${prob.options.map((opt, i) => `
              <button class="option-btn ms-option" id="${msId}-opt-${i}"
                      aria-pressed="false"
                      onclick="ProblemEngine.toggleMSOption('${msId}',${i})">
                <span class="ms-checkbox" aria-hidden="true"></span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
          <button class="fr-submit-btn ms-submit-btn" onclick="ProblemEngine.checkMultiSelect('${msId}',${idx},'${topicId}','${moduleId}')">Check Selection</button>
          ${prob.hint ? `
            <button class="hint-btn" onclick="ProblemEngine.togglePEHint('${msId}')">Need a hint?</button>
            <div class="hint-content" id="${msId}-hint">${prob.hint}</div>
          ` : ''}
          <div class="exercise-feedback correct-feedback" id="${msId}-correct">
            <h4>Correct</h4>
            <div>${prob.explanation || 'Correct.'}</div>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${msId}-incorrect">
            <h4>Not quite</h4>
            <div id="${msId}-incorrect-text"></div>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  function toggleMSOption(msId, optIdx) {
    const card = document.getElementById(msId);
    if (!card || card.dataset.answered === 'true') return;
    const btn = document.getElementById(`${msId}-opt-${optIdx}`);
    if (!btn) return;
    const selected = btn.classList.toggle('ms-selected');
    btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
  }

  function checkMultiSelect(msId, probIdx, topicId, moduleId) {
    const prob = findTopicProblem(topicId, 'multiSelect', probIdx, moduleId);
    if (!prob || !Array.isArray(prob.correctIndices)) return;
    moduleId = findTopicModule(topicId, moduleId)?.id;
    const card = document.getElementById(msId);
    if (!card || card.dataset.answered === 'true') return;

    const selected = [];
    prob.options.forEach((_, i) => {
      const btn = document.getElementById(`${msId}-opt-${i}`);
      if (btn && btn.classList.contains('ms-selected')) selected.push(i);
    });
    if (selected.length === 0) return; /* require at least one pick */

    card.dataset.answered = 'true';
    const correctSet = new Set(prob.correctIndices);
    const isCorrect = selected.length === correctSet.size && selected.every(i => correctSet.has(i));

    prob.options.forEach((_, i) => {
      const btn = document.getElementById(`${msId}-opt-${i}`);
      if (!btn) return;
      btn.classList.add('disabled');
      const picked = btn.classList.contains('ms-selected');
      if (correctSet.has(i)) btn.classList.add(picked ? 'correct' : 'ms-missed');
      else if (picked) btn.classList.add('incorrect');
    });

    if (isCorrect) {
      document.getElementById(`${msId}-correct`).classList.add('show');
      const result = GameState.recordCorrectAnswer(prob.difficulty, 'multiSelect', topicId, moduleId);
      GameState.showXPGain(result.xpGained);
    } else {
      const letters = prob.correctIndices.map(i => String.fromCharCode(65 + i)).join(', ');
      document.getElementById(`${msId}-incorrect-text`).innerHTML =
        `<p><strong>Correct choices: ${letters}.</strong> Outlined options were correct but unselected; red options should not have been selected.</p>
         <p>${prob.explanation || ''}</p>`;
      document.getElementById(`${msId}-incorrect`).classList.add('show');
      GameState.recordWrongAnswer();
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  /* Shared hint toggle for the GRE problem types */
  function togglePEHint(cardId) {
    const hint = document.getElementById(`${cardId}-hint`);
    if (hint) {
      hint.classList.toggle('show');
      setTimeout(() => MathEngine.renderAllMath(), 50);
    }
  }

  /* ============================================================
     FADED WORKED EXAMPLES (completion problems)
     Early steps are shown fully worked; later steps are blanks
     the learner must complete. This is the completion effect:
     scaffolding fades so working memory goes to schema building.
     ============================================================ */
  function renderFadedExamples(problems, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label example">Complete the Solution</div>
        <h3>Finish the Worked Example</h3>
        <p class="phase-subtitle">The first steps are done for you. Fill in the remaining steps yourself. Completing a partial solution builds the method faster than reading a finished one.</p>
        <div class="phase-content">
    `;

    problems.forEach((prob, idx) => {
      const feId = `fe-${topicId}-${idx}`;
      const diffClass = prob.difficulty || 'medium';
      let blankCounter = 0;
      const stepsHtml = prob.steps.map((step, sIdx) => {
        if (step.given !== undefined) {
          return `
            <div class="fe-step fe-step-given">
              <span class="fe-step-num">${sIdx + 1}</span>
              <div class="fe-step-body">${step.given}</div>
            </div>
          `;
        }
        const b = blankCounter++;
        return `
          <div class="fe-step fe-step-blank">
            <span class="fe-step-num">${sIdx + 1}</span>
            <div class="fe-step-body">
              <div class="fe-blank-prompt">${step.prompt}</div>
              <input type="text" class="fr-input fe-blank-input" id="${feId}-blank-${b}" data-blank="${b}"
                     placeholder="${step.placeholder || 'Your step...'}" autocomplete="off">
              <div class="fe-blank-result" id="${feId}-blank-${b}-result"></div>
            </div>
          </div>
        `;
      }).join('');

      html += `
        <div class="exercise-card faded-example-card" id="${feId}" data-blanks="${blankCounter}">
          <div class="exercise-header">
            <span class="exercise-badge ${diffClass}">${diffClass}</span>
            <span class="exercise-number">Completion ${idx + 1}</span>
          </div>
          <div class="exercise-question">${prob.problem}</div>
          <div class="fe-steps">${stepsHtml}</div>
          <button class="fr-submit-btn" onclick="ProblemEngine.checkFaded('${feId}',${idx},'${topicId}','${moduleId}')">Check My Steps</button>
          <div class="exercise-feedback correct-feedback" id="${feId}-correct">
            <h4>Complete</h4>
            <div>${prob.completionMessage || 'Every step checks out. You reconstructed the method yourself.'}</div>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${feId}-incorrect">
            <h4>Some steps need another look</h4>
            <div id="${feId}-incorrect-text"></div>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  function checkFaded(feId, probIdx, topicId, moduleId) {
    const prob = findTopicProblem(topicId, 'fadedExamples', probIdx, moduleId);
    if (!prob) return;
    moduleId = findTopicModule(topicId, moduleId)?.id;
    const card = document.getElementById(feId);
    if (!card || card.dataset.solved === 'true') return;

    const blanks = prob.steps.filter(s => s.given === undefined);
    let allCorrect = true;
    let anyFilled = false;

    blanks.forEach((step, b) => {
      const input = document.getElementById(`${feId}-blank-${b}`);
      const result = document.getElementById(`${feId}-blank-${b}-result`);
      if (!input || !result) { allCorrect = false; return; }
      const val = input.value.trim();
      if (!val) { allCorrect = false; return; }
      anyFilled = true;
      const ok = checkAnswer(val, step.accept, step.type, step.tolerance);
      input.classList.toggle('correct', ok);
      input.classList.toggle('incorrect', !ok);
      result.innerHTML = ok
        ? `<span class="fe-ok">Correct.</span> ${step.explanation || ''}`
        : `<span class="fe-no">Not yet.</span> ${step.wrongHint || 'Rework this step from the ones above it.'}`;
      result.classList.add('show');
      if (!ok) allCorrect = false;
    });

    if (!anyFilled) return;

    if (allCorrect && card.dataset.solved !== 'true') {
      card.dataset.solved = 'true';
      document.getElementById(`${feId}-correct`).classList.add('show');
      document.getElementById(`${feId}-incorrect`).classList.remove('show');
      const result = GameState.recordCorrectAnswer(prob.difficulty, 'completion', topicId, moduleId);
      GameState.showXPGain(result.xpGained);
    } else if (!allCorrect) {
      document.getElementById(`${feId}-incorrect-text`).innerHTML =
        'Fix the flagged steps and check again. Each blank builds on the steps above it.';
      document.getElementById(`${feId}-incorrect`).classList.add('show');
      GameState.recordWrongAnswer();
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
  }

  /* ============================================================
     STRATEGY DISCRIMINATION
     Before solving, the learner names which method applies.
     Choosing the tool from competing options trains schema
     selection: the skill that separates transfer from drill.
     ============================================================ */
  function renderStrategySelect(problems, moduleId, topicId) {
    let html = `
      <div class="phase-section">
        <div class="phase-label model">Choose Your Tool</div>
        <h3>Which Method Fits?</h3>
        <p class="phase-subtitle">Do not solve these. For each one, decide which method you would use. Recognizing the type is the hard part of a real test; the arithmetic is the easy part.</p>
        <div class="phase-content">
    `;

    problems.forEach((prob, idx) => {
      const ssId = `ss-${topicId}-${idx}`;
      const diffClass = prob.difficulty || 'medium';
      html += `
        <div class="exercise-card strategy-card" id="${ssId}">
          <div class="exercise-header">
            <span class="exercise-badge ${diffClass}">${diffClass}</span>
            <span class="exercise-number">Scenario ${idx + 1}</span>
          </div>
          <div class="exercise-question">${prob.scenario}</div>
          <div class="ss-question">Which method fits best?</div>
          <div class="exercise-options ss-options">
            ${prob.options.map((opt, i) => `
              <button class="option-btn" id="${ssId}-opt-${i}"
                      onclick="ProblemEngine.selectStrategy('${ssId}',${i},${idx},'${topicId}','${moduleId}')">
                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
          <div class="exercise-feedback correct-feedback" id="${ssId}-correct">
            <h4>Right tool</h4>
            <div>${prob.explanation || ''}</div>
          </div>
          <div class="exercise-feedback incorrect-feedback" id="${ssId}-incorrect">
            <h4>A different tool fits better</h4>
            <div id="${ssId}-incorrect-text"></div>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
    return html;
  }

  function selectStrategy(ssId, selectedIdx, probIdx, topicId, moduleId) {
    const prob = findTopicProblem(topicId, 'strategySelect', probIdx, moduleId);
    if (!prob) return;
    moduleId = findTopicModule(topicId, moduleId)?.id;
    const card = document.getElementById(ssId);
    if (!card || card.dataset.answered === 'true') return;
    card.dataset.answered = 'true';

    const correctIdx = prob.correctIndex;
    prob.options.forEach((_, i) => {
      const btn = document.getElementById(`${ssId}-opt-${i}`);
      if (!btn) return;
      btn.classList.add('disabled');
      if (i === correctIdx) btn.classList.add('correct');
      else if (i === selectedIdx) btn.classList.add('incorrect');
    });

    if (selectedIdx === correctIdx) {
      document.getElementById(`${ssId}-correct`).classList.add('show');
      const result = GameState.recordCorrectAnswer(prob.difficulty, 'strategy', topicId, moduleId);
      GameState.showXPGain(result.xpGained);
    } else {
      const perChoice = prob.wrongExplanations && prob.wrongExplanations[selectedIdx];
      document.getElementById(`${ssId}-incorrect-text`).innerHTML =
        `${perChoice ? `<p>${perChoice}</p>` : ''}<p><strong>Better fit: ${String.fromCharCode(65 + correctIdx)}.</strong> ${prob.explanation || ''}</p>`;
      document.getElementById(`${ssId}-incorrect`).classList.add('show');
      GameState.recordWrongAnswer();
    }

    setTimeout(() => MathEngine.renderAllMath(), 50);
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
    renderQuantComparison,
    renderMultiSelect,
    renderFadedExamples,
    renderStrategySelect,
    checkFreeResponse,
    checkFillBlanks,
    checkMultiPart,
    checkFaded,
    selectStrategy,
    selectQC,
    toggleMSOption,
    checkMultiSelect,
    togglePEHint,
    revealFRAnswer,
    showFRHint,
    selectStep,
    resetStepBuilder,
    matchSelect,
    checkAnswer
  };
})();
