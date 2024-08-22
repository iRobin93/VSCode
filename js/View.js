function createWeeks() {
    let myString = "";
    for (let i = 1; i <= numberWeeks; i++) {

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
        <h1 style="font-size: 20px;"> Hei, dette er oversikt over mine oppgaver per uke. <br> Hilsen <a
        href="https://github.com/iRobin93">iRobin93</a> <br></h1> `




    document.getElementById('app').innerHTML += createWeeks(); // /*HTML*/ `

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
    blankAll();
    if (ukeTekst == "") {


        strHtml = createLists(eval('hrefArray' + ukeNr), eval('textArray' + ukeNr));


        document.getElementById("uke" + ukeNr + 'Text').innerHTML = strHtml;
    }
}


function blankAll() {
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