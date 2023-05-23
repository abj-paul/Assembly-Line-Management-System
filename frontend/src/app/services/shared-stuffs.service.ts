import { Injectable } from '@angular/core';
import { Box } from '../pm-dashboard/production/set-line-layout/Box';

@Injectable({
  providedIn: 'root'
})
export class SharedStuffsService {
  selected_assembly_lines_for_production : Box[] = []
  productionId : number = 1;
  dashboardComponent: any;

  constructor() { }

  setProductionId(productionID:number): void {
    this.productionId = productionID;
  }

  getProductionId():number{
    return this.productionId;
  }

  setDashboardComponent(dashboardComponent: any):void{
    this.dashboardComponent = dashboardComponent;
  }

  getDashboardComponent():any{
    return this.dashboardComponent;
  }
}
