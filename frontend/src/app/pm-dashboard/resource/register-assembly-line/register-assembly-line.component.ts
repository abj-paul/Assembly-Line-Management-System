import { Component } from '@angular/core';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-register-assembly-line',
  templateUrl: './register-assembly-line.component.html',
  styleUrls: ['./register-assembly-line.component.css']
})
export class RegisterAssemblyLineComponent {
  constructor(private contantsService: ConstantsService, private accessControlService: AccessControlService){}

  registerAssemblyLine():void{
    const name = (<HTMLInputElement>document.getElementById("nameAssemblyLine")).value;
    const otherInfo = (<HTMLInputElement>document.getElementById("otherInfo")).value;
    const capacity = (<HTMLInputElement>document.getElementById("capacity")).value;

    let data = {
        "operation": "ral",
        "name": name,
        "capacity": capacity,
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
}
