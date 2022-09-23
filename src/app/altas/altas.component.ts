import { NgForOf } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


export interface Persona {
  id: number,
  nombres: string,
  apellidos: string,
  edad: number,
  correo: string
}

@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.css']
})


export class AltasComponent implements OnInit {

  Global_Id: number = 0;
  nombres: string = "";
  apellidos: string = "";
  edad: number = 18;
  correo: string = "";
  registrado = false;

  personas: Persona[] = [];

  constructor() { }

  @Output() EnvioPadre = new EventEmitter<Persona[]>();
  ngOnInit(): void {
  }

  registrarUsuario() {


    //AUMENTO EL ID SI PASA LA VALIDACION DE DATOS
    this.Global_Id++;
    //CREO LA NUEVA PERSONA CON LOS CAMPOS DE ALTAS
    var NuevaPersona: Persona = {
      id: this.Global_Id,
      nombres: this.nombres,
      apellidos: this.apellidos,
      edad: this.edad,
      correo: this.correo
    }

    //AGREGO LA NUEVA PERSONA A LA LISTA
    this.personas.push(NuevaPersona);
    //ENVIO LA LISTA AL PADRE
    this.EnvioPadre.emit(this.personas);

   /* 
    for(var i = 0; i<this.personas.length;i++)
    {
      console.log(this.personas[i]);
    }*/

  }

}
