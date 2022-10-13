import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AltasComponent } from './altas/altas.component';
import { BuscarComponent } from './buscar/buscar.component';
import { TablaComponent } from './tabla/tabla.component';
import { FormsModule } from '@angular/forms';
import { ModalMostrarComponent } from './modal-mostrar/modal-mostrar.component';


@NgModule({
  declarations: [
    AppComponent,
    AltasComponent,
    BuscarComponent,
    TablaComponent,
    ModalMostrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
