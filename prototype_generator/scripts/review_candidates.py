import json
import os
import sys
import urllib.parse
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REVIEW_DIR = os.path.join(BASE_DIR, "public", "images", "_review")
os.makedirs(REVIEW_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "FeuxLabsPrototypeGenerator/1.0 (contact: ayvicola@gmail.com) research/prototyping use"
}

BAD_WORDS = ("diagram", "map", "plan", "poster", "kit", "logo", "chart", "graph", "schematic", "icon")


def api_search(query, limit=15):
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {query}",
        "gsrnamespace": 6,
        "gsrlimit": limit,
        "prop": "imageinfo",
        "iiprop": "url|size|mime|extmetadata",
        "iiurlwidth": 480,
        "format": "json",
    }
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8"))


def candidates(data, top_n=3):
    pages = (data.get("query") or {}).get("pages") or {}
    out = []
    for page in pages.values():
        infos = page.get("imageinfo") or []
        if not infos:
            continue
        info = infos[0]
        title = page.get("title", "")
        if info.get("mime") != "image/jpeg":
            continue
        if any(b in title.lower() for b in BAD_WORDS):
            continue
        w, h = info.get("width", 0), info.get("height", 0)
        if not w or not h:
            continue
        ratio = w / h
        if not (1.15 <= ratio <= 2.1):
            continue
        out.append({
            "title": title,
            "thumburl": info.get("thumburl") or info.get("url"),
            "descriptionurl": info.get("descriptionurl"),
            "ratio": ratio,
        })
    out.sort(key=lambda c: abs(c["ratio"] - 1.5))
    return out[:top_n]


def download(url, dest_path):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp, open(dest_path, "wb") as f:
        f.write(resp.read())


def main():
    key = sys.argv[1]
    query = sys.argv[2]
    n = int(sys.argv[3]) if len(sys.argv) > 3 else 3
    data = api_search(query)
    cands = candidates(data, n)
    if not cands:
        print(f"No candidates for {key} ({query})")
        return
    for i, c in enumerate(cands, 1):
        dest = os.path.join(REVIEW_DIR, f"{key}_{i}.jpg")
        try:
            download(c["thumburl"], dest)
            print(f"{key}_{i}.jpg <- {c['title']}  ({c['descriptionurl']})")
        except Exception as e:
            print(f"  ERROR downloading candidate {i} for {key}: {e}")


if __name__ == "__main__":
    main()
