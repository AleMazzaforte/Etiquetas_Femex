const mysql = require('mysql2');


const poolClientes = mysql.createPool({
    host: "sql10.freesqldatabase.com",
    user: "sql10719775",
    password: "8JU5Mvr2N2",
    database: "sql10719775",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0
}) 


module.exports = {
    connClientes: poolClientes.promise()
}
