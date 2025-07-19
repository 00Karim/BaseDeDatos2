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
    },
    contrasenia: { // agregamos este atributo para poder detectar que usuario esta usando la app y asi saber quien esta dando likes y quien esta publicando una receta
        type: String,
        required: true
    },
    recetasLikeadas: // agregamos este atributo para saber cuando podemos dar o sacar un like (asi no hay likes repetidos en una misma receta o asi una persona no puede restar likes a una receta que no likeo)
        [{
            recetaId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recetas'}
        }]

})

const Usuarios = mongoose.model('Usuarios', estructuraUsuario) // creamos un modelo basado en la estructura que queremos que tenga un documento de receta para poder manipular el modelo en mongodb desde javascript
module.exports = Usuarios