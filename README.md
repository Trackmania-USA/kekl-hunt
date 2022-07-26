# kekl-hunt

## Gitpod.io

The easiest way to get set up with development is to open the project on [gitpod.io](https://www.gitpod.io/). It lets you edit and run the code for free and you don't have to install anything! It's all in the browser.

## Setup

Install the Tailwind Intellisense VS Code plugin.

Then, in VS Code, type `ctrl-shift-p`, type in `settings.json`, go to `Open Settings (JSON)`, and add these values to the json:
```
"tailwindCSS.includeLanguages": {
    "html": "html",
    "javascript": "javascript",
    "css": "css"
},
"editor.quickSuggestions": {
    "strings": true
}
```

## Static export example

This example show how to export to static HTML files your Next.js application fetching data from an API to generate a dynamic list of pages.

When trying to run `npm start` it will build and export your pages into the `out` folder and serve them on `localhost:5000`.

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-static-export)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-static-export)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-static-export with-static-export-app
# or
yarn create next-app --example with-static-export with-static-export-app
# or
pnpm create next-app --example with-static-export with-static-export-app
```
