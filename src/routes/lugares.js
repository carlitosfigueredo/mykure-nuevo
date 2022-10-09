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
    try {
        await db.query("INSERT INTO lugar SET ?", [newLugar]);
        req.flash('success', 'El lugar ha sido agregado correctamente.');
        res.redirect('/lugares/todos');
    } catch (err) {
        req.flash('fail', 'Ocurrio un error al intentar agregar el lugar. ' + err.code);
        console.log(err);
        res.redirect('/lugares/agregar');
        next();
    }

});

//Metodo listar todos
router.get('/', async(req, res, next) => {
    try {
        const lugares = await db.query("SELECT * FROM lugar");
        res.render('lugares/index', { lugares });
    } catch (err) {
        req.flash('fail', 'Ocurrio un error al intentar recuperar lugares');
        res.redirect('/index');
        next();
    }
});

router.get('/todos', async(req, res, next) => {
    try {
        const lugares = await db.query("SELECT * FROM lugar");
        res.render('lugares/index', { lugares });
    } catch (err) {
        req.flash('fail', 'Ocurrio un error al intentar recuperar lugares');
        res.redirect('/index');
        next();
    }
});

//Metodo Eliminar
router.get('/eliminar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM lugar WHERE idLugar = ?", [id]);
        req.flash('info', 'El lugar ha sido eliminado correctamente.');
        res.redirect('/lugares/todos');
    } catch (err) {
        req.flash('fail', 'Error al intentar eliminar, intente nuevamente en seguida.' + err.code);
        res.redirect('/lugares/todos');
        next();
    }

});

//Metodos Editar
router.get('/editar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const lugar = await db.query('SELECT * FROM lugar WHERE idLugar =?', [id]);
        res.render('lugares/editar', { lugar: lugar[0] }); //para ver un solo objeto
    } catch (err) {
        console.log(err);
        req.flash('fail', 'Ocurrio un error al intentar recuperar el lugar indicado');
        next();
    }

});

router.post('/editar/:id', async(req, res, next) => {
    const { id } = req.params;
    const { nombreLugar } = req.body;
    const newLugar = {
        nombreLugar
    };
    try {
        await db.query("UPDATE lugar SET ? WHERE idLugar = ?", [newLugar, id]);
        req.flash('success', 'El lugar ha sido editado correctamente.');
        res.redirect('/lugares/todos');
    } catch (err) {
        console.log(err);
        req.flash('fail', 'Ocurrio un error al intentar editar el lugar indicado. ' + err.code);
        next();
    }
});


//Exportar modulos
module.exports = router;