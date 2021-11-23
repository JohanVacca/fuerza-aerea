import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {ProjectService} from 'src/app/shared/services/Proyect/project.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Proyect, Calificaciones} from '../../../../shared/models/project.model';
import {
    DetalleRubroComponent,
    DetalleRubroData
} from '../../../formulacion/components/presupuesto/components/componente-presupuestal/detalle-rubro/detalle-rubro.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthStorageService} from './../../../../@core/services/storage/auth-storage/auth-storage.service';
import {ConfirmDialogComponent, ConfirmacionDialogData} from '../../../admin/Dialog/confirm-dialog/confirm-dialog.component';
import {SucessDialogComponent, SucessDialogData} from '../../../admin/Dialog/sucess-dialog/sucess-dialog.component';

// import * as jspdf from 'jspdf';
// import 'jspdf-autotable'
// require('jspdf-autotable');
// import { UserOptions } from 'jspdf-autotable';

import * as jsPDF from 'jspdf';

import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import {cronogramaService} from '../../../../shared/services/cronograma/cronograma.service';
import {CronogramaResponse, MetodologiaObjetivo} from '../../../../shared/services/saveStateService/StateInterface';
import {finalize} from 'rxjs/operators';

require('jspdf-autotable');

// import 'jspdf-autotable'
// import { defaultColors } from 'ng2-charts';

// interface jsPDFWithPlugin extends jsPDF {
//   autotable: (options: UserOptions) => jsPDF;
// }

export interface Vegetable {
    name: string;
}

