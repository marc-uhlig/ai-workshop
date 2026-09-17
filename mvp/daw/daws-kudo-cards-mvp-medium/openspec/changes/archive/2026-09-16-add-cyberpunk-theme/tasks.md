## 1. Theme catalogue and state

- [x] 1.1 Replace the flat template catalogue with a theme-owned catalogue containing the existing minimalist theme and exactly four occasions per theme; verify the Cyberpunk entries are Signal Boost, Mission erfüllt, Starker Move, and Upgrade verdient.
- [x] 1.2 Extend card selection state and normalisation for a theme plus an occasion belonging to it; verify that changing themes selects its default occasion while preserving message and sender.

## 2. Guided editor and artwork

- [x] 2.1 Add a responsive theme selector and filter the occasion selector to the active theme; verify switching themes updates the four choices and the live SVG preview.
- [x] 2.2 Implement Cyberpunk SVG artwork with neon colours, high-contrast text, and distinct vector decorations for its four occasions; verify all text remains legible at 1200 × 1200.
- [x] 2.3 Add matching Cyberpunk Canvas rendering to the PNG export; verify downloaded PNG output remains 1200 × 1200 and reflects the selected Cyberpunk occasion.

## 3. Automated quality checks

- [x] 3.1 Update unit tests for theme catalogues, valid theme/occasion selection, content retention, and PNG dimensions; verify with `npm test`.
- [x] 3.2 Update end-to-end coverage to select Cyberpunk and an occasion, check SVG preview content, and initiate a PNG download; verify with `npm run test:e2e`.
- [x] 3.3 Run the production build and complete test suites; verify with `npm run build`, `npm test`, and `npm run test:e2e`.
