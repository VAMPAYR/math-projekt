/* ============================================================
   MODULE 5: Trigonometry (3 topics)
   ============================================================ */
(function() {
if (!window.MATH_MODULES) window.MATH_MODULES = [];
const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

// Sample each continuous branch separately so an asymptote is never drawn as a curve.
const wavePoints = (fn, start, end, scaleY) => Array.from({ length: 161 }, (_, i) => {
  const x = start + (end - start) * i / 160;
  return `${(64 + 520 * x / (2 * Math.PI)).toFixed(2)},${(140 - scaleY * fn(x)).toFixed(2)}`;
}).join(' ');
const TRIG_GRAPHS = `
  <div class="math-diagram">
    <svg viewBox="0 0 640 280" width="640" height="280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sine and cosine over one full period, from zero to two pi radians. Sine starts at zero and cosine starts at one.">
      <g font-family="Inter,sans-serif" font-size="13">
        <text x="64" y="26" fill="#3b82f6">y = sin x</text><text x="200" y="26" fill="#10b981">y = cos x</text>
        <g stroke="#64748b" stroke-width="0.6" opacity="0.55">
          <path d="M64 68H584 M64 212H584 M194 52V228 M324 52V228 M454 52V228 M584 52V228" fill="none"/>
        </g>
        <path d="M64 48V228 M56 140H604" fill="none" stroke="#94a3b8" stroke-width="1.2"/>
        <g fill="#cbd5e1" text-anchor="middle">
          <text x="64" y="246">0</text><text x="194" y="246">&pi;/2</text><text x="324" y="246">&pi;</text><text x="454" y="246">3&pi;/2</text><text x="584" y="246">2&pi;</text>
          <text x="42" y="73">1</text><text x="42" y="145">0</text><text x="42" y="217">-1</text>
        </g>
        <text x="460" y="270" fill="#94a3b8">x in radians</text>
        <polyline points="${wavePoints(Math.sin, 0, 2 * Math.PI, 72)}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
        <polyline points="${wavePoints(Math.cos, 0, 2 * Math.PI, 72)}" fill="none" stroke="#10b981" stroke-width="2.5"/>
      </g>
    </svg>
  </div>
  <p class="math-diagram-label">Sine and cosine each repeat after $2\\pi$ radians. Cosine reaches its maximum a quarter-period before sine.</p>
  <div class="math-diagram">
    <svg viewBox="0 0 640 280" width="640" height="280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tangent from minus pi to pi radians, with three separate branches and vertical asymptotes at minus pi over two and pi over two.">
      <g font-family="Inter,sans-serif" font-size="13">
        <text x="64" y="26" fill="#f59e0b">y = tan x</text><text x="218" y="26" fill="#94a3b8">Dashed lines: vertical asymptotes</text>
        <path d="M64 140H604 M324 48V228" fill="none" stroke="#94a3b8" stroke-width="1.2"/>
        <path d="M194 48V228 M454 48V228" fill="none" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="6 5"/>
        <g fill="#cbd5e1" text-anchor="middle">
          <text x="64" y="246">-&pi;</text><text x="194" y="246">-&pi;/2</text><text x="324" y="246">0</text><text x="454" y="246">&pi;/2</text><text x="584" y="246">&pi;</text>
          <text x="307" y="62">3</text><text x="306" y="224">-3</text>
        </g>
        <text x="460" y="270" fill="#94a3b8">x in radians</text>
        ${[[-Math.PI, -Math.PI + Math.atan(3)], [-Math.atan(3), Math.atan(3)], [Math.PI - Math.atan(3), Math.PI]].map(([start, end]) => {
          const points = Array.from({ length: 81 }, (_, i) => {
            const x = start + (end - start) * i / 80;
            return `${(324 + 260 * x / Math.PI).toFixed(2)},${(140 - 28 * Math.tan(x)).toFixed(2)}`;
          }).join(' ');
          return `<polyline points="${points}" fill="none" stroke="#f59e0b" stroke-width="2.5"/>`;
        }).join('')}
      </g>
    </svg>
  </div>
  <p class="math-diagram-label">Tangent repeats after $\\pi$ radians. Each branch continues beyond this vertical window. No point lies on an asymptote.</p>`;

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
    <p><strong>Purpose of radians.</strong> Degrees divide a full rotation into $360$ parts. Radians connect angle measure directly to arc length: an angle of $\\theta$ radians subtends an arc of length $r\\theta$ on a circle of radius $r$. Calculus formulas such as $\\frac{d}{dx}\\sin(x) = \\cos(x)$ use radians.</p>
    ${WHY('Purpose of the unit circle', '<p>The unit circle ($r = 1$) defines $\\cos\\theta$ and $\\sin\\theta$ as the $x$ and $y$ coordinates of the point at angle $\\theta$. This extends trigonometry beyond right triangles to every real angle, including negative angles and angles greater than $360^\\circ$.</p>')}
  ` },
  formalDefinitions: [
      { term: 'Unit Circle', symbol: '$x^2 + y^2 = 1$', definition: 'Circle of radius 1 centered at the origin. For angle $\\theta$ measured from the positive $x$-axis, the point $(\\cos\\theta, \\sin\\theta)$ lies on this circle.' },
      { term: 'Sine', symbol: '$\\sin\\theta$', definition: 'The $y$-coordinate of the point on the unit circle at angle $\\theta$. Period: $2\\pi$. Range: $[-1, 1]$. Odd function: $\\sin(-\\theta) = -\\sin\\theta$.' },
      { term: 'Cosine', symbol: '$\\cos\\theta$', definition: 'The $x$-coordinate of the point on the unit circle at angle $\\theta$. Period: $2\\pi$. Range: $[-1, 1]$. Even function: $\\cos(-\\theta) = \\cos\\theta$.' },
      { term: 'Tangent', symbol: '$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$', definition: 'Undefined when $\\cos\\theta = 0$ (at $\\theta = \\frac{\\pi}{2} + n\\pi$). Period: $\\pi$. Range: $(-\\infty, \\infty)$.' },
      { term: 'Radian', symbol: '', definition: 'The angle subtended by an arc equal in length to the radius. $2\\pi$ radians = $360^\\circ$. $1$ radian $\\approx 57.3^\\circ$. Radians are dimensionless.' }
    ],
    graphExplorer: [
      { latex: 'y = \\sin(x)', color: '#3b82f6' },
      { latex: 'y = \\cos(x)', color: '#10b981' },
      { latex: 'y = \\tan(x)', color: '#f59e0b' }
    ],
    background: {
      title: 'Trigonometry Background',
      tabs: [
        {
          label: 'Historical Development',
          content: '<p>Trigonometry began as a measurement system for triangles and circles. Astronomers needed distances and angles that could not be measured directly, such as the apparent height of a star or the angle between two celestial objects.</p><p>Tables of chords and later tables of sine values turned geometry into computation. A known angle could be matched with a known ratio, and that ratio could determine an unknown side length. This made trigonometry a practical calculation tool before modern calculators existed.</p><p>The unit circle gives the modern version of the same idea. Sine and cosine are coordinates on a circle of radius 1, so every angle corresponds to a point. The old measurement problem becomes a coordinate problem: find the horizontal and vertical components of a rotating radius.</p>'
        },
        {
          label: 'Conceptual Thread',
          content: '<p>Right-triangle trigonometry gives ratios for acute angles. The unit circle extends those ratios to every real angle. At angle $\\theta$, the terminal point has coordinates $(\\cos\\theta, \\sin\\theta)$.</p><p>This coordinate definition explains signs by quadrant, periodic behavior, and identities such as $\\sin^2\\theta + \\cos^2\\theta = 1$.</p>'
        },
        {
          label: 'Practical Grounding',
          content: '<p>Consider a Ferris wheel with radius $20$ meters and center height $24$ meters. A rider starts at the rightmost point and the wheel rotates counterclockwise. At angle $\\theta$, the rider position relative to the center is $(20\\cos\\theta, 20\\sin\\theta)$.</p><p>The height above the ground is $H(\\theta) = 24 + 20\\sin\\theta$. At $\\theta = 0$, the rider is level with the center, so $H = 24$. At $\\theta = \\pi/2$, the rider is at the top, so $H = 44$. At $\\theta = 3\\pi/2$, the rider is at the bottom, so $H = 4$.</p><p>This example explains amplitude, midline, and period. The amplitude is $20$ because the rider moves $20$ meters above and below the center. The midline is $24$ because the wheel center sits $24$ meters above ground. The period is $2\\pi$ radians because one full rotation returns the rider to the starting point.</p>'
        }
      ]
    },
    mathGrammar: [
      { question: 'Meaning of $\\sin(\\theta)$', answer: 'Draw a right triangle with angle $\\theta$. $\\sin(\\theta) = \\frac{\\text{opposite side}}{\\text{hypotenuse}}$. On the unit circle with radius 1, sine is the $y$-coordinate of the point at angle $\\theta$. It measures vertical position relative to the center.' },
      { question: 'Role of $\\cos(\\theta)$', answer: '$\\cos(\\theta)$ measures horizontal position, the $x$-coordinate. $\\sin(\\theta)$ measures vertical position. Together, $(\\cos\\theta, \\sin\\theta)$ gives the exact position on the unit circle.' },
      { question: 'Use of the unit circle', answer: 'The unit circle extends trigonometry beyond right triangles. Right triangles only use angles up to $90^\\circ$. The unit circle defines sine and cosine for every real angle: $120^\\circ$, $-45^\\circ$, $720^\\circ$, and any other angle. This makes trigonometry useful for waves, rotations, pendulums, and circular motion.' },
      { question: 'Standard-angle value pattern', answer: 'Use the pattern for $\\sin$: at $0, 30, 45, 60, 90$ degrees, sine takes values $\\frac{\\sqrt{0}}{2}, \\frac{\\sqrt{1}}{2}, \\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{3}}{2}, \\frac{\\sqrt{4}}{2}$. Simplify: $0, \\frac{1}{2}, \\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{3}}{2}, 1$. Cosine is the same sequence reversed.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 680 380" width="680" height="380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Unit circle at thirty degrees, showing cosine as the horizontal coordinate and sine as the vertical coordinate">
  <rect x="0" y="0" width="680" height="380" fill="transparent"/>
  <g stroke="#334155" stroke-width="0.35" opacity="0.65">
    <line x1="90" y1="30" x2="90" y2="350"/><line x1="130" y1="30" x2="130" y2="350"/><line x1="170" y1="30" x2="170" y2="350"/><line x1="210" y1="30" x2="210" y2="350"/><line x1="250" y1="30" x2="250" y2="350"/><line x1="290" y1="30" x2="290" y2="350"/><line x1="330" y1="30" x2="330" y2="350"/><line x1="370" y1="30" x2="370" y2="350"/>
    <line x1="60" y1="70" x2="380" y2="70"/><line x1="60" y1="110" x2="380" y2="110"/><line x1="60" y1="150" x2="380" y2="150"/><line x1="60" y1="190" x2="380" y2="190"/><line x1="60" y1="230" x2="380" y2="230"/><line x1="60" y1="270" x2="380" y2="270"/><line x1="60" y1="310" x2="380" y2="310"/>
  </g>
  <line x1="220" y1="38" x2="220" y2="342" stroke="#94a3b8" stroke-width="1.15"/>
  <line x1="68" y1="190" x2="372" y2="190" stroke="#94a3b8" stroke-width="1.15"/>
  <text x="377" y="194" fill="#94a3b8" font-size="11" font-family="Inter,sans-serif">x</text>
  <text x="214" y="34" fill="#94a3b8" font-size="11" font-family="Inter,sans-serif">y</text>
  <circle cx="220" cy="190" r="130" fill="none" stroke="#3b82f6" stroke-width="2.25"/>
  <line x1="220" y1="190" x2="332.58" y2="125" stroke="#10b981" stroke-width="2"/>
  <line x1="332.58" y1="125" x2="332.58" y2="190" stroke="#ef4444" stroke-width="1.4" stroke-dasharray="5,4"/>
  <line x1="220" y1="190" x2="332.58" y2="190" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="5,4"/>
  <path d="M 250 190 A 30 30 0 0 0 246 175" fill="none" stroke="#e2e8f0" stroke-width="1.2"/>
  <text x="254" y="182" fill="#e2e8f0" font-size="11" font-family="Inter,sans-serif">&theta; = 30&deg;</text>
  <text x="276" y="207" fill="#f59e0b" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">cos &theta;</text>
  <text x="340" y="160" fill="#ef4444" font-size="11" font-family="Inter,sans-serif">sin &theta;</text>
  <circle cx="350" cy="190" r="3.5" fill="#3b82f6"/><text x="356" y="187" fill="#94a3b8" font-size="10" font-family="Inter,sans-serif">(1, 0)</text>
  <circle cx="220" cy="60" r="3.5" fill="#3b82f6"/><text x="228" y="57" fill="#94a3b8" font-size="10" font-family="Inter,sans-serif">(0, 1)</text>
  <circle cx="90" cy="190" r="3.5" fill="#3b82f6"/><text x="43" y="206" fill="#94a3b8" font-size="10" font-family="Inter,sans-serif">(-1, 0)</text>
  <circle cx="220" cy="320" r="3.5" fill="#3b82f6"/><text x="228" y="336" fill="#94a3b8" font-size="10" font-family="Inter,sans-serif">(0, -1)</text>
  <circle cx="332.58" cy="125" r="4.5" fill="#10b981"/>
  <text x="337" y="115" fill="#10b981" font-size="10" font-family="Inter,sans-serif">30&deg;</text>
  <circle cx="311.92" cy="98.08" r="3.5" fill="#8b5cf6"/>
  <text x="319" y="94" fill="#c4b5fd" style="fill:var(--accent-purple)" font-size="10" font-family="Inter,sans-serif">45&deg;</text>
  <circle cx="285" cy="77.42" r="3.5" fill="#8b5cf6"/>
  <text x="292" y="71" fill="#c4b5fd" style="fill:var(--accent-purple)" font-size="10" font-family="Inter,sans-serif">60&deg;</text>
  <g font-family="Inter,sans-serif">
    <rect x="410" y="52" width="238" height="176" rx="6" style="fill:var(--bg-secondary);stroke:var(--border-medium)"/>
    <text x="426" y="78" fill="#e2e8f0" font-size="12" font-weight="600">First-quadrant values</text>
    <line x1="426" y1="91" x2="572" y2="91" style="stroke:var(--border-medium)" stroke-width="1"/>
    <text x="426" y="116" fill="#c4b5fd" style="fill:var(--accent-purple)" font-size="11">30&deg; = &pi;/6</text>
    <text x="426" y="132" fill="#cbd5e1" font-size="11">(&radic;3/2, 1/2)</text>
    <text x="426" y="158" fill="#c4b5fd" style="fill:var(--accent-purple)" font-size="11">45&deg; = &pi;/4</text>
    <text x="426" y="174" fill="#cbd5e1" font-size="11">(&radic;2/2, &radic;2/2)</text>
    <text x="426" y="200" fill="#c4b5fd" style="fill:var(--accent-purple)" font-size="11">60&deg; = &pi;/3</text>
    <text x="426" y="216" fill="#cbd5e1" font-size="11">(1/2, &radic;3/2)</text>
  </g>
  <g font-family="Inter,sans-serif" font-size="11">
    <text x="410" y="268" fill="#e2e8f0" font-weight="600">Reading the diagram</text>
    <text x="410" y="290" fill="#f59e0b">x-coordinate = cos &theta;</text>
    <text x="410" y="310" fill="#ef4444">y-coordinate = sin &theta;</text>
    <text x="410" y="330" fill="#10b981">terminal point = (cos &theta;, sin &theta;)</text>
  </g>
</svg>
</div>
<p class="math-diagram-label">The radius shown is at $30^\\circ$. Each terminal point is $(\\cos\\theta, \\sin\\theta)$, with positive angles measured counterclockwise from the positive x-axis.</p>

    <div class="callout callout-key"><h4>Radian Measure</h4>
    <p>$2\\pi$ radians $= 360°$. So $\\pi$ rad $= 180°$.</p>
    <p>Conversion: $\\theta_{\\text{rad}} = \\theta_{\\text{deg}} \\cdot \\frac{\\pi}{180}$. $\\theta_{\\text{deg}} = \\theta_{\\text{rad}} \\cdot \\frac{180}{\\pi}$.</p>
    <p>Key values: $30° = \\frac{\\pi}{6}$, $45° = \\frac{\\pi}{4}$, $60° = \\frac{\\pi}{3}$, $90° = \\frac{\\pi}{2}$.</p></div>
    <div class="callout callout-key"><h4>The Unit Circle Definition</h4>
    <p>For angle $\\theta$ measured from the positive x-axis, the terminal point on the unit circle is $(\\cos\\theta, \\sin\\theta)$. Positive angles rotate counterclockwise; negative angles rotate clockwise.</p>
    <ul>
      <li>$\\cos\\theta$ = signed x-coordinate</li>
      <li>$\\sin\\theta$ = signed y-coordinate</li>
      <li>$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$ = slope of the terminal ray, when $\\cos\\theta \\ne 0$</li>
    </ul><p>Coordinates can be negative; lengths cannot. On a circle of radius $r$, the coordinates become $(r\\cos\\theta, r\\sin\\theta)$. The corresponding right-triangle side lengths are $|r\\cos\\theta|$ and $|r\\sin\\theta|$.</p></div>
    <div class="callout callout-key"><h4>Key Unit Circle Values</h4>
    <p>$$\\cos(0) = 1,\\ \\sin(0) = 0$$</p>
    <p>$$\\cos\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{2},\\ \\sin\\frac{\\pi}{6} = \\frac{1}{2}$$</p>
    <p>$$\\cos\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2},\\ \\sin\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2}$$</p>
    <p>$$\\cos\\frac{\\pi}{3} = \\frac{1}{2},\\ \\sin\\frac{\\pi}{3} = \\frac{\\sqrt{3}}{2}$$</p>
    <p>$$\\cos\\frac{\\pi}{2} = 0,\\ \\sin\\frac{\\pi}{2} = 1$$</p></div>
    ${WHY('Derive the standard values from triangles', '<p>A $45^\\circ$ right triangle with legs $1$ has hypotenuse $\\sqrt2$. Divide the legs by the hypotenuse to obtain $\\sin45^\\circ=\\cos45^\\circ=1/\\sqrt2=\\sqrt2/2$. Split an equilateral triangle of side $2$ in half to obtain a $30^\\circ$-$60^\\circ$-$90^\\circ$ triangle with sides $1,\\sqrt3,2$. Opposite-to-hypotenuse and adjacent-to-hypotenuse ratios give the $30^\\circ$ and $60^\\circ$ values. The unit circle uses these ratios as coordinates.</p>')}
    <div class="callout callout-key"><h4>Pythagorean Identity</h4>
    <p>$$\\sin^2\\theta + \\cos^2\\theta = 1$$</p>
    ${WHY('Reason for the identity', '<p>$(\\cos\\theta, \\sin\\theta)$ lies on the unit circle $x^2 + y^2 = 1$. Substituting gives $\\cos^2\\theta + \\sin^2\\theta = 1$. This is the Pythagorean theorem applied to the right triangle formed by the terminal point, the origin, and the projection onto the x-axis.</p>')}</div>
    <div class="callout callout-key"><h4>ASTC: Signs by Quadrant</h4>
    <p><strong>A</strong>ll (Q1), <strong>S</strong>ine (Q2), <strong>T</strong>angent (Q3), <strong>C</strong>osine (Q4) are positive. Mnemonic: "All Students Take Calculus."</p></div>
    <div class="callout callout-key"><h4>Graphs of Trigonometric Functions</h4>
    <p>Use radians for $x$ in the graphs below and in the graph explorer. A full turn is $2\\pi$, not $360$, on a radian axis.</p>
    ${TRIG_GRAPHS}
    <p>For $y = A\\sin(Bx - C) + D$ or $y = A\\cos(Bx - C) + D$ with $A\\ne0$ and $B\\ne0$:</p>
    <ul>
      <li><strong>Amplitude:</strong> $|A|$, half the distance between the maximum and minimum</li>
      <li><strong>Period:</strong> $\\frac{2\\pi}{|B|}$, when $A \\ne 0$ and $B \\ne 0$</li>
      <li><strong>Phase Shift:</strong> $\\frac{C}{B}$ (horizontal translation)</li>
      <li><strong>Vertical Shift:</strong> $D$ (midline at $y = D$)</li>
    </ul>
    <p>Factor the argument as $B(x-C/B)$ before reading the shift. A negative $A$ reflects the graph across its midline. The range is $[D-|A|, D+|A|]$. If $A=0$ or $B=0$, the function is constant and has no smallest positive period.</p>
    <p>One cycle increases the sine or cosine argument by $2\\pi$. Therefore $|B|T=2\\pi$, which gives the period formula. For $y=A\\tan(Bx-C)+D$ with $A,B \\ne 0$, the period is $\\pi/|B|$ and the asymptotes occur at $x=(C+\\pi/2+n\\pi)/B$, $n\\in\\mathbb{Z}$. Tangent has no amplitude because its values are unbounded.</p>
    <p><strong>Read a graph before writing a model:</strong> average the maximum and minimum to find $D$; halve their difference to find $|A|$; measure the distance between consecutive peaks to find $T$; then set $|B|=2\\pi/T$. Use a known starting value and direction to choose sine, cosine, and the phase.</p></div>
    <div class="callout callout-key"><h4>Inverse Trigonometric Functions</h4>
    <ul>
      <li>$\\arcsin(x)$: domain $[-1,1]$, range $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$. "What angle has sine $x$?"</li>
      <li>$\\arccos(x)$: domain $[-1,1]$, range $[0, \\pi]$.</li>
      <li>$\\arctan(x)$: domain $(-\\infty, \\infty)$, range $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$.</li>
    </ul>
    ${WHY('Domain restriction', '<p>$\\sin x$ is not one-to-one on all of $\\mathbb{R}$ because it repeats every $2\\pi$. To define an inverse, restrict sine to $[-\\pi/2, \\pi/2]$, where it is one-to-one and covers all of $[-1,1]$. Cosine and tangent require similar restrictions.</p>')}
    <p>An inverse returns one principal angle. It does not list every solution of a trig equation. For example, $\\arcsin(1/2)=\\pi/6$, but $\\sin\\theta=1/2$ also holds at $5\\pi/6$ and after adding full turns. Also, $\\sin^{-1}x$ means $\\arcsin x$; the reciprocal is $1/\\sin x=\\csc x$.</p></div>
    <div class="callout callout-tip"><h4>Choose the angle, ratio, and unit</h4>
    <p>In a right triangle, name the angle first. The opposite and adjacent sides depend on that choice; the hypotenuse stays opposite the right angle. Choose the ratio containing the known side and the desired side. Use degrees when a question gives $^\\circ$, and radians when it gives $\\pi$ or a radian measure.</p>
    <p>For an ordinary sector with $0\\le\\theta\\le2\\pi$, arc length is $s=r\\theta$ and area is $\\tfrac12r^2\\theta$. Convert a degree angle before using these formulas. A negative rotation gives a signed angle; a physical arc length uses the magnitude of that angle.</p></div>
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
      { title: 'Height up the wall', content: '$\\sin(67.4°) = \\frac{h}{13}$, so $h = 13\\sin(67.4°) \\approx 12$ ft.', why: 'Pythagorean verification: $5^2 + 12^2 = 25 + 144 = 169 = 13^2$. This is a 5-12-13 right triangle.' }
    ]
  },
  {
    title: 'Sketch a transformed wave from five points',
    problem: 'Find the amplitude, period, phase shift, and range of $y=3\\sin(2x-\\pi)+1$. Sketch one cycle.',
    steps: [
      { title: 'Factor the argument', content: '$2x-\\pi=2(x-\\pi/2)$. The graph shifts right by $\\pi/2$.', why: 'The inside coefficient multiplies both the input and the shift; reading $\\pi$ as the shift would miss that factor.' },
      { title: 'Read vertical and horizontal scales', content: 'Amplitude $3$; midline $y=1$; period $T=2\\pi/2=\\pi$; range $[-2,4]$.', why: 'Sine ranges from $-1$ to $1$. Multiplication by $3$ and addition of $1$ produce the new range.' },
      { title: 'Use quarter-period increments', content: 'Start at $x=\\pi/2$. Add $T/4=\\pi/4$ each time. The five points are $(\\pi/2,1)$, $(3\\pi/4,4)$, $(\\pi,1)$, $(5\\pi/4,-2)$, and $(3\\pi/2,1)$.', why: 'The argument passes through $0,\\pi/2,\\pi,3\\pi/2,2\\pi$ during one cycle.' },
      { title: 'Check the original formula', content: 'At $x=0$, $y=3\\sin(-\\pi)+1=1$. The curve initially moves downward as $x$ increases.', why: 'A midline crossing alone does not identify the direction. A nearby value or the five-point cycle resolves it.' }
    ]
  },
  {
    title: 'Build a model from repeated motion',
    problem: 'A wheel has radius $20$ m and center height $24$ m. A rider starts at the bottom. The wheel turns uniformly once every $80$ s. Model the height and find it after $10$ s.',
    steps: [
      { title: 'Translate geometry into model parameters', content: 'The midline is $24$ m, the amplitude is $20$ m, and the angular speed is $2\\pi/80=\\pi/40$ radians per second.', why: 'Uniform rotation means equal angles in equal times. The argument must be an angle, so angular speed multiplies time.' },
      { title: 'Match the starting position', content: '$H(t)=24-20\\cos(\\pi t/40)$. At $t=0$, $H(0)=4$ m; at $t=40$, $H(40)=44$ m.', why: 'Cosine starts at $1$. A negative coefficient puts the rider below the midline at the start.' },
      { title: 'Evaluate at ten seconds', content: '$H(10)=24-20\\cos(\\pi/4)=24-10\\sqrt2\\approx9.86$ m.', why: 'The angle after ten seconds is one eighth of a full turn. Keep the exact angle until the final rounding.' },
      { title: 'Transfer the method', content: 'For any uniform wheel starting at the bottom, use $H(t)=D-r\\cos(2\\pi t/T)$. Change $D$, $r$, and $T$ to match the center height, radius, and revolution time.', why: 'A different starting point changes the phase. Nonuniform motion requires a time-dependent angle instead of a constant angular speed.' }
    ]
  },
  {
    title: 'Use an angle of elevation to measure height',
    problem: 'An observer stands $12$ m horizontally from a vertical tower on level ground. The angle from the horizontal to the top is $36^\\circ$, and the observer eye height is $1.5$ m. Find the tower height.',
    steps: [
      { title: 'Choose the correct triangle', content: 'The adjacent side is $12$ m. The opposite side is the height above eye level, $h-1.5$.', why: 'The sight line starts at the eyes, not at ground level.' },
      { title: 'Use tangent in degree mode', content: '$\\tan36^\\circ=(h-1.5)/12$, so $h=1.5+12\\tan36^\\circ\\approx10.22$ m.', why: 'Tangent connects the horizontal and vertical legs without requiring the sight-line length.' },
      { title: 'Identify the assumptions', content: 'The calculation assumes a vertical tower, level ground, and a horizontal distance of $12$ m. A distance measured along a slope would need a different triangle.', why: 'Before applying a formula, match the diagram sides to the measurements in the problem.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a radian?', back: 'Angle subtended by arc equal to radius. 2*pi radians = 360 degrees. Connects angle to arc length: arc = r*theta.' },
      { type: 'why', front: 'Why radians instead of degrees?', back: 'Radians define an angle as arc length divided by radius. This gives s = r theta and d/dx sin(x) = cos(x). A degree-valued input adds a pi/180 factor to the derivative.' },
      { type: 'define', front: 'Sin and cos on unit circle?', back: 'At angle theta, the point on the unit circle is (cos theta, sin theta). Cosine = x, sine = y.' },
      { type: 'how', front: 'Why does sin^2 + cos^2 = 1?', back: 'The point (cos, sin) is ON the circle x^2+y^2=1. Substituting gives the identity. True for all angles.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'Convert $90°$ to radians:', options: ['$\\pi$', '$\\frac{\\pi}{2}$', '$\\frac{\\pi}{4}$', '$2\\pi$'], correctIndex: 1, hint: '<p>$180° = \\pi$ radians.</p>', correctExplanation: '$90° = 90 \\cdot \\frac{\\pi}{180} = \\frac{\\pi}{2}$.', wrongExplanations: { 0: '$\\pi$ radians $= 180°$, not $90°$.', 2: '$\\frac{\\pi}{4} = 45°$, not $90°$.', 3: '$2\\pi = 360°$.' } },
    { difficulty: 'easy', question: '$\\sin(0) = $?', options: ['$1$', '$0$', '$-1$', '$\\pi$'], correctIndex: 1, hint: '<p>At angle 0, the point on the unit circle is $(1, 0)$. Sine = y-coordinate.</p>', correctExplanation: 'At $\\theta = 0$: point is $(1, 0)$. $\\sin(0) = y = 0$.', wrongExplanations: { 0: '$\\cos(0) = 1$, not $\\sin(0)$.', 2: '$\\sin(\\pi) = 0$ and $\\sin(3\\pi/2) = -1$.', 3: 'Sine lies in $[-1,1]$, whereas $\\pi>1$. The number $\\pi$ is a constant; the radian is an angle unit.' } },
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
    { difficulty: 'medium', question: 'In which quadrant is $\\sin\\theta \\gt 0$ and $\\cos\\theta \\lt 0$?', accept: ['2', 'II', 'second', 'quadrant 2'], placeholder: 'Quadrant', explanation: 'Quadrant II: $\\sin\\theta \\gt 0$, $\\cos\\theta \\lt 0$.' },
    { difficulty: 'hard', question: 'Period of $f(x) = \\sin(3x)$:', accept: ['2pi/3', '2\\pi/3'], placeholder: 'Period', explanation: 'Period = $2\\pi / |B| = 2\\pi / 3$.' },
    { difficulty: 'easy', question: 'Convert $180°$ to radians:', accept: ['pi', '3.14'], placeholder: 'Radians', explanation: '$180° = \\pi$ radians.' },
    { difficulty: 'medium', question: '$\\tan(45°) =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\tan(45°) = \\sin(45°)/\\cos(45°) = 1$.' },
    { difficulty: 'easy', question: '$\\cos(0°) =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\cos(0°) = 1$.' },
    { difficulty: 'easy', question: '$\\sin(90°) =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\sin(90°) = 1$.' },
    { difficulty: 'medium', question: 'Reference angle for $240°$:', accept: [60, '60'], placeholder: 'Degrees', explanation: '$240° - 180° = 60°$.' },
    { difficulty: 'hard', question: 'Amplitude of $y = 3\\sin(2x + \\pi)$:', accept: [3, '3'], placeholder: 'Number', explanation: 'Amplitude = $|A| = 3$.' },
    { difficulty: 'medium', question: 'Phase shift of $y = \\sin(x - \\pi/4)$:', accept: ['pi/4 right', 'pi/4', '\\pi/4'], placeholder: 'Shift', explanation: 'Phase shift: $h = \\pi/4$ units right.' },
    { difficulty: 'easy', question: '$\\sin(0°) =$?', accept: [0, '0'], placeholder: 'Number', explanation: '$\\sin(0°) = 0$.' },
    { difficulty: 'hard', question: 'Unit circle: coordinates at $\\theta = 2\\pi/3$:', accept: ['(-1/2, sqrt(3)/2)', '(-0.5, 0.866)'], placeholder: 'Point', explanation: '$\\cos(120°) = -1/2$, $\\sin(120°) = \\sqrt{3}/2$.' },
    { difficulty: 'medium', question: 'Convert $\\pi/3$ rad to degrees:', accept: [60, '60'], placeholder: 'Degrees', explanation: '$\\pi/3 \\times 180/\\pi = 60°$.' },
    { difficulty: 'hard', question: 'Exact value: $\\sin(\\pi/4) =$?', accept: ['sqrt(2)/2', '\\sqrt{2}/2'], placeholder: 'Exact value', explanation: '$\\sin(45°) = \\sqrt{2}/2$. The decimal $0.707$ is an approximation.' },
    { difficulty: 'easy', question: 'Reciprocal of sine:', accept: ['csc', 'cosecant', 'csc(x)'], placeholder: 'Function', explanation: '$\\csc x = 1/\\sin x$.' },
    { difficulty: 'hard', question: 'DeMoivre\'s theorem: $(\\cos\\theta + i\\sin\\theta)^n =$?', accept: ['cos(ntheta)+isin(ntheta)'], placeholder: 'Expression', explanation: '$\\cos(n\\theta) + i\\sin(n\\theta)$.' },
    { difficulty: 'easy', question: 'Cotangent = cos / ?', accept: ['sin', 'sine'], placeholder: 'Function', explanation: '$\\cot x = \\cos x / \\sin x$.' },
    { difficulty: 'hard', question: 'Arc length in radians: $s = r$ times what angle measure?', accept: ['theta', '\\theta'], placeholder: 'Angle measure', explanation: '$s = r\\theta$, with $\\theta$ in radians.' },
    { difficulty: 'easy', question: 'SOHCAHTOA: $\\tan = $ opposite / ?', accept: ['adjacent'], placeholder: 'Side', explanation: '$\\tan \\theta = \\frac{\\text{opposite}}{\\text{adjacent}}$.' },
    { difficulty: 'hard', question: 'Euler\'s formula: $e^{i\\theta} = \\cos\\theta + i$ ?', accept: ['sin(theta)', 'sin theta', '\\sin\\theta'], placeholder: 'Term', explanation: '$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$.' },
    { difficulty: 'easy', question: 'SOH: $\\sin = $ opposite / ?', accept: ['hypotenuse'], placeholder: 'Side', explanation: '$\\sin \\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}$.' },
    { difficulty: 'hard', question: '$\\cos(60°) =$?', accept: ['1/2', '0.5'], placeholder: 'Value', explanation: '$\\cos(60°) = 1/2$.' },
    { difficulty: 'medium', question: 'CAH: $\\cos = $ adjacent / ?', accept: ['hypotenuse'], placeholder: 'Side', explanation: '$\\cos \\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}$.' },
    { difficulty: 'hard', question: 'Exact: $\\tan(\\pi/3) =$?', accept: ['sqrt(3)', '\\sqrt{3}'], placeholder: 'Exact value', explanation: '$\\tan(60°) = \\sqrt{3}$. The decimal $1.732$ is an approximation.' },
    { difficulty: 'medium', question: 'Reference angle for $240°$:', accept: [60, '60'], placeholder: 'Degrees', explanation: '$240 - 180 = 60°$.' },
    { difficulty: 'hard', question: 'Exact: $\\sin(75°) = \\sin(45° + 30°) =$?', accept: ['(sqrt(6)+sqrt(2))/4'], placeholder: 'Value', explanation: '$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$. Sum formula.' },
    { difficulty: 'medium', question: 'What is the smallest positive vertical asymptote of $y=\\tan(2x)$, in radians?', accept: ['pi/4', '\\pi/4'], placeholder: 'Radians', explanation: 'Set $2x=\\pi/2+k\\pi$. The smallest positive solution is $x=\\pi/4$.' },
    { difficulty: 'medium', question: 'A sinusoidal model has maximum $14$ and minimum $6$. What is its midline value?', accept: [10, '10'], placeholder: 'Number', explanation: 'The midline is the average: $(14+6)/2=10$. The amplitude is half the difference, $4$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Find $\\cos(\\frac{5\\pi}{3})$ using reference angles.', steps: [
      { content: '$\\frac{5\\pi}{3}$ is in Q4 because $\\frac{3\\pi}{2} \\lt \\frac{5\\pi}{3} \\lt 2\\pi$.' },
      { content: 'Reference angle: $2\\pi - \\frac{5\\pi}{3} = \\frac{\\pi}{3}$.' },
      { content: 'Cosine is POSITIVE in Q4.' },
      { content: '$\\cos(\\frac{5\\pi}{3}) = +\\cos(\\frac{\\pi}{3}) = \\frac{1}{2}$.' }
    ], explanation: 'Reference angle method: (1) Quadrant, (2) Reference angle, (3) Sign, (4) Evaluate.' },
    { difficulty: 'hard', question: 'Solve $2\\sin(x) = 1$ for $x \\in [0, 2\\pi)$.', steps: [
      { content: '$\\sin(x) = 1/2$.' },
      { content: 'Reference angle: $\\pi/6$ (30°).' },
      { content: 'Sine positive in Q1 and Q2: $x = \\pi/6$ or $x = 5\\pi/6$.' }
    ], explanation: 'Reference angles and ASTC (All Students Take Calculus) for quadrant analysis.' },
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
      { question: 'Min height:', accept: [5, '5'], placeholder: 'meters', explanation: '25 - 20 = 5m.' }
    ], completionMessage: 'Sinusoidal model: $h(t) = A\\sin(\\frac{2\\pi}{T}t + \\phi) + D$.' },
    { difficulty: 'hard', question: 'In triangle ABC, angle A = 30°, side a = 5.', parts: [
      { question: 'Which law do you use to find side b if angle B = 60°?', accept: ['law of sines', 'sine rule'], placeholder: 'Law name', explanation: 'Law of sines: $a/\\sin A = b/\\sin B$.' },
      { question: 'Find $b$ (round to 1 decimal):', accept: ['8.7'], placeholder: 'Number', explanation: '$b = 5 \\sin(60°)/\\sin(30°) = 5(0.866)/0.5 = 8.66 \\approx 8.7$.' }
    ], completionMessage: 'Law of sines: $a/\\sin A = b/\\sin B = c/\\sin C$.' },
    { difficulty: 'medium', question: 'Right triangle: adjacent = 4, opposite = 3.', parts: [
      { question: 'Hypotenuse:', accept: [5, '5'], placeholder: 'Number', explanation: '$\\sqrt{16 + 9} = 5$.' },
      { question: '$\\sin(\\theta) =$?', accept: ['3/5', '0.6'], placeholder: 'Ratio', explanation: '$\\sin = \\text{opp}/\\text{hyp} = 3/5$.' },
      { question: '$\\cos(\\theta) =$?', accept: ['4/5', '0.8'], placeholder: 'Ratio', explanation: '$\\cos = \\text{adj}/\\text{hyp} = 4/5$.' }
    ], completionMessage: 'SOH-CAH-TOA: Sine=O/H, Cosine=A/H, Tangent=O/A.' },
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
    { difficulty: 'easy', context: 'SOH-CAH-TOA:', expression: 'Sine equals opposite divided by {{0}}.', blanks: [ { accept: ['hypotenuse', 'hyp'], size: 12 } ], explanation: 'Sine = Opposite / Hypotenuse.' },
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
  stuckGuide: { html: `<div class="callout callout-tip"><h4> Trig Strategy</h4>
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
      { term: 'Pythagorean Identity', symbol: '$\\sin^2\\theta + \\cos^2\\theta = 1$', definition: 'Follows from the equation of the unit circle. When $\\cos\\theta\\ne0$, division by $\\cos^2\\theta$ yields $\\tan^2\\theta + 1 = \\sec^2\\theta$.' },
      { term: 'Double Angle Formulas', symbol: '', definition: '$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$. $\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta$.' },
      { term: 'Sum/Difference Formulas', symbol: '', definition: '$\\sin(\\alpha \\pm \\beta) = \\sin\\alpha\\cos\\beta \\pm \\cos\\alpha\\sin\\beta$. $\\cos(\\alpha \\pm \\beta) = \\cos\\alpha\\cos\\beta \\mp \\sin\\alpha\\sin\\beta$.' }
    ],
    background: {
      title: 'Why Do Identities Matter?',
      content: '<p>A trigonometric identity holds for every input where both sides are defined. An equation asks which inputs make a particular equality true. This distinction matters when a denominator excludes angles.</p><p>The Pythagorean identity follows from the unit circle: substitute $x=\\cos\\theta$ and $y=\\sin\\theta$ into $x^2+y^2=1$. The power-reduction identity $\\sin^2x=(1-\\cos2x)/2$ rewrites a squared oscillation as a constant plus a cosine. This form helps find an antiderivative and explains why the mean of $\\sin^2x$ over a full period is $1/2$.</p>'
    },
    concept: { html: `
    <div class="callout callout-key"><h4>Fundamental Identities</h4>
    <ul>
      <li><strong>Reciprocal:</strong> $\\csc\\theta = \\frac{1}{\\sin\\theta}$, $\\sec\\theta = \\frac{1}{\\cos\\theta}$, $\\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta}$</li>
      <li><strong>Pythagorean:</strong> $\\sin^2\\theta + \\cos^2\\theta = 1$, $1 + \\tan^2\\theta = \\sec^2\\theta$, $1 + \\cot^2\\theta = \\csc^2\\theta$</li>
      <li><strong>Even/Odd:</strong> $\\cos(-\\theta) = \\cos\\theta$ (even), $\\sin(-\\theta) = -\\sin\\theta$ (odd), $\\tan(-\\theta) = -\\tan\\theta$ (odd)</li>
    </ul><p>Keep denominators nonzero: cosecant and cotangent require $\\sin\\theta\\ne0$; secant and tangent require $\\cos\\theta\\ne0$. The shortcut $\\cot\\theta=1/\\tan\\theta$ additionally requires tangent to be defined and nonzero. At $\\theta=\\pi/2$, cotangent is $0$ but tangent is undefined.</p></div>
    <div class="callout callout-key"><h4>Sum & Difference Formulas</h4>
    <ul>
      <li>$\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B$</li>
      <li>$\\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B$</li>
      <li>$\\tan(A + B) = \\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B}$</li>
    </ul>
    <p>The tangent formula requires $\\cos A\\ne0$, $\\cos B\\ne0$, and $1-\\tan A\\tan B\\ne0$. Sine and cosine sum formulas hold for all real angles.</p>
    ${WHY('Where the cosine minus sign comes from', '<p>Rotate the point $(\\cos A,\\sin A)$ through angle $B$. Its new horizontal coordinate is $\\cos A\\cos B-\\sin A\\sin B$, and its new vertical coordinate is $\\sin A\\cos B+\\cos A\\sin B$. A positive vertical component contributes leftward to the new horizontal coordinate, which gives the minus sign. Cosine does not decrease over every interval.</p>')}</div>
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
      <li>$\\sin\\frac{\\theta}{2} = \\pm\\sqrt{\\frac{1 - \\cos\\theta}{2}}$ (choose the sign from the quadrant of $\\theta/2$)</li>
      <li>$\\cos\\frac{\\theta}{2} = \\pm\\sqrt{\\frac{1 + \\cos\\theta}{2}}$</li>
    </ul><p>The square root gives a magnitude. For instance, if $\\theta=5\\pi/2$, then $\\theta/2=5\\pi/4$ is in quadrant III, so $\\sin(\\theta/2)$ and $\\cos(\\theta/2)$ are both negative. Inspect the half-angle itself before choosing a sign.</p></div>
    <div class="callout callout-key"><h4>Product-to-Sum & Sum-to-Product</h4>
    <ul>
      <li>$\\sin A \\cos B = \\frac{1}{2}[\\sin(A+B) + \\sin(A-B)]$</li>
      <li>$\\cos A \\cos B = \\frac{1}{2}[\\cos(A-B) + \\cos(A+B)]$</li>
      <li>$\\sin A + \\sin B = 2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}$</li>
    </ul></div>
    <div class="callout callout-key"><h4>Law of Sines & Law of Cosines</h4>
    <p><strong>Law of Sines:</strong> $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$ (for any triangle)</p>
    <p><strong>Law of Cosines:</strong> $c^2 = a^2 + b^2 - 2ab\\cos C$ (when $C = 90^\\circ$, $\\cos C = 0$, so $c^2 = a^2 + b^2$)</p>
    <p>Use cosines when you know SAS (two sides + included angle) or SSS (all three sides). Use sines when you know AAS or ASA.</p></div>
  
    <div class="callout callout-key"><h4>Find every solution in the requested interval</h4>
    <p>If $|c|\\le1$, set $\\alpha=\\arcsin c$ to solve $\\sin x=c$: $x=\\alpha+2k\\pi$ or $x=\\pi-\\alpha+2k\\pi$. To solve $\\cos x=c$, set $\\alpha=\\arccos c$: $x=\\pm\\alpha+2k\\pi$. To solve $\\tan x=c$, use $x=\\arctan c+k\\pi$. In each case $k\\in\\mathbb{Z}$. Sine and cosine have no real solutions when $|c|>1$.</p>
    <p>Keep only angles inside the requested interval and remove duplicates. At $c=1$ or $c=-1$, the two sine families coincide. A transformed argument also transforms the interval: if $0\\le x<2\\pi$, then $0\\le2x<4\\pi$.</p></div>
    <div class="callout callout-tip"><h4>Preserve solutions and domains</h4>
    <p>Factor an equation before dividing by a trig expression. Dividing by $\\sin x$ loses solutions with $\\sin x=0$. Squaring can add solutions, so check the original equation afterward. Cancellation simplifies a formula only on its original domain; it does not make an undefined input valid.</p>
    <p>To prove an identity, transform one side into the other or reduce both sides independently to the same expression. State any excluded angles first. Reversible algebra is also valid, but starting by assuming the desired equality without justifying each reversal can produce a circular proof.</p></div>
    ${WHY('Why are double-angle formulas useful?', '<p>They connect powers of a trig function to multiples of its angle. For example, $\\sin^2x=(1-\\cos2x)/2$ separates a constant from an oscillation. Over a full period, the cosine contribution averages to zero, so the mean squared sine is $1/2$.</p>')}
    ${WHY('Why does tan = sin/cos?', '<p>The unit-circle point has coordinates $(\\cos\\theta,\\sin\\theta)$. Its terminal ray has slope $y/x=\\sin\\theta/\\cos\\theta$ whenever $x\\ne0$. For an acute angle this equals the opposite-to-adjacent side ratio; the coordinate definition also covers other quadrants.</p>')}` },
  definition: { html: `<p><strong>Identity:</strong> An equation true for ALL values in its domain (not just specific solutions).</p><p><strong>Trig Equation:</strong> An equation involving trig functions of an unknown angle. May have infinitely many solutions due to periodicity.</p>` },
  examples: [{
    title: 'Solving a Trig Equation',
    problem: 'Solve $2\\sin^2\\theta - 1 = 0$ for $\\theta \\in [0, 2\\pi)$.',
    steps: [
      { title: 'Isolate $\\sin^2\\theta$', content: '$\\sin^2\\theta = \\frac{1}{2}$, so $\\sin\\theta = \\pm\\frac{1}{\\sqrt{2}} = \\pm\\frac{\\sqrt{2}}{2}$.', why: 'Take square root of both sides; include both $\\pm$.' },
      { title: 'Find all angles', content: '$\\sin\\theta = \\frac{\\sqrt{2}}{2}$: $\\theta = \\frac{\\pi}{4}, \\frac{3\\pi}{4}$. $\\sin\\theta = -\\frac{\\sqrt{2}}{2}$: $\\theta = \\frac{5\\pi}{4}, \\frac{7\\pi}{4}$.', why: 'Reference angle $\\frac{\\pi}{4}$. Positive in Q1 and Q2; negative in Q3 and Q4.' },
      { title: 'Solution set', content: '$\\theta \\in \\{\\frac{\\pi}{4}, \\frac{3\\pi}{4}, \\frac{5\\pi}{4}, \\frac{7\\pi}{4}\\}$.', why: 'Four solutions in $[0, 2\\pi)$.' }
    ]
  },
  {
    title: 'Factor without losing zero solutions',
    problem: 'Solve $2\\sin x\\cos x=\\sin x$ on $[0,2\\pi)$.',
    steps: [
      { title: 'Move the terms and factor', content: '$2\\sin x\\cos x-\\sin x=\\sin x(2\\cos x-1)=0$.', why: 'Dividing by $\\sin x$ would remove angles where it is zero.' },
      { title: 'Solve both factors', content: '$\\sin x=0$ gives $x=0,\\pi$. The other factor gives $\\cos x=1/2$, so $x=\\pi/3,5\\pi/3$.', why: 'A product is zero when at least one factor is zero.' },
      { title: 'Check the interval and equation', content: 'The solution set is $\\{0,\\pi/3,\\pi,5\\pi/3\\}$. Exclude $2\\pi$ because the interval is open at its right endpoint.', why: 'Each candidate satisfies the original equation. Counting $0$ and $2\\pi$ together would also count the same terminal point twice in one turn.' }
    ]
  },
  {
    title: 'Solve an equation with a faster angle',
    problem: 'Solve $\\sin(2x)=1/2$ on $[0,2\\pi)$.',
    steps: [
      { title: 'Transform the variable and its interval', content: 'Set $u=2x$. Then $u\\in[0,4\\pi)$, which covers two full sine cycles.', why: 'The function completes two cycles while $x$ completes one interval of length $2\\pi$.' },
      { title: 'Find all values of the argument', content: '$u=\\pi/6,5\\pi/6,13\\pi/6,17\\pi/6$.', why: 'The first cycle gives $\\pi/6$ and $5\\pi/6$. Add $2\\pi$ for the second cycle.' },
      { title: 'Return to the requested variable', content: '$x=\\pi/12,5\\pi/12,13\\pi/12,17\\pi/12$.', why: 'Divide each argument value by $2$. Reporting only the first two would miss half of the requested solutions.' }
    ]
  },
  {
    title: 'Simplify a formula while retaining its domain',
    problem: 'Simplify $F(x)=(1-\\cos^2x)/\\sin x$ and decide whether $F(0)$ exists.',
    steps: [
      { title: 'Record the restriction', content: '$\\sin x\\ne0$, so $x\\ne k\\pi$ for $k\\in\\mathbb{Z}$.', why: 'The denominator of the original expression determines its domain.' },
      { title: 'Use the Pythagorean identity', content: '$F(x)=\\sin^2x/\\sin x=\\sin x$ for $x\\ne k\\pi$.', why: 'Cancellation is valid on the recorded domain.' },
      { title: 'Distinguish the formula from an extension', content: '$F(0)$ is undefined, although $\\sin0=0$. The simplified expression agrees with $F$ only where $F$ was already defined.', why: 'A simpler formula can have a larger natural domain than the original function.' }
    ]
  },
  {
    title: 'Find an exact value from familiar angles',
    problem: 'Find $\\sin75^\\circ$ without rounding a calculator value.',
    steps: [
      { title: 'Split the angle', content: '$75^\\circ=45^\\circ+30^\\circ$.', why: 'Both smaller angles have known exact sine and cosine values.' },
      { title: 'Apply the sine sum formula', content: '$\\sin75^\\circ=\\sin45^\\circ\\cos30^\\circ+\\cos45^\\circ\\sin30^\\circ$.', why: 'Sine is not additive: $\\sin(A+B)$ is generally different from $\\sin A+\\sin B$.' },
      { title: 'Substitute and simplify', content: '$\\sin75^\\circ=(\\sqrt2/2)(\\sqrt3/2)+(\\sqrt2/2)(1/2)=(\\sqrt6+\\sqrt2)/4$.', why: 'Keep radicals exact; a decimal approximation is useful only for a final size check.' }
    ]
  }],
  flashCards: [
      { type: 'why', front: 'Why do trig identities matter?', back: 'They simplify complex expressions and solve equations. Convert between forms for integration and analysis.' },
      { type: 'how', front: 'How to prove a trig identity?', back: 'State the common domain. Transform one side into the other, or simplify both sides independently to the same expression. Justify division and cancellation by checking denominators.' },
      { type: 'define', front: 'Reciprocal trig functions?', back: 'sec = 1/cos, csc = 1/sin, cot = cos/sin. They exist because division by trig values is common in applications.' }
    ],
    exercises: [
    { difficulty: 'easy', question: '$1 + \\tan^2\\theta = $?', options: ['$\\csc^2\\theta$', '$\\sec^2\\theta$', '$\\cos^2\\theta$', '$\\sin^2\\theta$'], correctIndex: 1, hint: '<p>Pythagorean identity involving tangent.</p>', correctExplanation: 'Divide $\\sin^2\\theta + \\cos^2\\theta = 1$ by $\\cos^2\\theta$: $\\tan^2\\theta + 1 = \\sec^2\\theta$.', wrongExplanations: { 0: '$1 + \\cot^2\\theta = \\csc^2\\theta$, not $1 + \\tan^2\\theta$.', 2: '$\\cos^2\\theta \\lt 1$ for most angles, while $1 + \\tan^2\\theta \\geq 1$.', 3: 'This would require $\\tan^2\\theta = \\sin^2\\theta - 1$, which is generally false.' } },
    { difficulty: 'easy', question: '$\\sin(2\\theta) = $?', options: ['$2\\sin\\theta$', '$\\sin^2\\theta$', '$2\\sin\\theta\\cos\\theta$', '$\\sin\\theta + \\cos\\theta$'], correctIndex: 2, hint: '<p>Double angle formula for sine.</p>', correctExplanation: '$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$.', wrongExplanations: { 0: '$\\sin(2\\theta) \\neq 2\\sin\\theta$. The $2$ does not simply pull out.', 1: '$\\sin^2\\theta \\neq \\sin(2\\theta)$.', 3: 'Sum of sin and cos is unrelated to the double angle formula.' } },
    { difficulty: 'medium', question: 'For $\\cos\\theta\\ne0$, simplify $\\frac{\\sin\\theta}{\\cos\\theta} \\cdot \\cos\\theta$.', options: ['$\\tan\\theta$', '$\\sin\\theta$', '$1$', '$\\cos^2\\theta$'], correctIndex: 1, hint: '<p>Cancel the nonzero $\\cos\\theta$.</p>', correctExplanation: '$\\frac{\\sin\\theta}{\\cos\\theta} \\cdot \\cos\\theta = \\sin\\theta$ on the original domain $\\cos\\theta\\ne0$.', wrongExplanations: { 0: '$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$, but then multiplying by $\\cos\\theta$ gives $\\sin\\theta$.', 2: '$\\frac{\\sin\\theta}{\\cos\\theta} \\cdot \\cos\\theta = \\sin\\theta$, not 1 (that would require $\\frac{\\cos\\theta}{\\cos\\theta}$).', 3: 'No squaring occurs here.' } },
    { difficulty: 'medium', question: 'Solve: $\\cos\\theta = \\frac{1}{2}$ for $\\theta \\in [0, 2\\pi)$', options: ['$\\theta = \\frac{\\pi}{3}$', '$\\theta = \\frac{\\pi}{3}, \\frac{5\\pi}{3}$', '$\\theta = \\frac{\\pi}{6}, \\frac{11\\pi}{6}$', '$\\theta = \\frac{\\pi}{3}, \\frac{2\\pi}{3}$'], correctIndex: 1, hint: '<p>Cosine is positive in Q1 and Q4. Reference angle where $\\cos = 1/2$?</p>', correctExplanation: 'Reference angle: $\\frac{\\pi}{3}$ (since $\\cos\\frac{\\pi}{3} = \\frac{1}{2}$). Q1: $\\frac{\\pi}{3}$. Q4: $2\\pi - \\frac{\\pi}{3} = \\frac{5\\pi}{3}$.', wrongExplanations: { 0: 'Missing the Q4 solution. Cosine is positive in both Q1 and Q4.', 2: '$\\cos\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{2} \\neq \\frac{1}{2}$.', 3: '$\\frac{2\\pi}{3}$ is in Q2 where cosine is negative.' } },
    { difficulty: 'hard', question: '$\\cos(\\frac{\\pi}{12})$ using sum formula:', options: ['$\\frac{\\sqrt{6}+\\sqrt{2}}{4}$', '$\\frac{\\sqrt{6}-\\sqrt{2}}{4}$', '$\\frac{\\sqrt{3}+1}{4}$', '$\\frac{1}{2}$'], correctIndex: 0, hint: '<p>$\\frac{\\pi}{12} = \\frac{\\pi}{3} - \\frac{\\pi}{4}$. Use $\\cos(A-B)$.</p>', correctExplanation: '$\\cos(\\frac{\\pi}{3} - \\frac{\\pi}{4}) = \\cos\\frac{\\pi}{3}\\cos\\frac{\\pi}{4} + \\sin\\frac{\\pi}{3}\\sin\\frac{\\pi}{4} = \\frac{1}{2}\\cdot\\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{3}}{2}\\cdot\\frac{\\sqrt{2}}{2} = \\frac{\\sqrt{2}+\\sqrt{6}}{4}$.', wrongExplanations: { 1: 'The difference formula for cosine uses $+$ between the terms (the sign FLIPS for cosine).', 2: 'Missing the $\\sqrt{2}$ factors from $\\cos\\frac{\\pi}{4}$ and $\\sin\\frac{\\pi}{4}$.', 3: '$\\cos(\\frac{\\pi}{12}) \\neq \\frac{1}{2}$. That is $\\cos(\\frac{\\pi}{3})$.' } },
    { difficulty: 'hard', question: 'Which formula gives $\\frac{1-\\cos(2\\theta)}{2}=\\sin^2\\theta$ by a direct substitution without another identity?', options: ['$\\cos(2\\theta) = 2\\cos^2\\theta - 1$', '$\\cos(2\\theta) = 1 - 2\\sin^2\\theta$', '$\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta$', '$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$'], correctIndex: 1, hint: '<p>Choose the cosine form already written only in terms of sine.</p>', correctExplanation: '$\\cos(2\\theta) = 1 - 2\\sin^2\\theta$. Substitution gives $[1-(1-2\\sin^2\\theta)]/2=\\sin^2\\theta$.', wrongExplanations: { 0: 'This also proves the identity after using $1-\\cos^2\\theta=\\sin^2\\theta$, but it requires that additional identity.', 2: 'This form also works after a Pythagorean substitution; the question asks for one direct substitution.', 3: 'This formula describes $\\sin(2\\theta)$, whereas the expression contains $\\cos(2\\theta)$.' } }
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
    { difficulty: 'medium', question: 'Pythagorean identity: $\\sin^2 x + \\cos^2 x = 1$. What term is missing after $\\sin^2 x$?', accept: ['cos^2(x)', '\\cos^2 x', 'cos^2x'], placeholder: 'Term', explanation: '$\\sin^2 x + \\cos^2 x = 1$.' },
    { difficulty: 'medium', question: 'Power reduction: $\\cos^2(x) = \\frac{1 + \\cos(2x)}{2}$. What is the denominator?', accept: [2, '2'], placeholder: 'Number', explanation: 'Power reduction: $\\cos^2 x = \\frac{1 + \\cos(2x)}{2}$.' },
    { difficulty: 'easy', question: '$\\sin^2(x) + \\cos^2(x) =$?', accept: [1, '1'], placeholder: 'Number', explanation: 'Pythagorean identity: always 1.' },
    { difficulty: 'hard', question: '$\\tan^2 x + 1 =$?', accept: ['sec^2(x)', '\\sec^2 x'], placeholder: 'Identity', explanation: 'Divide Pythagorean identity by $\\cos^2 x$: $\\tan^2 x + 1 = \\sec^2 x$.' },
    { difficulty: 'medium', question: '$1 + \\cot^2 x =$?', accept: ['csc^2(x)', '\\csc^2 x'], placeholder: 'Identity', explanation: 'Divide Pythagorean identity by $\\sin^2 x$: $1 + \\cot^2 x = \\csc^2 x$.' },
    { difficulty: 'easy', question: '$\\cos(90°) =$?', accept: [0, '0'], placeholder: 'Number', explanation: '$\\cos(90°) = 0$.' },
    { difficulty: 'hard', question: 'Sum-to-product: $\\sin A + \\sin B = 2\\sin(\\frac{A+B}{2})\\cos(\\frac{A-B}{2})$. What denominator appears in each half-angle?', accept: [2, '2'], placeholder: 'Number', explanation: '$2\\sin(\\frac{A+B}{2})\\cos(\\frac{A-B}{2})$.' },
    { difficulty: 'medium', question: 'Double angle: $\\sin(2x) = 2\\sin(x)$ ?', accept: ['cos(x)', '\\cos x'], placeholder: 'Factor', explanation: '$\\sin(2x) = 2\\sin x \\cos x$.' },
    { difficulty: 'hard', question: '$\\cos(A + B) = \\cos A \\cos B - \\sin A$ ?', accept: ['sin B', '\\sin B'], placeholder: 'Term', explanation: 'Cosine sum: $\\cos A \\cos B - \\sin A \\sin B$.' },
    { difficulty: 'easy', question: '$\\cos(2\\pi) =$?', accept: [1, '1'], placeholder: 'Number', explanation: 'Full rotation: $\\cos(360°) = 1$.' },
    { difficulty: 'hard', question: 'For $\\cos x\\ne0$, is $\\frac{\\sin2x}{1+\\cos2x}=\\tan x$ true?', accept: ['yes', 'true'], placeholder: 'True?', explanation: '$\\frac{2\\sin x\\cos x}{2\\cos^2x}=\\frac{\\sin x}{\\cos x}=\\tan x$ on the stated domain.' },
    { difficulty: 'easy', question: '$\\sin(\\pi) =$?', accept: [0, '0'], placeholder: 'Number', explanation: '$\\sin(180°) = 0$.' },
    { difficulty: 'hard', question: 'Triple angle: $\\sin(3x) = 3\\sin x - 4\\sin^3 x$. True?', accept: ['yes', 'true'], placeholder: 'True?', explanation: '$\\sin(3x) = 3\\sin x - 4\\sin^3 x$. Verified via sum formulas.' },
    { difficulty: 'easy', question: '$\\tan(45°) =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\sin(45°)/\\cos(45°) = 1$.' },
    { difficulty: 'hard', question: 'Product-to-sum: $2\\cos A \\cos B = \\cos(A-B) + \\cos(A+B)$. What is the second angle in the final cosine term?', accept: ['B'], placeholder: 'Variable', explanation: '$2\\cos A \\cos B = \\cos(A-B) + \\cos(A+B)$.' },
    { difficulty: 'easy', question: 'Odd sine identity: $\\sin(-x) = -\\sin(x)$. What argument belongs in the final sine?', accept: ['x'], placeholder: 'Argument', explanation: 'Sine is odd: $\\sin(-x) = -\\sin(x)$.' },
    { difficulty: 'hard', question: 'Half-angle: $\\cos(x/2) = \\pm \\sqrt{\\frac{1 + \\cos x}{2}}$. What denominator appears under $1 + \\cos x$?', accept: [2, '2'], placeholder: 'Number', explanation: '$\\cos(x/2) = \\pm \\sqrt{\\frac{1+\\cos x}{2}}$.' },
    { difficulty: 'medium', question: 'Even cosine identity: $\\cos(-x) = \\cos(x)$. What argument belongs in the final cosine?', accept: ['x'], placeholder: 'Argument', explanation: 'Cosine is even: $\\cos(-x) = \\cos(x)$.' },
    { difficulty: 'hard', question: 'Solve $2\\sin(x) = 1$ on $[0, 2\\pi)$. Give radians.', accept: ['pi/6, 5pi/6'], placeholder: 'Angles in radians', explanation: '$\\sin x = 1/2$. $x = \\pi/6, 5\\pi/6$. The degree values are $30^\\circ$ and $150^\\circ$, which use a different unit.' },
    { difficulty: 'medium', question: 'Pythagorean identity: $1 + \\tan^2 x =$?', accept: ['sec^2(x)', '\\sec^2 x'], placeholder: 'Expression', explanation: '$1 + \\tan^2 x = \\sec^2 x$.' },
    { difficulty: 'hard', question: 'For $x\\in[-1,1]$, let $\\theta=\\arcsin x$. In $\\cos\\theta=\\sqrt{1-x^2}$, what term is subtracted from $1$?', accept: ['x^2', 'x2'], placeholder: 'Term', explanation: '$\\theta\\in[-\\pi/2,\\pi/2]$, so cosine is nonnegative and the positive square root applies.' },
    { difficulty: 'hard', question: 'Does $(1-\\cos^2x)/\\sin x$ have a value at $x=0$? Answer yes or no.', accept: ['no'], placeholder: 'yes or no', explanation: 'The original denominator is $\\sin0=0$. Simplifying to $\\sin x$ does not restore excluded inputs.' },
    { difficulty: 'hard', question: 'How many solutions does $\\sin(2x)=1/2$ have on $[0,2\\pi)$?', accept: [4, '4'], placeholder: 'Number', explanation: 'The argument $2x$ covers two sine periods. Each period gives two solutions, for four in total.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Solve: $2\\cos\\theta - 1 = 0$ on $[0, 2\\pi)$.', steps: [
      { content: 'Isolate: $\\cos\\theta = \\frac{1}{2}$.' },
      { content: 'Reference angle: $\\theta_r = \\frac{\\pi}{3}$ (since $\\cos\\frac{\\pi}{3} = \\frac{1}{2}$).' },
      { content: 'Cosine positive in Q1 and Q4.' },
      { content: 'Q1: $\\theta = \\frac{\\pi}{3}$. Q4: $\\theta = 2\\pi - \\frac{\\pi}{3} = \\frac{5\\pi}{3}$.' },
      { content: 'Solutions: $\\theta = \\frac{\\pi}{3}, \\frac{5\\pi}{3}$.' }
    ], explanation: 'Trig equations: isolate the trig function, find reference angle, apply ASTC.' },
    { difficulty: 'hard', question: 'Prove: $\\frac{\\sin x}{1 + \\cos x} = \\frac{1 - \\cos x}{\\sin x}$.', steps: [
      { content: 'Require $\\sin x\\ne0$ and $1+\\cos x\\ne0$. The common domain is $x\\ne k\\pi$, $k\\in\\mathbb{Z}$.' },
      { content: 'On that domain, cross-multiplication is reversible: $\\sin^2 x = (1 + \\cos x)(1 - \\cos x)$.' },
      { content: 'RHS: $1 - \\cos^2 x = \\sin^2 x$. Both sides equal. QED.' }
    ], explanation: 'Cross-multiplication proves the identity on the common domain because both denominators are nonzero.' },
    { difficulty: 'hard', question: 'Verify: $\\frac{\\sin(2\\theta)}{1 + \\cos(2\\theta)} = \\tan\\theta$.', steps: [
      { content: 'Require $\\cos\\theta\\ne0$, equivalently $\\theta\\ne\\pi/2+k\\pi$, $k\\in\\mathbb{Z}$.' },
      { content: 'Substitute double angle formulas: $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$.' },
      { content: '$\\cos(2\\theta) = 2\\cos^2\\theta - 1$.' },
      { content: '$1 + \\cos(2\\theta) = 1 + 2\\cos^2\\theta - 1 = 2\\cos^2\\theta$.' },
      { content: '$\\frac{2\\sin\\theta\\cos\\theta}{2\\cos^2\\theta} = \\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta$. QED.' }
    ], explanation: 'Transform the left side into the right side while retaining the common domain.' }
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
  stuckGuide: { html: `<div class="callout callout-tip"><h4> Trig Identity Strategy</h4>
    <ol><li><strong>Convert everything to sin and cos</strong> as a universal strategy.</li>
    <li><strong>Look for Pythagorean substitutions:</strong> $\\sin^2 = 1 - \\cos^2$ or $\\tan^2 = \\sec^2 - 1$.</li>
    <li><strong>For equations:</strong> Factor, use identities to get one trig function, then solve using the unit circle.</li></ol></div>` }
},

/* TOPIC 5.3: Law of Sines & Cosines */
{
  id: 'law-sines-cosines',
  title: 'Law of Sines & Law of Cosines',
  description: 'Solve triangles from sides and angles, check ambiguous cases, and apply the result to measurement and navigation.',
  prereqRecap: [
    { term: 'Right Triangle Trig', definition: 'SOH-CAH-TOA applies only to right triangles. For oblique triangles, we need new tools.' },
    { term: 'Triangle Area', definition: '$A = \\frac{1}{2}ab\\sin C$ from Topic 5.1.' },
    { term: 'Pythagorean Theorem', definition: '$a^2 + b^2 = c^2$ for right triangles only. The Law of Cosines generalizes this.' }
  ],
  whyExists: { html: `
    <p>The Law of Sines and Law of Cosines connect sides and angles without requiring a right angle. They can find the distance between two landmarks from measurements at one observation point, or combine two displacement vectors with a known angle between them. First draw the triangle and identify which side lies opposite each angle.</p>
    ${WHY('How does the Law of Cosines generalize Pythagoras?', '<p>In $c^2 = a^2 + b^2 - 2ab\\cos C$, if $C = 90°$, then $\\cos 90° = 0$, and the formula reduces to $c^2 = a^2 + b^2$. The $-2ab\\cos C$ term is a "correction" for non-right angles.</p>')}
  ` },
  concept: { html: `
    <div class="math-diagram">
      <svg viewBox="0 0 620 300" width="620" height="300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with side a opposite angle A, side b opposite angle B, and side c opposite angle C">
        <g font-family="Inter,sans-serif" font-size="16">
          <path d="M76 230L530 230L230 65Z" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" stroke-width="2.2"/>
          <g fill="#cbd5e1"><text x="57" y="252">A</text><text x="536" y="252">B</text><text x="225" y="46">C</text></g>
          <g fill="#f59e0b"><text x="382" y="137">a</text><text x="137" y="139">b</text><text x="297" y="252">c</text></g>
          <g stroke="#10b981" stroke-width="1.3" fill="none">
            <path d="M108 230A32 32 0 0 0 97.83 206.61"/>
            <path d="M498 230A32 32 0 0 1 501.96 214.57"/>
            <path d="M210.90 85.46A28 28 0 0 0 254.53 78.49"/>
          </g>
          <text x="94" y="286" fill="#94a3b8" font-size="13">Each lowercase side is opposite its matching uppercase angle.</text>
        </g>
      </svg>
    </div>
    <p class="math-diagram-label">Angle $C$ lies between sides $a$ and $b$ and opposite side $c$. The diagram establishes notation; it gives no numerical measurements.</p>
    <div class="callout callout-key"><h4>Law of Sines</h4>
    <p>$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$$</p>
    <p>Use when you have: <strong>AAS</strong> (two angles + non-included side), <strong>ASA</strong> (two angles + included side), or <strong>SSA</strong> (two sides + non-included angle, the ambiguous case).</p>
    ${WHY('Why does the Law of Sines work?', '<p>Let $K$ be the triangle area. Choosing each pair of sides as a base and sloping side gives $2K=bc\\sin A=ca\\sin B=ab\\sin C$. Divide by $abc$ to obtain $\\sin A/a=\\sin B/b=\\sin C/c$, then take reciprocals. This derivation covers acute and obtuse triangles; an obtuse triangle may require an altitude to an extended side.</p>')}</div>
    <div class="callout callout-key"><h4>Law of Cosines</h4>
    <p>$$c^2 = a^2 + b^2 - 2ab\\cos C$$</p>
    <p>Use when you have: <strong>SAS</strong> (two sides + included angle) or <strong>SSS</strong> (all three sides, to find angles).</p>
    ${WHY('Why the Law of Cosines works', '<p>Place $C$ at $(0,0)$, $B$ at $(a,0)$, and $A$ at $(b\\cos C,b\\sin C)$. The squared distance between $A$ and $B$ is $c^2=(a-b\\cos C)^2+(b\\sin C)^2$. Expand and use $\\sin^2C+\\cos^2C=1$ to obtain $c^2=a^2+b^2-2ab\\cos C$. The projection $b\\cos C$ becomes negative for an obtuse $C$, so the correction adds to $a^2+b^2$.</p>')}</div>
    <div class="callout callout-key"><h4>SSA can produce zero, one, or two triangles</h4>
    <p>Given $A$, its opposite side $a$, and another side $b$, compute $q=b\\sin A/a$. If $q>1$, no triangle exists. If $0<q\\le1$, find $B_1=\\arcsin q$ and consider $B_2=180^\\circ-B_1$. Keep a candidate only if $A+B<180^\\circ$. When $B_1=B_2=90^\\circ$, count it once.</p>
    <p>For an <strong>acute</strong> angle $A$, let $h=b\\sin A$: $a<h$ gives no triangle; $a=h$ gives one right triangle; $h<a<b$ gives two triangles; $a\\ge b$ gives one triangle. For a <strong>right or obtuse</strong> angle $A$, a triangle exists only when $a>b$, and that triangle is unique. At $a=b$ in this latter case, the remaining angle would be zero or negative.</p>
    <p>The second candidate matters because $\\sin B=\\sin(180^\\circ-B)$. A calculator returns the acute candidate, so it cannot decide triangle uniqueness by itself.</p></div>
    <div class="callout callout-key"><h4>When to Use Which Law</h4>
    <ul>
      <li><strong>AAS or ASA:</strong> Law of Sines (find the third angle first, then use ratios).</li>
      <li><strong>SAS:</strong> Law of Cosines (find the third side first).</li>
      <li><strong>SSS:</strong> Check that the two shorter sides sum to more than the longest side. Then use the Law of Cosines, preferably for the largest angle first.</li>
      <li><strong>SSA:</strong> Law of Sines (watch for ambiguous case).</li>
    </ul><p>For SSS, use $\\cos C=(a^2+b^2-c^2)/(2ab)$. Keep full precision until the final result. If the sides fail the strict triangle inequality, no nondegenerate triangle exists. For ASA or AAS, the two known angles must have a sum below $180^\\circ$.</p>
    <p>Verify the final result: all sides must be positive, all angles must lie strictly between $0^\\circ$ and $180^\\circ$, and the angle sum must be $180^\\circ$. The largest side must lie opposite the largest angle. Use the original measurements to check a side-angle ratio or the cosine law.</p></div>
  ` },
  definition: { html: `<p><strong>Oblique Triangle:</strong> A triangle with no right angle. Solved using the Law of Sines or Law of Cosines.</p>` },
  examples: [{
    title: 'SAS: Find the third side',
    problem: 'Triangle with $a = 8$, $b = 11$, $C = 37°$. Find $c$.',
    steps: [
      { title: 'Choose Law of Cosines (SAS)', content: '$c^2 = a^2 + b^2 - 2ab\\cos C = 64 + 121 - 2(8)(11)\\cos 37°$.', why: 'Two sides and the included angle: SAS case.' },
      { title: 'Compute', content: '$c^2 =185-176\\cos37^\\circ\\approx44.44015$.', why: 'Evaluate cosine in degree mode and retain full precision before taking the square root.' },
      { title: 'Result', content: '$c\\approx6.67$. The side lies between $|11-8|=3$ and $11+8=19$.', why: 'The strict triangle inequality checks that the computed side is compatible with the other two sides.' }
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
      { title: 'Result', content: '$d = \\sqrt{241.33} \\approx 15.54$ km from start.', why: 'The interior triangle angle is obtuse, so its opposite side is the longest. This calculation treats the legs as straight displacements in a plane.' }
    ]
  },
  {
    title: 'Solve both triangles in an ambiguous case',
    problem: 'Given $A=30^\\circ$, $a=10$, and $b=12$, find all possible angles and the third side.',
    steps: [
      { title: 'Find the sine of the unknown angle', content: '$\\sin B=b\\sin A/a=12(1/2)/10=0.6$.', why: 'The known angle must stay paired with its opposite side in the sine-law ratio.' },
      { title: 'Consider both angles', content: '$B_1\\approx36.87^\\circ$ and $B_2\\approx143.13^\\circ$. Both satisfy $A+B<180^\\circ$.', why: 'Supplementary angles have the same sine. Both candidate triangles pass the angle-sum test.' },
      { title: 'Finish the first triangle', content: '$C_1\\approx113.13^\\circ$ and $c_1=10\\sin C_1/\\sin30^\\circ\\approx18.39$.', why: 'Compute the remaining angle before applying the sine law to the third side.' },
      { title: 'Finish the second triangle', content: '$C_2\\approx6.87^\\circ$ and $c_2=10\\sin C_2/\\sin30^\\circ\\approx2.39$.', why: 'A small positive third angle gives a short positive opposite side. This second triangle is distinct from the first.' }
    ]
  },
  {
    title: 'Reject impossible measurements after taking an inverse',
    problem: 'Can a triangle have $A=120^\\circ$, $a=10$, and $b=10$?',
    steps: [
      { title: 'Compute the candidate angles', content: '$\\sin B=\\sin120^\\circ=\\sqrt3/2$, which gives $B=60^\\circ$ or $120^\\circ$.', why: 'A sine value inside $[-1,1]$ is necessary but does not guarantee a valid triangle.' },
      { title: 'Check the angle sums', content: '$120^\\circ+60^\\circ=180^\\circ$, leaving $C=0^\\circ$. The other candidate exceeds $180^\\circ$. Neither gives a triangle.', why: 'A nondegenerate triangle requires three strictly positive angles.' },
      { title: 'Use a second check', content: 'The obtuse angle must lie opposite a side longer than either other side. Here $a=b$, so the data fail that requirement.', why: 'Side-angle ordering can reject this case before calculation.' }
    ]
  },
  {
    title: 'Classify a triangle from side lengths',
    problem: 'A triangle has sides $7$, $8$, and $12$. Decide whether it is acute, right, or obtuse, and find its largest angle.',
    steps: [
      { title: 'Check that the triangle exists', content: '$7+8=15>12$. The two shorter sides exceed the longest, so the strict triangle inequality holds.', why: 'Angle classification applies only after confirming a nondegenerate triangle.' },
      { title: 'Compare squared lengths', content: '$12^2=144>7^2+8^2=113$, so the angle opposite $12$ is obtuse.', why: 'In $c^2=a^2+b^2-2ab\\cos C$, this inequality requires $\\cos C<0$.' },
      { title: 'Find the angle', content: '$\\cos C=(49+64-144)/(2\\cdot7\\cdot8)=-31/112$, so $C\\approx106.07^\\circ$.', why: 'The inverse cosine range includes obtuse angles and returns the unique interior angle.' },
      { title: 'Transfer the comparison', content: 'For the longest side $c$, $c^2<a^2+b^2$ means acute, equality means right, and $c^2>a^2+b^2$ means obtuse.', why: 'The largest angle determines whether the entire triangle is acute, right, or obtuse.' }
    ]
  }],
  exercises: [
    { difficulty: 'easy', question: 'In a triangle with $A = 30°$, $B = 70°$, what is angle $C$?', options: ['$80°$', '$100°$', '$60°$', '$90°$'], correctIndex: 0, hint: '<p>Angles sum to $180°$.</p>', correctExplanation: '$C = 180° - 30° - 70° = 80°$.', wrongExplanations: { 1: '$30 + 70 = 100$, not a triangle angle.', 2: '$180 - 100 = 80$, not 60.', 3: 'No reason to assume a right angle.' } },
    { difficulty: 'easy', question: 'Which law to use with SAS (two sides + included angle)?', options: ['Law of Sines', 'Law of Cosines', 'Pythagorean Theorem', 'None'], correctIndex: 1, hint: '<p>SAS requires the generalized Pythagorean theorem.</p>', correctExplanation: 'SAS: Law of Cosines.', wrongExplanations: { 0: 'Law of Sines needs an angle-opposite-side pair.', 2: 'Only for right triangles.', 3: 'SAS is solvable.' } },
    { difficulty: 'medium', question: 'Given $a = 7$, $b = 10$, $C = 60°$. Find $c$ (rounded):', options: ['$8.89$', '$7.55$', '$12.17$', '$6.08$'], correctIndex: 0, hint: '<p>$c^2 = 49 + 100 - 140\\cos 60°$.</p>', correctExplanation: '$c^2 = 149 - 140(0.5) = 149 - 70 = 79$. $c = \\sqrt{79} \\approx 8.89$.', wrongExplanations: { 1: 'Check: $140 \\cos 60° = 70$, so $149 - 70 = 79$.', 2: 'You may have added instead of subtracted.', 3: 'Recheck the computation.' } },
    { difficulty: 'hard', question: 'SSA: $a = 10$, $b = 12$, $A = 30°$. How many triangles are possible?', options: ['0', '1', '2', 'Infinite'], correctIndex: 2, hint: '<p>Check whether $a \\lt b$ and $a \\gt b\\sin A$.</p>', correctExplanation: '$b\\sin A = 12 \\sin 30° = 6$. Since $6 \\lt 10 \\lt 12$ ($b\\sin A \\lt a \\lt b$), two triangles exist.', wrongExplanations: { 0: '$a = 10 \\gt 6 = b\\sin A$, so at least one triangle exists.', 1: 'Since $a \\lt b$ and $a \\gt b\\sin A$, two triangles are possible.', 3: 'A triangle is determined by its sides and angles; at most 2.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'In triangle ABC, $A = 50°$, $B = 60°$. What is $C$?', accept: [70, '70'], placeholder: 'degrees', explanation: '$180 - 50 - 60 = 70°$.' },
    { difficulty: 'medium', question: 'Law of Cosines: $c^2 = 9 + 16 - 2(3)(4)\\cos 90° = $?', accept: [25, '25'], placeholder: 'Number', explanation: '$\\cos 90° = 0$. $c^2 = 25$. Reduces to Pythagorean theorem: $3^2 + 4^2 = 5^2$.' },
    { difficulty: 'medium', question: 'Using Law of Sines: $\\frac{a}{\\sin 30°} = \\frac{10}{\\sin 90°}$. Find $a$:', accept: [5, '5'], placeholder: 'Number', explanation: '$a = \\frac{10 \\sin 30°}{\\sin 90°} = \\frac{10(0.5)}{1} = 5$.' },
    { difficulty: 'hard', question: 'Triangle with all sides 6 (equilateral). What is each angle?', accept: [60, '60'], placeholder: 'degrees', explanation: 'Equilateral triangle: all angles = $60°$. Verify: $\\cos C = \\frac{36 + 36 - 36}{2(36)} = \\frac{36}{72} = 0.5$. $C = 60°$.' },
    { difficulty: 'hard', question: 'Triangle with $a = 5$, $b = 7$, $c = 10$. Is this triangle obtuse? (yes/no)', accept: ['yes', 'Yes'], placeholder: 'yes or no', explanation: '$c^2 = 100 > a^2 + b^2 = 74$. Since $c^2 > a^2 + b^2$, the triangle is obtuse.' },
    { difficulty: 'easy', question: 'In a right triangle, if opposite = 3 and hypotenuse = 5, then $\\sin \\theta =$?', accept: ['3/5', '0.6'], placeholder: 'Value', explanation: '$\\sin \\theta = \\text{opposite}/\\text{hypotenuse} = 3/5$.' },
    { difficulty: 'medium', question: 'Period of $\\sin(2x)$:', accept: ['pi', '3.14'], placeholder: 'Period', explanation: 'Period = $2\\pi / 2 = \\pi$.' },
    { difficulty: 'hard', question: 'Solve $\\cos(x) = 0$ for $x \\in [0, 2\\pi)$. Give radians.', accept: ['pi/2, 3pi/2'], placeholder: 'Solutions in radians', explanation: '$x = \\pi/2, 3\\pi/2$.' },
    { difficulty: 'medium', question: 'Law of cosines: $c^2 = a^2 + b^2 - 2ab\\cos C$. Which angle appears inside cosine?', accept: ['C', 'gamma', 'angle C'], placeholder: 'Angle', explanation: '$c^2 = a^2 + b^2 - 2ab\\cos C$.' },
    { difficulty: 'hard', question: 'Area of triangle using trig: $A = \\frac{1}{2}ab\\sin(C)$. If $a=5, b=8, C=30°$, area $=$?', accept: [10, '10'], placeholder: 'Area', explanation: '$A = \\frac{1}{2}(5)(8)\\sin(30°) = 20 \\times 0.5 = 10$.' },
    { difficulty: 'hard', question: 'In triangle: $a/\\sin A = b/\\sin B$. This is the law of:', accept: ['sines', 'law of sines'], placeholder: 'Name', explanation: 'Law of Sines: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$.' },
    { difficulty: 'easy', question: 'Inverse of $\\sin$:', accept: ['arcsin', 'sin^(-1)', 'asin'], placeholder: 'Function', explanation: '$\\arcsin$ or $\\sin^{-1}$.' },
    { difficulty: 'medium', question: 'In navigation, a bearing is measured from:', accept: ['north', 'due north'], placeholder: 'Direction', explanation: 'Bearings: measured clockwise from due north.' },
    { difficulty: 'easy', question: 'Period of $\\cos(x)$ in radians:', accept: ['2pi', '2\\pi'], placeholder: 'Radians', explanation: '$\\cos x$ repeats every $2\\pi$ radians, equivalent to $360^\\circ$ when using degrees.' },
    { difficulty: 'hard', question: 'Damped oscillation: $y = e^{-t}\\cos(t)$ approaches what as $t \\to \\infty$?', accept: [0, '0'], placeholder: 'Value', explanation: '$e^{-t} \\to 0$, so the oscillation decays to 0.' },
    { difficulty: 'easy', question: 'Tangent function is undefined when $\\cos(\\theta) =$?', accept: [0, '0'], placeholder: 'Value', explanation: '$\\tan = \\sin/\\cos$. Undefined when $\\cos = 0$.' },
    { difficulty: 'hard', question: 'Heron\'s formula: $A = \\sqrt{s(s-a)(s-b)(s-c)}$ where $s =$?', accept: ['(a+b+c)/2', 'semiperimeter'], placeholder: 'Formula', explanation: '$s = (a + b + c)/2$: the semi-perimeter.' },
    { difficulty: 'easy', question: 'Amplitude of $y = \\cos(x)$:', accept: [1, '1'], placeholder: 'Number', explanation: 'Amplitude = 1 (coefficient of $\\cos$).' },
    { difficulty: 'hard', question: 'Polar form of $1 + i$: $r =$?', accept: ['sqrt(2)', '1.414'], placeholder: 'Modulus', explanation: '$r = \\sqrt{1^2 + 1^2} = \\sqrt{2}$.' },
    { difficulty: 'easy', question: 'Secant = 1 / ?', accept: ['cos', 'cos(x)', 'cosine'], placeholder: 'Function', explanation: '$\\sec x = 1/\\cos x$.' },
    { difficulty: 'hard', question: 'Complex number $re^{i\\theta}$: modulus is $r$, argument is:', accept: ['theta', '\\theta'], placeholder: 'What?', explanation: 'Euler form: $re^{i\\theta}$. $r$ = modulus, $\\theta$ = argument.' },
    { difficulty: 'easy', question: 'For uniform rotation through $\\theta$ radians in time $t$, angular speed is $\\omega=\\theta/$ what?', accept: ['t', 'time'], placeholder: 'Variable', explanation: 'For a nonnegative angle traveled, $\\omega=\\theta/t$ has units of radians per unit time.' },
    { difficulty: 'hard', question: 'For real $\\omega$ and real $s>0$, is $\\mathcal{L}\\{\\sin(\\omega t)\\}=\\frac{\\omega}{s^2+\\omega^2}$?', accept: ['yes', 'true'], placeholder: 'True?', explanation: 'Yes. The assumption $s>0$ ensures convergence of the defining integral from $t=0$ to infinity.' },
    { difficulty: 'easy', question: 'Period of $\\tan(x)$ in radians:', accept: ['pi', '\\pi'], placeholder: 'Radians', explanation: '$\\tan x$ repeats every $\\pi$ radians, equivalent to $180^\\circ$ when using degrees.' },
    { difficulty: 'hard', question: 'A Fourier series uses which functions at integer multiples of a fundamental frequency?', accept: ['sines and cosines', 'sin and cos'], placeholder: 'Functions', explanation: 'A real Fourier series uses a constant plus terms $a_n\\cos(n\\omega_0t)+b_n\\sin(n\\omega_0t)$, where $\\omega_0$ is the fundamental angular frequency. Convergence depends on the signal and the meaning of convergence.' },
    { difficulty: 'medium', question: 'Vertical shift of $y = \\sin(x) + 3$: midline is $y =$?', accept: [3, '3'], placeholder: 'Number', explanation: 'Midline: $y = 3$.' },
    { difficulty: 'hard', question: 'Simple harmonic motion: $x(t) = A\\cos(\\omega t + \\phi)$. What is $\\omega$ called?', accept: ['angular frequency'], placeholder: 'Name', explanation: '$\\omega = 2\\pi f$ is angular frequency. It measures the rate of change of oscillation phase.' },
    { difficulty: 'medium', question: 'Phase shift of $y = \\sin(x - \\pi/4)$: shift right by how many radians?', accept: ['pi/4', '\\pi/4'], placeholder: 'Radians', explanation: '$y = \\sin(x - c)$ shifts right by $c$. Here $c=\\pi/4$ radians.' },
    { difficulty: 'hard', question: 'Bessel functions can arise in wave problems with _____ symmetry.', accept: ['cylindrical', 'circular'], placeholder: 'Symmetry', explanation: 'Separating a wave equation in cylindrical coordinates can lead to a Bessel equation for the radial part.' },
    { difficulty: 'hard', question: 'How many triangles satisfy $A=120^\\circ$, $a=10$, and $b=10$?', accept: [0, '0', 'none'], placeholder: 'Number of triangles', explanation: 'The candidate angles $B=60^\\circ$ and $120^\\circ$ leave no positive third angle. An obtuse known angle requires $a>b$.' },
    { difficulty: 'medium', question: 'Can lengths $4$, $7$, and $11$ form a nondegenerate triangle? Answer yes or no.', accept: ['no'], placeholder: 'yes or no', explanation: '$4+7=11$. The strict triangle inequality requires a sum greater than the longest side; equality produces a straight segment.' }
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
      { question: 'Using Law of Cosines, find the largest angle (opposite 120m side). Round to one decimal place:', accept: ['82.8'], placeholder: 'degrees to one decimal', explanation: '$\\cos C = \\frac{80^2+100^2-120^2}{2(80)(100)} = \\frac{6400+10000-14400}{16000} = \\frac{2000}{16000} = 0.125$. $C \\approx 82.8°$.' },
      { question: 'Find angle $A$ (opposite 80m). Round to one decimal place:', accept: ['41.4'], placeholder: 'degrees to one decimal', explanation: '$\\cos A = \\frac{100^2+120^2-80^2}{2(100)(120)} = \\frac{10000+14400-6400}{24000} = \\frac{18000}{24000} = 0.75$. $A \\approx 41.4°$.' },
      { question: 'Find angle $B$. Round to one decimal place:', accept: ['55.8'], placeholder: 'degrees to one decimal', explanation: '$B = 180^\\circ-A-C\\approx55.8^\\circ$. Retain the unrounded inverse-cosine values when calculating $B$.' }
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
  stuckGuide: { html: `<div class="callout callout-tip"><h4>Triangle Solving Strategy</h4>
    <ol><li><strong>Identify what you have:</strong> SAS, AAS/ASA, SSS, or SSA.</li>
    <li><strong>SAS or SSS:</strong> Start with Law of Cosines.</li>
    <li><strong>AAS/ASA:</strong> Find third angle, then Law of Sines.</li>
    <li><strong>SSA:</strong> Law of Sines, but check for 0, 1, or 2 triangles.</li>
    <li><strong>Always verify:</strong> Angles must sum to $180\u00b0$. Largest side opposite largest angle.</li></ol></div>` }
}

] // end topics array
}); // end module push
})();
