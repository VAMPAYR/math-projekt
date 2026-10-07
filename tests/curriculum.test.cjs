/* Curriculum integration checks. Run with: node --test tests/curriculum.test.cjs */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...index.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)]
  .map(match => match[1].split('?')[0]);
const curriculumScripts = scripts.filter(src => src.startsWith('js/modules/')
  || /^js\/(self_study_guides|university_walkthroughs)\.js$/.test(src));

function loadCurriculum() {
  // Lesson registration must work before the page has rendered any figure.
  const context = vm.createContext({ window: {} });
  for (const src of curriculumScripts) {
    vm.runInContext(fs.readFileSync(path.join(root, src), 'utf8'), context, { filename: src });
  }
  vm.runInContext(fs.readFileSync(path.join(root, 'js/problem_engine.js'), 'utf8'), context,
    { filename: 'js/problem_engine.js' });
  return {
    modules: context.window.MATH_MODULES,
    studyGuides: context.window.MATH_SELF_STUDY_GUIDES,
    walkthroughs: context.window.MATH_UNIVERSITY_WALKTHROUGHS,
    problemEngine: vm.runInContext('ProblemEngine', context)
  };
}

function topics(modules) {
  return modules.flatMap(module => module.topics.map(topic => ({ module, topic })));
}

function nonemptyText(value, location) {
  assert.equal(typeof value, 'string', `${location} must be text`);
  assert.ok(value.trim().length > 0, `${location} must not be empty`);
}

function validIndex(index, length, location) {
  assert.ok(Number.isInteger(index) && index >= 0 && index < length,
    `${location}: answer index ${index} is outside ${length} choices`);
}

test('the page loads every curriculum script once, before the core engine', () => {
  const enginePosition = scripts.indexOf('js/engine.js');
  assert.ok(enginePosition >= 0, 'the page must load the core engine');
  assert.equal(new Set(curriculumScripts).size, curriculumScripts.length);
  const moduleFiles = fs.readdirSync(path.join(root, 'js/modules'))
    .filter(file => file.endsWith('.js')).map(file => `js/modules/${file}`).sort();
  assert.deepEqual(curriculumScripts.filter(src => src.startsWith('js/modules/')).sort(), moduleFiles,
    'an existing module must not disappear because its script was omitted from index.html');
  for (const src of curriculumScripts) {
    assert.ok(scripts.indexOf(src) < enginePosition, `${src} must register before engine initialization`);
  }
  const { modules } = loadCurriculum();
  assert.ok(modules.find(module => module.id === 'foundations')?.topics
    .some(topic => topic.id === 'relations-equivalence'), 'topic extensions must reach their parent module');
  assert.ok(modules.find(module => module.id === 'probability-statistics')?.topics
    .some(topic => topic.id === 'descriptive-statistics'), 'statistics extensions must reach their parent module');
});

test('module IDs and module-scoped topic IDs are unique and usable in navigation', () => {
  const { modules } = loadCurriculum();
  assert.ok(Array.isArray(modules) && modules.length > 0);
  const moduleIds = new Set();
  for (const module of modules) {
    nonemptyText(module.id, 'module ID');
    nonemptyText(module.title, `${module.id} title`);
    assert.ok(!moduleIds.has(module.id), `duplicate module ID: ${module.id}`);
    moduleIds.add(module.id);
    assert.ok(Array.isArray(module.topics) && module.topics.length > 0, `${module.id} has no topics`);
    const topicIds = new Set();
    for (const topic of module.topics) {
      nonemptyText(topic.id, `${module.id} topic ID`);
      nonemptyText(topic.title, `${module.id}:${topic.id} title`);
      assert.ok(!topicIds.has(topic.id), `duplicate topic ID: ${module.id}:${topic.id}`);
      topicIds.add(topic.id);
    }
  }
});

test('foundation links and supplemental lesson keys resolve to active topics', () => {
  const { modules, studyGuides, walkthroughs } = loadCurriculum();
  const keys = new Set(topics(modules).map(({ module, topic }) => `${module.id}:${topic.id}`));
  for (const { module, topic } of topics(modules)) {
    for (const ref of topic.foundationRefs || []) {
      assert.ok(keys.has(`${ref.moduleId}:${ref.topicId}`),
        `${module.id}:${topic.id} links to absent foundation ${ref.moduleId}:${ref.topicId}`);
      nonemptyText(ref.note, `${module.id}:${topic.id} foundation link purpose`);
    }
  }
  for (const [name, supplements] of [['study guide', studyGuides], ['walkthrough', walkthroughs]]) {
    assert.ok(supplements && Object.keys(supplements).length > 0, `missing ${name} collection`);
    for (const key of Object.keys(supplements)) {
      assert.ok(keys.has(key), `${name} ${key} cannot be reached from an active topic`);
    }
  }
});

