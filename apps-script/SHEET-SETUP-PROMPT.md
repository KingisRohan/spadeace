# Google Sheet setup prompt (for Claude in Chrome)

**Status: not run yet.** The session that built the website could not reach the owner's browser.

**How to use it:** paste everything inside the box below into Claude in Chrome (Cowork), with Chrome open and signed in to the right Google account. It sets up the sheet, publishes the script, tests the exact route the website uses, and ends with a message starting `SHEET SETUP REPORT`. Send that report back to Claude Code. Claude then puts the address into the website and re-tests it.

The script inside the prompt is `apps-script/Code.gs`, byte for byte (it is embedded as one safe line so nothing can be damaged on the way in).

```text
You are Claude in Chrome. Set up the Google Sheet that stores the leads from my website, exactly as written below. I am not technical, so do all the clicking yourself. Ask me only when this prompt tells you to.

WHAT THIS IS FOR
My consultancy's website sends every form submission to a small Google Apps Script, which adds one row to a Google Sheet. You will create the sheet, put the script in, publish it as a web app, test it, and give me the web app address.

RULES
1. Use only Google's own sites (docs.google.com and script.google.com) for this job, with the Google account already signed in on this Chrome.
2. Never type a password or a 2FA code. If a sign-in is needed, stop and ask me.
3. Do not share the sheet with anyone and do not turn on any notifications.
4. Before you click Allow on any Google permission screen, tell me which account and which permission it asks for, and wait for my yes. The script only touches this one sheet.
5. Set "Who has access" to Anyone. This is intentional, because visitors to my website are not signed in to Google. Do not choose any other option.
6. If a step fails 3 times, or the screen does not match what I describe, stop, tell me what you see, and wait.
7. Google renames buttons from time to time. Use the closest match.
8. Work in your own tabs and close them when you finish.

STEPS

A. Create the sheet. Open https://docs.google.com/spreadsheets/create . Rename the file (click the title at the top left) to: Spade Ace Leads

B. Open the script editor. Click Extensions, then Apps Script. A new tab opens. Rename the project (click "Untitled project") to: Spade Ace Leads

C. Put the script in. The editor is a code editor that damages code if you type it key by key, so do NOT type it. Instead run the line between the two markers below in that tab's page JavaScript (your javascript tool). It replaces everything in the open file.
----- ONE LINE START -----
(()=>{const ed=monaco.editor.getEditors()[0];ed.getModel().setValue("/**\n * SPADE ACE: lead capture for Google Sheets\n * ----------------------------------------------------------------------\n * What this does, in plain words:\n * When someone finishes the form on your website, the page sends their\n * answers to this script. The script adds ONE NEW ROW to the \"Leads\" tab\n * of the Google Sheet this script lives in. It sends no emails.\n *\n * You do not need to change anything below. Paste it, save, deploy.\n *\n * @OnlyCurrentDoc  (this tells Google the script may touch only this one sheet)\n */\n\n// The tab that receives the rows. If it does not exist, the script creates it.\nvar SHEET_NAME = 'Leads';\n\n// All timestamps are written in Indian Standard Time.\nvar TIME_ZONE = 'Asia/Kolkata';\n\n// The columns, in this exact order. The last one is left blank for you to fill in.\nvar HEADERS = [\n  'Timestamp (IST)', 'Name', 'Business Name', 'WhatsApp', 'Email',\n  'Revenue', 'Business Type', 'Spends on Marketing', 'Monthly Spend',\n  'Bottleneck', 'Partner Preference', 'Lead Tag', 'Awareness Level', 'Booked Call'\n];\n\n// No single answer is allowed to be longer than this (stops junk from flooding the sheet).\nvar MAX_LENGTH = 200;\n\n\n/**\n * Opening the web app address in a browser runs this. It only proves the\n * deployment is live. If you see the sentence below, the address is correct.\n */\nfunction doGet() {\n  return ContentService\n    .createTextOutput('Spade Ace lead capture is live. This address only receives submissions from your website.')\n    .setMimeType(ContentService.MimeType.TEXT);\n}\n\n\n/**\n * Your website sends every submission here.\n * Whatever happens, this never shows the visitor anything: the page ignores the reply.\n */\nfunction doPost(e) {\n  var lock = LockService.getScriptLock();\n  var haveLock = false;\n  try {\n    // If two people submit at the same moment, they take turns.\n    lock.waitLock(25000);\n    haveLock = true;\n\n    var lead = readLead_(e);\n    if (!lead) return reply_({ ok: false, reason: 'not a real submission' });\n\n    // The page may retry a send if the network was shaky. Ignore a lead we already saved.\n    var cache = CacheService.getScriptCache();\n    var id = lead.id ? String(lead.id).slice(0, 80) : '';\n    if (id && cache.get(id)) return reply_({ ok: true, duplicate: true });\n\n    getSheet_().appendRow(buildRow_(lead, new Date()));\n    if (id) cache.put(id, '1', 21600); // remember it for 6 hours\n\n    return reply_({ ok: true });\n  } catch (err) {\n    // Visible later under \"Executions\" in the Apps Script screen. The visitor sees nothing.\n    console.error(err && err.stack ? err.stack : err);\n    return reply_({ ok: false });\n  } finally {\n    if (haveLock) lock.releaseLock();\n  }\n}\n\n\n/**\n * OPTIONAL CHECK. In the Apps Script screen, choose \"testSubmit\" in the\n * dropdown at the top and press Run. One clearly fake row appears in your\n * sheet, so you can see everything is connected. Delete that row afterwards.\n */\nfunction testSubmit() {\n  var fake = {\n    id: 'test-' + new Date().getTime(),\n    name: 'TEST LEAD (delete this row)',\n    business: 'Test Business',\n    whatsapp: '+919999999999',\n    email: 'test@example.com',\n    revenue: '₹5L to ₹20L',\n    businessType: 'Other',\n    spends: 'No',\n    monthlySpend: '',\n    bottleneck: 'Not enough leads',\n    partner: 'Not sure yet',\n    leadTag: 'STANDARD',\n    awareness: 'LOW'\n  };\n  var result = doPost({ postData: { contents: JSON.stringify(fake) } });\n  console.log(result.getContent());\n}\n\n\n/* ---------------------------- helpers below ---------------------------- */\n\n// Reads what the page sent. Returns null if it does not look like a real person's submission.\nfunction readLead_(e) {\n  var data = null;\n  try {\n    if (e && e.postData && e.postData.contents) data = JSON.parse(e.postData.contents);\n  } catch (err) {\n    data = null;\n  }\n  if (!data && e && e.parameter) data = e.parameter; // ordinary form post, just in case\n  if (!data || typeof data !== 'object') return null;\n\n  // A real submission always has a name and some way to reach the person.\n  if (!clean_(data.name) || !(clean_(data.email) || clean_(data.whatsapp))) return null;\n  return data;\n}\n\n// Turns one submission into one row, in the same order as HEADERS.\nfunction buildRow_(d, now) {\n  return [\n    Utilities.formatDate(now, TIME_ZONE, 'yyyy-MM-dd HH:mm:ss'),\n    clean_(d.name),\n    clean_(d.business),\n    clean_(d.whatsapp, true),\n    clean_(d.email),\n    clean_(d.revenue),\n    clean_(d.businessType),\n    clean_(d.spends),\n    clean_(d.monthlySpend),\n    clean_(d.bottleneck),\n    clean_(d.partner),\n    clean_(d.leadTag),\n    clean_(d.awareness),\n    '' // Booked Call: left blank on purpose, you fill it in\n  ];\n}\n\n// Makes one answer safe to store:\n//  - one line, trimmed, not too long\n//  - if it starts with = + - or @, Google Sheets would treat it as a formula. A leading\n//    apostrophe tells Sheets \"this is plain text\" (the apostrophe itself is not shown).\n//  - phone numbers always get the apostrophe, so +91... stays exactly as typed.\nfunction clean_(value, alwaysText) {\n  var s = (value === null || value === undefined) ? '' : String(value);\n  s = s.replace(/[\\u0000-\\u001f\\u007f]+/g, ' ').replace(/\\s+/g, ' ').trim().slice(0, MAX_LENGTH);\n  if (s && (alwaysText || /^[=+\\-@]/.test(s))) s = \"'\" + s;\n  return s;\n}\n\n// Finds the \"Leads\" tab (creating it if needed) and writes the heading row on first use.\nfunction getSheet_() {\n  var ss = SpreadsheetApp.getActiveSpreadsheet();\n  var sheet = ss.getSheetByName(SHEET_NAME);\n  if (!sheet) {\n    var all = ss.getSheets();\n    if (all.length === 1 && all[0].getLastRow() === 0) {\n      sheet = all[0];               // a brand new, empty sheet: just rename its only tab\n      sheet.setName(SHEET_NAME);\n    } else {\n      sheet = ss.insertSheet(SHEET_NAME);\n    }\n  }\n  if (sheet.getLastRow() === 0) {\n    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');\n    sheet.setFrozenRows(1);\n  }\n  return sheet;\n}\n\nfunction reply_(obj) {\n  return ContentService\n    .createTextOutput(JSON.stringify(obj))\n    .setMimeType(ContentService.MimeType.JSON);\n}\n");return ed.getModel().getLineCount();})()
----- ONE LINE END -----
Then confirm the editor now shows 177 lines, starts with the line /** and that the last function is reply_. If monaco is not defined, or the line count differs, stop and tell me. Then save with Ctrl+S (Cmd+S on a Mac).

D. Test the connection. In the function dropdown at the top of the editor choose testSubmit and click Run.
   - Google shows a permission screen. Follow rule 4, then: Review permissions, choose my account, "Google hasn't verified this app", Advanced, "Go to Spade Ace Leads (unsafe)", Allow. This warning is normal for a script I wrote myself.
   - Go back to the sheet tab. There must be 14 headings in row 1, in this order: Timestamp (IST), Name, Business Name, WhatsApp, Email, Revenue, Business Type, Spends on Marketing, Monthly Spend, Bottleneck, Partner Preference, Lead Tag, Awareness Level, Booked Call. The tab must be called Leads. One row marked "TEST LEAD (delete this row)" must be in row 2. Delete that row 2 and keep the headings.

E. Publish it. In the script editor click Deploy, then New deployment, then the gear icon next to "Select type", then Web app.
   - Description: Spade Ace leads
   - Execute as: Me
   - Who has access: Anyone
   - Click Deploy. If Google asks for permission again, follow rule 4 again.
   - Copy the Web app URL. It starts with https://script.google.com/macros/s/ and ends with /exec . This is the address I need.

F. Check it works, the way my website uses it.
   1. Open the Web app URL in a new tab. It must show: Spade Ace lead capture is live. If it shows a Google sign-in page instead, "Who has access" is not Anyone: go to Deploy, Manage deployments, the pencil, set Who has access to Anyone, set Version to New version, Deploy, and check again.
   2. Open a new tab at https://example.com . This tab is on a different website on purpose, so Google sees an anonymous visitor, exactly like my site does. In that tab run this in the page JavaScript, replacing WEBAPP_URL with the address from step E and the number in the id with any new number:
      fetch("WEBAPP_URL", {method:"POST", mode:"no-cors", body: JSON.stringify({"id":"setup-test-REPLACE-WITH-A-NEW-NUMBER","name":"SETUP TEST (delete this row)","business":"Test Business","whatsapp":"+919999999999","email":"test@example.com","revenue":"Under ₹5L","businessType":"Other","spends":"No","monthlySpend":"","bottleneck":"Not enough leads","partner":"Not sure yet","leadTag":"EARLY","awareness":"LOW"})}).then(()=>console.log("sent"))
   3. Wait 10 seconds, go to the sheet tab, and reload it. A new row marked "SETUP TEST (delete this row)" must appear, with Lead Tag EARLY and Awareness Level LOW. Delete that row and keep the headings.

G. Report. Finish with a message that starts with the line SHEET SETUP REPORT and lists:
   SHEET_WEBAPP_URL: the address from step E
   SHEET_LINK: the address of the Google Sheet itself (for me only, never publish it)
   ACCOUNT: the Google account that owns the sheet
   TAB AND HEADINGS: ok or what is wrong
   TESTSUBMIT ROW: appeared and was deleted, yes or no
   WEB TEST ROW: appeared with the right tag and awareness and was deleted, yes or no
   ACCESS SETTING: what "Who has access" shows now
   CHANGED: everything you created or changed, one per line
   SKIPPED: anything you could not do, and why
```
