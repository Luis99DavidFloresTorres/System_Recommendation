import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceCursante } from 'src/app/services/Cursantes_s.services';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent {
  displayedColumns= ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<any>();
  sujeto:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  constructor(private service:ServiceCursante,private route:Router ){
    service.mostrar()
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
  eliminar(id:any){
    
    const result = confirm('¿Está seguro de que desea eliminar?');
    if (result) {
      this.service.eliminar(id)
    }
  }
  editar(id:any){
    this.service.id=id
    this.route.navigateByUrl('/registrarCursante')
  }
}
