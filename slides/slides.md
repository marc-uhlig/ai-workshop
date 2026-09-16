---
title: AI Workshop
theme: white
transition: none
highlight-theme: github
revealOptions:
  controls: true
  progress: true
  slideNumber: true
---

# AI Workshop

subtitle

---

## Agenda

1. AI Prinzipien - 15 min - @mira
2. Tools vorstellen - 10 min - @mira
3. Tools installieren - 30 min - ✅
4. Grundlagen eines MVPs - 20 min - @daw

Pause

5. Vorstellen Beispiel MVP - 5 min
6. Umsetzung eines Beispiel-MVPs - 1:00h - @mira/@daw
7. Fragen - 10 min - ✅

---

## Notes

- Ziel: Wie gehe ich einen MVP an
- 2. Tools vorstellen - 15 min - @mira
  - inkl. Beispiel Prompt mit OpenSpec
- Tools einrichten in:
  - CLI
  - Desktop App
- Plugins/Skills/MCP installieren
  - Context7
  - Openspec
  - ui-ux-pro-max-skill
  - specialized skills ansprechen
- Umgang mit Openspec
- Was ist ein MVP
  - Grenzen definieren
  - manuell mocken
  - wann ist er fertig
- Praxis: Umsetzen eines Beispiel-MVPs
- 2er Teams ?
- Beispiel-MVP:
  - Kudos-Card Webpage
  - Plain spin
    - Kollegen nehmen eigenen Spin
  - unit tests, e2e tests

---

### TODO

- investigate how to generate images programatically

- Claude Desktop @mira
  - Tools installieren
- ChatGPT Desktop @daw
  - Tools installieren

- MVP umsetzen beispielhaft

---

#### Image Generation

- Claude Code & Codex können beide SVG's generieren -> gut genug für MVP
- vielleicht ist das auch ein Learning
  - -> hängt euch nicht auf an den Bildern
  - diese kann man später noch ergänzen

---

### MVP Features

1. Kudos-Card generieren
  - Text eingeben, 1 Theme, 4 Templates, Bild anzeigen
  - Bild herunterladen
  - Bild in in Zwischenablage speichern
2. Unterstützung mehrerer Themes
  - mindestens zwei Themes mit je 4 Templates
3. Ascii-Theme (optional)
  - erstelle Kudos-Card nur mit Ascii-Zeichen
  - button zum in die Zwischenablage kopieren

---

## 1. AI Prinzipien

Wie funktioniert das, was wir täglich benutzen?

---

### Ein Modell ist wie eine Funktion

- Text rein, Text raus
- Was dazwischen passiert, bleibt nach außen eine Black Box
- Kein Verständnis, keine Absicht dahinter

---

### Zustandslos

- Kein eingebautes Gedächtnis zwischen Aufrufen
- Jede Anfrage schickt den kompletten Verlauf erneut mit
- "Memory"-Funktionen simulieren das nur von außen

---

### Nicht deterministisch

- Antwort wird aus einer Wahrscheinlichkeitsverteilung gezogen
- Gleiche Frage → leicht andere Antwort möglich
- Halluzination ist kein Bug – gleiche Mechanik wie eine richtige Antwort

---

### Woher weiß das Modell etwas?

- **Trainingsdaten** – eingefroren in den Gewichten
- **Kontext** – alles, was gerade mitgeschickt wird
- Werkzeuge/MCP sind kein dritter Kanal – sie befüllen nur den Kontext, bevor das Modell aufgerufen wird

---

### Tokens

- Kein Wort, sondern ein Wortstück
- Beispiel: <https://platform.openai.com/tokenizer>
- Grundlage für Kosten, Limits und Geschwindigkeit

---

### Der Kontext

- Alles, was das Modell bei einer Anfrage "sieht"
- System-Prompt, Tool-Beschreibungen, Verlauf, Werkzeug-Ergebnisse
- Ein gemeinsames, begrenztes Budget

---

### Was ist der "Harness"?

- Die Anwendung rund um das Modell: Claude Code, Codex, ChatGPT, Claude Desktop, ...
- Sie ruft das Modell auf, verwaltet den Kontext und führt Werkzeuge aus
- Das Modell selbst "weiß" davon nichts – für das Modell ist alles nur Text im Kontext

---

### Der Agentic Loop

