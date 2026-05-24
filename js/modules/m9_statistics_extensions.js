/* ============================================================
   MODULE 9 EXTENSION: Statistics topics
   ============================================================ */
(function() {
if (!window.MATH_MODULES) window.MATH_MODULES = [];
const WHY = (title, body) => `<div class="why-box"><div class="why-box-header" onclick="MathEngine.toggleWhyBox(this)">${title}</div><div class="why-box-body">${body}</div></div>`;
const mod = window.MATH_MODULES.find(m => m.id === 'probability-statistics');
if (!mod) return;

mod.description = 'Counting, probability, random variables, descriptive statistics, sampling, inference, and regression. Quantifying uncertainty with mathematics. Requires: algebra and basic function notation.';

const topics = [
{
  id: 'descriptive-statistics',
  title: 'Descriptive Statistics & Data Displays',
  description: 'Summarizing data with center, spread, shape, and displays.',
  prereqRecap: [
    { term: 'Data set', definition: 'A collection of observed values, such as scores, measurements, counts, or categories.' },
    { term: 'Mean', definition: 'The arithmetic average: add all values and divide by the number of values.' },
    { term: 'Number line', definition: 'A visual scale that makes order, distance, and spread visible.' }
  ],
  whyExists: { html: String.raw`
    <p><strong>Purpose.</strong> Raw data is hard to interpret. Descriptive statistics compress a list of observations into a few values that describe center, spread, and shape.</p>
    ${WHY('Why center and spread both matter', '<p>Two data sets can have the same mean and very different reliability. A score pattern near 80 every time is different from scores near 50 and 110. Spread measures that difference.</p>')}
  ` },
  formalDefinitions: [
    { term: 'Mean', symbol: '$\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n}x_i$', definition: 'The arithmetic average of a sample.' },
    { term: 'Median', symbol: '', definition: 'The middle value after sorting. With an even number of values, use the mean of the two middle values.' },
    { term: 'Variance', symbol: '$s^2 = \\frac{1}{n-1}\\sum (x_i - \\bar{x})^2$', definition: 'Sample measure of average squared distance from the mean.' },
    { term: 'Standard Deviation', symbol: '$s = \\sqrt{s^2}$', definition: 'Typical distance from the mean, measured in the same units as the data.' },
    { term: 'Interquartile Range', symbol: '$IQR = Q_3 - Q_1$', definition: 'Spread of the middle half of the data.' }
  ],
  concept: { html: String.raw`
    <div class="callout callout-key"><h4>Center</h4>
    <p>The mean uses every value and responds strongly to outliers. The median uses order and resists outliers. The mode identifies the most common value.</p></div>
    <div class="callout callout-key"><h4>Spread</h4>
    <p>Range uses only the maximum and minimum. IQR uses the middle half. Standard deviation uses every distance from the mean.</p></div>
    <div class="callout callout-key"><h4>Shape</h4>
    <p>A distribution can be symmetric, skewed right, skewed left, uniform, or clustered. Shape tells which summary is most useful. Skewed data is often better summarized by median and IQR.</p></div>
  ` },
  definition: { html: String.raw`<p><strong>Descriptive statistics</strong> organize and summarize observed data without claiming that a broader population must behave the same way.</p>` },
  examples: [
    {
      title: 'A Complete Data Summary',
      problem: 'Summarize the data set $4, 7, 7, 9, 13$.',
      steps: [
        { title: 'Mean', content: '$\\bar{x} = \\frac{4+7+7+9+13}{5} = \\frac{40}{5} = 8$.', why: 'Mean uses the total spread across all values.' },
        { title: 'Median and mode', content: 'The sorted list is already $4,7,7,9,13$. The median is $7$. The mode is $7$.', why: 'The middle value is the third value. The repeated value is the mode.' },
        { title: 'Range and IQR', content: 'Range is $13 - 4 = 9$. $Q_1 = 5.5$, $Q_3 = 11$, so $IQR = 5.5$.', why: 'Quartiles split the lower and upper halves of the sorted data.' },
        { title: 'Interpretation', content: 'The mean is larger than the median because the high value 13 pulls the average upward.', why: 'Comparing mean and median helps identify skew.' }
      ]
    },
    {
      title: 'Choosing a Summary',
      problem: 'A neighborhood has home prices of $180k, 190k, 200k, 210k, 900k$. Which center better describes a typical home price?',
      steps: [
        { title: 'Compute the mean', content: '$\\bar{x} = \\frac{180+190+200+210+900}{5} = 336$ thousand dollars.', why: 'The 900k value pulls the mean upward.' },
        { title: 'Find the median', content: 'The median is 200k.', why: 'The median is the middle value after sorting and resists the outlier.' },
        { title: 'Choose the better summary', content: 'The median better represents a typical home price in this data set.', why: 'A typical value should describe the central cluster, not the outlier.' }
      ]
    }
  ],
  exercises: [
    { difficulty: 'easy', question: 'Mean of $2,4,6,8$:', options: ['$4$', '$5$', '$6$', '$8$'], correctIndex: 1, hint: '<p>Add the values and divide by 4.</p>', correctExplanation: '$\\frac{2+4+6+8}{4}=5$.', wrongExplanations: { 0: '4 is one of the values, not the mean.', 2: '6 is above the average.', 3: '8 is the maximum.' } },
    { difficulty: 'easy', question: 'Median of $3,5,9$:', options: ['$3$', '$5$', '$9$', '$17$'], correctIndex: 1, hint: '<p>The median is the middle sorted value.</p>', correctExplanation: 'The middle value is 5.', wrongExplanations: { 0: '3 is the minimum.', 2: '9 is the maximum.', 3: '17 is the sum.' } },
    { difficulty: 'medium', question: 'Range of $10,12,15,21$:', options: ['$9$', '$11$', '$31$', '$58$'], correctIndex: 1, hint: '<p>Range equals maximum minus minimum.</p>', correctExplanation: '$21-10=11$.', wrongExplanations: { 0: '$21-12=9$ uses the wrong minimum.', 2: '31 adds max and min.', 3: '58 is the sum.' } },
    { difficulty: 'medium', question: 'Which statistic is most resistant to outliers?', options: ['Mean', 'Median', 'Range', 'Standard deviation'], correctIndex: 1, hint: '<p>Use the statistic based on order rather than total.</p>', correctExplanation: 'The median uses position in the sorted list, so one extreme value has less effect.', wrongExplanations: { 0: 'Mean uses every value and is pulled by outliers.', 2: 'Range depends entirely on extremes.', 3: 'Standard deviation increases when an outlier is far from the mean.' } },
    { difficulty: 'hard', question: 'If $Q_1=12$ and $Q_3=30$, then $IQR=$', options: ['$12$', '$18$', '$30$', '$42$'], correctIndex: 1, hint: '<p>$IQR = Q_3 - Q_1$.</p>', correctExplanation: '$30-12=18$.', wrongExplanations: { 0: '12 is $Q_1$.', 2: '30 is $Q_3$.', 3: '42 adds quartiles.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'Mean of $5,5,10$:', accept: ['20/3', '6.67', '6.6667'], placeholder: 'Number', explanation: '$\\frac{5+5+10}{3}=\\frac{20}{3}\\approx6.67$.' },
    { difficulty: 'easy', question: 'Mode of $2,3,3,4,5$:', accept: [3, '3'], placeholder: 'Number', explanation: 'The value 3 appears most often.' },
    { difficulty: 'medium', question: 'Range of $-2,4,9$:', accept: [11, '11'], placeholder: 'Number', explanation: '$9-(-2)=11$.' },
    { difficulty: 'medium', question: 'If $s^2=16$, then $s=$?', accept: [4, '4'], placeholder: 'Number', explanation: 'Standard deviation is the square root of variance.' },
    { difficulty: 'hard', question: 'For values $1,2,3$, using sample variance, $s^2=$?', accept: [1, '1'], placeholder: 'Number', explanation: '$\\bar{x}=2$. Squared deviations are $1,0,1$. Divide by $n-1=2$, so $s^2=1$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Find the sample standard deviation of $2,4,6$.', steps: [
      { content: 'Compute the mean: $\\bar{x}=4$.' },
      { content: 'Compute deviations: $-2,0,2$.' },
      { content: 'Square deviations: $4,0,4$.' },
      { content: 'Sample variance: $s^2=\\frac{4+0+4}{3-1}=4$.' },
      { content: 'Sample standard deviation: $s=\\sqrt{4}=2$.' }
    ], explanation: 'Sample variance divides by $n-1$ because the sample mean was estimated from the same data.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each summary to its meaning:', pairs: [
      { left: 'Mean', right: 'Arithmetic average' },
      { left: 'Median', right: 'Middle sorted value' },
      { left: 'Mode', right: 'Most frequent value' },
      { left: 'IQR', right: 'Middle-half spread' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Spread:', expression: '$IQR = Q_3 -$ {{0}}', blanks: [{ accept: ['Q_1', 'Q1'], size: 5 }], explanation: 'Interquartile range is $Q_3-Q_1$.' }
  ],
  stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Descriptive Statistics Strategy</h4><ol><li>Sort the data before finding median or quartiles.</li><li>Use mean and standard deviation for roughly symmetric data.</li><li>Use median and IQR when outliers or skew are present.</li><li>Always attach context and units to a summary.</li></ol></div>` }
},

{
  id: 'conditional-probability-bayes',
  title: "Conditional Probability & Bayes' Rule",
  description: 'Updating probabilities when new information is known.',
  prereqRecap: [
    { term: 'Intersection', definition: '$A \\cap B$ means both events occur.' },
    { term: 'Conditional probability', definition: '$P(A|B)$ means probability of $A$ after $B$ is known.' },
    { term: 'Complement', definition: '$A^c$ means event $A$ does not occur.' }
  ],
  whyExists: { html: String.raw`
    <p><strong>Purpose.</strong> Most real decisions use partial information. Conditional probability updates a probability after evidence is observed.</p>
    ${WHY('Why base rates matter', '<p>A rare condition can produce many false positives even with a strong test. Bayes rule forces the base rate, test accuracy, and false positive rate into the same calculation.</p>')}
  ` },
  formalDefinitions: [
    { term: 'Conditional Probability', symbol: '$P(A|B)=\\frac{P(A\\cap B)}{P(B)}$', definition: 'Probability of $A$ given $B$, defined when $P(B)>0$.' },
    { term: "Bayes' Rule", symbol: '$P(A|B)=\\frac{P(B|A)P(A)}{P(B)}$', definition: 'A rule for reversing conditional probabilities.' },
    { term: 'Law of Total Probability', symbol: '$P(B)=\\sum_i P(B|A_i)P(A_i)$', definition: 'Computes a total probability by splitting cases into a partition.' }
  ],
  concept: { html: String.raw`
    <div class="callout callout-key"><h4>Conditional Thinking</h4>
    <p>The vertical bar in $P(A|B)$ means the sample space has changed. Only outcomes where $B$ occurred remain possible.</p></div>
    <div class="callout callout-key"><h4>Bayesian Update</h4>
    <p>Prior probability is the starting probability. Evidence changes it through likelihood. The result is a posterior probability.</p></div>
  ` },
  definition: { html: String.raw`<p><strong>Bayesian reasoning</strong> updates a prior probability using evidence and a model for how likely that evidence is under each case.</p>` },
  examples: [
    {
      title: 'Two-Way Table',
      problem: 'In a class of 30 students, 18 study, 12 do not study, and 15 pass. Of the students who study, 14 pass. Find $P(\\text{study}|\\text{pass})$.',
      steps: [
        { title: 'Identify the conditional sample space', content: 'The condition is pass, so only the 15 students who pass remain in the denominator.', why: '$P(A|B)$ restricts the denominator to event $B$.' },
        { title: 'Count the overlap', content: '14 students both study and pass.', why: 'This is $\\text{study}\\cap\\text{pass}$.' },
        { title: 'Compute', content: '$P(\\text{study}|\\text{pass})=\\frac{14}{15}$.', why: 'Conditional probability is overlap divided by the condition total.' }
      ]
    },
    {
      title: 'Bayes Rule With Screening',
      problem: 'A condition affects 1% of people. A test detects it 98% of the time when present and has a 5% false positive rate. Find $P(\\text{condition}|+)$.',
      steps: [
        { title: 'Compute true-positive path', content: '$P(+|D)P(D)=0.98(0.01)=0.0098$.', why: 'This is the probability of having the condition and testing positive.' },
        { title: 'Compute false-positive path', content: '$P(+|D^c)P(D^c)=0.05(0.99)=0.0495$.', why: 'Most people do not have the condition, so false positives can dominate.' },
        { title: 'Normalize', content: '$P(D|+)=\\frac{0.0098}{0.0098+0.0495}\\approx0.165$.', why: 'The denominator includes all ways to get a positive test.' }
      ]
    }
  ],
  exercises: [
    { difficulty: 'easy', question: 'If $P(A\\cap B)=0.2$ and $P(B)=0.5$, then $P(A|B)=$', options: ['$0.1$', '$0.2$', '$0.4$', '$0.7$'], correctIndex: 2, hint: '<p>Divide the intersection by the condition.</p>', correctExplanation: '$0.2/0.5=0.4$.', wrongExplanations: { 0: 'That multiplies instead of divides.', 1: 'That is the intersection.', 3: 'That adds probabilities.' } },
    { difficulty: 'medium', question: 'Bayes rule reverses:', options: ['Addition', 'Conditional probabilities', 'Multiplication only', 'Averages'], correctIndex: 1, hint: '<p>It connects $P(A|B)$ and $P(B|A)$.</p>', correctExplanation: "Bayes' rule computes one conditional probability from the reverse conditional probability and base rates.", wrongExplanations: { 0: 'Bayes is not an addition rule.', 2: 'Multiplication appears inside the formula, but reversal of conditioning is the key idea.', 3: 'Averages are not the target.' } },
    { difficulty: 'hard', question: 'If $P(D)=0.1$, $P(+|D)=0.9$, and $P(+|D^c)=0.2$, then $P(D|+)=$', options: ['$0.09$', '$0.20$', '$1/3$', '$0.90$'], correctIndex: 2, hint: '<p>Use $0.9(0.1)$ over $0.9(0.1)+0.2(0.9)$.</p>', correctExplanation: '$0.09/(0.09+0.18)=1/3$.', wrongExplanations: { 0: 'That is the true-positive path only.', 1: 'That is the false positive rate.', 3: 'That is sensitivity, not the posterior.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'If $P(A\\cap B)=0.12$ and $P(B)=0.3$, find $P(A|B)$.', accept: ['0.4', '.4'], placeholder: 'Probability', explanation: '$0.12/0.3=0.4$.' },
    { difficulty: 'medium', question: 'If $P(A)=0.25$ and $P(B|A)=0.6$, find $P(A\\cap B)$.', accept: ['0.15', '.15'], placeholder: 'Probability', explanation: '$P(A\\cap B)=P(B|A)P(A)=0.6(0.25)=0.15$.' },
    { difficulty: 'hard', question: 'A test has true-positive path $0.02$ and false-positive path $0.08$. Find posterior probability of the condition after a positive test.', accept: ['0.2', '.2', '20%'], placeholder: 'Probability', explanation: '$0.02/(0.02+0.08)=0.2$.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Use Bayes rule when $P(A)=0.3$, $P(B|A)=0.8$, and $P(B|A^c)=0.2$.', steps: [
      { content: 'Compute the $A$ path: $P(B|A)P(A)=0.8(0.3)=0.24$.' },
      { content: 'Compute the $A^c$ path: $P(B|A^c)P(A^c)=0.2(0.7)=0.14$.' },
      { content: 'Compute $P(B)=0.24+0.14=0.38$.' },
      { content: 'Compute $P(A|B)=0.24/0.38\\approx0.632$.' }
    ], explanation: 'Bayes rule divides the target evidence path by all evidence paths.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each expression to its meaning:', pairs: [
      { left: '$P(A|B)$', right: 'A given B' },
      { left: '$P(A\\cap B)$', right: 'A and B' },
      { left: '$P(A\\cup B)$', right: 'A or B' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Conditional probability:', expression: '$P(A|B)=P(A\\cap B)/P($ {{0}} $)$', blanks: [{ accept: ['B'], size: 3 }], explanation: 'The condition event goes in the denominator.' }
  ],
  stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Conditional Probability Strategy</h4><ol><li>Identify the condition after the vertical bar.</li><li>Restrict the denominator to the condition.</li><li>For Bayes rule, list every path that can produce the evidence.</li><li>Divide the target path by the total evidence probability.</li></ol></div>` }
},

{
  id: 'sampling-inference',
  title: 'Sampling, Confidence Intervals & Hypothesis Tests',
  description: 'Using sample data to estimate or test claims about a population.',
  prereqRecap: [
    { term: 'Population', definition: 'The full group being studied.' },
    { term: 'Sample', definition: 'The observed subset used to learn about the population.' },
    { term: 'Normal approximation', definition: 'A bell-curve approximation for many sample statistics when sample size is large enough.' }
  ],
  whyExists: { html: String.raw`
    <p><strong>Purpose.</strong> Most studies cannot measure an entire population. Inference gives disciplined ways to estimate population values and test claims from samples.</p>
    ${WHY('Why uncertainty remains after sampling', '<p>A sample changes from draw to draw. A confidence interval reports an estimate plus a margin for expected sampling variation.</p>')}
  ` },
  formalDefinitions: [
    { term: 'Statistic', symbol: '', definition: 'A number computed from a sample, such as $\\bar{x}$ or $\\hat{p}$.' },
    { term: 'Parameter', symbol: '', definition: 'A number describing a population, such as $\\mu$ or $p$.' },
    { term: 'Standard Error', symbol: '', definition: 'The standard deviation of a statistic across repeated samples.' },
    { term: 'Confidence Interval', symbol: '$\\text{estimate}\\pm\\text{margin of error}$', definition: 'A range of plausible parameter values produced by a sampling method.' },
    { term: 'p-value', symbol: '', definition: 'The probability, assuming the null hypothesis, of seeing data at least as extreme as the observed data.' }
  ],
  concept: { html: String.raw`
    <div class="callout callout-key"><h4>Estimation</h4>
    <p>A sample statistic estimates a population parameter. Larger random samples usually reduce standard error.</p></div>
    <div class="callout callout-key"><h4>Testing</h4>
    <p>A hypothesis test starts with a null hypothesis, computes a test statistic, then uses a p-value to decide whether the data is unusual under the null model.</p></div>
  ` },
  definition: { html: String.raw`<p><strong>Statistical inference</strong> uses probability models to connect sample evidence with claims about a population.</p>` },
  examples: [
    {
      title: 'Confidence Interval for a Proportion',
      problem: 'A survey of 400 people finds 220 support a proposal. Build an approximate 95% confidence interval for the population proportion.',
      steps: [
        { title: 'Estimate', content: '$\\hat{p}=220/400=0.55$.', why: 'The sample proportion estimates the population proportion.' },
        { title: 'Standard error', content: '$SE=\\sqrt{\\frac{0.55(0.45)}{400}}\\approx0.0249$.', why: 'Proportions use $\\sqrt{\\hat{p}(1-\\hat{p})/n}$.' },
        { title: 'Margin of error', content: 'For about 95%, use $1.96SE\\approx1.96(0.0249)=0.049$.', why: '1.96 is the standard normal cutoff for a central 95% interval.' },
        { title: 'Interval', content: '$0.55\\pm0.049$, or about $(0.501,0.599)$.', why: 'The interval reports plausible population proportions.' }
      ]
    },
    {
      title: 'One-Proportion Hypothesis Test',
      problem: 'A coin is claimed fair. In 100 flips, 61 heads appear. Test the claim using a normal approximation.',
      steps: [
        { title: 'Null model', content: '$H_0:p=0.5$. Observed $\\hat{p}=0.61$.', why: 'The null represents the fair-coin claim.' },
        { title: 'Standard error under null', content: '$SE=\\sqrt{0.5(0.5)/100}=0.05$.', why: 'Hypothesis tests compute spread under the null model.' },
        { title: 'Test statistic', content: '$z=\\frac{0.61-0.5}{0.05}=2.2$.', why: 'The sample is 2.2 standard errors above the null value.' },
        { title: 'Interpretation', content: 'A two-sided p-value is about 0.028. This is evidence against fairness at the 5% level.', why: 'The result would be uncommon if the coin were fair.' }
      ]
    }
  ],
  exercises: [
    { difficulty: 'easy', question: 'A sample mean is a:', options: ['Parameter', 'Statistic', 'Population', 'p-value'], correctIndex: 1, hint: '<p>It is computed from sample data.</p>', correctExplanation: 'A sample mean is a statistic.', wrongExplanations: { 0: 'A parameter describes a population.', 2: 'Population is the full group.', 3: 'A p-value belongs to hypothesis testing.' } },
    { difficulty: 'medium', question: 'Increasing sample size usually makes standard error:', options: ['Larger', 'Smaller', 'Negative', 'Unchanged always'], correctIndex: 1, hint: '<p>Standard error often has $n$ in the denominator.</p>', correctExplanation: 'Larger samples reduce sampling variability.', wrongExplanations: { 0: 'More information usually reduces uncertainty.', 2: 'Standard error cannot be negative.', 3: 'It usually changes with sample size.' } },
    { difficulty: 'hard', question: 'A small p-value gives evidence:', options: ['For the null', 'Against the null', 'That the sample is biased', 'That the result is impossible'], correctIndex: 1, hint: '<p>Small p-values mean the data is unusual under the null.</p>', correctExplanation: 'A small p-value is evidence against the null model.', wrongExplanations: { 0: 'Large p-values are more consistent with the null.', 2: 'A p-value alone does not prove bias.', 3: 'Small probability does not mean impossible.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'If $\\hat{p}=0.60$ and margin of error is $0.04$, give the confidence interval.', accept: ['0.56 to 0.64', '(0.56,0.64)', '0.56,0.64'], placeholder: 'Interval', explanation: '$0.60\\pm0.04=(0.56,0.64)$.' },
    { difficulty: 'medium', question: 'For $n=100$ and $p=0.5$, standard error for a sample proportion is:', accept: ['0.05', '.05'], placeholder: 'Number', explanation: '$\\sqrt{0.5(0.5)/100}=0.05$.' },
    { difficulty: 'hard', question: 'If $z=2$ in a two-sided test, the approximate p-value is closest to 0.05 or 0.50?', accept: ['0.05'], placeholder: 'Value', explanation: 'Two tails beyond 2 standard deviations total about 0.05.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Build a 95% interval from estimate 40 and standard error 3.', steps: [
      { content: 'Use estimate $\\pm 1.96(SE)$ for an approximate 95% interval.' },
      { content: 'Margin of error: $1.96(3)=5.88$.' },
      { content: 'Lower endpoint: $40-5.88=34.12$.' },
      { content: 'Upper endpoint: $40+5.88=45.88$.' }
    ], explanation: 'Confidence intervals combine an estimate with a sampling-error allowance.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each term:', pairs: [
      { left: 'Parameter', right: 'Population value' },
      { left: 'Statistic', right: 'Sample value' },
      { left: 'Standard error', right: 'Spread of a statistic' },
      { left: 'p-value', right: 'Tail probability under null' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'medium', context: 'Confidence interval:', expression: 'Estimate {{0}} margin of error', blanks: [{ accept: ['plus or minus', '+/-', '±'], size: 14 }], explanation: 'A confidence interval is estimate plus or minus margin of error.' }
  ],
  stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Inference Strategy</h4><ol><li>Name the population parameter.</li><li>Compute the sample statistic.</li><li>Use the correct standard error.</li><li>For intervals, report estimate plus or minus margin of error.</li><li>For tests, interpret the p-value under the null model.</li></ol></div>` }
},

{
  id: 'correlation-regression',
  title: 'Correlation & Linear Regression',
  description: 'Measuring linear association and fitting a prediction line.',
  prereqRecap: [
    { term: 'Scatterplot', definition: 'A plot of paired data values $(x,y)$.' },
    { term: 'Slope', definition: 'Change in $y$ divided by change in $x$.' },
    { term: 'Residual', definition: 'Observed value minus predicted value.' }
  ],
  whyExists: { html: String.raw`
    <p><strong>Purpose.</strong> Many data sets involve paired measurements. Correlation measures strength and direction of a linear relationship. Regression gives a line for prediction.</p>
    ${WHY('Why association is not causation', '<p>A strong correlation shows that two variables move together in the data. It does not prove one variable causes the other. A hidden third variable or study design issue may explain the pattern.</p>')}
  ` },
  formalDefinitions: [
    { term: 'Correlation', symbol: '$-1\\leq r\\leq 1$', definition: 'Measures direction and strength of a linear association.' },
    { term: 'Regression Line', symbol: '$\\hat{y}=a+bx$', definition: 'A line used to predict $y$ from $x$.' },
    { term: 'Residual', symbol: '$e=y-\\hat{y}$', definition: 'Observed value minus predicted value.' },
    { term: 'Coefficient of Determination', symbol: '$R^2$', definition: 'Proportion of variation in the response explained by the linear model.' }
  ],
  concept: { html: String.raw`
    <div class="callout callout-key"><h4>Correlation</h4>
    <p>Positive correlation means larger $x$ tends to go with larger $y$. Negative correlation means larger $x$ tends to go with smaller $y$. Correlation near 0 means weak linear association, not necessarily no relationship.</p></div>
    <div class="callout callout-key"><h4>Regression</h4>
    <p>A least-squares regression line minimizes the sum of squared residuals. The slope gives predicted change in $y$ for one unit of $x$.</p></div>
  ` },
  definition: { html: String.raw`<p><strong>Linear regression</strong> models a response variable with a line based on an explanatory variable.</p>` },
  examples: [
    {
      title: 'Using a Regression Line',
      problem: 'A model predicts monthly cost by $\\hat{y}=35+12x$, where $x$ is gigabytes used and $\\hat{y}$ is dollars. Interpret the slope and predict cost for 8 GB.',
      steps: [
        { title: 'Interpret intercept', content: 'The intercept 35 is the predicted cost at 0 GB.', why: 'It is the model value when $x=0$.' },
        { title: 'Interpret slope', content: 'The slope 12 means each additional GB predicts 12 more dollars.', why: 'Slope is predicted change in $y$ for a one-unit increase in $x$.' },
        { title: 'Predict', content: '$\\hat{y}=35+12(8)=131$.', why: 'Substitute $x=8$ into the regression equation.' }
      ]
    },
    {
      title: 'Residual Interpretation',
      problem: 'A model predicts 131 dollars, but the actual bill is 140 dollars. Find and interpret the residual.',
      steps: [
        { title: 'Compute residual', content: '$e=y-\\hat{y}=140-131=9$.', why: 'Residual compares actual to predicted.' },
        { title: 'Interpret', content: 'The actual bill is 9 dollars higher than predicted.', why: 'A positive residual means the model underpredicted.' }
      ]
    }
  ],
  exercises: [
    { difficulty: 'easy', question: 'Correlation $r=-0.85$ indicates:', options: ['Strong negative linear association', 'Weak positive association', 'No association', 'Causation'], correctIndex: 0, hint: '<p>Look at sign and magnitude.</p>', correctExplanation: 'The value is close to -1, so the linear association is strong and negative.', wrongExplanations: { 1: 'The sign is negative.', 2: 'The magnitude is large.', 3: 'Correlation does not prove causation.' } },
    { difficulty: 'medium', question: 'For $\\hat{y}=10+3x$, predicted $y$ at $x=4$ is:', options: ['$13$', '$14$', '$22$', '$40$'], correctIndex: 2, hint: '<p>Substitute $x=4$.</p>', correctExplanation: '$10+3(4)=22$.', wrongExplanations: { 0: 'That uses $x=1$.', 1: 'That adds 10 and 4 only.', 3: 'That multiplies 10 by 4.' } },
    { difficulty: 'hard', question: 'If actual $y=30$ and predicted $\\hat{y}=26$, residual is:', options: ['$-4$', '$4$', '$26$', '$56$'], correctIndex: 1, hint: '<p>Residual equals observed minus predicted.</p>', correctExplanation: '$30-26=4$.', wrongExplanations: { 0: 'That reverses the subtraction.', 2: '26 is predicted value.', 3: 'That adds values.' } }
  ],
  freeResponse: [
    { difficulty: 'easy', question: 'For $\\hat{y}=5+2x$, predict $y$ when $x=6$.', accept: [17, '17'], placeholder: 'Number', explanation: '$5+2(6)=17$.' },
    { difficulty: 'medium', question: 'Actual value 50, predicted value 46. Residual:', accept: [4, '4'], placeholder: 'Number', explanation: '$50-46=4$.' },
    { difficulty: 'hard', question: 'If $r=0.9$, is the linear association strong or weak?', accept: ['strong'], placeholder: 'Strong/weak', explanation: '$0.9$ is close to 1, so the linear association is strong and positive.' }
  ],
  stepBuilder: [
    { difficulty: 'medium', question: 'Use $\\hat{y}=20+4x$ to predict and find a residual.', steps: [
      { content: 'For $x=7$, compute $\\hat{y}=20+4(7)=48$.' },
      { content: 'If actual $y=51$, compute residual $e=y-\\hat{y}=51-48=3$.' },
      { content: 'The model underpredicted by 3.' }
    ], explanation: 'Prediction uses the line. Residual measures prediction error.' }
  ],
  matching: [
    { difficulty: 'easy', instruction: 'Match each term:', pairs: [
      { left: 'Correlation', right: 'Strength and direction' },
      { left: 'Slope', right: 'Predicted change per unit' },
      { left: 'Residual', right: 'Observed minus predicted' },
      { left: '$R^2$', right: 'Explained variation proportion' }
    ] }
  ],
  fillBlanks: [
    { difficulty: 'easy', context: 'Residual:', expression: '$e = y -$ {{0}}', blanks: [{ accept: ['yhat', '\\hat{y}', 'predicted'], size: 10 }], explanation: 'Residual equals actual minus predicted.' }
  ],
  stuckGuide: { html: String.raw`<div class="callout callout-tip"><h4>Regression Strategy</h4><ol><li>Make a scatterplot before trusting a line.</li><li>Use correlation only for linear association.</li><li>Interpret slope in context and units.</li><li>Use residuals to check model fit.</li><li>Do not treat correlation as proof of causation.</li></ol></div>` }
}
];

const existingIds = new Set(mod.topics.map(topic => topic.id));
topics.forEach(topic => {
  if (!existingIds.has(topic.id)) mod.topics.push(topic);
});
})();
