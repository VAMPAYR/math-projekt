/* ============================================================
   MODULE 3: Intermediate Algebra (4 topics)
   Source: OpenStax Intermediate Algebra (Chapters 5-8)
   ============================================================ */
(function() {
if (!window.MATH_MODULES) window.MATH_MODULES = [];
const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

window.MATH_MODULES.push({
id: 'intermediate-algebra',
order: 4,
title: 'Intermediate Algebra',
description: 'Polynomials, factoring, and rational expressions. Extending algebra to higher-degree equations. Requires: beginning algebra (Module 2).',
topics: [

/* TOPIC 3.1: Polynomials & Exponent Rules */
{
  id: 'polynomials-exponents',
  title: 'Polynomials & Exponent Rules',
  description: 'The algebra of expressions with multiple terms and powers. Polynomials model everything from projectile motion to economics.',
  prereqRecap: [
    { term: 'Variable', definition: 'A letter representing an unknown quantity (Module 2).' },
    { term: 'Term', definition: 'A product of a number (coefficient) and variables raised to powers. Example: $3x^2$ has coefficient 3.' },
    { term: 'Like Terms', definition: 'Terms with identical variable parts. $5x^2$ and $-2x^2$ are like terms. $5x^2$ and $5x^3$ are NOT.' },
    { term: 'Exponent', definition: 'In $x^n$, $n$ is the exponent. It means multiply $x$ by itself $n$ times: $x^3 = x \\cdot x \\cdot x$.' }
  ],
  whyExists: { html: `
    <p><strong>Why polynomials?</strong> Polynomials are the simplest class of functions beyond constants and lines. They model real phenomena: $h(t) = -16t^2 + v_0 t + h_0$ (projectile height), revenue = price �: quantity, and area = length �: width.</p>
    ${WHY('Why exponent rules?', '<p>Exponent rules are shortcuts derived from the definition. $x^3 \\cdot x^2 = (x \\cdot x \\cdot x)(x \\cdot x) = x^5 = x^{3+2}$. Once proven, these rules let us simplify without writing out all the factors.</p>')}
  ` },
  hook: { html: `<div class="callout callout-puzzle"><h4>🧩 Puzzle: Area of a Garden</h4>
    <p>A rectangular garden has length $(x + 3)$ meters and width $(x + 2)$ meters. What is its area? You need to multiply two binomials: $(x+3)(x+2)$. After this topic, you will know how.</p></div>` },
  formalDefinitions: [
      { term: 'Polynomial', symbol: '$p(x) = a_nx^n + a_{n-1}x^{n-1} + \\cdots + a_1x + a_0$', definition: 'A finite sum of terms of the form $a_kx^k$ where $k \\in \\mathbb{N} \\cup \\{0\\}$ and $a_k \\in \\mathbb{R}$. The degree is the highest power with nonzero coefficient.' },
      { term: 'Degree', symbol: '$\\deg(p)$', definition: 'The highest exponent appearing in the polynomial with a nonzero coefficient. $\\deg(3x^4 + x) = 4$. The zero polynomial has no defined degree.' },
      { term: 'Leading Coefficient', symbol: '$a_n$', definition: 'The coefficient of the highest-degree term. Determines end behavior of the polynomial graph.' }
    ],
    mathGrammar: [
      { question: 'What does the exponent (the small raised number) mean?', answer: '$x^3$ means $x \\times x \\times x$ (multiply $x$ by itself 3 times). The exponent counts how many copies of the base you are multiplying together. $2^4 = 2 \\times 2 \\times 2 \\times 2 = 16$.' },
      { question: 'Why does $x^0 = 1$?', answer: 'Follow the pattern: $x^3 = x \\cdot x \\cdot x$, $x^2 = x \\cdot x$, $x^1 = x$. Each time the exponent drops by 1, you divide by $x$. So $x^0 = x^1 \\div x = x \\div x = 1$. The pattern forces it. Math follows its own logic here, and $x^0 = 1$ is the only answer that keeps everything consistent.' },
      { question: 'Why do exponents add when you multiply? ($x^a \\cdot x^b = x^{a+b}$)', answer: '$x^2 \\cdot x^3 = (x \\cdot x) \\cdot (x \\cdot x \\cdot x) = x^5$. You are just counting the total number of $x$\'s being multiplied. Two copies times three copies equals five copies.' },
      { question: 'What is a square root and why does it exist?', answer: '$\\sqrt{x}$ asks: "What number, multiplied by itself, gives $x$?" $\\sqrt{9} = 3$ because $3 \\times 3 = 9$. It reverses what squaring does. Squaring makes things bigger; the square root brings them back. We need it to reverse the operation $x^2$, just as subtraction reverses addition.' }
    ],
    concept: { html: `
    <div class="callout callout-key"><h4>Exponent Rules</h4>
    <p>For $a, b \\neq 0$ and integers $m, n$:</p>
    <ul>
      <li><strong>Product Rule:</strong> $a^m \\cdot a^n = a^{m+n}$</li>
      <li><strong>Quotient Rule:</strong> $\\frac{a^m}{a^n} = a^{m-n}$</li>
      <li><strong>Power Rule:</strong> $(a^m)^n = a^{mn}$</li>
      <li><strong>Product to Power:</strong> $(ab)^n = a^n b^n$</li>
      <li><strong>Zero Exponent:</strong> $a^0 = 1$ ${WHY('Why is $a^0 = 1$?', '<p>From the quotient rule: $\\frac{a^n}{a^n} = a^{n-n} = a^0$. But $\\frac{a^n}{a^n} = 1$. Therefore $a^0 = 1$.</p>')}</li>
      <li><strong>Negative Exponent:</strong> $a^{-n} = \\frac{1}{a^n}$ ${WHY('Why?', '<p>$a^{-n} = a^{0-n} = \\frac{a^0}{a^n} = \\frac{1}{a^n}$.</p>')}</li>
    </ul></div>
    <div class="callout callout-key"><h4>Polynomial Vocabulary</h4>
    <ul>
      <li><strong>Polynomial:</strong> Sum of terms: $a_n x^n + a_{n-1}x^{n-1} + \\cdots + a_1 x + a_0$.</li>
      <li><strong>Degree:</strong> Highest exponent. $3x^4 + 2x - 1$ has degree 4.</li>
      <li><strong>Monomial/Binomial/Trinomial:</strong> 1, 2, or 3 terms.</li>
    </ul></div>
    <div class="callout callout-key"><h4>Multiplying Polynomials (FOIL for Binomials)</h4>
    <p>$(a+b)(c+d) = ac + ad + bc + bd$</p>
    <p>Example: $(x+3)(x+2) = x^2 + 2x + 3x + 6 = x^2 + 5x + 6$</p>
    ${WHY('Why does FOIL work?', '<p>FOIL is the distributive property applied twice: $(a+b)(c+d) = a(c+d) + b(c+d) = ac + ad + bc + bd$. For polynomials with more than 2 terms, distribute each term of the first polynomial across every term of the second.</p>')}</div>
    <div class="callout callout-key"><h4>Special Products</h4>
    <ul>
      <li>$(a+b)^2 = a^2 + 2ab + b^2$ (perfect square trinomial)</li>
      <li>$(a-b)^2 = a^2 - 2ab + b^2$</li>
      <li>$(a+b)(a-b) = a^2 - b^2$ (difference of squares)</li>
    </ul></div>
  ` },
  definition: { html: `
    <p><strong>Polynomial in $x$:</strong> $p(x) = a_n x^n + a_{n-1}x^{n-1} + \\cdots + a_0$ where $a_n \\neq 0$ and all exponents are non-negative integers.</p>
    <p><strong>Leading Term:</strong> The term with the highest power: $a_n x^n$. <strong>Leading Coefficient:</strong> $a_n$.</p>
  ` },
  examples: [{
    title: 'Multiplying and Simplifying',
    problem: 'Expand and simplify: $(2x - 3)(x + 5) - (x-1)^2$.',
    steps: [
      { title: 'FOIL the first product', content: '$(2x-3)(x+5) = 2x^2 + 10x - 3x - 15 = 2x^2 + 7x - 15$', why: 'Distribute each term: $2x \\cdot x, 2x \\cdot 5, (-3) \\cdot x, (-3) \\cdot 5$.' },
      { title: 'Expand the perfect square', content: '$(x-1)^2 = x^2 - 2x + 1$', why: 'Using $(a-b)^2 = a^2 - 2ab + b^2$ with $a=x, b=1$.' },
      { title: 'Subtract', content: '$(2x^2 + 7x - 15) - (x^2 - 2x + 1) = x^2 + 9x - 16$', why: 'Distribute the negative: $-x^2 + 2x - 1$. Combine like terms.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a polynomial?', back: 'Sum of terms with non-negative integer exponents: a_n*x^n + ... + a_1*x + a_0. Degree = highest exponent.' },
      { type: 'why', front: 'Why does x^0 = 1?', back: 'Pattern: x^3, x^2, x^1 each divide by x. So x^0 = x^1/x = 1. This keeps the rule x^a * x^b = x^(a+b) consistent.' },
      { type: 'how', front: 'How to multiply polynomials?', back: 'Distribute every term in the first to every term in the second. Then combine like terms. FOIL is a special case for two binomials.' },
      { type: 'why', front: 'Why does x^a * x^b = x^(a+b)?', back: 'x^3 * x^2 = (x*x*x)(x*x) = x*x*x*x*x = x^5. Multiplication concatenates the factors: 3+2=5.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'Simplify: $x^3 \\cdot x^5$', options: ['$x^{15}$', '$x^8$', '$x^2$', '$2x^8$'], correctIndex: 1, hint: '<p>Product rule: add exponents.</p>', correctExplanation: '$x^3 \\cdot x^5 = x^{3+5} = x^8$.', wrongExplanations: { 0: 'You multiplied exponents. The product rule ADDS them.', 2: 'You subtracted. The quotient rule subtracts; the product rule adds.', 3: 'Coefficients: $1 \\cdot 1 = 1$, not 2.' } },
    { difficulty: 'easy', question: '$(x+4)(x-4) = $?', options: ['$x^2 - 16$', '$x^2 + 16$', '$x^2 - 8x + 16$', '$x^2 + 8x - 16$'], correctIndex: 0, hint: '<p>Difference of squares: $(a+b)(a-b) = a^2 - b^2$.</p>', correctExplanation: '$(x+4)(x-4) = x^2 - 4^2 = x^2 - 16$.', wrongExplanations: { 1: 'The middle terms cancel: $+4x - 4x = 0$. The constant is $-16$, not $+16$.', 2: 'That is $(x-4)^2$, not $(x+4)(x-4)$.', 3: 'Check signs: $(+4)(-4) = -16$.' } },
    { difficulty: 'medium', question: 'What is the degree of $5x^3 - 2x^5 + x$?', options: ['3', '5', '1', '9'], correctIndex: 1, hint: '<p>Degree = highest exponent.</p>', correctExplanation: 'The highest power is $x^5$. Degree = 5.', wrongExplanations: { 0: '$x^3$ is present but $x^5$ has a higher power.', 2: '$x = x^1$ has the lowest power, not the highest.', 3: 'You may have added exponents. Degree is the single highest exponent.' } },
    { difficulty: 'medium', question: 'Expand: $(3x + 2)^2$', options: ['$9x^2 + 4$', '$9x^2 + 12x + 4$', '$6x^2 + 12x + 4$', '$9x^2 + 6x + 4$'], correctIndex: 1, hint: '<p>$(a+b)^2 = a^2 + 2ab + b^2$.</p>', correctExplanation: '$a = 3x, b = 2$. $a^2 = 9x^2$, $2ab = 2(3x)(2) = 12x$, $b^2 = 4$. Answer: $9x^2 + 12x + 4$.', wrongExplanations: { 0: 'Missing the middle term $2ab = 12x$. $(a+b)^2 \\neq a^2 + b^2$.', 2: '$(3x)^2 = 9x^2$, not $6x^2$.', 3: '$2(3x)(2) = 12x$, not $6x$.' } },
    { difficulty: 'hard', question: 'Simplify: $\\frac{(2x^3)^2 \\cdot x^{-1}}{4x^5}$', options: ['$x^0 = 1$', '$x$', '$x^{-1}$', '$4x$'], correctIndex: 0, hint: '<p>Apply power rule to $(2x^3)^2$ first, then simplify.</p>', correctExplanation: '$(2x^3)^2 = 4x^6$. Numerator: $4x^6 \\cdot x^{-1} = 4x^5$. $\\frac{4x^5}{4x^5} = 1 = x^0$.', wrongExplanations: { 1: 'Check: $x^{6-1-5} = x^0 = 1$, not $x^1$.', 2: 'The exponents cancel completely: $6 + (-1) - 5 = 0$.', 3: 'The coefficients also cancel: $4/4 = 1$.' } },
    { difficulty: 'hard', question: 'Expand: $(x+1)(x^2 - x + 1)$', options: ['$x^3 + 1$', '$x^3 - 1$', '$x^3 + 3x + 1$', '$x^3 + x^2 + x + 1$'], correctIndex: 0, hint: '<p>This is the sum of cubes factorization in reverse: $a^3 + b^3 = (a+b)(a^2 - ab + b^2)$.</p>', correctExplanation: 'Distribute: $x(x^2 - x + 1) + 1(x^2 - x + 1) = x^3 - x^2 + x + x^2 - x + 1 = x^3 + 1$. All middle terms cancel.', wrongExplanations: { 1: 'That is $a^3 - b^3 = (a-b)(a^2+ab+b^2)$. The signs are different.', 2: 'Check: $-x^2 + x^2 = 0$ and $x - x = 0$. Middle terms vanish.', 3: 'The $x^2$ terms cancel: $-x^2 + x^2 = 0$.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'Simplify: $x^4 \\cdot x^3 =$?', accept: ['x^7', 'x7'], placeholder: 'e.g. x^7', explanation: '$x^{4+3} = x^7$.' },
    { difficulty: 'medium', question: 'Expand: $(x+5)(x-5) =$?', accept: ['x^2-25', 'x^2 - 25'], placeholder: 'e.g. x^2-25', explanation: 'Difference of squares: $x^2 - 25$.' },
    { difficulty: 'hard', question: 'Simplify: $(3x^2)^3 =$?', accept: ['27x^6', '27x6'], placeholder: 'e.g. 27x^6', explanation: '$3^3 \\cdot (x^2)^3 = 27x^6$.' },
    { difficulty: 'easy', question: 'Simplify: $(x^3)^2 =$?', accept: ['x^6', 'x6'], placeholder: 'Expression', explanation: '$(x^3)^2 = x^{3 \\cdot 2} = x^6$.' },
    { difficulty: 'medium', question: '$\\frac{x^5}{x^2} =$?', accept: ['x^3', 'x3'], placeholder: 'Expression', explanation: '$x^{5-2} = x^3$.' },
    { difficulty: 'medium', question: 'Simplify: $\\frac{x^{-2}}{x^3} =$?', accept: ['x^{-5}', '1/x^5', 'x^-5'], placeholder: 'Expression', explanation: '$x^{-2-3} = x^{-5} = 1/x^5$.' },
    { difficulty: 'hard', question: 'Simplify: $(x^{1/2})^6 =$?', accept: ['x^3', 'x3'], placeholder: 'Expression', explanation: '$(x^{1/2})^6 = x^{6/2} = x^3$.' },
    { difficulty: 'medium', question: 'Simplify: $(2x^3)^2 =$?', accept: ['4x^6', '4x6'], placeholder: 'Expression', explanation: '$2^2 \\cdot (x^3)^2 = 4x^6$.' },
    { difficulty: 'hard', question: 'Simplify: $\\frac{x^5 \\cdot x^{-2}}{x^2} =$?', accept: ['x', 'x^1'], placeholder: 'Expression', explanation: '$x^{5-2-2} = x^1 = x$.' },
    { difficulty: 'easy', question: '$x^0 =$? (for $x \\neq 0$)', accept: [1, '1'], placeholder: 'Number', explanation: 'Any nonzero number to the power 0 equals 1.' },
    { difficulty: 'hard', question: 'Negative exponent: $5^{-2} =$?', accept: ['1/25', '0.04'], placeholder: 'Number', explanation: '$5^{-2} = 1/5^2 = 1/25$.' },
    { difficulty: 'easy', question: '$(xy)^3 =$?', accept: ['x^3y^3', 'x3y3'], placeholder: 'Expression', explanation: 'Power of a product: $(xy)^3 = x^3 y^3$.' },
    { difficulty: 'medium', question: 'Scientific notation: $4500 =$?', accept: ['4.5 x 10^3', '4.5e3', '4.5*10^3'], placeholder: 'Notation', explanation: '$4500 = 4.5 \\times 10^3$.' },
    { difficulty: 'hard', question: 'Fractional exponent: $27^{2/3} =$?', accept: [9, '9'], placeholder: 'Number', explanation: '$27^{1/3} = 3$. $3^2 = 9$.' }
  ],
  fillBlanks: [
    { difficulty: 'medium', context: 'Complete the special product formulas:', expression: '$(a+b)^2 = a^2 +$ {{0}} $ab + b^2$. $(a+b)(a-b) = a^2 -$ {{1}}', blanks: [ { accept: ['2', '2'], size: 3 }, { accept: ['b^2', 'b2'], size: 4 } ], explanation: '$(a+b)^2 = a^2 + 2ab + b^2$. $(a+b)(a-b) = a^2 - b^2$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Expand $(3x - 2)^2$ step by step.', steps: [
      { content: 'Use $(a-b)^2 = a^2 - 2ab + b^2$.' },
      { content: '$a = 3x$, $b = 2$.' },
      { content: '$a^2 = 9x^2$.' },
      { content: '$2ab = 2(3x)(2) = 12x$.' },
      { content: '$b^2 = 4$.' },
      { content: '$(3x-2)^2 = 9x^2 - 12x + 4$.' },
    { difficulty: 'hard', question: 'Simplify $\\frac{x^3 y^{-2}}{x^{-1} y^4}$.', steps: [
      { content: 'Subtract exponents: $x^{3-(-1)} = x^4$.' },
      { content: '$y^{-2-4} = y^{-6} = \\frac{1}{y^6}$.' },
      { content: 'Result: $\\frac{x^4}{y^6}$.' }
    ], explanation: 'Division of powers: subtract exponents. Move negative exponents to the denominator.' }
    ], explanation: 'Perfect square trinomial: square first, double product, square last.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Simplify $(2x+1)^3$ by expanding.', parts: [
      { question: '$(2x+1)^2 =$?', accept: ['4x^2+4x+1', '4x^2 + 4x + 1'], placeholder: 'First, square it', explanation: '$(2x)^2 + 2(2x)(1) + 1^2 = 4x^2 + 4x + 1$.' },
      { question: 'Now multiply by $(2x+1)$: final answer?', accept: ['8x^3+12x^2+6x+1', '8x^3 + 12x^2 + 6x + 1'], placeholder: 'Full expansion', explanation: '$(4x^2+4x+1)(2x+1) = 8x^3+4x^2+8x^2+4x+2x+1 = 8x^3+12x^2+6x+1$.' }
    ], completionMessage: 'Cubing a binomial: square first, then multiply by the original factor.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each exponent rule to its formula:', pairs: [
      { left: 'Product rule', right: '$x^a \\cdot x^b = x^{a+b}$' },
      { left: 'Quotient rule', right: '$x^a / x^b = x^{a-b}$' },
      { left: 'Power rule', right: '$(x^a)^b = x^{ab}$' },
      { left: 'Zero exponent', right: '$x^0 = 1$ ($x \\neq 0$)' }
    ] }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Polynomial Strategy</h4>
    <ol><li><strong>Exponents:</strong> Product → add. Quotient → subtract. Power → multiply.</li>
    <li><strong>FOIL:</strong> First, Outer, Inner, Last. For larger polynomials, distribute every term.</li>
    <li><strong>Special products:</strong> Memorize $(a \\pm b)^2$ and $(a+b)(a-b)$. These appear constantly.</li></ol></div>` }
},

/* TOPIC 3.2: Factoring */
{
  id: 'factoring',
  title: 'Factoring Polynomials',
  description: 'Reversing multiplication: writing a polynomial as a product of simpler expressions. The key to solving quadratic equations.',
  prereqRecap: [
    { term: 'Polynomial', definition: 'Sum of terms with non-negative integer exponents: $a_n x^n + \\cdots + a_0$ (Topic 3.1).' },
    { term: 'Factor', definition: 'A factor of a number or expression divides it evenly. Factors of 12: 1, 2, 3, 4, 6, 12.' },
    { term: 'GCF', definition: 'Greatest Common Factor: the largest factor shared by all terms. GCF of $6x^3$ and $4x^2$ is $2x^2$.' },
    { term: 'FOIL', definition: '$(a+b)(c+d) = ac + ad + bc + bd$. Factoring is FOIL in reverse (Topic 3.1).' }
  ],
  whyExists: { html: `
    <p><strong>Why factor?</strong> Factoring converts addition/subtraction into multiplication, unlocking the <strong>Zero Product Property</strong>: if $ab = 0$, then $a = 0$ or $b = 0$. This is how we solve quadratic equations.</p>
    ${WHY('Why does the Zero Product Property work?', '<p>Suppose $ab = 0$ and $a \\neq 0$. Then $b = \\frac{0}{a} = 0$. So at least one factor must be zero. This property holds in $\\mathbb{R}$ and $\\mathbb{C}$ because they have no "zero divisors."</p>')}
  ` },
  formalDefinitions: [
      { term: 'Factor', symbol: '', definition: 'To express a polynomial as a product of polynomials of lower degree. $x^2 - 5x + 6 = (x-2)(x-3)$. Factoring is the inverse of expansion.' },
      { term: 'Irreducible Polynomial', symbol: '', definition: 'A polynomial that cannot be factored into polynomials of lower degree over a given number system. $x^2 + 1$ is irreducible over $\\mathbb{R}$ but factors as $(x+i)(x-i)$ over $\\mathbb{C}$.' },
      { term: 'Factor Theorem', symbol: '', definition: 'If $p(a) = 0$, then $(x - a)$ is a factor of $p(x)$. Conversely, if $(x-a)$ divides $p(x)$, then $p(a) = 0$. This links together two ideas: the values where a polynomial equals zero, and the expressions that multiply to form it.' }
    ],
    mathGrammar: [
      { question: 'What does "factoring" mean?', answer: 'Writing an expression as a product of simpler expressions. $x^2 - 9 = (x+3)(x-3)$. The left side is one expression; the right side shows it is built from two pieces multiplied together. Factoring is like opening up an expression to see what it is made of.' },
      { question: 'Why do we factor?', answer: 'To solve equations. If $ab = 0$, then $a = 0$ or $b = 0$ (Zero Product Property). So $(x+3)(x-3) = 0$ means $x = -3$ or $x = 3$. Without factoring, you cannot use this property.' },
      { question: 'How do I factor $x^2 + bx + c$?', answer: 'Find two numbers that multiply to give $c$ AND add to give $b$. For $x^2 + 5x + 6$: what two numbers multiply to 6 and add to 5? Answer: 2 and 3. So $x^2 + 5x + 6 = (x+2)(x+3)$. This works because $(x+2)(x+3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6$.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 340 200" width="340" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="40" width="120" height="80" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="2"/>
  <rect x="160" y="40" width="80" height="80" fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="2"/>
  <text x="100" y="85" fill="#3b82f6" font-size="14" text-anchor="middle" font-family="Inter,sans-serif">x²</text>
  <text x="200" y="85" fill="#10b981" font-size="14" text-anchor="middle" font-family="Inter,sans-serif">3x</text>
  <rect x="40" y="120" width="120" height="50" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" stroke-width="2"/>
  <rect x="160" y="120" width="80" height="50" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" stroke-width="2"/>
  <text x="100" y="150" fill="#f59e0b" font-size="14" text-anchor="middle" font-family="Inter,sans-serif">2x</text>
  <text x="200" y="150" fill="#8b5cf6" font-size="14" text-anchor="middle" font-family="Inter,sans-serif">6</text>
  <text x="100" y="30" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="Inter,sans-serif">x</text>
  <text x="200" y="30" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="Inter,sans-serif">3</text>
  <text x="25" y="85" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="Inter,sans-serif">x</text>
  <text x="25" y="150" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="Inter,sans-serif">2</text>
  <text x="280" y="60" fill="#e2e8f0" font-size="11" font-family="Inter,sans-serif">(x+3)(x+2)</text>
  <text x="280" y="80" fill="#94a3b8" font-size="11" font-family="Inter,sans-serif">= x²+5x+6</text>
  <text x="135" y="188" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">Area model: factoring = finding rectangle dimensions</text>
</svg>
</div>
<p class="math-diagram-label">Area model: x² + 5x + 6 = (x+3)(x+2). Each cell is a term of the product.</p>

    <div class="callout callout-key"><h4>Factoring Strategy (Always Follow This Order)</h4>
    <ol>
      <li><strong>GCF first:</strong> Factor out the greatest common factor of all terms.</li>
      <li><strong>Count terms:</strong>
        <ul>
          <li>2 terms: Check for difference of squares ($a^2 - b^2$), sum/difference of cubes.</li>
          <li>3 terms: Try trinomial factoring ($x^2 + bx + c$ or $ax^2 + bx + c$).</li>
          <li>4 terms: Try factoring by grouping.</li>
        </ul>
      </li>
      <li><strong>Check:</strong> Multiply the factors back to verify.</li>
    </ol></div>
    <div class="callout callout-key"><h4>Key Factoring Patterns</h4>
    <ul>
      <li><strong>Difference of Squares:</strong> $a^2 - b^2 = (a+b)(a-b)$</li>
      <li><strong>Perfect Square Trinomial:</strong> $a^2 + 2ab + b^2 = (a+b)^2$</li>
      <li><strong>Sum of Cubes:</strong> $a^3 + b^3 = (a+b)(a^2 - ab + b^2)$</li>
      <li><strong>Difference of Cubes:</strong> $a^3 - b^3 = (a-b)(a^2 + ab + b^2)$</li>
      <li><strong>Trinomial ($x^2 + bx + c$):</strong> Find two numbers $p, q$ with $p + q = b$ and $pq = c$. Then $x^2 + bx + c = (x+p)(x+q)$.</li>
    </ul>
    ${WHY('Why does trinomial factoring work?', '<p>$(x+p)(x+q) = x^2 + qx + px + pq = x^2 + (p+q)x + pq$. So the middle coefficient is $p+q$ and the constant is $pq$. Finding $p$ and $q$ reverses this process.</p>')}</div>
  ` },
  definition: { html: `<p><strong>To Factor:</strong> Write an expression as a product of two or more simpler expressions.</p><p><strong>Prime Polynomial:</strong> A polynomial that cannot be factored over the integers (like a prime number).</p>` },
  examples: [{
    title: 'Factor Completely',
    problem: 'Factor: $2x^3 - 8x$',
    steps: [
      { title: 'GCF', content: '$2x^3 - 8x = 2x(x^2 - 4)$', why: 'GCF of $2x^3$ and $8x$ is $2x$.' },
      { title: 'Difference of squares', content: '$x^2 - 4 = (x+2)(x-2)$', why: '$x^2 - 4 = x^2 - 2^2$, so apply $a^2 - b^2 = (a+b)(a-b)$.' },
      { title: 'Final answer', content: '$2x(x+2)(x-2)$', why: 'Always check: $2x \\cdot (x+2)(x-2) = 2x(x^2-4) = 2x^3 - 8x$ ✓.' }
    ]
  }],
  flashCards: [
      { type: 'why', front: 'Why do we factor?', back: 'Factoring rewrites a sum as a product. If ab=0, then a=0 or b=0 (Zero Product Property). This solves polynomial equations.' },
      { type: 'how', front: 'Factor x^2 + 5x + 6?', back: 'Find two numbers that multiply to 6 and add to 5: 2 and 3. Answer: (x+2)(x+3). Check by expanding.' },
      { type: 'why', front: 'Why does "multiply to c, add to b" work?', back: 'If x^2+bx+c = (x+p)(x+q), then p+q=b and p*q=c. Matching coefficients gives the factoring recipe.' },
      { type: 'define', front: 'GCF vs Grouping?', back: 'GCF: pull out largest factor from ALL terms. Grouping: split into pairs, factor each, then factor out common binomial.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'Factor: $6x^2 + 9x$', options: ['$3x(2x + 3)$', '$3(2x^2 + 3x)$', '$6x(x + 9)$', '$x(6x + 9)$'], correctIndex: 0, hint: '<p>Find the GCF of $6x^2$ and $9x$.</p>', correctExplanation: 'GCF = $3x$. $6x^2 \\div 3x = 2x$. $9x \\div 3x = 3$. Answer: $3x(2x+3)$.', wrongExplanations: { 1: 'Not fully factored: $3$ is a common factor but you missed the common $x$.', 2: '$6x \\cdot 9 = 54x \\neq 9x$. Check: $6x(x+9) = 6x^2 + 54x$.', 3: '$x(6x+9) = 6x^2 + 9x$ ✓ but not FULLY factored: $6x + 9 = 3(2x+3)$.' } },
    { difficulty: 'easy', question: 'Factor: $x^2 - 25$', options: ['$(x-5)^2$', '$(x+5)(x-5)$', '$(x+25)(x-1)$', 'Cannot be factored'], correctIndex: 1, hint: '<p>Difference of squares: $a^2 - b^2 = (a+b)(a-b)$.</p>', correctExplanation: '$x^2 - 25 = x^2 - 5^2 = (x+5)(x-5)$.', wrongExplanations: { 0: '$(x-5)^2 = x^2 - 10x + 25 \\neq x^2 - 25$.', 2: '$(x+25)(x-1) = x^2 + 24x - 25 \\neq x^2 - 25$.', 3: 'This IS factorable as a difference of squares.' } },
    { difficulty: 'medium', question: 'Factor: $x^2 + 5x + 6$', options: ['$(x+2)(x+3)$', '$(x+1)(x+6)$', '$(x-2)(x-3)$', '$(x+5)(x+1)$'], correctIndex: 0, hint: '<p>Find $p + q = 5$ and $pq = 6$.</p>', correctExplanation: '$p = 2, q = 3$: $2+3=5$ ✓, $2 \\times 3 = 6$ ✓. So $(x+2)(x+3)$.', wrongExplanations: { 1: '$1 + 6 = 7 \\neq 5$.', 2: '$(-2)+(-3) = -5 \\neq 5$.', 3: '$5 \\times 1 = 5 \\neq 6$.' } },
    { difficulty: 'medium', question: 'Factor: $2x^2 - 5x - 3$', options: ['$(2x+1)(x-3)$', '$(2x-1)(x+3)$', '$(2x-3)(x+1)$', '$(2x+3)(x-1)$'], correctIndex: 0, hint: '<p>Find factors of $2 \\times (-3) = -6$ that sum to $-5$.</p>', correctExplanation: 'Need $pq = -6$ and $p+q = -5$: $p = 1, q = -6$. Rewrite: $2x^2 + x - 6x - 3 = x(2x+1) - 3(2x+1) = (2x+1)(x-3)$.', wrongExplanations: { 1: '$(2x-1)(x+3) = 2x^2 + 5x - 3$. Sign on middle term is wrong.', 2: '$(2x-3)(x+1) = 2x^2 - x - 3$. Middle coefficient is $-1$, not $-5$.', 3: '$(2x+3)(x-1) = 2x^2 + x - 3$. Middle coefficient is $+1$.' } },
    { difficulty: 'hard', question: 'Factor completely: $x^4 - 16$', options: ['$(x^2+4)(x^2-4)$', '$(x^2+4)(x+2)(x-2)$', '$(x+2)^2(x-2)^2$', '$(x-2)^4$'], correctIndex: 1, hint: '<p>Apply difference of squares twice.</p>', correctExplanation: '$x^4 - 16 = (x^2)^2 - 4^2 = (x^2+4)(x^2-4)$. Then $x^2-4 = (x+2)(x-2)$. Note: $x^2+4$ cannot be factored over $\\mathbb{R}$.', wrongExplanations: { 0: 'Not fully factored: $x^2 - 4$ is itself a difference of squares.', 2: '$(x+2)^2(x-2)^2 = (x^2-4)^2 = x^4 - 8x^2 + 16 \\neq x^4 - 16$.', 3: '$(x-2)^4$ has degree 4 but expands to $x^4 - 8x^3 + \\cdots \\neq x^4 - 16$.' } },
    { difficulty: 'hard', question: 'Factor: $8x^3 - 27$', options: ['$(2x-3)(4x^2+6x+9)$', '$(2x-3)(4x^2-6x+9)$', '$(2x+3)(4x^2-6x+9)$', '$(2x-3)^3$'], correctIndex: 0, hint: '<p>Difference of cubes: $a^3 - b^3 = (a-b)(a^2 + ab + b^2)$.</p>', correctExplanation: '$8x^3 = (2x)^3$, $27 = 3^3$. $(2x-3)((2x)^2 + (2x)(3) + 3^2) = (2x-3)(4x^2+6x+9)$.', wrongExplanations: { 1: 'The middle term in the trinomial factor is $+ab = +6x$, not $-6x$.', 2: 'First factor should be $(2x-3)$ since this is a DIFFERENCE.', 3: '$(2x-3)^3 = 8x^3 - 36x^2 + 54x - 27 \\neq 8x^3 - 27$.' } }
  ,

    {
      question: 'Factor: x^2 - 7x + 12',
      type: 'mc',
      options: ['(x-3)(x-4)', '(x+3)(x+4)', '(x-2)(x-6)', '(x+3)(x-4)'],
      correctIndex: 0,
      solution: { steps: ['Find two numbers that multiply to 12 and add to -7.', '-3 and -4: (-3)*(-4)=12, (-3)+(-4)=-7.', 'x^2-7x+12 = (x-3)(x-4).'] }
    },
    {
      question: 'Factor: 2x^2 + 5x - 3',
      type: 'mc',
      options: ['(2x-1)(x+3)', '(2x+1)(x-3)', '(2x+3)(x-1)', '(2x-3)(x+1)'],
      correctIndex: 0,
      solution: { steps: ['Find two numbers that multiply to 2*(-3)=-6 and add to 5.', '6 and -1: 6*(-1)=-6, 6+(-1)=5.', 'Rewrite: 2x^2+6x-x-3 = 2x(x+3)-1(x+3) = (2x-1)(x+3).'] }
    },
    {
      question: 'Factor completely: 3x^3 - 12x',
      type: 'mc',
      options: ['3x(x+2)(x-2)', '3x(x^2-4)', 'x(3x^2-12)', '3(x^3-4x)'],
      correctIndex: 0,
      solution: { steps: ['GCF: 3x. Factor out: 3x(x^2-4).', 'x^2-4 is a difference of squares: (x+2)(x-2).', 'Fully factored: 3x(x+2)(x-2).'] }
    }
    ],
  freeResponse: [
    { difficulty: 'easy', question: 'Factor: $x^2 - 49 =$?', accept: ['(x+7)(x-7)', '(x-7)(x+7)'], placeholder: 'e.g. (x+7)(x-7)', explanation: '$x^2 - 7^2 = (x+7)(x-7)$.' },
    { difficulty: 'medium', question: 'Factor: $x^2 + 7x + 12 =$?', accept: ['(x+3)(x+4)', '(x+4)(x+3)'], placeholder: 'e.g. (x+3)(x+4)', hint: '<p>Find $p+q=7$ and $pq=12$.</p>', explanation: '$3+4=7$ and $3 \\times 4=12$. $(x+3)(x+4)$.' },
    { difficulty: 'hard', question: 'What is the GCF of $12x^3y^2$ and $18x^2y^4$?', accept: ['6x^2y^2', '6x2y2'], placeholder: 'e.g. 6x^2y^2', explanation: '$\\gcd(12,18)=6$, $\\min(3,2)=2$ for $x$, $\\min(2,4)=2$ for $y$. GCF = $6x^2y^2$.' },
    { difficulty: 'easy', question: 'Factor: $x^2 - 9 =$?', accept: ['(x-3)(x+3)', '(x+3)(x-3)'], placeholder: 'Factored form', explanation: 'Difference of squares: $a^2 - b^2 = (a-b)(a+b)$.' },
    { difficulty: 'medium', question: 'Factor: $x^2 + 5x + 6 =$?', accept: ['(x+2)(x+3)', '(x+3)(x+2)'], placeholder: 'Factored form', explanation: 'Find two numbers that multiply to 6 and add to 5: 2 and 3.' },
    { difficulty: 'hard', question: 'Factor completely: $x^3 - x^2 - 6x =$?', accept: ['x(x-3)(x+2)', 'x(x+2)(x-3)'], placeholder: 'Factored', explanation: '$x(x^2 - x - 6) = x(x-3)(x+2)$.' },
    { difficulty: 'hard', question: 'Factor: $x^3 + 8 =$?', accept: ['(x+2)(x^2-2x+4)'], placeholder: 'Factored', explanation: 'Sum of cubes: $a^3 + b^3 = (a+b)(a^2 - ab + b^2)$.' },
    { difficulty: 'medium', question: 'GCF of $6x^3 + 12x^2 - 18x$:', accept: ['6x'], placeholder: 'Expression', explanation: '$6x(x^2 + 2x - 3)$. GCF is $6x$.' },
    { difficulty: 'easy', question: 'Factor: $x^2 - 9 =$?', accept: ['(x-3)(x+3)', '(x+3)(x-3)'], placeholder: 'Factored', explanation: 'Difference of squares: $a^2 - b^2 = (a-b)(a+b)$.' },
    { difficulty: 'medium', question: 'Factor: $x^2 + 5x + 6 =$?', accept: ['(x+2)(x+3)', '(x+3)(x+2)'], placeholder: 'Factored', explanation: 'Find two numbers that multiply to 6 and add to 5: 2 and 3.' },
    { difficulty: 'easy', question: 'Factor out GCF: $10x + 15 =$?', accept: ['5(2x+3)', '5(2x + 3)'], placeholder: 'Factored', explanation: 'GCF = 5. $5(2x + 3)$.' },
    { difficulty: 'medium', question: 'Factor: $x^2 - x - 12 =$?', accept: ['(x-4)(x+3)', '(x+3)(x-4)'], placeholder: 'Factored', explanation: 'Numbers: $-4 \\times 3 = -12$, $-4 + 3 = -1$.' },
    { difficulty: 'hard', question: 'Factor: $x^4 - 16 =$?', accept: ['(x^2-4)(x^2+4)', '(x-2)(x+2)(x^2+4)'], placeholder: 'Factored', explanation: 'Difference of squares twice: $(x^2-4)(x^2+4) = (x-2)(x+2)(x^2+4)$.' },
    { difficulty: 'medium', question: 'Factor using grouping: $x^3 + 2x^2 + 3x + 6 =$?', accept: ['(x^2+3)(x+2)', '(x+2)(x^2+3)'], placeholder: 'Factored', explanation: '$x^2(x+2) + 3(x+2) = (x^2+3)(x+2)$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Factor $6x^2 + 11x + 3$ using the AC method.', steps: [
      { content: '$a \\cdot c = 6 \\cdot 3 = 18$. Find factors of 18 that sum to 11: $2$ and $9$.' },
      { content: 'Rewrite: $6x^2 + 2x + 9x + 3$.' },
      { content: 'Group: $(6x^2 + 2x) + (9x + 3)$.' },
      { content: 'Factor each group: $2x(3x + 1) + 3(3x + 1)$.' },
      { content: 'Factor out $(3x+1)$: $(3x+1)(2x+3)$.' },
    { difficulty: 'hard', question: 'Factor $2x^2 + 7x + 3$ by the AC method.', steps: [
      { content: '$a \\cdot c = 2 \\cdot 3 = 6$. Find two numbers that multiply to 6 and add to 7.' },
      { content: 'Numbers: 6 and 1. Rewrite: $2x^2 + 6x + x + 3$.' },
      { content: 'Group: $2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3)$.' }
    ], explanation: 'AC method: split the middle term using factors of $ac$ that sum to $b$.' }
    ], explanation: 'The AC method converts $ax^2 + bx + c$ factoring into grouping.' }
  ],
  matching: [
    { difficulty: 'medium', instruction: 'Match each pattern to its factored form:', pairs: [
      { left: '$a^2 - b^2$', right: '$(a+b)(a-b)$' },
      { left: '$a^2 + 2ab + b^2$', right: '$(a+b)^2$' },
      { left: '$a^3 + b^3$', right: '$(a+b)(a^2-ab+b^2)$' },
      { left: '$a^3 - b^3$', right: '$(a-b)(a^2+ab+b^2)$' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Factoring strategy:', expression: 'Always factor out the {{0}} first.', blanks: [ { accept: ['GCF', 'gcf', 'greatest common factor'], size: 5 } ], explanation: 'GCF extraction is step 1 of every factoring problem.' },
    { difficulty: 'medium', context: 'Trinomial factoring:', expression: 'For $x^2 + bx + c$, find $p, q$ with $p + q =$ {{0}} and $pq =$ {{1}}.', blanks: [ { accept: ['b'], size: 3 }, { accept: ['c'], size: 3 } ], explanation: '$(x+p)(x+q) = x^2 + (p+q)x + pq$.' },
    { difficulty: 'easy', context: 'Factoring patterns:', expression: '$a^2 - b^2 = (a - b)(a +$ {{0}} $)$', blanks: [ { accept: ['b'], size: 3 } ], explanation: 'Difference of squares: $a^2 - b^2 = (a-b)(a+b)$.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Factor completely: $3x^3 - 12x$.', parts: [
      { question: 'GCF:', accept: ['3x'], placeholder: 'Common factor', explanation: '$\\gcd(3,12) = 3$, min exponent of $x$ is 1: $3x$.' },
      { question: 'After GCF: $3x($?$)$:', accept: ['x^2-4', 'x^2 - 4'], placeholder: 'Remaining', explanation: '$3x^3/3x = x^2$, $12x/3x = 4$.' },
      { question: 'Factor $x^2-4$:', accept: ['(x+2)(x-2)'], placeholder: 'Factored form', explanation: 'Difference of squares.' },
      { question: 'Final answer:', accept: ['3x(x+2)(x-2)'], placeholder: 'Complete factorization', explanation: '$3x(x+2)(x-2)$.' },
    { difficulty: 'hard', question: 'Factor $6x^2 + x - 2$ by grouping.', parts: [
      { question: '$ac = 6(-2) =$?', accept: [-12, '-12'], placeholder: 'Number', explanation: '$ac = -12$.' },
      { question: 'Two numbers multiply to $-12$ and add to $1$: ?', accept: ['4, -3', '-3, 4', '4,-3'], placeholder: 'Numbers', explanation: '$4 \\times (-3) = -12$, $4 + (-3) = 1$.' },
      { question: 'Result: $(2x - 1)(3x + 2)$.', accept: ['(2x-1)(3x+2)', 'yes'], placeholder: 'Confirm', explanation: '$6x^2 + 4x - 3x - 2 = 2x(3x+2) - 1(3x+2)$.' }
    ], completionMessage: 'AC method: multiply $a \\cdot c$, find pair summing to $b$, group.' }
    ], completionMessage: 'Factor step by step: GCF first, then recognize special patterns.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Factoring Strategy</h4>
    <ol><li><strong>Always GCF first.</strong></li>
    <li><strong>2 terms:</strong> Difference of squares or cubes?</li>
    <li><strong>3 terms:</strong> Find two numbers that multiply to $ac$ and add to $b$.</li>
    <li><strong>Verify</strong> by multiplying back.</li></ol></div>` }
},

/* TOPIC 3.3: Quadratic Equations */
{
  id: 'quadratic-equations',
  title: 'Quadratic Equations & the Quadratic Formula',
  description: 'Equations of the form $ax^2 + bx + c = 0$. These arise in physics, geometry, optimization, and virtually every applied field.',
  prereqRecap: [
    { term: 'Polynomial', definition: 'Sum of terms with non-negative integer exponents (Topic 3.1).' },
    { term: 'Factoring', definition: 'Writing a polynomial as a product of simpler expressions (Topic 3.2).' },
    { term: 'Zero Product Property', definition: 'If $ab = 0$, then $a = 0$ or $b = 0$ (Topic 3.2).' },
    { term: 'Square Root', definition: '$\\sqrt{a}$ is the non-negative number $b$ such that $b^2 = a$. $\\sqrt{9} = 3$. $\\sqrt{2} \\approx 1.414$.' }
  ],
  whyExists: { html: `
    <p><strong>Why quadratics?</strong> Any phenomenon involving area, projectile motion, or any rate that itself changes gives rise to quadratic equations. A ball thrown upward follows $h(t) = -16t^2 + v_0 t + h_0$. Finding when it hits the ground means solving $h(t) = 0$: a quadratic equation.</p>
    ${WHY('Why three methods?', '<p>Factoring is fast when possible but not always applicable. Completing the square works always and reveals the vertex form. The quadratic formula is a direct application of completing the square and works for ANY quadratic. Each method has its use case.</p>')}
  ` },
  graphExplorer: [
      { latex: 'y = x^2' },
      { latex: 'y = -x^2 + 4' },
      { latex: 'y = (x-2)^2 - 1' }
    ],
    concept: { html: `
    <div class="callout callout-key"><h4>Method 1: Factoring + Zero Product Property</h4>
    <p>$x^2 + 5x + 6 = 0 \\Rightarrow (x+2)(x+3) = 0 \\Rightarrow x = -2$ or $x = -3$.</p>
    <p>Works when factors are easy to find. Fastest method when applicable.</p></div>
    <div class="callout callout-key"><h4>Method 2: Completing the Square</h4>
    <p>$x^2 + bx = c \\Rightarrow x^2 + bx + (\\frac{b}{2})^2 = c + (\\frac{b}{2})^2 \\Rightarrow (x + \\frac{b}{2})^2 = c + \\frac{b^2}{4}$</p>
    <p>This converts to <strong>vertex form</strong>: $a(x-h)^2 + k = 0$ where $(h, k)$ is the vertex of the parabola.</p>
    ${WHY('Why add $(b/2)^2$?', '<p>We want the left side to be a perfect square. $(x + k)^2 = x^2 + 2kx + k^2$. Comparing with $x^2 + bx$: $2k = b$, so $k = b/2$ and $k^2 = (b/2)^2$. Adding this to both sides creates the perfect square.</p>')}</div>
    <div class="callout callout-key"><h4>Method 3: The Quadratic Formula</h4>
    <p>For $ax^2 + bx + c = 0$ with $a \\neq 0$:</p>
    <p>$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$</p>
    ${WHY('Where does this formula come from?', '<p>Complete the square on $ax^2 + bx + c = 0$. Divide by $a$: $x^2 + \\frac{b}{a}x = -\\frac{c}{a}$. Add $(\\frac{b}{2a})^2$: $(x + \\frac{b}{2a})^2 = \\frac{b^2 - 4ac}{4a^2}$. Take square root: $x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2-4ac}}{2a}$. Solve for $x$.</p>')}</div>
    <div class="callout callout-key"><h4>The Discriminant $\\Delta = b^2 - 4ac$</h4>
    <ul>
      <li>$\\Delta \\gt 0$: Two distinct real solutions. If $\\Delta$ is a perfect square, solutions are rational.</li>
      <li>$\\Delta = 0$: One repeated real solution ($x = -b/2a$).</li>
      <li>$\\Delta \\lt 0$: No real solutions. Two complex conjugate solutions: $x = \\frac{-b \\pm i\\sqrt{|\\Delta|}}{2a}$.</li>
    </ul></div>
    <div class="callout callout-key"><h4>Vieta\'s Formulas (Sum & Product of Roots)</h4>
    <p>If $x_1, x_2$ are roots of $ax^2 + bx + c = 0$, then:</p>
    <ul>
      <li>$x_1 + x_2 = -\\frac{b}{a}$ (sum of roots)</li>
      <li>$x_1 \\cdot x_2 = \\frac{c}{a}$ (product of roots)</li>
    </ul>
    ${WHY('Why does this work?', '<p>$ax^2 + bx + c = a(x - x_1)(x - x_2) = a[x^2 - (x_1+x_2)x + x_1 x_2]$. Comparing coefficients: $b = -a(x_1+x_2)$ and $c = a(x_1 x_2)$. Solving gives the formulas.</p>')}</div>
    <div class="callout callout-key"><h4>Vertex Form</h4>
    <p>$y = a(x - h)^2 + k$ where vertex = $(h, k)$.</p>
    <p>$h = -\\frac{b}{2a}$ (axis of symmetry), $k = f(h)$ (minimum if $a \\gt 0$, maximum if $a \\lt 0$).</p></div>
  ` },
  definition: { html: `<p><strong>Quadratic Equation:</strong> $ax^2 + bx + c = 0$ where $a \\neq 0$.</p><p><strong>Discriminant:</strong> $\\Delta = b^2 - 4ac$. Determines the nature and number of solutions.</p>` },
  examples: [{
    title: 'Solving by Multiple Methods',
    problem: 'Solve: $2x^2 - 7x + 3 = 0$',
    steps: [
      { title: 'Try Factoring', content: 'Find $pq = 2 \\times 3 = 6$ and $p + q = -7$: $p = -1, q = -6$. Rewrite: $2x^2 - x - 6x + 3 = x(2x-1) - 3(2x-1) = (2x-1)(x-3) = 0$.', why: 'The AC method: multiply $a \\cdot c = 6$, find factors of 6 summing to $-7$.' },
      { title: 'Apply Zero Product Property', content: '$2x - 1 = 0 \\Rightarrow x = \\frac{1}{2}$, or $x - 3 = 0 \\Rightarrow x = 3$.', why: 'If a product is 0, at least one factor must be 0.' },
      { title: 'Verify with Quadratic Formula', content: '$x = \\frac{7 \\pm \\sqrt{49 - 24}}{4} = \\frac{7 \\pm 5}{4}$. So $x = 3$ or $x = \\frac{1}{2}$ ✓.', why: '$a=2, b=-7, c=3$. $\\Delta = 49-24 = 25 \\gt 0$: two distinct real solutions.' }
    ]
  }],
  flashCards: [
      { type: 'how', front: 'When to complete the square vs use quadratic formula?', back: 'Complete the square: when leading coefficient is 1 and b is even. Quadratic formula: works for ALL quadratics. Factoring: when roots are rational.' },
      { type: 'why', front: 'Why does the vertex form reveal the maximum/minimum?', back: 'y = a(x-h)^2 + k. The squared term is always >= 0. When x=h, the squared term is 0, giving y=k. This is the smallest (if a>0) or largest (if a<0) value.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'Solve by factoring: $x^2 - 9 = 0$', options: ['$x = 9$', '$x = 3$ only', '$x = 3$ or $x = -3$', '$x = \\pm 9$'], correctIndex: 2, hint: '<p>Factor as a difference of squares.</p>', correctExplanation: '$x^2 - 9 = (x+3)(x-3) = 0$. So $x = 3$ or $x = -3$.', wrongExplanations: { 0: '$x^2 = 9$ does not mean $x = 9$. Take the square root: $x = \\pm 3$.', 1: 'You forgot the negative root. $(-3)^2 = 9$ also works.', 3: '$x^2 = 9 \\Rightarrow x = \\pm \\sqrt{9} = \\pm 3$, not $\\pm 9$.' } },
    { difficulty: 'easy', question: 'The discriminant of $x^2 + 4x + 4 = 0$ is:', options: ['$-12$', '$0$', '$32$', '$8$'], correctIndex: 1, hint: '<p>$\\Delta = b^2 - 4ac$.</p>', correctExplanation: '$\\Delta = 4^2 - 4(1)(4) = 16 - 16 = 0$. One repeated solution: $x = -2$.', wrongExplanations: { 0: '$4^2 = 16$ and $4 \\cdot 1 \\cdot 4 = 16$. $16 - 16 = 0$, not $-12$.', 2: 'Check: $b^2 = 16$, $4ac = 16$. $16 - 16 = 0$.', 3: '$\\Delta = b^2 - 4ac$, not $b^2 - 2ac$.' } },
    { difficulty: 'medium', question: 'Use the quadratic formula to solve $x^2 - 6x + 5 = 0$:', options: ['$x = 1, 5$', '$x = -1, -5$', '$x = 2, 3$', '$x = 1, 6$'], correctIndex: 0, hint: '<p>$a=1, b=-6, c=5$.</p>', correctExplanation: '$x = \\frac{6 \\pm \\sqrt{36-20}}{2} = \\frac{6 \\pm 4}{2}$. $x = 5$ or $x = 1$.', wrongExplanations: { 1: '$b = -6$, so $-b = 6$ (positive). Solutions are positive.', 2: 'Check: $\\sqrt{16} = 4$, not $\\sqrt{36-20} = ?$. $\\frac{6+4}{2} = 5$ and $\\frac{6-4}{2} = 1$.', 3: '$\\frac{6+4}{2} = 5$, not 6.' } },
    { difficulty: 'medium', question: 'Complete the square: $x^2 + 8x + \\text{?} = (x + \\text{?})^2$', options: ['$16, 4$', '$64, 8$', '$4, 2$', '$8, 4$'], correctIndex: 0, hint: '<p>$(\\frac{b}{2})^2 = (\\frac{8}{2})^2$.</p>', correctExplanation: '$(\\frac{8}{2})^2 = 16$. $(x+4)^2 = x^2 + 8x + 16$ ✓.', wrongExplanations: { 1: '$(8)^2 = 64$. You should halve the coefficient first: $(8/2)^2 = 16$.', 2: '$(2)^2 = 4$ but $(x+2)^2 = x^2 + 4x + 4 \\neq x^2 + 8x + ?$.', 3: 'The constant is $(b/2)^2 = 16$, and the number inside the parentheses is $b/2 = 4$.' } },
    { difficulty: 'hard', question: 'How many real solutions does $3x^2 + 2x + 5 = 0$ have?', options: ['2', '1', '0', 'Infinitely many'], correctIndex: 2, hint: '<p>Compute the discriminant.</p>', correctExplanation: '$\\Delta = 4 - 60 = -56 \\lt 0$. Negative discriminant means NO real solutions (two complex solutions exist).', wrongExplanations: { 0: '$\\Delta \\lt 0$ means the parabola does not cross the x-axis. No real roots.', 1: '$\\Delta = 0$ gives one repeated root. Here $\\Delta = -56 \\neq 0$.', 3: 'A quadratic has at most 2 solutions, never infinitely many.' } },
    { difficulty: 'hard', question: 'Solve: $x^2 + 2x - 1 = 0$ (exact answer)', options: ['$x = -1 \\pm \\sqrt{2}$', '$x = 1 \\pm \\sqrt{2}$', '$x = -2 \\pm \\sqrt{2}$', '$x = \\pm \\sqrt{3}$'], correctIndex: 0, hint: '<p>Complete the square or use the quadratic formula.</p>', correctExplanation: '$x = \\frac{-2 \\pm \\sqrt{4+4}}{2} = \\frac{-2 \\pm 2\\sqrt{2}}{2} = -1 \\pm \\sqrt{2}$.', wrongExplanations: { 1: '$-b = -2$, so the "$-1$" comes from $\\frac{-2}{2} = -1$, not $+1$.', 2: '$\\frac{-2}{2} = -1$, not $-2$.', 3: '$\\Delta = 4 + 4 = 8$, and $\\sqrt{8} = 2\\sqrt{2}$. Dividing by 2 gives $\\sqrt{2}$, not $\\sqrt{3}$.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'Solve: $x^2 = 36$. Both solutions? Write as "a, b":', accept: ['6, -6', '-6, 6', '6,-6', '-6,6'], placeholder: 'e.g. 6, -6', explanation: '$x = \\pm 6$.' },
    { difficulty: 'medium', question: 'What is the discriminant of $2x^2 + 3x - 5 = 0$?', accept: [49, '49'], placeholder: 'Enter a number', explanation: '$\\Delta = 9 - 4(2)(-5) = 9 + 40 = 49$.' },
    { difficulty: 'hard', question: 'Solve $x^2 - 4x - 5 = 0$ by factoring. Solutions? Write as "a, b":', accept: ['5, -1', '-1, 5', '5,-1', '-1,5'], placeholder: 'e.g. 5, -1', explanation: '$(x-5)(x+1) = 0$. $x = 5$ or $x = -1$.' },
    { difficulty: 'easy', question: 'Simplify: $\\frac{x^2}{x} =$?', accept: ['x'], placeholder: 'Expression', explanation: '$x^{2-1} = x$.' },
    { difficulty: 'medium', question: 'What value of $x$ makes $\\frac{5}{x-3}$ undefined?', accept: [3, '3'], placeholder: 'Number', explanation: 'Denominator = 0 when $x = 3$. Division by zero is undefined.' },
    { difficulty: 'hard', question: 'Solve: $\\frac{2}{x} + \\frac{3}{x+1} = 1$. $x =$?', accept: ['2, -1', '2,-1'], placeholder: 'Solutions', explanation: 'Multiply by $x(x+1)$: $2(x+1) + 3x = x(x+1)$. $5x + 2 = x^2 + x$. $x^2 - 4x - 2 = 0$... Actually: $2x+2+3x = x^2+x$, $5x+2=x^2+x$, $x^2-4x-2=0$...' },
    { difficulty: 'medium', question: 'Simplify: $\\frac{x^2 - 1}{x + 1} =$?', accept: ['x-1', 'x - 1'], placeholder: 'Simplified', explanation: '$\\frac{(x-1)(x+1)}{x+1} = x - 1$ (for $x \\neq -1$).' },
    { difficulty: 'easy', question: 'A rational expression is undefined when the denominator equals:', accept: [0, '0', 'zero'], placeholder: 'Value', explanation: 'Division by zero is undefined.' },
    { difficulty: 'hard', question: 'Find vertical asymptote: $f(x) = \\frac{1}{x+2}$:', accept: ['x = -2', 'x=-2', '-2'], placeholder: 'x = ?', explanation: 'Set denominator = 0: $x + 2 = 0$, $x = -2$.' },
    { difficulty: 'easy', question: 'Simplify: $\\frac{6x}{3} =$?', accept: ['2x'], placeholder: 'Expression', explanation: '$6x / 3 = 2x$.' },
    { difficulty: 'hard', question: 'Solve: $\\frac{x}{x-1} = \\frac{2}{x-1}$. $x =$?', accept: [2, '2'], placeholder: 'Number', explanation: 'Multiply both sides by $(x-1)$: $x = 2$. Check: $x \\neq 1$. Valid.' },
    { difficulty: 'medium', question: 'Horizontal asymptote of $\\frac{3x}{x + 1}$:', accept: ['y=3', 'y = 3', '3'], placeholder: 'Equation', explanation: 'Same degree: ratio = $3/1 = 3$. HA: $y = 3$.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'A ball is thrown upward: $h(t) = -16t^2 + 48t + 5$.', parts: [
      { question: 'What is the initial height (at $t=0$)?', accept: [5], placeholder: 'feet', explanation: '$h(0) = 5$.' },
      { question: 'When does it reach max height? ($t$ = ? seconds)', accept: [1.5, '1.5', '3/2'], placeholder: 'seconds', explanation: '$t = -b/(2a) = -48/(2 \\cdot -16) = 1.5$.' },
      { question: 'What is the maximum height?', accept: [41], placeholder: 'feet', explanation: '$h(1.5) = -36 + 72 + 5 = 41$.' }
    ], completionMessage: 'Quadratics model projectile motion.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Solve $x^2 + 6x - 7 = 0$ by completing the square.', steps: [
      { content: 'Move constant: $x^2 + 6x = 7$.' },
      { content: 'Half of 6 is 3; $3^2 = 9$.' },
      { content: 'Add 9 to both sides: $x^2 + 6x + 9 = 16$.' },
      { content: '$(x+3)^2 = 16$.' },
      { content: '$x + 3 = \\pm 4$.' },
      { content: '$x = 1$ or $x = -7$.' }
    ], explanation: 'Completing the square: add $(b/2)^2$ to both sides.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match discriminant value to number of real solutions:', pairs: [
      { left: '$\\Delta \\gt 0$', right: 'Two distinct real solutions' },
      { left: '$\\Delta = 0$', right: 'One repeated real solution' },
      { left: '$\\Delta \\lt 0$', right: 'No real solutions' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Quadratic formula:', expression: '$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{$ {{0}} $}$', blanks: [ { accept: ['2a'], size: 4 } ], explanation: 'Denominator is $2a$.' },
    { difficulty: 'medium', context: 'Completing the square:', expression: 'To complete $x^2 + bx$, add $(${{0}}$)^2$ to both sides.', blanks: [ { accept: ['b/2'], size: 5 } ], explanation: 'Half the linear coefficient, then square it.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Quadratic Strategy</h4>
    <ol><li><strong>Try factoring first</strong> (fastest if it works).</li>
    <li><strong>Quadratic formula</strong> always works: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$.</li>
    <li><strong>Check discriminant</strong> first if you only need the NUMBER of solutions.</li>
    <li><strong>Completing the square</strong> is useful for deriving vertex form: $a(x-h)^2 + k$.</li></ol></div>` }
},

/* TOPIC 3.4: Rational Expressions */
{
  id: 'rational-expressions',
  title: 'Rational Expressions & Equations',
  description: 'Fractions with polynomials in numerator and denominator. Simplifying, adding/subtracting, and solving rational equations.',
  prereqRecap: [
    { term: 'Fraction', definition: '$\\frac{a}{b}$ where $b \\neq 0$. The top is the numerator, the bottom is the denominator.' },
    { term: 'Factoring', definition: 'Writing a polynomial as a product of simpler expressions (Topic 3.2).' },
    { term: 'LCD', definition: 'Least Common Denominator: the smallest expression that all denominators divide into.' },
    { term: 'Domain', definition: 'The set of all input values for which an expression is defined. A rational expression is undefined where the denominator equals zero.' }
  ],
  whyExists: { html: `
    <p><strong>Why rational expressions?</strong> Ratios of quantities arise naturally: rates (distance/time), proportions (scale factors), probabilities (favorable/total). Rational expressions generalize numerical fractions to algebraic fractions.</p>
    ${WHY('Why can we cancel common factors?', '<p>$\\frac{ac}{bc} = \\frac{a}{b} \\cdot \\frac{c}{c} = \\frac{a}{b} \\cdot 1 = \\frac{a}{b}$. We are dividing numerator and denominator by the same nonzero quantity $c$, which is valid because $\\frac{c}{c} = 1$ (multiplicative identity).</p>')}
  ` },
  concept: { html: `
    <div class="callout callout-key"><h4>Simplifying Rational Expressions</h4>
    <ol>
      <li>Factor numerator and denominator completely.</li>
      <li>Cancel common factors (not common TERMS).</li>
      <li>State restrictions: values that make any original denominator zero.</li>
    </ol>
    ${WHY('Why can we cancel factors but not terms?', '<p>$\\frac{2 \\cdot 3}{2 \\cdot 5} = \\frac{3}{5}$ ✓ (cancel factor 2). But $\\frac{2 + 3}{2 + 5} = \\frac{5}{7} \\neq \\frac{3}{5}$ �:. Cancellation requires MULTIPLICATION, not addition. Formally: $\\frac{ac}{bc} = \\frac{a}{b}$ but $\\frac{a+c}{b+c} \\neq \\frac{a}{b}$ in general.</p>')}</div>
    <div class="callout callout-key"><h4>Operations with Rational Expressions</h4>
    <ul>
      <li><strong>Multiplication:</strong> $\\frac{A}{B} \\cdot \\frac{C}{D} = \\frac{AC}{BD}$ (multiply across, then simplify).</li>
      <li><strong>Division:</strong> $\\frac{A}{B} \\div \\frac{C}{D} = \\frac{A}{B} \\cdot \\frac{D}{C}$ (multiply by the reciprocal).</li>
      <li><strong>Addition/Subtraction:</strong> Find the LCD, convert each fraction, then add/subtract numerators.</li>
    </ul></div>
  ` },
  definition: { html: `<p><strong>Rational Expression:</strong> $\\frac{P(x)}{Q(x)}$ where $P$ and $Q$ are polynomials and $Q(x) \\neq 0$.</p><p><strong>Extraneous Solution:</strong> A value that satisfies the transformed equation but makes an original denominator zero. Always check solutions in the original equation.</p>` },
  examples: [{
    title: 'Simplify and Add',
    problem: 'Simplify $\\frac{x^2-4}{x^2+4x+4}$, then compute $\\frac{1}{x+1} + \\frac{2}{x-1}$.',
    steps: [
      { title: 'Factor', content: '$\\frac{(x+2)(x-2)}{(x+2)^2} = \\frac{x-2}{x+2}$ ($x \\neq -2$).', why: 'Cancel the common factor $(x+2)$. State restriction: $x \\neq -2$.' },
      { title: 'Find LCD for the addition', content: 'LCD = $(x+1)(x-1)$.', why: 'The denominators $x+1$ and $x-1$ share no common factors.' },
      { title: 'Convert and add', content: '$\\frac{x-1}{(x+1)(x-1)} + \\frac{2(x+1)}{(x+1)(x-1)} = \\frac{x-1+2x+2}{(x+1)(x-1)} = \\frac{3x+1}{x^2-1}$.', why: 'Multiply each fraction by the factor its denominator is missing, then add numerators.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a rational expression?', back: 'A fraction where numerator and/or denominator are polynomials: P(x)/Q(x). Example: (x^2+1)/(x-3). Undefined wherever Q(x)=0.' },
      { type: 'why', front: 'Why eliminate fractions when solving rational equations?', back: 'Multiply both sides by the LCD to clear all denominators. This converts a rational equation into a polynomial equation, which is easier to solve. Always check for extraneous solutions.' },
      { type: 'how', front: 'How to add rational expressions?', back: 'Same as adding fractions: find LCD, rewrite each fraction with LCD, add numerators. Then simplify if possible.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'Simplify: $\\frac{3x}{6x^2}$', options: ['$\\frac{1}{2x}$', '$\\frac{x}{2}$', '$\\frac{1}{2}$', '$2x$'], correctIndex: 0, hint: '<p>Cancel common factors from numerator and denominator.</p>', correctExplanation: '$\\frac{3x}{6x^2} = \\frac{3x}{6x \\cdot x} = \\frac{1}{2x}$ ($x \\neq 0$).', wrongExplanations: { 1: 'You have $x$ in the numerator and $x^2$ in the denominator: one $x$ remains in the denominator.', 2: 'An $x$ remains in the denominator: $\\frac{3}{6} \\cdot \\frac{1}{x} = \\frac{1}{2x}$.', 3: 'Inverted: the $x$ is in the denominator, not numerator.' } },
    { difficulty: 'easy', question: 'For which value is $\\frac{5}{x-3}$ undefined?', options: ['$x = 0$', '$x = 5$', '$x = 3$', '$x = -3$'], correctIndex: 2, hint: '<p>A fraction is undefined when its denominator equals zero.</p>', correctExplanation: '$x - 3 = 0 \\Rightarrow x = 3$. The expression is undefined at $x = 3$.', wrongExplanations: { 0: '$x = 0$: $\\frac{5}{0-3} = \\frac{5}{-3}$, which is defined.', 1: '$x = 5$: $\\frac{5}{2}$, which is defined.', 3: '$x = -3$: $\\frac{5}{-6}$, which is defined.' } },
    { difficulty: 'medium', question: 'Simplify: $\\frac{x^2-1}{x+1}$', options: ['$x - 1$', '$x + 1$', '$x^2 - x$', '$1$'], correctIndex: 0, hint: '<p>Factor the numerator as a difference of squares.</p>', correctExplanation: '$\\frac{(x+1)(x-1)}{x+1} = x - 1$ ($x \\neq -1$).', wrongExplanations: { 1: 'You canceled wrong. The remaining factor is $(x-1)$, not $(x+1)$.', 2: 'Factor first, then cancel. $x^2 - 1 = (x+1)(x-1)$.', 3: '$(x+1)(x-1) \\neq (x+1)$, so the result is not 1.' } },
    { difficulty: 'medium', question: '$\\frac{2}{x} + \\frac{3}{x} = $?', options: ['$\\frac{5}{x}$', '$\\frac{5}{2x}$', '$\\frac{6}{x^2}$', '$\\frac{5}{x^2}$'], correctIndex: 0, hint: '<p>Same denominator: just add numerators.</p>', correctExplanation: 'Same denominator $x$: $\\frac{2+3}{x} = \\frac{5}{x}$.', wrongExplanations: { 1: 'Do not change the denominator when it is already common.', 2: 'Add NUMERATORS, not multiply. Denominators stay the same.', 3: 'The denominator stays $x$, not $x^2$.' } },
    { difficulty: 'hard', question: 'Solve: $\\frac{1}{x} + \\frac{1}{x-2} = \\frac{5}{4}$', options: ['$x = 4, x = \\frac{2}{5}$', '$x = 4$ only', '$x = 2, x = 4$', '$x = 1$'], correctIndex: 0, hint: '<p>Multiply through by $4x(x-2)$ to clear denominators. Check for extraneous solutions.</p>', correctExplanation: 'LCD = $4x(x-2)$. Clearing: $4(x-2) + 4x = 5x(x-2)$. Expanding: $8x - 8 = 5x^2 - 10x$. Rearranging: $5x^2 - 18x + 8 = 0$. Factoring: $(5x-2)(x-4) = 0$. Solutions: $x = 2/5$ or $x = 4$. Neither makes a denominator zero: both valid.', wrongExplanations: { 1: '$x = 4$ is one solution but $x = 2/5$ also works (check: denominators nonzero).', 2: '$x = 2$ makes $\\frac{1}{x-2}$ undefined. It is extraneous.', 3: '$x = 1$: $\\frac{1}{1} + \\frac{1}{-1} = 0 \\neq \\frac{5}{4}$.' } },
    { difficulty: 'hard', question: 'Simplify: $\\frac{x^2 - 4x + 3}{x^2 - 1}$', options: ['$\\frac{x-3}{x+1}$', '$\\frac{x-3}{x-1}$', '$\\frac{x+3}{x+1}$', '$\\frac{x-1}{x+1}$'], correctIndex: 0, hint: '<p>Factor numerator and denominator.</p>', correctExplanation: 'Numerator: $x^2-4x+3 = (x-1)(x-3)$. Denominator: $x^2-1 = (x+1)(x-1)$. Cancel $(x-1)$: $\\frac{x-3}{x+1}$ ($x \\neq 1$).', wrongExplanations: { 1: 'The remaining denominator factor is $(x+1)$, not $(x-1)$.', 2: 'The numerator factors as $(x-1)(x-3)$, not $(x-1)(x+3)$.', 3: 'Factor carefully: numerator is $(x-1)(x-3)$, not just $(x-1)$.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'Simplify: $\\frac{6x^2}{3x} =$?', accept: ['2x'], placeholder: 'e.g. 2x', explanation: '$6x^2 / 3x = 2x$.' },
    { difficulty: 'medium', question: 'For what value of $x$ is $\\frac{x+1}{x-5}$ undefined?', accept: [5, '5'], placeholder: 'x = ?', explanation: '$x - 5 = 0 \\Rightarrow x = 5$.' },
    { difficulty: 'medium', question: '$\\frac{2}{x} + \\frac{3}{x} =$?', accept: ['5/x'], placeholder: 'e.g. 5/x', explanation: 'Same denominator: $\\frac{5}{x}$.' },
    { difficulty: 'hard', question: 'Simplify: $\\frac{x^2 - 9}{x + 3} =$?', accept: ['x-3', 'x - 3'], placeholder: 'Simplified', explanation: '$\\frac{(x+3)(x-3)}{x+3} = x - 3$.' },
    { difficulty: 'easy', question: '$\\sqrt{49} =$?', accept: [7, '7'], placeholder: 'Number', explanation: '$7^2 = 49$.' },
    { difficulty: 'medium', question: 'Simplify: $\\sqrt{50} =$?', accept: ['5sqrt(2)', '5\\sqrt{2}'], placeholder: 'Expression', explanation: '$\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$.' },
    { difficulty: 'medium', question: 'Rationalize: $\\frac{1}{\\sqrt{3}} =$?', accept: ['sqrt(3)/3', '\\sqrt{3}/3'], placeholder: 'Expression', explanation: '$\\frac{1}{\\sqrt{3}} \\cdot \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$.' },
    { difficulty: 'medium', question: '$\\sqrt{48} =$?', accept: ['4sqrt(3)', '4\\sqrt{3}'], placeholder: 'Simplified', explanation: '$\\sqrt{48} = \\sqrt{16 \\cdot 3} = 4\\sqrt{3}$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Add $\\frac{1}{x+1} + \\frac{2}{x-1}$ step by step.', steps: [
      { content: 'LCD = $(x+1)(x-1)$.' },
      { content: '$\\frac{1 \\cdot (x-1)}{(x+1)(x-1)} + \\frac{2 \\cdot (x+1)}{(x+1)(x-1)}$.' },
      { content: 'Numerator: $(x-1) + 2(x+1) = x - 1 + 2x + 2 = 3x + 1$.' },
      { content: 'Result: $\\frac{3x+1}{(x+1)(x-1)} = \\frac{3x+1}{x^2-1}$.' }
    ], explanation: 'Find LCD, convert each fraction, add numerators.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each rational expression operation:', pairs: [
      { left: '$\\frac{A}{B} \\cdot \\frac{C}{D}$', right: '$\\frac{AC}{BD}$' },
      { left: '$\\frac{A}{B} \\div \\frac{C}{D}$', right: '$\\frac{A}{B} \\cdot \\frac{D}{C}$' },
      { left: '$\\frac{A}{B} + \\frac{C}{B}$', right: '$\\frac{A+C}{B}$' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Simplification rule:', expression: 'Cancel common {{0}}, never common {{1}}.', blanks: [ { accept: ['factors'], size: 7 }, { accept: ['terms'], size: 6 } ], explanation: '$\\frac{ac}{bc} = \\frac{a}{b}$ but $\\frac{a+c}{b+c} \\neq \\frac{a}{b}$.' },
    { difficulty: 'medium', context: 'Extraneous solutions:', expression: 'After solving a rational equation, check that solutions do not make any {{0}} equal zero.', blanks: [ { accept: ['denominator', 'denominators'], size: 12 } ], explanation: 'Division by zero is undefined.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Solve $\\frac{x}{x-2} = \\frac{2}{x-2} + 1$.', parts: [
      { question: 'LCD is:', accept: ['x-2'], placeholder: 'Denominator', explanation: '$x - 2$ is the only denominator.' },
      { question: 'Multiply through by LCD: $x = 2 +$ ?', accept: ['x-2', '(x-2)'], placeholder: 'RHS after clearing', explanation: '$x = 2 + (x-2) = x$.' },
      { question: 'Simplified: $x = x$. Type of equation?', accept: ['identity'], placeholder: 'Type', explanation: 'True for all $x$ in the domain.' },
      { question: 'Solution? (all x except...)', accept: ['2', 'x=2', 'all except 2'], placeholder: 'Excluded value', explanation: 'All real $x$ except $x = 2$ (denominator zero).' }
    ], completionMessage: 'Identity after clearing fractions: solution is all $x$ in the domain.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Rational Expression Strategy</h4>
    <ol><li><strong>Factor</strong> everything first.</li>
    <li><strong>Cancel common FACTORS</strong> (never common terms).</li>
    <li><strong>To add/subtract:</strong> find LCD, convert, combine numerators.</li>
    <li><strong>To solve rational equations:</strong> multiply by LCD, solve, CHECK for extraneous solutions.</li></ol></div>` }
}

] // end topics array
}); // end module push
})();
