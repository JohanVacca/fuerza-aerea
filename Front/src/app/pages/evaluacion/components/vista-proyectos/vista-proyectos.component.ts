import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ProjectService} from 'src/app/shared/services/Proyect/project.service';
import {
    VistaFormulacionComponent,
    VistaFormulacionData
} from '../../../formulacion/components/vista-formulacion/vista-formulacion.component';
import {AuthStorageService} from '../../../../@core/services/storage/auth-storage/auth-storage.service';
import {ConfirmDialogComponent, ConfirmacionDialogData} from '../../../admin/Dialog/confirm-dialog/confirm-dialog.component';
import {SucessDialogComponent, SucessDialogData} from '../../../admin/Dialog/sucess-dialog/sucess-dialog.component';
import {VerFormulariosComponent, VerFormulariosData} from './ver-formularios/ver-formularios.component';

@Component({
    selector: 'app-vista-proyectos',
    templateUrl: './vista-proyectos.component.html',
    styleUrls: ['./vista-proyectos.component.scss']
})
export class VistaProyectosComponent implements OnInit {
    Rol;
    objetos;
    Bloqueo;
    loading = false;

    displayedColumns: string[] = ['Titulo', 'Puntaje', 'HabilitarSeg', 'HabilitarEdicion', 'acciones'];
    dataSource;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: VistaProyectosData,
        private projectService: ProjectService,
        private router: Router,
        public dialogo: MatDialog,
        private authStorageService: AuthStorageService,
        public dialogRef: MatDialogRef<VistaProyectosComponent>,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.getAll(this.data.idC);
        this.Rol = this.tipoDeEvaluacion(localStorage.getItem('Role'));
    }

    upDate(e, Convocatoria) {
        this.loading = true;
        this.projectService.getById(e).subscribe(r => {
            this.objetos = r['Proyecto'];
            if (this.objetos.ProyectoBloqueado) {
                localStorage.setItem('objetivosEspecificos', JSON.stringify(this.objetos.objetivosEspecificos));
                localStorage.setItem('Entidades', JSON.stringify(this.objetos.Entidades));
                localStorage.setItem('equipoInvestigacion', JSON.stringify(this.objetos.EquipoInvestigaciones));
                localStorage.setItem('AgregarDetallesRubros', JSON.stringify(this.objetos.AgregarDetallesRubros));
                localStorage.setItem('resultadosPrevios', this.objetos.resultadosPrevios);
                localStorage.setItem('iniciarProyecto', JSON.stringify(this.objetos.iniciarProyecto[0]));
                localStorage.setItem('metodologia', this.objetos.metodologia);
                localStorage.setItem('marcoConceptual', this.objetos.marcoConceptual);
                localStorage.setItem('resumen', this.objetos.resumen);
                localStorage.setItem('informacion', JSON.stringify(this.objetos.informaciones[0]));
                localStorage.setItem('estadoArte', this.objetos.estadoArte);
                localStorage.setItem('bibliografia', JSON.stringify(this.objetos.bibliografias));
                localStorage.setItem('palabraClaves', JSON.stringify(this.objetos.palabraClaves));
                localStorage.setItem('resultadosEsperados', this.objetos.resultadosEsperados);
                localStorage.setItem('objetivoGeneral', JSON.stringify(this.objetos.objetivoGeneral));
                localStorage.setItem('productosEsperados', JSON.stringify(this.objetos.productosEsperados));
                localStorage.setItem('grupos', JSON.stringify(this.objetos.grupos));
                localStorage.setItem('IdProyec', this.objetos._id);
                this.router.navigate([`pages/formulacion/formular/${Convocatoria._id}`]);
                this.dialogRef.close(true);
            } else {
                this.loading = false;
                this.Bloqueo = true;
            }

        });
    }

    CloseAlert() {
        this.Bloqueo = false;
    }

    tipoDeEvaluacion(localStorage) {
        if (localStorage === 'Investigador') {
            this.displayedColumns = ['Titulo', 'Puntaje', 'acciones'];
            return true;
        } else {
            return false;
        }
    }

    Delete(e) {
        this.projectService.delete(e).subscribe(r => {

        });
        this.getAll(this.data.idC);
    }

    getAll(id) {
        this.projectService.getIdConv(id).subscribe(r => {
            if (localStorage.getItem('Role') == 'Investigador') {
                r['Proyectos'].forEach(element => {
                    if (r['Proyectos'][0].UserId._id == this.authStorageService.getUserId()) {
                        this.dataSource = r['Proyectos'];
                    }
                });
            } else {
                this.dataSource = r['Proyectos'];
            }
        });
    }


    verForMu(IdFor) {
        let datos: VerFormulariosData = {
            idForm: IdFor
        };
        const dialogRef = this.dialog.open(VerFormulariosComponent, {
            data: datos
        });
    }

    HabilitarSeguimiento(id, status) {
        let encabezado;
        let descripcion;
        let state;
        if (status) {
            encabezado = `Desactivar el Seguimiento`;
            descripcion = `¿Se encuentra seguro de Desactivar el Seguimiento?`;
            state = false;
        } else {
            encabezado = `Activar el Seguimiento`;
            descripcion = `¿Se encuentra seguro de Activar el Seguimiento?`;
            state = true;
        }
        let datos: ConfirmacionDialogData = {
            icono: 'info',
            severidad: 'dialog-info',
            encabezado: encabezado,
            descripcion: descripcion
        };
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            ariaLabel: `${encabezado}  `,
            role: 'alertdialog',
            autoFocus: false,
            data: datos

        });
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'true') {
                try {
                    this.projectService.getById(id).subscribe(r => {
                        this.objetos = r['Proyecto'];
                        this.objetos.Seguimiento = state;
                        this.projectService.update(id, this.objetos).subscribe(r => {
                            console.log(r);
                        });
                        //inicio dialog sucess
                        let datossucess: SucessDialogData = {
                            icono: 'done',
                            severidad: 'dialog-sucess',
                            encabezado: `${encabezado}`,
                            descripcion: `El Proceso para ${encabezado}  se ha completado Satisfactoriamente`

                        };
                        const dialogRef = this.dialog.open(SucessDialogComponent, {
                            ariaLabel: `${encabezado}  Satisfactoriamente`,
                            role: 'alertdialog',
                            autoFocus: false,
                            data: datossucess
                        });
                        dialogRef.afterClosed().subscribe(result => {

                        });
                        //fin del dialog sucess
                    });
                } catch (error) {
                }
            } else {
            }
        });

    }

    cerrardialog() {
        this.dialogRef.close(true);
    }

    Activar(id, status) {
        let encabezado;
        let descripcion;
        let state;
        if (status) {
            encabezado = `Desactivar Edicion`;
            descripcion = `¿Se encuentra seguro de Desactivar la Edicion?`;
            state = false;
        } else {
            encabezado = `Activar Edicion`;
            descripcion = `¿Se encuentra seguro de Activar la Edicion?`;
            state = true;
        }
        let datos: ConfirmacionDialogData = {
            icono: 'info',
            severidad: 'dialog-info',
            encabezado: encabezado,
            descripcion: descripcion
        };
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            ariaLabel: `${encabezado}  `,
            role: 'alertdialog',
            autoFocus: false,
            data: datos

        });
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'true') {
                try {
                    this.projectService.getById(id).subscribe(r => {
                        this.objetos = r['Proyecto'];
                        this.objetos.ProyectoBloqueado = state;
                        this.projectService.update(id, this.objetos).subscribe(r => {
                        });
                        //inicio dialog sucess
                        let datossucess: SucessDialogData = {
                            icono: 'done',
                            severidad: 'dialog-sucess',
                            encabezado: `${encabezado}`,
                            descripcion: `El Proceso para ${encabezado}  se ha completado Satisfactoriamente`

                        };
                        const dialogRef = this.dialog.open(SucessDialogComponent, {
                            ariaLabel: `${encabezado}  Satisfactoriamente`,
                            role: 'alertdialog',
                            autoFocus: false,
                            data: datossucess
                        });
                        dialogRef.afterClosed().subscribe(result => {

                        });
                        //fin del dialog sucess
                    });
                } catch (error) {
                }
            } else {
            }
        });
    }

    CargarFor(idPr, bol): void {
        let Valor = [];
        let Calificado;
        let idProject = idPr;
        this.projectService.getById(idPr).subscribe(r => {
            r.Proyecto.calificaciones.forEach(element => {
                if (element.idEv._id == this.authStorageService.getUserId()) {
                    Valor = element.Valores;
                    Calificado = element.Evaluado;
                }
            });
            let datos: VistaFormulacionData = {
                idProyecto: idProject,
                evaluar: bol,
                valor: Valor,
                Evaluado: Calificado
            };
            const dialogRef = this.dialogo.open(VistaFormulacionComponent, {
                data: datos
            });
            dialogRef.afterClosed().subscribe(response => {
                this.getAll(this.data.idC);
                this.Rol = this.tipoDeEvaluacion(localStorage.getItem('Role'));
            });
        });
    }
}


export interface VistaProyectosData {
    idC: String;
}
