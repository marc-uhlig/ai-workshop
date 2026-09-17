## 1. Theme-Daten

- [x] 1.1 Den Theme-Katalog, Identifier- und Motivtypen um ASCII-Art mit „Danke dir“, „Großartige Arbeit“, „Stark im Team“ und „Erfolg verdient“ ergänzen und per Unit-Test genau vier Anlässe sowie die Default-Auswahl verifizieren.
- [x] 1.2 Die Theme-Normalisierung für ASCII-Art prüfen und per Unit-Test sicherstellen, dass ein Theme-Wechsel Nachricht und Absender behält und den ASCII-Art-Standardanlass setzt.

## 2. Textkarte und Export

- [x] 2.1 Für ASCII-Art eine zugängliche HTML-Textvorschau mit Monospace-Layout, Anlassmotiv, Nachricht und optionalem Absender implementieren und das sichtbare Kartenformat prüfen.
- [x] 2.2 Die ASCII-Art-Farb- und Layoutstile ergänzen und verifizieren, dass sie die quadratische Vorschau lesbar begrenzen, ohne SVG für dieses Theme zu verwenden.
- [x] 2.3 Den Canvas-PNG-Export um dieselben ASCII-Art-Texte, Motive und Farben erweitern und verifizieren, dass ein 1200 × 1200-PNG entsteht.

## 3. Qualitätssicherung

- [x] 3.1 Unit-Tests für den ASCII-Art-Katalog, die Auswahl-Normalisierung und die Exportkonfiguration ergänzen und mit `npm test` ausführen.
- [x] 3.2 Einen End-to-End-Test für Auswahl von ASCII-Art und Anlass, native Textvorschau, Nachricht und PNG-Download ergänzen und mit `npm run test:e2e` ausführen.
- [x] 3.3 Den Produktions-Build mit `npm run build` ausführen und die vollständige Test-Suite als grün verifizieren.
