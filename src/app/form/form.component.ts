import { Component, OnInit, ViewChild } from '@angular/core';
import { TransmisionService } from '../services/transmision.service'
import { DestinoService } from '../services/destino.service';
import { OrigenService } from '../services/origen.service';
import { NgForm } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';



interface Filial {
  value: string,
  viewValue: string
}

interface Dominio {
  value: string,
  viewValue: string
}

interface Ambiente {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  selectedFilial: String;
  selectedDominio: String;
  selectedSubDominio: String;
  selectedAmbiente: String;


  filiales: Filial[] = [
    { value: 'Bancolombia', viewValue: 'Bancolombia' },
    { value: 'Leasing', viewValue: 'Leasing' },
    { value: 'Fiduciaria', viewValue: 'Fiduciaria' },
    { value: 'BancaDeInversión', viewValue: 'Banca de Inversión' },
    { value: 'Valores', viewValue: 'Valores' },
    { value: 'Factoring', viewValue: 'Factoring' },
    { value: 'Banismo', viewValue: 'Banismo' }
  ]

  dominios: Dominio[] = [
    { value: 'Canales', viewValue: 'ServiciosCanales' },
    { value: 'Clientes', viewValue: 'ServiciosClientes' },
    { value: 'Producto', viewValue: 'ServiciosProducto' },
    { value: 'Externos', viewValue: 'ServiciosExternos' },
    { value: 'ApoyoNegocio', viewValue: 'ServiciosApoyoNegocio' },
    { value: 'ApoyoCorporativo', viewValue: 'ServiciosApoyoCorporativo' },
    { value: 'Integracion ', viewValue: 'ServiciosIntegracion ' },
    { value: 'Informacion ', viewValue: 'ServiciosInformacion ' },
    { value: 'Seguridad', viewValue: 'ServiciosSeguridad' }
  ]

  subDominio = {
    Canales: [
      { value: 'Fisicos', viewValue: 'Canales Físicos' },
      { value: 'Autoservicio', viewValue: 'Canales autoservicio' },
      { value: 'Telefonico', viewValue: 'Canal telefónico' },
      { value: 'Internet', viewValue: 'Canales internet' },
      { value: 'Moviles', viewValue: 'Canales Móviles' },
      { value: 'RedesSociales', viewValue: 'Redes Sociales' },
      { value: 'OperacionesComunes', viewValue: 'Operaciones comunes de canales' },
    ],
    Clientes: [
      { value: 'Conocimiento', viewValue: 'Conocimiento' },
      { value: 'Mercadeo', viewValue: 'Mercadeo' },
      { value: 'Servicio', viewValue: 'Servicio' },
      { value: 'Ventas', viewValue: 'Ventas' },
      { value: 'GestionNormalizacion', viewValue: 'Gestión normalización de clientes' },

    ]
  }

  ambientes: Ambiente[] = [
    { value: 'Produccion', viewValue: 'Producción' },
    { value: 'Calidad', viewValue: 'Calidad' },
    { value: 'Desarrollo', viewValue: 'Desarrollo' },
  ];

  form = {
    titulo: '',
    descripcion: '',
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
    usuCnxOri: '',
    metAutOri: '',
    ubiSvrOri: '',
    protocoloTxDest: '',
    puerto: '',
    tipoSvr: '',
    servidor: '',
    usuCnxDest: '',
    usuSvrDest: '',
    metAutDest: '',
    ubiSvrDest: '',
    rutaEntrega: '',
    _id: null,
    idOrigen: null,
    IdDestino: null
  };

  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(public TransmisionService: TransmisionService, public OrigenService: OrigenService, public DestinoService: DestinoService) {
    this.TransmisionService.observableForm$.subscribe(
      res => {
        this.AsignarToEditTx(res);

        this.accordion.openAll();

      },
      err => console.log(err)
    )
  }

  ngOnInit(): void {

  }

  getTransmisiones() {
    this.TransmisionService.getTransmisiones().subscribe(
      res => {
        this.TransmisionService.transmisiones = res;
      },
      err => console.log(err)
    );
  }

  async addTransmision(form: NgForm) {

    if (this.form._id == null) {

      console.log('esto va a crear');

      this.asignarOrigen();
      this.asignarDestino();
      this.asignarTransmision();

      try {
        const idOrigen = await this.OrigenService.createOrigen(this.OrigenService.selectedOrigen).toPromise();
        const IdDestino = await this.DestinoService.createDestino(this.DestinoService.SelectedDestino).toPromise();
        this.TransmisionService.selectedTransmision.origen = idOrigen;
        this.TransmisionService.selectedTransmision.destino = IdDestino;
        await this.TransmisionService.createTransmision(this.TransmisionService.selectedTransmision).toPromise();
        alert("transmisión creada correctamente");
        this.getTransmisiones();
        form.reset();
        this.form._id = null;
        this.accordion.closeAll();

      } catch (error) {
        console.log(error);
      }

    } else {
      this.asignarOrigen();
      this.asignarDestino();
      this.asignarTransmision();
      this.TransmisionService.selectedTransmision._id = this.form._id;
      this.TransmisionService.selectedTransmision.origen = this.form.idOrigen;
      this.TransmisionService.selectedTransmision.destino = this.form.IdDestino;

      this.OrigenService.selectedOrigen._id = this.form.idOrigen;
      this.DestinoService.SelectedDestino._id = this.form.IdDestino;

      try {
        await this.OrigenService.putOrigen(this.OrigenService.selectedOrigen).toPromise();
        await this.DestinoService.putDestino(this.DestinoService.SelectedDestino).toPromise();
        await this.TransmisionService.putTransmision(this.TransmisionService.selectedTransmision).toPromise();

        alert("transmisión editata correctamente");
        this.form._id = null;
        form.reset();
        this.getTransmisiones();
        this.accordion.closeAll();


      } catch (error) {
        console.log(error);

      }



    }




  }

