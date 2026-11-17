/* Original preparation material; toy models are not full QED calculations. */
(function () {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];
  const R = String.raw;
  const topicRefs = {
    'advanced-scattering-cross-sections': [
      { moduleId: 'landau-quantum-statistical', topicId: 'quantum-dynamics', note: 'Quantum amplitudes and the Born rule help interpret the angular distribution.' },
      { moduleId: 'landau-fields-relativity', topicId: 'qed-introduction', note: 'Scattering relates calculations in field theory to experimental rates.' }
    ],
    'advanced-propagators-and-cutoffs': [
      { moduleId: 'calculus2', topicId: 'first-order-differential-equations', note: 'Linear differential operators and boundary conditions motivate the Green function.' },
      { moduleId: 'landau-fields-relativity', topicId: 'qed-introduction', note: 'Distinguish the toy Euclidean inverse operator from field-theory propagators.' }
    ],
    'advanced-anisotropic-dielectrics': [
      { moduleId: 'landau-fields-relativity', topicId: 'fields-in-matter', note: 'Macroscopic displacement and constitutive laws introduce material response.' },
      { moduleId: 'calculus-3', topicId: 'vectors', note: 'Components and dot products connect direction to stored field energy.' }
    ],
    'advanced-dispersion-lorentz': [
      { moduleId: 'landau-fields-relativity', topicId: 'fields-in-matter', note: 'The displacement field and polarization define the material response.' },
      { moduleId: 'landau-mechanics', topicId: 'mechanics-oscillations', note: 'A damped driven oscillator supplies the frequency-response model.' }
    ],
    'advanced-running-couplings': [
      { moduleId: 'landau-fields-relativity', topicId: 'qed-introduction', note: 'Perturbation theory and the role of a coupling in QED motivate studying scale dependence.' },
      { moduleId: 'calculus2', topicId: 'first-order-differential-equations', note: 'Separating variables solves the model scale-evolution equation.' }
    ]
  };
  const topics = [
{
  id: 'advanced-scattering-cross-sections',
  title: 'Scattering, solid angle, and cross sections',
  description: 'Turn an incident flux and an angular distribution into a detector count, while keeping area and solid-angle units explicit.',
  whyExists: String.raw`<p>A cross section converts the flux of an incoming beam into an event rate. It is an effective area for a specified process, not necessarily the physical area of the target. A differential cross section also describes where the outgoing particles go. This distinction links integration over angles, experimental counts, and the scattering amplitude of quantum mechanics.</p>`,
  concept: { html: String.raw`<p>Let $J$ be the incident flux in particles per unit area per unit time and let $N$ be the number of independent targets. For a detector covering a region $D$ of outgoing directions, the ideal event rate is $R_D=NJ\int_D(d\sigma/d\Omega)\,d\Omega$. Here $d\sigma/d\Omega$ has units of area per steradian. If the differential cross section depends on direction, integrate the distribution; total cross section alone does not specify the detector rate.</p><p>In spherical coordinates, $d\Omega=\sin\theta\,d\theta\,d\phi$. A full sphere covers $4\pi$ steradians. A cone from $\theta=0$ to $\theta=\alpha$ covers $\Omega_D=2\pi(1-\cos\alpha)$. For an isotropic distribution $d\sigma/d\Omega=A$ constant, $\sigma_{\rm tot}=4\pi A$ and $\sigma_D=A\Omega_D$. In an anisotropic distribution, area fraction alone does not give the event fraction.</p><p>The counting formula assumes the same incident flux reaches each target, independent interactions, and ideal detection. Attenuation, multiple scattering, detector efficiency, and background require additional factors or a transport model. In a quantum single-channel scattering convention, $d\sigma/d\Omega=|f(\theta,\phi)|^2$; the amplitude $f$ has units of length, and coherent amplitudes must be added before squaring.</p><p>To choose a method, first identify the incident flux, target count, process and detector angle. Check that integrating over the full sphere recovers the stated total. The same angular integral appears in radiation patterns and kinetic collision models, but their physical amplitudes need not be isotropic.</p>` },
  examples: [
    { title: 'Count an isotropic signal in a polar cap', problem: String.raw`A dilute target contains $N=4$ independent scatterers. An incident beam has $J=100$ particles cm$^{-2}$ s$^{-1}$. Suppose $d\sigma/d\Omega=2$ cm$^2$ sr$^{-1}$ for all directions. Find the ideal rate in a detector covering $0\leq\theta\leq\pi/3$ and all azimuths.`, steps: [
      { title: 'Compute the accepted solid angle', content: String.raw`$\Omega_D=2\pi(1-\cos(\pi/3))=\pi$ sr, one quarter of the full sphere.` },
      { title: 'Integrate and multiply by flux', content: String.raw`$\sigma_D=(2\ {\rm cm}^2/{\rm sr})(\pi\ {\rm sr})=2\pi\ {\rm cm}^2$. Therefore $R_D=4(100)(2\pi)=800\pi$ events per second. The area units cancel against those in $J$.` },
      { title: 'Check the model', content: String.raw`The full-sphere rate would be $NJ(8\pi)=3200\pi$ s$^{-1}$, so the cap receives one quarter. This assumes isotropy, no attenuation, and perfect efficiency.` }
    ] },
    { title: 'Anisotropy changes the detector fraction', problem: String.raw`Let $d\sigma/d\Omega=A(1+\cos\theta)$ with $A>0$. What fraction of the total is scattered into the forward hemisphere $0\leq\theta\leq\pi/2$?`, steps: [
      { title: 'Integrate over the hemisphere', content: String.raw`With $u=\cos\theta$, $\sigma_F=2\pi A\int_0^{\pi/2}(1+\cos\theta)\sin\theta\,d\theta=2\pi A(1+1/2)=3\pi A$.` },
      { title: 'Compare with the full sphere', content: String.raw`The integral of $\cos\theta$ over the whole sphere is zero, so $\sigma_{\rm tot}=4\pi A$. The forward fraction is $3/4$, not the hemisphere's area fraction $1/2$.` },
      { title: 'Transfer check', content: String.raw`For $A(1-\cos\theta)$ the total remains $4\pi A$ but the forward fraction is $1/4$. The angular distribution, not the total alone, controls acceptance.` }
    ] }
  ],
  exercises: [
    { difficulty: 'medium', question: String.raw`For isotropic scattering with total cross section $8$ cm$^2$, what cross section enters a polar cap of solid angle $\pi$ sr?`, options: ['$1$ cm$^2$', '$2$ cm$^2$', '$4$ cm$^2$', '$8$ cm$^2$'], correctIndex: 1, hint: String.raw`<p>Compare the cap solid angle with the $4\pi$ sr of the full sphere.</p>`, correctExplanation: String.raw`The cap covers one quarter of the directions, so isotropy gives $8/4=2$ cm$^2$.`, wrongExplanations: { 0: 'The cap fraction is one quarter, not one eighth.', 2: 'A fraction of one half would correspond to a hemisphere.', 3: 'The full cross section corresponds to all directions.' } },
    { difficulty: 'medium', question: String.raw`If $d\sigma/d\Omega=A(1+\cos\theta)$, what fraction of the total lies in the backward hemisphere?`, options: ['$1/4$', '$1/2$', '$3/4$', '$1$'], correctIndex: 0, hint: String.raw`<p>Integrate $\sin\theta(1+\cos\theta)$ from $\pi/2$ to $\pi$, then compare with the full-sphere integral.</p>`, correctExplanation: String.raw`The backward integral is $\pi A$, while the full sphere gives $4\pi A$; the fraction is $1/4$.`, wrongExplanations: { 1: 'Equal hemispheres require an isotropic distribution.', 2: 'Three quarters is the forward fraction.', 3: 'The forward hemisphere also has nonzero scattering.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: String.raw`An isotropic process has total cross section $12$ cm$^2$. Find the cross section in a detector accepting one quarter of the full solid angle. Enter the numerical value in cm$^2$.`, accept: [3], placeholder: 'Enter a number', hint: '<p>For an isotropic process, multiply the total by the accepted solid-angle fraction.</p>', explanation: String.raw`$12(1/4)=3$ cm$^2$. The conclusion depends on the stated isotropy.` }
  ]
},
{
  id: 'advanced-propagators-and-cutoffs',
  title: 'Green functions, cutoffs, and a renormalization model',
  description: 'Interpret a propagator as an inverse differential operator and separate a cutoff-dependent quantity from a finite comparison.',
  whyExists: String.raw`<p>Green functions turn a source into a response. Fourier transformation can turn differentiation into multiplication, making an inverse operator visible. In quantum field theory, propagators and loop integrals use related mathematics, but their time-ordering, spacetime dimension, particle content, and renormalization rules matter. A simple model can teach the method without pretending to calculate a QED loop.</p>`,
  concept: { html: String.raw`<p>On the infinite real line, take $m>0$ with units of inverse length and define $L=-d^2/dx^2+m^2$. Its decaying Green function satisfies $LG(x)=\delta(x)$ and is $G(x)=e^{-m|x|}/(2m)$. Away from $x=0$ it solves the homogeneous equation. Across zero, $G'(0^+)-G'(0^-)=-1$, so the negative second derivative supplies the unit delta source. For a suitable localized source $s$, the decaying solution is $u(x)=\int_{-\infty}^{\infty}G(x-y)s(y)\,dy$.</p><p>With $\widetilde G(k)=\int e^{-ikx}G(x)\,dx$, $\widetilde G(k)=1/(k^2+m^2)$. This one-dimensional Euclidean Green function is not the Minkowski-space photon propagator. On a finite interval, the boundary conditions change the inverse operator and its Green function.</p><p>For a separate cutoff illustration, define $I(\Lambda,m)=\int_0^\Lambda q\,dq/(q^2+m^2)=\tfrac12\log[(\Lambda^2+m^2)/m^2]$, with $\Lambda,m>0$ in the same units. It grows logarithmically as $\Lambda\to\infty$. Choose a positive reference scale $\mu$ and compare $I(\Lambda,m)-I(\Lambda,\mu)$. The common cutoff dependence cancels and the limit is $\log(\mu/m)$.</p><p>This subtraction models the idea of fixing a parameter at a reference condition before comparing predictions. It is a mathematical toy integral, not a complete QED loop amplitude or proof of renormalizability. Actual calculations require the relevant fields, regulator, symmetry constraints, counterterms, and a specified renormalization scheme. A logarithm must act on a dimensionless ratio.</p>` },
  examples: [
    { title: 'Check a one-dimensional propagator', problem: String.raw`For $m=2$ m$^{-1}$, evaluate the Green function at the source and at $x=0.5$ m.`, steps: [
      { title: 'Insert the scale', content: String.raw`$G(0)=1/(2m)=0.25$ m. Since $m|x|=1$, $G(0.5\ {\rm m})=e^{-1}/4$ m, about $0.0920$ m.` },
      { title: 'Check the defining equation', content: String.raw`For $x>0$, $G'(x)=-e^{-2x}/2$; for $x<0$, $G'(x)=e^{2x}/2$, using meters consistently. The derivative jump is $-1$, so $-G''$ contains $+\delta(x)$, while $-G''+m^2G=0$ elsewhere.` },
      { title: 'Interpret the result', content: String.raw`The length $1/m=0.5$ m sets the exponential response scale. A different boundary condition or operator requires a different Green function.` }
    ] },
    { title: 'Compare two cutoff integrals', problem: String.raw`For the toy integral $I$, calculate $I(\Lambda,m)$ at $\Lambda=\sqrt3\,m$ and find $\lim_{\Lambda\to\infty}[I(\Lambda,m)-I(\Lambda,2m)]$.`, steps: [
      { title: 'Evaluate at finite cutoff', content: String.raw`$I(\sqrt3\,m,m)=\tfrac12\log(4)=\log2$. Both quantities inside the logarithm have the same units.` },
      { title: 'Subtract before the limit', content: String.raw`$I(\Lambda,m)-I(\Lambda,2m)=\tfrac12\log[(\Lambda^2+m^2)/(\Lambda^2+4m^2)]+\log2$. The first term tends to zero, leaving $\log2$.` },
      { title: 'Interpret the operation', content: String.raw`Each integral separately grows without bound; their difference has a finite limit. This illustrates cutoff cancellation in a controlled model and does not calculate a physical QED amplitude.` }
    ] }
  ],
  exercises: [
    { difficulty: 'medium', question: String.raw`For $G(x)=e^{-m|x|}/(2m)$, which condition makes $(-d^2/dx^2+m^2)G=\delta(x)$ at $x=0$?`, options: [String.raw`$G'(0^+)-G'(0^-)=-1$`, String.raw`$G'(0^+)-G'(0^-)=1$`, String.raw`$G(0)=0$`, String.raw`$G$ is constant`], correctIndex: 0, hint: String.raw`<p>Integrate the differential equation over a small interval around zero; the $m^2G$ integral tends to zero.</p>`, correctExplanation: String.raw`The integral of $-G''$ is the negative derivative jump, so a unit delta requires jump $-1$.`, wrongExplanations: { 1: 'A positive jump gives a negative delta under the minus sign in the operator.', 2: 'The Green function is continuous and equals $1/(2m)$ at zero.', 3: 'A constant cannot produce the localized delta source.' } },
    { difficulty: 'medium', question: String.raw`What is $\lim_{\Lambda\to\infty}[I(\Lambda,m)-I(\Lambda,2m)]$ for the toy integral above?`, options: [String.raw`$0$`, String.raw`$\log 2$`, String.raw`$\log m$`, String.raw`$\infty$`], correctIndex: 1, hint: String.raw`<p>Subtract the two logarithms before taking the limit; retain the dimensionless mass ratio.</p>`, correctExplanation: String.raw`The cutoff-dependent ratio tends to 1 and the remaining term is $\log(2m/m)=\log2$.`, wrongExplanations: { 0: 'The mass-ratio term remains after the common divergence cancels.', 2: 'A logarithm must have a dimensionless argument; the mass scale appears as a ratio.', 3: 'Each term diverges separately, but their stated difference has a finite limit.' } }
  ],
  freeResponse: [
    { difficulty: 'medium', question: String.raw`For $m=4$ m$^{-1}$, enter the numerical value of $G(0)$ in meters.`, accept: [0.125, '1/8'], placeholder: 'Enter a number or fraction', hint: String.raw`<p>At the source, $e^{-m|0|}=1$.</p>`, explanation: String.raw`$G(0)=1/(2m)=1/8$ m $=0.125$ m.` }
  ]
},
{
  id: 'advanced-anisotropic-dielectrics',
  title: 'Anisotropic Dielectrics and Energy',
  description: 'Use a constitutive tensor to connect electric field, displacement, orientation and stored energy.',
  concept: { html: String.raw`
    <p>A material law adds information to Maxwell's equations. In a homogeneous, linear, nondispersive dielectric, write $\mathbf D=\epsilon_0\boldsymbol{\epsilon}_r\mathbf E$, where $\mathbf E$ has units V/m, $\mathbf D$ has units C/m², and the relative permittivity tensor $\boldsymbol{\epsilon}_r$ is dimensionless. The law applies in the specified linear regime; it is not a universal law for every field strength or frequency.</p>
    <p>For a real, symmetric, positive-definite tensor, mutually perpendicular principal axes diagonalize the response. In those axes, $D_i=\epsilon_0\epsilon_iE_i$ with positive principal values $\epsilon_i$. Each component scales differently. Consequently $\mathbf D$ need not be parallel to $\mathbf E$: a scalar permittivity would erase the directional information.</p>
    <p>For this nondispersive linear model the electric energy density is $u=\frac12\mathbf E\cdot\mathbf D$ in J/m³. Positive definiteness makes this positive for every nonzero field. Do not use this simple expression unchanged for a lossy or dispersive material; then the history and frequency dependence of the response matter.</p>
    <p>To change coordinates, transform both the vector components and the tensor consistently. An eigenvector gives a field direction that remains parallel to its displacement. The same linear-map reasoning applies to elasticity, conductivity, and moment-of-inertia tensors, but their physical units and constitutive assumptions differ. See <a href="https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-spring-2009/pages/lecture-notes/" target="_blank" rel="noopener noreferrer">MIT notes on anisotropic media</a>.</p>
  ` },
  examples: [
    {
      title: 'A field and displacement point in different directions',
      problem: String.raw`In principal axes let $\boldsymbol{\epsilon}_r=\operatorname{diag}(2,4)$ and $\mathbf E=(3,4)$ V/m. Find $\mathbf D/\epsilon_0$ and compare directions.`,
      steps: [
        { title: 'Apply the map component by component', content: String.raw`$\mathbf D/\epsilon_0=(2\cdot3,4\cdot4)=(6,16)$ V/m. Multiplying by $\epsilon_0$ produces C/m².` },
        { title: 'Compare directions without rounding', content: String.raw`The component ratios are $D_x/E_x=2\epsilon_0$ and $D_y/E_y=4\epsilon_0$, so no single scalar multiplies the nonzero components of $\mathbf E$ into $\mathbf D$. Their slopes are $4/3$ and $16/6=8/3$, respectively.` },
        { title: 'Test an edge case', content: String.raw`If the field lies along either principal axis, only one component is nonzero and $\mathbf D$ is parallel to $\mathbf E$. Anisotropy does not make every field direction nonparallel.` }
      ]
    },
    {
      title: 'Energy is a quadratic form',
      problem: String.raw`For the same tensor and field, compute the energy density as a multiple of $\epsilon_0$.`,
      steps: [
        { title: 'Use the symmetric linear law', content: String.raw`$u=\tfrac12\mathbf E\cdot\mathbf D=\tfrac12\epsilon_0[3(6)+4(16)]$.` },
        { title: 'Calculate and check units', content: String.raw`The result is $41\epsilon_0(\mathrm{V/m})^2$, which has units J/m³. The positive value agrees with the positive principal permittivities.` },
        { title: 'Transfer', content: String.raw`If $\mathbf E$ doubles while the linear law remains valid, both $\mathbf D$ and $\mathbf E$ double, so $u$ becomes four times as large. This is a check of the quadratic form.` }
      ]
    }
  ],
  exercises: [
    {
      difficulty: 'medium',
      question: String.raw`For $\boldsymbol{\epsilon}_r=\operatorname{diag}(3,2)$ and $\mathbf E=(2,1)$ V/m, what is $\mathbf D/\epsilon_0$ in V/m?`,
      options: [String.raw`$(6,2)$`, String.raw`$(5,3)$`, String.raw`$(2/3,1/2)$`, String.raw`$(3,2)$`],
      correctIndex: 0,
      hint: '<p>Multiply each principal-axis component by its corresponding principal permittivity.</p>',
      correctExplanation: String.raw`$\boldsymbol{\epsilon}_r\mathbf E=(3\cdot2,2\cdot1)=(6,2)$.`,
      wrongExplanations: { 1: 'A diagonal map multiplies components rather than adding them.', 2: 'Dividing would apply the inverse map, not the stated constitutive law.', 3: 'This is the diagonal of the tensor, not its product with the field.' }
    },
    {
      difficulty: 'medium',
      question: String.raw`For a linear, real, symmetric and nondispersive dielectric, what happens to $u=\frac12\mathbf E\cdot\mathbf D$ if the field is tripled within the same linear regime?`,
      options: ['It triples.', 'It becomes nine times as large.', 'It becomes one third as large.', 'It is unchanged.'],
      correctIndex: 1,
      hint: '<p>The displacement also changes under the linear constitutive law.</p>',
      correctExplanation: 'Both field and displacement acquire a factor of three, so their dot product acquires a factor of nine.',
      wrongExplanations: { 0: 'This accounts for only one of the two factors in the energy density.', 2: 'A larger field does not invert the linear response.', 3: 'The quadratic energy depends on field magnitude.' }
    }
  ],
  freeResponse: [
    {
      difficulty: 'easy',
      question: String.raw`In principal axes $\boldsymbol{\epsilon}_r=\operatorname{diag}(3,2)$ and $\mathbf E=(2,1)$ V/m. Enter the numerical value of $D_y/\epsilon_0$ in V/m.`,
      accept: [2], placeholder: 'Enter a number', hint: '<p>Use the second diagonal entry and the second field component.</p>',
      explanation: String.raw`$D_y/\epsilon_0=2(1)=2$ V/m.`, solution: String.raw`The second component of the stated matrix product is $2\cdot1=2$ V/m.`
    }
  ]
},
{
  id: 'advanced-dispersion-lorentz',
  title: 'Dispersion and a Damped Resonance',
  description: 'Derive a frequency-dependent response and use its real and imaginary parts with a stated time convention.',
  concept: { html: String.raw`
    <p>Polarization can lag behind an applied field because bound charges have inertia and damping. For a simple linear, homogeneous, isotropic model, use angular frequencies in rad/s and the peak-phasor convention $\mathbf E(t)=\operatorname{Re}(\mathbf E_0e^{-i\omega t})$. A driven damped oscillator gives</p>
    <p>$\chi(\omega)=\dfrac{\omega_p^2}{\omega_0^2-\omega^2-i\gamma\omega}$ and $\epsilon_r(\omega)=1+\chi(\omega)$.</p>
    <p>Here $\omega_0>0$ is the natural frequency, $\omega_p^2>0$ sets oscillator strength, and $\gamma>0$ is a damping rate in s⁻¹. The real part of $\chi$ describes the in-phase part of the polarization; the imaginary part describes its quadrature component. With this $e^{-i\omega t}$ convention, a passive oscillator has $\operatorname{Im}\chi(\omega)>0$ for $\omega>0$. The sign reverses under the opposite phasor convention.</p>
    <p>The oscillator equation is a causal initial-value model: the response follows its driving field, and damping removes the transient. The formula is its steady-state frequency response, not an assertion that all real materials have one resonance. At frequencies near additional resonances, with nonlinear response, or where spatial dispersion matters, use an appropriate broader model.</p>
    <p>For the stated peak-field convention, the cycle-averaged absorbed power per unit volume is $\overline p=\frac12\omega\epsilon_0\operatorname{Im}\chi\,|E_0|^2$ for the electric response alone. It is nonnegative for this passive model at positive frequency. The static limit is $\chi(0)=\omega_p^2/\omega_0^2$; setting damping to zero exactly at resonance makes the steady-state denominator vanish, so that limiting formula cannot yield a finite resonant amplitude. See <a href="https://ocw.mit.edu/courses/2-58j-radiative-transfer-spring-2006/be80471d162aada020376bee27e33870_chap6_solid_prop.pdf" target="_blank" rel="noopener noreferrer">MIT notes on the Lorentz model</a>.</p>
  ` },
  examples: [
    {
      title: 'Resolve the complex susceptibility',
      problem: String.raw`Let $\omega_0=2$ rad/s, $\omega_p=2$ rad/s, $\gamma=1$ s⁻¹ and $\omega=1$ rad/s. Find $\chi$ and $\epsilon_r$.`,
      steps: [
        { title: 'Insert values with compatible units', content: String.raw`$\chi=4/(4-1-i)=4/(3-i)$. Every term in the denominator has units s⁻², so $\chi$ is dimensionless.` },
        { title: 'Multiply by the conjugate', content: String.raw`$4/(3-i)=4(3+i)/(3^2+1^2)=1.2+0.4i$. Thus $\epsilon_r=2.2+0.4i$.` },
        { title: 'Check the interpretation', content: String.raw`The positive imaginary part at positive frequency agrees with passive absorption under the declared $e^{-i\omega t}$ convention. Changing conventions changes the sign of the displayed imaginary part, not the physical absorbed power.` }
      ]
    },
    {
      title: 'Compare static and resonant driving',
      problem: String.raw`For the same parameters, compare $\chi(0)$ and $\chi(\omega_0)$.`,
      steps: [
        { title: 'Static response', content: String.raw`$\chi(0)=4/4=1$, so $\epsilon_r(0)=2$.` },
        { title: 'Finite damping at resonance', content: String.raw`At $\omega=2$ rad/s, $\chi=4/(-2i)=2i$, so $\epsilon_r=1+2i$. The response is in quadrature with the field under this convention.` },
        { title: 'Check a model boundary', content: String.raw`The nonzero $\gamma$ keeps the resonant denominator nonzero. A lossless oscillator driven indefinitely exactly at its natural frequency does not have this finite steady-state solution.` }
      ]
    }
  ],
  exercises: [
    {
      difficulty: 'medium',
      question: String.raw`With $\omega_0=2$ rad/s, $\omega_p=2$ rad/s, and $\gamma=1$ s⁻¹, what is the static relative permittivity of the stated Lorentz model?`,
      options: ['$1$', '$2$', '$3$', '$4$'], correctIndex: 1,
      hint: '<p>Set the driving frequency to zero before adding the vacuum contribution.</p>',
      correctExplanation: String.raw`$\chi(0)=\omega_p^2/\omega_0^2=4/4=1$, so $\epsilon_r(0)=1+1=2$.`,
      wrongExplanations: { 0: 'This is the susceptibility; relative permittivity also includes the vacuum contribution 1.', 2: 'The static susceptibility is 1, not 2.', 3: 'The ratio of squared frequencies is 1, and the vacuum contribution adds 1.' }
    },
    {
      difficulty: 'medium',
      question: String.raw`Under the stated $e^{-i\omega t}$ convention, what sign does $\operatorname{Im}\chi$ have for $\omega>0$ in this damped passive model?`,
      options: ['Positive', 'Negative', 'Always zero', 'Its sign is unspecified even after the model and convention are fixed'],
      correctIndex: 0,
      hint: String.raw`<p>Write the denominator as $a-ib$ with $b=\gamma\omega>0$ and multiply by $a+ib$.</p>`,
      correctExplanation: String.raw`$\operatorname{Im}\chi=\omega_p^2\gamma\omega/[(\omega_0^2-\omega^2)^2+\gamma^2\omega^2]>0$.`,
      wrongExplanations: { 1: 'Negative imaginary susceptibility corresponds to the opposite phasor convention for this passive response.', 2: 'Positive damping and positive frequency give a positive numerator.', 3: 'The stated convention and positive oscillator strength, damping and frequency determine the sign.' }
    }
  ],
  freeResponse: [
    {
      difficulty: 'easy',
      question: String.raw`For $\omega_0=3$ rad/s, $\omega_p=\sqrt{13}$ rad/s, $\gamma=1$ s⁻¹ and $\omega=3$ rad/s, enter $\operatorname{Im}\chi(\omega)$ for this model.`,
      accept: ['13/3'], placeholder: 'Enter a number or fraction', hint: '<p>At resonance the real part of the denominator vanishes. Divide by the remaining imaginary term.</p>',
      explanation: String.raw`At $\omega=\omega_0$, $\chi=13/(-3i)=13i/3$, so its imaginary part is $13/3$.`,
      solution: String.raw`The denominator is $9-9-3i=-3i$. Multiplying numerator and denominator by $i$ gives $13i/3$, whose imaginary part is $13/3$.`
    }
  ]
},

    {
      id: 'advanced-running-couplings',
      title: 'Running Couplings and Renormalization Conditions',
      description: 'Solve a scale-evolution model and distinguish a reference convention from a measurable prediction.',
      concept: { html: R`<p><strong>What is changing?</strong> In a quantum field theory, a coupling defined at one reference scale need not have the same numerical value when a different reference scale is used. A renormalization condition specifies how the parameter is defined from a chosen reference quantity. A physical prediction must be compared consistently at the same perturbative order and does not become arbitrary merely because this reference scale was chosen.</p>
<p>To practice the mathematics, consider a deliberately simplified dimensionless model $g(\mu)$ with $\mu>0$ and $\mu_0>0$, satisfying $\mu\,dg/d\mu=b g^2$ for constant $b>0$. The ratio $\mu/\mu_0$ is dimensionless, so its logarithm is defined. Separating variables gives $1/g(\mu)=1/g_0-b\ln(\mu/\mu_0)$ and hence $g(\mu)=g_0/[1-bg_0\ln(\mu/\mu_0)]$, where $g_0=g(\mu_0)\ne0$.</p>
<p>The constant solution $g\equiv0$ also solves the equation; dividing by $g^2$ excludes it from the nonzero derivation. For positive $g_0$, the nonzero solution increases with $\mu$ while its denominator is positive. Its formal pole occurs where $bg_0\ln(\mu/\mu_0)=1$. Near the pole a small-coupling approximation has already failed, so the pole does not establish what an actual material or quantum field theory does. The coefficient $b$, the coupling definition, thresholds and higher terms must come from the particular theory; this exercise is not a computed QED beta function.</p>
<p><strong>Transfer:</strong> The method is an initial-value problem in the variable $\ln\mu$. The same calculation occurs for any quantity governed by $dg/dt=bg^2$, but its physical meaning depends on the model. Always state the starting value, the dimensionless scale ratio and the range in which the approximation is credible.</p>
<p>For an expanded treatment of renormalization in field theory, see the <a href="https://www.slac.stanford.edu/econf/C0605151/progfiles/notes/maxwell1.pdf" target="_blank" rel="noopener noreferrer">SLAC lecture notes on renormalization and running coupling</a>.</p>` },
      examples: [
        {
          title: 'Evolve upward by one logarithmic unit',
          problem: R`Let $g_0=1/10$ and $b=1$. In the toy model find $g(e\mu_0)$.`,
          steps: [
            { title: 'Use a dimensionless ratio', content: R`$\ln((e\mu_0)/\mu_0)=1$.`, why: 'A logarithm takes a dimensionless argument.' },
            { title: 'Solve using the initial condition', content: R`$g(e\mu_0)=(1/10)/(1-1/10)=1/9$.`, why: 'Use the same coupling definition at both scales.' },
            { title: 'Check direction', content: R`Since $b g^2>0$, the increase from $1/10$ to $1/9$ has the expected sign. The denominator is $0.9$, far from its formal zero.`, why: 'The sign check tests the algebra but does not establish the model for real QED.' }
          ]
        },
        {
          title: 'Reverse the change of scale',
          problem: R`For the same model, find $g(\mu_0/e)$ and the formal pole scale. Do not interpret the pole as a reliable prediction.`,
          steps: [
            { title: 'Evaluate the logarithm', content: R`$\ln((\mu_0/e)/\mu_0)=-1$, giving $g(\mu_0/e)=(1/10)/(1+1/10)=1/11$.`, why: 'Reducing the scale changes the sign of the logarithm.' },
            { title: 'Find the denominator zero', content: R`$1-(1/10)\ln(\mu/\mu_0)=0$ gives $\mu=e^{10}\mu_0$.`, why: 'The denominator, not the numerator, determines this algebraic singularity.' },
            { title: 'Assess the range', content: R`As the denominator approaches zero, $g$ is no longer small. A calculation that kept only this model term cannot be trusted at the pole.`, why: 'Do not extrapolate a perturbative model past its range.' }
          ]
        }
      ],
      exercises: [
        {
          difficulty: 'medium',
          question: R`In the toy equation $\mu\,dg/d\mu=b g^2$ with $b>0$ and $g>0$, what is the sign of $dg/d\ln\mu$?`,
          options: ['Positive', 'Negative', 'Zero', 'Undetermined from the model'],
          correctIndex: 0,
          hint: '<p>Differentiate with respect to the logarithm of the scale.</p>',
          correctExplanation: R`$dg/d\ln\mu=\mu\,dg/d\mu=bg^2>0$.`,
          wrongExplanations: { 1: 'The square and positive coefficient make the derivative positive.', 2: 'The derivative is positive for nonzero g.', 3: 'The signs of b and g are given.' }
        },
        {
          difficulty: 'medium',
          question: R`For $g_0=1/10$ and $b=1$, the toy solution has a formal pole at $\mu=e^{10}\mu_0$. What follows from that pole?`,
          options: ['The truncated model ceases to be trustworthy near the pole', 'Full QED is proven to diverge exactly at this scale', 'Every physical observable becomes infinite there', 'The dimensionless scale ratio is undefined'],
          correctIndex: 0,
          hint: '<p>Check the small-coupling assumption near a zero denominator.</p>',
          correctExplanation: 'The coupling becomes large, so this simple perturbative model cannot justify its own extrapolation to the pole.',
          wrongExplanations: { 1: 'This toy coefficient and equation are not a calculation of QED.', 2: 'A parameter in a truncated model does not by itself fix every observable.', 3: 'The positive ratio is well-defined; the denominator vanishes.' }
        }
      ],
      freeResponse: [
        {
          difficulty: 'medium',
          question: R`For $g_0=1/10$, $b=1$, and $\mu=e^2\mu_0$, enter the toy-model value $g(\mu)$ as a decimal or equivalent fraction.`,
          accept: ['1/8'],
          placeholder: 'Enter a number or fraction',
          hint: R`<p>Use $\ln(e^2)=2$ and simplify the denominator before dividing.</p>`,
          explanation: R`$g(\mu)=(1/10)/(1-2/10)=(1/10)/(4/5)=1/8$.`,
          solution: R`$g(e^2\mu_0)=(1/10)/[1-(1/10)\ln(e^2)]=(1/10)/(4/5)=1/8$.`
        }
      ]
    }
  ];
  topics.forEach(topic => {
    if (!topic.foundationRefs && topicRefs[topic.id]) topic.foundationRefs = topicRefs[topic.id];
  });
  window.MATH_MODULES.push({
    id: 'landau-advanced-fields',
    order: 26,
    title: 'Advanced Fields and Media',
    description: 'Scattering, propagators, scale dependence, and material response with explicit models and limits.',
    topics
  });
})();