1. Harness schickt Kontext an das Modell
2. Modell antwortet: Text **oder** Werkzeug-Aufruf
3. Harness führt den Aufruf aus
4. Ergebnis kommt zurück in den Kontext
5. Wiederholen, bis das Modell fertig ist

---

### Werkzeuge (Tools)

- Das Modell **fordert** eine Aktion nur an
- Der Harness **führt sie aus** (Datei lesen, Befehl ausführen, ...)
- Ein Tool ist nur Name + Beschreibung + Schema – als Text im Kontext

---

### MCP – Model Context Protocol

- Standard, um externe Werkzeuge/Daten anzubinden
- Ein Server funktioniert in jedem Harness (Claude Code, Desktop, ...)
- "USB-C für Tools": einmal bauen, überall einstecken

---

### Skills, Plugins, MCP – wer macht was?

- **Skill**: Anleitung, die bei Bedarf nachgeladen wird
- **MCP**: externe Fähigkeit oder Datenquelle (eigener Server)
- **Plugin**: Bündel aus beidem – reines Verpackungskonzept des Harnesses

---

### Vertrauensgrenze: Permission Scope

- Harness entscheidet, was ohne Rückfrage ausgeführt werden darf
- Freigaben gelten pro Tool, Projekt oder global
- Deshalb die Bestätigungs-Nachfragen in Claude Code & Co.

---

### Werkzeug-Ergebnisse sind Daten, keine Befehle

- Alles, was ein Tool zurückgibt, landet im gleichen Kontext
- Das Modell kann Daten nicht strukturell von echten Anweisungen unterscheiden
- Wichtig, sobald Werkzeuge/MCP externe oder fremde Inhalte lesen

---

### Bonus: Agenten, die Agenten rufen

- Ein Subagent ist derselbe Loop – nur verschachtelt
- Eigener, sauberer Kontext, z. B. für Recherche oder Suche
- Kostet mehr Tokens, spart aber Fokus oder Zeit (parallel)

---

## 2. Tools vorstellen

### Welches Model für welchen Skill

- explore/propose: high effort
  - Codex: Sol/Terra
  - Claude: Opus high
- apply: medium effort
  - Codex: Terra
  - Claude: Sonnet medium
- archive: medium effort
  - Codex: Terra
  - Claude: Sonnet medium

---

## 3. Tools installieren

---

<!-- markdownlint-disable MD032 MD033 MD034 -->

## 4. Grundlagen eines MVPs

<div class="mvp-section-title">
  <p>Von der Produktidee zur kleinsten<br>demonstrierbaren Kernreise</p>
</div>

<aside class="notes">
Zeit: etwa 1 Minute.

Wir haben jetzt die Tools gesehen und eingerichtet. Bevor wir damit losbauen, möchte ich kurz über den Zuschnitt sprechen. Denn AI hilft uns dabei, schneller zu bauen. Sie verhindert aber nicht, dass wir das Falsche oder einfach viel zu viel bauen.

Die Frage für die nächsten 20 Minuten ist deshalb: Wie schneiden wir eine Produktidee so klein, dass am Ende des Hackathons eine funktionierende Kernreise steht?

Es geht hier nicht um eine allgemeine Product-Management-Schulung. Es geht um eine konkrete Arbeitsweise für diesen Hackathon. Am Ende muss das Produkt lokal laufen und live demonstrierbar sein. Deployment gehört nicht zum MVP.

Übergang: Schauen wir uns dafür erst mal zwei mögliche Hackathon-Ergebnisse an.

[Sources]
- https://klosebrothers.atlassian.net/wiki/spaces/KB/pages/2993422337/Hackathon
</aside>

---

## Ein MVP ist ein Beweis

<div class="mvp-compare">
  <div>
    <h3>Team A</h3>
    <p>Viele Bausteine</p>
    <p class="mvp-muted">Kein kompletter Weg</p>
  </div>
  <div>
    <h3>Team B</h3>
    <p>Ein Happy Path</p>
    <p class="mvp-success">Nutzen sichtbar</p>
  </div>
</div>

> Ein kompletter Weg schlägt fünf halbfertige Features.

<aside class="notes">
Zeit: etwa 3 Minuten.

Stellt euch zwei Teams vor. Team A hat richtig viel gebaut: Login, Rollen, Datenbank, vielleicht sogar schon ein Dashboard. Alles sieht nach Fortschritt aus. Aber wenn ein Nutzer vor der Anwendung sitzt, kommt er noch nicht von einem Startpunkt zu einem brauchbaren Ergebnis.

