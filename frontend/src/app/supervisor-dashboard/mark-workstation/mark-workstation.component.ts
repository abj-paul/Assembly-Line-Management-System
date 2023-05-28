import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CongestionStatus } from 'src/app/models/CongestionStatus';
import { Machine } from 'src/app/models/Machine';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedStuffsService } from 'src/app/services/shared-stuffs.service';

@Component({
  selector: 'app-mark-workstation',
  templateUrl: './mark-workstation.component.html',
  styleUrls: ['./mark-workstation.component.css']
})
export class MarkWorkstationComponent {
  productionTarget : number = 0;

  machineListInLayout: Machine[] =  []; //    {"assemblyLineId": 0, "assemblyLineName":"Default", "machineId":0, "machineModel": "default model", "machineType": "default type", "otherInfo":"Default info", "perHourProduction":2}
 
  assignedLineId : number = 0;
  congestionStatus : any = [];

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private sharedService : SharedStuffsService, private router : Router, private http: HttpClient){}

  ngOnInit(): void {
    this.loadAssignedLineId(this.accessControlService.getUser().userid);
    
    /*
    const congestionStatusReloadTimeInSeconds = 10;
    setInterval(() => {
      this.loadAssignedLineId(this.accessControlService.getUser().userid);
      //this.loadCongestionStatus();
    }, congestionStatusReloadTimeInSeconds * 1000);*/
    
    /*
    const lineLayoutReloadTimeInSeconds = 100;
    setInterval(() => {
      this.loadLineLayout();
    }, lineLayoutReloadTimeInSeconds * 1000);
    */
  }


  gotoLayoutEdit(){
    this.router.navigate(["set-assembly-line-layout"]);
  }

  loadAssignedLineId(userId: number){
    let url = this.constantsService.SERVER_IP_ADDRESS + "supervisor";
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
        this.loadCongestionStatus();
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  loadLineLayout(){
    let url = this.constantsService.SERVER_IP_ADDRESS + "supervisor";
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
  markWorkstation(machineId:number, newVal: number):void{
    // add a border
    // save in backend
    let url = this.constantsService.SERVER_IP_ADDRESS + "supervisor";
    let data={
        "operation":"mark-workstation",
        "machineId": machineId,
        "markStatus": newVal,
        "userHash":this.accessControlService.getUser().userHash
    }

    this.http.post(url, data).subscribe((data)=>{
      console.log(data);
      this.loadCongestionStatus();
    })
  }
}
