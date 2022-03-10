const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_DB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: true
            }
        )
        console.log('Base de datos online (config)');
    } catch (error) {
        throw new Error('Error iniciando la base de datos');
    }
}


module.exports = {
    dbConnection
}
