import { Router } from "express";
import { userLogin, userSignup } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.route("/login").post(userLogin);
userRouter.route("/signup").post(userSignup);
