import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddDetalleRubroComponent, AddDetalleRubroData} from './add-detalle-rubro/add-detalle-rubro.component';
import {DialogAgregarComponent} from './dialog-agregar/dialog-agregar.component';
import {ProjectEntryService} from '../../../../../../shared/services/project-entry/project-entry.service';
import {CommonSimpleModel} from '../../../../../../shared/models/common-simple.model';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Entidad, StateInterface} from '../../../../../../shared/services/saveStateService/StateInterface';
import {SaveStateService} from '../../../../../../shared/services/saveStateService/save-state.service';

@Component({
    selector: 'app-componente-presupuestal',
    templateUrl: './componente-presupuestal.component.html',
    styleUrls: ['../../presupuesto.component.scss']
})
export class ComponentePresupuestalComponent implements OnInit {

    public dataSourceRubro = [];
    public displayedColumnsRubro: string[] = ['NombreRubro', 'Descripcion', 'rubros'];
    public dataSource = [];
    public rubro: CommonSimpleModel[] = [];
    public Convocatoria: string;
    public iniciarProyecto: FormGroup;
    public rub;
    public entid = [];
    public acti;
    public displayedColumns: string[] = ['Institucion', 'NIT', 'Persona', 'acciones'];
    public subtotales = [];
    public mostrarRubros = true;
    public ENTIDAD_FAC: Entidad = {
        nombre: 'FAC',
        nit: '0001',
        personaACargo: 'Persona a cargo',
        numeroDeContacto: '320',
        email: 'emailfac@gmail.com'
    };
    public total = 0;
    public totalEfectivo = 0;
    public totalEspecie = 0;
    public state: StateInterface;

    constructor(
        public dialog: MatDialog,
        private projectEntryService: ProjectEntryService,
        private rutaActiva: ActivatedRoute,
        private saveStateService: SaveStateService) {
    }

    ngOnInit(): void {
        this.getAll();
        this.initializeData();
    }

    public limpiarDatos(): void {
        this.state.tercerPaso.componentePresupuestal.personalCientifico = [];
        this.totalEfectivo = 0;
        this.totalEspecie = 0;
        this.total = 0;
        this.updateState();
    }

    public getAmount(entidad: string, tipoDeRubro: string, nombreDeRubro: string): number {
        const state = this.saveStateService.getState();
        if (!state || !state.tercerPaso) {
            return 0;
        }
        const {personalCientifico: listaDeRubros} = state.tercerPaso.componentePresupuestal;
        if (listaDeRubros.length === 0) {
            return 0;
        }
        const rubroActual = listaDeRubros
            .find(rubro => rubro.entidad === entidad && rubro.tipoDeRubro === tipoDeRubro && rubro.NombreRubro === nombreDeRubro);
        if (!rubroActual) {
            return 0;
        }
        return rubroActual.EntidadesCostos;
    }

    public getTotalSubTypeAmount(entidad: string, tipoDeRubro: string): number {
        let total = 0;
        const state = this.saveStateService.getState();
        if (!state || !state.tercerPaso) {
            return 0;
        }
        const {personalCientifico: listaDeRubros} = state.tercerPaso.componentePresupuestal;
        if (listaDeRubros.length === 0) {
            return 0;
        }
        listaDeRubros.map(rubro => {
            if (rubro.tipoDeRubro === tipoDeRubro && rubro.entidad === entidad) {
                total = total + rubro.EntidadesCostos;
            }
        });
        return total;
    }

    public getTotalAmount(): void {
        const state = this.saveStateService.getState();
        if (!state || !state.tercerPaso) {
            this.total = 0;
        }
        const {personalCientifico: listaDeRubros} = state.tercerPaso.componentePresupuestal;
        listaDeRubros.map(rubro => this.total = this.total + rubro.EntidadesCostos);
    }

    private initializeData(): void {
        const state = this.saveStateService.getState();
        if (state?.tercerPaso) {
            this.state = state;
            this.dataSource = this.state.tercerPaso.componentePresupuestal.entidades;
        } else {
            this.state = {
                ...state,
                tercerPaso: {
                    componentePresupuestal: {
                        rubros: [],
                        entidades: [this.ENTIDAD_FAC],
                        personalCientifico: []
                    }
                }
            };
            this.dataSource = this.state.tercerPaso.componentePresupuestal.entidades;
            this.updateState();
        }
    }

    public deleteEntidades(nit): void {
        this.state.tercerPaso.componentePresupuestal.entidades = this.dataSource.filter(entidad => entidad.nit !== nit);
        this.dataSource = this.state.tercerPaso.componentePresupuestal.entidades;
        this.updateState();
    }

    public activar(): void {
        this.acti = true;
    }

    public agregarEntidad(): void {
        const dialogRef = this.dialog.open(DialogAgregarComponent, {});
        dialogRef.afterClosed()
            .subscribe(response => {
                if (response) {
                    this.state = this.saveStateService.getState();
                    this.dataSource = [...this.state.tercerPaso.componentePresupuestal.entidades];
                    this.getAll();
                }
            });
    }

    public addDetalleRubro(): void {
        this.acti = false;
        let id;
        let desc;
        let cons;
        let num = 0;
        this.rubro.forEach(element => {
            num = num + 1;
            if (element._id == this.rub) {
                id = element._id;
                desc = element.descr;
                cons = num;
            }
        });

        let datos: AddDetalleRubroData = {
            id: id,
            desc: desc,
            cons: cons,
            Val: false
        };

        const dialogref = this.dialog.open(AddDetalleRubroComponent, {
            data: datos
        });
        dialogref.afterClosed().subscribe(response => {
            if (response) {
                this.getAll();
                this.updateDataSource();
                this.getTotalAmount();
            }
        });
    }

    private updateDataSource(): void {
        this.state = this.saveStateService.getState();
        this.dataSourceRubro = this.state.tercerPaso?.componentePresupuestal?.personalCientifico;
    }

    public getAll(): void {
        const cv = this.rutaActiva.snapshot.params;
        this.Convocatoria = cv.id;
        const entidadesAux = [];
        const subTotalAux = [];
        this.rubro = [];
        this.projectEntryService.getIdConv(this.Convocatoria)
            .subscribe(response => {
                response.forEach(element => {
                    this.rubro.push(element);
                });
            });
        if (this.dataSource != null) {
            this.dataSource.forEach(element => {
                entidadesAux.push(element.nombre);
                subTotalAux.push({efectivo: 0, especie: 0});
            });
        }
        this.entid = entidadesAux;
        this.subtotales = subTotalAux;
    }

    private updateState(): void {
        this.state = {
            ...this.saveStateService.getState(),
            tercerPaso: this.state.tercerPaso
        };
        this.saveStateService.setState(this.state);
    }
}
