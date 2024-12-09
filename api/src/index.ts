import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path = require("path");
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Database
mongoose.connect(process.env.MONGO_URL!, {});

// Middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Import Routes
app.get("/", (req: Request, res: Response) => {
  res.send("TS Express Server");
});

app.listen(port, () => {
  console.log(`[server]: Server running at port: ${port}`);
});

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
