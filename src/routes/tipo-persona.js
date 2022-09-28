const express = require('express');
const router = express.Router();
const db = require('./../database');


router.get('/agregar', (req, res) => {
    res.render('tipo-persona/agregar');
});

//Metodo Agregar
router.post('/agregar', async(req, res) => {
    const { descripcionTipoPersona } = req.body;
    const newTipoPersona = {
        descripcionTipoPersona
    };
    await db.query("INSERT INTO tipoPersona SET ?", [newTipoPersona]);
    req.flash('success', 'El tipo de las personas ha sido agregado correctamente.');
    res.redirect('/tipo-persona/todos');
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
router.get('/eliminar/:id', async(req, res) => {
    const { id } = req.params;
    await db.query("DELETE FROM tipoPersona WHERE idTipoPersona = ?", [id]);
    req.flash('success', 'El tipo de persona ha sido eliminado correctamente.');
    res.redirect('/tipo-persona/todos');
});

//Metodos Editar
router.get('/editar/:id', async(req, res) => {
    const { id } = req.params;
    const tipoPersona = await db.query('SELECT * FROM tipoPersona WHERE idTipoPersona =?', [id]);
    res.render('tipo-persona/editar', { tipoPersona: tipoPersona[0] }); //para ver un solo objeto
});

router.post('/editar/:id', async(req, res) => {
    const { id } = req.params;
    const { descripcionTipoPersona } = req.body;
    const newTipoPersona = {
        descripcionTipoPersona
    };
    await db.query("UPDATE tipoPersona SET ? WHERE idTipoPersona = ?", [newTipoPersona, id]);
    req.flash('success', 'El tipo de Persona ha sido editado correctamente.');
    res.redirect('/tipo-persona/todos');
});


//Exportar modulos
module.exports = router;