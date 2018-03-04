import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AltaTareaComponent } from '../alta-tarea/alta-tarea.component';
import { TareaService } from '../../_services/tarea.service';
import { AlertService } from '../../_services/alert.service';
import { LayoutService } from '../../layout/layout.service';
import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';
import { Tarea } from '../../_models/Tarea';
import { AltaPuntocontrolComponent } from '../../puntoscontrol/alta-puntocontrol/alta-puntocontrol.component';
import { Trabajo } from '../../_models/Trabajo';
import { TrabajoService } from '../../_services/trabajo.service';
import { Router } from '@angular/router';
import { PuntoControl } from '../../_models/PuntoControl';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.scss']
})
export class ListaTareasComponent implements OnInit {

  public lista: Tarea[];
  public trabajo: Trabajo;
  public loadCompleted: boolean;

  constructor(public dialog: MatDialog,
              private tareaService: TareaService,
              private trabajoService: TrabajoService,
              private alertService: AlertService,
              private layoutService: LayoutService,
              private router: Router,
  ) { }

  ngOnInit() {
    this.lista = new Array();
    this.loadCompleted = false;
    this.layoutService.updatePreloaderState('active');
    this.trabajoService.get(1).subscribe(
        (data) => {
          this.trabajo = data;
          console.log(this.trabajo);
          this.loadData();
        },
        (error) => {
          this.alertService.error(error, 5000);
        }
    );
  }

  loadData() {
      this.tareaService.getAllByTrabajo(this.trabajo.id).subscribe(
          (datatarea) => {
              this.lista = datatarea;
              this.layoutService.updatePreloaderState('hide');
              this.loadCompleted = true;
          },
          (error) => {
              this.layoutService.updatePreloaderState('hide');
              this.alertService.error(error, 5000);
          });
  }

  nuevo() {
    const dialog = this.dialog.open(AltaTareaComponent, {
      data: [undefined, this.lista, this.trabajo.id],
      width: '600px',
    });
  }

  eliminar(x: Tarea) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: '¿Está seguro que desea eliminar la tarea ' + x.nombre + '?',
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          // TODO
          this.alertService.success('Tarea eliminada correctamente.', 3000);
        }
      });
  }

  editar(x: Tarea) {
    const dialog = this.dialog.open(AltaTareaComponent, {
      data: [x, this.lista, this.trabajo.id],
      width: '600px',
    });
  }

  nuevoPuntoContol() {
    const dialog = this.dialog.open(AltaPuntocontrolComponent, {
      data: [undefined, this.trabajo],
      width: '600px',
    });
  }

  editarPuntoControl(p: PuntoControl) {

  }

  verRegistros(x: Tarea) {
      this.router.navigate(['/app/registros/listaRegistros/', x.id]);
  }
}
