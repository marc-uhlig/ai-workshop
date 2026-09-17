## Why

Die vorhandenen Themes bieten klare Vektor- und Neon-Optiken, aber keine bewusst textbasierte Karte. Ein ASCII-Art-Theme erweitert die Auswahl um eine zugängliche Retro-Variante, deren Gestaltung sichtbar aus echten Zeichen besteht.

## What Changes

- Neues Theme „ASCII-Art“ mit genau vier themeneigenen Anlässen: „Danke dir“, „Großartige Arbeit“, „Stark im Team“ und „Erfolg verdient“.
- Für das ASCII-Art-Theme wird die Live-Vorschau als echte HTML-Textkarte in Monospace-Schrift statt als SVG ausgegeben.
- Der PNG-Export zeichnet Inhalt und ASCII-Motiv des Themes textbasiert auf das bestehende 1200 × 1200-Canvas.
- Unit- und End-to-End-Tests decken Auswahl, HTML-Textvorschau und PNG-Download des neuen Themes ab.

## Capabilities

### New Capabilities

- Keine.

### Modified Capabilities

- `kudo-card-creation`: Ergänzt das ASCII-Art-Theme und seine textbasierte Vorschau bei unverändertem Kartenformat und Exportablauf.
- `kudo-card-quality`: Ergänzt automatisierte Abdeckung für das ASCII-Art-Theme.

## Impact

Betroffen sind Theme-Katalog und Normalisierung, die Vorschau-Komponente, der Canvas-PNG-Exporter, die Styles sowie Unit- und End-to-End-Tests. Es werden keine externen Dienste oder zusätzlichen Abhängigkeiten benötigt.
