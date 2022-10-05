import { Component} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Persona } from './altas/altas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tarea1';
  Lista :Persona[]=[];

  lista$ = new BehaviorSubject({});

  getDatos(e:Persona[])
  {
    this.Lista=e;
    this.lista$.next(this.Lista);
  }


  
 


}
