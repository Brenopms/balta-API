'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository  = require('../repositories/product-repository');

exports.get = (req, res, next) => {
    repository.get()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(e =>{
        res.status(400).send(e);
    });
}

exports.getBySlug = (req, res, next) => {
    repository.getBySlug(req.params.slug)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(e =>{
        res.status(400).send(e);
    });
}

exports.getById = (req, res, next) => {
    repository.getById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(e =>{
        res.status(400).send(e);
    });
}

exports.getByTag = (req, res, next) => {
    repository.getByTag(req.params.tag)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(e =>{
        res.status(400).send(e);
    });
}

exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, "The title must contain at least 3 characters ");
    contract.hasMinLen(req.body.slug, 3, "The slug must contain at least 3 characters ");
    contract.hasMinLen(req.body.description, 3, "The description must contain at least 3 characters");

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository.create(req.body)
    .then(x => {
        res.status(201).send({
            message: "Product saved successfully"
        });
    })
    .catch(e =>{
        res.status(400).send({
            message: "Fail to register the product", 
            data: e
        });
    });
};

exports.put = (req, res, next) => {
    repository.update(req.params.id, req.body)
    .then (x => {
        res.status(201).send({
            message: "Product updated successfully"
        });
    })
    .catch(e => {
        res.status(400).send({
            message: 'Failed to update the product',
            data: e
        });
    });
}

exports.delete = (req, res, next) => {
        repository.delete(req.params.id)
        .then (x => {
            res.status(200).send({
                message: "Product deleted successfully"
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Failed to delete the product',
                data: e
            });
        });
};