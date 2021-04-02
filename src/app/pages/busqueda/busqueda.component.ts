import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Servicios
import { BusquedasService } from '../../services/busquedas.service';

//Models
import { Hospital } from './../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activateRoute: ActivatedRoute,
    private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.activateRoute.params
      .subscribe(({ termino }) => {
        this.busquedaGlobal(termino);
      })
  }

  busquedaGlobal(termino: string) {
    this.busquedasService.busquedaGlobal(termino)
      .subscribe((resp: any) => {
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      })
  }

}
