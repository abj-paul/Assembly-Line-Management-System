import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedStuffsService } from 'src/app/services/shared-stuffs.service';

@Component({
  selector: 'app-request-resource',
  templateUrl: './request-resource.component.html',
  styleUrls: ['./request-resource.component.css']
})
export class RequestResourceComponent {
  machineType : string = "";
  requestedMachineCount : number = 0;
  assignedLineId : number = 0;

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private sharedService : SharedStuffsService, private router : Router){}

  ngOnInit(): void {
    this.loadAssignedLineId(this.accessControlService.getUser().userid);
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
        console.log(data);
    })
    .catch((err)=>{
      console.log(err);
    });
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

        //this.loadLineLayout();
    })
    .catch((err)=>{
      console.log(err);
    });
  }

}
