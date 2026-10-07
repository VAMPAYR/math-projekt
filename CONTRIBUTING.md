# Contributing to Math Projekt

Math Projekt accepts focused contributions that strengthen mathematical accuracy, learner feedback, accessibility, and browser reliability. The project runs without a build step, server, account system, or local dependency installation. This structure keeps review focused on content quality and browser behavior.

## Local Setup

Clone the repository:

```bash
git clone https://github.com/VAMPAYR/math-projekt.git
cd math-projekt
```

Run a local server:

```bash
python -m http.server 8000
```

A Node-based server also works:

```bash
npx serve .
```

Open the local site:

```text
http://localhost:8000
```

Directly opening `index.html` can work for quick checks. A local server gives the most reliable browser behavior.

## Project Map

```text
index.html              Main entry point
css/
  styles.css            Layout and theme rules
  game.css              Game mode styles
js/
  engine.js             Rendering, navigation, and progress behavior
  game_state.js         XP, streaks, and achievements
  problem_engine.js     Interactive answer checking
  speed_drill.js        Timed practice mode
  review_engine.js      Spaced review schedules and saved review items
  sfx.js                Synthesized sound effects
  visualizations.js     Desmos and custom visualization helpers
  mini_games.js         Interactive math games
  modules/              Curriculum modules and problem content
```

Most content changes belong in `js/modules/`. Most behavior changes belong in `js/engine.js`, `js/problem_engine.js`, or the specific feature file.

## Contribution Types

Appropriate contributions include:

- Bug fixes with clear reproduction steps.
- Corrected mathematical statements.
- Clearer explanations, hints, and worked solutions.
- Additional accepted answers for free-response problems.
- New multiple-choice, free-response, and step-builder problems.
- GRE quantitative-comparison and select-all-that-apply problems.
- Accessibility fixes for keyboard, labels, contrast, and focus behavior.
- Browser compatibility fixes for Chrome, Firefox, Edge, and Safari.

Large curriculum changes need an issue before implementation. Focused pull requests receive faster review.

## Branch and Pull Request Workflow

Fork the repository.

Create a focused branch.

```bash
git checkout -b fix/free-response-answer-checking
```

or:

```bash
git checkout -b content/add-set-theory-problems
```

Make one coherent change.

Test the app locally.

Open a pull request into `main`.

Pull requests should describe the changed files, the reason for the change, and the local testing performed.

## Browser Testing

Before submitting a pull request, verify these points:

- The home page loads.
- The sidebar renders all modules.
- The changed topic opens.
- KaTeX notation renders correctly.
- Desmos visualizations still load when the topic uses them.
- The browser console shows no new errors.
- Existing progress behavior still works through localStorage.
- Completion persists after reload, and JSON export/import restores progress.

Content-only changes still require browser testing because malformed strings can break module loading.

## Multiple-Choice Problem Format

Use this structure for standard multiple-choice problems:

```js
{
  difficulty: 'easy',
  question: 'If $A = \\{1,2,3\\}$, what is $|A|$?',
  options: ['$1$', '$2$', '$3$', '$4$'],
  correctIndex: 2,
  hint: '<p>Cardinality means the number of elements in a set.</p>',
  correctExplanation: '$A$ has three elements, so $|A| = 3$.',
  wrongExplanations: {
    0: 'This choice counts one element.',
    1: 'This choice counts two elements.',
    3: 'This choice exceeds the number of elements.'
  }
}
```

Problem rules:

- `difficulty` must be `easy`, `medium`, or `hard`.
- `question` must state one precise task.
- `options` must contain plausible answer choices.
- `correctIndex` uses zero-based indexing.
- `hint` must guide the method without giving the answer.
- `correctExplanation` must explain the reasoning.
- `wrongExplanations` must explain each incorrect choice.

## GRE Problem Formats

Store quantitative-comparison problems in the topic's `quantComparison` array:

```js
quantComparison: [{
  difficulty: 'medium',
  setup: '$r$ is a nonzero real number.',
  quantityA: '$r^2$',
  quantityB: '$1$',
  correctIndex: 3,
  hint: '<p>Compare a value whose magnitude is below 1 with one above 1.</p>',
  explanation: 'At $r = 0.5$, A is smaller. At $r = 2$, A is greater. Both values satisfy the given condition, so the relationship is not fixed.',
  wrongExplanations: {
    0: 'A is smaller when $r = 0.5$.',
    1: 'A is greater when $r = 2$.',
    2: 'The quantities are equal only when $r = 1$ or $r = -1$.'
  }
}]
```

