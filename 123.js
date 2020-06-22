    function sendEmails() {
        // Get the sheet where the data is, in sheet 'system'
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("today")
        var startRow = 2;
        // First row of data to process since there is a header row
        var numRows = sheet.getRange(1,5).getValue();
        // Number of rows to process is set by a formula which counts rows
        // Fetch the range of cells A2:B6 where the emails and messages are
        var dataRange = sheet.getRange(startRow, 1, numRows, 2) // Fetch values for each row in the Range to input into the mailing system
        var data = dataRange.getValues(); // This processes the emails you want to send
        for (i in data)
        {
            var row = data[i];
            var emailAddress = row[0]; // First column is the email address
            var message = row[1]; // Second column is the message
            var subject = "Standup meeting"; // This is the subject of the email
            // This parses the data for the email to send
            MailApp.sendEmail(emailAddress, subject, message);
        } }





        var enteredTasks = false;
        //check if there are no tasks
        tableRangeValues.forEach(tasks=> {
                                        if(tasks[1]!=''){
                                        enteredTasks = true;
                                        }
                                   })

        if(enteredTasks){
          GmailApp.sendEmail(reciverEmail,emailHEader, 'some text', { htmlBody: htmlForEmail ,cc: ccEmail });
        }else{
          console.log('No Tasks are present');
        }


        var enteredTasks = false;
        //check if there are no tasks
        tableRangeValues.forEach(tasks=> {
                                        if(tasks[1]!=''){
                                            enteredTasks = true;
                                        }
                                   })

        if(enteredTasks){
          GmailApp.sendEmail(reciverEmail,emailHEader, 'some text', { htmlBody: htmlForEmail ,cc: ccEmail });
          console.log('No Tasks are present' + ' ' + currentDate);
        }else{
          console.log('No Tasks are present' + ' ' + currentDate);
        }


        function sendEmails() {
            const ss = SpreadsheetApp.getActiveSpreadsheet();
            const ws = ss.getSheetByName("today");

            const htmlTemplate = HtmlService.createTemplateFromFile("email");
            const lr = ws.getLastRow();
            const tableRangeValues = ws.getRange(2, 3,lr-1,2).getDisplayValues();

            const reciverEmail = ws.getRange(2, 1).getDisplayValue();
            const ccEmail = ws.getRange(2, 2).getDisplayValue();

            htmlTemplate.tableRangeValues = tableRangeValues;

            const htmlForEmail = htmlTemplate.evaluate().getContent();

            var currentDate = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy")
            const emailHEader = "Status Update Summary - " + ' ' + currentDate;

              var enteredTasks = false;
              //check if there are no tasks
              tableRangeValues.forEach(tasks=> {
                                              if(tasks[1]!=''){
                                                  enteredTasks = true;
                                              }
                                         })

              if(enteredTasks){
                GmailApp.sendEmail(reciverEmail,emailHEader, 'some text', { htmlBody: htmlForEmail ,cc: ccEmail });
                console.log('No Tasks are present' + ' ' + currentDate);
              }else{
                console.log('No Tasks are present' + ' ' + currentDate);
              }
          }
