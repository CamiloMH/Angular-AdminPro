import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

//Modelos
import { Hospital } from './../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';

//Servicios
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit, OnDestroy {

  medicoForm: FormGroup;
  hospitales: Hospital[] = [];
  medicoSeleccionado: Medico;
  hospitalSeleccionado: Hospital;
  imgSubs: Subscription;


  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalImagenService: ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(300)
      )
      .subscribe(img => {
        this.router.navigateByUrl(`/dashboard/medicos`);
      });

    this.activatedRoute.params.subscribe(({ id }) => this.cargarMedico(id)
    )

    this.medicoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      hospital: ['', [Validators.required]],
    })

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(hospital => hospital._id === hospitalId)
      })

  }

  cargarMedico(id: string) {

    if (id === 'nuevo') {
      return;
    }
    this.medicoService.obtenerMedicoById(id)
      .pipe(
        delay(150)
      )
      .subscribe(medico => {

        if (!medico) {
          return this.router.navigateByUrl(`/dashboard/medicos`);

        }
        const { nombre, hospital: { _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });

      }, err => {
        return this.router.navigateByUrl(`/dashboard/medicos`);

      })

  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospital: Hospital[]) => {
        this.hospitales = hospital;
      })


  }

  crearMedico() {

    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {
          Swal.fire({
            title: 'Médico Actualizado!',
            text: `${this.medicoForm.value.nombre} fue actualizado exitosamente.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1300,
            showClass: {
              popup: 'animated flipInX'
            },
            hideClass: {
              popup: 'animated flipOutX'
            }
          })
        })
    } else {

      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire({
            title: 'Médico Creado!',
            text: `${this.medicoForm.value.nombre} fue creado exitosamente.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1300,
            showClass: {
              popup: 'animated flipInX'
            },
            hideClass: {
              popup: 'animated flipOutX'
            }
          })
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        })
    }
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
    // this.router.navigateByUrl(`/dashboard/medico/${medico._id}`)

  }

}
