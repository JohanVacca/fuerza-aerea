import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog-agregar',
  templateUrl: './dialog-agregar.component.html',
  styleUrls: ['./dialog-agregar.component.scss']
})
export class DialogAgregarComponent implements OnInit {

  Entidad: FormGroup;
  EntidadLis = []
  valid;
  constructor(public dialog: MatDialog,
    private form: FormBuilder,
    public dialogRef: MatDialogRef<DialogAgregarComponent>) { }

  ngOnInit(): void {
    this.builder();
  }

  Register() {
    let storage = JSON.parse(localStorage.getItem("Entidades"));
    if(this.Entidad.value.correo == this.Entidad.value.correo2){
      var objEnt = {
        Institucion:this.Entidad.value.Institucion,
        Nit:this.Entidad.value.Nit,
        Persona:this.Entidad.value.Persona,
        numero:this.Entidad.value.numero,
        correo:this.Entidad.value.correo
      }
      this.EntidadLis.push(this.Entidad.value);
      if (storage == null) {
        localStorage.setItem("Entidades", JSON.stringify(this.EntidadLis));
      } else {
        storage.forEach(element => {
          this.EntidadLis.push(element);
        });
        localStorage.setItem("Entidades", JSON.stringify(this.EntidadLis));
      }
      this.dialogRef.close(true)
    }else{
      this.valid = true;
    }
  }

  builder() {
    this.Entidad = this.form.group({
      Institucion: new FormControl('', [Validators.required]),
      Nit: new FormControl('', [Validators.required]),
      Persona: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),  
      correo2: new FormControl('', [Validators.required, Validators.email]),
    })
  }
  CloseAlert(){
    this.valid = false;
  }
}
// export interface DialogAgregarData {

// }
