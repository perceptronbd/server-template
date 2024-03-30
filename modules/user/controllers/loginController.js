const asyncHandler = require("express-async-handler");
const { createUser } = require("../services/userService");

module.exports.loginController = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await createUser({ username, password });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).json({ message: "Login failed", error: error.message });
  }
});
