import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { cursante } from 'src/app/models/cursante.model';
import { ServiceCursante } from 'src/app/services/Cursantes_s.services';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  sujeto:Subscription|any;
  edades=['menor-32','33-39','40-46','47-mayor']
  titulacionR=['antiguo','2010-2016','2017-actual']
  areas= ['tecnológicas','humanidades y sociales','ciencias de la salud','ciencias económicas','ciencias agrarias']
  tipos=['Admin','Usuario']
  formGroup:FormGroup|any;
  private unsubscribe: Subject<void> = new Subject<void>();
  constructor(private formBuilder:FormBuilder, private service:ServiceCursante, private matDialog:MatDialog){
    this.formGroup = this.formGroup= this.formBuilder.group({
      id:[''],
      nombre:[''],
      area:[''],
      universidad:[''],
      celular:[''],
      edad:[''],
      titulo:[{value:'',disabled:true}],
      titulacion:['']
    });
    console.log(this.service.id)
    if(this.service.id!=undefined && this.service.id >=0){
      this.service.findById(this.service.id)
      this.service.listenerById().subscribe(data=>{
        this.formGroup.get('id').setValue(data.id)
        this.formGroup.get('nombre').setValue(data.nombrecompleto)
        this.formGroup.get('area').setValue(data.area)
        this.formGroup.get('universidad').setValue(data.nombreuniversidad)
        this.formGroup.get('edad').setValue(data.edad_rango)
        this.formGroup.get('celular').setValue(data.celular)
        this.formGroup.get('titulo').setValue(data.nombretitulo)
        this.formGroup.get('titulacion').setValue(data.rango_ano_titulacion)
      })
    }
  }
  ngOnDestroy(): void {
    if(this.sujeto!= undefined){
      this.sujeto.unsubscribe();
    }
    this.service.id=-1
  }
  titulos(){
    var dialog = this.matDialog.open(DialogComponent,{height: '700px',
    width: '800px',})
    dialog.afterClosed().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(result => {
      this.formGroup.get('titulo').setValue(result)
    });
   
  }
  
  registrar(){
    var nombre=this.formGroup.get('nombre').value
    var universidad=this.formGroup.get('universidad').value
    var edad=this.formGroup.get('edad').value
    var area=this.formGroup.get('area').value
    var tituloR=this.formGroup.get('titulacion').value
    var titulo = this.formGroup.get('titulo').value
    var celular = this.formGroup.get('celular').value
    if(this.service.id!=undefined && this.service.id>=0){
      var cursante:cursante ={'id':this.service.id,'nombrecompleto':nombre,'nombretitulo':titulo,'nombreuniversidad':universidad,'celular':celular,'area':area,'edad_rango':edad,'rango_ano_titulacion':tituloR}
      this.service.editar(cursante)
    }else{
      var cursante:cursante ={'id':undefined,'nombrecompleto':nombre,'nombretitulo':titulo,'nombreuniversidad':universidad,'celular':celular,'area':area,'edad_rango':edad,'rango_ano_titulacion':tituloR}
      this.service.agregar(cursante);
    }
  }
}
