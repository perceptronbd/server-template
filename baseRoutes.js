const express = require("express");
const router = express.Router();
const { createUser } = require("./modules/user/routes/userRoutes");

// Define your routes here
router.use("/users", createUser);

module.exports = router;
