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
  cloud_name: "dspp405ug",
  api_key: "925428478762846",
  api_secret: "oMhtpK9G_nmIi9z430buSFLfU0U", // Click 'View Credentials' below to copy your API secret
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});

const upload = multer({ storage });

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.get("/", (req, res) => {
  res.json({ status: "server running" });
});

app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.file.filename);

  cloudinary.uploader
    .upload(filePath, { folder: "uploads" })
    .then((result) => {
      // Delete the file from the local filesystem after uploading to Cloudinary
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

app.use("/user", userRouter);
app.use("/folder", folderRouter);
app.use("/image", imageRouter);

app.use(errorMiddleWare);
