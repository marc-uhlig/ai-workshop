## Context

Grüne Wiese: `mvp/mira2/` enthält bisher nur `flake.nix`, `flake.lock`, `.envrc` und das
OpenSpec-Verzeichnis. Die Nix-Entwicklungsumgebung gibt den Rahmen vor:

- Node 24, pnpm, python3
- `PLAYWRIGHT_BROWSERS_PATH` zeigt auf die Browser aus `nixpkgs-unstable` — derzeit **Playwright 1.63.0**
- `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`, es wird also nichts nachinstalliert

Zur Motivation siehe `proposal.md — Why`; zu den Verhaltensanforderungen die drei Spec-Dateien unter
`specs/`. Dieses Dokument beantwortet nur die Frage, wie das gebaut wird.

## Goals / Non-Goals

**Goals:**

- Eine einzige Renderquelle für die Karte, damit Vorschau und Export gar nicht erst auseinanderlaufen können
- Themes so ablegen, dass ein weiteres Theme reine Daten plus ein CSS-Block ist — kein Codeeingriff
- Die Logik, die sich lohnt zu testen, aus den React-Komponenten heraushalten (reine Funktionen)
- Eine Testeinrichtung, die in der Nix-Shell ohne Netzzugang und ohne Browser-Download läuft

**Non-Goals:**

- Kein Server-Zustand, keine Datenbank, keine Authentifizierung
- Keine visuellen Regressionstests (Screenshot-Snapshots) in diesem Schritt
- Keine Mehrsprachigkeit — die Oberfläche ist deutsch, ohne i18n-Schicht
- Kein eigener Bild-Upload und keine benutzerdefinierten Farben

## Decisions

### 1. Das PNG entsteht im Browser aus dem echten DOM (`html-to-image`)

Die Vorschau-Komponente wird per Ref an eine Exportfunktion gereicht, die den Knoten in ein
PNG-Blob überführt.

**Alternativen:**

| Ansatz | Warum verworfen |
|---|---|
| `next/og` / `ImageResponse` (Satori, serverseitig) | Satori unterstützt nur ein CSS-Subset: kein Grid, kein `backdrop-filter`, keine Blend-Modi — genau die Mittel, mit denen sich `minimal` und `star-wars` optisch wirklich unterscheiden. Zudem wären Vorschau und Export zwei getrennte Renderer, die synchron gehalten werden müssten. Der übliche Vorteil (serverseitig deterministisch, gut testbar) verliert an Gewicht, weil die Anwendung ohnehin zustandslos ist. |
| Karte direkt auf `<canvas>` zeichnen | Pixelgenau und gut testbar, verlangt aber eine selbstgebaute Miniatur-Layout-Engine für Textumbruch, Zeilenhöhe und Ausrichtung. Der Aufwand steht in keinem Verhältnis zum MVP. |

**Preis dieser Entscheidung:** Schriften müssen beim Export eingebettet werden, und die
Exportfunktion ist nur im echten Browser sinnvoll prüfbar — nicht in jsdom. Beides ist eingeplant
(siehe Punkt 5).

Konkret: `pixelRatio: 2` auf einer Karte von 1200×675 CSS-Pixeln ergibt stets 2400×1350 Bildpunkte,
unabhängig vom Gerät. Die Vorschau wird per CSS-Transform in den verfügbaren Platz skaliert; die
exportierte Größe hängt dadurch nicht am Viewport.

### 2. Schriften über `next/font/google`

`next/font/google` lädt die Schriftdateien zur **Build-Zeit** herunter und liefert sie danach aus der
eigenen Origin aus. Damit sind sie gleichursprünglich und lassen sich beim Export als Data-URI
einbetten.

Ein `<link>` auf `fonts.googleapis.com` im `<head>` wäre nicht gleichwertig: Die Schriftdateien kämen
dann von einer fremden Origin und ließen sich nicht einbetten — die Karte fiele im PNG auf eine
Systemschrift zurück. Lokale `.woff2`-Dateien im Repository wären ebenfalls möglich, brächten aber
Binärdateien in die Versionskontrolle, ohne etwas zu gewinnen.

- `minimal` → **Inter** (neutrale Groteske, gute Umlaute)
- `star-wars` → **Libre Franklin** (naher freier Verwandter von News Gothic, der Schrift des Vorspann-Crawls)

