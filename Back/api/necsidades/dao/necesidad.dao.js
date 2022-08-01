'use strict';

const NecesidadSchema = require('../model/unidad.model');
const mongoose = require("mongoose");

/**
 * getAll unidad
 */

NecesidadSchema.static('getAll', async (query) => {
    try{
        return await NecesidadDao
            .find(query)
            .exec();
    }catch(err){
        throw err;
    }
}); 

/**
 * create a unidad
 */
NecesidadSchema.static('create', async (necesidad) => {
    if (typeof necesidad !== 'object') {
        throw new TypeError('necesidad is not a valid object.');
    }

    let _obj = new NecesidadDao(necesidad);
    let saved = await  _obj.save();
    let __obj = await NecesidadDao.findOne({_id: saved._id}).exec();
    return (__obj);
});


/**
 * remove a unidad
 */
NecesidadSchema.static('remove', async (id) =>{
    try{
        return await NecesidadDao.findOneAndRemove({_id: id}).exec();
    }catch (err){
        throw err;
    }
});

let NecesidadDao = mongoose.model('necesidad', NecesidadSchema);
module.exports = NecesidadDao;
