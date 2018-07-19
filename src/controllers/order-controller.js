'use strict';

// const mongoose = require('mongoose');
// const Customer = mongoose.model('Customer');
const guid = require('guid');
const repository  = require('../repositories/order-repository');
const authService = require('../services/auth-service');

exports.get = async(req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } 
    catch (error){
        res.status(500).send({
            message: 'Failed to process the request'
        });
    }
}

exports.post = async(req, res, next) => {
    try {
        //get the token
        const token = req.body.token || req.query.token || req.headers['x-acess-token'];
        //decode the token
        const data = await authService.decodeToken(token);

        await repository.create({
            customer: data._id,
            number: guid.raw().substring(0,6),
            items: req.body.items
        });
        res.status(201).send({
            message: "Order registered successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Fail to register the order", 
            data: error
        });
    }
};

