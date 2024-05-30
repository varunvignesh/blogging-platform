// External Dependencies
const Joi = require('joi');

// Instantiate validator
const validator = {};

// create author
validator.createAuthor = {
    body: {
        name: Joi.string().min(2).max(128).required(),
        email_id: Joi.string().email().required(),
        password: Joi.string().required(),
        designation: Joi.string().max(256),
    }
};

// author login
validator.authorLogin = {
    body: {
        email_id: Joi.string().email().required(),
        password: Joi.string().required(),
    }
};

// list authors
validator.listAuthors = {
    query: {
        page: Joi.number().integer().required(),
        items: Joi.number().integer().max(50).required(),
    }
};

module.exports = validator;
