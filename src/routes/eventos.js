const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');

//Metodo listar todos OK
router.get('/', async(req, res, next) => {
    try {
        const eventos = await db.query('SELECT * FROM evento LEFT JOIN ubicacion ON evento.idUbicacion = evento.idUbicacion LEFT JOIN lugar ON ubicacion.idLugar = lugar.idLugar');
        console.log(eventos);
        res.render('eventos/todos', { eventos });
    } catch (err) {
        console.log(err);
        next();
    }
});

router.get('/todos', async(req, res, next) => {
    try {
        const eventos = await db.query('SELECT * FROM evento LEFT JOIN ubicacion ON evento.idUbicacion = evento.idUbicacion LEFT JOIN lugar ON ubicacion.idLugar = lugar.idLugar');
        res.render('eventos/todos', { eventos });
    } catch (err) {
        console.log(err);
        next();
    }
});

//Para agregar idEvento	nombreEvento	fechaEvento	idUbicacion	horarioDesdeEvento	horarioHastaEvento	estadoEvento

router.get('/agregar', async(req, res) => {
    const ubicacion = await db.query("SELECT idUbicacion,nombreUbicacion,nombreLugar FROM ubicacion JOIN lugar ON ubicacion.idLugar = lugar.idLugar");
    res.render('eventos/agregar', { ubicacion });
});


//Metodo Agregar
router.post('/agregar', async(req, res) => {
    console.log(req.body);
    const { nombreEvento, fechaEvento, idUbicacion, estadoEvento } = req.body;
    const newEvento = {
        nombreEvento,
        fechaEvento,
        idUbicacion,
        estadoEvento
    };
    try {
        await db.query("INSERT INTO evento SET ?", [newEvento]);
        req.flash('success', 'Evento agregado correctamente');
        res.redirect('/eventos/todos');
    } catch (err) {
        console.log(err);
        req.flash('fail', 'Error. ' + err.code);
    }

});

router.get('/asistencia/:id', async(req, res, next) => {
    const { id } = req.params;
    const evento = await db.query('SELECT * FROM evento WHERE idEvento = ?', [id]);
    const asistencia = await db.query('SELECT * FROM asistenciaEvento JOIN persona ON asistenciaEvento.idPersona = persona.idPersona JOIN pulsera ON asistenciaEvento.idPulsera = pulsera.idPulsera JOIN evento ON evento.idEvento = asistenciaEvento.idEvento WHERE evento.idEvento = ?', [id]);
    res.render('eventos/asistencia', { evento: evento[0], asistencia });

});

router.post('/sorteo/guardar-ganador/:id', async(req, res, next) => {
    const { id } = req.params;
    const idPulsera = req.body;
    try {
        console.log({ id });
        db.query('UPDATE pulsera SET PulseraGanador = 1 WHERE idPulsera =? ', [idPulsera]);
        req.flash('success', 'Ganador guardado correctamente')
        res.redirect('/sorteo/' + id);
    } catch (err) {
        console.log(err);
        req.flash('fail', err.code);
        res.redirect('/sorteo/' + id);
        next();
    }
});

router.get('/sorteo/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        console.log({ id });
        const evento = await db.query('SELECT * FROM evento WHERE idEvento = ?', [id]);
        const codigos = await db.query('SELECT pulsera.idPulsera,pulsera.codigoPulsera,pulsera.estadoPulsera FROM pulsera JOIN asistenciaEvento ON asistenciaEvento.idPulsera = pulsera.idPulsera JOIN evento ON evento.idEvento = asistenciaEvento.idEvento WHERE evento.idEvento =? and (pulsera.PulseraGanador = 0) and (estadoPulsera = "entregado")', [id]);
        const ganador = await db.query('SELECT pulsera.idPulsera,pulsera.codigoPulsera,pulsera.estadoPulsera,persona.nombreCompletoPersona,persona.cedulaPersona FROM pulsera JOIN asistenciaEvento ON asistenciaEvento.idPulsera = pulsera.idPulsera JOIN evento ON evento.idEvento = asistenciaEvento.idEvento JOIN persona ON asistenciaEvento.idPersona = persona.idPersona WHERE evento.idEvento =? and (pulsera.PulseraGanador = 0) and (estadoPulsera = "entregado") ORDER BY RAND() LIMIT 1', [id])
        console.log(ganador);
        res.render('eventos/sorteo', { evento: evento[0], codigos, ganador: ganador[0] });
    } catch (err) {
        console.log(err);
        next();
    }
});

//Metodo Eliminar
router.get('/eliminar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM evento WHERE idEvento = ?", [id]);
        req.flash('warning', 'El evento ha sido eliminado correctamente.');
        res.redirect('/eventos');
    } catch (err) {
        console.log(err);
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
            req.flash('fail', 'No se puede eliminar el evento si hay datos cargados para el mismo');
            res.redirect('/eventos');
            next();
        } else {
            req.flash('fail', 'Error. ' + err.code);
            res.redirect('/eventos');
            next();
        }

    };
});

router.get('/terminar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE evento SET estadoEvento = "terminado" WHERE idEvento =? ', [id])
        req.flash('success', 'Evento Terminado');
        res.redirect('/eventos');
    } catch (err) {
        console.log(err);
        req.flash('fail', 'No se pudo terminar el evento. ' + err.code);
        res.redirect('/eventos');
        next();
    };
});
//Metodos Editar
router.get('/editar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const ubicacion = await db.query("SELECT idUbicacion,nombreUbicacion,nombreLugar FROM ubicacion JOIN lugar ON ubicacion.idLugar = lugar.idLugar");
        evento = await db.query('SELECT * FROM evento WHERE idEvento = ?', [id]);
        res.render('eventos/editar', { evento: evento[0], ubicacion })
    } catch (err) {
        console.log(err);
        req.flash('fail', 'Error. ' + err.code);
    }
});

router.post('/editar/:id', async(req, res, next) => {
    const { id } = req.params;
    console.log(req.body);
    const { nombreEvento, fechaEvento, idUbicacion, estadoEvento } = req.body;
    const newEvento = {
        nombreEvento,
        fechaEvento,
        idUbicacion,
        estadoEvento
    };
    try {
        await db.query("UPDATE evento SET ? WHERE idEvento = ?", [newEvento, id]);
        req.flash('warning', 'Evento editado correctamente');
        res.redirect('/eventos/todos');
    } catch (err) {
        console.log(err);
        req.flash('fail', 'Error. ' + err.code);
        next();
    }
});


router.get('/ver/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const evento = await db.query('SELECT * FROM evento WHERE idEvento = ?', [id]);
        const pulseras = await db.query('SELECT COUNT(pulsera.idPulsera) as entregadas FROM pulsera JOIN asistenciaEvento ON asistenciaEvento.idPulsera = pulsera.idPulsera JOIN evento ON evento.idEvento = asistenciaEvento.idEvento WHERE evento.idEvento = ?', [id]);
        const asistencia = await db.query('SELECT COUNT(asistenciaEvento.idPersona) as asistencias FROM asistenciaEvento JOIN persona ON asistenciaEvento.idPersona = persona.idPersona JOIN evento ON evento.idEvento = asistenciaEvento.idEvento WHERE evento.idEvento = ?', [id]);
        res.render('eventos/ver', { evento: evento[0], pulseras: pulseras[0], asistencia: asistencia[0] })

    } catch (err) {
        console.log(err);
        req.flash('fail', 'Error al obtener datos. ' + err.code);
        res.redirect('/eventos/todos');
        next();
    }
});


//Exportar modulos
module.exports = router;