# Asempa Law — Law Firm Website

> Production site for **Asempa, Bediako & CO** (short: **Asempa Law**), an Accra-Ghana based law firm specialising in corporate & commercial, dispute resolution, property & real estate, family & succession, employment, and regulatory compliance.

- **Public URL:** https://asempabediako.com
- **Repo:** https://github.com/Sladz-gif/asempa
- **Deploy target:** Vercel (auto-deploy on `main`)
- **Framework:** Next.js 14.2 (App Router) · React 18.3 · TypeScript 5.4
- **Styling:** Tailwind CSS 3.4 + `@tailwindcss/typography` · CSS variables for brand design tokens
- **Content:** MDX (insights/blog posts) + Zod-validated YAML front-matter stored in `/content/**`
- **Forms / state:** `react-hook-form` + `zod` resolvers · `zustand` for global UI (modals, chat)
- **Icons:** `lucide-react`

---

## Quick start

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint      # next lint — ESLint + types
npm run build     # next build — production build
npm start         # next start  — serve production build
```

### Environment variables
No secrets required for the public site (bookings submit to in-memory mock store + local-storage). All firm metadata is driven from `lib/config.ts`.

---

## Brand & design system

Colour palette, typography, and spacing are driven by CSS custom properties in `app/globals.css` and exposed to Tailwind via `tailwind.config.ts`.

### Colour tokens (`:root`, `globals.css`)
| Token        | Hex       | Usage |
|---           |---        |---    |
| `--bg-black`        | `#141110` | Page backgrounds for dark hero/stats bands |
| `--bg-black-800`    | `#1C1817` | Darker surface within dark bands |
| `--bg-surface`      | `#FAF6EE` | Default page background (warm paper) |
| `--bg-paper`        | `#FFFFFF` | Cards, form panels |
| `--gold`            | `#C9A45C` | **Primary accent** — CTAs, links, dividers, focus ring |
| `--gold-hl`         | `#EAC786` | Hover / highlight |
| `--gold-sh`         | `#B59654` | Shadow / pressed |
| `--text-warm`       | `#1C1817` | Default body copy |
| `--text-muted`      | `#6B6158` | Captions, supporting text |
| `--text-black`      | `#141110` | Strong headings |
| `--border-gold`     | `rgba(201,164,92,0.35)` | Default border |
| `--border-gold-strong` | `#C9A45C` | Active/divider borders |

### Typography
Fonts are loaded via plain Google Fonts `<link>` preconnect + stylesheet tags in the root `app/layout.tsx` `<head>` block with `display=swap`.

| Stack | Families | Weights |
|---|---|---|
| `--font-inter` (body, UI) | `Inter`, then system-ui fallbacks | 300 / 400 / 500 / 600 / 700 |
| `--font-playfair` (display headings) | `"Playfair Display"`, then `Georgia, serif` | 500 / 600 / 700 / 800 / 900 |

Utility classes `font-sans` and `font-serif` are aliased in `tailwind.config.ts` to these CSS variables.

---

## Project structure

```
asempa/
├── app/                      # Next.js App Router (route segments)
│   ├── layout.tsx            # Root shell: <head>/fonts, Header/Footer, modals, JSON-LD
│   ├── page.tsx              # Home landing
│   ├── globals.css           # Tailwind entry + design-token :root
│   ├── robots.ts             # robots.txt (SEO)
│   ├── sitemap.ts            # sitemap.xml (SEO)
│   │
│   ├── about/                # About the firm
│   ├── accessibility/        # Accessibility statement
│   ├── attorneys/            # Attorneys index + [slug] detail (SSG from /content)
│   ├── book/                 # Consultation booking flow
│   ├── contact/              # Contact form + office info
│   ├── cookie-notice/        # Cookie policy
│   ├── disclaimer/           # Legal disclaimer
│   ├── faq/                  # FAQ
│   ├── insights/             # Blog index + MDX-powered [slug] detail (SSR dynamic)
│   ├── practice-areas/       # Practice area index + [slug] detail (SSG from /content)
│   ├── privacy/              # Privacy policy
│   ├── results/              # Case results / wins
│   ├── terms/                # Terms of use
│   └── testimonials/         # Full testimonials archive
│
├── components/
│   ├── layout/               # Header, Footer, StickyBottomBar, CookieBanner
│   ├── sections/             # Home + page section blocks (HomeHero, CTABand, …)
│   ├── ui/                   # Reusable primitives (BookingCalendar, Accordion, Cards, …)
│   ├── chat/                 # ChatFloatingButton, ChatPanel / ChatMobileSheet
│   ├── booking/              # BookingModal + BookingModalWrapper, progress, steps, confirmation
│   ├── forms/                # Standalone forms (ContactForm, BookingForm)
│   └── seo/                  # JSON-LD schema components (LegalServiceJSONLD, etc.)
│
├── content/                  # File-based content (markdown + front-matter)
│   ├── attorneys/            # *.md  →  /attorneys/[slug]
│   ├── insights/             # *.mdx →  /insights/[slug]
│   └── practice-areas/       # *.md  →  /practice-areas/[slug]
│
├── lib/
│   ├── config.ts             # Single source of truth: FIRM = name/address/phones/hours/fees/site-url
│   ├── content.ts            # MD/markdown front-matter loaders via gray-matter
│   ├── mdx.ts                # MDX serialization helpers (paired with next-mdx-remote)
│   ├── services/
│   │   ├── booking.ts        # Booking availability, time-slots, validation (mock store)
│   │   └── payments.ts       # Payment helpers (feature-flagged: FIRM.featureFlags.paymentsEnabled)
│   └── utils.ts              # `cn()` — clsx + tailwind-merge
│
├── types.ts                  # Shared domain types (Attorney, Insight, PracticeArea, Office, Booking, …)
├── public/                   # Static assets: og-default.png, favicons, placeholders
├── tailwind.config.ts        # Tailwind theme, design-token bindings, content globs
├── postcss.config.mjs
├── next.config.mjs
├── tsconfig.json
├── eslint.config.mjs
├── package.json
└── README.md
```

