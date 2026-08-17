import json
import os
import urllib.parse
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE_DIR, "public", "images", "business")
MANIFEST_PATH = os.path.join(BASE_DIR, "public", "images", "manifest.json")

HEADERS = {
    "User-Agent": "FeuxLabsPrototypeGenerator/1.0 (contact: ayvicola@gmail.com) research/prototyping use"
}

WINNERS = {
    "school": "A classroom with students at the College of Medicine, FUASK.jpg",
    "law": "Employment law office zoom background.jpg",
    "realestate": "Gedersberg 02.jpg",
}


def fetch_full(title, width=1600):
    params = {
        "action": "query",
        "titles": f"File:{title}",
        "prop": "imageinfo",
        "iiprop": "url|size|mime|extmetadata",
        "iiurlwidth": width,
        "format": "json",
    }
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    pages = data.get("query", {}).get("pages", {})
    for page in pages.values():
        infos = page.get("imageinfo") or []
        if infos:
            return infos[0]
    return None


def download(url, dest_path):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp, open(dest_path, "wb") as f:
        f.write(resp.read())


def main():
    manifest = {}
    if os.path.exists(MANIFEST_PATH):
        with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
            manifest = json.load(f)

    for key, title in WINNERS.items():
        info = fetch_full(title)
        if not info:
            print(f"FAILED to refetch {key}: {title}")
            continue
        dest = os.path.join(OUT_DIR, f"{key}.jpg")
        download(info["thumburl"], dest)
        print(f"OK {key}: {os.path.getsize(dest)} bytes")
        ext = info.get("extmetadata", {})
        manifest[key] = {
            "title": title,
            "source": info.get("descriptionurl"),
            "license": (ext.get("LicenseShortName", {}) or {}).get("value", ""),
            "artist": (ext.get("Artist", {}) or {}).get("value", ""),
            "local": f"/images/business/{key}.jpg",
        }

    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print("Manifest updated.")


if __name__ == "__main__":
    main()
