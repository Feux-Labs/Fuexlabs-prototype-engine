"use client";

import { useEffect, useRef, useState } from "react";
import "./ServiceWorkflow.css";

export default function ServiceWorkflow({ steps }: { steps: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState<boolean[]>(() => steps.map(() => false));

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
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
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
    <div className="workflow" ref={containerRef} onPointerMove={handlePointerMove}>
      <div className="workflow-spotlight" aria-hidden="true" />
      {steps.map((step, i) => (
        <div className="workflow-step" key={step} data-step-index={i}>
          {i > 0 && <span className={`workflow-connector ${revealed[i] ? "grown" : ""}`} />}
          <span className={`workflow-chip ${revealed[i] ? "lit" : ""}`}>{i + 1}</span>
          <span className={`workflow-label ${revealed[i] ? "visible" : ""}`}>{step}</span>
        </div>
      ))}
    </div>
  );
}
