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
            
        } catch (error) {
            
        }
    }

    async verTopRecetas(req, res){
        try {
            
        } catch (error) {
            
        }
    }

    async agregarLike(req, res){
        try {
            
        } catch (error) {
            
        }
    }

    async quitarLike(req, res){
        try {
            
        } catch (error) {
            
        }
    }

}

module.exports = new RecetaController()