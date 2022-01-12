import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProjectService} from 'src/app/shared/services/Proyect/project.service';

@Component({
    selector: 'app-proyectos',
    templateUrl: './proyectos.component.html',
    styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: VistaProyectosData,
                private projectService: ProjectService,
                public dialogRef: MatDialogRef<ProyectosComponent>) {
    }

    displayedColumns: string[] = ['Titulo', 'Investigador', 'Gestor', 'acciones'];
    dataSource;

    ngOnInit(): void {
        this.getAll(this.data.idConvocatoria);
    }

    getAll(id) {
        this.projectService.getIdConv(id).subscribe(r => {
            this.dataSource = r['Proyectos'];
        });
    }

    cerrardialog() {
        this.dialogRef.close(true);
    }
}

export interface VistaProyectosData {
    idConvocatoria: string;
}
