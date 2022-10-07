const express = require('express');
const router = express.Router();
const db = require('./../database');



router.get('/', async(req, res) => {
    try {
        const ganancias = await db.query('SELECT COUNT(idPulsera) * 3000 as gananciaPulsera FROM pulsera WHERE estadoPulsera = "entregado"');
        const pulseras = await db.query('SELECT COUNT(idPulsera) as entregadas FROM pulsera WHERE estadoPulsera = "entregado"');
        const personasRegistradas = await db.query('SELECT COUNT(idPersona) as registradas FROM persona');
        const eventos = await db.query('SELECT * FROM evento where estadoEvento = "en proceso" ORDER BY idEvento ASC LIMIT 5');
        console.log(eventos);
        res.render('index', { ganancias: ganancias[0], pulseras: pulseras[0], personasRegistradas: personasRegistradas[0], eventos });
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;