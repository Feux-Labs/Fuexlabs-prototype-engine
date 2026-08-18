import fs from "fs";
import path from "path";
import type { ProtoRecord } from "./types";

// Vercel's serverless functions have a read-only/ephemeral filesystem, so
// writing to data/leads.json works locally (`npm run dev` / `npm start`) but
// silently doesn't persist once deployed there. When a KV store is linked
// (Vercel dashboard → Storage → KV → Connect to Project, which injects
// KV_REST_API_URL / KV_REST_API_TOKEN), use that instead; otherwise fall
// back to the local JSON file so local dev needs no extra setup.
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");
const KV_KEY = "feux-prototypes:leads";

const useKv = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function getKv() {
  const { kv } = await import("@vercel/kv");
  return kv;
}

function ensureFsStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function readAllFs(): ProtoRecord[] {
  ensureFsStore();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw) as ProtoRecord[];
  } catch {
    return [];
  }
}

function writeAllFs(all: ProtoRecord[]) {
  ensureFsStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
}

export async function readAll(): Promise<ProtoRecord[]> {
  if (useKv) {
    const kv = await getKv();
    const all = await kv.get<ProtoRecord[]>(KV_KEY);
    return all ?? [];
  }
  return readAllFs();
}

export async function findBySlug(slug: string): Promise<ProtoRecord | undefined> {
  const all = await readAll();
  return all.find((r) => r.slug === slug);
}

export async function uniqueSlug(base: string): Promise<string> {
  const all = await readAll();
  const existing = new Set(all.map((r) => r.slug));
  if (!existing.has(base)) return base;
  let i = 2;
  while (existing.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

export async function saveRecord(record: ProtoRecord): Promise<ProtoRecord> {
  const all = await readAll();
  all.unshift(record);
  if (useKv) {
    const kv = await getKv();
    await kv.set(KV_KEY, all);
  } else {
    writeAllFs(all);
  }
  return record;
}