@Component({
    selector: 'app-vista-formulacion',
    templateUrl: './vista-formulacion.component.html',
    styleUrls: ['./vista-formulacion.component.scss']
})
export class VistaFormulacionComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: VistaFormulacionData,
                private projectService: ProjectService,
                public form: FormBuilder,
                public dialog: MatDialog,
                private auto: AuthStorageService,
                private cronogramaServic: cronogramaService,
                public dialogRef: MatDialogRef<VistaFormulacionComponent>) {
    }

    evaluacion: FormGroup;
    //
    nombreProyecto: string;
    linea: string;
    programa: string;
    subprograma: string;
    tipoInvestigacion: string;
    avala: string;
    lugar: string;
    duracion: number;
    //
    gestor: string;
    email: string;
    telefonoGestor: number;
    comandante: string;
    ComandanteCorreo: String;
    ComandanteNumber: String;
    //

    dataSourceRubro = [];
    entid = [];
    objetivoGeneral: string;

    //
    equipoInvestigacion;
    //
    unidadDependencia: string;

    ValidarEvaluar = this.data.evaluar;

    objetivosEspecificos: [];
    resumen: string;
    palabrasClave: [];
    marcoConceptual: string;
    estadoArte: string;
    resultadosPrevios: string;
    resultadosEsperados: string;
    metodologia: string;
    impactoAmbiental: string;
    bibliografias: [];

    Valores = [];

    vlrproyectoC: number = 0;

    Rvlrproyecto = 0;
    Rvlrunidadependencia = 0;
    Rvlrequipo = 0;
    RvlrobjGeneral = 0;
    RvlrobjEspecifico = 0;
    Rvlrresumen = 0;
    RvlrpalabrasClaves = 0;
    Rvlrmarco = 0;
    Rvlrestado = 0;
    RvlrresultPrevios = 0;
    RvlrresultEsperados = 0;
    Rvlrmetodologia = 0;
    Rvlrimpacto = 0;
    Rvlrbibliografia = 0;
    RvlrproductosPresupuesto = 0;
    displayedColumns: string[] = ['Grado', 'Nombres', 'Apellidos', 'Cargo', 'Dedicacion', 'Grupo'];
    dataSource;
    modelo;
    grupos = [];
    productosEsperados = [];
    Calificado = false;
    pregunta;
    date;

    public listaDeMetodologia: MetodologiaObjetivo[] = [];

    Cargar() {
        if (this.data.evaluar) {
            this.Rvlrproyecto = this.data.valor.vlrproyecto || 0;
            this.Rvlrunidadependencia = this.data.valor.vlrunidadependencia || 0;
            this.Rvlrequipo = this.data.valor.vlrequipo || 0;
            this.RvlrobjGeneral = this.data.valor.vlrobjGeneral || 0;
            this.RvlrobjEspecifico = this.data.valor.vlrobjEspecifico || 0;
            this.Rvlrresumen = this.data.valor.vlrresumen || 0;
            this.RvlrpalabrasClaves = this.data.valor.vlrpalabrasClaves || 0;
            this.Rvlrmarco = this.data.valor.vlrmarco || 0;
            this.Rvlrestado = this.data.valor.vlrestado || 0;
            this.Calificado = this.data.Evaluado;
        }
    }

    ngOnInit(): void {
        this.getAll();
        this.Cargar();
        this.builder();
    }

    builder() {
        this.evaluacion = this.form.group({
            vlrproyecto: new FormControl(this.Rvlrproyecto, [Validators.max(20), Validators.min(0)]),
            vlrunidadependencia: new FormControl(this.Rvlrunidadependencia, [Validators.max(15), Validators.min(0)]),
            vlrequipo: new FormControl(this.Rvlrequipo, [Validators.max(5), Validators.min(0)]),
            vlrobjGeneral: new FormControl(this.RvlrobjGeneral, [Validators.max(5), Validators.min(0)]),
            vlrobjEspecifico: new FormControl(this.RvlrobjEspecifico, [Validators.max(8), Validators.min(0)]),
            vlrresumen: new FormControl(this.Rvlrresumen, [Validators.max(7), Validators.min(0)]),
            vlrpalabrasClaves: new FormControl(this.RvlrpalabrasClaves, [Validators.max(15), Validators.min(1)]),
            vlrmarco: new FormControl(this.Rvlrmarco, [Validators.max(5), Validators.min(1)]),
            vlrestado: new FormControl(this.Rvlrestado, [Validators.max(20), Validators.min(0)]),
        });

    }

    getAll() {
        this.projectService.getById(this.data.idProyecto)
            .pipe(finalize( () => this.getCronograma()))
            .subscribe(r => {
                console.log('r::: ', r);
                this.nombreProyecto = r.Proyecto.iniciarProyecto[0].nombreProyecto;
                this.linea = r.Proyecto.iniciarProyecto[0].linea;
                this.modelo = r.Proyecto.iniciarProyecto[0].modelo;
                this.grupos = r.Proyecto.grupos;
                this.date = r.Proyecto.date;
                this.programa = r.Proyecto.iniciarProyecto[0].programa;
                this.subprograma = r.Proyecto.iniciarProyecto[0].subprograma;
                this.tipoInvestigacion = 'N/A';
                this.avala = r.Proyecto.iniciarProyecto[0].avala;
                this.lugar = r.Proyecto.iniciarProyecto[0].lugar;
                this.duracion = r.Proyecto.iniciarProyecto[0].duracion;
                this.gestor = r.Proyecto.iniciarProyecto[0].gestor;
                this.email = r.Proyecto.iniciarProyecto[0].email;
                this.telefonoGestor = r.Proyecto.iniciarProyecto[0].telefonoGestor;
                this.comandante = r.Proyecto.iniciarProyecto[0].comandante.profile.names + ' ' + r.Proyecto.iniciarProyecto[0].comandante.profile.surname;
                this.ComandanteCorreo = r.Proyecto.iniciarProyecto[0].comandante.email;
                this.ComandanteNumber = r.Proyecto.iniciarProyecto[0].comandante.phoneNumber;
                this.unidadDependencia = r.Proyecto.iniciarProyecto[0].dependencia;
                this.equipoInvestigacion = r.Proyecto.EquipoInvestigaciones;
                this.objetivoGeneral = r.Proyecto.objetivoGeneral;
                this.objetivosEspecificos = r.Proyecto.objetivosEspecificos;
                this.resumen = r.Proyecto.resumen;
                this.palabrasClave = r.Proyecto.palabraClaves;
                this.marcoConceptual = r.Proyecto.marcoConceptual;
                this.estadoArte = r.Proyecto.estadoArte;
                this.resultadosPrevios = r.Proyecto.resultadosPrevios;
                this.resultadosEsperados = r.Proyecto.resultadosEsperados;
                this.metodologia = r.Proyecto.metodologia;
                this.impactoAmbiental = r.Proyecto.informaciones[0].impacto;
                this.pregunta = r.Proyecto.informaciones[0].pregunta;
                this.bibliografias = r.Proyecto.bibliografias;
                this.productosEsperados = [...r.Proyecto.productosEsperados, ...r.Proyecto.productosEsperados];
                this.dataSourceRubro = r.Proyecto.AgregarDetallesRubros;
                r.Proyecto.Entidades.forEach(element => {
                    this.entid.push(element.Institucion);
                });
            });
    }

    private getCronograma(): void {
        const listaDeMetodologia: MetodologiaObjetivo[] = [];
        this.objetivosEspecificos.map(obj => {
            const {descr: objetivo} = obj;
            listaDeMetodologia.push({
                objetivo,
                actividades: []
            });
        });

        this.cronogramaServic.getByProjectId(this.data.idProyecto)
            .subscribe(response => {
                response.cronogramas.actividades.map(actividad => {
                    listaDeMetodologia.map(metodologia => {
                       if (metodologia.objetivo === actividad.objetivo) {
                           metodologia.actividades.push(actividad.nombreAct);
                       }
                    });
                    this.listaDeMetodologia = listaDeMetodologia;
                });
            });
    }

    evaluar() {

        let encabezado;
        let descripcion;

        encabezado = `Terminar Evaluacion`;
        descripcion = `¿Se encuentra seguro de Termianr la Evaluacion?`;

        let datos: ConfirmacionDialogData = {
            icono: 'info',
            severidad: 'dialog-info',
            encabezado: encabezado,
            descripcion: descripcion
        };
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            ariaLabel: `${encabezado}  `,
            role: 'alertdialog',
            autoFocus: false,
            data: datos

        });
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'true') {
                try {
                    let evaluacion = this.evaluacion.value;
                    let suma = 0;
                    let count = 1;
                    let Div = 0;
                    let AuxProyec: Proyect;
                    let auxCali: any = [];
                    suma = parseInt(evaluacion.vlrproyecto) + parseInt(evaluacion.vlrunidadependencia) +
                        parseInt(evaluacion.vlrequipo) + parseInt(evaluacion.vlrobjGeneral) +
                        parseInt(evaluacion.vlrobjEspecifico) + parseInt(evaluacion.vlrresumen) +
                        parseInt(evaluacion.vlrpalabrasClaves) + parseInt(evaluacion.vlrmarco) +
                        parseInt(evaluacion.vlrestado);
                    let calificaciones: Calificaciones = {
                        idEv: this.auto.getUserId(),
                        Evaluado: true,
                        ValorParcial: suma,
                        Valores: evaluacion
                    };

                    this.projectService.getById(this.data.idProyecto).subscribe(r => {
                        AuxProyec = r['Proyecto'];
                        r.Proyecto.calificaciones.forEach(element => {
                            suma = suma + element.ValorParcial;
                            if (element.idEv._id != this.auto.getUserId()) {
                                auxCali.push(element);
                            }
                            count = count + 1;
                        });
                        AuxProyec.ValorTotal = Math.floor(suma / count);
                        auxCali.push(calificaciones);
                        AuxProyec.calificaciones = auxCali;
                        this.projectService.update(this.data.idProyecto, AuxProyec).subscribe(r => {
                        });
                        this.dialogRef.close(true);
                    });
                } catch (error) {
                }
            } else {
            }
        });
    }

    Mostrar(idRubro) {

        let datos: DetalleRubroData = {
            id: idRubro,
            MosC: true,
            Rubro: this.dataSourceRubro,
        };

        const dialogref = this.dialog.open(DetalleRubroComponent, {
            data: datos
        });
        dialogref.afterClosed().subscribe(res => {
        });
    }

    downloadPDF(): void {

        let datossucess: SucessDialogData = {
            icono: 'done',
            severidad: 'dialog-sucess',
            encabezado: `Descargando Reporte`,
            descripcion: `Se va a descarga el reporte en un momento`
        };
        const dialogRef = this.dialog.open(SucessDialogComponent, {
            ariaLabel: `Se va a descarga el reporte en un momento`,
            role: 'alertdialog',
            autoFocus: false,
            data: datossucess
        });
        dialogRef.afterClosed().subscribe(result => {

        });

        var data = document.getElementById('PROYECTPDF');
        html2canvas(data).then(canvas => {
            const margin = 2;
            const imgWidth = 200 - 2 * margin;
            const pageHeight = 285;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            const contentDataURL = canvas.toDataURL('image/png', 10);
            const options = {
                size: '70px',
                background: '#fff',
                pagesplit: true,
            };
            const pdf = new jsPDF('p', 'mm'); // A4 size page of PDF
            let position = 20;

            const width = pdf.internal.pageSize.width;
            const height = pdf.internal.pageSize.height;
            pdf.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight - 10, options);
            pdf.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight - 10, options);
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {

                position = (heightLeft - imgHeight);
                // console.log(position)
                pdf.addPage();
                pdf.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight - 10, options);
                heightLeft -= pageHeight;
            }
            pdf.save('FormulacionDeProyecto.pdf'); // Generated PDF
        });
    }
}

export interface iniciarProyecto {
    avala: string,
    comandante: string,
    dependencia: string,
    duracion: number,
    email: string,
    gestor: string,
    linea: string,
    lugar: string,
    modelo: string,
    nombreProyecto: string,
    Programa: string,
    subprograma: string,
    telefonoGestor: number,
}

export interface VistaFormulacionData {
    idProyecto: string
    evaluar: boolean,
    valor?: any,
    Evaluado?: boolean
}
