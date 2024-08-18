//MODEL

let appObject = document.getElementById('app');
let variable1 = "___"
let variable2 = "___"
let variable3 = "___"
let variable4 = "___"

// VIEW

showView();
function showView() {

    appObject.innerHTML = /*HTML*/ `
    <div id="StoryId" class="StoryClass">Once, There was a ${variable1} ${variable2} that ${variable3} in the ${variable4} - and great things happened. The End.
    </div>
    <div class="container">
        <div onclick="putText(this, 'adjective')" class="Circle">Green</div>
        <div onclick="putText(this, 'adjective')" class="Circle">Red</div>
    </div>
    <div class="container">
        <div onclick="putText(this, 'subsantive1')" class="Circle">Cat</div>
        <div onclick="putText(this, 'subsantive1')" class="Circle">Man</div>
    </div>
    <div class="container">
        <div onclick="putText(this, 'verb')" class="Circle row2">Stared</div>
        <div onclick="putText(this, 'verb')" class="Circle row2">Jumped</div>
    </div>
    <div class="container">
        <div onclick="putText(this, 'substantive2')" class="Circle row2">Pool</div>
        <div onclick="putText(this, 'substantive2')" class="Circle row2">Wall</div>
    </div>
    
    `
}

// CONTROLLER

function putText(element, wordType) {
    switch (wordType) {
        case "adjective": variable1 = element.innerHTML;
        break;
        case "subsantive1": variable2 = element.innerHTML;
        break;
        case "verb": variable3 = element.innerHTML;
        break;
        case "substantive2": variable4 = element.innerHTML;
        break;

        default:
        break;
    }

    
    showView();

}


