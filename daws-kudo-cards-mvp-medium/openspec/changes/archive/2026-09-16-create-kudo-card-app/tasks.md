## 1. Project setup and quality tooling

- [x] 1.1 Initialize TypeScript React frontend with development, production-build, and preview commands on port 3450; verify production build completes successfully.
- [x] 1.2 Configure unit-test runner and browser end-to-end runner with independent package commands; verify each command starts its respective suite in a clean checkout.
- [x] 1.3 Add shared card domain types, fixed 1200 × 1200 export constants, validation helpers, and data-driven template catalogue; verify unit tests cover valid and invalid editor states plus export dimensions.

## 2. Card rendering and editor

- [x] 2.1 Implement four distinct minimalist SVG templates with stable IDs and safe text regions; verify every catalogue item renders a square card preview.
- [x] 2.2 Implement canonical SVG card renderer from template ID, message, and optional sender; verify unit tests confirm preview data mapping and selected-template output.
- [x] 2.3 Implement guided editor with template selection, required message, optional sender, inline validation, and live preview; verify changing input or template updates preview while retaining entered content.
- [x] 2.4 Define and implement message and sender limits plus predictable overflow fitting; verify long input remains inside the card safe area and blocked/trimmed behavior is documented in UI.

## 3. PNG export

- [x] 3.1 Implement 1200 × 1200 canvas PNG rendering from card data; verify unit tests assert export configuration uses fixed dimensions.
- [x] 3.2 Implement browser PNG download from the current valid card and block download for missing messages; verify end-to-end test checks PNG type, dimensions, and missing-message feedback.

## 4. End-to-end verification and polish

- [x] 4.1 Add end-to-end test for selecting a template, entering a message and sender, and observing updated preview content; verify test passes in supported Chromium configuration.
- [x] 4.2 Add end-to-end test that triggers a PNG download and checks file type and image dimensions where test environment permits; verify download test passes.
- [x] 4.3 Review keyboard accessibility, visible labels, focus states, error feedback, and responsive layout; verify native controls, labels, focus styles, and responsive breakpoints support the creation flow.
- [x] 4.4 Run production build, unit suite, and end-to-end suite; verify all complete without external services or credentials.
