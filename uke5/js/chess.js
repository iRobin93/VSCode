//Model
let boardCells = 64;
let rows = 8;
let columns = 8;
let pieceChosen = undefined;

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
    placePawns('blackPiece', "7");

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
        placePiece(String.fromCharCode("A".charCodeAt(0) + i) + row, Color, "♙")

}

function movePiece(element) {
    if (!pieceChosen) {
        if (element.innerHTML != "") {
            element.style = "border: dashed, 3px, orange; user-select: none;";
            pieceChosen = element;
        }

    }
    else {
        if (pieceChosen == element) {
            pieceChosen.style = "user-select: none;"
            pieceChosen = undefined;
            return;
        }
        allowedMove = checkAllowedMove(element, pieceChosen);
        if (allowedMove) {
            pieceChosen.classList.contains('whitePiece') ? element.classList.add('whitePiece') : element.classList.add('blackPiece')

            element.innerHTML = pieceChosen.innerHTML;
            pieceChosen.style = "user-select: none;"
            pieceChosen.innerHTML = "";
            pieceChosen = undefined;
        }


    }

}
function checkPiece() {
    return "♙";
}

function checkPieceMoves() {
    if(pieceChosen.innerHTML == "♙")

    myArray = ["B3", "B4"]
    return myArray;
}

function checkAllowedMove(element, pieceChosen) {

    
    possibleSquares = checkPieceMoves(element, pieceChosen);


    /*     let allowedMove = false;
        if (pieceChosen.innerHTML == "♙")
            if (pieceChosen.classList.contains('whitePiece'))
                currentRowNumber = pieceChosen.id.slice(1, 2)
                newRowNumber = element.id.slice(1,2)
                if( newRowNumber == Number(currentRowNumber) + 2   || newRowNumber  == Number(currentRowNumber) + 1 )
                    allowedMove = true; */
    return allowedMove;
}

//View
boardObject = document.getElementById('board')

function showBoard() {
    boardObject.innerHTML = getBoard();
}

function createSquares(squareColorClass, letter, rowNumber) {
    let allSquares;
    allSquares = `<div style="user-select: none;" onclick="movePiece(this)" id="${letter}${rowNumber}" class="${squareColorClass}"></div>`;
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