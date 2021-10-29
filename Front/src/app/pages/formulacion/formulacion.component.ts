import { Component, OnInit } from '@angular/core';
import { ConvocatoryService } from '../admin/convocatory/services/convocatory.service';

@Component({
  selector: 'app-formulacion',
  templateUrl: './formulacion.component.html',
  styleUrls: ['./formulacion.component.scss']
})
export class FormulacionComponent implements OnInit {
  BotonInv: boolean;
  BotonAdm: boolean;
  Role: string
  ngOnInit(): void {
    this.getAll();
  }
  rows = [];
  temp = [];
  displayedColumns: string[] = ['name', 'Descripcion', 'acciones'];
  dataSource;
  constructor(
    private convocatoryServece: ConvocatoryService,
  ) { }
  getAll() {
    this.convocatoryServece.getall()
      .subscribe((convocatorias) => {
        this.filtro(convocatorias);
      });
  }

  filtro(convocatorias) {
    let convocatoriasfiltro = convocatorias.filter(r => { return r.isActive === true });
    this.temp = convocatoriasfiltro;
    this.dataSource = this.temp;
  }

  formular() {
    let token = localStorage.getItem('token')
    let role = localStorage.getItem('Role')

    localStorage.clear()
    localStorage.setItem('token', token)
    localStorage.setItem('Role', role)
  }
}







