import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InvTeamPersonPositionService} from '../../../../../../../shared/services/inv-team-person-position/inv-team-person-position.service';
import {CommonSimpleModel} from '../../../../../../../shared/models/common-simple.model';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {identifierName} from '@angular/compiler';
import {UsersService} from '../../../../../../../@core/services/users/users.service';
import {SaveStateService} from '../../../../../../../shared/services/saveStateService/save-state.service';
import {Grupo, StateInterface} from '../../../../../../../shared/services/saveStateService/StateInterface';

let ELEMENT_DATA = {
    nombreGrupo: 'Sin Grupo'
};

@Component({
    selector: 'app-registrar-persona',
    templateUrl: './registrar-persona.component.html',
    styleUrls: ['../../../cientifico-tecnologico.component.scss']
})
export class RegistrarPersonaComponent implements OnInit {

    public SinGrup: CommonSimpleModel;
    public RolFuncion: CommonSimpleModel[] = [];
    public Grupos = [];
    public registroPersona: FormGroup;
    public cargo = [];
    public dedicacion: string;
    public vlrgrupo: string;
    public investigators = [];
    public investigatorsNames = [];
    public grupos: Grupo[];

    private state: StateInterface;
    private selectedInvestigator;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: EquipoInvestigacion,
        private invTeamPersonPositionService: InvTeamPersonPositionService,
        public form: FormBuilder,
        private usersService: UsersService,
        private saveStateService: SaveStateService,
        public dialogRef: MatDialogRef<RegistrarPersonaComponent>) {
    }

    ngOnInit(): void {
        this.state = this.saveStateService.getState();
        this.builder();
        this.getAll();
        this.getAllInvestigators();
        this.getGroups();
    }

    builder() {
        if (this.data.actualizar == false) {
            this.registroPersona = this.form.group({
                nombres: new FormControl('', [Validators.required]),
                apellido: new FormControl('', [Validators.required]),
                identificacion: new FormControl('', [Validators.required]),
                grado: new FormControl('', [Validators.required]),
                cargo: new FormControl('', [Validators.required]),
                dedicacion: new FormControl('', [Validators.required]),
                grupos: new FormControl('', [Validators.required]),
            });
        } else {
            this.registroPersona = this.form.group({
                nombres: new FormControl(this.data.nombres, [Validators.required]),
                apellidos: new FormControl(this.data.apellidos, [Validators.required]),
                identificacion: new FormControl(this.data.identificacion, [Validators.required]),
                grado: new FormControl(this.data.grado, [Validators.required]),
                cargo: new FormControl('', [Validators.required]),
                dedicacion: new FormControl(this.data.dedicacion, [Validators.required]),
                grupos: new FormControl('', [Validators.required]),
            });
            this.cargo = this.data.cargo;
        }
    }

    getAll() {
        let val = false;
        let showPrincipal = true;
        if (this.state?.segundoPaso?.equipoDeInvestigacion) {
            const hasPrincipal = this.state.segundoPaso.equipoDeInvestigacion
                .filter(investigador => investigador.cargo === 'Investigador principal');
            showPrincipal = hasPrincipal.length === 0;
        }
        this.invTeamPersonPositionService.getIdConv(this.data.idCon)
            .subscribe(response => {
                this.RolFuncion = showPrincipal ? response : response.filter(role => role.descr !== 'Investigador principal');
            });
        let auto = JSON.parse(localStorage.getItem('grupos'));
        if (auto == null) {
            this.Grupos.push(ELEMENT_DATA);
        } else {
            auto.forEach(element => {
                if (auto.nombreGrupo === 'Sin Grupo') {
                    val = true;
                }
                this.Grupos.push(element);
            });
            if (!val) {
                this.Grupos.push(ELEMENT_DATA);
            }
        }
    }

    public guardarPersona(): void {
        const {apellido, cargo, dedicacion, grado, grupos, identificacion, nombres} = this.registroPersona.value;
        const investigadorId = this.getInvestigatorId(`${nombres} ${apellido}`);
        this.state.segundoPaso.equipoDeInvestigacion.push({
            investigador: '',
            nombres,
            apellido,
            identificacion,
            grado,
            cargo,
            dedicacion,
            grupos,
            investigadorId
        });
        this.updateState();
        let equipoInvestigacion = JSON.parse(localStorage.getItem('equipoInvestigacion'));
        if (equipoInvestigacion == null) {
            equipoInvestigacion = [];
            equipoInvestigacion.push(this.registroPersona.value);
        } else {
            equipoInvestigacion.push(this.registroPersona.value);
        }
        localStorage.setItem('equipoInvestigacion', JSON.stringify(equipoInvestigacion));
        equipoInvestigacion = [];
        this.dialogRef.close(true);
    }

    private getInvestigatorId(name): string {
        return this.investigators.find(investigador => `${investigador.profile.names} ${investigador.profile.surname}` === name)._id;
    }

    updatePersona(): void {
        const storagelist = JSON.parse(localStorage.getItem('equipoInvestigacion'));
        const filtroEquipo = storagelist.filter(r => r.identificacion !== this.data.identificacion);
        filtroEquipo.push(this.registroPersona.value);
        localStorage.setItem('equipoInvestigacion', JSON.stringify(filtroEquipo));
        this.dialogRef.close(true);
    }

    getAllInvestigators(): void {
        this.usersService.getAllInvestigators()
            .subscribe(response => {
                this.investigators = response;
                this.investigatorsNames = response
                    .map(investigator => `${investigator.profile.names} ${investigator.profile.surname}`);
            });
    }

    private getGroups(): void {
        this.grupos = this.state.segundoPaso.listaDeGrupos;
    }

    private updateState(): void {
        this.state = {
            ...this.saveStateService.getState(),
            segundoPaso: this.state.segundoPaso
        };
        this.saveStateService.setState(this.state);
    }

    public seleccionarInvestigador(event): void {
        const selectedInvestigator = this.investigators
            .find(investigator => `${investigator.profile.names} ${investigator.profile.surname}` === event);
        this.selectedInvestigator = selectedInvestigator;
        this.registroPersona.controls.nombres.setValue(selectedInvestigator.profile.names);
        this.registroPersona.controls.apellido.setValue(selectedInvestigator.profile.surname);
        this.registroPersona.controls.identificacion.setValue(selectedInvestigator.identification);
    }
}

export interface EquipoInvestigacion {
    actualizar?: boolean;
    idCon: string;
    nombres?: string;
    apellidos?: string;
    identificacion?: number;
    grado?: [];
    cargo?: [];
    dedicacion?: number;
    grupos?: string;
}




