import { NextRequest, NextResponse } from "next/server";
import { slugify } from "@/lib/proto";
import { saveRecord, uniqueSlug } from "@/lib/store";
import type { ProtoRecord } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "A business name is required." }, { status: 400 });
  }

  const slug = await uniqueSlug(slugify(body.name));

  const record: ProtoRecord = {
    slug,
    name: body.name,
    businessType: body.businessType || "generic",
    templateId: body.templateId || "classic",
    accent: body.accent || "#1A73E8",
    accentDark: body.accentDark || "#0B57BE",
    heroImage: typeof body.heroImage === "string" ? body.heroImage : null,
    tagline: body.tagline || "",
    about: body.about || "",
    sectionTitle: body.sectionTitle || "What We Offer",
    sectionItems: Array.isArray(body.sectionItems) ? body.sectionItems : [],
    offerings: Array.isArray(body.offerings) ? body.offerings : [],
    address: body.address || "",
    phone: body.phone || "",
    createdAt: new Date().toISOString(),
  };

  await saveRecord(record);

  return NextResponse.json({ slug: record.slug });
}
