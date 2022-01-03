import {Component, OnInit} from '@angular/core';
import {FirmaService} from '../../../shared/services/firma/firma.service';
import {AuthService} from '../../../@core/services/auth/auth.service';
import {finalize} from 'rxjs/operators';
import {ConvocatoryService} from '../../admin/convocatory/services/convocatory.service';
import {VistaProyectosData} from '../../evaluacion/components/vista-proyectos/vista-proyectos.component';
import {MatDialog} from '@angular/material/dialog';
import {ListaProyectosModalComponent} from '../lista-proyectos-modal/lista-proyectos-modal.component';

@Component({
    selector: 'app-firmas-home',
    templateUrl: './firmas-home.component.html',
    styleUrls: ['./firmas-home.component.scss']
})
export class FirmasHomeComponent implements OnInit {

    public MY_SIGNATURE = 'Mi firma';
    public LIST = 'Listado por firmar';
    public MESSAGE_WITHOUT_SIGNATURE = 'No tiene ninguna firma relacionada.';
    public MESSAGE_WITH_SIGNATURE = 'Firma agregada';
    public FORMAT_ERROR_MESSAGE = 'Solo son permitidas imagenes en formato PNG o JPG';
    public hasSignature = false;
    public formatError = false;
    public loadingUserId = true;
    public signature;
    public fileToUpload;
    public convocatorias;
    public displayedColumns1: string[] = ['name', 'Descripcion', 'acciones'];

    private userId = '';

    constructor(
        private firmaService: FirmaService,
        private authService: AuthService,
        private convocatoryService: ConvocatoryService,
        public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getUserId();
        this.getConvocatorias();
    }

    public agregarFirma(): void {
        this.firmaService.saveFirma(this.fileToUpload, this.userId)
            .subscribe(
                response => {
                    this.hasSignature = true;
                    this.signature = response.firma;
                },
                error => console.log('error>>> ', error));
    }

    public eliminarFirma(): void {
        this.firmaService.removeFirma(this.userId)
            .subscribe(response => {
                console.log('Se elimino !', response);
                this.signature = null;
                this.fileToUpload = null;
                this.hasSignature = false;
            });
    }

    public saveSignature(files: FileList): void {
        const fileToUpload = files.item(0);
        if (fileToUpload.type.includes('image')) {
            console.log('fileToUpload:: ', fileToUpload);
            this.fileToUpload = fileToUpload;
            this.formatError = false;
        } else {
            this.formatError = true;
        }
    }

    public viewConvocatorias(id): void {
        const data: VistaProyectosData = {idC: id};
        const dialogRef = this.dialog.open(ListaProyectosModalComponent, {data});
        dialogRef.afterClosed().subscribe(r => {

        });
    }

    private getUserId(): void {
        this.authService.getUserId()
            .pipe(finalize(() => this.getFirma()))
            .subscribe(
                userId => this.userId = userId,
                error => console.log('error>>> ', error));
    }

    private getFirma(): void {
        this.firmaService.getFirma(this.userId)
            .pipe(finalize(() => this.loadingUserId = false))
            .subscribe(
                response => {
                    this.hasSignature = true;
                    this.signature = response.firma;
                },
                error => console.log('error>>> ', error)
            );
    }

    private getConvocatorias(): void {
        this.convocatoryService.getall()
            .subscribe((convocatorias) => {
                this.convocatorias = convocatorias.filter(r => r.isActive === true);
            });
    }
}
