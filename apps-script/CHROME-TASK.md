# Google Sheet job for Claude in Chrome

**Status: NOT DONE.** The cloud session that built this page had no Chrome extension connected, so none of the steps below has been run. Nothing was faked: `[SHEET_WEBAPP_URL]` in `site/index.html` is still a placeholder and leads are not being saved yet.

**Paste-ready version:** `apps-script/SHEET-SETUP-PROMPT.md` is the same job written as a self-contained prompt for Claude in Chrome (Cowork), with the script embedded. It ends in a `SHEET SETUP REPORT` to send back to Claude Code.

**Who does it:** Claude, using the Claude in Chrome extension on the owner's computer. The owner asked not to be handed these steps.

## Goal
A Google Sheet called `Spade Ace Leads` in the owner's Google account, with `apps-script/Code.gs` deployed as a web app (Execute as: Me, Who has access: Anyone). Then put the web app address into `site/index.html` in place of `[SHEET_WEBAPP_URL]`, commit, and push to branch `claude/spade-ace-website-e995ek`.

## Steps
Work in new tabs. Never reuse the owner's own tabs. Close the tabs you opened at the end.

1. Open `https://docs.google.com/spreadsheets/create`. If a Google sign-in page appears, stop and ask the owner. Never type credentials.
2. Rename the file to `Spade Ace Leads`.
3. Click **Extensions**, then **Apps Script** (opens a new tab). Rename the project `Spade Ace Leads`.
4. Replace everything in the editor with the exact contents of `apps-script/Code.gs`. The editor is Monaco and mangles brackets and comments if text is typed key by key, so set the text with the page-scripting tool: `monaco.editor.getModels()[0].setValue(<the file contents as a string>)`. Read the text back to confirm it matches. Save with Ctrl+S (Cmd+S on a Mac).
5. Pick `testSubmit` in the function dropdown and click **Run**. On the permission screens: **Review permissions**, choose the owner's account, **Google hasn't verified this app**, **Advanced**, **Go to Spade Ace Leads (unsafe)**, **Allow**. The owner approved this. The script can only touch this one sheet because of `@OnlyCurrentDoc`. A row marked `TEST LEAD (delete this row)` must appear under the 14 headings. Delete that row and keep the headings.
6. Click **Deploy**, then **New deployment**, the gear icon, **Web app**. Description: `Spade Ace leads`. **Execute as: Me.** **Who has access: Anyone.** Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
7. Check it works from outside Google, without the owner's login: `curl -L <URL>` must print "Spade Ace lead capture is live". Then send one test lead the way the page does, `curl -L --data '<JSON like testSubmit, with a new id>' <URL>`, confirm the new row appears in the sheet, and delete it.
8. In `site/index.html` replace `[SHEET_WEBAPP_URL]` with the address. Commit and push.
9. Tell the owner the sheet link and which Google account owns it.

## Do not
- Set access to anything other than **Anyone**.
- Share the sheet with other people or turn on email notifications.
- Put the sheet's own link into the repo (the web app address is public by design, the sheet link is not).
