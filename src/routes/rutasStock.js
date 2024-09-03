const express = require('express');
const router = express.Router();
const controlador = require('../controladores/stockController');
const authController = require('../controladores/authController');



router.get('/stock', authController.isAuthenticated, controlador.getStock);
router.get('/stock', authController.isAuthenticated, controlador.getStock);
router.post('/stock/borrarProductos', authController.isAuthenticated, controlador.deleteProductos);

module.exports = router;