Die Schriften werden als CSS-Variablen bereitgestellt; ein Theme wählt seine Schrift damit genauso
deklarativ wie seine Farben.

### 3. Themes als reine Datenregistry, Gestaltung über CSS-Variablen

```
lib/themes.ts          Theme[] — id, label, fontVar, templates[≥4]
app/themes.css         ein [data-theme="…"]-Block je Theme
components/CardPreview eine Komponente, die data-theme setzt
```

Die Registry enthält keinerlei Rendering. Dadurch sind die Zusicherungen aus
`specs/card-themes` (mindestens vier Templates, eindeutige Kennungen, keine leeren Texte) als
schlichte Unit-Tests über Daten prüfbar — der billigste denkbare Schutz gegen ein später schludrig
ergänztes Theme.

Templates sind theme-gebunden (siehe `specs/card-themes`). Beim Theme-Wechsel wird deshalb auf das
erste Template des neuen Themes umgestellt; die Nutzereingaben bleiben in einem davon getrennten
Zustandsobjekt und sind vom Wechsel nicht betroffen.

Das dritte Theme ist bewusst nicht Teil dieses Changes: zwei Themes genügen, um die Abstraktion zu
belegen, und halten die Gestaltungsarbeit in einem Rahmen, der noch sorgfältig ausgeführt werden kann.

### 4. Zustand ausschließlich in React, eine Route

`app/page.tsx` ist eine Client-Komponente mit einem `useState` für das Kartenobjekt. Kein
URL-Parameter, kein `localStorage`, kein Router-State — die Zustandslosigkeit aus dem Proposal ist
damit nicht bloß eingehalten, sondern strukturell erzwungen.

Aufteilung:

```
app/
  layout.tsx            Fonts, globale Variablen
  page.tsx              Zustand, verbindet Editor und Vorschau
  globals.css, themes.css
components/
  CardEditor.tsx        Formular
  CardPreview.tsx       forwardRef — genau dieser Knoten wird exportiert
  ExportBar.tsx         Download + Kopieren, Lade- und Fehlerzustand
lib/
  themes.ts             Registry (reine Daten)
  card.ts               Typen, Validierung, Grenzen
  filename.ts           Empfängername → Dateiname (Umlaut-Transliteration)
  export-png.ts         DOM-Knoten → Blob
  clipboard.ts          Blob → Zwischenablage
```

### 5. Clipboard: das Promise muss synchron übergeben werden

```js
// ✗ Safari bricht ab: das Blob entstand außerhalb der Nutzergeste
const blob = await toBlob(node)
await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])

// ✓ Promise unmittelbar übergeben, nicht vorher auflösen
await navigator.clipboard.write([
  new ClipboardItem({ 'image/png': toBlob(node) })
])
```

`clipboard.ts` kapselt genau das und meldet fehlende Unterstützung (kein `navigator.clipboard`, kein
`ClipboardItem`, unsicherer Kontext) als eigenen, unterscheidbaren Fall zurück — die Oberfläche kann
dann laut `specs/card-export` auf den Download verweisen.

### 6. Testaufteilung: Vitest für Daten und reine Funktionen, Playwright für alles Echte

| Ebene | Werkzeug | Umfang |
|---|---|---|
| Unit | Vitest | Theme-Registry-Zusicherungen, Validierung und Längengrenzen, Dateinamen-Ableitung inkl. Umlaute und Leer-Fall, Zustandsübergang beim Theme-Wechsel |
| Komponente | Vitest + Testing Library (jsdom) | Vorschau spiegelt Eingaben, Export-Schaltflächen bei fehlenden Pflichtfeldern gesperrt |
| E2E | Playwright, **nur Chromium** | drei Abläufe: Theme wechseln, Download, Kopieren |

Nur Chromium, weil Playwright die Berechtigung `clipboard-read` realistisch nur dort erteilen kann —
in Firefox und WebKit wäre der wichtigste der drei Abläufe gar nicht prüfbar. Drei Browser zu fahren
hieße also, zwei Drittel der Läufe für eine Teilmenge der Aussagen zu bezahlen.

Der Download-Test prüft nicht das Aussehen, sondern dass überhaupt gültige Bytes ankommen: die
PNG-Signatur `89 50 4E 47` am Dateianfang und der erwartete Dateiname. Das fängt genau die
Fehlerklasse, die hier real droht — Export wirft still, Blob ist leer, Datei ist 0 Byte groß.

