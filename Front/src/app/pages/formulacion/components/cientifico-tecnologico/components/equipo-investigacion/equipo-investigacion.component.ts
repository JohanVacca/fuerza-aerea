import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarPersonaComponent } from './registrar-persona/registrar-persona.component';
import { EquipoInvestigacion } from './registrar-persona/registrar-persona.component'
import { ActivatedRoute, Params } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PeriodicElement {
  Name: string;
  Apellido: string;
  Id: number;
  Grado: string;
  Cargo: string;
  Grupo: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { Id: 1541612, Name: 'Hydrogen', Apellido: "perez", Grado: 'coronel', Cargo: 'empleado', Grupo: "4" },
  { Id: 2458264, Name: 'Helium', Apellido: "cardenas", Grado: 'coronel', Cargo: 'empleado', Grupo: "4" },
  { Id: 3458264, Name: 'Lithium', Apellido: "moreno", Grado: 'coronel', Cargo: 'empleado', Grupo: "4" },
  { Id: 4458264, Name: 'Beryllium', Apellido: "sanchez", Grado: 'coronel', Cargo: 'empleado', Grupo: "4" }
];

@Component({
  selector: 'app-equipo-investigacion',
  templateUrl: './equipo-investigacion.component.html',
  styleUrls: ['../../cientifico-tecnologico.component.scss']
})
export class EquipoInvestigacionComponent implements OnInit {

  Convocatoria;
  displayedColumns: string[] = ['name', 'apellidos', 'id', 'grado', 'cargo', 'grupo', 'acciones'];
  dataSource;
  constructor(public data: MatDialog,
    private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEquipo();
  }


  getEquipo() {
    this.dataSource = JSON.parse(localStorage.getItem('equipoInvestigacion'));

  }
  registrarPersona() {
    let cv = this.rutaActiva.snapshot.params;
    this.Convocatoria = cv.id;
    let datos: EquipoInvestigacion = {
      actualizar: false,
      idCon: this.Convocatoria
    }
    const dialogRef = this.data.open(RegistrarPersonaComponent, {
      data: datos
    })
    dialogRef.afterClosed().subscribe(r => {
      this.getEquipo();
    })
  }
  deletePersona(identificacion) {
    let equipoStorage = JSON.parse(localStorage.getItem('equipoInvestigacion'))
    let equipofiltro = equipoStorage.filter(r => r.identificacion != identificacion)
    localStorage.setItem('equipoInvestigacion', JSON.stringify(equipofiltro))
    this.getEquipo();
  }
  updatePersona(objeto) {
    let cv = this.rutaActiva.snapshot.params;
    this.Convocatoria = cv.id;
    let datos: EquipoInvestigacion = {
      actualizar: true,
      idCon: this.Convocatoria,
      nombres: objeto.nombres,
      apellidos: objeto.apellidos,
      identificacion: objeto.identificacion,
      grado: objeto.grado,
      cargo: objeto.cargo,
      dedicacion: objeto.dedicacion,
      grupos: objeto.grupos,
    }
    const dialogRef = this.data.open(RegistrarPersonaComponent, {
      data: datos,
    })
    dialogRef.afterClosed().subscribe(r => {
      this.getEquipo();
    })
  }
}
