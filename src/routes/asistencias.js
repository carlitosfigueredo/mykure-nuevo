const express = require('express');
const router = express.Router();
const db = require('../database');
const mysql2 = require('mysql2-promise');

router.get('/agregar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const evento = await db.query('SELECT * FROM evento WHERE idEvento = ?', [id])
        const tipoPersona = await db.query("SELECT idTipoPersona,descripcionTipoPersona FROM tipoPersona");
        const pulsera = await db.query('SELECT * FROM pulsera WHERE estadoPulsera = "disponible"');
        res.render('asistencias/agregar', { tipoPersona, pulsera, evento: evento[0] });
    } catch (error) {
        console.log(error);
        next;
    }

})

router.post('/agregar/:id', async(req, res, next) => {
    data = req.body;
    console.log(data);
    const { idEvento, nombreCompletoPersona, sexoPersona, idTipoPersona, cedulaPersona, idPulsera } = req.body;
    newPersona = {
        nombreCompletoPersona,
        sexoPersona,
        cedulaPersona,
        idTipoPersona
    }
    try {
        await db.query('START TRANSACTION');
        console.log('Se ejecuto el start transaction persona');
        await db.query('INSERT INTO persona SET ?', [newPersona]);
        await db.query('COMMIT');
        console.log('Persona agregada');
    } catch (err) {
        await db.query('ROLLBACK');
        console.log(err);
        req.flash('fail', 'Error. ' + err.code);
        next();
    };
    var persona = await db.query('SELECT idPersona FROM persona WHERE cedulaPersona= ?', [cedulaPersona]);
    const idPersona = persona[0].idPersona;
    try {
        await db.query('START TRANSACTION');
        console.log('Se ejecuto el start transaction asistencia');
        await db.query('INSERT INTO asistenciaEvento(idEvento,idPulsera,idPersona) VALUES (?,?,?)', [idEvento, idPulsera, idPersona]);
        await db.query('UPDATE pulsera SET estadoPulsera = "entregado" WHERE idPulsera = ?', idPulsera);
        await db.query('COMMIT');
        console.log('commit realizado');
        req.flash('success', 'Persona y evento agregado.');
        res.redirect('/asistencias/agregar/' + idEvento);
    } catch (err) {
        console.log(err);
        if (err.code === 'ER_DUP_ENTRY') {
            await db.query('ROLLBACK');
            req.flash('fail', 'Se ha encontrado un valor duplicado' + err.sqlMessage);
            next();
        } else {
            await db.query('ROLLBACK');
            console.log('rollback realizado');
            req.flash('fail', 'Error. ' + err.code);
            next();
        }

    };

    // await db.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    // console.log('Se ejecuto el set transaction');
    // await db.beginTransaction();
    // try {
    //     db.execute('INSERT INTO persona SET ?', [newPersona]);
    //     await connection.commit();
    // } catch (err) {
    //     db.rollback();
    //     console.info('ROLLBACK de la transaccion PERSONA');
    //     req.flash('fail', err.code)
    //     console.log(err);
    //     next();
    // }


    // [Object: null prototype] {
    //   nombreCompletoPersona: 'Bruno Nuñez',
    //   cedulaPersona: '000931238',
    //   sexoPersona: 'M',
    //   idTipoPersona: '2',
    //   idPulsera: '1'
    // }
    // const idPersona = await db.query('SELECT idPersona FROM persona WHERE cedulaPersona = ?', [cedulaPersona]);
    // console.log(idPersona);
    // const { idEvento, idAlumno } = req.body;
    // const newPersonaAlumno = {

    // }
    // await db.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    // console.log('Finished setting the isolation level to read committed');
    // try {
    //     next();
    // } catch (error) {
    //     flash.mess
    // }

});


//Exportar modulos
module.exports = router;