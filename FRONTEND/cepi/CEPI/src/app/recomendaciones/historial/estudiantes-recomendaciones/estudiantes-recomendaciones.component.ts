import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceRecomendacionEstudiante } from 'src/app/services/Recomendaciones_Estudiante';
import { SoloRecomendacionesComponent } from '../solo-recomendaciones/solo-recomendaciones.component';

@Component({
  selector: 'app-estudiantes-recomendaciones',
  templateUrl: './estudiantes-recomendaciones.component.html',
  styleUrls: ['./estudiantes-recomendaciones.component.css']
})
export class EstudiantesRecomendacionesComponent {
  displayedColumns= ['nombrecompleto','celular','nombretitulo',"edad_rango","estado"];
  dataSource = new MatTableDataSource<any>();
  sujeto:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  constructor(private service:ServiceRecomendacionEstudiante,private route:Router,@Inject(MAT_DIALOG_DATA) public data: any ){
    this.service.mostrarEstudiantes(data.id)
    if(this.sujeto!= undefined){
      this.sujeto.unsubscribe();
    }
    this.sujeto = service.listenerMostrarEstudiantes().subscribe(data=>{
      this.dataSource.data =data
    })
    this.service.id=-1
  }
  hacerFiltro(filtro:string){
    this.dataSource.filter=filtro;
  }
  
  ngOnDestroy(): void {
    if(this.sujeto!= undefined){
      this.sujeto.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.pag;
  }

  mostrar(id:any){
    this.service.id=id
    this.route.navigateByUrl('/registrarCursante')
  }
}
