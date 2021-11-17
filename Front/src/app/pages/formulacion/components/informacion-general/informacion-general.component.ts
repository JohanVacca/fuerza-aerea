import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {InvEndorsersService} from '../../../../shared/services/inv-endorsers/inv-endorsers.service';
import {InvestigationProgramService} from '../../../../shared/services/investigation-program/investigation-program.service';
import {InvestigationSubProgramService} from '../../../../shared/services/investigation-sub-program/investigation-sub-program.service';
import {InvestigationTypesService} from '../../../../shared/services/investigation-types/investigation-types.service';
import {InvestigationLinesService} from '../../../../shared/services/investigation-lines/investigation-lines.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {UsersService} from '../../../../@core/services/users/users.service';

import {ActivatedRoute, Params} from '@angular/router';
import {CommonSimpleModel} from '../../../../shared/models/common-simple.model';
import {UserModel} from '../../../../shared/models/user.model';
import {stringify} from 'querystring';
import {finalize} from 'rxjs/operators';
import {SaveStateService} from '../../../../shared/services/saveStateService/save-state.service';
import {PrimerPaso, StateInterface} from '../../../../shared/services/saveStateService/StateInterface';

@Component({
    selector: 'app-informacion-general',
    templateUrl: './informacion-general.component.html',
    styleUrls: ['../formular-proyecto/formular-proyecto.component.scss']
})
export class InformacionGeneralComponent implements OnInit {

    constructor(
        private invEndorsersService: InvEndorsersService,
        private investigationLinesService: InvestigationLinesService,
        private investigationProgramService: InvestigationProgramService,
        private investigationSubProgramService: InvestigationSubProgramService,
        private investigationTypesService: InvestigationTypesService,
        private rutaActiva: ActivatedRoute,
        private usersService: UsersService,
        private saveStateService: SaveStateService,
        private form: FormBuilder,
    ) {
    }

    LinesIns: CommonSimpleModel[] = [];
    ProgamIns: CommonSimpleModel[] = [];
    typeIns: CommonSimpleModel[] = [];
    ProgamSubIns: CommonSimpleModel[] = [];
    EndorIns: CommonSimpleModel[] = [];
    ComandIns: UserModel[] = [];
    validador = true;
    UserIns = ' ';
    Convocatoria: string;
    iniciarProyecto: FormGroup;
    hasErrorACTI = false;
    messageErrorACTI = 'No se encuentra un usuario con el email ingresado';
    isLoadingEmail = false;
    private state: StateInterface;

    @Output()
    textoCambiado: EventEmitter<string> = new EventEmitter<string>();

    public email = new FormControl('', [Validators.required, Validators.email]);

    ngOnInit(): void {
        this.initializeData();
        this.getAll();
        this.builder();
    }

    getErrorMessage() {
        if (!this.validador) {
            return 'No es un email valido';
        }

        return this.email.hasError('email') ? 'Not a valid email' : '';
    }

    builder() {
        let storage = JSON.parse(localStorage.getItem('iniciarProyecto'));
        if (storage == null) {
            this.iniciarProyecto = this.form.group({
                nombreProyecto: new FormControl('', [Validators.required,]),
                dependencia: new FormControl('', [Validators.required,]),
                email: new FormControl('', [Validators.required, Validators.email]),
                telefonoGestor: new FormControl('', [Validators.required,]),
                gestor: new FormControl('', [Validators.required,]),
                comandante: new FormControl('', [Validators.required,]),
                lugar: new FormControl('', [Validators.required,]),
                duracion: new FormControl('', [Validators.required,]),
                linea: new FormControl('', [Validators.required,]),
                modelo: new FormControl('', [Validators.required,]),
                programa: new FormControl('', [Validators.required,]),
                subprograma: new FormControl('', [Validators.required,]),
                avala: new FormControl('', [Validators.required,]),
            });
        } else {
            this.iniciarProyecto = this.form.group({
                nombreProyecto: new FormControl(storage.nombreProyecto, [Validators.required,]),
                dependencia: new FormControl(storage.dependencia, [Validators.required,]),
                email: new FormControl(storage.email, [Validators.required, Validators.email]),
                telefonoGestor: new FormControl(storage.telefonoGestor, [Validators.required,]),
                gestor: new FormControl(''),
                comandante: new FormControl(storage.comandante),
                lugar: new FormControl(storage.lugar),
                duracion: new FormControl(storage.duracion),
                linea: new FormControl(storage.linea),
                modelo: new FormControl(storage.modelo),
                programa: new FormControl(storage.programa),
                subprograma: new FormControl(storage.subprograma),
                avala: new FormControl(storage.avala),
            });
            this.UserIns = storage.gestor;
        }
    }

    guardar() {
        const datainiciar = this.iniciarProyecto.value;
        this.updateState();
        localStorage.setItem('iniciarProyecto', JSON.stringify(datainiciar));
    }

    CambiaTexto(texto: string) {
        this.textoCambiado.emit(texto);
    }

    getAll() {
        let cv = this.rutaActiva.snapshot.params;
        this.Convocatoria = cv.id;
        this.investigationProgramService.getIdConv(this.Convocatoria).subscribe(r => {
            this.ProgamIns = r;
        });
        this.investigationSubProgramService.getIdConv(this.Convocatoria).subscribe(r => {
            this.ProgamSubIns = r;
        });
        this.investigationTypesService.getIdConv(this.Convocatoria).subscribe(r => {
            this.typeIns = r;
        });
        this.investigationLinesService.getIdConv(this.Convocatoria).subscribe(r => {
            this.LinesIns = r;
        });
        this.usersService.getAllCommanders().subscribe(r => {
            this.ComandIns = r;
        });
        this.invEndorsersService.getIdConv(this.Convocatoria).subscribe(r => {
            this.EndorIns = r;
        });
    }

    Correo(e) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const correo = e.target.value.toLowerCase();
        if (regex.test(correo)) {
            this.isLoadingEmail = true;
            this.usersService.getUserCorreo(correo)
                .pipe(finalize(() => this.isLoadingEmail = false))
                .subscribe(response => {
                    if (response.length !== 0) {
                        this.UserIns = `${response[0].profile.names} ${response[0].profile.surname}`;
                        this.validador = true;
                        this.hasErrorACTI = false;
                    } else {
                        this.email.setErrors({'incorrect': true});
                        this.hasErrorACTI = true;
                        this.validador = false;
                    }
                });
        } else {
            this.validador = false;
        }
    }

    private initializeData(): void {
        this.state = this.saveStateService.getState() ? this.saveStateService.getState() : {};
    }

    private updateState(): void {
        const {avala, comandante, dependencia, duracion, email, gestor, linea,
            lugar, modelo, nombreProyecto, programa, subprograma, telefonoGestor} = this.iniciarProyecto.value;
        const primerPaso: PrimerPaso = {
            nombreProyecto,
            unidadDependencia: dependencia,
            correoGestor: email,
            telefonoGestor,
            nombreGestor: gestor,
            comandante,
            lugarDeEjecucion: lugar,
            duracionEnMeses: duracion,
            lineaDeInvestigacion: linea,
            modeloDeInvestigacion: modelo,
            programaDeInvestigacion: programa,
            subProgramaDeInvestigacion: subprograma,
            quienAvalaInvestigacion: avala,
        };
        this.state = {
            ...this.saveStateService.getState(),
            primerPaso
        };
        this.saveStateService.setState({primerPaso: this.state.primerPaso});
        console.log('this.state::', this.state);
        console.log('this.saveStateService.getState()', this.saveStateService.getState());
    }
}
