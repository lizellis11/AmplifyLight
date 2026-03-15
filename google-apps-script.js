// The ID from your Google Sheet URL
var SPREADSHEET_ID = 'PASTE_YOUR_LONG_ID_HERE';

function sendAutoReply(e) {
  // Open the sheet and get the most recent submission
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
  var lastRow = sheet.getLastRow();
  var data = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Column order from your Google Form: Timestamp, Name, Email, Event, Message
  var name = data[1];
  var email = data[2];

  // Build the auto-reply email
  var subject = "Thank you for reaching out! - Amplify Light";

  var body = "Hi " + name + ",\n\n"
    + "Thank you so much for reaching out - I am truly grateful to hear from you.\n\n"
    + "I read every message personally, and I will get back to you very soon.\n\n"
    + "In the meantime, the fact that you reached out says something beautiful about you.\n\n"
    + "With gratitude,\n"
    + "Liz Ellis\n"
    + "Amplify Light\n"
    + "amplifylight.com";

  // Send it
  MailApp.sendEmail(email, subject, body);
}
