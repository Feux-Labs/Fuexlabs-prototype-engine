import Link from "next/link";
import { readAll } from "@/lib/store";
import { getBusinessType } from "@/lib/businessTypes";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function Home() {
  const all = await readAll();
  const samples = all.filter((r) => r.slug.startsWith("sample-"));

  return (
    <div className={styles.landing}>
      <header className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.brandBlock}>
            <span className={styles.brandName}>FastPrototype</span>
            <span className={styles.brandTag}>by Feux Labs</span>
          </div>
          <Link href="/leads" className={styles.navLink}>
            Saved prototypes →
          </Link>
        </div>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.h1}>Turn a business into a landing page in under a minute.</h1>
        <p className={styles.lede}>
          Pick a business type, fill in a few details, and FastPrototype generates a real,
          shareable landing page you can send straight to a lead on WhatsApp — no design work,
          no code, no waiting.
        </p>
        <Link href="/create" className={styles.ctaBtn}>
          Create a Prototype
        </Link>
      </section>

      {samples.length > 0 && (
        <section className={styles.samples}>
          <div className={styles.samplesHeader}>
            <h2>See what you can create</h2>
            <p>A few real examples, generated with FastPrototype.</p>
          </div>
          <div className={styles.sampleGrid}>
            {samples.map((s) => {
              const bt = getBusinessType(s.businessType);
              return (
                <a
                  key={s.slug}
                  href={`/p/${s.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.sampleCard}
                >
                  {s.heroImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.heroImage} alt="" className={styles.sampleImg} />
                  )}
                  <div className={styles.sampleBody}>
                    <div className={styles.sampleType}>{bt.label}</div>
                    <div className={styles.sampleName}>{s.name}</div>
                    <div className={styles.sampleView}>View sample →</div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      <section className={styles.how}>
        <div className={styles.howStep}>
          <div className={styles.howNum}>1</div>
          <div className={styles.howTitle}>Pick a business type</div>
          <div className={styles.howDesc}>
            School, restaurant, clinic, real estate and more, each with copy that fits.
          </div>
        </div>
        <div className={styles.howStep}>
          <div className={styles.howNum}>2</div>
          <div className={styles.howTitle}>Customize it</div>
          <div className={styles.howDesc}>
            Name, tagline, colors, and one of 15 design templates, with a live preview as you type.
          </div>
        </div>
        <div className={styles.howStep}>
          <div className={styles.howNum}>3</div>
          <div className={styles.howTitle}>Share it</div>
          <div className={styles.howDesc}>
            Get a real shareable link and a ready-to-send WhatsApp message.
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>FastPrototype</span>
        <span className={styles.footerDot}>·</span>
        <a href="https://feuxlabs.com.ng" target="_blank" rel="noreferrer">
          by Feux Labs
        </a>
      </footer>
    </div>
  );
}
