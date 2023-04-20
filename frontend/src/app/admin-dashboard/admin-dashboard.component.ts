import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AccessControlService } from '../services/access-control.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  haveAccess : boolean = false;
  constructor(private navbarServie: NavbarService, private accessControlService : AccessControlService){}
  ngOnInit(): void {
    this.haveAccess = JSON.stringify(this.accessControlService.getUser())!=JSON.stringify(new User());
    this.navbarServie.setNavItems(
      [
        {itemName: "Profile", routerLink:"/admin-dashboard/profile"},
        {itemName: "User", routerLink:"/admin-dashboard/user"},
        {itemName: "System Data", routerLink:"/admin-dashboard/system-data"},
        {itemName: "Assembly Line", routerLink:"/assembly-line"}
      ]
    );
  }
}
