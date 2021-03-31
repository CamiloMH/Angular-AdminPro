import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

//Modelos
import { Medico } from '../../../models/medico.model';

//Servicios
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  medicos: Medico[] = [];
  cargando: boolean = true;
  imgSubs: Subscription;
  medicosTemp: Medico[] = [];

  constructor(private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private buscarService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(300)
      )
      .subscribe(img => {
        this.cargarMedicos();
      });
  }

  cargarMedicos() {
    this.cargando = true;

    this.medicoService.cargarMedicos().subscribe(medicos => {
      this.medicos = medicos;
      this.cargando = false;
      this.medicosTemp = medicos;

    })
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);

  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.medicos = this.medicosTemp;
    }

    this.buscarService.buscar('medicos', termino).subscribe((resp: Medico[]) => {
      this.medicos = resp;
    });
  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar Médico?',
      text: `Esta seguro que desea borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar',
      showClass: {
        popup: 'animated flipInX'
      }
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicoService.eliminarMedico(medico._id).subscribe(resp => {

          this.cargarMedicos();
          Swal.fire({
            title: 'Médico Borrado!',
            text: `${medico.nombre} fue borrado exitosamente.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1300,
            hideClass: {
              popup: 'animate flipOutX'
            }
          })
        })
      }
    })
  }


}
