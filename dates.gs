function convertStringDate(date){
 // converte una data dal formato "yyyy-MM-dd" ad object Date
 // var date  = "2016-06-23"
 var dateArray = date.split("-");
 Logger.log("date Array " + dateArray)
 var year = dateArray[0]
 var month = dateArray[1]
 var day = dateArray[2]
 
 var convertedDate = new Date(year,month-1,day)
 Logger.log(convertedDate)
 return
}

function incrementStringDate(date,d){
// incrementa una data dal formato "yyyy-MM-dd" ad object Date  

  Logger.log("incrementStringDate di " + date)
   var dateArray = date.split("-");
   
   var year = parseInt(dateArray[0])
   var month = parseInt(dateArray[1])
   var day = parseInt(dateArray[2])
   
   day = day +1 
   if ( day  > daysInMonth(month, year)){
     month = month + 1 
     if (month > 12){
       year = year +1 
     }
   }
   
   day = day.toString()
   month = month.toString()
   
   if (day.length <2) {
     day = "0" + day
   }
   
   if (month.length <2) {
     month = "0" + month
   }
   
   Logger.log(month)
   
   var incDate = (year + "-"  +  month + "-" + day)
   Logger.log ("incDate = " + incDate)
   return incDate
}



 
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}



function incrementDate(date, d){
  // var date = new Date("Thu Jul 07 2016 14:55:15 GMT+0200")
  // var d=0
  if (d==0){
    //Logger.log("incrementDate: d=0 " + d)
    var incrementedDate=  new Date(date)
  }
  else {  
    //Logger.log("incrementDate: d= " + d)
    var incrementedDate=  new Date(date.setDate(date.getDate()+d))
    }
  //Logger.log("incrementedDate = " + incrementedDate)
 return incrementedDate;
}