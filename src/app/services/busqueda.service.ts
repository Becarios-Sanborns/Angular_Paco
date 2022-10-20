import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {


  nombre$ = new EventEmitter<string>();
  constructor() { }

  
}
