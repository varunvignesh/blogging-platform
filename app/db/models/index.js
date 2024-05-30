// External Dependecies
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

// Internal Modules
const config = require("../../../config/config");

// Get the filename
const basename = path.basename(__filename);

// Instantiate sequelize
const sequelize = new Sequelize(config);

// Instantiate db object
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Read the migration directory
fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js",
    )
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Mount models
db.Author = require("../../api/author/author.model")(sequelize, Sequelize);
db.Post = require("../../api/post/post.model")(sequelize, Sequelize);

module.exports = db;
