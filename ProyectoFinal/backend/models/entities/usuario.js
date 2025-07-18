const mongoose = require('mongoose')

const estructuraUsuario = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        required: true
    },
    recetasPublicadas: {
        type: Number
    },
    seguidores: {
        type: Number
    }
})

const Usuarios = mongoose.model('Usuarios', estructuraUsuario) // creamos un modelo basado en la estructura que queremos que tenga un documento de receta para poder manipular el modelo en mongodb desde javascript
module.exports = Usuarios