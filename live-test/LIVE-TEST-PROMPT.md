# Live test prompt (for Claude in Chrome)

**Status: ready to run once the site is live.** Run it after the Netlify prompt has put the site online.

**What it does:** tests your real, live website from start to finish, so you do not have to. Claude in Chrome fills in the fit-check form twice with obviously fake details:

1. **A fit.** It should see the white Ace card and the booking calendar, and the lead should land in your Google Sheet with the tag PRIORITY (your top-priority kind of lead).
2. **A "not the right fit".** It should see the polite message with your WhatsApp number and no calendar, and the lead should land in your sheet with the tag NOT_FIT.

It checks every column of both rows against what the rules say they should be. Then it deletes those two test rows and nothing else, and reports back.

**Safe by design.** It never books a call (it only looks at the booking form). It touches no row except its own two test rows, and only after reading each one. The fake email ends in `example.com`, an address reserved for tests that never delivers anywhere. The fake WhatsApp number is your own business number, and nothing is ever sent to it.

**Before you run it**
1. The site must already be live (the Netlify prompt is done, and you have its address).
2. Use the Chrome that is signed in to the Google account that owns the sheet `Spade Ace Leads`.

**How to use it:** paste everything inside the box into Claude in Chrome (Cowork), with Chrome open. It asks 1 question (the live address), runs both tests, cleans up, and ends with a message that starts `LIVE TEST REPORT`. Send that report back to Claude Code. It takes a few minutes, and your browser will be busy while it works. For about a minute you will see two test rows in your sheet before they are deleted.

