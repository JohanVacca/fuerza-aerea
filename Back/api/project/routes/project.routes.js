'use strict';

const express = require('express');
const ProyectController = require('../controller/project.controller');
const endpoint = '/Project';
const mdAuth = require('../../auth/jwt/jwt.middleware');

let api = express.Router();

api.get(endpoint, [mdAuth.ensureAuth], ProyectController.getAll);
// api.get(`${endpoint}/generatePdf`, [mdAuth.ensureAuth],ProyectController.getAllInPdf);
api.get(`${endpoint}/:id`, [ mdAuth.ensureAuth ], ProyectController.getById);
api.post(endpoint, ProyectController.create);
// api.get(`${endpoint}/:id/generatePdf`, [ mdAuth.ensureAuth, ProyectController.idValidation ], ProyectController.getByIdInPdf);
api.patch(`${endpoint}/:id`, [ mdAuth.ensureAuth], ProyectController.update);
api.delete(`${endpoint}/:id`, [ mdAuth.ensureAuth ], ProyectController.remove);
// api.post(`${endpoint}/uploadFile/:id`, ProyectController.uploadFile);
api.get(`${endpoint}/getIdConv/:id`,ProyectController.getIdConv);

module.exports = api;
