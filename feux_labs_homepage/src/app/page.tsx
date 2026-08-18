import GlowRibbon from "@/components/GlowRibbon";
import RotatingHeadline from "@/components/RotatingHeadline";
import ThemeToggle from "@/components/ThemeToggle";
import ServicesSection from "@/components/ServicesSection";
import { PhoneIcon, WhatsAppIcon, FacebookIcon, InstagramIcon } from "@/components/icons";

const PHONE_DISPLAY = "0906 646 2428";
const PHONE_TEL = "tel:+2349066462428";
const WHATSAPP_NUMBER = "2347064847204";
const WHATSAPP_DISPLAY = "0706 484 7204";
const WHATSAPP_START = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Feux%20Labs%2C%20I%20would%20like%20to%20start%20a%20project.`;
const WHATSAPP_TALK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Feux%20Labs%2C%20I%20would%20like%20to%20talk%20about%20a%20project.`;
const FACEBOOK_URL = "https://facebook.com/feuxlabs";
const INSTAGRAM_URL = "https://instagram.com/feuxlabs";
const FASTPROTOTYPE_URL = "https://prototypes.feuxlabs.com.ng";

const SERVICES = [
  {
    num: "01",
    title: "Build Software",
    processLabel: "How We Build Software",
    workflow: ["Get Order", "Send Prototype", "Approve", "Pay", "Build", "Deliver"],
  },
  {
    num: "02",
    title: "Build For Clients",
    processLabel: "How We Build For Clients",
    workflow: ["Discovery Call", "Scope & Proposal", "Contract & Deposit", "Build", "Client Review", "Launch & Handover"],
  },
  {
    num: "03",
    title: "AI & Automation",
    processLabel: "How We Automate Your Workflow",
    workflow: ["Map Your Process", "Design The Workflow", "Build The Automation", "Test & Refine", "Deploy", "Monitor & Improve"],
  },
  {
    num: "04",
    title: "Consulting",
    processLabel: "How Our Consulting Works",
    workflow: ["Intro Call", "Technical Audit", "Strategy Session", "Roadmap Delivered", "Ongoing Support"],
  },
];

// GitHub org URL — placeholder matching the Feux Labs brand handle; confirm the
// real org URL and swap this before shipping.
const GITHUB_URL = "https://github.com/feuxlabs";

const PROJECTS = [
  {
    name: "MamaCare",
    desc: "Smart pregnancy companion — health tracking, appointment reminders, and AI-powered support for expectant mothers.",
    href: "https://mamacareng.com",
    status: "Live",
    statusClass: "status-live",
  },
  {
    name: "MamaCare Mobile App",
    desc: "The MamaCare experience, native on iOS and Android.",
    href: null,
    status: "iOS & Android",
    statusClass: "status-progress",
  },
  {
    name: "OneNest",
    desc: "Parent company behind MamaCare and LifeAdmin — products that simplify life and support well-being.",
    href: "https://onenesthq.com",
    status: "Live",
    statusClass: "status-live",
  },
  {
    name: "Todaynews.ng",
    desc: "Nigeria's AI-powered independent news channel, cutting through misinformation.",
    href: "https://todaynews.ng",
    status: "Live",
    statusClass: "status-live",
  },
  {
    name: "BullStock Nigeria",
    desc: "Stock market insights platform for Nigerian investors.",
    href: null,
    status: "In Development",
    statusClass: "status-progress",
  },
  {
    name: "PharmaSense",
    desc: "Pharmacy inventory management system.",
    href: null,
    status: "In Development",
    statusClass: "status-progress",
  },
  {
    name: "BookingX",
    desc: "Feux Labs' own booking application.",
    href: null,
    status: "Internal",
    statusClass: "status-progress",
  },
  {
    name: "Digital Twin AI",
    desc: "Proprietary R&D into AI-driven digital twin systems.",
    href: null,
    status: "Proprietary",
    statusClass: "status-prop",
  },
  {
    name: "FastPrototype",
    desc: "Instant landing-page prototype generator for outreach — built by Feux Labs.",
    href: "https://prototypes.feuxlabs.com.ng",
    status: "Live",
    statusClass: "status-live",
  },
];

