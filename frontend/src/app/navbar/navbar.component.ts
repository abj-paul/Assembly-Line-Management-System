import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../models/NavItem';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private router: Router, private navbarService : NavbarService){}

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
}
