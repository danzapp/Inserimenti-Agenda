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


function testArray(){
  
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/a/aci.it/spreadsheets/d/1cZonGEpFtFkV2ABqZL1R5S-BItfeK-PCsRiW1yNHCnM/edit?usp=sharing')
  var sheet = ss.getSheetByName("Team")
  var data = sheet.getRange(2, 4).getValue()
   var array = new Array()
  array.push(data)
  Logger.log("data = " + data)
  Logger.log (array.length)
  if (array[0] === ""){
    Logger.log("array = " + array)
  }
}


function empty(data)
{
  if(typeof(data) == 'number' || typeof(data) == 'boolean')
  { 
    return false; 
  }
  if(typeof(data) == 'undefined' || data === null)
  {
    return true; 
  }
  if(typeof(data.length) != 'undefined')
  {
    return data.length == 0;
  }
  var count = 0;
  for(var i in data)
  {
    if(data.hasOwnProperty(i))
    {
      count ++;
    }
  }
  return count == 0;
}