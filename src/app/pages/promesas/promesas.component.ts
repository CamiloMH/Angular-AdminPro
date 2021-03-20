import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const promesa = new Promise( (resolve, reject) =>{
      if( true){
        resolve('Bien')
      } else{
        reject('Mal');
      }
    })
    .then( mensaje =>{
      console.log(mensaje);
    })
    .catch( error => console.log(error));
  }

}
