const { connClientes } = require('../db/dbClientes');

module.exports = {
  handleFormSubmission: async (req, res) => {
    const { nombreRemitente, cuitRemitente, direccionRemitente, telefonoRemitente, cPostalRemitente } = req.body;
    
    try {
      const result = await connClientes.query(`INSERT INTO datosRemitente (nombreRemitente, cuitRemitente, direccionRemitente, telefonoRemitente, cPostalRemitente) VALUES (?, ?, ?, ?, ?);`, [nombreRemitente, cuitRemitente, direccionRemitente, telefonoRemitente, cPostalRemitente]);
      res.send('Datos insertados correctamente');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al insertar datos en la base de datos');
    }
  },
  fetchCards: async (req, res) => {
    try {
      const [rows] = await connClientes.query('SELECT * FROM datosRemitente');
      const datos = rows.map((row) => {
        return {
          nombreRemitente: row.nombreRemitente,
          cuitRemitente: row.cuitRemitente,
          direccionRemitente: row.direccionRemitente,
          telefonoRemitente: row.telefonoRemitente,
          cPostalRemitente: row.cPostalRemitente
        };
      });
      
      res.json(datos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  }


};