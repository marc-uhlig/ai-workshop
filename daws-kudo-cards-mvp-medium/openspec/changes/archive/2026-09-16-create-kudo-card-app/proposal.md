## Why

Teams need a quick way to create attractive, personal Kudo-Cards for digital recognition without requiring design tools, accounts, or stored personal data. A focused browser app makes creating and sharing a card fast while retaining a polished, reliable experience.

## What Changes

- Add a browser-based Kudo-Card creator with four minimalist SVG card templates.
- Add a guided editor for the card message, optional sender, and template selection.
- Show a live square card preview at a fixed 1200 × 1200 pixel format.
- Let users download the finished card as a PNG for digital sharing.
- Add unit tests for core editor and export behavior, plus end-to-end coverage for the create-and-download flow.

## Capabilities

### New Capabilities

- `kudo-card-creation`: Guided creation, preview, and PNG download of square digital Kudo-Cards.
- `kudo-card-quality`: Automated unit and end-to-end test coverage for core user flows.

### Modified Capabilities

- None.

## Impact

- New frontend application, SVG template assets, card-rendering and PNG-export logic.
- Browser download APIs and a test runner for unit and end-to-end tests.
- No backend, authentication, database, or deployment infrastructure.
