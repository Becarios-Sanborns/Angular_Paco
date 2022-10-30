import { EventEmitter, Injectable } from '@angular/core';
import { Persona } from '../altas/altas.component';

@Injectable({
  providedIn: 'root'
})
export class ActualizarTablaBusquedaServiceService {

  constructor() { }

  TablaBusquedaActualizada$ = new EventEmitter<Persona[]>();
}
