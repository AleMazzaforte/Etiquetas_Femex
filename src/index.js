const express = require('express');
const override = require('method-override');
const path = require('path');
const rutas = require('./routes/mainRoutes');
const rutasStock = require('./routes/rutasStock');
const sessions = require('express-session');

const app = express();

const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname +'/views'));

app.use(express.static(path.join(__dirname, '/../public')));
app.use(override());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', rutasStock)
app.use('/', rutas);
app.use((req, res, next) => {
    res.status(404).send(`<h1 style = 'color: red'>Recurso no encontrado</h1>`)
})

app.listen(port, () => {
    console.log( `Servidor escuchando e el puerto ${port}`)
});

