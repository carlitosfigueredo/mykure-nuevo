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
router.post('/agregar', async(req, res) => {
    const { codigoPulsera, estadoPulsera, PulseraGanador } = req.body;
    const newTutor = {
        codigoPulsera,
        estadoPulsera,
        PulseraGanador
    };
    await db.query("INSERT INTO pulsera SET ?", [newTutor]);
    req.flash('success', 'Pulsera agregada correctamente.');
    res.redirect('/pulseras/todos');
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