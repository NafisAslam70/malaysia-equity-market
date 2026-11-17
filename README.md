# Malaysia Equity Market

A Node.js and Express web application for exploring Malaysia-listed companies, their historical stock data, company profiles, and related news.

## Features

- Search for a company by name and view its matched Bursa Malaysia ticker.
- Browse the supported company directory.
- Render company profile, historical price data, and related news in server-rendered pages.
- Serve static stylesheets, scripts, and image assets through Express.

## Tech stack

- Node.js and Express
- EJS templates
- SQLite
- Axios, Cheerio, and Puppeteer for data retrieval

## Run locally

```sh
npm install
npm run dev
```

The server listens on port `3005` by default. Start without Nodemon using `npm start`.

The SQLite database is created locally and is intentionally excluded from version control. Market data and news are retrieved from external sources and may be subject to their availability and usage terms.
