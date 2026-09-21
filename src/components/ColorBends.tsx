import React, { useEffect, useRef } from 'react';

type ColorBendsProps = {
  className?: string;
  style?: React.CSSProperties;
};

const N = 64;

interface LineConfig {
  yBase: number;
  amp: number;
  freq: number;
  phase: number;
  opacity: number;
  weight: number;
  fill: boolean;
  accent: boolean;
}

const LINES: LineConfig[] = [
  { yBase: 0.62, amp: 0.08, freq: 0.011, phase: 0.0, opacity: 0.55, weight: 2.0, fill: true,  accent: true  },
  { yBase: 0.50, amp: 0.06, freq: 0.015, phase: 1.4, opacity: 0.30, weight: 1.2, fill: true,  accent: false },
  { yBase: 0.74, amp: 0.05, freq: 0.009, phase: 2.8, opacity: 0.22, weight: 1.0, fill: true,  accent: false },
  { yBase: 0.38, amp: 0.04, freq: 0.018, phase: 0.7, opacity: 0.16, weight: 0.8, fill: false, accent: false },
  { yBase: 0.84, amp: 0.03, freq: 0.013, phase: 3.5, opacity: 0.12, weight: 0.6, fill: false, accent: false },
];

const PRIMARY  = '83,74,183';
const ACCENT   = '120,100,220';
const GRID_COL = `rgba(83,74,183,0.07)`;
const LABEL_COL= `rgba(83,74,183,0.30)`;
const TICK_COL = `rgba(83,74,183,0.18)`;

