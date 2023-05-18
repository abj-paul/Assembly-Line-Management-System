import { Component, OnInit } from '@angular/core';
import { AccessControlService } from '../services/access-control.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  profilePicUrl : string = "";

  constructor(private accessControlService: AccessControlService){}

  ngOnInit(): void {
    this.profilePicUrl = this.accessControlService.getUser().pic;
  }
}
