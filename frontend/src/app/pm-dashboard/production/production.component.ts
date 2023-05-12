import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AssemblyLine } from 'src/app/models/AssemblyLine';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedStuffsService } from 'src/app/services/shared-stuffs.service';
import { Box } from 'src/app/pm-dashboard/production/set-line-layout/Box';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit{

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private router: Router, private sharedService : SharedStuffsService){}

  ngOnInit(): void {
    this.populateAssemblyLineList();
  }

  assemblyLines : AssemblyLine[] = [];

  loadLayoutPage():void{
      this.__registerTotalProductionTarget();
      //const assignedLCId = (<HTMLInputElement>document.getElementById("assignedLCId")).value;
      //sessionStorage.setItem("assignedLCId", assignedLCId);
      //this.router.navigate(["assembly-line-layout-set"]);
      this.router.navigate(["set-assembly-line-layout"]);

  }

  __registerTotalProductionTarget():void{
    var checkboxes = document.getElementsByName("assemblyLineCheckbox");

    this.sharedService.selected_assembly_lines_for_production = [];
    for (var i=0; i<checkboxes.length; i++) {
       if ((<HTMLInputElement>checkboxes[i]).checked) {
          this.sharedService.selected_assembly_lines_for_production.push(
            {
              "name": (<HTMLElement>checkboxes[i].nextSibling).innerText,
              "id": this.assemblyLines[i].assemblyLineId,
              "capacity": this.assemblyLines[i].capacity,
              "lineChiefId": ""+this.assemblyLines[i].LCUserId
            }
          );
       }
    }
    console.log("DEBUG: Selected lines : "+this.sharedService.selected_assembly_lines_for_production);
    //sessionStorage.setItem("selectedAssemblyLines", JSON.stringify(checkboxesChecked));

    let totalProductionTarget = (<HTMLInputElement>document.getElementById("totalProductionTarget")).value;
    sessionStorage.setItem("totalProductionTarget", totalProductionTarget);
  }

  populateAssemblyLineList(): void{

    let data = {
        "operation":"gallist",
        "userHash":this.accessControlService.getUser().userHash
    }
    let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";


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
            console.log("Assembly Line View List Request has been resolved!");
            return resolve.json()
        })
        .then((data)=>{
            console.log(data);
            this.assemblyLines = data.AssemblyLineList;

            // <input type="checkbox" name="assemblyLine" value="1" /> <label>Select Assembly Line</label>
            for(let i=0; i<this.assemblyLines.length; i++){

                let div = document.createElement("div");
                div.setAttribute("class", "form-check");

                let label = document.createElement("label");
                label.innerHTML = this.assemblyLines[i].name;
                label.setAttribute("class", "form-check-label");
                label.setAttribute("for", "checkbox"+i);

                let checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox"); 
                checkbox.setAttribute("name", "assemblyLineCheckbox");
                checkbox.setAttribute("value", ""+this.assemblyLines[i].assemblyLineId);
                checkbox.setAttribute("class", "form-check-input");
                checkbox.setAttribute("id", "checkbox"+i);

                div.appendChild(checkbox);
                div.appendChild(label);

                (<HTMLElement>document.getElementById("assemblyLinesForProduction")).appendChild(div);
            }
        })
        .catch((err)=>{
        console.log(err);
        });

    
}


  saveProductionRegistrationInDatabase(){
    let totalProductionTarget = (<HTMLInputElement>document.getElementById("totalProductionTarget")).value;
    let productName = (<HTMLInputElement>document.getElementById("productName")).value;
    let designFileId = 0;

    let data = {
      "operation":"snp",
      "productName": productName, 
      "totalProductionTarget": totalProductionTarget,
      "designFileId": designFileId,
      "userHash":this.accessControlService.getUser().userHash
  }
  let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";


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
          console.log("Assembly Line View List Request has been resolved!");
          return resolve.json()
      })
      .then((data)=>{
          console.log("Production ID: "+data.ProductionId);
          sessionStorage.setItem("productionId", data.ProductionId);
      })
      .catch((err)=>{
      console.log(err);
      });
  }
  

} 
