const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');

router.get('/', async(req, res) => {
    const pulsera = await db.query("SELECT idPulsera,codigoPulsera,estadoPulsera,PulseraGanador FROM pulsera");
    res.render('pulseras/index', { pulsera });
});

router.get('/todos', async(req, res) => {
    const pulsera = await db.query("SELECT idPulsera,codigoPulsera,estadoPulsera,PulseraGanador FROM pulsera");
    res.render('pulseras/index', { pulsera });
});

//Para agregar
router.get('/agregar', async(req, res) => {
    res.render('pulseras/agregar');
});

//Metodo Agregar //Metodo listar todos OK idPulsera	codigoPulsera	estadoPulsera	PulseraGanador
router.post('/agregar', async(req, res, next) => {
    const { codigoPulsera, estadoPulsera, PulseraGanador } = req.body;
    const newTutor = {
        codigoPulsera,
        estadoPulsera,
        PulseraGanador
    };
    try {
        await db.query("INSERT INTO pulsera SET ?", [newTutor]);
        req.flash('success', 'Pulsera agregada correctamente.');
        res.redirect('/pulseras/todos');
    } catch (err) {
        console.log(err);
        req.flash('fail', 'Error. ' + err.code + 'No se pueden repetir los codigos de pulseras');
        next();
    }

});

//Metodo Eliminar
router.get('/eliminar/:id', async(req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM pulsera WHERE idPulsera = ?", [id]);
        req.flash('warning', 'La pulsera ha sido eliminado correctamente.');
        res.redirect('/ubicaciones/todos');

    } catch (err) {
        req.flash('fail', 'No se puede eliminar' + err.code)
    }

});

//Metodos Editar
router.get('/editar/:id', async(req, res) => {
    const { id } = req.params;
    const pulsera = await db.query('SELECT * FROM pulsera WHERE idpulsera =?', [id]);
    res.render('pulseras/editar', { pulsera: pulsera[0] }); //para ver un solo objeto
});

router.post('/editar/:id', async(req, res) => {
    const { id } = req.params;
    const { codigoPulsera, estadoPulsera, PulseraGanador } = req.body;
    const newTutor = {
        codigoPulsera,
        estadoPulsera,
        PulseraGanador
    };
    try {
        await db.query("UPDATE pulsera SET ? WHERE idPulsera = ?", [newTutor, id]);
        req.flash('warning', 'Pulsera editada correctamente.');
        res.redirect('/pulseras/todos');
    } catch (err) {
        console.log(err);
        req.flash('fail', 'Error. ' + err.code + 'No se pueden repetir los codigos de pulseras');
        next();
    }
});


//Exportar modulos
module.exports = router;