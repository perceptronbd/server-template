const express = require("express");
const router = express.Router();
const { loginController } = require("../controllers/loginController");
const { authenticate } = require("../../../common/middlewares/authenticate");

router.post("/registration", authenticate, loginController);
