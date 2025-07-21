const UsuarioModel = require('../models/usuario.model')

class UsuarioController{
    async validarCredenciales(req, res){
        try{
            const {email, contrasenia} = req.body
            res.status(200).json(await UsuarioModel.validarCredenciales(email, contrasenia))
        }
        catch(error){
            res.status(500).json("Hubo un error del servidor: ", error.message)
        }
    }

    async darLike(req, res){
        try {
            const {recetaId, usuarioId} = req.body
            res.status(200).json(await UsuarioModel.darLike(recetaId, usuarioId))
        } catch (error) {
            res.status(500).json("Error al agregar un like - usuario.controller", error.message)
        }
    }

    async sacarLike(req, res){
        try {
            const {recetaId, usuarioId} = req.body
            res.status(200).json(await UsuarioModel.sacarLike(recetaId, usuarioId))
        } catch (error) {
            res.status(500).json("Error al sacar un like - usuario.controller", error.message)
        }
    }
}

module.exports = new UsuarioController();