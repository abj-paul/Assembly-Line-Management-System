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
export class ViewerComponent{
  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService, private http:HttpClient, private router : Router){}
  goBack(){
    if(this.accessControlService.getUser().role=='Admin')
      this.router.navigate(["/admin-dashboard/production"]);
    else if(this.accessControlService.getUser().role=='productionManager')
      this.router.navigate(["/pm-dashboard/production"]);
    else if(this.accessControlService.getUser().role=='lineChief')
      this.router.navigate(["/lc-dashboard/layout"]);
    else if(this.accessControlService.getUser().role=='supervisor')
      this.router.navigate(["/supervisor-dashboard"]);
    else if(this.accessControlService.getUser().role=='viewer')
      this.router.navigate(["/viewer"]);
    else this.router.navigate(["/home"]);
  }
}
