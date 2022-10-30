import { NgForOf } from '@angular/common';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit, Output, EventEmitter, Input, ComponentFactoryResolver } from '@angular/core';
import { DecrementarIdService } from '../services/decrementar-id.service';
import { EnvioPersonaATablaService } from '../services/envio-persona-a-tabla.service';



export interface Persona {
  id: number,
  nombres: string,
  apellidos: string,
  edad: string,
  correo: string,
  seleccionado:boolean
}

@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.css']
})


export class AltasComponent implements OnInit {

  @Input() IdPersonaEliminada: number = 0; //RECIBO EL ID DE LA PERSONA QUE VOY A ELIMINAR
  Global_Id: number = 0;
  nombres: string = "";
  apellidos: string = "";
  edad: string = "";
  correo: string = "";
  seleccionado:boolean = false;
  
  Incrementa:boolean =false;
  

  


  constructor(
    private DecrementarId: DecrementarIdService,
    private EnviarPersona: EnvioPersonaATablaService) { 

  }
  

  
 // @Output() EnvioPadre = new EventEmitter<Persona[]>();


  ngOnInit(): void {
    this.DecrementarId.Id$.subscribe(Id=>{
     
     
    this.Global_Id--;
    
    });  
  }



  registrarUsuario() { 
    var alerta = 0;
    //VALIDACION DE LOS DATOS
    if (this.nombres == "") {
      alert("Llena el  campo de nombres");
      alerta++;
  }
  if (this.apellidos == "") {
      alert("Llena el  campo de apellidos");
      alerta++;
  }
  if (this.edad == "") {
      alert("Llena el campo de Edad");
      alerta++;

  } else {
    var edad : number =+this.edad;
      if (edad % 1 != 0) {
          alert("Solo se aceptan numeros enteros");
          alerta++;
      }
  }

  if (this.correo == "") {
      alerta++;
      alert("Llena el  campo de correo");
  }
  else {
      var ExpresionRegular = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      var isValid = ExpresionRegular.test(this.correo);
      if (isValid == false) {

          alert("El correo es invalido");
          alerta++;
      }
  }
  if (alerta > 0) {
      return
  }

    this.Global_Id++;  
    //CREO LA NUEVA PERSONA CON LOS CAMPOS DE ALTAS
    var NuevaPersona: Persona = {
      id: this.Global_Id,
      nombres: this.nombres,
      apellidos: this.apellidos,
      edad: this.edad,
      correo: this.correo,
      seleccionado:this.seleccionado
    }

    //ENVIO LA LISTA AL PADRE
    this.EnviarPersona.Persona$.emit(NuevaPersona);
    console.log("------------------------------");
 
  }

}
