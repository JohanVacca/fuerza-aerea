import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-resultados-previos',
  templateUrl: './resultados-previos.component.html',
  styleUrls: ['./resultados-previos.component.scss']
})
export class ResultadosPreviosComponent implements OnInit {
  dataResumen: string;
  public Editor = ClassicEditor;

  constructor() { }

  ngOnInit(): void {
    this.cargarData();
  }
  cargarData() {
    this.dataResumen = localStorage.getItem("resultadosPrevios")
  }
  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();

    localStorage.setItem("resultadosPrevios", data);
  }
}
