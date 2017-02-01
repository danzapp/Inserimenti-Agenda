// recupera il link delle risposte dal modulo e lo pubblica sul foglio alla colonna 'columnIndex')
function getEditResponseUrls(){
  
  Logger.log ("start getEditResponseURL")
  
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheetName = 'Inserimenti'
  var sheet = ss.getSheetByName(sheetName)
  var columnIndex = 2;
  var formURL = ss.getFormUrl()
  var form = FormApp.openByUrl(formURL)
  
  var data = sheet.getDataRange().getValues();
  Logger.log("data length = " + data.length)
  var form = FormApp.openByUrl(formURL);
  for(var i = 3; i < data.length; i++) {
    Logger.log ("Scorre la riga " + i)
    if(data[i][0] != '' && data[i][columnIndex-1] == '') {
      var timestamp = data[i][0];
      var formSubmitted = form.getResponses(timestamp);
      Logger.log (formSubmitted)
      if(formSubmitted.length < 1) continue;
      var editResponseUrl = formSubmitted[0].getEditResponseUrl();
      Logger.log ("scrive l'editResponseUrl")
      sheet.getRange(i+1, columnIndex).setValue(editResponseUrl);
    }
  }
}


function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '' + obj[p] + '\n';
        }
    }
    return str;
}


function sortSheets () {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetNameArray = [];
  var sheets = ss.getSheets();
 
  for (var i = 0; i < sheets.length; i++) {
    sheetNameArray.push(sheets[i].getName());
  }
 
  sheetNameArray.sort();
 
  for( var j = 0; j < sheets.length - 3; j++ ) {
    ss.setActiveSheet(ss.getSheetByName(sheetNameArray[j]));
    ss.moveActiveSheet(j + 1);
  }
}

function sheetWasEdited(event) {
  var sheet = SpreadsheetApp.getActiveSheet();

}

