## Purpose

Enable anyone to create a polished, square Kudo-Card in the browser and download it for digital sharing without an account or saved data.

## ADDED Requirements

### Requirement: Guided card editor
The system SHALL provide a guided editor with a required Kudo message, an optional sender, and selection of exactly one of four available card templates. The system MUST indicate when a required message is missing and MUST prevent export until it is supplied.

#### Scenario: Completing a card
- **WHEN** a user enters a message, optionally enters a sender, and selects a template
- **THEN** the editor SHALL present the completed card as ready for download

#### Scenario: Missing message
- **WHEN** a user attempts to download without entering a message
- **THEN** the system SHALL not create a download and SHALL indicate that a message is required

### Requirement: Live square preview
The system SHALL render editor input in a live preview using the selected template. The preview and exported artwork MUST use a square 1200 × 1200 pixel canvas.

#### Scenario: Changing a template
- **WHEN** a user selects a different template
- **THEN** the preview SHALL update to that template while retaining entered message and sender content

#### Scenario: Updating card content
- **WHEN** a user changes the message or sender
- **THEN** the preview SHALL reflect the changed content before download

### Requirement: Minimalist SVG templates
The system SHALL offer four visually distinct, minimalist templates based on scalable vector artwork. Each template MUST render message and sender content legibly within the fixed square card format.

#### Scenario: Viewing available templates
- **WHEN** a user opens the editor
- **THEN** the system SHALL make all four templates available for selection

### Requirement: PNG download
The system SHALL allow a user with a valid card to download the currently previewed card as a PNG image at 1200 × 1200 pixels.

#### Scenario: Successful download
- **WHEN** a user activates download for a valid card
- **THEN** the browser SHALL receive a PNG download representing the current preview content and selected template

### Requirement: Local-only processing
The system SHALL create and export cards in the user's browser without requiring authentication or transmitting card content to an application backend.

#### Scenario: Creating a card without an account
- **WHEN** a user opens the application
- **THEN** the user SHALL be able to create and download a card without signing in

