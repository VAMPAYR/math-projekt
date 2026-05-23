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

- `accept` must include all common correct forms.
- Numerical answers should include a number and a string version when useful.
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
- [ ] New math notation renders correctly.
- [ ] New problems include explanations.
- [ ] Free-response problems include accepted answer variants.
- [ ] Multiple-choice problems use the correct zero-based `correctIndex`.
- [ ] The pull request contains one coherent change.
- [ ] The pull request description states the testing performed.

## Review Standard

Review checks mathematical accuracy, browser behavior, readability, and maintainability. Small pull requests create cleaner review paths. Content changes require the same syntax discipline as code changes because each module loads as JavaScript.
