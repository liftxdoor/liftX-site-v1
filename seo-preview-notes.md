# Local SEO and trust preview

This branch is for visual and functional review before merging.

## Included

- Adds a real LIFTX repair-work section to the homepage using an existing project photo.
- Strengthens the homepage business entity from generic Organization markup to HomeAndConstructionBusiness markup.
- Restores the small house mark and “Built in-house by LIFTX.” footer signature.
- Replaces the loose phone and email text with compact, consistent contact controls.
- Applies the improved footer treatment across the website through the shared site script.
- Adds an accessible, swipeable Google review slideshow with arrows, dots, automatic rotation, pause behavior, and reduced-motion support.
- Adds a secure Cloudflare Worker endpoint so the Google API key is never exposed in browser code.
- Keeps the existing architecture, colors, typography, navigation, and primary page targeting unchanged.

## Google review connection

The slideshow is built, but live review text requires a Cloudflare secret named `GOOGLE_PLACES_API_KEY` connected to a Google Cloud project with Places API (New) enabled and billing active. Until that secret exists, the section safely falls back to a direct link to the LIFTX Google profile rather than displaying invented reviews.

Google currently returns a maximum of five reviews through the public Places API. Reviews are shown in Google relevance order with author attribution, dates, direct source links, and Google Maps attribution.

## Review checklist

- Check the repair section on mobile and desktop.
- Check the Google review section spacing and controls.
- Confirm the footer contact controls feel clean rather than crowded.
- Confirm the house mark and “Built in-house by LIFTX.” signature are visible.
- Test Call, email, review, repair-page, menu, and sticky mobile links.

No production merge should occur until the preview is approved.
