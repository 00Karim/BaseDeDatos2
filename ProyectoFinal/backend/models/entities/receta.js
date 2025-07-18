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
        enum: ['Fácil', 'Media', 'Difícil'],
        default: 'Media'
    },
    tipoCocina: {
        type: String,
        required: true
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