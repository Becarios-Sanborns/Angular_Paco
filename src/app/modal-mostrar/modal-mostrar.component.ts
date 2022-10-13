import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../altas/altas.component';

@Component({
  selector: 'app-modal-mostrar',
  templateUrl: './modal-mostrar.component.html',
  styleUrls: ['./modal-mostrar.component.css']
})
export class ModalMostrarComponent implements OnInit {

@Input() ListaModal :Persona[]=[];
constructor() { }


  isVisible : boolean = true;
  ngOnInit(): void {
    console.log(this.ListaModal);
    
  this.isVisible=true;
    
  }

  
  OcultarModal(){
    {
      console.log(this.isVisible);
      this.isVisible=false;
    }
  }

   
}
