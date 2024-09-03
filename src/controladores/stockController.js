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
    },
    
    deleteProductos: async (req, res) => {
      const action = req.body.action;
      const productos = req.body.productos;

      try {
          if (action === 'borrarSeleccionados' && productos) {
              const placeholders = productos.map(() => '?').join(',');
              const query = `DELETE FROM productosFemex WHERE modelo IN (${placeholders})`;
              await connProductos.query(query, productos);
          } else if (action === 'borrarTodos') {
              await connProductos.query('DELETE FROM productosFemex');
          }
          res.redirect('/stock');
      } catch (error) {
          console.error(error);
          res.status(500).send('Error al borrar los productos');
      }
  }
}
