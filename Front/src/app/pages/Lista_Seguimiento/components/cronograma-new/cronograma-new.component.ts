import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cronogramaObj, subAct, actividad } from 'src/app/shared/models/cronograma.model';
import { cronogramaService } from 'src/app/shared/services/cronograma/cronograma.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SucessDialogComponent, SucessDialogData } from '../../../admin/Dialog/sucess-dialog/sucess-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-cronograma-new',
  templateUrl: './cronograma-new.component.html',
  styleUrls: ['./cronograma-new.component.scss']
})
export class CronogramaNewComponent implements OnInit {
  cronograma: actividad[]
  SeguimientCronograma: Partial<cronogramaObj>

  seguimiento: FormGroup


  constructor(private cronogramaService: cronogramaService, private rutaActiva: ActivatedRoute, public form: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    let projectid = this.rutaActiva.snapshot.params.id
    // console.log(projectid)
    this.cronogramaService.getByProject(projectid).subscribe(r => {
      this.cronograma = r.cronogramas.actividades
      // console.log(this.cronograma)
    })
  }
  SeguimientoCronograma(e, opc, sub) {

    let fechareal = e.value
    let valorAvance = e.target.value
    if (opc == 1) {
      this.cronograma.forEach(actividades => {
        let subact: subAct[]
        subact = actividades.subActividad
        subact.forEach(element => {
          if (element._id == sub._id) {

            var today = new Date(fechareal);
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            var fechabd = new Date(element.fechaFinal);
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            var Difference_In_Time = today.getTime() - fechabd.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            element.Desface = Difference_In_Days
            element.fechaReal = today
          }
        });
      });
    } else {
      this.cronograma.forEach(actividades => {
        let subact: subAct[]
        subact = actividades.subActividad
        subact.forEach(element => {
          if (element._id == sub._id) {
            console.log(valorAvance)
            element.avance = valorAvance
          }
        });
      });
      // console.log(this.cronograma)
    }
  }

  GuardarSeguimiento() {
    let projectid = this.rutaActiva.snapshot.params.id
    this.SeguimientCronograma = { actividades: this.cronograma }
    // console.log(this.cronograma)

    this.cronogramaService.updateSeguimiento(projectid, this.SeguimientCronograma).subscribe(r => {
      let datossucess: SucessDialogData = {
        icono: 'done',
        severidad: 'dialog-sucess',
        encabezado: `Seguimiento Guardado`,
        descripcion: `Guardado el seguimiento del cronograma Satisfactoriamente`
      }
      const dialogRef = this.dialog.open(SucessDialogComponent, {
        ariaLabel: `Guardado el seguimiento del cronograma Satisfactoriamente`,
        role: 'alertdialog',
        autoFocus: false,
        data: datossucess
      });
      dialogRef.afterClosed().subscribe(result => {

      });
      // console.log(r)
    })
  }
}
