import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulo
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';


//Componentes
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';






@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
  
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent  
  ]
})
export class PagesModule { }
