/* ============================================================
   MODULE 3: Advanced Algebra
   Polynomials, Quadratics, Exponents, Logarithms
   ============================================================ */

(function() {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];
  const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

  window.MATH_MODULES.push({
    id: 'algebra-advanced',
    order: 5,
    title: 'Advanced Algebra',
    description: 'Quadratic equations, exponentials, and logarithms. The equations that model growth, decay, and optimization. Requires: intermediate algebra (Module 4).',
    topics: [
      /* ============ TOPIC 1: Polynomials & Factoring ============ */
      {
        id: 'polynomials-factoring',
        title: 'Polynomials and Factoring',
        description: 'Breaking polynomials into multiplicative pieces. Factoring is to algebra what prime factorization is to arithmetic.',

        prereqRecap: [
          { term: 'Multiplication', definition: '$3 \\times 4 = 12$. Multiplication combines quantities. Factoring reverses this: $12 = 3 \\times 4$.' },
          { term: 'Distributive Property', definition: '$a(b + c) = ab + ac$. This axiom is WHY factoring works: we "un-distribute."' },
          { term: 'Variable', definition: 'A letter representing an unknown quantity. $x$, $y$, $n$ are common.' }
        ],
        whyExists: { html: `
          <p><strong>Why factor polynomials?</strong> Factoring transforms addition/subtraction into multiplication. Multiplication has a powerful property that addition lacks: <strong>the zero product property</strong>. If $ab = 0$, then $a = 0$ or $b = 0$. This property lets us solve equations.</p>
          <p><strong>Practical application:</strong> Every time an engineer calculates where a projectile hits the ground ($h(t) = 0$), they factor a polynomial. Revenue optimization, structural load analysis, and circuit design all reduce to finding polynomial roots.</p>
          ${WHY('Why does the distributive property make factoring possible?', '<p>The distributive axiom states $a(b + c) = ab + ac$. Factoring reads this equation <strong>right to left</strong>: if you see $ab + ac$, you can rewrite it as $a(b + c)$. Every factoring technique is a pattern-matched application of this single axiom. Without the distributive property, factoring would be impossible.</p>')}
          ${WHY('Why can\'t all polynomials be factored over the integers?', '<p>Consider $x^2 + 1$. For this to factor as $(x + a)(x + b)$, we need $ab = 1$ and $a + b = 0$. No pair of integers satisfies both conditions simultaneously. Over the <strong>complex numbers</strong>, it factors as $(x + i)(x - i)$. The algebraic closure of a number system determines what can be factored.</p>')}
        ` },

        hook: {
          html: `
            <div class="callout callout-puzzle">
              <h4>🧩 Puzzle: Area of a Garden</h4>
              <p>A rectangular garden has area $x^2 + 5x + 6$ square meters. What are the possible dimensions?</p>
              <p>If the area is length �: width, we need two expressions that multiply to give $x^2 + 5x + 6$. We need two numbers that <strong>multiply to 6</strong> and <strong>add to 5</strong>. Those are 2 and 3.</p>
              <p>So $x^2 + 5x + 6 = (x + 2)(x + 3)$. The garden is $(x+2)$ meters by $(x+3)$ meters.</p>
            </div>
          `
        },

        concept: {
          html: `
            <p>A <strong>polynomial</strong> of degree $n$ is $a_n x^n + a_{n-1}x^{n-1} + \\cdots + a_1 x + a_0$ where $a_n \\neq 0$.</p>
            <div class="callout callout-key">
              <h4>Factoring Strategy Hierarchy</h4>
              <ol>
                <li><strong>GCF first:</strong> Always extract the greatest common factor. $6x^2 + 9x = 3x(2x + 3)$.</li>
                <li><strong>Difference of squares:</strong> $a^2 - b^2 = (a-b)(a+b)$.</li>
                <li><strong>Perfect square trinomial:</strong> $a^2 \\pm 2ab + b^2 = (a \\pm b)^2$.</li>
                <li><strong>Trinomial $x^2 + bx + c$:</strong> Find two numbers that multiply to $c$ and add to $b$.</li>
                <li><strong>Trinomial $ax^2 + bx + c$ (a ≠ 1):</strong> AC method: find two numbers that multiply to $ac$ and add to $b$, then factor by grouping.</li>
                <li><strong>Sum/Difference of cubes:</strong> $a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)$.</li>
                <li><strong>Factor by grouping:</strong> Group terms in pairs and extract common factors from each pair.</li>
              </ol>
            </div>
          `
        },

        definition: {
          html: `
            <p><strong>Factor Theorem:</strong> $(x - r)$ is a factor of polynomial $P(x)$ if and only if $P(r) = 0$.</p>
            <p><strong>Remainder Theorem:</strong> When $P(x)$ is divided by $(x - r)$, the remainder is $P(r)$.</p>
            <div class="math-block">$$P(x) = (x - r) \\cdot Q(x) + P(r)$$</div>
            <p><strong>Fundamental Theorem of Algebra:</strong> Every polynomial of degree $n \\geq 1$ with complex coefficients has exactly $n$ roots (counted with multiplicity) in $\\mathbb{C}$.</p>
          `
        },

        examples: [
          {
            title: 'Factoring a Trinomial ($a \\neq 1$)',
            problem: 'Factor $6x^2 + 11x - 10$.',
            steps: [
              { title: 'Compute $ac$', content: '$a \\cdot c = 6 \\cdot (-10) = -60$', why: 'The AC method: find two numbers whose product is $ac$ and whose sum is $b$.' },
              { title: 'Find the pair', content: 'We need two numbers that multiply to $-60$ and add to $11$. Try: $15$ and $-4$. Check: $15 \\times (-4) = -60$ ✓ and $15 + (-4) = 11$ ✓.', why: 'Systematic search: start with factor pairs of 60 and assign signs to get the right sum.' },
              { title: 'Rewrite the middle term', content: '$6x^2 + 15x - 4x - 10$', why: 'Replace $11x$ with $15x - 4x$. The polynomial is unchanged; the middle term is split.' },
              { title: 'Factor by grouping', content: '$3x(2x + 5) - 2(2x + 5) = (3x - 2)(2x + 5)$', why: 'Group first two and last two terms. Extract the GCF from each group. The common binomial factor $(2x + 5)$ emerges.' },
              { title: 'Verify by expanding', content: '$(3x - 2)(2x + 5) = 6x^2 + 15x - 4x - 10 = 6x^2 + 11x - 10$ ✓', why: 'Always multiply back to confirm.' }
            ]
          }
        ],

        flashCards: [
      { type: 'how', front: 'How to factor a difference of squares?', back: 'a^2 - b^2 = (a+b)(a-b). Always. Example: x^2 - 9 = (x+3)(x-3). Works because the middle terms cancel: (a+b)(a-b) = a^2 - ab + ab - b^2 = a^2 - b^2.' },
      { type: 'why', front: 'Why can you factor a sum of cubes but not a sum of squares?', back: 'a^3 + b^3 = (a+b)(a^2-ab+b^2). But a^2+b^2 has no real factors: (a+bi)(a-bi) requires complex numbers. Sum of squares is irreducible over the reals.' },
      { type: 'how', front: 'How to factor by grouping?', back: 'Split into two pairs, factor each. Example: x^3+x^2+2x+2 = x^2(x+1)+2(x+1) = (x^2+2)(x+1). The common binomial factor emerges.' }
    ],
    exercises: [
          {
            difficulty: 'easy',
            question: 'Factor: $x^2 - 9$',
            options: ['$(x-3)^2$', '$(x-3)(x+3)$', '$(x-9)(x+1)$', 'Cannot be factored'],
            correctIndex: 1,
            hint: '<p>$a^2 - b^2 = (a-b)(a+b)$.</p>',
            correctExplanation: '$x^2 - 9 = (x-3)(x+3)$.',
            wrongExplanations: { 0: '$(x-3)^2 = x^2 - 6x + 9$.', 2: '$(x-9)(x+1) = x^2 - 8x - 9$.', 3: 'Difference of squares.' }
          },
          {
            difficulty: 'easy',
            question: 'GCF of $6x^2 + 9x$:',
            options: ['$3x$', '$3$', '$6x$', '$x$'],
            correctIndex: 0,
            hint: '<p>Find the largest factor common to both terms.</p>',
            correctExplanation: '$6x^2 + 9x = 3x(2x + 3)$. GCF = $3x$.',
            wrongExplanations: { 1: '$3$ divides coefficients but $x$ is also common.', 2: '$6x$ does not divide $9x$ evenly.', 3: '$x$ divides variables but $3$ is also common.' }
          },
          {
            difficulty: 'medium',
            question: 'Factor: $2x^2 + 7x + 3$',
            options: ['$(2x+1)(x+3)$', '$(2x+3)(x+1)$', '$(x+3)(2x-1)$', '$(2x-1)(x-3)$'],
            correctIndex: 0,
            hint: '<p>$ac = 6$. Find two numbers multiplying to 6 and adding to 7.</p>',
            correctExplanation: 'AC method: $6$ and $1$. Rewrite: $2x^2 + 6x + x + 3 = 2x(x+3) + 1(x+3) = (2x+1)(x+3)$.',
            wrongExplanations: { 1: '$(2x+3)(x+1) = 2x^2 + 5x + 3 \\neq 2x^2 + 7x + 3$.', 2: '$(x+3)(2x-1) = 2x^2 + 5x - 3$.', 3: '$(2x-1)(x-3) = 2x^2 - 7x + 3$.' }
          },
          {
            difficulty: 'hard',
            question: 'Factor: $x^3 - 8$',
            options: ['$(x-2)(x^2+2x+4)$', '$(x-2)^3$', '$(x-2)(x^2-4)$', '$(x-2)(x^2+4)$'],
            correctIndex: 0,
            hint: '<p>Difference of cubes: $a^3 - b^3 = (a-b)(a^2+ab+b^2)$.</p>',
            correctExplanation: '$x^3 - 2^3 = (x-2)(x^2 + 2x + 4)$.',
            wrongExplanations: { 1: '$(x-2)^3 = x^3 - 6x^2 + 12x - 8 \\neq x^3 - 8$.', 2: '$x^2-4$ factors further; the correct second factor is $x^2+2x+4$.', 3: 'Missing the $+2x$ middle term.' }
          }
        ],
        freeResponse: [
          { difficulty: 'easy', question: 'Factor $x^2 - 25$:', accept: ['(x-5)(x+5)', '(x+5)(x-5)'], placeholder: 'e.g. (x-a)(x+b)', explanation: 'Difference of squares: $(x-5)(x+5)$.' },
          { difficulty: 'easy', question: 'Factor out the GCF: $4x^3 + 8x^2$:', accept: ['4x^2(x+2)'], placeholder: 'e.g. ax(bx+c)', explanation: 'GCF = $4x^2$. $4x^2(x + 2)$.' },
          { difficulty: 'medium', question: 'Factor $x^2 + 5x + 6$:', accept: ['(x+2)(x+3)', '(x+3)(x+2)'], placeholder: 'e.g. (x+a)(x+b)', explanation: '$2 \\times 3 = 6$, $2 + 3 = 5$. $(x+2)(x+3)$.' },
          { difficulty: 'hard', question: 'Factor $x^3 + 27$:', accept: ['(x+3)(x^2-3x+9)'], placeholder: 'Sum of cubes', explanation: '$x^3 + 3^3 = (x+3)(x^2 - 3x + 9)$.' },
    { difficulty: 'easy', question: 'What is the degree of $3x^4 + 2x^2 - x + 7$?', accept: [4, '4'], placeholder: 'Number', explanation: 'Highest power of $x$ is 4.' },
    { difficulty: 'medium', question: 'Is $(x - 2)$ a factor of $x^3 - 8$? (yes/no)', accept: ['yes'], placeholder: 'yes/no', explanation: '$f(2) = 8 - 8 = 0$. By the factor theorem, $(x-2)$ is a factor.' },
    { difficulty: 'hard', question: 'Divide $x^3 + 1$ by $x + 1$. Quotient:', accept: ['x^2-x+1', 'x^2 - x + 1'], placeholder: 'Expression', explanation: '$x^3 + 1 = (x+1)(x^2 - x + 1)$. Sum of cubes.' },
    { difficulty: 'easy', question: 'How many roots (counting multiplicity) does a degree-5 polynomial have?', accept: [5, '5'], placeholder: 'Number', explanation: 'Fundamental theorem of algebra: a degree-$n$ polynomial has exactly $n$ roots (counting multiplicity, including complex).' },
    { difficulty: 'hard', question: 'If $f(x) = x^4 - 1$, find all real roots:', accept: ['1, -1', '-1, 1', '1,-1'], placeholder: 'Roots', explanation: '$x^4 - 1 = (x^2-1)(x^2+1) = (x-1)(x+1)(x^2+1)$. Real roots: $\\pm 1$.' },
    { difficulty: 'medium', question: 'The remainder when $x^3 + 2x - 1$ is divided by $(x - 1)$:', accept: [2, '2'], placeholder: 'Number', explanation: 'Remainder theorem: $f(1) = 1 + 2 - 1 = 2$.' },
    { difficulty: 'hard', question: 'Descartes\' rule: $f(x) = x^3 - 3x + 2$. Number of sign changes:', accept: [2, '2'], placeholder: 'Number', explanation: 'Coefficients: $+, -, +$. Two sign changes: at most 2 positive real roots.' },
    { difficulty: 'medium', question: 'Synthetic division of $x^3 + 2x^2 - x - 2$ by $(x - 1)$ gives remainder:', accept: [0, '0'], placeholder: 'Number', explanation: '$f(1) = 1 + 2 - 1 - 2 = 0$. No remainder.' },
    { difficulty: 'hard', question: 'Number of complex roots of $x^5 + 1 = 0$:', accept: [5, '5'], placeholder: 'Number', explanation: 'Degree 5: exactly 5 roots (counting multiplicity). One real root $x = -1$, four complex.' },
    { difficulty: 'medium', question: 'Leading coefficient of $-5x^3 + 2x^2 + 1$:', accept: [-5, '-5'], placeholder: 'Number', explanation: 'Leading coefficient is the coefficient of the highest-degree term: $-5$.' },
    { difficulty: 'hard', question: 'If $f(x) = x^3 - 6x^2 + 11x - 6$, then $f(1) =$?', accept: [0, '0'], placeholder: 'Number', explanation: '$1 - 6 + 11 - 6 = 0$. So $x = 1$ is a root.' },
    { difficulty: 'easy', question: 'A polynomial of degree 2 is called:', accept: ['quadratic'], placeholder: 'Name', explanation: 'Degree 2: quadratic.' },
    { difficulty: 'hard', question: 'Rational root theorem: candidate roots for $x^3 - 2x + 1$:', accept: ['1, -1', '-1, 1', 'pm 1'], placeholder: 'Roots', explanation: 'Constant = 1, leading = 1. Candidates: $\\pm 1$.' },
    { difficulty: 'medium', question: 'Degree of $7x^5 - x^3 + 2$:', accept: [5, '5'], placeholder: 'Number', explanation: 'Highest exponent: 5.' },
    { difficulty: 'hard', question: 'How many turning points can a degree-4 polynomial have at most?', accept: [3, '3'], placeholder: 'Number', explanation: 'At most $n - 1 = 3$ turning points.' }
        ],
        stepBuilder: [
          { difficulty: 'medium', question: 'Factor $6x^2 + 11x - 10$ by the AC method.', steps: [
            { content: '$ac = 6 \\times (-10) = -60$.' },
            { content: 'Find pair: $15 \\times (-4) = -60$ and $15 + (-4) = 11$.' },
            { content: 'Rewrite: $6x^2 + 15x - 4x - 10$.' },
            { content: 'Group: $3x(2x+5) - 2(2x+5) = (3x-2)(2x+5)$.' },
    { difficulty: 'hard', question: 'Factor $x^3 - 6x^2 + 11x - 6$ completely.', steps: [
      { content: 'Try $x = 1$: $1 - 6 + 11 - 6 = 0$. So $(x-1)$ is a factor.' },
      { content: 'Divide: $x^3 - 6x^2 + 11x - 6 = (x-1)(x^2 - 5x + 6)$.' },
      { content: 'Factor the quadratic: $x^2 - 5x + 6 = (x-2)(x-3)$.' },
      { content: 'Result: $(x-1)(x-2)(x-3)$.' }
    ], explanation: 'Rational root theorem: test integer divisors of the constant term. Then factor the remaining quadratic.' }
          ], explanation: 'AC method: multiply $a \\times c$, find factor pair summing to $b$, then group.' }
        ],
        matching: [
          { difficulty: 'easy', instruction: 'Match each pattern to its factored form:', pairs: [
            { left: '$a^2 - b^2$', right: '$(a-b)(a+b)$' },
            { left: '$a^2 + 2ab + b^2$', right: '$(a+b)^2$' },
            { left: '$a^3 - b^3$', right: '$(a-b)(a^2+ab+b^2)$' },
            { left: '$a^3 + b^3$', right: '$(a+b)(a^2-ab+b^2)$' }
          ] }
        ],
        fillBlanks: [
          { difficulty: 'easy', context: 'Factoring strategy:', expression: 'Always extract the {{0}} first before other methods.', blanks: [ { accept: ['GCF', 'greatest common factor'], size: 6 } ], explanation: 'GCF is always step 1.' },
          { difficulty: 'medium', context: 'Factor Theorem:', expression: '$(x-r)$ is a factor of $P(x)$ if and only if $P(r) =$ {{0}}.', blanks: [ { accept: ['0'], size: 3 } ], explanation: 'The Factor Theorem: $P(r) = 0$ iff $(x-r)$ divides $P(x)$.' },
    { difficulty: 'medium', context: 'Polynomial end behavior:', expression: 'A polynomial with positive leading coefficient and odd degree goes to $+\\infty$ as $x \\to$ {{0}}.', blanks: [ { accept: ['+infinity', 'infinity', 'inf'], size: 8 } ], explanation: 'Odd degree, positive leading coefficient: rises to right, falls to left.' }
        ],
        multiPart: [
          { difficulty: 'hard', question: 'Factor $x^4 - 16$ completely.', parts: [
            { question: 'First step: difference of squares gives:', accept: ['(x^2-4)(x^2+4)'], placeholder: '(a)(b)', explanation: '$x^4 - 16 = (x^2)^2 - 4^2 = (x^2-4)(x^2+4)$.' },
            { question: '$x^2 - 4$ factors further to:', accept: ['(x-2)(x+2)'], placeholder: '(a)(b)', explanation: 'Another difference of squares.' },
            { question: 'Does $x^2 + 4$ factor over reals? (yes/no)', accept: ['no', 'No'], placeholder: 'yes/no', explanation: 'Sum of squares does not factor over $\\mathbb{R}$.' }
          ], completionMessage: 'Complete factoring: $(x-2)(x+2)(x^2+4)$. Always check if factors can be factored further.' }
        ],

        stuckGuide: {
          html: `
            <div class="callout callout-tip">
              <h4>🧠 Factoring Decision Tree</h4>
              <ol>
                <li>Is there a GCF? Factor it out first.</li>
                <li>How many terms? <p>2 terms:</strong> check difference of squares or sum/difference of cubes. <p>3 terms:</strong> use the trinomial methods. <p>4 terms:</strong> try grouping.</li>
                <li>After factoring, check: can any factor be factored further?</li>
                <li>Always verify by multiplying the factors back together.</li>
              </ol>
            </div>
          `
        }
      },

      /* ============ TOPIC 2: Quadratic Equations ============ */
      {
        id: 'quadratic-equations',
        title: 'Quadratic Equations',
        description: 'Second-degree equations, the quadratic formula, and the geometry of parabolas.',

        prereqRecap: [
          { term: 'Polynomial', definition: 'An expression like $ax^2 + bx + c$. A quadratic is a polynomial of degree 2.' },
          { term: 'Factoring', definition: 'Rewriting a polynomial as a product of simpler expressions. $(x-2)(x-3) = x^2 - 5x + 6$.' },
          { term: 'Square Root', definition: '$\\sqrt{a}$ is the number whose square is $a$. $\\sqrt{9} = 3$ because $3^2 = 9$.' }
        ],
        whyExists: { html: `
          <p><strong>Why do quadratic equations matter?</strong> Linear equations ($ax + b = 0$) model constant-rate change. Quadratics ($ax^2 + bx + c = 0$) model <strong>acceleration</strong>: falling objects, projectile trajectories, area optimization, and any situation where the rate of change itself changes.</p>
          <p><strong>Why does the quadratic formula exist?</strong> Factoring only works when the roots are "nice" numbers. The quadratic formula gives the roots of ANY quadratic, even when they are irrational or complex. It is derived by <strong>completing the square</strong> on the general equation $ax^2 + bx + c = 0$. This derivation is an algebraic proof: every step follows from field axioms.</p>
          <p><strong>Practical application:</strong> Structural engineers use the discriminant ($b^2 - 4ac$) to determine whether a bridge support can handle two distinct load points, one critical load point, or no real failure point. Economists use quadratics to model supply-demand equilibrium.</p>
          ${WHY('Why does completing the square work?', '<p>Completing the square exploits the identity $(x + k)^2 = x^2 + 2kx + k^2$. By adding and subtracting $k^2$, we force a perfect square out of any trinomial. This transforms $ax^2 + bx + c = 0$ into $(x + \\frac{b}{2a})^2 = \\frac{b^2 - 4ac}{4a^2}$. Taking square roots yields the quadratic formula. The technique works because the field axioms guarantee that adding the same quantity to both sides preserves equality.</p>')}
        ` },

        hook: {
          html: `
            <div class="callout callout-puzzle">
              <h4>🧩 Puzzle: The Thrown Ball</h4>
              <p>A ball is thrown upward at 20 m/s from a height of 1.5 m. Its height at time $t$ is $h(t) = -4.9t^2 + 20t + 1.5$. When does it hit the ground?</p>
              <p>Ground means $h(t) = 0$. This is a quadratic equation: $-4.9t^2 + 20t + 1.5 = 0$. Solving it reveals the exact moment of impact.</p>
            </div>
          `
        },

        concept: {
          html: `

<div class="math-diagram">
<svg viewBox="0 0 400 280" width="400" height="280" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="240" x2="380" y2="240" stroke="#94a3b8" stroke-width="1"/>
  <line x1="200" y1="20" x2="200" y2="260" stroke="#94a3b8" stroke-width="1"/>
  <path d="M 60 230 Q 130 20 200 40 Q 270 20 340 230" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <line x1="200" y1="20" x2="200" y2="260" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,3"/>
  <circle cx="200" cy="40" r="5" fill="#10b981"/>
  <text x="210" y="35" fill="#10b981" font-size="11" font-family="Inter,sans-serif">vertex (h, k)</text>
  <circle cx="110" cy="240" r="4" fill="#ef4444"/>
  <circle cx="290" cy="240" r="4" fill="#ef4444"/>
  <text x="90" y="258" fill="#ef4444" font-size="10" font-family="Inter,sans-serif">root r₁</text>
  <text x="275" y="258" fill="#ef4444" font-size="10" font-family="Inter,sans-serif">root r₂</text>
  <text x="155" y="15" fill="#f59e0b" font-size="10" font-family="Inter,sans-serif">axis: x = h</text>
  <text x="310" y="100" fill="#3b82f6" font-size="12" font-family="Inter,sans-serif">y = a(x-h)² + k</text>
  <text x="310" y="118" fill="#94a3b8" font-size="10" font-family="Inter,sans-serif">a > 0: opens up</text>
  <text x="310" y="134" fill="#94a3b8" font-size="10" font-family="Inter,sans-serif">a < 0: opens down</text>
</svg>
</div>
<p class="math-diagram-label">A parabola: vertex at (h, k), roots where it crosses the x-axis, axis of symmetry x = h</p>

            <p>A <strong>quadratic equation</strong> has the standard form $ax^2 + bx + c = 0$ where $a \\neq 0$. The word "quadratic" comes from the Latin <em>quadratus</em> (squared). These equations model projectile motion, optimization, area problems, and any phenomenon with a squared relationship.</p>

            <div class="callout callout-key"><h4>Three Methods to Solve $ax^2 + bx + c = 0$</h4>
            <p><strong>Method 1: Factoring.</strong> If the quadratic factors over integers, this is the fastest approach. Set each factor to zero (Zero Product Property: if $AB = 0$, then $A = 0$ or $B = 0$).</p>
            <p>Example: $x^2 - 5x + 6 = 0 \\Rightarrow (x-2)(x-3) = 0 \\Rightarrow x = 2$ or $x = 3$.</p>

            <p><strong>Method 2: Completing the Square.</strong> This transforms $ax^2 + bx + c = 0$ into the form $(x-h)^2 = k$. The procedure:</p>
            <ol>
              <li>Divide both sides by $a$ (make the leading coefficient 1): $x^2 + \\frac{b}{a}x = -\\frac{c}{a}$</li>
              <li>Take half the coefficient of $x$: $\\frac{b}{2a}$. Square it: $\\frac{b^2}{4a^2}$.</li>
              <li>Add $\\frac{b^2}{4a^2}$ to both sides: $x^2 + \\frac{b}{a}x + \\frac{b^2}{4a^2} = \\frac{b^2}{4a^2} - \\frac{c}{a}$</li>
              <li>Left side is now a perfect square: $\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}$</li>
              <li>Take square roots: $x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a}$</li>
              <li>Solve for $x$: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ (the Quadratic Formula)</li>
            </ol>
            <p>This derivation proves why the quadratic formula works. It is completing the square on the general equation.</p>

            <p><strong>Method 3: Quadratic Formula.</strong> Works universally for any quadratic, including those that do not factor over integers.</p>
            </div>

            <div class="callout callout-key"><h4>The Discriminant: $\\Delta = b^2 - 4ac$</h4>
            <p>The expression under the square root determines the nature of the solutions:</p>
            <ul>
              <li>$\\Delta \\gt 0$: <strong>Two distinct real solutions.</strong> The parabola crosses the x-axis at two points. If $\\Delta$ is a perfect square, the roots are rational.</li>
              <li>$\\Delta = 0$: <strong>One repeated real solution</strong> (a double root). The parabola touches the x-axis at its vertex. The equation $(x-r)^2 = 0$ has $r$ as a double root.</li>
              <li>$\\Delta \\lt 0$: <strong>No real solutions</strong> (two complex conjugate solutions $a \\pm bi$). The parabola does not intersect the x-axis.</li>
            </ul></div>

            <div class="callout callout-key"><h4>Vieta's Formulas (Root-Coefficient Relations)</h4>
            <p>If $r_1$ and $r_2$ are the roots of $ax^2 + bx + c = 0$, then:</p>
            <ul>
              <li><strong>Sum of roots:</strong> $r_1 + r_2 = -\\frac{b}{a}$</li>
              <li><strong>Product of roots:</strong> $r_1 \\cdot r_2 = \\frac{c}{a}$</li>
            </ul>
            <p>These follow directly from $a(x-r_1)(x-r_2) = ax^2 - a(r_1+r_2)x + ar_1r_2$, comparing coefficients.</p>
            <p>Practical use: check your solutions without re-substituting. For $x^2 - 5x + 6 = 0$: roots $2, 3$. Sum = $5 = -(-5)/1$ ✓. Product = $6 = 6/1$ ✓.</p></div>

            <div class="callout callout-key"><h4>Geometry: The Parabola $y = ax^2 + bx + c$</h4>
            <p><strong>Vertex Form:</strong> $y = a(x-h)^2 + k$ where $(h,k)$ is the vertex.</p>
            <p>Conversion formulas: $h = -\\frac{b}{2a}$, $k = c - \\frac{b^2}{4a}$.</p>
            <p><strong>Direction:</strong> $a \\gt 0$ opens upward (vertex is minimum). $a \\lt 0$ opens downward (vertex is maximum).</p>
            <p><strong>Axis of Symmetry:</strong> The vertical line $x = h = -\\frac{b}{2a}$.</p>
            <p><strong>y-intercept:</strong> The point $(0, c)$. Set $x = 0$.</p>
            <p><strong>x-intercepts:</strong> The solutions to $ax^2 + bx + c = 0$ (the roots). These are where the parabola crosses the x-axis.</p></div>
          `
        },

        definition: {
          html: `
            <p><strong>The Quadratic Formula:</strong></p>
            <div class="math-block">$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$</div>
            <div class="callout callout-notation">
              <h4>📐 Reading This Formula</h4>
              <p>$\\pm$ means "plus or minus," yielding two solutions. $b^2 - 4ac$ is under the square root (the discriminant $\\Delta$). The entire expression is divided by $2a$. This formula is derived by completing the square on the general form $ax^2 + bx + c = 0$.</p>
            </div>
            <p><strong>Vertex Form:</strong> $y = a(x - h)^2 + k$ where $(h, k)$ is the vertex of the parabola.</p>
            <p>Conversion: $h = -\\frac{b}{2a}$ and $k = f(h) = c - \\frac{b^2}{4a}$.</p>
          `
        },

        examples: [
          {
            title: 'Solving with the Quadratic Formula',
            problem: 'Solve $2x^2 - 5x - 3 = 0$.',
            steps: [
              { title: 'Identify $a$, $b$, $c$', content: '$a = 2$, $b = -5$, $c = -3$.', why: 'Match coefficients to the standard form $ax^2 + bx + c = 0$. Pay attention to signs.' },
              { title: 'Compute the discriminant', content: '$\\Delta = (-5)^2 - 4(2)(-3) = 25 + 24 = 49$', why: '$\\Delta \\gt 0$ means two distinct real roots. $\\Delta = 49 = 7^2$, so the roots will be rational.' },
              { title: 'Apply the formula', content: '$x = \\frac{-(-5) \\pm \\sqrt{49}}{2(2)} = \\frac{5 \\pm 7}{4}$', why: 'Substitute into the quadratic formula. The $\\pm$ splits into two cases.' },
              { title: 'Compute both solutions', content: '$x_1 = \\frac{5 + 7}{4} = \\frac{12}{4} = 3$ and $x_2 = \\frac{5 - 7}{4} = \\frac{-2}{4} = -\\frac{1}{2}$', why: 'The two signs of $\\pm$ give the two roots.' },
              { title: 'Verify $x = 3$', content: '$2(9) - 5(3) - 3 = 18 - 15 - 3 = 0$ ✓', why: 'Always substitute back. Both roots should produce zero.' }
            ]
          },
          {
            title: 'Completing the Square',
            problem: 'Solve $x^2 + 6x + 2 = 0$ by completing the square.',
            steps: [
              { title: 'Move the constant', content: '$x^2 + 6x = -2$', why: 'Isolate the variable terms on one side.' },
              { title: 'Complete the square', content: 'Half of $6$ is $3$. Square it: $9$. Add $9$ to both sides: $x^2 + 6x + 9 = -2 + 9 = 7$', why: 'Adding $(b/2)^2$ to both sides creates a perfect square trinomial on the left.' },
              { title: 'Factor the left side', content: '$(x + 3)^2 = 7$', why: '$x^2 + 6x + 9 = (x + 3)^2$. This is why we added $9$: to make a perfect square.' },
              { title: 'Take square roots', content: '$x + 3 = \\pm\\sqrt{7}$, so $x = -3 \\pm \\sqrt{7}$', why: 'Taking the square root of both sides introduces $\\pm$. Two solutions.' }
            ]
          }
        ],

        flashCards: [
      { type: 'define', front: 'What is a quadratic?', back: 'ax^2+bx+c=0, a not zero. At most 2 solutions (roots). Graph is a parabola.' },
      { type: 'why', front: 'Why does the quadratic formula work?', back: 'Derived by completing the square on ax^2+bx+c=0. Systematic algebra isolates x.' },
      { type: 'how', front: 'What does the discriminant tell you?', back: 'b^2-4ac: positive=2 roots, zero=1 root, negative=no real roots.' },
      { type: 'why', front: 'Why does a parabola have a vertex?', back: 'x^2 forces the function to change direction. Vertex is the turning point at x=-b/(2a).' }
    ],
    exercises: [
          {
            difficulty: 'easy',
            question: 'What is the discriminant of $x^2 - 4x + 4 = 0$?',
            options: ['$0$', '$32$', '$-32$', '$8$'],
            correctIndex: 0,
            hint: '<p>$\\Delta = b^2 - 4ac$.</p>',
            correctExplanation: '$(-4)^2 - 4(1)(4) = 16 - 16 = 0$. One repeated root.',
            wrongExplanations: { 1: '$16 + 16$ is wrong; formula subtracts.', 2: '$c = +4$, so $4ac = 16$.', 3: 'That is $2b$.' }
          },
          {
            difficulty: 'medium',
            question: 'Solve $x^2 - 2x - 8 = 0$. What are the solutions?',
            options: ['$x = 4, x = -2$', '$x = -4, x = 2$', '$x = 4, x = 2$', '$x = -4, x = -2$'],
            correctIndex: 0,
            hint: '<p>Factor: find two numbers that multiply to $-8$ and add to $-2$.</p>',
            correctExplanation: '$x^2 - 2x - 8 = (x - 4)(x + 2) = 0$. So $x = 4$ or $x = -2$. Check: $-4 \\times 2 = -8$ ✓ and $-4 + 2 = -2$ ✓.',
            wrongExplanations: { 1: 'Check the signs in your factoring. $(-4)(2) = -8$ ✓, but $-4 + 2 = -2$ ✓ gives factors $(x - 4)(x + 2)$.', 2: 'These multiply to $8$, not $-8$. One factor must be negative.', 3: 'These add to $-6$, not $-2$.' }
          },
          {
            difficulty: 'hard',
            question: 'Solve $3x^2 - 2x - 1 = 0$ using the quadratic formula. Solutions:',
            options: ['$x = 1, x = -1/3$', '$x = -1, x = 1/3$', '$x = 1, x = 1/3$', '$x = 2, x = -1$'],
            correctIndex: 0,
            hint: '<p>$x = \\frac{2 \\pm \\sqrt{4+12}}{6} = \\frac{2 \\pm 4}{6}$.</p>',
            correctExplanation: '$\\Delta = 4 + 12 = 16$. $x = \\frac{2+4}{6} = 1$ or $x = \\frac{2-4}{6} = -\\frac{1}{3}$.',
            wrongExplanations: { 1: 'Check $\\frac{2+4}{6} = 1$, not $-1$.', 2: '$\\frac{2-4}{6} = -1/3$, not $+1/3$.', 3: 'Use the formula, not guessing.' }
          }
        ,

    /* Quadratic intuition */
    {
      question: 'A ball thrown upward follows y = -16t^2 + 48t. When does it hit the ground (y = 0)?',
      type: 'mc',
      options: ['t = 0 and t = 3', 't = 3 only', 't = 0 and t = 48', 't = 16'],
      correctIndex: 0,
      solution: { steps: ['Set y = 0: -16t^2 + 48t = 0.', 'Factor: -16t(t - 3) = 0.', 'So t = 0 (launch) or t = 3 (landing). The ball is in the air for 3 seconds.'] }
    },
    {
      question: 'Without solving, how many real solutions does x^2 + 4 = 0 have?',
      type: 'mc',
      options: ['0 (no real solutions)', '1', '2', 'Infinitely many'],
      correctIndex: 0,
      solution: { steps: ['x^2 + 4 = 0 means x^2 = -4.', 'No real number squared gives a negative. x^2 >= 0 always.', 'Discriminant: b^2 - 4ac = 0 - 16 = -16 < 0, confirming no real roots.'] }
    },
    {
      question: 'If a parabola opens downward, what does that tell you about the value of a in ax^2 + bx + c?',
      type: 'mc',
      options: ['a < 0', 'a > 0', 'a = 0', 'a = 1'],
      correctIndex: 0,
      solution: { steps: ['The sign of a determines if the parabola opens up (a > 0) or down (a < 0).', 'A negative leading coefficient means the parabola eventually decreases on both sides.'] }
    }
    ],
        freeResponse: [
          { difficulty: 'easy', question: 'Discriminant of $x^2 + 6x + 9 = 0$:', accept: [0, '0'], placeholder: 'Number', explanation: '$36 - 36 = 0$. Perfect square: $(x+3)^2 = 0$.' },
          { difficulty: 'easy', question: 'Solve $x^2 = 49$. List both solutions:', accept: ['7, -7', '-7, 7', '7,-7', '-7,7'], placeholder: 'x values', explanation: '$x = \\pm 7$.' },
          { difficulty: 'medium', question: 'Vertex of $y = x^2 - 6x + 5$ is at $x =$?', accept: [3, '3'], placeholder: 'x-coordinate', explanation: '$x = -b/2a = 6/2 = 3$.' },
          { difficulty: 'medium', question: 'How many real solutions does $x^2 + 4 = 0$ have?', accept: [0, '0', 'none', 'zero'], placeholder: 'Number', explanation: '$\\Delta = 0 - 16 = -16 < 0$. No real solutions.' },
          { difficulty: 'hard', question: 'Sum of the roots of $2x^2 - 10x + 3 = 0$:', accept: [5, '5'], placeholder: 'Number', explanation: 'Vieta: sum $= -b/a = 10/2 = 5$.' },
    { difficulty: 'easy', question: 'Solve: $x^2 = 16$:', accept: ['4, -4', '-4, 4', '4,-4'], placeholder: 'Solutions', explanation: '$x = \\pm 4$.' },
    { difficulty: 'medium', question: 'Sum of roots of $x^2 - 7x + 10 = 0$:', accept: [7, '7'], placeholder: 'Number', explanation: 'By Vieta: sum = $-(-7)/1 = 7$. (Roots are 2 and 5.)' },
    { difficulty: 'hard', question: 'If the discriminant is negative, how many real roots?', accept: [0, '0', 'none'], placeholder: 'Number', explanation: '$b^2 - 4ac < 0$: no real roots. Two complex conjugate roots.' },
    { difficulty: 'easy', question: 'The vertex of $y = (x-3)^2 + 5$ is:', accept: ['(3,5)', '3, 5', '(3, 5)'], placeholder: 'Point', explanation: 'Vertex form $y = (x-h)^2 + k$: vertex $(3, 5)$.' },
    { difficulty: 'medium', question: 'Axis of symmetry for $y = x^2 - 6x + 5$: $x =$?', accept: [3, '3'], placeholder: 'Number', explanation: '$x = -b/(2a) = 6/2 = 3$.' },
    { difficulty: 'easy', question: 'Solve: $x^2 - 4 = 0$:', accept: ['2, -2', '-2, 2', '2,-2'], placeholder: 'Solutions', explanation: '$(x-2)(x+2) = 0$. $x = \\pm 2$.' },
    { difficulty: 'hard', question: 'For $ax^2 + bx + c = 0$, product of roots is:', accept: ['c/a'], placeholder: 'Expression', explanation: 'By Vieta: product = $c/a$.' },
    { difficulty: 'medium', question: 'Complete the square: $x^2 + 6x + $ ?$ = (x+3)^2$', accept: [9, '9'], placeholder: 'Number', explanation: '$(6/2)^2 = 9$. $x^2 + 6x + 9 = (x+3)^2$.' },
    { difficulty: 'hard', question: 'Nature of roots when discriminant = 0:', accept: ['one repeated root', 'double root', 'repeated'], placeholder: 'Description', explanation: '$b^2 - 4ac = 0$: one repeated (double) real root.' },
    { difficulty: 'medium', question: 'If the vertex of $y = a(x-h)^2 + k$ opens downward, then $a$ is:', accept: ['negative', 'a < 0'], placeholder: 'Sign', explanation: '$a < 0$: parabola opens downward.' },
    { difficulty: 'easy', question: 'Sum of roots of $x^2 - 5x + 6 = 0$:', accept: [5, '5'], placeholder: 'Number', explanation: 'Vieta: sum of roots = $-b/a = 5$.' },
    { difficulty: 'hard', question: 'Discriminant of $3x^2 + 2x + 1$:', accept: [-8, '-8'], placeholder: 'Number', explanation: '$b^2 - 4ac = 4 - 12 = -8 < 0$. No real roots.' }
        ],
        stepBuilder: [
          { difficulty: 'medium', question: 'Solve $x^2 + 6x + 2 = 0$ by completing the square.', steps: [
            { content: 'Move constant: $x^2 + 6x = -2$.' },
            { content: 'Half of $6$ is $3$. $3^2 = 9$. Add: $x^2 + 6x + 9 = 7$.' },
            { content: '$(x+3)^2 = 7$.' },
            { content: '$x = -3 \\pm \\sqrt{7}$.' },
    { difficulty: 'medium', question: 'Convert $y = x^2 + 8x + 12$ to vertex form.', steps: [
      { content: 'Half the $x$ coefficient: $8/2 = 4$. Square it: $4^2 = 16$.' },
      { content: 'Add and subtract 16: $y = (x^2 + 8x + 16) - 16 + 12$.' },
      { content: '$y = (x + 4)^2 - 4$. Vertex: $(-4, -4)$.' },
    { difficulty: 'hard', question: 'Solve $x^2 - 4x + 1 = 0$ using the quadratic formula.', steps: [
      { content: '$a=1, b=-4, c=1$. Discriminant: $16 - 4 = 12$.' },
      { content: '$x = \\frac{4 \\pm \\sqrt{12}}{2} = \\frac{4 \\pm 2\\sqrt{3}}{2}$.' },
      { content: '$x = 2 \\pm \\sqrt{3}$.' }
    ], explanation: '$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.' }
    ], explanation: 'Completing the square converts standard form to vertex form: $y = (x-h)^2 + k$.' }
          ], explanation: 'Completing the square: add $(b/2)^2$ to both sides.' }
        ],
        matching: [
          { difficulty: 'easy', instruction: 'Match discriminant value to number of real solutions:', pairs: [
            { left: '$\\Delta \\gt 0$', right: 'Two distinct real roots' },
            { left: '$\\Delta = 0$', right: 'One repeated root' },
            { left: '$\\Delta \\lt 0$', right: 'No real roots' }
          ] }
        ],
        fillBlanks: [
          { difficulty: 'easy', context: 'Quadratic formula:', expression: '$x = \\frac{-b \\pm \\sqrt{b^2 - {{0}}}}{2a}$', blanks: [ { accept: ['4ac'], size: 5 } ], explanation: 'Discriminant: $b^2 - 4ac$.' },
          { difficulty: 'medium', context: 'Vertex form:', expression: 'The vertex of $y = a(x-h)^2 + k$ is at {{0}}.', blanks: [ { accept: ['(h,k)', '(h, k)'], size: 6 } ], explanation: 'Vertex is $(h, k)$.' }
        ],

        visualizations: [
          {
            render: (containerId) => {
              Viz.plotFunction(containerId, [
                x => x*x - 2*x - 8
              ], {
                xMin: -4, xMax: 7, yMin: -10, yMax: 12,
                labels: ['y = x² - 2x - 8'],
                title: 'Parabola: Roots at x = -2 and x = 4',
                width: 550, height: 380
              });
            }
          }
        ],

        stuckGuide: {
          html: `
            <div class="callout callout-tip">
              <h4>🧠 Quadratic Strategy Selection</h4>
              <ul>
                <li><strong>Try factoring first</strong> if coefficients are small and the discriminant is a perfect square.</li>
                <li><strong>Use completing the square</strong> when converting to vertex form or when the question specifically asks for it.</li>
                <li><strong>Use the quadratic formula</strong> when factoring is not obvious. It always works.</li>
                <li><strong>Check the discriminant first</strong> to know how many solutions to expect before solving.</li>
              </ul>
            </div>
          `
        }
      },

      /* ============ TOPIC 3: Exponents and Logarithms ============ */
      {
        id: 'exponents-logarithms',
        title: 'Exponents and Logarithms',
        description: 'Exponential growth, logarithmic scales, and the inverse relationship between them.',

        prereqRecap: [
          { term: 'Exponent', definition: '$a^n = a \\cdot a \\cdot \\ldots \\cdot a$ ($n$ times). $2^3 = 8$.' },
          { term: 'Inverse Operation', definition: 'An operation that undoes another. Addition and subtraction are inverses. Squaring and square roots are inverses.' },
          { term: 'Function', definition: 'A rule assigning each input exactly one output. $f(x) = 2^x$ is an exponential function.' }
        ],
        whyExists: { html: `
          <p><strong>Why do we need exponents?</strong> Exponents encode <strong>repeated multiplication</strong>, just as multiplication encodes repeated addition. Nature operates on multiplicative scales: populations double, radioactive atoms halve, investments compound. Linear models fail for these phenomena.</p>
          <p><strong>Why do logarithms exist?</strong> If $2^x = 8$, what is $x$? We need an operation that "undoes" exponentiation. That operation is the <strong>logarithm</strong>: $\\log_2(8) = 3$. Logarithms ask: "what exponent produces this result?" They are defined as the <strong>inverse function</strong> of $b^x$.</p>
          <p><strong>Practical application:</strong> The Richter earthquake scale, pH in chemistry, decibels in sound, and the number of binary digits needed to store $n$ items ($\\lceil\\log_2 n\\rceil$) all use logarithms. Interest compounding ($A = P(1 + r/n)^{nt}$) is pure exponential growth.</p>
          ${WHY('Why is $e \\approx 2.718$ special?', '<p>$e$ is the base where the exponential function equals its own derivative: $\\frac{d}{dx}e^x = e^x$. It emerges naturally from continuous compounding: $\\lim_{n \\to \\infty}(1 + 1/n)^n = e$. This means $e^x$ is the unique function that grows at a rate <strong>exactly proportional to its current value</strong>. No other base has this property.</p>')}
          ${WHY('Why do log rules mirror exponent rules?', '<p>Every logarithm rule is a direct consequence of the corresponding exponent rule. $\\log(ab) = \\log a + \\log b$ because $b^{m+n} = b^m \\cdot b^n$. The product of exponentials becomes the sum of exponents. Since $\\log$ is the inverse of exponentiation, it converts multiplication back to addition. This is the historical reason logarithms were invented: to turn hard multiplication problems into easy addition problems (John Napier, 1614).</p>')}
        ` },

        hook: {
          html: `
            <div class="callout callout-puzzle">
              <h4>🧩 Puzzle: The Rice on the Chessboard</h4>
              <p>A king offers a reward: 1 grain of rice on the first square of a chessboard, 2 on the second, 4 on the third, doubling each time. How many grains on the 64th square?</p>
              <p>Square 64 has $2^{63}$ grains. That is approximately $9.2 \\times 10^{18}$ grains, roughly 400 times the world's annual rice production. Exponential growth is deceptively powerful.</p>
            </div>
          `
        },

        concept: {
          html: `

<div class="math-diagram">
<svg viewBox="0 0 400 260" width="400" height="260" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="200" x2="380" y2="200" stroke="#94a3b8" stroke-width="1"/>
  <line x1="200" y1="20" x2="200" y2="240" stroke="#94a3b8" stroke-width="1"/>
  <path d="M 50 198 Q 100 195 140 185 Q 180 160 200 130 Q 230 70 260 40 Q 280 25 320 20" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <path d="M 198 50 Q 195 100 185 140 Q 160 180 130 200 Q 70 230 40 240 Q 25 248 20 250" fill="none" stroke="#10b981" stroke-width="2.5" transform="rotate(90 200 200) translate(0 -200) scale(1,-1) translate(0,-200)" />
  <path d="M 200 198 Q 210 180 230 140 Q 260 80 300 40 Q 320 25 350 20" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="325" y="18" fill="#3b82f6" font-size="11" font-family="Inter,sans-serif">y = bˣ</text>
  <text x="310" y="60" fill="#10b981" font-size="11" font-family="Inter,sans-serif">y = log_b(x)</text>
  <line x1="40" y1="40" x2="360" y2="240" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="340" y="248" fill="#f59e0b" font-size="10" font-family="Inter,sans-serif">y = x</text>
  <circle cx="200" cy="130" r="4" fill="#3b82f6"/>
  <text x="145" y="125" fill="#3b82f6" font-size="10" font-family="Inter,sans-serif">(0, 1)</text>
  <text x="100" y="30" fill="#e2e8f0" font-size="12" font-family="Inter,sans-serif" text-anchor="middle">Exponential and its inverse (log)</text>
  <text x="100" y="48" fill="#94a3b8" font-size="10" font-family="Inter,sans-serif" text-anchor="middle">reflected across y = x</text>
</svg>
</div>
<p class="math-diagram-label">Exponential y = bˣ and its inverse y = log_b(x), reflected across y = x</p>

            <div class="callout callout-key">
              <h4>Laws of Exponents</h4>
              <ul>
                <li>$a^m \\cdot a^n = a^{m+n}$ : WHY: $a^3 \\cdot a^2 = (a \\cdot a \\cdot a)(a \\cdot a) = a^5$. You have $m$ copies of $a$ multiplied by $n$ copies, totaling $m+n$ copies.</li>
                <li>$\\frac{a^m}{a^n} = a^{m-n}$ : WHY: Division cancels copies. $\\frac{a^5}{a^2} = \\frac{a \\cdot a \\cdot a \\cdot a \\cdot a}{a \\cdot a} = a^3$. You cancel $n$ copies from $m$.</li>
                <li>$(a^m)^n = a^{mn}$ : WHY: $(a^3)^2 = a^3 \\cdot a^3 = a^6$. You have $n$ groups of $m$ copies, totaling $mn$.</li>
                <li>$(ab)^n = a^n b^n$ : WHY: $(ab)^3 = (ab)(ab)(ab) = (aaa)(bbb) = a^3 b^3$. Multiplication is commutative, so factors rearrange.</li>
                <li>$a^0 = 1$ for $a \\neq 0$ : WHY: $a^n / a^n = a^{n-n} = a^0$. Any nonzero number divided by itself is $1$.</li>
                <li>$a^{-n} = \\frac{1}{a^n}$ : WHY: $a^{-n} = a^{0-n} = \\frac{a^0}{a^n} = \\frac{1}{a^n}$. Negative exponents extend the pattern of subtracting.</li>
                <li>$a^{1/n} = \\sqrt[n]{a}$ : WHY: If $x = a^{1/n}$, then $x^n = (a^{1/n})^n = a^{n/n} = a^1 = a$. So $x$ is the $n$th root of $a$.</li>
              </ul>
            </div>
            <p>A <strong>logarithm</strong> answers: "To what power must I raise the base to get this number?"</p>
            <div class="math-block">$$\\log_b(x) = y \\quad \\Longleftrightarrow \\quad b^y = x$$</div>
            <p>The logarithm is the <strong>inverse function</strong> of the exponential: $\\log_b(b^x) = x$ and $b^{\\log_b(x)} = x$.</p>
          `
        },

        definition: {
          html: `
            <div class="callout callout-key">
              <h4>Laws of Logarithms</h4>
              <ul>
                <li>$\\log_b(xy) = \\log_b x + \\log_b y$ (product → sum)</li>
                <li>$\\log_b\\left(\\frac{x}{y}\\right) = \\log_b x - \\log_b y$ (quotient → difference)</li>
                <li>$\\log_b(x^n) = n \\log_b x$ (power rule)</li>
                <li><strong>Change of base:</strong> $\\log_b x = \\frac{\\ln x}{\\ln b}$ (convert to natural log)</li>
              </ul>
            </div>
            <div class="callout callout-notation">
              <h4>📐 Common Notation</h4>
              <p>$\\log x$ (no base) typically means $\\log_{10} x$ in applied contexts. $\\ln x$ means $\\log_e x$ (natural logarithm, base $e \\approx 2.718$). In pure mathematics, $\\log$ often means $\\ln$. Context determines the convention.</p>
            </div>
          `
        },

        examples: [
          {
            title: 'Solving an Exponential Equation',
            problem: 'Solve $3^{2x-1} = 27$.',
            steps: [
              { title: 'Express both sides with the same base', content: '$27 = 3^3$, so the equation becomes $3^{2x-1} = 3^3$', why: 'When both sides have the same base, the exponents must be equal. This is the most direct approach.' },
              { title: 'Set exponents equal', content: '$2x - 1 = 3$', why: 'If $b^a = b^c$ and $b \\gt 0$, $b \\neq 1$, then $a = c$. This is the one-to-one property of exponential functions.' },
              { title: 'Solve', content: '$2x = 4$, so $x = 2$', why: 'Standard linear equation solving.' },
              { title: 'Verify', content: '$3^{2(2)-1} = 3^3 = 27$ ✓', why: 'Substitution confirms the solution.' }
            ]
          },
          {
            title: 'Solving a Logarithmic Equation',
            problem: 'Solve $\\log_2(x) + \\log_2(x-2) = 3$.',
            steps: [
              { title: 'Combine using product rule', content: '$\\log_2(x(x-2)) = 3$, so $\\log_2(x^2 - 2x) = 3$', why: 'Product rule: $\\log_b A + \\log_b B = \\log_b(AB)$.' },
              { title: 'Convert to exponential form', content: '$x^2 - 2x = 2^3 = 8$', why: '$\\log_b(N) = k$ means $N = b^k$. This eliminates the logarithm.' },
              { title: 'Solve the quadratic', content: '$x^2 - 2x - 8 = 0 \\Rightarrow (x-4)(x+2) = 0 \\Rightarrow x = 4$ or $x = -2$', why: 'Standard factoring of a quadratic.' },
              { title: 'Check domain restrictions', content: '$\\log_2(x)$ requires $x \\gt 0$ and $\\log_2(x-2)$ requires $x \\gt 2$. So $x \\gt 2$. $x = -2$ is rejected. Solution: $x = 4$.', why: 'Logarithms are defined only for positive arguments. Always check that solutions satisfy domain constraints.' }
            ]
          }
        ],

        flashCards: [
      { type: 'define', front: 'What is a logarithm?', back: 'log_b(x)=y means b^y=x. It answers: what power of b gives x? Inverse of exponentiation.' },
      { type: 'why', front: 'Why is ln(e) = 1?', back: 'ln = log base e. "What power of e gives e?" Answer: 1, because e^1 = e.' },
      { type: 'how', front: 'Why log(ab) = log(a) + log(b)?', back: 'If a=b^m, c=b^n, then ac=b^(m+n). Taking log: log(ac)=m+n=log(a)+log(c). Multiplication becomes addition.' },
      { type: 'why', front: 'Why are exponentials important?', back: 'Population growth, decay, compound interest all follow exponentials. Any quantity whose rate equals its value is exponential.' }
    ],
    exercises: [
          {
            difficulty: 'easy',
            question: 'Simplify: $2^3 \\cdot 2^4$',
            options: ['$2^{12}$', '$2^7 = 128$', '$4^7$', '$2^{4/3}$'],
            correctIndex: 1,
            hint: '<p>Same base: add exponents.</p>',
            correctExplanation: '$2^{3+4} = 2^7 = 128$.',
            wrongExplanations: { 0: 'Multiply exponents is for $(a^m)^n$, not $a^m \\cdot a^n$.', 2: 'Base stays as 2.', 3: 'Division gives $a^{m-n}$; here we add.' }
          },
          {
            difficulty: 'easy',
            question: '$\\log_2(8) =$?',
            options: ['$2$', '$3$', '$4$', '$8$'],
            correctIndex: 1,
            hint: '<p>$2$ to what power equals $8$?</p>',
            correctExplanation: '$2^3 = 8$, so $\\log_2(8) = 3$.',
            wrongExplanations: { 0: '$2^2 = 4 \\neq 8$.', 2: '$2^4 = 16 \\neq 8$.', 3: '$\\log$ returns the exponent, not the argument.' }
          },
          {
            difficulty: 'medium',
            question: '$\\log_3(81) =$?',
            options: ['$3$', '$4$', '$27$', '$9$'],
            correctIndex: 1,
            hint: '<p>$3^? = 81$.</p>',
            correctExplanation: '$3^4 = 81$.',
            wrongExplanations: { 0: '$3^3 = 27$.', 2: '27 is $3^3$.', 3: '$9 = 3^2$.' }
          },
          {
            difficulty: 'hard',
            question: 'Solve $5^{x} = 125$:',
            options: ['$x = 2$', '$x = 3$', '$x = 25$', '$x = 5$'],
            correctIndex: 1,
            hint: '<p>$125 = 5^?$</p>',
            correctExplanation: '$125 = 5^3$, so $x = 3$.',
            wrongExplanations: { 0: '$5^2 = 25 \\neq 125$.', 2: '$x$ is the exponent, not a large number.', 3: '$5^5 = 3125 \\neq 125$.' }
          }
        ],
        freeResponse: [
          { difficulty: 'easy', question: '$3^0 =$?', accept: [1, '1'], placeholder: 'Number', explanation: 'Any nonzero base to the 0 power = 1.' },
          { difficulty: 'easy', question: '$\\log_{10}(100) =$?', accept: [2, '2'], placeholder: 'Number', explanation: '$10^2 = 100$.' },
          { difficulty: 'medium', question: 'Simplify $\\log_2(32)$:', accept: [5, '5'], placeholder: 'Number', explanation: '$2^5 = 32$.' },
          { difficulty: 'medium', question: 'Simplify $\\log_b(b^7)$:', accept: [7, '7'], placeholder: 'Number', explanation: '$\\log_b(b^x) = x$. So $\\log_b(b^7) = 7$.' },
          { difficulty: 'hard', question: 'If $\\log_b(x) = 3$ and $b = 4$, then $x =$?', accept: [64, '64'], placeholder: 'Number', explanation: '$4^3 = 64$.' },
          { difficulty: 'hard', question: '$\\ln(e^5) =$?', accept: [5, '5'], placeholder: 'Number', explanation: '$\\ln(e^x) = x$. So $\\ln(e^5) = 5$.' },
    { difficulty: 'easy', question: '$e^0 =$?', accept: [1, '1'], placeholder: 'Number', explanation: 'Any base raised to 0 equals 1. $e^0 = 1$.' },
    { difficulty: 'medium', question: 'Solve: $\\ln(x) = 3$. $x =$?', accept: ['e^3', '20.09'], placeholder: 'Value', explanation: '$x = e^3 \\approx 20.09$.' },
    { difficulty: 'hard', question: 'Solve: $\\log_2(x) + \\log_2(4) = 5$. $x =$?', accept: [8, '8'], placeholder: 'Number', explanation: '$\\log_2(4x) = 5$. $4x = 32$. $x = 8$.' },
    { difficulty: 'easy', question: '$2^3 =$?', accept: [8, '8'], placeholder: 'Number', explanation: '$2 \\times 2 \\times 2 = 8$.' },
    { difficulty: 'medium', question: 'Solve: $e^{2x} = e^6$. $x =$?', accept: [3, '3'], placeholder: 'Number', explanation: 'Equal bases: $2x = 6$. $x = 3$.' },
    { difficulty: 'hard', question: 'Solve: $\\log_3(x - 1) = 2$. $x =$?', accept: [10, '10'], placeholder: 'Number', explanation: '$x - 1 = 3^2 = 9$. $x = 10$.' },
    { difficulty: 'medium', question: '$\\log_{10}(1000) =$?', accept: [3, '3'], placeholder: 'Number', explanation: '$10^3 = 1000$. So $\\log_{10}(1000) = 3$.' },
    { difficulty: 'easy', question: '$\\ln(1) =$?', accept: [0, '0'], placeholder: 'Number', explanation: '$e^0 = 1$, so $\\ln(1) = 0$.' },
    { difficulty: 'hard', question: 'Change of base: $\\log_2(8) = \\frac{\\ln(8)}{\\ln($ ? $)}$', accept: [2, '2'], placeholder: 'Base', explanation: 'Change of base: $\\log_b a = \\frac{\\ln a}{\\ln b}$.' },
    { difficulty: 'medium', question: '$e^{\\ln(5)} =$?', accept: [5, '5'], placeholder: 'Number', explanation: '$e$ and $\\ln$ are inverses. $e^{\\ln 5} = 5$.' },
    { difficulty: 'easy', question: '$\\log_2(1) =$?', accept: [0, '0'], placeholder: 'Number', explanation: '$2^0 = 1$. $\\log_2(1) = 0$.' },
    { difficulty: 'hard', question: '$\\ln(e^3) =$?', accept: [3, '3'], placeholder: 'Number', explanation: '$\\ln$ and $e$ are inverses: $\\ln(e^3) = 3$.' }
        ],
        stepBuilder: [
          { difficulty: 'medium', question: 'Solve $\\log_2(x) + \\log_2(x-2) = 3$.', steps: [
            { content: 'Product rule: $\\log_2(x(x-2)) = 3$.' },
            { content: 'Exponential form: $x^2 - 2x = 2^3 = 8$.' },
            { content: '$x^2 - 2x - 8 = 0 \\Rightarrow (x-4)(x+2) = 0$.' },
            { content: '$x = 4$ or $x = -2$. Check domain: $x \\gt 2$. Solution: $x = 4$.' },
          ], explanation: 'Combine logs, convert to exponential, solve quadratic, check domain.' }
        ],
        matching: [
          { difficulty: 'easy', instruction: 'Match each exponent/log law:', pairs: [
            { left: '$a^m \\cdot a^n$', right: '$a^{m+n}$' },
            { left: '$(a^m)^n$', right: '$a^{mn}$' },
            { left: '$\\log_b(xy)$', right: '$\\log_b x + \\log_b y$' },
            { left: '$\\log_b(x^n)$', right: '$n\\log_b x$' }
          ] }
        ],
        fillBlanks: [
          { difficulty: 'easy', context: 'Log-exponential inverse:', expression: '$\\log_b(b^x) =$ {{0}} and $b^{\\log_b(x)} =$ {{1}}.', blanks: [ { accept: ['x'], size: 3 }, { accept: ['x'], size: 3 } ], explanation: 'Logs and exponentials are inverses.' },
          { difficulty: 'medium', context: 'Change of base:', expression: '$\\log_b(x) = \\frac{\\ln x}{\\ln$ {{0}} $}$.', blanks: [ { accept: ['b'], size: 3 } ], explanation: 'Change of base formula.' }
        ],
        multiPart: [
          { difficulty: 'hard', question: 'Solve $2^{2x} - 5 \\cdot 2^x + 4 = 0$.', parts: [
            { question: 'Let $u = 2^x$. Rewrite the equation:', accept: ['u^2 - 5u + 4 = 0', 'u^2-5u+4=0'], placeholder: 'Equation in u', explanation: '$2^{2x} = (2^x)^2 = u^2$.' },
            { question: 'Factor and solve for $u$:', accept: ['u=1, u=4', '1, 4', 'u=4, u=1'], placeholder: 'u values', explanation: '$(u-1)(u-4) = 0$. $u = 1$ or $u = 4$.' },
            { question: 'Convert back: $2^x = 1 \\Rightarrow x =$? and $2^x = 4 \\Rightarrow x =$?', accept: ['0, 2', 'x=0, x=2', '0,2'], placeholder: 'x values', explanation: '$2^0 = 1$ and $2^2 = 4$.' }
          ], completionMessage: 'Exponential equations quadratic in form: substitute $u = b^x$, solve, convert back.' }
        ],

        visualizations: [
          {
            render: (containerId) => {
              Viz.plotFunction(containerId, [
                x => Math.pow(2, x),
                x => Math.log2(Math.max(0.001, x))
              ], {
                xMin: -4, xMax: 8, yMin: -4, yMax: 10,
                labels: ['y = 2ˣ', 'y = log₂(x)'],
                title: 'Exponential and Its Inverse (Logarithm)',
                width: 550, height: 400
              });
            }
          }
        ],

        stuckGuide: {
          html: `
            <div class="callout callout-tip">
              <h4>🧠 Exponent/Log Problem Strategy</h4>
              <ol>
                <li><strong>Exponential equation:</strong> Try to express both sides with the same base. If impossible, take $\\log$ of both sides.</li>
                <li><strong>Logarithmic equation:</strong> Combine logs using product/quotient rules, convert to exponential form, solve the resulting equation.</li>
                <li><strong>Always check domain:</strong> $\\log_b(x)$ requires $x \\gt 0$. Reject extraneous solutions.</li>
              </ol>
            </div>
          `
        }
      }
    ]
  });
})();
