'use strict';

// const mongoose = require('mongoose');
// const Customer = mongoose.model('Customer');
const ValidationContract = require('../validators/fluent-validator');
const repository  = require('../repositories/customer-repository');

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, "The name must contain at least 3 characters ");
    contract.isEmail(req.body.email,"Invalid email");
    contract.hasMinLen(req.body.password, 6, "The passwordmust contain at least 3 characters");

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: "Client registered successfully"
        });
    } catch (error) {
        res.status(400).send({
            message: "Fail to register the client", 
            data: error
        });
    }
}