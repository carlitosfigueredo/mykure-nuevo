const express = require('express');
const router = express.Router();
const db = require('../database');
const { route } = require('./eventos');

router.get('/', async(req, res, next) => {
    const personas = await db.query('select * from persona join asistenciaEvento on persona.idPersona = asistenciaEvento.idPersona JOIN evento on evento.idEvento = asistenciaEvento.idEvento JOIN pulsera on pulsera.idPulsera = asistenciaEvento.idPulsera');
    res.render('personas/index', { personas });
});

router.get('/editar/pulsera/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const persona = await db.query('select * from persona join asistenciaEvento on persona.idPersona = asistenciaEvento.idPersona JOIN evento on evento.idEvento = asistenciaEvento.idEvento JOIN pulsera on pulsera.idPulsera = asistenciaEvento.idPulsera where persona.idPersona = ?', [id]);
        const pulseras = await db.query('SELECT * FROM pulsera WHERE estadoPulsera = "disponible"');
        res.render('personas/editar', { persona: persona[0], pulseras });
    } catch (err) {
        console.log(err);
        next();
    }
});
router.post('/editar/pulsera/:id', (req, res, next) => {
    const { id } = req.params;
    const { idPulsera } = req.body;
    try {
        db.query('UPDATE asistenciaEvento SET idPulsera = ? where idPersona =? ', [idPulsera, id]);
        db.query('update pulsera set estadoPulsera = "entregado" where idPulsera=?', [idPulsera]);
        req.flash('success', 'editado correctamente');
        res.redirect('/');
    } catch (error) {
        req.flash('fail', 'no se puede editar' + err.code);
        res.redirect('/');
    }
});



//Exportar modulos
module.exports = router;