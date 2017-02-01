// legge dal calendario festività e importa gli eventi sullo spreadsheet
function importHolidays(){
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets()
  var isHolidaySheet = false

  for (var i=0; i<sheets.length; i++){
    Logger.log(i)
    var activeSheetName = sheets[i].getName()
        if (activeSheetName == "Festività"){
           isHolidaySheet = true
           Logger.log(i+ " " + activeSheetName + " true")
        }
  } 
  Logger.log (isHolidaySheet)
  
  if (isHolidaySheet == false){ 
    Logger.log("crea Festività")
    ss.insertSheet().setName("Festività")
  }
  else {
    var sheet = ss.getSheetByName("Festività")
    ss.setActiveSheet(sheet).getName()
  }
  
  var cal = CalendarApp.getCalendarById('it.italian#holiday@group.v.calendar.google.com');
  var firstDateOfMonth = new Date ("January 01, 2016 00:00:00 CST");
  var lastDateOfMonth = new Date ("December 31, 2017 00:00:00 CST");
  var events = cal.getEvents(firstDateOfMonth,lastDateOfMonth);
 
  //Then loop through and write out (choose your own calendar fields, I've used just five):
 
  //scrive la fonte e la data di importazione
  var imported = [["importato dal calendario ",cal.getName()," in data ",new Date()]]
  Logger.log(imported)
  var range=sheet.getRange("A1:D1")
  range.setValues(imported)
  
  //scrive le festività
  for (var i=0;i<events.length;i++) {
   var date = incrementDate(events[i].getAllDayEndDate(),-1) // decrementa la data di un giorno
   var details=[[events[i].getTitle(),date]]
   var range=sheet.getRange(i+3,1,1,2);
   range.setValues(details);
   Logger.log(details)
 }
  
  sortSheets()
}

function isHoliday(date){
// date ('2016/12/27')
var ss = SpreadsheetApp.getActiveSpreadsheet()
var sheet = ss.getSheetByName("Festività")
var numRows = sheet.getLastRow()-1
var d = date.getDay()
if (d == 6 || d == 0){
  Logger.log("sab o dom" )
  return true
}
var holidays = sheet.getRange(2, 2, numRows).getValues()
   for(var i=0; i<holidays.length; i++) {
     var dateHolidays = new Date(holidays[i])
     if (dateHolidays.getTime() === date.getTime()) {
       Logger.log ("true")
       return true;
     }
   }
}

