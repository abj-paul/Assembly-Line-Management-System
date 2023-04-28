import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit {
  userList : User[] = [];
  userInProcess : User = new User();
  processHappening : boolean = false;

  userid:number = 0;
  username:string = "";
  password: string = "";
  role: string = "";
  age : number = 0;
  general_info: string = "";

  constructor(private accessControlService : AccessControlService, private constantsService : ConstantsService){}
  ngOnInit(): void {
    this.loadUserTable();
  }
  isUpdating(user: User):boolean{
    if(this.userInProcess==user) return true;
    return false;
  }

  editInfo(user:User) : void{
    this.userInProcess = user;
    this.processHappening = true;

    this.userid = this.userInProcess.userid;
    this.username = this.userInProcess.username;
    this.age = this.userInProcess.age;
    this.password = <string>sessionStorage.getItem("password");
    this.role = this.userInProcess.role;
    this.general_info = this.userInProcess.general_info;
  }

  confirmChange(){
    let url = this.constantsService.SERVER_IP_ADDRESS + "admin";
    let data={
        "operation":"eui",
        "username": this.username,
        "password": this.password,
        "age": this.age,
        "generalInfo": this.general_info,
        "role": this.role,
        "userid": this.userid,
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
        console.log("Edit User Info Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
      this.processHappening = false;
      this.userInProcess = new User();
      this.loadUserTable();
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  deleteInfo(user:User):void{
    this.userid = user.userid;
    let url = this.constantsService.SERVER_IP_ADDRESS + "admin";
    let data={
        "operation":"du",
        "userid": this.userid,
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
        console.log("Delete User Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
      this.loadUserTable();
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  loadUserTable(){
    let url = this.constantsService.SERVER_IP_ADDRESS + "admin";
    let data = {"operation":"vru", "userHash": this.accessControlService.getUser().userHash};
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
        body: JSON.stringify(data),
    })
        .then((resolve)=>{
      console.log("Load user table Request has been resolved!");
      return resolve.json()
        })
        .then((data)=>{
            console.log(data);
      this.userList = [];
      for(let i=0; i<data.Status.length; i++){
          this.userList.push({
            "userid": <number>data.Status[i][0],
            "username": <string> data.Status[i][1],
            "age": <number> data.Status[i][4],
            "role": <string> data.Status[i][2],
            "general_info": <string> data.Status[i][3],
            "userHash": "none",
            "pic": data.Status[i][5]
          });

      }
    })
    .catch((err)=>{
        console.log(err);
    });
  }
}
