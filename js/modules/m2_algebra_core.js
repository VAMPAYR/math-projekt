/* ============================================================
   MODULE 2: Beginning Algebra (8 topics)
   Source: OpenStax Beginning & Intermediate Algebra (Chapters 1-6)
   ============================================================ */
(function() {
if (!window.MATH_MODULES) window.MATH_MODULES = [];

const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

window.MATH_MODULES.push({
id: 'beginning-algebra',
order: 2,
title: 'Beginning Algebra',
description: 'Using letters for unknown numbers. Solving equations, graphing lines, and working with inequalities. Requires: arithmetic (Module 1).',
topics: [

/* ============================================================
   TOPIC 2.1: Variables, Expressions & Order of Operations
   ============================================================ */
{
  id: 'variables-expressions',
  title: 'Variables, Expressions & Order of Operations',
  description: 'The transition from arithmetic to algebra: using letters to represent unknown quantities and the rules for evaluating expressions.',
  prereqRecap: [
    { term: 'Number', definition: 'An abstract object used to count or measure. Natural numbers: $0, 1, 2, \\ldots$ Integers include negatives: $\\ldots, -2, -1, 0, 1, 2, \\ldots$ (Module 1).' },
    { term: 'Operation', definition: 'A rule that takes numbers and produces a number: addition (+), subtraction (−), multiplication (�:), division (÷).' },
    { term: 'Expression', definition: 'A combination of numbers, variables, and operations. Example: $3x + 5$. An expression does NOT have an equals sign.' },
    { term: 'Equation', definition: 'A statement that two expressions are equal: $3x + 5 = 14$. Contains an equals sign (=).' }
  ],
  whyExists: { html: `
    <p><strong>Why do we use variables?</strong> Arithmetic solves specific problems: "What is $3 + 5$?" Algebra solves <em>classes</em> of problems: "What is $x$ if $x + 5 = 8$?" A variable is a letter that represents a number we do not know yet.</p>
    <p>Variables transform mathematics from a calculator into a <strong>problem-solving engine</strong>. The equation $F = ma$ (Newton's second law) describes the relationship between force, mass, and acceleration for ALL objects, not just one specific case.</p>
    ${WHY('Why letters?', '<p>François Viète (1540-1603) introduced the systematic use of letters: vowels for unknowns and consonants for known quantities. René Descartes (1637) standardized using $x, y, z$ for unknowns and $a, b, c$ for constants. Letters are arbitrary symbols; what matters is that they represent quantities that can vary.</p>')}
  ` },
  hook: { html: `<div class="callout callout-puzzle"><h4>🧩 Puzzle: The Broken Calculator</h4>
    <p>A calculator can only show the answer, not the steps. It displays: "? + 7 = 15." What is "?"</p>
    <p>You just solved your first algebraic equation: $x + 7 = 15$, so $x = 8$. Algebra is the discipline of finding these unknowns systematically.</p></div>` },
  concept: { html: `
    <div class="callout callout-key"><h4>Key Vocabulary</h4>
    <ul>
      <li><strong>Variable:</strong> A letter representing an unknown or varying quantity. $x$, $y$, $n$, $t$ are common choices.</li>
      <li><strong>Constant:</strong> A fixed number. In $3x + 5$, the number 5 is a constant.</li>
      <li><strong>Coefficient:</strong> The number multiplied by a variable. In $3x$, the coefficient is 3. In $x$ (alone), the coefficient is 1.</li>
      <li><strong>Term:</strong> A product of numbers and variables. $3x$, $-5y^2$, and $7$ are all terms.</li>
      <li><strong>Like Terms:</strong> Terms with the same variable(s) raised to the same power(s). $3x$ and $7x$ are like terms. $3x$ and $3x^2$ are NOT.</li>
    </ul></div>
    <div class="callout callout-key"><h4>Order of Operations (PEMDAS/BODMAS)</h4>
    <p>When an expression contains multiple operations, evaluate in this order:</p>
    <ol>
      <li><strong>P</strong>arentheses (innermost first)</li>
      <li><strong>E</strong>xponents (powers and roots)</li>
      <li><strong>M</strong>ultiplication and <strong>D</strong>ivision (left to right)</li>
      <li><strong>A</strong>ddition and <strong>S</strong>ubtraction (left to right)</li>
    </ol>
    ${WHY('Why this specific order?', '<p>The order is a <strong>convention</strong> agreed upon by mathematicians to eliminate ambiguity. Without it, $2 + 3 \\times 4$ could mean $(2+3) \\times 4 = 20$ or $2 + (3 \\times 4) = 14$. The convention says multiplication before addition, so the answer is 14. This convention is universal in mathematics, science, and programming.</p>')}</div>
    <div class="callout callout-key"><h4>Combining Like Terms</h4>
    <p>$3x + 5x = (3+5)x = 8x$ (by the distributive property).</p>
    <p>$4x^2 + 3x - 2x^2 + 7x = (4-2)x^2 + (3+7)x = 2x^2 + 10x$.</p>
    ${WHY('Why can we combine like terms?', '<p>The <strong>distributive property</strong> justifies this: $3x + 5x = (3+5)x = 8x$. We are factoring out the common variable part. Terms with DIFFERENT variables or powers cannot be combined because $x$ and $x^2$ represent fundamentally different quantities.</p>')}</div>
  ` },
  definition: { html: `
    <p><strong>Algebraic Expression:</strong> A mathematical phrase containing numbers, variables, and operations. No equals sign.</p>
    <p><strong>Evaluating an Expression:</strong> Substituting specific values for variables and computing the result using order of operations.</p>
    <p><strong>Simplifying an Expression:</strong> Combining like terms and applying properties to write the expression in a shorter equivalent form.</p>
  ` },
  examples: [{
    title: 'Evaluating and Simplifying',
    problem: 'Evaluate $3x^2 - 2x + 4$ when $x = -2$, then simplify $5(2x - 3) + 4x$.',
    steps: [
      { title: 'Substitute $x = -2$', content: '$3(-2)^2 - 2(-2) + 4$', why: 'Replace every $x$ with $(-2)$. Use parentheses around negative numbers to avoid sign errors.' },
      { title: 'Apply exponents first', content: '$3(4) - 2(-2) + 4 = 12 + 4 + 4 = 20$', why: '$(-2)^2 = (-2)(-2) = 4$, not $-4$. The parentheses ensure the negative is squared too.' },
      { title: 'Simplify $5(2x-3) + 4x$', content: '$10x - 15 + 4x = 14x - 15$', why: 'Distribute the 5: $5 \\cdot 2x = 10x$, $5 \\cdot (-3) = -15$. Then combine like terms: $10x + 4x = 14x$.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a variable?', back: 'A letter representing an unknown quantity. In 3x+5, x is the variable. It stands for a number we want to find.' },
      { type: 'why', front: 'Why use letters for unknowns?', back: 'Letters can be manipulated: x + x = 2x. They let us describe patterns for ALL numbers, not just specific cases.' },
      { type: 'define', front: 'Expression vs Equation?', back: 'Expression: no equals sign (3x + 5). Equation: equals sign (3x + 5 = 14). You SOLVE equations, SIMPLIFY expressions.' },
      { type: 'how', front: 'How do you combine like terms?', back: 'Same variable, same power: add coefficients. 3x + 7x = 10x. Cannot combine 3x and 3x^2 (different powers).' },
      { type: 'why', front: 'Why can we add the same thing to both sides?', back: 'An equation is a balance. Adding equal amounts to both sides keeps them equal. This is the Addition Property of Equality.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'In the expression $7x^2 - 3x + 9$, what is the coefficient of $x$?', options: ['7', '-3', '9', '2'], correctIndex: 1, hint: '<p>The coefficient is the number directly multiplied by $x$ (not $x^2$).</p>', correctExplanation: 'The term containing $x$ (to the first power) is $-3x$. The coefficient is $-3$.', wrongExplanations: { 0: '7 is the coefficient of $x^2$, not $x$.', 2: '9 is a constant term (no variable attached).', 3: '2 is the exponent on $x^2$, not a coefficient.' } },
    { difficulty: 'easy', question: 'Evaluate: $2 + 3 \\times 4$', options: ['20', '14', '24', '9'], correctIndex: 1, hint: '<p>Order of operations: multiplication before addition.</p>', correctExplanation: 'Multiplication first: $3 \\times 4 = 12$. Then addition: $2 + 12 = 14$.', wrongExplanations: { 0: 'You added first: $(2+3) \\times 4 = 20$. Multiplication comes before addition.', 2: '$24 = 2 \\times 3 \\times 4$. The $+$ is addition, not multiplication.', 3: 'No standard order of operations produces 9 here.' } },
    { difficulty: 'medium', question: 'Simplify: $3(x + 4) - 2(x - 1)$', options: ['$x + 14$', '$x + 10$', '$5x + 10$', '$x + 3$'], correctIndex: 0, hint: '<p>Distribute both constants, then combine like terms.</p>', correctExplanation: '$3x + 12 - 2x + 2 = x + 14$. Note: $-2(x-1) = -2x + 2$, not $-2x - 2$. Distributing $-2$ flips the sign of $-1$.', wrongExplanations: { 1: 'Check your distribution of $-2(-1)$. It is $+2$, not $-2$.', 2: 'You did not subtract the $2x$ term. $3x - 2x = x$, not $5x$.', 3: '$12 + 2 = 14$, not $3$.' } },
    { difficulty: 'medium', question: 'Evaluate $(-3)^2 - 3^2$:', options: ['0', '18', '-18', '6'], correctIndex: 0, hint: '<p>$(-3)^2$ means $(-3)(-3)$, while $-3^2$ means $-(3^2)$. But here we have $3^2$ without a leading negative.</p>', correctExplanation: '$(-3)^2 = 9$ and $3^2 = 9$. So $9 - 9 = 0$.', wrongExplanations: { 1: '$(-3)^2 = 9$, not $-9$. The parentheses square the entire $-3$.', 2: 'Both terms equal 9 (not one being $-9$), so the difference is 0.', 3: 'The result is 0 because both squares produce the same value.' } },
    { difficulty: 'hard', question: 'Simplify: $2x - [3 - (4x + 1)]$', options: ['$6x - 2$', '$-2x + 4$', '$6x - 4$', '$2x - 4$'], correctIndex: 0, hint: '<p>Work from the innermost grouping outward. First simplify $(4x+1)$, then apply the outer subtraction.</p>', correctExplanation: 'Inner: $3 - (4x+1) = 3 - 4x - 1 = 2 - 4x$. Outer: $2x - (2-4x) = 2x - 2 + 4x = 6x - 2$.', wrongExplanations: { 1: 'The bracket introduces a double negative: $-[-(4x)] = +4x$, giving $6x$, not $-2x$.', 2: '$3 - 1 = 2$, then $-(2) = -2$, not $-4$.', 3: 'You missed the double negation on $4x$. $2x + 4x = 6x$.' } },
    { difficulty: 'hard', question: 'If $x = -1$ and $y = 3$, evaluate $\\frac{x^2 - 2xy + y^2}{x + y}$:', options: ['8', '2', '4', '-8'], correctIndex: 0, hint: '<p>Notice that $x^2 - 2xy + y^2 = (x-y)^2$.</p>', correctExplanation: '$(x-y)^2 = (-1-3)^2 = (-4)^2 = 16$. $x+y = -1+3 = 2$. $\\frac{16}{2} = 8$.', wrongExplanations: { 1: 'Numerator is $(-4)^2 = 16$, not $4$. Then $16/2 = 8$.', 2: '$(-1-3)^2 = 16$, not $8$. Remember to square the $-4$.', 3: 'The numerator is positive ($(-4)^2 = 16$), and the denominator is positive ($2$). Result is $+8$.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'Simplify: $5x + 3x$', accept: ['8x'], placeholder: 'e.g. 8x', explanation: '$5x + 3x = 8x$ (combine like terms).' },
    { difficulty: 'easy', question: 'Evaluate $2^4$:', accept: [16, '16'], placeholder: 'Enter a number', explanation: '$2^4 = 2 \\times 2 \\times 2 \\times 2 = 16$.' },
    { difficulty: 'medium', question: 'Simplify: $4(2x - 3) + 5$', accept: ['8x-7', '8x - 7'], placeholder: 'e.g. 8x-7', hint: '<p>Distribute the 4, then combine constants.</p>', explanation: '$8x - 12 + 5 = 8x - 7$.' },
    { difficulty: 'hard', question: 'If $x = -2$, evaluate $x^3 - 3x^2 + 2x - 1$:', accept: [-25, '-25'], placeholder: 'Enter a number', explanation: '$(-2)^3 - 3(-2)^2 + 2(-2) - 1 = -8 - 12 - 4 - 1 = -25$.' },
    { difficulty: 'easy', question: 'Solve: $x - 7 = 3$. $x =$?', accept: [10, '10'], placeholder: 'Number', explanation: '$x = 3 + 7 = 10$.' },
    { difficulty: 'medium', question: 'Solve: $\\frac{x}{4} = 5$. $x =$?', accept: [20, '20'], placeholder: 'Number', explanation: '$x = 5 \\times 4 = 20$.' },
    { difficulty: 'hard', question: 'Solve: $|2x - 3| = 7$. Solutions:', accept: ['5, -2', '-2, 5', '5,-2'], placeholder: 'x values', explanation: '$2x - 3 = 7 \\Rightarrow x = 5$. $2x - 3 = -7 \\Rightarrow x = -2$.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each operation to its PEMDAS priority (1=first, 6=last):', pairs: [
      { left: 'Parentheses', right: '1st priority' },
      { left: 'Exponents', right: '2nd priority' },
      { left: 'Multiplication', right: '3rd priority' },
      { left: 'Addition', right: '5th priority' }
    ] }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Simplify $4(2x - 3) - 3(x + 1)$ step by step.', steps: [
      { content: 'Distribute 4: $8x - 12$.' },
      { content: 'Distribute $-3$: $-3x - 3$.' },
      { content: 'Combine: $8x - 3x = 5x$.' },
      { content: 'Constants: $-12 - 3 = -15$.' },
      { content: 'Result: $5x - 15$.' }
    ], explanation: 'Distributive property, then combine like terms.' }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Distributive property:', expression: '$a(b + c) = ab +$ {{0}}', blanks: [ { accept: ['ac'], size: 4 } ], explanation: '$a(b+c) = ab + ac$.' },
    { difficulty: 'medium', context: 'Combining like terms:', expression: '$7x^2 + 3x - 2x^2 + x =$ {{0}} $+$ {{1}}', blanks: [ { accept: ['5x^2'], size: 5 }, { accept: ['4x'], size: 4 } ], explanation: '$7x^2 - 2x^2 = 5x^2$ and $3x + x = 4x$.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'A rectangle has length $2x + 3$ and width $x - 1$.', parts: [
      { question: 'Perimeter $P = 2l + 2w =$?', accept: ['6x+4', '6x + 4'], placeholder: 'Simplified expression', explanation: '$2(2x+3) + 2(x-1) = 4x+6+2x-2 = 6x+4$.' },
      { question: 'Area $A = l \\cdot w =$?', accept: ['2x^2+x-3', '2x^2 + x - 3'], placeholder: 'Expanded product', explanation: '$(2x+3)(x-1) = 2x^2-2x+3x-3 = 2x^2+x-3$.' }
    ], completionMessage: 'Expressions model geometric quantities.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Expression Strategy</h4>
    <ol><li><strong>PEMDAS/BODMAS</strong>: Parentheses → Exponents → Multiply/Divide → Add/Subtract.</li>
    <li><strong>Distribution:</strong> $a(b+c) = ab + ac$. Watch signs: $-2(x-3) = -2x + 6$.</li>
    <li><strong>Like Terms:</strong> Only combine terms with identical variable parts. $3x + 5x = 8x$, but $3x + 5x^2$ cannot be simplified.</li></ol></div>` }
},

/* ============================================================
   TOPIC 2.2: Solving Linear Equations in One Variable
   ============================================================ */
{
  id: 'linear-equations-one-var',
  title: 'Solving Linear Equations in One Variable',
  description: 'The systematic process of isolating a variable to find its value. The foundation of all equation-solving in mathematics.',
  prereqRecap: [
    { term: 'Variable', definition: 'A letter representing an unknown quantity. Example: $x$ in $2x + 3 = 7$ (Topic 2.1).' },
    { term: 'Expression', definition: 'A combination of numbers, variables, and operations without an equals sign (Topic 2.1).' },
    { term: 'Equation', definition: 'A statement that two expressions are equal: $\\text{left side} = \\text{right side}$.' },
    { term: 'Inverse Operation', definition: 'An operation that "undoes" another. Addition and subtraction are inverses. Multiplication and division are inverses. $+5$ is undone by $-5$; $\\times 3$ is undone by $\\div 3$.' }
  ],
  whyExists: { html: `
    <p><strong>Why solve equations?</strong> An equation encodes a real-world constraint. "If a phone costs $x$ dollars and tax is 8%, the total is $1.08x = 54$. What is $x$?" Solving the equation reveals $x = 50$.</p>
    <p>Every science, engineering, and economics problem reduces to solving equations. The techniques here generalize to <em>all</em> mathematics: the same principles apply to quadratic, exponential, and differential equations.</p>
    ${WHY('Why can we "do the same thing to both sides"?', '<p>An equation states that two expressions are equal. If $A = B$, then performing the same operation on both sides preserves equality: $A + c = B + c$, $A \\cdot c = B \\cdot c$ (for $c \\neq 0$). This is the <strong>addition property of equality</strong> and the <strong>multiplication property of equality</strong>, both consequences of the field axioms from Module 1.</p>')}
  ` },
  hook: { html: `<div class="callout callout-puzzle"><h4>🧩 Puzzle: The Balance Scale</h4>
    <p>Imagine a balance scale perfectly balanced with $2x + 5$ grams on the left and $13$ grams on the right. To find $x$, you remove 5 grams from BOTH sides (keeping balance): $2x = 8$. Then divide both sides by 2: $x = 4$.</p>
    <p>This "balance" metaphor is the core idea: whatever you do to one side, you MUST do to the other.</p></div>` },
  formalDefinitions: [
      { term: 'Linear Equation', symbol: '$ax + b = 0$', definition: 'An equation where the variable appears only to the first power. General form: $ax + b = 0$ where $a \\neq 0$. Has exactly one solution: $x = -b/a$.' },
      { term: 'Solution Set', symbol: '$\\{x : ax + b = 0\\}$', definition: 'The set of all values of $x$ that make the equation true. For a linear equation in one variable, the solution set contains exactly one element, or is empty (inconsistent), or equals $\\mathbb{R}$ (identity).' },
      { term: 'Equivalent Equations', symbol: '', definition: 'Two equations with identical solution sets. Operations that preserve equivalence: adding/subtracting the same value from both sides, multiplying/dividing both sides by a nonzero constant.' }
    ],
    graphExplorer: [
      { latex: 'y = 2x + 1' },
      { latex: 'y = -x + 3' },
      { latex: 'y = 0.5x - 2' }
    ],
    background: {
      title: 'Why Do We Solve Equations?',
      content: '<p>An equation is a statement that two expressions are equal. <strong>Solving</strong> an equation means finding all values that make this statement true.</p><p><strong>Why we add/subtract to both sides:</strong> An equation is a balance. If you add the same weight to both sides of a balance scale, it stays balanced. This is the Addition Property of Equality: if $a = b$, then $a + c = b + c$.</p><p><strong>Why we multiply/divide both sides:</strong> Multiplication Property of Equality: if $a = b$, then $ac = bc$ (provided $c \\neq 0$). Division by zero is forbidden because it destroys information: $0 \\cdot 5 = 0 \\cdot 7$ does not mean $5 = 7$.</p><p>Every step in solving an equation must be <em>reversible</em>. If you do something that loses information (like squaring both sides), you must check your answers because you may have introduced false solutions.</p>'
    },
    mathGrammar: [
      { question: 'Why do we "do the same thing to both sides"?', answer: 'An equation is a balance scale. The left side weighs the same as the right. If you add 5 kg to just one side, the scale tips. You must add 5 kg to BOTH sides to keep it balanced. This is the golden rule. Everything in equation-solving comes back to this idea.' },
      { question: 'How do I decide which operation to use?', answer: 'Look at what is happening TO the variable and do the OPPOSITE. If $x$ is being added to ($x + 3 = 7$), subtract. If $x$ is being multiplied ($3x = 12$), divide. If $x$ is being subtracted from ($x - 5 = 2$), add. You are peeling away layers. Whatever was done to the variable, do the opposite to undo it.' },
      { question: 'What does "isolate the variable" mean?', answer: 'Get the variable alone on one side of the equation. Everything else goes to the other side using inverse operations. $3x + 5 = 14$ becomes $3x = 9$ (subtract 5), then $x = 3$ (divide by 3). Each step peels away one layer.' },
      { question: 'When is an equation unsolvable?', answer: 'When simplification leads to a false statement like $0 = 5$. This means no value of $x$ makes the equation true. Example: $2x + 1 = 2x + 5$ simplifies to $1 = 5$, which is never true.' },
      { question: 'What does a variable represent?', answer: 'A variable is a placeholder for an unknown number. The letter $x$ is the most common, but any letter works. In $3x + 2 = 11$, the variable $x$ represents the one specific number that makes this statement true.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 400 250" width="400" height="250" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="220" x2="380" y2="220" stroke="#94a3b8" stroke-width="1"/>
  <line x1="60" y1="20" x2="60" y2="230" stroke="#94a3b8" stroke-width="1"/>
  <line x1="80" y1="200" x2="340" y2="60" stroke="#3b82f6" stroke-width="2.5"/>
  <line x1="120" y1="178" x2="260" y2="178" stroke="#10b981" stroke-width="1.5" stroke-dasharray="6,4"/>
  <line x1="260" y1="178" x2="260" y2="102" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="185" y="195" fill="#10b981" font-size="13" text-anchor="middle" font-family="Inter,sans-serif">run = Δx</text>
  <text x="275" y="145" fill="#ef4444" font-size="13" font-family="Inter,sans-serif">rise = Δy</text>
  <circle cx="120" cy="178" r="4" fill="#f59e0b"/>
  <text x="100" y="170" fill="#f59e0b" font-size="11" font-family="Inter,sans-serif">(x₁, y₁)</text>
  <circle cx="260" cy="102" r="4" fill="#f59e0b"/>
  <text x="265" y="95" fill="#f59e0b" font-size="11" font-family="Inter,sans-serif">(x₂, y₂)</text>
  <text x="350" y="80" fill="#3b82f6" font-size="14" font-family="Inter,sans-serif">y = mx + b</text>
  <text x="190" y="30" fill="#e2e8f0" font-size="14" font-family="Inter,sans-serif" text-anchor="middle">slope m = rise / run = Δy / Δx</text>
</svg>
</div>
<p class="math-diagram-label">The slope of a line: rise over run between two points</p>

    <div class="callout callout-key"><h4>The Equation-Solving Algorithm</h4>
    <ol>
      <li><strong>Simplify</strong> each side separately (distribute, combine like terms).</li>
      <li><strong>Collect variable terms</strong> on one side (usually left) by adding/subtracting.</li>
      <li><strong>Collect constant terms</strong> on the other side by adding/subtracting.</li>
      <li><strong>Isolate the variable</strong> by dividing (or multiplying) both sides by its coefficient.</li>
      <li><strong>Check</strong> by substituting the solution back into the original equation.</li>
    </ol></div>
    <div class="callout callout-key"><h4>Special Cases</h4>
    <ul>
      <li><strong>Identity:</strong> Simplifying gives $0 = 0$ or $x = x$. The equation is true for ALL values. Infinitely many solutions.</li>
      <li><strong>Contradiction:</strong> Simplifying gives $0 = 5$ or similar impossibility. NO solution exists.</li>
    </ul>
    ${WHY('Why check for special cases?', '<p>A linear equation $ax + b = cx + d$ has exactly one solution when $a \\neq c$. When $a = c$ AND $b = d$, the equation is an identity. When $a = c$ AND $b \\neq d$, it is a contradiction. Recognizing these cases prevents wasted effort.</p>')}</div>
  
    ${WHY('Why do we "undo" operations in reverse order?', '<p>Operations are applied in PEMDAS order. To undo them, reverse the order: undo addition/subtraction first, then multiplication/division. In 3x + 5 = 14: first undo +5 (subtract 5), then undo 3* (divide by 3). Like removing layers of clothing: last on, first off.</p>')}
    ${WHY('What does "no solution" mean for an equation?', '<p>Some equations simplify to a false statement like 0 = 5. This means no value of x makes the equation true. Example: 2(x+1) = 2x + 5 simplifies to 2 = 5, which is never true. The lines are parallel and never intersect.</p>')}` },
  definition: { html: `
    <p><strong>Linear Equation in One Variable:</strong> An equation that can be written as $ax + b = 0$ where $a \\neq 0$. The solution is $x = -\\frac{b}{a}$.</p>
    <p><strong>Solution:</strong> A value of the variable that makes the equation a true statement.</p>
    <p><strong>Equivalent Equations:</strong> Equations with the same solution set. $2x = 6$ and $x = 3$ are equivalent.</p>
  ` },
  examples: [{
    title: 'Solving a Multi-Step Equation',
    problem: 'Solve: $3(2x - 4) = 5x + 2$',
    steps: [
      { title: 'Distribute', content: '$6x - 12 = 5x + 2$', why: '$3 \\cdot 2x = 6x$ and $3 \\cdot (-4) = -12$.' },
      { title: 'Collect variable terms on the left', content: '$6x - 5x - 12 = 2$, so $x - 12 = 2$', why: 'Subtract $5x$ from both sides to eliminate $x$ from the right.' },
      { title: 'Isolate $x$', content: '$x = 2 + 12 = 14$', why: 'Add 12 to both sides to move the constant to the right.' },
      { title: 'Check', content: 'Left: $3(2(14) - 4) = 3(24) = 72$. Right: $5(14) + 2 = 72$. ✓', why: 'Both sides equal 72 when $x = 14$, confirming the solution.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What makes an equation linear?', back: 'Variable to the first power only. No x^2, sqrt(x). Graph is a straight line. Form: ax + b = c.' },
      { type: 'how', front: 'When multiply vs divide to solve?', back: 'Variable multiplied (3x=12): divide. Variable divided (x/4=3): multiply. Use the inverse operation.' },
      { type: 'why', front: 'Why do opposite operations?', back: 'Each operation has an inverse: +/- cancel, */div cancel. Applying the inverse isolates the variable.' },
      { type: 'why', front: 'Why isolate the variable?', back: 'To find what number the letter represents. Undo operations until x = [answer].' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'Solve: $x + 7 = 12$', options: ['$x = 5$', '$x = 19$', '$x = -5$', '$x = 7$'], correctIndex: 0, hint: '<p>Subtract 7 from both sides.</p>', correctExplanation: '$x = 12 - 7 = 5$. Check: $5 + 7 = 12$ ✓.', wrongExplanations: { 1: 'You added instead of subtracting. $x + 7 = 12$ means $x = 12 - 7$.', 2: '$-5 + 7 = 2 \\neq 12$. The sign is wrong.', 3: '7 is what we subtract, not the answer.' } },
    { difficulty: 'easy', question: 'Solve: $3x = -18$', options: ['$x = -6$', '$x = 6$', '$x = -15$', '$x = -54$'], correctIndex: 0, hint: '<p>Divide both sides by 3.</p>', correctExplanation: '$x = \\frac{-18}{3} = -6$. Check: $3(-6) = -18$ ✓.', wrongExplanations: { 1: '$3(6) = 18 \\neq -18$. The sign must be negative.', 2: 'You subtracted 3 instead of dividing. $\\frac{-18}{3} = -6$.', 3: 'You multiplied instead of dividing: $-18 \\times 3 = -54$.' } },
    { difficulty: 'medium', question: 'Solve: $\\frac{x}{4} - 3 = 5$', options: ['$x = 2$', '$x = 32$', '$x = 8$', '$x = 20$'], correctIndex: 1, hint: '<p>First add 3 to both sides, then multiply by 4.</p>', correctExplanation: '$\\frac{x}{4} = 8$, so $x = 32$. Check: $\\frac{32}{4} - 3 = 8 - 3 = 5$ ✓.', wrongExplanations: { 0: 'You divided $8 \\div 4 = 2$ but should have multiplied: $8 \\times 4 = 32$.', 2: '$\\frac{8}{4} - 3 = -1 \\neq 5$. You solved $\\frac{x}{4} = 8$ incorrectly.', 3: 'You computed $5 \\times 4 = 20$ but forgot to add 3 first.' } },
    { difficulty: 'medium', question: 'Solve: $5(x - 2) = 3(x + 4)$', options: ['$x = 11$', '$x = -11$', '$x = 1$', '$x = 7$'], correctIndex: 0, hint: '<p>Distribute both sides, collect $x$ terms on one side.</p>', correctExplanation: '$5x - 10 = 3x + 12$. $2x = 22$. $x = 11$. Check: $5(9) = 45$, $3(15) = 45$ ✓.', wrongExplanations: { 1: 'Sign error. $-10 - 12 = -22$, and dividing by $+2$ gives $+11$.', 2: 'Recheck distribution: $5(-2) = -10$ and $3(4) = 12$, giving $2x = 22$, not $2x = 2$.', 3: 'You may have computed $\\frac{22 - 8}{2} = 7$. The correct subtraction is $-10 - 12 = -22$ moved: $2x = 22$.' } },
    { difficulty: 'hard', question: 'Classify and solve: $2(3x + 1) = 6x + 2$', options: ['$x = 0$', 'No solution', 'All real numbers (identity)', '$x = 1$'], correctIndex: 2, hint: '<p>Distribute and simplify both sides. What happens?</p>', correctExplanation: '$6x + 2 = 6x + 2$. Subtracting $6x$ from both sides: $2 = 2$. This is always true, so EVERY real number is a solution. This is an identity.', wrongExplanations: { 0: '$x = 0$ is ONE solution, but ALL values of $x$ satisfy this equation.', 1: 'It is the opposite: every $x$ works, not zero. "No solution" would mean $0 = 5$ or similar.', 3: '$x = 1$ is one correct value, but so is $x = 2$, $x = -100$, etc. Every number works.' } },
    { difficulty: 'hard', question: 'Solve: $\\frac{x}{3} + \\frac{x}{6} = 5$', options: ['$x = 10$', '$x = 15$', '$x = 6$', '$x = 30$'], correctIndex: 0, hint: '<p>Multiply every term by the LCD (6) to clear fractions.</p>', correctExplanation: 'LCD = 6. $6 \\cdot \\frac{x}{3} + 6 \\cdot \\frac{x}{6} = 6 \\cdot 5$. $2x + x = 30$. $3x = 30$. $x = 10$. Check: $\\frac{10}{3} + \\frac{10}{6} = \\frac{20}{6} + \\frac{10}{6} = \\frac{30}{6} = 5$ ✓.', wrongExplanations: { 1: '$3(15) = 45 \\neq 30$. Recheck your LCD multiplication.', 2: '$2(6) + 6 = 18 \\neq 30$.', 3: 'You multiplied 5 by 6 but then forgot to divide: $3x = 30 \\Rightarrow x = 10$.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'Solve: $x + 7 = 12$. $x =$?', accept: [5, '5'], placeholder: 'x = ?', explanation: '$x = 12 - 7 = 5$.' },
    { difficulty: 'medium', question: 'Solve: $3x - 9 = 0$. $x =$?', accept: [3, '3'], placeholder: 'x = ?', explanation: '$3x = 9 \\Rightarrow x = 3$.' },
    { difficulty: 'medium', question: 'Solve: $5x + 2 = 3x + 10$. $x =$?', accept: [4, '4'], placeholder: 'x = ?', hint: '<p>Get all $x$ terms on one side.</p>', explanation: '$5x - 3x = 10 - 2 \\Rightarrow 2x = 8 \\Rightarrow x = 4$.' },
    { difficulty: 'hard', question: 'Solve: $\\frac{x}{3} + \\frac{x}{4} = 7$. $x =$?', accept: [12, '12'], placeholder: 'x = ?', hint: '<p>Multiply everything by 12 to clear fractions.</p>', explanation: '$4x + 3x = 84 \\Rightarrow 7x = 84 \\Rightarrow x = 12$.' },
    { difficulty: 'easy', question: 'The y-intercept of $y = 3x + 7$ is:', accept: [7, '7'], placeholder: 'Number', explanation: 'Set $x = 0$: $y = 7$.' },
    { difficulty: 'medium', question: 'Find slope of line through $(1, 2)$ and $(3, 8)$:', accept: [3, '3'], placeholder: 'm = ?', explanation: '$m = (8-2)/(3-1) = 6/2 = 3$.' },
    { difficulty: 'hard', question: 'Write equation of line perpendicular to $y = 2x + 1$ through $(0, 3)$:', accept: ['y=-x/2+3', 'y=-0.5x+3'], placeholder: 'y = ?', explanation: 'Perpendicular slope: $-1/2$. $y = -x/2 + 3$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Solve $2(x + 3) = 14$ step by step.', steps: [
      { content: 'Distribute: $2x + 6 = 14$.' },
      { content: 'Subtract 6: $2x = 8$.' },
      { content: 'Divide by 2: $x = 4$.' },
      { content: 'Check: $2(4 + 3) = 2(7) = 14$ ✓' }
    ], explanation: 'Always check your answer by substituting back.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each equation type to its number of solutions:', pairs: [
      { left: '$2x + 3 = 7$', right: 'Exactly one solution' },
      { left: '$2x + 3 = 2x + 3$', right: 'Infinitely many (identity)' },
      { left: '$2x + 3 = 2x + 5$', right: 'No solution (contradiction)' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Solving equations:', expression: 'To isolate $x$ in $5x = 20$, {{0}} both sides by {{1}}.', blanks: [ { accept: ['divide'], size: 7 }, { accept: ['5'], size: 3 } ], explanation: 'Divide both sides by the coefficient of $x$.' },
    { difficulty: 'medium', context: 'Clearing fractions:', expression: 'To eliminate fractions in $\\frac{x}{3} + \\frac{x}{4} = 7$, multiply every term by the LCD: {{0}}.', blanks: [ { accept: ['12'], size: 4 } ], explanation: 'LCD of 3 and 4 is 12.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Classify and solve: $4(x-2) = 4x + 3$.', parts: [
      { question: 'After distributing: $4x - 8 = 4x + 3$. Subtract $4x$:', accept: ['-8 = 3', '-8=3'], placeholder: 'What remains?', explanation: '$-8 = 3$ (contradiction).' },
      { question: 'How many solutions?', accept: [0, '0', 'none', 'no solution'], placeholder: 'Number', explanation: 'A false statement means no solution.' },
      { question: 'This equation is a (identity/contradiction/conditional):', accept: ['contradiction'], placeholder: 'Type', explanation: 'A false statement like $-8 = 3$ is a contradiction.' }
    ], completionMessage: 'Three types: conditional (one solution), identity (all solutions), contradiction (no solution).' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Equation-Solving Strategy</h4>
    <ol><li><strong>Clear fractions first</strong> by multiplying by the LCD.</li>
    <li><strong>Distribute</strong> any parentheses.</li>
    <li><strong>Collect</strong> variables on one side, constants on the other.</li>
    <li><strong>Divide</strong> to isolate the variable.</li>
    <li><strong>Check</strong> by substituting back into the ORIGINAL equation.</li></ol></div>` }
},

/* ============================================================
   TOPIC 2.3: Integer Operations & the Number Line
   ============================================================ */
{
  id: 'integer-operations',
  title: 'Integer Operations & the Number Line',
  description: 'Addition, subtraction, multiplication, and division with positive and negative integers. The sign rules and why they work.',
  prereqRecap: [
    { term: 'Integer', definition: 'A whole number, positive, negative, or zero: $\\mathbb{Z} = \\{\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots\\}$ (Module 1).' },
    { term: 'Absolute Value', definition: 'The distance of a number from 0 on the number line. Written $|x|$. Always non-negative. $|5| = 5$ and $|-5| = 5$.' },
    { term: 'Number Line', definition: 'A straight line where each point corresponds to a real number. Numbers increase to the right and decrease to the left.' }
  ],
  whyExists: { html: `
    <p><strong>Why negative numbers?</strong> The natural numbers $\\{0, 1, 2, \\ldots\\}$ cannot solve $x + 5 = 2$. Negative integers extend the number line to the left of zero, making subtraction always possible within the integers.</p>
    <p>Real-world negatives: temperatures below zero, debts (negative balance), elevations below sea level, stock market losses.</p>
    ${WHY('Why does negative �: negative = positive?', '<p>Consider the pattern: $3 \\times (-2) = -6$, $2 \\times (-2) = -4$, $1 \\times (-2) = -2$, $0 \\times (-2) = 0$. Each step adds $+2$ to the result. Continuing: $(-1) \\times (-2) = 2$, $(-2) \\times (-2) = 4$. The pattern forces $(-)(-)=(+)$.</p><p>Formally: we need $(-1)(-1) + (-1)(1) = (-1)(-1+1) = (-1)(0) = 0$. Since $(-1)(1) = -1$, we get $(-1)(-1) = 1$.</p>')}
  ` },
  concept: { html: `
    <div class="callout callout-key"><h4>Sign Rules for Multiplication and Division</h4>
    <ul>
      <li>$(+)(+) = +$ and $(-)(-)= +$ (same signs → positive)</li>
      <li>$(+)(-) = -$ and $(-)(+) = -$ (different signs → negative)</li>
    </ul>
    ${WHY('Memory aid', '<p>"Agree = positive, disagree = negative." Two positives agree (+). Two negatives agree (+). A positive and negative disagree (−).</p>')}</div>
    <div class="callout callout-key"><h4>Addition of Integers</h4>
    <ul>
      <li><strong>Same sign:</strong> Add absolute values, keep the sign. $(-3) + (-5) = -(3+5) = -8$.</li>
      <li><strong>Different signs:</strong> Subtract absolute values, take the sign of the larger absolute value. $(-7) + 4 = -(7-4) = -3$.</li>
    </ul></div>
    <div class="callout callout-key"><h4>Subtraction as Addition</h4>
    <p>$a - b = a + (-b)$. Subtraction is adding the opposite.</p>
    <p>Example: $5 - (-3) = 5 + 3 = 8$.</p>
    ${WHY('Why does subtracting a negative give a positive?', '<p>Removing a debt is the same as gaining money. If you owe $3 ($-3$) and that debt is removed, you gain $3. Formally: $a - (-b) = a + (-(-b)) = a + b$ by double negation.</p>')}</div>
  ` },
  definition: { html: `
    <p><strong>Absolute Value:</strong> $|a| = a$ if $a \\geq 0$, and $|a| = -a$ if $a \\lt 0$. It measures distance from zero.</p>
    <p><strong>Additive Inverse:</strong> The additive inverse of $a$ is $-a$, because $a + (-a) = 0$.</p>
  ` },
  examples: [{
    title: 'Integer Arithmetic Practice',
    problem: 'Compute: (a) $(-8) + 5$, (b) $(-4)(-6)$, (c) $-12 \\div 3$, (d) $|(-3) - 7|$.',
    steps: [
      { title: '$(-8) + 5$', content: 'Different signs: $|{-}8| - |5| = 3$. Larger absolute value is 8 (negative), so result is $-3$.', why: 'When adding numbers with different signs, subtract and take the sign of the larger absolute value.' },
      { title: '$(-4)(-6)$', content: 'Same sign (both negative): $4 \\times 6 = 24$. Result is $+24$.', why: 'Two negatives multiplied give a positive.' },
      { title: '$-12 \\div 3$', content: 'Different signs: $12 \\div 3 = 4$. Result is $-4$.', why: 'Negative ÷ positive = negative.' },
      { title: '$|(-3) - 7|$', content: '$(-3) - 7 = -10$. $|-10| = 10$.', why: 'First compute the expression inside the absolute value, then take the absolute value (distance from 0).' }
    ]
  }],
  flashCards: [
      { type: 'why', front: 'Why does a negative times a negative equal a positive?', back: 'Pattern: -3*3=-9, -3*2=-6, -3*1=-3, -3*0=0, -3*(-1)=? Each step adds 3. So -3*(-1)=3. Negative*negative=positive.' },
      { type: 'how', front: 'How to add negative numbers?', back: 'Same sign: add magnitudes, keep sign. Different signs: subtract smaller from larger, take sign of the larger. -5+3 = -(5-3) = -2.' },
      { type: 'why', front: 'Why is subtracting a negative the same as adding?', back: '5-(-3) = 5+3 = 8. "Taking away a debt increases your balance." Formally: a-(-b) = a+b because -(-b) = b.' }
    ],
    exercises: [
    { difficulty: 'easy', question: '$(-5) + (-8) = $?', options: ['$-13$', '$13$', '$3$', '$-3$'], correctIndex: 0, hint: '<p>Same sign: add absolute values, keep the negative sign.</p>', correctExplanation: 'Both negative: $5 + 8 = 13$, sign is negative: $-13$.', wrongExplanations: { 1: 'Both numbers are negative, so the sum must be negative.', 2: 'You subtracted. When signs are the SAME, you ADD absolute values.', 3: 'This would be $(-5) + 8$ or $5 + (-8)$, not $(-5) + (-8)$.' } },
    { difficulty: 'easy', question: '$(-3)(7) = $?', options: ['$21$', '$-21$', '$-10$', '$10$'], correctIndex: 1, hint: '<p>Different signs → negative result.</p>', correctExplanation: '$3 \\times 7 = 21$. Different signs (negative �: positive) → $-21$.', wrongExplanations: { 0: 'Negative �: positive = negative, not positive.', 2: 'You added instead of multiplying: $(-3) + 7 = 4$, not $-10$.', 3: 'Multiplication, not addition. $3 \\times 7 = 21$.' } },
    { difficulty: 'medium', question: '$|(-4) - (-9)| = $?', options: ['$13$', '$-5$', '$5$', '$-13$'], correctIndex: 2, hint: '<p>First compute $(-4) - (-9) = (-4) + 9$, then take absolute value.</p>', correctExplanation: '$(-4) - (-9) = (-4) + 9 = 5$. $|5| = 5$.', wrongExplanations: { 0: '$(-4) + (-9) = -13$, but $-(-9) = +9$, not $-9$.', 1: 'Absolute value is always non-negative. $|{\\cdot}| \\geq 0$.', 3: 'Absolute value removes the sign. $|-13| = 13$, and $|-5| = 5$.' } },
    { difficulty: 'medium', question: '$\\frac{(-2)^3}{-4} = $?', options: ['$2$', '$-2$', '$-8$', '$8$'], correctIndex: 0, hint: '<p>$(-2)^3 = (-2)(-2)(-2)$. Then divide by $-4$.</p>', correctExplanation: '$(-2)^3 = -8$. $\\frac{-8}{-4} = 2$ (same signs → positive).', wrongExplanations: { 1: '$(-8) \\div (-4) = +2$, not $-2$. Same signs give positive.', 2: '$-8$ is the numerator, but you still need to divide by $-4$.', 3: '$(-2)^3 = -8$, not $+8$. An odd power preserves the negative sign.' } },
    { difficulty: 'hard', question: 'For which values of $x$ is $|x - 3| = 5$ true?', options: ['$x = 8$ only', '$x = -2$ only', '$x = 8$ and $x = -2$', '$x = 2$ and $x = 8$'], correctIndex: 2, hint: '<p>$|A| = 5$ means $A = 5$ or $A = -5$.</p>', correctExplanation: '$x - 3 = 5 \\Rightarrow x = 8$, or $x - 3 = -5 \\Rightarrow x = -2$. Both solutions are valid.', wrongExplanations: { 0: '$x = 8$ is one solution, but absolute value equations typically have two solutions.', 1: '$x = -2$ is one solution. You also need $x - 3 = 5$, giving $x = 8$.', 3: '$x = 2$: $|2-3| = 1 \\neq 5$. That is incorrect.' } },
    { difficulty: 'hard', question: 'Simplify: $-(-(-(-2)))$', options: ['$-2$', '$2$', '$-4$', '$4$'], correctIndex: 1, hint: '<p>Count the number of negation signs.</p>', correctExplanation: 'Start inside out: $(-2) \\to -(-2) = 2 \\to -(2) = -2 \\to -(-2) = 2$. Four negations cancel in pairs: even number of negations → positive. $(-1)^4 \\cdot 2 = 2$.', wrongExplanations: { 0: 'Four negations give an even number of sign flips. Even = positive.', 2: 'The operations are negations, not multiplications by 2.', 3: 'The number being negated is 2, not 4.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: '$(-5) + (-3) =$?', accept: [-8, '-8'], placeholder: 'Enter a number', explanation: 'Negative + negative: $-8$.' },
    { difficulty: 'easy', question: '$(-4) \\times (-6) =$?', accept: [24, '24'], placeholder: 'Enter a number', explanation: 'Negative times negative: $+24$.' },
    { difficulty: 'medium', question: '$(-2)^5 =$?', accept: [-32, '-32'], placeholder: 'Enter a number', explanation: 'Odd exponent: $-32$.' },
    { difficulty: 'hard', question: '$\\frac{(-3)^3}{(-3)^2} =$?', accept: [-3, '-3'], placeholder: 'Enter a number', explanation: '$(-3)^{3-2} = -3$.' },
    { difficulty: 'easy', question: '$(2x + 3) + (4x - 1) =$?', accept: ['6x+2', '6x + 2'], placeholder: 'Expression', explanation: '$2x + 4x = 6x$, $3 + (-1) = 2$.' },
    { difficulty: 'medium', question: '$(x + 2)(x - 3) =$?', accept: ['x^2-x-6', 'x^2 - x - 6'], placeholder: 'Expression', explanation: 'FOIL: $x^2 - 3x + 2x - 6 = x^2 - x - 6$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Compute $(-3)(4) + (-2)(-5) - 7$.', steps: [
      { content: '$(-3)(4) = -12$ (different signs = negative).' },
      { content: '$(-2)(-5) = 10$ (same signs = positive).' },
      { content: '$-12 + 10 = -2$.' },
      { content: '$-2 - 7 = -9$.' }
    ], explanation: 'Process each operation using sign rules, then combine.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each result\'s sign:', pairs: [
      { left: '$(+)(+)$', right: 'Positive' },
      { left: '$(+)(-)$', right: 'Negative' },
      { left: '$(-)(-) $', right: 'Positive' },
      { left: '$(-)(+)$', right: 'Negative' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Subtraction rule:', expression: '$a - b = a +$ {{0}}', blanks: [ { accept: ['(-b)', '-b'], size: 5 } ], explanation: 'Subtraction is adding the opposite.' },
    { difficulty: 'medium', context: 'Exponent sign rules:', expression: '$(-a)^n$ is negative when $n$ is {{0}}.', blanks: [ { accept: ['odd'], size: 5 } ], explanation: 'Odd exponents preserve the negative sign.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Evaluate $|(-3)^2 - (-2)^3| - |5 - 8|$.', parts: [
      { question: '$(-3)^2 =$?', accept: [9, '9'], placeholder: 'Number', explanation: '$(-3)^2 = 9$ (even power = positive).' },
      { question: '$(-2)^3 =$?', accept: [-8, '-8'], placeholder: 'Number', explanation: '$(-2)^3 = -8$ (odd power = negative).' },
      { question: '$9 - (-8) =$?', accept: [17, '17'], placeholder: 'Number', explanation: '$9 + 8 = 17$.' },
      { question: '$|17| - |5-8| = |17| - |-3| =$?', accept: [14, '14'], placeholder: 'Final answer', explanation: '$17 - 3 = 14$.' },
    { difficulty: 'hard', question: 'Expand and simplify $(2x + 3)(x - 4)$.', parts: [
      { question: 'First terms: $2x \\cdot x =$?', accept: ['2x^2', '2x2'], placeholder: 'Term', explanation: '$2x \\cdot x = 2x^2$.' },
      { question: 'Outer + Inner: $2x(-4) + 3(x) =$?', accept: ['-5x'], placeholder: 'Term', explanation: '$-8x + 3x = -5x$.' },
      { question: 'Last terms: $3 \\cdot (-4) =$?', accept: [-12, '-12'], placeholder: 'Number', explanation: '$3(-4) = -12$.' },
      { question: 'Combined: $2x^2 - 5x - 12$. Correct?', accept: ['yes', 'correct'], placeholder: 'yes/no', explanation: '$(2x+3)(x-4) = 2x^2 - 5x - 12$.' }
    ], completionMessage: 'FOIL: First, Outer, Inner, Last. Then combine like terms.' }
    ], completionMessage: 'Integer operations with absolute value: evaluate inside first, then apply $|\\cdot|$.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Integer Operations Strategy</h4>
    <ol><li><strong>Addition:</strong> Same signs → add absolute values, keep sign. Different signs → subtract, take sign of larger.</li>
    <li><strong>Subtraction:</strong> Change to addition of the opposite: $a - b = a + (-b)$.</li>
    <li><strong>Multiplication/Division:</strong> Same signs → positive. Different signs → negative.</li>
    <li><strong>Absolute value equations:</strong> $|A| = k$ gives TWO equations: $A = k$ or $A = -k$.</li></ol></div>` }
},

/* ============================================================
   TOPIC 2.4: Linear Inequalities
   ============================================================ */
{
  id: 'linear-inequalities',
  title: 'Linear Inequalities',
  description: 'Solving and graphing inequalities: finding the range of values that satisfy a condition, not just a single value.',
  prereqRecap: [
    { term: 'Linear Equation', definition: 'An equation of the form $ax + b = 0$ (Topic 2.2). Its solution is a single number.' },
    { term: 'Number Line', definition: 'A line where each point represents a real number. Numbers increase to the right (Topic 2.3).' },
    { term: 'Inverse Operation', definition: 'An operation that undoes another: $+5$ is undone by $-5$ (Topic 2.2).' }
  ],
  whyExists: { html: `
    <p><strong>Why inequalities?</strong> Equations find exact values. Inequalities find <em>ranges</em> of values. "You need at least a 70 to pass" is not $x = 70$ but $x \\geq 70$. Many real constraints are inequalities: budgets, speed limits, safety thresholds.</p>
    ${WHY('How do inequalities differ from equations?', '<p>An equation like $2x + 1 = 7$ has one solution ($x = 3$). An inequality like $2x + 1 \\lt 7$ has infinitely many solutions ($x \\lt 3$), forming an interval on the number line. The solution is a SET of numbers, not a single number.</p>')}
  ` },
  concept: { html: `
    <div class="callout callout-key"><h4>Solving Linear Inequalities</h4>
    <p>The process is identical to equations with <strong>one critical exception:</strong></p>
    <p><strong>When you multiply or divide both sides by a NEGATIVE number, you MUST REVERSE the inequality sign.</strong></p>
    <p>Example: $-2x \\gt 6$. Divide by $-2$: $x < -3$ (sign flips).</p>
    ${WHY('Why does the sign flip?', '<p>Consider $3 \\lt 5$. Multiply both sides by $-1$: $-3$ and $-5$. On the number line, $-3$ is to the RIGHT of $-5$, so $-3 > -5$. Multiplying by a negative reverses the order of numbers. This is because negation reflects the number line around 0.</p>')}</div>
    <div class="callout callout-key"><h4>Interval Notation</h4>
    <ul>
      <li>$x \\gt 3$: $(3, \\infty)$ : open parenthesis at 3 (not included), extends right forever.</li>
      <li>$x \\leq -2$: $(-\\infty, -2]$ : square bracket at $-2$ (included), extends left forever.</li>
      <li>$1 < x \\leq 5$: $(1, 5]$ : open at 1, closed at 5.</li>
    </ul>
    ${WHY('Why square vs. round brackets?', '<p>Square bracket $[$ means the endpoint IS included ($\\leq$ or $\\geq$). Round parenthesis $($ means it is NOT included ($<$ or $>$). Infinity always gets $($, because you can never reach infinity.</p>')}</div>
  ` },
  definition: { html: `
    <p><strong>Inequality:</strong> A statement comparing two expressions: $<$, $>$, $\\leq$, $\\geq$.</p>
    <p><strong>Solution Set:</strong> The set of all values that make the inequality true.</p>
    <p><strong>Compound Inequality:</strong> Two inequalities joined by "and" or "or." Example: $1 < x \\leq 5$ means "$x > 1$ AND $x \\leq 5$."</p>
  ` },
  examples: [{
    title: 'Solving and Graphing an Inequality',
    problem: 'Solve $-3x + 7 \\leq 1$ and write the solution in interval notation.',
    steps: [
      { title: 'Subtract 7 from both sides', content: '$-3x \\leq -6$', why: 'Isolate the $x$-term by removing the constant.' },
      { title: 'Divide by $-3$ (FLIP the sign!)', content: '$x \\geq 2$', why: 'Dividing by a NEGATIVE number reverses the inequality. $\\leq$ becomes $\\geq$.' },
      { title: 'Interval notation', content: '$[2, \\infty)$', why: 'Square bracket at 2 because $x = 2$ is included ($\\geq$). Round parenthesis at $\\infty$ because infinity is not a number.' },
      { title: 'Check with $x = 3$ (inside) and $x = 0$ (outside)', content: '$x = 3$: $-3(3)+7 = -2 \\leq 1$ ✓. $x = 0$: $-3(0)+7 = 7 \\not\\leq 1$ ✓ (correctly excluded).', why: 'Always verify with a point inside and outside the solution set.' }
    ]
  }],
  flashCards: [
      { type: 'why', front: 'Why flip the inequality when multiplying by a negative?', back: '2 < 5, but multiply both by -1: -2 > -5. Negating reverses order on the number line. Every positive/negative comparison flips.' },
      { type: 'how', front: 'How to graph an inequality on a number line?', back: 'Open circle for < or > (endpoint excluded). Closed circle for <= or >= (endpoint included). Shade the direction of valid values.' },
      { type: 'define', front: 'What does the solution set of an inequality look like?', back: 'A range of values, not a single number. x > 3 means every number greater than 3 is a solution: 3.1, 4, 100, etc.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'Solve: $x + 3 \\gt 8$', options: ['$x \\gt 5$', '$x \\gt 11$', '$x \\lt 5$', '$x > -5$'], correctIndex: 0, hint: '<p>Subtract 3 from both sides.</p>', correctExplanation: '$x \\gt 8 - 3 = 5$.', wrongExplanations: { 1: 'You added: $8 + 3 = 11$. Subtract instead.', 2: 'No sign flip needed here (we did not multiply/divide by a negative).', 3: 'Wrong sign: $8 - 3 = 5$, not $-5$.' } },
    { difficulty: 'easy', question: 'Write $x \\leq 4$ in interval notation:', options: ['$(4, \\infty)$', '$(-\\infty, 4]$', '$(-\\infty, 4)$', '$[4, \\infty)$'], correctIndex: 1, hint: '<p>$\\leq$ means 4 IS included (square bracket). $x$ ranges from $-\\infty$ to 4.</p>', correctExplanation: '$x \\leq 4$ means all numbers up to and including 4: $(-\\infty, 4]$.', wrongExplanations: { 0: '$(4, \\infty)$ is $x \\gt 4$, the opposite direction.', 2: '$(- \\infty, 4)$ excludes 4. The $\\leq$ includes it, requiring $]$.', 3: '$[4, \\infty)$ is $x \\geq 4$, the wrong direction.' } },
    { difficulty: 'medium', question: 'Solve: $-2x \\lt 10$', options: ['$x < -5$', '$x > -5$', '$x \\lt 5$', '$x \\gt 5$'], correctIndex: 1, hint: '<p>Divide by $-2$. What happens to the inequality sign?</p>', correctExplanation: 'Dividing by $-2$ flips the sign: $x > -5$.', wrongExplanations: { 0: 'You divided correctly but forgot to flip the sign.', 2: '$\\frac{10}{-2} = -5$, not $5$.', 3: 'The quotient is $-5$, not $5$, and the sign flips to $>$.' } },
    { difficulty: 'medium', question: 'Solve the compound inequality: $-1 \\leq 2x + 3 \\lt 9$', options: ['$-2 \\leq x \\lt 3$', '$1 \\leq x \\lt 6$', '$-4 \\leq x \\lt 6$', '$-2 \\leq x \\lt 6$'], correctIndex: 0, hint: '<p>Subtract 3 from all three parts, then divide by 2.</p>', correctExplanation: '$-1 - 3 \\leq 2x \\lt 9 - 3 \\Rightarrow -4 \\leq 2x \\lt 6 \\Rightarrow -2 \\leq x \\lt 3$.', wrongExplanations: { 1: 'You forgot to subtract 3: $(-1-3)/2 = -2$, not $1$.', 2: 'You subtracted 3 only from the left: all three parts must be treated equally.', 3: 'You forgot to divide the right part: $6/2 = 3$.' } },
    { difficulty: 'hard', question: 'Solve: $3 - 5x \\geq 2x + 17$', options: ['$x \\leq -2$', '$x \\geq -2$', '$x \\leq 2$', '$x \\geq 2$'], correctIndex: 0, hint: '<p>Collect $x$ terms on one side, constants on the other. If you divide by a negative, flip.</p>', correctExplanation: '$3 - 17 \\geq 2x + 5x$. $-14 \\geq 7x$. $x \\leq -2$. (Dividing $-14/7 = -2$, and flipping because we switch sides: $-14 \\geq 7x$ is the same as $7x \\leq -14$, so $x \\leq -2$).', wrongExplanations: { 1: 'When dividing by a positive number, no flip. But the direction is $\\leq$, not $\\geq$.', 2: 'Check your subtraction: $3 - 17 = -14$, and $-14/7 = -2$, not $2$.', 3: 'The solution is $x \\leq -2$, not $x \\geq 2$.' } },
    { difficulty: 'hard', question: 'Which interval represents $|x| \\lt 3$?', options: ['$(-3, 3)$', '$(-\\infty, -3) \\cup (3, \\infty)$', '$[-3, 3]$', '$(0, 3)$'], correctIndex: 0, hint: '<p>$|x| \\lt 3$ means the distance from 0 is less than 3.</p>', correctExplanation: '$|x| \\lt 3 \\iff -3 < x \\lt 3$. Open interval: $(-3, 3)$.', wrongExplanations: { 1: 'That represents $|x| \\gt 3$ (distance MORE than 3 from 0).', 2: '$[-3, 3]$ includes the endpoints. Strict inequality $<$ excludes them.', 3: 'Negative values like $x = -2$ also satisfy $|{-}2| = 2 \\lt 3$.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'Solve: $x + 5 \\gt 8$. Smallest integer solution:', accept: [4, '4'], placeholder: 'Number', explanation: '$x \\gt 3$, so smallest integer is 4.' },
    { difficulty: 'easy', question: 'Solve: $|x| = 7$. List both solutions:', accept: ['7, -7', '-7, 7', '7,-7'], placeholder: 'x values', explanation: '$x = 7$ or $x = -7$.' },
    { difficulty: 'medium', question: 'Solve: $-2x \\geq 6$. $x \\leq$ ?', accept: [-3, '-3'], placeholder: 'x \\leq ?', explanation: 'Divide by $-2$, flip: $x \\leq -3$.' },
    { difficulty: 'medium', question: 'Solve: $|x - 3| < 2$. What is the interval?', accept: ['(1,5)', '1 < x < 5', '1<x<5'], placeholder: 'Interval', explanation: '$-2 < x - 3 < 2 \\Rightarrow 1 < x < 5$.' },
    { difficulty: 'hard', question: 'Solve: $3 \\lt 2x - 1 \\leq 9$. Write as "a < x <= b".', accept: ['2 < x <= 5', '2<x<=5'], placeholder: '? < x <= ?', explanation: '$4 \\lt 2x \\leq 10 \\Rightarrow 2 < x \\leq 5$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Solve $-3x + 7 \\leq 1$ step by step.', steps: [
      { content: 'Subtract 7: $-3x \\leq -6$.' },
      { content: 'Divide by $-3$ (FLIP): $x \\geq 2$.' },
      { content: 'Interval notation: $[2, \\infty)$.' },
      { content: 'Check $x=3$: $-9+7=-2 \\leq 1$ \u2713. Check $x=0$: $7 \\not\\leq 1$ \u2713.' }
    ], explanation: 'Dividing by negative flips the inequality sign.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each inequality to its interval notation:', pairs: [
      { left: '$x \\gt 3$', right: '$(3, \\infty)$' },
      { left: '$x \\leq -2$', right: '$(-\\infty, -2]$' },
      { left: '$1 < x \\leq 5$', right: '$(1, 5]$' },
      { left: '$|x| \\lt 3$', right: '$(-3, 3)$' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Sign flip rule:', expression: 'When multiplying or dividing an inequality by a {{0}} number, you must {{1}} the inequality sign.', blanks: [ { accept: ['negative'], size: 8 }, { accept: ['flip', 'reverse'], size: 7 } ], explanation: 'Negative multiplication reverses order.' },
    { difficulty: 'medium', context: 'Absolute value inequality:', expression: '$|x| < k$ is equivalent to $-k$ {{0}} $x$ {{1}} $k$.', blanks: [ { accept: ['<'], size: 3 }, { accept: ['<'], size: 3 } ], explanation: '$|x| < k \\iff -k < x < k$.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'A phone plan charges $30 base + $0.10 per text. Budget: $50/month.', parts: [
      { question: 'Write the inequality (t = texts):', accept: ['30+0.1t<=50', '30+0.10t<=50'], placeholder: '30 + 0.1t <= 50', explanation: '$30 + 0.10t \\leq 50$.' },
      { question: 'Max texts per month:', accept: [200, '200'], placeholder: 'Number', explanation: '$0.10t \\leq 20 \\Rightarrow t \\leq 200$.' }
    ], completionMessage: 'Budget constraints modeled as linear inequalities.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Inequality Strategy</h4>
    <ol><li><strong>Solve like an equation</strong> with one exception: <strong>flip the sign when multiplying/dividing by a negative</strong>.</li>
    <li><strong>Interval notation:</strong> $[$ or $]$ means endpoint included ($\\leq$ or $\\geq$). $($ or $)$ means excluded ($<$ or $>$). $\\infty$ always gets $($.</li>
    <li><strong>Compound inequalities:</strong> Apply operations to ALL parts simultaneously.</li>
    <li><strong>Absolute value:</strong> $|x| < k$ gives $-k < x < k$. $|x| > k$ gives $x < -k$ or $x > k$.</li></ol></div>` }
},

/* ============================================================
   TOPIC 2.5: Systems of Linear Equations
   ============================================================ */
{
  id: 'systems-linear',
  title: 'Systems of Linear Equations',
  description: 'Solving two or more equations simultaneously. When one equation is not enough to determine the unknowns.',
  prereqRecap: [
    { term: 'Linear Equation', definition: '$ax + b = 0$ has one variable and one solution (Topic 2.2).' },
    { term: 'Graphing Lines', definition: '$y = mx + b$ is a line with slope $m$ and y-intercept $b$.' },
    { term: 'Substitution', definition: 'Replacing a variable with an equivalent expression.' }
  ],
  whyExists: { html: `
    <p><strong>Why systems?</strong> One equation with two unknowns has infinitely many solutions: $x + y = 10$ is satisfied by $(1,9), (5,5), (3,7), \\ldots$. A second equation provides an additional constraint, typically narrowing to a unique solution.</p>
    <p>Real-world: two products with prices and quantities, supply and demand curves crossing at equilibrium, mixing solutions of different concentrations.</p>
    ${WHY('Why does this work geometrically?', '<p>Each linear equation in two variables represents a LINE in the coordinate plane. Two lines can: (1) intersect at one point = one solution, (2) be parallel = no solution, (3) be the same line = infinitely many solutions. The algebraic methods find the intersection point.</p>')}
  ` },
  concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 350 280" width="350" height="280" xmlns="http://www.w3.org/2000/svg">
  <line x1="60" y1="20" x2="60" y2="260" stroke="#334155" stroke-width="0.3"/><line x1="40" y1="60" x2="310" y2="60" stroke="#334155" stroke-width="0.3"/><line x1="100" y1="20" x2="100" y2="260" stroke="#334155" stroke-width="0.3"/><line x1="40" y1="100" x2="310" y2="100" stroke="#334155" stroke-width="0.3"/><line x1="140" y1="20" x2="140" y2="260" stroke="#334155" stroke-width="0.3"/><line x1="40" y1="140" x2="310" y2="140" stroke="#334155" stroke-width="0.3"/><line x1="180" y1="20" x2="180" y2="260" stroke="#334155" stroke-width="0.3"/><line x1="40" y1="180" x2="310" y2="180" stroke="#334155" stroke-width="0.3"/><line x1="220" y1="20" x2="220" y2="260" stroke="#334155" stroke-width="0.3"/><line x1="40" y1="220" x2="310" y2="220" stroke="#334155" stroke-width="0.3"/><line x1="260" y1="20" x2="260" y2="260" stroke="#334155" stroke-width="0.3"/><line x1="40" y1="260" x2="310" y2="260" stroke="#334155" stroke-width="0.3"/>
  <line x1="180" y1="20" x2="180" y2="260" stroke="#94a3b8" stroke-width="1"/>
  <line x1="40" y1="140" x2="310" y2="140" stroke="#94a3b8" stroke-width="1"/>
  <line x1="60" y1="240" x2="300" y2="60" stroke="#3b82f6" stroke-width="2"/>
  <line x1="60" y1="60" x2="300" y2="220" stroke="#10b981" stroke-width="2"/>
  <circle cx="195" cy="155" r="6" fill="#ef4444" stroke="white" stroke-width="1.5"/>
  <text x="205" y="148" fill="#ef4444" font-size="11" font-family="Inter,sans-serif">solution</text>
  <text x="280" y="55" fill="#3b82f6" font-size="11" font-family="Inter,sans-serif">Line 1</text>
  <text x="280" y="235" fill="#10b981" font-size="11" font-family="Inter,sans-serif">Line 2</text>
  <text x="175" y="17" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="Inter,sans-serif">Two lines cross at the solution</text>
</svg>
</div>
<p class="math-diagram-label">A system of two linear equations: the intersection point is the solution (x, y)</p>

    <div class="callout callout-key"><h4>Method 1: Substitution</h4>
    <ol>
      <li>Solve one equation for one variable: $y = \\ldots$ or $x = \\ldots$</li>
      <li>Substitute into the other equation (now one equation, one unknown).</li>
      <li>Solve for the remaining variable.</li>
      <li>Back-substitute to find the other variable.</li>
    </ol></div>
    <div class="callout callout-key"><h4>Method 2: Elimination (Addition)</h4>
    <ol>
      <li>Multiply one or both equations so that one variable has equal and opposite coefficients.</li>
      <li>Add the equations to eliminate that variable.</li>
      <li>Solve the resulting one-variable equation.</li>
      <li>Back-substitute.</li>
    </ol>
    ${WHY('When to use which method?', '<p><strong>Substitution</strong> is best when one equation already has a variable isolated (e.g., $y = 3x + 1$). <strong>Elimination</strong> is best when both equations are in standard form ($ax + by = c$) and no variable is easily isolated.</p>')}</div>
    <div class="callout callout-key"><h4>Three Possible Outcomes</h4>
    <ul>
      <li><strong>One solution:</strong> Lines intersect. The system is <strong>consistent and independent</strong>.</li>
      <li><strong>No solution:</strong> Lines are parallel (same slope, different intercepts). The system is <strong>inconsistent</strong>. Algebra yields a contradiction like $0 = 5$.</li>
      <li><strong>Infinitely many solutions:</strong> Lines are identical. The system is <strong>consistent and dependent</strong>. Algebra yields an identity like $0 = 0$.</li>
    </ul></div>
  ` },
  definition: { html: `<p><strong>System of Equations:</strong> Two or more equations involving the same variables, solved simultaneously.</p><p><strong>Solution:</strong> An ordered pair $(x, y)$ that satisfies ALL equations in the system.</p>` },
  examples: [{
    title: 'Solving by Substitution',
    problem: 'Solve the system: $y = 2x - 1$ and $3x + y = 9$.',
    steps: [
      { title: 'Substitute $y = 2x - 1$ into the second equation', content: '$3x + (2x - 1) = 9$.', why: 'The first equation gives $y$ in terms of $x$, so replace $y$ in the second equation.' },
      { title: 'Solve for $x$', content: '$5x - 1 = 9 \\Rightarrow 5x = 10 \\Rightarrow x = 2$.', why: 'Combine like terms and isolate $x$.' },
      { title: 'Find $y$', content: '$y = 2(2) - 1 = 3$.', why: 'Back-substitute $x = 2$ into $y = 2x - 1$.' },
      { title: 'Verify', content: 'Check in equation 2: $3(2) + 3 = 9$ \\u2713.', why: 'Always verify the solution in BOTH original equations.' }
    ]
  },
  {
    title: 'Solving by Elimination',
    problem: 'Solve: $2x + 3y = 12$ and $4x - 3y = 6$.',
    steps: [
      { title: 'Add the equations', content: '$(2x + 3y) + (4x - 3y) = 12 + 6 \\Rightarrow 6x = 18$.', why: 'The $3y$ and $-3y$ cancel out (they are additive inverses).' },
      { title: 'Solve for $x$', content: '$x = 3$.', why: '$6x = 18 \\Rightarrow x = 3$.' },
      { title: 'Find $y$', content: '$2(3) + 3y = 12 \\Rightarrow 3y = 6 \\Rightarrow y = 2$.', why: 'Substitute $x = 3$ into either original equation.' },
      { title: 'Solution', content: '$(x, y) = (3, 2)$.', why: 'Check: $4(3) - 3(2) = 12 - 6 = 6$ \\u2713.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is slope?', back: 'Rise over run: (y2-y1)/(x2-x1). Measures steepness. Positive = uphill, negative = downhill, zero = flat.' },
      { type: 'how', front: 'How to find where two lines meet?', back: 'Set equations equal. If y=2x+1 and y=-x+7: 2x+1=-x+7, 3x=6, x=2, y=5. Intersection: (2,5).' },
      { type: 'why', front: 'Why does y=mx+b describe every line?', back: 'm = rate of change, b = y-intercept. A line has constant slope, so two numbers completely determine it.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'Solve by substitution: $y = x + 1$, $x + y = 5$. Solution:', options: ['$(2, 3)$', '$(3, 2)$', '$(1, 4)$', '$(4, 1)$'], correctIndex: 0, hint: '<p>Replace $y$ with $x + 1$ in the second equation.</p>', correctExplanation: '$x + (x + 1) = 5 \\Rightarrow 2x + 1 = 5 \\Rightarrow x = 2$. $y = 3$. Solution: $(2, 3)$.', wrongExplanations: { 1: 'Check: $3 + 2 = 5$ \\u2713 but $y = x + 1$: $2 \\neq 3 + 1 = 4$. Wrong.', 2: 'Check: $1 + 4 = 5$ \\u2713 but $y = x + 1$: $4 \\neq 1 + 1 = 2$. Wrong.', 3: '$4 + 1 = 5$ \\u2713 but $y = x + 1$: $1 \\neq 5$. Wrong.' } },
    { difficulty: 'easy', question: 'If two lines have the same slope but different y-intercepts, the system has:', options: ['One solution', 'No solution', 'Infinitely many solutions', 'Two solutions'], correctIndex: 1, hint: '<p>Same slope = parallel lines.</p>', correctExplanation: 'Parallel lines never intersect. No solution (inconsistent system).', wrongExplanations: { 0: 'One solution requires lines to intersect (different slopes).', 2: 'Infinitely many requires identical lines (same slope AND same intercept).', 3: 'Two straight lines can intersect at most once.' } },
    { difficulty: 'medium', question: 'Solve: $x + y = 7$, $x - y = 3$. Find $x$:', options: ['$5$', '$2$', '$4$', '$10$'], correctIndex: 0, hint: '<p>Add the two equations to eliminate $y$.</p>', correctExplanation: 'Adding: $2x = 10 \\Rightarrow x = 5$. Then $y = 7 - 5 = 2$.', wrongExplanations: { 1: 'That is $y$, not $x$. $x = 5$ and $y = 2$.', 2: '$x = 4$: $4 + y = 7 \\Rightarrow y = 3$. Check: $4 - 3 = 1 \\neq 3$. Wrong.', 3: '$2x = 10$, so $x = 5$, not 10.' } },
    { difficulty: 'medium', question: 'Solve: $2x + y = 10$, $x = 3$. Find $y$:', options: ['$7$', '$4$', '$3$', '$13$'], correctIndex: 1, hint: '<p>Substitute $x = 3$ directly.</p>', correctExplanation: '$2(3) + y = 10 \\Rightarrow 6 + y = 10 \\Rightarrow y = 4$.', wrongExplanations: { 0: '$10 - 3 = 7$, but you need $10 - 2(3) = 4$.', 2: '$2(3) = 6$, not $7$. $y = 10 - 6 = 4$.', 3: 'You added instead of subtracting.' } },
    { difficulty: 'hard', question: 'Classify: $2x + 4y = 8$ and $x + 2y = 4$:', options: ['One solution', 'No solution', 'Infinitely many', 'Cannot determine'], correctIndex: 2, hint: '<p>Is the first equation a multiple of the second?</p>', correctExplanation: '$2(x + 2y) = 2(4) \\Rightarrow 2x + 4y = 8$. The equations are identical. Infinitely many solutions.', wrongExplanations: { 0: 'The equations are multiples of each other. They represent the same line.', 1: 'The equations are consistent (same line), not inconsistent.', 3: 'We can determine the relationship by inspection.' } },
    { difficulty: 'hard', question: 'Solve: $3x - 2y = 1$, $5x + 2y = 15$. Solution:', options: ['$(2, 2.5)$', '$(1, 1)$', '$(3, 0)$', '$(2, 5)$'], correctIndex: 0, hint: '<p>Add to eliminate $y$.</p>', correctExplanation: 'Add: $8x = 16 \\Rightarrow x = 2$. Then $3(2) - 2y = 1 \\Rightarrow 6 - 2y = 1 \\Rightarrow y = 2.5$. Solution: $(2, 2.5)$.', wrongExplanations: { 1: 'Check: $3(1) - 2(1) = 1$ \\u2713, $5(1) + 2(1) = 7 \\neq 15$. Fails equation 2.', 2: '$3(3) - 2(0) = 9 \\neq 1$. Fails equation 1.', 3: '$3(2) - 2(5) = -4 \\neq 1$. Fails equation 1.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'Solve: $x + y = 10$, $x - y = 4$. $x =$?', accept: [7, '7'], placeholder: 'x = ?', explanation: 'Add: $2x = 14 \\Rightarrow x = 7$.' },
    { difficulty: 'easy', question: 'Solve: $x + y = 5$, $y = 2$. $x =$?', accept: [3, '3'], placeholder: 'x = ?', explanation: 'Substitute: $x + 2 = 5 \\Rightarrow x = 3$.' },
    { difficulty: 'medium', question: 'Solve: $y = 3x$, $2x + y = 15$. $x =$?', accept: [3, '3'], placeholder: 'x = ?', explanation: '$2x + 3x = 15 \\Rightarrow 5x = 15 \\Rightarrow x = 3$. $y = 9$.' },
    { difficulty: 'medium', question: 'System: $2x + y = 7$, $x - y = 2$. Find $y$:', accept: [1, '1'], placeholder: 'y = ?', explanation: 'Add: $3x = 9 \\Rightarrow x = 3$. Then $y = 7 - 6 = 1$.' },
    { difficulty: 'hard', question: 'System: $3x + y = 5$, $6x + 2y = 10$. How many solutions? (0, 1, or infinity)', accept: ['infinity', 'infinite', 'infinitely many'], placeholder: '0, 1, or infinity', explanation: 'Second equation = $2 \\times$ first. Same line. Infinitely many.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'A store sells notebooks for \\$3 and pens for \\$1. You buy 10 items for \\$22.', parts: [
      { question: 'Write equation 1 (total items, n = notebooks, p = pens):', accept: ['n+p=10', 'n + p = 10'], placeholder: 'n + p = ?', explanation: '$n + p = 10$.' },
      { question: 'Write equation 2 (total cost):', accept: ['3n+p=22', '3n + p = 22'], placeholder: '3n + p = ?', explanation: '$3n + p = 22$.' },
      { question: 'How many notebooks?', accept: [6, '6'], placeholder: 'Number', explanation: 'Subtract: $2n = 12 \\Rightarrow n = 6$. Then $p = 4$.' }
    ], completionMessage: 'Word problems translate to systems: one equation per constraint.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Solve $x + y = 7$, $2x - y = 5$ by elimination.', steps: [
      { content: 'Add the equations: $(x + y) + (2x - y) = 7 + 5$.' },
      { content: '$3x = 12$.' },
      { content: '$x = 4$.' },
      { content: 'From equation 1: $4 + y = 7 \\Rightarrow y = 3$.' },
      { content: 'Solution: $(4, 3)$. Check: $2(4) - 3 = 5$ \\u2713.' }
    ], explanation: 'Elimination: add or subtract equations to cancel one variable.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each system type to its geometric meaning:', pairs: [
      { left: 'One solution', right: 'Lines intersect at a point' },
      { left: 'No solution', right: 'Lines are parallel' },
      { left: 'Infinitely many', right: 'Lines are identical' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'System classification:', expression: 'If solving a system gives $0 = 5$, the system has {{0}} solution(s). If it gives $0 = 0$, there are {{1}} solutions.', blanks: [ { accept: ['no', '0', 'zero'], size: 4 }, { accept: ['infinitely many', 'infinite'], size: 16 } ], explanation: 'Contradiction = no solution. Identity = infinitely many.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Systems Strategy</h4>
    <ol><li><strong>Substitution:</strong> Use when one variable is already isolated ($y = ...$).</li>
    <li><strong>Elimination:</strong> Use when both equations are in standard form ($ax + by = c$).</li>
    <li><strong>Check result type:</strong> Variable found = one solution. $0 = 5$ = no solution. $0 = 0$ = infinitely many.</li>
    <li><strong>Always verify</strong> in BOTH original equations.</li></ol></div>` }
}

] // end topics array
}); // end module push
})();
