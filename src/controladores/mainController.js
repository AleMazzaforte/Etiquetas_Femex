const path = require('path');
const { connClientes } = require('../db/dbClientes');
const { connTransporte } = require('../db/dbTransportes');
const { connProductos  } = require('../db/dbProductos');
const { connEtiquetas  } = require('../db/dbEtiquetas');
const { Op } = require('sequelize');


module.exports = {

    getIndex: async (req, res, next) => {        
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

    getEtiquetas: async (req, res) => {
        res.render('etiquetas')
    },

 };
    


