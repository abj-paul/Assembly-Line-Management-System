import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-congestion-issue-report',
  templateUrl: './congestion-issue-report.component.html',
  styleUrls: ['./congestion-issue-report.component.css']
})
export class CongestionIssueReportComponent implements OnInit {
  congestionIssues : any;

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private http:HttpClient, private router : Router){}

  ngOnInit(): void {
    this.loadCongestionIssues();
  }

  loadCongestionIssues():void {
    let url = this.constantsService.SERVER_IP_ADDRESS + "viewer";
    let data = {
        "operation": "get_assembly_line_issues_reports",
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
      console.log("Get assembly line issues has been resolved!");
      return resolve.json()
  })
  .then((res)=>{
    this.congestionIssues = res.CongestionIssues;
  })
  .catch((err)=>{
    console.log(err);
  }); 
  }
}
