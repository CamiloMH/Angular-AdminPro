import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'

declare const gapi: any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  });


  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }



  login() {
    this.formSubmitted = true

    if (this.loginForm.invalid) {
      return;
    }

    this.usuarioService.login(this.loginForm.value).subscribe(resp => {

      Swal.fire({
        icon: 'success',
        title: 'Bienvenido!',
        showConfirmButton: false,
        timer: 1500
      });
      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value)
      } else {
        localStorage.removeItem('email');
      }
      /* -------------------------- Redirect al dashboard ------------------------- */
      this.router.navigateByUrl('/');

    }, (err) => {
      /* --------------------------- Si sucede un error --------------------------- */
      Swal.fire('Error', err.error.msg, 'error');
    });

  };



  onFailure(error) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe(resp => {
          /* -------------------------- Redirect al dashboard ------------------------- */
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');

          })
        });




      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
