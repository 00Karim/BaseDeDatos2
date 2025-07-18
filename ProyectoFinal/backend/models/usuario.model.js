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
}

module.exports = new UsuarioModel()