Bewusst ausgelassen: `toHaveScreenshot`. Snapshots wären der einzige echte Schutz für „sieht gut aus",
aber sie verlangen eine bis auf die Schriftglyphe reproduzierbare Umgebung und erzeugen laufende
Pflege. Für diesen Umfang wäre das Ballast, nicht Sicherheit.

### 7. Playwright exakt auf 1.63.0 gepinnt

In `package.json` steht `"@playwright/test": "1.63.0"` — ohne Caret, ohne Tilde. `flake.nix` setzt
`PLAYWRIGHT_BROWSERS_PATH` auf das Browserpaket aus `nixpkgs-unstable`, und jede Playwright-Version
sucht dort nach Verzeichnissen mit einer versionsspezifischen Revisionsnummer. Eine abweichende
Minor-Version findet schlicht keinen Browser, und weil `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` gesetzt
ist, lädt sie auch keinen nach. Der Fehler erscheint dann als „Executable doesn't exist" und nicht als
Versionskonflikt — deshalb gehört die Begründung als Kommentar direkt neben die Zeile in `package.json`.

Steigt das Flake-Update die Browser irgendwann hoch, muss die Zahl an beiden Stellen gemeinsam
wandern. `playwright.config.ts` bekommt einen Startvorgang über `pnpm dev` per `webServer`, damit
Tests ohne manuell gestarteten Server laufen.

## Risks / Trade-offs

**Schrifteinbettung schlägt fehl und niemand merkt es** → Der Export fällt dann still auf eine
Systemschrift zurück; das PNG ist da, sieht aber falsch aus, und kein Byte-Test schlägt an. Gegenmaßnahme:
Schriften ausschließlich gleichursprünglich über `next/font` (Entscheidung 2), und beim ersten
manuellen Durchlauf pro Theme einmal hinsehen. Dies ist die Lücke, die visuelle Snapshots schließen
würden — bewusst offen gelassen.

**Nix-Shell ohne Systemschriften** → Chromium rendert dort mangels `fontconfig` gar keinen oder
falschen Text. Für DOM-Assertions folgenlos, aber jeder manuelle Screenshot führt in die Irre.
Gegenmaßnahme: `fontconfig` und eine Schrift in `flake.nix` ergänzen (Teil dieses Changes).

**Erster Build braucht Netzzugang** → `next/font/google` lädt die Schriften einmalig herunter.
Gegenmaßnahme: Danach liegen sie im Next-Cache; ein reproduzierbarer Offline-Build wäre nur mit
lokalen `.woff2`-Dateien zu haben — der Tausch lohnt sich für ein MVP nicht.

**Playwright-Version und Flake driften auseinander** → Nach einem `nix flake update` scheitern alle
E2E-Tests mit einer irreführenden Meldung. Gegenmaßnahme: exakter Pin plus erklärender Kommentar an
beiden Stellen (Entscheidung 7).

**`html-to-image` verhält sich zwischen Browsern unterschiedlich** → Es arbeitet über
SVG-`foreignObject`; Randfälle wie Pseudo-Elemente oder `mix-blend-mode` werden nicht überall gleich
rasterisiert. Gegenmaßnahme: Themes mit Mitteln gestalten, die sicher tragen (Farben, Typografie,
Abstände, einfache Verläufe) und exotische Effekte meiden — was dem Anspruch „minimalistisch" ohnehin
entgegenkommt.

**Freitext sprengt das Layout** → Die Zeichengrenze aus `specs/kudos-card` schützt vor der Menge, nicht
vor einem einzelnen sehr langen Wort. Gegenmaßnahme: Umbruchverhalten der Karte so wählen, dass auch
ein überlanges Wort umbricht statt überzulaufen, und diesen Fall in der Komponentenprüfung mitnehmen.

## Migration Plan

Entfällt — Neuanlage in einem leeren Ordner, kein Bestand, keine Daten, kein Rollback nötig. Die
einzige Änderung an bestehenden Dateien ist die Ergänzung von `fontconfig` in `flake.nix`.

## Open Questions

- Welche Systemschrift in `flake.nix` aufgenommen wird, ist eine Geschmacksfrage ohne Einfluss auf
  Spezifikation oder Aufgabenschnitt — sie betrifft nur, was ein Entwickler bei einem manuellen
  Screenshot sieht. Entscheidung bei der Umsetzung.
