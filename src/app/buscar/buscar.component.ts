import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../services/busqueda.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})


export class BuscarComponent implements OnInit {

  nombreBuscado: string = "";

  constructor( private busquedaService: BusquedaService) { }

  
  ngOnInit(): void {
  }

  onKeyUp()
  {
    console.log("Buscando: "+this.nombreBuscado);
    this.busquedaService.nombre$.emit(this.nombreBuscado);
  }
}
