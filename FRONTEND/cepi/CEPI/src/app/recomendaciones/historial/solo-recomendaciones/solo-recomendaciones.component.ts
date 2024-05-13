import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceRecomendacionEstudiante } from 'src/app/services/Recomendaciones_Estudiante';
import { EstudiantesRecomendacionesComponent } from '../estudiantes-recomendaciones/estudiantes-recomendaciones.component';
import { ServiceRecomendacion } from 'src/app/services/Recomendaciones_s.services';

@Component({
  selector: 'app-solo-recomendaciones',
  templateUrl: './solo-recomendaciones.component.html',
  styleUrls: ['./solo-recomendaciones.component.css']
})
export class SoloRecomendacionesComponent {
  displayedColumns= ["fecha","mensaje","curso","botones"];
  dataSource = new MatTableDataSource<any>();
  sujeto:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  constructor(private service:ServiceRecomendacion,private route:Router,  public dialog: MatDialog){
    this.service.mostrar()
    if(this.sujeto!= undefined){
      this.sujeto.unsubscribe();
    }
    this.sujeto = service.listenerMostrar().subscribe(data=>{
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
    const dialogRef = this.dialog.open(EstudiantesRecomendacionesComponent, {
      data: {'id':id},
    });
  }
}
