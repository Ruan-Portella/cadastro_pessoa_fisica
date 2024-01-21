import { Router } from "express";
import UserController from "../modules/user/User.controller";
import middlewares from '../modules/middlewares/'
import PrivatePerson from "../modules/privatePerson/PrivatePerson.controller";

const userRouter = Router();

const userController = new UserController();
const privatePerson = new PrivatePerson();

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
