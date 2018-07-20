'use strict';

/**
 * Enviroment Variables Setup
 */
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//Database connection
mongoose.connect(config.connectionString);

//load the models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Load the routes
const indexRoute = require('./routes/indexRoute');
const productRoute  = require('./routes/productRoute');
const customerRoute = require('./routes/customerRoute');
const orderRoute = require('./routes/orderRoute');


//App config
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({extended: false}))
app.use(function (req, res, next ) {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-requested-Width, Accept, x-acess-code');
    res.header('Acess-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute)
app.use('/orders', orderRoute);

module.exports = app;


/**
 * To do:
 * 
 * --> use dotenv module
 * --> change md5 to bcrypt
 * --> add validationContract to others controllers 
 * 
 */