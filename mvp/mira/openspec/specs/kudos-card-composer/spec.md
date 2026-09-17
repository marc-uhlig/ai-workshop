# kudos-card-composer Specification

## Purpose

Lets a user turn a chosen template into their own card by previewing it live and editing its text, so the exported card can be personalized rather than left as raw preset copy.

## Requirements

### Requirement: Selecting a template loads it into the composer
WHEN a user selects a template from the Star Wars theme, THEN the system SHALL display a live preview showing that template's background image with its preset text overlaid.

#### Scenario: Selecting a template populates the preview
- **WHEN** a user selects a template
- **THEN** the preview shows that template's background and its preset text

### Requirement: Card text is editable
The system SHALL allow the user to edit the card's text after selecting a template, and the live preview SHALL reflect each edit as it is made.

#### Scenario: Editing text updates the preview
- **WHEN** a user changes the text in the editing field
- **THEN** the live preview updates to show the new text on the selected background

### Requirement: Text can be reset to the template's preset
The system SHALL provide an explicit action that restores the card text to the selected template's original preset text, discarding any edits.

#### Scenario: Reset restores original preset text
- **WHEN** a user has edited the text and then triggers the reset action
- **THEN** the text returns exactly to the selected template's original preset text

### Requirement: Switching templates loads the new template's defaults
WHEN a user switches from one template to another, THEN the system SHALL replace the preview and editable text with the newly selected template's background and preset text.

#### Scenario: Switching templates discards prior edits
- **WHEN** a user has edited the text for template A and then selects template B
- **THEN** the preview and text field show template B's background and original preset text, not template A's edited text
