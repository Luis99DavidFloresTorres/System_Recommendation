import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceCursante } from 'src/app/services/Cursantes_s.services';

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
  displayedColumns=['nombrecompleto','celular','area','nombretitulo','nombreuniversidad','rango_ano_titulacion','edad_rango']
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  constructor(private service:ServiceCursante,private route:Router ){
   
  }
  hacerFiltro(filtro:string){
    this.dataSource.filter=filtro;
  }
  
  ngOnDestroy(): void {
    if(this.sujeto!= undefined){
      this.sujeto.unsubscribe();
    }
  }
  buscar(){
    console.log(this.nombre.value)
  }
  enviar(){}
}
