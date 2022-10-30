import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Persona } from '../altas/altas.component';
import { ActualizarTablaBusquedaServiceService } from '../services/actualizar-tabla-busqueda-service.service';
import { ActualizarTablaService } from '../services/actualizar-tabla.service';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {

  constructor(private TablaActualizada:ActualizarTablaService, private TablaBusqueda:ActualizarTablaBusquedaServiceService) { }

  ngOnInit(): void {
  }

  @Input() ListaPersonas: Persona[] = []; //RECIBO LA LISTA DE LAS PERSONAS 
  @Input() isVisible: boolean = false; //BOOLEANO PARA MOSTRAR/OCULTAR MODAL
  @Input() IdPersona: number = 0; //ID DE LA PERSONA A ELIMINAR
  @Input() ListaBusqueda: Persona[] = []; //RECIBO LA LISTA DE BUSQUEDA

  @Output() isVisibleEvent: EventEmitter<boolean> = new EventEmitter<boolean>(); //RETORNO UN BOOLEANO PARA SABER QUE SE OCULTO EL MODAL
  

  //METODO DONDE ELIMINO LA PERSONA DE LA LISTA
  Eliminar() {
    console.log("TAMAÑO LISTA RECIBIDO: "+this.ListaPersonas.length);
    var posicion = this.IdPersona;
    posicion = posicion - 1; //POSICION EN LA LISTA

    for (var i = 0; i < this.ListaPersonas.length; i++) {
      console.log(this.ListaPersonas[i]);
    }
    this.ListaPersonas.splice(posicion, 1)// ELIMINO LA PERSONA 

    //RECORRO LOS ID's DE LAS PERSONAS QUE SE ENCONTRABAN DESPUES DE LA ELIMINADA
    for (var i = posicion; i < this.ListaPersonas.length; i++) {
      this.ListaPersonas[i].id = this.ListaPersonas[i].id - 1;
    }

    console.log("LISTA ACTUALIZADA");
    for (var i = 0; i < this.ListaPersonas.length; i++) {
      console.log(this.ListaPersonas[i]);
    }
 
    this.TablaActualizada.TablaActualizada$.emit(this.ListaPersonas);

    if (this.ListaBusqueda.length > 0) {
      console.log("*************************************************************")
      var posicion = 0;
      console.log("ID EN ELIMINAR: " + this.IdPersona)
      for (var i = 0; i < this.ListaBusqueda.length; i++)//RECORRO UN FOR PARA ENCONTRAR CUAL ELEMENTO VOY A ELIMINAR EN BUSQUEDA
      {
        if (this.ListaBusqueda[i].id == this.IdPersona) {
          posicion = i; //AQUI OBTENGO LA PERSONA A ELIMINAR
          break;
        }
      } 
      this.ListaBusqueda.splice(posicion, 1)//ELIMINO LA PERSONA EN LA DE BUSQUEDA
      console.log("POSICION: ENCONTRADA: " + posicion);
      for(var i =0; i<this.ListaBusqueda.length;i++)
      {
        console.log(this.ListaBusqueda[i]);
      }
      console.log("--------------------------------------")
      
      this.TablaBusqueda.TablaBusquedaActualizada$.emit(this.ListaBusqueda);
    }
    this.isVisible = false;
    this.isVisibleEvent.emit(this.isVisible);
  }

  //EN ESTE METODO NO ELIMINO
  NoEliminar() {
    console.log("NO ELIMINO")
    this.isVisible = false;
    this.isVisibleEvent.emit(this.isVisible);
  }

  OcultarModal() {
    this.isVisible = false;
    this.isVisibleEvent.emit(this.isVisible);
  }
}
