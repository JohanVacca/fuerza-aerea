import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvTeamPersonPositionService } from '../../../../../../../shared/services/inv-team-person-position/inv-team-person-position.service'
import { CommonSimpleModel } from '../../../../../../../shared/models/common-simple.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { identifierName } from '@angular/compiler';

let ELEMENT_DATA = {
  nombreGrupo: "Sin Grupo"
}

@Component({
  selector: 'app-registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrls: ['../../../cientifico-tecnologico.component.scss']
})
export class RegistrarPersonaComponent implements OnInit {

  SinGrup: CommonSimpleModel;
  PersonPosis: CommonSimpleModel[] = [];
  Grupos = [];
  registroPersona: FormGroup;
  cargo = []
  dedicacion: string
  vlrgrupo: string


  constructor(@Inject(MAT_DIALOG_DATA) public data: EquipoInvestigacion,
    private invTeamPersonPositionService: InvTeamPersonPositionService,
    public form: FormBuilder,
    public dialogRef: MatDialogRef<RegistrarPersonaComponent>) { }

  ngOnInit(): void {
    this.builder();
    this.getAll();
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
      })
    } else {
      this.registroPersona = this.form.group({
        nombres: new FormControl(this.data.nombres, [Validators.required]),
        apellidos: new FormControl(this.data.apellidos, [Validators.required]),
        identificacion: new FormControl(this.data.identificacion, [Validators.required]),
        grado: new FormControl(this.data.grado, [Validators.required]),
        cargo: new FormControl('', [Validators.required]),
        dedicacion: new FormControl(this.data.dedicacion, [Validators.required]),
        grupos: new FormControl('', [Validators.required]),
      })
      this.cargo = this.data.cargo;

      // para implementar se debe cambiar el array por el dato para obtener
      // this.vlrgrupo = this.data.grupos;
    }

  }

  getAll() {
    let val = false;
    this.invTeamPersonPositionService.getIdConv(this.data.idCon).subscribe(r => {
      this.PersonPosis = r;
    });
    let auto = JSON.parse(localStorage.getItem("grupos"));
    if (auto == null) {
      this.Grupos.push(ELEMENT_DATA);
    } else {
      auto.forEach(element => {
        if (auto.nombreGrupo == "Sin Grupo") {
          val = true;
        }
        this.Grupos.push(element);
      });
      if (!val) {
        this.Grupos.push(ELEMENT_DATA);
      }
    }
  }
  guardarPersona() {
    let equipoInvestigacion = JSON.parse(localStorage.getItem('equipoInvestigacion'));
    if (equipoInvestigacion == null) {
      equipoInvestigacion = []
      equipoInvestigacion.push(this.registroPersona.value)
    } else {
      equipoInvestigacion.push(this.registroPersona.value)
    }
    localStorage.setItem('equipoInvestigacion', JSON.stringify(equipoInvestigacion))
    equipoInvestigacion = []
    this.dialogRef.close(true);
  }
  updatePersona() {
    let storagelist = JSON.parse(localStorage.getItem('equipoInvestigacion'))
    let filtroEquipo = storagelist.filter(r => r.identificacion != this.data.identificacion)
    filtroEquipo.push(this.registroPersona.value)
    localStorage.setItem('equipoInvestigacion', JSON.stringify(filtroEquipo));
    this.dialogRef.close(true);
  }

}
export interface EquipoInvestigacion {
  actualizar?: boolean
  idCon: string
  nombres?: string,
  apellidos?: string,
  identificacion?: number,
  grado?: [],
  cargo?: [],
  dedicacion?: number,
  grupos?: string,
}




