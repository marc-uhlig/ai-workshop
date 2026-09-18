## Why

Anerkennung im Team versandet, weil es dafür kein Format gibt: Ein "danke, gut gemacht" im Chat
verschwindet nach zehn Minuten im Scrollback. Eine Kudos-Karte macht daraus ein kleines Artefakt,
das man weiterschicken, anheften und aufheben kann.

Der Weg dorthin muss trivial sein — Seite öffnen, vier Felder ausfüllen, Bild in der Zwischenablage.
Alles, was mehr Reibung erzeugt (Login, Speichern, Teilen-Links), würde genau die spontane Geste
verhindern, um die es geht.

## What Changes

- Neue Next.js-Anwendung (App Router, TypeScript) in diesem bisher leeren Ordner — eine einzige
  Route, kein Backend, keine Persistenz.
- Kartengestaltung über **Themes**: jedes Theme bringt eine eigene Typografie, Farbwelt und
  mindestens vier zu ihm passende deutsche **Templates** (Anerkennungstexte) mit. Zum Start
  `minimal` und `star-wars`.
- Karteninhalt aus vier Feldern: Empfänger, Template-Text, optionaler Freitext, Absender.
- Live-Vorschau, die exakt dem späteren Bild entspricht — die Vorschau *ist* das exportierte DOM.
- Export der fertigen Karte als PNG per Download **und** direkt in die Zwischenablage.
- Testaufbau: Vitest für Registry und reine Hilfsfunktionen, Playwright (Chromium) für die drei
  Kernabläufe. Playwright-Version exakt auf die Browser aus `flake.nix` gepinnt.

Keine Breaking Changes — der Ordner enthält bisher nur Toolchain-Dateien.

## Capabilities

### New Capabilities

- `kudos-card`: Aufbau und Inhalt einer Karte — die vier Felder, ihre Validierung und Grenzen,
  sowie die Live-Vorschau als verbindliche Darstellung des späteren Bildes.
- `card-themes`: Die Registry aus Themes und ihren Templates. Welche Zusicherungen ein Theme
  erfüllen muss, wie Themes und Templates zusammenhängen und wie beim Wechsel eines Themes mit
  der bereits getroffenen Template-Auswahl umgegangen wird.
- `card-export`: Überführung der Karte in ein PNG — Download mit sprechendem Dateinamen,
  Kopieren in die Zwischenablage, Auflösung des Bildes und das Verhalten, wenn eines von beidem
  fehlschlägt oder der Browser es nicht unterstützt.

### Modified Capabilities

Keine — dies ist die erste Capability-Ebene des Projekts.

## Impact

- **Neuer Code**: gesamte Anwendung (`app/`, `components/`, `lib/`), Testverzeichnisse,
  `package.json`, `next.config.ts`, `vitest.config.ts`, `playwright.config.ts`.
- **Neue Laufzeit-Abhängigkeiten**: `next` (16.2.x), `react`, `react-dom`, `html-to-image`.
- **Neue Entwicklungs-Abhängigkeiten**: `vitest`, `@testing-library/react`, `jsdom`,
  `@playwright/test` — letzteres **exakt** auf `1.63.0` gepinnt, weil `flake.nix` über
  `PLAYWRIGHT_BROWSERS_PATH` genau die Browser dieser Version bereitstellt. Eine abweichende
  Version sucht nach anderen Revisions-Ordnern und findet keinen Browser.
- **`flake.nix`**: ergänzt um `fontconfig` und eine Systemschrift, damit Chromium in der Nix-Shell
  überhaupt Text rendern kann.
- **Netz zur Build-Zeit**: `next/font/google` lädt die Schriften beim ersten Build herunter und
  hostet sie danach selbst aus der eigenen Origin.
- **Nicht betroffen**: alles außerhalb von `mvp/mira2/`.
