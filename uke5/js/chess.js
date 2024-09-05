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
            element.classList.add('dashedLine')
            pieceChosen = element;
        }

    }
    else {
        if (pieceChosen == element) {
            pieceChosen.classList.remove('dashedLine')
            pieceChosen = undefined;
            return;
        }
        allowedMove = checkAllowedMove(element, pieceChosen);
        if (allowedMove) {
            pieceChosen.classList.contains('whitePiece') ? element.classList.add('whitePiece') : element.classList.add('blackPiece')

            element.innerHTML = pieceChosen.innerHTML;
            pieceChosen.classList.remove('dashedLine')
            pieceChosen.innerHTML = "";
            pieceChosen = undefined;
        }


    }

}

function splitId(pieceChosen) {
    return { column: pieceChosen.id.slice(0, 1), row: pieceChosen.id.slice(1, 2) };
}

function checkPieceColor(pieceChosen, pieceColor) {
    return pieceChosen.classList.contains(pieceColor)
}


function getNextVerticalRow(pieceChosen, fromRow) {
    let isWhitePiece = checkPieceColor(pieceChosen, 'whitePiece');
    if (isWhitePiece)
        return Number(fromRow) + 1
    else
        return Number(fromRow) - 1
}
function getDiagonalColumn(fromColumn, direction) {
    if (direction == "left")
        return String.fromCharCode(fromColumn.charCodeAt(0) - 1)
    else
        return String.fromCharCode(fromColumn.charCodeAt(0) + 1)

}

function containsChessPiece(element){
return element.innerHTML != ""
}

function checkPawnmoves(pieceChosen, element) {
    let allowedSquares = [];
    let currentPawnSquare = splitId(pieceChosen);
    let selectedSquare = splitId(element);
    let selectedSquareHasChessPiece = containsChessPiece(element);
    console.log(selectedSquareHasChessPiece)
    console.log(element.innerHTML)

    if (currentPawnSquare.row == "2" || currentPawnSquare.row == "7") {
        nextRow = getNextVerticalRow(pieceChosen, currentPawnSquare.row)
        allowedSquares.push(currentPawnSquare.column + nextRow)
        allowedSquares.push(currentPawnSquare.column + getNextVerticalRow(pieceChosen, nextRow))
        if (currentPawnSquare.column != "A"){
            let leftColumn = getDiagonalColumn(currentPawnSquare.column, "left");
            if (selectedSquareHasChessPiece && selectedSquare.column == leftColumn){
                allowedSquares.push(leftColumn + nextRow);
            }
            
        }
            
        if (currentPawnSquare.column != "H"){
            let rightColumn = getDiagonalColumn(currentPawnSquare.column, "right")
            if (selectedSquareHasChessPiece && selectedSquare.column == rightColumn){
                allowedSquares.push(rightColumn + nextRow)
            }
            
        }
            
    }

    /*  if (Square.column == "A")
         allowedSquares.push('A3', 'A4', 'B3'); */
    console.log(allowedSquares)

    return allowedSquares
}

function checkPieceMoves(pieceChosen, element) {
    let allowedSquares;
    if (pieceChosen.innerHTML == "♙")
        allowedSquares = checkPawnmoves(pieceChosen, element);



    return allowedSquares;
}

function checkAllowedMove(element, pieceChosen) {


    possibleSquares = checkPieceMoves(pieceChosen, element);

    let allowedMove = true;

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
    allSquares = `<div onclick="movePiece(this)" id="${letter}${rowNumber}" class="${squareColorClass}"></div>`;
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