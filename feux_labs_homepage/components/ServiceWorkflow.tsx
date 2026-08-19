"use client";

import { useEffect, useRef, useState } from "react";
import "./ServiceWorkflow.css";

const STEP_HEIGHT = 132;
const NODE_X_LEFT = 90;
const NODE_X_RIGHT = 300;
const PAD_TOP = 50;
const VB_WIDTH = 390;

function curvePath(x1: number, y1: number, x2: number, y2: number) {
  const midY = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
}

export default function ServiceWorkflow({ steps }: { steps: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState<boolean[]>(() => steps.map(() => false));

  const positions = steps.map((_, i) => ({
    x: i % 2 === 0 ? NODE_X_LEFT : NODE_X_RIGHT,
    y: PAD_TOP + i * STEP_HEIGHT,
  }));
  const height = PAD_TOP * 2 + (steps.length - 1) * STEP_HEIGHT;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const nodes = container.querySelectorAll<HTMLElement>("[data-step-index]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.stepIndex);
          setRevealed((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -6% 0px" }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [steps]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    containerRef.current?.style.setProperty("--spot-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    containerRef.current?.style.setProperty("--spot-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <div className="workflow" ref={containerRef} onPointerMove={handlePointerMove} style={{ height }}>
      <div className="workflow-spotlight" aria-hidden="true" />

      <svg className="workflow-svg" width="100%" height={height} viewBox={`0 0 ${VB_WIDTH} ${height}`} preserveAspectRatio="none">
        <defs>
          <filter id="workflow-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>
        {positions.slice(1).map((p, i) => {
          const prev = positions[i];
          const isRevealed = revealed[i + 1];
          const d = curvePath(prev.x, prev.y, p.x, p.y);
          return (
            <g key={i}>
              <path d={d} className="workflow-track" fill="none" />
              <path d={d} className={`workflow-line ${isRevealed ? "drawn" : ""}`} fill="none" filter="url(#workflow-glow)" />
            </g>
          );
        })}
      </svg>

      {steps.map((step, i) => {
        const isCircle = i % 2 === 0;
        return (
          <div
            className={`workflow-node ${positions[i].x === NODE_X_LEFT ? "align-left" : "align-right"}`}
            key={step}
            data-step-index={i}
            style={{ top: positions[i].y, left: `${(positions[i].x / VB_WIDTH) * 100}%` }}
            tabIndex={0}
          >
            <span className={`workflow-shape ${isCircle ? "shape-circle" : "shape-bar"} ${revealed[i] ? "lit" : ""}`}>
              <span className="workflow-shape-num">{i + 1}</span>
              <span className="workflow-shape-label">{step}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
