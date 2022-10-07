import { Component, Input, OnInit, } from '@angular/core';
import {Observable } from 'rxjs';
import { Persona } from '../altas/altas.component';



@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  PosicionPaginacion:number=0;
  NumeroFilas:number = 5;
  

  ListaCheckbox:object[]=[];
  ListaBotones:object[]=[];

  @Input()listaPersonas$ = new Observable();
  ListaPersonas:Persona[]=[];
  ListaPersonasMostrados:Persona[]=[];
  tamañoLista:number=0;


constructor() { }
  
  ngOnInit(): void {
    //SE ACTUALIAZRAN LOS DATOS CADA VEZ QUE SEA NECESARIO
    this.listaPersonas$.subscribe((datos)=>{
      this.ListaPersonas = datos as Persona[];
       this.tamañoLista=this.ListaPersonas.length;

      //AQUI ACTUALIZO LA TABLA MIENTRAS QUE TENGA UNA MENOR A LA QUE PUEDA MOSTRAR
      if(this.tamañoLista<=this.NumeroFilas)
      {
        this.ListaPersonasMostrados=[]; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
        this.PosicionPaginacion++;
        for(var i = 0; i<this.tamañoLista; i++)
        {
          this.ListaPersonasMostrados.push(this.ListaPersonas[i]);
        }
        console.log("Posicion: "+this.PosicionPaginacion);
      }
      else{//AQUI ACTUALIZO LA TABLA MIENTRAS QUE TENGA UNA MAYOR A LA QUE PUEDA MOSTRAR
        if(this.PosicionPaginacion%this.NumeroFilas!=0||this.PosicionPaginacion==this.tamañoLista)
        {
          this.ListaPersonasMostrados=[];
          
          for(var i =this.tamañoLista-(this.PosicionPaginacion%this.NumeroFilas); i<=this.tamañoLista; i++)
          {
            this.ListaPersonasMostrados.push(this.ListaPersonas[i-1]); 
          }
          this.PosicionPaginacion++;
          console.log("Posicion: "+this.PosicionPaginacion);
          
        }      
      }
    })  
  }


  //////////////////////////////////////////////////////////////////////////////////////
  //FUNCIONA LA PAGINACION SIN BUSCAR LAS PERSONAS
  paginacionSiguiente()
  {
    //CONDICIONAL PARA DAR SIGUIENTE EN LA PAGINACION
    if(this.PosicionPaginacion<this.tamañoLista)
    {
      var limite:number = 0;
      limite=this.tamañoLista;

      //CODICIONAL PARA SABER CUANTOAS PERSONAS MOSTRARE
      if(this.PosicionPaginacion+this.NumeroFilas<=this.tamañoLista)
      {
        limite=this.NumeroFilas;
      }else{
        limite=limite%this.NumeroFilas;
      }
    
      this.ListaPersonasMostrados=[]; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
      limite=limite+this.PosicionPaginacion;
      for(var i = this.PosicionPaginacion+1; i<=limite;i++)
      {
        this.ListaPersonasMostrados.push(this.ListaPersonas[i-1]);
        this.PosicionPaginacion++;
      }
      console.log("POSICION: "+this.PosicionPaginacion);
    }else{
      console.log("NO PUEDES DAR SIGUIENTE");
    }
  }

  //FUNCIONA PAGINACION FINAL SIN BUSCAR  LAS PERSONAS
  paginacionFinal()
  {
    if(this.PosicionPaginacion<this.tamañoLista)
    {
      this.ListaPersonasMostrados=[]; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
      var limite:number = 0;
      limite = this.tamañoLista%this.NumeroFilas;
      if(limite==0)
      {
        limite=this.NumeroFilas;
      }
      for(var i = this.tamañoLista-limite; i<this.tamañoLista; i++)
      {
        this.ListaPersonasMostrados.push(this.ListaPersonas[i]);
       this.PosicionPaginacion++;
      }
    }else{
      console.log("YA ESTAS EN EL FINAL");
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  paginacionAnterior(){
    if(this.PosicionPaginacion>this.NumeroFilas)
    {
      console.log("POSICION: "+this.PosicionPaginacion);
      this.ListaPersonasMostrados=[]; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
      var limite: number = 0;
      limite = this.PosicionPaginacion%this.NumeroFilas;

      if(limite==0)
      {
        limite= this.NumeroFilas;
        
      }
      this.PosicionPaginacion=this.PosicionPaginacion-this.NumeroFilas-limite+1;
      limite = this.PosicionPaginacion+this.NumeroFilas;
      
      console.log(this.PosicionPaginacion)
       for(var i = this.PosicionPaginacion; i<limite; i++)
      {
       this.ListaPersonasMostrados.push(this.ListaPersonas[i-1]);
        this.PosicionPaginacion++;
        console.log("POSICION: "+this.PosicionPaginacion);
      }
      this.PosicionPaginacion--;
      console.log("POSICION: "+this.PosicionPaginacion);
    }
  }


  paginacionInicial(){
    if(this.PosicionPaginacion>this.NumeroFilas)
    {
      this.ListaPersonasMostrados=[]; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
      var limite: number = 0;
    
      for(var i = 0; i<this.NumeroFilas; i++)
      {
        this.ListaPersonasMostrados.push(this.ListaPersonas[i]);
      }
      this.PosicionPaginacion=this.NumeroFilas;
    }else{
      console.log("Ya estas en el inicio de la paginacion");
    }

  }
}




