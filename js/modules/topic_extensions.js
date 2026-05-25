/* ============================================================
   Topic Extensions
   ============================================================ */
(function() {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];

  const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;

  function addTopic(moduleId, topic) {
    const mod = window.MATH_MODULES.find(m => m.id === moduleId);
    if (!mod) return;
    if (!mod.topics.some(existing => existing.id === topic.id)) {
      mod.topics.push(topic);
    }
  }

  function renderLinearModel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="inline-model" data-model="linear">
        <div class="model-controls">
          <label>Slope m <input type="range" min="-3" max="3" step="0.5" value="1" data-linear-m></label>
          <label>Intercept b <input type="range" min="-4" max="4" step="1" value="0" data-linear-b></label>
        </div>
        <svg viewBox="0 0 520 320" role="img" aria-label="Interactive line graph with slope and intercept controls">
          <rect x="0" y="0" width="520" height="320" fill="transparent"/>
          <g stroke="rgba(148,163,184,0.18)" stroke-width="1"></g>
          <line x1="40" y1="160" x2="480" y2="160" stroke="#94a3b8"/>
          <line x1="260" y1="28" x2="260" y2="292" stroke="#94a3b8"/>
          <path data-line-path fill="none" stroke="#2563eb" stroke-width="3"/>
          <circle data-point-a r="4" fill="#10b981"/>
          <circle data-point-b r="4" fill="#10b981"/>
          <text x="34" y="156" fill="#64748b" font-size="11">0</text>
          <text data-line-label x="54" y="38" fill="#0f172a" font-size="13" font-weight="700"></text>
          <text data-rise-label x="344" y="112" fill="#b45309" font-size="12"></text>
          <path data-rise-path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5 4"/>
        </svg>
        <p class="model-readout" data-linear-readout></p>
      </div>
    `;
    const mInput = container.querySelector('[data-linear-m]');
    const bInput = container.querySelector('[data-linear-b]');
    const svg = container.querySelector('svg');
    const grid = svg.querySelector('g');
    const path = svg.querySelector('[data-line-path]');
    const label = svg.querySelector('[data-line-label]');
    const pA = svg.querySelector('[data-point-a]');
    const pB = svg.querySelector('[data-point-b]');
    const risePath = svg.querySelector('[data-rise-path]');
    const riseLabel = svg.querySelector('[data-rise-label]');
    const readout = container.querySelector('[data-linear-readout]');
    grid.innerHTML = '';
    for (let x = 40; x <= 480; x += 44) grid.innerHTML += `<line x1="${x}" y1="28" x2="${x}" y2="292"/>`;
    for (let y = 28; y <= 292; y += 33) grid.innerHTML += `<line x1="40" y1="${y}" x2="480" y2="${y}"/>`;
    const sx = x => 260 + x * 44;
    const sy = y => 160 - y * 33;
    const update = () => {
      const m = Number(mInput.value);
      const b = Number(bInput.value);
      const pts = [];
      for (let x = -5; x <= 5; x += 0.25) {
        const y = m * x + b;
        pts.push(`${sx(x)},${sy(y)}`);
      }
      path.setAttribute('d', `M ${pts.join(' L ')}`);
      pA.setAttribute('cx', sx(0));
      pA.setAttribute('cy', sy(b));
      pB.setAttribute('cx', sx(1));
      pB.setAttribute('cy', sy(m + b));
      risePath.setAttribute('d', `M ${sx(0)} ${sy(b)} L ${sx(1)} ${sy(b)} L ${sx(1)} ${sy(m + b)}`);
      label.textContent = `y = ${m}x ${b < 0 ? '- ' + Math.abs(b) : '+ ' + b}`;
      riseLabel.textContent = `run 1, rise ${m}`;
      readout.textContent = `The intercept is ${b}, so the line crosses the y-axis at (0, ${b}). A run of 1 changes y by ${m}.`;
    };
    mInput.addEventListener('input', update);
    bInput.addEventListener('input', update);
    update();
  }

  function renderTrigModel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="inline-model" data-model="trig">
        <div class="model-controls">
          <label>Amplitude A <input type="range" min="0.5" max="3" step="0.5" value="1" data-trig-a></label>
          <label>Frequency B <input type="range" min="0.5" max="3" step="0.5" value="1" data-trig-b></label>
          <label>Midline D <input type="range" min="-2" max="2" step="0.5" value="0" data-trig-d></label>
        </div>
        <svg viewBox="0 0 620 320" role="img" aria-label="Interactive sine graph showing amplitude, period, and midline">
          <rect x="0" y="0" width="620" height="320" fill="transparent"/>
          <line x1="48" y1="160" x2="580" y2="160" stroke="#94a3b8"/>
          <line x1="48" y1="32" x2="48" y2="288" stroke="#94a3b8"/>
          <line data-midline x1="48" x2="580" stroke="#b45309" stroke-width="2" stroke-dasharray="6 4"/>
          <path data-sine-path fill="none" stroke="#2563eb" stroke-width="3"/>
          <text data-sine-label x="60" y="42" fill="#0f172a" font-size="13" font-weight="700"></text>
          <text data-period-label x="370" y="288" fill="#475569" font-size="12"></text>
        </svg>
        <p class="model-readout" data-trig-readout></p>
      </div>
    `;
    const aInput = container.querySelector('[data-trig-a]');
    const bInput = container.querySelector('[data-trig-b]');
    const dInput = container.querySelector('[data-trig-d]');
    const path = container.querySelector('[data-sine-path]');
    const midline = container.querySelector('[data-midline]');
    const label = container.querySelector('[data-sine-label]');
    const periodLabel = container.querySelector('[data-period-label]');
    const readout = container.querySelector('[data-trig-readout]');
    const sx = x => 48 + (x / (2 * Math.PI)) * 532;
    const sy = y => 160 - y * 42;
    const update = () => {
      const A = Number(aInput.value);
      const B = Number(bInput.value);
      const D = Number(dInput.value);
      const pts = [];
      for (let x = 0; x <= 2 * Math.PI; x += 0.025) {
        pts.push(`${sx(x)},${sy(A * Math.sin(B * x) + D)}`);
      }
      path.setAttribute('d', `M ${pts.join(' L ')}`);
      midline.setAttribute('y1', sy(D));
      midline.setAttribute('y2', sy(D));
      label.textContent = `y = ${A} sin(${B}x) ${D < 0 ? '- ' + Math.abs(D) : '+ ' + D}`;
      periodLabel.textContent = `Period = 2pi / ${B} = ${(2 / B).toFixed(2)}pi`;
      readout.textContent = `Amplitude ${A} gives distance from the midline to a peak. The midline is y = ${D}. Larger B shortens the period.`;
    };
    [aInput, bInput, dInput].forEach(input => input.addEventListener('input', update));
    update();
  }

  function renderPolarModel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="inline-model" data-model="polar">
        <div class="model-controls">
          <label>theta <input type="range" min="0" max="6.283" step="0.05" value="0.8" data-polar-theta></label>
          <label>r <input type="range" min="0" max="5" step="0.25" value="3" data-polar-r></label>
        </div>
        <svg viewBox="0 0 420 320" role="img" aria-label="Interactive polar coordinate model">
          <rect x="0" y="0" width="420" height="320" fill="transparent"/>
          <circle cx="210" cy="160" r="40" fill="none" stroke="rgba(148,163,184,0.25)"/>
          <circle cx="210" cy="160" r="80" fill="none" stroke="rgba(148,163,184,0.25)"/>
          <circle cx="210" cy="160" r="120" fill="none" stroke="rgba(148,163,184,0.25)"/>
          <line x1="50" y1="160" x2="370" y2="160" stroke="#94a3b8"/>
          <line x1="210" y1="28" x2="210" y2="292" stroke="#94a3b8"/>
          <path data-polar-arc fill="none" stroke="#b45309" stroke-width="2"/>
          <line data-polar-ray x1="210" y1="160" stroke="#2563eb" stroke-width="3"/>
          <circle data-polar-point r="5" fill="#10b981"/>
          <text data-polar-label x="24" y="30" fill="#0f172a" font-size="13" font-weight="700"></text>
        </svg>
        <p class="model-readout" data-polar-readout></p>
      </div>
    `;
    const thetaInput = container.querySelector('[data-polar-theta]');
    const rInput = container.querySelector('[data-polar-r]');
    const ray = container.querySelector('[data-polar-ray]');
    const point = container.querySelector('[data-polar-point]');
    const arc = container.querySelector('[data-polar-arc]');
    const label = container.querySelector('[data-polar-label]');
    const readout = container.querySelector('[data-polar-readout]');
    const update = () => {
      const theta = Number(thetaInput.value);
      const r = Number(rInput.value);
      const scale = 24;
      const x = 210 + r * scale * Math.cos(theta);
      const y = 160 - r * scale * Math.sin(theta);
      ray.setAttribute('x2', x);
      ray.setAttribute('y2', y);
      point.setAttribute('cx', x);
      point.setAttribute('cy', y);
      const ax = 210 + 36 * Math.cos(theta);
      const ay = 160 - 36 * Math.sin(theta);
      const large = theta > Math.PI ? 1 : 0;
      arc.setAttribute('d', `M 246 160 A 36 36 0 ${large} 0 ${ax} ${ay}`);
      label.textContent = `(r, theta) = (${r}, ${theta.toFixed(2)})`;
      readout.textContent = `Rectangular coordinates are approximately x = ${(r * Math.cos(theta)).toFixed(2)}, y = ${(r * Math.sin(theta)).toFixed(2)}.`;
    };
    thetaInput.addEventListener('input', update);
    rInput.addEventListener('input', update);
    update();
  }

  function renderSlopeFieldModel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="inline-model" data-model="slope-field">
        <div class="model-controls">
          <label>Initial value y(0) <input type="range" min="-2" max="3" step="0.25" value="1" data-ode-y0></label>
          <label>Growth rate k <input type="range" min="-1" max="1" step="0.1" value="0.4" data-ode-k></label>
        </div>
        <svg viewBox="0 0 520 320" role="img" aria-label="Interactive slope field for dy dx equals k y">
          <rect x="0" y="0" width="520" height="320" fill="transparent"/>
          <g data-ode-grid stroke="rgba(148,163,184,0.16)" stroke-width="1"></g>
          <line x1="44" y1="160" x2="480" y2="160" stroke="#94a3b8"/>
          <line x1="260" y1="30" x2="260" y2="292" stroke="#94a3b8"/>
          <g data-ode-slopes stroke="#64748b" stroke-width="1.4" stroke-linecap="round"></g>
          <path data-ode-solution fill="none" stroke="#2563eb" stroke-width="3"/>
          <circle data-ode-point r="5" fill="#10b981"/>
          <text data-ode-label x="28" y="30" fill="#0f172a" font-size="13" font-weight="700"></text>
        </svg>
        <p class="model-readout" data-ode-readout></p>
      </div>
    `;
    const y0Input = container.querySelector('[data-ode-y0]');
    const kInput = container.querySelector('[data-ode-k]');
    const grid = container.querySelector('[data-ode-grid]');
    const slopes = container.querySelector('[data-ode-slopes]');
    const solution = container.querySelector('[data-ode-solution]');
    const point = container.querySelector('[data-ode-point]');
    const label = container.querySelector('[data-ode-label]');
    const readout = container.querySelector('[data-ode-readout]');
    const sx = x => 260 + x * 54;
    const sy = y => 160 - y * 36;
    grid.innerHTML = '';
    for (let x = 44; x <= 480; x += 54) grid.innerHTML += `<line x1="${x}" y1="30" x2="${x}" y2="292"/>`;
    for (let y = 52; y <= 268; y += 36) grid.innerHTML += `<line x1="44" y1="${y}" x2="480" y2="${y}"/>`;
    const update = () => {
      const y0 = Number(y0Input.value);
      const k = Number(kInput.value);
      let slopeHtml = '';
      for (let x = -4; x <= 4; x += 1) {
        for (let y = -3; y <= 3; y += 1) {
          const m = k * y;
          const len = 18;
          const dx = len / Math.sqrt(1 + m * m);
          const dy = m * dx;
          slopeHtml += `<line x1="${sx(x) - dx / 2}" y1="${sy(y) + dy / 2}" x2="${sx(x) + dx / 2}" y2="${sy(y) - dy / 2}"/>`;
        }
      }
      slopes.innerHTML = slopeHtml;
      const pts = [];
      for (let x = -4; x <= 4; x += 0.12) {
        const y = y0 * Math.exp(k * x);
        pts.push(`${sx(x)},${sy(y)}`);
      }
      solution.setAttribute('d', `M ${pts.join(' L ')}`);
      point.setAttribute('cx', sx(0));
      point.setAttribute('cy', sy(y0));
      label.textContent = `dy/dx = ${k.toFixed(1)}y, y(0) = ${y0}`;
      readout.textContent = `The slope at each point is k times the current y-value. The blue curve is y = ${y0}e^(${k.toFixed(1)}x), the solution through (0, ${y0}).`;
    };
    y0Input.addEventListener('input', update);
    kInput.addEventListener('input', update);
    update();
  }

  addTopic('foundations', {
    id: 'relations-equivalence',
    title: 'Relations, Equivalence & Partitions',
    description: 'Classifying relationships between objects and using equivalence classes to organize a set.',
    prereqRecap: [
      { term: 'Set', definition: 'A collection of distinct objects.' },
      { term: 'Ordered pair', definition: 'A pair $(a,b)$ where order matters.' },
      { term: 'Subset', definition: '$A\\subseteq B$ means every element of $A$ is also in $B$.' }
    ],
    whyExists: { html: String.raw`
      <p><strong>Purpose.</strong> A relation records which objects are connected to which other objects. Equality, divisibility, order, congruence, and similarity are all relations.</p>
      ${WHY('Why equivalence classes matter', '<p>An equivalence relation lets a large set be grouped into meaningful categories. Same remainder after division by 3 groups all integers into three classes: remainder 0, remainder 1, and remainder 2.</p>')}
    ` },
    formalDefinitions: [
      { term: 'Relation from A to B', symbol: '$R\\subseteq A\\times B$', definition: 'A set of ordered pairs connecting elements of $A$ to elements of $B$.' },
      { term: 'Reflexive', symbol: '$aRa$', definition: 'Every element is related to itself.' },
      { term: 'Symmetric', symbol: '$aRb\\Rightarrow bRa$', definition: 'The relation works in both directions.' },
      { term: 'Transitive', symbol: '$aRb\\text{ and }bRc\\Rightarrow aRc$', definition: 'Two linked relationships chain together.' },
      { term: 'Equivalence relation', symbol: '$\\sim$', definition: 'A relation that is reflexive, symmetric, and transitive.' }
    ],
    concept: { html: String.raw`
      <div class="callout callout-key"><h4>Relation as a Checklist</h4>
      <p>To test a relation, check its rule against the three required properties. One counterexample is enough to show that a property fails.</p></div>
      <div class="callout callout-key"><h4>Equivalence Classes</h4>
      <p>An equivalence class contains everything equivalent to one chosen element. Equivalence classes never overlap unless they are the same class, and together they partition the set.</p></div>
    ` },
    examples: [
      {
        title: 'Remainders Modulo 3',
        problem: 'On the integers, define $a\\sim b$ when $a-b$ is divisible by 3. Show that this is an equivalence relation and list the classes.',
        steps: [
          { title: 'Reflexive', content: '$a-a=0$, and $0$ is divisible by 3.', why: 'Every integer has the same remainder as itself.' },
          { title: 'Symmetric', content: 'If $a-b=3k$, then $b-a=-3k=3(-k)$.', why: 'Divisibility by 3 survives changing the sign.' },
          { title: 'Transitive', content: 'If $a-b=3k$ and $b-c=3m$, then $a-c=(a-b)+(b-c)=3(k+m)$.', why: 'The two differences combine into another multiple of 3.' },
          { title: 'Classes', content: '$[0]=\\{\\ldots,-3,0,3,6,\\ldots\\}$, $[1]=\\{\\ldots,-2,1,4,7,\\ldots\\}$, and $[2]=\\{\\ldots,-1,2,5,8,\\ldots\\}$.', why: 'Every integer has exactly one remainder after division by 3.' }
        ]
      }
    ],
    exercises: [
      { difficulty: 'easy', question: 'The relation $=$ on real numbers is:', options: ['An equivalence relation', 'Not reflexive', 'Not symmetric', 'Not transitive'], correctIndex: 0, hint: '<p>Check equality against the three properties.</p>', correctExplanation: 'Equality is reflexive, symmetric, and transitive.', wrongExplanations: { 1: '$a=a$ for every real number.', 2: 'If $a=b$, then $b=a$.', 3: 'If $a=b$ and $b=c$, then $a=c$.' } },
      { difficulty: 'medium', question: 'The relation $a\\lt b$ on real numbers is not reflexive because:', options: ['$a\\lt a$ is false', '$a\\lt b$ implies $b\\lt a$', 'It has no ordered pairs', 'It is always true'], correctIndex: 0, hint: '<p>Reflexive means each element relates to itself.</p>', correctExplanation: 'No real number is less than itself, so strict inequality is not reflexive.', wrongExplanations: { 1: 'Strict inequality is not symmetric.', 2: 'It has many ordered pairs, such as $(1,2)$.', 3: 'Strict inequality is not always true.' } },
      { difficulty: 'hard', question: 'If equivalence classes overlap, then they must be:', options: ['The same class', 'Disjoint anyway', 'Empty', 'Not subsets'], correctIndex: 0, hint: '<p>Shared membership connects representatives by transitivity.</p>', correctExplanation: 'Equivalence classes either match exactly or do not overlap.', wrongExplanations: { 1: 'Overlapping classes cannot be disjoint.', 2: 'An overlapping class is not empty.', 3: 'Classes are subsets of the original set.' } }
    ],
    freeResponse: [
      { difficulty: 'medium', question: 'An equivalence relation must be reflexive, symmetric, and _____.', accept: ['transitive'], placeholder: 'Property', explanation: 'The three properties are reflexive, symmetric, and transitive.' },
      { difficulty: 'hard', question: 'For integers modulo 4, how many equivalence classes are there?', accept: [4, '4'], placeholder: 'Number', explanation: 'There are four possible remainders: 0, 1, 2, and 3.' }
    ],
    stepBuilder: [
      { difficulty: 'medium', question: 'Test whether same parity is an equivalence relation on integers.', steps: [
        { content: 'Reflexive: every integer has the same parity as itself.' },
        { content: 'Symmetric: if $a$ has the same parity as $b$, then $b$ has the same parity as $a$.' },
        { content: 'Transitive: if $a$ has the same parity as $b$ and $b$ has the same parity as $c$, then $a$ has the same parity as $c$.' },
        { content: 'Therefore same parity is an equivalence relation.' }
      ], explanation: 'Each property follows from the fact that every integer is either even or odd.' }
    ],
    stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Relation Strategy</h4><ol><li>Write the relation rule in plain language.</li><li>Test reflexive behavior with an arbitrary element $a$.</li><li>Test symmetry by reversing the pair.</li><li>Test transitivity by chaining two related pairs.</li><li>Use counterexamples when a property fails.</li></ol></div>` }
  });

  addTopic('beginning-algebra', {
    id: 'linear-functions-slope',
    title: 'Linear Graphs, Slope & Intercepts',
    description: 'Graphing linear equations and interpreting slope as a constant rate of change.',
    prereqRecap: [
      { term: 'Coordinate pair', definition: 'An ordered pair $(x,y)$ locating a point on the coordinate plane.' },
      { term: 'Equation', definition: 'A statement that two expressions have the same value.' },
      { term: 'Rate of change', definition: 'Output change divided by input change.' }
    ],
    whyExists: { html: String.raw`
      <p><strong>Purpose.</strong> Linear equations are the first model for constant change. If a quantity grows by the same amount for every equal step in input, its graph is a line.</p>
      ${WHY('Why slope matters', '<p>Slope is not just the tilt of a graph. It is the unit rate. A slope of 12 dollars per gigabyte means each additional gigabyte adds 12 dollars to the bill.</p>')}
    ` },
    formalDefinitions: [
      { term: 'Slope', symbol: '$m=\\frac{\\Delta y}{\\Delta x}$', definition: 'The change in output divided by the change in input.' },
      { term: 'Slope-intercept form', symbol: '$y=mx+b$', definition: '$m$ is slope and $b$ is the y-intercept.' },
      { term: 'x-intercept', symbol: '$(x,0)$', definition: 'Where the graph crosses the x-axis.' },
      { term: 'y-intercept', symbol: '$(0,b)$', definition: 'Where the graph crosses the y-axis.' }
    ],
    concept: { html: String.raw`
      <div class="callout callout-key"><h4>Reading a Line</h4>
      <p>In $y=mx+b$, the intercept $b$ gives the starting value at $x=0$. The slope $m$ gives how much $y$ changes when $x$ increases by 1.</p></div>
      <div class="callout callout-key"><h4>From Two Points to a Line</h4>
      <p>For points $(x_1,y_1)$ and $(x_2,y_2)$, compute $m=\frac{y_2-y_1}{x_2-x_1}$. Then use one point in $y=mx+b$ to solve for $b$.</p></div>
    ` },
    examples: [
      {
        title: 'Phone Bill Model',
        problem: 'A plan costs 35 dollars plus 12 dollars per GB. Write the line and interpret a point on it.',
        steps: [
          { title: 'Identify starting value', content: 'The fixed cost is 35 dollars, so $b=35$.', why: 'The fixed cost is paid even when $x=0$.' },
          { title: 'Identify slope', content: 'Each additional GB adds 12 dollars, so $m=12$.', why: 'This is the constant rate of change.' },
          { title: 'Write the equation', content: '$y=12x+35$.', why: 'Use slope-intercept form.' },
          { title: 'Interpret a point', content: 'At $x=5$, $y=12(5)+35=95$. The point $(5,95)$ means 5 GB predicts a 95 dollar bill.', why: 'Coordinates carry units from the context.' }
        ]
      }
    ],
    visualizations: [{ render: renderLinearModel }],
    exercises: [
      { difficulty: 'easy', question: 'For $y=3x-2$, the slope is:', options: ['$3$', '$-2$', '$x$', '$1$'], correctIndex: 0, hint: '<p>Compare to $y=mx+b$.</p>', correctExplanation: 'The coefficient of $x$ is the slope, so $m=3$.', wrongExplanations: { 1: '$-2$ is the y-intercept.', 2: '$x$ is the input variable.', 3: 'The slope is the coefficient of $x$.' } },
      { difficulty: 'medium', question: 'The slope through $(2,5)$ and $(6,13)$ is:', options: ['$2$', '$4$', '$8$', '$18$'], correctIndex: 0, hint: '<p>Compute change in y divided by change in x.</p>', correctExplanation: '$m=\\frac{13-5}{6-2}=\\frac{8}{4}=2$.', wrongExplanations: { 1: '4 is the run, not the slope.', 2: '8 is the rise, not the slope.', 3: 'Adding coordinates does not give slope.' } },
      { difficulty: 'hard', question: 'A line has slope $-2$ and passes through $(3,1)$. Its y-intercept is:', options: ['$7$', '$-5$', '$3$', '$1$'], correctIndex: 0, hint: '<p>Use $y=mx+b$ with the point.</p>', correctExplanation: '$1=-2(3)+b$, so $b=7$.', wrongExplanations: { 1: 'Check the sign: $1=-6+b$.', 2: '3 is the x-coordinate.', 3: '1 is the y-coordinate of the given point.' } }
    ],
    freeResponse: [
      { difficulty: 'easy', question: 'Find the y-intercept of $y=4x+9$.', accept: [9, '9'], placeholder: 'Number', explanation: 'In $y=mx+b$, the y-intercept is $b=9$.' },
      { difficulty: 'medium', question: 'Find the slope through $(1,2)$ and $(4,11)$.', accept: [3, '3'], placeholder: 'Number', explanation: '$m=\\frac{11-2}{4-1}=3$.' },
      { difficulty: 'hard', question: 'Write the equation of a line with slope 5 and y-intercept -1.', accept: ['y=5x-1', 'y = 5x - 1'], placeholder: 'Equation', explanation: 'Use $y=mx+b$ with $m=5$ and $b=-1$.' }
    ],
    stepBuilder: [
      { difficulty: 'medium', question: 'Find the equation of the line through $(2,7)$ and $(5,16)$.', steps: [
        { content: 'Compute slope: $m=\\frac{16-7}{5-2}=3$.' },
        { content: 'Use $y=mx+b$ with $(2,7)$: $7=3(2)+b$.' },
        { content: 'Solve for $b$: $b=1$.' },
        { content: 'The equation is $y=3x+1$.' }
      ], explanation: 'Two points determine a line when the x-values differ.' }
    ],
    stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Linear Graph Strategy</h4><ol><li>Use units to identify the starting value and rate.</li><li>Use $m=\frac{\Delta y}{\Delta x}$ when two points are given.</li><li>Use $y=mx+b$ when slope and intercept matter.</li><li>Check by substituting a known point.</li></ol></div>` }
  });

  addTopic('beginning-algebra', {
    id: 'absolute-value-variation',
    title: 'Absolute Value, Distance & Variation',
    description: 'Solving absolute value statements and recognizing direct, inverse, and joint variation models.',
    prereqRecap: [
      { term: 'Distance on a number line', definition: 'Distance is nonnegative.' },
      { term: 'Equation solving', definition: 'Use inverse operations that preserve the solution set.' },
      { term: 'Proportion', definition: 'A statement that two ratios are equal.' }
    ],
    whyExists: { html: String.raw`
      <p><strong>Purpose.</strong> Absolute value measures distance from zero, so it appears whenever direction is removed. Variation models describe how one quantity changes when another quantity changes by a scale factor.</p>
      ${WHY('Why absolute value splits into cases', '<p>The equation $|x|=5$ has two solutions because both 5 and -5 are distance 5 from zero. Every absolute value equation with a positive right side creates a positive case and a negative case.</p>')}
    ` },
    formalDefinitions: [
      { term: 'Absolute value', symbol: '$|x|$', definition: 'Distance from $x$ to 0 on the number line.' },
      { term: 'Absolute value equation', symbol: '$|A|=k$', definition: 'For $k>0$, solve $A=k$ or $A=-k$.' },
      { term: 'Direct variation', symbol: '$y=kx$', definition: '$y$ changes by a constant multiple of $x$.' },
      { term: 'Inverse variation', symbol: '$y=\\frac{k}{x}$', definition: '$y$ decreases as $x$ increases so that $xy=k$.' },
      { term: 'Joint variation', symbol: '$z=kxy$', definition: '$z$ varies directly with more than one variable.' }
    ],
    concept: { html: String.raw`
      <div class="callout callout-key"><h4>Absolute Value Means Distance</h4>
      <p>The statement $|x-a|=r$ means $x$ is $r$ units away from $a$. The solutions are $a-r$ and $a+r$ when $r>0$.</p></div>
      <div class="callout callout-key"><h4>Variation Means Scale</h4>
      <p>In a variation model, the constant $k$ carries the unit conversion. Find $k$ from one known case, then reuse the model for the new case.</p></div>
    ` },
    examples: [
      {
        title: 'Delivery Distance and Cost',
        problem: 'A courier charges by distance from a warehouse at mile marker 12. A delivery address is charged for being 7 miles away. Write and solve the equation, then model a fuel cost that varies directly with miles.',
        steps: [
          { title: 'Write the distance equation', content: '$|x-12|=7$.', why: 'The expression $x-12$ measures signed displacement from the warehouse. Absolute value turns it into distance.' },
          { title: 'Split into two cases', content: '$x-12=7$ or $x-12=-7$.', why: 'A point 7 miles away can be to the right or to the left.' },
          { title: 'Solve', content: '$x=19$ or $x=5$.', why: 'Both mile markers are exactly 7 miles from 12.' },
          { title: 'Build variation model', content: 'If fuel cost is 0.42 dollars per mile, then $C=0.42m$. A 7 mile trip costs $2.94$.', why: 'Direct variation uses one constant rate per unit.' }
        ]
      }
    ],
    exercises: [
      { difficulty: 'easy', question: '$|x|=6$ has solutions:', options: ['$x=6$ only', '$x=-6$ only', '$x=6$ or $x=-6$', 'No solution'], correctIndex: 2, hint: '<p>Distance from zero can happen on either side.</p>', correctExplanation: 'Both 6 and -6 are distance 6 from zero.', wrongExplanations: { 0: 'Missing the point to the left of zero.', 1: 'Missing the point to the right of zero.', 3: 'There are two real solutions.' } },
      { difficulty: 'medium', question: 'Solve $|x-4|=3$.', options: ['$x=7$ or $x=1$', '$x=7$ only', '$x=1$ only', '$x=-7$ or $x=-1$'], correctIndex: 0, hint: '<p>$x$ is 3 units from 4.</p>', correctExplanation: '$x-4=3$ gives $x=7$, and $x-4=-3$ gives $x=1$.', wrongExplanations: { 1: 'One solution lies to the right, but another lies to the left.', 2: 'One solution lies to the left, but another lies to the right.', 3: 'The center is 4, not 0.' } },
      { difficulty: 'hard', question: 'If $y$ varies inversely with $x$ and $y=10$ when $x=3$, then $k$ is:', options: ['$30$', '$10/3$', '$13$', '$7$'], correctIndex: 0, hint: '<p>Inverse variation means $y=k/x$, so $k=xy$.</p>', correctExplanation: '$k=xy=3(10)=30$.', wrongExplanations: { 1: 'That divides in the wrong direction.', 2: 'Variation constants are not found by adding.', 3: 'Variation constants are not found by subtracting.' } }
    ],
    freeResponse: [
      { difficulty: 'medium', question: 'Solve $|x+2|=9$.', accept: ['7,-11', '-11,7', '7 and -11', '-11 and 7'], placeholder: 'Two values', explanation: '$x+2=9$ gives $x=7$. $x+2=-9$ gives $x=-11$.' },
      { difficulty: 'hard', question: 'If $y=kx$ and $y=18$ when $x=6$, find $k$.', accept: [3, '3'], placeholder: 'Number', explanation: '$18=6k$, so $k=3$.' }
    ],
    stepBuilder: [
      { difficulty: 'medium', question: 'Solve $|2x-5|=11$.', steps: [
        { content: 'Split into $2x-5=11$ or $2x-5=-11$.' },
        { content: 'First case: $2x=16$, so $x=8$.' },
        { content: 'Second case: $2x=-6$, so $x=-3$.' },
        { content: 'Check: $|2(8)-5|=11$ and $|2(-3)-5|=11$.' }
      ], explanation: 'Absolute value equations require both distance directions.' }
    ],
    stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Absolute Value and Variation Strategy</h4><ol><li>For $|A|=k$, check that $k\geq0$.</li><li>Split into $A=k$ and $A=-k$.</li><li>For variation, write the model before substituting numbers.</li><li>Solve for the constant $k$ from the known case.</li><li>Use the model, not a new proportion, for the target case.</li></ol></div>` }
  });

  addTopic('precalculus', {
    id: 'inverse-functions-modeling',
    title: 'Inverse Functions & Modeling',
    description: 'Reversing functions, checking one-to-one behavior, and interpreting inverse models in context.',
    prereqRecap: [
      { term: 'Function', definition: 'A rule with exactly one output for each input.' },
      { term: 'Composition', definition: '$(f\\circ g)(x)=f(g(x))$.' },
      { term: 'Domain restriction', definition: 'Limiting inputs so a rule becomes valid for the task.' }
    ],
    whyExists: { html: String.raw`
      <p><strong>Purpose.</strong> An inverse answers the reverse problem. If a function predicts cost from usage, its inverse predicts usage from cost.</p>
      ${WHY('Why one-to-one behavior matters', '<p>If two different inputs give the same output, the reverse question has two answers. An inverse function needs one output for each input, so the original function must be one-to-one on the chosen domain.</p>')}
    ` },
    formalDefinitions: [
      { term: 'Inverse function', symbol: '$f^{-1}$', definition: 'A function that reverses $f$, so $f^{-1}(f(x))=x$ on the domain.' },
      { term: 'One-to-one', symbol: '$f(a)=f(b)\\Rightarrow a=b$', definition: 'Different inputs produce different outputs.' },
      { term: 'Horizontal line test', symbol: '', definition: 'A graph is one-to-one if every horizontal line intersects it at most once.' }
    ],
    concept: { html: String.raw`
      <div class="callout callout-key"><h4>Finding an Inverse Algebraically</h4>
      <ol><li>Write $y=f(x)$.</li><li>Swap $x$ and $y$.</li><li>Solve for $y$.</li><li>Name the result $f^{-1}(x)$.</li><li>State any domain and range restrictions.</li></ol></div>
      <div class="callout callout-key"><h4>Model Interpretation</h4>
      <p>If $C(g)=35+12g$ gives cost from gigabytes, then $C^{-1}(c)=\frac{c-35}{12}$ gives gigabytes from cost. The inverse changes the question and changes the units.</p></div>
    ` },
    examples: [
      {
        title: 'Reverse a Pricing Model',
        problem: 'A data plan costs $C(g)=35+12g$ dollars for $g$ gigabytes. Find and interpret $C^{-1}(131)$.',
        steps: [
          { title: 'Write the reverse equation', content: '$c=35+12g$.', why: 'Use a new output letter because cost is the output.' },
          { title: 'Solve for usage', content: '$c-35=12g$, so $g=\\frac{c-35}{12}$.', why: 'The inverse isolates the original input.' },
          { title: 'Evaluate', content: '$C^{-1}(131)=\\frac{131-35}{12}=8$.', why: 'A 131 dollar bill corresponds to 8 GB in this model.' },
          { title: 'Check', content: '$C(8)=35+12(8)=131$.', why: 'Composition should return the starting value.' }
        ]
      }
    ],
    exercises: [
      { difficulty: 'easy', question: 'The inverse of $f(x)=x+4$ is:', options: ['$x-4$', '$x+4$', '$4x$', '$x/4$'], correctIndex: 0, hint: '<p>Undo adding 4.</p>', correctExplanation: '$f^{-1}(x)=x-4$.', wrongExplanations: { 1: 'That repeats the original function.', 2: 'Multiplication does not undo addition.', 3: 'Division by 4 does not undo addition.' } },
      { difficulty: 'medium', question: 'The inverse of $f(x)=3x-6$ is:', options: ['$\\frac{x+6}{3}$', '$3x+6$', '$\\frac{x-6}{3}$', '$x+2$'], correctIndex: 0, hint: '<p>Write $y=3x-6$, swap, solve.</p>', correctExplanation: '$x=3y-6$, so $y=\\frac{x+6}{3}$.', wrongExplanations: { 1: 'The inverse must undo multiplication by 3.', 2: 'The sign on 6 changes after moving it.', 3: 'That is equivalent to $(x+6)/3$ only if written as $x/3+2$, not $x+2$.' } },
      { difficulty: 'hard', question: '$f(x)=x^2$ has an inverse function on:', options: ['$[0,\\infty)$', '$\\mathbb{R}$', '$(-\\infty,\\infty)$ without 0', '$[-1,1]$ only'], correctIndex: 0, hint: '<p>Restrict to a domain where $x^2$ is one-to-one.</p>', correctExplanation: 'On $[0,\\infty)$, $x^2$ is one-to-one and the inverse is $\\sqrt{x}$.', wrongExplanations: { 1: 'On all real numbers, $2$ and $-2$ give the same output.', 2: 'Removing 0 does not fix the duplicate outputs.', 3: 'This is a possible restriction, but it is not the standard full nonnegative branch.' } }
    ],
    freeResponse: [
      { difficulty: 'medium', question: 'Find $f^{-1}(x)$ for $f(x)=2x+10$.', accept: ['(x-10)/2', 'x/2-5', 'x/2 - 5'], placeholder: 'Expression', explanation: '$y=2x+10$. Swap and solve: $x=2y+10$, so $y=(x-10)/2$.' },
      { difficulty: 'hard', question: 'If $C(g)=35+12g$, find $C^{-1}(95)$.', accept: [5, '5'], placeholder: 'Number', explanation: '$(95-35)/12=5$ GB.' }
    ],
    stepBuilder: [
      { difficulty: 'medium', question: 'Find the inverse of $f(x)=\\frac{x-2}{5}$.', steps: [
        { content: 'Write $y=\\frac{x-2}{5}$.' },
        { content: 'Swap $x$ and $y$: $x=\\frac{y-2}{5}$.' },
        { content: 'Multiply by 5: $5x=y-2$.' },
        { content: 'Solve: $y=5x+2$.' },
        { content: '$f^{-1}(x)=5x+2$.' }
      ], explanation: 'Inverse steps undo the original operations in reverse order.' }
    ],
    stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Inverse Function Strategy</h4><ol><li>Check one-to-one behavior before claiming an inverse function.</li><li>Swap $x$ and $y$ only after writing $y=f(x)$.</li><li>Solve carefully and check with composition.</li><li>Track units in applied models.</li></ol></div>` }
  });

  addTopic('precalculus', {
    id: 'conic-sections',
    title: 'Conic Sections',
    description: 'Circles, parabolas, ellipses, and hyperbolas as geometric and algebraic curves.',
    prereqRecap: [
      { term: 'Distance formula', definition: '$d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.' },
      { term: 'Completing the square', definition: 'Rewriting a quadratic expression to reveal a center or vertex.' },
      { term: 'Symmetry', definition: 'A graph property where reflected points remain on the graph.' }
    ],
    whyExists: { html: String.raw`
      <p><strong>Purpose.</strong> Conics connect geometry to equations. The same curves describe reflectors, orbits, cross sections, and quadratic relations.</p>
      ${WHY('Why standard form matters', '<p>Standard form reveals the center, radius, vertex, axes, or asymptotes without plotting many points. It turns an equation into a readable geometric object.</p>')}
    ` },
    formalDefinitions: [
      { term: 'Circle', symbol: '$(x-h)^2+(y-k)^2=r^2$', definition: 'All points at distance $r$ from center $(h,k)$.' },
      { term: 'Parabola', symbol: '$(x-h)^2=4p(y-k)$', definition: 'All points equidistant from a focus and a directrix.' },
      { term: 'Ellipse', symbol: '$\\frac{(x-h)^2}{a^2}+\\frac{(y-k)^2}{b^2}=1$', definition: 'All points whose distances to two foci have a constant sum.' },
      { term: 'Hyperbola', symbol: '$\\frac{(x-h)^2}{a^2}-\\frac{(y-k)^2}{b^2}=1$', definition: 'All points whose distances to two foci have a constant difference.' }
    ],
    concept: { html: String.raw`
      <div class="callout callout-key"><h4>Classifying a Conic</h4>
      <p>One squared variable usually gives a parabola. Two squared variables with the same sign often give a circle or ellipse. Two squared variables with opposite signs give a hyperbola.</p></div>
      <div class="callout callout-key"><h4>Completing the Square</h4>
      <p>Equations such as $x^2+y^2-6x+4y=12$ hide the center. Group variables and complete squares to reveal standard form.</p></div>
    ` },
    examples: [
      {
        title: 'Complete the Square for a Circle',
        problem: 'Classify and graph key features of $x^2+y^2-6x+4y=12$.',
        steps: [
          { title: 'Group variables', content: '$(x^2-6x)+(y^2+4y)=12$.', why: 'Each variable needs its own square completion.' },
          { title: 'Complete squares', content: '$x^2-6x=(x-3)^2-9$ and $y^2+4y=(y+2)^2-4$.', why: 'Use half the linear coefficient, then square it.' },
          { title: 'Rewrite', content: '$(x-3)^2-9+(y+2)^2-4=12$, so $(x-3)^2+(y+2)^2=25$.', why: 'Move constants to the other side.' },
          { title: 'Read features', content: 'The center is $(3,-2)$ and radius is 5.', why: 'Compare to circle standard form.' }
        ]
      }
    ],
    exercises: [
      { difficulty: 'easy', question: 'The center of $(x-4)^2+(y+1)^2=9$ is:', options: ['$(4,-1)$', '$(-4,1)$', '$(4,1)$', '$(-4,-1)$'], correctIndex: 0, hint: '<p>Compare to $(x-h)^2+(y-k)^2=r^2$.</p>', correctExplanation: 'The center is $(h,k)=(4,-1)$.', wrongExplanations: { 1: 'Signs reverse inside the parentheses.', 2: '$y+1$ means $k=-1$.', 3: '$x-4$ means $h=4$.' } },
      { difficulty: 'medium', question: '$\\frac{x^2}{9}+\\frac{y^2}{4}=1$ is:', options: ['Ellipse', 'Circle', 'Hyperbola', 'Line'], correctIndex: 0, hint: '<p>Both squared terms are positive and denominators differ.</p>', correctExplanation: 'This is an ellipse centered at the origin.', wrongExplanations: { 1: 'A circle would have equal denominators.', 2: 'A hyperbola has a subtraction between squared terms.', 3: 'Squared terms make a curved conic.' } },
      { difficulty: 'hard', question: '$\\frac{x^2}{16}-\\frac{y^2}{9}=1$ has transverse axis:', options: ['Horizontal', 'Vertical', 'Neither', 'Both'], correctIndex: 0, hint: '<p>The positive term determines the opening direction.</p>', correctExplanation: 'The positive $x^2$ term means the hyperbola opens left and right.', wrongExplanations: { 1: 'Vertical opening would have positive $y^2$ first.', 2: 'A hyperbola has a transverse axis.', 3: 'One axis is transverse and the other is conjugate.' } }
    ],
    freeResponse: [
      { difficulty: 'medium', question: 'Find the radius of $(x+2)^2+(y-5)^2=49$.', accept: [7, '7'], placeholder: 'Number', explanation: '$r^2=49$, so $r=7$.' },
      { difficulty: 'hard', question: 'Classify $x^2-y^2=1$.', accept: ['hyperbola'], placeholder: 'Conic type', explanation: 'Opposite signs on squared terms give a hyperbola.' }
    ],
    stepBuilder: [
      { difficulty: 'medium', question: 'Rewrite $x^2+y^2+2x-8y=8$ in circle standard form.', steps: [
        { content: 'Group variables: $(x^2+2x)+(y^2-8y)=8$.' },
        { content: 'Complete squares: add $1$ to the x-group and $16$ to the y-group.' },
        { content: 'Add the same values to the right side: $8+1+16=25$.' },
        { content: 'Standard form: $(x+1)^2+(y-4)^2=25$.' },
        { content: 'Center is $(-1,4)$ and radius is 5.' }
      ], explanation: 'Completing the square reveals center and radius.' }
    ],
    stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Conic Strategy</h4><ol><li>Check how many variables are squared.</li><li>Check whether squared terms have the same sign or opposite signs.</li><li>Complete the square when linear terms appear.</li><li>Compare with standard form to read features.</li></ol></div>` }
  });

  addTopic('precalculus', {
    id: 'systems-matrices',
    title: 'Systems, Matrices & Determinants',
    description: 'Using matrices to organize linear systems and solve them with elimination, inverses, and determinants.',
    prereqRecap: [
      { term: 'Linear equation', definition: 'An equation where each variable has power 1.' },
      { term: 'System of equations', definition: 'Several equations that must be true at the same time.' },
      { term: 'Coefficient', definition: 'The number multiplying a variable.' }
    ],
    whyExists: { html: String.raw`
      <p><strong>Purpose.</strong> Matrices store the coefficients of a linear system in a compact table. This lets the same solving method work for two equations, three equations, or much larger systems.</p>
      ${WHY('Why matrices are not just notation', '<p>Elimination is the real operation. A matrix keeps only the coefficients and constants, then row operations track the same equation changes without rewriting every variable each time.</p>')}
    ` },
    formalDefinitions: [
      { term: 'Matrix', symbol: '$A=[a_{ij}]$', definition: 'A rectangular array of numbers.' },
      { term: 'Augmented matrix', symbol: '$[A\\mid b]$', definition: 'The coefficient matrix with the constants column attached.' },
      { term: 'Row operation', symbol: '', definition: 'Swap rows, multiply a row by a nonzero number, or add a multiple of one row to another.' },
      { term: 'Determinant', symbol: '$\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}=ad-bc$', definition: 'A number that indicates whether a square matrix is invertible in the 2 by 2 case and beyond.' },
      { term: 'Matrix inverse', symbol: '$A^{-1}$', definition: 'A matrix satisfying $AA^{-1}=I$ when it exists.' }
    ],
    concept: { html: String.raw`
      <div class="callout callout-key"><h4>Linear System as a Matrix</h4>
      <p>The system $2x+y=7$, $x-y=2$ becomes $\left[\begin{array}{cc|c}2&1&7\\1&-1&2\end{array}\right]$. The variables are omitted because their order is fixed.</p></div>
      <div class="callout callout-key"><h4>What the Determinant Says</h4>
      <p>For a 2 by 2 coefficient matrix, a nonzero determinant means the two lines have one intersection. A zero determinant means either no solution or infinitely many solutions.</p></div>
    ` },
    examples: [
      {
        title: 'Solve a Two-Variable System by Elimination',
        problem: 'Solve $2x+y=7$ and $x-y=2$ using an augmented matrix.',
        steps: [
          { title: 'Write the matrix', content: '$\\left[\\begin{array}{cc|c}2&1&7\\\\1&-1&2\\end{array}\\right]$.', why: 'The columns represent $x$, $y$, and the constant.' },
          { title: 'Swap for an easy pivot', content: '$\\left[\\begin{array}{cc|c}1&-1&2\\\\2&1&7\\end{array}\\right]$.', why: 'A leading 1 makes elimination cleaner.' },
          { title: 'Eliminate below the pivot', content: '$R_2\\leftarrow R_2-2R_1$ gives $\\left[\\begin{array}{cc|c}1&-1&2\\\\0&3&3\\end{array}\\right]$.', why: 'This removes $x$ from the second equation.' },
          { title: 'Back substitute', content: '$3y=3$, so $y=1$. Then $x-y=2$ gives $x=3$.', why: 'The triangular system is easy to read.' },
          { title: 'Check', content: '$2(3)+1=7$ and $3-1=2$.', why: 'Both original equations must hold.' }
        ]
      }
    ],
    exercises: [
      { difficulty: 'easy', question: 'The determinant of $\\begin{pmatrix}2&1\\\\3&4\\end{pmatrix}$ is:', options: ['$5$', '$11$', '$8$', '$-5$'], correctIndex: 0, hint: '<p>Use $ad-bc$.</p>', correctExplanation: '$2(4)-1(3)=8-3=5$.', wrongExplanations: { 1: 'That adds products instead of subtracting.', 2: 'That uses only $ad$.', 3: 'The order is $ad-bc$, not $bc-ad$.' } },
      { difficulty: 'medium', question: 'A 2 by 2 system with nonzero determinant has:', options: ['One solution', 'No solution always', 'Infinitely many solutions always', 'No variables'], correctIndex: 0, hint: '<p>Nonzero determinant means the coefficient matrix is invertible.</p>', correctExplanation: 'A nonzero determinant gives a unique solution.', wrongExplanations: { 1: 'No solution can happen when determinant is zero.', 2: 'Infinitely many solutions can happen when determinant is zero.', 3: 'The system still has variables.' } },
      { difficulty: 'hard', question: 'For $A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$, $A^{-1}$ exists when:', options: ['$ad-bc\\neq0$', '$ad-bc=0$', '$a+b+c+d=0$', '$a=d$'], correctIndex: 0, hint: '<p>Use the determinant condition.</p>', correctExplanation: 'A 2 by 2 matrix is invertible exactly when its determinant is nonzero.', wrongExplanations: { 1: 'Zero determinant means no inverse.', 2: 'The sum of entries does not determine invertibility.', 3: 'Equal diagonal entries do not guarantee an inverse.' } }
    ],
    freeResponse: [
      { difficulty: 'medium', question: 'Compute $\\det\\begin{pmatrix}1&5\\\\2&3\\end{pmatrix}$.', accept: [-7, '-7'], placeholder: 'Number', explanation: '$1(3)-5(2)=3-10=-7$.' },
      { difficulty: 'hard', question: 'Solve $x+y=9$, $x-y=1$. Give $x,y$.', accept: ['5,4', '(5,4)', 'x=5,y=4'], placeholder: 'x,y', explanation: 'Add equations to get $2x=10$, so $x=5$. Then $y=4$.' }
    ],
    stepBuilder: [
      { difficulty: 'medium', question: 'Solve $3x+y=11$, $x+y=5$ by elimination.', steps: [
        { content: 'Subtract the second equation from the first: $2x=6$.' },
        { content: 'Solve $x=3$.' },
        { content: 'Substitute into $x+y=5$: $3+y=5$.' },
        { content: 'Solve $y=2$.' },
        { content: 'Check: $3(3)+2=11$ and $3+2=5$.' }
      ], explanation: 'Elimination removes one variable by combining equations.' }
    ],
    stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Matrix System Strategy</h4><ol><li>Fix the variable order before writing the matrix.</li><li>Use row operations that preserve solution sets.</li><li>Create zeros below pivots first.</li><li>Back substitute once the system is triangular.</li><li>Use determinant only when the matrix is square.</li></ol></div>` }
  });

  addTopic('trigonometry', {
    id: 'trig-graphs-inverse',
    title: 'Trigonometric Graphs & Inverse Trig',
    description: 'Amplitude, period, phase shift, midline, and inverse trigonometric function ranges.',
    prereqRecap: [
      { term: 'Unit circle', definition: 'The point at angle $t$ is $(\\cos t,\\sin t)$.' },
      { term: 'Period', definition: 'The input length after which a graph repeats.' },
      { term: 'Inverse function', definition: 'A function that reverses another function on a restricted domain.' }
    ],
    whyExists: { html: String.raw`
      <p><strong>Purpose.</strong> Trigonometric graphs model repeated motion: tides, wheels, seasons, alternating current, and sound waves. The graph parameters describe size, timing, and baseline.</p>
      ${WHY('Why inverse trig needs restricted ranges', '<p>Sine, cosine, and tangent repeat. Without restricting the range of the inverse, one input could have infinitely many angle answers. Principal ranges make inverse trig functions single-valued.</p>')}
    ` },
    formalDefinitions: [
      { term: 'Amplitude', symbol: '$|A|$', definition: 'Distance from the midline to a maximum or minimum in $A\\sin(Bx-C)+D$.' },
      { term: 'Period', symbol: '$\\frac{2\\pi}{|B|}$', definition: 'Repeat length for sine and cosine.' },
      { term: 'Midline', symbol: '$y=D$', definition: 'Horizontal center line of the wave.' },
      { term: 'Principal range of arcsine', symbol: '$[-\\frac{\\pi}{2},\\frac{\\pi}{2}]$', definition: 'The output range used so $\\arcsin$ is a function.' }
    ],
    concept: { html: String.raw`
      <div class="callout callout-key"><h4>Wave Form</h4>
      <p>For $y=A\sin(Bx-C)+D$, amplitude is $|A|$, period is $\frac{2\pi}{|B|}$, phase shift is $\frac{C}{B}$, and midline is $y=D$.</p></div>
      <div class="callout callout-key"><h4>Inverse Trig Output</h4>
      <p>$\arcsin(1/2)=\pi/6$, not $5\pi/6$, because $\arcsin$ must return a value in $[-\pi/2,\pi/2]$.</p></div>
    ` },
    visualizations: [{ render: renderTrigModel }],
    examples: [
      {
        title: 'Ferris Wheel Height',
        problem: 'A Ferris wheel has radius 20 meters and center height 24 meters. It completes one turn every 60 seconds. Write a height model for a rider starting at the midline moving upward.',
        steps: [
          { title: 'Amplitude', content: '$A=20$ because the rider moves 20 meters above and below the center.', why: 'Amplitude is radius for circular vertical motion.' },
          { title: 'Midline', content: '$D=24$ because the center is 24 meters above the ground.', why: 'The midline is the average height.' },
          { title: 'Period', content: 'The period is 60 seconds, so $B=\\frac{2\\pi}{60}=\\frac{\\pi}{30}$.', why: 'Sine repeats when its input increases by $2\\pi$.' },
          { title: 'Model', content: '$H(t)=24+20\\sin(\\frac{\\pi}{30}t)$.', why: 'Starting at the midline moving upward matches sine with no phase shift.' }
        ]
      }
    ],
    exercises: [
      { difficulty: 'easy', question: 'The amplitude of $y=4\\sin x-2$ is:', options: ['$4$', '$-2$', '$2\\pi$', '$1$'], correctIndex: 0, hint: '<p>Amplitude is $|A|$.</p>', correctExplanation: 'Amplitude is $|4|=4$.', wrongExplanations: { 1: '$-2$ is the midline value.', 2: '$2\\pi$ is the basic sine period.', 3: 'The coefficient is 4, not 1.' } },
      { difficulty: 'medium', question: 'The period of $y=\\cos(2x)$ is:', options: ['$\\pi$', '$2\\pi$', '$4\\pi$', '$2$'], correctIndex: 0, hint: '<p>Use $2\\pi/|B|$.</p>', correctExplanation: '$2\\pi/2=\\pi$.', wrongExplanations: { 1: 'That is the period of $\\cos x$.', 2: 'Dividing by 2 shortens the period.', 3: 'The period is measured in input units, not the coefficient alone.' } },
      { difficulty: 'hard', question: '$\\arccos(-1)$ equals:', options: ['$\\pi$', '$0$', '$-\\pi$', '$\\frac{\\pi}{2}$'], correctIndex: 0, hint: '<p>Use the principal range $[0,\\pi]$.</p>', correctExplanation: 'Cosine equals $-1$ at $\\pi$ in the principal range.', wrongExplanations: { 1: '$\\cos 0=1$.', 2: '$-\\pi$ is not in the principal range of arccos.', 3: '$\\cos(\\pi/2)=0$.' } }
    ],
    freeResponse: [
      { difficulty: 'medium', question: 'Find the midline of $y=3\\sin(2x)+5$.', accept: ['y=5', 'y = 5', '5'], placeholder: 'Equation', explanation: 'The vertical shift is 5, so the midline is $y=5$.' },
      { difficulty: 'hard', question: 'Find the period of $y=\\sin(4x)$.', accept: ['pi/2', '\\pi/2', 'π/2'], placeholder: 'Period', explanation: '$2\\pi/4=\\pi/2$.' }
    ],
    stepBuilder: [
      { difficulty: 'medium', question: 'Analyze $y=2\\sin(3x)+1$.', steps: [
        { content: 'Amplitude is $|2|=2$.' },
        { content: 'Period is $\\frac{2\\pi}{3}$.' },
        { content: 'Midline is $y=1$.' },
        { content: 'There is no phase shift because there is no horizontal subtraction inside the sine input.' }
      ], explanation: 'Each parameter controls one visible graph feature.' }
    ],
    stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Trig Graph Strategy</h4><ol><li>Read amplitude from the outside multiplier.</li><li>Read period from the inside multiplier.</li><li>Read midline from the vertical shift.</li><li>Use principal ranges for inverse trig values.</li></ol></div>` }
  });

  addTopic('calculus2', {
    id: 'applications-integrals',
    title: 'Applications of Integrals',
    description: 'Using definite integrals for accumulated change, area, average value, and volume.',
    prereqRecap: [
      { term: 'Definite integral', definition: '$\\int_a^b f(x)\\,dx$ accumulates signed area or total change.' },
      { term: 'Antiderivative', definition: 'A function whose derivative is the integrand.' },
      { term: 'Cross section', definition: 'A slice of a solid used to compute volume.' }
    ],
    whyExists: { html: String.raw`
      <p><strong>Purpose.</strong> Integration is not only antiderivatives. A definite integral totals a changing quantity over an interval.</p>
      ${WHY('Why units identify the meaning', '<p>If the integrand is miles per hour and the input is hours, the integral has units of miles. The units reveal whether the result is distance, area, volume, mass, or another accumulated quantity.</p>')}
    ` },
    formalDefinitions: [
      { term: 'Accumulated change', symbol: '$\\int_a^b r(t)\\,dt$', definition: 'Total change from a rate function.' },
      { term: 'Average value', symbol: '$\\frac{1}{b-a}\\int_a^b f(x)\\,dx$', definition: 'The constant height with the same total area over the interval.' },
      { term: 'Area between curves', symbol: '$\\int_a^b(\\text{top}-\\text{bottom})\\,dx$', definition: 'Area enclosed between two graphs over an interval.' },
      { term: 'Disk volume', symbol: '$\\pi\\int_a^b R(x)^2\\,dx$', definition: 'Volume of a solid of revolution with radius $R(x)$.' }
    ],
    concept: { html: String.raw`
      <div class="callout callout-key"><h4>Choosing an Integral</h4>
      <p>Use rate times time for accumulated change, top minus bottom for area, and cross-sectional area for volume. The integrand must match what a thin slice contributes.</p></div>
      <div class="callout callout-key"><h4>Positive Area vs. Signed Area</h4>
      <p>The integral $\int_a^b f(x)\,dx$ is signed. If a graph crosses the x-axis, total geometric area may require splitting the interval and using absolute value.</p></div>
    ` },
    examples: [
      {
        title: 'Distance From a Speed Function',
        problem: 'A cyclist rides with speed $v(t)=8+2t$ miles per hour for $0\\leq t\\leq 3$ hours. Find total distance and average speed.',
        steps: [
          { title: 'Set up distance', content: '$\\int_0^3(8+2t)\\,dt$.', why: 'Speed integrated over time gives distance.' },
          { title: 'Evaluate', content: '$[8t+t^2]_0^3=24+9=33$ miles.', why: 'The antiderivative of $8+2t$ is $8t+t^2$.' },
          { title: 'Average speed', content: '$\\frac{1}{3}\\int_0^3(8+2t)\\,dt=11$ miles per hour.', why: 'Average value divides total accumulation by interval length.' },
          { title: 'Check units', content: 'The integral result is miles, and the average value is miles per hour.', why: 'Units confirm the interpretation.' }
        ]
      }
    ],
    exercises: [
      { difficulty: 'easy', question: 'If $r(t)$ is gallons per minute, $\\int_0^{10} r(t)\\,dt$ has units:', options: ['Gallons', 'Minutes', 'Gallons per minute', 'Square gallons'], correctIndex: 0, hint: '<p>Rate times time gives amount.</p>', correctExplanation: 'Gallons per minute multiplied by minutes gives gallons.', wrongExplanations: { 1: 'The time unit is consumed in the multiplication.', 2: 'That is the integrand unit, not the integral unit.', 3: 'No area unit appears here.' } },
      { difficulty: 'medium', question: 'Area between $y=5$ and $y=x$ on $0\\leq x\\leq 2$ is:', options: ['$8$', '$3$', '$10$', '$5$'], correctIndex: 0, hint: '<p>Top minus bottom.</p>', correctExplanation: '$\\int_0^2(5-x)\\,dx=[5x-x^2/2]_0^2=10-2=8$.', wrongExplanations: { 1: 'That subtracts endpoints, not areas.', 2: 'That ignores the lower curve.', 3: 'That uses only the top height.' } },
      { difficulty: 'hard', question: 'Average value of $f(x)=x^2$ on $[0,3]$ is:', options: ['$3$', '$9$', '$27$', '$1$'], correctIndex: 0, hint: '<p>Use $\\frac{1}{b-a}\\int_a^b f(x)\\,dx$.</p>', correctExplanation: '$\\frac{1}{3}\\int_0^3x^2dx=\\frac{1}{3}\\cdot9=3$.', wrongExplanations: { 1: '9 is the integral, not the average value.', 2: '27 is $3^3$, not the integral.', 3: 'Check the antiderivative.' } }
    ],
    freeResponse: [
      { difficulty: 'medium', question: 'Compute $\\int_0^2 3x\\,dx$.', accept: [6, '6'], placeholder: 'Number', explanation: '$[3x^2/2]_0^2=6$.' },
      { difficulty: 'hard', question: 'Average value of $f(x)=4$ on any interval is:', accept: [4, '4'], placeholder: 'Number', explanation: 'A constant function has average value equal to the constant.' }
    ],
    stepBuilder: [
      { difficulty: 'medium', question: 'Find the area between $y=x+3$ and $y=1$ from $x=0$ to $x=4$.', steps: [
        { content: 'Top curve is $x+3$ and bottom curve is $1$.' },
        { content: 'Set up $\\int_0^4((x+3)-1)\\,dx=\\int_0^4(x+2)\\,dx$.' },
        { content: 'Antiderivative is $x^2/2+2x$.' },
        { content: 'Evaluate: $8+8=16$.' }
      ], explanation: 'Area between curves uses top minus bottom over the interval.' }
    ],
    stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Integral Application Strategy</h4><ol><li>Name the quantity in one thin slice.</li><li>Use units to check the integrand.</li><li>Set bounds from the interval or region.</li><li>Split the integral if the top curve, sign, or radius changes.</li></ol></div>` }
  });

  addTopic('calculus2', {
    id: 'parametric-polar',
    title: 'Parametric & Polar Curves',
    description: 'Describing curves with a parameter or with distance and angle.',
    prereqRecap: [
      { term: 'Function graph', definition: 'A set of points $(x,y)$ satisfying a rule.' },
      { term: 'Trig coordinates', definition: 'On a circle, $x=r\\cos\\theta$ and $y=r\\sin\\theta$.' },
      { term: 'Derivative', definition: 'Instantaneous rate of change.' }
    ],
    whyExists: { html: String.raw`
      <p><strong>Purpose.</strong> Some paths are easier to describe by motion than by $y=f(x)$. Parametric equations use time or another parameter. Polar coordinates use distance and angle.</p>
      ${WHY('Why this matters for curves', '<p>A circle fails the vertical line test, but it is simple parametrically: $x=\\cos t$, $y=\\sin t$. A spiral is simple in polar form: radius changes as angle changes.</p>')}
    ` },
    formalDefinitions: [
      { term: 'Parametric curve', symbol: '$x=x(t),\\ y=y(t)$', definition: 'A curve traced as the parameter $t$ changes.' },
      { term: 'Parametric slope', symbol: '$\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}$', definition: 'Slope of the curve when $dx/dt\\neq0$.' },
      { term: 'Polar point', symbol: '$(r,\\theta)$', definition: 'A point at distance $r$ from the origin and angle $\\theta$ from the positive x-axis.' },
      { term: 'Polar conversion', symbol: '$x=r\\cos\\theta,\\ y=r\\sin\\theta$', definition: 'Converts polar coordinates to rectangular coordinates.' }
    ],
    concept: { html: String.raw`
      <div class="callout callout-key"><h4>Parametric Thinking</h4>
      <p>In parametric form, $x$ and $y$ both depend on $t$. The parameter often represents time, so the curve has direction and speed.</p></div>
      <div class="callout callout-key"><h4>Polar Thinking</h4>
      <p>Polar coordinates locate a point by turning an angle and moving a distance. This is natural for rotations, spirals, and circular symmetry.</p></div>
    ` },
    visualizations: [{ render: renderPolarModel }],
    examples: [
      {
        title: 'Projectile Motion Parametrically',
        problem: 'A ball has $x(t)=12t$ and $y(t)=20t-16t^2$. Interpret the equations and find its height at $t=1$.',
        steps: [
          { title: 'Interpret x motion', content: '$x(t)=12t$ means the horizontal speed is 12 units per second.', why: 'The x-coordinate changes linearly with time.' },
          { title: 'Interpret y motion', content: '$y(t)=20t-16t^2$ means height rises first, then falls due to the negative quadratic term.', why: 'Gravity creates the downward curvature.' },
          { title: 'Evaluate height', content: '$y(1)=20(1)-16(1)^2=4$.', why: 'Substitute the same time into the y equation.' },
          { title: 'Find slope at time', content: '$dy/dx=\\frac{20-32t}{12}$. At $t=1$, slope is $-1$.', why: 'Parametric slope divides vertical velocity by horizontal velocity.' }
        ]
      }
    ],
    exercises: [
      { difficulty: 'easy', question: 'The polar point $(3,0)$ is:', options: ['3 units right of the origin', '3 units up', 'At the origin', '3 units left'], correctIndex: 0, hint: '<p>Angle 0 points along the positive x-axis.</p>', correctExplanation: 'At angle 0, the ray points right, so the point is $(3,0)$ in rectangular form.', wrongExplanations: { 1: 'Up corresponds to $\\theta=\\pi/2$.', 2: 'The radius is 3, not 0.', 3: 'Left corresponds to $\\theta=\\pi$.' } },
      { difficulty: 'medium', question: 'For $x=t^2$, $y=t^3$, the point at $t=2$ is:', options: ['$(4,8)$', '$(2,2)$', '$(8,4)$', '$(4,6)$'], correctIndex: 0, hint: '<p>Substitute $t=2$ into both equations.</p>', correctExplanation: '$x=2^2=4$ and $y=2^3=8$.', wrongExplanations: { 1: 'The parameter is not the point itself.', 2: 'The coordinates are reversed.', 3: '$2^3=8$, not 6.' } },
      { difficulty: 'hard', question: 'For $x=t^2+1$, $y=3t$, $\\frac{dy}{dx}$ equals:', options: ['$\\frac{3}{2t}$', '$2t/3$', '$3t^2$', '$6t$'], correctIndex: 0, hint: '<p>Use $(dy/dt)/(dx/dt)$.</p>', correctExplanation: '$dy/dt=3$ and $dx/dt=2t$, so $\\frac{dy}{dx}=\\frac{3}{2t}$.', wrongExplanations: { 1: 'That reverses the ratio.', 2: 'That multiplies unrelated expressions.', 3: 'Differentiate each component first.' } }
    ],
    freeResponse: [
      { difficulty: 'medium', question: 'Convert polar $(2,\\pi/2)$ to rectangular coordinates.', accept: ['(0,2)', '(0, 2)'], placeholder: '(x,y)', explanation: '$x=2\\cos(\\pi/2)=0$ and $y=2\\sin(\\pi/2)=2$.' },
      { difficulty: 'hard', question: 'For $x=4t$, $y=t^2$, find $dy/dx$.', accept: ['t/2', 't / 2'], placeholder: 'Expression', explanation: '$dy/dx=(2t)/4=t/2$.' }
    ],
    stepBuilder: [
      { difficulty: 'medium', question: 'Convert $(r,\\theta)=(4,\\pi)$ to rectangular coordinates.', steps: [
        { content: 'Use $x=r\\cos\\theta$ and $y=r\\sin\\theta$.' },
        { content: '$x=4\\cos\\pi=-4$.' },
        { content: '$y=4\\sin\\pi=0$.' },
        { content: 'The rectangular point is $(-4,0)$.' }
      ], explanation: 'Polar conversion projects the radius onto horizontal and vertical axes.' }
    ],
    stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Parametric and Polar Strategy</h4><ol><li>For parametric curves, substitute the same parameter into both coordinates.</li><li>For slope, divide $dy/dt$ by $dx/dt$.</li><li>For polar points, turn by $\theta$ and move distance $r$.</li><li>Use $x=r\cos\theta$ and $y=r\sin\theta$ to convert.</li></ol></div>` }
  });

  addTopic('calculus2', {
    id: 'first-order-differential-equations',
    title: 'First-Order Differential Equations',
    description: 'Modeling change with equations that relate a function to its derivative.',
    prereqRecap: [
      { term: 'Derivative', definition: '$dy/dx$ measures the instantaneous rate of change of $y$ with respect to $x$.' },
      { term: 'Antiderivative', definition: 'A function found by reversing differentiation.' },
      { term: 'Initial value', definition: 'A condition such as $y(0)=5$ that selects one solution from a family.' }
    ],
    whyExists: { html: String.raw`
      <p><strong>Purpose.</strong> A differential equation describes how a quantity changes instead of giving the quantity directly. The solution is a function whose derivative satisfies the rule.</p>
      ${WHY('Why initial values matter', '<p>The equation $dy/dx=ky$ has many solutions because many exponential curves have the same growth rule. An initial value selects the one curve that passes through the known starting point.</p>')}
    ` },
    formalDefinitions: [
      { term: 'Differential equation', symbol: '$F(x,y,y\\prime)=0$', definition: 'An equation involving an unknown function and one or more derivatives.' },
      { term: 'First-order equation', symbol: '$dy/dx=f(x,y)$', definition: 'A differential equation involving the first derivative but no higher derivative.' },
      { term: 'Separable equation', symbol: '$dy/dx=g(x)h(y)$', definition: 'An equation where all $y$ terms can be moved with $dy$ and all $x$ terms with $dx$.' },
      { term: 'Initial value problem', symbol: '$dy/dx=f(x,y),\\ y(x_0)=y_0$', definition: 'A differential equation plus a starting condition.' },
      { term: 'Slope field', symbol: '', definition: 'A graph of small tangent segments showing the derivative value at many points.' }
    ],
    concept: { html: String.raw`
      <div class="callout callout-key"><h4>Reading a Differential Equation</h4>
      <p>The equation $dy/dx=0.4y$ says the rate of change is proportional to the current amount. Larger $y$ values have steeper positive slopes, and negative $y$ values have negative slopes.</p></div>
      <div class="callout callout-key"><h4>Separation Pattern</h4>
      <p>For $dy/dx=g(x)h(y)$, rewrite as $\frac{1}{h(y)}\,dy=g(x)\,dx$, integrate both sides, then use the initial value to find the constant.</p></div>
    ` },
    visualizations: [{ render: renderSlopeFieldModel }],
    examples: [
      {
        title: 'Cooling Drink Model',
        problem: 'A drink is 80 degrees in a 20 degree room. Its temperature satisfies $\\frac{dT}{dt}=-0.1(T-20)$ with $T(0)=80$. Find the model and interpret it.',
        steps: [
          { title: 'Name the changing gap', content: 'Let $u=T-20$. Then $du/dt=dT/dt$.', why: 'The room temperature is the equilibrium, so the gap from room temperature controls cooling.' },
          { title: 'Separate', content: '$\\frac{du}{dt}=-0.1u$, so $\\frac{1}{u}du=-0.1dt$.', why: 'All $u$ terms move with $du$ and all $t$ terms move with $dt$.' },
          { title: 'Integrate', content: '$\\ln|u|=-0.1t+C$, so $u=Ce^{-0.1t}$.', why: 'Exponentiating converts the logarithm equation into an exponential model.' },
          { title: 'Use the initial value', content: '$T(0)=80$ gives $u(0)=60$, so $u=60e^{-0.1t}$.', why: 'The initial gap from room temperature is 60 degrees.' },
          { title: 'Final model', content: '$T(t)=20+60e^{-0.1t}$.', why: 'The temperature approaches 20 degrees but does not pass it in this model.' }
        ]
      }
    ],
    exercises: [
      { difficulty: 'easy', question: 'A first-order differential equation may contain:', options: ['$dy/dx$', '$d^3y/dx^3$ only', 'No derivatives', 'Only constants'], correctIndex: 0, hint: '<p>First order means first derivative.</p>', correctExplanation: 'First-order equations involve the first derivative and no higher derivatives.', wrongExplanations: { 1: 'That is third order.', 2: 'Differential equations involve derivatives.', 3: 'A constant-only equation is not a differential equation.' } },
      { difficulty: 'medium', question: '$dy/dx=3xy$ is separable because it can be written as:', options: ['$\\frac{1}{y}dy=3x\\,dx$', '$dy=3x+y\\,dx$', '$y=3x$', '$dx=3xy\\,dy$'], correctIndex: 0, hint: '<p>Move $y$ with $dy$ and $x$ with $dx$.</p>', correctExplanation: 'Divide by $y$ and multiply by $dx$: $\\frac{1}{y}dy=3x\\,dx$.', wrongExplanations: { 1: 'The product $3xy$ does not split into a sum.', 2: 'That removes the derivative rule.', 3: 'This reverses the differential placement.' } },
      { difficulty: 'hard', question: 'For $dy/dx=ky$, solutions have the form:', options: ['$y=Ce^{kx}$', '$y=kx+C$', '$y=Cx^k$', '$y=C/k$'], correctIndex: 0, hint: '<p>A function proportional to its own derivative is exponential.</p>', correctExplanation: 'The exponential $Ce^{kx}$ satisfies $y\\prime=ky$.', wrongExplanations: { 1: 'Linear functions have constant derivative.', 2: 'Power functions do not generally have derivative proportional to themselves.', 3: 'A constant has derivative zero.' } }
    ],
    freeResponse: [
      { difficulty: 'medium', question: 'Solve $dy/dx=2x$ with $y(0)=5$.', accept: ['x^2+5', 'x^2 + 5'], placeholder: 'y =', explanation: 'Integrate to get $y=x^2+C$. Since $y(0)=5$, $C=5$.' },
      { difficulty: 'hard', question: 'For $dy/dx=0.5y$ and $y(0)=8$, what is $y(x)$?', accept: ['8e^(0.5x)', '8e^{0.5x}', '8e^(x/2)'], placeholder: 'Expression', explanation: 'The proportional growth solution is $y=Ce^{0.5x}$. The initial value gives $C=8$.' }
    ],
    stepBuilder: [
      { difficulty: 'medium', question: 'Solve $dy/dx=xy$ with $y(0)=2$.', steps: [
        { content: 'Separate variables: $\\frac{1}{y}dy=x\\,dx$.' },
        { content: 'Integrate: $\\ln|y|=x^2/2+C$.' },
        { content: 'Exponentiate: $y=Ce^{x^2/2}$.' },
        { content: 'Use $y(0)=2$: $2=C$.' },
        { content: 'Solution: $y=2e^{x^2/2}$.' }
      ], explanation: 'Separable equations solve by placing each variable with its own differential before integrating.' }
    ],
    stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Differential Equation Strategy</h4><ol><li>Identify the unknown function and independent variable.</li><li>Check whether the equation is separable.</li><li>Move $y$ terms with $dy$ and $x$ terms with $dx$.</li><li>Integrate both sides and include a constant.</li><li>Use the initial value after integration.</li><li>Interpret equilibrium values and long-term behavior.</li></ol></div>` }
  });

  addTopic('calculus3', {
    id: 'vector-functions-motion',
    title: 'Vector Functions & Motion',
    description: 'Position, velocity, acceleration, and speed for curves in space.',
    prereqRecap: [
      { term: 'Vector', definition: 'A quantity with components, such as $\\langle x,y,z\\rangle$.' },
      { term: 'Derivative', definition: 'Instantaneous rate of change.' },
      { term: 'Parametric curve', definition: 'A path described by coordinates depending on a parameter.' }
    ],
    whyExists: { html: String.raw`
      <p><strong>Purpose.</strong> A moving object in the plane or in space needs more than one coordinate. A vector function records all coordinates at once.</p>
      ${WHY('Why velocity is a vector', '<p>Speed alone says how fast an object moves. Velocity says how fast and in what direction. The derivative of position must therefore be a vector.</p>')}
    ` },
    formalDefinitions: [
      { term: 'Vector function', symbol: '$\\vec r(t)=\\langle x(t),y(t),z(t)\\rangle$', definition: 'A position vector depending on a parameter.' },
      { term: 'Velocity', symbol: '$\\vec v(t)=\\vec r\\,\\prime(t)$', definition: 'Derivative of position.' },
      { term: 'Acceleration', symbol: '$\\vec a(t)=\\vec v\\,\\prime(t)=\\vec r\\,\\prime\\prime(t)$', definition: 'Derivative of velocity.' },
      { term: 'Speed', symbol: '$\\|\\vec v(t)\\|$', definition: 'Magnitude of the velocity vector.' }
    ],
    concept: { html: String.raw`
      <div class="callout callout-key"><h4>Componentwise Calculus</h4>
      <p>Differentiate or integrate each component separately. If $\vec r(t)=\langle t^2,\sin t\rangle$, then $\vec r\,\prime(t)=\langle 2t,\cos t\rangle$.</p></div>
      <div class="callout callout-key"><h4>Motion Interpretation</h4>
      <p>Position locates the object. Velocity points in the direction of motion. Acceleration shows how velocity changes.</p></div>
    ` },
    examples: [
      {
        title: 'Motion Along a Plane Curve',
        problem: 'A particle has $\\vec r(t)=\\langle t^2,3t\\rangle$. Find position, velocity, acceleration, and speed at $t=2$.',
        steps: [
          { title: 'Position', content: '$\\vec r(2)=\\langle4,6\\rangle$.', why: 'Substitute $t=2$ into each component.' },
          { title: 'Velocity', content: '$\\vec v(t)=\\langle2t,3\\rangle$, so $\\vec v(2)=\\langle4,3\\rangle$.', why: 'Differentiate position component by component.' },
          { title: 'Acceleration', content: '$\\vec a(t)=\\langle2,0\\rangle$.', why: 'Differentiate velocity component by component.' },
          { title: 'Speed', content: '$\\|\\vec v(2)\\|=\\sqrt{4^2+3^2}=5$.', why: 'Speed is the magnitude of velocity.' }
        ]
      }
    ],
    exercises: [
      { difficulty: 'easy', question: 'If $\\vec r(t)=\\langle t,2t\\rangle$, then $\\vec v(t)$ is:', options: ['$\\langle1,2\\rangle$', '$\\langle t,2t\\rangle$', '$\\langle0,0\\rangle$', '$\\langle2,1\\rangle$'], correctIndex: 0, hint: '<p>Differentiate each component.</p>', correctExplanation: 'The derivative is $\\langle1,2\\rangle$.', wrongExplanations: { 1: 'That is position, not velocity.', 2: 'Both components change with $t$.', 3: 'Keep component order.' } },
      { difficulty: 'medium', question: 'Speed for $\\vec v=\\langle3,4\\rangle$ is:', options: ['$5$', '$7$', '$1$', '$25$'], correctIndex: 0, hint: '<p>Use vector magnitude.</p>', correctExplanation: '$\\sqrt{3^2+4^2}=5$.', wrongExplanations: { 1: 'That adds components, not magnitude.', 2: 'That subtracts components.', 3: '25 is the squared speed.' } },
      { difficulty: 'hard', question: 'If $\\vec r(t)=\\langle t^2,\\cos t\\rangle$, then $\\vec a(t)$ is:', options: ['$\\langle2,-\\cos t\\rangle$', '$\\langle2t,-\\sin t\\rangle$', '$\\langle t^2,\\cos t\\rangle$', '$\\langle0,\\cos t\\rangle$'], correctIndex: 0, hint: '<p>Take two derivatives.</p>', correctExplanation: '$\\vec v=\\langle2t,-\\sin t\\rangle$ and $\\vec a=\\langle2,-\\cos t\\rangle$.', wrongExplanations: { 1: 'That is velocity.', 2: 'That is position.', 3: 'Differentiate both components twice.' } }
    ],
    freeResponse: [
      { difficulty: 'medium', question: 'Find speed for $\\vec v=\\langle5,12\\rangle$.', accept: [13, '13'], placeholder: 'Number', explanation: '$\\sqrt{5^2+12^2}=13$.' },
      { difficulty: 'hard', question: 'For $\\vec r(t)=\\langle t^3,t\\rangle$, find the first component of $\\vec v(t)$.', accept: ['3t^2', '3 t^2'], placeholder: 'Expression', explanation: 'Differentiate $t^3$ to get $3t^2$.' }
    ],
    stepBuilder: [
      { difficulty: 'medium', question: 'Analyze $\\vec r(t)=\\langle t^2,4t\\rangle$ at $t=1$.', steps: [
        { content: 'Position: $\\vec r(1)=\\langle1,4\\rangle$.' },
        { content: 'Velocity: $\\vec v(t)=\\langle2t,4\\rangle$.' },
        { content: 'Velocity at $t=1$: $\\vec v(1)=\\langle2,4\\rangle$.' },
        { content: 'Speed at $t=1$: $\\sqrt{2^2+4^2}=\\sqrt{20}=2\\sqrt5$.' }
      ], explanation: 'Vector motion uses the same derivative idea in each coordinate.' }
    ],
    stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Vector Motion Strategy</h4><ol><li>Keep position, velocity, and acceleration separate.</li><li>Differentiate component by component.</li><li>Use magnitude only when the question asks for speed or length.</li><li>Interpret vector direction, not only vector size.</li></ol></div>` }
  });

  addTopic('calculus3', {
    id: 'vector-fields-line-integrals',
    title: 'Vector Fields & Line Integrals',
    description: 'Accumulating a vector field along a curve and recognizing conservative fields.',
    prereqRecap: [
      { term: 'Dot product', definition: '$\\vec a\\cdot\\vec b$ measures alignment between vectors.' },
      { term: 'Parametric curve', definition: '$\\vec r(t)$ traces a path as $t$ changes.' },
      { term: 'Gradient', definition: '$\\nabla f$ points in the direction of fastest increase of $f$.' }
    ],
    whyExists: { html: String.raw`
      <p><strong>Purpose.</strong> A vector field assigns a vector to each point. A line integral measures how much the field pushes along a path.</p>
      ${WHY('Why direction matters', '<p>A force can be strong but do no work if it points perpendicular to motion. The dot product keeps only the component of the field that aligns with the path direction.</p>')}
    ` },
    formalDefinitions: [
      { term: 'Vector field', symbol: '$\\vec F(x,y)=\\langle P(x,y),Q(x,y)\\rangle$', definition: 'A vector assigned to each point in a region.' },
      { term: 'Line integral for work', symbol: '$\\int_C \\vec F\\cdot d\\vec r$', definition: 'Accumulation of the tangential component of a vector field along a curve.' },
      { term: 'Parametric line integral', symbol: '$\\int_a^b \\vec F(\\vec r(t))\\cdot \\vec r\\,\\prime(t)\\,dt$', definition: 'Line integral computed from a parameterization.' },
      { term: 'Conservative field', symbol: '$\\vec F=\\nabla f$', definition: 'A field that comes from a potential function. Work depends only on endpoints.' }
    ],
    concept: { html: String.raw`
      <div class="callout callout-key"><h4>Work Along a Path</h4>
      <p>The expression $\vec F(\vec r(t))\cdot \vec r\,\prime(t)$ measures field strength in the direction of motion at time $t$. Integrating totals that contribution along the path.</p></div>
      <div class="callout callout-key"><h4>Conservative Shortcut</h4>
      <p>If $\vec F=\nabla f$, then $\int_C\vec F\cdot d\vec r=f(\text{end})-f(\text{start})$. The path no longer matters.</p></div>
    ` },
    examples: [
      {
        title: 'Work Along a Straight Path',
        problem: 'Let $\\vec F(x,y)=\\langle2,3\\rangle$ and let $C$ go from $(0,0)$ to $(4,1)$ along a straight line. Compute $\\int_C\\vec F\\cdot d\\vec r$.',
        steps: [
          { title: 'Parameterize the path', content: '$\\vec r(t)=\\langle4t,t\\rangle$ for $0\\leq t\\leq1$.', why: 'This starts at $(0,0)$ and ends at $(4,1)$.' },
          { title: 'Differentiate the path', content: '$\\vec r\\,\\prime(t)=\\langle4,1\\rangle$.', why: 'This gives direction and speed along the path.' },
          { title: 'Dot with the field', content: '$\\vec F(\\vec r(t))\\cdot \\vec r\\,\\prime(t)=\\langle2,3\\rangle\\cdot\\langle4,1\\rangle=11$.', why: 'Only the aligned component contributes to work.' },
          { title: 'Integrate', content: '$\\int_0^1 11\\,dt=11$.', why: 'The contribution is constant along this path.' }
        ]
      }
    ],
    exercises: [
      { difficulty: 'easy', question: 'A vector field assigns to each point:', options: ['A vector', 'A triangle', 'A probability', 'A single fixed number only'], correctIndex: 0, hint: '<p>Read the term literally.</p>', correctExplanation: 'A vector field assigns a vector to points in a region.', wrongExplanations: { 1: 'Geometry may visualize a field, but the object is a vector.', 2: 'Probability is unrelated here.', 3: 'A scalar field assigns numbers.' } },
      { difficulty: 'medium', question: '$\\langle1,2\\rangle\\cdot\\langle3,4\\rangle$ equals:', options: ['$11$', '$10$', '$7$', '$24$'], correctIndex: 0, hint: '<p>Multiply corresponding components and add.</p>', correctExplanation: '$1(3)+2(4)=11$.', wrongExplanations: { 1: 'Check the second product.', 2: 'That adds all components.', 3: 'That multiplies all components.' } },
      { difficulty: 'hard', question: 'If $\\vec F=\\nabla f$, work from point A to point B equals:', options: ['$f(B)-f(A)$', '$f(A)-f(B)$', '$0$ always', 'Path length'], correctIndex: 0, hint: '<p>Use the fundamental theorem for line integrals.</p>', correctExplanation: 'For a conservative field, work equals potential at the endpoint minus potential at the start.', wrongExplanations: { 1: 'The order is endpoint minus start.', 2: 'Work can be nonzero.', 3: 'Path length is not enough to compute work.' } }
    ],
    freeResponse: [
      { difficulty: 'medium', question: 'Compute $\\langle2,5\\rangle\\cdot\\langle4,1\\rangle$.', accept: [13, '13'], placeholder: 'Number', explanation: '$2(4)+5(1)=13$.' },
      { difficulty: 'hard', question: 'For $\\vec F=\\langle3,0\\rangle$ and displacement $\\langle2,4\\rangle$, compute work.', accept: [6, '6'], placeholder: 'Number', explanation: 'Work is $\\vec F\\cdot\\Delta\\vec r=\\langle3,0\\rangle\\cdot\\langle2,4\\rangle=6$.' }
    ],
    stepBuilder: [
      { difficulty: 'medium', question: 'Compute work for constant force $\\vec F=\\langle1,2\\rangle$ along displacement from $(0,0)$ to $(3,4)$.', steps: [
        { content: 'Displacement is $\\Delta\\vec r=\\langle3,4\\rangle$.' },
        { content: 'Work equals force dotted with displacement.' },
        { content: '$\\langle1,2\\rangle\\cdot\\langle3,4\\rangle=1(3)+2(4)=11$.' },
        { content: 'The work is 11.' }
      ], explanation: 'For a constant force, the line integral reduces to a dot product with displacement.' }
    ],
    stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Line Integral Strategy</h4><ol><li>Parameterize the curve.</li><li>Compute $\vec r\,\prime(t)$.</li><li>Substitute the path into the vector field.</li><li>Dot the field with the path derivative.</li><li>Integrate over the parameter interval.</li></ol></div>` }
  });
})();
