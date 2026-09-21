import { useEffect, useRef } from "react";

interface MouseState {
  x: number;
  y: number;
  active: boolean;
}

interface TrailPoint {
  x: number;
  y: number;
}

interface Blob {
  x: number;
  y: number;
  r: number;
  spd: number;
  col: [number, number, number];
}

interface Line {
  yBase: number;
  amp: number;
  freq: number;
  phase: number;
  opacity: number;
  weight: number;
  fill: boolean;
}

const BLOBS: Blob[] = [
  { x: 0.15, y: 0.4,  r: 0.38, spd: 0.7,  col: [200, 190, 240] },
  { x: 0.75, y: 0.25, r: 0.32, spd: 0.9,  col: [185, 210, 230] },
  { x: 0.55, y: 0.75, r: 0.28, spd: 0.6,  col: [210, 230, 200] },
  { x: 0.35, y: 0.15, r: 0.22, spd: 1.1,  col: [225, 200, 240] },
];

const LINES: Line[] = [
  { yBase: 0.68, amp: 0.07, freq: 0.013, phase: 0.0, opacity: 0.32, weight: 1.4, fill: true  },
  { yBase: 0.52, amp: 0.05, freq: 0.017, phase: 1.4, opacity: 0.22, weight: 1.0, fill: false },
  { yBase: 0.78, amp: 0.06, freq: 0.010, phase: 2.8, opacity: 0.18, weight: 0.8, fill: true  },
  { yBase: 0.40, amp: 0.04, freq: 0.020, phase: 0.7, opacity: 0.15, weight: 0.7, fill: false },
  { yBase: 0.88, amp: 0.03, freq: 0.015, phase: 3.5, opacity: 0.12, weight: 0.6, fill: false },
];

const N = 48;