The engine supplies four fixed choices. Use `correctIndex: 0` for A greater,
`1` for B greater, `2` for equal, and `3` for an undetermined relationship.
`setup` is optional; `quantityA`, `quantityB`, and `explanation` are required.
Do not add an `options` array. A proof of choice D needs two allowed cases
with different relationships. One counterexample to another choice is not
enough. Explain each incorrect choice in `wrongExplanations`.

Store select-all-that-apply problems in the topic's `multiSelect` array:

```js
multiSelect: [{
  difficulty: 'easy',
  question: 'Which integers are factors of $30$? Select all that apply.',
  options: ['$3$', '$4$', '$5$', '$8$'],
  correctIndices: [0, 2],
  hint: '<p>A factor divides 30 with no remainder.</p>',
  explanation: '$30 = 3 \\cdot 10 = 5 \\cdot 6$. Division by 4 or 8 leaves a remainder, so select 3 and 5 only.'
}]
```

Use distinct, valid, zero-based indices in `correctIndices`. At least one
option must be correct. Evaluate every option and explain the complete
answer set. The engine awards credit only when the selected set exactly
matches `correctIndices`.

GRE numeric-entry practice uses `freeResponse`, described below. Include
any chart data or diagram needed to solve a problem in its question, since
Practice mode does not show the full lesson. Write original practice items;
do not copy test questions or add reference books.

## Strategy Selection and Faded Examples

Strategy selection tests recognition of a method before computation.
Store these items in `strategySelect` and use `scenario`, not `question`:

```js
strategySelect: [{
  difficulty: 'easy',
  scenario: 'A data set has $8$ values with mean $20$. Find its sum directly from these facts.',
  options: ['Multiply the mean by the number of values', 'Subtract the number of values from the mean', 'Order the values and find their median'],
  correctIndex: 0,
  explanation: 'Mean equals sum divided by count, so sum equals mean times count: $20 \\cdot 8 = 160$.',
  wrongExplanations: {
    1: 'Subtraction does not reverse division by the count.',
    2: 'The median describes a middle position and does not determine the sum.'
  }
}]
```

Use a valid zero-based `correctIndex`, explain why the method fits, and
give feedback for each other option. If several methods work, state the
criterion that makes one best for this scenario. The renderer shows
method explanations and option feedback after a choice; it does not
render a `hint` field for this activity.

Faded examples show early steps and ask the learner to finish the method.
Store these items in `fadedExamples` and use `problem` for the task:

```js
fadedExamples: [{
  difficulty: 'easy',
  problem: 'Solve $3x + 5 = 20$.',
  steps: [
    { given: 'Subtract $5$ from both sides: $3x = 15$.' },
    {
      prompt: 'Divide both sides by $3$. Enter $x$.',
      accept: [5],
      placeholder: 'Enter a number',
      explanation: '$x = 15/3 = 5$.',
      wrongHint: 'Divide $15$ by the coefficient $3$.'
    }
  ],
  completionMessage: 'Both operations preserve equality. Check: $3(5) + 5 = 20$.'
}]
```

Each source step must contain either `given` for displayed work or
`prompt` and `accept` for a blank. Include at least one blank, preserve
the solution order, and provide `explanation` and `wrongHint` for each
blank. A step with `given` is displayed as complete work even if other
fields are present. Numeric equivalence and optional per-step
`tolerance` follow the free-response rules below.

## Free-Response Problem Format

Use this structure for free-response problems:

```js
{
  difficulty: 'medium',
  question: 'If $|A| = 10$, $|B| = 7$, and $|A \\cap B| = 3$, what is $|A \\cup B|$?',
  accept: [14, '14'],
  placeholder: 'Enter a number',
  hint: '<p>Use inclusion-exclusion: $|A \\cup B| = |A| + |B| - |A \\cap B|$.</p>',
  explanation: '$10 + 7 - 3 = 14$.',
  solution: '$|A \\cup B| = 10 + 7 - 3 = 14$.'
}
```

Free-response rules:

