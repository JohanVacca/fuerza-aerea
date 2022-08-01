'use strict';

const express = require('express');
const NecesidadController = require('../controller/necesidad.controller');
const endpoint = '/necesidad';
const mdAuth = require('../../auth/jwt/jwt.middleware');

let api = express.Router();

api.get(endpoint, [mdAuth.ensureAuth],NecesidadController.getAll);
api.post(endpoint, NecesidadController.create);
api.delete(endpoint, NecesidadController.remove);

module.exports = api;
