## Purpose

Beschreibt, woraus eine Kudos-Karte besteht und was der Nutzer sieht, während er sie zusammenstellt.
Die Karte ist das Artefakt, das am Ende exportiert wird — diese Capability legt ihren Inhalt, ihre
Grenzen und die Verbindlichkeit der Vorschau fest.

## ADDED Requirements

### Requirement: Kartenfelder

Eine Karte SHALL aus genau vier inhaltlichen Bestandteilen bestehen: Empfänger, Template-Text,
Freitext und Absender. Empfänger, Absender und Template-Text sind Pflicht; der Freitext ist optional.
Alle Bedienoberfläche und alle mitgelieferten Texte sind deutsch.

#### Scenario: Vollständig ausgefüllte Karte

- **WHEN** der Nutzer Empfänger, Absender und Freitext eingibt und ein Template gewählt hat
- **THEN** zeigt die Karte alle vier Bestandteile an

#### Scenario: Karte ohne Freitext

- **WHEN** der Nutzer den Freitext leer lässt
- **THEN** stellt die Karte die übrigen drei Bestandteile ohne Lücke oder Platzhalter dar
- **AND** der Export bleibt möglich

### Requirement: Eingabegrenzen

Das System SHALL die Länge der frei eingebbaren Felder begrenzen, damit kein Inhalt aus der Karte
herausläuft oder ihr Layout zerstört: Empfänger und Absender je höchstens 40 Zeichen, Freitext
höchstens 240 Zeichen. Überschreitungen SHALL das System bereits bei der Eingabe verhindern und dem
Nutzer die verbleibenden Zeichen des Freitexts anzeigen.

#### Scenario: Freitext erreicht die Obergrenze

- **WHEN** der Nutzer versucht, mehr als 240 Zeichen in den Freitext einzugeben
- **THEN** nimmt das Feld keine weiteren Zeichen an
- **AND** die Restzeichenanzeige steht auf 0

#### Scenario: Restzeichen während der Eingabe

- **WHEN** der Nutzer Freitext eingibt
- **THEN** zeigt das System jederzeit an, wie viele Zeichen noch zur Verfügung stehen

### Requirement: Pflichtfelder vor dem Export

Das System SHALL den Export einer Karte verhindern, solange Empfänger oder Absender leer sind, und
dem Nutzer erkennbar machen, warum.

#### Scenario: Empfänger fehlt

- **WHEN** das Empfängerfeld leer ist
- **THEN** sind die Bedienelemente für Download und Kopieren nicht auslösbar
- **AND** das System weist auf das fehlende Pflichtfeld hin

#### Scenario: Nur Leerzeichen eingegeben

- **WHEN** der Nutzer ausschließlich Leerzeichen als Empfänger eingibt
- **THEN** behandelt das System das Feld als leer

### Requirement: Verbindliche Live-Vorschau

Das System SHALL jederzeit eine Vorschau der Karte anzeigen, die sich unmittelbar mit jeder Eingabe
aktualisiert. Diese Vorschau SHALL bildgleich mit dem späteren Export sein: Was der Nutzer sieht,
ist exakt das, was heruntergeladen oder kopiert wird.

#### Scenario: Eingabe wirkt sofort

- **WHEN** der Nutzer ein Zeichen in einem beliebigen Feld ändert
- **THEN** zeigt die Vorschau die Änderung ohne weitere Bestätigung an

#### Scenario: Vorschau und Export stimmen überein

- **WHEN** der Nutzer die Karte exportiert
- **THEN** entsprechen Inhalt, Anordnung, Schrift und Farben des Bildes der zuvor gezeigten Vorschau

### Requirement: Feste Kartenabmessungen

Eine Karte SHALL unabhängig von Fenstergröße und Gerät stets dasselbe Seitenverhältnis und dieselbe
innere Anordnung besitzen. Auf schmalen Viewports SHALL die Vorschau proportional skaliert werden,
nicht umbrochen.

#### Scenario: Schmales Fenster

- **WHEN** die Seite in einem schmalen Fenster geöffnet wird
- **THEN** bleibt die Karte vollständig sichtbar und behält ihr Seitenverhältnis
- **AND** das exportierte Bild hat dieselben Abmessungen wie bei einem breiten Fenster
