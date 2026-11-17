/* Suggested connections between lessons. These are paths, not a claim that
   all prerequisites are linear or that the full examination is covered. */
(function () {
  const stages = [
    { title: '1. Quantities and reasoning', description: 'Make sense of operations, units, statements, and proof before using them in models.', items: [
      ['foundations', 'number-systems', 'What number systems permit and why division needs a nonzero divisor.'],
      ['foundations', 'basic-arithmetic', 'Use operations as relationships between quantities, not only as procedures.'],
      ['mathematical-meaning', null, 'Explore what operations, functions, equality, and models mean across different situations.'],
      ['foundations', 'proof-techniques', 'Distinguish examples from arguments that cover every allowed case.']
    ] },
    { title: '2. Equations, shape, and functions', description: 'Translate a situation into constraints; use diagrams and equations to check each other.', items: [
      ['beginning-algebra', 'linear-equations-one-var', 'Use equality-preserving operations to solve and check an equation.'],
      ['beginning-algebra', 'systems-linear', 'Find conditions that hold together and interpret intersections.'],
      ['geometry', 'triangles', 'Use triangle relationships only under their stated assumptions.'],
      ['precalculus', 'functions-domain-range', 'Treat a function as a rule with an explicit domain and outputs.'],
      ['precalculus', 'systems-matrices', 'Use matrices as a first language for linear systems.']
    ] },
    { title: '3. Oscillation and change', description: 'Angles, limits, derivatives, and integrals provide complementary descriptions of motion and accumulation.', items: [
      ['trigonometry', 'unit-circle', 'Connect angle, coordinates, and periodic motion.'],
      ['trigonometry', 'trig-graphs-inverse', 'Understand periodic graphs and inverse-function branches.'],
      ['calculus-1', 'limits-continuity', 'Explain a limiting value before applying derivative and integral rules.'],
      ['calculus-1', 'derivatives', 'Interpret a derivative as local rate and linear approximation.'],
      ['calculus1', 'integration-ftc', 'Connect rates to signed accumulation and initial conditions.'],
      ['calculus-2', 'taylor-series', 'Approximate locally and check the range and error.']
    ] },
    { title: '4. Mathematical methods', description: 'Linear maps, differential equations, vector calculus, and probability branch from the earlier tools and meet again in physical models.', items: [
      ['calculus-3', 'vectors', 'Represent magnitude, direction, and components.'],
      ['calculus3', 'vector-fields-line-integrals', 'Describe fields and accumulation along paths.'],
      ['calculus2', 'first-order-differential-equations', 'Use a rate law and an initial condition to predict change.'],
      ['probability-statistics', 'random-variables', 'Model outcomes, expectations, and uncertainty.'],
      ['landau-math', 'complex-phase', 'Use complex numbers to represent phase and oscillation.'],
      ['landau-math', 'eigenmodes', 'Use eigenvectors and eigenvalues to study modes.'],
      ['landau-math', 'differential-equations', 'Connect differential equations with initial and boundary conditions.'],
      ['landau-math', 'vector-integral-theorems', 'Relate local field behavior to boundary integrals.'],
      ['landau-math', 'fourier-analysis', 'Decompose functions into oscillatory components.'],
      ['landau-math', 'variational-calculus', 'Turn a stationary functional into an equation of motion.'],
      ['landau-math', 'pde-green-functions', 'Represent distributed response with equations and Green functions.'],
      ['landau-math', 'tensor-basics', 'Track how components transform when coordinates change.'],
      ['landau-math-methods', null, 'Extend mathematical tools to contour integrals, asymptotics, and special functions.']
    ] },
    { title: '5. Physics applications', description: 'Use those tools in mechanics, fields, quantum and statistical physics, and continuous media. The available lessons are preparation; they do not establish complete exam-level coverage.', items: [
      ['landau-mechanics', null, 'Use constraints, conservation laws, and variational reasoning in mechanics.'],
      ['landau-analytical-mechanics', null, 'Extend mechanics to canonical methods, constraints, and perturbative systems.'],
      ['landau-fields-relativity', null, 'Connect field equations with symmetry and relativity.'],
      ['landau-quantum-statistical', null, 'Use states, probabilities, and ensembles in microscopic models.'],
      ['landau-continuum-kinetics', null, 'Use fields and conservation balances in continuous media.'],
      ['landau-advanced-fields', null, 'Apply relativistic field methods to scattering and media.'],
      ['landau-advanced-quantum', null, 'Extend quantum methods to approximations, angular momentum, and scattering.'],
      ['landau-quantum-methods', null, 'Apply quantum techniques to further systems and approximation methods.'],
      ['landau-advanced-kinetics', null, 'Extend continuum and statistical models to kinetic descriptions.'],
      ['landau-gravity', null, 'Connect special relativity and tensor methods to spacetime curvature and gravitation.']
    ] }
  ];
  // Each edge states a meaningful dependency or transfer, not a universal prerequisite.
  const edges = [
    [['foundations','basic-arithmetic'], ['mathematical-meaning',null], 'Interpret arithmetic operations as relationships that can be transferred to other contexts.'],
    [['foundations','set-theory'], ['foundations','number-systems'], 'Sets let us specify the collections to which numbers belong.'],
    [['foundations','propositional-logic'], ['foundations','proof-techniques'], 'A proof uses valid logical implications to justify a conclusion.'],
    [['foundations','number-systems'], ['foundations','basic-arithmetic'], 'Number systems set the allowed inputs and answers for arithmetic.'],
    [['foundations','basic-arithmetic'], ['beginning-algebra','integer-operations'], 'Extending arithmetic to signed numbers requires consistent sign rules.'],
    [['foundations','basic-arithmetic'], ['beginning-algebra','linear-equations-one-var'], 'Inverse operations help isolate an unknown while preserving equality.'],
    [['foundations','basic-arithmetic'], ['geometry','area-volume'], 'Products and ratios connect measurements with areas and volumes.'],
    [['beginning-algebra','integer-operations'], ['beginning-algebra','linear-inequalities'], 'Multiplication by a negative reverses an inequality, unlike an equality.'],
    [['beginning-algebra','linear-equations-one-var'], ['beginning-algebra','systems-linear'], 'A system asks for values that satisfy several equations together.'],
    [['beginning-algebra','systems-linear'], ['geometry','coordinate-geometry'], 'A solution of two linear equations can describe an intersection of their lines.'],
    [['beginning-algebra','linear-equations-one-var'], ['intermediate-algebra','polynomials-exponents'], 'Algebraic expressions generalize operations on numbers to variables.'],
    [['intermediate-algebra','polynomials-exponents'], ['intermediate-algebra','factoring'], 'Factoring rewrites a polynomial as a product to expose its structure.'],
    [['intermediate-algebra','factoring'], ['intermediate-algebra','quadratic-equations'], 'A zero product can identify roots after a quadratic has been factored.'],
    [['beginning-algebra','systems-linear'], ['precalculus','systems-matrices'], 'Matrices organize the coefficients of a system and its linear transformations.'],
    [['geometry','triangles'], ['trigonometry','unit-circle'], 'Angle and triangle relationships motivate coordinates on the unit circle.'],
    [['trigonometry','unit-circle'], ['trigonometry','trig-graphs-inverse'], 'A changing angle traces the periodic sine and cosine graphs.'],
    [['trigonometry','unit-circle'], ['trigonometry','trig-identities'], 'The unit circle makes the Pythagorean identity visible in coordinates.'],
    [['precalculus','inverse-functions-modeling'], ['trigonometry','trig-graphs-inverse'], 'Restricting a function to a one-to-one domain defines a principal inverse branch.'],
    [['precalculus','graph-transformations'], ['precalculus','poly-rational-graphs'], 'Transformations and domain restrictions help predict graph features.'],
    [['precalculus','functions-domain-range'], ['calculus-1','limits-continuity'], 'A limit describes behavior near an input while the domain determines which inputs are allowed.'],
    [['beginning-algebra','linear-functions-slope'], ['calculus-1','derivatives'], 'A derivative extends slope from a line to instantaneous change along a curve.'],
    [['calculus-1','limits-continuity'], ['calculus-1','derivatives'], 'The derivative is a limit of difference quotients when that limit exists.'],
    [['calculus-1','derivatives'], ['calculus1','integration-ftc'], 'The fundamental theorem relates derivatives to accumulated change under its hypotheses.'],
    [['geometry','area-volume'], ['calculus-2','integration-fundamentals'], 'Integration can extend geometric area to regions with curved boundaries.'],
    [['calculus1','integration-ftc'], ['calculus2','first-order-differential-equations'], 'A differential equation constrains a rate; an initial condition selects a solution.'],
    [['calculus2','sequences'], ['calculus2','series-convergence'], 'A series is defined through the limit of its sequence of partial sums.'],
    [['calculus2','series-convergence'], ['calculus-2','taylor-series'], 'A Taylor series requires convergence analysis before it can represent a function.'],
    [['calculus-1','derivatives'], ['calculus-2','taylor-series'], 'Derivatives determine the coefficients of a local Taylor approximation.'],
    [['trigonometry','trig-graphs-inverse'], ['landau-math','complex-phase'], 'Complex phases compactly represent sine, cosine, and oscillation.'],
    [['precalculus','systems-matrices'], ['landau-math','eigenmodes'], 'Eigenvectors describe directions preserved by a linear map.'],
    [['calculus-3','vectors'], ['landau-math','eigenmodes'], 'Vectors provide the states on which a linear operator acts.'],
    [['calculus-3','vectors'], ['calculus3','vector-functions-motion'], 'A position vector depending on time describes a path and its velocity.'],
    [['calculus-3','partial-derivatives'], ['calculus-3','multiple-integrals'], 'Local rates and accumulation are complementary tools for multivariable functions.'],
    [['calculus-3','vectors'], ['calculus3','vector-fields-line-integrals'], 'A vector field assigns a vector to each point in its domain.'],
    [['calculus2','first-order-differential-equations'], ['landau-math','differential-equations'], 'Initial and boundary conditions choose solutions of physical rate laws.'],
    [['calculus3','vector-fields-line-integrals'], ['landau-math','vector-integral-theorems'], 'Local field behavior and boundary integrals are linked by integral theorems.'],
    [['calculus-2','taylor-series'], ['landau-math','fourier-analysis'], 'Series approximate functions in different bases; their assumptions and convergence differ.'],
    [['calculus-1','derivatives'], ['landau-math','variational-calculus'], 'Variational methods extend the idea of a stationary value to functions.'],
    [['landau-math','differential-equations'], ['landau-math','pde-green-functions'], 'Partial differential equations extend rate laws to spatially distributed systems.'],
    [['landau-math','complex-phase'], ['landau-math-methods',null], 'Complex numbers and analytic structure provide a starting point for contour methods.'],
    [['landau-math','variational-calculus'], ['landau-mechanics',null], 'Stationary action yields equations of motion under suitable assumptions.'],
    [['landau-math','vector-integral-theorems'], ['landau-fields-relativity',null], 'Integral theorems relate local field equations to flux through boundaries.'],
    [['landau-math','eigenmodes'], ['landau-quantum-statistical',null], 'Eigenvalues and eigenvectors describe possible outcomes and states in quantum models.'],
    [['probability-statistics','counting-probability'], ['probability-statistics','random-variables'], 'Probabilities for outcomes determine the distribution of a random variable.'],
    [['probability-statistics','counting-probability'], ['probability-statistics','conditional-probability-bayes'], 'Conditional probability changes the reference set when evidence is known.'],
    [['probability-statistics','random-variables'], ['landau-quantum-statistical',null], 'Probabilities and expectations help interpret states and ensembles.'],
    [['landau-math','pde-green-functions'], ['landau-continuum-kinetics',null], 'Distributed systems evolve through field equations with initial and boundary conditions.'],
    [['landau-fields-relativity',null], ['landau-advanced-fields',null], 'Relativity and classical fields provide context for quantum fields and the response of media.'],
    [['landau-quantum-statistical',null], ['landau-advanced-quantum',null], 'Quantum states and observables ground later approximation and scattering methods.'],
    [['landau-mechanics',null], ['landau-analytical-mechanics',null], 'Classical dynamics provides the foundation for canonical and constrained descriptions.'],
    [['landau-advanced-quantum',null], ['landau-quantum-methods',null], 'Advanced quantum methods extend the state, operator, and approximation tools developed earlier.'],
    [['landau-continuum-kinetics',null], ['landau-advanced-kinetics',null], 'Continuum conservation laws connect with kinetic descriptions of particle populations.'],
    [['landau-math','tensor-basics'], ['landau-gravity',null], 'Tensors describe geometric relations independently of a particular coordinate system.'],
    [['landau-fields-relativity',null], ['landau-gravity',null], 'General relativity extends locally the spacetime ideas introduced in special relativity.']
  ];

  function resolve(modules, ref) {
    const module = modules.find(item => item.id === ref[0]);
    if (!module || !Array.isArray(module.topics)) return null;
    const topic = ref[1] == null ? module.topics[0] : module.topics.find(item => item.id === ref[1]);
    return topic ? { moduleId: module.id, topicId: topic.id, moduleTitle: module.title, topicTitle: topic.title } : null;
  }
  function availableStages(modules) {
    return stages.map(stage => ({ title: stage.title, description: stage.description,
      items: stage.items.map(item => { const target = resolve(modules, item); return target && { ...target, note: item[2] }; }).filter(Boolean)
    })).filter(stage => stage.items.length);
  }
  function connections(modules, moduleId, topicId) {
    return edges.flatMap(([from, to, note]) => {
      const source = resolve(modules, from), target = resolve(modules, to);
      if (!source || !target) return [];
      if (source.moduleId === moduleId && source.topicId === topicId) return [{ ...target, note, direction: 'Apply this idea' }];
      if (target.moduleId === moduleId && target.topicId === topicId) return [{ ...source, note, direction: 'Build on this idea' }];
      return [];
    });
  }
  window.MathLearningPaths = { stages, edges, resolve, availableStages, connections };
})();
