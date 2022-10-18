import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Persona } from '../altas/altas.component';

@Component({
  selector: 'app-modal-mostrar',
  templateUrl: './modal-mostrar.component.html',
  styleUrls: ['./modal-mostrar.component.css']
})

export class ModalMostrarComponent implements OnInit {

@Input() ListaModal :Persona[]=[];
@Input () isVisible :boolean  =false;

@Output() isVisibleEvent : EventEmitter<boolean> = new EventEmitter<boolean>();


constructor() { }


  
  ngOnInit(): void {
  }
  
  OcultarModal(){
    {
      console.log(this.isVisible);
      this.isVisible=false;
      this.isVisibleEvent.emit(this.isVisible);
    }
  }

   
}