test('every authored structured problem survives rendering with valid steps or answerable parts', () => {
  const { modules, problemEngine } = loadCurriculum();
  for (const { module, topic } of topics(modules)) {
    for (const [field, childKey, render] of [
      ['stepBuilder', 'steps', problemEngine.renderStepBuilder],
      ['multiPart', 'parts', problemEngine.renderMultiPart]
    ]) {
      if (!topic[field]) continue;
      const location = `${module.id}:${topic.id}.${field}`;
      const originalQuestions = [];
      function collectQuestions(problems) {
        for (const problem of problems) {
          originalQuestions.push(problem.question);
          for (const child of problem[childKey] || []) {
            if (Array.isArray(child?.[childKey])) collectQuestions([child]);
          }
        }
      }
      collectQuestions(topic[field]);
      const html = render(topic[field], module.id, topic.id);
      for (const question of originalQuestions) {
        nonemptyText(question, `${location} question`);
        assert.ok(html.includes(question), `${location} loses an authored problem during rendering: ${question}`);
      }
      assert.equal(topic[field].length, originalQuestions.length,
        `${location} must promote nested problems into separate cards`);
      for (const [i, problem] of topic[field].entries()) {
        assert.ok(Array.isArray(problem[childKey]) && problem[childKey].length > 0,
          `${location}[${i}] has no ${childKey}`);
        for (const [j, child] of problem[childKey].entries()) {
          const childLocation = `${location}[${i}].${childKey}[${j}]`;
          assert.ok(!child.steps && !child.parts, `${childLocation} is still a nested problem`);
          nonemptyText(child[field === 'stepBuilder' ? 'content' : 'question'], childLocation);
          if (field === 'multiPart') {
            assert.ok(Array.isArray(child.accept) && child.accept.length > 0,
              `${childLocation} has no accepted answer`);
          }
        }
      }
      const secondRender = render(topic[field], module.id, topic.id);
      assert.equal(topic[field].length, originalQuestions.length, `${location} duplicates problems on revisit`);
      for (const question of originalQuestions) assert.ok(secondRender.includes(question));
    }
  }
});

test('choice-based practice references available options across the curriculum', () => {
  const { modules } = loadCurriculum();
  for (const { module, topic } of topics(modules)) {
    for (const field of ['exercises', 'strategySelect', 'multiSelect']) {
      for (const [i, problem] of (topic[field] || []).entries()) {
        const location = `${module.id}:${topic.id}.${field}[${i}]`;
        assert.ok(Array.isArray(problem.options) && problem.options.length >= 2, `${location} needs choices`);
        for (const option of problem.options) nonemptyText(option, `${location} option`);
        if (field === 'multiSelect') {
          assert.ok(Array.isArray(problem.correctIndices) && problem.correctIndices.length > 0,
            `${location} needs a correct answer set`);
          assert.equal(new Set(problem.correctIndices).size, problem.correctIndices.length,
            `${location} repeats a correct answer index`);
          for (const answer of problem.correctIndices) validIndex(answer, problem.options.length, location);
        } else validIndex(problem.correctIndex, problem.options.length, location);
      }
    }
    for (const [i, problem] of (topic.quantComparison || []).entries()) {
      const location = `${module.id}:${topic.id}.quantComparison[${i}]`;
      validIndex(problem.correctIndex, 4, location);
      nonemptyText(problem.quantityA, `${location} Quantity A`);
      nonemptyText(problem.quantityB, `${location} Quantity B`);
    }
  }
});

test('GRE Quant covers its core domains with all four active question formats and worked examples', () => {
  const { modules, problemEngine } = loadCurriculum();
  const gre = modules.find(module => module.id === 'gre-quant');
  assert.ok(gre, 'GRE Quant must be registered in the running curriculum');
  const requiredTopics = ['gre-quant-playbook', 'gre-integers-primes', 'gre-fractions-percents',
    'gre-algebra-toolkit', 'gre-word-problems', 'gre-statistics', 'gre-counting-probability',
    'gre-geometry', 'gre-coordinate-data'];
  for (const id of requiredTopics) assert.ok(gre.topics.some(topic => topic.id === id), `missing GRE coverage: ${id}`);
  for (const topic of gre.topics) {
    const location = `gre-quant:${topic.id}`;
    assert.ok(topic.foundationRefs?.length > 0, `${location} must connect to foundational lessons`);
    assert.ok(topic.examples?.length > 0, `${location} needs a worked example`);
    for (const example of topic.examples) {
      nonemptyText(example.problem, `${location} example problem`);
      assert.ok(example.steps?.length > 0, `${location} example needs reasoning steps`);
      for (const step of example.steps) nonemptyText(step.content, `${location} example step`);
    }
    for (const field of ['quantComparison', 'exercises', 'multiSelect', 'freeResponse']) {
      assert.ok(Array.isArray(topic[field]) && topic[field].length > 0, `${location} needs ${field} practice`);
    }
    for (const problem of topic.exercises) {
      assert.equal(problem.options.length, 5, `${location} GRE single-answer questions need five choices`);
      nonemptyText(problem.correctExplanation, `${location} single-answer explanation`);
    }
    for (const field of ['quantComparison', 'multiSelect', 'freeResponse']) {
      for (const problem of topic[field]) nonemptyText(problem.explanation, `${location}.${field} explanation`);
    }
    for (const problem of topic.freeResponse) {
      assert.ok(Array.isArray(problem.accept) && problem.accept.length > 0, `${location} numeric entry needs an answer`);
    }
    for (const [field, render] of [['quantComparison', problemEngine.renderQuantComparison],
      ['multiSelect', problemEngine.renderMultiSelect], ['freeResponse', problemEngine.renderFreeResponse]]) {
      const html = render(topic[field], gre.id, topic.id);
      assert.ok(!/\bundefined\b/.test(html), `${location}.${field} renders missing data`);
      for (const problem of topic[field]) {
        assert.ok(html.includes(problem.quantityA || problem.question), `${location}.${field} drops a question`);
      }
    }
  }
});
