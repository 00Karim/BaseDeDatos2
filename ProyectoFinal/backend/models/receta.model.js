const Receta = require('./entities/receta')
const Usuario = require('./entities/usuario')
const mongoose = require('mongoose') 

class RecetaModelo{
    crearReceta = async(titulo, descripcion, autorId, ingredientes, instrucciones, tiempoCoccion, dificultad, tipoCocina) => {
        try {
            
        } catch (error) {
            
        }
    }

    buscarPorIngrediente = async(ingrediente) => {
        try {
            const recetas = await Receta.aggregate([
                {$match: {'ingredientes.nombre': ingrediente}}
            ])
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
                        likes: -1
                    }
                }
            ])
            return recetas
        } catch (error) {
            console.log("Hubo un error al devolver el top de recetas:", error.message);
            return null
        }
    }

    sumarLike = async(recetaId, usuarioId) => {
        try { // hay que chequear si ese usuario ya le dio like a esa receta para que no pueda repetir el like
            const recetaObjId = new mongoose.Types.ObjectId(recetaId);
            const usuarioObjId = new mongoose.Types.ObjectId(usuarioId);
            const tieneLike = await Usuario.findOne({
                _id: usuarioObjId,
                recetasLikeadas: recetaObjId
            });
            if(!tieneLike){ // si no le dio like aun entonces dejamos que le de like sumando 1 a la cantidad
                const recetaLikeada = await Receta.updateOne(
                    { _id: recetaObjId },
                    { $inc: { likes: 1 } }
                );
                return recetaLikeada
            }
        } catch (error) {
           console.log("Hubo un error al likear la receta", error.message)
           return null
        }
    }

    restarLike = async(recetaId, usuarioId) => {
        try { // hay que chequear si ese usuario ya le dio like a esa receta para que no pueda quitar un like que nunca dio
            const recetaObjId = new mongoose.Types.ObjectId(recetaId);
            const usuarioObjId = new mongoose.Types.ObjectId(usuarioId);
            const tieneLike = await Usuario.findOne({
                _id: usuarioObjId, // buscamos solo dentro de las recetasLikeadas del usuario actual
                recetasLikeadas: recetaObjId // mos fijamos si existe un objeto dentro del array recetasLikeadas con el mismo id
            });
            console.log("TIENE LIKE?: ", tieneLike)
            if (tieneLike){ // si ya tiene like entonces podemos seguir con el codigo y restarle uno a la cantidad             
                const recetaDislikeada = await Receta.updateOne(
                    { _id: recetaObjId },
                    { $inc: { likes: -1 } }
                );
                return recetaDislikeada
            }
        } catch (error) {
            console.log("Hubo un error al dislakear la receta", error.message);
            return null
        }
    }
}

module.exports = new RecetaModelo()


