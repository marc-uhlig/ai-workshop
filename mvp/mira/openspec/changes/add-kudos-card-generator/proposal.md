## Why

Existing kudos-card tools (share-kudos.com, kudobox.co) work but are visually flat and offer little control over the final card. This change delivers a first, self-contained MVP of a nicer alternative: a single-page app where a user picks a themed, pre-designed card, personalizes the text, and exports it as an image — built as a learning vehicle for the latest TanStack Start stack.

## What Changes

- New TanStack Start (React) application scaffolded with Vite, using pnpm as the underlying package manager and the Vite+ toolchain (`vp`) for linting/formatting (oxlint + oxfmt) and task running.
- Tailwind CSS + shadcn/ui as the styling/component layer, designed with the `ui-ux-pro-max` skill for a modern, polished look.
- One theme, "Star Wars," containing 4 templates. Each template is a 1:1 pairing of a pre-generated SVG background (generated once, now, as static assets — no runtime AI calls) with a preset text (e.g. "Great Job!", "Amazing Work!").
- A card composer: pick a template, see a live preview, edit the preset text freely (including a "reset to template" action to restore the original wording).
- Export: render the composed card to a PNG and let the user download it to their local filesystem or copy it to the clipboard.
- Theme/template data modeled as a registry (not hard-coded per-component) so additional themes can be added later purely as data.
- `flake.nix` updated to provide Node.js (pinned via nixpkgs) and pnpm for the devShell, with Vite+'s own Node.js management turned off (`vp env off`) so the toolchain stays fully reproducible through Nix; Playwright browser provisioning (already present) is reused for e2e tests.
- Linting (oxlint) and formatting (oxfmt) configured and passing on the initial codebase.
- A Playwright e2e suite covering the core happy path: select the Star Wars theme's template → edit text → preview updates → download produces a file.
- No backend/server behavior beyond TanStack Start's default routing/SSR shell — composition, rendering, download, and clipboard copy all happen client-side. No deployment target for this iteration; `pnpm dev` / `vp dev` inside the Nix devShell is the target run mode.

## Capabilities

### New Capabilities
- `kudos-card-catalog`: The theme/template data model — the Star Wars theme and its 4 background+text template pairs, structured so more themes can be added as data later.
- `kudos-card-composer`: The interactive UI for choosing a template, previewing the card live, and editing/resetting its text.
- `kudos-card-export`: Rendering the composed card to an image and letting the user download it or copy it to the clipboard.

### Modified Capabilities
- None — this is a new application with no pre-existing specs.

## Impact

- **New project**: an entire TanStack Start app under this directory (currently only `flake.nix`, `.envrc`, and OpenSpec scaffolding exist).
- **Affected files**: `flake.nix` (devShell: add pinned Node.js, keep pnpm; document `vp env off`), plus new `package.json`, `vite.config.ts`, `app/` (or equivalent TanStack Start structure), `src/` assets for the 4 SVG backgrounds, Tailwind/shadcn config, oxlint/oxfmt config, and a `e2e/` Playwright suite with `playwright.config.ts`.
- **Dependencies introduced**: `@tanstack/react-start` + its Vite plugin, React, Tailwind CSS, shadcn/ui (Radix-based components), `vite-plus` (`vp`) providing oxlint/oxfmt/vitest tooling, Playwright.
- **No impact** on other parts of the `ai-workshop` monorepo (slides, other `mvp/*` examples) — this change is fully scoped to `mvp/mira/`.
