import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssemblyLine } from '../models/AssemblyLine';
import { GeneralProductionInfo } from '../models/GeneralProductionInfo';
import { LineProduction } from '../models/LineProduction';
import { Machine } from '../models/Machine';
import { AccessControlService } from '../services/access-control.service';
import { ConstantsService } from '../services/constants.service';
import { SharedStuffsService } from '../services/shared-stuffs.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit{
  generalProductionInfo: GeneralProductionInfo[] = [];
  lineProductions : LineProduction[] = [];
  lineList: any = [];
  lineLayout: any = [];

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private http:HttpClient){}

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
  
  loadLineList(productionId:number){
    let url = this.constantsService.SERVER_IP_ADDRESS + "viewer";
    let data = {
        "operation":"gallist",
        "productionId":productionId,
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
      console.log("Get AssemblyLineList Request has been resolved!");
      return resolve.json()
  })
  .then((res)=>{
    this.lineList = res.AssemblyLineList;
    console.log("DEBug-> Line List: ");
    console.log(this.lineList);
  })
  .catch((err)=>{
    console.log(err);
  }); 
 }

  loadLineLayout(lineId:number){
    let url = this.constantsService.SERVER_IP_ADDRESS + "viewer";
    let data = {
        "operation":"glfgl",
        "lineId":lineId,
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
      console.log("Get Layout Request has been resolved!");
      return resolve.json()
  })
  .then((res)=>{
    this.lineLayout = res.LineLayout;
    console.log("DEBug-> LineLayout: ");
    console.log(this.lineLayout);
  })
  .catch((err)=>{
    console.log(err);
  }); 
  }

  showCongestionImage(imageUrl : string){
    window.open(imageUrl, '_blank');
  }
}
