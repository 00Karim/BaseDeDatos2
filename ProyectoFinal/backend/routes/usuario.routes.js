const { Router } = require('express')
const RutasUsuario = Router()
const UsuarioController = require('../controllers/usuario.controller')

RutasUsuario.get('/', UsuarioController.validarCredenciales)

module.exports = RutasUsuario;