import { notFound } from "next/navigation";
import { findBySlug } from "@/lib/store";
import PrototypeLanding from "@/components/PrototypeLanding";

export default async function ProtoPage({ params }: { params: { slug: string } }) {
  const record = await findBySlug(params.slug);
  if (!record) return notFound();
  return <PrototypeLanding {...record} />;
}
