import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceCursante } from 'src/app/services/Cursantes_s.services';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  sujeto:Subscription|any;
  constructor(private service:ServiceCursante){

  }
  ngOnDestroy(): void {
    if(this.sujeto!= undefined){
      this.sujeto.unsubscribe();
    }
    this.service.id=-1
  }
 
  agregar(){
    
    if(this.service.id!=undefined && this.service.id!=-1){
      this.service.editar(2)
    }else{
      this.service.agregar(2);
    }
  }
}
