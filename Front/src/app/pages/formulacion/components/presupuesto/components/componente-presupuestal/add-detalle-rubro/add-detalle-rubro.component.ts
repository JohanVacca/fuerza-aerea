import {ifStmt} from '@angular/compiler/src/output/output_ast';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TablaHonorariosComponent} from '../tabla-honorarios/tabla-honorarios.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TablaHonoraiosService} from 'src/app/@core/services/tabla-honorarios/tabla-honoraios.service';
import {SaveStateService} from '../../../../../../../shared/services/saveStateService/save-state.service';
import {Investigador, PersonalCientifico, StateInterface} from '../../../../../../../shared/services/saveStateService/StateInterface';

export interface PeriodicElement {
    id: number;
    institucion: string;
    efectivo: number;
    especie: number;
}


@Component({
    selector: 'app-add-detalle-rubro',
    templateUrl: './add-detalle-rubro.component.html',
    styleUrls: ['./add-detalle-rubro.component.scss']
})
export class AddDetalleRubroComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: AddDetalleRubroData,
        public dialog: MatDialog,
        private form: FormBuilder,
        private tablaHonorariosService: TablaHonoraiosService,
        private saveStateService: SaveStateService
    ) {
    }

    Perfil = [];
    maxAmount;
    showMaxAmount = false;
    aux = [];
    AddDettalles: FormGroup[] = [];
    AddDettalle: FormGroup;
    sisInfo;
    sisNum;
    val = false;
    valButton;
    dataSource = [];
    displayedColumns: string[] = ['Institucion', 'Efectivo', 'Especie'];

    Complet = false;
    PerfilDelInvestigador = ' ';
    InvestigadorSeleccionado = ' ';
    Formacion = ' ';
    Experiencia = ' ';
    NombreDelInvestigador = ' ';
    RolDelInvestigador = ' ';
    HorasSemanales = 0;
    DuracionEnMeses = 0;
    Descripcion = ' ';
    Justificacion = ' ';
    EntidadesCostos = [];
    modificado;
    honorarios = [];
    numero;
    topeMaximoPorMes;
    topeMaximoPorDia;
    topeMaximoPorHora;
    topeMaximoPorSemana;
    calculoSemana;
    calculoMes;
    costoTotal;
    HorasSemanalesForm;
    DuracionEnMesesForm;
    private state: StateInterface;
    private investigadores: Investigador[];
    private investigadorSeleccionado: Investigador;

    public isCreate = true;
    public especieTotal = 0;

    ngOnInit(): void {
        this.valButton = this.data.Val;
        this.sisInfo = this.data.desc;
        this.sisNum = this.data.cons;
        this.valid();
        this.DataS();
        if (this.data.Val) {
            this.cargarParaAC();
        }
        this.numeroparalasuma();
        this.builder();
        this.initializeData();
    }

    builder() {
        if (this.val) {
            this.AddDettalle = this.form.group({
                idRubro: this.data.id,
                PerfilDelInvestigador: new FormControl(this.PerfilDelInvestigador),
                InvestigadorSeleccionado: new FormControl(this.InvestigadorSeleccionado),
                Formacion: new FormControl(this.Formacion, [Validators.required]),
                Experiencia: new FormControl(this.Experiencia, [Validators.required]),
                NombreDelInvestigador: new FormControl(this.NombreDelInvestigador, [Validators.required]),
                RolDelInvestigador: new FormControl(this.RolDelInvestigador, [Validators.required]),
                HorasSemanales: new FormControl(this.HorasSemanales, [Validators.required]),
                DuracionEnMeses: new FormControl(this.DuracionEnMeses, [Validators.required]),
                Descripcion: new FormControl(this.Descripcion, [Validators.required]),
                Justificacion: new FormControl(this.Justificacion, [Validators.required]),
                EntidadesCostos: [this.dataSource],
                NombreRubro: this.data.desc
            });
        } else {
            this.AddDettalle = this.form.group({
                idRubro: this.data.id,
                PerfilDelInvestigador: ' ',
                InvestigadorSeleccionado: ' ',
                Formacion: ' ',
                Experiencia: ' ',
                NombreDelInvestigador: ' ',
                RolDelInvestigador: ' ',
                HorasSemanales: 0,
                DuracionEnMeses: 0,
                Descripcion: new FormControl(this.Descripcion, [Validators.required]),
                Justificacion: new FormControl(this.Justificacion, [Validators.required]),
                EntidadesCostos: [this.dataSource],
                NombreRubro: this.data.desc
            });
        }
    }

    verTabla() {
        const dialogRef = this.dialog.open(TablaHonorariosComponent, {});
    }

    numeroparalasuma() {
        let numero = this.dataSource.length;
        for (let i; i < numero; i++) {
            this.numero = i;
        }
    }

    cargarParaAC() {
        let auto = JSON.parse(localStorage.getItem('AgregarDetallesRubros'));
        if (auto != null) {
            auto.forEach(element => {
                if (element.idRubro == this.data.id) {
                    this.modificado = element.modificado;
                    this.PerfilDelInvestigador = element.PerfilDelInvestigador;
                    this.Formacion = element.Formacion;
                    this.Experiencia = element.Experiencia;
                    this.NombreDelInvestigador = element.NombreDelInvestigador;
                    this.RolDelInvestigador = element.RolDelInvestigador;
                    this.HorasSemanales = element.HorasSemanales;
                    this.DuracionEnMeses = element.DuracionEnMeses;
                    this.Descripcion = element.Descripcion;
                    this.Justificacion = element.Justificacion;
                    this.dataSource = element.EntidadesCostos;
                }
            });
        }
    }

    DataS() {

        let auto = JSON.parse(localStorage.getItem('Entidades'));
        let cont = 0;
        this.tablaHonorariosService.getall().subscribe(r => {
            this.Perfil = r['honorarios'];
        });
        auto.forEach(element => {
            let azul = element.Institucion;
            cont = cont + 1;
            let ELEMENT_DATA = {
                id: cont,
                institucion: azul,
                efectivo: 0,
                especie: 0
            };

            this.dataSource.push(ELEMENT_DATA);
        });
    }

    Change(id, Post, e) {
        // this.Complet = true;
        // this.dataSource.forEach(element => {
        //     if (id == element.id) {
        //         if (Post == 1) {
        //             element.efectivo = e.target.value;
        //         } else {
        //             element.especie = e.target.value;
        //         }
        //     }
        //     this.aux.push(element);
        // });
        // this.dataSource = this.aux;
        // this.aux = [];
    }

    valid() {
        this.val = this.data.desc == 'Personal Cientifico';
    }

    public up(): void {
        const AgregarDetarresRubros = [];
        const auto = JSON.parse(localStorage.getItem('AgregarDetallesRubros'));

        const personalCientifico: PersonalCientifico = this.AddDettalle.value;
        personalCientifico.EntidadesCostos[0].efectivo = this.costoTotal;
        this.state.tercerPaso.componentePresupuestal.personalCientifico.push(this.AddDettalle.value);
        this.updateState();

        if (auto == null) {
            AgregarDetarresRubros.push(this.AddDettalle.value);
            localStorage.setItem('AgregarDetallesRubros', JSON.stringify(AgregarDetarresRubros));
        } else {
            auto.forEach(element => {
                AgregarDetarresRubros.push(element);
            });
            AgregarDetarresRubros.push(this.AddDettalle.value);
            localStorage.setItem('AgregarDetallesRubros', JSON.stringify(AgregarDetarresRubros));
        }
    }

    upDate() {
        let AgregarDetarresRubros = [];
        let auto = JSON.parse(localStorage.getItem('AgregarDetallesRubros'));

        auto.forEach(element => {
            if (element.idRubro != this.data.id) {
                AgregarDetarresRubros.push(element);
            } else {
                AgregarDetarresRubros.push(this.AddDettalle.value);
            }
        });
        localStorage.setItem('AgregarDetallesRubros', JSON.stringify(AgregarDetarresRubros));
    }

    calculateAmount(): void {
        this.showMaxAmount = true;
    }

    private validateAllFields(): void {
        const {HorasSemanales, DuracionEnMeses, PerfilDelInvestigador} = this.AddDettalle.controls;
        if (HorasSemanales.value && DuracionEnMeses.value && PerfilDelInvestigador.value) {
            this.HorasSemanalesForm = HorasSemanales.value;
            this.DuracionEnMeses = DuracionEnMeses.value;
            this.topeMaximoPorMes
                = this.honorarios.find(honorario => honorario.honorarioId.toString() === PerfilDelInvestigador.value.honorarioId.toString()).topeMaximo;
            this.topeMaximoPorDia = (Number(this.topeMaximoPorMes) / 20).toFixed(2);
            this.topeMaximoPorHora = (Number(this.topeMaximoPorDia) / 8).toFixed(2);
            this.topeMaximoPorSemana = Number(this.topeMaximoPorDia) * 5;
            this.calculoSemana = Number(this.topeMaximoPorHora) * Number(HorasSemanales.value);
            this.calculoMes = Number(this.calculoSemana) * 4;
            this.costoTotal = Number(this.calculoMes) * Number(DuracionEnMeses.value);
            this.showMaxAmount = true;
            this.state.tercerPaso.componentePresupuestal.rubros.push(this.costoTotal);
            this.updateState();

        } else {
            this.showMaxAmount = false;
        }
    }

    private initializeData(): void {
        const state = this.saveStateService.getState();
        if (state?.tercerPaso) {
            this.state = state;
        } else {
            this.state = {
                ...state,
                tercerPaso: {
                    componentePresupuestal: {
                        rubros: [],
                        entidades: [],
                        personalCientifico: []
                    }
                }
            };
        }
        this.setData();
    }

    private setData(): void {
        this.AddDettalle.controls['DuracionEnMeses'].setValue(this.state.primerPaso.duracionEnMeses);
    }

    private buscarInvestigadoresPorPerfil(formacion): void {
        this.investigadores = this.state.segundoPaso.equipoDeInvestigacion.filter(investigador => investigador.rol === formacion);
    }

    private updateState(): void {
        this.saveStateService.setState(this.state);
    }

    public seleccionarInvestigador(investigador): void {
        this.investigadorSeleccionado = investigador;
        this.NombreDelInvestigador = `${investigador.nombre} ${investigador.apellido}`;
        this.HorasSemanales = investigador.dedicacion;
        this.AddDettalle.controls['HorasSemanales'].setValue(investigador.dedicacion);
        // this.state = {
        //   ...this.state,
        //   tercerPaso: {
        //       componentePresupuestal: {
        //           rubro: 0,
        //           entidades: []
        //       }
        //   }
        // };
        this.validateAllFields();
    }

    public cargar(perfil): void {
        const {honorarioId, formacion} = perfil;
        this.tablaHonorariosService.getall().subscribe(response => {
            this.honorarios = response['honorarios'];
            response['honorarios'].forEach(element => {
                if (element.honorarioId === honorarioId) {
                    this.Formacion = element.formacion;
                    this.RolDelInvestigador = element.formacion;
                    this.Experiencia = element.experiencia;
                    this.buscarInvestigadoresPorPerfil(formacion);
                }
            });
        });
    }
}

export interface AddDetalleRubroData {
    id: string;
    desc: string;
    cons: number;
    Val: boolean;
}
