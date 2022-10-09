const express = require('express');
const router = express.Router();
const db = require('./../database');


router.get('/agregar', (req, res) => {
    res.render('tipo-persona/agregar');
});

//Metodo Agregar
router.post('/agregar', async(req, res, next) => {
    const { descripcionTipoPersona } = req.body;
    const newTipoPersona = {
        descripcionTipoPersona
    };
    try {
        await db.query("INSERT INTO tipoPersona SET ?", [newTipoPersona]);
        req.flash('success', 'El registro ha sido agregado correctamente.');
        res.redirect('/tipo-persona/todos');
    } catch (err) {
        req.flash('fail', 'No se ha podido agregar. Intente nuevamente en seguida.');
        res.redirect('/tipo-persona/agregar');
        console.log(err);
        next();
    }

});

//Metodo listar todos
router.get('/', async(req, res) => {
    const tipoPersona = await db.query("SELECT * FROM tipoPersona");
    res.render('tipo-persona/index', { tipoPersona });
});

router.get('/todos', async(req, res) => {
    const tipoPersona = await db.query("SELECT * FROM tipoPersona");
    res.render('tipo-persona/index', { tipoPersona });
});

//Metodo Eliminar
router.get('/eliminar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM tipoPersona WHERE idTipoPersona = ?", [id]);
        req.flash('info', 'El registro ha sido eliminado correctamente.');
        res.redirect('/tipo-persona/todos');
    } catch (err) {
        req.flash('fail', 'No se ha podido eliminar. Intente nuevamente en seguida.');
        console.log(err);
        res.redirect('/tipo-persona/todos');
        next();
    }
});

//Metodos Editar
router.get('/editar/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const tipoPersona = await db.query('SELECT * FROM tipoPersona WHERE idTipoPersona =?', [id]);
        res.render('tipo-persona/editar', { tipoPersona: tipoPersona[0] }); //para ver un solo objeto
    } catch (err) {
        req.flash('fail', 'Error. ' + err.code);
        console.log(err);
        res.redirect('/tipo-persona/todos');
        next();
    }

});

router.post('/editar/:id', async(req, res, next) => {
    const { id } = req.params;
    const { descripcionTipoPersona } = req.body;
    const newTipoPersona = {
        descripcionTipoPersona
    };
    try {
        await db.query("UPDATE tipoPersona SET ? WHERE idTipoPersona = ?", [newTipoPersona, id]);
        req.flash('warning', 'El registro ha sido editado correctamente.');
        res.redirect('/tipo-persona/todos');
    } catch (err) {
        req.flash('fail', 'No se ha podido editar. Intente nuevamente en seguida.');
        console.log(err);
        res.redirect('/tipo-persona/todos');
        next();
    }

});


//Exportar modulos
module.exports = router;