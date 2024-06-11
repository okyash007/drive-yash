import { Router } from "express";
import {
  createFoler,
  deleteFolder,
  getFolder,
} from "../controllers/foldercontroller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const folderRouter = Router();

folderRouter.route("/:id").get(verifyToken, getFolder);
folderRouter.route("/create").post(verifyToken, createFoler);
folderRouter.route("/delete/:id").post(verifyToken, deleteFolder);
