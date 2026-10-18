# Cal.com setup prompt (for Claude in Chrome)

**Status: not run yet.** The session that built the website could not reach the owner's browser.

**How to use it:** paste everything inside the box below into Claude in Chrome (Cowork), with Chrome open. It asks 4 short questions, sets up Cal.com, checks its own work, and ends with a message that starts `CAL SETUP REPORT`. Send that report back to Claude Code. Claude then puts the booking link into the website and re-tests it.

```text
You are Claude in Chrome. Set up my Cal.com booking page for my consultancy, Spade Ace, exactly as written below. I am not technical, so do all the clicking yourself. Ask me only the questions this prompt tells you to ask.

WHAT THIS IS FOR
Spade Ace is a growth consultancy in Dombivli, India. Our website has a short qualification form. People who qualify see a Cal.com calendar on the page and book a call. The website passes the visitor's name, email, business name and WhatsApp number into the booking form, so the booking questions below must exist with exactly these identifiers: business and whatsapp. All times are Indian Standard Time (Asia/Kolkata).

RULES
1. Use only cal.com. The one exception is Google's own permission screen, and only if I approve connecting my calendar.
2. Never type a password, a 2FA code or a card number. If a sign-in is needed, stop and ask me.
3. Stay on the Free plan. Do not start a trial, upgrade, or enter payment details. If a setting needs a paid plan, skip it and say so in the report.
4. If my Cal.com account already exists, leave everything already there alone. Change only what is listed below. Do not change my username, display name, brand colour, theme, language or account time zone. Do not delete anything. If something seems to conflict, ask me first.
5. Do not make a real booking.
6. If a step fails 3 times, a CAPTCHA appears, or the screen does not match what I describe, stop, tell me what you see, and wait.
7. Cal.com renames buttons and tabs from time to time. Use the closest match.
8. Work in your own tabs and close them when you finish.

FIRST, ASK ME THESE FOUR QUESTIONS IN ONE MESSAGE AND WAIT FOR MY ANSWER
1. Which days and hours can people book? Default: Monday to Saturday, 10:00 to 18:00 IST.
2. How long should the call be? Default: 30 minutes.
3. Should Cal.com connect to my Google Calendar so it never double-books me and adds each booking to my calendar? Default: yes, using the Google account already signed in on this Chrome. If yes, ask me again just before you click Allow on Google's permission screen, and name the account.
4. Where do calls happen? Default: Google Meet (needs question 3 to be yes, otherwise use Cal Video).
If I say "defaults", use every default.

THEN DO THIS

A. Sign in. Open https://app.cal.com and use the account that is already signed in. If none is, ask me which email to use. Note my username (it appears in the public link, cal.com/USERNAME). If this is a brand new account with no username yet, choose spadeace, and if that is taken, ask me.

B. Calendar. If I said yes to question 3, connect Google Calendar (Apps, then Google Calendar, or Settings, then Calendars). Make it check that calendar for conflicts and add new bookings to it.

C. Availability. Create a NEW schedule named "Spade Ace calls". Do not edit my existing schedules. Time zone Asia/Kolkata. Available days and hours exactly as I answered in question 1. No date overrides.

D. Event type. Create a new event type with these settings:
   - Title: Growth fit call
   - URL slug: fit-call (if it already exists, stop and ask me)
   - Description, exactly: A focused call to look at your numbers, find what is stalling growth, and see if working together makes sense. We read your answers before the call, so we can skip the basics.
   - Duration: my answer to question 2.
   - Location: my answer to question 4.
   - Availability: use the schedule "Spade Ace calls".
   - Limits: minimum notice 4 hours. Buffer after the event 10 minutes. Time slot interval equal to the duration. Limit to 4 bookings per day. Allow booking up to 30 days into the future (rolling).
   - Advanced: Requires confirmation off. Hidden off.
   - Booking questions: keep Name and Email as required. Add a question of type Short text, label "Business name", identifier business, Required. Add a question of type Phone, label "WhatsApp number", identifier whatsapp, Required. Keep "Additional notes" optional and change its label to "Anything we should know before the call?".
   - Event name shown in calendars: "Fit call: {Scheduler}". If the editor lets you insert my Business name answer into the name, use "Fit call: {Scheduler} ({business})" instead.
   - Save.

E. Emails. Make sure booking confirmation emails to me and to the attendee are on (they usually are by default). If the Free plan lets you add an email reminder to the attendee 1 hour before the call, add it. If that needs a paid plan, skip it.

F. Tidy up. Only if this is a brand new account that came with sample event types such as "15 min meeting", "30 min meeting" or "Secret meeting", switch them to Hidden (do not delete them). Otherwise leave my existing event types alone.

G. Check your work.
   1. Open https://cal.com/USERNAME/fit-call in a new tab. Confirm the title, duration and location are right, and that the available times match my hours in IST.
   2. Open https://cal.com/USERNAME/fit-call?name=Test%20Lead&email=test%40example.com&business=Test%20Co&whatsapp=%2B919876543210 , pick any time slot, and confirm Name, Email, Business name and WhatsApp number are already filled in on the booking form. Do not click Confirm.
   3. If anything is wrong, fix it and check again.

H. Report. Finish with a message that starts with the line CAL SETUP REPORT and lists:
   CAL_LINK: USERNAME/fit-call
   PUBLIC_URL: https://cal.com/USERNAME/fit-call
   ACCOUNT: the email of the Cal.com account
   CALENDAR: the connected Google account, or none
   LOCATION:
   HOURS:
   DURATION:
   LIMITS: notice, buffer, daily cap, booking window
   BOOKING QUESTIONS:
   PREFILL TEST: passed or failed, and what you saw
   CHANGED: every setting you changed, one per line
   SKIPPED: anything you could not do, and why
```
