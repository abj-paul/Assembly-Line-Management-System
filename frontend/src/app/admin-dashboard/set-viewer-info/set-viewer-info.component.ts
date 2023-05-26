import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-set-viewer-info',
  templateUrl: './set-viewer-info.component.html',
  styleUrls: ['./set-viewer-info.component.css']
})
export class SetViewerInfoComponent implements OnInit {
  companyPicure : any ;
  viewerInfo: string = "The fibers have been imported from Egypt and the machines have been imported from the Portugese. Malayan workers are used to sew the buttons into the cloths.";
  productionId: number = 1;
  viewerInfoRequestStatus="";

  productList: any;

  constructor(private navbarServie: NavbarService, private accessControlService : AccessControlService, private constantsService : ConstantsService, private http: HttpClient){}
  
  ngOnInit(): void {
    this.viewerInfoRequestStatus = "";
    this.loadProductList();
  }

  setViewerInfo(): void{

    let url = this.constantsService.SERVER_IP_ADDRESS + "admin";
    let data = {
        "operation":"svi",
        "userHash": this.accessControlService.getUser().userHash,
        "viewerInfo": this.viewerInfo,
        "productionId": this.productionId
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
        console.log("Set viewer info Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        // do nothing
        this.viewerInfoRequestStatus = data.Status;
    })
    .catch((err)=>{
    console.log(err);
    });
  }

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

  loadProductList():void{
    let url = this.constantsService.SERVER_IP_ADDRESS + "admin";
    let data = {
        "operation":"get-production-list",
        "userHash": this.accessControlService.getUser().userHash,
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
        console.log("Get product list Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
      this.productList = data.ProductList;
    })
    .catch((err)=>{
    console.log(err);
    });
  }
}