---

## Routing overview

Build output (Next.js route types):

```
○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML with generateStaticParams
ƒ  (Dynamic)  server-rendered on demand
```

| Route | Type | Purpose |
|---|---|---|
| `/` | ○ Static | Marketing home (Hero, StatBar, Practice Areas, Attorneys, Results, Testimonials, CTA, FAQ, contact CTA) |
| `/about` | ○ Static | Firm story, values, team highlights |
| `/accessibility` | ○ Static | Accessibility statement |
| `/attorneys` | ○ Static | Attorney directory grid |
| `/attorneys/[slug]` | ● SSG | Individual attorney profile (6 slugs) |
| `/book` | ○ Static | Multi-step consultation booking flow |
| `/contact` | ○ Static | Contact form + office details + map placeholder |
| `/cookie-notice` `/disclaimer` `/privacy` `/terms` | ○ Static | Legal pages |
| `/faq` | ○ Static | FAQ accordion |
| `/insights` | ○ Static | Insights / blog landing + filters |
| `/insights/[slug]` | ƒ Dynamic | MDX article rendered via `next-mdx-remote` |
| `/practice-areas` | ○ Static | Practice areas grid |
| `/practice-areas/[slug]` | ● SSG | Practice area detail (6 slugs) |
| `/results` | ○ Static | Case results page |
| `/testimonials` | ○ Static | Full testimonials archive |
| `/robots.txt` | ○ Static | Generated in `app/robots.ts` |
| `/sitemap.xml` | ○ Static | Generated in `app/sitemap.ts` |

---

## Content authoring

Content is stored as **plain markdown** (attorneys, practice-areas) or **MDX** (insights) with YAML front-matter validated at read-time by Zod schemas in `lib/content.ts`.

### `/content/attorneys/<slug>.md`

```yaml
---
slug: founding-partner            # URL segment
name: "Kwame Bediako, Esq."
role: "Founding & Managing Partner"
barNumber: "GH-LC-0123"
admittedYear: 2008
email: "kwame@asempabediako.com"
phone: "+233 20 123 4567"
headshot: "/assets/attorneys/kwame.svg"
practiceAreas: ["corporate-commercial", "dispute-resolution"]
expertise:
  - Corporate governance
  - Cross-border M&A
bio: >
  Two-paragraph bio in markdown...
education:
  - { school: "Ghana School of Law", degree: "BL", year: 2008 }
admissions:
  - "Supreme Court of Ghana"
languages: ["English", "Twi"]
featured: true
order: 1
---
```

### `/content/practice-areas/<slug>.md`

Similar shape (see `PRACTICE_AREA_SCHEMA` in `lib/content.ts`). Used for both the index cards and the detail pages.

### `/content/insights/<slug>.mdx`

Zod-schema for metadata (`INSIGHT_SCHEMA`) + MDX body. Rendered at runtime on the server (`/insights/[slug]` is marked `ƒ Dynamic`) using `next-mdx-remote` v6 — see `serialize()` + `MDXRemote {...}` in the route. No client MDX runtime is shipped.

---

## Booking flow

> **Current backend:** In-memory mock store (`lib/services/booking.ts`) + persisted per-slot booking state. Swap the service layer to wire to a real calendar / CRM / payment provider.

