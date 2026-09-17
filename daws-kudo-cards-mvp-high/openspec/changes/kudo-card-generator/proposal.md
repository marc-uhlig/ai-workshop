## Why

Persönliche Anerkennung verdient eine schnelle, schöne Form, die sich ohne Registrierung erstellen und teilen lässt. Ein browserbasierter Kudo-Card-Generator liefert hochwertige Karten zum Download und vermeidet dabei Konten und gespeicherte personenbezogene Daten.

## What Changes

- Neue responsive Webapp zum Erstellen einer Kudo-Card aus einer von vier Kategorien.
- Bearbeitbare Empfänger-, Nachrichten- und optionale Absenderfelder mit Live-Vorschau.
- Minimalistisches Kartendesign mit integrierten SVG-Elementen und kategoriebasierten Vorlagen.
- Export der fertigen Karte als PNG sowie druckbares A6-PDF.
- Vollständige lokale Verarbeitung ohne Account, Backend oder dauerhafte Speicherung.
- Unit-Tests für Kernlogik und E2E-Tests für Erstell- und Download-Flows.

## Capabilities

### New Capabilities

- `kudo-card-creation`: Erstellung, Gestaltung, Vorschau und Export von Kudo-Cards im Browser.
- `kudo-card-quality`: Qualitätsanforderungen für Responsivität, Zugänglichkeit und automatisierte Tests.

### Modified Capabilities

Keine.

## Impact

- Neues Frontend-Projekt mit TypeScript und React als angenommener Client-Stack.
- Client-seitige SVG-Assets und Browser-basierte PNG-/PDF-Generierung.
- Testwerkzeuge für Unit- und End-to-End-Tests.
- Keine externen APIs, Accounts, Datenbank oder Deployment-Konfiguration.
