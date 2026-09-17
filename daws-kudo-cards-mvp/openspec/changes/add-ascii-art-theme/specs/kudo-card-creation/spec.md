## MODIFIED Requirements

### Requirement: Live square preview
The system SHALL render editor input in a live preview using the selected theme and its selected occasion. The preview and exported artwork MUST use a square 1200 × 1200 pixel canvas. The ASCII-Art theme preview MUST be rendered as native text content rather than SVG artwork.

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

#### Scenario: Viewing an ASCII-Art card
- **WHEN** a user selects the ASCII-Art theme
- **THEN** the live preview SHALL display the card content and occasion motif as readable monospace text rather than SVG artwork

### Requirement: Minimalist SVG templates
The system SHALL offer a minimalist theme and a Cyberpunk theme, each with four visually distinct occasions based on scalable vector artwork, and an ASCII-Art theme with four visually distinct occasions based on text artwork. The minimalist theme SHALL retain its existing four occasions. The Cyberpunk theme SHALL offer the occasions "Signal Boost", "Mission erfüllt", "Starker Move", and "Upgrade verdient" with a visually distinct neon-inspired appearance. The ASCII-Art theme SHALL offer the occasions "Danke dir", "Großartige Arbeit", "Stark im Team", and "Erfolg verdient" with a visually distinct text-based retro appearance. Each occasion MUST render message and sender content legibly within the fixed square card format.

#### Scenario: Viewing themes and occasions
- **WHEN** a user opens the editor
- **THEN** the system SHALL make the minimalist, Cyberpunk, and ASCII-Art themes available and SHALL show exactly four occasions for the active theme

#### Scenario: Viewing available templates
- **WHEN** a user opens the editor
- **THEN** the system SHALL make all four occasions of the active theme available for selection

#### Scenario: Viewing Cyberpunk occasions
- **WHEN** a user selects the Cyberpunk theme
- **THEN** the system SHALL make "Signal Boost", "Mission erfüllt", "Starker Move", and "Upgrade verdient" available for selection

#### Scenario: Viewing ASCII-Art occasions
- **WHEN** a user selects the ASCII-Art theme
- **THEN** the system SHALL make "Danke dir", "Großartige Arbeit", "Stark im Team", and "Erfolg verdient" available for selection
