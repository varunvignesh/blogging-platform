// Internal Modules
const models = require("../models");


module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      models.Post.tableName,
      [
        {
          author_id: 1,
          title: "This is a blog no 1 by the author no 1",
          content: "This is a content \n by the author no 1",
        },
        {
          author_id: 1,
          title: "This is a blog no 2 by the author no 1",
          content: "This is a content \n by the author no 1",
        },
        {
          author_id: 2,
          title: "This is a blog no 1 by the author no 2",
          content: "This is a content \n by the author no 2",
        },
        {
          author_id: 2,
          title: "This is a blog no 2 by the author no 2",
          content: "This is a content \n by the author no 2",
        },
        {
          author_id: 3,
          title: "This is a blog no 1 by the author no 3",
          content: "This is a content \n by the author no 3",
        },
        {
          author_id: 4,
          title: "This is a blog no 1 by the author no 4",
          content: "This is a content \n by the author no 4",
        },
        {
          author_id: 5,
          title: "This is a blog no 1 by the author no 5",
          content: "This is a content \n by the author no 5",
        },
        {
          author_id: 2,
          title: "This is a blog no 3 by the author no 2",
          content: "This is a content \n by the author no 2",
        },
        {
          author_id: 2,
          title: "This is a blog no 4 by the author no 2",
          content: "This is a content \n by the author no 2",
        },
        {
          author_id: 3,
          title: "This is a blog no 2 by the author no 3",
          content: "This is a content \n by the author no 3",
        },
        {
          author_id: 4,
          title: "This is a blog no 2 by the author no 4",
          content: "This is a content \n by the author no 4",
        },
        {
          author_id: 5,
          title: "This is a blog no 2 by the author no 5",
          content: "This is a content \n by the author no 5",
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => {},
};
