# Netlify setup prompt (for Claude in Chrome)

**Status: ready to run, but not yet run.** The footer contact is filled in, so nothing blocks it.

**What it does:** puts the website live on a free `.netlify.app` address, straight from the GitHub repository. Nothing to drag, no files on your computer. From then on, every change Claude Code pushes to the branch goes live by itself.

**Before you run it**
1. The footer contact is already filled in (your WhatsApp number). The prompt below still checks the page first, and stops if it ever finds a placeholder like `[CONTACT_WHATSAPP_OR_EMAIL]`.
2. Use the Chrome that is signed in to your GitHub account. The prompt asks you to sign in to Netlify if you are not.

**How to use it:** paste everything inside the first box into Claude in Chrome (Cowork), with Chrome open. It asks 2 short questions, sets up Netlify, checks the live page, and ends with a message that starts `NETLIFY SETUP REPORT`. Send that report back to Claude Code.

**Why the branch matters:** the repository's `main` branch holds only a README for now. The finished site lives on the branch `claude/spade-ace-website-e995ek`, so that is the branch Netlify publishes. When the site is later merged into `main`, the publishing branch is switched to `main` (ask Claude Code to do that step with you).

**One honest warning about Netlify's free plan.** Netlify now measures free usage in "credits", and its public forum has reports (2026) of free sites having production deploys paused. The prompt checks for this and reports exactly what it sees, and it never pays or upgrades. If your site is ever paused, tell Claude Code. The site is a single file and can be hosted for free elsewhere.

