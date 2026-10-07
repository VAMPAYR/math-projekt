/* ============================================================
   MODULE: GRE Quantitative Reasoning
   Test-specific layer only. Each topic states the foundation
   needed for its problems, links back to the lessons that teach
   that foundation in depth, and adds GRE strategy plus problems
   in GRE-style formats (quantitative comparison, multi-select,
   numeric entry, multiple choice).
   ============================================================ */
(function () {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];
  // Keep data-interpretation practice usable when opened without the lesson chart.
  const GRE_SALES_TABLE = `<table><caption>Monthly sales, in thousands of dollars</caption><thead><tr><th scope="col">January</th><th scope="col">February</th><th scope="col">March</th><th scope="col">April</th><th scope="col">May</th></tr></thead><tbody><tr><td>40</td><td>55</td><td>30</td><td>60</td><td>65</td></tr></tbody></table>`;

  window.MATH_MODULES.push({
    id: 'gre-quant',
    order: 15,
    title: 'GRE Quantitative Reasoning',
    description: 'GRE General Test Quant practice: four question formats, original problems, and explanations that connect arithmetic, algebra, geometry, and data analysis to their foundational lessons.',
    topics: [

      /* ======================================================
         TOPIC 1: HOW GRE QUANT WORKS
         ====================================================== */
      {
        id: 'gre-quant-playbook',
        title: 'The GRE Quant Playbook',
        description: 'The four question formats, what each one rewards, and the five core strategies used across every GRE topic.',
        foundationRefs: [
          { moduleId: 'foundations', topicId: 'basic-arithmetic', note: 'Order of operations and arithmetic fluency. Every strategy below assumes you can compute small expressions quickly and correctly.' },
          { moduleId: 'beginning-algebra', topicId: 'linear-equations-one-var', note: 'Solving one-variable equations is the engine behind backsolving and plugging in numbers.' }
        ],
        hook: String.raw`
          <div class="callout callout-puzzle">
            <h4>Puzzle: The Question You Never Compute</h4>
            <p>Compare $23 \cdot 17 - 23 \cdot 7$ with $23 \cdot 10$. The distributive law gives $23(17-7) = 23 \cdot 10$, so the quantities are equal. Factoring resolves the comparison without multiplying the larger numbers.</p>
            <p>Choose a method that answers the requested question. A comparison may need only a bound or an identity; a numeric-entry question needs the value in the requested form.</p>
          </div>
        `,
        whyExists: String.raw`
          <p>This module prepares you for the <strong>GRE General Test Quantitative Reasoning measure</strong>. It connects the site's foundational lessons to original practice. ETS lists arithmetic, algebra, geometry, and data analysis; trigonometry and calculus are outside this measure. <a href="https://www.ets.org/gre/test-takers/general-test/prepare/content/quantitative-reasoning.html" target="_blank" rel="noopener noreferrer">ETS Quant content</a>.</p>
          <p>The current standard timing is $12$ questions in $21$ minutes, then $15$ questions in $26$ minutes: roughly $1$ minute $45$ seconds per question on average. You can mark, revisit, and change answers within a section. The second Quant section adapts to performance on the first. <a href="https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html" target="_blank" rel="noopener noreferrer">ETS test structure</a> (checked October 6, 2026).</p>
          <p>Start without a timer. Identify the constraint, choose a method, and explain why the answer follows. After accuracy becomes consistent, practice under section timing. Record whether each mistake came from reading, modeling, computation, or answer entry; repair the specific step and solve a different problem that uses it.</p>
        `,
        concept: String.raw`
          <p><strong>The Foundation: four question formats.</strong></p>
          <div class="callout callout-key">
            <h4>1. Quantitative Comparison (QC)</h4>
            <p>Compare Quantity A and Quantity B under every given constraint. The choices are:</p>
            <p>(A) Quantity A is greater. &nbsp; (B) Quantity B is greater. &nbsp; (C) The two quantities are equal. &nbsp; (D) The relationship cannot be determined.</p>
            <p>Choose (D) only when different allowed cases produce different relationships. A variable can vary while the relationship stays fixed. If both quantities have fixed numerical values, their relationship is determined.</p>
          </div>
          <div class="callout callout-key">
            <h4>2. Multiple Choice: select one</h4>
            <p>Select one of five choices. Substitution can test a candidate answer; the spacing of numerical choices helps you decide whether estimation is sufficient.</p>
          </div>
          <div class="callout callout-key">
            <h4>3. Multiple Choice: select one or more</h4>
            <p>Read whether the question specifies a number of choices or asks for all that apply. Check every candidate and select the complete correct set; partial selections do not earn credit. <a href="https://www.ets.org/pdfs/gre/sample-question-overview.pdf" target="_blank" rel="noopener noreferrer">ETS selection directions</a>.</p>
          </div>
          <div class="callout callout-key">
            <h4>4. Numeric Entry</h4>
            <p>The test uses one box for an integer or decimal, or two boxes for a fraction. Enter the requested units and precision. Equivalent fractions need not be reduced if they fit the boxes. <a href="https://www.ets.org/pdfs/gre/sample-question-overview.pdf" target="_blank" rel="noopener noreferrer">ETS entry instructions</a>.</p>
            <p>This site's practice uses a single field. Type a number or a fraction such as <code>1/4</code>. It checks the value for these exercises; it does not reproduce the GRE's two-box interface. Do not type an expression involving $\pi$ into a test numeric-entry box.</p>
          </div>
          <p>ETS assumes real numbers. Geometric sketches are not necessarily to scale, but coordinate systems and data graphs are to scale; respect their axes and units. <a href="https://www.ets.org/gre/test-takers/general-test/prepare/content/quantitative-reasoning.html" target="_blank" rel="noopener noreferrer">ETS figure conventions</a>.</p>
          <p>The on-screen calculator provides arithmetic and square roots, with memory and answer transfer. It does not replace the equation or the sign check. <a href="https://www.ets.org/content/dam/ets-org/pdfs/gre/on-screen-calculator-guidelines.pdf" target="_blank" rel="noopener noreferrer">ETS calculator guide</a>.</p>
        `,
        abstraction: String.raw`
          <p><strong>For a comparison, determine the order without calculating more than you need.</strong> Factoring, bounds, and allowed test cases can answer different parts of this task.</p>
          <p>When you ask "which is bigger, $A$ or $B$?", the answer only depends on the <em>order relation</em> between them. Any transformation that preserves order can be applied freely: adding the same amount to both, subtracting the same amount, multiplying both by the same positive number. These are called <em>order-preserving (monotone) transformations</em>, and they are the mathematical reason Strategy 1 works.</p>
          <p>The traps are exactly the transformations that <em>fail</em> to preserve order:</p>
          <ul>
            <li>Multiplying by a negative <em>reverses</em> order: $2 \lt 3$ but $-2 \gt -3$.</li>
            <li>Squaring preserves order only for nonnegative numbers: $-3 \lt 2$ but $9 \gt 4$.</li>
            <li>Taking reciprocals reverses order for same-sign numbers: $2 \lt 3$ but $\frac{1}{2} \gt \frac{1}{3}$.</li>
          </ul>
          <p>Testing numbers searches for cases that satisfy <em>all</em> the constraints. Two allowed cases with different relationships prove (D): one may give A greater and another equality, for example. A single counterexample disproves a proposed universal relationship but does not, by itself, establish (D). To select (A), (B), or (C), justify that the relationship holds throughout the allowed domain. Testing all cases works when the domain is finite; a few examples cannot prove a statement about an unlimited domain.</p>
        `,
        stuckGuide: String.raw`
          <p><strong>The five core strategies.</strong> Every later topic applies these; learn them here once.</p>
          <div class="callout callout-tip">
            <h4>Strategy 1: In QC, compare instead of computing</h4>
            <p>Treat the two quantities like two sides of a scale. You may add or subtract the same thing on both sides, and multiply or divide both sides by the same <em>positive</em> number, without changing which side is bigger. Simplify until the comparison is obvious.</p>
          </div>
          <div class="callout callout-tip">
            <h4>Strategy 2: In QC with variables, test devious numbers</h4>
            <p>Try permitted values from different regimes: $0$, $1$, a fraction like $\frac{1}{2}$, a negative, and a large number. Exclude values forbidden by the question or by a denominator. Two cases with different relationships establish (D); matching cases suggest a pattern that still needs justification.</p>
          </div>
          <div class="callout callout-tip">
            <h4>Strategy 3: Backsolve from the choices</h4>
            <p>Substitute a choice into the original conditions. If the choices are ordered <em>and</em> the tested expression is monotonic across them, the result can tell you which direction to try next. Establish that direction before discarding choices. For $x^2$, values on both sides of zero do not follow one monotonic rule; test the candidates or solve algebraically.</p>
          </div>
          <div class="callout callout-tip">
            <h4>Strategy 4: Plug in smart numbers</h4>
            <p>Choose simple values that satisfy every constraint. Use $100$ for a positive baseline when only relative percentages matter, or a common multiple of denominators for fraction amounts. A mismatch eliminates a proposed expression. Several expressions may coincide at your chosen values; use another case or algebra to distinguish them.</p>
          </div>
          <div class="callout callout-tip">
            <h4>Strategy 5: Estimate first</h4>
            <p>Inspect the choice spacing and control the error. Here $0.40 \times 397 \lt 0.41 \times 397 \lt 0.42 \times 400$, so the value lies between $158.8$ and $168$. With choices $80,120,160,240,320$, that interval identifies $160$ as closest. Refine the calculation when the surviving choices are close.</p>
          </div>
        `,
        examples: [
          {
            title: 'QC by transformation, not computation',
            problem: String.raw`Quantity A: $\dfrac{3}{7} + \dfrac{5}{9}$ &nbsp;&nbsp; Quantity B: $1$`,
            steps: [
              { title: 'Refuse the common denominator', content: String.raw`Computing $\frac{27}{63} + \frac{35}{63}$ works, but benchmarks are faster.`, why: 'The test rewards recognizing that only the comparison matters, not the exact value.', predict: String.raw`Quantity B is exactly $1$. What benchmark could you compare each fraction against so you never need a common denominator?` },
              { title: 'Compare each piece to a half', content: String.raw`$\frac{3}{7}$ is slightly less than $\frac{1}{2}$ (since $3.5/7$ is exactly half). $\frac{5}{9}$ is slightly more than $\frac{1}{2}$ (since $4.5/9$ is exactly half).`, predict: String.raw`Is $\frac{3}{7}$ above or below $\frac{1}{2}$? What about $\frac{5}{9}$? State each and your reason.` },
              { title: 'Measure the two gaps', content: String.raw`$\frac{3}{7}$ is below one half by $\frac{1}{14}$. $\frac{5}{9}$ is above one half by $\frac{1}{18}$. The shortfall $\frac{1}{14}$ is bigger than the surplus $\frac{1}{18}$, so the sum is slightly under $1$. Quantity B is greater.`, predict: String.raw`One fraction is just under a half, the other just over. To decide whether the sum beats $1$, what exactly do you need to compare, and which way does it fall?` }
            ]
          },
          {
            title: 'Backsolving a single-answer question',
            problem: String.raw`If $3(x - 4) = x + 10$, what is $x$? Choices: 5, 7, 9, 11, 13.`,
            steps: [
              { title: 'Start at the middle choice', content: String.raw`Try $x = 9$: left side $3(5) = 15$, right side $19$. Left is too small.` },
              { title: 'Establish the direction before moving', content: String.raw`The left side minus the right side is $2x-22$, which increases with $x$. Its negative value at $9$ means the solution must be larger. Try $x = 11$: both sides equal $21$.`, why: 'The difference is increasing here. Ordered choices alone would not justify moving upward.' },
              { title: 'Confirm', content: String.raw`$x = 11$ balances the equation, so it is the answer. Two substitutions replaced all the algebra.` }
            ]
          },
          {
            title: 'Proving (D) with two allowed cases',
            problem: String.raw`$x \ne 0$. Quantity A: $x$. Quantity B: $\dfrac{1}{x}$.`,
            steps: [
              { title: 'Run the FONZ checklist', content: String.raw`Try $x = 2$: A is $2$, B is $\frac{1}{2}$. Quantity A is greater.`, why: 'Start with an easy positive number to establish a baseline relationship.', predict: String.raw`Pick your own easy value for $x$ and work out both quantities. Which is bigger for your value?` },
              { title: 'Hunt for a flip, not a confirmation', content: String.raw`Try a fraction, $x = \frac{1}{2}$: A is $\frac{1}{2}$, B is $2$. Now Quantity B is greater.`, why: 'The goal of the second test is to break the first result. Fractions and negatives are the usual breakers.', predict: String.raw`You want a second value that makes the OTHER quantity bigger. What kind of number would flip $x$ versus $\frac{1}{x}$? Name one and predict the result.` },
              { title: 'Stop immediately', content: String.raw`Two legal values produced opposite orders. That is a complete proof of (D). Do not test more numbers; no further value can change the conclusion.`, predict: String.raw`You now have one case where A wins and one where B wins. Which answer choice does that force, and why can you stop testing?` }
            ]
          }
        ],
        quantComparison: [
          {
            difficulty: 'easy',
            quantityA: String.raw`$23 \cdot 17 - 23 \cdot 7$`,
            quantityB: String.raw`$23 \cdot 10$`,
            correctIndex: 2,
            hint: String.raw`<p>Factor $23$ out of Quantity A before touching the arithmetic.</p>`,
            explanation: String.raw`$23 \cdot 17 - 23 \cdot 7 = 23(17 - 7) = 23 \cdot 10$. The quantities are identical, so the answer is (C). No multiplication needed.`,
            wrongExplanations: {
              0: String.raw`Factoring shows the two quantities are the same expression: $23(17-7) = 23 \cdot 10$.`,
              1: String.raw`Factoring shows the two quantities are the same expression: $23(17-7) = 23 \cdot 10$.`,
              3: String.raw`Both quantities have fixed numerical values, so their relationship is determined.`
            }
          },
          {
            difficulty: 'medium',
            setup: String.raw`$x \gt 0$`,
            quantityA: String.raw`$x$`,
            quantityB: String.raw`$x^2$`,
            correctIndex: 3,
            hint: String.raw`<p>Test a fraction and a number bigger than 1.</p>`,
            explanation: String.raw`Test $x = \frac{1}{2}$: Quantity A is $\frac{1}{2}$, Quantity B is $\frac{1}{4}$, so A is greater. Test $x = 2$: A is $2$, B is $4$, so B is greater. Different orderings mean the answer is (D). Squaring makes fractions smaller and numbers above $1$ larger.`,
            wrongExplanations: {
              0: String.raw`True for $0 \lt x \lt 1$ only. Try $x = 2$.`,
              1: String.raw`True for $x \gt 1$ only. Try $x = \frac{1}{2}$.`,
              2: String.raw`Equal only at the single point $x = 1$, which the condition does not force.`
            }
          },
          {
            difficulty: 'medium',
            quantityA: String.raw`$\left(\dfrac{1}{2}\right)^{3}$`,
            quantityB: String.raw`$\left(\dfrac{1}{2}\right)^{2}$`,
            correctIndex: 1,
            hint: String.raw`<p>What does an extra factor of $\frac{1}{2}$ do to a positive number?</p>`,
            explanation: String.raw`Quantity A is $\frac{1}{8}$ and Quantity B is $\frac{1}{4}$. Multiplying a positive number by a factor between $0$ and $1$ decreases it, so these successive powers of $\frac{1}{2}$ get smaller. (B).`,
            wrongExplanations: {
              0: String.raw`For positive bases and increasing integer exponents, a base above $1$ increases its powers; a base between $0$ and $1$ decreases them. Here the base is $\frac{1}{2}$.`,
              2: String.raw`$\frac{1}{8} \ne \frac{1}{4}$.`,
              3: String.raw`Both quantities are specific numbers, so the relationship is fixed and (D) is impossible.`
            }
          }
        ],
        exercises: [
          {
            difficulty: 'easy',
            question: String.raw`$41\%$ of $397$ is closest to which of the following?`,
            options: ['80', '120', '160', '240', '320'],
            correctIndex: 2,
            hint: String.raw`<p>Round both numbers before computing.</p>`,
            correctExplanation: String.raw`Round: $40\%$ of $400 = 160$. The exact value ($162.77$) is irrelevant because the choices are far apart. Estimation is a strategy, not a shortcut of last resort.`,
            wrongExplanations: {
              0: String.raw`$80$ is about $20\%$ of $400$, half the requested percent.`,
              1: String.raw`$120$ is about $30\%$ of $400$.`,
              3: String.raw`$240$ is about $60\%$ of $400$.`,
              4: String.raw`$320$ is about $80\%$ of $400$, double the requested percent.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`If $3(x - 4) = x + 10$, then $x =$`,
            options: ['5', '7', '9', '11', '13'],
            correctIndex: 3,
            hint: String.raw`<p>Either solve directly or plug the middle choice in and adjust.</p>`,
            correctExplanation: String.raw`Algebra: $3x - 12 = x + 10 \Rightarrow 2x = 22 \Rightarrow x = 11$. Backsolving: at $x=9$ the left side is $15$ versus $19$ (too small); at $x=11$ both sides equal $21$.`,
            wrongExplanations: {
              0: String.raw`At $x=5$: left side $3$, right side $15$. Not equal.`,
              1: String.raw`At $x=7$: left side $9$, right side $17$. Not equal.`,
              2: String.raw`At $x=9$: left side $15$, right side $19$. Close, but the sides differ.`,
              4: String.raw`At $x=13$: left side $27$, right side $23$. You overshot: the left side grows faster.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`A GRE question shows square checkboxes next to its answer choices. Which strategy fits this format?`,
            options: [
              'Pick the single best choice and move on',
              'Evaluate every choice independently as true or false, then select all that pass',
              'Select exactly two choices, because multi-select always has two answers',
              'Skip it: checkbox questions award partial credit anyway',
              'Choose (D): the relationship cannot be determined'
            ],
            correctIndex: 1,
            hint: String.raw`<p>Square boxes mean "one or more" and all-or-nothing grading.</p>`,
            correctExplanation: String.raw`Square checkboxes mark select-one-or-more questions. Any number of choices (one to all) can be correct, credit is all-or-nothing, so each option must be judged on its own.`,
            wrongExplanations: {
              0: 'That is the round-oval single-answer format. Square boxes allow several correct choices.',
              2: 'The number of correct choices varies; assuming two is a guessing trap.',
              3: 'There is no partial credit. Missing one correct option scores zero.',
              4: 'That choice belongs to quantitative comparison, a different format.'
            }
          }
        ],
        multiSelect: [
          {
            difficulty: 'medium',
            question: String.raw`For which of the following values of $x$ is $x^2 \lt x$? Select all that apply.`,
            options: [String.raw`$-1$`, String.raw`$0$`, String.raw`$\dfrac{1}{2}$`, String.raw`$\dfrac{3}{4}$`, String.raw`$1$`, String.raw`$2$`],
            correctIndices: [2, 3],
            hint: String.raw`<p>Squaring shrinks exactly one family of numbers. Test each value; do not guess a pattern.</p>`,
            explanation: String.raw`$x^2 \lt x$ only when $0 \lt x \lt 1$. Check: $(-1)^2 = 1 \gt -1$; $0^2 = 0$ (equal, not less); $(\frac{1}{2})^2 = \frac{1}{4} \lt \frac{1}{2}$ (yes); $(\frac{3}{4})^2 = \frac{9}{16} \lt \frac{3}{4}$ (yes); $1^2 = 1$ (equal); $2^2 = 4 \gt 2$. This fact powers many QC problems.`
          }
        ],
        freeResponse: [
          {
            difficulty: 'easy',
            question: String.raw`Five less than twice a number is $23$. What is the number?`,
            accept: [14],
            placeholder: 'Enter the number',
            hint: String.raw`<p>"Five less than twice a number" translates to $2n - 5$, not $5 - 2n$.</p>`,
            explanation: String.raw`$2n - 5 = 23 \Rightarrow 2n = 28 \Rightarrow n = 14$. Note the translation trap: "five less than X" means $X - 5$.`
          },
          {
            difficulty: 'medium',
            question: String.raw`Compute $\dfrac{1}{4}$. In this practice field, enter a decimal or an equivalent fraction such as numerator/denominator.`,
            accept: ['25/100', 0.25],
            placeholder: 'e.g. 3/10',
            hint: String.raw`<p>To write a fraction as a decimal, divide its numerator by its denominator. To form an equivalent fraction, multiply both by the same positive integer.</p>`,
            explanation: String.raw`$\frac{1}{4} = \frac{25}{100} = 0.25$. This exercise checks the value. On the GRE, use the displayed format: a fraction question has separate numerator and denominator boxes, so enter integers such as $1$ and $4$.`
          }
        ],
        strategySelect: [
          {
            difficulty: 'medium',
            scenario: String.raw`Quantity A: $\dfrac{17}{32}$. Quantity B: $\dfrac{8}{15}$. Which is greater?`,
            options: ['Find a common denominator and compare', 'Cross-multiply and compare the products', 'Convert both to percents from memory', 'Answer (D): it cannot be determined'],
            correctIndex: 1,
            explanation: String.raw`Cross-multiplication is fastest: compare $17 \cdot 15 = 255$ with $32 \cdot 8 = 256$. Since $255 \lt 256$, Quantity B is greater, with almost no arithmetic.`,
            wrongExplanations: {
              0: String.raw`A common denominator of $32$ and $15$ is $480$: a lot of multiplication for a comparison that cross-multiplication settles in one line.`,
              2: String.raw`Neither fraction is a memorized benchmark, so converting to percents means dividing anyway.`,
              3: String.raw`Both quantities have fixed numerical values, so their relationship is determined.`
            }
          },
          {
            difficulty: 'medium',
            scenario: String.raw`If $5(2x - 3) = 3x + 20$, what is $x$? Choices are $5$, $6$, $7$, $8$, $9$.`,
            options: ['Backsolve from the middle choice', 'Plug in a smart number for $x$', 'Estimate, since the choices are far apart', 'Expand and solve the linear equation directly'],
            correctIndex: 3,
            explanation: String.raw`The equation is a clean one-variable linear equation, so direct algebra is fastest: $10x - 15 = 3x + 20 \Rightarrow 7x = 35 \Rightarrow x = 5$. Backsolving also works but takes more substitutions here.`,
            wrongExplanations: {
              0: String.raw`Backsolving is a fine backup, but a two-step linear equation is faster solved directly than by testing choices.`,
              1: String.raw`Plugging in smart numbers is for problems stated in variables or with variables in the choices. This asks for one specific value.`,
              2: String.raw`Estimation cannot separate integer choices one apart; you need the exact value.`
            }
          },
          {
            difficulty: 'hard',
            scenario: String.raw`A store raises a positive price by $30\%$, then puts it on sale at $30\%$ off. Is the final price higher, lower, or equal to the original?`,
            options: ['Add the percents: +30 then -30 nets to zero, so equal', String.raw`Multiply the factors: $1.3 \times 0.7$`, 'Answer (D): it depends on the original price', 'Test with 50 dollars and with 200 dollars to be safe'],
            correctIndex: 1,
            explanation: String.raw`Percent changes compose by multiplying factors: $1.3 \times 0.7 = 0.91$, so the final price is $91\%$ of the original, lower, for every starting price. One multiplication settles it.`,
            wrongExplanations: {
              0: String.raw`Percents do not add across successive changes; that is the classic trap. The second change acts on a new base.`,
              2: String.raw`The factor $0.91$ is the same for every original price, so the outcome does not depend on it.`,
              3: String.raw`Testing values would confirm the answer but is unnecessary once you see the factors multiply to a fixed $0.91$.`
            }
          }
        ],
        flashCards: [
          { type: 'define', front: 'What does QC choice (D) mean, and when is it impossible?', back: 'It means no single relationship holds for all allowed values. It is impossible when both quantities are pure numbers: then some fixed relationship always exists.' },
          { type: 'how', front: 'Which operations are always safe on both QC quantities?', back: 'Adding or subtracting the same amount, and multiplying or dividing by the same positive number. Multiplying by a negative or by a variable of unknown sign can silently flip the comparison.' },
          { type: 'how', front: 'What numbers should you test in a QC with variables?', back: 'FONZ: Fractions (1/2), One, Negatives (-1), Zero, plus a large number like 100. Two different orderings prove (D).' },
          { type: 'why', front: 'When can a middle-choice test eliminate choices on one side?', back: 'When choices are ordered and the tested quantity is monotonic over them. Establish the direction of change. Sorted choices alone are insufficient.' }
        ]
      },

      /* ======================================================
         TOPIC 2: INTEGERS, DIVISIBILITY, PRIMES
         ====================================================== */
      {
        id: 'gre-integers-primes',
        title: 'Integers, Divisibility, and Primes',
        description: 'Track parity and signs, use remainders, and derive factor counts from prime factorizations.',
        foundationRefs: [
          { moduleId: 'foundations', topicId: 'number-systems', note: 'What integers, rationals, and reals are. GRE trap answers often live just outside the set the problem names.' },
          { moduleId: 'beginning-algebra', topicId: 'integer-operations', note: 'Sign rules for adding, subtracting, multiplying, and dividing negatives. Needed verbatim for the problems below.' },
          { moduleId: 'foundations', topicId: 'basic-arithmetic', note: 'Long division and remainders. GRE remainder questions assume this is automatic.' }
        ],
        hook: String.raw`
          <div class="callout callout-puzzle">
            <h4>Puzzle: The Locker Question</h4>
            <p>A hallway has $100$ lockers, all closed. Student $1$ toggles every locker, student $2$ toggles every 2nd locker, student $3$ every 3rd, and so on through student $100$. Which lockers end up open?</p>
            <p>Locker $n$ gets toggled once per <em>factor</em> of $n$. Factors come in pairs ($12 = 1\cdot12 = 2\cdot6 = 3\cdot4$), so almost every locker is toggled an even number of times and ends closed. The exception: perfect squares, whose paired factor list contains a repeat ($36 = 6 \cdot 6$). Lockers $1, 4, 9, 16, \ldots, 100$ stay open. Counting factors is a GRE skill, and prime factorization is how you do it fast.</p>
          </div>
        `,
        concept: String.raw`
          <p><strong>The Foundation.</strong> Everything the problems below use:</p>
          <div class="callout callout-key">
            <h4>Parity (even/odd) rules</h4>
            <p>even $\pm$ even $=$ even; odd $\pm$ odd $=$ even; even $\pm$ odd $=$ odd.<br>
            even $\times$ integer $=$ even; odd $\times$ odd $=$ odd.<br>
            Zero is even. For an integer base and a positive integer exponent, a power has the base's parity. Exponent zero is different: $2^0=1$.</p>
          </div>
          <div class="callout callout-key">
            <h4>Sign rules</h4>
            <p>Negative $\times$ negative $=$ positive. A negative number raised to an <em>even</em> power is positive; to an <em>odd</em> power, negative. Zero is neither positive nor negative. Watch notation: $-2^4 = -16$ but $(-2)^4 = 16$.</p>
          </div>
          <div class="callout callout-key">
            <h4>Divisibility shortcuts</h4>
            <p>By 2: last digit even. By 3: digit sum divisible by 3. By 4: last two digits divisible by 4. By 5: ends in 0 or 5. By 6: passes both 2 and 3. By 9: digit sum divisible by 9. By 10: ends in 0.</p>
          </div>
          <div class="callout callout-key">
            <h4>Primes and factorization</h4>
            <p>A prime is a positive integer greater than $1$ with exactly two positive factors: $1$ and itself. $2$ is the only even prime. Prime factorization is unique up to order. If $n = p^a q^b r^c$ for <em>distinct primes</em> $p,q,r$ and positive integer exponents, $n$ has $(a+1)(b+1)(c+1)$ positive factors. Each factor independently chooses an exponent from zero through the corresponding exponent of $n$.</p>
          </div>
          <div class="callout callout-key">
            <h4>Remainders</h4>
            <p>For integers $n,q,r$ and a positive integer divisor $d$, $n = qd + r$ with $0 \le r \lt d$. Remainders of consecutive integers cycle: division by $4$ gives $1,2,3,0,1,2,3,0,\ldots$ for $1,2,3,4,5,6,7,8,\ldots$. Adding a multiple of $d$ preserves the remainder.</p>
          </div>
        `,
        abstraction: String.raw`
          <p>Two ideas organize everything above.</p>
          <p><strong>1. Properties can reduce the information you need.</strong> If $x$ is even and $y$ is odd, $x+y$ is odd without knowing either value. Product signs are similarly determined by their factors. Addition of opposite signs requires magnitude information. State what the rules determine and retain the uncertainty they leave.</p>
          <p><strong>2. Prime exponents record divisibility.</strong> For positive integers, writing $60 = 2^2 \cdot 3 \cdot 5$ records two copies of $2$, one $3$, and one $5$. Compare these exponents to answer:</p>
          <ul>
            <li><em>Divisibility:</em> $a$ divides $b$ exactly when every coordinate of $a$ is $\le$ the matching coordinate of $b$.</li>
            <li><em>GCD and LCM:</em> take the componentwise minimum and maximum, respectively.</li>
            <li><em>Counting factors:</em> each coordinate with exponent $e$ offers $e + 1$ independent choices, so the counts multiply.</li>
          </ul>
          <p>Multiplication adds corresponding prime exponents. Factorization therefore turns divisibility and factor counts into comparisons of small integers. Use ordinary multiplication when it is already simpler.</p>
        `,
        stuckGuide: String.raw`
          <div class="callout callout-tip">
            <h4>Strategy: replace arithmetic with parity or sign analysis</h4>
            <p>Track parity or signs when the operation rules determine the result. They settle products of known signs, but positive plus negative depends on the magnitudes: $5+(-3)$ is positive and $2+(-3)$ is negative.</p>
          </div>
          <div class="callout callout-tip">
            <h4>Strategy: prime factorization is the first move</h4>
            <p>Questions about factors, multiples, divisibility, or "what is the smallest number such that..." almost always fall to writing the prime factorization first.</p>
          </div>
          <div class="callout callout-warning">
            <h4>Trap: "integer" does not mean "positive integer"</h4>
            <p>When a QC says "$n$ is an integer," test negatives and zero before answering. When it says "positive integer," $1$ is still allowed and often breaks patterns.</p>
          </div>
        `,
        examples: [
          {
            title: 'Answering a parity question with zero arithmetic',
            problem: String.raw`$m$ is odd and $n$ is even. Is $m^2 + mn + n$ even or odd?`,
            steps: [
              { title: 'Refuse to pick numbers first', content: String.raw`The question asks only for parity, so track parity itself through each term.`, why: 'Number-picking works too, but invariant-tracking is faster and proves the result for all valid inputs at once.' },
              { title: 'Label each term', content: String.raw`$m^2$: odd $\times$ odd $=$ odd. $mn$: odd $\times$ even $=$ even. $n$: even.` },
              { title: 'Combine with the addition rules', content: String.raw`odd $+$ even $=$ odd, then odd $+$ even $=$ odd. The expression is always odd. A spot-check with $m = 1, n = 2$ gives $1 + 2 + 2 = 5$: odd, as predicted.` }
            ]
          },
          {
            title: 'Factor-counting through prime coordinates',
            problem: String.raw`How many positive factors does $360$ have?`,
            steps: [
              { title: 'Get the prime factorization first', content: String.raw`$360 = 36 \cdot 10 = 6^2 \cdot 10 = 2^3 \cdot 3^2 \cdot 5$.`, why: 'Every question about the factors of a number is easiest in prime coordinates.' },
              { title: 'Count the independent choices', content: String.raw`A factor picks an exponent for each prime: $2^0$ to $2^3$ (four ways), $3^0$ to $3^2$ (three ways), $5^0$ or $5^1$ (two ways).` },
              { title: 'Multiply', content: String.raw`$4 \cdot 3 \cdot 2 = 24$ factors. Listing them by hand would take minutes and invite omissions; the exponent trick takes seconds.` }
            ]
          }
        ],
        quantComparison: [
          {
            difficulty: 'medium',
            setup: String.raw`$n$ is an integer.`,
            quantityA: String.raw`$n^2$`,
            quantityB: String.raw`$n$`,
            correctIndex: 3,
            hint: String.raw`<p>Test $n = 0$, $n = 1$, and $n = 2$.</p>`,
            explanation: String.raw`At $n = 2$: $4 \gt 2$, A greater. At $n = 1$: $1 = 1$, equal. Two different relationships, so (D). Squares beat their base only outside $[0, 1]$.`,
            wrongExplanations: {
              0: String.raw`$n = 1$ gives equality, so "always greater" fails.`,
              1: String.raw`$n^2 \lt n$ requires $0 \lt n \lt 1$, impossible for integers.`,
              2: String.raw`Equality holds only at $n = 0$ and $n = 1$, which are not forced.`
            }
          },
          {
            difficulty: 'medium',
            quantityA: String.raw`The number of distinct prime factors of $84$`,
            quantityB: String.raw`The number of distinct prime factors of $128$`,
            correctIndex: 0,
            hint: String.raw`<p>Factor both: one of them is a power of a single prime.</p>`,
            explanation: String.raw`$84 = 2^2 \cdot 3 \cdot 7$: three distinct primes. $128 = 2^7$: one distinct prime. Quantity A is $3$, Quantity B is $1$. (A). Big numbers can be prime-poor; repetition of one prime adds nothing to "distinct."`,
            wrongExplanations: {
              1: String.raw`$128 = 2^7$ has only the single distinct prime $2$, despite being larger.`,
              2: String.raw`$3 \ne 1$.`,
              3: String.raw`Both counts are fixed numbers, so the relationship is determined.`
            }
          },
          {
            difficulty: 'easy',
            quantityA: String.raw`$(-3)^4$`,
            quantityB: String.raw`$(-4)^3$`,
            correctIndex: 0,
            hint: String.raw`<p>Even power versus odd power of a negative.</p>`,
            explanation: String.raw`$(-3)^4 = 81$ (even power of a negative is positive). $(-4)^3 = -64$ (odd power stays negative). Positive beats negative: (A). You can answer from signs alone, without computing $81$ or $64$.`,
            wrongExplanations: {
              1: String.raw`An odd power of a negative number is negative, and any positive beats any negative.`,
              2: String.raw`$81 \ne -64$.`,
              3: String.raw`Both are fixed numbers; the relationship is determined.`
            }
          }
        ],
        exercises: [
          {
            difficulty: 'easy',
            question: String.raw`How many prime numbers are there between $20$ and $40$?`,
            options: ['2', '3', '4', '5', '6'],
            correctIndex: 2,
            hint: String.raw`<p>A composite number below $40$ has a prime factor at most $\sqrt{40}\lt7$. Check $2$, $3$, and $5$.</p>`,
            correctExplanation: String.raw`The primes are $23,29,31,37$, so the answer is four. Exclude even numbers and multiples of $5$, then exclude $21,27,33,39$ using divisibility by $3$. Each remaining number has no prime divisor at most its square root, so it is prime.`,
            wrongExplanations: {
              0: String.raw`You likely missed some of $23, 29, 31, 37$.`,
              1: String.raw`One prime short: check $23, 29, 31, 37$ again.`,
              3: String.raw`One of your picks is composite: $21 = 3 \cdot 7$, $27 = 3^3$, $33 = 3 \cdot 11$, or $39 = 3 \cdot 13$.`,
              4: String.raw`Two of your picks are composite. Apply the digit-sum test for 3.`
            }
          },
          {
            difficulty: 'hard',
            question: String.raw`If $n = 2^3 \cdot 3 \cdot 5^2$, how many positive factors does $n$ have?`,
            options: ['12', '18', '20', '24', '30'],
            correctIndex: 3,
            hint: String.raw`<p>Add $1$ to each exponent, then multiply the results.</p>`,
            correctExplanation: String.raw`A factor chooses an exponent for each prime: $2^0$ through $2^3$ (4 ways), $3^0$ or $3^1$ (2 ways), $5^0$ through $5^2$ (3 ways). Total $4 \cdot 2 \cdot 3 = 24$.`,
            wrongExplanations: {
              0: String.raw`$12$ comes from multiplying the raw exponents plus one incorrectly: recount as $(3+1)(1+1)(2+1)$.`,
              1: String.raw`Check: the exponent choices multiply as $4 \cdot 2 \cdot 3$.`,
              2: String.raw`Close: did you use $(2+1)$ for the prime $2$? Its exponent is $3$, giving $3+1 = 4$ choices.`,
              4: String.raw`$30$ would need exponent choices $5 \cdot 2 \cdot 3$; the factorization has no prime to the 4th power.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`When positive integer $k$ is divided by $6$, the remainder is $5$. What is the remainder when $k + 3$ is divided by $6$?`,
            options: ['0', '1', '2', '3', '5'],
            correctIndex: 2,
            hint: String.raw`<p>Pick the smallest such $k$ and just compute.</p>`,
            correctExplanation: String.raw`Write $k=6q+5$. Then $k+3=6q+8=6(q+1)+2$, so the remainder is $2$ for every valid $k$. Trying $k=5$ suggests the answer; the multiple-of-$6$ form establishes that changing the quotient cannot change the remainder.`,
            wrongExplanations: {
              0: String.raw`Remainder $0$ would need $k + 3$ to be a multiple of $6$, i.e. $k$ leaving remainder $3$.`,
              1: String.raw`Check with $k = 5$: $8 = 6 + 2$.`,
              3: String.raw`$3$ is what was added, not the new remainder. Adding $3$ shifts the remainder from $5$ to $8$, which wraps to $2$.`,
              4: String.raw`The remainder changes when you add $3$: it becomes $5 + 3 = 8$, which exceeds $6$ and wraps to $2$.`
            }
          }
        ],
        multiSelect: [
          {
            difficulty: 'medium',
            question: String.raw`$a$ is an even integer and $b$ is an odd integer. Which of the following must be even? Select all that apply.`,
            options: [String.raw`$a + b$`, String.raw`$ab$`, String.raw`$a^2$`, String.raw`$b + 1$`, String.raw`$ab + b$`],
            correctIndices: [1, 2, 3],
            hint: String.raw`<p>Run each expression through the parity rules. Testing $a=2,b=3$ is a check, not a proof of "must."</p>`,
            explanation: String.raw`$a+b$ is odd. $ab$ is even because both factors are integers and $a$ is even. $a^2$ is even. $b+1$ is even. $ab+b$ is even plus odd, hence odd. These rules hold for every permitted pair, including zero and negative integers.`
          }
        ],
        freeResponse: [
          {
            difficulty: 'easy',
            question: String.raw`What is the smallest positive integer that is divisible by both $6$ and $8$?`,
            accept: [24],
            placeholder: 'Enter an integer',
            hint: String.raw`<p>Take the highest power of each prime appearing in $6 = 2 \cdot 3$ and $8 = 2^3$.</p>`,
            explanation: String.raw`The least common multiple takes the highest power of each prime: $2^3 \cdot 3 = 24$. Multiplying $6 \cdot 8 = 48$ double-counts the shared factor of $2$.`
          },
          {
            difficulty: 'medium',
            question: String.raw`What is the sum of the distinct prime factors of $60$?`,
            accept: [10],
            placeholder: 'Enter an integer',
            hint: String.raw`<p>Factor $60$ completely first.</p>`,
            explanation: String.raw`$60 = 2^2 \cdot 3 \cdot 5$. Distinct primes: $2, 3, 5$. Sum $= 10$. "Distinct" means the repeated $2$ counts once.`
          }
        ],
        flashCards: [
          { type: 'define', front: 'Is 1 prime? Is 2? Is 0 even?', back: '1 is not prime (only one positive factor). 2 is prime, and it is the only even prime. 0 is even, and it is neither positive nor negative.' },
          { type: 'how', front: 'How do you count the positive factors of n?', back: 'Prime-factorize n, add 1 to each exponent, multiply. Example: 60 = 2^2*3*5 gives (2+1)(1+1)(1+1) = 12 factors.' },
          { type: 'concept', front: 'How do odd sums, odd products, and even powers of a negative base behave?', back: 'Two odd integers add to an even integer. Two odd integers multiply to an odd integer. A negative base raised to an even integer power is positive.' }
        ]
      },
      /* ======================================================
         TOPIC 3: FRACTIONS, DECIMALS, PERCENTS, RATIOS
         ====================================================== */
      {
        id: 'gre-fractions-percents',
        title: 'Fractions, Percents, and Ratios',
        description: 'Compare fractions, identify percentage baselines, combine successive changes, and convert ratios into quantities.',
        foundationRefs: [
          { moduleId: 'foundations', topicId: 'basic-arithmetic', note: 'Fraction addition, multiplication, and division. The problems below assume these operations are automatic.' },
          { moduleId: 'beginning-algebra', topicId: 'variables-expressions', note: 'Translating verbal statements into expressions, used here for percent and ratio word problems.' },
          { moduleId: 'beginning-algebra', topicId: 'linear-equations-one-var', note: 'Solving the one-variable equations that ratio problems reduce to (e.g. finding the multiplier x in 3x + 5x = total).' }
        ],
        visualizations: [
          {
            render: (containerId) => {
              Viz.tapeDiagram(containerId, [
                { label: 'cranberry: 3 parts', value: 3 },
                { label: 'apple: 5 parts', value: 5 }
              ], { title: 'A 3 : 5 ratio is 8 equal parts. Every ratio problem is a tape diagram.', totalLabel: 'total = 8 parts = whole mixture' });
            }
          }
        ],
        hook: String.raw`
          <div class="callout callout-puzzle">
            <h4>Puzzle: The Salary Trap</h4>
            <p>Your salary rises $20\%$ this year and falls $20\%$ next year. Are you back where you started?</p>
            <p>No: you are at $96\%$ of the original. Percent changes multiply, they do not cancel: $1.20 \times 0.80 = 0.96$. The second change acts on a <em>new, larger</em> base, so the $20\%$ cut removes more dollars than the $20\%$ raise added. The GRE builds entire problems around exactly this asymmetry.</p>
          </div>
        `,
        concept: String.raw`
          <p><strong>The Foundation.</strong></p>
          <div class="callout callout-key">
            <h4>Percent machinery</h4>
            <p>"Percent" means per $100$: $x\%$ of $N$ is $(x/100)N$. For a positive starting value, percent change is $(\text{new}-\text{old})/\text{old}\times100\%$. A zero baseline makes this relative change undefined. A $p\%$ increase multiplies by $1+p/100$; a $p\%$ decrease multiplies by $1-p/100$. Successive factors multiply. An increase from $20\%$ to $25\%$ is $5$ percentage points and a $25\%$ relative increase.</p>
          </div>
          <div class="callout callout-key">
            <h4>Comparing fractions</h4>
            <p>Three tools, fastest first: (1) benchmark against $\frac{1}{2}$ or $1$; (2) cross-multiply ($\frac{a}{b}$ vs $\frac{c}{d}$ compares as $ad$ vs $bc$ when $b, d \gt 0$); (3) convert to decimals with the memorized set: $\frac{1}{8} = 0.125$, $\frac{1}{6} \approx 0.167$, $\frac{1}{3} \approx 0.333$, $\frac{3}{8} = 0.375$, $\frac{5}{8} = 0.625$, $\frac{7}{8} = 0.875$.</p>
          </div>
          <div class="callout callout-key">
            <h4>Ratios are scalable parts</h4>
            <p>A ratio $3:5$ means the quantities are $3x$ and $5x$ for some common multiplier $x$, with total $8x$. Given any actual amount (a part, the total, or a difference), solve for $x$ and everything follows. The tape diagram above is this idea drawn.</p>
          </div>
          <div class="callout callout-key">
            <h4>Dividing by a fraction</h4>
            <p>$\dfrac{a}{b} \div \dfrac{c}{d} = \dfrac{a}{b} \cdot \dfrac{d}{c}$ when $b,c,d$ are nonzero. Dividing a <em>positive</em> number by a number between $0$ and $1$ increases it. A negative dividend becomes more negative; zero stays zero.</p>
          </div>
        `,
        abstraction: String.raw`
          <p><strong>Percents live in the multiplicative world; most percent mistakes are additive thinking smuggled in.</strong></p>
          <p>Adding changes stacks amounts: $+20$ then $-20$ returns to the start. Percent changes are not amounts but <em>scaling factors</em>: $+20\%$ is the factor $1.2$ and $-20\%$ is the factor $0.8$, and factors compose by multiplication: $1.2 \times 0.8 = 0.96$. Every "successive percent" trap on the test is this one confusion. When you convert each change to its factor and multiply, the traps disappear, and questions like "what single change equals $+25\%$ then $-20\%$?" become one multiplication: $1.25 \times 0.8 = 1$, no net change.</p>
          <p><strong>A ratio is a whole family of quantities, not a pair of numbers.</strong> The ratio $3:5$ names every pair $(3x, 5x)$: the pairs $(6, 10)$, $(9, 15)$, $(300, 500)$ are all the same ratio. Solving a ratio problem means using one concrete fact (a total, a part, or a difference) to pick out which member of the family you have, i.e. to pin down $x$. The tape diagram is this abstraction drawn: boxes show the family shape, and the given fact prices one box.</p>
          <p>Fractions, decimals, and percents can describe the same numerical proportion. A ratio may compare two parts instead: red to blue $=3:5$ gives red to total $=3:8$, not $3:5$. Name the denominator's group before converting the notation.</p>
        `,
        stuckGuide: String.raw`
          <div class="callout callout-tip">
            <h4>Strategy: use 100 as the smart number for percents</h4>
            <p>Use $100$ when the problem depends only on proportions of a positive starting amount. A fixed fee or a given dollar change can break that scaling; retain the actual amount or a variable in those cases.</p>
          </div>
          <div class="callout callout-tip">
            <h4>Strategy: draw the tape for ratios</h4>
            <p>Sketch the parts as boxes, mark what the problem gives you (a part, the total, or a gap between parts), and read off the value of one box. It prevents the classic error of treating a ratio number as a real amount.</p>
          </div>
          <div class="callout callout-warning">
            <h4>Trap: percent OF versus percent MORE</h4>
            <p>"$x$ is $150\%$ of $y$" means $x = 1.5y$. "$x$ is $150\%$ more than $y$" means $x = y + 1.5y = 2.5y$. Read for the word <em>more</em>.</p>
          </div>
        `,
        examples: [
          {
            title: 'Smart number 100 on a layered percent problem',
            problem: String.raw`A jacket is marked up $25\%$, then sold at $20\%$ off the marked price. The final price is what percent of the original?`,
            steps: [
              { title: 'Set the original price to 100', content: String.raw`No starting value is given, so choose $100$.`, why: 'Any starting value gives the same percent answer; 100 makes the arithmetic readable.' },
              { title: 'Apply the changes in order', content: String.raw`Markup: $100 \times 1.25 = 125$. Discount: $125 \times 0.80 = 100$.` },
              { title: 'Read the answer', content: String.raw`Final price $100$ equals $100\%$ of the original. The $25\%$ up and $20\%$ down exactly cancel here because $1.25 \times 0.8 = 1$: a coincidence of these numbers, not a general rule.` }
            ]
          },
          {
            title: 'Ratio with a difference given (the tape diagram at work)',
            problem: String.raw`Marbles are red and blue in the ratio $4:7$. There are $18$ more blue marbles than red. How many marbles are there in total?`,
            steps: [
              { title: 'Write the family, not the numbers', content: String.raw`Red $= 4x$, blue $= 7x$ for some multiplier $x$. The total is $11x$.`, why: 'The ratio names a family of possibilities; the given fact will select one member.' },
              { title: 'Use the given fact to price one box', content: String.raw`The difference is $7x - 4x = 3x = 18$, so $x = 6$: each tape box holds $6$ marbles.` },
              { title: 'Answer the actual question', content: String.raw`Total $= 11x = 66$. Sanity check: red $24$, blue $42$, difference $18$, and $24:42$ reduces to $4:7$.`, why: 'Ratio problems love to ask for a quantity other than the one you solved for; reread the question before answering.' }
            ]
          }
        ],
        quantComparison: [
          {
            difficulty: 'medium',
            setup: String.raw`$x \gt 0$. Price $x$ is increased by $20\%$, and the result is decreased by $20\%$, giving price $y$.`,
            quantityA: String.raw`$y$`,
            quantityB: String.raw`$x$`,
            correctIndex: 1,
            hint: String.raw`<p>Multiply the change factors: $1.2 \times 0.8$.</p>`,
            explanation: String.raw`$y = x \times 1.2 \times 0.8 = 0.96x \lt x$ for every positive $x$. The decrease acts on a larger base, so it removes more than the increase added. (B).`,
            wrongExplanations: {
              0: String.raw`Up-then-down by the same percent always lands below the start: $1.2 \times 0.8 = 0.96$.`,
              2: String.raw`The changes do not cancel: percent changes multiply ($0.96$), they do not add ($+20 - 20 = 0$).`,
              3: String.raw`The factor $0.96$ applies uniformly for every $x \gt 0$, so the relationship is fixed.`
            }
          },
          {
            difficulty: 'easy',
            quantityA: String.raw`$\dfrac{7}{16}$`,
            quantityB: String.raw`$0.44$`,
            correctIndex: 1,
            hint: String.raw`<p>$\frac{7}{16}$ is half of $\frac{7}{8}$, and $\frac{7}{8} = 0.875$.</p>`,
            explanation: String.raw`$\frac{7}{16} = 0.4375 \lt 0.44$. Fast route: $\frac{7}{8} = 0.875$, halve it. Or cross-multiply: compare $7 \times 100$ with $16 \times 44$: $700$ vs $704$. (B).`,
            wrongExplanations: {
              0: String.raw`Cross-multiply: $7 \cdot 100 = 700 \lt 704 = 16 \cdot 44$.`,
              2: String.raw`$0.4375 \ne 0.44$; the difference is small but real, and QC only needs the direction.`,
              3: String.raw`Two fixed numbers always have a determined relationship.`
            }
          },
          {
            difficulty: 'medium',
            quantityA: String.raw`$\dfrac{3}{8} \div \dfrac{3}{4}$`,
            quantityB: String.raw`$\dfrac{1}{2}$`,
            correctIndex: 2,
            hint: String.raw`<p>Dividing by $\frac{3}{4}$ is multiplying by $\frac{4}{3}$.</p>`,
            explanation: String.raw`$\frac{3}{8} \div \frac{3}{4} = \frac{3}{8} \cdot \frac{4}{3} = \frac{4}{8} = \frac{1}{2}$. Equal: (C). Note the answer is <em>larger</em> than $\frac{3}{8}$: dividing by a fraction below 1 enlarges.`,
            wrongExplanations: {
              0: String.raw`Compute: $\frac{3}{8} \cdot \frac{4}{3} = \frac{1}{2}$ exactly.`,
              1: String.raw`Did you multiply by $\frac{3}{4}$ instead of its reciprocal? Division flips the second fraction.`,
              3: String.raw`Fixed numbers, fixed relationship.`
            }
          }
        ],
        exercises: [
          {
            difficulty: 'easy',
            question: String.raw`The ratio of boys to girls in a class is $2:3$. If the class has $30$ students, how many are boys?`,
            options: ['6', '10', '12', '15', '20'],
            correctIndex: 2,
            hint: String.raw`<p>The parts are $2x$ and $3x$ with $2x + 3x = 30$.</p>`,
            correctExplanation: String.raw`$2x + 3x = 5x = 30$, so $x = 6$ and boys $= 2x = 12$. The tape has $5$ boxes of $6$ students each; boys own $2$ boxes.`,
            wrongExplanations: {
              0: String.raw`$6$ is the value of one part ($x$), not of the two parts boys occupy.`,
              1: String.raw`$10$ would follow from a $1:2$ split of $30$; the split here is $2:3$.`,
              3: String.raw`$15$ is half the class; a $2:3$ ratio is not an even split.`,
              4: String.raw`$20$ counts $2$ parts out of $3$ instead of $2$ parts out of $5$: the total includes both groups.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`A price is increased by $25\%$. By what percent must the new price be decreased to return to the original price?`,
            options: [String.raw`$15\%$`, String.raw`$20\%$`, String.raw`$25\%$`, String.raw`$30\%$`, String.raw`$40\%$`],
            correctIndex: 1,
            hint: String.raw`<p>Use $100$. The new price is $125$; what percent of $125$ is the needed drop of $25$?</p>`,
            correctExplanation: String.raw`Start at $100$; after the increase the price is $125$. Returning needs a drop of $25$, and $\frac{25}{125} = 20\%$. The percent is smaller on the way down because the base is larger.`,
            wrongExplanations: {
              0: String.raw`A $15\%$ cut of $125$ removes only $18.75$.`,
              2: String.raw`The classic trap: $25\%$ of $125$ is $31.25$, overshooting below $100$. Percent up and percent down are not symmetric.`,
              3: String.raw`A $30\%$ cut of $125$ removes $37.5$, far too much.`,
              4: String.raw`$40\%$ of $125$ is $50$: this halves the increase twice over.`
            }
          }
        ],
        multiSelect: [
          {
            difficulty: 'medium',
            question: String.raw`Which of the following fractions are greater than $\dfrac{1}{2}$? Select all that apply.`,
            options: [String.raw`$\dfrac{5}{9}$`, String.raw`$\dfrac{7}{15}$`, String.raw`$\dfrac{4}{7}$`, String.raw`$\dfrac{9}{20}$`, String.raw`$\dfrac{11}{21}$`],
            correctIndices: [0, 2, 4],
            hint: String.raw`<p>A fraction beats $\frac{1}{2}$ exactly when its numerator doubled beats its denominator.</p>`,
            explanation: String.raw`Double the numerator and compare with the denominator: $\frac{5}{9}$: $10 \gt 9$ (yes). $\frac{7}{15}$: $14 \lt 15$ (no). $\frac{4}{7}$: $8 \gt 7$ (yes). $\frac{9}{20}$: $18 \lt 20$ (no). $\frac{11}{21}$: $22 \gt 21$ (yes). One benchmark, five instant checks.`
          }
        ],
        freeResponse: [
          {
            difficulty: 'easy',
            question: String.raw`$15$ is what percent of $60$? (Enter the number only.)`,
            accept: [25],
            placeholder: 'Enter a percent',
            hint: String.raw`<p>$\frac{15}{60}$ simplifies to a familiar fraction.</p>`,
            explanation: String.raw`$\frac{15}{60} = \frac{1}{4} = 25\%$. Anchor the common conversions: $\frac{1}{4} = 25\%$, $\frac{1}{5} = 20\%$, $\frac{3}{4} = 75\%$.`
          },
          {
            difficulty: 'medium',
            question: String.raw`Compute $\dfrac{2}{3} \cdot \dfrac{3}{5}$. Enter a decimal or an equivalent fraction in this practice field.`,
            accept: [0.4, '2/5', '6/15'],
            placeholder: 'e.g. 7/10',
            hint: String.raw`<p>Before multiplying, check whether a numerator factor cancels with a denominator factor.</p>`,
            explanation: String.raw`$\frac{2}{3} \cdot \frac{3}{5} = \frac{6}{15} = \frac{2}{5}$. The $3$s cancel before you multiply: cancel early, multiply late.`
          }
        ],
        fadedExamples: [
          {
            difficulty: 'medium',
            problem: String.raw`A shirt costs 40 dollars. Its price rises $15\%$, then that new price is cut by $10\%$. What is the final price, in dollars?`,
            steps: [
              { given: String.raw`Convert each change to a factor: a $15\%$ rise is $\times 1.15$, a $10\%$ cut is $\times 0.90$.` },
              { given: String.raw`Apply the rise: $40 \times 1.15 = 46$.` },
              { prompt: String.raw`Now apply the $10\%$ cut to 46 dollars. Enter the final price in dollars (number only).`, accept: [41.4], placeholder: 'e.g. 44', explanation: String.raw`$46 \times 0.90 = 41.40$.`, wrongHint: String.raw`Multiply $46$ by $0.90$, not by $0.10$.` }
            ],
            completionMessage: String.raw`Final price 41.40 dollars. You applied the factors in sequence, exactly the method that defeats every successive-percent trap.`
          },
          {
            difficulty: 'hard',
            problem: String.raw`In a class the ratio of juniors to seniors is $5:3$. There are $16$ more juniors than seniors. How many students are there in total?`,
            steps: [
              { given: String.raw`Write the family: juniors $= 5x$, seniors $= 3x$, for a common multiplier $x$.` },
              { prompt: String.raw`The difference (juniors minus seniors) equals $16$. Write that as an equation in $x$ and solve for $x$. Enter $x$.`, accept: [8], placeholder: 'x = ?', explanation: String.raw`$5x - 3x = 2x = 16$, so $x = 8$.`, wrongHint: String.raw`The difference is $5x - 3x = 2x$, and that equals $16$.` },
              { prompt: String.raw`The total is $5x + 3x = 8x$. Using your $x$, enter the total number of students.`, accept: [64], placeholder: 'total', explanation: String.raw`$8x = 8 \times 8 = 64$.`, wrongHint: String.raw`Total is $8x$; substitute the $x$ you found.` }
            ],
            completionMessage: String.raw`Total $64$ (juniors $40$, seniors $24$). You priced one tape box from the given difference, then read off the whole.`
          }
        ],
        flashCards: [
          { type: 'how', front: 'Percent change formula, and which value goes in the denominator?', back: 'Percent change = (change / original) * 100%. The denominator is always the starting value, never the ending value.' },
          { type: 'why', front: 'Why does +20% then -20% land below the start?', back: 'The factors multiply: 1.2 * 0.8 = 0.96. The decrease acts on a larger base, so it removes more than the increase added.' },
          { type: 'how', front: 'A ratio of 3:5 with total 40: how do you find the parts?', back: 'Parts are 3x and 5x, so 8x = 40 and x = 5. The parts are 15 and 25. Ratio numbers are box counts, not amounts.' }
        ]
      },

      /* ======================================================
         TOPIC 4: ALGEBRA TOOLKIT
         ====================================================== */
      {
        id: 'gre-algebra-toolkit',
        title: 'Algebra: Equations, Inequalities, Absolute Value, Exponents',
        description: 'The manipulation rules the GRE tests directly, plus the three traps (sign flips, hidden negatives, lost roots) built into most wrong answers.',
        intuitionLab: {
          type: 'balance',
          title: 'Solve an Equation by Balancing Its Values',
          prompt: 'This illustrative model compares 2x + 3 with 11. Move x until the values match, then check 2x + 3 = 11 algebraically. The model illustrates equality; it does not represent every QC problem below.',
          label: 'Candidate value'
        },
        foundationRefs: [
          { moduleId: 'beginning-algebra', topicId: 'linear-equations-one-var', note: 'The balance model of equation solving: do the same thing to both sides. Used in every problem below.' },
          { moduleId: 'beginning-algebra', topicId: 'linear-inequalities', note: 'Inequality manipulation, especially the sign flip when multiplying or dividing by a negative.' },
          { moduleId: 'beginning-algebra', topicId: 'systems-linear', note: 'Substitution and elimination for two-variable systems.' },
          { moduleId: 'intermediate-algebra', topicId: 'polynomials-exponents', note: 'The exponent rules (product, quotient, power, negative, zero) used verbatim here.' },
          { moduleId: 'intermediate-algebra', topicId: 'factoring', note: 'Difference of squares and other special products used to simplify and solve constraints.' },
          { moduleId: 'beginning-algebra', topicId: 'absolute-value-variation', note: 'Absolute value as distance, and splitting |x| equations into two cases.' }
        ],
        hook: String.raw`
          <div class="callout callout-puzzle">
            <h4>Puzzle: The Impossible Cancellation</h4>
            <p>What is $2^{100} + 2^{100}$? It is not $2^{200}$ and not $4^{100}$. Adding a number to itself doubles it: $2^{100} + 2^{100} = 2 \cdot 2^{100} = 2^{101}$.</p>
            <p>Factoring the repeated term keeps this expression manageable. Apply the product rule to multiplication of like bases; addition needs a separate algebraic step.</p>
          </div>
        `,
        concept: String.raw`
          <p><strong>The Foundation.</strong></p>
          <div class="callout callout-key">
            <h4>Equations and inequalities</h4>
            <p>Adding or subtracting the same expression, or multiplying or dividing by a known nonzero number, gives an equivalent equation on its domain. Squaring may add solutions; division by a variable may lose a zero solution. Check candidates in the original equation. Inequalities retain direction under addition and multiplication by a positive number, and reverse under multiplication or division by a negative number.</p>
          </div>
          <div class="callout callout-key">
            <h4>Absolute value = distance from zero</h4>
            <p>For $a\gt0$, $|x|=a$ splits into $x=a$ or $x=-a$. For $a=0$, only $x=0$ works; for $a\lt0$, no real solution exists.<br>
            $|x| \lt a$ means $-a \lt x \lt a$ (inside the interval).<br>
            $|x| \gt a$ means $x \lt -a$ or $x \gt a$ (outside).<br>
            $|x - c|$ is the distance between $x$ and $c$.</p>
          </div>
          <div class="callout callout-key">
            <h4>Exponent rules</h4>
            <p>For integer exponents and a nonzero base where division occurs, $a^m a^n=a^{m+n}$, $\dfrac{a^m}{a^n}=a^{m-n}$, $(a^m)^n=a^{mn}$, $a^0=1$, and $a^{-n}=1/a^n$. For real square roots, $a^{1/2}=\sqrt a$ requires $a\ge0$. Real noninteger powers need attention to the domain. To solve the positive-base examples below, rewrite $27=3^3$, $8=2^3$, or $125=5^3$.</p>
          </div>
          <div class="callout callout-key">
            <h4>The three special products</h4>
            <p>$(a+b)^2=a^2+2ab+b^2$; $(a-b)^2=a^2-2ab+b^2$; $a^2-b^2=(a+b)(a-b)$. Difference of squares is useful when a sum and difference are easier to evaluate than the original squares. It also exposes roots and common factors.</p>
          </div>
          <div class="callout callout-key">
            <h4>Squares and roots, the honest version</h4>
            <p>$x^2 = 9$ has <em>two</em> solutions, $x = 3$ and $x = -3$. But the symbol $\sqrt{9}$ denotes only the nonnegative root, $3$. The GRE tests this distinction directly.</p>
          </div>
        `,
        abstraction: String.raw`
          <p><strong>An equation is a constraint, and solving is rewriting the constraint without changing what satisfies it.</strong></p>
          <p>Think of $5x - 7 = 3x + 9$ as a filter over all numbers: some pass, most fail. Each legal algebra move (add to both sides, multiply both sides by a nonzero constant) produces a <em>new filter that passes exactly the same numbers</em>: an equivalent constraint. Solving is a chain of such rewrites ending in a filter so simple ($x = 8$) that its solution set is visible.</p>
          <p>Several common errors change the solution set without checking the new candidates or excluded cases:</p>
          <ul>
            <li><em>Dividing by an expression that could be zero</em> may discard solutions. From $x^2 = 4x$, dividing by $x$ loses $x = 0$; factoring $x(x - 4) = 0$ keeps both.</li>
            <li><em>Squaring both sides</em> may add solutions: $x = 3$ has one; $x^2 = 9$ has two.</li>
            <li><em>Multiplying an inequality by an unknown-sign quantity</em> may or may not flip the direction, so the rewritten constraint is not equivalent to the original.</li>
          </ul>
          <p>Reversible steps preserve the solution set on the stated domain: adding $7$ can be undone by subtracting $7$. Squaring can still be useful, but it produces candidates that require checking in the original equation. If you divide by an expression, first handle any case where it is zero. Separate equivalent rewrites from steps that need a later check.</p>
        `,
        stuckGuide: String.raw`
          <div class="callout callout-tip">
            <h4>Strategy: in QC, do algebra to both quantities at once</h4>
            <p>Subtract the same term from both quantities, or divide both by the same positive value, until one side is a bare number. It is the compare-don't-compute strategy wearing algebra clothes.</p>
          </div>
          <div class="callout callout-warning">
            <h4>Trap: a square equation may permit a negative root</h4>
            <p>$x^2=k$ has two real solutions when $k\gt0$, one when $k=0$, and none when $k\lt0$. A positivity constraint can exclude the negative root. By contrast, $\sqrt k$ denotes the nonnegative root.</p>
          </div>
          <div class="callout callout-warning">
            <h4>Trap: dividing an inequality by a variable</h4>
            <p>If the sign of the variable is unknown, you do not know whether to flip. Move everything to one side and factor instead.</p>
          </div>
        `,
        examples: [
          {
            title: 'An inequality with a negative multiplier',
            problem: String.raw`Solve $7 - 2x \lt 1$.`,
            steps: [
              { title: 'Isolate the variable term', content: String.raw`Subtract $7$ from both sides: $-2x \lt -6$. Subtraction never flips an inequality.` },
              { title: 'Divide by the negative, and flip', content: String.raw`Dividing both sides by $-2$ reverses the direction: $x \gt 3$.`, why: 'Multiplying or dividing by a negative reflects the number line, which reverses every order relation.' },
              { title: 'Check the boundary and sample cases', content: String.raw`At $x=3$, the left side equals $1$, so the strict inequality excludes the boundary. $x=4$ satisfies it; $x=0$ does not. These checks support the equivalent algebraic steps above and help catch a reversed sign.` }
            ]
          },
          {
            title: 'Difference of squares as a computation shortcut',
            problem: String.raw`Compute $\dfrac{51^2 - 49^2}{2}$ without squaring anything.`,
            steps: [
              { title: 'Spot the pattern', content: String.raw`Two squares separated by a minus sign: $a^2 - b^2 = (a+b)(a-b)$.`, why: 'The GRE places difference-of-squares patterns behind arithmetic that looks tedious on purpose.' },
              { title: 'Factor instead of squaring', content: String.raw`$51^2 - 49^2 = (51 + 49)(51 - 49) = 100 \cdot 2 = 200$.` },
              { title: 'Finish', content: String.raw`$200/2=100$. Direct squaring gives $(2601-2401)/2=100$ too; factoring keeps the intermediate numbers smaller.` }
            ]
          }
        ],
        quantComparison: [
          {
            difficulty: 'medium',
            setup: String.raw`$x^2 = 16$`,
            quantityA: String.raw`$x$`,
            quantityB: String.raw`$4$`,
            correctIndex: 3,
            hint: String.raw`<p>How many numbers square to $16$?</p>`,
            explanation: String.raw`$x$ can be $4$ (equal) or $-4$ (B greater). Two possible relationships: (D). The equation $x^2 = 16$ never promised a positive $x$.`,
            wrongExplanations: {
              0: String.raw`No value of $x$ with $x^2 = 16$ exceeds $4$; the candidates are exactly $\pm 4$.`,
              1: String.raw`True only for $x = -4$; $x = 4$ gives equality.`,
              2: String.raw`True only for $x = 4$; the problem also allows $x = -4$.`
            }
          },
          {
            difficulty: 'medium',
            quantityA: String.raw`$2^{100} + 2^{100}$`,
            quantityB: String.raw`$2^{101}$`,
            correctIndex: 2,
            hint: String.raw`<p>Adding a number to itself is multiplying it by $2$.</p>`,
            explanation: String.raw`$2^{100} + 2^{100} = 2 \cdot 2^{100} = 2^{101}$. Equal: (C). Addition of like powers converts to one extra factor, never to added exponents.`,
            wrongExplanations: {
              0: String.raw`$2^{100} + 2^{100}$ is exactly double $2^{100}$, which is exactly $2^{101}$.`,
              1: String.raw`Same value: doubling adds $1$ to the exponent.`,
              3: String.raw`These fixed numerical quantities have a determined relationship.`
            }
          },
          {
            difficulty: 'easy',
            setup: String.raw`$x \lt 0$`,
            quantityA: String.raw`$x^3$`,
            quantityB: String.raw`$x^2$`,
            correctIndex: 1,
            hint: String.raw`<p>Track signs only.</p>`,
            explanation: String.raw`For negative $x$: odd power $x^3$ is negative, even power $x^2$ is positive. Any positive beats any negative: (B). No numbers needed, just parity of the exponent.`,
            wrongExplanations: {
              0: String.raw`$x^3 \lt 0 \lt x^2$ whenever $x \lt 0$.`,
              2: String.raw`They could only be equal if $x = 0$ or $x = 1$, both excluded by $x \lt 0$.`,
              3: String.raw`The sign analysis fixes the answer for every negative $x$, so the relationship is determined.`
            }
          },
          {
            difficulty: 'easy',
            quantityA: String.raw`$17^2 - 13^2$`,
            quantityB: String.raw`$(17 - 13)(17 + 13)$`,
            correctIndex: 2,
            hint: String.raw`<p>Difference of squares.</p>`,
            explanation: String.raw`$a^2 - b^2 = (a-b)(a+b)$, so both quantities equal $4 \cdot 30 = 120$. (C). Recognizing the identity saves you from squaring $17$.`,
            wrongExplanations: {
              0: String.raw`They are the same expression, factored versus expanded.`,
              1: String.raw`They are the same expression, factored versus expanded.`,
              3: String.raw`Fixed numbers, fixed relationship.`
            }
          }
        ],
        exercises: [
          {
            difficulty: 'easy',
            question: String.raw`If $5x - 7 = 3x + 9$, then $x =$`,
            options: ['4', '6', '8', '10', '16'],
            correctIndex: 2,
            hint: String.raw`<p>Collect $x$ terms on one side, constants on the other.</p>`,
            correctExplanation: String.raw`$5x - 3x = 9 + 7 \Rightarrow 2x = 16 \Rightarrow x = 8$.`,
            wrongExplanations: {
              0: String.raw`Check: $5(4) - 7 = 13$ but $3(4) + 9 = 21$.`,
              1: String.raw`Check: $5(6) - 7 = 23$ but $3(6) + 9 = 27$.`,
              3: String.raw`Check: $5(10) - 7 = 43$ but $3(10) + 9 = 39$: overshot.`,
              4: String.raw`$16$ is $2x$; the last step divides by $2$.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`If $3^{x+2} = 27^2$, then $x =$`,
            options: ['2', '3', '4', '6', '7'],
            correctIndex: 2,
            hint: String.raw`<p>Write $27$ as a power of $3$ first.</p>`,
            correctExplanation: String.raw`$27 = 3^3$, so $27^2 = 3^6$. Same base means equal exponents: $x + 2 = 6$, so $x = 4$.`,
            wrongExplanations: {
              0: String.raw`$x = 2$ gives $3^4 = 81 \ne 729$.`,
              1: String.raw`$x = 3$ gives $3^5 = 243 \ne 729$.`,
              3: String.raw`$6$ is the full exponent on the right; subtract the $2$ already attached to $x$.`,
              4: String.raw`$x = 7$ gives $3^9$, which is $27^3$, not $27^2$.`
            }
          },
          {
            difficulty: 'hard',
            question: String.raw`If $|2x - 3| = 7$, what is the sum of all possible values of $x$?`,
            options: ['-2', '3', '5', '7', '10'],
            correctIndex: 1,
            hint: String.raw`<p>Split into the two cases $2x - 3 = 7$ and $2x - 3 = -7$.</p>`,
            correctExplanation: String.raw`Because the right side is positive, use two cases: $2x-3=7$ gives $x=5$, and $2x-3=-7$ gives $x=-2$. Both satisfy the original equation. Their sum is $3$.`,
            wrongExplanations: {
              0: String.raw`$-2$ is one solution, not the sum of both.`,
              2: String.raw`$5$ is one solution, not the sum of both.`,
              3: String.raw`$7$ is the right-hand side, not a solution.`,
              4: String.raw`$10$ adds $5$ and... check the second case: $2x - 3 = -7$ gives $x = -2$, not $5$ again.`
            }
          }
        ],
        multiSelect: [
          {
            difficulty: 'medium',
            question: String.raw`For which of the following values of $x$ is $|x - 2| \lt 5$? Select all that apply.`,
            options: [String.raw`$-4$`, String.raw`$-2$`, String.raw`$0$`, String.raw`$6$`, String.raw`$7$`, String.raw`$8$`],
            correctIndices: [1, 2, 3],
            hint: String.raw`<p>$|x-2| \lt 5$ means: distance from $2$ is less than $5$, i.e. $-3 \lt x \lt 7$.</p>`,
            explanation: String.raw`Rewrite as $-3 \lt x \lt 7$. Then $-4$ is out; $-2$ and $0$ and $6$ are in; $7$ is out (strict inequality); $8$ is out. Thinking "distance from $2$" converts the algebra into a number-line check.`
          }
        ],
        freeResponse: [
          {
            difficulty: 'medium',
            question: String.raw`If $2x + y = 11$ and $x - y = 4$, what is the value of $x$?`,
            accept: [5],
            placeholder: 'Enter x',
            hint: String.raw`<p>Add the two equations: the $y$ terms cancel.</p>`,
            explanation: String.raw`Adding eliminates $y$: $3x = 15$, so $x = 5$. Elimination beats substitution whenever coefficients already oppose each other.`
          },
          {
            difficulty: 'medium',
            question: String.raw`Compute $\dfrac{5^8 \cdot 5^3}{5^9}$.`,
            accept: [25],
            placeholder: 'Enter a number',
            hint: String.raw`<p>Combine exponents: add on top, subtract the bottom.</p>`,
            explanation: String.raw`$\frac{5^8 \cdot 5^3}{5^9} = 5^{8+3-9} = 5^2 = 25$. Exponent arithmetic replaces astronomically large intermediate values.`
          }
        ],
        fadedExamples: [
          {
            difficulty: 'medium',
            problem: String.raw`Solve $3^{2x - 1} = 81$ for $x$.`,
            steps: [
              { given: String.raw`Force a common base. Write $81$ as a power of $3$: $81 = 3^4$.` },
              { given: String.raw`With equal bases, the exponents must be equal: $2x - 1 = 4$.` },
              { prompt: String.raw`Solve $2x - 1 = 4$ for $x$.`, accept: [2.5, '5/2'], placeholder: 'x = ?', explanation: String.raw`$2x = 5$, so $x = \frac{5}{2}$.`, wrongHint: String.raw`Add $1$ to both sides, then divide by $2$.` }
            ],
            completionMessage: String.raw`$x = \frac{5}{2}$. Common base, equate exponents, solve: the whole method for exponential equations.`
          },
          {
            difficulty: 'hard',
            problem: String.raw`Solve $|3x - 4| = 11$. Enter the sum of all solutions.`,
            steps: [
              { given: String.raw`Absolute value splits into two cases: $3x - 4 = 11$ or $3x - 4 = -11$.` },
              { prompt: String.raw`Solve the first case $3x - 4 = 11$. Enter that value of $x$.`, accept: [5], placeholder: 'x = ?', explanation: String.raw`$3x = 15$, so $x = 5$.`, wrongHint: String.raw`Add $4$, then divide by $3$.` },
              { prompt: String.raw`Solve the second case $3x - 4 = -11$. Enter that value of $x$.`, accept: [-7 / 3, '-7/3'], placeholder: 'x = ?', explanation: String.raw`$3x = -7$, so $x = -\frac{7}{3}$.`, wrongHint: String.raw`Add $4$ to $-11$ to get $-7$, then divide by $3$.` },
              { prompt: String.raw`Add your two solutions. Enter the sum.`, accept: [8 / 3, '8/3'], placeholder: 'sum', explanation: String.raw`$5 + (-\frac{7}{3}) = \frac{15 - 7}{3} = \frac{8}{3}$.`, wrongHint: String.raw`Add $5$ and $-\frac{7}{3}$ over a common denominator of $3$.` }
            ],
            completionMessage: String.raw`Sum $=\frac{8}{3}$. A positive right side gave two cases here. Check each solution before combining them.`
          }
        ],
        flashCards: [
          { type: 'how', front: 'When does an inequality flip direction?', back: 'When you multiply or divide both sides by a negative number. Adding or subtracting never flips it.' },
          { type: 'define', front: 'Solutions of x^2 = 25 versus the value of sqrt(25)?', back: 'x^2 = 25 has two solutions: 5 and -5. The radical symbol sqrt(25) denotes only the nonnegative root: 5.' },
          { type: 'how', front: 'How do you solve 2^(x) = 8^4 without a calculator?', back: 'Rewrite with a common base: 8 = 2^3, so 8^4 = 2^12, giving x = 12.' },
          { type: 'concept', front: 'When is difference of squares useful?', back: 'a^2 - b^2 = (a+b)(a-b). Use it when the sum and difference simplify computation or expose factors and roots.' }
        ]
      },

      /* ======================================================
         TOPIC 5: WORD PROBLEMS, RATES, WORK
         ====================================================== */
      {
        id: 'gre-word-problems',
        title: 'Word Problems, Rates, and Work',
        description: 'Translating English into equations, the distance-rate-time table, combined work rates, and the average-speed trap.',
        foundationRefs: [
          { moduleId: 'beginning-algebra', topicId: 'variables-expressions', note: 'The translation dictionary: which words become which operations. This topic drills its GRE-specific corners.' },
          { moduleId: 'beginning-algebra', topicId: 'linear-equations-one-var', note: 'Once translated, every problem here reduces to a linear equation you already know how to solve.' },
          { moduleId: 'beginning-algebra', topicId: 'systems-linear', note: 'Two-variable stories (two unknowns, two facts) become the systems from this lesson.' }
        ],
        hook: String.raw`
          <div class="callout callout-puzzle">
            <h4>Puzzle: The Round Trip That Lies</h4>
            <p>You drive to a city at $60$ mph and return along the same road at $30$ mph. Your average speed feels like $45$ mph. It is $40$.</p>
            <p>Average speed is total distance over total time, and you spent <em>twice as long</em> at the slow speed. For a $60$-mile trip each way, the times are $1$ and $2$ hours. The average is $120/3=40$ mph. The arithmetic mean $45$ ignores the unequal time weights.</p>
          </div>
        `,
        concept: String.raw`
          <p><strong>The Foundation.</strong></p>
          <div class="callout callout-key">
            <h4>The translation dictionary</h4>
            <p>Translate the stated relationship, then check the order with a small example. "Five less than $x$" and "five fewer than $x$" mean $x-5$; "$x$ fewer than five" means $5-x$. "Of" often introduces multiplication in a percentage; "per" names a rate's denominator. Define the variable and its units before writing the equation.</p>
          </div>
          <div class="callout callout-key">
            <h4>Distance = Rate $\times$ Time</h4>
            <p>At constant speed, $D=RT$. For $T\gt0$, $R=D/T$; for $R\gt0$, $T=D/R$. For multiple legs, total the distances and times. Average speed is total distance divided by total elapsed time. It equals the arithmetic mean for two equal-time legs, or when their speeds are equal.</p>
          </div>
          <div class="callout callout-key">
            <h4>Work rates add</h4>
            <p>If a machine works at a constant rate and finishes one job in $t\gt0$ hours, its rate is $1/t$ job per hour. Two simultaneous, additive rates give $1/a+1/b=1/t_{\text{together}}$, so $t_{\text{together}}=ab/(a+b)$. This assumes the workers maintain their rates without interfering. A drain subtracts from a fill rate; sequential stages require adding their times.</p>
          </div>
          <div class="callout callout-key">
            <h4>Separate the unknowns from the constraints</h4>
            <p>For two unknowns, two independent linear equations determine a unique solution when they are consistent. Write each numerical fact as a constraint, solve, and check the context. Counts must be nonnegative integers; lengths and positive elapsed times must be positive. Redundant facts do not add an independent constraint.</p>
          </div>
        `,
        abstraction: String.raw`
          <p><strong>Constant-rate models share one relationship:</strong></p>
          <p style="text-align:center"><strong>amount $=$ rate $\times$ time</strong></p>
          <p>Distance problems set amount $=$ miles. Work problems set amount $=$ jobs (usually $1$ job). Wage problems set amount $=$ dollars. Fill problems set amount $=$ bottles or liters. Once you see the shared skeleton, every "new" rate problem is a problem you have already solved with different nouns.</p>
          <p><strong>Units are the grammar of the equation.</strong> A rate is always a fraction of units: miles <em>per</em> hour, jobs <em>per</em> day, dollars <em>per</em> month. Dimensional analysis (tracking the units) tells you which numbers to multiply and which to divide, without memorizing formulas: hours $\times \frac{\text{miles}}{\text{hour}}$ gives miles because the hour units cancel. If your planned computation produces "miles$^2$ per hour," the plan is wrong before you touch arithmetic.</p>
          <p><strong>Distinguish simultaneous work from sequential stages.</strong> For independent workers operating at constant additive rates, add their output per hour. For a journey or production process with stages that happen one after another, add the stage times. The story determines which quantities combine.</p>
        `,
        stuckGuide: String.raw`
          <div class="callout callout-tip">
            <h4>Strategy: variables in the choices? Plug in numbers.</h4>
            <p>Choose distinct permitted values, compute the story's result, and evaluate every candidate expression. Avoid $0$ and $1$ when they make several choices coincide. Eliminate mismatches; distinguish any remaining matches with another case or with algebra. Keep linked variables consistent with the problem.</p>
          </div>
          <div class="callout callout-tip">
            <h4>Strategy: the RTD table</h4>
            <p>One row per traveler or leg, columns $R$, $T$, $D$. Fill what is given, express the rest with one variable, and the equation writes itself from the column that totals.</p>
          </div>
          <div class="callout callout-warning">
            <h4>Trap: averaging speeds</h4>
            <p>Average speed weights each speed by time. The arithmetic mean works for equal time intervals, or trivially when both speeds are equal. For two equal-distance legs at positive speeds $a,b$, total distance over total time simplifies to $2ab/(a+b)$.</p>
          </div>
        `,
        examples: [
          {
            title: 'Plugging in on a variables-in-the-choices problem',
            problem: String.raw`A gym charges a one-time fee of $d$ dollars plus $m$ dollars per month. Which expression gives the total cost, in dollars, of $n$ months of membership?`,
            steps: [
              { title: 'Choose a permitted test case', content: String.raw`Let $d=10$, $m=2$, $n=3$.`, why: 'Distinct small values reduce coincidences, though every candidate still needs evaluation.' },
              { title: 'Answer the story numerically', content: String.raw`One-time $10$ plus $2$ dollars for each of $3$ months: $10 + 6 = 16$.` },
              { title: 'Test the choices', content: String.raw`$d + mn = 10 + 6 = 16$: matches. A decoy like $(d+m)n = 36$ or $dn + m = 32$ does not. Lock in $d + mn$.` }
            ]
          },
          {
            title: 'The RTD table on a two-traveler problem',
            problem: String.raw`Ann leaves at noon driving $40$ mph. Ben leaves the same place at 1 pm on the same road driving $60$ mph. At what time does Ben catch Ann?`,
            steps: [
              { title: 'Build the table', content: String.raw`Let $t$ be Ben's driving time in hours. Rows: Ann has rate $40$, time $t + 1$ (she left an hour earlier), distance $40(t+1)$. Ben has rate $60$, time $t$, distance $60t$.`, why: 'The table forces every quantity to be expressed before any equation is written, which is where most word-problem errors die.' },
              { title: 'State the catching condition', content: String.raw`"Catches" means equal distances: $60t = 40(t + 1)$.` },
              { title: 'Solve and convert back to clock time', content: String.raw`$60t = 40t + 40 \Rightarrow 20t = 40 \Rightarrow t = 2$ hours after 1 pm: Ben catches Ann at $3$ pm, $120$ miles out. Check: Ann has driven $3$ hours at $40$ mph $= 120$ miles.` }
            ]
          }
        ],
        quantComparison: [
          {
            difficulty: 'easy',
            setup: String.raw`Train P travels at $60$ mph for $2$ hours. Train Q travels at $40$ mph for $3$ hours.`,
            quantityA: String.raw`Distance traveled by Train P`,
            quantityB: String.raw`Distance traveled by Train Q`,
            correctIndex: 2,
            hint: String.raw`<p>$D = RT$ twice.</p>`,
            explanation: String.raw`P: $60 \times 2 = 120$ miles. Q: $40 \times 3 = 120$ miles. Equal: (C). Slower for longer can exactly match faster for shorter.`,
            wrongExplanations: {
              0: String.raw`Higher speed does not settle it: Q traveled longer. Multiply out both.`,
              1: String.raw`Longer time does not settle it either: $120 = 120$.`,
              3: String.raw`All four values are given, so the distances are fixed numbers.`
            }
          },
          {
            difficulty: 'medium',
            setup: String.raw`A machine fills $200$ bottles in $4$ minutes at a constant rate.`,
            quantityA: String.raw`The number of bottles the machine fills per minute`,
            quantityB: String.raw`$45$`,
            correctIndex: 0,
            hint: String.raw`<p>Rate $=$ amount $\div$ time.</p>`,
            explanation: String.raw`$200/4=50$ bottles per minute, which exceeds $45$. (A). Dividing the output by elapsed time gives the unit rate.`,
            wrongExplanations: {
              1: String.raw`$200 \div 4 = 50$, which exceeds $45$.`,
              2: String.raw`$50 \ne 45$.`,
              3: String.raw`A constant rate and complete data mean the quantity is a fixed number.`
            }
          }
        ],
        exercises: [
          {
            difficulty: 'easy',
            question: String.raw`Five less than three times a number is $16$. What is the number?`,
            options: ['3', '5', '7', '9', '11'],
            correctIndex: 2,
            hint: String.raw`<p>"Five less than $3x$" is $3x - 5$, not $5 - 3x$.</p>`,
            correctExplanation: String.raw`$3x - 5 = 16 \Rightarrow 3x = 21 \Rightarrow x = 7$.`,
            wrongExplanations: {
              0: String.raw`Check: $3(3) - 5 = 4 \ne 16$.`,
              1: String.raw`Check: $3(5) - 5 = 10 \ne 16$.`,
              3: String.raw`Check: $3(9) - 5 = 22$: overshot.`,
              4: String.raw`$11$ solves $3x - 5 = 28$, not $16$.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`Pipe A fills a pool in $6$ hours. Pipe B fills the same pool in $3$ hours. Working together, how long do they take?`,
            options: ['1.5 hours', '2 hours', '2.5 hours', '4.5 hours', '9 hours'],
            correctIndex: 1,
            hint: String.raw`<p>Add the per-hour fractions of the pool: $\frac{1}{6} + \frac{1}{3}$.</p>`,
            correctExplanation: String.raw`Rates add: $\frac{1}{6} + \frac{1}{3} = \frac{1}{2}$ pool per hour, so the full pool takes $2$ hours. Shortcut: $\frac{ab}{a+b} = \frac{18}{9} = 2$.`,
            wrongExplanations: {
              0: String.raw`$1.5$ would need a combined rate of $\frac{2}{3}$ per hour; the actual combined rate is $\frac{1}{2}$.`,
              2: String.raw`Times do not combine by averaging or splitting differences. Add the rates: $\frac{1}{6} + \frac{1}{3} = \frac{1}{2}$ pool per hour.`,
              3: String.raw`$4.5$ is the average of $6$ and $3$: the classic trap. Working together must beat the faster worker alone ($3$ hours).`,
              4: String.raw`$9$ adds the times, but two pipes together are faster than either alone, not slower.`
            }
          },
          {
            difficulty: 'hard',
            question: String.raw`A car travels from town X to town Y at $60$ mph and returns along the same route at $30$ mph. What is its average speed for the round trip, in mph?`,
            options: ['36', '40', '42', '45', '48'],
            correctIndex: 1,
            hint: String.raw`<p>Pick a convenient one-way distance, like $60$ miles, and compute total distance over total time.</p>`,
            correctExplanation: String.raw`Let each leg be $60$ miles. Out: $1$ hour. Back: $2$ hours. Average $= \frac{120 \text{ miles}}{3 \text{ hours}} = 40$ mph. Formula for equal distances: $\frac{2ab}{a+b} = \frac{2 \cdot 60 \cdot 30}{90} = 40$.`,
            wrongExplanations: {
              0: String.raw`$36$ would follow from legs of unequal length; here the distances match.`,
              2: String.raw`Recompute the time: the slow leg takes twice as long.`,
              3: String.raw`$45$ is the arithmetic mean of the speeds: the planted trap. More time is spent at $30$ mph, dragging the average below $45$.`,
              4: String.raw`$48$ would require spending more time at the faster speed, but the faster leg takes less time.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`A gym charges a one-time fee of $d$ dollars plus $m$ dollars per month. The total cost, in dollars, of $n$ months of membership is:`,
            options: [String.raw`$(d + m)n$`, String.raw`$d + mn$`, String.raw`$dn + m$`, String.raw`$\dfrac{d + m}{n}$`, String.raw`$dmn$`],
            correctIndex: 1,
            hint: String.raw`<p>Try $d = 10$, $m = 2$, $n = 3$ and compute the story's answer first.</p>`,
            correctExplanation: String.raw`With $d=10, m=2, n=3$ the cost is $10 + 2 \cdot 3 = 16$. Only $d + mn$ gives $16$. The one-time fee is paid once; only the monthly fee scales with $n$.`,
            wrongExplanations: {
              0: String.raw`$(d+m)n$ charges the one-time fee every month: $36$ in the test numbers.`,
              2: String.raw`$dn + m$ scales the wrong fee: $32$ in the test numbers.`,
              3: String.raw`Dividing by months has no meaning in this story: $4$ in the test numbers.`,
              4: String.raw`$dmn$ multiplies everything: $60$ in the test numbers.`
            }
          }
        ],
        multiSelect: [
          {
            difficulty: 'medium',
            question: String.raw`A car travels $150$ miles in $3$ hours. Which of the following must be true? Select all that apply.`,
            options: [
              'Its average speed was 50 miles per hour',
              String.raw`At a constant $60$ mph, the same trip would take $2.5$ hours`,
              'The car never exceeded 55 miles per hour',
              'The car traveled at exactly 50 miles per hour the entire time'
            ],
            correctIndices: [0, 1],
            hint: String.raw`<p>"Must be true" excludes anything about moment-to-moment speed: only totals are known.</p>`,
            explanation: String.raw`Average speed $= 150/3 = 50$ mph (true). At $60$ mph, $t = 150/60 = 2.5$ hours (true). The last two claims describe the speed at particular moments, which the totals cannot determine: the car may have stopped, sped, and slowed arbitrarily.`
          }
        ],
        freeResponse: [
          {
            difficulty: 'hard',
            question: String.raw`Working alone, machine A completes a job in $4$ hours. Working together at constant rates, machines A and B complete the same job in $2.4$ hours. How many hours does machine B need alone?`,
            accept: [6],
            placeholder: 'Enter hours',
            hint: String.raw`<p>Subtract rates: $\frac{1}{2.4} - \frac{1}{4}$. Write $\frac{1}{2.4}$ as $\frac{5}{12}$.</p>`,
            explanation: String.raw`Combined rate $=1/2.4=5/12$ job per hour. Subtract A's rate $1/4=3/12$: B's rate is $1/6$ job per hour. Thus B takes $6$ hours alone. This assumes the machines retain their individual rates together; subtracting their completion times would not give B's rate.`
          },
          {
            difficulty: 'easy',
            question: String.raw`Maria is twice as old as Jon, and the sum of their ages is $36$. How old is Maria?`,
            accept: [24],
            placeholder: 'Enter an age',
            hint: String.raw`<p>Let Jon be $j$; then Maria is $2j$ and $3j = 36$.</p>`,
            explanation: String.raw`$j + 2j = 36 \Rightarrow j = 12$, so Maria is $24$. Define the variable as the smaller quantity ("Jon"), and the other quantity stays multiplication-friendly.`
          }
        ],
        fadedExamples: [
          {
            difficulty: 'hard',
            problem: String.raw`Pump A fills a tank in $10$ hours; pump B fills it in $15$ hours. Working together, how many hours do they take?`,
            steps: [
              { given: String.raw`Convert each time to a rate (tank per hour): A does $\frac{1}{10}$, B does $\frac{1}{15}$.` },
              { prompt: String.raw`Add the rates over a common denominator of $30$. Enter the combined rate as a fraction (tank per hour).`, accept: ['1/6', '5/30'], placeholder: 'e.g. 1/6', explanation: String.raw`$\frac{1}{10} + \frac{1}{15} = \frac{3}{30} + \frac{2}{30} = \frac{5}{30} = \frac{1}{6}$.`, wrongHint: String.raw`Rewrite both as thirtieths: $\frac{3}{30}$ and $\frac{2}{30}$, then add.` },
              { prompt: String.raw`Time is the reciprocal of the combined rate. Enter the hours the two pumps take together.`, accept: [6], placeholder: 'hours', explanation: String.raw`Time $= 1 \div \frac{1}{6} = 6$ hours.`, wrongHint: String.raw`Invert the combined rate $\frac{1}{6}$.` }
            ],
            completionMessage: String.raw`$6$ hours. With positive constant fill rates and no interference or leak, the combined time is shorter than either pump's individual time. Add simultaneous rates; add times for sequential stages.`
          }
        ],
        flashCards: [
          { type: 'how', front: 'Average speed for two equal-distance legs at positive speeds a and b?', back: 'Total distance / total time = 2ab/(a+b). It is below the arithmetic mean when a and b differ, and equals it when they match.' },
          { type: 'how', front: 'Two workers finish alone in a and b hours. Together?', back: 'With constant, positive, additive rates, 1/a + 1/b = 1/t, so t = ab/(a+b). It is faster than either worker alone under these assumptions.' },
          { type: 'how', front: 'What does plugging in values establish?', back: 'A mismatch eliminates an expression. A match at one case is insufficient when other choices match too; try another permitted case or derive the expression.' }
        ]
      },
      /* ======================================================
         TOPIC 6: STATISTICS
         ====================================================== */
      {
        id: 'gre-statistics',
        title: 'Averages, Spread, and the Normal Curve',
        description: 'Convert means to totals, compare weighted averages and spread, read quartiles, and use approximate normal-distribution bands.',
        foundationRefs: [
          { moduleId: 'probability-statistics', topicId: 'descriptive-statistics', note: 'Definitions of mean, median, mode, range, and standard deviation, with full computations. Here we only exploit them.' },
          { moduleId: 'probability-statistics', topicId: 'random-variables', note: 'Random variables and normal distributions. Use the normal model only when the problem specifies it.' }
        ],
        visualizations: [
          {
            render: (containerId) => {
              Viz.normalCurve(containerId, {
                mean: 100, sd: 15,
                title: 'Normal model: mean 100, SD 15; approximately 68% lies from 85 to 115',
                shadeFromSd: -1, shadeToSd: 1
              });
            }
          }
        ],
        hook: String.raw`
          <div class="callout callout-puzzle">
            <h4>Puzzle: The Fifth Test</h4>
            <p>Your first four test scores average $80$. You want a $82$ average after the fifth test. A friend says "score $82$"; another says "score $90$." Who is right?</p>
            <p>Five tests at mean $82$ require $410$ total points. The first four contribute $4\times80=320$, so the fifth must contribute $90$. Converting the means to totals exposes the missing score.</p>
          </div>
        `,
        concept: String.raw`
          <p><strong>The Foundation.</strong></p>
          <div class="callout callout-key">
            <h4>Mean is a sum in disguise</h4>
            <p>For a nonempty data set, mean $=\text{sum}/\text{count}$, so sum $=$ mean $\times$ count. Work with totals when combining groups or finding a missing value; convert back to a mean after updating the count.</p>
          </div>
          <div class="callout callout-key">
            <h4>Median, mode, range</h4>
            <p>Median: sort first, then take the middle value, or average the two middle values for an even count. Mode: a most frequent value; there may be several. Range: maximum minus minimum. Changing an extreme value changes the mean. If the change preserves its position outside the middle, it leaves the median unchanged.</p>
          </div>
          <div class="callout callout-key">
            <h4>Weighted average</h4>
            <p>For nonempty groups, $\text{mean}=\dfrac{n_1\bar{x}_1+n_2\bar{x}_2}{n_1+n_2}$. It lies between the group means. If the means differ, it is closer to the larger group's mean. The midpoint is correct for equal group sizes; it is also correct when both means are equal.</p>
          </div>
          <div class="callout callout-key">
            <h4>Standard deviation, conceptually</h4>
            <p>Standard deviation summarizes squared distances from the mean. Adding the same constant to every value leaves SD unchanged; multiplying every value by $k$ multiplies SD by $|k|$. SD is zero exactly when all values are equal. Compare centered distances or use these transformation rules when possible. A larger range alone does not establish a larger SD; if the ordering is unclear, compare squared deviations using the same convention for both sets.</p>
          </div>
          <div class="callout callout-key">
            <h4>The rough 68–95 rule for a normal model</h4>
            <p>For a normal distribution, about $68\%$ lies within one SD of the mean and $95\%$ within two. On each side, about $34\%$ lies between the mean and one SD, $13.5\%$ between one and two SDs, and $2.5\%$ beyond two SDs. One SD above the mean is near the $84$th percentile. These are rounded model proportions, not a rule for every data set; use any more precise values supplied in the question.</p>
          </div>
          <div class="callout callout-key">
            <h4>Quartiles and the middle half</h4>
            <p>The first quartile $Q_1$ and third quartile $Q_3$ locate the lower and upper quarter boundaries. The interquartile range is $Q_3-Q_1$. A boxplot marks the median inside the box from $Q_1$ to $Q_3$; each quartile describes roughly one quarter of the observations, not one quarter of the numerical range. Follow a stated convention when computing quartiles from a small list, because conventions can differ.</p>
          </div>
        `,
        abstraction: String.raw`
          <p><strong>Statistics compress a data set into a few numbers, and each summary answers a different question.</strong> Location statistics (mean, median) answer "where is the data?" Spread statistics (range, SD) answer "how scattered is it?" The two families behave differently under transformations, and that difference is what the GRE tests:</p>
          <ul>
            <li><em>Shift</em> (add $c$ to every value): location statistics move by $c$; spread statistics do not move at all, because distances between values are unchanged.</li>
            <li><em>Scale</em> (multiply every value by $k$): both families scale, location by $k$ and spread by $|k|$.</li>
          </ul>
          <p>These two rules settle a uniform shift or scale. Removing an observation or changing only one value requires a separate analysis because it changes the mean and the distances together.</p>
          <p><strong>Track totals and counts separately.</strong> A mean of $12$ across $5$ values means a total of $60$. Adding a value adds to the total and increases the count by one; removing a value changes both. Combining groups adds their totals and counts. This bookkeeping derives the weighted-average formula and avoids giving unequal groups equal weights.</p>
          <p><strong>The mean uses values; the median uses ranks.</strong> Changing one extreme value can move the mean substantially while leaving the median fixed if the order of the middle observations stays unchanged. Adding or removing an observation can change the middle ranks. Inspect the actual operation before predicting either summary.</p>
        `,
        stuckGuide: String.raw`
          <div class="callout callout-tip">
            <h4>Strategy: convert every mean statement to a sum statement</h4>
            <p>"Average of 4 tests is 80" means "the four tests total 320." Do this conversion on sight, before reading the question stem.</p>
          </div>
          <div class="callout callout-tip">
            <h4>Strategy: judge SD visually in QC</h4>
            <p>Check for an exact shift or scale before drawing a number line. With equally sized sets and the same SD convention, compare squared distances from each set's own mean. A sketch helps reveal the pattern; ambiguous sketches need calculation.</p>
          </div>
          <div class="callout callout-warning">
            <h4>Trap: median needs sorting</h4>
            <p>The middle of the list <em>as written</em> is a decoy. Sort first, always.</p>
          </div>
        `,
        examples: [
          {
            title: 'The balancing method for a missing score',
            problem: String.raw`After $4$ tests Dana's average is $86$. What must she score on the 5th test to average $88$ overall?`,
            steps: [
              { title: 'Convert means to sums', content: String.raw`Current total: $4 \times 86 = 344$. Required total: $5 \times 88 = 440$. Needed score: $440 - 344 = 96$.`, why: 'Sums are conserved and easy to track; means are not.' },
              { title: 'See the same answer by balancing', content: String.raw`Raising the average by $2$ points costs $2$ points for each of the $5$ slots, all paid by the new test: $88 + (4 \times 2) = 96$.`, why: 'The balancing view is faster once familiar, and it explains why aiming for the target average itself (a score of 88) always falls short.' },
              { title: 'Sanity-check the direction', content: String.raw`The needed score exceeds the target average, as it must: the new test has to pull four below-target scores upward.` }
            ]
          },
          {
            title: 'Comparing standard deviations without formulas',
            problem: String.raw`Which set has the larger standard deviation: $P = \{5, 5, 6, 7, 7\}$ or $Q = \{2, 4, 6, 8, 10\}$?`,
            steps: [
              { title: 'Find both means', content: String.raw`Both sum to $30$, so both means are $6$. A shared mean makes the spread comparison direct.` },
              { title: 'List distances from the mean', content: String.raw`$P$: distances $1, 1, 0, 1, 1$. $Q$: distances $4, 2, 0, 2, 4$.`, why: 'SD summarizes exactly these distances, so comparing the distance lists compares the SDs.' },
              { title: 'Conclude by comparing centered distances', content: String.raw`The sets have the same count, and every $Q$ distance is at least its paired $P$ distance, with some strictly larger. Their squared-distance totals are $40$ and $4$. Thus $Q$ has the larger SD under either the population or sample convention. No square root is needed.` }
            ]
          }
        ],
        quantComparison: [
          {
            difficulty: 'easy',
            setup: String.raw`Set $S = \{3, 5, 8, 10, 14\}$`,
            quantityA: String.raw`The mean of $S$`,
            quantityB: String.raw`The median of $S$`,
            correctIndex: 2,
            hint: String.raw`<p>The set is already sorted; the sum is $40$.</p>`,
            explanation: String.raw`Mean $=40/5=8$. The sorted list's middle value is also $8$, so the median is $8$ and the answer is (C). Neither statistic is generally greater; evaluate them for the given data.`,
            wrongExplanations: {
              0: String.raw`Compute both: $40/5 = 8$ and the third of five sorted values is $8$.`,
              1: String.raw`Compute both: mean and median are both $8$ here.`,
              3: String.raw`The set is fully specified, so both statistics are fixed numbers.`
            }
          },
          {
            difficulty: 'medium',
            setup: String.raw`Set $S = \{2, 4, 6, 8, 10\}$ &nbsp;&nbsp;&nbsp; Set $T = \{4, 5, 6, 7, 8\}$`,
            quantityA: String.raw`The standard deviation of $S$`,
            quantityB: String.raw`The standard deviation of $T$`,
            correctIndex: 0,
            hint: String.raw`<p>Both sets have mean $6$. Which set's values sit farther from $6$?</p>`,
            explanation: String.raw`Both means are $6$. Distances from the mean in $S$: $4, 2, 0, 2, 4$. In $T$: $2, 1, 0, 1, 2$: exactly half as spread. $S$ has the larger SD: (A). No SD formula required, only the spread comparison.`,
            wrongExplanations: {
              1: String.raw`$T$ hugs the shared mean more tightly, which means a smaller SD, not larger.`,
              2: String.raw`Equal SDs would need equally spread values; $S$ is twice as spread.`,
              3: String.raw`Both sets are fully specified, so both SDs are fixed numbers.`
            }
          },
          {
            difficulty: 'medium',
            setup: String.raw`Rui's mean score on $4$ tests is $80$.`,
            quantityA: String.raw`The score Rui needs on a 5th test to raise the mean to $82$`,
            quantityB: String.raw`$88$`,
            correctIndex: 0,
            hint: String.raw`<p>Convert both means to sums.</p>`,
            explanation: String.raw`Current sum: $4 \times 80 = 320$. Required sum: $5 \times 82 = 410$. Needed score: $90 \gt 88$. (A). Raising a mean by $2$ points costs $2$ points on <em>every</em> test, paid by the new one: $80 + 5 \times 2 = 90$.`,
            wrongExplanations: {
              1: String.raw`$88$ is close but short: it produces a sum of $408$ and a mean of $81.6$.`,
              2: String.raw`Off by two points: the new test must cover the 2-point raise for all five slots.`,
              3: String.raw`The needed score is fully determined by the two sums.`
            }
          }
        ],
        exercises: [
          {
            difficulty: 'easy',
            question: String.raw`What is the median of $\{7, 3, 9, 12, 5\}$?`,
            options: ['5', '7', '9', '7.2', '12'],
            correctIndex: 1,
            hint: String.raw`<p>Sort before choosing the middle.</p>`,
            correctExplanation: String.raw`Sorted: $3, 5, 7, 9, 12$. The middle (third) value is $7$.`,
            wrongExplanations: {
              0: String.raw`$5$ is the second sorted value, not the middle of five.`,
              2: String.raw`$9$ is the middle of the list as originally written: the sort-first trap.`,
              3: String.raw`$7.2$ is the mean. The median of an odd-sized set is an actual member of the set.`,
              4: String.raw`$12$ is the maximum.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`Class A has $20$ students with a mean score of $70$. Class B has $30$ students with a mean score of $90$. What is the mean score of the two classes combined?`,
            options: ['78', '80', '82', '84', '85'],
            correctIndex: 2,
            hint: String.raw`<p>Total points $\div$ total students. The answer must sit closer to the larger class's mean.</p>`,
            correctExplanation: String.raw`Total $= 20 \cdot 70 + 30 \cdot 90 = 1400 + 2700 = 4100$. Mean $= 4100/50 = 82$: closer to $90$ because class B is bigger.`,
            wrongExplanations: {
              0: String.raw`$78$ would need class A to be the bigger class; weights pull toward B.`,
              1: String.raw`$80$ is the unweighted midpoint of $70$ and $90$: the planted trap. The classes have different sizes.`,
              3: String.raw`Slightly too far toward B: the exact split is $\frac{2}{5}$ A and $\frac{3}{5}$ B.`,
              4: String.raw`$85$ overweights class B; compute the totals.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`Heights in a population are normally distributed with mean $100$ and standard deviation $15$. Approximately what percent of the population is between $85$ and $115$?`,
            options: [String.raw`$34\%$`, String.raw`$50\%$`, String.raw`$68\%$`, String.raw`$95\%$`, String.raw`$99.7\%$`],
            correctIndex: 2,
            hint: String.raw`<p>$85$ and $115$ are each exactly one SD from the mean. Use the bands in the curve above.</p>`,
            correctExplanation: String.raw`$85 = 100 - 15$ and $115 = 100 + 15$: one SD each side. The two inner bands hold $34\% + 34\% = 68\%$.`,
            wrongExplanations: {
              0: String.raw`$34\%$ is one side only; the interval spans both sides of the mean.`,
              1: String.raw`$50\%$ is everything below the mean, a different region.`,
              3: String.raw`$95\%$ belongs to $\pm 2$ SDs, i.e. $70$ to $130$.`,
              4: String.raw`$99.7\%$ belongs to $\pm 3$ SDs, i.e. $55$ to $145$.`
            }
          }
        ],
        multiSelect: [
          {
            difficulty: 'medium',
            question: String.raw`The number $5$ is added to every value in a data set. Which of the following statistics must change? Select all that apply.`,
            options: ['The mean', 'The median', 'The range', 'The standard deviation'],
            correctIndices: [0, 1],
            hint: String.raw`<p>Shifting every value slides the whole picture without stretching it.</p>`,
            explanation: String.raw`Adding a constant shifts location: mean and median each rise by exactly $5$ (they change). Spread is untouched: max $-$ min is unchanged, and every distance-to-mean is unchanged, so range and SD stay the same. Shift changes location statistics; only stretching changes spread statistics.`
          }
        ],
        freeResponse: [
          {
            difficulty: 'easy',
            question: String.raw`The mean of five numbers is $12$. Four of the numbers are $10, 11, 13, 14$. What is the fifth number?`,
            accept: [12],
            placeholder: 'Enter the number',
            hint: String.raw`<p>Find the required total first.</p>`,
            explanation: String.raw`Required sum $= 5 \times 12 = 60$. The four known numbers total $48$, so the fifth is $12$.`
          },
          {
            difficulty: 'medium',
            question: String.raw`Scores are normally distributed with mean $50$ and standard deviation $5$. A score of $55$ is at approximately what percentile? (Enter the number only.)`,
            accept: [84],
            placeholder: 'Enter a percentile',
            hint: String.raw`<p>$55$ is one SD above the mean: add the half below the mean and the first band above it.</p>`,
            explanation: String.raw`Below the mean: $50\%$. Between the mean and $+1$ SD: $34\%$. Total below $55$: about $84\%$, so the $84$th percentile.`
          }
        ],
        fadedExamples: [
          {
            difficulty: 'medium',
            problem: String.raw`A student's first four quiz scores average $78$. After a fifth quiz, the average of all five is $80$. What did the student score on the fifth quiz?`,
            steps: [
              { given: String.raw`Convert both averages to totals. First four: $4 \times 78 = 312$.` },
              { prompt: String.raw`Find the required total for all five quizzes (five quizzes averaging $80$). Enter it.`, accept: [400], placeholder: 'total', explanation: String.raw`$5 \times 80 = 400$.`, wrongHint: String.raw`Multiply the target average $80$ by the number of quizzes, $5$.` },
              { prompt: String.raw`The fifth score is the new total minus the old total. Enter the fifth-quiz score.`, accept: [88], placeholder: 'score', explanation: String.raw`$400 - 312 = 88$.`, wrongHint: String.raw`Subtract the four-quiz total $312$ from the five-quiz total.` }
            ],
            completionMessage: String.raw`The fifth score is $88$. Converting means to sums turned a fuzzy average question into two subtractions.`
          }
        ],
        flashCards: [
          { type: 'how', front: 'How do you find a missing value from means and counts?', back: 'Convert each mean to a total: sum = mean * count. Subtract the known total from the required total, and check the updated count.' },
          { type: 'concept', front: 'What happens to mean, median, range, SD if you add 7 to every value? If you double every value?', back: 'Add 7: mean and median rise by 7; range and SD unchanged. Double: all four double.' },
          { type: 'define', front: 'What does the rough 68–95 normal rule give on each side?', back: 'Approximately 34% from the mean to 1 SD, 13.5% from 1 to 2 SDs, and 2.5% beyond 2 SDs per side. These rounded bands differ slightly from more precise normal-curve values.' }
        ]
      },

      /* ======================================================
         TOPIC 7: PROBABILITY, COUNTING, OVERLAPPING SETS
         ====================================================== */
      {
        id: 'gre-counting-probability',
        title: 'Probability, Counting, and Overlapping Sets',
        description: 'Choose a sample space, count outcomes, distinguish independence from conditioning, and track overlapping groups.',
        intuitionLab: {
          type: 'probability',
          title: 'Connect Probability to Expected Count',
          prompt: 'Move the success probability p. For n trials with that success probability, the expected count is np. The expectation can be fractional; it is not a promise about the observed count in a particular run.',
          label: 'Success probability'
        },
        foundationRefs: [
          { moduleId: 'probability-statistics', topicId: 'counting-probability', note: 'The counting principle, factorials, permutations, combinations, and basic probability. All formulas used below are proved there.' },
          { moduleId: 'foundations', topicId: 'set-theory', note: 'Union, intersection, and the inclusion-exclusion idea behind the overlapping-sets formula.' },
          { moduleId: 'probability-statistics', topicId: 'conditional-probability-bayes', note: 'Drawing without replacement changes the pool: that is conditional probability in action.' }
        ],
        visualizations: [
          {
            render: (containerId) => {
              Viz.vennDiagram(containerId, {
                labelA: 'French (18)', labelB: 'Spanish (15)',
                highlight: 'intersection',
                title: 'Both: 6; neither: 3; total: 30',
                width: 520, height: 320
              });
            }
          }
        ],
        hook: String.raw`
          <div class="callout callout-puzzle">
            <h4>Puzzle: At Least One Is a Trap</h4>
            <p>Roll a fair die twice independently. The probability of at least one $6$ is not $1/6+1/6$: that sum counts the outcome $(6,6)$ twice. Repeating the same addition for ten rolls would even give $10/6\gt1$, outside the probability range.</p>
            <p>The clean route is the back door: $P(\text{at least one}) = 1 - P(\text{none}) = 1 - \left(\frac{5}{6}\right)^2 = \frac{11}{36}$. The phrase "at least one" almost always means "compute the complement."</p>
          </div>
        `,
        concept: String.raw`
          <p><strong>The Foundation.</strong></p>
          <div class="callout callout-key">
            <h4>Probability basics</h4>
            <p>For equally likely outcomes, $P(E)=\text{favorable outcomes}/\text{total outcomes}$. Complements satisfy $P(E^c)=1-P(E)$. Independent events satisfy $P(A\cap B)=P(A)P(B)$. When $P(A)\gt0$, the general product rule is $P(A\cap B)=P(A)P(B\mid A)$. Events that cannot co-occur are mutually exclusive, which is different from independence.</p>
          </div>
          <div class="callout callout-key">
            <h4>Conditioning changes the reference group</h4>
            <p>For $P(B)\gt0$, $P(A\mid B)=P(A\cap B)/P(B)$. Among equally likely people or objects, restrict the denominator to the group satisfying $B$. Without replacement, update both the numerator and denominator after the first draw. With independent replacement draws, the probabilities stay the same.</p>
          </div>
          <div class="callout callout-key">
            <h4>Counting: the one question that picks the formula</h4>
            <p>For $k$ ordered selections from $n$ distinct objects without reuse, use $n(n-1)\cdots(n-k+1)$. If order does not distinguish outcomes, divide by $k!$: $\binom nk=n!/[k!(n-k)!]$. Arranging all $n$ distinct objects gives $n!$. With reuse allowed, each slot may instead retain $n$ options. Restrictions or repeated identical objects require adjusting the count.</p>
          </div>
          <div class="callout callout-key">
            <h4>Overlapping sets</h4>
            <p>$\text{Total} = A + B - \text{Both} + \text{Neither}$. The subtraction repairs the double count of the overlap (see the diagram above). For problems with two yes/no traits, a $2\times 2$ table (the double-set matrix) organizes everything with no formula at all.</p>
          </div>
        `,
        abstraction: String.raw`
          <p><strong>Organize outcomes without listing them all.</strong> To choose two of eight people, count $8\times7$ ordered selections and divide by two because each pair occurs twice. Three useful counting methods follow:</p>
          <ul>
            <li><em>The product principle:</em> if each first choice allows the same number of second choices, multiply those counts. Without replacement, those later counts shrink. If the count depends on which earlier choice was made, split into cases and add the case totals.</li>
            <li><em>Correcting for overcounting:</em> counting ordered pairs is easy ($8 \times 7$); each unordered pair got counted $2! = 2$ times; divide. Every combination formula is a permutation count divided by the number of internal rearrangements.</li>
            <li><em>The complement:</em> when "at least one" splinters into many cases, count the single case where it fails and subtract from the total. You choose which side of the boundary is cheaper to count.</li>
          </ul>
          <p><strong>Probability is counting with a denominator.</strong> For equally likely outcomes, $P(E)$ is the size of $E$ over the size of everything, so all three moves transfer: multiply stage probabilities, correct for order, take complements ($P = 1 - P(\text{not})$). Drawing without replacement is the product principle with a shrinking denominator: the "probability tree" is just staged counting.</p>
          <p><strong>Inclusion-exclusion is the same overcounting repair.</strong> Adding $|A| + |B|$ counts the overlap twice; subtracting $|A \cap B|$ once repairs it. The Venn diagram, the two-set formula, and the double-set matrix are three notations for one bookkeeping fact.</p>
        `,
        stuckGuide: String.raw`
          <div class="callout callout-tip">
            <h4>Strategy: "at least one" means complement</h4>
            <p>Compute the probability of <em>none</em>, subtract from $1$. It converts a many-case problem into a one-case problem.</p>
          </div>
          <div class="callout callout-tip">
            <h4>Strategy: slots before formulas</h4>
            <p>Mark whether objects can repeat, whether order matters, and whether a slot has restrictions. Fill each slot with its available count. Divide by $k!$ only when every unordered outcome was counted exactly $k!$ times; repeated identical objects or unequal role restrictions can break that condition.</p>
          </div>
          <div class="callout callout-warning">
            <h4>Trap: adding probabilities of non-exclusive events</h4>
            <p>Adding is only legal when events cannot co-occur. "Or" with possible overlap needs $P(A) + P(B) - P(A \text{ and } B)$: the same inclusion-exclusion as sets.</p>
          </div>
        `,
        examples: [
          {
            title: 'Order or not: one committee, two counts',
            problem: String.raw`A club has $9$ members. (a) How many ways can it elect a president and a treasurer? (b) How many ways can it send $2$ members to a conference?`,
            steps: [
              { title: 'Ask the one deciding question', content: String.raw`Does swapping the two chosen people give a different outcome? For president/treasurer: yes (roles differ). For the conference pair: no.`, why: 'This single question routes you to permutations or combinations; nothing else about the story matters.' },
              { title: 'Count the ordered version', content: String.raw`(a) Slots: $9$ choices for president, then $8$ for treasurer: $72$.` },
              { title: 'Repair the overcount for the unordered version', content: String.raw`(b) The same $72$ ordered picks count each pair twice (Ana-Ben and Ben-Ana are one delegation), so $72 / 2 = 36$. Same numbers, one extra division: that is the entire difference between the two formulas.` }
            ]
          },
          {
            title: '"At least one" through the back door',
            problem: String.raw`A password panel has $4$ switches, each independently set up or down with equal probability. What is the probability that at least one switch is up?`,
            steps: [
              { title: 'Refuse the case split', content: String.raw`"At least one up" splinters into exactly-1, exactly-2, exactly-3, exactly-4: four binomial computations.`, why: 'Recognizing the splintering early is the skill; the complement collapses it to one case.' },
              { title: 'Count the single failure case', content: String.raw`The only way to have no switch up is all four down: $\left(\frac{1}{2}\right)^4 = \frac{1}{16}$.` },
              { title: 'Subtract', content: String.raw`$P(\text{at least one up}) = 1 - \frac{1}{16} = \frac{15}{16}$. One subtraction replaced four case computations, and the method scales: with $10$ switches the answer is $1 - \frac{1}{1024}$, still one line.` }
            ]
          }
        ],
        quantComparison: [
          {
            difficulty: 'medium',
            setup: String.raw`A fair coin is flipped $3$ times.`,
            quantityA: String.raw`The probability of exactly $2$ heads`,
            quantityB: String.raw`The probability of exactly $1$ head`,
            correctIndex: 2,
            hint: String.raw`<p>List the $8$ outcomes or count arrangements of HHT and HTT.</p>`,
            explanation: String.raw`Exactly 2 heads: HHT, HTH, THH $= \frac{3}{8}$. Exactly 1 head: HTT, THT, TTH $= \frac{3}{8}$. Equal: (C). The symmetry heads $\leftrightarrow$ tails makes "2 of 3 heads" and "1 of 3 heads" mirror images.`,
            wrongExplanations: {
              0: String.raw`Count both: three arrangements each out of eight outcomes.`,
              1: String.raw`Count both: three arrangements each out of eight outcomes.`,
              3: String.raw`A fair coin and a fixed number of flips fully determine both probabilities.`
            }
          },
          {
            difficulty: 'medium',
            quantityA: String.raw`The number of ways to arrange $4$ distinct books on a shelf`,
            quantityB: String.raw`The number of ways to choose $2$ people from a group of $8$`,
            correctIndex: 1,
            hint: String.raw`<p>One is a factorial, the other a combination.</p>`,
            explanation: String.raw`Arrangements: $4! = 24$. Choices: $\binom{8}{2} = \frac{8 \cdot 7}{2} = 28$. Quantity B is greater. Note the contrast: arranging counts order, choosing does not (divide by $2$).`,
            wrongExplanations: {
              0: String.raw`$4! = 24$ while $\binom{8}{2} = 28$.`,
              2: String.raw`$24 \ne 28$: close, which is why you compute rather than eyeball.`,
              3: String.raw`Both counts are fixed numbers.`
            }
          }
        ],
        exercises: [
          {
            difficulty: 'medium',
            question: String.raw`In a class of $30$ students, $18$ take French, $15$ take Spanish, and $6$ take both. How many take neither language?`,
            options: ['0', '3', '6', '9', '12'],
            correctIndex: 1,
            hint: String.raw`<p>Total $=$ F $+$ S $-$ Both $+$ Neither.</p>`,
            correctExplanation: String.raw`Students taking at least one: $18 + 15 - 6 = 27$ (the $6$ two-language students were counted twice, so subtract once). Neither: $30 - 27 = 3$.`,
            wrongExplanations: {
              0: String.raw`$18 + 15 = 33$ exceeds the class only because of double counting; after fixing it, $3$ students remain outside.`,
              2: String.raw`$6$ is the overlap, not the outside.`,
              3: String.raw`Check the union: $18 + 15 - 6 = 27$, leaving $3$.`,
              4: String.raw`$12$ subtracts the overlap twice. It is removed exactly once.`
            }
          },
          {
            difficulty: 'hard',
            question: String.raw`A fair die is rolled twice. What is the probability of rolling at least one $6$?`,
            options: [String.raw`$\dfrac{1}{6}$`, String.raw`$\dfrac{1}{3}$`, String.raw`$\dfrac{11}{36}$`, String.raw`$\dfrac{25}{36}$`, String.raw`$\dfrac{1}{36}$`],
            correctIndex: 2,
            hint: String.raw`<p>Compute the probability of no sixes, then subtract from $1$.</p>`,
            correctExplanation: String.raw`$P(\text{no } 6 \text{ in two rolls}) = \left(\frac{5}{6}\right)^2 = \frac{25}{36}$. So $P(\text{at least one}) = 1 - \frac{25}{36} = \frac{11}{36}$.`,
            wrongExplanations: {
              0: String.raw`$\frac{1}{6}$ is the chance on a single roll; two chances raise it.`,
              1: String.raw`$\frac{1}{3}$ adds the two rolls' probabilities, double-counting the double-six outcome.`,
              3: String.raw`$\frac{25}{36}$ is the complement: the probability of no sixes at all.`,
              4: String.raw`$\frac{1}{36}$ is the probability of two sixes, a much rarer event.`
            }
          },
          {
            difficulty: 'hard',
            question: String.raw`A committee of $3$ is chosen from $4$ men and $5$ women. How many committees have exactly $2$ women?`,
            options: ['20', '30', '40', '60', '80'],
            correctIndex: 2,
            hint: String.raw`<p>Choose the women, choose the man, multiply.</p>`,
            correctExplanation: String.raw`Women: $\binom{5}{2} = 10$ ways. The remaining seat is a man: $\binom{4}{1} = 4$ ways. Total $10 \times 4 = 40$. Independent choices multiply.`,
            wrongExplanations: {
              0: String.raw`$20$ misses a factor: after picking $2$ women there are $4$ ways to pick the man, not $2$.`,
              1: String.raw`$30$ is $\binom{5}{2} \cdot 3$: the man comes from the $4$ men, not from $3$.`,
              3: String.raw`$60$ treats the two women as ordered ($5 \cdot 4 \cdot 3$): committees are unordered.`,
              4: String.raw`$80$ doubles the answer, usually from counting the women both as ordered and choosing a man.`
            }
          }
        ],
        multiSelect: [
          {
            difficulty: 'hard',
            question: String.raw`A bag holds $3$ red and $5$ blue marbles. Which of the following are true? Select all that apply.`,
            options: [
              String.raw`The probability of drawing a red marble is $\dfrac{3}{8}$`,
              String.raw`The probability of drawing a blue marble is $\dfrac{3}{5}$`,
              String.raw`Drawing twice without replacement, the probability both are red is $\dfrac{3}{28}$`,
              String.raw`Drawing twice without replacement, the probability of at least one blue is $\dfrac{25}{28}$`
            ],
            correctIndices: [0, 2, 3],
            hint: String.raw`<p>Check each independently. The last one is the complement of the third.</p>`,
            explanation: String.raw`(A) $\frac{3}{8}$: true, $3$ favorable of $8$ total. (B) blue is $\frac{5}{8}$, not $\frac{3}{5}$: the denominator is the whole bag, not the blue count. (C) $\frac{3}{8} \cdot \frac{2}{7} = \frac{6}{56} = \frac{3}{28}$: true; the second draw sees $2$ reds among $7$ marbles. (D) at least one blue is the complement of both-red: $1 - \frac{3}{28} = \frac{25}{28}$: true.`
          }
        ],
        freeResponse: [
          {
            difficulty: 'easy',
            question: String.raw`Five people each shake hands with every other person exactly once. How many handshakes occur?`,
            accept: [10],
            placeholder: 'Enter a number',
            hint: String.raw`<p>A handshake is an unordered pair of people.</p>`,
            explanation: String.raw`$\binom{5}{2} = \frac{5 \cdot 4}{2} = 10$. Order does not matter (a handshake between A and B is one event), so divide the $5 \times 4$ ordered pairs by $2$.`
          },
          {
            difficulty: 'medium',
            question: String.raw`Two fair dice are rolled. What is the probability that the sum is $7$? Enter your answer as a fraction.`,
            accept: ['1/6', '6/36'],
            placeholder: 'e.g. 5/36',
            hint: String.raw`<p>Count the pairs summing to $7$ among the $36$ outcomes.</p>`,
            explanation: String.raw`Favorable pairs: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$: six of $36$, so $\frac{6}{36} = \frac{1}{6}$. Seven is the most likely sum precisely because it has the most representations.`
          }
        ],
        strategySelect: [
          {
            difficulty: 'medium',
            scenario: String.raw`Five different books are placed on a shelf in a row. How many distinct arrangements are there?`,
            options: ['Permutations: order matters', 'Combinations: order does not matter', 'Complement: total minus the bad cases', 'Inclusion-exclusion for overlap'],
            correctIndex: 0,
            explanation: String.raw`Arranging distinct objects in a row is ordered, so it is a permutation: $5! = 120$. Swapping two books gives a genuinely different shelf.`,
            wrongExplanations: {
              1: String.raw`Combinations count unordered selections. Here two orderings of the same books are different arrangements, so order matters.`,
              2: String.raw`There are no "bad cases" to exclude; every ordering is valid and counted.`,
              3: String.raw`Nothing overlaps here, so inclusion-exclusion has no role.`
            }
          },
          {
            difficulty: 'hard',
            scenario: String.raw`A fair coin is flipped $6$ times. What is the probability of getting at least one head?`,
            options: ['Add the probabilities of 1, 2, 3, 4, 5, and 6 heads', String.raw`Complement: $1 - P(\text{no heads})$`, 'Permutations of heads and tails', String.raw`A combination $\binom{6}{1}$ divided by the total`],
            correctIndex: 1,
            explanation: String.raw`"At least one" is the complement of "none." $P(\text{no heads}) = (\frac{1}{2})^6 = \frac{1}{64}$, so the answer is $1 - \frac{1}{64} = \frac{63}{64}$. One line instead of six.`,
            wrongExplanations: {
              0: String.raw`Summing the six cases gives the right answer but takes six binomial computations. The complement collapses them into one.`,
              2: String.raw`Permutations count arrangements, not this probability directly.`,
              3: String.raw`$\binom{6}{1}$ counts exactly-one-head outcomes, not at-least-one.`
            }
          },
          {
            difficulty: 'medium',
            scenario: String.raw`In a group of $50$ people, $30$ like tea, $25$ like coffee, and $10$ like both. How many like neither?`,
            options: ['Inclusion-exclusion, then subtract from the total', 'Complement of a single event', 'Permutations of the preferences', 'Add $30 + 25 + 10$ and subtract from $50$'],
            correctIndex: 0,
            explanation: String.raw`Two overlapping sets: those liking at least one drink are $30 + 25 - 10 = 45$, so $50 - 45 = 5$ like neither. Subtracting the overlap once repairs the double count.`,
            wrongExplanations: {
              1: String.raw`There are two overlapping categories, not one event, so a plain complement is not enough; you must handle the overlap first.`,
              2: String.raw`Order and arrangement play no role in a counting-of-membership problem.`,
              3: String.raw`Adding the overlap in ($+10$) double-counts it. The overlap must be subtracted, not added.`
            }
          }
        ],
        flashCards: [
          { type: 'how', front: 'The instant translation of "at least one"?', back: 'P(at least one) = 1 - P(none). Compute the easy all-failures case and subtract.' },
          { type: 'how', front: 'Permutation or combination: the deciding question?', back: 'Does order matter? Seats, rankings, codes: yes, permutations. Committees, subsets, handshakes: no, combinations.' },
          { type: 'define', front: 'The overlapping-sets formula?', back: 'Total = A + B - Both + Neither. Subtracting Both fixes the double count of the overlap.' }
        ]
      },

      /* ======================================================
         TOPIC 8: GEOMETRY
         ====================================================== */
      {
        id: 'gre-geometry',
        title: 'Geometry: Angles, Triangles, Circles, Solids',
        description: 'The compact fact sheet the GRE draws from, the third-side rule, special right triangles, and the shaded-region subtraction move.',
        intuitionLab: {
          type: 'geometry',
          title: 'Triangle Angles Retain Their Sum',
          prompt: 'Change the triangle parameter and compare the three labeled interior angles. Their sum stays 180 degrees. Use the labels and this invariant to reason about triangles; a GRE geometric sketch need not preserve lengths or angles to scale.',
          label: 'Measurement'
        },
        foundationRefs: [
          { moduleId: 'geometry', topicId: 'points-lines-angles', note: 'Vertical angles, straight-line angles, and parallel-line angle pairs: quoted below without proof.' },
          { moduleId: 'geometry', topicId: 'triangles', note: 'Angle sum, the Pythagorean theorem, and similarity. The special-ratio triangles below are its GRE-critical corollaries.' },
          { moduleId: 'geometry', topicId: 'circles', note: 'Circumference, area, arcs, and sectors, derived properly.' },
          { moduleId: 'geometry', topicId: 'area-volume', note: 'Area and volume formulas for polygons, prisms, and cylinders.' }
        ],
        hook: String.raw`
          <div class="callout callout-puzzle">
            <h4>Puzzle: The Triangle That Cannot Exist</h4>
            <p>Two sides of a triangle measure $5$ and $9$. A classmate claims the third side is $14$. Walk it: to connect the ends of a $5$-stick and a $9$-stick laid end to end, a $14$-stick lies perfectly flat: a segment, not a triangle.</p>
            <p>The third side must be strictly between $9 - 5 = 4$ and $9 + 5 = 14$. This "third-side rule" is a whole GRE question genre by itself.</p>
          </div>
        `,
        concept: String.raw`
          <p><strong>The Foundation.</strong></p>
          <div class="callout callout-key">
            <h4>Angles</h4>
            <p>Straight line: $180^\circ$. Around a point: $360^\circ$. Vertical angles are equal. With parallel lines cut by a transversal: alternate angles equal, co-interior angles sum to $180^\circ$.</p>
          </div>
          <div class="callout callout-key">
            <h4>Triangles</h4>
            <p>Angles sum to $180^\circ$. Area $= \frac{1}{2} \times \text{base} \times \text{height}$. Third-side rule: $|a - b| \lt c \lt a + b$ (strict). Bigger angle faces bigger side. Isosceles: equal sides face equal angles.</p>
          </div>
          <div class="callout callout-key">
            <h4>Right triangles: the memorized set</h4>
            <p>Pythagorean theorem $a^2 + b^2 = c^2$. Integer triples worth knowing cold: $3$-$4$-$5$, $5$-$12$-$13$, $8$-$15$-$17$, and their multiples ($6$-$8$-$10$, $9$-$12$-$15$). Special ratios: $45$-$45$-$90$ sides $1 : 1 : \sqrt{2}$; $30$-$60$-$90$ sides $1 : \sqrt{3} : 2$ (shortest side faces $30^\circ$).</p>
          </div>
          <div class="callout callout-key">
            <h4>Circles</h4>
            <p>$C = 2\pi r$, $A = \pi r^2$. An arc or sector is the fraction $\frac{\text{central angle}}{360^\circ}$ of the whole circumference or area.</p>
          </div>
          <figure class="math-diagram">
            <svg viewBox="0 0 420 310" width="420" style="max-width:100%;height:auto" role="img" aria-labelledby="gre-inscribed-square-title gre-inscribed-square-desc">
              <title id="gre-inscribed-square-title">A circle of radius 4 inscribed in a square of side 8</title>
              <desc id="gre-inscribed-square-desc">The circle touches each side of the square. The highlighted corner regions lie inside the square and outside the circle. The horizontal radius measures 4; the square side measures 8.</desc>
              <rect x="110" y="30" width="200" height="200" fill="var(--accent-amber,#f59e0b)" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/>
              <circle cx="210" cy="130" r="100" fill="var(--bg-secondary,#ffffff)" stroke="var(--accent-blue,#3b82f6)" stroke-width="2"/>
              <line x1="210" y1="130" x2="310" y2="130" stroke="currentColor" stroke-width="2"/>
              <circle cx="210" cy="130" r="3" fill="currentColor"/>
              <text x="250" y="116" fill="currentColor" font-size="16">r = 4</text>
              <line x1="110" y1="251" x2="310" y2="251" stroke="currentColor"/>
              <line x1="110" y1="245" x2="110" y2="257" stroke="currentColor"/>
              <line x1="310" y1="245" x2="310" y2="257" stroke="currentColor"/>
              <text x="210" y="278" text-anchor="middle" fill="currentColor" font-size="16">side = diameter = 8</text>
            </svg>
            <figcaption>The highlighted region has area $8^2-\pi(4)^2=64-16\pi$. The diameter determines the square's side because the circle touches all four sides.</figcaption>
          </figure>
          <div class="callout callout-key">
            <h4>Polygons and solids</h4>
            <p>Interior angles of an $n$-gon sum to $(n-2) \cdot 180^\circ$; a regular $n$-gon splits that equally. Rectangular solid: $V = lwh$, surface area $= 2(lw + lh + wh)$. Cube of edge $s$: $V = s^3$, surface $6s^2$. Cylinder: $V = \pi r^2 h$.</p>
          </div>
        `,
        abstraction: String.raw`
          <p><strong>Decomposition and constraints organize many geometry problems.</strong></p>
          <p><em>1. Additivity: measures add under decomposition.</em> Cut a region into pieces and the areas add; the same for lengths along a path, angles around a point, and volumes of stacked solids. Read familiar facts through this lens: the $(n-2) \cdot 180^\circ$ polygon formula is additivity (fan the polygon into $n - 2$ triangles); the shaded-region method is additivity run backwards (whole minus parts); the interior-angle sum of a triangle is a straight line's $180^\circ$ redistributed. When a figure looks unmanageable, the question to ask is always: <em>what can I cut, and what can I subtract?</em></p>
          <p><em>2. Constraints define a family of figures.</em> Two side lengths $5$ and $9$ allow many triangles with third side strictly between $4$ and $14$. In QC, determine whether the relation stays the same across that family. Use two allowed configurations with different relationships to establish (D), or use a bound to establish one relationship. A flat figure at an excluded endpoint is not an allowed test case.</p>
          <p>The special triangles ($3$-$4$-$5$, $45$-$45$-$90$, $30$-$60$-$90$) earn their place through a third idea, <em>similarity</em>: scaling preserves shape, so one memorized ratio serves every size. That is why the ratios are stated unitless.</p>
        `,
        stuckGuide: String.raw`
          <div class="callout callout-warning">
            <h4>Trap: geometric sketches need not be to scale</h4>
            <p>Use stated lengths, angle marks, and derived facts. Preserve straight lines, the order of collinear points, and the relative positions shown. Coordinate systems and data graphs follow their scales. For an undetermined geometric figure in QC, redraw allowed configurations; two different comparison results establish (D).</p>
          </div>
          <div class="callout callout-tip">
            <h4>Strategy: shaded area = whole minus parts</h4>
            <p>For a complement region, subtract the unshaded parts from the enclosing region. For a union, add disjoint pieces or subtract any overlap once. State which regions you are counting before choosing an operation.</p>
          </div>
          <div class="callout callout-tip">
            <h4>Strategy: hunt for hidden right triangles</h4>
            <p>Diagonals of rectangles, radii to tangent points, heights dropped in isosceles triangles: the GRE hides a right triangle in most figures, and the Pythagorean triples finish the job.</p>
          </div>
        `,
        examples: [
          {
            title: 'Shaded region: whole minus parts',
            problem: String.raw`A circle of radius $4$ is inscribed in a square (the circle touches all four sides). What is the area inside the square but outside the circle?`,
            steps: [
              { title: 'Identify the complement region', content: String.raw`The desired region lies in the square and outside the circle. Its area is square area minus circle area.`, why: 'The square consists of the disk and the surrounding region, with no overlapping interiors.' },
              { title: 'Get the square from the circle', content: String.raw`An inscribed circle touching all sides has diameter equal to the side: side $= 2r = 8$, so the square's area is $64$.` },
              { title: 'Subtract', content: String.raw`Circle area $= \pi r^2 = 16\pi$. Answer: $64 - 16\pi$ (about $13.7$). GRE choices keep the $\pi$: leave answers exact unless asked to approximate.` }
            ]
          },
          {
            title: 'A 30-60-90 triangle hiding in an equilateral one',
            problem: String.raw`What is the area of an equilateral triangle with side $6$?`,
            steps: [
              { title: 'Drop the height to expose right triangles', content: String.raw`The altitude of an equilateral triangle bisects the opposite side and the vertex angle. Each half is a $30$-$60$-$90$ triangle with hypotenuse $6$ and short leg $3$.`, why: 'Symmetry supplies the bisections here. A general triangle altitude need not bisect a side or angle.' },
              { title: 'Read the height from the ratio', content: String.raw`In a $30$-$60$-$90$ triangle the sides are $1 : \sqrt{3} : 2$. With short leg $3$, the long leg (the height) is $3\sqrt{3}$.` },
              { title: 'Apply the area formula', content: String.raw`Area $= \frac{1}{2} \cdot 6 \cdot 3\sqrt{3} = 9\sqrt{3}$. The general result $\frac{s^2\sqrt{3}}{4}$ is worth recognizing, and now you have derived it rather than memorized it.` }
            ]
          }
        ],
        quantComparison: [
          {
            difficulty: 'medium',
            setup: String.raw`Two sides of a triangle have lengths $5$ and $9$.`,
            quantityA: String.raw`The length of the third side`,
            quantityB: String.raw`$14$`,
            correctIndex: 1,
            hint: String.raw`<p>Third-side rule, strict inequality.</p>`,
            explanation: String.raw`The third side satisfies $4 \lt s \lt 14$: always strictly less than $14$. (B). The value of $s$ varies, but every allowed value stays below $14$, so the comparison is still determined: (D) is not automatic just because a quantity varies.`,
            wrongExplanations: {
              0: String.raw`The triangle inequality caps the third side strictly below $5 + 9 = 14$.`,
              2: String.raw`At exactly $14$ the "triangle" degenerates into a straight segment.`,
              3: String.raw`Tempting, since the third side varies. But every legal value is below $14$, so B wins in all cases: a single relationship holds.`
            }
          },
          {
            difficulty: 'easy',
            quantityA: String.raw`The area of a circle with radius $3$`,
            quantityB: String.raw`The area of a square with side $5$`,
            correctIndex: 0,
            hint: String.raw`<p>Use $\pi \approx 3.14$.</p>`,
            explanation: String.raw`Circle area is $9\pi$; square area is $25$. The bound $\pi\gt3$ already gives $9\pi\gt27\gt25$, so (A). Choose enough precision to separate the quantities; a close comparison may need a tighter bound.`,
            wrongExplanations: {
              1: String.raw`$9\pi \approx 28.3 \gt 25$: the $\pi$ factor nearly triples the $9$.`,
              2: String.raw`$9\pi$ is irrational; it cannot equal $25$.`,
              3: String.raw`Both areas are fixed numbers.`
            }
          },
          {
            difficulty: 'hard',
            setup: String.raw`A circle and a square have equal perimeters.`,
            quantityA: String.raw`The area of the circle`,
            quantityB: String.raw`The area of the square`,
            correctIndex: 0,
            hint: String.raw`<p>Pick a convenient perimeter, like $20$, and compute both areas.</p>`,
            explanation: String.raw`Let the common positive perimeter be $P$. The square has area $(P/4)^2=P^2/16$. The circle has radius $P/(2\pi)$ and area $P^2/(4\pi)$. Their area ratio is $4/\pi\gt1$, so (A) for every $P\gt0$. A convenient value such as $P=20$ illustrates the comparison; the ratio establishes that it is independent of size.`,
            wrongExplanations: {
              1: String.raw`Compute with perimeter $20$: circle $\approx 31.8$ versus square $25$.`,
              2: String.raw`Equal perimeter does not imply equal area. Here the exact area ratio is $4/\pi\gt1$.`,
              3: String.raw`The ratio of the areas is the same for every shared perimeter, so one relationship holds throughout.`
            }
          }
        ],
        exercises: [
          {
            difficulty: 'easy',
            question: String.raw`A right triangle has legs $6$ and $8$. What is the length of the hypotenuse?`,
            options: ['9', '10', '12', '14', String.raw`$\sqrt{28}$`],
            correctIndex: 1,
            hint: String.raw`<p>Scale the $3$-$4$-$5$ triple.</p>`,
            correctExplanation: String.raw`$6$-$8$-$10$ is the $3$-$4$-$5$ triple doubled. Check: $36 + 64 = 100 = 10^2$. Recognizing triples is faster than computing roots.`,
            wrongExplanations: {
              0: String.raw`$9$ would need $36 + 64 = 81$; it is $100$.`,
              2: String.raw`$12$ overshoots: $144 \ne 100$.`,
              3: String.raw`$14 = 6 + 8$ adds the legs; the hypotenuse is always shorter than that.`,
              4: String.raw`$\sqrt{28}$ comes from subtracting instead of adding the squares.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`What is the measure of each interior angle of a regular hexagon?`,
            options: [String.raw`$100^\circ$`, String.raw`$108^\circ$`, String.raw`$120^\circ$`, String.raw`$135^\circ$`, String.raw`$144^\circ$`],
            correctIndex: 2,
            hint: String.raw`<p>Total interior $= (n-2) \cdot 180^\circ$; divide by $n$.</p>`,
            correctExplanation: String.raw`$(6-2) \cdot 180^\circ = 720^\circ$ shared equally: $720/6 = 120^\circ$.`,
            wrongExplanations: {
              0: String.raw`No regular polygon has $100^\circ$ interior angles ($n$ would not be an integer).`,
              1: String.raw`$108^\circ$ belongs to the regular pentagon.`,
              3: String.raw`$135^\circ$ belongs to the regular octagon.`,
              4: String.raw`$144^\circ$ belongs to the regular decagon.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`A sector of a circle with radius $6$ has a central angle of $60^\circ$. What is the area of the sector?`,
            options: [String.raw`$3\pi$`, String.raw`$6\pi$`, String.raw`$9\pi$`, String.raw`$12\pi$`, String.raw`$36\pi$`],
            correctIndex: 1,
            hint: String.raw`<p>The sector is $\frac{60}{360} = \frac{1}{6}$ of the circle.</p>`,
            correctExplanation: String.raw`Whole circle: $\pi \cdot 6^2 = 36\pi$. The sector is $\frac{60^\circ}{360^\circ} = \frac{1}{6}$ of it: $6\pi$. Arcs and sectors are always "fraction of the whole."`,
            wrongExplanations: {
              0: String.raw`$3\pi$ is $\frac{1}{12}$ of the circle: a $30^\circ$ sector.`,
              2: String.raw`$9\pi$ is $\frac{1}{4}$ of the circle: a $90^\circ$ sector.`,
              3: String.raw`$12\pi$ is $\frac{1}{3}$: a $120^\circ$ sector.`,
              4: String.raw`$36\pi$ is the entire circle.`
            }
          }
        ],
        multiSelect: [
          {
            difficulty: 'medium',
            question: String.raw`Two sides of a triangle have lengths $7$ and $10$. Which of the following could be the length of the third side? Select all that apply.`,
            options: ['3', '4', '10', '16', '17'],
            correctIndices: [1, 2, 3],
            hint: String.raw`<p>The rule is strict: $|10 - 7| \lt s \lt 10 + 7$.</p>`,
            explanation: String.raw`The third side must satisfy $3 \lt s \lt 17$ strictly. $3$: excluded (degenerate). $4$: allowed. $10$: allowed (isosceles is fine). $16$: allowed. $17$: excluded (degenerate). Endpoints always fail; that is the whole point of the strictness.`
          }
        ],
        freeResponse: [
          {
            difficulty: 'medium',
            question: String.raw`A cylinder has radius $2$ and height $5$. Its volume is $k\pi$. What is $k$?`,
            accept: [20],
            placeholder: 'Enter k',
            hint: String.raw`<p>$V = \pi r^2 h$.</p>`,
            explanation: String.raw`$V = \pi \cdot 2^2 \cdot 5 = 20\pi$, so $k = 20$. GRE answers involving circles usually stay "in terms of $\pi$": do not convert to decimals.`
          },
          {
            difficulty: 'medium',
            question: String.raw`A cube has volume $64$. What is its total surface area?`,
            accept: [96],
            placeholder: 'Enter the surface area',
            hint: String.raw`<p>Find the edge first from $s^3 = 64$.</p>`,
            explanation: String.raw`$s = \sqrt[3]{64} = 4$. Surface: $6s^2 = 6 \cdot 16 = 96$. Cube problems pivot on the edge; volume and surface area are both one step from it.`
          }
        ],
        strategySelect: [
          {
            difficulty: 'medium',
            scenario: String.raw`A circle of radius $5$ has a square inscribed in it (all four corners on the circle). What is the area of the square?`,
            options: ['Draw a diagonal: it is the diameter, then use the 45-45-90 ratio', 'Use the third-side rule on a triangle', 'Compute the sector area for a $90^\circ$ angle', 'Subtract the circle from the square'],
            correctIndex: 0,
            explanation: String.raw`The square's diagonal is the circle's diameter, $10$. A diagonal splits the square into two $45$-$45$-$90$ triangles, so the side is $\frac{10}{\sqrt 2}$ and the area is $\left(\frac{10}{\sqrt2}\right)^2 = 50$. The hidden right triangle does all the work.`,
            wrongExplanations: {
              1: String.raw`The third-side rule bounds a triangle's sides; it does not give the square's area.`,
              2: String.raw`Sector area is for a slice of the circle, not the inscribed square.`,
              3: String.raw`Subtracting shapes is the shaded-region move; here you want the square's area directly, via its diagonal.`
            }
          },
          {
            difficulty: 'hard',
            scenario: String.raw`A shaded region is what remains when a circle of radius $3$ is removed from a square of side $6$ that surrounds it. What is the shaded area?`,
            options: ['Whole minus parts: square area minus circle area', 'The Pythagorean theorem on the diagonal', 'A 30-60-90 ratio', 'The interior-angle-sum formula'],
            correctIndex: 0,
            explanation: String.raw`The circle lies entirely inside the square, and the shaded region is its complement within the square. Subtract: $6^2-\pi\cdot3^2=36-9\pi$. A different shading, such as a union of overlapping shapes, would require different bookkeeping.`,
            wrongExplanations: {
              1: String.raw`No right triangle or diagonal length is being asked for here.`,
              2: String.raw`There is no $30$-$60$-$90$ triangle in this figure.`,
              3: String.raw`The interior-angle-sum formula is for polygon angles, not areas.`
            }
          }
        ],
        flashCards: [
          { type: 'define', front: 'The third-side rule for triangles?', back: 'Strictly between the difference and the sum of the other two sides: |a-b| < c < a+b. The endpoints give degenerate flat "triangles."' },
          { type: 'concept', front: 'The Pythagorean triples and special ratios to memorize?', back: 'Triples: 3-4-5, 5-12-13, 8-15-17 (and multiples). 45-45-90: 1:1:sqrt(2). 30-60-90: 1:sqrt(3):2, short side faces 30.' },
          { type: 'how', front: 'How do you organize a shaded-area calculation?', back: 'Identify the regions. For a complement, subtract unshaded parts from the whole. Otherwise add disjoint pieces or correct for overlap. Use stated measurements.' }
        ]
      },

      /* ======================================================
         TOPIC 9: COORDINATE PLANE AND DATA INTERPRETATION
         ====================================================== */
      {
        id: 'gre-coordinate-data',
        title: 'Coordinate Plane and Data Interpretation',
        description: 'Slope, distance, and intercepts on the grid; then the chart-reading discipline that Data Interpretation sets reward.',
        foundationRefs: [
          { moduleId: 'geometry', topicId: 'coordinate-geometry', note: 'Distance, midpoint, and the line equation, derived carefully.' },
          { moduleId: 'beginning-algebra', topicId: 'linear-functions-slope', note: 'Slope as a rate of change and the y = mx + b form used throughout.' },
          { moduleId: 'probability-statistics', topicId: 'descriptive-statistics', note: 'Means and percents, which Data Interpretation questions ask about charts.' }
        ],
        visualizations: [
          {
            render: (containerId) => {
              Viz.barChart(containerId, [
                { label: 'Jan', value: 40 },
                { label: 'Feb', value: 55 },
                { label: 'Mar', value: 30 },
                { label: 'Apr', value: 60 },
                { label: 'May', value: 65 }
              ], { title: 'Monthly sales', yLabel: 'Sales (thousands of dollars)', width: 620, height: 320 });
            }
          }
        ],
        hook: String.raw`
          <div class="callout callout-puzzle">
            <h4>Puzzle: The Distance With No Ruler</h4>
            <p>How far is the point $(3, 4)$ from the origin? There is no ruler, but there is a right triangle hiding in the grid: legs $3$ across and $4$ up. The hypotenuse is $5$: the $3$-$4$-$5$ triple again.</p>
            <p>Every coordinate distance is a hidden right triangle. That single idea, plus slope as steepness, is most of GRE coordinate geometry.</p>
          </div>
        `,
        concept: String.raw`
          <p><strong>The Foundation: coordinates.</strong></p>
          <div class="callout callout-key">
            <h4>Slope and lines</h4>
            <p>For $x_2\ne x_1$, slope is $m=(y_2-y_1)/(x_2-x_1)$. A nonvertical line has form $y=mx+b$, with $b$ its $y$-intercept. Distinct nonvertical parallel lines have equal slopes. Perpendicular nonvertical lines have slopes whose product is $-1$. A vertical line $x=c$ has undefined slope and is perpendicular to a horizontal line. Find an $x$-intercept by setting $y=0$; an intercept need not exist.</p>
          </div>
          <div class="callout callout-key">
            <h4>Distance and midpoint</h4>
            <p>Distance $= \sqrt{(\Delta x)^2 + (\Delta y)^2}$: the Pythagorean theorem on the grid. Midpoint: average the coordinates, $\left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$.</p>
          </div>
          <p><strong>The Foundation: reading data displays.</strong></p>
          <div class="callout callout-key">
            <h4>The reading protocol</h4>
            <p>Before any question: read the title, both axis labels, and the units (thousands? percent?). Note whether values are absolute amounts or percentages of some total: a bigger percent of a smaller total can be a smaller amount. Answer only from displayed data, never from plausibility.</p>
          </div>
        `,
        abstraction: String.raw`
          <p><strong>Coordinates connect geometry and algebra.</strong> A point is an ordered pair; a line satisfies a linear equation; the intersection of two lines solves their equations simultaneously. For nonvertical perpendicular lines, slopes multiply to $-1$; horizontal and vertical lines form a separate perpendicular case. Distance follows from the Pythagorean theorem on the coordinate differences. Choose the representation that exposes the relevant constraint.</p>
          <p><strong>Slope is a rate of change, and lines are constant rates.</strong> The slope $m$ in $y = mx + b$ says: every unit step in $x$ changes $y$ by $m$, always. That is why linear models describe taxi fares and phone plans (constant per-unit cost plus a flat fee $b$), and why the slope formula is just "change over change." Read this way, coordinate geometry and the word-problems topic are the same subject: $y = mx + b$ <em>is</em> amount $=$ rate $\times$ time $+$ starting amount.</p>
          <p><strong>A display connects measurements to quantities.</strong> The bar chart maps each month to a sales value. Read the axes, scale, units, and any notes, then choose the operation the question asks for. Errors can arise at either stage: reading the wrong bar or computing the wrong ratio. A truncated axis can exaggerate visual differences without changing the labeled values.</p>
        `,
        stuckGuide: String.raw`
          <div class="callout callout-tip">
            <h4>Strategy: estimate from the chart before computing</h4>
            <p>Use the displayed scale to estimate, then check the choice spacing. An estimate is sufficient only when its possible error cannot change the answer. Use printed values for exact questions and refine the calculation for close choices.</p>
          </div>
          <div class="callout callout-tip">
            <h4>Strategy: percent change questions come from two bars</h4>
            <p>$\frac{\text{new} - \text{old}}{\text{old}}$: the earlier bar is the denominator. Chart questions reuse the percent machinery from the fractions topic unchanged.</p>
          </div>
          <div class="callout callout-warning">
            <h4>Trap: extrapolation</h4>
            <p>Observed values do not establish future values. Interpolation between observations also needs a stated rule or an explicitly requested estimate. A line joining two plotted points does not by itself prove a constant rate over the interval.</p>
          </div>
        `,
        examples: [
          {
            title: 'Choosing the right side of the dictionary',
            problem: String.raw`Line $\ell$ passes through $(2, 3)$ and is perpendicular to the line $y = -\dfrac{1}{2}x + 4$. Where does $\ell$ cross the $y$-axis?`,
            steps: [
              { title: 'Translate "perpendicular" to algebra', content: String.raw`The given slope is $-\frac{1}{2}$; the perpendicular slope is its negative reciprocal, $2$.`, why: 'Perpendicularity is a geometric word with an exact algebraic translation: slopes multiply to -1.' },
              { title: 'Pin the line with the known point', content: String.raw`$\ell$: $y = 2x + b$. Substitute $(2, 3)$: $3 = 4 + b$, so $b = -1$.` },
              { title: 'Answer in the geometry language', content: String.raw`$b$ is the $y$-intercept, so $\ell$ crosses the $y$-axis at $(0, -1)$. The whole solution was two translations and one substitution.` }
            ]
          },
          {
            title: 'A two-step Data Interpretation chain',
            problem: String.raw`March sales were what percent of total sales for the five months? ${GRE_SALES_TABLE}`,
            steps: [
              { title: 'Decode before computing', content: String.raw`Units are thousands, but a percent of a total ignores units. Read the needed bars: March $= 30$; all five: $40, 55, 30, 60, 65$.`, why: 'Deciding what to read, and what to ignore (the units), is the actual DI skill.' },
              { title: 'Compute the total once', content: String.raw`$40 + 55 + 30 + 60 + 65 = 250$. This total also served the average question earlier: DI sets reuse intermediate results, so keep them.` },
              { title: 'Form the percent', content: String.raw`$\frac{30}{250} = \frac{12}{100} = 12\%$. Estimation check: March is the shortest of five bars, so its share must sit below one fifth ($20\%$): consistent.` }
            ]
          }
        ],
        quantComparison: [
          {
            difficulty: 'easy',
            setup: String.raw`Line $\ell$ passes through the points $(0, 2)$ and $(4, 10)$.`,
            quantityA: String.raw`The slope of line $\ell$`,
            quantityB: String.raw`$3$`,
            correctIndex: 1,
            hint: String.raw`<p>Rise over run between the two points.</p>`,
            explanation: String.raw`$m = \frac{10 - 2}{4 - 0} = \frac{8}{4} = 2 \lt 3$. (B).`,
            wrongExplanations: {
              0: String.raw`The rise is $8$ over a run of $4$: slope $2$.`,
              2: String.raw`$2 \ne 3$.`,
              3: String.raw`Two points determine one line and one slope.`
            }
          },
          {
            difficulty: 'medium',
            quantityA: String.raw`The distance from $(0,0)$ to $(3, 4)$`,
            quantityB: String.raw`The distance from $(0,0)$ to $(5, 0)$`,
            correctIndex: 2,
            hint: String.raw`<p>One is a hidden $3$-$4$-$5$ triangle; the other lies flat on the axis.</p>`,
            explanation: String.raw`$\sqrt{3^2 + 4^2} = 5$ and the second distance is just $5$ along the $x$-axis. Equal: (C). Both points sit on the circle of radius $5$ centered at the origin.`,
            wrongExplanations: {
              0: String.raw`$\sqrt{9 + 16} = \sqrt{25} = 5$, no more.`,
              1: String.raw`The diagonal route is exactly $5$, not less: distances are not judged by appearance.`,
              3: String.raw`Fixed points, fixed distances.`
            }
          }
        ],
        exercises: [
          {
            difficulty: 'easy',
            question: String.raw`Which is the slope of a line perpendicular to $y = 2x + 1$?`,
            options: ['-2', String.raw`$-\dfrac{1}{2}$`, String.raw`$\dfrac{1}{2}$`, '2', '1'],
            correctIndex: 1,
            hint: String.raw`<p>Perpendicular slopes multiply to $-1$.</p>`,
            correctExplanation: String.raw`Need $m$ with $2m = -1$: $m = -\frac{1}{2}$: the negative reciprocal. Flip and negate.`,
            wrongExplanations: {
              0: String.raw`$-2$ negates without flipping: $2 \times (-2) = -4 \ne -1$.`,
              2: String.raw`$\frac{1}{2}$ flips without negating: the product is $+1$.`,
              3: String.raw`$2$ is parallel, not perpendicular.`,
              4: String.raw`$1$ satisfies neither the parallel nor the perpendicular condition.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`From January to February, sales increased by what percent? ${GRE_SALES_TABLE}`,
            options: [String.raw`$15\%$`, String.raw`$27\%$`, String.raw`$37.5\%$`, String.raw`$55\%$`, String.raw`$72.5\%$`],
            correctIndex: 2,
            hint: String.raw`<p>Change over the January value.</p>`,
            correctExplanation: String.raw`$\frac{55 - 40}{40} = \frac{15}{40} = 37.5\%$. The old month is the base. The units (thousands) cancel in the ratio, so you can ignore them here.`,
            wrongExplanations: {
              0: String.raw`$15$ is the raw change in thousands, not a percent of the base.`,
              1: String.raw`$27\%$ uses February as the base ($15/55$): percent change divides by the starting value.`,
              3: String.raw`$55$ is February's value, not a change.`,
              4: String.raw`$72.5$ mixes the values; recompute $\frac{15}{40}$.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`What were the average monthly sales over the five months, in thousands of dollars? ${GRE_SALES_TABLE}`,
            options: ['45', '48', '50', '52', '55'],
            correctIndex: 2,
            hint: String.raw`<p>Add the five bars, divide by $5$.</p>`,
            correctExplanation: String.raw`$\frac{40 + 55 + 30 + 60 + 65}{5} = \frac{250}{5} = 50$. Sanity check against the picture: $50$ sits between the shortest ($30$) and tallest ($65$) bars, nearer the middle of the pack.`,
            wrongExplanations: {
              0: String.raw`$45$ undercounts: the total is $250$, not $225$.`,
              1: String.raw`$48$ misses one bar's value; re-add the five.`,
              3: String.raw`$52$ over-adds; the exact total is $250$.`,
              4: String.raw`$55$ is February's bar, not the average.`
            }
          }
        ],
        multiSelect: [
          {
            difficulty: 'medium',
            question: String.raw`In which months were sales above the five-month average? Select all that apply. ${GRE_SALES_TABLE}`,
            options: ['January', 'February', 'March', 'April', 'May'],
            correctIndices: [1, 3, 4],
            hint: String.raw`<p>The average is $50$ (previous problem). Compare each bar to it.</p>`,
            explanation: String.raw`Average $= 50$. Above it: February ($55$), April ($60$), May ($65$). Below: January ($40$), March ($30$). DI sets chain answers: computing the average once feeds several questions.`
          }
        ],
        freeResponse: [
          {
            difficulty: 'easy',
            question: String.raw`What is the $x$-coordinate of the midpoint of the segment from $(2, -3)$ to $(8, 7)$?`,
            accept: [5],
            placeholder: 'Enter a number',
            hint: String.raw`<p>Average the $x$-coordinates.</p>`,
            explanation: String.raw`$\frac{2 + 8}{2} = 5$. (The full midpoint is $(5, 2)$.) Midpoints are averages, coordinate by coordinate.`
          },
          {
            difficulty: 'medium',
            question: String.raw`A line with slope $3$ passes through $(1, 5)$. What is its $y$-intercept?`,
            accept: [2],
            placeholder: 'Enter b',
            hint: String.raw`<p>Substitute the point into $y = 3x + b$.</p>`,
            explanation: String.raw`$5 = 3(1) + b \Rightarrow b = 2$. One point plus a slope pins down the whole line.`
          }
        ],
        flashCards: [
          { type: 'how', front: 'Distance between two points on the grid?', back: 'sqrt((dx)^2 + (dy)^2): draw the hidden right triangle and use Pythagoras. Look for 3-4-5 and 5-12-13 shortcuts.' },
          { type: 'define', front: 'Slopes of parallel and perpendicular lines?', back: 'For nonvertical lines, parallel lines share slopes and perpendicular slopes multiply to -1, such as 2 and -1/2. Vertical lines have undefined slope and are perpendicular to horizontal lines.' },
          { type: 'how', front: 'First three things to read on any DI chart?', back: 'Title, axis labels, units. Then check whether values are absolute or percentages before touching the questions.' }
        ]
      },
      /* ======================================================
         TOPIC 10: APPLY THE MODEL TO A NEW CONTEXT
         Original mixed practice. These are not ETS questions.
         ====================================================== */
      {
        id: 'gre-models-transfer',
        title: 'Mixed Quant: Choose and Check the Model',
        description: 'Apply proportions, equations, similarity, and conditional probability to unfamiliar settings. Practice all four answer formats and explain each method\'s conditions.',
        intuitionLab: false,
        foundationRefs: [
          { moduleId: 'beginning-algebra', topicId: 'variables-expressions', note: 'Define a quantity, specify its units, and translate the relationship into an expression.' },
          { moduleId: 'intermediate-algebra', topicId: 'quadratic-equations', note: 'Factor a quadratic and retain all roots allowed by the original problem.' },
          { moduleId: 'geometry', topicId: 'triangles', note: 'Similar figures scale corresponding lengths equally; areas scale by the square of that factor.' },
          { moduleId: 'probability-statistics', topicId: 'conditional-probability-bayes', note: 'Conditioning restricts the reference group and can change the denominator.' }
        ],
        hook: String.raw`
          <div class="callout callout-puzzle">
            <h4>The same number can answer different questions</h4>
            <p>A completion rate rises from $40\%$ to $50\%$. The increase is $10$ percentage points, but the relative increase is $10/40=25\%$. Both calculations are correct; they answer different questions.</p>
            <p>Before computing, state the requested quantity and its reference group. This habit transfers to prices, survey results, mixtures, speeds, and probabilities.</p>
          </div>
        `,
        concept: String.raw`
          <div class="callout callout-key">
            <h4>Specify, model, solve, check</h4>
            <ol>
              <li><strong>Specify:</strong> name the unknown, its units, and its allowed values. Distinguish "must," "could," and "cannot."</li>
              <li><strong>Model:</strong> write the stated relationships. Record assumptions such as constant speed, additive volume, equally likely selection, or independent trials.</li>
              <li><strong>Solve:</strong> use a method matched to the structure, such as totals for averages, net rates for filling, or a restricted denominator for conditioning.</li>
              <li><strong>Check:</strong> substitute into the original constraints. Test signs, units, boundaries, and the requested entry format.</li>
            </ol>
          </div>
          <p>A model explains what information is sufficient. A total distance and time determine average speed but leave the speeds at individual moments unknown. A boxplot determines quartiles but usually leaves the mean unknown. Two lengths of a triangle bound the third side but do not fix its area.</p>
          <p>Use these distinctions outside test preparation too. A budget needs dollar amounts and a defined baseline; a staffing estimate needs work rates and assumptions about simultaneous work; a survey percentage needs the relevant denominator. If an assumption changes, revise the model before reusing the formula.</p>
        `,
        abstraction: String.raw`
          <p><strong>Identify what stays fixed.</strong> In a mixture, track the amount of the component. In a weighted average, track the total and count. In similar figures, track the common length scale. These conserved quantities or constraints explain the formulas and help you adapt them.</p>
          <p><strong>Distinguish a pattern from a constraint.</strong> Three observed sequence terms can fit many rules. A question that specifies "each term doubles" supplies the rule; an unexplained visual trend does not. A few tested values can disprove a formula, but establishing a relationship over an interval needs a bound or an argument that covers that interval.</p>
        `,
        stuckGuide: String.raw`
          <div class="callout callout-tip">
            <h4>Return to the denominator</h4>
            <p>For percentages, name the baseline. For probability, name the sample space. For averages, name the count. Many plausible answers result from using a correct numerator over the wrong denominator.</p>
          </div>
          <div class="callout callout-warning">
            <h4>Check the scope of a shortcut</h4>
            <p>The midpoint of two distinct group means gives their combined mean only when the group sizes match; equal group means need no weighting adjustment. Squaring preserves order on nonnegative numbers, not across all real numbers. Dividing by a variable requires a nonzero value and, for an inequality, a known sign.</p>
          </div>
        `,
        examples: [
          {
            title: 'A percentage change needs a named baseline',
            problem: String.raw`A training program's completion rate rises from $40\%$ to $50\%$. Find the increase in percentage points and the relative percent increase.`,
            steps: [
              { title: 'Compute the absolute change in the rate', content: String.raw`$50\%-40\%=10$ percentage points. This subtracts two rates.` },
              { title: 'Compare the change with the old rate', content: String.raw`The relative increase is $(50-40)/40=1/4=25\%$.`, why: 'The starting rate, 40%, is the denominator for relative change.' },
              { title: 'State what this does not determine', content: String.raw`The rates alone do not tell you how many more people completed the program. That requires the enrollment counts for both periods.`, why: 'A proportion and a count answer different questions.' }
            ]
          },
          {
            title: 'Mixtures conserve the amount of a component',
            problem: String.raw`Mix $8$ liters of a $15\%$ solution with $x$ liters of a $45\%$ solution to obtain a $30\%$ solution. Assume the percentages describe component volume and the solution volumes add. Find $x$.`,
            steps: [
              { title: 'Track the component, not the percentages alone', content: String.raw`The component volumes are $0.15(8)$ and $0.45x$ liters. The mixture has volume $8+x$ liters.` },
              { title: 'Set component amount equal in both descriptions', content: String.raw`$1.2+0.45x=0.30(8+x)$. Thus $0.15x=1.2$ and $x=8$.`, why: 'The final percentage is a volume-weighted average, not an unweighted sum.' },
              { title: 'Check the model', content: String.raw`Equal volumes of $15\%$ and $45\%$ solutions produce their midpoint, $30\%$. In a different context, distinguish percentage by mass from percentage by volume before combining quantities.` }
            ]
          },
          {
            title: 'A drain subtracts from a fill rate',
            problem: String.raw`A pipe fills a tank in $6$ hours, while a drain empties a full tank in $10$ hours. At constant rates, with both open, how long does it take to fill an initially empty tank?`,
            steps: [
              { title: 'Define signed rates', content: String.raw`The pipe adds $1/6$ tank per hour; the drain removes $1/10$ tank per hour.` },
              { title: 'Compute the net rate', content: String.raw`$1/6-1/10=(5-3)/30=1/15$ tank per hour. Filling one tank therefore takes $15$ hours.` },
              { title: 'State the assumption and boundary', content: String.raw`The model assumes those rates remain constant throughout filling. If the drain rate equaled or exceeded the fill rate, this model would not fill the tank. A level-dependent drain needs a different model.` }
            ]
          },
          {
            title: 'Length, area, and volume use different scale powers',
            problem: String.raw`A model building and the real building are similar. Every real length is $5$ times its corresponding model length. A model floor has area $12$ square units, and a model room has volume $8$ cubic units. Find the corresponding real area and volume.`,
            steps: [
              { title: 'Count the dimensions', content: String.raw`Each area combines two lengths, so the area factor is $5^2=25$. Each volume combines three lengths, so the volume factor is $5^3=125$.` },
              { title: 'Apply the matching factor', content: String.raw`The floor area is $12(25)=300$ square units. The room volume is $8(125)=1000$ cubic units.` },
              { title: 'Check whether the figures are similar', content: String.raw`These powers apply because every corresponding length uses the same factor. Doubling a cylinder's radius while tripling its height is not uniform scaling; its volume factor is $2^2\cdot3=12$.` }
            ]
          },
          {
            title: 'Given a group, restrict the sample space',
            problem: String.raw`Among $24$ club members, $15$ subscribe to a newsletter, $10$ attend workshops, and $6$ do both. One member is selected uniformly at random from the newsletter subscribers. Find the probability that the selected member attends workshops.`,
            steps: [
              { title: 'Name the condition', content: String.raw`Selection is restricted to the $15$ subscribers, not all $24$ members.` },
              { title: 'Count the relevant intersection', content: String.raw`Of those $15$, $6$ attend workshops. The probability is $6/15=2/5$.`, why: 'Conditioning changes the denominator to the eligible group.' },
              { title: 'Compare related questions', content: String.raw`Selecting from all members gives $P(\text{both})=6/24=1/4$. Selecting from workshop attendees gives $P(\text{subscriber}\mid\text{workshop})=6/10=3/5$. Reversing the condition changes the question.` }
            ]
          },
          {
            title: 'Quadratic inequalities require intervals',
            problem: String.raw`Find all real $x$ satisfying $x(x-6)\lt0$. Then identify the positive integer solutions.`,
            steps: [
              { title: 'Locate the zeros', content: String.raw`The factors vanish at $0$ and $6$. They divide the number line into $x\lt0$, $0\lt x\lt6$, and $x\gt6$.` },
              { title: 'Track the signs on each interval', content: String.raw`Left of zero, both factors are negative, so the product is positive. Between zero and six, the signs differ, so the product is negative. Above six, both are positive.` },
              { title: 'Apply the strict boundary and domain', content: String.raw`The real solution is $0\lt x\lt6$. The positive integer solutions are $1,2,3,4,5$. The endpoints give zero and are excluded.`, why: 'Dividing by x without checking its sign would miss the interval structure.' }
            ]
          }
        ],
        quantComparison: [
          {
            difficulty: 'hard',
            setup: String.raw`$x,y\gt0$ and $x+y=10$.`,
            quantityA: String.raw`$xy$`,
            quantityB: String.raw`$25$`,
            correctIndex: 3,
            hint: String.raw`<p>Test $x=y=5$, then $x=1,y=9$. Both satisfy the sum constraint.</p>`,
            explanation: String.raw`At $(5,5)$ the quantities are equal. At $(1,9)$, $xy=9\lt25$. Two allowed relationships establish (D). In fact, $xy=25-(x-5)^2\le25$; knowing A cannot exceed B still leaves equality versus B greater undecided.`,
            wrongExplanations: {
              0: String.raw`$xy=25-(x-5)^2\le25$, so A cannot be greater.`,
              1: String.raw`Strictly B greater fails at $x=y=5$.`,
              2: String.raw`The sum does not force equal terms: $x=1,y=9$ gives product $9$.`
            }
          },
          {
            difficulty: 'medium',
            setup: String.raw`A rectangle has positive side lengths and perimeter $20$.`,
            quantityA: String.raw`The rectangle's area`,
            quantityB: String.raw`$25$`,
            correctIndex: 3,
            hint: String.raw`<p>A square is a rectangle. Compare a $5\times5$ rectangle with a $1\times9$ rectangle.</p>`,
            explanation: String.raw`Both dimensions sum to $10$. The $5\times5$ rectangle has area $25$; the $1\times9$ rectangle has area $9$. Equality and B greater both occur, so (D). A varying quantity need not cross the reference value to make the relation undetermined.`,
            wrongExplanations: {
              0: String.raw`Writing sides $x$ and $10-x$ gives area $25-(x-5)^2\le25$.`,
              1: String.raw`The permitted square has area $25$, so strict inequality does not hold in every case.`,
              2: String.raw`Perimeter fixes a sum, not a product: $1\times9$ has the same perimeter.`
            }
          },
          {
            difficulty: 'medium',
            setup: String.raw`Every value in a nonconstant data set is multiplied by $-3$.`,
            quantityA: String.raw`The new standard deviation`,
            quantityB: String.raw`Three times the old standard deviation`,
            correctIndex: 2,
            hint: String.raw`<p>Standard deviation scales by the absolute value of the multiplier.</p>`,
            explanation: String.raw`Each centered distance is multiplied by $|-3|=3$, so the new SD is three times the old SD. They are equal: (C). Reflection reverses the data order but cannot create a negative spread.`,
            wrongExplanations: {
              0: String.raw`The magnitude factor is exactly $3$, not larger.`,
              1: String.raw`A negative multiplier changes orientation, while spread uses its magnitude.`,
              3: String.raw`The uniform scale gives a fixed relationship without knowing the original values.`
            }
          },
          {
            difficulty: 'medium',
            setup: String.raw`In a normal model with mean $70$ and SD $8$, use the approximate $68\%$ within one SD rule.`,
            quantityA: String.raw`The proportion below $62$`,
            quantityB: String.raw`$0.50$`,
            correctIndex: 1,
            hint: String.raw`<p>$62$ is one SD below the mean. Split the $32\%$ outside the central band into two tails.</p>`,
            explanation: String.raw`The lower tail below $70-8=62$ is approximately $(1-0.68)/2=0.16$, below $0.50$. Symmetry places exactly half below the mean, which is above $62$; (B).`,
            wrongExplanations: {
              0: String.raw`The threshold is below the mean, so less than half lies below it.`,
              2: String.raw`Half lies below $70$, not below $62$.`,
              3: String.raw`The stated normal model fixes the comparison.`
            }
          }
        ],
        exercises: [
          {
            difficulty: 'medium',
            question: String.raw`Group A has $10$ members, of whom $80\%$ completed a course. Group B has $30$ members, of whom $50\%$ completed it. What percent of all $40$ members completed the course?`,
            options: [String.raw`$45\%$`, String.raw`$55\%$`, String.raw`$57.5\%$`, String.raw`$65\%$`, String.raw`$80\%$`],
            correctIndex: 2,
            hint: String.raw`<p>Convert each group percentage into a count before combining the groups.</p>`,
            correctExplanation: String.raw`A contributes $10(0.80)=8$ completions; B contributes $30(0.50)=15$. Combined: $23/40=57.5\%$. The larger group has more weight, so the result is closer to $50\%$ than $80\%$.`,
            wrongExplanations: {
              0: String.raw`A weighted average of $50\%$ and $80\%$ cannot be below both.`,
              1: String.raw`The total is $23$ completions, not $22$.`,
              3: String.raw`$65\%$ gives the groups equal weights even though their sizes differ.`,
              4: String.raw`$80\%$ is only Group A's rate; Group B contributes three quarters of the people.`
            }
          },
          {
            difficulty: 'easy',
            question: String.raw`A survey rate rises from $40\%$ to $50\%$. What is the relative percent increase?`,
            options: [String.raw`$10\%$`, String.raw`$20\%$`, String.raw`$25\%$`, String.raw`$40\%$`, String.raw`$50\%$`],
            correctIndex: 2,
            hint: String.raw`<p>Divide the increase by the old rate, not the new rate.</p>`,
            correctExplanation: String.raw`$(50-40)/40=10/40=25\%$. The absolute difference is $10$ percentage points.`,
            wrongExplanations: {
              0: String.raw`$10$ is the change in percentage points, not the relative percent increase.`,
              1: String.raw`$10/50$ uses the new rate as the baseline.`,
              3: String.raw`$40\%$ is the old rate.`,
              4: String.raw`$50\%$ is the new rate, not its change relative to the old rate.`
            }
          },
          {
            difficulty: 'easy',
            question: String.raw`A line passes through $(3,-2)$ and $(3,7)$. Which statement is correct?`,
            options: ['Its slope is 0', 'Its slope is 3', 'Its slope is 9', 'Its slope is undefined', 'Its y-intercept is 3'],
            correctIndex: 3,
            hint: String.raw`<p>Both points have the same $x$-coordinate.</p>`,
            correctExplanation: String.raw`The line is $x=3$, a vertical line. Its slope formula has denominator $3-3=0$, so the slope is undefined. It does not cross the $y$-axis.`,
            wrongExplanations: {
              0: String.raw`Zero slope describes a horizontal line, whose points have equal $y$-coordinates.`,
              1: String.raw`$3$ is the fixed $x$-coordinate, not the rise divided by the run.`,
              2: String.raw`$9$ is the rise, but the run is zero, so division is undefined.`,
              4: String.raw`An intersection with the $y$-axis would require $x=0$, inconsistent with $x=3$.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`A bag contains $3$ red and $2$ blue tokens. Two are selected uniformly without replacement. What is the probability that both are red?`,
            options: [String.raw`$\dfrac{1}{5}$`, String.raw`$\dfrac{3}{10}$`, String.raw`$\dfrac{9}{25}$`, String.raw`$\dfrac{2}{5}$`, String.raw`$\dfrac{3}{5}$`],
            correctIndex: 1,
            hint: String.raw`<p>After one red token is taken, there are two red tokens among four remaining tokens.</p>`,
            correctExplanation: String.raw`$P(\text{both red})=(3/5)(2/4)=3/10$. Equivalently, $\binom32/\binom52=3/10$. With replacement the answer would be $(3/5)^2=9/25$ instead.`,
            wrongExplanations: {
              0: String.raw`The favorable unordered pairs number $3$, and all pairs number $10$.`,
              2: String.raw`$9/25$ leaves the first red token in the bag; that would model replacement.`,
              3: String.raw`$2/5$ is the probability of a blue token on the first draw.`,
              4: String.raw`$3/5$ describes one red draw, not two.`
            }
          },
          {
            difficulty: 'medium',
            question: String.raw`A code uses three positions. Each position can contain one of four letters. Repeated letters are allowed, and order matters. How many codes are possible?`,
            options: ['4', '12', '24', '48', '64'],
            correctIndex: 4,
            hint: String.raw`<p>Each of the three slots retains four options.</p>`,
            correctExplanation: String.raw`$4\cdot4\cdot4=64$. Without repetition, the count would be $4\cdot3\cdot2=24$. If order did not distinguish selections and no repetition were allowed, choosing three letters would give $\binom43=4$.`,
            wrongExplanations: {
              0: String.raw`$4$ counts unordered selections of three different letters, which is a different model.`,
              1: String.raw`Adding slot counts counts individual choices instead of combinations across slots.`,
              2: String.raw`$24$ forbids repeated letters.`,
              3: String.raw`No slot loses an option here; use four options at each position.`
            }
          }
        ],
        multiSelect: [
          {
            difficulty: 'medium',
            question: String.raw`For which listed integers is $x^2\lt9$? Select all that apply.`,
            options: ['-3', '-2', '-1', '0', '2', '3'],
            correctIndices: [1, 2, 3, 4],
            hint: String.raw`<p>$x^2\lt9$ means $|x|\lt3$, including negative values.</p>`,
            explanation: String.raw`The interval is $-3\lt x\lt3$. Of the listed choices, $-2,-1,0,2$ lie inside. Both endpoints square to $9$ and fail the strict inequality.`
          },
          {
            difficulty: 'hard',
            question: String.raw`Among $24$ members, $15$ subscribe to a newsletter (N), $10$ attend workshops (W), and $6$ do both. A member is selected uniformly at random. Which statements are correct? Select all that apply.`,
            options: [String.raw`$P(N)=\dfrac58$`, String.raw`$P(W\mid N)=\dfrac25$`, String.raw`$P(N\mid W)=\dfrac35$`, String.raw`$P(N\cap W)=\dfrac14$`, String.raw`$P(N\cup W)=\dfrac{25}{24}$`],
            correctIndices: [0, 1, 2, 3],
            hint: String.raw`<p>Identify the eligible group in each denominator. Subtract the overlap for the union.</p>`,
            explanation: String.raw`$P(N)=15/24=5/8$; $P(W\mid N)=6/15=2/5$; $P(N\mid W)=6/10=3/5$; $P(N\cap W)=6/24=1/4$. The union has $15+10-6=19$ members, so $P(N\cup W)=19/24$, not $25/24$. The last choice also fails the probability bound of $1$.`
          },
          {
            difficulty: 'medium',
            question: String.raw`A boxplot gives $Q_1=26$, median $=35$, and $Q_3=44$. Which statements follow? Select all that apply.`,
            options: ['The interquartile range is 18', 'The middle half of the observations lies between 26 and 44', 'The mean is exactly 35', 'The total range is 18', 'The upper quartile boundary is 44'],
            correctIndices: [0, 1, 4],
            hint: String.raw`<p>The box gives quartiles and the median, not the mean or the extremes.</p>`,
            explanation: String.raw`The IQR is $44-26=18$. The box spans the middle half of the distribution under the usual quartile interpretation, and $44$ is the upper quartile boundary. These values do not determine the mean or the minimum and maximum. For small finite samples and ties, interpret quarter counts under the specified quartile convention.`
          }
        ],
        freeResponse: [
          {
            difficulty: 'medium',
            question: String.raw`Mix $8$ liters of a $15\%$ solution with a $45\%$ solution to make a $30\%$ solution. Assume the percentages describe component volume and volumes add. How many liters of the $45\%$ solution are needed?`,
            accept: [8],
            placeholder: 'Enter liters',
            hint: String.raw`<p>Set the component amount before mixing equal to $30\%$ of the final volume.</p>`,
            explanation: String.raw`$0.15(8)+0.45x=0.30(8+x)$. This gives $0.15x=1.2$, so $x=8$ liters.`
          },
          {
            difficulty: 'medium',
            question: String.raw`A cylinder's radius is doubled and its height is tripled. The new volume is $k$ times the old volume. What is $k$?`,
            accept: [12],
            placeholder: 'Enter the factor',
            hint: String.raw`<p>Use $V=\pi r^2h$. The radius contributes two powers.</p>`,
            explanation: String.raw`$\pi(2r)^2(3h)=12\pi r^2h$, so $k=12$. The figure is not uniformly scaled, so using a single scale factor cubed would be incorrect.`
          },
          {
            difficulty: 'medium',
            question: String.raw`What is the sum of all real solutions of $x^2-5x+6=0$?`,
            accept: [5],
            placeholder: 'Enter the sum',
            hint: String.raw`<p>Find two numbers whose product is $6$ and whose sum is $5$.</p>`,
            explanation: String.raw`$(x-2)(x-3)=0$, so $x=2$ or $x=3$. Both satisfy the original equation; their sum is $5$.`
          },
          {
            difficulty: 'medium',
            question: String.raw`A pipe fills a tank in $6$ hours and a drain empties it in $10$ hours. Both rates stay constant. With both open, how many hours does an initially empty tank take to fill?`,
            accept: [15],
            placeholder: 'Enter hours',
            hint: String.raw`<p>Subtract rates, then take the reciprocal of the positive net rate.</p>`,
            explanation: String.raw`Net rate is $1/6-1/10=1/15$ tank per hour. Time for one tank is $15$ hours. The answer exceeds the pipe-only time because the drain removes part of each hour's inflow.`
          },
          {
            difficulty: 'medium',
            question: String.raw`A process completes $5$ units in $12$ hours at a constant rate. What is its rate in units per hour, rounded to the nearest hundredth?`,
            accept: [0.42],
            placeholder: 'Enter a decimal',
            hint: String.raw`<p>Divide units by hours, and round only the final answer.</p>`,
            explanation: String.raw`The rate is $5/12=0.41666\ldots$ units per hour. Rounded to the nearest hundredth, enter $0.42$. This decimal is an approximation requested by the question; $5/12$ is the exact value.`
          }
        ],
        strategySelect: [
          {
            difficulty: 'hard',
            scenario: String.raw`Solve $x^2-4x\lt0$ over the real numbers. A proposed shortcut divides both sides by $x$. Which method preserves all sign cases?`,
            options: ['Divide by x and keep the inequality direction', 'Factor and analyze the signs on intervals separated by 0 and 4', 'Take square roots of each term separately', 'Test x = 2 and conclude every positive x works'],
            correctIndex: 1,
            explanation: String.raw`Factor $x(x-4)$. The product is negative exactly when the factors have opposite signs, giving $0\lt x\lt4$. Dividing by $x$ requires separate positive, negative, and zero cases; ignoring those cases changes the solution set.`,
            wrongExplanations: {
              0: String.raw`The sign of $x$ is unknown, and $x=0$ is not a permitted divisor.`,
              2: String.raw`A square root does not distribute over a difference of terms.`,
              3: String.raw`One passing case cannot establish the interval; $x=5$ is positive but fails.`
            }
          },
          {
            difficulty: 'medium',
            scenario: String.raw`Two choices both agree with a proposed formula when you substitute $a=2,b=3$. Which action resolves the ambiguity?`,
            options: ['Pick the first matching expression', 'Choose an independent allowed test case or compare the expressions algebraically', 'Assume both choices are correct in a single-answer question', 'Use a prohibited zero value to force a simpler result'],
            correctIndex: 1,
            explanation: String.raw`Matching one case establishes neither expression as universally correct. A second permitted case can eliminate one; algebra can establish an identity or expose the difference. Respect every constraint in either method.`,
            wrongExplanations: {
              0: String.raw`The order of choices supplies no mathematical evidence.`,
              2: String.raw`An accidental numerical match does not make both expressions valid answers.`,
              3: String.raw`An invalid case cannot test the formula on the stated domain.`
            }
          }
        ],
        flashCards: [
          { type: 'define', front: 'Percentage points versus relative percent change?', back: 'From 40% to 50%: +10 percentage points; relative increase (50-40)/40 = 25%. Name the baseline.' },
          { type: 'how', front: 'What denominator does a conditional probability use?', back: 'The group satisfying the condition. For P(A given B), restrict to B and count the A-and-B members within it.' },
          { type: 'concept', front: 'A uniform length factor k changes area and volume by what factors?', back: 'Area: k^2. Volume: k^3. These rules require similar figures with the same factor on every corresponding length.' },
          { type: 'how', front: 'What should you check after solving a word problem?', back: 'Substitute into the original constraints, check units and allowable values, and answer the quantity and entry form requested.' }
        ]
      }
    ]
  });
})();
