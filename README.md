# Purest Solutions App

Static HTML/CSS/JS build of the Purest Solutions app screens from Figma
(TPS project).

## Files

```
purest-solutions-app/
├── index.html                  Onboarding — 3-slide carousel
├── skin-profile.html           Skin Profile form + photo/selfie modal
├── photo-instructions.html     Photo upload instructions
├── selfie-instructions.html    Selfie instructions
├── face-scan.html              Camera capture — 3 states (guide, review, analyzing)
├── skin-results.html           Skin results with switchable concern tabs
├── recommended-products.html   Product recommendations with add-to-cart
├── full-skin-report.html       Full report — radar chart + per-concern cause cards
├── compare-results.html        Recent vs. previous scan comparison
├── previous-results-list.html  Date picker for previous scan history
├── preview-images.html         Expanded Recent/Previous photo preview
├── product-details.html        Product detail page (Cleanser) with tabs, shipping, similar products
├── reviews-rating.html         Reviews & rating breakdown with filters
├── write-review.html           Write a review form
├── css/styles.css              All styling, shared across screens
├── js/script.js                All behavior, shared across screens
├── images/                     Add screen photography/assets here
└── README.md
```

## Flow

```
index.html (onboarding)
  → Sign Up
    → skin-profile.html (form)
      → Continue → modal (Take a selfie / Upload photo)
        → selfie-instructions.html
          → Take a selfie → face-scan.html
            → capture → review (Retake/Continue) → analyzing
              → skin-results.html (tabs: Redness / Hydration / ... / Radiance)
                → See full report → full-skin-report.html
                  → Compare → compare-results.html
                    → date dropdown → previous-results-list.html
                    → +Preview images → preview-images.html
                → Recommended products → recommended-products.html
                  → tap Cleanser → product-details.html
                    → rating → reviews-rating.html
                      → Write a review → write-review.html
        → photo-instructions.html
```

## How to preview

Open `index.html` in a browser and click through — Sign Up leads into the
Skin Profile form, which leads into the photo/selfie modal, which leads
into the matching instructions screen.

## What's placeholder vs. final

- **Images** — onboarding slide photography not yet included (see
  `images/` — add your Figma exports there).
- **Icons** — emoji are stand-ins for the real icon set throughout.
  Replace with SVGs exported from Figma when available.
- **Colors** — estimated from screenshots, not pulled from Figma Dev
  Mode. Marked with `TODO` comments in `css/styles.css`.
- **Photo/camera actions** — "Upload a photo" and "Take a selfie"
  buttons on the instructions screens currently show an `alert()`.
  Replace with real file picker / camera access.
- **Camera feed** — `face-scan.html`'s camera view is a static gradient
  placeholder, not a real feed. Replace with a live `<video>` element
  wired to `getUserMedia()` for actual camera access. The face
  positioning checks (Light / Close to Camera / In Oval) are hardcoded
  states for demo purposes — real logic would come from your face
  detection/AI scan integration.
- **Skin results photo & markers** — `skin-results.html` uses a
  gradient placeholder instead of the user's real captured photo.
  13 concerns are built: Redness (88), Hydration (64), Dark Circles
  (80), Moisture (86), Spots (60), Eyebags (88), Wrinkles (87), Acne
  (53), Pores (68), UV Damage (79), Oiliness (85), Texture (score
  unconfirmed — shown as "–"), Radiance (84). Row order confirmed as:
  Redness, Hydration, Dark Circles, Moisture, Spots, Eyebags,
  Wrinkles, Acne, Pores, UV Damage, Oiliness, Texture, Radiance. Not
  yet confirmed whether Radiance is the final concern in the 16+
  total, or more follow it — add them the same way once confirmed.
- **Product images** — `recommended-products.html` references
  `images/product-cleanser.png`, `product-toner.png`,
  `product-serum.png`, `product-moisturizer.png`,
  `product-sunscreen.png`, `product-retinol.png` — none included yet.
  Add your real product exports at those paths.
