const { Router } = require('express')
const RutasUsuario = Router()
const UsuarioController = require('../controllers/usuario.controller')

RutasUsuario.get('/', UsuarioController.validarCredenciales)

RutasUsuario.put('/darLike', UsuarioController.darLike)
RutasUsuario.put('/sacarLike', UsuarioController.sacarLike)

module.exports = RutasUsuario;