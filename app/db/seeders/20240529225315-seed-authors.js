// Internal Modules
const models = require("../models");

// password is 'password@123'
password = "$2b$10$0eofL1XXd6j27do5GuOVl.Lfgs5Oe931iDoflKqmys87HEfGs7B.u"

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      models.Author.tableName,
      [
        {
          name: "Madhan Kumar",
          email_id: "madhan@demo.com",
          password,
          designation: "Chief Editor",
        },
        {
          name: "Rahul Fernandes",
          email_id: "rahul@demo.com",
          password,
          designation: "Asst Editor",
        },
        {
          name: "Karthik Pandey",
          email_id: "karthik@demo.com",
          password,
          designation: "Asst Editor",
        },
        {
          name: "Manushi Agarwal",
          email_id: "manushi@demo.com",
          password,
          designation: "Chief Editor",
        },
        {
          name: "Layla",
          email_id: "layla@demo.com",
          password,
          designation: "Asst Editor",
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => {},
};
