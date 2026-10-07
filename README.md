# Math Projekt

Interactive math lessons, visual models, and GRE Quant practice.

An interactive math learning platform covering foundations through multivariable calculus, with puzzles, visualizations, and step-by-step solutions. Runs entirely in the browser with zero dependencies to install.

## Live Features

- **15 modules**: Foundations, Algebra (core, intermediate, advanced), Geometry, Precalculus, Trigonometry, Calculus 1-3, Probability & Statistics, and GRE Quantitative Reasoning
- **GRE prep layer**: Ten topics with original problems in all four GRE Quant formats, strategy limits, worked examples, and links to foundational lessons. Chart questions include their data in Practice mode. Test guidance links to official ETS pages; this is independent practice, not an official test simulation
- **2,000+ practice items**: Flashcards, worked examples, and procedural practice problems
- **Ten interaction types**: Multiple choice, quantitative comparison, multi-select, numeric entry, fill-in-the-blank, step builder, matching, multi-part problems, strategy selection, and faded worked examples
- **Four study modes**: Learn, Practice, Challenge, and Speed Drill (including a GRE Quant drill category)
- **Desmos integration**: Interactive graphing embedded directly in lessons
- **KaTeX rendering**: Publication-quality math notation throughout
- **Responsive figures**: Canvas charts and SVG diagrams retain their proportions on narrow screens. Function plots separate discontinuities, and theme changes preserve answers and interactive figure controls
- **Sound effects**: Answer feedback chimes synthesized with the Web Audio API; no audio files, can be muted from the header
- **Progress tracking**: Completion state saved in the browser through localStorage, with JSON export and import
- **Mini-games**: Timed drills and game mechanics to reinforce core skills
- **No backend**: No server, no accounts, no telemetry

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/VAMPAYR/math-projekt.git
   cd math-projekt
   ```

2. **Open `index.html` in any modern browser**
   - Double-click the file, or
   - Use a local server for the best experience:
     ```bash
     # Python
     python -m http.server 8000

     # Node.js (npx, no install needed)
     npx serve .
     ```
   - Then visit `http://localhost:8000`

3. **Start learning**
   - Pick a module from the sidebar (organized by difficulty).
   - Read the lesson, then switch to Practice or Challenge mode.
   - Use the Speed Drill button for timed sessions.
   - Progress saves automatically in the browser.
   - Use the Progress button to export or import saved progress.

## Learn to choose a method

Before calculating, state what the problem asks for and list the constraints:
units, domains, signs, and any geometric assumptions. Choose a representation
that makes the relationship visible, such as an equation, a diagram, a table,
or a graph. Explain why the method applies before using its formula.

After solving, check the result in the original conditions. Check units and
signs, then use another representation or a simple limiting case where useful.
Change one assumption and ask whether the same method still works. The study
guides and walkthroughs pair worked applications with contrasting cases and
independent variations so you can practice this transfer.

For example, a height problem needs a perpendicular height, a percentage
change needs a stated baseline, and an inverse-trig value needs a branch and
angle unit. Similar-looking questions can require different models when one
of these conditions changes.

## Project Structure

```
index.html              Main entry point
css/
  styles.css            Layout and theming
  game.css              Game mode styles
js/
  engine.js             Core engine: rendering, navigation, progress
  game_state.js         XP, streaks, and achievement tracking
  problem_engine.js     Interactive answer checking and practice rendering
  speed_drill.js        Timed drill mode
  visualizations.js     Desmos and custom visualization helpers
  mini_games.js         Interactive math mini-games
  self_study_guides.js  Topic study guides
  university_walkthroughs.js  Extended reasoning walkthroughs
  modules/              Curriculum modules and extension files
```

## Requirements

- A modern browser (Chrome, Firefox, Edge, Safari)
- Internet access for first load of KaTeX, Desmos, and Google Fonts CDN assets

## Dependencies

Runtime dependencies and browser API usage are listed in [`DEPENDENCIES.md`](DEPENDENCIES.md).

## Validation

Run the dependency-free regression checks with Node.js:

```bash
node --test tests/*.test.cjs
```

These checks cover curriculum registration, foundation links, answer formats,
module-specific grading and review schedules, canvas rendering, and interactive
figure geometry. They do not require local reference books.

GitHub Actions runs the regression suite, JavaScript syntax checks, and the
reference-book exclusion check on pushes and pull requests. The browser smoke
remains a separate local check because it exercises the external math assets.

For browser checks, start the static site and run the smoke script in an
environment that already provides Playwright and Chromium:

```bash
python -m http.server 8765 --bind 127.0.0.1
# In a second terminal:
node tests/browser-smoke.cjs
```

The browser script checks every lesson and its mobile figures,
mathematical notation, and preservation of answers when switching themes.
Set `MATH_TEST_URL` to test a different local URL. Browser screenshots go to
the ignored `tmp/` directory.

[Figure examples](docs/figures.md) show repaired geometry, trigonometry,
calculus, and GRE diagrams.

## Reference material

The public lessons and GRE examples are original writing. Keep reference books
in the ignored `sources/`, `books/`, or `references/` directories. PDF, EPUB,
MOBI, AZW, and DjVu files are ignored to prevent accidental book commits.

## Contributing

Contributions are welcome when they improve mathematical accuracy, learner feedback, accessibility, or browser reliability. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request.

Good first contributions include typo fixes, clearer explanations, additional accepted answers for free-response problems, and new practice problems for existing topics. Large curriculum changes should begin with an issue.

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE).
