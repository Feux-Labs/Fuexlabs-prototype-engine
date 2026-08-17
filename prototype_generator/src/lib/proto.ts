// A restrained, "simple but classic" palette in the spirit of Google/Claude's
// own product UIs — clean primary colors and neutrals, no gold/brown defaults.
export const ACCENT_COLORS: { accent: string; accentDark: string; label: string }[] = [
  { accent: "#1A73E8", accentDark: "#0B57BE", label: "Blue" },
  { accent: "#1F1F1F", accentDark: "#000000", label: "Charcoal" },
  { accent: "#D97757", accentDark: "#B15A3E", label: "Coral" },
  { accent: "#188038", accentDark: "#0F6926", label: "Green" },
  { accent: "#B3261E", accentDark: "#8C1D18", label: "Red" },
  { accent: "#0B7285", accentDark: "#075A68", label: "Teal" },
];

export function slugify(name: string): string {
  const s = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  return s.slice(0, 60) || "business";
}

export function initials(name: string): string {
  const skip = new Set(["of", "the", "and", "&", "for"]);
  const words = name.split(/\s+/).filter((w) => w && !skip.has(w.toLowerCase()));
  const letters = words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "");
  return letters.join("") || name.slice(0, 2).toUpperCase();
}

export function whatsappLink(phone: string, companyName: string, protoUrl: string): string {
  if (!phone) return "";
  let digits = phone.replace(/[^\d]/g, "");
  if (digits.startsWith("0")) digits = "234" + digits.slice(1);
  const msg =
    `Hi, this is Feux Labs. We're a tech studio in Abuja and we build websites & apps. ` +
    `We put together a free concept preview of what a website for ${companyName} could look ` +
    `like: ${protoUrl} — take a look and let us know if you'd like the real version built.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}
