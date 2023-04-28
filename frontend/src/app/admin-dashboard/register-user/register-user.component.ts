import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  user : User = new User();
  password: string = "";
  status : string = "";

  constructor(private accessControlService : AccessControlService, private constantsService: ConstantsService){}

  onSelectFile(event: Event) {
    console.log(event);
    const target= event.target as HTMLInputElement;
    if(target.files){
      var reader= new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload=(event:any) =>{
        this.user.pic=event.target.result;
        console.log("DEBUG: "+event.target.result);
      }
    }
  }

  registerUser():void{
    console.log("Picture: "+this.user.pic);

    let url = this.constantsService.SERVER_IP_ADDRESS + "admin";
    let data = {
        "operation":"rnu",
        "username": this.user.username,
        "password": this.password,
        "age": this.user.age,
        "generalInfo": this.user.general_info,
        "role": this.user.role,
        "pic": this.user.pic,
        "userHash": this.accessControlService.getUser().userHash
    }

    console.log(data);

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
        console.log("Registration Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        this.status = "User Id for registered user: "+data.RegisteredUserId;
    })
    .catch((err)=>{
    console.log(err);
    });

  }
}
