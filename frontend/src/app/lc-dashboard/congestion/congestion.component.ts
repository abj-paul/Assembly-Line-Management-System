import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CongestionStatus } from 'src/app/models/CongestionStatus';
import { Machine } from 'src/app/models/Machine';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedStuffsService } from 'src/app/services/shared-stuffs.service';

@Component({
  selector: 'app-congestion',
  templateUrl: './congestion.component.html',
  styleUrls: ['./congestion.component.css']
})
export class CongestionComponent implements OnInit{
  productionTarget : number = 0;

  machineListInLayout: Machine[] =  []; //    {"assemblyLineId": 0, "assemblyLineName":"Default", "machineId":0, "machineModel": "default model", "machineType": "default type", "otherInfo":"Default info", "perHourProduction":2}
 
  assignedLineId : number = 0;
  congestionStatus : any = [];

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private sharedService : SharedStuffsService, private router : Router){}

  ngOnInit(): void {
    this.loadAssignedLineId(this.accessControlService.getUser().userid);

    const congestionStatusReloadTimeInSeconds = 10;
    setInterval(() => {
      if(this.accessControlService.getUser().role=="lineChief")
        this.loadAssignedLineId(this.accessControlService.getUser().userid);
    }, congestionStatusReloadTimeInSeconds * 1000);
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
        console.log("DEBUG: assigned Line -"+this.accessControlService.getUser().role);
        this.assignedLineId = data.AssignedAssemblyLineId;
        console.log(this.assignedLineId);

        this.loadLineLayout();
        this.loadCongestionStatus();
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

        this.machineListInLayout = data.Layout;
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  loadCongestionStatus(){
    let url = this.constantsService.SERVER_IP_ADDRESS + "layout";
    let data={
        "operation":"gcs",
        "assemblyLineId": this.assignedLineId,
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
        console.log("GET Congestion Status Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        console.log("DEBUG: Congestion Status -");
        this.congestionStatus = data.CongestionStatus;
        console.log(this.congestionStatus);

    })
    .catch((err)=>{
      console.log(err);
    });
  }

  showCongestionImage(imageUrl : string){
    window.open(imageUrl, '_blank');
  }
  openCamera(camera_link:string):void{
    console.log("CAmera lnk:");
    console.log(camera_link);
    window.open(camera_link, '_blank');
  }
 
}
