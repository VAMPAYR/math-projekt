/* ============================================================
   MODULE: Geometry
   Basic shapes, triangles, circles, area/volume, coordinate geometry
   Source: Precalculus (Stewart) geometry chapters
   ============================================================ */
(function() {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];
  const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

  window.MATH_MODULES.push({
    id: 'geometry',
    order: 3,
    title: 'Geometry',
    description: 'Points, lines, angles, triangles, circles, and area. The visual side of mathematics. Requires: arithmetic (Module 1).',
    topics: [

    /* ============ TOPIC 1: Points, Lines, and Angles ============ */
    {
      id: 'points-lines-angles',
      title: 'Points, Lines, and Angles',
      description: 'The undefined terms of geometry and how angles are measured and classified.',
      prereqRecap: [
        { term: 'Number Line', definition: 'A line where each point corresponds to a real number. Used to measure distance.' },
        { term: 'Measurement', definition: 'Assigning a number to a physical quantity (length, angle).' }
      ],
      whyExists: { html: `
        <p><strong>Why study geometry?</strong> Geometry is the oldest branch of mathematics. It originated from the practical need to measure land (geo = earth, metron = measurement). The Egyptian surveyors who rebuilt property boundaries after Nile floods were doing geometry.</p>
        <p><strong>Why start with points, lines, and angles?</strong> Euclid (300 BC) built ALL of geometry from just five axioms (postulates) and three undefined terms: <strong>point</strong>, <strong>line</strong>, and <strong>plane</strong>. Every geometric fact follows logically from these starting assumptions. This makes geometry the first fully <strong>axiomatic</strong> system in human history.</p>
        <p><strong>Practical application:</strong> Architecture, engineering drawings, surveying, computer graphics, robotics path planning, and GPS triangulation all depend on geometric principles.</p>
        ${WHY('What are Euclid\'s five postulates?', '<p>1. A line segment can be drawn between any two points. 2. A line segment can be extended infinitely. 3. A circle can be drawn with any center and radius. 4. All right angles are equal. 5. (Parallel Postulate) Through a point not on a line, exactly one parallel line exists. The fifth postulate is special: denying it produces non-Euclidean geometry (used in Einstein\'s General Relativity).</p>')}
      ` },
      hook: { html: `
        <div class="callout callout-puzzle"><h4>🧩 Puzzle: The Angles in a Triangle</h4>
        <p>Draw any triangle. Measure all three angles. Add them up. You always get $180°$. Why? Tear the three corners off a paper triangle and arrange them along a straight line. They fit perfectly. A straight line is $180°$, and the three angles of a triangle reconstruct exactly one straight line.</p></div>` },
      formalDefinitions: [
      { term: 'Point', symbol: '', definition: 'A location in space with no dimension (no length, width, or height). Represented by a dot and named with a capital letter.' },
      { term: 'Line', symbol: '$\\overleftrightarrow{AB}$', definition: 'A straight path extending infinitely in both directions. Defined by any two distinct points. Has one dimension (length only).' },
      { term: 'Angle', symbol: '$\\angle ABC$', definition: 'Formed by two rays sharing a common endpoint (vertex). Measured in degrees ($0^\\circ$ to $360^\\circ$) or radians ($0$ to $2\\pi$).' },
      { term: 'Parallel Lines', symbol: '$\\ell_1 \\parallel \\ell_2$', definition: 'Lines in the same plane that never intersect. Have equal slopes. If cut by a transversal, alternate interior angles are equal.' },
      { term: 'Perpendicular Lines', symbol: '$\\ell_1 \\perp \\ell_2$', definition: 'Lines that intersect at a $90^\\circ$ angle. The product of their slopes is $-1$: $m_1 \\cdot m_2 = -1$.' }
    ],
    background: {
      title: 'Why Geometry? Measuring the Earth',
      content: '<p>The word <strong>geometry</strong> comes from Greek: <em>geo</em> (earth) + <em>metron</em> (measure). It literally means "measuring the earth." Egyptians needed it to re-survey farmland after the Nile flooded every year.</p><p><strong>Euclid\'s Elements</strong> (300 BCE) organized geometry into axioms, definitions, and proofs. It remained the standard textbook for over 2,000 years. The axiomatic method Euclid used (start with obvious truths, derive everything else) became the model for all of mathematics.</p><p><strong>Why angles are measured in degrees:</strong> The Babylonians used a base-60 number system. Since 360 is close to 365 (days in a year) and divisible by 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, and 180, they chose $360^\\circ$ for a full rotation. This convention persists today.</p>'
    },
    mathGrammar: [
      { question: 'Why do angles in a triangle always add to $180^\\circ$?', answer: 'Draw a triangle and extend one side. The exterior angle plus the interior angle form a straight line ($180^\\circ$). Now use the fact that alternate interior angles (from parallel lines) are equal. This forces the three interior angles to sum to exactly $180^\\circ$.' },
      { question: 'What does "perpendicular" mean and why does $m_1 \\cdot m_2 = -1$?', answer: 'Perpendicular means "at right angles" ($90^\\circ$). If one line goes up 2 for every 1 across (slope $2$), the perpendicular line must go down 1 for every 2 across (slope $-\\frac{1}{2}$). The product $2 \\times (-\\frac{1}{2}) = -1$ always holds for perpendicular lines.' },
      { question: 'Why is area measured in "square units"?', answer: 'Area measures how many unit squares fit inside a shape. A rectangle $3 \\times 4$ contains $12$ squares of size $1 \\times 1$. The word "square" in "square meters" refers to these unit squares, not to the shape being measured.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 500 130" width="500" height="130" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="100" x2="100" y2="100" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="20" y1="100" x2="75" y2="50" stroke="#3b82f6" stroke-width="1.5"/>
  <path d="M 40 100 A 20 20 0 0 1 35 85" fill="none" stroke="#3b82f6" stroke-width="1"/>
  <text x="50" y="118" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="Inter">Acute</text>
  <text x="48" y="88" fill="#3b82f6" font-size="10" font-family="Inter">45°</text>

  <line x1="150" y1="100" x2="230" y2="100" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="150" y1="100" x2="150" y2="35" stroke="#10b981" stroke-width="1.5"/>
  <rect x="150" y="85" width="12" height="12" fill="none" stroke="#10b981" stroke-width="1"/>
  <text x="180" y="118" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="Inter">Right</text>
  <text x="168" y="70" fill="#10b981" font-size="10" font-family="Inter">90°</text>

  <line x1="280" y1="100" x2="360" y2="100" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="280" y1="100" x2="310" y2="40" stroke="#f59e0b" stroke-width="1.5"/>
  <path d="M 300 100 A 20 20 0 0 1 292 78" fill="none" stroke="#f59e0b" stroke-width="1"/>
  <text x="310" y="118" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="Inter">Obtuse</text>
  <text x="305" y="82" fill="#f59e0b" font-size="10" font-family="Inter">120°</text>

  <line x1="400" y1="100" x2="480" y2="100" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="400" y1="100" x2="330" y2="100" stroke="#ef4444" stroke-width="1.5"/>
  <path d="M 420 100 A 20 20 0 1 1 380 100" fill="none" stroke="#ef4444" stroke-width="1"/>
  <text x="400" y="118" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="Inter">Straight</text>
  <text x="400" y="75" fill="#ef4444" font-size="10" text-anchor="middle" font-family="Inter">180°</text>
</svg>
</div>
<p class="math-diagram-label">Angle classification: acute (0°–90°), right (90°), obtuse (90°–180°), straight (180°)</p>

        <div class="callout callout-key"><h4>Undefined Terms</h4>
        <p><strong>Point:</strong> A location with no size. Represented by a dot, labeled with a capital letter ($A$, $B$, $C$).</p>
        <p><strong>Line:</strong> A straight path extending infinitely in both directions. Determined by any two points.</p>
        <p><strong>Plane:</strong> A flat surface extending infinitely in all directions. Determined by three non-collinear points.</p>
        ${WHY('Why are these "undefined"?', '<p>Every definition uses simpler terms. Eventually you reach terms so basic they cannot be defined using anything simpler. These are <strong>primitive notions</strong>. We accept them intuitively and build everything else on top of them.</p>')}</div>

        <div class="callout callout-key"><h4>Angles</h4>
        <p>An <strong>angle</strong> is formed by two rays sharing a common endpoint (vertex).</p>
        <ul>
          <li><strong>Acute:</strong> $0° \\lt \\theta \\lt 90°$</li>
          <li><strong>Right:</strong> $\\theta = 90°$ (marked with a small square)</li>
          <li><strong>Obtuse:</strong> $90° \\lt \\theta \\lt 180°$</li>
          <li><strong>Straight:</strong> $\\theta = 180°$ (a line)</li>
          <li><strong>Reflex:</strong> $180° \\lt \\theta \\lt 360°$</li>
        </ul></div>

        <div class="callout callout-key"><h4>Angle Relationships</h4>
        <ul>
          <li><strong>Complementary:</strong> Two angles summing to $90°$.</li>
          <li><strong>Supplementary:</strong> Two angles summing to $180°$.</li>
          <li><strong>Vertical Angles:</strong> When two lines cross, opposite angles are equal. WHY: each pair sums to $180°$ with the same adjacent angle, so they must be equal.</li>
          <li><strong>Corresponding Angles:</strong> When a transversal crosses parallel lines, corresponding angles are equal. This is a <em>consequence</em> of the Parallel Postulate.</li>
        </ul></div>

        <div class="callout callout-key"><h4>Parallel and Perpendicular Lines</h4>
        <p><strong>Parallel lines</strong> ($\\ell_1 \\| \\ell_2$) never intersect. They have the same slope in coordinate geometry.</p>
        <p><strong>Perpendicular lines</strong> ($\\ell_1 \\perp \\ell_2$) intersect at $90°$. Their slopes are negative reciprocals: $m_1 \\cdot m_2 = -1$.</p>
        ${WHY('Why negative reciprocals?', '<p>Rotating a line by $90°$ sends slope $m$ to $-1/m$. This follows from the fact that a $90°$ rotation swaps the rise and run and negates one of them. If the original slope is $\\\\frac{a}{b}$, the perpendicular slope is $-\\\\frac{b}{a}$, so their product is $-1$.</p>')}</div>
      ` },
      definition: { html: `<p><strong>Angle:</strong> The figure formed by two rays sharing a common endpoint. Measured in degrees ($°$) or radians.</p><p><strong>Parallel Lines:</strong> Lines in the same plane that never intersect.</p>` },
      examples: [{
        title: 'Finding Unknown Angles',
        problem: 'Two angles are supplementary. One is $35°$ more than twice the other. Find both angles.',
        steps: [
          { title: 'Set up variables', content: 'Let $x$ = smaller angle. Then larger angle = $2x + 35$.', why: 'Translate "35 more than twice" into algebra.' },
          { title: 'Use supplementary relationship', content: '$x + (2x + 35) = 180$', why: 'Supplementary angles sum to $180°$. This is the definition.' },
          { title: 'Solve', content: '$3x + 35 = 180 \\Rightarrow 3x = 145 \\Rightarrow x = 48.\\overline{3}°$', why: 'Standard linear equation solving.' },
          { title: 'Find both', content: 'Smaller = $48.\\overline{3}°$, Larger = $2(48.\\overline{3}) + 35 = 131.\\overline{6}°$. Check: $48.\\overline{3} + 131.\\overline{6} = 180°$ ✓', why: 'Always verify the constraint is satisfied.' }
        ]
      },
      {
        title: 'Parallel Lines and Transversals',
        problem: 'A transversal crosses two parallel lines. One angle is $3x + 10$ degrees, and the co-interior angle is $2x + 20$ degrees. Find $x$.',
        steps: [
          { title: 'Identify relationship', content: 'Co-interior (same-side interior) angles between parallel lines are supplementary.', why: 'This follows from the Parallel Postulate: corresponding angles are equal, and adjacent angles on a straight line sum to $180°$.' },
          { title: 'Set up equation', content: '$(3x + 10) + (2x + 20) = 180$', why: 'Co-interior angles sum to $180°$.' },
          { title: 'Solve', content: '$5x + 30 = 180 \\Rightarrow 5x = 150 \\Rightarrow x = 30$', why: 'Combine like terms, subtract 30, divide by 5.' },
          { title: 'Find angles', content: '$3(30) + 10 = 100°$ and $2(30) + 20 = 80°$. Check: $100 + 80 = 180°$ ✓', why: 'Verification confirms the parallel-line property holds.' }
        ]
      }],
      flashCards: [
      { type: 'define', front: 'What is a point?', back: 'An exact location with no size. One of Euclid’s three undefined terms. Named with a capital letter like A or P.' },
      { type: 'why', front: 'Why do triangle angles sum to 180 degrees?', back: 'Tear corners off a paper triangle, arrange along a line. They fit perfectly. A line = 180 degrees.' },
      { type: 'define', front: 'Acute vs Right vs Obtuse?', back: 'Acute: less than 90 degrees. Right: exactly 90. Obtuse: between 90 and 180. Straight: exactly 180.' },
      { type: 'how', front: 'Find a missing triangle angle?', back: 'Three angles sum to 180. Subtract known angles: 180 - 50 - 70 = 60 degrees.' }
    ],
    exercises: [
        { difficulty: 'easy', question: 'An angle measures $47°$. What is its complement?', options: ['$43°$', '$133°$', '$47°$', '$90°$'], correctIndex: 0, hint: '<p>Complementary angles sum to $90°$.</p>', correctExplanation: '$90° - 47° = 43°$. Complementary means the two angles form a right angle together.', wrongExplanations: { 1: '$180° - 47° = 133°$ is the supplement, not the complement.', 2: 'An angle is not its own complement unless it is $45°$.', 3: '$90°$ is a right angle, not the complement of $47°$.' } },
        { difficulty: 'easy', question: 'Vertical angles are always:', options: ['Supplementary', 'Equal', 'Complementary', 'Right angles'], correctIndex: 1, hint: '<p>When two lines cross, opposite angles are formed.</p>', correctExplanation: 'Vertical angles are equal. If one is $x°$, the adjacent angle is $180° - x°$, and the opposite angle must also be $x°$ because it is supplementary to the same adjacent angle.', wrongExplanations: { 0: 'Adjacent angles are supplementary. Vertical angles are equal.', 2: 'Complementary means summing to $90°$, which is not generally true for vertical angles.', 3: 'Vertical angles can be any measure, not necessarily $90°$.' } },
        { difficulty: 'medium', question: 'Two parallel lines are cut by a transversal. If one angle is $72°$, the alternate interior angle is:', options: ['$108°$', '$72°$', '$18°$', '$144°$'], correctIndex: 1, hint: '<p>Alternate interior angles between parallel lines are equal.</p>', correctExplanation: 'Alternate interior angles are equal when lines are parallel. This is a consequence of the Parallel Postulate.', wrongExplanations: { 0: '$108°$ is the co-interior (same-side interior) angle, not the alternate interior.', 2: '$90° - 72° = 18°$ is the complement, unrelated here.', 3: '$2 \\times 72° = 144°$ has no geometric significance here.' } },
        { difficulty: 'medium', question: 'If two lines are perpendicular, the product of their slopes is:', options: ['$0$', '$1$', '$-1$', 'Undefined'], correctIndex: 2, hint: '<p>Perpendicular means $90°$ intersection.</p>', correctExplanation: '$m_1 \\cdot m_2 = -1$ for perpendicular lines. This follows from the geometry of $90°$ rotation.', wrongExplanations: { 0: 'Slope product = $0$ means one line is horizontal, which does not guarantee perpendicularity.', 1: 'Slope product = $1$ means the lines have the same steepness, not perpendicularity.', 3: 'Undefined occurs if one line is vertical and the other horizontal (a special case where the rule still holds conceptually).' } }
      ,

    {
      question: 'Two angles are supplementary. One measures 65 degrees. The other measures:',
      type: 'mc',
      options: ['115 degrees', '25 degrees', '90 degrees', '295 degrees'],
      correctIndex: 0,
      solution: { steps: ['Supplementary angles sum to 180 degrees.', '180 - 65 = 115 degrees.'] }
    },
    {
      question: 'Two vertical angles are formed by intersecting lines. If one angle is 40 degrees, the angle directly opposite it is:',
      type: 'mc',
      options: ['40 degrees', '140 degrees', '50 degrees', '320 degrees'],
      correctIndex: 0,
      solution: { steps: ['Vertical angles are always equal.', 'The opposite angle is also 40 degrees.'] }
    },
    {
      question: 'A triangle has angles of 30 degrees and 90 degrees. The third angle is:',
      type: 'mc',
      options: ['60 degrees', '30 degrees', '180 degrees', '120 degrees'],
      correctIndex: 0,
      solution: { steps: ['Angles sum to 180: 30 + 90 + x = 180.', 'x = 180 - 120 = 60 degrees.'] }
    }
    ],
    matching: [
      {
        instruction: 'Match each angle type to its measure:',
        pairs: [
          { term: 'Acute angle', definition: 'Less than 90 degrees' },
          { term: 'Right angle', definition: 'Exactly 90 degrees' },
          { term: 'Obtuse angle', definition: 'Between 90 and 180 degrees' },
          { term: 'Straight angle', definition: 'Exactly 180 degrees' },
          { term: 'Reflex angle', definition: 'Between 180 and 360 degrees' }
        ]
      }
    ],
    fillBlanks: [
      { sentence: 'Two angles that add up to 90 degrees are called ____ angles.', answer: 'complementary', hint: 'Think: they COMPLETE a right angle.' },
      { sentence: 'Two angles that add up to 180 degrees are called ____ angles.', answer: 'supplementary', hint: 'Think: they SUPPLEMENT each other to form a straight line.' },
      { sentence: 'When two lines intersect, the opposite angles are called ____ angles and they are always equal.', answer: 'vertical', hint: 'They share a vertex but no sides.' },
      { sentence: 'The sum of all angles in a triangle is always ____ degrees.', answer: '180', hint: 'Tear the three corners: they form a straight line.' },
    { difficulty: 'easy', context: 'Angle relationships:', expression: 'Two angles that add to $90°$ are called {{0}}.', blanks: [ { accept: ['complementary'], size: 14 } ], explanation: 'Complementary angles sum to $90°$.' }
    ],
      freeResponse: [
        { difficulty: 'easy', question: 'The supplement of a $115°$ angle is:', accept: [65, '65', '65°'], placeholder: 'Degrees', explanation: '$180° - 115° = 65°$.' },
        { difficulty: 'easy', question: 'The complement of a $37°$ angle is:', accept: [53, '53', '53°'], placeholder: 'Degrees', explanation: '$90° - 37° = 53°$.' },
        { difficulty: 'medium', question: 'Two supplementary angles differ by $40°$. Find the larger angle:', accept: [110, '110', '110°'], placeholder: 'Degrees', hint: '<p>$x + (x + 40) = 180$.</p>', explanation: '$2x + 40 = 180$, $2x = 140$, $x = 70$. Larger = $110°$.' },
        { difficulty: 'medium', question: 'A triangle has angles $x$, $2x$, and $3x$. Find $x$:', accept: [30, '30', '30°'], placeholder: 'Degrees', hint: '<p>$x + 2x + 3x = 180$.</p>', explanation: '$6x = 180$, $x = 30°$. Angles: $30°, 60°, 90°$ (a 30-60-90 triangle).' },
        { difficulty: 'hard', question: 'In a parallelogram, one angle is $65°$. Find the adjacent angle:', accept: [115, '115', '115°'], placeholder: 'Degrees', explanation: 'Adjacent angles in a parallelogram are supplementary: $180° - 65° = 115°$.' },
    { difficulty: 'easy', question: 'If an angle is $40°$, its supplement is:', accept: [140, '140'], placeholder: 'Degrees', explanation: '$180 - 40 = 140$.' },
    { difficulty: 'medium', question: 'Two complementary angles differ by $20°$. Find the larger:', accept: [55, '55'], placeholder: 'Degrees', explanation: '$x + (x - 20) = 90$. $2x = 110$. $x = 55$.' },
    { difficulty: 'medium', question: 'Vertical angles are always:', accept: ['equal', 'congruent'], placeholder: 'Property', explanation: 'Vertical angles (opposite angles formed by intersecting lines) are always equal.' },
    { difficulty: 'hard', question: 'Sum of interior angles of a hexagon:', accept: [720, '720'], placeholder: 'Degrees', explanation: '$(n-2) \\times 180 = 4 \\times 180 = 720°$.' },
    { difficulty: 'easy', question: 'An angle measuring exactly $90°$ is called:', accept: ['right', 'right angle'], placeholder: 'Name', explanation: '$90°$ is a right angle.' },
    { difficulty: 'easy', question: 'An angle greater than $90°$ but less than $180°$ is:', accept: ['obtuse'], placeholder: 'Type', explanation: 'Obtuse: $90° < \\theta < 180°$.' },
    { difficulty: 'medium', question: 'Alternate interior angles formed by a transversal are:', accept: ['equal', 'congruent'], placeholder: 'Property', explanation: 'When a transversal cuts parallel lines, alternate interior angles are congruent.' },
    { difficulty: 'hard', question: 'Sum of exterior angles of any convex polygon:', accept: [360, '360'], placeholder: 'Degrees', explanation: 'The sum of exterior angles of any convex polygon is always $360°$.' },
    { difficulty: 'hard', question: 'Number of diagonals in a convex $n$-gon: $\\frac{n(n-3)}{2}$. For $n = 6$:', accept: [9, '9'], placeholder: 'Number', explanation: '$6(6-3)/2 = 6 \\times 3/2 = 9$.' },
    { difficulty: 'medium', question: 'A regular polygon has all sides equal and all angles:', accept: ['equal', 'congruent'], placeholder: 'Property', explanation: 'Regular polygon: equilateral and equiangular.' },
    { difficulty: 'easy', question: 'Straight angle measures:', accept: [180, '180'], placeholder: 'Degrees', explanation: 'Straight angle: $180°$.' },
    { difficulty: 'hard', question: 'Interior angle of a regular $n$-gon: $\\frac{(n-2) \\times 180}{n}$. For $n = 8$:', accept: [135, '135'], placeholder: 'Degrees', explanation: '$(8-2)(180)/8 = 6(180)/8 = 135°$.' },
    { difficulty: 'medium', question: 'Corresponding angles formed by transversal cutting parallel lines are:', accept: ['equal', 'congruent'], placeholder: 'Property', explanation: 'Corresponding angles: congruent when lines are parallel.' },
    { difficulty: 'hard', question: 'The angle inscribed in a semicircle is always:', accept: [90, '90', 'right'], placeholder: 'Degrees', explanation: 'Thales theorem: angle in a semicircle is $90°$.' }
      ],
      stepBuilder: [
        { difficulty: 'medium', question: 'Two parallel lines are cut by a transversal. One interior angle on the left is $72°$. Find all eight angles formed.', steps: [
          { content: 'The given angle is $72°$.' },
          { content: 'Its supplementary angle (adjacent): $180° - 72° = 108°$.' },
          { content: 'Vertical angle to $72°$: also $72°$.' },
          { content: 'Vertical angle to $108°$: also $108°$.' },
          { content: 'Corresponding angles at the second parallel line are equal: $72°, 108°, 72°, 108°$.' },
          { content: 'All eight angles: four at $72°$ and four at $108°$.' }
        ], explanation: 'When a transversal crosses parallel lines, only two distinct angle measures exist. Every angle is either the given angle or its supplement.' }
      ],
      multiPart: [
        { difficulty: 'medium', question: 'A triangle has angles in ratio $2:3:4$.', parts: [
          { question: 'What is the sum of the ratios?', accept: [9, '9'], placeholder: 'Sum', explanation: '$2 + 3 + 4 = 9$.' },
          { question: 'What is the smallest angle?', accept: [40, '40', '40°'], placeholder: 'Degrees', explanation: '$\\frac{2}{9} \\times 180° = 40°$.' },
          { question: 'What is the largest angle?', accept: [80, '80', '80°'], placeholder: 'Degrees', explanation: '$\\frac{4}{9} \\times 180° = 80°$.' }
        ], completionMessage: 'Ratio problems: divide the total (180°) in the given ratio.' }
      ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Supplementary angles:', expression: 'Two angles are supplementary if they add up to {{0}}$°$.', blanks: [ { accept: ['180'], size: 4 } ], explanation: 'Supplementary: sum = $180°$.' },
    { difficulty: 'easy', context: 'Complementary angles:', expression: 'Two angles are complementary if they add up to {{0}}$°$.', blanks: [ { accept: ['90'], size: 4 } ], explanation: 'Complementary: sum = $90°$.' }
  ],
      stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Angle Problem Strategy</h4><ol><li><strong>Identify the relationship:</strong> complementary ($90°$), supplementary ($180°$), vertical (equal), or parallel-line property.</li><li><strong>Set up an equation</strong> using that relationship.</li><li><strong>Solve</strong> and verify.</li></ol></div>` }
    },

    /* ============ TOPIC 2: Triangles ============ */
    {
      id: 'triangles',
      title: 'Triangles: Properties, Congruence, & Similarity',
      description: 'The most fundamental polygon. Congruence, similarity, and the Pythagorean theorem.',
      prereqRecap: [
        { term: 'Angle Sum', definition: 'The three interior angles of a triangle sum to $180°$.' },
        { term: 'Polygon', definition: 'A closed figure made of straight line segments. A triangle is a 3-sided polygon.' }
      ],
      whyExists: { html: `
        <p><strong>Why are triangles so important?</strong> Every polygon can be decomposed into triangles (triangulation). A triangle is the simplest shape that is <strong>rigid</strong>: its shape is completely determined by its side lengths. Squares and other polygons can flex; triangles cannot. This is why bridges, roofs, and trusses use triangular supports.</p>
        <p><strong>Why the Pythagorean Theorem?</strong> In a right triangle with legs $a$, $b$ and hypotenuse $c$: $a^2 + b^2 = c^2$. This relationship is a <em>consequence</em> of Euclidean geometry's axioms. It fails in non-Euclidean geometry (curved surfaces). It is the foundation of the distance formula, trigonometry, and vector magnitude.</p>
        <p><strong>Practical application:</strong> Surveying, construction, navigation (GPS uses trilateration), screen resolution (pixel distance), and every physics problem involving right-angle components.</p>
        ${WHY('Why does the triangle angle sum equal $180°$?', '<p>Draw line $\\\\ell$ through one vertex, parallel to the opposite side. The angles formed at the vertex include the triangle\'s top angle plus two alternate interior angles (from the parallel line). These alternate interior angles equal the triangle\'s base angles (by the Parallel Postulate). The three angles together form a straight line ($180°$). Therefore the triangle\'s angles sum to $180°$.</p>')}
      ` },
      hook: { html: `
        <div class="callout callout-puzzle"><h4>🧩 Puzzle: The Pythagorean Proof</h4>
        <p>Draw a right triangle with legs $3$ and $4$. Build a square on each side. The squares have areas $9$, $16$, and $25$. Notice: $9 + 16 = 25$. The area of the square on the hypotenuse equals the sum of the areas on the legs. This works for ANY right triangle.</p></div>` },
      formalDefinitions: [
      { term: 'Triangle', symbol: '$\\triangle ABC$', definition: 'A polygon with three sides and three angles. The sum of interior angles is always $180^\\circ$.' },
      { term: 'Pythagorean Theorem', symbol: '$a^2 + b^2 = c^2$', definition: 'In a right triangle, the square of the hypotenuse equals the sum of the squares of the legs. Only holds for right triangles.' },
      { term: 'Congruence (SSS, SAS, ASA, AAS)', symbol: '$\\triangle ABC \\cong \\triangle DEF$', definition: 'Two triangles are congruent if they have the same shape and size. All corresponding sides and angles are equal.' },
      { term: 'Similarity', symbol: '$\\triangle ABC \\sim \\triangle DEF$', definition: 'Two triangles are similar if they have the same shape (same angles). Corresponding sides are proportional: $\\frac{a}{d} = \\frac{b}{e} = \\frac{c}{f}$.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 400 280" width="400" height="280" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,250 200,250 50,100" fill="none" stroke="#e2e8f0" stroke-width="2"/>
  <rect x="50" y="230" width="20" height="20" fill="none" stroke="#10b981" stroke-width="1"/>
  <text x="125" y="270" fill="#3b82f6" font-size="14" text-anchor="middle" font-family="Inter" font-weight="600">a = 3</text>
  <text x="30" y="180" fill="#10b981" font-size="14" text-anchor="middle" font-family="Inter" font-weight="600">b = 4</text>
  <text x="145" y="170" fill="#ef4444" font-size="14" text-anchor="middle" font-family="Inter" font-weight="600" transform="rotate(-33.7 145 170)">c = 5</text>
  <rect x="200" y="210" width="40" height="40" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
  <text x="220" y="235" fill="#3b82f6" font-size="10" text-anchor="middle" font-family="Inter">a²=9</text>
  <rect x="10" y="20" width="80" height="80" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1" transform="translate(0,0)"/>
  <text x="10" y="65" fill="#10b981" font-size="10" font-family="Inter">b²=16</text>
  <text x="280" y="60" fill="#e2e8f0" font-size="16" font-family="Inter" font-weight="600">a² + b² = c²</text>
  <text x="280" y="85" fill="#94a3b8" font-size="13" font-family="Inter">9 + 16 = 25 ✓</text>
  <text x="280" y="120" fill="#f59e0b" font-size="13" font-family="Inter">The area of the square</text>
  <text x="280" y="140" fill="#f59e0b" font-size="13" font-family="Inter">on the hypotenuse (c²)</text>
  <text x="280" y="160" fill="#f59e0b" font-size="13" font-family="Inter">equals the sum of the</text>
  <text x="280" y="180" fill="#f59e0b" font-size="13" font-family="Inter">squares on the legs.</text>
</svg>
</div>
<p class="math-diagram-label">The Pythagorean Theorem: a 3-4-5 right triangle with area squares</p>

        <div class="callout callout-key"><h4>Triangle Classification</h4>
        <p><strong>By sides:</strong> Equilateral (all equal), Isosceles (two equal), Scalene (none equal).</p>
        <p><strong>By angles:</strong> Acute (all $\\lt 90°$), Right (one $= 90°$), Obtuse (one $\\gt 90°$).</p></div>

        <div class="callout callout-key"><h4>The Pythagorean Theorem</h4>
        <p>In a right triangle: $a^2 + b^2 = c^2$ where $c$ is the hypotenuse (longest side, opposite the right angle).</p>
        <p><strong>Converse:</strong> If $a^2 + b^2 = c^2$, then the triangle IS a right triangle.</p>
        ${WHY('Proof by area rearrangement', '<p>Arrange four copies of the right triangle (legs $a$, $b$, hypotenuse $c$) inside a large square of side $a + b$. The uncovered area in the center is $c^2$. Rearrange the same four triangles differently: the uncovered area becomes $a^2 + b^2$. Since the total area of the large square is the same both ways: $c^2 = a^2 + b^2$.</p>')}</div>

        <div class="callout callout-key"><h4>Triangle Congruence (When Triangles are Identical)</h4>
        <p>Two triangles are congruent if they have exactly the same shape and size. The minimum information needed:</p>
        <ul>
          <li><strong>SSS:</strong> Three pairs of equal sides.</li>
          <li><strong>SAS:</strong> Two sides and the included angle.</li>
          <li><strong>ASA:</strong> Two angles and the included side.</li>
          <li><strong>AAS:</strong> Two angles and a non-included side.</li>
        </ul>
        <p><strong>NOT valid:</strong> SSA (ambiguous case: can produce 0, 1, or 2 triangles).</p>
        ${WHY('Why does SSS work but SSA does not?', '<p>SSS works because three side lengths determine a unique triangle (up to reflection). With SSA, the given side opposite the known angle might \"swing\" to hit the other side at two different points (creating two possible triangles), at exactly one (right angle), or miss entirely (no triangle). The ambiguity makes SSA unreliable for proving congruence.</p>')}</div>

        <div class="callout callout-key"><h4>Triangle Similarity (Same Shape, Different Size)</h4>
        <p>Two triangles are similar ($\\triangle ABC \\sim \\triangle DEF$) if corresponding angles are equal AND corresponding sides are proportional: $\\frac{a}{d} = \\frac{b}{e} = \\frac{c}{f}$.</p>
        <ul>
          <li><strong>AA:</strong> Two equal angles guarantee similarity (the third angle is forced by the $180°$ sum).</li>
          <li><strong>SAS~:</strong> Two sides proportional with equal included angle.</li>
          <li><strong>SSS~:</strong> All three sides proportional.</li>
        </ul></div>
      ` },
      definition: { html: `<p><strong>Pythagorean Theorem:</strong> In a right triangle, $a^2 + b^2 = c^2$.</p><p><strong>Congruent:</strong> Same shape and size. <strong>Similar:</strong> Same shape, different size (proportional sides).</p>` },
      examples: [{
        title: 'Pythagorean Theorem Application',
        problem: 'A ladder leans against a wall. The foot is 6 m from the wall, and the ladder is 10 m long. How high up the wall does it reach?',
        steps: [
          { title: 'Identify the right triangle', content: 'The wall, ground, and ladder form a right triangle. Hypotenuse = ladder (10 m), one leg = ground distance (6 m), other leg = height ($h$).', why: 'The wall meets the ground at $90°$.' },
          { title: 'Apply Pythagorean theorem', content: '$6^2 + h^2 = 10^2$', why: '$a^2 + b^2 = c^2$ with $c = 10$.' },
          { title: 'Solve', content: '$36 + h^2 = 100 \\Rightarrow h^2 = 64 \\Rightarrow h = 8$ m', why: '$\\sqrt{64} = 8$. Only the positive root is meaningful (height cannot be negative).' }
        ]
      },
      {
        title: 'Proving Triangles Similar',
        problem: 'Triangle $ABC$ has angles $40°$, $60°$, $80°$. Triangle $DEF$ has angles $60°$, $80°$, $?°$. Are they similar? If $AB = 12$ and $DE = 8$, find the scale factor.',
        steps: [
          { title: 'Find the missing angle', content: '$\\angle F = 180° - 60° - 80° = 40°$.', why: 'Triangle angle sum = $180°$.' },
          { title: 'Check AA similarity', content: 'Both triangles have angles $40°$, $60°$, $80°$. By AA, $\\triangle ABC \\sim \\triangle DEF$.', why: 'Two equal angles guarantee all three are equal, so the triangles are similar.' },
          { title: 'Find scale factor', content: 'Scale factor = $\\frac{AB}{DE} = \\frac{12}{8} = \\frac{3}{2}$.', why: 'Corresponding sides of similar triangles are in constant ratio.' }
        ]
      }],
      flashCards: [
      { type: 'why', front: 'Why is the Pythagorean theorem true?', back: 'Arrange 4 copies of a right triangle in a square of side a+b. Inner square has area c^2. Algebra gives a^2 + b^2 = c^2.' },
      { type: 'how', front: 'How to use the Pythagorean theorem?', back: 'For right triangle: a^2 + b^2 = c^2. Substitute known sides, solve for unknown. Example: 3^2 + 4^2 = 25, c = 5.' },
      { type: 'define', front: 'What makes triangles similar?', back: 'Same shape, possibly different size. All angles equal AND sides proportional. Scale one up or down to get the other.' },
      { type: 'why', front: 'Why SSS, SAS, ASA congruence?', back: 'These are the minimum info to uniquely determine a triangle. Three sides, or two sides + included angle, etc. fix it completely.' }
    ],
    exercises: [
        { difficulty: 'easy', question: 'A right triangle has legs $5$ and $12$. Its hypotenuse is:', options: ['$17$', '$13$', '$\\sqrt{119}$', '$7$'], correctIndex: 1, hint: '<p>$a^2 + b^2 = c^2$.</p>', correctExplanation: '$5^2 + 12^2 = 25 + 144 = 169 = 13^2$. This is a Pythagorean triple: $(5, 12, 13)$.', wrongExplanations: { 0: '$5 + 12 = 17$. You add the sides, not the squares.', 2: '$\\sqrt{25 + 144} = \\sqrt{169} = 13$, not $\\sqrt{119}$.', 3: '$12 - 5 = 7$. The hypotenuse is longer than both legs.' } },
        { difficulty: 'easy', question: 'If two triangles have two pairs of equal angles, they are:', options: ['Congruent', 'Similar', 'Right triangles', 'Isosceles'], correctIndex: 1, hint: '<p>AA criterion.</p>', correctExplanation: 'Two equal angles guarantee the third is also equal (angle sum = $180°$). Same angles = same shape = similar.', wrongExplanations: { 0: 'Congruent requires same size too, not just same shape.', 2: 'Nothing requires a $90°$ angle.', 3: 'Isosceles means two equal sides in one triangle, unrelated to comparing two triangles.' } },
        { difficulty: 'medium', question: 'Is a triangle with sides $7$, $24$, $25$ a right triangle?', options: ['Yes: $7^2 + 24^2 = 25^2$', 'No: $7 + 24 \\neq 25^2$', 'Yes: $7 + 24 = 31$', 'Cannot determine'], correctIndex: 0, hint: '<p>Check if $a^2 + b^2 = c^2$.</p>', correctExplanation: '$49 + 576 = 625 = 25^2$. The Pythagorean theorem\'s converse: if $a^2 + b^2 = c^2$, the triangle is right.', wrongExplanations: { 1: 'Check squares: $7^2 + 24^2 = 49 + 576 = 625 = 25^2$.', 2: 'Adding sides checks the triangle inequality, not the right-angle test.', 3: 'The Pythagorean converse gives a definitive answer.' } },
        { difficulty: 'hard', question: 'Two similar triangles have a scale factor of $2:5$. If the smaller triangle has area $12$ cm², the larger has area:', options: ['$30$ cm²', '$75$ cm²', '$60$ cm²', '$48$ cm²'], correctIndex: 1, hint: '<p>Areas scale as the SQUARE of the linear scale factor.</p>', correctExplanation: 'Area ratio = $(2/5)^2 = 4/25$. So $12/A = 4/25 \\Rightarrow A = 75$ cm². Areas scale as the square of the linear ratio because area is a two-dimensional measurement.', wrongExplanations: { 0: '$12 \\times 5/2 = 30$ uses the linear ratio, not the squared ratio.', 2: '$12 \\times 5 = 60$ multiplies by 5, but area scales as $5^2/2^2 = 25/4$.', 3: '$12 \\times 4 = 48$ uses the wrong scale factor.' } }
      ,

    {
      question: 'A right triangle has legs 5 and 12. The hypotenuse is:',
      type: 'mc',
      options: ['13', '17', '60', 'sqrt(17)'],
      correctIndex: 0,
      solution: { steps: ['c^2 = 5^2 + 12^2 = 25 + 144 = 169.', 'c = sqrt(169) = 13.', 'This is the 5-12-13 Pythagorean triple.'] }
    },
    {
      question: 'Triangle ABC has sides 6, 8, 10. Is it a right triangle?',
      type: 'mc',
      options: ['Yes, because 6^2 + 8^2 = 10^2', 'No, because the sides are not equal', 'Yes, because all sides are even', 'Cannot determine'],
      correctIndex: 0,
      solution: { steps: ['Check Pythagorean theorem: 36 + 64 = 100.', '10^2 = 100. True!', 'It is a right triangle with hypotenuse 10.'] }
    }
    ],
    matching: [
      {
        instruction: 'Match each triangle type to its property:',
        pairs: [
          { term: 'Equilateral', definition: 'All three sides equal, all angles 60 degrees' },
          { term: 'Isosceles', definition: 'Two sides equal, two angles equal' },
          { term: 'Scalene', definition: 'No sides equal, no angles equal' },
          { term: 'Right', definition: 'One angle is exactly 90 degrees' },
          { term: 'Obtuse', definition: 'One angle is greater than 90 degrees' }
        ]
      }
    ],
    fillBlanks: [
      { sentence: 'In a right triangle, the side opposite the right angle is called the ____.', answer: 'hypotenuse', hint: 'The longest side of a right triangle.' },
      { sentence: 'The Pythagorean theorem states: a squared plus b squared equals ____ squared.', answer: 'c', hint: 'c is the hypotenuse.' },
      { sentence: 'Two triangles with the same shape but different sizes are called ____ triangles.', answer: 'similar', hint: 'Same angles, proportional sides.' },
      { sentence: 'If a triangle has sides 3, 4, and 5, the right angle is opposite the side of length ____.', answer: '5', hint: 'The hypotenuse is across from the right angle.' }
    ],
      freeResponse: [
        { difficulty: 'easy', question: 'A right triangle has legs $8$ and $15$. Find the hypotenuse:', accept: [17, '17'], placeholder: 'Length', explanation: '$8^2 + 15^2 = 64 + 225 = 289 = 17^2$. Pythagorean triple: $(8, 15, 17)$.' },
        { difficulty: 'easy', question: 'An equilateral triangle has all angles equal. Each angle measures:', accept: [60, '60', '60°'], placeholder: 'Degrees', explanation: '$180° / 3 = 60°$.' },
        { difficulty: 'medium', question: 'A right triangle has hypotenuse $13$ and one leg $5$. The other leg is:', accept: [12, '12'], placeholder: 'Length', hint: '<p>$a^2 + 5^2 = 13^2$.</p>', explanation: '$a^2 = 169 - 25 = 144$, $a = 12$. Triple: $(5, 12, 13)$.' },
        { difficulty: 'medium', question: 'Similar triangles have scale factor $3:5$. If the smaller perimeter is $24$ cm, the larger perimeter is:', accept: [40, '40'], placeholder: 'cm', explanation: 'Perimeter scales linearly: $24 \\times \\frac{5}{3} = 40$ cm.' },
        { difficulty: 'hard', question: 'A 45-45-90 triangle has hypotenuse $10$. Each leg measures (to 2 decimal places):', accept: ['7.07', '5√2'], placeholder: 'Length', explanation: 'In a 45-45-90 triangle, leg $= \\frac{\\text{hypotenuse}}{\\sqrt{2}} = \\frac{10}{\\sqrt{2}} = 5\\sqrt{2} \\approx 7.07$.' },
    { difficulty: 'easy', question: 'If two angles of a triangle are $50°$ and $60°$, the third is:', accept: [70, '70'], placeholder: 'Degrees', explanation: '$180 - 50 - 60 = 70°$.' },
    { difficulty: 'medium', question: 'Hypotenuse of right triangle with legs 5 and 12:', accept: [13, '13'], placeholder: 'Number', explanation: '$\\sqrt{25 + 144} = \\sqrt{169} = 13$.' },
    { difficulty: 'hard', question: 'Area of triangle with base 10 and height 6:', accept: [30, '30'], placeholder: 'Area', explanation: '$A = \\frac{1}{2}bh = \\frac{1}{2}(10)(6) = 30$.' },
    { difficulty: 'medium', question: 'In a 30-60-90 triangle with hypotenuse 10, the short side is:', accept: [5, '5'], placeholder: 'Length', explanation: 'Short side = hypotenuse / 2 = 5.' },
    { difficulty: 'easy', question: 'All three sides of an equilateral triangle are:', accept: ['equal', 'congruent', 'the same'], placeholder: 'Property', explanation: 'Equilateral: all sides equal. All angles = $60°$.' },
    { difficulty: 'hard', question: 'In a right triangle with legs $a$ and $b$: $a^2 + b^2 =$?', accept: ['c^2', 'hypotenuse^2'], placeholder: 'Expression', explanation: 'Pythagorean theorem: $a^2 + b^2 = c^2$.' },
    { difficulty: 'medium', question: 'Similar triangles have proportional sides and:', accept: ['equal angles', 'congruent angles'], placeholder: 'Property', explanation: 'Similar: same shape, different size. Angles equal, sides proportional.' },
    { difficulty: 'hard', question: 'If two triangles are congruent by SSS, what theorem is used?', accept: ['SSS', 'side-side-side'], placeholder: 'Theorem', explanation: 'SSS: if all three sides are equal, the triangles are congruent.' },
    { difficulty: 'hard', question: 'Medians of a triangle intersect at the:', accept: ['centroid'], placeholder: 'Point', explanation: 'Centroid: intersection of medians. Divides each median 2:1.' },
    { difficulty: 'easy', question: 'Isosceles triangle has how many equal sides?', accept: [2, '2'], placeholder: 'Number', explanation: 'Isosceles: exactly two equal sides.' },
    { difficulty: 'hard', question: 'Triangle inequality: for sides $a, b, c$: $a + b$ must be _____ than $c$.', accept: ['greater'], placeholder: 'Relation', explanation: 'Triangle inequality: the sum of any two sides exceeds the third.' },
    { difficulty: 'medium', question: 'Scalene triangle has _____ equal sides.', accept: [0, '0', 'no', 'zero'], placeholder: 'Number', explanation: 'Scalene: all three sides are different lengths.' },
    { difficulty: 'hard', question: 'SAS congruence: if two sides and the _____ angle are equal, triangles are congruent.', accept: ['included'], placeholder: 'Which angle?', explanation: 'SAS: the included angle (between the two sides).' }
      ],
      stepBuilder: [
        { difficulty: 'hard', question: 'Prove that two triangles are similar using AA, then find an unknown side.', steps: [
          { content: 'Triangle $ABC$: $\\angle A = 50°$, $\\angle B = 70°$. So $\\angle C = 60°$.' },
          { content: 'Triangle $DEF$: $\\angle D = 50°$, $\\angle E = 70°$. So $\\angle F = 60°$.' },
          { content: 'Both triangles have angles $50°, 70°, 60°$. By AA, $\\triangle ABC \\sim \\triangle DEF$.' },
          { content: 'If $AB = 15$, $DE = 10$, the scale factor is $15/10 = 3/2$.' },
          { content: 'If $EF = 8$, then $BC = 8 \\times (3/2) = 12$.' }
        ], explanation: 'AA similarity: two equal angles guarantee all three match. Corresponding sides scale proportionally.' }
      ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Sum of angles in a triangle:', expression: 'The sum of angles in a triangle is {{0}}$°$.', blanks: [ { accept: ['180'], size: 4 } ], explanation: '$180°$ always.' },
    { difficulty: 'medium', context: 'Isosceles triangle:', expression: 'An isosceles triangle has {{0}} equal sides.', blanks: [ { accept: ['2', 'two'], size: 4 } ], explanation: 'Isosceles: 2 equal sides and 2 equal base angles.' }
  ],
      stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Triangle Strategy</h4><ol><li><strong>Right triangle?</strong> Use Pythagorean theorem.</li><li><strong>Congruence?</strong> Check SSS, SAS, ASA, or AAS.</li><li><strong>Similarity?</strong> Check AA (two equal angles) or proportional sides.</li><li><strong>Area?</strong> $A = \\frac{1}{2}bh$ or Heron's formula.</li></ol></div>` }
    },

    /* ============ TOPIC 3: Circles ============ */
    {
      id: 'circles',
      title: 'Circles: Properties, Arcs, and Sectors',
      description: 'The perfect shape. Circumference, area, arcs, sectors, and inscribed angles.',
      prereqRecap: [
        { term: 'Radius', definition: 'Distance from center to any point on the circle.' },
        { term: 'Pi ($\\pi$)', definition: 'The ratio of circumference to diameter: $\\pi = C/d \\approx 3.14159$. An irrational, transcendental number.' }
      ],
      whyExists: { html: `
        <p><strong>Why is $\\pi$ what it is?</strong> Take ANY circle. Divide its circumference by its diameter. You always get $\\pi \\approx 3.14159$. This is a geometric constant: it does not depend on the circle\'s size. $\\pi$ encodes the relationship between straight-line distance (diameter) and curved distance (circumference).</p>
        <p><strong>Why is the area $\\pi r^2$?</strong> Imagine cutting a circle into many thin wedges and rearranging them into an approximate rectangle. The rectangle\'s width is $\\pi r$ (half the circumference) and height is $r$. Area = $\\pi r \\times r = \\pi r^2$. As the number of wedges approaches infinity, this becomes exact.</p>
        <p><strong>Practical application:</strong> Wheels, gears, pipes, lenses, satellite orbits, clock design, percentage pie charts, and the design of any round object.</p>
        ${WHY('Why is $\\pi$ irrational?', '<p>$\\pi$ cannot be expressed as a fraction $p/q$ (proven by Johann Lambert, 1761). Its decimal expansion never terminates or repeats. It is also <strong>transcendental</strong>: it is not a root of any polynomial with integer coefficients (proven by Lindemann, 1882). This means squaring the circle (constructing a square with the same area as a given circle using only compass and straightedge) is provably impossible.</p>')}
      ` },
      hook: { html: `
        <div class="callout callout-puzzle"><h4>🧩 Puzzle: The Bicycle Odometer</h4>
        <p>A bicycle wheel has diameter 70 cm. After one full rotation, how far has the bike traveled? Exactly one circumference: $C = \\pi d = 70\\pi \\approx 219.9$ cm. Odometers count rotations and multiply by circumference. That is circle geometry in action.</p></div>` },
      concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 360 260" width="360" height="260" xmlns="http://www.w3.org/2000/svg">
  <circle cx="150" cy="130" r="100" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="150" cy="130" r="3" fill="#f59e0b"/>
  <text x="155" y="125" fill="#f59e0b" font-size="11" font-family="Inter">center</text>
  <line x1="150" y1="130" x2="250" y2="130" stroke="#10b981" stroke-width="1.5"/>
  <text x="200" y="123" fill="#10b981" font-size="12" text-anchor="middle" font-family="Inter" font-weight="600">r</text>
  <line x1="50" y1="130" x2="250" y2="130" stroke="#ef4444" stroke-width="1" stroke-dasharray="5,5"/>
  <text x="150" y="148" fill="#ef4444" font-size="11" text-anchor="middle" font-family="Inter">d = 2r</text>
  <path d="M 250 130 A 100 100 0 0 1 220 218" fill="none" stroke="#8b5cf6" stroke-width="3"/>
  <text x="255" y="180" fill="#8b5cf6" font-size="12" font-family="Inter" font-weight="600">arc</text>
  <path d="M 150 130 L 250 130 A 100 100 0 0 1 220 218 Z" fill="rgba(139,92,246,0.1)" stroke="none"/>
  <text x="210" y="170" fill="#8b5cf6" font-size="10" font-family="Inter">sector</text>
  <text x="280" y="40" fill="#e2e8f0" font-size="12" font-family="Inter">C = 2πr</text>
  <text x="280" y="60" fill="#e2e8f0" font-size="12" font-family="Inter">A = πr²</text>
  <text x="280" y="90" fill="#94a3b8" font-size="11" font-family="Inter">arc = rθ</text>
  <text x="280" y="110" fill="#94a3b8" font-size="11" font-family="Inter">sector = ½r²θ</text>
</svg>
</div>
<p class="math-diagram-label">Circle anatomy: radius, diameter, arc, and sector with formulas</p>

        <div class="callout callout-key"><h4>Essential Circle Formulas</h4>
        <ul>
          <li><strong>Circumference:</strong> $C = 2\\pi r = \\pi d$</li>
          <li><strong>Area:</strong> $A = \\pi r^2$</li>
          <li><strong>Arc Length:</strong> $s = r\\theta$ (where $\\theta$ is in radians)</li>
          <li><strong>Sector Area:</strong> $A = \\frac{1}{2}r^2\\theta$ (where $\\theta$ is in radians)</li>
        </ul>
        ${WHY('Why $s = r\\theta$?', '<p>A full circle has arc length $2\\pi r$ and angle $2\\pi$ radians. The fraction of the circle swept by angle $\\theta$ is $\\theta / (2\\pi)$. Arc length = fraction �: circumference = $\\frac{\\theta}{2\\pi} \\cdot 2\\pi r = r\\theta$. This formula is <em>the reason</em> radians are used in mathematics: it makes the relationship between angle and arc length maximally simple.</p>')}</div>

        <div class="callout callout-key"><h4>Circle Equation (Coordinate Geometry)</h4>
        <p><strong>Standard form:</strong> $(x - h)^2 + (y - k)^2 = r^2$ with center $(h, k)$ and radius $r$.</p>
        <p><strong>General form:</strong> $x^2 + y^2 + Dx + Ey + F = 0$. Complete the square to convert to standard form.</p></div>

        <div class="callout callout-key"><h4>Inscribed Angle Theorem</h4>
        <p>An <strong>inscribed angle</strong> (vertex on the circle) is half the <strong>central angle</strong> subtending the same arc.</p>
        <p>If central angle = $\\theta$, inscribed angle = $\\theta/2$.</p>
        ${WHY('Why half?', '<p>Draw the radius to the vertex of the inscribed angle. This creates two isosceles triangles (two sides are radii). Using the angle sum property of each triangle and the fact that the central angle is an exterior angle of the combined figure, the inscribed angle comes out to exactly half.</p>')}</div>
      ` },
      definition: { html: `<p><strong>Circle:</strong> The set of all points at distance $r$ from a fixed center point.</p><p><strong>Arc:</strong> A portion of the circle's circumference. <strong>Sector:</strong> The \"pie slice\" region bounded by two radii and an arc.</p>` },
      examples: [{
        title: 'Arc Length and Sector Area',
        problem: 'A circle has radius $10$ cm. Find the arc length and sector area for a central angle of $72°$.',
        steps: [
          { title: 'Convert to radians', content: '$72° = 72 \\times \\frac{\\pi}{180} = \\frac{2\\pi}{5}$ radians', why: 'The formulas $s = r\\theta$ and $A = \\frac{1}{2}r^2\\theta$ require radians.' },
          { title: 'Arc length', content: '$s = 10 \\times \\frac{2\\pi}{5} = 4\\pi \\approx 12.57$ cm', why: '$s = r\\theta$.' },
          { title: 'Sector area', content: '$A = \\frac{1}{2}(10)^2 \\times \\frac{2\\pi}{5} = \\frac{100\\pi}{5} = 20\\pi \\approx 62.83$ cm²', why: '$A = \\frac{1}{2}r^2\\theta$.' }
        ]
      }],
      flashCards: [
      { type: 'define', front: 'What is pi?', back: 'Circumference/diameter for ANY circle. Always 3.14159... Irrational and universal to all circles.' },
      { type: 'why', front: 'Why is circle area pi*r^2?', back: 'Slice into thin wedges, rearrange into parallelogram. Base = pi*r, height = r. Area = pi*r*r.' },
      { type: 'how', front: 'How to find arc length?', back: '(angle/360)*2*pi*r for degrees. Or angle*r for radians. Fraction of the full circumference.' }
    ],
    exercises: [
        { difficulty: 'easy', question: 'The area of a circle with radius $7$ is:', options: ['$14\\pi$', '$49\\pi$', '$7\\pi$', '$49$'], correctIndex: 1, hint: '<p>$A = \\pi r^2$.</p>', correctExplanation: '$A = \\pi(7)^2 = 49\\pi \\approx 153.94$ square units.', wrongExplanations: { 0: '$14\\pi = 2\\pi(7)$ is the circumference, not the area.', 2: '$7\\pi$ uses $r$, not $r^2$.', 3: '$49$ is $r^2$ but missing the $\\pi$ factor.' } },
        { difficulty: 'medium', question: 'A sector has radius $6$ and arc length $4\\pi$. The central angle in radians is:', options: ['$\\frac{2\\pi}{3}$', '$\\frac{\\pi}{3}$', '$\\frac{4\\pi}{6}$', '$24\\pi$'], correctIndex: 0, hint: '<p>$s = r\\theta \\Rightarrow \\theta = s/r$.</p>', correctExplanation: '$\\theta = \\frac{4\\pi}{6} = \\frac{2\\pi}{3}$ radians ($120°$). Note: option C is the same as option A (unsimplified).', wrongExplanations: { 1: '$\\pi/3 = 60°$, but $6 \\times \\pi/3 = 2\\pi \\neq 4\\pi$.', 2: '$4\\pi/6 = 2\\pi/3$. Same answer, just unsimplified.', 3: '$r \\times s = 24\\pi$ is the product, not the angle. Use division.' } }
      ,

    {
      question: 'A circle has radius 7. Its circumference is:',
      type: 'mc',
      options: ['14*pi', '49*pi', '7*pi', '28*pi'],
      correctIndex: 0,
      solution: { steps: ['C = 2*pi*r = 2*pi*7 = 14*pi.'] }
    },
    {
      question: 'A circle has diameter 10. Its area is:',
      type: 'mc',
      options: ['25*pi', '100*pi', '10*pi', '50*pi'],
      correctIndex: 0,
      solution: { steps: ['Radius = diameter/2 = 5.', 'A = pi*r^2 = pi*25 = 25*pi.'] }
    },
    {
      question: 'An arc subtends 90 degrees in a circle of radius 4. The arc length is:',
      type: 'mc',
      options: ['2*pi', 'pi', '4*pi', '8*pi'],
      correctIndex: 0,
      solution: { steps: ['Arc length = (90/360) * 2*pi*4 = (1/4)*8*pi = 2*pi.'] }
    }
    ],
    matching: [
      {
        instruction: 'Match each circle term to its definition:',
        pairs: [
          { term: 'Radius', definition: 'Distance from center to edge' },
          { term: 'Diameter', definition: 'Distance across the circle through the center (2r)' },
          { term: 'Circumference', definition: 'Distance around the circle (2 pi r)' },
          { term: 'Arc', definition: 'A portion of the circumference' },
          { term: 'Chord', definition: 'A line segment connecting two points on the circle' }
        ]
      }
    ],
    fillBlanks: [
      { sentence: 'The circumference of a circle with radius r is ____.', answer: '2*pi*r', hint: 'C = 2 times pi times radius.' },
      { sentence: 'The area of a circle with radius r is ____.', answer: 'pi*r^2', hint: 'A = pi times radius squared.' },
      { sentence: 'The ratio of circumference to diameter is the constant ____.', answer: 'pi', hint: 'Approximately 3.14159...' }
    ],
      freeResponse: [
        { difficulty: 'easy', question: 'The circumference of a circle with radius $5$ is:', accept: ['10π', '10pi', '31.42', '31.4'], placeholder: '(use π)', explanation: '$C = 2\\pi(5) = 10\\pi \\approx 31.42$.' },
        { difficulty: 'easy', question: 'The area of a circle with diameter $12$:', accept: ['36π', '36pi', '113.1', '113.10'], placeholder: 'use π', explanation: '$r = 6$. $A = \\pi(6)^2 = 36\\pi \\approx 113.10$.' },
        { difficulty: 'medium', question: 'An arc subtends $60°$ in a circle of radius $9$. Arc length (exact):', accept: ['3π', '3pi'], placeholder: 'use π', hint: '<p>$s = r\\theta$ with $\\theta$ in radians.</p>', explanation: '$60° = \\pi/3$ rad. $s = 9(\\pi/3) = 3\\pi$.' },
        { difficulty: 'hard', question: 'A sector has area $50\\pi$ cm² and radius $10$ cm. Central angle in degrees:', accept: [180, '180', '180°'], placeholder: 'Degrees', explanation: '$A = \\frac{1}{2}r^2\\theta$. $50\\pi = \\frac{1}{2}(100)\\theta$. $\\theta = \\pi$ rad $= 180°$.' },
    { difficulty: 'easy', question: 'Perimeter of a square with side 7:', accept: [28, '28'], placeholder: 'Units', explanation: '$4 \\times 7 = 28$.' },
    { difficulty: 'medium', question: 'Area of equilateral triangle with side 6:', accept: ['9sqrt(3)', '15.59', '9\\sqrt{3}'], placeholder: 'Area', explanation: '$A = \\frac{\\sqrt{3}}{4} \\cdot 6^2 = 9\\sqrt{3}$.' },
    { difficulty: 'hard', question: 'Area of regular hexagon with side 4:', accept: ['24sqrt(3)', '41.57'], placeholder: 'Area', explanation: '$A = \\frac{3\\sqrt{3}}{2}s^2 = \\frac{3\\sqrt{3}}{2}(16) = 24\\sqrt{3}$.' },
    { difficulty: 'easy', question: 'Area of rectangle with length 8 and width 3:', accept: [24, '24'], placeholder: 'Area', explanation: '$A = l \\times w = 8 \\times 3 = 24$.' },
    { difficulty: 'medium', question: 'Volume of rectangular prism with $l=3, w=4, h=5$:', accept: [60, '60'], placeholder: 'Volume', explanation: '$V = lwh = 3 \\times 4 \\times 5 = 60$.' },
    { difficulty: 'medium', question: 'Circumference of circle with diameter 10:', accept: ['10pi', '31.42'], placeholder: 'Length', explanation: '$C = \\pi d = 10\\pi$.' },
    { difficulty: 'hard', question: 'Volume of sphere with radius 3:', accept: ['36pi', '113.1'], placeholder: 'Volume', explanation: '$V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi(27) = 36\\pi$.' },
    { difficulty: 'hard', question: 'Surface area of sphere with radius 4:', accept: ['64pi', '201.06'], placeholder: 'Area', explanation: '$SA = 4\\pi r^2 = 4\\pi(16) = 64\\pi$.' },
    { difficulty: 'hard', question: 'Volume of cone: $V = \\frac{1}{3}\\pi r^2 h$. If $r = 3, h = 4$:', accept: ['12pi', '37.7'], placeholder: 'Volume', explanation: '$\\frac{1}{3}\\pi(9)(4) = 12\\pi$.' },
    { difficulty: 'easy', question: 'Area of circle with radius 7:', accept: ['49pi', '153.94'], placeholder: 'Area', explanation: '$A = \\pi r^2 = 49\\pi$.' },
    { difficulty: 'hard', question: 'Surface area of a cylinder: $2\\pi r^2 + 2\\pi rh$. If $r=3, h=5$:', accept: ['48pi', '150.80'], placeholder: 'Area', explanation: '$2\\pi(9) + 2\\pi(15) = 18\\pi + 30\\pi = 48\\pi$.' },
    { difficulty: 'medium', question: 'Sector area: $A = \\frac{1}{2}r^2\\theta$ (radians). If $r = 4, \\theta = \\pi/3$:', accept: ['8pi/3', '8.38'], placeholder: 'Area', explanation: '$\\frac{1}{2}(16)(\\pi/3) = 8\\pi/3$.' },
    { difficulty: 'hard', question: 'Euler formula for polyhedra: $V - E + F =$?', accept: [2, '2'], placeholder: 'Number', explanation: '$V - E + F = 2$. Vertices minus edges plus faces.' }
      ],
      stepBuilder: [
        { difficulty: 'medium', question: 'Find the area of a ring (annulus) with outer radius $8$ and inner radius $5$.', steps: [
          { content: 'Outer circle area: $\\pi(8)^2 = 64\\pi$.' },
          { content: 'Inner circle area: $\\pi(5)^2 = 25\\pi$.' },
          { content: 'Ring area = outer $-$ inner: $64\\pi - 25\\pi = 39\\pi \\approx 122.52$ sq units.' },
    { difficulty: 'medium', question: 'Find the area of a trapezoid with bases 6 and 10, height 4.', steps: [
      { content: 'Formula: $A = \\frac{1}{2}(b_1 + b_2)h$.' },
      { content: '$A = \\frac{1}{2}(6 + 10)(4) = \\frac{1}{2}(16)(4) = 32$.' }
    ], explanation: 'Trapezoid area: average of bases times height.' }
        ], explanation: 'Annulus area = $\\pi(R^2 - r^2)$. Subtract the hole from the full disk.' }
      ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Area of rectangle:', expression: '$A =$ {{0}} $\\times w$', blanks: [ { accept: ['l', 'L', 'length'], size: 6 } ], explanation: 'Area = length times width.' },
    { difficulty: 'medium', context: 'Pythagorean theorem:', expression: '$a^2 + b^2 =$ {{0}} $^2$', blanks: [ { accept: ['c', 'C'], size: 3 } ], explanation: '$a^2 + b^2 = c^2$.' }
  ],
      stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Circle Strategy</h4><ol><li>Identify what you know: radius, diameter, angle, arc, area?</li><li>Convert angles to radians if using $s = r\\theta$ or $A = \\frac{1}{2}r^2\\theta$.</li><li>Use the appropriate formula and solve for the unknown.</li></ol></div>` }
    },

    /* ============ TOPIC 4: Area and Volume ============ */
    {
      id: 'area-volume',
      title: 'Area and Volume of Geometric Solids',
      description: 'Computing area of polygons and volume of 3D solids. Why each formula works.',
      prereqRecap: [
        { term: 'Rectangle Area', definition: '$A = l \\times w$. The foundational area formula from which all others derive.' },
        { term: 'Dimension', definition: 'Length is 1D, area is 2D, volume is 3D. Units: cm, cm², cm³.' }
      ],
      whyExists: { html: `
        <p><strong>Why do area formulas look the way they do?</strong> Every area formula ultimately reduces to counting unit squares. A rectangle of width $w$ and height $h$ contains $w \\times h$ unit squares (by definition). A triangle is half a rectangle: $A = \\frac{1}{2}bh$. A circle's area $\\pi r^2$ follows from cutting it into infinitesimal wedges and rearranging.</p>
        <p><strong>Why do volume formulas have $\\frac{1}{3}$ for cones and pyramids?</strong> A cube of side $s$ can be decomposed into three congruent pyramids with apex at the center. Each pyramid has volume $\\frac{1}{3}s^3 = \\frac{1}{3}Bh$. This $\\frac{1}{3}$ factor is not arbitrary; it emerges from the geometry of dividing a prism into pyramids.</p>
        <p><strong>Practical application:</strong> Architects compute room volumes for HVAC, painters compute wall areas, manufacturers compute material needs for packaging, and civil engineers calculate excavation volumes.</p>
      ` },
      hook: { html: `
        <div class="callout callout-puzzle"><h4>🧩 Puzzle: Paint for a Room</h4>
        <p>A room is $5$ m �: $4$ m �: $3$ m tall. You need to paint all four walls (not floor or ceiling). Total wall area = $2(5 \\times 3) + 2(4 \\times 3) = 30 + 24 = 54$ m². If one liter covers $10$ m², you need $5.4$ liters. Geometry solves real problems.</p></div>` },
      concept: { html: `
        <div class="callout callout-key"><h4>2D Area Formulas</h4>
        <ul>
          <li><strong>Rectangle:</strong> $A = lw$</li>
          <li><strong>Triangle:</strong> $A = \\frac{1}{2}bh$ (WHY: half a rectangle)</li>
          <li><strong>Parallelogram:</strong> $A = bh$ (WHY: shear a rectangle; area preserved)</li>
          <li><strong>Trapezoid:</strong> $A = \\frac{1}{2}(b_1 + b_2)h$ (WHY: average of parallel sides �: height)</li>
          <li><strong>Circle:</strong> $A = \\pi r^2$</li>
        </ul></div>

        <div class="callout callout-key"><h4>3D Volume Formulas</h4>
        <ul>
          <li><strong>Rectangular Prism (Box):</strong> $V = lwh$</li>
          <li><strong>Cylinder:</strong> $V = \\pi r^2 h$ (WHY: stack circles of area $\\pi r^2$ for height $h$)</li>
          <li><strong>Cone:</strong> $V = \\frac{1}{3}\\pi r^2 h$ (WHY: $\\frac{1}{3}$ of a cylinder with same base and height)</li>
          <li><strong>Sphere:</strong> $V = \\frac{4}{3}\\pi r^3$ (derived by Archimedes using the method of exhaustion)</li>
          <li><strong>Pyramid:</strong> $V = \\frac{1}{3}Bh$ where $B$ is the base area</li>
        </ul></div>

        <div class="callout callout-key"><h4>Surface Area</h4>
        <ul>
          <li><strong>Cylinder:</strong> $SA = 2\\pi r^2 + 2\\pi rh$ (two circles + lateral rectangle)</li>
          <li><strong>Sphere:</strong> $SA = 4\\pi r^2$ (Archimedes proved this equals the lateral surface of the enclosing cylinder)</li>
          <li><strong>Cone:</strong> $SA = \\pi r^2 + \\pi r\\ell$ where $\\ell = \\sqrt{r^2 + h^2}$ is the slant height</li>
        </ul></div>
      ` },
      definition: { html: `<p><strong>Area:</strong> The measure of a 2D region in square units. <strong>Volume:</strong> The measure of a 3D region in cubic units.</p>` },
      examples: [{
        title: 'Volume of a Cone',
        problem: 'A cone has radius $6$ cm and height $10$ cm. Find its volume.',
        steps: [
          { title: 'Formula', content: '$V = \\frac{1}{3}\\pi r^2 h$', why: 'A cone is $\\frac{1}{3}$ of a cylinder with the same base and height. This factor comes from the tapering to a point.' },
          { title: 'Substitute', content: '$V = \\frac{1}{3}\\pi (6)^2(10) = \\frac{1}{3}\\pi(360) = 120\\pi$', why: '$r^2 = 36$, $36 \\times 10 = 360$, $360/3 = 120$.' },
          { title: 'Approximate', content: '$V \\approx 376.99$ cm³', why: '$120 \\times 3.14159 \\approx 376.99$.' }
        ]
      },
      {
        title: 'Surface Area of a Sphere',
        problem: 'A basketball has diameter $24$ cm. Find its surface area.',
        steps: [
          { title: 'Find radius', content: '$r = d/2 = 12$ cm', why: 'Radius is half the diameter.' },
          { title: 'Apply formula', content: '$SA = 4\\pi r^2 = 4\\pi(144) = 576\\pi \\approx 1809.56$ cm²', why: 'Archimedes proved $SA = 4\\pi r^2$: the sphere\'s surface area equals the lateral area of the enclosing cylinder.' }
        ]
      }],
      flashCards: [
      { type: 'why', front: 'Why is area measured in square units?', back: 'Area counts how many unit squares fit in a region. A 3x4 rectangle fits 12 unit squares. "Square meters" means "how many 1m x 1m squares."' },
      { type: 'how', front: 'How to find the area of an irregular shape?', back: 'Break it into rectangles, triangles, and circles whose areas you know. Add them up. Or subtract: area of a complex shape = large rectangle - cutouts.' },
      { type: 'why', front: 'Why does volume scale as length cubed?', back: 'Doubling all dimensions of a box: 2l x 2w x 2h = 8(lwh). Volume scales as the cube of the scaling factor: 2^3 = 8.' }
    ],
    exercises: [
        { difficulty: 'easy', question: 'Volume of a box $3 \\times 4 \\times 5$:', options: ['$12$', '$60$', '$47$', '$120$'], correctIndex: 1, hint: '<p>$V = lwh$.</p>', correctExplanation: '$3 \\times 4 \\times 5 = 60$ cubic units.', wrongExplanations: { 0: '$3 \\times 4 = 12$ is just the base area. Multiply by height too.', 2: 'Not a standard formula result.', 3: '$60 \\times 2 = 120$ is not the volume.' } },
        { difficulty: 'medium', question: 'A cylinder has radius $3$ and height $7$. Its volume is:', options: ['$21\\pi$', '$63\\pi$', '$42\\pi$', '$189\\pi$'], correctIndex: 1, hint: '<p>$V = \\pi r^2 h$.</p>', correctExplanation: '$\\pi(9)(7) = 63\\pi \\approx 197.92$ cubic units.', wrongExplanations: { 0: '$3 \\times 7 = 21$. Use $r^2 = 9$, not $r = 3$.', 2: '$42 = 2 \\times 3 \\times 7$. That is the lateral surface formula pattern, not volume.', 3: '$27 \\times 7 = 189$. You cubed the radius instead of squaring.' } }
      ,

    /* Area intuition */
    {
      question: 'A rectangle has area 24 square units. If you double both the length and width, the new area is:',
      type: 'mc',
      options: ['96 (four times as large)', '48 (twice as large)', '24 (same)', '72'],
      correctIndex: 0,
      solution: { steps: ['If length = l, width = w, area = lw = 24.', 'New dimensions: 2l and 2w. New area = (2l)(2w) = 4lw = 4(24) = 96.', 'Doubling both dimensions quadruples the area. This is because area scales as length^2.'] }
    },
    {
      question: 'A sphere has radius 3. Its volume is:',
      type: 'mc',
      options: ['36*pi', '108*pi', '27*pi', '12*pi'],
      correctIndex: 0,
      solution: { steps: ['V = (4/3)*pi*r^3 = (4/3)*pi*27 = 36*pi.'] }
    }
    ],
    matching: [
      {
        instruction: 'Match each shape to its area formula:',
        pairs: [
          { term: 'Rectangle', definition: 'length times width' },
          { term: 'Triangle', definition: 'half times base times height' },
          { term: 'Circle', definition: 'pi times radius squared' },
          { term: 'Trapezoid', definition: 'half times (base1 + base2) times height' },
          { term: 'Parallelogram', definition: 'base times height' }
        ]
      }
    ],
    fillBlanks: [
      { sentence: 'The volume of a rectangular box with length l, width w, height h is ____.', answer: 'l*w*h', hint: 'Multiply all three dimensions.' },
      { sentence: 'The volume of a cylinder with radius r and height h is ____.', answer: 'pi*r^2*h', hint: 'Area of circular base times height.' },
      { sentence: 'The volume of a sphere with radius r is ____.', answer: '(4/3)*pi*r^3', hint: 'Four-thirds pi r-cubed.' }
    ],
      freeResponse: [
        { difficulty: 'easy', question: 'Area of a triangle with base $10$ and height $6$:', accept: [30, '30'], placeholder: 'Area', explanation: '$A = \\frac{1}{2}(10)(6) = 30$ square units.' },
        { difficulty: 'easy', question: 'Volume of a cube with side length $4$:', accept: [64, '64'], placeholder: 'Cubic units', explanation: '$V = 4^3 = 64$ cubic units.' },
        { difficulty: 'medium', question: 'A cone has radius $3$ and height $12$. Volume (use $\\pi$):', accept: ['36π', '36pi', '113.1'], placeholder: 'use π', explanation: '$V = \\frac{1}{3}\\pi(9)(12) = 36\\pi \\approx 113.1$.' },
        { difficulty: 'medium', question: 'A sphere has radius $6$. Surface area (use $\\pi$):', accept: ['144π', '144pi', '452.4'], placeholder: 'use π', explanation: '$SA = 4\\pi(36) = 144\\pi \\approx 452.39$.' },
        { difficulty: 'hard', question: 'A cylinder has volume $100\\pi$ cm³ and radius $5$ cm. Height:', accept: [4, '4'], placeholder: 'cm', explanation: '$V = \\pi r^2 h$. $100\\pi = 25\\pi h$. $h = 4$ cm.' },
    { difficulty: 'easy', question: 'Diameter of circle with radius 5:', accept: [10, '10'], placeholder: 'Number', explanation: '$d = 2r = 10$.' },
    { difficulty: 'medium', question: 'Arc length of 90° sector with radius 4:', accept: ['2pi', '6.28'], placeholder: 'Length', explanation: '$\\frac{90}{360} \\cdot 2\\pi(4) = \\frac{1}{4} \\cdot 8\\pi = 2\\pi$.' },
    { difficulty: 'hard', question: 'Area of sector with radius 6 and central angle $60°$:', accept: ['6pi', '18.85'], placeholder: 'Area', explanation: '$A = \\frac{60}{360} \\cdot \\pi(6)^2 = \\frac{1}{6} \\cdot 36\\pi = 6\\pi$.' }
      ],
      stepBuilder: [
        { difficulty: 'hard', question: 'A rectangular tank is $8$ m �: $5$ m �: $3$ m. Water fills it to $2$ m deep. Find: (a) volume of water, (b) empty volume, (c) how much more water is needed to fill it.', steps: [
          { content: 'Total volume: $8 \\times 5 \\times 3 = 120$ m³.' },
          { content: 'Water volume: $8 \\times 5 \\times 2 = 80$ m³.' },
          { content: 'Empty volume: $120 - 80 = 40$ m³.' },
          { content: 'Need $40$ m³ (= $40{,}000$ liters) more water to fill the tank.' },
    { difficulty: 'hard', question: 'Find the area of an annulus (ring) with outer radius 5 and inner radius 3.', steps: [
      { content: 'Outer area: $\\pi(5^2) = 25\\pi$.' },
      { content: 'Inner area: $\\pi(3^2) = 9\\pi$.' },
      { content: 'Annulus area: $25\\pi - 9\\pi = 16\\pi$.' }
    ], explanation: 'Annulus: $A = \\pi(R^2 - r^2)$.' }
        ], explanation: 'Volume of a partial fill uses the same base area with reduced height.' }
      ],
      multiPart: [
        { difficulty: 'medium', question: 'A cylindrical can has diameter $10$ cm and height $15$ cm.', parts: [
          { question: 'Radius:', accept: [5, '5'], placeholder: 'cm', explanation: '$r = d/2 = 5$ cm.' },
          { question: 'Volume (use π):', accept: ['375π', '375pi'], placeholder: 'cm³', explanation: '$V = \\pi(25)(15) = 375\\pi$.' },
          { question: 'Total surface area (use π):', accept: ['200π', '200pi'], placeholder: 'cm²', explanation: '$SA = 2\\pi(25) + 2\\pi(5)(15) = 50\\pi + 150\\pi = 200\\pi$.' }
        ], completionMessage: 'Cylinder: $V = \\pi r^2 h$, $SA = 2\\pi r^2 + 2\\pi rh$.' }
      ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Area of a circle:', expression: '$A = \\pi$ {{0}} $^2$', blanks: [ { accept: ['r', 'R'], size: 3 } ], explanation: '$A = \\pi r^2$.' },
    { difficulty: 'medium', context: 'Circumference:', expression: '$C = 2\\pi$ {{0}}', blanks: [ { accept: ['r', 'R'], size: 3 } ], explanation: '$C = 2\\pi r$.' }
  ],
      stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Area/Volume Strategy</h4><ol><li>Identify the shape (2D or 3D).</li><li>Select the correct formula.</li><li>Identify the measurements: radius? base? height? slant height?</li><li>Substitute and compute. Include units (cm², cm³).</li></ol></div>` }
    },

    /* ============ TOPIC 5: Coordinate Geometry ============ */
    {
      id: 'coordinate-geometry',
      title: 'Coordinate Geometry',
      description: 'Connecting algebra and geometry. Distance, midpoint, slope, and equations of lines on the coordinate plane.',
      prereqRecap: [
        { term: 'Coordinate Plane', definition: 'Two perpendicular number lines (x-axis, y-axis). Points are $(x, y)$.' },
        { term: 'Linear Equation', definition: '$y = mx + b$ where $m$ is slope and $b$ is y-intercept.' }
      ],
      whyExists: { html: `
        <p><strong>Why coordinate geometry?</strong> René Descartes (1637) invented coordinate geometry by placing a grid on the geometric plane. This single idea merged algebra and geometry: every geometric shape becomes an equation, and every equation becomes a shape. A circle is $x^2 + y^2 = r^2$. A line is $y = mx + b$. This unification is one of the most powerful ideas in mathematics.</p>
        <p><strong>Why the distance formula?</strong> The distance between $(x_1, y_1)$ and $(x_2, y_2)$ is $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$. This IS the Pythagorean theorem: the horizontal distance $|x_2 - x_1|$ and vertical distance $|y_2 - y_1|$ are the legs of a right triangle, and $d$ is the hypotenuse.</p>
        <p><strong>Practical application:</strong> GPS uses coordinate geometry. Computer screens are coordinate grids (pixels). Every graph, chart, and data visualization uses the Cartesian coordinate system Descartes invented.</p>
      ` },
      hook: { html: `
        <div class="callout callout-puzzle"><h4>🧩 Puzzle: The Shortest Path</h4>
        <p>Two cities are at coordinates $(2, 3)$ and $(10, 9)$. The straight-line distance (\"as the crow flies\") is $\\sqrt{(10-2)^2 + (9-3)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$ units. The Pythagorean theorem gives exact distances on any grid.</p></div>` },
      concept: { html: `
        <div class="callout callout-key"><h4>Distance Formula</h4>
        <p>$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$</p>
        <p>This is the Pythagorean theorem applied to the horizontal and vertical legs of the right triangle connecting two points.</p></div>

        <div class="callout callout-key"><h4>Midpoint Formula</h4>
        <p>$$M = \\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right)$$</p>
        <p><strong>WHY:</strong> The midpoint is the average of each coordinate. Averaging two positions gives the point exactly halfway between them.</p></div>

        <div class="callout callout-key"><h4>Slope</h4>
        <p>$$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{rise}}{\\text{run}}$$</p>
        <p><strong>WHY:</strong> Slope measures how steep a line is. It answers: for each unit you move right, how many units do you move up (or down)?</p>
        <ul>
          <li>$m \\gt 0$: line goes uphill (left to right)</li>
          <li>$m \\lt 0$: line goes downhill</li>
          <li>$m = 0$: horizontal line</li>
          <li>$m$ undefined: vertical line (division by zero)</li>
        </ul></div>

        <div class="callout callout-key"><h4>Equations of Lines</h4>
        <ul>
          <li><strong>Slope-intercept:</strong> $y = mx + b$ (slope $m$, y-intercept $b$)</li>
          <li><strong>Point-slope:</strong> $y - y_1 = m(x - x_1)$ (slope $m$ through $(x_1, y_1)$)</li>
          <li><strong>Standard form:</strong> $Ax + By = C$</li>
        </ul>
        ${WHY('When to use which form?', '<p>Use <strong>slope-intercept</strong> when you know slope and y-intercept (or for graphing). Use <strong>point-slope</strong> when you know a point and a slope (fastest for writing equations). Use <strong>standard form</strong> for systems of equations and when both intercepts matter.</p>')}</div>
      ` },
      definition: { html: `<p><strong>Slope:</strong> $m = \\frac{\\Delta y}{\\Delta x}$, the rate of change of $y$ with respect to $x$.</p><p><strong>Distance Formula:</strong> Pythagorean theorem on a coordinate plane.</p>` },
      examples: [{
        title: 'Finding the Equation of a Line',
        problem: 'Find the equation of the line through $(1, 3)$ and $(4, 9)$.',
        steps: [
          { title: 'Find slope', content: '$m = \\frac{9 - 3}{4 - 1} = \\frac{6}{3} = 2$', why: 'Slope = rise/run = $\\Delta y / \\Delta x$.' },
          { title: 'Use point-slope form', content: '$y - 3 = 2(x - 1)$', why: 'Point-slope: $y - y_1 = m(x - x_1)$ with $(1, 3)$.' },
          { title: 'Simplify', content: '$y = 2x + 1$', why: 'Distribute and add 3: $y - 3 = 2x - 2 \\Rightarrow y = 2x + 1$.' },
          { title: 'Verify', content: 'Check $(4, 9)$: $2(4) + 1 = 9$ ✓', why: 'Substitute the other point to confirm.' }
        ]
      },
      {
        title: 'Distance and Midpoint',
        problem: 'Find the distance and midpoint between $A(−2, 5)$ and $B(4, −3)$.',
        steps: [
          { title: 'Distance', content: '$d = \\sqrt{(4-(-2))^2 + (-3-5)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$', why: 'Distance formula = Pythagorean theorem: legs $6$ and $8$, hypotenuse $10$. This is a $3$-$4$-$5$ triple scaled by $2$.' },
          { title: 'Midpoint', content: '$M = \\left(\\frac{-2+4}{2},\\ \\frac{5+(-3)}{2}\\right) = (1, 1)$', why: 'Average each coordinate: $(-2+4)/2 = 1$, $(5-3)/2 = 1$.' }
        ]
      }],
      matching: [
      {
        instruction: 'Match each formula to what it measures:',
        pairs: [
          { term: 'Distance formula', definition: 'Length between two points' },
          { term: 'Midpoint formula', definition: 'Center point of a segment' },
          { term: 'Slope formula', definition: 'Steepness of a line' },
          { term: 'Point-slope form', definition: 'Equation of a line through a point' }
        ]
      }
    ],
    fillBlanks: [
      { sentence: 'The slope of a horizontal line is ____.', answer: '0', hint: 'No rise, any run. Rise/run = 0.' },
      { sentence: 'The slope of a vertical line is ____.', answer: 'undefined', hint: 'Infinite rise, zero run. Division by zero.' },
      { sentence: 'Two perpendicular lines have slopes that are ____ reciprocals of each other.', answer: 'negative', hint: 'm1 * m2 = -1 for perpendicular lines.' }
    ],
    flashCards: [
      { type: 'why', front: 'Why use coordinates for geometry?', back: 'Descartes merged algebra and geometry. Coordinates turn shapes into equations. You can prove geometric theorems using algebra, and visualize algebraic equations as shapes.' },
      { type: 'how', front: 'How does the distance formula work?', back: 'It IS the Pythagorean theorem. Distance between (x1,y1) and (x2,y2): d = sqrt((x2-x1)^2 + (y2-y1)^2). The horizontal and vertical differences are the legs.' },
      { type: 'define', front: 'What is the midpoint formula?', back: 'Average the coordinates: M = ((x1+x2)/2, (y1+y2)/2). The midpoint is equidistant from both endpoints.' }
    ],
    exercises: [
        { difficulty: 'easy', question: 'The distance between $(0,0)$ and $(3,4)$ is:', options: ['$5$', '$7$', '$\\sqrt{7}$', '$25$'], correctIndex: 0, hint: '<p>$d = \\sqrt{3^2 + 4^2}$.</p>', correctExplanation: '$\\sqrt{9 + 16} = \\sqrt{25} = 5$. The classic $3$-$4$-$5$ Pythagorean triple.', wrongExplanations: { 1: '$3 + 4 = 7$. Distance uses squares, not plain addition.', 2: '$\\sqrt{7}$ would come from $\\sqrt{3+4}$, but the formula squares first.', 3: '$25 = 5^2$. You forgot to take the square root.' } },
        { difficulty: 'easy', question: 'The midpoint of $(2, 8)$ and $(6, 4)$ is:', options: ['$(4, 6)$', '$(8, 12)$', '$(4, 12)$', '$(2, 2)$'], correctIndex: 0, hint: '<p>Average each coordinate.</p>', correctExplanation: '$((2+6)/2, (8+4)/2) = (4, 6)$.', wrongExplanations: { 1: '$(2+6, 8+4) = (8, 12)$. You added instead of averaging.', 2: 'Mixed addition and averaging.', 3: '$(6-2)/2 = 2$ is the half-difference, not the midpoint x-coordinate.' } },
        { difficulty: 'medium', question: 'The slope of a line perpendicular to $y = \\frac{3}{4}x + 1$ is:', options: ['$\\frac{3}{4}$', '$-\\frac{3}{4}$', '$-\\frac{4}{3}$', '$\\frac{4}{3}$'], correctIndex: 2, hint: '<p>Perpendicular slopes: $m_1 \\cdot m_2 = -1$.</p>', correctExplanation: 'Original slope = $3/4$. Perpendicular: $-1/(3/4) = -4/3$. Product: $(3/4)(-4/3) = -1$ ✓.', wrongExplanations: { 0: 'Same slope means parallel, not perpendicular.', 1: 'Negating the slope gives $-3/4$, but perpendicular requires the negative RECIPROCAL.', 3: '$4/3$ is the reciprocal but positive. Must also negate.' } }
      ],
      freeResponse: [
        { difficulty: 'easy', question: 'Slope of the line through $(1, 2)$ and $(5, 10)$:', accept: [2, '2'], placeholder: 'm = ?', explanation: '$m = (10-2)/(5-1) = 8/4 = 2$.' },
        { difficulty: 'easy', question: 'Distance between $(0, 0)$ and $(5, 12)$:', accept: [13, '13'], placeholder: 'Distance', explanation: '$d = \\sqrt{25 + 144} = \\sqrt{169} = 13$.' },
        { difficulty: 'medium', question: 'Midpoint of $(-4, 6)$ and $(2, -2)$:', accept: ['(-1,2)', '(-1, 2)'], placeholder: '(x,y)', explanation: '$((-4+2)/2, (6-2)/2) = (-1, 2)$.' },
        { difficulty: 'medium', question: 'Line through $(0, 3)$ with slope $-2$. Equation in slope-intercept form:', accept: ['y=-2x+3', 'y = -2x + 3'], placeholder: 'y = ...', explanation: '$y = mx + b = -2x + 3$. The y-intercept $b = 3$ (the point is on the y-axis).' },
        { difficulty: 'hard', question: 'Distance between $(3, -1)$ and $(-5, 5)$:', accept: [10, '10'], placeholder: 'Distance', explanation: '$d = \\sqrt{(-8)^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$.' },
    { difficulty: 'easy', question: 'Distance from $(0,0)$ to $(3,4)$:', accept: [5, '5'], placeholder: 'Number', explanation: '$\\sqrt{9 + 16} = 5$.' },
    { difficulty: 'medium', question: 'Midpoint of $(2, 6)$ and $(8, 10)$:', accept: ['(5,8)', '(5, 8)'], placeholder: 'Point', explanation: '$(\\frac{2+8}{2}, \\frac{6+10}{2}) = (5, 8)$.' },
    { difficulty: 'hard', question: 'Equation of circle with center $(2, 3)$ and radius 5:', accept: ['(x-2)^2+(y-3)^2=25'], placeholder: 'Equation', explanation: '$(x-h)^2 + (y-k)^2 = r^2$.' }
      ],
      stepBuilder: [
        { difficulty: 'medium', question: 'Find the equation of the line through $(2, 1)$ and perpendicular to $y = 3x + 5$.', steps: [
          { content: 'Slope of given line: $m = 3$.' },
          { content: 'Perpendicular slope: $m_{\\perp} = -1/3$.' },
          { content: 'Point-slope form: $y - 1 = -\\frac{1}{3}(x - 2)$.' },
          { content: 'Simplify: $y = -\\frac{1}{3}x + \\frac{2}{3} + 1 = -\\frac{1}{3}x + \\frac{5}{3}$.' }
        ], explanation: 'Perpendicular lines have slopes that are negative reciprocals. Use point-slope form with the given point.' }
      ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Slope formula:', expression: '$m = \\frac{y_2 - y_1}{$ {{0}} $- x_1}$', blanks: [ { accept: ['x_2', 'x2'], size: 4 } ], explanation: 'Slope = rise / run.' },
    { difficulty: 'medium', context: 'Parallel lines:', expression: 'Parallel lines have {{0}} slopes.', blanks: [ { accept: ['equal', 'the same'], size: 8 } ], explanation: 'Same slope means the lines never intersect.' }
  ],
      stuckGuide: { html: `<div class="callout callout-tip"><h4>🧠 Coordinate Geometry Strategy</h4><ol><li><strong>Two points?</strong> Use distance, midpoint, or slope formulas.</li><li><strong>Need equation?</strong> Find slope first, then use point-slope form.</li><li><strong>Parallel?</strong> Same slope. <strong>Perpendicular?</strong> Negative reciprocal slopes.</li></ol></div>` }
    }

    ]
  });
})();
