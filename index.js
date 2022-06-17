// https://www.youtube.com/watch?v=T6rGUZGAWBk&list=PLs4YDKCLLrp8-YZXybBkSqTS-hE-3Lah7
const express = require('express'); // Creo la app
const bodyParser = require('body-parser');
const app = express(); // requiero express
const apiRputer = require('./Rutas/api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}));

require('./db')

app.use('/api', apiRputer);

app.listen(3000, () =>{ //digo q escuhe ese puerto
    console.log('Servidor prendido!')
});