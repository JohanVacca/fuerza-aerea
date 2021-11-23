'use strict';

const {check, validationResult} = require('express-validator/check');
const InvCenterDao = require('../dao/inv-center.dao');

/**
 * getAll invCenters
 * @param req
 * @param res
 * @param next
 */
function getAll(req, res, next) {
    let query = req.query;
    InvCenterDao['getAll'](query)
        .then(async invCenters => {
            res.status(200).json({"invCenters": invCenters});
        })
        .catch(err => {
            res.status(500).json({message: err});
        });
}

/**
 * create a invCenter
 * @param req
 * @param res
 * @param next
 */
function create(req, res, next) {
    try {
        validationResult(req).throw();

        let invCenter = req.body;

        let objObj = JSON.parse(JSON.stringify(invCenter));

        InvCenterDao['create'](objObj)
            .then(async _obj => {
                res.status(201).json({"invCenter": _obj});
            });


    } catch (err) {
        const errorFormatter = ({msg, param}) => {
            return `The value: ${param} ${msg}`;
        };
        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
            return res.status(422).json({errors: result.array()});
        }
    }
}

module.exports = {
    create,
    getAll
}
