import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Machine } from 'src/app/models/Machine';
import { Item } from 'src/app/pm-dashboard/production/set-line-layout/Item';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedStuffsService } from 'src/app/services/shared-stuffs.service';

@Component({
  selector: 'app-view-line',
  templateUrl: './view-line.component.html',
  styleUrls: ['./view-line.component.css']
})
export class ViewLineComponent implements OnInit {
  productionTarget : number = 0;
  machineListInLayout: Machine[] = [];
  assignedLineId : number = 0;
  formattedDateTime : string = "";
  hourlyProductionTarget: number = 0;

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private sharedService : SharedStuffsService, private router : Router){}
  machineType : string = "";
  requestedMachineCount : number = 0;

  ngOnInit(): void {
    this.loadAssignedLineId(this.accessControlService.getUser().userid);

    const dateTime = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false
    };

    this.formattedDateTime = dateTime.toLocaleString("en-US");
    //console.log(formattedDateTime);
  }

  gotoLayoutEdit(){
    this.router.navigate(["set-assembly-line-layout"]);
  }

  loadAssignedLineId(userId: number){
    let url = this.constantsService.SERVER_IP_ADDRESS + "lineChief";
    let data={
        "operation":"gali",
        "userid": userId,
        "userHash":this.accessControlService.getUser().userHash
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
        console.log("GET Assigned Line Id Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        console.log("DEBUG: assigned Line -");
        this.assignedLineId = data.AssignedAssemblyLineId;
        console.log(this.assignedLineId);

        this.loadLineLayout();
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  loadLineLayout(){
    let url = this.constantsService.SERVER_IP_ADDRESS + "lineChief";
    let data={
        "operation":"glfgl",
        "lineId": this.assignedLineId,
        "userHash":this.accessControlService.getUser().userHash
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
        console.log("Get Line Layout Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        console.log("DEBUG: Line Layout-");
        console.log(data.Layout);

        let tempLayout = data.Layout;
        this.machineListInLayout = [];
        for(let i=0 ;i<tempLayout.length; i++){
          this.machineListInLayout.push(
            {
              assemblyLineId: tempLayout[i].assemblyLineId,
              assemblyLineName: tempLayout[i].name,
              machineId: tempLayout[i].machineId,
              machineModel : tempLayout[i].machineModel,
              machineType : tempLayout[i].machineType,
              perHourProduction : tempLayout[i].perHourProduction,
              otherInfo : tempLayout[i].otherInfo
            }
          );
        }
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  requestResource(){
    let url = this.constantsService.SERVER_IP_ADDRESS + "lineChief";
    let data={
        "operation":"request-resource",
        "lineId": this.assignedLineId,
        "userId":this.accessControlService.getUser().userid,
        "machineType": this.machineType,
        "requestedMachineCount": this.requestedMachineCount,
        "userHash":this.accessControlService.getUser().userHash
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
        console.log("Get Line Layout Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        console.log("DEBUG: Line Layout-");
        console.log(data.Layout);

        let tempLayout = data.Layout;
        this.machineListInLayout = [];
        for(let i=0 ;i<tempLayout.length; i++){
          this.machineListInLayout.push(
            {
              assemblyLineId: tempLayout[i].assemblyLineId,
              assemblyLineName: tempLayout[i].name,
              machineId: tempLayout[i].machineId,
              machineModel : tempLayout[i].machineModel,
              machineType : tempLayout[i].machineType,
              perHourProduction : tempLayout[i].perHourProduction,
              otherInfo : tempLayout[i].otherInfo
            }
          );
        }
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  setHourlyTarget():void {
    let url = this.constantsService.SERVER_IP_ADDRESS + "lineChief";
    let data={
        "operation":"set-hourly-production",
        "lineId": this.assignedLineId,
        "productionId": this.sharedService.productionId,
        "hourlyProductionTarget": this.hourlyProductionTarget,
        "userHash":this.accessControlService.getUser().userHash
    }

    console.log("Frontend DEBUG hourly target set-> ");
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
        console.log("Set hourly Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}