function useLineGraph(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const root   = containerRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0, frame = 0;
    const mouse = { x: -999, y: -999, active: false };
    const trail: { x: number; y: number }[] = [];

    const resize = () => {
      W = root.offsetWidth;
      H = root.offsetHeight;
      canvas.width  = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(root);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
      trail.push({ x: mouse.x, y: mouse.y });
      if (trail.length > 32) trail.shift();
    };
    const onLeave = () => { mouse.active = false; trail.length = 0; };
    root.addEventListener('mousemove', onMove);
    root.addEventListener('mouseleave', onLeave);

    // Graph area now covers full canvas with small padding
    const gx0 = () => W * 0.00;
    const gx1 = () => W * 1.00;
    const gy0 = () => H * 0.00;
    const gy1 = () => H * 1.00;
    const gw  = () => gx1() - gx0();
    const gh  = () => gy1() - gy0();

    function getPoints(line: LineConfig) {
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i < N; i++) {
        const t     = i / (N - 1);
        const x     = gx0() + t * gw();
        const trend = -t * line.amp * 0.4 * gh();
        const wave  = Math.sin(t * Math.PI * 3 + frame * line.freq + line.phase) * line.amp * gh();
        let y = gy0() + line.yBase * gh() + trend + wave;
        if (mouse.active) {
          const dx = x - mouse.x, dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const force = (1 - dist / 140) ** 2;
            y += (dy / (dist + 1)) * force * 80;
          }
        }
        pts.push({ x, y });
      }
      return pts;
    }

    function bezierPath(pts: { x: number; y: number }[]) {
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1], p1 = pts[i], cx = (p0.x + p1.x) / 2;
        ctx.bezierCurveTo(cx, p0.y, cx, p1.y, p1.x, p1.y);
      }
    }

    function drawLine(pts: { x: number; y: number }[], line: LineConfig, highlight: boolean) {
      const op  = highlight ? Math.min(line.opacity * 2.0, 0.75) : line.opacity;
      const lw  = highlight ? line.weight * 2.0 : line.weight;
      const col = line.accent ? ACCENT : PRIMARY;

      if (line.fill) {
        const grad = ctx.createLinearGradient(0, gy0(), 0, gy1());
        grad.addColorStop(0,   `rgba(${col},${op * 0.22})`);
        grad.addColorStop(0.7, `rgba(${col},${op * 0.06})`);
        grad.addColorStop(1,   `rgba(${col},0)`);
        ctx.beginPath();
        bezierPath(pts);
        ctx.lineTo(pts[pts.length - 1].x, gy1());
        ctx.lineTo(pts[0].x, gy1());
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.beginPath();
      bezierPath(pts);
      ctx.strokeStyle = `rgba(${col},${op})`;
      ctx.lineWidth   = lw;
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'round';
      ctx.stroke();
    }

    function drawGrid() {
      const x0 = gx0(), x1 = gx1(), y0 = gy0(), y1 = gy1();
      const rows = 5, cols = 6;

      ctx.lineWidth = 0.5;
      for (let i = 0; i <= rows; i++) {
        const y = y0 + (gh() / rows) * i;
        ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y);
        ctx.strokeStyle = i === 0 || i === rows ? `rgba(${PRIMARY},0.15)` : GRID_COL;
        ctx.stroke();
      }
      for (let i = 0; i <= cols; i++) {
        const x = x0 + (gw() / cols) * i;
        ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1);
        ctx.strokeStyle = i === 0 || i === cols ? `rgba(${PRIMARY},0.15)` : GRID_COL;
        ctx.stroke();
      }

      ctx.font      = `500 9px 'JetBrains Mono', monospace`;
      ctx.fillStyle = LABEL_COL;

      ctx.textAlign = 'right';
      ['1.0M', '800k', '600k', '400k', '200k', '0'].forEach((lbl, i) => {
        const y = y0 + (gh() / rows) * i;
        ctx.fillText(lbl, x0 + 36, y + 3);
        ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + 4, y);
        ctx.strokeStyle = TICK_COL; ctx.lineWidth = 0.5; ctx.stroke();
      });

      ctx.textAlign = 'center';
      ['JAN','MAR','MAY','JUL','SEP','NOV','NOW'].forEach((lbl, i) => {
        const x = x0 + (gw() / cols) * i;
        ctx.fillText(lbl, x, y1 - 8);
        ctx.beginPath(); ctx.moveTo(x, y1 - 4); ctx.lineTo(x, y1);
        ctx.strokeStyle = TICK_COL; ctx.lineWidth = 0.5; ctx.stroke();
      });
    }

    function drawTrail() {
      trail.forEach((p, i) => {
        const t = i / trail.length;
        ctx.beginPath();
        ctx.arc(p.x, p.y, t * 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PRIMARY},${t * 0.25})`;
        ctx.fill();
      });
    }

    function drawIntersects(allPts: { x: number; y: number }[][]) {
      if (!mouse.active) return;
      allPts.forEach((pts, li) => {
        const t   = Math.max(0, Math.min(1, (mouse.x - gx0()) / gw()));
        const idx = Math.round(t * (N - 1));
        const p   = pts[idx];
        if (!p) return;
        const dy = Math.abs(p.y - mouse.y);
        if (dy < 90) {
          const alpha = (1 - dy / 90) * 0.95;
          const col   = LINES[li].accent ? ACCENT : PRIMARY;
          ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${col},${alpha * 0.35})`; ctx.lineWidth = 1; ctx.stroke();
          ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col},${alpha})`; ctx.fill();
          if (dy < 40) {
            const val = Math.round((1 - (p.y - gy0()) / gh()) * 1000);
            const lx  = p.x + 14 > W - 60 ? p.x - 60 : p.x + 14;
            const ly  = p.y - 8 < 12 ? p.y + 18 : p.y - 8;
            ctx.fillStyle = `rgba(${col},0.9)`;
            ctx.font      = `500 9px 'JetBrains Mono', monospace`;
            ctx.textAlign = 'left';
            ctx.fillText(`${val}k`, lx, ly);
          }
        }
      });
    }

    function drawCrosshair() {
      if (!mouse.active) return;
      const { x, y } = mouse;

      ctx.strokeStyle = `rgba(${PRIMARY},0.18)`;
      ctx.lineWidth   = 0.6;
      ctx.setLineDash([3, 5]);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${PRIMARY},0.65)`; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${PRIMARY},0.25)`; ctx.lineWidth = 1; ctx.stroke();

      const pct   = Math.round((1 - (y - gy0()) / gh()) * 100);
      const mo    = ((x - gx0()) / gw() * 11 + 1).toFixed(1);
      const label = `${pct}%  ·  mo ${mo}`;
      const lx    = x + 20 > W - 90 ? x - 94 : x + 20;
      const ly    = y < gy0() + 24 ? y + 22 : y - 10;
      const tw    = ctx.measureText(label).width + 16;

      ctx.fillStyle = `rgba(${PRIMARY},0.88)`;
      ctx.beginPath();
      ctx.roundRect(lx - 8, ly - 12, tw, 18, 4);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.font      = `500 9px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'left';
      ctx.fillText(label, lx, ly);
    }

    function loop() {
      frame++;
      ctx.clearRect(0, 0, W, H);
      drawGrid();
      drawTrail();
      const allPts = LINES.map(line => {
        const pts = getPoints(line);
        let highlight = false;
        if (mouse.active) {
          const t   = Math.max(0, Math.min(1, (mouse.x - gx0()) / gw()));
          const idx = Math.round(t * (N - 1));
          const p   = pts[idx];
          highlight = !!p && Math.abs(p.y - mouse.y) < 90;
        }
        drawLine(pts, line, highlight);
        return pts;
      });
      drawIntersects(allPts);
      drawCrosshair();
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      root.removeEventListener('mousemove', onMove);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, [canvasRef, containerRef]);
}

export default function ColorBends({ className, style }: ColorBendsProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const lineCanvasRef = useRef<HTMLCanvasElement>(null);

  useLineGraph(lineCanvasRef, containerRef);

  return (
    <>
      <style>{`
        .colorbends-root { background: #f0eff8; }
        .dark .colorbends-root { background: #0a0a0a; }
      `}</style>
      <div
        ref={containerRef}
        className={`colorbends-root w-full h-full relative overflow-hidden ${className ?? ''}`}
        style={{
          borderRadius: 14,
          cursor: 'none',
          ...style,
        }}
      >
        <canvas
          ref={lineCanvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      </div>
    </>
  );
}