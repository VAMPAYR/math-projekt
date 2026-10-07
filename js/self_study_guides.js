/* ============================================================
   Self-sufficient study guides
   ============================================================ */
(function() {
  const makeGuide = (title, intro, core, method, example, errorCheck) => ({
    title,
    intro,
    cards: [
      { title: 'Core Task', content: core },
      { title: 'Method', content: method },
      { title: 'Worked Example', content: example },
      { title: 'Common Error Check', content: errorCheck }
    ]
  });

  window.MATH_SELF_STUDY_GUIDES = {
    'foundations:set-theory': {
      title: 'How to Reason With Sets',
      intro: 'Set notation becomes useful when each symbol is tied to membership, grouping, and counting.',
      cards: [
        {
          title: 'Core Task',
          content: String.raw`<p>A set is a collection of distinct objects. The statement $x \in A$ means $x$ is an element of $A$. The statement $x \notin A$ means $x$ is not an element of $A$.</p><p>The main task is to decide which elements belong after an operation. Union combines membership from either set. Intersection keeps only shared membership. Difference keeps elements from one set after removing another set.</p>`
        },
        {
          title: 'Method',
          content: String.raw`<ol><li>List the elements of each set clearly.</li><li>Apply the operation one membership question at a time.</li><li>Remove duplicates because a set records membership, not repetition.</li><li>Use a Venn diagram when overlap matters.</li></ol><p>For counting, use inclusion and exclusion: $|A \cup B| = |A| + |B| - |A \cap B|$. The subtraction prevents double-counting elements in both sets.</p>`
        },
        {
          title: 'Worked Example',
          content: String.raw`<p>Let $A = \{1,2,3,4\}$ and $B = \{3,4,5\}$.</p><p>The union is $A \cup B = \{1,2,3,4,5\}$ because it includes anything in either set. The intersection is $A \cap B = \{3,4\}$ because only 3 and 4 appear in both sets. The difference is $A - B = \{1,2\}$ because 3 and 4 are removed from $A$.</p>`
        },
        {
          title: 'Common Error Check',
          content: String.raw`<p>The expression $\{1,1,2\}$ is the same set as $\{1,2\}$. Repetition does not create a new element.</p><p>Another common error is treating union as addition without correcting overlap. If $|A| = 4$, $|B| = 3$, and $|A \cap B| = 2$, then $|A \cup B| = 4 + 3 - 2 = 5$, not 7.</p>`
        }
      ]
    },

    'foundations:number-systems': {
      title: 'How to Classify Numbers',
      intro: 'Number systems organize numbers by what operations and representations they support.',
      cards: [
        {
          title: 'Core Task',
          content: String.raw`<p>Each number system expands what can be described. Natural numbers count objects. Integers include opposites. Rational numbers include ratios of integers. Irrational numbers fill gaps that cannot be written as exact ratios. Real numbers include both rational and irrational numbers.</p><p>The classification task is to place a number in every system that contains it.</p>`
        },
        {
          title: 'Method',
          content: String.raw`<ol><li>Check whether the number is used for counting.</li><li>Check whether it is an integer.</li><li>Check whether it can be written as $\frac{a}{b}$ with integers $a$ and $b \neq 0$.</li><li>Use decimal behavior: terminating and repeating decimals are rational. Nonterminating, nonrepeating decimals are irrational.</li></ol>`
        },
        {
          title: 'Worked Example',
          content: String.raw`<p>Classify $-\frac{12}{4}$.</p><p>First simplify: $-\frac{12}{4} = -3$. The number is an integer because it has no fractional part. It is also rational because $-3 = \frac{-3}{1}$. It is real because all rational numbers are real. It is not natural because natural numbers do not include negative values.</p>`
        },
        {
          title: 'Common Error Check',
          content: String.raw`<p>Every integer is rational, but not every rational number is an integer. The number $\frac{5}{2}$ is rational because it is a ratio of integers, but it is not an integer.</p><p>The symbol $\sqrt{9}$ represents 3, so it is rational. The symbol $\sqrt{10}$ is irrational because 10 is not a perfect square.</p>`
        }
      ]
    },

    'foundations:basic-arithmetic': {
      title: 'How to Use Arithmetic Operations',
      intro: 'Arithmetic is the rule system that later algebra compresses into symbols.',
      cards: [
        {
          title: 'Core Task',
          content: String.raw`<p>Addition combines amounts. Subtraction compares or removes amounts. Multiplication repeats equal groups. Division splits into equal groups or asks how many equal groups fit.</p><p>Fractions and decimals describe parts of a whole. They follow the same operation rules, but the notation changes how the parts are represented.</p>`
        },
        {
          title: 'Method',
          content: String.raw`<ol><li>Translate the situation into an operation.</li><li>Keep place value aligned for decimals.</li><li>Use common denominators before adding or subtracting fractions.</li><li>Multiply fractions by multiplying numerators and denominators.</li><li>Divide by a fraction by multiplying by its reciprocal.</li></ol>`
        },
        {
          title: 'Worked Example',
          content: String.raw`<p>A recipe uses $\frac{3}{4}$ cup of flour per batch. Three batches need $3 \times \frac{3}{4} = \frac{9}{4} = 2\frac{1}{4}$ cups.</p><p>If only $\frac{1}{2}$ cup scoops are available, divide $\frac{9}{4}$ by $\frac{1}{2}$: $\frac{9}{4} \div \frac{1}{2} = \frac{9}{4} \times 2 = \frac{9}{2} = 4.5$. The recipe needs four and a half scoops.</p>`
        },
        {
          title: 'Common Error Check',
          content: String.raw`<p>Fractions cannot be added by adding across denominators. The expression $\frac{1}{2} + \frac{1}{3}$ is not $\frac{2}{5}$. Use a common denominator: $\frac{3}{6} + \frac{2}{6} = \frac{5}{6}$.</p><p>Division by zero is undefined. For a nonzero dividend, no number multiplied by 0 gives that dividend. For $0/0$, every number satisfies $0x=0$, so the equation cannot select a unique quotient.</p>`
        }
      ]
    },

    'foundations:propositional-logic': {
      title: 'How to Analyze Propositions',
      intro: 'Propositional logic studies statements that are either true or false and the connectors that combine them.',
      cards: [
        {
          title: 'Core Task',
          content: String.raw`<p>A proposition is a statement with a truth value. The sentence "7 is prime" is a proposition. The phrase "close the door" is not a proposition because it is a command.</p><p>Logic connectors build compound statements. The connector $\land$ means and, $\lor$ means or, $\neg$ means not, and $\rightarrow$ means implies.</p>`
        },
        {
          title: 'Method',
          content: String.raw`<ol><li>Assign a symbol to each simple proposition.</li><li>Translate each connector into logic notation.</li><li>Build a truth table with every possible truth-value combination.</li><li>Evaluate the inside parts before the outside statement.</li></ol><p>For implication $p \rightarrow q$, the only false case is when $p$ is true and $q$ is false.</p>`
        },
        {
          title: 'Worked Example',
          content: String.raw`<p>Analyze $p \rightarrow q$ where $p$ means "a number is divisible by 4" and $q$ means "a number is even."</p><p>The implication is true for integers because every multiple of 4 is even. The reverse statement $q \rightarrow p$ is false because 6 is even but not divisible by 4.</p>`
        },
        {
          title: 'Common Error Check',
          content: String.raw`<p>Do not confuse an implication with its converse. The statement $p \rightarrow q$ does not automatically prove $q \rightarrow p$.</p><p>The word or in mathematics usually means inclusive or. The statement $p \lor q$ is true when $p$ is true, when $q$ is true, or when both are true.</p>`
        }
      ]
    },

    'foundations:quantificational-logic': {
      title: 'How to Read Quantifiers',
      intro: 'Quantifiers turn individual statements into claims about entire collections.',
      cards: [
        {
          title: 'Core Task',
          content: String.raw`<p>The universal quantifier $\forall$ means for every. The existential quantifier $\exists$ means there exists at least one. A quantified statement must specify the domain because the same sentence can change truth value when the domain changes.</p>`
        },
        {
          title: 'Method',
          content: String.raw`<ol><li>Identify the domain.</li><li>Translate each quantifier in order.</li><li>For a universal statement, look for a proof or a counterexample.</li><li>For an existential statement, find one valid example or prove none can exist.</li></ol><p>Order matters. The statement $\forall x \exists y$ often differs from $\exists y \forall x$.</p>`
        },
        {
          title: 'Worked Example',
          content: String.raw`<p>Over the integers, the statement $\forall x \exists y, y > x$ is true. For any integer $x$, choose $y = x + 1$. Then $y$ is an integer and $y > x$.</p><p>The statement $\exists y \forall x, y > x$ is false over the integers because no single integer is larger than every integer.</p>`
        },
        {
          title: 'Common Error Check',
          content: String.raw`<p>To disprove a universal statement, one counterexample is enough. To prove an existential statement, one example is enough.</p><p>Negating quantifiers flips them: the negation of $\forall x, P(x)$ is $\exists x, \neg P(x)$. The negation of $\exists x, P(x)$ is $\forall x, \neg P(x)$.</p>`
        }
      ]
    },

    'foundations:proof-techniques': {
      title: 'How to Build a Proof',
      intro: 'A proof is a chain of justified statements that starts from definitions and ends at the claim.',
      cards: [
        {
          title: 'Core Task',
          content: String.raw`<p>Proof replaces guessing with justification. Each line must follow from a definition, a previous line, or an accepted theorem. The reader should be able to check the argument without trusting the writer.</p>`
        },
        {
          title: 'Method',
          content: String.raw`<ol><li>Rewrite the claim using definitions.</li><li>Identify the assumptions and the desired conclusion.</li><li>Select a proof structure: direct proof, contrapositive, contradiction, cases, or induction.</li><li>Write each algebraic or logical step with its reason.</li></ol>`
        },
        {
          title: 'Worked Example',
          content: String.raw`<p>Prove that the sum of two even integers is even.</p><p>Let $a$ and $b$ be even integers. By definition, $a = 2m$ and $b = 2n$ for some integers $m$ and $n$. Then $a + b = 2m + 2n = 2(m+n)$. Since $m+n$ is an integer, $a+b$ is divisible by 2. Therefore $a+b$ is even.</p>`
        },
        {
          title: 'Common Error Check',
          content: String.raw`<p>Examples can support understanding, but examples do not prove a universal claim. Checking $2+4=6$ and $6+8=14$ does not prove the sum of any two even integers is even.</p><p>Do not assume the conclusion. A proof must start from known facts and derive the conclusion.</p>`
        }
      ]
    },

    'beginning-algebra:variables-expressions': {
      title: 'How to Work With Algebraic Expressions',
      intro: 'This section gives the minimum reasoning needed before practice. It connects variables, order of operations, substitution, and simplification into one method.',
      cards: [
        {
          title: 'Core Task',
          content: String.raw`<p>An algebraic expression is a calculation rule with at least one value left open. In $3x + 5$, the letter $x$ is the open value, $3x$ means three copies of $x$, and $+5$ shifts the result upward by 5.</p><p>The task is not only to get a number. The task is to preserve the structure of the rule. When $x = 4$, the expression becomes $3(4) + 5 = 12 + 5 = 17$. When $x = 10$, the same rule becomes $3(10) + 5 = 35$.</p>`
        },
        {
          title: 'Method',
          content: String.raw`<ol><li>Identify every variable and the value assigned to it.</li><li>Substitute with parentheses, especially when the value is negative or a fraction.</li><li>Evaluate parentheses first, then exponents, then multiplication or division, then addition or subtraction.</li><li>Combine like terms only when the variable part matches exactly.</li></ol><p>For example, $2x + 3x = 5x$ because both terms contain $x$. The expression $2x + 3y$ cannot simplify to $5xy$ because $x$ and $y$ may represent different values.</p>`
        },
        {
          title: 'Worked Example',
          content: String.raw`<p>Evaluate and simplify $4(2x - 3) + x$ when $x = 5$.</p><p>First simplify the expression: $4(2x - 3) + x = 8x - 12 + x = 9x - 12$. Then substitute: $9(5) - 12 = 45 - 12 = 33$.</p><p>The same result appears if substitution comes first: $4(2(5) - 3) + 5 = 4(10 - 3) + 5 = 4(7) + 5 = 33$. Simplifying first usually makes repeated evaluations easier.</p>`
        },
        {
          title: 'Common Error Check',
          content: String.raw`<p>The most common mistake is ignoring structure. The expression $2 + 3 \times 4$ is $14$, not $20$, because multiplication happens before addition. Parentheses change the structure: $(2 + 3) \times 4 = 20$.</p><p>Another common mistake is dropping negative signs. If $x = -2$, then $x^2 = (-2)^2 = 4$, but $-x^2 = -(2^2) = -4$ when the minus sign is outside the square.</p>`
        }
      ]
    },

    'beginning-algebra:linear-equations-one-var': {
      title: 'How to Solve a Linear Equation',
      intro: 'A linear equation in one variable is a balance statement. Solving means finding the value that makes both sides equal.',
      cards: [
        {
          title: 'Core Task',
          content: String.raw`<p>An equation states that two expressions have the same value. In $2x + 7 = 19$, the left side and right side must balance. The variable $x$ is not decoration. It stands for the value that makes the statement true.</p><p>The goal is to isolate $x$ without changing the truth of the equation. Each legal move applies the same operation to both sides.</p>`
        },
        {
          title: 'Method',
          content: String.raw`<ol><li>Simplify each side first.</li><li>Move variable terms to one side and number terms to the other side.</li><li>Undo addition or subtraction before undoing multiplication or division.</li><li>Check the answer in the original equation, not only in the simplified line.</li></ol><p>Reverse the order of operations. If the expression is $2x + 7$, the operation closest to $x$ is multiplication by 2, but the outer operation is adding 7. Undo the outer operation first.</p>`
        },
        {
          title: 'Worked Example',
          content: String.raw`<p>Solve $3(x - 2) + 4 = 2x + 11$.</p><p>Distribute first: $3x - 6 + 4 = 2x + 11$, so $3x - 2 = 2x + 11$. Subtract $2x$ from both sides: $x - 2 = 11$. Add 2 to both sides: $x = 13$.</p><p>Check: $3(13 - 2) + 4 = 3(11) + 4 = 37$. The right side is $2(13) + 11 = 37$. Both sides match, so $x = 13$.</p>`
        },
        {
          title: 'Common Error Check',
          content: String.raw`<p>A common error is moving a term by changing its sign without understanding the operation. Subtracting $2x$ from both sides is valid because it preserves equality. Moving $2x$ across the equals sign is only shorthand for that operation.</p><p>Another error is checking in the last line only. A mistake made during distribution can survive to the last line. Always check in the original equation.</p>`
        }
      ]
    },

    'beginning-algebra:integer-operations': {
      title: 'How to Reason With Integers',
      intro: 'Integer operations become reliable when positive and negative values are tied to direction, gain and loss, or position on a number line.',
      cards: [
        {
          title: 'Core Task',
          content: String.raw`<p>Integers extend counting numbers by adding direction. Positive values move right on the number line. Negative values move left. The number $0$ is the reference point, not a positive or negative amount.</p><p>Addition combines movements. Subtraction removes a movement. Multiplication repeats a movement. Division asks for the size of equal groups or the number of groups.</p>`
        },
        {
          title: 'Method',
          content: String.raw`<ol><li>For addition, move in the direction of each number.</li><li>For subtraction, add the opposite: $a - b = a + (-b)$.</li><li>For multiplication, decide the sign first, then multiply the absolute values.</li><li>For division, use the same sign rule as multiplication.</li></ol><p>The sign rule follows from patterns. Since $3(2) = 6$, $3(1) = 3$, and $3(0) = 0$, the next step must be $3(-1) = -3$. Repeated structure forces the result.</p>`
        },
        {
          title: 'Worked Example',
          content: String.raw`<p>A bank account has a balance of $-18$ dollars. A deposit of $25$ dollars is added, then a fee of $7$ dollars is removed.</p><p>The expression is $-18 + 25 - 7$. First combine $-18 + 25 = 7$, then subtract $7$: $7 - 7 = 0$. The account returns to zero.</p><p>The same situation can be read as movement: start 18 units left of zero, move 25 units right, then move 7 units left.</p>`
        },
        {
          title: 'Common Error Check',
          content: String.raw`<p>The expression $-4^2$ equals $-16$ because the exponent applies before the outside negative sign. The expression $(-4)^2$ equals $16$ because the parentheses make the negative part of the base.</p><p>Subtraction also causes errors. The expression $5 - (-3)$ means remove a leftward movement of 3, which is the same as moving right 3. Therefore $5 - (-3) = 8$.</p>`
        }
      ]
    },

    'beginning-algebra:linear-inequalities': {
      title: 'How to Solve a Linear Inequality',
      intro: 'An inequality gives a range of possible values instead of one value. Solving means describing every value that makes the comparison true.',
      cards: [
        {
          title: 'Core Task',
          content: String.raw`<p>An inequality compares two expressions with symbols such as $<, >, \leq,$ or $\geq$. The solution is usually an interval, not a single number. For $x + 2 < 5$, every number less than 3 works.</p><p>The graph matters because it shows the full solution set. An open circle excludes the endpoint. A closed circle includes the endpoint.</p>`
        },
        {
          title: 'Method',
          content: String.raw`<ol><li>Solve like an equation while preserving the comparison.</li><li>Add or subtract the same value on both sides without changing the inequality direction.</li><li>Multiply or divide by a positive number without changing the direction.</li><li>Multiply or divide by a negative number and reverse the inequality direction.</li></ol><p>The reversal is necessary because negative multiplication reverses order. Since $2 < 5$, multiplying by $-1$ gives $-2 > -5$.</p>`
        },
        {
          title: 'Worked Example',
          content: String.raw`<p>Solve $-3x + 4 \leq 16$.</p><p>Subtract 4 from both sides: $-3x \leq 12$. Divide by $-3$ and reverse the inequality: $x \geq -4$.</p><p>Check with a value in the solution set. If $x = 0$, then $-3(0) + 4 = 4$, and $4 \leq 16$ is true. Check a value outside the set. If $x = -5$, then $-3(-5) + 4 = 19$, and $19 \leq 16$ is false.</p>`
        },
        {
          title: 'Common Error Check',
          content: String.raw`<p>The most important error is forgetting to reverse the inequality when dividing by a negative number. The line $-3x \leq 12$ does not become $x \leq -4$. It becomes $x \geq -4$.</p><p>Another error is using a filled endpoint for $<$ or $>$. Strict inequalities exclude the endpoint, so they use open circles on a number line.</p>`
        }
      ]
    },

    'beginning-algebra:systems-linear': {
      title: 'How to Solve a System of Linear Equations',
      intro: 'A system uses more than one equation to describe the same unknowns. The solution must satisfy every equation at the same time.',
      cards: [
        {
          title: 'Core Task',
          content: String.raw`<p>A single linear equation in two variables has many solutions. The equation $x + y = 10$ can be satisfied by $(2,8)$, $(3,7)$, and many other pairs. A second equation adds another condition and may identify one shared pair.</p><p>Graphically, each equation is a line. The solution is the intersection point. Parallel lines have no solution. The same line written two ways has infinitely many solutions.</p>`
        },
        {
          title: 'Method Choice',
          content: String.raw`<ul><li>Use graphing when the lines are simple and the intersection is easy to read.</li><li>Use substitution when one equation already isolates a variable, such as $y = 2x + 1$.</li><li>Use elimination when adding or subtracting equations can cancel a variable.</li></ul><p>Method choice is part of the skill. The best method is the one that reduces arithmetic and keeps the structure clear.</p>`
        },
        {
          title: 'Worked Example',
          content: String.raw`<p>Solve the system $2x + y = 11$ and $x - y = 1$.</p><p>Add the equations to eliminate $y$: $(2x + y) + (x - y) = 11 + 1$, so $3x = 12$ and $x = 4$. Substitute into $x - y = 1$: $4 - y = 1$, so $-y = -3$ and $y = 3$.</p><p>Check both equations. First equation: $2(4) + 3 = 11$. Second equation: $4 - 3 = 1$. The solution is $(4,3)$.</p>`
        },
        {
          title: 'Common Error Check',
          content: String.raw`<p>A common error is finding a value for one variable and stopping. A system solution is an ordered pair, so both coordinates are required.</p><p>Another error is checking only one equation. A pair that satisfies one line may fail the other line. A valid solution must satisfy every equation in the system.</p>`
        }
      ]
    },

    'geometry:points-lines-angles': makeGuide(
      'How to Reason With Points, Lines, and Angles',
      'Geometry starts by naming objects precisely, then using definitions to control measurement and position.',
      String.raw`<p>A point marks location. A line extends without end in both directions. A ray starts at one point and extends in one direction. A segment has two endpoints. An angle measures rotation between two rays that share a vertex.</p>`,
      String.raw`<ol><li>Draw the named objects before calculating.</li><li>Mark known measures on the diagram.</li><li>Use angle relationships: vertical angles are equal, linear pairs sum to $180^\circ$, and angles around a point sum to $360^\circ$.</li><li>Translate each relationship into an equation.</li></ol>`,
      String.raw`<p>If two angles form a linear pair and one angle is $3x + 10$ while the other is $2x - 5$, then $(3x + 10) + (2x - 5) = 180$. Combine like terms: $5x + 5 = 180$. Then $5x = 175$ and $x = 35$.</p>`,
      String.raw`<p>Do not assume angles are equal because a diagram looks symmetric. Use a stated relationship or theorem. A drawing supports reasoning, but the proof comes from definitions and marked facts.</p>`
    ),

    'geometry:triangles': makeGuide(
      'How to Solve Triangle Problems',
      'Triangle work combines angle sums, side relationships, congruence, and similarity.',
      String.raw`<p>Every triangle has interior angles summing to $180^\circ$. Congruent triangles have matching sides and angles equal. Similar triangles have matching angles equal and matching side lengths in a constant ratio.</p>`,
      String.raw`<ol><li>Mark the known angles and sides.</li><li>Decide whether the task is angle sum, congruence, similarity, or length ratio.</li><li>Use a theorem such as SSS, SAS, ASA, AAS, or AA similarity.</li><li>Set up the needed equation or proportion.</li></ol>`,
      String.raw`<p>If two triangles are similar and the small triangle has sides $3,4,5$ while the matching large side to 3 is 12, the scale factor is $12/3 = 4$. The matching sides are $4 \cdot 4 = 16$ and $5 \cdot 4 = 20$.</p>`,
      String.raw`<p>Congruent and similar do not mean the same thing. Congruent triangles have the same size and shape. Similar triangles have the same shape, but the size may change.</p>`
    ),

    'geometry:circles': makeGuide(
      'How to Work With Circles',
      'Circle problems usually connect radius, diameter, circumference, area, arcs, and central angles.',
      String.raw`<p>A circle is the set of points at a fixed distance from a center. The radius is that fixed distance. The diameter is twice the radius. Circumference measures distance around the circle. Area measures the enclosed region.</p>`,
      String.raw`<ol><li>Identify whether the problem asks for length, angle, or area.</li><li>Convert diameter to radius when needed.</li><li>Use $C = 2\pi r$ for circumference and $A = \pi r^2$ for area.</li><li>For sectors and arcs, multiply the full circle formula by the fraction of a full turn.</li></ol>`,
      String.raw`<p>A sector has radius 6 and central angle $60^\circ$. The fraction of the circle is $60/360 = 1/6$. The sector area is $\frac{1}{6}\pi(6^2) = 6\pi$.</p>`,
      String.raw`<p>Do not use diameter in the area formula. If the diameter is 10, the radius is 5, so the area is $\pi(5^2) = 25\pi$, not $100\pi$.</p>`
    ),

    'geometry:area-volume': makeGuide(
      'How to Compute Area and Volume',
      'Area measures surface coverage. Volume measures three-dimensional capacity.',
      String.raw`<p>Area uses square units because it counts two-dimensional coverage. Volume uses cubic units because it counts layers of area stacked through depth.</p>`,
      String.raw`<ol><li>Identify the shape or decompose it into familiar shapes.</li><li>Choose the formula that matches the dimensions given.</li><li>Keep units consistent before substitution.</li><li>State the final unit as square units for area or cubic units for volume.</li></ol>`,
      String.raw`<p>A rectangular prism with length 8, width 3, and height 5 has volume $V = lwh = 8 \cdot 3 \cdot 5 = 120$ cubic units. Its front face has area $8 \cdot 5 = 40$ square units.</p>`,
      String.raw`<p>Do not confuse perimeter, area, and volume. Perimeter is boundary length. Area covers a flat region. Volume fills space.</p>`
    ),

    'geometry:coordinate-geometry': makeGuide(
      'How to Use Coordinates in Geometry',
      'Coordinate geometry turns geometric relationships into algebraic calculations.',
      String.raw`<p>A point $(x,y)$ records horizontal and vertical position. Distance, midpoint, and slope connect coordinate changes to geometric facts.</p>`,
      String.raw`<ol><li>Plot or label the points.</li><li>Use slope $m = \frac{y_2-y_1}{x_2-x_1}$ to measure steepness.</li><li>Use midpoint $\left(\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}\right)$ to find the center of a segment.</li><li>Use distance $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$ for segment length.</li></ol>`,
      String.raw`<p>For $A(2,1)$ and $B(8,9)$, the midpoint is $\left(\frac{2+8}{2}, \frac{1+9}{2}\right) = (5,5)$. The distance is $\sqrt{6^2 + 8^2} = 10$.</p>`,
      String.raw`<p>Order matters in slope only if it is inconsistent. Use the same point order in numerator and denominator. Switching both differences gives the same slope.</p>`
    ),

    'intermediate-algebra:polynomials-exponents': makeGuide(
      'How to Use Polynomial and Exponent Rules',
      'Polynomials organize repeated addition and multiplication of variable powers.',
      String.raw`<p>A polynomial is a sum of terms such as $4x^3 - 2x + 7$. Each term has a coefficient and a variable power. Exponent rules describe repeated multiplication.</p>`,
      String.raw`<ol><li>Combine only like terms.</li><li>Use $x^a x^b = x^{a+b}$ when bases match.</li><li>Use $(x^a)^b = x^{ab}$ for powers of powers.</li><li>Use distribution to multiply polynomial terms.</li></ol>`,
      String.raw`<p>Simplify $2x^2(3x^3 - 5x + 1)$. Distribute: $2x^2 \cdot 3x^3 = 6x^5$, $2x^2 \cdot (-5x) = -10x^3$, and $2x^2 \cdot 1 = 2x^2$. The result is $6x^5 - 10x^3 + 2x^2$.</p>`,
      String.raw`<p>Do not add exponents when adding terms. The expression $x^2 + x^3$ is not $x^5$. Exponent addition applies to multiplication with the same base.</p>`
    ),

    'intermediate-algebra:factoring': makeGuide(
      'How to Factor Polynomials',
      'Factoring rewrites a polynomial as a product. It reverses distribution.',
      String.raw`<p>Factoring exposes structure. The expression $x^2 + 5x + 6$ becomes $(x+2)(x+3)$ because multiplying the factors returns the original polynomial.</p>`,
      String.raw`<ol><li>Look for a greatest common factor first.</li><li>Check for special patterns such as difference of squares.</li><li>For $x^2 + bx + c$, find two numbers that multiply to $c$ and add to $b$.</li><li>Multiply the factors back to verify.</li></ol>`,
      String.raw`<p>Factor $x^2 - x - 12$. Find two numbers that multiply to $-12$ and add to $-1$. The numbers are $-4$ and $3$. Therefore $x^2 - x - 12 = (x-4)(x+3)$.</p>`,
      String.raw`<p>Do not stop before checking for a greatest common factor. The expression $2x^2 + 10x + 12$ first factors as $2(x^2 + 5x + 6)$, then as $2(x+2)(x+3)$.</p>`
    ),

    'intermediate-algebra:quadratic-equations': makeGuide(
      'How to Solve Quadratic Equations',
      'A quadratic equation involves $x^2$ and can have zero, one, or two real solutions.',
      String.raw`<p>A quadratic equation has the form $ax^2 + bx + c = 0$ with $a \neq 0$. Solving means finding the $x$-values where the parabola crosses the $x$-axis.</p>`,
      String.raw`<ol><li>Set the equation equal to zero.</li><li>Try factoring when the numbers are simple.</li><li>Use square roots when the equation is a perfect square form.</li><li>Use the quadratic formula when factoring is not efficient.</li></ol>`,
      String.raw`<p>Solve $x^2 - 5x + 6 = 0$. Factor: $(x-2)(x-3)=0$. By the zero-product property, $x-2=0$ or $x-3=0$. Therefore $x=2$ or $x=3$.</p>`,
      String.raw`<p>Do not apply the zero-product property to a sum. It works after factoring because a product equals zero only when at least one factor equals zero.</p>`
    ),

    'intermediate-algebra:rational-expressions': makeGuide(
      'How to Work With Rational Expressions',
      'Rational expressions behave like fractions whose numerators and denominators contain variables.',
      String.raw`<p>A rational expression is undefined where its denominator equals zero. Before simplifying, record excluded values from the original denominator.</p>`,
      String.raw`<ol><li>Factor numerators and denominators.</li><li>State values that make any original denominator zero.</li><li>Cancel common factors, not common terms.</li><li>For equations, multiply by the least common denominator and check for extraneous solutions.</li></ol>`,
      String.raw`<p>Simplify $\frac{x^2-9}{x^2-3x}$. Factor: $\frac{(x-3)(x+3)}{x(x-3)}$. The original denominator is zero at $x=0$ and $x=3$. For allowed values, the expression simplifies to $\frac{x+3}{x}$.</p>`,
      String.raw`<p>Do not cancel pieces across addition. In $\frac{x+3}{x+5}$, the $x$ terms are not common factors, so nothing cancels.</p>`
    ),

    'algebra-advanced:polynomials-factoring': makeGuide(
      'How to Analyze Higher-Degree Polynomials',
      'Advanced polynomial work connects factors, zeros, end behavior, and graph shape.',
      String.raw`<p>A factor $(x-a)$ corresponds to a zero at $x=a$. Multiplicity describes how many times the factor appears and controls whether the graph crosses or touches the axis.</p>`,
      String.raw`<ol><li>Factor when possible.</li><li>List zeros from the factors.</li><li>Use degree and leading coefficient for end behavior.</li><li>Use multiplicity to decide crossing or touching at each zero.</li></ol>`,
      String.raw`<p>For $f(x)=(x-2)^2(x+1)$, the zeros are $x=2$ and $x=-1$. At $x=2$, multiplicity 2 means the graph touches and turns. At $x=-1$, multiplicity 1 means the graph crosses.</p>`,
      String.raw`<p>Do not treat every zero the same on a graph. Even multiplicity touches the axis. Odd multiplicity crosses the axis.</p>`
    ),

    'algebra-advanced:quadratic-equations': makeGuide(
      'How to Interpret Quadratics',
      'Quadratics can be solved algebraically and read as parabolas.',
      String.raw`<p>The form $ax^2+bx+c$ shows intercept information. Vertex form $a(x-h)^2+k$ shows the turning point $(h,k)$. Factored form $a(x-r_1)(x-r_2)$ shows zeros.</p>`,
      String.raw`<ol><li>Choose the form that matches the question.</li><li>Use factored form for roots.</li><li>Use vertex form for maximum or minimum.</li><li>Use the discriminant $b^2-4ac$ to count real roots.</li></ol>`,
      String.raw`<p>For $f(x)=2(x-3)^2-8$, the vertex is $(3,-8)$ and the parabola opens upward. Set $2(x-3)^2-8=0$ to find zeros: $(x-3)^2=4$, so $x=1$ or $x=5$.</p>`,
      String.raw`<p>Do not read the vertex from standard form without converting or using $x=-\frac{b}{2a}$. The constant term is the $y$-intercept, not the minimum or maximum.</p>`
    ),

    'algebra-advanced:exponents-logarithms': makeGuide(
      'How to Use Exponents and Logarithms',
      'Logarithms are inverse operations for exponentials.',
      String.raw`<p>For real logarithms, require $b>0$, $b\neq1$, and $y>0$. Under those conditions, $b^x=y$ can be rewritten as $\log_b(y)=x$. Exponential form gives the result of scaling. Logarithmic form asks which exponent produces that result.</p>`,
      String.raw`<ol><li>Convert between exponential and logarithmic form.</li><li>Use exponent rules to simplify products, quotients, and powers.</li><li>Use log rules only when the logarithms share a base and the inputs are positive.</li><li>Check domain restrictions before accepting solutions.</li></ol>`,
      String.raw`<p>Solve $2^{x}=16$. Since $16=2^4$, $x=4$. In logarithmic form, this is $x=\log_2(16)=4$.</p>`,
      String.raw`<p>Do not distribute logarithms over addition. The expression $\log(a+b)$ is not $\log a+\log b$. Log rules apply to products, quotients, and powers.</p>`
    ),

    'precalculus:functions-domain-range': makeGuide(
      'How to Read a Function',
      'A function assigns each input exactly one output.',
      String.raw`<p>Domain is the set of allowed inputs. Range is the set of possible outputs. Function notation $f(x)$ means the output of function $f$ at input $x$.</p>`,
      String.raw`<ol><li>Identify formula restrictions: denominators must be nonzero, even-root radicands must be nonnegative, and logarithm arguments must be positive.</li><li>Apply any additional restrictions stated by the problem.</li><li>Evaluate by substituting the input.</li><li>For composition, work from the inside outward and require the inner output to belong to the outer domain.</li><li>Find the range from the resulting outputs on the allowed domain.</li></ol>`,
      String.raw`<p>If $f(x)=\frac{1}{x-2}$, then $x=2$ is excluded because it makes the denominator zero. The domain is all real numbers except 2.</p>`,
      String.raw`<p>Do not confuse $f(x)$ with multiplication by $f$. It means the value of the function named $f$ at input $x$.</p>`
    ),

    'precalculus:graph-transformations': makeGuide(
      'How to Read Graph Transformations',
      'Graph transformations change a parent function in predictable ways.',
      String.raw`<p>Outside changes affect outputs. Inside changes affect inputs. The expression $f(x)+k$ moves a graph vertically. The expression $f(x-h)$ moves it horizontally.</p>`,
      String.raw`<ol><li>Identify the parent function.</li><li>Separate inside changes from outside changes.</li><li>Apply shifts, stretches, compressions, and reflections.</li><li>Track key points instead of redrawing the whole graph from scratch.</li></ol>`,
      String.raw`<p>For $g(x)=2(x-3)^2+1$, start with $y=x^2$. Move right 3, stretch vertically by 2, and move up 1. The vertex moves from $(0,0)$ to $(3,1)$.</p>`,
      String.raw`<p>Inside horizontal shifts feel reversed because the input is changed before the function acts. The expression $(x-3)^2$ moves right, not left.</p>`
    ),

    'precalculus:exponentials-logarithms': makeGuide(
      'How to Model Exponential and Logarithmic Change',
      'Exponential functions model repeated multiplication. Logarithms reverse that process.',
      String.raw`<p>In $a b^x$, the base $b$ controls growth or decay. If $b>1$, the function grows. If $0\lt b\lt1$, it decays. A logarithm finds the exponent needed to reach a value.</p>`,
      String.raw`<ol><li>Identify the starting value.</li><li>Identify the growth or decay factor.</li><li>Write the exponential model.</li><li>Use logarithms to solve for time or exponent values.</li></ol>`,
      String.raw`<p>A quantity starts at 500 and grows by 8 percent per year. The model is $A(t)=500(1.08)^t$. To find when it reaches 1000, solve $1000=500(1.08)^t$, so $2=1.08^t$ and $t=\frac{\log 2}{\log 1.08}$.</p>`,
      String.raw`<p>Do not add the percent repeatedly. Exponential growth multiplies by the same factor each period.</p>`
    ),

    'precalculus:poly-rational-graphs': makeGuide(
      'How to Graph Polynomial and Rational Functions',
      'Graphing depends on zeros, intercepts, end behavior, and undefined values.',
      String.raw`<p>Polynomial graphs are continuous and controlled by degree, leading coefficient, and roots. Rational graphs can have holes, vertical asymptotes, and horizontal asymptotes because division introduces restrictions.</p>`,
      String.raw`<ol><li>Record excluded values from the original denominator, then factor and cancel common factors.</li><li>Find zeros of the reduced numerator only at allowed inputs.</li><li>At an excluded input, check the reduced denominator. A remaining zero gives a vertical asymptote; a nonzero denominator gives a hole at the reduced function's value.</li><li>Compare leading terms, or use polynomial division, for end behavior.</li></ol>`,
      String.raw`<p>For $f(x)=\frac{x^2-1}{x-1}$, factor the numerator: $\frac{(x-1)(x+1)}{x-1}$. The simplified rule is $x+1$, but $x=1$ remains excluded. The graph is the line $y=x+1$ with a hole at $(1,2)$.</p>`,
      String.raw`<p>Do not erase domain restrictions after cancellation. Canceling a factor simplifies the expression for allowed values, but it does not make the original denominator valid at that value.</p>`
    ),

    'trigonometry:unit-circle': makeGuide(
      'How to Use the Unit Circle',
      'The unit circle defines sine and cosine as coordinates.',
      String.raw`<p>At angle $\theta$, the point on the unit circle is $(\cos\theta,\sin\theta)$. Cosine is horizontal position. Sine is vertical position.</p>`,
      String.raw`<ol><li>Find the reference angle.</li><li>Use the standard coordinate values.</li><li>Apply the sign from the quadrant.</li><li>Use period $2\pi$ for sine and cosine.</li></ol>`,
      String.raw`<p>Find $\sin(5\pi/6)$. The reference angle is $\pi/6$. In quadrant II, sine is positive. Since $\sin(\pi/6)=1/2$, $\sin(5\pi/6)=1/2$.</p>`,
      String.raw`<p>Do not memorize signs separately from the circle. The sign comes from the coordinate quadrant.</p>`
    ),

    'trigonometry:trig-identities': makeGuide(
      'How to Prove Trigonometric Identities',
      'An identity is an equation true for all allowed values.',
      String.raw`<p>Trigonometric identities follow from coordinate definitions and the Pythagorean theorem. The central identity is $\sin^2\theta+\cos^2\theta=1$.</p>`,
      String.raw`<ol><li>Start with the more complicated side.</li><li>Rewrite tangent, cotangent, secant, and cosecant using sine and cosine.</li><li>Use Pythagorean identities to replace groups.</li><li>Transform one side into the other without assuming the conclusion.</li></ol>`,
      String.raw`<p>Prove $\tan\theta\cos\theta=\sin\theta$. Rewrite tangent: $\tan\theta=\frac{\sin\theta}{\cos\theta}$. Then $\frac{\sin\theta}{\cos\theta}\cos\theta=\sin\theta$ where $\cos\theta \neq 0$.</p>`,
      String.raw`<p>Do not divide by an expression that may be zero without tracking restrictions. Identities must respect the domain where each expression is defined.</p>`
    ),

    'trigonometry:law-sines-cosines': makeGuide(
      'How to Solve Non-Right Triangles',
      'The Laws of Sines and Cosines extend triangle solving beyond right triangles.',
      String.raw`<p>The Law of Sines connects side lengths to opposite angles. The Law of Cosines generalizes the Pythagorean theorem when the included angle is not $90^\circ$.</p>`,
      String.raw`<ol><li>Label each side opposite its angle.</li><li>Use Law of Sines for ASA, AAS, or SSA information.</li><li>Use Law of Cosines for SAS or SSS information.</li><li>Check the ambiguous SSA case when using Law of Sines.</li></ol>`,
      String.raw`<p>If sides $a=7$, $b=10$, and included angle $C=60^\circ$ are known, use $c^2=a^2+b^2-2ab\cos C$. Then $c^2=49+100-140(1/2)=79$, so $c=\sqrt{79}$.</p>`,
      String.raw`<p>Do not use the Pythagorean theorem unless the triangle is right. Law of Cosines is the correct replacement for non-right triangles.</p>`
    ),

    'calculus-1:limits-continuity': makeGuide(
      'How to Reason About Limits',
      'A limit describes the value a function approaches near an input.',
      String.raw`<p>The limit $\lim_{x\to a} f(x)$ depends on nearby values of $x$, not necessarily the value at $x=a$. Continuity adds the requirement that the limit exists and equals the function value.</p>`,
      String.raw`<ol><li>Try direct substitution first.</li><li>If substitution gives an indeterminate form such as $0/0$, simplify the expression.</li><li>Compare left-hand and right-hand behavior.</li><li>For continuity, verify value, limit, and equality.</li></ol>`,
      String.raw`<p>Evaluate $\lim_{x\to 2}\frac{x^2-4}{x-2}$. Direct substitution gives $0/0$. Factor: $\frac{(x-2)(x+2)}{x-2}$. For $x\neq2$, this equals $x+2$. The limit is $4$.</p>`,
      String.raw`<p>Do not say the limit does not exist only because the function is undefined at the target input. A removable hole can still have a limit.</p>`
    ),

    'calculus-1:derivatives': makeGuide(
      'How to Interpret a Derivative',
      'A derivative measures instantaneous rate of change and tangent-line slope.',
      String.raw`<p>The derivative $f'(a)$ is the slope that secant slopes approach as the second point moves toward $a$. It measures how fast the output changes per unit of input at that point.</p>`,
      String.raw`<ol><li>Identify whether the task asks for a slope, rate, or formula.</li><li>Use rules when the derivative formula is needed.</li><li>Evaluate the derivative at the target input for an instantaneous rate.</li><li>Use point-slope form for tangent-line equations.</li></ol>`,
      String.raw`<p>If $f(x)=x^2$ and the tangent line at $x=3$ is needed, then $f'(x)=2x$, so $f'(3)=6$. The point is $(3,9)$. The tangent line is $y-9=6(x-3)$.</p>`,
      String.raw`<p>Do not confuse average rate with instantaneous rate. Average rate uses two separate points. A derivative uses the limiting slope at one point.</p>`
    ),

    'calculus-1:derivative-applications': makeGuide(
      'How to Use Derivatives in Applications',
      'Derivative applications translate slope information into behavior.',
      String.raw`<p>Derivatives identify increasing intervals, decreasing intervals, extrema, concavity, and rates. An interior input in the domain is a critical number when $f'(x)=0$ or $f'$ does not exist there. A point where $f$ itself is undefined is not a critical point. Endpoints are separate candidates for an absolute maximum or minimum.</p>`,
      String.raw`<ol><li>Define the quantity to optimize or analyze.</li><li>Differentiate the function.</li><li>Solve $f'(x)=0$ or check undefined derivative points.</li><li>Use sign charts, second derivatives, or endpoint checks to classify behavior.</li></ol>`,
      String.raw`<p>For $f(x)=x^2-6x+5$, $f'(x)=2x-6$. Set $2x-6=0$, so $x=3$. Since $f''(x)=2>0$, the function has a minimum at $x=3$. The minimum value is $f(3)=-4$.</p>`,
      String.raw`<p>Do not assume every critical point is a maximum or minimum. Classification requires a sign change, a second derivative test, or comparison with endpoints.</p>`
    ),

    'calculus1:limits-continuity': makeGuide(
      'How to Verify Continuity',
      'Continuity means the graph has no break at the point under review.',
      String.raw`<p>A function is continuous at $x=a$ when $f(a)$ is defined, $\lim_{x\to a}f(x)$ exists, and the limit equals $f(a)$.</p>`,
      String.raw`<ol><li>Check that the function value exists.</li><li>Compute or reason about the two-sided limit.</li><li>Compare the limit with the function value.</li><li>State the type of discontinuity when continuity fails.</li></ol>`,
      String.raw`<p>If $f(x)=\frac{x^2-1}{x-1}$ for $x\neq1$ and $f(1)=3$, then the nearby rule simplifies to $x+1$, so the limit at 1 is 2. Since $f(1)=3$, the function is not continuous at 1.</p>`,
      String.raw`<p>Do not check only the graph shape. Continuity at a point is a three-part condition involving value, limit, and equality.</p>`
    ),

    'calculus1:derivatives-rules': makeGuide(
      'How to Apply Derivative Rules',
      'Derivative rules make rate calculations efficient without returning to the limit definition every time.',
      String.raw`<p>Power, product, quotient, and chain rules each handle a different structure. The correct rule depends on how the function is built.</p>`,
      String.raw`<ol><li>Identify sums, products, quotients, and compositions.</li><li>Apply the rule matching the outer structure first.</li><li>For chain rule, multiply by the derivative of the inside function.</li><li>Simplify only after the derivative structure is correct.</li></ol>`,
      String.raw`<p>Differentiate $f(x)=(3x^2+1)^5$. The outer function is the fifth power and the inside is $3x^2+1$. By the chain rule, $f'(x)=5(3x^2+1)^4(6x)=30x(3x^2+1)^4$.</p>`,
      String.raw`<p>Do not distribute powers before checking structure. Expanding can create unnecessary algebra and more chances for errors.</p>`
    ),

    'calculus1:derivative-applications': makeGuide(
      'How to Solve Optimization and Rate Problems',
      'Derivative applications require translating a situation into a function before differentiating.',
      String.raw`<p>Optimization asks for a maximum or minimum. Related rates ask how two changing quantities are connected at an instant.</p>`,
      String.raw`<ol><li>Draw or describe the quantities.</li><li>Write an equation connecting them.</li><li>Use constraints to reduce variables when optimizing.</li><li>Differentiate and interpret the result in context.</li></ol>`,
      String.raw`<p>A rectangle has perimeter 40. Let width be $x$ and length be $20-x$. Area is $A=x(20-x)=20x-x^2$. Then $A'=20-2x$. Set $A'=0$, so $x=10$. The maximum area occurs for a square.</p>`,
      String.raw`<p>Do not differentiate before building the correct function. In applications, most errors happen during modeling, not during derivative rules.</p>`
    ),

    'calculus1:integration-ftc': makeGuide(
      'How to Use Antiderivatives and the FTC',
      'Integration accumulates quantities and reverses differentiation.',
      String.raw`<p>An antiderivative $F$ satisfies $F'=f$. A definite integral $\int_a^b f(x)\,dx$ gives net accumulation from $a$ to $b$. The Fundamental Theorem connects them by $F(b)-F(a)$.</p>`,
      String.raw`<ol><li>Find an antiderivative.</li><li>For indefinite integrals, add $C$.</li><li>For definite integrals, evaluate at the upper bound and subtract the lower-bound value.</li><li>Interpret the sign as net accumulation when context matters.</li></ol>`,
      String.raw`<p>Compute $\int_1^3 2x\,dx$. An antiderivative is $x^2$. Evaluate: $3^2-1^2=9-1=8$.</p>`,
      String.raw`<p>Do not forget $+C$ for indefinite integrals. Do not add $+C$ to a definite integral because the constant cancels during subtraction.</p>`
    ),

    'calculus-2:integration-fundamentals': makeGuide(
      'How to Interpret Integration',
      'Integration adds many small pieces into a total.',
      String.raw`<p>An integral can represent area, distance, mass, total change, or accumulated output. The meaning depends on the units of the integrand and the variable.</p>`,
      String.raw`<ol><li>Identify the rate or height being accumulated.</li><li>Choose bounds for the interval.</li><li>Find an antiderivative when possible.</li><li>Evaluate upper bound minus lower bound.</li></ol>`,
      String.raw`<p>If velocity is $v(t)=3t^2$ meters per second, displacement from $t=0$ to $t=2$ is $\int_0^2 3t^2\,dt = [t^3]_0^2 = 8$ meters.</p>`,
      String.raw`<p>Do not treat every integral as positive area. A definite integral is signed. Parts below the axis subtract from the total.</p>`
    ),

    'calculus-2:integration-techniques': makeGuide(
      'How to Choose an Integration Technique',
      'Integration techniques reverse derivative patterns.',
      String.raw`<p>Substitution reverses the chain rule. Integration by parts reverses the product rule. Partial fractions handle rational expressions after factoring denominators.</p>`,
      String.raw`<ol><li>Look for an inside function and its derivative for substitution.</li><li>Look for a product of unlike function types for integration by parts.</li><li>Look for rational functions with factorable denominators for partial fractions.</li><li>Rewrite trig expressions when identities simplify powers.</li></ol>`,
      String.raw`<p>Evaluate $\int 2x\cos(x^2)\,dx$. Let $u=x^2$, so $du=2x\,dx$. The integral becomes $\int \cos u\,du=\sin u+C=\sin(x^2)+C$.</p>`,
      String.raw`<p>Do not force one technique onto every integral. The structure of the integrand chooses the method.</p>`
    ),

    'calculus-2:taylor-series': makeGuide(
      'How to Use Taylor Series',
      'A Taylor series approximates a function with a polynomial built from derivatives.',
      String.raw`<p>A Taylor polynomial uses finitely many derivative values at a center $a$. A Taylor series uses infinitely many terms. The series represents $f(x)$ only where the remainder tends to zero. For a finite approximation, an error bound controls accuracy; a higher degree alone does not guarantee the desired error at a chosen input.</p>`,
      String.raw`<ol><li>Choose the center.</li><li>Compute derivatives at the center.</li><li>Place them into $\sum \frac{f^{(n)}(a)}{n!}(x-a)^n$.</li><li>Check interval or radius of convergence when the problem asks where the series works.</li></ol>`,
      String.raw`<p>For $e^x$ centered at 0, every derivative is $e^x$, and each derivative value at 0 is 1. Therefore $e^x=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots$.</p>`,
      String.raw`<p>Do not assume a series works everywhere. Polynomial approximations and infinite series require attention to convergence.</p>`
    ),

    'calculus2:integration-by-parts': makeGuide(
      'How to Use Integration by Parts',
      'Integration by parts reverses the product rule.',
      String.raw`<p>The formula $\int u\,dv = uv-\int v\,du$ is useful when an integral contains a product and differentiating one factor makes it simpler.</p>`,
      String.raw`<ol><li>Choose $u$ to become simpler after differentiation.</li><li>Choose $dv$ as the remaining factor that can be integrated.</li><li>Compute $du$ and $v$.</li><li>Substitute into $uv-\int v\,du$.</li></ol>`,
      String.raw`<p>Evaluate $\int x e^x\,dx$. Let $u=x$ and $dv=e^x dx$. Then $du=dx$ and $v=e^x$. The result is $xe^x-\int e^x dx=xe^x-e^x+C$.</p>`,
      String.raw`<p>Do not choose $u$ randomly. A poor choice can make the remaining integral harder instead of simpler.</p>`
    ),

    'calculus2:sequences': makeGuide(
      'How to Analyze Sequences',
      'A sequence is an ordered list defined by a formula or recurrence.',
      String.raw`<p>Arithmetic sequences add a constant difference. Geometric sequences multiply by a constant ratio. Convergence asks whether the terms approach a finite value.</p>`,
      String.raw`<ol><li>Identify whether the pattern uses addition or multiplication.</li><li>Write the explicit formula when possible.</li><li>For convergence, examine the limit as $n$ grows.</li><li>For recursive forms, compute enough terms to see the rule, then prove the behavior when needed.</li></ol>`,
      String.raw`<p>The sequence $a_n=3(1/2)^{n-1}$ is geometric with first term 3 and ratio $1/2$. Since $|1/2|<1$, the terms approach 0.</p>`,
      String.raw`<p>Do not confuse the terms of a sequence with the sum of a series. A sequence lists values. A series adds them.</p>`
    ),

    'calculus2:series-convergence': makeGuide(
      'How to Test Infinite Series',
      'A series converges when its partial sums approach a finite limit.',
      String.raw`<p>The terms of a series must approach 0 for convergence, but that condition alone is not enough. Tests compare the series to known behavior.</p>`,
      String.raw`<ol><li>Check the nth-term test first.</li><li>Recognize geometric and p-series forms.</li><li>Use comparison tests for positive-term series.</li><li>Use ratio or root tests for factorials and powers.</li><li>Use alternating series test when signs alternate.</li></ol>`,
      String.raw`<p>The series $\sum_{n=1}^{\infty}\frac{1}{2^n}$ is geometric with ratio $1/2$. Since $|r|<1$, it converges.</p>`,
      String.raw`<p>Do not conclude convergence only because terms get smaller. The harmonic series terms approach 0, but $\sum 1/n$ diverges.</p>`
    ),

    'calculus-3:vectors': makeGuide(
      'How to Work With Vectors',
      'Vectors represent quantities with magnitude and direction.',
      String.raw`<p>A vector can describe displacement, velocity, force, or any directed quantity. Components turn direction into coordinate values.</p>`,
      String.raw`<ol><li>Write vectors in component form.</li><li>Add or subtract component by component.</li><li>Use magnitude $\|\vec v\|=\sqrt{v_1^2+v_2^2+v_3^2}$.</li><li>Use dot product for projection and angle information.</li></ol>`,
      String.raw`<p>For $\vec a=\langle 2,3\rangle$ and $\vec b=\langle -1,4\rangle$, $\vec a+\vec b=\langle 1,7\rangle$. The dot product is $2(-1)+3(4)=10$.</p>`,
      String.raw`<p>Do not treat vectors like plain lengths. Direction matters. Two vectors can have the same magnitude and different directions.</p>`
    ),

    'calculus-3:partial-derivatives': makeGuide(
      'How to Interpret Partial Derivatives',
      'A partial derivative measures change in one input direction while other inputs are held fixed.',
      String.raw`<p>For a function $f(x,y)$, $\frac{\partial f}{\partial x}$ measures how $f$ changes as $x$ changes with $y$ fixed. The gradient collects all first partial derivatives into a vector.</p>`,
      String.raw`<ol><li>Choose the variable of differentiation.</li><li>Treat all other variables as constants.</li><li>Differentiate using ordinary derivative rules.</li><li>Use the gradient for steepest increase and directional derivatives.</li></ol>`,
      String.raw`<p>If $f(x,y)=x^2y+3y^2$, then $f_x=2xy$ because $y$ is constant with respect to $x$. Also $f_y=x^2+6y$ because $x^2$ is constant with respect to $y$.</p>`,
      String.raw`<p>Do not erase variables that are held constant. A constant multiplier remains in the derivative.</p>`
    ),

    'calculus-3:multiple-integrals': makeGuide(
      'How to Set Up Multiple Integrals',
      'Multiple integrals accumulate over regions in two or three dimensions.',
      String.raw`<p>A double integral adds values over an area. A triple integral adds values over a volume. Bounds describe the region, and the integrand describes what is being accumulated.</p>`,
      String.raw`<ol><li>Sketch or describe the region.</li><li>Choose an order of integration.</li><li>Write inner bounds that may depend on outer variables.</li><li>Integrate from inside to outside.</li></ol>`,
      String.raw`<p>For the rectangle $0\leq x\leq2$, $0\leq y\leq3$, $\int_0^2\int_0^3 xy\,dy\,dx$ first gives $\int_0^2 x\left[\frac{y^2}{2}\right]_0^3 dx=\int_0^2 \frac{9x}{2}dx=9$.</p>`,
      String.raw`<p>Do not choose bounds from the formula alone. Bounds come from the region, not from the integrand.</p>`
    ),

    'calculus3:vectors-space': makeGuide(
      'How to Use Dot and Cross Products',
      'Vector products encode geometry in algebraic form.',
      String.raw`<p>The dot product measures alignment and projection. The cross product produces a vector perpendicular to two three-dimensional vectors.</p>`,
      String.raw`<ol><li>Use dot product when the problem asks for angle, projection, or work.</li><li>Use cross product when the problem asks for perpendicular direction, area, or torque.</li><li>Check units and geometric meaning after calculation.</li></ol>`,
      String.raw`<p>For $\vec a=\langle1,2,0\rangle$ and $\vec b=\langle3,0,0\rangle$, the dot product is 3. Since $\|\vec a\|=\sqrt5$ and $\|\vec b\|=3$, $\cos\theta=\frac{3}{3\sqrt5}=\frac{1}{\sqrt5}$.</p>`,
      String.raw`<p>Do not use the cross product in two dimensions without embedding the vectors in three dimensions. The standard cross product is a three-dimensional operation.</p>`
    ),

    'calculus3:partial-derivatives': makeGuide(
      'How to Use Gradients',
      'For a differentiable function, a nonzero gradient points in the direction of fastest increase.',
      String.raw`<p>For $f(x,y,z)$, the gradient is $\nabla f=\langle f_x,f_y,f_z\rangle$. It combines all first partial derivatives into one vector. At a point where $f$ is differentiable, the directional derivative in unit direction $\vec u$ is $\nabla f\cdot\vec u$. If the gradient is zero, every first-order directional rate is zero; this alone does not identify a maximum or minimum.</p>`,
      String.raw`<ol><li>Compute each partial derivative.</li><li>Evaluate the gradient at the point if needed.</li><li>Use $\nabla f \cdot \vec u$ for a directional derivative in unit direction $\vec u$.</li><li>Interpret the magnitude as rate of steepest increase.</li></ol>`,
      String.raw`<p>If $f(x,y)=x^2+xy$, then $\nabla f=\langle2x+y,x\rangle$. At $(1,3)$, $\nabla f=\langle5,1\rangle$.</p>`,
      String.raw`<p>Do not use a non-unit direction vector in a directional derivative unless the problem specifically asks for scaling. Directional derivative uses a unit vector.</p>`
    ),

    'calculus3:multiple-integrals': makeGuide(
      'How to Interpret Double and Triple Integrals',
      'Multivariable integrals total a density, height, or rate over a region.',
      String.raw`<p>The integrand gives the amount per unit area or volume. The bounds describe where to accumulate. Changing coordinates can simplify circular, cylindrical, or spherical regions.</p>`,
      String.raw`<ol><li>Identify the region and draw it when possible.</li><li>Choose rectangular, polar, cylindrical, or spherical coordinates.</li><li>Include the correct Jacobian factor, such as $r$ in polar coordinates.</li><li>Integrate in an order that gives simple bounds.</li></ol>`,
      String.raw`<p>The area of a disk of radius 2 can be written in polar form as $\int_0^{2\pi}\int_0^2 r\,dr\,d\theta$. The factor $r$ is required. The value is $\int_0^{2\pi}2\,d\theta=4\pi$.</p>`,
      String.raw`<p>Do not forget the coordinate factor. In polar coordinates, $dA$ is $r\,dr\,d\theta$, not just $dr\,d\theta$.</p>`
    ),

    'foundations:relations-equivalence': makeGuide(
      'How to Test a Relation',
      'A relation becomes useful when its rule can be checked against exact properties.',
      String.raw`<p>A relation is a set of ordered pairs. The statement $aRb$ means $a$ is related to $b$ by the rule $R$. Equality, less-than, divisibility, and same remainder are all examples of relations.</p><p>An equivalence relation is reflexive, symmetric, and transitive. It groups a set into non-overlapping classes.</p>`,
      String.raw`<ol><li>State the rule in plain language.</li><li>Check reflexive behavior: does every $a$ relate to itself?</li><li>Check symmetry: if $a$ relates to $b$, does $b$ relate to $a$?</li><li>Check transitivity: if $a$ relates to $b$ and $b$ relates to $c$, does $a$ relate to $c$?</li><li>Use one counterexample to disprove a property.</li></ol>`,
      String.raw`<p>Define $a\sim b$ when $a-b$ is divisible by 3. Reflexive works because $a-a=0$. Symmetric works because if $a-b=3k$, then $b-a=-3k$. Transitive works because two multiples of 3 add to another multiple of 3.</p><p>The classes are integers with remainder 0, remainder 1, and remainder 2.</p>`,
      String.raw`<p>Do not judge a relation by a few examples only. A proof must cover arbitrary elements, while a counterexample needs only one failure.</p>`
    ),

    'beginning-algebra:absolute-value-variation': makeGuide(
      'How to Work With Distance and Variation',
      'Absolute value is distance, and variation is a reusable scaling model.',
      String.raw`<p>The expression $|x-a|$ measures distance from $a$. Since distance has two directions on a number line, equations like $|x-a|=r$ usually split into two cases.</p><p>Variation models describe repeated proportional relationships. Direct variation uses $y=kx$. Inverse variation uses $y=\frac{k}{x}$.</p>`,
      String.raw`<ol><li>For $|A|=k$, first check that $k\geq0$.</li><li>Split into $A=k$ and $A=-k$.</li><li>For variation, write the model form before substituting values.</li><li>Find the constant $k$ from the known case.</li><li>Use the same model for the new case and include units when relevant.</li></ol>`,
      String.raw`<p>The equation $|x-12|=7$ means $x$ is 7 units from 12. The two cases are $x-12=7$ and $x-12=-7$, giving $x=19$ or $x=5$.</p><p>If cost varies directly with miles and the rate is 0.42 dollars per mile, then $C=0.42m$. A 7 mile trip costs $C=0.42(7)=2.94$ dollars.</p>`,
      String.raw`<p>Do not drop the negative case in an absolute value equation. Also do not use direct variation when the product stays constant. If $xy=k$, the model is inverse variation.</p>`
    ),

    'beginning-algebra:linear-functions-slope': makeGuide(
      'How to Read Linear Graphs',
      'A linear equation describes constant change, and slope gives the unit rate.',
      String.raw`<p>The core task is to connect the equation, graph, and context. In $y=mx+b$, $b$ is the starting value at $x=0$, and $m$ is the change in $y$ for a one-unit increase in $x$.</p>`,
      String.raw`<ol><li>Identify the input and output units.</li><li>Find the starting value when $x=0$.</li><li>Find slope as $\frac{\Delta y}{\Delta x}$.</li><li>Write $y=mx+b$.</li><li>Check the model with a known point.</li></ol>`,
      String.raw`<p>A phone plan costs 35 dollars plus 12 dollars per GB. The equation is $y=12x+35$. At $x=5$, the cost is $95$. The point $(5,95)$ means 5 GB predicts a 95 dollar bill.</p>`,
      String.raw`<p>Do not treat the y-intercept as the slope. The intercept is a starting value. The slope is a rate with units, such as dollars per GB.</p>`
    ),

    'precalculus:systems-matrices': makeGuide(
      'How to Solve a System With Matrices',
      'A matrix organizes the same elimination steps used in ordinary systems of equations.',
      String.raw`<p>A linear system can be written as an augmented matrix by placing the coefficients in columns and the constants after a divider. Row operations represent equation operations that keep the solution set unchanged.</p>`,
      String.raw`<ol><li>Fix the variable order before writing coefficients.</li><li>Build the augmented matrix $[A\mid b]$.</li><li>Use row operations to create a leading pivot and zeros below it.</li><li>Continue until the system is triangular or reduced.</li><li>Back substitute and check the original equations.</li></ol>`,
      String.raw`<p>The system $2x+y=7$, $x-y=2$ becomes $\left[\begin{array}{cc|c}2&1&7\\1&-1&2\end{array}\right]$. Swap rows, then use $R_2\leftarrow R_2-2R_1$ to get $\left[\begin{array}{cc|c}1&-1&2\\0&3&3\end{array}\right]$. Then $y=1$ and $x=3$.</p>`,
      String.raw`<p>Do not change variable order between rows. The first column cannot mean $x$ in one row and $y$ in another row.</p>`
    ),

    'precalculus:inverse-functions-modeling': makeGuide(
      'How to Reverse a Function',
      'An inverse function solves the reverse problem and changes the role of input and output.',
      String.raw`<p>The core task is to decide whether the reverse relation is still a function. If two inputs give the same output, the reverse relation gives two answers and fails as a function unless the domain is restricted.</p>`,
      String.raw`<ol><li>Check one-to-one behavior with algebra or the horizontal line test.</li><li>Write $y=f(x)$.</li><li>Swap $x$ and $y$.</li><li>Solve for $y$.</li><li>State the inverse and check by composition.</li></ol>`,
      String.raw`<p>If $C(g)=35+12g$, then $c=35+12g$ gives $g=\frac{c-35}{12}$. A 131 dollar bill corresponds to $C^{-1}(131)=8$ GB. The inverse turns cost back into usage.</p>`,
      String.raw`<p>Do not write $\pm\sqrt{x}$ as an inverse function for $x^2$ on all real numbers. It gives two outputs. Restrict the domain first, such as $x\geq0$.</p>`
    ),

    'precalculus:conic-sections': makeGuide(
      'How to Classify Conics',
      'Conic equations become readable after they are placed in standard form.',
      String.raw`<p>The core task is to recognize the curve and extract its features. Squared terms, signs, and denominators tell whether the graph is a circle, parabola, ellipse, or hyperbola.</p>`,
      String.raw`<ol><li>Count squared variables.</li><li>Check whether squared terms have the same sign or opposite signs.</li><li>Group x terms and y terms.</li><li>Complete the square when linear terms appear.</li><li>Compare with standard form to read center, radius, axes, or asymptotes.</li></ol>`,
      String.raw`<p>For $x^2+y^2-6x+4y=12$, group and complete squares: $(x-3)^2+(y+2)^2=25$. The graph is a circle with center $(3,-2)$ and radius 5.</p>`,
      String.raw`<p>Do not classify only from one term. Both $x^2+y^2=9$ and $x^2+4y^2=9$ have positive squared terms, but the first is a circle and the second is an ellipse.</p>`
    ),

    'trigonometry:trig-graphs-inverse': makeGuide(
      'How to Read Trigonometric Graphs',
      'A trigonometric graph records repeated motion with amplitude, period, shift, and midline.',
      String.raw`<p>The core task is to connect each parameter to a visible graph feature. In $y=A\sin(Bx-C)+D$, $A$ controls height, $B$ controls repeat length, $C/B$ controls horizontal shift, and $D$ controls the midline.</p>`,
      String.raw`<ol><li>Read amplitude as $|A|$.</li><li>Read the sine or cosine period as $\frac{2\pi}{|B|}$.</li><li>Find phase shift as $\frac{C}{B}$.</li><li>Read the midline as $y=D$.</li><li>Use principal ranges for inverse trig outputs.</li></ol>`,
      String.raw`<p>A Ferris wheel with radius 20 and center height 24 has model $H(t)=24+20\sin(\frac{\pi}{30}t)$ if it completes one turn in 60 seconds and starts at the midline moving upward. The amplitude is 20, midline is 24, and period is 60.</p>`,
      String.raw`<p>Do not answer inverse trig with every possible angle. $\arcsin(1/2)$ returns $\pi/6$ because arcsine uses its principal range.</p>`
    ),

    'calculus2:applications-integrals': makeGuide(
      'How to Use Integrals in Context',
      'A definite integral totals a changing quantity over an interval.',
      String.raw`<p>The core task is to identify what one thin slice contributes. A rate slice gives accumulated change. A vertical slice between graphs gives area. A cross-sectional slice gives volume.</p>`,
      String.raw`<ol><li>Name the accumulated quantity.</li><li>Use units to choose the integrand.</li><li>Choose bounds from the interval or region.</li><li>Use top minus bottom for area between curves.</li><li>Divide by interval length for average value.</li></ol>`,
      String.raw`<p>If speed is $v(t)=8+2t$ miles per hour for $0\leq t\leq3$, distance is $\int_0^3(8+2t)\,dt=33$ miles. Average speed is $33/3=11$ miles per hour.</p>`,
      String.raw`<p>Do not ignore units. Integrating gallons per minute over minutes gives gallons, not gallons per minute.</p>`
    ),

    'calculus2:parametric-polar': makeGuide(
      'How to Work With Parametric and Polar Curves',
      'Parametric equations describe motion, and polar coordinates describe distance and angle.',
      String.raw`<p>The core task is to locate points from a rule that is not written as $y=f(x)$. Parametric curves use a shared parameter. Polar curves use radius and angle.</p>`,
      String.raw`<ol><li>For parametric points, substitute the same parameter into $x(t)$ and $y(t)$.</li><li>For parametric slope, compute $\frac{dy/dt}{dx/dt}$.</li><li>For polar points, turn by $\theta$ and move distance $r$.</li><li>Convert with $x=r\cos\theta$ and $y=r\sin\theta$.</li></ol>`,
      String.raw`<p>For $x(t)=12t$ and $y(t)=20t-16t^2$, at $t=1$ the point is $(12,4)$. The slope is $\frac{20-32t}{12}$, so at $t=1$ the path has slope $-1$.</p>`,
      String.raw`<p>Do not treat $t$ as always equal to $x$. In parametric form, both $x$ and $y$ depend on $t$.</p>`
    ),

    'calculus2:first-order-differential-equations': makeGuide(
      'How to Read a Differential Equation',
      'A differential equation gives a rule for change, and the answer is a function.',
      String.raw`<p>The equation $dy/dx=f(x,y)$ tells how the unknown function changes at each point. A solution is not usually one number. It is a function $y(x)$ whose derivative matches the rule.</p><p>An initial value, such as $y(0)=2$, selects one solution from a family of possible solutions.</p>`,
      String.raw`<ol><li>Identify the unknown function and independent variable.</li><li>Check whether variables can be separated.</li><li>Move $y$ terms with $dy$ and $x$ terms with $dx$.</li><li>Integrate both sides.</li><li>Use the initial value after integration.</li><li>Interpret the result in the original context.</li></ol>`,
      String.raw`<p>For $dy/dx=xy$ with $y(0)=2$, first note that $y\equiv0$ solves the equation but fails the initial condition. On a nonzero solution branch, separate: $\frac{1}{y}dy=x\,dx$. Integrate: $\ln|y|=x^2/2+C$. Exponentiate and absorb the sign into a nonzero constant: $y=Ke^{x^2/2}$. The initial value gives $K=2$, so $y=2e^{x^2/2}$. Differentiation gives $y'=2xe^{x^2/2}=xy$, which verifies the rule.</p>`,
      String.raw`<p>Check constant solutions before dividing by an expression containing $y$. Separation can discard a solution where that expression is zero. Use the initial condition to select the constant, then verify both the differential equation and the initial value.</p>`
    ),

    'calculus3:vector-functions-motion': makeGuide(
      'How to Analyze Vector Motion',
      'A vector function stores position, velocity, and acceleration across multiple coordinates.',
      String.raw`<p>The core task is to keep vector quantities separate. Position locates the object. Velocity is the derivative of position. Acceleration is the derivative of velocity. Speed is the magnitude of velocity.</p>`,
      String.raw`<ol><li>Write the position vector $\vec r(t)$.</li><li>Differentiate component by component to get $\vec v(t)$.</li><li>Differentiate again to get $\vec a(t)$.</li><li>Evaluate at the requested time.</li><li>Use $\|\vec v(t)\|$ only when speed is requested.</li></ol>`,
      String.raw`<p>If $\vec r(t)=\langle t^2,3t\rangle$, then $\vec v(t)=\langle2t,3\rangle$ and $\vec a(t)=\langle2,0\rangle$. At $t=2$, speed is $\sqrt{4^2+3^2}=5$.</p>`,
      String.raw`<p>Do not confuse velocity and speed. Velocity is a vector. Speed is a nonnegative number.</p>`
    ),

    'calculus3:vector-fields-line-integrals': makeGuide(
      'How to Read a Line Integral',
      'A line integral measures how much a vector field acts along a path.',
      String.raw`<p>The core task is to combine field direction with path direction. The dot product keeps the part of the field that points along the motion.</p>`,
      String.raw`<ol><li>Parameterize the curve as $\vec r(t)$.</li><li>Compute $\vec r\,\prime(t)$.</li><li>Substitute the path into the vector field.</li><li>Compute $\vec F(\vec r(t))\cdot\vec r\,\prime(t)$.</li><li>Integrate over the parameter interval.</li></ol>`,
      String.raw`<p>For constant field $\vec F=\langle2,3\rangle$ along the line from $(0,0)$ to $(4,1)$, use $\vec r(t)=\langle4t,t\rangle$. Then $\vec F\cdot\vec r\,\prime(t)=\langle2,3\rangle\cdot\langle4,1\rangle=11$, so the work is 11.</p>`,
      String.raw`<p>Do not multiply magnitudes only. Work depends on direction, so the dot product is required.</p>`
    ),

    'probability-statistics:counting-probability': makeGuide(
      'How to Count Outcomes and Compute Probability',
      'Probability starts with a clear sample space and reliable counting.',
      String.raw`<p>Probability compares favorable outcomes with possible outcomes when outcomes are equally likely. Counting rules prevent missed or duplicated outcomes.</p>`,
      String.raw`<ol><li>Define the sample space.</li><li>Decide whether order matters.</li><li>Decide whether repetition is allowed.</li><li>Use multiplication, permutations, or combinations as appropriate.</li><li>Compute probability as favorable outcomes divided by total outcomes.</li></ol>`,
      String.raw`<p>Choose 2 students from 5 for a committee. Order does not matter, so use combinations: $\binom{5}{2}=10$. If 2 specific students must both be chosen, there is 1 favorable committee, so the probability is $1/10$.</p>`,
      String.raw`<p>Do not use permutations when order does not matter. Listing Ana then Bo and Bo then Ana as different committees double-counts the same committee.</p>`
    ),

    'probability-statistics:descriptive-statistics': makeGuide(
      'How to Describe a Data Set',
      'Descriptive statistics turn a list of values into a readable summary of center, spread, and shape.',
      String.raw`<p>The first task is not to calculate every statistic available. The first task is to say what the data measure, what unit they use, and what pattern they show. Center describes a typical value. Spread describes how far values vary. Shape describes symmetry, skew, clusters, and unusual values.</p>`,
      String.raw`<ol><li>Identify the variable and unit.</li><li>Sort the data if medians, quartiles, or outliers are involved.</li><li>Compute mean and median for center.</li><li>Compute range, interquartile range, or standard deviation for spread.</li><li>Use a display that matches the goal. Dot plots work for small lists. Histograms work for larger numeric data. Box plots compare groups.</li></ol>`,
      String.raw`<p>A student records daily study minutes for one week: $20,25,30,30,35,40,100$.</p><p>The mean is $\frac{280}{7}=40$ minutes. The median is 30 minutes. The large value 100 pulls the mean upward, so the median better describes a typical day. For planning a normal weeknight, 30 minutes gives a more stable summary than 40 minutes. For total time budgeting, the mean still matters because it accounts for every minute.</p>`,
      String.raw`<p>Do not choose a statistic without checking the data shape. A single unusually large value can make the mean look typical when most values are much smaller.</p>`
    ),

    'probability-statistics:conditional-probability-bayes': makeGuide(
      'How to Update Probability With Evidence',
      'Conditional probability measures a probability after new information changes the sample space.',
      String.raw`<p>The expression $P(A\mid B)$ means the probability of $A$ under the condition that $B$ is already known. The condition does not add extra outcomes. It restricts the world to cases where $B$ occurred.</p><p>Bayes' rule reverses a conditional probability. It is useful when the known quantity is $P(\text{evidence}\mid\text{cause})$, but the needed quantity is $P(\text{cause}\mid\text{evidence})$.</p>`,
      String.raw`<ol><li>Name the events.</li><li>Write the condition after the vertical bar.</li><li>Use $P(A\mid B)=\frac{P(A\cap B)}{P(B)}$ when joint probability is known.</li><li>Use Bayes' rule when evidence must update a prior probability.</li><li>Compute the denominator by listing all ways the evidence can happen.</li></ol>`,
      String.raw`<p>A security system flags 2 percent of normal logins by mistake. It flags 90 percent of fraudulent logins. Fraudulent logins are 1 percent of all logins. For a flagged login, the chance of fraud is</p><p>$\frac{0.90(0.01)}{0.90(0.01)+0.02(0.99)}=\frac{0.009}{0.0288}\approx0.3125$.</p><p>The alert matters, but it does not mean 90 percent fraud. Most logins are normal, so false alerts remain part of the denominator.</p>`,
      String.raw`<p>Do not confuse $P(A\mid B)$ with $P(B\mid A)$. Test accuracy describes the probability of evidence given a condition. A decision usually needs the probability of the condition given evidence.</p>`
    ),

    'probability-statistics:sampling-inference': makeGuide(
      'How to Make a Statistical Claim From a Sample',
      'Inference uses sample data to estimate or test a statement about a larger population.',
      String.raw`<p>A sample statistic changes from sample to sample. Statistical inference keeps that variation visible. A confidence interval gives a plausible range for a population value. A hypothesis test asks whether the sample result is hard to explain under a stated null assumption.</p>`,
      String.raw`<ol><li>State the population and parameter.</li><li>Check whether the sample design is relevant and unbiased.</li><li>Choose estimation or testing.</li><li>For an interval, compute estimate plus or minus margin of error.</li><li>For a test, compare the p-value with the significance level.</li><li>State the conclusion in the original context.</li></ol>`,
      String.raw`<p>Suppose a simple random sample of 100 students from a large target population finds that 64 prefer online homework. The sample proportion is $\hat p=0.64$. Assume observations are independent, or the sample is a small fraction of the population when sampling without replacement. The 64 successes and 36 failures support a normal approximation. A rough 95 percent interval uses $\hat p\pm2\sqrt{\frac{\hat p(1-\hat p)}{n}}$.</p><p>The standard error is $\sqrt{\frac{0.64(0.36)}{100}}=0.048$. The margin is about $2(0.048)=0.096$. The interval is about $0.544$ to $0.736$. Using 1.96 instead of 2 gives the usual normal critical value.</p><p>Under these assumptions, the interval lies above 0.5 and supports a majority preference in the target population. A voluntary class poll would describe its respondents; this formula would not repair selection bias or justify the same population claim.</p>`,
      String.raw`<p>Do not treat 95 percent confidence as a 95 percent probability that one fixed interval contains the parameter after the data are collected. The method captures the parameter in about 95 percent of repeated samples under its assumptions.</p>`
    ),

    'probability-statistics:correlation-regression': makeGuide(
      'How to Read a Linear Relationship',
      'Correlation and regression describe paired data, but they do not prove causation by themselves.',
      String.raw`<p>A scatterplot is the starting point. It shows whether a straight-line model makes sense, whether the association is positive or negative, and whether outliers may dominate the calculation. Correlation measures linear strength. Regression creates a prediction line.</p>`,
      String.raw`<ol><li>Make or inspect the scatterplot.</li><li>Describe direction, form, strength, and outliers.</li><li>Use correlation only for linear association.</li><li>Use the regression line to predict within the data range.</li><li>Compute residuals as actual minus predicted.</li><li>Interpret slope, intercept, and residuals in context.</li></ol>`,
      String.raw`<p>A phone plan model is $\hat y=35+12x$, where $x$ is gigabytes used and $\hat y$ is monthly cost in dollars. The slope means each additional GB predicts 12 more dollars. At 8 GB, the predicted cost is $35+12(8)=131$ dollars.</p><p>If the actual bill is 140 dollars, the residual is $140-131=9$. The model underpredicted by 9 dollars. The residual gives more information than the prediction alone because it measures the model error for that case.</p>`,
      String.raw`<p>Do not extend a regression line far beyond the observed data. A pattern that is reasonable from 0 to 12 GB may fail at 100 GB because the plan may have caps, discounts, or different pricing rules.</p>`
    ),

    'probability-statistics:random-variables': makeGuide(
      'How to Work With Random Variables',
      'A random variable assigns numbers to outcomes so probability can be calculated with arithmetic.',
      String.raw`<p>A discrete random variable has countable values with nonnegative probabilities that sum to 1. When the sum exists, expected value is the weighted average $E[X]=\sum xP(X=x)$. Independent repetitions with the same distribution connect this number to a long-run average.</p>`,
      String.raw`<ol><li>Define what the random variable counts or measures.</li><li>List its possible values and assign probabilities.</li><li>Check that probabilities are nonnegative and sum to 1.</li><li>Compute $E[X]$ or $\operatorname{Var}(X)=E[X^2]-(E[X])^2$.</li><li>If a normal distribution with mean $\mu$ and standard deviation $\sigma>0$ is specified, use $z=(x-\mu)/\sigma$ to look up probabilities. Standardizing arbitrary data does not make them normal.</li></ol>`,
      String.raw`<p>If a game pays 10 dollars with probability 0.2 and 0 dollars with probability 0.8, the expected value is $10(0.2)+0(0.8)=2$ dollars.</p>`,
      String.raw`<p>Expected value is not a guaranteed outcome. It is the average over many repetitions.</p>`
    ),
  };

  const applicationCards = {
    'beginning-algebra:linear-equations-one-var': String.raw`<p><strong>Choose a plan from a threshold.</strong> Plan A charges 18 dollars plus 4 dollars per visit. Plan B charges 42 dollars plus 2 dollars per visit. Let $v$ count visits. Equal costs satisfy $18+4v=42+2v$, so $2v=24$ and $v=12$. Both plans cost 66 dollars at 12 visits.</p><p>To choose a plan, compare costs rather than stopping at equality: $18+4v<42+2v$ gives $v<12$. Plan A costs less below 12 visits; Plan B costs less above 12. The context requires nonnegative whole-number visits. A threshold such as $v=12.4$ would place the change between 12 and 13 visits.</p>`,
    'beginning-algebra:systems-linear': String.raw`<p><strong>Build a mixture from two constraints.</strong> Suppose two solutions contain 10 percent and 30 percent solute. To make 8 liters at 25 percent, let $x$ and $y$ be their volumes in liters. Assuming volumes add and no solute is lost, total volume gives $x+y=8$ and solute volume gives $0.10x+0.30y=0.25(8)=2$.</p><p>Substitute $x=8-y$: $0.8+0.20y=2$, so $y=6$ and $x=2$. Check: $0.10(2)+0.30(6)=2$ liters of solute. A target concentration outside 10 to 30 percent cannot be made by mixing only these solutions. Negative computed volumes would signal an infeasible target, not usable amounts.</p>`,
    'beginning-algebra:absolute-value-variation': String.raw`<p><strong>Translate a tolerance into an interval.</strong> A part must measure 12 centimeters with error at most 0.3 centimeters. The condition is $|L-12|\leq0.3$, so $-0.3\leq L-12\leq0.3$ and $11.7\leq L\leq12.3$. The endpoints are allowed because the wording says at most.</p><p>If the error must be less than 0.3 centimeters, use open endpoints. If the tolerance is 2 percent of the target length instead, compute $0.02(12)=0.24$ centimeters first, then use $|L-12|\leq0.24$. Absolute and percentage tolerances use different widths when the target changes.</p>`,
    'intermediate-algebra:rational-expressions': String.raw`<p><strong>Add rates before finding time.</strong> Pump A fills a tank in 6 hours and Pump B fills it in 3 hours. Assume their rates stay constant and both act independently on the same tank. Their rates are $1/6$ and $1/3$ tank per hour. Together they fill $1/6+1/3=1/2$ tank per hour, so one tank takes $1/(1/2)=2$ hours.</p><p>With a drain that removes $1/12$ tank per hour, the net rate becomes $1/6+1/3-1/12=5/12$, and filling takes $12/5=2.4$ hours. Adding completion times would give the wrong units and model. A zero or negative net rate means this setup cannot fill an initially empty tank.</p>`,
    'algebra-advanced:quadratic-equations': String.raw`<p><strong>Choose the quadratic form from the question.</strong> Suppose a seller can charge $p=30-0.5q$ dollars when selling $q$ items. Revenue is $R(q)=pq=30q-0.5q^2$, with $0\leq q\leq60$ so quantity and price stay nonnegative. Completing the square gives $R(q)=450-0.5(q-30)^2$. Revenue reaches its maximum of 450 dollars at 30 items.</p><p>For a target revenue of 400 dollars, solve $450-0.5(q-30)^2=400$. Then $(q-30)^2=100$, giving $q=20$ or $q=40$. The two quantities use different prices, 20 dollars and 10 dollars. This is a hypothetical demand rule; if the rule changes or quantity must be whole-number, reconsider feasibility before accepting a root.</p>`,
    'precalculus:functions-domain-range': String.raw`<p><strong>Separate formula restrictions from physical restrictions.</strong> The rule $h(x)=\sqrt{36-x^2}$ describes the upper semicircle of radius 6. Its real domain is $[-6,6]$ and its range is $[0,6]$: the radicand must be nonnegative, and a square root returns a nonnegative result.</p><p>If a problem uses $x$ as a nonnegative horizontal distance from the center, the physical domain becomes $[0,6]$. The range stays $[0,6]$. If the allowed distance is only $[0,3]$, the range shrinks to $[3\sqrt3,6]$. Find the range from the allowed inputs; a formula alone does not determine the range of a restricted model.</p>`,
    'precalculus:graph-transformations': String.raw`<p><strong>Track a point when horizontal scaling and shifting combine.</strong> Let $g(x)=3f(2(x+1))-4$. For a point $(u,v)$ on $f$, solve $2(x+1)=u$ to obtain $x=u/2-1$. The new output is $3v-4$, so $(u,v)$ becomes $(u/2-1,3v-4)$.</p><p>The parent point $(4,2)$ becomes $(1,2)$, and $(0,0)$ becomes $(-1,-4)$. The graph compresses horizontally by factor $1/2$, shifts left 1, stretches vertically by 3, and shifts down 4. Derive the point rule before describing the moves: the order of a shift and a scaling can change the result.</p>`,
    'precalculus:exponentials-logarithms': String.raw`<p><strong>Match the exponent to the rate period.</strong> A quantity starts at 800 units and retains 90 percent every two days. At the measured times, the model is $A(t)=800(0.9)^{t/2}$, where $t$ is in days. After 6 days, $A(6)=800(0.9)^3=583.2$ units. Using exponent $t$ would incorrectly apply the decrease every day.</p><p>To reach 400 units, solve $0.5=(0.9)^{t/2}$, giving $t=2\ln(0.5)/\ln(0.9)\approx13.16$ days. This fractional time assumes the exponential rule describes change between observations. If the quantity changes only at two-day checkpoints, the first checkpoint at or below 400 is day 14 because seven periods give $800(0.9)^7\approx382.64$.</p>`,
    'precalculus:inverse-functions-modeling': String.raw`<p><strong>Carry the domain into the reverse problem.</strong> Suppose usage $g\geq0$ costs $C(g)=35+12g$ dollars. The output range is $c\geq35$. The inverse is $C^{-1}(c)=(c-35)/12$ with domain $[35,\infty)$ and range $[0,\infty)$.</p><p>A bill of 131 dollars gives 8 units of usage. A bill of 23 dollars would give $-1$ algebraically, but it lies outside the model's range. A discount, credit, or different pricing rule would need its own model. Verify the inverse on its stated domain rather than treating every real bill amount as valid input.</p>`,
    'calculus-1:limits-continuity': String.raw`<p><strong>Use one-sided behavior when simplification changes sign.</strong> For $f(x)=|x|/x$, the rule is $-1$ for $x<0$ and $1$ for $x>0$. The left-hand limit at 0 is $-1$, while the right-hand limit is 1. The two-sided limit does not exist.</p><p>Assigning $f(0)=0$, 1, or any other value cannot make this function continuous at 0 because the nearby limits disagree. This differs from a removable hole such as $(x^2-4)/(x-2)$, whose nearby rule $x+2$ has limit 4. First compare the two sides; then decide whether changing one point can repair the break.</p>`,
    'calculus-1:derivatives': String.raw`<p><strong>Estimate a nearby value and judge the direction of error.</strong> Let $f(x)=\sqrt{x}$. At $a=81$, $f(81)=9$ and $f'(81)=1/(2\sqrt{81})=1/18$. The tangent approximation gives $\sqrt{82}\approx9+(82-81)/18=9.05556$.</p><p>Because $f''(x)=-1/(4x^{3/2})<0$ for $x>0$, the curve is concave down and this tangent estimate lies above the true value. The approximation uses a change of 1 near 81. For a distant target such as 121, choose a closer center or bound the error; a local slope is not a constant rate across the whole domain.</p>`,
    'calculus1:derivative-applications': String.raw`<p><strong>Let the constraint determine the objective.</strong> A rectangular enclosure uses 60 meters of fencing on three sides, with a straight wall forming the fourth side. Let $x$ be each side perpendicular to the wall and $y$ the fenced side parallel to it. Then $2x+y=60$, so $A(x)=x(60-2x)$ for $0<x<30$.</p><p>The derivative $A'(x)=60-4x$ vanishes at $x=15$, giving $y=30$ and area 450 square meters. The second derivative is $-4$, and area approaches 0 at both boundary limits, so this candidate gives the global maximum on the feasible interval. Four fenced sides would require a different constraint and would produce a different answer.</p>`,
    'calculus1:integration-ftc': String.raw`<p><strong>Distinguish net movement from total travel.</strong> Suppose $v(t)=2t-4$ meters per second on $0\leq t\leq5$. Net displacement is $\int_0^5(2t-4)\,dt=[t^2-4t]_0^5=5$ meters.</p><p>Velocity changes sign at $t=2$. The object travels 4 meters in the negative direction before that time and 9 meters in the positive direction afterward. Total distance is $-\int_0^2v(t)\,dt+\int_2^5v(t)\,dt=4+9=13$ meters. Split at every sign change when distance is requested. If an initial position is given, add the signed displacement to it to find the final position.</p>`,
    'calculus-2:taylor-series': String.raw`<p><strong>Choose a degree from an error target.</strong> To approximate $\sin(0.1)$ in radians, use the Maclaurin polynomial $T_4(x)=x-x^3/6$. Its fourth-degree coefficient is zero. The fifth derivative of sine has absolute value at most 1, so Taylor's remainder bound gives $|\sin(0.1)-T_4(0.1)|\leq(0.1)^5/5!=1/12000000$.</p><p>The approximation is $0.1-0.001/6\approx0.099833333$, with error at most $8.34\times10^{-8}$. This bound justifies the digits; merely adding terms does not. For a target farther from zero, recalculate the bound or choose a closer center. Use radians because these derivative coefficients assume radian input.</p>`,
    'calculus2:first-order-differential-equations': String.raw`<p><strong>Read equilibrium before solving.</strong> In a hypothetical tank, water enters at 6 liters per minute and leaves at $0.2V$ liters per minute when the tank holds $V$ liters. While those rates apply and capacity is not exceeded, $V'=6-0.2V$. The equilibrium is $V=30$ liters because inflow equals outflow there.</p><p>For $V(0)=10$, the solution is $V(t)=30-20e^{-0.2t}$. At 5 minutes it holds $30-20/e\approx22.64$ liters. The negative exponent makes the deviation from 30 shrink. An initial value above 30 would approach 30 from above. The constant solution $V\equiv30$ must also be kept when separating variables.</p>`,
    'calculus-3:partial-derivatives': String.raw`<p><strong>Combine two small changes.</strong> Let $f(x,y)=x^2y+3y^2$. At $(2,1)$, $f=7$, $f_x=4$, and $f_y=10$. For $\Delta x=0.1$ and $\Delta y=-0.02$, the linear estimate is $\Delta f\approx4(0.1)+10(-0.02)=0.2$, so $f(2.1,0.98)\approx7.2$.</p><p>Direct substitution gives $7.203$, an error of 0.003. A partial derivative alone would ignore one changing input. The combined approximation requires differentiability near the point and small input changes. If inputs move together over time, use the chain rule $df/dt=f_x x'+f_y y'$ with each rate evaluated at the same time.</p>`,
    'probability-statistics:counting-probability': String.raw`<p><strong>Change the model when replacement changes.</strong> A bag holds 3 red and 2 blue tokens. Draw two uniformly at random without replacement. The probability that both are red is $(3/5)(2/4)=3/10$. Equivalently, count unordered pairs: $\binom32/\binom52=3/10$.</p><p>With replacement, the second draw still has red probability $3/5$, so the probability becomes $(3/5)^2=9/25$. The first draw changes the second probability only in the model without replacement. State which experiment you mean before multiplying probabilities; independence needs a reason.</p>`,
    'probability-statistics:descriptive-statistics': String.raw`<p><strong>Weight a mean by the number of observations.</strong> A hypothetical batch of 10 tasks averages 2 minutes per task. Another batch of 30 tasks averages 4 minutes per task. Together they use $10(2)+30(4)=140$ minutes over 40 tasks, so the combined mean is $140/40=3.5$ minutes.</p><p>The unweighted average $(2+4)/2=3$ gives each batch equal influence and answers a different question. Use weights when group sizes differ. These summaries give total time and mean time, but they cannot recover the individual task times, median, or within-batch spread.</p>`,
    'probability-statistics:conditional-probability-bayes': String.raw`<p><strong>Update the base rate when the population changes.</strong> A hypothetical sorter flags 80 percent of defective parts and 10 percent of good parts. If 5 percent of parts are defective, the probability of a defect given a flag is $0.80(0.05)/[0.80(0.05)+0.10(0.95)]=8/27\approx29.63\%$.</p><p>If a different batch has 30 percent defective parts and the same flag rates apply, the result becomes $0.24/(0.24+0.07)=24/31\approx77.42\%$. Flag accuracy alone does not determine the answer. Recalculate the denominator for the target batch, and verify that the stated flag rates still apply. Conditional probability requires the conditioning event to have positive probability.</p>`,
    'probability-statistics:sampling-inference': String.raw`<p><strong>Identify which uncertainty a larger sample reduces.</strong> At $\hat p=0.64$, a random sample of 100 gives estimated standard error 0.048. A sample of 400 with the same proportion gives $\sqrt{0.64(0.36)/400}=0.024$. Four times as many observations halves the standard error and the approximate margin of error.</p><p>This follows from the $1/\sqrt n$ factor and assumes comparable, sufficiently independent sampling. A larger voluntary poll can keep the same selection bias. A small p-value measures incompatibility of the data with a specified null model; it is not the probability that the null hypothesis is true and does not measure practical importance.</p>`,
    'probability-statistics:correlation-regression': String.raw`<p><strong>Build a fitted line from paired observations.</strong> Consider the hypothetical pairs $(1,4),(2,5),(3,9)$. Their means are $\bar x=2$ and $\bar y=6$. The least-squares slope is $b=\sum(x_i-\bar x)(y_i-\bar y)/\sum(x_i-\bar x)^2=[2+0+3]/[1+0+1]=2.5$. The intercept is $a=6-2.5(2)=1$, so $\hat y=1+2.5x$.</p><p>At $x=2$, the prediction is 6 and the residual is $5-6=-1$. At $x=4$, the line predicts 11, but this extrapolates beyond the observed range 1 to 3. Three observations illustrate the calculation; they do not establish a stable population relationship or justify a causal explanation.</p>`,
    'probability-statistics:random-variables': String.raw`<p><strong>Separate payoff from profit and spread.</strong> Suppose a game pays 10 dollars with probability 0.2 and 0 dollars otherwise, and each play costs 3 dollars. Gross payoff has mean 2 dollars, so net profit has mean $2-3=-1$ dollar per play.</p><p>Gross payoff has $E[X^2]=100(0.2)=20$, so variance is $20-2^2=16$ square dollars and standard deviation is 4 dollars. Subtracting the fixed entry cost changes the mean but leaves the variance unchanged. The next net outcome is 7 or $-3$ dollars, never $-1$. Expected loss summarizes repeated plays under the stated probabilities; it does not promise a loss on each play.</p>`
  };

  Object.entries(applicationCards).forEach(([key, content]) => {
    const guide = window.MATH_SELF_STUDY_GUIDES[key];
    if (!guide || !Array.isArray(guide.cards)) return;
    if (guide.cards.some(card => card.title === 'Application and Adaptation')) return;
    guide.cards.push({ title: 'Application and Adaptation', content });
  });

  const strategyCards = {
    'beginning-algebra:systems-linear': String.raw`<p><strong>Choose elimination from the meaning of the coefficients.</strong> A hypothetical event sells 80 tickets: adult tickets cost 9 dollars and student tickets cost 6 dollars. Receipts total 630 dollars. Let $a$ and $s$ be nonnegative whole-number ticket counts.</p><ol><li>Record two different constraints: $a+s=80$ counts tickets, while $9a+6s=630$ counts dollars.</li><li>Subtract six times the count equation from the receipt equation. This removes the 6-dollar contribution of every ticket and leaves $3a=150$.</li><li>Solve $a=50$, then $s=30$. Elimination fits because an adult ticket contributes exactly 3 more dollars than a student ticket.</li><li>Check both constraints: $50+30=80$ and $9(50)+6(30)=630$. The units also agree: dollars per ticket times tickets gives dollars.</li></ol><p>All-student sales would bring 480 dollars and all-adult sales would bring 720 dollars. Valid receipts lie in that range and change in 3-dollar steps. Receipts of 631 dollars would give $a=151/3$, which violates the count restriction. Review the data or pricing assumptions rather than rounding an invalid solution.</p><p><strong>Try independently:</strong> Keep the prices and total count, but change receipts to 600 dollars. Choose a method, find both counts, and verify the original constraints.</p><details><summary>Check the transfer solution</summary><p>Subtract $6(a+s)=480$ from $9a+6s=600$ to get $3a=120$. The answer is $a=40$, $s=40$. Both counts sum to 80 and give $9(40)+6(40)=600$ dollars.</p></details>`,
    'trigonometry:law-sines-cosines': String.raw`<p><strong>Choose a law from the known side-angle pairs, then test every branch.</strong> Let $A=30^\circ$, $a=10$ centimeters, and $b=12$ centimeters, with each lowercase side opposite its uppercase angle. This is SSA information: the known angle is not between the two known sides.</p><ol><li>Use the Law of Sines because $A$ and its opposite side $a$ are known. It gives $\sin B=b\sin A/a=12(1/2)/10=0.6$.</li><li>In degree mode, the principal answer is $B_1\approx36.87^\circ$. Sine also permits $B_2=180^\circ-B_1\approx143.13^\circ$.</li><li>Check each angle sum. The remaining angles are $C_1\approx113.13^\circ$ and $C_2\approx6.87^\circ$, both positive, so two triangles fit.</li><li>Verify their third sides with another route. The Law of Cosines gives $a^2=b^2+c^2-2bc\cos A$, so $c=6\sqrt3\pm8$, approximately 18.39 or 2.39 centimeters. Pair the longer side with the larger remaining angle.</li></ol><p>The reference height is $h=b\sin A=6$ centimeters. Here $h<a<b$, which allows two triangles. If $a$ were 5 centimeters, it would be shorter than the height and no triangle would fit. A calculator's principal inverse-sine result alone does not classify SSA data.</p><p><strong>Try independently:</strong> Keep $A=30^\circ$ and $b=12$ centimeters. Classify the cases $a=6$ and $a=12$ centimeters. Justify the number of triangles by checking the candidate angles rather than assuming SSA always gives two.</p><details><summary>Check the transfer solution</summary><p>For $a=6$, $\sin B=1$, so $B=90^\circ$ and $C=60^\circ$: one triangle. For $a=12$, $\sin B=1/2$ gives candidates $B=30^\circ$ and $150^\circ$. The first leaves $C=120^\circ$; the second leaves $C=0^\circ$ and is degenerate, so only one triangle is valid.</p></details>`,
    'probability-statistics:conditional-probability-bayes': String.raw`<p><strong>Choose a conditional denominator from the question.</strong> In a hypothetical delivery model, Depot A handles 40 percent of packages and Depot B handles 60 percent. A package is late with probability 0.20 from A and 0.05 from B. Assume these rates apply to the packages being studied.</p><ol><li>Name the target: the probability a late package came from A. The condition is late, so the denominator must include all late packages.</li><li>Use an expected-count representation for 1000 packages. The model gives 400 from A with 80 late, and 600 from B with 30 late.</li><li>Divide the target path by all late paths: $P(A\mid\text{late})=80/(80+30)=8/11\approx72.73\%$.</li><li>Verify with probabilities: $0.40(0.20)/[0.40(0.20)+0.60(0.05)]=8/11$.</li></ol><p>The 20 percent lateness rate from A answers $P(\text{late}\mid A)$, which reverses the requested condition. The expected counts explain the calculation; they are not observed shipment records. If depot shares or lateness rates change, recalculate the paths.</p><p><strong>Try independently:</strong> Under the same model, find the probability an on-time package came from A. Identify the denominator before computing.</p><details><summary>Check the transfer solution</summary><p>The expected on-time counts are $400(0.80)=320$ from A and $600(0.95)=570$ from B. Therefore $P(A\mid\text{on time})=320/(320+570)=32/89\approx35.96\%$. The denominator contains on-time packages only.</p></details>`
  };

  Object.entries(strategyCards).forEach(([key, content]) => {
    const guide = window.MATH_SELF_STUDY_GUIDES[key];
    if (!guide || !Array.isArray(guide.cards)) return;
    if (guide.cards.some(card => card.title === 'Plan, Solve, and Verify')) return;
    guide.cards.push({ title: 'Plan, Solve, and Verify', content });
  });
})();
