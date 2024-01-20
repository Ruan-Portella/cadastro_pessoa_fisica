import { Router } from "express";
import UserController from "../modules/user/User.controller";

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  "/login",
  userController.login
);

userRouter.post(
  "/create",
  userController.create
);

export default userRouter;
