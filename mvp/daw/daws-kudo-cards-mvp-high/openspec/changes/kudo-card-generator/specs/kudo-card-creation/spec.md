## Purpose

Ermöglicht das Erstellen und Herunterladen persönlicher Kudo-Cards direkt im Browser, ohne Konto oder dauerhafte Datenspeicherung.

## ADDED Requirements

### Requirement: Card editor
The system SHALL provide an editor with recipient, message, and optional sender fields.

#### Scenario: Create a complete card
- **WHEN** user enters recipient and message
- **THEN** system renders those values on card preview

#### Scenario: Omit sender
- **WHEN** user leaves sender field empty
- **THEN** system renders card without a sender line

### Requirement: Required card content
The system SHALL require a recipient of at most 40 characters and a message of at most 280 characters before it enables export.

#### Scenario: Incomplete card
- **WHEN** recipient or message is empty
- **THEN** system disables export and identifies missing required field

#### Scenario: Exceed character limit
- **WHEN** user enters more than 40 recipient characters or 280 message characters
- **THEN** system prevents additional input or identifies limit violation and disables export

### Requirement: Four card categories
The system SHALL offer exactly four selectable categories: Danke, Teamwork, Erfolg, and Motivation.

#### Scenario: Select category
- **WHEN** user selects a category
- **THEN** system applies that category's visual template to preview while preserving entered text

### Requirement: Minimal card preview
The system SHALL show a live, minimalist card preview with category-specific SVG artwork and readable text.

#### Scenario: Edit content
- **WHEN** user changes a card field
- **THEN** preview updates without a page reload

### Requirement: Download card assets
The system SHALL let user download complete card as 1080 by 1080 pixel PNG and printable A6 PDF.

#### Scenario: Download PNG
- **WHEN** user selects PNG download for a complete card
- **THEN** browser receives a PNG file containing current preview

#### Scenario: Download PDF
- **WHEN** user selects PDF download for a complete card
- **THEN** browser receives an A6 PDF containing current preview

### Requirement: Local-only data handling
The system SHALL generate previews and downloads in browser and SHALL NOT require account creation, server requests, or persistent storage of card content.

#### Scenario: Use application without account
- **WHEN** user creates and downloads a card
- **THEN** flow completes without sign-in or stored card history
