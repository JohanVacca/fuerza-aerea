import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarGrupoComponent } from './registrar-grupo/registrar-grupo.component';
import { RegistrarGrupoData } from './registrar-grupo/registrar-grupo.component';
import { ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['../../cientifico-tecnologico.component.scss']

})
export class GruposComponent implements OnInit {

  Convocatoria: string;
  constructor(public dialog: MatDialog,
    private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.getGrupo();
  }
  displayedColumns: string[] = ['name', 'codigo', 'antiguedad', 'entidad', 'acciones'];
  dataSource;


  getGrupo() {
    this.dataSource = JSON.parse(localStorage.getItem('grupos'))
  }
  registrarGrupo() {
    let cv = this.rutaActiva.snapshot.params;
    this.Convocatoria = cv.id;
    let datos: RegistrarGrupoData = {
      actualizar: false,
      idCon: this.Convocatoria
    }
    const dialogRef = this.dialog.open(RegistrarGrupoComponent, {
      data: datos
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getGrupo();
    })
  }
  updateGrupo(objeto) {
    let cv = this.rutaActiva.snapshot.params;
    this.Convocatoria = cv.id;
    let datos: RegistrarGrupoData = {
      actualizar: true,
      idCon: this.Convocatoria,
      nombreGrupo: objeto.nombreGrupo,
      codigoGrupo: objeto.codigo,
      categoria: objeto.categoria.descr,
      antiguedad: objeto.antiguedad,
      entidad: objeto.entidad,
    }
    const dialogRef = this.dialog.open(RegistrarGrupoComponent, {
      data: datos
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getGrupo();
    })
  }
  deleteGrupo(grupo) {
    let grupoStorage = JSON.parse(localStorage.getItem('grupos'))
    let filtroGrupos = grupoStorage.filter(r => r.nombreGrupo != grupo)
    localStorage.setItem('grupos', JSON.stringify(filtroGrupos));
    this.getGrupo();
  }

}
