# Spade Ace

One-page website for Spade Ace, a growth consultancy in Dombivli, India. Its job: get the right business owners to book a call, and quietly filter out people who only want cheap posts.

| Path | What it is |
| --- | --- |
| `site/index.html` | The website. A single file with its own CSS and JavaScript. Drag the `site` folder onto Netlify Drop to publish it. |
| `brand/` | Your logo as sharp vector files (`spade-ace-logo.svg` in red, `spade-ace-logo-white.svg` for dark backgrounds) and a square PNG (`spade-ace-logo-1024.png`) ready to upload as a profile picture. |
| `apps-script/Code.gs` | Google Apps Script that saves each form submission as a row in a Google Sheet. |
| `apps-script/CHROME-TASK.md` | The Google Sheet job for Claude to run through Chrome (status: done). |
| `apps-script/SHEET-SETUP-PROMPT.md` | Ready-to-paste prompt for Claude in Chrome that sets up the Google Sheet (status: done). |
| `cal-com/CAL-SETUP-PROMPT.md` | Ready-to-paste prompt for Claude in Chrome that sets up the Cal.com booking page (status: done). |
| `netlify/NETLIFY-SETUP-PROMPT.md` | Ready-to-paste prompt for Claude in Chrome that puts the site live on Netlify from GitHub (status: ready, not yet run). A second box connects your own domain later. |
| `netlify.toml` | Tells Netlify to publish the `site` folder with no build step. |
| `SETUP.md` | Plain-words guide: the three placeholders, the Google Sheet (Claude sets it up), going live on Netlify, and connecting a domain. |

Start with `SETUP.md`.
