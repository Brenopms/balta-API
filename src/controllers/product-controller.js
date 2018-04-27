'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository  = require('../repositories/product-repository');

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

exports.getBySlug = async(req, res, next) => {
    try {
        const data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getById = async(req, res, next) => {
    try {
        const data = await repository.getById(req.params.id)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, "The title must contain at least 3 characters ");
    contract.hasMinLen(req.body.slug, 3, "The slug must contain at least 3 characters ");
    contract.hasMinLen(req.body.description, 3, "The description must contain at least 3 characters");

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: "Product saved successfully"
        });
    } catch (error) {
        res.status(400).send({
            message: "Fail to register the product", 
            data: error
        });
    }
}

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(201).send({
            message: "Product updated successfully"
        });
    } catch (error) {
        res.status(400).send({
            message: 'Failed to update the product',
            data: error
        });
    }
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(400).send({
            message: 'Failed to delete the product',
            data: error
        });
    }
};