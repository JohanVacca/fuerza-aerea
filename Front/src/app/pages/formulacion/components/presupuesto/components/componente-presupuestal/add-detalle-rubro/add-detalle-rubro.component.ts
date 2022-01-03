import {ifStmt} from '@angular/compiler/src/output/output_ast';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TablaHonorariosComponent} from '../tabla-honorarios/tabla-honorarios.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TablaHonoraiosService} from 'src/app/@core/services/tabla-honorarios/tabla-honoraios.service';
import {SaveStateService} from '../../../../../../../shared/services/saveStateService/save-state.service';
import {
    Entidad,
    Investigador,
    PersonalCientifico,
    StateInterface
} from '../../../../../../../shared/services/saveStateService/StateInterface';
import {finalize} from 'rxjs/operators';

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

    public Perfil = [];
    public maxAmount;
    public showMaxAmount = false;
    public aux = [];
    public AddDettalle: FormGroup;
    public sisInfo;
    public sisNum;
    public esPersonalCientifico = false;
    public valButton;
    public dataSource = [];
    public displayedColumns: string[] = ['Institucion', 'Efectivo', 'Especie'];
    public Complet = false;
    public PerfilDelInvestigador = ' ';
    public tipoDeRubro = ' ';
    public entidad = ' ';
    public InvestigadorSeleccionado = ' ';
    public Formacion = ' ';
    public Experiencia = ' ';
    public NombreDelInvestigador = ' ';
    public RolDelInvestigador = ' ';
    public HorasSemanales = 0;
    public DuracionEnMeses = 0;
    public Descripcion = ' ';
    public Justificacion = ' ';
    public EntidadesCostos = 0;
    public modificado;
    public honorarios = [];
    public numero;
    public topeMaximoPorMes;
    public topeMaximoPorDia;
    public topeMaximoPorHora;
    public topeMaximoPorSemana;
    public calculoSemana;
    public calculoMes;
    public costoTotal;
    public HorasSemanalesForm;
    public isCreate = true;
    public especieTotal = 0;
    public monto = 0;
    public tiposDeRubro = ['Efectivo', 'Especie'];
    public entidades: Entidad[] = [];

    private state: StateInterface;
    private investigadores: Investigador[];
    private investigadorSeleccionado: Investigador;

    ngOnInit(): void {
        this.valButton = this.data.Val;
        this.sisInfo = this.data.desc;
        this.sisNum = this.data.cons;
        this.valid();
        this.initializeData();
        this.DataS();
        if (this.data.Val) {
            this.cargarParaAC();
        }
        this.numeroparalasuma();
    }

    public verTabla(): void {
        this.dialog.open(TablaHonorariosComponent, {});
    }

    private numeroparalasuma(): void {
        const numero = this.dataSource.length;
        for (let i; i < numero; i++) {
            this.numero = i;
        }
    }

    private cargarParaAC(): void {
        let auto = JSON.parse(localStorage.getItem('AgregarDetallesRubros'));
        if (auto != null) {
            auto.forEach(element => {
                if (element.idRubro === this.data.id) {
                    this.modificado = element.modificado;
                    this.PerfilDelInvestigador = element.PerfilDelInvestigador;
                    this.tipoDeRubro = element.tipoDeRubro;
                    this.entidad = element.entidad;
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

    private DataS(): void {

        const { entidades } = this.state.tercerPaso.componentePresupuestal;
        let cont = 0;
        this.tablaHonorariosService.getall().subscribe(r => {
            console.log('rrrrr::: ', r);
            this.Perfil = r['honorarios'];
        });
        console.log('entidades::: ', entidades);
        // entidades.forEach(element => {
        //     let azul = element.Institucion;
        //     cont = cont + 1;
        //     let ELEMENT_DATA = {
        //         id: cont,
        //         institucion: azul,
        //         efectivo: 0,
        //         especie: 0
        //     };
        //
        //     this.dataSource.push(ELEMENT_DATA);
        // });
    }

    private valid(): void {
        this.esPersonalCientifico = this.data.desc.toLowerCase() === 'personal cientifico' || this.data.desc.toLowerCase() === 'personal científico';
        console.log('esPersonalCientifico:>:>: ', this.esPersonalCientifico)
    }

    public guardarOtro(): void {
        const otroRubro: PersonalCientifico = this.AddDettalle.value;
        otroRubro.EntidadesCostos = this.AddDettalle.controls.monto.value;
        this.state.tercerPaso.componentePresupuestal.personalCientifico.push(otroRubro);
        this.updateState();
    }

    public guardarRubro(): void {
        const personalCientifico: PersonalCientifico = this.AddDettalle.value;
        personalCientifico.EntidadesCostos = this.costoTotal;
        this.state.tercerPaso.componentePresupuestal.personalCientifico.push(personalCientifico);
        this.updateState();
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
        const {HorasSemanales, DuracionEnMeses, PerfilDelInvestigador, tipoDeRubro, entidad} = this.AddDettalle.controls;
        if (HorasSemanales.value && DuracionEnMeses.value && PerfilDelInvestigador.value) {
            this.HorasSemanalesForm = HorasSemanales.value;
            this.DuracionEnMeses = DuracionEnMeses.value;
            this.tipoDeRubro = tipoDeRubro.value;
            this.entidad = entidad.value;
            this.topeMaximoPorMes = this.honorarios
                .find(honorario => honorario.honorarioId.toString() === PerfilDelInvestigador.value.honorarioId.toString()).topeMaximo;
            this.topeMaximoPorDia = (Number(this.topeMaximoPorMes) / 20).toFixed(2);
            this.topeMaximoPorHora = (Number(this.topeMaximoPorDia) / 8).toFixed(2);
            this.topeMaximoPorSemana = Number(this.topeMaximoPorDia) * 5;
            this.calculoSemana = Number(this.topeMaximoPorHora) * Number(HorasSemanales.value);
            this.calculoMes = Number(this.calculoSemana) * 4;
            this.costoTotal = Number(this.calculoMes) * Number(DuracionEnMeses.value);
            this.showMaxAmount = true;
            this.updateState();

        } else {
            this.showMaxAmount = false;
        }
    }

    private initializeData(): void {
        const state = this.saveStateService.getState();
        if (state?.tercerPaso) {
            this.state = state;
            this.entidades = state.tercerPaso.componentePresupuestal.entidades;
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
        this.builder();
        this.setData();
        this.investigadores = this.state.segundoPaso.equipoDeInvestigacion;
    }

    private builder(): void {
        if (this.esPersonalCientifico) {
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
                tipoDeRubro: new FormControl(this.tipoDeRubro, [Validators.required]),
                entidad: new FormControl(this.entidad, [Validators.required]),
                Descripcion: new FormControl(this.Descripcion, [Validators.required]),
                Justificacion: new FormControl(this.Justificacion, [Validators.required]),
                EntidadesCostos: 0,
                NombreRubro: this.data.desc,
                monto: 0
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
                tipoDeRubro: ' ',
                entidad: ' ',
                HorasSemanales: 0,
                DuracionEnMeses: 0,
                Descripcion: new FormControl(this.Descripcion, [Validators.required]),
                Justificacion: new FormControl(this.Justificacion, [Validators.required]),
                EntidadesCostos: 0,
                NombreRubro: this.data.desc,
                monto: 0
            });
        }
    }

    private setData(): void {
        this.AddDettalle.controls['DuracionEnMeses'].setValue(this.state.primerPaso.duracion);
    }

    public seleccionarInvestigador(investigador): void {
        console.log(investigador);
        this.investigadorSeleccionado = investigador;
        this.NombreDelInvestigador = `${investigador.nombres} ${investigador.apellido}`;
        this.HorasSemanales = investigador.dedicacion;
        this.AddDettalle.controls['HorasSemanales'].setValue(investigador.dedicacion);
        this.AddDettalle.controls['RolDelInvestigador'].setValue(investigador.rol);
        this.AddDettalle.controls['NombreDelInvestigador'].setValue(this.NombreDelInvestigador);
        this.validateAllFields();
    }

    public cargar(perfil): void {
        const {honorarioId} = perfil;
        this.tablaHonorariosService.getall()
            .pipe(finalize(() => this.validateAllFields()))
            .subscribe(response => {
                this.honorarios = response['honorarios'];
                response['honorarios'].forEach(element => {
                    if (element.honorarioId === honorarioId) {
                        this.Formacion = element.formacion;
                        this.RolDelInvestigador = element.formacion;
                        this.Experiencia = element.experiencia;
                        this.AddDettalle.controls['Experiencia'].setValue(element.experiencia);
                        this.AddDettalle.controls['Formacion'].setValue(element.formacion);
                        this.AddDettalle.controls['RolDelInvestigador'].setValue(element.formacion);
                    }
                });
            });
    }

    public seleccionarTipoDeRubro(tipo): void {
        this.tipoDeRubro = tipo;
    }

    public seleccionarEntidad(entidad): void {
        this.entidad = entidad;
    }

    private updateState(): void {
        this.state = {
            ...this.saveStateService.getState(),
            tercerPaso: {
                ...this.state.tercerPaso,
            }
        };
        this.saveStateService.setState(this.state);
        console.log('zzz2', this.saveStateService.getState());
    }
}

export interface AddDetalleRubroData {
    id: string;
    desc: string;
    cons: number;
    Val: boolean;
}
