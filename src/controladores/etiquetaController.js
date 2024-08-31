const { connClientes } = require('../db/dbClientes');
const { connProductos } = require('../db/dbProductos');
const { getEtiquetas } = require('./mainController');

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
      
            // Buscar datos del remitente
            const [remitente] = await connClientes.query('SELECT * FROM datosRemitente WHERE nombreRemitente = ?', [clienteData.nombreCliente]);
      
            if (remitente.length > 0) {
              const remitenteData = remitente[0];
              if (productos.length > 0) {
                res.json({
                  cliente: clienteData,
                  productos,
                  remitente: remitenteData,
                  alert: 'El cliente tiene productos asociados'
                });
              } else {
                res.json({
                  cliente: clienteData,
                  productos: [],
                  remitente: remitenteData
                });
              }
            } else {
              if (productos.length > 0) {
                res.json({
                  cliente: clienteData,
                  productos,
                  remitente: null,
                  alert: 'El cliente tiene productos asociados'
                });
              } else {
                res.json({
                  cliente: clienteData,
                  productos: [],
                  remitente: null
                });
              }
            }
          } else {
            res.json({ cliente: null, productos: [], remitente: null });
          }
        } catch (error) {
          console.error('Error al buscar el cliente:', error);
          res.status(500).send('Error al buscar el cliente');
        }
      },

    getCargaRemitente: (req, res) => {
        res.render('cargaRemitente')
    }

}
