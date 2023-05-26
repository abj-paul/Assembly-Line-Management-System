import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedStuffsService } from 'src/app/services/shared-stuffs.service';

@Component({
  selector: 'app-submit-report',
  templateUrl: './submit-report.component.html',
  styleUrls: ['./submit-report.component.css']
})
export class SubmitReportComponent {
  constructor(private accessControlService : AccessControlService, private constantsService: ConstantsService, private http : HttpClient, private sharedService: SharedStuffsService){}

  hourlyProductionAmountReached : number = 0;
  unit : string = "(e.g. Number of Completed Garments)";
  comment : string = "(e.g. The production has been good this hour)";

  // Quality Report
  quality_totalProductCount : number = 0;
  quality_defectedProductCount : number = 0;
  qualityUnit : string = "(e.g. Number of Completed Garments)";
  commentOnQualityInspection : string = "(e.g. Some quality issues occurred due to worker inexperience)";



  setHourlyProductionAmount(){

    console.log("DEBUG->hourly production->production id = "+this.sharedService.getProductionId());
   
    let url = this.constantsService.SERVER_IP_ADDRESS + "supervisor";
    let data = {
        "operation":"shpr",
        "userid": this.accessControlService.getUser().userid,
        "unit": this.unit,
        "productionAmount": this.hourlyProductionAmountReached,
        "productionId": this.sharedService.getProductionId(),
        "comment": this.comment,
        "userHash": this.accessControlService.getUser().userHash
    };
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
        console.log("Hourly Production Report Submission Request has been resolved!");
        return resolve.json()
        })
        .then((data)=>{
            console.log(data.ReportId);
        })
        .catch((err)=>{
        console.log(err);
        });
    }

submitQualityReport():void{
    let url = this.constantsService.SERVER_IP_ADDRESS + "supervisor";
    let data = {
        "operation":"submit-quality-report",
        "userid": this.accessControlService.getUser().userid,
        "unit": this.qualityUnit,
        "TotalProductCount": this.quality_totalProductCount,
        "DefectedProductCount": this.quality_defectedProductCount,
        "productionId": this.sharedService.getProductionId(),
        "comment": this.commentOnQualityInspection,
        "userHash": this.accessControlService.getUser().userHash
    };
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
        console.log("Quality Report Submission Request has been resolved!");
        return resolve.json()
        })
        .then((data)=>{
            console.log("Quality Report ID : "+ data.ReportId);
        })
        .catch((err)=>{
        console.log(err);
        });
    }
}
