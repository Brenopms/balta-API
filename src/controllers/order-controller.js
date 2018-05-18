'use strict';

// const mongoose = require('mongoose');
// const Customer = mongoose.model('Customer');
const guid = require('guid');
const repository  = require('../repositories/order-repository');

exports.post = async(req, res, next) => {
    try {
        await repository.create( {
            customer: req.body.customer,
            number: data.number = guid.raw().substring(0,6),
            items: req.body.items
        });
        res.status(201).send({
            message: "Order registered successfully"
        });
    } catch (error) {
        res.status(400).send({
            message: "Fail to register the order", 
            data: error
        });
    }
};