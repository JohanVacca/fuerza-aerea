import { validateAndRewriteCoreSymbol } from '@angular/compiler-cli/src/ngtsc/imports';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { subAct, actividad } from '../../../../../../../shared/models/cronograma.model'

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.scss']
})
export class AgregarActividadComponent implements OnInit {

  registroCronograma: FormGroup
  ObjsubAct: subAct[] = []
  actividad: actividad;
  Convocatoria: string;
  AgSub:subAct[] = [];
  agregoSub: boolean = false;
  editar: boolean = false;
  nombreActEdit;
  nombrePredecesora;
  Prede;
  nombreSubEdit;
  fechaInicioEdit;
  fechaFinalEdit;
  ValFechas;
  siEditoF= false;
  PredecesoraACT = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: AgregarActividadData,
    public dialogRef: MatDialogRef<AgregarActividadComponent>,
    public form: FormBuilder,
    private rutaActiva: ActivatedRoute,) { }

  ngOnInit(): void {
    this.editar = this.data.SeEstaEditando;
    if(this.editar ==  true){
      this.getAll()
    }else{
      this.cargarPreDec()
    }
    this.siEditoF = false
    console.log(this.data.idConvocatoria);
    this.builder();
    this.agregoSub = false;
    
  }


  cargarPreDec(){
    let cronograma:actividad[] = JSON.parse(localStorage.getItem('cronograma'));
    var predecesoraAux = []
    var PreBasic = {
      id: 1,
      name: "No Tiene"
    }
    predecesoraAux.push(PreBasic)
    if(cronograma != undefined){
      cronograma.forEach(element =>{
        var Prenew={
          id:element.idUnicoTare,
          name:element.nombreAct
        }
        predecesoraAux.push(Prenew)
      })
    }
    this.PredecesoraACT = predecesoraAux
  }

  getAll(){
    let cronograma:actividad[] = JSON.parse(localStorage.getItem('cronograma'));
    var predecesoraAux = []
    var PreBasic = {
      id: 1,
      name: "No Tiene"
    }
    predecesoraAux.push(PreBasic)
    cronograma.forEach(element => {
      if(element.idUnicoTare == this.data.Actividad){
        this.AgSub = element.subActividad;
        this.nombreActEdit = element.nombreAct
        this.Prede = element.predecesora
      }else{
        var Prenew={
          id:element.idUnicoTare,
          name:element.nombreAct
        }
        predecesoraAux.push(Prenew)
      }
    });
    this.PredecesoraACT = predecesoraAux
    console.log(this.PredecesoraACT)
  }

  builder() {
    if(!this.editar){  
      this.registroCronograma = this.form.group({
        nombreAct: new FormControl('', [Validators.required]),
        Predecesora: new FormControl('', [Validators.required]),
        nombreSub: new FormControl('', [Validators.required]),
        fechaInicio: new FormControl('', [Validators.required]),
        fechaFinal: new FormControl('', [Validators.required]),
      })
    }else{
      console.log(this.Prede)
      this.registroCronograma = this.form.group({
        nombreAct: new FormControl(this.nombreActEdit, [Validators.required]),
        Predecesora: new FormControl(this.Prede, [Validators.required]),
        nombreSub: new FormControl('', [Validators.required]),
        fechaInicio: new FormControl('', [Validators.required]),
        fechaFinal: new FormControl('', [Validators.required]),
      })
    }
  }

  AgregarSub(){
    var valores = this.registroCronograma.value
    if(this.actividad != null){
      this.AgSub = this.actividad.subActividad;
    }
    
    console.log(valores.Predecesora)
    console.log(valores)
    var subAct: subAct = {
      nombreSub: valores.nombreSub,
      fechaInicio: valores.fechaInicio,
      fechaFinal: valores.fechaFinal
    }
    if(valores.fechaInicio>valores.fechaFinal){
      this.ValFechas = true;
    }else{ 
      this.AgSub.push(subAct);
      this.registroCronograma = this.form.group({
        nombreAct: new FormControl(valores.nombreAct, [Validators.required]),
        nombreSub: new FormControl('', [Validators.required]),
        Predecesora: new FormControl(valores.Predecesora, [Validators.required]),
        fechaInicio: new FormControl('', [Validators.required]),
        fechaFinal: new FormControl('', [Validators.required]),
      })
      this.agregoSub = true;
    }
  }

  obSubEdit(){
    var valores = this.registroCronograma.value
    let cronograma:actividad[] = JSON.parse(localStorage.getItem('cronograma'));
    let cronogramaNew: actividad[] = [];
    cronograma.forEach(element => {
      if(element.idUnicoTare == this.data.Actividad){
        element.nombreAct = valores.nombreAct;
        element.predecesora = valores.Predecesora;
        element.subActividad = this.AgSub;
      }
      cronogramaNew.push(element)
    });
    var aux = null;
    this.AgSub.forEach(element => {
      if(aux == null){
        aux = element.fechaFinal 
      }else{
        if(aux < element.fechaFinal ){
          aux = element.fechaFinal;
        }
      }
    });
    var auxOb = {
      id: this.data.Actividad,
      dateFinal: aux,
      valor: this.siEditoF
    } 
    this.dialogRef.close(auxOb);
    localStorage.setItem('cronograma', JSON.stringify(cronogramaNew));
  }

  editarSub(subAct){
    var valores = this.registroCronograma.value
    this.siEditoF = true;
    this.AgSub.forEach(element => {
      if(element == subAct){
        this.eliminarSub(subAct)
        this.registroCronograma = this.form.group({
          nombreAct: new FormControl(valores.nombreAct, [Validators.required]),
          nombreSub: new FormControl(subAct.nombreSub, [Validators.required]),
          Predecesora: new FormControl(valores.Predecesora, [Validators.required]),
          fechaInicio: new FormControl(subAct.fechaInicio, [Validators.required]),
          fechaFinal: new FormControl(subAct.fechaFinal, [Validators.required]),
        })
      }
    });

  }

  CloseAlert(){
    this.ValFechas = false;
  }

  eliminarSub(subAct){
    var AgSubNew:subAct[] = []
    this.AgSub.forEach(element => {
      if(element != subAct){
        AgSubNew.push(element);
      }
    });
    this.AgSub = AgSubNew;
  }

  onSub(){
    var valores = this.registroCronograma.value

    console.log(valores)

    let cronograma:actividad[] = JSON.parse(localStorage.getItem('cronograma'));
    console.log(cronograma)
    if (cronograma == null) {
      cronograma = []
    }
    var cronocramaObj: actividad = {
      idUnicoTare: Math.round(Math.random()*10000000),
      nombreAct: valores.nombreAct,
      predecesora: valores.Predecesora,
      subActividad: this.AgSub
    }
    cronograma.push(cronocramaObj)
    localStorage.setItem('cronograma', JSON.stringify(cronograma));

  }

  ReajustarFechas(){ 
    var valores = this.registroCronograma.value
    var valor = valores.fechaFinal - valores.fechaInicio 
    console.log(valores.fechaFinal)
    valores.fechaFinal.setDate(valores.fechaFinal.getDate() + valor/86400000)
  }
}


export interface AgregarActividadData {
  idConvocatoria: string,
  SeEstaEditando?:boolean,
  Actividad?:number
}

