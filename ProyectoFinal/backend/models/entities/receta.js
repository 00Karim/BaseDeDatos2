const mongoose = require('mongoose')

const estructuraReceta = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    autorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    ingredientes: 
        [{
            nombre: { type: String, required: true },
            cantidad: { type: String, required: true }
        }],
    instrucciones: 
        [{
            type: String,
            required: true
        }],
    tiempoCoccion: {
        type: Number, 
        required: true
    },
    dificultad: {
        type: String,
        enum: ['Facil', 'Intermedio', 'Dificil'], //saque los tildes porque no tengo tildes y daba error
        default: 'Intermedio'
    },
    tipoCocina: {
        type: String,
        required: true,
        default: 'No especifica'
    },
    likes: {
        type: Number,
        default: 0
    },
    fechaPublicacion: {
        type: Date,
        default: Date.now
    }
})

const Recetas = mongoose.model('Recetas', estructuraReceta)
module.exports = Recetas