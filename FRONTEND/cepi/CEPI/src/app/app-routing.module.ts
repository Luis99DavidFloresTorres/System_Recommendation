import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { guardsGuard } from './guards.guard';
import { MostrarComponent } from './cursantes/mostrar/mostrar.component';
import { MostrarUComponent } from './usuarios/mostrar-u/mostrar-u.component';
import { EstudiantesRecomendacionesComponent } from './recomendaciones/historial/estudiantes-recomendaciones/estudiantes-recomendaciones.component';
import { SoloRecomendacionesComponent } from './recomendaciones/historial/solo-recomendaciones/solo-recomendaciones.component';
import { RegistrarUComponent } from './usuarios/registrar-u/registrar-u.component';
import { RegistrarComponent } from './cursantes/registrar/registrar.component';
import { CredencialesComponent } from './usuarios/credenciales/credenciales.component';
import { RecomendarComponent } from './recomendaciones/recomendar/recomendar.component';
import { IngresarExcelComponent } from './ingresar-excel/ingresar-excel.component';

const routes: Routes = [{ path:'', component: LoginComponent},
{ path:'cursantesMostrar', component: MostrarComponent, canActivate:[guardsGuard]},
{ path:'usuariosMostrar', component: MostrarUComponent, canActivate:[guardsGuard]},
{ path:'usuariosRegistrar', component: RegistrarUComponent, canActivate:[guardsGuard]},
{ path:'cursantesRegistrar', component: RegistrarComponent, canActivate:[guardsGuard]},
{ path:'historial', component: SoloRecomendacionesComponent, canActivate:[guardsGuard]},
{ path:'credenciales', component: CredencialesComponent, canActivate:[guardsGuard]},
{ path:'recomendar', component: RecomendarComponent, canActivate:[guardsGuard]},
{ path:'excel', component: IngresarExcelComponent, canActivate:[guardsGuard]},
{ path:'registrar', component: RegistrarComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
