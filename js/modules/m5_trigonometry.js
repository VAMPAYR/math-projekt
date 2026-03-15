/* ============================================================
   MODULE 5: Trigonometry (4 topics)
   Source: Thomas' Calculus Ch 1.3, Precalculus Trig chapters
   ============================================================ */
(function() {
if (!window.MATH_MODULES) window.MATH_MODULES = [];
const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

window.MATH_MODULES.push({
id: 'trigonometry',
order: 7,
title: 'Trigonometry',
description: 'Angles in radians, the unit circle, and trigonometric identities. Connects geometry to algebra. Requires: geometry (Module 3) and precalculus (Module 6).',
topics: [

/* TOPIC 5.1: Angles, Radians & the Unit Circle */
{
  id: 'unit-circle',
  title: 'Angles, Radians & the Unit Circle',
  description: 'Measuring angles in radians and defining trig functions as coordinates on the unit circle.',
  prereqRecap: [
    { term: 'Angle', definition: 'Formed by two rays sharing a common endpoint (vertex). Measured in degrees (360° = full rotation) or radians.' },
    { term: 'Circle', definition: 'The set of all points at distance $r$ (radius) from a center point.' },
    { term: 'Coordinate Plane', definition: 'A plane with perpendicular x and y axes. Points are $(x, y)$.' }
  ],
  whyExists: { html: `
    <p><strong>Why radians?</strong> Degrees are arbitrary (360 was chosen by Babylonians for calendar convenience). Radians connect angle measure directly to arc length: an angle of $\\theta$ radians subtends an arc of length $r\\theta$ on a circle of radius $r$. This makes calculus formulas clean: $\\frac{d}{dx}\\sin(x) = \\cos(x)$ works ONLY in radians.</p>
    ${WHY('Why the unit circle?', '<p>The unit circle ($r = 1$) lets us define $\\cos\\theta$ and $\\sin\\theta$ as the $x$ and $y$ coordinates of the point at angle $\\theta$. This extends trig beyond right triangles to ALL angles, including negative and angles $ \\gt 360°$.</p>')}
  ` },
  formalDefinitions: [
      { term: 'Unit Circle', symbol: '$x^2 + y^2 = 1$', definition: 'Circle of radius 1 centered at the origin. For angle $\\theta$ measured from the positive $x$-axis, the point $(\\cos\\theta, \\sin\\theta)$ lies on this circle.' },
      { term: 'Sine', symbol: '$\\sin\\theta$', definition: 'The $y$-coordinate of the point on the unit circle at angle $\\theta$. Period: $2\\pi$. Range: $[-1, 1]$. Odd function: $\\sin(-\\theta) = -\\sin\\theta$.' },
      { term: 'Cosine', symbol: '$\\cos\\theta$', definition: 'The $x$-coordinate of the point on the unit circle at angle $\\theta$. Period: $2\\pi$. Range: $[-1, 1]$. Even function: $\\cos(-\\theta) = \\cos\\theta$.' },
      { term: 'Tangent', symbol: '$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$', definition: 'Undefined when $\\cos\\theta = 0$ (at $\\theta = \\frac{\\pi}{2} + n\\pi$). Period: $\\pi$. Range: $(-\\infty, \\infty)$.' },
      { term: 'Radian', symbol: '', definition: 'The angle subtended by an arc equal in length to the radius. $2\\pi$ radians = $360^\\circ$. $1$ radian $\\approx 57.3^\\circ$. Radians are dimensionless.' }
    ],
    graphExplorer: [
      { latex: 'y = \\sin(x)' },
      { latex: 'y = \\cos(x)' },
      { latex: 'y = \\tan(x)' }
    ],
    background: {
      title: 'Why "Cosine"? The Etymology of Trigonometry',
      content: '<p>The word <strong>trigonometry</strong> comes from Greek: <em>trigonon</em> (triangle) + <em>metron</em> (measure). It literally means "triangle measurement."</p><p><strong>Sine</strong> has a bizarre etymology. Indian mathematicians called the half-chord <em>jya-ardha</em>, shortened to <em>jya</em>. Arab translators transliterated this as <em>jiba</em>. Since Arabic is written without vowels, later readers misread <em>jb</em> as <em>jaib</em> (meaning "pocket" or "bay"). Latin translators then translated <em>jaib</em> as <em>sinus</em> (meaning "bay" or "fold"), which became <strong>sine</strong>.</p><p><strong>Cosine</strong> means "complement\'s sine" (Latin: <em>cosinus</em> = co-sinus). It is the sine of the complementary angle: $\\cos\\theta = \\sin(90^\\circ - \\theta)$. This is why it is called <em>co</em>sine.</p><p><strong>Tangent</strong> comes from Latin <em>tangere</em> (to touch). The tangent line touches the circle at exactly one point. The length of this touching line segment, from the point of tangency to the x-axis, gives the tangent ratio.</p><p><strong>Why does trigonometry exist?</strong> Ancient civilizations needed it to navigate by stars, survey land, and build structures. Today, it models anything that oscillates: sound waves, light waves, alternating current, and orbital mechanics.</p>'
    },
    mathGrammar: [
      { question: 'What does $\\sin(\\theta)$ actually compute?', answer: 'Draw a right triangle with angle $\\theta$. $\\sin(\\theta) = \\frac{\\text{opposite side}}{\\text{hypotenuse}}$. On the unit circle (radius 1), it is simply the $y$-coordinate of the point at angle $\\theta$. It tells you how high or low the point sits compared to the center.' },
      { question: 'Why does $\\cos(\\theta)$ exist separately from $\\sin(\\theta)$?', answer: '$\\cos(\\theta)$ measures the horizontal position (the $x$-coordinate), while $\\sin(\\theta)$ measures the vertical. You need both to fully describe where a point is. Together, $(\\cos\\theta, \\sin\\theta)$ gives the exact position on the unit circle.' },
      { question: 'Why is the unit circle useful?', answer: 'It extends trigonometry beyond right triangles. Right triangles only have angles up to $90^\\circ$. The unit circle defines sine and cosine for ALL angles: $120^\\circ$, $-45^\\circ$, $720^\\circ$, any number. This is what makes trig useful for modeling waves, rotations, pendulums, and anything circular.' },
      { question: 'How do I remember the values at standard angles?', answer: 'Use the pattern for $\\sin$: at $0, 30, 45, 60, 90$ degrees, sine takes values $\\frac{\\sqrt{0}}{2}, \\frac{\\sqrt{1}}{2}, \\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{3}}{2}, \\frac{\\sqrt{4}}{2}$. Simplify: $0, \\frac{1}{2}, \\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{3}}{2}, 1$. Cosine is the same sequence reversed.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 400 400" width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <line x1="60" y1="20" x2="60" y2="380" stroke="#334155" stroke-width="0.3"/><line x1="20" y1="60" x2="380" y2="60" stroke="#334155" stroke-width="0.3"/><line x1="100" y1="20" x2="100" y2="380" stroke="#334155" stroke-width="0.3"/><line x1="20" y1="100" x2="380" y2="100" stroke="#334155" stroke-width="0.3"/><line x1="140" y1="20" x2="140" y2="380" stroke="#334155" stroke-width="0.3"/><line x1="20" y1="140" x2="380" y2="140" stroke="#334155" stroke-width="0.3"/><line x1="180" y1="20" x2="180" y2="380" stroke="#334155" stroke-width="0.3"/><line x1="20" y1="180" x2="380" y2="180" stroke="#334155" stroke-width="0.3"/><line x1="220" y1="20" x2="220" y2="380" stroke="#334155" stroke-width="0.3"/><line x1="20" y1="220" x2="380" y2="220" stroke="#334155" stroke-width="0.3"/><line x1="260" y1="20" x2="260" y2="380" stroke="#334155" stroke-width="0.3"/><line x1="20" y1="260" x2="380" y2="260" stroke="#334155" stroke-width="0.3"/><line x1="300" y1="20" x2="300" y2="380" stroke="#334155" stroke-width="0.3"/><line x1="20" y1="300" x2="380" y2="300" stroke="#334155" stroke-width="0.3"/><line x1="340" y1="20" x2="340" y2="380" stroke="#334155" stroke-width="0.3"/><line x1="20" y1="340" x2="380" y2="340" stroke="#334155" stroke-width="0.3"/>
  <line x1="200" y1="20" x2="200" y2="380" stroke="#94a3b8" stroke-width="1"/>
  <line x1="20" y1="200" x2="380" y2="200" stroke="#94a3b8" stroke-width="1"/>
  <circle cx="200" cy="200" r="140" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <line x1="200" y1="200" x2="321" y2="130" stroke="#10b981" stroke-width="1.5"/>
  <line x1="321" y1="130" x2="321" y2="200" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="200" y1="200" x2="321" y2="200" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,3"/>
  <path d="M 225 200 A 25 25 0 0 1 218 185" fill="none" stroke="#e2e8f0" stroke-width="1"/>
  <text x="232" y="192" fill="#e2e8f0" font-size="10" font-family="Inter,sans-serif">θ</text>
  <text x="260" y="217" fill="#f59e0b" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">cos θ</text>
  <text x="335" y="170" fill="#ef4444" font-size="11" font-family="Inter,sans-serif">sin θ</text>
  <circle cx="340" cy="200" r="3" fill="#3b82f6"/><text x="345" y="197" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">(1, 0)</text>
  <circle cx="200" cy="60" r="3" fill="#3b82f6"/><text x="208" y="55" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">(0, 1)</text>
  <circle cx="60" cy="200" r="3" fill="#3b82f6"/><text x="38" y="215" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">(-1, 0)</text>
  <circle cx="200" cy="340" r="3" fill="#3b82f6"/><text x="208" y="355" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">(0, -1)</text>
  <circle cx="321" cy="130" r="4" fill="#10b981"/>
  <text x="325" y="125" fill="#10b981" font-size="9" font-family="Inter,sans-serif">(cos θ, sin θ)</text>
  <circle cx="299" cy="100" r="3" fill="#8b5cf6"/>
  <text x="303" y="93" fill="#8b5cf6" font-size="8" font-family="Inter,sans-serif">30°: (√3/2, ½)</text>
  <circle cx="270" cy="79" r="3" fill="#8b5cf6"/>
  <text x="230" y="72" fill="#8b5cf6" font-size="8" font-family="Inter,sans-serif">45°: (√2/2, √2/2)</text>
  <circle cx="270" cy="131" r="3" fill="#8b5cf6"/>
  <text x="230" y="125" fill="#8b5cf6" font-size="8" font-family="Inter,sans-serif">60°: (½, √3/2)</text>
</svg>
</div>
<p class="math-diagram-label">The unit circle: each point is (cos θ, sin θ) at angle θ from the positive x-axis</p>

    <div class="callout callout-key"><h4>Radian Measure</h4>
    <p>$2\\pi$ radians $= 360°$. So $\\pi$ rad $= 180°$.</p>
    <p>Conversion: $\\theta_{\\text{rad}} = \\theta_{\\text{deg}} \\cdot \\frac{\\pi}{180}$. $\\theta_{\\text{deg}} = \\theta_{\\text{rad}} \\cdot \\frac{180}{\\pi}$.</p>
    <p>Key values: $30° = \\frac{\\pi}{6}$, $45° = \\frac{\\pi}{4}$, $60° = \\frac{\\pi}{3}$, $90° = \\frac{\\pi}{2}$.</p></div>
    <div class="callout callout-key"><h4>The Unit Circle Definition</h4>
    <p>For angle $\\theta$ measured from positive x-axis, the terminal point on the unit circle is $(\\cos\\theta, \\sin\\theta)$.</p>
    <ul>
      <li>$\\cos\\theta$ = x-coordinate (horizontal distance)</li>
      <li>$\\sin\\theta$ = y-coordinate (vertical distance)</li>
      <li>$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$ (slope of the terminal ray)</li>
    </ul></div>
    <div class="callout callout-key"><h4>Key Unit Circle Values</h4>
    <p>$$\\cos(0) = 1,\\ \\sin(0) = 0$$</p>
    <p>$$\\cos\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{2},\\ \\sin\\frac{\\pi}{6} = \\frac{1}{2}$$</p>
    <p>$$\\cos\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2},\\ \\sin\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2}$$</p>
    <p>$$\\cos\\frac{\\pi}{3} = \\frac{1}{2},\\ \\sin\\frac{\\pi}{3} = \\frac{\\sqrt{3}}{2}$$</p>
    <p>$$\\cos\\frac{\\pi}{2} = 0,\\ \\sin\\frac{\\pi}{2} = 1$$</p></div>
    <div class="callout callout-key"><h4>Pythagorean Identity</h4>
    <p>$$\\sin^2\\theta + \\cos^2\\theta = 1$$</p>
    ${WHY('Why does this hold?', '<p>$(\\cos\\theta, \\sin\\theta)$ lies on the unit circle $x^2 + y^2 = 1$. Substituting: $\\cos^2\\theta + \\sin^2\\theta = 1$. This is the Pythagorean theorem applied to the right triangle formed by the terminal point, the origin, and the projection onto the x-axis.</p>')}</div>
    <div class="callout callout-key"><h4>ASTC: Signs by Quadrant</h4>
    <p><strong>A</strong>ll (Q1), <strong>S</strong>ine (Q2), <strong>T</strong>angent (Q3), <strong>C</strong>osine (Q4) are positive. Mnemonic: "All Students Take Calculus."</p></div>
    <div class="callout callout-key"><h4>Graphs of Trigonometric Functions</h4>
    <p>$y = A\\sin(Bx - C) + D$ or $y = A\\cos(Bx - C) + D$:</p>
    <ul>
      <li><strong>Amplitude:</strong> $|A|$ (vertical stretch)</li>
      <li><strong>Period:</strong> $\\frac{2\\pi}{|B|}$ (horizontal compression)</li>
      <li><strong>Phase Shift:</strong> $\\frac{C}{B}$ (horizontal translation)</li>
      <li><strong>Vertical Shift:</strong> $D$ (midline at $y = D$)</li>
    </ul>
    <p>$\\tan x$ has period $\\pi$ and vertical asymptotes at $x = \\frac{\\pi}{2} + n\\pi$.</p></div>
    <div class="callout callout-key"><h4>Inverse Trigonometric Functions</h4>
    <ul>
      <li>$\\arcsin(x)$: domain $[-1,1]$, range $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$. "What angle has sine $x$?"</li>
      <li>$\\arccos(x)$: domain $[-1,1]$, range $[0, \\pi]$.</li>
      <li>$\\arctan(x)$: domain $(-\\infty, \\infty)$, range $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$.</li>
    </ul>
    ${WHY('Why restrict the domain?', '<p>$\\sin x$ is not one-to-one on all of $\\mathbb{R}$ (it repeats every $2\\pi$). To define an inverse, we restrict to $[-\\pi/2, \\pi/2]$ where sine is one-to-one and covers all of $[-1,1]$. Similarly for cosine and tangent.</p>')}</div>
  ` },
  definition: { html: `<p><strong>Radian:</strong> The angle subtended by an arc of length equal to the radius. $1$ radian $\\approx 57.3°$.</p><p><strong>Unit Circle:</strong> Circle with center $(0,0)$ and radius 1.</p>` },
  examples: [{
    title: 'Unit Circle Evaluation',
    problem: 'Find $\\sin(\\frac{5\\pi}{6})$ and $\\cos(\\frac{7\\pi}{4})$.',
    steps: [
      { title: 'Reference angle for $\\frac{5\\pi}{6}$', content: '$\\frac{5\\pi}{6}$ is in Q2. Reference angle: $\\pi - \\frac{5\\pi}{6} = \\frac{\\pi}{6}$.', why: 'In Q2, reference angle = $\\pi - \\theta$.' },
      { title: '$\\sin(\\frac{5\\pi}{6})$', content: '$\\sin(\\frac{\\pi}{6}) = \\frac{1}{2}$. In Q2, sine is positive: $\\frac{1}{2}$.', why: 'Sine = y-coordinate. In Q2, $y \\gt 0$.' },
      { title: 'Reference angle for $\\frac{7\\pi}{4}$', content: 'Q4. Reference angle: $2\\pi - \\frac{7\\pi}{4} = \\frac{\\pi}{4}$.', why: 'In Q4, reference angle = $2\\pi - \\theta$.' },
      { title: '$\\cos(\\frac{7\\pi}{4})$', content: '$\\cos(\\frac{\\pi}{4}) = \\frac{\\sqrt{2}}{2}$. In Q4, cosine positive: $\\frac{\\sqrt{2}}{2}$.', why: 'Cosine = x-coordinate. In Q4, $x \\gt 0$.' }
    ]
  },
  {
    title: 'Geometry: Arc Length and Sector Area',
    problem: 'A circle has radius 10 cm. Find the arc length and sector area for a central angle of $\\frac{\\pi}{3}$ radians.',
    steps: [
      { title: 'Arc Length Formula', content: '$s = r\\theta = 10 \\cdot \\frac{\\pi}{3} = \\frac{10\\pi}{3} \\approx 10.47$ cm.', why: 'Arc length = radius times angle (in radians). This is why radians are natural: the formula is just multiplication.' },
      { title: 'Sector Area Formula', content: '$A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}(100)(\\frac{\\pi}{3}) = \\frac{50\\pi}{3} \\approx 52.36$ cm$^2$.', why: 'A sector is a fraction $\\frac{\\theta}{2\\pi}$ of the full circle area $\\pi r^2$: $\\frac{\\theta}{2\\pi} \\cdot \\pi r^2 = \\frac{1}{2}r^2\\theta$.' }
    ]
  },
  {
    title: 'Right Triangle Trigonometry',
    problem: 'A ladder 13 ft long leans against a wall. Its base is 5 ft from the wall. Find the angle the ladder makes with the ground.',
    steps: [
      { title: 'Identify sides', content: 'Hypotenuse = 13, Adjacent = 5. Use $\\cos\\theta = \\frac{\\text{adj}}{\\text{hyp}}$.', why: 'SOH-CAH-TOA: Cosine = Adjacent / Hypotenuse.' },
      { title: 'Compute', content: '$\\cos\\theta = \\frac{5}{13} \\approx 0.3846$. $\\theta = \\arccos(0.3846) \\approx 67.4°$.', why: 'The inverse cosine (arccos) reverses the cosine function to find the angle.' },
      { title: 'Height up the wall', content: '$\\sin(67.4°) = \\frac{h}{13}$, so $h = 13\\sin(67.4°) \\approx 12$ ft.', why: 'Pythagorean verification: $5^2 + 12^2 = 25 + 144 = 169 = 13^2$ \u2713. This is a 5-12-13 right triangle.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a radian?', back: 'Angle subtended by arc equal to radius. 2*pi radians = 360 degrees. Connects angle to arc length: arc = r*theta.' },
      { type: 'why', front: 'Why radians instead of degrees?', back: 'Degrees are arbitrary (Babylonian calendar). In radians, d/dx sin(x) = cos(x). Degrees add a messy pi/180 factor.' },
      { type: 'define', front: 'Sin and cos on unit circle?', back: 'At angle theta, the point on the unit circle is (cos theta, sin theta). Cosine = x, sine = y.' },
      { type: 'how', front: 'Why does sin^2 + cos^2 = 1?', back: 'The point (cos, sin) is ON the circle x^2+y^2=1. Substituting gives the identity. True for all angles.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'Convert $90°$ to radians:', options: ['$\\pi$', '$\\frac{\\pi}{2}$', '$\\frac{\\pi}{4}$', '$2\\pi$'], correctIndex: 1, hint: '<p>$180° = \\pi$ radians.</p>', correctExplanation: '$90° = 90 \\cdot \\frac{\\pi}{180} = \\frac{\\pi}{2}$.', wrongExplanations: { 0: '$\\pi$ radians $= 180°$, not $90°$.', 2: '$\\frac{\\pi}{4} = 45°$, not $90°$.', 3: '$2\\pi = 360°$.' } },
    { difficulty: 'easy', question: '$\\sin(0) = $?', options: ['$1$', '$0$', '$-1$', '$\\pi$'], correctIndex: 1, hint: '<p>At angle 0, the point on the unit circle is $(1, 0)$. Sine = y-coordinate.</p>', correctExplanation: 'At $\\theta = 0$: point is $(1, 0)$. $\\sin(0) = y = 0$.', wrongExplanations: { 0: '$\\cos(0) = 1$, not $\\sin(0)$.', 2: '$\\sin(\\pi) = 0$ and $\\sin(3\\pi/2) = -1$.', 3: '$\\pi$ is not a trig value; it is a measurement unit.' } },
    { difficulty: 'medium', question: 'In which quadrant is $\\sin\\theta \\lt 0$ and $\\cos\\theta \\gt 0$?', options: ['Q1', 'Q2', 'Q3', 'Q4'], correctIndex: 3, hint: '<p>Sine = y (negative below x-axis). Cosine = x (positive right of y-axis).</p>', correctExplanation: 'Q4: $x \\gt 0$ (cos positive), $y \\lt 0$ (sin negative).', wrongExplanations: { 0: 'Q1: both sin and cos are positive.', 1: 'Q2: sin positive, cos negative.', 2: 'Q3: both negative.' } },
    { difficulty: 'medium', question: '$\\cos(\\frac{2\\pi}{3}) = $?', options: ['$\\frac{1}{2}$', '$-\\frac{1}{2}$', '$\\frac{\\sqrt{3}}{2}$', '$-\\frac{\\sqrt{3}}{2}$'], correctIndex: 1, hint: '<p>$\\frac{2\\pi}{3}$ is in Q2. Reference angle is $\\pi - \\frac{2\\pi}{3} = \\frac{\\pi}{3}$.</p>', correctExplanation: 'Reference angle $\\frac{\\pi}{3}$: $\\cos(\\frac{\\pi}{3}) = \\frac{1}{2}$. In Q2, cosine is negative: $-\\frac{1}{2}$.', wrongExplanations: { 0: 'Cosine is negative in Q2.', 2: '$\\cos(\\frac{\\pi}{6}) = \\frac{\\sqrt{3}}{2}$, not $\\cos(\\frac{\\pi}{3})$.', 3: 'That would be $\\cos(\\frac{5\\pi}{6})$.' } },
    { difficulty: 'hard', question: 'If $\\sin\\theta = \\frac{3}{5}$ and $\\theta$ is in Q2, find $\\cos\\theta$:', options: ['$\\frac{4}{5}$', '$-\\frac{4}{5}$', '$\\frac{3}{5}$', '$-\\frac{3}{5}$'], correctIndex: 1, hint: '<p>Use $\\sin^2\\theta + \\cos^2\\theta = 1$. Cosine is negative in Q2.</p>', correctExplanation: '$\\cos^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25}$. $\\cos\\theta = \\pm\\frac{4}{5}$. In Q2, $\\cos\\theta \\lt 0$: $\\cos\\theta = -\\frac{4}{5}$.', wrongExplanations: { 0: 'Cosine is NEGATIVE in Q2.', 2: '$\\sin\\theta \\neq \\cos\\theta$ in general.', 3: 'The Pythagorean identity gives $4/5$, not $3/5$.' } },
    { difficulty: 'hard', question: '$\\tan(\\frac{3\\pi}{4}) = $?', options: ['$1$', '$-1$', '$\\sqrt{2}$', '$0$'], correctIndex: 1, hint: '<p>$\\frac{3\\pi}{4}$ is in Q2. Reference angle $\\frac{\\pi}{4}$.</p>', correctExplanation: '$\\tan(\\frac{\\pi}{4}) = 1$. In Q2, tangent is negative (sin+, cos−): $\\tan(\\frac{3\\pi}{4}) = -1$.', wrongExplanations: { 0: 'Tangent is negative in Q2.', 2: '$\\sqrt{2}$ is not a standard tangent value.', 3: '$\\tan = 0$ at $0, \\pi, 2\\pi$, not at $\\frac{3\\pi}{4}$.' } }
  ,

    {
      question: 'sin(pi/6) = ?',
      type: 'mc',
      options: ['1/2', 'sqrt(3)/2', 'sqrt(2)/2', '1'],
      correctIndex: 0,
      solution: { steps: ['pi/6 = 30 degrees.', 'In a 30-60-90 triangle: sides are 1, sqrt(3), 2.', 'sin(30) = opposite/hypotenuse = 1/2.'] }
    },
    {
      question: 'cos(pi/4) = ?',
      type: 'mc',
      options: ['sqrt(2)/2', '1/2', 'sqrt(3)/2', '0'],
      correctIndex: 0,
      solution: { steps: ['pi/4 = 45 degrees.', 'In a 45-45-90 triangle: sides are 1, 1, sqrt(2).', 'cos(45) = adjacent/hypotenuse = 1/sqrt(2) = sqrt(2)/2.'] }
    },
    {
      question: 'What quadrant is 5*pi/4 in?',
      type: 'mc',
      options: ['Quadrant III (third)', 'Quadrant II', 'Quadrant IV', 'Quadrant I'],
      correctIndex: 0,
      solution: { steps: ['5*pi/4 = 225 degrees (5/4 of 180).', 'Between 180 and 270: that is Quadrant III.', 'In Q3, both sin and cos are negative.'] }
    }
    ],
  freeResponse: [
    { difficulty: 'easy', question: '$\\sin(\\frac{\\pi}{6}) =$?', accept: ['1/2', '0.5'], placeholder: 'e.g. 1/2', explanation: '$\\sin(30°) = \\frac{1}{2}$.' },
    { difficulty: 'easy', question: '$\\cos(0) =$?', accept: [1, '1'], placeholder: 'Number', explanation: 'Point $(1,0)$ on unit circle.' },
    { difficulty: 'easy', question: '$\\tan(\\frac{\\pi}{4}) =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\sin/\\cos = 1$.' },
    { difficulty: 'easy', question: 'Convert $45°$ to radians:', accept: ['pi/4', '\\pi/4'], placeholder: 'e.g. pi/4', explanation: '$45 \\cdot \\frac{\\pi}{180} = \\frac{\\pi}{4}$.' },
    { difficulty: 'medium', question: 'Convert 150° to radians:', accept: ['5pi/6', '5\\pi/6'], placeholder: 'e.g. 5pi/6', explanation: '$150 \\cdot \\frac{\\pi}{180} = \\frac{5\\pi}{6}$.' },
    { difficulty: 'medium', question: 'If $\\sin\\theta = \\frac{5}{13}$ and $\\theta$ is in Q1, find $\\cos\\theta$:', accept: ['12/13'], placeholder: 'e.g. 12/13', explanation: '$\\cos^2\\theta = 1 - 25/169 = 144/169$. $\\cos\\theta = 12/13$.' },
    { difficulty: 'medium', question: 'A circle has $r = 8$ cm and central angle $\\frac{\\pi}{4}$. Arc length?', accept: ['2pi', '2\\pi', '6.28'], placeholder: 'cm', explanation: '$s = r\\theta = 8 \\cdot \\frac{\\pi}{4} = 2\\pi \\approx 6.28$ cm.' },
    { difficulty: 'hard', question: 'Convert $\\frac{5\\pi}{4}$ to degrees:', accept: [225, '225'], placeholder: 'degrees', explanation: '$\\frac{5\\pi}{4} \\cdot \\frac{180}{\\pi} = 225°$.' },
    { difficulty: 'hard', question: '$\\sin(\\frac{7\\pi}{6}) =$?', accept: ['-1/2', '-0.5'], placeholder: 'e.g. -1/2', explanation: 'Q3, ref angle $\\frac{\\pi}{6}$. Sin negative: $-1/2$.' },
    { difficulty: 'hard', question: 'A right triangle has hyp = 10, one angle = 30°. Find the opposite side:', accept: [5, '5'], placeholder: 'Length', explanation: '$\\sin(30°) = \\frac{\\text{opp}}{10}$. $\\text{opp} = 10 \\cdot \\frac{1}{2} = 5$.' },
    { difficulty: 'easy', question: '$\\sin(0) =$?', accept: [0, '0'], placeholder: 'Number', explanation: '$\\sin(0) = 0$.' },
    { difficulty: 'medium', question: '$\\tan(45°) =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\tan(45°) = \\sin(45°)/\\cos(45°) = 1$.' },
    { difficulty: 'hard', question: '$\\csc(30°) =$?', accept: [2, '2'], placeholder: 'Number', explanation: '$\\csc(30°) = 1/\\sin(30°) = 1/0.5 = 2$.' },
    { difficulty: 'medium', question: 'In which quadrant is $\\sin > 0$ and $\\cos < 0$?', accept: ['2', 'II', 'second', 'quadrant 2'], placeholder: 'Quadrant', explanation: 'Quadrant II: $\\sin > 0$, $\\cos < 0$.' },
    { difficulty: 'hard', question: 'Period of $f(x) = \\sin(3x)$:', accept: ['2pi/3', '2\\pi/3'], placeholder: 'Period', explanation: 'Period = $2\\pi / |B| = 2\\pi / 3$.' },
    { difficulty: 'easy', question: 'Convert $180°$ to radians:', accept: ['pi', '3.14'], placeholder: 'Radians', explanation: '$180° = \\pi$ radians.' },
    { difficulty: 'medium', question: '$\\tan(45°) =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\tan(45°) = \\sin(45°)/\\cos(45°) = 1$.' },
    { difficulty: 'easy', question: '$\\cos(0°) =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\cos(0°) = 1$.' },
    { difficulty: 'easy', question: '$\\sin(90°) =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\sin(90°) = 1$.' },
    { difficulty: 'medium', question: 'Reference angle for $240°$:', accept: [60, '60'], placeholder: 'Degrees', explanation: '$240° - 180° = 60°$.' },
    { difficulty: 'hard', question: 'Amplitude of $y = 3\\sin(2x + \\pi)$:', accept: [3, '3'], placeholder: 'Number', explanation: 'Amplitude = $|A| = 3$.' },
    { difficulty: 'medium', question: 'Phase shift of $y = \\sin(x - \\pi/4)$:', accept: ['pi/4 right', 'pi/4', '\\pi/4'], placeholder: 'Shift', explanation: 'Phase shift: $h = \\pi/4$ units right.' },
    { difficulty: 'easy', question: '$\\sin(0°) =$?', accept: [0, '0'], placeholder: 'Number', explanation: '$\\sin(0°) = 0$.' },
    { difficulty: 'hard', question: 'Unit circle: coordinates at $\\theta = 2\\pi/3$:', accept: ['(-1/2, sqrt(3)/2)', '(-0.5, 0.866)'], placeholder: 'Point', explanation: '$\\cos(120°) = -1/2$, $\\sin(120°) = \\sqrt{3}/2$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Find $\\cos(\\frac{5\\pi}{3})$ using reference angles.', steps: [
      { content: '$\\frac{5\\pi}{3}$ is in Q4 ($\\frac{3\\pi}{2} < \\frac{5\\pi}{3} \\lt 2\\pi$).' },
      { content: 'Reference angle: $2\\pi - \\frac{5\\pi}{3} = \\frac{\\pi}{3}$.' },
      { content: 'Cosine is POSITIVE in Q4.' },
      { content: '$\\cos(\\frac{5\\pi}{3}) = +\\cos(\\frac{\\pi}{3}) = \\frac{1}{2}$.' },
    { difficulty: 'hard', question: 'Solve $2\\sin(x) = 1$ for $x \\in [0, 2\\pi)$.', steps: [
      { content: '$\\sin(x) = 1/2$.' },
      { content: 'Reference angle: $\\pi/6$ (30°).' },
      { content: 'Sine positive in Q1 and Q2: $x = \\pi/6$ or $x = 5\\pi/6$.' }
    ], explanation: 'Reference angles and ASTC (All Students Take Calculus) for quadrant analysis.' }
    ], explanation: 'Reference angle method: (1) Quadrant, (2) Reference angle, (3) Sign, (4) Evaluate.' },
    { difficulty: 'hard', question: 'If $\\sin\\theta = -\\frac{3}{5}$ and $\\theta$ is in Q3, find all 6 trig values.', steps: [
      { content: '$\\sin\\theta = -3/5$. In Q3, both sin and cos are negative.' },
      { content: '$\\cos^2\\theta = 1 - 9/25 = 16/25$. $\\cos\\theta = -4/5$ (negative in Q3).' },
      { content: '$\\tan\\theta = \\frac{-3/5}{-4/5} = \\frac{3}{4}$ (positive in Q3).' },
      { content: '$\\csc\\theta = -5/3$, $\\sec\\theta = -5/4$, $\\cot\\theta = 4/3$.' }
    ], explanation: 'Pythagorean identity + quadrant signs (ASTC) determine all values.' },
    { difficulty: 'medium', question: 'Geometry: Find the area of a triangle with sides $a = 7$, $b = 10$ and included angle $C = 60°$.', steps: [
      { content: 'Area formula: $A = \\frac{1}{2}ab\\sin C$.' },
      { content: '$A = \\frac{1}{2}(7)(10)\\sin(60°)$.' },
      { content: '$\\sin(60°) = \\frac{\\sqrt{3}}{2}$.' },
      { content: '$A = 35 \\cdot \\frac{\\sqrt{3}}{2} = \\frac{35\\sqrt{3}}{2} \\approx 30.31$ sq units.' }
    ], explanation: 'The SAS area formula uses the sine of the included angle between two known sides.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'A Ferris wheel has radius 20m and center 25m off the ground. One revolution = 60 sec.', parts: [
      { question: 'Amplitude:', accept: [20, '20'], placeholder: 'meters', explanation: 'Amplitude = radius = 20m.' },
      { question: 'Period:', accept: [60, '60'], placeholder: 'seconds', explanation: 'One revolution = 60s.' },
      { question: 'Max height:', accept: [45, '45'], placeholder: 'meters', explanation: '25 + 20 = 45m.' },
      { question: 'Min height:', accept: [5, '5'], placeholder: 'meters', explanation: '25 - 20 = 5m.' },
    { difficulty: 'hard', question: 'In triangle ABC, angle A = 30°, side a = 5.', parts: [
      { question: 'Which law do you use to find side b if angle B = 60°?', accept: ['law of sines', 'sine rule'], placeholder: 'Law name', explanation: 'Law of sines: $a/\\sin A = b/\\sin B$.' },
      { question: 'Find $b$ (round to 1 decimal):', accept: ['8.7'], placeholder: 'Number', explanation: '$b = 5 \\sin(60°)/\\sin(30°) = 5(0.866)/0.5 = 8.66 \\approx 8.7$.' },
    { difficulty: 'medium', question: 'Right triangle: adjacent = 4, opposite = 3.', parts: [
      { question: 'Hypotenuse:', accept: [5, '5'], placeholder: 'Number', explanation: '$\\sqrt{16 + 9} = 5$.' },
      { question: '$\\sin(\\theta) =$?', accept: ['3/5', '0.6'], placeholder: 'Ratio', explanation: '$\\sin = \\text{opp}/\\text{hyp} = 3/5$.' },
      { question: '$\\cos(\\theta) =$?', accept: ['4/5', '0.8'], placeholder: 'Ratio', explanation: '$\\cos = \\text{adj}/\\text{hyp} = 4/5$.' }
    ], completionMessage: 'SOH-CAH-TOA: Sine=O/H, Cosine=A/H, Tangent=O/A.' }
    ], completionMessage: 'Law of sines: $a/\\sin A = b/\\sin B = c/\\sin C$.' }
    ], completionMessage: 'Sinusoidal model: $h(t) = A\\sin(\\frac{2\\pi}{T}t + \\phi) + D$.' },
    { difficulty: 'hard', question: 'Geometry: A regular hexagon has side length 6. Find its area using trig.', parts: [
      { question: 'A regular hexagon has how many equilateral triangles?', accept: [6, '6'], placeholder: 'Number', explanation: 'A regular hexagon divides into 6 equilateral triangles from center.' },
      { question: 'Each equilateral triangle has side 6. Area of one triangle using $\\frac{1}{2}ab\\sin C$:', accept: ['9sqrt(3)', '9\\sqrt{3}', '15.59'], placeholder: 'Area', explanation: '$\\frac{1}{2}(6)(6)\\sin(60°) = 18 \\cdot \\frac{\\sqrt{3}}{2} = 9\\sqrt{3}$.' },
      { question: 'Total hexagon area:', accept: ['54sqrt(3)', '54\\sqrt{3}', '93.53'], placeholder: 'Area', explanation: '$6 \\times 9\\sqrt{3} = 54\\sqrt{3} \\approx 93.53$.' }
    ], completionMessage: 'Regular polygon areas: divide into triangles from center, use $\\frac{1}{2}ab\\sin C$.' }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Pythagorean identity:', expression: '$\\sin^2\\theta +$ {{0}} $= 1$', blanks: [ { accept: ['cos^2\\theta', 'cos^2(theta)'], size: 12 } ], explanation: '$\\sin^2\\theta + \\cos^2\\theta = 1$.' },
    { difficulty: 'medium', context: 'ASTC rule:', expression: 'In Q2, {{0}} is positive. In Q3, {{1}} is positive.', blanks: [ { accept: ['sin', 'sine'], size: 6 }, { accept: ['tan', 'tangent'], size: 6 } ], explanation: 'All (Q1), Sin (Q2), Tan (Q3), Cos (Q4).' },
    { difficulty: 'medium', context: 'Arc length:', expression: '$s = r \\cdot$ {{0}}', blanks: [ { accept: ['theta', '\\theta'], size: 6 } ], explanation: 'Arc length = radius times angle (in radians).' },
    { difficulty: 'easy', context: 'SOH-CAH-TOA:', expression: '$\\sin\\theta = \\frac{\\text{opposite}}{$ {{0}} $}$', blanks: [ { accept: ['hypotenuse', 'hyp'], size: 12 } ], explanation: 'Sine = Opposite / Hypotenuse.' },
    { difficulty: 'easy', context: 'Trig ratios:', expression: 'In a right triangle, $\\sin(\\theta) =$ opposite $/$ {{0}}.', blanks: [ { accept: ['hypotenuse', 'hyp'], size: 10 } ], explanation: 'SOH: Sine = Opposite / Hypotenuse.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each angle to its sine value:', pairs: [
      { left: '$0$', right: '$0$' },
      { left: '$\\pi/6$', right: '$1/2$' },
      { left: '$\\pi/4$', right: '$\\sqrt{2}/2$' },
      { left: '$\\pi/3$', right: '$\\sqrt{3}/2$' },
      { left: '$\\pi/2$', right: '$1$' }
    ] },
    { difficulty: 'medium', instruction: 'Match each right-triangle ratio:', pairs: [
      { left: '$\\sin\\theta$', right: 'Opposite / Hypotenuse' },
      { left: '$\\cos\\theta$', right: 'Adjacent / Hypotenuse' },
      { left: '$\\tan\\theta$', right: 'Opposite / Adjacent' }
    ] }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Trig Strategy</h4>
    <ol><li><strong>ASTC:</strong> All (Q1), Sine (Q2), Tangent (Q3), Cosine (Q4).</li>
    <li><strong>Reference angle:</strong> Acute angle between terminal side and x-axis.</li>
    <li><strong>SOH-CAH-TOA:</strong> sin=opp/hyp, cos=adj/hyp, tan=opp/adj.</li>
    <li><strong>Arc length:</strong> $s = r\\theta$. Sector area: $A = \\frac{1}{2}r^2\\theta$.</li>
    <li><strong>Triangle area:</strong> $A = \\frac{1}{2}ab\\sin C$ for two sides and included angle.</li></ol></div>` }
},

/* TOPIC 5.2: Trig Identities & Equations */
{
  id: 'trig-identities',
  title: 'Trigonometric Identities & Equations',
  description: 'Relationships between trig functions that hold for all angles. Used to simplify expressions and solve equations.',
  prereqRecap: [
    { term: 'Sine & Cosine', definition: 'Unit circle coordinates: $\\cos\\theta = x$, $\\sin\\theta = y$ (Topic 5.1).' },
    { term: 'Tangent', definition: '$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$ (Topic 5.1).' },
    { term: 'Pythagorean Identity', definition: '$\\sin^2\\theta + \\cos^2\\theta = 1$ (Topic 5.1).' }
  ],
  whyExists: { html: `
    <p><strong>Why identities?</strong> Identities transform complex trig expressions into simpler ones. Integration in calculus relies heavily on trig identities (e.g., $\\int \\sin^2 x\\, dx$ uses the power-reduction identity).</p>
  ` },
  formalDefinitions: [
      { term: 'Pythagorean Identity', symbol: '$\\sin^2\\theta + \\cos^2\\theta = 1$', definition: 'Follows directly from the equation of the unit circle. Dividing by $\\cos^2\\theta$ yields $\\tan^2\\theta + 1 = \\sec^2\\theta$.' },
      { term: 'Double Angle Formulas', symbol: '', definition: '$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$. $\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta$.' },
      { term: 'Sum/Difference Formulas', symbol: '', definition: '$\\sin(\\alpha \\pm \\beta) = \\sin\\alpha\\cos\\beta \\pm \\cos\\alpha\\sin\\beta$. $\\cos(\\alpha \\pm \\beta) = \\cos\\alpha\\cos\\beta \\mp \\sin\\alpha\\sin\\beta$.' }
    ],
    background: {
      title: 'Why Do Identities Matter?',
      content: '<p>Trigonometric identities are equations that are <strong>always true</strong>, for every valid angle. They allow us to simplify complex expressions, which is essential in calculus and physics.</p><p>The Pythagorean identity $\\sin^2\\theta + \\cos^2\\theta = 1$ is a direct consequence of the Pythagorean theorem applied to the unit circle. Every point on the unit circle satisfies $x^2 + y^2 = 1$, and since $x = \\cos\\theta$ and $y = \\sin\\theta$, the identity follows.</p><p>Without identities, integrating $\\sin^2(x)$ would be impossible using elementary methods. The identity $\\sin^2(x) = \\frac{1 - \\cos(2x)}{2}$ transforms it into a straightforward integral.</p>'
    },
    concept: { html: `
    <div class="callout callout-key"><h4>Fundamental Identities</h4>
    <ul>
      <li><strong>Reciprocal:</strong> $\\csc\\theta = \\frac{1}{\\sin\\theta}$, $\\sec\\theta = \\frac{1}{\\cos\\theta}$, $\\cot\\theta = \\frac{1}{\\tan\\theta}$</li>
      <li><strong>Pythagorean:</strong> $\\sin^2\\theta + \\cos^2\\theta = 1$, $1 + \\tan^2\\theta = \\sec^2\\theta$, $1 + \\cot^2\\theta = \\csc^2\\theta$</li>
      <li><strong>Even/Odd:</strong> $\\cos(-\\theta) = \\cos\\theta$ (even), $\\sin(-\\theta) = -\\sin\\theta$ (odd), $\\tan(-\\theta) = -\\tan\\theta$ (odd)</li>
    </ul></div>
    <div class="callout callout-key"><h4>Sum & Difference Formulas</h4>
    <ul>
      <li>$\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B$</li>
      <li>$\\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B$</li>
      <li>$\\tan(A + B) = \\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B}$</li>
    </ul>
    ${WHY('Why the sign change in cosine?', '<p>Consider $\\cos(A + B)$: as $B$ increases, the angle gets larger and cosine decreases. The $-\\sin A \\sin B$ term ensures this. The formula can be derived from the distance formula on the unit circle or from rotation matrices.</p>')}</div>
    <div class="callout callout-key"><h4>Double Angle Formulas</h4>
    <ul>
      <li>$\\sin(2\\theta) = 2\\sin\\theta \\cos\\theta$</li>
      <li>$\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta$</li>
      <li>$\\tan(2\\theta) = \\frac{2\\tan\\theta}{1 - \\tan^2\\theta}$</li>
    </ul>
    ${WHY('Where do these come from?', '<p>Set $A = B = \\theta$ in the sum formulas: $\\sin(\\theta + \\theta) = \\sin\\theta\\cos\\theta + \\cos\\theta\\sin\\theta = 2\\sin\\theta\\cos\\theta$. Similarly for cosine.</p>')}</div>
    <div class="callout callout-key"><h4>Half-Angle & Power-Reduction</h4>
    <ul>
      <li>$\\sin^2\\theta = \\frac{1 - \\cos(2\\theta)}{2}$ (power-reduction for integration)</li>
      <li>$\\cos^2\\theta = \\frac{1 + \\cos(2\\theta)}{2}$</li>
      <li>$\\sin\\frac{\\theta}{2} = \\pm\\sqrt{\\frac{1 - \\cos\\theta}{2}}$ (sign depends on quadrant)</li>
      <li>$\\cos\\frac{\\theta}{2} = \\pm\\sqrt{\\frac{1 + \\cos\\theta}{2}}$</li>
    </ul></div>
    <div class="callout callout-key"><h4>Product-to-Sum & Sum-to-Product</h4>
    <ul>
      <li>$\\sin A \\cos B = \\frac{1}{2}[\\sin(A+B) + \\sin(A-B)]$</li>
      <li>$\\cos A \\cos B = \\frac{1}{2}[\\cos(A-B) + \\cos(A+B)]$</li>
      <li>$\\sin A + \\sin B = 2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}$</li>
    </ul></div>
    <div class="callout callout-key"><h4>Law of Sines & Law of Cosines</h4>
    <p><strong>Law of Sines:</strong> $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$ (for any triangle)</p>
    <p><strong>Law of Cosines:</strong> $c^2 = a^2 + b^2 - 2ab\\cos C$ (generalizes Pythagorean theorem: when $C = 90\\degree$, $\\cos C = 0$, reducing to $c^2 = a^2 + b^2$)</p>
    <p>Use cosines when you know SAS (two sides + included angle) or SSS (all three sides). Use sines when you know AAS or ASA.</p></div>
  
    ${WHY('Why are double-angle formulas useful?', '<p>They convert between powers of trig functions and multiples of angles. sin^2(x) = (1-cos(2x))/2 turns a power into a linear trig function, which is essential for integration. Without this, integrals like integral(sin^2 x dx) would be unsolvable by basic methods.</p>')}
    ${WHY('Why does tan = sin/cos?', '<p>On the unit circle, sin is the y-coordinate and cos is the x-coordinate. The tangent (from geometry) is the ratio of the opposite side to the adjacent side of a right triangle. In the unit circle, opposite = sin, adjacent = cos, so tan = sin/cos.</p>')}` },
  definition: { html: `<p><strong>Identity:</strong> An equation true for ALL values in its domain (not just specific solutions).</p><p><strong>Trig Equation:</strong> An equation involving trig functions of an unknown angle. May have infinitely many solutions due to periodicity.</p>` },
  examples: [{
    title: 'Solving a Trig Equation',
    problem: 'Solve $2\\sin^2\\theta - 1 = 0$ for $\\theta \\in [0, 2\\pi)$.',
    steps: [
      { title: 'Isolate $\\sin^2\\theta$', content: '$\\sin^2\\theta = \\frac{1}{2}$, so $\\sin\\theta = \\pm\\frac{1}{\\sqrt{2}} = \\pm\\frac{\\sqrt{2}}{2}$.', why: 'Take square root of both sides; include both $\\pm$.' },
      { title: 'Find all angles', content: '$\\sin\\theta = \\frac{\\sqrt{2}}{2}$: $\\theta = \\frac{\\pi}{4}, \\frac{3\\pi}{4}$. $\\sin\\theta = -\\frac{\\sqrt{2}}{2}$: $\\theta = \\frac{5\\pi}{4}, \\frac{7\\pi}{4}$.', why: 'Reference angle $\\frac{\\pi}{4}$. Positive in Q1 and Q2; negative in Q3 and Q4.' },
      { title: 'Solution set', content: '$\\theta \\in \\{\\frac{\\pi}{4}, \\frac{3\\pi}{4}, \\frac{5\\pi}{4}, \\frac{7\\pi}{4}\\}$.', why: 'Four solutions in $[0, 2\\pi)$.' }
    ]
  }],
  flashCards: [
      { type: 'why', front: 'Why do trig identities matter?', back: 'They simplify complex expressions and solve equations. Convert between forms for integration and analysis.' },
      { type: 'how', front: 'How to prove a trig identity?', back: 'Work on ONE side only. Transform using known identities until it equals the other side. Never move terms across the equals sign.' },
      { type: 'define', front: 'Reciprocal trig functions?', back: 'sec = 1/cos, csc = 1/sin, cot = cos/sin. They exist because division by trig values is common in applications.' }
    ],
    exercises: [
    { difficulty: 'easy', question: '$1 + \\tan^2\\theta = $?', options: ['$\\csc^2\\theta$', '$\\sec^2\\theta$', '$\\cos^2\\theta$', '$\\sin^2\\theta$'], correctIndex: 1, hint: '<p>Pythagorean identity involving tangent.</p>', correctExplanation: 'Divide $\\sin^2\\theta + \\cos^2\\theta = 1$ by $\\cos^2\\theta$: $\\tan^2\\theta + 1 = \\sec^2\\theta$.', wrongExplanations: { 0: '$1 + \\cot^2\\theta = \\csc^2\\theta$, not $1 + \\tan^2\\theta$.', 2: '$\\cos^2\\theta \\lt 1$ for most angles, while $1 + \\tan^2\\theta \\geq 1$.', 3: 'This would require $\\tan^2\\theta = \\sin^2\\theta - 1$, which is generally false.' } },
    { difficulty: 'easy', question: '$\\sin(2\\theta) = $?', options: ['$2\\sin\\theta$', '$\\sin^2\\theta$', '$2\\sin\\theta\\cos\\theta$', '$\\sin\\theta + \\cos\\theta$'], correctIndex: 2, hint: '<p>Double angle formula for sine.</p>', correctExplanation: '$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$.', wrongExplanations: { 0: '$\\sin(2\\theta) \\neq 2\\sin\\theta$. The $2$ does not simply pull out.', 1: '$\\sin^2\\theta \\neq \\sin(2\\theta)$.', 3: 'Sum of sin and cos is unrelated to the double angle formula.' } },
    { difficulty: 'medium', question: 'Simplify: $\\frac{\\sin\\theta}{\\cos\\theta} \\cdot \\cos\\theta$', options: ['$\\tan\\theta$', '$\\sin\\theta$', '$1$', '$\\cos^2\\theta$'], correctIndex: 1, hint: '<p>Cancel the $\\cos\\theta$.</p>', correctExplanation: '$\\frac{\\sin\\theta}{\\cos\\theta} \\cdot \\cos\\theta = \\sin\\theta$.', wrongExplanations: { 0: '$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$, but then multiplying by $\\cos\\theta$ gives $\\sin\\theta$.', 2: '$\\frac{\\sin\\theta}{\\cos\\theta} \\cdot \\cos\\theta = \\sin\\theta$, not 1 (that would require $\\frac{\\cos\\theta}{\\cos\\theta}$).', 3: 'No squaring occurs here.' } },
    { difficulty: 'medium', question: 'Solve: $\\cos\\theta = \\frac{1}{2}$ for $\\theta \\in [0, 2\\pi)$', options: ['$\\theta = \\frac{\\pi}{3}$', '$\\theta = \\frac{\\pi}{3}, \\frac{5\\pi}{3}$', '$\\theta = \\frac{\\pi}{6}, \\frac{11\\pi}{6}$', '$\\theta = \\frac{\\pi}{3}, \\frac{2\\pi}{3}$'], correctIndex: 1, hint: '<p>Cosine is positive in Q1 and Q4. Reference angle where $\\cos = 1/2$?</p>', correctExplanation: 'Reference angle: $\\frac{\\pi}{3}$ (since $\\cos\\frac{\\pi}{3} = \\frac{1}{2}$). Q1: $\\frac{\\pi}{3}$. Q4: $2\\pi - \\frac{\\pi}{3} = \\frac{5\\pi}{3}$.', wrongExplanations: { 0: 'Missing the Q4 solution. Cosine is positive in both Q1 and Q4.', 2: '$\\cos\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{2} \\neq \\frac{1}{2}$.', 3: '$\\frac{2\\pi}{3}$ is in Q2 where cosine is negative.' } },
    { difficulty: 'hard', question: '$\\cos(\\frac{\\pi}{12})$ using sum formula:', options: ['$\\frac{\\sqrt{6}+\\sqrt{2}}{4}$', '$\\frac{\\sqrt{6}-\\sqrt{2}}{4}$', '$\\frac{\\sqrt{3}+1}{4}$', '$\\frac{1}{2}$'], correctIndex: 0, hint: '<p>$\\frac{\\pi}{12} = \\frac{\\pi}{3} - \\frac{\\pi}{4}$. Use $\\cos(A-B)$.</p>', correctExplanation: '$\\cos(\\frac{\\pi}{3} - \\frac{\\pi}{4}) = \\cos\\frac{\\pi}{3}\\cos\\frac{\\pi}{4} + \\sin\\frac{\\pi}{3}\\sin\\frac{\\pi}{4} = \\frac{1}{2}\\cdot\\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{3}}{2}\\cdot\\frac{\\sqrt{2}}{2} = \\frac{\\sqrt{2}+\\sqrt{6}}{4}$.', wrongExplanations: { 1: 'The difference formula for cosine uses $+$ between the terms (the sign FLIPS for cosine).', 2: 'Missing the $\\sqrt{2}$ factors from $\\cos\\frac{\\pi}{4}$ and $\\sin\\frac{\\pi}{4}$.', 3: '$\\cos(\\frac{\\pi}{12}) \\neq \\frac{1}{2}$. That is $\\cos(\\frac{\\pi}{3})$.' } },
    { difficulty: 'hard', question: 'Prove: $\\frac{1 - \\cos(2\\theta)}{2} = \\sin^2\\theta$. Which double angle form is used?', options: ['$\\cos(2\\theta) = 2\\cos^2\\theta - 1$', '$\\cos(2\\theta) = 1 - 2\\sin^2\\theta$', '$\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta$', '$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$'], correctIndex: 1, hint: '<p>Substitute $\\cos(2\\theta)$ and simplify.</p>', correctExplanation: '$\\cos(2\\theta) = 1 - 2\\sin^2\\theta$. $\\frac{1-(1-2\\sin^2\\theta)}{2} = \\frac{2\\sin^2\\theta}{2} = \\sin^2\\theta$ ✓. This is the power-reduction formula.', wrongExplanations: { 0: 'Using $2\\cos^2\\theta - 1$ gives $\\frac{1 - 2\\cos^2\\theta + 1}{2} = 1 - \\cos^2\\theta = \\sin^2\\theta$. This also works, but the direct substitution is form B.', 2: 'This form works but requires an extra step to isolate $\\sin^2\\theta$.', 3: 'This is the sine double angle, not cosine. Not used here.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'Simplify: $\\sin^2\\theta + \\cos^2\\theta =$?', accept: [1, '1'], placeholder: 'Enter a number', explanation: 'Fundamental Pythagorean identity.' },
    { difficulty: 'easy', question: '$\\sin(2\\theta) = 2\\sin\\theta$ {{?}} (fill the missing part)', accept: ['cos(theta)', 'costheta', 'cos\\theta'], placeholder: 'what multiplies?', explanation: '$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$.' },
    { difficulty: 'medium', question: '$\\sin(2 \\cdot \\frac{\\pi}{6}) = \\sin(\\frac{\\pi}{3}) =$?', accept: ['sqrt(3)/2', 'root3/2'], placeholder: 'e.g. sqrt(3)/2', explanation: '$\\sin(\\frac{\\pi}{3}) = \\frac{\\sqrt{3}}{2}$.' },
    { difficulty: 'medium', question: 'How many solutions does $\\sin\\theta = \\frac{1}{2}$ have on $[0, 2\\pi)$?', accept: [2, '2'], placeholder: 'Number', explanation: '$\\theta = \\frac{\\pi}{6}$ and $\\theta = \\frac{5\\pi}{6}$ (Q1 and Q2).' },
    { difficulty: 'hard', question: '$\\cos(2 \\cdot 60\u00b0) = \\cos(120\u00b0) =$?', accept: ['-1/2', '-0.5'], placeholder: 'e.g. -1/2', explanation: '$2\\cos^2(60\u00b0) - 1 = 2(1/4) - 1 = -1/2$.' },
    { difficulty: 'hard', question: 'Solve $2\\sin^2\\theta - 1 = 0$ on $[0, 2\\pi)$. How many solutions?', accept: [4, '4'], placeholder: 'Number', explanation: '$\\sin^2\\theta = 1/2 \\Rightarrow \\sin\\theta = \\pm \\frac{\\sqrt{2}}{2}$. Four angles: $\\frac{\\pi}{4}, \\frac{3\\pi}{4}, \\frac{5\\pi}{4}, \\frac{7\\pi}{4}$.' },
    { difficulty: 'easy', question: '$\\sin^2 x + \\cos^2 x =$?', accept: [1, '1'], placeholder: 'Number', explanation: 'Pythagorean identity: always 1.' },
    { difficulty: 'medium', question: '$\\cos(2 \\cdot 0) =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\cos(0) = 1$.' },
    { difficulty: 'hard', question: 'Double angle: $\\sin(2 \\cdot 30°) =$?', accept: ['sqrt(3)/2', '0.866'], placeholder: 'Value', explanation: '$\\sin(60°) = \\sqrt{3}/2$.' },
    { difficulty: 'hard', question: '$\\cos(\\pi/3) =$?', accept: ['1/2', '0.5'], placeholder: 'Value', explanation: '$\\cos(60°) = 1/2$.' },
    { difficulty: 'medium', question: 'Pythagorean identity: $\\sin^2 x + $ ? $= 1$', accept: ['cos^2(x)', '\\cos^2 x', 'cos^2x'], placeholder: 'Term', explanation: '$\\sin^2 x + \\cos^2 x = 1$.' },
    { difficulty: 'medium', question: 'Half-angle: $\\cos^2(x) = \\frac{1 + \\cos(2x)}{$ ? $}$', accept: [2, '2'], placeholder: 'Number', explanation: 'Power reduction: $\\cos^2 x = \\frac{1 + \\cos(2x)}{2}$.' },
    { difficulty: 'easy', question: '$\\sin^2(x) + \\cos^2(x) =$?', accept: [1, '1'], placeholder: 'Number', explanation: 'Pythagorean identity: always 1.' },
    { difficulty: 'hard', question: '$\\tan^2 x + 1 =$?', accept: ['sec^2(x)', '\\sec^2 x'], placeholder: 'Identity', explanation: 'Divide Pythagorean identity by $\\cos^2 x$: $\\tan^2 x + 1 = \\sec^2 x$.' },
    { difficulty: 'medium', question: '$1 + \\cot^2 x =$?', accept: ['csc^2(x)', '\\csc^2 x'], placeholder: 'Identity', explanation: 'Divide Pythagorean identity by $\\sin^2 x$: $1 + \\cot^2 x = \\csc^2 x$.' },
    { difficulty: 'easy', question: '$\\cos(90°) =$?', accept: [0, '0'], placeholder: 'Number', explanation: '$\\cos(90°) = 0$.' },
    { difficulty: 'hard', question: 'Sum-to-product: $\\sin A + \\sin B = 2\\sin(\\frac{A+B}{2})\\cos(\\frac{A-B}{$ ? $})$', accept: [2, '2'], placeholder: 'Number', explanation: '$2\\sin(\\frac{A+B}{2})\\cos(\\frac{A-B}{2})$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Solve: $2\\cos\\theta - 1 = 0$ on $[0, 2\\pi)$.', steps: [
      { content: 'Isolate: $\\cos\\theta = \\frac{1}{2}$.' },
      { content: 'Reference angle: $\\theta_r = \\frac{\\pi}{3}$ (since $\\cos\\frac{\\pi}{3} = \\frac{1}{2}$).' },
      { content: 'Cosine positive in Q1 and Q4.' },
      { content: 'Q1: $\\theta = \\frac{\\pi}{3}$. Q4: $\\theta = 2\\pi - \\frac{\\pi}{3} = \\frac{5\\pi}{3}$.' },
      { content: 'Solutions: $\\theta = \\frac{\\pi}{3}, \\frac{5\\pi}{3}$.' },
    { difficulty: 'hard', question: 'Prove: $\\frac{\\sin x}{1 + \\cos x} = \\frac{1 - \\cos x}{\\sin x}$.', steps: [
      { content: 'Cross-multiply: $\\sin^2 x = (1 + \\cos x)(1 - \\cos x)$.' },
      { content: 'RHS: $1 - \\cos^2 x = \\sin^2 x$. Both sides equal. QED.' }
    ], explanation: 'Cross-multiplication combined with the Pythagorean identity: $\\sin^2 x + \\cos^2 x = 1$.' }
    ], explanation: 'Trig equations: isolate the trig function, find reference angle, apply ASTC.' },
    { difficulty: 'hard', question: 'Verify: $\\frac{\\sin(2\\theta)}{1 + \\cos(2\\theta)} = \\tan\\theta$.', steps: [
      { content: 'Substitute double angle formulas: $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$.' },
      { content: '$\\cos(2\\theta) = 2\\cos^2\\theta - 1$.' },
      { content: '$1 + \\cos(2\\theta) = 1 + 2\\cos^2\\theta - 1 = 2\\cos^2\\theta$.' },
      { content: '$\\frac{2\\sin\\theta\\cos\\theta}{2\\cos^2\\theta} = \\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta$. QED.' }
    ], explanation: 'Identity verification: transform one side until it equals the other. Never move terms across the =.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Prove and apply the double angle identity for cosine.', parts: [
      { question: 'Write $\\cos(2\\theta)$ in terms of $\\cos\\theta$ only:', accept: ['2cos^2(theta)-1', '2cos^2theta-1', '2cos^2\\theta - 1'], placeholder: 'e.g. 2cos^2(theta)-1', explanation: '$\\cos(2\\theta) = 2\\cos^2\\theta - 1$.' },
      { question: 'Solve for $\\cos^2\\theta$ (power reduction formula):', accept: ['(1+cos(2theta))/2', '(1+cos2theta)/2'], placeholder: 'e.g. (1+cos(2theta))/2', explanation: '$\\cos^2\\theta = \\frac{1+\\cos(2\\theta)}{2}$.' },
      { question: 'Evaluate $\\cos^2(\\frac{\\pi}{8})$ using this formula:', accept: ['(1+sqrt(2)/2)/2', '(2+sqrt(2))/4'], placeholder: 'Exact value', explanation: '$\\frac{1+\\cos(\\pi/4)}{2} = \\frac{1+\\sqrt{2}/2}{2} = \\frac{2+\\sqrt{2}}{4}$.' }
    ], completionMessage: 'Power reduction formulas convert $\\sin^2$ and $\\cos^2$ to expressions without squares.' }
  ],
  matching: [
    { difficulty: 'medium', instruction: 'Match each identity type to its formula:', pairs: [
      { left: 'Pythagorean', right: '$\\sin^2\\theta + \\cos^2\\theta = 1$' },
      { left: 'Double angle (sin)', right: '$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$' },
      { left: 'Double angle (cos)', right: '$\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta$' },
      { left: 'Sum formula (sin)', right: '$\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B$' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'medium', context: 'Double angle formulas:', expression: '$\\sin(2\\theta) = 2\\sin\\theta$ {{0}}', blanks: [ { accept: ['cos\\theta', 'costheta', 'cos(theta)'], size: 10 } ], explanation: '$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$.' },
    { difficulty: 'hard', context: 'Solving trig equations:', expression: 'The number of solutions of $\\sin\\theta = c$ on $[0, 2\\pi)$ is {{0}} when $0 < c \\lt 1$.', blanks: [ { accept: ['2', 'two'], size: 3 } ], explanation: 'Sine equals $c$ at two angles: one in Q1, one in Q2 (by symmetry).' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Trig Identity Strategy</h4>
    <ol><li><strong>Convert everything to sin and cos</strong> as a universal strategy.</li>
    <li><strong>Look for Pythagorean substitutions:</strong> $\\sin^2 = 1 - \\cos^2$ or $\\tan^2 = \\sec^2 - 1$.</li>
    <li><strong>For equations:</strong> Factor, use identities to get one trig function, then solve using the unit circle.</li></ol></div>` }
},

/* TOPIC 5.3: Law of Sines & Cosines */
{
  id: 'law-sines-cosines',
  title: 'Law of Sines & Law of Cosines',
  description: 'Solving ANY triangle (not just right triangles). Essential for geometry, navigation, surveying, and physics.',
  prereqRecap: [
    { term: 'Right Triangle Trig', definition: 'SOH-CAH-TOA applies only to right triangles. For oblique triangles, we need new tools.' },
    { term: 'Triangle Area', definition: '$A = \\frac{1}{2}ab\\sin C$ from Topic 5.1.' },
    { term: 'Pythagorean Theorem', definition: '$a^2 + b^2 = c^2$ for right triangles only. The Law of Cosines generalizes this.' }
  ],
  whyExists: { html: `
    <p><strong>Why these laws?</strong> Most triangles in real applications are NOT right triangles. A surveyor measuring a plot, a pilot navigating between cities, an engineer calculating forces: all need to solve oblique triangles. The Law of Sines and Law of Cosines extend trigonometry to all triangles.</p>
    ${WHY('How does the Law of Cosines generalize Pythagoras?', '<p>In $c^2 = a^2 + b^2 - 2ab\\cos C$, if $C = 90°$, then $\\cos 90° = 0$, and the formula reduces to $c^2 = a^2 + b^2$. The $-2ab\\cos C$ term is a "correction" for non-right angles.</p>')}
  ` },
  concept: { html: `
    <div class="callout callout-key"><h4>Law of Sines</h4>
    <p>$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$$</p>
    <p>Use when you have: <strong>AAS</strong> (two angles + non-included side), <strong>ASA</strong> (two angles + included side), or <strong>SSA</strong> (two sides + non-included angle, the ambiguous case).</p>
    ${WHY('Why does the Law of Sines work?', '<p>Drop an altitude $h$ from vertex $C$ to side $c$. Then $h = a\\sin B = b\\sin A$. Dividing: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B}$. The same argument from each vertex gives all three ratios equal.</p>')}</div>
    <div class="callout callout-key"><h4>Law of Cosines</h4>
    <p>$$c^2 = a^2 + b^2 - 2ab\\cos C$$</p>
    <p>Use when you have: <strong>SAS</strong> (two sides + included angle) or <strong>SSS</strong> (all three sides, to find angles).</p>
    ${WHY('The Ambiguous Case (SSA)', '<p>Given two sides and a non-included angle (SSA), the Law of Sines may yield 0, 1, or 2 triangles. If $a < b\\sin A$: no triangle. If $a = b\\sin A$: one right triangle. If $b\\sin A < a < b$: TWO triangles (ambiguous). If $a \\geq b$: one triangle.</p>')}</div>
    <div class="callout callout-key"><h4>When to Use Which Law</h4>
    <ul>
      <li><strong>AAS or ASA:</strong> Law of Sines (find the third angle first, then use ratios).</li>
      <li><strong>SAS:</strong> Law of Cosines (find the third side first).</li>
      <li><strong>SSS:</strong> Law of Cosines (find the largest angle first).</li>
      <li><strong>SSA:</strong> Law of Sines (watch for ambiguous case).</li>
    </ul></div>
  ` },
  definition: { html: `<p><strong>Oblique Triangle:</strong> A triangle with no right angle. Solved using the Law of Sines or Law of Cosines.</p>` },
  examples: [{
    title: 'SAS: Find the third side',
    problem: 'Triangle with $a = 8$, $b = 11$, $C = 37°$. Find $c$.',
    steps: [
      { title: 'Choose Law of Cosines (SAS)', content: '$c^2 = a^2 + b^2 - 2ab\\cos C = 64 + 121 - 2(8)(11)\\cos 37°$.', why: 'Two sides and the included angle: SAS case.' },
      { title: 'Compute', content: '$c^2 = 185 - 176(0.7986) = 185 - 140.55 = 44.45$.', why: '$\\cos 37° \\approx 0.7986$.' },
      { title: 'Result', content: '$c = \\sqrt{44.45} \\approx 6.67$.', why: 'The side opposite the smallest angle is the shortest side.' }
    ]
  },
  {
    title: 'AAS: Solve the triangle',
    problem: 'Triangle with $A = 40°$, $B = 75°$, $a = 10$. Find $b$ and $c$.',
    steps: [
      { title: 'Find angle C', content: '$C = 180° - 40° - 75° = 65°$.', why: 'Angles of a triangle sum to $180°$.' },
      { title: 'Law of Sines for b', content: '$\\frac{b}{\\sin 75°} = \\frac{10}{\\sin 40°}$. $b = \\frac{10 \\cdot \\sin 75°}{\\sin 40°} = \\frac{10(0.9659)}{0.6428} \\approx 15.03$.', why: 'Cross-multiply the Law of Sines ratio.' },
      { title: 'Law of Sines for c', content: '$c = \\frac{10 \\cdot \\sin 65°}{\\sin 40°} = \\frac{10(0.9063)}{0.6428} \\approx 14.10$.', why: 'Same ratio applied with angle $C$.' }
    ]
  },
  {
    title: 'Geometry: Navigation Problem',
    problem: 'A ship sails 12 km on bearing 040°, then 8 km on bearing 120°. Find the distance from start.',
    steps: [
      { title: 'Find the included angle', content: 'Turn from 040° to 120° = 80°. The included angle in our triangle is $180° - 80° = 100°$.', why: 'Bearings are measured from north. The exterior angle at the turn point is 80°, so the interior triangle angle is its supplement.' },
      { title: 'Apply Law of Cosines', content: '$d^2 = 12^2 + 8^2 - 2(12)(8)\\cos 100° = 144 + 64 - 192(-0.1736) = 208 + 33.33 = 241.33$.', why: '$\\cos 100°$ is negative (obtuse angle), so the $-2ab\\cos C$ term adds to the sum.' },
      { title: 'Result', content: '$d = \\sqrt{241.33} \\approx 15.54$ km from start.', why: 'The distance is greater than either leg because the angle between is obtuse.' }
    ]
  }],
  exercises: [
    { difficulty: 'easy', question: 'In a triangle with $A = 30°$, $B = 70°$, what is angle $C$?', options: ['$80°$', '$100°$', '$60°$', '$90°$'], correctIndex: 0, hint: '<p>Angles sum to $180°$.</p>', correctExplanation: '$C = 180° - 30° - 70° = 80°$.', wrongExplanations: { 1: '$30 + 70 = 100$, not a triangle angle.', 2: '$180 - 100 = 80$, not 60.', 3: 'No reason to assume a right angle.' } },
    { difficulty: 'easy', question: 'Which law to use with SAS (two sides + included angle)?', options: ['Law of Sines', 'Law of Cosines', 'Pythagorean Theorem', 'None'], correctIndex: 1, hint: '<p>SAS requires the generalized Pythagorean theorem.</p>', correctExplanation: 'SAS: Law of Cosines.', wrongExplanations: { 0: 'Law of Sines needs an angle-opposite-side pair.', 2: 'Only for right triangles.', 3: 'SAS is solvable.' } },
    { difficulty: 'medium', question: 'Given $a = 7$, $b = 10$, $C = 60°$. Find $c$ (rounded):', options: ['$8.89$', '$7.55$', '$12.17$', '$6.08$'], correctIndex: 0, hint: '<p>$c^2 = 49 + 100 - 140\\cos 60°$.</p>', correctExplanation: '$c^2 = 149 - 140(0.5) = 149 - 70 = 79$. $c = \\sqrt{79} \\approx 8.89$.', wrongExplanations: { 1: 'Check: $140 \\cos 60° = 70$, so $149 - 70 = 79$.', 2: 'You may have added instead of subtracted.', 3: 'Recheck the computation.' } },
    { difficulty: 'hard', question: 'SSA: $a = 10$, $b = 12$, $A = 30°$. How many triangles are possible?', options: ['0', '1', '2', 'Infinite'], correctIndex: 2, hint: '<p>Check: is $a < b$? Is $a > b\\sin A$?</p>', correctExplanation: '$b\\sin A = 12 \\sin 30° = 6$. Since $6 \\lt 10 \\lt 12$ ($b\\sin A < a < b$), TWO triangles exist.', wrongExplanations: { 0: '$a = 10 \\gt 6 = b\\sin A$, so at least one triangle exists.', 1: 'Since $a < b$ and $a > b\\sin A$, two triangles are possible.', 3: 'A triangle is determined by its sides and angles; at most 2.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'In triangle ABC, $A = 50°$, $B = 60°$. What is $C$?', accept: [70, '70'], placeholder: 'degrees', explanation: '$180 - 50 - 60 = 70°$.' },
    { difficulty: 'medium', question: 'Law of Cosines: $c^2 = 9 + 16 - 2(3)(4)\\cos 90° = $?', accept: [25, '25'], placeholder: 'Number', explanation: '$\\cos 90° = 0$. $c^2 = 25$. Reduces to Pythagorean theorem: $3^2 + 4^2 = 5^2$.' },
    { difficulty: 'medium', question: 'Using Law of Sines: $\\frac{a}{\\sin 30°} = \\frac{10}{\\sin 90°}$. Find $a$:', accept: [5, '5'], placeholder: 'Number', explanation: '$a = \\frac{10 \\sin 30°}{\\sin 90°} = \\frac{10(0.5)}{1} = 5$.' },
    { difficulty: 'hard', question: 'Triangle with all sides 6 (equilateral). What is each angle?', accept: [60, '60'], placeholder: 'degrees', explanation: 'Equilateral triangle: all angles = $60°$. Verify: $\\cos C = \\frac{36 + 36 - 36}{2(36)} = \\frac{36}{72} = 0.5$. $C = 60°$.' },
    { difficulty: 'hard', question: 'Triangle with $a = 5$, $b = 7$, $c = 10$. Is this triangle obtuse? (yes/no)', accept: ['yes', 'Yes'], placeholder: 'yes or no', explanation: '$c^2 = 100 > a^2 + b^2 = 74$. Since $c^2 > a^2 + b^2$, the triangle is obtuse.' },
    { difficulty: 'easy', question: 'In a right triangle, if opposite = 3 and hypotenuse = 5, then $\\sin \\theta =$?', accept: ['3/5', '0.6'], placeholder: 'Value', explanation: '$\\sin \\theta = \\text{opposite}/\\text{hypotenuse} = 3/5$.' },
    { difficulty: 'medium', question: 'Period of $\\sin(2x)$:', accept: ['pi', '3.14'], placeholder: 'Period', explanation: 'Period = $2\\pi / 2 = \\pi$.' },
    { difficulty: 'hard', question: 'Solve $\\cos(x) = 0$ for $x \\in [0, 2\\pi)$:', accept: ['pi/2, 3pi/2', '90, 270'], placeholder: 'Solutions', explanation: '$x = \\pi/2, 3\\pi/2$.' },
    { difficulty: 'medium', question: 'Law of cosines: $c^2 = a^2 + b^2 - 2ab\\cos($ ? $)$', accept: ['C', 'gamma', 'angle C'], placeholder: 'Angle', explanation: '$c^2 = a^2 + b^2 - 2ab\\cos C$.' },
    { difficulty: 'hard', question: 'Area of triangle using trig: $A = \\frac{1}{2}ab\\sin(C)$. If $a=5, b=8, C=30°$, area $=$?', accept: [10, '10'], placeholder: 'Area', explanation: '$A = \\frac{1}{2}(5)(8)\\sin(30°) = 20 \\times 0.5 = 10$.' },
    { difficulty: 'hard', question: 'In triangle: $a/\\sin A = b/\\sin B$. This is the law of:', accept: ['sines', 'law of sines'], placeholder: 'Name', explanation: 'Law of Sines: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$.' },
    { difficulty: 'easy', question: 'Inverse of $\\sin$:', accept: ['arcsin', 'sin^(-1)', 'asin'], placeholder: 'Function', explanation: '$\\arcsin$ or $\\sin^{-1}$.' },
    { difficulty: 'medium', question: 'In navigation, a bearing is measured from:', accept: ['north', 'due north'], placeholder: 'Direction', explanation: 'Bearings: measured clockwise from due north.' },
    { difficulty: 'easy', question: 'Period of $\\cos(x)$:', accept: ['2pi', '360', '2\\pi'], placeholder: 'Period', explanation: '$\\cos x$ repeats every $2\\pi$ radians.' },
    { difficulty: 'hard', question: 'Damped oscillation: $y = e^{-t}\\cos(t)$ approaches what as $t \\to \\infty$?', accept: [0, '0'], placeholder: 'Value', explanation: '$e^{-t} \\to 0$, so the oscillation decays to 0.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Solve: $A = 42°$, $B = 63°$, $c = 12$. Find sides $a$ and $b$.', steps: [
      { content: '$C = 180° - 42° - 63° = 75°$.' },
      { content: 'Law of Sines: $\\frac{a}{\\sin 42°} = \\frac{12}{\\sin 75°}$.' },
      { content: '$a = \\frac{12 \\sin 42°}{\\sin 75°} = \\frac{12(0.6691)}{0.9659} \\approx 8.31$.' },
      { content: '$b = \\frac{12 \\sin 63°}{\\sin 75°} = \\frac{12(0.8910)}{0.9659} \\approx 11.07$.' }
    ], explanation: 'AAS/ASA: find the third angle, then use Law of Sines for each side.' },
    { difficulty: 'hard', question: 'A surveyor measures two sides of a plot: 150m and 200m, with included angle 110°. Find the third side.', steps: [
      { content: 'SAS: Use Law of Cosines. $c^2 = 150^2 + 200^2 - 2(150)(200)\\cos 110°$.' },
      { content: '$c^2 = 22500 + 40000 - 60000(-0.342) = 62500 + 20520 = 83020$.' },
      { content: '$c = \\sqrt{83020} \\approx 288.1$ m.' }
    ], explanation: 'Surveying: SAS problems occur when measuring angles between landmarks.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'A triangular park has sides 80m, 100m, and 120m. Find all angles.', parts: [
      { question: 'Using Law of Cosines, find the largest angle (opposite 120m side):', accept: ['82.8', '83', '82'], placeholder: 'degrees (approx)', explanation: '$\\cos C = \\frac{80^2+100^2-120^2}{2(80)(100)} = \\frac{6400+10000-14400}{16000} = \\frac{2000}{16000} = 0.125$. $C \\approx 82.8°$.' },
      { question: 'Find angle $A$ (opposite 80m):', accept: ['41.4', '41', '42'], placeholder: 'degrees (approx)', explanation: '$\\cos A = \\frac{100^2+120^2-80^2}{2(100)(120)} = \\frac{10000+14400-6400}{24000} = \\frac{18000}{24000} = 0.75$. $A \\approx 41.4°$.' },
      { question: 'Find angle $B$:', accept: ['55.8', '56', '55'], placeholder: 'degrees (approx)', explanation: '$B = 180 - 82.8 - 41.4 \\approx 55.8°$.' }
    ], completionMessage: 'SSS: Use Law of Cosines to find the largest angle first, then subtract for remaining angles.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each triangle case to the correct law:', pairs: [
      { left: 'SAS (two sides, included angle)', right: 'Law of Cosines' },
      { left: 'AAS (two angles, one side)', right: 'Law of Sines' },
      { left: 'SSS (three sides)', right: 'Law of Cosines' },
      { left: 'SSA (two sides, non-included angle)', right: 'Law of Sines (ambiguous)' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Law of Cosines:', expression: '$c^2 = a^2 + b^2 -$ {{0}}', blanks: [ { accept: ['2abcosC', '2ab\\cos C', '2abcos(C)'], size: 12 } ], explanation: 'The correction term for non-right triangles.' },
    { difficulty: 'medium', context: 'When $C = 90°$:', expression: 'The Law of Cosines reduces to $c^2 = a^2 +$ {{0}} because $\\cos 90° = 0$.', blanks: [ { accept: ['b^2', 'b2'], size: 5 } ], explanation: 'Pythagorean theorem is a special case of the Law of Cosines.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>\ud83e\udde0 Triangle Solving Strategy</h4>
    <ol><li><strong>Identify what you have:</strong> SAS, AAS/ASA, SSS, or SSA.</li>
    <li><strong>SAS or SSS:</strong> Start with Law of Cosines.</li>
    <li><strong>AAS/ASA:</strong> Find third angle, then Law of Sines.</li>
    <li><strong>SSA:</strong> Law of Sines, but check for 0, 1, or 2 triangles.</li>
    <li><strong>Always verify:</strong> Angles must sum to $180\u00b0$. Largest side opposite largest angle.</li></ol></div>` }
}

] // end topics array
}); // end module push
})();
