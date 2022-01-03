import {Component, OnInit} from '@angular/core';
import {
    Proyect,
    AgregarDetallesRubros,
    informacion,
    EquipoInvestigacion,
    iniciarProyecto,
    bibliografia, FirmasInterface
} from '../../../../shared/models/project.model';
import {ProjectService} from '../../../../shared/services/Proyect/project.service';
import {AuthStorageService} from '../../../../@core/services/storage/auth-storage/auth-storage.service';
import {ActivatedRoute, Params} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {VistaFormulacionComponent, VistaFormulacionData} from '../vista-formulacion/vista-formulacion.component';
import {InstructivosService} from '../../../../@core/services/instructivos/FormIns.service';
import {Api} from '../../../../../environments/environment';
import {cronogramaObj, actividad} from '../../../../shared/models/cronograma.model';
import {cronogramaService} from '../../../../shared/services/cronograma/cronograma.service';
import {SaveStateService} from '../../../../shared/services/saveStateService/save-state.service';
import {Entidad, Grupo, StateInterface} from '../../../../shared/services/saveStateService/StateInterface';
import {finalize} from 'rxjs/operators';

// tslint:disable-next-line:class-name
export interface file {
    NombreArchivo: string;
    suma: number[];
}

@Component({
    selector: 'app-create-proyect',
    templateUrl: './create-proyect.component.html',
    styleUrls: ['./create-proyect.component.scss']
})
export class CreateProyectComponent implements OnInit {
    public aceptoTerminos = false;
    public ProyectoNuevo: Proyect;
    public IdProyec;
    public Val = false;
    public AgregarDetalles: AgregarDetallesRubros[];
    public informaciones: informacion[];
    public Entidades: Entidad[];
    public EquipoInvestigaciones: EquipoInvestigacion[];
    public Grupos: Grupo[];
    public iniciarProyecto: iniciarProyecto;
    public bibliografia: bibliografia[];
    public UserId;
    public Actividades: actividad[];
    public hasError = false;
    public messageError = '';
    public firmas: FirmasInterface[];

    private state: StateInterface;

    constructor(
        private projectService: ProjectService,
        public dialog: MatDialog,
        private auth: AuthStorageService,
        private rutaActiva: ActivatedRoute,
        private instructivosService: InstructivosService,
        private saveStateService: SaveStateService,
        private cronogramaService: cronogramaService) {
    }

    ngOnInit(): void {
        this.IdProyec = localStorage.getItem('IdProyec');
        this.state = this.saveStateService.getState();
        if (this.IdProyec !== null) {
            this.Val = true;
            console.log('ACTUALIZAR');
        }
    }

    private crearObjetoProyectoNuevo(): Proyect {
        const {id} = this.rutaActiva.snapshot.params;
        const {primerPaso, segundoPaso, tercerPaso, cuartoPaso} = this.state;
        const UserId = this.auth.getUserId();
        this.Actividades = JSON.parse(localStorage.getItem('cronograma'));

        return {
            Convocatoria: id,
            UserId,
            ProyectoBloqueado: false,
            Seguimiento: false,
            AgregarDetallesRubros: tercerPaso.componentePresupuestal.personalCientifico,
            Entidades: tercerPaso.componentePresupuestal.entidades,
            EquipoInvestigaciones: JSON.parse(localStorage.getItem('equipoInvestigacion')),
            bibliografias: JSON.parse(localStorage.getItem('bibliografia')),
            estadoArte: localStorage.getItem('estadoArte'),
            grupos: segundoPaso.listaDeGrupos,
            informaciones: JSON.parse(localStorage.getItem('informacion')),
            iniciarProyecto: primerPaso,
            marcoConceptual: localStorage.getItem('marcoConceptual'),
            metodologia: localStorage.getItem('metodologia'),
            objetivoGeneral: this.state.cuartoPaso.objetivo.objetivoGeneral,
            objetivosEspecificos: this.state.cuartoPaso.objetivo.objetivosEspecificos,
            palabraClaves: JSON.parse(localStorage.getItem('palabraClaves')),
            resultadosEsperados: localStorage.getItem('resultadosEsperados'),
            productosEsperados: JSON.parse(localStorage.getItem('productosEsperados')),
            resultadosPrevios: localStorage.getItem('resultadosPrevios'),
            resumen: localStorage.getItem('resumen'),
            ValorTotal: 0,
            firmas: this.createFirmasInterface(UserId, this.getInvestigadorId(), primerPaso.comandante, primerPaso.gestorId),
            planteamiento: cuartoPaso.planteamiento
        };
    }

    private cleanLocalStorage(): void {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('Role');
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('Role', role);
    }

