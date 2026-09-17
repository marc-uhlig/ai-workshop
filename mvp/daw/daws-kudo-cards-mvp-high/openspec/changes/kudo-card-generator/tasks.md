## 1. Projektbasis

- [x] 1.1 React-/TypeScript-/Vite-Projekt mit Dev-Server-Port `3451` einrichten und lokalen Start auf `http://localhost:3451` prüfen
- [x] 1.2 Vitest, React Testing Library und Playwright konfigurieren und erfolgreiche Ausführung leerer Test-Suites prüfen
- [x] 1.3 Globale Styles, Reset und responsive App-Grundstruktur anlegen und 320-Pixel-Viewport ohne horizontales Scrollen prüfen

## 2. Kartenmodell und Editor

- [x] 2.1 Getypte Karten- und Kategorie-Konfiguration für Danke, Teamwork, Erfolg und Motivation erstellen und Kategorien per Unit-Test prüfen
- [x] 2.2 Validierung für Pflichtfelder sowie Limits von 40 Zeichen für Empfänger und 280 Zeichen für Nachricht implementieren und Unit-Tests ausführen
- [x] 2.3 Zugänglichen Editor mit Empfänger-, Nachrichten-, optionalem Absenderfeld und Kategorieauswahl bauen; Tastaturbedienung manuell prüfen

## 3. Vorschau und Design

- [x] 3.1 Live-Kartenvorschau aus zentralem Karten-State umsetzen und Vorschau-Updates per Component-Test prüfen
- [x] 3.2 Vier minimalistische, lokal eingebettete SVG-Vorlagen implementieren und Kategorie-Wechsel bei erhaltenen Texteingaben prüfen
- [x] 3.3 Kartenlayout für lange erlaubte Texte und mobile Ansicht abstimmen und in 320-Pixel-Viewport visuell prüfen

## 4. Downloads

- [x] 4.1 Client-seitigen 1080×1080-PNG-Export aus Kartenansicht implementieren und Export-Konfiguration per Unit-Test prüfen
- [x] 4.2 Client-seitigen A6-PDF-Export aus gleicher Kartenansicht implementieren und lokal erzeugtes PDF prüfen
- [x] 4.3 Export-Controls bei ungültigen Eingaben sperren sowie Fehler zugänglich anzeigen und Component-Test ausführen

## 5. Qualitätssicherung

- [x] 5.1 Unit-Tests für Validierung, Kategorien, Preview-State und Exportparameter vervollständigen und Test-Suite ausführen
- [x] 5.2 Playwright-E2E-Test für komplette Kartenerstellung, Live-Vorschau, Kategorie-Wechsel und PNG-/PDF-Downloads erstellen und in Chromium ausführen
- [x] 5.3 Playwright-E2E-Test im 320-Pixel-Viewport sowie keyboard-basierte Kernbedienung erstellen und ausführen
- [x] 5.4 Produktions-Build, Unit-Tests und E2E-Tests ausführen und erfolgreiche Ergebnisse dokumentieren
