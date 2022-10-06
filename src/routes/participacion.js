const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');


router.get('/agregar/alumno/grupo/:id', async(req, res) => {
    // idParticipante	idGrupo
    const { id } = req.params;
    try {
        participante = await db.query('SELECT * FROM participante');
        grupo = await db.query('SELECT * FROM grupo WHERE idGrupo = ?', [id]);
        res.render('participacion/agregar', { participante, grupo: grupo[0] });
    } catch (err) {
        req.flash('fail', 'Error al obtener datos');
        next();
    }
});


//Metodo Agregar
router.post('/agregar/alumno/grupo/:id', async(req, res, next) => {
    const { idParticipante, idGrupo } = req.body;
    const newParticipacion = {
        idGrupo,
        idParticipante,
    };
    try {
        await db.query('start transaction');
        await db.query("INSERT INTO participacion SET ?", [newParticipacion]);
        await db.query('commit');
        req.flash('success', 'La Participacion del alumno ha sido guardada correctamente.');
        res.redirect('/participacion/agregar/alumno/grupo/' + idGrupo);
    } catch (err) {
        await db.query('rollback');
        req.flash('fail', 'Error: ' + err.code + '\nYa existe esta misma persona en el grupo. Asigne a otro grupo o verifique correctamente.');
        res.redirect('/participacion/agregar/alumno/grupo/' + idGrupo);
        next();
    }
});

//Metodo Eliminar
router.get('/eliminar/:id', async(req, res) => {
    // const { id } = req.params;
    // await db.query("DELETE FROM lugar WHERE idLugar = ?", [id]);
    // req.flas[h('warning', 'El lugar ha sido eliminado correctamente.');
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