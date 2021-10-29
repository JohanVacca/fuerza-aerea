import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Objetivo } from '../../../../../../@core/old-models/objetivo';
import { filter } from 'rxjs/operators';

export interface PeriodicElement {
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { descripcion: 'Hydrogen' },
  { descripcion: 'Helium' },
  { descripcion: 'Lithium' },
  { descripcion: 'Beryllium' },
];

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['../../detalles-generales.component.scss']
})
export class ObjetivosComponent implements OnInit {
  objetivoGeneral: string;
  objetivoEspecificos: FormGroup;
  objEspecificoslist = []
  displayedColumns: string[] = ['descripcion', 'acciones'];
  dataSource;



  constructor(public obj: FormBuilder,) { }

  ngOnInit(): void {
    this.builder();
    this.getItem();

  }

  getItem() {
    this.dataSource = JSON.parse(localStorage.getItem('objetivosEspecificos'));
    this.objetivoGeneral = JSON.parse(localStorage.getItem('objetivoGeneral'));
  }
  builder() {
    this.objetivoEspecificos = this.obj.group({
      descr: new FormControl("", [Validators.required]),
    })

  }

  agregarObjGnral() {
    localStorage.setItem('objetivoGeneral', JSON.stringify(this.objetivoGeneral));
  }

  agregarObjEsp() {
    this.objEspecificoslist = JSON.parse(localStorage.getItem('objetivosEspecificos'));
    if (this.objEspecificoslist == null) {
      this.objEspecificoslist = []
      this.objEspecificoslist.push(this.objetivoEspecificos.value)

    } else {
      this.objEspecificoslist.push(this.objetivoEspecificos.value)

    }
    localStorage.setItem('objetivosEspecificos', JSON.stringify(this.objEspecificoslist));
    this.getItem();
    this.builder();
    this.objEspecificoslist = []
  }

  deleteobj(obj) {
    let objetivoStorage = JSON.parse(localStorage.getItem('objetivosEspecificos'));
    let objfilter = objetivoStorage.filter(r => r.objetivoespecifico != obj)
    localStorage.setItem('objetivosEspecificos', JSON.stringify(objfilter));
    this.getItem();
  }
}

