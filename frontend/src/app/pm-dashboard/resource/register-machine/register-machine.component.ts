import { Component } from '@angular/core';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-register-machine',
  templateUrl: './register-machine.component.html',
  styleUrls: ['./register-machine.component.css']
})
export class RegisterMachineComponent {
  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService){}

  registerResouce(): void{
    const machineModel = (<HTMLInputElement>document.getElementById("machineModelId")).value;
    const machineType = (<HTMLInputElement>document.getElementById("machineType")).value;
    let otherInfo = (<HTMLInputElement>document.getElementById("otherInfo")).value;
    const perHourProduction = (<HTMLInputElement>document.getElementById("perHourProduction")).value;

    console.log("DEBUG: Other Info");
    //if(otherInfo) otherInfo='NULL';
    console.log(otherInfo);

    let data = {
        "operation": "rm",
        "machineModel": machineModel,
        "machineType": machineType,
        "otherInfo": otherInfo,
        "perHourProduction": perHourProduction,
        "userHash":this.accessControlService.getUser().userHash
    }
    let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";


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
        console.log("Register Resource Request has been resolved!");
        return resolve.json()
        })
        .then((data)=>{
            console.log(data);
            (<HTMLElement>document.getElementById("resourceRegistrationStatus")).innerText = "Status: Successfully machine "+data.MachineId;
        })
        .catch((err)=>{
        console.log(err);
        });
}
}
