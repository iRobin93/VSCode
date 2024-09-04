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
function createRowRedWhiteBlueWhiteRed() {
    flagg.innerHTML +=/*HTML*/ `
    <div class="red"></div>
    <div class="red"></div>
    <div class="red"></div>
    <div class="red"></div>
    <div class="red"></div>
    <div class="red"></div>
    <div></div>
    <div class="blue"></div>
    <div class="blue"></div>
    <div></div>
    <div class="red"></div>
    <div class="red"></div>
    <div class="red"></div>
    <div class="red"></div>
    <div class="red"></div>
    <div class="red"></div>

    <div class="red"></div>
    <div class="red"></div>
    <div class="red"></div>
    <div class="red"></div>
    <div class="red"></div>
    <div class="red"></div>

    `;

}

function createRowWhiteBlueWhite() {
    flagg.innerHTML += /*HTML*/ `
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>

        <div></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div></div>

        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>

        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    
    
    
    `;
}


function createRowBlue() {
    flagg.innerHTML += /*HTML*/ `
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
        <div class="blue"></div>
    
    
    
    `;
}

//Controller





createFlag();
