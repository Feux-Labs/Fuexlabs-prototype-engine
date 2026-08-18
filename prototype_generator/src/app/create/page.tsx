"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BUSINESS_TYPES, GENERIC_OFFERINGS, getBusinessType } from "@/lib/businessTypes";
import type { SectionItem } from "@/lib/businessTypes";
import { ACCENT_COLORS, whatsappLink } from "@/lib/proto";
import { copyText } from "@/lib/clipboard";
import { TEMPLATES } from "@/lib/templates";
import type { ProtoRecord } from "@/lib/types";
import PrototypeLanding from "@/components/PrototypeLanding";
import TemplatePicker from "@/components/TemplatePicker";
import styles from "./page.module.css";

function ItemEditor({
  items,
  onChange,
}: {
  items: SectionItem[];
  onChange: (items: SectionItem[]) => void;
}) {
  function update(i: number, key: keyof SectionItem, value: string) {
    const next = items.map((it, idx) => (idx === i ? { ...it, [key]: value } : it));
    onChange(next);
  }
  return (
    <>
      {items.map((item, i) => (
        <div className={styles.itemCard} key={i}>
          <input
            className={styles.input}
            value={item.title}
            onChange={(e) => update(i, "title", e.target.value)}
            aria-label={`Title ${i + 1}`}
          />
          <textarea
            className={styles.textarea}
            value={item.desc}
            onChange={(e) => update(i, "desc", e.target.value)}
            aria-label={`Description ${i + 1}`}
            rows={2}
          />
        </div>
      ))}
    </>
  );
}

