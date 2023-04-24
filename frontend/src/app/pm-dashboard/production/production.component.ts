import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { AssemblyLine } from 'src/app/models/AssemblyLine';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit{

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService){}

  ngOnInit(): void {
    this.populateAssemblyLineList();
  }

  assemblyLines : AssemblyLine[] = [];

  loadLayoutPage():void{
      this.__registerTotalProductionTarget();
      const assignedLCId = (<HTMLInputElement>document.getElementById("assignedLCId")).value;
      sessionStorage.setItem("assignedLCId", assignedLCId);
      window.location.href = "layout.html";
  }

  __registerTotalProductionTarget():void{
    var checkboxes = document.getElementsByName("assemblyLineCheckbox");
    var checkboxesChecked = [];
    for (var i=0; i<checkboxes.length; i++) {
       if ((<HTMLInputElement>checkboxes[i]).checked) {
          checkboxesChecked.push({"name": (<HTMLElement>checkboxes[i].nextSibling).innerText, "id": (<HTMLInputElement>checkboxes[i]).value, "capacity": this.assemblyLines[i].capacity});
       }
    }

    sessionStorage.setItem("selectedAssemblyLines", JSON.stringify(checkboxesChecked));

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

  }
  

} 
