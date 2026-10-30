# Spade Ace: setup guide in plain words

You do not need to code. Words that sound technical are explained the first time they appear.

## What is in this project

| File | What it is |
| --- | --- |
| `site/index.html` | Your whole website. One file. This is what you put online. |
| `brand/` | Your logo as sharp vector files (red, and white for dark backgrounds) and a square PNG ready to upload as a profile picture. |
| `apps-script/Code.gs` | A small program that lives inside your Google Sheet. It adds one new row for every person who finishes the form. |
| `apps-script/CHROME-TASK.md` | The exact job list Claude follows to set up the Google Sheet through your Chrome. |
| `apps-script/SHEET-SETUP-PROMPT.md` | The ready-to-paste prompt for Claude in Chrome that sets up the Google Sheet and publishes the script. |
| `netlify/NETLIFY-SETUP-PROMPT.md` | The ready-to-paste prompt for Claude in Chrome that puts the site live on Netlify, and (second box) later connects your own domain. |
| `netlify.toml` | A three-line note that tells Netlify to publish the `site` folder. |
| `cal-com/CAL-SETUP-PROMPT.md` | The ready-to-paste prompt for Claude in Chrome that sets up your Cal.com booking page. |
| `SETUP.md` | This guide. |

## The colours

White is the background. The red of your logo (`#93030F`) is the highlight. Black is the supporting colour: the type, the thick rules, the black playing card the form is dealt on, the "who this is not for" band and the footer. The colours are defined once, at the top of the style section of `index.html` (search for `--red`).

**The logo.** Your logo is drawn into the page as a vector (a shape made of curves, not a picture), so it stays sharp on every screen and costs almost nothing to load. It appears at the top, as the centre of the white Ace card a fit is dealt, as the browser-tab icon, and large and white at the bottom of the footer. It is defined once, near the top of the `<body>` in `index.html` (search for `symbol id="logo"`).

**The type.** Big statements are set in Abril Fatface, a heavy 19th-century advertising face (the same era and print world as playing cards). Everything you read or tap is Archivo. Both load free from Google Fonts.

---

## The 3 placeholders

A **placeholder** is a stand-in written in square brackets, like `[CAL_LINK]`. It marks something only you know. There are exactly three, and each appears once, in a box at the very top of `site/index.html`.

| Placeholder | What goes there | Who fills it in |
| --- | --- | --- |
| `[SHEET_WEBAPP_URL]` | The long web address Google gives for your sheet script. It ends in `/exec`. | **Done.** Claude filled it in (Part A) |
| `[CAL_LINK]` | Your Cal.com booking link. | **Done.** It is `spadeace/fit-call` (Part A2) |
| `[CONTACT_WHATSAPP_OR_EMAIL]` | The WhatsApp number (with country code) or email shown in the footer and in the "not the right fit" message, for example `+91 98765 43210` or `hello@yourdomain.com`. | **You, the only one left.** Tell Claude the number or email |

A WhatsApp number becomes a tap-to-chat link automatically. An email becomes a tap-to-email link.

If you ever edit the file by hand, use Notepad or TextEdit (Format, then Make Plain Text), never Word or Google Docs, which change the quote marks and break the page. Replace only the text between the quote marks and keep the quote marks and commas.

While any of the three still has square brackets, the page shows a **red setup bar** at the top listing what is missing. It disappears by itself once all three are filled. This is on purpose, so the page cannot go live with a blank by accident.

---

## Part A: The Google Sheet (Claude does this part)

Some words first:
- **Apps Script** is Google's free tool for adding small programs to a Sheet.
- **Deploy** means "publish this program so your website can talk to it".
- A **web app** is a program that has its own web address. Your website sends each new lead to that address.

Claude created the sheet, added the script, published it and put the address into the page, working in your Chrome. You did not have to do any of it.

**Status: done on 18 October 2026.**

**What was set up**
- A Google Sheet called `Spade Ace Leads` in your Google account, with a `Leads` tab and the 14 headings in row 1 (bold and frozen).
- The script from `apps-script/Code.gs`, attached to that sheet and published as a web app named `Spade Ace leads` (Version 1). It runs as you, and **anyone** can send data to it, so visitors never need a Google login.
- A test lead sent from an outside website, as an anonymous visitor, added one correct row (Lead Tag EARLY, Awareness Level LOW). The test rows were then deleted, and the sheet now holds only the headings.
- The web app address is in `index.html` in place of `[SHEET_WEBAPP_URL]`.

**If the script ever changes:** the published version does not update by itself. Claude publishes a new version (Deploy, Manage deployments, New version). The address stays the same.

The job list Claude followed is in `apps-script/CHROME-TASK.md`, and `apps-script/SHEET-SETUP-PROMPT.md` is the same job as a ready-to-paste prompt, in case it ever has to be redone.

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

## Part A2: Cal.com (Claude in Chrome does this part)

Claude in Chrome set up your Cal.com booking page from `cal-com/CAL-SETUP-PROMPT.md`.

**Status: done on 18 October 2026.** The public page is `https://cal.com/spadeace/fit-call`, and the website uses `spadeace/fit-call`.

**What was set up**
- A **Growth fit call**: 30 minutes, on Google Meet, with your Google Calendar connected so it never double-books you and adds each booking to it.
- **Your hours:** Monday to Saturday, 08:00 to 09:00 and 18:00 to 21:00 IST. Sunday off. This is its own schedule, "Spade Ace calls", so your other availability is untouched.
- **Limits:** at least 4 hours' notice (time to read each lead's answers first), a 10 minute buffer after each call, at most 4 bookings a day, bookable up to 30 days ahead.
- **Booking questions:** Name, Email, Business name and WhatsApp number (all required), plus an optional "Anything we should know before the call?". The page fills in the first four for the visitor.
- **Calendar entry name:** "Fit call: {visitor} ({business})", so you can see who is on each call at a glance.
- **Reminder:** an email to the visitor 1 hour before the call.
- The sample event types Cal.com starts you with are hidden. Nothing was deleted.
- A pre-fill test passed: opening the booking page with a name, email, business and WhatsApp number filled all four fields. No real booking was made.

