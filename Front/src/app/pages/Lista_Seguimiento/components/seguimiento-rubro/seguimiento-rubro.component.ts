import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {type} from 'os';
import {endWith} from 'rxjs/operators';
import {AgregarDetallesRubros, Proyect} from 'src/app/shared/models/project.model';
import {ProjectService} from 'src/app/shared/services/Proyect/project.service';
import {element} from 'protractor';
import {SucessDialogComponent, SucessDialogData} from '../../../admin/Dialog/sucess-dialog/sucess-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-seguimiento-rubro',
    templateUrl: './seguimiento-rubro.component.html',
    styleUrls: ['./seguimiento-rubro.component.scss']
})
export class SeguimientoRubroComponent implements OnInit {
    proyect: AgregarDetallesRubros[]
    displayedColumns: string[] = ['Rubros', 'PresupuestoAsignado', 'PresupuestoEjecutado', 'Cumplimiento'];
    Total = 0
    seguimientoRubros = []
    ValorRubro = 0
    ProyectoNuevo: Partial<Proyect>;

    constructor(private rutaActiva: ActivatedRoute, private projectService: ProjectService, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getAllRubros();

    }

    getAllRubros() {
        let projectid = this.rutaActiva.snapshot.params.id
        this.projectService.getById(projectid).subscribe(r => {
            this.proyect = r.Proyecto.AgregarDetallesRubros
            this.proyect.forEach(element => {
                element.TotalEfectivo = this.Total
                this.Total = 0
            });
        })


    }

    SeguimientoRubro(event, rubro) {
        this.proyect.forEach(element => {
            if (rubro.idRubro == element.idRubro) {
                let Ejecutado = parseInt(event.target.value)
                let porcCumplimiento = (Ejecutado * 100) / element.TotalEfectivo
                let redondpCumplimiento = parseFloat(porcCumplimiento.toFixed(2))
                element.PresupuestoEjecutado = Ejecutado
                element.Cumplimiento = redondpCumplimiento
            }
        });
    }

    GuardarSeguimiento() {
        let projectid = this.rutaActiva.snapshot.params.id;
        this.ProyectoNuevo = {AgregarDetallesRubros: this.proyect}
        this.projectService.update(projectid, this.ProyectoNuevo).subscribe(r => {
            let datossucess: SucessDialogData = {
                icono: 'done',
                severidad: 'dialog-sucess',
                encabezado: `Seguimiento Guardado`,
                descripcion: `Guardado el seguimiento de rubros Satisfactoriamente`
            }
            const dialogRef = this.dialog.open(SucessDialogComponent, {
                ariaLabel: `Guardado el seguimiento de rubros Satisfactoriamente`,
                role: 'alertdialog',
                autoFocus: false,
                data: datossucess
            });
            dialogRef.afterClosed().subscribe(result => {

            });
        })
    }

}
