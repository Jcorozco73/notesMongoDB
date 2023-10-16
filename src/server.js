const express = require ('express')
const hbs = require ('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require( 'connect-flash')
const session = require('express-session')
const passport= require('passport')



//inicializations
 const app = express()
require('./config/passport.js')

//settings
app.set('port', process.env.PORT || 5000)
app.set('views', path.join(__dirname, 'views')) //para que el servidor sepa donde esta la carpeta views
app.set('useFindAndModify', false)

app.set('view engine', '.hbs') //para que el servidor sepa que el motor de plantillas es handlebars

app.engine('.hbs', hbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), // to let the server know where the layouts folder is
    partialsDir: path.join(app.get('views'), 'partials'), // to let the server know where the partials folder is
    extname: '.hbs'

}));


//middlewares
//app.use(cors()) //para que se pueda hacer peticiones desde otros dominios (en este caso el front)
app.use(express.json()) //permite que os dados sejam enviado no formato json
app.use(express.urlencoded({extended: false})) //permite que os dados sejam enviados desde um formulario html
app.use(morgan('dev'))
app.use(methodOverride('_method')) //para que se puedan enviar otros metodos como put y delete desde un formulario html
app.use(session({
    secret:'my_precious', 
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


//Global variables
app.use((req ,res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.errors_msg = req.flash('errors_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
 
    next()
})


//Routes
app.use(require('./routes/index.routes.js'))
app.use(require('./routes/notes.routes.js'))
app.use(require('./routes/user.routes.js'))

//Static files
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app

