import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Destino } from '../models/destino';

@Injectable({
  providedIn: 'root'
})
export class DestinoService {

  URL_API = 'http://localhost:4000/destino';

  SelectedDestino: Destino={
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
    protocoloTransmision:'',
    puerto: '',
    tipoSvr: '',
    Servidor: '',
    usuarioConexionDestino: '',
    metodoAutenticacion: '',
    UbicacionServidor: '',
    rutaEntrega: '',
  };
  destinos: Destino[];

  constructor(private http: HttpClient) { }

  createDestino(destino:Destino){
    return this.http.post(this.URL_API,destino);
  }

  deleteDestino(_id:string){
    return this.http.delete(this.URL_API+'/'+_id);
  };

  getDestino(_id:string){
    return this.http.get(this.URL_API+'/'+_id);
  }

  putDestino(destino: Destino){
    return this.http.put(this.URL_API+'/'+destino._id, destino);
  }
}
