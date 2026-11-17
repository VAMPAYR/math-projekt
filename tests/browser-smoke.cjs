// Browser regressions for the figure and GRE curriculum repair.
// Start the static site, then run with Playwright available through NODE_PATH.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
let browser;

(async () => {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  const missingAssets = [];
  const appUrl = new URL(process.env.MATH_TEST_URL || 'http://127.0.0.1:8765');
  const localAsset = url => {
    const parsed = new URL(url);
    return parsed.origin === appUrl.origin && /\.(?:js|css)$/i.test(parsed.pathname);
  };
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (localAsset(response.url()) && response.status() >= 400) missingAssets.push(`${response.status()} ${new URL(response.url()).pathname}`);
  });
  page.on('requestfailed', request => {
    if (localAsset(request.url())) missingAssets.push(`${request.failure()?.errorText || 'Request failed'} ${new URL(request.url()).pathname}`);
  });
  await page.goto(appUrl.href, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => typeof MathEngine !== 'undefined' && document.querySelector('.module-card'));
  assert.ok(await page.evaluate(() => typeof window.katex?.render === 'function'), 'KaTeX failed to load');
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    const clippedActions = await page.evaluate(() => {
      const header = document.querySelector('.content-header').getBoundingClientRect();
      return [...document.querySelectorAll('.content-header button')].filter(button => {
        const rect = button.getBoundingClientRect();
        return rect.left < 0 || rect.right > innerWidth + 1 || rect.bottom > header.bottom + 1 || rect.width < 44 || rect.height < 44;
      }).map(button => button.id);
    });
    assert.deepEqual(clippedActions, [], `Mobile header actions are clipped or too small at ${width}px`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => {
    if (typeof Desmos === 'undefined') throw new Error('Desmos did not load during online browser validation');
    const original = Desmos.GraphingCalculator;
    window.graphTest = { created: 0, destroyed: 0, last: null };
    Desmos.GraphingCalculator = (...args) => {
      const calc = original(...args);
      const destroy = calc.destroy.bind(calc);
      calc.destroy = () => { window.graphTest.destroyed++; destroy(); };
      window.graphTest.created++;
      window.graphTest.last = calc;
      return calc;
    };
  });
  const modules = await page.evaluate(() => window.MATH_MODULES.map(m => ({ id: m.id, topics: m.topics.map(t => t.id) })));
  const defects = [];
  let checked = 0;
  let modesChecked = 0;
  const inspectFigures = async (moduleId, topicId, width) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(([m, t]) => MathEngine.navigateTo(m, t), [moduleId, topicId]);
    await page.waitForTimeout(150);
    const findings = await page.evaluate(() => {
      const findings = [];
      const content = document.getElementById('content-inner');
      // "undefined" is a legitimate mathematical answer, e.g. f(2) at a hole.
      // It is a rendering defect when it replaces a heading or authored step.
      if ([...content.querySelectorAll('h2,h3,h4,.step-title,.step-content,.sb-step-btn,.mp-part-question')]
        .some(el => el.textContent.trim() === 'undefined') || content.textContent.includes('[object Object]')) findings.push('Malformed rendered content');
      content.querySelectorAll('.katex-error').forEach(el => findings.push('KaTeX: ' + el.getAttribute('title')));
      content.querySelectorAll('.math-diagram svg, .intuition-lab-visual svg, .inline-model svg').forEach(svg => {
        const bounds = svg.viewBox.baseVal;
        if (!bounds.width || !bounds.height) return;
        svg.querySelectorAll('text').forEach(label => {
          const bbox = label.getBBox();
          const matrix = svg.getScreenCTM().inverse().multiply(label.getScreenCTM());
          const corners = [[bbox.x, bbox.y], [bbox.x + bbox.width, bbox.y + bbox.height]]
            .map(([x, y]) => new DOMPoint(x, y).matrixTransform(matrix));
          if (corners.some(p => p.x < bounds.x - 2 || p.y < bounds.y - 2 || p.x > bounds.x + bounds.width + 2 || p.y > bounds.y + bounds.height + 2)) findings.push('Clipped figure label: ' + label.textContent);
        });
      });
      content.querySelectorAll('.viz-container canvas').forEach(canvas => {
        const rect = canvas.getBoundingClientRect();
        if (Math.abs(rect.width / rect.height - canvas.width / canvas.height) > 0.01) findings.push('Canvas aspect ratio changed');
        const parent = canvas.parentElement;
        if (rect.right > parent.getBoundingClientRect().right + 2) {
          const style = getComputedStyle(parent);
          const accessibleScroll = ['auto', 'scroll'].includes(style.overflowX)
            && parent.scrollWidth > parent.clientWidth
            && parent.classList.contains('viz-scrollable')
            && parent.tabIndex === 0 && parent.getAttribute('role') === 'region';
          if (!accessibleScroll) findings.push('Canvas clipped without an accessible scroll region');
        }
      });
      return findings;
    });
    findings.forEach(finding => defects.push({ moduleId, topicId, width, finding }));
    checked++;
  };
  for (const mod of modules) for (const topicId of mod.topics) {
    await inspectFigures(mod.id, topicId, 1440);
    const modes = await page.locator('.mode-selector .mode-btn').allTextContents();
    for (const label of modes.filter(label => label.trim() !== 'Learn')) {
      const mode = label.trim().toLowerCase().replace(/\s/g, '');
      await page.evaluate(([mode, m, t]) => MathEngine.switchMode(mode, m, t), [mode, mod.id, topicId]);
      const invalid = await page.locator('.katex-error').count();
      if (invalid) defects.push({ moduleId: mod.id, topicId, mode, finding: 'Invalid math in activity mode' });
      modesChecked++;
    }
  }
  for (const mod of modules) {
    for (const topicId of mod.topics) await inspectFigures(mod.id, topicId, 390);
  }
  // Narrow-screen charts must remain readable and separately operable by keyboard.
  await inspectFigures('calculus-1', 'derivatives', 390);
  const scrollRegion = page.locator('.viz-container.viz-scrollable').first();
  await scrollRegion.waitFor();
  await scrollRegion.focus();
  for (let i = 0; i < 12; i++) await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => document.querySelector('.viz-container.viz-scrollable')?.scrollLeft > 0);
  const tangent = scrollRegion.locator('canvas[role="slider"]');
  await tangent.focus();
  const previousX = await tangent.getAttribute('aria-valuenow');
  await page.keyboard.press('ArrowRight');
  assert.notEqual(await tangent.getAttribute('aria-valuenow'), previousX, 'Tangent keyboard control stopped working');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.waitForFunction(() => !document.querySelector('.viz-container.viz-scrollable'));
  // A theme change must preserve the learner's answer and figure control.
  await page.evaluate(() => MathEngine.navigateTo('gre-quant', 'gre-algebra-toolkit'));
  const input = page.locator('.free-response-card .fr-input').first();
  await input.fill('12345');
  const slider = page.locator('.intuition-lab input[type=range]').first();
  if (await slider.count()) await slider.fill('3');
  await page.locator('#theme-toggle-btn').click();
  assert.equal(await input.inputValue(), '12345', 'Theme toggle discarded numeric input');
  if (await slider.count()) assert.equal(await slider.inputValue(), '3', 'Theme toggle reset model control');
  // Numeric entry must work through a real keyboard/DOM interaction.
  const exactAnswer = await page.evaluate(() => window.MATH_MODULES.find(m => m.id === 'gre-quant').topics
    .find(t => t.id === 'gre-algebra-toolkit').freeResponse[0].accept[0]);
  await input.fill(String(exactAnswer));
  await input.press('Enter');
  await page.waitForTimeout(100);
  assert.equal(await input.isDisabled(), true, 'Correct GRE numeric entry did not complete');
  // Desmos edits survive themes, and mounted calculators are released on navigation.
  await page.evaluate(() => MathEngine.navigateTo('trigonometry', 'unit-circle'));
  await page.waitForTimeout(200);
  await page.evaluate(() => {
    graphTest.last.setExpression({ id: 'smoke-test', latex: 'y=2x+1' });
    MathEngine.toggleTheme();
  });
  assert.ok(await page.evaluate(() => graphTest.last.getExpressions().some(e => e.id === 'smoke-test')), 'Theme switch discarded edited graph');
  assert.ok(await page.evaluate(() => document.querySelector('.graph-explorer-hint').textContent.includes('radians')), 'Trig explorer omitted angle units');
  await page.evaluate(() => MathEngine.goHome());
  assert.deepEqual(await page.evaluate(() => ({ created: graphTest.created, destroyed: graphTest.destroyed })),
    await page.evaluate(() => ({ created: graphTest.created, destroyed: graphTest.created })), 'A removed calculator retained resources');
  if (await page.evaluate(() => document.documentElement.dataset.theme === 'dark')) await page.locator('#theme-toggle-btn').click();
  await inspectFigures('geometry', 'points-lines-angles', 390);
  fs.mkdirSync('tmp', { recursive: true });
  await page.locator('.math-diagram').first().screenshot({ path: 'tmp/geometry-mobile.png' });
  await page.locator('.intuition-lab-visual').first().screenshot({ path: 'tmp/triangle-model-mobile.png' });
  await inspectFigures('trigonometry', 'unit-circle', 1440);
  await page.locator('.math-diagram').first().screenshot({ path: 'tmp/trigonometry-desktop.png' });
  // Persist real practice credit, export it, and restore it through FileReader.
  await page.evaluate(() => MathEngine.markTopicComplete('gre-quant', 'gre-algebra-toolkit'));
  const mastery = await page.evaluate(() => GameState.getTopicMastery('gre-algebra-toolkit', 'gre-quant'));
  assert.ok(mastery.score > 0, 'GRE practice did not retain module-specific mastery');
  await page.reload({ waitUntil: 'networkidle' });
  assert.deepEqual(await page.evaluate(() => GameState.getTopicMastery('gre-algebra-toolkit', 'gre-quant')), mastery,
    'Practice mastery did not survive reload');
  const downloadReady = page.waitForEvent('download');
  await page.evaluate(() => MathEngine.exportProgressFile());
  await (await downloadReady).saveAs('tmp/smoke-progress.json');
  const exported = fs.readFileSync('tmp/smoke-progress.json', 'utf8');
  const payload = JSON.parse(exported);
  assert.equal(payload.storage.math_hero_progress['gre-quant::gre-algebra-toolkit'].completed, true);
  assert.equal(payload.storage.math_hero_game_state.masterySchemaVersion, 2);
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.evaluate(() => GameState.getTopicMastery('gre-algebra-toolkit', 'gre-quant').score), 0);
  await page.evaluate(data => MathEngine.importProgressFile(new File([data], 'progress.json', { type: 'application/json' })), exported);
  await page.waitForFunction(() => GameState.getTopicMastery('gre-algebra-toolkit', 'gre-quant').score > 0);
  await page.reload({ waitUntil: 'networkidle' });
  assert.deepEqual(await page.evaluate(() => GameState.getTopicMastery('gre-algebra-toolkit', 'gre-quant')), mastery,
    'Import did not preserve module-specific mastery');
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('math_hero_progress'))['gre-quant::gre-algebra-toolkit'].completed), true);
  console.log(JSON.stringify({ checked, modesChecked, progressRoundTrip: 'passed', errors, missingAssets, defects }, null, 2));
  await browser.close();
  assert.deepEqual(errors, [], 'Browser runtime errors');
  assert.deepEqual(missingAssets, [], 'Missing local JavaScript or CSS assets');
  assert.deepEqual(defects, [], 'Curriculum or figure defects');
})().catch(async error => { console.error(error); if (browser) await browser.close(); process.exitCode = 1; });
