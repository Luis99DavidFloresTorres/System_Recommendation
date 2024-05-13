import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { usuario } from 'src/app/models/usuario.model';
import { ServiceUsuario } from 'src/app/services/Usuarios_s.service';

@Component({
  selector: 'app-credenciales',
  templateUrl: './credenciales.component.html',
  styleUrls: ['./credenciales.component.css']
})
export class CredencialesComponent {
  id:any;
  tipo:any;
  formGroup:FormGroup|any;
  constructor(private formBuilder:FormBuilder, private service:ServiceUsuario){
    this.formGroup = this.formGroup= this.formBuilder.group({
      usuario:[''],
      contrasena:[''],
    });
    this.claim()
    
  }
  ngOnDestroy(): void {
    this.tipo=undefined
    this.id=undefined
  }
  async claim():Promise<any>{
    var usuario:any =  await this.service.claims()
    console.log(usuario.user_details)
      this.formGroup.get('usuario').setValue(usuario.user_details.usuario)
      this.formGroup.get('contrasena').setValue(usuario.user_details.contrasena)
      this.id= usuario.user_details.id
      this.tipo= usuario.user_details.tipo
    
  }
  registrar(){
    var usuario=this.formGroup.get('usuario').value
    var contrasena = this.formGroup.get('contrasena').value
    var usuarioM:usuario ={usuario:usuario,contrasena:contrasena, tipo:this.tipo,idusuario:this.id}
    this.service.editar(usuarioM)
    
  }
}
