const path = require('path');
const { connClientes } = require('../db/dbClientes');
const { connTransporte } = require('../db/dbTransportes');
const { connProductos  } = require('../db/dbProductos');
const { connEtiquetas  } = require('../db/dbEtiquetas');


module.exports = {
    getIndex: async (req, res) => {        
        res.render('index', { cliente: null, productos:[]})
    },

    getCargaRma: async (req, res) => {
        res.render('cargaRma', { cliente:null })
    },

    getGestion: async (req,res) => {
        try {
            // Consulta a la base de datos para obtener los clientes
            const [clientes] = await connClientes.query('SELECT * FROM clientesFemex');
            
            // Renderizar la vista y pasar los datos de los clientes
            res.render('gestionClientes', { clientes });
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
            res.status(500).send('Error al obtener los clientes');
        }
    },

    postAgregarCliente: async (req, res) => {

        const { nombreCliente, cuit, provincia, localidad, domicilio, telefono, codigoPostal, transporte,         seguro, condicionDeEntrega, condicionDePago} = req.body;

        try {
            await connClientes.execute(
                'INSERT INTO clientesFemex (nombreCliente, cuit, provincia, localidad, domicilio, telefono, codigoPostal, transporte, seguro, condicionDeEntrega, condicionDePago) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [nombreCliente, cuit, provincia, localidad, domicilio, telefono, codigoPostal, transporte, seguro, condicionDeEntrega, condicionDePago]
            );
            res.redirect('/gestion');
        } catch (error) {
            console.error('Error al agregar cliente:', error);
            res.status(500).send('Error al agregar cliente');
        }
    }, 

    deleteCliente: async (req, res) => {
        const { id } = req.params;
        
        try {            
            await connClientes.query('DELETE FROM clientesFemex WHERE id = ?', [id]);
            res.redirect('/gestion');
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            res.status(500).send('Error al eliminar cliente');
        }
    },

    buscarCliente: async (req, res) => {
        const { buscarCliente } = req.query;
        try {
            const [clientes] = await connClientes.query('SELECT * FROM clientesFemex WHERE nombreCliente LIKE ?', [`%${buscarCliente}%`]);
    
            if (clientes.length > 0) {
                res.render('cargaRma', { cliente: clientes[0] });
            } else {
                res.render('cargaRma', { cliente: null });
            }
        } catch (error) {
            console.error('Error al buscar cliente:', error);
            res.status(500).send('Error al buscar cliente');
        }
    },

    cargarProducto: async (req, res) => {

        const { clienteId, modelo, cantidad, solicita, opLote, vencimiento, seEntrega, seRecibe, observacion, numeroDeIngreso, numDeEgreso } = req.body;
        
        try {
            await connProductos.query(
                'INSERT INTO productosFemex (modelo, cantidad, solicita, opLote, vencimiento, seEntrega, seRecibe, observacion, numeroDeIngreso, numDeEgreso, clientesFemex_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [modelo, cantidad, solicita, opLote, vencimiento, seEntrega, seRecibe, observacion, numeroDeIngreso, numDeEgreso, clienteId]
            );
            res.redirect('/gestion/buscarCliente');
        } catch (error) {
            console.error('Error al cargar el producto:', error);
            res.status(500).send('Error al cargar el producto');
        }
    },
    // mostrar los RMA de un cliente
    mostrarRma: async (req, res) => {
        const { cliente } = req.query;
        try {
            // Ajusta para acceder solo a los datos
            const [clienteData] = await connClientes.query('SELECT * FROM clientesFemex WHERE nombreCliente = ?', [cliente]);
            

            if (clienteData.length > 0) {
                const clienteId = clienteData[0].id;
                
                // Accede solo a los datos del array
                const [productos] = await connProductos.query('SELECT * FROM productosFemex WHERE clientesFemex_id = ?', [clienteId]);
    
              
    
                res.render('index', { cliente: clienteData[0], productos });
            } else {
                console.log('Cliente no encontrado.');
                res.render('index', { cliente: null, productos: [] });
            }
        } catch (error) {
            console.error('Error al buscar el cliente:', error);
            res.status(500).send('Error al buscar el cliente');
        }
    },
    
    
    

    // Método para mostrar el formulario de modificación
    getModificarForm: async (req, res) => {
        const { id } = req.params;

        try {
            const [cliente] = await connClientes.query('SELECT * FROM clientesFemex WHERE id = ?', [id]);

            if (cliente.length > 0) {
                res.render('modificarCliente', { cliente: cliente[0] });
            } else {
                res.status(404).send('Cliente no encontrado');
            }
        } catch (error) {
            console.error('Error al obtener los datos del cliente:', error);
            res.status(500).send('Error al obtener los datos del cliente');
        }
    },

    // Método para manejar la modificación del cliente
    postModificarCliente: async (req, res) => {
        const { id } = req.params;
        const {
            nombreCliente, cuit, provincia, localidad, domicilio, telefono, codigoPostal, transporte, seguro, condicionDeEntrega, condicionDePago
        } = req.body;

        try {
            await connClientes.query(
                'UPDATE clientesFemex SET nombreCliente = ?, cuit = ?, provincia = ?, localidad = ?, domicilio = ?, telefono = ?, codigoPostal = ?, transporte = ?, seguro = ?, condicionDeEntrega = ?, condicionDePago = ? WHERE id = ?',
                [nombreCliente, cuit, provincia, localidad, domicilio, telefono, codigoPostal, transporte, seguro, condicionDeEntrega, condicionDePago, id]
            );

            res.redirect('/gestion'); // Redirige de nuevo a la página de gestión de clientes
        } catch (error) {
            console.error('Error al modificar el cliente:', error);
            res.status(500).send('Error al modificar el cliente');
        }
    },
}

