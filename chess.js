
window.onload = () => {
let typeW='White';
let typeD='Dark';
let lastCell;
let lastCellI;
let lastCellJ;
var table = document.createElement('table');
table.classList.add('table-container');
const body = document.querySelector('body');
body.appendChild(table);
for(let i=0; i<8; i++){
    const row = table.insertRow(i);
    for(let j=0; j<8; j++){
        cell = row.insertCell();
        cell.id='cell '+ i.toString() + '.' + j.toString();
        lastCell=cell;
        lastCellI=i;
        lastCellJ=j;
        lastCellColor=cell.style.backgroundColor;
        clickedOne(cell,i,j);
        BoardColor(i, j, cell);              
        if(i===0){
            if(j===0 || j===7){
                AddImage(typeW, 'Palhan', cell);
            }
            else if(j===1 || j===6){
                AddImage(typeW, 'Horse', cell);
            }
            else if(j===2 || j===5){
                AddImage(typeW, 'Elephant', cell);
            }
            else if(j===3){
                AddImage(typeW, 'King', cell);
            }
            else{
                AddImage(typeW, 'Quin', cell);
            }
        }
        if(i===1){
            AddImage(typeW, 'Simple', cell);
        }
        if(i===7){
            if(j===0 || j===7){
                AddImage(typeD, 'Palhan', cell);
            }
            else if(j===1 || j===6){
                AddImage(typeD, 'Horse', cell);
            }
            else if(j===2 || j===5){
                AddImage(typeD, 'Elephant', cell);
            }
            else if(j===3){
                AddImage(typeD, 'King', cell);
            }
            else{
                AddImage(typeD, 'Quin', cell);
            }
        }
        if(i===6){
            AddImage(typeD, 'Simple', cell);
        }
        
    }

}
    function AddImage(type, hero ,cell){
        const img=document.createElement('img');
        img.src='images/' + type + hero + '.png'
        cell.appendChild(img);
        img.classList.add('heroImg');
    }
    function HClick(cell, i, j){
        cell.classList.add('changedCell');
        if(lastCell!==cell){
            lastCell.classList.remove('changedCell');
        }
        lastCell=cell;
        console.log('click '+cell.id.toString());
        
    }
    function BoardColor(i,j,cell){
        if((i + j) % 2===0){
            // cell.style.backgroundColor = "brown";
            cell.classList.add('darkTyped');
        }
        else{
            // cell.style.backgroundColor = "wheat";
            cell.classList.add('whiteTyped');
        }
        
        console.log('painted');
    }
    function clickedOne(cell,i,j){
        cell.addEventListener('click', () => {HClick(cell, i, j);});
    }





// let left1=412;
// var players = new Array();
// for(let i=0;i<32;i++)
// {
//     players[i] = document.createElement("img");
//     document.body.appendChild(players[i]);
//     players[i].classList.add('player-img');
//     if(i<=7){
//         players[i].style.top='20px';
//         players[i].style.left = left1.toString() + 'px';  
//         left1+=87; 
//     } 
//     if(i===7){
//         left1=412;
//     }
//     if( i>7 && i<=15){

//         players[i].style.top='110px';
//         players[i].style.left = left1.toString() + 'px';  
//         left1+=87; 
//     }
//     if(i===15){
//         left1=412;
//     }
//     if( i>15 && i<=23){

//         players[i].style.top='540px';
//         players[i].style.left = left1.toString() + 'px';  
//         left1+=87; 
//     }
//     if(i===23){
//         left1=412;
//     }
//     if( i>23 && i<=31){

//         players[i].style.top='630px';
//         players[i].style.left = left1.toString() + 'px';  
//         left1+=87; 
//     }
// }
// players[0].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Chess_Mdt45.svg/800px-Chess_Mdt45.svg.png";
// players[7].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Chess_Mdt45.svg/800px-Chess_Mdt45.svg.png";
// players[1].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Chess_tile_nd.svg/800px-Chess_tile_nd.svg.png";
// players[6].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Chess_tile_nd.svg/800px-Chess_tile_nd.svg.png";
// players[2].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/800px-Chess_bdt45.svg.png";
// players[5].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/800px-Chess_bdt45.svg.png";
// players[3].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Chess_tile_qd.svg/800px-Chess_tile_qd.svg.png";
// players[4].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Chess_tile_kd.svg/800px-Chess_tile_kd.svg.png";
// for(let i=8;i<16;i++){
//     players[i].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/800px-Chess_pdt45.svg.png";
// }

// for(let i=16;i<24;i++){
//     players[i].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Chess_pClt26.svg/800px-Chess_pClt26.svg.png";
// }
// players[24].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chess_Mlt45.svg/800px-Chess_Mlt45.svg.png";
// players[31].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chess_Mlt45.svg/800px-Chess_Mlt45.svg.png";
// players[25].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Chess_tile_nl.svg/800px-Chess_tile_nl.svg.png";
// players[30].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Chess_tile_nl.svg/800px-Chess_tile_nl.svg.png";
// players[26].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/800px-Chess_blt45.svg.png";
// players[29].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/800px-Chess_blt45.svg.png";
// players[27].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Chess_tile_ql-whitebg.svg/800px-Chess_tile_ql-whitebg.svg.png";
// players[28].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Chess_tile_kl-whitebg.svg/800px-Chess_tile_kl-whitebg.svg.png";
// let cells;
// function hclick(w,i){
//     const newLocal = "whitesmoke";
//     w[i].style.backgroundColor = "red";
//     console.log("clicked");
// }











}










// for(let i=0;i<tableTr.length;i++){
// tableTr[i]=document.createElement("tr");
// }
// // for(let i=0;i<tableTr.length;i++)
// // {
// //     for(let j=0;j<tableTr.length;j++)
// //     {
// //         tableTr[i]=document.createElement("td");
// //         if(i%2===0&&j%2===0||i%2!==0&&j%2!==0)
// //         {

// //         }
// //     }
// // }