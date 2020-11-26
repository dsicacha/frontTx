import { Component, OnInit } from '@angular/core';

interface Filial{
  value:string,
  viewValue:string
}

interface Dominio{
  value:string,
  viewValue:string
}

interface Ambiente{
  value:string,
  viewValue:string
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

  form={
    nombre:'',
    telefono:'',
    email:'',
    usuarioRed:'',
    filial:'',
    dominio:'',
    subdominio:'',
    proceso:'',
    codigoMac:'',
    ambiente:'',
    usuarioCnx:'',    
    metodoAutenticacion:'',    
    usuarioBanco:'',
    UbicacionServidor:'',
  };

  constructor() { }

  ngOnInit(): void {
  }

  filiales: Filial[] = [
    {value:'Bancolombia',viewValue:'Bancolombia'},
    {value:'Leasing',viewValue:'Leasing'},
    {value:'Fiduciaria',viewValue:'Fiduciaria'},
    {value:'BancaDeInversión', viewValue:'Banca de Inversión'},
    {value:'Valores',viewValue:'Valores'},
    {value:'Factoring',viewValue:'Factoring'},
    {value:'Banismo',viewValue:'Banismo'} 
  ]

  dominios: Dominio[] = [
    {value:'Canales',viewValue:'ServiciosCanales'},
    {value:'Clientes',viewValue:'ServiciosClientes'},
    {value:'Producto',viewValue:'ServiciosProducto'},
    {value:'Externos',viewValue:'ServiciosExternos'},
    {value:'ApoyoNegocio',viewValue:'ServiciosApoyoNegocio'},
    {value:'ApoyoCorporativo',viewValue:'ServiciosApoyoCorporativo'},
    {value:'Integracion ',viewValue:'ServiciosIntegracion '},
    {value:'Informacion ',viewValue:'ServiciosInformacion '},
    {value:'Seguridad',viewValue:'ServiciosSeguridad'}
  ]

  subDominio ={
    Canales:[
      {value:'Fisicos',viewValue:'Canales Físicos'},
      {value:'Autoservicio', viewValue:'Canales autoservicio'},
      {value:'Telefonico', viewValue:'Canal telefónico'},
      {value:'Internet',viewValue:'Canales internet'},      
      {value:'Moviles',viewValue:'Canales Móviles'},      
      {value:'RedesSociales',viewValue:'Redes Sociales'},      
      {value:'OperacionesComunes',viewValue:'Operaciones comunes de canales'},      
    ],
    Clientes:[
      {value:'Conocimiento', viewValue:'Conocimiento'},
      {value:'Mercadeo', viewValue:'Mercadeo'},
      {value:'Servicio',viewValue:'Servicio'},
      {value:'Ventas',viewValue:'Ventas'},
      {value:'GestionNormalizacion',viewValue:'Gestión normalización de clientes'},

    ]
  }

  ambientes:Ambiente[]=[
    {value:'Produccion', viewValue:'Producción'},
    {value:'Calidad', viewValue:'Calidad'},
    {value:'Desarrollo', viewValue:'Desarrollo'},
  ];

}
