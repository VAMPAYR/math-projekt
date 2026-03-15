/* ============================================================
   MODULE 8: Calculus 3 : Multivariable Calculus (3 topics)
   Source: Thomas' Calculus Chapters 12-16
   ============================================================ */
(function() {
if (!window.MATH_MODULES) window.MATH_MODULES = [];
const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

window.MATH_MODULES.push({
id: 'calculus3',
order: 13,
title: 'Calculus 3B: Multivariable Calculus',
description: 'Partial derivatives, multiple integrals, and functions of several variables. Calculus in higher dimensions. Requires: integration (Module 10) and vectors (Module 12).',
topics: [

/* TOPIC 8.1: Vectors & Geometry in Space */
{
  id: 'vectors-space',
  title: 'Vectors, Dot Product & Cross Product',
  description: 'Vectors represent quantities with magnitude and direction: forces, velocities, displacements. Operations on vectors extend algebra to multiple dimensions.',
  prereqRecap: [
    { term: 'Coordinate Plane', definition: 'Points $(x,y)$ in 2D. Extended to $(x,y,z)$ in 3D.' },
    { term: 'Pythagorean Theorem', definition: 'In a right triangle: $a^2 + b^2 = c^2$. In 3D: $|\\mathbf{v}| = \\sqrt{x^2+y^2+z^2}$.' },
    { term: 'Trigonometry', definition: '$\\cos\\theta$ relates adjacent side to hypotenuse (Module 5).' }
  ],
  whyExists: { html: `
    <p><strong>Why vectors?</strong> Scalars (single numbers) describe "how much." Vectors describe "how much AND in what direction." Force, velocity, electric fields, gradients: all are vectors. Physics and engineering are fundamentally vector-based.</p>
    ${WHY('Why two products?', '<p>The <strong>dot product</strong> $\\mathbf{a} \\cdot \\mathbf{b} = |\\mathbf{a}||\\mathbf{b}|\\cos\\theta$ measures how parallel two vectors are (projection). The <strong>cross product</strong> $\\mathbf{a} \\times \\mathbf{b}$ produces a vector perpendicular to both, with magnitude $|\\mathbf{a}||\\mathbf{b}|\\sin\\theta$ (area of parallelogram). These serve different geometric purposes.</p>')}
  ` },
  concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 350 280" width="350" height="280" xmlns="http://www.w3.org/2000/svg">
  <line x1="175" y1="250" x2="175" y2="30" stroke="#94a3b8" stroke-width="1.5"/>
  <polygon points="175,30 170,40 180,40" fill="#94a3b8"/>
  <text x="182" y="28" fill="#94a3b8" font-size="12" font-family="Inter,sans-serif">z</text>
  <line x1="175" y1="180" x2="320" y2="230" stroke="#94a3b8" stroke-width="1.5"/>
  <polygon points="320,230 310,225 312,233" fill="#94a3b8"/>
  <text x="325" y="235" fill="#94a3b8" font-size="12" font-family="Inter,sans-serif">x</text>
  <line x1="175" y1="180" x2="40" y2="230" stroke="#94a3b8" stroke-width="1.5"/>
  <polygon points="40,230 50,225 48,233" fill="#94a3b8"/>
  <text x="28" y="235" fill="#94a3b8" font-size="12" font-family="Inter,sans-serif">y</text>
  <line x1="175" y1="180" x2="260" y2="120" stroke="#3b82f6" stroke-width="2.5"/>
  <polygon points="260,120 250,126 254,132" fill="#3b82f6"/>
  <line x1="260" y1="120" x2="260" y2="205" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="175" y1="205" x2="260" y2="205" stroke="#10b981" stroke-width="1" stroke-dasharray="3,3"/>
  <circle cx="260" cy="120" r="4" fill="#f59e0b"/>
  <text x="268" y="115" fill="#f59e0b" font-size="11" font-family="Inter,sans-serif">(x, y, z)</text>
  <text x="175" y="17" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">3D coordinate system</text>
</svg>
</div>
<p class="math-diagram-label">3D space: x, y, z axes with a point located by projecting onto each axis</p>

    <div class="callout callout-key"><h4>Vector Operations</h4>
    <p>$\\mathbf{v} = \\langle v_1, v_2, v_3 \\rangle$. Magnitude: $|\\mathbf{v}| = \\sqrt{v_1^2 + v_2^2 + v_3^2}$.</p>
    <ul>
      <li><strong>Addition:</strong> $\\mathbf{u} + \\mathbf{v} = \\langle u_1+v_1, u_2+v_2, u_3+v_3 \\rangle$</li>
      <li><strong>Scalar Multiplication:</strong> $c\\mathbf{v} = \\langle cv_1, cv_2, cv_3 \\rangle$</li>
      <li><strong>Dot Product:</strong> $\\mathbf{u} \\cdot \\mathbf{v} = u_1v_1 + u_2v_2 + u_3v_3 = |\\mathbf{u}||\\mathbf{v}|\\cos\\theta$</li>
      <li><strong>Cross Product:</strong> $\\mathbf{u} \\times \\mathbf{v} = \\langle u_2v_3-u_3v_2, u_3v_1-u_1v_3, u_1v_2-u_2v_1 \\rangle$</li>
    </ul></div>
    <div class="callout callout-key"><h4>Key Properties</h4>
    <ul>
      <li>$\\mathbf{u} \\cdot \\mathbf{v} = 0 \\iff \\mathbf{u} \\perp \\mathbf{v}$ (perpendicular/orthogonal)</li>
      <li>$\\mathbf{u} \\times \\mathbf{v} = \\mathbf{0} \\iff \\mathbf{u} \\parallel \\mathbf{v}$ (parallel)</li>
      <li>$|\\mathbf{u} \\times \\mathbf{v}|$ = area of parallelogram formed by $\\mathbf{u}$ and $\\mathbf{v}$</li>
      <li><strong>Projection:</strong> $\\text{proj}_{\\mathbf{a}} \\mathbf{b} = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{|\\mathbf{a}|^2} \\mathbf{a}$</li>
    </ul></div>
    <div class="callout callout-key"><h4>Lines in 3D</h4>
    <p>A line through point $P_0 = (x_0, y_0, z_0)$ in direction $\\mathbf{v} = \\langle a, b, c \\rangle$:</p>
    <p><strong>Parametric:</strong> $x = x_0 + at,\\ y = y_0 + bt,\\ z = z_0 + ct$</p>
    <p><strong>Vector:</strong> $\\mathbf{r}(t) = \\mathbf{r}_0 + t\\mathbf{v}$</p></div>
    <div class="callout callout-key"><h4>Planes in 3D</h4>
    <p>A plane through $(x_0, y_0, z_0)$ with normal vector $\\mathbf{n} = \\langle a, b, c \\rangle$:</p>
    <p>$$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$$</p>
    <p>Standard form: $ax + by + cz = d$. The normal vector $\\mathbf{n}$ is perpendicular to the plane.</p>
    <p>Distance from point $(x_1,y_1,z_1)$ to plane $ax+by+cz=d$: $\\frac{|ax_1+by_1+cz_1-d|}{\\sqrt{a^2+b^2+c^2}}$</p></div>
  ` },
  definition: { html: `<p><strong>Vector:</strong> An object with magnitude and direction in $\\mathbb{R}^n$.</p><p><strong>Unit Vector:</strong> $\\hat{\\mathbf{v}} = \\frac{\\mathbf{v}}{|\\mathbf{v}|}$, magnitude 1.</p>` },
  examples: [{
    title: 'Dot and Cross Products',
    problem: 'For $\\mathbf{u} = \\langle 1, 2, 3 \\rangle$ and $\\mathbf{v} = \\langle 4, -1, 2 \\rangle$, find $\\mathbf{u} \\cdot \\mathbf{v}$ and $\\mathbf{u} \\times \\mathbf{v}$.',
    steps: [
      { title: 'Dot product', content: '$1(4) + 2(-1) + 3(2) = 4 - 2 + 6 = 8$.', why: 'Multiply corresponding components and sum.' },
      { title: 'Cross product', content: '$\\langle 2(2)-3(-1), 3(4)-1(2), 1(-1)-2(4) \\rangle = \\langle 7, 10, -9 \\rangle$.', why: 'Use the determinant formula or component formula.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a plane in 3D?', back: 'A flat surface defined by a point and a normal vector: n . (r - r_0) = 0, or ax + by + cz = d. The normal vector <a,b,c> is perpendicular to the plane.' },
      { type: 'how', front: 'How to find the equation of a plane?', back: 'Need: a point on the plane and a normal vector. If point is (x_0,y_0,z_0) and normal is <a,b,c>: a(x-x_0)+b(y-y_0)+c(z-z_0)=0.' },
      { type: 'why', front: 'Why are planes important in multivariate calculus?', back: 'The tangent plane is the 3D analog of the tangent line. It is the best linear approximation to a surface at a point. The gradient vector is normal to level surfaces.' }
    ],
    exercises: [
    { difficulty: 'easy', question: '$|\\langle 3, 4 \\rangle| = $?', options: ['$7$', '$5$', '$25$', '$1$'], correctIndex: 1, hint: '<p>$|\\mathbf{v}| = \\sqrt{v_1^2 + v_2^2}$.</p>', correctExplanation: '$\\sqrt{9 + 16} = \\sqrt{25} = 5$.', wrongExplanations: { 0: '$3 + 4 = 7$ is the sum, not the magnitude.', 2: '$25 = 5^2$. Take the square root.', 3: 'That would be a unit vector, but this vector is not unit.' } },
    { difficulty: 'easy', question: '$\\langle 1, 0, 0 \\rangle \\cdot \\langle 0, 1, 0 \\rangle = $?', options: ['$1$', '$0$', '$-1$', '$\\langle 0,0,1 \\rangle$'], correctIndex: 1, hint: '<p>These are perpendicular standard basis vectors.</p>', correctExplanation: '$1(0) + 0(1) + 0(0) = 0$. Perpendicular vectors have dot product 0.', wrongExplanations: { 0: 'These vectors are perpendicular, so their dot product is 0, not 1.', 2: 'Zero, not $-1$. They are orthogonal but not anti-parallel.', 3: 'That is the cross product $\\mathbf{i} \\times \\mathbf{j} = \\mathbf{k}$, not the dot product.' } },
    { difficulty: 'medium', question: 'The angle between $\\langle 1,1 \\rangle$ and $\\langle 1,0 \\rangle$ is:', options: ['$0°$', '$30°$', '$45°$', '$90°$'], correctIndex: 2, hint: '<p>$\\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{|\\mathbf{u}||\\mathbf{v}|}$.</p>', correctExplanation: '$\\cos\\theta = \\frac{1}{\\sqrt{2} \\cdot 1} = \\frac{1}{\\sqrt{2}}$. $\\theta = 45°$.', wrongExplanations: { 0: 'The vectors point in different directions, not the same.', 1: '$\\cos 30° = \\sqrt{3}/2 \\neq 1/\\sqrt{2}$.', 3: '$\\cos 90° = 0$, but the dot product is 1, not 0.' } },
    { difficulty: 'medium', question: '$\\langle 1,0,0 \\rangle \\times \\langle 0,1,0 \\rangle = $?', options: ['$\\langle 0,0,1 \\rangle$', '$\\langle 0,0,-1 \\rangle$', '$\\langle 1,1,0 \\rangle$', '$0$'], correctIndex: 0, hint: '<p>$\\mathbf{i} \\times \\mathbf{j} = \\mathbf{k}$.</p>', correctExplanation: '$\\langle 0\\cdot0-0\\cdot1, 0\\cdot0-1\\cdot0, 1\\cdot1-0\\cdot0 \\rangle = \\langle 0,0,1 \\rangle$.', wrongExplanations: { 1: 'Right-hand rule: $\\mathbf{i} \\times \\mathbf{j} = +\\mathbf{k}$, not $-\\mathbf{k}$.', 2: 'Cross product is perpendicular to both inputs. $\\langle 1,1,0 \\rangle$ is not.', 3: 'Cross product of non-parallel vectors is nonzero.' } },
    { difficulty: 'hard', question: 'Area of the parallelogram formed by $\\langle 2,0,0 \\rangle$ and $\\langle 0,3,0 \\rangle$:', options: ['$5$', '$6$', '$\\sqrt{13}$', '$0$'], correctIndex: 1, hint: '<p>Area = $|\\mathbf{u} \\times \\mathbf{v}|$.</p>', correctExplanation: '$\\langle 2,0,0 \\rangle \\times \\langle 0,3,0 \\rangle = \\langle 0,0,6 \\rangle$. $|\\langle 0,0,6 \\rangle| = 6$.', wrongExplanations: { 0: '$2 + 3 = 5$ is not the area formula.', 2: 'The cross product gives $\\langle 0,0,6 \\rangle$, magnitude 6, not $\\sqrt{13}$.', 3: 'Non-parallel vectors form a nonzero parallelogram.' } },
    { difficulty: 'hard', question: 'Project $\\mathbf{b} = \\langle 3,4 \\rangle$ onto $\\mathbf{a} = \\langle 1,0 \\rangle$:', options: ['$\\langle 3,0 \\rangle$', '$\\langle 0,4 \\rangle$', '$\\langle 3,4 \\rangle$', '$\\langle 4,0 \\rangle$'], correctIndex: 0, hint: '<p>$\\text{proj}_{\\mathbf{a}} \\mathbf{b} = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{|\\mathbf{a}|^2} \\mathbf{a}$.</p>', correctExplanation: '$\\frac{3(1)+4(0)}{1} \\langle 1,0 \\rangle = 3\\langle 1,0 \\rangle = \\langle 3,0 \\rangle$.', wrongExplanations: { 1: '$\\langle 0,4 \\rangle$ is the component perpendicular to $\\mathbf{a}$, not the projection.', 2: 'The projection cannot equal $\\mathbf{b}$ unless $\\mathbf{b}$ is parallel to $\\mathbf{a}$.', 3: 'The dot product is 3, not 4.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: '$|\\langle 0, 3, 4 \\rangle| =$?', accept: [5, '5'], placeholder: 'Enter a number', explanation: '$\\sqrt{0+9+16} = 5$.' },
    { difficulty: 'easy', question: '$\\langle 1,2 \\rangle + \\langle 3,4 \\rangle =$?', accept: ['<4,6>', '(4,6)', '4,6'], placeholder: '<a,b>', explanation: 'Component-wise: $\\langle 4, 6 \\rangle$.' },
    { difficulty: 'medium', question: '$\\langle 1,2,3 \\rangle \\cdot \\langle 4,5,6 \\rangle =$?', accept: [32, '32'], placeholder: 'Enter a number', explanation: '$4+10+18 = 32$.' },
    { difficulty: 'medium', question: 'Find the unit vector in the direction of $\\langle 3, 4 \\rangle$:', accept: ['<3/5,4/5>', '(3/5,4/5)', '<0.6,0.8>'], placeholder: '<a,b>', explanation: '$|\\langle 3,4 \\rangle| = 5$. Unit: $\\langle 3/5, 4/5 \\rangle$.' },
    { difficulty: 'hard', question: 'Two vectors have dot product 0. Are they parallel or perpendicular?', accept: ['perpendicular', 'orthogonal'], placeholder: 'parallel or perpendicular', explanation: '$\\mathbf{u} \\cdot \\mathbf{v} = 0 \\iff$ perpendicular.' },
    { difficulty: 'hard', question: 'The angle between $\\langle 1,0 \\rangle$ and $\\langle 0,1 \\rangle$ in degrees:', accept: [90, '90'], placeholder: 'degrees', explanation: '$\\cos\\theta = 0 \\Rightarrow \\theta = 90\u00b0$.' },
    { difficulty: 'easy', question: '$\\nabla(x^2 + y^2) =$?', accept: ['<2x,2y>', '(2x,2y)'], placeholder: 'Vector', explanation: 'Gradient: $\\langle \\frac{\\partial}{\\partial x}, \\frac{\\partial}{\\partial y} \\rangle = \\langle 2x, 2y \\rangle$.' },
    { difficulty: 'medium', question: 'Divergence of $\\vec{F} = \\langle x^2, y^2 \\rangle$:', accept: ['2x+2y', '2x + 2y'], placeholder: 'Expression', explanation: '$\\nabla \\cdot \\vec{F} = 2x + 2y$.' },
    { difficulty: 'easy', question: 'Curl of $\\vec{F} = \\langle y, -x, 0 \\rangle$: $z$-component is:', accept: ['-2', -2], placeholder: 'Number', explanation: '$\\text{curl}\ z = \\frac{\\partial(-x)}{\\partial x} - \\frac{\\partial y}{\\partial y} = -1 - 1 = -2$.' },
    { difficulty: 'medium', question: 'A vector field with zero curl everywhere is called:', accept: ['irrotational', 'conservative'], placeholder: 'Term', explanation: 'Zero curl: irrotational (conservative in simply connected domains).' },
    { difficulty: 'medium', question: 'For $\\vec{F} = \\langle x, y \\rangle$: is this conservative?', accept: ['yes'], placeholder: 'yes/no', explanation: '$\\vec{F} = \\nabla(\\frac{x^2+y^2}{2})$. Potential function exists. Conservative.' },
    { difficulty: 'hard', question: 'Potential function for $\\vec{F} = \\langle 2x, 3y^2 \\rangle$:', accept: ['x^2+y^3', 'x^2 + y^3'], placeholder: 'Function', explanation: '$\\int 2x\\,dx = x^2$. $\\int 3y^2\\,dy = y^3$. $\\phi = x^2 + y^3$.' },
    { difficulty: 'hard', question: 'Flux of $\\vec{F} = \\langle x,y,z \\rangle$ through unit sphere:', accept: ['4pi', '12.57'], placeholder: 'Number', explanation: 'Divergence theorem: $\\nabla \\cdot \\vec{F} = 3$. $\\iiint 3\\,dV = 3 \\cdot \\frac{4\\pi}{3} = 4\\pi$.' },
    { difficulty: 'easy', question: 'The gradient always points in the direction of:', accept: ['steepest ascent', 'greatest increase', 'maximum increase'], placeholder: 'Direction', explanation: 'Gradient points in the direction of steepest ascent of the scalar field.' },
    { difficulty: 'medium', question: 'A field $\\vec{F}$ with $\\nabla \\cdot \\vec{F} = 0$ everywhere is called:', accept: ['solenoidal', 'incompressible', 'divergence-free'], placeholder: 'Term', explanation: 'Zero divergence everywhere: solenoidal (incompressible).' },
    { difficulty: 'hard', question: 'For $\\vec{F} = \\nabla \\phi$, what is $\\nabla \\times \\vec{F}$?', accept: ['0', 'zero', '<0,0,0>'], placeholder: 'Value', explanation: 'Curl of a gradient is always zero: $\\nabla \\times (\\nabla \\phi) = \\vec{0}$.' },
    { difficulty: 'easy', question: 'Divergence of $\\vec{F} = \\langle x, y \\rangle$ in 2D:', accept: [2, '2'], placeholder: 'Number', explanation: '$\\nabla \\cdot \\vec{F} = 1 + 1 = 2$.' },
    { difficulty: 'easy', question: 'A vector field assigns a {{}} to each point in space:', accept: ['vector'], placeholder: 'What?', explanation: 'Vector field: each point gets a vector.' },
    { difficulty: 'medium', question: 'Gradient of $f = xyz$:', accept: ['<yz, xz, xy>'], placeholder: 'Vector', explanation: '$\\nabla f = \\langle yz, xz, xy \\rangle$.' },
    { difficulty: 'easy', question: 'A scalar field assigns a _____ to each point:', accept: ['number', 'scalar'], placeholder: 'What?', explanation: 'Scalar field: $f: \\mathbb{R}^n \\to \\mathbb{R}$. Each point gets a number.' },
    { difficulty: 'hard', question: 'Maxwell\'s equations use which vector calculus operators?', accept: ['curl and divergence', 'div and curl'], placeholder: 'Operators', explanation: 'Maxwell: $\\nabla \\cdot \\vec{E}, \\nabla \\times \\vec{E}, \\nabla \\cdot \\vec{B}, \\nabla \\times \\vec{B}$.' },
    { difficulty: 'medium', question: 'Flow rate through surface = $\\iint \\vec{F} \\cdot \\hat{n}\\,dS$. This is called:', accept: ['flux', 'flux integral'], placeholder: 'Name', explanation: 'Flux: total flow through a surface.' },
    { difficulty: 'easy', question: 'Divergence of $\\vec{F} = \\langle x^2, y^2, z^2 \\rangle$:', accept: ['2x+2y+2z', '2(x+y+z)'], placeholder: 'Expression', explanation: '$2x + 2y + 2z$.' },
    { difficulty: 'hard', question: 'For $\\vec{F} = \\langle -y, x, 0 \\rangle$: $|\\nabla \\times \\vec{F}| =$?', accept: [2, '2'], placeholder: 'Number', explanation: 'Curl = $\\langle 0, 0, 2 \\rangle$. $|\\text{curl}| = 2$.' },
    { difficulty: 'medium', question: 'Gradient of $f = x^2 + y^2 + z^2$:', accept: ['<2x, 2y, 2z>', '<2x,2y,2z>'], placeholder: 'Vector', explanation: '$\\nabla f = \\langle 2x, 2y, 2z \\rangle$.' },
    { difficulty: 'hard', question: '$\\nabla \\times \\langle 0, 0, xy \\rangle = \\langle x, -y, 0 \\rangle$. True?', accept: ['yes', 'true'], placeholder: 'True/false', explanation: 'Compute: $\\langle \\partial(xy)/\\partial y - 0, 0 - \\partial(xy)/\\partial x, 0 \\rangle = \\langle x, -y, 0 \\rangle$.' },
    { difficulty: 'easy', question: '$\\nabla f$ for $f = 3x + 2y + z$:', accept: ['<3,2,1>', '<3, 2, 1>'], placeholder: 'Vector', explanation: '$\\nabla f = \\langle 3, 2, 1 \\rangle$.' },
    { difficulty: 'hard', question: 'Laplacian: $\\nabla^2 f = f_{xx} + f_{yy} + f_{zz}$. For $f = x^2 + y^2 + z^2$:', accept: [6, '6'], placeholder: 'Number', explanation: '$2 + 2 + 2 = 6$.' },
    { difficulty: 'easy', question: 'Curl measures:', accept: ['rotation', 'spinning', 'circulation density'], placeholder: 'What?', explanation: 'Curl: infinitesimal rotation at each point.' },
    { difficulty: 'hard', question: '$\\nabla \\cdot (\\nabla \\times \\vec{F}) =$? (always)', accept: [0, '0', 'zero'], placeholder: 'Value', explanation: 'Divergence of curl is always zero: $\\nabla \\cdot (\\nabla \\times \\vec{F}) = 0$.' },
    { difficulty: 'easy', question: 'Divergence of constant vector field:', accept: [0, '0', 'zero'], placeholder: 'Value', explanation: 'Constant field: all partial derivatives are zero. Divergence = 0.' },
    { difficulty: 'hard', question: 'Irrotational: $\\nabla \\times \\vec{F} = \\vec{0}$. Implies $\\vec{F}$ is:', accept: ['conservative', 'gradient field'], placeholder: 'Property', explanation: 'Curl-free (irrotational) in simply connected domain implies conservative.' },
    { difficulty: 'easy', question: 'Conservative vector field: $\\vec{F} = \\nabla \\phi$. $\\phi$ is the:', accept: ['potential function', 'scalar potential'], placeholder: 'Name', explanation: '$\\phi$: scalar potential function.' },
    { difficulty: 'hard', question: '$\\nabla \\times (\\nabla \\phi) = $ ? (always)', accept: ['0', 'zero', '\\vec{0}'], placeholder: 'Value', explanation: 'Curl of gradient is always zero.' },
    { difficulty: 'medium', question: 'Source: $\\nabla \\cdot \\vec{F} > 0$. Sink: $\\nabla \\cdot \\vec{F} <$ ?', accept: [0, '0'], placeholder: 'Sign', explanation: 'Source: positive divergence. Sink: negative divergence.' },
    { difficulty: 'hard', question: 'Harmonic function: $\\nabla^2 f = 0$. Satisfies the _____ equation.', accept: ['Laplace', 'Laplace\'s'], placeholder: 'Name', explanation: 'Laplace equation: $\\Delta f = 0$. Solutions are harmonic.' },
    { difficulty: 'medium', question: 'Solenoidal field: $\\nabla \\cdot \\vec{F} = $ ?', accept: [0, '0'], placeholder: 'Value', explanation: 'Solenoidal: divergence-free. $\\nabla \\cdot \\vec{F} = 0$.' },
    { difficulty: 'hard', question: 'Helmholtz decomposition: any smooth vector field = gradient + _____ field.', accept: ['curl', 'solenoidal', 'divergence-free'], placeholder: 'Type', explanation: '$\\vec{F} = -\\nabla\\phi + \\nabla \\times \\vec{A}$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Find the projection of $\\mathbf{b} = \\langle 3, 4 \\rangle$ onto $\\mathbf{a} = \\langle 1, 0 \\rangle$.', steps: [
      { content: '$\\mathbf{a} \\cdot \\mathbf{b} = 3(1) + 4(0) = 3$.' },
      { content: '$|\\mathbf{a}|^2 = 1^2 + 0^2 = 1$.' },
      { content: '$\\text{proj}_{\\mathbf{a}} \\mathbf{b} = \\frac{3}{1} \\langle 1, 0 \\rangle = \\langle 3, 0 \\rangle$.' },
    { difficulty: 'hard', question: 'Verify that $\\vec{F} = \\langle 2xy, x^2 \\rangle$ is conservative and find $\\phi$.', steps: [
      { content: 'Check: $\\frac{\\partial}{\\partial y}(2xy) = 2x = \\frac{\\partial}{\\partial x}(x^2) = 2x$. Conservative.' },
      { content: '$\\phi = \\int 2xy\\,dx = x^2 y + g(y)$.' },
      { content: '$\\phi_y = x^2 + g\'(y) = x^2$. So $g\'(y) = 0$, $g(y) = C$.' },
      { content: '$\\phi = x^2 y + C$.' }
    ], explanation: 'Test: $\\partial P/\\partial y = \\partial Q/\\partial x$. Integrate to find potential function.' }
    ], explanation: 'Projection: $\\frac{\\mathbf{a} \\cdot \\mathbf{b}}{|\\mathbf{a}|^2} \\mathbf{a}$.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each vector operation to its result type:', pairs: [
      { left: 'Dot product', right: 'Scalar' },
      { left: 'Cross product', right: 'Vector' },
      { left: 'Magnitude', right: 'Scalar' },
      { left: 'Unit vector', right: 'Vector' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Dot product formula:', expression: '$\\mathbf{u} \\cdot \\mathbf{v} = |\\mathbf{u}||\\mathbf{v}|\\cos$ {{0}}', blanks: [ { accept: ['theta', '\\theta', 'θ'], size: 6 } ], explanation: 'The dot product equals the product of magnitudes times the cosine of the angle.' },
    { difficulty: 'medium', context: 'Dot product:', expression: '$\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos$ {{0}}', blanks: [ { accept: ['theta', '\\theta'], size: 6 } ], explanation: 'Dot product equals the product of magnitudes times cosine of the angle between them.' },
    { difficulty: 'medium', context: 'Vector identities:', expression: '$\\nabla \\times (\\nabla f) =$ {{0}} for any smooth scalar field $f$.', blanks: [ { accept: ['0', 'zero', '\\vec{0}'], size: 5 } ], explanation: 'Curl of a gradient is always zero.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Vector Strategy</h4>
    <ol><li><strong>Dot product</strong> for angles and projections (scalar result).</li>
    <li><strong>Cross product</strong> for perpendicular vectors and areas (vector result).</li>
    <li>$\\mathbf{u} \\cdot \\mathbf{v} = 0 \\iff$ perpendicular. $\\mathbf{u} \\times \\mathbf{v} = \\mathbf{0} \\iff$ parallel.</li></ol></div>` }
},

/* TOPIC 8.2: Partial Derivatives & Gradients */
{
  id: 'partial-derivatives',
  title: 'Partial Derivatives & the Gradient',
  description: 'Derivatives of functions with multiple variables. Differentiate with respect to one variable while holding others constant.',
  prereqRecap: [
    { term: 'Derivative', definition: '$f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}$ (Module 6).' },
    { term: 'Chain Rule', definition: '$\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)$ (Module 6).' },
    { term: 'Vector', definition: 'An object $\\langle v_1, v_2, \\ldots \\rangle$ with magnitude and direction (Topic 8.1).' }
  ],
  whyExists: { html: `
    <p><strong>Why partial derivatives?</strong> Real-world quantities depend on multiple variables: temperature depends on position $(x,y,z)$ AND time $t$. A partial derivative asks: "How does temperature change if I move in the $x$-direction while keeping $y, z, t$ fixed?"</p>
    ${WHY('Why the gradient?', '<p>The gradient $\\nabla f = \\langle f_x, f_y, f_z \\rangle$ points in the direction of steepest increase at each point. Its magnitude is the rate of increase. This is essential for optimization (gradient descent in machine learning) and physics (force = $-\\nabla V$).</p>')}
  ` },
  formalDefinitions: [
      { term: 'Partial Derivative', symbol: '$\\frac{\\partial f}{\\partial x}$', definition: 'The derivative of $f(x,y)$ with respect to $x$, treating $y$ as a constant. Measures the rate of change in the $x$-direction alone.' },
      { term: 'Gradient', symbol: '$\\nabla f = \\left\\langle \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y} \\right\\rangle$', definition: 'A vector pointing in the direction of steepest ascent. Its magnitude is the maximum rate of change. Perpendicular to level curves.' },
      { term: 'Directional Derivative', symbol: '$D_{\\hat{u}} f = \\nabla f \\cdot \\hat{u}$', definition: 'The rate of change of $f$ in the direction of unit vector $\\hat{u}$. Maximum when $\\hat{u}$ is parallel to $\\nabla f$.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 400 200" width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <path d="M 40 160 Q 100 40 200 80 Q 300 120 360 40" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <line x1="40" y1="180" x2="380" y2="180" stroke="#94a3b8" stroke-width="1"/>
  <line x1="60" y1="10" x2="60" y2="190" stroke="#94a3b8" stroke-width="1"/>
  <line x1="120" y1="50" x2="280" y2="110" stroke="#10b981" stroke-width="1.5"/>
  <text x="285" y="108" fill="#10b981" font-size="10" font-family="Inter,sans-serif">∂f/∂x at P</text>
  <circle cx="200" cy="80" r="5" fill="#f59e0b"/>
  <text x="208" y="73" fill="#f59e0b" font-size="10" font-family="Inter,sans-serif">P</text>
  <text x="200" y="15" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">Partial derivative: slope in one direction, holding others fixed</text>
  <text x="365" y="38" fill="#3b82f6" font-size="11" font-family="Inter,sans-serif">f</text>
  <line x1="200" y1="80" x2="200" y2="180" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="205" y="170" fill="#ef4444" font-size="9" font-family="Inter,sans-serif">y held constant</text>
</svg>
</div>
<p class="math-diagram-label">Partial derivative ∂f/∂x: slope of a slice taken in the x-direction, with y held constant</p>

    <div class="callout callout-key"><h4>Partial Derivative Notation</h4>
    <p>$\\frac{\\partial f}{\\partial x}$ or $f_x$: differentiate with respect to $x$, treating all other variables as constants.</p>
    <p>Example: $f(x,y) = x^2y + 3y^2$. $f_x = 2xy$ (treat $y$ as constant). $f_y = x^2 + 6y$ (treat $x$ as constant).</p>
    ${WHY('Why the curly $\\partial$?', '<p>$\\partial$ (called "partial" or "del") distinguishes partial derivatives from ordinary derivatives. $\\frac{df}{dx}$ implies $f$ depends on $x$ alone; $\\frac{\\partial f}{\\partial x}$ signals that other variables exist but are held fixed.</p>')}</div>
    <div class="callout callout-key"><h4>The Gradient Vector</h4>
    <p>$$\\nabla f(x,y,z) = \\left\\langle \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}, \\frac{\\partial f}{\\partial z} \\right\\rangle$$</p>
    <p>Properties: (1) Points in the direction of steepest ascent. (2) Perpendicular to level curves/surfaces.</p></div>
    <div class="callout callout-key"><h4>Critical Points in Multivariable</h4>
    <p>Set $f_x = 0$ AND $f_y = 0$ simultaneously. Use the <strong>second derivative test</strong>: $D = f_{xx}f_{yy} - (f_{xy})^2$.</p>
    <ul><li>$D \\gt 0, f_{xx} \\gt 0$: local min.</li><li>$D \\gt 0, f_{xx} \\lt 0$: local max.</li><li>$D \\lt 0$: saddle point.</li></ul></div>
  ` },
  definition: { html: `<p><strong>Partial Derivative:</strong> $f_x(a,b) = \\lim_{h \\to 0}\\frac{f(a+h,b)-f(a,b)}{h}$.</p><p><strong>Gradient:</strong> $\\nabla f = \\langle f_x, f_y \\rangle$, the vector of all partial derivatives.</p>` },
  examples: [{
    title: 'Partial Derivatives and Gradient',
    problem: 'Find the gradient of $f(x,y) = x^2y - y^3 + 2x$ at $(1, 2)$.',
    steps: [
      { title: '$f_x$', content: '$f_x = 2xy + 2$. At $(1,2)$: $2(1)(2) + 2 = 6$.', why: 'Differentiate w.r.t. $x$: $y$ is constant, so $x^2y \\to 2xy$, $-y^3 \\to 0$, $2x \\to 2$.' },
      { title: '$f_y$', content: '$f_y = x^2 - 3y^2$. At $(1,2)$: $1 - 12 = -11$.', why: 'Differentiate w.r.t. $y$: $x$ is constant, so $x^2y \\to x^2$, $-y^3 \\to -3y^2$.' },
      { title: 'Gradient', content: '$\\nabla f(1,2) = \\langle 6, -11 \\rangle$.', why: 'This vector points in the direction of steepest increase of $f$ at $(1,2)$.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a partial derivative?', back: 'df/dx treating all other variables as constants. Measures change in one direction only.' },
      { type: 'define', front: 'What is the gradient?', back: 'Vector of all partials: grad(f) = <df/dx, df/dy>. Points uphill (direction of steepest increase).' },
      { type: 'why', front: 'Why does gradient point uphill?', back: 'Each component measures rate of increase in that direction. Combined vector gives maximum total increase.' }
    ],
    exercises: [
    { difficulty: 'easy', question: 'If $f(x,y) = x^2 + y^2$, find $f_x$:', options: ['$2x + 2y$', '$2x$', '$2y$', '$x^2$'], correctIndex: 1, hint: '<p>$y^2$ is a constant when differentiating w.r.t. $x$.</p>', correctExplanation: '$\\frac{\\partial}{\\partial x}[x^2 + y^2] = 2x + 0 = 2x$.', wrongExplanations: { 0: '$y^2$ is constant w.r.t. $x$, so its derivative is 0, not $2y$.', 2: 'That is $f_y$, not $f_x$.', 3: 'The derivative of $x^2$ is $2x$, not $x^2$.' } },
    { difficulty: 'easy', question: 'The gradient $\\nabla f$ points in the direction of:', options: ['Steepest descent', 'Steepest ascent', 'Zero change', 'Tangent to level curve'], correctIndex: 1, hint: '<p>The gradient is the direction of maximum rate of increase.</p>', correctExplanation: '$\\nabla f$ points toward steepest ascent. $-\\nabla f$ points toward steepest descent.', wrongExplanations: { 0: '$-\\nabla f$ is descent. $\\nabla f$ is ascent.', 2: 'Zero change is perpendicular to the gradient, along level curves.', 3: 'The gradient is PERPENDICULAR to level curves, not tangent.' } },
    { difficulty: 'medium', question: '$f(x,y) = e^{xy}$. $f_x = $?', options: ['$e^{xy}$', '$ye^{xy}$', '$xe^{xy}$', '$xye^{xy}$'], correctIndex: 1, hint: '<p>Chain rule: $\\frac{\\partial}{\\partial x}[e^{xy}] = e^{xy} \\cdot \\frac{\\partial}{\\partial x}[xy]$.</p>', correctExplanation: '$e^{xy} \\cdot y = ye^{xy}$. The inner derivative w.r.t. $x$ is $y$.', wrongExplanations: { 0: 'Missing the chain rule factor. $\\frac{\\partial}{\\partial x}[xy] = y$.', 2: 'That would be $f_y$: $\\frac{\\partial}{\\partial y}[xy] = x$.', 3: 'Only one factor from the chain rule: $y$, not $xy$.' } },
    { difficulty: 'medium', question: 'Second partial $f_{xy}$ of $f(x,y) = x^3y^2$ is:', options: ['$6x^2y^2$', '$6xy$', '$6x^2y$', '$3x^2y^2$'], correctIndex: 2, hint: '<p>$f_{xy} = \\frac{\\partial}{\\partial y}(f_x)$.</p>', correctExplanation: '$f_x = 3x^2y^2$. $f_{xy} = \\frac{\\partial}{\\partial y}[3x^2y^2] = 6x^2y$.', wrongExplanations: { 0: 'You differentiated $x$ again instead of taking $\\partial/\\partial y$ of $f_x$.', 1: 'You reduced the power of $x$ too much.', 3: 'That is $f_x$, not $f_{xy}$.' } },
    { difficulty: 'hard', question: 'Classify the critical point of $f(x,y) = x^2 - y^2$ at $(0,0)$:', options: ['Local min', 'Local max', 'Saddle point', 'Not a critical point'], correctIndex: 2, hint: '<p>$f_x = 2x = 0, f_y = -2y = 0$ at origin. Use $D = f_{xx}f_{yy} - f_{xy}^2$.</p>', correctExplanation: '$f_{xx} = 2, f_{yy} = -2, f_{xy} = 0$. $D = (2)(-2) - 0 = -4 \\lt 0$. Saddle point.', wrongExplanations: { 0: '$D \\lt 0$ gives saddle point, not min.', 1: '$D \\lt 0$ gives saddle point, not max.', 3: '$f_x(0,0) = 0$ and $f_y(0,0) = 0$, so it IS a critical point.' } },
    { difficulty: 'hard', question: 'The directional derivative of $f$ in direction $\\hat{\\mathbf{u}}$ is:', options: ['$\\nabla f$', '$\\nabla f \\cdot \\hat{\\mathbf{u}}$', '$\\nabla f \\times \\hat{\\mathbf{u}}$', '$|\\nabla f|$'], correctIndex: 1, hint: '<p>It is the component of the gradient in direction $\\hat{\\mathbf{u}}$.</p>', correctExplanation: '$D_{\\hat{\\mathbf{u}}}f = \\nabla f \\cdot \\hat{\\mathbf{u}}$ (dot product of gradient with unit direction vector).', wrongExplanations: { 0: '$\\nabla f$ is a vector; the directional derivative is a scalar.', 2: 'Cross product gives a vector perpendicular to both, not a rate of change.', 3: '$|\\nabla f|$ is the maximum directional derivative, occurring in the gradient direction.' } }
  ,

    /* Partial derivative intuition */
    {
      question: 'For f(x,y) = x^2 + 3y, what is df/dx?',
      type: 'mc',
      options: ['2x', '2x + 3', 'x^2', '3'],
      correctIndex: 0,
      solution: { steps: ['Treat y as a constant. The derivative of x^2 is 2x. The derivative of 3y (a constant in x) is 0.', 'df/dx = 2x + 0 = 2x.'] }
    },
    {
      question: 'For f(x,y) = x^2 + 3y, what is df/dy?',
      type: 'mc',
      options: ['3', '2x + 3', '0', 'x^2'],
      correctIndex: 0,
      solution: { steps: ['Treat x as a constant. The derivative of x^2 (a constant in y) is 0. The derivative of 3y is 3.', 'df/dy = 0 + 3 = 3.'] }
    },
    {
      question: 'The gradient of f(x,y) = x^2 + y^2 at the point (3,4) points in which direction?',
      type: 'mc',
      options: ['Away from the origin (outward)', 'Toward the origin', 'Along the x-axis', 'Along the y-axis'],
      correctIndex: 0,
      solution: { steps: ['gradient f = <2x, 2y>. At (3,4): gradient = <6, 8>.', 'This vector <6,8> points away from the origin in the same direction as <3,4>.', 'For f = x^2 + y^2 (a bowl), the steepest uphill direction is always outward from the center.'] }
    }
    ],
  freeResponse: [
    { difficulty: 'easy', question: 'If $f(x,y) = x^2 + 3y$, find $f_x$:', accept: ['2x'], placeholder: 'e.g. 2x', explanation: '$f_x = 2x$.' },
    { difficulty: 'easy', question: 'If $f(x,y) = 5xy$, find $f_y$:', accept: ['5x'], placeholder: 'e.g. 5x', explanation: 'Treat $x$ as constant: $f_y = 5x$.' },
    { difficulty: 'medium', question: 'If $f(x,y) = xy^2$, find $f_y$:', accept: ['2xy'], placeholder: 'e.g. 2xy', explanation: '$f_y = 2xy$.' },
    { difficulty: 'medium', question: 'If $f(x,y) = e^{xy}$, find $f_x$:', accept: ['ye^{xy}', 'ye^(xy)', 'y*e^(xy)'], placeholder: 'e.g. ye^(xy)', explanation: 'Chain rule: $e^{xy} \\cdot y$.' },
    { difficulty: 'hard', question: 'Gradient of $f(x,y) = x^2 + y^2$ at $(1,1)$:', accept: ['<2,2>', '(2,2)', '2,2'], placeholder: '<a,b>', explanation: '$\\nabla f = \\langle 2x, 2y \\rangle$. At $(1,1)$: $\\langle 2, 2 \\rangle$.' },
    { difficulty: 'hard', question: 'The discriminant $D$ for $f(x,y) = x^2 - y^2$ at $(0,0)$ is:', accept: [-4, '-4'], placeholder: 'D = ?', explanation: '$f_{xx}=2, f_{yy}=-2, f_{xy}=0$. $D = (2)(-2) - 0 = -4 \\lt 0$: saddle point.' },
    { difficulty: 'easy', question: 'For a path $C$ from $(0,0)$ to $(1,1)$, $\\int_C ds$ gives the path:', accept: ['length', 'arc length'], placeholder: 'What?', explanation: '$\\int_C ds$ computes the arc length of the curve.' },
    { difficulty: 'medium', question: 'A conservative field has $\\oint_C \\vec{F} \\cdot d\\vec{r} =$?', accept: [0, '0'], placeholder: 'Number', explanation: 'Conservative: closed loop integral = 0.' },
    { difficulty: 'easy', question: 'For a path $C$: $\\vec{r}(t) = \\langle t, 2t \\rangle$, $0 \\leq t \\leq 1$, find $|\\vec{r}\'(t)|$:', accept: ['sqrt(5)', '2.24'], placeholder: 'Number', explanation: '$\\vec{r}\'(t) = \\langle 1, 2 \\rangle$. $|\\vec{r}\'| = \\sqrt{1+4} = \\sqrt{5}$.' },
    { difficulty: 'hard', question: "Green's theorem relates a line integral to a:", accept: ['double integral', 'area integral'], placeholder: 'Type', explanation: "Green's theorem: $\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_D (\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y})\\,dA$." },
    { difficulty: 'easy', question: 'Work done by a constant force $F = 5$ over distance $d = 3$:', accept: [15, '15'], placeholder: 'Number', explanation: '$W = F \\cdot d = 5 \\times 3 = 15$.' },
    { difficulty: 'medium', question: 'For conservative field, work depends only on:', accept: ['endpoints', 'start and end points'], placeholder: 'What?', explanation: 'Path independence: work depends only on endpoints, not the path taken.' },
    { difficulty: 'hard', question: 'If $\\vec{F}$ is conservative, $\\oint_C \\vec{F} \\cdot d\\vec{r} =$?', accept: [0, '0'], placeholder: 'Number', explanation: 'Conservative: closed loop integral = 0. Path independence.' },
    { difficulty: 'medium', question: 'The divergence theorem relates a surface integral to a:', accept: ['volume integral', 'triple integral'], placeholder: 'Type', explanation: '$\\oiint_S \\vec{F} \\cdot d\\vec{S} = \\iiint_V \\nabla \\cdot \\vec{F}\\,dV$.' },
    { difficulty: 'hard', question: 'Parameterize the unit circle centered at origin:', accept: ['(cos t, sin t)', '<cos t, sin t>'], placeholder: 'Parameterization', explanation: '$\\vec{r}(t) = \\langle \\cos t, \\sin t \\rangle$, $0 \\leq t \\leq 2\\pi$.' },
    { difficulty: 'medium', question: 'For a smooth closed surface $S$, $\\oint_S d\\vec{S} = $ ? (when enclosing volume)', accept: ['0', 'zero'], placeholder: 'Value', explanation: 'The integral of the normal over a closed surface equals zero.' },
    { difficulty: 'hard', question: 'A surface is orientable if it has:', accept: ['two sides', 'a consistent normal'], placeholder: 'Property', explanation: 'Orientable: consistent choice of normal. Mobius strip is non-orientable.' },
    { difficulty: 'hard', question: 'Fundamental theorem of line integrals: $\\int_C \\nabla f \\cdot d\\vec{r} = f(B) -$ ?', accept: ['f(A)'], placeholder: 'Expression', explanation: '$f(\\text{end}) - f(\\text{start})$. Path-independent for gradient fields.' },
    { difficulty: 'easy', question: 'Work along curve: $W = \\int_C \\vec{F} \\cdot d$ ?', accept: ['r', 'dr', '\\vec{r}'], placeholder: 'Variable', explanation: '$W = \\int_C \\vec{F} \\cdot d\\vec{r}$.' },
    { difficulty: 'hard', question: 'Which theorem generalizes FTC to line integrals for conservative fields?', accept: ['fundamental theorem of line integrals', 'FTLI'], placeholder: 'Theorem', explanation: '$\\int_C \\nabla f \\cdot d\\vec{r} = f(B) - f(A)$.' },
    { difficulty: 'medium', question: 'Circulation integral $\\oint_C \\vec{F} \\cdot d\\vec{r}$ measures:', accept: ['rotation', 'circulation', 'tendency to rotate'], placeholder: 'What?', explanation: 'Circulation: total rotational tendency around a closed curve.' },
    { difficulty: 'hard', question: 'Stokes theorem converts surface curl integral to:', accept: ['line integral', 'circulation'], placeholder: 'Type', explanation: '$\\iint_S (\\nabla \\times \\vec{F}) \\cdot d\\vec{S} = \\oint_C \\vec{F} \\cdot d\\vec{r}$.' },
    { difficulty: 'easy', question: '$\\int_C f\\,ds$ is called a _____ line integral.', accept: ['scalar'], placeholder: 'Type', explanation: 'Scalar line integral: integrates a scalar function along a curve.' },
    { difficulty: 'hard', question: 'Independence of path for $\\int_C \\vec{F} \\cdot d\\vec{r}$ requires $\\vec{F}$ to be:', accept: ['conservative', 'a gradient field'], placeholder: 'Property', explanation: 'Path-independent iff $\\vec{F} = \\nabla \\phi$ (conservative).' },
    { difficulty: 'easy', question: 'Parameterize line from $A$ to $B$: $\\vec{r}(t) = (1-t)A + tB$ for $t \\in [0,$ ?$]$.', accept: [1, '1'], placeholder: 'End', explanation: '$t \\in [0, 1]$. $t=0$: at $A$. $t=1$: at $B$.' },
    { difficulty: 'hard', question: 'Simply connected region: every closed curve can be:', accept: ['contracted to a point', 'shrunk to a point'], placeholder: 'Property', explanation: 'Simply connected: no holes. Every loop contracts to a point.' },
    { difficulty: 'easy', question: 'Green\'s theorem relates a _____ integral to a double integral.', accept: ['line', 'closed line'], placeholder: 'Type', explanation: '$\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_D (Q_x - P_y)\\,dA$.' },
    { difficulty: 'hard', question: 'Area via Green\'s: $A = \\frac{1}{2}\\oint (x\\,dy - y\\,dx)$. True?', accept: ['yes', 'true'], placeholder: 'True?', explanation: 'Shoelace formula generalized: $A = \\frac{1}{2}\\oint (x\\,dy - y\\,dx)$.' },
    { difficulty: 'easy', question: 'Work integral: $W = \\int_C \\vec{F} \\cdot d\\vec{r}$. Units:', accept: ['joules', 'energy', 'force times distance'], placeholder: 'Units', explanation: 'Work = force times displacement. SI: Joules.' },
    { difficulty: 'hard', question: 'Exact differential equation: $M\\,dx + N\\,dy = 0$ is exact when $M_y =$ ?', accept: ['N_x', 'dN/dx'], placeholder: 'Condition', explanation: 'Exact: $\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}$.' },
    { difficulty: 'medium', question: 'Orientation of curve matters for line integrals: reversing direction _____ the sign.', accept: ['changes', 'flips', 'reverses'], placeholder: 'What?', explanation: 'Reverse direction: negate the integral.' },
    { difficulty: 'hard', question: 'Poincare lemma: on a simply connected domain, every closed form is:', accept: ['exact'], placeholder: 'Property', explanation: 'Closed ($d\\omega = 0$) implies exact ($\\omega = d\\eta$) on simply connected domains.' },
    { difficulty: 'medium', question: 'Positive orientation: counterclockwise traversal of boundary curve.', accept: ['yes', 'true', 'correct'], placeholder: 'Correct?', explanation: 'Standard orientation: counterclockwise (region on left).' },
    { difficulty: 'hard', question: 'Hodge star operator maps $k$-forms to $(n-k)$-forms.', accept: ['yes', 'true', 'correct'], placeholder: 'Correct?', explanation: 'Hodge star: $\\star: \\Omega^k \\to \\Omega^{n-k}$. Duality on forms.' }
  ],
  stepBuilder: [
    { difficulty: 'hard', question: 'Classify the critical point of $f(x,y) = x^2 + y^2 - 2x - 4y + 5$.', steps: [
      { content: '$f_x = 2x - 2 = 0 \\Rightarrow x = 1$.' },
      { content: '$f_y = 2y - 4 = 0 \\Rightarrow y = 2$.' },
      { content: 'Critical point: $(1, 2)$.' },
      { content: '$f_{xx} = 2, f_{yy} = 2, f_{xy} = 0$.' },
      { content: '$D = f_{xx}f_{yy} - f_{xy}^2 = 4 \\gt 0$ and $f_{xx} \\gt 0$: LOCAL MINIMUM.' },
      { content: '$f(1,2) = 1 + 4 - 2 - 8 + 5 = 0$.' }
    ], explanation: 'Second derivative test: $D \\gt 0$ and $f_{xx} \\gt 0$: local min. $D \\gt 0$ and $f_{xx} \\lt 0$: local max. $D \\lt 0$: saddle.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'For $f(x,y) = x^2y + y^3$:', parts: [
      { question: 'Find $f_x$:', accept: ['2xy'], placeholder: 'Partial w.r.t. x', explanation: '$f_x = 2xy$.' },
      { question: 'Find $f_y$:', accept: ['x^2+3y^2', 'x^2 + 3y^2'], placeholder: 'Partial w.r.t. y', explanation: '$f_y = x^2 + 3y^2$.' },
      { question: 'Find $f_{xy}$:', accept: ['2x'], placeholder: 'Mixed partial', explanation: '$f_{xy} = \\frac{\\partial}{\\partial y}(2xy) = 2x$.' },
      { question: 'Verify: does $f_{xy} = f_{yx}$? (yes/no)', accept: ['yes'], placeholder: 'yes or no', explanation: '$f_{yx} = \\frac{\\partial}{\\partial x}(x^2+3y^2) = 2x = f_{xy}$. Clairaut\'s theorem.' }
    ], completionMessage: 'Clairaut\'s theorem: $f_{xy} = f_{yx}$ when both are continuous.' }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Partial derivative rule:', expression: '$\\frac{\\partial}{\\partial x}[f(x,y)]$: treat {{0}} as a constant.', blanks: [ { accept: ['y'], size: 3 } ], explanation: 'When finding $f_x$, hold $y$ constant and differentiate w.r.t. $x$.' },
    { difficulty: 'medium', context: 'Cross product magnitude:', expression: '$|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|$ {{0}} $\\theta$', blanks: [ { accept: ['sin', '\\sin'], size: 4 } ], explanation: 'Cross product magnitude = product of magnitudes times sine of angle.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Partial Derivative Strategy</h4>
    <ol><li><strong>Treat other variables as constants</strong> and differentiate normally.</li>
    <li><strong>Gradient:</strong> compute all partials and form the vector.</li>
    <li><strong>Critical points:</strong> set ALL partials = 0. Use second derivative test ($D$ test) to classify.</li></ol></div>` }
},

/* TOPIC 8.3: Multiple Integrals */
{
  id: 'multiple-integrals',
  title: 'Double & Triple Integrals',
  description: 'Extending integration to 2D and 3D: computing areas, volumes, and mass of regions.',
  prereqRecap: [
    { term: 'Definite Integral', definition: '$\\int_a^b f(x)\\,dx$ = net area under $f$ from $a$ to $b$ (Module 6).' },
    { term: 'Partial Derivative', definition: 'Differentiate w.r.t. one variable, hold others constant (Topic 8.2).' },
    { term: 'Region', definition: 'A bounded subset of $\\mathbb{R}^2$ or $\\mathbb{R}^3$.' }
  ],
  whyExists: { html: `
    <p><strong>Why multiple integrals?</strong> Single integrals compute area under a curve (1D boundary). Double integrals compute volume under a surface (2D boundary). Triple integrals compute "hypervolume" or mass in 3D regions. Applications: center of mass, moments of inertia, fluid flow, probability.</p>
    ${WHY('Why change coordinates?', '<p>Some regions are simpler in polar ($r, \\theta$), cylindrical ($r, \\theta, z$), or spherical ($\\rho, \\phi, \\theta$) coordinates. Circular regions become rectangles in polar coordinates. The Jacobian accounts for the area/volume distortion when changing variables.</p>')}
  ` },
  formalDefinitions: [
      { term: 'Double Integral', symbol: '$\\iint_R f(x,y)\\,dA$', definition: 'The volume under the surface $z = f(x,y)$ over region $R$. Computed as iterated integrals: $\\int_a^b \\int_{g_1(x)}^{g_2(x)} f(x,y)\\,dy\\,dx$.' },
      { term: 'Triple Integral', symbol: '$\\iiint_E f(x,y,z)\\,dV$', definition: 'Integrates a function over a 3D region $E$. Applications: mass, center of mass, moments of inertia. Can use cylindrical or spherical coordinates.' },
      { term: "Green\'s Theorem", symbol: '$\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right) dA$', definition: 'Relates a line integral around a simple closed curve $C$ to a double integral over the enclosed region $D$. Connects circulation and flux.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 350 220" width="350" height="220" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="180" x2="320" y2="180" stroke="#94a3b8" stroke-width="1"/>
  <line x1="60" y1="20" x2="60" y2="195" stroke="#94a3b8" stroke-width="1"/>
  <text x="325" y="183" fill="#94a3b8" font-size="11" font-family="Inter,sans-serif">x</text>
  <text x="63" y="17" fill="#94a3b8" font-size="11" font-family="Inter,sans-serif">y</text>
  <path d="M 100 160 Q 140 60 200 80 Q 260 100 280 140" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="2"/>
  <line x1="100" y1="160" x2="280" y2="140" stroke="#3b82f6" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="190" y="120" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="Inter,sans-serif">Region R</text>
  <line x1="120" y1="177" x2="120" y2="98" stroke="#10b981" stroke-width="0.8" opacity="0.4"/><line x1="150" y1="172.5" x2="150" y2="116" stroke="#10b981" stroke-width="0.8" opacity="0.4"/><line x1="180" y1="168" x2="180" y2="134" stroke="#10b981" stroke-width="0.8" opacity="0.4"/><line x1="210" y1="163.5" x2="210" y2="128" stroke="#10b981" stroke-width="0.8" opacity="0.4"/><line x1="240" y1="159" x2="240" y2="110" stroke="#10b981" stroke-width="0.8" opacity="0.4"/><line x1="260" y1="156" x2="260" y2="98" stroke="#10b981" stroke-width="0.8" opacity="0.4"/>
  <text x="190" y="15" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">∬_R f(x,y) dA = volume above R under surface</text>
  <text x="95" y="175" fill="#f59e0b" font-size="10" font-family="Inter,sans-serif">a</text>
  <text x="278" y="157" fill="#f59e0b" font-size="10" font-family="Inter,sans-serif">b</text>
</svg>
</div>
<p class="math-diagram-label">Double integral: sum of f(x,y) over every tiny area element dA in region R</p>

    <div class="callout callout-key"><h4>Fubini's Theorem</h4>
    <p>If $f$ is continuous on a rectangular region $R = [a,b] \\times [c,d]$, then:
    $$\\iint_R f(x,y)\\,dA = \\int_a^b \\int_c^d f(x,y)\\,dy\\,dx = \\int_c^d \\int_a^b f(x,y)\\,dx\\,dy$$</p>
    <p>The order of integration can be switched. For non-rectangular regions, the limits must be adjusted accordingly.</p></div>
    <div class="callout callout-key"><h4>Double Integrals</h4>
    <p>$$\\iint_R f(x,y)\\,dA = \\int_a^b \\int_{g_1(x)}^{g_2(x)} f(x,y)\\,dy\\,dx$$</p>
    <p>Iterate: integrate $y$ first (inner), then $x$ (outer). Or reverse the order. Choosing the correct order can simplify computation.</p></div>
    <div class="callout callout-key"><h4>Polar Coordinates</h4>
    <p>$x = r\\cos\\theta$, $y = r\\sin\\theta$, $dA = r\\,dr\\,d\\theta$ (the extra $r$ is the Jacobian).</p>
    <p>Use polar when the region has circular symmetry or the integrand contains $x^2 + y^2$.</p>
    ${WHY('Why the extra $r$?', '<p>A small sector in polar has area $\\approx r\\,dr\\,d\\theta$, not $dr\\,d\\theta$. Far from the origin, the same $d\\theta$ sweeps a larger arc. The $r$ factor corrects for this.</p>')}</div>
    <div class="callout callout-key"><h4>Triple Integrals & Cylindrical Coordinates</h4>
    <p>$$\\iiint_E f(x,y,z)\\,dV = \\int\\int\\int f\\,dz\\,dy\\,dx$$</p>
    <p><strong>Cylindrical</strong> ($r, \\theta, z$): $x = r\\cos\\theta$, $y = r\\sin\\theta$, $z = z$. $dV = r\\,dz\\,dr\\,d\\theta$. Best for cylinders, cones, pipes.</p>
    <p><strong>Spherical</strong> ($\\rho, \\phi, \\theta$): $dV = \\rho^2 \\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta$. Best for spheres and regions with spherical symmetry.</p></div>
    <div class="callout callout-key"><h4>Applications of Multiple Integrals</h4>
    <ul>
      <li><strong>Volume:</strong> $V = \\iiint_E 1\\,dV$.</li>
      <li><strong>Mass:</strong> $M = \\iiint_E \\rho(x,y,z)\\,dV$ where $\\rho$ is density.</li>
      <li><strong>Center of Mass:</strong> $\\bar{x} = \\frac{1}{M}\\iiint x\\rho\\,dV$, $\\bar{y} = \\frac{1}{M}\\iiint y\\rho\\,dV$, $\\bar{z} = \\frac{1}{M}\\iiint z\\rho\\,dV$.</li>
      <li><strong>Moment of Inertia:</strong> $I_z = \\iiint (x^2 + y^2)\\rho\\,dV$ (about $z$-axis).</li>
    </ul></div>
  ` },
  definition: { html: `<p><strong>Double Integral:</strong> $\\iint_R f\\,dA$ = volume under $z = f(x,y)$ above region $R$.</p><p><strong>Jacobian:</strong> The scaling factor when changing coordinate systems.</p>` },
  examples: [{
    title: 'Computing a Double Integral',
    problem: '$\\int_0^1 \\int_0^x xy\\,dy\\,dx$.',
    steps: [
      { title: 'Inner integral (w.r.t. $y$)', content: '$\\int_0^x xy\\,dy = x\\left[\\frac{y^2}{2}\\right]_0^x = \\frac{x^3}{2}$.', why: 'Treat $x$ as constant. $\\int xy\\,dy = x \\cdot \\frac{y^2}{2}$.' },
      { title: 'Outer integral', content: '$\\int_0^1 \\frac{x^3}{2}\\,dx = \\frac{1}{2} \\cdot \\frac{x^4}{4}\\Big|_0^1 = \\frac{1}{8}$.', why: 'Now integrate the result w.r.t. $x$.' }
    ]
  },
  {
    title: 'Double Integral in Polar Coordinates',
    problem: 'Find the volume under $z = e^{-(x^2+y^2)}$ over the unit disk $x^2 + y^2 \\leq 1$.',
    steps: [
      { title: 'Convert to polar', content: '$x^2 + y^2 = r^2$. Integrand: $e^{-r^2}$. $dA = r\\,dr\\,d\\theta$. Limits: $0 \\leq r \\leq 1$, $0 \\leq \\theta \\leq 2\\pi$.', why: 'Circular region and radial integrand make polar coordinates natural.' },
      { title: 'Set up iterated integral', content: '$\\int_0^{2\\pi} \\int_0^1 e^{-r^2} \\cdot r\\,dr\\,d\\theta$.', why: 'The extra $r$ is the Jacobian; without it, the integral would be wrong.' },
      { title: 'Inner integral (u-sub)', content: 'Let $u = -r^2$, $du = -2r\\,dr$. $\\int_0^1 re^{-r^2}\\,dr = -\\frac{1}{2}[e^{-r^2}]_0^1 = -\\frac{1}{2}(e^{-1} - 1) = \\frac{1-e^{-1}}{2}$.', why: 'The $r$ in $r\\,dr$ makes u-substitution possible.' },
      { title: 'Outer integral', content: '$\\int_0^{2\\pi} \\frac{1-e^{-1}}{2}\\,d\\theta = \\pi(1-e^{-1}) \\approx 1.986$.', why: 'The inner result is constant w.r.t. $\\theta$, so multiply by $2\\pi$.' }
    ]
  }],
  flashCards: [
      { type: 'define', front: 'What is a double integral?', back: 'Sum of f(x,y) over a 2D region. Computes volume under z=f(x,y). Evaluate by iterated integration.' },
      { type: 'why', front: 'Can you switch integration order?', back: 'Fubini Theorem: if f is continuous on rectangular region, order does not matter. Can simplify hard integrals.' }
    ],
    exercises: [
    { difficulty: 'easy', question: '$\\int_0^1 \\int_0^1 1\\,dy\\,dx = $?', options: ['$0$', '$1$', '$2$', '$1/2$'], correctIndex: 1, hint: '<p>$\\int_0^1 1\\,dy = 1$. Then $\\int_0^1 1\\,dx = 1$.</p>', correctExplanation: 'This computes the area of the unit square: $1 \\times 1 = 1$.', wrongExplanations: { 0: 'The integrand is 1, and the region has area 1. Not 0.', 2: 'Both bounds go from 0 to 1; area is $1 \\times 1 = 1$.', 3: 'That would be the area of a triangle, not a square.' } },
    { difficulty: 'medium', question: '$\\int_0^{2\\pi} \\int_0^1 r\\,dr\\,d\\theta = $?', options: ['$\\pi$', '$2\\pi$', '$\\pi/2$', '$1$'], correctIndex: 0, hint: '<p>This computes the area of a unit disk in polar coordinates.</p>', correctExplanation: 'Inner: $\\int_0^1 r\\,dr = 1/2$. Outer: $\\int_0^{2\\pi} 1/2\\,d\\theta = \\pi$. Area of unit circle = $\\pi$.', wrongExplanations: { 1: '$\\int_0^{2\\pi} d\\theta = 2\\pi$, but multiply by $1/2$ from the inner integral.', 2: 'The outer integral gives $2\\pi \\cdot 1/2 = \\pi$, not $\\pi/2$.', 3: 'The Jacobian ($r$) is already included in the integrand.' } },
    { difficulty: 'medium', question: 'To convert $\\iint_R x^2 + y^2\\,dA$ over a disk to polar:', options: ['$\\int\\int r^2 \\cdot r\\,dr\\,d\\theta$', '$\\int\\int r^2\\,dr\\,d\\theta$', '$\\int\\int r\\,dr\\,d\\theta$', '$\\int\\int (r\\cos\\theta)^2\\,dr\\,d\\theta$'], correctIndex: 0, hint: '<p>$x^2 + y^2 = r^2$ and $dA = r\\,dr\\,d\\theta$.</p>', correctExplanation: '$x^2+y^2 = r^2$, $dA = r\\,dr\\,d\\theta$. Integrand becomes $r^2 \\cdot r = r^3$.', wrongExplanations: { 1: 'Missing the Jacobian $r$ from $dA = r\\,dr\\,d\\theta$.', 2: 'That only has the Jacobian, not the function $r^2$.', 3: 'You must convert the FULL integrand $x^2 + y^2 = r^2$, not just one component.' } },
    { difficulty: 'hard', question: 'What does $\\iiint_E 1\\,dV$ compute?', options: ['Surface area of $E$', 'Volume of $E$', 'Mass of $E$', 'Average value of 1'], correctIndex: 1, hint: '<p>Integrating the constant 1 over a region gives the measure of that region.</p>', correctExplanation: 'In 3D, integrating 1 over a region gives its volume, just as in 2D it gives area.', wrongExplanations: { 0: 'Surface area requires a surface integral, not a volume integral.', 2: 'Mass requires $\\iiint \\rho\\,dV$ where $\\rho$ is the density, not 1 (unless $\\rho = 1$).', 3: 'Average value divides by volume: $\\bar{f} = \\frac{1}{V}\\iiint f\\,dV$.' } },
    { difficulty: 'hard', question: 'The Jacobian for spherical coordinates ($\\rho, \\phi, \\theta$) is:', options: ['$\\rho$', '$\\rho^2$', '$\\rho^2 \\sin\\phi$', '$\\rho \\sin\\phi$'], correctIndex: 2, hint: '<p>$dV = \\rho^2 \\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta$.</p>', correctExplanation: 'The spherical Jacobian is $\\rho^2 \\sin\\phi$. This accounts for the stretching in all three coordinate directions.', wrongExplanations: { 0: '$\\rho$ is the cylindrical Jacobian (in the $r$-direction).', 1: 'Missing the $\\sin\\phi$ factor from the polar angle.', 3: 'Missing one factor of $\\rho$: it is $\\rho^2$, not $\\rho$.' } },
    { difficulty: 'easy', question: 'In an iterated integral $\\int_a^b \\int_{c}^{d} f(x,y)\\,dy\\,dx$, which variable is integrated first?', options: ['$x$', '$y$', 'Either', 'Neither'], correctIndex: 1, hint: '<p>The innermost integral is evaluated first.</p>', correctExplanation: 'The inner integral ($dy$) is computed first, producing a function of $x$. Then the outer integral ($dx$) is computed.', wrongExplanations: { 0: '$x$ is the outer variable, integrated last.', 2: 'The order matters and is determined by the limits of integration.', 3: 'Both variables are integrated; inner first, outer second.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: '$\\int_0^1 \\int_0^1 1\\,dy\\,dx =$?', accept: [1, '1'], placeholder: 'Number', explanation: 'Area of unit square = 1.' },
    { difficulty: 'easy', question: '$\\int_0^2 \\int_0^3 xy\\,dy\\,dx =$?', accept: [9, '9'], placeholder: 'Number', explanation: 'Inner: $\\int_0^3 xy\\,dy = x \\cdot 9/2$. Outer: $\\int_0^2 9x/2\\,dx = 9$.' },
    { difficulty: 'medium', question: 'In polar coordinates, $dA =$? (include $r$)', accept: ['r dr dtheta', 'r*dr*dtheta', 'r dr d\\theta'], placeholder: 'e.g. r dr dtheta', explanation: '$dA = r\\,dr\\,d\\theta$.' },
    { difficulty: 'medium', question: 'Area of a disk of radius 2 using polar: $\\int_0^{2\\pi} \\int_0^2 r\\,dr\\,d\\theta =$?', accept: ['4pi', '4\\pi'], placeholder: 'Answer', explanation: '$\\int_0^2 r\\,dr = 2$. $\\int_0^{2\\pi} 2\\,d\\theta = 4\\pi$.' },
    { difficulty: 'hard', question: 'The Jacobian for spherical coordinates is $\\rho^2 \\sin$?', accept: ['phi', 'φ', '\\phi'], placeholder: 'which angle?', explanation: '$dV = \\rho^2 \\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta$.' },
    { difficulty: 'hard', question: 'Volume of sphere radius $R$: $\\frac{4}{3}\\pi R^3$. For $R=3$, volume $=$?', accept: ['36pi', '36\\pi', '113.1'], placeholder: 'Volume', explanation: '$\\frac{4}{3}\\pi(27) = 36\\pi \\approx 113.1$.' },
    { difficulty: 'easy', question: 'Divergence of $\\vec{F} = \\langle x, y, z \\rangle$:', accept: [3, '3'], placeholder: 'Number', explanation: '$\\nabla \\cdot \\vec{F} = 1 + 1 + 1 = 3$.' },
    { difficulty: 'medium', question: "Stokes' theorem relates surface integral of curl to:", accept: ['line integral', 'boundary integral'], placeholder: 'Type', explanation: "$\\iint_S (\\nabla \\times \\vec{F}) \\cdot d\\vec{S} = \\oint_{\\partial S} \\vec{F} \\cdot d\\vec{r}$." },
    { difficulty: 'medium', question: 'For $\\vec{F} = \\langle x^2, y^2, z^2 \\rangle$, $\\nabla \\cdot \\vec{F} =$?', accept: ['2x+2y+2z', '2(x+y+z)'], placeholder: 'Expression', explanation: '$\\frac{\\partial}{\\partial x}x^2 + \\frac{\\partial}{\\partial y}y^2 + \\frac{\\partial}{\\partial z}z^2 = 2x + 2y + 2z$.' },
    { difficulty: 'easy', question: 'The outward unit normal to a sphere at any point is the:', accept: ['radial direction', 'radius vector', 'position vector'], placeholder: 'Direction', explanation: 'Normal to sphere at $(x,y,z)$: radial direction $\\hat{r}$.' },
    { difficulty: 'hard', question: 'Area element in spherical coordinates: $dS = r^2 \\sin\\phi\\,d\\phi\\,d$ ?', accept: ['theta', '\\theta', 'dtheta'], placeholder: 'Variable', explanation: '$dS = r^2 \\sin\\phi\\,d\\phi\\,d\\theta$.' },
    { difficulty: 'hard', question: 'Helmholtz decomposition: any vector field = irrotational + ?', accept: ['solenoidal', 'divergence-free'], placeholder: 'Type', explanation: '$\\vec{F} = -\\nabla\\phi + \\nabla \\times \\vec{A}$. Irrotational + solenoidal.' },
    { difficulty: 'medium', question: 'Gauss\'s law relates total flux to:', accept: ['enclosed charge', 'charge inside'], placeholder: 'What?', explanation: '$\\oint \\vec{E} \\cdot d\\vec{A} = Q_{\\text{enc}}/\\varepsilon_0$.' },
    { difficulty: 'medium', question: 'In spherical: $x = \\rho\\sin\\phi\\cos\\theta$, $y = \\rho\\sin\\phi\\sin\\theta$, $z = \\rho$ ?', accept: ['cos(phi)', '\\cos\\phi', 'cosphi'], placeholder: 'Term', explanation: '$z = \\rho \\cos \\phi$.' },
    { difficulty: 'medium', question: 'A surface integral of $f$ over $S$: $\\iint_S f\\,dS$ generalizes what for surfaces?', accept: ['line integral', 'integration'], placeholder: 'Concept', explanation: 'Surface integral generalizes single/line integrals to two-dimensional surfaces.' },
    { difficulty: 'hard', question: 'Total flux through a closed surface = total _____ inside (by divergence theorem).', accept: ['divergence', 'source'], placeholder: 'What?', explanation: '$\\oiint \\vec{F} \\cdot d\\vec{S} = \\iiint (\\nabla \\cdot \\vec{F})\\,dV$.' },
    { difficulty: 'medium', question: 'Physical interpretation of divergence:', accept: ['source strength', 'expansion rate', 'outward flux per volume'], placeholder: 'Meaning', explanation: '$\\nabla \\cdot \\vec{F}$: rate of expansion (positive = source, negative = sink).' },
    { difficulty: 'hard', question: 'Normal vector to surface $z = f(x,y)$:', accept: ['<-f_x, -f_y, 1>', '<-fx,-fy,1>'], placeholder: 'Vector', explanation: '$\\vec{n} = \\langle -f_x, -f_y, 1 \\rangle$ (unnormalized).' },
    { difficulty: 'easy', question: 'Stokes theorem relates a surface integral to a _____ integral.', accept: ['line', 'boundary'], placeholder: 'Type', explanation: '$\\iint_S \\text{curl} \\times d\\vec{S} = \\oint_{\\partial S} \\vec{F} \\cdot d\\vec{r}$.' },
    { difficulty: 'hard', question: 'Gauss theorem (divergence theorem) in 2D is equivalent to:', accept: ["Green's theorem", 'Greens theorem'], placeholder: 'Theorem', explanation: 'Green\'s theorem is the 2D version of the divergence theorem.' },
    { difficulty: 'easy', question: 'Electric field is a ____ field.', accept: ['vector'], placeholder: 'Type', explanation: 'Electric field $\\vec{E}$: a vector field.' },
    { difficulty: 'hard', question: 'Kelvin-Stokes theorem generalizes to higher dimensions via:', accept: ['differential forms', 'exterior calculus'], placeholder: 'Framework', explanation: 'Generalized Stokes theorem: $\\int_{\\partial M} \\omega = \\int_M d\\omega$. Differential forms.' },
    { difficulty: 'easy', question: 'Temperature at a point is a _____ field.', accept: ['scalar'], placeholder: 'Type', explanation: 'Temperature: assigns a scalar (number) to each point.' },
    { difficulty: 'hard', question: 'Potential function $\\phi$: $\\vec{F} = -\\nabla\\phi$. The negative sign convention comes from:', accept: ['physics', 'potential energy'], placeholder: 'Where?', explanation: 'Physics convention: force = negative gradient of potential energy.' },
    { difficulty: 'easy', question: 'Total surface area includes lateral surface plus:', accept: ['bases', 'top and bottom', 'end caps'], placeholder: 'What?', explanation: 'Total SA = lateral + bases.' },
    { difficulty: 'hard', question: 'Navier-Stokes equations describe:', accept: ['fluid flow', 'fluid dynamics', 'viscous flow'], placeholder: 'What?', explanation: 'Navier-Stokes: PDEs governing viscous fluid flow. Millennium problem.' },
    { difficulty: 'medium', question: 'Outward normal convention: for closed surface, normals point:', accept: ['outward'], placeholder: 'Direction', explanation: 'Standard convention: outward-pointing normals on closed surfaces.' },
    { difficulty: 'hard', question: 'De Rham cohomology measures the failure of _____ on a manifold.', accept: ['exactness', 'closed = exact'], placeholder: 'What?', explanation: 'De Rham cohomology: closed forms modulo exact forms.' },
    { difficulty: 'medium', question: 'Flux through surface: $\\Phi = \\iint \\vec{F} \\cdot \\hat{n}\\,dS$. $\\hat{n}$ is the unit:', accept: ['normal'], placeholder: 'Vector', explanation: '$\\hat{n}$: outward unit normal.' },
    { difficulty: 'hard', question: 'Maxwell\'s $\\nabla \\cdot \\vec{B} = 0$ states: no magnetic:', accept: ['monopoles'], placeholder: 'What?', explanation: 'No magnetic monopoles: magnetic field lines are always closed.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Evaluate $\\int_0^1 \\int_0^x xy\\,dy\\,dx$.', steps: [
      { content: 'Inner: $\\int_0^x xy\\,dy = x \\cdot \\frac{y^2}{2}\\Big|_0^x = \\frac{x^3}{2}$.' },
      { content: 'Outer: $\\int_0^1 \\frac{x^3}{2}\\,dx = \\frac{1}{2} \\cdot \\frac{x^4}{4}\\Big|_0^1 = \\frac{1}{8}$.' }
    ], explanation: 'Inner integral: treat outer variable as constant. Then integrate result.' },
    { difficulty: 'hard', question: 'Find the volume of the unit sphere using spherical coordinates.', steps: [
      { content: '$V = \\int_0^{2\\pi} \\int_0^{\\pi} \\int_0^1 \\rho^2 \\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta$.' },
      { content: 'Inner: $\\int_0^1 \\rho^2\\,d\\rho = 1/3$.' },
      { content: 'Middle: $\\int_0^{\\pi} \\sin\\phi\\,d\\phi = [-\\cos\\phi]_0^{\\pi} = 2$.' },
      { content: 'Outer: $\\int_0^{2\\pi} d\\theta = 2\\pi$.' },
      { content: '$V = \\frac{1}{3} \\cdot 2 \\cdot 2\\pi = \\frac{4\\pi}{3}$.' }
    ], explanation: 'Spherical coordinates are natural for spheres. The Jacobian $\\rho^2\\sin\\phi$ is essential.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each coordinate system to its Jacobian:', pairs: [
      { left: 'Cartesian', right: '$1$' },
      { left: 'Polar/Cylindrical', right: '$r$' },
      { left: 'Spherical', right: '$\\rho^2 \\sin\\phi$' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'medium', context: 'Order of integration:', expression: 'In $\\int_a^b \\int_{c}^{d} f\\,dy\\,dx$, integrate {{0}} first, then {{1}}.', blanks: [ { accept: ['y', 'dy'], size: 3 }, { accept: ['x', 'dx'], size: 3 } ], explanation: 'Inner variable first, outer variable second.' },
    { difficulty: 'hard', context: 'Divergence theorem:', expression: '$\\iint_S \\vec{F} \\cdot d\\vec{S} = \\iiint_V$ {{0}} $\\vec{F}\\,dV$', blanks: [ { accept: ['div', 'nabla cdot', '\\nabla \\cdot'], size: 8 } ], explanation: 'Divergence theorem: surface integral of flux = volume integral of divergence.' }
  ],
  multiPart: [
    { difficulty: 'hard', question: 'Compute the volume of $z = 4 - x^2 - y^2$ above $z = 0$ using polar.', parts: [
      { question: 'What is the radius of the base? ($z = 0$ gives $r^2 = $?)', accept: [4, '4', '2'], placeholder: 'r or r\u00b2', explanation: '$0 = 4 - r^2 \\Rightarrow r^2 = 4$, so $r = 2$.' },
      { question: 'Set up the integral: $\\int_0^{2\\pi} \\int_0^2 (4-r^2) \\cdot r\\,dr\\,d\\theta$. Inner integral value:', accept: [4, '4'], placeholder: 'Number', explanation: '$\\int_0^2 (4r - r^3)\\,dr = [2r^2 - r^4/4]_0^2 = 8 - 4 = 4$.' },
      { question: 'Total volume:', accept: ['8pi', '8\\pi', '25.13'], placeholder: 'Volume', explanation: '$\\int_0^{2\\pi} 4\\,d\\theta = 8\\pi$.' },
    { difficulty: 'hard', question: 'Evaluate $\\oint_C x\\,dy - y\\,dx$ around the unit circle using Green\'s theorem.', parts: [
      { question: '$Q_x - P_y = 1 - (-1) =$?', accept: [2, '2'], placeholder: 'Number', explanation: '$\\frac{\\partial x}{\\partial x} = 1$, $\\frac{\\partial(-y)}{\\partial y} = -1$. Difference: $2$.' },
      { question: '$\\iint_D 2\\,dA = 2\\pi r^2 = 2\\pi(1)^2 =$?', accept: ['2pi', '6.28'], placeholder: 'Number', explanation: 'Area of unit circle: $\\pi$. Result: $2\\pi$.' }
    ], completionMessage: 'Green\'s theorem: $\\oint_C (P\\,dx + Q\\,dy) = \\iint_D (Q_x - P_y)\\,dA$.' }
    ], completionMessage: 'Polar integration for circular symmetry: convert $x^2+y^2 = r^2$ and include the $r$ Jacobian.' }
  ],
  stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Multiple Integrals Strategy</h4>
    <ol><li><strong>Sketch the region</strong> and determine bounds.</li>
    <li><strong>Inner integral first:</strong> treat the outer variable as constant.</li>
    <li><strong>Polar for circles:</strong> Use $dA = r\\,dr\\,d\\theta$. Do not forget the $r$.</li>
    <li><strong>Spherical for spheres:</strong> $dV = \\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta$.</li></ol></div>` }
}

] // end topics array
}); // end module push
})();
