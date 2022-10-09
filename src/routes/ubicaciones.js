const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');


router.get('/agregar', async(req, res) => {
    const lugar = await db.query("SELECT idLugar,nombreLugar FROM lugar");
    res.render('ubicaciones/agregar', { lugar });
});
//idUbicacion	nombreUbicacion	descripcionUbicacion	idLugar
//Metodo Agregar
router.post('/agregar', async(req, res, next) => {
    const { nombreUbicacion, descripcionUbicacion, idLugar } = req.body;
    const newUbicacion = {
        nombreUbicacion,
        descripcionUbicacion,
        idLugar
    };
    try {
        await db.query("INSERT INTO ubicacion SET ?", [newUbicacion]);
        req.flash('success', 'La ubicacion ha sido agregada correctamente.');
        res.redirect('/ubicaciones/todos');
    } catch (error) {
        req.flash('fail', 'Error al intentar agregar la ubicacion, intente nuevamente en seguida.');
        res.redirect('/ubicaciones/todos');
        next();
    }
});

//Metodo listar todos OK
router.get('/', async(req, res, next) => {
    try {
        const ubicaciones = await db.query("SELECT idUbicacion,nombreUbicacion,descripcionUbicacion,nombreLugar FROM ubicacion JOIN lugar ON lugar.idLugar = ubicacion.idLugar");
        res.render('ubicaciones/index', { ubicaciones });
    } catch (error) {
        req.flash('fail', 'Error al intentar recuperar los registros, intente nuevamente en seguida.');
        res.redirect('/ubicaciones/todos');
        next();
    }
});

router.get('/todos', async(req, res) => {
    try {
        const ubicaciones = await db.query("SELECT idUbicacion,nombreUbicacion,descripcionUbicacion,nombreLugar FROM ubicacion JOIN lugar ON lugar.idLugar = ubicacion.idLugar");
        res.render('ubicaciones/index', { ubicaciones });
    } catch (error) {
        req.flash('fail', 'Error al intentar recuperar los registros, intente nuevamente en seguida.');
        res.redirect('/ubicaciones/todos');
        next();
    }
});

//Metodo Eliminar
router.get('/eliminar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM ubicacion WHERE idUbicacion = ?", [id]);
        req.flash('warning', 'La ubicacion ha sido eliminado correctamente.');
        res.redirect('/ubicaciones/todos');
    } catch (error) {
        req.flash('fail', 'Error al intentar eliminar, intente nuevamente en seguida.');
        res.redirect('/ubicaciones/todos');
        next();
    }
});

//Metodos Editar
router.get('/editar/:id', async(req, res, next) => {
    try {
        const lugar = await db.query("SELECT idLugar,nombreLugar FROM lugar");
        const { id } = req.params;
        const ubicacion = await db.query('SELECT * FROM ubicacion WHERE idUbicacion =?', [id]);
        res.render('ubicaciones/editar', { lugar, ubicacion: ubicacion[0] }); //para ver un solo objeto
    } catch (error) {
        req.flash('fail', 'Error al intentar recuperar lo registros, intente nuevamente en seguida.');
        console.log(error);
        res.redirect('/ubicaciones/todos');
        next();
    }

});

router.post('/editar/:id', async(req, res, next) => {
    const { id } = req.params;
    const { nombreUbicacion, descripcionUbicacion, idLugar } = req.body;
    const newUbicacion = {
        nombreUbicacion,
        descripcionUbicacion,
        idLugar
    };
    try {
        await db.query("UPDATE ubicacion SET ? WHERE idUbicacion = ?", [newUbicacion, id]);
        req.flash('success', 'La ubicacion ha sido editada correctamente.');
        res.redirect('/ubicaciones/todos');
    } catch (error) {
        req.flash('fail', 'Error al intentar editar, intente nuevamente en seguida.');
        res.redirect('/ubicaciones/todos');
        next();
    }

});


//Exportar modulos
module.exports = router;