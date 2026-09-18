## 1. Projektgerüst und Toolchain

- [ ] 1.1 Next.js 16.2.x mit App Router, TypeScript und `@/*`-Alias in `mvp/mira2/` anlegen; verifizieren durch `pnpm dev` und einen Seitenaufruf auf `http://localhost:3000`
- [ ] 1.2 `html-to-image` als Laufzeitabhängigkeit ergänzen; verifizieren, dass `pnpm install` durchläuft und der Import in einem TypeScript-Modul typisiert auflöst
- [ ] 1.3 `@playwright/test` **exakt** auf `1.63.0` pinnen (ohne Caret/Tilde) mit erklärendem Kommentar zur Kopplung an `PLAYWRIGHT_BROWSERS_PATH`; verifizieren durch `pnpm exec playwright --version` → genau `1.63.0`
- [ ] 1.4 `fontconfig` und eine Systemschrift in `flake.nix` ergänzen; verifizieren durch `nix develop -c fc-list | head` → nicht-leere Ausgabe
- [ ] 1.5 Vitest mit jsdom-Umgebung und Testing Library einrichten; verifizieren, dass `pnpm test` mit einem trivialen Testfall grün läuft
- [ ] 1.6 `playwright.config.ts` mit ausschließlich dem Chromium-Projekt und `webServer`-Start über `pnpm dev` anlegen; verifizieren, dass `pnpm exec playwright test` mit einem trivialen Test die Nix-Browser findet und startet

## 2. Datenmodell und reine Logik

- [ ] 2.1 `lib/card.ts` mit Kartentyp, Feldgrenzen (Empfänger/Absender 40, Freitext 240) und Validierung schreiben; verifizieren durch Unit-Tests für Grenzwerte, Leerstring und reine Leerzeichen-Eingabe
- [ ] 2.2 `lib/themes.ts` als reine Registry mit den Themes `minimal` und `star-wars` und je vier deutschen Templates anlegen; verifizieren durch Unit-Tests der Zusicherungen aus `specs/card-themes`: mindestens zwei Themes, je mindestens vier Templates, eindeutige Kennungen, keine leeren Texte
- [ ] 2.3 Zustandsübergang für den Theme-Wechsel als reine Funktion implementieren (Template auf das erste des neuen Themes, Nutzereingaben unverändert); verifizieren durch Unit-Tests, die Erhalt der Eingaben und Ausschluss eines themefremden Templates prüfen
- [ ] 2.4 `lib/filename.ts` mit Transliteration (ä→ae, ö→oe, ü→ue, ß→ss), Kleinschreibung, Bindestrich-Normalisierung und Ersatznamen schreiben; verifizieren durch Unit-Tests für "Anna Müller" → `anna-mueller`, Sonderzeichen-Only-Eingabe und die `.png`-Endung

## 3. Darstellung der Karte

- [ ] 3.1 Schriften Inter und Libre Franklin über `next/font/google` als CSS-Variablen in `app/layout.tsx` bereitstellen; verifizieren durch Prüfung im Browser, dass die Schriftdateien von der eigenen Origin geladen werden (kein Request an `fonts.gstatic.com` zur Laufzeit)
- [ ] 3.2 `app/themes.css` mit je einem `[data-theme="…"]`-Block für Farben, Schrift und Anordnung anlegen; verifizieren durch sichtbar unterschiedliche Gestaltung beider Themes im Browser
- [ ] 3.3 `components/CardPreview.tsx` als `forwardRef`-Komponente mit fester Grundfläche von 1200×675 CSS-Pixeln und den vier Feldern bauen; verifizieren durch Komponententest, dass alle gesetzten Felder gerendert werden und ein leerer Freitext keinen Platzhalter hinterlässt
- [ ] 3.4 Proportionale Skalierung der Vorschau in den verfügbaren Platz umsetzen, ohne die inneren Maße zu verändern; verifizieren durch Aufruf in einem schmalen Fenster — Karte vollständig sichtbar, Seitenverhältnis unverändert
- [ ] 3.5 Umbruchverhalten für überlange Wörter im Freitext absichern; verifizieren durch Komponententest mit einem 200 Zeichen langen Wort ohne Leerzeichen — kein Überlaufen der Kartenfläche

