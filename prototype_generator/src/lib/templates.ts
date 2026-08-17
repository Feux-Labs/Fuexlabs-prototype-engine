export type HeroLayout = "centered" | "split" | "banner" | "sidebar";
export type SectionLayout = "grid" | "rows" | "alternating";
export type Theme =
  | "modern"
  | "bold"
  | "minimal"
  | "elegant"
  | "dark"
  | "playful"
  | "corporate"
  | "gradient"
  | "magazine"
  | "warm"
  | "midnight"
  | "soft";

export type TemplateConfig = {
  id: string;
  name: string;
  heroLayout: HeroLayout;
  sectionLayout: SectionLayout;
  theme: Theme;
};

export const TEMPLATES: TemplateConfig[] = [
  { id: "classic", name: "Classic", heroLayout: "centered", sectionLayout: "grid", theme: "modern" },
  { id: "split-modern", name: "Split Modern", heroLayout: "split", sectionLayout: "grid", theme: "modern" },
  { id: "bold-banner", name: "Bold Banner", heroLayout: "banner", sectionLayout: "grid", theme: "bold" },
  { id: "minimal-rows", name: "Minimal", heroLayout: "centered", sectionLayout: "rows", theme: "minimal" },
  { id: "elegant-split", name: "Elegant", heroLayout: "split", sectionLayout: "alternating", theme: "elegant" },
  { id: "midnight-banner", name: "Midnight", heroLayout: "banner", sectionLayout: "grid", theme: "dark" },
  { id: "playful-centered", name: "Playful", heroLayout: "centered", sectionLayout: "grid", theme: "playful" },
  { id: "corporate-sidebar", name: "Corporate", heroLayout: "sidebar", sectionLayout: "rows", theme: "corporate" },
  { id: "gradient-split", name: "Gradient", heroLayout: "split", sectionLayout: "grid", theme: "gradient" },
  { id: "magazine-banner", name: "Magazine", heroLayout: "banner", sectionLayout: "alternating", theme: "magazine" },
  { id: "warm-rows", name: "Warm", heroLayout: "centered", sectionLayout: "rows", theme: "warm" },
  { id: "midnight-sidebar", name: "Executive", heroLayout: "sidebar", sectionLayout: "grid", theme: "midnight" },
  { id: "soft-split", name: "Soft", heroLayout: "split", sectionLayout: "rows", theme: "soft" },
  { id: "bold-sidebar", name: "Statement", heroLayout: "sidebar", sectionLayout: "alternating", theme: "bold" },
];

export function getTemplate(id: string): TemplateConfig {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

export function randomTemplateId(): string {
  return TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)].id;
}
