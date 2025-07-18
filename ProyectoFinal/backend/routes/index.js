const express = require('express')
const Router = express.Router()
const RutasUsuario = require('./usuario.routes')
const RutasComentario = require('./comentario.routes')
const RutasReceta = require('./receta.routes')

Router.use('usuarios', RutasUsuario)
Router.use('comentarios', RutasComentario)
Router.use('recetas', RutasReceta)

module.exports = Router;