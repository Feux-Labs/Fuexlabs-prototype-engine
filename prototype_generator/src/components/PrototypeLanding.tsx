import type { CSSProperties } from "react";
import type { ProtoRecord, SectionItem } from "@/lib/types";
import { getTemplate } from "@/lib/templates";
import "./PrototypeLanding.css";

// When a card needs a photo but only has one source image to draw from (the
// business type's hero photo), cycle through a few crops so a row of cards
// doesn't show the exact same framing three times in a row.
const CROP_POSITIONS = ["22% 30%", "50% 50%", "78% 35%"];
function cropFor(i: number) {
  return CROP_POSITIONS[i % CROP_POSITIONS.length];
}

function GridTile({
  item,
  image,
  objectPosition,
  accent,
  accentDark,
}: {
  item: SectionItem;
  image: string | null;
  objectPosition: string;
  accent: string;
  accentDark: string;
}) {
  if (image) {
    return (
      <div className="proto-tile">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" style={{ objectPosition }} />
        <div className="proto-tile-scrim" />
        <div className="proto-tile-text">
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="proto-tile proto-tile-solid" style={{ background: `linear-gradient(150deg, ${accent}, ${accentDark})` }}>
      <div className="proto-tile-text">
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </div>
  );
}

function Thumb({ image, objectPosition, accent }: { image: string | null; objectPosition: string; accent: string }) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="proto-thumb" src={image} alt="" style={{ objectPosition }} />;
  }
  return <div className="proto-thumb proto-thumb-solid" style={{ background: accent }} />;
}

