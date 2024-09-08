//Model
let boardCells = 64;
let rows = 8;
let columns = 8;
let pieceChosen = undefined;
let allowedMoves = [];
let newSquare = undefined;
let lastSquare = undefined;
let lastPieceMoved = undefined;

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

function highlightAvailableSquares(allowedMoves) {
    let myObject
    for (x in allowedMoves) {
        myObject = document.getElementById(allowedMoves[x])
        myObject.classList.add('availableMoves')
    }

}

function removeAvailableSquaresHighlight(allowedMoves){
    let myObject
    for (x in allowedMoves) {
        myObject = document.getElementById(allowedMoves[x])
        myObject.classList.remove('availableMoves')
    }
}

function movePiece(element) {
    if (!pieceChosen) {//A piece is chosen
        if (element.innerHTML != "") {
            element.classList.add('dashedLine')
            pieceChosen = element;
            allowedMoves = checkPieceMoves(pieceChosen);
            highlightAvailableSquares(allowedMoves);
        }

    }

    else {
        removeAvailableSquaresHighlight(allowedMoves);
        if (pieceChosen == element) {// A piece is unchosen
            pieceChosen.classList.remove('dashedLine')
            pieceChosen = undefined;
            allowedMoves = [];
            return;
        }
        allowedMove = checkAllowedMove(element);
        if (allowedMove) {// A piece is moved
            pieceChosen.classList.contains('whitePiece') ? changePieceColor(element, 'blackPiece', 'whitePiece') : changePieceColor(element, 'whitePiece', 'blackPiece')
            if (lastSquare != undefined)
                removeHighlightedSquaresLastMove();

                newSquare = element.id;
            lastSquare = pieceChosen.id;
            if (pieceChosen.innerHTML == "♙") {
                checkPawnPromote(element);
                checkEnPassantMove();
            }


            lastPieceMoved = pieceChosen.innerHTML;
            element.innerHTML = pieceChosen.innerHTML;
            pieceChosen.classList.remove('dashedLine');

            highlightSquaresLastMove();
            pieceChosen.innerHTML = "";
            pieceChosen = undefined;


        }
       

    }
}

function checkEnPassantMove() {
    let lastSquareSplitId = splitId(lastSquare);
    let newSquareSplitID = splitId(newSquare);
    let enPassantPawnObject;
    let isWhitePiece = checkPieceColor(pieceChosen, 'whitePiece')
    if (!isWhitePiece)
        enPassantPawnObject = document.getElementById(newSquareSplitID.column + (Number(newSquareSplitID.row) + 1).toString())
    else
        enPassantPawnObject = document.getElementById(newSquareSplitID.column + (Number(newSquareSplitID.row) - 1).toString())
    checkIfDiagonalMoved = checkDiagonalMove(lastSquareSplitId, newSquareSplitID);
    if (checkIfDiagonalMoved)
        enPassantPawnObject.innerHTML = "";
}
function checkDiagonalMove(lastSquareSplitId, newSquareSplitID) {
    if (lastSquareSplitId.column == newSquareSplitID.column)
        return false;
    else
        return true;
}

function removeHighlightedSquaresLastMove() {
    let lastSquareHighlightHtml = document.getElementById(lastSquare)
    let newSquareHighlightHtml = document.getElementById(newSquare)
    lastSquareHighlightHtml.classList.remove('lastMove')
    newSquareHighlightHtml.classList.remove('lastMove')
}

function highlightSquaresLastMove() {
    let lastSquareHighlightHtml = document.getElementById(lastSquare)
    let newSquareHighlightHtml = document.getElementById(newSquare)
    lastSquareHighlightHtml.classList.add('lastMove')
    newSquareHighlightHtml.classList.add('lastMove')
}

function checkPawnPromote(element) {
    let newPawnSquare = splitId(element.id)
    let isWhitePiece = checkPieceColor(pieceChosen, 'whitePiece')
    let newPiecePromote = document.getElementById('selectNewPiece')
    newPiecePromote.innerHTML = "";
    if (newPawnSquare.row == 8 && isWhitePiece || newPawnSquare.row == 1 && !isWhitePiece)
        for (let x in pieceCharacters = ["♜", "♞", "♝", "♛"])
            newPiecePromote.innerHTML += /*HTML*/`
    <div class="promotePiece" onclick="promotePiece('${pieceCharacters[x]}')"><span>${pieceCharacters[x]}</span></div>
    `;
}

