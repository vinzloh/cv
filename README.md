### Build a simple static page with your own Google Sheet

If you know some CSS and spreadsheet, clone the spreadsheet and change it up!
- change the styles, data and layout
- use CSS Grid to layout a row however you want with grid areas

### Example google sheet
https://docs.google.com/spreadsheets/d/1qg2g3E1F1o6cIpt5E6gDh0Ctv-8btBTEY2AYoXJ73eM/edit?usp=sharing

### How it works
- first row of each sheet is the header.
- `_config` is a special sheet. the page title on the browser tab is the `value` of the `key` cell, `title`
- `_layout` is a special sheet. renders the page by rows, top to bottom from the `component` column. skips first row header
- `component` of `nav, roles, footer` match actual sheet names, holding data. **remove them all and create your own :)**
  - for example, add a new row of `intro` in `_layout`, add new sheet `intro` for data and `intro.css` for styles
- back to `nav` sheet, rows are rendered top to bottom. skips first row header
- `nav` data sheet matches style sheet `nav.css`:
  - `_container` and `_row` are reserved `key`column values. `_container` wraps `_row`s. 
  - a `_row` wraps your `key` values like `header, profile, <img>photo`, and they can be rearranged using CSS Grid within a `_row`
  - `header, profile, <img>photo` under `key` column in `nav.css` matches first row headers in `nav` sheet. 
  - other than `key` column, remaining columns are css styles in `camelCase` like `maxWidth`. `className` is for tailwind styles  https://tailwindcss.com/ :tada:
- images have a prefix `<img>` and the value is an image url
- links have a prefix `<a>` and the value is a website url
- tip: use formula `=nav!A2` for dynamic binding between `nav` and `nav.css` sheets



### Load your own google sheet (share it as a public link)


Demo: https://makeithappen.now.sh/?id=1qg2g3E1F1o6cIpt5E6gDh0Ctv-8btBTEY2AYoXJ73eM

`1qg2g3E1F1o6cIpt5E6gDh0Ctv-8btBTEY2AYoXJ73eM` is the Google Sheet ID

Feel free to leave me any comment what you liked, what could be better, fork it and make it your own :)

#### Built with  Next.js + Tailwind + TypeScript + PapaParse :fire:


---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
