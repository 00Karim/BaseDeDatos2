const { Router } = require('express')
const RutasUsuario = Router()
const UsuarioController = require('../controllers/usuario.controller')

RutasUsuario.post('/', UsuarioController.validarCredenciales)

RutasUsuario.put('/darLike', UsuarioController.darLike)
RutasUsuario.put('/sacarLike', UsuarioController.sacarLike)

module.exports = RutasUsuario;