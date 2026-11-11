# Headless API (for Javascript)

The [Headless](https://github.com/hivesolutions/headless) Javascript client.

## Initialization

```javascript
import { API as HeadlessAPI } from "headless-api-js";

const api = new HeadlessAPI();
```

The initialization can be done by providing an `options` object such as:

```javascript
{
    baseUrl: "https://headless.platforme.com/"
}
```

## Configuration

| Name                | Type  | Default                        | Description                                                                                                         |
| ------------------- | ----- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `HEADLESS_BASE_URL` | `str` | `https://headless.bemisc.com/` | Base URL of the Headless server (the `baseUrl` option).                                                             |
| `HEADLESS_KEY`      | `str` | `None`                         | Key of the Headless server (the `key` option), sent in the `X-Headless-Key` header (accepted since Headless 0.3.0). |

## Usage

```javascript
// renders a page into a PNG image
const image = await api.index({ params: { url: "https://example.com/" } });

// renders a page into an A4 PDF, waiting for the network to be idle
const pdf = await api.index({
    params: { url: "https://example.com/", format: "pdf", wait_until: "networkidle0" }
});

// renders an HTML document into a PDF with the page size of its
// @page rule (eg: A3), requires Headless 0.3.0 or later
const page = await api.postIndex({
    params: { format: "pdf", prefer_css_page_size: "1" },
    data: "<html>...</html>",
    mime: "text/html"
});

// returns the name and the version of Headless, of Node.js and of its engines
const info = await api.info();
```

The `params` are the query parameters of Headless, described in its [README](https://github.com/hivesolutions/headless#parameters), and `mime` is the `Content-Type` of the `data` posted (required for Headless to read it as the HTML of the page). The images and PDFs are returned as a `Blob` (eg: `Buffer.from(await pdf.arrayBuffer())` in Node.js), the info as an object, and the errors of Headless (eg: `Invalid key`) are thrown with their message and status code.

## License

Headless API Javascript is currently licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/).

## Build Automation

[![Build Status](https://app.travis-ci.com/hivesolutions/headless-api-js.svg?branch=master)](https://travis-ci.com/github/hivesolutions/headless-api-js)
[![Build Status GitHub](https://github.com/hivesolutions/headless-api-js/workflows/Main%20Workflow/badge.svg)](https://github.com/hivesolutions/headless-api-js/actions)
[![npm Status](https://img.shields.io/npm/v/headless-api-js.svg)](https://www.npmjs.com/package/headless-api-js)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://www.apache.org/licenses/)
