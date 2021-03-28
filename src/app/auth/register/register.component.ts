import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;


  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    terminos: [false, [Validators.required]],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    /* --------------------------- Realizar el posteo --------------------------- */

    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido ' + this.registerForm.value.nombre,
          showConfirmButton: false,
          timer: 1500
        });
        /* -------------------------- Redirect al dashboard ------------------------- */
        this.router.navigateByUrl('/');
      }, (err) => {
        /* --------------------------- Si sucede un error --------------------------- */
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  contrasenasNoValidas() {

    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true
    } else {
      return false;
    }

  };

  passwordsIguales(pass1: string, pass2: string) {

    return (formGroup: FormGroup) => {

      const pass1control = formGroup.get(pass1);
      const pass2control = formGroup.get(pass2);

      if (pass1control.value === pass2control.value) {
        pass2control.setErrors(null)
      } else {
        pass2control.setErrors({ noEsIgual: true })
      }

    }

  }



}
