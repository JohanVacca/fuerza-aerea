import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-marco-conceptual',
  templateUrl: './marco-conceptual.component.html',
  styleUrls: ['../../detalles-generales.component.scss']
})
export class MarcoConceptualComponent implements OnInit {
  dataResumen: string;
  public Editor = ClassicEditor;

  constructor() { }

  ngOnInit(): void {
    this.cargarData();
  }
  cargarData() {
    this.dataResumen = localStorage.getItem("marcoConceptual")
  }
  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();

    localStorage.setItem("marcoConceptual", data);
  }
}
