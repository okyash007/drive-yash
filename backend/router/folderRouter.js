import { Router } from "express";
import { createFoler } from "../controllers/foldercontroller.js";

export const folderRouter = Router();

folderRouter.route("/create").post(createFoler);
