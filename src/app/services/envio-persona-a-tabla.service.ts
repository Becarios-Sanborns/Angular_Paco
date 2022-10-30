import { EventEmitter, Injectable } from '@angular/core';
import { Persona } from '../altas/altas.component';

@Injectable({
  providedIn: 'root'
})
export class EnvioPersonaATablaService {

  constructor() { }
  Persona$ = new EventEmitter<Persona>();
}
