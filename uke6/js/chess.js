//Model
let boardCells = 64;
let rows = 8;
let columns = 8;
let pieceChosen = undefined;
let allowedMoves = [];
let newSquare = undefined;
let lastSquare = undefined;
let lastPieceMoved = undefined;
let enPassantMove = undefined;
let whiteTurn = true;
let kingCheckedObject = undefined;
let mated = false;
let enPassantMoveComputer = undefined;
let promoteInProgress = false;
let castleQueenWhite = "Q";
let castleKingWhite = "K";
let castleQueenBlack = "q";
let castleKingBlack = "k";


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

function removeAvailableSquaresHighlight(allowedMoves) {
    let myObject
    for (x in allowedMoves) {
        myObject = document.getElementById(allowedMoves[x])
        myObject.classList.remove('availableMoves')
    }
}

function movePiece(element) {


    if (!pieceChosen) {//A piece is chosen
        let isWhitePiece = checkPieceColor(element, "whitePiece")
        if (whiteTurn != isWhitePiece) {
            return;
        }
        if (element.innerHTML != "") {
            element.classList.add('dashedLine')
            pieceChosen = element;
            allowedMoves = checkPieceMoves(pieceChosen);
            removeNotPossibleSquares(allowedMoves, pieceChosen);




            if (availableMovesBool)
                highlightAvailableSquares(allowedMoves);
        }

    }

    else {

        if (pieceChosen == element) {// A piece is unchosen
            removeAvailableSquaresHighlight(allowedMoves);
            pieceChosen.classList.remove('dashedLine')
            pieceChosen = undefined;
            allowedMoves = [];
            return;
        }
        let allowedMove = checkAllowedMove(element);
        if (allowedMove) {// A piece is moved



            let isWhitePiece = checkPieceColor(pieceChosen, "whitePiece")
            let elementId = element.id;
            let pieceChosenId = pieceChosen.id
            let pieceChosenInnerHTML = pieceChosen.innerHTML;

            element.innerHTML = pieceChosen.innerHTML;
            pieceChosen.innerHTML = "";

            pieceChosen.classList.contains('whitePiece') ? changePieceColor(element, 'blackPiece', 'whitePiece') : changePieceColor(element, 'whitePiece', 'blackPiece');


            if (kingCheckedObject != undefined) {
                kingCheckedObject.classList.remove('checked');
                kingCheckedObject = undefined;
            }

            let kingchecked = checkIfKingIsChecked(isWhitePiece);
            if (kingchecked) {
                kingchecked.classList.add('checked')
                kingCheckedObject = kingchecked;
            }



            if (pieceChosenInnerHTML == "♙") {
                if ((whiteTurn && !whiteComputer) || (!whiteTurn && !blackComputer))
                    checkPawnPromote(elementId, isWhitePiece, !whiteTurn, blackComputer, whiteComputer);
                if (enPassantMove != undefined)
                    checkEnPassantMove(isWhitePiece, elementId, pieceChosenId);
            }
            if (pieceChosenInnerHTML == "♚") {
                checkCastleMove(isWhitePiece, elementId, pieceChosenId);
            }
            if(elementId == "A1")
                castleQueenWhite = "";
            if(elementId == "A8")
                castleQueenBlack = "";
            if(elementId == "H1")
                castleKingWhite = "";
            if(elementId == "H8")
                castleKingBlack = "";

            updateCastlingRights(pieceChosenInnerHTML, isWhitePiece, pieceChosenId);

            if (pieceChosenInnerHTML == "♙")
                checkComputerEnPassant(element.id, pieceChosen.id);
            pieceChosen.classList.remove('dashedLine');
            pieceChosen.classList.remove('whitePiece');
            pieceChosen.classList.remove('blackPiece');
            removeAvailableSquaresHighlight(allowedMoves);
            if (lastSquare != undefined)
                removeHighlightedSquaresLastMove();
            newSquare = element.id;
            lastSquare = pieceChosen.id;
            if (previousMoveBool)
                highlightSquaresLastMove();
            lastPieceMoved = element.innerHTML;
            pieceChosen = undefined;
            enPassantMove = undefined;
            whiteTurn = !whiteTurn;
            document.getElementById('turn').innerHTML = whiteTurn ? "It's white's turn!" : "It's black's turn!"
            if (kingchecked) {
                mated = checkIfMate(!isWhitePiece);
            }
            if (mated)
                document.getElementById('turn').innerHTML = "Check Mate"
            if (!promoteInProgress) {
                if (blackComputer && !whiteTurn)
                    computerMove(false);
                if (whiteComputer && whiteTurn)
                    computerMove(true);
            }


        }
    }
}

function movePieceFreely(fromSquareId, toSquareId, isWhitePiece) {
    let piece = document.getElementById(fromSquareId);
    let newPiece = document.getElementById(toSquareId);
    newPiece.innerHTML = piece.innerHTML;
    if (isWhitePiece)
        newPiece.classList.add('whitePiece')
    else
        newPiece.classList.add('blackPiece')
    piece.innerHTML = "";
    piece.classList.remove('whitePiece');
    piece.classList.remove('blackPiece');
}

function checkCastleMove(isWhitePiece, elementId, pieceChosenId) {
    if (pieceChosenId == "E1" || pieceChosenId == "E8") {
        if (elementId == "C1")
            movePieceFreely("A1", "D1", isWhitePiece);
        else if (elementId == "C8")
            movePieceFreely("A8", "D8", isWhitePiece)
        else if (elementId == "G1")
            movePieceFreely("H1", "F1", isWhitePiece);
        else if (elementId == "G8")
            movePieceFreely("H8", "F8", isWhitePiece);
    }
}

