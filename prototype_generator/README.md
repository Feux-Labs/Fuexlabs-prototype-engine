# Feux Labs Prototype Generator

A Next.js app for generating free concept landing-page prototypes for outreach leads.
Fill in a company's details, pick a business type and a design template, and get an
instant live preview plus a shareable link and pre-filled WhatsApp outreach message.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3300 (or whatever port you choose — see below).

- **Generator** — `/` — the form + live preview.
- **Saved prototypes** — `/leads` — every prototype you've saved, with View and
  WhatsApp links.
- **A saved prototype** — `/p/<slug>` — the actual page you'd send to a lead.

Saved prototypes are stored in `data/leads.json` (plain JSON, no database needed).

## How it works

1. Pick a **Business Type** (school, restaurant, clinic, store, salon, hotel,
   church, law firm, real estate, or generic). This auto-fills the tagline, about
   text, and a type-specific section (e.g. "Menu Highlights" for restaurants,
   "Practice Areas" for law firms) — all defined in
   [`src/lib/businessTypes.ts`](src/lib/businessTypes.ts). Everything is still
   editable afterwards.
2. The **"What We Offer"** section stays generic across every business type on
   purpose, so the tool works for any kind of company, not just the ones with a
   dedicated preset.
3. Pick a **design template** from the scrollable strip (14 templates — different
   hero layouts, section layouts, and visual themes) or hit **Randomize**. Templates
   are defined in [`src/lib/templates.ts`](src/lib/templates.ts).
4. Hit **Save & Get Shareable Link** to persist it and get a `/p/<slug>` URL plus a
   ready-to-send WhatsApp message.

## Design system

- **Real photography, not icons.** Every business type carries one real, CC-licensed
  photo (`public/images/business/<key>.jpg`, sourced from Wikimedia Commons — see
  `public/images/manifest.json` for title/author/license per photo). That single photo
  is reused as the hero background and, cropped to a few different focal points, as
  the photo tiles in the type-specific section. The generic "What We Offer" section
  (shared by every business type) uses a clean solid-color tile in the chosen accent
  instead — intentional, not a placeholder.
- Two business types (**Clinic** and **Salon**) have no real photo — nothing on
  Wikimedia Commons was good enough to use, and a mismatched photo is worse than a
  clean color tile. Both fall back to the same color-tile treatment everywhere,
  automatically. `heroImage: null` in `businessTypes.ts` is what triggers this — set
  a real path there if you source a good photo for them later.
- **Palette**: `src/lib/proto.ts` → `ACCENT_COLORS`. Six restrained colors (Blue,
  Charcoal, Coral, Green, Red, Teal) in the spirit of Google/Claude's own product UI,
  replacing an earlier gold/brown-heavy default. CTA buttons use the darker variant of
  each pair for contrast against white text.
- To re-source or swap any photo: `scripts/fetch_images.py` (category → Commons search
  → download) and `scripts/review_candidates.py` / `review_category.py` (pull a few
  candidates at low-res into `public/images/_review/` to eyeball before committing)
  are what were used to build the current set. Re-run against a better query and copy
  the winner into `public/images/business/<key>.jpg`.

## Notes

- `next.config.js` disables the Next.js build worker thread pool
  (`experimental.workerThreads: false`). On this machine, `next build` crashes with
  a native access violation when the parallel static-generation workers are enabled
  — a Windows/Node worker_threads issue, not an app bug. Single-threaded builds work
  reliably; if you hit `Next.js build worker exited with code: ...` again after
  removing that setting, put it back.
- The old Excel-driven bulk generator (`generate.py` + `template.html`) still lives
  in [`legacy-python/`](legacy-python/) for reference. It's no longer wired up —
  this app replaces it with a per-company form.
- `npm audit` reports high-severity advisories against Next.js 14.2.35. Almost all
  of them are about publicly-hosted, internet-facing Next servers (DoS, cache
  poisoning, SSRF via Server Actions) — not relevant to running this locally as your
  own tool. If you ever deploy this generator itself to the public internet
  (as opposed to just sharing the generated `/p/<slug>` pages), upgrade to Next 15/16
  first.

## Project structure

```
src/
  app/
    page.tsx              generator form + live preview
    p/[slug]/page.tsx      saved prototype page
    leads/page.tsx          saved-prototypes list
    api/generate/route.ts  POST endpoint that persists a prototype
  components/
    PrototypeLanding.tsx    the actual landing page, shared by preview + saved pages
    TemplatePicker.tsx      the scrollable template gallery
  lib/
    businessTypes.ts        per-business-type copy defaults
    templates.ts             the 14 design template configs
    proto.ts                 slugify / initials / WhatsApp link helpers
    store.ts                 JSON file read/write
data/leads.json             saved prototypes (created automatically)
```
