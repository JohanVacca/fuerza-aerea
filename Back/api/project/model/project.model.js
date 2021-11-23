"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let UserSchema = require("../../user/model/user.model");

const User = mongoose.model("user", UserSchema);
const date = new Date();
date.getMonth()

let ProjectSchema = new Schema({

  date: String,
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Convocatoria: { type: mongoose.Schema.Types.ObjectId, ref: "Convocatoria" },
  objetivosEspecificos: [{ descr: String }],
  ProyectoBloqueado: Boolean,
  Seguimiento: Boolean,
  Entidades: [
    {
      Institucion: String,
      Nit: String,
      Persona: String,
      correo: String,
      numero: String,
    },
  ],
  EquipoInvestigaciones: [
    {
      nombres: String,
      apellido: String,
      identificacion: Number,
      grupos: String,
      lider: String,
      grado: String,
      dedicacion: String,
      cargo: String,
    },
  ],
  AgregarDetallesRubros: [
    {
      idRubro: String,
      RolDelInvestigador: String,
      PerfilDelInvestigador: String,
      NombreRubro: String,
      NombreDelInvestigador: String,
      Justificacion: String,
      HorasSemanales: String,
      Formacion: String,
      Experiencia: String,
      EntidadesCostos: [
        {
          institucion: String,
          id: Number,
          especie: String,
          efectivo: String,
        },
      ],
      TotalEfectivo: Number,
      DuracionEnMeses: String,
      Descripcion: String,
      PresupuestoEjecutado: Number,
      Cumplimiento: Number,
    },
  ],
  productosEsperados: [
    {
      descripcion: String,
      partFuerza: Number,
      partOtros: Number,
      rubroRelacionado: String,
      tipoProducto: String,
    },
  ],
  resultadosPrevios: String,
  iniciarProyecto: [
    {
      telefonoGestor: Number,
      subprograma: String,
      programa: String,
      nombreProyecto: String,
      modelo: String,
      lugar: String,
      linea: String,
      gestor: String,
      email: String,
      duracion: Number,
      dependencia: String,
      comandante: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      avala: String,
      centroDeInvestigacion: String,
    },
  ],
  metodologia: String,
  marcoConceptual: String,
  resumen: String,
  informaciones: [
    {
      impacto: String,
      nInvestigacion: String,
      pregunta: String,
    },
  ],
  estadoArte: String,
  bibliografias: [
    {
      bibliografia: String,
    },
  ],
  palabraClaves: [
    {
      palabra: String,
    },
  ],
  resultadosEsperados: String,
  objetivoGeneral: String,
  grupos: [
    {
      nombreGrupo: String,
      entidad: String,
      antiguedad: String,
      codigo: String,
      categoria: String,
      lider: String
    },
  ],
  ValorTotal: Number,
  calificaciones: [
    {
      idEv: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      ValorParcial: Number,
      Evaluado: Boolean,
      Valores: {
        vlrequipo: Number,
        vlrestado: Number,
        vlrmarco: Number,
        vlrmetodologia: Number,
        vlrobjEspecifico: Number,
        vlrobjGeneral: Number,
        vlrpalabrasClaves: Number,
        vlrproyecto: Number,
        vlrresumen: Number,
        vlrunidadependencia: Number,
      },
    },
  ],
});

module.exports = ProjectSchema;
