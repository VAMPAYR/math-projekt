# Quality Upgrade Tracker

This tracker defines the remaining work needed to make Math Projekt self-sufficient for the topics already listed in the app. It does not expand the project into an unrelated curriculum. It strengthens the existing modules, explanations, examples, visual models, practice feedback, and release hygiene.

## Scope

The upgrade covers the browser application in this repository.

```text
index.html
css/
js/
js/modules/
js/self_study_guides.js
js/university_walkthroughs.js
README.md
CONTRIBUTING.md
DEPENDENCIES.md
.github/
```

Local reference material under `sources/` is not public project content. It must stay untracked and excluded from pushes.

## Non-Negotiable Rules

- Preserve the browser-only, no-build architecture.
- Keep work scoped to the topics already listed in the app unless the repository owner approves a new module.
- Do not commit `sources/`, private notes, credentials, environment files, keys, certificates, logs, generated folders, or local scratch scripts.
- Use reference material only for coverage and accuracy checks.
- Write public explanations in original language.
- Do not copy or lightly paraphrase protected source text.
- Keep public prose direct, formal, and maintained.
- Do not use emojis, em dashes, rhetorical questions, hype language, or public first-person prose.
- Do not add a formal license file until the repository owner chooses a license.

## Completion Standard

Each topic must answer this question with yes:

```text
Is the material for this topic sufficient based only on what the app provides?
```

A yes answer requires:

- prerequisite definitions included or recapped;
- core intuition stated before formal manipulation;
- exact rule or theorem stated clearly;
- at least one fully worked example;
- common misconception or failure mode explained;
- practical or historical context included when useful and supportable;
- visual or interactive model included when it improves understanding;
- practice items with correct answers, useful hints, and specific feedback;
- no visible raw TeX, broken HTML, malformed JavaScript, or console errors;
- no public source-note comments or unfinished internal wording.

## Dependency Tracking

Dependency inventory lives in `DEPENDENCIES.md`.

Current runtime dependency classes:

- local HTML, CSS, and JavaScript files;
- KaTeX CDN assets;
- Desmos browser graphing API;
- Google Fonts;
- browser APIs such as `localStorage`, `Blob`, `FileReader`, Canvas, and SVG;
- optional local static servers for development.

Safety status:

```text
sources/ is ignored.
.env and .env.* are ignored.
common key and certificate file types are ignored.
local scratch scripts are ignored.
node_modules, build, dist, coverage, logs, and temp folders are ignored.
```

## Module Inventory

| Order | Module | Topics | Upgrade Focus |
| --- | --- | ---: | --- |
| 1 | Mathematical Foundations | 7 | Number meaning, arithmetic logic, sets, proof, relations |
| 2 | Beginning Algebra | 7 | Equations, inequalities, signed numbers, graphing, systems |
| 3 | Geometry | 5 | Diagrams, theorem conditions, measurement reasoning |
| 4 | Intermediate Algebra | 4 | Exponents, factoring, quadratics, rational expressions |
| 5 | Advanced Algebra | 3 | Polynomial structure, quadratics, exponential and logarithmic models |
| 6 | Precalculus: Functions & Graphs | 7 | Functions, graph transformations, models, matrices, conics |
| 7 | Trigonometry | 4 | Unit circle, identities, triangle solving, trig graphs |
| 8 | Calculus 1A: Limits & Continuity | 3 | Limits, derivative motivation, derivative applications |
| 9 | Calculus 1B: Derivatives & Applications | 4 | Derivative rules, applications, antiderivatives |
| 10 | Calculus 2A: Integration & Techniques | 3 | Integral meaning, techniques, Taylor approximation |
| 11 | Calculus 2B: Sequences & Series | 6 | Series, applications, polar curves, differential equations |
| 12 | Calculus 3A: Vector Functions & Curves | 3 | Vector operations, gradients, multiple integrals |
| 13 | Calculus 3B: Multivariable Calculus | 5 | Dot and cross products, motion, vector fields, line integrals |
| 14 | Probability & Statistics | 6 | Counting, random variables, inference, regression |

## Topic Work Plan

### Pass 1: Correctness

For every topic:

- verify all definitions;
- verify every formula;
- verify every accepted free-response answer;
- verify every `correctIndex`;
- verify step-builder order;
- verify fill-blank answer variants;
- verify mathematical notation;
- remove duplicated or misleading practice items.

### Pass 2: Self-Sufficient Explanations

