function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Agenda Segreteria')
      .addItem('Aggiorna gli elenchi sul form', 'updateChoice')
      .addSeparator()
      //.addSubMenu(ui.createMenu('Sub-menu')
  .addToUi();
}

function checkSubmission(e){
  
  // recupera il link della risposta del form
  getEditResponseUrls()
  
  //individua le righe di intestazione e l'ultima riga proveniente dall'invio del modulo poi cerca tra le intestazioni la colonna "Giorni di assenza" 
  // se maggiore di 1 imposta la variabile multipleDates = TRUE 
  
  Logger.log("triggered on form submit")
  
  var ss, sheet,formA, formB, formURL, itemsA, itemA, itemsB, itemB, lastRow, lastCol, d, headers, header, lastSubmission, incDate, item,  items, itemResponse, iTitle, colGiorniAssenza, giorniAssenza, multipleDates
 
  
  ss = SpreadsheetApp.getActive()
  sheet = ss.getSheetByName("Inserimenti")
  formURL = ss.getFormUrl()
  formA = FormApp.openByUrl(formURL)
  formB = FormApp.openById('1XDv21zw5dyO7jIoZhhQ1XyddWEEnGmNYLWn_ama-Q3c')
  itemsA = formA.getItems();
  itemsB = formB.getItems()
  
  lastRow = sheet.getLastRow()
  lastCol = sheet.getLastColumn()
  headers =  sheet.getRange(1,1,2,lastCol).getValues()
  lastSubmission =  sheet.getRange(lastRow,1,1,lastCol).getValues()
  Logger.log(lastSubmission)
  header = "Giorni di assenza"
  colGiorniAssenza = headers[0].indexOf(header)
  Logger.log("colonna Giorni di assenza = " + colGiorniAssenza)
  giorniAssenza = lastSubmission[0][colGiorniAssenza]
 
  Logger.log ("giorni di assenza = " + giorniAssenza)
  
  Logger.log("start SplitDates")
  
  Logger.log("last row= " + lastRow)
  Logger.log("last col= " + lastCol)
  
  var lastRowContent = sheet.getRange(lastRow, 1,1,lastCol).getValues()
  Logger.log(lastRowContent)
  var timestamp = lastRowContent [0][0]
  var responseUrl = lastRowContent [0][1]
  var nomeUtente = lastRowContent [0][2]
  var dataInizio = new Date(lastRowContent [0][3])
  var giorniAssenza = lastRowContent [0][4]
  var personale = lastRowContent [0][5]
  var codiciAssenza = new Array()
  codiciAssenza.push(lastRowContent[0][6])
  
  Logger.log("lastRowContent[0][6] = " + lastRowContent[0][6])
  Logger.log ("codiciAssenza = " + codiciAssenza)
  Logger.log("lunghezza =" + codiciAssenza.length)
  Logger.log ("codiciAssenza[0] = " + codiciAssenza)
  
  var altriCodici = lastRowContent [0][7]
  var note = lastRowContent [0][8]
  var maggiorOrario = lastRowContent [0][9]
  Logger.log("maggior Orario " + maggiorOrario)
  var maggiorOrarioEffettuato = lastRowContent [0][10]
  Logger.log("maggior Orario Effettuato" + maggiorOrarioEffettuato)
  var tipoMaggiorOrario = lastRowContent [0][11]
  var motivazioneStraordinario = lastRowContent [0][12]
  
  Logger.log("crea risposte di dettaglio per " + giorniAssenza + " giorni di assenza" )
  
  
  
  var formBResponse = formB.createResponse()
  
 //Stampa elenco item form A
 for (var j = 0; j < itemsA.length; j++) {  
      var iType = itemsA[j].getType()
      iTitle = itemsA[j].getTitle()
      Logger.log(itemsA[j].getIndex() + " - " + iTitle + " j = " + j + " " + iType)
 }
 
 //Stampa elenco item form B
 for (var j = 0; j < itemsB.length; j++) {  
      var iType = itemsB[j].getType()
      iTitle = itemsB[j].getTitle()
      Logger.log(itemsB[j].getIndex() + " - " + iTitle + " j = " + j + " " + iType)
 }
 
 // salva i dati solo sulla prima riga

        
        Logger.log('Maggior orario')
          itemB = itemsB[7].asMultipleChoiceItem()
          itemResponse = itemB.createResponse(maggiorOrario)
          formBResponse.withItemResponse(itemResponse)

         Logger.log('Note ')
          itemB = itemsA[6].asParagraphTextItem()
          itemResponse = itemB.createResponse(note)  
          formBResponse.withItemResponse(itemResponse)
                   
         Logger.log(maggiorOrarioEffettuato)
         if (maggiorOrarioEffettuato){   
         Logger.log('Maggior orario effettuato ' + maggiorOrarioEffettuato)
              itemB = itemsA[8].asDurationItem()
              
              var hh = new Date(maggiorOrarioEffettuato).getHours()
              var mm = new Date(maggiorOrarioEffettuato).getMinutes()
              var ss = new Date(maggiorOrarioEffettuato).getSeconds()
              Logger.log("hours " +hh + "." + mm + "." + ss)
              itemResponse = itemB.createResponse(hh,mm,ss)
              formBResponse.withItemResponse(itemResponse)
          }
          if (tipoMaggiorOrario){
            Logger.log('Tipo maggior orario')
            itemB = itemsA[9].asMultipleChoiceItem()
            itemResponse = itemB.createResponse(tipoMaggiorOrario)
            formBResponse.withItemResponse(itemResponse)
          }
          if (motivazioneStraordinario){
            Logger.log('Motivazione straordinario')
            itemB = itemsA[11].asMultipleChoiceItem()
            itemResponse = itemB.createResponse(motivazioneStraordinario)
            formBResponse.withItemResponse(itemResponse)
          }

 // salva i restanti dati creando le risposte in base ai giorni di assenza        
 
 // se giorni assenza = 0 prolunga il ciclo di 1 (x=0) in maniera da processare almeno l'unico giorno di assenza
 if (giorniAssenza == 0 ){
   x = 0
 } 
 else {
   x = 1 
 }       
 // 
    incDate = new Date(dataInizio)
    Logger.log ("first incDate " + incDate)
    for (var i=0; i<=giorniAssenza-x; i++) {
      if (i>0){ 
        Logger.log("incDate attuale = " + incDate)
        //incDate = incrementDate(incDate,1)
        Logger.log("nuova incDate + "  + incDate)
        var formBResponse = formB.createResponse()
              
        Logger.log('Maggior orario')
          itemB = itemsB[7].asMultipleChoiceItem()
          itemResponse = itemB.createResponse('NO')
          formBResponse.withItemResponse(itemResponse)
          
        } 
        while (isHoliday(incDate) == true) {
             var incDate = incrementDate(incDate,1) 
             Logger.log("verifica festività " + i + " incDate = " + incDate) 
        }
          Logger.log ("incDate finale = " + incDate)
          Logger.log('Personale')
          itemB = itemsA[0].asListItem()
          itemResponse = itemB.createResponse(personale)
          formBResponse.withItemResponse(itemResponse)

// gestione item checkbox
//          Logger.log('Codici Assenza')
//          itemB = itemsA[1].asCheckboxItem()
//          if (typeof codiciAssenza !== 'string'){
//          Logger.log("inizio split")
//          codiciAssenza = codiciAssenza.join(',');      // Convert array to CSV;
//          codiciAssenza = codiciAssenza.split(/ *, */)
//          Logger.log("fine split " + codiciAssenza)
//          }
//          itemResponse = itemB.createResponse(codiciAssenza)
//          formBResponse.withItemResponse(itemResponse)

          Logger.log('Codici Assenza')
          itemB = itemsA[1].asListItem()
          Logger.log("Codici Assenza =" + codiciAssenza)
          if(codiciAssenza[0] != ""){
              itemResponse = itemB.createResponse(codiciAssenza)
              formBResponse.withItemResponse(itemResponse)
          }
          
          Logger.log('Altri Codici')
          itemB = itemsA[2].asTextItem()
          itemResponse = itemB.createResponse(altriCodici)
          formBResponse.withItemResponse(itemResponse)
          
          Logger.log('Data inizio ')
          itemB = itemsA[4].asDateItem()
     
          Logger.log("incDate prima di scrivere sul form = " + incDate)
          
          // è necessario incrementare la data perchè al momento in cui si scrive sul form viene diminuita di 1 !!!
          
          var finalDate = incrementDate(incDate, 1)
          
          Logger.log("incDate dopo la scrittura sul form = " + incDate)
      
          // attenzione non so perchè ma incDate dopo la chiamata della funzione incrementDate (incDate, 1) risulta incrementata di 1 !!!!
          // vista questa "anomalia" per continuare il ciclo incDate non viene ulteriormente incrementata
          // il ciclo funziona anche se non è molto elegante 
          
          itemResponse = itemB.createResponse(finalDate)

          formBResponse.withItemResponse(itemResponse)
          
          // 'URL inserimento assenze'
          itemB = itemsB[0].asTextItem()
          Logger.log(itemB.getTitle())
          itemResponse = itemB.createResponse(responseUrl)
          formBResponse.withItemResponse(itemResponse)
          
   
          // 'Stato richiesta'
          itemB = itemsB[1].asMultipleChoiceItem()
          Logger.log(itemB.getTitle())
          itemResponse = itemB.createResponse("In corso")
          formBResponse.withItemResponse(itemResponse)

          
          // 'Giorni di assenza':
          itemB = itemsB[3].asMultipleChoiceItem()
          if (giorniAssenza == 0){
            itemResponse = itemB.createResponse("0")
          }
          else{
              itemResponse = itemB.createResponse("1")
          }
          //Logger.log("giorni di assenza response " + itemResponse.getResponse())
          formBResponse.withItemResponse(itemResponse)
       
       Logger.log("submit formBResponse " + formBResponse.getTimestamp())
       formBResponse.submit()
       Utilities.sleep(500)
       Logger.log("submitted response") 
      }

 Logger.log("fine ciclo")
 
}
     