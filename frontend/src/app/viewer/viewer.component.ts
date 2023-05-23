import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessControlService } from '../services/access-control.service';
import { ConstantsService } from '../services/constants.service';
import { SharedStuffsService } from '../services/shared-stuffs.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit{
  productionList: any[] = [];

  constructor(private accessControlService: AccessControlService, private constantsService: ConstantsService){}

  ngOnInit(): void {
    
  }
  
}