For every topic:

- add missing prerequisite recap;
- expand shallow examples into full worked solutions;
- explain why each method works;
- add one misconception check when the topic has common traps;
- connect symbolic work to a concrete situation;
- add or refine readiness checks.

### Pass 3: Historical and Practical Grounding

For every topic:

- add context only when the claim can be supported from available knowledge or local reference material;
- keep history broad when precise priority claims are uncertain;
- avoid unsupported dates, names, and discovery claims;
- connect the historical or practical context to the current method.

### Pass 4: Interaction and Visual Models

For every topic where visuals help:

- add or refine SVG, Canvas, or Desmos models;
- ensure labels do not overlap at desktop or mobile widths;
- make sliders and controls explain the mathematical parameter being changed;
- remove decorative icons that do not teach or guide interaction;
- keep visual design minimal and readable.

### Pass 5: Browser and Release Checks

Before release:

- run JavaScript syntax checks;
- run public wording scans;
- run source-exclusion checks;
- run a secret-pattern scan;
- test progress export and import;
- test all topics in the browser;
- test desktop and mobile layouts;
- inspect the browser console.

## Module Execution Checklist

Use this checklist in app order.

| Module | Correctness | Explanation Depth | History and Context | Interactions | Browser Pass |
| --- | --- | --- | --- | --- | --- |
| Mathematical Foundations | Pending | Pending | Pending | Pending | Pending |
| Beginning Algebra | Pending | Pending | Pending | Pending | Pending |
| Geometry | Pending | Pending | Pending | Pending | Pending |
| Intermediate Algebra | Pending | Pending | Pending | Pending | Pending |
| Advanced Algebra | Pending | Pending | Pending | Pending | Pending |
| Precalculus: Functions & Graphs | Pending | Pending | Pending | Pending | Pending |
| Trigonometry | Pending | Pending | Pending | Pending | Pending |
| Calculus 1A: Limits & Continuity | Pending | Pending | Pending | Pending | Pending |
| Calculus 1B: Derivatives & Applications | Pending | Pending | Pending | Pending | Pending |
| Calculus 2A: Integration & Techniques | Pending | Pending | Pending | Pending | Pending |
| Calculus 2B: Sequences & Series | Pending | Pending | Pending | Pending | Pending |
| Calculus 3A: Vector Functions & Curves | Pending | Pending | Pending | Pending | Pending |
| Calculus 3B: Multivariable Calculus | Pending | Pending | Pending | Pending | Pending |
| Probability & Statistics | Pending | Pending | Pending | Pending | Pending |

## Validation Commands

Run these before staging.

```powershell
git ls-files sources
git status --short --ignored
rg -n "Source:|Sources:" js/modules js/self_study_guides.js js/university_walkthroughs.js
rg -n "TODO|FIXME|HACK|noobie|newbie|draft|temporary|private|internal" --glob "!sources/**" --glob "!**/.git/**" --glob "!node_modules/**" --glob "!DEPENDENCIES.md" --glob "!QUALITY_UPGRADE_TRACKER.md" .
Get-ChildItem -Path js -Recurse -Filter *.js | ForEach-Object { node --check $_.FullName }
```

Run a local browser pass.

```powershell
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

Verify:

- all modules appear in the sidebar;
- every topic opens;
- all lesson path buttons work;
- all background tabs work;
- all collapsible explanation boxes work;
- practice, flash card, and challenge modes render where present;
- KaTeX renders correctly;
- Desmos visualizations load where used;
- custom SVG and Canvas visuals fit their containers;
- progress export and import round trip succeeds;
- the console shows no new errors.

## Current Baseline Notes

Current baseline checks completed on May 24, 2026:

- `sources/` is ignored and not tracked.
- `PREREQUISITE_ROADMAP.md` was removed.
- dependency inventory is tracked in `DEPENDENCIES.md`;
- source-exclusion and credential-exclusion rules are tracked in `.gitignore`;
- credential-format scan found no private key, GitHub token, OpenAI key, AWS access key, or Google API key pattern;
- all 67 listed topics have a university walkthrough;
- all 67 listed topics have historical or practical context;
- all 67 listed topics have a readiness check;
- JavaScript syntax checks pass;
- browser audit covered all listed topics and found no visible raw TeX, KaTeX errors, broken app SVGs, overflow flags, or console errors;
- remaining work is a deeper source-guided content pass, problem correctness pass, and visual refinement pass module by module.
