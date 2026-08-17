# Feux Labs — School Prototype Sites: Deploy Guide

## What's in this folder
- One subfolder per school (slug name), each with a single `index.html` — a static, self-contained prototype site.
- `prototype_links.csv` — every school's prototype URL + a pre-filled WhatsApp send link.

## How to host on prototypes.feuxlabs.com.ng (using your existing VPS + Caddy)

1. **DNS**: In your domain registrar (wherever feuxlabs.com.ng is registered), add an A record:
   `prototypes.feuxlabs.com.ng` → your VPS IP address (same one Deallock.ng runs on).

2. **Upload the files** to your VPS, e.g.:
   ```
   scp -r prototypes/ user@your-vps-ip:/var/www/prototypes
   ```
   (Remove `prototype_links.csv` and this README from the web-facing folder — they're for your use, not public.)

3. **Add a Caddy site block** (edit your Caddyfile, usually `/etc/caddy/Caddyfile`):
   ```
   prototypes.feuxlabs.com.ng {
       root * /var/www/prototypes
       file_server
       try_files {path} {path}/ =404
   }
   ```
   Caddy auto-provisions SSL for this domain the moment it's live and DNS resolves — no manual cert setup needed.

4. **Reload Caddy**:
   ```
   sudo systemctl reload caddy
   ```

5. Test: visit `https://prototypes.feuxlabs.com.ng/densville-international-school/` (or any slug from the CSV).

## Re-running the generator for new leads
`prototype_generator/generate.py` reads directly from your Feux_Labs_Lead_Pipeline.xlsx — any row where
column I ("Problem Observed") contains "NO WEBSITE" gets a prototype built automatically. Just re-run it
after adding new leads to regenerate everything (safe to re-run, it overwrites existing files).

## Known issue to fix before sending
A few leads have two phone numbers in one field (e.g. "09-6702723 / 08074912296") — the WhatsApp link
generator concatenated these incorrectly for those rows. Check any link in the CSV that looks unusually
long before sending; manually pick one number for those cases.
