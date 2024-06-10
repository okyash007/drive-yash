import { Router } from "express";
import { addImage } from "../controllers/imageController.js";

export const imageRouter = Router();

imageRouter.route("/add").post(addImage);
