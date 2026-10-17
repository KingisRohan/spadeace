# Spade Ace: setup guide in plain words

You do not need to code. Every step below says exactly what to click.
Words that sound technical are explained the first time they appear.

## What is in this project

| File | What it is |
| --- | --- |
| `site/index.html` | Your whole website. One file. This is what you put online. |
| `apps-script/Code.gs` | A small program that lives inside your Google Sheet. It adds one new row for every person who finishes the form. |
| `SETUP.md` | This guide. |

---

## The 3 blanks you fill in (placeholders)

A **placeholder** is a stand-in written in square brackets, like `[CAL_LINK]`. It marks something only you know. There are exactly three, and each appears once, in a box at the very top of `site/index.html`.

| Placeholder | What to put there | Where you get it | Example |
| --- | --- | --- | --- |
| `[SHEET_WEBAPP_URL]` | The long web address Google gives you after Part A, step 7 | Part A below | `https://script.google.com/macros/s/AKfycb.../exec` (must end in `/exec`) |
| `[CAL_LINK]` | Your Cal.com booking link. The full link or just the end of it both work | Cal.com, then Event Types, open your event, copy its link | `rohan/30min` or `https://cal.com/rohan/30min` |
| `[CONTACT_WHATSAPP_OR_EMAIL]` | The WhatsApp number (with country code) or email shown in the footer and in the "not the right fit" message | You decide | `+91 98765 43210` or `hello@yourdomain.com` |

**How to fill them in**

1. Open `index.html` in a plain text program: Notepad on Windows, or TextEdit on a Mac (choose Format, then Make Plain Text). Do **not** use Word or Google Docs, they change the quote marks and break the page.
2. The first thing in the file is a box with your three settings. Replace only the text between the quote marks. Keep the quote marks and the commas.
3. Save the file.

Before:

```
sheetUrl: '[SHEET_WEBAPP_URL]',
calLink: '[CAL_LINK]',
contact: '[CONTACT_WHATSAPP_OR_EMAIL]'
```

After:

```
sheetUrl: 'https://script.google.com/macros/s/AKfycb.../exec',
calLink: 'rohan/30min',
contact: '+91 98765 43210'
```

While any of the three still has square brackets, the page shows a **yellow setup bar** at the top listing what is missing. It disappears by itself once all three are filled. This is on purpose, so you cannot launch with a blank by accident.

A WhatsApp number in the contact setting becomes a tap-to-chat link automatically. An email becomes a tap-to-email link.

---

## Part A: Connect the Google Sheet (about 10 minutes)

Some words first:
- **Apps Script** is Google's free tool for adding small programs to a Sheet. You do not write anything. You paste.
- **Deploy** means "publish this program so it can receive data from the internet".
- A **web app** is a program that has its own web address. Your website sends each new lead to that address.

**Steps**

