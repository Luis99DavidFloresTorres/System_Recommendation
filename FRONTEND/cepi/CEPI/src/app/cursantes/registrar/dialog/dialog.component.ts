import { DialogRef } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceCursante } from 'src/app/services/Cursantes_s.services';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  displayedColumns= ["nombretitulo","botones"];
  dataSource = new MatTableDataSource<any>();
  sujeto:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  constructor(private service:ServiceCursante,private route:Router, private dialogRef:MatDialogRef<DialogComponent> ){
    service.titulosNombre()
    this.sujeto = service.listenerTitulosNombre().subscribe(data=>{
      console.log(data)
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
 
  elegir(nombre:any){
 
    this.dialogRef.close(nombre)
  }
}
