/* ============================================================
   MODULE 9: Probability & Statistics (3 topics)
   Source: Probability & Statistics exercises PDF, Thomas' Calculus probability applications
   ============================================================ */
(function() {
if (!window.MATH_MODULES) window.MATH_MODULES = [];
const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

window.MATH_MODULES.push({
id: 'probability-statistics',
order: 14,
title: 'Probability & Statistics',
description: 'Counting, probability distributions, expected value, and data analysis. Quantifying uncertainty with mathematics. Requires: algebra (Module 2) and basic calculus helps.',
topics: [

/* TOPIC 9.1: Counting, Probability & Combinatorics */
{
  id: 'counting-probability',
  title: 'Counting Principles & Probability',
  description: 'How to count outcomes systematically (permutations and combinations) and assign probabilities to events.',
  prereqRecap: [
    { term: 'Set', definition: 'A collection of distinct objects (just a group of things). $|A|$ = number of elements (Module 1).' },
    { term: 'Fraction', definition: '$\\frac{a}{b}$ where $a$ is the part and $b$ is the whole. Probability is a fraction between 0 and 1.' },
    { term: 'Factorial', definition: '$n! = n \\times (n-1) \\times \\cdots \\times 2 \\times 1$. $0! = 1$ by convention. $5! = 120$.' }
  ],
  whyExists: { html: `
    <p><strong>Why probability?</strong> Uncertainty is unavoidable: weather, medical diagnoses, financial markets, experimental outcomes. Probability provides a rigorous mathematical framework for reasoning about uncertain events, replacing guesswork with calculation.</p>
    ${WHY('Why does $0! = 1$?', '<p>Combinatorial reasoning: there is exactly 1 way to arrange 0 objects (do nothing). Algebraically: $n! = n \\times (n-1)!$, so $1! = 1 \\times 0!$, forcing $0! = 1$. The empty product convention in mathematics defines a product over no factors as 1 (the multiplicative identity).</p>')}
  ` },
  formalDefinitions: [
      { term: 'Sample Space', symbol: '$\\Omega$', definition: 'The set of all possible outcomes of an experiment. For rolling a die: $\\Omega = \\{1,2,3,4,5,6\\}$.' },
      { term: 'Event', symbol: '$A \\subseteq \\Omega$', definition: 'A subset of the sample space. The event "rolling even" is $A = \\{2,4,6\\}$.' },
      { term: 'Probability Axioms (Kolmogorov)', symbol: '', definition: '(1) $P(A) \\geq 0$ for all events $A$. (2) $P(\\Omega) = 1$. (3) For mutually exclusive events: $P(A \\cup B) = P(A) + P(B)$.' },
      { term: 'Conditional Probability', symbol: '$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$', definition: 'The probability of $A$ given that $B$ has occurred. Defined only when $P(B) > 0$. Foundation of Bayes\' Theorem.' },
      { term: 'Independence', symbol: '$P(A \\cap B) = P(A) \\cdot P(B)$', definition: 'Events $A$ and $B$ are independent if the occurrence of one does not affect the probability of the other.' }
    ],
    background: {
      title: 'Why Probability? Quantifying Uncertainty',
      content: '<p><strong>Probability</strong> was born from gambling. In 1654, <strong>Pascal</strong> and <strong>Fermat</strong> exchanged letters about how to split the stakes in an unfinished game of chance. Their correspondence founded probability theory.</p><p><strong>Why counting matters:</strong> To compute probability, you need to count favorable outcomes and total outcomes. Combinatorics (the mathematics of counting) is therefore inseparable from probability.</p><p><strong>Why $P(A) = \\frac{\\text{favorable}}{\\text{total}}$ works:</strong> This formula assumes all outcomes are equally likely (a fair coin, a fair die). When outcomes are not equally likely, you assign weights. The Kolmogorov axioms generalize this to arbitrarily complex situations.</p>'
    },
    mathGrammar: [
      { question: 'What does $P(A) = 0.3$ mean?', answer: 'If you repeated the experiment infinitely many times, event $A$ would happen about $30\\%$ of the time. $P = 0$ means impossible. $P = 1$ means certain. Everything else falls between.' },
      { question: 'Why do we multiply probabilities for independent events?', answer: '$P(A \\text{ and } B) = P(A) \\times P(B)$ when $A$ and $B$ do not affect each other. A coin flip ($0.5$) and a die roll ($\\frac{1}{6}$) are independent. The chance of both happening is $0.5 \\times \\frac{1}{6} = \\frac{1}{12}$. Multiplication counts the fraction of the fraction that satisfies both.' },
      { question: 'When do I add vs multiply probabilities?', answer: '<strong>Add</strong> when you want $A$ OR $B$ (either one): $P(A \\cup B)$. <strong>Multiply</strong> when you want $A$ AND $B$ (both): $P(A \\cap B)$. "Or" expands possibilities (add). "And" restricts them (multiply).' }
    ],
    concept: { html: `
    <div class="callout callout-key"><h4>Counting Principles</h4>
    <ul>
      <li><strong>Multiplication Principle:</strong> If task A has $m$ outcomes and task B has $n$ outcomes, then A followed by B has $m \\times n$ outcomes.</li>
      <li><strong>Permutation:</strong> Ordered arrangement. $P(n,r) = \\frac{n!}{(n-r)!}$.</li>
      <li><strong>Combination:</strong> Unordered selection. $\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$.</li>
    </ul>
    ${WHY('Permutation vs. Combination', '<p>Choosing a president, VP, and secretary from 10 people: order matters (permutation). Choosing a 3-person committee: order does not matter (combination). $P(10,3) = 720$ vs. $\\binom{10}{3} = 120$. Combinations divide by $r!$ to remove redundant orderings.</p>')}</div>
    <div class="callout callout-key"><h4>Probability Axioms</h4>
    <ol>
      <li>$0 \\leq P(A) \\leq 1$ for any event $A$.</li>
      <li>$P(S) = 1$ where $S$ is the sample space (all outcomes).</li>
      <li>$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ (inclusion-exclusion).</li>
    </ol></div>
    <div class="callout callout-key"><h4>Conditional Probability & Bayes' Theorem</h4>
    <p>$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ : probability of $A$ given $B$ has occurred.</p>
    <p>$$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$$ (Bayes' Theorem)</p>
    ${WHY('Why Bayes matters', '<p>Bayes\' theorem reverses conditional probabilities. Knowing how likely a positive test result is given a disease ($P(+|D)$), Bayes tells us how likely the disease is given a positive result ($P(D|+)$). This is fundamental to medical diagnosis, spam filters, and machine learning.</p>')}</div>
  
    ${WHY('Why does order matter in permutations but not combinations?', '<p>Arranging 3 books on a shelf: ABC, ACB, BAC, BCA, CAB, CBA are 6 different arrangements (3! = 6). Choosing 3 books to take on a trip: {A,B,C} is the same group regardless of order. Permutations count arrangements; combinations count selections.</p>')}
    ${WHY('Why is probability between 0 and 1?', '<p>P(A) = favorable / total. The number of favorable outcomes cannot exceed the total (max P = 1) and cannot be negative (min P = 0). P = 0 means impossible; P = 1 means certain.</p>')}` },
  definition: { html: `<p><strong>Probability:</strong> A function $P: \\text{events} \\to [0,1]$ satisfying the Kolmogorov axioms.</p><p><strong>Independent Events:</strong> $A$ and $B$ are independent if $P(A \\cap B) = P(A) \\cdot P(B)$.</p>` },
  examples: [{
    title: 'Counting and Probability',
    problem: 'A committee of 3 is chosen from 10 people. (a) How many committees? (b) Probability that a specific person is on the committee?',
    steps: [
      { title: 'Count committees', content: '$\\binom{10}{3} = \\frac{10!}{3! \\cdot 7!} = \\frac{10 \\times 9 \\times 8}{6} = 120$.', why: 'Order does not matter (a committee, not officers), so use combinations.' },
      { title: 'Favorable outcomes', content: 'Fix one person on the committee. Choose 2 more from remaining 9: $\\binom{9}{2} = 36$.', why: 'If the specific person IS on the committee, we choose the other 2 members from 9.' },
      { title: 'Probability', content: '$P = \\frac{36}{120} = \\frac{3}{10} = 0.3$.', why: 'Favorable/Total. Alternatively: $P = \\frac{3}{10}$ because 3 of the 10 spots are chosen.' }
    ]
  },
  {
    title: "Bayes' Theorem: Medical Testing",
    problem: 'A disease affects 2% of a population. A test has 95% sensitivity (true positive rate) and 90% specificity (true negative rate). If a person tests positive, what is the probability they have the disease?',
    steps: [
      { title: 'Define events and given probabilities', content: '$P(D) = 0.02$. $P(+|D) = 0.95$ (sensitivity). $P(-|\\overline{D}) = 0.90$, so $P(+|\\overline{D}) = 0.10$ (false positive rate).', why: 'Sensitivity = correctly detecting disease. Specificity = correctly ruling out disease. Their complements give error rates.' },
      { title: "Compute $P(+)$ via law of total probability", content: '$P(+) = P(+|D)P(D) + P(+|\\overline{D})P(\\overline{D}) = 0.95(0.02) + 0.10(0.98) = 0.019 + 0.098 = 0.117$.', why: 'A positive result can come from a true positive (diseased person detected) or a false positive (healthy person flagged). Both paths contribute.' },
      { title: "Apply Bayes' theorem", content: '$P(D|+) = \\frac{P(+|D)P(D)}{P(+)} = \\frac{0.019}{0.117} \\approx 0.162 = 16.2\\%$.', why: 'Despite a 95%-accurate test, only 16.2% of positives actually have the disease. The low base rate (2%) means false positives outnumber true positives. This is the "base rate fallacy" that Bayes\' theorem corrects.' }
    ]
  },
  {
    title: 'Conditional Probability with Cards',
    problem: 'Two cards are drawn without replacement from a standard deck. What is $P(\\text{2nd card is an ace} | \\text{1st card is an ace})$?',
    steps: [
      { title: 'After drawing one ace', content: 'If the first card is an ace, 3 aces remain out of 51 cards.', why: 'Without replacement: the first card is removed from the deck, changing both the numerator and denominator.' },
      { title: 'Compute conditional probability', content: '$P(\\text{2nd ace} | \\text{1st ace}) = \\frac{3}{51} = \\frac{1}{17} \\approx 0.059$.', why: 'Of the 51 remaining cards, exactly 3 are aces. This differs from independent draws (with replacement), where it would be $4/52 = 1/13$.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is probability?', back: 'P(A) = favorable / total outcomes (when equally likely). Always between 0 and 1.' },
      { type: 'why', front: 'Why is P(A or B) not just P(A)+P(B)?', back: 'If A and B overlap, adding counts the overlap twice. Subtract P(A and B) to fix.' },
      { type: 'how', front: 'Permutations vs Combinations?', back: 'Permutations: order matters (nPr). Combinations: order irrelevant (nCr). Committee = combination, ranking = permutation.' },
      { type: 'define', front: 'What does independent mean?', back: 'P(A and B) = P(A)*P(B). One event does not affect the other. Coin flips are independent.' }
    ],
    exercises: [
    { difficulty: 'easy', question: '$\\binom{5}{2} = $?', options: ['$20$', '$10$', '$25$', '$5$'], correctIndex: 1, hint: '<p>$\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$.</p>', correctExplanation: '$\\frac{5!}{2!3!} = \\frac{120}{2 \\cdot 6} = 10$.', wrongExplanations: { 0: '$P(5,2) = 20$ is the permutation. Combination divides by $2! = 2$.', 2: '$5^2 = 25$ is not the combination formula.', 3: '$5 = \\binom{5}{1}$, not $\\binom{5}{2}$.' } },
    { difficulty: 'easy', question: 'A fair die is rolled. $P(\\text{even}) = $?', options: ['$1/6$', '$1/3$', '$1/2$', '$2/3$'], correctIndex: 2, hint: '<p>Even outcomes: 2, 4, 6. Total outcomes: 6.</p>', correctExplanation: '3 even outcomes out of 6 total: $3/6 = 1/2$.', wrongExplanations: { 0: 'That is $P(\\text{specific number})$, not $P(\\text{even})$.', 1: '2 outcomes out of 6 would be $1/3$, but there are 3 even numbers.', 3: '$2/3$ would be 4 out of 6 outcomes.' } },
    { difficulty: 'medium', question: 'How many ways to arrange the letters in "MATH"?', options: ['$4$', '$16$', '$24$', '$256$'], correctIndex: 2, hint: '<p>4 distinct letters, order matters.</p>', correctExplanation: '$4! = 4 \\times 3 \\times 2 \\times 1 = 24$.', wrongExplanations: { 0: '4 is the number of letters, not arrangements.', 1: '$4^2 = 16$ is not the permutation formula.', 3: '$4^4 = 256$ counts arrangements with repetition allowed.' } },
    { difficulty: 'medium', question: 'Two coins are flipped. $P(\\text{at least one head}) = $?', options: ['$1/2$', '$1/4$', '$3/4$', '$1$'], correctIndex: 2, hint: '<p>Complement: $P(\\text{at least one H}) = 1 - P(\\text{no H})$.</p>', correctExplanation: '$P(\\text{TT}) = 1/4$. $P(\\text{at least one H}) = 1 - 1/4 = 3/4$.', wrongExplanations: { 0: 'That is $P(H)$ for ONE coin, not two.', 1: 'That is $P(\\text{both tails})$, the complement.', 3: '$P = 1$ would mean certainty, but TT is possible.' } },
    { difficulty: 'hard', question: 'A test is 99% accurate. Disease prevalence is 1%. You test positive. $P(\\text{disease}) \\approx$?', options: ['$99\\%$', '$50\\%$', '$1\\%$', '$\\approx 50\\%$'], correctIndex: 3, hint: '<p>Apply Bayes\' theorem. Consider false positives.</p>', correctExplanation: 'Bayes: $P(D|+) = \\frac{0.99 \\times 0.01}{0.99 \\times 0.01 + 0.01 \\times 0.99} = \\frac{0.0099}{0.0099 + 0.0099} = 0.5 = 50\\%$. The low prevalence dramatically reduces the predictive value.', wrongExplanations: { 0: '99% is the test accuracy, not the probability you have the disease. Base rate matters.', 1: 'Close, but the exact calculation with equal error rates gives exactly 50%.', 2: '1% is the prior probability. The positive test updates this to ~50%.' } },
    { difficulty: 'hard', question: '$P(A \\cup B) = 0.7$, $P(A) = 0.5$, $P(B) = 0.4$. Find $P(A \\cap B)$:', options: ['$0.2$', '$0.3$', '$0.1$', '$0.9$'], correctIndex: 0, hint: '<p>Inclusion-exclusion: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.</p>', correctExplanation: '$0.7 = 0.5 + 0.4 - P(A \\cap B)$. $P(A \\cap B) = 0.9 - 0.7 = 0.2$.', wrongExplanations: { 1: 'Check: $0.5 + 0.4 - 0.3 = 0.6 \\neq 0.7$.', 2: '$0.5 + 0.4 - 0.1 = 0.8 \\neq 0.7$.', 3: '$P(A \\cap B)$ cannot exceed $\\min(P(A), P(B)) = 0.4$.' } }
  ,

    {
      question: 'A bag has 5 red and 3 blue marbles. You draw one marble. P(red) = ?',
      type: 'mc',
      options: ['5/8', '3/8', '5/3', '1/2'],
      correctIndex: 0,
      solution: { steps: ['Total marbles: 5 + 3 = 8.', 'P(red) = favorable / total = 5/8.'] }
    },
    {
      question: 'You flip a fair coin 3 times. How many possible outcomes?',
      type: 'mc',
      options: ['8', '6', '3', '9'],
      correctIndex: 0,
      solution: { steps: ['Each flip has 2 outcomes. Three flips: 2 * 2 * 2 = 2^3 = 8.', 'HHH, HHT, HTH, HTT, THH, THT, TTH, TTT.'] }
    },
    {
      question: 'A and B are independent events with P(A)=0.3 and P(B)=0.5. P(A and B) = ?',
      type: 'mc',
      options: ['0.15', '0.80', '0.35', '0.20'],
      correctIndex: 0,
      solution: { steps: ['For independent events: P(A and B) = P(A) * P(B).', '0.3 * 0.5 = 0.15.'] }
    },
    {
      question: 'How many ways can you choose 3 students from a class of 10? (order does not matter)',
      type: 'mc',
      options: ['120', '720', '30', '1000'],
      correctIndex: 0,
      solution: { steps: ['Combination: C(10,3) = 10! / (3! * 7!) = (10*9*8)/(3*2*1) = 720/6 = 120.', 'Order does not matter, so we divide by 3! = 6.'] }
    }
    ],
  freeResponse: [
    { difficulty: 'easy', question: '$5! =$?', accept: [120, '120'], placeholder: 'Enter a number', explanation: '$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$.' },
    { difficulty: 'easy', question: '$\\binom{6}{2} =$?', accept: [15, '15'], placeholder: 'Enter a number', explanation: '$\\frac{6!}{2!4!} = \\frac{720}{2 \\cdot 24} = 15$.' },
    { difficulty: 'medium', question: 'Two dice are rolled. $P(\\text{sum} = 7) =$? (as fraction)', accept: ['1/6', '6/36'], placeholder: 'e.g. 1/6', hint: '<p>Count favorable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1).</p>', explanation: '6 favorable out of 36 total = $1/6$.' },
    { difficulty: 'medium', question: '$P(A) = 0.3$, $P(B) = 0.5$, $A$ and $B$ independent. $P(A \\cap B) =$?', accept: ['0.15', '.15'], placeholder: 'Number', explanation: 'Independent: $P(A \\cap B) = P(A) \\cdot P(B) = 0.3 \\cdot 0.5 = 0.15$.' },
    { difficulty: 'hard', question: 'A bag has 3 red and 5 blue balls. Picking 2 without replacement. $P(\\text{both red}) =$?', accept: ['3/28'], placeholder: 'Fraction', explanation: '$\\frac{\\binom{3}{2}}{\\binom{8}{2}} = \\frac{3}{28}$.' },
    { difficulty: 'hard', question: '$P(A|B) = 0.6$, $P(B) = 0.4$. Find $P(A \\cap B)$:', accept: ['0.24', '.24'], placeholder: 'Number', explanation: '$P(A \\cap B) = P(A|B) \\cdot P(B) = 0.6 \\cdot 0.4 = 0.24$.' },
    { difficulty: 'easy', question: '$5! =$?', accept: [120, '120'], placeholder: 'Number', explanation: '$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$.' },
    { difficulty: 'medium', question: '$C(7, 2) =$?', accept: [21, '21'], placeholder: 'Number', explanation: '$\\binom{7}{2} = \\frac{7!}{2!5!} = \\frac{42}{2} = 21$.' },
    { difficulty: 'hard', question: 'How many ways to arrange the letters in MATH?', accept: [24, '24'], placeholder: 'Number', explanation: '4 distinct letters: $4! = 24$.' },
    { difficulty: 'easy', question: '$P(3,2) =$?', accept: [6, '6'], placeholder: 'Number', explanation: '$P(3,2) = 3!/(3-2)! = 6/1 = 6$.' },
    { difficulty: 'hard', question: 'How many 5-card hands from a 52-card deck?', accept: ['2598960'], placeholder: 'Number', explanation: '$\\binom{52}{5} = 2{,}598{,}960$.' },
    { difficulty: 'easy', question: 'P(A or B) for mutually exclusive events: $P(A) + $ ?', accept: ['P(B)'], placeholder: 'Expression', explanation: 'Mutually exclusive: $P(A \\cup B) = P(A) + P(B)$.' },
    { difficulty: 'medium', question: 'If $P(A) = 0.3$ and $P(B) = 0.5$, $P(A \\cap B) = 0.1$, then $P(A \\cup B) =$?', accept: ['0.7'], placeholder: 'Probability', explanation: '$P(A \\cup B) = 0.3 + 0.5 - 0.1 = 0.7$.' },
    { difficulty: 'hard', question: '$P(A|B) = 0.4$, $P(B) = 0.5$. Find $P(A \\cap B)$:', accept: ['0.2', '0.20'], placeholder: 'Probability', explanation: '$P(A|B) = P(A \\cap B)/P(B)$. $P(A \\cap B) = 0.4 \\times 0.5 = 0.2$.' },
    { difficulty: 'easy', question: 'P(coin lands heads) =', accept: ['0.5', '1/2'], placeholder: 'Probability', explanation: 'Fair coin: $P(H) = 1/2 = 0.5$.' },
    { difficulty: 'medium', question: 'P(drawing a red card from a standard deck):', accept: ['1/2', '0.5', '26/52'], placeholder: 'Probability', explanation: '26 red cards out of 52. $P = 1/2$.' },
    { difficulty: 'hard', question: 'If events A and B are independent, $P(A \\cap B) = P(A) \\cdot$ ?', accept: ['P(B)'], placeholder: 'Expression', explanation: 'Independence: $P(A \\cap B) = P(A) \\cdot P(B)$.' },
    { difficulty: 'medium', question: 'The complement rule: $P(A\') =$?', accept: ['1-P(A)', '1 - P(A)'], placeholder: 'Formula', explanation: '$P(A\') = 1 - P(A)$.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'A club has 12 members. We select a president, VP, and secretary.', parts: [
      { question: 'Is this a permutation or combination? (P or C)', accept: ['P', 'permutation'], placeholder: 'P or C', explanation: 'Order matters (different roles), so permutation.' },
      { question: 'How many ways?', accept: [1320, '1320'], placeholder: 'Number', explanation: '$P(12,3) = 12 \\times 11 \\times 10 = 1320$.' }
    ], completionMessage: 'Permutation: order matters = more arrangements.' },
    { difficulty: 'hard', question: 'A hand of 5 cards from a standard 52-card deck.', parts: [
      { question: 'Total possible 5-card hands:', accept: [2598960, '2598960'], placeholder: 'Number', explanation: '$\\binom{52}{5} = 2598960$.' },
      { question: 'Number of flush hands (all same suit, any suit):', accept: [5148, '5148'], placeholder: 'Number', explanation: '$4 \\times \\binom{13}{5} = 4 \\times 1287 = 5148$.' },
      { question: '$P(\\text{flush}) \\approx$? (to 3 decimal places)', accept: ['0.002', '0.00198'], placeholder: 'Probability', explanation: '$5148/2598960 \\approx 0.002$.' }
    ], completionMessage: 'Card probabilities: combinations count hands, since order of cards does not matter.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'How many 4-letter "words" can be formed from A,B,C,D,E with no repeats?', steps: [
      { content: 'Position 1: 5 choices (any letter).' },
      { content: 'Position 2: 4 choices (one used).' },
      { content: 'Position 3: 3 choices.' },
      { content: 'Position 4: 2 choices.' },
      { content: 'Total: $5 \\times 4 \\times 3 \\times 2 = P(5,4) = 120$.' }
    ], explanation: 'Permutation without replacement: each position reduces the pool by 1.' },
    { difficulty: 'medium', question: '$P(A) = 0.3$, $P(B|A) = 0.8$. Find $P(A \\cap B)$.', steps: [
      { content: 'Definition: $P(A \\cap B) = P(B|A) \\cdot P(A)$.' },
      { content: '$P(A \\cap B) = 0.8 \\times 0.3 = 0.24$.' }
    ], explanation: 'Conditional probability multiplication rule: $P(A \\cap B) = P(B|A) \\cdot P(A)$.' },
    { difficulty: 'hard', question: 'A jar has 4 red and 6 blue balls. Draw 3 without replacement. Find $P(\\text{exactly 2 red})$.', steps: [
      { content: 'Ways to choose 2 red from 4: $\\binom{4}{2} = 6$.' },
      { content: 'Ways to choose 1 blue from 6: $\\binom{6}{1} = 6$.' },
      { content: 'Total favorable: $6 \\times 6 = 36$.' },
      { content: 'Total ways to choose 3 from 10: $\\binom{10}{3} = 120$.' },
      { content: '$P = 36/120 = 3/10 = 0.3$.' }
    ], explanation: 'Hypergeometric probability: multiply ways for each group, divide by total ways.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each concept to its formula:', pairs: [
      { left: 'Permutation', right: '$P(n,r) = \\frac{n!}{(n-r)!}$' },
      { left: 'Combination', right: '$\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$' },
      { left: 'Complement', right: '$P(A) = 1 - P(A^c)$' },
      { left: 'Inclusion-Exclusion', right: '$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$' }
    ] },
    { difficulty: 'medium', instruction: 'Match each concept to its formula:', pairs: [
      { left: 'Permutation', right: '$P(n,r) = n!/(n-r)!$' },
      { left: 'Combination', right: '$C(n,r) = n!/(r!(n-r)!)$' },
      { left: 'Factorial', right: '$n! = n(n-1)(n-2)\\cdots 1$' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Counting principle:', expression: 'If task 1 has $m$ ways and task 2 has $n$ ways, the total is $m$ {{0}} $n$.', blanks: [ { accept: ['*', 'times', '\\times'], size: 6 } ], explanation: 'Multiplication principle for independent sequential tasks.' },
    { difficulty: 'medium', context: 'Permutation vs. Combination:', expression: 'When order {{0}}, use permutations. When order {{1}}, use combinations.', blanks: [ { accept: ['matters'], size: 8 }, { accept: ['does not matter', 'doesnt matter'], size: 16 } ], explanation: 'Order matters = more arrangements = permutations.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Probability Strategy</h4>
    <ol><li><strong>Does order matter?</strong> Yes → permutation. No → combination.</li>
    <li><strong>Complement:</strong> $P(A) = 1 - P(\\text{not } A)$. Often easier.</li>
    <li><strong>Independent events:</strong> $P(A \\cap B) = P(A) \\cdot P(B)$.</li>
    <li><strong>Bayes:</strong> Update prior probabilities with new evidence.</li></ol></div>` }
},

/* TOPIC 9.2: Random Variables & Distributions */
{
  id: 'random-variables',
  title: 'Random Variables & Probability Distributions',
  description: 'Assigning numbers to random outcomes and studying their distributions: discrete (binomial) and continuous (normal).',
  prereqRecap: [
    { term: 'Probability', definition: '$P(A) \\in [0,1]$, the likelihood of event $A$ (Topic 9.1).' },
    { term: 'Function', definition: 'A rule assigning each input one output (Module 4).' },
    { term: 'Integral', definition: '$\\int_a^b f(x)\\,dx$ = area under $f$ (Module 6).' }
  ],
  whyExists: { html: `
    <p><strong>Why random variables?</strong> A random variable $X$ converts qualitative outcomes into numbers. "Coin flip" becomes $X = 0$ (tails) or $X = 1$ (heads). This lets us use all the tools of algebra and calculus on random phenomena.</p>
    ${WHY('Discrete vs. Continuous', '<p><strong>Discrete:</strong> $X$ takes countable values (dice rolls, counts). Probabilities are summed: $P(X = k)$. <strong>Continuous:</strong> $X$ takes any value in an interval (height, time). Probabilities are integrated: $P(a \\leq X \\leq b) = \\int_a^b f(x)\\,dx$ where $f$ is the probability density function (PDF).</p>')}
  ` },
  concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 440 220" width="440" height="220" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="180" x2="420" y2="180" stroke="#94a3b8" stroke-width="1"/>
  <path d="M 30 180 Q 80 178 120 170 Q 160 150 190 100 Q 210 50 220 30 Q 230 50 250 100 Q 280 150 320 170 Q 360 178 410 180" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" stroke-width="2.5"/>
  <line x1="220" y1="30" x2="220" y2="180" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="220" y="198" fill="#f59e0b" font-size="12" text-anchor="middle" font-family="Inter,sans-serif" font-weight="600">μ</text>
  <line x1="40" y1="177" x2="40" y2="183" stroke="#94a3b8" stroke-width="1"/>
    <text x="40" y="198" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="Inter,sans-serif">-3σ</text><line x1="100" y1="177" x2="100" y2="183" stroke="#94a3b8" stroke-width="1"/>
    <text x="100" y="198" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="Inter,sans-serif">-2σ</text><line x1="160" y1="177" x2="160" y2="183" stroke="#94a3b8" stroke-width="1"/>
    <text x="160" y="198" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="Inter,sans-serif">-1σ</text><line x1="280" y1="177" x2="280" y2="183" stroke="#94a3b8" stroke-width="1"/>
    <text x="280" y="198" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="Inter,sans-serif">+1σ</text><line x1="340" y1="177" x2="340" y2="183" stroke="#94a3b8" stroke-width="1"/>
    <text x="340" y="198" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="Inter,sans-serif">+2σ</text><line x1="400" y1="177" x2="400" y2="183" stroke="#94a3b8" stroke-width="1"/>
    <text x="400" y="198" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="Inter,sans-serif">+3σ</text>
  <rect x="160" y="98" width="120" height="82" fill="rgba(16,185,129,0.08)" stroke="none"/>
  <text x="220" y="150" fill="#10b981" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">68%</text>
  <text x="220" y="25" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="Inter,sans-serif">Normal Distribution</text>
  <text x="370" y="120" fill="#94a3b8" font-size="10" font-family="Inter,sans-serif">95% within ±2σ</text>
  <text x="370" y="140" fill="#94a3b8" font-size="10" font-family="Inter,sans-serif">99.7% within ±3σ</text>
</svg>
</div>
<p class="math-diagram-label">The normal (bell) curve: 68% of data falls within ±1 standard deviation of the mean</p>

    <div class="callout callout-key"><h4>Expected Value (Mean)</h4>
    <p>Discrete: $E[X] = \\sum_i x_i P(X = x_i)$. Continuous: $E[X] = \\int_{-\\infty}^{\\infty} x f(x)\\,dx$.</p>
    <p>The "long-run average" of the random variable. Linearity: $E[aX + b] = aE[X] + b$.</p>
    ${WHY('Why is expected value useful?', '<p>Expected value quantifies the "center" of a distribution. In decision theory: choose the option with the highest expected value (or lowest expected cost). In physics: $E[X]$ is the center of mass of the probability distribution.</p>')}</div>
    <div class="callout callout-key"><h4>Variance & Standard Deviation</h4>
    <p>$\\text{Var}(X) = E[(X - \\mu)^2] = E[X^2] - (E[X])^2$</p>
    <p>$\\sigma = \\sqrt{\\text{Var}(X)}$ (standard deviation: same units as $X$).</p>
    <p>Properties: $\\text{Var}(aX + b) = a^2 \\text{Var}(X)$. For independent $X, Y$: $\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y)$.</p></div>
    <div class="callout callout-key"><h4>Key Discrete Distributions</h4>
    <ul>
      <li><strong>Binomial:</strong> $X \\sim \\text{Bin}(n,p)$. $P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}$. $E[X] = np$, $\\text{Var}(X) = np(1-p)$. Models: number of successes in $n$ independent trials.</li>
      <li><strong>Geometric:</strong> $X \\sim \\text{Geo}(p)$. $P(X=k) = (1-p)^{k-1}p$. $E[X] = 1/p$. Models: number of trials until first success.</li>
      <li><strong>Poisson:</strong> $X \\sim \\text{Pois}(\\lambda)$. $P(X=k) = \\frac{e^{-\\lambda}\\lambda^k}{k!}$. $E[X] = \\text{Var}(X) = \\lambda$. Models: count of rare events in a fixed interval (arrivals, defects, calls).</li>
    </ul></div>
    <div class="callout callout-key"><h4>Continuous Distributions</h4>
    <ul>
      <li><strong>Uniform:</strong> $X \\sim U(a,b)$. $f(x) = \\frac{1}{b-a}$ on $[a,b]$. $E[X] = \\frac{a+b}{2}$, $\\text{Var}(X) = \\frac{(b-a)^2}{12}$.</li>
      <li><strong>Normal:</strong> $X \\sim N(\\mu, \\sigma^2)$. Bell curve. 68-95-99.7 rule: ~68% within $\\mu \\pm \\sigma$, ~95% within $\\mu \\pm 2\\sigma$, ~99.7% within $\\mu \\pm 3\\sigma$.</li>
      <li><strong>Standard Normal:</strong> $Z = \\frac{X - \\mu}{\\sigma}$ converts to $Z \\sim N(0,1)$. Use $z$-table for $P(Z \\leq z)$.</li>
    </ul></div>
    <div class="callout callout-key"><h4>Central Limit Theorem (CLT)</h4>
    <p>If $X_1, X_2, \\ldots, X_n$ are i.i.d. with mean $\\mu$ and variance $\\sigma^2$, then for large $n$:</p>
    <p>$$\\bar{X} = \\frac{1}{n}\\sum X_i \\approx N\\left(\\mu, \\frac{\\sigma^2}{n}\\right)$$</p>
    <p>Regardless of the original distribution, sample means become approximately normal. This is why the normal distribution appears everywhere in statistics.</p>
    ${WHY('Why does CLT matter?', '<p>The CLT justifies using normal-based inference (confidence intervals, hypothesis tests) even when the population is not normal. With $n \\geq 30$, the approximation is usually adequate. It explains why measurement errors, test scores, and averages of nearly any quantity tend to follow bell curves.</p>')}</div>
    <div class="callout callout-key"><h4>Law of Large Numbers</h4>
    <p>As $n \\to \\infty$, $\\bar{X}_n \\to \\mu$ (the sample mean converges to the population mean). This is why: (1) casinos profit long-term, (2) relative frequencies stabilize as you increase repetitions, (3) polls with larger samples are more accurate.</p></div>
  ` },
  definition: { html: `<p><strong>Random Variable:</strong> A function from the sample space to $\\mathbb{R}$.</p><p><strong>PDF:</strong> $f(x) \\geq 0$ with $\\int f(x)\\,dx = 1$.</p>` },
  examples: [{
    title: 'Expected Value and Binomial',
    problem: 'A fair coin is flipped 10 times. Find $E[X]$ and $P(X = 3)$ where $X$ = number of heads.',
    steps: [
      { title: 'Identify distribution', content: '$X \\sim \\text{Bin}(10, 0.5)$.', why: 'Fixed $n = 10$ trials, each with $p = 0.5$ success probability, independent.' },
      { title: 'Expected value', content: '$E[X] = np = 10(0.5) = 5$.', why: 'On average, 5 heads in 10 flips.' },
      { title: '$P(X = 3)$', content: '$\\binom{10}{3}(0.5)^3(0.5)^7 = 120 \\cdot \\frac{1}{1024} \\approx 0.117$.', why: '$\\binom{10}{3} = 120$ ways to choose which 3 flips are heads. Each specific sequence has probability $(0.5)^{10}$.' }
    ]
  },
  {
    title: 'Z-Scores and the Normal Distribution',
    problem: 'Exam scores are normally distributed with $\\mu = 72$ and $\\sigma = 8$. What percentage of students scored above 88?',
    steps: [
      { title: 'Compute the z-score', content: '$z = \\frac{x - \\mu}{\\sigma} = \\frac{88 - 72}{8} = 2$.', why: 'The z-score measures how many standard deviations $x$ is from the mean. $z = 2$ means 88 is exactly 2 standard deviations above the mean.' },
      { title: 'Apply the 68-95-99.7 rule', content: '95% of data falls within $\\mu \\pm 2\\sigma$. So 5% is outside this range, split equally: 2.5% above $\\mu + 2\\sigma$ and 2.5% below $\\mu - 2\\sigma$.', why: 'The normal distribution is symmetric, so the 5% in the tails splits evenly.' },
      { title: 'Answer', content: 'Approximately 2.5% of students scored above 88.', why: '$P(X \\gt 88) = P(Z \\gt 2) \\approx 0.025$. More precisely from a z-table: $P(Z \\gt 2) = 0.0228 \\approx 2.28\\%$.' }
    ]
  },
  {
    title: 'Variance Calculation',
    problem: 'A random variable $X$ has $P(X=1) = 0.2$, $P(X=2) = 0.5$, $P(X=3) = 0.3$. Find $E[X]$, $E[X^2]$, and $\\text{Var}(X)$.',
    steps: [
      { title: '$E[X]$', content: '$E[X] = 1(0.2) + 2(0.5) + 3(0.3) = 0.2 + 1.0 + 0.9 = 2.1$.', why: 'Weighted average: multiply each value by its probability and sum.' },
      { title: '$E[X^2]$', content: '$E[X^2] = 1^2(0.2) + 2^2(0.5) + 3^2(0.3) = 0.2 + 2.0 + 2.7 = 4.9$.', why: 'Square each value first, then weight by probability.' },
      { title: 'Variance', content: '$\\text{Var}(X) = E[X^2] - (E[X])^2 = 4.9 - 2.1^2 = 4.9 - 4.41 = 0.49$.', why: 'This shortcut formula is computationally easier than $E[(X-\\mu)^2]$.' },
      { title: 'Standard deviation', content: '$\\sigma = \\sqrt{0.49} = 0.7$.', why: 'Standard deviation has the same units as $X$, making it interpretable.' }
    ]
  }],
  exercises: [
    { difficulty: 'easy', question: 'A die gives $X$ = face value. $E[X] = $?', options: ['$3$', '$3.5$', '$4$', '$6$'], correctIndex: 1, hint: '<p>$E[X] = \\frac{1+2+3+4+5+6}{6}$.</p>', correctExplanation: '$\\frac{21}{6} = 3.5$.', wrongExplanations: { 0: 'The median of $\\{1,2,3,4,5,6\\}$ is between 3 and 4, but the mean is 3.5.', 2: '$\\frac{21}{6} = 3.5$, not 4.', 3: '6 is the maximum, not the expected value.' } },
    { difficulty: 'easy', question: 'If $P(X=1) = 0.3$, $P(X=2) = 0.7$, then $E[X] = $?', options: ['$1.5$', '$1.7$', '$1.3$', '$2.0$'], correctIndex: 1, hint: '<p>$E[X] = 1(0.3) + 2(0.7)$.</p>', correctExplanation: '$0.3 + 1.4 = 1.7$.', wrongExplanations: { 0: 'That is the midpoint, but probabilities are not equal.', 2: '$1(0.3) = 0.3$, $2(0.7) = 1.4$. Sum is 1.7.', 3: 'Expected value can be non-integer; it weights by probability.' } },
    { difficulty: 'medium', question: '$X \\sim \\text{Bin}(20, 0.3)$. $E[X] = $?', options: ['$3$', '$6$', '$10$', '$14$'], correctIndex: 1, hint: '<p>$E[X] = np$.</p>', correctExplanation: '$E[X] = 20 \\times 0.3 = 6$.', wrongExplanations: { 0: '$n \\times p = 20 \\times 0.3 = 6$, not 3.', 2: '$20 \\times 0.5 = 10$, but $p = 0.3$, not $0.5$.', 3: '$20 \\times 0.7 = 14$ uses $q = 1-p$ instead of $p$.' } },
    { difficulty: 'medium', question: 'The 68-95-99.7 rule states that ~68% of data in a normal distribution falls within:', options: ['$\\mu \\pm 2\\sigma$', '$\\mu \\pm \\sigma$', '$\\mu \\pm 3\\sigma$', '$\\mu \\pm 0.5\\sigma$'], correctIndex: 1, hint: '<p>The rule pairs percentages: 68-95-99.7 with 1-2-3 standard deviations.</p>', correctExplanation: '68% within 1σ, 95% within 2σ, 99.7% within 3σ.', wrongExplanations: { 0: '$\\mu \\pm 2\\sigma$ captures ~95%.', 2: '$\\mu \\pm 3\\sigma$ captures ~99.7%.', 3: 'Half a standard deviation captures much less than 68%.' } },
    { difficulty: 'hard', question: '$\\text{Var}(X) = E[X^2] - (E[X])^2$. If $E[X] = 5$ and $E[X^2] = 30$, then $\\sigma = $?', options: ['$5$', '$25$', '$\\sqrt{5}$', '$\\sqrt{30}$'], correctIndex: 2, hint: '<p>$\\text{Var} = 30 - 25 = 5$. $\\sigma = \\sqrt{\\text{Var}}$.</p>', correctExplanation: '$\\text{Var} = 30 - 5^2 = 5$. $\\sigma = \\sqrt{5} \\approx 2.236$.', wrongExplanations: { 0: '5 is the variance, not the standard deviation. Take the square root.', 1: '$25 = (E[X])^2$, not the variance.', 3: '$\\sqrt{30} = \\sqrt{E[X^2]}$, but you must subtract $(E[X])^2$ first.' } },
    { difficulty: 'hard', question: 'For independent $X$ and $Y$: $\\text{Var}(X + Y) = $?', options: ['$\\text{Var}(X) + \\text{Var}(Y)$', '$\\text{Var}(X) \\cdot \\text{Var}(Y)$', '$(\\text{Var}(X) + \\text{Var}(Y))^2$', '$\\text{Var}(X) - \\text{Var}(Y)$'], correctIndex: 0, hint: '<p>Independence implies $\\text{Cov}(X,Y) = 0$.</p>', correctExplanation: '$\\text{Var}(X+Y) = \\text{Var}(X) + \\text{Var}(Y) + 2\\text{Cov}(X,Y)$. Independence makes $\\text{Cov} = 0$, so variances add.', wrongExplanations: { 1: 'Variances add for independent RVs, they do not multiply.', 2: 'No squaring. Variance is already a squared quantity.', 3: 'Variances add (even for $X - Y$!), they never subtract.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'A fair die: $E[X] =$?', accept: ['3.5', '7/2'], placeholder: 'Enter a number', explanation: '$(1+2+3+4+5+6)/6 = 3.5$.' },
    { difficulty: 'easy', question: '$X \\sim \\text{Bin}(10, 0.5)$. $E[X] =$?', accept: [5, '5'], placeholder: 'Enter a number', explanation: '$np = 10(0.5) = 5$.' },
    { difficulty: 'medium', question: 'If $P(X=1) = 0.4, P(X=2) = 0.6$, then $E[X] =$?', accept: ['1.6'], placeholder: 'Enter a number', explanation: '$1(0.4) + 2(0.6) = 1.6$.' },
    { difficulty: 'medium', question: 'For normal distribution, what % of data falls within 2 standard deviations?', accept: [95, '95', '95%'], placeholder: 'Percentage', explanation: '68-95-99.7 rule: 95% within $\\mu \\pm 2\\sigma$.' },
    { difficulty: 'medium', question: 'Score of 80, $\\mu = 70$, $\\sigma = 5$. What is the z-score?', accept: [2, '2'], placeholder: 'Number', explanation: '$z = (80-70)/5 = 2$.' },
    { difficulty: 'hard', question: 'If $E[X] = 4$ and $E[X^2] = 20$, what is $\\text{Var}(X)$?', accept: [4, '4'], placeholder: 'Enter a number', explanation: '$20 - 16 = 4$.' },
    { difficulty: 'hard', question: '$X \\sim \\text{Bin}(100, 0.3)$. $\\sigma =$? (to 1 decimal)', accept: ['4.6', '4.58'], placeholder: 'Standard deviation', explanation: '$\\sigma = \\sqrt{npq} = \\sqrt{100(0.3)(0.7)} = \\sqrt{21} \\approx 4.58$.' },
    { difficulty: 'hard', question: '$X \\sim \\text{Poisson}(\\lambda = 6)$. $E[X] =$?', accept: [6, '6'], placeholder: 'Number', explanation: 'For Poisson: $E[X] = \\lambda = 6$.' },
    { difficulty: 'easy', question: 'Mean of $X \\sim \\text{Bin}(10, 0.3)$:', accept: [3, '3'], placeholder: 'Number', explanation: '$\\mu = np = 10(0.3) = 3$.' },
    { difficulty: 'medium', question: 'If $X \\sim N(100, 15^2)$, what percentage lies within 1 SD of the mean?', accept: ['68', '68%'], placeholder: 'Percentage', explanation: 'Empirical rule: ~68% within 1 SD.' },
    { difficulty: 'hard', question: 'Variance of $X \\sim \\text{Bin}(20, 0.5)$:', accept: [5, '5'], placeholder: 'Number', explanation: '$\\sigma^2 = npq = 20(0.5)(0.5) = 5$.' },
    { difficulty: 'easy', question: 'For a fair die, $P(\\text{even}) =$?', accept: ['1/2', '0.5', '3/6'], placeholder: 'Probability', explanation: '3 even outcomes (2,4,6) out of 6. $P = 1/2$.' },
    { difficulty: 'hard', question: 'If $X \\sim \\text{Poisson}(4)$, find $E[X^2]$ given $\\text{Var}(X) = 4$:', accept: [20, '20'], placeholder: 'Number', explanation: '$\\text{Var}(X) = E[X^2] - (E[X])^2$. $4 = E[X^2] - 16$. $E[X^2] = 20$.' },
    { difficulty: 'easy', question: 'Standard deviation of $X \\sim \\text{Bin}(100, 0.5)$:', accept: [5, '5'], placeholder: 'Number', explanation: '$\\sigma = \\sqrt{npq} = \\sqrt{100 \\cdot 0.5 \\cdot 0.5} = \\sqrt{25} = 5$.' },
    { difficulty: 'medium', question: 'For $X \\sim N(50, 100)$, the standard deviation is:', accept: [10, '10'], placeholder: 'Number', explanation: '$\\sigma = \\sqrt{100} = 10$.' },
    { difficulty: 'easy', question: 'Expected value of a fair 6-sided die:', accept: ['3.5', '7/2'], placeholder: 'Number', explanation: '$E[X] = (1+2+3+4+5+6)/6 = 3.5$.' },
    { difficulty: 'medium', question: 'Variance of $X$ if $E[X] = 5$ and $E[X^2] = 29$:', accept: [4, '4'], placeholder: 'Number', explanation: '$\\text{Var}(X) = E[X^2] - (E[X])^2 = 29 - 25 = 4$.' },
    { difficulty: 'hard', question: 'Law of total probability: if $B_1, B_2$ partition $S$, then $P(A) =$?', accept: ['P(A|B1)P(B1)+P(A|B2)P(B2)'], placeholder: 'Formula', explanation: '$P(A) = P(A|B_1)P(B_1) + P(A|B_2)P(B_2)$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Find $P(X = 3)$ for $X \\sim \\text{Bin}(5, 0.4)$.', steps: [
      { content: '$P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$.' },
      { content: '$\\binom{5}{3} = 10$.' },
      { content: '$(0.4)^3 = 0.064$.' },
      { content: '$(0.6)^2 = 0.36$.' },
      { content: '$P(X=3) = 10 \\cdot 0.064 \\cdot 0.36 = 0.2304$.' }
    ], explanation: 'Binomial formula: $\\binom{n}{k}p^k q^{n-k}$. Each term has a combinatorial and probabilistic component.' },
    { difficulty: 'medium', question: 'Test score 92, class mean $\\mu = 78$, standard deviation $\\sigma = 7$. Find the z-score.', steps: [
      { content: '$z = \\frac{x - \\mu}{\\sigma}$.' },
      { content: '$z = \\frac{92 - 78}{7} = \\frac{14}{7} = 2$.' },
      { content: 'A z-score of 2 means the score is 2 standard deviations above the mean.' }
    ], explanation: 'Z-score: number of standard deviations from the mean. Positive = above, negative = below.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'A factory produces items with 2% defect rate. Sample 50 items.', parts: [
      { question: 'What distribution models the number of defects?', accept: ['binomial', 'Binomial', 'Bin'], placeholder: 'Distribution name', explanation: 'Fixed $n$, constant $p$, independent trials: Binomial.' },
      { question: '$E[\\text{defects}] =$?', accept: [1, '1'], placeholder: 'Expected value', explanation: '$np = 50(0.02) = 1$.' },
      { question: '$\\text{Var} =$?', accept: ['0.98'], placeholder: 'Variance', explanation: '$npq = 50(0.02)(0.98) = 0.98$.' }
    ], completionMessage: 'Binomial: $E[X] = np$, $\\text{Var}(X) = npq$, where $q = 1-p$.' }
  ],
  matching: [
    { difficulty: 'medium', instruction: 'Match each distribution to its expected value formula:', pairs: [
      { left: 'Binomial($n,p$)', right: '$E[X] = np$' },
      { left: 'Poisson($\\lambda$)', right: '$E[X] = \\lambda$' },
      { left: 'Uniform($a,b$)', right: '$E[X] = (a+b)/2$' },
      { left: 'Normal($\\mu,\\sigma^2$)', right: '$E[X] = \\mu$' }
    ] },
    { difficulty: 'medium', instruction: 'Match each distribution to its expected value:', pairs: [
      { left: 'Binomial', right: '$np$' },
      { left: 'Poisson', right: '$\\lambda$' },
      { left: 'Uniform (1 to n)', right: '$(n+1)/2$' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Expected value:', expression: '$E[X] = \\sum x_i \\cdot$ {{0}}', blanks: [ { accept: ['P(x_i)', 'p(x_i)', 'P(xi)'], size: 8 } ], explanation: '$E[X]$ = weighted average of outcomes by their probabilities.' },
    { difficulty: 'medium', context: 'Variance formula:', expression: '$\\text{Var}(X) = E[X^2] -$ {{0}}', blanks: [ { accept: ['(E[X])^2', 'E[X]^2', '(EX)^2'], size: 10 } ], explanation: '$\\text{Var}(X) = E[X^2] - (E[X])^2$.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Random Variables Strategy</h4>
    <ol><li><strong>Identify the distribution:</strong> Binomial? Normal? Poisson?</li>
    <li><strong>$E[X]$:</strong> Weighted average of outcomes.</li>
    <li><strong>$\\text{Var}(X)$:</strong> $E[X^2] - (E[X])^2$. Measures spread.</li>
    <li><strong>Normal:</strong> 68-95-99.7 for within 1-2-3 σ of the mean.</li></ol></div>` }
}

] // end topics array
}); // end module push
})();
