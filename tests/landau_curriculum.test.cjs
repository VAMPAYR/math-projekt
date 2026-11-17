/* Integration checks for the written Landau preparation curriculum. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const requiredModules = [
  'landau-math', 'landau-math-methods', 'landau-mechanics',
  'landau-fields-relativity', 'landau-quantum-statistical',
  'landau-continuum-kinetics', 'landau-advanced-fields',
  'landau-advanced-quantum', 'landau-gravity', 'landau-analytical-mechanics',
  'landau-quantum-methods', 'landau-advanced-kinetics'
];

function load() {
  const context = vm.createContext({ window: {} });
  const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scripts = [...index.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)]
    .map(match => match[1].split('?')[0]);
  for (const script of scripts.filter(src => src.startsWith('js/modules/'))) {
    vm.runInContext(fs.readFileSync(path.join(root, script), 'utf8'), context, { filename: script });
  }
  for (const script of ['js/learning_paths.js', 'js/problem_engine.js']) {
    assert.ok(scripts.includes(script), `${script} must load in the app`);
    assert.ok(scripts.indexOf(script) < scripts.indexOf('js/engine.js'), `${script} must load before the engine`);
    vm.runInContext(fs.readFileSync(path.join(root, script), 'utf8'), context, { filename: script });
  }
  return {
    modules: context.window.MATH_MODULES,
    paths: context.window.MathLearningPaths,
    problemEngine: vm.runInContext('ProblemEngine', context)
  };
}

function text(value, description) {
  assert.equal(typeof value, 'string', `${description} must be text`);
  assert.ok(value.trim(), `${description} must not be empty`);
}

function landauIds(modules) {
  return [...new Set([...requiredModules, ...modules.filter(item => item.id?.startsWith('landau-')).map(item => item.id)])];
}

// Read ordinary quoted strings only; skip comments and template literals.
// A single backslash before a TeX command is consumed by JavaScript before
// KaTeX sees it (and commands like \rho can become control characters).
function lostTexEscapes(source) {
  const commands = new Set(('alpha beta gamma delta epsilon zeta eta theta kappa lambda mu nu xi pi rho sigma tau phi chi psi omega Gamma Delta Theta Lambda Pi Sigma Phi Psi Omega frac dfrac tfrac sqrt cdot times mathbf mathrm mathbb mathcal partial nabla infty leq geq neq text operatorname hbar left right begin end oint int sum prod vec hat tilde approx sim exp log ln sin cos tan sinh cosh bra ket langle rangle mid vert overline pm mp quad').split(' '));
  const findings = [];
  for (let i = 0; i < source.length;) {
    if (source[i] === '/' && source[i + 1] === '/') {
      i = source.indexOf('\n', i + 2);
      if (i < 0) break;
    } else if (source[i] === '/' && source[i + 1] === '*') {
      const end = source.indexOf('*/', i + 2);
      i = end < 0 ? source.length : end + 2;
    } else if (source[i] === '`') {
      i++;
      while (i < source.length && source[i] !== '`') i += source[i] === '\\' ? 2 : 1;
      i++;
    } else if (source[i] === "'" || source[i] === '"') {
      const quote = source[i++];
      while (i < source.length && source[i] !== quote) {
        if (source[i] !== '\\') { i++; continue; }
        const start = i;
        while (source[i] === '\\') i++;
        const command = source.slice(i).match(/^[A-Za-z]+/)?.[0];
        if ((i - start) % 2 && (commands.has(command) || (command && command.length > 1))) {
          findings.push(`line ${source.slice(0, start).split('\n').length}: \\${command}`);
        }
        // An odd final backslash escapes the following non-letter character.
        if ((i - start) % 2 && !command && i < source.length) i++;
      }
      i++;
    } else i++;
  }
  return findings;
}

test('each Landau subject is registered and reachable from the learning path', () => {
  const { modules, paths } = load();
  const items = paths.availableStages(modules).flatMap(stage => stage.items);
  for (const moduleId of landauIds(modules)) {
    const module = modules.find(item => item.id === moduleId);
    assert.ok(module, `missing module ${moduleId}`);
    assert.ok(module.topics.length, `${moduleId} has no lessons`);
    const link = items.find(item => item.moduleId === moduleId);
    assert.ok(link, `the learning path does not reach ${moduleId}`);
    assert.ok(module.topics.some(topic => topic.id === link.topicId), `the path links to a missing ${moduleId} topic`);
    text(link.note, `${moduleId} path purpose`);
  }
});

