/* ============================================================
   MATH ZERO-TO-HERO: Visualization Toolkit
   Canvas-based interactive math visualizations
   ============================================================ */

const Viz = (() => {
  /* Theme-aware palette. Values refresh from the active theme every
     time a canvas is (re)drawn, so charts match light and dark mode. */
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
  const redraws = new Map();
  const interactions = new Map();

  function refreshThemeColors() {
    const dark = document.documentElement.dataset.theme === 'dark';
    const css = getComputedStyle(document.documentElement);
    const pick = (name, fallback) => {
      const v = (css.getPropertyValue(name) || '').trim();
      return v || fallback;
    };
    COLORS.bg = dark ? '#1a2035' : '#f8fafc';
    COLORS.grid = dark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(71, 85, 105, 0.12)';
    COLORS.axis = dark ? 'rgba(148, 163, 184, 0.4)' : 'rgba(71, 85, 105, 0.5)';
    COLORS.axisLabel = dark ? '#94a3b8' : '#64748b';
    COLORS.text = dark ? '#f1f5f9' : '#1e293b';
    COLORS.textMuted = pick('--text-muted', dark ? '#8793a8' : '#64748b');
    COLORS.blue = pick('--accent-blue', '#3b82f6');
    COLORS.purple = pick('--accent-purple', '#8b5cf6');
    COLORS.cyan = pick('--accent-cyan', '#06b6d4');
    COLORS.green = pick('--accent-green', '#10b981');
    COLORS.amber = pick('--accent-amber', '#f59e0b');
    COLORS.red = pick('--accent-red', '#ef4444');
    COLORS.pink = pick('--accent-pink', '#ec4899');
    PALETTE[0] = COLORS.blue;
    PALETTE[1] = COLORS.purple;
    PALETTE[2] = COLORS.cyan;
    PALETTE[3] = COLORS.green;
    PALETTE[4] = COLORS.amber;
    PALETTE[5] = COLORS.red;
    PALETTE[6] = COLORS.pink;
  }

  /* ---- Utility ---- */
  function cleanupDetached() {
    for (const canvas of redraws.keys()) {
      if (!canvas.isConnected) {
        interactions.get(canvas)?.();
        interactions.delete(canvas);
        redraws.delete(canvas);
      }
    }
  }

  function redrawAll() {
    cleanupDetached();
    refreshThemeColors();
    for (const redraw of [...redraws.values()]) redraw();
  }

  function destroyAll() {
    for (const [canvas, cleanup] of interactions) {
      cleanup();
      resetInteraction(canvas);
    }
    interactions.clear();
    redraws.clear();
  }

  function resetInteraction(canvas) {
    canvas.removeAttribute('tabindex');
    canvas.removeAttribute('aria-valuemin');
    canvas.removeAttribute('aria-valuemax');
    canvas.removeAttribute('aria-valuenow');
    canvas.removeAttribute('aria-valuetext');
    canvas.setAttribute('role', 'img');
    canvas.style.touchAction = '';
  }

  function getCanvas(containerId, width, height, redraw) {
    refreshThemeColors();
    cleanupDetached();
    if (!Number.isFinite(width) || !Number.isFinite(height) || width < 100 || height < 60) return null;
    const container = document.getElementById(containerId);
    if (!container) return null;
    let canvas = container.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      container.appendChild(canvas);
    }
    interactions.get(canvas)?.();
    interactions.delete(canvas);
    resetInteraction(canvas);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';
    canvas.style.aspectRatio = `${width} / ${height}`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    if (redraw) redraws.set(canvas, redraw);
    return { canvas, ctx, w: width, h: height };
  }

  function canvasPoint(canvas, event, width, height) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    return {
      x: (event.clientX - rect.left) * width / rect.width,
      y: (event.clientY - rect.top) * height / rect.height
    };
  }

  function bindInteraction(canvas, handlers) {
    Object.entries(handlers).forEach(([name, handler]) => canvas.addEventListener(name, handler));
    interactions.set(canvas, () => {
      Object.entries(handlers).forEach(([name, handler]) => canvas.removeEventListener(name, handler));
    });
  }

  function validRange(min, max) {
    return Number.isFinite(min) && Number.isFinite(max) && min < max && Number.isFinite(max - min);
  }

  function evaluate(fn, x) {
    try {
      const value = fn(x);
      return Number.isFinite(value) ? value : NaN;
    } catch (e) {
      return NaN;
    }
  }

  /* Refine nonlinear intervals, then omit jumps that remain unresolved.
     Clip accepted segments numerically so steep continuous lines stay visible
     without connecting opposite sides of a pole or drawing enormous paths. */
  function traceFunction(ctx, fn, xMin, xMax, toX, toY, plotTop, plotHeight, plotWidth) {
    let previous = null;
    const steps = Math.ceil(plotWidth * 2);
    const plotBottom = plotTop + plotHeight;
    ctx.beginPath();

    function segment(left, right, depth) {
      const middleX = left.x + (right.x - left.x) / 2;
      const middleY = toY(evaluate(fn, middleX));
      if (!Number.isFinite(middleY)) return;
      const jump = Math.abs(right.y - left.y);
      const deviation = Math.abs(middleY - (left.y / 2 + right.y / 2));
      if (deviation > Math.max(0.1, jump / 8)) {
        if (depth < 10 && middleX !== left.x && middleX !== right.x) {
          const middle = { x: middleX, y: middleY };
          segment(left, middle, depth + 1);
          segment(middle, right, depth + 1);
        }
        return;
      }
      if ((left.y < plotTop && right.y < plotTop) || (left.y > plotBottom && right.y > plotBottom)) return;
      const startX = toX(left.x), endX = toX(right.x);
      const startY = Math.max(plotTop, Math.min(plotBottom, left.y));
      const endY = Math.max(plotTop, Math.min(plotBottom, right.y));
      const dy = right.y - left.y;
      if (!Number.isFinite(dy)) return;
      const clippedX = (y, originalX) => dy === 0 ? originalX : startX + (y - left.y) / dy * (endX - startX);
      ctx.moveTo(clippedX(startY, startX), startY);
      ctx.lineTo(clippedX(endY, endX), endY);
    }

    for (let i = 0; i <= steps; i++) {
      const x = xMin + i / steps * (xMax - xMin);
      const y = toY(evaluate(fn, x));
      if (!Number.isFinite(y)) {
        previous = null;
        continue;
      }
      const current = { x, y };
      if (previous) segment(previous, current, 0);
      previous = current;
    }
    ctx.stroke();
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

    if (!validRange(xMin, xMax) || !validRange(yMin, yMax)) return;
    const r = getCanvas(containerId, w, h, () => plotFunction(containerId, fns, options));
    if (!r) return;
    const { ctx } = r;

    r.canvas.setAttribute('aria-label', title || labels.join('; ') || 'Function graph');
    const padL = 50, padR = 20, padB = 40;
    ctx.font = '12px Inter, sans-serif';
    let legendX = padL, legendRow = 0;
    const legendItems = labels.map(label => {
      const itemWidth = ctx.measureText(label).width + 42;
      if (legendX > padL && legendX + itemWidth > w - padR) { legendX = padL; legendRow++; }
      const item = { label, x: legendX, row: legendRow };
      legendX += itemWidth;
      return item;
    });
    const legendTop = title ? 40 : 18;
    const padT = legendTop + (labels.length ? (legendRow + 1) * 22 : 0);
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
      for (const x of ticks(xMin, xMax, xStep)) {
        const sx = toScreenX(x);
        ctx.beginPath(); ctx.moveTo(sx, padT); ctx.lineTo(sx, padT + ph); ctx.stroke();
      }
      for (const y of ticks(yMin, yMax, yStep)) {
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
    for (const x of ticks(xMin, xMax, xStep)) {
      if (Math.abs(x) < 1e-10) continue;
      ctx.fillText(formatNum(x), toScreenX(x), padT + ph + 20);
    }
    ctx.textAlign = 'right';
    const yStep = niceStep(yMax - yMin);
    for (const y of ticks(yMin, yMax, yStep)) {
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
      traceFunction(ctx, fn, xMin, xMax, toScreenX, toScreenY, padT, ph, pw);
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
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'left';
      legendItems.forEach(({ label, x, row }, idx) => {
        const legendY = legendTop + row * 22 + 12;
        const color = PALETTE[idx % PALETTE.length];
        ctx.fillStyle = color;
        ctx.fillRect(x, legendY - 6, 16, 3);
        ctx.fillText(label, x + 22, legendY, w - padR - x - 22);
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

    if (!validRange(min, max)) return;
    const r = getCanvas(containerId, w, h, () => numberLine(containerId, points, options));
    if (!r) return;
    const { ctx } = r;
    r.canvas.setAttribute('aria-label', `Number line from ${min} to ${max}`);

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
    for (const v of ticks(min, max, step)) {
      const x = toX(v);
      ctx.beginPath();
      ctx.moveTo(x, lineY - 6);
      ctx.lineTo(x, lineY + 6);
      ctx.stroke();
      ctx.fillText(formatNum(v), x, lineY + 22);
    }

    /* Points */
    (points || []).forEach((pt, idx) => {
      if (!pt || !Number.isFinite(pt.value) || pt.value < min || pt.value > max) return;
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

    const r = getCanvas(containerId, w, h, () => vennDiagram(containerId, options));
    if (!r) return;
    const { ctx } = r;
    r.canvas.setAttribute('aria-label', options.title || `Venn diagram: ${labelA} and ${labelB}, ${highlight} highlighted`);

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.max(12, Math.min(90, (w - 40) / 3.12, (h - 72) / 2));
    const offset = radius * 5 / 9;

    function drawCircle(x, y, fillColor, label, labelX) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = COLORS.axis;
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
      ctx.strokeStyle = COLORS.axis;
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
    const fullTurn = Math.PI * 2;
    let angle = Number.isFinite(options.angle) ? options.angle : Math.PI / 4;
    const normalizeAngle = value => ((value % fullTurn) + fullTurn) % fullTurn;
    angle = normalizeAngle(angle);

    const r = getCanvas(containerId, w, h);
    if (!r) return;
    const { canvas, ctx } = r;
    canvas.tabIndex = 0;
    canvas.setAttribute('role', 'slider');
    canvas.setAttribute('aria-label', 'Unit circle angle. Drag the point or use arrow keys; hold Shift for 15-degree steps.');
    canvas.setAttribute('aria-valuemin', '0');
    canvas.setAttribute('aria-valuemax', '360');
    canvas.style.touchAction = 'none';

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.max(12, Math.min(w, h) / 2 - 60);

    function draw() {
      refreshThemeColors();
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      /* Grid */
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();

      /* Circle */
      ctx.strokeStyle = COLORS.axis;
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

      /* Adjacent leg: signed horizontal coordinate cos(theta). */
      ctx.strokeStyle = COLORS.green;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, cy); ctx.stroke();

      /* Opposite leg: signed vertical coordinate sin(theta). */
      ctx.strokeStyle = COLORS.red;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(px, cy); ctx.lineTo(px, py); ctx.stroke();
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
      const deg = (angle * 180 / Math.PI).toFixed(1);
      canvas.setAttribute('aria-valuenow', deg);
      canvas.setAttribute('aria-valuetext', `${deg} degrees; cosine ${cosVal}; sine ${sinVal}`);

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

    redraws.set(canvas, draw);
    draw();

    let activePointer = null;
    function updateFromPointer(event) {
      const point = canvasPoint(canvas, event, w, h);
      if (!point) return;
      angle = normalizeAngle(Math.atan2(cy - point.y, point.x - cx));
      draw();
    }
    function endDrag(event) {
      if (event.pointerId !== activePointer) return;
      if (canvas.hasPointerCapture?.(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      activePointer = null;
    }
    bindInteraction(canvas, {
      pointerdown: event => {
        if (event.button !== 0) return;
        activePointer = event.pointerId;
        canvas.setPointerCapture?.(event.pointerId);
        updateFromPointer(event);
      },
      pointermove: event => { if (event.pointerId === activePointer) updateFromPointer(event); },
      pointerup: endDrag,
      pointercancel: endDrag,
      lostpointercapture: () => { activePointer = null; },
      keydown: event => {
        const direction = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[event.key];
        if (direction === undefined && event.key !== 'Home') return;
        event.preventDefault();
        angle = event.key === 'Home' ? 0 : normalizeAngle(angle + direction * (event.shiftKey ? 15 : 1) * Math.PI / 180);
        draw();
      }
    });
    return {
      setAngle: value => { if (Number.isFinite(value)) { angle = normalizeAngle(value); draw(); } },
      getAngle: () => angle
    };
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
    if (!validRange(xMin, xMax) || !validRange(yMin, yMax)) return;
    let currentX = Number.isFinite(options.startX) ? options.startX : 1;
    currentX = Math.max(xMin, Math.min(xMax, currentX));

    const r = getCanvas(containerId, w, h);
    if (!r) return;
    const { canvas, ctx } = r;
    canvas.tabIndex = 0;
    canvas.setAttribute('role', 'slider');
    canvas.setAttribute('aria-label', 'Tangent point x-coordinate. Move the pointer or use arrow keys.');
    canvas.setAttribute('aria-valuemin', String(xMin));
    canvas.setAttribute('aria-valuemax', String(xMax));
    canvas.style.touchAction = 'pan-y';

    const padL = 50, padR = 20, padT = 20, padB = 40;
    const pw = w - padL - padR;
    const ph = h - padT - padB;

    function toSX(x) { return padL + ((x - xMin) / (xMax - xMin)) * pw; }
    function toSY(y) { return padT + ((yMax - y) / (yMax - yMin)) * ph; }

    function draw() {
      refreshThemeColors();
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      /* Grid */
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      const xStep = niceStep(xMax - xMin);
      const yStep = niceStep(yMax - yMin);
      for (const x of ticks(xMin, xMax, xStep)) {
        ctx.beginPath(); ctx.moveTo(toSX(x), padT); ctx.lineTo(toSX(x), padT + ph); ctx.stroke();
      }
      for (const y of ticks(yMin, yMax, yStep)) {
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
      traceFunction(ctx, fn, xMin, xMax, toSX, toSY, padT, ph, pw);

      /* Tangent line */
      const yVal = evaluate(fn, currentX);
      const slope = evaluate(dfn, currentX);
      if (Number.isFinite(yVal) && Number.isFinite(slope)) {
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
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(padL + 8, padT + 8, 200, 60);
      ctx.fillStyle = COLORS.text;
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`x = ${currentX.toFixed(2)}`, padL + 16, padT + 28);
      ctx.fillText(`f(x) = ${Number.isFinite(yVal) ? yVal.toFixed(3) : 'undefined'}`, padL + 16, padT + 44);
      ctx.fillStyle = COLORS.amber;
      ctx.fillText(`f'(x) = ${Number.isFinite(slope) ? slope.toFixed(3) : 'undefined'}`, padL + 16, padT + 60);
      canvas.setAttribute('aria-valuenow', String(currentX));
      canvas.setAttribute('aria-valuetext', `x ${currentX.toFixed(2)}; function ${Number.isFinite(yVal) ? yVal.toFixed(3) : 'undefined'}; slope ${Number.isFinite(slope) ? slope.toFixed(3) : 'undefined'}`);
    }

    redraws.set(canvas, draw);
    draw();

    function updateFromPointer(event) {
      const point = canvasPoint(canvas, event, w, h);
      if (!point) return;
      currentX = Math.max(xMin, Math.min(xMax, xMin + (point.x - padL) / pw * (xMax - xMin)));
      draw();
    }
    bindInteraction(canvas, {
      pointerdown: updateFromPointer,
      pointermove: updateFromPointer,
      keydown: event => {
        const direction = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[event.key];
        if (direction === undefined && event.key !== 'Home' && event.key !== 'End') return;
        event.preventDefault();
        currentX = event.key === 'Home' ? xMin : event.key === 'End' ? xMax :
          Math.max(xMin, Math.min(xMax, currentX + direction * (xMax - xMin) / (event.shiftKey ? 10 : 100)));
        draw();
      }
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
    if (!validRange(xMin, xMax) || !validRange(yMin, yMax) || !Number.isFinite(a) || !Number.isFinite(b)) return;
    const validN = value => Number.isFinite(Number(value)) && Number(value) > 0;
    const clampN = value => Math.max(1, Math.min(1000, Math.floor(Number(value))));
    let n = validN(options.n) ? clampN(options.n) : 10;

    const r = getCanvas(containerId, w, h);
    if (!r) return;
    const { canvas, ctx } = r;

    const padL = 50, padR = 20, padT = 20, padB = 40;
    const pw = w - padL - padR;
    const ph = h - padT - padB;

    function toSX(x) { return padL + ((x - xMin) / (xMax - xMin)) * pw; }
    function toSY(y) { return padT + ((yMax - y) / (yMax - yMin)) * ph; }

    function draw() {
      refreshThemeColors();
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      /* Grid + axes */
      ctx.strokeStyle = COLORS.grid; ctx.lineWidth = 1;
      const xStep = niceStep(xMax - xMin);
      const yStep = niceStep(yMax - yMin);
      for (const x of ticks(xMin, xMax, xStep)) {
        ctx.beginPath(); ctx.moveTo(toSX(x), padT); ctx.lineTo(toSX(x), padT + ph); ctx.stroke();
      }
      for (const y of ticks(yMin, yMax, yStep)) {
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
      let defined = true;
      for (let i = 0; i < n; i++) {
        const xi = a + i * dx;
        const yi = evaluate(fn, xi);
        if (!Number.isFinite(yi)) { defined = false; continue; }
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
      traceFunction(ctx, fn, xMin, xMax, toSX, toSY, padT, ph, pw);
      ctx.restore();

      /* Info */
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(padL + 8, padT + 8, 220, 44);
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillStyle = COLORS.text;
      ctx.fillText(`n = ${n} rectangles`, padL + 16, padT + 28);
      ctx.fillStyle = COLORS.cyan;
      const approximation = defined && Number.isFinite(sum) ? sum.toFixed(4) : 'undefined';
      ctx.fillText(`Left sum ≈ ${approximation}`, padL + 16, padT + 44);
      canvas.setAttribute('aria-label', `Left Riemann sum from ${a} to ${b}, ${n} rectangles: ${approximation}`);
    }

    redraws.set(canvas, draw);
    draw();

    /* Return control to update n */
    return {
      setN: (newN) => { if (validN(newN)) { n = clampN(newN); draw(); } },
      getN: () => n
    };
  }

  /* ============================================================
     BAR CHART (for discrete data)
     ============================================================ */
  function barChart(containerId, data, options = {}) {
    const w = options.width || 500;
    const title = options.title || '';
    const h = Math.max(title ? 180 : 150, options.height || 300);

    const r = getCanvas(containerId, w, h, () => barChart(containerId, data, options));
    if (!r) return;
    const { ctx } = r;

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, w, h);
    if (!Array.isArray(data) || !data.length || data.some(d => !d || !Number.isFinite(d.value))) return;
    r.canvas.setAttribute('aria-label', `${title || 'Bar chart'}. ${data.map(d => `${d.label}: ${d.value}`).join('; ')}`);

    const padL = 50, padR = 20, padT = title ? 68 : 38, padB = 50;
    const pw = w - padL - padR;
    const ph = h - padT - padB;
    const yMin = Math.min(0, ...data.map(d => d.value)) * 1.15;
    const yMax = Math.max(0, ...data.map(d => d.value)) * 1.15 || (yMin === 0 ? 1 : 0);
    const toY = value => padT + (yMax - value) / (yMax - yMin) * ph;
    const zeroY = toY(0);
    const barW = (pw / data.length) * 0.7;
    const gap = (pw / data.length) * 0.3;

    ctx.fillStyle = COLORS.axisLabel;
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(options.yLabel || 'Value', padL, padT - 12, pw);
    ctx.textAlign = 'right';
    const tickRange = (yMax - yMin) * 8 / Math.max(2, Math.floor(ph / 24));
    for (const value of ticks(yMin, yMax, niceStep(tickRange, true))) {
      const y = toY(value);
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + pw, y); ctx.stroke();
      ctx.fillText(formatNum(value), padL - 8, y + 4);
    }
    ctx.strokeStyle = COLORS.axis;
    ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + ph); ctx.stroke();

    data.forEach((d, i) => {
      const x = padL + i * (barW + gap) + gap / 2;
      const valueY = toY(d.value);
      const barH = Math.abs(valueY - zeroY);
      const color = d.color || PALETTE[i % PALETTE.length];

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.rect(x, Math.min(valueY, zeroY), barW, barH);
      ctx.fill();

      ctx.fillStyle = COLORS.axisLabel;
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(d.label), x + barW / 2, h - padB + 18, barW + gap - 4);

      ctx.fillStyle = COLORS.text;
      ctx.font = '12px JetBrains Mono, monospace';
      ctx.fillText(d.value.toString(), x + barW / 2, valueY + (d.value < 0 ? 16 : -8));
    });
    ctx.strokeStyle = COLORS.axis;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(padL, zeroY); ctx.lineTo(padL + pw, zeroY); ctx.stroke();

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
     NORMAL DISTRIBUTION CURVE
     Bell curve with standard-deviation bands and area labels.
     Options: mean, sd, shadeFromSd, shadeToSd, title, width, height
     ============================================================ */
  function normalCurve(containerId, options = {}) {
    const w = options.width || 620;
    const h = options.height || 340;
    const mean = options.mean ?? 0;
    const sd = options.sd ?? 1;
    const title = options.title || '';
    const shadeFrom = options.shadeFromSd; /* in sd units, e.g. -1 */
    const shadeTo = options.shadeToSd;
    const showBandLabels = options.showBandLabels !== false;
    if (!Number.isFinite(mean) || !Number.isFinite(sd) || sd <= 0) return;

    const r = getCanvas(containerId, w, h, () => normalCurve(containerId, options));
    if (!r) return;
    const { ctx } = r;
    r.canvas.setAttribute('aria-label', `${title || 'Normal distribution'}, mean ${mean}, standard deviation ${sd}`);

    const pad = { left: 30, right: 30, top: title ? 48 : 24, bottom: showBandLabels ? 66 : 44 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;
    const xMinSd = -3.5, xMaxSd = 3.5;
    const toX = sdUnits => pad.left + ((sdUnits - xMinSd) / (xMaxSd - xMinSd)) * plotW;
    const pdf = sdUnits => Math.exp(-0.5 * sdUnits * sdUnits); /* unnormalized */
    const toY = sdUnits => pad.top + plotH - pdf(sdUnits) * plotH * 0.92;

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, w, h);

    if (title) {
      ctx.fillStyle = COLORS.text;
      ctx.font = '600 15px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, w / 2, 26);
    }

    /* Shaded region */
    if (Number.isFinite(shadeFrom) && Number.isFinite(shadeTo) && shadeFrom < shadeTo) {
      const from = Math.max(xMinSd, Math.min(xMaxSd, shadeFrom));
      const to = Math.max(xMinSd, Math.min(xMaxSd, shadeTo));
      ctx.save();
      ctx.beginPath(); ctx.rect(pad.left, pad.top, plotW, plotH); ctx.clip();
      ctx.beginPath();
      ctx.moveTo(toX(from), pad.top + plotH);
      for (let s = from; s <= to + 0.001; s += 0.02) {
        ctx.lineTo(toX(s), toY(s));
      }
      ctx.lineTo(toX(to), toY(to));
      ctx.lineTo(toX(to), pad.top + plotH);
      ctx.closePath();
      ctx.fillStyle = COLORS.blue;
      ctx.globalAlpha = 0.33;
      ctx.fill();
      ctx.restore();
    }

    /* SD band separators and axis labels */
    ctx.textAlign = 'center';
    for (let s = -3; s <= 3; s++) {
      const x = toX(s);
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, toY(s));
      ctx.lineTo(x, pad.top + plotH);
      ctx.stroke();
      ctx.fillStyle = COLORS.axisLabel;
      ctx.font = '12px "JetBrains Mono", monospace';
      const value = mean + s * sd;
      ctx.fillText(formatNum(value), x, pad.top + plotH + 18);
      if (s !== 0) {
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText((s > 0 ? '+' : '') + s + 'sd', x, pad.top + plotH + 33);
      } else {
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText('mean', x, pad.top + plotH + 33);
      }
    }

    /* Approximate true normal-CDF probabilities for each band. */
    if (showBandLabels) {
      const bands = [
        { from: -1, to: 0, label: '≈34.1%' }, { from: 0, to: 1, label: '≈34.1%' },
        { from: -2, to: -1, label: '≈13.6%' }, { from: 1, to: 2, label: '≈13.6%' },
        { from: -3, to: -2, label: '≈2.1%' }, { from: 2, to: 3, label: '≈2.1%' }
      ];
      ctx.fillStyle = COLORS.text;
      ctx.font = '600 11px Inter, sans-serif';
      bands.forEach(b => {
        const mid = (b.from + b.to) / 2;
        ctx.fillText(b.label, toX(mid), pad.top + plotH - 12);
      });
      ctx.fillStyle = COLORS.axisLabel;
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText('Each tail beyond 3 SD: ≈0.13%', w / 2, h - 8);
    }

    /* Baseline */
    ctx.strokeStyle = COLORS.axis;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top + plotH);
    ctx.lineTo(pad.left + plotW, pad.top + plotH);
    ctx.stroke();

    /* Curve */
    ctx.strokeStyle = COLORS.blue;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let s = xMinSd; s <= xMaxSd; s += 0.02) {
      const x = toX(s), y = toY(s);
      if (s === xMinSd) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  /* ============================================================
     TAPE DIAGRAM
     Proportional segment bar for ratios, percents, and word
     problems. segments: [{label, value, color?}]
     Options: title, totalLabel, width, height
     ============================================================ */
  function tapeDiagram(containerId, segments, options = {}) {
    const w = options.width || 620;
    const h = options.height || (options.title ? 190 : 160);
    const title = options.title || '';

    const r = getCanvas(containerId, w, h, () => tapeDiagram(containerId, segments, options));
    if (!r) return;
    const { ctx } = r;

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, w, h);
    if (!Array.isArray(segments) || !segments.length || segments.some(s => !s || !Number.isFinite(s.value) || s.value < 0)) return;
    r.canvas.setAttribute('aria-label', `${title || 'Tape diagram'}. ${segments.map(s => `${s.label}: ${s.value}`).join('; ')}`);

    if (title) {
      ctx.fillStyle = COLORS.text;
      ctx.font = '600 15px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, w / 2, 26);
    }

    const total = segments.reduce((sum, s) => sum + s.value, 0);
    if (!Number.isFinite(total) || total <= 0) return;

    const pad = 40;
    const barY = title ? 62 : 40;
    const barH = 52;
    const barW = w - pad * 2;
    let x = pad;

    segments.forEach((seg, i) => {
      const segW = (seg.value / total) * barW;
      const color = seg.color || PALETTE[i % PALETTE.length];
      ctx.save();
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.4;
      ctx.fillRect(x, barY, segW, barH);
      ctx.restore();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, barY, segW, barH);

      ctx.fillStyle = COLORS.text;
      ctx.font = '600 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      if (segW > 34) {
        ctx.fillText(formatNum(seg.value), x + segW / 2, barY + barH / 2 + 5);
      }
      /* Label below, alternating offset to avoid overlap on thin segments */
      ctx.fillStyle = COLORS.axisLabel;
      ctx.font = '12px Inter, sans-serif';
      if (segW > 8) ctx.fillText(String(seg.label), x + segW / 2, barY + barH + (i % 2 === 0 ? 20 : 36), segW - 6);
      x += segW;
    });

    /* Total bracket */
    const bracketY = barY - 12;
    ctx.strokeStyle = COLORS.axis;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, bracketY + 6);
    ctx.lineTo(pad, bracketY);
    ctx.lineTo(pad + barW, bracketY);
    ctx.lineTo(pad + barW, bracketY + 6);
    ctx.stroke();
    ctx.fillStyle = COLORS.textMuted;
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(options.totalLabel || `total = ${formatNum(total)}`, w / 2, bracketY - 6);
  }

  /* ============================================================
     HELPERS
     ============================================================ */
  function niceStep(range, roundUp = false) {
    if (!Number.isFinite(range) || range <= 0) return 1;
    const rough = range / 8;
    if (rough === 0) return range;
    const pow = Math.pow(10, Math.floor(Math.log10(rough)));
    if (!Number.isFinite(pow) || pow === 0) return rough;
    const frac = rough / pow;
    if (roundUp) {
      if (frac <= 1) return pow;
      if (frac <= 2) return 2 * pow;
      if (frac <= 5) return 5 * pow;
      return 10 * pow;
    }
    if (frac <= 1.5) return pow;
    if (frac <= 3.5) return 2 * pow;
    if (frac <= 7.5) return 5 * pow;
    return 10 * pow;
  }

  function ticks(min, max, step) {
    const first = Math.ceil(min / step) * step;
    if (!Number.isFinite(first)) return [];
    const count = Math.min(100, Math.max(0, Math.floor((max - first) / step) + 1));
    const values = [];
    for (let i = 0; i < count; i++) {
      const value = first + i * step;
      if (value >= min && value <= max && value !== values[values.length - 1]) values.push(value);
    }
    return values;
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
    normalCurve,
    tapeDiagram,
    redrawAll,
    destroyAll,
    COLORS,
    PALETTE
  };
})();
