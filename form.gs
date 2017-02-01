function updateChoice(){

// PERSONE  
 var ssCurrent = SpreadsheetApp.getActiveSpreadsheet()
 var sheetCodici = ssCurrent.getSheetByName("Codici").activate()
 
 var ss = SpreadsheetApp.openByUrl('https://docs.google.com/a/aci.it/spreadsheets/d/1cZonGEpFtFkV2ABqZL1R5S-BItfeK-PCsRiW1yNHCnM/edit?usp=sharing')
 var sheet = ss.getSheetByName("Team")
 var range = sheet.getDataRange()
 var lastRow = range.getLastRow()
 
 var team = sheet.getRange(2, 1, lastRow-1,2).getValues()
 var persons = []
 for (t=0; t<team.length; t++){
   persons.push (team[t][0])
 }

// CODICI ASSENZE
// leggi i codici dal foglio
 var ss = SpreadsheetApp.openByUrl('https://docs.google.com/a/aci.it/spreadsheets/d/1jYRU0gTixF_4qTRb0xyq712vu0RRBKiIq2g0Q84jowU/edit?usp=sharing')
 var sheet = ss.getSheetByName("Codici")
 var range = sheet.getDataRange()
 var lastRow = range.getLastRow()
 
 var codici = sheet.getRange(2, 7, lastRow-1).getValues()
 var formURL = ss.getFormUrl()
 Logger.log(formURL)
 var form = FormApp.openByUrl(formURL)
 Logger.log(form.getTitle())
 var items = form.getItems()
 for (i = 0; i<items.length; i++){
     var itemTitle = items[i].getTitle()
        if (itemTitle == "Personale"){
         items[i].asListItem().setChoiceValues(persons)   
        }
   
     if (itemTitle == "Codici Assenza"){
       items[i].asListItem().setChoiceValues(codici) 
         Logger.log(codici)
     }
    }
  
 ssCurrent.getRangeByName("updatedForm").setValue(new Date())
 }




