import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-resultados-esperados',
  templateUrl: './resultados-esperados.component.html',
  styleUrls: ['../../detalles-generales.component.scss']
})
export class ResultadosEsperadosComponent implements OnInit {
  dataResumen: string;
  public Editor = ClassicEditor;

  constructor() { }

  ngOnInit(): void {
    this.cargarData();
  }
  cargarData() {
    this.dataResumen = localStorage.getItem("resultadosEsperados")
  }
  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();

    localStorage.setItem("resultadosEsperados", data);
  }
}
