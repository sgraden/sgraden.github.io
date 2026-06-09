sraden.com
==========

Personal portfolio / resume site, hosted on GitHub Pages at [sraden.com](https://sraden.com).

## Requirements

- [Node.js](https://nodejs.org/) and npm

All other tools (Sass, browser-sync, Nunjucks CLI) are installed as local devDependencies via `npm install`.

## Setup

```sh
npm install
```

## Running locally

Build templates and start a live-reload dev server:

```sh
npm start
```

This compiles all Nunjucks templates to HTML, then starts [browser-sync](https://browsersync.io/) watching `*.html`, `work/*.html`, and `style/*.css`. It will print a local URL (e.g. `http://localhost:3000`) to open in your browser.

## Watching for changes

To watch templates, styles, and the browser simultaneously during active development:

```sh
npm run watch
```

This runs three watchers in parallel:
- **watch:njk** — recompiles `.njk` files to HTML whenever a template changes
- **watch:sass** — recompiles `scss/main.scss` to `style/main.css` on save
- **watch:serve** — browser-sync auto-refreshes the browser on any HTML or CSS change

## Building templates only

```sh
npm run build
```

## Project structure

```
src/               — Nunjucks source files (do not edit .html files directly)
  components/      — shared layout and macro components
  index.njk        — homepage source
  work/            — project page sources
scss/              — Sass source files
style/             — compiled CSS (generated, committed for GitHub Pages)
assets/            — images, resume PDF, and other static assets
work/              — compiled HTML project pages (generated, committed for GitHub Pages)
index.html         — compiled homepage (generated, committed for GitHub Pages)
```

> **Never edit `.html` files directly.** They are overwritten by `npm run build`. Make all changes in the corresponding `.njk` source file under `src/`.

## Deployment

The site is statically hosted via GitHub Pages from this repository (see `CNAME` for the custom domain). Pushing to the default branch publishes the live site. Both `.njk` source files and compiled `.html` output files are committed — GitHub Pages serves the `.html` files directly.

## Templating

Pages are written in [Nunjucks](https://mozilla.github.io/nunjucks/) and compiled to plain HTML. Source files live in `src/` — never edit the `.html` files directly.

**Nunjucks documentation:** https://mozilla.github.io/nunjucks/templating.html

### How pages are structured

Every page extends the base layout and fills in a `content` block:

```njk
{% extends "components/_base.njk" %}
{% set title = "My Page Title" %}

{% block content %}
  {# Your page HTML goes here — plain HTML, no special syntax required #}
  <div class="section">
    <h3 class="section--title">Hello</h3>
    <div class="section--content">
      <p>This is normal HTML.</p>
    </div>
  </div>
{% endblock %}
```

The base layout handles `<head>`, the nav header, and the body wrapper automatically. Macros are optional — import only what a page needs.

**Variables the base layout reads:**

| Variable | Effect | Default |
|---|---|---|
| `title` | Sets `<title>Steven Raden - {title}</title>` | none (just "Steven Raden") |
| `rootPath` | Base path for nav/asset links | `"../"` (work/ pages) |
| `bodyClass` | Class on `<body>` | `"project"` |
| `backUrl` | If set, shows a back button in the header | unset (no button) |

For `index.njk` (root level, not inside `work/`), override the path variable:

```njk
{% set rootPath = "./" %}
{% set bodyClass = "home" %}
```

For older pages that need a back button in the header:

```njk
{% set backUrl = "../index.html" %}
```

For page-specific `<head>` content (extra scripts or stylesheets), use the `head` block:

```njk
{% block head %}
  <link rel="stylesheet" href="style/extra.css">
  <script src="analytics.js"></script>
{% endblock %}
```

### Components

All components live in `src/components/`. Files prefixed with `_` are treated as partials and are not compiled as standalone pages.

---

#### `section` — page section wrapper

Wraps content in `.section` / `.section--content`. Uses `{% call %}` because the body is arbitrary HTML, not a string.

```njk
{% from "components/_section.njk" import section %}

{# Standard section (h3) #}
{% call section("Research & Discovery") %}
  <p>Section content here.</p>
{% endcall %}

{# Project title section (h2 + hero styling) — first section on a project page only #}
{% call section("Project Name", isTitle=true) %}
  <p>Project intro paragraph.</p>
{% endcall %}
```

**Why `{% call %}` instead of `{{ macro() }}`?** The section body is arbitrary HTML that can't be passed as a string argument. `{% call %}...{% endcall %}` acts as a content slot — everything between the tags is dropped into `{{ caller() }}` inside the macro. Any HTML or nested macro calls work inside it.

---

#### `figure` — single image with caption

```njk
{% from "components/_figure.njk" import figure %}

{{ figure("../assets/images/my-project/screen.png", "Alt text", "Caption text.") }}

{# No caption #}
{{ figure("../assets/images/my-project/screen.png", "Alt text") }}

{# No drop shadow #}
{{ figure("../assets/images/my-project/screen.png", "Alt text", "Caption.", noShadow=true) }}
```

---

#### `gallery` — two images side by side with a shared caption

```njk
{% from "components/_gallery.njk" import gallery %}

{{ gallery([
    { src: "../assets/images/my-project/screen-1.png", alt: "First screen" },
    { src: "../assets/images/my-project/screen-2.png", alt: "Second screen" }
], "Caption describing both images.") }}

{# No caption #}
{{ gallery([
    { src: "../assets/images/my-project/screen-1.png", alt: "First screen" },
    { src: "../assets/images/my-project/screen-2.png", alt: "Second screen" }
]) }}
```

---

#### `flowSteps` — numbered step list

```njk
{% from "components/_flow-steps.njk" import flowSteps %}

{{ flowSteps([
    { title: "Step One",   body: "Description of this step." },
    { title: "Step Two",   body: "Description with <b>bold text</b> supported." },
    { title: "Step Three", body: "Final step." }
]) }}
```

Step numbers and arrow connectors are generated automatically. The `body` field supports inline HTML.

---

#### `projectMeta` — role / timeline block

```njk
{% from "components/_project-meta.njk" import projectMeta %}

{{ projectMeta("Product Designer", "Launched: <b>April 14, 2021</b>") }}

{# With an optional blog post link #}
{{ projectMeta(
    "Product Design Lead",
    "Timeline: <b>2020 - 2021</b>",
    blogUrl="https://blog.cloudflare.com/my-post/",
    blogLabel="Read the post"
) }}
```

---

#### `bannerAlert` — under construction banner

```njk
{% from "components/_banner-alert.njk" import bannerAlert %}

{# Default message #}
{{ bannerAlert() }}

{# Custom message and icon (uses Material Icons names) #}
{{ bannerAlert("Coming soon.", "schedule") }}
```

---

#### `workCard` — project card for the homepage

```njk
{% from "components/_work-card.njk" import workCard %}

{{ workCard(
    href="./work/my-project.html",
    imgSrc="./assets/images/my-project/thumbnail.png",
    imgAlt="Project thumbnail",
    title="Project Name",
    description="Short description of the project.",
    role="Product Designer"
) }}
```
