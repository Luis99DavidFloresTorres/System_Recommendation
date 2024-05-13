import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usuario } from 'src/app/models/usuario.model';
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
        this.formGroup.get('usuario').setValue(data.usuario)
        this.formGroup.get('contrasena').setValue(data.contrasena)
        this.formGroup.get('tipo').setValue(data.tipo)
      })
    }
  }
  registrar(){
    var usuario=this.formGroup.get('usuario').value
    var contrasena = this.formGroup.get('contrasena').value
    var tipo = this.formGroup.get('tipo').value
   
    if(this.service.id!=undefined && this.service.id>=0){
      var usuarioM:usuario ={usuario:usuario,contrasena:contrasena, tipo:tipo,idusuario:this.service.id}
      this.service.editar(usuarioM)
    }else{
      var usuarioM:usuario ={usuario:usuario,contrasena:contrasena, tipo:tipo,idusuario:undefined}
      this.service.agregar(usuarioM);
    }
  }
}
