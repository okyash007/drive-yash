import { Router } from "express";
import {
  allFolder,
  createFoler,
  deleteFolder,
  getFolder,
  getTest,
  shareFolder,
} from "../controllers/folderController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const folderRouter = Router();

folderRouter.route("/test").get(verifyToken, getTest);
folderRouter.route("/:id").get(verifyToken, getFolder);
folderRouter.route("/create").post(verifyToken, createFoler);
folderRouter.route("/delete/:id").post(verifyToken, deleteFolder);
folderRouter.route("/all/:id").get(allFolder);
folderRouter.route("/share").post(verifyToken, shareFolder);
