import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedStuffsService } from 'src/app/services/shared-stuffs.service';

@Component({
  selector: 'app-assign-supervisor',
  templateUrl: './assign-supervisor.component.html',
  styleUrls: ['./assign-supervisor.component.css']
})
export class AssignSupervisorComponent implements OnInit{
  assemblyLineId: Number = 1;
  supervisorId: Number = 1;
  
  assemblyLineList: any;
  availableSupervisorList: any;

  constructor(private http: HttpClient, private accessControlService: AccessControlService, private sharedService: SharedStuffsService, private constantsService: ConstantsService){}
  ngOnInit(): void {
    this.loadAssemblyLineList();
    this.loadAvailableSupevisorList();
  }

  assignSupervisorToLine():void{
    let data = {
      "operation": "assign-supervisor",
      "userId": this.supervisorId,
      "assemblyLineId": this.assemblyLineId,
      "userHash":this.accessControlService.getUser().userHash
  }

  let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";
    this.http.post(url, data).subscribe((data)=>{
      console.log(data);
    })
  }

  loadAssemblyLineList():void{
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
        this.assemblyLineList = data.AssemblyLineList;
      }
    )
    .catch((err)=>{
      console.log(err);
    })
  }

  loadAvailableSupevisorList():void{
    let data = {
      "operation":"gasl",
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
          console.log("Get available supervisor list Request has been resolved!");
          return resolve.json()
    })
  .then((data)=>{
      this.availableSupervisorList = data.AvailableSupervisorList;
    }
  )
  .catch((err)=>{
    console.log(err);
  })
  }
}
