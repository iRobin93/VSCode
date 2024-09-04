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

function createRow(cssClass1, cssClass2){
    flagg.innerHTML +=/*HTML*/ `
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass2}"></div>
    <div class="blue"></div>
    <div class="blue"></div>
    <div class="${cssClass2}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>

    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>
    <div class="${cssClass1}"></div>

    `;

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
