import { Component, OnInit } from '@angular/core';
import { LCANDLINES } from 'src/app/models/LCANDLINES';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit{
  lineChiefAndLines : LCANDLINES[] = [];

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService){}

  ngOnInit(): void {
    this.loadLinesAndLineChiefsFromBackend();
  }

  
  loadLinesAndLineChiefsFromBackend(){
    let data = {
        "operation":"glcaal",
        "userHash": this.accessControlService.getUser().userHash
    }
    let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";


    fetch(url, {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: { "Content-Type": "application/json",},
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    })
    .then((resolve)=>{
            console.log("Get Assembly Line List Request has been resolved!");
            return resolve.json()
      })
    .then((data)=>{
        console.log(data);
        let LCANDLINES = data.LCANDLINES;

        for(let i=0; i<LCANDLINES.length; i++){
          this.lineChiefAndLines.push(
            {
              userid : LCANDLINES[i].userid,
              username : LCANDLINES[i].username,
              assemblyLineId : LCANDLINES[i].assemblyLineId,
              assemblyLineName : LCANDLINES[i].name,
              capacity : LCANDLINES[i].capacity
            }
          );
        }
      }
    )
    .catch((err)=>{
      console.log(err);
    })
  }
}
