const { createPool } = require("mysql");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require('./../database');
const helpers = require('./../lib/helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'correoAdministrador',
    passwordField: 'passwordAdministrador',
    passReqToCallback: true
} , async(req, username, password, done) => {
    const rows = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash ('Bienvenido/a' + user.username));
        }else{
            done(null, false, req.flash('Contraseña incorrecta'));
        }
    }else {
        return done(null, false, req.flash('El usuario no existe'));
    }
}));

passport.use('local.registro', new LocalStrategy({
    passwordField: 'passwordAdministrador',
    passReqToCallback: true
}, async(req, password, done) => {
    const { rolAdministrador, nombreCompletoAdministrador, correoAdministrador } = req.body;
    const newAdministrador = {
        password,
        correoAdministrador,
        rolAdministrador,
        nombreCompletoAdministrador
    };
    newAdministrador.password = await helpers.encriptarPassword(password);
    const result = db.query("INSERT INTO administrador SET ?", [newAdministrador])
    console.log(result);
}));
// passport.serializeUser(user, done) => {

// };