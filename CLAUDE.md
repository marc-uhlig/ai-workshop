# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Slide deck (reveal.js, via `reveal-md`) for an internal AI workshop. Content lives in `slides/slides.md`, written in German, split by `---` into slides. It covers AI principles (context, tokens, plugin scope), tool setup (CLI, desktop app, Context7/OpenSpec/skills/MCP), and a hands-on MVP exercise (e.g. a "Kudos Card" webpage).

## Commands

- `nix develop` — enter the dev shell (or `nix develop -c zsh`)
- `task slides` — watch/serve the slides locally (runs `reveal-md slides.md --watch` in `slides/`)
- `task lint` — run `markdownlint-cli2` on markdown files

## Structure

- `slides/slides.md` — the actual deck content
- `slides/reveal-md.json` — reveal-md config (theme, css, scripts)
- `slides/style.css`, `slides/script.js` — custom slide styling/behavior
- `slides/img/` — slide images
