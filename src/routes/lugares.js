const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');


router.get('/agregar', (req, res) => {
    res.render('lugares/agregar');
});

//Metodo Agregar
router.post('/agregar', async(req, res) => {
    const { nombreLugar } = req.body;
    const newLugar = {
        nombreLugar
    };
    await db.query("INSERT INTO lugar SET ?", [newLugar]);
    req.flash('success', 'El lugar ha sido agregado correctamente.');
    res.redirect('/lugares/todos');
});

//Metodo listar todos
router.get('/', async(req, res) => {
    const lugares = await db.query("SELECT * FROM lugar");
    res.render('lugares/index', { lugares });
});

router.get('/todos', async(req, res) => {
    const lugares = await db.query("SELECT * FROM lugar");
    res.render('lugares/index', { lugares });
});

//Metodo Eliminar
router.get('/eliminar/:id', async(req, res) => {
    const { id } = req.params;
    await db.query("DELETE FROM lugar WHERE idLugar = ?", [id]);
    req.flash('warning', 'El lugar ha sido eliminado correctamente.');
    res.redirect('/lugares/todos');
});

//Metodos Editar
router.get('/editar/:id', async(req, res) => {
    const { id } = req.params;
    const lugar = await db.query('SELECT * FROM lugar WHERE idLugar =?', [id]);
    res.render('lugares/editar', { lugar: lugar[0] }); //para ver un solo objeto
});

router.post('/editar/:id', async(req, res) => {
    const { id } = req.params;
    const { nombreLugar } = req.body;
    const newLugar = {
        nombreLugar
    };
    await db.query("UPDATE lugar SET ? WHERE idLugar = ?", [newLugar, id]);
    req.flash('success', 'El lugar ha sido editado correctamente.');
    res.redirect('/lugares/todos');
});


//Exportar modulos
module.exports = router;