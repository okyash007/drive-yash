import { Router } from "express";
import {
  addImage,
  deleteImage,
  searchImage,
} from "../controllers/imageController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const imageRouter = Router();

imageRouter.route("/add").post(verifyToken, addImage);
imageRouter.route("/delete/:id").post(verifyToken, deleteImage);
imageRouter.route("/search/:text").get(verifyToken, searchImage);
