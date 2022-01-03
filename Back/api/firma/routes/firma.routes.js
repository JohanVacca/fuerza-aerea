'use strict';

const express = require('express');
const endpoint = '/firma';
const FirmaController = require("../controller/Firma.controller");
const mdAuth = require('../../auth/jwt/jwt.middleware');
const multer = require('multer');
const path = require("path");
const upload = multer();
const fileUpload = require('express-fileupload');

let app = express.Router();
app.get(`${endpoint}/:id`, FirmaController.getById);
app.delete(`${endpoint}/:id`, FirmaController.remove);

// Update signature
app.use(fileUpload());
app.post(endpoint, FirmaController.create);
app.patch(endpoint, FirmaController.update);

module.exports = app;
