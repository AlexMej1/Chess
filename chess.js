
window.onload = () => {
var table = document.createElement('table');
table.classList.add('table-container');
const body = document.querySelector('body');
body.appendChild(table);

for(let i=0; i<8; i++){
    const row = table.insertRow(i);
    for(let j=0; j<8; j++){
        const cell = row.insertCell();
    }
}





















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