import { Component, OnInit } from '@angular/core';
import { Machine } from 'src/app/models/Machine';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { Item } from '../../production/set-line-layout/Item';

@Component({
  selector: 'app-view-machine-list',
  templateUrl: './view-machine-list.component.html',
  styleUrls: ['./view-machine-list.component.css']
})
export class ViewMachineListComponent implements OnInit{
  machineList : Machine[] = [];
  machineInProcess : Machine = new Machine();
  processHappening : boolean = false;

  machineId : number  = 0;
  machineModel : string = "";
  machineType: string = "";
  perHourProduction : number = 0;
  otherInfo : string = "";
  assemblyLineId: number = 0;
  assemblyLineName: string = "";

  constructor(private constantsService: ConstantsService, private accessControlService: AccessControlService){}

  ngOnInit(): void {
    this.loadAssemblyLinesFromBackend();
  }

  isUpdating(machine: Machine):boolean{
    if(this.machineInProcess==machine) return true;
    return false;
  }

  loadAssemblyLinesFromBackend(){
    this.machineList = [];

    let data = {
        "operation":"gmaal",
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
        let machines_and_assigned_line = data.MACHINE_AND_ASSIGNED_LINE;

        for(let i=0; i<machines_and_assigned_line.length; i++){
          this.machineList.push(
            {
              machineId: machines_and_assigned_line[i].machineId,
              machineModel: machines_and_assigned_line[i].machineModel,
              machineType: machines_and_assigned_line[i].machineType,
              perHourProduction: machines_and_assigned_line[i].perHourProduction,
              otherInfo:  machines_and_assigned_line[i].otherInfo,
              assemblyLineId: machines_and_assigned_line[i].assemblyLineId,
              assemblyLineName: machines_and_assigned_line[i].name
            }
          );
        }
      }
    )
    .catch((err)=>{
      console.log(err);
    })
  }


  editInfo(machine : Machine) : void{
    this.machineInProcess = machine;
    this.processHappening = true;

    this.machineId = this.machineInProcess.machineId;
    this.machineModel = this.machineInProcess.machineModel;
    this.machineType = this.machineInProcess.machineType;
    this.perHourProduction = this.machineInProcess.perHourProduction;
    this.otherInfo = this.machineInProcess.otherInfo;
    this.assemblyLineId = this.machineInProcess.assemblyLineId;
    this.assemblyLineName = this.machineInProcess.assemblyLineName;
  }

  confirmChange(){
    let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";
    let data={
        "operation":"umi",
        "machineId": this.machineId,
        "machineModel": this.machineModel,
        "machineType": this.machineType,
        "perHourProduction": this.perHourProduction,
        "otherInfo": this.otherInfo,
        "assemblyLineId": this.assemblyLineId,
        "assemblyLineName": this.assemblyLineName,
        "userHash": this.accessControlService.getUser().userHash
    }

    console.log("DEBUG: CONFIRM UPDATE: ");
    console.log(data);

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
      this.machineInProcess = new Machine();
      this.loadAssemblyLinesFromBackend();
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  
  deleteInfo(machine:Machine):void{
    this.machineId = machine.machineId;
    this.machineModel = machine.machineModel;
    this.machineType = machine.machineType;
    this.perHourProduction = machine.perHourProduction;
    this.otherInfo = machine.otherInfo;
    this.assemblyLineId = machine.assemblyLineId;
    this.assemblyLineName = machine.assemblyLineName;

    let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";
    let data={
        "operation":"dm",
        "machineId": this.machineId,
        "machineModel": this.machineModel,
        "machineType": this.machineType,
        "perHourProduction": this.perHourProduction,
        "otherInfo": this.otherInfo,
        "assemblyLineId": this.assemblyLineId,
        "assemblyLineName": this.assemblyLineName,    
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
