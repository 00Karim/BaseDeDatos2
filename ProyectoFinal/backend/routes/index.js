const express = require('express')
const router = express.Router()
const RutasUsuario = require('./usuario.routes')
const RutasComentario = require('./comentario.routes')
const RutasReceta = require('./receta.routes')

router.use('/usuarios', RutasUsuario)
router.use('/comentarios', RutasComentario)
router.use('/recetas', RutasReceta)

module.exports = router;