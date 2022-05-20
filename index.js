// INICIALIZACION DE LIBRERIAS
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

// CONTENIDO ESTATICO
app.use(express.static('public'));

// SESSION DE EXPRESS
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));

// PARSEAR JSON
app.use(express.json());

// CONEXION A LA BD
conectarBD().catch(err => console.log(err));

async function conectarBD() {
    await mongoose.connect('mongodb+srv://sagutxuninja:Almi1234@retobd.lkzrt.mongodb.net/sagutxu?retryWrites=true&w=majority');
    console.log('Conexión a la BD correcta');
}

// HABILITAMOS EJS
app.set('view engine', 'ejs');

// ROUTERS 
const sagutxuRouter = require('./routes/sagutxuRouter.js');
app.use('/', sagutxuRouter);

// PUERTO DE ESCUCHA 
server.listen(3000, () => {
  console.log('Escuchando en *:3000');
});