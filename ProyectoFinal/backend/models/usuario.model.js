const Usuario = require('./entities/usuario')
const mongoose = require('mongoose')

class UsuarioModel{
    validarCredenciales = async(email, contrasenia) => {
        try {
            const usuario = await Usuario.findOne({email: email, contrasenia: contrasenia})
            return usuario // devolvemos el usuario para poder extraer el id y usarlo en las operaciones donde se necesita un id del usuario
        } catch (error) {
            console.log("Hubo un error validando las credenciales: ", error.message);
            return null
        }
    }

    darLike = async(recetaId, usuarioId) => {
        const usuarioObjId = new mongoose.Types.ObjectId(usuarioId);
        const recetaObjId = new mongoose.Types.ObjectId(recetaId);
        try {
            const likes = await Usuario.updateOne(
                { _id: usuarioObjId },
                { $push: { recetasLikeadas: recetaObjId } }
            );
            return likes
        } catch (error) {
            console.log("Hubo un error agregando el like - usuario.model");
            return null          
        }
    }

    sacarLike = async(recetaId, usuarioId) => {
        const usuarioObjId = new mongoose.Types.ObjectId(usuarioId);
        const recetaObjId = new mongoose.Types.ObjectId(recetaId);
        try {
            const likes = await Usuario.updateOne(
                { _id: usuarioObjId },
                { $pull: { recetasLikeadas: recetaObjId } }
            );
            return likes
        } catch (error) {
            console.log("Hubo un error quitando el like - usuario.model: ", error.message);
            return null          
        }
    }
}

module.exports = new UsuarioModel()