```text
You are Claude in Chrome. Put my consultancy's website live on Netlify, exactly as written below. I am not technical, so do all the clicking yourself. Ask me only the questions this prompt tells you to ask.

WHAT THIS IS FOR
Spade Ace is a growth consultancy in Dombivli, India. Its one-page website is a single file, index.html, inside the folder "site" of my public GitHub repository KingisRohan/spadeace, on the branch claude/spade-ace-website-e995ek. The branch "main" holds only a README, so it must NOT be used yet. The repository also has a file netlify.toml that says: publish the folder "site", no build step. I want Netlify to publish that folder at a free address such as spadeace.netlify.app, and to republish it by itself whenever that branch changes. The page is finished: there is nothing to build or install.

RULES
1. Use only github.com, raw.githubusercontent.com and netlify.com (including app.netlify.com). Nothing else.
2. Never type a password, a 2FA code or a card number. If a sign-in is needed, stop and ask me to sign in, then wait.
3. Stay on the Netlify Free plan. Do not start a trial, upgrade, add a team member, buy a domain, or enter payment details. Ignore and close any offer to try new features, integrations, AI or "agent" tools.
4. Connecting Netlify to GitHub opens a GitHub permission screen. Before you click Authorize or Install, tell me which GitHub account is asking and which repositories it will be able to see, and wait for my "yes". Choose "Only select repositories" and select only spadeace.
5. Do not change anything in the GitHub repository (no commits, no settings) other than what the Netlify connection adds by itself. Do not delete or rename any existing Netlify site. If a project name is taken, ask me instead of touching anything.
6. If Netlify shows a banner or message saying production deploys are paused, blocked, or that credits ran out, do not try to get around it and do not pay. Stop, copy the message word for word, and wait for me.
7. If a step fails 3 times, a CAPTCHA appears, or the screen does not match what I describe, stop, tell me what you see, and wait.
8. Netlify renames buttons and menus from time to time (for example "Sites" and "Projects"). Use the closest match.
9. Never press "Send my answers" on the website's fit-check form. Looking at the form is fine. Sending it saves a real row in my Google Sheet.
10. Work in your own tabs and close them when you finish.

FIRST, ASK ME THESE TWO QUESTIONS IN ONE MESSAGE AND WAIT FOR MY ANSWER
1. What should the free address be called? Default: spadeace (giving spadeace.netlify.app). If it is taken I will choose another.
2. Are GitHub and Netlify already signed in on this Chrome? Default: not sure, so ask me to sign in when you need it.
If I say "defaults", use every default.

THEN DO THIS

A. Check the page is ready, before you touch Netlify.
   1. Open https://github.com/KingisRohan/spadeace/blob/claude/spade-ace-website-e995ek/site/index.html and search the page text for CONTACT_WHATSAPP_OR_EMAIL. (If you cannot search that page, open https://raw.githubusercontent.com/KingisRohan/spadeace/claude/spade-ace-website-e995ek/site/index.html instead. That one can be up to 5 minutes behind.)
   2. If that text IS found, STOP. Tell me: "The footer contact in the page is still a placeholder. Ask Claude Code to fill it in, then run me again." Do nothing on Netlify.
   3. If it is NOT found, continue.
   4. Open https://github.com/KingisRohan/spadeace/blob/claude/spade-ace-website-e995ek/netlify.toml and check that it says publish = "site". If the file is missing, continue, but you will have to set the publish directory by hand in step C.

B. Sign in. Open https://app.netlify.com. If I am not signed in, ask me to sign in (or to sign up with "GitHub", which is free), then wait. Note the team name shown at the top left.

C. Create the project from GitHub.
   1. Choose "Add new project" (or "Add new site"), then "Import an existing project", then "Deploy with GitHub".
   2. If Netlify asks to authorize GitHub or to install its GitHub app, follow rule 4: pause, tell me exactly what will be shared, wait for my yes, then continue. Choose "Only select repositories" and select spadeace.
   3. Pick the repository KingisRohan/spadeace.
   4. Set "Branch to deploy" (also called the production branch) to claude/spade-ace-website-e995ek. If the list does not show it, type it exactly. Never leave it on main.
   5. Build settings: leave "Build command" EMPTY. "Publish directory" must read exactly: site (Netlify normally fills this in from netlify.toml). Clear any framework preset or automatic build command that Netlify suggests. Leave "Base directory" empty. Add no environment variables.
   6. Project name: my answer to question 1. If Netlify says it is taken, ask me.
   7. Click Deploy.

D. Wait for the deploy. Open the project's Deploys page and wait until the newest deploy says "Published" (usually under a minute). If it says Failed or Blocked, open the deploy log, copy the error line, change nothing, and put it in your report.

E. Check the live site. Open the project's address (https://NAME.netlify.app) in a new tab. Give each item pass or fail:
   1. The browser tab title is "Spade Ace: growth consultancy for owner-run businesses in India".
   2. The top of the page shows a deep-red spade logo with a white letter A and an upward arrow, the words "Spade Ace", then the headline "Your business is real. Your growth has stalled."
   3. There is NO red bar at the very top saying "Setup preview", and the footer shows a real contact, not square brackets.
   4. The address bar shows HTTPS with no certificate warning.
   5. Clicking "See if we're a fit" scrolls to a black card that asks "What is your current monthly revenue?" with four options. Only look at it (rule 9).
   6. Make the window narrow, like a phone (or use the browser's device toolbar). Nothing runs off the side of the screen.

F. Check automatic updates and the plan. Open Project configuration (or Site configuration), then Build & deploy, then Continuous deployment, and confirm: repository KingisRohan/spadeace; production branch claude/spade-ace-website-e995ek; publish directory site; build command empty; automatic publishing on. Fix anything that differs and say so. Then open the team's Usage or Billing page and note: the plan name, the credits used and left (if shown), and any banner about paused deploys, copied word for word.

G. Report. Finish with a message that starts with the line NETLIFY SETUP REPORT and lists:
   SITE_URL:
   SITE_NAME:
   NETLIFY_TEAM: (the team name only, no email address)
   GITHUB_REPOS_SHARED: which repositories Netlify can now see
   PRODUCTION_BRANCH:
   PUBLISH_DIRECTORY:
   BUILD_COMMAND:
   AUTO_PUBLISH: on or off
   LATEST_DEPLOY: status, time, and the commit message it used
   LIVE CHECKS: items 1 to 6 from step E, pass or fail, with what you saw for any fail
   PLAN_AND_CREDITS: plan name, credits used and left, and any paused-deploy banner word for word
   CHANGED: every setting you changed or created, one per line
   SKIPPED: anything you could not do, and why
```

