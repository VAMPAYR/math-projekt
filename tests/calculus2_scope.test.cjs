const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function lesson(topicId) {
  const context = vm.createContext({ window: {} });
  const file = path.join(__dirname, '../js/modules/m6_calculus2.js');
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  const topic = context.window.MATH_MODULES[0].topics.find(item => item.id === topicId);
  assert.ok(topic, `Missing topic ${topicId}`);
  return topic;
}

test('FTC lesson distinguishes signed accumulation from antiderivatives and excludes a singular interval', () => {
  const topic = lesson('integration-fundamentals');
  assert.match(topic.whyExists.html, /definite integral is a number describing signed accumulation/i);
  assert.match(topic.whyExists.html, /indefinite integral denotes a family of antiderivatives/i);
  assert.match(topic.concept.html, /continuous on \$\[a,b\]\$/);
  assert.match(topic.concept.html, /1\/x.*\[-1,1\].*zero/i);
  // Treating log|x| as a single antiderivative across zero would produce
  // 0 at the endpoints, although each one-sided improper integral diverges.
  assert.equal(Math.log(Math.abs(1)) - Math.log(Math.abs(-1)), 0);
  assert.ok(Math.log(1 / 1e-8) > Math.log(1 / 1e-4));
});

test('Taylor lesson separates the formal series from equality with its function', () => {
  const topic = lesson('taylor-series');
  assert.match(topic.concept.html, /remainders tend to zero/i);
  assert.match(topic.concept.html, /e\^\{-1\/x\^2\}/);
  assert.match(topic.concept.html, /Every derivative at zero is zero/i);
  // The displayed smooth counterexample is positive away from the center,
  // even though its Taylor series at zero is identically zero.
  assert.ok(Math.exp(-1) > 0);
});

test('integral test states the positivity, continuity and eventual decrease conditions', () => {
  const topic = lesson('taylor-series');
  assert.match(topic.definition.html, /positive, continuous and decreasing/i);
  assert.match(topic.definition.html, /finite initial part does not affect convergence/i);
  // For f(x)=1/x² the hypotheses hold, and both comparison quantities stay
  // bounded: sum_{n=1}^N 1/n² <= 2 and integral_1^N 1/x² dx < 1.
  let sum = 0;
  for (let n = 1; n <= 1000; n++) sum += 1 / (n * n);
  assert.ok(sum < 2);
  assert.ok(1 - 1 / 1000 < 1);
});
