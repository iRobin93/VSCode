let settingsDisplayObject = document.getElementById('settingsDisplay')
let boardObject = document.getElementById('board')
let settingsClicked = false;
let previousMoveBool = true;
let availableMovesBool = true;

function onClickSettings() {
    if (!settingsClicked) {
        boardObject.classList.add('hideBoard')
        boardObject.classList.remove('board')
        settingsClicked = true;
        let checkTextPreviousMove = previousMoveBool ? "checked" : "";
        let checkTextAvailableMoves = availableMovesBool ? "checked" : "";
        settingsDisplayObject.innerHTML = /*HTML*/ `<input ${checkTextPreviousMove} id="checkbox1" class="checkbox" type="checkbox">Show previous move
        <input ${checkTextAvailableMoves} id="checkbox2" class="checkbox" type="checkbox">Show available moves `;
        settingsDisplayObject.hidden = false;

    }
    else {
        let checkBox1 = document.getElementById('checkbox1')
        let checkBox2 = document.getElementById('checkbox2')
        previousMoveBool = checkBox1.checked
        availableMovesBool = checkBox2.checked
        
        if (!previousMoveBool && (lastSquare != undefined || newSquare != undefined))
            removeHighlightedSquaresLastMove();
        boardObject.classList.add('board')
        boardObject.classList.remove('hideBoard')
        settingsClicked = false;
        settingsDisplayObject.hidden = true;
        settingsDisplayObject.innerHTML = /*HTML*/ ``;
    }


}