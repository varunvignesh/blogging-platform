// Internal Modules
const baseSchema = require("../../helpers/common/baseSchema");
const { DB_TBL_AUTHOR } = require("../../../utils/constants");

module.exports = function (sequelize, Sequelize) {
    const author = sequelize.define(
        DB_TBL_AUTHOR,
        {
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
            },
        },
        {
            tableName: DB_TBL_AUTHOR,
        },
    );

    return author;
};
