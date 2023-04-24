import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AccessControlService } from '../services/access-control.service';
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user : User = new User();
  constructor(private accessControlService: AccessControlService, private router : Router, private constantsService : ConstantsService){}
  ngOnInit(): void {
    this.user = this.accessControlService.getUser();
  }

  getNotifications():void{

    let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";
    let data={
        "operation":"gn",
        "userid": this.accessControlService.getUser().userid,
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
        console.log("Get Notification Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        console.log("DEBUG: notifications-"+data);
        for(let i=0; i<data.notifications.length; i++){
            let row = document.createElement('tr');
    
            let cell1 = document.createElement('td');
            cell1.innerText = data.notifications[i][0];
            let cell2 = document.createElement('td');
            cell2.innerText = data.notifications[i][1];
            let cell3 = document.createElement('td');
            let btn = document.createElement("button");
            btn.innerHTML = "Click!"
            cell3.appendChild(btn);

    
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
    
            (<HTMLElement>document.getElementById("notificationTable")).appendChild(row);
        }
    })
    .catch((err)=>{
    console.log(err);
    });
}

}
