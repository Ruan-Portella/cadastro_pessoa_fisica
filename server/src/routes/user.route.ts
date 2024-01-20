import { Router } from "express";
import UserController from "../modules/user/User.controller";
import middlewares from '../modules/middlewares/'

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  "/login",
  userController.login
);

userRouter.post(
  "/create",
  middlewares.validateEmail,
  middlewares.validateName,
  middlewares.validatePassword,
  middlewares.validateTelephone,
  middlewares.validateProfileImage,
  userController.create
);

userRouter.get(
  "/user",
  middlewares.validateToken,
  userController.getUser
);

export default userRouter;
