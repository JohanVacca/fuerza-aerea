import {Component, Inject, OnInit} from '@angular/core';
import {ProjectService} from 'src/app/shared/services/Proyect/project.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
    DetalleRubroComponent,
    DetalleRubroData
} from '../../../formulacion/components/presupuesto/components/componente-presupuestal/detalle-rubro/detalle-rubro.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthStorageService} from './../../../../@core/services/storage/auth-storage/auth-storage.service';
import {SucessDialogComponent, SucessDialogData} from '../../../admin/Dialog/sucess-dialog/sucess-dialog.component';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import {cronogramaService} from '../../../../shared/services/cronograma/cronograma.service';
import {
    Entidad,
    MetodologiaObjetivo, Planteamiento,
    RubrosPorEntidades
} from '../../../../shared/services/saveStateService/StateInterface';
import {finalize} from 'rxjs/operators';
import {FirmaService} from '../../../../shared/services/firma/firma.service';
import {CommonSimpleModel} from '../../../../shared/models/common-simple.model';
import {ProjectEntryService} from '../../../../shared/services/project-entry/project-entry.service';

require('jspdf-autotable');

@Component({
    selector: 'app-vista-formulacion',
    templateUrl: './vista-formulacion.component.html',
    styleUrls: ['./vista-formulacion.component.scss']
})
export class VistaFormulacionComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: VistaFormulacionData,
        private projectService: ProjectService,
        public dialog: MatDialog,
        private auto: AuthStorageService,
        private cronogramaServic: cronogramaService,
        private firmaService: FirmaService,
        private projectEntryService: ProjectEntryService,
        public dialogRef: MatDialogRef<VistaFormulacionComponent>) {
    }

    public nombreProyecto: string;
    public linea: string;
    public programa: string;
    public subprograma: string;
    public tipoInvestigacion: string;
    public avala: string;
    public lugar: string;
    public duracion: number;
    public gestor: string;
    public email: string;
    public telefonoGestor: number;
    public comandante: string;
    public ComandanteCorreo: string;
    public ComandanteNumber: string;
    public dataSourceRubro = [];
    public entidades: Entidad[];
    public planteamiento: Planteamiento;
    public objetivoGeneral: string;
    public equipoInvestigacion;
    public unidadDependencia: string;
    public objetivosEspecificos: [];
    public resumen: string;
    public palabrasClave: [];
    public marcoConceptual: string;
    public estadoArte: string;
    public resultadosPrevios: string;
    public resultadosEsperados: string;
    public metodologia: string;
    public impactoAmbiental: string;
    public bibliografias: [];
    public Valores = [];
    public RvlrresultPrevios = 0;
    public displayedColumns: string[] = ['Grado', 'Nombres', 'Apellidos', 'Cargo', 'Dedicacion', 'Grupo'];
    public dataSource;
    public modelo;
    public grupos = [];
    public productosEsperados = [];
    public pregunta;
    public date;
    public centroDeInvestigacion;
    public convocatoriaId;
    public rubroOpcion: CommonSimpleModel[] = [];
    public totalDelProyecto = 0;
    public rubrosPorEntidades: RubrosPorEntidades[];
    public listaDeMetodologia: MetodologiaObjetivo[] = [];
    public firmaInvestigador;
    public firmaInvestigadorPrincipal;
    public firmaGestorActi;
    public firmaComandante;
    public firmas = [];
    public listaDeRubros = [];

    ngOnInit(): void {
        this.getAll();
    }

    public getAll(): void {
        this.projectService.getById(this.data.idProyecto)
            .pipe(finalize(() => {
                this.getCronograma();
                this.getRubroOpcion();
                this.getTotalAmount();
                this.getFirmas();
            }))
            .subscribe(r => {
                this.convocatoriaId = r.Proyecto.Convocatoria._id,
                    this.nombreProyecto = r.Proyecto.iniciarProyecto[0].nombreProyecto;
                this.centroDeInvestigacion = r.Proyecto.iniciarProyecto[0].centroDeInvestigacion;
                this.linea = r.Proyecto.iniciarProyecto[0].linea;
                this.modelo = r.Proyecto.iniciarProyecto[0].modelo;
                this.grupos = r.Proyecto.grupos;
                this.date = r.Proyecto.date;
                this.firmas = r.Proyecto.firmas,
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
                this.productosEsperados = [...r.Proyecto.productosEsperados];
                this.dataSourceRubro = r.Proyecto.AgregarDetallesRubros;
                this.entidades = r.Proyecto.Entidades;
                this.planteamiento = r.Proyecto.planteamiento;
            });
    }

    private getRubroOpcion(): void {
        this.projectEntryService.getIdConv(this.convocatoriaId)
            .pipe(finalize(() => this.createRubroObject()))
            .subscribe(response => {
                response.forEach(element => {
                    this.rubroOpcion.push(element);
                });
            });
    }

    private createRubroObject(): void {
        this.rubroOpcion.forEach(rubro => {
            this.entidades.forEach(entidad => {
                const efectivo = this.getAmount(entidad.nombre, 'Efectivo', rubro.descr);
                const especie = this.getAmount(entidad.nombre, 'Especie', rubro.descr);
                const hasRubro = this.listaDeRubros.find(rubroSeleccionado => rubroSeleccionado.nombre === rubro.descr);
                if (!hasRubro) {
                    this.listaDeRubros.push({entidad, efectivo, especie, nombre: rubro.descr});
                }
            });
        });
    }

    public getAmount(entidad: string, tipoDeRubro: string, nombreDeRubro: string): number {
        const rubroActual = this.dataSourceRubro
            .find(rubro => rubro.entidad === entidad && rubro.tipoDeRubro === tipoDeRubro && rubro.NombreRubro === nombreDeRubro);
        if (rubroActual) {
            return rubroActual.EntidadesCostos;
        } else {
            return 0;
        }
    }

    public getTotalSubTypeAmount(entidad: string, tipoDeRubro: string): number {
        let total = 0;
        this.dataSourceRubro.map(rubro => {
            if (rubro.tipoDeRubro === tipoDeRubro && rubro.entidad === entidad) {
                total = total + rubro.EntidadesCostos;
            }
        });
        return total;
    }

    public getTotalAmount(): void {
        this.dataSourceRubro.map(rubro => this.totalDelProyecto = this.totalDelProyecto + rubro.EntidadesCostos);
    }

    private getFirmas(): void {
        this.firmas.map(firma => {
            if (firma.name === 'Investigador' && firma.status) {
                this.getFirma(firma.idQuienFirma, 'Investigador');
            }
            if (firma.name === 'Investigador Principal' && firma.status) {
                this.getFirma(firma.idQuienFirma, 'Investigador Principal');
            }
            if (firma.name === 'Comandante' && firma.status) {
                this.getFirma(firma.idQuienFirma, 'Comandante');
            }
            if (firma.name === 'GestorACTI' && firma.status) {
                this.getFirma(firma.idQuienFirma, 'GestorACTI');
            }
        });
    }

    private getFirma(userId: string, tipo: string): void {
        this.firmaService.getFirma(userId)
            .subscribe(
                response => {
                    if (tipo === 'Investigador') {
                        this.firmaInvestigador = response.firma;
                    }
                    if (tipo === 'Investigador Principal') {
                        this.firmaInvestigadorPrincipal = response.firma;
                    }
                    if (tipo === 'Comandante') {
                        this.firmaComandante = response.firma;
                    }
                    if (tipo === 'GestorACTI') {
                        this.firmaGestorActi = response.firma;
                    }
                },
                error => console.log('error>>> ', error)
            );
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
                pdf.addPage();
                pdf.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight - 10, options);
                heightLeft -= pageHeight;
            }
            pdf.save('FormulacionDeProyecto.pdf'); // Generated PDF
        });
    }

    public closeModal(): void {
        this.dialogRef.close(false);
    }
}

export interface iniciarProyecto {
    avala: string;
    comandante: string;
    dependencia: string;
    duracion: number;
    email: string;
    gestor: string;
    linea: string;
    lugar: string;
    modelo: string;
    nombreProyecto: string;
    Programa: string;
    subprograma: string;
    telefonoGestor: number;
}

export interface VistaFormulacionData {
    idProyecto: string;
    evaluar: boolean;
    valor?: any;
    Evaluado?: boolean;
}