Team B hat deutlich weniger. Vielleicht gibt es nur einen Testnutzer. Vielleicht sind Daten fest hinterlegt. Das Design ist noch nicht besonders schön. Aber ein kompletter Weg funktioniert.

Für den Hackathon hat Team B das bessere MVP.

Team B kann den versprochenen Nutzen zeigen. Ein echter Nutzer könnte den Ablauf testen. Und wir bekommen Feedback zum Produkt, nicht nur zur Technik.

Ein MVP ist für mich deshalb kein kleines fertiges Produkt. Es ist ein Beweis. Wir beweisen, dass eine bestimmte Person mit unserer Lösung ein relevantes Ergebnis erreichen kann.

Übergang: Dafür müssen allerdings alle drei Buchstaben von MVP stimmen.

[Sources]
- https://klosebrothers.atlassian.net/wiki/spaces/KB/pages/2993422337/Hackathon
</aside>

---

## Minimum allein reicht nicht

<div class="mvp-acronym">
  <div><strong>M</strong><span>Minimum</span><small>minimal</small></div>
  <div><strong>V</strong><span>Viable</span><small>nutzbar</small></div>
  <div><strong>P</strong><span>Product</span><small>Produkt</small></div>
</div>

> Die kleinste Lösung, die echten Nutzen beweist.

<aside class="notes">
Zeit: etwa 2 Minuten.

Beim MVP schauen viele zuerst auf das M: möglichst klein, möglichst wenig Aufwand. Das ist verständlich, aber allein noch nicht genug.

Minimum heißt: Wir bauen nur das, was wir für den Beweis brauchen. Viable heißt: Trotz des kleinen Umfangs entsteht ein echter Nutzen. Product heißt: Dieser Nutzen entsteht für eine konkrete Person mit einem konkreten Problem.

Ein Chatfenster mit einem Modell dahinter ist noch kein Produkt. Eine API ist noch kein Produkt. Auch ein schickes Dashboard ist noch kein Produkt. Das Produkt beginnt dort, wo für jemanden ein Problem besser gelöst wird.

Für den Hackathon kommt die wirtschaftliche Seite dazu: Wer ist der Zielkunde? Wer könnte bezahlen? Welcher Einnahmekanal wäre denkbar? Wir müssen die Bezahlung noch nicht implementieren. Aber wir sollten erklären können, warum jemand dafür bezahlen könnte.

Übergang: Um das herauszufinden, starten wir nicht bei den Features, sondern beim Wertmoment.

[Sources]
- https://klosebrothers.atlassian.net/wiki/spaces/KB/pages/2993422337/Hackathon
- https://github.com/klosebrothers/hackathon/blob/main/prompts/EXISTIERENDEIDEE.md
</aside>

---

## Beginnt beim Wertmoment

<div class="mvp-formula">
  <small>Beispiel: Kudos Card</small>
  <p>Eine Kollegin erstellt aus drei Stichpunkten eine persönliche Kudos-Karte und teilt sie direkt.</p>
</div>

### Welcher Moment beweist den Nutzen?

<aside class="notes">
Zeit: etwa 3 Minuten.

Bevor wir über Screens, Datenbanken oder Frameworks sprechen, sollten wir einen einfachen Satz vervollständigen können: Ein bestimmter Nutzer tut etwas und erhält ein sichtbares Ergebnis.

Für das Beispiel mit der Kudos Card könnte das heißen: Eine Kollegin möchte jemandem Anerkennung geben. Sie erstellt eine persönliche Karte und kann sie direkt teilen.

Der Wertmoment ist nicht, dass sie die Website geöffnet hat. Er ist auch nicht, dass irgendwo AI verwendet wurde. Der Wertmoment ist die fertige Karte, die sie tatsächlich verschicken kann.

Hilfreiche Fragen: Was sieht oder besitzt der Nutzer am Ende, was er vorher nicht hatte? Welcher Moment macht den Nutzen sofort verständlich? Könnten wir genau diesen Moment in vier Minuten demonstrieren?

Erst wenn der Wertmoment klar ist, sollten wir Features auswählen.

Übergang: Jetzt müssen wir einen möglichst kleinen Weg bis zu diesem Moment bauen.

