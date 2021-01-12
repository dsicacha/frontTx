import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Origen } from '../models/origen'

@Injectable({
  providedIn: 'root'
})
export class OrigenService {

  URL_API = 'http://localhost:4000/origen';

  selectedOrigen: Origen = {
    nombre: '',
    telefono: '',
    email: '',
    usuarioRed: '',
    filial: '',
    dominio: '',
    subdominio: '',
    proceso: '',
    codigoMac: '',
    ambiente: '',
    usuarioCnx: '',
    metodoAutenticacion: '',
    usuarioBanco: '',
    UbicacionServidor: '',
  };
  origenes: Origen[];

  constructor(private http: HttpClient) { }

  createOrigen(origen: Origen){
    return this.http.post(this.URL_API, origen);
  }

  deleteOrigen(_id: string) {
    return this.http.delete(this.URL_API + '/' + _id);
  };

  getOrigen(_id){
    return this.http.get(this.URL_API+'/'+_id);
  }

  putOrigen(origen: Origen){
    return this.http.put(this.URL_API+'/'+origen._id,origen);
  }


}
