const { connProductos } = require('../db/dbProductos');
const { connClientes } = require('../db/dbClientes');

module.exports = {


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
    //borrar producto
    deleteProducto: async (req, res) => {
        const { id } = req.params;
        const { clienteId } = req.body; // Asegúrate de que el ID del cliente esté disponible en el formulario.
        try {
            await connProductos.query('DELETE FROM productosFemex WHERE id = ?', [id]);
            res.redirect(`/?clienteId=${clienteId}`); // Redirige al cliente seleccionado para que se mantenga
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).send('Error al eliminar el producto');
        }
    },


    // Método para mostrar el formulario de edición del producto
    getEditarProducto: async (req, res) => {
        const { id } = req.params;

        try {
            const [producto] = await connProductos.query('SELECT * FROM productosFemex WHERE id = ?', [id]);

            if (producto.length > 0) {
                res.render('editarProducto', { producto: producto[0] });
            } else {
                res.status(404).send('Producto no encontrado');
            }
        } catch (error) {
            console.error('Error al obtener los datos del producto:', error);
            res.status(500).send('Error al obtener los datos del producto');
        }
    },

    // Método para manejar la actualización del producto
    postEditarProducto: async (req, res) => {
        const { id } = req.params;
        const { modelo, cantidad, solicita, opLote, vencimiento, seEntrega, seRecibe, observacion, numeroDeIngreso, numDeEgreso } = req.body;

        try {
            await connProductos.query(
                'UPDATE productosFemex SET modelo = ?, cantidad = ?, solicita = ?, opLote = ?, vencimiento = ?, seEntrega = ?, seRecibe = ?, observacion = ?, numeroDeIngreso = ?, numDeEgreso = ? WHERE id = ?',
                [modelo, cantidad, solicita, opLote, vencimiento, seEntrega, seRecibe, observacion, numeroDeIngreso, numDeEgreso, id]
            );
            res.redirect('/'); // Redirige después de editar
        } catch (error) {
            console.error('Error al editar el producto:', error);
            res.status(500).send('Error al editar el producto');
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
    }
}
