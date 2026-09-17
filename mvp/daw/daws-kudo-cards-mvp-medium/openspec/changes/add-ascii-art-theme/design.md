## Context

Siehe proposal.md. Die Anwendung modelliert Themes und ihre Anlässe zentral und rendert die vorhandenen Karten als SVG; der PNG-Export nutzt eine separate Canvas-Zeichenroutine. Das neue Theme benötigt deshalb einen zweiten, aber klar abgegrenzten Preview-Pfad und eine gleichwertige Canvas-Darstellung.

## Goals / Non-Goals

**Goals:**

- Die ASCII-Art-Karte als tatsächlich selektierbaren, kopierbaren HTML-Text ausgeben.
- Vorschau und PNG-Inhalt aus demselben Theme- und Anlassmodell ableiten.
- Das feste Format 1200 × 1200 und die bestehenden Editor- und Exportregeln beibehalten.

**Non-Goals:**

- Keine Umstellung der minimalistischen oder Cyberpunk-Vorschau.
- Keine frei editierbare ASCII-Zeichenfläche, neue Theme-Verwaltung oder externe Schriftdateien.

## Decisions

### Eigene HTML-Textvorschau nur für ASCII-Art

Die Vorschau-Komponente verzweigt anhand des Theme-Identifiers und gibt für ASCII-Art ein semantisches Textelement mit Monospace-Stil, Zeilenumbrüchen und zugänglicher Beschriftung aus. Die bestehenden Themes behalten ihre SVG-Vorschau.

Eine SVG mit Textknoten wurde verworfen: Sie sähe zwar ähnlich aus, erfüllte aber nicht die Anforderung einer echten Textanzeige.

### Deterministische ASCII-Motive pro Anlass

Jeder der vier Anlässe erhält ein festes ASCII-Motiv und eine eigene Farbpalette innerhalb eines ruhigen Terminal-/Retro-Stils. Nachricht und Absender werden in ein begrenztes Textlayout eingebettet, damit sie nicht über das quadratische Kartenformat laufen.

Frei eingegebene Motive wurden verworfen, weil sie Validierung, Layout und Export wesentlich vergrößern würden.

### Canvas als gemeinsame Exportquelle

Der PNG-Exporter übernimmt für ASCII-Art dieselben Texte, Zeilenumbrüche, Farben und Motive wie die HTML-Vorschau und zeichnet sie direkt per Canvas-Textoperationen. Der Export bleibt ein 1200 × 1200-PNG ohne zusätzliche Abhängigkeit.

Eine DOM-zu-Bild-Konvertierung wurde verworfen, weil sie für Textmessung und Browser-Kompatibilität zusätzliche Abhängigkeiten oder wechselnde Ergebnisse einführen würde.

## Risks / Trade-offs

- [HTML- und Canvas-Schriftmetriken weichen leicht voneinander ab] → Eine verbreitete System-Monospace-Schrift und feste Zeilenhöhen verwenden; Abweichungen im Browser-Test prüfen.
- [Lange Nachrichten verdrängen das Motiv] → Bestehende Zeichenbegrenzung und eine begrenzte Anzahl umbrochener Zeilen weiterhin anwenden.
- [Gemischte Preview-Techniken erschweren Tests] → Preview je Theme über stabile, semantische Selektoren testen und die gemeinsamen Daten separat per Unit-Test absichern.

## Migration Plan

1. Theme-Katalog und Normalisierung um ASCII-Art ergänzen.
2. HTML-Textvorschau und Canvas-Export implementieren.
3. Styles sowie Unit- und End-to-End-Tests ergänzen.
4. Bei einem Rückbau kann das Theme aus dem Katalog entfernt werden; bestehende Themes und gespeicherte Daten sind nicht betroffen.
