/* ============================================================
   MODULE 6: Calculus 1 : Limits & Derivatives (4 topics)
   Source: Thomas' Calculus Chapters 2-4
   ============================================================ */
(function() {
if (!window.MATH_MODULES) window.MATH_MODULES = [];
const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

window.MATH_MODULES.push({
id: 'calculus1',
order: 9,
title: 'Calculus 1B: Derivatives & Applications',
description: 'Derivatives, differentiation rules, and applications. Finding instantaneous rates of change. Requires: limits (Module 8).',
topics: [

/* TOPIC 6.1: Limits & Continuity */
{
  id: 'limits-continuity',
  title: 'Limits & Continuity',
  description: 'The foundational concept of calculus: what value does $f(x)$ approach as $x$ approaches $a$?',
  prereqRecap: [
    { term: 'Function', definition: 'A rule assigning each input $x$ exactly one output $f(x)$ (Module 4).' },
    { term: 'Domain', definition: 'The set of valid inputs for a function (Module 4).' },
    { term: 'Absolute Value', definition: '$|a|$ = distance of $a$ from 0 (Module 2).' }
  ],
  whyExists: { html: `
    <p><strong>Why limits?</strong> The derivative asks: "What is the slope of a curve at a single point?" This requires dividing by zero ($\\frac{\\Delta y}{\\Delta x}$ as $\\Delta x \\to 0$). Limits make this precise WITHOUT dividing by zero: they describe what HAPPENS as we get arbitrarily close.</p>
    ${WHY('The epsilon-delta definition', '<p>$\\lim_{x \\to a} f(x) = L$ means: for every $\\epsilon \\gt 0$, there exists $\\delta \\gt 0$ such that $0 < |x - a| < \\delta \\Rightarrow |f(x) - L| < \\epsilon$. In words: we can make $f(x)$ as close to $L$ as desired by making $x$ sufficiently close to $a$.</p>')}
  ` },
  concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 400 250" width="400" height="250" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="210" x2="380" y2="210" stroke="#94a3b8" stroke-width="1"/>
  <line x1="60" y1="20" x2="60" y2="220" stroke="#94a3b8" stroke-width="1"/>
  <path d="M 80 180 Q 140 100 200 60 Q 260 30 340 25" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <line x1="130" y1="140" x2="250" y2="60" stroke="#10b981" stroke-width="1.5" stroke-dasharray="5,4"/>
  <line x1="130" y1="140" x2="250" y2="140" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="250" y1="140" x2="250" y2="60" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,3"/>
  <circle cx="130" cy="140" r="4" fill="#8b5cf6"/>
  <circle cx="250" cy="60" r="4" fill="#8b5cf6"/>
  <text x="140" y="155" fill="#8b5cf6" font-size="10" font-family="Inter,sans-serif">(a, f(a))</text>
  <text x="255" y="55" fill="#8b5cf6" font-size="10" font-family="Inter,sans-serif">(b, f(b))</text>
  <text x="180" y="158" fill="#ef4444" font-size="10" text-anchor="middle" font-family="Inter,sans-serif">b - a</text>
  <text x="262" y="105" fill="#f59e0b" font-size="10" font-family="Inter,sans-serif">f(b)-f(a)</text>
  <text x="120" y="30" fill="#e2e8f0" font-size="12" font-family="Inter,sans-serif">Average rate = [f(b)-f(a)] / (b-a)</text>
  <text x="345" y="22" fill="#3b82f6" font-size="11" font-family="Inter,sans-serif">f(x)</text>
</svg>
</div>
<p class="math-diagram-label">Average rate of change: slope of the secant line between two points on f(x)</p>

    <div class="callout callout-key"><h4>Limit Laws</h4>
    <p>If $\\lim_{x \\to a} f(x) = L$ and $\\lim_{x \\to a} g(x) = M$:</p>
    <ul>
      <li>$\\lim (f \\pm g) = L \\pm M$</li>
      <li>$\\lim (f \\cdot g) = L \\cdot M$</li>
      <li>$\\lim \\frac{f}{g} = \\frac{L}{M}$ (if $M \\neq 0$)</li>
      <li>$\\lim [f(x)]^n = L^n$</li>
    </ul></div>
    <div class="callout callout-key"><h4>Evaluating Limits : Strategies</h4>
    <ol>
      <li><strong>Direct substitution:</strong> Try $f(a)$. If defined, that is the limit.</li>
      <li><strong>Factor and cancel:</strong> If $\\frac{0}{0}$ form, factor numerator/denominator, cancel common factor.</li>
      <li><strong>Conjugate:</strong> For square root expressions, multiply by conjugate.</li>
      <li><strong>L'Hôpital's Rule:</strong> $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$ → $\\lim \\frac{f}{g} = \\lim \\frac{f'}{g'}$ (requires derivatives, Topic 6.2).</li>
    </ol></div>
    <div class="callout callout-key"><h4>Continuity</h4>
    <p>$f$ is <strong>continuous at $a$</strong> if: (1) $f(a)$ is defined, (2) $\\lim_{x \\to a} f(x)$ exists, (3) $\\lim_{x \\to a} f(x) = f(a)$.</p>
    <p>Polynomials, exponentials, and trig functions are continuous everywhere in their domains.</p>
    ${WHY('Why does continuity matter?', '<p>Continuous functions satisfy the <strong>Intermediate Value Theorem</strong>: if $f$ is continuous on $[a,b]$ and $f(a) \\lt 0 < f(b)$, then there exists $c \\in (a,b)$ with $f(c) = 0$. This guarantees solutions exist. Without continuity, functions can "jump" and miss values.</p>')}</div>
    <div class="callout callout-key"><h4>Important Special Limits</h4>
    <p>$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ (requires $x$ in radians)</p>
    <p>$\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0$</p></div>
  ` },
  definition: { html: `<p><strong>Limit:</strong> $\\lim_{x \\to a} f(x) = L$ if $f(x)$ can be made arbitrarily close to $L$ by taking $x$ sufficiently close to $a$ (but $x \\neq a$).</p>` },
  examples: [{
    title: 'Evaluating Limits',
    problem: 'Find $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$.',
    steps: [
      { title: 'Direct substitution', content: '$\\frac{2^2 - 4}{2 - 2} = \\frac{0}{0}$. Indeterminate form.', why: '$\\frac{0}{0}$ does not mean the limit is 0 or undefined. It means we need another method.' },
      { title: 'Factor', content: '$\\frac{(x+2)(x-2)}{x-2} = x + 2$ for $x \\neq 2$.', why: 'Cancel the common factor $(x-2)$. Valid because we approach 2 but never equal 2.' },
      { title: 'Evaluate', content: '$\\lim_{x \\to 2} (x + 2) = 4$.', why: 'After cancellation, direct substitution works.' }
    ]
  }],
  exercises: [
    { difficulty: 'easy', question: '$\\lim_{x \\to 3} (2x + 1) = $?', options: ['$5$', '$7$', '$6$', '$3$'], correctIndex: 1, hint: '<p>Direct substitution: polynomial is continuous.</p>', correctExplanation: '$2(3) + 1 = 7$.', wrongExplanations: { 0: '$2(3) = 6$, not $4$. Then $6 + 1 = 7$.', 2: 'You forgot the $+1$: $2(3) = 6$, then $6 + 1 = 7$.', 3: '3 is the value $x$ approaches, not the limit.' } },
    { difficulty: 'easy', question: '$\\lim_{x \\to 0} \\frac{\\sin x}{x} = $?', options: ['$0$', '$1$', '$\\infty$', 'Does not exist'], correctIndex: 1, hint: '<p>This is a famous limit. Requires proof from geometry (squeeze theorem).</p>', correctExplanation: '$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ (in radians). This is fundamental to differentiating sine.', wrongExplanations: { 0: 'Both numerator and denominator approach 0, but the ratio approaches 1, not 0.', 2: 'The ratio stays bounded near 1, not growing to infinity.', 3: 'The limit does exist; it equals 1.' } },
    { difficulty: 'medium', question: '$\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1} = $?', options: ['$0$', '$1$', '$2$', 'Undefined'], correctIndex: 2, hint: '<p>Factor the numerator.</p>', correctExplanation: '$\\frac{(x+1)(x-1)}{x-1} = x+1$ for $x \\neq 1$. $\\lim_{x \\to 1}(x+1) = 2$.', wrongExplanations: { 0: '$\\frac{0}{0}$ is indeterminate, not zero. Factor first.', 1: 'After cancellation: $x + 1$ at $x = 1$ gives 2.', 3: 'The limit exists even though $f(1)$ is undefined. Limits ignore the point itself.' } },
    { difficulty: 'medium', question: 'Is $f(x) = \\frac{|x|}{x}$ continuous at $x = 0$?', options: ['Yes', 'No, $f(0)$ is undefined', 'No, but the limit exists', 'Yes, with value 1'], correctIndex: 1, hint: '<p>Can you evaluate $f(0) = \\frac{|0|}{0}$?</p>', correctExplanation: '$f(0) = \\frac{0}{0}$, undefined. Continuity requires $f(a)$ to exist. Additionally, the left and right limits differ: $\\lim_{x \\to 0^-} = -1$, $\\lim_{x \\to 0^+} = 1$.', wrongExplanations: { 0: '$f(0)$ is undefined ($0/0$). First condition of continuity fails.', 2: 'The limit does NOT exist: $\\lim_{x \\to 0^-} = -1 \\neq 1 = \\lim_{x \\to 0^+}$.', 3: '$f(0)$ is undefined, so continuity fails.' } },
    { difficulty: 'hard', question: '$\\lim_{x \\to \\infty} \\frac{3x^2 + x}{5x^2 - 2} = $?', options: ['$0$', '$\\frac{3}{5}$', '$\\infty$', '$1$'], correctIndex: 1, hint: '<p>Divide numerator and denominator by $x^2$.</p>', correctExplanation: '$\\frac{3 + 1/x}{5 - 2/x^2} \\to \\frac{3}{5}$ as $x \\to \\infty$ (lower terms → 0).', wrongExplanations: { 0: 'Same degree: ratio of leading coefficients, not 0.', 2: 'Infinity occurs when numerator degree exceeds denominator.', 3: 'Ratio is $3/5$, not $1$.' } },
    { difficulty: 'hard', question: '$\\lim_{x \\to 0} \\frac{\\sqrt{x+4} - 2}{x} = $?', options: ['$0$', '$\\frac{1}{4}$', '$\\frac{1}{2}$', 'Does not exist'], correctIndex: 1, hint: '<p>Multiply by conjugate $\\frac{\\sqrt{x+4}+2}{\\sqrt{x+4}+2}$.</p>', correctExplanation: '$\\frac{(\\sqrt{x+4}-2)(\\sqrt{x+4}+2)}{x(\\sqrt{x+4}+2)} = \\frac{x+4-4}{x(\\sqrt{x+4}+2)} = \\frac{1}{\\sqrt{x+4}+2} \\to \\frac{1}{4}$.', wrongExplanations: { 0: 'The $\\frac{0}{0}$ form is resolved by the conjugate trick, giving $\\frac{1}{4}$.', 2: '$\\sqrt{0+4} + 2 = 4$, so the limit is $1/4$, not $1/2$.', 3: 'The limit exists; the conjugate method reveals it.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: '$\\lim_{x \\to 3} (2x + 1) =$?', accept: [7, '7'], placeholder: 'Enter a number', explanation: 'Direct substitution: $2(3) + 1 = 7$.' },
    { difficulty: 'easy', question: '$\\lim_{x \\to 0} (x^2 + 3) =$?', accept: [3, '3'], placeholder: 'Enter a number', explanation: 'Direct substitution: $0 + 3 = 3$.' },
    { difficulty: 'medium', question: '$\\lim_{x \\to 0} \\frac{\\sin x}{x} =$?', accept: [1, '1'], placeholder: 'Enter a number', explanation: 'Famous limit = 1 (squeeze theorem).' },
    { difficulty: 'medium', question: '$\\lim_{x \\to 2} \\frac{x^2-4}{x-2} =$?', accept: [4, '4'], placeholder: 'Enter a number', explanation: 'Factor: $\\frac{(x-2)(x+2)}{x-2} = x+2 \\to 4$.' },
    { difficulty: 'hard', question: '$\\lim_{x \\to \\infty} \\frac{5x^3 + 1}{2x^3 - x} =$?', accept: ['5/2', '2.5'], placeholder: 'Enter a number', explanation: 'Same degree: ratio of leading coefficients = $5/2$.' },
    { difficulty: 'hard', question: 'Is $f(x) = |x|/x$ continuous at $x = 0$? (yes/no)', accept: ['no', 'No'], placeholder: 'yes or no', explanation: 'Left limit = $-1$, right limit = $1$. Limits differ: discontinuous.' },
    { difficulty: 'easy', question: '$\\int 1\\,dx =$?', accept: ['x+C', 'x + C'], placeholder: 'Expression', explanation: '$\\int 1\\,dx = x + C$.' },
    { difficulty: 'medium', question: '$\\int (3x^2 + 2x)\\,dx =$?', accept: ['x^3+x^2+C', 'x^3 + x^2 + C'], placeholder: 'Expression', explanation: '$x^3 + x^2 + C$.' },
    { difficulty: 'hard', question: '$\\int \\frac{1}{\\sqrt{x}}\\,dx =$?', accept: ['2sqrt(x)+C', '2\\sqrt{x}+C'], placeholder: 'Expression', explanation: '$\\int x^{-1/2}\\,dx = 2x^{1/2} + C = 2\\sqrt{x} + C$.' },
    { difficulty: 'medium', question: '$\\int \\cos x\\,dx =$?', accept: ['sin(x)+C', 'sinx+C', '\\sin x + C'], placeholder: 'Expression', explanation: '$\\int \\cos x\\,dx = \\sin x + C$.' },
    { difficulty: 'hard', question: '$\\int x\\sqrt{x}\\,dx = \\int x^{3/2}\\,dx =$?', accept: ['(2/5)x^(5/2)+C', '2x^(5/2)/5+C'], placeholder: 'Expression', explanation: '$\\frac{x^{5/2}}{5/2} + C = \\frac{2}{5}x^{5/2} + C$.' },
    { difficulty: 'easy', question: '$\\int x\\,dx =$?', accept: ['x^2/2+C', 'x^2/2 + C'], placeholder: 'Expression', explanation: '$x^{1+1}/(1+1) + C = x^2/2 + C$.' },
    { difficulty: 'easy', question: '$\\int 0\\,dx =$?', accept: ['C', 'c', '0+C'], placeholder: 'Expression', explanation: 'Integral of 0 is a constant: $C$.' },
    { difficulty: 'medium', question: '$\\int (2x + 3)\\,dx =$?', accept: ['x^2+3x+C', 'x^2 + 3x + C'], placeholder: 'Expression', explanation: '$x^2 + 3x + C$.' },
    { difficulty: 'hard', question: '$\\int \\sec^2(x)\\,dx =$?', accept: ['tan(x)+C', 'tanx+C'], placeholder: 'Expression', explanation: '$\\int \\sec^2 x\\,dx = \\tan x + C$.' },
    { difficulty: 'hard', question: '$\\int \\frac{1}{x}\\,dx =$?', accept: ['ln|x|+C', 'ln(x)+C'], placeholder: 'Expression', explanation: '$\\ln|x| + C$. Special case: power rule fails at $n = -1$.' },
    { difficulty: 'medium', question: '$\\int (e^x + 1)\\,dx =$?', accept: ['e^x+x+C', 'e^x + x + C'], placeholder: 'Expression', explanation: '$e^x + x + C$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Evaluate $\\lim_{x \\to 4} \\frac{\\sqrt{x} - 2}{x - 4}$.', steps: [
      { content: 'Direct sub: $\\frac{\\sqrt{4}-2}{4-4} = \\frac{0}{0}$ (indeterminate).' },
      { content: 'Multiply by conjugate: $\\frac{\\sqrt{x}-2}{x-4} \\cdot \\frac{\\sqrt{x}+2}{\\sqrt{x}+2}$.' },
      { content: 'Numerator becomes: $(\\sqrt{x})^2 - 4 = x - 4$.' },
      { content: 'Cancel: $\\frac{x-4}{(x-4)(\\sqrt{x}+2)} = \\frac{1}{\\sqrt{x}+2}$.' },
      { content: '$\\lim_{x \\to 4} \\frac{1}{\\sqrt{x}+2} = \\frac{1}{4}$.' },
    { difficulty: 'hard', question: 'Find $F(x)$ if $F\'(x) = 6x^2 - 4x + 1$ and $F(0) = 3$.', steps: [
      { content: '$F(x) = 2x^3 - 2x^2 + x + C$.' },
      { content: '$F(0) = 0 - 0 + 0 + C = 3$. So $C = 3$.' },
      { content: '$F(x) = 2x^3 - 2x^2 + x + 3$.' }
    ], explanation: 'Initial value problem: integrate, then use the given condition to find $C$.' }
    ], explanation: 'Conjugate multiplication resolves $0/0$ forms with square roots.' },
    { difficulty: 'hard', question: 'Evaluate $\\lim_{x \\to 0} \\frac{1-\\cos x}{x^2}$.', steps: [
      { content: 'Direct sub: $\\frac{0}{0}$ (indeterminate).' },
      { content: 'Multiply num/den by $\\frac{1+\\cos x}{1+\\cos x}$: $\\frac{(1-\\cos x)(1+\\cos x)}{x^2(1+\\cos x)}$.' },
      { content: 'Numerator: $1-\\cos^2 x = \\sin^2 x$.' },
      { content: '$\\frac{\\sin^2 x}{x^2(1+\\cos x)} = \\left(\\frac{\\sin x}{x}\\right)^2 \\cdot \\frac{1}{1+\\cos x}$.' },
      { content: '$= 1^2 \\cdot \\frac{1}{1+1} = \\frac{1}{2}$.' }
    ], explanation: 'Use the identity $1-\\cos^2 x = \\sin^2 x$ and the known limit $\\sin x / x \\to 1$.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Analyze continuity of $f(x) = \\frac{x^2-1}{x-1}$.', parts: [
      { question: 'What is the domain of $f$?', accept: ['all x except 1', 'x != 1', 'x not equal to 1', 'R\\{1}'], placeholder: 'Domain', explanation: '$x - 1 = 0$ when $x = 1$. Domain: all reals except 1.' },
      { question: 'Simplify $f(x)$ for $x \\neq 1$:', accept: ['x+1'], placeholder: 'Simplified form', explanation: '$\\frac{(x-1)(x+1)}{x-1} = x+1$ for $x \\neq 1$.' },
      { question: '$\\lim_{x \\to 1} f(x) =$?', accept: [2, '2'], placeholder: 'Limit value', explanation: '$\\lim_{x \\to 1}(x+1) = 2$.' },
      { question: 'What type of discontinuity at $x = 1$?', accept: ['removable', 'hole'], placeholder: 'Type', explanation: 'Limit exists but $f(1)$ undefined: removable discontinuity (hole).' }
    ], completionMessage: 'Removable discontinuities occur when a common factor cancels but the original function is undefined at that point.' }
  ],
  matching: [
    { difficulty: 'medium', instruction: 'Match each limit strategy to when it applies:', pairs: [
      { left: 'Direct substitution', right: 'Function is continuous at point' },
      { left: 'Factor and cancel', right: '$0/0$ from polynomial' },
      { left: 'Conjugate multiplication', right: '$0/0$ involving square roots' },
      { left: 'Divide by highest power', right: '$\\infty/\\infty$ at infinity' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Continuity definition:', expression: '$f$ is continuous at $a$ if $\\lim_{x \\to a} f(x) =$ {{0}}.', blanks: [ { accept: ['f(a)'], size: 6 } ], explanation: 'Continuity: limit must equal function value.' },
    { difficulty: 'medium', context: 'Limits at infinity:', expression: 'If $\\deg(\\text{num}) < \\deg(\\text{den})$, then $\\lim_{x \\to \\infty} \\frac{P(x)}{Q(x)} =$ {{0}}.', blanks: [ { accept: ['0'], size: 3 } ], explanation: 'Denominator grows faster: ratio approaches 0.' },
    { difficulty: 'easy', context: 'Power rule for integration:', expression: '$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$, provided $n \\neq$ {{0}}.', blanks: [ { accept: ['-1'], size: 3 } ], explanation: 'Power rule fails at $n = -1$. That case gives $\\ln|x| + C$.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Limits Strategy</h4>
    <ol><li><strong>Try direct substitution first.</strong></li>
    <li><strong>$\\frac{0}{0}$?</strong> Factor, cancel. Or multiply by conjugate for roots.</li>
    <li><strong>$\\frac{\\infty}{\\infty}$?</strong> Divide by highest power of $x$.</li>
    <li><strong>One-sided limits:</strong> If left ≠ right, the two-sided limit DNE.</li></ol></div>` }
},

/* TOPIC 6.2: Derivatives : Definition & Rules */
{
  id: 'derivatives-rules',
  title: 'Derivatives: Definition & Differentiation Rules',
  description: 'The derivative measures instantaneous rate of change. It is the slope of the tangent line to a curve at a point.',
  prereqRecap: [
    { term: 'Limit', definition: '$\\lim_{x \\to a} f(x) = L$: the value $f(x)$ approaches as $x$ approaches $a$ (Topic 6.1).' },
    { term: 'Slope', definition: 'For a line through $(x_1,y_1)$ and $(x_2,y_2)$: $m = \\frac{y_2 - y_1}{x_2 - x_1}$.' },
    { term: 'Tangent Line', definition: 'A line that touches a curve at exactly one point (locally) and has the same slope as the curve at that point.' }
  ],
  whyExists: { html: `
    <p><strong>Why derivatives?</strong> Velocity is the derivative of position. Acceleration is the derivative of velocity. Marginal cost is the derivative of total cost. ANY quantity that changes has a derivative describing HOW FAST it changes at each instant.</p>
    ${WHY('The limit definition', '<p>$$f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$</p><p>$\\frac{f(x+h) - f(x)}{h}$ is the slope of a secant line. As $h \\to 0$, the secant approaches the tangent. The limit IS the instantaneous slope.</p>')}
  ` },
  concept: { html: `
    <div class="callout callout-key"><h4>Basic Differentiation Rules</h4>
    <ul>
      <li><strong>Constant:</strong> $\\frac{d}{dx}[c] = 0$</li>
      <li><strong>Power Rule:</strong> $\\frac{d}{dx}[x^n] = nx^{n-1}$ ${WHY('Why?', '<p>From the limit definition: $\\frac{(x+h)^n - x^n}{h}$. Expand using binomial theorem, cancel, take limit. The leading term is $nx^{n-1}$.</p>')}</li>
      <li><strong>Constant Multiple:</strong> $\\frac{d}{dx}[cf(x)] = cf\'(x)$</li>
      <li><strong>Sum/Difference:</strong> $(f \\pm g)\' = f\' \\pm g\'$</li>
      <li><strong>Product Rule:</strong> $(fg)\' = f\'g + fg\'$ ${WHY('Why not $f\' \\cdot g\'$?', '<p>Consider $f = x$, $g = x$. $(fg) = x^2$, so $(fg)\' = 2x$. But $f\' \\cdot g\' = 1 \\cdot 1 = 1 \\neq 2x$. The product rule accounts for BOTH factors changing simultaneously.</p>')}</li>
      <li><strong>Quotient Rule:</strong> $(\\frac{f}{g})\' = \\frac{f\'g - fg\'}{g^2}$</li>
      <li><strong>Chain Rule:</strong> $\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)$ ${WHY('Why?', '<p>The chain rule handles composition. If $y = f(u)$ and $u = g(x)$, then $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$. Rates multiply: if $y$ changes 3�: as fast as $u$, and $u$ changes 2�: as fast as $x$, then $y$ changes 6�: as fast as $x$.</p>')}</li>
    </ul></div>
    <div class="callout callout-key"><h4>Common Derivatives</h4>
    <ul>
      <li>$\\frac{d}{dx}[\\sin x] = \\cos x$, $\\frac{d}{dx}[\\cos x] = -\\sin x$</li>
      <li>$\\frac{d}{dx}[e^x] = e^x$, $\\frac{d}{dx}[\\ln x] = \\frac{1}{x}$</li>
      <li>$\\frac{d}{dx}[\\tan x] = \\sec^2 x$</li>
    </ul></div>
  ` },
  definition: { html: `<p><strong>Derivative:</strong> $f\'(a) = \\lim_{h \\to 0}\\frac{f(a+h)-f(a)}{h}$, the instantaneous rate of change of $f$ at $x = a$.</p>` },
  examples: [{
    title: 'Applying Differentiation Rules',
    problem: 'Find $\\frac{d}{dx}[3x^4 - 5\\sin x + e^x]$ and $\\frac{d}{dx}[x^2 \\ln x]$.',
    steps: [
      { title: 'Sum/constant multiple', content: '$12x^3 - 5\\cos x + e^x$', why: 'Power rule: $4 \\cdot 3x^3 = 12x^3$. $\\frac{d}{dx}[\\sin x] = \\cos x$. $\\frac{d}{dx}[e^x] = e^x$.' },
      { title: 'Product rule for $x^2 \\ln x$', content: '$f = x^2, g = \\ln x$. $f\' = 2x, g\' = \\frac{1}{x}$. $(fg)\' = 2x \\ln x + x^2 \\cdot \\frac{1}{x} = 2x\\ln x + x$.', why: '$(fg)\' = f\'g + fg\'$. Each factor is differentiated while the other is held constant.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a derivative?', back: 'Instantaneous rate of change: lim [f(a+h)-f(a)]/h as h->0. Slope of tangent line at a point.' },
      { type: 'why', front: 'Why is the derivative a limit?', back: 'Slope between two points = [f(a+h)-f(a)]/h. As h->0, secant becomes tangent. Limit gives exact slope.' },
      { type: 'how', front: 'Why does the power rule work?', back: 'Expand (x+h)^n by binomial theorem. After subtracting, dividing by h, and letting h->0: nx^(n-1).' },
      { type: 'why', front: 'Why chain rule uses multiplication?', back: 'Rates compound: dy/dx = dy/du * du/dx. Like converting units: miles/hour * hours/minute.' }
    ],
    exercises: [
    { difficulty: 'easy', question: '$\\frac{d}{dx}[x^5] = $?', options: ['$5x^4$', '$5x^5$', '$x^4$', '$4x^5$'], correctIndex: 0, hint: '<p>Power rule: bring down the exponent, reduce by 1.</p>', correctExplanation: 'Power rule: $nx^{n-1} = 5x^4$.', wrongExplanations: { 1: 'The exponent decreases by 1: $x^{5-1} = x^4$.', 2: 'You dropped the coefficient: $5 \\cdot x^4$, not just $x^4$.', 3: 'The coefficient comes from the old exponent (5), and the new exponent is $5-1=4$.' } },
    { difficulty: 'easy', question: '$\\frac{d}{dx}[\\cos x] = $?', options: ['$\\sin x$', '$-\\sin x$', '$-\\cos x$', '$\\sec^2 x$'], correctIndex: 1, hint: '<p>The derivative of cosine has a negative sign.</p>', correctExplanation: '$\\frac{d}{dx}[\\cos x] = -\\sin x$.', wrongExplanations: { 0: 'Missing the negative sign. $\\cos\' = -\\sin$, not $+\\sin$.', 2: '$-\\cos x$ is the derivative of $\\sin x$ integrated... no. $\\cos\' = -\\sin$.', 3: 'That is the derivative of $\\tan x$.' } },
    { difficulty: 'medium', question: 'Find $f\'(x)$ if $f(x) = (3x + 1)^5$:', options: ['$5(3x+1)^4$', '$15(3x+1)^4$', '$5(3x+1)^4 \\cdot 3x$', '$(15x+5)^4$'], correctIndex: 1, hint: '<p>Chain rule: outer derivative �: inner derivative.</p>', correctExplanation: 'Outer: $5(3x+1)^4$. Inner derivative: $3$. Product: $15(3x+1)^4$.', wrongExplanations: { 0: 'Missing the inner derivative. Chain rule requires multiplying by $\\frac{d}{dx}[3x+1] = 3$.', 2: 'Inner derivative is $3$, not $3x$.', 3: 'You cannot distribute the 5 inside the parentheses.' } },
    { difficulty: 'medium', question: '$\\frac{d}{dx}[x \\cdot e^x] = $?', options: ['$e^x$', '$xe^x$', '$e^x + xe^x$', '$xe^x + e^{x-1}$'], correctIndex: 2, hint: '<p>Product rule: $f = x, g = e^x$.</p>', correctExplanation: '$f\'g + fg\' = (1)(e^x) + (x)(e^x) = e^x + xe^x = (1+x)e^x$.', wrongExplanations: { 0: 'Product rule gives TWO terms: $f\'g + fg\'$.', 1: 'Missing the $f\'g = 1 \\cdot e^x = e^x$ term.', 3: '$\\frac{d}{dx}[e^x] = e^x$, not $e^{x-1}$.' } },
    { difficulty: 'hard', question: '$\\frac{d}{dx}[\\sin(x^2)] = $?', options: ['$\\cos(x^2)$', '$2x\\cos(x^2)$', '$2x\\sin(x^2)$', '$\\cos(2x)$'], correctIndex: 1, hint: '<p>Chain rule: outer = $\\sin(u)$, inner = $u = x^2$.</p>', correctExplanation: 'Outer derivative: $\\cos(x^2)$. Inner derivative: $2x$. Chain rule: $2x\\cos(x^2)$.', wrongExplanations: { 0: 'Missing the inner derivative $2x$. Chain rule is essential here.', 2: 'The outer derivative of $\\sin$ is $\\cos$, not $\\sin$.', 3: '$\\cos(2x)$ is the derivative of $\\sin(2x)$, not $\\sin(x^2)$.' } },
    { difficulty: 'hard', question: '$\\frac{d}{dx}\\left[\\frac{x}{x+1}\\right] = $?', options: ['$\\frac{1}{x+1}$', '$\\frac{1}{(x+1)^2}$', '$\\frac{x}{(x+1)^2}$', '$\\frac{-1}{(x+1)^2}$'], correctIndex: 1, hint: '<p>Quotient rule: $\\frac{f\'g - fg\'}{g^2}$.</p>', correctExplanation: '$f = x, g = x+1. f\' = 1, g\' = 1$. $\\frac{1(x+1) - x(1)}{(x+1)^2} = \\frac{1}{(x+1)^2}$.', wrongExplanations: { 0: 'Denominator should be $(x+1)^2$, not $(x+1)$.', 2: 'Numerator: $(x+1) - x = 1$, not $x$.', 3: 'Numerator is $+1$, not $-1$.' } }
  ,

    {
      question: 'The derivative of f(x) = x^4 - 3x^2 + 5 is:',
      type: 'mc',
      options: ['4x^3 - 6x', '4x^3 - 6x + 5', 'x^5/5 - x^3', '4x^4 - 6x^2'],
      correctIndex: 0,
      solution: { steps: ['Power rule: d/dx(x^n) = nx^(n-1).', 'd/dx(x^4) = 4x^3.', 'd/dx(-3x^2) = -6x.', 'd/dx(5) = 0.', 'f\'(x) = 4x^3 - 6x.'] }
    },
    {
      question: 'If f(x) = sin(x) * x^2, then f\'(x) uses which rule?',
      type: 'mc',
      options: ['Product rule: f\' = sin(x)*2x + x^2*cos(x)', 'Chain rule', 'Power rule only', 'Quotient rule'],
      correctIndex: 0,
      solution: { steps: ['f(x) is a product of two functions: sin(x) and x^2.', 'Product rule: (uv)\' = u\'v + uv\'.', 'f\'(x) = cos(x)*x^2 + sin(x)*2x.'] }
    }
    ],
  freeResponse: [
    { difficulty: 'easy', question: '$\\frac{d}{dx}[x^5] =$?', accept: ['5x^4', '5x4'], placeholder: 'e.g. 5x^4', explanation: 'Power rule: $5x^4$.' },
    { difficulty: 'easy', question: '$\\frac{d}{dx}[7] =$?', accept: [0, '0'], placeholder: 'Enter a number', explanation: 'Derivative of a constant is 0.' },
    { difficulty: 'medium', question: '$\\frac{d}{dx}[3x^2 + 2x - 7] =$?', accept: ['6x+2', '6x + 2'], placeholder: 'e.g. 6x+2', explanation: '$6x + 2$.' },
    { difficulty: 'medium', question: 'The tangent line to $y = x^2$ at $x = 3$ has slope:', accept: [6, '6'], placeholder: 'Slope', explanation: '$y\' = 2x$. At $x = 3$: slope $= 6$.' },
    { difficulty: 'hard', question: '$\\frac{d}{dx}[e^{3x}] =$?', accept: ['3e^(3x)', '3e^{3x}', '3e^3x'], placeholder: 'e.g. 3e^(3x)', explanation: 'Chain rule: $e^{3x} \\cdot 3 = 3e^{3x}$.' },
    { difficulty: 'hard', question: '$\\frac{d}{dx}[\\ln(x^2+1)] =$?', accept: ['2x/(x^2+1)', '2x/(x^2 + 1)'], placeholder: 'e.g. 2x/(x^2+1)', explanation: 'Chain rule: $\\frac{1}{x^2+1} \\cdot 2x$.' },
    { difficulty: 'easy', question: '$\\int_0^2 3\\,dx =$?', accept: [6, '6'], placeholder: 'Number', explanation: '$3 \\cdot 2 = 6$. Area of a $3 \\times 2$ rectangle.' },
    { difficulty: 'medium', question: '$\\int_1^4 \\sqrt{x}\\,dx =$?', accept: ['14/3', '4.67'], placeholder: 'Number', explanation: '$[\\frac{2}{3}x^{3/2}]_1^4 = \\frac{2}{3}(8 - 1) = 14/3$.' },
    { difficulty: 'medium', question: '$\\int_1^4 \\sqrt{x}\\,dx =$?', accept: ['14/3', '4.67'], placeholder: 'Number', explanation: '$[\\frac{2}{3}x^{3/2}]_1^4 = \\frac{2}{3}(8 - 1) = \\frac{14}{3}$.' },
    { difficulty: 'hard', question: '$\\int_0^2 (3x^2 - 2x)\\,dx =$?', accept: [4, '4'], placeholder: 'Number', explanation: '$[x^3 - x^2]_0^2 = 8 - 4 = 4$.' },
    { difficulty: 'medium', question: 'Left Riemann sum uses which endpoint of each subinterval?', accept: ['left'], placeholder: 'Which?', explanation: 'Left Riemann sum: $f(x_{i-1})$.' },
    { difficulty: 'hard', question: 'Trapezoidal rule uses _____ instead of rectangles.', accept: ['trapezoids'], placeholder: 'Shape', explanation: 'Trapezoidal rule: approximate area with trapezoids for better accuracy.' },
    { difficulty: 'hard', question: 'Midpoint rule uses the function value at the _____ of each subinterval.', accept: ['midpoint', 'center', 'middle'], placeholder: 'Where?', explanation: 'Midpoint rule: evaluate $f$ at the midpoint of each subinterval.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Differentiate $f(x) = x^3 \\cdot e^x$ using the product rule.', steps: [
      { content: 'Identify: $u = x^3$, $v = e^x$.' },
      { content: '$u\' = 3x^2$, $v\' = e^x$.' },
      { content: 'Product rule: $u\'v + uv\' = 3x^2 e^x + x^3 e^x$.' },
      { content: 'Factor: $e^x(3x^2 + x^3) = x^2 e^x(3 + x)$.' }
    ], explanation: 'Product rule: $(uv)\' = u\'v + uv\'$. Factor when possible.' },
    { difficulty: 'hard', question: 'Differentiate $f(x) = \\frac{\\sin x}{x^2}$ using the quotient rule.', steps: [
      { content: '$u = \\sin x$, $v = x^2$. $u\' = \\cos x$, $v\' = 2x$.' },
      { content: 'Quotient rule: $\\frac{u\'v - uv\'}{v^2} = \\frac{\\cos x \\cdot x^2 - \\sin x \\cdot 2x}{x^4}$.' },
      { content: 'Factor numerator: $\\frac{x(x\\cos x - 2\\sin x)}{x^4} = \\frac{x\\cos x - 2\\sin x}{x^3}$.' }
    ], explanation: 'Quotient rule: $(u/v)\' = (u\'v - uv\') / v^2$.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Find the equation of the tangent line to $y = x^3$ at $x = 2$.', parts: [
      { question: 'Find $y(2)$:', accept: [8, '8'], placeholder: 'y(2) = ?', explanation: '$2^3 = 8$.' },
      { question: 'Find $y\'(x)$:', accept: ['3x^2', '3x2'], placeholder: 'y\' = ?', explanation: 'Power rule: $3x^2$.' },
      { question: 'Find the slope at $x = 2$:', accept: [12, '12'], placeholder: 'slope = ?', explanation: '$3(2)^2 = 12$.' },
      { question: 'Write the tangent line: $y - 8 = 12(x - 2)$. Simplify:', accept: ['y=12x-16', 'y = 12x - 16'], placeholder: 'y = ?', explanation: '$y = 12x - 24 + 8 = 12x - 16$.' },
    { difficulty: 'medium', question: 'Use Riemann sums on $f(x) = x^2$, $[0,2]$, $n=2$ (right endpoints).', parts: [
      { question: '$\\Delta x =$?', accept: [1, '1'], placeholder: 'Width', explanation: '$\\Delta x = (2-0)/2 = 1$.' },
      { question: 'Sum: $f(1)\\cdot 1 + f(2)\\cdot 1 =$?', accept: [5, '5'], placeholder: 'Sum', explanation: '$1 + 4 = 5$.' }
    ], completionMessage: 'Riemann sum approximates $\\int_a^b f$. Exact value is $8/3 \\approx 2.67$.' }
    ], completionMessage: 'Tangent line at $(a, f(a))$: $y - f(a) = f\'(a)(x - a)$.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each rule to its formula:', pairs: [
      { left: 'Power rule', right: '$\\frac{d}{dx}[x^n] = nx^{n-1}$' },
      { left: 'Product rule', right: '$(fg)\' = f\'g + fg\'$' },
      { left: 'Chain rule', right: '$[f(g(x))]\' = f\'(g(x)) \\cdot g\'(x)$' },
      { left: 'Quotient rule', right: '$(f/g)\' = \\frac{f\'g - fg\'}{g^2}$' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Power rule:', expression: '$\\frac{d}{dx}[x^n] =$ {{0}} $\\cdot x^{n-1}$', blanks: [ { accept: ['n'], size: 3 } ], explanation: 'Bring down the exponent.' },
    { difficulty: 'medium', context: 'Chain rule:', expression: '$\\frac{d}{dx}[f(g(x))] = f\'($ {{0}} $) \\cdot$ {{1}}', blanks: [ { accept: ['g(x)'], size: 6 }, { accept: ["g'(x)"], size: 6 } ], explanation: 'Derivative of outside at inside, times derivative of inside.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Derivative Strategy</h4>
    <ol><li><strong>Identify the structure:</strong> Is it a sum, product, quotient, or composition?</li>
    <li><strong>Apply the matching rule:</strong> Sum → term by term. Product → $f'g + fg'$. Quotient → $\\frac{f'g-fg'}{g^2}$. Composition → chain rule.</li>
    <li><strong>Chain rule:</strong> "Derivative of the outside �: derivative of the inside."</li></ol></div>` }
},

/* TOPIC 6.3: Applications of Derivatives */
{
  id: 'derivative-applications',
  title: 'Applications of Derivatives',
  description: 'Using derivatives to find extrema, sketch curves, and solve optimization problems.',
  prereqRecap: [
    { term: 'Derivative', definition: '$f\'(x)$ = instantaneous rate of change = slope of tangent line (Topic 6.2).' },
    { term: 'Critical Point', definition: 'A value $c$ where $f\'(c) = 0$ or $f\'(c)$ is undefined.' },
    { term: 'Interval', definition: 'A connected subset of $\\mathbb{R}$: $(a,b)$, $[a,b]$, etc. (Module 2).' }
  ],
  whyExists: { html: `
    <p><strong>Why applications?</strong> Derivatives answer real questions: What dimensions maximize volume? Where is profit maximized? When does a projectile reach peak height? The derivative's sign tells us WHERE a function increases/decreases and WHERE extrema occur.</p>
  ` },
  formalDefinitions: [
      { term: 'Critical Point', symbol: '', definition: 'A value $c$ in the domain of $f$ where $f\\prime(c) = 0$ or $f\\prime(c)$ does not exist. Local extrema can only occur at critical points (Fermat\'s Theorem).' },
      { term: 'Mean Value Theorem', symbol: '', definition: 'If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there exists $c \\in (a,b)$ such that $f\\prime(c) = \\frac{f(b) - f(a)}{b - a}$. The average rate of change equals the instantaneous rate somewhere.' },
      { term: 'Concavity', symbol: '', definition: '$f$ is concave up on an interval if $f\\prime\\prime > 0$ (tangent lines lie below the graph). Concave down if $f\\prime\\prime < 0$. Inflection point: where concavity changes.' }
    ],
    concept: { html: `
    <div class="callout callout-key"><h4>Mean Value Theorem (MVT)</h4>
    <p>If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then $\\exists c \\in (a,b)$ such that:</p>
    <div class="math-block">$$f'(c) = \\frac{f(b) - f(a)}{b - a}$$</div>
    <p>Interpretation: at some point, the instantaneous rate of change equals the average rate of change. The tangent line is parallel to the secant line. This theorem is the theoretical backbone of the First Derivative Test.</p>
    <p>Special case (Rolle's Theorem): if $f(a) = f(b)$, then $\\exists c$ with $f'(c) = 0$.</p></div>

    <div class="callout callout-key"><h4>L'H\u00f4pital's Rule</h4>
    <p>If $\\lim_{x \\to a} \\frac{f(x)}{g(x)}$ yields $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$, then:</p>
    <div class="math-block">$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$$</div>
    <p>provided the right side exists. Can be applied repeatedly. Also works for $x \\to \\pm\\infty$.</p>
    <p>Example: $\\lim_{x \\to 0}\\frac{\\sin x}{x} = \\lim_{x \\to 0}\\frac{\\cos x}{1} = 1$.</p></div>

    <div class="callout callout-key"><h4>Extreme Value Theorem</h4>
    <p>If $f$ is continuous on a closed interval $[a,b]$, then $f$ attains both an absolute maximum and an absolute minimum on $[a,b]$.</p>
    <p>To find them: evaluate $f$ at all critical points in $(a,b)$ AND at both endpoints $a, b$. The largest value is the absolute max; the smallest is the absolute min.</p></div>

    <div class="callout callout-key"><h4>First Derivative Test</h4>
    <ul>
      <li>$f'(x) \\gt 0$: $f$ is <strong>increasing</strong>.</li>
      <li>$f'(x) \\lt 0$: $f$ is <strong>decreasing</strong>.</li>
      <li>$f'$ changes from $+$ to $-$: <strong>local maximum</strong>.</li>
      <li>$f'$ changes from $-$ to $+$: <strong>local minimum</strong>.</li>
    </ul></div>

    <div class="callout callout-key"><h4>Second Derivative Test</h4>
    <p>At a critical point $c$ (where $f'(c) = 0$):</p>
    <ul>
      <li>$f''(c) \\gt 0$: concave up, <strong>local minimum</strong>.</li>
      <li>$f''(c) \\lt 0$: concave down, <strong>local maximum</strong>.</li>
      <li>$f''(c) = 0$: test is inconclusive (use first derivative test instead).</li>
    </ul>
    ${WHY('Why does concavity determine max/min?', '<p>Concave up ($f\'\'  > 0$) means the slope is increasing. At a critical point where slope = 0, the slope goes from negative to positive: the function dips then rises. That is a minimum. Conversely for concave down.</p>')}</div>

    <div class="callout callout-key"><h4>Curve Sketching Procedure</h4>
    <ol>
      <li><strong>Domain</strong>: where is $f$ defined?</li>
      <li><strong>Intercepts</strong>: $y$-intercept ($x=0$), $x$-intercepts ($f(x)=0$).</li>
      <li><strong>Symmetry</strong>: even ($f(-x)=f(x)$), odd ($f(-x)=-f(x)$)?</li>
      <li><strong>Asymptotes</strong>: vertical and horizontal.</li>
      <li><strong>Increasing/Decreasing</strong>: sign chart of $f'$.</li>
      <li><strong>Local extrema</strong>: critical points + first/second derivative test.</li>
      <li><strong>Concavity</strong>: sign chart of $f''$. Inflection points where $f''$ changes sign.</li>
    </ol></div>

    <div class="callout callout-key"><h4>Related Rates Strategy</h4>
    <ol>
      <li>Draw a diagram. Label all quantities that change with time as functions of $t$.</li>
      <li>Write an equation relating the variables (geometric, physical, etc.).</li>
      <li>Differentiate both sides with respect to $t$ (implicit differentiation).</li>
      <li>Substitute known values and solve for the unknown rate.</li>
    </ol>
    <p>Example: A ladder 10 ft long leans against a wall. Base slides away at 2 ft/s. How fast does the top slide down when base is 6 ft out? $x^2 + y^2 = 100$. Differentiating: $2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$. At $x=6$: $y=8$. $\\frac{dy}{dt} = -\\frac{6}{8}(2) = -1.5$ ft/s.</p></div>

    <div class="callout callout-key"><h4>Optimization Strategy</h4>
    <ol>
      <li>Identify the quantity to maximize/minimize. Write it as a function of one variable.</li>
      <li>Find the domain (physical constraints).</li>
      <li>Take the derivative, set = 0, solve for critical points.</li>
      <li>Check endpoints and critical points. The largest/smallest value is the answer.</li>
    </ol></div>
  ` },
  definition: { html: `<p><strong>Local Maximum:</strong> $f(c) \\geq f(x)$ for all $x$ near $c$. <strong>Global Maximum:</strong> $f(c) \\geq f(x)$ for ALL $x$ in the domain.</p>` },
  examples: [{
    title: 'Finding Extrema',
    problem: 'Find the local extrema of $f(x) = x^3 - 3x + 2$.',
    steps: [
      { title: 'Differentiate', content: '$f\'(x) = 3x^2 - 3$.', why: 'Power rule on each term.' },
      { title: 'Find critical points', content: '$3x^2 - 3 = 0 \\Rightarrow x^2 = 1 \\Rightarrow x = \\pm 1$.', why: 'Set derivative = 0 and solve.' },
      { title: 'Second derivative test', content: '$f\'\'(x) = 6x$. $f\'\'(-1) = -6 \\lt 0$: local max at $x = -1$. $f\'\'(1) = 6 \\gt 0$: local min at $x = 1$.', why: 'Negative second derivative = concave down = max. Positive = concave up = min.' },
      { title: 'Values', content: '$f(-1) = -1 + 3 + 2 = 4$ (local max). $f(1) = 1 - 3 + 2 = 0$ (local min).', why: 'Substitute critical points into the original function.' }
    ]
  },
  {
    title: 'Related Rates: Expanding Circle',
    problem: 'A stone is dropped in a pond, creating a circular ripple. The radius expands at 3 ft/s. How fast is the area increasing when $r = 10$ ft?',
    steps: [
      { title: 'Write the relationship', content: '$A = \\pi r^2$.', why: 'Area of a circle relates to radius.' },
      { title: 'Differentiate with respect to $t$', content: '$\\frac{dA}{dt} = 2\\pi r \\cdot \\frac{dr}{dt}$.', why: 'Chain rule: $r$ is a function of time. Both sides are differentiated with respect to $t$.' },
      { title: 'Substitute known values', content: '$\\frac{dA}{dt} = 2\\pi(10)(3) = 60\\pi \\approx 188.5$ ft\\u00b2/s.', why: '$r = 10$ and $\\frac{dr}{dt} = 3$.' }
    ]
  },
  {
    title: 'Optimization: Open-Top Box',
    problem: 'A sheet of cardboard is 20 cm �: 20 cm. Cut equal squares from corners and fold up to make an open-top box. What cut size $x$ maximizes volume?',
    steps: [
      { title: 'Express volume', content: 'Base: $(20-2x)$ �: $(20-2x)$. Height: $x$. $V = x(20-2x)^2$.', why: 'Each side loses $2x$ from the cut squares. The cut depth becomes the height.' },
      { title: 'Expand and differentiate', content: '$V = x(400 - 80x + 4x^2) = 4x^3 - 80x^2 + 400x$. $\\frac{dV}{dx} = 12x^2 - 160x + 400$.', why: 'Polynomial multiplication, then power rule.' },
      { title: 'Set derivative = 0', content: '$12x^2 - 160x + 400 = 0$. $3x^2 - 40x + 100 = 0$. Quadratic formula: $x = \\frac{40 \\pm \\sqrt{1600-1200}}{6} = \\frac{40 \\pm 20}{6}$. $x = 10$ or $x = 10/3$.', why: 'Divide by 4, then use the quadratic formula.' },
      { title: 'Choose valid solution', content: '$x = 10$ makes base width $= 0$ (no box). So $x = 10/3 \\approx 3.33$ cm.', why: 'Physical constraint: $0 < x \\lt 10$. Only $x = 10/3$ gives a real box.' },
      { title: 'Max volume', content: '$V = \\frac{10}{3}(20 - \\frac{20}{3})^2 = \\frac{10}{3} \\cdot (\\frac{40}{3})^2 = \\frac{10 \\cdot 1600}{27} \\approx 592.6$ cm\\u00b3.', why: 'Substitute $x = 10/3$ into the volume formula.' }
    ]
  }],
  flashCards: [
      { type: 'why', front: 'Why does the derivative equal zero at a maximum or minimum?', back: 'At a peak, the function stops increasing and starts decreasing. The slope (derivative) transitions from positive to negative, passing through zero. Same logic for minima (negative to positive).' },
      { type: 'how', front: 'How do you find absolute extrema on a closed interval?', back: 'Three steps: (1) find critical points (f’=0 or undefined), (2) evaluate f at critical points AND endpoints, (3) the largest value is the absolute max, smallest is the absolute min.' },
      { type: 'how', front: 'How does the second derivative test work?', back: 'At a critical point c: f’’(c) > 0 means concave up (valley) = local min. f’’(c) < 0 means concave down (hill) = local max. f’’(c) = 0 is inconclusive.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'If $f\'(x) \\gt 0$ on $(a, b)$, then $f$ is:', options: ['Decreasing', 'Increasing', 'Constant', 'Concave up'], correctIndex: 1, hint: '<p>Positive derivative means positive slope.</p>', correctExplanation: 'Positive derivative → function is increasing on that interval.', wrongExplanations: { 0: 'Negative derivative means decreasing. Positive means increasing.', 2: 'Constant requires $f\'(x) = 0$, not $ \\gt 0$.', 3: 'Concavity is determined by the SECOND derivative, not the first.' } },
    { difficulty: 'easy', question: 'Critical points of $f(x) = x^2 - 4x$:', options: ['$x = 0$', '$x = 2$', '$x = 4$', '$x = -2$'], correctIndex: 1, hint: '<p>Set $f\'(x) = 0$.</p>', correctExplanation: '$f\'(x) = 2x - 4 = 0 \\Rightarrow x = 2$.', wrongExplanations: { 0: '$f\'(0) = -4 \\neq 0$.', 2: '$f\'(4) = 4 \\neq 0$.', 3: '$f\'(-2) = -8 \\neq 0$.' } },
    { difficulty: 'medium', question: '$f(x) = x^3 - 12x$ has a local minimum at:', options: ['$x = 0$', '$x = 2$', '$x = -2$', '$x = 12$'], correctIndex: 1, hint: '<p>$f\'(x) = 3x^2 - 12 = 0$. Then use second derivative test.</p>', correctExplanation: '$3x^2 = 12 \\Rightarrow x = \\pm 2$. $f\'\'(x) = 6x$. $f\'\'(2) = 12 \\gt 0$: local min at $x = 2$.', wrongExplanations: { 0: '$x = 0$: $f\'(0) = -12 \\neq 0$. Not a critical point.', 2: '$f\'\'(-2) = -12 \\lt 0$: local MAX, not min.', 3: '$x = 12$ is not a critical point.' } },
    { difficulty: 'medium', question: 'An inflection point is where:', options: ['$f\'(x) = 0$', '$f\'\'(x) = 0$ and concavity changes', '$f(x) = 0$', '$f\'\'(x) \\gt 0$'], correctIndex: 1, hint: '<p>Inflection = change in concavity.</p>', correctExplanation: 'An inflection point is where $f\'\'(x) = 0$ (or undefined) AND the concavity actually changes sign.', wrongExplanations: { 0: '$f\'(x) = 0$ gives critical points, not inflection points.', 2: '$f(x) = 0$ gives zeros/roots, unrelated to inflection.', 3: '$f\'\' > 0$ means concave up, not an inflection point.' } },
    { difficulty: 'hard', question: 'Find the absolute maximum of $f(x) = x^2$ on $[-1, 3]$:', options: ['$1$', '$9$', '$0$', '$3$'], correctIndex: 1, hint: '<p>Check critical points AND endpoints.</p>', correctExplanation: '$f\'(x) = 2x = 0 \\Rightarrow x = 0$. Evaluate: $f(-1) = 1$, $f(0) = 0$, $f(3) = 9$. Maximum = 9 at $x = 3$.', wrongExplanations: { 0: 'That is $f(-1) = 1$. But $f(3) = 9 \\gt 1$.', 2: 'That is the local (and global) minimum inside the interval.', 3: '$x = 3$ is where the max occurs, but the max VALUE is $f(3) = 9$.' } },
    { difficulty: 'hard', question: 'A box with square base and no top has volume 32 cm³. Minimize surface area. Base side $x$, height $h$. Which equation relates them?', options: ['$x^2 + h = 32$', '$x^2 h = 32$', '$2x + h = 32$', '$xh^2 = 32$'], correctIndex: 1, hint: '<p>Volume of a box with square base: $V = x^2 \\cdot h$.</p>', correctExplanation: 'Volume = base area �: height = $x^2 \\cdot h = 32$. This is the constraint.', wrongExplanations: { 0: 'This would be a dimension sum, not a volume formula.', 2: 'This is a perimeter-like constraint, not volume.', 3: 'Volume is $x^2 h$, not $xh^2$. The base is square ($x \\times x$).' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'Find the critical point of $f(x) = x^2 - 6x$. $x =$?', accept: [3, '3'], placeholder: 'x = ?', explanation: '$f\'(x) = 2x - 6 = 0 \\Rightarrow x = 3$.' },
    { difficulty: 'easy', question: 'If $f\'(x) \\gt 0$ on an interval, the function is {{?}}:', accept: ['increasing'], placeholder: 'increasing or decreasing', explanation: 'Positive derivative = increasing.' },
    { difficulty: 'medium', question: 'Is $x = 3$ a local min or max for $f(x) = x^2 - 6x$?', accept: ['min', 'minimum', 'local min'], placeholder: 'min or max', explanation: '$f\'\'(x) = 2 \\gt 0$, concave up, so local minimum.' },
    { difficulty: 'medium', question: 'How many critical points does $f(x) = x^3 - 3x$ have?', accept: [2, '2'], placeholder: 'Enter a number', explanation: '$f\'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1$. Two critical points.' },
    { difficulty: 'hard', question: 'Find the absolute max of $f(x) = -x^2 + 4x$ on $[0, 5]$:', accept: [4, '4'], placeholder: 'Max value', explanation: '$f\'(x) = -2x + 4 = 0 \\Rightarrow x = 2$. $f(0)=0, f(2)=4, f(5)=-5$. Max = 4.' },
    { difficulty: 'hard', question: 'A farmer has 100m of fence. Maximize rectangular area $A = x(50-x)$. What is $x$?', accept: [25, '25'], placeholder: 'x = ?', explanation: '$A\' = 50 - 2x = 0 \\Rightarrow x = 25$. Max area = $25 \\times 25 = 625$ m\u00b2.' },
    { difficulty: 'hard', question: 'FTC Part 2: $\\int_a^b f(x)\\,dx = F(b) -$ ?', accept: ['F(a)'], placeholder: 'Expression', explanation: '$\\int_a^b f(x)\\,dx = F(b) - F(a)$.' },
    { difficulty: 'hard', question: '$\\int_0^{\\pi} \\sin x\\,dx =$?', accept: [2, '2'], placeholder: 'Number', explanation: '$[-\\cos x]_0^{\\pi} = -\\cos \\pi - (-\\cos 0) = 1 + 1 = 2$.' },
    { difficulty: 'medium', question: 'If $F(x) = \\int_0^x t^3\\,dt$, then $F\'(x) =$?', accept: ['x^3', 'x3'], placeholder: 'Expression', explanation: 'FTC Part 1: $F\'(x) = x^3$.' },
    { difficulty: 'easy', question: 'FTC connects which two operations?', accept: ['differentiation and integration', 'derivatives and integrals'], placeholder: 'Operations', explanation: 'FTC: differentiation and integration are inverse operations.' },
    { difficulty: 'hard', question: 'Net signed area: if $f(x) < 0$ on $[a,b]$, then $\\int_a^b f\\,dx$ is:', accept: ['negative'], placeholder: 'Sign', explanation: 'Area below $x$-axis contributes negatively to the integral.' },
    { difficulty: 'medium', question: '$\\int_0^1 (2x)\\,dx =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$[x^2]_0^1 = 1$.' },
    { difficulty: 'easy', question: '$\\int_a^a f(x)\\,dx =$?', accept: [0, '0'], placeholder: 'Number', explanation: 'Integral over zero-width interval: $0$.' },
    { difficulty: 'hard', question: '$\\int_0^{\\pi/2} \\cos x\\,dx =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$[\\sin x]_0^{\\pi/2} = 1 - 0 = 1$.' },
    { difficulty: 'medium', question: 'Odd function property: $\\int_{-a}^{a} f(x)\\,dx =$?', accept: [0, '0'], placeholder: 'Number', explanation: 'Odd function: integral over symmetric interval = 0.' }
  ],
  stepBuilder: [
    { difficulty: 'hard', question: 'Optimization: Maximize the area of a rectangle inscribed in the semicircle $y = \\sqrt{4-x^2}$.', steps: [
      { content: 'Rectangle has corners at $(\\pm x, 0)$ and $(\\pm x, \\sqrt{4-x^2})$.' },
      { content: 'Area $A = 2x \\cdot \\sqrt{4-x^2}$ (base = $2x$, height = $\\sqrt{4-x^2}$).' },
      { content: '$A\' = 2\\sqrt{4-x^2} + 2x \\cdot \\frac{-x}{\\sqrt{4-x^2}} = \\frac{2(4-x^2) - 2x^2}{\\sqrt{4-x^2}} = \\frac{8-4x^2}{\\sqrt{4-x^2}}$.' },
      { content: 'Set numerator = 0: $8 - 4x^2 = 0 \\Rightarrow x = \\sqrt{2}$.' },
      { content: 'Max area: $A = 2\\sqrt{2} \\cdot \\sqrt{2} = 4$.' },
    { difficulty: 'medium', question: 'Evaluate $\\frac{d}{dx}\\int_0^x t^2\\,dt$.', steps: [
      { content: 'FTC Part 1: $\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)$.' },
      { content: 'Here $f(t) = t^2$.' },
      { content: 'So $\\frac{d}{dx}\\int_0^x t^2\\,dt = x^2$.' }
    ], explanation: 'FTC1: the derivative of the integral of $f$ from $a$ to $x$ is $f(x)$.' }
    ], explanation: 'Optimization requires: (1) express quantity in one variable, (2) differentiate, (3) set = 0, (4) verify.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Complete curve sketch of $f(x) = x^3 - 3x + 2$.', parts: [
      { question: 'Find $f\'(x)$:', accept: ['3x^2-3', '3x^2 - 3'], placeholder: 'f\'(x) = ?', explanation: '$3x^2 - 3$.' },
      { question: 'Find critical points:', accept: ['1, -1', '-1, 1', '-1,1', '1,-1'], placeholder: 'List x-values', explanation: '$3x^2 = 3 \\Rightarrow x = \\pm 1$.' },
      { question: 'Classify $x = -1$ (local min or max):', accept: ['max', 'local max', 'maximum'], placeholder: 'min or max', explanation: '$f\'\'(-1) = -6 \\lt 0$: concave down = local max.' },
      { question: 'Classify $x = 1$:', accept: ['min', 'local min', 'minimum'], placeholder: 'min or max', explanation: '$f\'\'(1) = 6 \\gt 0$: concave up = local min.' }
    ], completionMessage: 'Curve sketching combines first and second derivative tests to fully characterize a function.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Optimization Strategy</h4>
    <ol><li><strong>Draw a picture.</strong> Label variables.</li>
    <li><strong>Write the objective function</strong> (what to maximize/minimize).</li>
    <li><strong>Write the constraint</strong> and use it to eliminate one variable.</li>
    <li><strong>Differentiate, set = 0, solve.</strong></li>
    <li><strong>Verify</strong> with second derivative test or endpoint comparison.</li></ol></div>` }
},

/* TOPIC 6.4: Integration : Antiderivatives & FTC */
{
  id: 'integration-ftc',
  title: 'Integration: Antiderivatives & the Fundamental Theorem',
  description: 'The reverse of differentiation. Integration computes areas, total change, and accumulation.',
  prereqRecap: [
    { term: 'Derivative', definition: '$f\'(x)$ = instantaneous rate of change (Topic 6.2).' },
    { term: 'Antiderivative', definition: '$F$ is an antiderivative of $f$ if $F\' = f$. Example: $F(x) = x^3$ is an antiderivative of $f(x) = 3x^2$.' },
    { term: 'Area', definition: 'The measure of a region in the plane. For rectangles: $A = \\text{length} \\times \\text{width}$.' }
  ],
  whyExists: { html: `
    <p><strong>Why integration?</strong> Differentiation breaks things apart (rates). Integration puts them back together (totals). If you know the velocity at every instant, integration gives total distance. If you know the rate of production, integration gives total output.</p>
    ${WHY('The FTC connects derivatives and integrals', '<p>The <strong>Fundamental Theorem of Calculus</strong> states: $\\int_a^b f(x)\\,dx = F(b) - F(a)$ where $F\' = f$. Computing an area (a geometric problem) reduces to finding an antiderivative (an algebraic problem). This is one of the most important theorems in all of mathematics.</p>')}
  ` },
  formalDefinitions: [
      { term: 'Definite Integral', symbol: '$\\int_a^b f(x)\\,dx$', definition: 'The signed area between the graph of $f$ and the $x$-axis from $x=a$ to $x=b$. Defined as the limit of Riemann sums: $\\lim_{n\\to\\infty} \\sum_{i=1}^n f(x_i^*)\\Delta x$.' },
      { term: 'Antiderivative', symbol: '$F\\prime(x) = f(x)$', definition: 'A function $F$ whose derivative is $f$. Not unique: if $F$ is an antiderivative, so is $F + C$ for any constant $C$.' },
      { term: 'Fundamental Theorem of Calculus', symbol: '', definition: 'Part 1: $\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)$. Part 2: $\\int_a^b f(x)\\,dx = F(b) - F(a)$ where $F\\prime = f$. Links differentiation and integration as inverse operations.' }
    ],
    background: {
      title: 'The Fundamental Theorem: Why Integration and Differentiation Are Inverses',
      content: '<p>The <strong>Fundamental Theorem of Calculus</strong> (FTC) is arguably the most important theorem in mathematics. It says that differentiation and integration are inverse operations, like addition and subtraction.</p><p><strong>Part 1:</strong> If you accumulate a quantity at a rate $f(x)$, then the rate of change of the accumulated total is $f(x)$ again. Accumulating and then differentiating brings you back to where you started.</p><p><strong>Part 2:</strong> To compute $\\int_a^b f(x)\\,dx$, you do not need to sum infinitely many rectangles. You just find any antiderivative $F$ and compute $F(b) - F(a)$. This transforms an impossible infinite sum into a simple subtraction.</p><p>Before the FTC (1600s), computing areas required exhausting geometric constructions. After the FTC, the same computation takes seconds. This is what made modern physics and engineering possible.</p>'
    },
    mathGrammar: [
      { question: 'What does $\\int f(x)\\,dx$ mean?', answer: 'Read it as "the integral of $f(x)$ with respect to $x$." It asks: "What function, when differentiated, gives $f(x)$?" The $dx$ tells you which variable you are integrating over. The $\\int$ symbol is a stretched "S" for "sum."' },
      { question: 'Why is there a $+ C$ at the end of indefinite integrals?', answer: 'Because many functions have the same derivative. $\\frac{d}{dx}[x^2] = 2x$ and $\\frac{d}{dx}[x^2 + 7] = 2x$. The constant vanishes when you differentiate. So the antiderivative of $2x$ is $x^2 + C$ where $C$ is ANY constant. You need more information (an initial condition) to find the specific $C$.' },
      { question: 'Why does $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$?', answer: 'Because the reverse of the power rule must undo it. If $\\frac{d}{dx}[x^{n+1}] = (n+1)x^n$, then to get $x^n$ from a derivative, the original must have been $\\frac{x^{n+1}}{n+1}$. Dividing by $(n+1)$ cancels the coefficient the power rule creates.' },
      { question: 'What is the difference between definite and indefinite integrals?', answer: 'Indefinite: $\\int f(x)\\,dx = F(x) + C$ (a family of functions). Definite: $\\int_a^b f(x)\\,dx = F(b) - F(a)$ (a single number). The definite integral computes the accumulated total (area, distance, etc.) between $a$ and $b$.' }
    ],
    concept: { html: `
    <div class="callout callout-key"><h4>Basic Antiderivative Rules</h4>
    <ul>
      <li><strong>Power Rule:</strong> $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$ (for $n \\neq -1$)</li>
      <li><strong>Special case:</strong> $\\int x^{-1}\\,dx = \\int \\frac{1}{x}\\,dx = \\ln|x| + C$</li>
      <li>$\\int e^x\\,dx = e^x + C$</li>
      <li>$\\int \\sin x\\,dx = -\\cos x + C$, $\\int \\cos x\\,dx = \\sin x + C$</li>
      <li>$\\int \\sec^2 x\\,dx = \\tan x + C$</li>
    </ul>
    ${WHY('Why $+ C$?', '<p>If $F\' = f$, then $(F + C)\' = f$ for ANY constant $C$. There are infinitely many antiderivatives, differing by a constant. The $+C$ represents this family.</p>')}</div>
    <div class="callout callout-key"><h4>Definite Integrals (FTC)</h4>
    <p>$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$</p>
    <p>This is the NET signed area between $f(x)$ and the x-axis from $x = a$ to $x = b$.</p></div>
    <div class="callout callout-key"><h4>U-Substitution</h4>
    <p>If $\\int f(g(x)) g\'(x)\\,dx$, let $u = g(x)$, $du = g\'(x)\\,dx$. Then $\\int f(u)\\,du$.</p>
    ${WHY('Why does this work?', '<p>U-substitution is the chain rule in reverse. $\\frac{d}{dx}[F(g(x))] = F\'(g(x)) \\cdot g\'(x) = f(g(x)) \\cdot g\'(x)$. Integrating both sides: $\\int f(g(x))g\'(x)\\,dx = F(g(x)) + C$.</p>')}</div>
  ` },
  definition: { html: `<p><strong>Indefinite Integral:</strong> $\\int f(x)\\,dx = F(x) + C$ where $F\' = f$.</p><p><strong>Definite Integral:</strong> $\\int_a^b f(x)\\,dx$ = net signed area under $f$ from $a$ to $b$.</p>` },
  examples: [{
    title: 'Computing Integrals',
    problem: 'Find $\\int (3x^2 + 2x - 1)\\,dx$ and $\\int_0^1 e^x\\,dx$.',
    steps: [
      { title: 'Indefinite integral', content: '$\\int 3x^2\\,dx + \\int 2x\\,dx - \\int 1\\,dx = x^3 + x^2 - x + C$.', why: 'Apply power rule to each term: $\\frac{3x^3}{3} + \\frac{2x^2}{2} - x + C$.' },
      { title: 'Definite integral', content: '$\\int_0^1 e^x\\,dx = [e^x]_0^1 = e^1 - e^0 = e - 1 \\approx 1.718$.', why: 'Antiderivative of $e^x$ is $e^x$. Evaluate at bounds and subtract.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is the Fundamental Theorem of Calculus?', back: 'Part 1: d/dx integral from a to x of f(t)dt = f(x). Part 2: integral from a to b of f(x)dx = F(b)-F(a) where F’=f. Differentiation and integration are inverse operations.' },
      { type: 'why', front: 'Why is the FTC so important?', back: 'Without it, computing integrals would require Riemann sum limits every time. The FTC says: just find an antiderivative and plug in the bounds. It transforms a limit problem into an algebra problem.' },
      { type: 'how', front: 'How to evaluate a definite integral?', back: 'Find antiderivative F(x), then compute F(b) - F(a). Example: integral from 1 to 3 of 2x dx = [x^2] from 1 to 3 = 9 - 1 = 8.' }
    ],
    exercises: [
    { difficulty: 'easy', question: '$\\int x^3\\,dx = $?', options: ['$3x^2 + C$', '$\\frac{x^4}{4} + C$', '$x^4 + C$', '$\\frac{x^3}{3} + C$'], correctIndex: 1, hint: '<p>Power rule for integration: add 1 to exponent, divide by new exponent.</p>', correctExplanation: '$\\frac{x^{3+1}}{3+1} + C = \\frac{x^4}{4} + C$.', wrongExplanations: { 0: 'That is the DERIVATIVE of $x^3$, not the integral.', 2: 'Must divide by the new exponent: $\\frac{x^4}{4}$, not $x^4$.', 3: '$\\frac{x^3}{3}$ is $\\int x^2\\,dx$, not $\\int x^3\\,dx$.' } },
    { difficulty: 'easy', question: '$\\int \\cos x\\,dx = $?', options: ['$-\\sin x + C$', '$\\sin x + C$', '$\\cos x + C$', '$-\\cos x + C$'], correctIndex: 1, hint: '<p>What function has derivative $\\cos x$?</p>', correctExplanation: '$\\frac{d}{dx}[\\sin x] = \\cos x$, so $\\int \\cos x\\,dx = \\sin x + C$.', wrongExplanations: { 0: '$\\frac{d}{dx}[-\\sin x] = -\\cos x$, not $\\cos x$.', 2: '$\\frac{d}{dx}[\\cos x] = -\\sin x \\neq \\cos x$.', 3: '$-\\cos x$ is the antiderivative of $\\sin x$.' } },
    { difficulty: 'medium', question: '$\\int_1^2 3x^2\\,dx = $?', options: ['$7$', '$8$', '$9$', '$12$'], correctIndex: 0, hint: '<p>Antiderivative of $3x^2$ is $x^3$. Evaluate at bounds.</p>', correctExplanation: '$[x^3]_1^2 = 2^3 - 1^3 = 8 - 1 = 7$.', wrongExplanations: { 1: '$2^3 = 8$ is the upper bound evaluation only. Subtract $1^3 = 1$.', 2: '$8 + 1 = 9$? Subtract, don\'t add: $8 - 1 = 7$.', 3: '$3 \\cdot 2^2 = 12$ is $f(2)$, not the integral. Integrate first, then evaluate.' } },
    { difficulty: 'medium', question: '$\\int 2xe^{x^2}\\,dx = $?', options: ['$2e^{x^2} + C$', '$e^{x^2} + C$', '$x^2 e^{x^2} + C$', '$\\frac{e^{x^3}}{3} + C$'], correctIndex: 1, hint: '<p>Let $u = x^2$, $du = 2x\\,dx$.</p>', correctExplanation: '$u = x^2$, $du = 2x\\,dx$. $\\int e^u\\,du = e^u + C = e^{x^2} + C$.', wrongExplanations: { 0: 'The $2x$ is absorbed by $du = 2x\\,dx$. No extra factor of 2.', 2: 'The antiderivative of $e^u$ is $e^u$, not $ue^u$.', 3: 'The substitution is $u = x^2$, not $u = x^3$.' } },
    { difficulty: 'hard', question: '$\\int_0^{\\pi} \\sin x\\,dx = $?', options: ['$0$', '$1$', '$2$', '$-2$'], correctIndex: 2, hint: '<p>Antiderivative of $\\sin x$ is $-\\cos x$.</p>', correctExplanation: '$[-\\cos x]_0^{\\pi} = -\\cos(\\pi) - (-\\cos(0)) = -(-1) - (-1) = 1 + 1 = 2$.', wrongExplanations: { 0: 'The integral of $\\sin x$ from $0$ to $2\\pi$ is 0 (symmetric), but from $0$ to $\\pi$ it is 2.', 1: 'Check: $-\\cos(\\pi) = 1$ and $-\\cos(0) = -1$. $1 - (-1) = 2$.', 3: 'The area under $\\sin x$ from $0$ to $\\pi$ is positive: the curve is above the x-axis.' } },
    { difficulty: 'hard', question: 'If $F\'(x) = f(x)$ and $\\int_1^3 f(x)\\,dx = 10$, what is $F(3) - F(1)$?', options: ['$10$', '$-10$', '$f(3) - f(1)$', 'Cannot determine'], correctIndex: 0, hint: '<p>This is the FTC directly.</p>', correctExplanation: 'FTC: $\\int_1^3 f(x)\\,dx = F(3) - F(1) = 10$.', wrongExplanations: { 1: 'The FTC says the integral EQUALS $F(b) - F(a)$, with the same sign.', 2: '$f(3) - f(1)$ would involve the integrand values, not the antiderivative.', 3: 'The FTC gives the exact answer: $F(3) - F(1) = 10$.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: '$\\int x^3\\,dx =$? (include +C)', accept: ['x^4/4+C', 'x^4/4 + C'], placeholder: 'e.g. x^4/4+C', explanation: '$\\frac{x^4}{4} + C$.' },
    { difficulty: 'easy', question: '$\\int 5\\,dx =$?', accept: ['5x+C', '5x + C'], placeholder: 'e.g. 5x+C', explanation: '$5x + C$.' },
    { difficulty: 'medium', question: '$\\int_0^2 x^2\\,dx =$?', accept: ['8/3'], placeholder: 'Fraction', explanation: '$[x^3/3]_0^2 = 8/3$.' },
    { difficulty: 'medium', question: '$\\int e^x\\,dx =$?', accept: ['e^x+C', 'e^x + C'], placeholder: 'e.g. e^x+C', explanation: '$e^x + C$.' },
    { difficulty: 'hard', question: '$\\int_0^{\\pi/2} \\cos x\\,dx =$?', accept: [1, '1'], placeholder: 'Enter a number', explanation: '$[\\sin x]_0^{\\pi/2} = 1$.' },
    { difficulty: 'hard', question: '$\\int (3x^2 + 2x)\\,dx =$?', accept: ['x^3+x^2+C', 'x^3 + x^2 + C'], placeholder: 'e.g. x^3+x^2+C', explanation: '$x^3 + x^2 + C$.' },
    { difficulty: 'easy', question: 'Area under $f(x) = 4$ from $x = 0$ to $x = 5$ is:', accept: [20, '20'], placeholder: 'Number', explanation: 'Rectangle: $4 \\times 5 = 20$.' },
    { difficulty: 'medium', question: '$\\int_0^3 (6 - 2x)\\,dx =$?', accept: [9, '9'], placeholder: 'Number', explanation: '$[6x - x^2]_0^3 = 18 - 9 = 9$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Evaluate $\\int_1^4 (2x + 1)\\,dx$ using the FTC.', steps: [
      { content: 'Antiderivative: $F(x) = x^2 + x$.' },
      { content: '$F(4) = 16 + 4 = 20$.' },
      { content: '$F(1) = 1 + 1 = 2$.' },
      { content: '$F(4) - F(1) = 20 - 2 = 18$.' }
    ], explanation: 'FTC: $\\int_a^b f(x)\\,dx = F(b) - F(a)$.' },
    { difficulty: 'hard', question: 'Evaluate $\\int 2x\\sqrt{x^2+1}\\,dx$ by u-substitution.', steps: [
      { content: 'Let $u = x^2 + 1$, so $du = 2x\\,dx$.' },
      { content: '$\\int \\sqrt{u}\\,du = \\int u^{1/2}\\,du$.' },
      { content: '$= \\frac{u^{3/2}}{3/2} + C = \\frac{2}{3}u^{3/2} + C$.' },
      { content: 'Back-substitute: $\\frac{2}{3}(x^2+1)^{3/2} + C$.' }
    ], explanation: 'U-substitution reverses the chain rule.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'A car has velocity $v(t) = 3t^2$ m/s.', parts: [
      { question: 'Displacement from $t=0$ to $t=3$:', accept: [27, '27'], placeholder: 'meters', explanation: '$\\int_0^3 3t^2\\,dt = [t^3]_0^3 = 27$.' },
      { question: 'Acceleration $a(t) = v\'(t) =$:', accept: ['6t'], placeholder: 'e.g. 6t', explanation: '$v\'(t) = 6t$.' },
      { question: 'Position $s(t)$ if $s(0)=5$:', accept: ['t^3+5', 't^3 + 5'], placeholder: 'e.g. t^3+5', explanation: '$s(t) = t^3 + C$. $s(0)=5 \\Rightarrow C=5$.' }
    ], completionMessage: 'FTC connects derivatives (rates) and integrals (accumulation): $s\' = v$, $v\' = a$.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each integral to its antiderivative:', pairs: [
      { left: '$\\int x^n\\,dx$', right: '$\\frac{x^{n+1}}{n+1} + C$' },
      { left: '$\\int e^x\\,dx$', right: '$e^x + C$' },
      { left: '$\\int \\cos x\\,dx$', right: '$\\sin x + C$' },
      { left: '$\\int \\sin x\\,dx$', right: '$-\\cos x + C$' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'FTC statement:', expression: '$\\int_a^b f(x)\\,dx = F($ {{0}} $) - F($ {{1}} $)$', blanks: [ { accept: ['b'], size: 3 }, { accept: ['a'], size: 3 } ], explanation: 'Upper bound minus lower bound.' },
    { difficulty: 'medium', context: 'U-substitution:', expression: 'If $u = g(x)$, then $du =$ {{0}} $dx$.', blanks: [ { accept: ["g'(x)"], size: 8 } ], explanation: '$du = g\'(x)\\,dx$.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Integration Strategy</h4>
    <ol><li><strong>Recognize a basic form:</strong> power, trig, exponential.</li>
    <li><strong>Try u-substitution</strong> if you see a function and its derivative together.</li>
    <li><strong>Definite integrals:</strong> find antiderivative, then evaluate $F(b) - F(a)$.</li>
    <li><strong>Don't forget $+ C$</strong> for indefinite integrals.</li></ol></div>` }
}

] // end topics array
}); // end module push
})();
