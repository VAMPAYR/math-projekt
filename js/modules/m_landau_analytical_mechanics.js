/* Original advanced mechanics lessons; all models state their domains. */
(function () {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];
  const S = String.raw;
  const ref = (moduleId, topicId, note) => ({ moduleId, topicId, note });
  const example = (title, problem, steps) => ({
    title, problem, steps: steps.map((content, i) => ({ title: 'Step ' + (i + 1), content }))
  });
  const choice = (question, options, correctIndex, hint, correctExplanation, wrongExplanations) => ({
    difficulty: 'hard', question, options, correctIndex, hint: '<p>' + hint + '</p>', correctExplanation, wrongExplanations
  });
  const number = (question, answer, hint, explanation) => ({
    difficulty: 'hard', question, accept: [answer], placeholder: 'Enter a number',
    hint: '<p>' + hint + '</p>', explanation, solution: explanation
  });

  window.MATH_MODULES.push({
    id: 'landau-analytical-mechanics', order: 28.1,
    title: 'Analytical Mechanics: Constraints, Symmetry, and Scattering',
    description: 'Develop constrained motion, rigid-body dynamics, canonical maps, Hamilton–Jacobi theory, action-angle variables, and scattering from explicit models.',
    topics: [
      {
        id: 'constraints-rolling', title: 'Constraints and Rolling Motion',
        description: 'Choose independent coordinates and use constraints only within their physical domain.',
        foundationRefs: [
          ref('landau-mechanics', 'mechanics-lagrange', 'The Euler–Lagrange equation describes motion in independent generalized coordinates.'),
          ref('landau-mechanics', 'mechanics-work-energy', 'Energy helps check the constrained equations of motion.')
        ],
        concept: { html: S`<p>A constraint restricts allowed configurations or velocities. A holonomic constraint can be written as a relation among coordinates and time, such as $f(q_1,\ldots,q_n,t)=0$. When regular, it can reduce the number of independent coordinates. A velocity constraint need not be integrable into such a relation, so do not automatically eliminate a coordinate without checking.</p><p>For a disk rolling without slipping along a fixed straight line, choose signs so $x=R\phi+\mathrm{constant}$, where $x$ is center position and $\phi$ is rotation. This one-dimensional relation is integrable. The contact condition is an assumption: if available static friction is insufficient, slipping occurs and a different model is needed.</p><p>For mass $M$, moment $I$ about the center, and speed $v=R\dot\phi$, kinetic energy is $T=\frac12Mv^2+\frac12I(v/R)^2$. The translation and rotation are both needed. On a fixed track, the instantaneous contact point is at rest, so ideal static friction does no work on the disk; this statement does not apply unchanged to a moving track.</p>` },
        abstraction: { html: S`<p>Reduce a model only after stating its constraints. Check whether the force needed to enforce the constraint is physically available, whether energy is conserved, and whether the relation changes when a surface moves or a contact slips. The same separation of model and feasibility appears in robotics and optimization.</p>` },
        examples: [
          example('Kinetic energy of a rolling disk', S`A uniform disk with $M=2\,\mathrm{kg}$ rolls at $v=4\,\mathrm{m/s}$. Find its kinetic energy.`, [
            S`A uniform disk has $I=\frac12MR^2$. Substitute $\omega=v/R$ into $T=\frac12Mv^2+\frac12I\omega^2$.`,
            S`$T=\frac34Mv^2=24\,\mathrm J$. The radius cancels for this particular mass distribution; it would not cancel in every rolling model.`
          ]),
          example('Rolling down an incline', S`For a uniform disk on a fixed incline with $g=10\,\mathrm{m/s^2}$ and $\sin\alpha=0.3$, find acceleration if static friction enforces rolling.`, [
            S`Along the slope, $Mg\sin\alpha-f=Ma$ and the torque about the center gives $fR=I(a/R)$. These equations use $a=R\dot\omega$ with consistent signs.`,
            S`Thus $a=g\sin\alpha/[1+I/(MR^2)]=(2/3)g\sin\alpha=2\,\mathrm{m/s^2}$. Verify afterward that the required static friction does not exceed its available bound.`
          ])
        ],
        exercises: [
          choice('Which statement about rolling on a fixed surface is required to use v = Rω?', ['The contact point has zero instantaneous velocity relative to the surface', 'Friction is always zero', 'The center has zero acceleration', 'Every velocity constraint is holonomic'], 0, 'Compare the velocities of the surfaces at contact.', 'No slipping means the contact velocities agree.', {1:'Static friction can enforce rolling without being zero.',2:'A rolling body can accelerate.',3:'Velocity constraints can be nonholonomic.'})
        ],
        freeResponse: [number(S`A disk with $I=\frac12MR^2$ rolls at $v=2\,\mathrm{m/s}$ with $M=4\,\mathrm{kg}$. Enter its kinetic energy in joules.`, 12, 'Include both translation and rotation.', S`$T=\frac34Mv^2=\frac34(4)(4)=12\,\mathrm J$.`)]
      },
      {
        id: 'euler-rigid-body', title: 'Euler Equations for a Rigid Body',
        description: 'Use principal axes to predict rotation when angular momentum and angular velocity are not parallel.',
        foundationRefs: [
          ref('landau-mechanics', 'mechanics-rigid-bodies', 'Moment of inertia and angular momentum provide the rigid-body model.'),
          ref('landau-math', 'differential-equations', 'Coupled differential equations describe evolving components.')
        ],
        concept: { html: S`<p>Choose body-fixed principal axes through a fixed point or the center of mass, with principal moments $I_1,I_2,I_3$. The angular momentum components are $L_i=I_i\omega_i$. Because the basis rotates with the body, an inertial derivative has the additional term $\boldsymbol\omega\times\mathbf L$. Therefore $\boldsymbol\tau=(d\mathbf L/dt)_{\rm body}+\boldsymbol\omega\times\mathbf L$.</p><p>Euler's equations are $I_1\dot\omega_1+(I_3-I_2)\omega_2\omega_3=\tau_1$ and its cyclic counterparts. They assume a rigid body with constant principal moments in these axes. Even with zero torque, the body-frame components of angular velocity can change while inertial angular momentum remains fixed.</p><p>For a torque-free symmetric top with $I_1=I_2=I$ and $I_3$ arbitrary, $\omega_3=\Omega$ is constant. Put $\alpha=(I_3-I)\Omega/I$. Then $\dot\omega_1=-\alpha\omega_2$ and $\dot\omega_2=\alpha\omega_1$. The transverse components rotate at signed rate $\alpha$ in the body frame; this is not automatically the precession rate of the symmetry axis in space.</p>` },
        abstraction: { html: S`<p>A derivative depends on the frame used to express its components. The rotating-frame term is the same principle used when differentiating a vector in a moving basis in fluid mechanics or orbital coordinates. Check both energy and inertial angular momentum when interpreting a solution. <a href="https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/" target="_blank" rel="noopener noreferrer">MIT rigid-body lecture notes</a> give further examples.</p>` },
        examples: [
          example('Solve the symmetric-top equations', S`Let $I=2$, $I_3=3$ in consistent inertia units, $\Omega=4\,\mathrm{rad/s}$, and initially $(\omega_1,\omega_2)=(1,0)\,\mathrm{rad/s}$. Find the transverse components.`, [
            S`$\alpha=(3-2)(4)/2=2\,\mathrm{rad/s}$. The coupled equations are $\dot\omega_1=-2\omega_2$ and $\dot\omega_2=2\omega_1$.`,
            S`$\omega_1=\cos(2t)$ and $\omega_2=\sin(2t)$ in radians per second. Their squared sum is constant, as is rotational kinetic energy.`
          ]),
          example('The spherical limit', S`What happens to the same torque-free transverse equations when $I_3=I$?`, [
            S`Then $\alpha=0$, so both transverse components are constant in the body frame. This is consistent with $\mathbf L=I\boldsymbol\omega$ and zero torque for a spherical inertia tensor.`,
            S`The limit checks the formula without claiming that all asymmetric bodies have constant body-frame components.`
          ])
        ],
        exercises: [
          choice('For a torque-free symmetric top, what follows from the third Euler equation?', ['The body-axis component ω₃ is constant', 'The angular velocity must point along the symmetry axis', 'All three body-frame components must be constant', 'The rotational kinetic energy must vanish'], 0, 'Use I₁ = I₂ in the third equation.', 'The torque and the coefficient of ω₁ω₂ both vanish, so I₃ dω₃/dt = 0.', {1:'Transverse components can be nonzero.',2:'The transverse components can rotate in the body frame.',3:'A torque-free body can have nonzero rotational energy.'})
        ],
        freeResponse: [number('For I = 2, I₃ = 4 and Ω = 3 in consistent units, enter α = (I₃ − I)Ω/I in radians per second.', 3, 'Substitute into the signed body-frame rotation rate.', 'α = (4 − 2) × 3 / 2 = 3 rad/s.')]
      },
      {
        id: 'canonical-transformations', title: 'Canonical Transformations',
        description: 'Change phase-space coordinates while preserving Hamiltonian structure.',
        foundationRefs: [
          ref('landau-mechanics', 'mechanics-hamilton', 'Hamilton’s equations and the phase-space variables are the starting point.'),
          ref('calculus-3', 'partial-derivatives', 'Partial derivatives determine the Poisson bracket of a coordinate map.')
        ],
        concept: { html: S`<p>In one degree of freedom a differentiable invertible map $(q,p)\mapsto(Q,P)$ is canonical when it preserves the symplectic form $dq\wedge dp=dQ\wedge dP$. Equivalently, $\{Q,P\}_{q,p}=Q_qP_p-Q_pP_q=1$ on its domain. In higher dimensions the full set of Poisson-bracket conditions is needed; a single determinant is not enough.</p><p>A generating function provides a systematic construction. For a type-2 function $F_2(q,P,t)$, use $p=\partial F_2/\partial q$ and $Q=\partial F_2/\partial P$. If the map is invertible, the new Hamiltonian is $K=H+\partial F_2/\partial t$, expressed in the new variables. A time-dependent map therefore needs the extra term.</p><p>For $q>0$, let $Q=q^2/2$ and $P=p/q$. Then $dQ=q\,dq$ and $P\,dQ=p\,dq$, so the transformation is canonical. The inverse is $q=\sqrt{2Q}$ and $p=P\sqrt{2Q}$ on $Q>0$. The restriction is essential: the map is singular at $q=0$ and the sign of $q$ would otherwise be lost.</p>` },
        abstraction: { html: S`<p>A useful coordinate change preserves the relations needed for the equations, even when the formulas look different. Check invertibility, the bracket, the domain and any explicit time dependence. This applies to normal-mode coordinates and to transformations used in integrable systems.</p>` },
        examples: [
          example('Check the nonlinear map', S`For $Q=q^2/2$, $P=p/q$ on $q>0$, calculate $\{Q,P\}$.`, [
            S`$Q_q=q$, $Q_p=0$, $P_p=1/q$, and $P_q=-p/q^2$.`,
            S`Therefore $\{Q,P\}=q(1/q)-0=1$. The map has inverse only after its branch is fixed.`
          ]),
          example('Transform a Hamiltonian', S`On $q>0$, transform $H=p^2/(2m)+kq^2/2$ using the same time-independent map, with $m,k>0$.`, [
            S`The inverse gives $q^2=2Q$ and $p^2=2QP^2$.`,
            S`Thus $K(Q,P)=QP^2/m+kQ$. It describes the original oscillator only while the trajectory remains in $q>0$; the coordinate chart does not extend through $q=0$.`
          ])
        ],
        exercises: [
          choice('Which condition is sufficient for a differentiable invertible time-independent transformation in one degree of freedom to be canonical?', ['Its Poisson bracket {Q,P} equals 1', 'Q and P have the same dimensions', 'Its Jacobian is zero', 'The original Hamiltonian is conserved'], 0, 'Use the one-degree-of-freedom bracket.', 'A unit Poisson bracket preserves the symplectic form in one degree of freedom.', {1:'Canonical coordinates need not have the same units.',2:'A zero Jacobian makes the map singular.',3:'Conservation does not establish that a coordinate map is canonical.'})
        ],
        freeResponse: [number('For Q = q²/2 and P = p/q on q > 0, enter their Poisson bracket {Q,P}.', 1, 'Differentiate Q and P with respect to q and p.', 'The bracket is q(1/q) − 0 = 1.')]
      },
      {
        id: 'hamilton-jacobi-actions', title: 'Hamilton–Jacobi Theory and Action-Angle Variables',
        description: 'Turn trajectories into derivatives of an action and interpret a closed phase-space orbit.',
        foundationRefs: [
          ref('landau-mechanics', 'mechanics-hamilton', 'Hamiltonian mechanics connects coordinates, momenta, and trajectories.'),
          ref('landau-math', 'variational-calculus', 'Stationary-action reasoning motivates the generating function.')
        ],
        concept: { html: S`<p>A Hamilton principal function $S(q,t)$ satisfies the Hamilton–Jacobi equation $\partial S/\partial t+H(q,\partial S/\partial q,t)=0$. A complete solution with an appropriate parameter can generate a canonical transformation to constants. The method is local when a single-valued generating function or coordinate chart fails, and initial conditions select the trajectory.</p><p>For a free particle of mass $m>0$, $S(q,t;p_0)=p_0q-p_0^2t/(2m)$ solves the equation. Differentiating with respect to $p_0$ gives the constant $\beta=q-p_0t/m$, hence $q(t)=\beta+p_0t/m$. Here $p_0$ is a parameter, not an operator.</p><p>For a periodic one-degree-of-freedom orbit, define the action $J=(2\pi)^{-1}\oint p\,dq$. It has units of action. When $H=H(J)$, the derivative $\partial H/\partial J$ gives the conjugate angle's frequency. For a harmonic oscillator $H=p^2/(2m)+m\omega^2q^2/2$, $m,\omega>0$, the phase-space orbit is an ellipse of area $2\pi E/\omega$, so $J=E/\omega$ and $\dot\theta=\partial H/\partial J=\omega$. The angle chart is singular at the zero-energy fixed point.</p>` },
        abstraction: { html: S`<p>The same oscillator has several descriptions: a second-order differential equation, an ellipse in phase space, and a uniformly advancing angle. Choose the representation that simplifies the question. The classical action variable is not automatically an allowed quantum energy; quantization requires additional quantum assumptions.</p>` },
        examples: [
          example('Free-particle trajectory', S`For $m=2\,\mathrm{kg}$, $p_0=6\,\mathrm{kg\,m/s}$ and $\beta=1\,\mathrm m$, recover $q(t)$.`, [
            S`Differentiate $S$ with respect to $p_0$: $\beta=q-p_0t/m$.`,
            S`$q(t)=1+3t$ meters when $t$ is in seconds. Its derivative is $3\,\mathrm{m/s}=p_0/m$; the momentum is constant.`
          ]),
          example('Action of a small pendulum oscillation', S`A pendulum of length $1\,\mathrm m$ has $g=9\,\mathrm{m/s^2}$ and energy $0.045\,\mathrm J$ above its minimum. Estimate $J$ in the small-angle model.`, [
            S`The small-angle frequency is $\omega=\sqrt{g/\ell}=3\,\mathrm{rad/s}$.`,
            S`$J=E/\omega=0.015\,\mathrm{J\,s}$. For a $1\,\mathrm{kg}$ bob the amplitude is about $0.1$ radian, consistent with the small-angle approximation. The exact pendulum's period depends on amplitude.`
          ])
        ],
        exercises: [
          choice('For a positive-energy harmonic oscillator, what does J = (1/2π)∮p dq measure?', ['Phase-space area divided by 2π', 'The ordinary spatial distance travelled in a period', 'The oscillator mass', 'The instantaneous kinetic energy'], 0, 'Visualize the closed orbit in the q–p plane.', 'The integral encloses phase-space area; dividing by 2π defines J.', {1:'The momentum factor gives the integral units of action.',2:'J varies with energy and frequency, not just mass.',3:'J is constant on the orbit while kinetic energy varies.'})
        ],
        freeResponse: [number('For a harmonic oscillator with energy 12 J and angular frequency 4 rad/s, enter J in J·s.', 3, 'Divide the energy by the angular frequency.', 'J = E/ω = 12/4 = 3 J·s.')]
      },
      {
        id: 'central-force-scattering', title: 'Central-Force Scattering',
        description: 'Connect a trajectory’s impact parameter with an observable angular distribution.',
        foundationRefs: [
          ref('landau-mechanics', 'mechanics-symmetry-orbits', 'A central force conserves angular momentum and confines the orbit to a plane.'),
          ref('landau-advanced-quantum', 'scattering-cross-sections', 'Classical angular distributions provide a contrast with quantum scattering.')
        ],
        concept: { html: S`<p>For a central potential $V(r)$, rotational symmetry conserves angular momentum. In a two-body problem with a central interaction, use the relative coordinate and reduced mass $\mu=m_1m_2/(m_1+m_2)$. At infinity, take positive relative energy $E=\mu v^2/2$ and impact parameter $b>0$; the angular momentum magnitude is $L=\mu vb$.</p><p>For the repulsive inverse-distance potential $V(r)=\kappa/r$ with $\kappa>0$, the classical orbit gives $\tan(\chi/2)=\kappa/(2Eb)$ for deflection angle $0<\chi<\pi$. The derivation uses conservation of energy and angular momentum for an unshielded point interaction. Attractive forces, finite size, screening, or quantum effects require their own model.</p><p>For an azimuthally symmetric beam, a ring of impact parameters gives $d\sigma/d\Omega=(b/\sin\chi)|db/d\chi|$. Substituting $b=(\kappa/2E)\cot(\chi/2)$ gives the Rutherford result $d\sigma/d\Omega=\kappa^2/[16E^2\sin^4(\chi/2)]$. The differential cross section has dimensions of area per unit solid angle. Its divergence toward $\chi=0$ reflects the ideal long-range model; a finite experimental angular resolution or physical screening matters.</p>` },
        abstraction: { html: S`<p>A trajectory is an individual prediction, while a cross section describes a distribution for an incident beam. Translate between them with the geometric Jacobian and check which physical assumptions define the beam and interaction. The same change-of-variables principle appears in probability densities. <a href="https://ocw.mit.edu/courses/22-611j-introduction-to-plasma-physics-i-fall-2006/6392c1cde2d7d1921bd0c9fdf78520cb_chap3.pdf" target="_blank" rel="noopener noreferrer">MIT collision notes</a> derive the angular formula.</p>` },
        examples: [
          example('Find a deflection', S`Take $E=2$ energy units, $\kappa=4$ energy-length units, and $b=1$ length unit for repulsive scattering. Find $\chi$.`, [
            S`$\tan(\chi/2)=4/[2(2)(1)]=1$. The physical deflection is in $(0,\pi)$.`,
            S`Thus $\chi=\pi/2$. A larger impact parameter reduces the deflection in this model.`
          ]),
          example('Compare angular counts', S`For the same $E$ and $\kappa$, evaluate $d\sigma/d\Omega$ at $\chi=\pi/2$.`, [
            S`$\sin^4(\pi/4)=1/4$, and $\kappa^2/(16E^2)=16/64=1/4$ in square-length units.`,
            S`The differential cross section is $1$ square-length unit per steradian. It is not the total cross section, which would require an angular integral and a specified angular range.`
          ])
        ],
        exercises: [
          choice('For the ideal repulsive inverse-distance model at fixed energy, what happens when the impact parameter increases?', ['The deflection angle decreases', 'The deflection angle must increase', 'The force changes from repulsive to attractive', 'The reduced mass becomes zero'], 0, 'Inspect tan(χ/2) = κ/(2Eb).', 'At fixed positive κ and E, increasing b decreases tan(χ/2), and hence χ on its physical range.', {1:'The positive inverse relation goes in the opposite direction.',2:'Changing b does not change the sign of κ.',3:'Reduced mass depends on the bodies, not the impact parameter.'})
        ],
        freeResponse: [number('For E = 1, κ = 2 and b = 1 in consistent units, enter tan(χ/2).', 1, 'Use the repulsive-scattering relation.', 'tan(χ/2) = κ/(2Eb) = 2/(2 × 1 × 1) = 1.')]
      }
    ]
  });
})();