```text
You are Claude in Chrome. Run a live test of my consultancy's website, exactly as written below. The site is already live. You will fill in its fit-check form twice with obviously fake details, check what the site shows each time, check that each test lead lands correctly in my Google Sheet, and then delete only those two test rows. I am not technical, so do all the clicking yourself. Ask me only the question this prompt tells you to ask.

WHAT THIS IS FOR
Spade Ace is a growth consultancy in Dombivli, India. Its one-page website has a short fit-check form. Every submission is saved as one row in my Google Sheet named "Spade Ace Leads" (tab "Leads"). Visitors who need more than posts or designs see a booking calendar from Cal.com. Visitors who only need posts or designs get a polite "not the right fit" message and no calendar. This test proves the live site does all of that, end to end.

RULES
1. Use only: my live website, the Cal.com calendar shown inside that website, and Google Sheets (docs.google.com) for my sheet "Spade Ace Leads". Do not open Apps Script. Do not change the sheet's sharing, headings, formatting or script.
2. Never type a password, a 2FA code or a card number. If a sign-in is needed, stop and ask me to sign in, then wait.
3. Never book a call. In the Cal.com calendar you may click a date and a time to look at the booking form, but never click Confirm, Schedule, Book or any button that completes a booking. If a booking is made by accident, tell me at once and wait for my instruction.
4. Use only the fake details below. Never use a real person's details.
5. Submit each test once only. If a result is missing, do not submit again. Follow step E instead.
6. On the last screen, fill in only the four visible boxes. The form also has a hidden trap box for spam robots. A lead that fills it is silently thrown away.
7. The only change you may make to my sheet is deleting the two test rows in step F. Delete a row only after reading it and confirming that its Name is exactly ZZ Test Lead and its Business Name is exactly ZZ Test Business. Never delete the heading row. Never delete, edit or move any other row, even if it looks like junk or a duplicate. If you are not sure about a row, stop and ask me.
8. If a step fails 3 times, a CAPTCHA appears, or the screen does not match what I describe, stop, tell me what you see, and wait. Do not work around it.
9. Websites rename buttons from time to time. Use the closest match.
10. Work in your own tabs and close them when you finish.

THE FAKE DETAILS (use exactly these)
Your name: ZZ Test Lead
Business name: ZZ Test Business
WhatsApp number: 90041 53750 (my own business number; nothing is sent to it)
Email: zz-test@example.com (example.com is reserved for tests and never delivers)

FIRST, ASK ME THIS ONE QUESTION AND WAIT FOR MY ANSWER
What is the address of the live site? Default: https://spadeace.netlify.app
If I say "defaults", use the default.

THEN DO THIS

A. Look at the sheet first. This step only reads.
   1. Open https://docs.google.com/spreadsheets/ and open the spreadsheet named exactly "Spade Ace Leads". If there is none, or more than one with that name, stop and ask me. If a sign-in is needed, stop and ask me.
   2. Open the tab "Leads".
   3. Check that row 1 holds these 14 headings in this order: Timestamp (IST), Name, Business Name, WhatsApp, Email, Revenue, Business Type, Spends on Marketing, Monthly Spend, Bottleneck, Partner Preference, Lead Tag, Awareness Level, Booked Call.
   4. Count the data rows under the headings (rows after row 1 that contain anything). Write the number down as BEFORE. If there are any, note the Name in the last one. Leave this tab open.

B. Look at the live page. Open the live address in a new tab. Confirm and write pass or fail for each:
   1. The tab title is "Spade Ace: growth consultancy for owner-run businesses in India".
   2. There is NO red bar at the very top saying "Setup preview".
   3. The footer reads "Contact: +91 90041 53750", and that number is a link (do not click it). Its address should be https://wa.me/919004153750.

C. TEST 1: a fit. Use this live tab.
   1. Click "See if we're a fit". The page scrolls to a black card. Answer by clicking, in this order. Each click moves to the next screen by itself. (The number in the card's top-left corner will read 1, 2, 3, 3, 4, 5 on the way, because the amount question counts as part of question 3. That is correct.)
      Screen 1, "What is your current monthly revenue?": ₹20L to ₹1Cr
      Screen 2, "What best describes your business?": B2B or professional services
      Screen 3, "Do you currently spend on marketing or advertising?": Yes
      Screen 4, "Roughly how much per month?": ₹25K to ₹1L
      Screen 5, "What is the biggest bottleneck right now?": Everything depends on me
      Screen 6, "How do you prefer to work with a growth partner?": Open to a revenue share
   2. Last screen, "Last step. Where do we reach you?": fill in the four boxes with the fake details (rule 6), then click "Send my answers" ONCE.
   3. Expect a white playing card with a red spade logo in the middle, the heading "Got it, ZZ.", and the line "Pick a time that suits you below.", followed by a box with the Cal.com booking calendar. Wait up to 15 seconds for the calendar. If you only see a link saying "Open the booking page", the calendar did not load: write that down.
   4. Look at the calendar. Write down the event title (it should be "Growth fit call"), the length (30 minutes), and the first few times offered. If this Chrome is on Indian time, the times should fall between 8:00 and 9:00 in the morning or between 6:00 and 9:00 in the evening, Monday to Saturday, and never on Sunday.
   5. Click the first available date, then the first available time. A booking form appears. Check that it is already filled in with: ZZ Test Lead, zz-test@example.com, ZZ Test Business, and a WhatsApp number of 90041 53750 (it may show as +91 90041 53750 or +919004153750). Do NOT click Confirm (rule 3). Write pass or fail for each of the four.
   6. Close this tab without booking.

D. TEST 2: not a fit. Open the live address again in a NEW tab, so the form starts fresh.
   1. Click "See if we're a fit" and answer, in this order:
      Screen 1, "What is your current monthly revenue?": Under ₹5L
      Screen 2, "What best describes your business?": Other
      Screen 3, "Do you currently spend on marketing or advertising?": No (the follow-up amount screen is skipped, which is correct)
      Screen 4, "What is the biggest bottleneck right now?": I just need posts or designs made
      Screen 5, "How do you prefer to work with a growth partner?": Not sure yet
   2. Last screen: fill in the same four fake details, then click "Send my answers" ONCE.
   3. Expect a BLACK card with a white spade, the heading "Thanks, ZZ. We're not the right fit.", a short polite explanation, and the line "If we have this wrong, write to us at +91 90041 53750." with that number as a link (address https://wa.me/919004153750). There must be NO booking calendar anywhere on the page. Write pass or fail for each of these.
   4. Close this tab.

E. Check the sheet. Go back to the sheet tab and reload it. Both test leads should appear as new rows at the bottom of the "Leads" tab within about 10 seconds. Wait up to 60 seconds.
   1. If a row is missing after 60 seconds, do NOT submit anything again. Open the live site in a new tab once and leave it open for 30 seconds (the page re-sends any lead that has not been saved), then reload the sheet and look again. Report what you find.
   2. Find the two rows whose Name is ZZ Test Lead. Compare each cell with the expected values below. Write down every cell that differs, and what you saw.
   3. Count the data rows now. It should be BEFORE plus 2. If it is more, a real lead may have arrived at the same moment: leave the real ones alone and say so.

   EXPECTED ROW FOR TEST 1 (the row whose Lead Tag should be PRIORITY)
   Timestamp (IST): today's date and the time you pressed Send, in Indian time, in the form 2026-10-30 19:29:48
   Name: ZZ Test Lead
   Business Name: ZZ Test Business
   WhatsApp: +919004153750
   Email: zz-test@example.com
   Revenue: ₹20L to ₹1Cr
   Business Type: B2B or professional services
   Spends on Marketing: Yes
   Monthly Spend: ₹25K to ₹1L
   Bottleneck: Everything depends on me
   Partner Preference: Open to a revenue share
   Lead Tag: PRIORITY
   Awareness Level: HIGH
   Booked Call: empty

   EXPECTED ROW FOR TEST 2 (the row whose Lead Tag should be NOT_FIT)
   Timestamp (IST): today's date and the time you pressed Send, in Indian time
   Name: ZZ Test Lead
   Business Name: ZZ Test Business
   WhatsApp: +919004153750
   Email: zz-test@example.com
   Revenue: Under ₹5L
   Business Type: Other
   Spends on Marketing: No
   Monthly Spend: empty
   Bottleneck: I just need posts or designs made
   Partner Preference: Not sure yet
   Lead Tag: NOT_FIT
   Awareness Level: LOW
   Booked Call: empty

   The WhatsApp cell is stored as text. A hidden apostrophe at the start is normal. If you can SEE a ' before the + in the cell, mention it in the report, but do not count it as a failure.

F. Clean up. Delete exactly the two test rows.
   1. For each of the two rows, read it again and confirm the Name is exactly ZZ Test Lead and the Business Name is exactly ZZ Test Business (rule 7). Then right-click its row number and choose "Delete row".
   2. Afterwards check: row 1 still holds the 14 headings; the number of data rows is back to BEFORE; if there were rows before, the last one is still the same Name you noted in step A.
   3. Touch nothing else.

G. Report. Finish with a message that starts with the line LIVE TEST REPORT and lists:
   SITE_URL:
   PAGE CHECKS: step B items 1 to 3, pass or fail
   TEST 1 SCREEN: white Ace card with logo, "Got it, ZZ.", calendar shown (pass or fail), and how many seconds the calendar took
   TEST 1 CALENDAR: event title, length, the first times offered, and whether they fit 8 to 9 am and 6 to 9 pm, Monday to Saturday
   TEST 1 PREFILL: name, email, business name, WhatsApp, each pass or fail
   BOOKINGS MADE: none (or exactly what happened)
   TEST 2 SCREEN: black card, "Thanks, ZZ. We're not the right fit.", the WhatsApp link, and no calendar, each pass or fail
   TEST 1 ROW: found or missing, after how many seconds, and every cell that differed from the expected row (or "all 14 cells match")
   TEST 2 ROW: the same
   SHEET ROW COUNTS: BEFORE, after both tests, after clean-up
   CLEAN-UP: how many rows you deleted (should be 2), whether the headings are intact, and confirmation that you touched no other row
   PROBLEMS: anything odd you saw, even if small
   SKIPPED: anything you could not do, and why
```
