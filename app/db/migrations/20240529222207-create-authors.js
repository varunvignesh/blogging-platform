// Internal Dependencies
const baseSchema = require('../../helpers/common/baseSchema');
const models = require('../models');

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable(models.Author.tableName, {
        ...baseSchema,
        name: {
            type: Sequelize.STRING(128),
            allowNull: false,
        },
        email_id: {
            type: Sequelize.STRING(256),
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING(256),
            allowNull: false,
        },
        designation: {
            type: Sequelize.STRING(256),
            allowNull: true,
        }
    }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable(models.Author.tableName)
};
