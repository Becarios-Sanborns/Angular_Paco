import { Component, Input, OnInit } from '@angular/core';
import { Persona } from '../altas/altas.component';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  NumeroFilas:number = 5;
  ListaCheckbox:object[]=[];
  ListaBotones:object[]=[];
  @Input() ListaPersonas: Persona[]=[];

  constructor() { }

  ngOnInit(): void {
  }

  
  
}