function updateCastlingRights(pieceChosenInnerHTML, isWhitePiece, pieceChosenId) {
    if (pieceChosenInnerHTML == "♚" && isWhitePiece) {
        castleKingWhite = "";
        castleQueenWhite = "";
    }
    if (pieceChosenInnerHTML == "♚" && !isWhitePiece) {
        castleKingBlack = "";
        castleQueenBlack = "";
    }
    if (pieceChosenInnerHTML == "♜" && pieceChosenId == "A1")
        castleQueenWhite = "";

    if (pieceChosenInnerHTML == "♜" && pieceChosenId == "H1")
        castleKingWhite = "";

    if (pieceChosenInnerHTML == "♜" && pieceChosenId == "A8")
        castleQueenBlack = "";

    if (pieceChosenInnerHTML == "♜" && pieceChosenId == "H8")
        castleKingBlack = "";
}

function checkComputerEnPassant(elementId, pieceChosenId) {
    let firstSquareSplitId = splitId(pieceChosenId);
    let secondSquareSplitId = splitId(elementId);
    if (firstSquareSplitId.row == 2 && secondSquareSplitId.row == 4)
        enPassantMoveComputer = firstSquareSplitId.column + (Number(firstSquareSplitId.row) + 1).toString();
    else if (firstSquareSplitId.row == 7 && secondSquareSplitId.row == 5)
        enPassantMoveComputer = firstSquareSplitId.column + (Number(firstSquareSplitId.row) - 1).toString();
}

function computerMove(whiteTurnBool) {
    turn = whiteTurnBool ? "w" : "b";
    enPassantMoveComputer = enPassantMoveComputer ?? "-"
    enPassantMoveComputer = enPassantMoveComputer.toLowerCase();
    let castlingRights = castleKingWhite + castleQueenWhite + castleKingBlack + castleQueenBlack;

    if (castlingRights == "")
        castlingRights = "-";

    let fenmove2 = getFenString();
    let fenmove = {
        fen: fenmove2 + ' ' + turn + ' ' + castlingRights + ' ' + enPassantMoveComputer + ' 0 1',
        depth: range
    }
    if (chessEngine == "chessApi.com")
        fenmove = {
            fen: fenmove2 + ' ' + turn + ' ' + castlingRights + ' ' + "-" + ' 0 1',
            depth: Number(range)
        }
    getComputerMove(fenmove)
    enPassantMoveComputer = undefined;
}

function getFenString() {
    let fenstring = "";

    for (let row = 8; row > 0; row--) {
        let intEmptySquare = 0;
        for (let column = "A"; column != "I"; column = getColumnNextTo(column, 'right')) {
            let currentSquare = document.getElementById(column + row);
            let isWhitePieceSquare = checkPieceColor(currentSquare, "whitePiece");
            if (currentSquare.innerHTML == "") {
                intEmptySquare++;
            }
            else {
                if (intEmptySquare > 0) {
                    fenstring += intEmptySquare.toString();
                    intEmptySquare = 0;
                }
            }
            switch (currentSquare.innerHTML) {
                case "♙":
                    isWhitePieceSquare ? fenstring += "P" : fenstring += "p"
                    break;
                case "♜":
                    isWhitePieceSquare ? fenstring += "R" : fenstring += "r"
                    break;
                case "♞":
                    isWhitePieceSquare ? fenstring += "N" : fenstring += "n"
                    break;
                case "♛":
                    isWhitePieceSquare ? fenstring += "Q" : fenstring += "q"
                    break;
                case "♚":
                    isWhitePieceSquare ? fenstring += "K" : fenstring += "k"
                    break;
                case "♝":
                    isWhitePieceSquare ? fenstring += "B" : fenstring += "b"
                    break;
            }

        }
        if (intEmptySquare > 0) {
            fenstring += intEmptySquare.toString();
            intEmptySquare = 0;
        }
        fenstring += "/"
    }

    fenstring = fenstring.slice(0, -1)




    return fenstring
}



async function chessApiMove(fenmove) {
    let result
    let promoteTo = undefined;
    try {

        result = await axios.post("https://chess-api.com/v1", fenmove);
        if (result.status == 200) moveObject = result.data;
        else alert("Error in Axios get: " + result.status);
    }

    catch (error) {
        alert(error);
    }

    if (moveObject.isPromotion) {
        if (moveObject.move.length == 5)
            promoteTo = moveObject.move.slice(-1);
    }

    let elementFrom = document.getElementById(moveObject.from.toUpperCase())
    let elementTo = document.getElementById(moveObject.to.toUpperCase())
    setTimeout(movePiece, 1000, elementFrom);
    setTimeout(movePiece, 2000, elementTo);
    if (promoteTo) {
        switch (promoteTo) {
            case "q": promoteTo = "♛";
                break;
            case "r": promoteTo = "♜";
                break;
            case "n": promoteTo = "♞";
                break;
            case "b": promoteTo = "♝";
                break;
            default: promoteTo = "♛";
                break;

        }
        setTimeout(promotePiece, 1900, promoteTo, elementFrom.id);
    }

        

    let pila = document.getElementById('pila')
    pila.style.width = moveObject.winChance * 4 + "px"


}

async function getComputerMove(fenmove) {

    if (chessEngine == "chessApi.com") {
        chessApiMove(fenmove);
    }
    else if (chessEngine == "chessDB")
        chessDbMove(fenmove);
    else if (chessEngine == "chessApi.online")
        chessApiOnlineMove(fenmove);


}

async function chessApiOnlineMove(fenmove) {
    let promoteTo = undefined;
    let result
    try {

        result = await axios.post("http://ws.chess-api.online", fenmove);
        if (result.status == 200) moveObject = result.data;
        else alert("Error in Axios get: " + result.status);
    }

    catch (error) {
        alert(error);
    }

    if (moveObject.bestMove.length == 5)
        promoteTo = moveObject.bestMove.slice(-1);
    let elementFrom = document.getElementById(moveObject.bestMove.toUpperCase().slice(0, 2));
    let elementTo = document.getElementById(moveObject.bestMove.toUpperCase().slice(2, 4));

    setTimeout(movePiece, 1000, elementFrom);
    setTimeout(movePiece, 2000, elementTo);

    if (promoteTo) {
        switch (promoteTo) {
            case "q": promoteTo = "♛";
                break;
            case "r": promoteTo = "♜";
                break;
            case "n": promoteTo = "♞";
                break;
            case "b": promoteTo = "♝";
                break;
            default: promoteTo = "♛";
                break;

        }

        setTimeout(promotePiece, 1900, promoteTo, elementFrom.id);
    }

}

