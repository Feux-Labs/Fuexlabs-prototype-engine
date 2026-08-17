import json
import os
import urllib.parse
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE_DIR, "public", "images", "business")
MANIFEST_PATH = os.path.join(BASE_DIR, "public", "images", "manifest.json")
os.makedirs(OUT_DIR, exist_ok=True)

CATEGORIES = {
    "school": "classroom students learning teacher",
    "restaurant": "restaurant interior dining tables",
    "clinic": "hospital clinic doctor examination room",
    "store": "retail store shop interior shelves",
    "salon": "hair salon spa interior",
    "hotel": "hotel lobby interior luxury",
    "church": "church interior sanctuary worship",
    "law": "law office lawyer meeting room",
    "realestate": "modern house exterior architecture",
    "generic": "modern office building exterior",
    "offer-team": "business team meeting collaboration",
    "offer-quality": "craftsman workshop detail work hands",
    "offer-trust": "customer service smiling handshake",
}

HEADERS = {
    "User-Agent": "FeuxLabsPrototypeGenerator/1.0 (contact: ayvicola@gmail.com) research/prototyping use"
}

GOOD_LICENSES = ("cc0", "public domain", "cc-by", "cc by")


def api_search(query, limit=10):
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {query}",
        "gsrnamespace": 6,
        "gsrlimit": limit,
        "prop": "imageinfo",
        "iiprop": "url|size|mime|extmetadata",
        "iiurlwidth": 1600,
        "format": "json",
    }
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8"))


def pick_best(data):
    pages = (data.get("query") or {}).get("pages") or {}
    candidates = []
    for page in pages.values():
        infos = page.get("imageinfo") or []
        if not infos:
            continue
        info = infos[0]
        if info.get("mime") != "image/jpeg":
            continue
        w, h = info.get("width", 0), info.get("height", 0)
        if not w or not h:
            continue
        ratio = w / h
        if ratio < 0.9:  # skip portrait/odd shapes, want landscape-ish
            continue
        ext = info.get("extmetadata", {})
        license_short = (ext.get("LicenseShortName", {}) or {}).get("value", "")
        artist_raw = (ext.get("Artist", {}) or {}).get("value", "")
        candidates.append({
            "title": page.get("title"),
            "thumburl": info.get("thumburl") or info.get("url"),
            "descriptionurl": info.get("descriptionurl"),
            "width": info.get("thumbwidth", w),
            "height": info.get("thumbheight", h),
            "license": license_short,
            "artist": artist_raw,
            "ratio": ratio,
        })
    # prefer permissive licenses, then closer to a nice 4:3-16:9 landscape ratio
    def score(c):
        lic_ok = 0 if any(g in c["license"].lower() for g in GOOD_LICENSES) else 1
        ratio_dist = abs(c["ratio"] - 1.5)
        return (lic_ok, ratio_dist)
    candidates.sort(key=score)
    return candidates[0] if candidates else None


def download(url, dest_path):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp, open(dest_path, "wb") as f:
        f.write(resp.read())


def main():
    manifest = {}
    for key, query in CATEGORIES.items():
        print(f"Searching: {key} -> {query}")
        try:
            data = api_search(query)
            best = pick_best(data)
        except Exception as e:
            print(f"  ERROR searching {key}: {e}")
            continue
        if not best:
            print(f"  No suitable candidate found for {key}")
            continue
        dest = os.path.join(OUT_DIR, f"{key}.jpg")
        try:
            download(best["thumburl"], dest)
            size = os.path.getsize(dest)
            print(f"  OK: {best['title']} ({best['width']}x{best['height']}, {size} bytes, license={best['license']})")
            manifest[key] = {
                "title": best["title"],
                "source": best["descriptionurl"],
                "license": best["license"],
                "artist": best["artist"],
                "local": f"/images/business/{key}.jpg",
            }
        except Exception as e:
            print(f"  ERROR downloading {key}: {e}")

    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"\nDone. {len(manifest)}/{len(CATEGORIES)} images saved. Manifest: {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
