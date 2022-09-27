const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');

//Metodo listar todos OK
router.get('/', async(req, res) => {
    res.render('eventos/index', );
});

router.get('/todos', async(req, res) => {
    res.render('eventos/index');
});

//Para agregar idEvento	nombreEvento	fechaEvento	idUbicacion	horarioDesdeEvento	horarioHastaEvento	estadoEvento

router.get('/agregar', async(req, res) => {
    const ubicacion = await db.query("SELECT idUbicacion,nombreUbicacion,nombreLugar FROM ubicacion JOIN lugar ON ubicacion.idLugar = lugar.idLugar");
    res.render('eventos/agregar', { ubicacion });
});


//Metodo Agregar
router.post('/agregar', async(req, res) => {
    console.log(req.body);
    const { nombreEvento, fechaEvento, idUbicacion, horarioDesdeEvento, horarioHastaEvento, estadoEvento } = req.body;
    const newEvento = {
        nombreEvento,
        fechaEvento,
        idUbicacion,
        horarioDesdeEvento,
        horarioHastaEvento,
        estadoEvento
    };
    await db.query("INSERT INTO evento SET ?", [newEvento]);
    req.flash('success', 'Evento agregado correctamente');
    res.redirect('/eventos/todos');
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