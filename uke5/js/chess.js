//Model
let boardCells = 64;
let rows = 8;
let columns = 8;


function getBoard() {

    return createRow('lightSquare', 8)
}

function createRow(startClass, rowsRemaining) {
    let allRows;
    allRows = createSquares(startClass, "A", rowsRemaining);
    if (rowsRemaining > 1)
        allRows += createRow((startClass == "darkSquare") ? "lightSquare" : "darkSquare", rowsRemaining - 1);
    return allRows;

}
function placePieces() {
    placePiece('A1', 'whitePiece', '♜');
    placePiece('B1', 'whitePiece', '♞');
    placePiece('C1', 'whitePiece', '♝');
    placePiece('D1', 'whitePiece', '♛');
    placePiece('E1', 'whitePiece', '♚');
    placePiece('F1', 'whitePiece', '♝');
    placePiece('G1', 'whitePiece', '♞');
    placePiece('H1', 'whitePiece', '♜');

    placePawns('whitePiece', "2");
    placePawns('blackPiece', "7")

    placePiece('A8', 'blackPiece', '♜');
    placePiece('B8', 'blackPiece', '♞');
    placePiece('C8', 'blackPiece', '♝');
    placePiece('D8', 'blackPiece', '♛');
    placePiece('E8', 'blackPiece', '♚');
    placePiece('F8', 'blackPiece', '♝');
    placePiece('G8', 'blackPiece', '♞');
    placePiece('H8', 'blackPiece', '♜');
}

function placePawns(Color, row) {
    for (let i = 0; i < 8; i++)
        placePiece(String.fromCharCode("A".charCodeAt(0) + i) + row, Color, "♟")

}




//View
boardObject = document.getElementById('board')

function showBoard() {
    boardObject.innerHTML = getBoard();
}

function createSquares(squareColorClass, letter, rowNumber) {
    let allSquares;
    allSquares = `<div id="${letter}${rowNumber}" class="${squareColorClass}"></div>`;
    if (letter != "H")
        allSquares += createSquares((squareColorClass == "darkSquare") ? "lightSquare" : "darkSquare", String.fromCharCode(letter.charCodeAt(0) + 1), rowNumber);

    return allSquares;
}

function placePiece(Square, Color, Piece) {
    a1 = document.getElementById(Square)
    a1.classList.add(Color)
    a1.innerHTML = Piece
}

//Controller
showBoard();
placePieces();