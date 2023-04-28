import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-set-line-layout',
  templateUrl: './set-line-layout.component.html',
  styleUrls: ['./set-line-layout.component.css']
})
export class SetLineLayoutComponent {

  targetProduction : any = 0; 
  machines : any = [];
  assemblyLines : any = JSON.parse(<string>sessionStorage.getItem("selectedAssemblyLines"));
  
  currentProductionReached : number = 0;
  lineProduction : number[] = [];

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private router: Router){
    this.targetProduction = sessionStorage.getItem("totalProductionTarget");
    this.renderResource();
  }

  renderResource():void{
    let data = {
        "operation":"gml",
        "userHash": this.accessControlService.getUser().userHash
    }
    let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";

    fetch(url, {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json",},
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
            this.machines = data.MachineList;

            for(let i=0; i<this.machines.length; i++){
                /*
                <div class="item" id="item1" draggable="true">
                    <p>Sewing Machine 1</p>
                </div>
                */
                const div = document.createElement("div");
                div.setAttribute("class", "item");
                div.setAttribute("draggable", "true");
                div.setAttribute("id", this.machines[i][4]);
                div.addEventListener("dragstart", this.dragStart);
            
                const p = document.createElement("p");
                p.innerHTML = this.machines[i][0] + " <br> Type: " + this.machines[i][1] + " <br> Hourly Production: "+ this.machines[i][3];
                div.appendChild(p);
            
                (<HTMLElement>document.getElementById("resourceBox")).appendChild(div)
            }

            const margin = 11;
            let newHeight = ((<HTMLElement>document.getElementById("1")).offsetHeight+margin) * (this.machines.length+1);
            (<HTMLElement>document.getElementById("resourceBox")).style.height = newHeight+"px" ;

            this.__renderAssemblyLine();
        })
        .catch((err)=>{console.log(err);});

}

   __renderAssemblyLine(): void{
    let div = <HTMLDivElement>document.getElementById("resourceBox");
    div.setAttribute("draggable", "true");
    div.addEventListener("dragenter", this.dragEnter);
    div.addEventListener("dragover", this.dragOver);
    div.addEventListener("drop", this.drop);
    div.addEventListener("dragleave", this.dragLeave);
  
  for(let i=0; i<this.assemblyLines.length; i++){
    this.lineProduction.push(0); //initial production

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
      div0.setAttribute("class", "col-sm-"+12/this.assemblyLines.length);
      div0.setAttribute("class", "box"); // ADDED THIS NEW LINE
      div0.setAttribute("draggable", "true");
      div0.addEventListener("drop", this.drop);
      div0.addEventListener("dragenter", this.dragEnter);
      div0.addEventListener("dragover", this.dragOver);
      div0.addEventListener("dragleave", this.dragLeave);

      let div1 = document.createElement("div");
      //div1.setAttribute("class","box");
      div1.setAttribute("id","box"+i);
      let div2 = document.createElement("div");
      div2.setAttribute("class", "matrices");

      let p1 = document.createElement("p");
      p1.innerText = this.assemblyLines[i].name;
      let p2 = document.createElement("p");
      p2.innerText = "Current Production: "+ this.lineProduction[i];
      let p3 = document.createElement("p");
      p3.innerText = "Capacity : "+ this.assemblyLines[i].capacity;

      div2.appendChild(p1);
      div2.appendChild(p2);
      div2.appendChild(p3);
      div1.appendChild(div2);
      div0.appendChild(div1);
  
      (<HTMLElement>document.getElementById("assemblyLineGUIPortion")).appendChild(div0);
  }
}
dragStart(e:any):void{
  e.dataTransfer.setData("text/plain", e.target.id);
  console.log("Drag Started!");
  //console.log(e.target.parentElement.id);
  setTimeout(()=>{
      e.target.classList.add("hide");
  },0);
}

dragEnter(e:any){
  console.log("Drag Enter");
  e.preventDefault();
}
dragOver(e:any){
  console.log("Drag Over");
  e.preventDefault();
}
dragLeave(e:any){console.log("Drag Leave");}

drop(e:any):void{
  console.log("DROPW is being called by");

  let itemId  = e.dataTransfer.getData("text/plain");
  let item = <HTMLElement>document.getElementById(itemId);
  let sourceBox = <HTMLElement>item.parentElement;

  console.log("Moving the item "+itemId);

  

  item.classList.remove("hide");
  (<HTMLElement>item.parentNode).removeChild(item);
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
  const itemProductionAmount = this.machines[item.id][3];
  if(sourceBox.id!="resourceBox") {
      let index = <number><unknown>sourceBox.id[3];
      this.lineProduction[index] -= itemProductionAmount;
      sourceBox.children[0].children[1].innerHTML = "Current Production: "+this.lineProduction[index];
      sourceBox.children[0].children[2].innerHTML = "Capacity: "+ (this.assemblyLines[index].capacity - sourceBox.children.length + 1);
      this.currentProductionReached-=itemProductionAmount;
  }

  if((<HTMLElement>destBox).id!="resourceBox"){
      let index = <number><unknown>(<HTMLElement>destBox).id[3];
      this.lineProduction[index] += itemProductionAmount;
      (<HTMLElement>destBox).children[0].children[1].innerHTML = "Current Production: "+this.lineProduction[index];
      (<HTMLElement>destBox).children[0].children[2].innerHTML = "Capacity: "+ (this.assemblyLines[index].capacity - (<HTMLElement>destBox).children.length + 1);

      this.currentProductionReached += itemProductionAmount;
  }

  (<HTMLElement>document.getElementById("currentProduction")).innerText = "Current Production: "+this.currentProductionReached;

}

goBack() : void{
  this.router.navigate(["/pm-dashboard/production"]);
}

saveLayout(): void{
  let boxes = document.getElementsByClassName("box");
  for(let i=1; i<boxes.length; i++)
     this.__saveSingleAssemblyLineLayout(boxes[i].id);
}

 __saveSingleAssemblyLineLayout(boxId: string):void{
  let machineList = (<HTMLElement>document.getElementById(boxId)).children;
  let layoutArr = []
  for(let i=1; i<machineList.length; i++){
      let index = machineList[i].id;
      layoutArr.push({"machineId": index, "position":i, otherInfo:"None"});
  }

  let assemblyLineId = this.assemblyLines[boxId[3]].id;

  let data = {
      "operation": "sall",
      "assemblyLineId": assemblyLineId,
      "layoutArr": layoutArr,
      "userHash": this.accessControlService.getUser().userHash,
      "LCUserId": sessionStorage.getItem("assignedLCId")
  };
  let url = this.constantsService.SERVER_IP_ADDRESS + "layout";

  console.log(data);

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

}
