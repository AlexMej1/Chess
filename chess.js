
window.onload = () => {
    ////////////////////////////////////
    {//Creates the board
        var table = document.createElement('table');
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
        if (e.currentTarget.style.backgroundColor != 'rgb(153, 182, 95)' && e.currentTarget.hasChildNodes()) {//if cell is not green or has img
            if (e.currentTarget.style.backgroundColor !== 'red')
                e.currentTarget.style.backgroundColor = 'orange';
        }

        if (e.currentTarget.children[0] != undefined) {
            if (e.currentTarget.style.backgroundColor === 'red') {//red tiled paint for eating
                let id = e.currentTarget.children[0].id;
                let p = pieces[id];
                lastP.cell = p.cell;
                p.removeImage();
                lastP.updateColRowByCell();
                console.log(lastP);
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
            if (e.currentTarget.style.backgroundColor === 'rgb(153, 182, 95)') {//piece movement on green tiles 
                lastP.removeImage();
                lastP.cell = e.currentTarget;
                lastP.updateColRowByCell();
                console.log(lastP);
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

        if (p.pieceT == 'pawn' && p.type == 'White' && whiteTurn) {
            if (p.firstMove) {
                let hasPiece = false;
                for (let i = 1; i <= 2 && !hasPiece; i++) {
                    if (hasImgInCell(table.rows[((p.row) + i)].cells[(p.col)])) {
                        hasPiece = true;
                    } else {
                        table.rows[((p.row) + i)].cells[(p.col)].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            } else {
                if (!hasImgInCell(table.rows[((p.row) + 1)].cells[(p.col)])) {
                    table.rows[((p.row) + 1)].cells[(p.col)].style.backgroundColor = 'rgb(153, 182, 95)';
                }
            }
            if ((p.row + 1) < 8 && (p.col + 1) < 8) {
                isEnemy(table.rows[p.row + 1].cells[p.col + 1], p.type)
            }
            if ((p.row + 1) >= 0 && (p.col - 1) >= 0) {
                isEnemy(table.rows[p.row + 1].cells[p.col - 1], p.type)
            }
        }

        ////////////////////////////////////
        else if (p.pieceT == 'rook' && p.type == 'White' && whiteTurn) {
            let hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row + i < 8) {
                    if (hasImgInCell(table.rows[p.row + i].cells[p.col])) {
                        if (isEnemy(table.rows[p.row + i].cells[p.col], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row + i].cells[p.col].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row - i >= 0) {
                    if (hasImgInCell(table.rows[(p.row) - i].cells[(p.col)])) {
                        if (isEnemy(table.rows[(p.row) - i].cells[(p.col)], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[((p.row) - i)].cells[(p.col)].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.col + i < 8) {
                    if (hasImgInCell(table.rows[p.row].cells[p.col + i])) {
                        if (isEnemy(table.rows[p.row].cells[p.col + i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row].cells[p.col + i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.col - i >= 0) {
                    if (hasImgInCell(table.rows[p.row].cells[(p.col - i)])) {
                        if (isEnemy(table.rows[p.row].cells[(p.col - i)], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row].cells[p.col - i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }

                }
            }

        }
        ////////////////////////////////////
        else if (p.pieceT == 'knight' && p.type == 'White' && whiteTurn) {
            if (p.row + 2 < 8 && p.col + 1 < 8) {
                if (!hasImgInCell(table.rows[p.row + 2].cells[p.col + 1])) {
                    table.rows[p.row + 2].cells[p.col + 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 2].cells[p.col + 1], p.type);
            }
            if (p.row - 2 >= 0 && p.col - 1 >= 0) {
                if (!hasImgInCell(table.rows[p.row - 2].cells[p.col - 1])) {
                    table.rows[p.row - 2].cells[p.col - 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 2].cells[p.col - 1], p.type);
            }
            if (p.row + 2 < 8 && p.col - 1 >= 0) {
                if (!hasImgInCell(table.rows[p.row + 2].cells[p.col - 1])) {
                    table.rows[p.row + 2].cells[p.col - 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 2].cells[p.col - 1], p.type);
            }
            if (p.row - 2 >= 0 && p.col + 1 < 8) {
                if (!hasImgInCell(table.rows[p.row - 2].cells[p.col + 1])) {
                    table.rows[p.row - 2].cells[p.col + 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 2].cells[p.col + 1], p.type);
            }
            if (p.row + 1 < 8 && p.col + 2 < 8) {
                if (!hasImgInCell(table.rows[p.row + 1].cells[p.col + 2])) {
                    table.rows[p.row + 1].cells[p.col + 2].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 1].cells[p.col + 2], p.type);
            }
            if (p.row - 1 >= 0 && p.col - 2 >= 0) {
                if (!hasImgInCell(table.rows[p.row - 1].cells[p.col - 2])) {
                    table.rows[p.row - 1].cells[p.col - 2].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 1].cells[p.col - 2], p.type);
            }
            if (p.row - 1 >= 0 && p.col + 2 < 8) {
                if (!hasImgInCell(table.rows[p.row - 1].cells[p.col + 2])) {
                    table.rows[p.row - 1].cells[p.col + 2].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 1].cells[p.col + 2], p.type);
            }
            if (p.row + 1 < 8 && p.col - 2 >= 0) {
                if (!hasImgInCell(table.rows[p.row + 1].cells[p.col - 2])) {
                    table.rows[p.row + 1].cells[p.col - 2].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 1].cells[p.col - 2], p.type);
            }
        }

        ////////////////////////////////////
        else if (p.pieceT == 'bishop' && p.type == 'White' && whiteTurn) {
            let hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row + i < 8 && p.col + i < 8) {
                    if (hasImgInCell(table.rows[p.row + i].cells[p.col + i])) {
                        if (isEnemy(table.rows[p.row + i].cells[p.col + i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row + i].cells[p.col + i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row - i >= 0 && p.col - i >= 0) {
                    if (hasImgInCell(table.rows[p.row - i].cells[p.col - i])) {
                        if (isEnemy(table.rows[p.row - i].cells[p.col - i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row - i].cells[p.col - i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row - i >= 0 && p.col + i < 8) {
                    if (hasImgInCell(table.rows[p.row - i].cells[p.col + i])) {
                        if (isEnemy(table.rows[p.row - i].cells[p.col + i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row - i].cells[p.col + i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row + i < 8 && p.col - i >= 0) {
                    if (hasImgInCell(table.rows[p.row + i].cells[p.col - i])) {
                        if (isEnemy(table.rows[p.row + i].cells[p.col - i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row + i].cells[p.col - i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
        }

        ////////////////////////////////////
        else if (p.pieceT == 'king' && p.type == 'White' && whiteTurn) {
            if (p.row + 1 < 8 && p.col + 1 < 8) {
                if (!hasImgInCell(table.rows[p.row + 1].cells[p.col + 1])) {
                    table.rows[p.row + 1].cells[p.col + 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 1].cells[p.col + 1], p.type)

                if (!hasImgInCell(table.rows[p.row].cells[p.col + 1])) {
                    table.rows[p.row].cells[p.col + 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row].cells[p.col + 1], p.type)

                if (!hasImgInCell(table.rows[p.row + 1].cells[p.col])) {
                    table.rows[p.row + 1].cells[p.col].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 1].cells[p.col], p.type)

            }
            if (p.row - 1 > -1 && p.col - 1 > -1) {
                if (!hasImgInCell(table.rows[p.row - 1].cells[p.col - 1])) {
                    table.rows[p.row - 1].cells[p.col - 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 1].cells[p.col - 1], p.type)

                if (!hasImgInCell(table.rows[p.row].cells[p.col - 1])) {
                    table.rows[p.row].cells[p.col - 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row].cells[p.col - 1], p.type)

                if (!hasImgInCell(table.rows[p.row - 1].cells[p.col])) {
                    table.rows[p.row - 1].cells[p.col].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 1].cells[p.col], p.type)

            }
            if (p.row + 1 < 8 && p.col - 1 > -1) {
                if (!hasImgInCell(table.rows[p.row + 1].cells[p.col - 1])) {
                    table.rows[p.row + 1].cells[p.col - 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 1].cells[p.col - 1], p.type)

                if (!hasImgInCell(table.rows[p.row].cells[p.col - 1])) {
                    table.rows[p.row].cells[p.col - 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row].cells[p.col - 1], p.type)

                if (!hasImgInCell(table.rows[p.row + 1].cells[p.col])) {
                    table.rows[p.row + 1].cells[p.col].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 1].cells[p.col], p.type)
            }
            if (p.row - 1 > -1 && p.col + 1 < 8) {
                if (!hasImgInCell(table.rows[p.row - 1].cells[p.col + 1])) {
                    table.rows[p.row - 1].cells[p.col + 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 1].cells[p.col + 1], p.type)

                if (!hasImgInCell(table.rows[p.row].cells[p.col + 1])) {
                    table.rows[p.row].cells[p.col + 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row].cells[p.col + 1], p.type)

                if (!hasImgInCell(table.rows[p.row - 1].cells[p.col])) {
                    table.rows[p.row - 1].cells[p.col].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 1].cells[p.col], p.type)
            }

        }

        ////////////////////////////////////
        else if (p.pieceT == 'queen' && p.type == 'White' && whiteTurn) {
            let hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row + i < 8 && p.col + i < 8) {
                    if (hasImgInCell(table.rows[p.row + i].cells[p.col + i])) {
                        if (isEnemy(table.rows[p.row + i].cells[p.col + i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row + i].cells[p.col + i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row - i >= 0 && p.col - i >= 0) {
                    if (hasImgInCell(table.rows[p.row - i].cells[p.col - i])) {
                        if (isEnemy(table.rows[p.row - i].cells[p.col - i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row - i].cells[p.col - i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row - i >= 0 && p.col + i < 8) {
                    if (hasImgInCell(table.rows[p.row - i].cells[p.col + i])) {
                        if (isEnemy(table.rows[p.row - i].cells[p.col + i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row - i].cells[p.col + i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row + i < 8 && p.col - i >= 0) {
                    if (hasImgInCell(table.rows[p.row + i].cells[p.col - i])) {
                        if (isEnemy(table.rows[p.row + i].cells[p.col - i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row + i].cells[p.col - i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }


            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row + i < 8) {
                    if (hasImgInCell(table.rows[p.row + i].cells[p.col])) {
                        if (isEnemy(table.rows[p.row + i].cells[p.col], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row + i].cells[p.col].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row - i >= 0) {
                    if (hasImgInCell(table.rows[(p.row) - i].cells[(p.col)])) {
                        if (isEnemy(table.rows[(p.row) - i].cells[(p.col)], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[((p.row) - i)].cells[(p.col)].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.col + i < 8) {
                    if (hasImgInCell(table.rows[p.row].cells[p.col + i])) {
                        if (isEnemy(table.rows[p.row].cells[p.col + i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row].cells[p.col + i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.col - i >= 0) {
                    if (hasImgInCell(table.rows[p.row].cells[(p.col - i)])) {
                        if (isEnemy(table.rows[p.row].cells[(p.col - i)], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row].cells[p.col - i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }

                }
            }
        }

        ////////////////////////////////////
        else if (p.pieceT == 'pawn' && p.type == 'Dark' && !whiteTurn) {
            if (p.firstMove) {
                let hasPiece = false;
                for (let i = 1; i <= 2 && !hasPiece; i++) {
                    if (table.rows[((p.row) - i)].cells[(p.col)].hasChildNodes()) {
                        hasPiece = true;
                    } else {
                        table.rows[((p.row) - i)].cells[(p.col)].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            } else {
                if (!table.rows[((p.row) - 1)].cells[(p.col)].hasChildNodes()) {
                    table.rows[((p.row) - 1)].cells[(p.col)].style.backgroundColor = 'rgb(153, 182, 95)';
                }
            }
            if ((p.row - 1) >= 0 && (p.col + 1) < 8) {
                console.log('entered');
                isEnemy(table.rows[p.row - 1].cells[p.col + 1], p.type)
            }
            if ((p.row - 1) >= 0 && (p.col - 1) >= 0) {

                isEnemy(table.rows[p.row - 1].cells[p.col - 1], p.type)
            }
        }

        ////////////////////////////////////
        else if (p.pieceT == 'rook' && p.type == 'Dark' && !whiteTurn) {
            let hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row + i < 8) {
                    if (hasImgInCell(table.rows[p.row + i].cells[p.col])) {
                        if (isEnemy(table.rows[p.row + i].cells[p.col], p.type)) {
                            table.rows[p.row + i].cells[p.col].style.backgroundColor = 'red';
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row + i].cells[p.col].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row - i >= 0) {
                    if (hasImgInCell(table.rows[(p.row) - i].cells[(p.col)])) {
                        if (isEnemy(table.rows[(p.row) - i].cells[(p.col)], p.type)) {
                            table.rows[((p.row) - i)].cells[(p.col)].style.backgroundColor = 'red';
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[((p.row) - i)].cells[(p.col)].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.col + i < 8) {
                    if (hasImgInCell(table.rows[p.row].cells[p.col + i])) {
                        if (isEnemy(table.rows[p.row].cells[p.col + i], p.type)) {
                            table.rows[p.row].cells[p.col + i].style.backgroundColor = 'red';
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row].cells[p.col + i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.col - i >= 0) {
                    if (hasImgInCell(table.rows[p.row].cells[(p.col - i)])) {
                        if (isEnemy(table.rows[p.row].cells[(p.col - i)], p.type)) {
                            table.rows[p.row].cells[p.col - i].style.backgroundColor = 'red';
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row].cells[p.col - i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }

                }
            }

        }

        ////////////////////////////////////
        else if (p.pieceT == 'knight' && p.type == 'Dark' && !whiteTurn) {
            if (p.row + 2 < 8 && p.col + 1 < 8) {
                if (!hasImgInCell(table.rows[p.row + 2].cells[p.col + 1])) {
                    table.rows[p.row + 2].cells[p.col + 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 2].cells[p.col + 1], p.type);
            }
            if (p.row - 2 >= 0 && p.col - 1 >= 0) {
                if (!hasImgInCell(table.rows[p.row - 2].cells[p.col - 1])) {
                    table.rows[p.row - 2].cells[p.col - 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 2].cells[p.col - 1], p.type);
            }
            if (p.row + 2 < 8 && p.col - 1 >= 0) {
                if (!hasImgInCell(table.rows[p.row + 2].cells[p.col - 1])) {
                    table.rows[p.row + 2].cells[p.col - 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 2].cells[p.col - 1], p.type);
            }
            if (p.row - 2 >= 0 && p.col + 1 < 8) {
                if (!hasImgInCell(table.rows[p.row - 2].cells[p.col + 1])) {
                    table.rows[p.row - 2].cells[p.col + 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 2].cells[p.col + 1], p.type);
            }
            if (p.row + 1 < 8 && p.col + 2 < 8) {
                if (!hasImgInCell(table.rows[p.row + 1].cells[p.col + 2])) {
                    table.rows[p.row + 1].cells[p.col + 2].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 1].cells[p.col + 2], p.type);
            }
            if (p.row - 1 >= 0 && p.col - 2 >= 0) {
                if (!hasImgInCell(table.rows[p.row - 1].cells[p.col - 2])) {
                    table.rows[p.row - 1].cells[p.col - 2].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 1].cells[p.col - 2], p.type);
            }
            if (p.row - 1 >= 0 && p.col + 2 < 8) {
                if (!hasImgInCell(table.rows[p.row - 1].cells[p.col + 2])) {
                    table.rows[p.row - 1].cells[p.col + 2].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 1].cells[p.col + 2], p.type);
            }
            if (p.row + 1 < 8 && p.col - 2 >= 0) {
                if (!hasImgInCell(table.rows[p.row + 1].cells[p.col - 2])) {
                    table.rows[p.row + 1].cells[p.col - 2].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 1].cells[p.col - 2], p.type);
            }
        }

        ////////////////////////////////////
        else if (p.pieceT == 'bishop' && p.type == 'Dark' && !whiteTurn) {
            let hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row + i < 8 && p.col + i < 8) {
                    if (hasImgInCell(table.rows[p.row + i].cells[p.col + i])) {
                        if (isEnemy(table.rows[p.row + i].cells[p.col + i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row + i].cells[p.col + i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row - i >= 0 && p.col - i >= 0) {
                    if (hasImgInCell(table.rows[p.row - i].cells[p.col - i])) {
                        if (isEnemy(table.rows[p.row - i].cells[p.col - i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row - i].cells[p.col - i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row - i >= 0 && p.col + i < 8) {
                    if (hasImgInCell(table.rows[p.row - i].cells[p.col + i])) {
                        if (isEnemy(table.rows[p.row - i].cells[p.col + i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row - i].cells[p.col + i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row + i < 8 && p.col - i >= 0) {
                    if (hasImgInCell(table.rows[p.row + i].cells[p.col - i])) {
                        if (isEnemy(table.rows[p.row + i].cells[p.col - i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row + i].cells[p.col - i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
        }

        ////////////////////////////////////
        else if (p.pieceT == 'king' && p.type == 'Dark' && !whiteTurn) {
            if (p.row + 1 < 8 && p.col + 1 < 8) {
                if (!hasImgInCell(table.rows[p.row + 1].cells[p.col + 1])) {
                    table.rows[p.row + 1].cells[p.col + 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 1].cells[p.col + 1], p.type)

                if (!hasImgInCell(table.rows[p.row].cells[p.col + 1])) {
                    table.rows[p.row].cells[p.col + 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row].cells[p.col + 1], p.type)

                if (!hasImgInCell(table.rows[p.row + 1].cells[p.col])) {
                    table.rows[p.row + 1].cells[p.col].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 1].cells[p.col], p.type)

            }
            if (p.row - 1 > -1 && p.col - 1 > -1) {
                if (!hasImgInCell(table.rows[p.row - 1].cells[p.col - 1])) {
                    table.rows[p.row - 1].cells[p.col - 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 1].cells[p.col - 1], p.type)

                if (!hasImgInCell(table.rows[p.row].cells[p.col - 1])) {
                    table.rows[p.row].cells[p.col - 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row].cells[p.col - 1], p.type)

                if (!hasImgInCell(table.rows[p.row - 1].cells[p.col])) {
                    table.rows[p.row - 1].cells[p.col].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 1].cells[p.col], p.type)

            }
            if (p.row + 1 < 8 && p.col - 1 > -1) {
                if (!hasImgInCell(table.rows[p.row + 1].cells[p.col - 1])) {
                    table.rows[p.row + 1].cells[p.col - 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 1].cells[p.col - 1], p.type)

                if (!hasImgInCell(table.rows[p.row].cells[p.col - 1])) {
                    table.rows[p.row].cells[p.col - 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row].cells[p.col - 1], p.type)

                if (!hasImgInCell(table.rows[p.row + 1].cells[p.col])) {
                    table.rows[p.row + 1].cells[p.col].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row + 1].cells[p.col], p.type)
            }
            if (p.row - 1 > -1 && p.col + 1 < 8) {
                if (!hasImgInCell(table.rows[p.row - 1].cells[p.col + 1])) {
                    table.rows[p.row - 1].cells[p.col + 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 1].cells[p.col + 1], p.type)

                if (!hasImgInCell(table.rows[p.row].cells[p.col + 1])) {
                    table.rows[p.row].cells[p.col + 1].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row].cells[p.col + 1], p.type)

                if (!hasImgInCell(table.rows[p.row - 1].cells[p.col])) {
                    table.rows[p.row - 1].cells[p.col].style.backgroundColor = 'rgb(153, 182, 95)';
                } else
                    isEnemy(table.rows[p.row - 1].cells[p.col], p.type)
            }
        }

        ////////////////////////////////////
        else if (p.pieceT == 'queen' && p.type == 'Dark' && !whiteTurn) {
            let hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row + i < 8 && p.col + i < 8) {
                    if (hasImgInCell(table.rows[p.row + i].cells[p.col + i])) {
                        if (isEnemy(table.rows[p.row + i].cells[p.col + i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row + i].cells[p.col + i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row - i >= 0 && p.col - i >= 0) {
                    if (hasImgInCell(table.rows[p.row - i].cells[p.col - i])) {
                        if (isEnemy(table.rows[p.row - i].cells[p.col - i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row - i].cells[p.col - i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row - i >= 0 && p.col + i < 8) {
                    if (hasImgInCell(table.rows[p.row - i].cells[p.col + i])) {
                        if (isEnemy(table.rows[p.row - i].cells[p.col + i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row - i].cells[p.col + i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row + i < 8 && p.col - i >= 0) {
                    if (hasImgInCell(table.rows[p.row + i].cells[p.col - i])) {
                        if (isEnemy(table.rows[p.row + i].cells[p.col - i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row + i].cells[p.col - i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }


            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row + i < 8) {
                    if (hasImgInCell(table.rows[p.row + i].cells[p.col])) {
                        if (isEnemy(table.rows[p.row + i].cells[p.col], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row + i].cells[p.col].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.row - i >= 0) {
                    if (hasImgInCell(table.rows[(p.row) - i].cells[(p.col)])) {
                        if (isEnemy(table.rows[(p.row) - i].cells[(p.col)], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[((p.row) - i)].cells[(p.col)].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.col + i < 8) {
                    if (hasImgInCell(table.rows[p.row].cells[p.col + i])) {
                        if (isEnemy(table.rows[p.row].cells[p.col + i], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row].cells[p.col + i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }
                }
            }
            hasPiece = false;
            for (let i = 1; i < 8 && !hasPiece; i++) {
                if (p.col - i >= 0) {
                    if (hasImgInCell(table.rows[p.row].cells[(p.col - i)])) {
                        if (isEnemy(table.rows[p.row].cells[(p.col - i)], p.type)) {
                            hasPiece = true;
                        } else {
                            hasPiece = true;
                        }
                    } else {
                        table.rows[p.row].cells[p.col - i].style.backgroundColor = 'rgb(153, 182, 95)';
                    }

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
}

