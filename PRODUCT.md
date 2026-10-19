# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Founders, ecommerce leads and growth managers at nutrition brands that sell online, on Shopify or any other ecommerce platform (founder: "not only Shopify, we support all", 2026-10-19): supplements and vitamins, infant formula, sports nutrition and healthy food. The positioning is nutrition broadly, not supplements only (founder, 2026-10-19). They are evaluating whether AI shopping and a branded app will lift conversion and repeat orders, usually while comparing chatbot vendors and Shopify app builders. Their shoppers ask detailed questions before buying (ingredients, diet, allergens, dosage, age or stage, shipping) and reorder every few weeks.

## Product Purpose

Tapmerce (tapmerce.com) sells three services to Shopify brands, with nutrition brands as the focus:

1. An AI shopping assistant on the brand's website. Sold standalone; this is the entry product.
2. A branded native iOS and Android app with the same assistant inside, published under the brand's own store accounts. The upgrade for repeat buyers.
3. A listing in the Tapmerce AI marketplace app, with Universal Commerce Protocol (UCP) support in development.

Success for the marketing site: a qualified brand books a demo.

## Positioning

The only offer that pairs a nutrition-aware AI shopping assistant (grounded in the brand's own catalog, metafields and policies, staying within the brand's approved claims) with a branded native app and AI marketplace reach. App builders do not have a real assistant; chatbot vendors do not build apps.

## Operating Context

- Assistant answers from the Shopify catalog, product metafields (ingredients, allergens), FAQs, articles and store policies. Recommends only products the store sells, at live prices and stock.
- Shows product cards and adds to the shopper's real Shopify cart, including Subscribe & Save selling plans.
- Order status questions answered from the customer's real orders.
- Hand-off to the brand's human support team inside the same chat.
- App: Subscribe & Save, buy again, order tracking, shipping push notifications, app-only automatic discount (Shopify Function), native checkout with Apple Pay, Google Pay and Shop Pay.
- App launch guarantee: submitted to both stores within 21 days of kickoff or the build fee is refunded (conditions in src/lib/site.ts).
- Pricing (founder decisions, 2026-10-19; derived in src/lib/pricing.ts): servers cost at least €100 per merchant per month, so AI plans = (AI usage + €100 servers) + 45-50% margin: Starter €239/mo (250 conversations), Growth €439 (1,000), Scale €1,190 (4,000), €0.25 per extra conversation. Branded app = €4,990 one-time build + €49/mo app fee. Marketplace listing included; annual = 2 months free on monthly fees; 0% commission; guarantee: live in 3 weeks or build fee back. Never name the AI provider or model on the site.

## Capabilities and Constraints

- Branding (founder, 2026-10-19): every solution ships in the merchant's brand identity (logo, colors, fonts, tone of voice). Website assistant and app are fully white-label; the marketplace is Tapmerce's app, where the merchant gets a branded store page.
- The app includes the AI shopping assistant in its own "Ask AI" tab (live in the Organic's Best app).

- Health claims (confirmed by the founder, 2026-10-19): the assistant stays within the brand's approved product wording, does not claim to treat, cure or prevent conditions, and refers medical questions (pregnancy, medication, children's health, symptoms) to a doctor or pharmacist.
- UCP support is in development; never present it as shipped.
- Not built, never claim: abandoned-cart push, accelerated Apple Pay buttons in the app, per-store model fine-tuning, AR try-on, built-in loyalty.
- Site stack: Next.js 16 (App Router), Tailwind v4, framer-motion, lucide-react. Other pages (features, pricing, about, blog, compare, legal) share the header and footer.

## Brand Commitments

- Name: Tapmerce. Founder-led; demo requests reach the founder directly.
- Voice: plain, specific, no hype words; sentence-case headings.
- SEO targets (Ahrefs, US, 2026-10-19): "ai shopping assistant" 1,600/mo, "ai chatbot for ecommerce" 1,200/mo KD 8, "shopify chatbot" 500/mo KD 0, "shopify ai chatbot" 500/mo, "shopify mobile app builder" 350/mo KD 8, "ai shopping agent" 200/mo. Supplement-specific terms have near-zero volume; keep them in copy for relevance, not as heading targets.

## Evidence on Hand

- Organic's Best (organicsbestshop.com): live customer, European organic baby formula retailer. Runs the Tapmerce AI assistant on its website and in its own app on the App Store and Google Play. Logo and four real app screenshots in public/customers/organics-best/.
- Metrics: the founder will supply real Organic's Best results. Until then, metric slots are marked as pending and no numbers are invented.
- No testimonials, quotes, other customers or press exist yet. Do not fabricate any.

## Product Principles

1. Answers come from the brand's own data; never invent a product, a fact or a claim.
2. Safety is a selling point for this category: approved claims and careful medical hand-offs are shown, not hidden.
3. Website first, app second: the assistant is the entry; the app earns repeat orders.
4. Show the assistant working, with realistic shopper questions from the category.

## Accessibility & Inclusion

WCAG AA contrast for all text and controls; respect prefers-reduced-motion; keyboard focus visible on every control.
