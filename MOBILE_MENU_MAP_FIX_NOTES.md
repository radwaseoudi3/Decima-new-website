# Mobile Menu & Map Interaction Fix - August 12, 2026

- Fixed the mobile hamburger menu being clipped by the legacy `.mobile-menu.mean-container { overflow: hidden; }` rule.
- Replaced the unreliable top-level MeanMenu reveal handler with a deterministic phone-only open/close controller while retaining submenu expansion.
- Added a visible map control toolbar with Landscape, Zoom Out, Reset, and Zoom In controls.
- Landscape mode now uses a deterministic CSS rotation/fixed-view fallback rather than depending on browser orientation-lock permissions.
- Enabled in-map pinch zoom and drag/pan with `touch-action: none`; zoom buttons remain available as an accessible alternative.
- Added version query strings to mobile CSS/JS references on all HTML pages to prevent stale mobile browser/GitHub Pages caching.
