const express = require('express');
const router = express.Router();
const controlador = require('../controladores/mainController');
// Importar los controladores
const authController = require('../controladores/authController');
const clienteController = require('../controladores/clienteController');
const productoController = require('../controladores/productoController');
const etiquetaController = require('../controladores/etiquetaController');
const autocompleteNombres = require('../controladores/buscarNombres')
const cargaRemitente = require('../controladores/cargaRemitente');
const { connClientes } = require('../db/dbClientes');

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
router.get('/cargaRemitente', authController.isAuthenticated, etiquetaController.getCargaRemitente)
router.post('/cargaRemitente', authController.isAuthenticated, cargaRemitente.handleFormSubmission);
router.get('/api/datos', authController.isAuthenticated, cargaRemitente.fetchCards)
// Ruta para actualizar un remitente
router.put('/api/remitentes/:nombreRemitente', async (req, res) => {
    const nombreRemitente = req.params.nombreRemitente;
    const datos = req.body;
  
    try {
      // Actualizar los datos del remitente en la base de datos
      const query = 'UPDATE datosRemitente SET ? WHERE id = ?';
      const result = await connClientes.execute(query, [datos, nombreRemitente]);
  
      res.json({ message: 'Datos modificados con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el remitente' });
    }
  });
  
  // Ruta para eliminar un remitente
  router.delete('/api/remitentes/:nombreRemitente', async (req, res) => {
    const nombreRemitente = req.params.nombreRemitente;
  
    try {
      // Eliminar el remitente de la base de datos
      const query = 'DELETE FROM datosRemitente WHERE nombreRemitente = ?';
      const result = await connClientes.execute(query, [nombreRemitente]);
  
      res.json({ message: 'Remitente eliminado con éxito (mainRutes)' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el remitente' });
    }
  });

//ruta buscador de clientes para autocomplete
router.get('/buscarNombres', authController.isAuthenticated, autocompleteNombres.getAutocompleteNombres);

module.exports = router;
