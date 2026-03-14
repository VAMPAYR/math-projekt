const fs = require('fs');
const path = 'js/modules/m6_calculus1.js';
let content = fs.readFileSync(path, 'utf8');
let lines = content.split('\n');
// Line 264 (0-indexed: 263) has broken escaping in WHY call
// Replace the entire line with correct escaping
lines[263] = "    ${WHY('Why does concavity determine max/min?', '<p>Concave up ($f\\'\\'  > 0$) means the slope is increasing. At a critical point where slope = 0, the slope goes from negative to positive: the function dips then rises. That is a minimum. Conversely for concave down.</p>')}</div>";
fs.writeFileSync(path, lines.join('\n'));
console.log('Fixed line 264');
