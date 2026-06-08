sraden.com
==========

Personal portfolio / resume site, hosted on GitHub Pages at [sraden.com](https://sraden.com).

## Requirements

- [Node.js](https://nodejs.org/) and npm
- [Dart Sass](https://sass-lang.com/install) installed globally (used for compiling styles, e.g. `npm install -g sass`)

## Setup

```sh
npm install
```

## Running locally

Start a local dev server with live-reload (serves the site and watches `*.html`, `style/*.css`, and `work/*.html` for changes):

```sh
npm start
```

This uses [browser-sync](https://browsersync.io/) and will print a local URL (e.g. `http://localhost:3000`) to open in your browser.

## Working on styles

Styles are written in Sass under `scss/` and compiled to `style/main.css`. To watch for changes and recompile automatically:

```sh
npm run watch
```

Run this alongside `npm start` while editing styles so changes are picked up by the live-reload server.

## Project structure

- `index.html` — homepage
- `work/` — individual project case study pages
- `scss/` / `style/` — Sass source and compiled CSS
- `assets/` — images, resume, and other static assets

## Deployment

The site is statically hosted via GitHub Pages from this repository (see `CNAME` for the custom domain). Pushing to the default branch publishes the live site.
