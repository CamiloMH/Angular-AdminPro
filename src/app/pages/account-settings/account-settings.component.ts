import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  linkTheme = document.querySelector('#theme');
  link:NodeListOf<Element>;



  constructor(private settingServices: SettingsService) { }

  ngOnInit(): void {
    this.link = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme( theme:string ){

    this.settingServices.changeTheme( theme );
   

    this.checkCurrentTheme();
  }

  checkCurrentTheme(){

    
    this.link.forEach( element =>{
      element.classList.remove('working');
      
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if(btnThemeUrl === currentTheme){
        element.classList.add('working');
      }
      

    })

  }

}
