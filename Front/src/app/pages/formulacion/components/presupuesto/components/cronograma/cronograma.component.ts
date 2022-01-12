import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AgregarActividadComponent, AgregarActividadData} from './agregar-actividad/agregar-actividad.component';
import {ActivatedRoute, Params} from '@angular/router';
import {actividad, cronogramaObj, subAct} from '../../../../../../shared/models/cronograma.model'
import {Cronograma} from 'src/app/@core/old-models/cronograma';
import {
    SucessDialogComponent,
    SucessDialogData
} from '../../../../../admin/Dialog/sucess-dialog/sucess-dialog.component';

interface Country {
    name: string;
    flag: string;
    area: number;
    population: number;
}

@Component({
    selector: 'app-cronograma',
    templateUrl: './cronograma.component.html',
    styleUrls: ['../../presupuesto.component.scss']
})
export class CronogramaComponent implements OnInit {
    Convocatoria;
    cronograma: actividad[]

    constructor(public dialogo: MatDialog,
                public rutaActiva: ActivatedRoute) {
    }


    ngOnInit(): void {
        let cv = this.rutaActiva.snapshot.params;
        this.Convocatoria = cv.id;
        this.cronograma = JSON.parse(localStorage.getItem('cronograma')) || [];
    }

    EditActividad(IdActividad) {
        let datos: AgregarActividadData = {
            idConvocatoria: this.Convocatoria,
            SeEstaEditando: true,
            Actividad: IdActividad
        }
        const dialogRef = this.dialogo.open(AgregarActividadComponent, {
            data: datos
        })
        dialogRef.afterClosed().subscribe(r => {
            if (r != false && r != undefined) {
                this.cronograma = JSON.parse(localStorage.getItem('cronograma'))
                var listPred: String = "";
                if (r.valor) {
                    this.cronograma.forEach(element => {
                        if (element.idUnicoTare == r.id) {
                            if (listPred == "") {
                                listPred = element.nombreAct
                            } else {
                                listPred = listPred + ', ' + element.nombreAct;
                            }
                        }
                    });
                    let datossucess: SucessDialogData = {
                        icono: 'done',
                        severidad: 'dialog-sucess',
                        encabezado: 'Se edito la actividad',
                        descripcion: `estas tareas son sucesoras de la tarea actualizada por favor mirar si tienen conflictos
            ${listPred} `
                    }
                    const dialogRef = this.dialogo.open(SucessDialogComponent, {
                        ariaLabel: ` Actualizar `,
                        role: 'alertdialog',
                        autoFocus: false,
                        data: datossucess
                    });
                    listPred = "";
                }
            } else {
                console.log("proceso no finalizado")
            }
        })
    }

    Eliminar(idUnicoTare) {
        var newCronograma: actividad[] = []
        this.cronograma.forEach(element => {
            if (element.idUnicoTare != idUnicoTare) {
                newCronograma.push(element)
            }
        });
        this.cronograma = newCronograma;
        localStorage.setItem('cronograma', JSON.stringify(this.cronograma));
    }

    agregarActividad() {
        let datos: AgregarActividadData = {
            idConvocatoria: this.Convocatoria
        }
        const dialogRef = this.dialogo.open(AgregarActividadComponent, {
            data: datos
        })
        dialogRef.afterClosed().subscribe(r => {
            if (r != true) {
                console.log("proceso no finalizado")
            } else {
                this.cronograma = JSON.parse(localStorage.getItem('cronograma'))
            }
        })

    }
}
