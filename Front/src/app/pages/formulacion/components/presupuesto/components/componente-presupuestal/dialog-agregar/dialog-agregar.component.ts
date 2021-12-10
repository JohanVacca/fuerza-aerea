import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SaveStateService} from '../../../../../../../shared/services/saveStateService/save-state.service';
import {Entidad, StateInterface} from '../../../../../../../shared/services/saveStateService/StateInterface';


@Component({
    selector: 'app-dialog-agregar',
    templateUrl: './dialog-agregar.component.html',
    styleUrls: ['./dialog-agregar.component.scss']
})
export class DialogAgregarComponent implements OnInit {

    Entidad: FormGroup;
    EntidadLis = [];
    valid;

    private state: StateInterface;
    private entidades: Entidad[] = [];

    constructor(public dialog: MatDialog,
                private form: FormBuilder,
                private saveStateService: SaveStateService,
                public dialogRef: MatDialogRef<DialogAgregarComponent>) {
    }

    ngOnInit(): void {
        this.builder();
        const state = this.saveStateService.getState();
        if (state?.tercerPaso) {
            this.state = state;
            this.entidades = this.state?.tercerPaso?.componentePresupuestal?.entidades
                ? this.state?.tercerPaso?.componentePresupuestal?.entidades
                : [];
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
    }

    Register() {
        let storage = JSON.parse(localStorage.getItem('Entidades'));
        if (this.Entidad.value.correo === this.Entidad.value.correo2) {
            const nuevaEntidad: Entidad = {
                nombre: this.Entidad.value.Institucion,
                nit: this.Entidad.value.Nit,
                personaACargo: this.Entidad.value.Persona,
                numeroDeContacto: this.Entidad.value.numero,
                email: this.Entidad.value.correo
            };
            this.entidades.push(nuevaEntidad);
            this.updateState();

            var objEnt = {
                Institucion: this.Entidad.value.Institucion,
                Nit: this.Entidad.value.Nit,
                Persona: this.Entidad.value.Persona,
                numero: this.Entidad.value.numero,
                correo: this.Entidad.value.correo
            };
            this.EntidadLis.push(this.Entidad.value);
            if (storage == null) {
                localStorage.setItem('Entidades', JSON.stringify(this.EntidadLis));
            } else {
                storage.forEach(element => {
                    this.EntidadLis.push(element);
                });
                localStorage.setItem('Entidades', JSON.stringify(this.EntidadLis));
            }
            this.dialogRef.close(true);
        } else {
            this.valid = true;
        }
    }

    builder() {
        this.Entidad = this.form.group({
            Institucion: new FormControl('', [Validators.required]),
            Nit: new FormControl('', [Validators.required]),
            Persona: new FormControl('', [Validators.required]),
            numero: new FormControl('', [Validators.required]),
            correo: new FormControl('', [Validators.required, Validators.email]),
            correo2: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    CloseAlert() {
        this.valid = false;
    }

    private updateState(): void {
        this.state.tercerPaso.componentePresupuestal.entidades = this.entidades;
        this.saveStateService.setState(this.state);
        console.log('ENTIDADES ESTADO ;;', this.state);
    }
}

// export interface DialogAgregarData {

// }
