import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

//modelos
import { Hospital } from '../../../models/hospital.model';

//Servicios
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  hospitales: Hospital[] = [];
  cargando: boolean = true;
  imgSubs: Subscription;
  hospitalesTemp: Hospital[] = [];



  constructor(private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private buscarService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();

  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(300)
      )
      .subscribe(img => {
        this.cargarHospitales();
      });
  }


  cargarHospitales() {
    this.cargando = true;

    this.hospitalService.cargarHospitales().subscribe(hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHopsital(hospital._id, hospital.nombre)
      .subscribe(resp => {
        Swal.fire({
          title: 'Actualizado',
          text: hospital.nombre,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })

      });
  }

  eliminarHospital(hospital: Hospital) {

    Swal.fire({
      title: '¿Borrar Hospital?',
      text: `Esta seguro que desea borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar',
      showClass: {
        popup: 'animated fadeInDown'
      }
    }).then((result) => {
      if (result.isConfirmed) {

        this.hospitalService.eliminarHospital(hospital._id).subscribe(resp => {

          this.cargarHospitales();
          Swal.fire({
            title: 'Hospital Borrado!',
            text: `${hospital.nombre} fue borrado exitosamente.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1300,
            hideClass: {
              popup: 'animated fadeOutUp'
            }
          })
        })
      }
    })
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })

    if (value.trim().length > 0) {
      this.hospitalService.crearHopsital(value)
        .subscribe((resp: any) => {

          Swal.fire({
            title: 'Hospital creado!',
            text: `${value} fue creado exitosamente.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1300
          })
          this.hospitales.push(resp.hospital)
        })
    }

  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);

  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.hospitales = this.hospitalesTemp;
    }

    this.buscarService.buscar('hospitales', termino).subscribe((resp: Hospital[]) => {
      this.hospitales = resp;
    });
  }

}
