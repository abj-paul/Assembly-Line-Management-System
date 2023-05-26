import { Component, OnInit } from '@angular/core';
import { AssemblyLine } from 'src/app/models/AssemblyLine';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';


@Component({
  selector: 'app-register-assembly-line',
  templateUrl: './register-assembly-line.component.html',
  styleUrls: ['./register-assembly-line.component.css']
})
export class RegisterAssemblyLineComponent implements OnInit {
  //floor : number = 0;
  LCUserId:number = 0;
  lineChiefList : any;

  constructor(private contantsService: ConstantsService, private accessControlService: AccessControlService){}
  ngOnInit(): void {
    this.loadFreeLineChiefList();
  }

  registerAssemblyLine():void{
    const name = (<HTMLInputElement>document.getElementById("nameAssemblyLine")).value;
    const otherInfo = (<HTMLInputElement>document.getElementById("otherInfo")).value;
    const capacity = (<HTMLInputElement>document.getElementById("capacity")).value;
  

    let data = {
        "operation": "ral",
        "name": name,
        "capacity": capacity,
        "LCUserId": this.LCUserId,
        "createdBy": this.accessControlService.getUser().userid,
        "otherInfo": otherInfo,
        "userHash":this.accessControlService.getUser().userHash
    }
    let url = this.contantsService.SERVER_IP_ADDRESS + "productionManager";


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
            console.log("Assembly Line Register Request has been resolved!");
            return resolve.json()
        })
        .then((data)=>{
            console.log(data);
            if(data.Authentication!="INVALID_USER_HASH")
              (<HTMLElement>document.getElementById("assemblyLineRegistrationStatus")).innerText = "Status: Assembly Line Registration Successful."
        })
        .catch((err)=>{
          console.log(err);
        });
  }

  loadFreeLineChiefList():void{
    let data = {
      "operation": "get-available-line-chief-list",
      "userHash":this.accessControlService.getUser().userHash
  }
  let url = this.contantsService.SERVER_IP_ADDRESS + "productionManager";

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
          console.log("Get available line chiefs Request has been resolved!");
          return resolve.json()
      })
      .then((data)=>{
        this.lineChiefList = data.AvailableLineChiefList;
      })
      .catch((err)=>{
        console.log(err);
      });
  }

}
