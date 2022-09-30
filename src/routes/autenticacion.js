const express = require('express');
const router = express.Router();
const passport = require('passport');

//ruta de autenticacion
router.get('/registro', (req, res) => {
    res.render('registro');
});
router.post('/registro', (req, res) => {
    passport.authenticate('local.registro', {
        successRedirect: '/index',
        failureRedirect: '/registro',
        failureFlash: true
    });
    //console.log(req.body); Para ver el body del request
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/index',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/index', (req, res) => {
    res.render('index');
})

module.exports = router;