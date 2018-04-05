'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

//Carrega as rotas
const indexRoute = require('./routes/indexRoute');
const productRoute  = require('./routes/productRoute');


//App config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;