import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = '';

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')]],
    });
  }

  actualizarPerfil() {
    this.usuarioService.actulizarPerfil(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire({
          icon: 'success',
          title: 'Guardado satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        });
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.msg,
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };

  }

  subirImagen() {
    this.fileUploadService.actulizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img
        Swal.fire({
          icon: 'success',
          title: 'Guardado con exito',
          showConfirmButton: false,
          timer: 1500
        });
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: err.error.msg,
          showConfirmButton: false,
          timer: 1500
        });
      })
  }

}
