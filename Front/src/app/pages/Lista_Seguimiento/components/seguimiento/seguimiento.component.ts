import { Component, OnInit } from '@angular/core';
import { cronogramaService } from 'src/app/shared/services/cronograma/cronograma.service';
import { ActivatedRoute, Params } from '@angular/router';
import { actividad, cronogramaObj, subAct } from '../../../../shared/models/cronograma.model'
import { ProjectService } from 'src/app/shared/services/Proyect/project.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss']
})
export class SeguimientoComponent implements OnInit {
  cronograma: actividad[]
  constructor(private rutaActiva: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {


  }


}
