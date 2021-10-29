import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/services/Proyect/project.service';
import { Router } from '@angular/router';
import { VistaFormulacionComponent, VistaFormulacionData } from '../formulacion/components//vista-formulacion/vista-formulacion.component';
import { MatDialog } from '@angular/material/dialog';
import { ConvocatoryService } from '../admin/convocatory/services/convocatory.service';
import { VistaProyectosComponent, VistaProyectosData } from './components/vista-proyectos/vista-proyectos.component';


@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})
export class EvaluacionComponent implements OnInit {


  Rol;
  objetos;
  dataSource2;
  displayedColumns: string[] = ['Titulo', 'Puntaje', 'HabilitarSeg',  'acciones'];

  constructor(private projectService:ProjectService,
              private router: Router,
              public dialog: MatDialog,
              private convocatoryService: ConvocatoryService) 
  { }


  VistaPrevia(IDProyec, Value){

    this.projectService.getById(IDProyec).subscribe(r => {
      let idProject = r.Proyecto._id;
      let datos: VistaFormulacionData = {
        idProyecto: idProject,
        evaluar:Value
      }
      const dialogRef = this.dialog.open(VistaFormulacionComponent, {
        data: datos
      })
    })
  }

  ngOnInit(): void {

    this.getAllConv();
  }

  temp = [];
  displayedColumns1: string[] = ['name', 'Descripcion', 'acciones'];
  dataSource1;

  getAllConv() {
    this.convocatoryService.getall()
      .subscribe((convocatorias) => {
        this.filtro(convocatorias);
      });
  }

  filtro(convocatorias) {
    let convocatoriasfiltro = convocatorias.filter(r => { return r.isActive === true });
    this.temp = convocatoriasfiltro;
    this.dataSource1 = this.temp;
  }
  view(id) {
    let datos: VistaProyectosData = {
      idC:id,
    }
    const dialogRef = this.dialog.open(VistaProyectosComponent, {
      data: datos
    })
    dialogRef.afterClosed().subscribe(r => {
        
    })
  }

}
