import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceUsuario } from 'src/app/services/Usuarios_s.service';

@Component({
  selector: 'app-registrar-u',
  templateUrl: './registrar-u.component.html',
  styleUrls: ['./registrar-u.component.css']
})
export class RegistrarUComponent {
  tipos=['Admin','Usuario']
  formGroup:FormGroup|any;
  constructor(private formBuilder:FormBuilder, private service:ServiceUsuario){
    this.formGroup = this.formGroup= this.formBuilder.group({
      usuario:[''],
      contrasena:[''],
      tipo:['']
    });
    console.log(this.service.id)
    if(this.service.id!=undefined && this.service.id >=0){
      this.service.findById(this.service.id)
      this.service.listenerById().subscribe(data=>{
        console.log(data)
        this.formGroup.get('usuario').setValue(data.usuario)
        this.formGroup.get('contrasena').setValue(data.contrasena)
        this.formGroup.get('tipo').setValue(data.tipo)
      })
    }
  }
  registrar(){}
}
