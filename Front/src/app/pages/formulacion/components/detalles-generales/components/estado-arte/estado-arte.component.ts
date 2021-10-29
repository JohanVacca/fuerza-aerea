import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthStorageService } from '../../../../../../@core/services/storage/auth-storage/auth-storage.service';
import { InstructivosService } from '../../../../../../@core/services/instructivos/FormIns.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { VerIntructiveComponent, VerIntructiveData } from '../../../../../../pages/instructional/ver-intructive/ver-intructive.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-estado-arte',
  templateUrl: './estado-arte.component.html',
  styleUrls: ['../../detalles-generales.component.scss']
})
export class EstadoArteComponent implements OnInit {
  dataResumen: string;
  public Editor = ClassicEditor

  
  constructor(private authStorageService:AuthStorageService,
              private InstructivosService:InstructivosService,
              public dialog: MatDialog,) {
    this.Editor.defaultConfig = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'insertTable',
          '|',
          'undo',
          'redo'
        ]
      },
      image: {
        toolbar: [
          'imageStyle:full',
          'imageStyle:side',
          '|',
          'imageTextAlternative'
        ]
      },
      table: {
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
      },
      language: 'es'
    }
   }

  ngOnInit(): void {
    this.cargarData();
  }
  cargarData() {
    this.dataResumen = localStorage.getItem("estadoArte")
  }
  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();

    localStorage.setItem("estadoArte", data);
  }
}
