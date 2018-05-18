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
const Customer = require('./models/customer');
const Order = require('./models/order');

//Load the routes
const indexRoute = require('./routes/indexRoute');
const productRoute  = require('./routes/productRoute');
const customerRoute = require('./routes/customerRoute');
const orderRoute = require('./routes/orderRoute');


//App config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customer', customerRoute)
app.use('/orders', orderRoute);

module.exports = app;