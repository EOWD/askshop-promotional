---
name: Tapmerce
description: AI shopping for nutrition brands. A warm consumer-app surface where the assistant itself is the hero.
colors:
  stone: "#efeae4"
  stone-deep: "#e5ded5"
  card: "#fffdfa"
  line: "#e2dbd2"
  ink: "#1d1d1f"
  ink-2: "#55524e"
  ink-3: "#6b665f"
  action: "#ff5a1f"
  action-press: "#f04a10"
  action-soft: "#ffe4d8"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(3.1rem, 6vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontVariation: "\"opsz\" 96"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.022em"
    fontVariation: "\"opsz\" 96"
  headline-sm:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.5vw, 2.6rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.018em"
    fontVariation: "\"opsz\" 96"
  figure:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(4.5rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "\"tnum\" 1"
  title:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.375
  body-lead:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.25
  caption:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  icon: "12px"
  control: "14px"
  tile: "16px"
  bubble: "20px"
  inner: "22px"
  faq: "24px"
  container: "28px"
  band: "32px"
  pill: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "32px"
  card-sm: "24px"
  card-md: "48px"
  card-lg: "64px"
  section-sm: "96px"
  section-lg: "128px"
  container-max: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.action-press}"
    textColor: "{colors.ink}"
  button-round:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "48px"
  chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  chip-selected:
    backgroundColor: "{colors.action}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  segment-track:
    backgroundColor: "{colors.stone}"
    rounded: "{rounded.bubble}"
    padding: "6px"
  segment-selected:
    backgroundColor: "{colors.action}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
  input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "14px 16px"
  card-container:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.container}"
    padding: "48px"
  card-inner:
    backgroundColor: "{colors.stone}"
    rounded: "{rounded.inner}"
    padding: "20px"
  bubble-user:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.bubble}"
    padding: "10px 16px"
  bubble-assistant:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bubble}"
    padding: "12px 16px"
  dock:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.pill}"
    padding: "6px"
---

# Design System: Tapmerce

Scope: this system is the home-page world (`src/app/page.tsx`, `src/components/home/*`, the light variant of `Header`, `Footer`, `Logo`). Other routes (features, pricing, about, blog, compare, legal) still render a legacy dark indigo theme (`--color-background #06050e`, `--color-primary #6366f1`, `--color-secondary`, `--color-accent`, Geist on `body`). That theme is **legacy, pending redesign**, and is not part of this system. New surfaces build from the tokens above, not from the indigo set.

## Overview

**Creative North Star: "The Counter Conversation"**

The page behaves like the assistant it sells. A shopper at a warm, well-lit shop counter asks a real question and gets a straight answer with the right product in hand. So the ground is warm stone, surfaces are soft off-white cards that look like app UI rather than marketing panels, and the first thing on the page is a working chat widget, not a headline beside a screenshot.

Density is consumer-app, not SaaS-dashboard: large display headlines in Bricolage Grotesque, generous 19px lead copy in Figtree, big rounded containers holding smaller rounded app parts. Ink does almost all the work in three values. One saturated orange appears only where a finger or cursor can press. Depth comes from long, low, warm-brown shadows under cards and from a three.js helix of capsules, softgels, tablets, berries, leaves and almonds behind the hero.

Photography is editorial lifestyle at 35mm with natural light in warm rooms, and the app screens inside it belong to sample brands with their own muted colors, showing that the product is white-label.

