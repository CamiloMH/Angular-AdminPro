import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

//Models
import { Usuario } from 'src/app/models/usuario.model';

//Servicios
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  totalUsuarios: number = 0;
  usuarios: Usuario[] = [];
  usuariosTemp: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = true;
  imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
    private buscarService: BusquedasService,
    private modalImagenService: ModalImagenService,
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(300)
      )
      .subscribe(img => {
        this.cargarUsuarios();
      });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe(resp => {
      this.totalUsuarios = resp.total;
      this.usuarios = resp.usuarios;
      this.usuariosTemp = resp.usuarios;
      this.cargando = false;


    });

  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.buscarService.buscar('usuarios', termino).subscribe((resp: Usuario[]) => {
      this.usuarios = resp;
    });
  }

  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire({
        title: 'Error',
        text: 'No puede borrarse a si mismo',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    }


    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta seguro que desea borrar a ${usuario.nombre}`,
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

        this.usuarioService.eliminarUsuario(usuario).subscribe(resp => {

          this.cargarUsuarios();
          Swal.fire({
            title: 'Usuario Borrado!',
            text: `${usuario.nombre} fue borrado exitosamente.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1300,
            hideClass: {
              popup: 'animated fadeOutUp'
            }
          }

          )
        })
      }
    })

  }

  cambiarRole(usuario: Usuario) {

    this.usuarioService.actulizarRol(usuario).subscribe(resp => {
    })
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
