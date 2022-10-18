import { Component, Input, OnInit, } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../altas/altas.component';



@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  PosicionPaginacion: number = 0;
  NumeroFilas: number = 5;
  mainCheckbox: boolean = false;





  @Input() listaPersonas$ = new Observable();
  ListaPersonas: Persona[] = []; //LISTA COMPLETA DE LAS PERSONAS REGISTRADAS
  ListaPersonasMostrados: Persona[] = []; //LISTA DE LAS PERSONA QUE VAN A SER MOSTRADAS POR LA PAGINACION


  ListaSeleccionados: Persona[] = []; //LISTA DE LAS PERSONAS QUE ESTAN SELECCIONADAS CON EL CHECK
  tamañoLista: number = 0;


  constructor() { }

  ngOnInit(): void {
    //SE ACTUALIAZRAN LOS DATOS CADA VEZ QUE SEA NECESARIO

    this.listaPersonas$.subscribe((datos) => {
      this.ListaPersonas = datos as Persona[];
      this.tamañoLista = this.ListaPersonas.length;

      //AQUI ACTUALIZO LA TABLA MIENTRAS QUE TENGA UNA MENOR A LA QUE PUEDA MOSTRAR
      if (this.tamañoLista <= this.NumeroFilas) {
        this.ListaPersonasMostrados = []; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
        this.PosicionPaginacion++;
        for (var i = 0; i < this.tamañoLista; i++) {
          this.ListaPersonasMostrados.push(this.ListaPersonas[i]);
        }
        console.log("Posicion: " + this.PosicionPaginacion);
      }
      else {//AQUI ACTUALIZO LA TABLA MIENTRAS QUE TENGA UNA MAYOR A LA QUE PUEDA MOSTRAR
        if (this.PosicionPaginacion % this.NumeroFilas != 0 || this.PosicionPaginacion == this.tamañoLista) {
          this.ListaPersonasMostrados = [];

          for (var i = this.tamañoLista - (this.PosicionPaginacion % this.NumeroFilas); i <= this.tamañoLista; i++) {
            this.ListaPersonasMostrados.push(this.ListaPersonas[i - 1]);
          }
          this.PosicionPaginacion++;
          console.log("Posicion: " + this.PosicionPaginacion);

        }
      } console.log("Tamaño Lista: " + this.tamañoLista);
      this.mainCheckbox = false;
    })


  }


  //////////////////////////////////////////////////////////////////////////////////////
  //FUNCIONA LA PAGINACION SIN BUSCAR LAS PERSONAS
  paginacionSiguiente() {
    //CONDICIONAL PARA DAR SIGUIENTE EN LA PAGINACION
    if (this.PosicionPaginacion < this.tamañoLista) {
      var limite: number = 0;
      limite = this.tamañoLista;

      //CODICIONAL PARA SABER CUANTOAS PERSONAS MOSTRARE
      if (this.PosicionPaginacion + this.NumeroFilas <= this.tamañoLista) {
        limite = this.NumeroFilas;
      } else {
        limite = limite % this.NumeroFilas;
      }

      this.ListaPersonasMostrados = []; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
      limite = limite + this.PosicionPaginacion;
      for (var i = this.PosicionPaginacion + 1; i <= limite; i++) {
        this.ListaPersonasMostrados.push(this.ListaPersonas[i - 1]);
        this.PosicionPaginacion++;
      }
      console.log("POSICION: " + this.PosicionPaginacion);
    } else {
      console.log("NO PUEDES DAR SIGUIENTE");
    }
  }

  //FUNCIONA PAGINACION FINAL SIN BUSCAR  LAS PERSONAS
  paginacionFinal() {
    this.tamañoLista = this.ListaPersonas.length;
    if (this.PosicionPaginacion < this.tamañoLista) {
      this.ListaPersonasMostrados = []; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
      var limite: number = 0;
      limite = this.tamañoLista % this.NumeroFilas;
      if (limite == 0) {
        limite = this.NumeroFilas;
      }
      for (var i = this.tamañoLista - limite; i < this.tamañoLista; i++) {
        this.ListaPersonasMostrados.push(this.ListaPersonas[i]);

      }

    } else {
      console.log("YA ESTAS EN EL FINAL");
    }
    this.PosicionPaginacion = this.tamañoLista;
    console.log("POSICION: " + this.PosicionPaginacion);
  }

  ////////////////////////////////////////////////////////////////////////////////
  paginacionAnterior() {
    if (this.PosicionPaginacion > this.NumeroFilas) {
      console.log("POSICION: " + this.PosicionPaginacion);
      this.ListaPersonasMostrados = []; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
      var limite: number = 0;
      limite = this.PosicionPaginacion % this.NumeroFilas;

      if (limite == 0) {
        limite = this.NumeroFilas;

      }
      this.PosicionPaginacion = this.PosicionPaginacion - this.NumeroFilas - limite + 1;
      limite = this.PosicionPaginacion + this.NumeroFilas;

      console.log(this.PosicionPaginacion)
      for (var i = this.PosicionPaginacion; i < limite; i++) {
        this.ListaPersonasMostrados.push(this.ListaPersonas[i - 1]);
        this.PosicionPaginacion++;
        console.log("POSICION: " + this.PosicionPaginacion);
      }
      this.PosicionPaginacion--;
      console.log("POSICION: " + this.PosicionPaginacion);
    }
  }


  paginacionInicial() {
    if (this.PosicionPaginacion > this.NumeroFilas) {
      this.ListaPersonasMostrados = []; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
      var limite: number = 0;

      for (var i = 0; i < this.NumeroFilas; i++) {
        this.ListaPersonasMostrados.push(this.ListaPersonas[i]);
      }
      this.PosicionPaginacion = this.NumeroFilas;
    } else {
      console.log("Ya estas en el inicio de la paginacion");
    }

  }


  //Evento para actualizar el estado de los checkbox
  contador: number = 0; //Variable que me ayudara a saber cuantos estan seleccionados
  onChangePersona($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;


    this.ListaPersonas = this.ListaPersonas.map((d) => {

      if (d.id == id) {
        if (isChecked == true) {
          this.contador++;
          if (this.contador == this.tamañoLista) {
            this.mainCheckbox = true;
          }
        } else {
          this.contador--;
          this.mainCheckbox = false;
        }
        d.seleccionado = isChecked;
        return d;
      }

      if (id == -1) {
        d.seleccionado = this.mainCheckbox;

        return d;
      }
      return d;
    });

  }


  isVisibleSeleccionados: boolean = false; //METODO BOOLEANO QUE FUNCIONARA PARA MOSTRAR CUALQUIERA DE LOS 2 MODALES
  //METODO PARA MOSTAR EL MODAL DE LAS PERSONAS SELECCIONADAS: 
  mostrarSeleccionados() {
    if (this.contador > 0) {
      this.ListaSeleccionados = this.ListaPersonas.filter((Persona) => Persona.seleccionado == true)
      this.isVisibleSeleccionados = !this.isVisibleSeleccionados;
      console.log(this.isVisibleSeleccionados)
      console.log(this.ListaSeleccionados)

    }
    else {
      console.log("No hay ningun seleccionado");
    }
  }

  get_isVisibleSeleccionados(e: boolean) //EVENTO QUE RETORNA UN FALSE DEL MODAL, 
  {                  //EL CUAL SIGNIFICA QUE SE OCULTO
    this.isVisibleSeleccionados = e;
  }


  //METODOS PARA MOSTRAR OCULTAR EL MODAL DE ELIMINAR
  isVisibleEliminar: boolean = false;
  IdPersona: number = 0;
  mostrarEliminar($event: Persona) {
    this.IdPersona = $event.id;
    this.isVisibleEliminar = !this.isVisibleEliminar;
    console.log(this.IdPersona);
  }
  get_isVisibleEliminar(e: boolean)//EVENTO QUE RETORNA UN FALSE DEL MODAL,          
  {                               //EL CUAL SIGNIFICA QUE SE OCULTO
    this.isVisibleEliminar = e;
  }

  get_ListaActualizada(e:Persona[])
  {
    this.ListaPersonas=e;
    this.ActualizarTabla();
    //FALTA DECREMENTAR EL ID MANDANDO UN OUTPUT AL PADRE HASTA LLEGAR AL COMPONENTE TABLA
  }


  ActualizarTabla()
  {
    if(this.ListaPersonas.length>this.PosicionPaginacion)
    {
      
    }
  }
}




