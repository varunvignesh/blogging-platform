// External Dependencies
const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');

// Internal Dependencies
const postController = require('./post.controller');
const config = require('../../../config/config');
const validation = require('../../helpers/validation/post.validation');

// Instantiate router
const router = express.Router();

/**
 * GET /api/posts
 * list all posts
 */
router
    .route('/')
    .get(
        validate(validation.listPosts),
        postController.listPosts
    );

/**
 * POST /api/posts
 * create post
 */
router
    .route('/')
    .post(
        expressJwt({ secret: config.jwt_secret }),
        validate(validation.addPost),
        postController.createPost
    );

/**
 * PUT /api/posts/:post_id
 * update post
 */
router
    .route('/:post_id')
    .put(
        expressJwt({ secret: config.jwt_secret }),
        validate(validation.updatePost),
        postController.updatePost
    );

/**
 * DELETE /api/posts/:post_id
 * delete post
 */
router
    .route('/:post_id')
    .delete(
        expressJwt({ secret: config.jwt_secret }),
        validate(validation.deleteAndGetPost),
        postController.deletePost
    );

/**
 * GET /api/posts/:post_id
 * Fetch post by ID
 */
router
    .route('/:post_id')
    .get(
        validate(validation.deleteAndGetPost),
        postController.fetchPost
    );

module.exports = router;