[Sources]
- https://github.com/klosebrothers/hackathon/blob/main/prompts/IDEENSUCHE.md
- https://github.com/klosebrothers/hackathon/blob/main/prompts/EXISTIERENDEIDEE.md
</aside>

---

## Schneidet vertikal – bis zum Ergebnis

<div class="mvp-scope-visual">
  <div class="mvp-scope-option">
    <h3>Schichten bauen</h3>
    <div class="mvp-layer-stack"><span>UI</span><span>API</span><span>Datenbank</span></div>
    <p>Viel angefangen.<br>Nichts erlebbar.</p>
  </div>
  <div class="mvp-scope-arrow">→</div>
  <div class="mvp-scope-option mvp-scope-option-good">
    <h3>Kernreise bauen</h3>
    <div class="mvp-journey-line"><span>Start</span><b>→</b><span>Wertmoment</span></div>
    <p>Schmal. Aber komplett.</p>
  </div>
</div>

<aside class="notes">
Zeit: etwa 3 Minuten.

Beim horizontalen Schnitt bauen wir Schichten. Wir haben schon ein bisschen UI, ein bisschen API und ein Datenbankschema. Jede Schicht ist vielleicht zu 70 Prozent fertig. Trotzdem kann niemand den ganzen Ablauf nutzen.

Der vertikale Schnitt geht einmal komplett durch das System. Er ist bewusst schmal, aber er reicht vom Start bis zum Ergebnis.

Das darf am Anfang sehr einfach sein: ein Nutzer statt eines vollständigen Rollenmodells, ein Happy Path statt aller Sonderfälle, vorbereitete Daten statt einer Admin-Oberfläche und eine Funktion statt einer ganzen Plattform.

Für den Hackathon sollte die Kernreise höchstens fünf Schritte haben. Wenn sie sich nicht in vier Minuten ruhig demonstrieren lässt, ist sie wahrscheinlich noch zu groß.

Ein schmaler Weg, der komplett funktioniert, ist unser Ziel.

Übergang: Damit kommen wir zu der unangenehmen Frage: Was bauen wir wirklich und was nicht?

[Sources]
- https://klosebrothers.atlassian.net/wiki/spaces/KB/pages/2993422337/Hackathon
- https://github.com/klosebrothers/hackathon/blob/main/templates/IDEENEINREICHUNG.md
</aside>

---

## Bauen, simulieren oder streichen

<div class="mvp-decisions">
  <div>
    <h3>Bauen</h3>
    <p>Kartentext erzeugen<br>Karte teilen</p>
  </div>
  <div>
    <h3>Simulieren</h3>
    <p>Fester Testnutzer<br>Beispieldaten</p>
  </div>
  <div>
    <h3>Streichen</h3>
    <p>Rollen &amp; Rechte<br>Admin-Bereich</p>
  </div>
</div>

> Den Kernnutzen niemals simulieren.

<aside class="notes">
Zeit: etwa 3 Minuten.

Für jedes Feature gibt es drei mögliche Entscheidungen. Wir können es bauen, wir können es simulieren oder wir können es streichen.

Bauen sollten wir den Kernnutzen, den USP und eine technisch riskante Stelle, ohne die der Produktbeweis nicht funktioniert.

Simulieren können wir austauschbare Infrastruktur: einen fest hinterlegten Testnutzer statt Login, Beispieldaten statt Importfunktion, einen Stub statt einer externen Integration oder eine manuelle Administration.

Streichen können wir Rollen, Settings, vollständiges Onboarding, Sonderfälle und alles, was nur „wäre cool“ ist.

Manuelle Schritte hinter den Kulissen sind okay, wenn wir sie offen benennen. Was wir nicht machen sollten: den eigentlichen Kernnutzen vortäuschen.

Infrastruktur dürfen wir simulieren. Den versprochenen Nutzen nicht.

Übergang: Wenn wir so schneiden, brauchen wir noch eine klare Antwort darauf, wann wir fertig sind.

[Sources]
- https://github.com/klosebrothers/hackathon/blob/main/prompts/EXISTIERENDEIDEE.md
- https://klosebrothers.atlassian.net/wiki/spaces/KB/pages/2993422337/Hackathon
</aside>

---

## Wann ist das MVP fertig?

<div class="mvp-done">
  <p>✓ Kernreise funktioniert</p>
  <p>✓ Nutzen ist sichtbar</p>
  <p>✓ Lokal startbar und demonstrierbar</p>
  <p>✓ Produktiv deploybar – ohne grundlegenden Umbau</p>
