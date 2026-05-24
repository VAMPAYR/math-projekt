# Dependencies

Math Projekt is a browser-only application. It has no build step, package manifest, installed runtime dependency, backend service, account system, telemetry layer, or database.

## Runtime Entry Point

The application starts from `index.html`. The browser loads local CSS and JavaScript files directly.

```text
index.html
css/styles.css
css/game.css
js/visualizations.js
js/game_state.js
js/problem_engine.js
js/speed_drill.js
js/mini_games.js
js/engine.js
js/self_study_guides.js
js/university_walkthroughs.js
js/modules/*.js
```

## Curriculum Modules

The module files define the public learning content and practice data.

```text
js/modules/m1_foundations.js
js/modules/m2_algebra_core.js
js/modules/m_geometry.js
js/modules/m3_intermediate_algebra.js
js/modules/m3_algebra_advanced.js
js/modules/m4_precalculus.js
js/modules/m5_trigonometry.js
js/modules/m5_calculus1.js
js/modules/m6_calculus1.js
js/modules/m6_calculus2.js
js/modules/m7_calculus2.js
js/modules/m7_calculus3.js
js/modules/m8_calculus3.js
js/modules/m9_probability.js
js/modules/m9_statistics_extensions.js
js/modules/topic_extensions.js
```

## External Browser Assets

The app loads these external assets at runtime.

```text
https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css
https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js
https://www.desmos.com/api/v1.9/calculator.js
https://fonts.googleapis.com/css2?family=Inter...
```

KaTeX renders mathematical notation. Desmos provides embedded graphing where graph-heavy topics need it. Google Fonts provides Inter and JetBrains Mono.

The Desmos API key appears in `index.html` because the Desmos browser API requires a client-side key. Treat it as a public browser identifier, not as a private secret. The repository owner should review Desmos API terms and replace the key before production or high-traffic use when required.

## Browser APIs

The app uses standard browser APIs.

```text
DOM
localStorage
Blob
URL.createObjectURL
FileReader
Canvas
SVG
```

`localStorage` stores topic completion, XP, streaks, achievements, mastery data, and theme preference. The Progress tools export and import this data as JSON so learners can move progress between browsers or devices.

## Optional Local Servers

No server is required for production hosting. A local static server gives the most reliable behavior during development.

```bash
python -m http.server 8000
```

or:

```bash
npx serve .
```

Then open:

```text
http://localhost:8000
```

## Local Reference Material

The `sources/` directory is local reference material only. It is excluded from Git by `.gitignore` and must not be committed, copied into public documentation, or pushed to the repository.

Use reference material only to check coverage and mathematical accuracy. Public explanations must be original writing. Do not copy or lightly paraphrase protected text.

## Offline Behavior

The local application files can load without a backend. Full offline use requires external CDN assets to already exist in the browser cache. A fresh browser profile without network access will not load KaTeX, Desmos, or Google Fonts from the network.

## Pre-Push Safety Checks

Run these checks before staging or pushing.

```bash
git ls-files sources
git status --short --ignored
grep -R "Source:" js/modules js/self_study_guides.js js/university_walkthroughs.js || true
grep -R "Sources:" js/modules js/self_study_guides.js js/university_walkthroughs.js || true
grep -R "TODO\|FIXME\|HACK\|noobie\|newbie\|draft\|temporary\|private\|internal" . --exclude-dir=.git --exclude-dir=sources --exclude=DEPENDENCIES.md || true
```

Run the JavaScript syntax check.

```bash
find js -name "*.js" -print0 | xargs -0 -n1 node --check
```

On Windows PowerShell:

```powershell
Get-ChildItem -Path js -Recurse -Filter *.js | ForEach-Object { node --check $_.FullName }
```

Run a browser check from a local server.

```bash
python -m http.server 8000
```

Verify:

```text
The home page loads.
The sidebar renders all modules.
Every topic opens.
Lesson tabs and collapsible sections work.
Practice modes render.
KaTeX notation renders without visible errors.
Desmos visualizations load where used.
Progress export and import work.
The browser console shows no new errors.
```

## Development Constraints

Preserve the browser-only structure unless the repository owner approves an architecture change. Do not add a package manager, build tool, backend service, authentication layer, telemetry, or database as part of ordinary content, UI, or documentation work.
