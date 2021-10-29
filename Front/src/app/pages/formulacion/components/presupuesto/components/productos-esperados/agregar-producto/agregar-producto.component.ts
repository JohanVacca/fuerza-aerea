import { Component, Inject, OnInit } from '@angular/core';
import { ProductTypeService } from '../../../../../../../shared/services/product-type/product-type.service';
import { ProjectEntryService } from '../../../../../../../shared/services/project-entry/project-entry.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['../../../presupuesto.component.scss']
})
export class AgregarProductoComponent implements OnInit {
  registroProducto: FormGroup

  typeIns;
  Rubros;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AgregarProductoData,
    private productTypeService: ProductTypeService,
    private projectEntryService: ProjectEntryService,
    public form: FormBuilder,
    public dialogRef: MatDialogRef<AgregarProductoComponent>) { }

  ngOnInit(): void {
    this.getAll(),
      this.builder();
  }

  getAll() {
    this.productTypeService.getIdConv(this.data.idCon).subscribe(r => {
      this.typeIns = r
    });
    this.projectEntryService.getIdConv(this.data.idCon).subscribe(r => {
      this.Rubros = r
    });
  }

  builder() {
    if (this.data.actualizar == false) {
      this.registroProducto = this.form.group({
        tipoProducto: new FormControl('', [Validators.required]),
        rubroRelacionado: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required]),
        partFuerza: new FormControl('', [Validators.required]),
        partOtros: new FormControl('', [Validators.required]),
      })
    } else {
      this.registroProducto = this.form.group({
        tipoProducto: new FormControl(this.data.tipoProducto, [Validators.required]),
        rubroRelacionado: new FormControl(this.data.rubroSeleccionado, [Validators.required]),
        descripcion: new FormControl(this.data.descripcion, [Validators.required]),
        partFuerza: new FormControl(this.data.PartFuerza, [Validators.required]),
        partOtros: new FormControl(this.data.PartOtros, [Validators.required]),
      })

    }
  }
  guardarProducto() {
    let Productos = JSON.parse(localStorage.getItem('productosEsperados'))
    if (Productos == null) {
      Productos = []
      Productos.push(this.registroProducto.value)
    } else {
      Productos.push(this.registroProducto.value)
    }
    localStorage.setItem('productosEsperados', JSON.stringify(Productos))
    Productos = []
    this.dialogRef.close(true);
  }

  updateProducto() {
    let storagelist = JSON.parse(localStorage.getItem('productosEsperados'))
    let filtroproductos = storagelist.filter(r => r.descripcion + r.tipoProducto != this.data.descripcion + this.data.tipoProducto)
    filtroproductos.push(this.registroProducto.value)
    localStorage.setItem('productosEsperados', JSON.stringify(filtroproductos))
    this.dialogRef.close(true);
  }

}

export interface AgregarProductoData {
  actualizar: boolean,
  idCon?: string,
  tipoProducto?: string,
  rubroSeleccionado?: string,
  descripcion?: string,
  PartFuerza?: number
  PartOtros?: number
}
