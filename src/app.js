'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Database connection
mongoose.connect('mongodb://brenopms:balta@ds135399.mlab.com:35399/balta')

//load the models
const Product = require('./models/product');
const Costumer = require('./models/customer');
const Order = require('./models/order');

//Load the routes
const indexRoute = require('./routes/indexRoute');
const productRoute  = require('./routes/productRoute');


//App config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;