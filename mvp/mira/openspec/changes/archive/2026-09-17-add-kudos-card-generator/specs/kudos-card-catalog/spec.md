## Purpose

Defines the themes and templates available in the card creator: a theme is a named group of background artwork, and a template is one selectable background paired with a preset text, so users have ready-made starting points for a card.

## ADDED Requirements

### Requirement: Star Wars theme with four templates
The system SHALL provide a "Star Wars" theme containing exactly 4 templates available for selection in the initial release.

#### Scenario: Theme templates are visible on load
- **WHEN** a user opens the card creator
- **THEN** all 4 Star Wars templates are shown, each displaying its background image

### Requirement: Template is a fixed background/text pairing
Each template SHALL define exactly one background image and one non-empty preset text string, paired together as a single unit.

#### Scenario: Template preview shows its paired content
- **WHEN** a user views a template in the selection list
- **THEN** the template's own background image and its own preset text are shown together, not mixed with another template's background or text

### Requirement: Preset texts are distinct
The 4 templates in the Star Wars theme SHALL each have a distinct preset text (e.g. "Great Job!", "Amazing Work!").

#### Scenario: No duplicate preset text among templates
- **WHEN** a user browses the 4 available templates
- **THEN** no two templates display the same preset text
