import { EventEmitter, Injectable } from '@angular/core';
import { Persona } from '../altas/altas.component';

@Injectable({
  providedIn: 'root'
})
export class ActualizarTablaService {


  TablaActualizada$ = new EventEmitter<Persona[]>();
   
  constructor() { }
}