export default function SmartPointHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef   = useRef<HTMLDivElement>(null);
  const mouseRef  = useRef<MouseState>({ x: -999, y: -999, active: false });
  const trailRef  = useRef<TrailPoint[]>([]);
  const frameRef  = useRef(0);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root   = rootRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;

    function resize() {
      W = (canvas as HTMLCanvasElement).offsetWidth;
      H = (canvas as HTMLCanvasElement).offsetHeight;
      (canvas as HTMLCanvasElement).width  = W;
      (canvas as HTMLCanvasElement).height = H;
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Mouse handlers ────────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      const rect = (canvas as HTMLCanvasElement).getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
      trailRef.current.push({ x: mouseRef.current.x, y: mouseRef.current.y });
      if (trailRef.current.length > 28) trailRef.current.shift();
    }
    function onMouseLeave() {
      mouseRef.current = { x: -999, y: -999, active: false };
      trailRef.current = [];
    }
    root.addEventListener("mousemove", onMouseMove);
    root.addEventListener("mouseleave", onMouseLeave);

    // ── Helpers ───────────────────────────────────────────────────
    function getPoints(line: Line): { x: number; y: number }[] {
      const { x: mx, y: my, active } = mouseRef.current;
      const pts = [];
      for (let i = 0; i < N; i++) {
        const t = i / (N - 1);
        const x = t * W;
        const trend = -t * line.amp * 0.5 * H;
        const wave  = Math.sin(t * Math.PI * 3 + frameRef.current * line.freq + line.phase) * line.amp * H;
        let y = line.yBase * H + trend + wave;

        if (active) {
          const dx   = x - mx;
          const dy   = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 130;
          if (dist < radius) {
            const force = 1 - dist / radius;
            const push  = force * force * 70;
            y += (dy / (dist + 1)) * push;
          }
        }
        pts.push({ x, y });
      }
      return pts;
    }

    function drawLine(pts: { x: number; y: number }[], line: Line, highlight: boolean) {
      const op = highlight ? Math.min(line.opacity * 2.2, 0.7) : line.opacity;
      const lw = highlight ? line.weight * 2.2 : line.weight;

      if (line.fill) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          const p0 = pts[i - 1], p1 = pts[i], cx = (p0.x + p1.x) / 2;
          ctx.bezierCurveTo(cx, p0.y, cx, p1.y, p1.x, p1.y);
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
        ctx.fillStyle = `rgba(83,74,183,${op * 0.18})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1], p1 = pts[i], cx = (p0.x + p1.x) / 2;
        ctx.bezierCurveTo(cx, p0.y, cx, p1.y, p1.x, p1.y);
      }
      ctx.strokeStyle = `rgba(83,74,183,${op})`;
      ctx.lineWidth   = lw;
      ctx.lineJoin    = "round";
      ctx.lineCap     = "round";
      ctx.stroke();
    }

    function drawGrid() {
      const x0 = W * 0.03, x1 = W * 0.30;
      const y0 = H * 0.42, y1 = H * 0.92;
      ctx.strokeStyle = "rgba(83,74,183,0.09)";
      ctx.lineWidth   = 0.5;
      for (let i = 0; i <= 4; i++) {
        const y = y0 + ((y1 - y0) / 4) * i;
        ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      }
      for (let i = 0; i <= 4; i++) {
        const x = x0 + ((x1 - x0) / 4) * i;
        ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke();
      }
      ctx.fillStyle  = "rgba(83,74,183,0.2)";
      ctx.font       = "500 8px 'JetBrains Mono', monospace";
      ctx.textAlign  = "right";
      ["1M", "750k", "500k", "250k", "0"].forEach((lbl, i) => {
        ctx.fillText(lbl, x0 - 4, y0 + ((y1 - y0) / 4) * i + 3);
      });
      ctx.textAlign = "center";
      ["Q1", "Q2", "Q3", "Q4", "NOW"].forEach((lbl, i) => {
        ctx.fillText(lbl, x0 + ((x1 - x0) / 4) * i, y1 + 10);
      });
    }

    function drawTrail() {
      const trail = trailRef.current;
      trail.forEach((p, i) => {
        const alpha = (i / trail.length) * 0.35;
        const r     = (i / trail.length) * 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(83,74,183,${alpha})`;
        ctx.fill();
      });
    }

    function drawIntersects(allPts: { x: number; y: number }[][]) {
      const { x: mx, y: my, active } = mouseRef.current;
      if (!active) return;
      allPts.forEach(pts => {
        const idx = Math.round((mx / W) * (N - 1));
        const p   = pts[Math.max(0, Math.min(N - 1, idx))];
        const dy  = Math.abs(p.y - my);
        if (dy < 80) {
          const alpha = (1 - dy / 80) * 0.9;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(83,74,183,${alpha})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(83,74,183,${alpha * 0.4})`;
          ctx.lineWidth   = 1;
          ctx.stroke();
        }
      });
    }

    function drawCursor() {
      const { x, y, active } = mouseRef.current;
      if (!active) return;

      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(83,74,183,0.4)";
      ctx.lineWidth   = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(83,74,183,0.7)";
      ctx.fill();

      ctx.strokeStyle = "rgba(83,74,183,0.25)";
      ctx.lineWidth   = 0.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      ctx.setLineDash([]);

      const val   = Math.round((1 - y / H) * 100);
      const label = `${val}%  ·  ${((x / W) * 12).toFixed(1)}mo`;
      const lx    = x + 24 > W - 100 ? x - 110 : x + 24;
      const ly    = y - 10 < 14 ? y + 20 : y - 10;
      ctx.fillStyle  = "rgba(83,74,183,0.85)";
      ctx.font       = "500 10px 'JetBrains Mono', monospace";
      ctx.textAlign  = "left";
      ctx.fillText(label, lx, ly);
    }

    // ── Main loop ─────────────────────────────────────────────────
    function loop() {
      frameRef.current++;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#f0eff8";
      ctx.fillRect(0, 0, W, H);

      // blobs
      BLOBS.forEach((b, i) => {
        const px = (b.x + Math.sin(frameRef.current * b.spd * 0.001 + i) * 0.12) * W;
        const py = (b.y + Math.cos(frameRef.current * b.spd * 0.0008 + i * 1.3) * 0.10) * H;
        const r  = b.r * Math.min(W, H);
        const g  = ctx.createRadialGradient(px, py, 0, px, py, r);
        const [cr, cg, cb] = b.col;
        g.addColorStop(0, `rgba(${cr},${cg},${cb},0.5)`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });

      drawGrid();
      drawTrail();

      const { x: mx, y: my, active } = mouseRef.current;
      const allPts = LINES.map(line => {
        const pts = getPoints(line);
        let highlight = false;
        if (active) {
          const idx = Math.round((mx / W) * (N - 1));
          const p   = pts[Math.max(0, Math.min(N - 1, idx))];
          highlight  = Math.abs(p.y - my) < 80;
        }
        drawLine(pts, line, highlight);
        return pts;
      });

      drawIntersects(allPts);
      drawCursor();

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      root.removeEventListener("mousemove", onMouseMove);
      root.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#f0eff8",
        borderRadius: 14,
        overflow: "hidden",
        height: 540,
        position: "relative",
        cursor: "none",
      }}
    >
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

   

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100% - 60px)",
          textAlign: "center",
          padding: "0 40px",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 50,
            lineHeight: 1.0,
            color: "#1a1728",
            letterSpacing: -2,
            marginBottom: 14,
          }}
        >
          WE BUILD AND{" "}
          <em style={{ color: "#534AB7", fontStyle: "italic" }}>SCALE</em>
          <br />
          DIGITAL PRODUCTS
        </h1>

        <p
          style={{
            fontSize: 14,
            color: "#777",
            lineHeight: 1.6,
            maxWidth: 420,
            marginBottom: 26,
          }}
        >
          Founding successful companies by combining ideas with business
          expertise, capital and technical execution.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            pointerEvents: "all",
          }}
        >
          <button
            style={{
              background: "#534AB7",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              padding: "10px 24px",
              borderRadius: 24,
              border: "none",
              cursor: "pointer",
            }}
          >
            Get Started
          </button>
          <button
            style={{
              background: "rgba(255,255,255,0.55)",
              color: "#333",
              fontSize: 13,
              fontWeight: 500,
              padding: "10px 24px",
              borderRadius: 24,
              border: "0.5px solid rgba(83,74,183,0.2)",
              cursor: "pointer",
            }}
          >
            Our Case Study
          </button>
        </div>
      </div>
    </div>
  );
}