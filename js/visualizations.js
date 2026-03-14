/* ============================================================
   MATH ZERO-TO-HERO: Visualization Toolkit
   Canvas-based interactive math visualizations
   ============================================================ */

const Viz = (() => {
  const COLORS = {
    bg: '#1a2035',
    grid: 'rgba(148, 163, 184, 0.08)',
    axis: 'rgba(148, 163, 184, 0.4)',
    axisLabel: '#94a3b8',
    blue: '#3b82f6',
    purple: '#8b5cf6',
    cyan: '#06b6d4',
    green: '#10b981',
    amber: '#f59e0b',
    red: '#ef4444',
    pink: '#ec4899',
    text: '#f1f5f9',
    textMuted: '#64748b'
  };

  const PALETTE = [COLORS.blue, COLORS.purple, COLORS.cyan, COLORS.green, COLORS.amber, COLORS.red, COLORS.pink];

  /* ---- Utility ---- */
  function getCanvas(containerId, width, height) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    let canvas = container.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      container.appendChild(canvas);
    }
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { canvas, ctx, w: width, h: height };
  }

  /* ============================================================
     FUNCTION PLOTTER
     ============================================================ */
  function plotFunction(containerId, fns, options = {}) {
    const w = options.width || 600;
    const h = options.height || 400;
    const xMin = options.xMin ?? -10;
    const xMax = options.xMax ?? 10;
    const yMin = options.yMin ?? -10;
    const yMax = options.yMax ?? 10;
    const showGrid = options.showGrid !== false;
    const labels = options.labels || [];
    const title = options.title || '';

    const r = getCanvas(containerId, w, h);
    if (!r) return;
    const { ctx } = r;

    const padL = 50, padR = 20, padT = title ? 40 : 20, padB = 40;
    const pw = w - padL - padR;
    const ph = h - padT - padB;

    function toScreenX(x) { return padL + ((x - xMin) / (xMax - xMin)) * pw; }
    function toScreenY(y) { return padT + ((yMax - y) / (yMax - yMin)) * ph; }

    /* Background */
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, w, h);

    /* Grid */
    if (showGrid) {
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      const xStep = niceStep(xMax - xMin);
      const yStep = niceStep(yMax - yMin);
      for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
        const sx = toScreenX(x);
        ctx.beginPath(); ctx.moveTo(sx, padT); ctx.lineTo(sx, padT + ph); ctx.stroke();
      }
      for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
        const sy = toScreenY(y);
        ctx.beginPath(); ctx.moveTo(padL, sy); ctx.lineTo(padL + pw, sy); ctx.stroke();
      }
    }

    /* Axes */
    ctx.strokeStyle = COLORS.axis;
    ctx.lineWidth = 1.5;
    if (yMin <= 0 && yMax >= 0) {
      const y0 = toScreenY(0);
      ctx.beginPath(); ctx.moveTo(padL, y0); ctx.lineTo(padL + pw, y0); ctx.stroke();
    }
    if (xMin <= 0 && xMax >= 0) {
      const x0 = toScreenX(0);
      ctx.beginPath(); ctx.moveTo(x0, padT); ctx.lineTo(x0, padT + ph); ctx.stroke();
    }

    /* Axis labels */
    ctx.fillStyle = COLORS.axisLabel;
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    const xStep = niceStep(xMax - xMin);
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      if (Math.abs(x) < 1e-10) continue;
      ctx.fillText(formatNum(x), toScreenX(x), padT + ph + 20);
    }
    ctx.textAlign = 'right';
    const yStep = niceStep(yMax - yMin);
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      if (Math.abs(y) < 1e-10) continue;
      ctx.fillText(formatNum(y), padL - 8, toScreenY(y) + 4);
    }

    /* Clip region */
    ctx.save();
    ctx.beginPath();
    ctx.rect(padL, padT, pw, ph);
    ctx.clip();

    /* Plot functions */
    const fnArr = Array.isArray(fns) ? fns : [fns];
    fnArr.forEach((fn, idx) => {
      const color = PALETTE[idx % PALETTE.length];
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let started = false;
      const steps = pw * 2;
      for (let i = 0; i <= steps; i++) {
        const x = xMin + (i / steps) * (xMax - xMin);
        let y;
        try { y = fn(x); } catch (e) { started = false; continue; }
        if (!isFinite(y) || isNaN(y)) { started = false; continue; }
        const sx = toScreenX(x);
        const sy = toScreenY(y);
        if (!started) { ctx.moveTo(sx, sy); started = true; }
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    });

    ctx.restore();

    /* Title */
    if (title) {
      ctx.fillStyle = COLORS.text;
      ctx.font = '600 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, w / 2, 24);
    }

    /* Legend */
    if (labels.length > 0) {
      const legendY = padT + 12;
      let legendX = padL + 12;
      ctx.font = '12px Inter, sans-serif';
      labels.forEach((label, idx) => {
        const color = PALETTE[idx % PALETTE.length];
        ctx.fillStyle = color;
        ctx.fillRect(legendX, legendY - 6, 16, 3);
        ctx.fillText(label, legendX + 22, legendY);
        legendX += ctx.measureText(label).width + 42;
      });
    }
  }

  /* ============================================================
     NUMBER LINE
     ============================================================ */
  function numberLine(containerId, points, options = {}) {
    const w = options.width || 600;
    const h = options.height || 80;
    const min = options.min ?? -10;
    const max = options.max ?? 10;

    const r = getCanvas(containerId, w, h);
    if (!r) return;
    const { ctx } = r;

    const padL = 30, padR = 30;
    const lineY = h / 2;
    const lineW = w - padL - padR;

    function toX(val) { return padL + ((val - min) / (max - min)) * lineW; }

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, w, h);

    /* Main line */
    ctx.strokeStyle = COLORS.axis;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padL - 10, lineY);
    ctx.lineTo(padL + lineW + 10, lineY);
    ctx.stroke();

    /* Arrows */
    ctx.fillStyle = COLORS.axis;
    ctx.beginPath();
    ctx.moveTo(padL + lineW + 10, lineY);
    ctx.lineTo(padL + lineW + 4, lineY - 5);
    ctx.lineTo(padL + lineW + 4, lineY + 5);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(padL - 10, lineY);
    ctx.lineTo(padL - 4, lineY - 5);
    ctx.lineTo(padL - 4, lineY + 5);
    ctx.fill();

    /* Tick marks */
    ctx.strokeStyle = COLORS.axisLabel;
    ctx.fillStyle = COLORS.axisLabel;
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.lineWidth = 1;
    const step = niceStep(max - min);
    for (let v = Math.ceil(min / step) * step; v <= max; v += step) {
      const x = toX(v);
      ctx.beginPath();
      ctx.moveTo(x, lineY - 6);
      ctx.lineTo(x, lineY + 6);
      ctx.stroke();
      ctx.fillText(formatNum(v), x, lineY + 22);
    }

    /* Points */
    (points || []).forEach((pt, idx) => {
      const x = toX(pt.value);
      const color = pt.color || PALETTE[idx % PALETTE.length];
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, lineY, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 9px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(pt.label || '', x, lineY + 3);
      if (pt.name) {
        ctx.fillStyle = color;
        ctx.font = '12px Inter, sans-serif';
        ctx.fillText(pt.name, x, lineY - 16);
      }
    });
  }

  /* ============================================================
     VENN DIAGRAM (2-set)
     ============================================================ */
  function vennDiagram(containerId, options = {}) {
    const w = options.width || 400;
    const h = options.height || 300;
    const labelA = options.labelA || 'A';
    const labelB = options.labelB || 'B';
    const highlight = options.highlight || 'none';

    const r = getCanvas(containerId, w, h);
    if (!r) return;
    const { ctx } = r;

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const radius = 90;
    const offset = 50;

    function drawCircle(x, y, fillColor, label, labelX) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = COLORS.text;
      ctx.font = '600 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, labelX, cy - radius - 12);
    }

    const colorA = 'rgba(59, 130, 246, 0.25)';
    const colorB = 'rgba(139, 92, 246, 0.25)';
    const colorHighlight = 'rgba(16, 185, 129, 0.35)';

    if (highlight === 'intersection') {
      drawCircle(cx - offset, cy, colorA, labelA, cx - offset - 30);
      drawCircle(cx + offset, cy, colorB, labelB, cx + offset + 30);
      /* Highlight intersection */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx - offset, cy, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.beginPath();
      ctx.arc(cx + offset, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = colorHighlight;
      ctx.fill();
      ctx.restore();
    } else if (highlight === 'union') {
      ctx.fillStyle = colorHighlight;
      ctx.beginPath();
      ctx.arc(cx - offset, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + offset, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx - offset, cy, radius, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx + offset, cy, radius, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = COLORS.text; ctx.font = '600 16px Inter, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(labelA, cx - offset - 30, cy - radius - 12);
      ctx.fillText(labelB, cx + offset + 30, cy - radius - 12);
    } else {
      drawCircle(cx - offset, cy, colorA, labelA, cx - offset - 30);
      drawCircle(cx + offset, cy, colorB, labelB, cx + offset + 30);
    }

    if (options.title) {
      ctx.fillStyle = COLORS.text;
      ctx.font = '600 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(options.title, cx, h - 12);
    }
  }

  /* ============================================================
     UNIT CIRCLE (interactive)
     ============================================================ */
  function unitCircle(containerId, options = {}) {
    const w = options.width || 500;
    const h = options.height || 500;
    let angle = options.angle ?? Math.PI / 4;

    const r = getCanvas(containerId, w, h);
    if (!r) return;
    const { canvas, ctx } = r;

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2 - 60;

    function draw() {
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      /* Grid */
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();

      /* Circle */
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      /* Angle arc */
      ctx.strokeStyle = COLORS.amber;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, -angle, angle > 0);
      ctx.stroke();

      /* Radius line */
      const px = cx + Math.cos(angle) * radius;
      const py = cy - Math.sin(angle) * radius;
      ctx.strokeStyle = COLORS.blue;
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();

      /* Point */
      ctx.fillStyle = COLORS.blue;
      ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();

      /* Cos line (horizontal) */
      ctx.strokeStyle = COLORS.green;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, cy); ctx.stroke();
      ctx.setLineDash([]);

      /* Sin line (vertical) */
      ctx.strokeStyle = COLORS.red;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(cx, py); ctx.stroke();
      ctx.setLineDash([]);

      /* Cos projection on x-axis */
      ctx.fillStyle = COLORS.green;
      ctx.beginPath(); ctx.arc(px, cy, 4, 0, Math.PI * 2); ctx.fill();

      /* Sin projection on y-axis */
      ctx.fillStyle = COLORS.red;
      ctx.beginPath(); ctx.arc(cx, py, 4, 0, Math.PI * 2); ctx.fill();

      /* Labels */
      const cosVal = Math.cos(angle).toFixed(3);
      const sinVal = Math.sin(angle).toFixed(3);
      const deg = ((angle * 180 / Math.PI) % 360).toFixed(1);

      ctx.font = '13px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillStyle = COLORS.amber;
      ctx.fillText(`θ = ${deg}°`, cx + 36, cy - 8);
      ctx.fillStyle = COLORS.green;
      ctx.fillText(`cos θ = ${cosVal}`, 12, h - 40);
      ctx.fillStyle = COLORS.red;
      ctx.fillText(`sin θ = ${sinVal}`, 12, h - 20);

      /* Axis labels */
      ctx.fillStyle = COLORS.axisLabel;
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('1', cx + radius, cy + 18);
      ctx.fillText('-1', cx - radius, cy + 18);
      ctx.fillText('1', cx + 12, cy - radius + 4);
      ctx.fillText('-1', cx + 14, cy + radius + 4);
    }

    draw();

    /* Interactivity: drag to change angle */
    let dragging = false;
    canvas.addEventListener('mousedown', () => { dragging = true; });
    canvas.addEventListener('mouseup', () => { dragging = false; });
    canvas.addEventListener('mouseleave', () => { dragging = false; });
    canvas.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - cx;
      const my = -(e.clientY - rect.top - cy);
      angle = Math.atan2(my, mx);
      if (angle < 0) angle += Math.PI * 2;
      draw();
    });
  }

  /* ============================================================
     DERIVATIVE VISUALIZER (tangent line animation)
     ============================================================ */
  function derivativeVisualizer(containerId, fn, dfn, options = {}) {
    const w = options.width || 600;
    const h = options.height || 400;
    const xMin = options.xMin ?? -5;
    const xMax = options.xMax ?? 5;
    const yMin = options.yMin ?? -5;
    const yMax = options.yMax ?? 5;
    let currentX = options.startX ?? 1;

    const r = getCanvas(containerId, w, h);
    if (!r) return;
    const { canvas, ctx } = r;

    const padL = 50, padR = 20, padT = 20, padB = 40;
    const pw = w - padL - padR;
    const ph = h - padT - padB;

    function toSX(x) { return padL + ((x - xMin) / (xMax - xMin)) * pw; }
    function toSY(y) { return padT + ((yMax - y) / (yMax - yMin)) * ph; }

    function draw() {
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      /* Grid */
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      const xStep = niceStep(xMax - xMin);
      const yStep = niceStep(yMax - yMin);
      for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
        ctx.beginPath(); ctx.moveTo(toSX(x), padT); ctx.lineTo(toSX(x), padT + ph); ctx.stroke();
      }
      for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
        ctx.beginPath(); ctx.moveTo(padL, toSY(y)); ctx.lineTo(padL + pw, toSY(y)); ctx.stroke();
      }

      /* Axes */
      ctx.strokeStyle = COLORS.axis;
      ctx.lineWidth = 1.5;
      if (yMin <= 0 && yMax >= 0) { ctx.beginPath(); ctx.moveTo(padL, toSY(0)); ctx.lineTo(padL + pw, toSY(0)); ctx.stroke(); }
      if (xMin <= 0 && xMax >= 0) { ctx.beginPath(); ctx.moveTo(toSX(0), padT); ctx.lineTo(toSX(0), padT + ph); ctx.stroke(); }

      /* Plot function */
      ctx.save();
      ctx.beginPath();
      ctx.rect(padL, padT, pw, ph);
      ctx.clip();

      ctx.strokeStyle = COLORS.blue;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= pw * 2; i++) {
        const x = xMin + (i / (pw * 2)) * (xMax - xMin);
        let y; try { y = fn(x); } catch(e) { started = false; continue; }
        if (!isFinite(y)) { started = false; continue; }
        if (!started) { ctx.moveTo(toSX(x), toSY(y)); started = true; }
        else ctx.lineTo(toSX(x), toSY(y));
      }
      ctx.stroke();

      /* Tangent line */
      const yVal = fn(currentX);
      const slope = dfn(currentX);
      if (isFinite(yVal) && isFinite(slope)) {
        const tangLen = 3;
        const x1 = currentX - tangLen;
        const y1 = yVal - slope * tangLen;
        const x2 = currentX + tangLen;
        const y2 = yVal + slope * tangLen;
        ctx.strokeStyle = COLORS.amber;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(toSX(x1), toSY(y1));
        ctx.lineTo(toSX(x2), toSY(y2));
        ctx.stroke();

        /* Point */
        ctx.fillStyle = COLORS.amber;
        ctx.beginPath(); ctx.arc(toSX(currentX), toSY(yVal), 6, 0, Math.PI * 2); ctx.fill();
      }

      ctx.restore();

      /* Info box */
      ctx.fillStyle = 'rgba(30, 38, 66, 0.9)';
      ctx.fillRect(padL + 8, padT + 8, 200, 60);
      ctx.fillStyle = COLORS.text;
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`x = ${currentX.toFixed(2)}`, padL + 16, padT + 28);
      ctx.fillText(`f(x) = ${(fn(currentX)).toFixed(3)}`, padL + 16, padT + 44);
      ctx.fillStyle = COLORS.amber;
      ctx.fillText(`f'(x) = ${slope.toFixed(3)}`, padL + 16, padT + 60);
    }

    draw();

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      currentX = xMin + ((mx - padL) / pw) * (xMax - xMin);
      currentX = Math.max(xMin, Math.min(xMax, currentX));
      draw();
    });
  }

  /* ============================================================
     INTEGRAL VISUALIZER (Riemann sums)
     ============================================================ */
  function integralVisualizer(containerId, fn, options = {}) {
    const w = options.width || 600;
    const h = options.height || 400;
    const xMin = options.xMin ?? -1;
    const xMax = options.xMax ?? 5;
    const yMin = options.yMin ?? -2;
    const yMax = options.yMax ?? 10;
    const a = options.a ?? 0;
    const b = options.b ?? 4;
    let n = options.n ?? 10;

    const r = getCanvas(containerId, w, h);
    if (!r) return;
    const { ctx } = r;

    const padL = 50, padR = 20, padT = 20, padB = 40;
    const pw = w - padL - padR;
    const ph = h - padT - padB;

    function toSX(x) { return padL + ((x - xMin) / (xMax - xMin)) * pw; }
    function toSY(y) { return padT + ((yMax - y) / (yMax - yMin)) * ph; }

    function draw() {
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      /* Grid + axes */
      ctx.strokeStyle = COLORS.grid; ctx.lineWidth = 1;
      const xStep = niceStep(xMax - xMin);
      const yStep = niceStep(yMax - yMin);
      for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
        ctx.beginPath(); ctx.moveTo(toSX(x), padT); ctx.lineTo(toSX(x), padT + ph); ctx.stroke();
      }
      for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
        ctx.beginPath(); ctx.moveTo(padL, toSY(y)); ctx.lineTo(padL + pw, toSY(y)); ctx.stroke();
      }
      ctx.strokeStyle = COLORS.axis; ctx.lineWidth = 1.5;
      if (yMin <= 0 && yMax >= 0) { ctx.beginPath(); ctx.moveTo(padL, toSY(0)); ctx.lineTo(padL + pw, toSY(0)); ctx.stroke(); }
      if (xMin <= 0 && xMax >= 0) { ctx.beginPath(); ctx.moveTo(toSX(0), padT); ctx.lineTo(toSX(0), padT + ph); ctx.stroke(); }

      ctx.save();
      ctx.beginPath(); ctx.rect(padL, padT, pw, ph); ctx.clip();

      /* Riemann rectangles */
      const dx = (b - a) / n;
      let sum = 0;
      for (let i = 0; i < n; i++) {
        const xi = a + i * dx;
        const yi = fn(xi);
        sum += yi * dx;
        const sx = toSX(xi);
        const sw = toSX(xi + dx) - sx;
        const sy = toSY(Math.max(yi, 0));
        const sh = toSY(Math.min(yi, 0)) - sy;
        ctx.fillStyle = yi >= 0 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)';
        ctx.fillRect(sx, sy, sw, sh);
        ctx.strokeStyle = yi >= 0 ? 'rgba(59, 130, 246, 0.5)' : 'rgba(239, 68, 68, 0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(sx, sy, sw, sh);
      }

      /* Function curve */
      ctx.strokeStyle = COLORS.blue; ctx.lineWidth = 2.5;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= pw * 2; i++) {
        const x = xMin + (i / (pw * 2)) * (xMax - xMin);
        let y; try { y = fn(x); } catch(e) { started = false; continue; }
        if (!isFinite(y)) { started = false; continue; }
        if (!started) { ctx.moveTo(toSX(x), toSY(y)); started = true; }
        else ctx.lineTo(toSX(x), toSY(y));
      }
      ctx.stroke();
      ctx.restore();

      /* Info */
      ctx.fillStyle = 'rgba(30, 38, 66, 0.9)';
      ctx.fillRect(padL + 8, padT + 8, 220, 44);
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillStyle = COLORS.text;
      ctx.fillText(`n = ${n} rectangles`, padL + 16, padT + 28);
      ctx.fillStyle = COLORS.cyan;
      ctx.fillText(`Approx area ≈ ${sum.toFixed(4)}`, padL + 16, padT + 44);
    }

    draw();

    /* Return control to update n */
    return {
      setN: (newN) => { n = newN; draw(); },
      getN: () => n
    };
  }

  /* ============================================================
     BAR CHART (for discrete data)
     ============================================================ */
  function barChart(containerId, data, options = {}) {
    const w = options.width || 500;
    const h = options.height || 300;
    const title = options.title || '';

    const r = getCanvas(containerId, w, h);
    if (!r) return;
    const { ctx } = r;

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, w, h);

    const padL = 50, padR = 20, padT = title ? 40 : 20, padB = 50;
    const pw = w - padL - padR;
    const ph = h - padT - padB;
    const maxVal = Math.max(...data.map(d => d.value)) * 1.15;
    const barW = (pw / data.length) * 0.7;
    const gap = (pw / data.length) * 0.3;

    data.forEach((d, i) => {
      const x = padL + i * (barW + gap) + gap / 2;
      const barH = (d.value / maxVal) * ph;
      const color = d.color || PALETTE[i % PALETTE.length];

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, padT + ph - barH, barW, barH, [4, 4, 0, 0]);
      ctx.fill();

      ctx.fillStyle = COLORS.axisLabel;
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.label, x + barW / 2, h - padB + 18);

      ctx.fillStyle = COLORS.text;
      ctx.font = '12px JetBrains Mono, monospace';
      ctx.fillText(d.value.toString(), x + barW / 2, padT + ph - barH - 8);
    });

    if (title) {
      ctx.fillStyle = COLORS.text; ctx.font = '600 14px Inter, sans-serif';
      ctx.textAlign = 'center'; ctx.fillText(title, w / 2, 24);
    }
  }

  /* ============================================================
     TRUTH TABLE RENDERER (creates a styled HTML table)
     ============================================================ */
  function truthTable(containerId, variables, expression, evalFn) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const n = variables.length;
    const rows = 1 << n;

    let html = '<table class="math-table"><thead><tr>';
    variables.forEach(v => { html += `<th>${v}</th>`; });
    html += `<th>${expression}</th></tr></thead><tbody>`;

    for (let i = 0; i < rows; i++) {
      const vals = {};
      html += '<tr>';
      variables.forEach((v, j) => {
        const bit = (i >> (n - 1 - j)) & 1;
        vals[v] = !!bit;
        html += `<td style="text-align:center;color:${bit ? 'var(--accent-green)' : 'var(--accent-red)'}">${bit ? 'T' : 'F'}</td>`;
      });
      const result = evalFn(vals);
      html += `<td style="text-align:center;font-weight:700;color:${result ? 'var(--accent-green)' : 'var(--accent-red)'}">${result ? 'T' : 'F'}</td>`;
      html += '</tr>';
    }
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  /* ============================================================
     HELPERS
     ============================================================ */
  function niceStep(range) {
    const rough = range / 8;
    const pow = Math.pow(10, Math.floor(Math.log10(rough)));
    const frac = rough / pow;
    if (frac <= 1.5) return pow;
    if (frac <= 3.5) return 2 * pow;
    if (frac <= 7.5) return 5 * pow;
    return 10 * pow;
  }

  function formatNum(n) {
    if (Number.isInteger(n)) return n.toString();
    return parseFloat(n.toFixed(2)).toString();
  }

  /* Public API */
  return {
    plotFunction,
    numberLine,
    vennDiagram,
    unitCircle,
    derivativeVisualizer,
    integralVisualizer,
    barChart,
    truthTable,
    COLORS,
    PALETTE
  };
})();