- **Product prices** — only Cleanser ($19.99) and Toner ($20.99) have
  confirmed prices. Serum, Moisturizer, Sun Screen, and Retinol are
  left blank — the screenshot's price text wasn't clearly legible.
  Fill in `.product-price` for each once confirmed.
- **Skin routine section** — only 3 steps built (Cleanser, Toner,
  Serum) since the screenshot's bottom edge was cut off. Add
  remaining steps once you can share the rest.
- **Add to cart** — currently shows an `alert()` per product.
  Replace with real cart state/logic.
- **Full skin report causes text** — every concern card in
  `full-skin-report.html` currently shows the same description text,
  because the source Figma file has identical placeholder/lorem-ipsum
  copy on every card rather than concern-specific writing. Replace
  `.cause-text` in each card with real, concern-specific copy before
  this goes in your portfolio as a finished piece — as-is it reads as
  unfinished content, not a design/code issue.
- **Radar chart ("Skin matrix")** — built as a data-driven SVG
  (`buildRadarChart()` in `js/script.js`) using the 8 confirmed
  concern scores with clear labels, rather than trying to pixel-match
  Figma's exact small chart. The Skin Health center number (71) is
  hardcoded — wire it to the real score source in your app.
- **Texture score in the causes list** — still unconfirmed; shown
  with a "–" badge and an estimated bar position. Update once you
  have the real number.
- **Compare Results historical data** — `compare-results.html`'s
  "Previous result" values are illustrative placeholders, since
  there's no real scan history to pull from yet. "Overall" and
  "Redness" tab numbers are approximate reads from screenshots;
  Hydration and Dark Circles tabs are still invented placeholders.
  Replace `filterData` in `js/script.js` with real historical scan
  data once available.
- **Previous Results date list** — `previous-results-list.html`'s
  dates are illustrative (only 25/01/2024 is confirmed real). Row
  selection currently just navigates back to the comparison screen
  without actually updating which date is shown — wire this to real
  state/query params once you have actual scan history to select
  from.
- **Preview Images photos & markers** — `preview-images.html` uses
  placeholder gradient photos with approximate marker positions, not
  the user's real Recent/Previous captured photos.
- **Product Details content** — `product-details.html`'s description
  paragraph and shipping details are best-effort transcriptions from
  a small screenshot; confirm exact wording against Figma. Only the
  "Skin type" tab has real content — "Good for", "Ingredients", and
  "How to use" tab panels are empty placeholders since that content
  wasn't visible in the shared screenshot. "Express Shipping" details
  are also placeholder since that section was collapsed in the
  source image. Similar products use generic placeholder names/images
  — only prices ($15.99, $19.99) came from the screenshot.
- **Reviews & Rating content** — reviewer names, star ratings, and
  review text in `reviews-rating.html` are best-effort transcriptions
  from a small screenshot and may not be word-for-word accurate.
  Confirm against Figma/real data before treating as final content.
  The star-rating breakdown bar widths are visual estimates, not
  exact percentages. Filter pills (Recent/Rating 4-5/Rating 0-3) and
  "Show more" don't yet filter/load real data — placeholders only.
- **Write a Review form** — fully functional (star selection, live
  character count, submit), but currently just shows a confirmation
  alert rather than sending data anywhere — wire up to your backend
  when ready.
- **Form submission** — Skin Profile form currently just opens the
  modal on submit; no data is sent anywhere yet. Wire up to your
  backend/state management where marked with `TODO` in `js/script.js`.

## Notes

- Built mobile-first at a 375px reference width.
- Form fields use native `<input type="radio">` / `<textarea>` under
  custom styling, so they stay keyboard- and screen-reader-accessible
  (important given the healthcare/accessibility focus of this
  portfolio project).
- No external dependencies or frameworks — plain HTML/CSS/JS.

