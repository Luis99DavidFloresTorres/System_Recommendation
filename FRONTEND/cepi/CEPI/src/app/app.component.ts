import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceUsuario } from './services/Usuarios_s.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CEPI';
  usuario = false;
  admin = false;
  sujeto: Subscription|any;
  constructor(private service:ServiceUsuario){
    if(this.sujeto!=undefined) {
      this.sujeto.unsubscribe();
    }
    console.log(localStorage.getItem('access'))
   if(localStorage.getItem('access')!=undefined){
    this.claim()

   }
   
    this.sujeto = this.service.listenerBotones().subscribe(async data=>{
        var usuario:any = await this.service.claims()
        if(usuario.user_details.tipo=='Admin'){
            this.admin=true;
            this.usuario=false;
        }else
        if(usuario.user_details.tipo=='Usuario'){
          this.usuario=true;
          this.admin=false;
        }else{
          this.usuario=false;
          this.admin=false;
        }

    })
  }
  async claim(){
    var usuario:any =  await this.service.claims()
    
        if(usuario.user_details.tipo=='Admin'){
            this.admin=true;
            this.usuario=false;
        }else
        if(usuario.user_details.tipo=='Usuario'){
          this.usuario=true;
          this.admin=false;
        }else{
          this.usuario=false;
          this.admin=false;
        }
  }
 logout(){
  this.service.out();
 }
}
