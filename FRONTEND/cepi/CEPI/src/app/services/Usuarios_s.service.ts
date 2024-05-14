import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ServiceUsuario{
  baseUrl = environment.baseUrl;
  subjetoTodos = new Subject<any>();
  sujetoEditar = new Subject<any>();
  sujetoGuardar = new Subject<any>();
  sujetoBotones= new Subject<any>();
  sujetoById = new Subject<any>();
  id:any;
  constructor(private http:HttpClient, private route:Router){
  }
  login(usuario:any,contrasena:any){
    this.http.get<any>(this.baseUrl+'usuario/login/'+usuario+'/'+contrasena).subscribe(data=>{
            if(data.mensaje=='error ingreso'){
                alert('Ingrese correctamente el usuario y contraseña')
            }else if(data.mensaje=='error base de datos'){
                alert('Usuario no registrado')
            }else{
                localStorage.setItem('access',data.tokens.access)
                this.sujetoBotones.next(undefined);
                this.route.navigateByUrl('/recomendar')
            }
           
    })

  }
  conectar(){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.get<any>(this.baseUrl+'usuario/conectar',{headers}).subscribe(data=>{
        console.log(data)
    })
  }
  estadoUsuario(){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.get<any>(this.baseUrl+'usuario/estadoUsuario',{headers}).subscribe(data=>{
       
       console.log(data)
    })
  }
  out(){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.get<any>(this.baseUrl+'usuario/out', {headers}).subscribe(data=>{
           localStorage.removeItem('access');
           location.reload()
           this.route.navigateByUrl('/')
    })

  }
  async claims(){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    const response = await this.http.get<any>(this.baseUrl+'usuario/claims',{headers}).toPromise();
    return response
  }
  agregar(mandar:any){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.post<any>(this.baseUrl+'usuario/guardarUsuario',mandar, {headers}).subscribe(data=>{
     
        if(data.res=='correcto'){
            alert('Se guardó con éxito')
            location.reload()
        }
        if(data.res=='repetido'){
            alert('Cambie el nombre de usuario, contraseña o tipo')
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
    this.http.get<any>(this.baseUrl+'usuario/findById/'+id, {headers}).subscribe(data=>{
           this.sujetoById.next(data.usuario)
    })

  }

  eliminar(id:any){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.post<any>(this.baseUrl+'usuario/eliminarUsuario/'+id,id, {headers}).subscribe(data=>{
     
        alert('Se eliminó con éxito')
        location.reload()
      })
  }
  editar(mandar:any){
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.post<any>(this.baseUrl+'usuario/editarUsuario',mandar, {headers}).subscribe(data=>{
     
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
    var jwt = localStorage.getItem('access')
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    this.http.get<any>(this.baseUrl+'usuario/buscarTodos',{headers}).subscribe(data=>{
     
        this.subjetoTodos.next(data)
      })
  }
  listenerMostrar(){
    return this.subjetoTodos.asObservable();
  }
  listenerBotones(){
    return this.sujetoBotones.asObservable();
  }
  listenerById(){
    return this.sujetoById.asObservable();
  }
}