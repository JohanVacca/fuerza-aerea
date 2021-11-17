import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddDetalleRubroComponent, AddDetalleRubroData} from './add-detalle-rubro/add-detalle-rubro.component';
import {DetalleRubroComponent, DetalleRubroData} from './detalle-rubro/detalle-rubro.component';
import {DialogAgregarComponent} from './dialog-agregar/dialog-agregar.component';
import {ProjectEntryService} from '../../../../../../shared/services/project-entry/project-entry.service';
import {CommonSimpleModel} from '../../../../../../shared/models/common-simple.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {StateInterface} from '../../../../../../shared/services/saveStateService/StateInterface';
import {SaveStateService} from '../../../../../../shared/services/saveStateService/save-state.service';

export interface PeriodicElement {
  TipoProducto: string;
  Rubro: string;
  Descripcion: string;
  Fuerza: number;
  Otro: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { TipoProducto: '1541612', Rubro: 'Hydrogen', Descripcion: "perez", Fuerza: 4, Otro: 5 },
  { TipoProducto: '2458264', Rubro: 'Helium', Descripcion: "cardenas", Fuerza: 4, Otro: 5 },
  { TipoProducto: '3458264', Rubro: 'Lithium', Descripcion: "moreno", Fuerza: 4, Otro: 5 },
  { TipoProducto: '4458264', Rubro: 'Beryllium', Descripcion: "sanchez", Fuerza: 4, Otro: 5 }
];
@Component({
  selector: 'app-componente-presupuestal',
  templateUrl: './componente-presupuestal.component.html',
  styleUrls: ['../../presupuesto.component.scss']
})
export class ComponentePresupuestalComponent implements OnInit {

  dataSourceRubro = [];

  // dataSourceRubro = ELEMENT_DATA;
  displayedColumnsRubro: string[] = ["NombreRubro",'Descripcion','rubros'];

  dataSource = JSON.parse(localStorage.getItem("Entidades"));
  rubro: CommonSimpleModel[] = [];
  Convocatoria: string;
  iniciarProyecto: FormGroup;
  rub;
  entid = [];
  acti;
  displayedColumns: string[] = ['Institucion', 'NIT', 'Persona', 'acciones'];
  subtotales = [];
  Total = 0;

  private state: StateInterface;

  constructor(
      public dialog: MatDialog,
      private projectEntryService: ProjectEntryService,
      private rutaActiva: ActivatedRoute,
      private saveStateService: SaveStateService,
      private form: FormBuilder) { }

  ngOnInit(): void {
    this.getAll();
    this.initializeData();
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
  }

  deleteEntidades(Nit) {
    const EntidadesList = [];
    let auto = JSON.parse(localStorage.getItem("Entidades"));
    auto.forEach(element => {
      if (element.Nit != Nit) {
        EntidadesList.push(element);
      }
    });
    localStorage.setItem("Entidades", JSON.stringify(EntidadesList));
    this.dataSource = JSON.parse(localStorage.getItem("Entidades"));
  }

  deleteRubroDet(idRubro): void {
    const personalCientifico = this.state.tercerPaso.componentePresupuestal.personalCientifico;
    this.state.tercerPaso.componentePresupuestal.personalCientifico =
        [...personalCientifico.filter(personal => personal.idRubro !== idRubro)];
    this.dataSourceRubro = this.state.tercerPaso.componentePresupuestal.personalCientifico;
    this.updateState();
    this.ContarGeneral();
  }

  Activar(){
    this.acti = true;
  }

  builder() {
    this.iniciarProyecto = this.form.group({
      rubro: new FormControl('',[Validators.required]),
    });
  }

  agregarEntidad() {
    const dialogRef = this.dialog.open(DialogAgregarComponent, {

    })
    dialogRef.afterClosed().subscribe(r => {
      this.dataSource = JSON.parse(localStorage.getItem("Entidades"));
      this.getAll();
      this.ContarGeneral();
    })
  }

  addDetalleRubro() {
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
    dialogref.afterClosed().subscribe( res => {
      this.getAll();
      this.updateDataSource();
      this.ContarGeneral();
    });
  }

  private updateDataSource(): void {
    this.state = this.saveStateService.getState();
    this.dataSourceRubro =
    this.state.tercerPaso?.componentePresupuestal?.personalCientifico ?
    this.state.tercerPaso?.componentePresupuestal?.personalCientifico : [];
  }

  ContarGeneral(){
    this.subtotales.forEach(element => {
      element.efectivo = 0;
      element.especie = 0;
    });
    this.Total = 0;
    let aux = 0;
    if (this.dataSourceRubro != null) {
      this.dataSourceRubro.forEach(element => {
        element.EntidadesCostos.forEach(Ent => {
          this.subtotales[aux].efectivo = parseInt(this.subtotales[aux].efectivo) + parseInt(Ent.efectivo);
          this.subtotales[aux].especie = parseInt(this.subtotales[aux].especie) + parseInt(Ent.especie);
          this.Total = this.Total + parseInt(Ent.efectivo) + parseInt(Ent.especie);
          aux = aux + 1;
        });
        aux = 0;
      });
    }
  }

  Edit(idR){
    let id;
    let desc;
    let cons;
    let num = 0;
    this.rubro.forEach(element => {
      num = num + 1;
      if (element._id == idR) {
        id = element._id;
        desc = element.descr;
        cons = num;
      }
    });
    let datos: AddDetalleRubroData = {
      id: id,
      desc: desc,
      cons: cons,
      Val: true
    };

    const dialogref = this.dialog.open(AddDetalleRubroComponent, {
      data: datos
    });
    dialogref.afterClosed().subscribe( res => {
      this.getAll();
      this.updateDataSource();
      // this.dataSourceRubro = JSON.parse(localStorage.getItem("AgregarDetallesRubros"))
    });
  }

  getAll() {
    let cv = this.rutaActiva.snapshot.params;
    this.Convocatoria = cv.id;
    let entidadesAux = [];
    let subTotalAux = [];
    this.rubro = [];
    this.projectEntryService.getIdConv("123456789876543212345678").subscribe(r => {
      r.forEach(element => {
        this.rubro.push(element);
      });
    });

    this.projectEntryService.getIdConv(this.Convocatoria).subscribe(r => {
      r.forEach(element => {
        this.rubro.push(element);
      });
    });
    if(this.dataSource != null){
      this.dataSource.forEach(element => {
        entidadesAux.push(element.Institucion);
        let Objet = {
          efectivo: 0,
          especie: 0
        };
        subTotalAux.push(Objet);
      });
    }
    this.entid = entidadesAux;
    this.subtotales = subTotalAux;
    this.ContarGeneral();
  }

  Mostrar(idRubro){
    let datos: DetalleRubroData = {
      id: idRubro
    };

    const dialogref = this.dialog.open(DetalleRubroComponent, {
      data: datos
    });

    dialogref.afterClosed().subscribe( res => {
    });
  }

  private updateState(): void {
    this.saveStateService.setState(this.state);
  }
}
