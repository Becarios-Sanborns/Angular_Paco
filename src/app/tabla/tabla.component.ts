import { Component, Input, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../altas/altas.component';
import { BusquedaService } from '../services/busqueda.service';



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

  //VARIABLES PARAA LA BUSQUEDA
  NombreBuscado: string = ""; //NOMBRE DE PERSONA BUSCADA
  ListaBusqueda: Persona[] = [];
  PosicionPaginacionBusqueda: number = 0;

  constructor(private busquedaService: BusquedaService) { }

  ngOnInit() {
    //SERVICIO MOSTRA TABLA CUANDO BUSCO
    this.busquedaService.nombre$.subscribe(texto => {
      this.contador = 0; //REINICIO EL CONTADOR PARA SABER CUANTOS SELECCIONADOS HAY
      this.NombreBuscado = texto;
      //DEBO ELIMINAR LAS SELECCIONES DE LOS CHECKBOX
      for (var i = 0; i < this.ListaPersonas.length; i++) {
        this.ListaPersonas[i].seleccionado = false;
      }



      if (this.NombreBuscado != "") {
        //AQUI BUSCO
        this.ListaPersonasMostrados = [];
        this.PosicionPaginacionBusqueda = 0;


        this.ListaBusqueda = [];
        for (var i = 0; i < (this.ListaPersonas.length); i++) {
          var nombres = this.ListaPersonas[i].nombres;
          if (nombres.includes(this.NombreBuscado) == true) {
            //  console.log("Encontre similitud");
            var personaEncontrada = this.ListaPersonas[i];
            this.ListaBusqueda.push(personaEncontrada); //AQUI AÑADO LAS SIMILITUDES A LA LISTA DE BUSQUEDA
          }
        }
        //IMPRIMMO LA LISTA DE BUSQUEDA
        console.log("RESULTDOS BUSQUEDA");
        console.log("TAMAÑO LISTA BUSQUEDA: " + this.ListaBusqueda.length);
        for (var i = 0; i < this.ListaBusqueda.length; i++) {
          console.log(this.ListaBusqueda[i]);
        }

        if (this.ListaBusqueda.length >= this.NumeroFilas) {
          console.log("111111111111111111111111111");
          this.PosicionPaginacionBusqueda = this.NumeroFilas;

        }
        else {
          //AQUI ENTRO SI ES MENOR DEL NUMERO DE FILAS
          console.log("22222222222222222222222222222222222");
          this.PosicionPaginacionBusqueda = this.ListaBusqueda.length % this.NumeroFilas;
          console.log("POSICION LISTA: " + this.PosicionPaginacionBusqueda);
        } console.log("TAMAÑO MOSTRADOS" + this.ListaPersonasMostrados.length)
        for (var i = 1; i <= this.PosicionPaginacionBusqueda; i++) {
          this.ListaPersonasMostrados.push(this.ListaBusqueda[i - 1]);

        }


      } else {

        //AAQUI ENTRO CUANDO NO ESTOY BUSCANDO
        this.PosicionPaginacion = 0;
        this.ListaPersonasMostrados = [];


        if (this.ListaPersonas.length >= this.NumeroFilas) {
          this.PosicionPaginacion = this.NumeroFilas;
        }
        else {
          this.PosicionPaginacion = this.ListaPersonas.length % this.NumeroFilas;
        }
        for (var i = 1; i <= this.PosicionPaginacion; i++) {
          this.ListaPersonasMostrados.push(this.ListaPersonas[i - 1]);
        }

        //AQUI CUANDO DEJO DE BUSCAR

      }
    });

    //SERVICIO PARA ACTUALIZAR LA TABLA 
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

    if (this.NombreBuscado == "")// PAGINACION SIN BUSQUEDA
    {
      console.log("DOY PAGINCION: "+this.tamañoLista);
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
    else //PAGINACION CON BUSQUEDA
    {
      //CONDICIONAL PARA DAR SIGUIENTE EN LA PAGINACION
    if (this.PosicionPaginacionBusqueda < this.ListaBusqueda.length) {
      var limite: number = 0;
      limite = this.ListaBusqueda.length;

      //CODICIONAL PARA SABER CUANTOAS PERSONAS MOSTRARE
      if (this.PosicionPaginacionBusqueda + this.NumeroFilas <=  this.ListaBusqueda.length) {
        limite = this.NumeroFilas;
      } else {
        limite = limite % this.NumeroFilas;
      }

      this.ListaPersonasMostrados = []; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
      limite = limite + this.PosicionPaginacionBusqueda;
      for (var i = this.PosicionPaginacionBusqueda + 1; i <= limite; i++) {
        this.ListaPersonasMostrados.push(this.ListaBusqueda[i - 1]);
        this.PosicionPaginacionBusqueda++;
      }
      console.log("POSICION: " + this.PosicionPaginacionBusqueda);
    } else {
      console.log("NO PUEDES DAR SIGUIENTE EN BUSQUEDA");
    }
    }

  }

  //FUNCIONA PAGINACION FINAL SIN BUSCAR  LAS PERSONAS
  paginacionFinal() {
    if(this.NombreBuscado=="")//PAGINACION FINAL SIN BUSCAR
    {
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
    else //PAGINACION FINAL BUSCANDO
    {
      this.tamañoLista = this.ListaBusqueda.length;
      if (this.PosicionPaginacionBusqueda < this.tamañoLista) {
        this.ListaPersonasMostrados = []; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
        var limite: number = 0;
        limite = this.tamañoLista % this.NumeroFilas;
        if (limite == 0) {
          limite = this.NumeroFilas;
        }
        for (var i = this.tamañoLista - limite; i < this.tamañoLista; i++) {
          this.ListaPersonasMostrados.push(this.ListaBusqueda[i]);
  
        }
      } else {
        console.log("YA ESTAS EN EL FINAL");
      }
      this.PosicionPaginacionBusqueda = this.tamañoLista;
      console.log("POSICION: " + this.PosicionPaginacionBusqueda);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  paginacionAnterior() {
    if(this.NombreBuscado=="")//PAGINACION ANTERIOR SIN BUSCAR
    {
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
      }else
      {
        console.log("NO PUEDES DAR ANTERIOR");
      }
    }
    else //PAGINACION ANTERIOR BUSCANDO
    {
      if (this.PosicionPaginacionBusqueda > this.NumeroFilas) {
        console.log("POSICION BUSQUEDA: " + this.PosicionPaginacionBusqueda);
        this.ListaPersonasMostrados = []; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
        var limite: number = 0;
        limite = this.PosicionPaginacionBusqueda % this.NumeroFilas;
  
        if (limite == 0) {
          limite = this.NumeroFilas;
        }
        this.PosicionPaginacionBusqueda = this.PosicionPaginacionBusqueda - this.NumeroFilas - limite + 1;
        limite = this.PosicionPaginacionBusqueda + this.NumeroFilas;
  
        console.log(this.PosicionPaginacionBusqueda)
        for (var i = this.PosicionPaginacionBusqueda; i < limite; i++) {
          this.ListaPersonasMostrados.push(this.ListaBusqueda[i - 1]);
          this.PosicionPaginacionBusqueda++;
          console.log("POSICION: " + this.PosicionPaginacionBusqueda);
        }
        this.PosicionPaginacionBusqueda--;
        console.log("POSICION: " + this.PosicionPaginacionBusqueda);
      }else
      {
        console.log("NO PUEDES DAR ANTERIOR");
      }
    }
    
  }


  paginacionInicial() {
    if(this.NombreBuscado==""){//PAGINACION INICIAL SIN BUSQUEDA
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
    else //PAGINACION INICIAL CON BUSQUEDA
    {
      if (this.PosicionPaginacionBusqueda > this.NumeroFilas) {
        this.ListaPersonasMostrados = []; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
        var limite: number = 0;
  
        for (var i = 0; i < this.NumeroFilas; i++) {
          this.ListaPersonasMostrados.push(this.ListaBusqueda[i]);
        }
        this.PosicionPaginacionBusqueda = this.NumeroFilas;
      } else {
        console.log("Ya estas en el inicio de la paginacion");
      }
    }
  }


  //Evento para actualizar el estado de los checkbox
  contador: number = 0; //Variable que me ayudara a saber cuantos estan seleccionados
  onChangePersona($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    if(this.NombreBuscado=="") //EVENTO CHECK SIN BUSQUEDA
    {
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
    else//EVENNTO CHECK CON BUSQUEDA
    {
      this.ListaBusqueda = this.ListaBusqueda.map((d) => {

        if (d.id == id) {
          if (isChecked == true) {
            this.contador++;
            if (this.contador == this.ListaBusqueda.length) {
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
  }


  isVisibleSeleccionados: boolean = false; //METODO BOOLEANO QUE FUNCIONARA PARA MOSTRAR CUALQUIERA DE LOS 2 MODALES
  //METODO PARA MOSTAR EL MODAL DE LAS PERSONAS SELECCIONADAS: 
  mostrarSeleccionados() {
    if (this.contador > 0) {
      console.log("CONTADOR: " + this.contador);
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

  get_ListaActualizada(e: Persona[]) {
    this.ListaPersonas = e;
    console.log("ESTOY EN TABLA CON TAMAÑO DE "+this.ListaPersonas.length)
    this.tamañoLista=this.ListaPersonas.length;
      if (this.ListaPersonas.length != 0) {
        this.ActualizarTabla();
      }
      else {
        this.ListaPersonasMostrados = [];
        this.PosicionPaginacion--;
      }
    
   
  }

  get_ListaBusquedaActualizada(e:Persona[])
  {
    this.ListaBusqueda = e;
    if (this.ListaBusqueda.length != 0) {

        this.ActualizarTabla();
         
    }
    else {
      this.ListaPersonasMostrados = [];
      this.PosicionPaginacionBusqueda--;
    }
  }


  ActualizarTabla() {
    var Inicio = 0;
    var limite = 0;
    this.ListaPersonasMostrados = [];

    console.log("PRIMEROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO:"+this.tamañoLista)
    if(this.NombreBuscado=="")//AAQUI ENTRO SIN BUSCAR
    {
      this.tamañoLista = this.ListaPersonas.length;
    console.log("111111111111111111111111111111111111111111111111111111111111111")
    console.log("POSICION PAGINACION: " + this.PosicionPaginacion);
    console.log("TAMAÑO LISTA: " + this.tamañoLista);
    if (this.PosicionPaginacion < this.ListaPersonas.length) {
      Inicio = this.PosicionPaginacion - this.NumeroFilas + 1;

      limite = this.PosicionPaginacion
      console.log("LIMITE: " + limite);
      console.log("INICIO: " + Inicio);
      for (var i = Inicio; i <= limite; i++) {
        this.ListaPersonasMostrados.push(this.ListaPersonas[i - 1]);
      }
    } else {
      console.log("22222222222222222222222222222222222222222222222222222222222222");
      this.PosicionPaginacion = this.ListaPersonas.length;
      console.log("POSICION: " + this.PosicionPaginacion)
      limite = this.PosicionPaginacion % this.NumeroFilas;
      Inicio = this.PosicionPaginacion - limite + 1;
      if (limite == 0) //SI EL RESIDUO ES IGUAL A 0 SIGNIFICA QUE MOSTRARE TODOS LOS ELEMENTOS
      {
        limite = this.NumeroFilas;
        Inicio = this.PosicionPaginacion - this.NumeroFilas + 1;
      }
      if (this.PosicionPaginacion > this.NumeroFilas) {// AQUI ENTRO SI POSICION >NUMERO FILAS
        limite = this.ListaPersonas.length;
        console.log("ENTREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        this.PosicionPaginacion = this.ListaPersonas.length;
        if (this.tamañoLista <= this.NumeroFilas) {
          Inicio = 1;
          if (this.tamañoLista < this.NumeroFilas) {
            this.PosicionPaginacion--;
          }

        }
      }
      else {//AQUI ENTRO SI POSICION <= NUMERO FILAS
      }
      console.log("INICIO VALE: " + Inicio);
      console.log("LIMITE VALE: " + limite);
      for (var i = Inicio; i <= limite; i++) {
        this.ListaPersonasMostrados.push(this.ListaPersonas[i - 1]);
      }
      this.PosicionPaginacion = this.ListaPersonas.length;
    }
    console.log("POSICION FINAL: " + this.PosicionPaginacion);
    console.log("-----------------------------------------------------------");

    }
    else //AQUI ENTRO BUSCANDO
    {
      var tamLista  = this.ListaBusqueda.length;
    console.log("111111111111111111111111111111111111111111111111111111111111111")
    console.log("POSICION PAGINACION: " + this.PosicionPaginacionBusqueda);
    console.log("TAMAÑO LISTA: " + tamLista);
    if (this.PosicionPaginacionBusqueda < this.ListaBusqueda.length) {
      Inicio = this.PosicionPaginacionBusqueda - this.NumeroFilas + 1;

      limite = this.PosicionPaginacionBusqueda
      console.log("LIMITE: " + limite);
      console.log("INICIO: " + Inicio);
      for (var i = Inicio; i <= limite; i++) {
        this.ListaPersonasMostrados.push(this.ListaBusqueda[i - 1]);
      }
    } else {
      console.log("22222222222222222222222222222222222222222222222222222222222222");
      this.PosicionPaginacionBusqueda = this.ListaBusqueda.length;
      console.log("POSICION: " + this.PosicionPaginacionBusqueda)
      limite = this.PosicionPaginacionBusqueda % this.NumeroFilas;
      Inicio = this.PosicionPaginacionBusqueda - limite + 1;
      if (limite == 0) //SI EL RESIDUO ES IGUAL A 0 SIGNIFICA QUE MOSTRARE TODOS LOS ELEMENTOS
      {
        limite = this.NumeroFilas;
        Inicio = this.PosicionPaginacionBusqueda - this.NumeroFilas + 1;
      }
      if (this.PosicionPaginacionBusqueda > this.NumeroFilas) {// AQUI ENTRO SI POSICION >NUMERO FILAS
        limite = this.ListaBusqueda.length;
        console.log("ENTREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        this.PosicionPaginacionBusqueda = this.ListaBusqueda.length;
        if (tamLista <= this.NumeroFilas) {
          Inicio = 1;
          if (tamLista < this.NumeroFilas) {
            this.PosicionPaginacionBusqueda--;
          }

        }
      }
      else {//AQUI ENTRO SI POSICION <= NUMERO FILAS
      }
      console.log("INICIO VALE: " + Inicio);
      console.log("LIMITE VALE: " + limite);
      for (var i = Inicio; i <= limite; i++) {
        this.ListaPersonasMostrados.push(this.ListaBusqueda[i - 1]);
      }
      this.PosicionPaginacionBusqueda = this.ListaBusqueda.length;
    }
    console.log("POSICION FINAL: " + this.PosicionPaginacionBusqueda);
    console.log("-----------------------------------------------------------");

    }
    
    console.log("TAMAÑO LISTA ANTES DE DAR PAGINACION: "+this.tamañoLista)

  }

}




