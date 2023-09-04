### Build a simple static page with your own Google Sheet

If you know some CSS and spreadsheet, clone the spreadsheet and change it up!

- change the styles, data and layout
- use CSS Grid to layout a row however you want with grid areas

### Example google sheet

https://docs.google.com/spreadsheets/d/1qg2g3E1F1o6cIpt5E6gDh0Ctv-8btBTEY2AYoXJ73eM/edit?usp=sharing

### How it works

- first row of each sheet is the header.
- `_config` is a special sheet. the page title on the browser tab is `_config.title`
- if `_config.page` is `main` it looks for the sheet named `main.layout`. renders the page by rows, top to bottom from the `component` column. skips first row header
- `component` of `nav, roles, footer` match actual sheet names, holding data. **remove them all and create your own :)**
  - for example, change `_config.page` to `intro`, it will look for sheet `intro.layout` (add it) for layout and under `components` column add `intro` so it looks for `intro` sheet (add it) for data and `intro.css` (add it) for styles.
- back to `nav` sheet, rows are rendered top to bottom. skips first row header
- `nav` data sheet matches style sheet `nav.css`:
  - `_container` and `_row` are reserved `key`column values. `_container` wraps `_row`s.
  - a `_row` wraps your `key` values like `header, profile, <img>photo`, and they can be rearranged using CSS Grid within a `_row`
  - `header, profile, <img>photo` under `key` column in `nav.css` matches first row headers in `nav` sheet.
  - other than `key` column, remaining columns are css styles in `camelCase` like `maxWidth`. `className` is for tailwind styles https://tailwindcss.com/ :tada:
- images have a prefix `<img>` and the value is an image url
- links have a prefix `<a>` and the value is a website url
- tip: use formula `=nav!A2` for dynamic binding between `nav` and `nav.css` sheets

### Load your own google sheet (share it as a public link)

Demo: https://makeithappen.vercel.app/load/1qg2g3E1F1o6cIpt5E6gDh0Ctv-8btBTEY2AYoXJ73eM

`1qg2g3E1F1o6cIpt5E6gDh0Ctv-8btBTEY2AYoXJ73eM` is the Google Sheet ID

Feel free to leave comments on what you liked, what could be better, fork it and make it your own :)
https://twitter.com/vinzloh

#### Built with Astro + Tailwind + TypeScript + PapaParse :fire:

---

## Getting Started

```bash
$ pnpm i
$ pnpm dev
```
