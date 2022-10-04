const express = require('express');
const conexion = require('./../database');
const router = express.Router();
const db = require('./../database');



//Metodo listar todos OK
router.get('/', async(req, res) => {
    const tutor = await db.query("SELECT idTutor,nombreCompletoTutor,cedulaTutor FROM tutor");
    res.render('tutores/index', { tutor });
});

router.get('/todos', async(req, res) => {
    const tutor = await db.query("SELECT idTutor,nombreCompletoTutor,cedulaTutor FROM tutor");
    res.render('tutores/index', { tutor });
});

//Para agregar
router.get('/agregar', async(req, res) => {
    res.render('tutores/agregar');
});


//Metodo Agregar
router.post('/agregar', async(req, res, next) => {
    const { nombreCompletoTutor, cedulaTutor } = req.body;
    const newTutor = {
        nombreCompletoTutor,
        cedulaTutor
    };
    try {
        await conexion.query("INSERT INTO tutor SET ?", [newTutor]);
        req.flash('success', 'Tutor/a agregado correctamente');
        res.redirect('/tutores/todos');
    } catch (err) {
        if (err.code = 'ER_DUP_ENTRY') {
            req.flash('fail', 'La cedula: ' + cedulaTutor + ' ya existe. Verifique el numero de cedula e intente nuevamente');
            res.redirect('/tutores/agregar');
            next();
        } else {
            next();
            req.flash('fail', 'ERROR' + err.code);
            res.redirect('/tutores/agregar');
        }
    }

});

//Metodo Eliminar
router.get('/eliminar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM tutor WHERE idTutor = ?", [id]);
        req.flash('warning', 'Tutor eliminado correctamente');
        res.redirect('/tutores/todos');
    } catch (err) {
        console.log(err);
        req.flash('fail', 'Error' + err.code);
        next();
    }
});

//Metodos Editar
router.get('/editar/:id', async(req, res) => {
    const { id } = req.params;
    const tutor = await db.query('SELECT * FROM tutor WHERE idTutor =?', [id]);
    res.render('tutores/editar', { tutor: tutor[0] }); //para ver un solo objeto
});

router.post('/editar/:id', async(req, res, next) => {
    const { id } = req.params;
    const { nombreCompletoTutor, cedulaTutor } = req.body;
    const newTutor = {
        nombreCompletoTutor,
        cedulaTutor
    };
    try {
        await db.query("UPDATE tutor SET ? WHERE idTutor = ?", [newTutor, id]);
        req.flash('info', 'El tutor ha sido editado correctamente.');
        res.redirect('/tutores/todos');
    } catch (err) {
        if (err.code = 'ER_DUP_ENTRY') {
            req.flash('fail', 'La cedula: ' + cedulaTutor + ' ya existe. Verifique el numero de cedula e intente nuevamente');
            res.redirect('/tutores/agregar');
            next();
        } else {
            req.flash('fail', 'Error' + err.code);
            next();
        }
    }
});

router.get('/asignar/:id', async(req, res, next) => {
    const { id } = req.params;
    const grupos = await db.query('SELECT * FROM grupo');
    try {
        const tutor = await db.query('SELECT * FROM tutor WHERE idTutor = ?', [id]);
        res.render('tutores/asignar', { grupos, tutor: tutor[0] });
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
        res.redirect('/tutores/asignaciones/' + idTutor);
    } catch (err) {
        console.log(err)
        req.flash('fail', 'Error' + err.code);
        next();
    }
});

router.get('/asignaciones/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const tutor = await db.query('SELECT * FROM tutor WHERE idTutor = ?', [id]);
        const asignaciones = await db.query('SELECT * FROM tutor JOIN tutoria on tutor.idTutor = tutoria.idTutor JOIN grupo ON grupo.idGrupo = tutoria.idGrupo WHERE tutor.idTutor = ?', [id]);
        res.render('tutores/asignaciones', { asignaciones, tutor: tutor[0] });
    } catch (err) {
        console.log(err)
        req.flash('fail', 'Error' + err.code);
        next();
    }
});


router.get('/asignar/editar/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const tutor = await db.query('SELECT * FROM tutor WHERE idTutor = ?', [id]);
        const asignaciones = await db.query('SELECT * FROM tutor JOIN tutoria on tutor.idTutor = tutoria.idTutor JOIN grupo ON grupo.idGrupo = tutoria.idGrupo WHERE tutor.idTutor = ?', [id]);
        res.render('tutores/asignaciones', { asignaciones, tutor: tutor[0] });
    } catch (err) {
        console.log(err)
        req.flash('fail', 'Error' + err.code);
        next();
    }
});


//Exportar modulos
module.exports = router;