- `accept` must include all intended answer values and common symbolic or word variants.
- Equivalent numeric forms match by value. A single numeric answer accepts equivalent decimals, fractions, scientific notation, and correctly grouped thousands; duplicating its string form is optional.
- Word answers should include capitalization-neutral alternatives only when the answer checker needs them.
- `placeholder` should state the expected input type.
- `explanation` should justify the answer.
- `solution` should show the full method for multi-step problems.

Acceptable answer examples:

```js
accept: [5, '5']
accept: ['irrational']
accept: ['7 and 8', '7,8']
accept: ['diagonalization', 'diagonal argument', "cantor's diagonal argument"]
```

For example, `accept: [0.25]` accepts `0.25`, `1/4`, `25/100`, and `2.5e-1`.
The checker requires a complete numeric entry. It rejects trailing text,
zero denominators, and expressions such as `1+2`; it does not evaluate
arbitrary algebra. List a symbolic form explicitly if the problem permits it.

Numeric answers are exact by default, apart from floating-point roundoff.
Add `tolerance` only when the question permits an approximation. It must
be a finite, nonnegative absolute error in the answer's units:

```js
{
  difficulty: 'easy',
  question: 'Estimate $\\sqrt{2}$ with an absolute error of at most $0.001$.',
  accept: [Math.SQRT2],
  tolerance: 0.001,
  placeholder: 'Enter an approximate number',
  hint: '<p>Compute several decimal places before rounding, and keep the error below the stated bound.</p>',
  explanation: '$\\sqrt{2} \\approx 1.414214$, so $1.414$ meets the stated error bound.'
}
```

Keep the prompt, accepted value, and tolerance consistent. For exact
questions, omit `tolerance`; do not use it to conceal an incorrect key.
Fill-in-the-blank, multi-part, and faded-example items can place `tolerance`
on the individual blank, part, or step that accepts the approximation.

## Step-Builder Problem Format

Step-builder problems require ordered solution steps in the source file. The interface shuffles the displayed order.

```js
{
  difficulty: 'medium',
  question: 'Solve $2x + 3 = 11$.',
  steps: [
    { content: 'Subtract 3 from both sides: $2x = 8$.' },
    { content: 'Divide both sides by 2: $x = 4$.' },
    { content: 'Check: $2(4) + 3 = 11$.' }
  ],
  explanation: 'Each operation preserves equality and isolates the variable.'
}
```

Step-builder rules:

- Source steps must appear in correct order.
- Each step must represent one mathematical action.
- The final step should verify the result when verification is useful.
- The explanation must identify the governing rule or method.

## Math Notation Rules

Use KaTeX-compatible notation. Escape backslashes inside JavaScript strings.

```js
'$A \\cup B$'
'$A \\cap B$'
'$\\sqrt{50}$'
'$2^5 = 32$'
'$\\frac{1}{2}$'
```

Correct JavaScript string form:

```js
'Use $\\frac{a}{b}$ for a fraction.'
```

Incorrect JavaScript string form:

```js
'Use $\frac{a}{b}$ for a fraction.'
```

## Content Standards

Every content contribution must satisfy these standards:

- Mathematical statements are correct.
- The question has a single defensible answer.
- The notation matches the surrounding module.
- The explanation teaches the method.
- Wrong-answer feedback identifies the specific error.
- New items avoid duplicate coverage unless the variation tests a distinct skill.
- Added HTML strings close every tag.
- Added JavaScript strings preserve valid syntax.

## Bug Reports

A useful bug report includes:

- The affected module and topic.
- The study mode where the issue appears.
- The expected behavior.
- The actual behavior.
- Steps that reproduce the issue.
- Browser and operating system details.
- Console errors when present.
- Screenshots when visual behavior matters.

## Pull Request Checklist

Before opening a pull request, verify these items:

- [ ] The app runs locally.
- [ ] The changed page renders.
- [ ] The browser console shows no new errors.
- [ ] Progress persists after reload, and JSON export/import restores progress.
- [ ] New math notation renders correctly.
- [ ] New problems include explanations.
- [ ] Free-response problems include accepted answer variants.
- [ ] Multiple-choice problems use the correct zero-based `correctIndex`.
- [ ] The pull request contains one coherent change.
- [ ] The pull request description states the testing performed.

## Review Standard

Review checks mathematical accuracy, browser behavior, readability, and maintainability. Small pull requests create cleaner review paths. Content changes require the same syntax discipline as code changes because each module loads as JavaScript.
