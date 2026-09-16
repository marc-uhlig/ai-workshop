## Context

Greenfield project inside `mvp/mira/` — currently only `flake.nix`, `.envrc`, and OpenSpec scaffolding exist. See proposal.md for motivation and scope. Key constraints carried over from discovery with the user:

- TanStack Start's current React docs (verified via Context7) point at `@tanstack/react-start` with a Vite plugin (`tanstackStart()` in `vite.config.ts`, loaded before `@vitejs/plugin-react`). Context7 flags the framework itself as alpha — APIs may still shift.
- Vite+ (`vp`) provides oxlint/oxfmt/vitest as a unified toolchain, but by default it also manages its own Node.js runtime and offers a unified package-manager interface (`vp install`/`vp add`) that can sit on top of pnpm's lockfile — confirmed via Context7 docs, not an assumption.
- No backend/server functions are needed for v1; everything is client-side.

## Goals / Non-Goals

**Goals:**
- One working theme (Star Wars) with 4 background+text template pairs, fully client-side composer and export.
- Reproducible dev environment via the existing Nix flake (pnpm + Playwright already present).
- Lint/format via oxlint + oxfmt, wired through the Vite+ (`vp`) toolchain.
- A theme/template data shape that lets a second theme be added later as pure data.

**Non-Goals:**
- No runtime AI image generation, no server functions, no persistence/database, no auth, no deployment/hosting for this iteration.
- No multi-theme UI polish (theme switcher, theme browsing) — only one theme exists, so the UI can assume a single theme for now as long as the data shape doesn't preclude more.
- No cross-browser clipboard polyfills beyond feature detection + a visible error message.

## Decisions

### 1. Pre-generate SVG backgrounds now as static assets (not at runtime)
Generate the 4 Star Wars-themed SVG backgrounds once, during this build-out, and check them in under an assets directory. The app never calls an AI API at runtime.
- **Alternative considered**: a server function calling an AI API per request — rejected for v1: adds secret management, latency, and cost for no benefit when the theme set is fixed and small.

### 2. Client-side canvas rasterization for export
Compose the final card (SVG background + current text) by drawing onto an HTML `<canvas>`, then export via `canvas.toBlob('image/png')`. The same PNG blob is used both for the file download (`<a download>` with an object URL) and for clipboard copy (`navigator.clipboard.write` with a `ClipboardItem`).
- **Alternative considered**: exporting the raw composited SVG (via `XMLSerializer` + data URL) directly — rejected because clipboard image support for SVG is inconsistent across browsers, while `image/png` via `ClipboardItem` is broadly supported; PNG is also the more universally expected download format for a "card image."
- **Constraint this implies**: background SVGs must be bundled as local, same-origin assets (not fetched cross-origin) to avoid canvas tainting, which would block `toBlob`/clipboard reads.

### 3. Theme/template registry as data, 1:1 background-to-template pairing
Model themes as `{ id, name, templates: [{ id, background, presetText }] }`. Each template embeds its own background reference and preset text (per the user's "paired 1:1" decision). Adding a second theme later is adding another entry to this array — no component changes required.
- **Alternative considered**: independent matrix of backgrounds × templates — rejected per explicit user decision (paired 1:1 is simpler and gives a curated look per card).

### 4. Styling: Tailwind CSS + shadcn/ui
Use Tailwind utility classes plus shadcn/ui (Radix-based) components for interactive elements (template picker, text field, buttons, toast/error messaging), designed with the `ui-ux-pro-max` skill.

### 5. Toolchain: pnpm as the underlying package manager, Vite+ (`vp`) as the unified interface
Keep `pnpm-lock.yaml` as the real lockfile; use `vp` commands (`vp install`, `vp add`, `vp lint`, `vp fmt`, `vp dev`, `vp build`) as the day-to-day interface, since Context7 docs confirm `vp` works "regardless of whether the underlying project uses pnpm, npm, Yarn, or Bun." Configure oxlint via `.oxlintrc.json` and oxfmt per its own config, both surfaced through `vp`.
- Run `vp env off` so Vite+ does not manage its own Node.js runtime; instead pin Node.js via nixpkgs in `flake.nix`, keeping the whole toolchain reproducible through Nix rather than through `vp`'s own downloaded runtimes.

### 6. TanStack Start used for structure/SSR shell only
Scaffold via `create-start-app`/`@tanstack/cli create`, using TanStack Router (bundled with Start) for the page structure. No TanStack Query (no server data fetching) and no TanStack Form is required for v1 — the text editor is a single controlled input, not complex enough to justify a form library. This can be revisited if the composer grows more fields later.

### 7. Playwright e2e: happy path only, browsers from the flake
Cover: load app → select a template → edit text → preview reflects edit → trigger download → a file is produced. Clipboard-copy and reset-to-template are explicitly out of automated scope for v1 per the user's decision (clipboard permissions are flaky in headless CI). `playwright.config.ts` reuses the `PLAYWRIGHT_BROWSERS_PATH` already exported by `flake.nix`'s devShell.

## Risks / Trade-offs

- **TanStack Start is alpha; APIs may shift before/during implementation** → Mitigation: pin exact versions in `package.json`, re-check Context7 docs at implementation time rather than relying solely on this design doc.
- **Vite+ is a newer, fast-moving toolchain; its interplay with a pnpm lockfile or TanStack Start's Vite plugin could surface friction not visible from docs alone** → Mitigation: if `vp` proves unworkable during implementation, fall back to standalone `oxlint`/`oxfmt` pnpm devDependencies (already confirmed compatible) without changing any spec — this is an implementation detail, not a behavior change.
- **Canvas tainting** if a background is ever loaded cross-origin → Mitigation: bundle all theme SVGs as local build assets, never remote URLs.
- **Clipboard API browser support varies** (older browsers, some Linux/Firefox configurations) → Mitigation: feature-detect before attempting copy and show the visible failure message required by `kudos-card-export` spec's clipboard-failure requirement.
- **Vite+ managing Node by default could fight Nix's reproducibility** → Mitigation: `vp env off` plus a pinned nixpkgs `nodejs`, decided up front in Decision 5.

## Migration Plan

Greenfield addition — nothing to migrate. Rollback, if ever needed, is simply removing the new application files and reverting `flake.nix`; nothing is deployed or depended on by other parts of the monorepo.

## Open Questions

- Exact Node.js LTS version to pin in `flake.nix` (e.g. 22 vs 24) and exact oxlint/oxfmt/`vite-plus` versions — resolvable at implementation time via Context7/nixpkgs lookup without affecting specs or task breakdown.
- Exact set of shadcn/ui components to install (e.g. `select` or a custom picker grid, `button`, `textarea`, `toast`/`sonner` for the clipboard-failure message) — an implementation detail decided while building the composer UI.
