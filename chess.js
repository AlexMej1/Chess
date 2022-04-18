
window.onload = () => 
{
////////////////////////////////////
{//Creation of the table and the cells with coloring
    var table = document.createElement('table');
    table.classList.add('table-container'); 
    const body = document.querySelector('body');         
    body.appendChild(table);  
    for(let i=0; i<8; i++){
        const row = table.insertRow(i);
        for(let j=0; j<8; j++){
            cell = row.insertCell();
            cell.id= i.toString() + '.' + j.toString();
            cell.addEventListener('click', HClick);             
        }
    }  
    BoardColor();
} 
////////////////////////////////////
    let typeW='White';
    let typeD='Dark';
    let pieces=[];
////////////////////////////////////
    class piece{//Class of the chess pieces
        constructor(row, col, type, pieceT,img){
            this.row=row;
            this.col=col;
            this.type=type;
            this.pieceT=pieceT;
        }
    }
////////////////////////////////////
    function arrOfPiece(){//Makes the array of pieces
        let result=[];
        result.push(new piece(0, 0, typeW, 'rook'));
        result.push(new piece(0, 1, typeW, 'knight'));
        result.push(new piece(0, 2, typeW, 'bishop'));
        result.push(new piece(0, 3, typeW, 'queen'));
        result.push(new piece(0, 4, typeW, 'king'));
        result.push(new piece(0, 5, typeW, 'bishop'));
        result.push(new piece(0, 6, typeW, 'knight'));
        result.push(new piece(0, 7, typeW, 'rook'));
        for(let i=0; i<8;i++){
            result.push(new piece(1, i, typeW, 'pawn'));
        }
        for(let i=0; i<8;i++){
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
    let imgIndex=0;
////////////////////////////////////    
    function AddImage(type, piece ,cell){//Func that adds piece images
        const img=document.createElement('img');
        img.src='images/' + type + piece + '.png';
        img.id=imgIndex;
        imgIndex++;
        cell.appendChild(img);
        img.classList.add('heroImg');
    }
////////////////////////////////////
    let lastCell;//Last cell for click event
////////////////////////////////////
    function HClick(e){//Click event
        BoardColor();
        e.currentTarget.style.backgroundColor='rgb(153, 182, 95)';
        pieceMovement(e);
        
    }
////////////////////////////////////
    function BoardColor(){//Adds tile colors
        for(let i= 0; i<8 ; i++){
            for(let j= 0; j<8 ; j++){
                if((i + j) % 2===0){
                    // table.rows[i].cells[j].classList.add('darkTyped');
                    table.rows[i].cells[j].style.backgroundColor='brown';
                }
                else{
                    // table.rows[i].cells[j].classList.add('whiteTyped');
                    table.rows[i].cells[j].style.backgroundColor='wheat';
                }
            }
        }       
    }
////////////////////////////////////
    pieces=arrOfPiece();
////////////////////////////////////
    for (let piece of pieces) {//For that adds piece images by the piece class
    AddImage(piece.type, piece.pieceT, table.rows[piece.row].cells[piece.col]);
    }
////////////////////////////////////
    function pieceMovement(e)//changes color of tiles compared to the piece chosen
    {
        let id = e.currentTarget.children[0].id;
        let p=pieces[id];
        if(p.pieceT=='pawn'&&p.type=='White'){
            table.rows[((p.row)+1)].cells[(p.col)].style.backgroundColor='rgb(153, 182, 95)';
            table.rows[((p.row)+2)].cells[(p.col)].style.backgroundColor='rgb(153, 182, 95)';
        }
        else if(p.pieceT=='pawn'&&p.type=='Dark'){
            table.rows[((p.row)-1)].cells[(p.col)].style.backgroundColor='rgb(153, 182, 95)';
            table.rows[((p.row)-2)].cells[(p.col)].style.backgroundColor='rgb(153, 182, 95)';
        }
        else if(p.pieceT=='rook'){
            for(let i=1; i<8; i++){
                if(p.row+i<8){
                    table.rows[((p.row)+i)].cells[(p.col)].style.backgroundColor='rgb(153, 182, 95)';
                }
                if(p.row-i>-1){
                    table.rows[p.row-i].cells[p.col].style.backgroundColor='rgb(153, 182, 95)';
                }
            }
            for(let i=1; i<8; i++){
                if(p.col+i<8){
                    table.rows[p.row].cells[p.col+i].style.backgroundColor='rgb(153, 182, 95)';
                }
                if(p.col-i>-1){
                    table.rows[p.row].cells[p.col-i].style.backgroundColor='rgb(153, 182, 95)';
                }
            }
        }
        else if(p.pieceT=='knight'){
            if(p.row+2<8&&p.col+1<8){
                table.rows[p.row+2].cells[p.col+1].style.backgroundColor='rgb(153, 182, 95)';
            }         
            if(p.row-2>=0&&p.col-1>=0){
                table.rows[p.row-2].cells[p.col-1].style.backgroundColor='rgb(153, 182, 95)';
            }     
            if(p.row+2<8&&p.col-1>=0){
                table.rows[p.row+2].cells[p.col-1].style.backgroundColor='rgb(153, 182, 95)';
            } 
            if(p.row-2>=0&&p.col+1<8){
                table.rows[p.row-2].cells[p.col+1].style.backgroundColor='rgb(153, 182, 95)';
            }  // 
            if(p.row+1<8&&p.col+2<8){
                table.rows[p.row+1].cells[p.col+2].style.backgroundColor='rgb(153, 182, 95)';
            }         
            if(p.row-1>=0&&p.col-2>=0){
                table.rows[p.row-1].cells[p.col-2].style.backgroundColor='rgb(153, 182, 95)';
            }     
            if(p.row+1<8&&p.col-2>=0){
                table.rows[p.row+1].cells[p.col-2].style.backgroundColor='rgb(153, 182, 95)';
            } 
            if(p.row-1>=0&&p.col+2<8){
                table.rows[p.row-1].cells[p.col+2].style.backgroundColor='rgb(153, 182, 95)';
            }   
        }
        else if(p.pieceT=='bishop'){
            for(let i=1; i<8; i++){
                if(p.row+i<8&&p.col+i<8){
                    table.rows[((p.row)+i)].cells[(p.col+i)].style.backgroundColor='rgb(153, 182, 95)';
                }
                if(p.row-i>-1&&p.col-i>-1){
                    table.rows[p.row-i].cells[p.col-i].style.backgroundColor='rgb(153, 182, 95)';
                }
                if(p.row-i>-1&&p.col+i<8){
                    table.rows[((p.row)-i)].cells[(p.col+i)].style.backgroundColor='rgb(153, 182, 95)';
                }
                if(p.row+i<8&&p.col-i>-1){
                    table.rows[p.row+i].cells[p.col-i].style.backgroundColor='rgb(153, 182, 95)';
                }
            }
        }
        else if(p.pieceT=='king'){
            if(p.row+1<8&&p.col+1<8){
                table.rows[p.row+1].cells[p.col+1].style.backgroundColor='rgb(153, 182, 95)';
                table.rows[p.row].cells[p.col+1].style.backgroundColor='rgb(153, 182, 95)';
                table.rows[p.row+1].cells[p.col].style.backgroundColor='rgb(153, 182, 95)';
            }         
            if(p.row-1>-1&&p.col-1>-1){
                table.rows[p.row-1].cells[p.col-1].style.backgroundColor='rgb(153, 182, 95)';
                table.rows[p.row].cells[p.col-1].style.backgroundColor='rgb(153, 182, 95)';
                table.rows[p.row-1].cells[p.col].style.backgroundColor='rgb(153, 182, 95)';
            }     
            if(p.row+1<8&&p.col-1>-1){
                table.rows[p.row+1].cells[p.col-1].style.backgroundColor='rgb(153, 182, 95)';
                table.rows[p.row+1].cells[p.col].style.backgroundColor='rgb(153, 182, 95)';
                table.rows[p.row].cells[p.col-1].style.backgroundColor='rgb(153, 182, 95)';
            } 
            if(p.row-1>-1&&p.col+1<8){
                table.rows[p.row-1].cells[p.col+1].style.backgroundColor='rgb(153, 182, 95)';
                table.rows[p.row-1].cells[p.col].style.backgroundColor='rgb(153, 182, 95)';
                table.rows[p.row].cells[p.col+1].style.backgroundColor='rgb(153, 182, 95)';
            } 
        }
        else if(p.pieceT=='queen'){
            for(let i=1; i<8; i++){
                if(p.row+i<8){
                    table.rows[((p.row)+i)].cells[(p.col)].style.backgroundColor='rgb(153, 182, 95)';
                }
                if(p.row-i>-1){
                    table.rows[p.row-i].cells[p.col].style.backgroundColor='rgb(153, 182, 95)';
                }
            }
            for(let i=1; i<8; i++){
                if(p.col+i<8){
                    table.rows[p.row].cells[p.col+i].style.backgroundColor='rgb(153, 182, 95)';
                }
                if(p.col-i>-1){
                    table.rows[p.row].cells[p.col-i].style.backgroundColor='rgb(153, 182, 95)';
                }
                for(let i=1; i<8; i++){
                    if(p.row+i<8&&p.col+i<8){
                        table.rows[((p.row)+i)].cells[(p.col+i)].style.backgroundColor='rgb(153, 182, 95)';
                    }
                    if(p.row-i>-1&&p.col-i>-1){
                        table.rows[p.row-i].cells[p.col-i].style.backgroundColor='rgb(153, 182, 95)';
                    }
                    if(p.row-i>-1&&p.col+i<8){
                        table.rows[((p.row)-i)].cells[(p.col+i)].style.backgroundColor='rgb(153, 182, 95)';
                    }
                    if(p.row+i<8&&p.col-i>-1){
                        table.rows[p.row+i].cells[p.col-i].style.backgroundColor='rgb(153, 182, 95)';
                    }
                }
            }
        }
    }
    ////////////////////////////////////
}