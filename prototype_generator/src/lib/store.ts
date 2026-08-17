import fs from "fs";
import path from "path";
import type { ProtoRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

export function readAll(): ProtoRecord[] {
  ensureStore();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw) as ProtoRecord[];
  } catch {
    return [];
  }
}

export function findBySlug(slug: string): ProtoRecord | undefined {
  return readAll().find((r) => r.slug === slug);
}

export function uniqueSlug(base: string): string {
  const existing = new Set(readAll().map((r) => r.slug));
  if (!existing.has(base)) return base;
  let i = 2;
  while (existing.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

export function saveRecord(record: ProtoRecord): ProtoRecord {
  const all = readAll();
  all.unshift(record);
  ensureStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  return record;
}
