import { Component, Inject, OnInit } from '@angular/core';
import { PuntoControl } from '../../_models/PuntoControl';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PuntoControlService } from '../../_services/punto-control.services';
import { AlertService } from '../../_services/alert.service';
import { LayoutService } from '../../layout/layout.service';
import { PuntoControlImp } from '../../_models/PuntoControlImp';
import { Usuario } from '../../_models/Usuario';

@Component({
  selector: 'app-alta-puntocontrol',
  templateUrl: './alta-puntocontrol.component.html',
  styleUrls: ['./alta-puntocontrol.component.scss']
})
export class AltaPuntocontrolComponent implements OnInit {

  public puntoControlActual: PuntoControl;
  public responsableActual: Usuario;

  constructor(
      public dialogRef: MatDialogRef<AltaPuntocontrolComponent>,
      @Inject(MAT_DIALOG_DATA) public puntoControl: PuntoControl,
      private puntoControlService: PuntoControlService,
      private alertService: AlertService,
      private layoutService: LayoutService
  ) { }

  ngOnInit() {
    if (this.puntoControl.id == null) {
      this.puntoControlActual = this.puntoControl; // TODO OJo ver esto
      this.responsableActual = {} as Usuario;
        this.puntoControlActual.orden = 2;
    } else {
      this.puntoControlActual = new PuntoControlImp(this.puntoControl);
      this.responsableActual = this.puntoControl.responsable;
    }
  }

  guardar() {
    this.layoutService.updatePreloaderState('active');
    if (this.puntoControl.id == null) {
      this.puntoControlService.create(this.puntoControlActual).subscribe(
          (data) => {
            this.layoutService.updatePreloaderState('hide');
            this.alertService.success('Punto de control agregado correctamente.', 3000);
            this.dialogRef.close(1);
          },
          (error) => {
              this.layoutService.updatePreloaderState('hide');
              this.alertService.error(error, 5000);
          });
    } else {
      this.puntoControlService.edit(this.puntoControlActual).subscribe(
          (data) => {
            this.layoutService.updatePreloaderState('hide');
            this.alertService.success('Punto de control actualizado correctamente.', 3000);
            this.dialogRef.close(1);
          },
          (error) => {
            this.layoutService.updatePreloaderState('hide');
            this.alertService.error(error, 5000);
          });
    }
  }

  resposableOnChange(x: Usuario) {
    this.puntoControlActual.responsable = x;
  }
}
