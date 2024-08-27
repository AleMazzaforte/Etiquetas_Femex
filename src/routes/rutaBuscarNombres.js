const express = require('express');
const router = express.Router();
const controlador = require('../controladores/buscarNombres');
const { connClientes } = require('../db/dbClientes');

// Ruta para buscar nombres de clientes
router.get('/buscarNombres', async (req, res) => {
    try {
        const term = req.query.term;
        if (!term) {
            return res.json([]);
        }

        const [rows] = await connClientes.query(`
            SELECT nombreCliente FROM clientesFemex 
            WHERE nombreCliente LIKE ? 
            LIMIT 10
        `, [`%${term}%`]);

        console.log('Resultados de la búsqueda:', rows); // Depuración

        const nombres = rows.map(row => row.nombreCliente);
        res.json(nombres);
    } catch (error) {
        console.error('Error al buscar nombres:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;

