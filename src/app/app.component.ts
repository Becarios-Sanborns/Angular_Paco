import { Component } from '@angular/core';
import { Persona } from './altas/altas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tarea1';
  Lista :Persona[]=[];

  getDatos(e:Persona[])
  {
    this.Lista=e;
  }



}
