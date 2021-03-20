import { Component, OnDestroy} from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervalSub: Subscription;

  constructor() {
    // let i = -1  

    // const obs$ = new Observable( obs =>{
        

    //   const interval = setInterval(() => {

    //     i++;
    //     obs.next(i);
      
    //     if ( i === 4){
    //       clearInterval(interval);
    //       obs.complete();

    //     }

    //     if ( i === 2){
    //       obs.error('i llego al valor de 2');
    //     }

    //   },1000)

    // });

    // obs$.subscribe(
    //   valor => console.log('Subs:', valor),
    //   err => console.log('Error:', err),
    //   () => console.log('Obs terminado')
      
    // );

     this.intervalSub = this.retornaItervalo().subscribe ( console.log);

   }
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

   retornaItervalo(): Observable<number>{
     return interval(100).pipe(
      //  take(10),
       map( valor => valor +1),
       filter( valor => ( valor % 2 === 0 ) ? true : false),
       );
   }

 
}


