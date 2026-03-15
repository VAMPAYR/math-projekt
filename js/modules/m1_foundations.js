/* ============================================================
   MODULE 1: Mathematical Foundations (5 topics, 30 exercises)
   Sources: Foundational Math, Velleman, Margaris
   ============================================================ */
(function() {
if (!window.MATH_MODULES) window.MATH_MODULES = [];
const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

window.MATH_MODULES.push({
id: 'foundations',
order: 1,
title: 'Mathematical Foundations',
description: 'Start here. What numbers are, how arithmetic works, and why. Then: sets, logic, and proof. No prior knowledge needed.',
topics: [

/* TOPIC 1.0: Set Theory */
{
  id: 'set-theory',
  title: 'Set Theory: Operations & Power Sets',
  description: 'Sets are the language of mathematics. Every mathematical object can be defined in terms of sets.',
  prereqRecap: [
    { term: 'Set', definition: 'A well-defined collection of distinct objects, called <strong>elements</strong> or <strong>members</strong>. Notation: $A = \\{1, 2, 3\\}$. $2 \\in A$ means 2 is in $A$.' },
    { term: 'Subset', definition: '$A \\subseteq B$ means every element of $A$ is also in $B$. Example: $\\{1, 2\\} \\subseteq \\{1, 2, 3\\}$.' },
    { term: 'Empty Set', definition: '$\\emptyset = \\{\\}$, the set with no elements. $\\emptyset \\subseteq A$ for every set $A$.' }
  ],
  whyExists: { html: `
    <p><strong>Why set theory?</strong> Sets provide a universal language. Numbers, functions, relations, geometric figures, probability spaces: all are defined using sets.</p>
    ${WHY('Why is this surprising? (Cantors diagonal argument)', '<p>Cantor proved that the set of real numbers is "larger" than the set of natural numbers, even though both are infinite. The proof: suppose you could list all reals $r_1, r_2, \\ldots$ Construct a new number differing from each $r_n$ in its $n$-th digit. This number is not on the list. Contradiction. Therefore no listing is possible.</p>')}
  ` },
  hook: { html: `<div class="callout callout-puzzle"><h4>Puzzle: The Party Problem</h4>
    <p>30 people speak English, 20 speak Spanish, 10 speak both. How many total? The answer is 40, not 50: $30 + 20 - 10 = 40$. This is inclusion-exclusion: $|A \\cup B| = |A| + |B| - |A \\cap B|$.</p></div>` },
  concept: { html: `
    <div class="callout callout-key"><h4>Set Operations</h4>
    <ul>
      <li><strong>Union:</strong> $A \\cup B$ = everything in $A$ or $B$ (or both).</li>
      <li><strong>Intersection:</strong> $A \\cap B$ = everything in BOTH $A$ and $B$.</li>
      <li><strong>Complement:</strong> $A^c$ (or $\\bar{A}$) = everything NOT in $A$ (relative to a universal set $U$).</li>
      <li><strong>Difference:</strong> $A \\setminus B$ = elements in $A$ but NOT in $B$.</li>
      <li><strong>Power Set:</strong> $\\mathcal{P}(A)$ = set of ALL subsets of $A$. If $|A| = n$, then $|\\mathcal{P}(A)| = 2^n$.</li>
    </ul>
    ${WHY('Why $2^n$ subsets?', '<p>For each of the $n$ elements, you have 2 choices: include it or exclude it. By the multiplication principle: $2 \\times 2 \\times \\cdots \\times 2 = 2^n$ total subsets.</p>')}</div>
    <div class="callout callout-key"><h4>De Morgans Laws</h4>
    <p>$(A \\cup B)^c = A^c \\cap B^c$ and $(A \\cap B)^c = A^c \\cup B^c$.</p>
    ${WHY('Intuition', '<p>"Not in the union" means not in $A$ AND not in $B$. "Not in the intersection" means not in $A$ OR not in $B$. Negation swaps union/intersection.</p>')}</div>
  ` },
  definition: { html: `<p><strong>Set:</strong> A well-defined collection of distinct objects. <strong>Cardinality:</strong> $|A|$ = number of elements.</p>` },
  examples: [{
    title: 'Set Operations',
    problem: 'Let $A = \\{1,2,3,4\\}$, $B = \\{3,4,5,6\\}$, $U = \\{1,\\ldots,7\\}$.',
    steps: [
      { title: '$A \\cup B$', content: '$\\{1,2,3,4,5,6\\}$', why: 'Combine all elements from both sets.' },
      { title: '$A \\cap B$', content: '$\\{3,4\\}$', why: 'Only elements in BOTH sets.' },
      { title: '$A^c$', content: '$\\{5,6,7\\}$', why: 'Elements in $U$ not in $A$.' },
      { title: '$|\\mathcal{P}(B)|$', content: '$2^4 = 16$ subsets.', why: '$B$ has 4 elements, so $2^4 = 16$ subsets.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a set?', back: 'An unordered collection of distinct objects. {1,2,3} is a set. Order and repetition do not matter.' },
      { type: 'how', front: 'Union vs Intersection?', back: 'A union B = everything in A or B or both. A intersect B = only things in BOTH. Union combines, intersection filters.' },
      { type: 'why', front: 'Why is the empty set important?', back: 'It is a subset of every set. Without it, many theorems need special cases. It is the identity for union.' },
      { type: 'define', front: 'What does subset mean?', back: 'A is a subset of B means every element of A is also in B. {1,2} is a subset of {1,2,3}.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'If $A = \\{a,b,c\\}$, then $|\\mathcal{P}(A)| = $?', options: ['$3$', '$6$', '$8$', '$9$'], correctIndex: 2, hint: '<p>$2^n$ where $n = |A|$.</p>', correctExplanation: '$|A| = 3$, so $|\\mathcal{P}(A)| = 2^3 = 8$.', wrongExplanations: { 0: '3 is the cardinality of $A$, not its power set.', 1: '$3! = 6$ counts permutations, not subsets.', 3: '$3^2 = 9$. The formula is $2^n$, not $n^2$.' } },
    { difficulty: 'easy', question: '$\\{1,2\\} \\cap \\{2,3\\} = $?', options: ['$\\{1,2,3\\}$', '$\\{2\\}$', '$\\{1,3\\}$', '$\\emptyset$'], correctIndex: 1, hint: '<p>Intersection = elements in BOTH sets.</p>', correctExplanation: 'Only 2 is in both sets.', wrongExplanations: { 0: 'That is the union, not intersection.', 2: '1 is only in the first set, 3 only in the second.', 3: 'They share the element 2.' } },
    { difficulty: 'medium', question: 'Is $\\emptyset \\subseteq \\{1,2,3\\}$?', options: ['Yes', 'No', 'Only if 0 is in the set', 'Undefined'], correctIndex: 0, hint: '<p>The empty set is a subset of every set.</p>', correctExplanation: '$\\emptyset \\subseteq A$ for ALL sets $A$. This is vacuously true: there are no elements in $\\emptyset$ that fail to be in $A$.', wrongExplanations: { 1: 'The empty set IS a subset of every set, by definition.', 2: '0 and $\\emptyset$ are different things.', 3: 'It is well-defined and true.' } },
    { difficulty: 'medium', question: 'By De Morgans law, $(A \\cup B)^c = $?', options: ['$A^c \\cup B^c$', '$A^c \\cap B^c$', '$(A \\cap B)^c$', '$A \\cup B^c$'], correctIndex: 1, hint: '<p>De Morgan swaps $\\cup$ and $\\cap$ and complements both.</p>', correctExplanation: '$(A \\cup B)^c = A^c \\cap B^c$. "Not in the union" means not in A AND not in B.', wrongExplanations: { 0: 'De Morgan swaps union and intersection: $\\cup$ becomes $\\cap$.', 2: '$(A \\cap B)^c$ is different: it equals $A^c \\cup B^c$.', 3: 'Both sets must be complemented.' } },
    { difficulty: 'hard', question: 'If $|A| = 5$ and $|B| = 3$ and $A \\cap B = \\emptyset$, then $|A \\cup B| = $?', options: ['$15$', '$8$', '$2$', '$5$'], correctIndex: 1, hint: '<p>Disjoint sets: $|A \\cup B| = |A| + |B|$.</p>', correctExplanation: 'Since $A \\cap B = \\emptyset$ (disjoint), $|A \\cup B| = 5 + 3 - 0 = 8$.', wrongExplanations: { 0: '$5 \\times 3 = 15$ is the Cartesian product size, not union.', 2: '$5 - 3 = 2$ is the difference in sizes, not the union.', 3: 'The union contains all elements from both sets.' } },
    { difficulty: 'hard', question: 'Which is TRUE for all sets $A, B$?', options: ['$A \\cup B = A \\cap B$', '$A \\subseteq A \\cup B$', '$A \\cup B \\subseteq A$', '$A \\cap B = B$'], correctIndex: 1, hint: '<p>The union always contains at least everything in $A$.</p>', correctExplanation: 'Every element of $A$ is in $A \\cup B$ (by definition of union). So $A \\subseteq A \\cup B$ always.', wrongExplanations: { 0: 'Only if $A = B$.', 2: 'The union is at least as large as $A$, not smaller.', 3: 'Only if $B \\subseteq A$.' } }
  ,

    {
      question: 'If A = {1,2,3} and B = {2,3,4}, what is A intersect B?',
      type: 'mc',
      options: ['{2,3}', '{1,2,3,4}', '{1,4}', '{2}'],
      correctIndex: 0,
      solution: { steps: ['A intersect B contains only elements in BOTH sets.', 'Common elements: 2 and 3.', 'A intersect B = {2,3}.'] }
    },
    {
      question: 'If A = {1,2,3} and B = {2,3,4}, what is A union B?',
      type: 'mc',
      options: ['{1,2,3,4}', '{2,3}', '{1,4}', '{1,2,3}'],
      correctIndex: 0,
      solution: { steps: ['A union B contains all elements in EITHER set.', 'Combine without duplicates: {1,2,3,4}.'] }
    }
    ],
  freeResponse: [
    { difficulty: 'easy', question: 'If $A = \\{1, 2, 3, 4, 5\\}$, what is $|A|$?', accept: [5, '5'], placeholder: 'Enter a number', explanation: 'The cardinality $|A|$ counts the elements. $A$ has 5 elements.' },
    { difficulty: 'easy', question: 'If $A = \\{a, b\\}$, how many subsets does $A$ have?', accept: [4, '4'], placeholder: 'Enter a number', hint: '<p>$2^n$ where $n = |A|$.</p>', explanation: '$2^2 = 4$. The subsets: $\\emptyset, \\{a\\}, \\{b\\}, \\{a,b\\}$.' },
    { difficulty: 'medium', question: 'If $|A| = 10$ and $|B| = 7$ and $|A \\cap B| = 3$, what is $|A \\cup B|$?', accept: [14], placeholder: 'Enter a number', hint: '<p>Inclusion-exclusion: $|A \\cup B| = |A| + |B| - |A \\cap B|$.</p>', explanation: '$10 + 7 - 3 = 14$.', solution: '$|A \\cup B| = |A| + |B| - |A \\cap B| = 10 + 7 - 3 = 14$.' },
    { difficulty: 'hard', question: 'How many elements are in $\\mathcal{P}(\\{1,2,3,4,5\\})$?', accept: [32], placeholder: 'Enter a number', explanation: '$2^5 = 32$.' },
    { difficulty: 'easy', question: '$12 \\div 4 =$?', accept: [3, '3'], placeholder: 'Number', explanation: '$12 \\div 4 = 3$.' },
    { difficulty: 'medium', question: 'What is the GCF of 24 and 36?', accept: [12, '12'], placeholder: 'Number', explanation: '$24 = 2^3 \\cdot 3$, $36 = 2^2 \\cdot 3^2$. GCF $= 2^2 \\cdot 3 = 12$.' },
    { difficulty: 'medium', question: 'Is $\\sqrt{2}$ rational or irrational?', accept: ['irrational'], placeholder: 'Type', explanation: '$\\sqrt{2}$ cannot be expressed as a ratio of integers. Its decimal expansion is non-repeating.' },
    { difficulty: 'hard', question: 'Between which two consecutive integers does $\\sqrt{50}$ lie?', accept: ['7 and 8', '7,8'], placeholder: 'Integers', explanation: '$7^2 = 49 < 50 < 64 = 8^2$. So $7 < \\sqrt{50} < 8$.' },
    { difficulty: 'easy', question: 'The natural numbers start from:', accept: [1, '1'], placeholder: 'Number', explanation: '$\\mathbb{N} = \\{1, 2, 3, \\ldots\\}$.' },
    { difficulty: 'easy', question: 'The integers include positive, negative, and:', accept: ['zero', '0'], placeholder: 'Number', explanation: '$\\mathbb{Z} = \\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$.' },
    { difficulty: 'hard', question: 'Cantor proved that $|\\mathbb{R}| > |\\mathbb{N}|$ using what technique?', accept: ['diagonalization', 'diagonal argument', 'Cantors diagonal'], placeholder: 'Method', explanation: 'Cantors diagonal argument: construct a real not in any proposed listing.' },
    { difficulty: 'hard', question: 'Cartesian product: $|\\{1,2\\} \\times \\{a,b,c\\}| =$?', accept: [6, '6'], placeholder: 'Number', explanation: '$|A \\times B| = |A| \\cdot |B| = 2 \\times 3 = 6$.' },
    { difficulty: 'medium', question: 'Symmetric difference $A \\triangle B$ contains elements in $A$ or $B$ but not:', accept: ['both'], placeholder: 'What?', explanation: '$A \\triangle B = (A \\setminus B) \\cup (B \\setminus A)$. Elements in exactly one set.' },
    { difficulty: 'medium', question: 'Is $\\emptyset$ a subset of itself?', accept: ['yes'], placeholder: 'yes/no', explanation: '$\\emptyset \\subseteq \\emptyset$ is vacuously true.' },
    { difficulty: 'hard', question: '$|\\mathbb{N}| = |\\mathbb{Z}|$? (same cardinality?)', accept: ['yes'], placeholder: 'yes/no', explanation: 'Both are countably infinite. Bijection exists: $f(n) = 0, 1, -1, 2, -2, \\ldots$' },
    { difficulty: 'hard', question: 'Russell\'s paradox: the set of all sets that do not contain themselves leads to a:', accept: ['contradiction', 'paradox'], placeholder: 'Result', explanation: 'Let $R = \\{S : S \\notin S\\}$. If $R \\in R$, then $R \\notin R$ (contradiction). If $R \\notin R$, then $R \\in R$ (contradiction).' },
    { difficulty: 'medium', question: 'Injection (one-to-one): $f(a) = f(b)$ implies:', accept: ['a = b', 'a=b'], placeholder: 'Conclusion', explanation: 'Injective: distinct inputs map to distinct outputs.' },
    { difficulty: 'medium', question: 'Surjection (onto): every element in the codomain has at least one:', accept: ['preimage', 'input'], placeholder: 'What?', explanation: 'Surjective: range = codomain.' },
    { difficulty: 'hard', question: 'Bijection = injection + surjection. Bijection implies _____ exists.', accept: ['inverse', 'inverse function'], placeholder: 'What?', explanation: 'Bijective: one-to-one and onto. Inverse function exists.' },
    { difficulty: 'medium', question: 'Partition of set $A$: a collection of non-empty subsets that are pairwise:', accept: ['disjoint'], placeholder: 'Property', explanation: 'Partition: pairwise disjoint subsets whose union is $A$.' },
    { difficulty: 'hard', question: 'Zorn\'s lemma: every totally ordered subset has an upper bound implies the set has a:', accept: ['maximal element'], placeholder: 'What?', explanation: 'Zorn\'s lemma: used to prove existence of maximal elements.' },
    { difficulty: 'medium', question: 'A countable set can be put in one-to-one correspondence with:', accept: ['N', 'natural numbers', '\\mathbb{N}'], placeholder: 'Set', explanation: 'Countable: bijection with $\\mathbb{N}$ (or is finite).' },
    { difficulty: 'hard', question: 'Cantor-Schroder-Bernstein theorem: if injections $A \\to B$ and $B \\to A$ both exist, then:', accept: ['|A|=|B|', 'A and B have same cardinality'], placeholder: 'Conclusion', explanation: 'CSB: mutual injection implies bijection.' },
    { difficulty: 'medium', question: 'Function composition: $(f \\circ g)(x) = f($ ? $(x))$', accept: ['g'], placeholder: 'Inside', explanation: '$(f \\circ g)(x) = f(g(x))$.' },
    { difficulty: 'hard', question: 'Axiom of choice: states that from any family of nonempty sets, we can choose one element from:', accept: ['each'], placeholder: 'How many?', explanation: 'AC: a choice function exists selecting one element from each set.' },
    { difficulty: 'medium', question: 'Ordinal numbers describe:', accept: ['position', 'order'], placeholder: 'What?', explanation: 'Ordinals: first, second, third. Cardinals (1, 2, 3) count quantity.' },
    { difficulty: 'hard', question: 'Continuum hypothesis: is there a set with cardinality strictly between $|\\mathbb{N}|$ and $|\\mathbb{R}|$?', accept: ['undecidable', 'independent'], placeholder: 'Status', explanation: 'CH is independent of ZFC (proven by Godel and Cohen).' },
    { difficulty: 'medium', question: 'Equivalence relation has three properties: reflexive, symmetric, and:', accept: ['transitive'], placeholder: 'Third', explanation: 'Equivalence: reflexive ($a \\sim a$), symmetric ($a \\sim b \\Rightarrow b \\sim a$), transitive ($a \\sim b, b \\sim c \\Rightarrow a \\sim c$).' },
    { difficulty: 'hard', question: 'Ultrafilter in set theory: a maximal:', accept: ['filter'], placeholder: 'What?', explanation: 'Ultrafilter: a filter that cannot be properly extended.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each set operation to its meaning:', pairs: [
      { left: '$A \\cup B$', right: 'Elements in A or B' },
      { left: '$A \\cap B$', right: 'Elements in both A and B' },
      { left: '$A^c$', right: 'Elements not in A' },
      { left: '$A \\setminus B$', right: 'Elements in A but not B' },
      { left: '$\\mathcal{P}(A)$', right: 'Set of all subsets of A' }
    ] }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Prove that $A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$ by showing element membership.', steps: [
      { content: 'Let $x \\in A \\cap (B \\cup C)$.' },
      { content: 'Then $x \\in A$ AND $x \\in B \\cup C$.' },
      { content: 'So $x \\in A$ AND ($x \\in B$ OR $x \\in C$).' },
      { content: 'Case 1: $x \\in A$ and $x \\in B$, so $x \\in A \\cap B$.' },
      { content: 'Case 2: $x \\in A$ and $x \\in C$, so $x \\in A \\cap C$.' },
      { content: 'Therefore $x \\in (A \\cap B) \\cup (A \\cap C)$. $\\blacksquare$' },
    { difficulty: 'hard', question: 'Prove by contradiction: $\\sqrt{2}$ is irrational.', steps: [
      { content: 'Assume $\\sqrt{2} = p/q$ in lowest terms.' },
      { content: '$2 = p^2/q^2$, so $p^2 = 2q^2$. Then $p$ is even.' },
      { content: 'Let $p = 2k$. Then $4k^2 = 2q^2$, so $q^2 = 2k^2$. Then $q$ is even.' },
      { content: 'Contradiction: $p/q$ was supposed to be in lowest terms, but both are even.' }
    ], explanation: 'Proof by contradiction: assume the opposite and derive a logical impossibility.' }
    ], explanation: 'This proves the distributive law for sets by element-chasing.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'In a class of 100 students: 60 take math, 45 take physics, 20 take both.', parts: [
      { question: 'How many take math or physics (or both)?', accept: [85], placeholder: 'Number', explanation: '$60 + 45 - 20 = 85$ by inclusion-exclusion.' },
      { question: 'How many take neither?', accept: [15], placeholder: 'Number', explanation: '$100 - 85 = 15$.' },
      { question: 'How many take math but NOT physics?', accept: [40], placeholder: 'Number', explanation: '$60 - 20 = 40$ (math only).' },
      { question: 'How many take physics but NOT math?', accept: [25], placeholder: 'Number', explanation: '$45 - 20 = 25$ (physics only).' },
    { difficulty: 'medium', question: 'Classify these numbers.', parts: [
      { question: 'Is $-3$ an integer?', accept: ['yes'], placeholder: 'yes/no', explanation: '$-3 \\in \\mathbb{Z}$.' },
      { question: 'Is $0.333...$ rational?', accept: ['yes'], placeholder: 'yes/no', explanation: '$0.\\overline{3} = 1/3 \\in \\mathbb{Q}$.' },
      { question: 'Is $\\pi$ rational?', accept: ['no'], placeholder: 'yes/no', explanation: '$\\pi$ is irrational.' }
    ], completionMessage: 'Integers $\\subset$ Rationals $\\subset$ Reals.' }
    ], completionMessage: 'Inclusion-exclusion mastered! This technique extends to 3+ sets.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>Set Theory Strategy</h4>
    <ol><li>$\\cup$ = OR (combine). $\\cap$ = AND (overlap). Complement = NOT.</li>
    <li>Inclusion-Exclusion: $|A \\cup B| = |A| + |B| - |A \\cap B|$.</li>
    <li>Power set: $2^n$ subsets for $n$ elements.</li></ol></div>` }
},

/* TOPIC 1.1: Number Systems */
{
  id: 'number-systems',
  title: 'Number Systems & Real Number Properties',
  description: 'From counting to the continuum: how each number system was constructed to solve problems the previous one could not.',
  prereqRecap: [
    { term: 'Number', definition: 'An abstract object used to count, measure, or label. The simplest numbers (1, 2, 3, ...) are the <strong>natural numbers</strong>.' },
    { term: 'Operation', definition: 'A rule that takes numbers and produces another number: addition (+), subtraction, multiplication, division.' },
    { term: 'Equation', definition: 'A statement that two expressions are equal, written with $=$. Example: $2 + 3 = 5$.' }
  ],
  whyExists: { html: `
    <p><strong>Why do we need different number systems?</strong> Every number system has equations it cannot solve.</p>
    <ul>
      <li>$x + 3 = 3$: No natural number works. We need <strong>zero</strong> and the <strong>integers</strong> $\\mathbb{Z}$.</li>
      <li>$2x = 1$: No integer works. We need <strong>rationals</strong> $\\mathbb{Q}$.</li>
      <li>$x^2 = 2$: No rational works. We need <strong>irrationals</strong>, completing $\\mathbb{R}$.</li>
      <li>$x^2 = -1$: No real works. We need <strong>complex numbers</strong> $\\mathbb{C}$.</li>
    </ul>
    ${WHY('Why is the square root of 2 irrational?', '<p>Proof by contradiction: Suppose $\\sqrt{2} = p/q$ in lowest terms. Then $2q^2 = p^2$, so $p^2$ is even, so $p$ is even ($p = 2k$). Then $2q^2 = 4k^2$, so $q^2 = 2k^2$, so $q$ is even. But both $p$ and $q$ even contradicts "lowest terms." Therefore $\\sqrt{2}$ is irrational.</p>')}
  ` },
  hook: { html: `<div class="callout callout-puzzle"><h4>Puzzle</h4>
    <p>Can you find a fraction $p/q$ (with integers $p, q$) such that $(p/q)^2 = 2$? Try a few: $1/1, 3/2, 7/5, 17/12, ...$</p>
    <p>Each gets closer but never equals $\\sqrt{2}$ exactly. This is because $\\sqrt{2}$ is <strong>irrational</strong>: it cannot be expressed as a ratio of integers.</p></div>` },
  formalDefinitions: [
      { term: 'Natural Numbers', symbol: '$\\mathbb{N}$', definition: 'The set $\\{1, 2, 3, \\ldots\\}$ (or $\\{0, 1, 2, \\ldots\\}$ in some conventions). Closed under addition and multiplication.' },
      { term: 'Integers', symbol: '$\\mathbb{Z}$', definition: 'The set $\\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$. Extends $\\mathbb{N}$ to include additive inverses. Closed under addition, subtraction, and multiplication.' },
      { term: 'Rational Numbers', symbol: '$\\mathbb{Q}$', definition: 'Numbers expressible as $\\frac{p}{q}$ where $p, q \\in \\mathbb{Z}$ and $q \\neq 0$. All terminating and repeating decimals are rational.' },
      { term: 'Real Numbers', symbol: '$\\mathbb{R}$', definition: 'The complete ordered field. Includes all rationals and irrationals. Every Cauchy sequence of reals converges to a real number (completeness axiom).' },
      { term: 'Complex Numbers', symbol: '$\\mathbb{C}$', definition: 'Numbers of the form $a + bi$ where $a, b \\in \\mathbb{R}$ and $i^2 = -1$. Algebraically closed: every non-constant polynomial has a root in $\\mathbb{C}$.' }
    ],
    background: {
      title: 'Where Do Numbers Come From?',
      content: '<p>Humans invented counting before writing. Tally marks on bones date to 30,000 BCE. The concept of <strong>zero</strong> as a number (not just a placeholder) was independently discovered by Babylonians, Mayans, and Indians. The Indian mathematician <strong>Brahmagupta</strong> (628 CE) was the first to formalize rules for zero: any number plus zero equals itself, any number times zero equals zero.</p><p><strong>Negative numbers</strong> were resisted in Europe for centuries. As late as the 1700s, mathematicians called them "absurd" or "fictitious." Today, they are essential: bank balances, temperatures below zero, and debts all require negative numbers.</p><p><strong>Irrational numbers</strong> were discovered by the Pythagoreans around 500 BCE when they proved $\\sqrt{2}$ cannot be written as a fraction. This discovery reportedly caused a crisis in their philosophy, since they believed all reality was built from whole-number ratios.</p>'
    },
    mathGrammar: [
      { question: 'What does the symbol "$\\in$" mean?', answer: '"Is an element of." When we write $3 \\in \\mathbb{Z}$, we are saying "3 belongs to the set of integers." Think of it as saying this thing lives inside this group.' },
      { question: 'What is a set?', answer: 'A collection of distinct objects (just a group of things), written with curly braces. $\\{1, 2, 3\\}$ is a set. The order does not matter: $\\{3, 1, 2\\}$ is the same set. No duplicates allowed.' },
      { question: 'Why do we need different number sets?', answer: 'Each number set was invented because the previous one could not handle something. $\\mathbb{N}$ cannot represent \"nothing\" (so we added $0$). $\\mathbb{Z}$ allows debts (negative). $\\mathbb{Q}$ allows division results. $\\mathbb{R}$ fills in the gaps ($\\sqrt{2}$). $\\mathbb{C}$ allows $\\sqrt{-1}$.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 500 80" width="500" height="80" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="40" x2="480" y2="40" stroke="#94a3b8" stroke-width="2"/>
  <polygon points="480,40 470,35 470,45" fill="#94a3b8"/>
  <line x1="80" y1="33" x2="80" y2="47" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="80" y="65" fill="#e2e8f0" font-size="13" text-anchor="middle" font-family="Inter,sans-serif">-3</text><line x1="130" y1="33" x2="130" y2="47" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="130" y="65" fill="#e2e8f0" font-size="13" text-anchor="middle" font-family="Inter,sans-serif">-2</text><line x1="180" y1="33" x2="180" y2="47" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="180" y="65" fill="#e2e8f0" font-size="13" text-anchor="middle" font-family="Inter,sans-serif">-1</text><line x1="230" y1="33" x2="230" y2="47" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="230" y="65" fill="#e2e8f0" font-size="13" text-anchor="middle" font-family="Inter,sans-serif">0</text><line x1="280" y1="33" x2="280" y2="47" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="280" y="65" fill="#e2e8f0" font-size="13" text-anchor="middle" font-family="Inter,sans-serif">1</text><line x1="330" y1="33" x2="330" y2="47" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="330" y="65" fill="#e2e8f0" font-size="13" text-anchor="middle" font-family="Inter,sans-serif">2</text><line x1="380" y1="33" x2="380" y2="47" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="380" y="65" fill="#e2e8f0" font-size="13" text-anchor="middle" font-family="Inter,sans-serif">3</text><line x1="430" y1="33" x2="430" y2="47" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="430" y="65" fill="#e2e8f0" font-size="13" text-anchor="middle" font-family="Inter,sans-serif">4</text>
  <circle cx="205" cy="40" r="5" fill="#3b82f6"/>
  <text x="205" y="25" fill="#3b82f6" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">½</text>
  <circle cx="350" cy="40" r="5" fill="#10b981"/>
  <text x="350" y="25" fill="#10b981" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">√2≈1.41</text>
  <circle cx="262" cy="40" r="5" fill="#f59e0b"/>
  <text x="262" y="25" fill="#f59e0b" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">π/4≈0.79</text>
</svg>
</div>
<p class="math-diagram-label">The number line: integers at tick marks, with ½, √2, and π/4 between them</p>

    <div class="callout callout-key"><h4>The Number System Hierarchy</h4>
    <p>$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}$</p>
    <ul>
      <li>$\\mathbb{N} = \\{0, 1, 2, 3, \\ldots\\}$ (Natural numbers: counting)</li>
      <li>$\\mathbb{Z} = \\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$ (Integers: include negatives)</li>
      <li>$\\mathbb{Q} = \\{p/q : p, q \\in \\mathbb{Z}, q \\neq 0\\}$ (Rationals: fractions)</li>
      <li>$\\mathbb{R}$ = rationals $\\cup$ irrationals (Real numbers: the complete number line)</li>
      <li>$\\mathbb{C} = \\{a + bi : a, b \\in \\mathbb{R}\\}$ where $i^2 = -1$ (Complex numbers)</li>
    </ul></div>
    <div class="callout callout-key"><h4>Field Axioms (Properties of $\\mathbb{R}$)</h4>
    <p>For all $a, b, c \\in \\mathbb{R}$:</p>
    <ul>
      <li><strong>Commutativity:</strong> $a + b = b + a$ and $a \\cdot b = b \\cdot a$</li>
      <li><strong>Associativity:</strong> $(a + b) + c = a + (b + c)$</li>
      <li><strong>Distributivity:</strong> $a(b + c) = ab + ac$</li>
      <li><strong>Identity:</strong> $a + 0 = a$ and $a \\cdot 1 = a$</li>
      <li><strong>Inverse:</strong> $a + (-a) = 0$ and $a \\cdot (1/a) = 1$ (for $a \\neq 0$)</li>
    </ul>
    ${WHY('Why do these matter?', '<p>Every algebraic manipulation you perform (adding to both sides, factoring, distributing) is justified by one of these axioms. They are the "rules of the game" for algebra. Any system satisfying all these axioms is called a <strong>field</strong>.</p>')}</div>
  
    ${WHY('Why was zero invented?', '<p>The concept of "nothing" as a number was revolutionary. Indian mathematicians (Brahmagupta, 7th century) first treated zero as a number with its own arithmetic rules: a + 0 = a, a * 0 = 0. Without zero, we have no place-value system: 103 would be ambiguous (is it 13? 130?).</p>')}
    ${WHY('Why do we need complex numbers?', '<p>x^2 + 1 = 0 has no real solution (no real number squared gives -1). Define i = sqrt(-1). Now x = i and x = -i are solutions. Complex numbers complete algebra: EVERY polynomial of degree n has exactly n complex roots (Fundamental Theorem of Algebra).</p>')}` },
  definition: { html: `<p><strong>Field:</strong> A set with two operations (+, $\\cdot$) satisfying commutativity, associativity, distributivity, identity, and inverse axioms.</p>` },
  examples: [{
    title: 'Classifying Numbers',
    problem: 'Classify each number: $-3$, $\\frac{2}{7}$, $\\sqrt{5}$, $3 + 4i$.',
    steps: [
      { title: '$-3$', content: '$-3 \\in \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$. Integer, rational, real.', why: '$-3 = -3/1$, so it is also rational.' },
      { title: '$2/7$', content: '$2/7 \\in \\mathbb{Q} \\subset \\mathbb{R}$. Rational, real. Not an integer.', why: 'It is a ratio of integers with $q \\neq 0$.' },
      { title: '$\\sqrt{5}$', content: '$\\sqrt{5} \\in \\mathbb{R} \\setminus \\mathbb{Q}$. Irrational, real.', why: 'By the same proof technique as $\\sqrt{2}$, $\\sqrt{5}$ cannot be expressed as $p/q$.' },
      { title: '$3 + 4i$', content: '$3 + 4i \\in \\mathbb{C}$. Complex. Not real (since $b = 4 \\neq 0$).', why: 'A complex number with nonzero imaginary part is not a real number.' }
    ]
  },
  {
    title: 'Using Field Axioms to Simplify',
    problem: 'Simplify $3(x + 4) - 2(x - 1)$ and justify each step with the appropriate axiom.',
    steps: [
      { title: 'Distribute (Distributive Property)', content: '$3 \\cdot x + 3 \\cdot 4 - 2 \\cdot x - 2 \\cdot (-1) = 3x + 12 - 2x + 2$.', why: '$a(b + c) = ab + ac$. Applied twice: once for $3(x+4)$ and once for $-2(x-1)$. Note: $-2 \\cdot (-1) = +2$ by the rule $(-a)(-b) = ab$.' },
      { title: 'Combine like terms (Commutativity + Associativity)', content: '$(3x - 2x) + (12 + 2) = x + 14$.', why: 'Commutativity lets us reorder: $3x + 12 - 2x + 2 = 3x - 2x + 12 + 2$. Associativity lets us group the $x$-terms and the constants.' },
      { title: 'Result', content: '$3(x + 4) - 2(x - 1) = x + 14$.', why: 'Every step is justified by a field axiom. This is why "algebra works."' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What are Natural Numbers?', back: 'N = {1, 2, 3, ...}. The counting numbers, starting from 1.' },
      { type: 'define', front: 'What are Integers?', back: 'Z = {..., -2, -1, 0, 1, 2, ...}. Naturals plus zero plus negatives.' },
      { type: 'why', front: 'Why were negative numbers invented?', back: 'To make subtraction always possible. Without negatives, 3 - 5 has no answer.' },
      { type: 'why', front: 'Why do irrational numbers exist?', back: 'The diagonal of a unit square is sqrt(2), which cannot be written as any fraction a/b.' },
      { type: 'define', front: 'What is a real number?', back: 'Any point on the number line. Includes all rationals and irrationals. Denoted R.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'Which set does $\\frac{7}{3}$ belong to?', options: ['$\\mathbb{N}$', '$\\mathbb{Z}$', '$\\mathbb{Q}$', '$\\mathbb{R} \\setminus \\mathbb{Q}$'], correctIndex: 2, hint: '<p>Is it a ratio of two integers?</p>', correctExplanation: '$7/3$ is a ratio of integers ($7$ and $3$), so it belongs to $\\mathbb{Q}$ (rationals).', wrongExplanations: { 0: '$7/3 \\approx 2.33$ is not a counting number.', 1: '$7/3$ is not a whole number.', 3: 'It CAN be written as $p/q$, so it is rational, not irrational.' } },
    { difficulty: 'easy', question: 'The additive identity is:', options: ['$1$', '$0$', '$-1$', '$\\infty$'], correctIndex: 1, hint: '<p>What number, when added to any $a$, gives $a$ back?</p>', correctExplanation: '$a + 0 = a$ for all $a$. Zero is the additive identity.', wrongExplanations: { 0: '1 is the multiplicative identity ($a \\cdot 1 = a$).', 2: '$-1$ is the additive inverse of 1, not an identity.', 3: '$\\infty$ is not a real number.' } },
    { difficulty: 'medium', question: 'Which property justifies: $3(x + 5) = 3x + 15$?', options: ['Associativity', 'Commutativity', 'Distributivity', 'Identity'], correctIndex: 2, hint: '<p>$a(b + c) = ab + ac$.</p>', correctExplanation: 'Distributive property: $3(x + 5) = 3 \\cdot x + 3 \\cdot 5 = 3x + 15$.', wrongExplanations: { 0: 'Associativity changes grouping: $(a+b)+c = a+(b+c)$.', 1: 'Commutativity changes order: $a + b = b + a$.', 3: 'Identity involves adding 0 or multiplying by 1.' } },
    { difficulty: 'medium', question: '$\\sqrt{4}$ is:', options: ['Irrational', 'Rational', 'Complex', 'Undefined'], correctIndex: 1, hint: '<p>$\\sqrt{4} = ?$</p>', correctExplanation: '$\\sqrt{4} = 2$, which is an integer (and therefore rational).', wrongExplanations: { 0: 'Not all square roots are irrational. $\\sqrt{4} = 2$ is rational.', 2: 'It is real, and all reals are complex ($2 = 2 + 0i$), but "rational" is more specific.', 3: '$\\sqrt{4}$ is perfectly defined as 2.' } },
    { difficulty: 'hard', question: 'Is $\\pi + e$ rational or irrational?', options: ['Rational', 'Irrational', 'Unknown (open problem)', 'Complex'], correctIndex: 2, hint: '<p>Both $\\pi$ and $e$ are individually irrational, but does their sum have to be?</p>', correctExplanation: 'It is an open problem in mathematics. While $\\pi$ and $e$ are each irrational, whether $\\pi + e$ is irrational is unproven as of 2024.', wrongExplanations: { 0: 'No proof exists that $\\pi + e$ is rational.', 1: 'While widely believed to be irrational, no proof exists.', 3: '$\\pi + e$ is a real number, not complex with nonzero imaginary part.' } },
    { difficulty: 'hard', question: 'The set $\\mathbb{Q}$ is closed under which operation?', options: ['Square root', 'Addition', 'Both', 'Neither'], correctIndex: 1, hint: '<p>Is the sum of two rationals always rational? Is $\\sqrt{p/q}$ always rational?</p>', correctExplanation: '$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd} \\in \\mathbb{Q}$. But $\\sqrt{1/2} = \\frac{1}{\\sqrt{2}}$ is irrational. Closed under addition, not square root.', wrongExplanations: { 0: '$\\sqrt{2/1} = \\sqrt{2}$ is irrational. Not closed under square root.', 2: 'Only addition (and subtraction, multiplication, division by nonzero).', 3: 'Addition IS closed: sum of two rationals is always rational.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'What is the additive inverse of $-7$?', accept: [7, '7'], placeholder: 'Enter a number', hint: '<p>The additive inverse of $a$ is $-a$, the number that gives 0 when added to $a$.</p>', explanation: '$-7 + 7 = 0$, so the additive inverse of $-7$ is $7$.', solution: '$-(-7) = 7$. Verify: $-7 + 7 = 0$. ✓' },
    { difficulty: 'easy', question: 'What is the multiplicative identity?', accept: [1, '1'], placeholder: 'Enter a number', explanation: '$a \\cdot 1 = a$ for all $a$.' },
    { difficulty: 'medium', question: 'Simplify using the distributive property: $5(x + 3) - 2x$', accept: ['3x+15', '3x + 15'], placeholder: 'e.g. 3x+15', inputHelp: 'Write as ax+b', hint: '<p>Distribute: $5 \\cdot x + 5 \\cdot 3 = 5x + 15$. Then subtract $2x$.</p>', explanation: '$5x + 15 - 2x = 3x + 15$.', solution: '$5(x+3) - 2x = 5x + 15 - 2x = 3x + 15$' },
    { difficulty: 'medium', question: 'Is $\\sqrt{9}$ rational or irrational? Type "rational" or "irrational".', accept: ['rational'], placeholder: 'rational or irrational', explanation: '$\\sqrt{9} = 3$, which is an integer and therefore rational.' },
    { difficulty: 'hard', question: 'The multiplicative inverse of $\\frac{3}{5}$ is $\\frac{a}{b}$. What is $a + b$?', accept: [8], placeholder: 'Enter a number', hint: '<p>The multiplicative inverse of $\\frac{p}{q}$ is $\\frac{q}{p}$.</p>', explanation: 'Inverse of $\\frac{3}{5}$ is $\\frac{5}{3}$. So $a + b = 5 + 3 = 8$.', solution: '$\\frac{3}{5} \\cdot \\frac{5}{3} = 1$. Answer: $5 + 3 = 8$.' },
    { difficulty: 'hard', question: 'If $a \\cdot b = 0$, and $a \\neq 0$, what is $b$?', accept: [0, '0'], placeholder: 'Enter a number', explanation: 'By the zero product property, if $ab = 0$ and $a \\neq 0$, then $b = 0$.' },
    { difficulty: 'easy', question: 'Is $\\pi$ rational or irrational?', accept: ['irrational'], placeholder: 'rational/irrational', explanation: '$\\pi$ cannot be expressed as a fraction. It is irrational.' },
    { difficulty: 'medium', question: '$|-7| =$?', accept: [7, '7'], placeholder: 'Number', explanation: 'Absolute value strips the sign: $|-7| = 7$.' },
    { difficulty: 'medium', question: 'Absolute value: $|-7| =$?', accept: [7, '7'], placeholder: 'Number', explanation: '$|-7| = 7$. Absolute value removes the sign.' },
    { difficulty: 'hard', question: 'The additive identity is:', accept: [0, '0'], placeholder: 'Number', explanation: '$a + 0 = a$ for all $a$. Zero is the additive identity.' },
    { difficulty: 'medium', question: 'The multiplicative identity is:', accept: [1, '1'], placeholder: 'Number', explanation: '$a \\times 1 = a$ for all $a$.' },
    { difficulty: 'easy', question: 'The commutative property: $a + b = $?', accept: ['b+a', 'b + a'], placeholder: 'Expression', explanation: '$a + b = b + a$. Addition is commutative.' },
    { difficulty: 'hard', question: 'The associative property of multiplication: $(ab)c =$?', accept: ['a(bc)', 'abc'], placeholder: 'Expression', explanation: '$(ab)c = a(bc)$.' },
    { difficulty: 'medium', question: 'LCM of 12 and 18:', accept: [36, '36'], placeholder: 'Number', explanation: '$12 = 2^2 \\cdot 3$, $18 = 2 \\cdot 3^2$. LCM $= 2^2 \\cdot 3^2 = 36$.' },
    { difficulty: 'easy', question: '$(-3)(-4) =$?', accept: [12, '12'], placeholder: 'Number', explanation: 'Negative times negative is positive: $12$.' },
    { difficulty: 'medium', question: 'The distributive property: $a(b + c) =$?', accept: ['ab+ac', 'ab + ac'], placeholder: 'Expression', explanation: '$a(b+c) = ab + ac$.' },
    { difficulty: 'hard', question: 'Triangle inequality: $|a + b| \\leq |a| +$ ?', accept: ['|b|', 'abs(b)'], placeholder: 'Expression', explanation: '$|a + b| \\leq |a| + |b|$.' },
    { difficulty: 'easy', question: 'Order of operations mnemonic: PEMDAS. P stands for:', accept: ['parentheses'], placeholder: 'Word', explanation: 'Parentheses, Exponents, Multiplication/Division, Addition/Subtraction.' },
    { difficulty: 'medium', question: '$(a + b)(a + b) =$?', accept: ['a^2+2ab+b^2'], placeholder: 'Expression', explanation: '$a^2 + 2ab + b^2$. Perfect square trinomial.' },
    { difficulty: 'hard', question: 'Floor function: $\\lfloor 3.7 \\rfloor =$?', accept: [3, '3'], placeholder: 'Number', explanation: 'Floor: greatest integer $\\leq 3.7$. $\\lfloor 3.7 \\rfloor = 3$.' },
    { difficulty: 'easy', question: '$|-12| =$?', accept: [12, '12'], placeholder: 'Number', explanation: '$|-12| = 12$.' },
    { difficulty: 'hard', question: 'Well-ordering principle: every nonempty set of _____ has a least element.', accept: ['positive integers', 'natural numbers'], placeholder: 'Set', explanation: 'Well-ordering: foundation for proofs by strong induction.' },
    { difficulty: 'easy', question: 'Prime number: divisible only by 1 and:', accept: ['itself'], placeholder: 'What?', explanation: 'Prime: exactly two factors, 1 and itself.' },
    { difficulty: 'hard', question: 'Fundamental Theorem of Arithmetic: every integer $> 1$ has a unique _____ factorization.', accept: ['prime'], placeholder: 'Type', explanation: 'FTA: unique prime factorization (up to order).' },
    { difficulty: 'easy', question: 'Even number $\\div$ 2 = integer. Is 14 even?', accept: ['yes'], placeholder: 'yes/no', explanation: '$14 / 2 = 7$. Yes.' },
    { difficulty: 'hard', question: 'Euler\'s totient: $\\phi(12) =$? (count integers $1 \\leq k \\leq 12$ coprime to 12)', accept: [4, '4'], placeholder: 'Number', explanation: 'Coprime to 12: 1, 5, 7, 11. $\\phi(12) = 4$.' },
    { difficulty: 'medium', question: 'Modular arithmetic: $17 \\mod 5 =$?', accept: [2, '2'], placeholder: 'Number', explanation: '$17 = 3(5) + 2$. Remainder is 2.' },
    { difficulty: 'hard', question: 'Fermat\'s little theorem: $a^p \\equiv a \\pmod{p}$ when $p$ is:', accept: ['prime'], placeholder: 'Type', explanation: 'Fermat: $a^p \\equiv a \\pmod{p}$ for prime $p$.' },
    { difficulty: 'medium', question: 'Complex number: $i^2 =$?', accept: [-1, '-1'], placeholder: 'Number', explanation: '$i = \\sqrt{-1}$. $i^2 = -1$.' },
    { difficulty: 'hard', question: 'Chinese remainder theorem: system of congruences with coprime moduli has a _____ solution mod product.', accept: ['unique'], placeholder: 'Property', explanation: 'CRT: pairwise coprime moduli give unique solution modulo product.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each number to its classification:', pairs: [
      { left: '$7$', right: 'Natural number' },
      { left: '$-3$', right: 'Integer' },
      { left: '$\\frac{2}{5}$', right: 'Rational' },
      { left: '$\\sqrt{2}$', right: 'Irrational' },
      { left: '$3 + 2i$', right: 'Complex' }
    ], explanation: 'Each number system extends the previous one.' },
    { difficulty: 'medium', instruction: 'Match each property to its example:', pairs: [
      { left: 'Commutative (add)', right: '$3 + 5 = 5 + 3$' },
      { left: 'Associative (mult)', right: '$(2 \\cdot 3) \\cdot 4 = 2 \\cdot (3 \\cdot 4)$' },
      { left: 'Distributive', right: '$2(x+3) = 2x + 6$' },
      { left: 'Additive identity', right: '$a + 0 = a$' },
      { left: 'Multiplicative inverse', right: '$a \\cdot \\frac{1}{a} = 1$' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Complete the field axioms:', expression: 'Additive identity: $a +$ {{0}} $= a$. Multiplicative identity: $a \\cdot$ {{1}} $= a$.', blanks: [ { accept: [0, '0'], size: 3 }, { accept: [1, '1'], size: 3 } ], explanation: '0 is the additive identity, 1 is the multiplicative identity.' },
    { difficulty: 'medium', context: 'Fill in the number system hierarchy:', expression: '$\\mathbb{N} \\subset$ {{0}} $\\subset \\mathbb{Q} \\subset$ {{1}} $\\subset \\mathbb{C}$', blanks: [ { accept: ['Z', 'ℤ', '\\mathbb{Z}'], size: 3 }, { accept: ['R', 'ℝ', '\\mathbb{R}'], size: 3 } ], hint: '<p>Integers come after naturals. Reals come after rationals.</p>', explanation: '$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}$.' },
    { difficulty: 'medium', context: 'Number classification:', expression: 'A number that can be written as $p/q$ where $p, q \\in \\mathbb{Z}$, $q \\neq 0$ is {{0}}.', blanks: [ { accept: ['rational', 'a rational number'], size: 10 } ], explanation: 'Rational: expressible as a ratio of integers.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Prove that the sum of two rational numbers is rational.', parts: [
      { question: 'Let $r_1 = \\frac{a}{b}$ and $r_2 = \\frac{c}{d}$ where $a,b,c,d \\in \\mathbb{Z}$ and $b,d \\neq 0$. What is $r_1 + r_2$ as a single fraction?', accept: ['(ad+bc)/bd', 'ad+bc/bd', '(ad+bc)/(bd)'], placeholder: '(ad+bc)/bd', explanation: '$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}$.' },
      { question: 'Is the numerator $ad + bc$ an integer? (yes/no)', accept: ['yes'], placeholder: 'yes or no', explanation: 'Products and sums of integers are integers.' },
      { question: 'Is the denominator $bd$ a nonzero integer? (yes/no)', accept: ['yes'], placeholder: 'yes or no', explanation: '$b \\neq 0$ and $d \\neq 0$ implies $bd \\neq 0$.' },
      { question: 'Therefore $r_1 + r_2$ is in which number set? (Type the symbol letter)', accept: ['Q', 'ℚ'], placeholder: 'Q', explanation: 'The sum is a ratio of integers with nonzero denominator, so it is in $\\mathbb{Q}$.' }
    ], completionMessage: 'You just constructed a complete closure proof for rational addition!' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>Number Systems Strategy</h4>
    <ol><li><strong>Classification:</strong> Can it be written as $p/q$? Yes = rational. No = irrational.</li>
    <li><strong>Closure:</strong> Does performing the operation on two elements of the set always produce another element of the set?</li>
    <li><strong>Hierarchy:</strong> $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}$.</li></ol></div>` }
},

/* TOPIC 1.2: Basic Arithmetic */
{
  id: 'basic-arithmetic',
  title: 'Basic Arithmetic: Operations, Fractions \u0026 Decimals',
  description: 'The four fundamental operations on whole numbers, fractions, and decimals. Every calculation in mathematics reduces to these building blocks.',
  prereqRecap: [],
  whyExists: { html: `
    <p><strong>Why start here?</strong> All of mathematics builds on arithmetic. Algebra generalizes arithmetic with variables. Calculus extends it to continuous change. Statistics applies it to data. Without fluency in basic operations, fractions, and decimals, every subsequent topic becomes inaccessible.</p>
    ${WHY('What IS a number?', '<p>A number is an abstraction for quantity. The symbol "3" represents three of anything: three apples, three meters, three ideas. Mathematics studies the properties of these abstractions, independent of what they count.</p>')}
  ` },
  formalDefinitions: [
      { term: 'Commutative Property', symbol: '$a + b = b + a$', definition: 'The order of operands does not affect the result. Holds for addition and multiplication over $\\mathbb{R}$. Does NOT hold for subtraction or division.' },
      { term: 'Associative Property', symbol: '$(a + b) + c = a + (b + c)$', definition: 'Grouping of operands does not affect the result. Holds for addition and multiplication. Allows omission of parentheses in chains.' },
      { term: 'Distributive Property', symbol: '$a(b + c) = ab + ac$', definition: 'Multiplication distributes over addition. Foundation of all algebraic expansion. Connects addition and multiplication into a coherent structure (ring axiom).' },
      { term: 'Additive Identity', symbol: '$a + 0 = a$', definition: 'Zero is the unique element such that adding it to any number leaves the number unchanged.' },
      { term: 'Multiplicative Identity', symbol: '$a \\cdot 1 = a$', definition: 'One is the unique element such that multiplying any number by it leaves the number unchanged.' }
    ],
    background: {
      title: 'Why Do We Have Four Operations?',
      content: '<p><strong>Addition</strong> is the most natural operation: combining groups. Every human culture invented it independently.</p><p><strong>Subtraction</strong> answers the question "what is left?" It is the inverse of addition. Without subtraction, we cannot measure differences or changes.</p><p><strong>Multiplication</strong> is repeated addition, but it is much more than that. It scales quantities. When you multiply the length and width of a rectangle, you get its area. This connection between multiplication and geometry is fundamental to all of physics and engineering.</p><p><strong>Division</strong> answers "how many groups?" or "how much per group?" It is the inverse of multiplication. Division by zero is undefined because no number times zero produces a nonzero result. This is a logical impossibility, not a convention.</p>'
    },
    mathGrammar: [
      { question: 'What does "$=$" actually mean?', answer: 'The equals sign means "the left side and the right side represent the same number." It is a statement of fact, not an instruction. $2 + 3 = 5$ means these are two names for the same thing.' },
      { question: 'Why do we subtract?', answer: 'Subtraction answers "how much more?" or "what remains?" $7 - 3 = 4$ means: starting from 7, if you remove 3, you have 4 left. It is the inverse of addition: it undoes what addition does.' },
      { question: 'Why do we multiply instead of adding repeatedly?', answer: '$5 \\times 4$ means "add five copies of 4": $4 + 4 + 4 + 4 + 4 = 20$. Multiplication is faster notation for repeated addition. But it also has a geometric meaning: the area of a $5 \\times 4$ rectangle is $20$ square units.' },
      { question: 'Why is division by zero undefined?', answer: 'Division asks "what times the divisor gives the dividend?" $12 \\div 3 = 4$ because $4 \\times 3 = 12$. For $12 \\div 0 = ?$, we need $? \\times 0 = 12$. No number times zero gives 12. There is no number that works, so the operation has no answer. That is what undefined means.' },
      { question: 'What is PEMDAS/BODMAS and why?', answer: 'Order of operations: Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right). Without this convention, two people could read the same problem and get different answers. The rules exist so everyone agrees. Without it, $2 + 3 \\times 4$ could mean 20 or 14.' }
    ],
    concept: { html: `
    <div class="callout callout-key"><h4>Whole Number Operations</h4>
    <ul>
      <li><strong>Addition (+):</strong> Combining quantities. $3 + 5 = 8$. <em>Commutative</em>: $a + b = b + a$. <em>Associative</em>: $(a + b) + c = a + (b + c)$. Identity: $a + 0 = a$.</li>
      <li><strong>Subtraction (-):</strong> Finding the difference. $8 - 3 = 5$. Subtraction is <em>adding the opposite</em>: $a - b = a + (-b)$. NOT commutative: $3 - 5 \\neq 5 - 3$.</li>
      <li><strong>Multiplication (\\times):</strong> Repeated addition. $4 \\times 3 = 3 + 3 + 3 + 3 = 12$. Commutative: $a \\times b = b \\times a$. Identity: $a \\times 1 = a$. Zero property: $a \\times 0 = 0$.</li>
      <li><strong>Division (\\div):</strong> Splitting into equal groups. $12 \\div 4 = 3$ means 12 split into 4 equal groups of 3. Division is <em>multiplication by the reciprocal</em>: $a \\div b = a \\times \\frac{1}{b}$.</li>
    </ul>
    ${WHY('Why is division by zero undefined?', '<p>If $6 \\div 0 = x$, then $0 \\times x = 6$. No number $x$ satisfies this (any number times 0 equals 0, never 6). The equation has no solution, so division by zero is undefined. It is not "infinity": $0 \\times \\infty$ is also undefined.</p>')}</div>

    <div class="callout callout-key"><h4>Fractions</h4>
    <p>A fraction $\\frac{a}{b}$ represents $a$ parts out of $b$ equal parts. $a$ = numerator (how many), $b$ = denominator (size of each part).</p>
    <ul>
      <li><strong>Equivalent fractions:</strong> $\\frac{a}{b} = \\frac{a \\times k}{b \\times k}$ for any $k \\neq 0$. Example: $\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\frac{50}{100}$.</li>
      <li><strong>Simplifying:</strong> Divide numerator and denominator by their GCF. $\\frac{12}{18} = \\frac{12 \\div 6}{18 \\div 6} = \\frac{2}{3}$.</li>
      <li><strong>Addition/Subtraction:</strong> Requires a <em>common denominator</em>. $\\frac{1}{3} + \\frac{1}{4} = \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}$.</li>
      <li><strong>Multiplication:</strong> Multiply straight across. $\\frac{2}{3} \\times \\frac{5}{7} = \\frac{10}{21}$.</li>
      <li><strong>Division:</strong> Multiply by the reciprocal. $\\frac{2}{3} \\div \\frac{4}{5} = \\frac{2}{3} \\times \\frac{5}{4} = \\frac{10}{12} = \\frac{5}{6}$.</li>
    </ul>
    ${WHY('Why do we need a common denominator for addition?', '<p>$\\frac{1}{3}$ and $\\frac{1}{4}$ represent different-sized pieces. You cannot add "1 third" and "1 quarter" directly, just as you cannot add 1 meter and 1 foot without converting. The LCD (Least Common Denominator) converts both fractions to the same-sized pieces: twelfths.</p>')}
    ${WHY('Why does "multiply by the reciprocal" work for division?', '<p>$\\frac{2}{3} \\div \\frac{4}{5}$ asks: "How many $\\frac{4}{5}$-sized pieces fit in $\\frac{2}{3}$?" Written as a complex fraction: $\\frac{\\frac{2}{3}}{\\frac{4}{5}}$. Multiply top and bottom by $\\frac{5}{4}$: $\\frac{\\frac{2}{3} \\times \\frac{5}{4}}{\\frac{4}{5} \\times \\frac{5}{4}} = \\frac{\\frac{10}{12}}{1} = \\frac{5}{6}$.</p>')}</div>

    <div class="callout callout-key"><h4>Decimals</h4>
    <p>Decimals represent fractions with powers of 10 as denominators.</p>
    <ul>
      <li><strong>Place value:</strong> $3.75 = 3 + \\frac{7}{10} + \\frac{5}{100} = 3\\frac{75}{100} = 3\\frac{3}{4}$.</li>
      <li><strong>Fraction to decimal:</strong> Divide numerator by denominator. $\\frac{3}{8} = 3 \\div 8 = 0.375$.</li>
      <li><strong>Decimal to fraction:</strong> $0.6 = \\frac{6}{10} = \\frac{3}{5}$. $0.125 = \\frac{125}{1000} = \\frac{1}{8}$.</li>
      <li><strong>Percent:</strong> "Per hundred." $45\\% = \\frac{45}{100} = 0.45$.</li>
    </ul></div>

    <div class="callout callout-key"><h4>Order of Operations (PEMDAS/BODMAS)</h4>
    <p>When an expression has multiple operations, evaluate in this order:</p>
    <ol>
      <li><strong>P</strong>arentheses (innermost first)</li>
      <li><strong>E</strong>xponents (powers and roots)</li>
      <li><strong>M</strong>ultiplication and <strong>D</strong>ivision (left to right)</li>
      <li><strong>A</strong>ddition and <strong>S</strong>ubtraction (left to right)</li>
    </ol>
    <p>Example: $3 + 4 \\times 2 = 3 + 8 = 11$ (NOT $14$). $\\quad (3 + 4) \\times 2 = 7 \\times 2 = 14$.</p>
    ${WHY('Why this order?', '<p>Convention, chosen for consistency. Multiplication binds more tightly than addition because it represents repeated addition: $3 + 4 \\times 2$ means "3 plus two groups of 4" = $3 + 8$, not "seven groups of 2." Without a convention, $3 + 4 \\times 2$ would be ambiguous.</p>')}</div>
  ` },
  definition: { html: '<p><strong>Natural Numbers:</strong> $\\mathbb{N} = \\{1, 2, 3, \\ldots\\}$ (counting numbers).</p><p><strong>Whole Numbers:</strong> $\\{0, 1, 2, 3, \\ldots\\}$ (naturals plus zero).</p><p><strong>GCF:</strong> Greatest Common Factor: the largest number dividing both $a$ and $b$.</p><p><strong>LCD:</strong> Least Common Denominator: the smallest number that both denominators divide evenly into.</p>' },
  examples: [{
    title: 'Adding Fractions with Unlike Denominators',
    problem: 'Compute $\\frac{2}{5} + \\frac{3}{4}$.',
    steps: [
      { title: 'Find the LCD', content: 'LCD of 5 and 4 is 20.', why: 'The smallest number divisible by both 5 and 4 is $5 \\times 4 = 20$ (since 5 and 4 share no common factors).' },
      { title: 'Convert each fraction', content: '$\\frac{2}{5} = \\frac{2 \\times 4}{5 \\times 4} = \\frac{8}{20}$. $\\quad \\frac{3}{4} = \\frac{3 \\times 5}{4 \\times 5} = \\frac{15}{20}$.', why: 'Multiply numerator and denominator by the same factor. The value does not change.' },
      { title: 'Add numerators', content: '$\\frac{8}{20} + \\frac{15}{20} = \\frac{23}{20} = 1\\frac{3}{20}$.', why: 'Same denominator: add the numerators. $23/20 \\gt 1$, so convert to mixed number.' }
    ]
  },
  {
    title: 'Order of Operations',
    problem: 'Evaluate $2 + 3 \\times (4 - 1)^2 \\div 9$.',
    steps: [
      { title: 'Parentheses', content: '$4 - 1 = 3$. Expression becomes $2 + 3 \\times 3^2 \\div 9$.', why: 'Evaluate innermost parentheses first.' },
      { title: 'Exponents', content: '$3^2 = 9$. Expression becomes $2 + 3 \\times 9 \\div 9$.', why: 'Exponents before multiplication.' },
      { title: 'Multiplication and division (left to right)', content: '$3 \\times 9 = 27$. Then $27 \\div 9 = 3$. Expression becomes $2 + 3$.', why: 'Multiplication and division have equal precedence: evaluate left to right.' },
      { title: 'Addition', content: '$2 + 3 = 5$.', why: 'Final operation.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a number?', back: 'An abstraction for quantity. "3" represents three of anything. Mathematics studies properties of these abstractions.' },
      { type: 'why', front: 'Why is division by zero undefined?', back: 'If 6 / 0 = x, then 0 * x = 6. No x satisfies this. Zero times anything is zero, never 6.' },
      { type: 'why', front: 'Why do fractions need a common denominator for addition?', back: '1/3 and 1/4 are different-sized pieces. Convert to same-sized pieces (twelfths) before combining.' },
      { type: 'how', front: 'How do you divide fractions?', back: 'Multiply by the reciprocal: (a/b) / (c/d) = (a/b) * (d/c). Flipping and multiplying eliminates the complex fraction.' },
      { type: 'why', front: 'Why does PEMDAS exist?', back: 'Convention for consistency. Multiplication binds tighter because it IS repeated addition: 3 + 4*2 = 3 + 8 = 11.' },
      { type: 'define', front: 'What is a fraction?', back: 'a/b = a parts out of b equal parts. a = numerator (count), b = denominator (piece size). b cannot be zero.' }
    ],
    exercises: [
    { difficulty: 'easy', question: '$8 + 6 \\times 3 =$?', options: ['$42$', '$26$', '$30$', '$14$'], correctIndex: 1, hint: '<p>Multiplication before addition.</p>', correctExplanation: '$6 \\times 3 = 18$. $8 + 18 = 26$. Multiplication first (PEMDAS).', wrongExplanations: { 0: '$(8 + 6) \\times 3 = 42$, but without parentheses, multiply first.', 2: 'Check order of operations: $6 \\times 3 = 18$, then $8 + 18 = 26$.', 3: 'Recheck: $6 \\times 3 = 18$, not 6.' } },
    { difficulty: 'easy', question: '$\\frac{1}{3} + \\frac{1}{6} =$?', options: ['$\\frac{2}{9}$', '$\\frac{1}{2}$', '$\\frac{2}{6}$', '$\\frac{1}{9}$'], correctIndex: 1, hint: '<p>Find LCD of 3 and 6.</p>', correctExplanation: 'LCD = 6. $\\frac{2}{6} + \\frac{1}{6} = \\frac{3}{6} = \\frac{1}{2}$.', wrongExplanations: { 0: 'You added denominators: $\\frac{1+1}{3+6}$. Only add NUMERATORS after finding LCD.', 2: '$\\frac{2}{6} = \\frac{1}{3}$, which is just the first fraction. You need to add $\\frac{1}{6}$ too.', 3: '$\\frac{1}{9}$ adds the denominators. Find the LCD instead.' } },
    { difficulty: 'medium', question: '$\\frac{3}{4} \\times \\frac{2}{5} =$?', options: ['$\\frac{5}{9}$', '$\\frac{6}{20}$', '$\\frac{3}{10}$', '$\\frac{6}{9}$'], correctIndex: 2, hint: '<p>Multiply numerators, multiply denominators, then simplify.</p>', correctExplanation: '$\\frac{3 \\times 2}{4 \\times 5} = \\frac{6}{20} = \\frac{3}{10}$.', wrongExplanations: { 0: 'You added instead of multiplied.', 1: 'Correct but not simplified. $\\frac{6}{20} = \\frac{3}{10}$.', 3: 'Check your multiplication: $3 \\times 2 = 6$, $4 \\times 5 = 20$.' } },
    { difficulty: 'medium', question: '$\\frac{5}{6} \\div \\frac{2}{3} =$?', options: ['$\\frac{10}{18}$', '$\\frac{5}{4}$', '$\\frac{15}{12}$', '$\\frac{5}{9}$'], correctIndex: 1, hint: '<p>Multiply by the reciprocal: $\\frac{5}{6} \\times \\frac{3}{2}$.</p>', correctExplanation: '$\\frac{5}{6} \\times \\frac{3}{2} = \\frac{15}{12} = \\frac{5}{4} = 1\\frac{1}{4}$.', wrongExplanations: { 0: 'You multiplied straight across without flipping the second fraction.', 2: 'Correct but not simplified. $\\frac{15}{12} = \\frac{5}{4}$.', 3: 'You divided numerators and denominators separately, which is not how fraction division works.' } },
    { difficulty: 'hard', question: 'Evaluate: $\\frac{2}{3} + \\frac{3}{4} - \\frac{1}{6}$', options: ['$\\frac{5}{12}$', '$\\frac{15}{12}$', '$\\frac{4}{12}$', '$\\frac{1}{4}$'], correctIndex: 1, hint: '<p>LCD of 3, 4, and 6 is 12.</p>', correctExplanation: '$\\frac{8}{12} + \\frac{9}{12} - \\frac{2}{12} = \\frac{15}{12} = \\frac{5}{4} = 1\\frac{1}{4}$.', wrongExplanations: { 0: '$\\frac{5}{12}$ would be $8 + 9 - 12$, but it should be $8 + 9 - 2 = 15$.', 2: 'Check: $\\frac{2}{3} = \\frac{8}{12}$, $\\frac{3}{4} = \\frac{9}{12}$, $\\frac{1}{6} = \\frac{2}{12}$. $8 + 9 - 2 = 15$.', 3: '$\\frac{3}{12} = \\frac{1}{4}$. But $8 + 9 - 2 = 15$, not 3.' } },
    { difficulty: 'hard', question: '$5 - 2 \\times 3 + 4^2 \\div 8 =$?', options: ['$7$', '$1$', '$3$', '$-2$'], correctIndex: 1, hint: '<p>PEMDAS: exponents, then multiplication/division (L to R), then addition/subtraction (L to R).</p>', correctExplanation: '$4^2 = 16$. $2 \\times 3 = 6$. $16 \\div 8 = 2$. $5 - 6 + 2 = 1$.', wrongExplanations: { 0: '$5 - 6 + 2 = 1$, not 7. Remember: subtraction before the remaining addition, left to right.', 2: 'Check each step: $4^2 = 16$, $16 \\div 8 = 2$, $2 \\times 3 = 6$. Then $5 - 6 + 2$.', 3: '$5 - 6 = -1$, then $-1 + 2 = 1$.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: '$7 \\times 8 =$?', accept: [56, '56'], placeholder: 'Number', explanation: '$7 \\times 8 = 56$.' },
    { difficulty: 'easy', question: 'Simplify: $\\frac{12}{18}$', accept: ['2/3'], placeholder: 'Fraction', explanation: 'GCF of 12 and 18 is 6. $\\frac{12 \\div 6}{18 \\div 6} = \\frac{2}{3}$.' },
    { difficulty: 'medium', question: 'Convert 0.75 to a fraction:', accept: ['3/4'], placeholder: 'Fraction', explanation: '$0.75 = \\frac{75}{100} = \\frac{3}{4}$.' },
    { difficulty: 'medium', question: '$\\frac{2}{7} + \\frac{3}{7} =$?', accept: ['5/7'], placeholder: 'Fraction', explanation: 'Same denominator: $\\frac{2+3}{7} = \\frac{5}{7}$.' },
    { difficulty: 'hard', question: 'Evaluate: $(2 + 3)^2 - 4 \\times 3 =$?', accept: [13, '13'], placeholder: 'Number', explanation: '$(5)^2 - 12 = 25 - 12 = 13$. Parentheses, exponents, multiplication, subtraction.' },
    { difficulty: 'easy', question: 'If $A = \\{1,2,3\\}$ and $B = \\{2,3,4\\}$, what is $A \\cap B$?', accept: ['{2,3}', '{2, 3}'], placeholder: 'Set', explanation: '$A \\cap B = \\{2, 3\\}$. Elements in both sets.' },
    { difficulty: 'medium', question: 'How many elements in the empty set $\\emptyset$?', accept: [0, '0'], placeholder: 'Number', explanation: 'The empty set contains zero elements.' },
    { difficulty: 'hard', question: 'Power set of $\\{a, b\\}$ has how many elements?', accept: [4, '4'], placeholder: 'Number', explanation: '$|P(S)| = 2^n$. $2^2 = 4$. $P = \\{\\emptyset, \\{a\\}, \\{b\\}, \\{a,b\\}\\}$.' },
    { difficulty: 'medium', question: 'If $|A| = 5$ and $|B| = 3$ and $|A \\cap B| = 2$, then $|A \\cup B| =$?', accept: [6, '6'], placeholder: 'Number', explanation: '$|A \\cup B| = |A| + |B| - |A \\cap B| = 5 + 3 - 2 = 6$.' },
    { difficulty: 'hard', question: 'Power set of $\\{a\\}$ has elements:', accept: ['2', 2], placeholder: 'Number', explanation: '$\\mathcal{P}(\\{a\\}) = \\{\\emptyset, \\{a\\}\\}$. Two elements.' },
    { difficulty: 'medium', question: '$A \\setminus B$ is read as:', accept: ['A minus B', 'A set minus B', 'A without B'], placeholder: 'Name', explanation: 'Set difference: elements in $A$ not in $B$.' },
    { difficulty: 'hard', question: 'A relation that is reflexive, symmetric, and transitive is an:', accept: ['equivalence relation'], placeholder: 'Name', explanation: 'Equivalence relation: partitions a set into equivalence classes.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Add: $\\frac{3}{8} + \\frac{1}{6}$', steps: [
      { content: 'Find LCD of 8 and 6: $\\text{LCM}(8, 6) = 24$.' },
      { content: '$\\frac{3}{8} = \\frac{3 \\times 3}{8 \\times 3} = \\frac{9}{24}$.' },
      { content: '$\\frac{1}{6} = \\frac{1 \\times 4}{6 \\times 4} = \\frac{4}{24}$.' },
      { content: '$\\frac{9}{24} + \\frac{4}{24} = \\frac{13}{24}$.' }
    ], explanation: 'LCD = 24. Convert both fractions, then add numerators.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each operation to its property:', pairs: [
      { left: '$a + b = b + a$', right: 'Commutative (addition)' },
      { left: '$a \\times 1 = a$', right: 'Multiplicative identity' },
      { left: '$a + 0 = a$', right: 'Additive identity' },
      { left: '$a \\times 0 = 0$', right: 'Zero property' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Order of operations:', expression: 'In PEMDAS, the E stands for {{0}} and the M stands for {{1}}.', blanks: [ { accept: ['exponents'], size: 10 }, { accept: ['multiplication'], size: 14 } ], explanation: 'P-E-M-D-A-S: Parentheses, Exponents, Multiplication, Division, Addition, Subtraction.' },
    { difficulty: 'medium', context: 'Fraction division:', expression: 'To divide by a fraction, multiply by its {{0}}.', blanks: [ { accept: ['reciprocal', 'inverse'], size: 10 } ], explanation: '$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>Arithmetic Strategy</h4>
    <ol><li><strong>Fractions:</strong> Same denominator? Add numerators. Different? Find LCD first.</li>
    <li><strong>Fraction multiplication:</strong> Multiply straight across, then simplify.</li>
    <li><strong>Fraction division:</strong> Flip the second fraction, then multiply.</li>
    <li><strong>Order of operations:</strong> PEMDAS. Parentheses first, then exponents, then multiply/divide (left to right), then add/subtract (left to right).</li></ol></div>` }
},

/* TOPIC 1.3: Propositional Logic */
{
  id: 'propositional-logic',
  title: 'Propositional Logic & Truth Tables',
  description: 'The rules of valid reasoning. Logic is to mathematics what grammar is to language.',
  prereqRecap: [
    { term: 'Statement', definition: 'A sentence that is either TRUE or FALSE, never both. "$2 + 3 = 5$" (true). "$7 \\lt 3$" (false).' },
    { term: 'Set Operations', definition: 'Union ($\\cup$), intersection ($\\cap$), complement ($A^c$) from Topic 1.2.' }
  ],
  whyExists: { html: `
    <p><strong>Why logic?</strong> Mathematics is built on proofs, and proofs are chains of logical deductions. Logic provides the rules for combining statements and drawing valid conclusions.</p>
  ` },
  concept: { html: `
    <div class="callout callout-key"><h4>Logical Connectives</h4>
    <ul>
      <li><strong>Negation:</strong> $\\neg P$ ("not $P$"). True when $P$ is false.</li>
      <li><strong>Conjunction:</strong> $P \\wedge Q$ ("$P$ and $Q$"). True only when BOTH are true.</li>
      <li><strong>Disjunction:</strong> $P \\vee Q$ ("$P$ or $Q$"). True when at least one is true.</li>
      <li><strong>Conditional:</strong> $P \\to Q$ ("if $P$ then $Q$"). False ONLY when $P$ is true and $Q$ is false.</li>
      <li><strong>Biconditional:</strong> $P \\leftrightarrow Q$ ("$P$ if and only if $Q$"). True when both have the same truth value.</li>
    </ul>
    ${WHY('Why is "if P then Q" true when P is false?', '<p>Consider: "If it rains, I carry an umbrella." On a sunny day ($P$ false), you have not violated the promise regardless of the umbrella. The conditional is only falsified when rain occurs ($P$ true) but no umbrella ($Q$ false).</p>')}</div>
    <div class="callout callout-key"><h4>Logical Equivalences</h4>
    <p>$P \\to Q \\equiv \\neg P \\vee Q$ (a conditional is a disjunction in disguise).</p>
    <p><strong>Contrapositive:</strong> $P \\to Q \\equiv \\neg Q \\to \\neg P$ (always equivalent).</p>
    <p><strong>Converse:</strong> $Q \\to P$ (NOT equivalent to $P \\to Q$).</p></div>
  ` },
  definition: { html: `<p><strong>Tautology:</strong> A statement that is always true regardless of truth values. <strong>Contradiction:</strong> Always false.</p>` },
  examples: [{
    title: 'Truth Table for Conditional',
    problem: 'Build the truth table for $P \\to Q$.',
    steps: [
      { title: 'Four rows', content: '$P=T, Q=T \\Rightarrow T$. $P=T, Q=F \\Rightarrow F$. $P=F, Q=T \\Rightarrow T$. $P=F, Q=F \\Rightarrow T$.', why: '$P \\to Q$ is false ONLY when $P$ is true and $Q$ is false.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a proposition?', back: 'A statement that is TRUE or FALSE, never both. "2+3=5" is a proposition. "Is it raining?" is not.' },
      { type: 'why', front: 'Why is "if p then q" true when p is false?', back: 'The implication only promises something when p is true. When p is false, the promise cannot be broken.' },
      { type: 'how', front: 'How do you negate "All X are Y"?', back: 'NOT(for all x, P(x)) = there exists x such that NOT P(x). One counterexample disproves a universal claim.' },
      { type: 'define', front: 'What is a tautology?', back: 'A compound statement TRUE for every possible truth assignment. Example: p OR (NOT p) is always true.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'If $P$ is TRUE and $Q$ is FALSE, then $P \\wedge Q$ is:', options: ['TRUE', 'FALSE', 'Undefined', 'Both'], correctIndex: 1, hint: '<p>AND requires BOTH to be true.</p>', correctExplanation: '$P \\wedge Q$ is true only when both are true. Since $Q$ is false, the conjunction is false.', wrongExplanations: { 0: 'AND requires both operands true.', 2: 'Every compound statement has a definite truth value.', 3: 'A statement is either true or false, never both.' } },
    { difficulty: 'easy', question: '$P \\to Q$ is FALSE only when:', options: ['$P$ is false and $Q$ is true', '$P$ is true and $Q$ is false', 'Both are false', 'Both are true'], correctIndex: 1, hint: '<p>A promise is broken only when the condition holds but the consequence fails.</p>', correctExplanation: '$P \\to Q$ is false exclusively when $P$ is true and $Q$ is false.', wrongExplanations: { 0: 'When $P$ is false, the conditional is vacuously true.', 2: 'Both false makes $P \\to Q$ true (vacuously).', 3: 'Both true makes $P \\to Q$ true.' } },
    { difficulty: 'medium', question: 'The contrapositive of $P \\to Q$ is:', options: ['$Q \\to P$', '$\\neg P \\to \\neg Q$', '$\\neg Q \\to \\neg P$', '$P \\wedge \\neg Q$'], correctIndex: 2, hint: '<p>Negate both and reverse.</p>', correctExplanation: 'Contrapositive: negate both parts and reverse the direction. $\\neg Q \\to \\neg P$.', wrongExplanations: { 0: 'That is the converse, NOT the contrapositive.', 1: 'That is the inverse.', 3: 'That is the negation of $P \\to Q$.' } },
    { difficulty: 'medium', question: 'Is $P \\vee \\neg P$ a tautology?', options: ['Yes', 'No', 'Only when $P$ is true', 'It depends'], correctIndex: 0, hint: '<p>Check both cases: $P$ true and $P$ false.</p>', correctExplanation: 'If $P$ true: $T \\vee F = T$. If $P$ false: $F \\vee T = T$. Always true: tautology (Law of Excluded Middle).', wrongExplanations: { 1: 'It is true in ALL cases, making it a tautology.', 2: 'It is true in both cases, not just when $P$ is true.', 3: 'It does not depend: it is always true.' } },
    { difficulty: 'hard', question: 'Which is logically equivalent to $\\neg(P \\wedge Q)$?', options: ['$\\neg P \\wedge \\neg Q$', '$\\neg P \\vee \\neg Q$', '$P \\vee Q$', '$\\neg P \\to \\neg Q$'], correctIndex: 1, hint: '<p>De Morgans law for logic.</p>', correctExplanation: '$\\neg(P \\wedge Q) \\equiv \\neg P \\vee \\neg Q$ (De Morgans Law).', wrongExplanations: { 0: 'That would be $\\neg(P \\vee Q)$.', 2: 'No logical equivalence between these.', 3: '$\\neg P \\to \\neg Q \\equiv P \\vee \\neg Q$, different from $\\neg P \\vee \\neg Q$.' } },
    { difficulty: 'hard', question: 'A conditional and its converse:', options: ['Are always equivalent', 'Are never equivalent', 'Are equivalent only sometimes', 'Are contradictory'], correctIndex: 2, hint: '<p>$P \\to Q$ and $Q \\to P$ have different truth tables in general.</p>', correctExplanation: 'Sometimes equivalent (e.g., when both P and Q have the same truth value in all cases), but NOT in general. "If square then rectangle" is true, but "If rectangle then square" is false.', wrongExplanations: { 0: 'Converse is NOT logically equivalent to the original.', 1: 'There exist statements where both happen to be true.', 3: 'They can both be true at the same time.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'If $P$ is TRUE, what is $\\neg P$?', accept: ['false', 'f', 'FALSE'], placeholder: 'true or false', explanation: 'Negation flips the truth value.' },
    { difficulty: 'medium', question: 'Rewrite $P \\to Q$ using only $\\neg$ and $\\vee$:', accept: ['~p v q', '~pvq', 'not p or q', '¬p∨q', '\\neg P \\vee Q', 'negpvq'], placeholder: 'e.g. ~p v q', hint: '<p>$P \\to Q \\equiv \\neg P \\vee Q$.</p>', explanation: '$P \\to Q \\equiv \\neg P \\vee Q$: a conditional is a disjunction in disguise.' },
    { difficulty: 'hard', question: 'How many rows does a truth table with 4 variables have?', accept: [16], placeholder: 'Enter a number', explanation: '$2^4 = 16$. Each variable has 2 possible values.' },
    { difficulty: 'easy', question: 'If $p$ is true and $q$ is false, then $p \\land q$ is:', accept: ['false', 'F'], placeholder: 'true/false', explanation: 'AND requires both to be true. One false makes the conjunction false.' },
    { difficulty: 'medium', question: 'The contrapositive of "if $p$ then $q$" is:', accept: ['if not q then not p', 'if ~q then ~p'], placeholder: 'Statement', explanation: 'Contrapositive: $\\neg q \\to \\neg p$. Logically equivalent to $p \\to q$.' },
    { difficulty: 'hard', question: 'If $p \\to q$ is true and $q$ is false, then $p$ is:', accept: ['false', 'F'], placeholder: 'true/false', explanation: 'Modus Tollens: $p \\to q$ and $\\neg q$ implies $\\neg p$.' },
    { difficulty: 'medium', question: 'Truth table: $T \\land F =$?', accept: ['F', 'false'], placeholder: 'T/F', explanation: 'AND ($\\land$) is true only when both are true. $T \\land F = F$.' },
    { difficulty: 'easy', question: '$T \\lor F =$?', accept: ['T', 'true'], placeholder: 'T/F', explanation: 'OR ($\\lor$) is true when at least one operand is true.' },
    { difficulty: 'medium', question: 'Contrapositive of $p \\to q$ is:', accept: ['not q -> not p', '~q -> ~p', 'neg q to neg p'], placeholder: 'Statement', explanation: 'Contrapositive: $\\neg q \\to \\neg p$. Logically equivalent to the original.' },
    { difficulty: 'hard', question: 'Biconditional $p \\iff q$ is true when both have the _____ truth value.', accept: ['same', 'equal'], placeholder: 'Property', explanation: '$p \\iff q$ is true when both are true or both are false.' },
    { difficulty: 'medium', question: 'Negation of $\\forall x: P(x)$ is:', accept: ['exists x: not P(x)', '\\exists x: \\neg P(x)'], placeholder: 'Statement', explanation: 'Negate universal: $\\exists x: \\neg P(x)$.' },
    { difficulty: 'hard', question: 'Direct proof template: Assume hypothesis, show _____.', accept: ['conclusion'], placeholder: 'What?', explanation: 'Direct proof: assume $P$, derive $Q$. Done.' },
    { difficulty: 'medium', question: 'Modus ponens: from $p \\to q$ and $p$, conclude:', accept: ['q'], placeholder: 'Conclusion', explanation: 'Modus ponens: if $p \\to q$ is true and $p$ is true, then $q$ is true.' },
    { difficulty: 'hard', question: 'Proof by induction has two steps: base case and _____ step.', accept: ['inductive', 'induction'], placeholder: 'Step', explanation: 'Base case + inductive step (assume for $n$, prove for $n+1$).' },
    { difficulty: 'easy', question: 'Propositional variable $p$ can be either:', accept: ['true or false', 'T or F'], placeholder: 'Values', explanation: '$p$ is either true (T) or false (F).' },
    { difficulty: 'hard', question: 'A tautology is a proposition that is always:', accept: ['true'], placeholder: 'Value', explanation: 'Tautology: true in every possible interpretation.' },
    { difficulty: 'medium', question: 'Universal quantifier: $\\forall x: P(x)$ means for _____ $x$, $P(x)$ holds.', accept: ['all', 'every'], placeholder: 'Quantifier', explanation: '$\\forall$: universal quantifier ("for all").' },
    { difficulty: 'hard', question: 'Proof by strong induction: assume $P(k)$ for all $k \\leq n$, prove $P($ ? $)$.', accept: ['n+1'], placeholder: 'Value', explanation: 'Strong induction: assume all cases up to $n$, prove $n+1$.' },
    { difficulty: 'medium', question: 'In a truth table, $p \\to q$ is false only when $p$ is true and $q$ is:', accept: ['false'], placeholder: 'Value', explanation: '$p \\to q$ is false iff $p$ is true and $q$ is false.' },
    { difficulty: 'hard', question: 'Pigeonhole principle: if $n+1$ pigeons occupy $n$ holes, at least one hole has:', accept: ['at least 2', 'two or more', '2+'], placeholder: 'Count', explanation: 'Pigeonhole: $n+1$ objects in $n$ boxes guarantees doubling.' },
    { difficulty: 'medium', question: 'Exclusive or ($\\oplus$): true when exactly one of $p, q$ is:', accept: ['true'], placeholder: 'Value', explanation: 'XOR: true iff exactly one operand is true.' },
    { difficulty: 'hard', question: 'Godel\'s incompleteness: any consistent system containing arithmetic has _____ statements.', accept: ['undecidable', 'unprovable'], placeholder: 'Type', explanation: 'First incompleteness theorem: there exist true statements that cannot be proved within the system.' },
    { difficulty: 'medium', question: 'Logical equivalence: $p \\iff q$ is the same as $(p \\to q) \\wedge (q \\to$ ?$)$', accept: ['p'], placeholder: 'Variable', explanation: 'Biconditional: both implications hold.' },
    { difficulty: 'hard', question: 'Axiom schema of specification: for any property $P$, $\\{x \\in A : P(x)\\}$ is a:', accept: ['set'], placeholder: 'What?', explanation: 'Specification (separation): subsets defined by properties are sets.' },
    { difficulty: 'medium', question: 'De Morgan\'s law: $\\neg(p \\wedge q) \\equiv \\neg p \\vee \\neg $ ?', accept: ['q'], placeholder: 'Variable', explanation: '$\\neg(p \\wedge q) \\equiv \\neg p \\vee \\neg q$.' },
    { difficulty: 'hard', question: 'Compactness theorem (logic): a theory has a model iff every _____ subtheory has a model.', accept: ['finite'], placeholder: 'Size', explanation: 'Compactness: consistency of every finite subset implies overall consistency.' }
  ],
  matching: [
    { difficulty: 'medium', instruction: 'Match each logical connective to its symbol:', pairs: [
      { left: 'Negation', right: '$\\neg$' },
      { left: 'Conjunction (AND)', right: '$\\wedge$' },
      { left: 'Disjunction (OR)', right: '$\\vee$' },
      { left: 'Conditional', right: '$\\to$' },
      { left: 'Biconditional', right: '$\\leftrightarrow$' }
    ] }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Prove that $P \\to Q$ is equivalent to $\\neg Q \\to \\neg P$ (contrapositive).', steps: [
      { content: '$P \\to Q \\equiv \\neg P \\vee Q$ (conditional as disjunction).' },
      { content: 'By commutativity: $\\neg P \\vee Q \\equiv Q \\vee \\neg P$.' },
      { content: 'Rewrite as conditional: $Q \\vee \\neg P \\equiv \\neg(\\neg Q) \\vee \\neg P$.' },
      { content: '$\\neg(\\neg Q) \\vee \\neg P \\equiv \\neg Q \\to \\neg P$.' },
      { content: 'Therefore $P \\to Q \\equiv \\neg Q \\to \\neg P$. $\\blacksquare$' },
    { difficulty: 'medium', question: 'Given $A = \\{1,2,3,4\\}$ and $B = \\{3,4,5,6\\}$, find $A \\cup B$.', steps: [
      { content: 'List all elements in $A$: $\\{1, 2, 3, 4\\}$.' },
      { content: 'Add elements from $B$ that are not already listed: $5, 6$.' },
      { content: '$A \\cup B = \\{1, 2, 3, 4, 5, 6\\}$.' }
    ], explanation: 'Union ($\\cup$): combine all elements from both sets, listing each element only once.' }
    ], explanation: 'The contrapositive equivalence is fundamental to proof technique.' }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Conditional truth:', expression: '$P \\to Q$ is FALSE only when $P$ is {{0}} and $Q$ is {{1}}.', blanks: [ { accept: ['true', 'T'], size: 5 }, { accept: ['false', 'F'], size: 5 } ], explanation: 'A promise is broken only when the condition holds but the consequence fails.' },
    { difficulty: 'medium', context: 'De Morgan\'s Law:', expression: '$\\neg(P \\wedge Q) \\equiv \\neg P$ {{0}} $\\neg Q$', blanks: [ { accept: ['\\vee', 'or', 'v', '∨'], size: 4 } ], explanation: 'Negation of AND becomes OR of negations.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Build a truth table for $P \\to (Q \\vee \\neg P)$.', parts: [
      { question: 'When $P=T, Q=T$: result?', accept: ['T', 'true', 'TRUE'], placeholder: 'T or F', explanation: '$T \\to (T \\vee F) = T \\to T = T$.' },
      { question: 'When $P=T, Q=F$: result?', accept: ['F', 'false', 'FALSE'], placeholder: 'T or F', explanation: '$T \\to (F \\vee F) = T \\to F = F$.' },
      { question: 'When $P=F, Q=T$: result?', accept: ['T', 'true', 'TRUE'], placeholder: 'T or F', explanation: '$F \\to \\text{anything} = T$.' },
      { question: 'When $P=F, Q=F$: result?', accept: ['T', 'true', 'TRUE'], placeholder: 'T or F', explanation: '$F \\to \\text{anything} = T$.' },
      { question: 'Is this a tautology? (yes/no)', accept: ['no'], placeholder: 'yes or no', explanation: 'Row 2 is F, so it is not a tautology.' }
    ], completionMessage: 'Truth tables: evaluate from innermost connective outward.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>Logic Strategy</h4>
    <ol><li>Build truth tables for complex expressions.</li>
    <li>$P \\to Q \\equiv \\neg Q \\to \\neg P$ (contrapositive).</li>
    <li>De Morgan: $\\neg(P \\wedge Q) = \\neg P \\vee \\neg Q$.</li></ol></div>` }
},

/* TOPIC 1.4: Quantificational Logic */
{
  id: 'quantificational-logic',
  title: 'Quantificational Logic',
  description: 'Universal ("for all") and existential ("there exists") quantifiers. The language of mathematical definitions and theorems.',
  prereqRecap: [
    { term: 'Proposition', definition: 'A statement with a definite truth value (Topic 1.3).' },
    { term: 'Predicate', definition: 'A statement containing a variable that becomes a proposition when the variable is replaced by a value. "$x > 3$" is a predicate.' },
    { term: 'Negation', definition: '$\\neg P$ reverses the truth value of $P$ (Topic 1.3).' }
  ],
  whyExists: { html: `
    <p><strong>Why quantifiers?</strong> Propositional logic cannot express "all integers are even" or "there exists a prime larger than 100." Quantifiers extend logic to handle these universal and existential claims.</p>
  ` },
  concept: { html: `
    <div class="callout callout-key"><h4>Quantifiers</h4>
    <ul>
      <li><strong>Universal:</strong> $\\forall x, P(x)$ means "$P(x)$ is true for EVERY $x$ in the domain."</li>
      <li><strong>Existential:</strong> $\\exists x, P(x)$ means "there is AT LEAST ONE $x$ for which $P(x)$ is true."</li>
    </ul></div>
    <div class="callout callout-key"><h4>Negation Rules</h4>
    <p>$\\neg(\\forall x, P(x)) \\equiv \\exists x, \\neg P(x)$: "not all" = "there exists one that does not."</p>
    <p>$\\neg(\\exists x, P(x)) \\equiv \\forall x, \\neg P(x)$: "none exists" = "all fail."</p>
    ${WHY('Why does negation swap quantifiers?', '<p>"Not everyone passed" means "someone failed." "There is no solution" means "every candidate fails." Negation converts universal claims to existential ones and vice versa.</p>')}</div>
  ` },
  definition: { html: `<p><strong>$\\forall$:</strong> Universal quantifier ("for all"). <strong>$\\exists$:</strong> Existential quantifier ("there exists").</p>` },
  examples: [{
    title: 'Negating Quantified Statements',
    problem: 'Negate: "Every student passed the exam."',
    steps: [
      { title: 'Symbolize', content: '$\\forall s, \\text{Passed}(s)$.', why: 'Universal quantifier over students.' },
      { title: 'Negate', content: '$\\exists s, \\neg\\text{Passed}(s)$: "There exists a student who did not pass."', why: 'Negation flips $\\forall$ to $\\exists$ and negates the predicate.' }
    ]
  }],
  exercises: [
    { difficulty: 'easy', question: '$\\neg(\\forall x, P(x))$ is equivalent to:', options: ['$\\forall x, \\neg P(x)$', '$\\exists x, \\neg P(x)$', '$\\neg \\exists x, P(x)$', '$\\forall x, P(x)$'], correctIndex: 1, hint: '<p>Negation of "for all" becomes "there exists... not."</p>', correctExplanation: '$\\neg(\\forall x, P(x)) \\equiv \\exists x, \\neg P(x)$.', wrongExplanations: { 0: 'That says ALL fail, which is stronger than "not all succeed."', 2: 'That says NO $x$ satisfies $P$, which is too strong.', 3: 'That is the original, not its negation.' } },
    { difficulty: 'easy', question: '"There exists a prime number greater than 100" uses which quantifier?', options: ['$\\forall$', '$\\exists$', 'Both', 'Neither'], correctIndex: 1, hint: '<p>"There exists" signals $\\exists$.</p>', correctExplanation: '"There exists" is the existential quantifier $\\exists$.', wrongExplanations: { 0: '$\\forall$ means "for all." The claim is about existence.', 2: 'Only one quantifier is used here.', 3: 'The phrase "there exists" IS a quantifier.' } },
    { difficulty: 'medium', question: 'Negate: $\\exists x \\in \\mathbb{R}, x^2 \\lt 0$', options: ['$\\exists x, x^2 \\geq 0$', '$\\forall x, x^2 \\geq 0$', '$\\forall x, x^2 \\lt 0$', '$\\neg x^2 \\lt 0$'], correctIndex: 1, hint: '<p>$\\neg \\exists \\equiv \\forall \\neg$.</p>', correctExplanation: '$\\neg(\\exists x, x^2 \\lt 0) \\equiv \\forall x, \\neg(x^2 \\lt 0) \\equiv \\forall x, x^2 \\geq 0$.', wrongExplanations: { 0: 'Must also flip $\\exists$ to $\\forall$.', 2: 'Must negate the predicate: $ \\lt 0$ becomes $\\geq 0$.', 3: 'The quantifier must be addressed, not just the predicate.' } },
    { difficulty: 'medium', question: 'Does order matter in $\\forall x, \\exists y, x + y = 0$?', options: ['No', 'Yes: this says for each $x$ there is a $y$', 'Yes: this says there is one $y$ that works for all $x$', 'It is undefined'], correctIndex: 1, hint: '<p>Read left to right. The $y$ can depend on $x$.</p>', correctExplanation: '$\\forall x, \\exists y$: for each $x$, there exists a (possibly different) $y$ such that $x + y = 0$. Here $y = -x$. If reversed to $\\exists y, \\forall x$, it would claim one $y$ works for ALL $x$, which is false.', wrongExplanations: { 0: 'Order matters: $\\forall x \\exists y$ is very different from $\\exists y \\forall x$.', 2: 'That would be $\\exists y, \\forall x$, which has the opposite meaning.', 3: 'It is well-defined.' } },
    { difficulty: 'hard', question: 'Which is the correct negation of $\\forall \\epsilon \\gt 0, \\exists \\delta \\gt 0, |x-a| < \\delta \\Rightarrow |f(x)-L| < \\epsilon$?', options: ['$\\exists \\epsilon \\gt 0, \\forall \\delta \\gt 0, \\exists x, |x-a| < \\delta \\wedge |f(x)-L| \\geq \\epsilon$', '$\\forall \\epsilon \\gt 0, \\exists \\delta \\gt 0, |f(x)-L| \\geq \\epsilon$', '$\\exists \\epsilon \\leq 0, \\forall \\delta \\leq 0, |f(x)-L| < \\epsilon$', '$\\forall \\epsilon, \\forall \\delta, |f(x)-L| \\geq \\epsilon$'], correctIndex: 0, hint: '<p>Negate each quantifier left to right, then negate the predicate.</p>', correctExplanation: 'Flip each quantifier ($\\forall \\to \\exists$, $\\exists \\to \\forall$) and negate the final predicate. The implication $P \\Rightarrow Q$ negates to $P \\wedge \\neg Q$.', wrongExplanations: { 1: 'Must flip ALL quantifiers, including the first $\\forall$.', 2: 'The bounds on $\\epsilon$ and $\\delta$ (being positive) are part of the domain restriction, not negated.', 3: 'Each quantifier must be flipped individually.' } },
    { difficulty: 'hard', question: 'Is this true: $\\forall n \\in \\mathbb{N}, \\exists m \\in \\mathbb{N}, m > n$?', options: ['Yes', 'No', 'Only for finite $n$', 'Undecidable'], correctIndex: 0, hint: '<p>For any natural number $n$, can you find a larger one?</p>', correctExplanation: 'For any $n$, choose $m = n + 1 > n$. This says there is no largest natural number, which is true.', wrongExplanations: { 1: 'Every natural number has a successor.', 2: 'All natural numbers are finite.', 3: 'This is provable from the Peano axioms.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'Negate: "All dogs are friendly." Start with "There exists..."', accept: ['there exists a dog that is not friendly', 'there exists a dog that is unfriendly'], placeholder: 'There exists...', explanation: '$\\neg(\\forall x, F(x)) \\equiv \\exists x, \\neg F(x)$.' },
    { difficulty: 'medium', question: 'Write the negation of $\\exists x, x^2 = 5$ using $\\forall$.', accept: ['forall x, x^2 != 5', 'for all x, x squared is not 5'], placeholder: 'For all x,...', explanation: '$\\neg(\\exists x, x^2 = 5) \\equiv \\forall x, x^2 \\neq 5$.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each quantified statement to its English:', pairs: [
      { left: '$\\forall x, P(x)$', right: 'For every x, P holds' },
      { left: '$\\exists x, P(x)$', right: 'There is some x where P holds' },
      { left: '$\\neg(\\forall x, P(x))$', right: 'Some x fails P' },
      { left: '$\\neg(\\exists x, P(x))$', right: 'No x satisfies P' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Quantifier negation rules:', expression: '$\\neg(\\forall x, P(x)) \\equiv$ {{0}} $x, \\neg P(x)$', blanks: [ { accept: ['\\exists', 'exists', '∃'], size: 6 } ], explanation: '"Not all" = "there exists one that does not."' },
    { difficulty: 'medium', context: 'Quantifier order:', expression: '$\\forall x, \\exists y$ means $y$ can {{0}} on $x$.', blanks: [ { accept: ['depend'], size: 8 } ], explanation: 'The quantifier order determines whether $y$ can change with $x$.' },
    { difficulty: 'medium', context: 'Modus Ponens:', expression: 'If $p \\to q$ and $p$, then {{0}}.', blanks: [ { accept: ['q'], size: 3 } ], explanation: 'Modus Ponens: given $p \\to q$ and $p$, conclude $q$.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Negate: $\\forall \\epsilon \\gt 0, \\exists \\delta \\gt 0, |x-a| < \\delta \\Rightarrow |f(x)-L| < \\epsilon$.', parts: [
      { question: 'First quantifier $\\forall \\epsilon \\gt 0$ becomes:', accept: ['exists epsilon \\gt 0', '\\exists \\epsilon \\gt 0'], placeholder: 'Negated quantifier', explanation: '$\\forall$ becomes $\\exists$.' },
      { question: 'Second quantifier $\\exists \\delta \\gt 0$ becomes:', accept: ['forall delta \\gt 0', '\\forall \\delta \\gt 0'], placeholder: 'Negated quantifier', explanation: '$\\exists$ becomes $\\forall$.' },
      { question: 'The implication $P \\Rightarrow Q$ negates to:', accept: ['P and not Q', 'P and ~Q'], placeholder: 'Negated predicate', explanation: '$\\neg(P \\to Q) = P \\wedge \\neg Q$.' }
    ], completionMessage: 'Negating the epsilon-delta limit definition: flip quantifiers, negate the predicate.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>Quantifier Strategy</h4>
    <ol><li><strong>Negation:</strong> $\\neg \\forall = \\exists \\neg$. $\\neg \\exists = \\forall \\neg$.</li>
    <li><strong>Order matters:</strong> $\\forall x \\exists y$ means $y$ can depend on $x$.</li>
    <li><strong>Negate implications:</strong> $\\neg(P \\to Q) = P \\wedge \\neg Q$.</li></ol></div>` }
},

/* TOPIC 1.5: Proof Techniques */
{
  id: 'proof-techniques',
  title: 'Proof Techniques',
  description: 'Direct proof, contrapositive, contradiction, and existence proofs. How mathematicians establish truth beyond doubt.',
  prereqRecap: [
    { term: 'Conditional', definition: '$P \\to Q$ ("if $P$ then $Q$"). The standard form of a theorem (Topic 1.3).' },
    { term: 'Contrapositive', definition: '$\\neg Q \\to \\neg P$, logically equivalent to $P \\to Q$ (Topic 1.3).' },
    { term: 'Even/Odd', definition: 'Even: $n = 2k$ for some integer $k$. Odd: $n = 2k + 1$.' }
  ],
  whyExists: { html: `
    <p><strong>Why proofs?</strong> In mathematics, checking examples is insufficient. $n^2 - n + 41$ is prime for $n = 0, 1, 2, \\ldots, 40$ but NOT for $n = 41$. Only a proof guarantees truth for ALL cases.</p>
  ` },
  concept: { html: `
    <div class="callout callout-key"><h4>Proof Methods</h4>
    <ol>
      <li><strong>Direct Proof:</strong> Assume $P$, derive $Q$ step by step.</li>
      <li><strong>Contrapositive:</strong> Prove $\\neg Q \\to \\neg P$ instead (equivalent to $P \\to Q$).</li>
      <li><strong>Contradiction:</strong> Assume $\\neg$(statement), derive a logical impossibility.</li>
      <li><strong>Proof by Cases:</strong> Split into exhaustive cases, prove each separately.</li>
      <li><strong>Existence Proof:</strong> To prove $\\exists x, P(x)$, exhibit a specific $x$ (constructive) or show non-existence leads to contradiction (non-constructive).</li>
    </ol></div>
    <div class="callout callout-key"><h4>Proof Template (Direct)</h4>
    <p>Claim: If $n$ is even, then $n^2$ is even.</p>
    <p><em>Proof:</em> Assume $n$ is even. By definition, $n = 2k$ for some integer $k$. Then $n^2 = (2k)^2 = 4k^2 = 2(2k^2)$. Since $2k^2$ is an integer, $n^2$ is even. $\\blacksquare$</p>
    ${WHY('Why start from the definition?', '<p>The definition is the ONLY thing you know about the hypothesis. "Even" means $n = 2k$. This gives you a concrete algebraic expression to manipulate toward the conclusion.</p>')}</div>
  ` },
  definition: { html: `<p><strong>Proof:</strong> A logical argument establishing that a statement is true, using axioms, definitions, and previously proven theorems.</p>` },
  examples: [{
    title: 'Proof by Contradiction',
    problem: 'Prove that $\\sqrt{2}$ is irrational.',
    steps: [
      { title: 'Assume the opposite', content: 'Suppose $\\sqrt{2}$ is rational: $\\sqrt{2} = p/q$ in lowest terms ($\\gcd(p,q) = 1$).', why: 'Contradiction proofs start by assuming the negation of the conclusion.' },
      { title: 'Square both sides', content: '$2 = p^2/q^2$, so $p^2 = 2q^2$. Thus $p^2$ is even, so $p$ is even: $p = 2k$.', why: 'If $p^2$ is even, $p$ must be even (odd squared is odd).' },
      { title: 'Substitute', content: '$(2k)^2 = 2q^2 \\Rightarrow 4k^2 = 2q^2 \\Rightarrow q^2 = 2k^2$. So $q$ is even.', why: 'Same reasoning: $q^2$ is even implies $q$ is even.' },
      { title: 'Contradiction', content: 'Both $p$ and $q$ are even, contradicting $\\gcd(p,q) = 1$. Therefore $\\sqrt{2}$ is irrational. $\\blacksquare$', why: 'We assumed lowest terms, but found both are even: contradiction.' }
    ]
  }],
  exercises: [
    { difficulty: 'easy', question: 'A direct proof of $P \\to Q$ starts by assuming:', options: ['$Q$', '$\\neg P$', '$P$', '$\\neg Q$'], correctIndex: 2, hint: '<p>Direct proof: assume the hypothesis, derive the conclusion.</p>', correctExplanation: 'Assume $P$ (the hypothesis), then use definitions and logic to derive $Q$ (the conclusion).', wrongExplanations: { 0: 'Assuming the conclusion is circular reasoning.', 1: 'Assuming $\\neg P$ proves nothing about $P \\to Q$.', 3: 'Assuming $\\neg Q$ is a contrapositive or contradiction approach.' } },
    { difficulty: 'easy', question: 'To disprove $\\forall x, P(x)$, you need:', options: ['A proof for all $x$', 'One counterexample', 'Two counterexamples', 'A proof by induction'], correctIndex: 1, hint: '<p>"For all" is disproved by finding one exception.</p>', correctExplanation: 'A single counterexample: one $x$ where $P(x)$ is false suffices to disprove a universal claim.', wrongExplanations: { 0: 'That would PROVE the claim, not disprove it.', 2: 'One counterexample is sufficient.', 3: 'Induction proves, not disproves.' } },
    { difficulty: 'medium', question: 'To prove $P \\to Q$ by contrapositive, you prove:', options: ['$Q \\to P$', '$\\neg P \\to \\neg Q$', '$\\neg Q \\to \\neg P$', '$P \\wedge \\neg Q$'], correctIndex: 2, hint: '<p>Contrapositive: negate both and reverse.</p>', correctExplanation: '$\\neg Q \\to \\neg P$ is logically equivalent to $P \\to Q$.', wrongExplanations: { 0: 'That is the converse, NOT equivalent.', 1: 'That is the inverse, NOT equivalent.', 3: 'That is the negation of $P \\to Q$.' } },
    { difficulty: 'medium', question: 'Which proof technique works for "The sum of two even integers is even"?', options: ['Contradiction', 'Direct proof', 'Cases', 'Induction'], correctIndex: 1, hint: '<p>Use the definition of even: $n = 2k$.</p>', correctExplanation: 'Direct: $m = 2a, n = 2b \\Rightarrow m + n = 2(a+b)$, which is even. $\\blacksquare$', wrongExplanations: { 0: 'Contradiction is unnecessary for this straightforward claim.', 2: 'No case split is needed.', 3: 'Induction is for statements indexed by natural numbers.' } },
    { difficulty: 'hard', question: 'If $n^2$ is even, then $n$ is even. Best technique?', options: ['Direct proof', 'Contrapositive', 'Contradiction', 'Induction'], correctIndex: 1, hint: '<p>Try the contrapositive: "If $n$ is odd, then $n^2$ is odd."</p>', correctExplanation: 'Contrapositive: If $n$ is odd ($n = 2k+1$), then $n^2 = 4k^2+4k+1 = 2(2k^2+2k)+1$ is odd. $\\blacksquare$', wrongExplanations: { 0: 'Direct proof is difficult here because even $n^2$ does not directly reveal $n$.', 2: 'Contradiction works but contrapositive is more direct.', 3: 'Not an induction problem.' } },
    { difficulty: 'hard', question: 'Two examples of a statement being true constitutes:', options: ['A valid proof', 'A proof for those cases only', 'Evidence but not proof', 'A proof by cases'], correctIndex: 2, hint: '<p>How many cases does a universal claim cover?</p>', correctExplanation: 'Examples provide evidence but NEVER prove a universal claim. Infinitely many cases exist, and you cannot check them all by example.', wrongExplanations: { 0: 'No finite number of examples proves a "for all" claim.', 1: 'A "proof for those cases" is not a standard mathematical concept in this context.', 3: 'Proof by cases requires exhaustive coverage of ALL cases.' } }
  ],
  freeResponse: [
    { difficulty: 'medium', question: 'Prove: If $n$ is even, then $n + 2$ is even. What is $n + 2$ in terms of $k$ (where $n = 2k$)?', accept: ['2k+2', '2(k+1)', '2k + 2'], placeholder: 'e.g. 2k+2', explanation: '$n = 2k \\Rightarrow n + 2 = 2k + 2 = 2(k + 1)$, which is even.' },
    { difficulty: 'hard', question: 'To prove $\\sqrt{3}$ is irrational by contradiction, you assume $\\sqrt{3} = p/q$ in lowest terms. What equation do you get after squaring?', accept: ['3q^2=p^2', 'p^2=3q^2', '3q2=p2'], placeholder: 'e.g. 3q^2=p^2', explanation: '$\\sqrt{3} = p/q \\Rightarrow 3 = p^2/q^2 \\Rightarrow p^2 = 3q^2$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Construct a direct proof: "The product of two odd integers is odd."', steps: [
      { content: 'Let $m = 2a + 1$ and $n = 2b + 1$ for integers $a, b$.' },
      { content: '$mn = (2a+1)(2b+1) = 4ab + 2a + 2b + 1$.' },
      { content: '$= 2(2ab + a + b) + 1$.' },
      { content: 'Since $2ab + a + b$ is an integer, $mn$ has the form $2k + 1$.' },
      { content: 'Therefore $mn$ is odd. $\\blacksquare$' }
    ], explanation: 'Direct proof: assume the hypothesis, use definitions, derive the conclusion.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each proof technique to its approach:', pairs: [
      { left: 'Direct proof', right: 'Assume P, derive Q' },
      { left: 'Contrapositive', right: 'Prove ¬Q → ¬P' },
      { left: 'Contradiction', right: 'Assume ¬(statement), find impossibility' },
      { left: 'Existence proof', right: 'Exhibit a specific example' }
    ] }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>Proof Strategy</h4>
    <ol><li><strong>What type of statement?</strong> $P \\to Q$: try direct first. "Not possible": try contradiction. $\\exists x$: find an example.</li>
    <li><strong>Start from definitions.</strong> Write out EXACTLY what the hypothesis means.</li>
    <li><strong>If direct fails:</strong> try contrapositive. If that fails: try contradiction.</li></ol></div>` }
}

] // end topics array
}); // end module push
})();
