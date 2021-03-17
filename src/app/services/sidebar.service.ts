import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title:'Principal',
      icon:'mdi mdi-gauge',
      submenu:[
        {title:'Dashboard', url: '/'},
        {title:'ProgressBar', url: 'progress'},
        {title:'Gráficas', url: 'grafica1'},
      ]
    }
  ]

  constructor() { }
}
