---
title: Configuration
description: Environment variables and the component constants Lantern reads.
---

## Environment variables

| Variable | Default | Used for |
| --- | --- | --- |
| `PUBLIC_ONETAG_KEY` | `YOUR_ONETAG_KEY` | The OneTag AI key. Without it the dialog shows a "not set up" message. |
| `PUBLIC_ONETAG_SITE` | `https://onetagai.com` | Where `v1.js` and the API live. Only needed for self-hosted deployments. |
| `BASE_PATH` | `/` | Sub-path the site is served from, for example `/astro-docs-ai` on a GitHub project page. |

Variables starting with `PUBLIC_` are read at build time and written into the HTML, which is why This key is designed to be public.

## Component constants

Defined at the top of the script in `src/components/Search.astro`.

| Constant | Default | Meaning |
| --- | --- | --- |
| `TOP_PAGES` | `5` | Pages retrieved per question. |
| `PER_PAGE` | `6000` | Characters kept from each page. |
| `MAX_CONTEXT` | `20000` | Characters of page text sent in total. The service limit for one call is 32,000, question and history included. |
| `RULES` | see file | The instructions given to the model. |

## Answer length

`maxTokens: 400` in the `onetag.ask` call caps the answer at about 300 words. The service allows up to 1,000.
