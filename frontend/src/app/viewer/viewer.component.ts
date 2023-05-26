import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssemblyLine } from '../models/AssemblyLine';
import { GeneralProductionInfo } from '../models/GeneralProductionInfo';
import { LineProduction } from '../models/LineProduction';
import { Machine } from '../models/Machine';
import { AccessControlService } from '../services/access-control.service';
import { ConstantsService } from '../services/constants.service';
import { SharedStuffsService } from '../services/shared-stuffs.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent{
  currentUserRole : string = this.accessControlService.getUser().role;

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private http:HttpClient, private router : Router){}
  goBack(){
    if(this.accessControlService.getUser().role=='Admin')
      this.router.navigate(["/admin-dashboard"]);
    else if(this.accessControlService.getUser().role=='productionManager')
      this.router.navigate(["/pm-dashboard/production"]);
    else if(this.accessControlService.getUser().role=='lineChief')
      this.router.navigate(["/lc-dashboard/layout"]);
    else if(this.accessControlService.getUser().role=='supervisor')
      this.router.navigate(["/supervisor-dashboard"]);
    else if(this.accessControlService.getUser().role=='viewer')
      this.router.navigate(["/viewer"]);
    else this.router.navigate(["/home"]);
  }

  logout(){
    let data = {
      "operation": "logout",
      "userHash": this.accessControlService.getUser().userHash
    }
    let url = this.constantsService.SERVER_IP_ADDRESS + this.accessControlService.getUser().role;


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
      body: JSON.stringify(data)
  })
    .then((resolve)=>{
      console.log("Logout Resource Request has been resolved!");
      return resolve.json()
    })
    .then((data)=>{
        console.log(data);
        this.accessControlService.removeUser();
        this.router.navigate(["login"]);
    })
    .catch((err)=>{
      console.log(err);
      this.router.navigate(["login"]);
    });
  }
}
