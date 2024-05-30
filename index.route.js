// External Dependencies
const express = require("express");

// Internal Modules
const authorRoute = require("./app/api/author/author.route");
const postRoute = require("./app/api/post/post.route");

// Instantiate Router
const router = express.Router();

// Mount user routes
router.use("/authors", authorRoute);
router.use("/posts", postRoute);

module.exports = router;
