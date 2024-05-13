import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ServiceRecomendacionEstudiante{
  baseUrl = environment.baseUrl;
  subjetoTodos = new Subject<any>();
  sujetoRecomendaciones = new Subject<any>();
  sujetoGuarar = new Subject<any>();
  id:any;
  constructor(private http:HttpClient){
  }

  mostrarEstudiantes(id:any){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.get<any>(this.baseUrl+'recomendacionStudent/buscarAlumnosRecomendacion/'+id, {headers}).subscribe(data=>{
            this.subjetoTodos.next(data.estudiantes)
    })
  }
  mostrarRecomendaciones(){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.get<any>(this.baseUrl+'recomendacionStudent/buscar', {headers}).subscribe(data=>{
            console.log(data)
            this.sujetoRecomendaciones.next(data.estudiantes)
    })
  }
  listenerMostrarRecomendaciones(){
    return this.sujetoRecomendaciones.asObservable()
  }
  listenerMostrarEstudiantes(){
    return this.subjetoTodos.asObservable()
  }
}