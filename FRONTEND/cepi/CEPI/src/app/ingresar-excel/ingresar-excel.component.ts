import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription, takeUntil } from 'rxjs';
import * as XLSX from 'xlsx';
import { TitulosDialogComponent } from './titulos-dialog/titulos-dialog.component';
import { ServiceCursante } from '../services/Cursantes_s.services';
@Component({
  selector: 'app-ingresar-excel',
  templateUrl: './ingresar-excel.component.html',
  styleUrls: ['./ingresar-excel.component.css']
})
export class IngresarExcelComponent {
  dataSource = new MatTableDataSource<any>();
  sujeto:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator|any;
  displayedColumns= ['nombrecompleto','nombretitulo','area',"edad_rango","rango_ano_titulacion","celular","nombreuniversidad"];
  edades=['menor-32','33-39','40-46','47-mayor']
  titulacionR=['antiguo','2010-2016','2017-actual']
  areas= ['tecnológicas','humanidades y sociales','ciencias de la salud','ciencias económicas','ciencias agrarias']
  titulos:any={}
 
  private unsubscribe: Subject<void> = new Subject<void>();
  constructor(private matDialog:MatDialog, private service:ServiceCursante){}
  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = <any[]>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      const headers = data[0];
      const rows = data.slice(1);
      var dataTable=[] 
      for(var i=0;i<rows.length;i++){
        var area = rows[i][4]
        var edad_rango = rows[i][5]
        var titulacion = rows[i][6]
        if(!this.areas.includes(area)){
          area='no permitido'
        }
        if(!this.edades.includes(edad_rango)){
          edad_rango='no permitido'
        }
        if(!this.titulacionR.includes(titulacion)){
          titulacion='no permitido'
        }
        if(this.titulos[rows[i][2]]==undefined){
          this.titulos[rows[i][2]]=rows[i][2]
        }
        var json={'celular':rows[i][3],'nombreuniversidad':rows[i][1],'area':area,'nombrecompleto':rows[i][0],'nombretitulo':rows[i][2],"edad_rango":edad_rango,'rango_ano_titulacion':titulacion}
        dataTable.push(json)
      }
      console.log(rows)
      this.dataSource.data=dataTable

  }
  reader.readAsBinaryString(target.files[0]);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  buscarTitulo(){
    var dialog = this.matDialog.open(TitulosDialogComponent,{data:this.titulos,height: '700px',
      width: '800px',})
      dialog.afterClosed().pipe(
        takeUntil(this.unsubscribe)
      ).subscribe(result => {
        var dt = this.dataSource.data
        for(var i=0; i<dt.length;i++){
          dt[i]['nombretitulo']=result[dt[i]['nombretitulo']]
        }
        console.log(result)
        this.dataSource.data=dt
        var invertedObj = Object.fromEntries(
          Object.entries(result).map(([key, value]) => [value, value])
        );
        this.titulos=invertedObj
        console.log(this.titulos)
      });
     
  }
  guardar(){
    
   
    this.service.agregarAlumnos(this.dataSource.data);
    
  }
}