import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";
import cors from "cors";
import { userRouter } from "./router/userRouter.js";
import { errorMiddleWare } from "./middlewares/errorMiddleWare.js";
import { folderRouter } from "./router/folderRouter.js";
import { imageRouter } from "./router/imageRouter.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

dotenv.config({
  path: "./.env",
});

const app = express();

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT} `);
  });
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

const __dirname = path.resolve();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.file.filename);

  cloudinary.uploader
    .upload(filePath, { folder: "uploads" })
    .then((result) => {
      fs.unlinkSync(filePath);

      res.status(201).json({
        message: "File uploaded successfully!",
        url: result.secure_url,
        public_id: result.public_id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error uploading file to Cloudinary.",
        error: error.message,
      });
    });
});

app.get("/", (req, res) => {
  res.json({ status: "server running" });
});

app.use("/user", userRouter);
app.use("/folder", folderRouter);
app.use("/image", imageRouter);

app.use(errorMiddleWare);
