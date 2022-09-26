const mysql = require('mysql');
const { database } = require('./config');
const { promisify } = require('util');
const conexion = mysql.createPool(database);
conexion.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONECTION_LOST') {
            console.log('La conexion con la base de datos se ha perdido');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('Demasiadas conexiones en la base de datos');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('La conexion ha sido rechazada');
        } else {
            console.log(err);
        }
    }
    if (connection) {
        connection.release();
        console.log('La base de datos ha sido conectada');
        return;
    }
});
conexion.query = promisify(conexion.query); // convertir query a promesas para usar async await
module.exports = conexion;