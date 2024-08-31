const path = require('path');
const { connProductos  } = require('../db/dbProductos');

module.exports = {

    getStock: async (req, res) => {
        
        try {
          const [productos] = await connProductos.query(
            'SELECT modelo, SUM(cantidad) AS cantidad_total FROM productosFemex GROUP BY modelo'
          );
          res.render('stock', { productos });
        } catch (error) {
          console.error(error);
          res.status(500).send('Error al obtener los productos');
        }
      }   
}
