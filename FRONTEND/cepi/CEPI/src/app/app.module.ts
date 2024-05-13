import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RecomendarComponent } from './recomendaciones/recomendar/recomendar.component';
import { SoloRecomendacionesComponent } from './recomendaciones/historial/solo-recomendaciones/solo-recomendaciones.component';
import { EstudiantesRecomendacionesComponent } from './recomendaciones/historial/estudiantes-recomendaciones/estudiantes-recomendaciones.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MostrarUComponent } from './usuarios/mostrar-u/mostrar-u.component';
import { RegistrarUComponent } from './usuarios/registrar-u/registrar-u.component';
import {MatIconModule} from '@angular/material/icon';
import { MostrarComponent } from './cursantes/mostrar/mostrar.component';
import { DialogComponent } from './cursantes/registrar/dialog/dialog.component';
import { EstadoPipe } from './recomendaciones/estudiantes-recomendaciones/estado.pipe';
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es'
import { RegistrarComponent } from './cursantes/registrar/registrar.component';
registerLocaleData(localEs,'es')
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecomendarComponent,
    SoloRecomendacionesComponent,
    EstudiantesRecomendacionesComponent,
    MostrarUComponent,
    RegistrarUComponent,
    MostrarComponent,
    RegistrarComponent,
    DialogComponent,
    EstadoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule
  ],
  providers: [MaterialModule, {provide:LOCALE_ID, useValue:'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
