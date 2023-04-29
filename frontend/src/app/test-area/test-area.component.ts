import { Component, OnInit } from '@angular/core';
import { Box } from './Box';
import { Item } from './Item';

@Component({
  selector: 'app-test-area',
  templateUrl: './test-area.component.html',
  styleUrls: ['./test-area.component.css']
})
export class TestAreaComponent implements OnInit{
  productionTarget : number = 200;
  workHour : number = 10;
  lineProductions : number[] = [];

  items : Item[] = [
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
  ];
  boxes : Box[] = [
    {id:1, name:"box1", capacity:10, lineChiefId:"2"},
    {id:2, name:"box2", capacity:8, lineChiefId:"3"},
    {id:3, name:"box3", capacity:13, lineChiefId:"4"}
  ];

  ngOnInit(): void {
    this.createBoxes();
    this.createItems();
  }

  createBoxes():void{
    for(let i=0; i<this.boxes.length; i++){
      const boxDiv = document.createElement("div");
      boxDiv.setAttribute("draggable", "true");
      boxDiv.setAttribute("class", "box col-sm-4");
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

      this.lineProductions.push(0);
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
      matricesDiv.innerHTML = this.boxes[i].name + "<br> Production: " + this.lineProductions[i];
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
    let itemIdNumber = Number(itemId.charAt(itemId.length-1));
    console.log("Moving item "+itemIdNumber+" from "+sourceIdNumber + " to "+destIdNumber);
    
    let itemHourlyProduction = Number(item.innerHTML.split(": ")[1]);
    console.log(itemHourlyProduction);
    //this.lineProductions[destIdNumber] += itemHourlyProduction;
    let oldProduction = Number((<HTMLElement>document.getElementById("currentProduction")).innerHTML.split(": ")[1]);
    (<HTMLElement>document.getElementById("currentProduction")).innerHTML = "Current Production: " + (oldProduction+itemHourlyProduction);
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
      itemDiv.setAttribute("id", "item"+this.items[i].id.toString());

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
}
