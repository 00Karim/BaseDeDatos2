const UsuariosModel = require('../models/usuario.model')

class UsuarioController{
    async validarCredenciales(req, res){
        try{
            const {email, contrasenia} = req.body
            res.status(200).json(await UsuariosModel.validarCredenciales(email, contrasenia))
        }
        catch(error){
            res.status(500).json("Hubo un error del servidor: ", error.message)
        }
    }
}

module.exports = new UsuarioController();