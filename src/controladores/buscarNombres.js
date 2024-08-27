// buscarNombres.js.js
const { connClientes } = require('../db/dbClientes'); // Reemplaza con la ruta correcta

async function obtenerListadoNombres() {
    
    const [rows] = await connClientes.query('SELECT nombreCliente FROM clientesFemex');
    return rows.map(row => row.nombreCliente); // Retorna un array de nombres
}

module.exports = { 
    getAutocompleteNombres: async (req, res) => {
        const query = req.query.q;
        
        try {
            const listadoNombres = await obtenerListadoNombres();
            const resultados = listadoNombres.filter(nombre =>
                nombre.toLowerCase().includes(query.toLowerCase())
            );
            res.json(resultados);
        } catch (error) {
            res.status(500).json({ error: 'Error al buscar nombres' });
        }
    }
 };
