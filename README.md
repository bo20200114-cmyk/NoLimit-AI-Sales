# Stryde — scroll-driven product page (portfolio concept)

A single-page footwear brand concept inspired by high-end scroll-triggered
product reveals (e.g. eyewear/sneaker "Awwwards"-style landing pages). Built
as a portfolio example — swap the copy, colors, and artwork for a real
product and it's ready to ship.

## What it demonstrates

- **Pinned scroll story** (`.story` in `index.html`): a single 100vh viewport
  is pinned for 300% of scroll distance while three stages crossfade —
  lifestyle hero → floating studio product shot → macro detail with
  animated spec callouts. Driven by GSAP's `ScrollTrigger` with `scrub`.
- Editorial nav, oversized wordmark, and split info panels laid out to match
  the reference site's composition.
- Feature grid, story/about split section, horizontally-scrollable colorway
  gallery, and a footer signup — enough surrounding content to read as a
  real product page, not just the hero demo.

## Structure

```
index.html         markup for all sections
styles.css          all styling (dark theme, responsive)
script.js           ScrollTrigger timeline + small interaction polish
vendor/              gsap.min.js + ScrollTrigger.min.js (vendored locally,
                     no CDN dependency — self-contained, works offline)
assets/*.svg         generated placeholder artwork (shoe silhouette,
                     colorways, macro texture) — swap these for real
                     product photography when using this as a real project
```

## Running it

No build step. Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Swapping in real photography

Replace the files in `assets/` with real product shots (same filenames, or
update the `src` attributes in `index.html`). For best results:

- `hero.svg` → a full-bleed lifestyle/action shot (dark, moody works best
  with the current overlay gradient)
- `product-float.svg` → an isolated studio shot on a dark/transparent
  background
- `macro.svg` → a close-up texture/material shot (sole tread, stitching,
  foam)

Everything else (fonts via Google Fonts, GSAP vendored locally) needs no
further setup.
