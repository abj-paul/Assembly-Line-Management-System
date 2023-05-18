import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AccessControlService } from '../services/access-control.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-lc-dashboard',
  templateUrl: './lc-dashboard.component.html',
  styleUrls: ['./lc-dashboard.component.css']
})
export class LcDashboardComponent implements OnInit{
  haveAccess : boolean = false;
  constructor(private navbarServie: NavbarService, private accessControlService : AccessControlService){}
  ngOnInit(): void {
    this.haveAccess = JSON.stringify(this.accessControlService.getUser())!=JSON.stringify(new User());
    this.navbarServie.setNavItems(
      [
        {itemName: "Profile", routerLink:"/lc-dashboard/profile"},
        {itemName: "Layout", routerLink:"/lc-dashboard/layout"},
        {itemName: "Congestion", routerLink:"/lc-dashboard/congestion"},
        {itemName: "Reports", routerLink:"/lc-dashboard/reports"},
        {itemName: "Assembly Line", routerLink:"/assembly-line"}
      ]
    );
  }
}