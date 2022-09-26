const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');

//Para agregar
router.get('/agregar', async(req, res) => {
    // const lugar = await db.query("SELECT idLugar,nombreLugar FROM lugar");
    // res.render('ubicaciones/agregar', { lugar });
});


//Metodo Agregar
router.post('/agregar', async(req, res) => {
    // const { nombreUbicacion, descripcionUbicacion, idLugar } = req.body;
    // const newUbicacion = {
    //     nombreUbicacion,
    //     descripcionUbicacion,
    //     idLugar
    // };
    // await db.query("INSERT INTO ubicacion SET ?", [newUbicacion]);
    // req.flash('success', 'La ubicacion ha sido agregada correctamente.');
    // res.redirect('/ubicaciones/todos');
});

//Metodo listar todos OK
router.get('/', async(req, res) => {
    // const ubicaciones = await db.query("SELECT idUbicacion,nombreUbicacion,descripcionUbicacion,nombreLugar FROM ubicacion JOIN lugar ON lugar.idLugar = ubicacion.idLugar");
    // res.render('ubicaciones/index', { ubicaciones });
});

router.get('/todos', async(req, res) => {
    // const ubicaciones = await db.query("SELECT idUbicacion,nombreUbicacion,descripcionUbicacion,nombreLugar FROM ubicacion JOIN lugar ON lugar.idLugar = ubicacion.idLugar");
    // res.render('ubicaciones/index', { ubicaciones });
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