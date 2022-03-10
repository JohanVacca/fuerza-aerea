import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {InvCenterService} from '../../../shared/services/inv-center2/inv-center.service';
import {finalize} from 'rxjs/operators';
import {UnidadService} from '../../../shared/services/unidad-service/unidad.service';

@Component({
  selector: 'app-unidades-home',
  templateUrl: './unidades-home.component.html',
  styleUrls: ['./unidades-home.component.scss']
})
export class UnidadesHomeComponent implements OnInit {

  public LIST = 'Listado de Unidades';
  public MESSAGE_LIST = 'A continuación se muestra el Listado de las Unidades activas o disponibles';
  public displayedColumns1: string[] = ['name', 'acciones'];
  public unidades = [];
  public name = '';
  public centrosForm: FormGroup;

  constructor(private unidadService: UnidadService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.builder();
    this.getUnidades();
  }

  public setName(name: string): void {
    this.name = name;
  }

  public removeUnidad(id: string): void {
    this.unidadService.removeUnidad(id)
        .pipe(finalize(() => this.getUnidades()))
        .subscribe(nuevoCentro => {});
  }

  public addUnidad(): void {
    if (this.name) {
      this.unidadService.createUnidad(this.name)
          .pipe(finalize(() => this.getUnidades()))
          .subscribe(nuevoCentro => {});
    }
  }

  private builder(): void {
    this.centrosForm = this.fb.group({
      name: new FormControl(''),
    });
  }

  private getUnidades(): void {
    this.unidadService.getAll()
        .subscribe(unidad => {
          console.log('unidad >>> ', unidad);
          // @ts-ignore
          this.unidades = unidad.unidades;
        });
  }

}
