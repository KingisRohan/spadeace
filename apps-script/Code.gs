/**
 * SPADE ACE: lead capture for Google Sheets
 * ----------------------------------------------------------------------
 * What this does, in plain words:
 * When someone finishes the form on your website, the page sends their
 * answers to this script. The script adds ONE NEW ROW to the "Leads" tab
 * of the Google Sheet this script lives in. It sends no emails.
 *
 * You do not need to change anything below. Paste it, save, deploy.
 *
 * @OnlyCurrentDoc  (this tells Google the script may touch only this one sheet)
 */

// The tab that receives the rows. If it does not exist, the script creates it.
var SHEET_NAME = 'Leads';

// All timestamps are written in Indian Standard Time.
var TIME_ZONE = 'Asia/Kolkata';

// The columns, in this exact order. The last one is left blank for you to fill in.
var HEADERS = [
  'Timestamp (IST)', 'Name', 'Business Name', 'WhatsApp', 'Email',
  'Revenue', 'Business Type', 'Spends on Marketing', 'Monthly Spend',
  'Bottleneck', 'Partner Preference', 'Lead Tag', 'Awareness Level', 'Booked Call'
];

// No single answer is allowed to be longer than this (stops junk from flooding the sheet).
var MAX_LENGTH = 200;


/**
 * Opening the web app address in a browser runs this. It only proves the
 * deployment is live. If you see the sentence below, the address is correct.
 */
function doGet() {
  return ContentService
    .createTextOutput('Spade Ace lead capture is live. This address only receives submissions from your website.')
    .setMimeType(ContentService.MimeType.TEXT);
}


/**
 * Your website sends every submission here.
 * Whatever happens, this never shows the visitor anything: the page ignores the reply.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  var haveLock = false;
  try {
    // If two people submit at the same moment, they take turns.
    lock.waitLock(25000);
    haveLock = true;

    var lead = readLead_(e);
    if (!lead) return reply_({ ok: false, reason: 'not a real submission' });

    // The page may retry a send if the network was shaky. Ignore a lead we already saved.
    var cache = CacheService.getScriptCache();
    var id = lead.id ? String(lead.id).slice(0, 80) : '';
    if (id && cache.get(id)) return reply_({ ok: true, duplicate: true });

    getSheet_().appendRow(buildRow_(lead, new Date()));
    if (id) cache.put(id, '1', 21600); // remember it for 6 hours

    return reply_({ ok: true });
  } catch (err) {
    // Visible later under "Executions" in the Apps Script screen. The visitor sees nothing.
    console.error(err && err.stack ? err.stack : err);
    return reply_({ ok: false });
  } finally {
    if (haveLock) lock.releaseLock();
  }
}


/**
 * OPTIONAL CHECK. In the Apps Script screen, choose "testSubmit" in the
 * dropdown at the top and press Run. One clearly fake row appears in your
 * sheet, so you can see everything is connected. Delete that row afterwards.
 */
function testSubmit() {
  var fake = {
    id: 'test-' + new Date().getTime(),
    name: 'TEST LEAD (delete this row)',
    business: 'Test Business',
    whatsapp: '+919999999999',
    email: 'test@example.com',
    revenue: '₹5L to ₹20L',
    businessType: 'Other',
    spends: 'No',
    monthlySpend: '',
    bottleneck: 'Not enough leads',
    partner: 'Not sure yet',
    leadTag: 'STANDARD',
    awareness: 'LOW'
  };
  var result = doPost({ postData: { contents: JSON.stringify(fake) } });
  console.log(result.getContent());
}


/* ---------------------------- helpers below ---------------------------- */

// Reads what the page sent. Returns null if it does not look like a real person's submission.
function readLead_(e) {
  var data = null;
  try {
    if (e && e.postData && e.postData.contents) data = JSON.parse(e.postData.contents);
  } catch (err) {
    data = null;
  }
  if (!data && e && e.parameter) data = e.parameter; // ordinary form post, just in case
  if (!data || typeof data !== 'object') return null;

  // A real submission always has a name and some way to reach the person.
  if (!clean_(data.name) || !(clean_(data.email) || clean_(data.whatsapp))) return null;
  return data;
}

// Turns one submission into one row, in the same order as HEADERS.
function buildRow_(d, now) {
  return [
    Utilities.formatDate(now, TIME_ZONE, 'yyyy-MM-dd HH:mm:ss'),
    clean_(d.name),
    clean_(d.business),
    clean_(d.whatsapp, true),
    clean_(d.email),
    clean_(d.revenue),
    clean_(d.businessType),
    clean_(d.spends),
    clean_(d.monthlySpend),
    clean_(d.bottleneck),
    clean_(d.partner),
    clean_(d.leadTag),
    clean_(d.awareness),
    '' // Booked Call: left blank on purpose, you fill it in
  ];
}

// Makes one answer safe to store:
//  - one line, trimmed, not too long
//  - if it starts with = + - or @, Google Sheets would treat it as a formula. A leading
//    apostrophe tells Sheets "this is plain text" (the apostrophe itself is not shown).
//  - phone numbers always get the apostrophe, so +91... stays exactly as typed.
function clean_(value, alwaysText) {
  var s = (value === null || value === undefined) ? '' : String(value);
  s = s.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, MAX_LENGTH);
  if (s && (alwaysText || /^[=+\-@]/.test(s))) s = "'" + s;
  return s;
}

// Finds the "Leads" tab (creating it if needed) and writes the heading row on first use.
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    var all = ss.getSheets();
    if (all.length === 1 && all[0].getLastRow() === 0) {
      sheet = all[0];               // a brand new, empty sheet: just rename its only tab
      sheet.setName(SHEET_NAME);
    } else {
      sheet = ss.insertSheet(SHEET_NAME);
    }
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function reply_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