### UI entry points
- Sticky **"Book a Consultation →"** CTA button in the header
- `components/layout/StickyBottomBar.tsx` — docked mobile book/contact bar
- `components/sections/CTABand.tsx` — home-page band
- `/book` — standalone page
- `components/booking/BookingModalWrapper.tsx` — client-side wrapper rendering the modal from any trigger

### Steps (`components/booking/BookingProgressIndicator.tsx`)
1. **Attorney & practice area** selection (optional attorney, optional area)
2. **Date + time-slot** picker — custom `BookingCalendar.tsx` with keyboard nav, min-date guard, disabled past-dates, public-holiday/staff-unavailable helpers from `lib/services/booking.ts`
3. **Client info** — first/last name, email, phone, company (opt)
4. **Matter summary** + files (opt)
5. **Review & confirm** — optionally pay consultation fee (`FIRM.consultationFeeGHS` = GHS 1,500 default; payments feature-flagged off for launch)
6. **Confirmation** with booking ID, Google/Apple Calendar download links, WhatsApp share

### Payment
- Feature flag: `FIRM.featureFlags.paymentsEnabled` — gate any payment UI
- Helper stubs live in `lib/services/payments.ts`

---

## Contact form

`components/forms/ContactForm.tsx` — `react-hook-form` + `zod` resolver:

- Name, email, phone, subject, message
- Consent tick (required)
- Honeypot anti-spam field (`confirmEmail`)
- Submit → currently logs + in-memory `SUBMISSIONS` store; swap `handleContactSubmit()` in `lib/services/contact.ts` (create file) or wire to SMTP/Resend.

---

## Chat / FAQ assistant

`components/chat/ChatPanel.tsx` — lightweight client-side knowledge-base chat. Two entry points:
- Floating bubble (all breakpoints) → `ChatPanel` dialog
- `ChatMobileSheet` → bottom sheet on mobile / tablet

> Backend: **deterministic FAQ matcher + keyword routing** (no LLM). Intentions are defined in `lib/chat/intents.ts` (patterns → reply, buttons, routing to practice-area slugs / booking / contact). To upgrade to a real LLM assistant, keep the same UI component contract and replace the `getReply()` call in `ChatPanel.tsx`.

---

## SEO & structured data

- `app/layout.tsx` `metadata` export — titles, OG: image + locale (`en_GH`), canonical, robots
- `app/sitemap.ts` + `app/robots.ts` — dynamic sitemap covering all SSG attorney & practice-area slugs, permissive robots.txt
- `components/seo/JSONLD.tsx` → `<script type="application/ld+json">` for `LegalService` firm schema with address, hours, attorney list, accepted currencies, languages, areaServed (Ghana)

---

## Accessibility (house rules)

- Skip-link in root layout targets `#main-content`
- Focus ring uses gold design token (`--focus-ring: 3px solid #C9A45C`)
- All `BookingCalendar`, `AccordionItem`, modal dialogs implement appropriate ARIA (`role=grid`, `aria-selected`, `aria-modal`, `aria-labelledby`, focus trap via `<dialog>`)
- `prefers-reduced-motion` disables decorative animations and smooth scroll in `globals.css`
- Colour contrast (gold-on-dark, dark-on-surface) tested to WCAG AA thresholds — see `/accessibility` page for the public statement.

---

## Deployment

### Vercel (current)
- Auto-deploy from `main`; `next build` output produces 32 routes, serverless function for dynamic `/insights/[slug]`
- `next/font/google` is **intentionally unused** (fonts loaded via plain `<link>` tags in the root layout) — see `FIX_LOG.md` §3 for rationale
- Remote image hosts whitelisted in `next.config.mjs` (`coresg-normal.trae.ai`, `images.unsplash.com`) served as AVIF/WebP

### Before going live checklist
1. Populate placeholders in `lib/config.ts`: real street address, phone/WhatsApp, `FIRM.offices[0].mapEmbedUrl`, LinkedIn/Twitter URLs
2. Replace `/public/og-default.png` with final 1200×630 OG image
3. Swap the mock booking service for a real calendar + CRM (see `lib/services/booking.ts` API surface)
4. Connect email/SMTP for Contact & Booking notifications (currently in-memory + console.log)
5. If charging fees: flip `FIRM.featureFlags.paymentsEnabled = true` and fill in `lib/services/payments.ts` (Stripe, Paystack, Hubtel, etc.)
6. Validate Google Fonts in target regions (fonts.gstatic.com) — preconnect tags already present
7. Run `npm run build` + `npm run lint` — all 32 routes build with no errors

---

## License / ownership

© Asempa, Bediako & CO. All rights reserved. Internal project; proprietary.
