# CLAUDE.md

## Project Overview

Static website for Edinburgh Taxi Meters (edin.taxi). No build system or package manager — just plain HTML, CSS, and JavaScript served directly.

## Project Structure

- `index.html` — Single-page site (home, brands, services, coverage, contact sections)
- `css/styles.css` — All styles
- `js/main.js` — UI interactions (cursor, preloader, nav, animations)
- `js/form.js` — Contact form handling
- `assets/` — Logo images

## Development

No build step. Open `index.html` in a browser to preview. Uses Google Fonts (Outfit, Space Mono) via CDN.

## Guidelines

- Keep it as a single-page static site; do not introduce frameworks or build tools.
- Test changes by reviewing the HTML structure and CSS — there are no automated tests.
- Maintain mobile responsiveness (viewport meta tag is set).
