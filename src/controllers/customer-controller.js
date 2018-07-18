'use strict';

// const mongoose = require('mongoose');
// const Customer = mongoose.model('Customer');
const ValidationContract = require('../validators/fluent-validator');
const repository  = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

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
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        emailService.send(req.body.email, 'Welcome to nodeStore', global.EMAIL_TMPL.replace('{0}', req.body.name));

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


exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name
        });

        if(!customer){
            res.status(404).send({
                message: 'User or password invalid'
            });
            return;
    }
        res.status(201).send({
           token: token,
           data: {
              email: customer.email, 
              name: customer.name
           }
        });
    } catch (error) {
        res.status(500).send({
            message: "Fail to register the client", 
            data: error
        });
    }
}