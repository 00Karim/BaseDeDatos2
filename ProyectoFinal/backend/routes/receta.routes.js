const { Router } = require('express')
const RutasRecetas = Router()
const RecetasController = require('../controllers/receta.controller')
const recetaController = require('../controllers/receta.controller')

RutasRecetas.get('/buscar/:ingrediente', RecetasController.buscarPorIngrediente)
RutasRecetas.get('/top', RecetasController.verTopRecetas)

RutasRecetas.post('/crearReceta', recetaController.crearReceta)

RutasRecetas.put('/sumarLike', RecetasController.sumarLike)
RutasRecetas.put('/restarLike', RecetasController.restarLike)

module.exports = RutasRecetas;