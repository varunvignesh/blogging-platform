// Internal Dependencies
const baseSchema = require('../../helpers/common/baseSchema');
const models = require('../models');

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable(models.Post.tableName, {
        ...baseSchema,
        author_id: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: models.Author.tableName,
                key: 'id'
            }
        },
        title: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: true,
        }
    }).then(() => {
        queryInterface.addIndex(
            models.Post.tableName,
            ['author_id'],
            {
                indexName: 'author_post_index'
            }
        );
  }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable(models.Post.tableName)
};
