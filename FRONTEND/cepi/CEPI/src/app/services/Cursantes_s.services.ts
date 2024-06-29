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
  sujetoById = new Subject<any>();
  sujetoTitulos = new Subject<any>();
  sujetoBuscarRecomendacion = new Subject<any>();
  id:any;
  constructor(private http:HttpClient){
  }

  agregar(mandar:any){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type+', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.post<any>(this.baseUrl+'alumnos/guardarEstudiante',mandar, {headers}).subscribe(data=>{
     
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
  agregarAlumnos(mandar:any){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.post<any>(this.baseUrl+'alumnos/guardarEstudiantes',mandar, {headers}).subscribe(data=>{
        if(data.res=='correcto'){
            alert('Se guardó con éxito')
            location.reload()
        }
        if(data.res=='no se pudo guardar'){
            alert('No se pudo guardar')
        }
    })
  }
  findById(id:any){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.get<any>(this.baseUrl+'alumnos/findById/'+id, {headers}).subscribe(data=>{
           this.sujetoById.next(data.estudiante)
    })

  }
  eliminar(id:any){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.post<any>(this.baseUrl+'alumnos/eliminarEstudiante/'+id,id,{headers}).subscribe(data=>{
     
        alert('Se eliminó con éxito')
        location.reload()
      })
  }
  editar(mandar:any){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.post<any>(this.baseUrl+'alumnos/editarEstudiante',mandar,{headers}).subscribe(data=>{
     
        if(data.res=='correcto'){
            alert('Se guardó con éxito')
            location.reload()
        }
        if(data.res=='no se pudo guardar'){
            alert('No se pudo guardar')
        }
      })
  }
  buscar(mandar:any){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    mandar = {'nombrecurso':mandar}
    this.http.post<any>(this.baseUrl+'alumnos/buscar',mandar,{headers}).subscribe(data=>{
          this.sujetoBuscarRecomendacion.next(data.estudiantes)
      })
  }
  listenerBuscar(){
    return this.sujetoBuscarRecomendacion.asObservable()
  }
  titulosNombre(){
   
    this.http.get<any>('assets/titulos.json').subscribe(data=>{
     
        this.sujetoTitulos.next(data)
      })
  }

  mostrar(){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.get<any>(this.baseUrl+'/alumnos/buscarTodos',{headers}).subscribe(data=>{
     
        this.subjetoTodos.next(data)
      })
  }
  listenerMostrar(){
    return this.subjetoTodos.asObservable();
  }
  listenerById(){
    return this.sujetoById.asObservable();
  }
  listenerTitulosNombre(){
    return this.sujetoTitulos.asObservable();
  }
}