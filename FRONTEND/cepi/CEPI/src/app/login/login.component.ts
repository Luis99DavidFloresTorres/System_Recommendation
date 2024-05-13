import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ServiceUsuario } from '../services/Usuarios_s.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup:FormGroup|any;
  sujetoSubscripcion: Subscription|any;
  mostrarPassword = false;
  constructor(private formBuilder:FormBuilder, private service:ServiceUsuario){
    this.formGroup = this.formGroup= this.formBuilder.group({
      usuario:['',[Validators.required]],
      contrasena:['',[Validators.required]]
    });
  }
  ingresar(){ 
    var usuario = this.formGroup.get('usuario').value
    var contrasena = this.formGroup.get('contrasena').value
    this.service.login(usuario,contrasena)
    
  }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!=undefined) {
      this.sujetoSubscripcion.unsubscribe();
    }

  }
}
