const { text } = require("express");
const ComentarioModel = require("../models/comentario.model")

class ComentarioController{
    async hacerComentario(req, res){
        const { id_receta, id_autor, texto, calificacion } = req.body

        try{
            await ComentarioModel.hacerComentario(id_receta, id_autor, texto, calificacion)
            res.status(200).json("Comentario creado correctamente");
        }
        catch(error){
            console.log("Error al comentar")
            res.status(505).json({error: "Error del servidor al comentar!"})
        }  
    }
}

module.exports = new ComentarioController()