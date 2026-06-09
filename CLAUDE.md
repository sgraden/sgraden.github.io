# Portfolio Site — Claude Context

Personal portfolio / resume site at [sraden.com](https://sraden.com), hosted on GitHub Pages.

## Stack

- **Templating:** Nunjucks via `nunjucks-cli`. Source files in `src/`, compiled HTML committed to root for GitHub Pages.
- **Styles:** Sass (pinned to `sass@1.32.0` — newer versions break `calc()` division syntax in `_list-grid.scss`)
- **Dev server:** browser-sync + nodemon via `npm-run-all`
- **Deployment:** push to `master` → GitHub Pages serves compiled `.html` directly. No build step on the server.

Key config: `nunjucks.config.json` has `autoescape: false` — required to prevent double-encoding HTML entities (`&amp;` etc.).

## Commands

```sh
npm install       # first time setup
npm run build     # compile all .njk → .html
npm run watch     # njk + sass + browser-sync in parallel
npm start         # build once then serve
```

## File structure

```
src/
  components/       # shared layout and macros (all prefixed with _)
    _base.njk       # page shell — head, nav, body wrapper
    _section.njk    # section wrapper (uses {% call %} pattern)
    _figure.njk     # single image + caption
    _gallery.njk    # two images side by side
    _flow-steps.njk # numbered steps with connectors
    _project-meta.njk # role / timeline / blog link block
    _banner-alert.njk # construction banner
    _work-card.njk  # homepage project card
  index.njk         → index.html
  work/             → work/*.html
assets/
  images/           # project screenshots by folder
scss/               # sass source
style/              # compiled css (committed)
work/               # compiled html (committed)
```

> Never edit `.html` files directly — they are overwritten by `npm run build`.

## Base layout variables

| Variable | Default | Notes |
|---|---|---|
| `title` | none | Sets `<title>Steven Raden - {title}` |
| `rootPath` | `"../"` | Nav/asset base path. Set to `"./"` on index.njk |
| `bodyClass` | `"project"` | Set to `"home"` on index.njk |
| `backUrl` | unset | If set, renders a back button in the header |

## Current work pages (in homepage order)

| Page | File | Role | Status |
|---|---|---|---|
| AppSec Overview | `work/cloudflare-appsec-overview.html` | Senior Product Designer | ✅ Complete |
| Email Routing | `work/cloudflare-email-routing.html` | Product Design Lead | ✅ Complete |
| Workers Unbound | `work/cloudflare-workers-unbound.html` | Product Designer | ✅ Complete |
| IBM Cloud Internet Services | `work/cis.html` | UX Design Lead | ✅ Complete |
| IBM Cloud VPC | `work/vpc.html` | UX Design | ✅ Complete |
| Tactile Toolkit | `work/tactile-toolkit.html` | UX Design | ✅ Complete |
| IBM | `work/ibm.html` | — | Legacy, has back button |
| HelpGidget | `work/helpgidget.html` | — | Legacy, has back button |

## Homepage sections (bottom)

- **Notable Achievements** — placeholder list, under construction
- **Other Cloudflare Projects** — bullet links (Cron Triggers, Cloudflare.tv, blog graphics, Load Shedding) + Workers/GitHub pipeline Product Hunt embed

## Known gotchas

- `sass@1.32.0` is pinned as a local devDependency — do not upgrade, newer versions error on `scss/_list-grid.scss`
- `nunjucks.config.json` must stay with `autoescape: false` or HTML entities double-encode in the browser
- Component files must be prefixed with `_` to prevent nunjucks-cli from compiling them as standalone pages
- `temp-project-assets/` is gitignored — source PDFs and raw screenshots live there locally only

## Potential next work

- **ibm.njk and helpgidget.njk** — still use legacy HTML structure inside `{% block content %}`, not converted to macros. Low priority but worth cleaning up eventually.
- **Homepage descriptions** — several work card descriptions are placeholder copy (Workers Unbound, VPC, CIS). Could be updated to match the quality of the AppSec Overview card.
- **Notable Achievements section** — placeholder content, marked under construction.
- **New case studies** — `temp-project-assets/` may contain source material for additional pages.