</div>

<aside class="notes">
Zeit: etwa 2 Minuten.

Frontend fertig, Backend angebunden oder AI funktioniert sind keine guten Fertig-Kriterien. Das sind technische Tätigkeiten. Sie sagen noch nichts darüber aus, ob der Nutzer sein Ziel erreicht.

Gute Kriterien kann jemand beobachten und überprüfen: Die Kernreise läuft ohne Eingriff eines Entwicklers. Am Ende ist der versprochene Nutzen sichtbar. Das Projekt lässt sich mit einem dokumentierten Befehl lokal starten. Und der komplette Weg passt in die vierminütige Live-Demo.

Für die Einreichung reichen drei bis fünf solcher Kriterien. Wichtig ist, dass am Ende kein Interpretationsspielraum bleibt.

Deployment selbst gehört ausdrücklich nicht zum Hackathon. Das MVP sollte aber ohne grundlegenden Umbau produktiv deploybar sein. Kleine Ergänzungen sind völlig okay: zum Beispiel Single Sign-On, Secrets, Monitoring oder eine Deployment-Konfiguration. Nicht okay wäre, wenn wir die Kernlogik oder Architektur dafür neu bauen müssten.

Übergang: Diese Entscheidungen können wir jetzt in einem kleinen Vertrag festhalten.

[Sources]
- https://klosebrothers.atlassian.net/wiki/spaces/KB/pages/2993422337/Hackathon
- https://github.com/klosebrothers/hackathon/blob/main/templates/IDEENEINREICHUNG.md
</aside>

---

## Schließt einen MVP-Vertrag

<ol class="mvp-contract">
  <li>Zielkunde</li>
  <li>Problem</li>
  <li>Wertmoment</li>
  <li>Kernreise</li>
  <li>Fertig-Kriterien</li>
  <li>Nicht-Ziele</li>
</ol>

> Erst schneiden. Dann bauen.

<aside class="notes">
Zeit: etwa 3 Minuten.

Bevor am Hackathon-Tag gebaut wird, sollten diese sechs Punkte feststehen.

Erstens: Für welchen Zielkunden bauen wir? Zweitens: Welche konkrete Problemsituation verbessern wir? Drittens: Welches sichtbare Ergebnis beweist den Nutzen? Viertens: Welche maximal fünf Schritte führen dorthin? Fünftens: Woran erkennen wir objektiv, dass das MVP funktioniert? Sechstens: Was lassen wir bewusst weg?

Wenn einer dieser Punkte unklar ist, sollten wir nicht einfach anfangen und hoffen, dass er sich beim Coden ergibt. Dann schneiden wir die Idee zuerst nochmal kleiner.

Erst schneiden. Dann bauen.

Der MVP-Vertrag ist anschließend die Grundlage für die Spec, schützt vor spontanem Scope-Wachstum und gibt uns die Struktur für die Live-Demo.

Die Fertig-Kriterien beschreiben überprüfbare Ergebnisse, keine erledigten technischen Aufgaben. Zum Beispiel: Eine Kudos-Karte lässt sich aus drei Stichpunkten erzeugen, bearbeiten und teilen. „Frontend fertig“ wäre dagegen kein gutes Kriterium.

Nicht-Ziele sind nicht für jedes MVP der Welt zwingend. Für diesen eintägigen Hackathon würde ich sie aber verbindlich machen. Sie verhindern, dass Login, Rollen, Analytics oder weitere Sonderfälle am Hackathon-Tag wieder in den Scope rutschen. Außerdem verlangt die Einreichungsvorlage ausdrücklich drei bis fünf Punkte, die nicht Bestandteil des MVPs sind.

Übergang zu Teil 5: Genug Theorie. Schauen wir uns jetzt an, wie dieser Vertrag für unser Beispiel-MVP aussieht.

[Sources]
- https://github.com/klosebrothers/hackathon/blob/main/templates/IDEENEINREICHUNG.md
- https://github.com/klosebrothers/hackathon/blob/main/prompts/EXISTIERENDEIDEE.md
</aside>

<!-- markdownlint-enable MD032 MD033 MD034 -->

---

## 5. Vorstellen Beispiel MVP

---

## 6. Umsetzung eines Beispiel-MVPs

---

## 7. Fragen