async function chessDbMove(fenmove) {
    let result;
    try {

        result = await axios.post("https://www.chessdb.cn/cdb.php?action=querypv&board=" + fenmove.fen + "&json=1");
        if (result.status == 200) moveObject = result.data.pv;
        else alert("Error in Axios get: " + result.status);
    }

    catch (error) {
        alert(error);
    }

    let elementFrom = document.getElementById(moveObject[0].toUpperCase().slice(0, 2))
    let elementTo = document.getElementById(moveObject[0].toUpperCase().slice(-2))
    setTimeout(movePiece, 1000, elementFrom);
    setTimeout(movePiece, 2000, elementTo);
}

function checkIfMate(isWhitePiece) {
    let allowedSquares = [];
    let isWhitePieceText = isWhitePiece ? "White" : "Black";


    for (let column = "A"; column != "I"; column = getColumnNextTo(column, 'right'))
        for (let row = 1; row < 9; row++) {
            row = row.toString();
            currentSquare = document.getElementById(column + row);
            let isWhitePieceSquare = checkPieceColor(currentSquare, "whitePiece");
            if (currentSquare.innerHTML != "" && isWhitePiece == isWhitePieceSquare) {
                let tmparray = checkPieceMoves(currentSquare);
                tmparray = removeNotPossibleSquares(tmparray, currentSquare);
                allowedSquares = allowedSquares.concat(tmparray);
            }

        }


    console.log("Dette er all squares for: mated check" + isWhitePieceText + allowedSquares);
    if (allowedSquares.length == 0)
        return true;
    else
        return false;
}


function checkIfKingIsChecked(isWhitePiece) {
    let allowedSquares = [];
    let oppositeKingSquare;
    let isWhitePieceText = isWhitePiece ? "White" : "Black";


    for (let column = "A"; column != "I"; column = getColumnNextTo(column, 'right'))
        for (let row = 1; row < 9; row++) {
            row = row.toString();
            currentSquare = document.getElementById(column + row);
            let isWhitePieceSquare = checkPieceColor(currentSquare, "whitePiece")
            if (currentSquare.innerHTML == "♚" && isWhitePiece != isWhitePieceSquare)
                oppositeKingSquare = currentSquare;
            if (currentSquare.innerHTML != "" && isWhitePiece == isWhitePieceSquare) {
                allowedSquares = allowedSquares.concat(checkPieceMoves(currentSquare));
            }
        }


    console.log("Dette er all squares for:" + isWhitePieceText + allowedSquares);
    if (oppositeKingSquare == undefined || allowedSquares.includes(oppositeKingSquare.id))

        return oppositeKingSquare;
    else
        return undefined;

}

