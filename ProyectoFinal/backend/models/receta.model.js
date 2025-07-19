const Receta = require('./entities/receta')
const Usuario = require('./entities/usuario')

class RecetaModelo{
    crearReceta = async(titulo, descripcion, autorId, ingredientes, instrucciones, tiempoCoccion, dificultad, tipoCocina) => {
        try {
            
        } catch (error) {
            
        }
    }

    buscarPorIngrediente = async(ingrediente) => {
        try {
            const recetas = await Receta.find({ 'ingredientes.nombre': ingrediente})
            return recetas
        } catch (error) {
            console.log("No hay una receta con ese ingrediente: ", error.message);
            return null
        }
    }

    verTopRecetas = async() => {
        try {
            const recetas = await Receta.aggregate([
                {$sort: 
                    {
                        likes: 1
                    }
                }
            ])
            return recetas
        } catch (error) {
            console.log("Hubo un error al devolver el top de recetas");
            return null
        }
    }

    sumarLike = async(recetaId, usuarioId) => {
        try { // hay que chequear si ese usuario ya le dio like a esa receta para que no pueda repetir el like
            tieneLike = await Usuario.findOne(
                {_id: ObjectId(usuarioId)},
                {recetasLikeadas: recetaId}
            )
            if(!tieneLike){ // si no le dio like aun entonces dejamos que le de like sumando 1 a la cantidad
                const recetaLikeada = await Receta.updateOne(
                    {_id: ObjectId(recetaId)},
                    {$inc: {likes: 1}}
                )
            }
            return recetaLikeada
        } catch (error) {
           console.log("Hubo un error al likear la receta")
           return null
        }
    }

    restarLike = async(recetaId, usuarioId) => {
        try { // hay que chequear si ese usuario ya le dio like a esa receta para que no pueda quitar un like que nunca dio
            tieneLike = await Usuario.findOne(
                {_id: ObjectId(usuarioId)},
                {recetasLikeadas: recetaId}
            )
            if (tieneLike){ // si ya tiene like entonces podemos seguir con el codigo y restarle uno a la cantidad
                const recetaDislikeada = await Receta.updateOne(
                    {_id: ObjectId(recetaId)},
                    {$inc: {likes: -1}}
                )
            }
            return recetaDislikeada
        } catch (error) {
            console.log("Hubo un error al dislakear la receta");
            return null
        }
    }
}

module.exports = new RecetaModelo()


