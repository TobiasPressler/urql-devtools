# Privacy Policy

**Urql Devtools**
Last updated: September 2026

## What this extension does

Urql Devtools adds a debug panel for urql GraphQL clients. It shows GraphQL operations (queries, mutations, responses), cache states, and schema information so developers can troubleshoot GraphQL applications.

## What data we collect

**We do not collect any personal data.**

The extension reads GraphQL operation data (queries, mutations, responses, variables, and schema information) from the urql client on the current page. This data:

- Stays in the browser, routed through Chrome extension internal messaging
- Lives in memory only. The one exception is a single `localStorage` entry that remembers the last query you typed in the Request tab
- Never leaves the browser
- Is never shared with third parties
- Is only shown in the debug panel

## What data we store

The extension stores one value in `localStorage`:

- `urql-last-request`: the last GraphQL query you typed in the Request tab

Everything else (timeline events, operations, explorer data, schema, connection state) lives in React component state in memory. Close or reload the devtools panel and it's gone.

## How we use data

All data stays within the debug panel. The extension does not use it for anything else.

## Data sharing

No data leaves the browser. There are no external servers, no third parties, no analytics.

## Advertising

This extension does not use your data for advertising of any kind.

## Human access

No human sees the data this extension processes. It all stays inside your browser.

## Security

Data moves only between extension components through Chrome's built-in IPC, not over a network. The Content Security Policy blocks extension pages from loading external scripts (`script-src 'self'`).

## Changes to this policy

If we update this policy, we'll post the changes here with a new "Last updated" date.

## Contact

Questions about this policy? Open an issue at https://github.com/TobiasPressler/urql-devtools/issues