  asignarOrigen() {
    this.OrigenService.selectedOrigen.nombre = this.form.nombre;
    this.OrigenService.selectedOrigen.telefono = this.form.telefono;
    this.OrigenService.selectedOrigen.email = this.form.email;
    this.OrigenService.selectedOrigen.usuarioRed = this.form.usuarioRed;
    this.OrigenService.selectedOrigen.filial = this.form.filial;
    this.OrigenService.selectedOrigen.dominio = this.form.dominio;
    this.OrigenService.selectedOrigen.subdominio = this.form.subdominio;
    this.OrigenService.selectedOrigen.proceso = this.form.proceso;
    this.OrigenService.selectedOrigen.codigoMac = this.form.codigoMac;
    this.OrigenService.selectedOrigen.ambiente = this.form.ambiente;
    this.OrigenService.selectedOrigen.usuarioCnx = this.form.usuCnxOri;
    this.OrigenService.selectedOrigen.metodoAutenticacion = this.form.metAutOri;
    this.OrigenService.selectedOrigen.usuarioBanco = this.form.usuarioRed;
    this.OrigenService.selectedOrigen.UbicacionServidor = this.form.ubiSvrOri;
  }

  asignarDestino() {
    this.DestinoService.SelectedDestino.nombre = this.form.nombre;
    this.DestinoService.SelectedDestino.telefono = this.form.telefono;
    this.DestinoService.SelectedDestino.email = this.form.email;
    this.DestinoService.SelectedDestino.usuarioRed = this.form.usuarioRed;
    this.DestinoService.SelectedDestino.filial = this.form.filial;
    this.DestinoService.SelectedDestino.dominio = this.form.dominio;
    this.DestinoService.SelectedDestino.subdominio = this.form.subdominio;
    this.DestinoService.SelectedDestino.proceso = this.form.proceso;
    this.DestinoService.SelectedDestino.codigoMac = this.form.codigoMac;
    this.DestinoService.SelectedDestino.ambiente = this.form.ambiente;
    this.DestinoService.SelectedDestino.usuarioCnx = this.form.usuCnxDest;

    this.DestinoService.SelectedDestino.protocoloTransmision = this.form.protocoloTxDest;
    this.DestinoService.SelectedDestino.puerto = this.form.puerto;
    this.DestinoService.SelectedDestino.tipoSvr = this.form.tipoSvr;
    this.DestinoService.SelectedDestino.Servidor = this.form.servidor;
    this.DestinoService.SelectedDestino.usuarioConexionDestino = this.form.usuSvrDest;

    this.DestinoService.SelectedDestino.metodoAutenticacion = this.form.metAutDest;
    this.DestinoService.SelectedDestino.UbicacionServidor = this.form.ubiSvrDest;
    this.DestinoService.SelectedDestino.rutaEntrega = this.form.rutaEntrega;
  }

  asignarTransmision() {
    this.TransmisionService.selectedTransmision.titulo = this.form.titulo;
    this.TransmisionService.selectedTransmision.descripcion = this.form.descripcion;
    this.TransmisionService.selectedTransmision.usuario = this.form.usuarioRed;
    this.TransmisionService.selectedTransmision.ambiente = this.form.ambiente;
  }

  AsignarToEditTx(objTransmision: any) {
    this.form.titulo = objTransmision.transmision.titulo;
    this.form.descripcion = objTransmision.transmision.descripcion;
    this.form.nombre = objTransmision.origen.nombre;
    this.form.telefono = objTransmision.origen.telefono;
    this.form.email = objTransmision.origen.email;
    this.form.usuarioRed = objTransmision.origen.usuarioRed;
    this.form.filial = objTransmision.origen.filial;
    this.form.dominio = objTransmision.origen.dominio;
    this.form.subdominio = objTransmision.origen.subdominio;
    this.form.proceso = objTransmision.origen.proceso;
    this.form.codigoMac = objTransmision.origen.codigoMac;
    this.form.ambiente = objTransmision.transmision.ambiente;
    this.form.usuCnxOri = objTransmision.origen.usuarioCnx;
    this.form.metAutOri = objTransmision.origen.metodoAutenticacion;
    this.form.ubiSvrOri = objTransmision.origen.UbicacionServidor;
    this.form.protocoloTxDest = objTransmision.destino.protocoloTransmision;
    this.form.puerto = objTransmision.destino.puerto;
    this.form.tipoSvr = objTransmision.destino.tipoSvr;
    this.form.servidor = objTransmision.destino.Servidor;
    this.form.usuCnxDest = objTransmision.destino.usuarioCnx;
    this.form.usuSvrDest = objTransmision.destino.usuarioConexionDestino;
    this.form.metAutDest = objTransmision.destino.metodoAutenticacion;
    this.form.ubiSvrDest = objTransmision.destino.UbicacionServidor;
    this.form.rutaEntrega = objTransmision.destino.rutaEntrega;
    this.form._id = objTransmision.transmision._id;
    this.form.idOrigen = objTransmision.origen._id;
    this.form.IdDestino = objTransmision.destino._id;
  }

  resetForm(form: NgForm) {
    form.reset();
    this.form._id = null;
    this.accordion.closeAll();

  }


}