    public crearProyecto(): void {
        try {
            this.state = this.saveStateService.getState();
            const {primerPaso, segundoPaso, tercerPaso, cuartoPaso, quintoPaso} = this.state;
            const actividades = JSON.parse(localStorage.getItem('cronograma'));
            const proyectoNuevo = this.crearObjetoProyectoNuevo();

            if (!primerPaso) {
                this.messageError = 'Falta información en el primer paso';
                this.hasError = true;
            }
            if (!segundoPaso) {
                this.messageError = 'Falta información en el segundo paso';
                this.hasError = true;
            }
            if (!tercerPaso) {
                this.messageError = 'Falta información en el cuarto paso';
                this.hasError = true;
            }
            if (!cuartoPaso) {
                this.messageError = 'Falta información en el tercer paso';
                this.hasError = true;
            }
            if (!quintoPaso) {
            }
            if (!this.informaciones) {
            }

            if (!this.hasError) {
                this.projectService.add(proyectoNuevo)
                    .pipe(finalize(() => this.cleanLocalStorage()))
                    .subscribe(responseCreateProject => {
                        const proyectId = responseCreateProject.Proyecto._id;
                        const {Convocatoria: ConvocatoriaId} = proyectoNuevo;
                        const cronograma: cronogramaObj = {ConvocatoriaId, proyectId, actividades};

                        this.cronogramaService.add(cronograma)
                            .subscribe(responseCronograma => console.log('responseCronograma: ', responseCronograma));

                        this.auth.getFile().forEach(element => {
                            const formData = new FormData();
                            const fileSelected = element.file;
                            formData.append('CodigoPr', proyectId);
                            formData.append('NombreTipo', element.name);
                            formData.append('file', fileSelected, element.name);
                            formData.append('NombreDoc', element.NombreDoc);
                            formData.append('NombreArchivo', Api.api + element.name + proyectId + '.' + fileSelected.type.split('/')[1]);

                            this.instructivosService.uploadFile(formData)
                                .subscribe(responseUpdateFile => console.log('responseUpdateFile: ', responseUpdateFile));
                        });

                        const datos: VistaFormulacionData = {
                            idProyecto: proyectId,
                            evaluar: false
                        };
                        const dialogRef = this.dialog.open(VistaFormulacionComponent, {
                            data: datos
                        });
                    });
            }
        }
         catch (error) {
             this.messageError = 'Falta información, revisa el formulario';
             this.hasError = true;
         }
    }

    public upDate(): void {
        this.state = this.saveStateService.getState();
        console.log('estado ultimo paso:: ', this.state);
        const cv = this.rutaActiva.snapshot.params;
        const Convocatoria = cv.id;
        this.AgregarDetalles = JSON.parse(localStorage.getItem('AgregarDetallesRubros'));
        this.Entidades = JSON.parse(localStorage.getItem('Entidades'));
        this.informaciones = JSON.parse(localStorage.getItem('informacion'));
        this.EquipoInvestigaciones = JSON.parse(localStorage.getItem('equipoInvestigacion'));
        this.Grupos = JSON.parse(localStorage.getItem('grupos'));
        this.iniciarProyecto = JSON.parse(localStorage.getItem('iniciarProyecto'));
        this.bibliografia = JSON.parse(localStorage.getItem('bibliografia'));
        this.UserId = this.auth.getUserId();

        this.ProyectoNuevo = {
            UserId: this.UserId,
            Convocatoria,
            ProyectoBloqueado: false,
            AgregarDetallesRubros: this.AgregarDetalles,
            Entidades: this.Entidades,
            EquipoInvestigaciones: this.EquipoInvestigaciones,
            bibliografias: this.bibliografia,
            estadoArte: localStorage.getItem('estadoArte'),
            grupos: JSON.parse(localStorage.getItem('grupos')),
            informaciones: this.informaciones,
            iniciarProyecto: this.iniciarProyecto,
            marcoConceptual: localStorage.getItem('marcoConceptual'),
            metodologia: localStorage.getItem('metodologia'),
            objetivoGeneral: this.state.cuartoPaso.objetivo.objetivoGeneral,
            objetivosEspecificos: this.state.cuartoPaso.objetivo.objetivosEspecificos,
            palabraClaves: JSON.parse(localStorage.getItem('palabraClaves')),
            resultadosEsperados: localStorage.getItem('resultadosEsperados'),
            productosEsperados: JSON.parse(localStorage.getItem('productosEsperados')),
            resultadosPrevios: localStorage.getItem('resultadosPrevios'),
            resumen: localStorage.getItem('resumen'),
            ValorTotal: 0
        };

        if (this.informaciones != null) {
            this.projectService.update(localStorage.getItem('IdProyec'), this.ProyectoNuevo).subscribe(r => {
                const idProject = r.Proyecto._id;
                this.auth.getFile().forEach(element => {
                    const formData = new FormData();
                    formData.append('CodigoPr', idProject);
                    formData.append('NombreTipo', element.name);
                    const file = element.file;
                    formData.append('file', file, element.name);
                    formData.append('NombreDoc', element.NombreDoc);
                    formData.append('NombreArchivo', Api.api + element.name + idProject + '.' + file.type.split('/')[1]);

                    this.instructivosService.uploadFile(formData).subscribe((res) => {
                    });
                });

                this.auth.setFileC();
                const datos: VistaFormulacionData = {
                    idProyecto: idProject,
                    evaluar: false
                };
                const dialogRef = this.dialog.open(VistaFormulacionComponent, {
                    data: datos
                });
            });
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('Role');
            localStorage.clear();
            localStorage.setItem('token', token);
            localStorage.setItem('Role', role);
        }
    }

    public closeAlert(): void {
        this.hasError = false;
        this.messageError = '';
    }

    createFirmasInterface(investigador: string, investigadorPrincipal: string, comandante: string, gestor: string): FirmasInterface[] {
        return [
            {
                name: 'Investigador',
                idQuienFirma: investigador,
                status: false,
            },
            {
                name: 'Investigador Principal',
                idQuienFirma: investigadorPrincipal,
                status: false,
            },
            {
                name: 'Comandante',
                idQuienFirma: comandante,
                status: false,
            },
            {
                name: 'GestorACTI',
                idQuienFirma: gestor,
                status: false,
            }
        ];
    }

    private getInvestigadorId(): string {
        return this.state.segundoPaso.equipoDeInvestigacion
            .find(investigador => investigador.cargo === 'Investigador principal').investigadorId;
    }
}
