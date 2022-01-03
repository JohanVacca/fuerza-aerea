'use strict';

const {validationResult} = require("express-validator/check");
const FirmaDao = require("../dao/firma.dao");
const ProyectoDao = require("../../project/dao/project.dao");


/**
 * create a firma
 * @param req
 * @param res
 * @param next
 */
async function create(req, res, next) {
    const {file} = req.files;
    const {userId} = req.body;
    const _firma = new FirmaDao();
    _firma.userId = userId;
    _firma.name = file.name;
    _firma.data = file.data;
    _firma.path = '/img/uploads/' + file.name;
    _firma.mimetype = file.mimetype;
    _firma.size = file.size;

    let saved = await _firma.save();
    let _newFirma = await FirmaDao.findOne({_id: saved._id})
    res.status(200).json({"firma": _newFirma});
}

function remove(req, res, next) {
    try {
        validationResult(req).throw();

        console.log('req.params::: ', req)

        let userId = req.params.id;

        FirmaDao['remove'](userId)
            .then(async firma => {
                if (!firma) {
                    res.status(404).json({message: 'firma not found.'});
                } else {
                    res.status(200).json({message: 'firma deleted.'});
                }
            })
            .catch(err => res.status(500).json({message: err}));
    } catch (err) {
        const errorFormatter = ({msg, param}) => {
            return {
                error: `The value: ${param} ${msg}`
            };
        };
        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
            return res.status(422).json({errors: result.array()});
        }
    }
}

/**
 * Método para traer una firma
 * @param req
 * @param res
 * @param next
 */
function getById(req, res, next) {
    try {
        validationResult(req).throw();

        let firmaId = req.params.id;

        FirmaDao['getById'](firmaId)
            .then(async firma => {
                if (!firma) {
                    res.status(404).json({message: 'firma not found.'});
                } else {
                    res.status(200).json({"firma": firma});
                }
            })
            .catch(err => {
                res.status(500).json({message: err});
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

/**
 * Método para firmar
 * @param req
 * @param res
 * @param next
 */
async function update(req, res, next) {
    let {firmaId, proyectoId} = req.body;

    ProyectoDao['getById'](proyectoId)
        .then(async project => {
            if (!project) {
                res.status(404).json({message: 'Proyecto not found.'});
            } else {
                project.firmas = project.firmas.map(firma => {
                    if (String(firmaId) === String(firma._id)) {
                        console.log('firma._id')
                        firma.status = true;
                    }
                    return firma
                });

                ProyectoDao['update'](proyectoId, project)
                    .then(async _Proyecto =>{
                        if(!_Proyecto){
                            res.status(404).json({message: 'Proyecto not found.'});
                        }else {
                            res.status(200).json({"Proyecto": _Proyecto});
                        }
                    })
            }
        })
        .catch(err => {
            res.status(500).json({message: err});
        });
}

module.exports = {
    getById,
    create,
    remove,
    update
};
