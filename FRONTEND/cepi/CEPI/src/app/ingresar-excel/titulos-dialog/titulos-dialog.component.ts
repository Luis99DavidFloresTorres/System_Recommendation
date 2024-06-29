import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DialogComponent } from 'src/app/cursantes/registrar/dialog/dialog.component';

@Component({
  selector: 'app-titulos-dialog',
  templateUrl: './titulos-dialog.component.html',
  styleUrls: ['./titulos-dialog.component.css']
})
export class TitulosDialogComponent {
  dataSource = new MatTableDataSource<any>();
  sujeto:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator|any;
  displayedColumns= ["nombretitulo","nombreTituloBd","acciones"];
  nuevoDict = {}
  private unsubscribe: Subject<void> = new Subject<void>();
  constructor( private dialogRef:MatDialogRef<TitulosDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private matDialog:MatDialog){
    var keys = Object.keys(data)
    var data:any = []
    for(var i=0;i<keys.length;i++){
      var jsn:any={}
      jsn['nombretitulo']=keys[i]
      jsn['nombreTituloBd']=keys[i]
      data.push(jsn)
    }
    this.dataSource.data=data
  }
  copyAndChangeKey(dict: { [key: string]: any }, oldKey: string, newKey: string): { [key: string]: any } {
    // Create a copy of the original dictionary
    let newDict = { ...dict };

    // Check if the oldKey exists in the dictionary
    if (oldKey in newDict) {
      // Add the new key with the value of the old key
      newDict[newKey] = newDict[oldKey];

      // Delete the old key
      delete newDict[oldKey];
    }

    return newDict;
  }
  cambiar(viejoNombre:any){
    var dialog = this.matDialog.open(DialogComponent,{height: '700px',
      width: '800px',})
      dialog.afterClosed().pipe(
        takeUntil(this.unsubscribe)
      ).subscribe(result => {
        var dt = this.dataSource.data
        for(var i=0;i<dt.length;i++){
          if(dt[i]['nombretitulo']==viejoNombre){
            dt[i]['nombreTituloBd']=result
            
          }
        }
      });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  guardar(){
    var nuevoJson:any = {}
    var dt = this.dataSource.data
    for(var i = 0 ;i< dt.length;i++){
      nuevoJson[dt[i]['nombretitulo']]=dt[i]['nombreTituloBd']
    }
    this.dialogRef.close(nuevoJson)
  }
}
