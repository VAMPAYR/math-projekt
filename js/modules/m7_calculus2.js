/* ============================================================
   MODULE 7: Calculus 2 — Integration Techniques & Series (4 topics)
   Source: Thomas' Calculus Chapters 8-10
   ============================================================ */
(function() {
if (!window.MATH_MODULES) window.MATH_MODULES = [];
const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

window.MATH_MODULES.push({
id: 'calculus2',
order: 11,
title: 'Calculus 2B: Sequences \u0026 Series',
description: 'Sequences, infinite series, and convergence tests. When does adding infinitely many numbers give a finite answer? Requires: integration (Module 10).',
topics: [

/* TOPIC 7.1: Integration by Parts */
{
  id: 'integration-by-parts',
  title: 'Integration by Parts',
  description: 'The product rule in reverse: integrating products of functions.',
  prereqRecap: [
    { term: 'Product Rule', definition: '$(fg)\' = f\'g + fg\'$ (Module 6).' },
    { term: 'Integral', definition: '$\\int f(x)\\,dx = F(x) + C$ where $F\' = f$ (Module 6).' },
    { term: 'U-Substitution', definition: 'Let $u = g(x)$ to simplify $\\int f(g(x))g\'(x)\\,dx$ (Module 6).' }
  ],
  whyExists: { html: `
    <p><strong>Why integration by parts?</strong> U-substitution handles compositions. Integration by parts handles products: $\\int x e^x\\,dx$, $\\int x \\sin x\\,dx$, $\\int \\ln x\\,dx$. It comes from integrating the product rule.</p>
    ${WHY('Derivation', '<p>Product rule: $(uv)\' = u\'v + uv\'$. Integrate both sides: $uv = \\int u\'v\\,dx + \\int uv\'\\,dx$. Rearrange: $$\\int uv\'\\,dx = uv - \\int u\'v\\,dx$$ Or in differential form: $\\int u\\,dv = uv - \\int v\\,du$.</p>')}
  ` },
  concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 400 200" width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="170" x2="380" y2="170" stroke="#94a3b8" stroke-width="1"/>
  <line x1="60" y1="20" x2="60" y2="180" stroke="#94a3b8" stroke-width="1"/>
  <line x1="40" y1="80" x2="380" y2="80" stroke="#f59e0b" stroke-width="1" stroke-dasharray="5,5"/>
  <text x="385" y="83" fill="#f59e0b" font-size="10" font-family="Inter,sans-serif">L</text>
  <circle cx="80" cy="150" r="3" fill="#3b82f6"/><circle cx="105" cy="31" r="3" fill="#3b82f6"/><circle cx="130" cy="114.3" r="3" fill="#3b82f6"/><circle cx="155" cy="55.99000000000001" r="3" fill="#3b82f6"/><circle cx="180" cy="96.80699999999999" r="3" fill="#3b82f6"/><circle cx="205" cy="68.2351" r="3" fill="#3b82f6"/><circle cx="230" cy="88.23543" r="3" fill="#3b82f6"/><circle cx="255" cy="74.23519900000001" r="3" fill="#3b82f6"/><circle cx="280" cy="84.0353607" r="3" fill="#3b82f6"/><circle cx="305" cy="77.17524751" r="3" fill="#3b82f6"/><circle cx="330" cy="81.97732674299999" r="3" fill="#3b82f6"/><circle cx="355" cy="78.6158712799" r="3" fill="#3b82f6"/>
  <text x="200" y="18" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="Inter,sans-serif">Sequence converging to limit L</text>
  <text x="200" y="38" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="Inter,sans-serif">Terms oscillate but approach L as n → ∞</text>
  <text x="80" y="185" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">a₁</text>
  <text x="105" y="185" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">a₂</text>
  <text x="130" y="185" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">a₃</text>
  <text x="310" y="185" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">aₙ</text>
</svg>
</div>
<p class="math-diagram-label">A converging sequence: each term gets closer to the limit L</p>

    <div class="callout callout-key"><h4>Integration by Parts Formula</h4>
    <p>$$\\int u\\,dv = uv - \\int v\\,du$$</p>
    <p>Choose $u$ and $dv$ from the integrand. Then compute $du$ and $v$.</p></div>
    <div class="callout callout-key"><h4>LIATE Rule (choosing $u$)</h4>
    <p>Choose $u$ from the first type you encounter in this list:</p>
    <ol>
      <li><strong>L</strong>ogarithmic: $\\ln x$</li>
      <li><strong>I</strong>nverse trig: $\\arctan x$</li>
      <li><strong>A</strong>lgebraic: $x^n$</li>
      <li><strong>T</strong>rigonometric: $\\sin x, \\cos x$</li>
      <li><strong>E</strong>xponential: $e^x$</li>
    </ol>
    ${WHY('Why this order?', '<p>Functions at the top of LIATE simplify when differentiated ($\\frac{d}{dx}\\ln x = \\frac{1}{x}$), while those at the bottom simplify when integrated ($\\int e^x\\,dx = e^x$). Choosing $u$ from the top makes $du$ simpler and $v$ manageable.</p>')}</div>
  ` },
  definition: { html: `<p><strong>Integration by Parts:</strong> $\\int u\\,dv = uv - \\int v\\,du$. Trades one integral for (hopefully) a simpler one.</p>` },
  examples: [{
    title: 'IBP Example',
    problem: 'Evaluate $\\int x e^x\\,dx$.',
    steps: [
      { title: 'Choose $u$ and $dv$', content: '$u = x$ (algebraic), $dv = e^x\\,dx$.', why: 'LIATE: $x$ (algebraic) comes before $e^x$ (exponential).' },
      { title: 'Compute $du$ and $v$', content: '$du = dx$, $v = e^x$.', why: 'Differentiate $u$, integrate $dv$.' },
      { title: 'Apply formula', content: '$xe^x - \\int e^x\\,dx = xe^x - e^x + C = e^x(x-1) + C$.', why: '$uv - \\int v\\,du = xe^x - \\int e^x\\,dx$.' }
    ]
  },
  {
    title: 'IBP with Tabular Method (Repeated IBP)',
    problem: 'Evaluate $\\int x^2 e^x\\,dx$.',
    steps: [
      { title: 'Set up tabular method', content: 'Differentiate $u = x^2$ repeatedly; integrate $dv = e^x\\,dx$ repeatedly. Signs alternate: $+, -, +$.', why: 'The tabular method organizes repeated IBP into a table when one factor eventually differentiates to 0.' },
      { title: 'Build the table', content: 'Derivatives of $x^2$: $x^2 \\to 2x \\to 2 \\to 0$. Antiderivatives of $e^x$: $e^x \\to e^x \\to e^x$.', why: 'Each row pairs a derivative with the next antiderivative, with alternating signs.' },
      { title: 'Combine', content: '$+ x^2 e^x - 2x e^x + 2e^x + C = e^x(x^2 - 2x + 2) + C$.', why: 'Multiply diagonally with alternating signs: $(+)(x^2)(e^x) + (-)(2x)(e^x) + (+)(2)(e^x)$.' }
    ]
  }],
  flashCards: [
      { type: 'how', front: 'How does integration by parts work?', back: 'integral(u dv) = uv - integral(v du). Choose u and dv wisely. LIATE: Log, Inverse trig, Algebraic, Trig, Exponential.' },
      { type: 'why', front: 'Why does it work?', back: 'Reverses the product rule: d(uv) = u dv + v du. Integrate both sides and rearrange.' },
      { type: 'how', front: 'When to use tabular integration?', back: 'When one factor is a polynomial (differentiates to 0) and the other integrates easily. Create a table: differentiate down, integrate down, alternate signs.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'In $\\int x\\cos x\\,dx$, the best choice for $u$ is:', options: ['$\\cos x$', '$x$', '$x\\cos x$', '$dx$'], correctIndex: 1, hint: '<p>LIATE: Algebraic before Trigonometric.</p>', correctExplanation: '$u = x$ (algebraic). $dv = \\cos x\\,dx$. Then $du = dx$, $v = \\sin x$.', wrongExplanations: { 0: 'Choosing $u = \\cos x$ makes $du = -\\sin x\\,dx$ and $v = x^2/2$, creating a harder integral.', 2: 'You must split the integrand into $u$ and $dv$.', 3: '$dx$ is part of $dv$, not $u$.' } },
    { difficulty: 'medium', question: '$\\int \\ln x\\,dx = $?', options: ['$\\frac{1}{x} + C$', '$x\\ln x - x + C$', '$x\\ln x + C$', '$\\frac{(\\ln x)^2}{2} + C$'], correctIndex: 1, hint: '<p>$u = \\ln x$, $dv = dx$.</p>', correctExplanation: '$u = \\ln x, du = \\frac{1}{x}dx, v = x$. $x\\ln x - \\int x \\cdot \\frac{1}{x}\\,dx = x\\ln x - x + C$.', wrongExplanations: { 0: 'That is the derivative of $\\ln x$, not its integral.', 2: 'Missing the $-x$ term from $-\\int 1\\,dx$.', 3: 'That would be $\\int \\frac{\\ln x}{x}\\,dx$, not $\\int \\ln x\\,dx$.' } },
    { difficulty: 'medium', question: '$\\int x^2 e^x\\,dx$ requires IBP how many times?', options: ['0', '1', '2', '3'], correctIndex: 2, hint: '<p>Each application reduces the power of $x$ by 1.</p>', correctExplanation: 'First IBP: $x^2 e^x - 2\\int xe^x\\,dx$. Second IBP on $\\int xe^x\\,dx$.', wrongExplanations: { 0: 'This is not a basic integral; IBP is required.', 1: 'One application leaves $\\int xe^x\\,dx$, which still needs IBP.', 3: 'Two applications reduce $x^2 \\to x \\to 1$, and $\\int e^x\\,dx = e^x$ is basic.' } },
    { difficulty: 'hard', question: '$\\int e^x \\sin x\\,dx$ requires:', options: ['One IBP', 'Two IBPs + solving for the integral', 'U-substitution', 'Cannot be integrated'], correctIndex: 1, hint: '<p>After two IBPs, the original integral reappears.</p>', correctExplanation: 'After two applications, you get $\\int e^x\\sin x\\,dx = e^x\\sin x - e^x\\cos x - \\int e^x\\sin x\\,dx$. Move the integral to the left: $2\\int e^x\\sin x\\,dx = e^x(\\sin x - \\cos x)$.', wrongExplanations: { 0: 'One IBP leaves another integral that requires IBP again.', 2: 'No obvious substitution simplifies this.', 3: 'It is integrable; the trick is solving the algebraic equation for the integral.' } },
    { difficulty: 'hard', question: 'Evaluate $\\int_0^1 x e^{-x}\\,dx$ (to 3 decimal places):', options: ['$0.264$', '$0.368$', '$0.632$', '$1.000$'], correctIndex: 0, hint: '<p>IBP: $u = x, dv = e^{-x}dx$. Then evaluate at bounds.</p>', correctExplanation: '$u=x, v=-e^{-x}$. $[-xe^{-x}]_0^1 + \\int_0^1 e^{-x}\\,dx = -e^{-1} + [-e^{-x}]_0^1 = -e^{-1} + (-e^{-1}+1) = 1-2e^{-1} \\approx 0.264$.', wrongExplanations: { 1: '$e^{-1} \\approx 0.368$, but that is not the full computation.', 2: '$1 - e^{-1} \\approx 0.632$. The correct answer is $1 - 2e^{-1} \\approx 0.264$.', 3: 'The integral is less than the area of the unit square.' } },
    { difficulty: 'easy', question: 'The IBP formula $\\int u\\,dv = uv - \\int v\\,du$ is derived from which rule?', options: ['Chain rule', 'Product rule', 'Quotient rule', 'Power rule'], correctIndex: 1, hint: '<p>Which differentiation rule involves products?</p>', correctExplanation: 'IBP comes from integrating the product rule: $(uv)\' = u\'v + uv\'$.', wrongExplanations: { 0: 'The chain rule gives u-substitution, not IBP.', 2: 'The quotient rule is not directly integrated in standard techniques.', 3: 'The power rule gives the power rule for integration.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'In $\\int x e^x\\,dx$, what should $u$ be? (LIATE rule)', accept: ['x'], placeholder: 'u = ?', explanation: 'LIATE: Algebraic ($x$) before Exponential ($e^x$). $u = x$.' },
    { difficulty: 'easy', question: 'The IBP formula is $\\int u\\,dv = uv -$ ?', accept: ['int v du', '\\int v du', 'integral of v du'], placeholder: 'What is subtracted?', explanation: '$\\int u\\,dv = uv - \\int v\\,du$.' },
    { difficulty: 'medium', question: '$\\int \\ln x\\,dx = x\\ln x - $ ?$+ C$', accept: ['x'], placeholder: 'What term?', explanation: '$\\int \\ln x\\,dx = x\\ln x - x + C$.' },
    { difficulty: 'hard', question: '$\\int x^2 e^x\\,dx$ requires how many rounds of IBP?', accept: [2, '2'], placeholder: 'Number', explanation: 'Each round reduces $x^n$ by 1. $x^2 \\to x \\to$ constant: 2 rounds.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Evaluate $\\int x \\cos x\\,dx$ by integration by parts.', steps: [
      { content: 'Choose: $u = x$ (algebraic), $dv = \\cos x\\,dx$.' },
      { content: '$du = dx$, $v = \\sin x$.' },
      { content: 'IBP: $uv - \\int v\\,du = x\\sin x - \\int \\sin x\\,dx$.' },
      { content: '$= x\\sin x - (-\\cos x) + C = x\\sin x + \\cos x + C$.' }
    ], explanation: 'LIATE: choose $u$ as the algebraic part. IBP formula: $\\int u\\,dv = uv - \\int v\\,du$.' },
    { difficulty: 'hard', question: 'Evaluate $\\int e^x \\sin x\\,dx$ (requires 2 rounds of IBP).', steps: [
      { content: 'Round 1: $u = \\sin x, dv = e^x dx$. $du = \\cos x\\,dx, v = e^x$.' },
      { content: '$I = e^x \\sin x - \\int e^x \\cos x\\,dx$.' },
      { content: 'Round 2: $u = \\cos x, dv = e^x dx$. $du = -\\sin x\\,dx, v = e^x$.' },
      { content: '$I = e^x \\sin x - e^x \\cos x - \\int e^x \\sin x\\,dx = e^x(\\sin x - \\cos x) - I$.' },
      { content: '$2I = e^x(\\sin x - \\cos x)$. $I = \\frac{e^x(\\sin x - \\cos x)}{2} + C$.' }
    ], explanation: 'When IBP reproduces the original integral, solve algebraically for $I$.' }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'LIATE priority order:', expression: '$L$ = {{0}}, $I$ = {{1}}, $A$ = Algebraic, $T$ = Trig, $E$ = Exponential', blanks: [ { accept: ['Logarithmic', 'Log'], size: 12 }, { accept: ['Inverse trig', 'Inverse Trig'], size: 12 } ], explanation: 'LIATE: Logarithmic > Inverse trig > Algebraic > Trig > Exponential for choosing $u$.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 IBP Strategy</h4>
    <ol><li><strong>LIATE</strong>: choose $u$ from the first matching type.</li>
    <li>If IBP creates a HARDER integral, switch your choices.</li>
    <li>If the original integral reappears after 2 rounds, solve algebraically.</li></ol></div>` }
},

/* TOPIC 7.2: Sequences */
{
  id: 'sequences',
  title: 'Sequences: Arithmetic, Geometric \u0026 Convergence',
  description: 'Ordered lists of numbers defined by rules. The foundation of series: before summing infinitely many terms, understand the terms themselves.',
  prereqRecap: [
    { term: 'Function', definition: 'A rule assigning each input one output. $f(n)$ gives the $n$th value (Module 4).' },
    { term: 'Limit', definition: '$\\lim_{x \\to a} f(x) = L$ means $f(x) \\to L$ as $x \\to a$ (Module 6).' },
    { term: 'Exponent Rules', definition: '$a^m \\cdot a^n = a^{m+n}$, $(a^m)^n = a^{mn}$ (Module 3).' }
  ],
  whyExists: { html: `
    <p><strong>Why sequences?</strong> A sequence $a_1, a_2, a_3, \\ldots$ is the raw material for series ($\\sum a_n$). Knowing whether $a_n \\to 0$ is the first test for series convergence. Sequences model growth patterns: population growth (geometric), even spacing (arithmetic), and decay ($1/n$).</p>
    ${WHY('Sequence vs. Series', '<p>A <strong>sequence</strong> is a list: $1, 1/2, 1/4, 1/8, \\ldots$ A <strong>series</strong> is a sum: $1 + 1/2 + 1/4 + 1/8 + \\cdots$ The sequence gives the individual terms; the series asks what happens when you add them all up.</p>')}
  ` },
  formalDefinitions: [
      { term: 'Sequence', symbol: '$\\{a_n\\}_{n=1}^\\infty$', definition: 'A function from $\\mathbb{N}$ to $\\mathbb{R}$. Each natural number $n$ maps to a real number $a_n$. A sequence converges to $L$ if $\\lim_{n\\to\\infty} a_n = L$.' },
      { term: 'Series', symbol: '$\\sum_{n=1}^\\infty a_n$', definition: 'The sum of the terms of a sequence. Defined as $\\lim_{N\\to\\infty} \\sum_{n=1}^N a_n$ (limit of partial sums). Converges if this limit exists and is finite.' },
      { term: 'Geometric Series', symbol: '$\\sum_{n=0}^\\infty ar^n = \\frac{a}{1-r}$', definition: 'Converges if and only if $|r| < 1$. The sum equals $\\frac{a}{1-r}$. Diverges if $|r| \\geq 1$.' }
    ],
    concept: { html: `
    <div class="callout callout-key"><h4>Arithmetic Sequences</h4>
    <p>Each term differs from the previous by a constant <strong>common difference</strong> $d$:</p>
    <p>$a_n = a_1 + (n-1)d$</p>
    <p>Examples: $2, 5, 8, 11, \\ldots$ ($d = 3$). $10, 7, 4, 1, \\ldots$ ($d = -3$).</p>
    <p><strong>Sum of first $n$ terms:</strong> $S_n = \\frac{n}{2}(a_1 + a_n) = \\frac{n}{2}(2a_1 + (n-1)d)$</p>
    ${WHY('Why this sum formula?', '<p>Pair the first and last terms: $a_1 + a_n = a_2 + a_{n-1} = \\ldots$ Each pair sums to $a_1 + a_n$, and there are $n/2$ pairs. This is how young Gauss summed $1 + 2 + \\cdots + 100 = \\frac{100 \\cdot 101}{2} = 5050$.</p>')}</div>
    <div class="callout callout-key"><h4>Geometric Sequences</h4>
    <p>Each term is a constant <strong>ratio</strong> $r$ times the previous:</p>
    <p>$a_n = a_1 \\cdot r^{n-1}$</p>
    <p>Examples: $3, 6, 12, 24, \\ldots$ ($r = 2$). $100, 50, 25, \\ldots$ ($r = 1/2$).</p>
    <p><strong>Partial sum:</strong> $S_n = a_1 \\cdot \\frac{1 - r^n}{1 - r}$ (when $r \\neq 1$)</p>
    <p><strong>Infinite sum:</strong> $S = \\frac{a_1}{1 - r}$ when $|r| \\lt 1$.</p>
    ${WHY('Why does the infinite sum work only for $|r| \\lt 1$?', '<p>When $|r| \\lt 1$, $r^n \\to 0$ as $n \\to \\infty$, so $S_n = a_1 \\cdot \\frac{1 - r^n}{1 - r} \\to \\frac{a_1}{1 - r}$. When $|r| \\geq 1$, the terms do not shrink to zero, and the sum grows without bound.</p>')}</div>
    <div class="callout callout-key"><h4>Sequence Convergence</h4>
    <p>$\\{a_n\\}$ <strong>converges</strong> if $\\lim_{n \\to \\infty} a_n = L$ (a finite number). Otherwise, it <strong>diverges</strong>.</p>
    <ul>
      <li>$a_n = \\frac{1}{n} \\to 0$ (converges)</li>
      <li>$a_n = (-1)^n$ oscillates (diverges)</li>
      <li>$a_n = n^2$ grows without bound (diverges)</li>
      <li><strong>Monotone Convergence Theorem:</strong> A bounded, monotone sequence converges.</li>
    </ul></div>
  ` },
  definition: { html: '<p><strong>Sequence:</strong> A function from $\\mathbb{N}$ to $\\mathbb{R}$: $a: n \\mapsto a_n$. Written $\\{a_n\\}_{n=1}^{\\infty}$ or $a_1, a_2, a_3, \\ldots$</p><p><strong>Monotone:</strong> Increasing ($a_{n+1} \\geq a_n$ for all $n$) or decreasing ($a_{n+1} \\leq a_n$).</p>' },
  examples: [{
    title: 'Finding Arithmetic Sequence Terms',
    problem: 'Find the 20th term and the sum of the first 20 terms of the arithmetic sequence $3, 7, 11, 15, \\ldots$',
    steps: [
      { title: 'Identify $a_1$ and $d$', content: '$a_1 = 3$, $d = 7 - 3 = 4$.', why: 'The common difference is found by subtracting consecutive terms.' },
      { title: 'Find $a_{20}$', content: '$a_{20} = 3 + (20-1)(4) = 3 + 76 = 79$.', why: '$a_n = a_1 + (n-1)d$.' },
      { title: 'Find $S_{20}$', content: '$S_{20} = \\frac{20}{2}(3 + 79) = 10 \\cdot 82 = 820$.', why: '$S_n = \\frac{n}{2}(a_1 + a_n)$. Average of first and last, times count.' }
    ]
  },
  {
    title: 'Geometric Sequence Convergence',
    problem: 'Does $\\sum_{n=0}^{\\infty} 5 \\cdot (0.8)^n$ converge? If so, find the sum.',
    steps: [
      { title: 'Identify as geometric', content: '$a_1 = 5$, $r = 0.8$.', why: 'Each term is $0.8$ times the previous.' },
      { title: 'Check convergence', content: '$|r| = 0.8 \\lt 1$, so the series CONVERGES.', why: 'Geometric series converges iff $|r| \\lt 1$.' },
      { title: 'Compute sum', content: '$S = \\frac{5}{1 - 0.8} = \\frac{5}{0.2} = 25$.', why: '$S = \\frac{a_1}{1 - r}$ for convergent geometric series.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a sequence?', back: 'An ordered list of numbers: a_1, a_2, a_3, ... Each number is a term. A sequence converges if its terms approach a limit L.' },
      { type: 'how', front: 'How to determine if a sequence converges?', back: 'Compute lim a_n as n -> infinity. If the limit exists and is finite, the sequence converges. Common techniques: L’Hopital, squeeze theorem, dominant term.' },
      { type: 'why', front: 'Why study sequences before series?', back: 'A series is a sum of sequence terms. If the terms do not approach 0, the series diverges (nth term test). Understanding sequences is prerequisite to series.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'What is the 10th term of $2, 5, 8, 11, \\ldots$?', options: ['$29$', '$32$', '$27$', '$30$'], correctIndex: 0, hint: '<p>$a_n = a_1 + (n-1)d$. $a_1 = 2$, $d = 3$.</p>', correctExplanation: '$a_{10} = 2 + 9(3) = 29$.', wrongExplanations: { 1: '$2 + 10(3) = 32$, but it is $n-1 = 9$, not $n = 10$.', 2: '$a_9 = 2 + 8(3) = 26$. Close but one off.', 3: '$a_{10} = 2 + 9 \\times 3 = 29$, not 30.' } },
    { difficulty: 'easy', question: 'What type is $3, 6, 12, 24, \\ldots$?', options: ['Arithmetic', 'Geometric', 'Neither', 'Both'], correctIndex: 1, hint: '<p>Check: is the difference constant, or the ratio constant?</p>', correctExplanation: 'Ratio: $6/3 = 12/6 = 24/12 = 2$. Geometric with $r = 2$.', wrongExplanations: { 0: 'Differences: $3, 6, 12$. Not constant, so not arithmetic.', 2: 'The ratio IS constant ($r = 2$), so this is geometric.', 3: 'A sequence cannot be both arithmetic and geometric (unless constant).' } },
    { difficulty: 'medium', question: '$S = 1 + 1/3 + 1/9 + 1/27 + \\cdots =$?', options: ['$3/2$', '$2$', '$3$', 'Diverges'], correctIndex: 0, hint: '<p>Geometric: $a = 1$, $r = 1/3$.</p>', correctExplanation: '$S = \\frac{1}{1 - 1/3} = \\frac{1}{2/3} = 3/2$.', wrongExplanations: { 1: '$\\frac{1}{1-1/3} = \\frac{1}{2/3} = 3/2$, not 2.', 2: '$\\frac{a}{1-r} = \\frac{1}{2/3} = 3/2$, not 3.', 3: '$|r| = 1/3 \\lt 1$, so it converges.' } },
    { difficulty: 'medium', question: 'Find the sum: $1 + 2 + 3 + \\cdots + 100$', options: ['$5050$', '$10000$', '$5000$', '$10100$'], correctIndex: 0, hint: '<p>$S_n = \\frac{n}{2}(a_1 + a_n)$.</p>', correctExplanation: '$S_{100} = \\frac{100}{2}(1 + 100) = 50 \\times 101 = 5050$. (Gauss formula)', wrongExplanations: { 1: '$100 \\times 100 = 10000$, but the sum formula gives $\\frac{100 \\times 101}{2} = 5050$.', 2: 'Close: $\\frac{100 \\times 100}{2} = 5000$, but the last term is 100, so $\\frac{100 \\times 101}{2} = 5050$.', 3: '$100 \\times 101 = 10100$, but divide by 2.' } },
    { difficulty: 'hard', question: 'Does $a_n = \\frac{(-1)^n}{n}$ converge?', options: ['Yes, to 0', 'Yes, to 1', 'No, oscillates', 'No, diverges to $\\infty$'], correctIndex: 0, hint: '<p>$|a_n| = 1/n \\to 0$.</p>', correctExplanation: '$|a_n| = 1/n \\to 0$. The oscillation shrinks to zero, so $a_n \\to 0$.', wrongExplanations: { 1: '$1/n \\to 0$, not 1.', 2: 'It oscillates, but the amplitude shrinks to 0, so it converges.', 3: '$1/n$ shrinks, it does not grow.' } },
    { difficulty: 'hard', question: 'Arithmetic: $a_5 = 17$, $a_{12} = 38$. Find $d$:', options: ['$3$', '$7$', '$2$', '$5$'], correctIndex: 0, hint: '<p>$a_{12} - a_5 = (12-5)d$.</p>', correctExplanation: '$38 - 17 = 7d \\Rightarrow d = 21/7 = 3$.', wrongExplanations: { 1: '$12 - 5 = 7$, not $d = 7$.', 2: '$21/7 = 3$, not 2.', 3: '$38 - 17 = 21$, and $21/7 = 3$.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'Find $a_1$ of the geometric sequence: $?,\\ 6,\\ 18,\\ 54$', accept: [2, '2'], placeholder: 'a_1 = ?', explanation: '$r = 18/6 = 3$. $a_1 = 6/3 = 2$.' },
    { difficulty: 'medium', question: 'Sum of first 50 terms of $1, 2, 3, \\ldots, 50$:', accept: [1275, '1275'], placeholder: 'S = ?', explanation: '$S = \\frac{50}{2}(1 + 50) = 1275$.' },
    { difficulty: 'hard', question: '$\\lim_{n \\to \\infty} \\frac{3n + 1}{n + 5} =$?', accept: [3, '3'], placeholder: 'Number', explanation: 'Divide top and bottom by $n$: $\\frac{3 + 1/n}{1 + 5/n} \\to 3$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Find the sum $S = 2 + 6 + 18 + 54 + \\cdots + 2(3)^9$.', steps: [
      { content: 'Identify: geometric with $a_1 = 2$, $r = 3$, $n = 10$ terms.' },
      { content: '$S_{10} = 2 \\cdot \\frac{1 - 3^{10}}{1 - 3} = 2 \\cdot \\frac{1 - 59049}{-2}$.' },
      { content: '$= 2 \\cdot \\frac{-59048}{-2} = 59048$.' }
    ], explanation: 'Geometric partial sum: $S_n = a_1 \\cdot \\frac{1-r^n}{1-r}$.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each sequence type to its formula:', pairs: [
      { left: 'Arithmetic', right: '$a_n = a_1 + (n-1)d$' },
      { left: 'Geometric', right: '$a_n = a_1 \\cdot r^{n-1}$' },
      { left: 'Harmonic', right: '$a_n = 1/n$' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Geometric series convergence:', expression: 'A geometric series $\\sum ar^n$ converges when $|r|$ {{0}} $1$.', blanks: [ { accept: ['<', 'is less than'], size: 3 } ], explanation: '$|r| \\lt 1$ ensures terms shrink to zero.' },
    { difficulty: 'medium', context: 'Arithmetic sum (Gauss):', expression: '$1 + 2 + 3 + \\cdots + n = \\frac{n(n+$ {{0}} $)}{2}$', blanks: [ { accept: ['1'], size: 3 } ], explanation: 'Gauss formula: $\\frac{n(n+1)}{2}$.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Sequence Strategy</h4>
    <ol><li><strong>Identify type:</strong> Constant difference = arithmetic. Constant ratio = geometric.</li>
    <li><strong>Use the formula:</strong> Arithmetic: $a_n = a_1 + (n-1)d$. Geometric: $a_n = a_1 r^{n-1}$.</li>
    <li><strong>Convergence:</strong> Does $a_n \\to L$? Check by computing $\\lim_{n \\to \\infty} a_n$.</li>
    <li><strong>Geometric infinite sum:</strong> Only when $|r| \\lt 1$. Sum $= \\frac{a_1}{1-r}$.</li></ol></div>` }
},

/* TOPIC 7.3: Infinite Series & Convergence */
{
  id: 'series-convergence',
  title: 'Infinite Series & Convergence Tests',
  description: 'Can an infinite sum have a finite value? Convergence tests determine when this happens.',
  prereqRecap: [
    { term: 'Sequence', definition: 'An ordered list of numbers: $a_1, a_2, a_3, \\ldots$ Often defined by a formula: $a_n = \\frac{1}{n}$.' },
    { term: 'Limit', definition: '$\\lim_{n \\to \\infty} a_n = L$ if $a_n$ gets arbitrarily close to $L$ (Module 6).' },
    { term: 'Geometric Series', definition: '$\\sum_{n=0}^{\\infty} ar^n = \\frac{a}{1-r}$ when $|r| \\lt 1$.' }
  ],
  whyExists: { html: `
    <p><strong>Why series?</strong> Many functions are DEFINED by infinite sums: $e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$, $\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!}$. Taylor series let us approximate ANY smooth function with polynomials. Convergence tests ensure these sums make sense.</p>
    ${WHY('Why can an infinite sum be finite?', '<p>$\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\cdots = 1$. Each term fills half the remaining gap to 1. The partial sums $S_n = 1 - (1/2)^n$ approach 1 as $n \\to \\infty$.</p>')}
  ` },
  concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 400 180" width="400" height="180" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="150" x2="380" y2="150" stroke="#94a3b8" stroke-width="1"/>
  <line x1="60" y1="10" x2="60" y2="160" stroke="#94a3b8" stroke-width="1"/>
  <line x1="40" y1="50" x2="380" y2="50" stroke="#f59e0b" stroke-width="1" stroke-dasharray="5,5"/>
  <text x="385" y="53" fill="#f59e0b" font-size="10" font-family="Inter,sans-serif">S</text>
  <rect x="77" y="130" width="6" height="20" fill="#3b82f6" opacity="0.6"/>
    <circle cx="80" cy="130" r="2.5" fill="#10b981"/><rect x="99" y="2" width="6" height="148" fill="#3b82f6" opacity="0.6"/>
    <circle cx="102" cy="2" r="2.5" fill="#10b981"/><rect x="121" y="78.8" width="6" height="71.2" fill="#3b82f6" opacity="0.6"/>
    <circle cx="124" cy="78.8" r="2.5" fill="#10b981"/><rect x="143" y="32.72" width="6" height="117.28" fill="#3b82f6" opacity="0.6"/>
    <circle cx="146" cy="32.72" r="2.5" fill="#10b981"/><rect x="165" y="60.367999999999995" width="6" height="89.632" fill="#3b82f6" opacity="0.6"/>
    <circle cx="168" cy="60.367999999999995" r="2.5" fill="#10b981"/><rect x="187" y="43.7792" width="6" height="106.2208" fill="#3b82f6" opacity="0.6"/>
    <circle cx="190" cy="43.7792" r="2.5" fill="#10b981"/><rect x="209" y="53.732479999999995" width="6" height="96.26752" fill="#3b82f6" opacity="0.6"/>
    <circle cx="212" cy="53.732479999999995" r="2.5" fill="#10b981"/><rect x="231" y="47.760512" width="6" height="102.239488" fill="#3b82f6" opacity="0.6"/>
    <circle cx="234" cy="47.760512" r="2.5" fill="#10b981"/><rect x="253" y="51.3436928" width="6" height="98.6563072" fill="#3b82f6" opacity="0.6"/>
    <circle cx="256" cy="51.3436928" r="2.5" fill="#10b981"/><rect x="275" y="49.19378432" width="6" height="100.80621568000001" fill="#3b82f6" opacity="0.6"/>
    <circle cx="278" cy="49.19378432" r="2.5" fill="#10b981"/><rect x="297" y="50.483729408" width="6" height="99.516270592" fill="#3b82f6" opacity="0.6"/>
    <circle cx="300" cy="50.483729408" r="2.5" fill="#10b981"/><rect x="319" y="49.7097623552" width="6" height="100.2902376448" fill="#3b82f6" opacity="0.6"/>
    <circle cx="322" cy="49.7097623552" r="2.5" fill="#10b981"/><rect x="341" y="50.17414258688" width="6" height="99.82585741311999" fill="#3b82f6" opacity="0.6"/>
    <circle cx="344" cy="50.17414258688" r="2.5" fill="#10b981"/>
  <text x="200" y="18" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">Partial sums S_n approaching the series sum S</text>
  <text x="80" y="168" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">S₁</text>
  <text x="124" y="168" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">S₃</text>
  <text x="168" y="168" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">S₅</text>
</svg>
</div>
<p class="math-diagram-label">A convergent series: partial sums S_n approach the total sum S as n increases</p>

    <div class="callout callout-key"><h4>Key Convergence Tests</h4>
    <ol>
      <li><strong>Divergence Test:</strong> If $\\lim_{n\\to\\infty} a_n \\neq 0$, the series DIVERGES. (Converse is FALSE.)</li>
      <li><strong>Geometric Series:</strong> $\\sum ar^n$ converges iff $|r| \\lt 1$. Sum = $\\frac{a}{1-r}$.</li>
      <li><strong>p-Series:</strong> $\\sum \\frac{1}{n^p}$ converges iff $p \\gt 1$.</li>
      <li><strong>Ratio Test:</strong> $L = \\lim \\frac{|a_{n+1}|}{|a_n|}$. $L \\lt 1$: converges. $L \\gt 1$: diverges. $L = 1$: inconclusive.</li>
      <li><strong>Root Test:</strong> $L = \\lim \\sqrt[n]{|a_n|}$. Same thresholds as ratio test.</li>
      <li><strong>Integral Test:</strong> If $f$ is positive, continuous, decreasing, and $a_n = f(n)$, then $\\sum a_n$ and $\\int_1^\\infty f(x)\\,dx$ both converge or both diverge.</li>
      <li><strong>Comparison Test:</strong> If $0 \\leq a_n \\leq b_n$ and $\\sum b_n$ converges, then $\\sum a_n$ converges.</li>
      <li><strong>Limit Comparison:</strong> If $\\lim \\frac{a_n}{b_n} = c > 0$, then $\\sum a_n$ and $\\sum b_n$ converge or diverge together.</li>
    </ol></div>
    <div class="callout callout-key"><h4>Alternating Series Test</h4>
    <p>$\\sum (-1)^n b_n$ converges if: (1) $b_n \\gt 0$, (2) $b_{n+1} \\leq b_n$ (decreasing), (3) $\\lim b_n = 0$.</p>
    <p>Error bound: $|S - S_N| \\leq b_{N+1}$ (the error is at most the first omitted term).</p></div>
    <div class="callout callout-key"><h4>Absolute vs. Conditional Convergence</h4>
    <p><strong>Absolute:</strong> $\\sum |a_n|$ converges. <strong>Conditional:</strong> $\\sum a_n$ converges but $\\sum |a_n|$ diverges.</p>
    <p>Example: $\\sum (-1)^n / n$ converges conditionally. $\\sum 1/n$ diverges, so convergence is conditional.</p></div>
    <div class="callout callout-key"><h4>Power Series & Radius of Convergence</h4>
    <p>$\\sum c_n (x-a)^n$ converges on $(a-R, a+R)$ where $R$ = radius of convergence.</p>
    <p>Find $R$ using ratio test: $R = \\lim \\frac{|c_n|}{|c_{n+1}|}$ or $R = 1/\\lim\\sqrt[n]{|c_n|}$.</p>
    <p>Must check endpoints ($x = a \\pm R$) separately.</p></div>
    <div class="callout callout-key"><h4>Taylor & Maclaurin Series</h4>
    <p>$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n$$</p>
    <p>When $a = 0$, this is the Maclaurin series. Key series:</p>
    <ul>
      <li>$e^x = \\sum \\frac{x^n}{n!}$ ($R = \\infty$)</li>
      <li>$\\sin x = \\sum \\frac{(-1)^n x^{2n+1}}{(2n+1)!}$ ($R = \\infty$)</li>
      <li>$\\cos x = \\sum \\frac{(-1)^n x^{2n}}{(2n)!}$ ($R = \\infty$)</li>
      <li>$\\frac{1}{1-x} = \\sum x^n$ ($R = 1$)</li>
      <li>$\\ln(1+x) = \\sum \\frac{(-1)^{n+1} x^n}{n}$ ($R = 1$)</li>
    </ul></div>
  ` },
  definition: { html: `<p><strong>Convergent Series:</strong> $\\sum_{n=1}^{\\infty} a_n = S$ if the partial sums $S_N = \\sum_{n=1}^{N} a_n$ approach $S$ as $N \\to \\infty$.</p>` },
  examples: [{
    title: 'Testing Convergence',
    problem: 'Does $\\sum_{n=1}^{\\infty} \\frac{n}{2^n}$ converge?',
    steps: [
      { title: 'Ratio test', content: '$\\frac{a_{n+1}}{a_n} = \\frac{(n+1)/2^{n+1}}{n/2^n} = \\frac{n+1}{2n}$.', why: 'The ratio test is ideal when factorial or exponential terms are present.' },
      { title: 'Take limit', content: '$\\lim_{n\\to\\infty} \\frac{n+1}{2n} = \\frac{1}{2} \\lt 1$.', why: 'Divide numerator and denominator by $n$: $\\frac{1+1/n}{2} \\to 1/2$.' },
      { title: 'Conclusion', content: 'Since $L = 1/2 \\lt 1$, the series converges.', why: 'Ratio test: $L \\lt 1$ guarantees absolute convergence.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is an infinite series?', back: 'Sum a1+a2+a3+... Its value is the limit of partial sums. Converges if this limit exists and is finite.' },
      { type: 'why', front: 'Why does the harmonic series diverge?', back: 'Group terms to show each group exceeds 1/2. Infinitely many groups of 1/2 = infinity.' },
      { type: 'how', front: 'How to choose a convergence test?', back: 'Geometric? Ratio test. Terms not going to 0? Divergence test. Alternating? Alternating series test. Compare to known series.' }
    ],
    exercises: [
    { difficulty: 'easy', question: '$\\sum_{n=0}^\\infty (1/3)^n = $?', options: ['$3$', '$3/2$', '$1/3$', 'Diverges'], correctIndex: 1, hint: '<p>Geometric series: $\\frac{a}{1-r}$ where $a = 1, r = 1/3$.</p>', correctExplanation: '$\\frac{1}{1-1/3} = \\frac{1}{2/3} = \\frac{3}{2}$.', wrongExplanations: { 0: '$\\frac{1}{1-1/3} = 3/2$, not $3$.', 2: '$1/3$ is the common ratio, not the sum.', 3: '$|r| = 1/3 \\lt 1$, so it converges.' } },
    { difficulty: 'easy', question: 'If $\\lim_{n\\to\\infty} a_n = 5$, what can we conclude about $\\sum a_n$?', options: ['Converges to 5', 'Converges', 'Diverges', 'Cannot determine'], correctIndex: 2, hint: '<p>Divergence test.</p>', correctExplanation: 'If the terms do not approach 0, the series DIVERGES. $\\lim a_n = 5 \\neq 0$, so the series diverges.', wrongExplanations: { 0: 'The limit of the TERMS is 5, but the SUM of infinitely many 5s is infinite.', 1: 'A necessary condition for convergence is $\\lim a_n = 0$. This fails.', 3: 'We CAN determine: it diverges by the divergence test.' } },
    { difficulty: 'medium', question: 'Does $\\sum \\frac{1}{n^2}$ converge?', options: ['Yes (p-series, $p=2 \\gt 1$)', 'No (harmonic series)', 'Yes (geometric)', 'Cannot determine'], correctIndex: 0, hint: '<p>p-series test: $\\sum 1/n^p$ converges when $p \\gt 1$.</p>', correctExplanation: '$p = 2 \\gt 1$, so the series converges. (Its sum is $\\pi^2/6$, proven by Euler.)', wrongExplanations: { 1: 'The harmonic series is $\\sum 1/n$ ($p = 1$), which diverges. But $p = 2 \\gt 1$ converges.', 2: 'This is not geometric; the ratio between terms is not constant.', 3: 'The p-series test conclusively determines convergence.' } },
    { difficulty: 'medium', question: 'The Maclaurin series for $e^x$ is:', options: ['$\\sum \\frac{x^n}{n}$', '$\\sum \\frac{x^n}{n!}$', '$\\sum \\frac{x^n}{2^n}$', '$\\sum nx^{n-1}$'], correctIndex: 1, hint: '<p>$f^{(n)}(0) = 1$ for all $n$ when $f(x) = e^x$.</p>', correctExplanation: '$e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + \\cdots$', wrongExplanations: { 0: 'That is related to $-\\ln(1-x)$, not $e^x$.', 2: 'That would be a geometric series with ratio $x/2$.', 3: 'That is the derivative of $\\sum x^n$, not $e^x$.' } },
    { difficulty: 'hard', question: 'Apply the ratio test to $\\sum \\frac{n!}{n^n}$:', options: ['$L = 0$, converges', '$L = 1/e$, converges', '$L = 1$, inconclusive', '$L = e$, diverges'], correctIndex: 1, hint: '<p>$\\frac{(n+1)!/(n+1)^{n+1}}{n!/n^n}$.</p>', correctExplanation: 'Ratio: $\\frac{(n+1)n^n}{(n+1)^{n+1}} = \\frac{n^n}{(n+1)^n} = \\left(\\frac{n}{n+1}\\right)^n = \\left(1 - \\frac{1}{n+1}\\right)^n \\to e^{-1} = 1/e \\lt 1$. Converges.', wrongExplanations: { 0: 'The limit is $1/e \\approx 0.368$, not 0.', 2: 'The limit is $1/e \\neq 1$.', 3: '$L = 1/e \\lt 1$, not $e \\gt 1$.' } },
    { difficulty: 'hard', question: 'The radius of convergence of $\\sum \\frac{x^n}{n \\cdot 2^n}$ is:', options: ['$1$', '$2$', '$1/2$', '$\\infty$'], correctIndex: 1, hint: '<p>Ratio test: $\\lim \\frac{|a_{n+1}|}{|a_n|} = |x| \\cdot \\lim \\frac{n}{(n+1) \\cdot 2}$.</p>', correctExplanation: '$\\lim \\frac{n}{(n+1)} \\cdot \\frac{|x|}{2} = \\frac{|x|}{2}$. Converges when $\\frac{|x|}{2} \\lt 1$, i.e., $|x| \\lt 2$. Radius $R = 2$.', wrongExplanations: { 0: 'The $2^n$ in the denominator doubles the radius from 1 to 2.', 2: 'You inverted: convergence when $|x|/2 \\lt 1$, so $|x| \\lt 2$.', 3: 'Infinite radius occurs for $e^x$. Here the $2^n$ limits convergence.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: '$\\sum_{n=0}^{\\infty} (\\frac{1}{2})^n =$?', accept: [2, '2'], placeholder: 'Enter a number', explanation: 'Geometric: $\\frac{1}{1-1/2} = 2$.' },
    { difficulty: 'easy', question: 'Does $\\sum \\frac{1}{n}$ converge? (yes/no)', accept: ['no'], placeholder: 'yes or no', explanation: 'Harmonic series diverges ($p = 1$).' },
    { difficulty: 'medium', question: 'For what values of $p$ does $\\sum 1/n^p$ converge?', accept: ['p \\gt 1', 'p \\gt 1'], placeholder: 'e.g. p \\gt 1', explanation: 'p-series: converges when $p \\gt 1$.' },
    { difficulty: 'medium', question: 'What is the radius of convergence of $\\sum x^n/n!$?', accept: ['infinity', 'inf', '\\infty'], placeholder: 'R = ?', explanation: 'This is $e^x$. Ratio test: $|x|/(n+1) \\to 0 \\lt 1$ for all $x$. $R = \\infty$.' },
    { difficulty: 'hard', question: 'The Maclaurin series for $e^x$ at $x=1$ gives $e \\approx$?', accept: ['2.7', '2.718', '2.72'], placeholder: 'e.g. 2.7', explanation: '$e \\approx 2.718$.' },
    { difficulty: 'hard', question: 'The first 3 terms of the Taylor series for $\\sin x$ around $x=0$:', accept: ['x-x^3/6+x^5/120', 'x - x^3/6 + x^5/120'], placeholder: 'e.g. x-x^3/6+x^5/120', explanation: '$\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Determine if $\\sum_{n=1}^{\\infty} \\frac{n}{2^n}$ converges using the ratio test.', steps: [
      { content: '$a_n = \\frac{n}{2^n}$. $a_{n+1} = \\frac{n+1}{2^{n+1}}$.' },
      { content: 'Ratio: $\\frac{a_{n+1}}{a_n} = \\frac{n+1}{2^{n+1}} \\cdot \\frac{2^n}{n} = \\frac{n+1}{2n}$.' },
      { content: '$L = \\lim_{n \\to \\infty} \\frac{n+1}{2n} = \\frac{1}{2}$.' },
      { content: '$L = 1/2 \\lt 1$: the series CONVERGES by the ratio test.' }
    ], explanation: 'Ratio test: if $L \\lt 1$, converges absolutely. If $L \\gt 1$, diverges. If $L = 1$, inconclusive.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Find the Taylor series for $f(x) = \\frac{1}{1-x}$ and use it.', parts: [
      { question: 'Write the geometric series: $\\frac{1}{1-x} = \\sum_{n=0}^{\\infty}$ ?', accept: ['x^n'], placeholder: 'General term', explanation: '$\\frac{1}{1-x} = \\sum x^n = 1 + x + x^2 + x^3 + \\cdots$' },
      { question: 'What is the radius of convergence?', accept: [1, '1'], placeholder: 'R = ?', explanation: '$|x| \\lt 1$ for convergence. $R = 1$.' },
      { question: 'Differentiate term by term: $\\frac{1}{(1-x)^2} = \\sum$ ?', accept: ['nx^{n-1}', 'n*x^(n-1)'], placeholder: 'General term', explanation: 'Derivative: $\\sum_{n=1}^{\\infty} nx^{n-1}$.' }
    ], completionMessage: 'Known series can generate new series through differentiation, integration, and substitution.' }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Geometric series formula:', expression: '$\\sum_{n=0}^{\\infty} ar^n = \\frac{a}{1-$ {{0}} $}$ when $|r| <$ {{1}}', blanks: [ { accept: ['r'], size: 3 }, { accept: ['1'], size: 3 } ], explanation: 'Geometric series converges to $a/(1-r)$ when $|r| \\lt 1$.' },
    { difficulty: 'medium', context: 'Divergence test:', expression: 'If $\\lim_{n \\to \\infty} a_n \\neq$ {{0}}, then $\\sum a_n$ {{1}}.', blanks: [ { accept: ['0'], size: 3 }, { accept: ['diverges'], size: 10 } ], explanation: 'If terms do not approach 0, the series diverges.' }
  ],
  matching: [
    { difficulty: 'medium', instruction: 'Match each test to its criterion:', pairs: [
      { left: 'Divergence test', right: 'Terms must approach 0' },
      { left: 'Geometric', right: '$|r| \\lt 1$' },
      { left: 'p-series', right: '$p \\gt 1$' },
      { left: 'Ratio test', right: '$L \\lt 1$' }
    ] }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Series Strategy</h4>
    <ol><li><strong>Divergence test first:</strong> If $\\lim a_n \\neq 0$, it diverges. Done.</li>
    <li><strong>Recognize</strong> geometric ($ar^n$) or p-series ($1/n^p$).</li>
    <li><strong>Ratio test</strong> for factorials and exponentials.</li>
    <li><strong>Comparison</strong> when you can bound by a known series.</li></ol></div>` }
}

] // end topics array
}); // end module push
})();
