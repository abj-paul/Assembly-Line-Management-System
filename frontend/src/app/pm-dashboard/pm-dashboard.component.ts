import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AccessControlService } from '../services/access-control.service';
import { NavbarService } from '../services/navbar.service';
import { SharedStuffsService } from '../services/shared-stuffs.service';

@Component({
  selector: 'app-pm-dashboard',
  templateUrl: './pm-dashboard.component.html',
  styleUrls: ['./pm-dashboard.component.css']
})
export class PmDashboardComponent implements OnInit{
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
        {itemName: "Profile", routerLink:"/pm-dashboard/profile", icon:"home"},
        {itemName: "Start New Production", routerLink:"/pm-dashboard/production", icon:"dashboard"}, // set production target
        {itemName: "Resources", routerLink:"/pm-dashboard/resources", icon:"extension"}, // Register Resource, Assembly line
        {itemName: "Reports", routerLink:"/pm-dashboard/reports", icon:"event"},
        {itemName: "Assembly Line", routerLink:"/viewer", icon:"linked_camera"}

      ]
    );
  }

}