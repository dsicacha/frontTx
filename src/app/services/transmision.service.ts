import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transmision } from '../models/transmision'
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TransmisionService {

  private formulario = new Subject<any>();

  observableForm$ = this.formulario.asObservable();



  URL_API = 'http://localhost:4000/transmision';
  selectedTransmision: Transmision = {
    titulo: '',
    descripcion: '',
    usuario:'',
    origen: '',
    destino: '',
    ambiente:''
  }

  transmisiones: Transmision[];

  constructor(private http: HttpClient) { }

  SetFormulario(item: any) {
    this.formulario.next(item);
  }

  getTransmisiones() {
    return this.http.get<Transmision[]>(this.URL_API);
  }

    createTransmision(transmision: Transmision){
   
    return   this.http.post(this.URL_API,transmision);

  }

  deleteTx(_id: string){
    return this.http.delete(this.URL_API+'/'+_id);
  };

  download(_id: string){
    console.log("desde servicio");
    return this.http.get('http://localhost:4000/download/'+_id,{responseType: 'blob'});
  }

  putTransmision(transmision: Transmision){
    return this.http.put(this.URL_API+'/'+transmision._id,transmision);

  }


}
