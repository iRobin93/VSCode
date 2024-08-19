//MODEL

const appObject = document.getElementById('app');
let countVariables = 5;
let variable = [];
let adjective = "Green";
let adjective2 = "Red";
let substantive = "Cat";
let substantive2 = "Man";
let verb = "Stared";
let verb2 = "Jumped";
let substantive3 = "Pool";
let substantive4 = "Wall";
let adjective3 = "Great";
let adjective4 = "Horrible";
let myText;


function createVariables() {
    for (let i = 0; i < countVariables; i++)
        variable[i] = "___";
    updateMyText();
}



function useText(word, indexPlace) {
    variable[indexPlace] = word;
    updateMyText();
    
}

function updateMyText() {
    myText = "Once, There was a " + variable[0] + " " + variable[1] + " that " + variable[2] + " in the " + variable[3] + " - and " + variable[4] + " things happened. The End.";
}

// VIEW
function showView() {

    appObject.innerHTML = /*HTML*/ `
    <div id="StoryId" class="StoryClass">${myText}
    </div>
    <div class="container">
        <div onclick="putText(this.innerHTML, 0)" class="Circle">${adjective}</div>
        <div onclick="putText(this.innerHTML, 0)" class="Circle">${adjective2}</div>
    </div>
    <div class="container">
        <div onclick="putText(this.innerHTML, 1)" class="Circle">${substantive}</div>
        <div onclick="putText(this.innerHTML, 1)" class="Circle">${substantive2}</div>
    </div>
    <div class="container">
        <div onclick="putText(this.innerHTML, 2)" class="Circle row2">${verb}</div>
        <div onclick="putText(this.innerHTML, 2)" class="Circle row2">${verb2}</div>
    </div>
    <div class="container">
        <div onclick="putText(this.innerHTML, 3)" class="Circle row2">${substantive3}</div>
        <div onclick="putText(this.innerHTML, 3)" class="Circle row2">${substantive4}</div>
    </div>
    <div class="container">
        <div onclick="putText(this.innerHTML, 4)" class="Circle row2">${adjective3}</div>
        <div onclick="putText(this.innerHTML, 4)" class="Circle row2">${adjective4}</div>
    </div>
    
    `
}

// CONTROLLER

createVariables();
showView();

function putText(word, indexPlace) {

    useText(word, indexPlace);
    showView();

}


