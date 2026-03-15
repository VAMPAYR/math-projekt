/* ============================================================
   MODULE 5: Calculus 1 (Thomas' Calculus)
   Limits, Derivatives, Applications
   ============================================================ */
(function() {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];
  const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;
  window.MATH_MODULES.push({
    id: 'calculus-1',
    order: 8,
    title: 'Calculus 1A: Limits \u0026 Continuity',
    description: 'Limits, continuity, and the epsilon-delta definition. The rigorous foundation everything in calculus rests on. Requires: precalculus (Module 6).',
    topics: [
      {
        id: 'limits-continuity',
        title: 'Limits and Continuity',
        description: 'The rigorous foundation of calculus. When can we trust that nearby inputs give nearby outputs?',
        prereqRecap: [
          { term: 'Function', definition: 'A rule $f$ assigning each input $x$ exactly one output $f(x)$. Example: $f(x) = x^2$.' },
          { term: 'Substitution', definition: 'To evaluate $f(3)$, replace $x$ with 3: $f(3) = 9$.' },
          { term: 'Infinity', definition: '$\\infty$ is not a number. It means "growing without bound." $x \\to \\infty$ means $x$ increases past every finite value.' }
        ],
        whyExists: { html: `
          <p><strong>Why do limits exist?</strong> The derivative asks: what is the slope of a curve at a single point? That requires dividing zero by zero ($\\frac{\\Delta y}{\\Delta x}$ as $\\Delta x \\to 0$). Limits formalize this: instead of dividing by zero, we describe what the ratio <strong>approaches</strong> as $\\Delta x$ gets arbitrarily small.</p>
          <p><strong>Why the epsilon-delta definition?</strong> "Approaches" is vague. Cauchy and Weierstrass made it precise: for every tolerance $\\epsilon \\gt 0$ (no matter how small), there exists a distance $\\delta \\gt 0$ such that if $0 \\lt |x - a| \\lt \\delta$, then $|f(x) - L| \\lt \\epsilon$. This eliminates all ambiguity. It says: "you name the accuracy, I guarantee it by staying close enough."</p>
          <p><strong>Practical application:</strong> Limits are the foundation of all of calculus. Every derivative, every integral, every series convergence test rests on limits. Engineers use limits to model instantaneous velocity (speedometers), instantaneous rates of chemical reactions, and the behavior of signals at boundary frequencies.</p>
          ${WHY('Why does the limit not care about the value AT the point?', '<p>Consider a function with a hole: $f(x) = \\frac{x^2 - 4}{x - 2}$ is undefined at $x = 2$. But for all $x \\neq 2$, $f(x) = x + 2$, so $\\lim_{x \\to 2} f(x) = 4$. The limit describes behavior <strong>near</strong> a point, not <strong>at</strong> it. This separation is essential because the derivative formula $\\frac{f(a+h)-f(a)}{h}$ is undefined at $h = 0$, yet we need its limit as $h \\to 0$.</p>')}
        ` },
        hook: { html: `
          <div class="callout callout-puzzle"><h4>🧩 Puzzle: The Teleporting Function</h4>
          <p>Consider: $f(x) = \\begin{cases} x^2 & x \\neq 2 \\\\ 10 & x = 2 \\end{cases}$</p>
          <p>As $x \\to 2$, $f(x) \\to 4$. But $f(2) = 10$. The function "teleports" to 10 at $x = 2$. The limit exists ($L = 4$), but the function is <strong>not continuous</strong> at $x = 2$ because $\\lim_{x \\to 2} f(x) \\neq f(2)$.</p></div>` },
        formalDefinitions: [
      { term: 'Limit (Epsilon-Delta)', symbol: '$\\lim_{x \\to a} f(x) = L$', definition: 'For every $\\epsilon > 0$, there exists $\\delta > 0$ such that $0 < |x - a| < \\delta \\implies |f(x) - L| < \\epsilon$. The function value approaches $L$ as $x$ approaches $a$.' },
      { term: 'Continuity at a Point', symbol: '', definition: '$f$ is continuous at $a$ if: (1) $f(a)$ exists, (2) $\\lim_{x\\to a} f(x)$ exists, and (3) $\\lim_{x\\to a} f(x) = f(a)$. All three conditions must hold.' },
      { term: 'Intermediate Value Theorem', symbol: '', definition: 'If $f$ is continuous on $[a,b]$ and $N$ is between $f(a)$ and $f(b)$, then there exists $c \\in (a,b)$ such that $f(c) = N$. Continuous functions take all intermediate values.' }
    ],
    graphExplorer: [
      { latex: 'y = \\frac{x^2 - 1}{x - 1}' },
      { latex: 'y = \\frac{\\sin(x)}{x}' }
    ],
    background: {
      title: 'Why Limits? The Foundation of Calculus',
      content: '<p>Calculus was invented in the 1600s by <strong>Newton</strong> and <strong>Leibniz</strong> independently. Both needed to solve the same problem: how to compute instantaneous rates of change (derivatives) and accumulated quantities (integrals).</p><p>The concept of a <strong>limit</strong> was not rigorously defined until the 1800s, by <strong>Cauchy</strong> and <strong>Weierstrass</strong>. Before that, Newton used "fluxions" and Leibniz used "infinitesimals," both of which were logically shaky.</p><p>The epsilon-delta definition ($\\forall \\epsilon > 0, \\exists \\delta > 0$) was Weierstrass\'s contribution. It replaced vague notions of "approaching" with a precise logical statement. This is how every calculus theorem is proven today.</p><p><strong>Why limits matter in practice:</strong> The speed of a car at an instant is the limit of average speeds over shorter and shorter intervals. The area under a curve is the limit of sums of thinner and thinner rectangles. Without limits, these concepts have no rigorous meaning.</p>'
    },
    mathGrammar: [
      { question: 'What does $\\lim_{x \\to a} f(x) = L$ mean in plain language?', answer: 'As $x$ gets closer and closer to $a$ (from both sides), $f(x)$ gets closer and closer to $L$. You never actually plug in $x = a$; you approach it. The limit cares about the journey. You are asking: where is this heading? You are not asking where it lands.' },
      { question: 'Why can\'t I just plug in the value?', answer: 'Sometimes you can! If $f$ is continuous at $a$, then $\\lim_{x \\to a} f(x) = f(a)$. But for $\\frac{x^2 - 1}{x - 1}$ at $x = 1$, plugging in gives $\\frac{0}{0}$, which is undefined. The limit still exists ($= 2$) because you factor and cancel: $\\frac{(x+1)(x-1)}{x-1} = x + 1 \\to 2$.' },
      { question: 'What is $\\frac{0}{0}$? Is it 0 or undefined?', answer: '$\\frac{0}{0}$ is called an "indeterminate form." It does not have a single fixed value. Depending on HOW both numerator and denominator approach zero, the limit could be any number, infinity, or nothing. You must simplify further to find the actual answer.' }
    ],
    concept: { html: `
          <div class="callout callout-key"><h4>Intuitive Definition of a Limit</h4>
          <p>We write $\\lim_{x \\to a} f(x) = L$ and say "the limit of $f(x)$ as $x$ approaches $a$ equals $L$" if we can make $f(x)$ as close to $L$ as we wish by restricting $x$ sufficiently close to $a$ (but $x \\neq a$). The value $f(a)$ is irrelevant; limits describe behavior <em>near</em> a point, not <em>at</em> that point.</p></div>

          <div class="callout callout-key"><h4>Precise (Epsilon-Delta) Definition</h4>
          <p>$\\lim_{x \\to a} f(x) = L$ means: for every $\\varepsilon \\gt 0$, there exists $\\delta \\gt 0$ such that $0 < |x - a| < \\delta \\Rightarrow |f(x) - L| < \\varepsilon$.</p>
          <p>Translation: no matter how tight a tolerance ($\\varepsilon$) you demand around $L$, there exists a sufficiently small neighborhood ($\\delta$) around $a$ that guarantees $f(x)$ stays within that tolerance. This is the rigorous foundation upon which all of calculus rests.</p></div>

          <div class="callout callout-key"><h4>Limit Laws (Algebraic Rules)</h4>
          <p>If $\\lim_{x\\to a} f(x) = L$ and $\\lim_{x\\to a} g(x) = M$, then:</p>
          <ul>
            <li><strong>Sum/Difference:</strong> $\\lim [f(x) \\pm g(x)] = L \\pm M$</li>
            <li><strong>Product:</strong> $\\lim [f(x) \\cdot g(x)] = L \\cdot M$</li>
            <li><strong>Quotient:</strong> $\\lim \\frac{f(x)}{g(x)} = \\frac{L}{M}$ provided $M \\neq 0$</li>
            <li><strong>Power:</strong> $\\lim [f(x)]^n = L^n$</li>
            <li><strong>Root:</strong> $\\lim \\sqrt[n]{f(x)} = \\sqrt[n]{L}$ (when defined)</li>
            <li><strong>Constant Multiple:</strong> $\\lim [c \\cdot f(x)] = c \\cdot L$</li>
          </ul>
          <p>These laws let you evaluate limits of complex expressions by evaluating the limits of their parts.</p></div>

          <div class="callout callout-key"><h4>Algebraic Techniques for Indeterminate Forms</h4>
          <p>When direct substitution yields $\\frac{0}{0}$, apply one of these strategies:</p>
          <ol>
            <li><strong>Factor and cancel:</strong> $\\lim_{x\\to 1}\\frac{x^2-1}{x-1} = \\lim_{x\\to 1}\\frac{(x-1)(x+1)}{x-1} = \\lim_{x\\to 1}(x+1) = 2$</li>
            <li><strong>Rationalize:</strong> $\\lim_{x\\to 0}\\frac{\\sqrt{x+4} - 2}{x}$. Multiply by $\\frac{\\sqrt{x+4}+2}{\\sqrt{x+4}+2}$ to get $\\frac{x}{x(\\sqrt{x+4}+2)} = \\frac{1}{\\sqrt{x+4}+2} \\to \\frac{1}{4}$</li>
            <li><strong>Common denominator:</strong> Combine fractions before evaluating.</li>
            <li><strong>Special limits:</strong> $\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1$ and $\\lim_{x\\to 0}\\frac{1 - \\cos x}{x} = 0$.</li>
          </ol></div>

          <div class="callout callout-key"><h4>Three Conditions for Continuity at $x = a$</h4>
          <ol>
            <li>$f(a)$ is defined (the function has a value at $a$)</li>
            <li>$\\lim_{x \\to a} f(x)$ exists (the limit from both sides agrees)</li>
            <li>$\\lim_{x \\to a} f(x) = f(a)$ (the limit equals the function value)</li>
          </ol>
          <p>All three must hold. If any fails, $f$ is discontinuous at $a$.</p></div>

          <p><strong>Types of discontinuity:</strong></p>
          <ul>
            <li><strong>Removable:</strong> Limit exists but doesn't equal $f(a)$ (a "hole"). Can be "fixed" by redefining $f(a) = \\lim f(x)$.</li>
            <li><strong>Jump:</strong> Left and right limits exist but differ: $\\lim_{x\\to a^-} f(x) \\neq \\lim_{x\\to a^+} f(x)$. Common in piecewise functions.</li>
            <li><strong>Infinite:</strong> Function approaches $\\pm\\infty$ (vertical asymptote). Example: $\\frac{1}{x}$ at $x = 0$.</li>
            <li><strong>Oscillatory:</strong> $\\sin(1/x)$ as $x \\to 0$ oscillates infinitely fast; limit DNE.</li>
          </ul>

          <div class="callout callout-key"><h4>Important Theorems</h4>
          <ul>
            <li><strong>Squeeze Theorem:</strong> If $g(x) \\leq f(x) \\leq h(x)$ near $a$ and $\\lim g = \\lim h = L$, then $\\lim f = L$. Used when direct evaluation is impossible (e.g., $x^2\\sin(1/x)$).</li>
            <li><strong>Intermediate Value Theorem (IVT):</strong> If $f$ is continuous on $[a,b]$ and $N$ is between $f(a)$ and $f(b)$, then $\\exists c \\in (a,b)$ with $f(c) = N$. Guarantees solutions exist. Used to prove equations have roots.</li>
          </ul></div>

          <div class="callout callout-key"><h4>Limits at Infinity and Asymptotes</h4>
          <p><strong>Horizontal Asymptotes:</strong> $y = L$ is a horizontal asymptote if $\\lim_{x\\to\\pm\\infty} f(x) = L$.</p>
          <p>For rational functions $\\frac{P(x)}{Q(x)}$:</p>
          <ul>
            <li>deg $P <$ deg $Q$: limit = 0 (HA at $y = 0$)</li>
            <li>deg $P =$ deg $Q$: limit = ratio of leading coefficients</li>
            <li>deg $P >$ deg $Q$: limit = $\\pm\\infty$ (no HA)</li>
          </ul>
          <p><strong>Vertical Asymptotes:</strong> $x = a$ is a vertical asymptote if $\\lim_{x\\to a^\\pm} f(x) = \\pm\\infty$. Occur where denominator $\\to 0$ but numerator $\\not\\to 0$.</p></div>` },
        definition: { html: `
          <p><strong>One-Sided Limits:</strong></p>
          <div class="math-block">$$\\lim_{x \\to a^-} f(x) \\text{ (left limit)}, \\quad \\lim_{x \\to a^+} f(x) \\text{ (right limit)}$$</div>
          <p>$\\lim_{x \\to a} f(x) = L$ exists if and only if both one-sided limits exist and are equal to $L$.</p>
          <p><strong>Limits at Infinity:</strong> $\\lim_{x \\to \\infty} f(x) = L$ means $f(x) \\to L$ as $x$ grows without bound. This determines <strong>horizontal asymptotes</strong>.</p>` },
        examples: [{
          title: 'Evaluating a Limit with the Squeeze Theorem',
          problem: 'Evaluate $\\lim_{x \\to 0} x^2 \\sin\\left(\\frac{1}{x}\\right)$.',
          steps: [
            { title: 'Bound $\\sin(1/x)$', content: '$-1 \\leq \\sin\\left(\\frac{1}{x}\\right) \\leq 1$ for all $x \\neq 0$', why: 'Sine is always between $-1$ and $1$, regardless of the argument.' },
            { title: 'Multiply by $x^2$', content: '$-x^2 \\leq x^2\\sin\\left(\\frac{1}{x}\\right) \\leq x^2$', why: '$x^2 \\gt 0$, so multiplying preserves the inequality direction.' },
            { title: 'Apply Squeeze Theorem', content: '$\\lim_{x \\to 0} (-x^2) = 0$ and $\\lim_{x \\to 0} x^2 = 0$. By Squeeze: $\\lim_{x \\to 0} x^2\\sin(1/x) = 0$.', why: 'Our function is squeezed between two functions that both approach 0.' }
          ]
        },
        {
          title: 'Limit by Factoring (Removable Discontinuity)',
          problem: 'Evaluate $\\lim_{x \\to 4} \\frac{x^2 - 16}{x - 4}$.',
          steps: [
            { title: 'Direct substitution fails', content: 'Substituting $x = 4$: $\\frac{16 - 16}{4 - 4} = \\frac{0}{0}$. Indeterminate form.', why: '$0/0$ means the limit might exist but requires algebraic simplification to evaluate.' },
            { title: 'Factor numerator', content: '$x^2 - 16 = (x-4)(x+4)$. So $\\frac{(x-4)(x+4)}{x-4} = x + 4$ for $x \\neq 4$.', why: 'Difference of squares: $a^2 - b^2 = (a-b)(a+b)$. The $(x-4)$ factors cancel since $x \\neq 4$ in a limit.' },
            { title: 'Evaluate', content: '$\\lim_{x \\to 4} (x + 4) = 8$.', why: 'After canceling, direct substitution works: $4 + 4 = 8$. The discontinuity at $x = 4$ was removable.' }
          ]
        },
        {
          title: 'Limit at Infinity (Rational Function)',
          problem: 'Evaluate $\\lim_{x \\to \\infty} \\frac{5x^3 - 2x}{3x^3 + 7}$.',
          steps: [
            { title: 'Identify degrees', content: 'Numerator degree: 3. Denominator degree: 3. Same degree.', why: 'For limits at infinity of rational functions, compare the degrees of numerator and denominator.' },
            { title: 'Divide by highest power', content: '$\\frac{5x^3 - 2x}{3x^3 + 7} = \\frac{5 - 2/x^2}{3 + 7/x^3}$.', why: 'Divide every term by $x^3$ (the highest power). As $x \\to \\infty$, $1/x^k \\to 0$ for $k \\gt 0$.' },
            { title: 'Evaluate', content: '$\\frac{5 - 0}{3 + 0} = \\frac{5}{3}$. The horizontal asymptote is $y = 5/3$.', why: 'Same degree: limit = ratio of leading coefficients. Degree numerator > denominator: $\\pm\\infty$. Degree numerator < denominator: $0$.' }
          ]
        }],
        flashCards: [
      { type: 'define', front: 'What is a limit?', back: 'lim f(x) as x approaches a = L means f(x) gets close to L near a. The value f(a) does not matter.' },
      { type: 'why', front: 'Why do limits exist in calculus?', back: 'Derivatives need 0/0. Limits formalize what a ratio APPROACHES without dividing by zero.' },
      { type: 'define', front: 'What is continuity?', back: 'f continuous at a means: f(a) exists, limit exists, and they are equal. You can draw the graph without lifting your pen.' },
      { type: 'why', front: 'Why does the limit ignore the value AT the point?', back: 'f(x) = (x^2-4)/(x-2) is undefined at x=2, but near x=2, f(x) is near 4. Limits describe nearby behavior.' }
    ],
    exercises: [{
          difficulty: 'easy',
          question: '$\\lim_{x \\to 3} (2x + 1) = $?',
          options: ['$5$', '$7$', '$6$', '$\\infty$'],
          correctIndex: 1,
          hint: '<p>For polynomials, just substitute the value.</p>',
          correctExplanation: 'Direct substitution: $2(3) + 1 = 7$.',
          wrongExplanations: { 0: '$2(3) = 6$, then $+1 = 7$.', 2: '$2(3) = 6$, but you forgot the $+1$.', 3: 'Polynomials have finite limits at finite points.' }
        },{
          difficulty: 'medium',
          question: 'Which type of discontinuity does $f(x) = \\frac{x^2 - 1}{x - 1}$ have at $x = 1$?',
          options: ['Removable', 'Jump', 'Infinite', 'No discontinuity'],
          correctIndex: 0,
          hint: '<p>Factor the numerator and simplify.</p>',
          correctExplanation: '$f(x) = \\frac{(x-1)(x+1)}{x-1} = x + 1$ for $x \\neq 1$. Limit = 2, but $f(1)$ undefined. Removable.',
          wrongExplanations: { 1: 'Jump requires different left/right limits.', 2: '$f \\to 2$, not $\\infty$.', 3: '$f(1)$ is undefined.' }
        },{
          difficulty: 'medium',
          question: '$\\lim_{x \\to 0} \\frac{\\sin x}{x} = $?',
          options: ['$0$', '$1$', '$\\infty$', 'Does not exist'],
          correctIndex: 1,
          hint: '<p>This is a fundamental limit (must be memorized).</p>',
          correctExplanation: '$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ (proven by Squeeze Theorem).',
          wrongExplanations: { 0: 'Both numerator and denominator approach 0 (indeterminate form), but the limit is 1.', 2: 'The ratio approaches 1, not infinity.', 3: 'The limit does exist and equals 1.' }
        },{
          difficulty: 'hard',
          question: '$\\lim_{x \\to \\infty} \\frac{3x^2 + 1}{x^2 - 5} = $?',
          options: ['$0$', '$3$', '$\\infty$', '$-3$'],
          correctIndex: 1,
          hint: '<p>Divide numerator and denominator by the highest power of $x$.</p>',
          correctExplanation: 'Divide by $x^2$: $\\frac{3 + 1/x^2}{1 - 5/x^2} \\to \\frac{3}{1} = 3$.',
          wrongExplanations: { 0: 'Same degree: ratio of leading coefficients.', 2: 'Same degree numerator and denominator, so finite limit.', 3: 'Both leading coefficients are positive.' }
        },

    {
      question: 'What is the limit of (x^2 - 9)/(x - 3) as x approaches 3?',
      type: 'mc',
      options: ['6', '0', '9', 'undefined'],
      correctIndex: 0,
      solution: { steps: ['Factor numerator: x^2-9 = (x+3)(x-3).', '(x+3)(x-3)/(x-3) = x+3 for x not equal to 3.', 'lim as x->3 of (x+3) = 6.'] }
    },
    {
      question: 'lim(x->0) sin(x)/x = ?',
      type: 'mc',
      options: ['1', '0', 'infinity', 'undefined'],
      correctIndex: 0,
      solution: { steps: ['This is a fundamental limit.', 'As x->0, sin(x) and x are approximately equal.', 'The limit equals 1.', 'This result is essential for deriving the derivative of sin(x).'] }
    }
    ],
        freeResponse: [
          { difficulty: 'easy', question: '$\\lim_{x \\to 2} (x^2 - 1) =$?', accept: [3, '3'], placeholder: 'Number', explanation: '$2^2 - 1 = 3$.' },
          { difficulty: 'easy', question: '$\\lim_{x \\to 0} \\cos x =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\cos(0) = 1$.' },
          { difficulty: 'medium', question: '$\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1} =$?', accept: [2, '2'], placeholder: 'Number', explanation: 'Factor: $\\frac{(x-1)(x+1)}{x-1} = x+1 \\to 2$.' },
          { difficulty: 'medium', question: '$\\lim_{x \\to 0} \\frac{\\sin(2x)}{x} =$?', accept: [2, '2'], placeholder: 'Number', explanation: '$\\frac{\\sin(2x)}{x} = 2 \\cdot \\frac{\\sin(2x)}{2x} \\to 2 \\cdot 1 = 2$.' },
          { difficulty: 'hard', question: '$\\lim_{x \\to \\infty} \\frac{5x}{x+3} =$?', accept: [5, '5'], placeholder: 'Number', explanation: 'Divide by $x$: $\\frac{5}{1+3/x} \\to 5$.' },
          { difficulty: 'hard', question: '$\\lim_{x \\to 0^+} \\frac{1}{x} =$?', accept: ['infinity', 'inf', '\\infty'], placeholder: 'Answer', explanation: 'As $x \\to 0^+$, $1/x \\to +\\infty$.' },
    { difficulty: 'easy', question: '$\\lim_{x \\to 2} (3x + 1) =$?', accept: [7, '7'], placeholder: 'Number', explanation: 'Direct substitution: $3(2) + 1 = 7$.' },
    { difficulty: 'medium', question: '$\\lim_{x \\to 0} \\frac{\\sin x}{x} =$?', accept: [1, '1'], placeholder: 'Number', explanation: 'Famous limit: $\\lim_{x \\to 0} \\sin x / x = 1$.' }
        ],
        stepBuilder: [
          { difficulty: 'medium', question: 'Evaluate $\\lim_{x \\to 4} \\frac{\\sqrt{x} - 2}{x - 4}$.', steps: [
            { content: 'Direct substitution gives $\\frac{0}{0}$ (indeterminate).' },
            { content: 'Multiply by conjugate: $\\frac{\\sqrt{x}-2}{x-4} \\cdot \\frac{\\sqrt{x}+2}{\\sqrt{x}+2} = \\frac{x-4}{(x-4)(\\sqrt{x}+2)}$.' },
            { content: 'Cancel: $\\frac{1}{\\sqrt{x}+2}$.' },
            { content: 'Substitute: $\\frac{1}{\\sqrt{4}+2} = \\frac{1}{4}$.' },
    { difficulty: 'medium', question: 'Evaluate $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$.', steps: [
      { content: 'Direct substitution gives $0/0$: indeterminate.' },
      { content: 'Factor: $\\frac{(x-3)(x+3)}{x-3}$.' },
      { content: 'Cancel: $x + 3$.' },
      { content: '$\\lim_{x \\to 3}(x+3) = 6$.' }
    ], explanation: 'Factor to cancel the common term causing the indeterminate form.' }
          ], explanation: 'Rationalize the numerator to eliminate the indeterminate form.' }
        ],
        matching: [
          { difficulty: 'easy', instruction: 'Match each discontinuity type:', pairs: [
            { left: 'Removable', right: 'Hole in the graph' },
            { left: 'Jump', right: 'Left and right limits differ' },
            { left: 'Infinite', right: 'Vertical asymptote' }
          ] },
    { difficulty: 'medium', instruction: 'Match each limit to its value:', pairs: [
      { left: '$\\lim_{x\\to 0} \\frac{\\sin x}{x}$', right: '1' },
      { left: '$\\lim_{x\\to \\infty} \\frac{1}{x}$', right: '0' },
      { left: '$\\lim_{x\\to 0} \\frac{1-\\cos x}{x}$', right: '0' }
    ] }
        ],
        fillBlanks: [
          { difficulty: 'easy', context: 'Continuity at $x = a$:', expression: '$f$ is continuous at $a$ if $\\lim_{x \\to a} f(x) =$ {{0}}.', blanks: [ { accept: ['f(a)'], size: 6 } ], explanation: 'The limit must equal the function value.' },
          { difficulty: 'medium', context: 'Fundamental limit:', expression: '$\\lim_{x \\to 0} \\frac{\\sin x}{x} =$ {{0}}.', blanks: [ { accept: ['1'], size: 3 } ], explanation: 'This limit equals 1.' }
        ],
        multiPart: [
          { difficulty: 'hard', question: 'Analyze $f(x) = \\frac{x^2 - 4}{x - 2}$ at $x = 2$.', parts: [
            { question: 'Is $f(2)$ defined? (yes/no)', accept: ['no', 'No'], placeholder: 'yes or no', explanation: '$f(2) = 0/0$, undefined.' },
            { question: '$\\lim_{x \\to 2} f(x) =$?', accept: [4, '4'], placeholder: 'Number', explanation: '$\\frac{(x-2)(x+2)}{x-2} = x+2 \\to 4$.' },
            { question: 'What type of discontinuity?', accept: ['removable', 'Removable'], placeholder: 'Type', explanation: 'Limit exists but $f(2)$ undefined. Removable.' }
          ], completionMessage: 'Always check all 3 conditions for continuity.' }
        ],
        stuckGuide: { html: `<div class="callout callout-tip"><h4>\ud83e\udde0 Limit Strategies</h4><ol><li><strong>Direct substitution</strong> first. If it works, you are done.</li><li><strong>$0/0$ form:</strong> Factor, rationalize, or use L'H\u00f4pital's rule.</li><li><strong>$\\infty/\\infty$:</strong> Divide by highest power of $x$.</li><li><strong>Squeeze Theorem</strong> for oscillating functions.</li></ol></div>` }
      },
      {
        id: 'derivatives',
        title: 'Derivatives',
        description: 'The instantaneous rate of change. How fast is a quantity changing at this exact moment?',
        prereqRecap: [
          { term: 'Limit', definition: '$\\lim_{x \\to a} f(x) = L$ means $f(x)$ gets arbitrarily close to $L$ as $x$ approaches $a$.' },
          { term: 'Slope', definition: 'Rise over run: $m = \\frac{y_2 - y_1}{x_2 - x_1}$. For a line, slope is constant.' },
          { term: 'Tangent Line', definition: 'The line that just touches a curve at one point, matching the curve\'s direction there.' }
        ],
        whyExists: { html: `
          <p><strong>Why do derivatives exist?</strong> Speed is distance divided by time. But that gives <strong>average</strong> speed. What if you want speed at one exact instant? You cannot divide zero distance by zero time. The derivative solves this: $f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$. It takes the average rate over a shrinking interval and finds what it approaches.</p>
          <p><strong>Why is the derivative defined as a limit?</strong> Because instantaneous rate of change cannot be computed by division alone; it is the <strong>limit</strong> of average rates as the interval collapses to zero width. This is the precise meaning of "instantaneous."</p>
          <p><strong>Practical application:</strong> Velocity ($v = dx/dt$), acceleration ($a = dv/dt$), marginal cost in economics ($dC/dq$), rate of drug absorption in pharmacology ($dC/dt$), and current in electrical circuits ($I = dQ/dt$) are all derivatives.</p>
          ${WHY('Why does the power rule $d/dx[x^n] = nx^{n-1}$ work?', '<p>Expand $(x+h)^n$ using the binomial theorem: $(x+h)^n = x^n + nx^{n-1}h + \\binom{n}{2}x^{n-2}h^2 + \\cdots$. Subtract $x^n$ and divide by $h$: $\\frac{(x+h)^n - x^n}{h} = nx^{n-1} + \\text{terms with } h$. As $h \\to 0$, all terms with $h$ vanish, leaving $nx^{n-1}$. The binomial theorem (a consequence of the distributive axiom) is the mechanism.</p>')}
          ${WHY('Why does the chain rule work?', '<p>If $y = f(g(x))$, imagine a sequence of gears. $x$ turns the inner gear $g$, which turns the outer gear $f$. The total rate of turning is the product: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$ where $u = g(x)$. Each gear multiplies the rate. Formally, this follows from the limit of $\\frac{f(g(x+h)) - f(g(x))}{h} = \\frac{f(g(x+h)) - f(g(x))}{g(x+h) - g(x)} \\cdot \\frac{g(x+h) - g(x)}{h}$ as $h \\to 0$.</p>')}
        ` },
        hook: { html: `
          <div class="callout callout-puzzle"><h4>🧩 Puzzle: The Slope at a Point</h4>
          <p>A straight line has a constant slope. But what is the "slope" of $f(x) = x^2$ at $x = 3$? The curve is bending; there is no single slope.</p>
          <p>Solution: draw the <strong>tangent line</strong> (the line that just touches the curve at that point). Its slope IS the derivative: $f'(3) = 6$.</p></div>` },
        formalDefinitions: [
      { term: 'Derivative', symbol: "$f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$", definition: 'The instantaneous rate of change of $f$ at $x = a$. Geometrically: the slope of the tangent line to the graph at $(a, f(a))$.' },
      { term: 'Differentiable', symbol: '', definition: '$f$ is differentiable at $a$ if $f\\prime(a)$ exists. Differentiability implies continuity, but continuity does NOT imply differentiability (e.g., $|x|$ at $x=0$).' },
      { term: 'Chain Rule', symbol: '$(f \\circ g)\\prime(x) = f\\prime(g(x)) \\cdot g\\prime(x)$', definition: 'The derivative of a composition. Outer derivative evaluated at the inner function, multiplied by the inner derivative.' }
    ],
    graphExplorer: [
      { latex: 'f(x) = x^3 - 3x' },
      { latex: "g(x) = f'(x)" }
    ],
    background: {
      title: 'Why Derivatives? Instantaneous Change',
      content: '<p>The derivative answers: "How fast is this quantity changing <em>right now</em>?" Average speed is $\\frac{\\Delta\\text{distance}}{\\Delta\\text{time}}$. Instantaneous speed is the limit as $\\Delta t \\to 0$.</p><p>Leibniz wrote it as $\\frac{dy}{dx}$, suggesting an infinitely small ratio. Newton wrote it as $\\dot{y}$ (a dot above the variable). Both notations are still used: Leibniz notation in most math and physics, Newton\'s in mechanics.</p><p><strong>Why the chain rule works:</strong> If $y$ depends on $u$ which depends on $x$, then a small change in $x$ causes a small change in $u$, which causes a small change in $y$. The chain rule $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$ captures this cascading effect. Leibniz notation makes this look like fraction cancellation, which is intentional.</p>'
    },
    mathGrammar: [
      { question: 'What does $\\frac{d}{dx}$ mean?', answer: 'Read it as "the derivative with respect to $x$ of..." It is an operator: you apply it to a function. $\\frac{d}{dx}[x^2] = 2x$. It asks: "How fast does this function change as $x$ changes?"' },
      { question: 'Why is the power rule $\\frac{d}{dx}[x^n] = nx^{n-1}$?', answer: 'Start from the definition: $\\frac{(x+h)^n - x^n}{h}$ as $h \\to 0$. Expanding $(x+h)^n$ using the binomial theorem, the first term after $x^n$ is $nx^{n-1}h$. Dividing by $h$ gives $nx^{n-1}$ plus terms that vanish as $h \\to 0$. The reason you multiply by $n$ comes from the binomial theorem, which counts how many ways the product can change.' },
      { question: 'Why do we multiply by the exponent AND reduce it by one?', answer: 'The exponent tells you how many copies of $x$ are multiplied together. The derivative counts how much the product changes when $x$ changes. Each of the $n$ copies contributes to the change, giving factor $n$. One copy gets "used up" by differentiation, dropping the power to $n-1$.' },
      { question: 'When do I use the chain rule?', answer: 'Whenever you have a function inside another function. $\\sin(x^2)$ is $\\sin(\\text{something})$ where the something is $x^2$. The chain rule says: differentiate the outer ($\\cos(x^2)$), then multiply by the derivative of the inner ($2x$). Result: $2x\\cos(x^2)$.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 400 250" width="400" height="250" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="220" x2="380" y2="220" stroke="#94a3b8" stroke-width="1"/>
  <line x1="60" y1="20" x2="60" y2="230" stroke="#94a3b8" stroke-width="1"/>
  <path d="M 80 200 Q 150 180 200 120 Q 250 60 320 40" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <text x="330" y="38" fill="#3b82f6" font-size="12" font-family="Inter">f(x)</text>
  <line x1="130" y1="220" x2="290" y2="80" stroke="#10b981" stroke-width="1.5"/>
  <text x="295" y="78" fill="#10b981" font-size="11" font-family="Inter">tangent</text>
  <circle cx="200" cy="120" r="5" fill="#f59e0b"/>
  <text x="208" y="115" fill="#f59e0b" font-size="11" font-family="Inter">(a, f(a))</text>
  <text x="150" y="30" fill="#e2e8f0" font-size="13" font-family="Inter">slope of tangent = f'(a)</text>
  <text x="150" y="50" fill="#94a3b8" font-size="11" font-family="Inter">= instantaneous rate of change</text>
  <line x1="130" y1="190" x2="200" y2="190" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="200" y1="190" x2="200" y2="120" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="158" y="205" fill="#ef4444" font-size="10" text-anchor="middle" font-family="Inter">Δx→0</text>
  <text x="212" y="160" fill="#ef4444" font-size="10" font-family="Inter">Δy→0</text>
</svg>
</div>
<p class="math-diagram-label">The derivative f'(a) is the slope of the tangent line to f(x) at x = a</p>

          <div class="callout callout-key"><h4>The Derivative: From Secant to Tangent</h4>
          <p>The <strong>average rate of change</strong> of $f$ over $[a, a+h]$ is the slope of the <strong>secant line</strong>: $\\frac{f(a+h) - f(a)}{h}$.</p>
          <p>As $h \\to 0$, the secant line rotates toward the <strong>tangent line</strong>. The limit of the secant slopes IS the derivative:</p>
          <div class="math-block">$$f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$$</div>
          <p>This limit, when it exists, gives the <strong>instantaneous rate of change</strong> of $f$ at $x = a$.</p></div>

          <div class="callout callout-key"><h4>Proof: Power Rule ($\\frac{d}{dx}[x^n] = nx^{n-1}$)</h4>
          <p>Using the limit definition for $f(x) = x^n$:</p>
          <p>$f'(x) = \\lim_{h \\to 0} \\frac{(x+h)^n - x^n}{h}$</p>
          <p>By the Binomial Theorem: $(x+h)^n = x^n + nx^{n-1}h + \\binom{n}{2}x^{n-2}h^2 + \\cdots + h^n$</p>
          <p>Subtracting $x^n$ and dividing by $h$: $\\frac{nx^{n-1}h + \\binom{n}{2}x^{n-2}h^2 + \\cdots}{h} = nx^{n-1} + \\text{terms with } h$</p>
          <p>As $h \\to 0$, all terms with $h$ vanish, leaving $f'(x) = nx^{n-1}$. This proof works for positive integer $n$; the rule extends to all real $n$ via logarithmic differentiation.</p></div>

          <div class="callout callout-key"><h4>Complete Differentiation Rules</h4>
          <ul>
            <li><strong>Constant:</strong> $\\frac{d}{dx}[c] = 0$</li>
            <li><strong>Power Rule:</strong> $\\frac{d}{dx}[x^n] = nx^{n-1}$ for all real $n$</li>
            <li><strong>Constant Multiple:</strong> $\\frac{d}{dx}[cf(x)] = c \\cdot f'(x)$</li>
            <li><strong>Sum/Difference:</strong> $[f \\pm g]' = f' \\pm g'$</li>
            <li><strong>Product Rule:</strong> $[fg]' = f'g + fg'$ (Leibniz rule). Mnemonic: "first times derivative of second plus second times derivative of first."</li>
            <li><strong>Quotient Rule:</strong> $\\left[\\frac{f}{g}\\right]' = \\frac{f'g - fg'}{g^2}$. Mnemonic: "lo dee-hi minus hi dee-lo over lo-lo."</li>
            <li><strong>Chain Rule:</strong> $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$. The most important rule: the derivative of a composition is the outer derivative evaluated at the inner function, times the inner derivative.</li>
          </ul></div>

          <div class="callout callout-key"><h4>Derivatives of Transcendental Functions</h4>
          <ul>
            <li>$\\frac{d}{dx}[\\sin x] = \\cos x$, \\ $\\frac{d}{dx}[\\cos x] = -\\sin x$</li>
            <li>$\\frac{d}{dx}[\\tan x] = \\sec^2 x$, \\ $\\frac{d}{dx}[\\sec x] = \\sec x \\tan x$</li>
            <li>$\\frac{d}{dx}[\\cot x] = -\\csc^2 x$, \\ $\\frac{d}{dx}[\\csc x] = -\\csc x \\cot x$</li>
            <li>$\\frac{d}{dx}[e^x] = e^x$ ($e^x$ is its own derivative; this property defines $e$)</li>
            <li>$\\frac{d}{dx}[a^x] = a^x \\ln a$ (general exponential)</li>
            <li>$\\frac{d}{dx}[\\ln x] = \\frac{1}{x}$, \\ $\\frac{d}{dx}[\\log_a x] = \\frac{1}{x \\ln a}$</li>
            <li>$\\frac{d}{dx}[\\sin^{-1} x] = \\frac{1}{\\sqrt{1-x^2}}$, \\ $\\frac{d}{dx}[\\tan^{-1} x] = \\frac{1}{1+x^2}$</li>
          </ul></div>

          <div class="callout callout-key"><h4>Higher-Order Derivatives</h4>
          <p>The second derivative $f''(x)$ is the derivative of $f'(x)$. It measures <strong>concavity</strong>:</p>
          <ul>
            <li>$f''(x) \\gt 0$: concave up (graph curves upward like a bowl)</li>
            <li>$f''(x) \\lt 0$: concave down (graph curves downward like a cap)</li>
            <li>$f''(x) = 0$ (with sign change): <strong>inflection point</strong> (concavity reversal)</li>
          </ul>
          <p>Physical interpretation: if $s(t)$ = position, then $s'(t)$ = velocity, $s''(t)$ = acceleration.</p></div>

          <div class="callout callout-key"><h4>Implicit Differentiation</h4>
          <p>When $y$ is defined implicitly by an equation (e.g., $x^2 + y^2 = 25$), differentiate both sides with respect to $x$, treating $y$ as a function of $x$:</p>
          <p>$2x + 2y\\frac{dy}{dx} = 0 \\Rightarrow \\frac{dy}{dx} = -\\frac{x}{y}$</p>
          <p>Every time you differentiate a term containing $y$, multiply by $\\frac{dy}{dx}$ (chain rule).</p></div>` },
        definition: { html: `
          <p><strong>Formal Definition:</strong></p>
          <div class="math-block">$$f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}$$</div>
          <p><strong>Notation variants:</strong> $f'(x)$, $\\frac{dy}{dx}$, $\\frac{df}{dx}$, $Df(x)$, $\\dot{y}$ (for time derivatives).</p>
          <div class="callout callout-warning"><h4>⚠ Differentiable Implies Continuous (Not Vice Versa)</h4>
          <p>If $f'(a)$ exists, then $f$ is continuous at $a$. The converse is false: $f(x) = |x|$ is continuous at $0$ but not differentiable (the graph has a corner). Other non-differentiable cases: cusps (e.g., $x^{2/3}$ at 0) and vertical tangents.</p></div>` },
        examples: [{
          title: 'Chain Rule Application',
          problem: 'Find $\\frac{d}{dx}[\\sin(3x^2 + 1)]$.',
          steps: [
            { title: 'Identify outer and inner functions', content: 'Outer: $\\sin(u)$ where $u = 3x^2 + 1$. Inner: $u = 3x^2 + 1$.', why: 'The chain rule applies to compositions: $f(g(x))$. Identify $f$ and $g$.' },
            { title: 'Differentiate outer', content: '$\\frac{d}{du}[\\sin u] = \\cos u$', why: 'Standard derivative of sine.' },
            { title: 'Differentiate inner', content: '$\\frac{du}{dx} = 6x$', why: 'Power rule on $3x^2$; the derivative of constant 1 is 0.' },
            { title: 'Multiply (chain rule)', content: '$\\frac{dy}{dx} = \\cos(3x^2 + 1) \\cdot 6x = 6x\\cos(3x^2 + 1)$', why: 'Chain rule: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$.' }
          ]
        },
        {
          title: 'Product Rule',
          problem: 'Find $\\frac{d}{dx}[x^2 \\ln x]$.',
          steps: [
            { title: 'Identify $f$ and $g$', content: '$f(x) = x^2$, $g(x) = \\ln x$.', why: 'Product rule applies when differentiating a product of two functions.' },
            { title: 'Compute derivatives', content: '$f^{\\prime}(x) = 2x$, $g^{\\prime}(x) = \\frac{1}{x}$.', why: 'Power rule for $x^2$; standard derivative for $\\ln x$.' },
            { title: 'Apply product rule', content: '$[fg]^{\\prime} = f^{\\prime}g + fg^{\\prime} = 2x \\cdot \\ln x + x^2 \\cdot \\frac{1}{x} = 2x\\ln x + x$.', why: 'First times derivative of second plus second times derivative of first. Simplify: $x^2 \\cdot (1/x) = x$.' }
          ]
        },
        {
          title: 'Implicit Differentiation',
          problem: 'Find $\\frac{dy}{dx}$ if $x^2 + y^2 = 25$ (equation of a circle).',
          steps: [
            { title: 'Differentiate both sides w.r.t. $x$', content: '$\\frac{d}{dx}[x^2] + \\frac{d}{dx}[y^2] = \\frac{d}{dx}[25]$.', why: '$y$ is an implicit function of $x$. Every term gets differentiated.' },
            { title: 'Apply chain rule to $y^2$', content: '$2x + 2y\\frac{dy}{dx} = 0$.', why: '$\\frac{d}{dx}[y^2] = 2y \\cdot \\frac{dy}{dx}$ by chain rule. The $\\frac{dy}{dx}$ appears because $y$ depends on $x$.' },
            { title: 'Solve for $\\frac{dy}{dx}$', content: '$\\frac{dy}{dx} = -\\frac{x}{y}$.', why: 'At point $(3, 4)$: slope $= -3/4$. At $(0, 5)$: slope $= 0$ (top of circle). At $(5, 0)$: undefined (vertical tangent).' }
          ]
        }],
         flashCards: [
      { type: 'why', front: 'Why study continuity before derivatives?', back: 'Differentiability requires continuity. A function with a jump cannot have a tangent line at the jump point.' },
      { type: 'define', front: 'What is a one-sided limit?', back: 'Limit from left: x->a- (approaching from smaller values). Limit from right: x->a+. Full limit exists only if both sides agree.' },
      { type: 'how', front: 'How to check differentiability?', back: 'A function is differentiable at a if lim[f(a+h)-f(a)]/h exists. Fails at corners (|x|), cusps, vertical tangents, and discontinuities.' }
    ],
    exercises: [{
          difficulty: 'easy',
          question: 'What is $\\frac{d}{dx}[x^5]$?',
          options: ['$5x^4$', '$5x^5$', '$x^4$', '$4x^5$'],
          correctIndex: 0,
          hint: '<p>Power rule: bring the exponent down, subtract 1.</p>',
          correctExplanation: '$\\frac{d}{dx}[x^5] = 5x^4$.',
          wrongExplanations: { 1: 'Exponent decreases by 1.', 2: 'Coefficient = old exponent.', 3: 'Coefficient should be 5, exponent 4.' }
        },{
          difficulty: 'easy',
          question: '$\\frac{d}{dx}[e^x] =$?',
          options: ['$xe^{x-1}$', '$e^x$', '$e^{x+1}$', '$\\frac{e^{x+1}}{x+1}$'],
          correctIndex: 1,
          hint: '<p>$e^x$ is its own derivative.</p>',
          correctExplanation: '$\\frac{d}{dx}[e^x] = e^x$. The exponential function is unique: it equals its own derivative.',
          wrongExplanations: { 0: 'Power rule does not apply to $e^x$. That rule is for $x^n$.', 2: 'No extra factor is introduced.', 3: 'That is the integral-like form, not the derivative.' }
        },{
          difficulty: 'medium',
          question: 'Find $\\frac{d}{dx}[x^2 \\sin x]$ using the product rule.',
          options: ['$2x \\sin x + x^2 \\cos x$', '$2x \\cos x$', '$2x \\sin x \\cos x$', '$x^2 \\cos x - 2x \\sin x$'],
          correctIndex: 0,
          hint: '<p>$(fg)\' = f\'g + fg\'$.</p>',
          correctExplanation: '$f\' = 2x$, $g\' = \\cos x$. Product rule: $2x\\sin x + x^2\\cos x$.',
          wrongExplanations: { 1: 'Product rule keeps one factor undifferentiated each time.', 2: 'Mixed up product and chain rules.', 3: 'Product rule adds, not subtracts.' }
        },{
          difficulty: 'hard',
          question: '$\\frac{d}{dx}[\\ln(x^2 + 1)] =$?',
          options: ['$\\frac{1}{x^2+1}$', '$\\frac{2x}{x^2+1}$', '$\\frac{2}{x^2+1}$', '$2x\\ln(x^2+1)$'],
          correctIndex: 1,
          hint: '<p>Chain rule: $\\frac{d}{dx}[\\ln u] = \\frac{u\'}{u}$.</p>',
          correctExplanation: 'Chain rule: $\\frac{1}{x^2+1} \\cdot 2x = \\frac{2x}{x^2+1}$.',
          wrongExplanations: { 0: 'Missing the chain rule factor $2x$.', 2: 'Inner derivative is $2x$, not $2$.', 3: 'That reverses the ln and power functions.' }
        }],
        freeResponse: [
          { difficulty: 'easy', question: '$\\frac{d}{dx}[x^3] =$?', accept: ['3x^2', '3x2'], placeholder: 'Expression', explanation: 'Power rule: $3x^2$.' },
          { difficulty: 'easy', question: '$\\frac{d}{dx}[7x] =$?', accept: [7, '7'], placeholder: 'Number', explanation: 'Constant multiple: $7$.' },
          { difficulty: 'medium', question: '$\\frac{d}{dx}[\\sin(3x)] =$?', accept: ['3cos(3x)', '3\\cos(3x)'], placeholder: 'Expression', explanation: 'Chain rule: $\\cos(3x) \\cdot 3 = 3\\cos(3x)$.' },
          { difficulty: 'medium', question: '$\\frac{d}{dx}[x^2 \\cdot e^x]$ at $x = 0$ equals:', accept: [0, '0'], placeholder: 'Number', explanation: 'Product rule: $2xe^x + x^2e^x$. At $x=0$: $0 + 0 = 0$.' },
          { difficulty: 'hard', question: 'Find $f\'(2)$ if $f(x) = x^3 - 4x$:', accept: [8, '8'], placeholder: 'Number', explanation: '$f\'(x) = 3x^2 - 4$. $f\'(2) = 12 - 4 = 8$.' },
          { difficulty: 'hard', question: '$\\frac{d}{dx}[\\ln(x^2)] =$?', accept: ['2/x', '2x^{-1}'], placeholder: 'Expression', explanation: 'Chain rule: $\\frac{2x}{x^2} = \\frac{2}{x}$. Or: $\\ln(x^2) = 2\\ln x$, so derivative is $2/x$.' },
    { difficulty: 'easy', question: '$\\frac{d}{dx}(5x^3) =$?', accept: ['15x^2', '15x2'], placeholder: 'Expression', explanation: 'Power rule: $5 \\cdot 3x^2 = 15x^2$.' },
    { difficulty: 'medium', question: '$\\frac{d}{dx}(e^{3x}) =$?', accept: ['3e^(3x)', '3e^{3x}'], placeholder: 'Expression', explanation: 'Chain rule: $e^{3x} \\cdot 3 = 3e^{3x}$.' }
        ],
        stepBuilder: [
          { difficulty: 'medium', question: 'Differentiate $f(x) = (2x+1)^5$ using the chain rule.', steps: [
            { content: 'Outer function: $u^5$. Inner function: $u = 2x+1$.' },
            { content: 'Outer derivative: $5u^4 = 5(2x+1)^4$.' },
            { content: 'Inner derivative: $\\frac{du}{dx} = 2$.' },
            { content: 'Chain rule: $5(2x+1)^4 \\cdot 2 = 10(2x+1)^4$.' }
          ], explanation: 'Chain rule: multiply the outer derivative (evaluated at inner) by the inner derivative.' },
          { difficulty: 'hard', question: 'Use the quotient rule on $f(x) = \\frac{x^2}{x+1}$.', steps: [
            { content: '$f = x^2$ (numerator), $g = x+1$ (denominator).' },
            { content: '$f\' = 2x$, $g\' = 1$.' },
            { content: 'Quotient rule: $\\frac{f\'g - fg\'}{g^2} = \\frac{2x(x+1) - x^2(1)}{(x+1)^2}$.' },
            { content: 'Simplify: $\\frac{2x^2 + 2x - x^2}{(x+1)^2} = \\frac{x^2 + 2x}{(x+1)^2} = \\frac{x(x+2)}{(x+1)^2}$.' }
          ], explanation: 'Quotient rule: "low d-high minus high d-low, all over low squared."' }
        ],
        matching: [
          { difficulty: 'easy', instruction: 'Match each function to its derivative:', pairs: [
            { left: '$x^n$', right: '$nx^{n-1}$' },
            { left: '$\\sin x$', right: '$\\cos x$' },
            { left: '$e^x$', right: '$e^x$' },
            { left: '$\\ln x$', right: '$1/x$' },
            { left: '$\\cos x$', right: '$-\\sin x$' }
          ] }
        ],
        fillBlanks: [
          { difficulty: 'easy', context: 'Product rule:', expression: '$(fg)\' = f\'g +$ {{0}}', blanks: [ { accept: ['fg\'', "fg'"], size: 6 } ], explanation: '$(fg)\' = f\'g + fg\'$.' },
          { difficulty: 'medium', context: 'Chain rule:', expression: '$\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot$ {{0}}', blanks: [ { accept: ['g\'(x)', "g'(x)"], size: 6 } ], explanation: 'Multiply by the derivative of the inner function.' }
        ],
        visualizations: [{
          render: (containerId) => {
            Viz.derivativeVisualizer(containerId, x => x*x, x => 2*x, {
              xMin: -4, xMax: 4, yMin: -2, yMax: 10,
              title: 'f(x) = x\u00b2 \u2014 Move cursor to see tangent line',
              width: 600, height: 380
            });
          }
        }],
        stuckGuide: { html: `<div class="callout callout-tip"><h4>\ud83e\udde0 Differentiation Strategy</h4>
          <ol><li><strong>Sum/Difference:</strong> Differentiate term by term.</li>
          <li><strong>Product:</strong> $(fg)\' = f\'g + fg\'$.</li>
          <li><strong>Quotient:</strong> $\\frac{f\'g - fg\'}{g^2}$.</li>
          <li><strong>Composition:</strong> Chain rule: outer derivative times inner derivative.</li></ol></div>` }
      },
      {
        id: 'derivative-applications',
        title: 'Applications of Derivatives',
        description: 'Optimization, related rates, and curve sketching. Using derivatives to solve real problems.',
        prereqRecap: [
          { term: 'Derivative', definition: '$f\'(x)$ is the instantaneous rate of change of $f$ at $x$.' },
          { term: 'Critical Point', definition: 'A point where $f\'(c) = 0$ or $f\'(c)$ is undefined. Candidates for maxima/minima.' },
          { term: 'Continuous', definition: 'No jumps, holes, or breaks. $\\lim_{x \\to a} f(x) = f(a)$.' }
        ],
        whyExists: { html: `
          <p><strong>Why use derivatives for optimization?</strong> At a maximum or minimum, the function momentarily stops increasing or decreasing. That means the rate of change is zero: $f'(c) = 0$. This is Fermat's theorem: if $f$ has a local extremum at $c$ and $f'(c)$ exists, then $f'(c) = 0$. Finding where $f' = 0$ locates all potential extrema.</p>
          <p><strong>Why does the second derivative test work?</strong> $f''(c) \\gt 0$ means $f'$ is increasing at $c$. Since $f'(c) = 0$ and $f'$ is increasing, $f'$ goes from negative to positive, which means $f$ goes from decreasing to increasing: a local minimum. The reverse holds for $f''(c) \\lt 0$.</p>
          <p><strong>Practical application:</strong> Maximizing profit, minimizing material costs, optimizing drug dosage timing, designing minimal-surface-area containers, finding the fastest route (Snell's law derives from optimization), and training neural networks (gradient descent finds the loss function minimum).</p>
          ${WHY('Why do related rates work?', '<p>If multiple quantities are connected by an equation and all change over time, differentiating the equation with respect to $t$ (using the chain rule) relates their rates of change. For example, if $x^2 + y^2 = r^2$ describes a constraint, then $2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$ connects the rates. The chain rule is the bridge from static equations to dynamic relationships.</p>')}
        ` },
        hook: { html: `
          <div class="callout callout-puzzle"><h4>🧩 Puzzle: The Optimal Box</h4>
          <p>You have a 20cm �: 20cm sheet of cardboard. Cut squares from each corner, fold up the sides to make a box. What size squares maximize the volume?</p>
          <p>If the cut square has side $x$: volume $V(x) = x(20-2x)^2$. Find $V'(x) = 0$, verify it is a maximum. Calculus gives the exact optimal cut: $x = \\frac{10}{3}$ cm.</p></div>` },
        concept: { html: `
          <div class="callout callout-key"><h4>Finding Max/Min Values</h4>
          <ol>
            <li><strong>Find critical points:</strong> Solve $f'(x) = 0$ and find where $f'$ is undefined.</li>
            <li><strong>First Derivative Test:</strong> If $f'$ changes from $+$ to $-$ at $c$, then $f(c)$ is a local maximum. If $-$ to $+$, local minimum.</li>
            <li><strong>Second Derivative Test:</strong> If $f'(c) = 0$ and $f''(c) \\lt 0$, local max. If $f''(c) \\gt 0$, local min.</li>
            <li><strong>Absolute extrema on $[a,b]$:</strong> Evaluate $f$ at all critical points AND at the endpoints $a$ and $b$. The largest value is the absolute max; the smallest is the absolute min.</li>
          </ol></div>
          <div class="callout callout-key"><h4>What Derivatives Tell Us</h4>
          <ul>
            <li>$f' > 0$: function is increasing</li>
            <li>$f' < 0$: function is decreasing</li>
            <li>$f'' > 0$: concave up (bowl shape ∪)</li>
            <li>$f'' < 0$: concave down (dome shape ∩)</li>
            <li>$f'' = 0$ (with sign change): inflection point</li>
          </ul></div>` },
        definition: { html: `
          <p><strong>Mean Value Theorem:</strong> If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then:</p>
          <div class="math-block">$$\\exists c \\in (a,b) \\text{ such that } f'(c) = \\frac{f(b) - f(a)}{b - a}$$</div>
          <p>There is at least one point where the instantaneous rate of change equals the average rate of change.</p>` },
        examples: [{
          title: 'Optimization Problem',
          problem: 'A farmer has 200m of fencing to enclose a rectangular field along a river (no fence needed on the river side). What dimensions maximize the area?',
          steps: [
            { title: 'Set up variables', content: 'Let $x$ = width (perpendicular to river), $y$ = length (along river). Constraint: $2x + y = 200$, so $y = 200 - 2x$.', why: 'Three sides of fencing: two widths and one length.' },
            { title: 'Write the objective function', content: '$A(x) = x \\cdot y = x(200 - 2x) = 200x - 2x^2$', why: 'Area = length �: width. Substitute the constraint to get a function of one variable.' },
            { title: 'Differentiate and find critical points', content: '$A\'(x) = 200 - 4x = 0 \\Rightarrow x = 50$', why: 'Setting the derivative to zero finds where the rate of change of area is zero: a potential maximum or minimum.' },
            { title: 'Verify maximum', content: '$A\'\'(x) = -4 \\lt 0$, so $x = 50$ gives a maximum. $y = 200 - 2(50) = 100$. Area = $50 \\times 100 = 5000$ m².', why: 'Negative second derivative confirms upward-facing tangent, indicating a local (and absolute) maximum.' }
          ]
        }],
        exercises: [{
          difficulty: 'easy',
          question: 'If $f\'(c) = 0$, then $c$ is called a:',
          options: ['Zero of $f$', 'Critical point', 'Inflection point', 'Asymptote'],
          correctIndex: 1,
          hint: '<p>Where the derivative equals zero.</p>',
          correctExplanation: 'A critical point is where $f\'(c) = 0$ or $f\'$ is undefined.',
          wrongExplanations: { 0: 'Zeros of $f$ are where $f(c) = 0$, not $f\'(c) = 0$.', 2: 'Inflection points are where $f\'\'$ changes sign.', 3: 'Asymptotes are about limits, not derivatives.' }
        },{
          difficulty: 'medium',
          question: 'Find the critical points of $f(x) = x^3 - 3x^2 + 2$.',
          options: ['$x = 0$ and $x = 2$', '$x = 0$ only', '$x = 1$ and $x = -1$', '$x = 3$ only'],
          correctIndex: 0,
          hint: '<p>$f\'(x) = 3x^2 - 6x$. Factor.</p>',
          correctExplanation: '$3x(x-2) = 0$. $x = 0$ or $x = 2$.',
          wrongExplanations: { 1: 'Missed $x-2 = 0$.', 2: 'Derivative is $3x^2-6x$, not $3x^2-3$.', 3: '$f\'(3) = 9 \\neq 0$.' }
        },{
          difficulty: 'hard',
          question: 'A box with square base (side $x$) and volume 32 cm\u00b3. Which minimizes surface area?',
          options: ['$x = 2$', '$x = 4$', '$x = 8$', '$x = \\sqrt[3]{32}$'],
          correctIndex: 1,
          hint: '<p>$V = x^2h = 32$, so $h = 32/x^2$. $S = 2x^2 + 4xh$.</p>',
          correctExplanation: '$S(x) = 2x^2 + 128/x$. $S\'(x) = 4x - 128/x^2 = 0$. $x^3 = 32$. $x = \\sqrt[3]{32} \\approx 3.17$. Check: $x = 4$ is closest answer; exact is $2\\sqrt[3]{4}$.',
          wrongExplanations: { 0: 'Too small. $S\'(2) = 8 - 32 \\lt 0$, still decreasing.', 2: 'Too large. $S\'(8) = 32 - 2 \\gt 0$, past minimum.', 3: '$\\sqrt[3]{32} \\approx 3.17$, close to 4.' }
        }],
        freeResponse: [
          { difficulty: 'easy', question: '$f(x) = x^2 - 6x + 5$. Find the x-coordinate of the vertex (minimum):', accept: [3, '3'], placeholder: 'Number', explanation: '$f\'(x) = 2x - 6 = 0 \\Rightarrow x = 3$.' },
          { difficulty: 'easy', question: 'If $f\'(x) > 0$ on $(a, b)$, is $f$ increasing or decreasing?', accept: ['increasing'], placeholder: 'increasing/decreasing', explanation: 'Positive derivative = function is increasing.' },
          { difficulty: 'medium', question: '$f(x) = x^3 - 12x$. How many critical points?', accept: [2, '2'], placeholder: 'Number', explanation: '$f\'(x) = 3x^2 - 12 = 0$. $x^2 = 4$. $x = \\pm 2$. Two critical points.' },
          { difficulty: 'medium', question: 'Find the inflection point of $f(x) = x^3$:', accept: [0, '0', 'x=0'], placeholder: 'x value', explanation: '$f\'\'(x) = 6x = 0 \\Rightarrow x = 0$. Sign changes: inflection point.' },
          { difficulty: 'hard', question: 'Find the absolute max of $f(x) = -x^2 + 4x$ on $[0, 5]$:', accept: [4, '4'], placeholder: 'Max value', explanation: '$f\'(x) = -2x + 4 = 0 \\Rightarrow x = 2$. $f(0) = 0, f(2) = 4, f(5) = -5$. Max = 4.' },
    { difficulty: 'easy', question: 'If $f(x) = x^2$, the tangent slope at $x = 3$ is:', accept: [6, '6'], placeholder: 'Number', explanation: '$f\'(x) = 2x$. $f\'(3) = 6$.' },
    { difficulty: 'medium', question: '$f(x) = x^3 - 3x$. Find the critical points:', accept: ['1, -1', '-1, 1', '1,-1'], placeholder: 'x values', explanation: '$f\'(x) = 3x^2 - 3 = 0$. $x^2 = 1$. $x = \\pm 1$.' }
        ],
        stepBuilder: [
          { difficulty: 'hard', question: 'A farmer has 200m of fencing for a rectangular field along a river (no fence on river side). Maximize area.', steps: [
            { content: 'Let $x$ = width. Constraint: $2x + y = 200$, so $y = 200 - 2x$.' },
            { content: '$A(x) = x(200-2x) = 200x - 2x^2$.' },
            { content: '$A\'(x) = 200 - 4x = 0 \\Rightarrow x = 50$.' },
            { content: '$A\'\'(x) = -4 \\lt 0$: confirmed maximum.' },
            { content: '$y = 100$. Max area = $50 \\times 100 = 5000$ m\u00b2.' }
          ], explanation: 'Optimization: write objective in one variable, differentiate, verify with second derivative.' }
        ],
        matching: [
          { difficulty: 'easy', instruction: 'Match derivative sign to function behavior:', pairs: [
            { left: '$f\' > 0$', right: 'Function increasing' },
            { left: '$f\' < 0$', right: 'Function decreasing' },
            { left: '$f\'\'> 0$', right: 'Concave up' },
            { left: '$f\'\' < 0$', right: 'Concave down' }
          ] }
        ],
        fillBlanks: [
          { difficulty: 'easy', context: 'Critical points:', expression: 'Critical points occur where $f\'(x) =$ {{0}} or $f\'$ is undefined.', blanks: [ { accept: ['0'], size: 3 } ], explanation: 'Set derivative to zero.' },
          { difficulty: 'medium', context: 'Second derivative test:', expression: 'If $f\'(c) = 0$ and $f\'\' (c) \\gt 0$, then $c$ is a local {{0}}.', blanks: [ { accept: ['minimum', 'min'], size: 8 } ], explanation: 'Positive second derivative = concave up = minimum.' },
    { difficulty: 'medium', context: 'Critical points:', expression: 'A critical point occurs where $f\'(x) =$ {{0}} or $f\'(x)$ is undefined.', blanks: [ { accept: ['0', 'zero'], size: 4 } ], explanation: 'Critical points: $f\'(x) = 0$ or $f\'(x)$ DNE.' }
        ],
        multiPart: [
          { difficulty: 'hard', question: 'Analyze $f(x) = x^3 - 3x$ completely.', parts: [
            { question: 'Find $f\'(x)$:', accept: ['3x^2-3', '3x^2 - 3'], placeholder: 'Expression', explanation: '$f\'(x) = 3x^2 - 3$.' },
            { question: 'Critical points (list x values):', accept: ['1,-1', '-1,1', '-1, 1', '1, -1'], placeholder: 'x values', explanation: '$3(x^2-1) = 0 \\Rightarrow x = \\pm 1$.' },
            { question: 'Is $x = -1$ a local max or min?', accept: ['max', 'maximum', 'local max'], placeholder: 'max or min', explanation: '$f\'\'(x) = 6x$. $f\'\' (-1) = -6 \\lt 0$: local maximum.' },
            { question: 'Is $x = 1$ a local max or min?', accept: ['min', 'minimum', 'local min'], placeholder: 'max or min', explanation: '$f\'\'(1) = 6 \\gt 0$: local minimum.' }
          ], completionMessage: 'Full curve analysis: first derivative for critical points, second derivative for classification.' }
        ],
        stuckGuide: { html: `<div class="callout callout-tip"><h4>\ud83e\udde0 Optimization Workflow</h4>
          <ol><li><strong>Draw a picture</strong> and label quantities.</li>
          <li><strong>Write objective function</strong> in one variable using constraints.</li>
          <li><strong>Differentiate, set to zero, solve.</strong></li>
          <li><strong>Second derivative test</strong> to confirm max/min.</li>
          <li><strong>Check endpoints</strong> for absolute extrema on closed intervals.</li></ol></div>` }
      }
    ]
  });
})();
