"use client";

import { useState } from "react";
import { copyText } from "@/lib/clipboard";

export default function CopyLinkButton({ url, className }: { url: string; className?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function handleCopy() {
    const ok = await copyText(url);
    setStatus(ok ? "copied" : "failed");
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <button type="button" className={className} onClick={handleCopy}>
      {status === "copied" ? "Copied" : status === "failed" ? "Couldn't copy" : "Copy"}
    </button>
  );
}
