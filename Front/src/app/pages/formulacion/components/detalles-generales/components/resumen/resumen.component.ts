import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['../../detalles-generales.component.scss']
})
export class ResumenComponent implements OnInit {
  dataResumen: string;
  public Editor = ClassicEditor;

  constructor() { }

  ngOnInit(): void {
    this.cargarData();
  }
  cargarData() {
    this.dataResumen = localStorage.getItem("resumen")
  }
  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();

    localStorage.setItem("resumen", data);
  }
}
