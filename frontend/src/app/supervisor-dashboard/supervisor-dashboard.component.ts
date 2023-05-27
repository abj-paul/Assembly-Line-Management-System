import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AccessControlService } from '../services/access-control.service';
import { NavbarService } from '../services/navbar.service';
import { SharedStuffsService } from '../services/shared-stuffs.service';

@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html',
  styleUrls: ['./supervisor-dashboard.component.css']
})
export class SupervisorDashboardComponent  implements OnInit{
  haveAccess : boolean = false;
  localHideAbout : boolean = false;
  
  updateLocalAbout(val: boolean){
    this.localHideAbout = val;
  }
  constructor(private navbarServie: NavbarService, private accessControlService : AccessControlService, private sharedService: SharedStuffsService){}
  ngOnInit(): void {
    this.sharedService.dashboardComponent = this;

    this.haveAccess = JSON.stringify(this.accessControlService.getUser())!=JSON.stringify(new User());
    this.navbarServie.setNavItems(
      [
        {itemName: "Profile", routerLink:"/supervisor-dashboard/profile", icon:"home"},
        {itemName: "Reports", routerLink:"/supervisor-dashboard/reports", icon:"event"},
        {itemName: "Mark Workstation", routerLink:"/supervisor-dashboard/mark-workstation", icon:"extension"},
        {itemName: "Assembly Line", routerLink:"/viewer", icon:"linked_camera"}
      ]
    );
  }
}