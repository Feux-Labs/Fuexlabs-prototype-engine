import AnimatedLines from "@/components/AnimatedLines";

const WHATSAPP_START = "https://wa.me/2348000000000?text=Hello%20Feux%20Labs%2C%20I%20would%20like%20to%20start%20a%20project.";
const WHATSAPP_TALK = "https://wa.me/2348000000000?text=Hello%20Feux%20Labs%2C%20I%20would%20like%20to%20talk%20about%20a%20project.";

const SERVICES = [
  { num: "01", title: "Build Products" },
  { num: "02", title: "Build For Clients" },
  { num: "03", title: "Consulting" },
  { num: "04", title: "R&D: AI/VR/AR" },
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

export default function Home() {
  return (
    <>
      <header className="navbar">
        <div className="wrap navbar-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Feux Labs" className="brand-logo" />
          <a href={WHATSAPP_START} target="_blank" rel="noreferrer" className="btn-nav">
            Start a Project
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <AnimatedLines />
          <div className="hero-content">
            <div className="hero-badge">Abuja · Software &amp; Emerging Technology</div>
            <h1 className="hero-title">
              We build things
              <br />
              that <span>work</span>.
            </h1>
            <p className="hero-desc">
              Feux Labs designs and ships software, consults on technical strategy, and invents
              with AI, VR, and AR.
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

        <section className="services-grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.num}>
              <div className="service-num">{s.num}</div>
              <div className="service-title">{s.title}</div>
            </div>
          ))}
        </section>

        <section className="proof-section" id="proof">
          <div className="wrap">
            <div className="section-title">Proof Of Work</div>
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

      <footer className="footer">
        <span>Feux Labs — Abuja, Nigeria</span>
        <span className="footer-dot">·</span>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="footer-link">
          GitHub
        </a>
      </footer>
    </>
  );
}
