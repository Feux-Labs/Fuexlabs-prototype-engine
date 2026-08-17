import Link from "next/link";
import { headers } from "next/headers";
import { readAll } from "@/lib/store";
import { whatsappLink } from "@/lib/proto";
import { getBusinessType } from "@/lib/businessTypes";
import CopyLinkButton from "@/components/CopyLinkButton";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default function LeadsPage() {
  const records = readAll();
  const h = headers();
  const proto = h.get("x-forwarded-proto") || "http";
  const host = h.get("host");
  const baseUrl = `${proto}://${host}`;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>Saved Prototypes ({records.length})</div>
        <Link href="/" className={styles.back}>
          ← Back to generator
        </Link>
      </div>

      {records.length === 0 ? (
        <div className={styles.empty}>No prototypes saved yet. Go generate one!</div>
      ) : (
        <div className={styles.list}>
          {records.map((r) => {
            const url = `/p/${r.slug}`;
            const wa = whatsappLink(r.phone, r.name, `${baseUrl}${url}`);
            const bt = getBusinessType(r.businessType);
            return (
              <div className={styles.row} key={r.slug}>
                <div className={styles.dot} style={{ background: r.accent }} />
                <div className={styles.info}>
                  <div className={styles.name}>{r.name}</div>
                  <div className={styles.meta}>
                    {bt.label} · {r.address || "No address"} · {new Date(r.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className={styles.actions}>
                  <a className={styles.linkBtn} href={url} target="_blank" rel="noreferrer">
                    View
                  </a>
                  <CopyLinkButton url={`${baseUrl}${url}`} className={styles.linkBtn} />
                  {wa && (
                    <a className={`${styles.linkBtn} ${styles.primary}`} href={wa} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
