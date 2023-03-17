createResources();
const items = document.getElementsByClassName("item");
const boxes = document.getElementsByClassName("box");

const itemObjects = []
let boxObjects = []

for(let i=0; i<items.length; i++){
    items[i].addEventListener("dragstart", dragStart);
    itemObjects.push([items[i], {"efficiency": 10}]);
}

for(let i=0; i<boxes.length; i++){
    boxes[i].addEventListener("dragenter", dragEnter);
    boxes[i].addEventListener("dragover", dragOver);
    boxes[i].addEventListener("dragleave", dragLeave);
    boxes[i].addEventListener("drop", drop);
    boxObjects.push([boxes[i], {"efficiency":0}]);
}

//console.log(itemValues[0][1].efficiency);


function dragStart(e){
    e.dataTransfer.setData("text/plain", e.target.id);
    console.log("Drag Started!");
    //console.log(e.target.parentElement.id);
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
    const sourceBox = item.parentElement;
    

    item.classList.remove("hide");
    item.parentNode.removeChild(item);
    e.target.appendChild(item);
    
    for(let i=0; i<boxObjects.length; i++){
        if(boxObjects[i][0].id == e.target.id){
            let newItemEfficiency = 0;

            for(let j=0; j<itemObjects.length; j++){
                if(itemObjects[j][0].id == itemId){
                    newItemEfficiency = itemObjects[j][1].efficiency;
                    break;
                }
            }

            const sourceBoxIndex = sourceBox.id.charAt(3)-1;
            if(sourceBoxIndex!=0) {
                boxObjects[sourceBoxIndex][1].efficiency -= newItemEfficiency;
                document.getElementsByClassName("matrices")[sourceBoxIndex-1].innerText = "Current Efficiency: "+boxObjects[sourceBoxIndex][1].efficiency;
            }

            if(i==0) break;
            boxObjects[i][1].efficiency += newItemEfficiency;
            document.getElementsByClassName("matrices")[i-1].innerText = "Current Efficiency: "+boxObjects[i][1].efficiency;
            break;
        }
    }

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