/* ============================================================
   MODULE: Geometry
   Basic shapes, triangles, circles, area/volume, coordinate geometry
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
        <p><strong>Why study geometry?</strong> Geometry grew from the practical need to measure land, build structures, and describe space. A geometric statement turns a shape into precise claims about distance, angle, area, and position.</p>
        <p><strong>Why start with points, lines, and angles?</strong> Classical Euclidean geometry begins from undefined terms and postulates. Every later result depends on those starting assumptions. This makes geometry a direct introduction to axiomatic reasoning.</p>
        <p><strong>Practical application:</strong> Architecture, engineering drawings, surveying, computer graphics, robotics path planning, and GPS triangulation all depend on geometric principles.</p>
        ${WHY('What are Euclid\'s five postulates?', '<p>1. A line segment can be drawn between any two points. 2. A line segment can be extended infinitely. 3. A circle can be drawn with any center and radius. 4. All right angles are equal. 5. (Parallel Postulate) Through a point not on a line, exactly one parallel line exists. The fifth postulate is special: denying it produces non-Euclidean geometry (used in Einstein\'s General Relativity).</p>')}
      ` },
      hook: { html: `
        <div class="callout callout-puzzle"><h4> Puzzle: The Angles in a Triangle</h4>
        <p>Draw any triangle. Measure all three angles. Add them up. The sum is $180^\\circ$ in Euclidean geometry. Tear the three corners off a paper triangle and arrange them along a straight line. They fit because a straight line measures $180^\\circ$.</p></div>` },
      formalDefinitions: [
      { term: 'Point', symbol: '', definition: 'A location in space with no dimension (no length, width, or height). Represented by a dot and named with a capital letter.' },
      { term: 'Line', symbol: '$\\overleftrightarrow{AB}$', definition: 'A straight path extending infinitely in both directions. Defined by any two distinct points. Has one dimension (length only).' },
      { term: 'Angle', symbol: '$\\angle ABC$', definition: 'Formed by two rays sharing vertex B. A turn can be measured in degrees or radians; one full turn is $360^\\circ = 2\\pi$ radians. Directed angles can exceed one turn or be negative.' },
      { term: 'Parallel Lines', symbol: '$\\ell_1 \\parallel \\ell_2$', definition: 'Distinct lines in the same plane that never intersect. Nonvertical parallel lines have equal slopes; two distinct vertical lines are also parallel. If cut by a transversal, alternate interior angles are equal.' },
      { term: 'Perpendicular Lines', symbol: '$\\ell_1 \\perp \\ell_2$', definition: 'Lines that intersect at a $90^\\circ$ angle. When both slopes are finite, $m_1 \\cdot m_2 = -1$. A horizontal line and a vertical line are also perpendicular.' }
    ],
    background: {
      title: 'Why Geometry? Measuring Space',
      content: '<p>The word <strong>geometry</strong> comes from Greek roots associated with earth and measurement. The subject formalizes practical measurement into definitions, diagrams, and proofs.</p><p>Classical Euclidean geometry organized spatial reasoning through axioms, definitions, and theorems. That structure still matters because it shows how a small set of assumptions can generate many reliable conclusions.</p><p><strong>Why angles are measured in degrees:</strong> A full rotation is divided into $360^\\circ$. This convention is useful because 360 has many divisors, so common fractions of a turn have whole-number degree measures.</p>'
    },
    mathGrammar: [
      { question: 'Why do angles in a Euclidean triangle add to $180^\\circ$?', answer: 'Draw a line through one vertex parallel to the opposite side. Alternate interior angles reproduce the other two vertex angles beside the angle at that vertex. The three angles form a straight angle, so their sum is $180^\\circ$. The parallel-line assumption matters; triangles drawn with geodesics on a sphere need not have this sum.' },
      { question: 'What does "perpendicular" mean and when does $m_1 \\cdot m_2 = -1$ apply?', answer: 'Perpendicular means "at right angles" ($90^\\circ$). A direction with rise 2 and run 1 rotates to a direction with rise 1 and run -2, which has slope $-\\frac{1}{2}$. The product is $-1$ when both slopes are finite. A horizontal and a vertical line are perpendicular, but the vertical slope is undefined, so there is no slope product to compute.' },
      { question: 'Why is area measured in "square units"?', answer: 'Area measures how many unit squares fit inside a shape. A rectangle $3 \\times 4$ contains $12$ squares of size $1 \\times 1$. The word "square" in "square meters" refers to these unit squares, not to the shape being measured.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 580 160" width="580" height="160" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="geometry-angle-title geometry-angle-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="geometry-angle-title">Four angle classifications</title>
  <desc id="geometry-angle-desc">Counterclockwise angles from a horizontal ray measure 45, 90, 120, and 180 degrees. The 120-degree ray points up and left. The right-angle square touches both perpendicular rays.</desc>
  <g fill="none" stroke-width="2">
    <path d="M 22 105 H 92 M 22 105 L 71.497 55.503" stroke="#3b82f6"/>
    <path d="M 44 105 A 22 22 0 0 0 37.556 89.444" stroke="#3b82f6"/>
    <path d="M 162 105 H 232 M 162 105 V 35 M 162 93 H 174 V 105" stroke="#10b981"/>
    <path d="M 320 105 H 400 M 320 105 L 285 44.378" stroke="#f59e0b"/>
    <path d="M 342 105 A 22 22 0 0 0 309 85.947" stroke="#f59e0b"/>
    <path d="M 415 105 H 555 M 507 105 A 22 22 0 0 0 463 105" stroke="#ef4444"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="15">
    <text x="58" y="81" fill="#3b82f6">45°</text>
    <text x="182" y="76" fill="#10b981">90°</text>
    <text x="335" y="76" fill="#f59e0b">120°</text>
    <text x="485" y="70" fill="#ef4444" text-anchor="middle">180°</text>
  </g>
  <g fill="#e2e8f0" font-family="Inter, sans-serif" font-size="15" text-anchor="middle">
    <text x="58" y="142">Acute</text>
    <text x="198" y="142">Right</text>
    <text x="345" y="142">Obtuse</text>
    <text x="485" y="142">Straight</text>
  </g>
</svg>
</div>
<p class="math-diagram-label">Acute: between 0° and 90°. Right: 90°. Obtuse: between 90° and 180°. Straight: 180°. The bounds for acute and obtuse angles are excluded.</p>

        <div class="callout callout-key"><h4>Undefined Terms</h4>
        <p><strong>Point:</strong> A location with no size. Represented by a dot, labeled with a capital letter ($A$, $B$, $C$).</p>
        <p><strong>Line:</strong> A straight path extending infinitely in both directions. Determined by any two distinct points.</p>
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
        <p><strong>Parallel lines</strong> ($\\ell_1 \\parallel \\ell_2$) are distinct coplanar lines that never intersect. Nonvertical parallel lines have the same slope. Distinct vertical lines are parallel even though neither has a finite slope.</p>
        <p><strong>Perpendicular lines</strong> ($\\ell_1 \\perp \\ell_2$) intersect at $90°$. When both slopes are finite, they are negative reciprocals: $m_1 \\cdot m_2 = -1$. A horizontal line and a vertical line form the separate zero-slope and undefined-slope case.</p>
        ${WHY('Why negative reciprocals?', '<p>A $90°$ rotation sends a direction vector $(b,a)$ to $(-a,b)$. If $a$ and $b$ are both nonzero, the original slope is $\\frac{a}{b}$ and the rotated slope is $-\\frac{b}{a}$. Their product is $-1$. When either component is zero, the rotation exchanges a horizontal direction and a vertical direction.</p>')}</div>

        <div class="callout callout-tip"><h4>Read the givens before the picture</h4>
        <p>A drawing suggests a relationship; the stated measurements and marks establish it. Apply alternate-interior or corresponding-angle rules only after the problem gives parallel lines, or after you prove parallelism. Equal-looking lengths and angles do not establish congruence.</p>
        <p>Complementary and supplementary angles need not touch. Two separated angles of $35°$ and $55°$ are complementary because their measures add to $90°$. A linear pair is a stronger geometric condition: its adjacent angles share a ray, and the other two rays point in opposite directions.</p>
        <p>When a diagram marks the smaller angle between two rays, a reflex turn around the other side measures $360°$ minus that smaller angle. Identify which turn the question asks you to measure.</p></div>
      ` },
      definition: { html: `<p><strong>Angle:</strong> The figure formed by two rays sharing a common endpoint. Measured in degrees ($°$) or radians.</p><p><strong>Parallel Lines:</strong> Lines in the same plane that never intersect.</p>` },
      examples: [{
        title: 'Finding Unknown Angles',
        problem: 'Two angles are supplementary. One is $35°$ more than twice the other. Find both angles.',
        steps: [
          { title: 'Set up variables', content: 'Let $x$ = smaller angle. Then larger angle = $2x + 35$.', why: 'Translate "35 more than twice" into algebra.' },
          { title: 'Use supplementary relationship', content: '$x + (2x + 35) = 180$', why: 'Supplementary angles sum to $180°$. This is the definition.' },
          { title: 'Solve', content: '$3x + 35 = 180 \\Rightarrow 3x = 145 \\Rightarrow x = 48.\\overline{3}°$', why: 'Standard linear equation solving.' },
          { title: 'Find both', content: 'Smaller = $48.\\overline{3}°$, Larger = $2(48.\\overline{3}) + 35 = 131.\\overline{6}°$. Check: $48.\\overline{3} + 131.\\overline{6} = 180°$ ', why: 'Always verify the constraint is satisfied.' }
        ]
      },
      {
        title: 'Parallel Lines and Transversals',
        problem: 'A transversal crosses two parallel lines. One angle is $3x + 10$ degrees, and the co-interior angle is $2x + 20$ degrees. Find $x$.',
        steps: [
          { title: 'Identify relationship', content: 'Co-interior (same-side interior) angles between parallel lines are supplementary.', why: 'This follows from the Parallel Postulate: corresponding angles are equal, and adjacent angles on a straight line sum to $180°$.' },
          { title: 'Set up equation', content: '$(3x + 10) + (2x + 20) = 180$', why: 'Co-interior angles sum to $180°$.' },
          { title: 'Solve', content: '$5x + 30 = 180 \\Rightarrow 5x = 150 \\Rightarrow x = 30$', why: 'Combine like terms, subtract 30, divide by 5.' },
          { title: 'Find angles', content: '$3(30) + 10 = 100°$ and $2(30) + 20 = 80°$. Check: $100 + 80 = 180°$ ', why: 'Verification confirms the parallel-line property holds.' }
        ]
      },
      {
        title: 'Turning Around a Regular Octagon',
        problem: 'A robot follows the boundary of a regular convex octagon. How far must it turn at each vertex, and what is each interior angle?',
        steps: [
          { title: 'Count the total turn', content: 'One complete trip around the boundary turns the heading through $360°$.', why: 'The robot starts and finishes facing the same direction after one full rotation. This is the sum of the exterior turns of a convex polygon.' },
          { title: 'Use regularity', content: 'All eight turns are equal, so each turn is $360°/8=45°$.', why: 'An arbitrary octagon still has total exterior turn 360 degrees, but its individual turns need not be equal.' },
          { title: 'Find the interior angle', content: 'Each interior angle is $180°-45°=135°$. For a regular convex n-gon, the same reasoning gives exterior angle $360°/n$ and interior angle $180°-360°/n$.', why: 'The exterior turn and the interior angle form a supplementary pair. The method transfers to designing bends in tracks or paths.' }
        ]
      },
      {
        title: 'A Perpendicular Line with No Slope Product',
        problem: 'Find the line through $(7,-2)$ perpendicular to the vertical line $x=4$.',
        steps: [
          { title: 'Identify the direction', content: 'The line $x=4$ is vertical. Its perpendicular direction is horizontal.', why: 'Every point on the given line has the same x-coordinate, so the slope formula would divide by zero.' },
          { title: 'Use the given point', content: 'The horizontal line through $(7,-2)$ is $y=-2$.', why: 'A horizontal line keeps its y-coordinate fixed. The point determines which horizontal line to choose.' },
          { title: 'Check the geometry', content: 'The lines meet at $(4,-2)$ and form a right angle.', why: 'The finite-slope rule cannot be applied to the vertical line. Direction gives the correct answer without dividing by zero.' }
        ]
      }],
      flashCards: [
      { type: 'define', front: 'What is a point?', back: 'An exact location with no size. One of the undefined terms in Euclidean geometry. Named with a capital letter like A or P.' },
      { type: 'why', front: 'Why do Euclidean triangle angles sum to 180 degrees?', back: 'Draw a line through one vertex parallel to the opposite side. Alternate interior angles reproduce the other two triangle angles beside the vertex angle. Together they form a straight angle of 180 degrees.' },
      { type: 'define', front: 'Acute vs Right vs Obtuse?', back: 'Acute: less than 90 degrees. Right: exactly 90. Obtuse: between 90 and 180. Straight: exactly 180.' },
      { type: 'how', front: 'Find a missing triangle angle?', back: 'Three angles sum to 180. Subtract known angles: 180 - 50 - 70 = 60 degrees.' }
    ],
    exercises: [
        { difficulty: 'easy', question: 'An angle measures $47°$. What is its complement?', options: ['$43°$', '$133°$', '$47°$', '$90°$'], correctIndex: 0, hint: '<p>Complementary angles sum to $90°$.</p>', correctExplanation: '$90° - 47° = 43°$. Complementary means the two angles form a right angle together.', wrongExplanations: { 1: '$180° - 47° = 133°$ is the supplement, not the complement.', 2: 'An angle is not its own complement unless it is $45°$.', 3: '$90°$ is a right angle, not the complement of $47°$.' } },
        { difficulty: 'easy', question: 'Vertical angles are always:', options: ['Supplementary', 'Equal', 'Complementary', 'Right angles'], correctIndex: 1, hint: '<p>When two lines cross, opposite angles are formed.</p>', correctExplanation: 'Vertical angles are equal. If one is $x°$, the adjacent angle is $180° - x°$, and the opposite angle must also be $x°$ because it is supplementary to the same adjacent angle.', wrongExplanations: { 0: 'Adjacent angles are supplementary. Vertical angles are equal.', 2: 'Complementary means summing to $90°$, which is not generally true for vertical angles.', 3: 'Vertical angles can be any measure, not necessarily $90°$.' } },
        { difficulty: 'medium', question: 'Two parallel lines are cut by a transversal. If one angle is $72°$, the alternate interior angle is:', options: ['$108°$', '$72°$', '$18°$', '$144°$'], correctIndex: 1, hint: '<p>Alternate interior angles between parallel lines are equal.</p>', correctExplanation: 'Alternate interior angles are equal when lines are parallel. This is a consequence of the Parallel Postulate.', wrongExplanations: { 0: '$108°$ is the co-interior (same-side interior) angle, not the alternate interior.', 2: '$90° - 72° = 18°$ is the complement, unrelated here.', 3: '$2 \\times 72° = 144°$ has no geometric significance here.' } },
        { difficulty: 'medium', question: 'If two perpendicular lines both have finite slopes, the product of their slopes is:', options: ['$0$', '$1$', '$-1$', 'Undefined'], correctIndex: 2, hint: '<p>Perpendicular means $90°$ intersection.</p>', correctExplanation: '$m_1 \\cdot m_2 = -1$ when both perpendicular slopes are finite. This follows from rotating a direction by $90°$.', wrongExplanations: { 0: 'Slope product = $0$ means one line is horizontal, which does not guarantee perpendicularity.', 1: 'Slope product = $1$ means the lines have the same steepness, not perpendicularity.', 3: 'A vertical slope is undefined, so no slope product exists for a vertical-horizontal pair. The question specifies finite slopes, which excludes that case.' } }
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
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'Two angles that add up to 90 degrees are called {{0}} angles.', blanks: [ { accept: ['complementary'], size: 16 } ], explanation: 'Think: they COMPLETE a right angle.' },
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'Two angles that add up to 180 degrees are called {{0}} angles.', blanks: [ { accept: ['supplementary'], size: 16 } ], explanation: 'Their measures add to 180 degrees, whether or not the angles are adjacent.' },
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'When two lines intersect, the opposite angles are called {{0}} angles and they are always equal.', blanks: [ { accept: ['vertical'], size: 16 } ], explanation: 'They share a vertex but no sides.' },
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'The sum of the interior angles in a Euclidean triangle is {{0}} degrees.', blanks: [ { accept: ['180'], size: 16 } ], explanation: 'Tear the three corners: they form a straight line.' },
    { difficulty: 'easy', context: 'Angle relationships:', expression: 'Two angles that add to $90°$ are called {{0}}.', blanks: [ { accept: ['complementary'], size: 14 } ], explanation: 'Complementary angles sum to $90°$.' },
      { difficulty: 'easy', context: 'Supplementary angles:', expression: 'Two angles are supplementary if they add up to {{0}}$°$.', blanks: [ { accept: ['180'], size: 4 } ], explanation: 'Supplementary: sum = $180°$.' },
    { difficulty: 'easy', context: 'Complementary angles:', expression: 'Two angles are complementary if they add up to {{0}}$°$.', blanks: [ { accept: ['90'], size: 4 } ], explanation: 'Complementary: sum = $90°$.' }
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
    { difficulty: 'medium', question: 'When a transversal cuts two parallel lines, alternate interior angles are:', accept: ['equal', 'congruent'], placeholder: 'Property', explanation: 'When a transversal cuts parallel lines, alternate interior angles are congruent.' },
    { difficulty: 'hard', question: 'Sum of exterior angles of any convex polygon:', accept: [360, '360'], placeholder: 'Degrees', explanation: 'The sum of exterior angles of any convex polygon is always $360°$.' },
    { difficulty: 'hard', question: 'Number of diagonals in a convex $n$-gon: $\\frac{n(n-3)}{2}$. For $n = 6$:', accept: [9, '9'], placeholder: 'Number', explanation: '$6(6-3)/2 = 6 \\times 3/2 = 9$.' },
    { difficulty: 'medium', question: 'A regular polygon has all sides equal and all angles:', accept: ['equal', 'congruent'], placeholder: 'Property', explanation: 'Regular polygon: equilateral and equiangular.' },
    { difficulty: 'easy', question: 'Straight angle measures:', accept: [180, '180'], placeholder: 'Degrees', explanation: 'Straight angle: $180°$.' },
    { difficulty: 'hard', question: 'Interior angle of a regular $n$-gon: $\\frac{(n-2) \\times 180}{n}$. For $n = 8$:', accept: [135, '135'], placeholder: 'Degrees', explanation: '$(8-2)(180)/8 = 6(180)/8 = 135°$.' },
    { difficulty: 'medium', question: 'Corresponding angles formed by transversal cutting parallel lines are:', accept: ['equal', 'congruent'], placeholder: 'Property', explanation: 'Corresponding angles: congruent when lines are parallel.' },
    { difficulty: 'hard', question: 'The angle inscribed in a semicircle is always:', accept: [90, '90', 'right'], placeholder: 'Degrees', explanation: 'Thales theorem: angle in a semicircle is $90°$.' },
    { difficulty: 'easy', question: 'When a transversal cuts two parallel lines, co-interior (same-side interior) angles sum to:', accept: [180, '180'], placeholder: 'Degrees', explanation: 'Co-interior angles: supplementary (sum to $180°$) when lines are parallel.' },
    { difficulty: 'hard', question: 'Cyclic quadrilateral: opposite angles sum to:', accept: [180, '180'], placeholder: 'Degrees', explanation: 'Cyclic quadrilateral: opposite angles are supplementary.' },
    { difficulty: 'easy', question: 'A line segment has _____ endpoints.', accept: [2, '2', 'two'], placeholder: 'Number', explanation: 'Line segment: two endpoints.' },
    { difficulty: 'hard', question: 'Interior angle sum: $(n-2) \\times 180$. For pentagon ($n=5$):', accept: [540, '540'], placeholder: 'Degrees', explanation: '$(5-2)(180) = 540°$.' },
    { difficulty: 'easy', question: 'Vertical angles are:', accept: ['equal', 'congruent'], placeholder: 'Property', explanation: 'Vertical angles: congruent (formed by intersecting lines).' },
    { difficulty: 'hard', question: 'Menelaus theorem applies to a triangle cut by a:', accept: ['transversal', 'line'], placeholder: 'What?', explanation: 'Menelaus relates the ratios at which a line meets the three side-lines of a triangle. With a consistent directed-segment convention, the product is $-1$; using unsigned lengths gives product $1$.' },
    { difficulty: 'easy', question: 'Supplementary angles sum to:', accept: [180, '180'], placeholder: 'Degrees', explanation: '$180°$.' },
    { difficulty: 'hard', question: 'Cross-ratio is invariant under:', accept: ['projective transformation', 'projective transformations'], placeholder: 'What?', explanation: 'Cross-ratio: $(A,B;C,D)$ is preserved by projective transformations.' },
    { difficulty: 'medium', question: 'Complementary angles sum to:', accept: [90, '90'], placeholder: 'Degrees', explanation: '$90°$.' },
    { difficulty: 'hard', question: 'In a projective plane, two distinct lines intersect in:', accept: ['one point', 'a point', 'exactly one point'], placeholder: 'What?', explanation: 'Every pair of distinct lines in a projective plane meets in exactly one point. This includes a point at infinity for a pair that appears parallel in an affine drawing. In projective three-dimensional space, skew lines can remain disjoint.' },
    { difficulty: 'medium', question: 'Alternate interior angles with parallel lines are:', accept: ['equal', 'congruent'], placeholder: 'Property', explanation: 'Alternate interior: congruent when lines are parallel.' },
    { difficulty: 'hard', question: 'Name one property preserved by an invertible affine transformation:', accept: ['parallelism', 'ratios along a line', 'ratios of collinear segments', 'collinearity'], placeholder: 'Property', explanation: 'An invertible affine transformation preserves collinearity, parallelism, and ratios of lengths along the same line. It need not preserve angles or lengths, or the ratio of lengths in different directions.' }
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

      stuckGuide: { html: `<div class="callout callout-tip"><h4> Angle Problem Strategy</h4><ol><li><strong>Identify the relationship:</strong> complementary ($90°$), supplementary ($180°$), vertical (equal), or parallel-line property.</li><li><strong>Set up an equation</strong> using that relationship.</li><li><strong>Solve</strong> and verify.</li></ol></div>` }
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
        <p><strong>Why are triangles so important?</strong> Every simple polygon can be decomposed into triangles (triangulation). Three valid side lengths determine a triangle's shape up to reflection. A framework made of rigid bars with movable joints can therefore hold its shape through triangular supports. A four-bar square can change its angles while retaining its side lengths.</p>
        <p><strong>Why the Pythagorean Theorem?</strong> In a right triangle with legs $a$, $b$ and hypotenuse $c$: $a^2 + b^2 = c^2$. This relationship is a <em>consequence</em> of Euclidean geometry's axioms. It fails in non-Euclidean geometry (curved surfaces). It is the foundation of the distance formula, trigonometry, and vector magnitude.</p>
        <p><strong>Practical application:</strong> Surveying, construction, navigation (GPS uses trilateration), screen resolution (pixel distance), and every physics problem involving right-angle components.</p>
        ${WHY('Why does the triangle angle sum equal $180°$?', '<p>Draw line $\\ell$ through one vertex, parallel to the opposite side. The angles formed at the vertex include the triangle\'s top angle plus two alternate interior angles (from the parallel line). These alternate interior angles equal the triangle\'s base angles (by the Parallel Postulate). The three angles together form a straight line ($180°$). Therefore the triangle\'s angles sum to $180°$.</p>')}
      ` },
      hook: { html: `
        <div class="callout callout-puzzle"><h4> Puzzle: The Pythagorean Proof</h4>
        <p>Draw a right triangle with legs $3$ and $4$. Build a square on each side. The squares have areas $9$, $16$, and $25$. Notice: $9 + 16 = 25$. The area of the square on the hypotenuse equals the sum of the areas on the legs. This works for ANY right triangle.</p></div>` },
      formalDefinitions: [
      { term: 'Triangle', symbol: '$\\triangle ABC$', definition: 'A polygon with three sides and three angles. The sum of interior angles is always $180^\\circ$.' },
      { term: 'Pythagorean Theorem', symbol: '$a^2 + b^2 = c^2$', definition: 'In a right triangle, the square of the hypotenuse equals the sum of the squares of the legs. Only holds for right triangles.' },
      { term: 'Congruence (SSS, SAS, ASA, AAS)', symbol: '$\\triangle ABC \\cong \\triangle DEF$', definition: 'Two triangles are congruent if they have the same shape and size. All corresponding sides and angles are equal.' },
      { term: 'Similarity', symbol: '$\\triangle ABC \\sim \\triangle DEF$', definition: 'Two triangles are similar if they have the same shape (same angles). Corresponding sides are proportional: $\\frac{a}{d} = \\frac{b}{e} = \\frac{c}{f}$.' }
    ],
    concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 460 370" width="460" height="370" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="geometry-pythagorean-title geometry-pythagorean-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="geometry-pythagorean-title">A 3-4-5 triangle with a square on each side</title>
  <desc id="geometry-pythagorean-desc">The horizontal leg is 3 units, the vertical leg is 4 units, and the hypotenuse is 5 units. The attached squares use the same length scale and have areas 9, 16, and 25 square units.</desc>
  <polygon points="190,250 280,250 280,340 190,340" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-width="2"/>
  <polygon points="190,250 190,130 70,130 70,250" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="2"/>
  <polygon points="190,130 280,250 400,160 310,40" fill="#ef4444" fill-opacity="0.15" stroke="#ef4444" stroke-width="2"/>
  <polygon points="190,250 280,250 190,130" fill="none" stroke="#e2e8f0" stroke-width="2"/>
  <path d="M 190 236 H 204 V 250" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
  <g font-family="Inter, sans-serif" font-size="16" text-anchor="middle">
    <text x="235" y="240" fill="#3b82f6">a = 3</text>
    <text x="175" y="195" fill="#10b981" transform="rotate(-90 175 195)">b = 4</text>
    <text x="242" y="186" fill="#ef4444" transform="rotate(53.1301 242 186)">c = 5</text>
    <text x="235" y="299" fill="#3b82f6">a² = 9</text>
    <text x="130" y="195" fill="#10b981">b² = 16</text>
    <text x="300" y="145" fill="#ef4444">c² = 25</text>
    <text x="119" y="68" fill="#e2e8f0">9 + 16 = 25</text>
  </g>
</svg>
</div>
<p class="math-diagram-label">The Pythagorean Theorem: a 3-4-5 right triangle with area squares</p>

        <div class="callout callout-key"><h4>Triangle Classification</h4>
        <p><strong>By sides:</strong> Equilateral (all three equal), Isosceles (at least two equal), Scalene (no equal pair).</p>
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
        <p><strong>Not a general congruence rule:</strong> SSA can produce zero, one, or two triangles. A right-triangle exception is <strong>HL</strong>: a known right angle, equal hypotenuses, and one pair of equal legs establish congruence.</p>
        ${WHY('Why does SSS work but SSA does not?', '<p>Three positive side lengths satisfying the triangle inequality determine one triangle up to rotation, translation, and reflection. With SSA, a circle centered at the end of the known side can meet the remaining ray twice, once, or not at all. One intersection can occur for a right triangle or for other length conditions. That possible ambiguity prevents SSA from serving as a general congruence test.</p>')}</div>

        <div class="callout callout-key"><h4>Triangle Similarity (Same Shape, Different Size)</h4>
        <p>Two triangles are similar ($\\triangle ABC \\sim \\triangle DEF$) if corresponding angles are equal AND corresponding sides are proportional: $\\frac{a}{d} = \\frac{b}{e} = \\frac{c}{f}$.</p>
        <ul>
          <li><strong>AA:</strong> Two equal angles guarantee similarity (the third angle is forced by the $180°$ sum).</li>
          <li><strong>SAS~:</strong> Two sides proportional with equal included angle.</li>
          <li><strong>SSS~:</strong> All three sides proportional.</li>
        </ul></div>

        <div class="callout callout-tip"><h4>Existence, correspondence, and scale</h4>
        <p>For positive proposed side lengths with longest side $c$, check $a+b \\gt c$ before classifying the triangle. Equality produces a flat, degenerate figure. With a valid triangle, $c^2=a^2+b^2$ identifies a right angle opposite $c$; $c^2 \\gt a^2+b^2$ identifies an obtuse angle, and $c^2 \\lt a^2+b^2$ identifies an acute triangle.</p>
        <p>Match equal angles before writing a side ratio. The notation $\\triangle ABC \\sim \\triangle DEF$ states $A\\leftrightarrow D$, $B\\leftrightarrow E$, and $C\\leftrightarrow F$. It therefore pairs $AB$ with $DE$, $BC$ with $EF$, and $AC$ with $DF$.</p>
        <p>If the scale factor from the original figure to its image is $k \\gt 0$, lengths and perimeters multiply by $k$, and areas multiply by $k^2$. Similarity includes $k=1$, so congruent triangles are also similar. Here an isosceles triangle means at least two equal sides; an equilateral triangle is a special case.</p></div>

        <div class="callout callout-key"><h4>Derive the special right-triangle ratios</h4>
        <p>A $45°$-$45°$-$90°$ triangle has equal legs $a$. Pythagoras gives $c^2=2a^2$, so $c=a\\sqrt2$. Its side ratio is $1:1:\\sqrt2$. The diagonal of a square with side 8 therefore measures $8\\sqrt2$, rather than 16.</p>
        <p>Cut an equilateral triangle of side $2a$ along an altitude. Each half has angles $30°$, $60°$, and $90°$, with short leg $a$ and hypotenuse $2a$. The remaining leg is $\\sqrt{(2a)^2-a^2}=a\\sqrt3$. The ratio is $1:\\sqrt3:2$, with the shortest side opposite $30°$. Match sides to their opposite angles before scaling the ratio.</p></div>

        <div class="callout callout-key"><h4>Triangle lines and centers</h4>
        <p>A <strong>median</strong> joins a vertex to the midpoint of the opposite side. An <strong>altitude</strong> passes through a vertex perpendicular to the opposite side-line; it can meet an extension of that side in an obtuse triangle. An <strong>angle bisector</strong> divides a vertex angle into two equal angles. These lines need not coincide.</p>
        <p>The three medians meet at the <strong>centroid</strong>, which divides each median in a $2:1$ ratio measured from the vertex. In coordinates, the centroid is $((x_A+x_B+x_C)/3,(y_A+y_B+y_C)/3)$. The three altitudes meet at the <strong>orthocenter</strong>. An obtuse triangle has its orthocenter outside the triangle; its centroid stays inside.</p>
        <p>The angle-bisector theorem gives $BD/DC=AB/AC$ when the bisector from A meets side BC at D. For $AB=6$, $AC=9$, and $BC=10$, the ratio is $2:3$, so $BD=4$ and $DC=6$. The bisector reaches the midpoint only when the adjacent sides are equal.</p></div>
      ` },
      definition: { html: `<p><strong>Pythagorean Theorem:</strong> In a right triangle, $a^2 + b^2 = c^2$, where $c$ is the hypotenuse.</p><p><strong>Congruent:</strong> Same shape and size. <strong>Similar:</strong> Same shape, possibly different size, with corresponding sides proportional.</p>` },
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
        problem: 'Triangle $ABC$ has $\\angle A=40°$, $\\angle B=60°$, and $\\angle C=80°$. Triangle $DEF$ has $\\angle D=60°$, $\\angle E=80°$, and unknown $\\angle F$. Are they similar? If $AB=12$ and $FD=8$, find the scale factor from $DEF$ to $ABC$.',
        steps: [
          { title: 'Find the missing angle', content: '$\\angle F = 180° - 60° - 80° = 40°$.', why: 'Triangle angle sum = $180°$.' },
          { title: 'Match the vertices', content: '$A\\leftrightarrow F$, $B\\leftrightarrow D$, and $C\\leftrightarrow E$, so $\\triangle ABC \\sim \\triangle FDE$ by AA.', why: 'The order of letters must preserve equal angles. Listing the same three measures establishes similarity, but it does not make AB correspond to DE.' },
          { title: 'Find the directed scale factor', content: 'From $DEF$ to $ABC$, $k=\\frac{AB}{FD}=\\frac{12}{8}=\\frac{3}{2}$. In the reverse direction, the factor is $\\frac{2}{3}$.', why: 'AB and FD connect the matching 40-degree and 60-degree vertices. State which figure is the starting figure before selecting the ratio.' }
        ]
      },
      {
        title: 'Measuring a Building with Shadows',
        problem: 'At the same time, a vertical 1.8 m pole casts a 1.2 m shadow and a building casts an 18 m shadow. Find the building height, assuming level ground and parallel sunlight rays.',
        steps: [
          { title: 'Justify similarity', content: 'The pole and building form right triangles with the ground. Parallel sunlight rays give the same angle between each ray and the ground.', why: 'AA similarity requires shared angle conditions. Shadows measured at different times or on differently sloped ground need not produce these similar triangles.' },
          { title: 'Match heights to shadows', content: '$\\frac{h}{18}=\\frac{1.8}{1.2}=1.5$.', why: 'The corresponding vertical lengths go in the numerators and the corresponding ground lengths go in the denominators.' },
          { title: 'Solve and check', content: '$h=18(1.5)=27$ m. The shadow scale factor is $18/1.2=15$, and $1.8(15)=27$ m.', why: 'Two equivalent ratios provide a check. This method transfers to inaccessible objects when the geometric assumptions hold.' }
        ]
      },
      {
        title: 'Check Whether a Triangle Exists Before Classifying It',
        problem: 'Classify a proposed triangle with sides 7, 8, and 12. Can sides 4, 5, and 9 form another triangle?',
        steps: [
          { title: 'Check existence', content: 'For $7,8,12$, the longest side is 12 and $7+8=15\\gt12$. The positive lengths form a nondegenerate triangle.', why: 'With the longest side identified, this one strict inequality implies the other two triangle inequalities.' },
          { title: 'Compare squared lengths', content: '$12^2=144$ and $7^2+8^2=113$. Since $144\\gt113$, the angle opposite 12 is obtuse.', why: 'The Pythagorean equality is the boundary between acute and obtuse triangles. A longer opposite side makes that angle larger than 90 degrees.' },
          { title: 'Test the second proposal', content: '$4+5=9$, so these lengths form a straight, degenerate figure rather than a triangle with positive area.', why: 'Equality fails the strict triangle inequality. Do not apply triangle classification to an impossible or degenerate proposal.' }
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
      solution: { steps: ['Check Pythagorean theorem: 36 + 64 = 100.', '10^2 = 100, so the equation holds.', 'It is a right triangle with hypotenuse 10.'] }
    }
    ],
    matching: [
      {
        instruction: 'Match each triangle type to its property:',
        pairs: [
          { term: 'Equilateral', definition: 'All three sides equal, all angles 60 degrees' },
          { term: 'Isosceles', definition: 'At least two equal sides and two equal base angles' },
          { term: 'Scalene', definition: 'No sides equal, no angles equal' },
          { term: 'Right', definition: 'One angle is exactly 90 degrees' },
          { term: 'Obtuse', definition: 'One angle is greater than 90 degrees' }
        ]
      }
    ],
    fillBlanks: [
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'In a right triangle, the side opposite the right angle is called the {{0}}.', blanks: [ { accept: ['hypotenuse'], size: 16 } ], explanation: 'The longest side of a right triangle.' },
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'The Pythagorean theorem states: a squared plus b squared equals {{0}} squared.', blanks: [ { accept: ['c'], size: 16 } ], explanation: 'c is the hypotenuse.' },
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'Two triangles with the same shape but different sizes are called {{0}} triangles.', blanks: [ { accept: ['similar'], size: 16 } ], explanation: 'Same angles, proportional sides.' },
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'If a triangle has sides 3, 4, and 5, the right angle is opposite the side of length {{0}}.', blanks: [ { accept: ['5'], size: 16 } ], explanation: 'The hypotenuse is across from the right angle.' },
      { difficulty: 'easy', context: 'Sum of angles in a triangle:', expression: 'The sum of angles in a triangle is {{0}}$°$.', blanks: [ { accept: ['180'], size: 4 } ], explanation: 'A nondegenerate triangle in Euclidean geometry has interior-angle sum $180°$.' },
    { difficulty: 'medium', context: 'Isosceles triangle:', expression: 'An isosceles triangle has at least {{0}} equal sides.', blanks: [ { accept: ['2', 'two'], size: 4 } ], explanation: 'Isosceles: at least 2 equal sides; the opposite base angles are equal.' }
    ],
      freeResponse: [
        { difficulty: 'easy', question: 'A right triangle has legs $8$ and $15$. Find the hypotenuse:', accept: [17, '17'], placeholder: 'Length', explanation: '$8^2 + 15^2 = 64 + 225 = 289 = 17^2$. Pythagorean triple: $(8, 15, 17)$.' },
        { difficulty: 'easy', question: 'An equilateral triangle has all angles equal. Each angle measures:', accept: [60, '60', '60°'], placeholder: 'Degrees', explanation: '$180° / 3 = 60°$.' },
        { difficulty: 'medium', question: 'A right triangle has hypotenuse $13$ and one leg $5$. The other leg is:', accept: [12, '12'], placeholder: 'Length', hint: '<p>$a^2 + 5^2 = 13^2$.</p>', explanation: '$a^2 = 169 - 25 = 144$, $a = 12$. Triple: $(5, 12, 13)$.' },
        { difficulty: 'medium', question: 'Similar triangles have scale factor $3:5$. If the smaller perimeter is $24$ cm, the larger perimeter is:', accept: [40, '40'], placeholder: 'cm', explanation: 'Perimeter scales linearly: $24 \\times \\frac{5}{3} = 40$ cm.' },
        { difficulty: 'hard', question: 'A 45-45-90 triangle has hypotenuse $10$. Give each leg as an exact value or a decimal to 2 places:', accept: ['7.07', '5√2'], placeholder: 'Length', explanation: 'In a 45-45-90 triangle, leg $= \\frac{\\text{hypotenuse}}{\\sqrt{2}} = \\frac{10}{\\sqrt{2}} = 5\\sqrt{2} \\approx 7.07$.' },
    { difficulty: 'easy', question: 'If two angles of a triangle are $50°$ and $60°$, the third is:', accept: [70, '70'], placeholder: 'Degrees', explanation: '$180 - 50 - 60 = 70°$.' },
    { difficulty: 'medium', question: 'Hypotenuse of right triangle with legs 5 and 12:', accept: [13, '13'], placeholder: 'Number', explanation: '$\\sqrt{25 + 144} = \\sqrt{169} = 13$.' },
    { difficulty: 'hard', question: 'Area of triangle with base 10 and height 6:', accept: [30, '30'], placeholder: 'Area', explanation: '$A = \\frac{1}{2}bh = \\frac{1}{2}(10)(6) = 30$.' },
    { difficulty: 'medium', question: 'In a 30-60-90 triangle with hypotenuse 10, the short side is:', accept: [5, '5'], placeholder: 'Length', explanation: 'Short side = hypotenuse / 2 = 5.' },
    { difficulty: 'easy', question: 'All three sides of an equilateral triangle are:', accept: ['equal', 'congruent', 'the same'], placeholder: 'Property', explanation: 'Equilateral: all sides equal. All angles = $60°$.' },
    { difficulty: 'hard', question: 'In a right triangle with legs $a$ and $b$: $a^2 + b^2 =$?', accept: ['c^2', 'hypotenuse^2'], placeholder: 'Expression', explanation: 'Pythagorean theorem: $a^2 + b^2 = c^2$.' },
    { difficulty: 'medium', question: 'Similar triangles have proportional sides and:', accept: ['equal angles', 'congruent angles'], placeholder: 'Property', explanation: 'Similar: same shape, different size. Angles equal, sides proportional.' },
    { difficulty: 'hard', question: 'If two triangles are congruent by SSS, what theorem is used?', accept: ['SSS', 'side-side-side'], placeholder: 'Theorem', explanation: 'SSS: if all three sides are equal, the triangles are congruent.' },
    { difficulty: 'hard', question: 'Medians of a triangle intersect at the:', accept: ['centroid'], placeholder: 'Point', explanation: 'Centroid: intersection of medians. Divides each median 2:1.' },
    { difficulty: 'easy', question: 'What is the minimum number of equal sides in an isosceles triangle?', accept: [2, '2'], placeholder: 'Number', explanation: 'An isosceles triangle has at least two equal sides. An equilateral triangle is a special case.' },
    { difficulty: 'hard', question: 'For positive side lengths with $c$ the longest, the triangle inequality requires $a+b$ to be _____ than $c$.', accept: ['greater'], placeholder: 'Relation', explanation: 'All three inequalities are $a+b>c$, $a+c>b$, and $b+c>a$. With positive lengths and c the longest, checking $a+b>c$ is sufficient.' },
    { difficulty: 'medium', question: 'Scalene triangle has _____ equal sides.', accept: [0, '0', 'no', 'zero'], placeholder: 'Number', explanation: 'Scalene: all three sides are different lengths.' },
    { difficulty: 'hard', question: 'SAS congruence: if two sides and the _____ angle are equal, triangles are congruent.', accept: ['included'], placeholder: 'Which angle?', explanation: 'SAS: the included angle (between the two sides).' },
    { difficulty: 'easy', question: 'Median of a triangle connects a vertex to the _____ of the opposite side.', accept: ['midpoint'], placeholder: 'Point', explanation: 'Median: vertex to midpoint of opposite side.' },
    { difficulty: 'hard', question: 'Orthocenter: intersection of:', accept: ['altitudes'], placeholder: 'What?', explanation: 'Orthocenter: intersection of the three altitudes.' },
    { difficulty: 'easy', question: '45-45-90 triangle: legs are equal and hypotenuse is leg $\\times$?', accept: ['sqrt(2)', '\\sqrt{2}', '1.414'], placeholder: 'Factor', explanation: 'Hypotenuse = leg $\\times \\sqrt{2}$.' },
    { difficulty: 'hard', question: 'Altitude of equilateral triangle with side $s$: $h = \\frac{s\\sqrt{3}}{2}$. What denominator appears in the formula?', accept: [2, '2'], placeholder: 'Number', explanation: '$h = \\frac{s\\sqrt{3}}{2}$.' },
    { difficulty: 'easy', question: '30-60-90 triangle: side ratios are $1 : \\sqrt{3} : $ ?', accept: [2, '2'], placeholder: 'Number', explanation: 'Short : medium : hypotenuse = $1 : \\sqrt{3} : 2$.' },
    { difficulty: 'hard', question: 'In triangle ABC, D, E, and F lie inside sides BC, CA, and AB. If cevians AD, BE, and CF are concurrent, Ceva\'s theorem gives $\\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} =$?', accept: [1, '1'], placeholder: 'Value', explanation: 'Ceva: product of ratios along concurrent cevians = 1.' },
    { difficulty: 'easy', question: 'Equilateral triangle: all sides equal and all angles:', accept: [60, '60'], placeholder: 'Degrees', explanation: '$60°$ each ($180°/3$).' },
    { difficulty: 'hard', question: 'For distinct fixed points $A,B$ and a constant $k\\gt0$ with $k\\ne1$, the locus $PA/PB=k$ is a circle. Is this statement correct?', accept: ['yes', 'true', 'correct'], placeholder: 'Correct?', explanation: 'This is an Apollonius circle. The positive ratio excludes negative distances; $k=1$ gives the perpendicular bisector of AB instead. The point B is excluded because the denominator PB would be zero.' },
    { difficulty: 'medium', question: 'The internal angle bisector divides the opposite side in the ratio of the lengths of:', accept: ['adjacent sides', 'the two adjacent sides'], placeholder: 'Ratio', explanation: 'Angle bisector theorem: ratio = adjacent sides.' },
    { difficulty: 'hard', question: 'Nine-point circle passes through: midpoints, feet of altitudes, and midpoints of segments from vertices to:', accept: ['orthocenter', 'the orthocenter'], placeholder: 'Point', explanation: 'Nine-point circle: 9 special points including those three groups.' },
    { difficulty: 'medium', question: 'Similar triangles: proportional sides and equal _____.', accept: ['angles'], placeholder: 'What?', explanation: 'Similar: same shape, possibly different size. Equal angles.' },
    { difficulty: 'hard', question: 'In triangle ABC, D lies on BC, with $BD=m$, $DC=n$, $AB=c$, $AC=b$, $AD=d$, and $a=BC=m+n$. Stewart\'s theorem states $b^2m+c^2n=a(d^2+mn)$. Is this identity correct?', accept: ['yes', 'true', 'correct'], placeholder: 'Correct?', explanation: 'Stewart: relates cevian $d$ and the three sides.' }
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

      stuckGuide: { html: `<div class="callout callout-tip"><h4> Triangle Strategy</h4><ol><li><strong>Right triangle?</strong> Use Pythagorean theorem.</li><li><strong>Congruence?</strong> Check SSS, SAS, ASA, or AAS.</li><li><strong>Similarity?</strong> Check AA (two equal angles) or proportional sides.</li><li><strong>Area?</strong> $A = \\frac{1}{2}bh$ or Heron's formula.</li></ol></div>` }
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
        ${WHY('Why is $\\pi$ irrational?', '<p>$\\pi$ cannot be expressed as a fraction $p/q$. Its decimal expansion never terminates or repeats. It is also <strong>transcendental</strong>: it is not a root of any polynomial with integer coefficients. This is why squaring the circle with only compass and straightedge is impossible.</p>')}
      ` },
      hook: { html: `
        <div class="callout callout-puzzle"><h4> Puzzle: The Bicycle Odometer</h4>
        <p>A bicycle wheel has diameter 70 cm. If the wheel rolls without slipping, one full rotation moves the bike one circumference: $C = \\pi d = 70\\pi \\approx 219.9$ cm. An odometer estimates distance by multiplying rotations by the rolling circumference. Skidding or a different effective tire diameter breaks that model.</p></div>` },
      concept: { html: `

<div class="math-diagram">
<svg viewBox="0 0 540 290" width="540" height="290" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="geometry-circle-title geometry-circle-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="geometry-circle-title">Circle radius, diameter, arc, and sector</title>
  <desc id="geometry-circle-desc">A 60-degree sector has two radii ending on the same circle. The highlighted arc connects those endpoints. The diameter passes through the center. Arc length is r times theta and sector area is one half r squared times theta when theta is measured in radians.</desc>
  <path d="M 145 145 L 250 145 A 105 105 0 0 1 197.5 235.933 Z" fill="#8b5cf6" fill-opacity="0.15"/>
  <circle cx="145" cy="145" r="105" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <line x1="40" y1="145" x2="250" y2="145" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,5"/>
  <path d="M 145 145 H 250 M 145 145 L 197.5 235.933" fill="none" stroke="#10b981" stroke-width="2"/>
  <path d="M 250 145 A 105 105 0 0 1 197.5 235.933" fill="none" stroke="#8b5cf6" stroke-width="4"/>
  <path d="M 173 145 A 28 28 0 0 1 159 169.249" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="145" cy="145" r="3" fill="#f59e0b"/>
  <g font-family="Inter, sans-serif" font-size="15">
    <text x="110" y="130" fill="#f59e0b">center</text>
    <text x="200" y="135" fill="#10b981" text-anchor="middle">r</text>
    <text x="94" y="165" fill="#ef4444" text-anchor="middle">d = 2r</text>
    <text x="257" y="204" fill="#8b5cf6">arc</text>
    <text x="189" y="176" fill="#f59e0b">60°</text>
    <text x="188" y="200" fill="#8b5cf6">sector</text>
    <text x="310" y="70" fill="#e2e8f0">C = 2πr</text>
    <text x="310" y="100" fill="#e2e8f0">A = πr²</text>
    <text x="310" y="145" fill="#e2e8f0">arc length = rθ</text>
    <text x="310" y="175" fill="#e2e8f0">sector area = ½r²θ</text>
    <text x="310" y="205" fill="#94a3b8">θ must be in radians</text>
  </g>
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
        ${WHY('Why $s = r\\theta$?', '<p>A full circle has arc length $2\\pi r$ and angle $2\\pi$ radians. The fraction of the circle swept by angle $\\theta$ is $\\theta / (2\\pi)$. Arc length = fraction times circumference = $\\frac{\\theta}{2\\pi} \\cdot 2\\pi r = r\\theta$. This formula is <em>the reason</em> radians are used in mathematics: it makes the relationship between angle and arc length maximally simple.</p>')}</div>

        <div class="callout callout-key"><h4>Circle Equation (Coordinate Geometry)</h4>
        <p><strong>Standard form:</strong> $(x - h)^2 + (y - k)^2 = r^2$ with center $(h, k)$ and radius $r$.</p>
        <p><strong>General form:</strong> $x^2 + y^2 + Dx + Ey + F = 0$. Complete the square to convert to standard form.</p></div>

        <div class="callout callout-key"><h4>Inscribed Angle Theorem</h4>
        <p>An <strong>inscribed angle</strong> has its vertex on the circle and sides along two chords. Its measure is half the measure of its intercepted arc, which is the arc between the chord endpoints that does not contain the vertex.</p>
        <p>If that arc has central-angle measure $\\theta$, the inscribed angle measures $\\theta/2$. Use the reflex central angle when the intercepted arc is the major arc. An inscribed angle subtending a diameter is $90°$ because its intercepted semicircle measures $180°$.</p>
        ${WHY('Why half?', '<p>Join the center to the three points defining the inscribed angle. The pairs of radii form isosceles triangles. First place the center on one side of the angle: the exterior-angle theorem makes the intercepted central angle twice the angle at the circle. Split a general inscribed angle into two such cases, then add or subtract their measures according to the center\'s position. The same factor of two remains.</p>')}</div>

        <div class="callout callout-tip"><h4>Choose the correct region and unit</h4>
        <p>A sector includes the center and is bounded by two radii. A circular segment is bounded by a chord and an arc. For a minor central angle between $0°$ and $180°$, the segment area equals the sector area minus the triangle formed by the two radii and the chord.</p>
        <p>For angles in degrees, use the fraction of a full turn directly: $s=\\frac{\\theta}{360°}(2\\pi r)$ and $A=\\frac{\\theta}{360°}(\\pi r^2)$. For radians, use $s=r\\theta$ and $A=\\frac12 r^2\\theta$. Mixing the degree number with the radian formulas multiplies the result by $180/\\pi$.</p>
        <p>A tangent line touches a circle at one point and is perpendicular to the radius there. A chord joins two points on the circle; the diameter is the longest chord. These statements distinguish a straight crossing distance from a distance measured along the circumference.</p></div>
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
      },
      {
        title: 'Arc, Chord, Sector, and Segment',
        problem: 'A circle has radius 12 cm. Two radii enclose a 60-degree minor sector. Find the curved arc length, the straight chord length, and the area between that chord and arc.',
        steps: [
          { title: 'Find the curved length', content: '$s=\\frac{60}{360}(2\\pi\\cdot12)=4\\pi\\approx12.57$ cm.', why: 'The arc spans one sixth of the full circumference.' },
          { title: 'Find the straight length', content: 'The two radii and chord form an equilateral triangle: the radii are equal and the included angle is $60°$. The chord is therefore 12 cm.', why: 'The other two triangle angles are equal and sum to 120 degrees, so each is 60 degrees. A chord measures a different path from an arc.' },
          { title: 'Find the sector and triangle areas', content: 'Sector area: $\\frac{60}{360}\\pi(12)^2=24\\pi$ cm². The triangle has height $\\sqrt{12^2-6^2}=6\\sqrt3$ cm, so its area is $\\frac12(12)(6\\sqrt3)=36\\sqrt3$ cm².', why: 'The altitude bisects an equilateral triangle into two right triangles. Its perpendicular height supplies the triangle area.' },
          { title: 'Subtract to obtain the segment', content: '$A_{\\text{segment}}=24\\pi-36\\sqrt3\\approx13.04$ cm².', why: 'The minor segment is the sector with the central triangle removed. Use a sector for a rotating sweep; use a segment for a region bounded by a straight cut and curved edge.' }
        ]
      },
      {
        title: 'A Walkway Around a Circular Garden',
        problem: 'A circular garden has radius 4 m. A 1 m-wide walkway surrounds it. Find the paving area and the total length of edging along both boundaries.',
        steps: [
          { title: 'Identify both radii', content: 'The outer radius is $4+1=5$ m; the inner radius remains 4 m.', why: 'Walkway width adds to the radius, rather than to the area or circumference.' },
          { title: 'Subtract the disks', content: '$A=\\pi(5^2)-\\pi(4^2)=9\\pi\\approx28.27$ m².', why: 'The garden is a hole in the larger disk. The walkway is an annulus.' },
          { title: 'Add the two boundaries', content: 'Edging length $=2\\pi(5)+2\\pi(4)=18\\pi\\approx56.55$ m.', why: 'Boundary lengths add even though the enclosed areas subtract. Material sold by area and material sold by length require different calculations.' }
        ]
      }],
      flashCards: [
      { type: 'define', front: 'What is pi?', back: 'Circumference/diameter for ANY circle. Always 3.14159... Irrational and universal to all circles.' },
      { type: 'why', front: 'Why is circle area pi*r^2?', back: 'Slice into thin wedges, rearrange into parallelogram. Base = pi*r, height = r. Area = pi*r*r.' },
      { type: 'how', front: 'How to find arc length?', back: '(angle/360)*2*pi*r for degrees. Or angle*r for radians. Fraction of the full circumference.' }
    ],
    exercises: [
        { difficulty: 'easy', question: 'The area of a circle with radius $7$ is:', options: ['$14\\pi$', '$49\\pi$', '$7\\pi$', '$49$'], correctIndex: 1, hint: '<p>$A = \\pi r^2$.</p>', correctExplanation: '$A = \\pi(7)^2 = 49\\pi \\approx 153.94$ square units.', wrongExplanations: { 0: '$14\\pi = 2\\pi(7)$ is the circumference, not the area.', 2: '$7\\pi$ uses $r$, not $r^2$.', 3: '$49$ is $r^2$ but missing the $\\pi$ factor.' } },
        { difficulty: 'medium', question: 'A sector has radius $6$ and arc length $4\\pi$. The central angle in radians is:', options: ['$\\frac{2\\pi}{3}$', '$\\frac{\\pi}{3}$', '$\\frac{3\\pi}{2}$', '$24\\pi$'], correctIndex: 0, hint: '<p>$s = r\\theta \\Rightarrow \\theta = s/r$.</p>', correctExplanation: '$\\theta = \\frac{4\\pi}{6} = \\frac{2\\pi}{3}$ radians ($120°$).', wrongExplanations: { 1: '$\\pi/3 = 60°$, but $6 \\times \\pi/3 = 2\\pi \\neq 4\\pi$.', 2: '$3\\pi/2$ would give arc length $6(3\\pi/2)=9\\pi$, not $4\\pi$.', 3: '$r \\times s = 24\\pi$ is the product, not the angle. Use division.' } }
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
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'The circumference of a circle with radius r is {{0}}.', blanks: [ { accept: ['2*pi*r'], size: 16 } ], explanation: 'C = 2 times pi times radius.' },
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'The area of a circle with radius r is {{0}}.', blanks: [ { accept: ['pi*r^2'], size: 16 } ], explanation: 'A = pi times radius squared.' },
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'The ratio of circumference to diameter is the constant {{0}}.', blanks: [ { accept: ['pi', 'π'], size: 16 } ], explanation: 'Approximately 3.14159...' },
      { difficulty: 'easy', context: 'Area of rectangle:', expression: '$A =$ {{0}} $\\times w$', blanks: [ { accept: ['l', 'L', 'length'], size: 6 } ], explanation: 'Area = length times width.' },
    { difficulty: 'medium', context: 'Pythagorean theorem:', expression: '$a^2 + b^2 =$ {{0}} $^2$', blanks: [ { accept: ['c', 'C'], size: 3 } ], explanation: '$a^2 + b^2 = c^2$.' }
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
    { difficulty: 'hard', question: 'For a convex polyhedron, Euler\'s formula gives $V-E+F=$?', accept: [2, '2'], placeholder: 'Number', explanation: '$V-E+F=2$ for a convex polyhedron, where V counts vertices, E edges, and F faces. The same value applies to polyhedral surfaces topologically equivalent to a sphere; a surface with a handle has a different Euler characteristic.' },
    { difficulty: 'easy', question: 'A chord of a circle is a line segment with both endpoints on the:', accept: ['circle', 'circumference'], placeholder: 'Where?', explanation: 'Chord: endpoints on the circle.' },
    { difficulty: 'hard', question: 'An inscribed angle equals half the _____ angle subtending its intercepted arc.', accept: ['central'], placeholder: 'Type', explanation: 'The intercepted arc excludes the inscribed vertex. Its central-angle measure can be reflex when that intercepted arc is a major arc. The inscribed angle is half that measure.' },
    { difficulty: 'easy', question: 'Perimeter of circle is called:', accept: ['circumference'], placeholder: 'Name', explanation: 'Circumference = $2\\pi r$.' },
    { difficulty: 'hard', question: 'Cavalieri\'s principle: two solids between the same pair of parallel planes, with equal areas in every parallel cross-section, have equal:', accept: ['volume'], placeholder: 'What?', explanation: 'Each solid has the same height interval and the same cross-sectional area at each corresponding level. Summing those equal thin layers gives equal volume, even when the cross-sections have different shapes.' },
    { difficulty: 'easy', question: 'Tangent to a circle is perpendicular to the _____ at the point of tangency.', accept: ['radius'], placeholder: 'What?', explanation: 'Tangent line is perpendicular to the radius.' },
    { difficulty: 'hard', question: 'A point P lies outside a circle. Rays PAB and PCD meet the circle twice, with A and C nearer to P. In $PA\\cdot PB=PC\\cdot PD$, these crossing lines are called:', accept: ['secants', 'secant lines'], placeholder: 'Line type', explanation: 'Each secant line crosses the circle twice. Multiply the distance from P to the nearer crossing by the distance from P to the farther crossing. AB and CD are the chords between the crossings, while PB and PD are the whole distances measured from P.' },
    { difficulty: 'easy', question: 'Diameter of a circle with radius 5:', accept: [10, '10'], placeholder: 'Number', explanation: '$d = 2r = 10$.' },
    { difficulty: 'hard', question: 'Ptolemy\'s theorem: in a convex cyclic quadrilateral with vertices in order $A,B,C,D$, $AC \\cdot BD = AB \\cdot CD + AD \\cdot$ ?', accept: ['BC'], placeholder: 'Side', explanation: 'Ptolemy: product of diagonals = sum of products of opposite sides.' },
    { difficulty: 'medium', question: 'Arc length = radius times _____ (in radians).', accept: ['angle', 'theta', 'central angle'], placeholder: 'What?', explanation: '$s = r\\theta$.' },
    { difficulty: 'hard', question: 'Gauss-Bonnet theorem: the integral of Gaussian curvature over a smooth compact surface without boundary equals $2\\pi$ times its:', accept: ['Euler characteristic', 'chi'], placeholder: 'Topological quantity', explanation: '$\\int_M K\\,dA=2\\pi\\chi(M)$. Gaussian curvature is the product of the two principal curvatures. The no-boundary assumption matters: a surface with a boundary requires additional boundary terms.' },
    { difficulty: 'medium', question: 'Volume of sphere: $V = \\frac{4}{3}\\pi r^3$. For $r = 3$:', accept: ['36pi', '113.1'], placeholder: 'Volume', explanation: '$\\frac{4}{3}\\pi(27) = 36\\pi$.' },
    { difficulty: 'hard', question: 'Between two distinct non-antipodal points on a sphere, the shortest surface path follows the minor arc of a:', accept: ['geodesic', 'great circle'], placeholder: 'Curve', explanation: 'The minor great-circle arc gives the shortest route constrained to the spherical surface. A straight chord is shorter but leaves the surface. Antipodal points have multiple equally short semicircular routes.' }
      ],
      stepBuilder: [
        { difficulty: 'medium', question: 'Find the area of a ring (annulus) with outer radius $8$ and inner radius $5$.', steps: [
          { content: 'Outer circle area: $\\pi(8)^2 = 64\\pi$.' },
          { content: 'Inner circle area: $\\pi(5)^2 = 25\\pi$.' },
          { content: 'Ring area = outer $-$ inner: $64\\pi - 25\\pi = 39\\pi \\approx 122.52$ sq units.' }
        ], explanation: 'Annulus area = $\\pi(R^2 - r^2)$. Subtract the hole from the full disk.' },
        { difficulty: 'medium', question: 'Find the area of a trapezoid with bases 6 and 10, height 4.', steps: [
          { content: 'Formula: $A = \\frac{1}{2}(b_1 + b_2)h$.' },
          { content: '$A = \\frac{1}{2}(6 + 10)(4) = \\frac{1}{2}(16)(4) = 32$.' }
        ], explanation: 'Trapezoid area: average of bases times height.' }
      ],

      stuckGuide: { html: `<div class="callout callout-tip"><h4> Circle Strategy</h4><ol><li>Identify what you know: radius, diameter, angle, arc, area?</li><li>Convert angles to radians if using $s = r\\theta$ or $A = \\frac{1}{2}r^2\\theta$.</li><li>Use the appropriate formula and solve for the unknown.</li></ol></div>` }
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
        <p><strong>Why do area formulas look the way they do?</strong> Area measures a region in unit squares, including fractional squares at its boundary. A rectangle has area $wh$. Two congruent copies of any triangle form a parallelogram with the same base and perpendicular height, so the triangle has area $\\frac12 bh$. Rearranging increasingly thin circle sectors gives the limiting area $\\pi r^2$.</p>
        <p><strong>Why do cones and pyramids have volume $\\frac13 Bh$?</strong> Join the center of a cube of side $s$ to its six faces. This forms six congruent pyramids, each with base area $s^2$, height $s/2$, and volume $s^3/6=\\frac13(s^2)(s/2)$. This example explains the factor in one case. In a general pyramid or cone, a cross-section at height $z$ above the base scales in length by $1-z/h$, so its area is $B(1-z/h)^2$. Adding these layers gives $\\int_0^h B(1-z/h)^2\\,dz=Bh/3$. The integral formalizes the limiting sum of thin layers.</p>
        <p><strong>Practical application:</strong> Architects compute room volumes for HVAC, painters compute wall areas, manufacturers compute material needs for packaging, and civil engineers calculate excavation volumes.</p>
      ` },
      hook: { html: `
        <div class="callout callout-puzzle"><h4> Puzzle: Paint for a Room</h4>
        <p>A room is $5$ m by $4$ m by $3$ m tall. You need to paint all four walls, not the floor or ceiling. Total wall area = $2(5 \\times 3) + 2(4 \\times 3) = 30 + 24 = 54$ m². If one liter covers $10$ m², you need $5.4$ liters. Geometry solves real problems.</p></div>` },
      concept: { html: `
        <div class="math-diagram">
        <svg viewBox="0 0 600 235" width="600" height="235" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="geometry-height-title geometry-height-desc" xmlns="http://www.w3.org/2000/svg">
          <title id="geometry-height-title">Perpendicular height and slant length</title>
          <desc id="geometry-height-desc">A parallelogram has base 7 and perpendicular height 4; its sloping side is not its height. An axial section of a right circular cone shows radius 4 and perpendicular height 6. Its slant height is the hypotenuse of a right triangle with legs 4 and 6.</desc>
          <polygon points="65,165 240,165 290,65 115,65" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-width="2"/>
          <path d="M 115 65 V 165 M 115 153 H 127 V 165" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3"/>
          <path d="M 345 175 L 425 55 L 505 175 Z" fill="#8b5cf6" fill-opacity="0.12" stroke="#8b5cf6" stroke-width="2"/>
          <path d="M 425 55 V 175 H 505 M 425 163 H 437 V 175" fill="none" stroke="#10b981" stroke-width="2"/>
          <g font-family="Inter, sans-serif" font-size="15" text-anchor="middle">
            <text x="177" y="35" fill="#e2e8f0">Parallelogram</text>
            <text x="152" y="190" fill="#3b82f6">base = 7</text>
            <text x="157" y="120" fill="#10b981">height = 4</text>
            <text x="425" y="35" fill="#e2e8f0">Right cone: axial section</text>
            <text x="389" y="120" fill="#10b981">h = 6</text>
            <text x="465" y="196" fill="#10b981">r = 4</text>
            <text x="502" y="105" fill="#8b5cf6">slant ℓ</text>
          </g>
        </svg>
        </div>
        <p class="math-diagram-label">Height meets the base at a right angle. A sloping side and a cone's slant height measure different lengths.</p>

        <div class="callout callout-key"><h4>2D Area Formulas</h4>
        <ul>
          <li><strong>Rectangle:</strong> $A = lw$</li>
          <li><strong>Triangle:</strong> $A = \\frac{1}{2}bh$, where $h$ is perpendicular to the selected base (two congruent copies form a parallelogram)</li>
          <li><strong>Parallelogram:</strong> $A = bh$ (WHY: shear a rectangle; area preserved)</li>
          <li><strong>Trapezoid:</strong> $A = \\frac{1}{2}(b_1 + b_2)h$ (average of parallel sides times height)</li>
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
          <li><strong>Closed right circular cylinder:</strong> $SA = 2\\pi r^2 + 2\\pi rh$ (two disks plus the unrolled lateral rectangle)</li>
          <li><strong>Sphere:</strong> $SA = 4\\pi r^2$ (Archimedes proved this equals the lateral surface of the enclosing cylinder)</li>
          <li><strong>Closed right circular cone:</strong> $SA = \\pi r^2 + \\pi r\\ell$, where $\\ell = \\sqrt{r^2 + h^2}$ is the slant height</li>
        </ul></div>

        <div class="callout callout-tip"><h4>Model the material or space you actually need</h4>
        <p>Area measures a region; perimeter measures its boundary. A fence needs length, a floor covering needs area, and a filled tank needs volume. Convert all lengths to a common unit before multiplying. Since $1$ m is $100$ cm, $1$ m² is $10{,}000$ cm² and $1$ m³ is $1{,}000{,}000$ cm³.</p>
        <p>Surface-area formulas count specific faces. An open-top cylinder has one base, so its area is $\\pi r^2+2\\pi rh$. A cone without its base has lateral area $\\pi r\\ell$. Volume uses perpendicular height $h$, while cone surface area uses slant height $\\ell$. The right circular cone formulas above assume its apex lies directly above the center of the base.</p>
        <p>Decompose a composite region into nonoverlapping pieces, then add their areas. Subtract holes only when they lie within the larger region. If similar solids scale by a factor $k$, every length multiplies by $k$, each surface area by $k^2$, and volume by $k^3$. A larger container therefore does not need material in the same ratio as its capacity.</p></div>
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
      },
      {
        title: 'An Open Cylindrical Container',
        problem: 'An ideal thin-walled, open-top cylinder has radius 4 cm and height 10 cm. Find the material area and capacity, ignoring seams and material thickness.',
        steps: [
          { title: 'List the included surfaces', content: 'The container has one circular base and one curved side. It has no top disk.', why: 'A closed-cylinder formula would count an extra face.' },
          { title: 'Unroll the side', content: 'The side becomes a rectangle of width $2\\pi r=8\\pi$ cm and height 10 cm. Material area $=\\pi(4^2)+(8\\pi)(10)=96\\pi\\approx301.59$ cm².', why: 'The circumference gives the width of the unrolled sheet. The base adds 16 pi square centimeters.' },
          { title: 'Compute capacity separately', content: '$V=\\pi(4^2)(10)=160\\pi\\approx502.65$ cm³, about 502.65 mL.', why: 'The volume formula measures enclosed space. One cubic centimeter equals one milliliter. A real container needs allowances for wall thickness and manufacturing waste.' }
        ]
      },
      {
        title: 'Scaling a Package: Material Versus Capacity',
        problem: 'A closed cube-shaped package has side 10 cm. A larger version has side 15 cm. Compare surface area and volume.',
        steps: [
          { title: 'Find the length scale', content: '$k=15/10=1.5$.', why: 'Every corresponding length has the same scale because both packages are cubes.' },
          { title: 'Scale the surface area', content: 'Original area $=6(10^2)=600$ cm². Larger area $=600(1.5)^2=1350$ cm².', why: 'Each face has two scaled dimensions, so its area multiplies by the square of the length factor.' },
          { title: 'Scale the volume', content: 'Original volume $=10^3=1000$ cm³. Larger volume $=1000(1.5)^3=3375$ cm³.', why: 'Volume has three scaled dimensions. Capacity grows by a factor of 3.375 while area grows by a factor of 2.25.' },
          { title: 'Interpret the result', content: 'At equal sheet thickness, the larger package uses more material overall, but less material per unit of capacity: $600/1000=0.6$ compared with $1350/3375=0.4$ cm² per cm³.', why: 'For similar solids, surface area divided by volume scales by $1/k$. This comparison assumes the same material thickness and excludes seams.' }
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
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'The volume of a rectangular box with length l, width w, height h is {{0}}.', blanks: [ { accept: ['l*w*h', 'lwh'], size: 16 } ], explanation: 'Multiply all three dimensions.' },
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'The volume of a cylinder with radius r and height h is {{0}}.', blanks: [ { accept: ['pi*r^2*h'], size: 16 } ], explanation: 'Area of circular base times height.' },
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'The volume of a sphere with radius r is {{0}}.', blanks: [ { accept: ['(4/3)*pi*r^3'], size: 16 } ], explanation: 'Four-thirds pi r-cubed.' },
      { difficulty: 'easy', context: 'Area of a circle:', expression: '$A = \\pi$ {{0}} $^2$', blanks: [ { accept: ['r', 'R'], size: 3 } ], explanation: '$A = \\pi r^2$.' },
    { difficulty: 'medium', context: 'Circumference:', expression: '$C = 2\\pi$ {{0}}', blanks: [ { accept: ['r', 'R'], size: 3 } ], explanation: '$C = 2\\pi r$.' }
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
        { difficulty: 'hard', question: 'A rectangular tank is $8$ m by $5$ m by $3$ m. Water fills it to $2$ m deep. Find: (a) volume of water, (b) empty volume, (c) how much more water is needed to fill it.', steps: [
          { content: 'Total volume: $8 \\times 5 \\times 3 = 120$ m³.' },
          { content: 'Water volume: $8 \\times 5 \\times 2 = 80$ m³.' },
          { content: 'Empty volume: $120 - 80 = 40$ m³.' },
          { content: 'Need $40$ m³ (= $40{,}000$ liters) more water to fill the tank.' }
        ], explanation: 'Volume of a partial fill uses the same base area with reduced height.' },
        { difficulty: 'hard', question: 'Find the area of an annulus (ring) with outer radius 5 and inner radius 3.', steps: [
          { content: 'Outer area: $\\pi(5^2) = 25\\pi$.' },
          { content: 'Inner area: $\\pi(3^2) = 9\\pi$.' },
          { content: 'Annulus area: $25\\pi - 9\\pi = 16\\pi$.' }
        ], explanation: 'Annulus: $A = \\pi(R^2 - r^2)$.' }
      ],
      multiPart: [
        { difficulty: 'medium', question: 'A cylindrical can has diameter $10$ cm and height $15$ cm.', parts: [
          { question: 'Radius:', accept: [5, '5'], placeholder: 'cm', explanation: '$r = d/2 = 5$ cm.' },
          { question: 'Volume (use π):', accept: ['375π', '375pi'], placeholder: 'cm³', explanation: '$V = \\pi(25)(15) = 375\\pi$.' },
          { question: 'Total surface area (use π):', accept: ['200π', '200pi'], placeholder: 'cm²', explanation: '$SA = 2\\pi(25) + 2\\pi(5)(15) = 50\\pi + 150\\pi = 200\\pi$.' }
        ], completionMessage: 'Cylinder: $V = \\pi r^2 h$, $SA = 2\\pi r^2 + 2\\pi rh$.' }
      ],

      stuckGuide: { html: `<div class="callout callout-tip"><h4> Area/Volume Strategy</h4><ol><li>Identify the shape (2D or 3D).</li><li>Select the correct formula.</li><li>Identify the measurements: radius? base? height? slant height?</li><li>Substitute and compute. Include units (cm², cm³).</li></ol></div>` }
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
        <p><strong>Why coordinate geometry?</strong> Coordinate geometry places a grid on the plane. This merges algebra and geometry: a geometric shape becomes an equation, and an equation becomes a shape. A circle is $x^2 + y^2 = r^2$. A line is $y = mx + b$.</p>
        <p><strong>Why the distance formula?</strong> The distance between $(x_1, y_1)$ and $(x_2, y_2)$ is $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$. This IS the Pythagorean theorem: the horizontal distance $|x_2 - x_1|$ and vertical distance $|y_2 - y_1|$ are the legs of a right triangle, and $d$ is the hypotenuse.</p>
        <p><strong>Practical application:</strong> GPS uses coordinates. Computer screens are coordinate grids. Every graph, chart, and data visualization depends on the same idea: locate points with ordered numerical positions.</p>
      ` },
      hook: { html: `
        <div class="callout callout-puzzle"><h4> Puzzle: The Shortest Path</h4>
        <p>Two cities are at coordinates $(2, 3)$ and $(10, 9)$. The straight-line distance (\"as the crow flies\") is $\\sqrt{(10-2)^2 + (9-3)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$ units. The Pythagorean theorem gives exact distances on any grid.</p></div>` },
      concept: { html: `
        <div class="math-diagram">
        <svg viewBox="0 0 340 280" width="340" height="280" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="geometry-coordinate-title geometry-coordinate-desc" xmlns="http://www.w3.org/2000/svg">
          <title id="geometry-coordinate-title">Distance and midpoint on a coordinate plane</title>
          <desc id="geometry-coordinate-desc">Equal coordinate scales locate A at minus 2, 5 and B at 4, minus 3. The horizontal change is 6 and the vertical change is minus 8. The diagonal length is 10. Their midpoint is 1, 1.</desc>
          <g fill="none" stroke="#475569" stroke-width="1">
            <path d="M 67 18 V 250 M 111 18 V 250 M 199 18 V 250 M 243 18 V 250 M 287 18 V 250"/>
            <path d="M 45 40 H 300 M 45 84 H 300 M 45 128 H 300 M 45 172 H 300 M 45 216 H 300"/>
          </g>
          <path d="M 45 150 H 310 M 155 255 V 18" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
          <path d="M 111 40 H 243 V 216 M 233 40 V 50 H 243" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3"/>
          <path d="M 111 40 L 243 216" stroke="#3b82f6" stroke-width="3"/>
          <g fill="#3b82f6"><circle cx="111" cy="40" r="4"/><circle cx="243" cy="216" r="4"/></g>
          <circle cx="177" cy="128" r="4" fill="#f59e0b"/>
          <g font-family="Inter, sans-serif" font-size="14">
            <text x="63" y="29" fill="#3b82f6">A(−2, 5)</text>
            <text x="230" y="242" fill="#3b82f6">B(4, −3)</text>
            <text x="161" y="31" fill="#10b981">Δx = 6</text>
            <text x="252" y="119" fill="#10b981">|Δy| = 8</text>
            <text x="127" y="178" fill="#3b82f6">d = 10</text>
            <text x="186" y="143" fill="#f59e0b">M(1, 1)</text>
            <text x="313" y="154" fill="#94a3b8">x</text>
            <text x="165" y="18" fill="#94a3b8">y</text>
            <text x="141" y="165" fill="#94a3b8">0</text>
            <text x="103" y="165" fill="#94a3b8">−2</text>
            <text x="239" y="165" fill="#94a3b8">4</text>
            <text x="137" y="44" fill="#94a3b8">5</text>
            <text x="130" y="220" fill="#94a3b8">−3</text>
          </g>
        </svg>
        </div>
        <p class="math-diagram-label">A 6-by-8 right triangle gives distance 10. Equal axis scales preserve its geometric proportions.</p>

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
        ${WHY('When to use which form?', '<p>Use slope-intercept form when the slope and y-intercept are known. Use point-slope form when a point and a finite slope are known. Standard form includes vertical lines: $x=3$ is a line, but cannot be written as $y=mx+b$ with a finite slope. In $Ax+By=C$, at least one of $A$ and $B$ must be nonzero.</p>')}</div>

        <div class="callout callout-tip"><h4>What coordinates assume</h4>
        <p>The Euclidean distance formula assumes perpendicular axes whose coordinate units represent the same physical length. If a map uses $2$ km per x-unit and $5$ km per y-unit, first convert the two coordinate differences to kilometers. A graph of time against temperature has a useful slope, but a diagonal length on that graph is not a physical distance.</p>
        <p>The midpoint averages positions. It does not average travel time unless the motion model makes that valid. With a constant-speed straight trip, the halfway point in time is the geometric midpoint; changing speed can move that halfway-in-time position.</p>
        <p>Two nonvertical lines with equal slopes are either distinct parallel lines or the same line. Compare intercepts to distinguish the cases. For a vertical line use $x=a$; its perpendicular line is horizontal, $y=b$. Coordinate geometry describes straight distances on a flat plane, so geographic distances over a sphere require a different model.</p></div>
      ` },
      definition: { html: `<p><strong>Slope:</strong> $m = \\frac{\\Delta y}{\\Delta x}$, the rate of change of $y$ with respect to $x$.</p><p><strong>Distance Formula:</strong> Pythagorean theorem on a coordinate plane.</p>` },
      examples: [{
        title: 'Finding the Equation of a Line',
        problem: 'Find the equation of the line through $(1, 3)$ and $(4, 9)$.',
        steps: [
          { title: 'Find slope', content: '$m = \\frac{9 - 3}{4 - 1} = \\frac{6}{3} = 2$', why: 'Slope = rise/run = $\\Delta y / \\Delta x$.' },
          { title: 'Use point-slope form', content: '$y - 3 = 2(x - 1)$', why: 'Point-slope: $y - y_1 = m(x - x_1)$ with $(1, 3)$.' },
          { title: 'Simplify', content: '$y = 2x + 1$', why: 'Distribute and add 3: $y - 3 = 2x - 2 \\Rightarrow y = 2x + 1$.' },
          { title: 'Verify', content: 'Check $(4, 9)$: $2(4) + 1 = 9$ ', why: 'Substitute the other point to confirm.' }
        ]
      },
      {
        title: 'Distance and Midpoint',
        problem: 'Find the distance and midpoint between $A(−2, 5)$ and $B(4, −3)$.',
        steps: [
          { title: 'Distance', content: '$d = \\sqrt{(4-(-2))^2 + (-3-5)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$', why: 'Distance formula = Pythagorean theorem: legs $6$ and $8$, hypotenuse $10$. This is a $3$-$4$-$5$ triple scaled by $2$.' },
          { title: 'Midpoint', content: '$M = \\left(\\frac{-2+4}{2},\\ \\frac{5+(-3)}{2}\\right) = (1, 1)$', why: 'Average each coordinate: $(-2+4)/2 = 1$, $(5-3)/2 = 1$.' }
        ]
      },
      {
        title: 'Locations Equally Far from Two Sensors',
        problem: 'Sensors lie at $A(2,1)$ and $B(8,5)$ on a flat grid with equal physical units. Find the line of locations equally far from both sensors, then check $P(3,6)$.',
        steps: [
          { title: 'Find the midpoint', content: '$M=((2+8)/2,(1+5)/2)=(5,3)$.', why: 'The midpoint lies halfway between the two sensors.' },
          { title: 'Find the perpendicular direction', content: 'The sensor segment has slope $(5-1)/(8-2)=2/3$. Its perpendicular slope is $-3/2$.', why: 'The perpendicular bisector of a segment is the set of points equidistant from its endpoints.' },
          { title: 'Write the locus', content: '$y-3=-\\frac32(x-5)$.', why: 'The required line is perpendicular to AB and passes through its midpoint.' },
          { title: 'Check the proposed location', content: 'For $P(3,6)$, $6-3=-\\frac32(3-5)=3$. Also $PA^2=(3-2)^2+(6-1)^2=26$ and $PB^2=(3-8)^2+(6-5)^2=26$.', why: 'Equal squared distances imply equal nonnegative distances. This method transfers to equal-distance service boundaries under a straight-line distance model.' }
        ]
      },
      {
        title: 'A Map with Different Coordinate Scales',
        problem: 'A map uses 2 km per x-unit and 0.5 km per y-unit. Locations are $A(1,2)$ and $B(4,6)$. Find the physical straight-line distance.',
        steps: [
          { title: 'Compute coordinate changes', content: '$\\Delta x=4-1=3$ map units and $\\Delta y=6-2=4$ map units.', why: 'The numbers measure coordinate changes, and each axis has its own physical scale.' },
          { title: 'Convert the components', content: 'Horizontal distance $=3(2)=6$ km. Vertical distance $=4(0.5)=2$ km.', why: 'Both perpendicular components must be measured in the same physical unit before applying the distance formula.' },
          { title: 'Apply Pythagoras', content: '$d=\\sqrt{6^2+2^2}=\\sqrt{40}=2\\sqrt{10}\\approx6.32$ km.', why: 'Using the raw 3 and 4 would give 5 map units, which does not represent the physical distance on this unequal-scale map.' }
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
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'The slope of a horizontal line is {{0}}.', blanks: [ { accept: ['0'], size: 16 } ], explanation: 'No rise, any run. Rise/run = 0.' },
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'The slope of a vertical line is {{0}}.', blanks: [ { accept: ['undefined'], size: 16 } ], explanation: 'Zero run between distinct points. Division by zero is undefined.' },
      { difficulty: 'easy', context: 'Recall the relationship:', expression: 'Two perpendicular lines with finite slopes have slopes that are {{0}} reciprocals of each other.', blanks: [ { accept: ['negative'], size: 16 } ], explanation: 'm1 * m2 = -1 for perpendicular lines.' },
      { difficulty: 'easy', context: 'Slope formula:', expression: '$m = \\frac{y_2 - y_1}{ {{0}} - x_1}$', blanks: [ { accept: ['x_2', 'x2'], size: 4 } ], explanation: 'Slope = rise / run.' },
    { difficulty: 'medium', context: 'Parallel lines:', expression: 'Nonvertical parallel lines have {{0}} slopes.', blanks: [ { accept: ['equal', 'the same'], size: 8 } ], explanation: 'Distinct nonvertical lines with the same slope are parallel. Equal intercepts would instead make them the same line.' }
    ],
    flashCards: [
      { type: 'why', front: 'Why use coordinates for geometry?', back: 'Descartes merged algebra and geometry. Coordinates turn shapes into equations. You can prove geometric theorems using algebra, and visualize algebraic equations as shapes.' },
      { type: 'how', front: 'How does the distance formula work?', back: 'It IS the Pythagorean theorem. Distance between (x1,y1) and (x2,y2): d = sqrt((x2-x1)^2 + (y2-y1)^2). The horizontal and vertical differences are the legs.' },
      { type: 'define', front: 'What is the midpoint formula?', back: 'Average the coordinates: M = ((x1+x2)/2, (y1+y2)/2). The midpoint is equidistant from both endpoints.' }
    ],
    exercises: [
        { difficulty: 'easy', question: 'The distance between $(0,0)$ and $(3,4)$ is:', options: ['$5$', '$7$', '$\\sqrt{7}$', '$25$'], correctIndex: 0, hint: '<p>$d = \\sqrt{3^2 + 4^2}$.</p>', correctExplanation: '$\\sqrt{9 + 16} = \\sqrt{25} = 5$. The classic $3$-$4$-$5$ Pythagorean triple.', wrongExplanations: { 1: '$3 + 4 = 7$. Distance uses squares, not plain addition.', 2: '$\\sqrt{7}$ would come from $\\sqrt{3+4}$, but the formula squares first.', 3: '$25 = 5^2$. You forgot to take the square root.' } },
        { difficulty: 'easy', question: 'The midpoint of $(2, 8)$ and $(6, 4)$ is:', options: ['$(4, 6)$', '$(8, 12)$', '$(4, 12)$', '$(2, 2)$'], correctIndex: 0, hint: '<p>Average each coordinate.</p>', correctExplanation: '$((2+6)/2, (8+4)/2) = (4, 6)$.', wrongExplanations: { 1: '$(2+6, 8+4) = (8, 12)$. You added instead of averaging.', 2: 'Mixed addition and averaging.', 3: '$(6-2)/2 = 2$ is the half-difference, not the midpoint x-coordinate.' } },
        { difficulty: 'medium', question: 'The slope of a line perpendicular to $y = \\frac{3}{4}x + 1$ is:', options: ['$\\frac{3}{4}$', '$-\\frac{3}{4}$', '$-\\frac{4}{3}$', '$\\frac{4}{3}$'], correctIndex: 2, hint: '<p>Perpendicular slopes: $m_1 \\cdot m_2 = -1$.</p>', correctExplanation: 'Original slope = $3/4$. Perpendicular: $-1/(3/4) = -4/3$. Product: $(3/4)(-4/3) = -1$ .', wrongExplanations: { 0: 'Same slope means parallel, not perpendicular.', 1: 'Negating the slope gives $-3/4$, but perpendicular requires the negative RECIPROCAL.', 3: '$4/3$ is the reciprocal but positive. Must also negate.' } }
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

      stuckGuide: { html: `<div class="callout callout-tip"><h4> Coordinate Geometry Strategy</h4><ol><li><strong>Two points?</strong> Use distance, midpoint, or slope formulas.</li><li><strong>Need equation?</strong> Find slope first, then use point-slope form.</li><li><strong>Parallel?</strong> Same slope. <strong>Perpendicular?</strong> Negative reciprocal slopes.</li></ol></div>` }
    }

    ]
  });
})();
