import { Component, OnInit, Input } from '@angular/core';
import { TransmisionService } from '../services/transmision.service'
import { DestinoService } from '../services/destino.service';
import { OrigenService } from '../services/origen.service';
import { FormComponent } from '../form/form.component';
import { saveAs } from 'file-saver';






@Component({
  selector: 'app-lista-tx',
  templateUrl: './lista-tx.component.html',
  styleUrls: ['./lista-tx.component.css']
})

export class ListaTxComponent implements OnInit {

  constructor(public transmisionService: TransmisionService, public OrigenService: OrigenService, public DestinoService: DestinoService) { }

  public FormComponent: FormComponent;

  @Input() formulario: string;

  ngOnInit(): void {
    this.getTransmisiones();
  }

  getTransmisiones() {
    this.transmisionService.getTransmisiones().subscribe(
      res => {
        this.transmisionService.transmisiones = res;
      },
      err => console.log(err)
    );
  }

  deleteTx(transmision: any) {
    const res = confirm('Desea eliminar la Tx');
    if (res) {

      this.OrigenService.deleteOrigen(transmision.origen).subscribe(
        res => console.log(res),
        err => console.log(err),
        () => {
          this.DestinoService.deleteDestino(transmision.destino).subscribe(
            res => console.log(res),
            err => console.log(err),
            () => {
              this.transmisionService.deleteTx(transmision._id).subscribe(
                res => console.log(res),
                err => console.log(err),
                () => {
                  alert("Transmisión eliminada");
                  this.getTransmisiones();
                }
              )

            }
          )
        }

      )
    }
  }

  async editTx(transmision: any) {

    

    try {
      const origen = await this.OrigenService.getOrigen(transmision.origen).toPromise();
      const destino = await this.DestinoService.getDestino(transmision.destino).toPromise();

      this.transmisionService.SetFormulario({transmision,origen,destino});
    
      
    } catch (error) {
      console.log(error);
    }
  }
   


  
    

  

  download(id: string, filename: string) {

    console.log(id);
    this.transmisionService.download(id).subscribe(
      response => 
      {
        saveAs(response,'FormatoSolicitudTx_'+filename);
        
      });

  }
 

}
