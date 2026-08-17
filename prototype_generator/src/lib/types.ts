import type { SectionItem } from "./businessTypes";

export type ProtoRecord = {
  slug: string;
  name: string;
  businessType: string;
  templateId: string;
  accent: string;
  accentDark: string;
  heroImage: string | null;
  tagline: string;
  about: string;
  sectionTitle: string;
  sectionItems: SectionItem[];
  offerings: SectionItem[];
  address: string;
  phone: string;
  createdAt: string;
};

export type { SectionItem };
