// Internal Modules
const models = require('../../db/models');
const { DB_TBL_AUTHOR, statusTypes } = require('../../../utils/constants');
const message = require('../../../localization/en.json');
const { paginate } = require('../../helpers/common/paginate');
const { hashPassword, checkPassword } = require('../../helpers/common/bcrypt');
const JWTHelper = require('../../helpers/common/jwtHelper');
const logger = require('../../../config/logger').logging;

// Model Instances
const Author = models.Author;

/**
 * create author
 * @param {*} req
 * @param {*} res
 */
async function createAuthor(req, res) {
    try {
        
        // check if the email_id exists
        const author = await models.sequelize.query(
            `select * from ${DB_TBL_AUTHOR} where email_id = ? and status = ?`,
            {
              replacements: [req.body.email_id, statusTypes[0]],
              type: models.sequelize.QueryTypes.SELECT,
            },
        );
      
        if (author.length) {
        return res.status(409).send({
            status: "ERROR",
            code: 910,
            message: message.EMAIL_EXIST,
        });
        }

        // hash password
        const password = await hashPassword(req.body.password)
        
        // Create author
        const createdAuthor = await Author.create(
            {
                name: req.body.name,
                email_id: req.body.email_id,
                password,
                designation: req.body.designation,
            },
        );

        return res.status(201).send({
            status: 'SUCCESS',
            code: 900,
            message: message.CREATED,
            data: {
                author_id: createdAuthor.id,
                name: createdAuthor.name,
                email_id: createdAuthor.email_id,
                designation: createdAuthor.designation,
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
 * login author
 * @param {*} req
 * @param {*} res
 */
async function loginAuthor(req, res) {
    try {
        
        // fetch the user
        const author = await models.sequelize.query(
            `select * from ${DB_TBL_AUTHOR} where email_id = ? and status = ?`,
            {
              replacements: [req.body.email_id, statusTypes[0]],
              type: models.sequelize.QueryTypes.SELECT,
            },
        );
      
        if (!author.length) {
            return res.status(404).send({
                status: 'ERROR',
                code: 903,
                message: message.EMAIL_NOT_FOUND
            });
        }

        // check hash and password
        const match = await checkPassword(req.body.password, author[0].password)
        
        if (!match) {
            return res.status(401).send({
                status: 'ERROR',
                code: 912,
                message: message.PASSWORD_INCORRECT
            });
        }

        return res.status(200).send({
            status: 'SUCCESS',
            code: 900,
            message: message.LOGIN_SUCCESS,
            data: {
                access_token: JWTHelper.sign(author[0]),
                author_id: author[0].id,
                name: author[0].name,
                email_id: author[0].email_id,
                designation: author[0].designation,
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
 * list authors
 * @param {*} req
 * @param {*} res
 */
async function listAuthors(req, res) {
    try {

        const replacements = [
            statusTypes[0]
        ]

        // fetch count of authors
        const count = await models.sequelize.query(
            `select count(*) as count from ${DB_TBL_AUTHOR} where status = ?`,
            {
              replacements,
              type: models.sequelize.QueryTypes.SELECT,
            },
        );

        // Paginate the authors
        const pagination = paginate(
            count[0].count,
            req.query.page,
            req.query.items
        );

        replacements.push(req.query.items)
        replacements.push(pagination.offset)

        // fetch all authors
        const authors = await models.sequelize.query(
            `select name, designation, id as author_id from ${DB_TBL_AUTHOR} where status = ? order by created_at desc limit ? offset ?`,
            {
              replacements,
              type: models.sequelize.QueryTypes.SELECT,
            },
        );

        return res.status(201).send({
            status: 'SUCCESS',
            code: 900,
            data: {
                items: authors,
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

module.exports = {
    createAuthor,
    loginAuthor,
    listAuthors
}