test('every new lesson has meaningful prerequisites, a worked example, and written practice', () => {
  const { modules, problemEngine } = load();
  for (const moduleId of landauIds(modules)) {
    const module = modules.find(item => item.id === moduleId);
    assert.ok(module, `missing module ${moduleId}`);
    const ids = new Set();
    for (const topic of module.topics) {
      const location = `${moduleId}:${topic.id}`;
      text(topic.id, `${moduleId} topic ID`);
      assert.ok(!ids.has(topic.id), `${location} repeats a topic ID`);
      ids.add(topic.id);
      text(topic.title, `${location} title`);
      text(typeof topic.concept === 'string' ? topic.concept : topic.concept?.html, `${location} concept`);
      assert.ok(topic.foundationRefs?.length, `${location} needs at least one learning connection`);
      for (const ref of topic.foundationRefs) {
        const parent = modules.find(item => item.id === ref.moduleId);
        assert.ok(parent?.topics.some(item => item.id === ref.topicId), `${location} has a missing reference ${ref.moduleId}:${ref.topicId}`);
        text(ref.note, `${location} connection explanation`);
      }
      assert.ok(topic.examples?.length, `${location} needs a worked example`);
      for (const example of topic.examples) {
        text(example.problem, `${location} example problem`);
        assert.ok(example.steps?.length, `${location} example needs reasoning steps`);
        for (const step of example.steps) text(step.content, `${location} example step`);
      }
      const choices = topic.exercises || [];
      const numeric = topic.freeResponse || [];
      assert.ok(choices.length || numeric.length, `${location} needs a written question`);
      for (const problem of choices) {
        text(problem.question, `${location} multiple-choice question`);
        assert.ok(problem.options?.length >= 2, `${location} needs distinct answer choices`);
        assert.ok(Number.isInteger(problem.correctIndex) && problem.correctIndex >= 0 && problem.correctIndex < problem.options.length,
          `${location} has an invalid answer key`);
        text(problem.correctExplanation, `${location} answer explanation`);
        assert.doesNotMatch(problem.question, /\boral\s+(?:exam|assessment)\b|\b(?:say|speak)\s+(?:the|your)\s+(?:answer|solution)\s+(?:aloud|orally)\b/i,
          `${location} must not require an oral assessment`);
      }
      for (const problem of numeric) {
        text(problem.question, `${location} free-response question`);
        assert.ok(problem.accept?.length, `${location} needs an accepted answer`);
        text(problem.explanation, `${location} free-response explanation`);
        assert.doesNotMatch(problem.question, /\boral\s+(?:exam|assessment)\b|\b(?:say|speak)\s+(?:the|your)\s+(?:answer|solution)\s+(?:aloud|orally)\b/i,
          `${location} must not require an oral assessment`);
        if (problem.accept.every(answer => typeof answer === 'number' && Number.isFinite(answer))) {
          const answer = problem.accept[0];
          assert.ok(problemEngine.checkAnswer(String(answer), problem.accept, 'freeResponse', problem.tolerance),
            `${location} rejects its own canonical numerical answer`);
          const clearlyWrong = Math.max(...problem.accept) + Math.max(1, (problem.tolerance || 0) * 4);
          assert.equal(problemEngine.checkAnswer(String(clearlyWrong), problem.accept, 'freeResponse', problem.tolerance), false,
            `${location} accepts a value outside its stated tolerance`);
        }
      }
    }
  }
});

test('new Landau lesson strings preserve TeX escapes and contain no unintended control characters', () => {
  const { modules } = load();
  for (const file of fs.readdirSync(path.join(root, 'js/modules')).filter(name => /^m_landau.*\.js$/.test(name))) {
    const source = fs.readFileSync(path.join(root, 'js/modules', file), 'utf8');
    assert.deepEqual(lostTexEscapes(source), [], `${file} contains a TeX command in an ordinary string that JavaScript will consume`);
  }
  function check(value, location) {
    if (typeof value === 'string') {
      assert.doesNotMatch(value, /[\x00-\x09\x0b-\x1f\x7f]/, `${location} has an unintended control character`);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => check(item, `${location}[${index}]`));
    } else if (value && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]') {
      for (const [key, item] of Object.entries(value)) check(item, `${location}.${key}`);
    }
  }
  for (const module of modules.filter(item => item.id?.startsWith('landau-'))) check(module, module.id);
});
