# Math Projekt

An interactive math learning platform covering foundations through multivariable calculus, with puzzles, visualizations, and step-by-step solutions. Runs entirely in the browser with zero dependencies to install.

## Live Features

- **14 modules**: Foundations, Algebra (core, intermediate, advanced), Geometry, Precalculus, Trigonometry, Calculus 1-3, and Probability & Statistics
- **2,000+ practice items**: Flashcards, worked examples, and procedural practice problems
- **Four study modes**: Learn, Practice, Challenge, and Speed Drill
- **Desmos integration**: Interactive graphing embedded directly in lessons
- **KaTeX rendering**: Publication-quality math notation throughout
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

## Quality Tracking

The current content and release checklist is tracked in [`QUALITY_UPGRADE_TRACKER.md`](QUALITY_UPGRADE_TRACKER.md).

## Contributing

Contributions are welcome when they improve mathematical accuracy, learner feedback, accessibility, or browser reliability. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request.

Good first contributions include typo fixes, clearer explanations, additional accepted answers for free-response problems, and new practice problems for existing topics. Large curriculum changes should begin with an issue.

## License

This project is provided for educational use.
