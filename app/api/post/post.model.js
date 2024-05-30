// Internal Modules
const baseSchema = require("../../helpers/common/baseSchema");
const { DB_TBL_POST, DB_TBL_AUTHOR } = require("../../../utils/constants");

module.exports = function (sequelize, Sequelize) {
    const post = sequelize.define(
        DB_TBL_POST,
        {
            ...baseSchema,
            author_id: {
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: DB_TBL_AUTHOR,
                    key: "id",
                },
            },
            title: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: DB_TBL_POST,
            indexes: [
                {
                    name: "author_post_index",
                    fields: ["author_id"],
                },
            ],
        },
    );

    return post;
};
