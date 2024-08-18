//MODEL

const appObject = document.getElementById('app');
let countVariables = 5;
let variable = [];

createVariables();

function createVariables() {
    for (let i = 0; i < countVariables; i++)
        variable[i] = "___";

}

// VIEW

showView();
function showView() {

    appObject.innerHTML = /*HTML*/ `
    <div id="StoryId" class="StoryClass">Once, There was a ${variable[0]} ${variable[1]} that ${variable[2]} in the ${variable[3]} - and ${variable[4]} things happened. The End.
    </div>
    <div class="container">
        <div onclick="putText(this, 0)" class="Circle">Green</div>
        <div onclick="putText(this, 0)" class="Circle">Red</div>
    </div>
    <div class="container">
        <div onclick="putText(this, 1)" class="Circle">Cat</div>
        <div onclick="putText(this, 1)" class="Circle">Man</div>
    </div>
    <div class="container">
        <div onclick="putText(this, 2)" class="Circle row2">Stared</div>
        <div onclick="putText(this, 2)" class="Circle row2">Jumped</div>
    </div>
    <div class="container">
        <div onclick="putText(this, 3)" class="Circle row2">Pool</div>
        <div onclick="putText(this, 3)" class="Circle row2">Wall</div>
    </div>
    <div class="container">
        <div onclick="putText(this, 4)" class="Circle row2">Great</div>
        <div onclick="putText(this, 4)" class="Circle row2">Horrible</div>
    </div>
    
    `
}

// CONTROLLER

function putText(element, indexPlace) {

    variable[indexPlace] = element.innerHTML;

    showView();

}


