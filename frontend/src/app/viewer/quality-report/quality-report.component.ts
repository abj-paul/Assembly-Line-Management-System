import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-quality-report',
  templateUrl: './quality-report.component.html',
  styleUrls: ['./quality-report.component.css']
})
export class QualityReportComponent implements OnInit{

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private http:HttpClient, private router : Router){}


  qualityReports : any;

  ngOnInit(): void {
    this.loadQualityReports();
  }

  loadQualityReports():void {
    let url = this.constantsService.SERVER_IP_ADDRESS + "viewer";
    let data = {
        "operation": "get_quality_reports",
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
      console.log("Get QUALITY REPORTS has been resolved!");
      return resolve.json()
  })
  .then((res)=>{
    console.log("Quality Reports: ");
    this.qualityReports = res.QualityReports;
    console.log(this.qualityReports);
  })
  .catch((err)=>{
    console.log(err);
  }); 
  }

}
