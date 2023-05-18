import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessControlService } from '../services/access-control.service';
import { ConstantsService } from '../services/constants.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  loginStatus: string = "";
  role: string = "";
  pic: string = "http://localhost:1401/profile/";

  
  constructor(private constantsService: ConstantsService, private router: Router, private accessControlService: AccessControlService) { }

  authenticate(){
    let url = "";
    if(this.role=="admin") url = this.constantsService.SERVER_IP_ADDRESS + "admin";
    else if(this.role=="productionManager") url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";
    else if(this.role=="lineChief") url = this.constantsService.SERVER_IP_ADDRESS + "lineChief";
    else if(this.role=="supervisor") url = this.constantsService.SERVER_IP_ADDRESS + "supervisor";

    const data = {
      "operation":"login",
      "username": this.username,
      "password": this.password
    };

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
          console.log("Authentication has been done!");
          return resolve.json()
      })
      .then((data)=>{
          console.log(data.authentication);
          this.loginStatus = "Status: "+ data.authentication;
          
          sessionStorage.setItem("userid", data.userInfo.userid);
          sessionStorage.setItem("username", data.userInfo.username);
          sessionStorage.setItem("password", data.userInfo.password);
          sessionStorage.setItem("age", data.userInfo.age);
          sessionStorage.setItem("role", data.userInfo.role);
          sessionStorage.setItem("general_info", data.userInfo.general_info);
          sessionStorage.setItem("userHash", data.userHash);
          
         console.log("IMAGE AFTER LOGIN: "+data.userInfo.pic);
         this.accessControlService.setUser({
          "userid": <number>data.userInfo.userid,
          "username": <string>data.userInfo.username,
          "age": <number>data.userInfo.age,
          "role": <string>data.userInfo.role,
          "general_info": <string>data.userInfo.general_info,
          "userHash": <string>data.userHash,
          "pic" : this.pic + data.userInfo.pic
         });

        console.log("DEBUG-Login: image - "+data.userInfo.pic);
        if(data.nextPage!="none") {
          if(data.nextPage=="admin-dashboard.html") this.router.navigate(["admin-dashboard"])
          else if(data.nextPage=="production-manager-dashboard.html") this.router.navigate(["pm-dashboard"])
          else if(data.nextPage=="supervisor-dashboard.html") this.router.navigate(["supervisor-dashboard"])
          else if(data.nextPage=="line-chief-dashboard.html") this.router.navigate(["lc-dashboard"])
        }
      })
      .catch((err)=>{
          console.log(err);
      });
  }

}

