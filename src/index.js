const express = require('express');
const morgan = require('morgan');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const exp = require('constants');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlsession = require('express-mysql-session');
const { database } = require('./config');
const passport = require('passport');
const { initialize } = require('passport');

const app = express();
require('./lib/passport');

//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', expressHandlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');



//middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(session({
    secret: 'mykuresystem',
    resave: false,
    saveUninitialized: false,
    store: new mysqlsession(database)
}));
app.use(passport.initialize());
app.use(passport.session());

//Variables globales

app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.fail = req.flash('fail');
    app.locals.warning = req.flash('warning');
    app.locals.info = req.flash('info');
    next();
})

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/autenticacion'));
app.use('/lugares', require('./routes/lugares'));
app.use('/ubicaciones', require('./routes/ubicaciones'));
app.use('/tutores', require('./routes/tutores'));
app.use('/grupos', require('./routes/grupos'));
app.use('/participantes', require('./routes/participantes'));
app.use('/participacion', require('./routes/participacion'));
app.use('/pulseras', require('./routes/pulseras'));
app.use('/eventos', require('./routes/eventos'));
app.use('/eventos-secundarios', require('./routes/eventos-secundarios'));
app.use('/tipo-persona', require('./routes/tipo-persona'));
app.use('/personas', require('./routes/personas'));
app.use('/asistencias', require('./routes/asistencias'));



//Publics
app.use(express.static(path.join(__dirname, 'public')));

//Comenzar servidor
app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en: http://localhost:4000/');
});