1. Go to [sheets.google.com](https://sheets.google.com) and click **Blank spreadsheet**. Use the Google account you want to own your leads.
2. Click the title at the top left ("Untitled spreadsheet") and name it `Spade Ace Leads`.
3. Click **Extensions**, then **Apps Script**. A new tab opens with a code editor.
4. Click the project name at the top left ("Untitled project") and rename it `Spade Ace Leads`. This name appears in a permission screen later, so a clear name helps.
5. In the editor you will see a few lines of sample code. Select all of it (Ctrl+A, or Cmd+A on a Mac) and delete it. Open `apps-script/Code.gs`, copy everything in it, and paste it into the empty editor. Click the **Save** icon (a disk).
6. **Optional but recommended: a 30-second test.** In the bar at the top of the editor, find the dropdown that lists function names and choose `testSubmit`. Click **Run**.
   - Google now asks for permission. This is normal. Click **Review permissions**, pick your Google account.
   - You will see **"Google hasn't verified this app"**. That warning appears for every script you write yourself. It is your own script on your own sheet. Click **Advanced** (small link, bottom left), then **Go to Spade Ace Leads (unsafe)**, then **Allow**. The script can only touch this one sheet.
   - Go back to your sheet tab. You should see a heading row and one row marked `TEST LEAD (delete this row)`. Delete that test row. Keep the heading row.
7. **Publish it.** Click the blue **Deploy** button (top right), then **New deployment**.
   - Click the small **gear icon** next to "Select type" and choose **Web app**.
   - Description: type `Spade Ace leads`.
   - **Execute as: Me.** This means the program writes to your sheet using your permission, so visitors never need a Google login.
   - **Who has access: Anyone.** This must say **Anyone**, not "Anyone with Google account". If it says the second one, visitors will be asked to sign in and nothing will be saved.
   - Click **Deploy**. If Google asks for permission again, do the same as in step 6.
   - A box shows a **Web app URL**. Click **Copy**. It looks like `https://script.google.com/macros/s/...long mix of letters.../exec` and ends in `/exec`.
8. **Check it is live.** Paste that address into a new browser tab. You should see: *"Spade Ace lead capture is live..."*. If you see a Google sign-in page instead, "Who has access" is not set to Anyone (see "If something goes wrong").
9. Paste that same address into `index.html`, replacing `[SHEET_WEBAPP_URL]` (see "How to fill them in" above).

**If you ever change the script later:** click Deploy, then **Manage deployments**, click the pencil, set Version to **New version**, click Deploy. The address stays the same. Without a new version, your edits are not live.

### What each column in the sheet means

| Column | Meaning |
| --- | --- |
| Timestamp (IST) | When they submitted, in Indian time |
| Name, Business Name, WhatsApp, Email | Their details. WhatsApp is saved like `+919876543210` so you can paste it straight into WhatsApp |
| Revenue, Business Type, Spends on Marketing, Monthly Spend, Bottleneck, Partner Preference | Their answers, in the exact words they tapped. Monthly Spend is blank when they do not spend |
| **Lead Tag** | One per person. **NOT_FIT**: they only need posts or designs made (no calendar was shown). **PRIORITY**: monthly revenue ₹20L or more, spends on marketing, and open to a fee plus performance share or to a revenue share. **EARLY**: revenue under ₹5L. **STANDARD**: everyone else |
| **Awareness Level** | **LOW**: spends nothing on marketing yet. **MEDIUM**: spends under ₹25K a month. **HIGH**: spends ₹25K or more a month |
| Booked Call | Blank. You fill it in |

Tip for **Booked Call**: the page fills the visitor's name and email into your Cal.com booking form for them, so the email on the Cal.com booking usually matches the email in the sheet. Use it to match people.

---

## Part B: Put the site online for free with Netlify Drop

**Netlify** is a free hosting company. **Netlify Drop** lets you publish a website by dragging a folder onto a web page. No coding, no command line.

1. Create a free account first at [netlify.com](https://www.netlify.com) (Sign up) and stay logged in. Why: a site dropped without an account is temporary and is deleted after a short time (about an hour). A site dropped while logged in stays.
2. On your computer, make a new folder called `spade-ace-site`. Put your finished `index.html` inside it. The file must be named exactly `index.html`.
3. Go to [app.netlify.com/drop](https://app.netlify.com/drop) (the same page is also reachable at netlify.com/drop).
4. Drag the **folder** (not the file) onto the box on that page. Wait a few seconds.
5. Netlify shows a live address like `https://bright-otter-1234.netlify.app`. Open it. Your site is live.
6. Give it a friendlier address: in Netlify open your project, then **Project configuration** (called Site configuration in older screens), then **Change project name**. Choose something like `spadeace`, giving `spadeace.netlify.app`.
7. **Test the real thing** (see the checklist below) on that live address.

**To update the site later:** edit `index.html`, then in Netlify open the project, click **Deploys**, and drag the folder onto the drop box on that page. The address stays the same.

---

## Part C: Connect your own domain later (for example spadeace.in)

Some words first:
- A **domain** is your web name, like `spadeace.in`. You rent it for a yearly fee from a **registrar** (GoDaddy, Namecheap, BigRock, Hostinger and others).
- **DNS** is the list that tells the internet which computer to show when someone types your domain. You are about to add two lines to that list.

**Steps**

1. Buy the domain from any registrar. Hosting on Netlify stays free.
2. In Netlify open your project, click **Domain management**, then **Add a domain** (or "Add a domain you already own"). Type your domain, for example `spadeace.in`, and confirm.
3. Netlify now shows what to change. Pick **one** of these:
   - **Easiest, let Netlify handle it:** Netlify shows four "nameserver" addresses. In your registrar's dashboard find **Nameservers** or **DNS management** and replace the existing ones with Netlify's four.
   - **Keep DNS at your registrar:** add these two records in the registrar's DNS panel (**record** means one line in that list):
     - Type **A**, Host `@` (sometimes shown blank), Value `75.2.60.5`. This points `spadeace.in`.
     - Type **CNAME**, Host `www`, Value `your-project-name.netlify.app`. This points `www.spadeace.in`.
4. Wait. It is usually quick, but it can take up to 48 hours. Netlify shows a green tick when it works.
5. **HTTPS (the padlock):** Netlify adds it free and automatically once the domain works. If it does not appear after a few hours, open Domain management, scroll to **HTTPS**, and click **Verify DNS configuration**, then **Provision certificate**.
6. Nothing inside `index.html` needs to change when you add a domain.

The exact names of buttons in Netlify and at registrars change from time to time. If a label is slightly different, look for the closest match, or tell me what you see and I will guide you.

---

## Test it properly before you share the link (5 minutes)

Do this on the live address, on your phone.

1. Open the page. Tap **See if we're a fit** and answer the questions with made-up details but **your own email**.
   - Try answering **"I just need posts or designs made"** for question 4. You should see the polite "not the right fit" message and **no calendar**.
   - Try again with any other answer. You should see **"Got it"** and the Cal.com calendar.
2. Open your Google Sheet. A new row should appear within a few seconds for each test, with the right Lead Tag and Awareness Level.
3. Delete the test rows (keep the heading row).

---

## If something goes wrong

| What you see | What to do |
| --- | --- |
| A yellow bar at the top of the page | One of the three settings still has square brackets. Fill it in |
| Test submissions never reach the sheet | 1) Open your web app address in a browser. It must show "lead capture is live". 2) If it shows a Google sign-in, set **Who has access** to **Anyone** (Deploy, Manage deployments, pencil, Who has access, New version, Deploy). 3) The address must end in `/exec`. 4) In Apps Script click **Executions** on the left to see any error message |
| The calendar does not show | Check `[CAL_LINK]` by opening `https://cal.com/` followed by your link in a browser. If you do not see your booking page there, fix the event in Cal.com. After about 10 seconds without a calendar, visitors automatically get a plain "Open the booking page" link instead of an error |
| Someone tells you the form "did nothing" | The visitor never sees an error by design. Saving happens quietly in the background. Check the sheet. If the visitor's phone had no signal, the page keeps their answers and sends them the next time they open the page |

---

## Good to know

- **Visitors never see an error.** If saving to the sheet fails, they still see their result screen. The page retries on its own, and the sheet script ignores a repeat of the same lead.
- **The rules live in one place.** All the logic (who is NOT_FIT, PRIORITY, EARLY, STANDARD, and the awareness levels) sits in one block in `index.html` headed `THE RULES`. The sheet script only records what the page sends. If you ever want a rule changed, change it there only.
- **Spam.** Anyone who views your page's source can find the sheet address. The page has a hidden trap for basic bots, and the script ignores anything without a name and a way to contact the person. If junk rows ever appear, tell me and we will add a lock.
- **Privacy.** You are collecting names, phone numbers and emails. India's data protection law (the DPDP Act, 2023) expects businesses to be clear about what they collect and why. The form says "We use your details only to get back to you." You may want a short privacy page later. I am not a lawyer, so ask one if you are unsure.
- **Speed.** The page is one file of about 42 KB plus two small Google Fonts files. The Cal.com calendar only loads after someone finishes the form, so it never slows the first visit.
- **Real results.** The Proof section describes the two engagements without any numbers, because none were provided. If you have a real, checkable result for either one, add it as one more sentence. The spot is marked with a comment in `index.html` (search for `OPTIONAL`).
