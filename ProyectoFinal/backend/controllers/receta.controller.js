const RecetaModel = require('../models/receta.model')

class RecetaController{

    async crearReceta(req, res){
        try {
            const { titulo, descripcion, autorId, ingredientes, instrucciones, tiempoCoccion, dificultad, tipoCocina } = req.body //no ponemos los likes porque al estar recien creada no puede tener likes entonces lo dejamos vacio asi se asigna el default: 0
            await res.status(200).json(RecetaModel.crearReceta(titulo, descripcion, autorId, ingredientes, instrucciones, tiempoCoccion, dificultad, tipoCocina))
        } catch (error) {
            res.status(500).json("Hubo un error al crear la receta", error.message)
        }
    }
     

    async buscarPorIngrediente(req, res){
        try {
            const { ingrediente } = req.params
            res.status(200).json(await RecetaModel.buscarPorIngrediente(ingrediente))
        } catch (error) {
            res.status(500).json("Hubo un error del servidor: ", error.message)
        }
    }

    async verTopRecetas(req, res){
        try {
            res.status(200).json(await RecetaModel.verTopRecetas())
        } catch (error) {
            res.status(500).json({ error: "Hubo un error del servidor", detalle: error.message });
        }
    }

    async sumarLike(req, res){
        try {
            const {recetaId, usuarioId} = req.body
            res.status(200).json(await RecetaModel.sumarLike(recetaId, usuarioId))
        } catch (error) {
            res.status(500).json("Error al agregar un like - receta.controller", error.message)
        }
    }

    async restarLike(req, res){
        try {
            const {recetaId, usuarioId} = req.body
            res.status(200).json(await RecetaModel.restarLike(recetaId, usuarioId))
        } catch (error) {
            res.status(500).json("Error al quitar un like - receta.controller", error.message)
        }
    }

}

module.exports = new RecetaController()