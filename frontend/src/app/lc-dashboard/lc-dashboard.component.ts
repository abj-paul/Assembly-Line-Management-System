import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AccessControlService } from '../services/access-control.service';
import { NavbarService } from '../services/navbar.service';
import { SharedStuffsService } from '../services/shared-stuffs.service';

@Component({
  selector: 'app-lc-dashboard',
  templateUrl: './lc-dashboard.component.html',
  styleUrls: ['./lc-dashboard.component.css']
})
export class LcDashboardComponent implements OnInit{
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
        {itemName: "Profile", routerLink:"/lc-dashboard/profile", icon:"home"},
        {itemName: "Layout", routerLink:"/lc-dashboard/layout", icon:"important_devices"},
        {itemName: "Congestion", routerLink:"/lc-dashboard/congestion", icon:"visibility"},
        {itemName: "Reports", routerLink:"/lc-dashboard/reports", icon:"event"},
        {itemName: "Assembly Line", routerLink:"/assembly-line", icon:"linked_camera"}
      ]
    );
  }
}