function submitResponse() {
  // estrai dati da ultima risposta sul form
  var formURL = 'https://docs.google.com/a/aci.it/forms/d/1ILYe33AupGkTLwKHjHG9DlgCJztLu73oUTawnD8GHAE/edit?usp=sharing';
  var form = FormApp.openByUrl(formURL); 
}


function findItemType(){

var ss = SpreadsheetApp.getActiveSpreadsheet()
var formURL = ss.getFormUrl()
var form = FormApp.openByUrl(formURL)  
var items = form.getItems();

    for (i=0; i<items.length; i++){
      
      switch (items[i].getType()) {
        case FormApp.ItemType.TEXT:
          var item = items[i].asTextItem();
          break;
        case FormApp.ItemType.PARAGRAPH_TEXT: 
          var item = items[i].asParagraphTextItem();
          resp = '';
          break;
        case FormApp.ItemType.LIST:
          var item = items[i].asListItem();
          Logger.log("check " + item)
          break;
        case FormApp.ItemType.MULTIPLE_CHOICE:
          var item = items[i].asMultipleChoiceItem();
          break;
        case FormApp.ItemType.CHECKBOX:
          var item = items[i].asCheckboxItem();
          // In a form submission event, resp is an array, containing CSV strings. Join into 1 string.
          // In spreadsheet, just CSV string. Convert to array of separate choices, ready for createResponse().
          if (typeof resp !== 'string')
            resp = resp.join(',');      // Convert array to CSV
          resp = resp.split(/ *, */);   // Convert CSV to array ---
          break;
        case FormApp.ItemType.DATE:
          var item = items[i].asDateItem();
          resp = new Date( resp );
          break;
        case FormApp.ItemType.DATETIME:
          item = items[i].asDateTimeItem();
          resp = new Date( resp );
          break;
        case FormApp.ItemType.SCALE:
          var item = items[i].asScaleItem();
          resp = parseInt(resp);
          break;
        case FormApp.ItemType.GRID:
          var item = items[i].asGridItem();                  
          
          if (typeof resp !== 'string') {
            resp = resp.join(',');      // Convert array to CSV
          }
          resp = resp.split(/ *, */);   // Convert CSV to array
          break;
        default:
          item = null;  // Not handling DURATION, IMAGE, PAGE_BREAK, SECTION_HEADER, TIME
          break;
      } //fine switch items  
   }
}