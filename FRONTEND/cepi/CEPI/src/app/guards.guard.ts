import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceUsuario } from './services/Usuarios_s.service';
import { Subscription } from 'rxjs';
var sujeto: Subscription|any;
export const guardsGuard: CanActivateFn =async (route, state) => {
  var service = inject(ServiceUsuario)
  var router = inject(Router)
  if(localStorage.getItem('access')!=undefined){
    var usuario:any = await service.claims()
  }else{
    alert('No tienes permisos para entrar')
    router.navigateByUrl('/')
      return false
  }
  var nivelUsuario = usuario.user_details.tipo
  if(state.url=='mostrarUsuario' || state.url=='guardarUsuario'){
    if(nivelUsuario=='Admin'){
      return true
    }else{
      alert('No tienes permisos para entrar')
      router.navigateByUrl('/')
      return false
    }
  }
  if(nivelUsuario=='Admin' || nivelUsuario=='Usuario'){
    return true;
  }else{
    alert('No tienes permisos para entrar')
    router.navigateByUrl('/')
    return false
  }
  
};
