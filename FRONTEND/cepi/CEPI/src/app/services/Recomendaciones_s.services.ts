import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ServiceRecomendacion{
  baseUrl = environment.baseUrl;
  subjetoTodos = new Subject<any>();
  sujetoEditar = new Subject<any>();
  sujetoGuardar = new Subject<any>();
  id:any;
  constructor(private http:HttpClient){
  }

  mostrar(){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.get<any>(this.baseUrl+'recomendacion/buscar', {headers}).subscribe(data=>{
            this.subjetoTodos.next(data.recomendaciones)
    })
  }
  listenerMostrar(){
    return this.subjetoTodos.asObservable()
  }
}