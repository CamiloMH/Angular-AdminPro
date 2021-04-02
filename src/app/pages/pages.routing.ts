import { BusquedaComponent } from './busqueda/busqueda.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//Guards
import { AuthGuard } from '../guards/auth.guard';

//Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashborad' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Temas Settings' } },
      { path: 'buscar/:termino', component: BusquedaComponent, data: { title: 'Busquedas' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráfica' } },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de Usuario' } },


      /* ----------------------------- Mantenimientos ----------------------------- */
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento de Hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Médicos de la aplicación' } },
      { path: 'medico/:id', component: MedicoComponent, data: { title: 'Médicos de la aplicación' } },

      //Rutas de ADMIN
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { title: 'Usuarios de aplicación' } },



    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class pagesRoutingModule { }
