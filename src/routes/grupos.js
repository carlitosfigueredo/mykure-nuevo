const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');

//Metodo listar todos OK
router.get('/', async(req, res) => {
    const grupo = await db.query("SELECT * FROM grupo");
    res.render('grupos/index', { grupo });
});

router.get('/todos', async(req, res) => {
    const grupo = await db.query("SELECT * FROM grupo");
    res.render('grupos/index', { grupo });
});

//Para agregar
router.get('/agregar', async(req, res) => {
    res.render('grupos/agregar');
});


//Metodo Agregar
router.post('/agregar', async(req, res) => {
    const { nombreGrupo } = req.body;
    const newGrupo = {
        nombreGrupo
    };
    await db.query("INSERT INTO grupo SET ?", [newGrupo]);
    req.flash('success', 'El grupo ha sido creado correctamente');
    res.redirect('/grupos/todos');
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