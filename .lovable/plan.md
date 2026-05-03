## Landing Page Plan

A clean, minimal one-page landing for a SaaS product. Single route (`/`) with three focused sections plus a slim header and footer.

### Sections

**Header**
- Small wordmark/logo on the left
- Right side: "Sign in" link + primary "Get started" button
- Sticky, transparent with subtle border on scroll

**Hero**
- Eyebrow tag (e.g. "New — v1.0 is here")
- Large headline (2 lines max), short supporting paragraph
- Two buttons: primary "Get started free", secondary "See how it works"
- Subtle product mockup placeholder card below (rounded, soft shadow)

**Features**
- Section heading + short intro
- 3-column grid (stacks on mobile) of feature cards
- Each card: small icon (lucide-react), short title, 1–2 sentence description
- Examples: Fast setup · Built for teams · Privacy-first

**CTA**
- Centered card on muted background
- Headline ("Ready to get started?"), short line, primary button + secondary text link

**Footer**
- Wordmark, copyright, minimal links (Privacy, Terms, Contact)

### Design

- Clean & minimal: generous whitespace, neutral palette using existing design tokens (`background`, `foreground`, `muted`, `primary`)
- Typography: large, tight-tracked headlines; comfortable body line-height
- Subtle details only: thin borders, soft shadows, small rounded radii
- Fully responsive (mobile-first)
- Uses existing shadcn `Button`, `Card` components and `lucide-react` icons

### Technical notes

- Replace placeholder content in `src/routes/index.tsx` with the new landing page
- Add proper `head()` metadata (title, description, og tags) on the index route
- Copy is generic SaaS placeholder text you can edit afterward
- No new routes, no backend, no auth wired up — buttons are visual only