function checkEnPassantMove(isWhitePiece, elementId, pieceChosenId) {
    let lastSquareSplitId = splitId(pieceChosenId);
    let newSquareSplitID = splitId(elementId);
    let enPassantPawnObject;
    if (enPassantMove == elementId) {
        if (!isWhitePiece)
            enPassantPawnObject = document.getElementById(newSquareSplitID.column + (Number(newSquareSplitID.row) + 1).toString());
        else
            enPassantPawnObject = document.getElementById(newSquareSplitID.column + (Number(newSquareSplitID.row) - 1).toString());
        let checkIfDiagonalMoved = checkDiagonalMove(lastSquareSplitId, newSquareSplitID);
        if (checkIfDiagonalMoved)
            enPassantPawnObject.innerHTML = "";
    }

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

function checkPawnPromote(elementId, isWhitePiece, whiteTurn, blackComputer, whiteComputer) {
    let newPawnSquare = splitId(elementId)
    let newPiecePromote = document.getElementById('selectNewPiece')
    newPiecePromote.innerHTML = "";
    if (newPawnSquare.row == 8 && isWhitePiece || newPawnSquare.row == 1 && !isWhitePiece) {
        for (let x in pieceCharacters = ["♜", "♞", "♝", "♛"])
            newPiecePromote.innerHTML += /*HTML*/`
    <div class="promotePiece" onclick="onClickPromotePiece('${pieceCharacters[x]}', '${elementId}', ${whiteTurn}, ${blackComputer}, ${whiteComputer})"><span>${pieceCharacters[x]}</span></div>
    `;

        promoteInProgress = true;
    }
}


function onClickPromotePiece(piece, elementId, whiteTurn, blackComputer, whiteComputer) {
    promotePiece(piece, elementId);
    if (promoteInProgress) {
        if (blackComputer && !whiteTurn) {
            computerMove(false);
        }
        if (whiteComputer && whiteTurn) {
            computerMove(true);
        }
    }

    promoteInProgress = false;
}

function promotePiece(piece, elementId) {
    let newPawnSquareHtmlObject = document.getElementById(elementId)
    let newPiecePromote = document.getElementById('selectNewPiece')

    newPawnSquareHtmlObject.innerHTML = piece
    newPiecePromote.innerHTML = "";

}

function splitId(squareId) {
    return { column: squareId.slice(0, 1), row: squareId.slice(1, 2) };
}

function checkPieceColor(pieceChosen, pieceColor) {
    if (pieceChosen.innerHTML != "")
        return pieceChosen.classList.contains(pieceColor)
    else
        return undefined;
}


function getNextVerticalRow(pieceChosen, fromRow, DirectionForward) {
    let isWhitePiece = checkPieceColor(pieceChosen, 'whitePiece');
    if (DirectionForward) {
        if (isWhitePiece)
            return Number(fromRow) + 1
        else
            return Number(fromRow) - 1
    }
    else {
        if (isWhitePiece)
            return Number(fromRow) - 1
        else
            return Number(fromRow) + 1
    }

}


function containsChessPiece(id) {
    return document.getElementById(id).innerHTML != "";
}

function getDiagonalSquareIdIfAllowed(column, direction, nextRow, isWhitePiece, allowedEmpty) {
    let diagonalColumn = getColumnNextTo(column, direction);
    let diagonalSquareId = diagonalColumn + nextRow;
    let diagonalSquareHtmlObject = document.getElementById(diagonalSquareId)
    let otherSquareIsWhite = checkPieceColor(diagonalSquareHtmlObject, 'whitePiece')
    let hasChessPiece = containsChessPiece(diagonalSquareId);

    if (allowedEmpty && !hasChessPiece)
        return diagonalSquareId;
    if (hasChessPiece && otherSquareIsWhite != isWhitePiece) {
        return diagonalSquareId;
    }

    return undefined;
}

function getVerticalAndHorizontalIdIfAllowed(column, direction, nextRow, pieceChosen, allowedEmpty) {
    let isWhitePiece = checkPieceColor(pieceChosen, 'whitePiece')
    let useColumn = column;

    if (direction == "left")
        useColumn = getColumnNextTo(column, direction);
    let diagonalSquareId = nextColumn + nextRow;
    let diagonalSquareHtmlObject = document.getElementById(diagonalSquareId)
    let otherSquareIsWhite = checkPieceColor(diagonalSquareHtmlObject, 'whitePiece')
    let hasChessPiece = containsChessPiece(diagonalSquareId);

    if (allowedEmpty && !hasChessPiece)
        return diagonalSquareId;
    if (hasChessPiece && otherSquareIsWhite != isWhitePiece) {
        return diagonalSquareId;
    }

    return undefined;
}

function checkPawnmoves(pieceChosen) {
    let allowedSquares = [];
    let currentPawnSquareSplitId = splitId(pieceChosen.id);
    let isWhitePiece = checkPieceColor(pieceChosen, 'whitePiece')


    let nextRow = getNextVerticalRow(pieceChosen, currentPawnSquareSplitId.row, true)
    if (nextRow == 9 || nextRow == 0) {
        return [];
    }
    let nextVerticalSquareId = currentPawnSquareSplitId.column + nextRow;
    let nextVerticalSquareHasChessPiece = containsChessPiece(nextVerticalSquareId);
    if (!nextVerticalSquareHasChessPiece) {
        allowedSquares.push(nextVerticalSquareId);
    }


    if (currentPawnSquareSplitId.column != "A") {
        let leftNextSquareId = getDiagonalSquareIdIfAllowed(currentPawnSquareSplitId.column, "left", nextRow, isWhitePiece, false)
        if (leftNextSquareId) {
            allowedSquares.push(leftNextSquareId);
        }
    }

    if (currentPawnSquareSplitId.column != "H") {
        let rightNextSquareId = getDiagonalSquareIdIfAllowed(currentPawnSquareSplitId.column, "right", nextRow, isWhitePiece, false)
        if (rightNextSquareId) {
            allowedSquares.push(rightNextSquareId)
        }
    }


    if ((currentPawnSquareSplitId.row == "2" && isWhitePiece) || (currentPawnSquareSplitId.row == "7" && !isWhitePiece)) {
        let twoRowsForwardSquareId = currentPawnSquareSplitId.column + getNextVerticalRow(pieceChosen, nextRow, true);
        let twoRowsForwardSquareHasChesspiece = containsChessPiece(twoRowsForwardSquareId);
        if (!nextVerticalSquareHasChessPiece && !twoRowsForwardSquareHasChesspiece) {
            allowedSquares.push(currentPawnSquareSplitId.column + getNextVerticalRow(pieceChosen, nextRow, true));
        }
    }

    //EN PASSANT
    if (newSquare != undefined) {
        let newSquareSplitId = splitId(newSquare);
        let lastSquareSplitId = splitId(lastSquare)
        let isColumnNextTo = checkColumnNextToEnPassant(currentPawnSquareSplitId.column, newSquareSplitId.column);
        if (currentPawnSquareSplitId.row == "4" && lastPieceMoved == "♙" && newSquareSplitId.row == 4 && isColumnNextTo && lastSquareSplitId.row == "2") {
            allowedSquares.push(newSquareSplitId.column + (newSquareSplitId.row - 1))
            enPassantMove = (newSquareSplitId.column + (newSquareSplitId.row - 1))
        }

        else if (currentPawnSquareSplitId.row == "5" && lastPieceMoved == "♙" && newSquareSplitId.row == 5 && isColumnNextTo && lastSquareSplitId.row == "7") {
            allowedSquares.push(newSquareSplitId.column + (Number(newSquareSplitId.row) + 1).toString())
            enPassantMove = (newSquareSplitId.column + (Number(newSquareSplitId.row) + 1).toString())
        }

    }
    return allowedSquares
}


function checkKingMoves(pieceChosen) {
    let allowedSquares = [];
    let currentKingSquareSplitId = splitId(pieceChosen.id);
    let isWhitePiece = checkPieceColor(pieceChosen, 'whitePiece')
    let nextRow = getNextVerticalRow(pieceChosen, currentKingSquareSplitId.row, true)
    let previousRow = getNextVerticalRow(pieceChosen, currentKingSquareSplitId.row, false)

    if (nextRow != 9 && nextRow != 0) {
        if (currentKingSquareSplitId.column != "A") {
            let leftNextSquareId = getDiagonalSquareIdIfAllowed(currentKingSquareSplitId.column, "left", nextRow, isWhitePiece, true)
            if (leftNextSquareId) {
                allowedSquares.push(leftNextSquareId);
            }
        }

        if (currentKingSquareSplitId.column != "H") {
            let rightNextSquareId = getDiagonalSquareIdIfAllowed(currentKingSquareSplitId.column, "right", nextRow, isWhitePiece, true)
            if (rightNextSquareId) {
                allowedSquares.push(rightNextSquareId)
            }
        }
    }

    if (previousRow != 9 && previousRow != 0) {
        if (currentKingSquareSplitId.column != "A") {
            let leftNextSquareId = getDiagonalSquareIdIfAllowed(currentKingSquareSplitId.column, "left", previousRow, isWhitePiece, true)
            if (leftNextSquareId) {
                allowedSquares.push(leftNextSquareId);
            }
        }

        if (currentKingSquareSplitId.column != "H") {
            let rightNextSquareId = getDiagonalSquareIdIfAllowed(currentKingSquareSplitId.column, "right", previousRow, isWhitePiece, true)
            if (rightNextSquareId) {
                allowedSquares.push(rightNextSquareId)
            }
        }
    }
    if (nextRow != 9 && nextRow != 0) {// Check vertical square up
        let nextSquareHtmlObject = document.getElementById(currentKingSquareSplitId.column + nextRow)
        let otherSquareIsWhite = checkPieceColor(nextSquareHtmlObject, 'whitePiece')
        let nextVerticalSquareId = currentKingSquareSplitId.column + nextRow;
        if (otherSquareIsWhite == undefined)
            allowedSquares.push(nextVerticalSquareId);

        else if (isWhitePiece != otherSquareIsWhite)
            allowedSquares.push(nextVerticalSquareId);
    }

    if (previousRow != 9 && previousRow != 0) { // Check next vertical square down
        let nextSquareHtmlObject = document.getElementById(currentKingSquareSplitId.column + previousRow)
        let otherSquareIsWhite = checkPieceColor(nextSquareHtmlObject, 'whitePiece')
        let nextVerticalSquareId = currentKingSquareSplitId.column + previousRow;
        if (otherSquareIsWhite == undefined)
            allowedSquares.push(nextVerticalSquareId);

        else if (isWhitePiece != otherSquareIsWhite)
            allowedSquares.push(nextVerticalSquareId);
    }

    if (currentKingSquareSplitId.column != "H") {
        let columnRight = getColumnNextTo(currentKingSquareSplitId.column, 'right')
        let otherSquareIsWhite = checkPieceColor(document.getElementById(columnRight + currentKingSquareSplitId.row), 'whitePiece')
        if (otherSquareIsWhite == undefined)
            allowedSquares.push(columnRight + currentKingSquareSplitId.row);

        else if (isWhitePiece != otherSquareIsWhite)
            allowedSquares.push(columnRight + currentKingSquareSplitId.row);

    }

    if (currentKingSquareSplitId.column != "A") {
        let columnLeft = getColumnNextTo(currentKingSquareSplitId.column, 'left')
        let otherSquareIsWhite = checkPieceColor(document.getElementById(columnLeft + currentKingSquareSplitId.row), 'whitePiece')
        if (otherSquareIsWhite == undefined)
            allowedSquares.push(columnLeft + currentKingSquareSplitId.row);

        else if (isWhitePiece != otherSquareIsWhite)
            allowedSquares.push(columnLeft + currentKingSquareSplitId.row);
    }


    if (castleQueenWhite == "Q" && isWhitePiece && whiteTurn && !kingCheckedObject) {
        d1 = document.getElementById("D1")
        c1 = document.getElementById("C1")
        b1 = document.getElementById("B1")


        if (b1.innerHTML == "" && c1.innerHTML == "" && d1.innerHTML == "")
            if (!checkIfOwnKingChecked(isWhitePiece, pieceChosen.innerHTML, 'D1', pieceChosen))
                allowedSquares.push("C1");
    }

    if (castleQueenBlack == "q" && !isWhitePiece && !whiteTurn && !kingCheckedObject) {
        d8 = document.getElementById("D8")
        c8 = document.getElementById("C8")
        b8 = document.getElementById("B8")

        if (b8.innerHTML == "" && c8.innerHTML == "" && d8.innerHTML == "")
            if (!checkIfOwnKingChecked(isWhitePiece, pieceChosen.innerHTML, 'D8', pieceChosen))
                allowedSquares.push("C8");
    }


    if (castleKingWhite == "K" && isWhitePiece && whiteTurn && !kingCheckedObject) {
        f1 = document.getElementById("F1")
        g1 = document.getElementById("G1")

        if (f1.innerHTML == "" && g1.innerHTML == "")
            if (!checkIfOwnKingChecked(isWhitePiece, pieceChosen.innerHTML, 'F1', pieceChosen))
                allowedSquares.push("G1");
    }

    if (castleKingBlack == "k" && !isWhitePiece && !whiteTurn && !kingCheckedObject) {
        f8 = document.getElementById("F8")
        g8 = document.getElementById("G8")

        if (f8.innerHTML == "" && g8.innerHTML == "")
            if (!checkIfOwnKingChecked(isWhitePiece, pieceChosen.innerHTML, 'F8', pieceChosen))
                allowedSquares.push("G8");
    }

    return allowedSquares;
}


function checkAndPushDiagonalsMove(currentPieceSquareSplitIdColumn, currentPieceSquareSplitIdRow, pieceChosen) {
    let allowedSquares = [];
    let iteratedSquareSplitIdColumn;
    let iteratedSquareSplitIdRow;
    let isWhitePiece = checkPieceColor(pieceChosen, "whitePiece");

    iteratedSquareSplitIdColumn = currentPieceSquareSplitIdColumn
    iteratedSquareSplitIdRow = currentPieceSquareSplitIdRow
    while (iteratedSquareSplitIdColumn != "A" && iteratedSquareSplitIdRow != 8) {// Checking diagonal up and left 
        let leftNextSquareId = getDiagonalSquareIdIfAllowed(iteratedSquareSplitIdColumn, "left", Number(iteratedSquareSplitIdRow) + 1, isWhitePiece, true)
        if (leftNextSquareId) {
            allowedSquares.push(leftNextSquareId);
            if (document.getElementById(leftNextSquareId).innerHTML != "")
                break;
        }
        else
            break;
        iteratedSquareSplitIdColumn = getColumnNextTo(iteratedSquareSplitIdColumn, "left")
        iteratedSquareSplitIdRow = (Number(iteratedSquareSplitIdRow) + 1).toString();

    }

    iteratedSquareSplitIdColumn = currentPieceSquareSplitIdColumn
    iteratedSquareSplitIdRow = currentPieceSquareSplitIdRow
    while (iteratedSquareSplitIdColumn != "H" && iteratedSquareSplitIdRow != 8) {// Checking diagonal up and right

        let rightNextSquareId = getDiagonalSquareIdIfAllowed(iteratedSquareSplitIdColumn, "right", Number(iteratedSquareSplitIdRow) + 1, isWhitePiece, true)
        if (rightNextSquareId) {
            allowedSquares.push(rightNextSquareId)
            if (document.getElementById(rightNextSquareId).innerHTML != "")
                break;
        }
        else
            break;
        iteratedSquareSplitIdColumn = getColumnNextTo(iteratedSquareSplitIdColumn, "right")
        iteratedSquareSplitIdRow = (Number(iteratedSquareSplitIdRow) + 1).toString();

    }

    iteratedSquareSplitIdColumn = currentPieceSquareSplitIdColumn
    iteratedSquareSplitIdRow = currentPieceSquareSplitIdRow
    while (iteratedSquareSplitIdColumn != "A" && iteratedSquareSplitIdRow != 1) {// Checking diagonal down and left 
        let leftNextSquareId = getDiagonalSquareIdIfAllowed(iteratedSquareSplitIdColumn, "left", Number(iteratedSquareSplitIdRow) - 1, isWhitePiece, true)
        if (leftNextSquareId) {
            allowedSquares.push(leftNextSquareId);
            if (document.getElementById(leftNextSquareId).innerHTML != "")
                break;
        }
        else
            break;
        iteratedSquareSplitIdColumn = getColumnNextTo(iteratedSquareSplitIdColumn, "left")
        iteratedSquareSplitIdRow = (Number(iteratedSquareSplitIdRow) - 1).toString();

    }

    iteratedSquareSplitIdColumn = currentPieceSquareSplitIdColumn
    iteratedSquareSplitIdRow = currentPieceSquareSplitIdRow
    while (iteratedSquareSplitIdColumn != "H" && iteratedSquareSplitIdRow != 1) {// Checking diagonal down and right

        let rightNextSquareId = getDiagonalSquareIdIfAllowed(iteratedSquareSplitIdColumn, "right", Number(iteratedSquareSplitIdRow) - 1, isWhitePiece, true)
        if (rightNextSquareId) {
            allowedSquares.push(rightNextSquareId)
            if (document.getElementById(rightNextSquareId).innerHTML != "")
                break;
        }
        else
            break;
        iteratedSquareSplitIdColumn = getColumnNextTo(iteratedSquareSplitIdColumn, "right")
        iteratedSquareSplitIdRow = (Number(iteratedSquareSplitIdRow) - 1).toString();
    }
    return allowedSquares;
}


function checkAndPushVerticalMoves(currentPieceSquareSplitIdColumn, currentPieceSquareSplitIdRow, pieceChosen) {
    let allowedSquares = [];
    let iteratedSquareSplitIdColumn;
    let iteratedSquareSplitIdRow;
    let isWhitePiece = checkPieceColor(pieceChosen, "whitePiece")

    iteratedSquareSplitIdColumn = currentPieceSquareSplitIdColumn
    iteratedSquareSplitIdRow = currentPieceSquareSplitIdRow
    while (iteratedSquareSplitIdRow != 8) {
        // Check vertical square up
        let nextSquareHtmlObject = document.getElementById(iteratedSquareSplitIdColumn + (Number(iteratedSquareSplitIdRow) + 1).toString())
        let otherSquareIsWhite = checkPieceColor(nextSquareHtmlObject, 'whitePiece')
        let nextVerticalSquareId = iteratedSquareSplitIdColumn + (Number(iteratedSquareSplitIdRow) + 1).toString();
        if (otherSquareIsWhite == undefined)
            allowedSquares.push(nextVerticalSquareId);
        else if (isWhitePiece != otherSquareIsWhite)
            allowedSquares.push(nextVerticalSquareId);
        if (document.getElementById(nextVerticalSquareId).innerHTML != "")
            break;
        iteratedSquareSplitIdRow = (Number(iteratedSquareSplitIdRow) + 1).toString();
    }

    iteratedSquareSplitIdColumn = currentPieceSquareSplitIdColumn
    iteratedSquareSplitIdRow = currentPieceSquareSplitIdRow
    while (iteratedSquareSplitIdRow != 1) {
        // Check vertical square up
        let nextSquareHtmlObject = document.getElementById(iteratedSquareSplitIdColumn + (Number(iteratedSquareSplitIdRow) - 1).toString())
        let otherSquareIsWhite = checkPieceColor(nextSquareHtmlObject, 'whitePiece')
        let nextVerticalSquareId = iteratedSquareSplitIdColumn + (Number(iteratedSquareSplitIdRow) - 1).toString();
        if (otherSquareIsWhite == undefined)
            allowedSquares.push(nextVerticalSquareId);
        else if (isWhitePiece != otherSquareIsWhite)
            allowedSquares.push(nextVerticalSquareId);
        if (document.getElementById(nextVerticalSquareId).innerHTML != "")
            break;
        iteratedSquareSplitIdRow = (Number(iteratedSquareSplitIdRow) - 1).toString();
    }



    return allowedSquares;
}
function checkAndPushHorizontalMoves(currentPieceSquareSplitIdColumn, currentPieceSquareSplitIdRow, pieceChosen) {
    let allowedSquares = [];
    let iteratedSquareSplitIdColumn;
    let iteratedSquareSplitIdRow;
    let isWhitePiece = checkPieceColor(pieceChosen, "whitePiece")

    iteratedSquareSplitIdColumn = currentPieceSquareSplitIdColumn
    iteratedSquareSplitIdRow = currentPieceSquareSplitIdRow
    while (iteratedSquareSplitIdColumn != "A") {
        //Check horizantel left
        let nextSquareHtmlObject = document.getElementById(getColumnNextTo(iteratedSquareSplitIdColumn, 'left') + iteratedSquareSplitIdRow)
        let otherSquareIsWhite = checkPieceColor(nextSquareHtmlObject, 'whitePiece')
        let nextHorizontalSquareId = getColumnNextTo(iteratedSquareSplitIdColumn, 'left') + iteratedSquareSplitIdRow;
        if (otherSquareIsWhite == undefined)
            allowedSquares.push(nextHorizontalSquareId);
        else if (isWhitePiece != otherSquareIsWhite)
            allowedSquares.push(nextHorizontalSquareId);
        if (document.getElementById(nextHorizontalSquareId).innerHTML != "")
            break;

        iteratedSquareSplitIdColumn = getColumnNextTo(iteratedSquareSplitIdColumn, 'left');
    }

    iteratedSquareSplitIdColumn = currentPieceSquareSplitIdColumn
    iteratedSquareSplitIdRow = currentPieceSquareSplitIdRow
    while (iteratedSquareSplitIdColumn != "H") {
        //Check horizantel left
        let nextSquareHtmlObject = document.getElementById(getColumnNextTo(iteratedSquareSplitIdColumn, 'right') + iteratedSquareSplitIdRow)
        let otherSquareIsWhite = checkPieceColor(nextSquareHtmlObject, 'whitePiece')
        let nextHorizontalSquareId = getColumnNextTo(iteratedSquareSplitIdColumn, 'right') + iteratedSquareSplitIdRow;
        if (otherSquareIsWhite == undefined)
            allowedSquares.push(nextHorizontalSquareId);
        else if (isWhitePiece != otherSquareIsWhite)
            allowedSquares.push(nextHorizontalSquareId);
        if (document.getElementById(nextHorizontalSquareId).innerHTML != "")
            break;

        iteratedSquareSplitIdColumn = getColumnNextTo(iteratedSquareSplitIdColumn, 'right');
    }



    return allowedSquares;
}

function getColumnNextTo(fromColumn, direction) {
    if (direction == "left")
        return String.fromCharCode(fromColumn.charCodeAt(0) - 1)
    else
        return String.fromCharCode(fromColumn.charCodeAt(0) + 1)

}

function checkQueenMoves(pieceChosen) {
    let currentQueenSquareSplitId = splitId(pieceChosen.id);
    let allowedSquares = [];
    allowedSquares = checkAndPushDiagonalsMove(currentQueenSquareSplitId.column, currentQueenSquareSplitId.row, pieceChosen);
    allowedSquares = allowedSquares.concat(checkAndPushVerticalMoves(currentQueenSquareSplitId.column, currentQueenSquareSplitId.row, pieceChosen))
    allowedSquares = allowedSquares.concat(checkAndPushHorizontalMoves(currentQueenSquareSplitId.column, currentQueenSquareSplitId.row, pieceChosen))
    return allowedSquares;
}

function checkBishopMoves(pieceChosen) {
    let allowedSquares = [];
    let currentBishopSquareSplitId = splitId(pieceChosen.id);
    allowedSquares = checkAndPushDiagonalsMove(currentBishopSquareSplitId.column, currentBishopSquareSplitId.row, pieceChosen);
    return allowedSquares;
}

function checkRookMoves(pieceChosen) {
    let allowedSquares = [];
    let currentRookSquareSplitId = splitId(pieceChosen.id);
    allowedSquares = checkAndPushHorizontalMoves(currentRookSquareSplitId.column, currentRookSquareSplitId.row, pieceChosen);
    allowedSquares = allowedSquares.concat(checkAndPushVerticalMoves(currentRookSquareSplitId.column, currentRookSquareSplitId.row, pieceChosen))
    return allowedSquares;
}

function checkColumnNextToEnPassant(currentPawnColumn, newPawnColumn) {
    if ((String.fromCharCode(currentPawnColumn.charCodeAt(0) - 1) == newPawnColumn) || String.fromCharCode(currentPawnColumn.charCodeAt(0) + 1) == newPawnColumn)
        return true;
    else return false;
}

function checkAndPushKnightNextSquareId(nextSquareId, isWhitePiece) {
    let allowedSquares = [];
    let otherSquareIsWhite = checkPieceColor(document.getElementById(nextSquareId), "whitePiece")
    if (isWhitePiece != otherSquareIsWhite)
        allowedSquares.push(nextSquareId)

    return allowedSquares
}

function checkKnightMoves(pieceChosen) {
    let allowedSquares = []
    let currentKnightSquareSplitId = splitId(pieceChosen.id);
    let isWhitePiece = checkPieceColor(pieceChosen, "whitePiece")

    if (currentKnightSquareSplitId.row < 7 && currentKnightSquareSplitId.column != "A") {
        let nextSquareId = getColumnNextTo(currentKnightSquareSplitId.column, 'left') + (Number(currentKnightSquareSplitId.row) + 2).toString()
        allowedSquares = allowedSquares.concat(checkAndPushKnightNextSquareId(nextSquareId, isWhitePiece));
    }

    if (currentKnightSquareSplitId.row < 7 && currentKnightSquareSplitId.column != "H") {
        let nextSquareId = getColumnNextTo(currentKnightSquareSplitId.column, 'right') + (Number(currentKnightSquareSplitId.row) + 2).toString()
        allowedSquares = allowedSquares.concat(checkAndPushKnightNextSquareId(nextSquareId, isWhitePiece));
    }

    if (currentKnightSquareSplitId.row < 8 && currentKnightSquareSplitId.column != "G" && currentKnightSquareSplitId.column != "H") {
        let nextSquareId = getColumnNextTo(getColumnNextTo(currentKnightSquareSplitId.column, "right"), "right") + (Number(currentKnightSquareSplitId.row) + 1).toString()
        allowedSquares = allowedSquares.concat(checkAndPushKnightNextSquareId(nextSquareId, isWhitePiece));
    }

    if (currentKnightSquareSplitId.row > 1 && currentKnightSquareSplitId.column != "G" && currentKnightSquareSplitId.column != "H") {
        let nextSquareId = getColumnNextTo(getColumnNextTo(currentKnightSquareSplitId.column, "right"), "right") + (Number(currentKnightSquareSplitId.row) - 1).toString()
        allowedSquares = allowedSquares.concat(checkAndPushKnightNextSquareId(nextSquareId, isWhitePiece));
    }

    if (currentKnightSquareSplitId.row > 2 && currentKnightSquareSplitId.column != "H") {
        let nextSquareId = getColumnNextTo(currentKnightSquareSplitId.column, 'right') + (Number(currentKnightSquareSplitId.row) - 2).toString()
        allowedSquares = allowedSquares.concat(checkAndPushKnightNextSquareId(nextSquareId, isWhitePiece));
    }

    if (currentKnightSquareSplitId.row > 2 && currentKnightSquareSplitId.column != "A") {
        let nextSquareId = getColumnNextTo(currentKnightSquareSplitId.column, 'left') + (Number(currentKnightSquareSplitId.row) - 2).toString()
        allowedSquares = allowedSquares.concat(checkAndPushKnightNextSquareId(nextSquareId, isWhitePiece));
    }

    if (currentKnightSquareSplitId.row > 1 && currentKnightSquareSplitId.column != "A" && currentKnightSquareSplitId.column != "B") {
        let nextSquareId = getColumnNextTo(getColumnNextTo(currentKnightSquareSplitId.column, "left"), "left") + (Number(currentKnightSquareSplitId.row) - 1).toString()
        allowedSquares = allowedSquares.concat(checkAndPushKnightNextSquareId(nextSquareId, isWhitePiece));
    }

    if (currentKnightSquareSplitId.row < 8 && currentKnightSquareSplitId.column != "A" && currentKnightSquareSplitId.column != "B") {
        let nextSquareId = getColumnNextTo(getColumnNextTo(currentKnightSquareSplitId.column, "left"), "left") + (Number(currentKnightSquareSplitId.row) + 1).toString()
        allowedSquares = allowedSquares.concat(checkAndPushKnightNextSquareId(nextSquareId, isWhitePiece));
    }







    return allowedSquares;
}

function checkPieceMoves(pieceChosen) {
    let allowedSquares = [];
    if (pieceChosen.innerHTML == "♙")
        allowedSquares = checkPawnmoves(pieceChosen);
    if (pieceChosen.innerHTML == "♚")
        allowedSquares = checkKingMoves(pieceChosen);
    if (pieceChosen.innerHTML == "♛")
        allowedSquares = checkQueenMoves(pieceChosen);
    if (pieceChosen.innerHTML == "♝")
        allowedSquares = checkBishopMoves(pieceChosen);
    if (pieceChosen.innerHTML == "♜")
        allowedSquares = checkRookMoves(pieceChosen);
    if (pieceChosen.innerHTML == "♞")
        allowedSquares = checkKnightMoves(pieceChosen);



    console.log(allowedSquares)
    return allowedSquares;
}


function removeNotPossibleSquares(allowedSquares, pieceChosen) {
    let isWhitePiece = checkPieceColor(pieceChosen, "whitePiece");
    let pieceChosenInnerHTML = pieceChosen.innerHTML;



    for (i = 0; i < allowedSquares.length; i++) {
        ownKingChecked = checkIfOwnKingChecked(isWhitePiece, pieceChosenInnerHTML, allowedSquares[i], pieceChosen)
        if (ownKingChecked) {
            allowedSquares.splice(i, 1);
            i--
        }
    }
    return allowedSquares;
}

function checkIfOwnKingChecked(isWhitePiece, pieceChosenInnerHTML, kingSquareId, pieceChosen) {
    simulatedMovesHtmlObject = document.getElementById(kingSquareId)
    let simulatedMovesHtmlObjectWhitePiece = checkPieceColor(simulatedMovesHtmlObject, "whitePiece")
    let simulatedMovesHtmlObjectInnerHTML = simulatedMovesHtmlObject.innerHTML;
    let ownKingChecked = false;

    simulatedMovesHtmlObject.innerHTML = pieceChosen.innerHTML;
    pieceChosen.innerHTML = "";

    pieceChosen.classList.contains('whitePiece') ? changePieceColor(simulatedMovesHtmlObject, 'blackPiece', 'whitePiece') : changePieceColor(simulatedMovesHtmlObject, 'whitePiece', 'blackPiece');

    let ownKingCheckedObject = checkIfKingIsChecked(!isWhitePiece)
    if (ownKingCheckedObject) {
        ownKingChecked = true;
    }
    pieceChosen.innerHTML = pieceChosenInnerHTML;
    simulatedMovesHtmlObject.innerHTML = simulatedMovesHtmlObjectInnerHTML;
    if (simulatedMovesHtmlObjectWhitePiece == undefined) {
        simulatedMovesHtmlObject.classList.remove('whitePiece');
        simulatedMovesHtmlObject.classList.remove('blackPiece');
    }
    else {
        simulatedMovesHtmlObjectWhitePiece ? changePieceColor(simulatedMovesHtmlObject, 'blackPiece', 'whitePiece') : changePieceColor(simulatedMovesHtmlObject, 'whitePiece', 'blackPiece');

    }

    isWhitePiece ? changePieceColor(pieceChosen, 'blackPiece', 'whitePiece') : changePieceColor(pieceChosen, 'whitePiece', 'blackPiece');
    return ownKingChecked;
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