## Purpose

Beschreibt, wie aus der fertigen Karte ein Bild wird: als heruntergeladene PNG-Datei und als Inhalt
der Zwischenablage. Der Export ist der Moment, in dem die Anwendung ihren Zweck erfüllt — er muss
verlässlich sein und im Fehlerfall ehrlich Auskunft geben.

## ADDED Requirements

### Requirement: Download als PNG

Das System SHALL die Karte auf Anforderung als PNG-Datei zum Download anbieten. Die Datei SHALL
ausschließlich die Karte enthalten — keine Bedienelemente, keinen Seitenhintergrund und keine
Zuschnittsränder.

#### Scenario: Erfolgreicher Download

- **WHEN** der Nutzer bei ausgefüllter Karte den Download auslöst
- **THEN** erhält er eine Datei, deren Inhalt ein gültiges PNG ist
- **AND** das Bild zeigt genau die Karte aus der Vorschau

#### Scenario: Bedienelemente erscheinen nicht im Bild

- **WHEN** der Nutzer die Karte exportiert
- **THEN** sind im Bild weder Eingabefelder noch Schaltflächen noch Auswahllisten zu sehen

### Requirement: Sprechender Dateiname

Der Dateiname SHALL den Empfänger erkennbar machen und ohne Nacharbeit auf allen gängigen
Dateisystemen verwendbar sein. Umlaute und Sonderzeichen SHALL in eine reine Kleinbuchstaben-,
Ziffern- und Bindestrich-Form überführt werden.

#### Scenario: Empfänger mit Umlaut

- **WHEN** der Empfänger "Anna Müller" heißt
- **THEN** enthält der Dateiname `anna-mueller`
- **AND** der Dateiname endet auf `.png`

#### Scenario: Empfänger ohne verwertbare Zeichen

- **WHEN** der Empfängername nach der Umwandlung keine verwertbaren Zeichen übrig lässt
- **THEN** verwendet das System einen festen Ersatznamen, statt eine Datei ohne Namen zu erzeugen

### Requirement: Auflösung des Bildes

Das exportierte Bild SHALL in doppelter Kantenlänge gegenüber der dargestellten Karte erzeugt werden,
damit es auf hochauflösenden Bildschirmen und beim Ausdruck scharf bleibt. Die Ausgabegröße SHALL
unabhängig vom Gerät des Nutzers und von dessen Bildschirmauflösung stets identisch sein.

#### Scenario: Gleiches Ergebnis auf verschiedenen Geräten

- **WHEN** dieselbe Karte auf Geräten mit unterschiedlicher Bildschirmauflösung exportiert wird
- **THEN** haben die erzeugten Bilder dieselben Pixelabmessungen

### Requirement: Kopieren in die Zwischenablage

Das System SHALL die Karte auf Anforderung als PNG in die Zwischenablage legen, sodass sie direkt in
Chat- und Dokumentanwendungen eingefügt werden kann. Das System SHALL den Erfolg sichtbar
zurückmelden.

#### Scenario: Erfolgreiches Kopieren

- **WHEN** der Nutzer bei ausgefüllter Karte das Kopieren auslöst
- **THEN** enthält die Zwischenablage ein Bild im Format PNG
- **AND** der Nutzer erhält eine sichtbare Bestätigung

#### Scenario: Einfügen in eine andere Anwendung

- **WHEN** der Nutzer den Inhalt der Zwischenablage in eine Anwendung einfügt, die Bilder annimmt
- **THEN** erscheint dort die Karte als Bild und nicht als Text oder Verweis

### Requirement: Umgang mit Fehlern und fehlender Unterstützung

Schlägt ein Export fehl oder unterstützt der Browser das Beschreiben der Zwischenablage mit Bildern
nicht, SHALL das System dies dem Nutzer verständlich mitteilen und ihm den jeweils anderen Weg
anbieten. Ein Fehlschlag SHALL niemals stillschweigend bleiben oder die eingegebenen Inhalte
verwerfen.

#### Scenario: Zwischenablage nicht verfügbar

- **WHEN** der Browser das Ablegen von Bildern in der Zwischenablage nicht unterstützt
- **THEN** teilt das System dies mit und verweist auf den Download
- **AND** die Eingaben des Nutzers bleiben erhalten

#### Scenario: Bilderzeugung schlägt fehl

- **WHEN** die Erzeugung des Bildes fehlschlägt
- **THEN** erhält der Nutzer eine verständliche Fehlermeldung
- **AND** er kann den Export erneut auslösen, ohne die Karte neu auszufüllen

### Requirement: Rückmeldung während des Exports

Das System SHALL während der Bilderzeugung erkennbar machen, dass gearbeitet wird, und ein
mehrfaches gleichzeitiges Auslösen desselben Exports verhindern.

#### Scenario: Mehrfaches Klicken

- **WHEN** der Nutzer die Export-Schaltfläche mehrfach schnell hintereinander betätigt
- **THEN** läuft nur ein Export
- **AND** die Schaltfläche zeigt währenddessen ihren laufenden Zustand
