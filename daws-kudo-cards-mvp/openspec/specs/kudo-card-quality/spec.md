# kudo-card-quality Specification

## Purpose

Protect the central Kudo-Card editor and download flow with automated checks that catch behavioral regressions before release.

## Requirements

### Requirement: Unit test coverage for core behavior
The system SHALL include automated unit tests for editor validation, theme and occasion selection state, preview data mapping, and PNG export configuration.

#### Scenario: Invalid editor state
- **WHEN** unit tests evaluate an editor state without a message
- **THEN** they SHALL verify that the state is not eligible for export

#### Scenario: Theme occasion catalogue
- **WHEN** unit tests evaluate the available themes
- **THEN** they SHALL verify that each theme exposes exactly four occasions and that Cyberpunk exposes "Signal Boost", "Mission erfüllt", "Starker Move", and "Upgrade verdient"

#### Scenario: Export dimensions
- **WHEN** unit tests evaluate PNG export configuration
- **THEN** they SHALL verify a width and height of 1200 pixels

### Requirement: End-to-end create-and-download coverage
The system SHALL include an automated end-to-end test that selects a theme and occasion, enters a message, verifies preview content, and verifies that PNG download is initiated.

#### Scenario: Successful end-to-end creation
- **WHEN** the end-to-end test completes the guided editor with valid content
- **THEN** it SHALL verify the selected theme and occasion in the preview and a PNG download event

#### Scenario: Cyberpunk end-to-end creation
- **WHEN** the end-to-end test selects Cyberpunk and one of its occasions before completing the editor
- **THEN** it SHALL verify the Cyberpunk preview and a PNG download event

### Requirement: Repeatable test execution
The system SHALL provide documented project commands that run unit tests and end-to-end tests independently in a clean local checkout.

#### Scenario: Running quality checks
- **WHEN** a developer invokes either documented test command
- **THEN** its respective automated test suite SHALL execute without requiring production credentials or external services
