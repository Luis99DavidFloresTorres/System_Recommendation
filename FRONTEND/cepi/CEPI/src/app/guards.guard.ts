import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ServiceUsuario } from './services/Usuarios_s.service';
import { Subscription } from 'rxjs';
var sujeto: Subscription|any;
export const guardsGuard: CanActivateFn =async (route, state) => {
  var service = inject(ServiceUsuario)
  
  var usuario:any = await service.claims()
  var nivelUsuario = usuario.user_details.tipo
  if(state.url=='mostrarUsuario' || state.url=='guardarUsuario'){
    if(nivelUsuario=='Admin'){
      return true
    }else{
      alert('No tienes permisos para entrar')
      return false
    }
  }
  if(nivelUsuario=='Admin' || nivelUsuario=='Usuario'){
    return true;
  }else{
    alert('No tienes permisos para entrar')
    return false
  }
};
