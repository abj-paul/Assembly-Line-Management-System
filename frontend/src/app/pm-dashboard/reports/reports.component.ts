import { Component, OnInit } from '@angular/core';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  hourlyProductionReports : any[] = [];

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService){}

  ngOnInit(): void {
    this.getHourlyProductionReport();
  }

  getHourlyProductionReport(): void{
    let url = this.constantsService.SERVER_IP_ADDRESS + "viewer";
    let data = {
        "operation":"vhpr",
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
      console.log("View hourly Report Request has been resolved!");
      return resolve.json()
    })
    .then((data)=>{
      console.log(data);
      this.hourlyProductionReports = data.ProductionReport;
      /*
      for(let i=0; i<data.ProductionReport.length; i++){
          let row = document.createElement('tr');
  
          let cell1 = document.createElement('td');
          cell1.innerText = data.ProductionReport[i][1];
          let cell2 = document.createElement('td');
          cell2.innerText = data.ProductionReport[i][0];
          let cell3 = document.createElement('td');
          cell3.innerText = data.ProductionReport[i][2];
          let cell4 = document.createElement('td');
          cell4.innerText = data.ProductionReport[i][3];
          let cell5 = document.createElement('td');
          cell5.innerText = data.ProductionReport[i][4];
  
          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          row.appendChild(cell4);
          row.appendChild(cell5);

  
          document.getElementById("hourlyProductionReportTable").appendChild(row);
      }
      */
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  generateMemoPDF(reportId: number){
    const BASE_PDF_URL = 'http://localhost:1401/viewer/report/';

    let url = this.constantsService.SERVER_IP_ADDRESS + "viewer";
    let data = {
        "operation": "generate-single-hourly-production-memo",
        "reportId":reportId,
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
    const pdfUrl = BASE_PDF_URL + res.GeneratedPdfFileName;
    window.open(pdfUrl, '_blank');
  })
  .catch((err)=>{
    console.log(err);
  }); 
  }

}
