## Purpose

Definiert zuverlässige, zugängliche und testbare Nutzung des Kudo-Card-Generators auf aktuellen Desktop- und Mobilbrowsern.

## ADDED Requirements

### Requirement: Responsive editor
The system SHALL present usable editing controls and visible card preview at viewport widths from 320 pixels upward.

#### Scenario: Use on a narrow viewport
- **WHEN** user opens application at 320 pixel viewport width
- **THEN** user can edit all fields, select a category, and access both download actions without horizontal page scrolling

### Requirement: Keyboard and semantic access
The system SHALL expose form fields, category controls, validation feedback, and download actions through semantic controls with keyboard access and accessible names.

#### Scenario: Complete card by keyboard
- **WHEN** user navigates editor using keyboard
- **THEN** user can enter required content, choose category, and initiate download without a pointer device

### Requirement: Unit test coverage for core behavior
The system SHALL include automated unit tests for required-field validation, category selection, and export configuration.

#### Scenario: Run unit suite
- **WHEN** developer runs unit test command
- **THEN** suite verifies core behavior without requiring a real browser download

### Requirement: End-to-end critical-flow coverage
The system SHALL include automated E2E tests covering card creation, live preview updates, category selection, and PNG/PDF download initiation on desktop and mobile viewport.

#### Scenario: Run end-to-end suite
- **WHEN** developer runs E2E test command
- **THEN** browser tests verify each critical flow and download file type
