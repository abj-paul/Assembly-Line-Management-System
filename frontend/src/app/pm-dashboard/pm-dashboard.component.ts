import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AccessControlService } from '../services/access-control.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-pm-dashboard',
  templateUrl: './pm-dashboard.component.html',
  styleUrls: ['./pm-dashboard.component.css']
})
export class PmDashboardComponent implements OnInit{
  haveAccess : boolean = false;
  constructor(private navbarServie: NavbarService, private accessControlService : AccessControlService){}
  ngOnInit(): void {
    this.haveAccess = JSON.stringify(this.accessControlService.getUser())!=JSON.stringify(new User());
    this.navbarServie.setNavItems(
      [
        {itemName: "Profile", routerLink:"/pm-dashboard/profile"},
        {itemName: "Start New Production", routerLink:"/pm-dashboard/production"}, // set production target
        {itemName: "Resources", routerLink:"/pm-dashboard/resources"}, // Register Resource, Assembly line
        {itemName: "Reports", routerLink:"/pm-dashboard/reports"},
        {itemName: "Assembly Line", routerLink:"/pm-dashboard/assembly-line"}

      ]
    );
  }
}