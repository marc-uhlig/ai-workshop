## 1. Project Scaffolding & Toolchain

- [x] 1.1 Scaffold the TanStack Start (React) app in `mvp/mira/` via the current CLI (`create-start-app` / `@tanstack/cli create`) and verify `package.json`, `vite.config.ts`, and the app's route structure exist
- [x] 1.2 Install pnpm dependencies and verify `pnpm install` completes without errors inside the Nix devShell
- [x] 1.3 Adopt the Vite+ (`vp`) toolchain on top of the pnpm lockfile, configure oxlint (`.oxlintrc.json`) and oxfmt, and verify `vp lint` and `vp fmt --check` both run successfully (even if flagging pre-existing scaffold issues to fix)
- [x] 1.4 Configure Tailwind CSS + shadcn/ui in the app and verify a sample component renders with Tailwind utility classes applied in the browser
- [x] 1.5 Update `flake.nix` to add a pinned nixpkgs `nodejs` to the devShell and verify `nix develop` succeeds with `node -v` and `pnpm -v` resolving to the Nix-provided binaries
- [x] 1.6 Run `vp env off` so Vite+ does not manage its own Node.js runtime, and verify `vp env current` reports the Nix-provided Node instead of a Vite+-managed one

## 2. Kudos Card Catalog

- [x] 2.1 Generate 4 distinct Star Wars-themed SVG background images as static assets and verify all 4 files exist and render correctly when opened directly in a browser
- [x] 2.2 Implement the theme/template registry data module (`theme -> templates[]`, each template pairing one background with one preset text) and verify the Star Wars theme exposes exactly 4 templates with distinct preset texts
- [x] 2.3 Structure the registry so a second theme can be added as a new data entry, and verify (via a short script or type-level check) that no UI component references the Star Wars theme by name directly

## 3. Kudos Card Composer

- [x] 3.1 Build the template selection UI listing all 4 Star Wars templates with their background thumbnails, and verify all 4 are visible and selectable in the browser
- [x] 3.2 Build the live preview that renders the selected template's background with its text overlaid, and verify selecting each of the 4 templates shows that template's correct background/preset pairing
- [x] 3.3 Add an editable text field wired to the preview, and verify typing in the field updates the preview in real time
- [x] 3.4 Add a "reset to template" action, and verify that after editing the text, triggering reset restores the selected template's exact original preset text
- [x] 3.5 Ensure switching templates reloads that template's own background and preset text, and verify that editing template A's text then selecting template B shows B's original preset (not A's edits)

## 4. Kudos Card Export

- [ ] 4.1 Implement canvas-based rasterization of the composed card (background + current text) to a PNG blob, and verify a triggered export produces a non-empty, correctly-sized PNG
- [ ] 4.2 Implement the download action (object URL + `<a download>`) using that PNG blob, and verify triggering it saves an image file to the local filesystem
- [ ] 4.3 Implement the clipboard-copy action via `navigator.clipboard.write` with a `ClipboardItem`, and verify triggering it places a pasteable PNG image on the system clipboard
- [ ] 4.4 Add feature detection and a visible error message for when clipboard copy fails or is unsupported, and verify the message appears when the clipboard call is forced to fail
- [ ] 4.5 Verify manually that both the downloaded file and the clipboard image reflect the currently edited text, not just the template's original preset

## 5. Playwright E2E Suite

- [ ] 5.1 Add Playwright as a dev dependency and create `playwright.config.ts` using the `PLAYWRIGHT_BROWSERS_PATH` already exported by `flake.nix`'s devShell, and verify `pnpm exec playwright test --list` runs without error inside `nix develop`
- [ ] 5.2 Write the happy-path e2e test (load app → select a template → edit text → preview reflects the edit → trigger download → a downloaded file is produced) and verify it passes locally via `nix develop -c pnpm exec playwright test`
- [ ] 5.3 Add a `test:e2e` script to `package.json` and verify it runs the suite successfully

## 6. Final Verification & Polish

- [ ] 6.1 Run `vp lint` and `vp fmt --check` across the full codebase and verify zero errors
- [ ] 6.2 Run a production build (`pnpm build` / `vp build`) and verify it completes without errors
- [ ] 6.3 Do a manual walkthrough covering all 4 templates, text edit + reset, download, and clipboard copy, and verify each matches its spec scenario in `specs/`
- [ ] 6.4 Update the `flake.nix` devShell banner's "App:" line (currently "TODO") to describe the actual dev command, and verify the banner prints correctly on `nix develop`
