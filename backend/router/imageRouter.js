import { Router } from "express";
import { addImage, deleteImage } from "../controllers/imageController.js";

export const imageRouter = Router();

imageRouter.route("/add").post(addImage);
imageRouter.route("/delete/:id").post(deleteImage);
