// clienteController.js
const { connClientes } = require('../db/dbClientes');
const { Op } = require('sequelize');

module.exports = {
    getGestion: async (req, res) => {
        try {
            const [clientes] = await connClientes.query('SELECT * FROM clientesFemex');
            res.render('gestionClientes', { clientes });
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
            res.status(500).send('Error al obtener los clientes');
        }
    },

    postAgregarCliente: async (req, res) => {
        const { nombreCliente, cuit, provincia, localidad, domicilio, telefono, codigoPostal, transporte, seguro, condicionDeEntrega, condicionDePago } = req.body;

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

    buscarNombresClientes: async (req, res) => {
        try {
            const { term } = req.query;
            const resultados = await connClientes.findAll({
                where: {
                    nombreCliente: {
                        [Op.like]: `%${term}%`
                    }
                },
                limit: 10
            });
            res.json(resultados.map(cliente => cliente.nombreCliente));
        } catch (error) {
            res.status(500).json({ error: 'Error al buscar clientes' });
        }
    },

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

    postModificarCliente: async (req, res) => {
        const { id } = req.params;
        const { nombreCliente, cuit, provincia, localidad, domicilio, telefono, codigoPostal, transporte, seguro, condicionDeEntrega, condicionDePago } = req.body;

        try {
            await connClientes.query(
                'UPDATE clientesFemex SET nombreCliente = ?, cuit = ?, provincia = ?, localidad = ?, domicilio = ?, telefono = ?, codigoPostal = ?, transporte = ?, seguro = ?, condicionDeEntrega = ?, condicionDePago = ? WHERE id = ?',
                [nombreCliente, cuit, provincia, localidad, domicilio, telefono, codigoPostal, transporte, seguro, condicionDeEntrega, condicionDePago, id]
            );
            res.redirect('/gestion');
        } catch (error) {
            console.error('Error al modificar el cliente:', error);
            res.status(500).send('Error al modificar el cliente');
        }
    }
};
