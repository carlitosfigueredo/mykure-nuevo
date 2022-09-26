const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');



//Metodo listar todos OK
router.get('/', async(req, res) => {
    const tutor = await db.query("SELECT idTutor,nombreCompletoTutor,cedulaTutor FROM tutor");
    res.render('tutores/index', { tutor });
});

router.get('/todos', async(req, res) => {
    const tutor = await db.query("SELECT idTutor,nombreCompletoTutor,cedulaTutor FROM tutor");
    res.render('tutores/index', { tutor });
});

//Para agregar
router.get('/agregar', async(req, res) => {
    res.render('tutores/agregar');
});


//Metodo Agregar
router.post('/agregar', async(req, res) => {
    const { nombreCompletoTutor, cedulaTutor } = req.body;
    const newTutor = {
        nombreCompletoTutor,
        cedulaTutor
    };
    await db.query("INSERT INTO tutor SET ?", [newTutor]);
    req.flash('success', 'El/La tutor/a ha sido agregado correctamente');
    res.redirect('/tutores/todos');
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