# Math Projekt

An interactive math learning platform covering foundations through multivariable calculus, with puzzles, visualizations, and step-by-step solutions. Runs entirely in the browser with zero dependencies to install.

## Live Features

- **14 modules**: Foundations, Algebra (core, intermediate, advanced), Geometry, Precalculus, Trigonometry, Calculus 1-3, and Probability & Statistics
- **2,000+ practice items**: Flashcards, worked examples, and auto-generated problems
- **Four study modes**: Learn, Practice, Challenge, and Speed Drill
- **Desmos integration**: Interactive graphing embedded directly in lessons
- **KaTeX rendering**: Publication-quality math notation throughout
- **Progress tracking**: Completion state saved in your browser via localStorage
- **Mini-games**: Timed drills and game mechanics to reinforce core skills
- **Fully offline**: No server, no accounts, no telemetry

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
   - Use the Speed Drill button (lightning bolt icon) for timed sessions.
   - Your progress saves automatically in the browser.

## Project Structure

```
index.html              Main entry point
css/
  styles.css            Layout and theming
  game.css              Game mode styles
js/
  engine.js             Core engine: rendering, navigation, progress
  game_state.js         XP, streaks, and achievement tracking
  problem_engine.js     Auto-generated problem sets
  speed_drill.js        Timed drill mode
  visualizations.js     Desmos and custom visualization helpers
  mini_games.js         Interactive math mini-games
  modules/              One file per curriculum module (m1-m9)
```

## Requirements

- A modern browser (Chrome, Firefox, Edge, Safari)
- Internet connection only for first load (KaTeX and Desmos CDN assets are cached)

## License

This project is provided for educational use.
