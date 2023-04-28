import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AccessControlService } from '../services/access-control.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html',
  styleUrls: ['./supervisor-dashboard.component.css']
})
export class SupervisorDashboardComponent  implements OnInit{
  haveAccess : boolean = false;
  constructor(private navbarServie: NavbarService, private accessControlService : AccessControlService){}
  ngOnInit(): void {
    this.haveAccess = JSON.stringify(this.accessControlService.getUser())!=JSON.stringify(new User());
    this.navbarServie.setNavItems(
      [
        {itemName: "Profile", routerLink:"/supervisor-dashboard/profile"},
        {itemName: "Reports", routerLink:"/supervisor-dashboard/reports"},
        {itemName: "Assembly Line", routerLink:"/supervisor-dashboard/assembly-line"}
      ]
    );
  }
}