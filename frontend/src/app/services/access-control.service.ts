import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {

  loggedInUser : User = new User();
  constructor() { }

  setUser(user : User){
    this.loggedInUser = user;
  }

  getUser(): User{
    return this.loggedInUser;
  }

  removeUser(){
    this.loggedInUser = new User();
  }
}
