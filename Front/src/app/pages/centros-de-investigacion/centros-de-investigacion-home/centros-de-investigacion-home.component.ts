import {Component, OnInit} from '@angular/core';
import {InvCenterService} from '../../../shared/services/inv-center2/inv-center.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-centros-de-investigacion-home',
    templateUrl: './centros-de-investigacion-home.component.html',
    styleUrls: ['./centros-de-investigacion-home.component.scss']
})
export class CentrosDeInvestigacionHomeComponent implements OnInit {

    public LIST = 'Listado de centros de investigación';
    public MESSAGE_LIST = 'A continuación se muestra el Listado de centros de investigación';
    public displayedColumns1: string[] = ['name', 'acciones'];
    public centrosDeInvestigacion = [];
    public name = '';
    public centrosForm: FormGroup;

    constructor(private invCenterService: InvCenterService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.builder();
        this.getCenters();
    }

    public setName(name: string): void {
        this.name = name;
    }

    public eliminarCentro(id: string): void {
        this.invCenterService.removeCenter(id)
            .pipe(finalize(() => this.getCenters()))
            .subscribe(nuevoCentro => {});
    }

    public agregarCentro(): void {
        if (this.name) {
            this.invCenterService.crearCentro(this.name)
                .pipe(finalize(() => this.getCenters()))
                .subscribe(nuevoCentro => {});
        }
    }

    private builder(): void {
        this.centrosForm = this.fb.group({
            name: new FormControl(''),
        });
    }

    private getCenters(): void {
        this.invCenterService.getAll()
            .subscribe(centros => {
                // @ts-ignore
                this.centrosDeInvestigacion = centros.invCenters;
            });
    }

}
