const express = require('express');
const app = express();
const morgan = require('morgan');
//const path = require('path');
const cors = require('cors');
require('dotenv').config();


//middlewear
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//configuracion
app.set('port', process.env.PORT || 3002 );



//import databd
const _mongoose = require('./database'); // Cambiado aquí

app.use(express.static('./build/'));



//rutas

app.use('/user', require('./router/router.user'));
app.use('/books', require('./router/roter.book'));
app.use('/strongs', require('./router/roter.strong'));
//app.use('/', require('./router/roter'));

//configuracion del server
app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
    
});