import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  SERVER_IP_ADDRESS: string = "http://127.0.0.1:1401/";
  ALMS_LAYOUT_HREF:string = "layout.html";
  //ALMS_LAYOUT_HREF:string = "";

  constructor() { }
}
