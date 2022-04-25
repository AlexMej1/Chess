
window.onload = () => {
    ////////////////////////////////////
    var h1 = document.createElement('h1');
    document.body.appendChild(h1);
    h1.innerText = 'Chess';
    var table = document.createElement('table');
    function createBoard() {//Creates the board       
        table.classList.add('table-container');
        const body = document.querySelector('body');
        body.appendChild(table);
        for (let i = 0; i < 8; i++) {
            let row = table.insertRow(i);
            for (let j = 0; j < 8; j++) {
                let cell = row.insertCell();
                cell.id = i.toString() + " " + j.toString();
                cell.addEventListener('click', HClick);
            }
        }
        boardColor();
    }
    createBoard();
    ////////////////////////////////////
    function boardColor() {//Adds tile colors
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 === 0) {
                    // table.rows[i].cells[j].classList.add('darkTyped');
                    table.rows[i].cells[j].style.backgroundColor = 'brown';
                }
                else {
                    // table.rows[i].cells[j].classList.add('whiteTyped');
                    table.rows[i].cells[j].style.backgroundColor = 'wheat';
                }
            }
        }
    }
    ////////////////////////////////////
    let typeW = 'White';
    let typeD = 'Dark';
    let pieces = [];
    let imgIndex = 0;
    let darkKingLose = false;
    let whiteKingLose = false;
    ////////////////////////////////////
    class piece {//Class of the chess pieces
        constructor(row, col, type, pieceT) {
            this.row = row;
            this.col = col;
            this.type = type;
            this.pieceT = pieceT;
            this.cell = table.rows[this.row].cells[this.col];
            this.img = document.createElement('img');
            this.firstMove = true;
        }
        //todo: img lays on row and col

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
        cellAdd(rAdd, cAdd) {
            return table.rows[this.row + rAdd].cells[this.col + cAdd];
        }
        getPawnMoves() {
            if (this.type == 'White' && whiteTurn || this.type == 'Dark' && !whiteTurn) {
                let moves = [];
                let a = 1;
                if (this.type == 'Dark')
                    a = -1;
                if (this.firstMove) {
                    let hasPiece = false;
                    for (let i = 1; i <= 2 && !hasPiece; i++) {
                        if (hasImgInCell(this.cellAdd(a * i, 0))) {
                            hasPiece = true;
                        } else {
                            moves.push(this.cellAdd(a * i, 0));
                        }
                    }
                } else {
                    if (!hasImgInCell(this.cellAdd(a, 0))) {
                        moves.push(this.cellAdd(a, 0));
                    }
                }
                if (a == 1) {
                    if ((this.row + 1) < 8 && (this.col + 1) < 8)
                        isEnemy(this.cellAdd(1, 1), this.type)
                    if ((this.row + 1) < 8 && (this.col - 1) >= 0)
                        isEnemy(this.cellAdd(1, -1), this.type)
                } else {
                    if ((this.row - 1) >= 0 && (this.col + 1) < 8)
                        isEnemy(this.cellAdd(-1, 1), this.type)
                    if ((this.row - 1) >= 0 && (this.col - 1) >= 0)
                        isEnemy(this.cellAdd(-1, -1), this.type)
                }
                return moves;
            }

        }
        getcemetricMoves(pieceT) {
            let moves = [];
            if (this.type == 'White' && whiteTurn || this.type == 'Dark' && !whiteTurn) {
                let hasPiece1 = 1;
                let hasPiece2 = 1;
                let hasPiece3 = 1;
                let hasPiece4 = 1;
                let j = 1;
                for (let i = 1; i < 8; i++) {
                    if (pieceT === 'bishop')
                        j = i;
                    if (this.row + i < 8 && this.col + j < 8) {
                        
                        if (hasImgInCell(this.cellAdd(i, j))) {
                            if (isEnemy(this.cellAdd(i * hasPiece1, j * hasPiece1), this.type))
                                hasPiece1 = 0;
                            else
                                hasPiece1 = 0;
                        } else if(hasPiece1!=0)
                            moves.push(this.cellAdd(i * hasPiece1, j * hasPiece1));
                    }
                    if (this.row - i >= 0 && this.col - j >= 0) {
                        if (hasImgInCell(this.cellAdd(-i, -j))) {
                            if (isEnemy(this.cellAdd(-i * hasPiece2, -j * hasPiece2), this.type))
                                hasPiece2 = 0;
                            else
                                hasPiece2 = 0;
                        } else if(hasPiece1!=0)
                            moves.push(this.cellAdd(-i * hasPiece2, -j * hasPiece2));
                    }
                    if (this.col + i < 8 && this.row - j >= 0) {
                        if (hasImgInCell(this.cellAdd(-j, i))) {
                            if (isEnemy(this.cellAdd(-j * hasPiece3, i * hasPiece3), this.type))
                                hasPiece3 = 0;
                            else
                                hasPiece3 = 0;

                        } else if(hasPiece1!=0)
                            moves.push(this.cellAdd(-j * hasPiece3, i * hasPiece3));
                    }
                    if (this.col - i >= 0 && this.row + j < 8) {
                        if (hasImgInCell(this.cellAdd(j, -i))) {
                            if (isEnemy(this.cellAdd(j * hasPiece4, -i * hasPiece4), this.type))
                                hasPiece4 = 0;
                            else
                                hasPiece4 = 0;

                        } else if(hasPiece1!=0)
                            moves.push(this.cellAdd(j * hasPiece4, -i * hasPiece4));
                    }                   
                }
                return moves;
            }
        }
        getRookMoves() {
            let moves = this.getcemetricMoves(this.pieceT);
            return moves;
        }
        getBishopMoves() {
            let moves = this.getcemetricMoves(this.pieceT);
            return moves;
        }
        getQueenMoves() {
            if (this.type == 'White' && whiteTurn || this.type == 'Dark' && !whiteTurn){
                let moves = this.getcemetricMoves('rook');
                return moves.concat(this.getcemetricMoves('bishop'));
            }
        }
        getKnightMoves() {
            if (this.type == 'White' && whiteTurn || this.type == 'Dark' && !whiteTurn) {
                let moves = [];
                let a = 1;
                let b = 2;
                for (let i = 0; i < 4; i++) {
                    if (this.row + b < 8 && this.col + a < 8 && this.row + b >= 0 && this.col + a >= 0) {
                        if (!hasImgInCell(this.cellAdd(b, a)))
                            moves.push(this.cellAdd(b, a));
                        else
                            isEnemy(this.cellAdd(b, a), this.type);
                    }
                    if (this.row + a < 8 && this.col + b < 8 && this.row + a >= 0 && this.col + b >= 0) {
                        if (!hasImgInCell(this.cellAdd(a, b)))
                            moves.push(this.cellAdd(a, b));
                        else
                            isEnemy(this.cellAdd(a, b), this.type);
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
        getKingMoves() {
            if (this.type == 'White' && whiteTurn || this.type == 'Dark' && !whiteTurn) {
                let moves = [];
                let a = 1;
                let b = 1;
                for (let i = 0; i < 4; i++) {
                    if (this.row + 1 * a < 8 && this.col + 1 * b < 8 && this.row + 1 * a >= 0 && this.col + 1 * b >= 0) {
                        if (!hasImgInCell(this.cellAdd(1 * a, 1 * b))) {
                            moves.push(this.cellAdd(1 * a, 1 * b));
                        } else
                            isEnemy(this.cellAdd(1 * a, 1 * b), this.type)

                        if (!hasImgInCell(this.cellAdd(0, 1 * b))) {
                            moves.push(this.cellAdd(0, 1 * b));
                        } else
                            isEnemy(this.cellAdd(0, 1 * b), this.type)

                        if (!hasImgInCell(this.cellAdd(1 * a, 0))) {
                            moves.push(this.cellAdd(1 * a, 0));
                        } else
                            isEnemy(this.cellAdd(1 * a, 0), this.type)
                    }
                    if (this.row + 1 * this < 8 && this.col + 1 * a < 8 && this.row + 1 * b >= 0 && this.col + 1 * a >= 0) {
                        if (!hasImgInCell(this.cellAdd(1 * b, 1 * a))) {
                            moves.push(this.cellAdd(1 * b, 1 * a));
                        } else
                            isEnemy(this.cellAdd(1 * b, 1 * a), this.type)

                        if (!hasImgInCell(this.cellAdd(0, 1 * a))) {
                            moves.push(this.cellAdd(0, 1 * a));
                        } else
                            isEnemy(this.cellAdd(0, 1 * a), this.type)

                        if (!hasImgInCell(this.cellAdd(1 * b, 0))) {
                            moves.push(this.cellAdd(1 * b, 0));
                        } else
                            isEnemy(this.cellAdd(1 * b, 0), this.type);
                    }
                    if (i == 0) {
                        a *= -1;//a=-1 b=1
                    } else if (i == 1) {
                        b *= -1;//a=-1 b=-1
                    } else if (i == 2) {
                        a *= -1;//a=1 b=-1
                    }
                }
            }
        }
    }
    ////////////////////////////////////
    function addPieceToClass() {//Makes the array of pieces
        let result = [];
        result.push(new piece(0, 0, typeW, 'rook'));
        result.push(new piece(0, 1, typeW, 'knight'));
        result.push(new piece(0, 2, typeW, 'bishop'));
        result.push(new piece(0, 3, typeW, 'queen'));
        result.push(new piece(0, 4, typeW, 'king'));
        result.push(new piece(0, 5, typeW, 'bishop'));
        result.push(new piece(0, 6, typeW, 'knight'));
        result.push(new piece(0, 7, typeW, 'rook'));
        for (let i = 0; i < 8; i++) {
            result.push(new piece(1, i, typeW, 'pawn'));
            result.push(new piece(6, i, typeD, 'pawn'));
        }
        result.push(new piece(7, 0, typeD, 'rook'));
        result.push(new piece(7, 1, typeD, 'knight'));
        result.push(new piece(7, 2, typeD, 'bishop'));
        result.push(new piece(7, 3, typeD, 'queen'));
        result.push(new piece(7, 4, typeD, 'king'));
        result.push(new piece(7, 5, typeD, 'bishop'));
        result.push(new piece(7, 6, typeD, 'knight'));
        result.push(new piece(7, 7, typeD, 'rook'));
        return result;
    }
    ////////////////////////////////////
    pieces = addPieceToClass();
    ////////////////////////////////////
    for (let piece of pieces) {//For that adds piece images by the piece class
        piece.addImage();
    }
    ////////////////////////////////////
    let lastP;
    let whiteTurn = true;
    function HClick(e) {//Click event 
        if (e.currentTarget.style.backgroundColor != 'green' && e.currentTarget.hasChildNodes()) {//if cell is not green or has img
            if (e.currentTarget.style.backgroundColor !== 'red')
                e.currentTarget.style.backgroundColor = 'orange';
        }

        if (e.currentTarget.children[0] != undefined) {

            if (e.currentTarget.style.backgroundColor === 'red') {//red tiled paint for enemy
                let id = e.currentTarget.children[0].id;
                let p = pieces[id];
                lastP.cell = p.cell;
                if (p.pieceT == 'king') {
                    if (p.type == 'Dark')
                        mate('dark');
                    else if (p.type == 'White')
                        mate('white');
                }
                p.removeImage();
                lastP.updateColRowByCell();
                lastP.moveImage();
                boardColor();
                if (whiteTurn)
                    whiteTurn = false;
                else
                    whiteTurn = true;
            }
            if (e.currentTarget.style.backgroundColor === 'orange') {
                let id = e.currentTarget.children[0].id;
                let p = pieces[id];
                boardColor();
                e.currentTarget.style.backgroundColor = 'orange';
                pieceMovementOptions(p);
                lastP = p;
            }
        } else {
            if (e.currentTarget.style.backgroundColor === 'green') {//piece movement on green tiles 
                lastP.removeImage();
                lastP.cell = e.currentTarget;
                lastP.updateColRowByCell();
                lastP.moveImage();
                boardColor();
                if (whiteTurn)
                    whiteTurn = false;
                else
                    whiteTurn = true;
                if (lastP.firstMove)
                    lastP.changeFirstMove();
            }
        }
    }
    ////////////////////////////////////
    function pieceMovementOptions(p)//changes color of tiles compared to the piece chosen
    {
        let moves;
        if (p.pieceT === 'pawn')
            moves = p.getPawnMoves();
        ////////////////////////////////////
        else if (p.pieceT === 'knight')
            moves = p.getKnightMoves();
        ////////////////////////////////////
        else if (p.pieceT === 'rook')
            moves = p.getRookMoves();
        ////////////////////////////////////
        else if (p.pieceT == 'bishop')
            moves = p.getBishopMoves();
        ////////////////////////////////////
        else if (p.pieceT === 'queen')
            moves = p.getQueenMoves();
        ////////////////////////////////////
        else if (p.pieceT === 'king')
            moves = p.getKingMoves();
        if (moves !== undefined) {
            for (let i = 0; i < moves.length; i++) {
                moves[i].style.backgroundColor = "green";
            }
        }
    }
    ////////////////////////////////////
    function hasImgInCell(cell) {
        return cell.hasChildNodes();
    }
    ////////////////////////////////////
    function isEnemy(cell, type) {
        if (cell.hasChildNodes()) {
            let id = cell.children[0].id;
            let p = pieces[id];
            if (p.type !== type) {
                cell.style.backgroundColor = 'red';
                return true;
            } else
                return false;
        } else
            return false;
    }
    ////////////////////////////////////

    ////////////////////////////////////
    function takePieceFromCell(cell) {
        if (cell.children[0] != undefined) {
            let id = cell.children[0].id;
            let p = pieces[id];
            return p;
        }
    }
    ////////////////////////////////////
    function mate(str) {
        if (str === 'dark') {
            alert('White Won!')
        } else if (str === 'white') {
            alert('Black Won!');
        }
        location.reload();
    }
    ////////////////////////////////////
}

