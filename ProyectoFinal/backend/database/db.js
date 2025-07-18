const mongoose = require('mongoose');

const conectarDB = async () => {
    try{
        await mongoose.connect('mongodb://mongodb:27017/redSocial')
        console.log("Se conecto correctamente a la base de datos");
    }
    catch (err){
        console.log("Error conectandose a la base de datos");
    }
}

module.exports = conectarDB;