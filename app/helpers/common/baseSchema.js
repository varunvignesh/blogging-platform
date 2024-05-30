const DataTypes = require("sequelize");
const { statusTypes } = require("../../../utils/constants");

/*
  Defining common schema here, which can be imported
  in initial schema of all the models
*/
module.exports = {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: statusTypes,
        defaultValue: statusTypes[0],
    },
    createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: DataTypes.literal("NOW()"),
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        defaultValue: DataTypes.literal("NOW()"),
    },
};
