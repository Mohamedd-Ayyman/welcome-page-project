## Cozy Dusk theme refresh

Shift the app from a bright cream/acid editorial look to a warm, low‑contrast "dusk" palette while keeping the brutalist character (cards, offsets, stickers) — just softer, calmer, and easier on the eyes.

### 1. Palette (default to dark "dusk")

Make `[data-theme="dusk"]` the default on `<html>` (and update the existing inverted theme block).

```text
paper      #1b1a22   warm near-black
paper-2    #232230   raised surface
paper-3    #2c2a3a   highest surface
ink        #ece6d8   warm cream text
ink-soft   #c9c2b3
muted      #8a8497
muted-2    #aaa4b3

accent      #b8c98a   muted sage (replaces acid green)
accent-2    #e8b894   warm peach
riso-red    #d97a6c   dusty terracotta (was #e8553a)
riso-blue   #7d8ed1   periwinkle (was #2e4fe6)
riso-yellow #e6c878   honey
riso-pink   #d9a8b4   dusty rose
```

Lower global contrast: borders use `rgba(236,230,216,0.32)` instead of pure ink. Background dot pattern softened to `rgba(236,230,216,0.05)` and slightly larger spacing.

### 2. Brutalist edges — softened, not removed

In `src/index.css`:
- Border width `2px → 1.5px`, color → `--line-soft`.
- Shadow tokens shrink and gain a slight blur:
  ```text
  --sh-1: 2px 2px 0 0 rgba(0,0,0,0.45)
  --sh-2: 4px 4px 0 0 rgba(0,0,0,0.45)
  --sh-3: 6px 6px 12px -2px rgba(0,0,0,0.55)
  ```
- Radii bumped: `--r-md 6 → 10`, `--r-lg 8 → 14`.
- Hover lift reduced from `translate(-2,-2)` to `translate(-1,-1)`.

Same updates mirrored in `src/styles.css` (`--shadow-brutal`, `--radius`).

### 3. Typography

- Swap Fraunces (display serif) for **General Sans** (via Fontshare) as `--font-display`. Keep Inter for body, JetBrains Mono for eyebrows/meta.
- Default display weight `900 → 600`. `.headline` becomes `font-weight: 600; letter-spacing: -0.015em; line-height: 1.05`.
- Body line-height `1.5 → 1.6` for a more relaxed read.
- Drop `.dropcap` size from `3.4em → 2.6em` and use `--ink-soft`.

Update font import in `src/index.css` and the `--font-display` token in both `src/index.css` and `src/styles.css`.

### 4. Components touched (token‑driven, no structural changes)

Only style edits — no layout/redux/api changes:

- `src/components/ui-brutal/*` — pick up softened tokens automatically; no JSX changes needed.
- `src/components/Avatar.jsx`, `Logo.jsx` — switch hardcoded ink/acid to `--accent` / `--ink-soft`.
- `src/components/nav.jsx`, `RightRail.jsx`, `StoriesRail.jsx` — recheck any hardcoded colors and replace with tokens.
- `src/pages/feed/PostCard.jsx` — heart color uses `--color-like` (now dusty terracotta); soften like-pop scale from 1.4 → 1.2.
- `src/pages/AuthShell.jsx`, `login`, `signup` — gradient panel uses `--accent` → `--riso-pink` instead of acid → red.
- `src/pages/chat/index.jsx` — message bubbles use `--paper-2` / `--accent` tints.

### 5. Motion (keep expressive, just gentler timing)

In `src/index.css` keyframes/animation utilities:
- Default ease swapped to `cubic-bezier(0.22, 1, 0.36, 1)` (gentler out-quint).
- Durations: `220ms → 320ms` (fade), `360ms → 480ms` (stamp), bounce overshoot reduced (`1.1 → 1.04`).
- `heart-pop` scale `1.4 → 1.2`.
- `anim-float` amplitude `-8px → -5px`, period `3s → 4.5s`.
- Stagger step `50ms → 70ms`.

Reduced-motion block stays as-is.

### 6. Theme toggle

`Settings → Appearance` already toggles `data-theme`. Update it so the two options become **Dusk (default)** and **Daylight** (the old paper look, kept as opt-in via `[data-theme="paper"]`). Persist in `localStorage` under `julo:theme` (existing key if present).

### 7. QA checklist before finishing

- Visit `/`, `/login`, `/feed`, `/explore`, `/chat`, `/profile`, `/settings`, `/notifications` and confirm: no white/cream flashes, all text passes ~4.5:1 on dusk bg, hover lifts feel subtle, animations feel slower but still expressive.
- Verify reduced‑motion still disables animations.
- No hardcoded `#fff`, `bg-white`, `text-black`, `bg-acid` left in pages — sweep with `rg`.

### Out of scope

No changes to Redux slices, API calls, routes, sockets, or page structure. Pure visual + tokens + minor settings UI.
