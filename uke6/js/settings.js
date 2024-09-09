let settingsDisplayObject = document.getElementById('settingsDisplay')
let boardObject = document.getElementById('board')
let settingsClicked = false;

function onClickSettings() {
    if (!settingsClicked) {
        boardObject.classList.add('hideBoard')
        boardObject.classList.remove('board')
        settingsClicked = true;
    }
    else{
        boardObject.classList.add('board')
        boardObject.classList.remove('hideBoard')
        settingsClicked = false;
    }
}