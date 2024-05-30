// External Dependencies
const Joi = require('joi');

// Instantiate validator
const validator = {};

// list posts
validator.listPosts = {
    query: {
        page: Joi.number().integer().required(),
        items: Joi.number().integer().max(50).required(),
        author_id: Joi.number().integer(),
        date: Joi.date(),
    }
};

// add post
validator.addPost = {
    body: {
        title: Joi.string().required(),
        content: Joi.string().required(),
    }
};

// update post
validator.updatePost = {
    params: {
        post_id: Joi.number().required(),
    },
    body: {
        title: Joi.string().required(),
        content: Joi.string().required(),
    }
};

// delete post
validator.deleteAndGetPost = {
    params: {
        post_id: Joi.number().required(),
    }
};


module.exports = validator;
