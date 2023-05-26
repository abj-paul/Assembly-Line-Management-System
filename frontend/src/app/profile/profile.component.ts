import { HttpClient } from '@angular/common/http';
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
  notifications: any[] = [];
  imageURL : string = "" ;

  constructor(private accessControlService: AccessControlService, private router : Router, private constantsService : ConstantsService, private http: HttpClient){}
  ngOnInit(): void {
    this.user = this.accessControlService.getUser();
    this.imageURL = this.imageURL+this.user.pic;
    this.getNotifications();
  }

  getNotifications():void{

    let url = this.constantsService.SERVER_IP_ADDRESS + this.accessControlService.getUser().role;
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
        this.notifications = data.notifications;
    })
    .catch((err)=>{
      console.log(err);
    });
}

deleteNotification(notificationId:number):void{
  let url = this.constantsService.SERVER_IP_ADDRESS + this.accessControlService.getUser().role;
  let data={
      "operation":"delete-notification",
      "notificationId": notificationId,
      "userHash":this.accessControlService.getUser().userHash
  }
  this.http.post(url, data).subscribe((data)=>{
    console.log(data);
    this.getNotifications();
  });
}

}
