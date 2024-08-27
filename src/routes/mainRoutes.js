const express = require('express');
const router = express.Router();
const controlador = require('../controladores/mainController');
// Importar los controladores
const authController = require('../controladores/authController');
const clienteController = require('../controladores/clienteController');
const productoController = require('../controladores/productoController');
const etiquetaController = require('../controladores/etiquetaController');
const autocompleteNombres = require('../controladores/buscarNombres')


router.get('/', authController.isAuthenticated, controlador.getIndex);

//Rutas de autenticación
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);

//RUtas de clientes
router.get('/gestion', authController.isAuthenticated, clienteController.getGestion);
router.post('/gestion/agregar', authController.isAuthenticated, clienteController.postAgregarCliente);
router.post('/eliminarCliente/:id', authController.isAuthenticated, clienteController.deleteCliente);
router.get('/modificarCliente/:id', authController.isAuthenticated, clienteController.getModificarForm);
router.post('/gestion/modificar/:id', authController.isAuthenticated, clienteController.postModificarCliente);
router.get('/gestion/buscarCliente', authController.isAuthenticated, clienteController.buscarCliente);
router.get('/gestion/buscarNombres',authController.isAuthenticated, clienteController.buscarNombresClientes);

router.get('/gestionRMA', authController.isAuthenticated, controlador.getCargaRma);



//Rutas de productos
router.post('/gestion/cargarProducto', authController.isAuthenticated, productoController.cargarProducto);
router.post('/gestion/borrarProducto/:id', authController.isAuthenticated, productoController.deleteProducto);
router.get('/gestion/editarProducto/:id', authController.isAuthenticated, productoController.getEditarProducto);
router.post('/gestion/editarProducto/:id', authController.isAuthenticated, productoController.postEditarProducto);
router.get('/gestion/mostrarRma', authController.isAuthenticated, productoController.mostrarRma);

//rutas de etiquetas
router.get('/etiquetas', authController.isAuthenticated, controlador.getEtiquetas);
router.get('/etiquetas/buscar', authController.isAuthenticated, etiquetaController.getBuscarClienteEtiquetas);

//ruta buscador de clientes para autocomplete
router.get('/buscarNombres', authController.isAuthenticated, autocompleteNombres.getAutocompleteNombres);

module.exports = router;
