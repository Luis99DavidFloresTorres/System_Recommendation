import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ServiceCursante{
  baseUrl = environment.baseUrl;
  subjetoTodos = new Subject<any>();
  sujetoEditar = new Subject<any>();
  sujetoGuardar = new Subject<any>();
  id:any;
  constructor(private http:HttpClient){
  }

  agregar(mandar:any){
    
    this.http.post<any>(this.baseUrl+'alumnos/guardarEstudiante',mandar).subscribe(data=>{
     
        if(data.res=='correcto'){
            alert('Se guardó con éxito')
            location.reload()
        }
        if(data.res=='id repetido'){
            alert('El id es repetido')
            location.reload();
        }
        if(data.res=='no se pudo guardar'){
            alert('No se pudo guardar')
        }
    })
  }
  eliminar(id:any){
    this.http.post<any>(this.baseUrl+'alumnos/eliminarEstudiante/'+id,id).subscribe(data=>{
     
        alert('Se eliminó con éxito')
        location.reload()
      })
  }
  editar(mandar:any){
    this.http.post<any>(this.baseUrl+'alumnos/editarEstudiante',mandar).subscribe(data=>{
     
        if(data.res=='correcto'){
            alert('Se guardó con éxito')
            location.reload()
        }
        if(data.res=='no se pudo guardar'){
            alert('No se pudo guardar')
        }
      })
  }
  mostrar(){
    this.http.get<any>(this.baseUrl+'api/alumnos/buscarTodos').subscribe(data=>{
     
        this.subjetoTodos.next(data)
      })
  }
  listenerMostrar(){
    return this.subjetoTodos.asObservable();
  }
}