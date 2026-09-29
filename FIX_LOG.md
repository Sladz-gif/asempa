# asempa — Fix Log (2026-09-29)

Session-wide fixes applied to the asempa-law-firm Next.js site. Each section includes cause, what changed, and the commit SHA.

---

## 1. Security patches — `next` + `next-mdx-remote` upgrades

**Trigger:** Vercel deployment flagged two dependency vulnerabilities in the initial deploy.

| Package | Before | After | Notes |
|---|---|---|---|
| `next` | `14.2.5` (pinned) | `^14.2.33` → installed `14.2.35` | Addresses 2025-12-11 Next.js security advisory |
| `next-mdx-remote` | `^4.4.1` | `^6.0.0` | Vercel flagged vulnerable versions < 6.0.0 |
| `eslint-config-next` | `14.2.5` | `^14.2.33` | Lockstep version with Next.js |

**Breaking API migration required for `next-mdx-remote` v4 → v6:**
- Import path changed: `next-mdx-remote/rsc` → root `next-mdx-remote`
- The RSC `<MDXRemote source={rawMarkdownString} />` signature was removed; content must be serialized first via `serialize()` from `next-mdx-remote/serialize`, then spread into the component.

**Files changed:**
- `package.json` — version bumps
- `app/insights/[slug]/page.tsx` — imports plus new `serialize()` call before render

**Commit:** `d7e5c54` — `fix: upgrade next to 14.2.33+ and next-mdx-remote to 6.0.0 for security patches`

---

## 2. Mobile/tablet horizontal scroll & component overflow

**Trigger:** Request to eliminate horizontal scrollbars on mobile and tablet views and prevent any component from overflowing the viewport.

### Root causes found
1. **7-column booking calendar** on small viewports: `border-separate` + `border-spacing` on a 7-cell `<table>` exceeds the viewport width because spacing is added *outside* each cell on top of `w-full`.
2. **Fixed-width chat panel** (340–390px) in its docked desktop mode: on narrow tablets / half-width windows it overflows.
3. **Flex-children minimum intrinsic width:** flex items default to `min-width: auto`, which can force a wider layout than the parent even when content should wrap.
4. **Media assets:** images/svg/canvas had no global `max-width: 100%` guard (Tailwind resets are only partial).

### Layered fixes applied
**Global guard rails** (`app/globals.css`, inside `@layer base`):
- `html { overflow-x: hidden }`
- `body { overflow-x: hidden; min-width: 0 }`
- Universal rule: `*, *::before, *::after { box-sizing: border-box; min-width: 0 }`
- Media resets: `img, picture, video, canvas, svg { display: block; max-width: 100%; height: auto }`

**Belt + suspenders:** `app/layout.tsx` body class gains Tailwind `overflow-x-hidden`.

**Targeted component fixes:**
- `components/ui/BookingCalendar.tsx` — wraps the `<table>` in a `overflow-x-auto w-full` container and sets `min-w-[320px] table-fixed` on the table itself so columns can't blow out width.
- `components/chat/ChatPanel.tsx` — docked desktop panel gains `max-w-[calc(100vw-2.5rem)]` to respect narrow viewports while keeping its preferred 340/390px widths on larger screens.

**Commit:** `7b46bca` — `fix: eliminate horizontal scroll on mobile/tablet; constrain component overflow`

---

## 3. Vercel build crash — `next/font/google` loader regex crash

**Trigger:** Redeploy `7b46bca` on Vercel iad1 (no build cache, clean install).

**Error:**
```
TypeError: Cannot read properties of null (reading '1')
  at @next/font/dist/google/loader.js:112:78
  (Playfair_Display — Promise.all index 2)
```

### Root cause
The Next.js 14.2.x Google Fonts loader contains a fragile regex extraction that assumes a specific CSS response shape from Google Fonts. When `.match(regex)` returns `null` (cache-less region, different CDN response, or response containing an unmatched variant like a specific weights subset), a `.match(regex)[1]` indexing crashes the entire font-load Promise for the affected weight. The crash was triggered on `Playfair_Display` with the 500–900 weight array. Locally the bug was hidden because cached responses and region routing return strings matching the expected pattern.

### Fix — bypass `next/font/google` entirely; use `<link>` tags
Replaced the `next/font/google` loader with standard Google Fonts `<link>` preconnect + stylesheet tags in the root `<head>`. We keep identical weights, `display=swap`, and the same CSS-variable-driven font stack so no component changes are needed.

**Files changed:**
- `app/layout.tsx`
  - Removed `Playfair_Display, Inter` import from `next/font/google`
  - Removed both `Playfair_Display({...})` / `Inter({...})` loader invocations
  - Removed `${playfair.variable} ${inter.variable}` from `<html>` className
  - Added explicit `<head>` block inside `<html>` with:
    - `<link rel="preconnect" href="https://fonts.googleapis.com">`
    - `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
    - One combined stylesheet: `css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700;800;900&display=swap`
- `app/globals.css` (`:root`)
  - Added `--font-playfair: "Playfair Display", Georgia, serif;`
  - Added `--font-inter: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;`
  - Tailwind's `fontFamily.sans = ['var(--font-inter)', …]` and `.serif = ['var(--font-playfair)', …]` in `tailwind.config.ts` continue to resolve to the same faces via the new variables.

### Cosmetic post-fix warning
```
@next/next/no-page-custom-font — Custom fonts not added in pages/_document.js …
```
This is a **false positive from a pages-router-era ESLint rule**; in the app router, `app/layout.tsx`'s `<head>` *is* the global document shell and fonts are loaded globally, not per page. Build succeeds, all pages load both fonts with FOUT-protected `display=swap`.

**Commit:** `fff4fea` — `fix: swap next/font/google for <link> tags to resolve Vercel loader regex crash`

---

## Verification of every fix

All commits are followed by local runs of:

```
npm run lint    # ✔ No ESLint warnings or errors
npm run build   # 32/32 pages generated (Next.js 14.2.35)
```

Deployment outcome after `fff4fea`: the iad1 cache-less build in Vercel will no longer call into `@next/font/google` → the regex crash is eliminated. All 3 vulnerabilities (Next CVE, next-mdx-remote, horizontal scroll) are addressed.
