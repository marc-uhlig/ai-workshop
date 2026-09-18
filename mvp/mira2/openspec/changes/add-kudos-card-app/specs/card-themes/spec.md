## Purpose

Beschreibt, wie das Aussehen einer Karte und die zur Auswahl stehenden Anerkennungstexte
zusammenhängen. Ein Theme ist eine gestalterische Welt mit eigenen, dazu passenden Texten — nicht
bloß ein Farbschema über austauschbaren Inhalten.

## ADDED Requirements

### Requirement: Themes und ihre Templates

Das System SHALL mindestens zwei Themes anbieten. Jedes Theme SHALL eine eigene Gestaltung
(Typografie, Farbwelt, Anordnung) und mindestens vier eigene Templates besitzen. Ein Template ist ein
kurzer deutscher Anerkennungstext, der zum Theme passt; Templates gehören genau einem Theme und
werden nicht zwischen Themes geteilt.

#### Scenario: Auswahl steht zur Verfügung

- **WHEN** der Nutzer die Seite öffnet
- **THEN** kann er zwischen mindestens zwei Themes wählen
- **AND** zu jedem gewählten Theme stehen mindestens vier Templates zur Auswahl

#### Scenario: Themes sind visuell unterscheidbar

- **WHEN** der Nutzer zwischen zwei Themes wechselt
- **THEN** unterscheiden sich Schrift und Farbgebung der Karte erkennbar

### Requirement: Zusicherungen an den Theme-Bestand

Jedes Theme und jedes Template SHALL eine innerhalb des Systems eindeutige Kennung und eine
nicht-leere deutsche Bezeichnung tragen. Kein Template SHALL einen leeren Text haben. Diese
Zusicherungen SHALL automatisiert überprüfbar sein, damit ein später ergänztes Theme sie nicht
unbemerkt verletzen kann.

#### Scenario: Neues Theme ohne ausreichend Templates

- **WHEN** ein Theme mit weniger als vier Templates zum Bestand hinzugefügt wird
- **THEN** schlägt die Überprüfung des Bestands fehl und benennt das betroffene Theme

#### Scenario: Doppelte Kennung

- **WHEN** zwei Themes oder zwei Templates desselben Themes dieselbe Kennung tragen
- **THEN** schlägt die Überprüfung des Bestands fehl

### Requirement: Vorbelegung beim Öffnen

Das System SHALL beim Öffnen der Seite ohne Zutun des Nutzers ein Theme und ein Template
vorauswählen, sodass sofort eine vollständig gestaltete Karte sichtbar ist.

#### Scenario: Erster Seitenaufruf

- **WHEN** der Nutzer die Seite zum ersten Mal öffnet
- **THEN** sind ein Theme und ein Template bereits ausgewählt
- **AND** die Vorschau zeigt eine gestaltete Karte mit Platzhaltern für die noch leeren Felder

### Requirement: Verhalten beim Theme-Wechsel

Wechselt der Nutzer das Theme, SHALL das System auf ein Template des neuen Themes umstellen, da
Templates theme-gebunden sind. Die vom Nutzer eingegebenen Inhalte — Empfänger, Absender und
Freitext — SHALL dabei unverändert erhalten bleiben.

#### Scenario: Wechsel erhält die Eingaben

- **WHEN** der Nutzer Empfänger, Absender und Freitext ausgefüllt hat und dann das Theme wechselt
- **THEN** stehen diese drei Eingaben unverändert in der Karte
- **AND** die Karte zeigt ein Template des neuen Themes

#### Scenario: Kein ungültiger Zwischenzustand

- **WHEN** der Nutzer das Theme wechselt
- **THEN** ist zu keinem Zeitpunkt ein Template ausgewählt, das nicht zum aktuellen Theme gehört
