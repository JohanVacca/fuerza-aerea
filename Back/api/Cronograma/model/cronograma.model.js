"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CronogramaSchema = new Schema({
  proyectId: String,
  ConvocatoriaId: String,
  actividades: [
    {
      idUnicoTare: Number,
      nombreAct: String,
      subActividad: [
        {
          nombreSub: String,
          fechaInicio: Date,
          fechaFinal: Date,
          avance: Number,
          fechaReal: Date,
          Desface: Number,
        },
      ],
    },
  ],
});

module.exports = CronogramaSchema;
