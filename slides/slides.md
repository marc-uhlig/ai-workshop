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

1. AI Prinzipien - 10 min - @mira
2. Tools vorstellen - 15 min - @mira
3. Tools installieren - 30 min
4. Grundlagen eines MVPs - 20 min - @daw

Pause

5. Vorstellen Beispiel MVP - 5 min
6. Umsetzung eines Beispiel-MVPs - 1:00h
7. Fragen - 10 min

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

- Standard, um Werkzeuge/Daten von externen Servern bereitzustellen
- Host (Harness) ↔ Client ↔ Server
- Ein Server für viele Harnesses – "USB-C für Tools"

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

---

## 3. Tools installieren

---

## 4. Grundlagen eines MVPs

---

## 5. Vorstellen Beispiel MVP

---

## 6. Umsetzung eines Beispiel-MVPs

---

## 7. Fragen
