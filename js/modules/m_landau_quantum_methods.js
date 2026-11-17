/* Original written lessons connecting quantum models and mathematical methods. */
(function () {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];
  const S = String.raw;
  const ref = (moduleId, topicId, note) => ({ moduleId, topicId, note });
  const example = (title, problem, steps) => ({ title, problem, steps: steps.map((content, i) => ({ title: 'Step ' + (i + 1), content })) });
  const choice = (question, options, correctIndex, hint, correctExplanation, wrongExplanations) =>
    ({ difficulty: 'medium', question, options, correctIndex, hint: '<p>' + hint + '</p>', correctExplanation, wrongExplanations });
  const number = (question, answer, hint, explanation) =>
    ({ difficulty: 'medium', question, accept: [answer], placeholder: 'Enter a number', hint: '<p>' + hint + '</p>', explanation, solution: explanation });

  window.MATH_MODULES.push({
    id: 'landau-quantum-methods', order: 28.2,
    title: 'Quantum Models: Spectra and Approximation',
    description: 'Use spectra, central potentials, variational bounds, and semiclassical approximations to model quantum systems and check when a method applies.',
    topics: [
      {
        id: 'spectral-measurement', title: 'Spectra, States, and Operator Domains',
        description: 'Connect eigenvectors to measurement probabilities while distinguishing a matrix calculation from the domain of an unbounded observable.',
        foundationRefs: [
          ref('landau-math', 'eigenmodes', 'Eigenvectors and eigenvalues provide a basis for finite-dimensional measurement models.'),
          ref('landau-quantum-statistical', 'quantum-observables-uncertainty', 'Observables and probabilities describe measurement outcomes.')
        ],
        whyExists: { html: S`<p>A measurement problem asks both what outcomes can occur and how likely they are. A basis change makes those questions calculable, while the distinction between Hermitian matrices and unbounded operators prevents an invalid extension to every wavefunction.</p>` },
        concept: { html: S`<p>For a finite-dimensional Hermitian matrix $A$, choose orthonormal eigenvectors $|a_j\rangle$ with real eigenvalues $a_j$. Write a normalized state $|\psi\rangle=\sum_j c_j|a_j\rangle$. The probability of outcome $a_j$ is $|c_j|^2$, and $\langle A\rangle=\sum_j a_j|c_j|^2$. If eigenvalues repeat, add the probabilities of all orthogonal eigenvectors in the corresponding eigenspace.</p><p>For infinite-dimensional systems the spectral theorem also handles continuous spectra. Position and momentum are unbounded operators: they are defined on specified dense domains, and finite expectation or variance needs additional conditions on the state. A formal derivative alone does not establish self-adjointness; boundary conditions can matter. A generalized position eigenstate is a distribution, not a normalizable state vector.</p><p><strong>Transfer:</strong> the same diagonalization decouples linear mechanical normal modes. Here the coefficients give outcome amplitudes; in a classical vibration they give mode amplitudes. Check the interpretation before transferring a calculation.</p>` },
        examples: [
          example('Predict outcomes from eigenvectors', S`Let $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ and $|\psi\rangle=(1,0)^T$. Find the outcome probabilities and expectation.`, [
            S`The normalized eigenvectors are $|+\rangle=(1,1)^T/\sqrt2$ and $|-\rangle=(1,-1)^T/\sqrt2$, with eigenvalues 3 and 1.`,
            S`The state is $(|+\rangle+|-\rangle)/\sqrt2$. Each probability is $1/2$, so $\langle A\rangle=3/2+1/2=2$.`,
            S`Check independently: $\langle\psi|A|\psi\rangle=2$. The expectation is a mean over repeated measurements, not a guaranteed individual outcome.`
          ]),
          example('An expectation need not be an eigenvalue', S`For $B=\begin{pmatrix}0&-i\\i&0\end{pmatrix}$ and state $(1,0)^T$, find the possible outcomes and their mean.`, [
            S`$B$ is Hermitian and satisfies $B^2=I$, so its eigenvalues are $+1$ and $-1$.`,
            S`The diagonal matrix element is zero, so $\langle B\rangle=0$. Since the two outcomes are $\pm1$ and probabilities sum to 1, each has probability $1/2$.`,
            S`The mean 0 is not an eigenvalue. It describes the average outcome rather than an additional allowed result.`
          ])
        ],
        exercises: [
          choice(S`A normalized state has probability $1/4$ for eigenvalue 4 and $3/4$ for eigenvalue 0. What is its expectation?`,
            ['$0$', '$1$', '$2$', '$4$'], 1, 'Multiply each outcome by its probability and add.',
            S`$4(1/4)+0(3/4)=1$.`,
            {0:'The eigenvalue 4 has nonzero probability.',2:'This would require a different weighting.',3:'The outcome 4 occurs only one quarter of the time.'}),
          choice('Which statement about an unbounded momentum operator is justified?', [
            'It acts on every square-integrable function without conditions.',
            'Its domain and boundary conditions matter for self-adjointness.',
            'Every position eigenstate is a normalized ordinary vector.',
            'A real expectation proves that a formal differential expression is self-adjoint.'
          ], 1, 'Distinguish a differential expression from a specified operator.',
          'The operator includes a domain; self-adjointness depends on that domain.',
          {0:'An unbounded operator is not defined on all square-integrable states.',2:'Ideal position eigenstates are generalized states, not normalizable vectors.',3:'A real expression alone does not establish equality with its adjoint domain.'})
        ],
        freeResponse: [number(S`A measurement gives 3 with probability $1/2$ and 1 with probability $1/2$. Enter its expectation.`, 2,
          'Use the probability-weighted mean.', S`$3(1/2)+1(1/2)=2$.`)]
      },
      {
        id: 'central-potential-hydrogen', title: 'Central Potentials and Hydrogenic States',
        description: 'Separate angular and radial motion, impose physical boundary conditions, and use the hydrogenic energy scale.',
        foundationRefs: [
          ref('landau-math-methods', 'legendre-boundary-modes', 'Angular separation connects to Legendre functions and spherical harmonics.'),
          ref('landau-quantum-statistical', 'quantum-bound-states', 'Boundary conditions select discrete bound-state energies.')
        ],
        whyExists: { html: S`<p>Rotational symmetry organizes a three-dimensional eigenvalue problem into angular labels and a radial equation. The same separation method appears in spherical waves and central-force mechanics, but the quantum radial function must also be normalizable.</p>` },
        concept: { html: S`<p>For a spinless particle of reduced mass $\mu$ in a central potential $V(r)$, separate $\psi(r,\theta,\phi)=R_{\ell}(r)Y_{\ell m}(\theta,\phi)$ and define $u(r)=rR_{\ell}(r)$. The radial equation is</p><p>$-\frac{\hbar^2}{2\mu}u''(r)+\left[V(r)+\frac{\hbar^2\ell(\ell+1)}{2\mu r^2}\right]u(r)=Eu(r)$ for $r>0$.</p><p>The second term is the angular-momentum contribution. For the usual regular hydrogenic solutions, $u(0)=0$ and the radial state must be normalizable. The radial probability in $[r,r+dr]$ is $|u(r)|^2dr$ when $Y_{\ell m}$ is normalized; it is not simply $|R(r)|^2dr$.</p><p>For a nonrelativistic point nucleus with charge $+Ze$ and reduced mass $\mu$, the Coulomb energies are $E_n=-\mu Z^2e^4/[2(4\pi\epsilon_0)^2\hbar^2n^2]$, with $n=1,2,\ldots$ and $\ell=0,\ldots,n-1$. For ordinary hydrogen, $E_n\approx-13.6\,\mathrm{eV}/n^2$. Fine structure, nuclear size, and external fields require additional terms.</p>` },
        examples: [
          example('A bound-state transition', S`Using $E_n=-13.6/n^2$ eV for hydrogen, determine the photon energy in the allowed $2p\to1s$ transition.`, [
            S`$E_2=-3.4$ eV and $E_1=-13.6$ eV.`,
            S`The atom loses $10.2$ eV. Energy conservation gives an emitted photon of energy $10.2$ eV, neglecting recoil and fine-structure corrections.`,
            S`The reverse transition requires absorption of that energy. Negative bound-state energies are measured relative to a separated electron and nucleus at rest.`
          ]),
          example('Separate radius from probability density', S`For the normalized hydrogenic ground-state radial function $R_{10}=2a^{-3/2}e^{-r/a}$, find the probability that $r<a$.`, [
            S`Include the spherical volume factor: $P(r<a)=\int_0^a |R_{10}|^2r^2\,dr=4\int_0^1 t^2e^{-2t}\,dt$ with $t=r/a$.`,
            S`Integrating gives $P(r<a)=1-5e^{-2}\approx0.3233$. It is a probability between 0 and 1.`,
            S`The scale $a$ sets the length; it cancels from this dimensionless probability. Replacing $a$ by a different Bohr scale does not change the probability at the same scaled radius.`
          ])
        ],
        exercises: [
          choice(S`What condition selects a normalizable regular hydrogenic radial solution?`,
            [S`$u$ is regular at $r=0$ and square-integrable on $[0,\infty)$.`, S`$u$ may grow exponentially as $r\to\infty$.`, S`$u(0)$ can be arbitrary with no regularity condition.`, S`$R(r)$ alone is integrated as a probability without any radial measure.`], 0,
            'Consider the origin and large-radius behavior.', S`Regularity at the origin and normalizability select physical bound states.`,
            {1:'Exponential growth is not square-integrable.',2:'The usual regular hydrogenic radial function has $u(0)=0$.',3:'The radial probability includes $r^2dr$ for a normalized angular factor.'}),
          choice(S`For a hydrogenic ion in the same reduced-mass approximation, how does the ground-state energy scale with $Z$?`,
            [S`$Z$`, S`$Z^2$`, S`$1/Z$`, S`Independent of $Z$`], 1, 'Inspect the Coulomb energy formula.', S`$E_1$ is proportional to $-Z^2$.`,
            {0:'The Coulomb energy is quadratic in nuclear charge at this level.',2:'The energy magnitude grows, rather than decreases, with $Z$.',3:'The nuclear charge changes the Coulomb potential and the bound-state scale.'})
        ],
        freeResponse: [number(S`For hydrogen with $E_n=-13.6/n^2$ eV, enter the energy in eV at $n=2$.`, -3.4,
          'Substitute the principal quantum number into the energy formula.', S`$E_2=-13.6/4=-3.4$ eV.`)]
      },
      {
        id: 'variational-bounds', title: 'Variational Bounds and Trial States',
        description: 'Use a trial family to obtain an upper bound and check whether its assumptions and parameter optimization are valid.',
        foundationRefs: [
          ref('landau-math', 'variational-calculus', 'A stationary functional gives an equation after allowed variations are specified.'),
          ref('landau-quantum-statistical', 'quantum-oscillator', 'The harmonic oscillator provides a benchmark with known ground-state energy.')
        ],
        whyExists: { html: S`<p>Exact eigenfunctions are often unavailable. A trial state turns a hard eigenvalue problem into an optimization while retaining an explicit inequality that tells you what the result can and cannot establish.</p>` },
        concept: { html: S`<p>Let $H$ be a self-adjoint Hamiltonian bounded below, with ground-energy infimum $E_0$. For every normalized trial state $\psi$ in the relevant energy form domain, the Rayleigh quotient obeys $E_0\leq\langle\psi|H|\psi\rangle$. Varying parameters can improve the upper bound. Equality requires a ground state in the trial family when the infimum is attained.</p><p>The inequality bounds the ground energy from above, not from below; a lower trial value is a better bound but does not by itself quantify the remaining error. Apply boundary conditions and normalization before evaluating the quotient. For excited-state bounds, impose suitable orthogonality conditions or use an appropriate min–max construction.</p><p>For $H=(p^2+x^2)/2$ in units $m=\omega=\hbar=1$, take $\psi_a(x)=(a/\pi)^{1/4}e^{-ax^2/2}$ with $a>0$. The Gaussian gives $\langle x^2\rangle=1/(2a)$ and $\langle p^2\rangle=a/2$, so $E(a)=(a+1/a)/4$. Its minimum occurs at $a=1$, with $E=1/2$.</p>` },
        examples: [
          example('Optimize a Gaussian oscillator trial', S`For the normalized oscillator trial $\psi_a$, compare $a=2$ with the optimized choice.`, [
            S`At $a=2$, $E(2)=(2+1/2)/4=5/8$.`,
            S`Differentiate: $E'(a)=(1-a^{-2})/4$, so the positive stationary point is $a=1$. Since $a+1/a\geq2$ for $a>0$, this is the global minimum.`,
            S`The optimized bound is $1/2$, equal here to the known oscillator ground energy. That equality occurs because this trial family contains the exact ground state.`
          ]),
          example('Shift a trial state', S`Use $\psi_d(x)=\pi^{-1/4}e^{-(x-d)^2/2}$ for the same oscillator. Find its energy as a function of real $d$.`, [
            S`The shifted Gaussian has $\langle x\rangle=d$, $\langle x^2\rangle=d^2+1/2$, and $\langle p^2\rangle=1/2$.`,
            S`Thus $E(d)=[1/2+d^2+1/2]/2=1/2+d^2/2$.`,
            S`The minimum is at $d=0$; at $d=2$ the bound is $5/2$. A trial family constrained away from the minimum still gives an upper bound but may be less informative.`
          ])
        ],
        exercises: [
          choice('What does a normalized trial energy of 4 imply if the variational assumptions hold?',
            ['The ground energy is at most 4.', 'The ground energy is at least 4.', 'The ground energy equals 4 for every trial.', 'The trial is necessarily an exact eigenstate.'], 0,
            'Recall the direction of the Rayleigh–Ritz inequality.', S`$E_0\leq E_{\rm trial}=4$.`,
            {1:'The variational inequality points in the other direction.',2:'Equality needs a suitable exact ground state in the trial family.',3:'A finite trial expectation need not be an eigenvalue.'}),
          choice(S`For $E(a)=(a+1/a)/4$ with $a>0$, which parameter minimizes the trial energy?`,
            ['$1/2$', '$1$', '$2$', '$4$'], 1, 'Differentiate or compare $a+1/a$ with 2.',
            S`$a+1/a\geq2$ with equality at $a=1$.`,
            {0:'At $a=1/2$ the value is $5/8$, above $1/2$.',2:'At $a=2$ the value is also $5/8$.',3:'At $a=4$ the value exceeds $1/2$.'})
        ],
        freeResponse: [number(S`For $E(a)=(a+1/a)/4$, enter the trial energy at $a=2$.`, 0.625,
          'Substitute $a=2$ before dividing by four.', S`$E(2)=(2+1/2)/4=5/8=0.625$.`)]
      },
      {
        id: 'wkb-turning-points', title: 'WKB, Turning Points, and Tunneling',
        description: 'Approximate slowly varying quantum motion and identify when turning-point or hard-wall conditions change the rule.',
        foundationRefs: [
          ref('landau-math-methods', 'asymptotic-methods', 'An asymptotic approximation needs a limit and an error interpretation.'),
          ref('landau-quantum-statistical', 'quantum-bound-states', 'Bound states depend on the boundary conditions of the potential.')
        ],
        whyExists: { html: S`<p>A wave changes phase where motion is classically allowed and decays where it is forbidden. WKB connects a differential equation to accumulated phase and gives a useful approximate spectrum when the potential changes slowly enough.</p>` },
        concept: { html: S`<p>For a one-dimensional potential with two smooth simple turning points $x_1<x_2$, define $p(x)=\sqrt{2m(E-V(x))}$ where $E>V(x)$. The leading WKB quantization condition is</p><p>$\int_{x_1}^{x_2}p(x)\,dx\approx\pi\hbar(n+1/2)$, with $n=0,1,2,\ldots$.</p><p>The half arises from matching at the two smooth turning points. The approximation is generally most reliable in a semiclassical regime where the local wavelength varies slowly away from turning points. It is not a universal exact identity; hard walls and singular boundaries require different phase conditions.</p><p>In a forbidden region $V>E$, set $\kappa(x)=\sqrt{2m(V-E)}/\hbar$. The leading exponential suppression of a thick barrier is proportional to $\exp[-2\int\kappa(x)\,dx]$; prefactors and reflections can matter. For thin barriers or resonances, solve or match the wavefunction instead of assuming this exponent is the whole answer.</p>` },
        examples: [
          example('Harmonic oscillator phase integral', S`For $V(x)=m\omega^2x^2/2$ with $\omega>0$, evaluate the allowed-region WKB integral.`, [
            S`The turning points are $\pm\sqrt{2E/(m\omega^2)}$. Substitute $x=x_0\sin\theta$ to obtain $\int_{-x_0}^{x_0}\sqrt{2m(E-m\omega^2x^2/2)}\,dx=\pi E/\omega$.`,
            S`Equating this to $\pi\hbar(n+1/2)$ gives $E_n\approx\hbar\omega(n+1/2)$. For the harmonic oscillator this leading result happens to equal the exact spectrum.`,
            S`The equality of this example does not imply WKB is exact for a general potential. Check the turning points and approximation regime in each new problem.`
          ]),
          example('A thick rectangular barrier', S`In units $\hbar=m=1$, a barrier has $V-E=2$ and width $L=1$. Find the leading exponential factor.`, [
            S`The decay constant is $\kappa=\sqrt{2(V-E)}=2$. The exponent is $-2\kappa L=-4$.`,
            S`The leading exponential factor is $e^{-4}\approx0.0183$. The actual transmission probability also contains a prefactor and is not identified with this number exactly.`,
            S`Increasing $L$ doubles the exponent magnitude when $L$ doubles. A narrow barrier can require the full matching solution.`
          ])
        ],
        exercises: [
          choice('Why does the smooth-turning-point WKB formula not automatically apply to an infinite square well?',
            ['A hard wall imposes a different boundary phase condition.', 'The wavefunction has no boundary conditions.', 'Its energy cannot be positive.', 'Every bound state has zero momentum.'], 0,
            'Compare a smooth turning point with an abrupt wall.',
            'An infinite wall imposes an abrupt boundary condition, so the smooth-turning-point phase correction does not apply unchanged.',
            {1:'The wavefunction must satisfy boundary conditions at the walls.',2:'The confined-particle energies are positive relative to the interior potential.',3:'Allowed standing waves have nonzero momentum components.'}),
          choice(S`For a forbidden region with constant $\kappa>0$, what happens to the leading suppression factor when the barrier width doubles?`,
            [S`$e^{-2\kappa L}$ becomes $e^{-4\kappa L}$.`, S`It becomes $2e^{-2\kappa L}$.`, S`It stays unchanged.`, S`It becomes $e^{2\kappa L}$.`], 0,
            'Use the integral of the constant decay rate over the new width.',
            S`Doubling $L$ doubles the negative exponent: $e^{-4\kappa L}$.`,
            {1:'Width appears in the exponent, not only as an outside multiplier.',2:'The integral of the decay constant grows with width.',3:'A positive exponent would grow rather than suppress transmission.'})
        ],
        freeResponse: [number(S`For the oscillator phase integral $\int p\,dx=\pi E/\omega$, let $E=3$ and $\omega=1$. Enter the coefficient $c$ in $\int p\,dx=c\pi$.`, 3,
          'Substitute the given energy and frequency.', S`$\pi E/\omega=3\pi$, so $c=3$.`)]
      }
    ]
  });
})();
