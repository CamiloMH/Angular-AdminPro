import { Hospital } from './../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CargarHospitales } from '../interfaces/cargar-hopistales';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarHospitales() {

    const url = `${base_url}/hospitales/`;

    return this.http.get<CargarHospitales>(url, this.headers)
      .pipe(
        map(resp => resp.hospitales)
      )


  }

  crearHopsital(nombre: string) {

    const url = `${base_url}/hospitales/`;
    return this.http.post<Hospital>(url, { nombre }, this.headers);

  }

  actualizarHopsital(_id: string, nombre: string) {

    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put<Hospital>(url, { nombre }, this.headers);

  }

  eliminarHospital(_id: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete<Hospital>(url, this.headers);
  }






}
