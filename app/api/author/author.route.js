// External Dependencies
const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');

// Internal Dependencies
const authorController = require('./author.controller');
const config = require('../../../config/config');
const validation = require('../../helpers/validation/author.validation');

// Instantiate router
const router = express.Router();

/**
 * POST /api/authors
 * create author
 */
router
    .route('/')
    .post(
        validate(validation.createAuthor),
        authorController.createAuthor
    );

/**
 * get /api/authors
 * list authors
 */
router
    .route('/')
    .get(
        validate(validation.listAuthors),
        authorController.listAuthors
    );

/**
 * POST /api/authors/login
 * login for author
 */
router
    .route('/login')
    .post(
        validate(validation.authorLogin),
        authorController.loginAuthor
    );

module.exports = router;
