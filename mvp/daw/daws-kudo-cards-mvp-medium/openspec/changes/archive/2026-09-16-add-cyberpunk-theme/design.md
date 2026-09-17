## Context

The current catalogue is a flat list of four templates. Its colour and decoration properties serve both as the visual system and as the selectable occasion, so a second independent visual system cannot be added without conflating the two concepts. SVG preview and Canvas PNG export currently duplicate the card composition.

## Goals / Non-Goals

**Goals:**

- Represent themes and their four occasions explicitly, with a stable selection state.
- Keep preview and export visually equivalent for both the existing minimalist theme and Cyberpunk.
- Make a later theme addition a catalogue extension rather than an editor redesign.

**Non-Goals:**

- User-authored themes, a free-form editor, theme persistence, or backend storage.
- Raster artwork, external font loading, or new runtime dependencies.

## Decisions

### Theme-owned occasion catalogue

The catalogue will contain themes; each theme owns exactly four occasion definitions. Card state will identify both the active theme and an occasion belonging to it. Switching themes selects the theme's defined default occasion while preserving message and sender.

This replaces a flat eight-item template list. A flat list with a theme tag was considered, but it leaves the editor responsible for grouping and makes the four-per-theme invariant implicit.

### Theme-level rendering variants

The shared card composition remains fixed at 1200 × 1200, while a theme selects its colour palette, typography treatment, and rendering variant. Cyberpunk uses only inline SVG geometry and Canvas primitives: deep dark ground, neon cyan/magenta accents, angular circuitry or grid motifs, and high-contrast text.

External images and web fonts were considered but rejected to preserve local-only processing, deterministic exports, and test reliability.

### One rendering vocabulary across preview and export

SVG and Canvas will consume the same theme and occasion definitions. Theme-specific decorative variants will be implemented in parallel SVG and Canvas renderers with matching geometry and colours, as the current app does for its shapes.

Rendering a serialized SVG through Canvas was considered, but direct Canvas drawing remains more reliable for PNG export in supported browsers and headless E2E runs.

## Risks / Trade-offs

- [SVG and Canvas variants can drift visually] → Keep shared values in the catalogue and add Cyberpunk preview/export coverage.
- [Neon colours can reduce readability] → Use a dark background and contrast-checked light message text; reserve saturated tones for accents.
- [Theme count can make the editor crowded] → Render the theme selector separately from the four occasion choices and retain the responsive single-column layout.

## Migration Plan

1. Transform the existing flat templates into the minimalist theme without changing their occasion names or appearance.
2. Add the Cyberpunk catalogue and renderer variants.
3. Adapt editor state and controls, then extend automated tests.
4. Roll back by restoring the flat minimalist catalogue; no stored user data or migrations exist.
