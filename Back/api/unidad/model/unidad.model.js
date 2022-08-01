'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UnidadSchema = Schema({ 
    name: String, 
})

module.exports = UnidadSchema;
