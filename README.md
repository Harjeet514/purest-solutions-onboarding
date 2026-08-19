# Purest Solutions — Onboarding Screens

Static HTML/CSS/JS build of the 3-slide onboarding carousel from Figma
(TPS project, node `0-1`).

## Files

```
splash-screens/
├── index.html        Markup — all 3 slides + dot pagination
├── css/styles.css     Carousel layout, gradients, button styles
├── js/script.js        Slide navigation, swipe support, Sign Up handler
├── images/             Add slide photography here (see below)
└── README.md
```

## How to preview

Open `index.html` directly in a browser. Click the dots, or swipe left/right
on a touch device/trackpad to move between slides.

## What's placeholder vs. final

- **Images** — `images/slide-1-products.png`, `slide-2-aiscan.png`,
  `slide-3-couple.png` are referenced but not included. Export the real
  photography from Figma and drop them in at those paths (or update the
  `src` attributes in `index.html`).
- **Colors/gradient** — estimated from the screenshot. Marked with `TODO`
  in `css/styles.css` — swap in exact values from Figma Dev Mode.
- **Sign Up button** — currently shows an `alert()`. Replace with real
  navigation to your sign-up flow.

## How it works (for devs unfamiliar with the pattern)

- All 3 slides sit side-by-side inside `.track`, which is a flex row.
- `.carousel` clips overflow so only one slide shows at a time.
- JS moves `.track` with `transform: translateX(...)` to reveal each
  slide — no slide is ever removed from the DOM, just shifted offscreen.
- Dot clicks and touch swipes both call the same `goToSlide()` function,
  so navigation state stays in sync regardless of input method.

## Notes

- Built mobile-first at a 375px reference width; frame scales down via
  `max-width: 100%` and goes full-bleed below 420px, same as the other
  screens in this portfolio project.
- No external dependencies or frameworks — plain HTML/CSS/JS.
