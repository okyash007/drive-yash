import { Router } from "express";
import {
  createFoler,
  deleteFolder,
  getFolder,
} from "../controllers/foldercontroller.js";

export const folderRouter = Router();

folderRouter.route("/:id").get(getFolder);
folderRouter.route("/create").post(createFoler);
folderRouter.route("/delete/:id").post(deleteFolder);
