
window.onload = () => {
    ////////////////////////////////////
    var h1 = document.createElement('h1');
    document.body.appendChild(h1);
    h1.innerText = 'Chess';
    var table = document.createElement('table');
    function createBoard(){//Creates the board       
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

            if (e.currentTarget.style.backgroundColor === 'red') {//red tiled paint for eating
                let id = e.currentTarget.children[0].id;
                let p = pieces[id];
                lastP.cell = p.cell;
                if (p.pieceT == 'king') {
                    if (p.type == 'Dark') {
                        mate('dark');
                    }
                    else if (p.type == 'White') {
                        mate('white');
                    }

                }
                p.removeImage();
                lastP.updateColRowByCell();
                lastP.moveImage();
                boardColor();
                if (whiteTurn) {
                    whiteTurn = false;
                } else {
                    whiteTurn = true;
                }
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
                if (whiteTurn) {
                    whiteTurn = false;
                } else {
                    whiteTurn = true;
                }
                if (lastP.firstMove) {
                    lastP.changeFirstMove();
                }
            }
        }
    }
    ////////////////////////////////////
    function pieceMovementOptions(p)//changes color of tiles compared to the piece chosen
    {
        if (p.pieceT == 'pawn' && p.type == 'White' && whiteTurn || p.pieceT == 'pawn' && p.type == 'Dark' && !whiteTurn) {
            let a = 1;
            if (p.type == 'Dark')
                a = -1;
            if (p.firstMove) {
                let hasPiece = false;
                for (let i = 1; i <= 2 && !hasPiece; i++) {
                    if (hasImgInCell(p.cellAdd(a * i, 0))) {
                        hasPiece = true;
                    } else {
                        p.cellAdd(a * i, 0).style.backgroundColor = 'green';
                    }
                }
            } else {
                if (!hasImgInCell(p.cellAdd(a, 0))) {
                    p.cellAdd(a, 0).style.backgroundColor = 'green';
                }
            }
            if (a == 1) {
                if ((p.row + 1) < 8 && (p.col + 1) < 8)
                    isEnemy(p.cellAdd(1, 1), p.type)
                if ((p.row + 1) < 8 && (p.col - 1) >= 0)
                    isEnemy(p.cellAdd(1, -1), p.type)
            } else {
                if ((p.row - 1) >= 0 && (p.col + 1) < 8)
                    isEnemy(p.cellAdd(-1, 1), p.type)
                if ((p.row - 1) >= 0 && (p.col - 1) >= 0)
                    isEnemy(p.cellAdd(-1, -1), p.type)
            }

        }
        ////////////////////////////////////
        else if (p.pieceT == 'rook' && p.type == 'White' && whiteTurn || p.pieceT == 'rook' && p.type == 'Dark' && !whiteTurn) {
            let hasPiece1 = 1;
            let hasPiece2 = 1;
            let hasPiece3 = 1;
            let hasPiece4 = 1;
            for (let i = 1; i < 8; i++) {
                if (p.row + i < 8) {
                    if (hasImgInCell(p.cellAdd(i, 0))) {
                        if (isEnemy(p.cellAdd(i * hasPiece1, 0), p.type))
                            hasPiece1 = 0;
                        else
                            hasPiece1 = 0;
                    } else
                        p.cellAdd(i * hasPiece1, 0).style.backgroundColor = 'green';
                }
                if (p.row - i >= 0) {
                    if (hasImgInCell(p.cellAdd(-i, 0))) {
                        if (isEnemy(p.cellAdd(-i * hasPiece2, 0), p.type))
                            hasPiece2 = 0;
                        else
                            hasPiece2 = 0;
                    } else
                        p.cellAdd(-i * hasPiece2, 0).style.backgroundColor = 'green';
                }
                if (p.col + i < 8) {
                    if (hasImgInCell(p.cellAdd(0, i))) {
                        if (isEnemy(p.cellAdd(0, i * hasPiece3), p.type))
                            hasPiece3 = 0;
                        else
                            hasPiece3 = 0;

                    } else
                        p.cellAdd(0, i * hasPiece3).style.backgroundColor = 'green';
                }
                if (p.col - i >= 0) {
                    if (hasImgInCell(p.cellAdd(0, -i))) {
                        if (isEnemy(p.cellAdd(0, -i * hasPiece4), p.type))
                            hasPiece4 = 0;
                        else
                            hasPiece4 = 0;
                    } else
                        p.cellAdd(0, -i * hasPiece4).style.backgroundColor = 'green';

                }
            }
        }
        ////////////////////////////////////
        else if (p.pieceT == 'knight' && p.type == 'White' && whiteTurn || p.pieceT == 'knight' && p.type == 'Dark' && !whiteTurn) {
            let a = 1;
            let b = 2;
            for (let i = 0; i < 4; i++) {
                if (p.row + b < 8 && p.col + a < 8 && p.row + b >= 0 && p.col + a >= 0) {
                    if (!hasImgInCell(p.cellAdd(b, a)))
                        p.cellAdd(b, a).style.backgroundColor = 'green';
                    else
                        isEnemy(p.cellAdd(b, a), p.type);
                }
                if (p.row + a < 8 && p.col + b < 8 && p.row + a >= 0 && p.col + b >= 0) {
                    if (!hasImgInCell(p.cellAdd(a, b)))
                        p.cellAdd(a, b).style.backgroundColor = 'green';
                    else
                        isEnemy(p.cellAdd(a, b), p.type);
                }
                if (i == 0)
                    a *= -1;//b=2 a=-1
                else if (i == 1)
                    b *= -1;//b=-2 a=-1
                else
                    a *= -1;//a=1 b=-2

            }
        }
        ////////////////////////////////////
        else if (p.pieceT == 'bishop' && p.type == 'White' && whiteTurn || p.pieceT == 'bishop' && p.type == 'Dark' && !whiteTurn) {
            let hasPiece1 = 1;
            let hasPiece2 = 1;
            let hasPiece3 = 1;
            let hasPiece4 = 1;
            for (let i = 1; i < 8; i++) {
                if (p.row + i < 8 && p.col + i < 8) {
                    if (hasImgInCell(p.cellAdd(i, i))) {
                        if (isEnemy(p.cellAdd(i * hasPiece1, i * hasPiece1), p.type))
                            hasPiece1 = 0;
                        else
                            hasPiece1 = 0;
                    } else
                        p.cellAdd(i * hasPiece1, i * hasPiece1).style.backgroundColor = 'green';
                }
                if (p.row - i >= 0 && p.col - i >= 0) {
                    if (hasImgInCell(p.cellAdd(-i, -i))) {
                        if (isEnemy(p.cellAdd(-i * hasPiece2, -i * hasPiece2), p.type))
                            hasPiece2 = 0;
                        else
                            hasPiece2 = 0;
                    } else
                        p.cellAdd(-i * hasPiece2, -i * hasPiece2).style.backgroundColor = 'green';
                }
                if (p.col + i < 8 && p.row - i >= 0) {
                    if (hasImgInCell(p.cellAdd(-i, i))) {
                        if (isEnemy(p.cellAdd(-i * hasPiece3, i * hasPiece3), p.type))
                            hasPiece3 = 0;
                        else
                            hasPiece3 = 0;

                    } else
                        p.cellAdd(-i * hasPiece3, i * hasPiece3).style.backgroundColor = 'green';
                }
                if (p.col - i >= 0 && p.row + i < 8) {
                    if (hasImgInCell(p.cellAdd(i, -i))) {
                        if (isEnemy(p.cellAdd(i * hasPiece4, -i * hasPiece4), p.type))
                            hasPiece4 = 0;
                        else
                            hasPiece4 = 0;

                    } else
                        p.cellAdd(i * hasPiece4, -i * hasPiece4).style.backgroundColor = 'green';
                }
            }
        }
        ////////////////////////////////////
        else if (p.pieceT == 'king' && p.type == 'White' && whiteTurn || p.pieceT == 'king' && p.type == 'Dark' && !whiteTurn) {
            let a=1;
            let b=1;
            for (let i = 0; i < 4; i++) {
                if (p.row + 1*a < 8 && p.col + 1*b < 8 && p.row + 1*a >= 0 && p.col + 1*b >=0) {
                    if (!hasImgInCell(p.cellAdd(1*a, 1*b))) {
                        p.cellAdd(1*a, 1*b).style.backgroundColor = 'green';
                    } else
                        isEnemy(p.cellAdd(1*a, 1*b), p.type)

                    if (!hasImgInCell(p.cellAdd(0, 1*b))) {
                        p.cellAdd(0, 1*b).style.backgroundColor = 'green';
                    } else
                        isEnemy(p.cellAdd(0, 1*b), p.type)

                    if (!hasImgInCell(p.cellAdd(1*a, 0))) {
                        p.cellAdd(1*a, 0).style.backgroundColor = 'green';
                    } else                      
                    isEnemy(p.cellAdd(1*a, 0), p.type)
                }
                if (p.row + 1*b < 8 && p.col + 1*a < 8 && p.row + 1*b >= 0 && p.col + 1*a >=0) {
                    if (!hasImgInCell(p.cellAdd(1*b, 1*a))) {
                        p.cellAdd(1*b, 1*a).style.backgroundColor = 'green';
                    } else
                        isEnemy(p.cellAdd(1*b, 1*a), p.type)

                    if (!hasImgInCell(p.cellAdd(0, 1*a))) {
                        p.cellAdd(0, 1*a).style.backgroundColor = 'green';
                    } else
                        isEnemy(p.cellAdd(0, 1*a), p.type)

                    if (!hasImgInCell(p.cellAdd(1*b, 0))) {
                        p.cellAdd(1*b, 0).style.backgroundColor = 'green';
                    } else
                        isEnemy(p.cellAdd(1*b, 0), p.type)
                }
                if(i==0){
                    a*=-1;//a=-1 b=1
                }else if(i==1){
                    b*=-1;//a=-1 b=-1
                }else if(i==2){
                    a*=-1;//a=1 b=-1
                }
            }
        }
        ////////////////////////////////////
        else if (p.pieceT == 'queen' && p.type == 'White' && whiteTurn || p.pieceT == 'queen' && p.type == 'Dark' && !whiteTurn) {
            let hasPiece1 = 1;
            let hasPiece2 = 1;
            let hasPiece3 = 1;
            let hasPiece4 = 1;
            for (let i = 1; i < 8; i++) {
                if (p.row + i < 8) {
                    if (hasImgInCell(p.cellAdd(i, 0))) {
                        if (isEnemy(p.cellAdd(i * hasPiece1, 0), p.type))
                            hasPiece1 = 0;
                        else
                            hasPiece1 = 0;
                    } else
                        p.cellAdd(i * hasPiece1, 0).style.backgroundColor = 'green';
                }
                if (p.row - i >= 0) {
                    if (hasImgInCell(p.cellAdd(-i, 0))) {
                        if (isEnemy(p.cellAdd(-i * hasPiece2, 0), p.type))
                            hasPiece2 = 0;
                        else
                            hasPiece2 = 0;
                    } else
                        p.cellAdd(-i * hasPiece2, 0).style.backgroundColor = 'green';
                }
                if (p.col + i < 8) {
                    if (hasImgInCell(p.cellAdd(0, i))) {
                        if (isEnemy(p.cellAdd(0, i * hasPiece3), p.type))
                            hasPiece3 = 0;
                        else
                            hasPiece3 = 0;

                    } else
                        p.cellAdd(0, i * hasPiece3).style.backgroundColor = 'green';
                }
                if (p.col - i >= 0) {
                    if (hasImgInCell(p.cellAdd(0, -i))) {
                        if (isEnemy(p.cellAdd(0, -i * hasPiece4), p.type))
                            hasPiece4 = 0;
                        else
                            hasPiece4 = 0;
                    } else
                        p.cellAdd(0, -i * hasPiece4).style.backgroundColor = 'green';

                }
            }
            hasPiece1 = 1;
            hasPiece2 = 1;
            hasPiece3 = 1;
            hasPiece4 = 1;
            for (let i = 1; i < 8; i++) {
                if (p.row + i < 8 && p.col + i < 8) {
                    if (hasImgInCell(p.cellAdd(i, i))) {
                        if (isEnemy(p.cellAdd(i * hasPiece1, i * hasPiece1), p.type))
                            hasPiece1 = 0;
                        else
                            hasPiece1 = 0;
                    } else
                        p.cellAdd(i * hasPiece1, i * hasPiece1).style.backgroundColor = 'green';
                }
                if (p.row - i >= 0 && p.col - i >= 0) {
                    if (hasImgInCell(p.cellAdd(-i, -i))) {
                        if (isEnemy(p.cellAdd(-i * hasPiece2, -i * hasPiece2), p.type))
                            hasPiece2 = 0;
                        else
                            hasPiece2 = 0;
                    } else
                        p.cellAdd(-i * hasPiece2, -i * hasPiece2).style.backgroundColor = 'green';
                }
                if (p.col + i < 8 && p.row - i >= 0) {
                    if (hasImgInCell(p.cellAdd(-i, i))) {
                        if (isEnemy(p.cellAdd(-i * hasPiece3, i * hasPiece3), p.type))
                            hasPiece3 = 0;
                        else
                            hasPiece3 = 0;

                    } else
                        p.cellAdd(-i * hasPiece3, i * hasPiece3).style.backgroundColor = 'green';
                }
                if (p.col - i >= 0 && p.row + i < 8) {
                    if (hasImgInCell(p.cellAdd(i, -i))) {
                        if (isEnemy(p.cellAdd(i * hasPiece4, -i * hasPiece4), p.type))
                            hasPiece4 = 0;
                        else
                            hasPiece4 = 0;

                    } else
                        p.cellAdd(i * hasPiece4, -i * hasPiece4).style.backgroundColor = 'green';
                }
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
    {
        // function check() {
        //     let wKing = pieces[4];
        //     let dKing = pieces[28];
        //     if (takePieceFromCell(wKing.cellAdd(1,1)).pieceT == 'pawn' || takePieceFromCell(wKing.cellAdd(1,-1)).pieceT == 'pawn') {
        //         checkAnimation('White');
        //     }
        //     if (takePieceFromCell(dKing.cellAdd(-1,1)).pieceT == 'pawn' || takePieceFromCell(dKing.cellAdd(-1,-1)).pieceT == 'pawn') {
        //         checkAnimation('Dark');
        //     }
        //     if(cimetrickCheck(wKing, 'White')){
        //         checkAnimation('White');
        //     }
        //     if(cimetrickCheck(dKing, 'Dark')){
        //         checkAnimation('Dark');
        //     }

        // }
        // function cimetrickCheck(king, type){
        //     let a =1;
        //     let b =2;
        //     for(let i = 0; i<2;i++){//knight
        //         if(takePieceFromCell(king.cellAdd(a,b)).pieceT == 'knight' && takePieceFromCell(king.cellAdd(a,b)).type !== type){
        //             return true;
        //         }
        //         else if(takePieceFromCell(king.cellAdd(b,a)).pieceT == 'knight' && takePieceFromCell(king.cellAdd(b,a)).type !== type){
        //             return true;
        //         }
        //         else if(takePieceFromCell(king.cellAdd(-a,-b)).pieceT == 'knight' && takePieceFromCell(king.cellAdd(-b,-a)).type !== type){
        //             return true;
        //         }
        //         else if(takePieceFromCell(king.cellAdd(-b,-a)).pieceT == 'knight' && takePieceFromCell(king.cellAdd(-b,-a)).type !== type){
        //             return true;
        //         }
        //         a=-1;
        //     }
        //     for(let i=1;i<(8-king.row);i++){
        //         if(takePieceFromCell(king.cellAdd(i,0)).pieceT == 'rook' && )
        //     }

        // }
        //check
        ////////////////////////////////////
        // function checkAnimation(type) {
        //     console.log(type + 'check');
        // }
    }//check
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

