import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(estado: any): string {
    
    if(estado==1){
      return "Se envió el mensaje"
    }else{
      return 'No se envió el mensaje'
    }
  }


}
