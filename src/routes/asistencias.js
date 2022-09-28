const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/agregar', async(req, res) => {
    // const evento
    res.render('asistencias/agregar');
})

//Exportar modulos
module.exports = router;