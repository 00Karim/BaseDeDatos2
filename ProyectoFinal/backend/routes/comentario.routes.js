const { Router } = require('express')
const RutasComentarios = Router()
const ComentariosController = require('../controllers/comentario.controller')

// Aca van las rutas
RutasComentarios.post("/", ComentariosController.hacerComentario)

module.exports = RutasComentarios;