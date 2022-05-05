import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../shared/services/Proyect/project.service';
import {ActivatedRoute} from '@angular/router';
import {AgregarDetallesRubros} from '../../../../shared/models/project.model';
import {Actividad} from '../../../../shared/services/saveStateService/StateInterface';
import {finalize} from 'rxjs/operators';
import {cronogramaService} from '../../../../shared/services/cronograma/cronograma.service';

@Component({
    selector: 'app-estadisticas',
    templateUrl: './estadisticas.component.html',
    styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

    public rubros: AgregarDetallesRubros[] = [];
    public cronograma: Actividad[];
    public projectName = '';
    public projectObjective = '';
    public initialDate;
    public finalDate;
    public principal = '';
    public fechaDeInicio = '';
    public duracion = 0;

    public DATA_COUNT = 7;
    public NUMBER_CFG = {count: this.DATA_COUNT, min: -100, max: 100};
    public labels = '123';

    public chartData = [];
    public chartActividad = [];

    public cronogramaCompleto;
    public cronogramaId: string;

    public options = {
        scales : {
            yAxes: [{
                ticks: {
                    min: 0
                }
            }],
        }
    };

    constructor(
        private rutaActivated: ActivatedRoute,
        private projectService: ProjectService,
        private cronogramaService: cronogramaService
    ) {
    }

    ngOnInit(): void {
        this.getProject();
        this.getActividades();
    }

    private getActividades(): void {
        const projectId = this.rutaActivated.snapshot.params.id;
        this.cronogramaService.getByProject(projectId)
            .pipe(finalize(() => {
                this.showChartsActividad();
            }))
            .subscribe(response => {
                this.cronograma = response.cronogramas.actividades;
                this.cronogramaId = response.cronogramas._id;
                this.cronogramaCompleto = response;
            });
    }

    private getProject(): void {
        const projectId = this.rutaActivated.snapshot.params.id;
        this.projectService.getById(projectId)
            .pipe(finalize(() => {
                this.calculateEndDate();
                this.showCharts();
            }))
            .subscribe(response => {
                const {Proyecto: project} = response;
                this.rubros = project.AgregarDetallesRubros;
                this.projectObjective = project.objetivoGeneral ? project.objetivoGeneral : 'Sin objetivo definido';
                this.projectName = project.iniciarProyecto[0].nombreProyecto;
                this.duracion = project.iniciarProyecto[0].duracion;
                this.fechaDeInicio = project.date;
                this.getPrincipal(project.EquipoInvestigaciones);
            });
    }

    private calculateEndDate(): void {
        if (this.fechaDeInicio) {
            const fechaDeInicioArray = this.fechaDeInicio.split('-');
            const nuevaFecha = `${fechaDeInicioArray[1]}-${fechaDeInicioArray[0]}-${fechaDeInicioArray[2]}`;
            const endDate = new Date(nuevaFecha);
            endDate.setMonth(Number(fechaDeInicioArray[1]) - 1 + Number(this.duracion));
            this.finalDate = `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;
            this.initialDate = `${fechaDeInicioArray[1]}/${fechaDeInicioArray[0]}/${fechaDeInicioArray[2]}`;
        }
    }

    private getPrincipal(investigadores): void {
        const principal = investigadores.find(inv => inv.cargo === 'Investigador principal');
        this.principal = principal ? `${principal.nombres} ${principal.apellido}` : 'Sin investigador principal';
    }

    private showCharts(): void {
        let presupuestoTotal = 0;
        let presupuestoEjecutado = 0;
        this.rubros.forEach(rubro => {
            presupuestoTotal += rubro.EntidadesCostos;
            rubro.listaRubros.forEach(lista => {
                presupuestoEjecutado += lista.rubro;
            });
        });

        this.chartData.push(
            {
                data: [presupuestoTotal],
                label: 'Comprometido'
            },
            {
                data: [presupuestoEjecutado],
                label: 'Ejecutado'
            },
            {
                data: [presupuestoTotal - presupuestoEjecutado],
                label: 'Disponible'
            }
        );
    }

    private showChartsActividad(): void {
        this.cronograma.forEach(crono => {
            const listaSubActividades = [
                {
                    data: [90],
                    label: `% Avance en: test`
                }
            ];
            const chartActividad = {
                nombreActividad: crono.nombreAct,
                objetivo: crono.objetivo,
                listaCharts: []
            };
            crono.subActividad.forEach(subAct => {
                const total = this.calculateAdvance(subAct.fechaInicio.toString(), subAct.fechaFinal.toString());
                listaSubActividades.push(
                    {
                        data: [total],
                        label: `% Avance en: ${subAct.nombreSub}`
                    }
                );
            });
            chartActividad.listaCharts.push(listaSubActividades);
            console.log('listaSubActividades ::: ', listaSubActividades);
            this.chartActividad.push(chartActividad);
            this.calculatePercent();
        });
    }

    private calculatePercent(): void {
        this.chartActividad.forEach(actividad => {

        });
    }

    public calculateAdvance(firstDate: string, secondDate: string): number {
        const startDate = new Date(firstDate);
        const endDate = new Date(secondDate);
        const today = new Date();

        if (startDate > today) {
            return 0;
        }

        if (endDate < today) {
            return 100;
        }

        if (startDate < today && today < endDate) {
            const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
            const actualDay = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
            return Math.ceil((actualDay * 100) / totalDays);
        }
    }
}