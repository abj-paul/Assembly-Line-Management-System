import { Injectable } from '@angular/core';
import { Box } from '../pm-dashboard/production/set-line-layout/Box';

@Injectable({
  providedIn: 'root'
})
export class SharedStuffsService {
  selected_assembly_lines_for_production : Box[] = []

  constructor() { }
}
