import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AccessControlService } from '../../../services/access-control.service';
import { ConstantsService } from '../../../services/constants.service';
import { SharedStuffsService } from '../../../services/shared-stuffs.service';
import { Box } from './Box';
import { Item } from './Item';

@Component({
  selector: 'app-set-line-layout',
  templateUrl: './set-line-layout.component.html',
  styleUrls: ['./set-line-layout.component.css']
})
export class SetLineLayoutComponent implements OnInit{
  productionTarget : number = 200;
  workHour : number = 10;
  //lineProductions : number[] = [];

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private sharedService : SharedStuffsService, private router : Router){}

  items : Item[] = [
    /*
    {id:1, name:"AF Plus-1", hourly_production: 20},
    {id:2, name:"AF Plus-2", hourly_production: 21},
    {id:3, name:"AF Plus-3", hourly_production: 22},
    {id:4, name:"AF Plus-4", hourly_production: 23},
    {id:5, name:"AF Plus-5", hourly_production: 24},
    {id:6, name:"AF Plus-6", hourly_production: 25},
    {id:7, name:"AF Plus-7", hourly_production: 26},
    {id:8, name:"AF Plus-8", hourly_production: 27},
    {id:9, name:"AF Plus-9", hourly_production: 28},
    {id:10, name:"AF Plus-10", hourly_production: 29}
    */
  ];
  boxes : Box[] = [
    {id:0, name:"Resource", capacity:1000, lineChiefId:"-1"}
  ];

  ngOnInit(): void {
    this.loadMachinesFromBackend();
  }

  createBoxes():void{
    for(let i=0; i<this.boxes.length; i++){
      let box_bootstrap_col_len = Math.floor(12/this.boxes.length);

      const boxDiv = document.createElement("div");
      boxDiv.setAttribute("draggable", "true");
      boxDiv.setAttribute("class", "box col-sm-"+box_bootstrap_col_len);
      boxDiv.setAttribute("id", "box"+this.boxes[i].id.toString());

      //boxDiv.innerHTML = this.boxes[i].name;
      boxDiv.style.cssText = `
      background-color: rgb(255, 230, 198);
      height: 900px;
      border: 2px solid black;
      text-align: center;`;

      boxDiv.addEventListener("dragenter", this.dragEnter);
      boxDiv.addEventListener("dragover", this.dragOver);
      boxDiv.addEventListener("dragleave", this.dragLeave);
      boxDiv.addEventListener("drop", this.drop);

      //this.lineProductions.push(0);
      const matricesDiv = document.createElement("div");
      //boxDiv.setAttribute("class", "matrices");
      matricesDiv.style.cssText = `
      background-color: yellow;
      height: 60px;
      border: 1px solid groove;
      margin: auto;
      margin-bottom: 10px;
      text-align: center
      padding: 10px;`;
      matricesDiv.innerHTML = this.boxes[i].name + "<br> Production: <span>0</span>" ;//this.lineProductions[i];
      boxDiv.appendChild(matricesDiv);

      document.getElementById("body")?.appendChild(boxDiv);

    }
  }

  dragStart(e: any){
    console.log("Drag Start");
    e.dataTransfer.setData("text/plain", e.target.id);
    //console.log(e.target.parentElement.id);
    setTimeout(()=>{
        //e.target.classList.add("hide");
        e.target.style.cssText = "display:none;";
    },0);
  }

  drop(e:any){
    console.log("DROP");
    console.log(e);

    let itemId  = e.dataTransfer.getData("text/plain");
    let item = <HTMLElement>document.getElementById(itemId);
    let sourceBox = <HTMLElement>item.parentElement;
  
    console.log("Moving the item "+itemId);
    //item.classList.remove("hide");
    item.style.cssText = `
    display:block;
    background-color: gainsboro;
    height: 60px;
    border: 1px solid groove;
    margin: auto;
    margin-bottom: 10px;
    text-align: center;`;
    (<HTMLElement>item.parentNode).removeChild(item);
    e.target.appendChild(item);

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

    // Calculating Stats
    let sourceIdNumber = Number(sourceBox.id.charAt(sourceBox.id.length-1));
    let destIdNumber = Number(destBox?.id.charAt(sourceBox.id.length-1));
    let itemIdNumber = Number(itemId);
    console.log("Moving item "+itemIdNumber+" from "+sourceIdNumber + " to "+destIdNumber);
    
    let itemHourlyProduction = Number(item.innerHTML.split(": ")[1]);
    console.log(itemHourlyProduction);
    //this.lineProductions[destIdNumber] += itemHourlyProduction;
    let oldProduction = Number((<HTMLElement>document.getElementById("currentProduction")).innerHTML.split(": ")[1]);

    let newProduction = oldProduction;
    if(sourceIdNumber==0) newProduction += itemHourlyProduction;
    if(destIdNumber==0) newProduction -= itemHourlyProduction;

    console.log("DEBUG: "+newProduction);

    (<HTMLElement>document.getElementById("currentProduction")).innerHTML = "Current Production: " + newProduction;

    // Updating Individual Line Production
    if(sourceIdNumber!=0){
      let boxElem = <any>sourceBox;
      let curr_production = boxElem.firstChild?.lastChild.innerHTML;
      let new_production = parseInt(curr_production) - itemHourlyProduction;
      console.log("DEBUG: "+new_production);
      boxElem.firstChild.lastChild.innerHTML = new_production;
    }
    if(destIdNumber!=0){
      let boxElem = <any>destBox;
      let curr_production = boxElem.firstChild?.lastChild.innerHTML;
      let new_production = parseInt(curr_production) + itemHourlyProduction;
      console.log("DEBUG: "+new_production);
      boxElem.firstChild.lastChild.innerHTML = new_production;
    }
    
  }

  updateStats(sourceIdNumber: number, destIdNumber: number, itemIdNumber: number){
   
  }


  dragEnter(e: any){
    console.log("Drag Enter");
    e.preventDefault();
  }

  dragOver(e: any){
    console.log("Drag Over");
    e.preventDefault();
  }

  dragLeave(e: any){
    console.log("Drag Over");
    e.preventDefault();
  }

  createItems(): void {
    const boxDiv = document.getElementById("box"+this.boxes[0].id.toString());

    for(let i=0; i<this.items.length; i++){
      const itemDiv = document.createElement("div");

      itemDiv.setAttribute("class", "item");
      itemDiv.setAttribute("draggable", "true");
      itemDiv.setAttribute("id", ""+this.items[i].id.toString());

      itemDiv.innerHTML = this.items[i].name + "<br> Hourly Production: "+this.items[i].hourly_production;
      itemDiv.style.cssText = `
      background-color: gainsboro;
      height: 60px;
      border: 1px solid groove;
      margin: auto;
      margin-bottom: 10px;
      text-align: center;`;

      itemDiv.addEventListener("dragstart",this.dragStart);

      boxDiv?.appendChild(itemDiv);
    }
  }

  // Regular CRUD Functions
  loadMachinesFromBackend(){
    let data = {
        "operation":"guml",
        "userHash": 249335157 // this.accessControlService.getUser().userHash
    }
    let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";


    fetch(url, {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: { "Content-Type": "application/json",},
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
        let machines = data.UNUSED_MACHINES;
        this.items = [];
        for(let i=0; i<machines.length; i++){
          this.items.push(
            {id: machines[i].machineId, name: machines[i].machineModel, hourly_production: machines[i].perHourProduction}
          );
        }
        for(let i=0; i<this.sharedService.selected_assembly_lines_for_production.length; i++) this.boxes.push(this.sharedService.selected_assembly_lines_for_production[i]);

        console.log("DEBUG: Concat boxes: ");
        console.log(this.boxes);
        this.createBoxes();

        this.createItems();
      }
    )
  }

  saveAssemblyLineLayoutInDatabase(){
    let body = <HTMLElement>document.getElementById("body");
    for(let i=1; i<body.children.length; i++){
      this.__saveSingleLineInDatabase(body.children[i], i);
    }
  }

  __saveSingleLineInDatabase(line : Element, index : number):void{
    let lineContent = line.children;
    let assemblyLineId =  parseInt(line.id.charAt(line.id.length-1));

    let layoutArr = [];
    for(let i=1; i<lineContent.length; i++) {
      let index = lineContent[i].id;
      layoutArr.push({"machineId": index, "position":i, otherInfo:"None"})
    }
    console.log("DEBUG: SAVE Assembly LINE: "+assemblyLineId);

    let data = {
      "operation": "sall",
      "assemblyLineId": assemblyLineId,
      "layoutArr": layoutArr,
      "userHash":249335157, // this.accessControlService.getUser().userHash,
      "LCUserId": this.boxes[index].lineChiefId
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
          console.log("Saving layout Request has been resolved!");
          return resolve.json()
      })
      .then((data)=>{
          console.log(data);
          this.router.navigate(['/pm-dashboard/production'])
      })
      .catch((err)=>{console.log(err);});
  }

  goBack(){
    if(this.accessControlService.getUser().role=='productionManager')
      this.router.navigate(["/pm-dashboard/production"]);
    else if(this.accessControlService.getUser().role=='lineChief')
      this.router.navigate(["/lc-dashboard/layout"]);
    else this.router.navigate(["/home"]);
  }

}
