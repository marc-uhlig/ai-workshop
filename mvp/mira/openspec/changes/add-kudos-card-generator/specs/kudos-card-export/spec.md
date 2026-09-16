## Purpose

Turns the composed card into a finished image the user can actually take with them — as a downloaded file or a clipboard paste — so the card is usable outside the app.

## ADDED Requirements

### Requirement: Download composed card as an image file
The system SHALL let the user download the currently composed card (background plus current text) as an image file saved to their local filesystem.

#### Scenario: Download produces a file
- **WHEN** a user triggers the download action on a composed card
- **THEN** an image file containing that card is saved to the user's local filesystem

### Requirement: Copy composed card to clipboard
The system SHALL let the user copy the currently composed card (background plus current text) to the system clipboard as an image.

#### Scenario: Copy places an image on the clipboard
- **WHEN** a user triggers the copy action on a composed card
- **THEN** an image of that card is placed on the system clipboard, available to paste into another application

### Requirement: Export reflects current edits
Both the downloaded file and the clipboard image SHALL reflect the card's current text and background at the moment of export, including any edits made after selecting the template.

#### Scenario: Exported image matches edited text
- **WHEN** a user edits the card text and then downloads or copies the card
- **THEN** the resulting image shows the edited text, not the template's original preset text

### Requirement: Clipboard failure is surfaced to the user
IF the copy-to-clipboard action fails or is unsupported by the user's browser, THEN the system SHALL show the user a clear message that the copy did not succeed, without silently failing.

#### Scenario: Clipboard failure shows a message
- **WHEN** the copy action cannot complete
- **THEN** the user sees a visible message indicating the copy failed
