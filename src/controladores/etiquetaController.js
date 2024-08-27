const { connClientes } = require('../db/dbClientes');
const { connProductos } = require('../db/dbProductos');

module.exports = {


    getBuscarClienteEtiquetas: async (req, res) => {
        const { name } = req.query;
        try {
        // Buscar cliente
        const [cliente] = await connClientes.query('SELECT * FROM clientesFemex WHERE nombreCliente LIKE ?', [`%${name}%`]);

        if (cliente.length > 0) {
            const clienteData = cliente[0];

            // Verificar si el cliente tiene productos (RMA)
            const [productos] = await connProductos.query('SELECT * FROM productosFemex WHERE clientesFemex_id = ?', [clienteData.id]);

            res.json({ cliente: clienteData, productos });
        } else {
            res.json({ cliente: null, productos: [] });
        }
        } catch (error) {
        console.error('Error al buscar el cliente:', error);
        res.status(500).send('Error al buscar el cliente');
        }
    }

}
