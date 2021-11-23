'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let InvCenterSchema = Schema({
    name: String,
});

module.exports =  InvCenterSchema;
