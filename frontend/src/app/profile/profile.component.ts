import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AccessControlService } from '../services/access-control.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user : User = new User();
  constructor(private accessControlService: AccessControlService, private router : Router){}
  ngOnInit(): void {
    this.user = this.accessControlService.getUser();
  }

  logout(){
    this.accessControlService.removeUser();
    this.router.navigate(["login"]);
  }
}