## Later: connecting your own domain

Use this second prompt only after you have bought a domain (for example `spadeace.in`) and the site is already live from the first prompt. Buying the domain is the one step Claude does not do for you.

```text
You are Claude in Chrome. Connect my own domain to my Spade Ace website on Netlify, exactly as written below. I am not technical, so do all the clicking yourself. Ask me only the questions this prompt tells you to ask.

WHAT THIS IS FOR
My website is already live on Netlify at https://NAME.netlify.app (I will tell you NAME). I have bought a domain and want the site to appear there too, with a padlock (HTTPS).

RULES
1. Use only netlify.com (including app.netlify.com) and the DNS page of the registrar where I bought the domain. Use the registrar's page only when I am already signed in there myself.
2. Never type a password, a 2FA code or a card number. Never buy, renew, transfer or upgrade anything. Decline every offer to buy a domain or a paid plan.
3. At the registrar, only ADD the records Netlify tells you to add. Never delete or edit an existing record, especially MX or TXT records, which carry my email. If a record with the same type and name already exists (for example one that points to a parking page), stop, tell me exactly what it says, and ask before changing it.
4. Do not change the domain's nameservers unless I say yes. Adding records at my registrar is the default because it is safer for my email.
5. Use the exact values Netlify shows on screen. Do not rely on any value you remember, because Netlify can change them.
6. If a step fails 3 times, a CAPTCHA appears, or the screen does not match what I describe, stop, tell me what you see, and wait.
7. Registrars and Netlify rename buttons from time to time. Use the closest match.
8. Work in your own tabs and close them when you finish.

FIRST, ASK ME THESE QUESTIONS IN ONE MESSAGE AND WAIT FOR MY ANSWER
1. What is the domain name (for example spadeace.in), and what is my Netlify project name (NAME in NAME.netlify.app)?
2. Which company did I buy the domain from, and am I signed in there on this Chrome?
3. Which should be the main address: the plain domain (default) or the version starting with www? The other one will forward to it.

THEN DO THIS

A. In Netlify open the project, then Domain management, then "Add a domain" (or "Add a domain you already own"). Type my domain and confirm.

B. Netlify now shows what to set up. Read it carefully and write down every record it asks for. Usually it is: one A record for the plain domain (host "@") with a number value, and one CNAME record for "www" pointing to NAME.netlify.app. Use exactly what Netlify shows.

C. At my registrar, open the DNS settings for my domain and ADD those records (rule 3). Save.

D. Back in Netlify click "Verify DNS configuration" (or "Check DNS"). DNS can take a few minutes up to 48 hours. Check every few minutes for up to 20 minutes. If it is still not ready, stop and tell me it is waiting, and what to check later.

E. HTTPS: in Netlify Domain management find the HTTPS section, click "Verify DNS configuration", then "Provision certificate" (or "Let's Encrypt certificate"). When it is ready, turn on "Force HTTPS" if offered.

F. Set the main address to my answer 3.

G. Check: open https://DOMAIN and https://www.DOMAIN in new tabs. Both must load the Spade Ace site with a padlock, and one must forward to the other.

H. Report. Finish with a message that starts with the line DOMAIN SETUP REPORT and lists:
   DOMAIN:
   MAIN_ADDRESS:
   REGISTRAR:
   RECORDS_ADDED: each record exactly as added (type, host, value)
   RECORDS_LEFT_ALONE: how many existing records you did not touch
   DNS_STATUS: verified, waiting, or failed
   HTTPS_STATUS: certificate ready, waiting, or failed
   CHECKS: step G, pass or fail
   CHANGED: every setting you changed or created, one per line
   SKIPPED: anything you could not do, and why
```
