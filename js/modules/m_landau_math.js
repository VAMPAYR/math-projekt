/* Original mathematical bridges for theoretical physics. */
(function () {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];
  window.MATH_MODULES.push({
    id: 'landau-math', order: 20,
    title: 'Mathematical Bridges to Theoretical Physics',
    description: 'Build models with complex numbers, linear maps, differential equations, vector integral theorems, Fourier analysis, PDEs, variational calculus, and tensors.',
    topics: [
{
  id: 'complex-phase',
  title: 'Complex Numbers: Scaling, Rotation, and Phase',
  description: 'Interpret complex arithmetic geometrically and connect phase to oscillation.',
  foundationRefs: [
    { moduleId: 'trigonometry', topicId: 'unit-circle', note: 'Radian angles and the unit circle make the rotation interpretation concrete.' },
    { moduleId: 'precalculus', topicId: 'exponentials-logarithms', note: 'Exponential laws motivate the complex exponential, with additional care for branches.' }
  ],
  concept: String.raw`
    <div class="math-diagram">
      <svg viewBox="0 0 400 230" width="400" height="230" role="img" aria-labelledby="lm-complex-title lm-complex-desc" xmlns="http://www.w3.org/2000/svg">
        <title id="lm-complex-title">A complex number as a point and vector</title>
        <desc id="lm-complex-desc">The number three plus four i is plotted three units right and four units up. Its distance from the origin is five units.</desc>
        <line x1="35" y1="180" x2="365" y2="180" stroke="var(--text-secondary)" stroke-width="2"/>
        <line x1="100" y1="210" x2="100" y2="20" stroke="var(--text-secondary)" stroke-width="2"/>
        <line x1="100" y1="180" x2="175" y2="80" stroke="var(--accent-blue)" stroke-width="3"/>
        <line x1="175" y1="80" x2="175" y2="180" stroke="var(--text-secondary)" stroke-dasharray="5 4"/>
        <circle cx="175" cy="80" r="5" fill="var(--accent-amber)"/>
        <text x="185" y="76" fill="var(--text-primary)" font-size="14">3 + 4i</text>
        <text x="135" y="205" fill="var(--text-primary)" font-size="13">3</text>
        <text x="181" y="132" fill="var(--text-primary)" font-size="13">4</text>
        <text x="34" y="110" fill="var(--accent-blue)" font-size="13">length 5</text>
        <text x="338" y="201" fill="var(--text-secondary)" font-size="13">real</text>
        <text x="110" y="30" fill="var(--text-secondary)" font-size="13">imaginary</text>
      </svg>
    </div>
    <p>A complex number $z=a+ib$ pairs two real numbers, with $i^2=-1$. Adding complex numbers adds their components. The conjugate is $\overline z=a-ib$ and the modulus is $|z|=\sqrt{a^2+b^2}$. The modulus is a nonnegative distance, not the complex number itself.</p>
    <p>For $z\ne0$, write $z=r(\cos\theta+i\sin\theta)=re^{i\theta}$, where $r=|z|>0$. Adding $2\pi$ to the angle describes the same point. Multiplication multiplies magnitudes and adds angles, so multiplying by $i$ turns a point counterclockwise by $\pi/2$ radians. Division by a nonzero complex number reverses its scaling and rotation. Multiplication by zero collapses the plane, so division by zero has no inverse.</p>
    <p>Euler's formula $e^{i\theta}=\cos\theta+i\sin\theta$ uses radians and follows from the convergent power series. It packages two real components in one expression. A real observable such as $A\cos(\omega t+\phi)$ may be recovered as the real part of $Ae^{i(\omega t+\phi)}$ when $A,\omega,\phi$ are real. Interpret the components according to the model; the imaginary component is not automatically another measurable quantity.</p>
    <p>For nonzero $z$, all logarithms are $\ln|z|+i(\arg z+2\pi k)$ for integer $k$. A principal logarithm chooses one branch and excludes its branch cut. A real logarithm identity can fail for principal complex logarithms because phases can wrap across the cut.</p>
  `,
  abstraction: String.raw`<p>Multiplication can describe a transformation of the plane rather than only repeated addition. The same scaling and phase language appears in oscillators, Fourier analysis, alternating-current models, and quantum amplitudes, with different physical units and interpretation in each setting.</p>`,
  examples: [
    {
      title: 'Rotate without changing length',
      problem: String.raw`Compute $(3+4i)i$ and interpret the result geometrically.`,
      steps: [
        { title: 'Multiply', content: String.raw`$(3+4i)i=3i+4i^2=-4+3i$.`, why: 'Use the defining relation for i.' },
        { title: 'Interpret and check', content: String.raw`The coordinate pair $(3,4)$ becomes $(-4,3)$, a counterclockwise quarter turn. Both moduli equal 5.`, why: 'Multiplication by a unit complex number changes the direction but not the distance from the origin.' }
      ]
    },
    {
      title: 'Division reverses rotation and scaling',
      problem: String.raw`Compute $(1+i)/(1-i)$ and check it using magnitudes and angles.`,
      steps: [
        { title: 'Use the conjugate', content: String.raw`Multiply numerator and denominator by $1+i$: $(1+i)^2/[(1-i)(1+i)]=2i/2=i$.`, why: 'The denominator is nonzero and its product with its conjugate is its modulus squared.' },
        { title: 'Check the geometry', content: String.raw`The numerator and denominator each have modulus $\sqrt2$; their angles are $\pi/4$ and $-\pi/4$. The quotient has modulus 1 and angle $\pi/2$, so it is $i$.`, why: 'Division divides the moduli and subtracts the angles.' }
      ]
    }
  ],
  exercises: [
    {
      difficulty: 'medium',
      question: String.raw`What geometric transformation represents multiplication by $-1$?`,
      options: ['A half-turn about the origin', 'Reflection across the real axis', 'A counterclockwise quarter-turn', 'Doubling the distance from the origin'],
      correctIndex: 0,
      hint: '<p>Compare the real and imaginary components of z and -z.</p>',
      correctExplanation: String.raw`Both coordinates change sign. This is a rotation by $\pi$ and preserves modulus.`,
      wrongExplanations: { 1: 'Reflection across the real axis changes the sign of the imaginary component only.', 2: 'Multiplication by i produces a counterclockwise quarter-turn.', 3: 'The modulus of -1 is 1, so distances are unchanged.' }
    }
  ],
  freeResponse: [
    {
      difficulty: 'easy',
      question: String.raw`Find $|3+4i|$.`,
      accept: [5], placeholder: 'Enter a number',
      hint: '<p>Use the distance from the origin to the point (3, 4).</p>',
      explanation: String.raw`$|3+4i|=\sqrt{3^2+4^2}=5$.`
    }
  ]
},
{
  id: 'eigenmodes',
  title: 'Linear Maps and Eigenmodes',
  description: 'Use eigenvectors and Hermitian operators to separate coupled mathematical or physical modes.',
  foundationRefs: [
    { moduleId: 'precalculus', topicId: 'systems-matrices', note: 'A matrix represents a linear map after a basis is chosen.' },
    { moduleId: 'calculus-3', topicId: 'vectors', note: 'Vectors, dot products, and orthogonality describe directions and components.' }
  ],
  concept: String.raw`
    <div class="math-diagram">
      <svg viewBox="0 0 440 170" width="440" height="170" role="img" aria-labelledby="lm-eigen-title lm-eigen-desc" xmlns="http://www.w3.org/2000/svg">
        <title id="lm-eigen-title">Two independent directions for a symmetric linear map</title>
        <desc id="lm-eigen-desc">The symmetric direction has both components positive. The antisymmetric direction has one positive and one negative component. The matrix scales these directions by three and one respectively.</desc>
        <text x="20" y="24" fill="var(--text-primary)" font-size="14">A = [[2, 1], [1, 2]]</text>
        <text x="20" y="62" fill="var(--accent-blue)" font-size="14">(1, 1) → (3, 3)</text>
        <line x1="25" y1="88" x2="95" y2="88" stroke="var(--accent-blue)" stroke-width="4"/>
        <path d="M95 88 L84 82 M95 88 L84 94" stroke="var(--accent-blue)" stroke-width="3" fill="none"/>
        <line x1="120" y1="88" x2="190" y2="88" stroke="var(--accent-blue)" stroke-width="4"/>
        <path d="M190 88 L179 82 M190 88 L179 94" stroke="var(--accent-blue)" stroke-width="3" fill="none"/>
        <text x="235" y="62" fill="var(--accent-amber)" font-size="14">(1, −1) → (1, −1)</text>
        <line x1="245" y1="88" x2="315" y2="88" stroke="var(--accent-amber)" stroke-width="4"/>
        <path d="M315 88 L304 82 M315 88 L304 94" stroke="var(--accent-amber)" stroke-width="3" fill="none"/>
        <line x1="405" y1="88" x2="335" y2="88" stroke="var(--accent-amber)" stroke-width="4"/>
        <path d="M335 88 L346 82 M335 88 L346 94" stroke="var(--accent-amber)" stroke-width="3" fill="none"/>
        <text x="20" y="142" fill="var(--text-secondary)" font-size="12">Arrows show relative component signs, not physical distance.</text>
      </svg>
    </div>
    <p>A <strong>linear map</strong> preserves vector addition and scalar multiplication. A matrix is a coordinate description of that map after an input and output basis have been selected. Its columns show the images of the chosen input basis vectors.</p>
    <p>An eigenvector is a <em>nonzero</em> vector satisfying $Av=\lambda v$. With a real eigenvalue, the map rescales the vector and can reverse its direction; a complex eigenvalue can also change its phase while preserving the complex eigenline. Zero is excluded because it satisfies this equation for every candidate $\lambda$ and would reveal nothing. The equation $\det(A-\lambda I)=0$ finds candidate eigenvalues; solving $(A-\lambda I)v=0$ finds their directions.</p>
    <p>If an $n$-dimensional operator has $n$ linearly independent eigenvectors, writing them as columns of $P$ gives $A=PDP^{-1}$. Not every matrix has enough eigenvectors: a repeated root of the characteristic polynomial does not by itself guarantee diagonalization. If $P$ is orthonormal, $P^{-1}=P^\dagger$.</p>
    <p>For complex vectors, use the conjugate inner product $\langle u,v\rangle=u^\dagger v$. A finite-dimensional Hermitian matrix obeys $A^\dagger=A$ and has real eigenvalues and an orthonormal eigenbasis. In quantum models an observable is represented by an appropriate self-adjoint operator; infinite-dimensional operator domains need care beyond the finite-matrix result.</p>
    <p><strong>Transfer:</strong> diagonalizing the stiffness matrix of coupled oscillators gives independent normal modes when the mass matrix has been handled consistently. Diagonalizing a covariance matrix finds orthogonal directions of variation. The computation resembles both cases; the meaning and units of the eigenvalues depend on the operator.</p>`,
  examples: [
    {
      title: 'Two coupled components',
      problem: String.raw`Find the eigenvalues and eigenvectors of $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$.`,
      steps: [
        { title: 'Find candidate scales', content: String.raw`$\det(A-\lambda I)=(2-\lambda)^2-1=(\lambda-3)(\lambda-1)$, so the candidates are 3 and 1.`, why: 'A nonzero solution of the homogeneous system requires a singular coefficient matrix.' },
        { title: 'Find and check directions', content: String.raw`$A(1,1)^T=3(1,1)^T$ and $A(1,-1)^T=1(1,-1)^T$. Dividing each vector by $\sqrt2$ makes it a unit eigenvector.`, why: 'These two independent directions can represent any vector in the plane.' }
      ]
    },
    {
      title: 'When an eigenvalue does not give enough modes',
      problem: String.raw`Determine whether $J=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ is diagonalizable over the real or complex numbers.`,
      steps: [
        { title: 'Compare multiplicity and eigenspace', content: String.raw`$\det(J-\lambda I)=(1-\lambda)^2$, but $(J-I)v=0$ forces the second component of $v$ to be zero. The eigenspace is one-dimensional.`, why: 'A repeated root gives algebraic multiplicity, not the number of independent eigenvectors.' },
        { title: 'State the conclusion', content: 'A two-dimensional diagonalization needs two independent eigenvectors. Only one is available, so this matrix is not diagonalizable.', why: 'Check the eigenspaces before promising independent modes.' }
      ]
    }
  ],
  exercises: [{
    difficulty: 'medium', question: String.raw`If $Av=4v$ for nonzero $v$, what is $A(2v)$?`,
    options: [String.raw`$2v$`, String.raw`$4v$`, String.raw`$8v$`, String.raw`$16v$`], correctIndex: 2,
    hint: '<p>Apply linearity first.</p>', correctExplanation: String.raw`$A(2v)=2Av=8v$.`,
    wrongExplanations: { 0: 'The map scales this direction by four.', 1: 'That is Av, not A applied to 2v.', 3: 'The factor two is used once, not twice.' }
  }],
  freeResponse: [{
    difficulty: 'medium', question: String.raw`For $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, what eigenvalue corresponds to $(1,1)^T$?`,
    accept: [3], placeholder: 'Enter the eigenvalue', hint: '<p>Multiply the matrix by the vector and compare components.</p>',
    explanation: String.raw`$A(1,1)^T=(3,3)^T=3(1,1)^T$.`
  }]
},
{
  id: 'vector-integral-theorems',
  title: 'Flux, Circulation, and Integral Theorems',
  description: 'Relate local divergence and curl to integrals over oriented boundaries.',
  foundationRefs: [
    { moduleId: 'calculus-3', topicId: 'multiple-integrals', note: 'Volume and surface integrals accumulate quantities across a region.' },
    { moduleId: 'calculus3', topicId: 'vector-fields-line-integrals', note: 'Line integrals accumulate the tangential component along an oriented path.' }
  ],
  concept: String.raw`
    <p>A vector field assigns a vector to each point. <strong>Flux</strong> measures the field component crossing an oriented surface; <strong>circulation</strong> measures the tangential component along an oriented path. Dividing a small net outward flux by its volume leads to local divergence. Dividing a small circulation by its oriented area leads to a component of curl.</p>
    <p>For a sufficiently smooth field on a suitable bounded volume, the divergence theorem states $\iiint_V\nabla\!\cdot F\,dV=\iint_{\partial V}F\cdot n\,dS$, with outward unit normal $n$. Net outward flux is the total local divergence. If the field has a singularity inside the volume, the smoothness premise fails. Remove the singularity, include the resulting inner boundary with its outward normal for the remaining region, and take a justified limit.</p>
    <p>Stokes' theorem states $\iint_S(\nabla\times F)\cdot n\,dS=\oint_{\partial S}F\cdot dr$ for a suitably smooth oriented surface and field. The right-hand rule relates the chosen normal and boundary direction. Reversing the normal requires reversing the compatible path orientation, changing both signs.</p>
    <p><strong>Transfer:</strong> divergence relates a conservation law inside a region to transport across its boundary. Curl connects local rotation to a closed-loop integral, appearing in fluid flow and electromagnetism. Before choosing a theorem, sketch the domain, mark its orientation, examine smoothness and singularities, and check whether local derivative and global integral have compatible units.</p>`,
  examples: [
    {
      title: 'Flux through a unit sphere',
      problem: String.raw`Find the outward flux of $F=(x,y,z)$ through the unit sphere.`,
      steps: [
        { title: 'Compute local divergence', content: String.raw`$\nabla\!\cdot F=1+1+1=3$. The field is smooth throughout the ball.`, why: 'This permits the divergence theorem.' },
        { title: 'Integrate over the volume', content: String.raw`The unit ball has volume $4\pi/3$, so the outward flux is $3(4\pi/3)=4\pi$. Directly, $F=n$ on the sphere, so the surface flux is also its area, $4\pi$.`, why: 'The second method checks both the magnitude and orientation.' }
      ]
    },
    {
      title: 'Circulation around a disk',
      problem: String.raw`For $F=(-y/2,x/2,0)$, find circulation around the unit circle counterclockwise when viewed from above.`,
      steps: [
        { title: 'Pair the normal and direction', content: String.raw`The compatible normal is upward. The $z$ component of curl is $\partial F_y/\partial x-\partial F_x/\partial y=1$.`, why: 'The right-hand rule pairs upward normal with counterclockwise traversal.' },
        { title: 'Integrate and vary', content: String.raw`The circulation is $\iint_{\mathrm{disk}}1\,dA=\pi$. Traversing the same circle clockwise gives $-\pi$.`, why: 'Reversing the path changes the sign of the line integral.' }
      ]
    }
  ],
  exercises: [{
    difficulty: 'medium', question: 'What happens to an oriented line integral when the same path is traversed in the opposite direction?',
    options: ['It doubles', 'It changes sign', 'It must be zero', 'It stays unchanged'], correctIndex: 1,
    hint: '<p>Consider what happens to the displacement element along the path.</p>',
    correctExplanation: 'Reversal changes the sign of the directed displacement element, so the line integral changes sign.',
    wrongExplanations: { 0: 'The same path is traversed once, so there is no factor of two.', 2: 'Reversal does not require the original integral to vanish.', 3: 'The tangent direction changes sign.' }
  }],
  freeResponse: [{
    difficulty: 'easy', question: String.raw`What is $\nabla\!\cdot(x,y,z)$?`, accept: [3], placeholder: 'Enter a number',
    hint: '<p>Add the three matching coordinate derivatives.</p>',
    explanation: String.raw`$\partial x/\partial x+\partial y/\partial y+\partial z/\partial z=3$.`
  }]
},
{
  id: 'tensor-basics',
  title: 'Vectors, Covectors, and Tensors',
  description: 'Separate a geometric object from its coordinate components and understand what contraction measures.',
  foundationRefs: [
    { moduleId: 'calculus-3', topicId: 'vectors', note: 'Vector components and linear combinations depend on a chosen basis.' },
    { moduleId: 'calculus-3', topicId: 'partial-derivatives', note: 'The differential uses partial derivatives to approximate changes of a scalar field.' }
  ],
  concept: String.raw`
    <p>A vector is a geometric object whose components depend on the basis. A <strong>covector</strong> is a linear map taking vectors to scalars. The differential $df$ of a differentiable scalar field is a covector: applied to a small displacement, it gives the linear approximation to the change in the field.</p>
    <p>A covariant rank-two tensor is a bilinear map taking two vectors to a scalar. Its entries in a basis are $T_{ij}=T(e_i,e_j)$; bilinearity gives $T(v,w)=\sum_{i,j}T_{ij}v^i w^j$. In Einstein notation a repeated upper and lower index is summed. Components represent a tensor only when they obey the appropriate transformation law under a change of basis.</p>
    <p>For a real basis change whose new basis vectors are the columns of $e'=eP$, with invertible $P$, a vector's component column becomes $v'=P^{-1}v$. A covector component row becomes $\alpha'=\alpha P$, and a covariant bilinear form becomes $T'=P^TTP$. The scalar evaluations are unchanged: $\alpha'v'=\alpha v$ and $(v')^TT'w'=v^TTw$. This statement concerns a passive basis change; the geometric objects themselves have not changed.</p>
    <p>In an orthonormal Euclidean basis the metric matrix is the identity, so a vector and its associated covector have the same numerical component list. That coincidence does not make them the same kind of object. In non-orthonormal or curvilinear coordinates, the metric relates the components and the coordinate basis may vary by position.</p>
    <p>A plain partial derivative of vector components generally does not transform as a tensor under a nonlinear coordinate change. A covariant derivative adds the needed basis-change terms. Stress, strain, and inertia use tensor descriptions because their responses depend on direction. Relativity uses a spacetime metric with a declared signature; carry one consistent convention through each calculation.</p>`,
  examples: [
    {
      title: 'A covector measures a directional change',
      problem: String.raw`For $f(x,y)=x^2+3y$, apply $df$ at $(2,1)$ to the displacement $(0.1,-0.2)$.`,
      steps: [
        { title: 'Find the differential', content: String.raw`$df=2x\,dx+3\,dy$, so at $(2,1)$, $df=4\,dx+3\,dy$.`, why: 'Evaluate the coefficients at the starting point.' },
        { title: 'Apply and check the approximation', content: String.raw`$df(0.1,-0.2)=4(0.1)+3(-0.2)=-0.2$. The exact change is $f(2.1,0.8)-f(2,1)=6.81-7=-0.19$, so the linearization differs by $0.01$.`, why: 'The differential is a first-order approximation, not an exact finite change.' }
      ]
    },
    {
      title: 'Evaluate a bilinear form',
      problem: String.raw`In an orthonormal basis let $T=\begin{pmatrix}2&0\\0&3\end{pmatrix}$, $v=(1,2)$ and $w=(2,1)$. Find $T(v,w)$.`,
      steps: [
        { title: 'Apply the matrix', content: String.raw`$Tw=(4,3)^T$.`, why: 'The matrix represents the bilinear form in this basis.' },
        { title: 'Contract both inputs', content: String.raw`$v^TTw=1(4)+2(3)=10$.`, why: 'Both vector components and tensor components must transform together.' },
        { title: 'Change the basis and check', content: String.raw`Choose $P=\operatorname{diag}(2,1)$. Then $v'=P^{-1}v=(1/2,2)$, $w'=(1,1)$, and $T'=P^TTP=\operatorname{diag}(8,3)$. The transformed contraction is $(v')^TT'w'=4+6=10$, the same scalar.`, why: 'Component values change with the basis; the bilinear evaluation does not.' }
      ]
    }
  ],
  exercises: [{
    difficulty: 'medium', question: 'What does a covector do to a vector?',
    options: ['Returns a scalar linearly', 'Always rotates it by 90 degrees', 'Always returns a vector', 'Returns its magnitude regardless of direction'], correctIndex: 0,
    hint: '<p>Recall the definition as a linear map.</p>', correctExplanation: 'A covector is a linear map from a vector space to its scalar field.',
    wrongExplanations: { 1: 'Rotation is a particular vector-to-vector map.', 2: 'A covector returns a scalar.', 3: 'Magnitude is not a linear function of a vector.' }
  }],
  freeResponse: [{
    difficulty: 'easy', question: String.raw`At $(2,1)$ evaluate $df=4\,dx+3\,dy$ on displacement $(1,1)$.`,
    accept: [7], placeholder: 'Enter a number', hint: '<p>Multiply each coefficient by its displacement component and add.</p>',
    explanation: String.raw`$df(1,1)=4+3=7$.`
  }]
},
{
  id: 'differential-equations',
  title: 'Differential Equations and Normal Modes',
  description: 'Turn a law of motion into an equation, solve it, and use initial conditions to select a trajectory.',
  foundationRefs: [
    { moduleId: 'calculus2', topicId: 'first-order-differential-equations', note: 'Derivatives, differential equations, and initial conditions.' },
    { moduleId: 'precalculus', topicId: 'systems-matrices', note: 'Matrices represent coupled systems of linear equations.' }
  ],
  concept: String.raw`
    <p>A differential equation relates an unknown function to its rates of change. For a mass attached to an ideal spring, $m\ddot x+kx=0$ expresses force balance near the chosen equilibrium, with constants $m,k>0$. The mass and spring constant determine the angular frequency $\omega=\sqrt{k/m}$. Because $k/m$ has units $\mathrm{s}^{-2}$, $\omega$ has units $\mathrm{s}^{-1}$.</p>
    <p>The family $x(t)=A\cos(\omega t)+B\sin(\omega t)$ contains two independent constants. The initial position fixes $A$ and the initial velocity fixes $\omega B$. Check both conditions and substitute the candidate back into the equation. An initial-value problem specifies data at one time; a boundary-value problem specifies data at different locations or times and can have different existence and uniqueness properties.</p>
    <p>A second-order equation can be written as a first-order system by setting $v=\dot x$. For several coupled coordinates, diagonalizing a suitable symmetric matrix can separate motion into normal modes. A mode is a pattern of relative motion, not necessarily a motion of just one coordinate. For $M\ddot{\mathbf x}+K\mathbf x=0$ with constant matrices, a mode satisfies $Kv=\omega^2 Mv$; one cannot generally replace this with $Kv=\omega^2v$ unless the mass matrix is the identity in the chosen variables. For a general nonsymmetric or defective matrix, an eigenvector basis may not exist; check rather than assume diagonalizability.</p>
    <p>Superposition holds for homogeneous linear equations. For a forced linear equation, add one particular solution to the homogeneous family. At resonance the usual sinusoidal trial overlaps a homogeneous solution; multiply the trial by time and check it directly. Damping or nonlinear forces change the model and may change its mode structure.</p>`,
  examples: [
    {
      title: 'Fix both constants in an oscillator',
      problem: String.raw`Solve $\ddot x+4x=0$ with $x(0)=3$ and $\dot x(0)=2$.`,
      steps: [
        { title: 'Choose the solution family', content: String.raw`Here $\omega=2$, so $x=A\cos(2t)+B\sin(2t)$.` },
        { title: 'Use the two initial values', content: String.raw`The position gives $A=3$. Since $\dot x=-2A\sin(2t)+2B\cos(2t)$, the velocity gives $2B=2$, so $B=1$.` },
        { title: 'Verify', content: String.raw`$x=3\cos(2t)+\sin(2t)$ satisfies both data and $\ddot x=-4x$.` }
      ]
    },
    {
      title: 'Two coupled coordinates',
      problem: String.raw`Solve $\ddot{\mathbf x}+A\mathbf x=0$ by modes for $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, with dimensionless units.`,
      steps: [
        { title: 'Find the eigendirections', content: String.raw`$A(1,1)^T=3(1,1)^T$ and $A(1,-1)^T=(1,-1)^T$. The independent eigenvectors form a basis.` },
        { title: 'Evolve each mode', content: String.raw`Writing $\mathbf x=q_+(1,1)^T+q_-(1,-1)^T$ gives $\ddot q_++3q_+=0$ and $\ddot q_-+q_-=0$. The angular frequencies are $\sqrt3$ and $1$.` },
        { title: 'Use the initial data', content: String.raw`Initial position and velocity determine each mode's two coefficients. The in-phase and opposite-phase patterns are relative-coordinate statements.` }
      ]
    }
  ],
  exercises: [
    {
      difficulty: 'medium',
      question: String.raw`For $\ddot x+9x=0$, what is the positive angular frequency?`,
      options: ['$1$', '$3$', '$9$', '$81$'], correctIndex: 1,
      hint: '<p>Match the coefficient to the square of angular frequency.</p>',
      correctExplanation: String.raw`$\omega^2=9$, so $\omega=3$.`,
      wrongExplanations: {
        0: String.raw`The coefficient of $x$ would be $1$.`,
        2: String.raw`$9$ is $\omega^2$, not $\omega$.`,
        3: String.raw`Squaring the coefficient moves in the wrong direction.`
      }
    }
  ],
  freeResponse: [{
    difficulty: 'medium', question: String.raw`For $\ddot x+4x=0$, what is $\omega$?`,
    accept: [2], placeholder: 'Enter angular frequency',
    hint: '<p>Compare with the standard oscillator equation.</p>',
    explanation: String.raw`$\omega^2=4$ and the positive frequency is $2$.`
  }]
},
{
  id: 'fourier-analysis',
  title: 'Fourier Analysis: Decomposing a Signal into Modes',
  description: 'Use orthogonality, parity, and boundary conditions to represent functions by sinusoidal modes.',
  foundationRefs: [
    { moduleId: 'trigonometry', topicId: 'trig-graphs-inverse', note: 'Sinusoidal graphs, periods, and angle units.' },
    { moduleId: 'calculus-2', topicId: 'integration-fundamentals', note: 'Definite integration and interpretation of accumulated quantities.' }
  ],
  concept: String.raw`
    <p>A Fourier series represents a periodic signal using sines and cosines at integer multiples of a base frequency. On $[-\pi,\pi]$, the convention $f(x)\sim a_0/2+\sum_{n=1}^{\infty}(a_n\cos nx+b_n\sin nx)$ uses $a_n=\pi^{-1}\int_{-\pi}^{\pi}f(x)\cos(nx)\,dx$ and $b_n=\pi^{-1}\int_{-\pi}^{\pi}f(x)\sin(nx)\,dx$.</p>
    <p>These integrals are projections. Distinct integer-frequency sines and cosines are orthogonal over the interval, so integrating against one basis function isolates its coefficient. A different interval or normalization changes the formulas. If $f$ is even, its sine coefficients vanish; if $f$ is odd, its cosine coefficients vanish, including $a_0$.</p>
    <p>A continuous function and its series need not agree pointwise without suitable hypotheses. For a piecewise smooth periodic function, the series converges at a jump to the average of its left and right limits. Mean-square convergence is a different statement from convergence at every point. Differentiating a series term by term requires further conditions.</p>
    <p>The Fourier transform replaces discrete periodic modes with a continuous frequency variable for functions on the line. With the convention $\widehat f(k)=\int_{-\infty}^{\infty}f(x)e^{-ikx}\,dx$, the inverse includes a factor $1/(2\pi)$ when the relevant inversion conditions hold. Other conventions distribute the factors differently. Fourier modes separate many linear equations with compatible boundaries. Nonlinear terms, variable coefficients, or changed boundary conditions can couple modes or require another basis.</p>`,
  examples: [
    {
      title: 'Find the coefficient of a pure mode',
      problem: String.raw`For $f(x)=3\cos(2x)$ on $[-\pi,\pi]$, find $a_2$.`,
      steps: [
        { title: 'Project onto the mode', content: String.raw`$a_2=(3/\pi)\int_{-\pi}^{\pi}\cos^2(2x)\,dx$.` },
        { title: 'Evaluate and check', content: String.raw`The integral is $\pi$, so $a_2=3$. Orthogonality makes the other sine and cosine coefficients zero.` }
      ]
    },
    {
      title: 'Use parity before calculating',
      problem: String.raw`For the periodic extension of $f(x)=x$ on $[-\pi,\pi]$, determine its cosine coefficients and its value assigned by the series at $x=\pi$.`,
      steps: [
        { title: 'Use symmetry', content: String.raw`$x$ is odd and $\cos(nx)$ is even. Their product is odd, so every cosine coefficient, including the constant term, is zero.` },
        { title: 'Inspect the jump', content: String.raw`The left limit at $\pi$ is $\pi$ and the right limit of the periodic extension is $-\pi$. The series converges there to their mean, $0$.` },
        { title: 'Transfer the insight', content: String.raw`A plot of partial sums can oscillate near a jump. The endpoint convention and the limiting function must be stated when comparing values.` }
      ]
    },
    {
      title: 'Transform a localized profile',
      problem: String.raw`Find $\widehat f(k)$ for $f(x)=e^{-a|x|}$ with $a>0$ using $\widehat f(k)=\int_{-\infty}^{\infty}f(x)e^{-ikx}\,dx$.`,
      steps: [
        { title: 'Use the even symmetry', content: String.raw`The odd sine contribution cancels. Thus $\widehat f(k)=2\int_0^\infty e^{-ax}\cos(kx)\,dx$.` },
        { title: 'Evaluate and check', content: String.raw`The integral is the real part of $\int_0^\infty e^{-(a+ik)x}\,dx=1/(a+ik)$, giving $\widehat f(k)=2a/(a^2+k^2)$. At $k=0$ this equals $2/a$, the area under the original profile.` },
        { title: 'Transfer with units', content: String.raw`If $x$ is a length, then $a$ and $k$ have units of inverse length, while the transform has the original amplitude times length. A wider profile corresponds to smaller $a$ and a narrower frequency response.` }
      ]
    }
  ],
  exercises: [{
    difficulty: 'medium',
    question: String.raw`In the stated convention on $[-\pi,\pi]$, which coefficient is nonzero for $f(x)=\sin(2x)$?`,
    options: [String.raw`$a_0$`, String.raw`$a_2$`, String.raw`$b_1$`, String.raw`$b_2$`],
    correctIndex: 3,
    hint: '<p>Compare the function to the basis functions in the series.</p>',
    correctExplanation: String.raw`The signal is exactly the second sine mode, so $b_2=1$.`,
    wrongExplanations: {
      0: 'The function has mean zero over the interval.',
      1: 'A sine mode is orthogonal to cosine modes.',
      2: 'Distinct integer sine modes are orthogonal.'
    }
  }],
  freeResponse: [{
    difficulty: 'medium', question: String.raw`For $f(x)=3\cos(2x)$ on $[-\pi,\pi]$, what is $a_2$?`,
    accept: [3], placeholder: 'Enter a coefficient',
    hint: '<p>Project onto cos(2x), or recognize the pure mode.</p>',
    explanation: String.raw`The coefficient of $\cos(2x)$ is $3$ in this convention.`
  }]
},
{
  id: 'pde-green-functions',
  title: 'Boundary Values, PDE Modes, and Green Functions',
  description: 'Understand why the domain, initial profile, and boundary conditions are part of a field problem.',
  foundationRefs: [
    { moduleId: 'calculus-3', topicId: 'partial-derivatives', note: 'Partial derivatives describe changes in fields.' },
    { moduleId: 'calculus-2', topicId: 'integration-fundamentals', note: 'Integration connects sources to accumulated effects.' }
  ],
  concept: String.raw`
    <p>A partial differential equation relates a field to derivatives in multiple variables. For an ideal homogeneous rod with constant diffusivity $\kappa>0$, the heat equation $u_t=\kappa u_{xx}$ describes diffusion under the model's assumptions. The diffusivity has units of length squared per time.</p>
    <p>On $0<x<L$ with fixed zero endpoint values, the spatial eigenmodes are $\sin(n\pi x/L)$ for positive integers $n$. A mode decays by the factor $\exp[-\kappa(n\pi/L)^2t]$. The PDE and boundary conditions do not determine the solution until an initial profile is supplied. Insulated ends require different boundary conditions and admit different modes.</p>
    <p>A Green function is the response to a unit point source for a specified linear operator and its boundary conditions. If the inverse exists, superposing these responses against a source gives a solution. An operator with a nontrivial nullspace can require a compatibility condition and a normalization before it has a unique inverse.</p>
    <p>The Dirac delta is a distribution defined by its effect under integration against a test function. It is not an ordinary finite-height spike. For $-G_{xx}=\delta(x-\xi)$, integrating across the source gives $G_x(\xi^-)-G_x(\xi^+)=1$. Reversing the sign of the operator changes the jump. Always check the source position, boundary values, and sign convention.</p>`,
  examples: [
    {
      title: 'Evolve a heat mode',
      problem: String.raw`Solve $u_t=u_{xx}$ on $0<x<\pi$ with zero endpoints and initial profile $u(x,0)=2\sin(2x)$.`,
      steps: [
        { title: 'Separate the mode', content: String.raw`The second spatial derivative is $(\sin 2x)''=-4\sin 2x$, so the time factor satisfies $T'=-4T$ and equals $e^{-4t}$ when normalized at $t=0$.` },
        { title: 'Verify all conditions', content: String.raw`$u=2e^{-4t}\sin(2x)$ satisfies $u_t=u_{xx}$, vanishes at both endpoints, and matches the initial profile.` }
      ]
    },
    {
      title: 'A Green function on a finite interval',
      problem: String.raw`For $-u''=f$ on $0<x<1$ with $u(0)=u(1)=0$, find $G(x,\xi)$ for a source at $0<\xi<1$.`,
      steps: [
        { title: 'Solve away from the source', content: String.raw`For $x\ne\xi$, $G''=0$. The endpoints give $G=Ax$ for $x<\xi$ and $G=B(1-x)$ for $x>\xi$.` },
        { title: 'Match at the source', content: String.raw`Continuity gives $A\xi=B(1-\xi)$. The derivative jump gives $A+B=1$. Hence $A=1-\xi$ and $B=\xi$.` },
        { title: 'State and check the kernel', content: String.raw`$G=x(1-\xi)$ for $x\le\xi$ and $G=\xi(1-x)$ for $x\ge\xi$. It vanishes at both boundaries and is symmetric in $x,\xi$. For suitable $f$, $u(x)=\int_0^1G(x,\xi)f(\xi)\,d\xi$.` }
      ]
    }
  ],
  exercises: [{
    difficulty: 'medium',
    question: String.raw`For $u_t=u_{xx}$ with zero endpoints on $0<x<\pi$, which time factor belongs to the mode $\sin(3x)$?`,
    options: [String.raw`$e^{-3t}$`, String.raw`$e^{-9t}$`, String.raw`$e^{3t}$`, String.raw`$e^{9t}$`],
    correctIndex: 1,
    hint: '<p>Differentiate the spatial mode twice.</p>',
    correctExplanation: String.raw`$(\sin 3x)''=-9\sin 3x$, so $T'=-9T$ and the factor is $e^{-9t}$.`,
    wrongExplanations: {
      0: 'The second spatial derivative contributes 9, not 3.',
      2: 'This grows rather than decaying and has the wrong rate.',
      3: 'Diffusion damps this mode rather than amplifying it.'
    }
  }],
  freeResponse: [{
    difficulty: 'medium',
    question: String.raw`For $u_t=u_{xx}$, what is the positive number $c$ in the decay factor $e^{-ct}$ for the mode $\sin(2x)$?`,
    accept: [4], placeholder: 'Enter the decay rate',
    hint: '<p>Apply the second spatial derivative to the mode.</p>',
    explanation: String.raw`The second derivative is $-4\sin(2x)$, so $c=4$.`
  }]
},
{
  id: 'variational-calculus',
  title: 'Variational Calculus: Paths, Constraints, and Boundaries',
  description: 'Derive an equation for an unknown function by varying a whole path, then test the result against its boundary conditions.',
  foundationRefs: [
    { moduleId: 'calculus-2', topicId: 'integration-fundamentals', note: 'A functional accumulates a quantity along an interval.' },
    { moduleId: 'calculus-3', topicId: 'partial-derivatives', note: 'The Lagrangian is differentiated with respect to its separate arguments.' },
    { moduleId: 'calculus2', topicId: 'first-order-differential-equations', note: 'After deriving an equation, solve it and apply the given conditions.' }
  ],
  hook: String.raw`<p>A runner travels from one position to another in a fixed time. The position at every intermediate time is part of the unknown path. An action assigns a number to each allowed path; finding a stationary action means comparing an entire path with nearby paths, not setting an ordinary single-variable derivative to zero.</p>`,
  concept: String.raw`
    <p>A <strong>functional</strong> takes a function as input and returns a number. For an admissible path $y$ on $[a,b]$, write
    $J[y]=\int_a^b L(x,y(x),y'(x))\,dx$.
    The choice of $L$ states what is being accumulated; the domain and admissible paths state which comparisons are allowed. A functional is not an ordinary function of a single number, even though its value is a number.</p>
    <p>Choose a sufficiently smooth test function $\eta$ and compare the path $y_\epsilon=y+\epsilon\eta$. The first variation is
    $\delta J[y;\eta]=\left.\frac{d}{d\epsilon}J[y+\epsilon\eta]\right|_{\epsilon=0}$.
    If a sufficiently smooth path is stationary and both endpoint values are fixed, this derivative must vanish for every allowed $\eta$ with $\eta(a)=\eta(b)=0$.</p>
    <p>Differentiating under the integral and integrating by parts gives
    $\delta J=[L_{y'}\eta]_a^b+\int_a^b\left(L_y-\frac{d}{dx}L_{y'}\right)\eta\,dx$.
    Here $L_y$ and $L_{y'}$ are partial derivatives of $L(x,y,p)$ with respect to its second and third arguments, evaluated at $p=y'$. For fixed endpoint values, the boundary term vanishes. Independent interior variations then give the <strong>Euler–Lagrange equation</strong> $L_y-\frac{d}{dx}L_{y'}=0$.</p>
    <p>If $y(b)$ is free, $b$ itself is fixed, and there is no separate endpoint cost, then $\eta(b)$ need not vanish. Stationarity also requires the <strong>natural boundary condition</strong> $L_{y'}(b)=0$. Different endpoint constraints, a moving endpoint, or an endpoint cost require their own boundary terms. Never impose a zero variation where the value is not fixed.</p>
    <p>The Euler–Lagrange equation supplies <em>candidates</em>. A stationary path can be a minimum, maximum, or neither. A direct comparison, second variation, or a suitable convexity argument can establish a minimum under the stated admissible class. For example, the same fixed-endpoint line that minimizes $\int(y')^2dx$ maximizes $\int-(y')^2dx$.</p>
    <p>For a path constrained by another integral, incorporate the constraint before varying, often with a multiplier. In mechanics the functional is usually action $S[q]=\int_{t_0}^{t_1}(T-V)\,dt$. Its stationary paths obey equations of motion, but stationarity alone does not assert that action is minimized. In optics and field theory the unknown path or field, boundary data, and functional differ; the reasoning pattern remains the same.</p>`,
  abstraction: String.raw`<p>To transfer this method, identify the object being varied, the quantity assigned to it, the admissible variations, and which boundary values are prescribed. Derive both interior and boundary conditions. Finally, solve those conditions and independently check any minimum claim.</p>`,
  examples: [
    {
      title: 'The least-slope path and a proof of its minimum',
      problem: String.raw`Minimize $J[y]=\int_0^1(y')^2dx$ among continuously differentiable paths satisfying $y(0)=0$ and $y(1)=1$.`,
      steps: [
        { title: 'Choose allowed variations', content: String.raw`Write $y_\epsilon=y+\epsilon\eta$ with $\eta(0)=\eta(1)=0$, because both endpoint values must remain fixed.`, why: 'The endpoint restrictions determine which boundary terms vanish.' },
        { title: 'Derive the candidate', content: String.raw`$L_y=0$ and $L_{y'}=2y'$, so Euler–Lagrange gives $y''=0$. The candidate is $y=A+Bx$; the endpoints give $y=x$.`, why: 'The differential equation describes the interior; the endpoints select a path.' },
        { title: 'Prove the comparison', content: String.raw`Write any admissible path as $y=x+\eta$ with $\eta(0)=\eta(1)=0$. Then $J[y]=\int_0^1(1+\eta')^2dx=1+2[\eta]_0^1+\int_0^1(\eta')^2dx=1+\int_0^1(\eta')^2dx\ge1$. Equality in this smooth class forces $\eta=0$.`, why: 'The nonnegative remainder proves the unique minimum in this class.' },
        { title: 'Transfer', content: String.raw`If the final value is changed to $2$, the candidate becomes $y=2x$ and the same comparison gives a minimum value of $4$. Changing an endpoint changes the selected line and its value.` }
      ]
    },
    {
      title: 'A free endpoint creates a natural boundary condition',
      problem: String.raw`Find the minimum of $J[y]=\int_0^1(y'-1)^2dx$ when $y(0)=0$, $y(1)$ is free, and both the endpoint location and the integrand are fixed.`,
      steps: [
        { title: 'Derive the interior equation', content: String.raw`$L_y=0$ and $L_{y'}=2(y'-1)$, so $y''=0$. The path is a line, $y=A+Bx$.`, why: 'A free value at the endpoint does not remove the interior Euler–Lagrange equation.' },
        { title: 'Apply the free-endpoint condition', content: String.raw`The fixed initial value gives $A=0$. Because $y(1)$ is free, $L_{y'}(1)=2(y'(1)-1)=0$, so $B=1$ and $y=x$.`, why: 'The boundary term must vanish for arbitrary endpoint variation.' },
        { title: 'Verify and contrast', content: String.raw`For $y=x$, $J=0$, the least possible value because the integrand is nonnegative. If instead $y(1)=2$ were prescribed, the free-endpoint condition would not apply and the minimizing line would be $y=2x$.` }
      ]
    },
    {
      title: 'Action for a particle under a constant force',
      problem: String.raw`A one-dimensional particle has constant mass $m=2$ kg and potential $V(x)=-6x$ joules, with $x$ in meters. For paths with fixed endpoint positions at times $0$ and $1$ seconds, derive the equation of motion from $L=\tfrac12m\dot x^2-V(x)$.`,
      steps: [
        { title: 'Form the action density', content: String.raw`$L=\tfrac12(2)\dot x^2+6x=\dot x^2+6x$. This model treats the force as constant and uses fixed endpoint positions.`, why: 'The force and sign convention must be specified before the variation.' },
        { title: 'Differentiate the arguments', content: String.raw`$L_x=6$ and $L_{\dot x}=2\dot x$, so $L_x-\frac{d}{dt}L_{\dot x}=6-2\ddot x=0$. Thus $\ddot x=3$.`, why: 'Treat position and velocity as separate arguments of L when taking partial derivatives.' },
        { title: 'Check the physical law', content: String.raw`$F=-dV/dx=6$ N, and Newton's law gives $m\ddot x=(2\,\text{kg})(3\,\text{m/s}^2)=6$ N. Endpoint positions determine the two constants when the equation is solved; the result is a stationary action, not automatically a minimum.` }
      ]
    },
    {
      title: 'Keep an integral constraint in the problem',
      problem: String.raw`Find the stationary path for $J[y]=\int_0^1(y')^2dx$, subject to $y(0)=y(1)=0$ and $\int_0^1y\,dx=1/6$.`,
      steps: [
        { title: 'Introduce a multiplier', content: String.raw`For a constant multiplier $\lambda$, use $\widetilde L=(y')^2+\lambda y$. The constraint changes the equation to $\lambda-2y''=0$.`, why: String.raw`The constant term $-\lambda/6$ in the constrained objective has zero variation.` },
        { title: 'Apply all conditions', content: String.raw`With constant $y''$, the endpoint conditions give a path proportional to $x(1-x)$. Since $\int_0^1x(1-x)\,dx=1/6$, the constraint selects $y=x(1-x)$ and $\lambda=-4$.` },
        { title: 'Check the objective and minimum', content: String.raw`$J[y]=\int_0^1(1-2x)^2dx=1/3$. For another admissible path $y+\eta$, both $\eta(0)=\eta(1)=0$ and $\int_0^1\eta dx=0$. Integration by parts makes the cross term vanish, leaving $J[y+\eta]=J[y]+\int_0^1(\eta')^2dx\ge J[y]$.`, why: 'The constraint restricts variations as well as candidate paths.' }
      ]
    }
  ],
  exercises: [
    {
      difficulty: 'medium',
      question: 'The initial position is fixed, the endpoint location is fixed, and the final position is free. There is no endpoint cost. What additional condition is required for a stationary path?',
      options: [String.raw`$L_{y'}(b)=0$`, String.raw`$y(b)=0$`, String.raw`$\eta(b)=0$`, String.raw`$L_y(b)=1$`],
      correctIndex: 0,
      hint: '<p>Inspect the boundary term after integration by parts and ask which endpoint variation is arbitrary.</p>',
      correctExplanation: String.raw`Since $\eta(b)$ can vary freely, $L_{y'}(b)\eta(b)$ must vanish for every choice of $\eta(b)$. Thus $L_{y'}(b)=0$ under the stated conditions.`,
      wrongExplanations: {
        1: 'A free final value is not prescribed to be zero.',
        2: 'Setting this variation to zero would incorrectly impose a fixed final value.',
        3: 'This is not the natural boundary condition obtained from the boundary term.'
      }
    },
    {
      difficulty: 'medium',
      question: 'What follows solely from a vanishing first variation for all admissible variations?',
      options: ['The path is stationary.', 'The path must be a strict minimum.', 'The path must be a strict maximum.', 'There is no need to check endpoint conditions.'],
      correctIndex: 0,
      hint: '<p>Compare the functional with its negative: the first derivative can vanish in both cases.</p>',
      correctExplanation: 'A vanishing first variation establishes stationarity. A minimum or maximum requires a further argument.',
      wrongExplanations: {
        1: 'A stationary point can be a maximum or neither.',
        2: 'A stationary point can be a minimum or neither.',
        3: 'The permitted endpoint variations determine the boundary conditions.'
      }
    }
  ],
  freeResponse: [
    {
      difficulty: 'easy',
      question: String.raw`For $y(x)=2x$ on $[0,1]$, calculate $J[y]=\int_0^1(y')^2dx$.`,
      accept: [4], placeholder: 'Enter the value of the integral',
      hint: '<p>Differentiate the path and integrate the resulting constant.</p>',
      explanation: String.raw`$y'=2$, so $J[y]=\int_0^1 4\,dx=4$.`
    },
    {
      difficulty: 'medium',
      question: String.raw`A particle has mass $m=2$ kg and potential $V(x)=-6x$ joules, with $x$ in meters. What is its acceleration in meters per second squared in the model $L=\tfrac12m\dot x^2-V$?`,
      accept: [3], placeholder: 'Enter the acceleration in m/s²',
      hint: '<p>Find the force from the potential and divide by the mass.</p>',
      explanation: String.raw`$F=-V'(x)=6$ N. Newton's law or the Euler–Lagrange equation gives $\ddot x=6/2=3\,\text{m/s}^2$.`
    }
  ]
}
    ]
  });
})();
