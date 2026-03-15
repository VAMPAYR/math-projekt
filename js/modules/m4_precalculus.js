/* ============================================================
   MODULE 4: Precalculus : Functions & Graphs (4 topics)
   Source: Precalculus (OpenStax/Stitz-Zeager), Thomas' Calculus Ch 1
   ============================================================ */
(function() {
if (!window.MATH_MODULES) window.MATH_MODULES = [];
const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

window.MATH_MODULES.push({
id: 'precalculus',
order: 6,
title: 'Precalculus: Functions & Graphs',
description: 'Functions, their graphs, transformations, and behavior. The bridge between algebra and calculus. Requires: advanced algebra (Module 5).',
topics: [

/* TOPIC 4.1: Functions : Domain, Range, Composition */
{
  id: 'functions-domain-range',
  title: 'Functions: Domain, Range & Composition',
  description: 'A function is a rule that assigns exactly one output to each input. Functions are the central object of study in calculus.',
  prereqRecap: [
    { term: 'Set', definition: 'A well-defined collection of distinct objects (Module 1).' },
    { term: 'Variable', definition: 'A letter representing an unknown or varying quantity (Module 2).' },
    { term: 'Expression', definition: 'A combination of numbers, variables, and operations (Module 2).' },
    { term: 'Interval Notation', definition: '$(a,b)$ = all $x$ with $a < x < b$; $[a,b]$ = $a \\leq x \\leq b$. Parenthesis excludes endpoint, bracket includes it (Module 2).' }
  ],
  whyExists: { html: `
    <p><strong>Why functions?</strong> A function captures a <em>deterministic relationship</em>: given input $x$, the output $f(x)$ is uniquely determined. Temperature as a function of time, position as a function of velocity, profit as a function of price.</p>
    <p>Calculus studies how functions change. Without a precise definition of "function," calculus cannot begin.</p>
    ${WHY('Formal definition', '<p>A function $f: A \\to B$ is a rule that assigns to each element $x \\in A$ exactly one element $f(x) \\in B$. The set $A$ is the <strong>domain</strong> (all valid inputs). The set $\\{f(x) : x \\in A\\}$ is the <strong>range</strong> (all actual outputs). The key requirement: one input, one output. Multiple inputs can give the same output (e.g., $f(x) = x^2$: $f(2) = f(-2) = 4$), but one input cannot give multiple outputs.</p>')}
  ` },
  hook: { html: `<div class="callout callout-puzzle"><h4>🧩 Puzzle: The Vertical Line Test</h4>
    <p>Draw any curve on the coordinate plane. Sweep a vertical line across it. If any vertical line hits the curve more than once, the curve does NOT represent a function. Why? Because for that $x$-value, there would be two $y$-values (two outputs for one input).</p></div>` },
  formalDefinitions: [
      { term: 'Function', symbol: '$f: A \\to B$', definition: 'A rule that assigns to each element $x \\in A$ exactly one element $f(x) \\in B$. $A$ is the domain, $B$ is the codomain. The range is $\\{f(x) : x \\in A\\} \\subseteq B$.' },
      { term: 'Domain', symbol: '$\\text{Dom}(f)$', definition: 'The set of all input values for which the function is defined. For $f(x) = \\frac{1}{x}$, $\\text{Dom}(f) = \\mathbb{R} \\setminus \\{0\\}$.' },
      { term: 'Range', symbol: '$\\text{Ran}(f)$', definition: 'The set of all output values that the function actually produces. For $f(x) = x^2$, $\\text{Ran}(f) = [0, \\infty)$.' },
      { term: 'Injective (One-to-One)', symbol: '', definition: '$f(a) = f(b) \\implies a = b$. Different inputs always produce different outputs. Passes the horizontal line test.' },
      { term: 'Surjective (Onto)', symbol: '', definition: 'For every $y \\in B$, there exists $x \\in A$ such that $f(x) = y$. Every element of the codomain is hit.' },
      { term: 'Bijective', symbol: '', definition: 'Both injective and surjective. Has an inverse function $f^{-1}: B \\to A$.' }
    ],
    graphExplorer: [
      { latex: 'y = x^2' },
      { latex: 'y = \\sqrt{x}' },
      { latex: 'y = \\frac{1}{x}' }
    ],
    background: {
      title: 'Why Functions? The Language of Science',
      content: '<p>A <strong>function</strong> is a rule that converts one quantity into another, with no ambiguity. Every input produces exactly one output. This strict definition is what makes functions useful: they are predictable.</p><p><strong>Why domain matters:</strong> You cannot take the square root of a negative number (in $\\mathbb{R}$). You cannot divide by zero. The domain tells you which inputs are valid. Ignoring domain restrictions leads to contradictions and false results.</p><p><strong>Why functions are the language of science:</strong> Every physical law is expressed as a function. $F = ma$ (force is a function of mass and acceleration). $E = mc^2$ (energy is a function of mass). $v = at$ (velocity is a function of time). Without functions, we cannot state any quantitative relationship.</p>'
    },
    mathGrammar: [
      { question: 'What does $f(x)$ mean?', answer: '$f(x)$ is read "f of x." It means: apply the function $f$ to the input $x$. If $f(x) = 2x + 1$, then $f(3) = 2(3) + 1 = 7$. The parentheses here do NOT mean multiplication. They mean: feed this value into the function.' },
      { question: 'Why do we use functions?', answer: 'Functions formalize the idea of a rule that converts inputs to outputs. Every formula in science is a function: distance = speed $\\times$ time, force = mass $\\times$ acceleration. Functions let us predict, compute, and communicate relationships precisely.' },
      { question: 'How do I find the domain?', answer: 'Ask: "What inputs would break this function?" Two common restrictions: (1) Cannot divide by zero. (2) Cannot take the square root of a negative number (in real numbers). The domain is EVERYTHING ELSE.' },
      { question: 'What does "undefined" mean?', answer: 'The function has no output for that input. $f(x) = \\frac{1}{x}$ is undefined at $x = 0$ because $\\frac{1}{0}$ has no answer. The function literally has no answer for that input. It breaks.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 400 250" width="400" height="250" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="200" x2="380" y2="200" stroke="#94a3b8" stroke-width="1"/>
  <line x1="60" y1="20" x2="60" y2="220" stroke="#94a3b8" stroke-width="1"/>
  <path d="M 80 180 Q 140 40 200 120 Q 260 200 320 60" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <line x1="160" y1="20" x2="160" y2="200" stroke="#10b981" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="165" y="18" fill="#10b981" font-size="10" font-family="Inter,sans-serif">x = a</text>
  <line x1="60" y1="80" x2="160" y2="80" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
  <circle cx="160" cy="80" r="4" fill="#f59e0b"/>
  <text x="168" y="76" fill="#f59e0b" font-size="10" font-family="Inter,sans-serif">(a, f(a))</text>
  <text x="62" y="76" fill="#ef4444" font-size="10" font-family="Inter,sans-serif">f(a)</text>
  <text x="200" y="30" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="Inter,sans-serif">A function: each input maps to exactly one output</text>
  <text x="330" y="55" fill="#3b82f6" font-size="12" font-family="Inter,sans-serif">f(x)</text>
</svg>
</div>
<p class="math-diagram-label">A function f(x): for every input x, there is exactly one output f(x)</p>

    <div class="callout callout-key"><h4>Function Notation</h4>
    <p>$f(x) = x^2 + 3$ means: the function named $f$, when given input $x$, produces output $x^2 + 3$.</p>
    <p>$f(5) = 25 + 3 = 28$. Replace every $x$ with $5$.</p>
    ${WHY('Why $f(x)$ and not $y$?', '<p>$y = x^2 + 3$ ambiguously refers to both the equation and the output value. $f(x) = x^2 + 3$ explicitly names the function ($f$) and shows the input ($x$). This lets us write $f(2)$, $f(a+h)$, $g(x)$ for different functions, and compose functions like $f(g(x))$.</p>')}</div>
    <div class="callout callout-key"><h4>Domain: Finding Valid Inputs</h4>
    <p>Unless restricted, the domain is all real numbers EXCEPT:</p>
    <ul>
      <li>Values that make a <strong>denominator zero</strong>: $f(x) = \\frac{1}{x-3}$ has domain $\\mathbb{R} \\setminus \\{3\\}$.</li>
      <li>Values that make a <strong>square root negative</strong>: $f(x) = \\sqrt{x-2}$ has domain $[2, \\infty)$.</li>
      <li>Values that make a <strong>logarithm non-positive</strong>: $f(x) = \\ln(x)$ has domain $(0, \\infty)$.</li>
    </ul></div>
    <div class="callout callout-key"><h4>Composition of Functions</h4>
    <p>$(f \\circ g)(x) = f(g(x))$: Apply $g$ first, then $f$ to the result.</p>
    <p>Example: $f(x) = x^2$, $g(x) = x + 1$. $(f \\circ g)(x) = f(x+1) = (x+1)^2$.</p>
    <p>$(g \\circ f)(x) = g(x^2) = x^2 + 1$. Note: $f \\circ g \\neq g \\circ f$ in general.</p>
    ${WHY('Why is order important?', '<p>Composition is not commutative. "Put on socks, then shoes" ≠ "Put on shoes, then socks." The outer function processes the OUTPUT of the inner function.</p>')}</div>
  ` },
  definition: { html: `
    <p><strong>Function:</strong> A rule $f: A \\to B$ assigning each $x \\in A$ exactly one $f(x) \\in B$.</p>
    <p><strong>Domain:</strong> Set of all valid inputs $A$. <strong>Range:</strong> Set of all actual outputs $\\{f(x) : x \\in A\\}$.</p>
    <p><strong>Inverse Function:</strong> $f^{-1}$ reverses $f$: $f^{-1}(f(x)) = x$. Exists only if $f$ is one-to-one (passes horizontal line test).</p>
  ` },
  examples: [{
    title: 'Domain and Composition',
    problem: 'Find the domain of $f(x) = \\frac{\\sqrt{x+1}}{x-2}$ and compute $(f \\circ g)(x)$ where $g(x) = 3x$.',
    steps: [
      { title: 'Square root constraint', content: '$x + 1 \\geq 0 \\Rightarrow x \\geq -1$.', why: 'The expression under a square root must be non-negative in real numbers.' },
      { title: 'Denominator constraint', content: '$x - 2 \\neq 0 \\Rightarrow x \\neq 2$.', why: 'Division by zero is undefined.' },
      { title: 'Combine', content: 'Domain: $[-1, 2) \\cup (2, \\infty)$.', why: 'Intersect both constraints: $x \\geq -1$ AND $x \\neq 2$.' },
      { title: 'Compose', content: '$(f \\circ g)(x) = f(3x) = \\frac{\\sqrt{3x+1}}{3x-2}$.', why: 'Replace every $x$ in $f$ with $g(x) = 3x$.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a function?', back: 'A rule assigning each input x exactly ONE output f(x). Vertical line test: no vertical line hits the graph twice.' },
      { type: 'why', front: 'Why does domain matter?', back: 'Not every input works. Cannot divide by 0, sqrt negative, or log of 0. Domain = set of valid inputs.' },
      { type: 'define', front: 'What is composition f(g(x))?', back: 'Feed output of g into f. First compute g(x), then apply f. f(g(3)) with f=x^2, g=x+1: f(4) = 16.' },
      { type: 'how', front: 'How to find the inverse?', back: 'Replace f(x) with y, swap x and y, solve for y. The inverse undoes the function: f^-1(f(x)) = x.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'If $f(x) = 2x + 3$, find $f(4)$:', options: ['$8$', '$11$', '$14$', '$7$'], correctIndex: 1, hint: '<p>Replace $x$ with 4.</p>', correctExplanation: '$f(4) = 2(4) + 3 = 8 + 3 = 11$.', wrongExplanations: { 0: 'You forgot to add 3: $2(4) = 8$, then $8 + 3 = 11$.', 2: '$2(4) + 3 = 11$, not $14$. You may have computed $2(4+3) = 14$.', 3: '$4 + 3 = 7$ ignores the coefficient 2.' } },
    { difficulty: 'easy', question: 'What is the domain of $f(x) = \\frac{1}{x}$?', options: ['$\\mathbb{R}$', '$\\mathbb{R} \\setminus \\{0\\}$', '$(0, \\infty)$', '$\\{1\\}$'], correctIndex: 1, hint: '<p>Where is the denominator zero?</p>', correctExplanation: '$x = 0$ makes the denominator zero. Domain: all reals except 0.', wrongExplanations: { 0: '$f(0) = 1/0$ is undefined. Not all reals work.', 2: 'Negative values work too: $f(-2) = -1/2$. Only $x = 0$ is excluded.', 3: 'The domain is not a single point; it is all reals except 0.' } },
    { difficulty: 'medium', question: 'Find the domain of $f(x) = \\sqrt{5-x}$:', options: ['$(-\\infty, 5]$', '$[5, \\infty)$', '$(-\\infty, 5)$', '$(5, \\infty)$'], correctIndex: 0, hint: '<p>Need $5 - x \\geq 0$.</p>', correctExplanation: '$5 - x \\geq 0 \\Rightarrow x \\leq 5$. Domain: $(-\\infty, 5]$.', wrongExplanations: { 1: 'You flipped the inequality. $5 - x \\geq 0$ gives $x \\leq 5$, not $x \\geq 5$.', 2: 'The endpoint $x = 5$ gives $\\sqrt{0} = 0$, which is defined. Include it: use $]$ not $)$.', 3: 'Wrong direction and wrong endpoint inclusion.' } },
    { difficulty: 'medium', question: 'If $f(x) = x^2$ and $g(x) = x - 3$, find $(g \\circ f)(2)$:', options: ['$1$', '$-1$', '$7$', '$4$'], correctIndex: 0, hint: '<p>$(g \\circ f)(2) = g(f(2))$. Compute $f(2)$ first.</p>', correctExplanation: '$f(2) = 4$. $g(4) = 4 - 3 = 1$.', wrongExplanations: { 1: '$g(f(2)) = g(4) = 1$, not $-1$.', 2: 'That would be $f(2) + g(2) = 4 + (-1) = 3$ or $(f \\circ g)(2) = f(-1) = 1$. Order matters.', 3: '$f(2) = 4$ is intermediate, not the final answer. Apply $g$ next.' } },
    { difficulty: 'hard', question: 'Does $f(x) = x^2$ have an inverse function (on domain $\\mathbb{R}$)?', options: ['Yes: $f^{-1}(x) = \\sqrt{x}$', 'Yes: $f^{-1}(x) = \\pm\\sqrt{x}$', 'No, because $f$ is not one-to-one', 'No, because $f$ has no range'], correctIndex: 2, hint: '<p>Does $f$ pass the horizontal line test?</p>', correctExplanation: '$f(2) = f(-2) = 4$. Two inputs give the same output, so $f$ is NOT one-to-one. No inverse exists on $\\mathbb{R}$. (Restricting to $[0,\\infty)$ gives $f^{-1}(x) = \\sqrt{x}$.)', wrongExplanations: { 0: '$\\sqrt{x}$ is the inverse only on $[0, \\infty)$, not all of $\\mathbb{R}$.', 1: '$\\pm\\sqrt{x}$ gives two values, so it is not a function.', 3: '$f$ does have a range: $[0, \\infty)$. The issue is one-to-one-ness.' } },
    { difficulty: 'hard', question: 'Domain of $f(x) = \\ln(x^2 - 4)$:', options: ['$(-\\infty,-2) \\cup (2,\\infty)$', '$(-2, 2)$', '$[{-}2, 2]$', '$\\mathbb{R} \\setminus \\{\\pm 2\\}$'], correctIndex: 0, hint: '<p>Logarithm requires a strictly positive argument: $x^2 - 4 \\gt 0$.</p>', correctExplanation: '$x^2 - 4 \\gt 0 \\Rightarrow x^2 \\gt 4 \\Rightarrow |x| \\gt 2 \\Rightarrow x < -2$ or $x \\gt 2$. Domain: $(-\\infty,-2) \\cup (2,\\infty)$.', wrongExplanations: { 1: '$(-2,2)$ gives $x^2 \\lt 4$, making the argument negative. Log of a negative is undefined.', 2: 'At $x = \\pm 2$: $x^2 - 4 = 0$, and $\\ln(0)$ is undefined.', 3: 'This excludes only $x = \\pm 2$ but includes $x = 0$: $\\ln(0-4) = \\ln(-4)$, undefined.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'If $f(x) = 3x - 1$, find $f(5)$:', accept: [14, '14'], placeholder: 'Enter a number', explanation: '$f(5) = 3(5) - 1 = 14$.' },
    { difficulty: 'easy', question: 'If $f(x) = x^2 - 1$, find $f(-3)$:', accept: [8, '8'], placeholder: 'Enter a number', explanation: '$f(-3) = (-3)^2 - 1 = 9 - 1 = 8$.' },
    { difficulty: 'medium', question: 'What is the domain of $f(x) = \\sqrt{x - 4}$? Write in interval notation:', accept: ['[4, inf)', '[4,inf)', '[4, infinity)', '[4,\u221e)'], placeholder: 'e.g. [4, inf)', explanation: '$x - 4 \\geq 0 \\Rightarrow x \\geq 4$. Domain: $[4, \\infty)$.' },
    { difficulty: 'medium', question: 'Find the domain of $f(x) = \\frac{1}{x^2 - 9}$. What two values must be excluded?', accept: ['3, -3', '-3, 3', '3,-3', '-3,3'], placeholder: 'a, b', explanation: '$x^2 - 9 = 0 \\Rightarrow x = \\pm 3$. Domain: $\\mathbb{R} \\setminus \\{-3, 3\\}$.' },
    { difficulty: 'hard', question: 'If $f(x) = x^2$ and $g(x) = 2x+1$, find $(f \\circ g)(3)$:', accept: [49], placeholder: 'Enter a number', explanation: '$g(3) = 7$. $f(7) = 49$.' },
    { difficulty: 'hard', question: 'Find $f^{-1}(x)$ if $f(x) = 2x + 6$. Write as f^{-1}(x)=...:', accept: ['(x-6)/2', '(x - 6)/2', 'x/2-3', 'x/2 - 3'], placeholder: 'e.g. (x-6)/2', explanation: '$y = 2x+6$. Swap: $x = 2y+6$. Solve: $y = \\frac{x-6}{2}$.' },
    { difficulty: 'hard', question: 'If $f(x) = \\frac{x+1}{x-2}$, find $f(f(3))$.', accept: ['5/2', '2.5', 2.5], placeholder: 'Enter a number', hint: '<p>Compute $f(3)$ first, then apply $f$ again.</p>', explanation: '$f(3) = \\frac{3+1}{3-2} = \\frac{4}{1} = 4$. Then $f(4) = \\frac{4+1}{4-2} = \\frac{5}{2}$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Find the domain of $f(x) = \\frac{\\sqrt{x+3}}{x-1}$ step by step.', steps: [
      { content: 'Square root constraint: $x + 3 \\geq 0 \\Rightarrow x \\geq -3$.' },
      { content: 'Denominator constraint: $x - 1 \\neq 0 \\Rightarrow x \\neq 1$.' },
      { content: 'Combine both: $x \\geq -3$ AND $x \\neq 1$.' },
      { content: 'Domain: $[-3, 1) \\cup (1, \\infty)$.' }
    ], explanation: 'Always check ALL restrictions, then intersect them.' },
    { difficulty: 'hard', question: 'Find the inverse of $f(x) = \\frac{x+3}{x-1}$.', steps: [
      { content: 'Write $y = \\frac{x+3}{x-1}$.' },
      { content: 'Swap $x$ and $y$: $x = \\frac{y+3}{y-1}$.' },
      { content: 'Multiply both sides by $(y-1)$: $x(y-1) = y+3$.' },
      { content: 'Distribute: $xy - x = y + 3$.' },
      { content: 'Collect $y$ terms: $xy - y = x + 3$.' },
      { content: '$y(x-1) = x+3$, so $y = \\frac{x+3}{x-1}$.' },
      { content: '$f^{-1}(x) = \\frac{x+3}{x-1}$. This function IS its own inverse!' }
    ], explanation: 'A function that equals its own inverse is called an involution: $f(f(x)) = x$.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Let $f(x) = x^2 - 4$ and $g(x) = \\sqrt{x}$.', parts: [
      { question: 'Find the domain of $g$:', accept: ['[0, inf)', '[0,inf)'], placeholder: 'Interval notation', explanation: '$\\sqrt{x}$ requires $x \\geq 0$.' },
      { question: 'Find $(f \\circ g)(x)$:', accept: ['x-4', 'x - 4'], placeholder: 'Simplified expression', explanation: '$f(g(x)) = f(\\sqrt{x}) = (\\sqrt{x})^2 - 4 = x - 4$.' },
      { question: 'What is the domain of $f \\circ g$?', accept: ['[0, inf)', '[0,inf)'], placeholder: 'Interval notation', explanation: 'Domain of $g$ is $[0,\\infty)$. On this domain, $f(g(x)) = x-4$ is defined for all $x \\geq 0$.' },
      { question: 'Find $(g \\circ f)(x)$:', accept: ['sqrt(x^2-4)', 'sqrt(x^2 - 4)'], placeholder: 'Expression', explanation: '$g(f(x)) = \\sqrt{x^2 - 4}$. Domain: $x^2 \\geq 4$, so $|x| \\geq 2$.' }
    ], completionMessage: 'Composition requires checking domains at each stage. $f \\circ g \\neq g \\circ f$ in general!' }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Complete the function evaluation steps:', expression: '$f(x) = 2x^2 - 3$. $f(4) = 2($ {{0}} $) - 3 =$ {{1}}', blanks: [ { accept: ['16'], size: 4 }, { accept: ['29'], size: 4 } ], explanation: '$f(4) = 2(16) - 3 = 32 - 3 = 29$.' },
    { difficulty: 'medium', context: 'Complete the domain analysis:', expression: 'For $f(x) = \\ln(x-5)$, we need $x - 5$ {{0}} $0$, so $x$ {{1}} $5$.', blanks: [ { accept: ['>', '\\gt'], size: 3 }, { accept: ['>', '\\gt'], size: 3 } ], explanation: 'Logarithm requires strictly positive argument: $x - 5 \\gt 0 \\Rightarrow x \\gt 5$.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each domain restriction to its cause:', pairs: [
      { left: 'Denominator = 0', right: 'Division by zero' },
      { left: 'Square root of negative', right: 'Not real' },
      { left: 'Log of non-positive', right: 'Undefined' }
    ] },
    { difficulty: 'medium', instruction: 'Match each function type to its key property:', pairs: [
      { left: 'One-to-one', right: 'Passes horizontal line test' },
      { left: 'Even function', right: '$f(-x) = f(x)$' },
      { left: 'Odd function', right: '$f(-x) = -f(x)$' },
      { left: 'Inverse exists', right: 'Function is one-to-one' }
    ] }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Functions Strategy</h4>
    <ol><li><strong>Domain:</strong> Start with all $\\mathbb{R}$, then SUBTRACT values that cause division by zero, negative square roots, or non-positive log arguments.</li>
    <li><strong>Composition:</strong> $(f \\circ g)(x) = f(g(x))$. INNER function first. Replace $x$ in $f$ with the entire expression $g(x)$.</li>
    <li><strong>Inverse:</strong> Swap $x$ and $y$ in $y = f(x)$, solve for $y$. Exists only if $f$ is one-to-one.</li></ol></div>` }
},

/* TOPIC 4.2: Graphs & Transformations */
{
  id: 'graph-transformations',
  title: 'Graphs & Transformations',
  description: 'How shifting, stretching, reflecting, and compressing modify the graph of a function. Transformations let you graph complex functions from simple parent functions.',
  prereqRecap: [
    { term: 'Function', definition: 'A rule $f: A \\to B$ assigning each input exactly one output (Topic 4.1).' },
    { term: 'Coordinate Plane', definition: 'Two perpendicular number lines (axes) forming a plane. Points are $(x, y)$.' },
    { term: 'Graph', definition: 'The set of all points $(x, f(x))$ for $x$ in the domain. Visually represents the function.' }
  ],
  whyExists: { html: `
    <p><strong>Why transformations?</strong> Instead of plotting hundreds of functions from scratch, master a few "parent" functions ($x^2$, $|x|$, $\\sqrt{x}$, $1/x$) and transform them. Four operations handle every modification: shift, stretch, compress, reflect.</p>
    ${WHY('Why does this work?', '<p>If $y = f(x)$ is a known graph, then $y = af(b(x-h)) + k$ modifies it systematically. The constants $a, b, h, k$ each do ONE thing to the graph. Understanding these four parameters lets you graph ANY transformation without plotting points.</p>')}
  ` },
  concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 400 220" width="400" height="220" xmlns="http://www.w3.org/2000/svg">
  <line x1="200" y1="10" x2="200" y2="210" stroke="#94a3b8" stroke-width="1"/>
  <line x1="20" y1="140" x2="380" y2="140" stroke="#94a3b8" stroke-width="1"/>
  <path d="M 120 180 Q 160 100 200 140 Q 240 180 280 100" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5"/>
  <text x="285" y="98" fill="#94a3b8" font-size="10" font-family="Inter,sans-serif">f(x)</text>
  <path d="M 120 140 Q 160 60 200 100 Q 240 140 280 60" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <text x="285" y="58" fill="#3b82f6" font-size="10" font-family="Inter,sans-serif">f(x) + 2 ↑</text>
  <path d="M 160 180 Q 200 100 240 140 Q 280 180 320 100" fill="none" stroke="#10b981" stroke-width="2"/>
  <text x="325" y="98" fill="#10b981" font-size="10" font-family="Inter,sans-serif">f(x-1) →</text>
  <path d="M 160 120 Q 180 160 200 140 Q 220 120 240 160" fill="none" stroke="#ef4444" stroke-width="2"/>
  <text x="245" y="158" fill="#ef4444" font-size="10" font-family="Inter,sans-serif">f(2x) compress</text>
  <text x="200" y="20" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">+c shifts up, -h shifts right, ×a stretches</text>
</svg>
</div>
<p class="math-diagram-label">Graph transformations: vertical shift f(x)+c, horizontal shift f(x-h), horizontal compress f(2x)</p>

    <div class="callout callout-key"><h4>Parent Functions (memorize these shapes)</h4>
    <ul>
      <li>$f(x) = x$ (line), $f(x) = x^2$ (parabola), $f(x) = x^3$ (cubic)</li>
      <li>$f(x) = |x|$ (V-shape), $f(x) = \\sqrt{x}$ (half-parabola), $f(x) = \\frac{1}{x}$ (hyperbola)</li>
    </ul></div>
    <div class="callout callout-key"><h4>Transformation Rules</h4>
    <p>Starting from $y = f(x)$:</p>
    <ul>
      <li><strong>Vertical shift:</strong> $y = f(x) + k$ moves UP $k$ units (down if $k \\lt 0$).</li>
      <li><strong>Horizontal shift:</strong> $y = f(x - h)$ moves RIGHT $h$ units (left if $h \\lt 0$).</li>
      <li><strong>Vertical stretch/compress:</strong> $y = af(x)$. $|a| \\gt 1$ stretches, $0 < |a| \\lt 1$ compresses.</li>
      <li><strong>Horizontal stretch/compress:</strong> $y = f(bx)$. $|b| \\gt 1$ compresses, $0 < |b| \\lt 1$ stretches.</li>
      <li><strong>Reflection over x-axis:</strong> $y = -f(x)$.</li>
      <li><strong>Reflection over y-axis:</strong> $y = f(-x)$.</li>
    </ul>
    ${WHY('Why does $f(x-h)$ shift RIGHT?', '<p>$f(x-3) = 0$ when $x - 3 = 0$, i.e., $x = 3$. The zero that WAS at $x = 0$ in $f(x)$ is now at $x = 3$. Every point moved RIGHT by 3. The subtraction is counterintuitive, but it makes sense: to get the same output, $x$ must be 3 units LARGER to compensate for the $-3$.</p>')}</div>
  ` },
  definition: { html: `<p><strong>Transformation:</strong> An operation that modifies a function\'s graph (position, shape, or orientation) without changing its fundamental behavior.</p><p><strong>Even Function:</strong> $f(-x) = f(x)$ (symmetric about y-axis). <strong>Odd Function:</strong> $f(-x) = -f(x)$ (symmetric about origin).</p>` },
  examples: [{
    title: 'Reading Transformations',
    problem: 'Describe all transformations of $y = -2(x+1)^2 + 3$ from the parent $y = x^2$.',
    steps: [
      { title: 'Horizontal shift', content: '$(x+1) = (x - (-1))$: shift LEFT 1 unit.', why: '$h = -1$. The graph moves in the opposite direction of the sign inside the parentheses.' },
      { title: 'Vertical stretch', content: 'Factor of $|{-}2| = 2$: vertical stretch by 2.', why: 'Every $y$-value is multiplied by 2, making the parabola narrower.' },
      { title: 'Reflection', content: 'The negative sign ($-2$): reflect over the x-axis.', why: 'The parabola opens downward instead of upward.' },
      { title: 'Vertical shift', content: '$+3$: shift UP 3 units. Vertex: $(-1, 3)$.', why: 'The $k = 3$ added outside moves every point up 3.' }
    ]
  }],
  flashCards: [
      { type: 'how', front: 'What does f(x)+c do?', back: 'Shifts graph UP by c units. Every y-value increases by c. Shape unchanged.' },
      { type: 'how', front: 'What does f(x-h) do?', back: 'Shifts graph RIGHT by h units. Counterintuitive: minus shifts right because x must be larger to produce same output.' },
      { type: 'why', front: 'Why does -f(x) reflect over x-axis?', back: 'Negating the output flips positive y to negative and vice versa. Mirror image across x-axis.' },
      { type: 'how', front: 'What does f(2x) do?', back: 'Compresses horizontally by factor 2. Graph features happen at half the x-values.' }
    ],
    exercises: [
    { difficulty: 'easy', question: '$y = x^2 + 5$ is the graph of $y = x^2$ shifted:', options: ['Right 5', 'Left 5', 'Up 5', 'Down 5'], correctIndex: 2, hint: '<p>$+5$ is outside the function, so it is a vertical shift.</p>', correctExplanation: '$f(x) + 5$ shifts the graph UP by 5 units.', wrongExplanations: { 0: 'Right shift would be $f(x-5) = (x-5)^2$. Here the 5 is OUTSIDE.', 1: 'Left shift would be $f(x+5) = (x+5)^2$. Here the 5 is OUTSIDE.', 3: 'The sign is positive: $+5$ shifts UP, not down.' } },
    { difficulty: 'easy', question: '$y = (x-3)^2$ has its vertex at:', options: ['$(0, 3)$', '$(3, 0)$', '$(-3, 0)$', '$(0, -3)$'], correctIndex: 1, hint: '<p>$f(x-h)$ shifts right by $h$. Vertex of $x^2$ is at origin.</p>', correctExplanation: 'Shift right 3: vertex at $(3, 0)$.', wrongExplanations: { 0: 'The shift is horizontal (inside the function), not vertical.', 2: '$(x - 3)$: $h = 3$, shift RIGHT. $(x + 3)$ would shift left.', 3: 'No vertical shift occurs. The vertex stays at $y = 0$.' } },
    { difficulty: 'medium', question: 'Which represents $y = x^2$ reflected over the x-axis and shifted up 4?', options: ['$y = -(x-4)^2$', '$y = -x^2 + 4$', '$y = (-x)^2 + 4$', '$y = -(x^2 + 4)$'], correctIndex: 1, hint: '<p>Reflect: $-f(x)$. Then shift up: $+4$.</p>', correctExplanation: 'Reflect: $-x^2$. Shift up 4: $-x^2 + 4$.', wrongExplanations: { 0: '$(x-4)^2$ is a horizontal shift, not a vertical one.', 2: '$(-x)^2 = x^2$ (reflecting over y-axis has no effect on $x^2$).', 3: '$-(x^2 + 4) = -x^2 - 4$: that shifts DOWN 4.' } },
    { difficulty: 'medium', question: 'Is $f(x) = x^3 + x$ even, odd, or neither?', options: ['Even', 'Odd', 'Neither', 'Both'], correctIndex: 1, hint: '<p>Compute $f(-x)$ and compare to $f(x)$ and $-f(x)$.</p>', correctExplanation: '$f(-x) = (-x)^3 + (-x) = -x^3 - x = -(x^3 + x) = -f(x)$. Since $f(-x) = -f(x)$, $f$ is odd.', wrongExplanations: { 0: 'Even requires $f(-x) = f(x)$, but $f(-x) = -f(x) \\neq f(x)$.', 2: 'The computation shows $f(-x) = -f(x)$ exactly. This IS the definition of odd.', 3: 'A nonzero function cannot be both even and odd (except $f(x) = 0$).' } },
    { difficulty: 'hard', question: 'The graph of $y = 3|x + 2| - 1$ has vertex at:', options: ['$(2, -1)$', '$(-2, -1)$', '$(-2, 1)$', '$(2, 1)$'], correctIndex: 1, hint: '<p>Parent $|x|$ has vertex at origin. Apply shifts.</p>', correctExplanation: '$|x + 2| = |x - (-2)|$: shift left 2. Vertex at $(-2, 0)$. Then $-1$: shift down 1. Vertex: $(-2, -1)$.', wrongExplanations: { 0: '$(x + 2)$: shift LEFT, not right. $h = -2$.', 2: 'The vertical shift is $-1$ (down), not $+1$ (up).', 3: 'Both the horizontal and vertical shifts have the wrong sign here.' } },
    { difficulty: 'hard', question: 'If $f(x)$ passes through $(2, 5)$, what point is on $y = f(x - 3) + 1$?', options: ['$(5, 6)$', '$(-1, 6)$', '$(5, 4)$', '$(2, 6)$'], correctIndex: 0, hint: '<p>$f(x-3)$ shifts right 3. $+1$ shifts up 1. Transform the point $(2,5)$.</p>', correctExplanation: 'Right 3: $x = 2 + 3 = 5$. Up 1: $y = 5 + 1 = 6$. Point: $(5, 6)$.', wrongExplanations: { 1: 'Shift is RIGHT 3 (not left): $2 + 3 = 5$.', 2: 'Up 1: $5 + 1 = 6$. You subtracted instead of adding.', 3: 'The $x$-coordinate changes too: $2 + 3 = 5$.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'The vertex of $y = (x-2)^2 + 5$ is at what point? Write as (x,y):', accept: ['(2,5)', '(2, 5)'], placeholder: '(x,y)', explanation: '$h=2, k=5$. Vertex: $(2,5)$.' },
    { difficulty: 'easy', question: 'Is $f(x) = x^4$ even, odd, or neither?', accept: ['even'], placeholder: 'even, odd, or neither', explanation: '$f(-x) = (-x)^4 = x^4 = f(x)$. Even function.' },
    { difficulty: 'medium', question: 'If $f(x)$ passes through $(3,8)$, what point is on $y = f(x) + 4$?', accept: ['(3,12)', '(3, 12)'], placeholder: '(x,y)', explanation: 'Vertical shift up 4: $(3, 8+4) = (3, 12)$.' },
    { difficulty: 'medium', question: 'What is the vertex of $y = |x + 4| - 2$? Write as (x,y):', accept: ['(-4,-2)', '(-4, -2)'], placeholder: '(x,y)', explanation: '$|x+4| = |x-(-4)|$: shift left 4, down 2. Vertex: $(-4, -2)$.' },
    { difficulty: 'hard', question: 'Describe: $y = -3(x-1)^2 + 7$. What is the maximum value of this function?', accept: [7, '7'], placeholder: 'Maximum value', explanation: 'Opens down ($a=-3$), vertex at $(1,7)$. Maximum value = 7.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Identify all transformations of $y = 2|x - 3| + 1$ from the parent $y = |x|$.', steps: [
      { content: 'Parent function: $y = |x|$ (V-shape, vertex at origin).' },
      { content: 'Inside: $(x-3)$. Shift RIGHT 3 units.' },
      { content: 'Coefficient 2: Vertical STRETCH by factor 2 (steeper V).' },
      { content: 'Outside: $+1$. Shift UP 1 unit.' },
      { content: 'Vertex: $(3, 1)$. No reflection (a \\gt 0).' }
    ], explanation: 'Read transformations inside-to-outside: horizontal first, then vertical.' }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Complete the transformation rules:', expression: '$y = f(x) + k$ shifts the graph {{0}} by $k$ units. $y = f(x - h)$ shifts the graph {{1}} by $h$ units.', blanks: [ { accept: ['up', 'vertically up'], size: 6 }, { accept: ['right'], size: 6 } ], explanation: 'Vertical changes are outside $f$. Horizontal changes are inside, with opposite sign.' },
    { difficulty: 'medium', context: 'Identify the transformation type:', expression: '$y = -f(x)$ reflects over the {{0}}-axis. $y = f(-x)$ reflects over the {{1}}-axis.', blanks: [ { accept: ['x'], size: 3 }, { accept: ['y'], size: 3 } ], explanation: 'Negating $y$ (outside) = x-axis reflection. Negating $x$ (inside) = y-axis reflection.' }
  ],
  matching: [
    { difficulty: 'medium', instruction: 'Match each transformation to its effect:', pairs: [
      { left: '$f(x) + 3$', right: 'Shift up 3' },
      { left: '$f(x - 2)$', right: 'Shift right 2' },
      { left: '$-f(x)$', right: 'Reflect over x-axis' },
      { left: '$f(-x)$', right: 'Reflect over y-axis' },
      { left: '$3f(x)$', right: 'Vertical stretch by 3' }
    ] }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Transformations Strategy</h4>
    <ol><li><strong>Inside the function</strong> (affecting $x$): horizontal shifts and stretches. Signs are OPPOSITE what you expect.</li>
    <li><strong>Outside the function</strong> (affecting $y$): vertical shifts and stretches. Signs are as expected.</li>
    <li><strong>Order:</strong> Apply horizontal shifts/stretches first, then vertical.</li></ol></div>` }
},

/* TOPIC 4.3: Exponential & Logarithmic Functions */
{
  id: 'exponentials-logarithms',
  title: 'Exponential & Logarithmic Functions',
  description: 'Functions where the variable is in the exponent. Exponentials model growth/decay; logarithms are their inverses.',
  prereqRecap: [
    { term: 'Exponent', definition: 'In $a^n$, $n$ is the exponent. $a^n = a \\cdot a \\cdots a$ ($n$ times) for positive integers (Module 3).' },
    { term: 'Inverse Function', definition: '$f^{-1}$ reverses $f$: if $f(a) = b$, then $f^{-1}(b) = a$ (Topic 4.1).' },
    { term: 'Domain/Range', definition: 'Domain = valid inputs, Range = actual outputs (Topic 4.1).' }
  ],
  whyExists: { html: `
    <p><strong>Why exponentials?</strong> When a quantity\'s rate of change is proportional to its current value, the result is exponential. Population growth, radioactive decay, compound interest, and viral spread all follow exponential functions.</p>
    <p><strong>Why logarithms?</strong> Logarithms answer: "What exponent do I need?" $\\log_2(8) = 3$ because $2^3 = 8$. They convert multiplication to addition, which made computation feasible before calculators (slide rules use logarithmic scales).</p>
    ${WHY('Why is $e \\approx 2.718$ special?', '<p>$e$ is the base where the derivative of $a^x$ equals $a^x$ itself: $\\frac{d}{dx}e^x = e^x$. It arises from compound interest: $\\lim_{n \\to \\infty}(1 + 1/n)^n = e$. This makes $e$ the natural base for calculus.</p>')}
  ` },
  concept: { html: `
    <div class="callout callout-key"><h4>Exponential Function</h4>
    <p>$f(x) = a^x$ where $a \\gt 0, a \\neq 1$.</p>
    <ul>
      <li>Domain: $(-\\infty, \\infty)$. Range: $(0, \\infty)$. Always positive.</li>
      <li>$a \\gt 1$: growth. $0 < a \\lt 1$: decay.</li>
      <li>$y$-intercept: $(0, 1)$ because $a^0 = 1$.</li>
    </ul></div>
    <div class="callout callout-key"><h4>Logarithmic Function</h4>
    <p>$\\log_a(x) = y \\iff a^y = x$. The logarithm is the INVERSE of the exponential.</p>
    <ul>
      <li>Domain: $(0, \\infty)$. Range: $(-\\infty, \\infty)$.</li>
      <li>$\\ln(x) = \\log_e(x)$ (natural log). $\\log(x) = \\log_{10}(x)$ (common log).</li>
    </ul></div>
    <div class="callout callout-key"><h4>Logarithm Properties</h4>
    <ul>
      <li>$\\log_a(xy) = \\log_a(x) + \\log_a(y)$ (product rule)</li>
      <li>$\\log_a(x/y) = \\log_a(x) - \\log_a(y)$ (quotient rule)</li>
      <li>$\\log_a(x^n) = n \\log_a(x)$ (power rule)</li>
      <li>$\\log_a(a) = 1$ and $\\log_a(1) = 0$</li>
    </ul>
    ${WHY('Why does $\\log(xy) = \\log(x) + \\log(y)$?', '<p>Let $\\log_a(x) = m$ and $\\log_a(y) = n$. Then $x = a^m$ and $y = a^n$. So $xy = a^m \\cdot a^n = a^{m+n}$. Therefore $\\log_a(xy) = m + n = \\log_a(x) + \\log_a(y)$.</p>')}</div>
  ` },
  definition: { html: `<p><strong>$\\log_a(x)$:</strong> The exponent to which base $a$ must be raised to produce $x$. $\\log_a(x) = y \\iff a^y = x$.</p>` },
  examples: [{
    title: 'Solving Exponential and Log Equations',
    problem: 'Solve: (a) $3^{2x} = 81$. (b) $\\ln(x - 1) = 2$.',
    steps: [
      { title: 'Rewrite 81 as a power of 3', content: '$81 = 3^4$. So $3^{2x} = 3^4 \\Rightarrow 2x = 4 \\Rightarrow x = 2$.', why: 'When bases are equal, exponents must be equal: $a^m = a^n \\Rightarrow m = n$.' },
      { title: 'Convert log to exponential', content: '$\\ln(x-1) = 2 \\iff e^2 = x - 1 \\iff x = e^2 + 1 \\approx 8.389$.', why: '$\\log_a(y) = c \\iff a^c = y$. Here base is $e$.' }
    ]
  }],
  exercises: [
    { difficulty: 'easy', question: '$\\log_2(8) = $?', options: ['$2$', '$3$', '$4$', '$8$'], correctIndex: 1, hint: '<p>$2^? = 8$.</p>', correctExplanation: '$2^3 = 8$, so $\\log_2(8) = 3$.', wrongExplanations: { 0: '$2^2 = 4 \\neq 8$.', 2: '$2^4 = 16 \\neq 8$.', 3: '$\\log_2(8)$ is the exponent, not the argument.' } },
    { difficulty: 'easy', question: '$e^{\\ln 5} = $?', options: ['$e^5$', '$5$', '$\\ln 5$', '$5e$'], correctIndex: 1, hint: '<p>$e$ and $\\ln$ are inverse functions.</p>', correctExplanation: '$e^{\\ln x} = x$ for all $x \\gt 0$. So $e^{\\ln 5} = 5$.', wrongExplanations: { 0: '$e^{\\ln 5} \\neq e^5$. The $\\ln$ and $e$ cancel.', 2: 'The result is a number, not a logarithm.', 3: '$e$ and $\\ln$ cancel, leaving just 5.' } },
    { difficulty: 'medium', question: 'Simplify: $\\log_3(27) + \\log_3(9)$', options: ['$\\log_3(36)$', '$\\log_3(243)$', '$6$', '$8$'], correctIndex: 1, hint: '<p>$\\log_a(x) + \\log_a(y) = \\log_a(xy)$, or evaluate each separately.</p>', correctExplanation: '$\\log_3(27) = 3$ and $\\log_3(9) = 2$ (since $3^3 = 27$, $3^2 = 9$). Sum: $3 + 2 = 5$. Equivalently, product rule: $\\log_3(27 \\cdot 9) = \\log_3(243) = \\log_3(3^5) = 5$.', wrongExplanations: { 0: '$\\log_3(36)$: you added the arguments instead of multiplying.', 2: '$3 + 2 = 5$, not 6.', 3: '$\\log_3(27) = 3$, not 4.' } },
    { difficulty: 'medium', question: 'Solve: $5^x = 125$', options: ['$x = 25$', '$x = 5$', '$x = 3$', '$x = 2$'], correctIndex: 2, hint: '<p>$125 = 5^?$.</p>', correctExplanation: '$125 = 5^3$. So $5^x = 5^3 \\Rightarrow x = 3$.', wrongExplanations: { 0: '$x = 25 = 5^2$. But $5^{25}$ is enormous.', 1: '$5^5 = 3125 \\neq 125$.', 3: '$5^2 = 25 \\neq 125$.' } },
    { difficulty: 'hard', question: 'Solve: $\\log_2(x) + \\log_2(x-2) = 3$', options: ['$x = 4$', '$x = -2$', '$x = 4$ and $x = -2$', '$x = 8$'], correctIndex: 0, hint: '<p>Combine using product rule, convert to exponential, solve quadratic.</p>', correctExplanation: '$\\log_2(x(x-2)) = 3 \\Rightarrow x^2 - 2x = 8 \\Rightarrow x^2 - 2x - 8 = 0 \\Rightarrow (x-4)(x+2) = 0$. $x = 4$ or $x = -2$. But $\\log_2(-2)$ is undefined, so $x = -2$ is extraneous. Only $x = 4$.', wrongExplanations: { 1: '$x = -2$ gives $\\log_2(-2)$, which is undefined. Extraneous.', 2: '$x = -2$ is extraneous (log of negative). Only $x = 4$ is valid.', 3: '$x = 8$: $\\log_2(8) + \\log_2(6) = 3 + \\log_2(6) \\neq 3$.' } },
    { difficulty: 'hard', question: 'What is $\\log_a(a^{2x+1})$?', options: ['$a^{2x+1}$', '$2x + 1$', '$(2x+1)\\log_a(a)$', '$2x$'], correctIndex: 1, hint: '<p>$\\log_a(a^n) = n$.</p>', correctExplanation: '$\\log_a(a^{2x+1}) = 2x + 1$. The log and exponential are inverses.', wrongExplanations: { 0: 'That is $a^{2x+1}$ itself, not its logarithm.', 2: 'Correct but simplifies: $\\log_a(a) = 1$, so $(2x+1)(1) = 2x+1$.', 3: 'The entire exponent $2x + 1$ comes down, not just $2x$.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: '$\\log_5(25) =$?', accept: [2, '2'], placeholder: 'Enter a number', explanation: '$5^2 = 25$, so $\\log_5(25) = 2$.' },
    { difficulty: 'easy', question: '$\\ln(1) =$?', accept: [0, '0'], placeholder: 'Number', explanation: '$e^0 = 1$, so $\\ln(1) = 0$.' },
    { difficulty: 'medium', question: 'Solve: $2^x = 32$. $x =$?', accept: [5, '5'], placeholder: 'x = ?', explanation: '$32 = 2^5$, so $x = 5$.' },
    { difficulty: 'medium', question: 'Express $\\log_8(2)$ as a fraction:', accept: ['1/3'], placeholder: 'Fraction', explanation: '$8^{1/3} = 2$, so $\\log_8(2) = 1/3$.' },
    { difficulty: 'hard', question: 'Expand: $\\log_2(8x^3)$ using log properties. What is the result?', accept: ['3+3log2(x)', '3 + 3log2(x)', '3+3log_2(x)'], placeholder: 'e.g. 3+3log2(x)', explanation: '$\\log_2(8) + \\log_2(x^3) = 3 + 3\\log_2(x)$.' }
  ],
  matching: [
    { difficulty: 'medium', instruction: 'Match each log property to its formula:', pairs: [
      { left: 'Product Rule', right: '$\\log(xy) = \\log x + \\log y$' },
      { left: 'Quotient Rule', right: '$\\log(x/y) = \\log x - \\log y$' },
      { left: 'Power Rule', right: '$\\log(x^n) = n \\log x$' },
      { left: 'Inverse', right: '$\\log_a(a^x) = x$' }
    ] }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Exp/Log Strategy</h4>
    <ol><li><strong>Convert:</strong> $\\log_a(x) = y \\iff a^y = x$. Switch between forms as needed.</li>
    <li><strong>Same base:</strong> $a^m = a^n \\Rightarrow m = n$.</li>
    <li><strong>Log properties</strong> convert products/quotients/powers to sums/differences/multiples.</li>
    <li><strong>Check for extraneous solutions</strong> (log arguments must be positive).</li></ol></div>` }
},

/* TOPIC 4.4: Polynomial & Rational Function Graphs */
{
  id: 'poly-rational-graphs',
  title: 'Polynomial & Rational Function Graphs',
  description: 'End behavior, zeros, multiplicity, and asymptotes. Reading the story a graph tells about a function.',
  prereqRecap: [
    { term: 'Polynomial', definition: '$p(x) = a_n x^n + \\cdots + a_0$, degree $n$, leading term $a_n x^n$ (Module 3).' },
    { term: 'Rational Expression', definition: '$\\frac{P(x)}{Q(x)}$ where $P, Q$ are polynomials (Module 3).' },
    { term: 'Factoring', definition: 'Writing a polynomial as a product (Module 3).' },
    { term: 'Domain', definition: 'Valid inputs. Rational functions: exclude where denominator = 0 (Topic 4.1).' }
  ],
  whyExists: { html: `
    <p><strong>Why study graphs?</strong> A graph reveals structure invisible in the formula: where the function equals zero, where it increases/decreases, and its long-term behavior. Engineers use these to design systems; economists use them to model markets.</p>
  ` },
  concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 400 200" width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <line x1="100" y1="100" x2="100" y2="195" stroke="#94a3b8" stroke-width="0.5"/>
  <line x1="20" y1="180" x2="180" y2="180" stroke="#94a3b8" stroke-width="0.5"/>
  <path d="M 30 30 Q 60 180 100 120 Q 140 60 170 170" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <text x="100" y="15" fill="#e2e8f0" font-size="9" text-anchor="middle" font-family="Inter,sans-serif">Odd degree: opposite ends</text>
  <line x1="300" y1="100" x2="300" y2="195" stroke="#94a3b8" stroke-width="0.5"/>
  <line x1="220" y1="180" x2="380" y2="180" stroke="#94a3b8" stroke-width="0.5"/>
  <path d="M 230 30 Q 260 180 300 120 Q 340 60 370 30" fill="none" stroke="#10b981" stroke-width="2"/>
  <text x="300" y="15" fill="#e2e8f0" font-size="9" text-anchor="middle" font-family="Inter,sans-serif">Even degree: same ends</text>
</svg>
</div>
<p class="math-diagram-label">End behavior: odd-degree polynomials go in opposite directions; even-degree go in the same direction</p>

    <div class="callout callout-key"><h4>Polynomial End Behavior</h4>
    <p>Determined by the <strong>leading term</strong> $a_n x^n$:</p>
    <ul>
      <li>Degree even, $a_n \\gt 0$: $\\uparrow \\uparrow$ (both ends up)</li>
      <li>Degree even, $a_n \\lt 0$: $\\downarrow \\downarrow$ (both ends down)</li>
      <li>Degree odd, $a_n \\gt 0$: $\\downarrow \\uparrow$ (left down, right up)</li>
      <li>Degree odd, $a_n \\lt 0$: $\\uparrow \\downarrow$ (left up, right down)</li>
    </ul>
    <p>A degree-$n$ polynomial has at most $n$ real zeros and at most $n-1$ turning points.</p></div>
    <div class="callout callout-key"><h4>Zeros and Multiplicity</h4>
    <p>If $(x-r)^k$ is a factor, then $r$ is a zero with <strong>multiplicity $k$</strong>.</p>
    <ul>
      <li>Odd multiplicity: graph CROSSES the x-axis at $x = r$.</li>
      <li>Even multiplicity: graph TOUCHES and bounces off the x-axis at $x = r$.</li>
      <li>Higher multiplicity = flatter approach to the x-axis near $r$.</li>
    </ul></div>
    <div class="callout callout-key"><h4>Rational Root Theorem</h4>
    <p>For $a_n x^n + \\cdots + a_0 = 0$ with integer coefficients, any rational root $p/q$ (in lowest terms) satisfies:</p>
    <p>$p$ divides $a_0$ (constant) and $q$ divides $a_n$ (leading coefficient).</p>
    ${WHY('Why is this useful?', '<p>It gives a finite list of candidates to test. For $2x^3 - 3x^2 + 1 = 0$: possible roots are $\\\\pm\\\\{1, 1/2\\\\}$. Test each to find actual roots, then factor out and solve the remainder.</p>')}</div>
    <div class="callout callout-key"><h4>Intermediate Value Theorem (IVT)</h4>
    <p>If $f$ is continuous on $[a,b]$ and $f(a)$ and $f(b)$ have opposite signs, then $f(c) = 0$ for some $c \\in (a,b)$.</p>
    <p>Application: to show a polynomial has a root between two values, evaluate at both and check for a sign change.</p></div>
    <div class="callout callout-key"><h4>Rational Function Asymptotes</h4>
    <ul>
      <li><strong>Vertical Asymptotes:</strong> $x = a$ where denominator = 0 (after cancellation). Holes occur when the factor cancels.</li>
      <li><strong>Horizontal Asymptote:</strong> Compare degrees: deg(num) < deg(den): $y = 0$. Equal degrees: $y = \\frac{\\text{leading coeff of num}}{\\text{leading coeff of den}}$.</li>
      <li><strong>Oblique (Slant) Asymptote:</strong> When deg(num) = deg(den) + 1, perform polynomial long division. The quotient (ignoring remainder) is the oblique asymptote.</li>
    </ul>
    ${WHY('Why do asymptotes occur?', '<p>Vertical: as $x \\\\to a$ and $Q(a) = 0$, the denominator shrinks to 0 while numerator does not, forcing $|f(x)| \\\\to \\\\infty$. Horizontal: as $x \\\\to \\\\pm\\\\infty$, the highest-degree terms dominate. Oblique: when the numerator is exactly one degree higher, the function approaches a line rather than a constant.</p>')}</div>
  ` },
  definition: { html: `<p><strong>Asymptote:</strong> A line that the graph approaches but never (or rarely) reaches.</p><p><strong>Zero/Root:</strong> A value $r$ where $f(r) = 0$.</p>` },
  examples: [{
    title: 'Analyzing a Rational Function',
    problem: 'Sketch the key features of $f(x) = \\frac{2x}{x^2 - 1}$.',
    steps: [
      { title: 'Factor denominator', content: '$x^2 - 1 = (x+1)(x-1)$. Vertical asymptotes at $x = -1$ and $x = 1$.', why: 'Denominator zero at $x = \\pm 1$, numerator nonzero there.' },
      { title: 'Horizontal asymptote', content: 'deg(num) = 1 < deg(den) = 2, so $y = 0$.', why: 'When the denominator grows faster, the fraction shrinks to 0.' },
      { title: 'Zeros', content: '$2x = 0 \\Rightarrow x = 0$. The only x-intercept is $(0, 0)$.', why: 'Set numerator = 0.' },
      { title: 'Symmetry', content: '$f(-x) = \\frac{-2x}{x^2-1} = -f(x)$. The function is ODD.', why: 'Graph is symmetric about the origin.' }
    ]
  }],
  exercises: [
    { difficulty: 'easy', question: 'What is the end behavior of $f(x) = -x^3$?', options: ['Both ends up', 'Both ends down', 'Left up, right down', 'Left down, right up'], correctIndex: 2, hint: '<p>Odd degree, negative leading coefficient.</p>', correctExplanation: 'Odd degree: opposite ends. Negative leading coefficient: right end goes down, left goes up.', wrongExplanations: { 0: 'Both up requires even degree with positive leading coefficient.', 1: 'Both down requires even degree with negative leading coefficient.', 3: 'That would be positive leading coefficient with odd degree.' } },
    { difficulty: 'easy', question: 'The vertical asymptote of $f(x) = \\frac{1}{x+5}$ is:', options: ['$x = 5$', '$x = -5$', '$y = 0$', '$y = 5$'], correctIndex: 1, hint: '<p>Set denominator = 0.</p>', correctExplanation: '$x + 5 = 0 \\Rightarrow x = -5$.', wrongExplanations: { 0: '$x + 5 = 0$ gives $x = -5$, not $+5$.', 2: '$y = 0$ is the horizontal asymptote, not vertical.', 3: 'Vertical asymptotes are of the form $x = c$.' } },
    { difficulty: 'medium', question: 'If $f(x) = (x-1)^2(x+3)$, what happens at $x = 1$?', options: ['Crosses x-axis', 'Touches and bounces', 'Vertical asymptote', 'No intersection'], correctIndex: 1, hint: '<p>What is the multiplicity of the zero at $x = 1$?</p>', correctExplanation: '$(x-1)^2$: multiplicity 2 (even). Even multiplicity means the graph touches and bounces.', wrongExplanations: { 0: 'Crosses occurs at odd multiplicity. Here multiplicity is 2 (even).', 2: 'Asymptotes occur in rational functions, not polynomials.', 3: '$f(1) = 0$, so the graph does intersect the x-axis at $x = 1$.' } },
    { difficulty: 'medium', question: 'Horizontal asymptote of $f(x) = \\frac{3x^2 + 1}{x^2 - 4}$:', options: ['$y = 0$', '$y = 3$', '$y = -3$', 'No horizontal asymptote'], correctIndex: 1, hint: '<p>Compare degrees and leading coefficients.</p>', correctExplanation: 'Same degree (2). Ratio of leading coefficients: $3/1 = 3$. HA: $y = 3$.', wrongExplanations: { 0: '$y = 0$ applies when deg(num) < deg(den).', 2: 'Both leading coefficients are positive: $3/1 = 3$, not $-3$.', 3: 'Same degree means there IS a horizontal asymptote.' } },
    { difficulty: 'hard', question: 'How many real zeros can $f(x) = x^4 - 1$ have?', options: ['4', '2', '1', '0'], correctIndex: 1, hint: '<p>Factor completely over $\\mathbb{R}$.</p>', correctExplanation: '$x^4 - 1 = (x^2+1)(x^2-1) = (x^2+1)(x+1)(x-1)$. $x^2 + 1 = 0$ has no real solutions. Real zeros: $x = 1$ and $x = -1$. Two real zeros.', wrongExplanations: { 0: 'Degree 4 means AT MOST 4 real zeros. $x^2 + 1 \\gt 0$ for all real $x$, reducing the count to 2.', 2: 'Both $x = 1$ and $x = -1$ are zeros.', 3: '$f(1) = 0$, so there is at least one real zero.' } },
    { difficulty: 'hard', question: 'Does $f(x) = \\frac{x^2-4}{x-2}$ have a vertical asymptote at $x = 2$?', options: ['Yes', 'No, it has a hole at $x = 2$', 'No, it is defined at $x = 2$', 'Cannot determine'], correctIndex: 1, hint: '<p>Factor and simplify. Does the factor cancel?</p>', correctExplanation: '$\\frac{(x+2)(x-2)}{x-2} = x+2$ for $x \\neq 2$. The $(x-2)$ cancels, creating a <strong>hole</strong> (removable discontinuity) at $x = 2$, not a vertical asymptote.', wrongExplanations: { 0: 'The common factor cancels. Only non-canceling zeros of the denominator create vertical asymptotes.', 2: '$f(2) = \\frac{0}{0}$, which is undefined. The function is NOT defined at $x = 2$.', 3: 'It is determinable: factor and check for cancellation.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'What is the vertical asymptote of $f(x) = \\frac{1}{x-3}$?', accept: ['x=3', 'x = 3', '3'], placeholder: 'x = ?', explanation: '$x - 3 = 0 \\Rightarrow x = 3$.' },
    { difficulty: 'easy', question: 'What is the degree of $f(x) = 4x^3 - x + 7$?', accept: [3, '3'], placeholder: 'Enter a number', explanation: 'Highest power of $x$ is 3.' },
    { difficulty: 'medium', question: 'What is the horizontal asymptote of $f(x) = \\frac{5x}{x+1}$?', accept: ['y=5', 'y = 5', '5'], placeholder: 'y = ?', explanation: 'Same degree: $y = 5/1 = 5$.' },
    { difficulty: 'medium', question: 'Find all real zeros of $f(x) = x^3 - 4x$:', accept: ['0, 2, -2', '-2, 0, 2', '0,2,-2', '0, -2, 2'], placeholder: 'List zeros', explanation: '$x(x^2-4) = x(x-2)(x+2) = 0$. Zeros: $x = -2, 0, 2$.' },
    { difficulty: 'hard', question: 'How many turning points can a degree-5 polynomial have at most?', accept: [4, '4'], placeholder: 'Enter a number', explanation: 'At most $n-1 = 4$ turning points for degree $n$.' },
    { difficulty: 'hard', question: 'Does $f(x) = \\frac{x^2 + 1}{x^2 - 4}$ have a horizontal asymptote? If yes, $y =$?', accept: ['y=1', 'y = 1', '1'], placeholder: 'y = ? or no', explanation: 'Same degree (2). Ratio of leading coefficients: $1/1 = 1$. HA: $y = 1$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Find all asymptotes of $f(x) = \\frac{2x+1}{x-3}$.', steps: [
      { content: 'Vertical asymptote: Set denominator = 0. $x - 3 = 0 \\Rightarrow x = 3$.' },
      { content: 'Horizontal asymptote: Degrees are equal (both 1).' },
      { content: 'Ratio of leading coefficients: $\\frac{2}{1} = 2$.' },
      { content: 'Horizontal asymptote: $y = 2$.' },
      { content: 'Final: VA at $x = 3$, HA at $y = 2$.' }
    ], explanation: 'For rational functions: VA from denominator zeros, HA from degree comparison.' },
    { difficulty: 'hard', question: 'Sketch features of $f(x) = \\frac{x^2 - 9}{x^2 - x - 6}$.', steps: [
      { content: 'Factor: $\\frac{(x-3)(x+3)}{(x-3)(x+2)}$.' },
      { content: '$(x-3)$ cancels: hole at $x = 3$, not a VA.' },
      { content: 'Simplified: $\\frac{x+3}{x+2}$ for $x \\neq 3$.' },
      { content: 'VA: $x + 2 = 0 \\Rightarrow x = -2$.' },
      { content: 'HA: Same degree, ratio $= 1/1 = 1$. So $y = 1$.' },
      { content: 'Hole value: $f(3) = \\frac{6}{5} = 1.2$. Hole at $(3, 1.2)$.' },
      { content: 'Zero: $x + 3 = 0 \\Rightarrow x = -3$.' }
    ], explanation: 'Always factor first. Common factors create holes, remaining denominator zeros create VAs.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Analyze $f(x) = (x-1)^2(x+2)^3$.', parts: [
      { question: 'What is the degree of this polynomial?', accept: [5, '5'], placeholder: 'Degree', explanation: 'Multiply degrees: $2 + 3 = 5$.' },
      { question: 'What is the end behavior? (up-up, down-down, down-up, up-down)', accept: ['down-up', 'down up'], placeholder: 'e.g. down-up', explanation: 'Degree 5 (odd), positive leading coefficient: left down, right up.' },
      { question: 'What happens at $x = 1$? (crosses or bounces)', accept: ['bounces', 'touches', 'bounce'], placeholder: 'crosses or bounces', explanation: 'Multiplicity 2 (even): graph bounces off the x-axis.' },
      { question: 'What happens at $x = -2$? (crosses or bounces)', accept: ['crosses', 'cross'], placeholder: 'crosses or bounces', explanation: 'Multiplicity 3 (odd): graph crosses the x-axis with a flattening.' }
    ], completionMessage: 'Multiplicity determines behavior at zeros: even = bounce, odd = cross.' }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Complete the asymptote rules:', expression: 'If $\\deg(\\text{num}) < \\deg(\\text{den})$, the horizontal asymptote is $y =$ {{0}}.', blanks: [ { accept: ['0'], size: 3 } ], explanation: 'When the denominator grows faster, the ratio approaches 0.' },
    { difficulty: 'medium', context: 'Polynomial zeros:', expression: 'A zero with multiplicity 2 means the graph {{0}} the x-axis. A zero with multiplicity 3 means the graph {{1}} the x-axis.', blanks: [ { accept: ['touches', 'bounces off', 'bounces'], size: 10 }, { accept: ['crosses'], size: 8 } ], explanation: 'Even multiplicity: touch/bounce. Odd multiplicity: cross.' }
  ],
  matching: [
    { difficulty: 'medium', instruction: 'Match end behavior to polynomial type:', pairs: [
      { left: 'Even degree, $a_n \\gt 0$', right: 'Both ends up' },
      { left: 'Even degree, $a_n \\lt 0$', right: 'Both ends down' },
      { left: 'Odd degree, $a_n \\gt 0$', right: 'Left down, right up' },
      { left: 'Odd degree, $a_n \\lt 0$', right: 'Left up, right down' }
    ] }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Graph Analysis Strategy</h4>
    <ol><li><strong>End behavior:</strong> Look at leading term only.</li>
    <li><strong>Zeros:</strong> Factor, set = 0. Check multiplicity for cross vs. bounce.</li>
    <li><strong>Asymptotes:</strong> Vertical from denominator zeros (after cancellation). Horizontal from degree comparison.</li>
    <li><strong>Holes:</strong> Common factors that cancel create removable discontinuities, not asymptotes.</li></ol></div>` }
}

] // end topics array
}); // end module push
})();
