import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path = require("path");
import mongoose from "mongoose";

import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";
import { postsRouter } from "./routes/posts";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL!, {});

// Middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Image Sharing API");
});
app.listen(port, () => {
  console.log(`[server]: Server running at port: ${port}`);
});
// Import Routes
app.use("/api/auth", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/post", postsRouter);

// Multer
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: imgStorage });
// Upload image to DB
app.post("/api/upload", (req: any, res: any) => {
  try {
    return res.status(200).json("File uploaded!!!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