## 4. Bedienoberfläche

- [ ] 4.1 `components/CardEditor.tsx` mit Theme-Auswahl, Template-Auswahl und den drei Textfeldern bauen; verifizieren durch Komponententest, dass eine Eingabe unmittelbar in der Vorschau erscheint
- [ ] 4.2 Restzeichenanzeige und harte Eingabebegrenzung für den Freitext umsetzen; verifizieren durch Komponententest — das 241. Zeichen wird nicht angenommen, Anzeige steht auf 0
- [ ] 4.3 `app/page.tsx` als Client-Komponente mit dem Kartenzustand aufbauen und Editor mit Vorschau verbinden; verifizieren, dass weder URL, `localStorage` noch Router-State beschrieben werden
- [ ] 4.4 Gesamtlayout der Seite minimalistisch gestalten (Vorschau als Blickfang, Bedienung zurückgenommen); verifizieren durch manuellen Durchlauf beider Themes im Browser

## 5. Export

- [ ] 5.1 `lib/export-png.ts` mit `pixelRatio: 2` und eingebetteten Schriften schreiben, sodass stets 2400×1350 Bildpunkte entstehen; verifizieren durch E2E-Prüfung der Bildabmessungen des Downloads
- [ ] 5.2 Download-Auslösung mit dem aus dem Empfänger abgeleiteten Dateinamen umsetzen; verifizieren durch E2E-Test — Datei beginnt mit der PNG-Signatur `89 50 4E 47` und trägt den erwarteten Namen
- [ ] 5.3 `lib/clipboard.ts` mit synchron übergebenem Blob-Promise im `ClipboardItem` schreiben und fehlende Unterstützung als eigenen Rückgabefall abbilden; verifizieren durch Unit-Tests gegen ein nachgebildetes Clipboard-API sowie den Fall ohne `ClipboardItem`
- [ ] 5.4 `components/ExportBar.tsx` mit Sperre bei fehlenden Pflichtfeldern, laufendem Zustand, Mehrfachklick-Schutz, Erfolgsbestätigung und Fehlermeldung mit Verweis auf den Download bauen; verifizieren durch Komponententests für gesperrten Zustand und Fehlerfall
- [ ] 5.5 Sicherstellen, dass ausschließlich die Karte im Bild landet (keine Bedienelemente, kein Seitenhintergrund); verifizieren durch Sichtprüfung eines erzeugten PNG

## 6. End-to-End-Absicherung

- [ ] 6.1 E2E-Test „Theme wechseln": Theme umstellen, Eingaben bleiben erhalten, Template gehört zum neuen Theme; verifizieren durch grünen Lauf in Chromium
- [ ] 6.2 E2E-Test „Download": Karte ausfüllen, Download über `waitForEvent('download')` abfangen, PNG-Signatur und Dateinamen prüfen
- [ ] 6.3 E2E-Test „Kopieren": mit erteilter `clipboard-read`-Berechtigung kopieren und über `navigator.clipboard.read()` prüfen, dass ein `image/png`-Eintrag vorliegt
- [ ] 6.4 Gesamtlauf `pnpm test && pnpm exec playwright test` in der Nix-Shell grün bekommen und die Testbefehle in `package.json` als Skripte hinterlegen

## 7. Abschluss

- [ ] 7.1 Beide Themes einmal manuell exportieren und die PNG ansehen — Schriften korrekt eingebettet, kein Fallback auf eine Systemschrift; dies ist die Lücke, die bewusst nicht durch Snapshots abgedeckt ist
- [ ] 7.2 Kurze `README.md` mit Einstieg (`nix develop`, `pnpm install`, `pnpm dev`) und einem Absatz, wie ein weiteres Theme ergänzt wird; verifizieren, indem die Schritte einmal von vorn durchlaufen werden
