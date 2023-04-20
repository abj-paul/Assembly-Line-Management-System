import { Injectable } from '@angular/core';
import { NavItem } from '../models/NavItem';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  navItems : NavItem [] = [];

  constructor() { }

  setNavItems(navItems : NavItem[]){
    this.navItems = navItems;
  }
  getNavItems(): NavItem[]{
    return this.navItems;
  }
}
