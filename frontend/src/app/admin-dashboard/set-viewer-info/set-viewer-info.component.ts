import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-set-viewer-info',
  templateUrl: './set-viewer-info.component.html',
  styleUrls: ['./set-viewer-info.component.css']
})
export class SetViewerInfoComponent {
  companyPicure : any ;

  constructor(private navbarServie: NavbarService, private accessControlService : AccessControlService, private constantsService : ConstantsService, private http: HttpClient){}

  onSelectFile(event: any) {
       this.companyPicure = event.target.files[0];
  }

  uploadImage(userId : number, pic: any){
    console.log("DEBUG: "+ this.companyPicure);

    /*
    const formData = new FormData();
    formData.set("profile", this.profilePicture);
    */
    const formData = new FormData();
    formData.append('profile', pic, pic.name);
    formData.append('userId', ''+userId);

    this.http.post(this.constantsService.SERVER_IP_ADDRESS+"uploadImage", formData).subscribe((response)=>{
        console.log("Sending iamge upload request....");
        console.log(response);
    })

  }
}
