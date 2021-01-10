import { Component, OnInit } from '@angular/core';
import { TransmisionService } from '../services/transmision.service'
import { DestinoService } from '../services/destino.service';
import { OrigenService } from '../services/origen.service';
import { NgForm } from '@angular/forms';
import { ListaTxComponent } from '../lista-tx/lista-tx.component';


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
    rutaEntrega: ''
  };

  constructor(public TransmisionService: TransmisionService, public OrigenService: OrigenService, public DestinoService: DestinoService) { }

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

  addTransmision(form: NgForm) {

    this.asignarOrigen();
    this.asignarDestino();
    this.asignarTransmision();

    this.OrigenService.createOrigen(this.OrigenService.selectedOrigen).subscribe(
      (res) => {        
        this.TransmisionService.selectedTransmision.origen = res;
        

      },
      (err) => console.error(err),
      ()=>{
        this.DestinoService.createDestino(this.DestinoService.SelectedDestino).subscribe(
          (res) => {
            this.TransmisionService.selectedTransmision.destino = res;
          },
          (err) => console.log(err),
          ()=>{
            this.TransmisionService.createTransmision(this.TransmisionService.selectedTransmision).subscribe(
              (res) => {
                alert("transmisión creada correctamente");
                this.getTransmisiones();
                form.reset();
              },
              (err) => console.log(err)
            );

          }
        );
      }
    )
    
  
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


}
