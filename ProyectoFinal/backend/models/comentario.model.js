const Comentario = require('./entities/comentario')
const mongoose = require('mongoose')

class ComentarioModel{
    hacerComentario = async (recetaId, autorId, texto, calificacion) => {
        try {
            const recetaObjId = new mongoose.Types.ObjectId(recetaId);
            const autorObjId = new mongoose.Types.ObjectId(autorId);
            const comentario = await Comentario.create({
                recetaId,
                autorId,
                texto: texto,
                calificacion: calificacion
                // la fecha se inserta automaticamente gracias a la funcion Date.now de mongoose
            });
            return comentario;
        } 
        catch (error) {
            console.log('Error al publicar el comentario:', error.message);
            throw error;
        }
    };
}

module.exports = new ComentarioModel()

