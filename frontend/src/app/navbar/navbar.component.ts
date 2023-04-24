import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../models/NavItem';
import { AccessControlService } from '../services/access-control.service';
import { ConstantsService } from '../services/constants.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private router: Router, private navbarService : NavbarService, private accessControlService: AccessControlService, private constantsService: ConstantsService){}

  navItems : NavItem [] = [];

  ngOnInit(): void {
    this.navItems = this.navbarService.getNavItems();
  }

  makeSelected(index:number){

    const items = document.getElementsByClassName("sidebarItems");
    for(let i=0; i<items.length; i++){
      items[i].classList.remove("selected");
    }

    document.getElementsByClassName('sidebarItems')[index].classList.add('selected');
  }

  logout(){
    let data = {
      "operation": "logout",
      "userHash": this.accessControlService.getUser().userHash
    }
    let url = this.constantsService.SERVER_IP_ADDRESS + this.accessControlService.getUser().role;


  fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
      "Content-Type": "application/json",
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data)
  })
    .then((resolve)=>{
      console.log("Logout Resource Request has been resolved!");
      return resolve.json()
    })
    .then((data)=>{
        console.log(data);
        this.accessControlService.removeUser();
        this.router.navigate(["login"]);
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}
