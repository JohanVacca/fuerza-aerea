'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var i=0;

let UnidadSchema = Schema({
    name: String,
    ubicacion: String,
    rResponsable: '',
    comandante: '',

})

module.exports = UnidadSchema;
//