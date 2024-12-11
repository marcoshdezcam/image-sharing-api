import express from "express";
const User = require("@models/User");

export const authRouter = express.Router();

authRouter.post("/register", async (req: any, res: any) => {
  try {
    console.log({
      Body: req.body,
    });
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });

    // Check if the email already exists
    const existingEmail = await User.findOne({
      email,
    });
    if (existingEmail) {
      return res.status(400).json("Email already exists");
    }

    // Check if the username already exists
    const existingUsername = await User.findOne({
      username: req.body.username,
    });
    if (existingUsername) {
      return res.status(400).json("Username already exists");
    }

    // Save the user and respond with the user
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  authRouter,
};
