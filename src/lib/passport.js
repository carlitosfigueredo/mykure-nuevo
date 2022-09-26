const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require('./../database');
const helpers = require('./../lib/helpers');

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