const MISSION_VISION = [
  {
    label: "Our Mission",
    text: "To build software, AI, and automation that solves real problems for real people — designed with care, shipped fast, and built to last.",
  },
  {
    label: "Our Vision",
    text: "To be a leading software and AI automation studio out of Abuja — turning ambitious ideas into products that actually ship and actually work.",
  },
];

export default function Home() {
  return (
    <>
      <header className="navbar">
        <div className="wrap navbar-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Feux Labs" className="brand-logo" />
          <div className="navbar-actions">
            <ThemeToggle />
            <span className="navbar-divider" aria-hidden="true" />
            <a href={FASTPROTOTYPE_URL} target="_blank" rel="noreferrer" className="btn-nav-ghost">
              Build a Prototype
            </a>
            <a href={WHATSAPP_START} target="_blank" rel="noreferrer" className="btn-nav">
              Start a Project
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <GlowRibbon />
          <div className="hero-content">
            <div className="hero-badge">Africa · Software, AI &amp; Automation</div>
            <RotatingHeadline />
            <p className="hero-desc">
              Feux Labs builds software, designs automation systems, and ships AI-powered tools
              that do real work — from concept to production.
            </p>
            <div className="hero-actions">
              <a href={WHATSAPP_START} target="_blank" rel="noreferrer" className="btn-primary">
                Start a project
              </a>
              <a href="#proof" className="btn-secondary">
                See our work
              </a>
            </div>
          </div>
        </section>

        <ServicesSection services={SERVICES} />

        <section className="mv-section">
          <div className="wrap mv-grid">
            {MISSION_VISION.map((m) => (
              <div className="mv-card" key={m.label}>
                <div className="section-title">{m.label}</div>
                <p className="mv-text">{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="proof-section" id="proof">
          <div className="wrap">
            <div className="section-title">Some Of Our Past Work</div>
            <div className="proof-cards">
              {PROJECTS.map((p) =>
                p.href ? (
                  <a className="proof-card" href={p.href} target="_blank" rel="noreferrer" key={p.name}>
                    <span className={`status-badge ${p.statusClass}`}>{p.status}</span>
                    <div className="proof-name">{p.name}</div>
                    <div className="proof-desc">{p.desc}</div>
                  </a>
                ) : (
                  <div className="proof-card proof-card-static" key={p.name}>
                    <span className={`status-badge ${p.statusClass}`}>{p.status}</span>
                    <div className="proof-name">{p.name}</div>
                    <div className="proof-desc">{p.desc}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-banner">
            <div className="cta-title">Have something to build?</div>
            <a href={WHATSAPP_TALK} target="_blank" rel="noreferrer" className="btn-whatsapp">
              Message us on WhatsApp
            </a>
          </div>
        </section>

      </main>

      <footer className="footer" id="contact">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Feux Labs" className="brand-logo" />
            </div>
            <div className="footer-contact-grid">
              <a href={PHONE_TEL} className="contact-item">
                <span className="contact-icon">
                  <PhoneIcon size={20} />
                </span>
                <span className="contact-text">
                  <span className="contact-label">Call</span>
                  <span className="contact-value">{PHONE_DISPLAY}</span>
                </span>
              </a>
              <a href={WHATSAPP_START} target="_blank" rel="noreferrer" className="contact-item">
                <span className="contact-icon">
                  <WhatsAppIcon size={20} />
                </span>
                <span className="contact-text">
                  <span className="contact-label">WhatsApp</span>
                  <span className="contact-value">{WHATSAPP_DISPLAY}</span>
                </span>
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="contact-item">
                <span className="contact-icon">
                  <FacebookIcon size={20} />
                </span>
                <span className="contact-text">
                  <span className="contact-label">Facebook</span>
                  <span className="contact-value">@feuxlabs</span>
                </span>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="contact-item">
                <span className="contact-icon">
                  <InstagramIcon size={20} />
                </span>
                <span className="contact-text">
                  <span className="contact-label">Instagram</span>
                  <span className="contact-value">@feuxlabs</span>
                </span>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>Feux Labs — Abuja, Nigeria</span>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="footer-link">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
