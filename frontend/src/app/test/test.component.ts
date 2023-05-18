import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
    profilePicture : any = null;
    userProfilePicture : string = "";

    constructor(private http : HttpClient){}
    
    ngOnInit(): void {
        this.getProfileImage();
    }

    onSelectFile(event: any) {
        /*
        console.log(event);
        const target= event.target as HTMLInputElement;
        if(target.files){
          let reader= new FileReader();
          reader.readAsDataURL(target.files[0]);
          reader.onload=(event:any) =>{
            this.profilePicture = event.target.result;
          }
        }*/
        this.profilePicture = event.target.files[0];
      }

      uploadImage(){
        console.log("DEBUG: "+ this.profilePicture);

        /*
        const formData = new FormData();
        formData.set("profile", this.profilePicture);
        */
        const formData = new FormData();
        formData.append('profile', this.profilePicture, this.profilePicture.name);
        formData.append('userId', "2");

        this.http.post("http://localhost:2050/uploadImage", formData).subscribe((response)=>{
            console.log("Sending request....");
            console.log(response);
        })

      }

      getProfileImage(){
        this.http.get<any>("http://localhost:2050/2").subscribe((response)=>{
            console.log(response);
            this.userProfilePicture = response.profile;
        })
      }

}
