createResources();
const items = document.getElementsByClassName("item");
const boxes = document.getElementsByClassName("box");

const itemValues = []
let efficiencyValues = []

for(let i=0; i<items.length; i++){
    items[i].addEventListener("dragstart", dragStart);
    itemValues.push([items[i].id, {"efficiency": (i+1)*2}]);
}

for(let i=0; i<boxes.length; i++){
    boxes[i].addEventListener("dragenter", dragEnter);
    boxes[i].addEventListener("dragover", dragOver);
    boxes[i].addEventListener("dragleave", dragLeave);
    boxes[i].addEventListener("drop", drop);
    efficiencyValues.push([boxes[i].id, 0]);

}

//console.log(itemValues[0][1].efficiency);


function dragStart(e){
    e.dataTransfer.setData("text/plain", e.target.id);
    console.log("Drag Started!"+e.target.id);
    setTimeout(()=>{
        e.target.classList.add("hide");
    },0);
}


function dragEnter(e){
    e.preventDefault();
}
function dragOver(e){
    e.preventDefault();
}
function dragLeave(e){}
function drop(e){
    const itemId = e.dataTransfer.getData("text/plain");
    const item = document.getElementById(itemId);

    item.classList.remove("hide");
    e.target.appendChild(item);
    
    
    let boxIndex = 0;
    for(let i=0; i<efficiencyValues.length; i++){
        if(efficiencyValues[i][0]==e.target.id) {
            for(let j=0; j<itemValues.length; j++){
                if(itemValues[j][0]==itemId){
                    efficiencyValues[i][1] += itemValues[j][1].efficiency;
                    break;
                }
            }
            boxIndex = i;
            break;
        }
    }

    
    document.getElementsByClassName("matrices")[boxIndex].innerText = "Current Efficiency: "+efficiencyValues[boxIndex][1];
}

// Misc
function createResources(){

    for(let index=0; index<5; index++){
        const div = document.createElement("div");
        div.setAttribute("class", "item");
        div.setAttribute("draggable", "true");
        div.setAttribute("id", "item"+index);
    
        const p = document.createElement("p");
        p.innerText = "Sewing Machine "+index;
        div.appendChild(p);
    
        document.getElementById("box1").appendChild(div)
    }
}