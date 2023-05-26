import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralProductionInfo } from 'src/app/models/GeneralProductionInfo';
import { LineProduction } from 'src/app/models/LineProduction';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-reports-memos',
  templateUrl: './reports-memos.component.html',
  styleUrls: ['./reports-memos.component.css']
})
export class ReportsMemosComponent implements OnInit{
  BASE_PDF_URL : string = 'http://localhost:1401/viewer/report/';


  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private http:HttpClient, private router : Router){}
  ngOnInit(): void {

  }
  openPDF(){
    let url = this.constantsService.SERVER_IP_ADDRESS + "viewer";
    let data = {
        "operation":"gpr",
        "userHash": this.accessControlService.getUser().userHash
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
      console.log("Generate PDF Request has been resolved!");
      return resolve.json()
  })
  .then((res)=>{
    const pdfUrl = this.BASE_PDF_URL + res.GeneratedPdfFileName;
    window.open(pdfUrl, '_blank');
  })
  .catch((err)=>{
    console.log(err);
  }); 
      
  }

  goBack(){
    if(this.accessControlService.getUser().role=='admin')
      this.router.navigate(["/admin-dashboard/production"]);
    else if(this.accessControlService.getUser().role=='productionManager')
      this.router.navigate(["/pm-dashboard/production"]);
    else if(this.accessControlService.getUser().role=='lineChief')
      this.router.navigate(["/lc-dashboard/layout"]);
    else if(this.accessControlService.getUser().role=='supervisor')
      this.router.navigate(["/supervisor-dashboard"]);
    else this.router.navigate(["/home"]);
  }
}
