import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/shared/services/Proyect/project.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: VistaProyectosData,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ProyectosComponent>) { }

  displayedColumns: string[] = ['Titulo', 'Investigador', 'Gestor', 'acciones'];
  dataSource;

  ngOnInit(): void {
    this.getAll(this.data.idConvocatoria);
  }
  getAll(id) {
    this.projectService.getIdConv(id).subscribe(r => {
      // if(localStorage.getItem("Role") == "Investigador"){ 
      //   r['Proyectos'].forEach(element => {
      //     if(r['Proyectos'][0].UserId._id == this.authStorageService.getUserId()){           
      //       this.dataSource = r['Proyectos'];
      //     }
      //   }); 
      // }else{
      this.dataSource = r['Proyectos'];
      // console.log(this.dataSource)
      // }
    })
  }
  cerrardialog() {
    this.dialogRef.close(true);
  }
}

export interface VistaProyectosData {
  idConvocatoria: string;
}