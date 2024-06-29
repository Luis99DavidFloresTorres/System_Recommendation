import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceCursante } from 'src/app/services/Cursantes_s.services';
import { ServiceRecomendacionEstudiante } from 'src/app/services/Recomendaciones_Estudiante';

@Component({
  selector: 'app-recomendar',
  templateUrl: './recomendar.component.html',
  styleUrls: ['./recomendar.component.css']
})
export class RecomendarComponent {
  dataSource = new MatTableDataSource<any>();
  sujeto:Subscription|any;
  nombre = new FormControl('');
  mensaje = new FormControl('');
  tiempo = new FormControl('');
  cantidad = new FormControl('');
  estadoBuscar = false;

  displayedColumns=['nombrecompleto','celular','area','nombretitulo','nombreuniversidad','rango_ano_titulacion','edad_rango','accion']
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  constructor(private service:ServiceCursante,private serviceRecomendacionEst:ServiceRecomendacionEstudiante ){
   
  }
  hacerFiltro(filtro:string){
    this.dataSource.filter=filtro;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.pag;
  }
  ngOnDestroy(): void {
    if(this.sujeto!= undefined){
      this.sujeto.unsubscribe();
    }
  }
  buscar(){
    
    this.service.buscar(this.nombre.value)
    if(this.sujeto!= undefined){
      this.sujeto.unsubscribe();
    }
    this.dataSource.data = []
    this.estadoBuscar = true
    this.sujeto=  this.service.listenerBuscar().subscribe(data=>{
      
        this.dataSource.data=data
        console.log('.............')
        console.log(this.dataSource.data)
        this.estadoBuscar=false
    })
  }
  enviar(){
    var json = {'alumnos':this.dataSource.data,'mensaje':this.mensaje.value,'curso':this.nombre.value,'tiempo':0,'repetidor':0}
    
    var soloNumeros = /^\d+$/;
    if(this.tiempo.value!=null && this.tiempo.value!="" &&this.cantidad.value!=null && this.cantidad.value!=""){
      
      if(soloNumeros.test(this.tiempo.value) && soloNumeros.test(this.cantidad.value)){
        json['tiempo']= Number(this.tiempo.value)
        json['repetidor']=Number(this.cantidad.value)
        this.serviceRecomendacionEst.repetirMensaje(json)
      }
    }
    //this.serviceRecomendacionEst.guardarEnviarRecomendacion(json)
  }
  eliminarElemento(elemento: any) {
    const index = this.dataSource.data.indexOf(elemento);
    if (index !== -1) {
       
      this.dataSource.data.splice(index, 1)
      this.dataSource.data = this.dataSource.data
    }
  }
}
