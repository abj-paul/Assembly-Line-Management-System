import { Component, OnInit } from '@angular/core';
import { AssemblyLine } from 'src/app/models/AssemblyLine';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-view-assembly-lines',
  templateUrl: './view-assembly-lines.component.html',
  styleUrls: ['./view-assembly-lines.component.css']
})
export class ViewAssemblyLinesComponent implements OnInit {
  assembly_lines : AssemblyLine[] = [];
  lineInProcess : AssemblyLine = new AssemblyLine();
  processHappening : boolean = false;

  name: string = "";
  assemblyLineId: number = 1;
  capacity: number = 0;
  LCUserId: number = 0;
  other_info: string = "";

  constructor(private constantsService: ConstantsService, private accessControlService: AccessControlService){}

  ngOnInit(): void {
    this.loadAssemblyLinesFromBackend();
  }

  isUpdating(line: AssemblyLine):boolean{
    if(this.lineInProcess==line) return true;
    return false;
  }

  loadAssemblyLinesFromBackend(){
    this.assembly_lines = [];

    let data = {
        "operation":"gallist",
        "userid": this.accessControlService.getUser().userid,
        "userHash": this.accessControlService.getUser().userHash
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
            console.log("Get Assembly Line List Request has been resolved!");
            return resolve.json()
      })
    .then((data)=>{
        console.log(data);
        let assemblyLineList = data.AssemblyLineList;

        for(let i=0; i<assemblyLineList.length; i++){
          this.assembly_lines.push(
            {
              name: assemblyLineList[i].name,
              assemblyLineId: assemblyLineList[i].assemblyLineId,
              capacity: assemblyLineList[i].capacity,
              LCUserId:  assemblyLineList[i].LCUserId,
              other_info: assemblyLineList[i].otherInfo
            }
          );
        }
      }
    )
    .catch((err)=>{
      console.log(err);
    })
  }


  editInfo(line : AssemblyLine) : void{
    this.lineInProcess = line;
    this.processHappening = true;

    this.assemblyLineId = this.lineInProcess.assemblyLineId;
    this.name = this.lineInProcess.name;
    this.capacity = this.lineInProcess.capacity;
    this.LCUserId = this.lineInProcess.LCUserId;
    this.other_info = this.lineInProcess.other_info;
  }

  confirmChange(){
    let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";
    let data={
        "operation":"uali",
        "assemblyLineId": this.assemblyLineId,
        "name": this.name,
        "capacity": this.capacity,
        "LCUserId": this.LCUserId,
        "otherInfo": this.other_info,
        "userHash": this.accessControlService.getUser().userHash
    }

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
        console.log("Edit User Info Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
      this.processHappening = false;
      this.lineInProcess = new AssemblyLine();
      this.loadAssemblyLinesFromBackend();
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  deleteInfo(line:AssemblyLine):void{
    this.assemblyLineId = line.assemblyLineId;
    this.name = line.name;
    this.capacity = line.capacity;
    this.LCUserId = line.LCUserId;
    this.other_info = line.other_info;


    let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";
    let data={
        "operation":"dal",
        "assemblyLineId": this.assemblyLineId,
        "name": this.name,
        "capacity": this.capacity,
        "LCUserId": this.LCUserId,
        "other_info": this.other_info,        
        "userHash": this.accessControlService.getUser().userHash
    }

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
        console.log("Delete User Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
      this.loadAssemblyLinesFromBackend();
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}
