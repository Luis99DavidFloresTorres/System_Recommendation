import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceCursante } from 'src/app/services/Cursantes_s.services';
import { ServiceUsuario } from 'src/app/services/Usuarios_s.service';

@Component({
  selector: 'app-mostrar-u',
  templateUrl: './mostrar-u.component.html',
  styleUrls: ['./mostrar-u.component.css']
})
export class MostrarUComponent {
  displayedColumns= ["usuario","contrasena","tipo","botones"];
  dataSource = new MatTableDataSource<any>();
  sujeto:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  constructor(private service:ServiceUsuario,private route:Router ){
    service.mostrar()
    this.sujeto = service.listenerMostrar().subscribe(data=>{
      this.dataSource.data =data.usuarios
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
    this.route.navigateByUrl('/usuariosRegistrar')
  }
}
