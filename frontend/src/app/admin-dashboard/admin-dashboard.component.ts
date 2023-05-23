import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AccessControlService } from '../services/access-control.service';
import { NavbarService } from '../services/navbar.service';
import { SharedStuffsService } from '../services/shared-stuffs.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
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
        {itemName: "Profile", routerLink:"/admin-dashboard/profile"},
        {itemName: "User", routerLink:"/admin-dashboard/user"},
        {itemName: "System Data", routerLink:"/admin-dashboard/system-data"},
        {itemName: "Assembly Line", routerLink:"/assembly-line"},
        {itemName: "Viewer Information", routerLink:"/admin-dashboard/set-viewer-info"}
      ]
    );
  }
}
