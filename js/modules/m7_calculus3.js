/* ============================================================
   MODULE 7: Calculus 3 (Multivariable Calculus)
   Vectors, Partial Derivatives, Multiple Integrals
   ============================================================ */
(function() {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];
  const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;
  window.MATH_MODULES.push({
    id: 'calculus-3',
    order: 12,
    title: 'Calculus 3A: Vector Functions \u0026 Curves',
    description: 'Vectors, parametric curves, and motion in space. Moving from one dimension to two and three. Requires: derivatives (Module 9).',
    topics: [
      {
        id: 'vectors',
        title: 'Vectors and Vector Operations',
        description: 'Quantities with magnitude and direction. The language of physics, engineering, and multivariable calculus.',
        prereqRecap: [
          { term: 'Coordinate Plane', definition: 'Points $(x, y)$ in 2D. In 3D: $(x, y, z)$.' },
          { term: 'Pythagorean Theorem', definition: '$a^2 + b^2 = c^2$. Distance in any dimension extends from this.' },
          { term: 'Trigonometry', definition: '$\\cos\\theta$ and $\\sin\\theta$ decompose a magnitude into horizontal and vertical components.' }
        ],
        whyExists: { html: `
          <p><strong>Why vectors?</strong> Real-world quantities like force, velocity, and displacement have both <strong>magnitude</strong> (how much) and <strong>direction</strong> (which way). A single number (scalar) cannot encode direction. A vector $\\vec{v} = \\langle v_1, v_2, v_3 \\rangle$ encodes both: the components tell you the direction, and $\\|\\vec{v}\\|$ tells you the magnitude.</p>
          <p><strong>Why component form?</strong> The component representation decomposes a vector into its effect along each coordinate axis. This makes vector arithmetic (addition, scaling) reduce to arithmetic on each component independently. The coordinate system gives us a universal language for direction.</p>
          <p><strong>Practical application:</strong> Every force diagram in physics uses vectors. GPS navigation computes resultant velocity vectors. Computer graphics rotates 3D objects using vector transformations. Machine learning represents data points as vectors in high-dimensional spaces.</p>
          ${WHY('Why is the dot product a scalar while the cross product is a vector?', '<p>The <strong>dot product</strong> $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta$ measures how much two vectors <em>align</em>. Alignment is a single number (fully aligned = max, perpendicular = 0). The <strong>cross product</strong> $\\vec{u} \\times \\vec{v}$ produces a vector <em>perpendicular</em> to both inputs, with magnitude $\\|\\vec{u}\\|\\|\\vec{v}\\|\\sin\\theta$ (the area of the parallelogram they span). A perpendicular direction requires a vector, not a scalar.</p>')}
        ` },
        hook: { html: `
          <div class="callout callout-puzzle"><h4>🧩 Puzzle: The River Crossing</h4>
          <p>You swim at 3 m/s across a river that flows at 4 m/s. In what direction do you actually move, and how fast?</p>
          <p>Your velocity and the river's velocity are <strong>vectors</strong>: they add. The resultant speed is $\\sqrt{3^2 + 4^2} = 5$ m/s at an angle $\\theta = \\arctan(4/3) \\approx 53°$ downstream. Vector addition explains why you drift.</p></div>` },
        formalDefinitions: [
      { term: 'Vector', symbol: '$\\vec{v} = \\langle v_1, v_2, \\ldots, v_n \\rangle$', definition: 'An ordered $n$-tuple of real numbers. Has both magnitude ($|\\vec{v}| = \\sqrt{v_1^2 + \\cdots + v_n^2}$) and direction. Elements of the vector space $\\mathbb{R}^n$.' },
      { term: 'Dot Product', symbol: '$\\vec{a} \\cdot \\vec{b} = \\sum a_ib_i = |\\vec{a}||\\vec{b}|\\cos\\theta$', definition: 'Returns a scalar. Equal to zero if and only if the vectors are orthogonal (perpendicular). Used to compute projections and angles.' },
      { term: 'Cross Product', symbol: '$\\vec{a} \\times \\vec{b}$', definition: 'Defined in $\\mathbb{R}^3$ only. Returns a vector perpendicular to both $\\vec{a}$ and $\\vec{b}$. Magnitude: $|\\vec{a}||\\vec{b}|\\sin\\theta$ (area of parallelogram). Anti-commutative: $\\vec{a} \\times \\vec{b} = -(\\vec{b} \\times \\vec{a})$.' }
    ],
    mathGrammar: [
      { question: 'What is a vector and how is it different from a number?', answer: 'A number (scalar) has only magnitude: "5 kilograms." A vector has magnitude AND direction: "5 meters east." In notation: $\\vec{v} = \\langle 3, 4 \\rangle$ means 3 units right and 4 units up. The arrow above the letter signals it is a vector, not a plain number.' },
      { question: 'Why does the dot product give a number, not a vector?', answer: '$\\vec{a} \\cdot \\vec{b} = a_1b_1 + a_2b_2$ adds up products of matching components. This sum is a single number. It measures how much two vectors point in the same direction. If perpendicular, the dot product is zero.' },
      { question: 'When do I use dot product vs cross product?', answer: '<strong>Dot product</strong>: when you need an angle, a projection, or a number (e.g., work = force dot displacement). <strong>Cross product</strong>: when you need a vector perpendicular to two others (e.g., torque, surface normals). Dot gives a scalar; cross gives a vector.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 350 250" width="350" height="250" xmlns="http://www.w3.org/2000/svg">
  <line x1="30" y1="220" x2="330" y2="220" stroke="#94a3b8" stroke-width="1"/>
  <line x1="50" y1="20" x2="50" y2="230" stroke="#94a3b8" stroke-width="1"/>
  <line x1="80" y1="200" x2="220" y2="100" stroke="#3b82f6" stroke-width="2.5"/>
  <polygon points="220,100 208,108 212,116" fill="#3b82f6"/>
  <text x="155" y="135" fill="#3b82f6" font-size="12" font-family="Inter,sans-serif" transform="rotate(-35 155 135)">v�: = ⟨a, b⟩</text>
  <line x1="80" y1="200" x2="220" y2="200" stroke="#10b981" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="220" y1="200" x2="220" y2="100" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="150" y="215" fill="#10b981" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">a (x-component)</text>
  <text x="235" y="155" fill="#ef4444" font-size="11" font-family="Inter,sans-serif">b (y-component)</text>
  <line x1="80" y1="200" x2="280" y2="160" stroke="#8b5cf6" stroke-width="2"/>
  <polygon points="280,160 268,162 270,172" fill="#8b5cf6"/>
  <text x="195" y="195" fill="#8b5cf6" font-size="10" font-family="Inter,sans-serif">w�:</text>
  <line x1="220" y1="100" x2="280" y2="60" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="280,60 268,65 272,72" fill="#f59e0b"/>
  <text x="255" y="55" fill="#f59e0b" font-size="11" font-family="Inter,sans-serif">v�: + w�:</text>
  <line x1="220" y1="100" x2="280" y2="160" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,3"/>
  <circle cx="80" cy="200" r="3" fill="#e2e8f0"/>
  <text x="150" y="30" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="Inter,sans-serif">Vector addition: tip-to-tail</text>
</svg>
</div>
<p class="math-diagram-label">Vectors: components (a, b), magnitude, and tip-to-tail addition</p>

          <p>A <strong>vector</strong> $\\vec{v} = \\langle v_1, v_2, v_3 \\rangle$ has components along each axis. Its <strong>magnitude</strong> is $\\|\\vec{v}\\| = \\sqrt{v_1^2 + v_2^2 + v_3^2}$.</p>
          <div class="callout callout-key"><h4>Vector Operations</h4>
          <ul>
            <li><strong>Addition:</strong> $\\vec{u} + \\vec{v} = \\langle u_1+v_1, u_2+v_2, u_3+v_3 \\rangle$</li>
            <li><strong>Scalar multiplication:</strong> $c\\vec{v} = \\langle cv_1, cv_2, cv_3 \\rangle$</li>
            <li><strong>Dot product:</strong> $\\vec{u} \\cdot \\vec{v} = u_1v_1 + u_2v_2 + u_3v_3 = \\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta$</li>
            <li><strong>Cross product:</strong> $\\vec{u} \\times \\vec{v} = \\langle u_2v_3-u_3v_2,\\; u_3v_1-u_1v_3,\\; u_1v_2-u_2v_1 \\rangle$</li>
          </ul></div>
          <p><strong>Dot product</strong> returns a scalar; measures alignment. Zero dot product ⟹ perpendicular.</p>
          <p><strong>Cross product</strong> returns a vector perpendicular to both inputs; its magnitude equals the area of the parallelogram they span.</p>` },
        definition: { html: `
          <p><strong>Unit Vector:</strong> $\\hat{v} = \\frac{\\vec{v}}{\\|\\vec{v}\\|}$ (magnitude 1, same direction).</p>
          <p><strong>Projection of $\\vec{u}$ onto $\\vec{v}$:</strong></p>
          <div class="math-block">$$\\text{proj}_{\\vec{v}}\\vec{u} = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{v}\\|^2}\\vec{v}$$</div>
          <p><strong>Geometric meaning:</strong> This is the "shadow" of $\\vec{u}$ cast onto the line of $\\vec{v}$.</p>` },
        examples: [{
          title: 'Computing a Cross Product',
          problem: 'Find $\\vec{u} \\times \\vec{v}$ where $\\vec{u} = \\langle 1, 2, 3 \\rangle$ and $\\vec{v} = \\langle 4, 5, 6 \\rangle$.',
          steps: [
            { title: 'Apply the formula', content: '$\\vec{u} \\times \\vec{v} = \\langle (2)(6)-(3)(5),\\; (3)(4)-(1)(6),\\; (1)(5)-(2)(4) \\rangle$', why: 'Each component uses the "other two" components in a specific pattern.' },
            { title: 'Compute', content: '$= \\langle 12-15,\\; 12-6,\\; 5-8 \\rangle = \\langle -3, 6, -3 \\rangle$', why: 'Arithmetic.' },
            { title: 'Verify perpendicularity', content: '$\\vec{u} \\cdot (\\vec{u} \\times \\vec{v}) = (1)(-3)+(2)(6)+(3)(-3) = -3+12-9 = 0$ ✓', why: 'The cross product is always perpendicular to both input vectors.' }
          ]
        }],
        flashCards: [
      { type: 'define', front: 'What is a vector?', back: 'Quantity with magnitude AND direction. Written as <a,b> or <a,b,c>. Unlike numbers, vectors encode direction.' },
      { type: 'why', front: 'Why vectors instead of numbers?', back: 'Velocity, force, wind all have direction. A single number (scalar) cannot capture which way.' },
      { type: 'how', front: 'How does the dot product work?', back: 'a*b = |a||b|cos(theta) = a1b1+a2b2. Measures alignment. Zero means perpendicular.' }
    ],
    exercises: [{
          difficulty: 'easy',
          question: 'What is $\\langle 1, 2 \\rangle \\cdot \\langle 3, 4 \\rangle$?',
          options: ['$\\langle 3, 8 \\rangle$', '$11$', '$7$', '$5$'],
          correctIndex: 1,
          hint: '<p>Dot product: multiply corresponding components and add.</p>',
          correctExplanation: '$1 \\cdot 3 + 2 \\cdot 4 = 3 + 8 = 11$.',
          wrongExplanations: { 0: 'That is component-wise multiplication, not dot product.', 2: 'Add the products of components: $3+8=11$.', 3: 'That is $\\|\\langle 3,4\\rangle\\|$.' }
        },
        {
          difficulty: 'easy',
          question: 'The magnitude of $\\langle 3, 4 \\rangle$ is:',
          options: ['$7$', '$5$', '$25$', '$\\sqrt{7}$'],
          correctIndex: 1,
          hint: '<p>$\\|\\vec{v}\\| = \\sqrt{v_1^2 + v_2^2}$.</p>',
          correctExplanation: '$\\sqrt{9 + 16} = \\sqrt{25} = 5$.',
          wrongExplanations: { 0: '$3+4=7$ but magnitude uses square root of sum of squares.', 2: '$25$ is $\\|\\vec{v}\\|^2$, not $\\|\\vec{v}\\|$.', 3: '$\\sqrt{7}$ comes from $3+4$. Use $\\sqrt{9+16}$.' }
        },
        {
          difficulty: 'medium',
          question: 'Two vectors are perpendicular when their dot product equals:',
          options: ['$1$', '$-1$', '$0$', 'their magnitudes'],
          correctIndex: 2,
          hint: '<p>$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta$.</p>',
          correctExplanation: 'Perpendicular means $\\theta = 90°$, so $\\cos 90° = 0$.',
          wrongExplanations: { 0: '$1 = \\cos 0°$ (parallel, same direction).', 1: '$-1 = \\cos 180°$ (antiparallel).', 3: 'Magnitudes are factors, not the product itself.' }
        },
        {
          difficulty: 'hard',
          question: 'The area of the parallelogram spanned by $\\langle 1,0,0 \\rangle$ and $\\langle 0,1,0 \\rangle$ is:',
          options: ['$0$', '$1$', '$2$', '$\\sqrt{2}$'],
          correctIndex: 1,
          hint: '<p>Area = $\\|\\vec{u} \\times \\vec{v}\\|$.</p>',
          correctExplanation: '$\\langle 1,0,0 \\rangle \\times \\langle 0,1,0 \\rangle = \\langle 0,0,1 \\rangle$. $\\|\\langle 0,0,1 \\rangle\\| = 1$.',
          wrongExplanations: { 0: 'Cross product is $\\langle 0,0,1 \\rangle \\neq \\vec{0}$.', 2: 'The parallelogram is a unit square (area 1).', 3: 'The magnitude of $\\langle 0,0,1 \\rangle$ is 1.' }
        },

    /* Vector intuition */
    {
      question: 'If a = <1,0> and b = <0,1>, what is the dot product a . b?',
      type: 'mc',
      options: ['0', '1', '-1', 'sqrt(2)'],
      correctIndex: 0,
      solution: { steps: ['a . b = (1)(0) + (0)(1) = 0.', 'This makes sense: the x-axis and y-axis are perpendicular, and perpendicular vectors have dot product 0.'] }
    },
    {
      question: 'What is |<3, 4, 0>|?',
      type: 'mc',
      options: ['5', '7', '25', 'sqrt(7)'],
      correctIndex: 0,
      solution: { steps: ['|<3,4,0>| = sqrt(3^2 + 4^2 + 0^2) = sqrt(9 + 16) = sqrt(25) = 5.', 'This is the 3-4-5 right triangle in disguise.'] }
    },
    {
      question: 'If two vectors point in the exact same direction, their dot product equals:',
      type: 'mc',
      options: ['The product of their magnitudes', '0', '1', 'The sum of their magnitudes'],
      correctIndex: 0,
      solution: { steps: ['a . b = |a||b|cos(theta). Same direction means theta = 0, cos(0) = 1.', 'So a . b = |a||b|.'] }
    }
    ],
        freeResponse: [
          { difficulty: 'easy', question: '$\\|\\langle 3, 4 \\rangle\\| =$?', accept: [5, '5'], placeholder: 'Number', explanation: '$\\sqrt{9+16} = 5$.' },
          { difficulty: 'easy', question: '$\\langle 2, 3 \\rangle \\cdot \\langle 1, -1 \\rangle =$?', accept: [-1, '-1'], placeholder: 'Number', explanation: '$2(1) + 3(-1) = -1$.' },
          { difficulty: 'medium', question: '$\\langle 1,0,0 \\rangle \\times \\langle 0,1,0 \\rangle =$ (write as <a,b,c>):', accept: ['<0,0,1>', '0,0,1'], placeholder: '<a,b,c>', explanation: '$= \\langle 0-0, 0-0, 1-0 \\rangle = \\langle 0,0,1 \\rangle$.' },
          { difficulty: 'hard', question: 'Find the angle between $\\langle 1,1 \\rangle$ and $\\langle 1,0 \\rangle$ in degrees:', accept: [45, '45'], placeholder: 'degrees', explanation: '$\\cos\\theta = \\frac{1}{\\sqrt{2}} \\Rightarrow \\theta = 45°$.' },
    { difficulty: 'easy', question: '$\\langle 1,2 \\rangle + \\langle 3,4 \\rangle =$?', accept: ['<4,6>', '(4,6)', '<4, 6>'], placeholder: 'Vector', explanation: 'Add componentwise: $\\langle 1+3, 2+4 \\rangle = \\langle 4, 6 \\rangle$.' },
    { difficulty: 'medium', question: '$|\\langle 3, 4 \\rangle| =$?', accept: [5, '5'], placeholder: 'Number', explanation: '$\\sqrt{9 + 16} = \\sqrt{25} = 5$.' },
    { difficulty: 'hard', question: '$\\langle 1,0,0 \\rangle \\times \\langle 0,1,0 \\rangle =$?', accept: ['<0,0,1>', '(0,0,1)', '<0, 0, 1>'], placeholder: 'Vector', explanation: '$\\hat{i} \\times \\hat{j} = \\hat{k} = \\langle 0,0,1 \\rangle$.' },
    { difficulty: 'easy', question: '$2\\langle 1, 3 \\rangle =$?', accept: ['<2,6>', '(2,6)', '<2, 6>'], placeholder: 'Vector', explanation: 'Scalar multiplication: $2\\langle 1,3 \\rangle = \\langle 2, 6 \\rangle$.' },
    { difficulty: 'medium', question: 'Dot product $\\langle 1,2 \\rangle \\cdot \\langle 3,-1 \\rangle =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$1(3) + 2(-1) = 3 - 2 = 1$.' },
    { difficulty: 'hard', question: 'Unit vector in direction of $\\langle 3, 4 \\rangle$:', accept: ['<3/5,4/5>', '<0.6,0.8>'], placeholder: 'Vector', explanation: '$|\\vec{v}| = 5$. $\\hat{v} = \\langle 3/5, 4/5 \\rangle$.' },
    { difficulty: 'easy', question: 'The zero vector in $\\mathbb{R}^3$:', accept: ['<0,0,0>', '(0,0,0)'], placeholder: 'Vector', explanation: '$\\vec{0} = \\langle 0, 0, 0 \\rangle$.' },
    { difficulty: 'hard', question: 'Volume of parallelepiped with edges $\\vec{a}$, $\\vec{b}$, $\\vec{c}$: $V = |\\vec{a} \\cdot (\\vec{b} \\times \\vec{c})|$. If this equals 0, the vectors are:', accept: ['coplanar'], placeholder: 'Property', explanation: 'Zero volume means all three vectors lie in the same plane.' },
    { difficulty: 'medium', question: 'Projection of $\\langle 3, 4 \\rangle$ onto $\\langle 1, 0 \\rangle$:', accept: ['<3,0>', '(3,0)', '<3, 0>'], placeholder: 'Vector', explanation: '$\\text{proj}_{\\hat{i}} \\langle 3,4 \\rangle = \\langle 3, 0 \\rangle$.' },
    { difficulty: 'hard', question: 'Parametric line through $(1,2,3)$ in direction $\\langle 1,0,-1 \\rangle$: $z(t) =$?', accept: ['3-t', '3 - t'], placeholder: 'Expression', explanation: '$z = 3 + (-1)t = 3 - t$.' },
    { difficulty: 'easy', question: 'A vector with magnitude 1 is called a:', accept: ['unit vector'], placeholder: 'Name', explanation: 'Unit vector: $|\\hat{v}| = 1$.' },
    { difficulty: 'medium', question: 'Equation of plane with normal $\\langle 1,2,3 \\rangle$ through $(0,0,0)$:', accept: ['x+2y+3z=0'], placeholder: 'Equation', explanation: '$1(x-0) + 2(y-0) + 3(z-0) = 0$.' },
    { difficulty: 'hard', question: 'For $\\vec{r}(t) = \\langle \\cos t, \\sin t, t \\rangle$, the curve is called a:', accept: ['helix'], placeholder: 'Name', explanation: 'A helix spirals around the $z$-axis.' },
    { difficulty: 'medium', question: 'Two vectors are orthogonal when their dot product equals:', accept: [0, '0'], placeholder: 'Number', explanation: 'Orthogonal: $\\vec{a} \\cdot \\vec{b} = 0$.' },
    { difficulty: 'hard', question: 'Area of parallelogram formed by $\\vec{a} = \\langle 1,0,0 \\rangle$ and $\\vec{b} = \\langle 0,2,0 \\rangle$:', accept: [2, '2'], placeholder: 'Area', explanation: '$|\\vec{a} \\times \\vec{b}| = |\\langle 0,0,2 \\rangle| = 2$.' },
    { difficulty: 'easy', question: 'The dot product gives a:', accept: ['scalar', 'number'], placeholder: 'Type', explanation: 'Dot product: $\\vec{a} \\cdot \\vec{b} = $ scalar. Cross product gives a vector.' }
        ],
        stepBuilder: [
          { difficulty: 'medium', question: 'Find the projection of $\\vec{u} = \\langle 4, 2 \\rangle$ onto $\\vec{v} = \\langle 3, 0 \\rangle$.', steps: [
            { content: '$\\vec{u} \\cdot \\vec{v} = 4(3) + 2(0) = 12$.' },
            { content: '$\\|\\vec{v}\\|^2 = 9 + 0 = 9$.' },
            { content: '$\\text{proj}_{\\vec{v}}\\vec{u} = \\frac{12}{9}\\langle 3, 0 \\rangle = \\langle 4, 0 \\rangle$.' },
    { difficulty: 'hard', question: 'Find the angle between $\\vec{a} = \\langle 1, 1 \\rangle$ and $\\vec{b} = \\langle 1, 0 \\rangle$.', steps: [
      { content: '$\\vec{a} \\cdot \\vec{b} = 1(1) + 1(0) = 1$.' },
      { content: '$|\\vec{a}| = \\sqrt{2}$, $|\\vec{b}| = 1$.' },
      { content: '$\\cos\\theta = \\frac{1}{\\sqrt{2}} \\Rightarrow \\theta = 45°$.' }
    ], explanation: '$\\cos\\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|}$.' }
          ], explanation: 'The projection drops the component perpendicular to $\\vec{v}$.' }
        ],
        matching: [
          { difficulty: 'easy', instruction: 'Match each vector operation to its result type:', pairs: [
            { left: 'Dot product', right: 'Scalar' },
            { left: 'Cross product', right: 'Vector' },
            { left: 'Scalar multiplication', right: 'Vector' },
            { left: 'Magnitude', right: 'Scalar' }
          ] }
        ],
        fillBlanks: [
          { difficulty: 'easy', context: 'Perpendicularity test:', expression: 'Two vectors are perpendicular when $\\vec{u} \\cdot \\vec{v} =$ {{0}}.', blanks: [ { accept: ['0'], size: 3 } ], explanation: '$\\cos 90° = 0$.' },
          { difficulty: 'medium', context: 'Cross product magnitude:', expression: '$\\|\\vec{u} \\times \\vec{v}\\| =$ area of the {{0}} spanned by $\\vec{u}$ and $\\vec{v}$.', blanks: [ { accept: ['parallelogram'], size: 14 } ], explanation: 'Cross product magnitude = parallelogram area.' },
    { difficulty: 'easy', context: 'Cross product:', expression: 'The cross product $\\vec{a} \\times \\vec{b}$ is always {{0}} to both $\\vec{a}$ and $\\vec{b}$.', blanks: [ { accept: ['perpendicular', 'orthogonal'], size: 12 } ], explanation: 'Cross product is perpendicular to both input vectors.' }
        ],
        multiPart: [
          { difficulty: 'hard', question: 'Geometry: Find the area of the triangle with vertices $A(1,0,0)$, $B(0,1,0)$, $C(0,0,1)$.', parts: [
            { question: '$\\vec{AB} = B - A =$?', accept: ['<-1,1,0>', '-1,1,0'], placeholder: '<a,b,c>', explanation: '$(0-1, 1-0, 0-0) = \\langle -1,1,0 \\rangle$.' },
            { question: '$\\vec{AC} = C - A =$?', accept: ['<-1,0,1>', '-1,0,1'], placeholder: '<a,b,c>', explanation: '$(0-1, 0-0, 1-0) = \\langle -1,0,1 \\rangle$.' },
            { question: 'Triangle area = $\\frac{1}{2}\\|\\vec{AB} \\times \\vec{AC}\\|$. Cross product = $\\langle 1,1,1 \\rangle$. Area:', accept: ['sqrt(3)/2'], placeholder: 'Area', explanation: '$\\|\\langle 1,1,1 \\rangle\\| = \\sqrt{3}$. Triangle area = $\\frac{\\sqrt{3}}{2}$.' },
    { difficulty: 'hard', question: 'A particle moves along $\\vec{r}(t) = \\langle t^2, 3t \\rangle$.', parts: [
      { question: 'Find velocity $\\vec{v}(t)$:', accept: ['<2t, 3>', '(2t, 3)'], placeholder: 'Vector', explanation: '$\\vec{v}(t) = \\vec{r}\'(t) = \\langle 2t, 3 \\rangle$.' },
      { question: 'Find speed $|\\vec{v}(1)|$:', accept: ['sqrt(13)', '3.61'], placeholder: 'Number', explanation: '$|\\vec{v}(1)| = \\sqrt{4 + 9} = \\sqrt{13}$.' }
    ], completionMessage: 'Speed is the magnitude of velocity: $|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}$.' }
          ], completionMessage: 'Triangle area in 3D: half the cross product magnitude of two edge vectors.' }
        ],
        stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Vector Operation Selection</h4>
          <ul><li>Need a <strong>scalar</strong> (angle, projection, work)? → <strong>Dot product.</strong></li>
          <li>Need a <strong>perpendicular vector</strong> (area, torque, normal)? → <strong>Cross product.</strong></li>
          <li>Checking perpendicularity? → Dot product = 0.</li>
          <li>Checking parallelism? → Cross product = $\\vec{0}$.</li></ul></div>` }
      },
      {
        id: 'partial-derivatives',
        title: 'Partial Derivatives and Gradients',
        description: 'Extending derivatives to functions of multiple variables. How a surface changes in each direction.',
        prereqRecap: [
          { term: 'Derivative', definition: '$f\'(x)$ measures rate of change of $f$ with respect to $x$. For single-variable functions.' },
          { term: 'Gradient', definition: 'The vector of all partial derivatives: $\\nabla f = \\langle f_x, f_y \\rangle$. Points in the direction of steepest increase.' },
          { term: 'Chain Rule', definition: '$\\frac{d}{dx}f(g(x)) = f\'(g(x))g\'(x)$. Generalizes to multivariable.' }
        ],
        whyExists: { html: `
          <p><strong>Why partial derivatives?</strong> A function $f(x, y)$ depends on two inputs. The ordinary derivative asks how $f$ changes when a single input changes. A partial derivative $\\frac{\\partial f}{\\partial x}$ holds $y$ constant and measures how $f$ changes as $x$ alone varies. This isolates the effect of each variable independently.</p>
          <p><strong>Why the gradient?</strong> Combining all partial derivatives into $\\nabla f = \\langle f_x, f_y \\rangle$ creates a vector that points in the direction of <strong>steepest ascent</strong>. Its magnitude tells you how steep that ascent is. The gradient is the multivariable generalization of "the derivative tells you which way the function goes up."</p>
          <p><strong>Practical application:</strong> Gradient descent (the algorithm that trains neural networks) follows $-\\nabla f$ downhill to find minima. Weather maps use gradients of pressure to predict wind direction. Topographic maps illustrate gradients of elevation.</p>
          ${WHY('Why is $\\nabla f$ perpendicular to level curves?', '<p>A level curve is where $f(x,y) = c$ (constant). Moving along a level curve, $f$ does not change: $df = 0$. But $df = \\nabla f \\cdot d\\vec{r}$ where $d\\vec{r}$ is the direction of movement. For $df = 0$, we need $\\nabla f \\perp d\\vec{r}$. The gradient is perpendicular to the level curve because any direction along the curve produces zero change in $f$.</p>')}
        ` },
        hook: { html: `
          <div class="callout callout-puzzle"><h4>🧩 Puzzle: The Mountain Hiker</h4>
          <p>You stand on a mountainside at coordinates $(x, y)$ with elevation $h(x,y) = 1000 - x^2 - 2y^2$. You can walk east (positive $x$) or north (positive $y)$. Which direction is steeper?</p>
          <p>$\\frac{\\partial h}{\\partial x} = -2x$ measures the east-slope. $\\frac{\\partial h}{\\partial y} = -4y$ measures the north-slope. At $(1, 1)$: east-slope $= -2$, north-slope $= -4$. Walking north descends twice as fast.</p></div>` },
        concept: { html: `
          <p>For $f(x, y)$, the <strong>partial derivative</strong> $\\frac{\\partial f}{\\partial x}$ treats $y$ as a constant and differentiates with respect to $x$.</p>
          <div class="callout callout-key"><h4>The Gradient Vector</h4>
          <p>$\\nabla f = \\left\\langle \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y} \\right\\rangle$ points in the direction of <strong>steepest ascent</strong>. Its magnitude is the rate of steepest ascent.</p>
          <p>The negative gradient $-\\nabla f$ points toward steepest <strong>descent</strong> (used in gradient descent optimization, the engine behind machine learning).</p></div>
          <p><strong>Directional Derivative:</strong> Rate of change of $f$ in the direction of unit vector $\\hat{u}$:</p>
          <div class="math-block">$$D_{\\hat{u}} f = \\nabla f \\cdot \\hat{u}$$</div>
          <p><strong>Second Partial Derivatives and the Hessian:</strong></p>
          <ul>
            <li>$f_{xx} = \\frac{\\partial^2 f}{\\partial x^2}$, $f_{yy} = \\frac{\\partial^2 f}{\\partial y^2}$, $f_{xy} = \\frac{\\partial^2 f}{\\partial y \\partial x}$</li>
            <li><strong>Clairaut's Theorem:</strong> If $f_{xy}$ and $f_{yx}$ are continuous, then $f_{xy} = f_{yx}$.</li>
          </ul>` },
        definition: { html: `
          <p><strong>Second Derivative Test for Functions of Two Variables:</strong></p>
          <p>Let $D = f_{xx}f_{yy} - (f_{xy})^2$ at a critical point $(a, b)$ where $f_x = f_y = 0$:</p>
          <ul>
            <li>$D \\gt 0$ and $f_{xx} \\gt 0$: local minimum</li>
            <li>$D \\gt 0$ and $f_{xx} \\lt 0$: local maximum</li>
            <li>$D \\lt 0$: saddle point</li>
            <li>$D = 0$: inconclusive</li>
          </ul>` },
        examples: [{
          title: 'Finding the Gradient and Directional Derivative',
          problem: 'For $f(x,y) = x^2 y + y^3$, find $\\nabla f$ at $(1, 2)$ and the directional derivative in the direction $\\vec{v} = \\langle 3, 4 \\rangle$.',
          steps: [
            { title: 'Compute partial derivatives', content: '$f_x = 2xy$, $f_y = x^2 + 3y^2$', why: 'Differentiate with respect to one variable, treating the other as constant.' },
            { title: 'Evaluate at $(1, 2)$', content: '$\\nabla f(1,2) = \\langle 2(1)(2),\\; 1^2 + 3(4) \\rangle = \\langle 4, 13 \\rangle$', why: 'Substitute the point into the partial derivatives.' },
            { title: 'Find the unit vector', content: '$\\hat{v} = \\frac{\\langle 3,4 \\rangle}{\\sqrt{9+16}} = \\frac{\\langle 3,4 \\rangle}{5} = \\langle 0.6, 0.8 \\rangle$', why: 'Directional derivatives require a unit vector (magnitude 1).' },
            { title: 'Compute $D_{\\hat{v}} f$', content: '$D_{\\hat{v}} f = \\langle 4, 13 \\rangle \\cdot \\langle 0.6, 0.8 \\rangle = 2.4 + 10.4 = 12.8$', why: 'The dot product of the gradient with the direction gives the rate of change in that direction.' }
          ]
        }],
        exercises: [{
          difficulty: 'easy',
          question: 'If $f(x,y) = x^3 + 2xy$, what is $\\frac{\\partial f}{\\partial y}$?',
          options: ['$3x^2 + 2y$', '$2x$', '$3x^2 + 2x$', '$x^3 + 2x$'],
          correctIndex: 1,
          hint: '<p>Treat $x$ as a constant when differentiating with respect to $y$.</p>',
          correctExplanation: '$\\frac{\\partial}{\\partial y}[x^3] = 0$, $\\frac{\\partial}{\\partial y}[2xy] = 2x$. Total: $2x$.',
          wrongExplanations: { 0: '$3x^2$ comes from $\\partial/\\partial x$, not $\\partial/\\partial y$.', 2: 'Both terms differentiated w.r.t. $x$.', 3: '$x^3$ has $\\partial/\\partial y = 0$.' }
        },
        {
          difficulty: 'medium',
          question: 'For $f(x,y) = \\sin(xy)$, what is $f_x$?',
          options: ['$\\cos(xy)$', '$y\\cos(xy)$', '$x\\cos(xy)$', '$xy\\cos(xy)$'],
          correctIndex: 1,
          hint: '<p>Chain rule: derivative of $\\sin(u)$ is $\\cos(u) \\cdot u_x$.</p>',
          correctExplanation: '$f_x = \\cos(xy) \\cdot \\frac{\\partial(xy)}{\\partial x} = y\\cos(xy)$.',
          wrongExplanations: { 0: 'Missing the chain rule factor $y$.', 2: 'The chain rule factor is $y$ (derivative of $xy$ w.r.t. $x$), not $x$.', 3: 'Chain rule: $\\frac{\\partial(xy)}{\\partial x} = y$, not $xy$.' }
        },

    {
      question: 'For f(x,y) = xy + y^2, what is the partial derivative df/dx?',
      type: 'mc',
      options: ['y', 'x + 2y', 'xy', '1'],
      correctIndex: 0,
      solution: { steps: ['Treat y as a constant.', 'd/dx of xy = y (y is treated as a constant coefficient).', 'd/dx of y^2 = 0 (y^2 is a constant in x).', 'df/dx = y + 0 = y.'] }
    },
    {
      question: 'For f(x,y) = xy + y^2, what is df/dy?',
      type: 'mc',
      options: ['x + 2y', 'y', '2y', 'x'],
      correctIndex: 0,
      solution: { steps: ['Treat x as a constant.', 'd/dy of xy = x (x is the constant coefficient).', 'd/dy of y^2 = 2y.', 'df/dy = x + 2y.'] }
    }
    ],
        freeResponse: [
          { difficulty: 'easy', question: 'If $f(x,y) = x^2 + y^2$, what is $f_x$?', accept: ['2x'], placeholder: 'e.g. 2x', explanation: '$\\partial/\\partial x[x^2] = 2x$, $\\partial/\\partial x[y^2] = 0$.' },
          { difficulty: 'easy', question: 'If $f(x,y) = 5xy$, what is $f_y$?', accept: ['5x'], placeholder: 'e.g. 5x', explanation: 'Treat $x$ as constant: $f_y = 5x$.' },
          { difficulty: 'medium', question: '$\\nabla f$ for $f(x,y) = 3x - 2y + 1$:', accept: ['<3,-2>', '3,-2'], placeholder: '<a,b>', explanation: '$f_x = 3$, $f_y = -2$. $\\nabla f = \\langle 3, -2 \\rangle$.' },
          { difficulty: 'medium', question: 'If $f(x,y) = e^{xy}$, what is $f_x$?', accept: ['ye^(xy)', 'ye^{xy}'], placeholder: 'Expression', explanation: 'Chain rule: $e^{xy} \\cdot y = ye^{xy}$.' },
          { difficulty: 'hard', question: 'Find $f_{xy}$ for $f(x,y) = x^2y^3$:', accept: ['6xy^2', '6xy2'], placeholder: 'Expression', explanation: '$f_x = 2xy^3$. $f_{xy} = \\partial/\\partial y[2xy^3] = 6xy^2$.' },
    { difficulty: 'easy', question: '$\\frac{\\partial}{\\partial x}(3x + 2y) =$?', accept: [3, '3'], placeholder: 'Number', explanation: 'Treat $y$ as constant. $\\frac{\\partial}{\\partial x}(3x) = 3$.' },
    { difficulty: 'medium', question: '$\\frac{\\partial}{\\partial y}(x^2y^3) =$?', accept: ['3x^2y^2', '3x2y2'], placeholder: 'Expression', explanation: 'Hold $x$ constant, differentiate $y^3$: $x^2 \\cdot 3y^2 = 3x^2y^2$.' },
    { difficulty: 'easy', question: '$\\frac{\\partial}{\\partial x}(5x + 3y^2) =$?', accept: [5, '5'], placeholder: 'Number', explanation: '$\\frac{\\partial}{\\partial x}(5x) = 5$. $3y^2$ is constant w.r.t. $x$.' },
    { difficulty: 'hard', question: '$\\frac{\\partial^2}{\\partial x^2}(x^3y + xy^2) =$?', accept: ['6xy', '6xy'], placeholder: 'Expression', explanation: '$\\frac{\\partial}{\\partial x} = 3x^2y + y^2$. $\\frac{\\partial^2}{\\partial x^2} = 6xy$.' },
    { difficulty: 'easy', question: '$\\frac{\\partial}{\\partial y}(7) =$?', accept: [0, '0'], placeholder: 'Number', explanation: 'The derivative of a constant is 0.' },
    { difficulty: 'medium', question: 'Find $f_{xy}$ for $f(x,y) = x^2y + xy^3$:', accept: ['2x+3y^2', '2x + 3y^2'], placeholder: 'Expression', explanation: '$f_x = 2xy + y^3$. $f_{xy} = 2x + 3y^2$.' },
    { difficulty: 'medium', question: 'Gradient of $f(x,y) = x^2 + y^2$ at $(1, 1)$:', accept: ['<2,2>', '(2,2)', '<2, 2>'], placeholder: 'Vector', explanation: '$\\nabla f = \\langle 2x, 2y \\rangle$. At $(1,1)$: $\\langle 2, 2 \\rangle$.' },
    { difficulty: 'hard', question: 'Directional derivative of $f = xy$ at $(1,1)$ in direction $\\langle 1,1 \\rangle$:', accept: ['sqrt(2)', '1.41'], placeholder: 'Number', explanation: '$\\nabla f = \\langle y, x \\rangle = \\langle 1,1 \\rangle$. Unit: $\\langle 1/\\sqrt{2}, 1/\\sqrt{2} \\rangle$. $D_u f = 2/\\sqrt{2} = \\sqrt{2}$.' },
    { difficulty: 'hard', question: 'Critical point of $f(x,y) = x^2 + y^2 - 2x$: $(x,y) =$?', accept: ['(1,0)'], placeholder: 'Point', explanation: '$f_x = 2x-2 = 0 \\Rightarrow x=1$. $f_y = 2y = 0 \\Rightarrow y=0$.' },
    { difficulty: 'hard', question: 'Laplacian of $f = x^2 + y^2$: $\\nabla^2 f =$?', accept: [4, '4'], placeholder: 'Number', explanation: '$f_{xx} = 2$, $f_{yy} = 2$. $\\nabla^2 f = 2 + 2 = 4$.' },
    { difficulty: 'medium', question: 'The chain rule in multivariable: $\\frac{dz}{dt} = \\frac{\\partial z}{\\partial x}\\frac{dx}{dt} +$ ?', accept: ['dz/dy*dy/dt', '(dz/dy)(dy/dt)'], placeholder: 'Term', explanation: 'Multivariable chain rule: $\\frac{\\partial z}{\\partial y}\\frac{dy}{dt}$.' }
        ],
        stepBuilder: [
          { difficulty: 'medium', question: 'Find gradient of $f(x,y) = x^2y - y^2$ at $(2,1)$.', steps: [
            { content: '$f_x = 2xy$. At $(2,1)$: $f_x = 4$.' },
            { content: '$f_y = x^2 - 2y$. At $(2,1)$: $f_y = 4 - 2 = 2$.' },
            { content: '$\\nabla f(2,1) = \\langle 4, 2 \\rangle$.' },
    { difficulty: 'hard', question: 'Find the tangent plane to $f(x,y) = x^2 + y^2$ at $(1, 1, 2)$.', steps: [
      { content: '$f_x = 2x \\Rightarrow f_x(1,1) = 2$.' },
      { content: '$f_y = 2y \\Rightarrow f_y(1,1) = 2$.' },
      { content: '$z - 2 = 2(x-1) + 2(y-1)$. $z = 2x + 2y - 2$.' }
    ], explanation: 'Tangent plane: $z - f(a,b) = f_x(a,b)(x-a) + f_y(a,b)(y-b)$.' }
          ], explanation: 'Gradient: compute each partial, then evaluate at the point.' }
        ],
        matching: [
          { difficulty: 'easy', instruction: 'Match each concept:', pairs: [
            { left: '$\\nabla f$', right: 'Direction of steepest ascent' },
            { left: '$-\\nabla f$', right: 'Direction of steepest descent' },
            { left: '$D_{\\hat{u}}f$', right: 'Rate of change in direction $\\hat{u}$' },
            { left: '$f_{xy} = f_{yx}$', right: 'Clairaut\'s Theorem' }
          ] }
        ],
        fillBlanks: [
          { difficulty: 'easy', context: 'Partial derivatives:', expression: 'When computing $\\frac{\\partial f}{\\partial x}$, treat {{0}} as a constant.', blanks: [ { accept: ['y'], size: 3 } ], explanation: 'Hold other variables constant.' },
    { difficulty: 'medium', context: 'Gradient:', expression: '$\\nabla f = \\langle \\frac{\\partial f}{\\partial x},$ {{0}} $\\rangle$', blanks: [ { accept: ['df/dy', '\\frac{\\partial f}{\\partial y}'], size: 8 } ], explanation: 'Gradient: partial derivatives as components.' }
        ],
        stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Partial Derivative Strategy</h4>
          <ol><li><strong>Cover up</strong> all other variables: treat them as constants.</li>
          <li><strong>Differentiate</strong> using standard single-variable rules.</li>
          <li><strong>Gradient</strong> = vector of all partial derivatives.</li>
          <li><strong>Direction of steepest ascent</strong> = direction of the gradient.</li></ol></div>` }
      },
      {
        id: 'multiple-integrals',
        title: 'Multiple Integrals',
        description: 'Integration over regions in 2D and 3D. Computing area, volume, mass, and total quantities.',
        prereqRecap: [
          { term: 'Definite Integral', definition: '$\\int_a^b f(x)\\,dx$ computes signed area under $f$ from $a$ to $b$.' },
          { term: 'Iterated Integration', definition: 'Integrating one variable at a time: $\\int\\int f(x,y)\\,dy\\,dx$.' },
          { term: 'Polar Coordinates', definition: '$(r, \\theta)$ where $x = r\\cos\\theta$, $y = r\\sin\\theta$. Useful for circular regions.' }
        ],
        whyExists: { html: `
          <p><strong>Why double and triple integrals?</strong> A single integral computes a 1D accumulated quantity (area under a curve, total distance from velocity). A <strong>double integral</strong> $\\iint f(x,y)\\,dA$ computes a 2D accumulated quantity: volume under a surface, mass of a flat plate, total charge on a membrane. A <strong>triple integral</strong> extends to 3D: volume of a solid, total mass of a 3D object.</p>
          <p><strong>Why change coordinates?</strong> Circular regions are awkward in $(x,y)$ but natural in $(r,\\theta)$. The <strong>Jacobian</strong> ($r$ for polar, $r^2\\sin\\phi$ for spherical) accounts for how the coordinate grid stretches or compresses. Choosing the right coordinates can turn an impossible integral into a trivial one.</p>
          <p><strong>Practical application:</strong> Engineers compute center of mass, moment of inertia, and fluid flow using multiple integrals. Probability theory uses double integrals over joint density functions. Electromagnetics relies on volume integrals for charge distributions.</p>
          ${WHY('Why does Fubini\'s theorem let us integrate one variable at a time?', '<p>Fubini\'s theorem says $\\iint_R f(x,y)\\,dA = \\int_a^b\\left(\\int_{c(x)}^{d(x)} f(x,y)\\,dy\\right)dx$. The inner integral treats $x$ as constant and accumulates along $y$. The outer integral then accumulates those results along $x$. This works because the rectangle $dA = dx\\,dy$ can be built by stacking thin strips. The theorem holds when $f$ is continuous, ensuring the order does not matter.</p>')}
        ` },
        hook: { html: `
          <div class="callout callout-puzzle"><h4>🧩 Puzzle: Volume Under a Surface</h4>
          <p>A dome has shape $z = 4 - x^2 - y^2$ (a paraboloid). What volume does it enclose above the $xy$-plane?</p>
          <p>Slice it into thin layers. Each layer has area $\\pi r^2$. Sum all layers. This is a <strong>double integral</strong>: $\\int\\int (4 - x^2 - y^2)\\,dA$.</p></div>` },
        concept: { html: `
          <div class="callout callout-key"><h4>Double Integrals</h4>
          <p>$\\iint_R f(x,y)\\,dA$ computes the "volume" under the surface $z = f(x,y)$ over region $R$.</p>
          <p><strong>Iterated Integrals (Fubini's Theorem):</strong></p>
          $$\\iint_R f(x,y)\\,dA = \\int_a^b \\int_{g_1(x)}^{g_2(x)} f(x,y)\\,dy\\,dx$$
          <p>Integrate the inner variable first, then the outer.</p></div>
          <div class="callout callout-key"><h4>Coordinate Systems</h4>
          <ul>
            <li><strong>Polar ($r, \\theta$):</strong> $dA = r\\,dr\\,d\\theta$. Use for circular symmetry.</li>
            <li><strong>Cylindrical ($r, \\theta, z$):</strong> $dV = r\\,dr\\,d\\theta\\,dz$. Polar + height.</li>
            <li><strong>Spherical ($\\rho, \\theta, \\phi$):</strong> $dV = \\rho^2 \\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta$. For spheres.</li>
          </ul></div>` },
        definition: { html: `
          <p><strong>The Big Theorems of Vector Calculus:</strong></p>
          <div class="callout callout-key"><h4>Green's Theorem (2D)</h4>
          <p>$\\oint_C (P\\,dx + Q\\,dy) = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right)dA$</p>
          <p>Relates a line integral around a closed curve to a double integral over the enclosed region.</p></div>
          <div class="callout callout-key"><h4>Stokes' Theorem (3D surfaces)</h4>
          <p>$\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot d\\vec{S}$</p>
          <p>Relates a line integral to a surface integral of the curl.</p></div>
          <div class="callout callout-key"><h4>Divergence Theorem</h4>
          <p>$\\oiint_S \\vec{F} \\cdot d\\vec{S} = \\iiint_E (\\nabla \\cdot \\vec{F})\\,dV$</p>
          <p>Relates a surface integral (flux) to a volume integral of the divergence.</p></div>
          <p>These three theorems are higher-dimensional generalizations of the Fundamental Theorem of Calculus.</p>` },
        examples: [{
          title: 'Evaluating a Double Integral',
          problem: 'Compute $\\int_0^2 \\int_0^x (x + y)\\,dy\\,dx$.',
          steps: [
            { title: 'Integrate inner (with respect to $y$)', content: '$\\int_0^x (x+y)\\,dy = \\left[xy + \\frac{y^2}{2}\\right]_0^x = x \\cdot x + \\frac{x^2}{2} = x^2 + \\frac{x^2}{2} = \\frac{3x^2}{2}$', why: 'Treat $x$ as a constant when integrating with respect to $y$. Evaluate at the bounds $y = 0$ and $y = x$.' },
            { title: 'Integrate outer (with respect to $x$)', content: '$\\int_0^2 \\frac{3x^2}{2}\\,dx = \\frac{3}{2} \\cdot \\frac{x^3}{3}\\Big|_0^2 = \\frac{3}{2} \\cdot \\frac{8}{3} = 4$', why: 'Now $x$ is the variable. Standard power rule integration.' }
          ]
        }],
        exercises: [{
          difficulty: 'easy',
          question: 'In a double integral $\\int_a^b \\int_{c}^{d} f(x,y)\\,dy\\,dx$, which variable do you integrate first?',
          options: ['$x$', '$y$', 'Either', 'Neither'],
          correctIndex: 1,
          hint: '<p>Inner integral first.</p>',
          correctExplanation: 'The inner integral (closest to $f$) is integrated first: $y$.',
          wrongExplanations: { 0: 'The outer variable $x$ is integrated last.', 2: 'Order matters: inner first, then outer.', 3: 'Both are integrated.' }
        },
        {
          difficulty: 'medium',
          question: 'Convert $\\iint_R f(x,y)\\,dA$ to polar coordinates. What replaces $dA$?',
          options: ['$dr\\,d\\theta$', '$r\\,dr\\,d\\theta$', '$r^2\\,dr\\,d\\theta$', '$\\frac{1}{r}\\,dr\\,d\\theta$'],
          correctIndex: 1,
          hint: '<p>Jacobian of polar transformation.</p>',
          correctExplanation: 'Jacobian is $r$, so $dA = r\\,dr\\,d\\theta$.',
          wrongExplanations: { 0: 'Missing the $r$ factor.', 2: '$r^2$ is for spherical.', 3: 'Jacobian multiplies, not divides.' }
        }],
        freeResponse: [
          { difficulty: 'easy', question: '$\\int_0^1 \\int_0^1 1\\,dy\\,dx =$? (area of unit square)', accept: [1, '1'], placeholder: 'Number', explanation: '$\\int_0^1 1\\,dx = 1$. Total: $1$.' },
          { difficulty: 'easy', question: '$\\int_0^2 \\int_0^1 x\\,dy\\,dx =$?', accept: [2, '2'], placeholder: 'Number', explanation: 'Inner: $\\int_0^1 x\\,dy = x$. Outer: $\\int_0^2 x\\,dx = 2$.' },
          { difficulty: 'medium', question: '$\\int_0^1 \\int_0^x y\\,dy\\,dx =$?', accept: ['1/6'], placeholder: 'Fraction', explanation: 'Inner: $\\frac{x^2}{2}$. Outer: $\\int_0^1 \\frac{x^2}{2}\\,dx = \\frac{1}{6}$.' },
          { difficulty: 'medium', question: 'In polar coordinates, $dA =$?', accept: ['r dr dtheta', 'r*dr*dtheta'], placeholder: 'e.g. r dr dtheta', explanation: '$dA = r\\,dr\\,d\\theta$. The $r$ is the Jacobian.' },
          { difficulty: 'hard', question: 'In polar, the area of the unit disk ($r \\leq 1$) using $\\int\\int r\\,dr\\,d\\theta$:', accept: ['pi', '\\pi', '3.14'], placeholder: 'Area', explanation: '$\\int_0^{2\\pi}\\int_0^1 r\\,dr\\,d\\theta = 2\\pi \\cdot \\frac{1}{2} = \\pi$.' },
    { difficulty: 'easy', question: '$\\int_0^1 \\int_0^1 1\\,dx\\,dy =$?', accept: [1, '1'], placeholder: 'Number', explanation: 'Area of unit square: $1 \\times 1 = 1$.' },
    { difficulty: 'medium', question: '$\\int_0^1 \\int_0^2 xy\\,dx\\,dy =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\int_0^1 [x^2y/2]_0^2 dy = \\int_0^1 2y\\,dy = [y^2]_0^1 = 1$.' },
    { difficulty: 'easy', question: '$\\int_0^2 \\int_0^3 1\\,dx\\,dy =$?', accept: [6, '6'], placeholder: 'Number', explanation: 'Area: $3 \\times 2 = 6$.' },
    { difficulty: 'hard', question: '$\\int_0^1 \\int_0^x 2\\,dy\\,dx =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\int_0^1 2x\\,dx = [x^2]_0^1 = 1$.' },
    { difficulty: 'easy', question: '$\\int_0^1 \\int_0^1 (x + y)\\,dx\\,dy =$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\int_0^1 [x^2/2 + xy]_0^1\\,dy = \\int_0^1 (1/2 + y)\\,dy = 1/2 + 1/2 = 1$.' },
    { difficulty: 'hard', question: 'Convert $\\int\\int_R f\\,dA$ to polar: $dA =$?', accept: ['r dr dtheta', 'r dr d\\theta', 'rdrd\\theta'], placeholder: 'Expression', explanation: 'In polar coordinates, $dA = r\\,dr\\,d\\theta$.' },
    { difficulty: 'medium', question: '$\\int_0^2 \\int_0^x y\\,dy\\,dx =$?', accept: ['4/3', '1.33'], placeholder: 'Number', explanation: '$\\int_0^2 [y^2/2]_0^x dx = \\int_0^2 x^2/2\\,dx = [x^3/6]_0^2 = 4/3$.' },
    { difficulty: 'medium', question: 'To switch $\\int_0^1 \\int_0^x f\\,dy\\,dx$ to $dx\\,dy$, the outer integral becomes:', accept: ['0 to 1', '[0,1]'], placeholder: 'Bounds', explanation: '$y$ ranges from 0 to 1. For fixed $y$, $x$ ranges from $y$ to 1.' },
    { difficulty: 'medium', question: 'Fubini\'s theorem allows switching the order of:', accept: ['integration', 'iterated integrals'], placeholder: 'What?', explanation: 'Fubini: $\\int\\int f\\,dA$ can be computed in either order when $f$ is continuous.' }
        ],
        stepBuilder: [
          { difficulty: 'medium', question: 'Evaluate $\\int_0^2 \\int_0^x (x+y)\\,dy\\,dx$.', steps: [
            { content: 'Inner: $\\int_0^x (x+y)\\,dy = [xy + y^2/2]_0^x = x^2 + x^2/2 = 3x^2/2$.' },
            { content: 'Outer: $\\int_0^2 \\frac{3x^2}{2}\\,dx = \\frac{3}{2} \\cdot \\frac{8}{3} = 4$.' }
          ], explanation: 'Inner integral treats $x$ as constant. Then integrate result over $x$.' }
        ],
        matching: [
          { difficulty: 'easy', instruction: 'Match coordinate system to its volume element:', pairs: [
            { left: 'Cartesian', right: '$dx\\,dy\\,dz$' },
            { left: 'Polar/Cylindrical', right: '$r\\,dr\\,d\\theta\\,dz$' },
            { left: 'Spherical', right: '$\\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta$' }
          ] }
        ],
        fillBlanks: [
          { difficulty: 'medium', context: 'Polar conversion:', expression: 'In polar coordinates, $dA = $ {{0}} $dr\\,d\\theta$.', blanks: [ { accept: ['r'], size: 3 } ], explanation: 'The Jacobian of the polar transformation is $r$.' }
        ],
        stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Multiple Integral Strategy</h4>
          <ol><li><strong>Sketch the region.</strong> Understand its boundaries before setting up limits.</li>
          <li><strong>Choose coordinates:</strong> Circular region? Use polar. Spherical region? Use spherical.</li>
          <li><strong>Set up limits:</strong> Inner limits can be functions of the outer variable. Outer limits are constants.</li>
          <li><strong>Include the Jacobian:</strong> $r$ for polar/cylindrical, $\\rho^2\\sin\\phi$ for spherical.</li></ol></div>` }
      }
    ]
  });
})();
