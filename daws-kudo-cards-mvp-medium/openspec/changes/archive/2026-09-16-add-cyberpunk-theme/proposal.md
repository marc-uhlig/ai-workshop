## Why

Die App kennt bislang nur vier minimalistische Vorlagen. Ein eigenständiges Cyberpunk-Theme erweitert die kreative Auswahl und schafft zugleich eine Struktur, mit der weitere Themes ohne Umbau des Editors ergänzt werden können.

## What Changes

- Der Editor erhält eine Theme-Auswahl; jedes Theme enthält genau vier eigene Anlässe.
- Das bestehende minimalistische Angebot wird als erstes Theme geführt und behält seine vier bisherigen Vorlagen.
- Ein zweites Theme "Cyberpunk" erhält die Anlässe „Signal Boost“, „Mission erfüllt“, „Starker Move“ und „Upgrade verdient“.
- Cyberpunk-Karten erhalten eine eigenständige, vektorbasierte Neon-Ästhetik, die in SVG-Vorschau und PNG-Download übereinstimmt.
- Theme- und Anlassdaten werden so modelliert, dass spätere Themes ergänzt werden können, ohne den Auswahl- oder Exportablauf zu ändern.

## Capabilities

### New Capabilities

Keine.

### Modified Capabilities

- `kudo-card-creation`: Theme-Auswahl, vier themenspezifische Anlässe und Cyberpunk-Rendering ergänzen den Karten-Erstellungsablauf.
- `kudo-card-quality`: Automatisierte Prüfungen decken Theme-Wechsel und Cyberpunk-Vorschau sowie -Export ab.

## Impact

Betroffen sind das Kartendatenmodell, der geführte Editor, SVG-Vorschau, Canvas-basierter PNG-Export sowie Unit- und End-to-End-Tests. Es werden keine Backends, Konten oder zusätzlichen Laufzeitdienste benötigt.
