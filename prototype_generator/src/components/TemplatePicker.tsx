"use client";

import { TEMPLATES, randomTemplateId, type TemplateConfig } from "@/lib/templates";
import "./TemplatePicker.css";

const THEME_BG: Record<string, string> = {
  modern: "#fbfaf7",
  bold: "#f4f1ea",
  minimal: "#ffffff",
  elegant: "#fbf9f4",
  dark: "#1c2028",
  playful: "#fff8ec",
  corporate: "#f4f6f9",
  gradient: "#f1eee6",
  magazine: "#faf9f6",
  warm: "#fdf6ec",
  midnight: "#171b24",
  soft: "#faf9fd",
};
const THEME_INK: Record<string, string> = {
  dark: "#e9eaee",
  midnight: "#e9eaee",
};

function Wireframe({ tpl, accent }: { tpl: TemplateConfig; accent: string }) {
  const bg = THEME_BG[tpl.theme] ?? "#fbfaf7";
  const ink = THEME_INK[tpl.theme] ?? "#20242c";
  const radius = tpl.theme === "minimal" ? 2 : tpl.theme === "playful" || tpl.theme === "soft" ? 10 : 5;

  const body =
    tpl.sectionLayout === "grid" ? (
      <div className="wf-row">
        <span className="wf-block" style={{ background: accent, opacity: 0.85 }} />
        <span className="wf-block" style={{ background: accent, opacity: 0.6 }} />
        <span className="wf-block" style={{ background: accent, opacity: 0.4 }} />
      </div>
    ) : tpl.sectionLayout === "rows" ? (
      <div className="wf-col">
        <span className="wf-line" style={{ background: ink, opacity: 0.5 }} />
        <span className="wf-line" style={{ background: ink, opacity: 0.5 }} />
        <span className="wf-line" style={{ background: ink, opacity: 0.5 }} />
      </div>
    ) : (
      <div className="wf-col">
        <span className="wf-alt-line" style={{ background: accent, opacity: 0.7 }} />
        <span className="wf-alt-line rev" style={{ background: accent, opacity: 0.5 }} />
      </div>
    );

  if (tpl.heroLayout === "split") {
    return (
      <div className="wf-frame" style={{ background: bg, borderRadius: radius }}>
        <div className="wf-split">
          <div className="wf-split-text">
            <span className="wf-dot" style={{ background: accent }} />
            <span className="wf-line short" style={{ background: ink }} />
            <span className="wf-line shorter" style={{ background: ink, opacity: 0.5 }} />
          </div>
          <div className="wf-split-visual" style={{ background: accent }} />
        </div>
        {body}
      </div>
    );
  }
  if (tpl.heroLayout === "banner") {
    return (
      <div className="wf-frame" style={{ background: bg, borderRadius: radius }}>
        <div className="wf-banner" style={{ background: accent }}>
          <span className="wf-line short center" style={{ background: "#fff" }} />
        </div>
        {body}
      </div>
    );
  }
  if (tpl.heroLayout === "sidebar") {
    return (
      <div className="wf-frame wf-frame-sidebar" style={{ background: bg, borderRadius: radius }}>
        <div className="wf-sidebar" style={{ background: ink === "#e9eaee" ? "#05070a" : "#14181f" }}>
          <span className="wf-dot small" style={{ background: accent }} />
        </div>
        <div className="wf-sidebar-main">{body}</div>
      </div>
    );
  }
  return (
    <div className="wf-frame" style={{ background: bg, borderRadius: radius }}>
      <div className="wf-centered">
        <span className="wf-dot" style={{ background: accent }} />
        <span className="wf-line short center" style={{ background: ink }} />
        <span className="wf-line shorter center" style={{ background: ink, opacity: 0.5 }} />
      </div>
      {body}
    </div>
  );
}

export default function TemplatePicker({
  selected,
  accent,
  onSelect,
}: {
  selected: string;
  accent: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="tpl-picker">
      <div className="tpl-picker-header">
        <span className="tpl-picker-label">Design template ({TEMPLATES.length} to choose from)</span>
        <button type="button" className="tpl-random-btn" onClick={() => onSelect(randomTemplateId())}>
          Randomize
        </button>
      </div>
      <div className="tpl-strip">
        {TEMPLATES.map((t) => (
          <button
            type="button"
            key={t.id}
            className={`tpl-thumb ${selected === t.id ? "active" : ""}`}
            onClick={() => onSelect(t.id)}
            title={t.name}
          >
            <Wireframe tpl={t} accent={accent} />
            <span className="tpl-thumb-name">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