export default function Home() {
  const initialType = getBusinessType("generic");

  const [businessType, setBusinessType] = useState("generic");
  const [templateId, setTemplateId] = useState(TEMPLATES[0].id);
  const [accentIdx, setAccentIdx] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [tagline, setTagline] = useState(initialType.taglineTemplate("your area"));
  const [about, setAbout] = useState(initialType.aboutTemplate("Your Business"));
  const [sectionTitle, setSectionTitle] = useState(initialType.sectionTitle);
  const [sectionItems, setSectionItems] = useState<SectionItem[]>(initialType.sectionItems);
  const [offerings, setOfferings] = useState<SectionItem[]>(GENERIC_OFFERINGS);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<{ slug: string; url: string; waLink: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [showSupport, setShowSupport] = useState(false);

  async function handleCopyLink() {
    if (!saved) return;
    const ok = await copyText(saved.url);
    setCopyStatus(ok ? "copied" : "failed");
    setTimeout(() => setCopyStatus("idle"), 2000);
  }

  function applyBusinessTypeDefaults(key: string) {
    const bt = getBusinessType(key);
    const city = address.split(",")[0]?.trim() || "your area";
    setTagline(bt.taglineTemplate(city));
    setAbout(bt.aboutTemplate(name || "This business"));
    setSectionTitle(bt.sectionTitle);
    setSectionItems(bt.sectionItems);
  }

  function handleBusinessTypeChange(key: string) {
    setBusinessType(key);
    applyBusinessTypeDefaults(key);
  }

  const accentPair = ACCENT_COLORS[accentIdx];
  const heroImage = getBusinessType(businessType).heroImage;

  const previewRecord: ProtoRecord = useMemo(
    () => ({
      slug: "preview",
      name: name || "Your Business Name",
      businessType,
      templateId,
      accent: accentPair.accent,
      accentDark: accentPair.accentDark,
      heroImage,
      tagline,
      about,
      sectionTitle,
      sectionItems,
      offerings,
      address,
      phone,
      createdAt: new Date().toISOString(),
    }),
    [name, businessType, templateId, accentPair, heroImage, tagline, about, sectionTitle, sectionItems, offerings, address, phone]
  );

  async function handleSave() {
    setError(null);
    if (!name.trim()) {
      setError("Please enter a company/business name before saving.");
      return;
    }
    setSaving(true);
    setSaved(null);
    setCopyStatus("idle");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          businessType,
          templateId,
          accent: accentPair.accent,
          accentDark: accentPair.accentDark,
          heroImage,
          tagline,
          about,
          sectionTitle,
          sectionItems,
          offerings,
          address,
          phone,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to save prototype.");
      }
      const data = await res.json();
      const url = `${window.location.origin}/p/${data.slug}`;
      setSaved({
        slug: data.slug,
        url,
        waLink: whatsappLink(phone, name, url),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.formCol}>
        <div className={styles.topBar}>
          <div>
            <Link href="/" className={styles.brand} style={{ textDecoration: "none" }}>
              FastPrototype <span className={styles.brandTag}>by Feux Labs</span>
            </Link>
            <div className={styles.subtitle}>Fill in a company&apos;s details, generate an instant landing page.</div>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Link href="/" className={styles.navLink}>
              ← Home
            </Link>
            <Link href="/leads" className={styles.navLink}>
              Saved prototypes →
            </Link>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Business Type</label>
          <select
            className={styles.select}
            value={businessType}
            onChange={(e) => handleBusinessTypeChange(e.target.value)}
          >
            {BUSINESS_TYPES.map((bt) => (
              <option key={bt.key} value={bt.key}>
                {bt.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Company / Business Name</label>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Bright Horizons Academy"
          />
        </div>

        <div className={styles.row2}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>City / Address</label>
            <input
              className={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Gwarinpa, Abuja"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Phone / WhatsApp</label>
            <input
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 08012345678"
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <button
            type="button"
            className={styles.linkBtn}
            onClick={() => applyBusinessTypeDefaults(businessType)}
          >
            Refill copy from template
          </button>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Tagline</label>
          <input className={styles.input} value={tagline} onChange={(e) => setTagline(e.target.value)} />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>About Text</label>
          <textarea className={styles.textarea} value={about} onChange={(e) => setAbout(e.target.value)} rows={3} />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Accent Color</label>
          <div className={styles.swatchRow}>
            {ACCENT_COLORS.map((c, i) => (
              <button
                type="button"
                key={c.label}
                title={c.label}
                className={`${styles.swatch} ${i === accentIdx ? styles.active : ""}`}
                style={{ background: c.accent }}
                onClick={() => setAccentIdx(i)}
              />
            ))}
          </div>
        </div>

        <div className={styles.sectionHeading}>{sectionTitle || "Type-Specific Section"}</div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Section Title</label>
          <input className={styles.input} value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
        </div>
        <ItemEditor items={sectionItems} onChange={setSectionItems} />

        <div className={styles.sectionHeading}>What We Offer (generic — reusable for any business)</div>
        <ItemEditor items={offerings} onChange={setOfferings} />

        <TemplatePicker selected={templateId} accent={accentPair.accent} onSelect={setTemplateId} />

        <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save & Get Shareable Link"}
        </button>

        {error && <div className={styles.errorBox}>{error}</div>}
        {saved && (
          <div className={styles.successBox}>
            Saved! Your prototype is live at:
            <br />
            <a href={saved.url} target="_blank" rel="noreferrer">
              {saved.url}
            </a>
            <div className={styles.linksBar}>
              <a className={styles.linkBtn} href={saved.url} target="_blank" rel="noreferrer">
                View page
              </a>
              <button type="button" className={styles.linkBtn} onClick={handleCopyLink}>
                {copyStatus === "copied" ? "Copied" : copyStatus === "failed" ? "Couldn't copy" : "Copy Link"}
              </button>
              {saved.waLink && (
                <a className={`${styles.linkBtn} ${styles.primary}`} href={saved.waLink} target="_blank" rel="noreferrer">
                  Send on WhatsApp
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.previewCol}>
        <div className={styles.previewFrame}>
          <PrototypeLanding {...previewRecord} />
        </div>
      </div>
    </div>
  );
}
