# EK CMS template kit

Build a custom design for your EK CMS site in your own GitHub repo. Each push
opens a pull request on our side; we review it, and once it is merged and
released your site uses it. Your content stays in the EK CMS dashboard.

## Start

1. Ask EK CMS support to register a template for your site. You get its key,
   for example `acme`.
2. Click "Use this template" on this repo to make your own copy.
3. Replace `my-site` with your key in `ek-template.json`, `template/manifest.ts`,
   `template/theme.css` and `tsconfig.json`.
4. `pnpm install`, then `pnpm typecheck` and `pnpm test`.

## Layout

| Path | What it is |
|---|---|
| `template/` | Your template code. The only code we copy. |
| `assets/` | Images and fonts, served from `/templates/<key>/`. |
| `ek-template.json` | `{ "key": "<key>" }`. Proves this repo belongs to your site. |
| `sdk/` | Type declarations of what a template may import. Do not edit. |
| `tests/` | The same checks we run on each push. |

Your template extends `generic`: header, footer and every CMS page come from
it. Override one by registering a component in `template/index.ts`.

## Rules we check on each push

- Code imports only from `template/`, `@/templates/generic/...` and the
  modules listed in `sdk/surface.json`. Packages such as `next/link` are fine.
- `template/` holds `.ts .tsx .css .json .md` and images; `assets/` holds
  images and fonts only. No file over 2 MB, 20 MB in total. No symlinks.
- Every rule in `theme.css` starts with `[data-template="<key>"]`.

A push that breaks a rule is rejected with the reason shown on the dashboard.
Reading `process.env`, Node built-ins, `eval`, `dangerouslySetInnerHTML` or
fetching a fixed URL is allowed but flagged for our reviewer.

## Connect the repo

1. Install the EK CMS Template Sync GitHub App on this repo.
2. In the EK CMS dashboard, open Site settings, Template repository, and enter
   `owner/name`, the branch (default `main`) and the folder (default `template`).
3. Push. The card shows each step: In review, Changes requested, Approved, Live.

There is no local preview in this kit yet. Typecheck and tests catch what the
sync would reject; the review covers how it looks.
