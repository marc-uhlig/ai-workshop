## MODIFIED Requirements

### Requirement: Guided card editor
The system SHALL provide a guided editor with a required Kudo message, an optional sender, selection of exactly one available card theme, and selection of exactly one of the four occasions supplied by that theme. The system MUST indicate when a required message is missing and MUST prevent export until it is supplied.

#### Scenario: Completing a card
- **WHEN** a user enters a message, optionally enters a sender, selects a theme, and selects an occasion from that theme
- **THEN** the editor SHALL present the completed card as ready for download

#### Scenario: Missing message
- **WHEN** a user attempts to download without entering a message
- **THEN** the system SHALL not create a download and SHALL indicate that a message is required

#### Scenario: Changing the selected theme
- **WHEN** a user selects a different theme
- **THEN** the editor SHALL show that theme's four occasions, select its default occasion, and retain the entered message and sender

### Requirement: Live square preview
The system SHALL render editor input in a live preview using the selected theme and its selected occasion. The preview and exported artwork MUST use a square 1200 × 1200 pixel canvas.

#### Scenario: Changing an occasion
- **WHEN** a user selects a different occasion in the active theme
- **THEN** the preview SHALL update to that occasion while retaining entered message and sender content

#### Scenario: Changing a template
- **WHEN** a user selects a different occasion in the active theme
- **THEN** the preview SHALL update to that occasion while retaining entered message and sender content

#### Scenario: Changing a theme
- **WHEN** a user selects a different theme
- **THEN** the preview SHALL update to the new theme's default occasion while retaining entered message and sender content

#### Scenario: Updating card content
- **WHEN** a user changes the message or sender
- **THEN** the preview SHALL reflect the changed content before download

### Requirement: Minimalist SVG templates
The system SHALL offer a minimalist theme and a Cyberpunk theme, each with four visually distinct occasions based on scalable vector artwork. The minimalist theme SHALL retain its existing four occasions. The Cyberpunk theme SHALL offer the occasions "Signal Boost", "Mission erfüllt", "Starker Move", and "Upgrade verdient" with a visually distinct neon-inspired appearance. Each occasion MUST render message and sender content legibly within the fixed square card format.

#### Scenario: Viewing themes and occasions
- **WHEN** a user opens the editor
- **THEN** the system SHALL make the minimalist and Cyberpunk themes available and SHALL show exactly four occasions for the active theme

#### Scenario: Viewing available templates
- **WHEN** a user opens the editor
- **THEN** the system SHALL make all four occasions of the active theme available for selection

#### Scenario: Viewing Cyberpunk occasions
- **WHEN** a user selects the Cyberpunk theme
- **THEN** the system SHALL make "Signal Boost", "Mission erfüllt", "Starker Move", and "Upgrade verdient" available for selection

### Requirement: PNG download
The system SHALL allow a user with a valid card to download the currently previewed card as a PNG image at 1200 × 1200 pixels.

#### Scenario: Successful download
- **WHEN** a user activates download for a valid card
- **THEN** the browser SHALL receive a PNG download representing the current preview content, selected theme, and selected occasion
