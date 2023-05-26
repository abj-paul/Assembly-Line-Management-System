import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralProductionInfo } from 'src/app/models/GeneralProductionInfo';
import { LineProduction } from 'src/app/models/LineProduction';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-production-status',
  templateUrl: './production-status.component.html',
  styleUrls: ['./production-status.component.css']
})
export class ProductionStatusComponent implements OnInit{
  generalProductionInfo: GeneralProductionInfo[] = [];
  lineProductions : LineProduction[] = [];

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private http:HttpClient, private router : Router){}

  ngOnInit(): void {
    this.getGeneralProductionInfo();
  }

  getGeneralProductionInfo():void{
    let url = this.constantsService.SERVER_IP_ADDRESS + "viewer";
    let data = {
        "operation":"ggpi",
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
      console.log("Get general production info Request has been resolved!");
      return resolve.json()
  })
  .then((res)=>{
    this.generalProductionInfo = [];

    console.log(res);
    res = res.GeneralProductionInfo;
    for(let i=0; i<res.length; i++){
      this.lineProductions = [];
      for(let j=0; j<res[i].lineProductions.length; j++) {
        this.lineProductions.push(
          {
            "name": res[i].lineProductions[j].name,
            "TotalProduction": res[i].lineProductions[j].TotalProduction
          }
        );
      }

      this.generalProductionInfo.push(
        {
          "productionId": res[i].productionId,
          "productName" : res[i].productName, 
          "viewerInfo" : res[i].viewerInfo,
          "productionTarget" : res[i].productionTarget,
          "productionReached" : res[i].productionReached,
          "assemblyLineList" : res[i].assemblyLineList,
          "lineProductions" : this.lineProductions
        }
      );
    }
    console.log(this.generalProductionInfo);
  })
  .catch((err)=>{
    console.log(err);
  });
  }
}
