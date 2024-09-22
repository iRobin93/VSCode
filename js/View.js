
function createEmner() {
    let myString = "";
    for (let i = 1; i <= numberEmner; i++) {

        myString += /*HTML*/ `
        
        <div class="uke" onclick="showWeeks('${i}')" id="emne${i}" style="background-color: ${rgbArrayEmne[i - 1]}">
             Emne ${i}
        </div>
        <div class="tekst" id="emne${i}Text"></div>
        `
    }
    return myString;
}

function writeEmne(emneNr) {
    let strHtml;
    let emneTekst = document.getElementById('emne' + emneNr + 'Text').innerHTML
    blankEmne();
    if (emneTekst == "") {


        strHtml = createWeeks(emneNr);


        document.getElementById("emne" + emneNr + 'Text').innerHTML = strHtml;
    }
}

function createWeeks(emneNr) {
    let myString = "";
    
    let thisWeekArray = eval("weeksInEmne" + emneNr);

    for (week in thisWeekArray) {
        
        myString += /*HTML*/ `
        
        <div class="uke" onclick="showText('${thisWeekArray[Number(week)]}', ${emneNr})" id="uke${thisWeekArray[Number(week)]}" style="background-color: ${rgbArray[week]}">
             Uke ${Number(week) + 1}
        </div>
        <div class="tekst" id="uke${thisWeekArray[Number(week)]}Text"></div>
        `
    }
    return myString;


}

function showView() {
    document.getElementById('app').innerHTML = /*HTML*/ ` 
        <h1 style="font-size: 20px;"> Hei, dette er oversikt over mine oppgaver per emne og uke. <br> Hilsen <a
        href="https://github.com/iRobin93">iRobin93</a> <br></h1> `




    document.getElementById('app').innerHTML += createEmner(); // /*HTML*/ `

}


function createLists(thisHrefArray, thisTextArray) {
    let myLists = "<ul>";

    for (i = 0; i < thisHrefArray.length; i++) {
        myLists += "<li> <a href='" + thisHrefArray[i] + "'target='" + targetBlank + "'>" + thisTextArray[i] + "</a> </li>";
    }


    myLists += "</ul>";

    return myLists;
}

function writeUke(ukeNr, emneNr) {
    let strHtml;
    let ukeTekst = document.getElementById('uke' + ukeNr + 'Text').innerHTML
    blankUke(emneNr);
    if (ukeTekst == "") {


        strHtml = createLists(eval('hrefArray' + ukeNr), eval('textArray' + ukeNr));


        document.getElementById("uke" + ukeNr + 'Text').innerHTML = strHtml;
    }
}

function blankUke(emneNr) { // Blanks list of links for each week in this subject
    let textObject;
    let thisWeekArray = eval("weeksInEmne" + emneNr);
    for(week in thisWeekArray){
              textObject = document.getElementById('uke' + thisWeekArray[week] + 'Text');

        if (textObject != undefined)
            textObject.innerHTML = "";
    }
  
    
}

function blankEmne() {
    let textObject2;
    let j = 1;

    while (true) {
        textObject2 = document.getElementById('emne' + j + 'Text');

        if (textObject2 != undefined)
            textObject2.innerHTML = "";
        else
            break;
        j++;
    }
}