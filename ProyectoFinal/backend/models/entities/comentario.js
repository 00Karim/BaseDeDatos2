const mongoose = require('mongoose');

const estructuraComentarios = new mongoose.Schema({
    recetaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recetas',
        required: true
    },
    autorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios', 
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})

const Comentarios = mongoose.model('Comentarios', estructuraComentarios)
module.exports = Comentarios