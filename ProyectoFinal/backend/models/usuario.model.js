const Usuario = require('./entities/usuario')

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
        try {
            const likes = await Usuario.updateOne(
                {_id: ObjectId(usuarioId)},
                {$push: {recetasLikeadas: recetaId}}
            )
            return likes
        } catch (error) {
            console.log("Hubo un error agregando el like");
            return null          
        }
    }

    sacarLike = async(recetaId, usuarioId) => {
        try {
            const likes = await Usuario.updateOne(
                {_id: ObjectId(usuarioId)},
                {$pull: {recetasLikeadas: recetaId}}
            )
            return likes
        } catch (error) {
            console.log("Hubo un error quitando el like");
            return null          
        }
    }
}

module.exports = new UsuarioModel()
