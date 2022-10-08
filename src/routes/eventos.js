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

router.get('/sorteo/evento/:id', async(req, res, next) => {
    const { id } = req.params;
    const pulseras = await db.query('');
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
        req.flash('fail', 'Error. ' + err.code);
        next();
    };
});

router.get('/terminar/:id', async(req, res, next) => {

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
    // const { id } = req.params;
    // const lugar = await db.query('SELECT * FROM lugar WHERE idLugar =?', [id]);
    // res.render('ubicaciones/editar', { lugar: lugar[0] }); //para ver un solo objeto
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


//Exportar modulos
module.exports = router;