**Good to know about the buffer:** with a 10 minute buffer, booking 08:00 hides the 08:30 slot. So you get at most 1 morning call and 3 evening calls a day, which matches the cap of 4. If you would rather offer more slots, ask Claude to set the buffer to 0 and raise the daily cap.

---

## Part B: Put the site online for free with Netlify

**Netlify** is a free hosting company. It keeps your website on its computers so anyone can open it by typing an address.

**Recommended: let Claude do it.** `netlify/NETLIFY-SETUP-PROMPT.md` is a ready-to-paste prompt for Claude in Chrome. It connects Netlify to your GitHub repository, publishes the `site` folder, checks the live page, and reports back. Nothing to drag, and no files on your computer. From then on, every change Claude Code makes to the site goes live by itself within a minute or so. The file `netlify.toml` in the project tells Netlify which folder to publish.

Three things to know first:
- **The footer contact must be filled in first.** The prompt refuses to publish while the footer still shows `[CONTACT_WHATSAPP_OR_EMAIL]`.
- **The branch.** Right now the finished site lives on the branch `claude/spade-ace-website-e995ek`; the `main` branch has only a README. So Netlify publishes that branch. Once the site is merged into `main`, ask Claude Code to switch Netlify to `main`.
- **Netlify's free plan now counts usage in "credits".** Netlify's public forum has 2026 reports of free sites having deploys paused. The prompt checks for this and reports what it sees. It never pays or upgrades. If your site is ever paused, tell Claude Code: the site is one file and can be hosted for free somewhere else.

### Or do it yourself with Netlify Drop

**Netlify Drop** lets you publish a website by dragging a folder onto a web page. No coding, no command line.

1. Create a free account first at [netlify.com](https://www.netlify.com) (Sign up) and stay logged in. Why: a site dropped without an account is temporary and is deleted after a short time (about an hour). A site dropped while logged in stays.
2. On your computer, make a new folder called `spade-ace-site`. Put your finished `index.html` inside it. The file must be named exactly `index.html`.
3. Go to [app.netlify.com/drop](https://app.netlify.com/drop) (the same page is also reachable at netlify.com/drop).
4. Drag the **folder** (not the file) onto the box on that page. Wait a few seconds.
5. Netlify shows a live address like `https://bright-otter-1234.netlify.app`. Open it. Your site is live.
6. Give it a friendlier address: in Netlify open your project, then **Project configuration** (called Site configuration in older screens), then **Change project name**. Choose something like `spadeace`, giving `spadeace.netlify.app`.
7. **Test the real thing** (see the checklist below) on that live address.

**To update a Drop site later:** edit `index.html`, then in Netlify open the project, click **Deploys**, and drag the folder onto the drop box on that page. The address stays the same. (A site made with the prompt above updates by itself instead.)

---

## Part C: Connect your own domain later (for example spadeace.in)

**Recommended: let Claude do it.** The second box in `netlify/NETLIFY-SETUP-PROMPT.md` is a prompt for Claude in Chrome that adds the domain in Netlify and adds the two records at your registrar without touching your email records. You still buy the domain yourself. The manual steps are below.

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

The exact names of buttons in Netlify and at registrars change from time to time. If a label is slightly different, look for the closest match, or tell Claude what you see.

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
| A red bar at the top of the page | One of the three settings still has square brackets. See "The 3 placeholders" |
| Test submissions never reach the sheet | Tell Claude. Claude checks the web app address ends in `/exec`, opens it to confirm the "lead capture is live" message, confirms access is set to **Anyone**, checks the script has been re-published after any edit, and reads the error list under **Executions** in Apps Script |
| The calendar does not show | Check `[CAL_LINK]` by opening `https://cal.com/` followed by your link in a browser. If you do not see your booking page there, fix the event in Cal.com. After about 10 seconds without a calendar, visitors automatically get a plain "Open the booking page" link instead of an error |
| Someone tells you the form "did nothing" | The visitor never sees an error by design. Saving happens quietly in the background. Check the sheet. If the visitor's phone had no signal, the page keeps their answers and sends them the next time they open the page |

---

## Good to know

- **Visitors never see an error.** If saving to the sheet fails, they still see their result screen. The page retries on its own, and the sheet script ignores a repeat of the same lead.
- **The rules live in one place.** All the logic (who is NOT_FIT, PRIORITY, EARLY, STANDARD, and the awareness levels) sits in one block in `index.html` headed `THE RULES`. The sheet script only records what the page sends. If you ever want a rule changed, change it there only.
- **Spam.** Anyone who views your page's source can find the sheet address. The page has a hidden trap for basic bots, and the script ignores anything without a name and a way to contact the person. If junk rows ever appear, tell Claude and a lock can be added.
- **Privacy.** You are collecting names, phone numbers and emails. India's data protection law (the DPDP Act, 2023) expects businesses to be clear about what they collect and why. The form says "We use your details only to get back to you." You may want a short privacy page later. This guide is not legal advice, so ask a lawyer if you are unsure.
- **Speed.** The page is one file of about 49 KB plus two small Google Fonts files (about 70 KB together). The Cal.com calendar only loads after someone finishes the form, so it never slows the first visit.
- **Real results.** The Proof section describes the two engagements without any numbers, because none were provided. If you have a real, checkable result for either one, add it as one more sentence. The spot is marked with a comment in `index.html` (search for `OPTIONAL`).
