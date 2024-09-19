
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
    let startPos;
    let endPos;
    if (emneNr == 1) {
        startPos = 1
        endPos = 7;
    }

    else if (emneNr == 2) {
        startPos = 8;
        endPos = (numberWeeks < 15) ? numberWeeks : 15
    }
    else {
        startPos = 16;
        endPos = numberWeeks;
    }
    
    for (let i = startPos; i <= endPos; i++) {

        myString += /*HTML*/ `
        
        <div class="uke" onclick="showText('${i}')" id="uke${i}" style="background-color: ${rgbArray[i - 1]}">
             Uke ${i}
        </div>
        <div class="tekst" id="uke${i}Text"></div>
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

function writeUke(ukeNr) {
    let strHtml;
    let ukeTekst = document.getElementById('uke' + ukeNr + 'Text').innerHTML
    blankUke();
    if (ukeTekst == "") {


        strHtml = createLists(eval('hrefArray' + ukeNr), eval('textArray' + ukeNr));


        document.getElementById("uke" + ukeNr + 'Text').innerHTML = strHtml;
    }
}

function blankUke() {
    let textObject;
    let i = 1;
    while (true) {
        textObject = document.getElementById('uke' + i + 'Text');

        if (textObject != undefined)
            textObject.innerHTML = "";
        else
            break;
        i++;
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