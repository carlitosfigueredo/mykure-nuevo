const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');

//Metodo listar todos OK
router.get('/', async(req, res, next) => {
    try {
        const eventos = await db.query('SELECT * FROM evento JOIN ubicacion ON evento.idUbicacion = evento.idUbicacion JOIN lugar ON ubicacion.idLugar = lugar.idLugar ');
        console.log(eventos);
        res.render('eventos/index', { eventos });
    } catch (err) {
        console.log(err);
        next();
    }
});

router.get('/todos', async(req, res) => {
    try {
        const eventos = await db.query('SELECT * FROM evento JOIN ubicacion ON evento.idUbicacion = evento.idUbicacion JOIN lugar ON ubicacion.idLugar = lugar.idLugar ');
        res.render('eventos/index', { eventos });
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

//Metodo Eliminar
router.get('/eliminar/:id', async(req, res) => {
    // const { id } = req.params;
    // await db.query("DELETE FROM lugar WHERE idLugar = ?", [id]);
    // req.flash('warning', 'El lugar ha sido eliminado correctamente.');
    // res.redirect('/ubicaciones/todos');
});

//Metodos Editar
router.get('/editar/:id', async(req, res) => {
    // const { id } = req.params;
    // const lugar = await db.query('SELECT * FROM lugar WHERE idLugar =?', [id]);
    // res.render('ubicaciones/editar', { lugar: lugar[0] }); //para ver un solo objeto
});

router.post('/editar/:id', async(req, res) => {
    // const { id } = req.params;
    // const { nombreLugar } = req.body;
    // const newLugar = {
    //     nombreLugar
    // };
    // await db.query("UPDATE lugar SET ? WHERE idLugar = ?", [newLugar, id]);
    // req.flash('success', 'El lugar ha sido editado correctamente.');
    // res.redirect('/ubicaciones/todos');
});


//Exportar modulos
module.exports = router;