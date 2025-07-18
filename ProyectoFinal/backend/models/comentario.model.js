const Comentario = require('./entities/comentario')

class ComentarioModel{
    hacerComentario = async (id_receta, id_autor, texto, calificacion) => {
        try {
            const comentario = await Comentario.create({
                recetaId: id_receta,
                autorId: id_autor,
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

