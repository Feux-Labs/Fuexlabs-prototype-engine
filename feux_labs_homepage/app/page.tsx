import GlowRibbon from "../components/GlowRibbon";
import RotatingHeadline from "../components/RotatingHeadline";
import ThemeToggle from "../components/ThemeToggle";
import ServicesSection from "../components/ServicesSection";
import Logo from "../components/Logo";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, ClockIcon } from "../components/icons";

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
    logo: "/images/projects/mamacare-logo.png",
  },
  {
    name: "MamaCare Mobile App",
    desc: "The MamaCare experience, native on iOS and Android.",
    href: null,
    status: "iOS & Android",
    statusClass: "status-progress",
    logo: "/images/projects/mamacare-logo.png",
  },
  {
    name: "OneNest",
    desc: "Parent company behind MamaCare and LifeAdmin, products that simplify life and support well-being.",
    href: "https://onenesthq.com",
    status: "Live",
    statusClass: "status-live",
    logo: "/images/projects/onenest-logo.png",
  },
  {
    name: "Todaynews.ng",
    desc: "Nigeria's AI-powered independent news channel, cutting through misinformation.",
    href: "https://todaynews.ng",
    status: "Live",
    statusClass: "status-live",
    logo: "/images/projects/todaynews-logo.png",
  },
  {
    name: "BullStock Nigeria",
    desc: "Stock market insights platform for Nigerian investors.",
    href: null,
    status: "In Development",
    statusClass: "status-progress",
    icon: "clock",
  },
  {
    name: "PharmaSense",
    desc: "Pharmacy inventory management system.",
    href: null,
    status: "In Development",
    statusClass: "status-progress",
    icon: "clock",
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
    wordmark: true,
  },
];

const FOOTER_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "Home", href: "#" },
      { label: "Our Services", href: "#services" },
      { label: "Mission & Vision", href: "#mission" },
      { label: "Our Work", href: "#proof" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Build Software", href: "#services" },
      { label: "Build For Clients", href: "#services" },
      { label: "AI & Automation", href: "#services" },
      { label: "Consulting", href: "#services" },
    ],
  },
  {
    heading: "Projects",
    links: [
      { label: "MamaCare", href: "https://mamacareng.com" },
      { label: "OneNest", href: "https://onenesthq.com" },
      { label: "Todaynews.ng", href: "https://todaynews.ng" },
      { label: "FastPrototype", href: FASTPROTOTYPE_URL },
    ],
  },
  {
    heading: "Get In Touch",
    links: [
      { label: PHONE_DISPLAY, href: PHONE_TEL },
      { label: `WhatsApp: ${WHATSAPP_DISPLAY}`, href: WHATSAPP_START },
      { label: "Facebook", href: FACEBOOK_URL },
      { label: "Instagram", href: INSTAGRAM_URL },
    ],
  },
];

const MISSION_VISION = [
  {
    label: "Our Mission",
    text: "To build software, AI, and automation that solves real problems for real people, designed with care, shipped fast, and built to last.",
  },
  {
    label: "Our Vision",
    text: "To be a leading software and AI automation studio out of Abuja, turning ambitious ideas into products that actually ship and actually work.",
  },
];

export default function Home() {
  return (
    <>
      <header className="navbar">
        <div className="wrap navbar-inner">
          <Logo />
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
              that do real work, from concept to production.
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

        <section className="mv-section" id="mission">
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
              {PROJECTS.map((p) => {
                const media = p.wordmark ? (
                  <div className="proof-media proof-media-wordmark">
                    Fast<span>Prototype</span>
                  </div>
                ) : p.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="proof-media proof-media-logo" src={p.logo} alt="" />
                ) : p.icon === "clock" ? (
                  <div className="proof-media proof-media-icon">
                    <ClockIcon size={28} />
                  </div>
                ) : null;
                const body = (
                  <div className="proof-card-body">
                    <span className={`status-badge ${p.statusClass}`}>{p.status}</span>
                    <div className="proof-name">{p.name}</div>
                    <div className="proof-desc">{p.desc}</div>
                  </div>
                );
                return p.href ? (
                  <a className="proof-card" href={p.href} target="_blank" rel="noreferrer" key={p.name}>
                    {media}
                    {body}
                  </a>
                ) : (
                  <div className="proof-card proof-card-static" key={p.name}>
                    {media}
                    {body}
                  </div>
                );
              })}
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
          <div className="footer-columns">
            {FOOTER_COLUMNS.map((col) => (
              <div className="footer-col" key={col.heading}>
                <div className="footer-col-heading">{col.heading}</div>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="footer-col-link"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
            <div className="footer-col footer-col-brand">
              <div className="footer-col-heading">Feux Labs</div>
              <div className="footer-brand-phone">{PHONE_DISPLAY}</div>
              <p className="footer-brand-address">
                Abuja,
                <br />
                Nigeria
              </p>
            </div>
          </div>

          <div className="footer-divider" />

          <div className="footer-bottom-row">
            <div className="footer-social">
              <span>Follow us:</span>
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-social-icon">
                <FacebookIcon size={18} />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-social-icon">
                <InstagramIcon size={18} />
              </a>
              <a href={WHATSAPP_START} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="footer-social-icon">
                <WhatsAppIcon size={18} />
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="footer-link">
                GitHub
              </a>
            </div>
          </div>

          <div className="footer-copyright">
            <span>© 2026 Feux Labs. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
