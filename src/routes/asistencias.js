const express = require('express');
const router = express.Router();
const db = require('../database');
const mysql2 = require('mysql2-promise');

router.get('/agregar', async(req, res, next) => {
    try {
        const alumno = await db.query("SELECT * FROM alumno");
        const tipoPersona = await db.query("SELECT idTipoPersona,descripcionTipoPersona FROM tipoPersona")
        console.log(tipoPersona);
        res.render('asistencias/agregar', { alumno, tipoPersona });
    } catch (error) {
        console.log(error);
        next;
    }

})

router.post('/agregar/:idEvento/persona/alumno/:idAlumno', async(req, res, next) => {
    const { idEvento, idAlumno } = req.body;
    const newPersonaAlumno = {

    }
    await db.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    console.log('Finished setting the isolation level to read committed');
    try {
        next();
    } catch (error) {
        flash.mess
    }

});


//Exportar modulos
module.exports = router;