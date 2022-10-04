const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');

//Metodo listar todos OK
router.get('/', async(req, res) => {
    try {
        const grupo = await db.query("SELECT * FROM grupo JOIN tutoria ON grupo.idGrupo = tutoria.idGrupo JOIN tutor ON tutoria.idTutor = tutor.idTutor");
        res.render('grupos/index', { grupo });
    } catch (error) {
        console.log(error);
        next();
    }
});

router.get('/todos', async(req, res, next) => {
    try {
        const grupo = await db.query("SELECT * FROM grupo JOIN tutoria ON grupo.idGrupo = tutoria.idGrupo JOIN tutor ON tutoria.idTutor = tutor.idTutor");
        res.render('grupos/index', { grupo });
    } catch (error) {
        console.log(error);
        next();
    }

});

//Para agregar
router.get('/agregar', async(req, res) => {
    res.render('grupos/agregar');
});


//Metodo Agregar
router.post('/agregar', async(req, res, next) => {
    const { nombreGrupo } = req.body;
    const newGrupo = {
        nombreGrupo
    };
    try {
        await db.query("INSERT INTO grupo SET ?", [newGrupo]);
        req.flash('success', 'El grupo ha sido creado correctamente');
        res.redirect('/grupos/todos');

    } catch (error) {
        req.flash('fail', 'Ha ocurrido un error. Intente nuevamente por favor.');
        console.log(error);
        next();
    }

});

//Metodo Eliminar
router.get('/eliminar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM grupo WHERE idGrupo = ?", [id]);
        req.flash('warning', 'El lugar ha sido eliminado correctamente.');
        res.redirect('/grupos/todos');
    } catch (error) {
        req.flash('fail', 'Ha ocurrido un error. Intente nuevamente por favor.');
        console.log(error);
        next();
    }

});

//Metodos Editar
router.get('/editar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const grupo = await db.query('SELECT * FROM grupo WHERE idGrupo =?', [id]);
        res.render('grupos/editar', { grupo: grupo[0] }); //para ver un solo objeto
    } catch (error) {
        console.log(error);
        req.flash('fail', 'Error al recuperar id y datos del grupo');
        next();
    }

});

router.post('/editar/:id', async(req, res, next) => {
    const { id } = req.params;
    const { nombreGrupo } = req.body;
    const newGrupo = {
        nombreGrupo
    };
    try {
        await db.query("UPDATE grupo SET ? WHERE idGrupo = ?", [newGrupo, id]);
        req.flash('success', 'El grupo ha sido editado correctamente.');
        res.redirect('/grupos/todos');

    } catch (error) {
        req.flash('fail', 'Ha ocurrido un error. Intente nuevamente por favor.');
        console.log(error);
        next();
    }
});

router.get('/asignar/:id', async(req, res, next) => {
    const { id } = req.params;
    const grupo = await db.query('SELECT * FROM grupo WHERE idGrupo =?', [id]);
    try {
        const tutores = await db.query('SELECT * FROM tutor');
        res.render('grupos/asignar', { tutores, grupo: grupo[0] });
    } catch (err) {
        console.log(err);
        next();
    }
});

router.post('/asignar', async(req, res, next) => {
    const { idGrupo, idTutor } = req.body;
    console.log(req.body);
    newTutoria = {
        idTutor,
        idGrupo
    }
    try {
        await db.query('INSERT INTO tutoria SET ?', [newTutoria]);
        req.flash('success', 'Tutor asignado correctamente al grupo');
        res.redirect('/grupos/ver/' + idGrupo);
    } catch (err) {
        console.log(err)
        req.flash('fail', 'Error' + err.code);
        next();
    }
});

// router.get('/ver/:id', async(req, res) => {
router.get('/ver/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const detalleGrupo = await db.query("SELECT nombreCompletoTutor,carreraParticipante,matriculaParticipante,nombreCompletoParticipante  FROM grupo JOIN grupoDetalles ON grupo.idGrupo = grupoDetalles.idGrupo JOIN participante ON participante.idParticipante = grupoDetalles.idParticipante JOIN tutor ON tutor.idTutor = grupoDetalles.idTutor WHERE grupo.idGrupo = ?", [id]);
        const grupo = await db.query("SELECT nombreGrupo FROM grupo WHERE idGrupo = ? LIMIT 1", [id]);
        const tutor = await db.query("SELECT nombreCompletoTutor FROM tutor JOIN grupoDetalles ON tutor.idTutor = grupoDetalles.idTutor JOIN grupo ON grupo.idGrupo = grupoDetalles.idGrupo WHERE grupo.idGrupo = ? LIMIT 1", [id]);
        res.render('grupos/ver', { detalleGrupo, grupo, tutor });
    } catch (error) {
        console.log(error);
        next();
    }
});


//Exportar modulos
module.exports = router;