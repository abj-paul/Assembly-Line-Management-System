import { Component } from '@angular/core';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-download-data',
  templateUrl: './download-data.component.html',
  styleUrls: ['./download-data.component.css']
})
export class DownloadDataComponent {

  constructor(private constantsService: ConstantsService, private accessControlService : AccessControlService){}

  downloadDatabase(): void{
    var csv = 'a,b,c\n1,2,3\n';

    let url = this.constantsService.SERVER_IP_ADDRESS + "admin";
    let data = {
        "operation":"gadd",
        "userHash": this.accessControlService.getUser().userHash
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
        console.log("Download Data Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        console.log(data);
        let content = new Blob([JSON.stringify(data.Datasets)]);
        let a = <HTMLAnchorElement>document.getElementById('downloadDataLink');
        a.href = URL.createObjectURL(content);
    })
    .catch((err)=>{
    console.log(err);
    });
}

}
