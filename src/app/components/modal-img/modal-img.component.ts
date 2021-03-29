import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [
  ]
})
export class ModalImgComponent implements OnInit {


  public imagenSubir: File;
  public imgTemp: any = '';

  constructor(public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }


  cerrarModal() {
    this.modalImagenService.cerrarModal();
    this.imgTemp = null;

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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actulizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado con exito',
          showConfirmButton: false,
          timer: 1500
        });
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
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
