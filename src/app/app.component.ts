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

  IdPersonaEliminiada :number=0;
  IdActualizado :boolean=false;
  lista$ = new BehaviorSubject({});

 

  
}
