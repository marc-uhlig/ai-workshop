## Context

Repository enthält noch keine Anwendung. Siehe `proposal.md` sowie Delta-Specs für Produktverhalten. Umsetzung muss lokal ohne Backend, Account oder Datenspeicherung laufen und dabei exportfähige Karten erzeugen.

## Goals / Non-Goals

**Goals:**

- Hochwertiger, reproduzierbarer PNG- und PDF-Export aus gleicher Kartenansicht.
- Kleine, klar abgegrenzte Client-Architektur mit testbarer Kernlogik.
- Zugängliche, responsive Bedienung für Desktop und Mobilgeräte.

**Non-Goals:**

- Benutzerkonten, Kartenarchiv, Freigabelinks oder Zusammenarbeit.
- Serverseitiges Rendering, APIs, Analytics oder Deployment.
- Frei konfigurierbarer Vorlageneditor und eigene Uploads.

## Decisions

### React, TypeScript, Vite

Client wird als React-/TypeScript-App mit Vite angelegt. React bietet eine saubere Trennung zwischen Editor, Vorschau und Export; TypeScript sichert Kategoriemodell und Exportoptionen ab. Alternative: statisches Vanilla-JavaScript. Das wäre kleiner, erschwert aber Komponententests und spätere Erweiterungen.

Der lokale Vite-Dev-Server verwendet Port `3451`, damit lokale Nutzung und E2E-Start einen festen Einstiegspunkt haben.

### Single source of truth for card state

Editor hält `recipient`, `message`, `sender`, und `category` in lokalem React-State. Preview und Export erhalten denselben normalisierten Kartenwert. Kein `localStorage` oder Remote-State. Alternative: Form-State direkt aus DOM lesen; das würde Vorschau und Export leichter auseinanderlaufen lassen.

### Data-driven category templates

Vier fest definierte Vorlagen liegen als getypte Konfiguration mit Farben, Labels und lokalen SVG-Komponenten vor. Keine externen Bild-URLs. Dadurch bleiben Design, Offline-Verhalten und Export deterministisch. Alternative: CMS/API oder externe Bildquellen; beides widerspricht Scope und erhöht CORS-/Verfügbarkeitsrisiko.

### DOM-based raster export and PDF embedding

Gleiche Preview-Komponente wird in festem 1080×1080-Pixel-Exportbereich gerendert, clientseitig nach PNG gerastert und für A6-PDF eingebettet. SVGs bleiben lokal und eingebettet. Alternative: getrennte Canvas-Zeichenroutine; sie senkt DOM-Abhängigkeit, dupliziert aber Layoutlogik und erhöht Drift-Risiko.

### Test pyramid

Vitest plus React Testing Library prüft reine Validierung, Vorlagenwahl und Exportparameter. Playwright prüft sichtbare Editor-/Preview-Flows, Downloads und 320-Pixel-Viewport. Alternative: nur E2E; langsamer und zu unpräzise für Zustandslogik.

## Risks / Trade-offs

- [Raster-Export unterscheidet sich je Browser] → feste Exportabmessungen, lokale Assets, Tests in Chromium sowie manuelle Prüfung vor Release.
- [Lange Texte überlaufen Karte] → Empfänger auf 40 und Nachricht auf 280 Zeichen begrenzen; mehrzeilige Layoutregeln und sichtbare Validierung nutzen.
- [PDF wirkt bei Druck unscharf] → PNG-Auflösung an A6-Druckmaß testen und Exportqualität manuell prüfen.
- [Client-Bundles wachsen durch Exportbibliotheken] → Abhängigkeiten prüfen; Exportcode bei Bedarf lazy laden.

## Migration Plan

Keine Migration: neues, zustandsloses Frontend. Rollback besteht aus Zurücknehmen der ausgelieferten App-Version; keinerlei Nutzerdaten oder Schema betroffen.
