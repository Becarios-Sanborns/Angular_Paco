import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../altas/altas.component';
import { ActualizarTablaBusquedaServiceService } from '../services/actualizar-tabla-busqueda-service.service';
import { ActualizarTablaService } from '../services/actualizar-tabla.service';
import { BusquedaService } from '../services/busqueda.service';
import { DecrementarIdService } from '../services/decrementar-id.service';
import { EnvioPersonaATablaService } from '../services/envio-persona-a-tabla.service';



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
  auxTamañoLista: number = 0;
  auxTamañoListaBusqueda: number = 0;

  constructor(
    private busquedaService: BusquedaService,
    private DecrementarId: DecrementarIdService,
    private TablaActualizada: ActualizarTablaService,
    private TablaBusqueda: ActualizarTablaBusquedaServiceService,
    private AñadoPersona: EnvioPersonaATablaService) { }


  ngOnInit() {
    //SUSCRIPCION PARA AÑADIR PERSONAS
    this.AñadoPersona.Persona$.subscribe(PersonaNueva => {

      for (var i = 0; i < this.ListaPersonas.length; i++) {
        console.log(this.ListaPersonas[i]);
      }
      console.log("--------------------");
      this.ListaPersonas.push(PersonaNueva);
      this.tamañoLista = this.ListaPersonas.length;
      for (var i = 0; i < this.ListaPersonas.length; i++) {
        console.log(this.ListaPersonas[i]);
      }
      console.log("LISTA ANTES:");
      console.log("TAMAÑO LISTA: " + this.tamañoLista);

      //AQUI ACTUALIZO LA TABLA MIENTRAS QUE TENGA UNA MENOR A LA QUE PUEDA MOSTRAR
      if (this.PosicionPaginacion <= this.NumeroFilas) {
        this.ListaPersonasMostrados = []; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS
        if (this.tamañoLista != undefined) {
          if (this.PosicionPaginacion < this.NumeroFilas) {
            this.PosicionPaginacion++;
          }
        }
        if (this.tamañoLista != undefined) {
          for (var i = 0; i <= this.PosicionPaginacion - 1; i++) {
            this.ListaPersonasMostrados.push(this.ListaPersonas[i]);
          }
        }
      }
      else {//AQUI ACTUALIZO LA TABLA MIENTRAS QUE TENGA UNA MAYOR A LA QUE PUEDA MOSTRAR
        console.log("PAGINACION POS" + this.PosicionPaginacion);
        if (this.PosicionPaginacion % this.NumeroFilas != 0 || this.PosicionPaginacion == this.tamañoLista) {
          this.ListaPersonasMostrados = [];

          for (var i = this.tamañoLista - (this.PosicionPaginacion % this.NumeroFilas); i <= this.tamañoLista; i++) {
            this.ListaPersonasMostrados.push(this.ListaPersonas[i - 1]);
          }
          this.PosicionPaginacion++;
        }
      }
      this.mainCheckbox = false;

    });
    //SERVICIO QUE ACTUALIZA LA TABLA DE BUSQUEDA
    this.TablaBusqueda.TablaBusquedaActualizada$.subscribe(Lista => {
      for (var i = 0; i < this.ListaSeleccionados.length; i++) {
        if (this.ListaSeleccionados[i].id == this.IdPersonaEliminada) {
          this.contador--;
          console.log("contador: " + this.contador);
          break;
        }
      }
      this.ListaSeleccionados.filter(Seleccionado => Seleccionado.id != this.IdPersonaEliminada);

      this.ListaBusqueda = [];
      for (var i = 0; i < Lista.length; i++) {
        this.ListaBusqueda.push(Lista[i]);
      }
      console.log("PASA POR AQUI")
      if (this.ListaBusqueda.length != 0) {
        this.ActualizarTabla();

        this.ListaSeleccionados = this.ListaSeleccionados.filter((item) => item.id !== this.IdPersonaEliminada)
        this.contador = this.ListaSeleccionados.length;
      }
      else {
        this.ListaPersonasMostrados = [];
        this.PosicionPaginacionBusqueda--;
        this.PosicionPaginacion = 0;
      }
      if (this.ListaBusqueda.length == this.contador && this.ListaBusqueda.length != 0) {

        this.mainCheckbox = true;


      }

    });

    ////////////////////////////////////////////////////////////////////////////////
    //SERVICIO ACTUALIZAR TABLA CUANDO SE ELIMINA
    this.TablaActualizada.TablaActualizada$.subscribe(Lista => {

      for (var i = 0; i < this.ListaSeleccionados.length; i++) {
        if (this.ListaSeleccionados[i].id == this.IdPersonaEliminada) {
          this.contador--;
          console.log("contador: " + this.contador);
          break;
        }
      }
      this.ListaSeleccionados.filter(Seleccionado => Seleccionado.id != this.IdPersonaEliminada);
      console.log("IMPRIMO SELECCIONADOS")
      for (var i = 0; i < this.ListaSeleccionados.length; i++) {
        console.log(this.ListaSeleccionados[i]);
      }

      this.auxTamañoLista = this.tamañoLista;
      this.ListaPersonas = [];
      this.tamañoLista = Lista.length;
      console.log("TAMAÑO LISTA: " + this.tamañoLista);

      for (var i = 0; i < Lista.length; i++) {
        this.ListaPersonas.push(Lista[i]);
      }
      if (this.ListaPersonas.length != 0) {
        this.DecrementarId.Id$.emit(this.IdPersonaEliminada);
        this.ActualizarTabla();
      }
      else {
        this.DecrementarId.Id$.emit(this.IdPersonaEliminada);
        this.ListaPersonasMostrados = [];
        this.PosicionPaginacion = 0;
        this.tamañoLista = 0;
      }

      console.log("TAMAÑO LISTA: " + this.tamañoLista)
      console.log("CONTADOR: " + this.contador);
      if (this.tamañoLista == this.contador) {
        if (this.tamañoLista != 0) {
          this.mainCheckbox = true;
        }

      }
      console.log("MANDO EL ID: " + this.IdPersonaEliminada);
    });
    //////////////////////////////////////////////////////////////


    //SERVICIO MOSTRA TABLA CUANDO BUSCO
    this.busquedaService.nombre$.subscribe(texto => {
      this.NombreBuscado = texto;
      this.BuscarPersona();
    });



  }

  //METODOS
  BuscarPersona() {
    this.mainCheckbox = false;
    this.contador = 0; //REINICIO EL CONTADOR PARA SABER CUANTOS SELECCIONADOS HAY
    this.ListaSeleccionados = [];//CADA VEZ QUE SE BUSCA SE LIMPIAN LOS CHECKBOX
    var CopiaListaPersonas = this.ListaPersonas.slice();

    this.ListaPersonas.map(Persona => { return Persona.seleccionado = false; });

    if (this.NombreBuscado.length != 0) {

      /************************************************************************* */
      this.ListaPersonasMostrados = [];
      this.PosicionPaginacionBusqueda = 0;
      this.contador = 0;
      this.ListaBusqueda = [];
      for (var i = 0; i < (CopiaListaPersonas.length); i++) {

        var nombres = this.ListaPersonas[i].nombres;
        if (nombres.includes(this.NombreBuscado) == true) {
          this.ListaBusqueda.push(CopiaListaPersonas[i]); //AQUI AÑADO LAS SIMILITUDES A LA LISTA DE BUSQUEDA
        }
      }
      //IMPRIMMO LA LISTA DE BUSQUEDA
      for (var i = 0; i < this.ListaBusqueda.length; i++) {
        console.log(this.ListaBusqueda[i]);
      }

      if (this.ListaBusqueda.length >= this.NumeroFilas) {
        this.PosicionPaginacionBusqueda = this.NumeroFilas;
      }
      else {
        //AQUI ENTRO SI ES MENOR DEL NUMERO DE FILAS
        this.PosicionPaginacionBusqueda = this.ListaBusqueda.length % this.NumeroFilas;

      }
      for (var i = 1; i <= this.PosicionPaginacionBusqueda; i++) {
        this.ListaPersonasMostrados.push(this.ListaBusqueda[i - 1]);
      }

      /************************************************************************* */


    } else {/////////////////////////////////////////////////////////////////////////////
      //AAQUI ENTRO CUANDO NO ESTOY BUSCANDO
      this.ListaBusqueda = [];
      this.PosicionPaginacion = 0;
      this.ListaPersonasMostrados = [];
      console.log("YA NO ESTOY BUSCANDO")
      if (CopiaListaPersonas.length >= this.NumeroFilas) {
        this.PosicionPaginacion = this.NumeroFilas;
      }
      else {
        this.PosicionPaginacion = CopiaListaPersonas.length % this.NumeroFilas;
      }
      for (var i = 1; i <= this.PosicionPaginacion; i++) {
        this.ListaPersonasMostrados.push(CopiaListaPersonas[i - 1]);
      }

      //AQUI CUANDO DEJO DE BUSCAR
      for (var i = 0; i < this.ListaPersonas.length; i++) {
        console.log(this.ListaPersonas[i]);
      }
      console.log("*******************************")
    }
  }


  //////////////////////////////////////////////////////////////////////////////////////
  //FUNCIONA LA PAGINACION SIN BUSCAR LAS PERSONAS
  paginacionSiguiente() {
    if (this.NombreBuscado == "")// PAGINACION SIN BUSQUEDA
    {
      console.log("DOY PAGINCION: " + this.tamañoLista);
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
        if (this.PosicionPaginacionBusqueda + this.NumeroFilas <= this.ListaBusqueda.length) {
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
    if (this.NombreBuscado == "")//PAGINACION FINAL SIN BUSCAR
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
    if (this.NombreBuscado == "")//PAGINACION ANTERIOR SIN BUSCAR
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
      } else {
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
      } else {
        console.log("NO PUEDES DAR ANTERIOR");
      }
    }

  }


  paginacionInicial() {
    if (this.NombreBuscado == "") {//PAGINACION INICIAL SIN BUSQUEDA
      if (this.PosicionPaginacion > this.NumeroFilas) {
        this.ListaPersonasMostrados = []; //LIMPIO EL ARREGLO DE MOSTRADOS PARA PROXIMOS DATOS MOSTRADOS

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

        for (var i = 0; i < this.NumeroFilas; i++) {
          this.ListaPersonasMostrados.push(this.ListaBusqueda[i]);
        }
        this.PosicionPaginacionBusqueda = this.NumeroFilas;
      } else {
        console.log("Ya estas en el inicio de la paginacion");
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //Evento para actualizar el estado de los checkbox
  contador: number = 0; //Variable que me ayudara a saber cuantos estan seleccionados
  onChangePersona($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    if (this.NombreBuscado == "") //EVENTO CHECK SIN BUSQUEDA
    {
      this.ListaPersonas = this.ListaPersonas.map((d) => {

        if (d.id == id) {
          if (isChecked == true) {
            console.log("ENTRO");
            this.contador++;
            this.ListaSeleccionados.push(d);
            console.log("contador :" + this.contador);

          } else {
            this.contador--;
            console.log("CONTADOR: " + this.contador);
            this.ListaSeleccionados = this.ListaSeleccionados.filter((persona) => persona.id != d.id)

            this.mainCheckbox = false;
          }
          if (this.NombreBuscado == "") {
            if (this.contador == this.tamañoLista) {

              this.mainCheckbox = true;
            }
          }
          else {
            if (this.contador == this.ListaBusqueda.length) {

              this.mainCheckbox = true;
            }
          }

          d.seleccionado = isChecked;
          return d;
        }
        if (id == -1) {
          if (isChecked == true) {
            console.log("11111111")

            this.contador = 0;
            d.seleccionado = true;
            this.contador++;
          }
          else {
            console.log("22222222")
            d.seleccionado = false;
            // this.contador--;
          }
          return d;
        }
        return d;
      });
      console.log("TAMAÑO LISTA: " + this.tamañoLista);
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
    console.log("-------------------")
  }


  isVisibleSeleccionados: boolean = false; //METODO BOOLEANO QUE FUNCIONARA PARA MOSTRAR CUALQUIERA DE LOS 2 MODALES
  //METODO PARA MOSTAR EL MODAL DE LAS PERSONAS SELECCIONADAS: 
  mostrarSeleccionados() {
    this.ListaSeleccionados = [];
    var CopiaLista = this.ListaPersonas.slice();
    this.ListaSeleccionados = CopiaLista.filter((Persona) => Persona.seleccionado == true)
    if (this.ListaSeleccionados.length > 0) {
      console.log("CONTADOR: " + this.contador);
      console.log("TAMAÑO LISTA PERSONAS: " + this.ListaPersonas.length);

      this.isVisibleSeleccionados = !this.isVisibleSeleccionados;
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
  IdPersonaEliminada: number = 0;  //<-------------------------

  mostrarEliminar($event: Persona) {
    console.log("TAMAÑO LISTA ANTES DE MANDARLA: " + this.tamañoLista);
    console.log("-----------------------------");
    for (var i = 0; i < this.ListaPersonas.length; i++) {
      console.log(this.ListaPersonas[i]);
    }
    console.log("----------------------------")
    this.IdPersonaEliminada = $event.id;
    this.isVisibleEliminar = !this.isVisibleEliminar;

    console.log("//////////////////////")
    for (var i = 0; i < this.ListaBusqueda.length; i++) {
      console.log(this.ListaBusqueda[i])
    }
    console.log("/////////////////////")
  }


  get_isVisibleEliminar(e: boolean)//EVENTO QUE RETORNA UN FALSE DEL MODAL,          
  {                               //EL CUAL SIGNIFICA QUE SE OCULTO
    this.isVisibleEliminar = e;
  }


  ActualizarTabla() {
    var Inicio = 0;
    var limite = 0;
    this.ListaPersonasMostrados = [];

    if (this.NombreBuscado == "")//AAQUI ENTRO SIN BUSCAR
    {
      if (this.IdPersonaEliminada <= this.NumeroFilas) {
        if (this.tamañoLista <= this.NumeroFilas) //AQUI ENTRO CUANDO SE ENCUENTRA EN LA ULTIMA POSICION
        {
          limite = this.ListaPersonas.length;
          this.PosicionPaginacion--;
          for (var i = 1; i <= limite; i++) {
            this.ListaPersonasMostrados.push(this.ListaPersonas[i - 1]);
          }
        }
        else //AQUI ENTRO CUANDO LA POSICION NO ES LA ULTIMA
        {
          limite = this.NumeroFilas;
          for (var i = 1; i <= limite; i++) {
            this.ListaPersonasMostrados.push(this.ListaPersonas[i - 1]);
          }
        }
        //LLENO EL ARREGLO DE PERSONAS QUE VOY A MOSTRAR
      }
      else {

        if (this.PosicionPaginacion < this.auxTamañoLista) {
          console.log("ES MAYOR AL NUMERO DE FILAS PERO NO ES EL ULTIMO")
          Inicio = this.PosicionPaginacion - this.NumeroFilas + 1;
          limite = this.PosicionPaginacion;
        }
        else //AQUI ENTRO SI ES LA ULTIMA POSICION
        {
          if (this.PosicionPaginacion % this.NumeroFilas == 1) {
            Inicio = this.PosicionPaginacion - this.NumeroFilas;
            limite = this.PosicionPaginacion - 1;
            this.PosicionPaginacion--;
          }
          else {
            Inicio = this.PosicionPaginacion - (this.tamañoLista % this.NumeroFilas);
            limite = this.PosicionPaginacion - 1
            this.PosicionPaginacion--;
            console.log("INICIO: " + Inicio + " LIMITE: " + limite)
          }
        }

        for (var i = Inicio; i <= limite; i++) {
          this.ListaPersonasMostrados.push(this.ListaPersonas[i - 1]);
        }


      }
      console.log("PAGINACION: " + this.PosicionPaginacion);
    }
    else //AQUI ENTRO BUSCANDO //////////////////////////////////////////////////////////////////////////////
    {
      console.log("Paginacion Busqueda: " + this.PosicionPaginacionBusqueda)
      if (this.PosicionPaginacionBusqueda <= this.NumeroFilas) {
        if (this.PosicionPaginacionBusqueda < this.ListaBusqueda.length) //NO ES LA ULTIMA POSICION
        {

          limite = this.NumeroFilas;
          for (var i = Inicio; i < limite; i++) {
            this.ListaPersonasMostrados.push(this.ListaBusqueda[i])
          }
        }
        else //ES ULTIMA POSICION
        {
          this.PosicionPaginacionBusqueda--
          limite = this.ListaBusqueda.length;
          for (var i = Inicio; i < limite; i++) {
            this.ListaPersonasMostrados.push(this.ListaBusqueda[i])
          }
        }
      }
      else {
        if (this.PosicionPaginacionBusqueda < this.ListaBusqueda.length) {
          Inicio = this.PosicionPaginacionBusqueda - this.NumeroFilas + 1;
          limite = this.PosicionPaginacionBusqueda;
        }
        else {
          console.log("333333333333333333333333333333333333333")
          console.log("Posicion Paginacion: " + this.PosicionPaginacionBusqueda)
          if (this.PosicionPaginacionBusqueda % this.NumeroFilas == 0) {

            Inicio = this.PosicionPaginacionBusqueda - this.NumeroFilas + 1;
            console.log("INICIO: " + Inicio)
            limite = this.PosicionPaginacionBusqueda;
            this.PosicionPaginacionBusqueda--;
          }
          else {
            Inicio = this.PosicionPaginacionBusqueda - (this.PosicionPaginacionBusqueda % this.NumeroFilas) + 1
            limite = this.PosicionPaginacionBusqueda;
            console.log("Inicio: " + Inicio);
            console.log("Limite: " + limite);
            this.PosicionPaginacionBusqueda--;

          }
        }
        for (var i = Inicio; i <= limite; i++) {
          this.ListaPersonasMostrados.push(this.ListaBusqueda[i - 1]);
        }
      }
      console.log("-----------------------------------------------------------");
    }
    //console.log("TAMAÑO LISTA ANTES DE DAR PAGINACION: "+this.tamañoLista)

  }

}