let settingsDisplayObject = document.getElementById('settingsDisplay')
let boardObject = document.getElementById('board')
let settingsClicked = false;
let previousMoveBool = true;
let availableMovesBool = true;
let blackComputer = false;
let whiteComputer = false;
let chessEngine = "chessApi.online";
let range = 1;


function changeRange(element){
    range = element.value
    div1 = document.getElementById('div1')
    div1.innerHTML = 'Depth = ' +range+' <input onchange="changeRange(this)" id="range" type="range" max="15" min="1" step="1"> '
    document.getElementById('range').value = range;
}

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
        <div class="checkboxes">
        <input ${checkTextPreviousMove} id="checkbox1" class="checkbox" type="checkbox">Show previous move <br>
        <input ${checkTextAvailableMoves} id="checkbox2" class="checkbox" type="checkbox">Show available moves <br>
        <input ${checkTextBlackComputer} id="checkbox3" class="checkbox" type="checkbox">Black is computer <br>
        <input ${checkTextWhiteComputer} id="checkbox4" class="checkbox" type="checkbox">White is computer <br>
        </div><br>
        <label for="engines">Choose an engine for computer:</label>

        <select class="engines" name="engines" id="engines">
          <option value="chessApi.online">Chess-Api.online</option>
          <option value="chessApi.com">Chess-Api.com</option>
          <option value="ChessDB">ChessDB</option>
        </select>
        <div id="div1">Depth = ${range}
        <input onchange="changeRange(this)" id="range" type="range" max="15" min="1" step="1">
        </div>
        `;
        settingsDisplayObject.hidden = false;
        document.getElementById('engines').value = chessEngine;
        document.getElementById('range').value = range;

    }
    else {
        let checkBox1 = document.getElementById('checkbox1')
        let checkBox2 = document.getElementById('checkbox2')
        let checkBox3 = document.getElementById('checkbox3')
        let checkBox4 = document.getElementById('checkbox4')
        chessEngine = document.getElementById('engines').value;
        range = document.getElementById('range').value
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