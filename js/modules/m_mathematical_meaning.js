/* Original lessons connecting mathematical meanings across contexts. */
(function () {
  if (!window.MATH_MODULES) window.MATH_MODULES = [];
  const S = String.raw;
  const ref = (moduleId, topicId, note) => ({ moduleId, topicId, note });
  const example = (title, problem, steps) => ({ title, problem, steps: steps.map((content, i) => ({ title: `Step ${i + 1}`, content })) });
  const choice = (question, options, correctIndex, hint, correctExplanation, wrongExplanations) => ({
    difficulty: 'medium', question, options, correctIndex, hint: `<p>${hint}</p>`, correctExplanation, wrongExplanations
  });
  const number = (question, answer, hint, explanation) => ({
    difficulty: 'medium', question, accept: [answer], placeholder: 'Enter a number', hint: `<p>${hint}</p>`, explanation, solution: explanation
  });
  window.MATH_MODULES.push({
    id: 'mathematical-meaning', order: 1.5,
    title: 'Meaning and Transfer in Mathematics',
    description: 'Interpret operations, equality, functions, rates, structure, and evidence in different situations.',
    topics: [
      {
        id: 'operations-and-quantities', title: 'Operations Describe Relationships',
        description: 'Connect combining, difference, scaling, products, and division to quantities and units.',
        foundationRefs: [ref('foundations', 'basic-arithmetic', 'Arithmetic introduces the operations and their usual rules.'), ref('foundations', 'number-systems', 'The number system determines which operations and inverses are available.')],
        concept: { html: S`<p>An operation takes permitted inputs and produces an output. Its meaning depends on the quantities involved. Adding compatible quantities combines their amounts; subtracting can describe a signed change or a difference. Multiplying by a dimensionless factor scales a quantity. Multiplying two lengths gives an area; a rate times a duration gives an accumulated amount when the rate is constant.</p><p>Division has two complementary interpretations. Sharing $12$ objects equally among $3$ groups gives $4$ objects per group. Measuring $12$ meters in $3$-meter lengths gives $4$ lengths. Both satisfy $3\times4=12$, but their units tell different stories. Division by zero has no ordinary real-number value: $0q=12$ has no solution, and $0q=0$ has many, not a unique quotient.</p><p>For real numbers multiplication is commutative. Do not transfer that rule automatically to composition of functions or matrix multiplication: applying transformations in a different order can change the result.</p>` },
        abstraction: { html: S`<p>Before calculating, identify each input, its unit, and the question. A correct calculation with the wrong operation or incompatible units answers a different question. To transfer a method, compare the relationships and assumptions, not just the numbers.</p>` },
        examples: [
          example('The same quotient, different units', 'Compare 12 liters shared among 3 containers with measuring 12 liters using a 3-liter jug.', ['Equal sharing gives $12/3=4$ liters per container.', S`Measuring gives $12\text{ liters}/(3\text{ liters per jug})=4$ jugfuls. The numbers match; the units and questions differ.`]),
          example('A rate becomes a distance', 'A bicycle travels at a constant 15 km/h for 2 hours. Find the distance.', [S`Multiply the constant rate by the duration: $15\text{ km/h}\times2\text{ h}$.`, 'The hours cancel and the distance is 30 km. If the speed varies, an average speed or accumulation of changing rates is needed.'])
        ],
        exercises: [
          choice('Which operation finds how many 4-meter sections fit into 20 meters?', ['20 − 4', '20 ÷ 4', '20 × 4', '20 + 4'], 1, 'Count equal groups of 4 meters.', '$20/4=5$ sections.', {0:'Subtracting once leaves a length; it does not count all sections.',2:'Multiplication would form a product with different units.',3:'Adding lengths does not count how many fit.'}),
          choice('Which addition is meaningful as written?', ['3 meters + 2 seconds', '3 meters + 2 meters', '3 liters + 2 kilograms', '3 degrees + 2 meters'], 1, 'Check whether the units describe the same kind of quantity.', 'Both lengths use meters, so their sum is 5 meters.', {0:'Length and time are different quantities.',2:'Volume and mass are different quantities without a conversion model.',3:'An angle and a length cannot be added as like quantities.'})
        ],
        freeResponse: [number('A 24-meter ribbon is cut into equal 6-meter pieces. How many pieces result?', 4, 'Divide the total length by the length of one piece.', '$24/6=4$ pieces; both lengths use the same unit.')]
      },
      {
        id: 'equality-inverses', title: 'Equality, Reversing, and Lost Information',
        description: 'Understand equality-preserving operations, inverse functions, and why some steps require extra checks.',
        foundationRefs: [ref('beginning-algebra', 'linear-equations-one-var', 'Equation solving uses operations that preserve equality.'), ref('precalculus', 'functions-domain-range', 'Domains and outputs determine whether an inverse can exist.')],
        concept: { html: S`<p>Equality states that two expressions have the same value under the stated conditions. If $a=b$, applying the same defined function to both sides gives $f(a)=f(b)$. The reverse implication needs more: $f$ must be one-to-one on the relevant domain. Adding 3 is reversible over the reals. Squaring is not one-to-one over all reals because $2^2=(-2)^2$.</p><p>Solving $x^2=9$ therefore requires both $x=3$ and $x=-3$. If a problem restricts $x\ge0$, only $x=3$ remains. An inverse function reverses a one-to-one rule on a specified domain and range; a function that merges inputs needs a domain restriction before it has a single-valued inverse.</p><p>Dividing both sides of an equation by a variable silently assumes that variable is nonzero. Check the zero case separately before dividing. Squaring and other non-injective steps can introduce candidates that must be checked in the original equation.</p>` },
        abstraction: { html: 'Reversibility is a question about information. Ask whether two different permitted inputs can produce the same output before undoing a transformation.' },
        examples: [
          example('A zero case survives', 'Solve $x(x-3)=0$.', ['$x=0$ or $x-3=0$, so $x=0$ or $x=3$.', 'Dividing the equation by $x$ would discard the valid zero solution. Substitute both candidates into the original equation.']),
          example('Squaring can add a candidate', S`Solve $\sqrt{x}=x-2$ over the reals.`, [S`The original equation requires $x\ge2$. Squaring gives $x=(x-2)^2$, or $(x-1)(x-4)=0$.`, S`$x=1$ violates $x\ge2$; $x=4$ satisfies the original equation. Only 4 is a solution.`])
        ],
        exercises: [
          choice('Why can squaring both sides require a final check?', ['Squaring is never defined for real numbers', 'Different real inputs can have the same square', 'Squaring changes every equality into an inequality', 'Every squared equation has no solutions'], 1, 'Compare the squares of 2 and −2.', 'Squaring can remove sign information, so the resulting equation can have extra candidates.', {0:'Real squares are defined.',2:'Applying a function to equal real inputs preserves equality.',3:'Some squared equations have solutions.'}),
          choice('Which rule has an inverse on all real inputs?', ['$f(x)=x^2$', '$f(x)=x+3$', '$f(x)=0$', '$f(x)=|x|$'], 1, 'Look for a rule that never gives the same output for two distinct inputs.', 'Adding 3 is one-to-one, and subtracting 3 reverses it.', {0:'Positive and negative inputs can share a square.',2:'Every input maps to 0.',3:'Opposite inputs can have the same absolute value.'})
        ],
        freeResponse: [number('Over the reals, how many solutions does $x(x-5)=0$ have?', 2, 'Consider each factor, including the zero case.', 'The solutions are $x=0$ and $x=5$, so there are 2.')]
      },
      {
        id: 'functions-and-representations', title: 'Functions, Inputs, and Representations',
        description: 'Distinguish a relationship from a formula and compare tables, graphs, and equations.',
        foundationRefs: [ref('precalculus', 'functions-domain-range', 'A function pairs each allowed input with one output.'), ref('beginning-algebra', 'linear-functions-slope', 'A linear model links an equation, a graph, and a constant rate.')],
        concept: { html: S`<p>A function assigns exactly one output to each allowed input. The domain is part of the rule. A formula, a table, and a graph can represent the same function, but a finite table usually does not determine a unique rule between observed points.</p><p>The rule $C(n)=5+2n$ can model a 5-dollar fixed charge plus 2 dollars per item, for whole-number $n\ge0$. The intercept describes the fixed charge and the coefficient describes the extra cost per item. The same algebra can model other quantities when the variables and units change.</p><p>The graph of $y^2=x$ is a relation, but as written it assigns two real $y$ values to every positive $x$, so it is not one function of $x$. Restricting to $y\ge0$ selects $y=\sqrt{x}$. A graph is evidence about a model, not a substitute for checking the formula and its domain.</p>` },
        abstraction: { html: 'Representations expose different features: a table shows selected values, a graph shows shape, and an equation exposes a rule. Translate between them and keep the input units and allowed domain.' },
        examples: [
          example('Interpret a cost model', 'A service charges 5 dollars plus 2 dollars per item. Find the cost of 4 items.', ['The model is $C(n)=5+2n$ dollars for nonnegative whole-number $n$.', '$C(4)=5+2(4)=13$ dollars. The fixed 5 remains even when $n=0$.']),
          example('A table leaves choices open', 'Measurements are $(0,1)$ and $(1,3)$. Do they force a unique function?', ['The line $f(x)=1+2x$ fits both measurements.', 'So does $g(x)=1+2x+x(x-1)$. More information is needed to choose between their different predictions.'])
        ],
        exercises: [
          choice('Which relation fails to define one real y for each x ≥ 0?', ['$y=x+1$', S`$y=\sqrt{x}$`, '$y^2=x$', '$y=2x$'], 2, 'Try x = 4 and count the permitted y values.', '$y^2=4$ allows both 2 and −2.', {0:'Each input gives one output.',1:'The square-root symbol denotes the nonnegative root.',3:'Doubling produces one output for each input.'}),
          choice('Two different formulas fit every row of a finite table. What follows?', ['They must agree at every unlisted input', 'The table alone may not distinguish their predictions', 'Both formulas are invalid', 'Every graph through the points must be a straight line'], 1, 'Compare what the table states with values it does not state.', 'The listed observations do not fix unobserved values without further assumptions.', {0:'Agreement at finitely many points does not prove identical functions.',2:'Both can fit the available observations.',3:'A nonlinear graph can pass through the same points.'})
        ],
        freeResponse: [number('A fixed charge is 8 dollars plus 3 dollars per item. Enter the cost in dollars for 5 items.', 23, 'Add the fixed charge to the cost of the items.', '$8+3(5)=23$ dollars.')]
      },
      {
        id: 'rates-ratios-and-scaling', title: 'Ratios, Rates, and Scaling',
        description: 'Compare quantities using the correct reference, units, and proportionality assumptions.',
        foundationRefs: [ref('beginning-algebra', 'linear-functions-slope', 'Slope compares changes in two quantities.'), ref('probability-statistics', 'counting-probability', 'A probability ratio uses a specified sample space.')],
        concept: { html: S`<p>A ratio compares quantities, and a rate compares quantities with their units. In a proportional relation $y=kx$, the ratio $y/x=k$ is constant for nonzero $x$ and the model passes through the origin. An affine model $y=b+kx$ can have a constant rate $k$ without being proportional when $b\ne0$. In elementary graphing, this form is often called linear; in linear algebra a linear map must also send zero to zero.</p><p>A percentage change uses an initial baseline: $(\text{new}-\text{old})/\text{old}$ when the old value is nonzero. A 20 percent rise followed by a 20 percent fall multiplies by $1.2$ and then $0.8$, giving $0.96$ of the initial amount. The second percentage has a different baseline.</p><p>Scaling a figure uniformly by factor $s>0$ multiplies lengths by $s$, areas by $s^2$, and volumes by $s^3$. The correct exponent reflects the dimensional relationship. A coordinate stretched in only one direction requires its own model rather than the uniform-scaling rule.</p>` },
        abstraction: { html: 'Find the reference quantity before comparing. Test whether an additive offset, changing rate, changed baseline, or dimensional exponent changes the proposed rule.' },
        examples: [
          example('Constant rate with a starting fee', 'A taxi charges 4 dollars plus 2 dollars per kilometer. Compare 3 km and 6 km.', ['$C(d)=4+2d$ gives 10 dollars at 3 km and 16 dollars at 6 km.', 'Doubling distance does not double the total cost because the 4-dollar starting fee stays fixed. The added distance cost remains 2 dollars per kilometer.']),
          example('Scale an area', 'A square has side 3 cm. Its side is doubled. Compare the areas.', ['The initial area is $3^2=9$ square cm; the new side is 6 cm.', 'The new area is $6^2=36$ square cm, four times the original. A doubled length does not imply a doubled area.']),
          example('A probability denominator changes', 'A bag contains 3 red and 2 blue tokens. Two tokens are drawn uniformly without replacement. Find the chance that both are red.', ['The first red probability is $3/5$. Given a red first draw, 2 red tokens remain among 4, so the conditional probability is $2/4$.', 'Multiply the conditional probabilities: $(3/5)(2/4)=3/10$. With replacement the second denominator and numerator stay 5 and 3, giving $9/25$ instead.'])
        ],
        exercises: [
          choice('Which equation describes a proportional relation for all real x?', ['$y=2x+3$', '$y=2x$', '$y=x^2$', '$y=1/x$'], 1, 'A proportional relation has a constant factor and passes through the origin.', '$y=2x$ has constant factor 2.', {0:'The nonzero offset means the graph misses the origin.',2:'The ratio y/x varies with x.',3:'The reciprocal relation is not a constant scaling.'}),
          choice('A 100-dollar price rises 20% and then falls 20%. What is the final price?', ['$100$', '$96$', '$80$', '$104$'], 1, 'Apply the second percentage to the new price.', '$100(1.2)(0.8)=96$ dollars.', {0:'The two changes use different baselines.',2:'This omits the initial increase.',3:'The decrease is applied to 120, not added to the original price.'})
        ],
        freeResponse: [number('A cube has side length 2 cm. Its side is tripled. By what factor does its volume change?', 27, 'Volume scales with the cube of the length factor.', 'The volume factor is $3^3=27$.')]
      },
      {
        id: 'structures-and-transformations', title: 'Patterns, Structure, and Order',
        description: 'Recognize shared structure without assuming every operation follows scalar arithmetic.',
        foundationRefs: [ref('precalculus', 'systems-matrices', 'Matrices describe linear systems and transformations.'), ref('trigonometry', 'unit-circle', 'Rotation and coordinates reveal geometric structure.')],
        concept: { html: S`<p>Structure is a set of objects together with relationships or operations that obey stated rules. A pattern in equations can reappear in a geometric transformation, a matrix, or a process. To transfer an argument, identify which rules it uses and verify those rules in the new setting.</p><p>Order matters for function composition: $(f\circ g)(x)=f(g(x))$ means apply $g$ first. If $f(x)=x+1$ and $g(x)=2x$, then $f(g(x))=2x+1$ but $g(f(x))=2x+2$. Matrix multiplication likewise need not commute. This does not contradict commutativity of multiplication of real scalars; the operations are different.</p><p>A transformation is a symmetry of an object or rule when applying it leaves the relevant object or property unchanged. A square has a 90-degree rotational symmetry about its center. A generic rectangle does not, unless its side lengths are equal. State what stays unchanged and which transformation is allowed.</p>` },
        abstraction: { html: 'Look for the shared rule, then test its boundaries. An analogy becomes a usable method only when the relevant operations, domains, and assumptions match.' },
        examples: [
          example('Order changes a process', 'Start with 3. Compare doubling then adding 1 with adding 1 then doubling.', ['Doubling then adding 1 gives $2(3)+1=7$.', 'Adding 1 then doubling gives $2(3+1)=8$. The operations are valid in both cases, but their order changes the result.']),
          example('When symmetry changes', 'Rotate a 2 cm by 4 cm rectangle through 90 degrees about its center.', ['The rotated rectangle occupies a 4 cm by 2 cm orientation.', 'It does not coincide with the original unless the sides are equal. A 180-degree rotation does map the rectangle to itself.'])
        ],
        exercises: [
          choice('Let f(x)=x+1 and g(x)=2x. What is f(g(3))?', ['$7$', '$8$', '$6$', '$4$'], 0, 'Apply the inner function g first.', '$g(3)=6$, then $f(6)=7$.', {1:'That applies f first and then g.',2:'This stops after applying g.',3:'This stops after applying f.'}),
          choice('Which statement about matrix multiplication is generally correct?', ['It always commutes', 'It is defined only for square matrices', 'Order can change the result', 'It always produces the identity matrix'], 2, 'Matrices can represent transformations applied in sequence.', 'Compatible matrix products can differ when their order is reversed.', {0:'Matrix multiplication is not generally commutative.',1:'Rectangular matrices can multiply when their dimensions are compatible.',3:'Most products are not identities.'})
        ],
        freeResponse: [number('First add 2 to 5, then multiply the result by 3. What is the result?', 21, 'Apply the stated operations in order.', 'Adding gives 7; multiplying by 3 gives 21.')]
      },
      {
        id: 'models-evidence-and-limits', title: 'Models, Checks, and Evidence',
        description: 'Choose a model, test its assumptions, and distinguish examples from proof.',
        foundationRefs: [ref('foundations', 'proof-techniques', 'Proof and counterexample address different logical claims.'), ref('calculus-1', 'limits-continuity', 'A limit makes precise what happens as an input approaches a value.')],
        concept: { html: S`<p>A model selects quantities and relationships to answer a question under stated assumptions. An equation does not become a good model merely because it can be solved. Check whether its variables, units, domain, and precision fit the situation. Compare its prediction with an observation or a limiting case when possible.</p><p>An average rate over an interval is $\Delta y/\Delta x$ when $\Delta x\ne0$. A derivative is the limit of these ratios as the interval shrinks, when that limit exists. An instantaneous rate and a long-interval average can differ. Integrating a rate over time gives signed change under suitable integrability conditions; the initial value is needed to recover the final value.</p><p>Examples can disprove a universal statement: one permitted counterexample is enough. Matching examples can suggest a pattern but do not prove it for every case. A proof explains why the conclusion follows from the assumptions throughout the stated domain. Estimation can check scale, but rounding is not exact equality.</p>` },
        abstraction: { html: 'A transferable solution names the goal, states conditions, selects a relationship, checks the result, and explains what changes if an assumption fails.' },
        examples: [
          example('Average and instantaneous rate', 'A position is $s(t)=t^2$ meters for time t in seconds. Compare average velocity on [1,3] with velocity at t=1.', ['The average is $(s(3)-s(1))/(3-1)=(9-1)/2=4$ meters per second.', S`The derivative is $s'(t)=2t$, so the instantaneous velocity at $t=1$ is 2 meters per second. A changing rate makes these answers different.`]),
          example('One counterexample is enough', 'Assess the claim that every increase followed by an equal percentage decrease returns to the start.', ['Take an initial amount of 100 and use 10 percent each way.', '$100(1.1)(0.9)=99$, not 100. This permitted example disproves the universal claim; it does not by itself describe every possible percentage.'])
        ],
        exercises: [
          choice('What does one valid counterexample show about a universal claim?', ['It proves the claim for all cases', 'It disproves the claim', 'It proves the opposite claim for all cases', 'It has no logical relevance'], 1, 'A universal claim requires every permitted case to satisfy it.', 'One permitted failure shows that the stated universal claim is false.', {0:'A failure cannot prove the claim.',2:'One failure does not prove its opposite for every case.',3:'One permitted failure is decisive against a universal claim.'}),
          choice('Position changes by 12 meters over 3 seconds. Which quantity follows directly?', ['Average velocity is 4 m/s', 'Instantaneous velocity was always 4 m/s', 'Acceleration was always zero', 'Initial position was zero'], 0, 'Divide displacement by elapsed time; no rate at a particular instant is given.', 'The interval average is $12/3=4$ m/s; the other statements require more information.', {1:'A changing velocity can have this same average.',2:'The average alone does not determine acceleration.',3:'Displacement does not specify initial position.'})
        ],
        freeResponse: [number('For $s(t)=t^2$ meters, enter the average velocity in m/s from t=1 to t=2 seconds.', 3, 'Use change in position divided by change in time.', '$(s(2)-s(1))/(2-1)=(4-1)/1=3$ m/s.')]
      }
    ]
  });
})();
