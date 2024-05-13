import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarComponent } from './usuarios/registrar/registrar.component';
import { MostrarComponent } from './usuarios/mostrar/mostrar.component';
import { LoginComponent } from './login/login.component';
import { RecomendarComponent } from './recomendaciones/recomendar/recomendar.component';
import { SoloRecomendacionesComponent } from './recomendaciones/historial/solo-recomendaciones/solo-recomendaciones.component';
import { EstudiantesRecomendacionesComponent } from './recomendaciones/historial/estudiantes-recomendaciones/estudiantes-recomendaciones.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    MostrarComponent,
    LoginComponent,
    RecomendarComponent,
    SoloRecomendacionesComponent,
    EstudiantesRecomendacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
