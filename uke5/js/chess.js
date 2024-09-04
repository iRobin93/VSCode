//Model
let boardCells = 64;
let rows = 8;
let columns = 8;


function getBoard() {

    return createRow('lightSquare') +
        createRow('darkSquare') +
        createRow('lightSquare') +
        createRow('darkSquare') +
        createRow('lightSquare') +
        createRow('darkSquare') +
        createRow('lightSquare') +
        createRow('darkSquare') +
        createRow('lightSquare') +
        createRow('darkSquare');
}

function createRow(startClass) {
    
    return createSquares(startClass, 8);
   

}
/*     let myBoardString = "";
    for (let i = 0; i < rows; i++)
        for (let j = 0; j < columns; j++)
            
            if (i % 2 === 0)
                myBoardString += createLightSquare();
            else
                myBoardString += createDarkSquare();
    return myBoardString; */

//View
boardObject = document.getElementById('board')

function showBoard() {
    boardObject.innerHTML = getBoard();
}

function createSquares(squareColorClass, remainingSquares) {
    let allSquares;
    allSquares = `<div class="${squareColorClass}"></div>`;
    if (remainingSquares > 1)
        allSquares += createSquares((squareColorClass == "darkSquare") ? "lightSquare" : "darkSquare", remainingSquares - 1);

    return allSquares;
}





//Controller
showBoard();