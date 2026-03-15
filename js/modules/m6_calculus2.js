/* ============================================================
   MODULE 6: Calculus 2 (Thomas' Calculus)
   Integration, Techniques, Sequences & Series
   ============================================================ */
(function() {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];
  const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;
  window.MATH_MODULES.push({
    id: 'calculus-2',
    order: 10,
    title: 'Calculus 2A: Integration \u0026 Techniques',
    description: 'Definite and indefinite integrals, the Fundamental Theorem, and techniques. Reversing differentiation. Requires: derivatives (Module 9).',
    topics: [
      {
        id: 'integration-fundamentals',
        title: 'Integration Fundamentals',
        description: 'The reverse of differentiation and the accumulation of area. The Fundamental Theorem of Calculus unites the two.',
        prereqRecap: [
          { term: 'Derivative', definition: '$f\'(x)$ measures the instantaneous rate of change of $f$. Module 7.' },
          { term: 'Area', definition: 'The amount of two-dimensional space enclosed by a shape.' },
          { term: 'Antiderivative', definition: 'A function $F$ where $F\' = f$. Example: $F(x) = x^3/3$ is an antiderivative of $f(x) = x^2$.' }
        ],
        whyExists: { html: `
          <p><strong>Why does integration exist?</strong> Differentiation asks: given position, find velocity. Integration asks the reverse: given velocity, find position. More broadly, integration computes <strong>accumulated totals</strong> from rates: total distance from speed, total profit from marginal revenue, total mass from density.</p>
          <p><strong>Why is area under a curve the answer?</strong> If a car moves at speed $v(t)$, in a tiny time interval $dt$, it covers $v(t)\\,dt$ distance. The total distance is the sum of all these tiny rectangles: $\\sum v(t_i)\\Delta t$. As $\\Delta t \\to 0$, this Riemann sum becomes $\\int v(t)\\,dt$. The integral IS the area because area is what accumulation looks like geometrically.</p>
          <p><strong>The Fundamental Theorem of Calculus (FTC):</strong> FTC says $\\int_a^b f(x)\\,dx = F(b) - F(a)$ where $F' = f$. This connects the two branches: <strong>differential</strong> calculus (rates) and <strong>integral</strong> calculus (accumulation) are inverses of each other. Every antiderivative gives you an integral, and every integral gives you an antiderivative.</p>
          ${WHY('Why is FTC true?', '<p>Define $G(x) = \\int_a^x f(t)\\,dt$. Then $G\'(x) = \\lim_{h \\to 0} \\frac{G(x+h) - G(x)}{h} = \\lim_{h \\to 0} \\frac{1}{h}\\int_x^{x+h} f(t)\\,dt$. For small $h$, $f$ is approximately constant at $f(x)$ over $[x, x+h]$, so the integral is approximately $f(x) \\cdot h$. Dividing by $h$ gives $f(x)$. Therefore $G\' = f$: the function that accumulates area has the original function as its derivative. Accumulation and rate-of-change are inverse operations.</p>')}
        ` },
        hook: { html: `
          <div class="callout callout-puzzle"><h4>🧩 Puzzle: Distance from Speed</h4>
          <p>A car accelerates: its speed at time $t$ is $v(t) = 2t$ m/s. How far does it travel from $t = 0$ to $t = 5$?</p>
          <p>Distance = area under the velocity curve = area of a triangle with base $5$ and height $10$: $\\frac{1}{2}(5)(10) = 25$ m. This "area under the curve" idea IS integration: $\\int_0^5 2t\\,dt = [t^2]_0^5 = 25$.</p></div>` },
        concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 400 230" width="400" height="230" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="200" x2="380" y2="200" stroke="#94a3b8" stroke-width="1"/>
  <line x1="60" y1="20" x2="60" y2="210" stroke="#94a3b8" stroke-width="1"/>
  <path d="M 100 180 Q 160 60 200 80 Q 260 110 300 50 Q 330 20 360 40" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <path d="M 120 165 Q 160 60 200 80 Q 260 110 300 50 L 300 200 L 120 200 Z" fill="rgba(59,130,246,0.15)" stroke="none"/>
  <line x1="120" y1="120" x2="120" y2="200" stroke="#3b82f6" stroke-width="0.5" opacity="0.3"/><line x1="142.5" y1="91.30575636401909" x2="142.5" y2="200" stroke="#3b82f6" stroke-width="0.5" opacity="0.3"/><line x1="165" y1="80.01705587833979" x2="165" y2="200" stroke="#3b82f6" stroke-width="0.5" opacity="0.3"/><line x1="187.5" y1="92.98147277795397" x2="187.5" y2="200" stroke="#3b82f6" stroke-width="0.5" opacity="0.3"/><line x1="210" y1="122.3349657371032" x2="210" y2="200" stroke="#3b82f6" stroke-width="0.5" opacity="0.3"/><line x1="232.5" y1="150.27209981231712" x2="232.5" y2="200" stroke="#3b82f6" stroke-width="0.5" opacity="0.3"/><line x1="255" y1="159.84658435343363" x2="255" y2="200" stroke="#3b82f6" stroke-width="0.5" opacity="0.3"/><line x1="277.5" y1="145.25066551489283" x2="277.5" y2="200" stroke="#3b82f6" stroke-width="0.5" opacity="0.3"/><line x1="300" y1="115.33803180598025" x2="300" y2="200" stroke="#3b82f6" stroke-width="0.5" opacity="0.3"/>
  <line x1="120" y1="165" x2="120" y2="200" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="300" y1="50" x2="300" y2="200" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="120" y="215" fill="#10b981" font-size="12" text-anchor="middle" font-family="Inter">a</text>
  <text x="300" y="215" fill="#10b981" font-size="12" text-anchor="middle" font-family="Inter">b</text>
  <text x="365" y="38" fill="#3b82f6" font-size="12" font-family="Inter">f(x)</text>
  <text x="200" y="170" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="Inter">shaded area</text>
  <text x="200" y="188" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="Inter">= ∫ₐᵇ f(x)dx</text>
</svg>
</div>
<p class="math-diagram-label">The definite integral ∫ₐᵇ f(x)dx equals the signed area under the curve</p>

          <p>The <strong>definite integral</strong> $\\int_a^b f(x)\\,dx$ computes the <strong>signed area</strong> between $f(x)$ and the x-axis from $x = a$ to $x = b$. Area above the x-axis is positive; area below is negative.</p>

          <div class="callout callout-key"><h4>Fundamental Theorem of Calculus</h4>
          <p>The FTC is the central result of calculus. It connects the two main operations (differentiation and integration):</p>
          <p><strong>Part 1 (FTC1):</strong> If $f$ is continuous on $[a,b]$ and $F(x) = \\int_a^x f(t)\\,dt$, then $F'(x) = f(x)$.</p>
          <p>Interpretation: the derivative of the area function is the original function. Differentiation undoes integration.</p>
          <p><strong>Part 2 (FTC2):</strong> $\\int_a^b f(x)\\,dx = F(b) - F(a)$ where $F' = f$.</p>
          <p>Interpretation: to compute a definite integral, find ANY antiderivative $F$ and evaluate $F(b) - F(a)$. This eliminates the need for Riemann sums.</p></div>

          <div class="callout callout-key"><h4>Properties of Definite Integrals</h4>
          <ul>
            <li><strong>Linearity:</strong> $\\int_a^b [\\alpha f + \\beta g]\\,dx = \\alpha\\int_a^b f\\,dx + \\beta\\int_a^b g\\,dx$</li>
            <li><strong>Additivity:</strong> $\\int_a^c f\\,dx = \\int_a^b f\\,dx + \\int_b^c f\\,dx$</li>
            <li><strong>Reversal:</strong> $\\int_a^b f\\,dx = -\\int_b^a f\\,dx$</li>
            <li><strong>Zero width:</strong> $\\int_a^a f\\,dx = 0$</li>
            <li><strong>Comparison:</strong> If $f(x) \\geq 0$ on $[a,b]$, then $\\int_a^b f\\,dx \\geq 0$</li>
            <li><strong>Symmetry:</strong> If $f$ is even, $\\int_{-a}^a f = 2\\int_0^a f$. If $f$ is odd, $\\int_{-a}^a f = 0$.</li>
          </ul></div>

          <div class="callout callout-key"><h4>Complete Table of Basic Antiderivatives</h4>
          <ul>
            <li>$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$ (for $n \\neq -1$)</li>
            <li>$\\int \\frac{1}{x}\\,dx = \\ln|x| + C$</li>
            <li>$\\int e^x\\,dx = e^x + C$, \\ $\\int a^x\\,dx = \\frac{a^x}{\\ln a} + C$</li>
            <li>$\\int \\sin x\\,dx = -\\cos x + C$, \\ $\\int \\cos x\\,dx = \\sin x + C$</li>
            <li>$\\int \\sec^2 x\\,dx = \\tan x + C$, \\ $\\int \\csc^2 x\\,dx = -\\cot x + C$</li>
            <li>$\\int \\sec x\\tan x\\,dx = \\sec x + C$, \\ $\\int \\csc x\\cot x\\,dx = -\\csc x + C$</li>
            <li>$\\int \\frac{1}{1+x^2}\\,dx = \\tan^{-1}x + C$, \\ $\\int \\frac{1}{\\sqrt{1-x^2}}\\,dx = \\sin^{-1}x + C$</li>
          </ul>
          <p><strong>The $+C$:</strong> Since the derivative of a constant is zero, any constant could have been present before differentiation. The $+C$ represents the entire family of antiderivatives.</p></div>

          <div class="callout callout-key"><h4>Net Change Theorem</h4>
          <p>$\\int_a^b F'(x)\\,dx = F(b) - F(a)$. The integral of a rate of change gives the total change.</p>
          <p>Applications: Total distance = $\\int |v(t)|\\,dt$. Displacement = $\\int v(t)\\,dt$. Total growth = $\\int \\text{growth rate}\\,dt$.</p></div>` },
        definition: { html: `
          <p><strong>Riemann Sum Definition:</strong></p>
          <div class="math-block">$$\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x$$</div>
          <p>where $\\Delta x = \\frac{b-a}{n}$ and $x_i^*$ is a sample point in the $i$-th subinterval.</p>
          <div class="callout callout-notation"><h4>📐 Notation</h4>
          <p>$\\int$ is an elongated "S" for "sum." $dx$ indicates the variable of integration and the infinitesimal width. $C$ in indefinite integrals is the constant of integration: since $\\frac{d}{dx}[C] = 0$, any constant could be there.</p></div>` },
        examples: [{
          title: 'Evaluating a Definite Integral',
          problem: 'Compute $\\int_1^3 (3x^2 - 2x + 1)\\,dx$.',
          steps: [
            { title: 'Find the antiderivative', content: '$F(x) = x^3 - x^2 + x$', why: 'Antidifferentiate term by term: $\\int 3x^2 = x^3$, $\\int -2x = -x^2$, $\\int 1 = x$.' },
            { title: 'Evaluate at bounds', content: '$F(3) - F(1) = (27 - 9 + 3) - (1 - 1 + 1) = 21 - 1 = 20$', why: 'FTC Part 2: substitute upper limit, subtract value at lower limit.' }
          ]
        }],
        flashCards: [
      { type: 'define', front: 'What is an integral?', back: 'Signed area between f(x) and x-axis from a to b. Above = positive, below = negative.' },
      { type: 'why', front: 'Why is integration reverse of differentiation?', back: 'Fundamental Theorem: accumulating tiny rates rebuilds the total. If F’(x)=f(x), integral = F(b)-F(a).' },
      { type: 'how', front: 'How does u-substitution work?', back: 'When integrand has f(g(x))*g’(x), let u=g(x), du=g’(x)dx. Reverses the chain rule.' },
      { type: 'why', front: 'Why does +C matter?', back: 'Many functions share the same derivative. x^2 and x^2+5 both give 2x. +C includes all antiderivatives.' }
    ],
    exercises: [{
          difficulty: 'easy',
          question: 'What is $\\int_0^2 3x^2\\,dx$?',
          options: ['$6$', '$8$', '$12$', '$4$'],
          correctIndex: 1,
          hint: '<p>Antiderivative of $3x^2$ is $x^3$.</p>',
          correctExplanation: '$[x^3]_0^2 = 8 - 0 = 8$.',
          wrongExplanations: { 0: '$2^3 = 8$, not 6.', 2: 'Check: $2^3 = 8$.', 3: '$2^2 = 4 \\neq 2^3$.' }
        },{
          difficulty: 'easy',
          question: '$\\int x^3\\,dx =$?',
          options: ['$3x^2 + C$', '$\\frac{x^4}{4} + C$', '$x^4 + C$', '$\\frac{x^3}{3} + C$'],
          correctIndex: 1,
          hint: '<p>Power rule: add 1 to exponent, divide by new exponent.</p>',
          correctExplanation: '$\\int x^3\\,dx = \\frac{x^{3+1}}{3+1} + C = \\frac{x^4}{4} + C$.',
          wrongExplanations: { 0: 'That is the derivative, not the integral.', 2: 'Missing the $1/4$ coefficient.', 3: 'Wrong exponent: $3+1=4$, not 3.' }
        },{
          difficulty: 'medium',
          question: '$\\int_0^{\\pi} \\sin x\\,dx =$?',
          options: ['$0$', '$1$', '$2$', '$-2$'],
          correctIndex: 2,
          hint: '<p>Antiderivative of $\\sin x$ is $-\\cos x$.</p>',
          correctExplanation: '$[-\\cos x]_0^{\\pi} = -\\cos\\pi - (-\\cos 0) = -(-1) + 1 = 2$.',
          wrongExplanations: { 0: 'The function is non-negative on $[0,\\pi]$, so area \\gt 0.', 1: '$-(-1) + 1 = 2$, not 1.', 3: 'Watch the signs: $-\\cos\\pi = 1$ and $-\\cos 0 = -1$.' }
        },{
          difficulty: 'hard',
          question: 'FTC Part 1: If $F(x) = \\int_1^x t^2\\,dt$, then $F\'(x) =$?',
          options: ['$x^2$', '$\\frac{x^3}{3} - \\frac{1}{3}$', '$2x$', '$\\int_1^x 2t\\,dt$'],
          correctIndex: 0,
          hint: '<p>FTC Part 1: $\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)$.</p>',
          correctExplanation: 'FTC Part 1: the derivative of the integral is the integrand evaluated at $x$: $F\'(x) = x^2$.',
          wrongExplanations: { 1: 'That is $F(x)$ itself, not $F\'(x)$.', 2: 'That is $F\'\'(x) = 2x$.', 3: 'FTC says $F\'(x) = f(x)$ directly.' }
        },

    /* Intuition: estimating integrals */
    {
      question: 'Without computing, which is larger: the integral of x from 0 to 1, or the integral of x^2 from 0 to 1? Explain why.',
      type: 'mc',
      options: ['integral of x is larger', 'integral of x^2 is larger', 'They are equal', 'Cannot determine'],
      correctIndex: 0,
      solution: { steps: ['For 0 < x < 1, we have x > x^2 (because squaring a fraction makes it smaller).', 'Since x > x^2 on [0,1], the area under x is larger.', 'Compute: integral of x = 1/2, integral of x^2 = 1/3. Indeed 1/2 > 1/3.'] }
    },
    {
      question: 'If F(x) is an antiderivative of f(x), and F(2) = 5, F(5) = 11, what is the integral of f(x) from 2 to 5?',
      type: 'mc',
      options: ['6', '16', '-6', 'Cannot determine'],
      correctIndex: 0,
      solution: { steps: ['By the Fundamental Theorem: integral from a to b of f(x)dx = F(b) - F(a).', 'F(5) - F(2) = 11 - 5 = 6.'] }
    },
    {
      question: 'The integral of a constant c from a to b equals:',
      type: 'mc',
      options: ['c(b-a)', 'c(a-b)', 'c', '0'],
      correctIndex: 0,
      solution: { steps: ['The area of a rectangle with height c and width (b-a) is c(b-a).', 'Algebraically: antiderivative of c is cx, so [cx] from a to b = cb - ca = c(b-a).'] }
    }
    ],
        freeResponse: [
          { difficulty: 'easy', question: '$\\int 5\\,dx =$? (include + C)', accept: ['5x + C', '5x+C'], placeholder: 'Expression', explanation: '$\\int 5\\,dx = 5x + C$.' },
          { difficulty: 'easy', question: '$\\int_0^1 2x\\,dx =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$[x^2]_0^1 = 1$.' },
          { difficulty: 'easy', question: '$\\int x^4\\,dx =$? (include + C)', accept: ['x^5/5 + C', '(1/5)x^5 + C'], placeholder: 'Expression', explanation: '$\\frac{x^5}{5} + C$.' },
          { difficulty: 'medium', question: '$\\int_1^e \\frac{1}{x}\\,dx =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$[\\ln|x|]_1^e = \\ln e - \\ln 1 = 1 - 0 = 1$.' },
          { difficulty: 'medium', question: '$\\int_0^{\\pi/2} \\cos x\\,dx =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$[\\sin x]_0^{\\pi/2} = 1 - 0 = 1$.' },
          { difficulty: 'hard', question: '$\\int_{-1}^{1} x^3\\,dx =$?', accept: [0, '0'], placeholder: 'Number', explanation: '$x^3$ is odd. Integral of odd function over symmetric interval = 0.' },
          { difficulty: 'hard', question: '$\\int_0^4 \\sqrt{x}\\,dx =$?', accept: ['16/3', '5.33'], placeholder: 'Number', explanation: '$\\int x^{1/2}\\,dx = \\frac{2}{3}x^{3/2}$. $[\\frac{2}{3}x^{3/2}]_0^4 = \\frac{2}{3}(8) = \\frac{16}{3}$.' },
    { difficulty: 'easy', question: '$\\int x^4\\,dx =$?', accept: ['x^5/5+C', 'x^5/5 + C'], placeholder: 'Expression', explanation: '$\\frac{x^5}{5} + C$.' },
    { difficulty: 'medium', question: '$\\int \\cos(2x)\\,dx =$?', accept: ['sin(2x)/2+C', '(1/2)sin(2x)+C'], placeholder: 'Expression', explanation: '$\\frac{1}{2}\\sin(2x) + C$.' },
    { difficulty: 'easy', question: '$\\int 0\\,dx =$?', accept: ['C', '0+C', 'c'], placeholder: 'Expression', explanation: 'Integral of 0 is a constant: $C$.' },
    { difficulty: 'hard', question: '$\\int \\frac{1}{\\sqrt{1-x^2}}\\,dx =$?', accept: ['arcsin(x)+C', 'sin^{-1}(x)+C'], placeholder: 'Expression', explanation: 'This is $\\arcsin(x) + C$.' },
    { difficulty: 'medium', question: '$\\int \\frac{1}{x+1}\\,dx =$?', accept: ['ln|x+1|+C', 'ln(x+1)+C'], placeholder: 'Expression', explanation: '$\\ln|x+1| + C$.' },
    { difficulty: 'hard', question: '$\\int \\frac{1}{x^2+1}\\,dx =$?', accept: ['arctan(x)+C', 'tan^(-1)(x)+C'], placeholder: 'Expression', explanation: '$\\arctan(x) + C$.' },
    { difficulty: 'hard', question: '$\\int \\tan(x)\\,dx =$?', accept: ['-ln|cos(x)|+C', 'ln|sec(x)|+C'], placeholder: 'Expression', explanation: '$\\int \\tan x\\,dx = -\\ln|\\cos x| + C = \\ln|\\sec x| + C$.' },
    { difficulty: 'medium', question: '$\\int x^{-1/2}\\,dx =$?', accept: ['2sqrt(x)+C', '2x^(1/2)+C', '2\\sqrt{x}+C'], placeholder: 'Expression', explanation: '$\\frac{x^{1/2}}{1/2} + C = 2\\sqrt{x} + C$.' },
    { difficulty: 'hard', question: '$\\int \\frac{x}{(x^2+1)^2}\\,dx =$?', accept: ['-1/(2(x^2+1))+C'], placeholder: 'Expression', explanation: 'Let $u = x^2+1$: $\\frac{1}{2}\\int u^{-2}\\,du = -\\frac{1}{2u} + C$.' },
    { difficulty: 'easy', question: '$\\int 4x^3\\,dx =$?', accept: ['x^4+C', 'x^4 + C'], placeholder: 'Expression', explanation: '$4 \\cdot x^4/4 + C = x^4 + C$.' },
    { difficulty: 'easy', question: '$\\int \\sin x\\,dx =$?', accept: ['-cos(x)+C', '-cosx+C'], placeholder: 'Expression', explanation: '$-\\cos x + C$.' },
    { difficulty: 'medium', question: '$\\int \\cos(3x)\\,dx =$?', accept: ['sin(3x)/3+C', '(1/3)sin(3x)+C'], placeholder: 'Expression', explanation: '$\\frac{1}{3}\\sin(3x) + C$.' },
    { difficulty: 'hard', question: '$\\int \\sec(x)\\,dx =$?', accept: ['ln|sec(x)+tan(x)|+C'], placeholder: 'Expression', explanation: '$\\ln|\\sec x + \\tan x| + C$.' }
        ],
        stepBuilder: [
          { difficulty: 'medium', question: 'Evaluate $\\int_1^4 (2\\sqrt{x} + 3)\\,dx$.', steps: [
            { content: 'Rewrite: $2x^{1/2} + 3$.' },
            { content: 'Antiderivative: $2 \\cdot \\frac{x^{3/2}}{3/2} + 3x = \\frac{4}{3}x^{3/2} + 3x$.' },
            { content: 'Evaluate: $\\left[\\frac{4}{3}(8) + 12\\right] - \\left[\\frac{4}{3}(1) + 3\\right] = \\frac{32}{3} + 12 - \\frac{4}{3} - 3 = \\frac{28}{3} + 9 = \\frac{55}{3}$.' },
    { difficulty: 'medium', question: 'Evaluate $\\int \\frac{3x}{x^2+1}\\,dx$.', steps: [
      { content: 'Substitution: $u = x^2 + 1$, $du = 2x\\,dx$.' },
      { content: '$\\frac{3}{2}\\int \\frac{du}{u}$.' },
      { content: '$\\frac{3}{2}\\ln|u| + C = \\frac{3}{2}\\ln(x^2+1) + C$.' }
    ], explanation: 'U-substitution: match the numerator to the derivative of the denominator.' }
          ], explanation: 'Rewrite roots as fractional powers before integrating.' }
        ],
        matching: [
          { difficulty: 'easy', instruction: 'Match each function to its antiderivative:', pairs: [
            { left: '$x^n$', right: '$\\frac{x^{n+1}}{n+1} + C$' },
            { left: '$\\sin x$', right: '$-\\cos x + C$' },
            { left: '$e^x$', right: '$e^x + C$' },
            { left: '$1/x$', right: '$\\ln|x| + C$' }
          ] }
        ],
        fillBlanks: [
          { difficulty: 'easy', context: 'FTC Part 2:', expression: '$\\int_a^b f(x)\\,dx = F(b) -$ {{0}}', blanks: [ { accept: ['F(a)'], size: 6 } ], explanation: 'Evaluate antiderivative at bounds and subtract.' },
          { difficulty: 'medium', context: 'Indefinite integrals:', expression: 'Every indefinite integral must include the constant {{0}}.', blanks: [ { accept: ['C', '+ C', '+C'], size: 4 } ], explanation: 'The $+C$ accounts for the family of antiderivatives.' },
    { difficulty: 'medium', context: 'U-substitution:', expression: 'For $\\int f(g(x))g\'(x)\\,dx$, let $u =$ {{0}}.', blanks: [ { accept: ['g(x)'], size: 5 } ], explanation: 'U-sub: let $u = g(x)$, $du = g\'(x)\\,dx$.' }
        ],
        multiPart: [
          { difficulty: 'hard', question: 'Use a Riemann sum to approximate $\\int_0^2 x^2\\,dx$ with $n = 2$ right endpoints.', parts: [
            { question: '$\\Delta x = (b-a)/n =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$(2-0)/2 = 1$.' },
            { question: 'Right endpoints: $x_1 = 1, x_2 = 2$. Sum = $f(1)\\Delta x + f(2)\\Delta x =$?', accept: [5, '5'], placeholder: 'Number', explanation: '$1(1) + 4(1) = 5$.' },
            { question: 'Exact value of $\\int_0^2 x^2\\,dx =$?', accept: ['8/3', '2.67'], placeholder: 'Number', explanation: '$[x^3/3]_0^2 = 8/3 \\approx 2.67$. Riemann sum ($5$) overestimates.' },
    { difficulty: 'hard', question: 'Use trig substitution for $\\int \\frac{dx}{\\sqrt{4-x^2}}$.', parts: [
      { question: 'Let $x = 2\\sin\\theta$. Then $\\sqrt{4-x^2} =$?', accept: ['2cos(theta)', '2costheta', '2\\cos\\theta'], placeholder: 'Expression', explanation: '$\\sqrt{4 - 4\\sin^2\\theta} = 2\\cos\\theta$.' },
      { question: 'Final answer:', accept: ['arcsin(x/2)+C', 'sin^(-1)(x/2)+C'], placeholder: 'Integral', explanation: '$\\int \\frac{2\\cos\\theta\\,d\\theta}{2\\cos\\theta} = \\theta + C = \\arcsin(x/2) + C$.' }
    ], completionMessage: 'Trig sub for $\\sqrt{a^2 - x^2}$: let $x = a\\sin\\theta$.' }
          ], completionMessage: 'Riemann sums approximate; the integral gives the exact area.' }
        ],
        visualizations: [{
          render: (containerId) => {
            Viz.integralVisualizer(containerId, x => x * x, {
              xMin: -1, xMax: 5, yMin: -2, yMax: 18,
              a: 0, b: 3, n: 15,
              width: 600, height: 380
            });
          }
        }],
        stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Integration Strategy</h4>
          <ol><li><strong>Recognize the form:</strong> Does it match a basic antiderivative?</li>
          <li><strong>Simplify first:</strong> Expand products, split fractions.</li>
          <li><strong>Don't forget $+C$</strong> for indefinite integrals.</li>
          <li><strong>FTC:</strong> Evaluate antiderivative at bounds and subtract.</li></ol></div>` }
      },
      {
        id: 'integration-techniques',
        title: 'Techniques of Integration',
        description: 'u-Substitution, integration by parts, partial fractions, and trigonometric integrals.',
        prereqRecap: [
          { term: 'Chain Rule', definition: '$\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)$. Differentiation of compositions.' },
          { term: 'Antiderivative', definition: '$\\int f(x)\\,dx = F(x) + C$ where $F\' = f$.' },
          { term: 'Algebraic Fraction', definition: '$\\frac{P(x)}{Q(x)}$ where $P$ and $Q$ are polynomials.' }
        ],
        whyExists: { html: `
          <p><strong>Why do we need special techniques?</strong> Most functions do not have antiderivatives that match basic formulas. $\\int e^x\\,dx = e^x + C$ is straightforward. $\\int x e^x\\,dx$ is not. Integration techniques are <strong>algebraic transformations</strong> that convert complex integrands into recognizable basic forms.</p>
          <p><strong>Why does u-substitution work?</strong> It is the chain rule in reverse. The chain rule says $\\frac{d}{dx}F(g(x)) = F'(g(x)) \\cdot g'(x) = f(g(x)) \\cdot g'(x)$. Reading right to left: if you see $f(g(x)) \\cdot g'(x)$ inside an integral, its antiderivative is $F(g(x))$. Setting $u = g(x)$ makes this pattern visible.</p>
          <p><strong>Practical application:</strong> Signal processing uses Fourier integrals (requiring IBP and trig substitution). Probability density functions require integration techniques. Engineering stress analysis reduces to integrals of rational functions (partial fractions).</p>
          ${WHY('Why does partial fraction decomposition work?', '<p>Any proper rational function $P(x)/Q(x)$ can be decomposed into a sum of simpler fractions. This follows from the <strong>Fundamental Theorem of Algebra</strong>: every polynomial factors completely over the reals into linear and irreducible quadratic factors. Each factor contributes a term of the form $\\frac{A}{(x-r)^k}$ or $\\frac{Ax+B}{(x^2+bx+c)^k}$, and each of these CAN be integrated using basic formulas.</p>')}
        ` },
        hook: { html: `
          <div class="callout callout-puzzle"><h4>🧩 Puzzle: The Unsolvable Integral?</h4>
          <p>Try finding $\\int 2x \\cos(x^2)\\,dx$ directly. No basic formula matches. But if you let $u = x^2$, then $du = 2x\\,dx$, and the integral becomes $\\int \\cos(u)\\,du = \\sin(u) + C = \\sin(x^2) + C$. Substitution transforms hard integrals into easy ones.</p></div>` },
        concept: { html: `
          <div class="callout callout-key"><h4>1. u-Substitution (Reverse Chain Rule)</h4>
          <p>If you see $f(g(x)) \\cdot g'(x)$, let $u = g(x)$, $du = g'(x)\\,dx$.</p>
          <p>$$\\int f(g(x)) \\cdot g'(x)\\,dx = \\int f(u)\\,du$$</p>
          <p>For definite integrals: change the limits too ($u(a)$ to $u(b)$) or substitute back.</p></div>
          <div class="callout callout-key"><h4>2. Integration by Parts (Reverse Product Rule)</h4>
          <p>$$\\int u\\,dv = uv - \\int v\\,du$$</p>
          <p>LIATE priority for choosing $u$: <strong>L</strong>ogs, <strong>I</strong>nverse trig, <strong>A</strong>lgebraic, <strong>T</strong>rig, <strong>E</strong>xponential. Choose $u$ = the function that simplifies when differentiated.</p>
          <p>Tabular method: for $\\int x^n e^x\\,dx$ or $\\int x^n \\sin x\\,dx$, create columns of derivatives (of $u$) and antiderivatives (of $dv$) with alternating signs.</p></div>
          <div class="callout callout-key"><h4>3. Partial Fractions</h4>
          <p>Decompose $\\frac{P(x)}{Q(x)}$ (with $\\deg P < \\deg Q$) into simpler fractions:</p>
          <ul>
            <li><strong>Linear factors:</strong> $\\frac{A}{x-a} + \\frac{B}{x-b}$</li>
            <li><strong>Repeated linear:</strong> $\\frac{A}{x-a} + \\frac{B}{(x-a)^2}$</li>
            <li><strong>Irreducible quadratic:</strong> $\\frac{Ax+B}{x^2+bx+c}$</li>
          </ul>
          <p>If $\\deg P \\geq \\deg Q$, perform polynomial long division first.</p></div>
          <div class="callout callout-key"><h4>4. Trigonometric Integrals</h4>
          <ul>
            <li>$\\int \\sin^m x \\cos^n x\\,dx$: if one exponent is odd, save one factor and use $\\sin^2 + \\cos^2 = 1$.</li>
            <li>If both even: use half-angle identities: $\\sin^2 x = \\frac{1-\\cos 2x}{2}$, $\\cos^2 x = \\frac{1+\\cos 2x}{2}$.</li>
            <li>$\\int \\tan^n x\\,dx$: peel off $\\tan^2 = \\sec^2 - 1$ and reduce.</li>
          </ul></div>
          <div class="callout callout-key"><h4>5. Trigonometric Substitution</h4>
          <p>For integrands containing square roots of quadratic expressions:</p>
          <ul>
            <li>$\\sqrt{a^2 - x^2}$: let $x = a\\sin\\theta$</li>
            <li>$\\sqrt{a^2 + x^2}$: let $x = a\\tan\\theta$</li>
            <li>$\\sqrt{x^2 - a^2}$: let $x = a\\sec\\theta$</li>
          </ul>
          <p>After integrating in $\\theta$, convert back to $x$ using a right triangle diagram.</p></div>
          <div class="callout callout-key"><h4>6. Improper Integrals</h4>
          <p>$\\int_1^{\\infty} f(x)\\,dx = \\lim_{b \\to \\infty} \\int_1^b f(x)\\,dx$. If the limit exists, the integral <strong>converges</strong>; otherwise it <strong>diverges</strong>.</p>
          <p>Key result: $\\int_1^{\\infty} \\frac{1}{x^p}\\,dx$ converges iff $p \\gt 1$. ($p$-test)</p></div>
          <div class="callout callout-key"><h4>Strategy: Which Technique?</h4>
          <ol>
            <li>Is a basic antiderivative available? Use it directly.</li>
            <li>Is there a composite function with its derivative present? <strong>u-substitution</strong>.</li>
            <li>Is it a product of two different types of functions? <strong>Integration by parts</strong>.</li>
            <li>Is it a rational function? <strong>Partial fractions</strong>.</li>
            <li>Does it contain $\\sqrt{a^2 \\pm x^2}$ or $\\sqrt{x^2 - a^2}$? <strong>Trig substitution</strong>.</li>
            <li>Powers of $\\sin$ and $\\cos$? <strong>Trig integrals</strong> (identities).</li>
          </ol></div>
    ${WHY('Why does integration by parts work?', '<p>It reverses the product rule. If d(uv) = u dv + v du, integrating both sides: uv = integral(u dv) + integral(v du). Rearranging: integral(u dv) = uv - integral(v du). This transfers difficulty from one factor to another.</p>')}
    ${WHY('When to use partial fractions vs substitution?', '<p>Partial fractions work for rational functions (polynomial/polynomial) that can be decomposed into simpler fractions. Substitution works when the integrand contains a function and its derivative. If you see f(g(x))*g\\\' (x), substitute. If you see a ratio of polynomials, decompose.</p>')}` },
        definition: { html: `
          <p><strong>Integration by Parts (Derived from Product Rule):</strong></p>
          <div class="math-block">$$\\int u\\,dv = uv - \\int v\\,du$$</div>
          <p><strong>Tabular Method:</strong> For repeated integration by parts (e.g., $\\int x^3 e^x\\,dx$), create a table of derivatives of $u$ and antiderivatives of $dv$, alternating signs: $+, -, +, -, \\ldots$</p>` },
        examples: [{
          title: 'Integration by Parts',
          problem: 'Evaluate $\\int x e^x\\,dx$.',
          steps: [
            { title: 'Choose $u$ and $dv$', content: 'Let $u = x$ (algebraic, differentiates to something simpler) and $dv = e^x\\,dx$.', why: 'LIATE: Algebraic before Exponential.' },
            { title: 'Compute $du$ and $v$', content: '$du = dx$ and $v = e^x$.', why: 'Differentiate $u$ and integrate $dv$.' },
            { title: 'Apply the formula', content: '$\\int x e^x\\,dx = xe^x - \\int e^x\\,dx = xe^x - e^x + C = e^x(x - 1) + C$', why: 'Substitute into $uv - \\int v\\,du$. The remaining integral is now elementary.' }
          ]
        },
        {
          title: 'Partial Fractions',
          problem: 'Evaluate $\\int \\frac{5x + 1}{(x+1)(x-2)}\\,dx$.',
          steps: [
            { title: 'Decompose', content: '$\\frac{5x+1}{(x+1)(x-2)} = \\frac{A}{x+1} + \\frac{B}{x-2}$.', why: 'Each distinct linear factor gets its own fraction with an unknown constant.' },
            { title: 'Clear denominators', content: '$5x + 1 = A(x-2) + B(x+1)$.', why: 'Multiply both sides by $(x+1)(x-2)$.' },
            { title: 'Find $A$ and $B$', content: 'Set $x = 2$: $11 = 3B \\Rightarrow B = 11/3$. Set $x = -1$: $-4 = -3A \\Rightarrow A = 4/3$.', why: 'Plugging in roots of each factor eliminates the other variable.' },
            { title: 'Integrate', content: '$\\int \\frac{4/3}{x+1}\\,dx + \\int \\frac{11/3}{x-2}\\,dx = \\frac{4}{3}\\ln|x+1| + \\frac{11}{3}\\ln|x-2| + C$.', why: 'Each piece is a standard $\\int \\frac{1}{u}\\,du = \\ln|u|$ integral.' }
          ]
        },
        {
          title: 'Trigonometric Substitution',
          problem: 'Evaluate $\\int \\frac{dx}{\\sqrt{4 - x^2}}$.',
          steps: [
            { title: 'Identify the form', content: '$\\sqrt{a^2 - x^2}$ with $a = 2$. Use $x = 2\\sin\\theta$.', why: 'The pattern $\\sqrt{a^2 - x^2}$ matches $x = a\\sin\\theta$ substitution.' },
            { title: 'Substitute', content: '$dx = 2\\cos\\theta\\,d\\theta$. $\\sqrt{4 - 4\\sin^2\\theta} = 2\\cos\\theta$.', why: '$4 - x^2 = 4(1-\\sin^2\\theta) = 4\\cos^2\\theta$. Square root: $2\\cos\\theta$.' },
            { title: 'Simplify and integrate', content: '$\\int \\frac{2\\cos\\theta}{2\\cos\\theta}\\,d\\theta = \\int d\\theta = \\theta + C$.', why: 'The cosines cancel. The integral is now trivial.' },
            { title: 'Convert back to $x$', content: '$\\theta = \\sin^{-1}(x/2)$. Answer: $\\sin^{-1}(x/2) + C$.', why: 'Since $x = 2\\sin\\theta$, we have $\\theta = \\arcsin(x/2)$. Verify: $\\frac{d}{dx}[\\sin^{-1}(x/2)] = \\frac{1}{\\sqrt{4-x^2}}$ \\u2713.' }
          ]
        }],
        flashCards: [
      { type: 'how', front: 'How does integration by parts work?', back: 'integral(u dv) = uv - integral(v du). Choose u and dv using LIATE: Logarithmic, Inverse trig, Algebraic, Trig, Exponential.' },
      { type: 'why', front: 'Why does partial fraction decomposition work?', back: 'Any proper rational function P(x)/Q(x) can be written as a sum of simpler fractions. Integrating simple fractions (1/(x-a), x/(x^2+1)) is straightforward.' },
      { type: 'how', front: 'When to use trig substitution?', back: 'sqrt(a^2-x^2): let x = a sin theta. sqrt(a^2+x^2): let x = a tan theta. sqrt(x^2-a^2): let x = a sec theta. Each eliminates the square root.' }
    ],
    exercises: [{
          difficulty: 'easy',
          question: 'The technique for $\\int 2x\\cos(x^2)\\,dx$ is:',
          options: ['Integration by parts', 'u-Substitution', 'Partial fractions', 'Trig identity'],
          correctIndex: 1,
          hint: '<p>Is there a composite function with its derivative nearby?</p>',
          correctExplanation: '$u = x^2$, $du = 2x\\,dx$. The integral becomes $\\int \\cos u\\,du$.',
          wrongExplanations: { 0: 'IBP is for products; here we have a composition.', 2: 'No rational function.', 3: 'No trig powers to reduce.' }
        },{
          difficulty: 'medium',
          question: 'Evaluate $\\int 2x\\sin(x^2)\\,dx$.',
          options: ['$-\\cos(x^2) + C$', '$\\cos(x^2) + C$', '$\\sin(x^2) + C$', '$-2\\cos(x^2) + C$'],
          correctIndex: 0,
          hint: '<p>Let $u = x^2$.</p>',
          correctExplanation: '$u = x^2$, $du = 2x\\,dx$. $\\int \\sin u\\,du = -\\cos u + C = -\\cos(x^2) + C$.',
          wrongExplanations: { 1: 'Antiderivative of $\\sin$ is $-\\cos$.', 2: 'That is the derivative, not antiderivative.', 3: 'Factor of 2 absorbed by $du$.' }
        },{
          difficulty: 'hard',
          question: '$\\int \\frac{1}{x^2-1}\\,dx$ requires:',
          options: ['u-Substitution', 'Integration by parts', 'Partial fractions', 'Trig substitution'],
          correctIndex: 2,
          hint: '<p>Factor: $x^2-1 = (x-1)(x+1)$.</p>',
          correctExplanation: 'Decompose: $\\frac{1}{(x-1)(x+1)} = \\frac{A}{x-1} + \\frac{B}{x+1}$.',
          wrongExplanations: { 0: 'No composition or chain rule structure.', 1: 'No product of different function types.', 3: 'Denominators with linear factors use partial fractions.' }
        }],
        freeResponse: [
          { difficulty: 'easy', question: '$\\int e^{3x}\\,dx =$? (include + C)', accept: ['e^(3x)/3 + C', '(1/3)e^(3x) + C'], placeholder: 'Expression', explanation: '$u = 3x$, $du = 3dx$. $\\frac{1}{3}e^{3x} + C$.' },
          { difficulty: 'easy', question: '$\\int \\cos(5x)\\,dx =$? (include + C)', accept: ['sin(5x)/5 + C', '(1/5)sin(5x) + C'], placeholder: 'Expression', explanation: '$u = 5x$. $\\frac{1}{5}\\sin(5x) + C$.' },
          { difficulty: 'medium', question: 'In $\\int x e^x\\,dx$ (IBP), what should $u$ be?', accept: ['x'], placeholder: 'u = ?', explanation: 'LIATE: Algebraic ($x$) before Exponential ($e^x$).' },
          { difficulty: 'medium', question: '$\\int \\frac{2x}{x^2 + 1}\\,dx =$? (include + C)', accept: ['ln(x^2+1) + C', 'ln(x^2 + 1) + C'], placeholder: 'Expression', explanation: '$u = x^2+1$, $du = 2x\\,dx$. $\\ln(x^2+1) + C$.' },
          { difficulty: 'hard', question: '$\\int \\ln x\\,dx = x\\ln x -$ ? $+ C$', accept: ['x'], placeholder: 'Missing term', explanation: 'IBP: $u = \\ln x, dv = dx$. $x\\ln x - \\int 1\\,dx = x\\ln x - x + C$.' },
    { difficulty: 'easy', question: '$\\int_0^1 2x\\,dx =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$[x^2]_0^1 = 1$.' },
    { difficulty: 'medium', question: 'Average value of $f(x) = x^2$ on $[0, 3]$:', accept: [3, '3'], placeholder: 'Number', explanation: '$\\frac{1}{3}\\int_0^3 x^2\\,dx = \\frac{1}{3}[x^3/3]_0^3 = \\frac{1}{3}(9) = 3$.' },
    { difficulty: 'easy', question: '$\\int_0^4 1\\,dx =$?', accept: [4, '4'], placeholder: 'Number', explanation: 'Length of interval: $4 - 0 = 4$.' },
    { difficulty: 'medium', question: 'Volume of solid with cross-section area $A = \\pi$ from $x=0$ to $x=3$:', accept: ['3pi', '3\\pi', '9.42'], placeholder: 'Number', explanation: '$V = \\int_0^3 \\pi\\,dx = 3\\pi$.' },
    { difficulty: 'easy', question: 'Net displacement from velocity $v(t) = 4$ over $[0, 3]$:', accept: [12, '12'], placeholder: 'Number', explanation: '$\\int_0^3 4\\,dt = 12$.' },
    { difficulty: 'hard', question: 'Area between $y = x^2$ and $y = x$ from $x = 0$ to $x = 1$:', accept: ['1/6', '0.167'], placeholder: 'Area', explanation: '$\\int_0^1 (x - x^2)\\,dx = [x^2/2 - x^3/3]_0^1 = 1/2 - 1/3 = 1/6$.' },
    { difficulty: 'medium', question: 'If $f(x) = 3$ on $[0, 5]$, then $\\int_0^5 f(x)\\,dx =$?', accept: [15, '15'], placeholder: 'Number', explanation: 'Rectangle: $3 \\times 5 = 15$.' },
    { difficulty: 'hard', question: 'Average value of $\\sin(x)$ on $[0, \\pi]$:', accept: ['2/pi', '0.637'], placeholder: 'Number', explanation: '$\\frac{1}{\\pi}\\int_0^{\\pi} \\sin x\\,dx = \\frac{1}{\\pi}[-\\cos x]_0^{\\pi} = \\frac{2}{\\pi}$.' },
    { difficulty: 'hard', question: 'Disc method volume: $y = x^2$ revolved about $x$-axis from $x=0$ to $x=2$:', accept: ['32pi/5'], placeholder: 'Volume', explanation: '$V = \\pi\\int_0^2 x^4\\,dx = \\pi[x^5/5]_0^2 = 32\\pi/5$.' },
    { difficulty: 'medium', question: 'Shell method formula: $V = 2\\pi \\int_a^b$ ?', accept: ['x*f(x)dx', 'xf(x)dx'], placeholder: 'Integrand', explanation: '$V = 2\\pi \\int_a^b x f(x)\\,dx$.' },
    { difficulty: 'easy', question: '$\\int_0^1 x^2\\,dx =$?', accept: ['1/3', '0.333'], placeholder: 'Number', explanation: '$[x^3/3]_0^1 = 1/3$.' },
    { difficulty: 'medium', question: 'Washer method: volume = $\\pi \\int (R^2 - r^2)\\,dx$. $R$ is the:', accept: ['outer radius'], placeholder: 'Which radius?', explanation: '$R$ = outer radius, $r$ = inner radius.' }
        ],
        stepBuilder: [
          { difficulty: 'medium', question: 'Evaluate $\\int \\frac{2x}{x^2+1}\\,dx$ by substitution.', steps: [
            { content: 'Let $u = x^2 + 1$. Then $du = 2x\\,dx$.' },
            { content: '$\\int \\frac{du}{u} = \\ln|u| + C$.' },
            { content: '$= \\ln(x^2+1) + C$. (Absolute value unnecessary since $x^2+1 \\gt 0$.)' },
    { difficulty: 'hard', question: 'Find the area between $y = x$ and $y = x^2$ on $[0,1]$.', steps: [
      { content: 'Top function: $y = x$ (above $y = x^2$ on $[0,1]$).' },
      { content: '$\\int_0^1 (x - x^2)\\,dx = [x^2/2 - x^3/3]_0^1$.' },
      { content: '$= 1/2 - 1/3 = 1/6$.' }
    ], explanation: 'Area between curves: $\\int (\\text{top} - \\text{bottom})\\,dx$.' }
          ], explanation: 'When the numerator is the derivative of the denominator, use u-sub.' }
        ],
        matching: [
          { difficulty: 'medium', instruction: 'Match integral type to technique:', pairs: [
            { left: '$\\int f(g(x))g\'(x)\\,dx$', right: 'u-Substitution' },
            { left: '$\\int x e^x\\,dx$', right: 'Integration by Parts' },
            { left: '$\\int \\frac{1}{(x-1)(x+2)}\\,dx$', right: 'Partial Fractions' },
            { left: '$\\int \\sin^2 x\\,dx$', right: 'Trig Identity' }
          ] }
        ],
        fillBlanks: [
          { difficulty: 'easy', context: 'u-Substitution:', expression: 'If $u = g(x)$, then $du =$ {{0}} $dx$.', blanks: [ { accept: ["g'(x)", 'g\'(x)'], size: 8 } ], explanation: 'Differentiate the substitution.' },
          { difficulty: 'medium', context: 'LIATE priority:', expression: 'In IBP, choose $u$ from: {{0}}, Inverse trig, Algebraic, Trig, Exponential.', blanks: [ { accept: ['Logarithmic', 'Log', 'Logs'], size: 12 } ], explanation: 'L = Logarithmic (first priority for $u$).' }
        ],
        stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Integration Technique Selection</h4>
          <ol><li>Composite function with derivative? → <strong>u-substitution.</strong></li>
          <li>Product of two types? → <strong>IBP (LIATE).</strong></li>
          <li>Rational with factorable denominator? → <strong>Partial fractions.</strong></li>
          <li>Trig powers? → <strong>Trig identities.</strong></li></ol></div>` }
      },
      {
        id: 'taylor-series',
        title: 'Taylor and Maclaurin Series',
        description: 'Representing functions as infinite polynomials. The most powerful approximation tool in mathematics.',
        prereqRecap: [
          { term: 'Derivative', definition: '$f\'(x)$ is the rate of change. $f^{(n)}(x)$ is the $n$th derivative.' },
          { term: 'Factorial', definition: '$n! = n \\times (n-1) \\times \\cdots \\times 1$. $0! = 1$ by convention.' },
          { term: 'Convergence', definition: 'An infinite sum has a finite value. $\\sum_{n=0}^{\\infty} \\frac{1}{2^n} = 2$.' }
        ],
        whyExists: { html: `
          <p><strong>Why represent functions as infinite polynomials?</strong> Polynomials are the easiest functions to compute: just addition and multiplication. If $\\sin(x) = x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\cdots$, then computing $\\sin(0.5)$ becomes arithmetic. This is exactly how computers and calculators evaluate transcendental functions.</p>
          <p><strong>Why does it work?</strong> If $f(x)$ can be written as a power series $\\sum c_n x^n$, then $f(0) = c_0$, $f'(0) = c_1$, $f''(0) = 2c_2$, etc. Solving for the coefficients: $c_n = \\frac{f^{(n)}(0)}{n!}$. The Taylor series encodes ALL information about $f$ near $a$ using its derivatives at $a$. Each derivative contributes one more term of accuracy.</p>
          <p><strong>Practical application:</strong> Physics linearizes complex forces using Taylor expansions. $\\sin\\theta \\approx \\theta$ for small angles drives pendulum theory. Signal processing, numerical methods, and differential equation solvers all rely on Taylor approximations.</p>
          ${WHY('Why the factorial in the denominator?', '<p>When you differentiate $x^n$ repeatedly, each differentiation multiplies by the current power: $\\frac{d^n}{dx^n}x^n = n!$. The $n!$ in the denominator of $\\frac{f^{(n)}(a)}{n!}$ cancels this, ensuring each coefficient captures exactly the right derivative value. Without the factorial, the coefficients would grow uncontrollably.</p>')}
        ` },
        hook: { html: `
          <div class="callout callout-puzzle"><h4>🧩 Puzzle: How Does Your Calculator Compute $\\sin(0.5)$?</h4>
          <p>Calculators do not have sine tables. They use the Taylor series: $\\sin(x) = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$</p>
          <p>For $x = 0.5$: $0.5 - \\frac{0.125}{6} + \\frac{0.03125}{120} \\approx 0.4794$. Just three terms give 4 decimal places of accuracy.</p></div>` },
        concept: { html: `
          <p>The <strong>Taylor series</strong> of $f(x)$ centered at $a$ represents $f$ as an infinite polynomial:</p>
          <div class="math-block">$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n$$</div>
          <p>When $a = 0$, it is called a <strong>Maclaurin series</strong>.</p>
          <div class="callout callout-key"><h4>Essential Maclaurin Series</h4>
          <ul>
            <li>$e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$ (converges for all $x$)</li>
            <li>$\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$</li>
            <li>$\\cos x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!} = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots$</li>
            <li>$\\frac{1}{1-x} = \\sum_{n=0}^{\\infty} x^n = 1 + x + x^2 + x^3 + \\cdots$ (for $|x| \\lt 1$)</li>
            <li>$\\ln(1+x) = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1} x^n}{n} = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots$ (for $-1 < x \\leq 1$)</li>
          </ul></div>` },
        definition: { html: `
          <p><strong>Convergence Tests for Series:</strong></p>
          <ul>
            <li><strong>Ratio Test:</strong> $L = \\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right|$. Converges if $L \\lt 1$, diverges if $L \\gt 1$.</li>
            <li><strong>Root Test:</strong> $L = \\lim_{n \\to \\infty} \\sqrt[n]{|a_n|}$. Same criteria.</li>
            <li><strong>Integral Test:</strong> $\\sum a_n$ converges iff $\\int_1^\\infty f(x)\\,dx$ converges, where $f(n) = a_n$.</li>
            <li><strong>Comparison Test:</strong> Compare to a known convergent/divergent series.</li>
          </ul>
          <p><strong>Radius of Convergence:</strong> The Taylor series converges for $|x - a| < R$ where $R$ is found via the Ratio Test.</p>` },
        examples: [{
          title: 'Finding a Taylor Series',
          problem: 'Find the Maclaurin series for $f(x) = e^{-x^2}$.',
          steps: [
            { title: 'Start with the known series for $e^u$', content: '$e^u = \\sum_{n=0}^{\\infty} \\frac{u^n}{n!}$', why: 'We already know the series for $e^u$. Substitution is faster than computing derivatives.' },
            { title: 'Substitute $u = -x^2$', content: '$e^{-x^2} = \\sum_{n=0}^{\\infty} \\frac{(-x^2)^n}{n!} = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{n!}$', why: '$(-x^2)^n = (-1)^n x^{2n}$. Every power of $x$ is even.' },
            { title: 'Write first few terms', content: '$e^{-x^2} = 1 - x^2 + \\frac{x^4}{2!} - \\frac{x^6}{3!} + \\cdots$', why: 'Expanding for $n = 0, 1, 2, 3$ gives these terms. Converges for all $x$.' }
          ]
        }],
        flashCards: [
      { type: 'define', front: 'What is a Taylor series?', back: 'f(x) = sum of f^(n)(a)/n! * (x-a)^n. It represents a function as an infinite polynomial centered at x=a. When a=0, it is called a Maclaurin series.' },
      { type: 'why', front: 'Why use Taylor series?', back: 'They approximate complex functions with polynomials. sin(x) near 0 is approximately x - x^3/6. Calculators use Taylor polynomials to compute trig, exp, and log values.' },
      { type: 'how', front: 'How to find the radius of convergence?', back: 'Use the ratio test: R = lim|a_n/a_{n+1}|. The series converges for |x-a| < R and diverges for |x-a| > R. At |x-a| = R, test separately.' }
    ],
    exercises: [{
          difficulty: 'easy',
          question: 'The Maclaurin series for $e^x$ starts with: $1 + x + \\frac{x^2}{2!} + \\ldots$ What is the next term?',
          options: ['$\\frac{x^3}{3!}$', '$\\frac{x^3}{3}$', '$x^3$', '$\\frac{x^4}{4!}$'],
          correctIndex: 0,
          hint: '<p>Pattern: $\\frac{x^n}{n!}$.</p>',
          correctExplanation: 'For $n = 3$: $\\frac{x^3}{3!} = \\frac{x^3}{6}$.',
          wrongExplanations: { 1: 'Denominator is $n! = 6$, not $n = 3$.', 2: 'Missing the $n!$ denominator.', 3: 'That is the $n=4$ term.' }
        },{
          difficulty: 'medium',
          question: 'The Maclaurin series for $\\sin x$ contains only:',
          options: ['Even powers of $x$', 'Odd powers of $x$', 'All powers of $x$', 'No negative terms'],
          correctIndex: 1,
          hint: '<p>$\\sin x = x - x^3/3! + x^5/5! - \\cdots$</p>',
          correctExplanation: '$\\sin x$ is an odd function, so its Taylor series contains only odd powers: $x, x^3, x^5, \\ldots$',
          wrongExplanations: { 0: 'Even powers appear in $\\cos x$, not $\\sin x$.', 2: 'Only odd powers appear.', 3: 'The series alternates: $+, -, +, -, \\ldots$' }
        },{
          difficulty: 'hard',
          question: 'The radius of convergence of $\\sum \\frac{x^n}{n!}$ is:',
          options: ['$R = 1$', '$R = e$', '$R = \\infty$', '$R = 0$'],
          correctIndex: 2,
          hint: '<p>Apply the Ratio Test.</p>',
          correctExplanation: 'Ratio: $\\frac{|x|}{n+1} \\to 0 \\lt 1$ for all $x$. Converges everywhere: $R = \\infty$.',
          wrongExplanations: { 0: 'That is $\\sum x^n$ (geometric). Factorial grows much faster.', 1: 'The series converges for all $x$, not just $|x| < e$.', 3: '$R = 0$ means convergence only at center.' }
        }],
        freeResponse: [
          { difficulty: 'easy', question: 'First 3 terms of $e^x$ Maclaurin series:', accept: ['1 + x + x^2/2', '1+x+x^2/2'], placeholder: 'e.g. 1+x+...', explanation: '$e^x = 1 + x + \\frac{x^2}{2} + \\cdots$' },
          { difficulty: 'easy', question: 'The Maclaurin series for $\\cos x$ starts with: $1 - $ ? $ + \\cdots$', accept: ['x^2/2', 'x^2/2!'], placeholder: 'Second term', explanation: '$\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots$' },
          { difficulty: 'medium', question: 'Approximate $e^1$ using first 4 terms: $1 + 1 + 1/2 + 1/6 =$?', accept: ['2.667', '8/3', '2.67'], placeholder: 'Number', explanation: '$1 + 1 + 0.5 + 0.167 \\approx 2.667$ (true value: $e \\approx 2.718$).' },
          { difficulty: 'medium', question: 'Radius of convergence of $\\sum x^n/n!$:', accept: ['infinity', 'inf'], placeholder: 'R = ?', explanation: 'Ratio test: $\\frac{|x|}{n+1} \\to 0 < 1$ for all $x$. $R = \\infty$.' },
          { difficulty: 'hard', question: 'Does $\\sum_{n=1}^{\\infty} \\frac{1}{n^2}$ converge or diverge?', accept: ['converge', 'converges'], placeholder: 'converge/diverge', explanation: 'p-series with $p = 2 \\gt 1$: converges (to $\\pi^2/6$).' },
    { difficulty: 'easy', question: '$\\int \\frac{1}{x}\\,dx =$?', accept: ['ln|x|+C', 'ln(x)+C'], placeholder: 'Expression', explanation: '$\\ln|x| + C$.' },
    { difficulty: 'medium', question: '$\\int e^{-x}\\,dx =$?', accept: ['-e^(-x)+C', '-e^{-x}+C'], placeholder: 'Expression', explanation: '$-e^{-x} + C$.' },
    { difficulty: 'easy', question: '$\\int 3x^2\\,dx =$?', accept: ['x^3+C', 'x^3 + C'], placeholder: 'Expression', explanation: '$3 \\cdot \\frac{x^3}{3} + C = x^3 + C$.' },
    { difficulty: 'medium', question: '$\\int \\sec^2(x)\\,dx =$?', accept: ['tan(x)+C', 'tanx+C', '\\tan x + C'], placeholder: 'Expression', explanation: 'Antiderivative of $\\sec^2 x$ is $\\tan x + C$.' },
    { difficulty: 'hard', question: '$\\int_0^{\\pi/2} \\sin(x)\\cos(x)\\,dx =$?', accept: ['1/2', '0.5'], placeholder: 'Number', explanation: '$\\sin x \\cos x = \\frac{1}{2}\\sin(2x)$. $\\int_0^{\\pi/2} \\frac{1}{2}\\sin(2x)\\,dx = \\frac{1}{2}[-\\frac{1}{2}\\cos(2x)]_0^{\\pi/2} = \\frac{1}{2}$.' },
    { difficulty: 'easy', question: '$\\int e^x\\,dx =$?', accept: ['e^x+C', 'e^x + C'], placeholder: 'Expression', explanation: '$e^x$ is its own antiderivative.' },
    { difficulty: 'medium', question: 'For $\\int \\frac{2x}{x^2+4}\\,dx$, let $u =$?', accept: ['x^2+4', 'x^2 + 4'], placeholder: 'u = ?', explanation: '$u = x^2 + 4$, $du = 2x\\,dx$. Integral becomes $\\ln|u| + C$.' },
    { difficulty: 'hard', question: '$\\int_0^{\\infty} e^{-x}\\,dx =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$[-e^{-x}]_0^{\\infty} = 0 - (-1) = 1$. Converges.' },
    { difficulty: 'medium', question: 'Evaluate $\\int_1^e \\frac{1}{x}\\,dx =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$[\\ln x]_1^e = \\ln e - \\ln 1 = 1 - 0 = 1$.' },
    { difficulty: 'medium', question: '$\\int \\frac{2}{3x+1}\\,dx =$?', accept: ['(2/3)ln|3x+1|+C', '2ln|3x+1|/3+C'], placeholder: 'Expression', explanation: 'Let $u = 3x+1$: $\\frac{2}{3}\\ln|3x+1| + C$.' },
    { difficulty: 'hard', question: '$\\int \\frac{1}{x^2+4}\\,dx =$?', accept: ['(1/2)arctan(x/2)+C'], placeholder: 'Expression', explanation: '$\\frac{1}{2}\\arctan(x/2) + C$.' },
    { difficulty: 'hard', question: 'Partial fractions: $\\frac{1}{(x-1)(x+1)} = \\frac{A}{x-1} + \\frac{B}{x+1}$. $A =$?', accept: ['1/2', '0.5'], placeholder: 'Number', explanation: 'Set $x = 1$: $1/(2) = A$. $A = 1/2$.' },
    { difficulty: 'medium', question: '$\\int_0^4 \\sqrt{x}\\,dx =$?', accept: ['16/3', '5.33'], placeholder: 'Number', explanation: '$[\\frac{2}{3}x^{3/2}]_0^4 = \\frac{2}{3}(8) = 16/3$.' },
    { difficulty: 'easy', question: '$\\int_0^1 1\\,dx =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$[x]_0^1 = 1 - 0 = 1$.' }
        ],
        stepBuilder: [
          { difficulty: 'medium', question: 'Find the Maclaurin series for $f(x) = \\frac{1}{1+x}$.', steps: [
            { content: 'Start with known: $\\frac{1}{1-u} = \\sum u^n$.' },
            { content: 'Substitute $u = -x$: $\\frac{1}{1+x} = \\sum (-x)^n = \\sum (-1)^n x^n$.' },
            { content: '$= 1 - x + x^2 - x^3 + \\cdots$ for $|x| \\lt 1$.' }
          ], explanation: 'Substitution into known series avoids computing derivatives.' }
        ],
        matching: [
          { difficulty: 'medium', instruction: 'Match convergence test to best use case:', pairs: [
            { left: 'Ratio Test', right: 'Series with factorials or exponentials' },
            { left: 'Integral Test', right: 'Decreasing positive functions' },
            { left: 'Comparison Test', right: 'Comparing to known series' },
            { left: 'Alternating Series Test', right: 'Series with $(-1)^n$ factor' }
          ] }
        ],
        fillBlanks: [
          { difficulty: 'easy', context: 'Taylor series:', expression: 'The Maclaurin series is centered at $a =$ {{0}}.', blanks: [ { accept: ['0'], size: 3 } ], explanation: 'Maclaurin = Taylor centered at 0.' },
          { difficulty: 'medium', context: 'Ratio test:', expression: 'If $\\lim |a_{n+1}/a_n| = L$ and $L \\lt 1$, the series {{0}}.', blanks: [ { accept: ['converges'], size: 10 } ], explanation: 'Ratio test: $L \\lt 1$ means absolute convergence.' }
        ],
        multiPart: [
          { difficulty: 'hard', question: 'p-series $\\sum 1/n^p$: determine convergence.', parts: [
            { question: 'Does $\\sum 1/n$ converge? (yes/no)', accept: ['no', 'No'], placeholder: 'yes/no', explanation: 'Harmonic series ($p=1$) diverges.' },
            { question: 'Does $\\sum 1/n^2$ converge? (yes/no)', accept: ['yes', 'Yes'], placeholder: 'yes/no', explanation: '$p = 2 \\gt 1$: converges.' },
            { question: 'Threshold: p-series converges when $p >$ ?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\sum 1/n^p$ converges iff $p \\gt 1$.' }
          ], completionMessage: 'p-series test: converges iff $p \\gt 1$. The boundary $p = 1$ (harmonic) diverges.' }
        ],
        stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Series Strategy</h4>
          <ol><li><strong>Use known series</strong> and substitute, rather than computing all derivatives.</li>
          <li><strong>Ratio Test</strong> is the default for convergence. Works on most series.</li>
          <li><strong>p-series:</strong> $\\sum 1/n^p$ converges iff $p \\gt 1$.</li>
          <li><strong>Partial sums</strong> give polynomial approximations.</li></ol></div>` }
      }
    ]
  });
})();
