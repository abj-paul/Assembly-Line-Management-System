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

  constructor(private accessControlService : AccessControlService, private constantsService : ConstantsService){}

  ngOnInit(): void {
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
      console.log("View User Request has been resolved!");
      return resolve.json()
        })
        .then((data)=>{
            console.log(data);
      for(let i=0; i<data.Status.length; i++){
          let row = document.createElement('tr');

          let cell1 = document.createElement('td');
          cell1.innerText = data.Status[i][0];
          let cell2 = document.createElement('td');
          cell2.innerText = data.Status[i][1];
            let cell3 = document.createElement('td');
          cell3.innerText = data.Status[i][2];
            let cell4 = document.createElement('td');
          cell4.innerText = data.Status[i][3];

          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          row.appendChild(cell4);

          this.userList.push({
            "userid": <string>data.Status[i][0],
            "username": <string> data.Status[i][1],
            "age": <number> data.Status[i][4],
            "role": <string> data.Status[i][2],
            "general_info": <string> data.Status[i][3],
            "userHash": "none"
          });

      }
        })
        .catch((err)=>{
      console.log(err);
        });

  }
}
