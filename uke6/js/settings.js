let settingsDisplayObject = document.getElementById('settingsDisplay')
let boardObject = document.getElementById('board')
let settingsClicked = false;
let previousMoveBool = true;
let availableMovesBool = true;
let blackComputer = false;
let whiteComputer = false;

function onClickSettings() {
    if (!settingsClicked) {
        boardObject.classList.add('hideBoard')
        boardObject.classList.remove('board')
        settingsClicked = true;
        let checkTextPreviousMove = previousMoveBool ? "checked" : "";
        let checkTextAvailableMoves = availableMovesBool ? "checked" : "";
        let checkTextBlackComputer = blackComputer ? "checked" : "";
        let checkTextWhiteComputer = whiteComputer ? "checked" : "";
        settingsDisplayObject.innerHTML = /*HTML*/ `
        <input ${checkTextPreviousMove} id="checkbox1" class="checkbox" type="checkbox">Show previous move
        <input ${checkTextAvailableMoves} id="checkbox2" class="checkbox" type="checkbox">Show available moves
        <input ${checkTextBlackComputer} id="checkbox3" class="checkbox" type="checkbox">Black is computer
        <input ${checkTextWhiteComputer} id="checkbox4" class="checkbox" type="checkbox">White is computer

        `;
        settingsDisplayObject.hidden = false;

    }
    else {
        let checkBox1 = document.getElementById('checkbox1')
        let checkBox2 = document.getElementById('checkbox2')
        let checkBox3 = document.getElementById('checkbox3')
        let checkBox4 = document.getElementById('checkbox4')
        previousMoveBool = checkBox1.checked
        availableMovesBool = checkBox2.checked
        blackComputer = checkBox3.checked
        whiteComputer = checkBox4.checked
        
        if (!previousMoveBool && (lastSquare != undefined || newSquare != undefined))
            removeHighlightedSquaresLastMove();
        boardObject.classList.add('board')
        boardObject.classList.remove('hideBoard')
        settingsClicked = false;
        settingsDisplayObject.hidden = true;
        settingsDisplayObject.innerHTML = /*HTML*/ ``;
    }


}