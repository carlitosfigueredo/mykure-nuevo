const express = require('express');
const conexion = require('../database');
const router = express.Router();
const db = require('../database');

//Metodo listar todos OK
router.get('/', async(req, res) => {
    try {
        const eventosSecundarios = await db.query('SELECT * FROM eventoSecundario');
        res.render('eventos-secundarios/index', { eventosSecundarios });
    } catch (err) {

    }

});

router.get('/todos', async(req, res) => {
    const eventosSecundarios = await db.query('SELECT * FROM eventoSecundario')
    res.render('eventos-secundarios/index', { eventosSecundarios });
});

//Para agregar idEvento	nombreEvento	fechaEvento	idUbicacion	horarioDesdeEvento	horarioHastaEvento	estadoEvento

router.get('/agregar', async(req, res) => {
    const eventos = await db.query('SELECT * FROM evento');
    res.render('eventos-secundarios/agregar', { eventos });
});

router.post('/agregar', async(req, res, next) => {
    //idEventoSecundario	nombreEventoSecundario	descripcionEventoSecundario	idEvento	
    const { idEvento, nombreEventoSecundario, descripcionEventoSecundario } = req.body;
    console.log(req.body);
    const newEventoSec = {
        idEvento,
        nombreEventoSecundario,
        descripcionEventoSecundario
    };
    try {
        await db.query('INSERT INTO eventoSecundario SET ?', [newEventoSec]);
        req.flash('success', 'Evento secundario agregado correctamente');
        res.redirect('/eventos-secundarios/todos');
    } catch (err) {
        console.log(err);
        req.flash('fail', 'Error.' + err.code);
        res.redirect('/eventos-secundarios/agregar');
        next();
    };
});


router.get('/ver/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const eventoSecundario = await db.query('SELECT * FROM eventoSecundario WHERE idEventoSecundario = ?', [id]);
        res.render('eventos-secundarios/ver', { eventoSecundario });
    } catch (err) {
        console.log(err);
        req.flash('fail', 'No se pudieron recuperar datos');
    }
})


//Metodo Eliminar
router.get('/eliminar/:id', async(req, res) => {
    const { id } = req.params;
    try {

    } catch (err) {
        console.log(err);

    }
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