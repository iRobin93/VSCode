//Model
let boardCells = 64;
let rows = 8;
let columns = 8;
let pieceChosen = undefined;
let allowedMoves = [];
let newSquare = undefined;
let lastSquare = undefined;

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

function changePieceColor(element, fromColor, toColor) {
    element.classList.add(toColor)
    element.classList.remove(fromColor)
}

function movePiece(element) {

    if (!pieceChosen) {
        if (element.innerHTML != "") {
            element.classList.add('dashedLine')
            pieceChosen = element;
            allowedMoves = checkPieceMoves(pieceChosen);
        }

    }
    else {
        if (pieceChosen == element) {
            pieceChosen.classList.remove('dashedLine')
            pieceChosen = undefined;
            allowedMoves = [];
            return;
        }
        allowedMove = checkAllowedMove(element);
        if (allowedMove) {
            pieceChosen.classList.contains('whitePiece') ? changePieceColor(element, 'blackPiece', 'whitePiece') : changePieceColor(element, 'whitePiece', 'blackPiece')
            newSquare = element.id;
            lastSquare = pieceChosen.id;
            element.innerHTML = pieceChosen.innerHTML;
            pieceChosen.classList.remove('dashedLine');
            checkPawnPromote(element);

            pieceChosen.innerHTML = "";
            pieceChosen = undefined;
        }


    }
}

function checkPawnPromote(element){
    let newPawnSquare = splitId(element)
    let isWhitePiece = checkPieceColor(pieceChosen, 'whitePiece')
    let newPiecePromote = document.getElementById('selectNewPiece')
    if (newPawnSquare.row == 8 && isWhitePiece)
        newPiecePromote.innerHTML = /*HTML*/`
    <div class="promotePiece" onclick="promotePiece('♜')"><span>♜</span></div>
    <div class="promotePiece" onclick="promotePiece('♞')"><span>♞</span></div>
    <div class="promotePiece" onclick="promotePiece('♝')"><span>♝</span></div>
    <div class="promotePiece" onclick="promotePiece('♛')"><span>♛</span></div>
    
    `;


}

function promotePiece(piece){
  let newPawnSquareHtmlObject =  document.getElementById(newSquare)
  let newPiecePromote = document.getElementById('selectNewPiece')
  newPawnSquareHtmlObject.innerHTML = piece
  newPiecePromote.innerHTML = "";

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

function containsChessPiece(id) {
    return document.getElementById(id).innerHTML != "";
}

function getDiagonalSquareIdIfAllowed(column, direction, nextRow) {
    let diagonalColumn = getDiagonalColumn(column, direction);
    let diagonalSquareId = diagonalColumn + nextRow;
    let hasChessPiece = containsChessPiece(diagonalSquareId);
    if (hasChessPiece) {
        return diagonalSquareId;
    }
    return undefined;
}

function checkPawnmoves(pieceChosen) {
    let allowedSquares = [];
    let currentPawnSquare = splitId(pieceChosen);
    let isWhitePiece = checkPieceColor(pieceChosen, 'whitePiece')


    let nextRow = getNextVerticalRow(pieceChosen, currentPawnSquare.row)
    if (nextRow == 9 || nextRow == 0){
        return [];
    }
    let nextVerticalSquareId = currentPawnSquare.column + nextRow;
    let nextVerticalSquareHasChessPiece = containsChessPiece(nextVerticalSquareId);
    if (!nextVerticalSquareHasChessPiece) {
        allowedSquares.push(nextVerticalSquareId);
    }


    if (currentPawnSquare.column != "A") {
        let leftNextSquareId = getDiagonalSquareIdIfAllowed(currentPawnSquare.column, "left", nextRow)
        if (leftNextSquareId) {
            allowedSquares.push(leftNextSquareId);
        }
    }

    if (currentPawnSquare.column != "H") {
        let rightNextSquareId = getDiagonalSquareIdIfAllowed(currentPawnSquare.column, "right", nextRow)
        if (rightNextSquareId) {
            allowedSquares.push(rightNextSquareId)
        }
    }

    
    if ((currentPawnSquare.row == "2" && isWhitePiece) || (currentPawnSquare.row == "7" && !isWhitePiece)) {
        let twoRowsForwardSquareId = currentPawnSquare.column + getNextVerticalRow(pieceChosen, nextRow);
        let twoRowsForwardSquareHasChesspiece = containsChessPiece(twoRowsForwardSquareId);
        if (!nextVerticalSquareHasChessPiece && !twoRowsForwardSquareHasChesspiece) {
            allowedSquares.push(currentPawnSquare.column + getNextVerticalRow(pieceChosen, nextRow));
        }

    }

    //TODO: Add rule for en passant
    console.log(allowedSquares)

    return allowedSquares
}

function checkPieceMoves(pieceChosen) {
    let allowedSquares = [];
    if (pieceChosen.innerHTML == "♙")
        allowedSquares = checkPawnmoves(pieceChosen);
    return allowedSquares;
}

function checkAllowedMove(destinationSquare) {
    return allowedMoves.includes(destinationSquare.id);
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