import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccessControlService } from 'src/app/services/access-control.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedStuffsService } from 'src/app/services/shared-stuffs.service';

@Component({
  selector: 'app-assign-supervisor',
  templateUrl: './assign-supervisor.component.html',
  styleUrls: ['./assign-supervisor.component.css']
})
export class AssignSupervisorComponent {
  assemblyLineId: Number = 0;
  supervisorId: Number = 0;

  constructor(private http: HttpClient, private accessControlService: AccessControlService, private sharedService: SharedStuffsService, private constantsService: ConstantsService){}

  assignSupervisorToLine():void{
    let data = {
      "operation": "assign-supervisor",
      "userId": this.supervisorId,
      "assemblyLineId": this.assemblyLineId,
      "userHash":this.accessControlService.getUser().userHash
  }

  let url = this.constantsService.SERVER_IP_ADDRESS + "productionManager";
    this.http.post(url, data).subscribe((data)=>{
      console.log(data);
    })
  }
}
