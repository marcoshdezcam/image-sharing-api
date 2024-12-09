"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const multer_1 = __importDefault(require("multer"));
const path = require("path");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Database
mongoose_1.default.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to MongoDB");
});
// Middleware
app.use("/images", express_1.default.static(path.join(__dirname, "public/images")));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("common"));
// Import Routes
app.get("/", (req, res) => {
    res.send("TS Express Server");
});
app.listen(port, () => {
    console.log(`[server]: Server running at port: ${port}`);
});
// Multer
const imgStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = (0, multer_1.default)({ storage: imgStorage });
// Upload image to DB
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded!!!");
    }
    catch (error) {
        console.log(error);
    }
});
