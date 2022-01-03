import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/services/Proyect/project.service';
import {Proyect} from '../../shared/models/project.model';
import {Router} from '@angular/router';
import {VistaFormulacionComponent, VistaFormulacionData} from '../formulacion/components/vista-formulacion/vista-formulacion.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthStorageService} from '../../@core/services';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public TITLE = 'Dashboard';
    public SUBTITLE = 'Listado de proyectos relacionados';
    public PROJECTS = 'Proyectos Activos';
    public NAME = 'NOMBRE';
    public CONVOCATORIA = 'CONVOCATORIA';
    public STATUS = 'ESTADO';
    public DATE = 'FECHA DE CREACIÓN';
    public ACTIONS = 'ACCIONES';
    public NO_PROJECTS = 'No tiene proyectos activos';
    public projectList: Proyect[] = [];
    public isLoading = true;

    private PATH_ROOT = '/pages/seguimientoproject/';

    constructor(
        private router: Router,
        private projectService: ProjectService,
        private authStorageService: AuthStorageService,
        private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.initializeData();
    }

    public goToDetail(id: string): void {
        this.router.navigate([`${this.PATH_ROOT}${id}`]);
    }

    public viewPDF(id: string): void {
        let valor = [];
        let Evaluado;
        this.projectService.getById(id)
            .pipe(finalize(() => {
                this.showModalPDF(id, false, valor, Evaluado);
            }))
            .subscribe(response => {
                response.Proyecto.calificaciones.forEach(element => {
                    if (element.idEv._id === this.authStorageService.getUserId()) {
                        valor = element.Valores;
                        Evaluado = element.Evaluado;
                    }
                });
            });
    }

    private showModalPDF(idProyecto, evaluar, valor, Evaluado): void {
        const data: VistaFormulacionData = {idProyecto, evaluar, valor, Evaluado};
        const dialogRef = this.dialog.open(VistaFormulacionComponent, {data});

        dialogRef.afterClosed().subscribe(response => {
            this.router.navigate(['/pages']);
        });
    }

    private initializeData(): void {
        this.projectService.getAll()
            .pipe(finalize(() => this.isLoading = false))
            .subscribe((response: { Proyectos: Proyect[] }) => {this.projectList = response.Proyectos;});
    }

}
