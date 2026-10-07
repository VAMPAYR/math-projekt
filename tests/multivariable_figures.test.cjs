/* Numerical regressions for vector addition and curved integration slices.
   Run with: node --test tests/multivariable_figures.test.cjs */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function lesson(file, topicId) {
  const context = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/modules', file), 'utf8'), context);
  return context.window.MATH_MODULES[0].topics.find(topic => topic.id === topicId).concept.html;
}

function elements(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, 'g'))].map(match =>
    Object.fromEntries([...match[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map(attr => [attr[1], attr[2]]))
  );
}

function point(line, end) {
  return [Number(line[`x${end}`]), Number(line[`y${end}`])];
}

function displacement(line) {
  return [Number(line.x2) - Number(line.x1), Number(line.y2) - Number(line.y1)];
}

test('vector addition preserves the translated vector and draws the actual resultant', () => {
  // The previous translated copy had the wrong horizontal displacement, and the
  // arrow labelled v+w began at the tip of v instead of at the common origin.
  const html = lesson('m7_calculus3.js', 'vectors');
  const vectors = Object.fromEntries(elements(html, 'line')
    .filter(line => line['data-vector']).map(line => [line['data-vector'], line]));
  const v = vectors.v;
  const w = vectors.w;
  const translatedW = vectors['translated-w'];
  const sum = vectors.sum;
  assert.ok(v && w && translatedW && sum);
  assert.deepEqual(point(v, 1), point(w, 1));
  assert.deepEqual(point(sum, 1), point(v, 1));
  assert.deepEqual(point(translatedW, 1), point(v, 2));
  assert.deepEqual(displacement(translatedW), displacement(w));
  assert.deepEqual(point(sum, 2), point(translatedW, 2));
  assert.deepEqual(displacement(sum), displacement(v).map((value, i) => value + displacement(w)[i]));
  assert.match(html, /w \(translated\)/);
  const markers = elements(html, 'marker');
  for (const line of Object.values(vectors)) {
    const id = line['marker-end'].match(/^url\(#(.+)\)$/)[1];
    const marker = markers.find(item => item.id === id);
    assert.ok(marker, `${line['data-vector']} must have an arrowhead`);
    assert.equal(marker.orient, 'auto');
    assert.equal(Number(marker.refX), Number(marker.viewBox.split(' ')[2]));
  }
});

test('every integration slice terminates on the exact curved and straight boundaries', () => {
  // Old slice endpoints were guessed independently and extended outside R.
  const html = lesson('m8_calculus3.js', 'multiple-integrals');
  const paths = elements(html, 'path');
  const curve = paths.find(item => item['data-region-curve']);
  const shade = paths.find(item => item['data-region-boundary']);
  assert.ok(curve && shade);
  assert.equal(shade.d, `${curve.d} Z`, 'the fill must close the displayed curve with its chord');
  const coordinates = curve.d.match(/-?\d+(?:\.\d+)?/g).map(Number);
  assert.equal(coordinates.length, 10, 'the boundary has two quadratic Bezier segments');
  const curves = [
    [coordinates.slice(0, 2), coordinates.slice(2, 4), coordinates.slice(4, 6)],
    [coordinates.slice(4, 6), coordinates.slice(6, 8), coordinates.slice(8, 10)]
  ];
  const chord = elements(html, 'line').find(item => item['data-region-chord']);
  assert.deepEqual(point(chord, 1), curves[0][0]);
  assert.deepEqual(point(chord, 2), curves[1][2]);
  const slices = elements(html, 'line').filter(item => item['data-region-slice']);
  assert.equal(slices.length, 6);
  const at = (points, t, axis) => (1 - t) ** 2 * points[0][axis]
    + 2 * (1 - t) * t * points[1][axis] + t ** 2 * points[2][axis];
  for (const slice of slices) {
    const x = Number(slice.x1);
    assert.equal(Number(slice.x2), x);
    const points = curves.find(segment => x >= segment[0][0] && x <= segment[2][0]);
    assert.ok(points);
    // Invert x(t) independently by bisection rather than repeating the source's
    // quadratic formula, so a wrong root or Bezier coefficient fails this test.
    let low = 0;
    let high = 1;
    for (let i = 0; i < 60; i++) {
      const mid = (low + high) / 2;
      if (at(points, mid, 0) < x) low = mid;
      else high = mid;
    }
    const curvedY = at(points, (low + high) / 2, 1);
    const straightY = Number(chord.y1) + (x - Number(chord.x1))
      * (Number(chord.y2) - Number(chord.y1)) / (Number(chord.x2) - Number(chord.x1));
    assert.ok(Math.abs(Number(slice.y2) - curvedY) <= 0.000501, `slice at ${x} misses the curved boundary`);
    assert.ok(Math.abs(Number(slice.y1) - straightY) <= 0.000501, `slice at ${x} misses the straight boundary`);
    assert.ok(Number(slice.y2) < Number(slice.y1), 'the upper curve must lie above the lower chord');
  }
});

test('the repaired figures expose descriptions and keep their vector endpoints within the viewBox', () => {
  for (const [file, topicId] of [['m7_calculus3.js', 'vectors'], ['m8_calculus3.js', 'multiple-integrals']]) {
    const html = lesson(file, topicId);
    const svg = elements(html, 'svg')[0];
    assert.equal(svg.role, 'img');
    const ids = svg['aria-labelledby'].split(' ');
    assert.equal(ids.length, 2);
    for (const id of ids) assert.ok(html.includes(`id="${id}">`));
    assert.match(html, /<title[^>]*>[^<]+<\/title>/);
    assert.match(html, /<desc[^>]*>[^<]+<\/desc>/);
    const [left, top, width, height] = svg.viewBox.split(' ').map(Number);
    for (const line of elements(html, 'line')) for (const end of [1, 2]) {
      const [x, y] = point(line, end);
      assert.ok(Number.isFinite(x) && Number.isFinite(y));
      assert.ok(x >= left && x <= left + width && y >= top && y <= top + height);
    }
  }
});
