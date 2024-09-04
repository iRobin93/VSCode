//Model
firstRow = 6;
secondRow = 1;
thirdRow = 2;
fourthRow = 1;
fifthRow = 6;


function createFlag() {
    for (let i = 0; i < firstRow; i++)
        createRowRedWhiteBlueWhiteRed();
    for (i = 0; i <secondRow; i++)
        createRowWhiteBlueWhite();
    for (i = 0; i < thirdRow; i++)
        createRowBlue();
    for (i = 0; i <fourthRow; i++)
        createRowWhiteBlueWhite();
    for (let i = 0; i < fifthRow; i++)
        createRowRedWhiteBlueWhiteRed();
}

//View
flagg = document.getElementById('flagg')

function oneDiv(cssClass){
    flagg.innerHTML += /*HTML*/ `
    <div class="${cssClass}"> </div>
    `;
}
function twoDivS(cssClass){
    oneDiv(cssClass);
    oneDiv(cssClass);
}

function sixDivs(cssClass){
    twoDivS(cssClass);
    twoDivS(cssClass);
    twoDivS(cssClass);
}

function createRow(cssClass1, cssClass2){
    sixDivs(cssClass1)
    oneDiv(cssClass2);
    twoDivS('blue');
    oneDiv(cssClass2);
    sixDivs(cssClass1);
    sixDivs(cssClass1);
}

function createRowRedWhiteBlueWhiteRed() {
createRow('red', "");

}

function createRowWhiteBlueWhite() {
createRow("", "");
}


function createRowBlue() {
createRow('blue', 'blue')

}

//Controller





createFlag()
