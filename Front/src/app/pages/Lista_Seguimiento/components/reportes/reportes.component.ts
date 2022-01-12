import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {cronogramaService} from 'src/app/shared/services/cronograma/cronograma.service';
import {cronogramaObj, subAct, actividad} from 'src/app/shared/models/cronograma.model';
import {AgregarDetallesRubros, Proyect} from 'src/app/shared/models/project.model';
import {ProjectService} from 'src/app/shared/services/Proyect/project.service';
import {iniciarProyecto} from '../../../../shared/models/project.model';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import {truncate} from 'fs';
import {SucessDialogComponent, SucessDialogData} from '../../../admin/Dialog/sucess-dialog/sucess-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
    selector: 'app-reportes',
    templateUrl: './reportes.component.html',
    styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
    iniciarproyect: Proyect[]
    rubros: AgregarDetallesRubros[]
    cronograma: actividad[]
    SeguimientCronograma: Partial<cronogramaObj>
    Total = 0
    nombreproject
    InvestigadorLider
    Correo
    UnidadDependencia
    Telefono
    FechaInforme
    nuevocrono = []
    avanceGlobal = 0
    totalasignado = 0
    totalejecutado = 0
    totalcumplimiento = 0
    reporte: boolean

    constructor(private cronogramaService: cronogramaService, private rutaActiva: ActivatedRoute, private projectService: ProjectService, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.reporte = true
        this.getAllCronograma()
        this.getAllRubros()
    }

    GenerarReporte() {
        this.getAllCronograma()
        this.getAllRubros()
        this.reporte = false
    }

    getAllCronograma() {
        let div = 0
        let avance
        let projectid = this.rutaActiva.snapshot.params.id
        this.cronogramaService.getByProject(projectid).subscribe(r => {
            this.cronograma = r.cronogramas.actividades

            this.cronograma.forEach(element => {
                let subact = element.subActividad
                subact.forEach(element => {
                    avance = element.avance
                    this.avanceGlobal = (parseInt(avance) + this.avanceGlobal)
                    this.nuevocrono.push(element)
                    div = div + 1
                });
            });
            this.avanceGlobal = this.avanceGlobal / div
            this.avanceGlobal = parseFloat(this.avanceGlobal.toFixed(2))
        })
    }

    getAllRubros() {
        let div = 0
        let projectid = this.rutaActiva.snapshot.params.id
        this.projectService.getById(projectid).subscribe(r => {
            this.rubros = r.Proyecto.AgregarDetallesRubros
            this.iniciarproyect = r.Proyecto.iniciarProyecto[0]
            this.nombreproject = r.Proyecto.iniciarProyecto[0].nombreProyecto
            this.InvestigadorLider = r.Proyecto.iniciarProyecto[0].gestor
            this.Correo = r.Proyecto.iniciarProyecto[0].email
            this.UnidadDependencia = r.Proyecto.iniciarProyecto[0].dependencia
            this.Telefono = r.Proyecto.iniciarProyecto[0].telefonoGestor
            this.FechaInforme = new Date()
            this.rubros.forEach(element => {
                let ejecutado
                let asignado
                let cumplimiento

                ejecutado = element.PresupuestoEjecutado
                asignado = element.TotalEfectivo
                cumplimiento = element.Cumplimiento

                this.totalasignado = parseInt(asignado) + this.totalasignado
                this.totalejecutado = parseInt(ejecutado) + this.totalejecutado
                this.totalcumplimiento = parseInt(cumplimiento) + this.totalcumplimiento
                div = div + 1
            });
            this.totalcumplimiento = this.totalcumplimiento / div
            this.totalcumplimiento = parseFloat(this.totalcumplimiento.toFixed(2))

        })
    }

    downloadPDF() {

        let datossucess: SucessDialogData = {
            icono: 'done',
            severidad: 'dialog-sucess',
            encabezado: `Descargando Reporte`,
            descripcion: `Se va a descarga el reporte en un momento`
        }
        const dialogRef = this.dialog.open(SucessDialogComponent, {
            ariaLabel: `Se va a descarga el reporte en un momento`,
            role: 'alertdialog',
            autoFocus: false,
            data: datossucess
        });
        dialogRef.afterClosed().subscribe(result => {

        });

        this.reporte = true
        var data = document.getElementById('GHJEAFR042');
        html2canvas(data).then(canvas => {
            var margin = 2
            var imgWidth = 200 - 2 * margin;
            var pageHeight = 285;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            const contentDataURL = canvas.toDataURL('image/png', 10)
            var options = {
                size: '70px',
                background: '#fff',
                pagesplit: true,
            };
            let pdf = new jsPDF('p', 'mm'); // A4 size page of PDF
            var position = 20;

            var width = pdf.internal.pageSize.width;
            var height = pdf.internal.pageSize.height;
            pdf.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight - 10, options)
            pdf.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight - 10, options);
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {

                position = (heightLeft - imgHeight);
                pdf.addPage();
                pdf.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight - 10, options);
                heightLeft -= pageHeight;
            }
            pdf.save('Reporte Seguimiento.pdf');
        });
    }
}
