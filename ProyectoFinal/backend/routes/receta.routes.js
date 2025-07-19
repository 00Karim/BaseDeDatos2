const { Router } = require('express')
const RutasRecetas = Router()
const RecetasController = require('../controllers/receta.controller')

RutasRecetas.get('/:ingrediente', RecetasController.buscarPorIngrediente)
RutasRecetas.get('/top', RecetasController.verTopRecetas)

RutasRecetas.put('/sumarLike', RecetasController.sumarLike)
RutasRecetas.put('/restarLike', RecetasController.restarLike)

module.exports = RutasRecetas;