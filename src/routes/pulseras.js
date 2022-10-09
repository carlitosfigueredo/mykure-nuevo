const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');

router.get('/', async(req, res, next) => {
    try {
        const pulsera = await db.query("SELECT idPulsera,codigoPulsera,estadoPulsera,PulseraGanador FROM pulsera");
        res.render('pulseras/index', { pulsera });
    } catch (err) {
        console.log(err);
        req.flash('fail', err.code);
        res.redirect('/pulseras/todos');
        next();
    }

});

router.get('/todos', async(req, res, next) => {
    try {
        const pulsera = await db.query("SELECT idPulsera,codigoPulsera,estadoPulsera,PulseraGanador FROM pulsera");
        res.render('pulseras/index', { pulsera });
    } catch (err) {
        console.log(err);
        req.flash('fail', err.code);
        res.redirect('/pulseras/todos');
        next();
    }

});

//Para agregar
router.get('/agregar', async(req, res) => {
    res.render('pulseras/agregar');
});

router.post('/agregar', async(req, res, next) => {
    try {
        const { codigoPulsera, estadoPulsera, PulseraGanador } = req.body;
        const newPulsera = {
            codigoPulsera,
            estadoPulsera,
            PulseraGanador
        };
        await db.query("INSERT INTO pulsera SET ?", [newPulsera]);
        req.flash('success', 'Pulsera agregada correctamente.');
        res.redirect('/pulseras/todos');
    } catch (err) {
        console.log(err);
        req.flash('fail', 'Error. ' + err.code + ' - No se pueden repetir los codigos de pulseras');
        res.redirect('/pulseras/agregar');
        next();
    }

});

//Metodo Eliminar
router.get('/eliminar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM pulsera WHERE idPulsera = ?", [id]);
        req.flash('warning', 'La pulsera ha sido eliminado correctamente.');
        res.redirect('/pulseras/todos');
    } catch (err) {
        req.flash('fail', 'No se puede eliminar' + err.code);
        res.redirect('/pulseras/todos');
        next();
    }

});

//Metodos Editar
router.get('/editar/:id', async(req, res) => {
    const { id } = req.params;
    const pulsera = await db.query('SELECT * FROM pulsera WHERE idpulsera =?', [id]);
    res.render('pulseras/editar', { pulsera: pulsera[0] }); //para ver un solo objeto
});

router.post('/editar/:id', async(req, res, next) => {
    const { id } = req.params;
    const { codigoPulsera, estadoPulsera, PulseraGanador } = req.body;
    const newPulsera = {
        codigoPulsera,
        estadoPulsera,
        PulseraGanador
    };
    try {
        await db.query("UPDATE pulsera SET ? WHERE idPulsera = ?", [newPulsera, id]);
        req.flash('warning', 'Pulsera editada correctamente.');
        res.redirect('/pulseras/todos');
    } catch (err) {
        console.log(err);
        req.flash('fail', 'Error. ' + err.code + 'No se pueden repetir los codigos de pulseras');
        res.redirect('/pulseras/todos');
        next();
    }
});


//Exportar modulos