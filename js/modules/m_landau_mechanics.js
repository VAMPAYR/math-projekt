/* Original classical mechanics lessons: model assumptions and transferable reasoning. */
(function () {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];
  const R = String.raw;
  const ref = (moduleId, topicId, note) => ({ moduleId, topicId, note });
  const worked = (title, problem, steps) => ({
    title, problem, steps: steps.map(([title, content, why]) => ({ title, content, why }))
  });
  const mc = (question, options, correctIndex, hint, correctExplanation, wrongExplanations) =>
    ({ difficulty: 'medium', question, options, correctIndex, hint, correctExplanation, wrongExplanations });
  const fr = (question, answer, hint, explanation) =>
    ({ difficulty: 'medium', question, accept: [answer], placeholder: 'Enter a number', hint, explanation, solution: explanation });

  window.MATH_MODULES.push({
    id: 'landau-mechanics',
    order: 22,
    title: 'Theoretical Mechanics',
    description: 'Build mechanical models from forces, conservation laws, symmetry, action and Hamiltonian dynamics.',
    topics: [
      {
        id: 'mechanics-models-newton',
        title: 'Models, Motion, and Newton’s Laws',
        description: 'Choose a system, frame, coordinates and force model before solving.',
        foundationRefs: [
          ref('calculus-1', 'derivatives', 'Velocity and acceleration are time derivatives of position.'),
          ref('calculus-3', 'vectors', 'Forces and accelerations are vectors with components.')
        ],
        whyExists: { html: R`<p>A model tells you which objects matter and which interactions may be neglected. The same modeling decisions appear in orbital navigation, robotics, biomechanics, and numerical optimization.</p>` },
        concept: { html: R`
          <p>In an inertial frame, position $\mathbf r(t)$ describes location, velocity $\mathbf v=d\mathbf r/dt$ describes its instantaneous change, and acceleration $\mathbf a=d\mathbf v/dt$ describes change in velocity. The velocity can be zero while acceleration is nonzero, as at the top of a vertical trajectory.</p>
          <p>For a system with constant mass $m$, Newton's law reads $\sum\mathbf F=m\mathbf a$. Draw the forces acting <em>on the chosen object</em>; equal and opposite interaction forces act on different objects. For variable-mass systems, use a momentum balance that includes material crossing the system boundary rather than substituting a changing $m$ into this formula.</p>
          <p>Coordinates are bookkeeping, not physics. Resolve forces into components, state the positive directions, then write one equation per independent coordinate. A model with uniform gravitational field and no drag is an approximation; check whether its assumptions are justified.</p>` },
        abstraction: { html: R`<p>The equation of motion is a differential equation. Specifying position and velocity at one instant selects a solution when the required existence and uniqueness conditions hold. The derivative carries units: position in meters, velocity in meters per second, and acceleration in meters per second squared.</p><p><strong>What division and a derivative mean here.</strong> Over a nonzero time interval, $\Delta x/\Delta t$ compares the signed change in position with elapsed time: it is an average rate, measured in meters per second. The instantaneous velocity is the <em>limit</em> of those ratios as the interval shrinks; it is not obtained by dividing by a zero time interval. Replacing position by velocity in the same construction gives acceleration, with units of meters per second per second. The pattern transfers to a changing tank volume or account balance, but the quantities, signs, and units must be interpreted in their own setting.</p><details><summary>Try a change of interval</summary><p>For $x(t)=(1\,\mathrm{m/s^2})t^2$, find the average velocity from $2$ to $4\,\mathrm s$ and the instantaneous velocity at $4\,\mathrm s$ before opening the check.</p><details><summary>Check the reasoning</summary><p>The average is $(16-4)/(4-2)=6\,\mathrm{m/s}$. Differentiation gives $v(t)=(2\,\mathrm{m/s^2})t$, so the final instantaneous velocity is $8\,\mathrm{m/s}$. The two answers describe different quantities.</p></details></details>` },
        stuckGuide: { html: R`<ol><li>Define the system and inertial frame.</li><li>Sketch forces and select axes.</li><li>Apply the vector law component by component.</li><li>Use initial conditions and check dimensions, signs, and limiting cases.</li></ol>` },
        examples: [
          worked('A mass pulled across a smooth surface', R`A $2\,\mathrm{kg}$ block starts from rest under a constant horizontal force of $6\,\mathrm N$ for $3\,\mathrm s$. Neglect friction. Find acceleration and displacement.`, [
            ['Model', R`The horizontal net force is $6\,\mathrm N$. The vertical normal force balances weight; neither changes horizontal motion.`, 'Separate independent components.'],
            ['Solve', R`$a=F/m=3\,\mathrm{m/s^2}$. With $v_0=0$, $x-x_0=\tfrac12 at^2=13.5\,\mathrm m$.`, 'The kinematic formula requires constant acceleration.'],
            ['Check', R`A larger mass under the same force would accelerate less; $\mathrm N/\mathrm{kg}=\mathrm{m/s^2}$.`, 'Units and limiting behavior test the model.']
          ]),
          worked('The same motion in a new frame', R`A cart moves at $5\,\mathrm{m/s}$ relative to the ground and a passenger walks at $2\,\mathrm{m/s}$ forward relative to the cart. Find ground velocity.`, [
            ['Add velocities', R`In nonrelativistic mechanics, $\mathbf v_{\rm passenger,ground}=\mathbf v_{\rm passenger,cart}+\mathbf v_{\rm cart,ground}=7\,\mathrm{m/s}$ forward.`, 'Both velocities must refer to the stated frames.'],
            ['Vary the direction', R`Walking backward at the same speed gives $5-2=3\,\mathrm{m/s}$ forward.`, 'Velocity is signed; the frame change matters.']
          ]),
          worked('Average rate versus a local rate', R`A cart follows $x(t)=(1\,\mathrm{m/s^2})t^2$ for $t\geq0$. Compare its average velocity from $1$ to $3\,\mathrm s$ with its instantaneous velocity at $3\,\mathrm s$.`, [
            ['Compare changes', R`$x(1)=1\,\mathrm m$ and $x(3)=9\,\mathrm m$. The average velocity is $(9-1)\,\mathrm m/(3-1)\,\mathrm s=4\,\mathrm{m/s}$.`, 'Division gives change per unit time over the entire interval.'],
            ['Take the local limit', R`$v(t)=dx/dt=(2\,\mathrm{m/s^2})t$, so $v(3)=6\,\mathrm{m/s}$. The average and the final instantaneous rate differ because velocity changes.`, 'The derivative describes the limiting rate at one time.'],
            ['Transfer the reasoning', R`If $x$ instead represented liters in a tank and the coefficient had units $\mathrm{L/s^2}$, the same difference quotient and derivative would describe average and instantaneous flow in liters per second. The model must say whether flow can be negative.`, 'Keep the operation but change its units and interpretation.']
          ])
        ],
        exercises: [mc(R`At the highest point of a vertical throw, neglecting air resistance, which statement is correct?`,
          [R`Velocity and acceleration are both zero.`,R`Velocity is zero and acceleration is downward.`,R`Velocity is upward and acceleration is zero.`,R`Velocity and acceleration are both upward.`],1,
          '<p>Gravity acts at every point in the flight.</p>',R`The velocity changes sign there, but gravity still gives downward acceleration $g$.`,
          {0:'Gravity still acts at the highest point.',2:'Velocity is momentarily zero and acceleration is downward.',3:'At the highest point velocity is zero and gravity points downward.'})],
        freeResponse: [fr(R`A constant net force of $12\,\mathrm N$ acts on a $3\,\mathrm{kg}$ mass. Enter the acceleration magnitude in $\mathrm{m/s^2}$.`,4,'<p>Divide net force by mass.</p>',R`$a=F/m=12/3=4\,\mathrm{m/s^2}$.`)]
      },
      {
        id: 'mechanics-work-energy',
        title: 'Work, Potential, and Energy',
        description: 'Derive energy accounting from force and identify when a potential is valid.',
        foundationRefs: [
          ref('calculus1', 'integration-ftc', 'Integrals accumulate signed rates and relate derivatives to accumulated change.'),
          ref('calculus-3', 'vectors', 'Work uses the component of force along displacement.')
        ],
        concept: { html: R`
          <p>For a particle, work along a path is $W=\int \mathbf F\cdot d\mathbf r$. Only force parallel to the displacement contributes at an instant. Newton's law implies $W_{\rm net}=\Delta K$, where $K=\tfrac12 mv^2$ for constant mass in classical mechanics.</p>
          <p>A conservative force has path-independent work in the region being considered and can be written $\mathbf F=-\nabla U$. In one dimension $F=-dU/dx$. If all relevant forces are conservative and $U$ has no explicit time dependence, $E=K+U$ is constant. Friction can transfer mechanical energy into internal energy; total energy accounting remains valid when those other forms are included.</p>
          <p>Potential energy has an arbitrary additive constant. Differences are physical in this model. The energy graph converts dynamics into a feasibility test: since $K\ge0$, motion is allowed where $U(x)\le E$. Turning points satisfy $E=U$, but an equilibrium with zero velocity can also stay at such a point.</p>` },
        whyExists: { html: R`<p>Energy replaces a time-by-time force calculation with an integral balance when only a speed, turning point, or reachable region is requested. The same idea appears in circuit energy, optimization and stability analysis.</p>` },
        abstraction: { html: R`<p><strong>Interpret a product before using a formula.</strong> A constant force times signed displacement along that force gives work, an energy transfer. If either the force or direction varies, split the path into small parts, take each dot product, and add the signed contributions. An integral expresses the limit of this accumulation; it is not always a sum of positive geometric areas. In accounting or storage, the same signed-sum idea distinguishes deposits from withdrawals, but the units and governing model differ.</p><details><summary>Try reversing farther</summary><p>With a constant $10\,\mathrm N$ eastward force, an object moves $3\,\mathrm m$ east and then $4\,\mathrm m$ west. Find the work of this force and distinguish distance from displacement.</p><details><summary>Check the reasoning</summary><p>The distance traveled is $7\,\mathrm m$, but the signed displacement is $-1\,\mathrm m$. Work is $10(3)+10(-4)=-10\,\mathrm J$. Negative work here means this force removes kinetic energy from the object, subject to the contributions of any other forces.</p></details></details>` },
        examples: [
          worked('Spring compression and a turning point',R`A $1\,\mathrm{kg}$ mass slides frictionlessly at $2\,\mathrm{m/s}$ into a spring of stiffness $100\,\mathrm{N/m}$. Find maximum compression.`,[
            ['Set the balance',R`Choose zero spring energy at its natural length. At maximum compression the speed is zero, so $\tfrac12 mv_0^2=\tfrac12 kx_{\max}^2$.`,'The initial kinetic energy becomes spring potential energy.'],
            ['Solve and check',R`$x_{\max}=v_0\sqrt{m/k}=0.2\,\mathrm m$. Doubling speed doubles compression for this ideal spring.`,'Take the nonnegative root because compression is a magnitude.']
          ]),
          worked('Include nonconservative work',R`A $2\,\mathrm{kg}$ block at $3\,\mathrm{m/s}$ slides $2\,\mathrm m$ on a level surface against a constant $2\,\mathrm N$ friction force. Find its final speed.`,[
            ['Account for work',R`Initial kinetic energy is $9\,\mathrm J$ and friction does $-4\,\mathrm J$ of work, leaving $K_f=5\,\mathrm J$.`,'The friction force opposes displacement.'],
            ['Find the speed',R`$v_f=\sqrt{2K_f/m}=\sqrt5\,\mathrm{m/s}$. Mechanical energy is not conserved, although energy transferred into other forms can be accounted for.`,'Apply the work-energy theorem without pretending friction is conservative.']
          ]),
          worked('Why signed products accumulate',R`A constant $10\,\mathrm N$ force points east while its point of application moves $3\,\mathrm m$ east and then $2\,\mathrm m$ west. Find the force's total work.`,[
            ['Choose a direction',R`Take east as positive. The two signed displacements are $+3\,\mathrm m$ and $-2\,\mathrm m$.`,'The distance traveled is positive, but displacement has direction.'],
            ['Multiply and add',R`The work is $(10)(3)+(10)(-2)=30-20=10\,\mathrm J$. Each product is force times displacement along the force; $1\,\mathrm{N\,m}=1\,\mathrm J$.`,'The negative contribution reverses part of the earlier energy transfer.'],
            ['Change the situation',R`A displacement perpendicular to this force contributes zero work, even if its length is nonzero. For a variable force, accumulate the signed local products with $\int\mathbf F\cdot d\mathbf r$.`,'The dot product selects the component along the displacement before accumulation.']
          ])
        ],
        exercises: [mc(R`For a conservative one-dimensional force $F(x)=-kx$, which potential produces it?`,
          [R`$U=kx$`,R`$U=\tfrac12kx^2+C$`,R`$U=-\tfrac12kx^2+C$`,R`$U=-kx+C$`],1,
          '<p>Differentiate each candidate and use the minus sign in the force law.</p>',R`$-d(\tfrac12kx^2+C)/dx=-kx$.`,
          {0:'Its negative derivative is constant, not proportional to x.',2:'Its negative derivative is +kx.',3:'Its negative derivative is +k.'})],
        freeResponse: [fr(R`A $2\,\mathrm{kg}$ object moves at $3\,\mathrm{m/s}$. Enter its kinetic energy in joules.`,9,'<p>Use one half mass times speed squared.</p>',R`$K=\tfrac12(2)(3^2)=9\,\mathrm J$.`)]
      },
      {
        id: 'mechanics-oscillations',
        title: 'Oscillations and Stability',
        description: 'Linearize a stable equilibrium and interpret frequency, phase, and model limits.',
        foundationRefs: [
          ref('calculus2','first-order-differential-equations','Differential equations connect rates to evolving states.'),
          ref('calculus-3','partial-derivatives','Derivatives locate and classify local changes in a potential.')
        ],
        concept: { html: R`
          <p>An equilibrium $x_0$ satisfies $U'(x_0)=0$. Near a smooth local minimum with $U''(x_0)>0$, write $\xi=x-x_0$. Taylor expansion gives $U(x_0+\xi)\approx U(x_0)+\tfrac12U''(x_0)\xi^2$, and the force is approximately $-U''(x_0)\xi$.</p>
          <p>For constant positive mass, $\ddot\xi+\omega^2\xi=0$ with $\omega=\sqrt{U''(x_0)/m}$. Its solution is $A\cos(\omega t+\phi)$; initial position and velocity determine amplitude and phase. The period $2\pi/\omega$ applies to the ideal undamped linear model. It need not hold for large oscillations or for nonlinear forces.</p>
          <p>Positive curvature gives local stability in this one-dimensional conservative model. Negative curvature gives an unstable equilibrium; zero curvature requires higher-order terms. Damping dissipates mechanical energy and changes the motion, and external forcing introduces a driving frequency.</p>` },
        abstraction: { html: R`<p>Linearization replaces a difficult local law by its first useful approximation. The same Jacobian or Hessian idea appears in numerical root finding, control theory, local optimization, and stability of coupled differential equations. Its conclusions are local, not guarantees far from equilibrium.</p><p>The oscillator is a bridge between subjects. A second-order differential equation gives its classical motion; near a stable equilibrium it approximates many mechanical systems. Quantizing an ideal harmonic oscillator gives energy levels $E_n=\hbar\omega(n+\tfrac12)$ for $n=0,1,2,\ldots$. In thermal equilibrium at temperature $T>0$, the canonical model assigns each level weight proportional to $e^{-E_n/(k_B T)}$. The last two statements require quantum mechanics and the canonical equilibrium assumptions; they do not follow from classical linearization alone.</p>` },
        examples: [
          worked('Infer a period from curvature',R`Near equilibrium a mass of $2\,\mathrm{kg}$ has $U(x)=U_0+8x^2\,\mathrm J$ when $x$ is in meters. Find its angular frequency and period.`,[
            ['Differentiate',R`$U''=16\,\mathrm{N/m}$, so the effective spring constant is 16, not 8.`,'The coefficient of x squared equals one half the curvature.'],
            ['Compute',R`$\omega=\sqrt{16/2}=2\sqrt2\,\mathrm{rad/s}$ and $T=2\pi/\omega=\pi/\sqrt2\,\mathrm s$.`,'A period is time per cycle, while angular frequency is radians per time.']
          ]),
          worked('A pendulum and its approximation',R`For a simple pendulum of length $1\,\mathrm m$ in a uniform field $g=9.8\,\mathrm{m/s^2}$, estimate the small-angle period.`,[
            ['Identify the approximation',R`The exact angular equation is $\ddot\theta+(g/\ell)\sin\theta=0$. For $|\theta|\ll1$ measured in radians, $\sin\theta\approx\theta$.`,'Small angle is the condition that makes the equation linear.'],
            ['Calculate',R`$T\approx2\pi\sqrt{\ell/g}=2\pi/\sqrt{9.8}\approx2.01\,\mathrm s$. Larger amplitudes need the nonlinear equation.`,'The mass cancels under this ideal model.']
          ])
        ],
        exercises: [mc(R`For $U(x)=\tfrac12kx^2$ with $k>0$, how does the small-oscillation frequency change if the mass becomes four times larger?`,
          ['It doubles.','It is halved.','It is unchanged.','It becomes four times larger.'],1,
          '<p>Use the square root of stiffness divided by mass.</p>',R`$\omega=\sqrt{k/m}$, so multiplying $m$ by 4 divides $\omega$ by 2.`,
          {0:'That reverses the dependence on mass.',2:'Frequency depends on mass through its square root.',3:'The square root and inverse dependence were both missed.'})],
        freeResponse: [fr(R`For an ideal spring with $k=18\,\mathrm{N/m}$ and $m=2\,\mathrm{kg}$, enter $\omega$ in radians per second.`,3,'<p>Take the square root of k divided by m.</p>',R`$\omega=\sqrt{18/2}=3\,\mathrm{rad/s}$.`)]
      },
      {
        id: 'mechanics-symmetry-orbits',
        title: 'Momentum, Symmetry, and Central Forces',
        description: 'Use conserved momentum and angular momentum to reduce a mechanical problem.',
        foundationRefs: [
          ref('calculus-3','vectors','Torque and angular momentum use cross products.'),
          ref('calculus1','integration-ftc','Integrals relate a time-varying force to its impulse.')
        ],
        concept: { html: R`
          <p>For an isolated system, total linear momentum is conserved: internal pair forces cancel under the usual Newtonian interaction assumptions. An external impulse changes total momentum by $\Delta\mathbf p=\int\mathbf F_{\rm ext}\,dt$. Kinetic energy need not be conserved in an inelastic collision.</p>
          <p>Angular momentum about a fixed origin is $\mathbf L=\mathbf r\times\mathbf p$, with $d\mathbf L/dt=\boldsymbol\tau=\mathbf r\times\mathbf F$. A central force is parallel to $\mathbf r$, so its torque about the force center vanishes. The angular momentum vector is constant and, for nonzero angular momentum, the orbit lies in the plane perpendicular to it.</p>
          <p>For planar motion with mass $m$ and potential $U(r)$, conserved angular momentum $\ell=mr^2\dot\theta$ reduces the radial energy equation to $E=\tfrac12m\dot r^2+U_{\rm eff}(r)$, where $U_{\rm eff}=U(r)+\ell^2/(2mr^2)$. A circular orbit is a stationary point of the effective potential; its local radial stability requires positive curvature there.</p>` },
        whyExists: { html: R`<p>Symmetry gives quantities that do not change, reducing the number of unknown functions. Similar reductions appear in orbital mechanics, molecular motion, rigid-body dynamics, and optimization with invariant constraints.</p>` },
        examples: [
          worked('A perfectly inelastic collision',R`A $2\,\mathrm{kg}$ cart at $3\,\mathrm{m/s}$ joins a stationary $1\,\mathrm{kg}$ cart. Neglect external horizontal impulse. Find their shared velocity.`,[
            ['Conserve momentum',R`$2(3)+1(0)=(2+1)v_f$, so $v_f=2\,\mathrm{m/s}$.`,'The combined system has negligible external horizontal impulse.'],
            ['Check energy',R`Initial kinetic energy is $9\,\mathrm J$; final kinetic energy is $6\,\mathrm J$. The missing $3\,\mathrm J$ is transferred to other forms.`,'Momentum conservation does not imply kinetic-energy conservation.']
          ]),
          worked('Circular orbit scaling',R`A mass $m$ orbits another mass $M$ at radius $r$ under Newtonian gravity, treating $M$ as fixed. Determine circular speed.`,[
            ['Balance radial acceleration',R`$mv^2/r=GMm/r^2$, so $v=\sqrt{GM/r}$.`,'Gravity supplies inward acceleration; no extra outward force is needed in an inertial frame.'],
            ['Transfer',R`At four times the radius, the circular speed is halved. This result assumes a circular orbit and the stated fixed-center model.`,'The square-root dependence determines scaling.']
          ])
        ],
        exercises: [mc(R`A force always points toward the origin. Which quantity is conserved about that origin?`,
          ['Angular momentum','Velocity vector','Kinetic energy for every possible force','Position vector'],0,
          '<p>Evaluate the torque using the cross product of parallel vectors.</p>',R`$\mathbf r\times\mathbf F=0$, so angular momentum about that fixed origin is constant.`,
          {1:'A central force usually changes the velocity vector.',2:'A time-dependent central force need not conserve mechanical energy.',3:'The object generally moves, so position changes.'})],
        freeResponse: [fr(R`Two objects stick together. Their total initial momentum is $12\,\mathrm{kg\,m/s}$ and combined mass is $4\,\mathrm{kg}$. Enter their final velocity in $\mathrm{m/s}$ when external impulse is negligible.`,3,'<p>Divide total momentum by combined mass.</p>',R`$v=12/4=3\,\mathrm{m/s}$ in the positive direction.`)]
      },
      {
        id: 'mechanics-lagrange',
        title: 'Action and Lagrange’s Equations',
        description: 'Choose generalized coordinates and derive dynamics from an action.',
        foundationRefs: [
          ref('calculus-3','partial-derivatives','A Lagrangian is differentiated with respect to coordinates and velocities separately.'),
          ref('calculus1','integration-ftc','The action accumulates a function along a path over time.')
        ],
        concept: { html: R`
          <p>Generalized coordinates $q_1,\ldots,q_n$ label the allowed configurations. They can be angles, lengths, or other independent variables adapted to the constraints; their generalized forces need not all have units of newtons.</p>
          <p>An action assigns a number to a path: $S[q]=\int_{t_1}^{t_2}L(q,\dot q,t)\,dt$. For differentiable paths with fixed endpoint values, a stationary action has vanishing first variation. Integration by parts gives the Euler–Lagrange equations $\frac{d}{dt}\frac{\partial L}{\partial\dot q_i}-\frac{\partial L}{\partial q_i}=0$. Stationary does not necessarily mean a minimum.</p>
          <p>For many mechanical systems with suitable ideal constraints and conservative forces, $L=T-U$. This is a model construction, not a universal definition for every possible system. Nonconservative generalized forces require an additional term on the right, and velocity-dependent potentials require care.</p>
          <p>If $L$ does not depend on a coordinate $q_i$, then its conjugate momentum $p_i=\partial L/\partial\dot q_i$ is constant. Time-translation symmetry of an autonomous regular Lagrangian similarly gives conserved energy. State the assumptions before applying a conservation law.</p>` },
        abstraction: { html: R`<p>The same variational pattern optimizes curves, derives geodesics, and leads to equations for fields. Boundary conditions are part of the problem. A change in allowed paths changes the equations or boundary terms.</p>` },
        examples: [
          worked('Derive the spring equation',R`A mass $m$ moves horizontally on a frictionless line while an ideal spring of constant $k$ is stretched by $x$. Derive its equation.`,[
            ['Choose the coordinate',R`$L=\tfrac12m\dot x^2-\tfrac12kx^2$. Here $x$ measures displacement from the spring’s natural length.`,'The coordinate incorporates the one-dimensional constraint.'],
            ['Differentiate',R`$\partial L/\partial\dot x=m\dot x$ and $\partial L/\partial x=-kx$. Thus $m\ddot x+kx=0$.`,'Treat x and its velocity as independent inputs while taking partial derivatives.'],
            ['Check',R`The acceleration is opposite the displacement, agreeing with the restoring force $-kx$.`,'Compare with Newton’s law as an independent check.']
          ]),
          worked('A conserved momentum',R`For $L=\tfrac12m(\dot x^2+\dot y^2)-mgy$, identify the conserved momentum and equation for vertical motion.`,[
            ['Use symmetry',R`Because $L$ has no explicit $x$, $p_x=m\dot x$ is constant.`,'x is a cyclic coordinate.'],
            ['Apply the equation',R`For $y$, $d(m\dot y)/dt=-mg$, hence $\ddot y=-g$.`,'The sign follows from y increasing upward.']
          ])
        ],
        exercises: [mc(R`For $L=\tfrac12m\dot x^2-U(x)$, which equation follows from the Euler–Lagrange equation?`,
          [R`$m\ddot x=U'(x)$`,R`$m\ddot x=-U'(x)$`,R`$m\dot x=-U'(x)$`,R`$m\ddot x=U(x)$`],1,
          '<p>Compute the two partial derivatives before rearranging.</p>',R`$d(m\dot x)/dt-[-U'(x)]=0$ gives $m\ddot x=-U'(x)$.`,
          {0:'The derivative of L with respect to x includes a minus sign.',2:'The time derivative of momentum introduces acceleration.',3:'Force is related to the derivative of potential, not potential itself.'})],
        freeResponse: [fr(R`If $L=\tfrac12(4)\dot x^2-U(x)$, enter the coefficient multiplying $\ddot x$ in the Euler–Lagrange equation.`,4,'<p>Differentiate L with respect to velocity, then with respect to time.</p>',R`$\partial L/\partial\dot x=4\dot x$, so its time derivative is $4\ddot x$.`)]
      },
      {
        id: 'mechanics-hamilton',
        title: 'Hamiltonian Dynamics and Phase Space',
        description: 'Translate a regular Lagrangian into first-order equations for position and momentum.',
        foundationRefs: [
          ref('calculus-3','partial-derivatives','Hamilton’s equations use partial derivatives at fixed canonical variables.'),
          ref('calculus2','first-order-differential-equations','Phase-space dynamics are a system of first-order differential equations.')
        ],
        concept: { html: R`
          <p>For a regular Lagrangian, define $p_i=\partial L/\partial\dot q_i$ and solve for velocities in terms of $(q,p,t)$. Its Legendre transform is $H(q,p,t)=\sum_i p_i\dot q_i-L$, evaluated after that substitution. Regularity means the velocity-to-momentum map is locally invertible; constrained systems can require a different treatment.</p>
          <p>Hamilton’s equations are $\dot q_i=\partial H/\partial p_i$ and $\dot p_i=-\partial H/\partial q_i$. They turn a second-order equation into coupled first-order equations on phase space. For $H=p^2/(2m)+U(q)$, the equations recover $\dot q=p/m$ and $\dot p=-U'(q)$.</p>
          <p>Along solutions, $dH/dt=\partial H/\partial t$ when Hamilton’s equations apply. Thus an autonomous Hamiltonian is conserved. Do not assume every Hamiltonian equals ordinary kinetic plus potential energy without checking the model and coordinates. Canonical momentum can differ from mechanical momentum, for example when velocity-dependent electromagnetic terms are present.</p>
          <p>A phase-space point contains both position and momentum. In the ideal harmonic oscillator, curves of constant positive energy are closed ellipses. Phase portraits support qualitative analysis before an explicit solution is available; dissipation generally changes the phase portrait and is not represented by that isolated conservative Hamiltonian.</p>` },
        abstraction: { html: R`<p>The Legendre transform exchanges a slope-like variable for its conjugate variable. Similar transforms appear in thermodynamics and convex optimization, but their domains, signs, and invertibility assumptions must be checked in each setting.</p>` },
        examples: [
          worked('Recover Newton’s equation',R`Take $H(x,p)=p^2/(2m)+kx^2/2$, with $m,k>0$. Derive the motion equation.`,[
            ['Differentiate',R`$\dot x=\partial H/\partial p=p/m$ and $\dot p=-\partial H/\partial x=-kx$.`,'Differentiate one canonical variable while holding the other fixed.'],
            ['Combine',R`Since $p=m\dot x$, differentiating gives $m\ddot x=-kx$.`,'The two first-order equations encode the usual second-order equation.']
          ]),
          worked('Read an oscillator energy contour',R`For $H=p^2/2+x^2/2$ in consistent units and energy $E=2$, find intercepts in phase space.`,[
            ['Set the contour',R`$p^2+x^2=4$, a circle in these scaled coordinates.`,'The constant energy defines a curve in the x–p plane.'],
            ['Check intercepts',R`At $p=0$, $x=\pm2$; at $x=0$, $p=\pm2$. Position and momentum generally have different physical units, so this circular form presumes the stated scaling.`,'The curve describes states, not the particle’s path through physical space.']
          ])
        ],
        exercises: [mc(R`For $H=p^2/(2m)+U(q)$, what is $\dot q$?`,
          [R`$-U'(q)$`,R`$p/m$`,R`$U'(q)$`,R`$m/p$`],1,
          '<p>Differentiate H with respect to canonical momentum.</p>',R`$\dot q=\partial H/\partial p=p/m$.`,
          {0:'That is the equation for momentum change.',2:'Momentum change carries a minus sign.',3:'The derivative of p squared is proportional to p, not its reciprocal.'})],
        freeResponse: [fr(R`For $H=p^2/(2m)$, with $p=12$ and $m=3$ in consistent units, enter $\dot q$.`,4,'<p>Compute p divided by m.</p>',R`$\dot q=p/m=12/3=4$.`)]
      }
    ]
  });

  // Extensions are separate topics so learners can revisit each model and its limits.
  window.MATH_MODULES.find(module => module.id === 'landau-mechanics').topics.push(
    {
      id: 'mechanics-normal-modes',
      title: 'Coupled Oscillations and Normal Modes',
      description: 'Turn coupled differential equations into independent oscillation patterns.',
      foundationRefs: [
        ref('landau-mechanics','mechanics-oscillations','The single oscillator supplies the frequency and energy model.'),
        ref('calculus-3','partial-derivatives','Partial derivatives find forces from a multivariable potential.')
      ],
      concept: { html: R`<p>Near a stable equilibrium, a conservative system with small displacements $\mathbf q$ often has kinetic energy $T=\tfrac12\dot{\mathbf q}^{\mathsf T}M\dot{\mathbf q}$ and quadratic potential $U=\tfrac12\mathbf q^{\mathsf T}K\mathbf q$, with symmetric stiffness matrix $K$ and positive-definite mass matrix $M$. Its linear equations are $M\ddot{\mathbf q}+K\mathbf q=0$.</p><p>Try $\mathbf q=\mathbf a\cos(\omega t+\phi)$. The vector of amplitudes must satisfy $K\mathbf a=\omega^2M\mathbf a$. Each allowed vector is a mode: its components keep a fixed relative pattern. With independent modes, a general small motion is their sum, with amplitudes and phases set by the initial conditions.</p><p>The matrix formulation includes units and coupling. A positive mode frequency squared gives oscillation; a negative one gives exponential growth; a zero one needs separate interpretation. Large motion, friction, or time-varying parameters can invalidate the uncoupled linear model.</p>` },
      abstraction: { html: R`<p>An eigenvector identifies a direction that an operator scales without changing direction. The same reduction separates vibrations of molecules, coupled electrical oscillators, and local motions near equilibria. The matrix and inner product depend on the model; do not carry a physical interpretation across systems without checking units and assumptions.</p>` },
      examples: [
        worked('Two masses between walls',R`Two equal masses $m$ move on a frictionless line. Springs of constant $k$ connect each mass to its adjacent wall and another spring of constant $k$ joins the masses. Find the mode frequencies for small displacements $x_1,x_2$.`,[
          ['Build the model',R`$U=\tfrac12k x_1^2+\tfrac12k(x_2-x_1)^2+\tfrac12k x_2^2$, so $K=k\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$ and $M=mI$.`,'The coupling spring stretches by the difference of the two displacements.'],
          ['Test patterns',R`For $(1,1)$, the middle spring does not stretch and $\omega_+^2=k/m$. For $(1,-1)$ it stretches twice the displacement and $\omega_-^2=3k/m$.`,'The eigenvalue supplies frequency squared, not frequency itself.'],
          ['Change an assumption',R`If the coupling spring is removed, both frequencies become $\sqrt{k/m}$. Damping or unequal masses changes the modes.`,'A model change alters the matrix and must be recalculated.']
        ]),
        worked('Use initial conditions',R`In the preceding equal-mass system, start with both masses displaced equally by $A$ and both velocities zero. Describe the motion.`,[
          ['Select a mode',R`The initial displacement is proportional to $(1,1)$ and the zero initial velocity introduces no other mode.`,'Match the entire state, including velocity.'],
          ['Write and verify',R`$x_1(t)=x_2(t)=A\cos(\sqrt{k/m}\,t)$. The coupling spring remains at its natural length.`,'Substitution into either mass equation verifies the result.']
        ])
      ],
      exercises: [mc(R`In the equal-mass, equal-spring system above, what happens to the middle spring in the $(1,1)$ mode?`,
        ['Its extension is zero.','Its extension is twice either displacement.','It stretches by one displacement.','Its extension cannot be found.'],0,
        '<p>Extension is the second displacement minus the first.</p>',
        'Equal displacements give zero relative displacement, so the middle spring does not stretch.',
        {1:'Twice the displacement occurs for the opposite-direction pattern.',2:'The extension depends on the difference, not a single coordinate.',3:'The mode pattern determines both relative displacements.'})],
      freeResponse: [fr(R`For the same system, let $k=8\,\mathrm{N/m}$ and $m=2\,\mathrm{kg}$. Enter the opposite-direction mode’s $\omega^2$ in $\mathrm{s^{-2}}$.`,12,
        '<p>Use the eigenvalue associated with the opposite-direction pattern.</p>',R`$\omega^2=3k/m=3(8)/2=12\,\mathrm{s^{-2}}$.`)]
    },
    {
      id: 'mechanics-rigid-bodies',
      title: 'Rigid Bodies and Rotation',
      description: 'Relate torque, angular momentum and inertia without assuming all axes are equivalent.',
      foundationRefs: [
        ref('landau-mechanics','mechanics-symmetry-orbits','Angular momentum changes under external torque.'),
        ref('calculus-3','vectors','Cross products give torque and angular momentum about a specified origin.')
      ],
      concept: { html: R`<p>A rigid body preserves distances between its points. Its center-of-mass motion and rotation can be separated: $K=\tfrac12 M v_{\rm CM}^2+\tfrac12\boldsymbol\omega^{\mathsf T}I_{\rm CM}\boldsymbol\omega$, where the inertia tensor is taken about the center of mass. The tensor depends on the mass distribution and axis orientation.</p><p>About a fixed origin, the external torque satisfies $\boldsymbol\tau=d\mathbf L/dt$ in an inertial frame. About the center of mass, $\mathbf L_{\rm CM}=I_{\rm CM}\boldsymbol\omega$ need not be parallel to angular velocity. About another origin, include the center-of-mass orbital contribution. A principal axis is an eigenvector of the inertia tensor. For rotation about a fixed axis with constant axial moment $I$, the axial equation simplifies to $\tau=I\alpha$.</p><p>For parallel axes separated by distance $d$, $I=I_{\rm CM}+Md^2$. This scalar theorem requires the reference axis through the center of mass and both axes parallel. A constraint or moving pivot can supply forces and torque; include them in the chosen system.</p>` },
      examples: [
        worked('Torque on a disk',R`A uniform disk of mass $2\,\mathrm{kg}$ and radius $0.5\,\mathrm m$ starts from rest on a fixed frictionless axle through its center. A constant axial torque of $1\,\mathrm{N\,m}$ acts for $3\,\mathrm s$. Find its angular speed.`,[
          ['Find inertia',R`For this disk and axis, $I=\tfrac12MR^2=\tfrac12(2)(0.5)^2=0.25\,\mathrm{kg\,m^2}$.`,'The same mass has different moments about different axes.'],
          ['Apply torque',R`$\alpha=\tau/I=4\,\mathrm{rad/s^2}$, so $\omega=12\,\mathrm{rad/s}$ after three seconds.`,'Constant torque and constant inertia give constant angular acceleration.'],
          ['Check work and energy',R`The angular displacement is $\tfrac12\alpha t^2=18\,\mathrm{rad}$. Torque does $18\,\mathrm J$ of work, matching $\tfrac12I\omega^2=18\,\mathrm J$.`,'A second method checks both the coefficient and units.']
        ]),
        worked('Change the axis',R`For the same disk, find the moment of inertia about an axis perpendicular to its plane through a point on its rim.`,[
          ['Use the theorem',R`The new axis is parallel to the central axis, at distance $d=0.5\,\mathrm m$. Thus $I=0.25+2(0.5)^2=0.75\,\mathrm{kg\,m^2}$.`,'Check both the center-of-mass starting axis and the parallel-axis condition.']
        ])
      ],
      exercises: [mc(R`A rigid body’s angular momentum and angular velocity need not point in the same direction because:`,
        ['the inertia tensor can scale different directions differently','torque is always zero','mass is a scalar','all axes are principal axes'],0,
        '<p>Consider what a matrix can do to a vector away from an eigenvector.</p>',
        'A general inertia tensor changes the direction of an angular-velocity vector that is not along a principal axis.',
        {1:'A body can experience nonzero external torque.',2:'A scalar mass alone does not describe its rotational mass distribution.',3:'Only eigenvector directions are principal axes in general.'})],
      freeResponse: [fr(R`A wheel has fixed-axis moment of inertia $2\,\mathrm{kg\,m^2}$ and experiences axial torque $6\,\mathrm{N\,m}$. Enter its angular acceleration in $\mathrm{rad/s^2}$.`,3,
        '<p>Use torque divided by the constant axial moment.</p>',R`$\alpha=\tau/I=6/2=3\,\mathrm{rad/s^2}$.`)]
    },
    {
      id: 'mechanics-noninertial-frames',
      title: 'Accelerating and Rotating Frames',
      description: 'Translate motion between inertial and noninertial coordinates and account for apparent forces.',
      foundationRefs: [
        ref('landau-mechanics','mechanics-models-newton','Newton’s law takes its usual form in an inertial frame.'),
        ref('calculus-3','vectors','Rotating-frame corrections use vector cross products.')
      ],
      concept: { html: R`<p>Newton’s law is simplest in an inertial frame. An accelerating or rotating observer can still use coordinates attached to the observer, but the coordinate acceleration must be related to the inertial acceleration. Apparent forces are bookkeeping terms introduced by that choice of frame; they are not additional interactions between objects.</p><p>Let the rotating frame’s origin have inertial acceleration $\mathbf a_O$, angular velocity $\boldsymbol\omega$, and angular acceleration $\dot{\boldsymbol\omega}$. For displacement $\mathbf r$, relative velocity $\mathbf v_{\rm rel}$, and relative acceleration $\mathbf a_{\rm rel}$ measured in the rotating frame, the inertial acceleration is</p><p>$$\mathbf a_{\rm inert}=\mathbf a_O+\mathbf a_{\rm rel}+2\boldsymbol\omega\times\mathbf v_{\rm rel}+\dot{\boldsymbol\omega}\times\mathbf r+\boldsymbol\omega\times(\boldsymbol\omega\times\mathbf r).$$</p><p>Rearranging $m\mathbf a_{\rm inert}=\mathbf F_{\rm real}$ gives $m\mathbf a_{\rm rel}=\mathbf F_{\rm real}-m\mathbf a_O-2m\boldsymbol\omega\times\mathbf v_{\rm rel}-m\dot{\boldsymbol\omega}\times\mathbf r-m\boldsymbol\omega\times(\boldsymbol\omega\times\mathbf r)$. These four subtracted terms are the apparent translational, Coriolis, Euler, and centrifugal forces. Each sign depends on this rearrangement. These formulas assume classical rigid-frame rotation and a consistent origin; translating frames with no rotation have $\boldsymbol\omega=0$.</p>` },
      examples: [
        worked('A stationary object in a rotating frame',R`A particle is at rest relative to a frame rotating uniformly at $\omega=3\,\mathrm{rad/s}$ about a fixed origin. Its perpendicular distance from the axis is $2\,\mathrm m$. Find the required real acceleration.`,[
          ['Identify terms',R`$\mathbf v_{\rm rel}=\mathbf a_{\rm rel}=\dot{\boldsymbol\omega}=\mathbf a_O=0$. Only the double cross product remains.`,'Being stationary in the rotating coordinates does not mean stationary in an inertial frame.'],
          ['Determine direction',R`$\boldsymbol\omega\times(\boldsymbol\omega\times\mathbf r)$ points inward with magnitude $\omega^2r=18\,\mathrm{m/s^2}$. A real inward force must supply that acceleration.`,'The rotating-frame centrifugal term points outward and balances the real inward force.']
        ]),
        worked('Coriolis direction',R`In a uniformly rotating frame with $\boldsymbol\omega=2\hat{\mathbf z}\,\mathrm{rad/s}$, a particle’s relative velocity is $3\hat{\mathbf x}\,\mathrm{m/s}$. Find the Coriolis apparent acceleration.`,[
          ['Use the frame correction',R`The Coriolis apparent acceleration is $-2\boldsymbol\omega\times\mathbf v_{\rm rel}=-12\hat{\mathbf y}\,\mathrm{m/s^2}$.`,R`The right-hand rule gives $\hat z\times\hat x=\hat y$; moving the term to the force side adds the minus sign.`]
        ])
      ],
      exercises: [mc('In a frame translating with constant velocity relative to an inertial frame, which frame-acceleration correction is required?',
        ['None','A Coriolis correction','A centrifugal correction','An Euler correction'],0,
        '<p>Check both the origin acceleration and angular velocity.</p>',
        'Constant-velocity translation has zero origin acceleration and no rotation, so it is another inertial frame.',
        {1:'There is no angular velocity to produce a Coriolis term.',2:'There is no rotation to produce a centrifugal term.',3:'There is no changing angular velocity.'})],
      freeResponse: [fr(R`At rest in a uniformly rotating frame whose origin and axis are fixed in an inertial frame, a point is $1\,\mathrm m$ from the axis and rotates at $2\,\mathrm{rad/s}$. Enter the magnitude of its inertial acceleration in $\mathrm{m/s^2}$.`,4,
        '<p>Use angular speed squared times radius.</p>',R`$a=\omega^2r=2^2(1)=4\,\mathrm{m/s^2}$, directed toward the axis.`)]
    }
  );

})();
