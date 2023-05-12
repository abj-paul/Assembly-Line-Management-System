import { Injectable } from '@angular/core';
import { Box } from '../test-area/Box';

@Injectable({
  providedIn: 'root'
})
export class SharedStuffsService {
  selected_assembly_lines_for_production : Box[] = []

  constructor() { }
}
