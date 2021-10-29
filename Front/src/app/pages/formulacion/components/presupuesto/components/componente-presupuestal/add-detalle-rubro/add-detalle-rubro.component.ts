import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TablaHonorariosComponent } from '../tabla-honorarios/tabla-honorarios.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TablaHonoraiosService } from 'src/app/@core/services/tabla-honorarios/tabla-honoraios.service';

export interface PeriodicElement {
  id: Number,
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddDetalleRubroData,
    public dialog: MatDialog,
    private form: FormBuilder,
    private tablaHonorariosService: TablaHonoraiosService,
  ) { }

  Perfil = [];

  aux = []
  AddDettalles: FormGroup[] = [];
  AddDettalle: FormGroup;
  sisInfo;
  sisNum;
  val = false;
  valButton;
  dataSource = [];
  displayedColumns: string[] = ['Institucion', 'Efectivo', 'Especie'];

  Complet = false;

  PerfilDelInvestigador = " ";
  Formacion = " ";
  Experiencia = " ";
  NombreDelInvestigador = " ";
  RolDelInvestigador = " ";
  HorasSemanales = " ";
  DuracionEnMeses = " ";
  Descripcion = " ";
  Justificacion = " ";
  EntidadesCostos = [];
  modificado;

  numero;
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

  }

  cargar(e){
    this.tablaHonorariosService.getall().subscribe(r => {
      r['honorarios'].forEach(element => {
        if(element.honorarioId == e){
          this.Formacion = element.formacion
          this.Experiencia = element.experiencia
        }
      });;
    })
  }

  builder() {
    if (this.val) {
      this.AddDettalle = this.form.group({
        idRubro: this.data.id,
        PerfilDelInvestigador: new FormControl(this.PerfilDelInvestigador),
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
      })
    } else {
      this.AddDettalle = this.form.group({
        idRubro: this.data.id,
        PerfilDelInvestigador: ' ',
        Formacion: ' ',
        Experiencia: ' ',
        NombreDelInvestigador: ' ',
        RolDelInvestigador: ' ',
        HorasSemanales: ' ',
        DuracionEnMeses: ' ',
        Descripcion: new FormControl(this.Descripcion, [Validators.required]),
        Justificacion: new FormControl(this.Justificacion, [Validators.required]),
        EntidadesCostos: [this.dataSource],
        NombreRubro: this.data.desc
      })
    }
  }

  verTabla() {
    const dialogRef = this.dialog.open(TablaHonorariosComponent, {

    })
  }
  numeroparalasuma() {
    let numero = this.dataSource.length
    for (let i; i < numero; i++) {
      this.numero = i
    }
  }

  cargarParaAC() {
    let auto = JSON.parse(localStorage.getItem("AgregarDetallesRubros"));
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
          this.dataSource = element.EntidadesCostos
        }
      });
    }
  }

  DataS() {

    let auto = JSON.parse(localStorage.getItem("Entidades"));
    let cont = 0;
    this.tablaHonorariosService.getall().subscribe(r => {
      this.Perfil = r['honorarios'];
    })
    auto.forEach(element => {
      let azul = element.Institucion;
      cont = cont + 1;
      let ELEMENT_DATA = {
        id: cont,
        institucion: azul,
        efectivo: 0,
        especie: 0
      }

      this.dataSource.push(ELEMENT_DATA);
    });
  }

  Change(id, Post, e) {
    this.Complet = true;
    this.dataSource.forEach(element => {
      if (id == element.id) {
        if (Post == 1) {
          element.efectivo = e.target.value;
        } else {
          element.especie = e.target.value;
        }
      }
      this.aux.push(element);
    });
    this.dataSource = this.aux;
    this.aux = [];
  }

  valid() {
    if (this.data.desc == 'Personal Cientifico') {
      this.val = true;
    } else {
      this.val = false;
    }
  }

  up() {
    let AgregarDetarresRubros = [];
    let auto = JSON.parse(localStorage.getItem("AgregarDetallesRubros"));
    if (auto == null) {
      AgregarDetarresRubros.push(this.AddDettalle.value)
      localStorage.setItem("AgregarDetallesRubros", JSON.stringify(AgregarDetarresRubros))
    } else {
      auto.forEach(element => {
        AgregarDetarresRubros.push(element);
      });
      AgregarDetarresRubros.push(this.AddDettalle.value);
      localStorage.setItem("AgregarDetallesRubros", JSON.stringify(AgregarDetarresRubros))
    }
  }

  upDate() {
    let AgregarDetarresRubros = [];
    let auto = JSON.parse(localStorage.getItem("AgregarDetallesRubros"));

    auto.forEach(element => {
      if (element.idRubro != this.data.id) {
        AgregarDetarresRubros.push(element);
      } else {
        AgregarDetarresRubros.push(this.AddDettalle.value);
      }
    });
    localStorage.setItem("AgregarDetallesRubros", JSON.stringify(AgregarDetarresRubros))
  }


}

export interface AddDetalleRubroData {
  id: string;
  desc: string;
  cons: number;
  Val: boolean
}
