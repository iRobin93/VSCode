//Model
firstRow = 6;
secondRow = 1;
thirdRow = 2;
fourthRow = 1;
fifthRow = 6;


function createFlag() {
/*     for (let i = 0; i < firstRow; i++)
        createRowRedWhiteBlueWhiteRed();
    for (i = 0; i <secondRow; i++)
        createRowWhiteBlueWhite();
    for (i = 0; i < thirdRow; i++)
        createRowBlue();
    for (i = 0; i <fourthRow; i++)
        createRowWhiteBlueWhite();
    for (let i = 0; i < fifthRow; i++)
        createRowRedWhiteBlueWhiteRed(); */
    
    flagg.innerHTML = createRowRedWhiteBlueWhiteRed().repeat(firstRow)+
    createRowWhiteBlueWhite()+
    createRowBlue().repeat(thirdRow)+
    createRowWhiteBlueWhite()+
    createRowRedWhiteBlueWhiteRed().repeat(fifthRow);
}

//View
flagg = document.getElementById('flagg')

function oneDiv(cssClass){
    return /*HTML*/ `
    <div class="${cssClass}"> </div>
    `;
}

function twoDivS(cssClass){
    return oneDiv(cssClass)+ 
    oneDiv(cssClass);
}

function sixDivs(cssClass){
    return twoDivS(cssClass)+
    twoDivS(cssClass)+
    twoDivS(cssClass);
}

function createRow(cssClass1, cssClass2){
    return sixDivs(cssClass1)+
    oneDiv(cssClass2)+
    twoDivS('blue')+
    oneDiv(cssClass2)+
    sixDivs(cssClass1)+
    sixDivs(cssClass1);
}

function createRowRedWhiteBlueWhiteRed() {
return createRow('red', "");

}

function createRowWhiteBlueWhite() {
return createRow("", "");
}


function createRowBlue() {
return createRow('blue', 'blue')

}

//Controller
createFlag()
