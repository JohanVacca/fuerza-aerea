import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupCategoryService } from '../../../../../../../shared/services/group-category/group-category.service'
import { CommonSimpleModel } from '../../../../../../../shared/models/common-simple.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-grupo',
  templateUrl: './registrar-grupo.component.html',
  styleUrls: ['../../../cientifico-tecnologico.component.scss']
})
export class RegistrarGrupoComponent implements OnInit {

  groupCats: CommonSimpleModel[] = [];
  Convocatoria: string;
  registroGrupo: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: RegistrarGrupoData,
    private groupCategoryService: GroupCategoryService,
    public form: FormBuilder,
    public dialogRef: MatDialogRef<RegistrarGrupoComponent>
  ) { }

  ngOnInit(): void {
    this.builder();
    this.getAll();
    this.Convocatoria = this.data.idCon;

  }
  builder() {

    if (this.data.actualizar) {
      this.registroGrupo = this.form.group({
        nombreGrupo: new FormControl(this.data.nombreGrupo, [Validators.required]),
        codigo: new FormControl(this.data.codigoGrupo, [Validators.required]),
        categoria: new FormControl(this.data.categoria, [Validators.required]),
        antiguedad: new FormControl(this.data.antiguedad, [Validators.required]),
        entidad: new FormControl(this.data.entidad, [Validators.required])
      })
    } else {
      this.registroGrupo = this.form.group({
        nombreGrupo: new FormControl('', [Validators.required]),
        codigo: new FormControl('', [Validators.required]),
        categoria: new FormControl('', [Validators.required]),
        antiguedad: new FormControl('', [Validators.required]),
        entidad: new FormControl('', [Validators.required])
      })
    }
  }
  updateGrupo() {
    let storagelist = JSON.parse(localStorage.getItem('grupos'))
    let filtrogrupo = storagelist.filter(r => r.nombreGrupo != this.data.nombreGrupo)
    filtrogrupo.push(this.registroGrupo.value)

    localStorage.setItem('grupos', JSON.stringify(filtrogrupo));
    this.dialogRef.close(true);
  }
  getAll() {
    this.groupCategoryService.getIdConv(this.data.idCon).subscribe(r => {
      this.groupCats = r;
    });
  }
  guardarGrupo() {
    let listGroup = JSON.parse(localStorage.getItem('grupos'));
    if (listGroup == null) {
      listGroup = []
      listGroup.push(this.registroGrupo.value);
    } else {
      listGroup.push(this.registroGrupo.value);
    }
    localStorage.setItem('grupos', JSON.stringify(listGroup));
    listGroup = []
    this.dialogRef.close(true);
  }

}
export interface RegistrarGrupoData {
  actualizar: boolean
  idCon?: string
  nombreGrupo?: string
  codigoGrupo?: number
  categoria?: string
  antiguedad?: number
  entidad?: string
}
