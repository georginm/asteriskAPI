const express = require('express'); //importando o objeto
const routes = require('./routes') //o ./ é para mostrar que é um arquivo e não um pacote
const app = express(); //instanciando o objeto
const cors = require('cors')

app.use(cors())

//informa para o express que será usado a estrutura JSON
app.use(express.json());
app.use(routes)


module.exports = app;
