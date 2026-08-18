"use client";

import { useState } from "react";
import ServiceWorkflow from "./ServiceWorkflow";
import "./ServicesSection.css";

type Service = { num: string; title: string; processLabel: string; workflow: string[] };

export default function ServicesSection({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const activeService = services[active];

  return (
    <section className="services-section" id="services">
      <div className="services-grid">
        {services.map((s, i) => (
          <button
            type="button"
            key={s.num}
            className={`service-card ${active === i ? "active" : ""}`}
            onClick={() => setActive(i)}
            aria-expanded={active === i}
          >
            <div className="service-num">{s.num}</div>
            <div className="service-title">{s.title}</div>
          </button>
        ))}
      </div>
      <div className="wrap">
        <div className="services-workflow-panel">
          <div className="services-workflow-title">{activeService.processLabel}</div>
          <ServiceWorkflow steps={activeService.workflow} key={activeService.num} />
        </div>
      </div>
    </section>
  );
}
