const express = require('express');
const router = express.Router();
const db = require('./../database');



router.get('/', async(req, res, next) => {
    try {
        const ganancias = await db.query('SELECT COUNT(idPulsera) * 3000 as gananciaPulsera FROM pulsera WHERE estadoPulsera = "entregado"');
        const pulseras = await db.query('SELECT COUNT(idPulsera) as entregadas FROM pulsera WHERE estadoPulsera = "entregado"');
        const personasRegistradas = await db.query('SELECT COUNT(idPersona) as registradas FROM persona');
        const eventos = await db.query('SELECT * FROM evento where estadoEvento = "en proceso" ORDER BY idEvento ASC LIMIT 5');
        const cuentaGrupos = await db.query('SELECT COUNT(idGrupo) as cuentaGrupos FROM grupo');
        const cuentaParticipantes = await db.query('SELECT COUNT(idParticipante) as cuentaParticipante from participante');
        console.log(cuentaGrupos[0]);
        console.log(cuentaParticipantes[0]);

        res.render('index', { ganancias: ganancias[0], pulseras: pulseras[0], personasRegistradas: personasRegistradas[0], eventos, cuentaGrupos: cuentaGrupos[0], cuentaParticipantes: cuentaParticipantes[0] });
    } catch (err) {
        console.log(err);
        req.flash('fail', 'Error' + err.code);
        next();
    }
})

module.exports = router;