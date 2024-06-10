import { Router } from "express";
import { createFoler, getFolder } from "../controllers/foldercontroller.js";

export const folderRouter = Router();

folderRouter.route("/:id").get(getFolder);
folderRouter.route("/create").post(createFoler);