**Key Characteristics:**
- Warm stone ground, off-white cards, ink text in three values
- One action orange (#ff5a1f) on pressable things only, always with ink text
- Nested radius language: 28px containers, 14 to 22px inner parts, full pills for chips and buttons
- Bricolage Grotesque display (opsz 96) over Figtree text; tabular digits for every price, count and day
- Motion is mostly quiet section reveals; the authored moments are the streaming assistant and the 3D nutrition helix

## Colors

A warm, low-chroma neutral world with exactly one saturated voice.

### Primary
- **Press Orange** (action): every pressable primary thing: Book a demo buttons (hero, dock, form, header), Add to cart, the selected question chip, the selected services tab and plan pill. Text on it is always ink, never white.
- **Pressed Orange** (action-press): hover and pressed state of Press Orange. Its 0.8 to 0.9 alpha also tints the orange button glow.
- **Orange Blush** (action-soft): text selection highlight inside the home world. Not a surface fill.

### Neutral
- **Warm Stone** (stone): page ground, the header bar (85% with backdrop blur), the inside of nested demo panels, assistant bubbles, segmented-control tracks, icon tiles, the composer field. Also the three.js fog color, so the helix dissolves into the page.
- **Deep Stone** (stone-deep): a second ground for the case-study device stage and the app-price column of the pricing card (at 60%).
- **Card Cream** (card): every card, chip, input and widget surface; also the text color on ink surfaces (user bubbles, dock, footer).
- **Hairline** (line): 1px dividers inside cards, chip and input borders, list dividers.
- **Ink** (ink): headings, primary text, user chat bubbles, the dock, the footer ground, device frames, unselected-but-strong selections (finder chips, check discs).
- **Ink Soft** (ink-2): lead and body copy, captions, secondary list text.
- **Ink Faint** (ink-3): meta lines (widget subtitle, product detail, source label, placeholders, decorative chip icons). Lowest text value allowed on stone or card.

### Named Rules
**The One Press Rule.** Press Orange marks only things that can be pressed (or a mock of one inside a demo screen). Never use it for headings, icons, decorative fills, borders or section backgrounds. The logo mark is the only non-interactive exception.

**The Ink-On-Orange Rule.** Text and icons on Press Orange are ink (#1d1d1f), never white. White on this orange fails contrast; ink passes.

**The Three Inks Rule.** Text uses ink, ink-2 or ink-3 only. Alpha variants of ink (ink/25, ink/30) are for underlines and hover borders, not for text.

## Typography

**Display Font:** Bricolage Grotesque (with system-ui), variable, set with `font-variation-settings: "opsz" 96`
**Body Font:** Figtree (with system-ui)

**Character:** Bricolage is chunky, slightly quirky and confident at large sizes with tight negative tracking; Figtree is round, friendly and plain, which keeps long answers and FAQ copy readable. Together they read as a consumer app, not enterprise software.

### Hierarchy
- **Display** (800, 3.1rem to 5.25rem, 0.95): the single hero headline only.
- **Headline** (700, 2.5rem to 3.75rem, 1.04): every section h2, sentence case, `text-wrap: balance`.
- **Headline Small** (700, 1.875rem to 2.6rem, 1.06): display-face h3 inside large components (service panels, lifestyle stories, the 2rem "Week 1" step labels).
- **Figure** (700, 4.5rem to 6rem, 1.0, tabular): prices and result numbers set in the display face. Per-plan price swaps digit by digit in fixed tabular slots.
- **Title** (Figtree 600, 19px): card and list-item headings (guardrails, steps, FAQ questions).
- **Body Lead** (Figtree 400, 19px, 1.625): the paragraph under each section headline, capped around 30 to 40rem.
- **Body** (Figtree 400, 16px, 1.625): card body, list items, FAQ answers.
- **Label** (Figtree 500 to 600, 14px): chips, tabs, form labels, small buttons. Sentence case, no tracking, never uppercase.
- **Caption** (Figtree 400, 12 to 13px): sample-data disclaimers, source lines, guarantee conditions.

### Named Rules
**The Tabular Rule.** Every price, cart count, conversation count, step number, clock and result uses tabular digits (`tabular-nums`).

**The No-Kicker Rule.** No eyebrow or kicker labels above headlines. A section starts with its headline.

## Layout

Single column of full-width sections on stone, each centered in a 1280px container (`max-w-7xl`) with side gutters of 16px, 24px from 640px, and 32px from 1024px. Sections are separated by bottom padding of 96px (128px from 640px); the page never uses divider rules between sections.

Two-column splits appear from 1024px only, as asymmetric fractional grids (1.05fr/1fr, 1fr/1.1fr, 1.2fr/1fr) with 48 to 80px gaps; below that everything stacks, with image-first or text-first order chosen per section. Big cards pad 24px on phones, 48px from 640px and 64px from 1024px.

The hero is centered: headline, one-line subtext, one action, then a 768px-wide assistant widget. Lifestyle stories run as a full-bleed horizontal snap carousel whose left padding aligns with the container edge. A fixed bottom dock appears once the hero action scrolls away and hides when the booking form is on screen; it collapses to icons below 1024px and drops two items below 640px. Everything must fit a 375px phone without horizontal page scroll (the page clips x overflow).

## Elevation & Depth

Hybrid: tonal layering does most of the work (card on stone, stone panel inside card, card row inside stone panel), and soft, long, warm-brown shadows lift only the top-level containers and devices. Shadows are offset far down with a large negative spread so they read as a floor shadow, not a glow. Hard offset shadows are not used.

### Shadow Vocabulary
- **Card floor** (`0 30px 60px -45px rgba(60,40,20,0.5)`): the large containers (services, safety, steps, pricing, demo band, kitchen photo).
- **Widget lift** (`0 40px 80px -40px rgba(60,40,20,0.45), 0 2px 6px rgba(60,40,20,0.06)`): the hero assistant widget, which also has two stacked card ghosts behind it at 60% and 80% card.
- **Chip float** (`0 8px 20px -16px rgba(60,40,20,0.6)`): marquee question chips.
- **Action glow** (`0 16px 30px -14px rgba(240,74,16,0.9)`): large Book a demo buttons and the selected services tab.
- **Device drop** (`0 40px 60px -30px rgba(29,29,31,0.7)`): phone frames on the case study and lifestyle stories.
- **Dock** (`0 20px 40px -12px rgba(29,29,31,0.55)`): the floating bottom nav.

### Named Rules
**The Warm Shadow Rule.** Shadows are tinted warm brown (rgba 60,40,20) on stone, or ink on devices. Never neutral grey or black glows.

## Shapes

Soft, nested, app-like. Radii shrink as surfaces nest: a 28px container holds 22px panels, which hold 14 to 18px rows and bubbles, which hold 12px icon tiles. Full-bleed feature bands (lifestyle stories, the demo band) go up to 32px; FAQ cards sit at 24px. Everything a user taps or that reads as a tag is a full pill (buttons, chips, the dock, segmented plan picker, round carousel arrows); the services segmented control is the exception at 20px track / 16px segment. Chat bubbles flatten one corner toward the speaker (6px on the speaker side). Phone frames use a 6 to 7px ink border at 26 to 34px radius. Borders are 1px hairlines in `line`; selected product rows use a 2px ink ring.

## Components

### Buttons
Confident and soft.
- **Shape:** full pill (9999px).
- **Primary:** Press Orange with ink text, semibold, 16px 32px at 17px for hero and form, 10px 20px at 14px in the header and dock. Carries a trailing arrow that nudges 2px right on hover.
- **Hover / Press:** background to Pressed Orange over 200ms; press scales to 0.97 to 0.98. Focus is a 2px ink outline at 3px offset (home world default).
- **Text link:** ink text with a 2px ink/25 underline at 6px offset that turns solid ink on hover. Used for secondary actions beside a primary button.
- **Round icon button:** 48px card-colored circle with a small shadow (carousel arrows), white on hover.

### Chips
- **Style:** card fill, 1px hairline border, ink label at 14px, full pill.
- **State:** selected chips fill Press Orange (they are pressable questions). Filter-style selections inside demo screens fill ink with card text. Marquee chips are non-interactive, carry a chat icon in ink-3 and a chip-float shadow, and pause on hover.

### Cards / Containers
- **Corner Style:** 28px for top-level containers, 22px for nested stone panels, 24px for FAQ cards.
- **Background:** card on stone; nested panels in stone; product rows in card.
- **Shadow Strategy:** card floor on top-level containers only (see Elevation).
- **Border:** none on containers; hairlines inside as dividers.
- **Internal Padding:** 24 / 48 / 64px by breakpoint.

### Inputs / Fields
- **Style:** card fill, 1px hairline border, 14px radius, 14px by 16px padding, 16px text, ink-3 placeholder, label above in 14px medium ink.
- **Focus:** border shifts to ink; no glow.
- **Error:** a short sentence in a deep red-orange below the field with `role="alert"`.

### Navigation
- **Header (home variant):** sticky, stone at 85% with backdrop blur and a hairline bottom border; an ink announcement strip on top; logo left, 14px ink-2 links that go ink on hover, Book a demo pill right. Mobile collapses to a menu sheet with a ghost Contact pill and a primary pill.
- **Section dock:** fixed bottom pill on ink at 95% with blur, 44px items, current section as a card-colored pill with ink text, others card/70; ends in a Press Orange Book a demo.
- **Footer:** ink ground, card-colored logo, white-alpha link columns.

### Assistant Widget (signature)
The hero and the thesis. A card at 28px radius with a header (ink tile with sparkle, title, "Demo store with sample products" meta, cart tile with an orange count badge that springs on change), a row of question chips, a conversation area and a composer pill. Tapping a chip shows the user bubble in ink, a three-dot typing indicator for 900ms, then the answer streams word by word (35ms stagger, 250ms blur-to-sharp per word), followed by product cards with tabular prices and Add to cart pills, an optional safety note bubble, and a "Source:" caption. The first answer plays itself when the widget scrolls into view. Answering and adding to cart fire a pulse event that scatters the 3D helix.

### Nutrition Helix (signature)
A three.js double helix of two-tone capsules (terracotta, cream, ink halves), amber softgels, pale tablets, berries, leaves and almonds in clearcoat physical materials, lit warm and fogged into stone so it fades at the edges. Strands are sized to frame, not cross, the content; a stone radial wash sits between the helix and the hero copy. It drifts with the pointer, rises with scroll, and bursts on the assistant's pulse. It pauses when offscreen or the tab is hidden, renders one static frame under reduced motion, and falls back to the plain stone ground if WebGL fails.

### Lifestyle Story (signature)
A 32px-radius full-bleed photo card with an ink gradient (bottom-up on phones, left-to-right on desktop), a display-face white title, white/85 body, and a sample-brand phone screen. Each sample brand uses its own muted color for its wordmark, hero tile, active tab icon and pill buttons: FORGE navy (#1f3b5c), little oat sage (#5f8a6b), Verra plum (#8a4a68), Good Field olive (#6b7a2e), on an app canvas of #f6f5f2. These colors stay inside the phone screens; they prove white-label and are not part of the Tapmerce palette. A caption under the carousel labels them as sample brands.

### Photography
Generated editorial lifestyle stills (`public/home/*.webp`, each with a `.webp.json` prompt sidecar recording prompt, model and date). Style: 35mm, natural window or daylight, warm rooms, shallow depth of field, candid with real skin texture, palette of warm stone, off-white, terracotta and charcoal with one accent (burnt orange, sage, blueberry). Products are plain and unbranded; no text, logos or brand names anywhere. Still lifes are overhead on warm stone with generous empty space for copy.

## Do's and Don'ts

### Do:
- **Do** use Press Orange (#ff5a1f) only on pressable things, with ink text on it.
- **Do** nest radii: 28px container, 14 to 22px inner surfaces, full pills for chips and buttons.
- **Do** set every price, count and day in tabular digits.
- **Do** start sections with a sentence-case headline in Bricolage Grotesque, followed by a 19px Figtree lead in ink-2.
- **Do** keep motion to section-level Reveal (fade and 24px lift, spring, once) plus the authored moments: the streaming assistant and the helix. Respect reduced motion everywhere.
- **Do** pause any continuous animation offscreen and when the tab is hidden.
- **Do** label demo data and sample brands as samples, in a caption near them.
- **Do** keep lifestyle photography unbranded, warm, natural-light and candid, and save a prompt sidecar for every generated raster.

### Don't:
- **Don't** use orange for headings, icons, borders, backgrounds or decoration.
- **Don't** put white text on Press Orange.
- **Don't** add eyebrow or kicker labels above headlines.
- **Don't** use the legacy indigo, cyan or amber tokens or Geist on home-world surfaces.
- **Don't** use neutral grey or black glow shadows on stone; use the warm floor shadows.
- **Don't** use sample-brand colors outside the phone screens they belong to.
- **Don't** show real third-party logos or text in generated imagery.
