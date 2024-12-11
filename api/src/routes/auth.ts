import express, { Request, Response } from "express";
const User = require("@models/User");

export const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: any) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });
    const existingEmail = await User.findOne({
      email,
    });
    if (existingEmail) {
      return res.status(400).json("Email already exists");
    }

    const existingUsername = await User.findOne({
      username: req.body.username,
    });
    if (existingUsername) {
      return res.status(400).json("Username already exists");
    }

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

authRouter.post("/login", async (req: Request, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json("Invalid email");
    }
    if (user.password !== password) {
      return res.status(400).json("Invalid password");
    }

    console.log({ "User found": user });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  authRouter,
};
