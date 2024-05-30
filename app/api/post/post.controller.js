// Internal Modules
const models = require('../../db/models');
const { DB_TBL_AUTHOR, statusTypes, DB_TBL_POST } = require('../../../utils/constants');
const message = require('../../../localization/en.json');
const { hashPassword } = require('../../helpers/common/bcrypt');
const JWTHelper = require('../../helpers/common/jwtHelper');
const { paginate } = require('../../helpers/common/paginate');
const logger = require('../../../config/logger').logging;

// Model Instances
const Post = models.Post;

/**
 * list posts
 * @param {*} req
 * @param {*} res
 */
async function listPosts(req, res) {
    try {

        const replacements = [
            statusTypes[0]
        ]
        
        let authorQuery = '';
        if (req.query.author_id) {
            authorQuery = " and posts.author_id = ?"
            replacements.push(req.query.author_id)
        }

        let dateQuery = '';
        if (req.query.date) {
            dateQuery = " and date(posts.created_at) = ?"
            replacements.push(req.query.date)
        }

        // fetch count of filtered posts
        const count = await models.sequelize.query(
            `select count(*) as count from ${DB_TBL_POST} as posts inner join ${DB_TBL_AUTHOR} as authors on authors.id = posts.author_id where posts.status = ? ${authorQuery} ${dateQuery}`,
            {
              replacements,
              type: models.sequelize.QueryTypes.SELECT,
            },
        );

        // Paginate the posts
        const pagination = paginate(
            count[0].count,
            req.query.page,
            req.query.items
        );

        replacements.push(req.query.items)
        replacements.push(pagination.offset)

        // fetch all posts
        const posts = await models.sequelize.query(
            `select posts.*, authors.name as author_name, authors.designation as author_designation from ${DB_TBL_POST} as posts inner join ${DB_TBL_AUTHOR} as authors on authors.id = posts.author_id where posts.status = ? ${authorQuery} ${dateQuery} order by created_at desc limit ? offset ?`,
            {
              replacements,
              type: models.sequelize.QueryTypes.SELECT,
            },
        );

        return res.status(201).send({
            status: 'SUCCESS',
            code: 900,
            data: {
                items: posts,
                max_page: pagination.max_page,
                next_page: pagination.next_page,
                previous_page: pagination.previous_page
            }
        });

    } catch (error) {
        logger.error(error.stack);
        return res.status(500).send({
            status: 'ERROR',
            code: 910,
            message: message.UNKNOWN_ERROR
        });
    }
}

/**
 * create posts
 * @param {*} req
 * @param {*} res
 */
async function createPost(req, res) {
    try {
        const author = await models.sequelize.query(
            `select * from ${DB_TBL_AUTHOR} where id = ? and status = ?`,
            {
              replacements: [req.user.user_id, statusTypes[0]],
              type: models.sequelize.QueryTypes.SELECT,
            },
        ); 

        if (!author.length) {
            return res.status(404).send({
                status: 'ERROR',
                code: 903,
                message: message.AUTHOR_NOT_FOUND
            });
        }

        // Create post
        const createdPost = await Post.create(
            {
                author_id: req.user.user_id,
                title: req.body.title,
                content: req.body.content,
            },
        );

        return res.status(201).send({
            status: 'SUCCESS',
            code: 900,
            message: message.CREATED,
            data: {
                post_id: createdPost.id,
                author_id: createdPost.author_id,
                title: createdPost.title,
                content: createdPost.content,
                created_at: createdPost.created_at,
            }
        });
    } catch (error) {
        logger.error(error.stack);
        return res.status(500).send({
            status: 'ERROR',
            code: 910,
            message: message.UNKNOWN_ERROR
        });
    }
}

/**
 * update posts
 * @param {*} req
 * @param {*} res
 */
async function updatePost(req, res) {
    try {
        const post = await models.sequelize.query(
            `select * from ${DB_TBL_POST} where id = ? and author_id = ? and status = ?`,
            {
              replacements: [req.params.post_id, req.user.user_id, statusTypes[0]],
              type: models.sequelize.QueryTypes.SELECT,
            },
        ); 

        if (!post.length) {
            return res.status(404).send({
                status: 'ERROR',
                code: 903,
                message: message.POST_NOT_FOUND
            });
        }

        // Update post
        const updatedPost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.post_id,
                }
            }
        );

        return res.status(200).send({
            status: 'SUCCESS',
            code: 900,
            message: message.UPDATED,
            data: {
                post_id: req.params.post_id,
                author_id: req.user.user_id,
                title: req.body.title,
                content: req.body.content,
                created_at: post[0].created_at,
            }
        });

    } catch (error) {
        logger.error(error.stack);
        return res.status(500).send({
            status: 'ERROR',
            code: 910,
            message: message.UNKNOWN_ERROR
        });
    }
}

/**
 * delete post
 * @param {*} req
 * @param {*} res
 */
async function deletePost(req, res) {
    try {
        const post = await models.sequelize.query(
            `select * from ${DB_TBL_POST} where id = ? and author_id = ? and status = ?`,
            {
              replacements: [req.params.post_id, req.user.user_id, statusTypes[0]],
              type: models.sequelize.QueryTypes.SELECT,
            },
        ); 

        if (!post.length) {
            return res.status(404).send({
                status: 'ERROR',
                code: 903,
                message: message.POST_NOT_FOUND
            });
        }

        // soft delete post
        await Post.update(
            {
                status: statusTypes[1],
            },
            {
                where: {
                    id: req.params.post_id,
                }
            }
        );

        return res.status(200).send({
            status: 'SUCCESS',
            code: 900,
            message: message.DELETED,
        });

    } catch (error) {
        logger.error(error.stack);
        return res.status(500).send({
            status: 'ERROR',
            code: 910,
            message: message.UNKNOWN_ERROR
        });
    }
}

/**
 * fetch post
 * @param {*} req
 * @param {*} res
 */
async function fetchPost(req, res) {
    try {
        const post = await models.sequelize.query(
            `select posts.*, authors.name as author_name, authors.designation as author_designation from ${DB_TBL_POST} as posts inner join ${DB_TBL_AUTHOR} as authors on posts.author_id = authors.id where posts.id = ? and posts.status = ?`,
            {
              replacements: [req.params.post_id, statusTypes[0]],
              type: models.sequelize.QueryTypes.SELECT,
            },
        ); 

        if (!post.length) {
            return res.status(404).send({
                status: 'ERROR',
                code: 903,
                message: message.POST_NOT_FOUND
            });
        }

        return res.status(200).send({
            status: 'SUCCESS',
            code: 900,
            data: post[0],
            message: message.FETCHED,
        });

    } catch (error) {
        logger.error(error.stack);
        return res.status(500).send({
            status: 'ERROR',
            code: 910,
            message: message.UNKNOWN_ERROR
        });
    }
}

module.exports = {
    listPosts,
    createPost,
    updatePost,
    deletePost,
    fetchPost,
}