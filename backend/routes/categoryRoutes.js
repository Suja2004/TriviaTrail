const express = require("express");
const { getCategories } = require("../controllers/categoryController");

const router = express.Router(); // Create the router instance

// Define the route
router.get("/", getCategories);

module.exports = router; // Export the router
