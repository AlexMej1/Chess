
window.onload = () => {
    ////////////////////////////////////
    {
    var h1 = document.createElement('h1');
    document.body.appendChild(h1);
    h1.innerText = 'The chess:';
    var eventBoard = document.createElement('table');
    document.body.appendChild(eventBoard);
    eventBoard.classList.add('eventDiv');
    var turnEventTxt= eventBoard.insertRow();
    var checkEventTxt= eventBoard.insertRow();
    turnEventTxt.textContent = 'White Turn';
    var restartBtn= document.createElement('button');
    restartBtn.textContent='restart';
    restartBtn.classList.add('restartBtn');
    document.body.appendChild(restartBtn);
    restartBtn.addEventListener('click', restartGame);
    var table = document.createElement('table');
    }
    let endGame=false;
    function createBoard() {//Creates the board       
        table.classList.add('table-container');
        const body = document.querySelector('body');
        body.appendChild(table);
        for (let i = 0; i < 8; i++) {
            let row = table.insertRow(i);
            for (let j = 0; j < 8; j++) {
                let cell = row.insertCell();
                cell.id = i.toString() + " " + j.toString();
                cell.addEventListener('click', ClickEventFunc);
            }
        }
        paintBoard();
    }
    createBoard();
    ////////////////////////////////////
    function paintBoard() {//Adds tile colors
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 === 0)
                    table.rows[i].cells[j].className = 'darkCell';
                else 
                    table.rows[i].cells[j].className = 'whiteCell';
                if(endGame) 
                    table.rows[i].cells[j].removeEventListener('click',ClickEventFunc);
            }
        }
    }
    ////////////////////////////////////
    let typeW = 'White';
    let typeD = 'Dark';
    let pieces = [];
    let imgIndex = 0;
    let whiteTurn = true;
    ////////////////////////////////////
    class Piece {//Class of the chess pieces
        constructor(row, col, type, pieceT) {
            this.row = row;
            this.col = col;
            this.type = type;
            this.pieceT = pieceT;
            this.cell = this.updateCell();
            this.img = document.createElement('img');
            this.firstMove = true;
            this.opponent = this.getOpponent();
        }
        //todo: img lays on row and col
        updateCell(){
            return table.rows[this.row].cells[this.col];
        }
        getOpponent() {
            if (this.type === typeW)
                return typeD;
            else
                return typeW;
        }
        addImage() {//Func that adds piece images
            this.img.src = 'images/' + this.type + this.pieceT + '.png';
            this.img.id = imgIndex;
            imgIndex++;
            this.cell.appendChild(this.img);
            this.img.classList.add('heroImg');
        }
        removeImage() {
            this.cell.removeChild(this.img);
        }
        deletePiece() {
            this.pieceT = 'removed';
            this.cell.removeChild(this.img);
        }
        moveImage() {
            this.cell.appendChild(this.img);
        }
        changeFirstMove() {
            this.firstMove = false;
        }
        updateColRowByCell() {
            let arr = this.cell.id.split(" ");
            this.row = parseInt(arr[0]);
            this.col = parseInt(arr[1]);
        }
        nextCell(rAdd, cAdd) {
            return table.rows[this.row + rAdd].cells[this.col + cAdd];
        }
        getPawnMoves(check) {
            if (this.type == 'White' && whiteTurn || this.type == 'Dark' && !whiteTurn || check) {
                let moves = [];
                let a = 1;
                if (this.type == 'Dark')
                    a = -1;
                if (this.firstMove) {
                    let hasPiece = false;
                    for (let i = 1; i <= 2 && !hasPiece; i++) {
                        if (hasImgInCell(this.nextCell(a * i, 0))) {
                            hasPiece = true;
                        } else {
                            moves.push(this.nextCell(a * i, 0));
                        }
                    }
                } else {
                    if (!hasImgInCell(this.nextCell(a, 0))) {
                        moves.push(this.nextCell(a, 0));
                    }
                }
                if (a == 1) {
                    if ((this.row + 1) < 8 && (this.col + 1) < 8)
                        isEnemy(this.nextCell(1, 1), this.type, check);
                    if ((this.row + 1) < 8 && (this.col - 1) >= 0)
                        isEnemy(this.nextCell(1, -1), this.type, check);
                } else {
                    if ((this.row - 1) >= 0 && (this.col + 1) < 8)
                        isEnemy(this.nextCell(-1, 1), this.type, check);
                    if ((this.row - 1) >= 0 && (this.col - 1) >= 0)
                        isEnemy(this.nextCell(-1, -1), this.type, check);
                }
                return moves;
            }
    
        }
        getcemetricMoves(pieceT, check) {
            let moves = [];
            if (this.type == 'White' && whiteTurn || this.type == 'Dark' && !whiteTurn || check) {
                let hasPiece1 = 1;
                let hasPiece2 = 1;
                let hasPiece3 = 1;
                let hasPiece4 = 1;
                let j = 0;
                for (let i = 1; i < 8; i++) {
                    if (pieceT === 'bishop')
                        j = i;
                    if (this.row + i < 8 && this.col + j < 8) {
    
                        if (hasImgInCell(this.nextCell(i, j))) {
                            if (isEnemy(this.nextCell(i * hasPiece1, j * hasPiece1), this.type, check))
                                hasPiece1 = 0;
                            else
                                hasPiece1 = 0;
                        } else if (hasPiece1 !== 0)
                            moves.push(this.nextCell(i * hasPiece1, j * hasPiece1));
                    }
                    if (this.row - i >= 0 && this.col - j >= 0) {
                        if (hasImgInCell(this.nextCell(-i, -j))) {
                            if (isEnemy(this.nextCell(-i * hasPiece2, -j * hasPiece2), this.type, check))
                                hasPiece2 = 0;
                            else
                                hasPiece2 = 0;
                        } else if (hasPiece2 !== 0)
                            moves.push(this.nextCell(-i * hasPiece2, -j * hasPiece2));
                    }
                    if (this.col + i < 8 && this.row - j >= 0) {
                        if (hasImgInCell(this.nextCell(-j, i))) {
                            if (isEnemy(this.nextCell(-j * hasPiece3, i * hasPiece3), this.type, check))
                                hasPiece3 = 0;
                            else
                                hasPiece3 = 0;
    
                        } else if (hasPiece3 !== 0)
                            moves.push(this.nextCell(-j * hasPiece3, i * hasPiece3));
                    }
                    if (this.col - i >= 0 && this.row + j < 8) {
                        if (hasImgInCell(this.nextCell(j, -i))) {
                            if (isEnemy(this.nextCell(j * hasPiece4, -i * hasPiece4), this.type, check))
                                hasPiece4 = 0;
                            else
                                hasPiece4 = 0;
    
                        } else if (hasPiece4 !== 0)
                            moves.push(this.nextCell(j * hasPiece4, -i * hasPiece4));
                    }
                }
                return moves;
            }
        }
        getRookMoves(check) {
            let moves = this.getcemetricMoves(this.pieceT, check);
            return moves;
        }
        getBishopMoves(check) {
            let moves = this.getcemetricMoves(this.pieceT, check);
            return moves;
        }
        getQueenMoves(check) {
            if (this.type == 'White' && whiteTurn || this.type == 'Dark' && !whiteTurn || check) {
                let moves = this.getcemetricMoves('rook', check);
                return moves.concat(this.getcemetricMoves('bishop', check));
            }
        }
        getKnightMoves(check) {
            if (this.type == 'White' && whiteTurn || this.type == 'Dark' && !whiteTurn || check) {
                let moves = [];
                let a = 1;
                let b = 2;
                for (let i = 0; i < 4; i++) {
                    if (this.row + b < 8 && this.col + a < 8 && this.row + b >= 0 && this.col + a >= 0) {
                        if (!hasImgInCell(this.nextCell(b, a)))
                            moves.push(this.nextCell(b, a));
                        else
                            isEnemy(this.nextCell(b, a), this.type, check);
                    }
                    if (this.row + a < 8 && this.col + b < 8 && this.row + a >= 0 && this.col + b >= 0) {
                        if (!hasImgInCell(this.nextCell(a, b)))
                            moves.push(this.nextCell(a, b));
                        else
                            isEnemy(this.nextCell(a, b), this.type, check);
                    }
                    if (i == 0)
                        a *= -1;//b=2 a=-1
                    else if (i == 1)
                        b *= -1;//b=-2 a=-1
                    else
                        a *= -1;//a=1 b=-2
                }
                return moves;
            }
        }
        getKingMoves(check) {
            if (this.type == 'White' && whiteTurn || this.type == 'Dark' && !whiteTurn || check) {
                let moves = [];
                let a = 1;
                let b = 1;
                for (let i = 0; i < 4; i++) {
                    if (this.row + 1 * a < 8 && this.col + 1 * b < 8 && this.row + 1 * a >= 0 && this.col + 1 * b >= 0) {
                        if (!hasImgInCell(this.nextCell(1 * a, 1 * b))) {
                            moves.push(this.nextCell(1 * a, 1 * b));
                        } else
                            isEnemy(this.nextCell(1 * a, 1 * b), this.type, check)
    
                        if (!hasImgInCell(this.nextCell(0, 1 * b))) {
                            moves.push(this.nextCell(0, 1 * b));
                        } else
                            isEnemy(this.nextCell(0, 1 * b), this.type, check)
    
                        if (!hasImgInCell(this.nextCell(1 * a, 0))) {
                            moves.push(this.nextCell(1 * a, 0));
                        } else
                            isEnemy(this.nextCell(1 * a, 0), this.type, check)
                    }
                    if (i == 0) {
                        a *= -1;//a=-1 b=1
                    } else if (i == 1) {
                        b *= -1;//a=-1 b=-1
                    } else if (i == 2) {
                        a *= -1;//a=1 b=-1
                    }
                }
                return moves;
            }
        }
    }
    ////////////////////////////////////
    function addPieceToClass() {//Makes the array of pieces
        let result = [];
        result.push(new Piece(0, 0, typeW, 'rook'));
        result.push(new Piece(0, 1, typeW, 'knight'));
        result.push(new Piece(0, 2, typeW, 'bishop'));
        result.push(new Piece(0, 3, typeW, 'queen'));
        result.push(new Piece(0, 4, typeW, 'king'));
        result.push(new Piece(0, 5, typeW, 'bishop'));
        result.push(new Piece(0, 6, typeW, 'knight'));
        result.push(new Piece(0, 7, typeW, 'rook'));
        for (let i = 0; i < 8; i++) {
            result.push(new Piece(1, i, typeW, 'pawn'));
            result.push(new Piece(6, i, typeD, 'pawn'));
        }
        result.push(new Piece(7, 0, typeD, 'rook'));
        result.push(new Piece(7, 1, typeD, 'knight'));
        result.push(new Piece(7, 2, typeD, 'bishop'));
        result.push(new Piece(7, 3, typeD, 'queen'));
        result.push(new Piece(7, 4, typeD, 'king'));
        result.push(new Piece(7, 5, typeD, 'bishop'));
        result.push(new Piece(7, 6, typeD, 'knight'));
        result.push(new Piece(7, 7, typeD, 'rook'));
        return result;
    }
    ////////////////////////////////////
    pieces = addPieceToClass();
    ////////////////////////////////////
    for (let piece of pieces) {//For that adds piece images by the piece class
        piece.addImage();
    }
    ////////////////////////////////////
    let prevP;
    function ClickEventFunc(e) {//Click event 
        if (e.currentTarget.className != 'possibleMoves' && e.currentTarget.hasChildNodes()) {//if cell is not green or has img
            if (e.currentTarget.className !== 'enemyCell')
                e.currentTarget.className = 'selectedCell';
        }
        if (e.currentTarget.children[0] != undefined) {
            if (e.currentTarget.className === 'enemyCell') {//red tiled paint for enemy
                let id = e.currentTarget.children[0].id;
                let p = pieces[id];
                prevP.cell = p.cell;
                p.deletePiece();
                prevP.updateColRowByCell();
                prevP.moveImage();
                if(prevP.pieceT==='king')
                    checkEventTxt.textContent = '';
                prevP.firstMove = false;
                paintBoard();
                if (whiteTurn){
                    whiteTurn = false;
                    turnEventTxt.innerText = 'Black Turn'
                }
                else{
                    whiteTurn = true;
                    turnEventTxt.innerText = 'White Turn'
                }
                check();
            }
            if (e.currentTarget.className = 'selectedCell') {
                let id = e.currentTarget.children[0].id;
                let p = pieces[id];
                paintBoard();
                e.currentTarget.className = 'selectedCell';
                pieceMovementOptions(p);
                prevP = p;
            }
        } else {
            if (e.currentTarget.className === 'possibleMoves') {//piece movement on green tiles 
                prevP.removeImage();
                prevP.cell = e.currentTarget;
                prevP.updateColRowByCell();
                prevP.moveImage();
                if(prevP.pieceT==='king')
                    checkEventTxt.textContent = '';
                paintBoard();
                if (whiteTurn){
                    whiteTurn = false;
                    turnEventTxt.textContent ='Black Turn';
                }
                else{
                    whiteTurn = true;
                    turnEventTxt.textContent ='White Turn';
                }
                if (prevP.firstMove)
                    prevP.changeFirstMove();
                check();
            }
        }
    }
    ////////////////////////////////////
    function pieceMovementOptions(p)//changes color of tiles compared to the piece chosen
    {
        let moves;
        if (p.pieceT === 'pawn')
            moves = p.getPawnMoves(false);
        ////////////////////////////////////
        else if (p.pieceT === 'knight')
            moves = p.getKnightMoves(false);
        ////////////////////////////////////
        else if (p.pieceT === 'rook')
            moves = p.getRookMoves(false);
        ////////////////////////////////////
        else if (p.pieceT == 'bishop')
            moves = p.getBishopMoves(false);
        ////////////////////////////////////
        else if (p.pieceT === 'queen')
            moves = p.getQueenMoves(false);
        ////////////////////////////////////
        else if (p.pieceT === 'king'){
            moves = p.getKingMoves(false);
        }
        if (moves !== undefined) {
            for (let i = 0; i < moves.length; i++)
                moves[i].className = 'possibleMoves';
        }
    }
    ////////////////////////////////////
    function hasImgInCell(cell) {
        return cell.hasChildNodes();
    }
    ////////////////////////////////////
    function isEnemy(cell, type, check) {
        if (cell.hasChildNodes()) {
            let id = cell.children[0].id;
            let p = pieces[id];
            if (p.type !== type && !check)
                cell.className ='enemyCell';
            else if (check && p.type !== type && p.pieceT === 'king') {
                if (whiteTurn && p.type === typeW || !whiteTurn && p.type === typeD)
                    checkAnimation(p.type + " King");
                else if (!whiteTurn && p.type === typeW || whiteTurn && p.type === typeD)
                    checkmate(p.type);
            }          
        }
    }
    ////////////////////////////////////
    function check() {
        for (let piece of pieces) {
            if (piece.pieceT === 'pawn')
                piece.getPawnMoves(true);
            else if (piece.pieceT === 'rook')
                piece.getRookMoves(true);
            else if (piece.pieceT === 'bishop')
                piece.getBishopMoves(true);
            else if (piece.pieceT === 'knight')
                piece.getKnightMoves(true);
            else if (piece.pieceT === 'king')
                piece.getKingMoves(true);
            else if (piece.pieceT === 'queen')
                piece.getQueenMoves(true);
        } 
    }
    ////////////////////////////////////
    function checkAnimation(str) {
        checkEventTxt.textContent = 'check ' +str;
        console.log(str);
    }
    ////////////////////////////////////
    function checkmate(str) {
        if (str === 'Dark') {
            alert('Checkmate, white won!')
            checkEventTxt.textContent = 'White won';
        } else if (str === 'White') {
            alert('Checkmate, black won!');
            checkEventTxt.textContent = 'Black won';
        }  
        endGame=true;     
        paintBoard();
    }
    ////////////////////////////////////
    function restartGame(){
        location.reload();
    }
}

