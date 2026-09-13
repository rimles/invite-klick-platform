# Invite Klick 2.0 — First Milestone

A premium digital invitation & event-experience platform. This is the first
functional-visual-prototype milestone: public marketing site, creator
dashboard, invitation design editor, and the guest RSVP / QR experience —
built with realistic mock data and a real component/route architecture.

## Running the real project

This source tree is a standard Vite + React + TypeScript + Tailwind app.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

> Requires npm registry access (this sandbox this was authored in has none,
> which is why a separate zero-bundler preview build exists — see below).

## Project structure

```
src/
  types/            Centralized domain models (Event, Guest, RSVP, Table, …)
  theme/tokens.ts    Platform colors (System A) + curated event palettes (System B)
  data/mockData.ts   Centralized realistic mock data (events, guests, templates, music)
  lib/router.tsx     Tiny dependency-free hash router (Link, useNavigate, RouteSwitch)
  lib/store.tsx      App-wide data store (React context) — invitations, guests, RSVPs
  components/
    ui/              Design-system primitives (Button, Card, Modal, RSVPForm, QRPassCard, …)
    icons/           Inline SVG icon set (no external icon package)
    marketing/       Public site nav + footer
    creator/          Creator dashboard shell (Sidebar, Topbar)
    guest/           Guest-experience bottom nav / topbar
  pages/
    marketing/       Homepage, Features, Templates, Pricing
    dashboard/       Creator Dashboard, My Invitations, invitation sub-pages,
                      wizard/ (5-step Create Invitation flow), templates,
                      media, guests, music, QR, seating, settings
    guest/           Guest invitation, RSVP, schedule, gallery, QR pass, guest dashboard
  App.tsx            Route table
  main.tsx           Vite entry point
```

## Design system

Two separate visual systems, per spec:

- **System A — Platform identity** (`src/theme/tokens.ts` → `platform`): the
  stable Invite Klick brand (burgundy, ivory, cream, charcoal). Used for the
  marketing site and the entire creator dashboard chrome. Never recolored.
- **System B — Event identity** (`curatedThemes` in the same file): each
  invitation carries its own `EventTheme` (primary/secondary/accent/
  background/surface/text/muted). Applied only to the guest-facing
  invitation, RSVP, schedule, gallery and QR pass via `themeToCssVars()`.
  Six curated palettes ship today (Romantic, Garden, Royal, Modern, Minimal,
  Vibrant); "Custom" and "From Photo" are stubbed as Coming Soon in the
  Design Editor's Colors panel.

## What's real vs. simulated

Real, working interactions:
- Full navigation across all three experiences (see routes below)
- Create Invitation wizard (Occasion → Details → Design → Guests → Publish)
  actually creates a new invitation in the in-memory store and immediately
  shows up in My Invitations / Dashboard
- Design Editor: template + palette selection live-updates the preview and
  persists to the invitation
- Guest management: add / remove guests, updates guest counts and stats
- RSVP form: full flow with guest count, meal preference, message, success state
- QR check-in simulation: "Simulate Scan" marks a guest checked-in and blocks
  duplicate check-in
- Guest dashboard tabs (Upcoming / Past / Saved), Add to Calendar toast

Explicitly simulated / stubbed (marked "Coming Soon" in the UI per the brief
rather than faked as fully functional):
- Real QR camera scanning (button simulates a scan instead)
- Bulk guest CSV upload
- Custom color picker / "From Photo" palette extraction
- Visual drag-and-drop seating (table cards work; no floor-plan canvas yet)
- Authentication, payments, email delivery, real-time photo upload — all use
  mock/local state as instructed for this milestone

## The in-conversation preview build

Because this sandbox has no npm registry access, `scripts/build-preview.js`
transpiles every file in `scripts/manifest.js` (TypeScript + JSX →
`React.createElement` calls via the TypeScript compiler API), strips
import/export syntax, and concatenates everything into one `preview/app.js`
that runs against React 18 loaded from a CDN — no bundler needed. This is
what powers the published, clickable Artifact. `scripts/smoke-test.js` is a
minimal fake-React tree-walker that renders every route once to catch
reference errors before publishing.

None of this preview machinery is needed once you run the real project with
Vite — it's scaffolding specific to producing the zero-build in-browser demo.

## Routes

See the spec's route list in full; all of the following are wired and
navigable: `/`, `/features`, `/templates`, `/pricing`, `/dashboard`,
`/dashboard/invitations`, `/dashboard/invitations/new`,
`/dashboard/invitations/:id`, `/:id/edit`, `/:id/guests`, `/:id/seating`,
`/:id/qr`, `/:id/analytics`, `/dashboard/templates`, `/dashboard/media`,
`/dashboard/guests`, `/dashboard/music`, `/dashboard/qr`,
`/dashboard/seating`, `/dashboard/settings`, `/invite/:slug`, `/:slug/rsvp`,
`/:slug/schedule`, `/:slug/gallery`, `/:slug/qr`, `/guest`.

## Recommended next milestone

- Wire a real backend (Postgres/Supabase) behind `lib/store.tsx`'s interface
  — the context API was designed so this swap doesn't touch any page
- Real QR generation + camera-based check-in scanning
- Visual drag-and-drop seating canvas
- Custom color picker + photo-based palette extraction
- Auth, email delivery, and payments