function SectionBlock({
  layout,
  items,
  image,
  accent,
  accentDark,
}: {
  layout: "grid" | "rows" | "alternating";
  items: SectionItem[];
  image: string | null;
  accent: string;
  accentDark: string;
}) {
  if (layout === "rows") {
    return (
      <div className="proto-rows">
        {items.map((item, i) => (
          <div className="proto-row" key={i}>
            <Thumb image={image} objectPosition={cropFor(i)} accent={accent} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (layout === "alternating") {
    return (
      <div className="proto-alt">
        {items.map((item, i) => (
          <div className={`proto-alt-item ${i % 2 === 1 ? "reverse" : ""}`} key={i}>
            <Thumb image={image} objectPosition={cropFor(i)} accent={accent} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="proto-grid">
      {items.map((item, i) => (
        <GridTile
          key={i}
          item={item}
          image={image}
          objectPosition={cropFor(i)}
          accent={accent}
          accentDark={accentDark}
        />
      ))}
    </div>
  );
}

function HeroMedia({
  image,
  accent,
  accentDark,
  objectPosition = "50% 45%",
}: {
  image: string | null;
  accent: string;
  accentDark: string;
  objectPosition?: string;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="proto-hero-media" src={image} alt="" style={{ objectPosition }} />
    );
  }
  return <div className="proto-hero-media proto-hero-media-solid" style={{ background: `linear-gradient(135deg, ${accent}, ${accentDark})` }} />;
}

export default function PrototypeLanding(props: ProtoRecord) {
  const {
    name,
    templateId,
    accent,
    accentDark,
    heroImage,
    tagline,
    about,
    sectionTitle,
    sectionItems,
    offerings,
    address,
    phone,
  } = props;

  const template = getTemplate(templateId);
  const initialsText = name
    .split(/\s+/)
    .filter((w) => w && !["of", "the", "and", "&", "for"].includes(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || name.slice(0, 2).toUpperCase();

  const style = {
    "--accent": accent,
    "--accent-dark": accentDark,
  } as CSSProperties;

  const sections = (
    <>
      <section className="proto-section">
        <div className="proto-section-title">About Us</div>
        <div className="proto-card proto-about-card">
          <p>{about}</p>
        </div>
      </section>

      <section className="proto-section">
        <div className="proto-section-title">{sectionTitle}</div>
        <SectionBlock
          layout={template.sectionLayout}
          items={sectionItems}
          image={heroImage}
          accent={accent}
          accentDark={accentDark}
        />
      </section>

      <section className="proto-section">
        <div className="proto-section-title">What We Offer</div>
        <SectionBlock
          layout={template.sectionLayout === "alternating" ? "grid" : template.sectionLayout}
          items={offerings}
          image={null}
          accent={accent}
          accentDark={accentDark}
        />
      </section>

      <section className="proto-section">
        <div className="proto-section-title">Contact</div>
        <div className="proto-card">
          <div className="proto-contact-row">
            <div>{address || "Address on request"}</div>
            <div>{phone || "Contact via WhatsApp"}</div>
          </div>
        </div>
      </section>
    </>
  );

  const footer = (
    <footer className="proto-footer">
      <h2>Like what you see?</h2>
      <p>
        This is a prototype of what your site could look like, made by{" "}
        <a className="proto-footer-link" href="https://feuxlabs.com.ng" target="_blank" rel="noreferrer">
          Feux Labs
        </a>
        . If you like it, we&apos;ll give it to you free — hosted on our URL — for 6 months.
      </p>
      <a className="proto-cta" href="https://wa.me/2349000000000" target="_blank" rel="noreferrer">
        Chat with Feux Labs on WhatsApp
      </a>
    </footer>
  );

  const banner = (
    <div className="proto-banner">
      This is a free concept prototype made by{" "}
      <a className="proto-banner-link" href="https://feuxlabs.com.ng" target="_blank" rel="noreferrer">
        <strong>Feux Labs</strong>
      </a>{" "}
      — not yet {name || "this business"}&apos;s official website.
    </div>
  );

  if (template.heroLayout === "sidebar") {
    return (
      <div className="proto-root" data-theme={template.theme} style={style}>
        {banner}
        <div className="proto-shell-sidebar">
          <aside className="proto-sidebar">
            <div className="proto-logo">{initialsText}</div>
            <div className="proto-sidebar-name">{name || "Your Business"}</div>
            <div className="proto-sidebar-tagline">{tagline}</div>
          </aside>
          <div className="proto-main">
            <div className="proto-hero-band">
              <HeroMedia image={heroImage} accent={accent} accentDark={accentDark} />
              <div className="proto-hero-band-scrim" />
            </div>
            {sections}
            {footer}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="proto-root" data-theme={template.theme} style={style}>
      {banner}
      <header className={`proto-hero proto-hero-${template.heroLayout}`}>
        {template.heroLayout === "centered" && (
          <>
            <HeroMedia image={heroImage} accent={accent} accentDark={accentDark} />
            <div className="proto-hero-scrim" />
            <div className="proto-hero-centered-content">
              <div className="proto-logo proto-logo-onphoto">{initialsText}</div>
              <h1>{name || "Your Business Name"}</h1>
              <p className="proto-tagline">{tagline}</p>
            </div>
          </>
        )}
        {template.heroLayout === "split" && (
          <div className="proto-hero-split-grid">
            <div className="proto-hero-split-text">
              <div className="proto-logo">{initialsText}</div>
              <h1>{name || "Your Business Name"}</h1>
              <p className="proto-tagline">{tagline}</p>
            </div>
            <div className="proto-hero-split-visual">
              <HeroMedia image={heroImage} accent={accent} accentDark={accentDark} />
            </div>
          </div>
        )}
        {template.heroLayout === "banner" && (
          <>
            <HeroMedia image={heroImage} accent={accent} accentDark={accentDark} />
            <div className="proto-hero-scrim" />
            <div className="proto-hero-banner-inner">
              <h1>{name || "Your Business Name"}</h1>
              <p className="proto-tagline">{tagline}</p>
            </div>
          </>
        )}
      </header>
      <main>{sections}</main>
      {footer}
    </div>
  );
}
