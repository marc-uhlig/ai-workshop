## Context

The project has no existing application code. See proposal.md for motivation and the two Kudo-Card capability specs for observable behavior. The app has no backend, account system, database, or deployment target; all card content remains in the browser.

## Goals / Non-Goals

**Goals:**

- Provide a small, maintainable TypeScript web app with a guided single-card workflow.
- Keep the card model and SVG rendering deterministic so preview and export match.
- Make core behavior testable with fast unit tests and browser-level end-to-end tests.

**Non-Goals:**

- User accounts, saved cards, sharing links, collaboration, analytics, or server-side rendering.
- A free-form design editor, custom dimensions, PDF export, printing support, or a deployment pipeline.

## Decisions

### Component-based TypeScript frontend

Build a client-side React and TypeScript application with a lightweight development and build toolchain. The development and preview server SHALL bind to port `3450`. Keep card data in local component state: `{ templateId, message, sender }`.

React supports a compact editor/preview composition; TypeScript makes template metadata and export inputs explicit. A vanilla DOM app was considered but would make UI state and test seams less clear as the editor grows.

### Data-driven template catalogue

Define four template records with stable IDs, labels, colours, and SVG artwork. The editor selects an ID; a single renderer maps the selected record and card data to an SVG.

This prevents four divergent card implementations and lets the same source drive thumbnails, preview, and export. Duplicated template components were considered but risk preview/export drift.

### SVG preview with direct canvas export

Render every card preview as SVG at a `viewBox` equivalent to 1200 × 1200. Generate the PNG with the same template catalogue and card data directly on a 1200 × 1200 canvas, then initiate a browser download from its PNG data URL.

SVG preserves sharp preview rendering. Direct canvas rendering avoids headless-browser failures decoding serialized SVG; DOM screenshots were rejected because of layout and font-timing variability.

### Validation and readable fitting

Validate the message before export and expose an inline error when missing. Constrain editor inputs to documented limits selected during implementation; SVG text layout MUST keep content inside safe template areas, truncating or reducing size predictably when necessary.

This avoids blank downloads and overflow. Unbounded text was rejected because it cannot reliably fit a fixed card.

### Test split

Use a unit-test runner for pure validation, state mapping, and export options. Use a browser automation runner for template selection, live preview, and download initiation.

Unit-only testing cannot prove browser download behavior; end-to-end-only testing would make simple regressions slower to diagnose.

## Risks / Trade-offs

- Preview and exported artwork use separate renderers → keep both data-driven from the same template catalogue and test exported PNG dimensions.
- Long messages can reduce legibility on a fixed canvas → enforce an input limit and define overflow behavior before implementation.
- Browser download assertions vary by engine → run end-to-end coverage in a supported Chromium configuration and assert MIME type plus PNG dimensions where feasible.

## Migration Plan

No migration needed: this is a new client-side application with no persisted data. Rollback consists of restoring the previous static application state or withholding release.

## Open Questions

- Exact maximum lengths and overflow copy for message and sender will be chosen during UI implementation; they do not alter the required creation or export behavior.
