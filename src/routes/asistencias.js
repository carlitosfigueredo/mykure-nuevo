const express = require('express');
const router = express.Router();
const db = require('../database');
const mysql2 = require('mysql2-promise');

router.get('/agregar/evento/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const evento = await db.query('SELECT * FROM evento WHERE idEvento = ?', [id])
        const tipoPersona = await db.query('SELECT idTipoPersona,descripcionTipoPersona FROM tipoPersona');
        const pulsera = await db.query('SELECT * FROM pulsera WHERE estadoPulsera = "disponible"');
        const alumno = await db.query('SELECT * FROM alumno');
        const personaRegistrada = await db.query('SELECT * FROM persona WHERE persona.idPersona NOT IN (SELECT persona.idPersona FROM asistenciaEvento JOIN persona ON asistenciaEvento.idPersona = persona.idPersona JOIN evento ON evento.idEvento = asistenciaEvento.idEvento WHERE evento.idEvento = ?)', [id]);
        res.render('asistencias/agregar', { tipoPersona, pulsera, evento: evento[0], personaRegistrada, alumno });
    } catch (error) {
        console.log(error);
        next;
    }
})

router.post('/agregar/evento/:id', async(req, res, next) => {
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
});

router.post('/agregar/registrados/evento/:id', async(req, res, next) => {
    const { idEvento, idPersona, idPulsera } = req.body;
    try {
        await db.query('START TRANSACTION');
        console.log('Se ejecuto el start transaction asistencia');
        await db.query('INSERT INTO asistenciaEvento(idEvento,idPulsera,idPersona) VALUES (?,?,?)', [idEvento, idPulsera, idPersona]);
        await db.query('UPDATE pulsera SET estadoPulsera = "entregado" WHERE idPulsera = ?', idPulsera);
        await db.query('COMMIT');
        console.log('commit realizado');
        req.flash('success', 'Asistencia Registrada');
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
    }
});
router.post('/agregar/alumno/registrados/evento/:id', async(req, res, next) => {
    const { idEvento, idPersona, idPulsera } = req.body;
    try {
        await db.query('START TRANSACTION');
        console.log('Se ejecuto el start transaction asistencia');
        await db.query('INSERT INTO asistenciaEvento(idEvento,idPulsera,idPersona) VALUES (?,?,?)', [idEvento, idPulsera, idPersona]);
        await db.query('UPDATE pulsera SET estadoPulsera = "entregado" WHERE idPulsera = ?', idPulsera);
        await db.query('COMMIT');
        console.log('commit realizado');
        req.flash('success', 'Asistencia Registrada');
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
    }
});

router.post('/agregar/alumno/nuevo/evento/:id', async(req, res, next) => {
    const { idAlumno, idEvento } = req.body;
    console.log(req.body);
    try {
        var alumnoData = await db.query('SELECT * FROM alumno WHERE idAlumno= ?', [idAlumno]);
    } catch (err) {
        req.flash('fail', err.code);
        next();
    }

    const nombreCompletoPersona = alumnoData[0].nombreCompletoAlumno;
    const sexoPersona = alumnoData[0].sexoAlumno;
    const cedulaPersona = alumnoData[0].cedulaAlumno;
    const { idTipoPersona, idPulsera } = req.body;
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
        req.flash('success', 'Asistencia Registrada');
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
    }
});

// router.get('/evento/:id', async(req, res, next) => {
//     const { id } = req.params;
//     const evento = await db.query('SELECT * FROM evento WHERE idEvento=?', [id]);
//     const persona = await db.query('SELECT * FROM persona JOIN asistenciaEvento ON persona.idPersona = asistenciaEvento.idPersona JOIN evento ON evento.idEvento = asistenciaEvento.idEvento JOIN pulsera ON pulsera.idPulsera = asistenciaEvento.idPulsera JOIN tipoPersona ON tipoPersona.idTipoPersona = persona.idTipoPersona WHERE evento.idEvento = ?', [id]);
//     res.render('asistencias/todos', { persona, evento: evento[0] });
// });

//Exportar modulos
module.exports = router;