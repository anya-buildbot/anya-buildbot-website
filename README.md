# Ania Tek Website

Simple static website for Ania Tek — premium IT solutions.

## Structure
- `index.htm` — main landing page
- `images/` — image assets
- `assets/` — logos, favicon, and other static files (not committed if large)

## Local development
Open `index.htm` in your browser. For a local server you can use Python:

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

## Changes included
- Added hover styles for services and portfolio items (blue on hover).
- Touch-friendly behavior: tapping a service/portfolio card on mobile toggles the active blue state.
- Simple rotating text effect for the hero title when multiple words are provided in the `<span>` separated by `|` or similar separators.
- Added `.gitignore` and this `README.md`.

## Notes
- Icons use Font Awesome via CDN; Tailwind CDN is used for utilities.
- If you want different hover color, change `#0b61ff` in the stylesheet.