function promotePiece(piece) {
    let newPawnSquareHtmlObject = document.getElementById(newSquare)
    let newPiecePromote = document.getElementById('selectNewPiece')
    newPawnSquareHtmlObject.innerHTML = piece
    newPiecePromote.innerHTML = "";

}

function splitId(squareId) {
    return { column: squareId.slice(0, 1), row: squareId.slice(1, 2) };
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
    let currentPawnSquareSplitId = splitId(pieceChosen.id);
    let isWhitePiece = checkPieceColor(pieceChosen, 'whitePiece')


    let nextRow = getNextVerticalRow(pieceChosen, currentPawnSquareSplitId.row)
    if (nextRow == 9 || nextRow == 0) {
        return [];
    }
    let nextVerticalSquareId = currentPawnSquareSplitId.column + nextRow;
    let nextVerticalSquareHasChessPiece = containsChessPiece(nextVerticalSquareId);
    if (!nextVerticalSquareHasChessPiece) {
        allowedSquares.push(nextVerticalSquareId);
    }


    if (currentPawnSquareSplitId.column != "A") {
        let leftNextSquareId = getDiagonalSquareIdIfAllowed(currentPawnSquareSplitId.column, "left", nextRow)
        if (leftNextSquareId) {
            allowedSquares.push(leftNextSquareId);
        }
    }

    if (currentPawnSquareSplitId.column != "H") {
        let rightNextSquareId = getDiagonalSquareIdIfAllowed(currentPawnSquareSplitId.column, "right", nextRow)
        if (rightNextSquareId) {
            allowedSquares.push(rightNextSquareId)
        }
    }


    if ((currentPawnSquareSplitId.row == "2" && isWhitePiece) || (currentPawnSquareSplitId.row == "7" && !isWhitePiece)) {
        let twoRowsForwardSquareId = currentPawnSquareSplitId.column + getNextVerticalRow(pieceChosen, nextRow);
        let twoRowsForwardSquareHasChesspiece = containsChessPiece(twoRowsForwardSquareId);
        if (!nextVerticalSquareHasChessPiece && !twoRowsForwardSquareHasChesspiece) {
            allowedSquares.push(currentPawnSquareSplitId.column + getNextVerticalRow(pieceChosen, nextRow));
        }
    }

    //TODO: Add rule for en passant

    if (newSquare != undefined) {
        let newSquareSplitId = splitId(newSquare);
        let lastSquareSplitId = splitId(lastSquare)
        let isColumnNextTo = checkColumnNextTo(currentPawnSquareSplitId.column, newSquareSplitId.column);
        if (currentPawnSquareSplitId.row == "4" && lastPieceMoved == "♙" && newSquareSplitId.row == 4 && isColumnNextTo && lastSquareSplitId.row == "2")
            allowedSquares.push(newSquareSplitId.column + (newSquareSplitId.row - 1))
        else if (currentPawnSquareSplitId.row == "5" && lastPieceMoved == "♙" && newSquareSplitId.row == 5 && isColumnNextTo && lastSquareSplitId.row == "7")
            allowedSquares.push(newSquareSplitId.column + (Number(newSquareSplitId.row) + 1).toString())
    }
    return allowedSquares
}

function checkColumnNextTo(currentPawnColumn, newPawnColumn) {
    if ((String.fromCharCode(currentPawnColumn.charCodeAt(0) - 1) == newPawnColumn) || String.fromCharCode(currentPawnColumn.charCodeAt(0) + 1) == newPawnColumn)
        return true;
    else return false;
}

function checkPieceMoves(pieceChosen) {
    let allowedSquares = [];
    if (pieceChosen.innerHTML == "♙")
        allowedSquares = checkPawnmoves(pieceChosen);


    console.log(allowedSquares)
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
    allSquares =/*HTML*/ `<div onclick="movePiece(this)" id="${letter}${rowNumber}" class="${squareColorClass}"></div>`;
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