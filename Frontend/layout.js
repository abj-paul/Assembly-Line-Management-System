const userHash = sessionStorage.getItem("userHash");
const targetProduction = sessionStorage.getItem("totalProductionTarget");
let machines = null;
const assemblyLines = JSON.parse(sessionStorage.getItem("selectedAssemblyLines"));


let currentProductionReached = 0;
let lineProduction = [];

function renderResource(){
    document.getElementById("targetProduction").innerText = "Target Production: "+ targetProduction;

    let data = {
        "operation":"gml",
        "userHash":userHash
    }
    let url = "http://192.168.31.249:1401/productionManager";


    fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then((resolve)=>{
            console.log("Get Machine List Request has been resolved!");
            return resolve.json()
        })
        .then((data)=>{
            console.log(data);
            machines = data.MachineList;

            for(let i=0; i<machines.length; i++){
                /*
                <div class="item" id="item1" draggable="true">
                    <p>Sewing Machine 1</p>
                </div>
                */
                const div = document.createElement("div");
                div.setAttribute("class", "item");
                div.setAttribute("draggable", "true");
                div.setAttribute("id", i);
                div.addEventListener("dragstart", dragStart);
            
                const p = document.createElement("p");
                p.innerHTML = machines[i][0] + " <br> Type: " + machines[i][1] + " <br> Hourly Production: "+machines[i][3];
                div.appendChild(p);
            
                document.getElementById("resourceBox").appendChild(div)
            }

            const margin = 11;
            let newHeight = (document.getElementById("1").offsetHeight+margin) * (machines.length+1);
            document.getElementById("resourceBox").style.height = newHeight+"px" ;

            __renderAssemblyLine();
        })
        .catch((err)=>{console.log(err);});

}

function __renderAssemblyLine(){
    let div = document.getElementById("resourceBox");
    div.setAttribute("draggable", "true");
    div.addEventListener("dragenter", dragEnter);
    div.addEventListener("dragover", dragOver);
    div.addEventListener("dragleave", dragLeave);
    div.addEventListener("drop", drop);
    
    for(let i=0; i<assemblyLines.length; i++){
        lineProduction.push(0); //initial production

        /*
        <div class="col-sm-6">
            <div class="box" id="box2">
                <div class="matrices">
                    <p>Assembly Line 1</p>
                    <p>Current Efficiency: 0</p>
                </div>
            </div>
        </div>
        */


        let div0 = document.createElement("div");
        div0.setAttribute("class", "col-sm-"+12/assemblyLines.length);
        div0.setAttribute("draggable", "true");
        div0.addEventListener("dragenter", dragEnter);
        div0.addEventListener("dragover", dragOver);
        div0.addEventListener("dragleave", dragLeave);
        div0.addEventListener("drop", drop);

        let div1 = document.createElement("div");
        div1.setAttribute("class","box");
        div1.setAttribute("id","box"+i);
        let div2 = document.createElement("div");
        div2.setAttribute("class", "matrices");

        let p1 = document.createElement("p");
        p1.innerText = assemblyLines[i].name;
        let p2 = document.createElement("p");
        p2.innerText = "Current Production: "+lineProduction[i];
        let p3 = document.createElement("p");
        p3.innerText = "Capacity : "+assemblyLines[i].capacity;

        div2.appendChild(p1);
        div2.appendChild(p2);
        div2.appendChild(p3);
        div1.appendChild(div2);
        div0.appendChild(div1)
    
        document.getElementById("assemblyLineGUIPortion").appendChild(div0);
    }
}
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

    // Finding Destination Box
    let boxObjects = document.getElementsByClassName("box");
    let destBox = null;
    for(let i=0; i<boxObjects.length; i++){
        let boxItems = boxObjects[i].children;
        for(let j=0; j<boxItems.length; j++){
            if(boxItems[j]==item){
                destBox = boxObjects[i];
                break;
            }
        }
        if(destBox!=null) break;
    }
    if(destBox==null) destBox = document.getElementById("resourceBox");


    // Update Values
    const itemProductionAmount = machines[item.id][3];
    if(sourceBox.id!="resourceBox") {
        let index = sourceBox.id[3];
        lineProduction[index] -= itemProductionAmount;
        sourceBox.children[0].children[1].innerHTML = "Current Production: "+lineProduction[index];
        sourceBox.children[0].children[2].innerHTML = "Capacity: "+ (assemblyLines[index].capacity - sourceBox.children.length + 1);
        currentProductionReached-=itemProductionAmount;
    }

    if(destBox.id!="resourceBox"){
        let index = destBox.id[3];
        lineProduction[index] += itemProductionAmount;
        destBox.children[0].children[1].innerHTML = "Current Production: "+lineProduction[index];
        destBox.children[0].children[2].innerHTML = "Capacity: "+ (assemblyLines[index].capacity - destBox.children.length + 1);

        currentProductionReached += itemProductionAmount;
    }

    document.getElementById("currentProduction").innerText = "Current Production: "+currentProductionReached;

}

function goBack(){
    window.location.href = "file:///home/abhijit/Assembly-Line-Management-System/Frontend/production-manager-dashboard.html";
}

function saveLayout(){
    /*
    {
	"operation": "sall",
	"assemblyLineId": 1,
	"layoutArr": [{"machineId": 1, "position": 5, "otherInfo": "None"},{"machineId": 2,         "position": 0, "otherInfo": "None"}]
    }
    */
    let boxes = document.getElementsByClassName("box");
    for(let i=1; i<boxes.length; i++)
        __saveSingleAssemblyLineLayout(boxes[i].id);
    //window.location.href = "file:///home/abhijit/Assembly-Line-Management-System/Frontend/production-manager-dashboard.html";

}

function __saveSingleAssemblyLineLayout(boxId){
    let machineList = document.getElementById(boxId);
    let layoutArr = []
    for(let i=0; i<machineList.length; i++){
        let index = machineList[i].id;
        layoutArr.push({"machineId":machines[index], "position":i, otherInfo:"None"});
    }

    let assemblyLineId = boxId[3];

    let data = {
        "operation": "sall",
        "assemblyLineId": assemblyLineId,
        "layoutArr": layoutArr,
        "userHash": userHash
    };
    let url = "http://192.168.31.249:1401/layout";

    fetch(url, {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
        "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data), 
    })
        .then((resolve)=>{
            console.log("Get Machine List Request has been resolved!");
            return resolve.json()
        })
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{console.log(err);});

}