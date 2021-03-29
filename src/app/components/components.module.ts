import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';


//Componentes
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImgComponent } from './modal-img/modal-img.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImgComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImgComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
