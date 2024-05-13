import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(estado: any): string {
    return estado == 1 ? 'Se envió el mensaje' : 'No se envió el mensaje';
  }


}
