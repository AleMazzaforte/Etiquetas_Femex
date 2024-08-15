const express = require('express');
const router = express.Router();
const controlador = require('../controladores/mainController')


router.get('/', controlador.getIndex);
router.get('/gestion', controlador.getGestion);
router.get('/gestionRMA', controlador.getCargaRma)
router.get('/gestion/buscarCliente', controlador.buscarCliente);
router.get('/gestion/mostrarRma', controlador.mostrarRma)
//carga RMA
router.post('/gestion/cargarProducto', controlador.cargarProducto);
//carga de cliente
router.post('/gestion/agregar', controlador.postAgregarCliente)
// Ruta para eliminar un cliente
router.post('/eliminarCliente/:id', controlador.deleteCliente);
// Ruta para mostrar el formulario de modificación
router.get('/modificarCliente/:id', controlador.getModificarForm);

// Ruta para procesar la modificación del cliente
router.post('/gestion/modificar/:id', controlador.postModificarCliente);

module.exports = router;
