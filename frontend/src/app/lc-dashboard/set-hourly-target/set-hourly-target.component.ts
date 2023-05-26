import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedStuffsService } from 'src/app/services/shared-stuffs.service';

@Component({
  selector: 'app-set-hourly-target',
  templateUrl: './set-hourly-target.component.html',
  styleUrls: ['./set-hourly-target.component.css']
})
export class SetHourlyTargetComponent implements OnInit{
  assignedLineId : number = 0;
  formattedDateTime : string = "";
  hourlyProductionTarget: number = 0;
  
  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private sharedService : SharedStuffsService, private router : Router){}

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
